#!/usr/bin/env node
import { PassThrough } from "node:stream";
import assert from "node:assert/strict";
import { ACCEPTED_ALIASES, ACCEPTED_SOURCE } from "./prelaunch-readiness-036K.mjs";
import {
  BINDING_NAMES, CONSUMER_CLASSES, LEGACY_TYPES, buildKeyPairSelection,
  classifyOpaqueCompatibilityProbe, compensatePreparedPair, executePairedMigration,
  createCredentialClassRegistry, createProtectedProviderAdapters, createProtectedWindowHandlers, runMode, runProtectedWindowChild,
  validateAliasReadback, validateConsumerInventory, validateExactSourceBundle,
  validateExportEnvironmentPath, validateLegacyInvalidation, validateProbeSet,
} from "./prelaunch-provider-036M.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
async function throwsCode(fn, code) { assertions += 1; await assert.rejects(fn, (error) => error?.code === code || error?.message === code); }

equal(CONSUMER_CLASSES.length, 9);
equal(BINDING_NAMES.length, 2);
equal(LEGACY_TYPES.length, 2);
const consumers = CONSUMER_CLASSES.map((name, index) => ({ class: name, count: index, complete: true, sanitized: true, entries: Array.from({ length: index }, (_, entry) => ({ name: `consumer-${entry}`, target: `target-${entry}` })) }));
const finite = createProtectedProviderAdapters({
  supabaseManagement: { projectExact: true }, supabaseAuth: { projectExact: true },
  vercel: { projectExact: true }, runtime: { zeroBusinessEffects: true },
});
equal(Object.keys(finite).length, 4);
await throwsCode(async () => createProtectedProviderAdapters({ genericRunner: {} }), "ADAPTER_REGISTRY_REFUSED");
const classRegistry = createCredentialClassRegistry(Object.fromEntries(["SUPABASE_SERVICE_ROLE_KEY", "CRON_SECRET", "ENQUIRY_ABUSE_HMAC_SECRET", "PUBLIC_ENQUIRY_SMTP_PASS", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "RAILWAY_API_TOKEN"].map((name) => [name, { native: true }])));
equal(Object.keys(classRegistry).length, 7);
await throwsCode(async () => createCredentialClassRegistry({ UNKNOWN: {} }), "CLASS_ROWS_REFUSED");
const pipeInput = new PassThrough();
const pipeOutput = new PassThrough();
let pipeText = "";
pipeOutput.on("data", (chunk) => { pipeText += chunk.toString("utf8"); });
const handlerCalls = Object.create(null);
const phaseHandlers = Object.fromEntries(["baseline", "pair-prepare", "bindings-candidate-probes", "legacy-deactivate-readback", "credential-dispositions", "identity-dispositions", "trainer-prepare-deliver", "trainer-observe-cleanup", "final-readback"].map((phase) => [phase, async () => {
  handlerCalls[phase] = (handlerCalls[phase] ?? 0) + 1;
  const pending = ["legacy-deactivate-readback", "trainer-prepare-deliver"].includes(phase) && handlerCalls[phase] === 1;
  return { state: phase === "legacy-deactivate-readback" && !pending ? "revoked-and-invalid" : "accepted-retained", counts: {}, externalMutations: 0, residue: 0, ...(phase === "legacy-deactivate-readback" ? { legacyAttempted: true } : {}), ...(pending ? { pending: true } : {}) };
}]));
const pipeRun = runProtectedWindowChild({ input: pipeInput, output: pipeOutput, handlers: phaseHandlers });
const requestPhases = ["baseline", "pair-prepare", "bindings-candidate-probes", "legacy-deactivate-readback", "legacy-deactivate-readback", "credential-dispositions", "identity-dispositions", "trainer-prepare-deliver", "trainer-prepare-deliver", "trainer-observe-cleanup", "final-readback"];
for (const [index, phase] of requestPhases.entries()) pipeInput.write(`${JSON.stringify({ id: index + 1, operation: "phase", phase, payload: {} })}\n`);
pipeInput.end();
const pipeLanding = await pipeRun;
equal(pipeLanding.closed, true);
equal(pipeText.trim().split(/\r?\n/).length, 11);
for (const phase of Object.keys(phaseHandlers)) check(pipeText.includes(`${phase.toUpperCase().replaceAll("-", "_")}_ACCEPTED`), `pipe response ${phase}`);
check(pipeText.trim().split(/\r?\n/).every((line) => Object.keys(JSON.parse(line)).every((key) => ["id", "code", "state", "counts", "ordinal", "time", "externalMutations", "residue", "legacyAttempted", "nextPhase", "pending"].includes(key))), "pipe output allowlisted");
check(pipeLanding.legacyAttempted === true && pipeLanding.nextPhase === null, "pipe irreversible landing");
check(!pipeText.includes("private-canary"), "child output excludes private canary");
const malformedInput = new PassThrough();
const malformedOutput = new PassThrough();
const malformedRun = runProtectedWindowChild({ input: malformedInput, output: malformedOutput, handlers: phaseHandlers });
malformedInput.end('{"id":1,"operation":"run","phase":"baseline","payload":{}}\n');
await throwsCode(() => malformedRun, "REQUEST_REFUSED");

