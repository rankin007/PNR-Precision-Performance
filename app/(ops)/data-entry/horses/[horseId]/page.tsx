import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";
import { SimpleMetricChart } from "@/components/charts/simple-metric-chart";
import { HorseWorkspaceToolbar } from "@/components/ops/horse-workspace-toolbar";
import { EtrakkaUploader } from "@/components/ops/etrakka-uploader";
import { NewTestModal } from "@/components/ops/new-test-modal";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { getTrainerHorseWorkspace } from "@/lib/domain/trainer-horses";
import {
  addHorseBiochemistryResultAction,
  addHorseGalleryItemAction,
  updateHorseProfileAction,
} from "@/app/(ops)/data-entry/horses/actions";

type TrainerHorseWorkspacePageProps = {
  params: Promise<{ horseId: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TrainerHorseWorkspacePage({
  params,
  searchParams,
}: TrainerHorseWorkspacePageProps) {
  const { horseId } = await params;
  const query = searchParams ? await searchParams : {};
  const saved = pickValue(query.saved);
  const error = pickValue(query.error);
  const [result, horseList] = await Promise.all([
    getTrainerHorseWorkspace(horseId),
    getAccessibleHorseSummaries(),
  ]);

  if (!result.workspace) {
    return (
      <SectionCard
        eyebrow="Horse Workspace"
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

  const {
    horse,
    latestReferenceMetrics,
    galleryItems,
    biochemistryEntries,
    operationalHistory,
    chartSeries,
  } = result.workspace;

  const latestBiochemistry = biochemistryEntries[0] ?? null;

  return (
    <SectionCard
      eyebrow="Horse Workspace"
      title={horse.name}
      description="A trainer-facing summary panel for profile review, new test entry, trend analysis, hover notes, and full result history in one mobile-friendly workspace."
    >
      <HorseWorkspaceToolbar
        horses={horseList.horses.map((item) => ({ id: item.id, name: item.name }))}
        currentHorseId={horse.id}
      />

      {saved ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {saved === "profile"
            ? "Horse profile saved."
            : saved === "gallery"
              ? "Gallery item added."
              : "Biochemistry result saved and returned to results."}
        </div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error.replace(/-/g, " ")}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section id="horse-profile" className="grid gap-4">
          <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-panel">
            {galleryItems[0] ? (
              <img
                src={galleryItems[0].imageUrl}
                alt={galleryItems[0].caption ?? horse.name}
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="flex h-64 items-center justify-center bg-sand text-sm text-steel">
                No profile image attached yet.
              </div>
            )}
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Horse Profile</p>
              <h2 className="mt-3 font-display text-3xl text-ink">{horse.name}</h2>
              <div className="mt-5 grid gap-3 text-sm text-steel md:grid-cols-2">
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-3">Stable: {horse.stableName ?? "Not yet assigned"}</p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-3">Status: {horse.status ?? "Pending"}</p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-3">Breed: {horse.breed ?? "Pending"}</p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-3">Colour: {horse.colour ?? "Pending"}</p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-3">Sex: {horse.sex ?? "Pending"}</p>
                <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-3">DOB: {horse.dateOfBirth ?? "Pending"}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Last weight</p>
              <p className="mt-4 font-display text-4xl text-ink">
                {latestBiochemistry?.weightKg
                  ? `${latestBiochemistry.weightKg} kg`
                  : latestReferenceMetrics.find((metric) => metric.label === "Latest weight")?.value ?? "-"}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Last hydration score</p>
              <p className="mt-4 font-display text-4xl text-ink">{latestBiochemistry?.hydrationScore ?? "-"}</p>
            </div>
            <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Review mode</p>
              <p className="mt-4 font-display text-4xl text-ink">{biochemistryEntries.length}</p>
              <p className="mt-2 text-sm text-steel">Tests stored for this horse</p>
            </div>
          </div>
        </section>

        <section id="summary-analysis" className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Summary Analysis</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Trend line and result summary</h2>
            </div>
            <Link
              href={`/data-entry/horses/${horse.id}/history`}
              className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
            >
              Spreadsheet history
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-ink/10 bg-[#d7eef6] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1c6482]">Latest test</p>
              <p className="mt-2 text-lg font-semibold text-ink">
                {latestBiochemistry ? latestBiochemistry.sampledAt.slice(0, 16).replace("T", " ") : "No test yet"}
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-[#d7eef6] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1c6482]">Training session</p>
              <p className="mt-2 text-sm leading-6 text-ink">
                {latestBiochemistry?.trainingSession ?? latestBiochemistry?.notes ?? "No trainer note yet."}
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-[#d7eef6] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1c6482]">Jockey comments</p>
              <p className="mt-2 text-sm leading-6 text-ink">
                {latestBiochemistry?.jockeyComments ?? "No jockey comment yet."}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {chartSeries.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No graphable biochemistry data has been entered yet.
              </div>
            ) : (
              <SimpleMetricChart label={chartSeries[0].label} points={chartSeries[0].points} />
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form action={updateHorseProfileAction} className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div>
            <p className="eyebrow">Horse Profile</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Profile input</h2>
          </div>

          <input type="hidden" name="horseId" value={horse.id} />

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Horse name
              <input name="name" defaultValue={horse.name} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Status
              <input name="status" defaultValue={horse.status ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Sex
              <input name="sex" defaultValue={horse.sex ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Breed
              <input name="breed" defaultValue={horse.breed ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Colour
              <input name="colour" defaultValue={horse.colour ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Date of birth
              <input name="dateOfBirth" type="date" defaultValue={horse.dateOfBirth ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Microchip number
              <input name="microchipNumber" defaultValue={horse.microchipNumber ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Registration number
              <input name="registrationNumber" defaultValue={horse.registrationNumber ?? ""} className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
            </label>
          </div>

          <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Save horse profile
          </button>
        </form>

        <form action={addHorseGalleryItemAction} className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div>
            <p className="eyebrow">Horse Gallery</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Add gallery image</h2>
          </div>

          <input type="hidden" name="horseId" value={horse.id} />

          <label className="grid gap-2 text-sm font-medium text-ink">
            Image URL or file path
            <input name="imageUrl" placeholder="/horse-images/example.jpg" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Caption
            <input name="caption" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Taken at
            <input name="takenAt" type="datetime-local" className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none" />
          </label>

          <button type="submit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Add gallery item
          </button>
        </form>
      </div>

      <div id="etrakka-import" className="mt-8 scroll-mt-24">
        <EtrakkaUploader horseId={horse.id} horseName={horse.name} />
      </div>

      <div id="new-test" className="mt-8 flex flex-col items-center justify-center py-6">
        <NewTestModal horseId={horse.id} latestReferenceMetrics={latestReferenceMetrics} />
        <p className="mt-3 text-sm text-steel text-center max-w-sm">
          Tap to open the dedicated full-screen panel for rapid testing insertion.
        </p>
      </div>

      <div id="review-results" className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Review Results</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Latest line-by-line results</h2>
            </div>
            <Link
              href={`/data-entry/horses/${horse.id}/history`}
              className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink"
            >
              Full history
            </Link>
          </div>
          <div className="mt-6 grid gap-3">
            {biochemistryEntries.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No urine or saliva results have been entered yet.
              </div>
            ) : (
              biochemistryEntries.slice(0, 6).map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <p className="font-semibold">{entry.sampleType.replace(/_/g, " ")} / {entry.sampledAt.slice(0, 16).replace("T", " ")}</p>
                  <p className="mt-1 text-steel">
                    Carbs {entry.carbsPercentage ?? "-"}% / Salts {entry.saltsC ?? "-"} C / Urine pH {entry.urinePh ?? "-"} / Saliva pH {entry.salivaPh ?? "-"} / Urea {entry.ureaLevel ?? "-"}
                  </p>
                  {entry.trainingSession || entry.attitude || entry.jockeyComments || entry.notes ? (
                    <details className="mt-3 group">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.1em] text-ember hover:text-ink outline-none select-none flex items-center justify-between">
                        <span>Session Notes</span>
                        <svg className="w-4 h-4 transition-transform group-open:rotate-180 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <p className="mt-2 text-steel leading-relaxed">
                        {entry.trainingSession ? `${entry.trainingSession}. ` : ""}
                        {entry.attitude ? `Attitude: ${entry.attitude}. ` : ""}
                        {entry.jockeyComments ? `Jockey: ${entry.jockeyComments}. ` : ""}
                        {entry.notes && !entry.trainingSession ? entry.notes : ""}
                      </p>
                    </details>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <p className="eyebrow">Latest profile-linked inputs</p>
          <h2 className="mt-3 font-display text-2xl text-ink">History panel</h2>
          <div className="mt-6 grid gap-3">
            {operationalHistory.length === 0 ? (
              <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                No operational input history has been recorded yet.
              </div>
            ) : (
              operationalHistory.slice(0, 8).map((item) => (
                <div key={item.id} className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink">
                  <details className="group">
                    <summary className="cursor-pointer font-semibold outline-none flex items-center justify-between select-none">
                      <span className="capitalize">{item.source} / {item.dateLabel}</span>
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="mt-3 pt-3 border-t border-ink/5 text-steel leading-relaxed">
                      {item.summary}
                    </div>
                  </details>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div id="individual-panels" className="mt-8 grid gap-6 xl:grid-cols-2">
        {chartSeries.length === 0 ? (
          <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel xl:col-span-2">
            No graphable biochemistry data has been entered yet.
          </div>
        ) : (
          chartSeries.map((series) => (
            <SimpleMetricChart key={series.key} label={series.label} points={series.points} />
          ))
        )}
      </div>
    </SectionCard>
  );
}
