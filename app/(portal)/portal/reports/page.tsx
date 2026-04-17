import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseDetail, getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";

export default async function PortalReportsPage() {
  const horsesResult = await getAccessibleHorseSummaries();
  const submissionsResult = await getRecentOperationSubmissions();
  const spotlightHorseIds = horsesResult.horses.slice(0, 3).map((horse) => horse.id);
  const spotlightResults = await Promise.all(
    spotlightHorseIds.map((horseId) => getAccessibleHorseDetail(horseId)),
  );
  const spotlightHorses = spotlightResults
    .flatMap((result) => (result.horse ? [result.horse] : []))
    .slice(0, 3);
  const timelineEntries = spotlightHorses
    .flatMap((horse) =>
      horse.recentTimeline.map((entry) => ({
        horseName: horse.name,
        date: entry.date,
        summary: entry.summary,
      })),
    )
    .slice(0, 6);
  const metricCount = spotlightHorses.reduce((total, horse) => total + horse.recentMetrics.length, 0);
  const reportMode = !horsesResult.envReady || !submissionsResult.envReady
    ? "Preview reporting"
    : spotlightHorses.length > 0
      ? "Live reporting"
      : "Awaiting data";

  return (
    <SectionCard
      eyebrow="Portal Reports"
      title="Reporting overview"
      description="Review the latest horse indicators and timeline entries that are currently available through your permission-scoped portal access."
    >
      {!horsesResult.envReady || !submissionsResult.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Reporting is currently running in preview mode, so spotlight data and submission context are being shown from staged records while live member reporting connections are still being completed.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Horse profiles</p>
          <p className="mt-4 font-display text-4xl text-ink">{horsesResult.horses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Accessible horses available for member reporting.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Report spotlights</p>
          <p className="mt-4 font-display text-4xl text-ink">{spotlightHorses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Horse profiles with the freshest metrics pulled into this view.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent metrics</p>
          <p className="mt-4 font-display text-4xl text-ink">{metricCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Latest temperature, weight, and hydration indicators in view.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent submissions</p>
          <p className="mt-4 font-display text-4xl text-ink">{submissionsResult.submissions.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Operational entries contributing to the current reporting feed.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Report mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{reportMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!horsesResult.envReady || !submissionsResult.envReady
              ? "Use this view to validate report structure and member readability before live reporting data is fully connected."
              : "This view reflects the current member-visible reporting surface across horse summaries and recent operations."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Horse Spotlights</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Latest accessible profiles</h2>
          <div className="mt-6 grid gap-4">
            {spotlightHorses.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No horse reports are available yet.
              </div>
            ) : (
              spotlightHorses.map((horse) => (
                <div key={horse.id} className="rounded-2xl border border-ink/10 bg-sand px-5 py-5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-ink">{horse.name}</p>
                      <p className="mt-1 text-sm text-steel">
                        Stable: {horse.stableName ?? "Pending"} / Status: {horse.status ?? "Pending"}
                      </p>
                    </div>
                    <p className="text-sm text-steel">DOB: {horse.dateOfBirth ?? "Not captured"}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {horse.recentMetrics.length > 0 ? (
                      horse.recentMetrics.map((metric) => (
                        <span
                          key={`${horse.id}-${metric.label}`}
                          className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink"
                        >
                          {metric.label}: {metric.value}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-steel">
                        No recent metrics
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Report guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">How members should use this view</h2>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Start with horse spotlights to understand the latest visible profile and metric context.
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Use the timeline to understand what changed recently before drilling into a specific horse profile.
              </div>
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                Use the submission feed as supporting operational context rather than as the primary reporting destination.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Timeline</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Recent observations</h2>
            <div className="mt-6 grid gap-3">
              {timelineEntries.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No recent timeline entries are available.
                </div>
              ) : (
                timelineEntries.map((entry, index) => (
                  <div
                    key={`${entry.horseName}-${entry.date}-${index}`}
                    className="rounded-2xl border border-ink/10 bg-sand px-4 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                      {entry.date}
                    </p>
                    <p className="mt-2 font-semibold text-ink">{entry.horseName}</p>
                    <p className="mt-1 text-sm leading-7 text-steel">{entry.summary}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Submission Feed</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Operational context</h2>
            <div className="mt-6 grid gap-3">
              {submissionsResult.submissions.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No recent submissions are available.
                </div>
              ) : (
                submissionsResult.submissions.slice(0, 4).map((submission) => (
                  <div key={submission.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                      {submission.type}
                    </p>
                    <p className="mt-2 font-semibold text-ink">{submission.horseName}</p>
                    <p className="mt-1 text-sm leading-7 text-steel">{submission.detail}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
