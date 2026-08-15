import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import {
  BUSINESS_OWNER,
  BUSINESS_DAY_START_HOUR,
  DATABASE_FORMAT,
  ENCRYPTION_ALGORITHM,
  INCIDENT_ADDRESS,
  INCIDENT_FLOW,
  IV_BYTES,
  KEY_BYTES,
  LOCAL_RTO_CEILING_MS,
  MIGRATION_HEAD,
  OPERATIONAL_CONTRACT,
  PLATFORM_OPERATOR,
  PRODUCTION_BINDING_CLASSES,
  SEVERITY_MATRIX,
  STORAGE_FORMAT,
  STABLE_ALIASES,
  STORAGE_CONTENT_TYPE,
  createEncryptionMaterial,
  businessMillisecondsElapsed,
  createPrivacyRequestLedger,
  createSyntheticPackages,
  decryptBuffer,
  encryptBuffer,
  isSafeRelativeObjectPath,
  severityFor,
  validateAccessCorrection,
  validateDatabasePackage,
  validateIncidentTimeline,
  validateRollbackCompatibility,
  validateStoragePackage,
  validateSupportIntake,
} from "./operational-readiness-033B.mjs";
import { REHEARSAL_SCENARIOS, runRehearsalMatrix } from "./rehearse-operational-restoration-033B.mjs";

let passed = 0;
function check(condition, label) {
  assert.ok(condition, label);
  passed += 1;
}
function rejects(action, pattern, label) {
  assert.throws(action, pattern, label);
  passed += 1;
}
const clone = (value) => JSON.parse(JSON.stringify(value));
const authoritySource = readFileSync(new URL("../docs/OPERATIONAL_OWNERSHIP_INCIDENT_AND_RESTORATION_033B.md", import.meta.url), "utf8");
const handoffSource = readFileSync(new URL("../docs/OPERATIONS_HANDOFF.md", import.meta.url), "utf8");
const accessRegisterSource = readFileSync(new URL("../docs/change password.md", import.meta.url), "utf8");
const deferredSource = readFileSync(new URL("../planning/DEFERRED_SCOPE_AND_OWNERSHIP.md", import.meta.url), "utf8");
const suiteSource = readFileSync(new URL("./run-validation-suite.mjs", import.meta.url), "utf8");
const packageSource = readFileSync(new URL("../package.json", import.meta.url), "utf8");

// Authority and named responsibility: 20.
check(BUSINESS_OWNER === "Phillip Norman Rankin", "OP-001 canonical business owner");
check(PLATFORM_OPERATOR === "Randell Rankin", "OP-002 canonical platform operator");
check(INCIDENT_ADDRESS === "equineprecisionperformance@hotmail.com", "OP-003 monitored address");
check(
  OPERATIONAL_CONTRACT.ownerVersion === "033B-operational-ownership-v1"
    && [authoritySource, handoffSource, accessRegisterSource].every((source) => source.includes(BUSINESS_OWNER) && source.includes(PLATFORM_OPERATOR))
    && authoritySource.includes("jointly") && accessRegisterSource.includes("joint approval"),
  "OP-004 authority version and named documentation",
);
check(OPERATIONAL_CONTRACT.businessOwner === BUSINESS_OWNER, "OP-005 business owner");
check(OPERATIONAL_CONTRACT.supportOwner === BUSINESS_OWNER, "OP-006 support owner");
check(OPERATIONAL_CONTRACT.privacyOwner === BUSINESS_OWNER, "OP-007 privacy owner");
check(OPERATIONAL_CONTRACT.incidentOwner === BUSINESS_OWNER, "OP-008 incident owner");
check(OPERATIONAL_CONTRACT.platformOperator === PLATFORM_OPERATOR, "OP-009 platform operator");
check(OPERATIONAL_CONTRACT.migrationOperator === PLATFORM_OPERATOR, "OP-010 migration operator");
check(OPERATIONAL_CONTRACT.releaseOperator === PLATFORM_OPERATOR, "OP-011 release operator");
check(OPERATIONAL_CONTRACT.recoveryOperator === PLATFORM_OPERATOR, "OP-012 recovery operator");
check(JSON.stringify(OPERATIONAL_CONTRACT.rollbackApprovers) === JSON.stringify([BUSINESS_OWNER, PLATFORM_OPERATOR]), "OP-013 joint rollback approval");
check(JSON.stringify(OPERATIONAL_CONTRACT.restorationApprovers) === JSON.stringify([BUSINESS_OWNER, PLATFORM_OPERATOR]), "OP-014 joint restoration approval");
check(OPERATIONAL_CONTRACT.privacyAddress === INCIDENT_ADDRESS, "OP-015 contract address");
check(
  OPERATIONAL_CONTRACT.publicSla === false && authoritySource.includes("They do not establish provider capability, a public SLA or actual Production duration."),
  "OP-016 no public SLA",
);
check(OPERATIONAL_CONTRACT.legalAdvice === false, "OP-017 no legal advice claim");
check(OPERATIONAL_CONTRACT.providerNativeRestoreProven === false, "OP-018 provider-native open");
check(OPERATIONAL_CONTRACT.productionRestoreProven === false, "OP-019 Production open");
check(OPERATIONAL_CONTRACT.internalObjectivesOnly === true, "OP-020 objectives internal");

