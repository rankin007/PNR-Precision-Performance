import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const MIGRATION_AUTHORITY_RAW_SHA256 = "d8612add63a79cacd08e13ef618e59d372089e59770534275cdffaf598b38254";

export const CREDENTIAL_CLASSES = Object.freeze([
  "SUPABASE_SERVICE_ROLE_KEY",
  "CRON_SECRET",
  "ENQUIRY_ABUSE_HMAC_SECRET",
  "PUBLIC_ENQUIRY_SMTP_PASS",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RAILWAY_API_TOKEN",
]);

export const PUBLIC_OR_EPHEMERAL_CLASSES = Object.freeze([
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "VERCEL_OIDC_TOKEN",
]);

export const CREDENTIAL_DISPOSITIONS = Object.freeze([
  "rotated-and-verified",
  "revoked-not-required",
  "confirmed-inactive-or-absent",
  "blocked-retained",
]);

export const IDENTITY_DISPOSITIONS = Object.freeze([
  "retained-real-authorized",
  "deleted-obsolete-clean",
  "unresolved-retained-blocking",
]);

export const LANDING_STATES = Object.freeze([
  "not-started",
  "accepted-retained",
  "compensated",
  "removed",
  "revoked-and-invalid",
  "unchanged-blocking",
  "residue",
]);

export const ACCEPTED_SOURCE = "bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570";
export const ACCEPTED_DEPLOYMENT = "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf";
export const ACCEPTED_ALIASES = Object.freeze([
  "precisionperformance.com.au",
  "www.precisionperformance.com.au",
  "pnr-precision-performance.vercel.app",
  "pnr-precision-performance-rankin007s-projects.vercel.app",
  "pnr-precision-performance-rankin007-rankin007s-projects.vercel.app",
]);
export const ACCEPTED_BINDING_CLASSES = Object.freeze([
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
]);

export const DIRECT_USER_DEPENDENCIES = Object.freeze([
  "member_profiles.user_id",
  "user_membership_levels.user_id",
  "daily_records.recorded_by_user_id",
  "temperature_logs.created_by_user_id",
  "weight_logs.created_by_user_id",
  "water_intake_logs.created_by_user_id",
  "feeding_logs.created_by_user_id",
  "track_sessions.created_by_user_id",
  "orders.user_id",
  "subscriptions.user_id",
  "invoices.user_id",
  "payments.user_id",
  "audit_logs.actor_user_id",
  "biochemistry_horse_access_assignments.nominated_by_user_id",
  "biochemistry_tests.created_by_user_id",
  "biochemistry_tests.updated_by_user_id",
  "biochemistry_tests.deleted_by_user_id",
  "biochemistry_test_uploads.uploaded_by_user_id",
  "biochemistry_test_uploads.deleted_by_user_id",
  "biochemistry_test_notes.created_by_user_id",
  "biochemistry_test_notes.updated_by_user_id",
  "biochemistry_test_notes.deleted_by_user_id",
  "stable_role_assignments.assigned_by_user_id",
  "horses.deleted_by_user_id",
  "horse_ownership_history.changed_by_user_id",
  "evidence_csv_registry.approved_by_user_id",
  "evidence_upload_attempts.user_id",
  "evidence_holds.owner_user_id",
  "evidence_holds.released_by_user_id",
  "evidence_audit_events.actor_user_id",
  "user_trend_view_preferences.user_id",
]);

export const INDIRECT_DEPENDENCIES = Object.freeze([
  "trainers.member_profile_id",
  "owners.member_profile_id",
  "stable_staff_assignments.member_profile_id",
  "stable_role_assignments.member_profile_id",
  "biochemistry_horse_access_assignments.member_profile_id",
  "horse_assignments.trainer_id",
  "horse_assignments.owner_id",
  "horse_assignments.stable_id",
  "dependent-horse-operational-records",
  "dependent-stable-operational-records",
  "horse_ownership_history",
  "biochemistry_tests",
  "biochemistry_test_notes",
  "biochemistry_test_uploads",
  "biochemistry_test_uploads.version-lineage",
  "evidence_upload_attempts",
  "evidence_holds",
  "evidence_audit_events",
  "storage.objects.bucket-object-owner",
]);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

