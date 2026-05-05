import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

type AuthUserBootstrapInput = {
  authUserId: string;
  email: string | null;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

type AdminProfileRow = {
  user_id: string;
  display_name: string | null;
  organisation_name: string | null;
};

type AdminUserMembershipRow = {
  user_id: string;
  membership_levels?: { code?: string | null } | Array<{ code?: string | null }> | null;
};

type AdminUserRow = {
  id: string;
  email: string;
  status: string;
};

type ClientApplicationRow = {
  id: string;
  client_name: string;
  business_name: string | null;
  stable_address: string;
  direct_email: string;
  admin_email: string | null;
  mobile_number: string;
  status: string;
  email_verified_at: string | null;
  disclaimer_agreed_at: string | null;
  created_at: string;
};

export async function bootstrapAuthenticatedUser(input: AuthUserBootstrapInput) {
  if (!hasSupabaseAdminEnv()) {
    return {
      bootstrapped: false,
      reason: "missing_service_role",
    };
  }

  const admin = createSupabaseAdminClient();

  const { data: existingUser } = await admin
    .from("users")
    .select("id")
    .eq("auth_user_id", input.authUserId)
    .maybeSingle();

  let appUserId = existingUser?.id ?? null;

  if (!appUserId) {
    const { data: insertedUser, error: userInsertError } = await admin
      .from("users")
      .insert({
        auth_user_id: input.authUserId,
        email: input.email ?? `${input.authUserId}@pending.local`,
        status: "active",
      })
      .select("id")
      .single();

    if (userInsertError) {
      throw userInsertError;
    }

    appUserId = insertedUser.id;
  }

  const { data: existingProfile } = await admin
    .from("member_profiles")
    .select("id")
    .eq("user_id", appUserId)
    .maybeSingle();

  if (!existingProfile) {
    const displayName =
      input.displayName || [input.firstName, input.lastName].filter(Boolean).join(" ").trim() || input.email;

    const { error: profileInsertError } = await admin.from("member_profiles").insert({
      user_id: appUserId,
      display_name: displayName || "Member",
      first_name: input.firstName ?? null,
      last_name: input.lastName ?? null,
      is_active: true,
    });

    if (profileInsertError) {
      throw profileInsertError;
    }
  }

  return {
    bootstrapped: true,
    appUserId,
  };
}

export async function hasAnyAdminAssignment() {
  if (!hasSupabaseAdminEnv()) {
    return false;
  }

  const admin = createSupabaseAdminClient();
  const { data: adminLevel } = await admin
    .from("membership_levels")
    .select("id")
    .eq("code", "admin")
    .maybeSingle();

  if (!adminLevel) {
    return false;
  }

  const { count } = await admin
    .from("user_membership_levels")
    .select("id", { count: "exact", head: true })
    .eq("membership_level_id", adminLevel.id);

  return Boolean(count && count > 0);
}

export async function assignMembershipLevelToUser(params: {
  userId: string;
  levelCode: string;
}) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error("Missing Supabase service role configuration.");
  }

  const admin = createSupabaseAdminClient();

  const { data: membershipLevel, error: levelError } = await admin
    .from("membership_levels")
    .select("id, code")
    .eq("code", params.levelCode)
    .maybeSingle();

  if (levelError || !membershipLevel) {
    throw new Error(`Membership level '${params.levelCode}' was not found.`);
  }

  const { error } = await admin.from("user_membership_levels").upsert(
    {
      user_id: params.userId,
      membership_level_id: membershipLevel.id,
    },
    {
      onConflict: "user_id,membership_level_id",
    },
  );

  if (error) {
    throw error;
  }

  return membershipLevel.code;
}