// Support, access correction and privacy request handling: 15.
const supportRecord = {
  route: "/synthetic-route",
  time: "2026-08-12T00:00:00.000Z",
  browserDevice: "synthetic-browser-device",
  expectedBehavior: "synthetic expected",
  actualBehavior: "synthetic actual",
  reproducibility: "synthetic repeatable",
  redactedArtifact: "redacted:synthetic-reference",
};
check(validateSupportIntake(supportRecord), "OP-021 support intake accepted");
const missingSupport = { ...supportRecord }; delete missingSupport.route;
check(!validateSupportIntake(missingSupport), "OP-022 missing support field refused");
check(!validateSupportIntake({ ...supportRecord, extra: "synthetic" }), "OP-023 extra support field refused");
check(!validateSupportIntake({ ...supportRecord, token: "not-a-real-value" }), "OP-024 credential field refused");
check(!validateSupportIntake({ ...supportRecord, rawData: "not-a-real-value" }), "OP-025 raw data field refused");
check(validateAccessCorrection({ mechanism: "existing-admin-rls", authenticated: true, authorised: true }), "OP-026 Admin/RLS correction accepted");
check(!validateAccessCorrection({ mechanism: "manual-sql", authenticated: true, authorised: true }), "OP-027 manual SQL refused");
check(!validateAccessCorrection({ mechanism: "service-role", authenticated: true, authorised: true }), "OP-028 service role refused");
check(!validateAccessCorrection({ mechanism: "existing-admin-rls", authenticated: true, authorised: false }), "OP-029 unauthorised correction refused");
check(!validateAccessCorrection({ mechanism: "existing-admin-rls", authenticated: true, authorised: true, widensPermission: true }), "OP-030 permission widening refused");
const accessLedger = createPrivacyRequestLedger({ requestClass: "access", receivedAt: "2026-08-12T00:00:00.000Z", identityVerified: true, authorityVerified: true });
check(accessLedger.requestClass === "access" && accessLedger.owner === BUSINESS_OWNER, "OP-031 access ledger safe shape");
check(accessLedger.targetBy === "2026-09-11T00:00:00.000Z", "OP-032 30-calendar-day target");
const correctionLedger = createPrivacyRequestLedger({ requestClass: "correction", receivedAt: "2026-08-12T00:00:00.000Z", identityVerified: true, authorityVerified: true });
check(correctionLedger.requestClass === "correction", "OP-033 correction ledger");
rejects(() => createPrivacyRequestLedger({ requestClass: "access", receivedAt: "2026-08-12T00:00:00.000Z", identityVerified: false, authorityVerified: true }), /VERIFICATION_REQUIRED/, "OP-034 unverified requester refused");
const refusedLedger = createPrivacyRequestLedger({ requestClass: "access", receivedAt: "2026-08-12T00:00:00.000Z", identityVerified: true, authorityVerified: true, decision: "refused" });
check(refusedLedger.explanationRequired === true, "OP-035 refusal explanation required");

