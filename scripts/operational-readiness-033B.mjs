import crypto from "node:crypto";
import path from "node:path";

export const BUSINESS_OWNER = "Phillip Norman Rankin";
export const PLATFORM_OPERATOR = "Randell Rankin";
export const INCIDENT_ADDRESS = "equineprecisionperformance@hotmail.com";
export const MIGRATION_HEAD = "0025";
export const DATABASE_FORMAT = "pp-logical-db-v1";
export const STORAGE_FORMAT = "pp-storage-package-v1";
export const ENCRYPTION_ALGORITHM = "aes-256-gcm";
export const KEY_BYTES = 32;
export const IV_BYTES = 12;
export const LOCAL_RTO_CEILING_MS = 86_400_000;
export const STORAGE_CONTENT_TYPE = "application/octet-stream";
export const BUSINESS_UTC_OFFSET_MINUTES = 10 * 60;
export const BUSINESS_DAY_START_HOUR = 9;
export const BUSINESS_DAY_END_HOUR = 17;
export const STABLE_ALIASES = Object.freeze([
  "https://precisionperformance.com.au",
  "https://www.precisionperformance.com.au",
  "https://pnr-precision-performance.vercel.app",
  "https://pnr-precision-performance-rankin007s-projects.vercel.app",
  "https://pnr-precision-performance-rankin007-rankin007s-projects.vercel.app",
]);
export const PRODUCTION_BINDING_CLASSES = Object.freeze([
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
]);

export const INCIDENT_FLOW = Object.freeze([
  "contain",
  "assess",
  "notify-if-required",
  "review",
]);

export const SEVERITY_MATRIX = Object.freeze({
  P0: Object.freeze({
    classes: Object.freeze(["suspected-disclosure", "cross-stable-access", "credential-exposure", "destructive-integrity-loss"]),
    accountable: BUSINESS_OWNER,
    operator: PLATFORM_OPERATOR,
    response: "contain-immediately",
  }),
  P1: Object.freeze({
    classes: Object.freeze(["public-outage", "protected-route-failure", "material-public-claim-error", "release-wide-regression"]),
    accountable: BUSINESS_OWNER,
    operator: PLATFORM_OPERATOR,
    response: "assess-rollback-promptly",
  }),
  P2: Object.freeze({
    classes: Object.freeze(["degraded-route", "degraded-asset", "bounded-workflow-failure-with-safe-fallback"]),
    accountable: BUSINESS_OWNER,
    operator: PLATFORM_OPERATOR,
    response: "reproduce-and-schedule",
  }),
  P3: Object.freeze({
    classes: Object.freeze(["cosmetic-defect", "documentation-defect"]),
    accountable: BUSINESS_OWNER,
    operator: PLATFORM_OPERATOR,
    response: "record-and-schedule",
  }),
});

export const OPERATIONAL_CONTRACT = Object.freeze({
  ownerVersion: "033B-operational-ownership-v1",
  businessOwner: BUSINESS_OWNER,
  supportOwner: BUSINESS_OWNER,
  privacyOwner: BUSINESS_OWNER,
  incidentOwner: BUSINESS_OWNER,
  platformOperator: PLATFORM_OPERATOR,
  migrationOperator: PLATFORM_OPERATOR,
  releaseOperator: PLATFORM_OPERATOR,
  recoveryOperator: PLATFORM_OPERATOR,
  rollbackApprovers: Object.freeze([BUSINESS_OWNER, PLATFORM_OPERATOR]),
  restorationApprovers: Object.freeze([BUSINESS_OWNER, PLATFORM_OPERATOR]),
  privacyAddress: INCIDENT_ADDRESS,
  privacyRequestTargetCalendarDays: 30,
  urgentAcknowledgementBusinessHours: 4,
  privacyAssessmentHours: 24,
  containment: "immediate",
  incidentFlow: INCIDENT_FLOW,
  rpoHours: 24,
  rto: "one-business-day",
  cadence: Object.freeze(["quarterly", "before-first-sensitive-data-launch", "after-material-schema-or-storage-recovery-change"]),
  rollbackCompatibility: Object.freeze({ sourceRequired: true, aliases: STABLE_ALIASES, bindingClasses: PRODUCTION_BINDING_CLASSES }),
  databaseAndStorageSeparate: true,
  internalObjectivesOnly: true,
  providerDependent: true,
  providerNativeRestoreProven: false,
  productionRestoreProven: false,
  publicSla: false,
  legalAdvice: false,
});

