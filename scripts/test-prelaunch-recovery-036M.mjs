#!/usr/bin/env node
import assert from "node:assert/strict";
import {
  GRAPH_BUCKETS, KEY_PROVENANCE, PHASES, RECOVERY_OUTCOMES, appendRecoveryPhase,
  assertSafeProjection, createGraphMutationLedger, createKeyProvenanceLedger,
  createOpaqueStore, createProtectedWindowState, createRecoveryLedger, decideRecoveryOutcome,
  keyCompensationPlan, parseProtectedRequest, projectProtectedResponse, recordGraphAbsence,
  recordGraphMutation, recordKeyProvenance, sanitizeFailure, validateCredentialDispositions,
  validateExactEnvExample, validateGraphLanding, validateTrainerGate,
} from "./prelaunch-recovery-036M.mjs";
import { CREDENTIAL_CLASSES } from "./prelaunch-readiness-036K.mjs";

let checks = 0;
const ok = (value, message) => { assert.ok(value, message); checks += 1; };
const eq = (actual, expected, message) => { assert.deepEqual(actual, expected, message); checks += 1; };
const throws = (fn, code) => { assert.throws(fn, (error) => error?.code === code); checks += 1; };

eq(KEY_PROVENANCE, ["created-this-sprint", "pre-existing-selected"]);
eq(GRAPH_BUCKETS, ["replacementGraphCreates", "replacementGraphCleanupDeletes", "priorGraphRetirementDeletes"]);
eq(PHASES, ["baseline", "pair-prepare", "bindings-candidate-probes", "legacy-deactivate-readback", "credential-dispositions", "identity-dispositions", "trainer-prepare-deliver", "trainer-observe-cleanup", "final-readback"]);
eq(RECOVERY_OUTCOMES.length, 5);
const opaque = createOpaqueStore();
const opaqueHandle = opaque.put("private-canary-value");
eq(opaque.has(opaqueHandle), true);
eq(opaque.take(opaqueHandle), "private-canary-value");
eq(opaque.has(opaqueHandle), false);
const windowState = createProtectedWindowState();
eq(windowState.snapshot().nextPhase, "baseline");
eq(parseProtectedRequest('{"id":1,"operation":"phase","phase":"baseline","payload":{}}').phase, "baseline");
throws(() => parseProtectedRequest('{"id":1,"operation":"run","phase":"baseline","payload":{}}'), "REQUEST_REFUSED");
eq(projectProtectedResponse({ id: 1, code: "BASELINE_ACCEPTED", state: "accepted-retained", counts: { consumers: 9 } }).code, "BASELINE_ACCEPTED");
throws(() => projectProtectedResponse({ id: 1, code: "BASELINE_ACCEPTED", state: "accepted-retained", secret: "value" }), "RESPONSE_REFUSED");
const envExample = Buffer.from("# harmless pk_test_ / sk_test_ / whsec_ instructional prefixes\nNEXT_PUBLIC_APP_ENV=development\nNEXT_PUBLIC_SITE_URL=http://localhost:3000\nVERCEL_ENV=development\nNEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_ANON_KEY=\nSUPABASE_SERVICE_ROLE_KEY=\nNEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\nSTRIPE_SECRET_KEY=\nSTRIPE_WEBHOOK_SECRET=\nRAILWAY_API_TOKEN=\n");
eq(validateExactEnvExample(envExample, { expectedBytes: envExample, expectedBlob: "d790ad8998a4919d8ae5f308904047512b156f69", actualBlob: "d790ad8998a4919d8ae5f308904047512b156f69" }).placeholderOnly, true);
throws(() => validateExactEnvExample(Buffer.from(envExample.toString().replace("STRIPE_SECRET_KEY=", "STRIPE_SECRET_KEY=sk_live_private")), { expectedBytes: envExample, expectedBlob: "d790ad8998a4919d8ae5f308904047512b156f69", actualBlob: "changed" }), "SOURCE_ENV_REFUSED");
eq(assertSafeProjection({ state: "safe", count: 2 }), { state: "safe", count: 2 });
for (const protectedValue of ["person@example.test", "123456", "eyJabcdefghijk.payload", "sb_secret_value", "sb_publishable_value", "sk_live_value", "whsec_value", "rk_live_value", "ghp_value", "github_pat_value", "AKIA0123456789", "-----BEGIN RSA PRIVATE KEY"]) throws(() => assertSafeProjection({ value: protectedValue }), "PROTECTED_OUTPUT_REFUSED");

const recovery = createRecoveryLedger();
for (let phase = 0; phase < PHASES.length; phase += 1) {
  const snapshot = appendRecoveryPhase(recovery, phase, { state: phase < 3 ? "not-started" : "accepted-retained", externalMutations: 0, residue: 0, legacyAttempted: phase >= 3 });
  eq(snapshot.nextPhase, phase + 1);
  eq(snapshot.rows.at(-1).name, PHASES[phase]);
}
throws(() => appendRecoveryPhase(recovery, 8, { state: "accepted-retained", externalMutations: 0, residue: 0, legacyAttempted: true }), "LEDGER_REFUSED");
const earlyLegacy = createRecoveryLedger();
throws(() => appendRecoveryPhase(earlyLegacy, 0, { state: "not-started", externalMutations: 0, residue: 0, legacyAttempted: true }), "LEDGER_REFUSED");

