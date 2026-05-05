import Image from "next/image";
import Link from "next/link";
import { deleteHorseGalleryItemAction } from "@/app/(ops)/data-entry/horses/actions";
import { SectionCard } from "@/components/layout/section-card";
import { SimpleMetricChart } from "@/components/charts/simple-metric-chart";
import { GalleryDeleteButton } from "@/components/ops/gallery-delete-button";
import { getTrainerHorseWorkspace } from "@/lib/domain/trainer-horses";

type TrainerHorseHistoryPageProps = {
  params: Promise<{ horseId: string }>;
};

function formatMetric(value: number | null) {
  return typeof value === "number" ? String(value) : "-";
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .map((word) => (word ? `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}` : word))
    .join(" ");
}

function buildSessionNotePreview(entry: {
  trainingSession: string | null;
  attitude: string | null;
  jockeyComments: string | null;
  notes: string | null;
}) {
  const parts = [
    entry.trainingSession,
    entry.attitude ? `Attitude: ${entry.attitude}` : null,
    entry.jockeyComments ? `Jockey: ${entry.jockeyComments}` : null,
    entry.notes ? `Additional Notes: ${entry.notes}` : null,
  ].filter(Boolean);

  return parts.join(" | ") || "-";
}

export default async function TrainerHorseHistoryPage({ params }: TrainerHorseHistoryPageProps) {
  const { horseId } = await params;
  const result = await getTrainerHorseWorkspace(horseId);

  if (!result.workspace) {
    return (
      <SectionCard
        eyebrow="Input History"
        title="Horse not available"
        description="This horse could not be resolved for the signed-in trainer context."
      >
        <Link
          href="/data-entry/horses"
          className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to horse workspace
        </Link>
      </SectionCard>
    );
  }

  const { horse, biochemistryEntries, operationalHistory, galleryItems } = result.workspace;

  return (
    <SectionCard
      eyebrow="Input History"
      title={horse.name}
      description="Complete trainer-facing history across urine and saliva results, operational records, and gallery assets for this horse."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/data-entry/horses/${horse.id}`}
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          Back to workspace
        </Link>
        <Link
          href={`/data-entry/horses/${horse.id}/etrakka`}
          className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
        >
          E-Trakka Data
        </Link>
        <Link
          href="/data-entry/horses"
          className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
        >
          All horses
        </Link>
      </div>

      <div className="mt-8 grid gap-6">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Urine And Saliva</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Biochemistry Result History</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-ink">
              <thead className="text-xs uppercase tracking-[0.14em] text-steel">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Weight kg</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Carbs %</th>
                  <th className="px-3 py-2">Salts ms</th>
                  <th className="px-3 py-2">Salts C</th>
                  <th className="px-3 py-2">Urine pH</th>
                  <th className="px-3 py-2">Saliva pH</th>
                  <th className="px-3 py-2">Urea</th>
                  <th className="px-3 py-2">Session notes</th>
                </tr>
              </thead>
              <tbody>
                {biochemistryEntries.length === 0 ? (
                  <tr>
                    <td className="px-3 py-4 text-steel" colSpan={10}>
                      No biochemistry history is available yet.
                    </td>
                  </tr>
                ) : (
                  biochemistryEntries.map((entry) => (
                    <tr key={entry.id} className="border-t border-ink/10">
                      <td className="px-3 py-3">{entry.sampledAt.slice(0, 16).replace("T", " ")}</td>
                      <td className="px-3 py-3">{formatMetric(entry.weightKg)}</td>
                      <td className="px-3 py-3">{toTitleCase(entry.sampleType.replace(/_/g, " "))}</td>
                      <td className="px-3 py-3">{formatMetric(entry.carbsPercentage)}</td>
                      <td className="px-3 py-3">{formatMetric(entry.saltsMs)}</td>
                      <td className="px-3 py-3">{formatMetric(entry.saltsC)}</td>
                      <td className="px-3 py-3">{formatMetric(entry.urinePh)}</td>
                      <td className="px-3 py-3">{formatMetric(entry.salivaPh)}</td>
                      <td className="px-3 py-3">{formatMetric(entry.ureaLevel)}</td>
                      <td className="px-3 py-3 text-steel align-top">
                        <details className="group min-w-[22rem]">
                          <summary
                            className="flex cursor-pointer items-center justify-between gap-3 outline-none select-none"
                            title={buildSessionNotePreview(entry)}
                          >
                            <span className="block min-w-0 truncate">{buildSessionNotePreview(entry)}</span>
                            <svg className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-3 rounded-2xl border border-ink/10 bg-sand px-4 py-3 leading-relaxed">
                            {entry.trainingSession ? <p>{entry.trainingSession}</p> : null}
                            {entry.attitude ? <p className="mt-2">Attitude: {entry.attitude}</p> : null}
                            {entry.jockeyComments ? <p className="mt-2">Jockey: {entry.jockeyComments}</p> : null}
                            {entry.notes ? <p className="mt-2">Additional Notes: {entry.notes}</p> : null}
                            {!entry.trainingSession && !entry.attitude && !entry.jockeyComments && !entry.notes ? <p>-</p> : null}
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Trend Charts</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Four-day marker graphs</h2>
          <p className="mt-3 text-sm leading-7 text-steel">
            Hover over each point to see the trainer note, horse attitude, and jockey feedback tied to that result.
          </p>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {result.workspace.chartSeries.map((series) => (
              <SimpleMetricChart key={series.key} label={series.label} points={series.points} />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Operations</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Complete input timeline</h2>
          <div className="mt-6 grid gap-3">
            {operationalHistory.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No operational history has been recorded yet.
              </div>
            ) : (
              operationalHistory.map((item) => (
                <div key={item.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">{item.source} / {item.dateLabel}</p>
                  <p className="mt-1 text-steel">{item.summary}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div id="horse-gallery-history" className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 font-display text-2xl text-ink">Horse gallery history</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel md:col-span-2 xl:col-span-3">
                No gallery history is available yet.
              </div>
            ) : (
              galleryItems.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-sand">
                  <div className="relative h-44 w-full">
                    <div className="absolute right-3 top-3 z-10">
                      <GalleryDeleteButton
                        action={deleteHorseGalleryItemAction}
                        horseId={horse.id}
                        galleryItemId={item.id}
                        imageUrl={item.imageUrl}
                        returnTo={`/data-entry/horses/${horse.id}/history`}
                        returnHash="horse-gallery-history"
                      />
                    </div>
                    <a
                      href={item.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="block h-full w-full"
                      aria-label={`Open ${item.caption ?? horse.name} image`}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.caption ?? horse.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </a>
                  </div>
                  <div className="px-4 py-3 text-sm text-ink">
                    <p className="font-semibold">{item.caption ?? "Horse gallery image"}</p>
                    <p className="mt-1 text-steel">{item.takenAt ? item.takenAt.replace("T", " ").slice(0, 16) : "Date not set"}</p>
                    <a
                      href={item.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink"
                    >
                      Open full size
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
