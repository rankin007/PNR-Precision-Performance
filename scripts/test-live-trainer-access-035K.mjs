import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  FIXTURE,
  RETAIN_CONFIRMATION,
  cleanupOrder,
  cleanupWithAdapter,
  emailDigest,
  exactProtectedEmailMatch,
  normalizeProtectedEmail,
  provisionWithAdapter,
  retainWithConfirmation,
  sanitizeFailure,
  validateTargetUrl,
  verifyWithAdapter,
} from "./live-trainer-access-035K-core.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const rejectsCode = async (operation, code) => {
  assertions += 1;
  await assert.rejects(operation, (error) => error?.code === code);
};

class MemoryStore {
  constructor() { this.ledger = null; this.writes = 0; this.removed = false; }
  exists() { return Boolean(this.ledger); }
  read() { if (!this.ledger) throw Object.assign(new Error("OWNERSHIP_LEDGER_MISSING"), { code: "OWNERSHIP_LEDGER_MISSING" }); return structuredClone(this.ledger); }
  write(value, exclusive = false) { if (exclusive && this.ledger) throw Object.assign(new Error("OPEN_LEDGER_REFUSED"), { code: "OPEN_LEDGER_REFUSED" }); this.ledger = structuredClone(value); this.writes += 1; }
  remove() { this.ledger = null; this.removed = true; }
}

class FakeAdapter {
  constructor({ adoptedAuth = null, duplicateOnCreate = false, fixtureCollisions = 0, failDeleteTable = null } = {}) {
    this.auth = new Map();
    if (adoptedAuth) this.auth.set(adoptedAuth.id, structuredClone(adoptedAuth));
    this.rows = new Map();
    this.duplicateOnCreate = duplicateOnCreate;
    this.fixtureCollisions = fixtureCollisions;
    this.failDeleteTable = failDeleteTable;
    this.deleteOrder = [];
    this.authDeleteOrder = [];
    this.unrelatedEnumerationCalls = 0;
    this.externalMutation = false;
    this.contract = { membershipLevelId: "10000000-0000-4000-8000-000000000001", permissionId: "10000000-0000-4000-8000-000000000002", permissionLinks: 1 };
  }
  table(name) { if (!this.rows.has(name)) this.rows.set(name, new Map()); return this.rows.get(name); }
  async getAuthById(id) { return structuredClone(this.auth.get(id) ?? null); }
  async createConfirmedAuth(email) {
    if (this.duplicateOnCreate) throw Object.assign(new Error("provider duplicate private detail"), { code: "PROVIDER_PRIVATE" });
    const auth = { id: randomUUID(), email };
    this.auth.set(auth.id, structuredClone(auth));
    return auth;
  }
  async countExactApplicationEmail(email) { return [...this.table("users").values()].filter((row) => row.email === email).length; }
  async countFixtureCollisions() { return this.fixtureCollisions; }
  async getTrainerContract() { return structuredClone(this.contract); }
  async insertOwnedRow(table, row) { this.table(table).set(row.id, structuredClone(row)); }
  async readRowById(table, id) { return structuredClone(this.table(table).get(id) ?? null); }
  async deleteRowById(table, id) {
    this.deleteOrder.push(table);
    if (table === this.failDeleteTable) throw Object.assign(new Error("private provider delete detail"), { code: "APPLICATION_CLEANUP_FAILED" });
    this.table(table).delete(id);
  }
  async countRowById(table, id) { return this.table(table).has(id) ? 1 : 0; }
  async deleteAuthById(id) { this.authDeleteOrder.push(id); this.auth.delete(id); }
}

const testEmail = "trainer.acceptance@example.test";
const run = "035K-ABCDEF123456";

