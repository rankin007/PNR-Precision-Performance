import { bootstrapInitialAdminAction } from "@/app/(admin)/admin/memberships/actions";
import { SectionCard } from "@/components/layout/section-card";
import { TrainerCockpit } from "@/components/portal/trainer-cockpit";
import { getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";
import { getAppAuthContext } from "@/lib/auth/session";
import { hasAppPermission } from "@/lib/auth/app-context";
import { getStableWorkspaceOverview } from "@/lib/domain/horses";

type PortalPageProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PortalPage({ searchParams }: PortalPageProps) {
  const params = searchParams ? await searchParams : {};
  const bootstrapState = pickValue(params.bootstrap);
  const denied = pickValue(params.denied);
  const context = await getAppAuthContext();
  const snapshot = await getMembershipAdminSnapshot();
  const overview = await getStableWorkspaceOverview(
    hasAppPermission(context, "platform.admin") || hasAppPermission(context, "horse.records.write"),
  );
  const shouldShowInitialAdminBootstrap =
    context.envReady && Boolean(context.sessionUser && context.appUserId) && !snapshot.hasAdmin;

  return (
    <SectionCard
      eyebrow="Member Portal"
      title="Trainer dashboard"
      description="A permission-aware daily worklist of accessible horses and their latest biochemistry workflow state."
    >
      {denied === "admin" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Administrative access was requested, but your account does not currently have the platform.admin permission.
        </div>
      ) : null}
      {denied === "data-entry" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Operational data-entry workflow access requires the horse.records.write permission.
        </div>
      ) : null}
      {bootstrapState === "already-configured" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Initial admin onboarding has already been completed for this project.
        </div>
      ) : null}
      {bootstrapState === "service-role-missing" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          The service role configuration is required before first-admin onboarding can run.
        </div>
      ) : null}
      {shouldShowInitialAdminBootstrap ? (
        <aside className="mb-8 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel" aria-labelledby="admin-onboarding">
          <h2 id="admin-onboarding" className="font-display text-2xl text-ink">Initial admin onboarding</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-steel">
            No admin membership assignment exists yet. The current signed-in account can claim the first admin role,
            which unlocks membership assignment, permissions and platform administration.
          </p>
          <form action={bootstrapInitialAdminAction} className="mt-5">
            <button type="submit" className="min-h-11 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
              Claim first admin access
            </button>
          </form>
        </aside>
      ) : null}
      <TrainerCockpit
        envReady={overview.envReady}
        error={overview.error}
        cockpit={overview.cockpit}
        horses={overview.horses}
      />
    </SectionCard>
  );
}
