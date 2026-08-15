import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  ACCEPTED_ALIASES, ACCEPTED_BINDING_CLASSES, ACCEPTED_DEPLOYMENT, ACCEPTED_SOURCE,
  CREDENTIAL_CLASSES, CREDENTIAL_DISPOSITIONS, DIRECT_USER_DEPENDENCIES,
  EXPECTED_DEPENDENCIES, IDENTITY_DISPOSITIONS, INDIRECT_DEPENDENCIES, LANDING_STATES,
  PUBLIC_OR_EPHEMERAL_CLASSES, assertCredentialClass, assertPrivacySafe,
  createLandingLedger, decideCredentialDisposition, decideIdentityDisposition,
  deleteIdentityAuthLast, exactIdentityMatch, executeCredentialRotation,
  recordLanding, sanitizeFailure, validateDeliveryCeilings, validateDependencyManifest,
  validateMechanismRows, validateMigrationAuthorityFixture, validateMigrationAuthorityShape,
  validateProductionIdentity, MIGRATION_AUTHORITY_RAW_SHA256,
} from "./prelaunch-readiness-036K.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
async function throwsCode(fn, code) {
  assertions += 1;
  await assert.rejects(fn, (error) => error?.code === code);
}
function throwsSync(fn) {
  assertions += 1;
  assert.throws(fn);
}
function deepEqual(actual, expected, message) {
  assertions += 1;
  assert.deepEqual(actual, expected, message);
}
function mechanism(overrides = {}) {
  return {
    class: "CRON_SECRET", consumers: ["current", "old-a"], consumerClosureComplete: true,
    providerCreateSupported: true, protectedInstallSupported: true, runtimeProbeSupported: true,
    providerNativePredecessorOracle: true, couplingSafe: true, preRevokeCompensationProven: true,
    active: true, required: true, replacementVerified: true, predecessorInvalid: true,
    ...overrides,
  };
}
function allMechanisms() { return CREDENTIAL_CLASSES.map((name) => mechanism({ class: name })); }

// Credential mechanism and landing contract: 76 assertions.
equal(CREDENTIAL_CLASSES.length, 7);
equal(new Set(CREDENTIAL_CLASSES).size, 7);
equal(PUBLIC_OR_EPHEMERAL_CLASSES.length, 4);
equal(CREDENTIAL_DISPOSITIONS.length, 4);
for (const name of CREDENTIAL_CLASSES) equal(assertCredentialClass(name), name);
for (const name of PUBLIC_OR_EPHEMERAL_CLASSES) await throwsCode(async () => assertCredentialClass(name), "CLASS_REFUSED");
await throwsCode(async () => assertCredentialClass("UNKNOWN_SECRET"), "CLASS_REFUSED");
equal(validateMechanismRows(allMechanisms()).size, 7);
await throwsCode(async () => validateMechanismRows(allMechanisms().slice(1)), "MATRIX_REFUSED");
await throwsCode(async () => validateMechanismRows([...allMechanisms(), allMechanisms()[0]]), "MATRIX_REFUSED");
await throwsCode(async () => validateMechanismRows(allMechanisms().map((row, i) => i ? row : { ...row, consumers: [] })), "CONSUMER_CLOSURE_REFUSED");
await throwsCode(async () => validateMechanismRows(allMechanisms().map((row, i) => i ? row : { ...row, consumers: ["x", "x"] })), "CONSUMER_CLOSURE_REFUSED");
equal(decideCredentialDisposition(mechanism({ active: false, providerAbsent: true, runtimeConsumed: false })), "confirmed-inactive-or-absent");
equal(decideCredentialDisposition(mechanism({ required: false, providerRevoked: true, providerAbsent: true, failClosedRuntime: true })), "revoked-not-required");
equal(decideCredentialDisposition(mechanism()), "rotated-and-verified");
for (const key of ["consumerClosureComplete", "providerNativePredecessorOracle", "couplingSafe", "preRevokeCompensationProven", "providerCreateSupported", "protectedInstallSupported", "runtimeProbeSupported", "replacementVerified", "predecessorInvalid"]) {
  equal(decideCredentialDisposition(mechanism({ [key]: false })), "blocked-retained");
}
equal(decideCredentialDisposition(mechanism({ required: false, providerRevoked: true, providerAbsent: false, failClosedRuntime: true })), "blocked-retained");
equal(decideCredentialDisposition(mechanism({ required: false, providerRevoked: true, providerAbsent: true, failClosedRuntime: false })), "blocked-retained");