const signInPage = readFileSync("app/sign-in/page.tsx", "utf8");
const signInForm = readFileSync("components/auth/sign-in-form.tsx", "utf8");
const authActions = readFileSync("app/auth/actions.ts", "utf8");
const callback = readFileSync("app/auth/callback/route.ts", "utf8");
const portal = readFileSync("app/(portal)/portal/page.tsx", "utf8");
const horseWorkspace = readFileSync("app/(portal)/portal/horses/[horseId]/page.tsx", "utf8");
const helper = readFileSync("scripts/live-trainer-access-035K-core.mjs", "utf8");
const wrapper = readFileSync("scripts/Invoke-LiveTrainerAccess035K.ps1", "utf8");

check(signInPage.includes("After sign-in"));
check(signInPage.includes("Trainer dashboard"));
check(signInPage.includes("Access and code delivery still require an approved account."));
check(!signInPage.includes("Continue after setup"));
check(!signInPage.includes("<p className=\"mt-2 text-steel\">{nextPath}</p>"));
check(signInPage.includes("Return to public site"));
check(authActions.includes("shouldCreateUser: false"));
check(authActions.includes('outcome: "indeterminate"'));
check(!authActions.includes("console.log"));
const inputValidationIndex = authActions.indexOf("classifyOtpVerificationInput({ email, token })");
const providerVerificationIndex = authActions.indexOf("supabase.auth.verifyOtp({ email, token, type: \"email\" })");
const providerOutcomeIndex = authActions.indexOf("classifyOtpVerification({ email, token, hasError: Boolean(error), hasSession: Boolean(data.session), hasUser: Boolean(data.user) })");
check(inputValidationIndex >= 0, "input-only OTP validation must be present");
check(providerVerificationIndex > inputValidationIndex, "input-only OTP validation must run before provider verification");
check(!authActions.includes("classifyOtpVerification({ email, token })"), "provider-outcome classifier must not run before provider verification");
check(providerOutcomeIndex > providerVerificationIndex, "provider-outcome validation must run after provider verification");
check(signInForm.includes("Already have a code?"));
check(signInForm.includes('pattern="[0-9]{6}"'));
check(signInForm.includes("Request another code in"));
check(!signInForm.includes("localStorage"));
check(!signInForm.includes("sessionStorage"));
check(callback.includes("normalizeAppRedirectPath"));
check(portal.includes("A permission-aware daily worklist of accessible horses"));
check(horseWorkspace.includes("Horse not available"));
check(!horseWorkspace.includes("provider detail"));

equal(normalizeProtectedEmail(" Tester@Example.com "), "tester@example.com");
check(exactProtectedEmailMatch("Tester@Example.com", " tester@example.com "));
equal(emailDigest("Tester@Example.com"), emailDigest(" tester@example.com "));
equal(validateTargetUrl("https://uvskssaecdhxcgytkasc.supabase.co"), "https://uvskssaecdhxcgytkasc.supabase.co");
assertions += 1; assert.throws(() => validateTargetUrl("https://tagnbgkroihagjmvehlx.supabase.co"), /PROHIBITED_TARGET_REFUSED/);
assertions += 1; assert.throws(() => validateTargetUrl("https://example.com"), /TARGET_REFUSED/);
equal(sanitizeFailure(new Error("private provider detail")), "UNEXPECTED");
equal(cleanupOrder("created").at(-1), "auth-last-if-created");
equal(cleanupOrder("adopted").at(-1), "adopted-auth-preserved");
check(!helper.includes("listUsers"));
check(!helper.includes("perPage"));
check(helper.includes("getUserById"));
check(helper.includes("EXACT_IDENTITY_CONTRACT_REQUIRED"));
check(wrapper.includes("Read-Host 'Protected Supabase service-role value' -AsSecureString"));
check(!wrapper.includes("TesterEmail"));
check(!wrapper.includes("OtpCode"));
const allowedBranchBlock = wrapper.match(/\$allowedBranches\s*=\s*@\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/);
check(allowedBranchBlock !== null, "wrapper must define one exact closed branch allowlist");
const modeledAllowedBranches = allowedBranchBlock?.slice(1) ?? [];
equal(modeledAllowedBranches.length, 3, "branch allowlist must contain exactly three entries");
equal(modeledAllowedBranches[0], "codex/035K-live-trainer-access-and-human-acceptance", "historical 035K branch must remain allowed");
equal(modeledAllowedBranches[1], "codex/036G-immediate-trainer-access-recovery-and-minimal-production-cutover", "closed 036G branch must remain allowed");
equal(modeledAllowedBranches[2], "codex/036I-diagnostic-guided-production-trainer-acceptance", "current 036I branch must be allowed");
check(wrapper.includes("$allowedBranches -notcontains $branch"), "wrapper must refuse every branch outside the closed allowlist");
check(!wrapper.includes("$expectedBranch"), "obsolete single-branch binding must be absent");
check(modeledAllowedBranches.includes("codex/035K-live-trainer-access-and-human-acceptance"), "modeled guard must accept historical 035K");
check(modeledAllowedBranches.includes("codex/036G-immediate-trainer-access-recovery-and-minimal-production-cutover"), "modeled guard must accept current 036G");
check(modeledAllowedBranches.includes("codex/036I-diagnostic-guided-production-trainer-acceptance"), "modeled guard must accept current 036I");
check(!modeledAllowedBranches.includes("codex/036F-corrected-wrapper-live-lifecycle-retry"), "modeled guard must refuse closed 036F");
check(!modeledAllowedBranches.includes("develop") && !modeledAllowedBranches.includes(""), "modeled guard must refuse develop and detached HEAD");

