import fs from "node:fs";
import path from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";
import {
  DEFAULT_TREND_PREFERENCE,
  buildScoreSegments,
  deriveTrendDateBounds,
  filterTrendRows,
  formatTrendValue,
  getBrisbaneDateKey,
  getVisibleChartGroups,
  loadCompleteTrendHistory,
  parseTrendRange,
  parseTrendTimeFilter,
  resolveAccessibleHorseId,
  timeOfDayLabel,
  validateTrendPreferenceConfig,
  validateTrendPreferenceLabel,
} from "../lib/domain/biochemistry-trends.ts";

const EVIDENCE_HARNESS_ROOT = resolve("evidence/professional-engineering/028B-longitudinal-trends-history-and-saved-views/harness");
const EVIDENCE_HARNESS_FILES = {
  "package.json": `{
  "name": "precision-performance-028b-evidence",
  "private": true
}
`,
  "next-env.d.ts": `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`,
  "tsconfig.json": `{
  "extends": "../../../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": "../../../..",
    "paths": { "@/*": ["*"] }
  },
  "include": ["next-env.d.ts", "app/**/*.ts", "app/**/*.tsx"]
}
`,
  "postcss.config.js": `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
`,
  "tailwind.config.ts": `import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "../../../../components/**/*.{js,ts,jsx,tsx}", "../../../../lib/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: { ink: "var(--color-ink)", sand: "var(--color-sand)", steel: "var(--color-steel)", ember: "var(--color-ember)", canvas: "var(--color-warm-bone)" },
    fontFamily: { sans: ["var(--font-sans)"], display: ["var(--font-display)"] },
    boxShadow: { panel: "0 20px 60px rgba(17, 29, 43, 0.12)" }
  } },
  plugins: [],
};
export default config;
`,
  "next.config.mjs": `import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
export default { reactStrictMode: true, devIndicators: false, outputFileTracingRoot: path.resolve(here, "../../../..") };
`,
  "app/layout.tsx": `import "@/app/globals.css";
export const metadata = { title: "Sprint 028B synthetic trend evidence" };
export default function EvidenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><body>{children}</body></html>;
}
`,
  "app/page.tsx": `import { BiochemistryTrends } from "@/components/portal/biochemistry-trends";
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
`,
};

function writeEvidenceHarness() {
  for (const [relativePath, content] of Object.entries(EVIDENCE_HARNESS_FILES)) {
    const target = resolve(EVIDENCE_HARNESS_ROOT, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content, "utf8");
  }
  console.log(`Sprint 028B evidence harness generated at ${EVIDENCE_HARNESS_ROOT}`);
}

let assertions = 0;
function assert(condition, message) {
  assertions += 1;
  if (!condition) throw new Error(`Assertion ${assertions} failed: ${message}`);
}

const reference = new Date("2026-01-01T02:00:00.000Z");
const horseId = "horse-accessible";

function isoDateMinus(day) {
  const value = new Date("2026-01-01T00:00:00.000Z");
  value.setUTCDate(value.getUTCDate() - day);
  return value.toISOString().slice(0, 10);
}

function rawRow(index, overrides = {}) {
  const times = ["unspecified", "pm", "am"];
  return {
    id: `row-${String(2000 - index).padStart(4, "0")}`,
    horse_id: horseId,
    test_date: isoDateMinus(Math.floor(index / 3)),
    time_of_day: times[index % 3],
    scoring_status: "scored",
    hydration_score: 0.8,
    health_score: 0.7,
    carbs_reading: 3.5,
    ph_urine: 6.5,
    ph_saliva: 6.7,
    conductivity_raw_meter_value: 20.5,
    formula_version: "biochemistry-score-v2",
    lookup_source_document: "HORSE Energy Loss Version 3 no urea or age.xlsx",
    lookup_source_version: "v3",
    ...overrides,
  };
}