function rotationAdapter(overrides = {}) {
  const calls = [];
  return {
    calls,
    async createReplacement(name) { calls.push(`create:${name}`); return "opaque-replacement"; },
    async installCompleteAffectedSet(name) { calls.push(`install:${name}`); },
    async probeAllConsumers(name, replacement, consumers) { calls.push(`probe:${name}`); return consumers.map(() => true); },
    async revokePredecessor(name) { calls.push(`revoke:${name}`); },
    async readbackAfterRevocationAttempt(name) { calls.push(`readback:${name}`); return { predecessor: "revoked-and-invalid", replacement: "accepted-retained" }; },
    async compensateBeforeRevocation(name) { calls.push(`compensate:${name}`); return true; },
    ...overrides,
  };
}
const happyAdapter = rotationAdapter();
const rotation = await executeCredentialRotation({ row: mechanism(), adapter: happyAdapter });
equal(rotation.disposition, "rotated-and-verified");
equal(rotation.replacement, "accepted-retained");
equal(rotation.predecessor, "revoked-and-invalid");
equal(happyAdapter.calls.join("|"), "create:CRON_SECRET|install:CRON_SECRET|probe:CRON_SECRET|revoke:CRON_SECRET|readback:CRON_SECRET");
for (const key of ["consumerClosureComplete", "providerCreateSupported", "protectedInstallSupported", "runtimeProbeSupported", "providerNativePredecessorOracle", "couplingSafe", "preRevokeCompensationProven"]) {
  const expected = key === "consumerClosureComplete" ? "CONSUMER_CLOSURE_REFUSED" : ["couplingSafe", "preRevokeCompensationProven"].includes(key) ? "COUPLING_REFUSED" : "PROVIDER_ORACLE_REFUSED";
  await throwsCode(() => executeCredentialRotation({ row: mechanism({ [key]: false }), adapter: rotationAdapter() }), expected);
}
const probeFail = rotationAdapter({ async probeAllConsumers() { this.calls.push("probe"); return [true, false]; } });
for (const name of CREDENTIAL_CLASSES) check(validateMechanismRows(allMechanisms()).has(name), `mechanism row present: ${name}`);
for (const disposition of ["rotated-and-verified", "revoked-not-required", "confirmed-inactive-or-absent", "blocked-retained"]) check(CREDENTIAL_DISPOSITIONS.includes(disposition), disposition);
for (const disposition of ["retained-real-authorized", "deleted-obsolete-clean", "unresolved-retained-blocking"]) check(IDENTITY_DISPOSITIONS.includes(disposition), disposition);
check(Object.values(createLandingLedger().snapshot()).every((row) => Object.values(row).every((value) => value === "not-started")), "landing ledger begins entirely not-started");
await throwsCode(() => executeCredentialRotation({ row: mechanism(), adapter: probeFail }), "REPLACEMENT_PROBE_FAILED");
check(probeFail.calls.some((call) => call.startsWith("compensate")));
const compensationFail = rotationAdapter({ async probeAllConsumers() { return [false]; }, async compensateBeforeRevocation() { return false; } });
await throwsCode(() => executeCredentialRotation({ row: mechanism(), adapter: compensationFail }), "PRE_REVOKE_COMPENSATION_FAILED");
const oracleFail = rotationAdapter({ async readbackAfterRevocationAttempt() { return { predecessor: "unknown", replacement: "accepted-retained" }; } });
await throwsCode(() => executeCredentialRotation({ row: mechanism(), adapter: oracleFail }), "POST_REVOKE_UNSAFE");
check(!oracleFail.calls.some((call) => call.startsWith("compensate")), "never compensate after a revocation attempt");

const mutateThenThrow = rotationAdapter({ async revokePredecessor() { this.calls.push("revoke-mutated"); throw new Error("provider transport"); } });
const mutateThenThrowResult = await executeCredentialRotation({ row: mechanism(), adapter: mutateThenThrow });
equal(mutateThenThrowResult.disposition, "rotated-and-verified");
equal(mutateThenThrowResult.predecessor, "revoked-and-invalid");
check(!mutateThenThrow.calls.some((call) => call.startsWith("compensate")));