const splitHandlers = createProtectedWindowHandlers({
  supabaseManagement: { projectExact: true, async deactivateAndReadback() { return { legacyDisabled: 2, predecessorRejected: 2, authCompatible: true, externalMutations: 1 }; } },
  supabaseAuth: {
    projectExact: true,
    async prepareTrainerGraph() { return { graphCreates: 8, ordinal: 1, controllerAuthCalls: 0, sessionBridgeCalls: 0, externalMutations: 8 }; },
    async readTrainerDelivery() { return { graphCreates: 8, message: 1, verification: 1, ordinal: 1, controllerAuthCalls: 0, sessionBridgeCalls: 0, externalMutations: 0 }; },
  },
  vercel: { projectExact: true },
  runtime: {
    zeroBusinessEffects: true,
    async preflightOldDeployments() { return { ready: true, addressable: 2 }; },
    async readOldDeploymentInvalidation() { return { addressable: 2, rejected: 2, genericPages: 0 }; },
  },
});
const splitContext = { handles: {}, opaque: {}, consumerCounts: { "old-deployments": 2 } };
assert.equal((await splitHandlers["legacy-deactivate-readback"]({ step: "preflight" }, splitContext)).pending, true);
assert.equal((await splitHandlers["legacy-deactivate-readback"]({ step: "attempt", approveLegacyDeactivation: true }, splitContext)).pending, true);
assert.equal((await splitHandlers["legacy-deactivate-readback"]({ step: "old-deployment-readback" }, splitContext)).state, "revoked-and-invalid");
assert.equal((await splitHandlers["trainer-prepare-deliver"]({ step: "prepare", trainerOrdinal: 1 }, splitContext)).pending, true);
assert.equal((await splitHandlers["trainer-prepare-deliver"]({ step: "deliver", trainerOrdinal: 1, messageObserved: true, verificationObserved: true }, splitContext)).state, "accepted-retained");



for (const row of consumers) check(row.complete && row.sanitized, `${row.class} inventory closure`);
const inventory = validateConsumerInventory(consumers);
await throwsCode(async () => validateConsumerInventory(consumers.slice(1)), "CONSUMER_INVENTORY_REFUSED");
check(CONSUMER_CLASSES.every((name) => consumers.some((row) => row.class === name)), "all consumer classes");

