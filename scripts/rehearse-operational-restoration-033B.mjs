import crypto from "node:crypto";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  LOCAL_RTO_CEILING_MS,
  createEncryptionMaterial,
  createSyntheticPackages,
  decryptBuffer,
  encryptBuffer,
  sanitizeRehearsalSummary,
  sha256,
  validateDatabasePackage,
  validateStoragePackage,
} from "./operational-readiness-033B.mjs";

export const REHEARSAL_SCENARIOS = Object.freeze([
  "success",
  "ciphertext-corruption",
  "wrong-key",
  "wrong-tag",
  "iv-reuse",
  "missing-database-row",
  "extra-database-row",
  "broken-foreign-key",
  "unexpected-migration-head",
  "missing-storage-object",
  "extra-storage-object",
  "changed-equal-length-object",
  "traversal-path",
  "absolute-path",
  "manifest-payload-disagreement",
  "missing-storage-content-type",
  "changed-storage-content-type",
]);

const EXPECTED_REFUSAL_CODES = Object.freeze({
  "ciphertext-corruption": "AUTHENTICATION_REFUSED",
  "wrong-key": "AUTHENTICATION_REFUSED",
  "wrong-tag": "AUTHENTICATION_REFUSED",
  "iv-reuse": "IV_REUSE_REFUSED",
  "missing-database-row": "DATABASE_COUNT_REFUSED",
  "extra-database-row": "DATABASE_COUNT_REFUSED",
  "broken-foreign-key": "DATABASE_HORSE_RELATION_REFUSED",
  "unexpected-migration-head": "DATABASE_VERSION_REFUSED",
  "missing-storage-object": "STORAGE_MANIFEST_COUNT_REFUSED",
  "extra-storage-object": "STORAGE_MANIFEST_COUNT_REFUSED",
  "changed-equal-length-object": "STORAGE_HASH_REFUSED",
  "traversal-path": "STORAGE_PATH_REFUSED",
  "absolute-path": "STORAGE_PATH_REFUSED",
  "manifest-payload-disagreement": "STORAGE_MANIFEST_PAYLOAD_REFUSED",
  "missing-storage-content-type": "STORAGE_CONTENT_TYPE_REFUSED",
  "changed-storage-content-type": "RESTORED_STORAGE_METADATA_REFUSED",
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function applyPlainMutation(scenario, database, storage) {
  if (scenario === "missing-database-row") database.rows.tests.pop();
  if (scenario === "extra-database-row") database.rows.tests.push({ id: "synthetic-test-002", horseId: "synthetic-horse-001" });
  if (scenario === "broken-foreign-key") database.rows.tests[0].horseId = "synthetic-horse-absent";
  if (scenario === "unexpected-migration-head") database.migrationHead = "0024";
  if (scenario === "missing-storage-object") storage.payloads.pop();
  if (scenario === "extra-storage-object") {
    const bytes = Buffer.alloc(11, 0x43);
    storage.manifest.push({ path: "synthetic/evidence-c.bin", contentType: "application/octet-stream", byteLength: bytes.length, sha256: sha256(bytes) });
    storage.payloads.push({ path: "synthetic/evidence-c.bin", base64: bytes.toString("base64") });
  }
  if (scenario === "changed-equal-length-object") {
    const original = Buffer.from(storage.payloads[0].base64, "base64");
    storage.payloads[0].base64 = Buffer.alloc(original.length, 0x5a).toString("base64");
  }
  if (scenario === "traversal-path") {
    storage.manifest[0].path = "../synthetic.bin";
    storage.payloads[0].path = "../synthetic.bin";
  }
  if (scenario === "absolute-path") {
    storage.manifest[0].path = "C:/synthetic/absolute.bin";
    storage.payloads[0].path = "C:/synthetic/absolute.bin";
  }
  if (scenario === "missing-storage-content-type") delete storage.payloads[0].contentType;
  if (scenario === "changed-storage-content-type") storage.mutateRestoredContentType = true;
  if (scenario === "manifest-payload-disagreement") storage.manifest[0].path = "synthetic/different.bin";
}

function authenticationCode(error) {
  if (/authenticate|auth tag|unable to authenticate/i.test(error?.message ?? "")) return "AUTHENTICATION_REFUSED";
  return error?.message ?? "UNEXPECTED_REHEARSAL_FAILURE";
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

export async function runScenario(scenario, { temporaryBase = os.tmpdir(), randomBytesFn = (length) => crypto.randomBytes(length) } = {}) {
  let generatedKey;
  if (!REHEARSAL_SCENARIOS.includes(scenario)) throw new Error("UNKNOWN_REHEARSAL_SCENARIO");
  const ownedRoot = await mkdtemp(path.join(temporaryBase, "pp-033b-rehearsal-"));
  const sourceRoot = path.join(ownedRoot, "source");
  const encryptedRoot = path.join(ownedRoot, "encrypted");
  const restoreRoot = path.join(ownedRoot, "restored");
  let key;
  let outcome;
  let encryptedFileCount = 0;
  const started = performance.now();
  try {
    await mkdir(sourceRoot, { recursive: false });
    const fixture = createSyntheticPackages();
    const database = clone(fixture.database);
    const captureRandom = (length, label) => {
      const value = randomBytesFn(length, label);
      if (label === "key" && Buffer.isBuffer(value)) generatedKey = value;
      return value;
    };
    const storage = clone(fixture.storage);
    applyPlainMutation(scenario, database, storage);
    await writeFile(path.join(sourceRoot, "database.json"), JSON.stringify(database), "utf8");
    await writeFile(path.join(sourceRoot, "storage.json"), JSON.stringify(storage), "utf8");

    const collisionIv = Buffer.alloc(12, 0x33);
    const materialRandom = scenario === "iv-reuse"
      ? (length, label) => label === "key" ? captureRandom(length, label) : Buffer.from(collisionIv)
      : captureRandom;
    const material = createEncryptionMaterial(materialRandom);
    key = material.key;
    const databasePlain = Buffer.from(JSON.stringify(database), "utf8");
    const storagePlain = Buffer.from(JSON.stringify(storage), "utf8");
    const encryptedDatabase = encryptBuffer(databasePlain, key, material.databaseIv, "database");
    const encryptedStorage = encryptBuffer(storagePlain, key, material.storageIv, "storage");

    await mkdir(encryptedRoot, { recursive: false });
    await writeFile(path.join(encryptedRoot, "database.bin"), encryptedDatabase.ciphertext);
    encryptedFileCount += 1;
    await writeFile(path.join(encryptedRoot, "storage.bin"), encryptedStorage.ciphertext);
    encryptedFileCount += 1;
    await rm(sourceRoot, { recursive: true, force: false });
    if (await exists(sourceRoot)) throw new Error("SOURCE_REMOVAL_REFUSED");

    let databaseCiphertext = await readFile(path.join(encryptedRoot, "database.bin"));
    let storageCiphertext = await readFile(path.join(encryptedRoot, "storage.bin"));
    let decryptKey = key;
    let databaseTag = encryptedDatabase.tag;
    let storageTag = encryptedStorage.tag;
    let wrongKey;
    if (scenario === "ciphertext-corruption") {
      databaseCiphertext = Buffer.from(databaseCiphertext);
      databaseCiphertext[0] ^= 0xff;
      storageCiphertext = Buffer.from(storageCiphertext);
      storageCiphertext[0] ^= 0xff;
    }
    if (scenario === "wrong-key") {
      wrongKey = Buffer.alloc(32, 0x7f);
      decryptKey = wrongKey;
    }
    if (scenario === "wrong-tag") {
      databaseTag = Buffer.from(databaseTag);
      databaseTag[0] ^= 0xff;
    }

    let restoredDatabase;
    let restoredStorage;
    try {
      if (scenario === "ciphertext-corruption") {
        let databaseRefused = false;
        let storageRefused = false;
        try { decryptBuffer(databaseCiphertext, decryptKey, material.databaseIv, databaseTag, "database"); } catch { databaseRefused = true; }
        try { decryptBuffer(storageCiphertext, decryptKey, material.storageIv, storageTag, "storage"); } catch { storageRefused = true; }
        if (!databaseRefused || !storageRefused) throw new Error("CIPHERTEXT_CORRUPTION_ACCEPTED");
        throw new Error("AUTHENTICATION_REFUSED");
      }
      restoredDatabase = JSON.parse(decryptBuffer(databaseCiphertext, decryptKey, material.databaseIv, databaseTag, "database").toString("utf8"));
      restoredStorage = JSON.parse(decryptBuffer(storageCiphertext, decryptKey, material.storageIv, storageTag, "storage").toString("utf8"));
    } catch (error) {
      throw new Error(authenticationCode(error));
    } finally {
      wrongKey?.fill(0);
    }

    const databaseResult = validateDatabasePackage(restoredDatabase);
    const storageResult = validateStoragePackage(restoredStorage);
    await mkdir(restoreRoot, { recursive: false });
    await writeFile(path.join(restoreRoot, "database.json"), JSON.stringify(restoredDatabase), "utf8");
    const restoredObjectRoot = path.join(restoreRoot, "objects");
    await mkdir(restoredObjectRoot, { recursive: false });
    const metadataPath = path.join(restoreRoot, "storage-metadata.json");
    const restoredMetadata = restoredStorage.manifest.map(({ path: objectPath, contentType }) => ({ path: objectPath, contentType }));
    await writeFile(metadataPath, JSON.stringify(restoredMetadata), "utf8");
    if (restoredStorage.mutateRestoredContentType) {
      const changedMetadata = clone(restoredMetadata);
      changedMetadata[0].contentType = "application/x-synthetic-changed";
      await writeFile(metadataPath, JSON.stringify(changedMetadata), "utf8");
    }
    for (const payload of restoredStorage.payloads) {
      const destination = path.resolve(restoredObjectRoot, ...payload.path.split("/"));
      if (!destination.startsWith(`${path.resolve(restoredObjectRoot)}${path.sep}`)) throw new Error("STORAGE_RESTORE_PATH_REFUSED");
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, Buffer.from(payload.base64, "base64"));
    }
    const rereadDatabase = JSON.parse(await readFile(path.join(restoreRoot, "database.json"), "utf8"));
    validateDatabasePackage(rereadDatabase);
    const rereadMetadata = JSON.parse(await readFile(metadataPath, "utf8"));
    if (JSON.stringify(rereadMetadata) !== JSON.stringify(restoredMetadata)) {
      throw new Error("RESTORED_STORAGE_METADATA_REFUSED");
    }
    for (const item of restoredStorage.manifest) {
      const restoredBytes = await readFile(path.resolve(restoredObjectRoot, ...item.path.split("/")));
      if (restoredBytes.length !== item.byteLength || sha256(restoredBytes) !== item.sha256) throw new Error("RESTORED_STORAGE_HASH_REFUSED");
    }
    const elapsedMs = performance.now() - started;
    if (elapsedMs >= LOCAL_RTO_CEILING_MS) throw new Error("LOCAL_RTO_CEILING_EXCEEDED");
    if (scenario !== "success") throw new Error("CONTROLLED_FAILURE_WAS_ACCEPTED");
    outcome = {
      scenario,
      expected: "success",
      observedCode: "SUCCESS",
      passed: true,
      databaseTableCount: databaseResult.tableCount,
      databaseRowCount: databaseResult.rowCount,
      storageObjectCount: storageResult.objectCount,
      storageByteCount: storageResult.byteCount,
      storageMetadataCount: storageResult.metadataCount,
      encryptedFileCount,
      elapsedMs,
    };
  } catch (error) {
    const observedCode = authenticationCode(error);
    const expectedCode = EXPECTED_REFUSAL_CODES[scenario];
    outcome = {
      scenario,
      expected: "refusal",
      observedCode,
      passed: Boolean(expectedCode) && observedCode === expectedCode,
      encryptedFileCount,
      elapsedMs: performance.now() - started,
    };
  } finally {
    key?.fill(0);
    const ownedKey = key ?? generatedKey;
    const keyBufferZeroed = ownedKey ? ownedKey.every((byte) => byte === 0) : true;
    await rm(ownedRoot, { recursive: true, force: true });
    const cleanupResidueCount = await exists(ownedRoot) ? 1 : 0;
    outcome = outcome ?? { scenario, expected: scenario === "success" ? "success" : "refusal", observedCode: "NO_OUTCOME", passed: false, elapsedMs: performance.now() - started };
    outcome.keyBufferZeroed = keyBufferZeroed;
    outcome.cleanupResidueCount = cleanupResidueCount;
    outcome.passed = outcome.passed && keyBufferZeroed && cleanupResidueCount === 0;
  }
  return outcome;
}

export async function runRehearsalMatrix(options = {}) {
  const started = performance.now();
  const results = [];
  for (const scenario of REHEARSAL_SCENARIOS) results.push(await runScenario(scenario, options));
  const elapsedMs = performance.now() - started;
  const summary = sanitizeRehearsalSummary(results, elapsedMs);
  return { results, summary };
}

async function main() {
  const outputIndex = process.argv.indexOf("--output");
  const outputPath = outputIndex >= 0 ? process.argv[outputIndex + 1] : null;
  if (outputIndex >= 0 && !outputPath) throw new Error("OUTPUT_PATH_REQUIRED");
  const { results, summary } = await runRehearsalMatrix();
  if (summary.passedScenarioCount !== REHEARSAL_SCENARIOS.length || summary.cleanupResidueCount !== 0) {
    throw new Error("REHEARSAL_MATRIX_FAILED");
  }
  if (outputPath) {
    await mkdir(path.dirname(path.resolve(outputPath)), { recursive: true });
    await writeFile(path.resolve(outputPath), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  }
  console.log(`Sprint 033B synthetic same-process logical restoration rehearsal passed: ${summary.passedScenarioCount}/${summary.scenarioCount}; temporary residue ${summary.cleanupResidueCount}.`);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) {
  main().catch((error) => {
    console.error(`Sprint 033B rehearsal failed: ${error.message}`);
    process.exitCode = 1;
  });
}