const attemptedCases = [
  rotationAdapter({ async revokePredecessor() { this.calls.push("revoke-mutated"); throw new Error("provider transport"); }, async readbackAfterRevocationAttempt() { return { predecessor: "unknown", replacement: "accepted-retained" }; } }),
  rotationAdapter({ async revokePredecessor() { this.calls.push("revoke-timeout"); throw new Error("timeout"); }, async readbackAfterRevocationAttempt() { return { predecessor: "unknown", replacement: "unknown" }; } }),
  rotationAdapter({ async revokePredecessor() { this.calls.push("revoke-mutated"); throw new Error("provider transport"); }, async readbackAfterRevocationAttempt() { return { predecessor: "accepted-retained", replacement: "accepted-retained" }; } }),
  rotationAdapter({ async readbackAfterRevocationAttempt() { return { predecessor: "unknown", replacement: "accepted-retained" }; } }),
  rotationAdapter({ async readbackAfterRevocationAttempt() { return { predecessor: "revoked-and-invalid", replacement: "removed" }; } }),
  rotationAdapter({ async readbackAfterRevocationAttempt() { return { predecessor: "revoked-and-invalid", replacement: "unknown" }; } }),
  rotationAdapter({ async readbackAfterRevocationAttempt() { throw new Error("readback unavailable"); } }),
];
for (const attempted of attemptedCases) {
  await throwsCode(() => executeCredentialRotation({ row: mechanism(), adapter: attempted }), "POST_REVOKE_UNSAFE");
  check(!attempted.calls.some((call) => call.startsWith("compensate")), "attempted revoke must never enter pre-revoke compensation");
}
equal(attemptedCases.length, 7);

equal(LANDING_STATES.length, 7);
const landingRow = (phase, overrides = {}) => ({
  replacementBindings: "accepted-retained",
  predecessor: phase >= 3 ? "revoked-and-invalid" : "accepted-retained",
  candidateAliases: "accepted-retained",
  identityApplicationStorageSessionFixture: "not-started",
  ...overrides,
});
function fillLandingThrough(handle, finalPhase) {
  for (let phase = 0; phase <= finalPhase; phase += 1) recordLanding(handle, phase, landingRow(phase));
  return handle;
}

const ledger = createLandingLedger();
equal(Object.keys(ledger).join("|"), "snapshot");
check(Object.isFrozen(ledger));
check(Object.isFrozen(ledger.snapshot));
const initialSnapshot = ledger.snapshot();
check(Object.keys(initialSnapshot).length === 8 && Object.values(initialSnapshot).every((row) => Object.values(row).every((value) => value === "not-started")));
check(Object.isFrozen(initialSnapshot) && Object.values(initialSnapshot).every(Object.isFrozen));
const freshInitialSnapshot = ledger.snapshot();
check(freshInitialSnapshot !== initialSnapshot && freshInitialSnapshot["0"] !== initialSnapshot["0"]);
for (let phase = 0; phase < 8; phase += 1) {
  const snapshot = recordLanding(ledger, phase, landingRow(phase));
  equal(snapshot[String(phase)].predecessor, phase >= 3 ? "revoked-and-invalid" : "accepted-retained");
}

for (let phase = 3; phase <= 7; phase += 1) {
  for (const predecessor of LANDING_STATES.filter((state) => state !== "revoked-and-invalid")) {
    const alternative = createLandingLedger();
    if (phase > 0) fillLandingThrough(alternative, phase - 1);
    await throwsCode(async () => recordLanding(alternative, phase, landingRow(phase, { predecessor })), "LANDING_REFUSED");
  }
}
await throwsCode(async () => recordLanding(createLandingLedger(), 0, landingRow(0, { replacementBindings: "invalid" })), "LANDING_REFUSED");
await throwsCode(async () => recordLanding(createLandingLedger(), 9, landingRow(7)), "LANDING_REFUSED");

await throwsCode(async () => recordLanding(createLandingLedger(), 1, landingRow(1)), "LANDING_REFUSED");
const duplicateLedger = createLandingLedger();
recordLanding(duplicateLedger, 0, landingRow(0));
await throwsCode(async () => recordLanding(duplicateLedger, 0, landingRow(0)), "LANDING_REFUSED");
const refillLedger = createLandingLedger();
recordLanding(refillLedger, 0, landingRow(0));
await throwsCode(async () => recordLanding(refillLedger, 0, landingRow(0, { candidateAliases: "residue" })), "LANDING_REFUSED");
const earlierLedger = fillLandingThrough(createLandingLedger(), 1);
await throwsCode(async () => recordLanding(earlierLedger, 0, landingRow(0)), "LANDING_REFUSED");
const completeLedger = fillLandingThrough(createLandingLedger(), 7);
await throwsCode(async () => recordLanding(completeLedger, 4, landingRow(4)), "LANDING_REFUSED");