// Incident sequencing and complete non-overlapping severity: 13.
check(JSON.stringify(INCIDENT_FLOW) === JSON.stringify(["contain", "assess", "notify-if-required", "review"]), "OP-036 incident order");
check(OPERATIONAL_CONTRACT.urgentAcknowledgementBusinessHours === 4, "OP-037 four-hour acknowledgement");
check(OPERATIONAL_CONTRACT.privacyAssessmentHours === 24, "OP-038 24-hour assessment");
check(OPERATIONAL_CONTRACT.containment === "immediate", "OP-039 immediate containment");
check(validateIncidentTimeline({ detectedAt: "2026-08-12T00:00:00Z", containmentAt: "2026-08-12T00:00:00Z", acknowledgementAt: "2026-08-12T04:00:00Z", assessmentAt: "2026-08-13T00:00:00Z" }), "OP-040 boundary timeline accepted");
check(!validateIncidentTimeline({ detectedAt: "2026-08-12T00:00:00Z", containmentAt: "2026-08-12T00:00:01Z", acknowledgementAt: "2026-08-12T04:00:00Z", assessmentAt: "2026-08-13T00:00:00Z" }), "OP-041 non-immediate containment refused");
check(!validateIncidentTimeline({ detectedAt: "2026-08-12T00:00:00Z", containmentAt: "2026-08-12T00:00:00Z", acknowledgementAt: "2026-08-12T04:00:00Z", assessmentAt: "2026-08-13T00:00:01Z" }), "OP-042 late assessment refused");
check(JSON.stringify(Object.keys(SEVERITY_MATRIX)) === JSON.stringify(["P0", "P1", "P2", "P3"]), "OP-043 P0-P3 complete");
const allClasses = Object.values(SEVERITY_MATRIX).flatMap((entry) => entry.classes);
check(new Set(allClasses).size === allClasses.length, "OP-044 severity classes non-overlapping");
check(severityFor("suspected-disclosure") === "P0", "OP-045 P0 mapping");
check(severityFor("public-outage") === "P1", "OP-046 P1 mapping");
check(severityFor("degraded-route") === "P2", "OP-047 P2 mapping");
check(severityFor("documentation-defect") === "P3", "OP-048 P3 mapping");

// Objectives, cadence and rollback compatibility: 10.
rejects(() => severityFor("unmapped-synthetic-class"), /UNMAPPED_OR_OVERLAPPING/, "OP-049 unmapped severity refused");
check(OPERATIONAL_CONTRACT.rpoHours === 24, "OP-050 24-hour RPO");
check(OPERATIONAL_CONTRACT.rto === "one-business-day", "OP-051 one-business-day RTO");
check(OPERATIONAL_CONTRACT.cadence.length === 3, "OP-052 three cadence triggers");
check(["quarterly", "before-first-sensitive-data-launch", "after-material-schema-or-storage-recovery-change"].every((value) => OPERATIONAL_CONTRACT.cadence.includes(value)), "OP-053 exact cadence");
check(
  OPERATIONAL_CONTRACT.databaseAndStorageSeparate === true && authoritySource.includes("Separate database and Storage recovery") && handoffSource.includes("database/Storage synthetic same-process logical rehearsal"),
  "OP-054 database and Storage separate",
);
check(OPERATIONAL_CONTRACT.providerDependent === true, "OP-055 provider-dependent objective");
check(validateRollbackCompatibility({ sourceVerified: true, aliases: STABLE_ALIASES, bindingClasses: PRODUCTION_BINDING_CLASSES, approvers: [BUSINESS_OWNER, PLATFORM_OPERATOR] }), "OP-056 compatible joint rollback");
check(!validateRollbackCompatibility({ sourceVerified: true, aliases: STABLE_ALIASES, bindingClasses: PRODUCTION_BINDING_CLASSES, approvers: [PLATFORM_OPERATOR] }), "OP-057 single approver refused");
check(!validateRollbackCompatibility({ sourceVerified: true, aliases: STABLE_ALIASES.slice(1), bindingClasses: PRODUCTION_BINDING_CLASSES, approvers: [BUSINESS_OWNER, PLATFORM_OPERATOR] }), "OP-058 incomplete alias set refused");

