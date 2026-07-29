import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { compareOperationalHorses, deriveOperationalSummary, resolveHorseDetailWorkflow } from "../lib/domain/stable-workspace.ts";

const test = (overrides = {}) => ({
  id: "test-current",
  horseId: "horse-a",
  testDate: "2026-07-30",
  scoringStatus: "scored",
  healthScore: 0.5,
  formulaVersion: "formula-v1",
  sourceVersion: "lookup-v1",
  ...overrides,
});

const noResult = deriveOperationalSummary({ horseId: "horse-a", tests: [], canWrite: true });
const draft = deriveOperationalSummary({ horseId: "horse-a", tests: [test({ scoringStatus: "unscored" })], canWrite: true });
const pending = deriveOperationalSummary({ horseId: "horse-a", tests: [test({ scoringStatus: "blocked" })], canWrite: true });
const completed = deriveOperationalSummary({ horseId: "horse-a", tests: [test()], canWrite: true });

assert.deepEqual(
  [noResult.workflow.state, draft.workflow.state, pending.workflow.state, completed.workflow.state],
  ["no-result", "draft-incomplete", "pending-review", "completed"],
);
assert.equal(noResult.nextAction.href, "/data-entry/biochemistry");
assert.equal(draft.nextAction.href, "/data-entry/biochemistry/test-current");
assert.equal(pending.nextAction.href, "/data-entry/biochemistry/test-current");
assert.equal(completed.nextAction.href, "/portal/horses/horse-a");
assert.equal(
  deriveOperationalSummary({ horseId: "horse-a", tests: [test({ scoringStatus: "blocked" })], canWrite: false }).nextAction.href,
  "/portal/horses/horse-a",
);

const rows = [
  { id: "2", name: "Zulu", stableName: "Synthetic Stable", operational: completed },
  { id: "3", name: "Bravo", stableName: "Synthetic Stable", operational: noResult },
  { id: "1", name: "Alpha", stableName: "Synthetic Stable", operational: draft },
].sort(compareOperationalHorses);
assert.deepEqual(rows.map((row) => row.name), ["Alpha", "Bravo", "Zulu"]);

const emptyDetail = resolveHorseDetailWorkflow({
  horseId: "horse-a",
  canWrite: true,
  horseAccessible: true,
  tests: [],
  biochemistryError: null,
});
assert.equal(emptyDetail.operational?.workflow.state, "no-result");
assert.equal(emptyDetail.operational?.nextAction?.label, "Capture biochemistry");

const providerMessage = "relation biochemistry_tests failed: private-provider-detail";
const failedDetail = resolveHorseDetailWorkflow({
  horseId: "horse-a",
  canWrite: true,
  horseAccessible: true,
  tests: [],
  biochemistryError: { message: providerMessage },
});
assert.equal(failedDetail.operational?.workflow.state, "failed");
assert.notEqual(failedDetail.operational?.workflow.state, "no-result");
assert.equal(failedDetail.operational?.nextAction, null);
assert.equal(failedDetail.error, "Biochemistry workflow information could not be loaded.");
assert(!JSON.stringify(failedDetail).includes(providerMessage));
assert(!/capture|review|correction/i.test(JSON.stringify(failedDetail.operational?.nextAction)));

for (const providerDetail of [null, "cross-stable provider detail", "revoked provider detail"]) {
  const denied = resolveHorseDetailWorkflow({
    horseId: "inaccessible-horse",
    canWrite: true,
    horseAccessible: false,
    tests: [],
    biochemistryError: providerDetail ? { message: providerDetail } : null,
  });
  assert.equal(denied.availability, "denied");
  assert.equal(denied.error, "Horse not available.");
  assert(!JSON.stringify(denied).includes("provider detail"));
}

const horsesSource = readFileSync("lib/domain/horses.ts", "utf8");
const dashboardSource = readFileSync("app/(portal)/portal/page.tsx", "utf8");
const detailSource = readFileSync("app/(portal)/portal/horses/[horseId]/page.tsx", "utf8");
assert(!horsesSource.includes("fallbackHorses"));
assert(!horsesSource.includes("sample-horse"));
assert(horsesSource.includes('supabase.rpc("can_write_biochemistry_horse"'));
assert(horsesSource.includes("writeAccess.get(horse.id) === true"));
assert(dashboardSource.includes("No sample records are shown"));
assert(dashboardSource.includes("does not indicate clinical priority"));
assert(detailSource.includes("Back to trainer dashboard"));
assert(detailSource.includes("No record action is available while workflow information is unavailable"));
assert(!dashboardSource.includes("healthScore"));

console.log("Sprint 035 trainer dashboard tests passed.");