function loaderFor(passOneRows, passTwoRows = passOneRows, options = {}) {
  const calls = [];
  return {
    calls,
    loadPage: async ({ pass, offset, limit }) => {
      calls.push({ pass, offset, limit });
      if (options.errorAt && options.errorAt.pass === pass && options.errorAt.offset === offset) {
        return { data: null, count: null, error: new Error("page failed") };
      }
      const rows = pass === 1 ? passOneRows : passTwoRows;
      const count = options.countFor ? options.countFor(pass, offset, rows.length) : rows.length;
      return { data: rows.slice(offset, offset + limit), count, error: null };
    },
  };
}

// Access, dates, paging and completeness: 18 assertions.
assert(parseTrendRange("30") === 30, "30-day range accepted");
assert(parseTrendRange("31") === 90, "invalid range falls back to 90");
assert(parseTrendTimeFilter("all") === "all", "all recorded-times filter accepted");
assert(parseTrendTimeFilter("unknown") === "both", "invalid time filter falls back to AM+PM");
assert(getBrisbaneDateKey(reference) === "2026-01-01", "Brisbane date key is deterministic");
assert(JSON.stringify(deriveTrendDateBounds(30, reference)) === JSON.stringify({ startDate: "2025-12-03", endDate: "2026-01-01" }), "30-day bounds are inclusive");
assert(resolveAccessibleHorseId([horseId], horseId) === horseId, "exact accessible horse resolves");
assert(resolveAccessibleHorseId([horseId], "private-horse") === null, "inaccessible horse does not resolve");
const noCall = loaderFor([]);
const noSelection = await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: "private-horse", rangeDays: 90, reference, loadPage: noCall.loadPage });
assert(noCall.calls.length === 0 && noSelection.availability === "selection-required", "inaccessible hint makes no loader call");
const rows1001 = Array.from({ length: 1001 }, (_, index) => rawRow(index));
const completeLoader = loaderFor(rows1001);
const complete = await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: horseId, rangeDays: 365, reference, loadPage: completeLoader.loadPage });
assert(complete.availability === "available", "two matching full passes are available");
assert(complete.availability === "available" && complete.totalCount === 1001, "exact total count retained");
assert(completeLoader.calls.length === 6, "1001 rows use three pages in each of two passes");
assert(complete.availability === "available" && complete.rows.length === 1001, "all 1001 rows returned");
const wrongHorse = loaderFor([rawRow(0, { horse_id: "other-horse" })]);
assert((await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: horseId, rangeDays: 365, reference, loadPage: wrongHorse.loadPage })).availability === "unavailable", "wrong-horse row refuses all output");
const duplicateRows = [rawRow(0), rawRow(1, { id: rawRow(0).id })];
assert((await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: horseId, rangeDays: 365, reference, loadPage: loaderFor(duplicateRows).loadPage })).availability === "unavailable", "duplicate row refuses all output");
assert((await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: horseId, rangeDays: 365, reference, loadPage: loaderFor([rawRow(0, { test_date: "not-a-date" })]).loadPage })).availability === "unavailable", "invalid date refuses all output");
assert((await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: horseId, rangeDays: 365, reference, loadPage: loaderFor(rows1001, rows1001, { errorAt: { pass: 2, offset: 500 } }).loadPage })).availability === "unavailable", "page error refuses partial history");
const shiftedRows = [...rows1001.slice(1), rawRow(1001, { id: "row-new-old", test_date: "2025-01-02", time_of_day: "am" })];
assert((await loadCompleteTrendHistory({ accessibleHorseIds: [horseId], horseHint: horseId, rangeDays: 365, reference, loadPage: loaderFor(rows1001, shiftedRows).loadPage })).availability === "unavailable", "same-count page shift refuses mixed snapshot");