export function validateMigrationAuthorityShape(authority) {
  if (!authority || authority.version !== 1 || !Array.isArray(authority.migrations) || authority.migrations.length !== 25) fail("DEPENDENCY_MANIFEST_REFUSED");
  const names = [];
  const dependencies = [];
  for (let index = 0; index < authority.migrations.length; index += 1) {
    const entry = authority.migrations[index];
    const expectedPrefix = String(index + 1).padStart(4, "0") + "_";
    if (!entry || Object.keys(entry).sort().join("|") !== "dependencyKeys|name|sha256" || typeof entry.name !== "string" || isAbsolute(entry.name) || basename(entry.name) !== entry.name || entry.name.includes("..") || !entry.name.startsWith(expectedPrefix) || !/^[0-9]{4}_[a-z0-9_]+\.sql$/.test(entry.name) || !/^[a-f0-9]{64}$/.test(entry.sha256 || "") || !Array.isArray(entry.dependencyKeys)) fail("DEPENDENCY_MANIFEST_REFUSED");
    if (entry.dependencyKeys.some((key) => typeof key !== "string" || !/^[a-z0-9_.-]+$/.test(key))) fail("DEPENDENCY_MANIFEST_REFUSED");
    names.push(entry.name);
    dependencies.push(...entry.dependencyKeys);
  }
  if (new Set(names).size !== 25 || dependencies.length !== 50 || new Set(dependencies).size !== 50) fail("DEPENDENCY_MANIFEST_REFUSED");
  const expectedStructural = [...DIRECT_USER_DEPENDENCIES, ...INDIRECT_DEPENDENCIES];
  if (expectedStructural.some((key) => !dependencies.includes(key)) || dependencies.some((key) => !expectedStructural.includes(key))) fail("DEPENDENCY_MANIFEST_REFUSED");
  return { names, dependencies };
}

export function validateMigrationAuthorityFixture(root = REPO_ROOT) {
  const manifestPath = join(root, "scripts", "prelaunch-migration-authority-036K.json");
  const raw = readFileSync(manifestPath);
  if (sha256(raw) !== MIGRATION_AUTHORITY_RAW_SHA256) fail("DEPENDENCY_MANIFEST_REFUSED");
  let authority;
  try {
    authority = JSON.parse(raw.toString("utf8"));
  } catch {
    fail("DEPENDENCY_MANIFEST_REFUSED");
  }
  const { names, dependencies } = validateMigrationAuthorityShape(authority);
  const migrationDirectory = join(root, "supabase", "migrations");
  const actualNames = readdirSync(migrationDirectory, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name).sort();
  if (actualNames.length !== names.length || names.some((name, index) => actualNames[index] !== name)) fail("DEPENDENCY_MANIFEST_REFUSED");
  for (const entry of authority.migrations) {
    const path = resolve(migrationDirectory, entry.name);
    if (dirname(path) !== resolve(migrationDirectory) || sha256(readFileSync(path)) !== entry.sha256) fail("DEPENDENCY_MANIFEST_REFUSED");
  }
  return Object.freeze({ names: Object.freeze([...names]), dependencies: Object.freeze([...dependencies]), rawHash: MIGRATION_AUTHORITY_RAW_SHA256 });
}

const CANONICAL_MIGRATION_AUTHORITY = validateMigrationAuthorityFixture();
export const EXPECTED_DEPENDENCIES = CANONICAL_MIGRATION_AUTHORITY.dependencies;

