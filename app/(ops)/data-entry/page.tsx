import Link from "next/link";
import { submitDailyRecordAction } from "@/app/(ops)/data-entry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";

type DataEntryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DataEntryPage({ searchParams }: DataEntryPageProps) {
  const params = searchParams ? await searchParams : {};
  const submitted = pickValue(params.submitted) === "true";
  const error = pickValue(params.error);
  const [result, recentSubmissions] = await Promise.all([
    getAccessibleHorseSummaries(),
    getRecentOperationSubmissions(),
  ]);
  const dailyCount = recentSubmissions.submissions.filter((item) => item.id.startsWith("daily-")).length;
  const feedingCount = recentSubmissions.submissions.filter((item) => item.id.startsWith("feeding-")).length;
  const trackCount = recentSubmissions.submissions.filter((item) => item.id.startsWith("track-")).length;
  const opsMode = !result.envReady ? "Preview workflow" : "Live workflow";

  return (
    <SectionCard
      eyebrow="Data Entry"
      title="Daily record submission"
      description="Capture the core daily operational record, then move quickly into feeding, track, and submission review workflows without leaving the ops area."
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Daily entry is currently running in preview workflow mode, so the form and recent queue can be reviewed while live horse and submission data are still being connected.
        </div>
      ) : null}
      {submitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Daily record submitted successfully.
        </div>
      ) : null}
      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "missing-fields"
            ? "Horse and record date are required."
            : error === "record-create-failed"
              ? "The daily record could not be created."
              : "The form could not be submitted yet."}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Accessible horses</p>
          <p className="mt-4 font-display text-4xl text-ink">{result.horses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Available horses for quick operational entry.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Daily records</p>
          <p className="mt-4 font-display text-4xl text-ink">{dailyCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Recent daily submissions available for review.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Feeding logs</p>
          <p className="mt-4 font-display text-4xl text-ink">{feedingCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Recent feeding entries currently in the submission feed.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Track sessions</p>
          <p className="mt-4 font-display text-4xl text-ink">{trackCount}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Recent track items available for correction and review.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Ops mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{opsMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!result.envReady
              ? "Use this route to validate the full daily-entry flow before the live ops dataset is fully active."
              : "This route is ready for daily logging and review across health, feeding, and track workflows."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={submitDailyRecordAction} className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Daily Record</p>
              <h2 className="mt-3 font-display text-2xl text-ink">Create a new submission</h2>
            </div>
            <div className="rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm text-steel">
              Phone and desktop ready
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Horse
              <select
                name="horseId"
                defaultValue=""
                disabled={result.horses.length === 0}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              >
                <option value="" disabled>
                  Select a horse
                </option>
                {result.horses.map((horse) => (
                  <option key={horse.id} value={horse.id}>
                    {horse.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Record date
              <input
                name="recordDate"
                type="date"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Temperature (C)
              <input
                name="temperatureValue"
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="37.8"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Weight (kg)
              <input
                name="weightValue"
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="482.0"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Water intake (L)
              <input
                name="waterValue"
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="26.5"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Notes
            <textarea
              name="notes"
              rows={5}
              placeholder="Add operational notes, observations, or context for the day."
              className="rounded-[1.5rem] border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={result.horses.length === 0}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
            >
              Submit daily record
            </button>
            <Link
              href="/data-entry/submissions"
              className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
            >
              Review submissions
            </Link>
          </div>
        </form>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Ops Shortcuts</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Move between workflows</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/data-entry/horses"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Horse workspace
              </Link>
              <Link
                href="/data-entry/feeding"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Feeding entry
              </Link>
              <Link
                href="/data-entry/track"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Track entry
              </Link>
              <Link
                href="/portal/reports"
                className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
              >
                Member reports
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Entry guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">What a good daily record should include</h2>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-steel">
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Capture the horse and record date first so the submission anchors to a real operational day.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Add temperature, weight, and hydration values whenever they are available so member reporting has trusted inputs.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Use notes to preserve what changed operationally instead of relying on numbers alone.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent Submissions</p>
            {!recentSubmissions.envReady ? (
              <p className="mt-3 text-sm leading-7 text-steel">
                Curated recent submissions are shown until the live Supabase ops feed is available.
              </p>
            ) : null}
            <div className="mt-5 grid gap-3">
              {recentSubmissions.submissions.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No recent submissions are available yet.
                </div>
              ) : (
                recentSubmissions.submissions.slice(0, 5).map((submission) => (
                  <Link
                    key={submission.id}
                    href={`/data-entry/submissions/${submission.id}`}
                    className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink transition hover:border-ink/20"
                  >
                    <p className="font-semibold">
                      {submission.type} / {submission.horseName}
                    </p>
                    <p className="mt-1 text-steel">{submission.detail}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
