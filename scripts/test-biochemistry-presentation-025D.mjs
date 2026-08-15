import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(".");
const panel = readFileSync(resolve(root, "components/ops/biochemistry-result-panel.tsx"), "utf8");
const page = readFileSync(resolve(root, "app/(ops)/data-entry/biochemistry/[testId]/page.tsx"), "utf8");
const action = readFileSync(resolve(root, "app/(ops)/data-entry/biochemistry/actions.ts"), "utf8");
const domain = readFileSync(resolve(root, "lib/domain/biochemistry.ts"), "utf8");
const packageJson = readFileSync(resolve(root, "package.json"), "utf8");
const domainHash = createHash("sha256").update(domain).digest("hex").toUpperCase();

const EVIDENCE_HARNESS_ROOT = resolve("evidence/professional-engineering/025D-numeric-results-with-deferred-guidance/harness");
const EVIDENCE_HARNESS_FILES = {
  "package.json": "{\n  \"name\": \"precision-performance-025d-evidence\",\n  \"private\": true\n}\n",
  "next-env.d.ts": "/// <reference types=\"next\" />\n/// <reference types=\"next/image-types/global\" />\n",
  "tsconfig.json": `{
  "extends": "../../../../tsconfig.json",
  "compilerOptions": { "baseUrl": "../../../..", "paths": { "@/*": ["*"] } },
  "include": ["next-env.d.ts", "app/**/*.ts", "app/**/*.tsx"]
}
`,
  "postcss.config.js": "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };\n",
  "tailwind.config.ts": `import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "../../../../components/**/*.{js,ts,jsx,tsx}", "../../../../lib/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: { ink: "var(--color-ink)", sand: "var(--color-sand)", steel: "var(--color-steel)", ember: "var(--color-ember)", canvas: "var(--color-warm-bone)" },
    fontFamily: { sans: ["var(--font-sans)"], display: ["var(--font-display)"] },
    boxShadow: { panel: "0 20px 60px rgba(17, 29, 43, 0.12)" }
  } }, plugins: [],
};
export default config;
`,
  "next.config.mjs": `import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
export default { reactStrictMode: true, devIndicators: false, outputFileTracingRoot: path.resolve(here, "../../../..") };
`,
  "app/layout.tsx": `import "@/app/globals.css";
export const metadata = { title: "Sprint 025D synthetic numeric result evidence" };
export default function EvidenceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><body>{children}</body></html>;
}
`,
  "app/page.tsx": `import { BiochemistryResultPanel } from "@/components/ops/biochemistry-result-panel";
import type { AnyBiochemistryScoringResult } from "@/lib/domain/biochemistry";

const scoringResult = {
  formulaVersion: "biochemistry-score-v2",
  lookupSourceDocument: "Accepted synthetic lookup authority",
  lookupSourceVersion: "v3",
  rawReadings: { carbsReading: 4.5, phSaliva: 7.25, phUrine: 7.24, conductivityRawMeterValue: 18.18 },
  derivedReadings: { conductivityConvertedCValue: 26, conductivityLookupCValue: 26 },
  losses: {}, hydrationScoreEnergyLoss: 0.080299, hydrationScore: 0.919701,
  healthScoreEnergyLoss: 0.093316, healthScore: 0.906684,
  scoringStatus: "scored", scoringBlockers: [],
} as unknown as AnyBiochemistryScoringResult;

export default function EvidenceResult() {
  return <main className="min-h-screen bg-canvas px-2 py-2 sm:px-8 sm:py-8"><section className="mx-auto max-w-4xl">
    <header className="mb-2"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Synthetic local evidence · Example Alpha · no real data</p></header>
    <BiochemistryResultPanel scoringResult={scoringResult} />
  </section></main>;
}
`,
};

function writeEvidenceHarness() {
  for (const [relativePath, content] of Object.entries(EVIDENCE_HARNESS_FILES)) {
    const target = resolve(EVIDENCE_HARNESS_ROOT, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content, "utf8");
  }
  console.log(`Sprint 025D evidence harness generated at ${EVIDENCE_HARNESS_ROOT}`);
}

let assertions = 0;
function check(condition, label) {
  assert.ok(condition, label);
  assertions += 1;
}