const SAFE_FAILURES = new Set([
  "CLASS_REFUSED", "MATRIX_REFUSED", "CONSUMER_CLOSURE_REFUSED",
  "PROVIDER_ORACLE_REFUSED", "COUPLING_REFUSED", "REPLACEMENT_PROBE_FAILED",
  "PRE_REVOKE_COMPENSATION_FAILED", "POST_REVOKE_UNSAFE", "DEPENDENCY_MANIFEST_REFUSED",
  "IDENTITY_MATCH_REFUSED", "IDENTITY_DEPENDENCY_BLOCKING", "SESSION_REVOCATION_UNSUPPORTED",
  "SESSION_REUSE_NOT_DENIED", "AUTH_DELETE_REFUSED", "AUTH_ABSENCE_REFUSED",
  "MESSAGE_CEILING_REFUSED", "VERIFICATION_CEILING_REFUSED", "SUBSTITUTE_AUTH_REFUSED",
  "PRODUCTION_IDENTITY_REFUSED", "LANDING_REFUSED", "PRIVACY_REFUSED", "UNEXPECTED",
]);

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

export function sanitizeFailure(error) {
  const code = error?.code || error?.message;
  return SAFE_FAILURES.has(code) ? code : "UNEXPECTED";
}


export function assertCredentialClass(name) {
  if (!CREDENTIAL_CLASSES.includes(name)) fail("CLASS_REFUSED");
  return name;
}

export function validateMechanismRows(rows) {
  if (!Array.isArray(rows) || rows.length !== CREDENTIAL_CLASSES.length) fail("MATRIX_REFUSED");
  const byClass = new Map();
  for (const row of rows) {
    if (!row || byClass.has(row.class) || !CREDENTIAL_CLASSES.includes(row.class)) fail("MATRIX_REFUSED");
    if (!Array.isArray(row.consumers) || row.consumers.length < 1 || new Set(row.consumers).size !== row.consumers.length) fail("CONSUMER_CLOSURE_REFUSED");
    for (const key of ["consumerClosureComplete", "providerCreateSupported", "protectedInstallSupported", "runtimeProbeSupported", "providerNativePredecessorOracle", "couplingSafe", "preRevokeCompensationProven"]) {
      if (typeof row[key] !== "boolean") fail("MATRIX_REFUSED");
    }
    byClass.set(row.class, structuredClone(row));
  }
  if (CREDENTIAL_CLASSES.some((name) => !byClass.has(name))) fail("MATRIX_REFUSED");
  return byClass;
}

export function decideCredentialDisposition(row) {
  assertCredentialClass(row?.class);
  if (row.active === false && row.providerAbsent === true && row.runtimeConsumed === false) return "confirmed-inactive-or-absent";
  const matrixReady = row.consumerClosureComplete && row.providerNativePredecessorOracle && row.couplingSafe && row.preRevokeCompensationProven;
  if (row.required === false && matrixReady && row.providerRevoked === true && row.providerAbsent === true && row.failClosedRuntime === true) return "revoked-not-required";
  if (row.required === true && matrixReady && row.providerCreateSupported && row.protectedInstallSupported && row.runtimeProbeSupported && row.replacementVerified && row.predecessorInvalid) return "rotated-and-verified";
  return "blocked-retained";
}