const SUPPORT_FIELDS = Object.freeze([
  "route",
  "time",
  "browserDevice",
  "expectedBehavior",
  "actualBehavior",
  "reproducibility",
  "redactedArtifact",
]);

const FORBIDDEN_FIELD_PATTERN = /(password|passphrase|secret|token|cookie|authorization|credential|service.?role|raw.?data|clinical.?record|contact.?data|signed.?url|object.?path)/i;
const FORBIDDEN_VALUE_PATTERNS = Object.freeze([
  /\bbearer\s+\S+/i,
  /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/,
  /(?:password|passphrase|secret|token|api[_-]?key|service[_-]?role)\s*[:=]\s*\S+/i,
  /(?:[?&](?:token|signature|key|code)=|x-amz-signature=)/i,
  /(?:^|\s)(?:unredacted|private-contact|raw-record)\s*[:=]/i,
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /(?:^|\W)\+61[ ()-]*4\d{2}[ ()-]*\d{3}[ ()-]*\d{3}(?=$|\W)/,
  /\b(?:phone|mobile|telephone)\s*[:=]\s*[+()\d][+()\d -]{7,24}\b/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bAKIA[A-Z0-9]{16}\b/,
  /\bsk_live_\S+/,
  /\bghp_\S+/,
  /\bgithub_pat_\S+/,
  /\brk_live_\S+/,
]);

const containsForbiddenSupportValue = (value) => FORBIDDEN_VALUE_PATTERNS.some((pattern) => pattern.test(value));

export function validateSupportIntake(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) return false;
  const keys = Object.keys(record).sort();
  if (keys.some((key) => FORBIDDEN_FIELD_PATTERN.test(key))) return false;
  if (keys.length !== SUPPORT_FIELDS.length || !SUPPORT_FIELDS.every((field) => keys.includes(field))) return false;
  if (!SUPPORT_FIELDS.every((field) => typeof record[field] === "string" && record[field].trim().length > 0 && !containsForbiddenSupportValue(record[field]))) return false;
  return /^redacted:[a-z0-9][a-z0-9._-]*$/i.test(record.redactedArtifact);
}

export function createPrivacyRequestLedger({ requestClass, receivedAt, identityVerified, authorityVerified, decision = "pending" }) {
  if (!identityVerified || !authorityVerified) throw new Error("PRIVACY_REQUEST_VERIFICATION_REQUIRED");
  if (!new Set(["access", "correction"]).has(requestClass)) throw new Error("PRIVACY_REQUEST_CLASS_REFUSED");
  if (!new Set(["pending", "completed", "refused", "delayed"]).has(decision)) throw new Error("PRIVACY_REQUEST_DECISION_REFUSED");
  const received = new Date(receivedAt);
  if (Number.isNaN(received.valueOf())) throw new Error("PRIVACY_REQUEST_TIME_REFUSED");
  const target = new Date(received);
  target.setUTCDate(target.getUTCDate() + OPERATIONAL_CONTRACT.privacyRequestTargetCalendarDays);
  return Object.freeze({
    requestClass,
    receivedAt: received.toISOString(),
    targetBy: target.toISOString(),
    identityVerified: true,
    authorityVerified: true,
    decision,
    owner: BUSINESS_OWNER,
    explanationRequired: decision === "refused" || decision === "delayed",
  });
}

export function validateAccessCorrection({ mechanism, authenticated, authorised, widensPermission = false }) {
  return mechanism === "existing-admin-rls"
    && authenticated === true
    && authorised === true
    && widensPermission === false;
}

function hasExactUniqueSet(actual, expected) {
  return Array.isArray(actual)
    && actual.length === expected.length
    && new Set(actual).size === expected.length
    && expected.every((value) => actual.includes(value));
}

export function validateRollbackCompatibility({ sourceVerified, aliases, bindingClasses, approvers }) {
  const uniqueApprovers = new Set(approvers ?? []);
  return sourceVerified === true
    && hasExactUniqueSet(aliases, STABLE_ALIASES)
    && hasExactUniqueSet(bindingClasses, PRODUCTION_BINDING_CLASSES)
    && uniqueApprovers.size === 2
    && uniqueApprovers.has(BUSINESS_OWNER)
    && uniqueApprovers.has(PLATFORM_OPERATOR);
}

export function severityFor(issueClass) {
  const matches = Object.entries(SEVERITY_MATRIX).filter(([, value]) => value.classes.includes(issueClass));
  if (matches.length !== 1) throw new Error("INCIDENT_CLASS_UNMAPPED_OR_OVERLAPPING");
  return matches[0][0];
}

