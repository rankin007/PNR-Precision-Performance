import Link from "next/link";
import { BiochemistryTrendChart } from "@/components/portal/biochemistry-trend-chart";
import {
  filterTrendRows,
  formatTrendValue,
  getVisibleChartGroups,
  timeOfDayLabel,
  type TrendHistoryResult,
  type TrendPreference,
  type TrendPreferenceConfig,
} from "@/lib/domain/biochemistry-trends";

type HorseOption = { id: string; name: string; stableName: string | null };
type FormAction = (formData: FormData) => void | Promise<void>;

type StoredScoreContextProps = {
  testDate: string | null;
  scoringStatus: "scored" | "blocked" | "unscored" | null;
  hydrationScore: number | null;
  biochemistryTrendScore: number | null;
  formulaVersion: string | null;
  sourceVersion: string | null;
};

function storedScoreText(value: number | null) {
  return value === null ? "Not scored" : value.toFixed(2);
}

export function StoredScoreContext(props: StoredScoreContextProps) {
  if (!props.testDate || !props.scoringStatus || !props.formulaVersion || !props.sourceVersion) {
    return <p className="mt-4 text-sm text-steel">Latest result unavailable. No missing value is treated as complete.</p>;
  }
  return (
    <div className="mt-5 rounded-2xl border border-ink/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ember">Latest stored result</p>
      <p className="mt-2 text-sm text-steel">State: {props.scoringStatus}; test date {props.testDate}.</p>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div><dt className="text-sm text-steel">Hydration Score</dt><dd className="mt-1 text-2xl font-semibold text-ink">{storedScoreText(props.hydrationScore)}</dd></div>
        <div><dt className="text-sm text-steel">Biochemistry Trend Score</dt><dd className="mt-1 text-2xl font-semibold text-ink">{storedScoreText(props.biochemistryTrendScore)}</dd></div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-steel">
        Hydration Score is calculated from Carbohydrate and Salts loss values.
        Biochemistry Trend Score is calculated from Carbohydrate, Urine pH, Saliva pH and Salts loss values.
      </p>
      <p className="mt-2 text-sm leading-6 text-steel">
        Numeric results are presented without clinical categories, advice, diagnosis, urgency, treatment or race-readiness meaning.
      </p>
      <p className="mt-2 text-sm text-steel">Formula {props.formulaVersion}; source {props.sourceVersion}.</p>
    </div>
  );
}

type Props = {
  envReady: boolean;
  horses: HorseOption[];
  selectedHorse: HorseOption | null;
  history: TrendHistoryResult;
  config: TrendPreferenceConfig;
  preferences: TrendPreference[];
  preferenceError?: string;
  preferenceStatus?: string;
  createPreferenceAction: FormAction;
  updatePreferenceAction: FormAction;
  deletePreferenceAction: FormAction;
  setDefaultPreferenceAction: FormAction;
};

const controlClass = "min-h-11 w-full min-w-0 rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const buttonClass = "inline-flex min-h-11 w-full items-center justify-center whitespace-normal text-center sm:w-auto rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function ConfigFields({ config }: { config: TrendPreferenceConfig }) {
  return (
    <>
      <input type="hidden" name="scoreView" value={config.scoreView} />
      <input type="hidden" name="phView" value={config.phView} />
      <input type="hidden" name="showCarbohydrate" value={String(config.showCarbohydrate)} />
      <input type="hidden" name="showConductivity" value={String(config.showConductivity)} />
      <input type="hidden" name="timeFilter" value={config.timeFilter} />
      <input type="hidden" name="rangeDays" value={config.rangeDays} />
    </>
  );
}

