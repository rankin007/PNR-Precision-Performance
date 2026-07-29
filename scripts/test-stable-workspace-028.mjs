import assert from "node:assert/strict";
import { deriveOperationalSummary } from "../lib/domain/stable-workspace.ts";
const test = (overrides = {}) => ({ id: "t1", horseId: "h1", testDate: "2026-07-29", scoringStatus: "scored", healthScore: 0.5, formulaVersion: "f1", sourceVersion: "s1", ...overrides });
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [], canWrite: true }).workflow.state, "no-result");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test({ scoringStatus: "blocked" })], canWrite: true }).nextAction.href, "/data-entry/biochemistry/t1");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test()], canWrite: false }).workflow.state, "completed");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test({ scoringStatus: "unscored" })], canWrite: false }).workflow.state, "draft-incomplete");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test()], canWrite: false }).nextAction.href, "/portal/horses/h1");
console.log("Sprint 028 stable workspace derivation tests passed.");