export function businessMillisecondsElapsed(startAt, endAt) {
  const start = new Date(startAt).valueOf();
  const end = new Date(endAt).valueOf();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return Number.NaN;
  const offset = BUSINESS_UTC_OFFSET_MINUTES * 60 * 1000;
  const localStartDay = Math.floor((start + offset) / 86_400_000);
  const localEndDay = Math.floor((end + offset) / 86_400_000);
  let elapsed = 0;
  for (let day = localStartDay; day <= localEndDay; day += 1) {
    const weekday = new Date(day * 86_400_000).getUTCDay();
    if (weekday === 0 || weekday === 6) continue;
    const windowStart = day * 86_400_000 - offset + BUSINESS_DAY_START_HOUR * 60 * 60 * 1000;
    const windowEnd = day * 86_400_000 - offset + BUSINESS_DAY_END_HOUR * 60 * 60 * 1000;
    elapsed += Math.max(0, Math.min(end, windowEnd) - Math.max(start, windowStart));
  }
  return elapsed;
}

export function validateIncidentTimeline({ detectedAt, containmentAt, acknowledgementAt, assessmentAt }) {
  const detected = new Date(detectedAt).valueOf();
  const contained = new Date(containmentAt).valueOf();
  const acknowledged = new Date(acknowledgementAt).valueOf();
  const assessed = new Date(assessmentAt).valueOf();
  if ([detected, contained, acknowledged, assessed].some(Number.isNaN)) return false;
  return contained === detected
    && acknowledged >= detected
    && assessed >= detected
    && businessMillisecondsElapsed(detected, acknowledged) <= 4 * 60 * 60 * 1000
    && assessed - detected <= 24 * 60 * 60 * 1000;
}

export function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

export function isSafeRelativeObjectPath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\\")) return false;
  if (path.posix.isAbsolute(value) || path.win32.isAbsolute(value)) return false;
  const parts = value.split("/");
  return parts.every((part) => part.length > 0 && part !== "." && part !== "..");
}

export function createSyntheticPackages() {
  const database = {
    format: DATABASE_FORMAT,
    migrationHead: MIGRATION_HEAD,
    tableOrder: ["stables", "horses", "tests"],
    counts: { stables: 1, horses: 1, tests: 1 },
    rows: {
      stables: [{ id: "synthetic-stable-001" }],
      horses: [{ id: "synthetic-horse-001", stableId: "synthetic-stable-001" }],
      tests: [{ id: "synthetic-test-001", horseId: "synthetic-horse-001" }],
    },
  };
  const payloads = [
    { path: "synthetic/evidence-a.bin", bytes: Buffer.alloc(17, 0x41), contentType: STORAGE_CONTENT_TYPE },
    { path: "synthetic/evidence-b.bin", bytes: Buffer.alloc(23, 0x42), contentType: STORAGE_CONTENT_TYPE },
  ];
  const storage = {
    format: STORAGE_FORMAT,
    objectCount: payloads.length,
    manifest: payloads.map((entry) => ({
      path: entry.path,
      contentType: entry.contentType,
      byteLength: entry.bytes.length,
      sha256: sha256(entry.bytes),
    })),
    payloads: payloads.map((entry) => ({ path: entry.path, contentType: entry.contentType, base64: entry.bytes.toString("base64") })),
  };
  return { database, storage };
}

export function validateDatabasePackage(database) {
  if (database?.format !== DATABASE_FORMAT || database?.migrationHead !== MIGRATION_HEAD) throw new Error("DATABASE_VERSION_REFUSED");
  if (JSON.stringify(database.tableOrder) !== JSON.stringify(["stables", "horses", "tests"])) throw new Error("DATABASE_TABLE_ORDER_REFUSED");
  for (const table of database.tableOrder) {
    if (!Array.isArray(database.rows?.[table]) || database.rows[table].length !== database.counts?.[table]) throw new Error("DATABASE_COUNT_REFUSED");
    if (database.rows[table].length !== 1) throw new Error("DATABASE_EXPECTED_COUNT_REFUSED");
    if (new Set(database.rows[table].map((row) => row.id)).size !== database.rows[table].length) throw new Error("DATABASE_PRIMARY_KEY_REFUSED");
  }
  const stableIds = new Set(database.rows.stables.map((row) => row.id));
  const horseIds = new Set(database.rows.horses.map((row) => row.id));
  if (!database.rows.horses.every((row) => stableIds.has(row.stableId))) throw new Error("DATABASE_STABLE_RELATION_REFUSED");
  if (!database.rows.tests.every((row) => horseIds.has(row.horseId))) throw new Error("DATABASE_HORSE_RELATION_REFUSED");
  return { tableCount: 3, rowCount: 3, migrationHead: MIGRATION_HEAD };
}

