"use server";

import { redirect } from "next/navigation";
import {
  assignMembershipLevelToUser,
  claimInitialAdministrator,
  getInitialAdminEligibility,
  getMembershipAdminSnapshot,
} from "@/lib/auth/bootstrap";
import { requireAdminAppContext, requireSignedInAppContext } from "@/lib/auth/session";
import { hasSupabaseAdminEnv } from "@/lib/supabase/admin";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function bootstrapInitialAdminAction() {
  const context = await requireSignedInAppContext("/portal");

  if (!hasSupabaseAdminEnv()) {
    redirect("/portal?bootstrap=service-role-missing");
  }

  const eligibility = await getInitialAdminEligibility({
    sessionPresent: Boolean(context.sessionUser),
    appUserId: context.appUserId,
    appUserStatus: context.appUserStatus,
    memberProfilePresent: Boolean(context.memberProfileId),
    memberProfileActive: context.memberProfileActive,
    activeMembershipLevelCodes: context.membershipLevelCodes,
  });

  if (!eligibility.eligible || !context.appUserId) redirect("/portal?bootstrap=denied");

  if ((await claimInitialAdministrator()) !== "claimed") {
    redirect("/portal?bootstrap=denied");
  }

  redirect("/admin?bootstrapped=admin");
}

export async function assignMembershipLevelByEmailAction(formData: FormData) {
  await requireAdminAppContext("/admin/memberships");

  if (!hasSupabaseAdminEnv()) {
    redirect("/admin/memberships?error=service-role-missing");
  }

  const email = readString(formData, "email").toLowerCase();
  const levelCode = readString(formData, "levelCode");

  if (!email || !levelCode) {
    redirect("/admin/memberships?error=missing-fields");
  }

  if (!emailPattern.test(email)) {
    redirect("/admin/memberships?error=invalid-email");
  }

  const snapshot = await getMembershipAdminSnapshot();
  const allowedLevel = snapshot.membershipLevels.find((level) => level.code === levelCode);

  if (!allowedLevel) {
    redirect("/admin/memberships?error=invalid-level");
  }

  const targetUser = snapshot.users.find((user) => user.email.toLowerCase() === email);

  if (!targetUser) {
    redirect("/admin/memberships?error=user-not-found");
  }

  try {
    await assignMembershipLevelToUser({
      userId: targetUser.id,
      levelCode,
    });
  } catch {
    redirect("/admin/memberships?error=assignment-failed");
  }

  redirect(`/admin/memberships?assigned=${encodeURIComponent(email)}&level=${encodeURIComponent(levelCode)}`);
}
