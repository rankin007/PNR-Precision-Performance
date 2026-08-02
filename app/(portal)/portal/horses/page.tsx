import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

export default async function PortalHorsesPage() {
  const result = await getAccessibleHorseSummaries();

  return (
    <SectionCard
      eyebrow="Portal Horses"
      title="Assigned horse area"
      description="Review horses available to this approved account through the existing permission boundary."
    >
      {result.presentation.state !== "ready" ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" role="status">
          <p className="font-semibold">{result.presentation.title}</p>
          <p className="mt-1">{result.presentation.message}</p>
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
          No horse cards are available in this state.
        </div>
      ) : null}
    </SectionCard>
  );
}
