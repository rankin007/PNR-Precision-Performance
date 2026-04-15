import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

export default async function PortalHorsesPage() {
  const result = await getAccessibleHorseSummaries();

  return (
    <SectionCard
      eyebrow="Portal Horses"
      title="Assigned horse area"
      description="This route now resolves horses through the signed-in user context. When the new Supabase project is connected, only accessible horses should appear here."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured yet, so sample horse cards are shown for structure only.
        </div>
      ) : null}
      {"error" in result && result.error ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Horse data could not be loaded yet: {result.error}
        </div>
      ) : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.horses.map((horse) => (
          <div
            key={horse.id}
            className="rounded-[1.75rem] border border-ink/10 bg-sand p-5 shadow-panel"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              Horse Profile
            </p>
            <h2 className="mt-4 font-display text-3xl text-ink">{horse.name}</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              Stable: {horse.stableName ?? "Awaiting stable assignment"}
            </p>
            <p className="text-sm leading-7 text-steel">
              Status: {horse.status ?? "Awaiting status"}
            </p>
            <div className="mt-5">
              <Link
                href={`/portal/horses/${horse.id}`}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink"
              >
                Open horse
              </Link>
            </div>
          </div>
        ))}
      </div>
      {result.horses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm text-steel">
          No accessible horses are available for this account yet.
        </div>
      ) : null}
    </SectionCard>
  );
}
