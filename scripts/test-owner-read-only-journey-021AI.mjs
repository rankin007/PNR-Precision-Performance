import fs from "node:fs";
import path from "node:path";
import { resolveAccessibleHorseId } from "../lib/domain/biochemistry-trends.ts";
import {
  deriveOperationalSummary,
  projectStoredScores,
} from "../lib/domain/stable-workspace.ts";

const counts = { projection: 14, access: 0, copy: 0, source: 0 };
let projectionAssertions = 0;
function projection(condition, label) {
  projectionAssertions += 1;
  if (!condition) throw new Error(`projection assertion ${projectionAssertions} failed: ${label}`);
}
function check(group, condition, label) {
  counts[group] += 1;
  if (!condition) throw new Error(`${group} assertion ${counts[group]} failed: ${label}`);
}

const scored = {
  id: "stored-scored",
  horseId: "horse-a",
  testDate: "2026-08-11",
  scoringStatus: "scored",
  hydrationScore: 0.82,
  healthScore: 0.76,
  formulaVersion: "biochemistry-score-v2",
  sourceVersion: "v3",
};
const absent = projectStoredScores(null);
projection(absent.availability === "unavailable", "missing snapshot unavailable");
projection(absent.hydrationScore === null, "missing hydration absent");
projection(absent.biochemistryTrendScore === null, "missing trend score absent");
projection(absent.formulaVersion === null && absent.sourceVersion === null, "missing versions absent");
const current = projectStoredScores(scored);
projection(current.availability === "available", "stored snapshot available");
projection(current.scoringStatus === "scored", "stored state retained");
projection(current.hydrationScore === 0.82, "stored hydration retained");
projection(current.biochemistryTrendScore === 0.76, "stored trend score retained");
projection(current.formulaVersion === "biochemistry-score-v2", "formula retained");
projection(current.sourceVersion === "v3", "source retained");
const blocked = projectStoredScores({ ...scored, scoringStatus: "blocked", hydrationScore: 0.99, healthScore: 0.98 });
projection(blocked.hydrationScore === null, "blocked hydration absent");
projection(blocked.biochemistryTrendScore === null, "blocked trend score absent");
const unscored = projectStoredScores({ ...scored, scoringStatus: "unscored", hydrationScore: 0, healthScore: 0 });
projection(unscored.hydrationScore === null, "unscored hydration is not zero");
projection(unscored.biochemistryTrendScore === null, "unscored trend score is not zero");
if (projectionAssertions !== 14) throw new Error(`Expected 14 projection assertions, received ${projectionAssertions}`);

check("access", resolveAccessibleHorseId(["horse-a"], "horse-a") === "horse-a", "exact accessible hint accepted");
check("access", resolveAccessibleHorseId(["horse-a"], "horse-b") === null, "inaccessible hint refused");
check("access", resolveAccessibleHorseId(["horse-a"], ["horse-a"]) === null, "array hint refused");
check("access", resolveAccessibleHorseId(["horse-a"], "") === null, "empty hint refused");
check("access", resolveAccessibleHorseId([], "horse-a") === null, "empty scope refuses hint");
check("access", resolveAccessibleHorseId(["horse-a", "horse-b"], undefined) === null, "missing hint requires selection");
const ownerWorkflow = deriveOperationalSummary({ horseId: "horse-a", tests: [scored], canWrite: false });
check("access", ownerWorkflow.nextAction?.href === "/portal/horses/horse-a", "read-only workflow remains in portal");
check("access", !ownerWorkflow.nextAction?.href.startsWith("/data-entry"), "read-only workflow has no data-entry action");

const root = path.resolve(import.meta.dirname, "..");
const source = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const horsePage = source("app/(portal)/portal/horses/[horseId]/page.tsx");
const reportsPage = source("app/(portal)/portal/reports/page.tsx");
const trends = source("components/portal/biochemistry-trends.tsx");
const horses = source("lib/domain/horses.ts");
check("copy", trends.includes("Hydration Score is calculated from Carbohydrate and Salts loss values."), "hydration formula exact");
check("copy", trends.includes("Carbohydrate, Urine pH, Saliva pH and Salts loss values."), "biochemistry formula exact");
check("copy", trends.includes("without clinical categories, advice, diagnosis, urgency, treatment or race-readiness meaning"), "clinical meaning absent");
check("copy", horsePage.includes("Back to portal") && !horsePage.includes("Back to trainer dashboard"), "audience-neutral return");
check("copy", trends.includes("Saved views change chart choices only."), "configuration-only lead");
check("copy", trends.includes("reading, score, note or assignment"), "saved views cannot change Product records");
check("copy", trends.includes("does not indicate diagnosis, urgency, treatment or race readiness"), "trend claims neutral");
check("copy", trends.includes('"Not scored"') && !trends.includes('"Normal"'), "not-scored state neutral");

check("source", horses.includes("hydration_score,health_score"), "latest query selects both stored scores");
check("source", horses.includes("hydrationScore: row.hydration_score"), "hydration projected without calculation");
check("source", horsePage.includes("projectStoredScores(result.horse.latestBiochemistry)") && horsePage.includes("<StoredScoreContext"), "shared executable projection rendered");
check("source", horsePage.includes("encodeURIComponent(result.horse.id)") && horsePage.includes("View trends"), "exact horse link encoded");
check("source", reportsPage.includes("requirePortalAppContext") && reportsPage.includes("getAccessibleHorseTrendHistory(first(params.horseId)"), "reports guard and revalidation retained");
check("source", !horsePage.includes("create") && !horsePage.includes("upload") && !horsePage.includes("comment-add"), "Owner page adds no mutation affordance");

const expected = { projection: 14, access: 8, copy: 8, source: 6 };
if (JSON.stringify(counts) !== JSON.stringify(expected)) {
  throw new Error(`Sprint 021AI Owner assertion ledger drift: ${JSON.stringify(counts)}`);
}
const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
if (total !== 36) throw new Error(`Expected 36 assertions, received ${total}`);
console.log("Sprint 021AI Owner read-only journey assertions passed: 36/36.");
