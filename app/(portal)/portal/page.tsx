import { bootstrapInitialAdminAction } from "@/app/(admin)/admin/memberships/actions";
import { SectionCard } from "@/components/layout/section-card";
import { StatusGrid } from "@/components/layout/status-grid";
import { getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";
import { getAppAuthContext } from "@/lib/auth/session";

const portalItems = [
  "Assigned horses entry point",
  "Reporting area shell",
  "Account management expansion point",
  "Permission-aware dashboard slot",
];

type PortalPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const params = searchParams ? await searchParams : {};
  const bootstrapState = pickValue(params.bootstrap);
  const denied = pickValue(params.denied);
  const context = await getAppAuthContext();
  const snapshot = await getMembershipAdminSnapshot();
  const shouldShowInitialAdminBootstrap =
    context.envReady && Boolean(context.sessionUser && context.appUserId) && !snapshot.hasAdmin;

  return (
    <SectionCard
      eyebrow="Member Portal"
      title="Portal shell ready"
      description={
        "This route group is reserved for authenticated owner, trainer, and future member experiences such as dashboards, horse profiles, reporting, and account flows."
      }
    >
      {denied === "admin" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Administrative access was requested, but your account does not currently have the `platform.admin` permission.
        </div>
      ) : null}
      {bootstrapState === "already-configured" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Initial admin onboarding has already been completed for this project.
        </div>
      ) : null}
      {bootstrapState === "service-role-missing" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Set `SUPABASE_SERVICE_ROLE_KEY` before running first-admin onboarding.
        </div>
      ) : null}
      {shouldShowInitialAdminBootstrap ? (
        <div className="mb-8 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <h2 className="font-display text-2xl text-ink">Initial admin onboarding</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-steel">
            No admin membership assignment exists yet. The current signed-in account can claim the first
            admin role, which unlocks membership assignment, permissions, and platform administration.
          </p>
          <form action={bootstrapInitialAdminAction} className="mt-5">
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Claim first admin access
            </button>
          </form>
        </div>
      ) : null}
      <StatusGrid items={portalItems} />
    </SectionCard>
  );
}