const opaqueLedger = createLandingLedger();
const opaqueBefore = opaqueLedger.snapshot();
throwsSync(() => { opaqueLedger["0"] = landingRow(0); });
deepEqual(opaqueLedger.snapshot(), opaqueBefore);
throwsSync(() => { delete opaqueLedger.snapshot; });
deepEqual(opaqueLedger.snapshot(), opaqueBefore);
throwsSync(() => { opaqueLedger.snapshot = () => ({}); });
deepEqual(opaqueLedger.snapshot(), opaqueBefore);
const mutableAttempt = opaqueLedger.snapshot();
throwsSync(() => { mutableAttempt["0"].predecessor = "revoked-and-invalid"; });
deepEqual(opaqueLedger.snapshot(), opaqueBefore);
const poison = landingRow(0);
Object.defineProperty(poison, "predecessor", { enumerable: true, get() { throw new Error("clone getter refused"); } });
await throwsCode(async () => recordLanding(opaqueLedger, 0, poison), "LANDING_REFUSED");
deepEqual(opaqueLedger.snapshot(), opaqueBefore);
equal(recordLanding(opaqueLedger, 0, landingRow(0))["0"].predecessor, "accepted-retained");
equal(sanitizeFailure(new Error("private detail")), "UNEXPECTED");
equal(sanitizeFailure(Object.assign(new Error(), { code: "PROVIDER_ORACLE_REFUSED" })), "PROVIDER_ORACLE_REFUSED");

// Identity manifest and session/Auth-last contract: 60 assertions.
equal(DIRECT_USER_DEPENDENCIES.length, 31);
equal(INDIRECT_DEPENDENCIES.length, 19);
equal(EXPECTED_DEPENDENCIES.length, 50);
equal(new Set(EXPECTED_DEPENDENCIES).size, 50);
for (const key of [
  "member_profiles.user_id", "user_membership_levels.user_id", "orders.user_id",
  "biochemistry_tests.created_by_user_id", "biochemistry_test_uploads.uploaded_by_user_id",
  "evidence_upload_attempts.user_id", "evidence_holds.owner_user_id",
  "evidence_audit_events.actor_user_id", "user_trend_view_preferences.user_id",
  "trainers.member_profile_id", "owners.member_profile_id", "horse_assignments.trainer_id",
  "horse_assignments.owner_id", "biochemistry_test_uploads.version-lineage",
  "storage.objects.bucket-object-owner",
]) check(EXPECTED_DEPENDENCIES.includes(key), key);
const canonicalAuthorityPath = resolve("scripts/prelaunch-migration-authority-036K.json");
const canonicalAuthority = JSON.parse(readFileSync(canonicalAuthorityPath, "utf8"));
const authority = validateMigrationAuthorityFixture();
equal(authority.rawHash, MIGRATION_AUTHORITY_RAW_SHA256);
equal(authority.names.length, 25);
equal(authority.names[0], "0001_initial_schema.sql");
equal(authority.names.at(-1), "0025_user_trend_view_preferences.sql");
equal(authority.dependencies.length, 50);
equal(new Set(authority.dependencies).size, 50);
equal(validateMigrationAuthorityShape(canonicalAuthority).names.length, 25);
const traversalAuthority = structuredClone(canonicalAuthority);
traversalAuthority.migrations[0].name = "../0001_initial_schema.sql";
await throwsCode(async () => validateMigrationAuthorityShape(traversalAuthority), "DEPENDENCY_MANIFEST_REFUSED");
const substitutionAuthority = structuredClone(canonicalAuthority);
substitutionAuthority.migrations[0].dependencyKeys[0] = "plausible.same-count.substitution";
await throwsCode(async () => validateMigrationAuthorityShape(substitutionAuthority), "DEPENDENCY_MANIFEST_REFUSED");