export async function executeCredentialRotation({ row, adapter }) {
  assertCredentialClass(row?.class);
  if (!row.consumerClosureComplete) fail("CONSUMER_CLOSURE_REFUSED");
  if (!row.providerCreateSupported || !row.protectedInstallSupported || !row.runtimeProbeSupported || !row.providerNativePredecessorOracle) fail("PROVIDER_ORACLE_REFUSED");
  if (!row.couplingSafe || !row.preRevokeCompensationProven) fail("COUPLING_REFUSED");
  let replacement = null;
  let installed = false;
  let revocationAttempted = false;
  try {
    replacement = await adapter.createReplacement(row.class);
    installed = true;
    await adapter.installCompleteAffectedSet(row.class, replacement);
    const probes = await adapter.probeAllConsumers(row.class, replacement, row.consumers);
    if (!probes || probes.length !== row.consumers.length || probes.some((value) => value !== true)) fail("REPLACEMENT_PROBE_FAILED");
    revocationAttempted = true;
    try {
      await adapter.revokePredecessor(row.class);
    } catch {
      // The provider may mutate before throwing; only independent readback can resolve the attempt.
    }
    let readback;
    try {
      readback = await adapter.readbackAfterRevocationAttempt(row.class, row.consumers);
    } catch {
      fail("POST_REVOKE_UNSAFE");
    }
    if (readback?.predecessor !== "revoked-and-invalid" || readback?.replacement !== "accepted-retained") fail("POST_REVOKE_UNSAFE");
    return { class: row.class, disposition: "rotated-and-verified", replacement: readback.replacement, predecessor: readback.predecessor };
  } catch (error) {
    if (revocationAttempted) fail("POST_REVOKE_UNSAFE");
    if (installed || replacement) {
      const compensated = await adapter.compensateBeforeRevocation(row.class, replacement);
      if (!compensated) fail("PRE_REVOKE_COMPENSATION_FAILED");
    }
    throw error;
  } finally {
    replacement = null;
  }
}

export function validateDependencyManifest({ rows, migrationRoot = REPO_ROOT }) {
  const expectedDependencies = validateMigrationAuthorityFixture(migrationRoot).dependencies;
  if (!Array.isArray(rows) || rows.length !== expectedDependencies.length) fail("DEPENDENCY_MANIFEST_REFUSED");
  const map = new Map();
  for (const row of rows) {
    if (!row || map.has(row.key) || !expectedDependencies.includes(row.key)) fail("DEPENDENCY_MANIFEST_REFUSED");
    if (!Number.isInteger(row.count) || row.count < 0 || !["owned", "non-owned", "unsupported"].includes(row.ownership)) fail("DEPENDENCY_MANIFEST_REFUSED");
    map.set(row.key, { count: row.count, ownership: row.ownership });
  }
  if (expectedDependencies.some((key) => !map.has(key))) fail("DEPENDENCY_MANIFEST_REFUSED");
  const blocking = [...map.values()].some((row) => row.count !== 0 || row.ownership !== "owned");
  return { complete: true, blocking, total: map.size };
}

export function exactIdentityMatch({ expectedAuthId, expectedEmailHash, candidates }) {
  const matches = (candidates || []).filter((item) => item?.authId === expectedAuthId && item?.emailHash === expectedEmailHash);
  if (matches.length !== 1 || candidates.some((item) => item !== matches[0] && (item?.authId === expectedAuthId || item?.emailHash === expectedEmailHash))) fail("IDENTITY_MATCH_REFUSED");
  return matches[0];
}

export function decideIdentityDisposition({ ownerDecision, manifest, sessionRevocationSupported }) {
  if (ownerDecision === "retain-real" && manifest.complete && !manifest.blocking) return "retained-real-authorized";
  if (ownerDecision === "delete-obsolete" && manifest.complete && !manifest.blocking && sessionRevocationSupported) return "deleted-obsolete-clean";
  return "unresolved-retained-blocking";
}

export async function deleteIdentityAuthLast({ exactAuthId, exactSession, manifest, adapter }) {
  if (!exactAuthId || exactSession?.authId !== exactAuthId || !exactSession.jwt) fail("SESSION_REVOCATION_UNSUPPORTED");
  if (!manifest?.complete || manifest.blocking) fail("IDENTITY_DEPENDENCY_BLOCKING");
  const revoked = await adapter.globalSignOut(exactSession.jwt);
  if (!revoked) fail("SESSION_REVOCATION_UNSUPPORTED");
  if (await adapter.sessionOrRefreshStillUsable(exactSession)) fail("SESSION_REUSE_NOT_DENIED");
  if (!(await adapter.deleteAuthById(exactAuthId))) fail("AUTH_DELETE_REFUSED");
  if (await adapter.getAuthById(exactAuthId)) fail("AUTH_ABSENCE_REFUSED");
  return { session: "revoked-and-invalid", auth: "removed", terminalAuthMutations: 1 };
}