const compatible = { directPublishable: true, installedPublic: true, installedAuthenticated: true, directSecret: true, installedAdmin: true, middleware: true, pkceCallback: true, userJwtPreserved: true, protectedOutput: false };
equal(classifyOpaqueCompatibilityProbe(compatible).ready, true);
equal(classifyOpaqueCompatibilityProbe({ ...compatible, installedPublic: false }).correctionRequired, true);
await throwsCode(async () => classifyOpaqueCompatibilityProbe({ ...compatible, protectedOutput: true }), "COMPATIBILITY_PROBE_REFUSED");

for (const [pubExisting, secExisting, ceiling] of [[false, false, 2], [false, true, 1], [true, false, 1], [true, true, 0]]) {
  const baseline = [pubExisting && { id: "pub", type: "publishable", name: "public" }, secExisting && { id: "sec", type: "secret", name: "server" }].filter(Boolean);
  const selection = buildKeyPairSelection({ baseline, selected: [{ id: "pub", type: "publishable", name: "public" }, { id: "sec", type: "secret", name: "server" }] });
  equal(selection.compensation.deleteCeiling, ceiling);
  equal(selection.compensation.selectedDeletes, 0);
  equal(selection.ledger.snapshot().keys.length, 2);
}

equal(validateExactSourceBundle({ source: ACCEPTED_SOURCE, dirtyFiles: 0, traversal: 0, projectExact: true, aliasFree: true, ready: true }).sourceExact, true);
await throwsCode(async () => validateExactSourceBundle({ source: "wrong", dirtyFiles: 0, traversal: 0, projectExact: true, aliasFree: true, ready: true }), "SOURCE_BUNDLE_REFUSED");
equal(validateExportEnvironmentPath(".env.example"), true);
await throwsCode(async () => validateExportEnvironmentPath("nested/.env.production"), "SOURCE_BUNDLE_REFUSED");
equal(validateProbeSet({ public: true, authenticatedUser: true, serverAdmin: true, businessEffects: 0, protectedOutput: false }).businessEffects, 0);
await throwsCode(async () => validateProbeSet({ public: true, authenticatedUser: true, serverAdmin: true, businessEffects: 1, protectedOutput: false }), "RUNTIME_PROBE_REFUSED");
const aliasRows = ACCEPTED_ALIASES.map((alias) => ({ alias, deployment: "candidate" }));
equal(validateAliasReadback(aliasRows, "candidate").aliases, 5);
await throwsCode(async () => validateAliasReadback(aliasRows.slice(1), "candidate"), "ALIAS_READBACK_REFUSED");
const invalidation = { attemptLatched: true, jwtSigningChanged: false, sessionsRotated: false, legacy: LEGACY_TYPES.map((type) => ({ type, disabled: true, predecessorRejected: true })), replacementPublishable: true, replacementSecret: true, currentAuthCompatible: true };
equal(validateLegacyInvalidation(invalidation).legacyDisabled, 2);
equal(validateLegacyInvalidation(invalidation).sessionsRotated, false);
await throwsCode(async () => validateLegacyInvalidation({ ...invalidation, attemptLatched: false }), "LEGACY_INVALIDATION_REFUSED");

