import assert from "node:assert/strict";
import { cleanupWithAdapters, exactEmailMatch, prepareWithAdapters } from "./protected-synthetic-otp-035D.mjs";

const run = "035D-035F-RECOVERY01";
const email = ["synthetic+recovery", "example.invalid"].join("@");
const id = "11111111-1111-4111-8111-111111111111";

function fakeLedger({ failWrites = [] } = {}) {
  let value = null; let writes = 0;
  return {
    exists: () => value !== null,
    read: () => structuredClone(value),
    write: next => { writes += 1; if (failWrites.includes(writes)) throw new Error("WRITE_FAILED"); value = structuredClone(next); },
    remove: () => { value = null; },
    value: () => structuredClone(value),
    writes: () => writes
  };
}

function fakeAdmin({ createFails = false, createPartial = false, verifyFails = false, deleteFails = false, absenceFails = false } = {}) {
  let users = [];
  const created = { id, email, email_confirmed_at: "2026-07-31T00:00:00Z", user_metadata: { synthetic_run: run, synthetic_purpose: "035D-email-otp" } };
  let listCalls = 0; let createCalls = 0;
  return {
    auth: { admin: {
      listUsers: async () => {
        listCalls += 1;
        if (verifyFails && listCalls === 2) return { error: null, data: { users: [] } };
        if (absenceFails && listCalls >= 3) return { error: null, data: { users: [created] } };
        return { error: null, data: { users: structuredClone(users) } };
      },
      createUser: async mutation => {
        createCalls += 1;
        assert.equal(mutation.email, email);
        assert.equal(mutation.email_confirm, true);
        assert.equal("password" in mutation, false);
        if (createPartial) { users = [created]; return { error: new Error("PARTIAL"), data: { user: null } }; }
        if (createFails) return { error: new Error("CREATE"), data: { user: null } };
        users = [created]; return { error: null, data: { user: structuredClone(created) } };
      },
      deleteUser: async authId => {
        assert.equal(authId, id);
        if (deleteFails) return { error: new Error("DELETE") };
        users = []; return { error: null };
      }
    } },
    users: () => structuredClone(users),
    createCalls: () => createCalls
  };
}

async function scenarioReservationFailure() {
  const ledger = fakeLedger({ failWrites: [1] }); const admin = fakeAdmin();
  const result = await prepareWithAdapters({ email, run, admin, ledger });
  assert.equal(result.code, "PREPARATION_RESERVATION_FAILED"); assert.equal(admin.createCalls(), 0); assert.equal(admin.users().length, 0); assert.equal(ledger.exists(), false);
}

async function scenarioCreateFailure() {
  const ledger = fakeLedger(); const admin = fakeAdmin({ createFails: true });
  const result = await prepareWithAdapters({ email, run, admin, ledger });
  assert.equal(result.code, "AUTH_CREATE_FAILED"); assert.equal(admin.users().length, 0); assert.equal(ledger.exists(), false);
}

async function scenarioVerificationRollback() {
  const ledger = fakeLedger(); const admin = fakeAdmin({ verifyFails: true });
  const result = await prepareWithAdapters({ email, run, admin, ledger });
  assert.equal(result.code, "OWNERSHIP_VERIFY_ROLLED_BACK"); assert.equal(admin.users().length, 0); assert.equal(ledger.exists(), false);
}

async function scenarioFinalizeRollback() {
  const ledger = fakeLedger({ failWrites: [2] }); const admin = fakeAdmin();
  const result = await prepareWithAdapters({ email, run, admin, ledger });
  assert.equal(result.code, "LEDGER_FINALIZE_ROLLED_BACK"); assert.equal(admin.users().length, 0); assert.equal(ledger.exists(), false);
}

async function scenarioRecoveryPreserved() {
  const ledger = fakeLedger({ failWrites: [2] }); const admin = fakeAdmin({ deleteFails: true });
  const result = await prepareWithAdapters({ email, run, admin, ledger });
  assert.equal(result.code, "PREPARATION_RECOVERY_REQUIRED"); assert.equal(result.ownership, "ambiguous"); assert.equal(admin.users().length, 1);
  assert.equal(ledger.value().state, "recovery"); assert.equal(ledger.value().authId, id); assert.equal(Object.hasOwn(ledger.value(), "email"), false);
  const cleanupAdmin = fakeAdmin(); cleanupAdmin.auth.admin.createUser({ email, email_confirm: true });
  const cleaned = await cleanupWithAdapters({ admin: cleanupAdmin, ledger, run });
  assert.equal(cleaned.auth, 0); assert.equal(ledger.exists(), false);
}

async function scenarioSuccessAndCleanup() {
  const ledger = fakeLedger(); const admin = fakeAdmin();
  const result = await prepareWithAdapters({ email, run, admin, ledger });
  assert.equal(result.state, "prepared"); assert.equal(result.preparationEmailSent, false); assert.equal(result.confirmed, true); assert.equal(result.ownership, "exact-owned");
  assert.equal(ledger.value().state, "prepared"); assert.equal(Object.hasOwn(ledger.value(), "email"), false);
  const cleaned = await cleanupWithAdapters({ admin, ledger, run });
  assert.deepEqual({ application: cleaned.application, auth: cleaned.auth, storage: cleaned.storage }, { application: 0, auth: 0, storage: 0 });
  assert.equal(ledger.exists(), false);
}

assert.equal(exactEmailMatch(` ${["Synthetic+Recovery", "Example.Invalid"].join("@")} `, email), true);
assert.equal(exactEmailMatch(["synthetic", "example.invalid"].join("@"), email), false);
assert.equal(exactEmailMatch(["synthetic+other", "example.invalid"].join("@"), email), false);

await scenarioReservationFailure();
await scenarioCreateFailure();
await scenarioVerificationRollback();
await scenarioFinalizeRollback();
await scenarioRecoveryPreserved();
await scenarioSuccessAndCleanup();

const safe = JSON.stringify({ state: "pass", checks: ["reservation-failure-zero", "create-failure-zero", "verification-rollback-zero", "finalize-rollback-zero", "recovery-preserved", "prepared-cleanup-zero", "no-email", "exact-plus", "protected-output"] });
assert.equal(safe.includes(email), false); assert.equal(safe.includes(id), false); assert.equal(safe.includes("service"), false);
process.stdout.write(`${safe}\n`);
