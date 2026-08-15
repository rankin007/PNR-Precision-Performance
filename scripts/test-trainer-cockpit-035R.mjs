import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";
import {
  brisbaneDateKey,
  brisbaneDisplayDate,
  deriveCockpitSummary,
  deriveFailedOperationalSummary,
  deriveOperationalSummary,
  deriveStableWorkspaceState,
  resolveHorseDetailWorkflow,
} from "../lib/domain/stable-workspace.ts";
import {
  BIOCHEMISTRY_NUMERIC_RULES,
  canSubmitBiochemistryNote,
  createInitialBiochemistryCaptureValues,
  normalizeBiochemistryCaptureValues,
  validateBiochemistryCaptureValues,
} from "../components/ops/biochemistry-workflow-state.ts";

const EVIDENCE_HARNESS_ROOT = resolve("evidence/professional-engineering/035R-trainer-daily-cockpit-and-timed-mobile-workflow/harness");
const EVIDENCE_HARNESS_FILES = {
  "package.json": "{\n  \"name\": \"precision-performance-035r-evidence\",\n  \"private\": true\n}\n",
  "next-env.d.ts": "/// <reference types=\"next\" />\n/// <reference types=\"next/image-types/global\" />\n",
  "tsconfig.json": "{\n  \"extends\": \"../../../../tsconfig.json\",\n  \"compilerOptions\": {\n    \"baseUrl\": \"../../../..\",\n    \"paths\": {\n      \"@/*\": [\n        \"*\"\n      ]\n    }\n  },\n  \"include\": [\n    \"next-env.d.ts\",\n    \"app/**/*.ts\",\n    \"app/**/*.tsx\"\n  ]\n}\n",
  "postcss.config.js": "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };\n",
  "tailwind.config.ts": "import type { Config } from \"tailwindcss\";\n\nconst config: Config = {\n  content: [\n    \"./app/**/*.{js,ts,jsx,tsx}\",\n    \"../../../../app/**/*.{js,ts,jsx,tsx}\",\n    \"../../../../components/**/*.{js,ts,jsx,tsx}\",\n    \"../../../../lib/**/*.{js,ts,jsx,tsx}\",\n  ],\n  theme: {\n    extend: {\n      colors: { ink: \"var(--color-ink)\", sand: \"var(--color-sand)\", steel: \"var(--color-steel)\", ember: \"var(--color-ember)\", canvas: \"var(--color-warm-bone)\" },\n      fontFamily: { sans: [\"var(--font-sans)\"], display: [\"var(--font-display)\"] },\n      boxShadow: { panel: \"0 20px 60px rgba(17, 29, 43, 0.12)\" },\n    },\n  },\n  plugins: [],\n};\n\nexport default config;\n",
  "next.config.mjs": "import path from \"node:path\";\nimport { fileURLToPath } from \"node:url\";\n\nconst here = path.dirname(fileURLToPath(import.meta.url));\nexport default {\n  reactStrictMode: true,\n  devIndicators: false,\n  outputFileTracingRoot: path.resolve(here, \"../../../..\"),\n};\n",
  "app/layout.tsx": "import \"@/app/globals.css\";\n\nexport const metadata = { title: \"Sprint 035R synthetic evidence\" };\n\nexport default function EvidenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {\n  return <html lang=\"en-AU\"><body>{children}</body></html>;\n}\n",
  "app/page.tsx": "import { TrainerCockpit } from \"@/components/portal/trainer-cockpit\";\nimport { deriveCockpitSummary, deriveOperationalSummary } from \"@/lib/domain/stable-workspace\";\n\nconst reference = new Date(\"2026-08-11T01:30:00.000Z\");\nconst rows = [\n  {\n    id: \"synthetic-alpha\", name: \"Synthetic Alpha\", status: \"active\", stableName: \"Example Stable\", lastActivity: \"2026-08-11\",\n    operational: deriveOperationalSummary({ horseId: \"synthetic-alpha\", canWrite: true, tests: [\n      { id: \"alpha-new\", horseId: \"synthetic-alpha\", testDate: \"2026-08-11\", scoringStatus: \"scored\", healthScore: 0.72, formulaVersion: \"formula-v2\", sourceVersion: \"v3\" },\n      { id: \"alpha-old\", horseId: \"synthetic-alpha\", testDate: \"2026-08-10\", scoringStatus: \"blocked\", healthScore: null, formulaVersion: \"formula-v2\", sourceVersion: \"v3\" },\n    ] }),\n  },\n  {\n    id: \"synthetic-bravo\", name: \"Synthetic Bravo\", status: \"active\", stableName: \"Example Stable\", lastActivity: \"2026-08-10\",\n    operational: deriveOperationalSummary({ horseId: \"synthetic-bravo\", canWrite: true, tests: [\n      { id: \"bravo-draft\", horseId: \"synthetic-bravo\", testDate: \"2026-08-10\", scoringStatus: \"unscored\", healthScore: null, formulaVersion: \"formula-v2\", sourceVersion: \"v3\" },\n    ] }),\n  },\n  { id: \"synthetic-charlie\", name: \"Synthetic Charlie\", status: \"active\", stableName: \"Example Stable\", lastActivity: null, operational: deriveOperationalSummary({ horseId: \"synthetic-charlie\", canWrite: true, tests: [] }) },\n];\n\nexport default function EvidenceDashboard() {\n  return (\n    <main className=\"min-h-screen bg-canvas px-4 py-8 sm:px-8\">\n      <div className=\"mx-auto max-w-5xl\">\n        <header className=\"mb-7\"><p className=\"text-xs font-semibold uppercase tracking-[0.18em] text-ink\">Synthetic local evidence</p><h1 className=\"mt-2 font-display text-4xl text-ink\">Trainer daily cockpit</h1><p className=\"mt-3 max-w-3xl text-sm leading-6 text-ink\">No real horse, client or provider data is used. This app is local-only and cannot submit a record.</p></header>\n        <TrainerCockpit envReady cockpit={deriveCockpitSummary(rows, reference)} horses={rows} />\n      </div>\n    </main>\n  );\n}\n",
  "app/data-entry/biochemistry/page.tsx": "import Link from \"next/link\";\nimport { BiochemistryCaptureWorkflow } from \"@/components/ops/biochemistry-capture-workflow\";\nimport { createInitialBiochemistryCaptureValues } from \"@/components/ops/biochemistry-workflow-state\";\n\nconst horses = [\n  { id: \"synthetic-alpha\", name: \"Synthetic Alpha\" },\n  { id: \"synthetic-bravo\", name: \"Synthetic Bravo\" },\n  { id: \"synthetic-charlie\", name: \"Synthetic Charlie\" },\n];\n\nasync function evidenceOnlyAction(_formData: FormData): Promise<never> {\n  \"use server\";\n  throw new Error(\"Synthetic evidence mode does not submit records.\");\n}\n\ntype Props = { searchParams?: Promise<Record<string, string | string[] | undefined>> };\nfunction first(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value; }\n\nexport default async function EvidenceCapture({ searchParams }: Props) {\n  const params = searchParams ? await searchParams : {};\n  const initialValues = createInitialBiochemistryCaptureValues({ horses, requestedHorseId: first(params.horseId), now: new Date(\"2026-08-11T01:30:00.000Z\") });\n  return (\n    <main className=\"min-h-screen bg-canvas px-4 py-8 sm:px-8\">\n      <section className=\"mx-auto max-w-3xl rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-panel sm:p-8\">\n        <p className=\"text-xs font-semibold uppercase tracking-[0.18em] text-ink\">Synthetic local evidence</p>\n        <h1 className=\"mt-2 font-display text-3xl text-ink\">Mobile test capture</h1>\n        <p className=\"mt-3 text-sm leading-6 text-ink\">Use only the supplied synthetic values. Review the test, but do not tap Submit test. This local action cannot save a record.</p>\n        <div className=\"my-6\"><Link href=\"/\" className=\"inline-flex min-h-11 items-center rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-semibold text-ink\">Back to trainer dashboard</Link></div>\n        <BiochemistryCaptureWorkflow horses={horses} initialValues={initialValues} envReady action={evidenceOnlyAction} />\n      </section>\n    </main>\n  );\n}\n"
};
EVIDENCE_HARNESS_FILES["app/page.tsx"] = EVIDENCE_HARNESS_FILES["app/page.tsx"].replace(
  "canWrite: true, tests: [] }) },\n];",
  "canWrite: false, tests: [] }) },\n];",
);