// Created identity: exact provisioning, ceilings, verification, deletion order and Auth-last zero.
const createdStore = new MemoryStore();
const createdAdapter = new FakeAdapter();
const created = await provisionWithAdapter({ adapter: createdAdapter, store: createdStore, emailInput: testEmail, existingAuthIdInput: "", run });
equal(created.state, "prepared");
equal(created.identity, "created");
equal(created.application, 8);
equal(createdAdapter.auth.size, 1);
equal([...createdAdapter.rows.values()].reduce((sum, table) => sum + table.size, 0), 8);
equal(createdAdapter.unrelatedEnumerationCalls, 0);
equal((await verifyWithAdapter({ adapter: createdAdapter, store: createdStore, emailInput: testEmail })).wrongHorseRows, 0);
await rejectsCode(() => verifyWithAdapter({ adapter: createdAdapter, store: createdStore, emailInput: "different@example.test" }), "TESTER_IDENTITY_MISMATCH");
const createdCleanup = await cleanupWithAdapter({ adapter: createdAdapter, store: createdStore, emailInput: testEmail });
check(createdStore.removed);
equal(createdCleanup.auth, 0);
assertions += 1; assert.deepEqual(createdAdapter.deleteOrder, cleanupOrder("created").slice(0, -1));
equal(createdAdapter.authDeleteOrder.length, 1);
equal(createdAdapter.auth.size, 0);
for (const table of cleanupOrder("created").slice(0, -1)) equal(createdCleanup.absence[table], 0);

// Existing tester without an exact ID fails closed; no unrelated Auth identities are read.
const ambiguousStore = new MemoryStore();
const ambiguousAdapter = new FakeAdapter({ duplicateOnCreate: true });
await rejectsCode(() => provisionWithAdapter({ adapter: ambiguousAdapter, store: ambiguousStore, emailInput: testEmail, existingAuthIdInput: "", run }), "EXACT_IDENTITY_CONTRACT_REQUIRED");
equal(ambiguousAdapter.unrelatedEnumerationCalls, 0);
equal(ambiguousStore.read().state, "recovery");