// Time filters, version boundaries and score gaps: 14 assertions.
const normalized = complete.availability === "available" ? complete.rows.slice(0, 6) : [];
assert(filterTrendRows(normalized, "am").rows.every((row) => row.timeOfDay === "am"), "AM filter exact");
assert(filterTrendRows(normalized, "pm").rows.every((row) => row.timeOfDay === "pm"), "PM filter exact");
const both = filterTrendRows(normalized, "both");
assert(both.rows.every((row) => row.timeOfDay !== "unspecified") && both.excludedUnspecifiedCount === 2, "AM+PM excludes and counts unspecified");
assert(filterTrendRows(normalized, "all").rows.length === normalized.length, "all times includes unspecified");
const versionRows = [
  { ...normalized[0], id: "v2", testDate: "2026-01-01", formulaVersion: "v2", lookupSourceVersion: "source-2", hydrationScore: 0.8 },
  { ...normalized[0], id: "v1", testDate: "2025-12-31", formulaVersion: "v1", lookupSourceVersion: "source-1", hydrationScore: 0.6 },
];
assert(buildScoreSegments(versionRows, "hydrationScore").length === 2, "formula/source version change breaks score line");
assert(buildScoreSegments(versionRows, "hydrationScore")[0].points[0].value === 0.6, "stored score remains unchanged");
const sourceBreak = [{ ...versionRows[0], lookupSourceVersion: "a" }, { ...versionRows[1], formulaVersion: "v2", lookupSourceVersion: "b" }];
assert(buildScoreSegments(sourceBreak, "hydrationScore").length === 2, "source-only change breaks score line");
const nullGap = [{ ...versionRows[0], hydrationScore: 0.8 }, { ...versionRows[1], formulaVersion: "v2", lookupSourceVersion: "source-2", hydrationScore: null }, { ...versionRows[1], id: "older", formulaVersion: "v2", lookupSourceVersion: "source-2", hydrationScore: 0.5 }];
assert(buildScoreSegments(nullGap, "hydrationScore").length === 2, "null scored value creates a line gap");
assert(buildScoreSegments([{ ...versionRows[0], scoringStatus: "blocked", hydrationScore: 0.9 }], "hydrationScore").length === 0, "blocked non-null compatibility score is not plotted");
assert(buildScoreSegments([{ ...versionRows[0], scoringStatus: "unscored", hydrationScore: 0.9 }], "hydrationScore").length === 0, "unscored non-null compatibility score is not plotted");
assert(buildScoreSegments([{ ...versionRows[0], scoringStatus: "scored", hydrationScore: null }], "hydrationScore").length === 0, "scored null remains a gap");
assert(timeOfDayLabel("unspecified") === "Unspecified", "unspecified time is labelled");
assert(filterTrendRows(normalized, "am").rows.length === 2, "filter count is deterministic");
assert(buildScoreSegments([{ ...versionRows[0], scoringStatus: "blocked" }], "healthScore").flatMap((segment) => segment.points).length === 0, "blocked Biochemistry Trend Score remains absent");

// Configuration, compatible groups and formatting: 12 assertions.
assert(JSON.stringify(getVisibleChartGroups(DEFAULT_TREND_PREFERENCE)) === JSON.stringify(["scores", "ph"]), "fixed default has two compatible groups");
const oneGroup = validateTrendPreferenceConfig({ scoreView: "hydration", phView: "none", showCarbohydrate: false, showConductivity: false, timeFilter: "am", rangeDays: 30 });
assert(oneGroup?.scoreView === "hydration", "one chart group is valid");
assert(validateTrendPreferenceConfig({ scoreView: "none", phView: "none", showCarbohydrate: false, showConductivity: false, timeFilter: "both", rangeDays: 90 }) === null, "zero chart groups refused");
assert(validateTrendPreferenceConfig({ scoreView: "both", phView: "both", showCarbohydrate: true, showConductivity: false, timeFilter: "both", rangeDays: 90 }) === null, "three chart groups refused");
assert(validateTrendPreferenceLabel("Morning review") === "Morning review", "trimmed label accepted");
assert(validateTrendPreferenceLabel(" Morning review") === null, "untrimmed label refused");
assert(validateTrendPreferenceLabel("x".repeat(41)) === null, "overlong label refused");
assert(formatTrendValue(0.919701, "hydration") === "92.0%", "score percentage formatted");
assert(formatTrendValue(3.5, "carbohydrate") === "3.5%", "Carbohydrate precision formatted");
assert(formatTrendValue(6.5, "ph") === "6.50", "pH precision formatted");
assert(formatTrendValue(20.5, "conductivity") === "20.50 mS/cm", "Conductivity unit and precision formatted");
assert(timeOfDayLabel("am") === "AM" && timeOfDayLabel("pm") === "PM", "AM and PM labels exact");