check(panel.includes('import type { AnyBiochemistryScoringResult } from "@/lib/domain/biochemistry"'), "panel imports only the scoring-result domain type");
check(!panel.includes("BiochemistryRecommendation"), "panel has no recommendation type");
check(!panel.includes("BiochemistryZone"), "panel has no zone type");
check(!panel.includes("StatusIndicator"), "panel has no classification status component");
check(!/\bzones\b/.test(panel), "panel accepts no zones prop");
check(!/\brecommendations\b/i.test(panel), "panel accepts no recommendations prop or copy");
check(panel.includes("Entered Readings") && panel.includes("Derived Conductivity") && panel.includes("Scoring"), "numeric result groups remain");
check(panel.includes('label="Carbohydrate"') && panel.includes('label="Saliva pH"') && panel.includes('label="Urine pH"') && panel.includes('label="Raw Conductivity"'), "exact four current readings remain");
check(panel.includes('formatReading(scoringResult.rawReadings.carbsReading, 1, "%")'), "Carbohydrate uses accepted precision and unit");
check(panel.includes("formatReading(scoringResult.rawReadings.phSaliva, 2)") && panel.includes("formatReading(scoringResult.rawReadings.phUrine, 2)"), "pH readings use accepted precision");
check(panel.includes('formatReading(scoringResult.rawReadings.conductivityRawMeterValue, 2, "mS/cm")'), "raw Conductivity uses accepted precision and unit");
check(panel.includes('label="Effective converted C"') && panel.includes('label="Selected Salts table reading"'), "derived conductivity values remain");
check(panel.includes("Hydration Score") && panel.includes("Biochemistry Trend Score (display-only label)"), "numeric score labels remain");
check(panel.includes("Formula source:") && panel.includes("lookup source:"), "formula and source provenance remains");
check(panel.includes('title="Scoring blocked"') && panel.includes("No score was guessed."), "blocked scoring remains neutral and explicit");
check(!/>Zones</.test(panel) && !/Green|Amber|Red/.test(panel), "zone presentation and colour labels are absent");
check(!/>Recommendations</.test(panel) && !/Table of Knowledge/.test(panel), "recommendation presentation is absent");
check(!/coming soon|today guidance|diagnos|prognos|treatment|dose|race readiness/i.test(panel), "no placeholder or clinical content is added");
check(!/\bUrea\b|Average pH/.test(panel), "legacy hidden readings remain absent");
check(!action.includes("classifyBiochemistryScoringResult"), "action no longer classifies the result");
check(!action.includes("generateBiochemistryRecommendations"), "action no longer generates recommendations");
check(!action.includes("createZonesAndRecommendations"), "action composition helper is removed");
check(!/\bzones\s*:|\brecommendations\s*:/.test(action), "result state has no zone/recommendation payload fields");
check(page.includes("result.test && result.scoringResult ?") && !page.includes("result.zones") && !page.includes("result.recommendations"), "page requires only test and numeric scoring result");
check(page.includes("<BiochemistryResultPanel scoringResult={result.scoringResult} />"), "page passes only the serialized scoring result");
check(page.includes("saved readings, numeric scoring snapshot, blocked lookup state, and source versions"), "page description matches the numeric-only contract");
check(domainHash === "1E4384D2B7920AE3002613C4678F3CEB5260129337BACC53BB329977DD180959", "future domain extension is byte-unchanged");
check(domain.includes("export type BiochemistryZoneThresholdSet") && domain.includes("export type BiochemistryRecommendationRule"), "future threshold and rule types remain");
check(domain.includes('export type BiochemistryRecommendationRuleStatus = "draft" | "active" | "inactive"'), "future rule lifecycle remains fail-closed");
check(domain.includes("export function validateBiochemistryThresholdSet") && domain.includes("export function classifyBiochemistryScoringResult"), "future classification validation remains");
check(domain.includes("export function generateBiochemistryRecommendations"), "future recommendation generator remains");
check(domain.includes("sourceDocument: string") && domain.includes("sourceVersion: string"), "future source/version snapshots remain");
check(!panel.includes("biochemistry-recommendations-015") && !page.includes("biochemistry-recommendations-015") && !action.includes("biochemistry-recommendations-015"), "fixture-only rules are not imported into Product presentation");
check(action.includes("data.formula_version === BIOCHEMISTRY_FORMULA_VERSION_V2") && action.includes("BIOCHEMISTRY_FORMULA_VERSION,"), "v1/v2 reconstruction remains");
check(action.includes("requirePortalAppContext") && action.includes('.eq("id", testId)') && action.includes('.is("deleted_at", null)'), "access and soft-delete boundaries remain");
check(packageJson.includes('"test:presentation-025d"') && EVIDENCE_HARNESS_FILES["app/page.tsx"].includes("<BiochemistryResultPanel scoringResult={scoringResult} />"), "focused command and shared Product evidence harness are present");

assert.equal(assertions, 36);
console.log(`Sprint 025D numeric-presentation assertions passed: ${assertions}/36.`);

const evidenceMode = process.argv.find((argument) => argument === "--write-evidence-harness" || argument === "--serve-evidence-harness");
if (evidenceMode) {
  writeEvidenceHarness();
  if (evidenceMode === "--serve-evidence-harness") {
    const child = spawn(process.execPath, [resolve("node_modules/next/dist/bin/next"), "dev", EVIDENCE_HARNESS_ROOT, "-H", "127.0.0.1", "-p", "3137"], { stdio: "inherit" });
    child.on("exit", (code) => { process.exitCode = code ?? 1; });
  }
}
