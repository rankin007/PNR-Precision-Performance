import { submitBiochemistryTestAction } from "@/app/(ops)/data-entry/biochemistry/actions";
import { SectionCard } from "@/components/layout/section-card";
import { Notice } from "@/components/ui/notice";
import { getAccessibleHorseSummaries } from "@/lib/domain/horses";
import { requireOperationalWriteAppContext } from "@/lib/auth/session";

type BiochemistryEntryPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function errorMessage(error: string | undefined) {
  switch (error) {
    case "missing-fields":
      return "Horse, date, time of day, and all readings are required.";
    case "invalid-number":
      return "All reading fields must contain valid numbers.";
    case "horse-not-accessible":
      return "That horse is not available for biochemistry entry from this account.";
    case "supabase-not-configured":
      return "Supabase is not configured, so live biochemistry tests cannot be submitted yet.";
    case "biochemistry-schema-unavailable":
      return "The biochemistry tables are not available in Supabase yet. Apply the approved local migration before live submissions.";
    case "lookup-load-failed":
      return "Exact lookup rows could not be loaded, so scoring cannot run without guessing.";
    case "save-failed":
      return "The biochemistry test could not be saved.";
    case "comment-length":
      return "Manual notes must contain no more than 2,000 characters.";
    default:
      return error ? "The biochemistry form could not be submitted yet." : null;
  }
}

export default async function BiochemistryEntryPage({ searchParams }: BiochemistryEntryPageProps) {
  await requireOperationalWriteAppContext("/data-entry/biochemistry");
  const params = searchParams ? await searchParams : {};
  const error = pickValue(params.error);
  const message = errorMessage(error);
  const horsesResult = await getAccessibleHorseSummaries();

  return (
    <SectionCard
      eyebrow="Biochemistry"
      title="Mobile test capture"
      description="Capture manual biochemistry readings for an assigned horse and produce an auditable scoring result without guessing missing lookup values."
    >
      {!horsesResult.envReady ? (
        <Notice tone="warning" title="Live capture unavailable">
          Supabase is not configured yet, so this capture workflow is shown as a structural preview.
        </Notice>
      ) : null}

      {message ? (
        <Notice className="mt-6" tone="attention" title="Submission needs attention">
          {message}
        </Notice>
      ) : null}

      <form action={submitBiochemistryTestAction} className="mt-8 grid gap-6">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Horse
            <select
              name="horseId"
              defaultValue=""
              disabled={horsesResult.horses.length === 0}
              className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
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
            Test date
            <input
              name="testDate"
              type="date"
              className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Time of day
            <select
              name="timeOfDay"
              defaultValue="unspecified"
              className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
              <option value="unspecified">Unspecified</option>
            </select>
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Readings</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Carbs
              <input
                name="carbsReading"
                type="number"
                step="0.0001"
                inputMode="decimal"
                placeholder="2.5"
                className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              pH Saliva
              <input
                name="phSaliva"
                type="number"
                step="0.0001"
                inputMode="decimal"
                placeholder="6.4"
                className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              pH Urine
              <input
                name="phUrine"
                type="number"
                step="0.0001"
                inputMode="decimal"
                placeholder="6.6"
                className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Conductivity raw
              <input
                name="conductivityRawMeterValue"
                type="number"
                step="0.0001"
                inputMode="decimal"
                placeholder="10"
                className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Urea
              <input
                name="ureaReading"
                type="number"
                step="0.0001"
                inputMode="decimal"
                placeholder="2.5"
                className="rounded-2xl border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
              />
            </label>
          </div>
        </div>

        <label className="grid gap-2 text-sm font-medium text-ink">
          Manual notes
          <textarea
            name="notes"
            rows={5}
            maxLength={2000}
            placeholder="Add trainer/staff context for this test."
            className="rounded-[1.5rem] border border-technical/20 bg-canvas px-4 py-3 text-base text-technical transition focus:border-data"
          />
        </label>

        <div className="grid gap-3 sm:flex sm:items-center">
          <button
            type="submit"
            disabled={horsesResult.horses.length === 0}
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-technical disabled:cursor-not-allowed disabled:bg-muted"
          >
            Submit biochemistry test
          </button>
          <div className="rounded-full border border-ink/10 bg-white px-4 py-3 text-sm text-steel">
            Exact lookup only
          </div>
        </div>
      </form>
    </SectionCard>
  );
}