export function validateStoragePackage(storage) {
  if (storage?.format !== STORAGE_FORMAT || storage.objectCount !== 2) throw new Error("STORAGE_VERSION_OR_COUNT_REFUSED");
  if (!Array.isArray(storage.manifest) || !Array.isArray(storage.payloads)) throw new Error("STORAGE_SHAPE_REFUSED");
  if (storage.manifest.length !== storage.objectCount || storage.payloads.length !== storage.objectCount) throw new Error("STORAGE_MANIFEST_COUNT_REFUSED");
  const payloadByPath = new Map(storage.payloads.map((entry) => [entry.path, entry]));
  if (payloadByPath.size !== storage.payloads.length) throw new Error("STORAGE_PAYLOAD_PATH_REFUSED");
  for (const item of storage.manifest) {
    if (!isSafeRelativeObjectPath(item.path)) throw new Error("STORAGE_PATH_REFUSED");
    const payload = payloadByPath.get(item.path);
    if (!payload) throw new Error("STORAGE_MANIFEST_PAYLOAD_REFUSED");
    if (item.contentType !== STORAGE_CONTENT_TYPE || payload.contentType !== item.contentType) throw new Error("STORAGE_CONTENT_TYPE_REFUSED");
    const bytes = Buffer.from(payload.base64, "base64");
    if (bytes.length !== item.byteLength || sha256(bytes) !== item.sha256) throw new Error("STORAGE_HASH_REFUSED");
    payloadByPath.delete(item.path);
  }
  if (payloadByPath.size !== 0) throw new Error("STORAGE_EXTRA_PAYLOAD_REFUSED");
  return { objectCount: storage.objectCount, metadataCount: storage.manifest.length, byteCount: storage.manifest.reduce((sum, item) => sum + item.byteLength, 0) };
}

export function createEncryptionMaterial(randomBytesFn = (length) => crypto.randomBytes(length)) {
  let key;
  try {
    key = randomBytesFn(KEY_BYTES, "key");
  const databaseIv = randomBytesFn(IV_BYTES, "database-iv");
  const storageIv = randomBytesFn(IV_BYTES, "storage-iv");
  if (!Buffer.isBuffer(key) || key.length !== KEY_BYTES) throw new Error("KEY_LENGTH_REFUSED");
  if (!Buffer.isBuffer(databaseIv) || databaseIv.length !== IV_BYTES || !Buffer.isBuffer(storageIv) || storageIv.length !== IV_BYTES) throw new Error("IV_LENGTH_REFUSED");
  if (databaseIv.equals(storageIv)) throw new Error("IV_REUSE_REFUSED");
  return { key, databaseIv, storageIv };
  } catch (error) {
    if (Buffer.isBuffer(key)) key.fill(0);
    throw error;
  }

}
export function encryptBuffer(plain, key, iv, packageKind) {
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  cipher.setAAD(Buffer.from(`pp-033b:${packageKind}`, "utf8"));
  const ciphertext = Buffer.concat([cipher.update(plain), cipher.final()]);
  return { ciphertext, tag: cipher.getAuthTag() };
}

export function decryptBuffer(ciphertext, key, iv, tag, packageKind) {
  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
  decipher.setAAD(Buffer.from(`pp-033b:${packageKind}`, "utf8"));
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}

export function sanitizeRehearsalSummary(results, elapsedMs) {
  const passed = results.filter((result) => result.passed).length;
  return {
    sprint: "033B",
    rehearsalClass: "synthetic-same-process-logical-only",
    databaseAndStorageSeparate: true,
    algorithm: ENCRYPTION_ALGORITHM,
    ivBytes: IV_BYTES,
    scenarioCount: results.length,
    passedScenarioCount: passed,
    failedScenarioCount: results.length - passed,
    successScenarioCount: results.filter((result) => result.expected === "success").length,
    controlledFailureScenarioCount: results.filter((result) => result.expected === "refusal").length,
    tableCount: 3,
    rowCount: 3,
    objectCount: 2,
    elapsedMs,
    insideLocalRtoCeiling: elapsedMs < LOCAL_RTO_CEILING_MS,
    cleanupResidueCount: results.reduce((sum, result) => sum + result.cleanupResidueCount, 0),
    externalMutationCount: 0,
    providerNativeRestoreProven: false,
    productionRestoreProven: false,
    keyPersistedOrReported: false,
    ivPersistedOrReported: false,
  };
}
