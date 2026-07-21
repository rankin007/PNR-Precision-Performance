import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const validator = fileURLToPath(new URL("./validate-json-files.mjs", import.meta.url));
const fixtureRoot = await mkdtemp(join(tmpdir(), "pp-json-validator-"));
const secretMarker = "SOURCE_CONTENT_MUST_NOT_APPEAR";

function run(paths) {
  return spawnSync(process.execPath, [validator, ...paths], { encoding: "utf8" });
}

try {
  const objectPath = join(fixtureRoot, "valid object.json");
  const arrayPath = join(fixtureRoot, "valid-array.json");
  const bomPath = join(fixtureRoot, "bom.json");
  const lockShapePath = join(fixtureRoot, "lock [shape] Ω.json");
  const invalidPath = join(fixtureRoot, "invalid.json");
  const missingPath = join(fixtureRoot, "missing.json");

  await writeFile(objectPath, '{"ok":true}', "utf8");
  await writeFile(arrayPath, "[1,2,3]", "utf8");
  await writeFile(bomPath, '\uFEFF{"bom":true}', "utf8");
  await writeFile(lockShapePath, '{"packages":{"":{"name":"root"},"node_modules/a":{"name":"a"}},"dependencies":{"a":{"version":"1.0.0"}}}', "utf8");
  await writeFile(invalidPath, `{"safe":"${secretMarker}",}`, "utf8");

  const valid = run([objectPath, arrayPath, bomPath, lockShapePath]);
  assert.equal(valid.status, 0);
  assert.match(valid.stdout, /JSON validation passed: 4 file\(s\)\./);

  const invalid = run([invalidPath]);
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /invalid\.json: invalid JSON syntax/);
  assert.doesNotMatch(invalid.stderr, new RegExp(secretMarker));

  const missing = run([missingPath]);
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /missing\.json: file not found/);

  const empty = run([]);
  assert.notEqual(empty.status, 0);
  assert.match(empty.stderr, /no JSON paths supplied/);

  console.log("JSON validator self-test passed: 8 cases.");
} finally {
  await rm(fixtureRoot, { recursive: true, force: true });
}
