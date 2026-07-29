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
      <div className="mb-6 rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel" role="status">Operational attention highlights incomplete records only. Clinical priority is unavailable; the list is alphabetical.</div>
      <div className="grid gap-4" aria-label="Accessible horse operational overview">
        {overview.horses.map((horse) => <article key={horse.id} className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{horse.stableName ?? "Stable unavailable"}</p><h2 className="mt-2 font-display text-2xl text-ink">{horse.name}</h2><p className="mt-2 text-sm text-steel">Last biochemistry activity: {horse.lastActivity ?? "None available"}</p></div><Link href={`/portal/horses/${horse.id}`} className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink">Open workspace</Link></div>
          <dl className="mt-5 grid gap-3 md:grid-cols-3"><div className="rounded-2xl bg-sand p-4"><dt className="font-semibold text-ink">Attention</dt><dd className="mt-1 text-sm text-steel">{horse.operational?.attention.status}: {horse.operational?.attention.reason}</dd></div><div className="rounded-2xl bg-sand p-4"><dt className="font-semibold text-ink">Incomplete</dt><dd className="mt-1 text-sm text-steel">{horse.operational?.incomplete.status}: {horse.operational?.incomplete.reason}</dd></div><div className="rounded-2xl bg-sand p-4"><dt className="font-semibold text-ink">Changed</dt><dd className="mt-1 text-sm text-steel">{horse.operational?.changed.status}: {horse.operational?.changed.reason}</dd></div></dl>
          <div className="mt-4"><Link href={horse.operational?.nextAction.href ?? `/portal/horses/${horse.id}`} className="text-sm font-semibold text-ember underline underline-offset-4">Next: {horse.operational?.nextAction.label ?? "Open workspace"}</Link></div>
        </article>)}
        {overview.horses.length === 0 ? <p className="rounded-2xl border border-ink/10 bg-white p-5 text-sm text-steel">No accessible horses are available for this account.</p> : null}
      </div>
    </SectionCard>
  );
}