export function validateDeliveryCeilings(counts) {
  if (counts.message !== 1 || counts.resend !== 0 || counts.mailboxAutomation !== 0 || counts.generatedLink !== 0 || counts.adminSubstitute !== 0) fail("MESSAGE_CEILING_REFUSED");
  if (counts.verification !== 1) fail("VERIFICATION_CEILING_REFUSED");
  if (counts.password !== 0 || counts.serviceRoleSignIn !== 0) fail("SUBSTITUTE_AUTH_REFUSED");
  return true;
}

export function validateProductionIdentity({ source, deployment, aliases, bindingClasses }) {
  if (source !== ACCEPTED_SOURCE || deployment !== ACCEPTED_DEPLOYMENT) fail("PRODUCTION_IDENTITY_REFUSED");
  const exact = (actual, expected) => Array.isArray(actual) && actual.length === expected.length && new Set(actual).size === actual.length && expected.every((value) => actual.includes(value));
  if (!exact(aliases, ACCEPTED_ALIASES) || !exact(bindingClasses, ACCEPTED_BINDING_CLASSES)) fail("PRODUCTION_IDENTITY_REFUSED");
  return true;
}

const LANDING_STATE = new WeakMap();
const LANDING_KEYS = "candidateAliases|identityApplicationStorageSessionFixture|predecessor|replacementBindings";

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value)) deepFreeze(nested);
    Object.freeze(value);
  }
  return value;
}

function initialLandingRows() {
  return Array.from({ length: 8 }, () => deepFreeze({
    replacementBindings: "not-started",
    predecessor: "not-started",
    candidateAliases: "not-started",
    identityApplicationStorageSessionFixture: "not-started",
  }));
}

export function readLandingLedger(handle) {
  const state = LANDING_STATE.get(handle);
  if (!state) fail("LANDING_REFUSED");
  return deepFreeze(Object.fromEntries(state.rows.map((row, phase) => [String(phase), structuredClone(row)])));
}

export function createLandingLedger() {
  let handle;
  const snapshot = Object.freeze(() => readLandingLedger(handle));
  handle = Object.freeze({ snapshot });
  LANDING_STATE.set(handle, { rows: Object.freeze(initialLandingRows()), nextPhase: 0 });
  return handle;
}

export function recordLanding(handle, phase, values) {
  const state = LANDING_STATE.get(handle);
  if (!state || !Number.isInteger(phase) || phase < 0 || phase > 7 || phase !== state.nextPhase || !values || Object.keys(values).sort().join("|") !== LANDING_KEYS) fail("LANDING_REFUSED");
  let proposed;
  try {
    proposed = structuredClone(values);
  } catch {
    fail("LANDING_REFUSED");
  }
  if (Object.keys(proposed).sort().join("|") !== LANDING_KEYS || Object.values(proposed).some((value) => !LANDING_STATES.includes(value))) fail("LANDING_REFUSED");
  if (phase < 3 && proposed.predecessor === "revoked-and-invalid") fail("LANDING_REFUSED");
  if (phase >= 3 && proposed.predecessor !== "revoked-and-invalid") fail("LANDING_REFUSED");
  const nextRows = state.rows.slice();
  nextRows[phase] = deepFreeze(proposed);
  LANDING_STATE.set(handle, { rows: Object.freeze(nextRows), nextPhase: phase + 1 });
  return handle.snapshot();
}

export function assertPrivacySafe(value) {
  const text = JSON.stringify(value);
  if (/@|eyJ[A-Za-z0-9_-]{10,}\.|sk_(?:live|test)_|whsec_|rk_live_|ghp_|github_pat_|AKIA|-----BEGIN .*PRIVATE KEY|\b\d{6}\b/i.test(text)) fail("PRIVACY_REFUSED");
  return value;
}