const manifestRows = EXPECTED_DEPENDENCIES.map((key) => ({ key, count: 0, ownership: "owned" }));
const manifest = validateDependencyManifest({ rows: manifestRows });
equal(manifest.complete, true);
equal(manifest.blocking, false);
equal(manifest.total, 50);
await throwsCode(async () => validateDependencyManifest({ rows: manifestRows.slice(1) }), "DEPENDENCY_MANIFEST_REFUSED");
await throwsCode(async () => validateDependencyManifest({ rows: [...manifestRows, { ...manifestRows[0] }] }), "DEPENDENCY_MANIFEST_REFUSED");
const nonzero = manifestRows.map((row, i) => i ? row : { ...row, count: 1 });
equal(validateDependencyManifest({ rows: nonzero }).blocking, true);
const nonowned = manifestRows.map((row, i) => i ? row : { ...row, ownership: "non-owned" });
equal(validateDependencyManifest({ rows: nonowned }).blocking, true);
const unsupported = manifestRows.map((row, i) => i ? row : { ...row, ownership: "unsupported" });
equal(validateDependencyManifest({ rows: unsupported }).blocking, true);

const fixtureRoots = [];
function migrationFixture() {
  const root = mkdtempSync(join(tmpdir(), "036k-migrations-"));
  fixtureRoots.push(root);
  mkdirSync(join(root, "scripts"), { recursive: true });
  mkdirSync(join(root, "supabase"), { recursive: true });
  cpSync(resolve("supabase/migrations"), join(root, "supabase/migrations"), { recursive: true });
  cpSync(canonicalAuthorityPath, join(root, "scripts/prelaunch-migration-authority-036K.json"));
  return root;
}
try {
  const missing = migrationFixture();
  unlinkSync(join(missing, "supabase/migrations", authority.names[0]));
  await throwsCode(async () => validateMigrationAuthorityFixture(missing), "DEPENDENCY_MANIFEST_REFUSED");

  const extra = migrationFixture();
  writeFileSync(join(extra, "supabase/migrations/0026_unlisted.sql"), "-- extra\n");
  await throwsCode(async () => validateMigrationAuthorityFixture(extra), "DEPENDENCY_MANIFEST_REFUSED");

  const changed = migrationFixture();
  writeFileSync(join(changed, "supabase/migrations", authority.names[0]), "-- changed\n", { flag: "a" });
  await throwsCode(async () => validateMigrationAuthorityFixture(changed), "DEPENDENCY_MANIFEST_REFUSED");

  const renamed = migrationFixture();
  renameSync(join(renamed, "supabase/migrations", authority.names[0]), join(renamed, "supabase/migrations/0001_renamed.sql"));
  await throwsCode(async () => validateMigrationAuthorityFixture(renamed), "DEPENDENCY_MANIFEST_REFUSED");

  const reordered = migrationFixture();
  const reorderedManifest = structuredClone(canonicalAuthority);
  [reorderedManifest.migrations[0], reorderedManifest.migrations[1]] = [reorderedManifest.migrations[1], reorderedManifest.migrations[0]];
  writeFileSync(join(reordered, "scripts/prelaunch-migration-authority-036K.json"), JSON.stringify(reorderedManifest, null, 2) + "\n");
  await throwsCode(async () => validateMigrationAuthorityFixture(reordered), "DEPENDENCY_MANIFEST_REFUSED");

  const coordinated = migrationFixture();
  const coordinatedManifest = structuredClone(canonicalAuthority);
  const originalPath = join(coordinated, "supabase/migrations", authority.names[0]);
  const coordinatedName = "0001_coordinated.sql";
  const coordinatedPath = join(coordinated, "supabase/migrations", coordinatedName);
  renameSync(originalPath, coordinatedPath);
  writeFileSync(coordinatedPath, "-- coordinated\n", { flag: "a" });
  coordinatedManifest.migrations[0].name = coordinatedName;
  coordinatedManifest.migrations[0].sha256 = createHash("sha256").update(readFileSync(coordinatedPath)).digest("hex");
  writeFileSync(join(coordinated, "scripts/prelaunch-migration-authority-036K.json"), JSON.stringify(coordinatedManifest, null, 2) + "\n");
  await throwsCode(async () => validateMigrationAuthorityFixture(coordinated), "DEPENDENCY_MANIFEST_REFUSED");

  const callerHash = migrationFixture();
  writeFileSync(join(callerHash, "supabase/migrations", authority.names[0]), "-- caller coordinated\n", { flag: "a" });
  await throwsCode(async () => validateDependencyManifest({ rows: manifestRows, migrationRoot: callerHash, migrationHash: "a".repeat(64), expectedMigrationHash: "a".repeat(64) }), "DEPENDENCY_MANIFEST_REFUSED");
} finally {
  for (const root of fixtureRoots) rmSync(root, { recursive: true, force: true });
}
const candidate = { authId: "auth-exact", emailHash: "a".repeat(64) };
equal(exactIdentityMatch({ expectedAuthId: candidate.authId, expectedEmailHash: candidate.emailHash, candidates: [candidate] }), candidate);
await throwsCode(async () => exactIdentityMatch({ expectedAuthId: candidate.authId, expectedEmailHash: candidate.emailHash, candidates: [] }), "IDENTITY_MATCH_REFUSED");
await throwsCode(async () => exactIdentityMatch({ expectedAuthId: candidate.authId, expectedEmailHash: candidate.emailHash, candidates: [candidate, { ...candidate }] }), "IDENTITY_MATCH_REFUSED");
await throwsCode(async () => exactIdentityMatch({ expectedAuthId: candidate.authId, expectedEmailHash: candidate.emailHash, candidates: [candidate, { authId: candidate.authId, emailHash: "b".repeat(64) }] }), "IDENTITY_MATCH_REFUSED");
equal(IDENTITY_DISPOSITIONS.length, 3);
equal(decideIdentityDisposition({ ownerDecision: "retain-real", manifest, sessionRevocationSupported: false }), "retained-real-authorized");
equal(decideIdentityDisposition({ ownerDecision: "delete-obsolete", manifest, sessionRevocationSupported: true }), "deleted-obsolete-clean");
equal(decideIdentityDisposition({ ownerDecision: "delete-obsolete", manifest, sessionRevocationSupported: false }), "unresolved-retained-blocking");
equal(decideIdentityDisposition({ ownerDecision: "delete-obsolete", manifest: { complete: true, blocking: true }, sessionRevocationSupported: true }), "unresolved-retained-blocking");
equal(decideIdentityDisposition({ ownerDecision: "unknown", manifest, sessionRevocationSupported: true }), "unresolved-retained-blocking");

