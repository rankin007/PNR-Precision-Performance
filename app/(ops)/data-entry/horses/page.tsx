import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

export default async function TrainerHorseWorkspaceIndexPage() {
  const result = await getAccessibleHorseSummaries();

  return (
    <SectionCard
      eyebrow="Horse Workspace"
      title="Trainer horse inputs"
      description="Choose a horse to manage profile details, record urine and saliva results, maintain a gallery, and review the full input history."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Accessible horses</p>
          <p className="mt-4 font-display text-4xl text-ink">{result.horses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Only horses visible to the signed-in trainer context appear here.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.horses.map((horse) => (
          <div key={horse.id} className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Horse</p>
            <h2 className="mt-4 font-display text-3xl text-ink">{horse.name}</h2>
            <p className="mt-3 text-sm leading-7 text-steel">
              Stable: {horse.stableName ?? "Not yet assigned"}
            </p>
            <p className="text-sm leading-7 text-steel">Status: {horse.status ?? "Pending"}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/data-entry/horses/${horse.id}`}
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"
              >
                Open workspace
              </Link>
              <Link
                href={`/data-entry/horses/${horse.id}/history`}
                className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
              >
                View history
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
