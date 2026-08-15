#!/usr/bin/env node
import assert from "node:assert/strict";
import {
  GRAPH_TABLES, TRAINER_TASKS, cleanupReplacementGraph, createReplacementGraph,
  retirePriorGraph, trainerLanding, validateDeliveryCounters, validateTrainerIdentity,
  createPhoneNativeDeliveryLedger, recordPhoneNativeObservation,
  validateTrainerObservation, validateTrainerSessionTransition,
} from "./prelaunch-trainer-036M.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
async function throwsCode(fn, code) { assertions += 1; await assert.rejects(fn, (error) => error?.code === code || error?.message === code); }

equal(GRAPH_TABLES.length, 8);
equal(TRAINER_TASKS.length, 8);
const replacementRows = GRAPH_TABLES.map((table, index) => ({ id: `replacement-${index}`, table, owned: true, synthetic: true }));
const priorRows = GRAPH_TABLES.map((table, index) => ({ id: `prior-${index}`, table, owned: true, synthetic: true }));
check(replacementRows.every((row, index) => row.table === GRAPH_TABLES[index] && row.owned && row.synthetic), "replacement graph exact");

const store = new Map();
const key = (table, id) => `${table}:${id}`;
const adapter = {
  async insertExactOwned(row) { store.set(key(row.table, row.id), structuredClone(row)); },
  async readExact(table, id) { return store.get(key(table, id)) ?? null; },
  async deleteExact(table, id) { store.delete(key(table, id)); },
  async countExact(table, id) { return store.has(key(table, id)) ? 1 : 0; },
};
const created = await createReplacementGraph({ rows: replacementRows, adapter });
equal(created.result.creates, 8);
for (const row of replacementRows) assert(store.has(key(row.table, row.id)), `created ${row.table}`);
const cleaned = await cleanupReplacementGraph({ rows: replacementRows, adapter, ledger: created.ledger });
equal(cleaned.cleanupDeletes, 8);
equal(cleaned.total, 16);
for (const row of replacementRows) assert.equal(await adapter.countExact(row.table, row.id), 0, `cleanup absence ${row.table}`);
for (const row of priorRows) store.set(key(row.table, row.id), structuredClone(row));
const retired = await retirePriorGraph({ rows: priorRows, adapter, ledger: created.ledger });
equal(retired.priorDeletes, 8);
equal(retired.total, 24);
equal(retired.priorRetired, true);
for (const row of priorRows) assert.equal(await adapter.countExact(row.table, row.id), 0, `prior absence ${row.table}`);
for (let failure = 0; failure < GRAPH_TABLES.length; failure += 1) {
  const partial = new Map();
  const deletions = [];
  const failing = {
    async insertExactOwned(row) { partial.set(key(row.table, row.id), structuredClone(row)); if (row.table === GRAPH_TABLES[failure]) throw Object.assign(new Error("GRAPH_CREATE_REFUSED"), { code: "GRAPH_CREATE_REFUSED" }); },
    async readExact(table, id) { return partial.get(key(table, id)) ?? null; },
    async deleteExact(table, id) { deletions.push(table); partial.delete(key(table, id)); },
    async countExact(table, id) { return partial.has(key(table, id)) ? 1 : 0; },
  };
  await throwsCode(() => createReplacementGraph({ rows: replacementRows, adapter: failing }), "GRAPH_CREATE_REFUSED");
  equal(partial.size, 0, `partial cleanup absence ${failure}`);
  check(JSON.stringify(deletions) === JSON.stringify(GRAPH_TABLES.slice(0, failure + 1).reverse()), `partial cleanup reverse order ${failure}`);
}


const counters = { message: 1, verification: 1, resend: 0, generatedLink: 0, mailboxAutomation: 0, password: 0, adminSubstitute: 0, serviceRoleSubstitute: 0 };
equal(validateDeliveryCounters(counters), true);
await throwsCode(async () => validateDeliveryCounters({ ...counters, message: 2 }), "DELIVERY_CEILING_REFUSED");
await throwsCode(async () => validateDeliveryCounters({ ...counters, generatedLink: 1 }), "DELIVERY_CEILING_REFUSED");
equal(validateTrainerIdentity({ exactMatch: true, ownerApproved: true, leastPrivilege: true, duplicate: false, createdByNormalSignIn: false }), true);
equal(validateTrainerIdentity({ exactMatch: false, ownerApproved: true, leastPrivilege: true, duplicate: false, createdByNormalSignIn: true }), true);
const phone = createPhoneNativeDeliveryLedger();
equal(recordPhoneNativeObservation(phone, "message", true).message, 1);
equal(recordPhoneNativeObservation(phone, "verification", true).verification, 1);
equal(phone.snapshot().controllerAuthCalls, 0);
equal(phone.snapshot().sessionBridgeCalls, 0);
equal(phone.snapshot().addressReceived, 0);
equal(phone.snapshot().codeReceived, 0);
await throwsCode(async () => recordPhoneNativeObservation(phone, "message", true), "DELIVERY_CEILING_REFUSED");
await throwsCode(async () => recordPhoneNativeObservation(createPhoneNativeDeliveryLedger(), "verification", true), "DELIVERY_ORDER_REFUSED");

equal(validateTrainerSessionTransition({ baseline: "2026-08-12T00:00:00Z", current: "2026-08-12T00:01:00Z" }).sessionActive, true);
await throwsCode(async () => validateTrainerSessionTransition({ baseline: "2026-08-12T00:01:00Z", current: "2026-08-12T00:01:00Z" }), "TRAINER_LANDING_REFUSED");
await throwsCode(async () => validateTrainerIdentity({ exactMatch: false, ownerApproved: true, leastPrivilege: true, duplicate: false, createdByNormalSignIn: false }), "TRAINER_IDENTITY_REFUSED");
await throwsCode(async () => validateTrainerIdentity({ exactMatch: true, ownerApproved: true, leastPrivilege: true, duplicate: true, createdByNormalSignIn: false }), "TRAINER_IDENTITY_REFUSED");

const observation = Object.fromEntries(TRAINER_TASKS.map((task) => [task, true]));
Object.assign(observation, { viewport: "supported-phone", startedAt: "2026-08-12T10:30:00+10:00", durationSeconds: 1800 });
const observed = validateTrainerObservation(observation);
equal(observed.tasks, 8);
equal(observed.passed, true);
equal(observed.viewport, "supported-phone");
equal(observed.durationSeconds, 1800);
await throwsCode(async () => validateTrainerObservation({ ...observation, durationSeconds: 5401 }), "TRAINER_OBSERVATION_REFUSED");

const landing = trainerLanding({ counters, observation, graph: retired, sessionResidue: 0, storageResidue: 0, ownerRetainsAuth: true });
equal(landing.trainer, 1);
equal(landing.message, 1);
equal(landing.verification, 1);
equal(landing.application, 8);
equal(landing.sessionResidue, 0);

assert.equal(assertions, 60, `expected exactly 60 trainer assertions, received ${assertions}`);
console.log(`Sprint 036M trainer assertions passed: ${assertions}/60.`);
