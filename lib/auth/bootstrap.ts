import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export type InitialAdminEligibilityInput = {
  sessionPresent: boolean;
  appUserId: string | null;
  appUserStatus: string | null;
  memberProfilePresent: boolean;
  memberProfileActive: boolean;
  activeMembershipLevelCodes: string[];
};

export type InitialAdminEligibilityResult = {
  eligible: boolean;
  reason:
    | "eligible"
    | "actor-ineligible"
    | "active-membership"
    | "membership-history"
    | "administrator-exists"
    | "uncertain";
};

type InitialAdminEligibilityFacts = InitialAdminEligibilityInput & {
  membershipHistoryReliable: boolean;
  membershipHistoryCount: number;
  administratorStateReliable: boolean;
  administratorAssignmentExists: boolean;
};

const administratorCodes = ["administrator", "admin"];

export type AtomicInitialAdminClaimResult = "claimed" | "denied";

export function classifyAtomicInitialAdminClaim(data: unknown, hasError: boolean): AtomicInitialAdminClaimResult {
  return !hasError && data === "claimed" ? "claimed" : "denied";
}

export async function claimInitialAdministrator(): Promise<AtomicInitialAdminClaimResult> {
  const client = await createSupabaseServerClient();
  const { data, error } = await client.rpc("claim_initial_administrator");
  return classifyAtomicInitialAdminClaim(data, Boolean(error));
}

export function classifyInitialAdminEligibility(
  facts: InitialAdminEligibilityFacts,
): InitialAdminEligibilityResult {
  if (!facts.sessionPresent || !facts.appUserId || facts.appUserStatus !== "active"
    || !facts.memberProfilePresent || !facts.memberProfileActive) {
    return { eligible: false, reason: "actor-ineligible" };
  }
  if (!Array.isArray(facts.activeMembershipLevelCodes) || facts.activeMembershipLevelCodes.length > 0) {
    return { eligible: false, reason: "active-membership" };
  }
  if (!facts.membershipHistoryReliable || !Number.isInteger(facts.membershipHistoryCount)
    || facts.membershipHistoryCount < 0 || !facts.administratorStateReliable) {
    return { eligible: false, reason: "uncertain" };
  }
  if (facts.membershipHistoryCount > 0) return { eligible: false, reason: "membership-history" };
  if (facts.administratorAssignmentExists) return { eligible: false, reason: "administrator-exists" };
  return { eligible: true, reason: "eligible" };
}

async function getAdministratorAssignmentState() {
  if (!hasSupabaseAdminEnv()) return { reliable: false, hasAssignment: true };
  const admin = createSupabaseAdminClient();
  const levels = await admin.from("membership_levels").select("id,code").in("code", administratorCodes);
  if (levels.error || !Array.isArray(levels.data)) return { reliable: false, hasAssignment: true };
  const canonical = levels.data.filter((row) => row?.code === "administrator" && typeof row.id === "string");
  const recognized = levels.data.filter((row) => administratorCodes.includes(row?.code) && typeof row.id === "string");
  if (canonical.length !== 1 || recognized.length < 1 || recognized.length > 2) return { reliable: false, hasAssignment: true };
  const assignments = await admin
    .from("user_membership_levels")
    .select("id", { count: "exact", head: true })
    .in("membership_level_id", recognized.map((row) => row.id));
  if (assignments.error || typeof assignments.count !== "number" || assignments.count < 0) {
    return { reliable: false, hasAssignment: true };
  }
  return { reliable: true, hasAssignment: assignments.count > 0 };
}

export async function getInitialAdminEligibility(
  input: InitialAdminEligibilityInput,
): Promise<InitialAdminEligibilityResult> {
  if (!hasSupabaseAdminEnv()) return classifyInitialAdminEligibility({ ...input, membershipHistoryReliable: false, membershipHistoryCount: -1, administratorStateReliable: false, administratorAssignmentExists: true });
  const admin = createSupabaseAdminClient();
  const history = await admin
    .from("user_membership_levels")
    .select("id", { count: "exact", head: true })
    .eq("user_id", input.appUserId);
  const globalState = await getAdministratorAssignmentState();
  return classifyInitialAdminEligibility({
    ...input,
    membershipHistoryReliable: !history.error && typeof history.count === "number",
    membershipHistoryCount: typeof history.count === "number" ? history.count : -1,
    administratorStateReliable: globalState.reliable,
    administratorAssignmentExists: globalState.hasAssignment,
  });
}

export async function verifyCanonicalAdministratorAssignment(userId: string) {
  if (!hasSupabaseAdminEnv() || !userId) return false;
  const admin = createSupabaseAdminClient();
  const level = await admin.from("membership_levels").select("id").eq("code", "administrator").maybeSingle();
  if (level.error || !level.data?.id) return false;
  const intended = await admin.from("user_membership_levels").select("id", { count: "exact", head: true })
    .eq("user_id", userId).eq("membership_level_id", level.data.id);
  const global = await admin.from("user_membership_levels").select("id", { count: "exact", head: true })
    .eq("membership_level_id", level.data.id);
  return !intended.error && !global.error && intended.count === 1 && global.count === 1;
}

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
  const state = await getAdministratorAssignmentState();
  return !state.reliable || state.hasAssignment;
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

  const primaryRoleByMembership: Record<string, string | null> = {
    admin: "administrator",
    administrator: "administrator",
    trainer: "trainer",
    "stable-manager": "stable_manager",
    veterinarian: "veterinarian",
    consultant: "consultant",
    "stable-hand": "stable_hand",
    "stable-staff": "stable_hand",
    staff: "stable_hand",
    owner: null,
  };
  if (Object.prototype.hasOwnProperty.call(primaryRoleByMembership, membershipLevel.code)) {
    const { error: roleError } = await admin
      .from("users")
      .update({
        primary_role_code: primaryRoleByMembership[membershipLevel.code],
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.userId);
    if (roleError) throw roleError;
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
