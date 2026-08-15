import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFile, mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationRoot = path.join(repositoryRoot, "supabase", "migrations");
const validatorPath = path.join(repositoryRoot, "scripts", "lib", "migration-ledger-validation.ps1");
const registeredValidatorPath = path.join(repositoryRoot, "scripts", "validate-supabase-clean-rebuild-020G.ps1");
const utf8NoBom = new TextEncoder();
let passed = 0;
function check(condition, label) {
  assert.ok(condition, label);
  passed += 1;
}

function runLedger(directory) {
  const escapedValidator = validatorPath.replaceAll("'", "''");
  const escapedDirectory = directory.replaceAll("'", "''");
  const command = `. '${escapedValidator}'; $r=Test-CandidateMigrationLedger -MigrationDirectory '${escapedDirectory}'; [pscustomobject]@{Count=$r.Migrations.Count;Head=$r.Head.Name;Versions=@($r.Migrations|ForEach-Object{$_.Name.Substring(0,4)});LocalOnlyVersions=@($r.LocalOnlyVersions);RemoteStatusInspected=$r.RemoteStatusInspected;Diagnostic=$r.Diagnostic}|ConvertTo-Json -Compress`;
  return spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", command], { cwd: repositoryRoot, encoding: "utf8", windowsHide: true });
}

async function copyMigrations(destination) {
  const files = (await readdir(migrationRoot)).filter((name) => /^\d.*\.sql$/.test(name));
  await Promise.all(files.map((name) => copyFile(path.join(migrationRoot, name), path.join(destination, name))));
}