// Successful logical packages and cryptography: 12.
const fixture = createSyntheticPackages();
check(fixture.database.format === DATABASE_FORMAT, "OP-059 database format");
check(fixture.database.migrationHead === MIGRATION_HEAD, "OP-060 migration head");
check(JSON.stringify(fixture.database.counts) === JSON.stringify({ stables: 1, horses: 1, tests: 1 }), "OP-061 independent table counts");
check(fixture.storage.format === STORAGE_FORMAT, "OP-062 Storage format");
check(fixture.storage.objectCount === 2, "OP-063 separate object count");
check(validateDatabasePackage(fixture.database).rowCount === 3, "OP-064 three related rows");
check(validateStoragePackage(fixture.storage).byteCount === 40, "OP-065 object bytes and hashes");
const material = createEncryptionMaterial();
try {
  check(material.key.length === KEY_BYTES, "OP-066 32-byte process key");
  check(material.databaseIv.length === IV_BYTES, "OP-067 database IV 12 bytes");
  check(material.storageIv.length === IV_BYTES, "OP-068 Storage IV 12 bytes");
  check(!material.databaseIv.equals(material.storageIv), "OP-069 package IVs distinct");
  const databasePlain = Buffer.from(JSON.stringify(fixture.database));
  const encrypted = encryptBuffer(databasePlain, material.key, material.databaseIv, "database");
  const restored = decryptBuffer(encrypted.ciphertext, material.key, material.databaseIv, encrypted.tag, "database");
  check(ENCRYPTION_ALGORITHM === "aes-256-gcm" && restored.equals(databasePlain), "OP-070 authenticated database round trip");

  // Adversarial integrity and path cases: 18.
  const collision = Buffer.alloc(IV_BYTES, 0x44);
  rejects(() => createEncryptionMaterial((length, label) => label === "key" ? Buffer.alloc(length, 0x11) : Buffer.from(collision)), /IV_REUSE_REFUSED/, "OP-071 IV reuse refused before encryption");
  rejects(() => createEncryptionMaterial((length, label) => label === "key" ? Buffer.alloc(length - 1) : crypto.randomBytes(length)), /KEY_LENGTH_REFUSED/, "OP-072 short key refused");
  rejects(() => createEncryptionMaterial((length, label) => label === "key" ? Buffer.alloc(length) : Buffer.alloc(length - 1)), /IV_LENGTH_REFUSED/, "OP-073 short IV refused");
  check(isSafeRelativeObjectPath("synthetic/evidence.bin"), "OP-074 safe relative path");
  check(!isSafeRelativeObjectPath("../evidence.bin"), "OP-075 traversal refused");
  check(!isSafeRelativeObjectPath("C:/evidence.bin"), "OP-076 absolute path refused");
  const missingRow = clone(fixture.database); missingRow.rows.tests.pop();
  rejects(() => validateDatabasePackage(missingRow), /DATABASE_COUNT_REFUSED/, "OP-077 missing row refused");
  const extraRow = clone(fixture.database); extraRow.rows.tests.push({ id: "synthetic-test-002", horseId: "synthetic-horse-001" });
  rejects(() => validateDatabasePackage(extraRow), /DATABASE_COUNT_REFUSED/, "OP-078 extra row refused");
  const brokenRelation = clone(fixture.database); brokenRelation.rows.tests[0].horseId = "synthetic-absent";
  rejects(() => validateDatabasePackage(brokenRelation), /HORSE_RELATION_REFUSED/, "OP-079 broken relation refused");
  const wrongHead = clone(fixture.database); wrongHead.migrationHead = "0024";
  rejects(() => validateDatabasePackage(wrongHead), /DATABASE_VERSION_REFUSED/, "OP-080 wrong migration head refused");
  const missingObject = clone(fixture.storage); missingObject.payloads.pop();
  rejects(() => validateStoragePackage(missingObject), /MANIFEST_COUNT_REFUSED/, "OP-081 missing object refused");
  const extraObject = clone(fixture.storage); extraObject.payloads.push({ path: "synthetic/extra.bin", base64: Buffer.alloc(1).toString("base64") });
  rejects(() => validateStoragePackage(extraObject), /MANIFEST_COUNT_REFUSED/, "OP-082 extra object refused");
  const changedObject = clone(fixture.storage); changedObject.payloads[0].base64 = Buffer.alloc(17, 0x5a).toString("base64");
  rejects(() => validateStoragePackage(changedObject), /STORAGE_HASH_REFUSED/, "OP-083 changed equal-length object refused");
  const traversalObject = clone(fixture.storage); traversalObject.manifest[0].path = "../evidence.bin"; traversalObject.payloads[0].path = "../evidence.bin";
  rejects(() => validateStoragePackage(traversalObject), /STORAGE_PATH_REFUSED/, "OP-084 traversal package refused");
  const absoluteObject = clone(fixture.storage); absoluteObject.manifest[0].path = "C:/evidence.bin"; absoluteObject.payloads[0].path = "C:/evidence.bin";
  rejects(() => validateStoragePackage(absoluteObject), /STORAGE_PATH_REFUSED/, "OP-085 absolute package refused");
  const disagreement = clone(fixture.storage); disagreement.manifest[0].path = "synthetic/different.bin";
  rejects(() => validateStoragePackage(disagreement), /MANIFEST_PAYLOAD_REFUSED/, "OP-086 manifest disagreement refused");
  const wrongKey = Buffer.alloc(KEY_BYTES, 0x7f);
  rejects(() => decryptBuffer(encrypted.ciphertext, wrongKey, material.databaseIv, encrypted.tag, "database"), /auth/i, "OP-087 wrong key refused");
  wrongKey.fill(0);
  const wrongTag = Buffer.from(encrypted.tag); wrongTag[0] ^= 0xff;
  rejects(() => decryptBuffer(encrypted.ciphertext, material.key, material.databaseIv, wrongTag, "database"), /auth/i, "OP-088 wrong tag refused");
} finally {
  material.key.fill(0);
}

