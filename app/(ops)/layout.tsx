import { AppShell } from "@/components/layout/app-shell";
import { requirePortalAppContext } from "@/lib/auth/session";
import { opsNavigationForRole } from "@/lib/navigation";

export default async function OpsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = await requirePortalAppContext("/data-entry");

  return (
    <AppShell
      area="Operations"
      description="Phone-first operational workflows for horse records, feeding, and training capture."
      navigation={opsNavigationForRole(context.primaryRole)}
      userEmail={context.sessionUser?.email ?? null}
      memberDisplayName={context.memberDisplayName}
      membershipLevelCodes={context.membershipLevelCodes}
    >
      {children}
    </AppShell>
  );
}
