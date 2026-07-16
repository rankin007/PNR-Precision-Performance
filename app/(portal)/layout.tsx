import { AppShell } from "@/components/layout/app-shell";
import { requirePortalAppContext } from "@/lib/auth/session";
import { portalNavigation } from "@/lib/navigation";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = await requirePortalAppContext("/portal");

  return (
    <AppShell
      area="Member Portal"
      description="Permission-aware owner and trainer workspace for horses, records, and reporting."
      navigation={portalNavigation}
      userEmail={context.sessionUser?.email ?? null}
      memberDisplayName={context.memberDisplayName}
      membershipLevelCodes={context.membershipLevelCodes}
    >
      {children}
    </AppShell>
  );
}