// Full success/failure cleanup and aggregate evidence safety: 8.
const rehearsal = await runRehearsalMatrix();
check(REHEARSAL_SCENARIOS.length === 17, "OP-089 exact 17 scenarios");
check(rehearsal.summary.passedScenarioCount === 17, "OP-090 17 scenarios passed");
check(rehearsal.summary.failedScenarioCount === 0, "OP-091 zero failed scenarios");
check(rehearsal.summary.successScenarioCount === 1, "OP-092 one success scenario");
check(rehearsal.summary.controlledFailureScenarioCount === 16, "OP-093 sixteen controlled failures");
check(rehearsal.summary.cleanupResidueCount === 0 && rehearsal.results.every((result) => result.cleanupResidueCount === 0), "OP-094 every case cleanup zero");
check(rehearsal.results.every((result) => result.keyBufferZeroed === true), "OP-095 every owned key buffer zeroed");
check(
  rehearsal.results.find((result) => result.scenario === "ciphertext-corruption")?.observedCode === "AUTHENTICATION_REFUSED"
    && rehearsal.results.find((result) => result.scenario === "iv-reuse")?.observedCode === "IV_REUSE_REFUSED"
    && rehearsal.summary.rehearsalClass === "synthetic-same-process-logical-only"
    && rehearsal.summary.providerNativeRestoreProven === false
    && rehearsal.summary.productionRestoreProven === false
    && rehearsal.summary.keyPersistedOrReported === false
    && rehearsal.summary.ivPersistedOrReported === false
    && rehearsal.summary.externalMutationCount === 0
    && rehearsal.summary.insideLocalRtoCeiling === true
    && rehearsal.summary.elapsedMs < LOCAL_RTO_CEILING_MS
    && deferredSource.includes("synthetic same-process logical DB/Storage rehearsal")
    && suiteSource.includes("scripts/test-operational-readiness-033B.mjs")
    && suiteSource.includes("scripts/test-migration-ledger-033B.mjs")
    && packageSource.includes('"test:operational-readiness-033b"')
    && packageSource.includes('"test:migration-ledger-033b"')
    && packageSource.includes('"rehearse:operational-restoration-033b"'),
  "OP-096 corruption/reuse and same-process aggregate limitation",
);