function writeEvidenceHarness() {
  for (const [relativePath, content] of Object.entries(EVIDENCE_HARNESS_FILES)) {
    const target = resolve(EVIDENCE_HARNESS_ROOT, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content, "utf8");
  }
  console.log("Sprint 035R evidence harness generated at " + EVIDENCE_HARNESS_ROOT);
}
const counts = {
  helpers: 0,
  aggregation: 0,
  comparison: 0,
  actions: 0,
  preselection: 0,
  ranges: 0,
  guards: 0,
};

function check(category, actual, expected, message) {
  assert.deepEqual(actual, expected, message);
  counts[category] += 1;
}

function testRow(overrides = {}) {
  return {
    id: "test-current",
    horseId: "horse-a",
    testDate: "2026-08-11",
    scoringStatus: "scored",
    healthScore: 0.5,
    formulaVersion: "formula-v2",
    sourceVersion: "v3",
    ...overrides,
  };
}

const beforeNoon = new Date("2026-08-11T01:59:00.000Z");
const noon = new Date("2026-08-11T02:00:00.000Z");
const horses = [{ id: "horse-a", name: "Synthetic Alpha" }, { id: "horse-b", name: "Synthetic Bravo" }];
const initial = createInitialBiochemistryCaptureValues({ horses, requestedHorseId: "horse-a", now: beforeNoon });
const noonInitial = createInitialBiochemistryCaptureValues({ horses, requestedHorseId: "horse-a", now: noon });
const unknown = createInitialBiochemistryCaptureValues({ horses, requestedHorseId: "private/horse", now: beforeNoon });
const absent = createInitialBiochemistryCaptureValues({ horses, now: beforeNoon });

