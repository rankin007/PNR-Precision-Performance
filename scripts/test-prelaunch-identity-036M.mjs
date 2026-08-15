#!/usr/bin/env node
import assert from "node:assert/strict";
import { EXPECTED_DEPENDENCIES, validateMigrationAuthorityFixture } from "./prelaunch-readiness-036K.mjs";
import {
  PRIVATE_IDENTITY_DECISIONS, decidePrivateIdentity, executeIdentityDeletion,
  createIdentityLiveAdapter, projectExactIdentityReadback, sanitizeIdentityFailure,
  validateIdentityAuthorityInput, validateTwoIdentityLanding,
} from "./prelaunch-identity-036M.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
async function throwsCode(fn, code) { assertions += 1; await assert.rejects(fn, (error) => error?.code === code || error?.message === code); }

equal(PRIVATE_IDENTITY_DECISIONS.length, 3);
const migration = validateMigrationAuthorityFixture();
equal(migration.names.length, 25);
equal(migration.dependencies.length, 50);
equal(migration.rawHash.length, 64);
check(Object.isFrozen(migration));
const dependencyRows = EXPECTED_DEPENDENCIES.map((key) => ({ key, count: 0, ownership: "owned" }));
equal(new Set(migration.names).size, 25);
equal(new Set(migration.dependencies).size, 50);
check(/^[A-F0-9]{64}$/i.test(migration.rawHash), "migration authority raw hash format");
for (const [index, row] of dependencyRows.slice(0, 38).entries()) equal(row.key, EXPECTED_DEPENDENCIES[index], `dependency ${index}`);

const hash = "a".repeat(64);
const authId = "00000000-0000-4000-8000-000000000036";
const candidate = { authId, emailHash: hash, role: "trainer" };
const authority = validateIdentityAuthorityInput({ ordinal: 1, expectedAuthId: authId, expectedEmailHash: hash, candidates: [candidate], ownerDecision: "delete-obsolete" });
equal(authority.ordinal, 1);
equal(authority.match.authId, authId);
equal(authority.ownerDecision, "delete-obsolete");
await throwsCode(async () => validateIdentityAuthorityInput({ ordinal: 1, expectedAuthId: authId, expectedEmailHash: "bad", candidates: [candidate], ownerDecision: "delete-obsolete" }), "IDENTITY_AUTHORITY_REFUSED");
await throwsCode(async () => validateIdentityAuthorityInput({ ordinal: 1, expectedAuthId: authId, expectedEmailHash: hash, candidates: [candidate, { ...candidate }], ownerDecision: "delete-obsolete" }), "IDENTITY_MATCH_REFUSED");

const exactRoleProjection = { leastPrivilege: true, unintendedAccess: false };
equal(decidePrivateIdentity({ authority: { ...authority, ownerDecision: "retain-real" }, dependencyRows, exactRoleProjection, sessionAvailable: false }).disposition, "retained-real-authorized");
equal(decidePrivateIdentity({ authority, dependencyRows, exactRoleProjection, sessionAvailable: true }).disposition, "delete-obsolete-ready");
equal(decidePrivateIdentity({ authority, dependencyRows: dependencyRows.map((row, index) => index ? row : { ...row, count: 1 }), exactRoleProjection, sessionAvailable: true }).disposition, "unresolved-retained-blocking");

const calls = [];
const adapter = {
  async globalSignOut() { calls.push("global-sign-out"); return true; },
  async sessionOrRefreshStillUsable() { calls.push("reuse-denied"); return false; },
  async deleteAuthById() { calls.push("delete-auth"); return true; },
  async getAuthById() { calls.push("auth-absence"); return null; },
};
const deleted = await executeIdentityDeletion({ authority, dependencyRows, exactSession: { authId, jwt: "private-test-session" }, adapter });
equal(deleted.disposition, "deleted-obsolete-clean");
const live = createIdentityLiveAdapter({ exactAuthLookup: true, dependencyKeys: EXPECTED_DEPENDENCIES, globalSignOut: true, reuseProbe: true, authLastDelete: true });
equal(live.dependencyKeys.length, 50);
equal(projectExactIdentityReadback({ ordinal: 2, exactMatch: true, duplicates: 0, sessionState: "active" }).ordinal, 2);
await throwsCode(async () => projectExactIdentityReadback({ ordinal: 2, exactMatch: true, duplicates: 1, sessionState: "active" }), "IDENTITY_AUTHORITY_REFUSED");
await throwsCode(async () => createIdentityLiveAdapter({ genericListUsers: true }), "IDENTITY_ADAPTER_REFUSED");
equal(deleted.session, "revoked-and-invalid");
equal(deleted.authTerminalMutations, 1);
for (const [index, expected] of ["global-sign-out", "reuse-denied", "delete-auth", "auth-absence"].entries()) equal(calls[index], expected, `auth-last order ${expected}`);

const landing = validateTwoIdentityLanding([{ ordinal: 1, disposition: "deleted-obsolete-clean" }, { ordinal: 2, disposition: "retained-real-authorized" }]);
equal(landing.identities, 2);
equal(landing.targetReady, true);
equal(landing.unresolved, 0);
equal(sanitizeIdentityFailure({ code: "IDENTITY_DELETE_REFUSED" }), "IDENTITY_DELETE_REFUSED");
equal(sanitizeIdentityFailure(new Error("private detail")), "UNEXPECTED");

assert.equal(assertions, 70, `expected exactly 70 identity assertions, received ${assertions}`);
console.log(`Sprint 036M identity assertions passed: ${assertions}/70.`);