export function BiochemistryTrends({
  envReady,
  horses,
  selectedHorse,
  history,
  config,
  preferences,
  preferenceError,
  preferenceStatus,
  createPreferenceAction,
  updatePreferenceAction,
  deletePreferenceAction,
  setDefaultPreferenceAction,
}: Props) {
  const filtered = history.availability === "available" ? filterTrendRows(history.rows, config.timeFilter) : { rows: [], excludedUnspecifiedCount: 0 };
  const chartGroups = getVisibleChartGroups(config);

  return (
    <div className="grid min-w-0 gap-6">
      <div className="rounded-2xl border border-ink/10 bg-sand px-4 py-4 text-sm leading-6 text-ink" role="status">
        Stored history helps identify changes over time for one accessible horse. It supports trainer and veterinary review but does not indicate diagnosis, urgency, treatment or race readiness.
      </div>
      {!envReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900" role="status">
          Trends are unavailable because the authorised data service is not configured. No sample records are shown.
        </div>
      ) : null}
      {preferenceStatus ? <p className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink" role="status">Saved-view update: {preferenceStatus}.</p> : null}
      {preferenceError ? <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">{preferenceError} The fixed safe view remains available.</p> : null}

      <section className="min-w-0 max-w-full rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="trend-controls">
        <h2 id="trend-controls" className="font-display text-2xl text-ink">Choose history</h2>
        <form method="get" action="/portal/reports" className="mt-5 grid min-w-0 gap-4 lg:grid-cols-2">
          <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
            Accessible horse
            <select name="horseId" defaultValue={selectedHorse?.id ?? ""} className={controlClass}>
              <option value="">Choose a horse</option>
              {horses.map((horse) => <option key={horse.id} value={horse.id}>{horse.name}{horse.stableName ? ` ??? ${horse.stableName}` : ""}</option>)}
            </select>
          </label>
          <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
            Date window
            <select name="range" defaultValue={config.rangeDays} className={controlClass}>
              <option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">Last 365 days</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
            Recorded time
            <select name="time" defaultValue={config.timeFilter} className={controlClass}>
              <option value="am">AM</option><option value="pm">PM</option><option value="both">AM + PM</option><option value="all">All recorded times</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
            Score chart
            <select name="scoreView" defaultValue={config.scoreView} className={controlClass}>
              <option value="none">Hidden</option><option value="hydration">Hydration Score</option><option value="biochemistry">Biochemistry Trend Score</option><option value="both">Both scores</option>
            </select>
          </label>
          <label className="grid min-w-0 gap-2 break-words text-sm font-semibold text-ink">
            pH chart
            <select name="phView" defaultValue={config.phView} className={controlClass}>
              <option value="none">Hidden</option><option value="urine">Urine pH</option><option value="saliva">Saliva pH</option><option value="both">Both pH readings</option>
            </select>
          </label>
          <fieldset className="grid min-w-0 gap-2 rounded-2xl border border-ink/10 p-3 text-sm text-ink">
            <legend className="px-1 font-semibold">Separate reading charts</legend>
            <label className="flex min-h-11 items-center gap-3"><input type="checkbox" name="carbohydrate" value="true" defaultChecked={config.showCarbohydrate} /> Carbohydrate</label>
            <label className="flex min-h-11 items-center gap-3"><input type="checkbox" name="conductivity" value="true" defaultChecked={config.showConductivity} /> Raw Conductivity</label>
          </fieldset>
          <p className="text-xs leading-5 text-steel lg:col-span-2">Choose one or two chart groups. Score and pH pairs share compatible units; Carbohydrate and Conductivity remain separate.</p>
          <div className="lg:col-span-2"><button type="submit" className={buttonClass}>Update trends</button></div>
        </form>
      </section>

      <section className="min-w-0 max-w-full rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="saved-views">
        <h2 id="saved-views" className="font-display text-2xl text-ink">Saved chart views</h2>
        <p className="mt-2 text-sm leading-6 text-steel">Saved views change chart choices only. They do not modify a horse, test, reading, score, note or assignment.</p>
        <form action={createPreferenceAction} className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end">
          <ConfigFields config={config} />
          <label className="grid flex-1 gap-2 text-sm font-semibold text-ink">View label<input name="label" required minLength={1} maxLength={40} className={controlClass} /></label>
          <button className={buttonClass} type="submit">Save current view</button>
        </form>
        <div className="mt-5 grid gap-3">
          {preferences.map((preference) => (
            <article key={preference.id} className="rounded-2xl bg-sand p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-ink">{preference.label}{preference.isDefault ? " ??? default" : ""}</p>
                <Link className="inline-flex min-h-11 max-w-full items-center justify-center whitespace-normal rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" href={`/portal/reports?view=${encodeURIComponent(preference.id)}${selectedHorse ? `&horseId=${encodeURIComponent(selectedHorse.id)}` : ""}`}>Use view</Link>
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
                <form action={updatePreferenceAction} className="flex min-w-0 flex-col gap-2 sm:flex-row">
                  <input type="hidden" name="preferenceId" value={preference.id} />
                  <ConfigFields config={preference} />
                  <label className="sr-only" htmlFor={`label-${preference.id}`}>Rename {preference.label}</label>
                  <input id={`label-${preference.id}`} name="label" defaultValue={preference.label} minLength={1} maxLength={40} required className={controlClass} />
                  <button type="submit" className={buttonClass}>Save name</button>
                </form>
                {!preference.isDefault ? <form action={setDefaultPreferenceAction}><input type="hidden" name="preferenceId" value={preference.id} /><button className={buttonClass} type="submit">Make default</button></form> : null}
                <form action={deletePreferenceAction}><input type="hidden" name="preferenceId" value={preference.id} /><button className="inline-flex min-h-11 w-full items-center justify-center whitespace-normal rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" type="submit">Delete</button></form>
              </div>
            </article>
          ))}
          {!preferenceError && preferences.length === 0 ? <p className="text-sm text-steel">No saved views yet.</p> : null}
        </div>
      </section>

      {history.availability === "selection-required" ? <p className="rounded-2xl border border-ink/10 bg-white p-5 text-sm text-ink">Choose one accessible horse to view stored history.</p> : null}
      {history.availability === "unavailable" ? <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900" role="alert">Trend history is unavailable. No partial count or chart is shown. Reload to try again.</p> : null}
      {history.availability === "available" && history.totalCount === 0 ? <p className="rounded-2xl border border-ink/10 bg-white p-5 text-sm text-ink">No stored biochemistry records are available for this horse in the selected date window.</p> : null}
      {history.availability === "available" && history.totalCount > 0 && filtered.rows.length === 0 ? <p className="rounded-2xl border border-ink/10 bg-white p-5 text-sm text-ink">Stored records exist in this date window, but none match the selected time filter.</p> : null}
      {history.availability === "available" && filtered.excludedUnspecifiedCount > 0 ? <p className="rounded-2xl border border-ink/10 bg-sand p-4 text-sm text-ink" role="status">{filtered.excludedUnspecifiedCount} historical {filtered.excludedUnspecifiedCount === 1 ? "record has" : "records have"} no AM/PM value and {filtered.excludedUnspecifiedCount === 1 ? "is" : "are"} excluded. Choose All recorded times to include {filtered.excludedUnspecifiedCount === 1 ? "it" : "them"}.</p> : null}

      {history.availability === "available" && filtered.rows.length > 0 ? (
        <>
          <section className="grid gap-5" aria-label={`${selectedHorse?.name ?? "Selected horse"} trend charts`}>
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Selected horse</p><h2 className="mt-2 font-display text-3xl text-ink">{selectedHorse?.name}</h2><p className="mt-2 text-sm text-steel">Stored history from {history.startDate} to {history.endDate}. Showing {filtered.rows.length} filtered {filtered.rows.length === 1 ? "record" : "records"}.</p></div>
            {chartGroups.map((group) => <BiochemistryTrendChart key={group} group={group} rows={filtered.rows} scoreView={config.scoreView} phView={config.phView} />)}
          </section>
          <section className="min-w-0 rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel" aria-labelledby="history-table-heading">
            <h2 id="history-table-heading" className="font-display text-2xl text-ink">Accessible history table</h2>
            <p className="mt-2 text-sm leading-6 text-steel">Every filtered record is listed with its stored status and version. Blocked or unscored results remain not scored.</p>
            <div className="mt-4 w-full min-w-0 overflow-x-auto" tabIndex={0} aria-label="Scrollable accessible biochemistry history table">
              <table className="min-w-[1040px] border-collapse text-left text-sm">
                <thead><tr className="border-b border-ink/15 text-ink"><th className="p-3">Date/time</th><th className="p-3">State</th><th className="p-3">Formula/source</th><th className="p-3">Hydration Score</th><th className="p-3">Biochemistry Trend Score</th><th className="p-3">Carbohydrate</th><th className="p-3">Urine pH</th><th className="p-3">Saliva pH</th><th className="p-3">Raw Conductivity</th></tr></thead>
                <tbody>{filtered.rows.map((row) => {
                  const scored = row.scoringStatus === "scored";
                  return <tr key={row.id} className="border-b border-ink/10 align-top"><td className="p-3 font-medium text-ink">{row.testDate}<br />{timeOfDayLabel(row.timeOfDay)}</td><td className="p-3 text-ink">{row.scoringStatus}</td><td className="p-3 text-steel">{row.formulaVersion}<br />{row.lookupSourceVersion}</td><td className="p-3 text-ink">{formatTrendValue(scored ? row.hydrationScore : null, "hydration")}</td><td className="p-3 text-ink">{formatTrendValue(scored ? row.healthScore : null, "biochemistry")}</td><td className="p-3 text-ink">{formatTrendValue(row.carbsReading, "carbohydrate")}</td><td className="p-3 text-ink">{formatTrendValue(row.phUrine, "ph")}</td><td className="p-3 text-ink">{formatTrendValue(row.phSaliva, "ph")}</td><td className="p-3 text-ink">{formatTrendValue(row.conductivityRawMeterValue, "conductivity")}</td></tr>;
                })}</tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