check("helpers", brisbaneDateKey(beforeNoon), "2026-08-11", "Brisbane date key");
check("helpers", brisbaneDisplayDate(beforeNoon), "11 Aug 2026", "Brisbane display date");
check("helpers", initial.testDate, "2026-08-11", "initial date");
check("helpers", initial.timeOfDay, "am", "pre-noon AM");
check("helpers", initial.horseId, "horse-a", "accessible horse id");
check("helpers", initial.horseName, "Synthetic Alpha", "accessible horse name");
check("helpers", noonInitial.timeOfDay, "pm", "noon PM");
check("helpers", unknown.horseId, "", "unknown horse id hidden");
check("helpers", unknown.horseName, "", "unknown horse name hidden");
check("helpers", absent.horseId, "", "missing horse stays empty");

const changed = deriveOperationalSummary({
  horseId: "horse-a",
  canWrite: true,
  tests: [testRow(), testRow({ id: "older", testDate: "2026-08-10", scoringStatus: "blocked" })],
});
const draft = deriveOperationalSummary({
  horseId: "horse-b",
  canWrite: true,
  tests: [testRow({ id: "draft", horseId: "horse-b", testDate: "2026-08-10", scoringStatus: "unscored" })],
});
const noResult = deriveOperationalSummary({ horseId: "horse-c", canWrite: true, tests: [] });
const cockpit = deriveCockpitSummary([
  { operational: changed },
  { operational: draft },
  { operational: noResult },
], beforeNoon);
const failed = deriveFailedOperationalSummary();

check("aggregation", cockpit.dateKey, "2026-08-11", "summary date key");
check("aggregation", cockpit.displayDate, "11 Aug 2026", "summary display date");
check("aggregation", cockpit.todayCount, 1, "today count");
check("aggregation", cockpit.incompleteCount, 1, "incomplete count");
check("aggregation", cockpit.noResultCount, 1, "no result count");
check("aggregation", failed.workflow.state, "failed", "failed state");
check("aggregation", failed.nextAction, null, "failed has no action");
check("aggregation", failed.change, "Workflow comparison unavailable", "failed change unavailable");
check("aggregation", failed.workflow.label, "Unavailable", "failed label");

