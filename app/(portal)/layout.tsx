import { AppShell } from "@/components/layout/app-shell";
import { requireSignedInAppContext } from "@/lib/auth/session";
import { portalNavigation } from "@/lib/navigation";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = await requireSignedInAppContext("/portal");

  return (
    <AppShell
      area="Member Portal"
      description="Permission-aware owner and trainer workspace for horses, records, and reporting."
      navigation={portalNavigation}
      userEmail={context.sessionUser?.email ?? null}
      memberDisplayName={context.memberDisplayName}
      membershipLevelCodes={context.membershipLevelCodes}
      bypassActive={context.bypassActive}
    >
      {children}
    </AppShell>
  );
}