function makeAdapter(failure = "") {
  const calls = [];
  return {
    calls,
    async installTwoBindings() { calls.push("install"); if (failure === "install-partial") throw Object.assign(new Error("INSTALL_FAILED"), { code: "INSTALL_FAILED" }); },
    async createExactSourceCandidate() { calls.push("candidate"); if (failure === "candidate-partial") throw Object.assign(new Error("CANDIDATE_FAILED"), { code: "CANDIDATE_FAILED" }); return { source: ACCEPTED_SOURCE, dirtyFiles: 0, traversal: 0, projectExact: true, aliasFree: true, ready: true, deployment: "candidate" }; },
    async runProbeSet() { calls.push("probes"); return { public: true, authenticatedUser: true, serverAdmin: true, businessEffects: 0, protectedOutput: false }; },
    async assignAndReadFiveAliases() { calls.push("aliases"); return aliasRows; },
    async deactivateLegacyPair() { calls.push("deactivate"); },
    async readLegacyAndReplacementState() { calls.push("legacy-readback"); return invalidation; },
    async removeOwnedCandidate() { calls.push("remove-candidate"); },
    async restoreTwoBindings() { calls.push("restore-bindings"); },
    async deleteCreatedKey(id) { calls.push(`delete:${id}`); },
    async readCompensatedState() { calls.push("compensation-readback"); return { bindingsRestored: true, candidateAbsent: true, createdKeysAbsent: 2, selectedKeysDeleted: 0 }; },
  };
}
const selectedKeys = [{ id: "pub", type: "publishable", name: "public" }, { id: "sec", type: "secret", name: "server" }];
const success = makeAdapter();
const result = await executePairedMigration({ baselineKeys: [], selectedKeys, consumerRows: consumers, compatibility: compatible, adapter: success });
equal(result.state, "paired-migration-accepted");
equal(result.bindings, 2);
equal(result.aliases, 5);
equal(result.keyProvenance.length, 2);
for (const call of ["install", "candidate", "probes", "aliases", "deactivate", "legacy-readback"]) check(success.calls.includes(call), call);
for (const [index, call] of ["install", "candidate", "probes", "aliases", "deactivate", "legacy-readback"].entries()) equal(success.calls[index], call, `success order ${call}`);

for (const failure of ["install-partial", "candidate-partial"]) {
  const adapter = makeAdapter(failure);
  await throwsCode(() => executePairedMigration({ baselineKeys: [], selectedKeys, consumerRows: consumers, compatibility: compatible, adapter }), failure === "install-partial" ? "INSTALL_FAILED" : "CANDIDATE_FAILED");
  check(adapter.calls.includes("restore-bindings"), `${failure} restores possibly partial bindings`);
  equal(adapter.calls.filter((call) => call.startsWith("delete:")).length, 2);
  if (failure === "candidate-partial") check(adapter.calls.includes("remove-candidate"), "candidate partial mutation is removed");
}

const compensationAdapter = makeAdapter();
const selection = buildKeyPairSelection({ baseline: [], selected: selectedKeys });
const compensated = await compensatePreparedPair({ adapter: compensationAdapter, bindingsAttempted: true, candidateAttempted: true, keyLedger: selection.ledger });
equal(compensated.createdKeyDeletes, 2);
equal(compensated.selectedKeyDeletes, 0);
equal(compensated.compensated, true);
equal((await runMode("self-test")).state, "pass");
equal((await runMode("capability-gate")).state, "private-window-required");
await throwsCode(() => runMode("unknown"), "MODE_REFUSED");

check(["directPublishable", "installedPublic", "installedAuthenticated", "directSecret", "installedAdmin", "middleware", "pkceCallback", "userJwtPreserved"].every((key) => compatible[key] === true), "all compatibility surfaces");
check(LEGACY_TYPES.every((type) => invalidation.legacy.some((row) => row.type === type && row.disabled && row.predecessorRejected)), "legacy pair invalid");
assert.equal(assertions, 90, `expected exactly 90 provider assertions, received ${assertions}`);