check("comparison", changed.workflow.state, "completed", "changed latest state");
check("comparison", changed.change, "Changed from Pending review", "changed prior label");
check("comparison", changed.workflow.occurredAt, "2026-08-11", "changed latest date");
const unchanged = deriveOperationalSummary({ horseId: "horse-a", canWrite: true, tests: [testRow(), testRow({ id: "older" })] });
check("comparison", unchanged.change, "Workflow state unchanged", "unchanged state");
check("comparison", unchanged.workflow.state, "completed", "unchanged latest state");
check("comparison", noResult.change, "No earlier workflow record for comparison", "no prior");
const tied = deriveOperationalSummary({
  horseId: "horse-a",
  canWrite: true,
  tests: [testRow({ id: "a", scoringStatus: "blocked" }), testRow({ id: "z", scoringStatus: "scored" })],
});
check("comparison", tied.workflow.state, "completed", "id tie break");
check("comparison", tied.change, "Changed from Pending review", "tie comparison");

check("actions", noResult.nextAction?.label, "Capture biochemistry", "no-result label");
check("actions", noResult.nextAction?.href, "/data-entry/biochemistry?horseId=horse-c", "no-result url");
check("actions", changed.nextAction?.label, "Capture another test", "completed label");
check("actions", changed.nextAction?.href, "/data-entry/biochemistry?horseId=horse-a", "completed url");
check("actions", draft.nextAction?.href, "/data-entry/biochemistry/draft", "draft url");
check("actions", draft.nextAction?.label, "Review current record", "draft label");
const pending = deriveOperationalSummary({ horseId: "horse-a", canWrite: true, tests: [testRow({ id: "blocked", scoringStatus: "blocked" })] });
check("actions", pending.nextAction?.href, "/data-entry/biochemistry/blocked", "pending url");
const readOnly = deriveOperationalSummary({ horseId: "horse-a", canWrite: false, tests: [testRow()] });
check("actions", readOnly.nextAction?.href, "/portal/horses/horse-a", "read-only url");
check("actions", readOnly.nextAction?.label, "Open horse workspace", "read-only label");
const permissionFailed = resolveHorseDetailWorkflow({
  horseAccessible: true, biochemistryError: null, permissionError: new Error("private"), tests: [testRow()], horseId: "horse-a", canWrite: false,
});
check("actions", permissionFailed.operational?.workflow.state, "failed", "permission error unavailable");
check("actions", permissionFailed.operational?.nextAction, null, "permission error no action");
const permissionFalse = resolveHorseDetailWorkflow({
  horseAccessible: true, biochemistryError: null, permissionError: null, tests: [testRow()], horseId: "horse-a", canWrite: false,
});
check("actions", permissionFalse.operational?.nextAction?.label, "Open horse workspace", "false permission is read-only");

const edited = normalizeBiochemistryCaptureValues({
  ...initial,
  horseId: "horse-b",
  horseName: "Synthetic Bravo",
  testDate: "2026-08-12",
  timeOfDay: "pm",
  carbsReading: "4.5",
  phSaliva: "7.25",
  phUrine: "7.24",
  conductivityRawMeterValue: "18.18",
});
check("preselection", edited.horseId, "horse-b", "edited horse retained");
check("preselection", edited.horseName, "Synthetic Bravo", "edited name retained");
check("preselection", edited.testDate, "2026-08-12", "edited date retained");
check("preselection", edited.timeOfDay, "pm", "edited time retained");
check("preselection", edited.carbsReading, "4.5", "carbs retained");
check("preselection", edited.phSaliva, "7.25", "saliva retained");
check("preselection", edited.phUrine, "7.24", "urine retained");
check("preselection", edited.conductivityRawMeterValue, "18.18", "conductivity retained");

