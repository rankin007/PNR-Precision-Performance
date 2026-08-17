import { redirect } from "next/navigation";
import {
  hasActivePortalMembership,
  requireSignedInAppContext,
} from "@/lib/auth/app-context";

export {
  getAppAuthContext,
  hasAppPermission,
  requireAdminAppContext,
  requireOperationalWriteAppContext,
  requirePortalAppContext,
  requireSignedInAppContext,
} from "@/lib/auth/app-context";

export async function requireManagedAccessAppContext(nextPath = "/data-entry/access") {
  const context = await requireSignedInAppContext(nextPath);
  const exactRole =
    context.primaryRole === "administrator" || context.primaryRole === "trainer";

  if (
    exactRole &&
    context.appUserStatus === "active" &&
    context.memberProfileActive &&
    hasActivePortalMembership(context)
  ) {
    return context;
  }

  redirect("/portal?denied=access");
}