async function exerciseHandlerMutationFailure(failure) {
  const calls = [];
  const adapters = {
    supabaseManagement: {
      projectExact: true,
      async readBaseline() { return { projectExact: true, protectedOutput: false, consumerClasses: 9, keyRows: 4, inventoryReady: true }; },
      async preparePair() { calls.push("pair-mutate"); if (failure === "pair") throw Object.assign(new Error("PAIR_MUTATE_THROW"), { code: "PAIR_MUTATE_THROW" }); return { pairReady: true, provenanceRows: 2, externalMutations: 0 }; },
    },
    supabaseAuth: { projectExact: true },
    vercel: {
      projectExact: true,
      async installDeployProbeAlias() { calls.push("binding-mutate"); throw Object.assign(new Error("BINDING_MUTATE_THROW"), { code: "BINDING_MUTATE_THROW" }); },
      async compensateBeforeLegacy({ bindingsAttempted }) { calls.push(`compensate:${bindingsAttempted}`); return { bindingsRestored: 2, targetsReadback: 3, aliasesRestored: 5, candidateAbsent: true, createdKeysAbsent: 0, createdDeletes: 0, pairTypesAccounted: 2, selectedDeletes: 0, residue: 0 }; },
    },
    runtime: { zeroBusinessEffects: true },
  };
  const input = new PassThrough();
  const output = new PassThrough();
  output.resume();
  const run = runProtectedWindowChild({ input, output, handlers: createProtectedWindowHandlers(adapters) });
  input.write(`${JSON.stringify({ id: 1, operation: "phase", phase: "baseline", payload: { projectRef: "project", managementToken: "management", originalPublicBinding: "public", originalServiceBinding: "service", operatorUserJwt: "jwt", originalAliasDeployment: "alias" } })}\n`);
  input.write(`${JSON.stringify({ id: 2, operation: "phase", phase: "pair-prepare", payload: { approvePair: true } })}\n`);
  if (failure === "binding") input.write(`${JSON.stringify({ id: 3, operation: "phase", phase: "bindings-candidate-probes", payload: { approveProduction: true } })}\n`);
  input.end();
  await assert.rejects(run, (error) => error?.code === (failure === "pair" ? "PAIR_MUTATE_THROW" : "BINDING_MUTATE_THROW"));
  assert.equal(calls.filter((call) => call.startsWith("compensate:")).length, 1);
  assert.equal(calls.includes(`compensate:${failure === "binding"}`), true);
}
await exerciseHandlerMutationFailure("pair");
await exerciseHandlerMutationFailure("binding");

console.log(`Sprint 036M provider assertions passed: ${assertions}/90.`);
let postLegacyFixtureCleanupCalls = 0;
const interruptionCalls = Object.create(null);
const interruptionHandlers = Object.fromEntries(["baseline", "pair-prepare", "bindings-candidate-probes", "legacy-deactivate-readback", "credential-dispositions", "identity-dispositions", "trainer-prepare-deliver", "trainer-observe-cleanup", "final-readback"].map((phase) => [phase, async (payload, context) => {
  interruptionCalls[phase] = (interruptionCalls[phase] ?? 0) + 1;
  if (phase === "trainer-prepare-deliver") context.trainerGraphPrepared = true;
  const pending = phase === "legacy-deactivate-readback" ? interruptionCalls[phase] === 1 : phase === "trainer-prepare-deliver";
  return { state: phase === "legacy-deactivate-readback" && !pending ? "revoked-and-invalid" : "accepted-retained", counts: {}, externalMutations: 0, residue: 0, ...(phase === "legacy-deactivate-readback" ? { legacyAttempted: true } : {}), ...(pending ? { pending: true } : {}) };
}]));
interruptionHandlers.cleanupTrainerFixture = async () => { postLegacyFixtureCleanupCalls += 1; return { cleaned: true, residue: 0 }; };
const interruptionInput = new PassThrough();
const interruptionOutput = new PassThrough();
interruptionOutput.resume();
const interruptionRun = runProtectedWindowChild({ input: interruptionInput, output: interruptionOutput, handlers: interruptionHandlers });
for (const [index, request] of [
  ["baseline", {}], ["pair-prepare", {}], ["bindings-candidate-probes", {}],
  ["legacy-deactivate-readback", { step: "attempt" }], ["legacy-deactivate-readback", { step: "old-deployment-readback" }],
  ["credential-dispositions", {}], ["identity-dispositions", {}], ["trainer-prepare-deliver", { step: "prepare" }],
].entries()) interruptionInput.write(`${JSON.stringify({ id: index + 1, operation: "phase", phase: request[0], payload: request[1] })}\n`);
interruptionInput.end();
await interruptionRun;
assert.equal(postLegacyFixtureCleanupCalls, 1);
