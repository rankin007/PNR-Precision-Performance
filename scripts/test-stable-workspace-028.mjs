import assert from "node:assert/strict";
import { deriveOperationalSummary } from "../lib/domain/stable-workspace.ts";
const test = (overrides = {}) => ({ id: "t1", horseId: "h1", testDate: "2026-07-29", scoringStatus: "scored", healthScore: 0.5, formulaVersion: "f1", sourceVersion: "s1", ...overrides });
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [], canWrite: true }).incomplete.status, "empty");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test({ scoringStatus: "blocked" })], canWrite: true }).nextAction.href, "/data-entry/biochemistry/t1");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test(), test({ id: "t0", testDate: "2026-07-20", healthScore: 0.4 })], canWrite: false }).changed.status, "changed");
assert.equal(deriveOperationalSummary({ horseId: "h1", tests: [test(), test({ id: "t0", testDate: "2026-07-20", formulaVersion: "f0" })], canWrite: false }).changed.status, "unavailable");
assert.match(deriveOperationalSummary({ horseId: "h1", tests: [test()], canWrite: false }).attention.reason, /No approved clinical-priority/);
console.log("Sprint 028 stable workspace derivation tests passed.");
