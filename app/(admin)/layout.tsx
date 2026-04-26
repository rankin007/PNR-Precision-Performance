import { AppShell } from "@/components/layout/app-shell";
import { requireAdminAppContext } from "@/lib/auth/session";
import { adminNavigation } from "@/lib/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = await requireAdminAppContext("/admin");

  return (
    <AppShell
      area="Administration"
      description="Operational control area for memberships, permissions, commerce, and platform settings."
      navigation={adminNavigation}
      userEmail={context.sessionUser?.email ?? null}
      memberDisplayName={context.memberDisplayName}
      membershipLevelCodes={context.membershipLevelCodes}
      bypassActive={context.bypassActive}
    >
      {children}
    </AppShell>
  );
}
