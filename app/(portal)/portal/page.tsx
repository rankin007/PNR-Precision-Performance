import { bootstrapInitialAdminAction } from "@/app/(admin)/admin/memberships/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getMembershipAdminSnapshot } from "@/lib/auth/bootstrap";
import { getAppAuthContext } from "@/lib/auth/session";
import Link from "next/link";
import { hasAppPermission } from "@/lib/auth/app-context";
import { getStableWorkspaceOverview } from "@/lib/domain/horses";

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
  const overview = await getStableWorkspaceOverview(hasAppPermission(context, "platform.admin") || hasAppPermission(context, "horse.records.write"));
  const shouldShowInitialAdminBootstrap =
    context.envReady && Boolean(context.sessionUser && context.appUserId) && !snapshot.hasAdmin;

  return (
    <SectionCard
      eyebrow="Member Portal"
      title="Trainer dashboard"
      description="A permission-aware worklist of accessible horses and their latest biochemistry workflow state."
    >
      {denied === "admin" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Administrative access was requested, but your account does not currently have the `platform.admin` permission.
        </div>
      ) : null}
      {denied === "data-entry" ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Operational data-entry workflow access requires the `horse.records.write` permission.
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
      <div className="mb-6 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm leading-6 text-steel" role="status">
        Incomplete operational work is shown first, then horse name. This order does not indicate clinical priority, health urgency or race readiness.
      </div>
      {!overview.envReady ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900" role="status">
          Dashboard unavailable. The authorised data service is not configured, so no horse records are shown.
        </div>
      ) : null}
      {"error" in overview && overview.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900" role="alert">
          Dashboard failed to load. No missing information is treated as complete or actionable. Reload to try again.
        </div>
      ) : null}
      <div className="grid gap-4" aria-label="Accessible horse operational worklist">
        {overview.horses.map((horse) => <article key={horse.id} className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{horse.stableName ?? "Stable unavailable"}</p><h2 className="mt-2 break-words font-display text-2xl text-ink">{horse.name}</h2></div><Link href={`/portal/horses/${horse.id}`} className="w-fit rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Open workspace</Link></div>
          <div className="mt-5 rounded-2xl bg-sand p-4"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Workflow state</p><p className="mt-2 font-semibold text-ink">{horse.operational?.workflow.label ?? "Unavailable"}</p><p className="mt-1 text-sm leading-6 text-steel">{horse.operational?.workflow.reason ?? "Workflow information is unavailable."}</p><p className="mt-2 text-xs text-steel">Basis: latest accessible biochemistry record{horse.operational?.workflow.occurredAt ? ` dated ${horse.operational.workflow.occurredAt}` : "; no current record date"}.</p></div>
          {horse.operational?.nextAction ? <div className="mt-4"><Link href={horse.operational.nextAction.href} className="text-sm font-semibold text-ember underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Next: {horse.operational.nextAction.label}</Link></div> : null}
        </article>)}
        {overview.envReady && !("error" in overview) && overview.horses.length === 0 ? <p className="rounded-2xl border border-ink/10 bg-white p-5 text-sm text-steel">No accessible horses are assigned to this account. No sample records are shown.</p> : null}
      </div>
    </SectionCard>
  );
}