// Product source, route, privacy and claims invariants: 12 assertions.
const root = path.resolve(import.meta.dirname, "..");
const reportsPage = fs.readFileSync(path.join(root, "app/(portal)/portal/reports/page.tsx"), "utf8");
const actions = fs.readFileSync(path.join(root, "app/(portal)/portal/reports/actions.ts"), "utf8");
const horses = fs.readFileSync(path.join(root, "lib/domain/horses.ts"), "utf8");
const component = fs.readFileSync(path.join(root, "components/portal/biochemistry-trends.tsx"), "utf8");
const chart = fs.readFileSync(path.join(root, "components/portal/biochemistry-trend-chart.tsx"), "utf8");
const horsePage = fs.readFileSync(path.join(root, "app/(portal)/portal/horses/[horseId]/page.tsx"), "utf8");
const packageJson = fs.readFileSync(path.join(root, "package.json"), "utf8");
assert(reportsPage.includes('requirePortalAppContext("/portal/reports")'), "Reports route explicitly retains portal guard");
assert(reportsPage.includes("getAccessibleHorseTrendHistory"), "Reports route uses access-first history loader");
assert(horses.includes('.eq("horse_id", horseId)') && horses.includes('.is("deleted_at", null)'), "history query fixes exact horse and excludes deleted rows");
assert(horses.includes('{ count: "exact" }') && horses.includes('.range(offset, offset + limit - 1)'), "history query uses exact count and bounded pages");
assert(actions.includes("context.appUserId") && !actions.includes('stringField(formData, "userId")'), "preference owner derives from server context");
assert(!actions.includes('stringField(formData, "horseId")') && !actions.includes('stringField(formData, "stableId")'), "preference mutations accept no horse or stable owner field");
assert(!/\b(Urea|Average pH|Turbidity)\b/.test(component), "hidden or absent readings are not rendered");
assert(!/\b(Green|Amber\+Red|Red only|recommendations?)\b/.test(component), "clinical zones and recommendations are not rendered");
assert(component.includes("Biochemistry Trend Score"), "provisional display-only score label rendered");
assert(component.includes("Accessible history table") && component.includes("Raw Conductivity") && component.includes("w-full min-w-0 overflow-x-auto") && chart.includes("w-full min-w-0 overflow-x-auto"), "complete textual history table and contained mobile scrollers rendered");
assert(horsePage.includes("encodeURIComponent(result.horse.id)") && horsePage.includes("View trends"), "accessible horse workspace links safely to trends");
assert(!packageJson.includes('"recharts"') && !packageJson.includes('"chart.js"') && !chart.includes("dual axis") && !chart.includes("normalise"), "no chart dependency, dual axis or normalisation added");

if (assertions !== 56) throw new Error(`Expected exactly 56 assertions, observed ${assertions}.`);
console.log(`Sprint 028B trend/Product assertions passed: ${assertions}/56.`);

const evidenceMode = process.argv.find((argument) => argument === "--write-evidence-harness" || argument === "--serve-evidence-harness");
if (evidenceMode) {
  writeEvidenceHarness();
  if (evidenceMode === "--serve-evidence-harness") {
    const child = spawn(process.execPath, [resolve("node_modules/next/dist/bin/next"), "dev", EVIDENCE_HARNESS_ROOT, "-H", "127.0.0.1", "-p", "3136"], { stdio: "inherit" });
    child.on("exit", (code) => { process.exitCode = code ?? 1; });
  }
}
