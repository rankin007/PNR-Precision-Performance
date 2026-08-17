import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { bootstrapAuthenticatedUser, getInitialAdminEligibility } from "@/lib/auth/bootstrap";
import { normalizeAppRedirectPath } from "@/lib/auth/access";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isOperationalRole, type OperationalRole } from "@/lib/auth/role-matrix";

export type AppAuthContext = {
  envReady: boolean;
  sessionUser: User | null;
  appUserId: string | null;
  appUserStatus: string | null;
  memberProfileId: string | null;
  memberDisplayName: string | null;
  memberProfileActive: boolean;
  membershipLevelCodes: string[];
  permissionCodes: string[];
  primaryRole: OperationalRole | null;
};

type MembershipLevelRow = {
  starts_at?: string | null;
  ends_at?: string | null;
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
  starts_at?: string | null;
  ends_at?: string | null;
  membership_levels?: PermissionMembershipLevel | Array<PermissionMembershipLevel> | null;
};

function uniqueStrings(values: Array<string | null | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function pickFirst<T>(value: T | T[] | null | undefined): T | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

function isMembershipActive(row: { starts_at?: string | null; ends_at?: string | null }, now: Date) {
  const startsAt = row.starts_at ? new Date(row.starts_at) : null;
  const endsAt = row.ends_at ? new Date(row.ends_at) : null;

  return (!startsAt || startsAt <= now) && (!endsAt || endsAt >= now);
}

function emptyAppAuthContext(envReady: boolean): AppAuthContext {
  return {
    envReady,
    sessionUser: null,
    appUserId: null,
    appUserStatus: null,
    memberProfileId: null,
    memberDisplayName: null,
    memberProfileActive: false,
    membershipLevelCodes: [],
    permissionCodes: [],
    primaryRole: null,
  };
}

export async function getAppAuthContext(): Promise<AppAuthContext> {
  if (!hasSupabaseEnv()) {
    return emptyAppAuthContext(false);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return emptyAppAuthContext(true);
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
    .select("id, status, primary_role_code")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  const appUserId = appUser?.id ?? null;
  const now = new Date();

  const { data: memberProfile } = appUserId
    ? await supabase
        .from("member_profiles")
        .select("id, display_name, is_active")
        .eq("user_id", appUserId)
        .maybeSingle()
    : { data: null };

  const { data: membershipRows } = appUserId
    ? await supabase
        .from("user_membership_levels")
        .select("starts_at, ends_at, membership_levels(code)")
        .eq("user_id", appUserId)
    : { data: [] as MembershipLevelRow[] };

  const { data: permissionRows } = appUserId
    ? await supabase
        .from("user_membership_levels")
        .select("starts_at, ends_at, membership_levels!inner(membership_level_permissions!inner(permissions!inner(code)))")
        .eq("user_id", appUserId)
    : { data: [] as PermissionRow[] };

  const typedMembershipRows = (membershipRows ?? []) as MembershipLevelRow[];
  const typedPermissionRows = (permissionRows ?? []) as PermissionRow[];

  const membershipLevelCodes = uniqueStrings(
    typedMembershipRows
      .filter((row) => isMembershipActive(row, now))
      .map((row) => pickFirst(row.membership_levels)?.code),
  );

  const permissionCodes = uniqueStrings(
    typedPermissionRows.filter((row) => isMembershipActive(row, now)).flatMap((row) => {
      const membershipLevel = pickFirst(row.membership_levels);

      return (membershipLevel?.membership_level_permissions ?? []).map(
        (permissionRow) => pickFirst(permissionRow.permissions)?.code,
      );
    }),
  );

  return {
    envReady: true,
    sessionUser: user,
    appUserId,
    appUserStatus: appUser?.status ?? null,
    memberProfileId: memberProfile?.id ?? null,
    memberDisplayName: memberProfile?.display_name ?? user.email ?? null,
    memberProfileActive: Boolean(memberProfile?.is_active),
    membershipLevelCodes,
    permissionCodes,
    primaryRole: isOperationalRole(appUser?.primary_role_code) ? appUser.primary_role_code : null,
  };
}

export function hasAppPermission(context: AppAuthContext, permissionCode: string) {
  return context.permissionCodes.includes(permissionCode);
}

export function hasActivePortalMembership(context: AppAuthContext) {
  return (
    context.appUserStatus === "active" &&
    context.memberProfileActive &&
    context.membershipLevelCodes.length > 0
  );
}

export async function requireSignedInAppContext(nextPath = "/portal") {
  const safeNextPath = normalizeAppRedirectPath(nextPath);
  const context = await getAppAuthContext();

  if (!context.envReady) {
    redirect(`/sign-in?setup=supabase&next=${encodeURIComponent(safeNextPath)}`);
  }

  if (!context.sessionUser) {
    redirect(`/sign-in?next=${encodeURIComponent(safeNextPath)}`);
  }

  return context;
}

export async function requirePortalAppContext(nextPath = "/portal") {
  const safeNextPath = normalizeAppRedirectPath(nextPath);
  const context = await requireSignedInAppContext(safeNextPath);

  if (hasAppPermission(context, "platform.admin") || hasActivePortalMembership(context)) {
    return context;
  }

  const initialAdmin = await getInitialAdminEligibility({
    sessionPresent: Boolean(context.sessionUser),
    appUserId: context.appUserId,
    appUserStatus: context.appUserStatus,
    memberProfilePresent: Boolean(context.memberProfileId),
    memberProfileActive: context.memberProfileActive,
    activeMembershipLevelCodes: context.membershipLevelCodes,
  });

  if (initialAdmin.eligible) {
    return context;
  }

  redirect(`/sign-in?error=portal-access&next=${encodeURIComponent(safeNextPath)}`);
}

export async function requireOperationalWriteAppContext(nextPath = "/data-entry") {
  const context = await requireSignedInAppContext(nextPath);

  if (hasAppPermission(context, "platform.admin") || hasAppPermission(context, "horse.records.write")) {
    return context;
  }

  redirect("/portal?denied=data-entry");
}
export async function requireAdminAppContext(nextPath = "/admin") {
  const context = await requireSignedInAppContext(nextPath);

  if (!hasAppPermission(context, "platform.admin")) {
    redirect("/portal?denied=admin");
  }

  return context;
}