function identityAdapter(overrides = {}) {
  const calls = [];
  return {
    calls,
    async globalSignOut() { calls.push("global-signout"); return true; },
    async sessionOrRefreshStillUsable() { calls.push("reuse-check"); return false; },
    async deleteAuthById() { calls.push("auth-delete"); return true; },
    async getAuthById() { calls.push("absence-check"); return null; },
    ...overrides,
  };
}
const exactSession = { authId: "auth-exact", jwt: "opaque-jwt" };
const ia = identityAdapter();
const deleted = await deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession, manifest, adapter: ia });
equal(deleted.session, "revoked-and-invalid");
equal(deleted.auth, "removed");
equal(deleted.terminalAuthMutations, 1);
equal(ia.calls.join("|"), "global-signout|reuse-check|auth-delete|absence-check");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession: null, manifest, adapter: identityAdapter() }), "SESSION_REVOCATION_UNSUPPORTED");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession: { ...exactSession, authId: "other" }, manifest, adapter: identityAdapter() }), "SESSION_REVOCATION_UNSUPPORTED");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession, manifest: { complete: true, blocking: true }, adapter: identityAdapter() }), "IDENTITY_DEPENDENCY_BLOCKING");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession, manifest, adapter: identityAdapter({ async globalSignOut() { return false; } }) }), "SESSION_REVOCATION_UNSUPPORTED");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession, manifest, adapter: identityAdapter({ async sessionOrRefreshStillUsable() { return true; } }) }), "SESSION_REUSE_NOT_DENIED");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession, manifest, adapter: identityAdapter({ async deleteAuthById() { return false; } }) }), "AUTH_DELETE_REFUSED");
await throwsCode(() => deleteIdentityAuthLast({ exactAuthId: "auth-exact", exactSession, manifest, adapter: identityAdapter({ async getAuthById() { return {}; } }) }), "AUTH_ABSENCE_REFUSED");