for (const pair of [
  ["created-this-sprint", "created-this-sprint", 2],
  ["created-this-sprint", "pre-existing-selected", 1],
  ["pre-existing-selected", "created-this-sprint", 1],
  ["pre-existing-selected", "pre-existing-selected", 0],
]) {
  const ledger = createKeyProvenanceLedger();
  recordKeyProvenance(ledger, { id: `pub-${pair[0]}`, name: "public", type: "publishable", provenance: pair[0], baselinePresent: pair[0] === "pre-existing-selected" });
  recordKeyProvenance(ledger, { id: `sec-${pair[1]}`, name: "server", type: "secret", provenance: pair[1], baselinePresent: pair[1] === "pre-existing-selected" });
  const plan = keyCompensationPlan(ledger);
  eq(plan.deleteCeiling, pair[2]);
  eq(plan.selectedDeletes, 0);
  eq(plan.deleteIds.length, pair[2]);
  ok(Object.isFrozen(ledger.snapshot().keys));
}
const incompleteKeys = createKeyProvenanceLedger();
recordKeyProvenance(incompleteKeys, { id: "one", name: "one", type: "publishable", provenance: "created-this-sprint", baselinePresent: false });
throws(() => keyCompensationPlan(incompleteKeys), "KEY_LEDGER_REFUSED");
throws(() => recordKeyProvenance(incompleteKeys, { id: "two", name: "two", type: "secret", provenance: "pre-existing-selected", baselinePresent: false }), "KEY_PROVENANCE_REFUSED");

const graphRows = Array.from({ length: 8 }, (_, index) => ({ id: `replacement-${index}`, table: `table-${index}`, owned: true, synthetic: true }));
const priorRows = Array.from({ length: 8 }, (_, index) => ({ id: `prior-${index}`, table: `table-${index}`, owned: true, synthetic: true }));
const graph = createGraphMutationLedger();
for (const row of graphRows) recordGraphMutation(graph, "replacementGraphCreates", row);
for (const row of graphRows) { recordGraphMutation(graph, "replacementGraphCleanupDeletes", row); recordGraphAbsence(graph, "replacementGraphCleanupDeletes", row.id, 0); }
for (const row of priorRows) { recordGraphMutation(graph, "priorGraphRetirementDeletes", row); recordGraphAbsence(graph, "priorGraphRetirementDeletes", row.id, 0); }
const landing = validateGraphLanding(graph, { requirePriorRetirement: true });
eq(landing.creates, 8);
eq(landing.cleanupDeletes, 8);
eq(landing.priorDeletes, 8);
eq(landing.total, 24);
eq(landing.priorRetired, true);
const premature = createGraphMutationLedger();
throws(() => recordGraphMutation(premature, "priorGraphRetirementDeletes", priorRows[0]), "PRIOR_RETIREMENT_REFUSED");
for (const row of graphRows) recordGraphMutation(premature, "replacementGraphCreates", row);
throws(() => recordGraphMutation(premature, "replacementGraphCreates", { id: "ninth", table: "ninth" }), "GRAPH_CEILING_REFUSED");

const credentials = CREDENTIAL_CLASSES.map((name, index) => ({ class: name, disposition: index === 0 ? "revoked-not-required" : "rotated-and-verified", trainerPath: index < 2 }));
const credentialProjection = validateCredentialDispositions(credentials);
eq(credentialProjection.complete, true);
eq(credentialProjection.trainerPathClear, true);
eq(credentialProjection.blocked, []);
throws(() => validateCredentialDispositions(credentials.slice(0, 6)), "CREDENTIAL_DISPOSITIONS_REFUSED");
eq(validateTrainerGate({ local: true, pairedKeys: true, production: true, identities: true, credentialProjection }), true);
for (const missing of ["local", "pairedKeys", "production", "identities"]) throws(() => validateTrainerGate({ local: true, pairedKeys: true, production: true, identities: true, credentialProjection, [missing]: false }), "TRAINER_GATE_REFUSED");

const outcomes = [
  [{ pairedKeys: true, production: true, identities: true, trainer: true, credentialsComplete: true, clean: true, material: false }, RECOVERY_OUTCOMES[0]],
  [{ pairedKeys: true, production: true, identities: true, trainer: true, credentialsComplete: false, clean: true, material: false }, RECOVERY_OUTCOMES[1]],
  [{ pairedKeys: false, production: true, identities: true, trainer: true, credentialsComplete: false, clean: true, material: false }, RECOVERY_OUTCOMES[2]],
  [{ pairedKeys: true, production: true, identities: true, trainer: true, credentialsComplete: true, clean: false, material: false }, RECOVERY_OUTCOMES[3]],
  [{ pairedKeys: true, production: true, identities: true, trainer: true, credentialsComplete: true, clean: false, material: true }, RECOVERY_OUTCOMES[4]],
];
for (const [input, expected] of outcomes) eq(decideRecoveryOutcome(input), expected);
for (const code of ["PROTECTED_OUTPUT_REFUSED", "LEDGER_REFUSED", "LEGACY_ATTEMPT_IRREVERSIBLE", "KEY_LEDGER_REFUSED", "KEY_PROVENANCE_REFUSED", "GRAPH_LEDGER_REFUSED", "GRAPH_CEILING_REFUSED", "GRAPH_ABSENCE_REFUSED", "PRIOR_RETIREMENT_REFUSED", "CREDENTIAL_DISPOSITIONS_REFUSED", "TRAINER_GATE_REFUSED"]) eq(sanitizeFailure({ code }), code);
eq(sanitizeFailure(new Error("private detail")), "UNEXPECTED");
ok([KEY_PROVENANCE, GRAPH_BUCKETS, PHASES, RECOVERY_OUTCOMES].every(Object.isFrozen));
for (const row of recovery.snapshot().rows) eq(row.legacyAttempted, row.phase >= 3);
eq(credentials.length, CREDENTIAL_CLASSES.length);
ok(Object.isFrozen(landing));
assert.equal(checks, 110);
process.stdout.write(`Sprint 036M recovery checks passed (${checks})\n`);