// Inspection repairs: 24 discriminating assertions (OP-097..OP-120).
const sentinelRecord = clone(supportRecord);
const sentinelValues = ["Bearer synthetic-sentinel", "eyJsynthetic.header.signature", "password=synthetic-sentinel", "https://synthetic.invalid/?token=sentinel", "unredacted: synthetic-record", "synthetic.private@example.invalid"];
check(sentinelValues.every((value) => !validateSupportIntake({ ...supportRecord, actualBehavior: value })), "OP-097 value sentinels refused");
check(JSON.stringify(supportRecord) === JSON.stringify(sentinelRecord), "OP-098 refused support input not mutated");
check(businessMillisecondsElapsed("2026-08-10T09:00:00+10:00", "2026-08-10T13:00:00+10:00") === 14_400_000, "OP-099 Monday four business hours");
check(businessMillisecondsElapsed("2026-08-14T16:00:00+10:00", "2026-08-17T12:00:00+10:00") === 14_400_000, "OP-100 weekend excluded");
check(validateIncidentTimeline({ detectedAt: "2026-08-14T16:00:00+10:00", containmentAt: "2026-08-14T16:00:00+10:00", acknowledgementAt: "2026-08-17T12:00:00+10:00", assessmentAt: "2026-08-15T16:00:00+10:00" }), "OP-101 Friday boundary accepted");
check(!validateIncidentTimeline({ detectedAt: "2026-08-14T16:00:00+10:00", containmentAt: "2026-08-14T16:00:00+10:00", acknowledgementAt: "2026-08-17T12:00:00.001+10:00", assessmentAt: "2026-08-15T16:00:00+10:00" }), "OP-102 Friday boundary plus one refused");
check(validateIncidentTimeline({ detectedAt: "2026-08-15T10:00:00+10:00", containmentAt: "2026-08-15T10:00:00+10:00", acknowledgementAt: "2026-08-17T13:00:00+10:00", assessmentAt: "2026-08-16T10:00:00+10:00" }), "OP-103 weekend detection boundary accepted");
check(!validateIncidentTimeline({ detectedAt: "2026-08-15T10:00:00+10:00", containmentAt: "2026-08-15T10:00:00+10:00", acknowledgementAt: "2026-08-17T13:00:00.001+10:00", assessmentAt: "2026-08-16T10:00:00+10:00" }), "OP-104 weekend boundary plus one refused");
check(!validateIncidentTimeline({ detectedAt: "2026-08-10T09:00:00+10:00", containmentAt: "2026-08-10T09:00:00.001+10:00", acknowledgementAt: "2026-08-10T13:00:00+10:00", assessmentAt: "2026-08-11T09:00:00+10:00" }), "OP-105 containment plus one millisecond refused");
const rollback = (aliases, bindingClasses, sourceVerified = true) => validateRollbackCompatibility({ sourceVerified, aliases, bindingClasses, approvers: [BUSINESS_OWNER, PLATFORM_OPERATOR] });
check(rollback([...STABLE_ALIASES].reverse(), [...PRODUCTION_BINDING_CLASSES].reverse()), "OP-106 reordered exact sets accepted");
check(!rollback(STABLE_ALIASES.slice(1), PRODUCTION_BINDING_CLASSES), "OP-107 missing alias refused");
check(!rollback([...STABLE_ALIASES, "https://extra.invalid"], PRODUCTION_BINDING_CLASSES), "OP-108 extra alias refused");
check(!rollback([...STABLE_ALIASES.slice(0, 4), STABLE_ALIASES[0]], PRODUCTION_BINDING_CLASSES), "OP-109 duplicate alias refused");
check(!rollback([...STABLE_ALIASES.slice(0, 4), "https://wrong.invalid"], PRODUCTION_BINDING_CLASSES), "OP-110 wrong alias refused");
check(!rollback(STABLE_ALIASES, PRODUCTION_BINDING_CLASSES.slice(1)), "OP-111 missing binding refused");
check(!rollback(STABLE_ALIASES, [...PRODUCTION_BINDING_CLASSES, "EXTRA_BINDING"]), "OP-112 extra binding refused");
check(!rollback(STABLE_ALIASES, [PRODUCTION_BINDING_CLASSES[0], PRODUCTION_BINDING_CLASSES[1], PRODUCTION_BINDING_CLASSES[0]]), "OP-113 duplicate binding refused");
check(!rollback(STABLE_ALIASES, [PRODUCTION_BINDING_CLASSES[0], PRODUCTION_BINDING_CLASSES[1], "WRONG_BINDING"]), "OP-114 wrong binding refused");
check(!rollback(STABLE_ALIASES, PRODUCTION_BINDING_CLASSES, false), "OP-115 unverified source refused");
check(fixture.storage.manifest.every((item) => item.contentType === STORAGE_CONTENT_TYPE) && fixture.storage.payloads.every((item) => item.contentType === STORAGE_CONTENT_TYPE), "OP-116 contentType inventory exact");
const missingContentType = clone(fixture.storage); delete missingContentType.manifest[0].contentType;
rejects(() => validateStoragePackage(missingContentType), /CONTENT_TYPE_REFUSED/, "OP-117 missing contentType refused");
const changedContentType = clone(fixture.storage); changedContentType.payloads[0].contentType = "application/x-synthetic-changed";
rejects(() => validateStoragePackage(changedContentType), /CONTENT_TYPE_REFUSED/, "OP-118 changed contentType refused");
let capturedCollisionKey;
let collisionError;
try { createEncryptionMaterial((length, label) => label === "key" ? (capturedCollisionKey = Buffer.alloc(length, 0x31)) : Buffer.alloc(length, 0x42)); } catch (error) { collisionError = error; }
check(collisionError?.message === "IV_REUSE_REFUSED" && capturedCollisionKey.every((byte) => byte === 0), "OP-119 collision key zeroed before return");
const ivReuseResult = rehearsal.results.find((result) => result.scenario === "iv-reuse");
check(ivReuseResult?.keyBufferZeroed === true && ivReuseResult.encryptedFileCount === 0 && ivReuseResult.cleanupResidueCount === 0, "OP-120 collision writes zero encrypted files and cleans");

