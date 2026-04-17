import Link from "next/link";
import { submitTrackSessionAction } from "@/app/(ops)/data-entry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { getRecentOperationSubmissions } from "@/lib/domain/operations";

type TrackEntryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TrackEntryPage({ searchParams }: TrackEntryPageProps) {
  const params = searchParams ? await searchParams : {};
  const submitted = pickValue(params.submitted) === "true";
  const error = pickValue(params.error);
  const [horsesResult, recentSubmissions] = await Promise.all([
    getAccessibleHorseSummaries(),
    getRecentOperationSubmissions(),
  ]);
  const trackItems = recentSubmissions.submissions.filter((item) => item.id.startsWith("track-"));
  const trackMode = !horsesResult.envReady ? "Preview workflow" : "Live workflow";

  return (
    <SectionCard
      eyebrow="Ops Track"
      title="Track session workflow"
      description="Capture training sessions with enough context to review the work later, then jump straight into the ops review feed for corrections."
    >
      {!horsesResult.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Track entry is currently running in preview workflow mode, so the form and review queue can be tested while live session capture is still being connected.
        </div>
      ) : null}
      {submitted ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Track session submitted successfully.
        </div>
      ) : null}
      {error ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error === "missing-fields"
            ? "Horse and session date are required."
            : "The track session could not be submitted yet."}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Accessible horses</p>
          <p className="mt-4 font-display text-4xl text-ink">{horsesResult.horses.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Horses available for session capture.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Track reviews</p>
          <p className="mt-4 font-display text-4xl text-ink">{trackItems.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">Track submissions currently visible in operations review.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Ops feed</p>
          <p className="mt-4 font-display text-4xl text-ink">{recentSubmissions.submissions.length}</p>
          <p className="mt-3 text-sm leading-7 text-steel">All recent operational submissions in the shared queue.</p>
        </div>
        <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Track mode</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">{trackMode}</p>
          <p className="mt-3 text-sm leading-7 text-steel">
            {!horsesResult.envReady
              ? "Use this route to validate session capture, notes, and review flow before live session data is fully active."
              : "This route is ready for live track-session capture and downstream review."}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={submitTrackSessionAction} className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
          <div>
            <p className="eyebrow">Track Session</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Create a session entry</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Horse
              <select
                name="horseId"
                defaultValue=""
                disabled={horsesResult.horses.length === 0}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              >
                <option value="" disabled>
                  Select a horse
                </option>
                {horsesResult.horses.map((horse) => (
                  <option key={horse.id} value={horse.id}>
                    {horse.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Session date
              <input
                name="sessionDate"
                type="date"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Distance (m)
              <input
                name="distanceValue"
                type="number"
                step="1"
                inputMode="numeric"
                placeholder="1200"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Duration (seconds)
              <input
                name="durationSeconds"
                type="number"
                step="1"
                inputMode="numeric"
                placeholder="82"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Session type
              <input
                name="sessionType"
                type="text"
                placeholder="Gallop"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Surface
              <input
                name="surface"
                type="text"
                placeholder="Sand"
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Notes
              <textarea
                name="notes"
                rows={4}
                placeholder="Add training context, splits, or track notes."
                className="rounded-[1.5rem] border border-ink/10 bg-sand px-4 py-3 text-base text-ink outline-none transition focus:border-ember"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={horsesResult.horses.length === 0}
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
            >
              Submit track session
            </button>
            <Link
              href="/data-entry"
              className="rounded-full border border-ink/10 bg-sand px-5 py-3 text-sm font-semibold text-ink"
            >
              Back to daily entry
            </Link>
          </div>
        </form>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Session Guidance</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Capture enough context</h2>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-steel">
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Record the horse, date, distance, and session type so the submission can be compared later.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Use notes for track conditions, split context, recovery, or anything worth surfacing in reports.
              </p>
              <p className="rounded-2xl border border-ink/10 bg-sand px-4 py-4">
                Include distance and duration together whenever possible so performance review has enough structure to compare sessions.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-panel">
            <p className="eyebrow">Recent Track Entries</p>
            <h2 className="mt-3 font-display text-2xl text-ink">Review queue</h2>
            <div className="mt-6 grid gap-3">
              {trackItems.length === 0 ? (
                <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
                  No track submissions are in the review feed yet.
                </div>
              ) : (
                trackItems.slice(0, 4).map((submission) => (
                  <Link
                    key={submission.id}
                    href={`/data-entry/submissions/${submission.id}`}
                    className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 transition hover:border-ink/20"
                  >
                    <p className="font-semibold text-ink">{submission.horseName}</p>
                    <p className="mt-1 text-sm text-steel">{submission.detail}</p>
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