async function runNegativeCase(base, name, mutate) {
  const directory = await mkdtemp(path.join(base, `${name}-`));
  try {
    await copyMigrations(directory);
    await mutate(directory);
    return runLedger(directory).status !== 0;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

async function removeMatching(directory, prefix) {
  const names = await readdir(directory);
  await Promise.all(names.filter((name) => name.startsWith(prefix)).map((name) => unlink(path.join(directory, name))));
}

async function replaceMarker(directory, fileName, marker) {
  const target = path.join(directory, fileName);
  const text = await readFile(target, "utf8");
  assert.ok(text.includes(marker), `fixture marker absent: ${fileName}`);
  await writeFile(target, text.replaceAll(marker, "synthetic-marker-removed"), "utf8");
}

const current = runLedger(migrationRoot);
check(current.status === 0, "MIG-001 current validator passes");
const parsed = JSON.parse(current.stdout.trim());
check(parsed.Count === 25, "MIG-002 exact migration count");
check(parsed.Head === "0025_user_trend_view_preferences.sql", "MIG-003 exact head identity");
check(parsed.Versions[0] === "0001" && parsed.Versions.at(-1) === "0025", "MIG-004 exact version endpoints");
check(JSON.stringify(parsed.LocalOnlyVersions) === JSON.stringify(["0024", "0025"]), "MIG-005 local-only versions");
check(parsed.RemoteStatusInspected === false, "MIG-006 remote status false");
check(parsed.Diagnostic.includes("aligned locally through 0025"), "MIG-007 local alignment diagnostic");
check(parsed.Diagnostic.includes("0024 and 0025 are local-only"), "MIG-008 local-only diagnostic");
check(parsed.Diagnostic.includes("no applied or remote status was inspected"), "MIG-009 remote-uninspected diagnostic");
check(!/applied successfully|remote applied/i.test(parsed.Diagnostic), "MIG-010 no remote-applied claim");
const migrationNames = await readdir(migrationRoot);
check(migrationNames.includes("0024_versioned_four_loss_biochemistry_scoring.sql") && migrationNames.includes("0025_user_trend_view_preferences.sql"), "MIG-011 exact local identities");

const migration24Bytes = await readFile(path.join(migrationRoot, "0024_versioned_four_loss_biochemistry_scoring.sql"));
const migration25Bytes = await readFile(path.join(migrationRoot, "0025_user_trend_view_preferences.sql"));
const migration24 = migration24Bytes.toString("utf8");
const migration25 = migration25Bytes.toString("utf8");
check(!(migration24Bytes[0] === 0xef && migration24Bytes[1] === 0xbb && migration24Bytes[2] === 0xbf), "MIG-012 0024 UTF-8 no BOM");
check(!(migration25Bytes[0] === 0xef && migration25Bytes[1] === 0xbb && migration25Bytes[2] === 0xbf), "MIG-013 0025 UTF-8 no BOM");
check(migration24.includes("Sprint 025C - versioned four-loss biochemistry scoring"), "MIG-014 0024 sprint marker");
check(migration24.includes("validate_biochemistry_v2_scored_snapshot"), "MIG-015 0024 validation marker");
check(migration24.includes("HORSE Energy Loss Version 3 no urea or age.xlsx"), "MIG-016 0024 authority marker");
check(migration25.includes("Sprint 028B - self-only saved longitudinal trend view preferences"), "MIG-017 0025 sprint marker");
check(migration25.includes("enable row level security"), "MIG-018 0025 RLS marker");
check(migration25.includes("set_default_biochemistry_trend_preference"), "MIG-019 0025 function marker");

const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "pp-033b-ledger-"));
try {
  const negativeCases = [
    ["missing-0025", (dir) => removeMatching(dir, "0025_")],
    ["missing-0024", (dir) => removeMatching(dir, "0024_")],
    ["gap-0007", (dir) => removeMatching(dir, "0007_")],
    ["duplicate-0024", (dir) => writeFile(path.join(dir, "0024_duplicate.sql"), "select 1;", "utf8")],
    ["renamed-0024", async (dir) => { await removeMatching(dir, "0024_"); await writeFile(path.join(dir, "0024_renamed.sql"), "select 1;", "utf8"); }],
    ["renamed-0025", async (dir) => { await removeMatching(dir, "0025_"); await writeFile(path.join(dir, "0025_renamed.sql"), "select 1;", "utf8"); }],
    ["future-0026", (dir) => writeFile(path.join(dir, "0026_future.sql"), "select 1;", "utf8")],
    ["malformed", (dir) => writeFile(path.join(dir, "025_bad.sql"), "select 1;", "utf8")],
    ["bom-0024", (dir) => writeFile(path.join(dir, "0024_versioned_four_loss_biochemistry_scoring.sql"), Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), migration24Bytes]))],
    ["bom-0025", (dir) => writeFile(path.join(dir, "0025_user_trend_view_preferences.sql"), Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), migration25Bytes]))],
    ["empty-0024", (dir) => writeFile(path.join(dir, "0024_versioned_four_loss_biochemistry_scoring.sql"), utf8NoBom.encode(""))],
    ["empty-0025", (dir) => writeFile(path.join(dir, "0025_user_trend_view_preferences.sql"), utf8NoBom.encode(""))],
    ["marker-0024-validation", (dir) => replaceMarker(dir, "0024_versioned_four_loss_biochemistry_scoring.sql", "validate_biochemistry_v2_scored_snapshot")],
    ["marker-0024-source", (dir) => replaceMarker(dir, "0024_versioned_four_loss_biochemistry_scoring.sql", "HORSE Energy Loss Version 3 no urea or age.xlsx")],
    ["marker-0025-rls", (dir) => replaceMarker(dir, "0025_user_trend_view_preferences.sql", "enable row level security")],
    ["marker-0025-function", (dir) => replaceMarker(dir, "0025_user_trend_view_preferences.sql", "set_default_biochemistry_trend_preference")],
    ["stops-at-0023", async (dir) => { await removeMatching(dir, "0024_"); await removeMatching(dir, "0025_"); }],
    ["remote-claim-duplicate", (dir) => writeFile(path.join(dir, "0025_remote_applied.sql"), "select 1;", "utf8")],
  ];
  for (let index = 0; index < negativeCases.length; index += 1) {
    const [name, mutate] = negativeCases[index];
    check(await runNegativeCase(temporaryRoot, name, mutate), `MIG-${String(index + 20).padStart(3, "0")} ${name} refused`);
  }

  const registered = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", registeredValidatorPath], { cwd: repositoryRoot, encoding: "utf8", windowsHide: true });
  check(registered.status === 0, "MIG-038 registered clean-rebuild validator passes");
  check(registered.stdout.includes("aligned locally through 0025") && registered.stdout.includes("0024 and 0025 are local-only"), "MIG-039 registered ledger diagnostic exact");
  check(registered.stdout.includes("migration chain 0001-0025 local-only") && registered.stdout.includes("applied/remote status was not inspected"), "MIG-040 registered success output exact");
  check(!/applied successfully|remote applied/i.test(registered.stdout), "MIG-041 registered output makes no remote claim");
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
let cleanupAbsent = false;
try { await readFile(temporaryRoot); } catch { cleanupAbsent = true; }
check(cleanupAbsent, "MIG-042 temporary fixture cleanup zero");

assert.equal(passed, 42);
console.log(`Sprint 033B local migration-ledger assertions passed: ${passed}/42.`);
