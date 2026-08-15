import { BiochemistryTrends } from "@/components/portal/biochemistry-trends";
import { DEFAULT_TREND_PREFERENCE, type BiochemistryTrendRow, type TrendHistoryResult, type TrendPreference } from "@/lib/domain/biochemistry-trends";

const horse = { id: "synthetic-alpha", name: "Synthetic Alpha", stableName: "Example Stable" };
const rows: BiochemistryTrendRow[] = [
  { id: "trend-08", horseId: horse.id, testDate: "2026-08-11", timeOfDay: "pm", scoringStatus: "scored", hydrationScore: 0.84, healthScore: 0.78, carbsReading: 4.1, phUrine: 6.72, phSaliva: 6.83, conductivityRawMeterValue: 18.4, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted lookup authority", lookupSourceVersion: "v3" },
  { id: "trend-07", horseId: horse.id, testDate: "2026-08-11", timeOfDay: "am", scoringStatus: "scored", hydrationScore: 0.82, healthScore: 0.76, carbsReading: 4.4, phUrine: 6.68, phSaliva: 6.79, conductivityRawMeterValue: 19.2, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted lookup authority", lookupSourceVersion: "v3" },
  { id: "trend-06", horseId: horse.id, testDate: "2026-08-10", timeOfDay: "pm", scoringStatus: "blocked", hydrationScore: 0.91, healthScore: 0.88, carbsReading: 4.8, phUrine: 6.61, phSaliva: 6.75, conductivityRawMeterValue: 20.1, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted lookup authority", lookupSourceVersion: "v3" },
  { id: "trend-05", horseId: horse.id, testDate: "2026-08-10", timeOfDay: "am", scoringStatus: "scored", hydrationScore: 0.79, healthScore: 0.73, carbsReading: 5.0, phUrine: 6.58, phSaliva: 6.70, conductivityRawMeterValue: 21.3, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted lookup authority", lookupSourceVersion: "v3" },
  { id: "trend-04", horseId: horse.id, testDate: "2026-08-09", timeOfDay: "pm", scoringStatus: "scored", hydrationScore: 0.77, healthScore: 0.71, carbsReading: 5.3, phUrine: 6.54, phSaliva: 6.66, conductivityRawMeterValue: 22.0, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted lookup authority", lookupSourceVersion: "v3" },
  { id: "trend-03", horseId: horse.id, testDate: "2026-08-09", timeOfDay: "am", scoringStatus: "unscored", hydrationScore: null, healthScore: null, carbsReading: 5.5, phUrine: 6.50, phSaliva: 6.62, conductivityRawMeterValue: 22.8, formulaVersion: "biochemistry-score-v2", lookupSourceDocument: "Accepted lookup authority", lookupSourceVersion: "v3" },
  { id: "trend-02", horseId: horse.id, testDate: "2026-08-08", timeOfDay: "pm", scoringStatus: "scored", hydrationScore: 0.74, healthScore: 0.68, carbsReading: 5.8, phUrine: 6.45, phSaliva: 6.58, conductivityRawMeterValue: 23.7, formulaVersion: "biochemistry-score-v1", lookupSourceDocument: "Prior accepted authority", lookupSourceVersion: "v1" },
  { id: "trend-01", horseId: horse.id, testDate: "2026-08-08", timeOfDay: "unspecified", scoringStatus: "scored", hydrationScore: 0.72, healthScore: 0.66, carbsReading: 6.0, phUrine: 6.42, phSaliva: 6.55, conductivityRawMeterValue: 24.2, formulaVersion: "biochemistry-score-v1", lookupSourceDocument: "Prior accepted authority", lookupSourceVersion: "v1" },
];
const history: TrendHistoryResult = { availability: "available", selectedHorseId: horse.id, rows, totalCount: rows.length, startDate: "2026-05-14", endDate: "2026-08-11" };
const preferences: TrendPreference[] = [
  { id: "view-default", label: "Daily score and pH", ...DEFAULT_TREND_PREFERENCE, isDefault: true },
  { id: "view-morning", label: "Morning score review", scoreView: "both", phView: "none", showCarbohydrate: false, showConductivity: false, timeFilter: "am", rangeDays: 30, isDefault: false },
];
async function evidenceOnlyAction(_formData: FormData): Promise<void> { "use server"; }
type EvidenceProps = { searchParams?: Promise<Record<string, string | string[] | undefined>> };
export default async function EvidenceTrends({ searchParams }: EvidenceProps) {
  const params = searchParams ? await searchParams : {};
  const config = params.mode === "readings" ? { ...DEFAULT_TREND_PREFERENCE, scoreView: "none" as const, phView: "none" as const, showCarbohydrate: true, showConductivity: true } : DEFAULT_TREND_PREFERENCE;
  return <main className="min-h-screen bg-canvas px-4 py-8 sm:px-8"><div className="mx-auto max-w-6xl">
    <header className="mb-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Synthetic local evidence</p><h1 className="mt-2 font-display text-4xl text-ink">Longitudinal trends</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-ink">No real horse, client or provider data is used. Controls and saved-view actions are local visual evidence only.</p></header>
    <BiochemistryTrends envReady horses={[horse]} selectedHorse={horse} history={history} config={config} preferences={preferences} createPreferenceAction={evidenceOnlyAction} updatePreferenceAction={evidenceOnlyAction} deletePreferenceAction={evidenceOnlyAction} setDefaultPreferenceAction={evidenceOnlyAction} />
  </div></main>;
}