check("ranges", BIOCHEMISTRY_NUMERIC_RULES.carbsReading.max, 15, "carbohydrate max");
check("ranges", BIOCHEMISTRY_NUMERIC_RULES.carbsReading.min, 0, "carbohydrate min");
check("ranges", BIOCHEMISTRY_NUMERIC_RULES.phSaliva.max, 9, "pH max");
check("ranges", BIOCHEMISTRY_NUMERIC_RULES.conductivityRawMeterValue.max, 99, "conductivity max");
const validMin = validateBiochemistryCaptureValues({ ...initial, carbsReading: "0", phSaliva: "4.80", phUrine: "4.80", conductivityRawMeterValue: "0" });
const validMax = validateBiochemistryCaptureValues({ ...initial, carbsReading: "15", phSaliva: "9.00", phUrine: "9.00", conductivityRawMeterValue: "99" });
check("ranges", validMin.ok, true, "inclusive minima");
check("ranges", validMax.ok, true, "inclusive maxima");
check("ranges", validateBiochemistryCaptureValues({ ...validMax.values, carbsReading: "15.1" }).ok, false, "carbohydrate out of range");
check("ranges", validateBiochemistryCaptureValues({ ...validMax.values, carbsReading: "0.05" }).ok, false, "carbohydrate precision");
check("ranges", canSubmitBiochemistryNote("synthetic note", false), false, "note review required");

const portalSource = readFileSync("app/(portal)/portal/page.tsx", "utf8");
const captureSource = readFileSync("components/ops/biochemistry-capture-workflow.tsx", "utf8");
const navigationSource = readFileSync("lib/navigation.ts", "utf8");
const horsesSource = readFileSync("lib/domain/horses.ts", "utf8");
const cockpitSource = readFileSync("components/portal/trainer-cockpit.tsx", "utf8");

