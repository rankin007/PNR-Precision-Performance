import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

type AuthUserBootstrapInput = {
  authUserId: string;
  email: string | null;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
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
      hasAdmin: false,
    };
  }

  const admin = createSupabaseAdminClient();

  const [{ data: membershipLevels }, { data: users }] = await Promise.all([
    admin.from("membership_levels").select("code, name").order("sort_order"),
    admin.from("users").select("id, email, status").order("created_at", { ascending: false }).limit(20),
  ]);

  const hasAdmin = await hasAnyAdminAssignment();

  return {
    envReady: true,
    membershipLevels: membershipLevels ?? [],
    users: users ?? [],
    hasAdmin,
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
    (profiles ?? []).map((profile: any) => [
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
    const membershipLevels = row.membership_levels as any;
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
    users: (users ?? []).map((user: any) => {
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
