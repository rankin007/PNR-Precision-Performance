import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

export default async function PortalHorsesPage() {
  const result = await getAccessibleHorseSummaries();
  const activeCount = result.horses.filter((horse) => horse.status === "active").length;
  const assignedStableCount = result.horses.filter((horse) => horse.stableName).length;
  const unassignedStableCount = result.horses.length - assignedStableCount;
  const portalMode = !result.envReady
    ? "Preview mode"
    : result.horses.length > 0
      ? "Live access"
      : "Awaiting assignments";

  return (
    <SectionCard
      eyebrow="Portal Horses"
      title="Assigned horses"
      description="Review the horses available to your signed-in account, then move directly into each profile for metrics, history, and member-scoped detail."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          The horse portal is running in preview mode, so curated sample horse cards are shown while live member assignments and horse records are still being connected.
        </div>
      ) : null}
      {"error" in result && result.error ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Horse data could not be loaded yet: {result.error}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Accessible horses</p>
          <p className="mt-4 font-display text-4xl text-ink">{result.horses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Horse profiles currently available to this account.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Active horses</p>
          <p className="mt-4 font-display text-4xl text-ink">{activeCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Profiles currently marked active in the visible list.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Stable assigned</p>
          <p className="mt-4 font-display text-4xl text-ink">{assignedStableCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Horse profiles already linked to a named stable.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Portal mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{portalMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!result.envReady
              ? "Layouts, navigation, and horse profile framing can be reviewed before live Supabase assignments are in place."
              : "This area reflects the horse records currently available to the signed-in member experience."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
          {result.horses.map((horse) => (
            <div
              key={horse.id}
              className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                Horse Profile
              </p>
              <h2 className="mt-4 font-display text-3xl text-ink">{horse.name}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">
                Stable: {horse.stableName ?? "Not yet assigned"}
              </p>
              <p className="text-sm leading-7 text-steel">
                Status: {horse.status ?? "Not yet captured"}
              </p>
              <p className="mt-3 text-sm leading-7 text-steel">
                {horse.stableName
                  ? "Profile context is in place for owner, trainer, and reporting visibility."
                  : "Stable context still needs to be connected before this profile feels fully live."}
              </p>
              <div className="mt-5">
                <Link
                  href={`/portal/horses/${horse.id}`}
                  className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
                >
                  Open horse
                </Link>
              </div>
            </div>
          ))}
          {result.horses.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm text-steel shadow-panel md:col-span-2">
              No accessible horses are available for this account yet.
            </div>
          ) : null}
        </div>

        <div className="grid gap-6">
          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Access readiness</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Portal coverage</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Stable linkage</p>
                <p className="mt-1 text-steel">{unassignedStableCount} horse profiles still need stable context.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                <p className="font-semibold">Member experience</p>
                <p className="mt-1 text-steel">
                  {!result.envReady
                    ? "Preview data is letting you review card layout, navigation, and profile structure before live assignments are present."
                    : "The visible list is ready for members to move from assigned horses into profile-level reporting."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Next routes</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Continue through the portal</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/portal/reports"
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
              >
                Open reports
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
              >
                Contact team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
