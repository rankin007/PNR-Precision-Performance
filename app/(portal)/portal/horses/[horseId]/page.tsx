import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseDetail } from "@/lib/domain/horses";

type HorseDetailPageProps = {
  params: Promise<{ horseId: string }>;
};

export default async function HorseDetailPage({ params }: HorseDetailPageProps) {
  const { horseId } = await params;
  const result = await getAccessibleHorseDetail(horseId);

  if (!result.horse) {
    return (
      <SectionCard
        eyebrow="Horse Detail"
        title="Horse not available"
        description={
          "This horse could not be resolved for the current account or the record does not exist yet."
        }
      >
        <div className="mt-2">
          <Link
            href="/portal/horses"
            className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
          >
            Back to horses
          </Link>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      eyebrow="Horse Detail"
      title={result.horse.name}
      description="Permission-aware horse profile view with recent physiological snapshots and core horse identity details."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured yet, so sample horse detail data is being shown.
        </div>
      ) : null}
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Profile</p>
          <div className="mt-5 grid gap-3 text-sm text-steel">
            <p>Status: {result.horse.status ?? "Awaiting status"}</p>
            <p>Stable: {result.horse.stableName ?? "Awaiting stable assignment"}</p>
            <p>Breed: {result.horse.breed ?? "Awaiting breed data"}</p>
            <p>Colour: {result.horse.colour ?? "Awaiting colour data"}</p>
            <p>Date of birth: {result.horse.dateOfBirth ?? "Awaiting date of birth"}</p>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
            Recent Metrics
          </p>
          <div className="mt-5 grid gap-3">
            {result.horse.recentMetrics.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No recent metric snapshots are available yet.
              </div>
            ) : (
              result.horse.recentMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink"
                >
                  <p className="font-semibold">{metric.label}</p>
                  <p className="mt-1 text-steel">{metric.value}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent History</p>
        <div className="mt-5 grid gap-4">
          {result.horse.recentTimeline.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
              No recent history is available yet.
            </div>
          ) : (
            result.horse.recentTimeline.map((entry) => (
              <div
                key={`${entry.date}-${entry.summary}`}
                className="grid gap-2 rounded-2xl border border-ink/10 bg-sand px-4 py-4 md:grid-cols-[140px_minmax(0,1fr)]"
              >
                <p className="text-sm font-semibold text-ink">{entry.date}</p>
                <p className="text-sm leading-7 text-steel">{entry.summary}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </SectionCard>
  );
}
