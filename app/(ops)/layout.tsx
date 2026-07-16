import { AppShell } from "@/components/layout/app-shell";
import { requireOperationalWriteAppContext } from "@/lib/auth/session";
import { opsNavigation } from "@/lib/navigation";

export default async function OpsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = await requireOperationalWriteAppContext("/data-entry");

  return (
    <AppShell
      area="Operations"
      description="Phone-first operational workflows for horse records, feeding, and training capture."
      navigation={opsNavigation}
      userEmail={context.sessionUser?.email ?? null}
      memberDisplayName={context.memberDisplayName}
      membershipLevelCodes={context.membershipLevelCodes}
    >
      {children}
    </AppShell>
  );
}
