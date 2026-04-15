import { submitTrackSessionAction } from "@/app/(ops)/data-entry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";

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
  const horsesResult = await getAccessibleHorseSummaries();

  return (
    <SectionCard
      eyebrow="Ops Track"
      title="Track session workflow area"
      description="This route now supports horse selection, session capture, distance entry, and training context submission."
    >
      {!horsesResult.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured yet, so this track form is shown as a structural preview.
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
      <form action={submitTrackSessionAction} className="mt-8 grid gap-6">
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

        <button
          type="submit"
          disabled={horsesResult.horses.length === 0}
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-steel"
        >
          Submit track session
        </button>
      </form>
    </SectionCard>
  );
}
