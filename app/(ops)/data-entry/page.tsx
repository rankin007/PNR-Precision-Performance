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
  const result = await getAccessibleHorseSummaries();
  const recentSubmissions = await getRecentOperationSubmissions();

  return (
    <SectionCard
      eyebrow="Data Entry"
      title="Daily record submission"
      description={
        "This is the first phone-first operational form. It is prepared to create a daily record and optionally attach temperature, weight, and water intake measurements."
      }
    >
      {!result.envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured yet, so this form is shown as a structural preview.
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
      <form action={submitDailyRecordAction} className="mt-8 grid gap-6">
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
          <div className="rounded-full border border-ink/10 bg-white px-4 py-3 text-sm text-steel">
            Designed for quick phone and desktop entry
          </div>
        </div>
      </form>
      <div className="mt-8 rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Recent Submissions</p>
        {!recentSubmissions.envReady ? (
          <p className="mt-3 text-sm leading-7 text-steel">
            Sample recent submissions are shown until the new Supabase project is connected.
          </p>
        ) : null}
        <div className="mt-5 grid gap-3">
          {recentSubmissions.submissions.length === 0 ? (
            <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-steel">
              No recent submissions are available yet.
            </div>
          ) : (
            recentSubmissions.submissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm text-ink"
              >
                <p className="font-semibold">
                  {submission.type} · {submission.horseName}
                </p>
                <p className="mt-1 text-steel">{submission.detail}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </SectionCard>
  );
}