// Adopted identity is exact-matched, provisioned, and preserved through cleanup.
const adoptedId = "20000000-0000-4000-8000-000000000001";
const adoptedStore = new MemoryStore();
const adoptedAdapter = new FakeAdapter({ adoptedAuth: { id: adoptedId, email: testEmail } });
const adopted = await provisionWithAdapter({ adapter: adoptedAdapter, store: adoptedStore, emailInput: testEmail, existingAuthIdInput: adoptedId, run });
equal(adopted.identity, "adopted");
await cleanupWithAdapter({ adapter: adoptedAdapter, store: adoptedStore, emailInput: testEmail });
equal(adoptedAdapter.authDeleteOrder.length, 0);
check(adoptedAdapter.auth.has(adoptedId));

// Exact-ID mismatch and fixture ceiling refusal occur before application mutation.
const mismatchStore = new MemoryStore();
const mismatchAdapter = new FakeAdapter({ adoptedAuth: { id: adoptedId, email: "someone-else@example.test" } });
await rejectsCode(() => provisionWithAdapter({ adapter: mismatchAdapter, store: mismatchStore, emailInput: testEmail, existingAuthIdInput: adoptedId, run }), "EXACT_IDENTITY_MISMATCH");
equal([...mismatchAdapter.rows.values()].reduce((sum, table) => sum + table.size, 0), 0);
const collisionStore = new MemoryStore();
const collisionAdapter = new FakeAdapter({ fixtureCollisions: 1 });
await rejectsCode(() => provisionWithAdapter({ adapter: collisionAdapter, store: collisionStore, emailInput: testEmail, existingAuthIdInput: "", run }), "FIXTURE_COLLISION_REFUSED");
equal(collisionAdapter.auth.size, 0);

// Retention requires the exact non-sensitive interactive value; cancellation changes nothing.
const retentionStore = new MemoryStore();
const retentionAdapter = new FakeAdapter();
await provisionWithAdapter({ adapter: retentionAdapter, store: retentionStore, emailInput: testEmail, existingAuthIdInput: "", run });
await rejectsCode(async () => retainWithConfirmation({ store: retentionStore, confirmation: "retain" }), "RETENTION_CONFIRMATION_REFUSED");
equal(retentionStore.read().state, "prepared");
equal(retainWithConfirmation({ store: retentionStore, confirmation: RETAIN_CONFIRMATION }).state, "retained");
equal(retentionStore.read().state, "retained");

// Partial deletion stops, preserves recovery ledger, and never reaches Auth deletion.
const partialStore = new MemoryStore();
const partialAdapter = new FakeAdapter({ failDeleteTable: "horses" });
await provisionWithAdapter({ adapter: partialAdapter, store: partialStore, emailInput: testEmail, existingAuthIdInput: "", run });
await rejectsCode(() => cleanupWithAdapter({ adapter: partialAdapter, store: partialStore, emailInput: testEmail }), "APPLICATION_CLEANUP_FAILED");
equal(partialStore.read().state, "recovery");
check(partialStore.exists());
equal(partialAdapter.authDeleteOrder.length, 0);
check(partialAdapter.auth.size === 1);

// Replaced/mismatched owned row refuses destructive cleanup before that row is deleted.
const replacedStore = new MemoryStore();
const replacedAdapter = new FakeAdapter();
await provisionWithAdapter({ adapter: replacedAdapter, store: replacedStore, emailInput: testEmail, existingAuthIdInput: "", run });
const replacedLedger = replacedStore.read();
replacedAdapter.table("horses").get(replacedLedger.ids.horse).name = "Unrelated replacement";
await rejectsCode(() => cleanupWithAdapter({ adapter: replacedAdapter, store: replacedStore, emailInput: testEmail }), "OWNED_ROW_MISMATCH_RECOVERY_REQUIRED");
equal(replacedStore.read().state, "recovery");
equal(replacedAdapter.authDeleteOrder.length, 0);

for (const adapter of [createdAdapter, ambiguousAdapter, adoptedAdapter, mismatchAdapter, collisionAdapter, retentionAdapter, partialAdapter, replacedAdapter]) {
  check(adapter.externalMutation === false);
}

console.log(`Sprint 035K live trainer access deterministic tests passed (${assertions} assertions).`);