const skewedRows = Array.from({ length: 200 }, (_, index) => ({
  id: "a-" + String(200 - index).padStart(3, "0"),
  horseId: "horse-a",
  testDate: "2026-08-11",
  scoringStatus: "scored",
  healthScore: 0.5,
  formulaVersion: "formula-v2",
  sourceVersion: "v3",
}));
const skewedOverview = deriveStableWorkspaceState({
  horses: [
    { id: "horse-a", name: "Synthetic Alpha", stableName: null },
    { id: "horse-b", name: "Synthetic Bravo", stableName: null },
  ],
  rowResults: [
    { tests: skewedRows, error: null },
    { tests: [{ ...skewedRows[0], id: "b-001", horseId: "horse-b", testDate: "2026-08-10" }], error: null },
  ],
  permissionResults: [{ data: true, error: null }, { data: true, error: null }],
  reference: beforeNoon,
});
const permissionErrorOverview = deriveStableWorkspaceState({
  horses: [{ id: "horse-a", name: "Synthetic Alpha", stableName: null }],
  rowResults: [{ tests: [skewedRows[0]], error: null }],
  permissionResults: [{ data: null, error: new Error("private provider detail") }],
  reference: beforeNoon,
});
const manyHorses = Array.from({ length: 101 }, (_, index) => ({
  id: "horse-" + String(index + 1).padStart(3, "0"),
  name: "Synthetic " + String(index + 1).padStart(3, "0"),
  stableName: "Example Stable",
}));
const manyHorseOverview = deriveStableWorkspaceState({
  horses: manyHorses,
  rowResults: manyHorses.map((horse, index) => ({
    tests: index === 100 ? [] : [testRow({ id: "result-" + horse.id, horseId: horse.id })],
    error: null,
  })),
  permissionResults: manyHorses.map(() => ({ data: true, error: null })),
  reference: beforeNoon,
});
check("guards", {
  completeAccessibleSet: horsesSource.includes("const includedHorses = base.horses;"),
  cappedAccessibleSet: horsesSource.includes("slice(0, 100)"),
  derivedHorseCount: manyHorseOverview.horses.length,
  finalHorsePresent: manyHorseOverview.horses.some((horse) => horse.id === "horse-101"),
  noResultCount: manyHorseOverview.cockpit?.noResultCount,
}, {
  completeAccessibleSet: true,
  cappedAccessibleSet: false,
  derivedHorseCount: 101,
  finalHorsePresent: true,
  noResultCount: 1,
}, "complete accessible horse set reaches derived cockpit");
check("guards", captureSource.includes("Exact lookup only"), false, "stale copy absent");
check("guards", { tableCopy: captureSource.includes("accepted table-matching rules"), reviewPreventsDefault: captureSource.includes("event.preventDefault();"), lowContrastToken: captureSource.includes("text-ember") || captureSource.includes("whitespace-pre-wrap text-sm leading-6 text-steel") || captureSource.includes("text-xs font-semibold uppercase tracking-[0.14em] text-steel") }, { tableCopy: true, reviewPreventsDefault: true, lowContrastToken: false }, "accurate table copy and review no-submit guard");
check("guards", navigationSource.includes('label: "Trainer Dashboard"'), true, "operations dashboard link");
check("guards", {
  horseMatch: horsesSource.includes('.eq("horse_id", horse.id)'),
  newestDateFirst: horsesSource.includes('.order("test_date", { ascending: false })'),
  deterministicTieBreak: horsesSource.includes('.order("id", { ascending: false })'),
  latestTwoOnly: horsesSource.includes(".limit(2)"),
}, {
  horseMatch: true,
  newestDateFirst: true,
  deterministicTieBreak: true,
  latestTwoOnly: true,
}, "per-horse latest-two query");
check("guards", skewedOverview.horses.find((horse) => horse.id === "horse-b")?.lastActivity, "2026-08-10", "200 A rows do not starve B");
check("guards", { error: permissionErrorOverview.error, horses: permissionErrorOverview.horses.length, cockpit: permissionErrorOverview.cockpit }, { error: "Biochemistry workflow information could not be loaded.", horses: 0, cockpit: null }, "permission error fails closed without detail");
check("guards", {
  sharedProductCockpit: portalSource.includes('from "@/components/portal/trainer-cockpit"'),
  clinicalClassification: /Green\/Amber\/Red|recommendation|treatment recommendation/i.test(cockpitSource),
  labelledWorklist: cockpitSource.includes('<section className="grid gap-4" aria-label="Accessible horse operational worklist">'),
  lowContrastToken: /text-(ember|steel)/.test(cockpitSource),
  healthScoreVisible: cockpitSource.includes("healthScore"),
  derivedActionHrefCount: (cockpitSource.match(/horse\.operational\.nextAction\.href/g) ?? []).length,
  derivedActionLabelCount: (cockpitSource.match(/horse\.operational\.nextAction\.label/g) ?? []).length,
  hardCodedWorkspaceLink: cockpitSource.includes('href={"/portal/horses/" + horse.id}'),
}, {
  sharedProductCockpit: true,
  clinicalClassification: false,
  labelledWorklist: true,
  lowContrastToken: false,
  healthScoreVisible: false,
  derivedActionHrefCount: 1,
  derivedActionLabelCount: 1,
  hardCodedWorkspaceLink: false,
}, "shared neutral cockpit renders only the derived action");

const expected = { helpers: 10, aggregation: 9, comparison: 8, actions: 12, preselection: 8, ranges: 9, guards: 8 };
if (JSON.stringify(counts) !== JSON.stringify(expected)) throw new Error("Sprint 035R assertion ledger drift: " + JSON.stringify(counts));
const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
if (total !== 64) throw new Error("Expected 64 assertions, received " + total);
console.log("Sprint 035R trainer cockpit tests passed: 64/64.");

const evidenceMode = process.argv.find((argument) => argument === "--write-evidence-harness" || argument === "--serve-evidence-harness");
if (evidenceMode) {
  writeEvidenceHarness();
  if (evidenceMode === "--serve-evidence-harness") {
    const child = spawn(process.execPath, [resolve("node_modules/next/dist/bin/next"), "dev", EVIDENCE_HARNESS_ROOT, "-H", "0.0.0.0", "-p", "3135"], { stdio: "inherit" });
    child.on("exit", (code) => { process.exitCode = code ?? 1; });
  }
}
