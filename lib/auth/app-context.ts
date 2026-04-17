import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { bootstrapAuthenticatedUser } from "@/lib/auth/bootstrap";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AppAuthContext = {
  envReady: boolean;
  sessionUser: User | null;
  appUserId: string | null;
  memberProfileId: string | null;
  memberDisplayName: string | null;
  membershipLevelCodes: string[];
  permissionCodes: string[];
};

type MembershipLevelRow = {
  membership_levels?: { code?: string | null } | Array<{ code?: string | null }> | null;
};

type PermissionMembershipLevel = {
  membership_level_permissions?:
    | Array<{
        permissions?: { code?: string | null } | Array<{ code?: string | null }> | null;
      }>
    | null;
};

type PermissionRow = {
  membership_levels?: PermissionMembershipLevel | Array<PermissionMembershipLevel> | null;
};

function uniqueStrings(values: Array<string | null | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function pickFirstMembershipCodeValue(
  value: { code?: string | null } | Array<{ code?: string | null }> | null | undefined,
): { code?: string | null } | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

function pickFirstMembershipLevel(
  value: PermissionMembershipLevel | Array<PermissionMembershipLevel> | null | undefined,
) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

export async function getAppAuthContext(): Promise<AppAuthContext> {
  if (!hasSupabaseEnv()) {
    return {
      envReady: false,
      sessionUser: null,
      appUserId: null,
      memberProfileId: null,
      memberDisplayName: null,
      membershipLevelCodes: [],
      permissionCodes: [],
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      envReady: true,
      sessionUser: null,
      appUserId: null,
      memberProfileId: null,
      memberDisplayName: null,
      membershipLevelCodes: [],
      permissionCodes: [],
    };
  }

  await bootstrapAuthenticatedUser({
    authUserId: user.id,
    email: user.email ?? null,
    displayName:
      typeof user.user_metadata?.display_name === "string"
        ? user.user_metadata.display_name
        : typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : null,
    firstName:
      typeof user.user_metadata?.first_name === "string" ? user.user_metadata.first_name : null,
    lastName:
      typeof user.user_metadata?.last_name === "string" ? user.user_metadata.last_name : null,
  });

  const { data: appUser } = await supabase
    .from("users")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const appUserId = appUser?.id ?? null;

  const { data: memberProfile } = appUserId
    ? await supabase
        .from("member_profiles")
        .select("id, display_name")
        .eq("user_id", appUserId)
        .maybeSingle()
    : { data: null };

  const { data: membershipRows } = appUserId
    ? await supabase
        .from("user_membership_levels")
        .select("membership_levels(code)")
        .eq("user_id", appUserId)
    : { data: [] as MembershipLevelRow[] };

  const { data: permissionRows } = appUserId
    ? await supabase
        .from("user_membership_levels")
        .select("membership_levels!inner(membership_level_permissions!inner(permissions!inner(code)))")
        .eq("user_id", appUserId)
    : { data: [] as PermissionRow[] };

  const membershipLevelCodes = uniqueStrings(
    (membershipRows ?? []).map((row) => pickFirstMembershipCodeValue(row.membership_levels)?.code),
  );

  const permissionCodes = uniqueStrings(
    (permissionRows ?? []).flatMap((row) => {
      const membershipLevel = pickFirstMembershipLevel(row.membership_levels);

      return (membershipLevel?.membership_level_permissions ?? []).map(
        (permissionRow) => pickFirstMembershipCodeValue(permissionRow.permissions)?.code,
      );
    }),
  );

  return {
    envReady: true,
    sessionUser: user,
    appUserId,
    memberProfileId: memberProfile?.id ?? null,
    memberDisplayName: memberProfile?.display_name ?? user.email ?? null,
    membershipLevelCodes,
    permissionCodes,
  };
}

export function hasAppPermission(context: AppAuthContext, permissionCode: string) {
  return context.permissionCodes.includes(permissionCode);
}

export async function requireSignedInAppContext(nextPath = "/portal") {
  const context = await getAppAuthContext();

  if (!context.envReady) {
    redirect(`/sign-in?setup=supabase&next=${encodeURIComponent(nextPath)}`);
  }

  if (!context.sessionUser) {
    redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
  }

  return context;
}

export async function requireAdminAppContext(nextPath = "/admin") {
  const context = await requireSignedInAppContext(nextPath);

  if (!hasAppPermission(context, "platform.admin")) {
    redirect("/portal?denied=admin");
  }

  return context;
}