export async function getMembershipAdminSnapshot() {
  if (!hasSupabaseAdminEnv()) {
    return {
      envReady: false,
      membershipLevels: [] as Array<{ code: string; name: string }>,
      users: [] as Array<{ id: string; email: string; status: string }>,
      applications: [] as Array<{
        id: string;
        clientName: string;
        businessName: string | null;
        stableAddress: string;
        directEmail: string;
        adminEmail: string | null;
        mobileNumber: string;
        status: string;
        emailVerifiedAt: string | null;
        disclaimerAgreedAt: string | null;
        createdAt: string;
      }>,
      hasAdmin: false,
    };
  }

  const admin = createSupabaseAdminClient();

  const [{ data: membershipLevels }, { data: users }, { data: applications }] = await Promise.all([
    admin.from("membership_levels").select("code, name").order("sort_order"),
    admin.from("users").select("id, email, status").order("created_at", { ascending: false }).limit(20),
    admin
      .from("client_applications")
      .select(
        "id, client_name, business_name, stable_address, direct_email, admin_email, mobile_number, status, email_verified_at, disclaimer_agreed_at, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const hasAdmin = await hasAnyAdminAssignment();

  return {
    envReady: true,
    membershipLevels: membershipLevels ?? [],
    users: users ?? [],
    applications: ((applications ?? []) as ClientApplicationRow[]).map((application) => ({
      id: application.id,
      clientName: application.client_name,
      businessName: application.business_name ?? null,
      stableAddress: application.stable_address,
      directEmail: application.direct_email,
      adminEmail: application.admin_email ?? null,
      mobileNumber: application.mobile_number,
      status: application.status,
      emailVerifiedAt: application.email_verified_at ?? null,
      disclaimerAgreedAt: application.disclaimer_agreed_at ?? null,
      createdAt: application.created_at,
    })),
    hasAdmin,
  };
}

async function findAuthUserByEmail(email: string) {
  const admin = createSupabaseAdminClient();
  const normalizedEmail = email.trim().toLowerCase();
  const { data, error } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) {
    throw error;
  }

  return data.users.find((user) => user.email?.trim().toLowerCase() === normalizedEmail) ?? null;
}

export async function provisionApprovedApplicationAccess(params: {
  applicationId: string;
  levelCode: string;
}) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error("Missing Supabase service role configuration.");
  }

  const admin = createSupabaseAdminClient();

  const { data: application, error: applicationError } = await admin
    .from("client_applications")
    .select(
      "id, client_name, business_name, stable_address, direct_email, admin_email, mobile_number, status, email_verified_at, disclaimer_agreed_at",
    )
    .eq("id", params.applicationId)
    .maybeSingle();

  if (applicationError || !application) {
    throw new Error("Application not found.");
  }

  if (!application.email_verified_at || !application.disclaimer_agreed_at) {
    throw new Error("Application must be verified before approval.");
  }

  const email = application.direct_email.trim().toLowerCase();
  let authUser = await findAuthUserByEmail(email);
  let inviteSent = false;

  if (!authUser) {
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${appUrl}/sign-in`,
      data: {
        display_name: application.client_name,
      },
    });

    if (inviteError) {
      throw inviteError;
    }

    authUser = inviteData.user ?? null;
    inviteSent = true;
  }

  if (!authUser?.id) {
    throw new Error("The member account could not be provisioned.");
  }

  const bootstrapped = await bootstrapAuthenticatedUser({
    authUserId: authUser.id,
    email,
    displayName: application.client_name,
  });

  if (!bootstrapped.appUserId) {
    throw new Error("The application user profile could not be created.");
  }

  const { error: userUpdateError } = await admin
    .from("users")
    .update({
      email,
      status: "active",
    })
    .eq("id", bootstrapped.appUserId);

  if (userUpdateError) {
    throw userUpdateError;
  }

  const { error: profileUpdateError } = await admin
    .from("member_profiles")
    .update({
      display_name: application.client_name,
      organisation_name: application.business_name || application.stable_address,
      is_active: true,
    })
    .eq("user_id", bootstrapped.appUserId);

  if (profileUpdateError) {
    throw profileUpdateError;
  }

  await assignMembershipLevelToUser({
    userId: bootstrapped.appUserId,
    levelCode: params.levelCode,
  });

  const { error: applicationUpdateError } = await admin
    .from("client_applications")
    .update({
      status: "approved",
      updated_at: new Date().toISOString(),
    })
    .eq("id", application.id);

  if (applicationUpdateError) {
    throw applicationUpdateError;
  }

  return {
    email,
    inviteSent,
  };
}

export async function getAdminUserSnapshot() {
  if (!hasSupabaseAdminEnv()) {
    return {
      envReady: false,
      users: [] as Array<{
        id: string;
        email: string;
        status: string;
        displayName: string | null;
        organisationName: string | null;
        membershipLevelCodes: string[];
      }>,
    };
  }

  const admin = createSupabaseAdminClient();

  const [{ data: users }, { data: profiles }, { data: userMemberships }] = await Promise.all([
    admin.from("users").select("id, email, status").order("created_at", { ascending: false }).limit(50),
    admin
      .from("member_profiles")
      .select("user_id, display_name, organisation_name")
      .order("created_at", { ascending: false }),
    admin
      .from("user_membership_levels")
      .select("user_id, membership_levels(code)")
      .order("created_at", { ascending: false }),
  ]);

  const profileByUserId = new Map(
    ((profiles ?? []) as AdminProfileRow[]).map((profile) => [
      profile.user_id,
      {
        displayName: profile.display_name ?? null,
        organisationName: profile.organisation_name ?? null,
      },
    ]),
  );

  const membershipLevelsByUserId = new Map<string, string[]>();

  for (const row of userMemberships ?? []) {
    const existing = membershipLevelsByUserId.get(row.user_id) ?? [];
    const membershipLevels = (row as AdminUserMembershipRow).membership_levels;
    const nextCode = Array.isArray(membershipLevels)
      ? membershipLevels[0]?.code
      : membershipLevels?.code;

    if (nextCode && !existing.includes(nextCode)) {
      existing.push(nextCode);
    }

    membershipLevelsByUserId.set(row.user_id, existing);
  }

  return {
    envReady: true,
    users: ((users ?? []) as AdminUserRow[]).map((user) => {
      const profile = profileByUserId.get(user.id);

      return {
        id: user.id,
        email: user.email,
        status: user.status,
        displayName: profile?.displayName ?? null,
        organisationName: profile?.organisationName ?? null,
        membershipLevelCodes: membershipLevelsByUserId.get(user.id) ?? [],
      };
    }),
  };
}