// Final INSPECT-002 value-refusal discriminators (OP-121..OP-130).
const finalSentinels = ["+61 412 345 678", "phone: (07) 3000 0000", "-----BEGIN PRIVATE KEY-----", "AKIAABCDEFGHIJKLMNOP", "sk_live_synthetic", "ghp_synthetic", "github_pat_synthetic", "rk_live_synthetic"];
check(!validateSupportIntake({ ...supportRecord, actualBehavior: finalSentinels[0] }), "OP-121 standalone Australian +61 refused");
check(!validateSupportIntake({ ...supportRecord, actualBehavior: finalSentinels[1] }), "OP-122 labelled local phone refused");
check(!validateSupportIntake({ ...supportRecord, actualBehavior: finalSentinels[2] }), "OP-123 PEM private key marker refused");
check(!validateSupportIntake({ ...supportRecord, actualBehavior: finalSentinels[3] }), "OP-124 AWS access-key shape refused");
check(!validateSupportIntake({ ...supportRecord, actualBehavior: finalSentinels[4] }), "OP-125 Stripe live secret prefix refused");
check(!validateSupportIntake({ ...supportRecord, actualBehavior: finalSentinels[5] }), "OP-126 GitHub personal token prefix refused");
check(finalSentinels.slice(6).every((value) => !validateSupportIntake({ ...supportRecord, actualBehavior: value })), "OP-127 adjacent justified live prefixes refused");
const nearMissValues = ["phone layout remains synthetic", "ticket 123456789012345 remains synthetic", "+61 412 345 67", "A+61 412 345 678B", "sk_test_synthetic", "ghs_synthetic", "AKIBABCDEFGHIJKLMNOP", "-----BEGIN CERTIFICATE-----"];
check(nearMissValues.every((value) => validateSupportIntake({ ...supportRecord, actualBehavior: value })), "OP-128 near misses and arbitrary prose accepted");
const finalInputs = finalSentinels.map((value) => ({ ...supportRecord, actualBehavior: value }));
const finalBefore = JSON.stringify(finalInputs);
const finalReturns = finalInputs.map((record) => validateSupportIntake(record));
check(finalReturns.every((value) => value === false) && JSON.stringify(finalInputs) === finalBefore, "OP-129 refusals return false without input mutation");
const supportValidatorSource = readFileSync(new URL("./operational-readiness-033B.mjs", import.meta.url), "utf8").match(/export function validateSupportIntake[\s\S]*?\n}/)?.[0] ?? "";
check(!/(?:console\.|readFile|writeFile|fetch\(|http|https|log\()/i.test(supportValidatorSource), "OP-130 support refusal is no-I/O and no-echo by construction");

assert.equal(passed, 130);
console.log(`Sprint 033B operational and restoration assertions passed: ${passed}/130.`);