// Delivery and cleanup contract: 44 assertions.
const delivery = { message: 1, resend: 0, mailboxAutomation: 0, generatedLink: 0, adminSubstitute: 0, verification: 1, password: 0, serviceRoleSignIn: 0 };
equal(validateDeliveryCeilings(delivery), true);
for (const [key, value, code] of [
  ["message", 0, "MESSAGE_CEILING_REFUSED"], ["message", 2, "MESSAGE_CEILING_REFUSED"],
  ["resend", 1, "MESSAGE_CEILING_REFUSED"], ["mailboxAutomation", 1, "MESSAGE_CEILING_REFUSED"],
  ["generatedLink", 1, "MESSAGE_CEILING_REFUSED"], ["adminSubstitute", 1, "MESSAGE_CEILING_REFUSED"],
  ["verification", 0, "VERIFICATION_CEILING_REFUSED"], ["verification", 2, "VERIFICATION_CEILING_REFUSED"],
  ["password", 1, "SUBSTITUTE_AUTH_REFUSED"], ["serviceRoleSignIn", 1, "SUBSTITUTE_AUTH_REFUSED"],
]) await throwsCode(async () => validateDeliveryCeilings({ ...delivery, [key]: value }), code);
equal(validateProductionIdentity({ source: ACCEPTED_SOURCE, deployment: ACCEPTED_DEPLOYMENT, aliases: [...ACCEPTED_ALIASES], bindingClasses: [...ACCEPTED_BINDING_CLASSES] }), true);
await throwsCode(async () => validateProductionIdentity({ source: "wrong", deployment: ACCEPTED_DEPLOYMENT, aliases: [...ACCEPTED_ALIASES], bindingClasses: [...ACCEPTED_BINDING_CLASSES] }), "PRODUCTION_IDENTITY_REFUSED");
await throwsCode(async () => validateProductionIdentity({ source: ACCEPTED_SOURCE, deployment: "wrong", aliases: [...ACCEPTED_ALIASES], bindingClasses: [...ACCEPTED_BINDING_CLASSES] }), "PRODUCTION_IDENTITY_REFUSED");
for (const aliases of [ACCEPTED_ALIASES.slice(1), [...ACCEPTED_ALIASES, ACCEPTED_ALIASES[0]], ACCEPTED_ALIASES.map((x, i) => i ? x : "wrong")]) {
  await throwsCode(async () => validateProductionIdentity({ source: ACCEPTED_SOURCE, deployment: ACCEPTED_DEPLOYMENT, aliases, bindingClasses: [...ACCEPTED_BINDING_CLASSES] }), "PRODUCTION_IDENTITY_REFUSED");
}
for (const bindingClasses of [ACCEPTED_BINDING_CLASSES.slice(1), [...ACCEPTED_BINDING_CLASSES, ACCEPTED_BINDING_CLASSES[0]], ["wrong", ...ACCEPTED_BINDING_CLASSES.slice(1)]]) {
  await throwsCode(async () => validateProductionIdentity({ source: ACCEPTED_SOURCE, deployment: ACCEPTED_DEPLOYMENT, aliases: [...ACCEPTED_ALIASES], bindingClasses }), "PRODUCTION_IDENTITY_REFUSED");
}
for (const value of [
  { safe: true, route: "portal" }, { class: "credential", state: "absent" }, { identity: "ordinal-1" },
  { durationSeconds: 15 }, { viewport: "supported-phone" }, { wrongHorseDenied: true }, { signOut: true },
  { anonymousDenied: true }, { fixture: "synthetic-036K" }, { residue: 0 }, { externalMutations: 0 },
]) equal(assertPrivacySafe(value), value);
for (const value of [
  { address: "person@example.com" }, { token: "eyJabcdefghijklm.payload.signature" },
  { key: "sk_live_123456789" }, { webhook: "whsec_123456789" }, { code: "123456" },
  { key: "AKIA1234567890123456" }, { key: "ghp_abcdefgh" }, { key: "-----BEGIN PRIVATE KEY-----" },
]) await throwsCode(async () => assertPrivacySafe(value), "PRIVACY_REFUSED");
for (const phase of [0, 1, 2, 3, 4, 5]) {
  const landing = createLandingLedger();
  for (let step = 0; step <= phase; step += 1) {
    recordLanding(landing, step, landingRow(step, { identityApplicationStorageSessionFixture: step === phase ? "removed" : "not-started" }));
  }
  equal(landing.snapshot()[String(phase)].identityApplicationStorageSessionFixture, "removed");
}
equal(ACCEPTED_ALIASES.length, 5);
equal(ACCEPTED_BINDING_CLASSES.length, 3);

assert.equal(assertions, 260, `expected exactly 260 readiness assertions, received ${assertions}`);
console.log(`Sprint 036K prelaunch readiness assertions passed: ${assertions}/260.`);
