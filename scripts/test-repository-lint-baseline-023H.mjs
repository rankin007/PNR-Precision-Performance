import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const packTool = join(root, "scripts", "apply-architect-pack.js");
const updaterPath = join(root, "scripts", "update-method.js");
const packPath = join(
  root,
  "planning",
  "architect-packs",
  "architect-pack-023H-repository-lint-baseline-correction-and-combined-closeout.md",
);
const delimiter = "============================================================";
const tempRoot = await mkdtemp(join(tmpdir(), "pnr-023h-"));

try {
  execFileSync(node, ["--check", packTool], { cwd: root, stdio: "pipe" });
  execFileSync(node, ["--check", updaterPath], { cwd: root, stdio: "pipe" });

  const checked = runPack([packPath, "--check"]);
  assert.equal(checked.status, 0);
  assert.match(checked.stdout, /Check passed: 4 FILE section\(s\) valid\./);

  const dryTarget = `planning/reviews/.023h-dry-run-${basename(tempRoot)}.txt`;
  const validPack = join(tempRoot, "valid.md");
  writeFileSync(validPack, pack(dryTarget, "dry-run-only\n"), "utf8");
  const dryRun = runPack([validPack, "--dry-run"]);
  assert.equal(dryRun.status, 0);
  assert.match(dryRun.stdout, /Dry run: no files written\./);
  assert.equal(existsSync(join(root, dryTarget)), false);

  const malformed = join(tempRoot, "malformed.md");
  writeFileSync(malformed, `${delimiter}\nFILE: ${dryTarget}\nnot-a-delimiter\nbody\n`, "utf8");
  assertSafeFailure(malformed, /Malformed FILE section/);

  const traversal = join(tempRoot, "traversal.md");
  writeFileSync(traversal, pack("../outside-023h.txt", "blocked\n"), "utf8");
  assertSafeFailure(traversal, /outside the project root/);

  const absoluteTarget = join(tempRoot, "absolute.md");
  writeFileSync(absoluteTarget, pack(join(tempRoot, "outside.txt"), "blocked\n"), "utf8");
  assertSafeFailure(absoluteTarget, /Absolute paths are not allowed/);
  assert.equal(existsSync(join(tempRoot, "outside.txt")), false);

  let fetchCalls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => {
    fetchCalls += 1;
    throw new Error("require must not fetch");
  };
  const require = createRequire(import.meta.url);
  const updater = require(updaterPath);
  globalThis.fetch = originalFetch;
  assert.equal(fetchCalls, 0);

  for (const name of ["run", "diffManifest", "inferFolderMode", "planHeal", "findProjectRoot"])
    assert.equal(typeof updater[name], "function", `${name} export missing`);
  for (const name of [
    "DEFAULT_METHOD_SOURCE",
    "STATUS_SEED",
    "OLD_PROMPT_NAME",
    "CANONICAL_PROMPT_NAME",
    "STATUS_PATH",
    "EXISTING_PROJECT_SPRINT_FOLDER",
  ]) assert.equal(typeof updater[name], "string", `${name} constant missing`);

  assert.deepEqual(
    updater.diffManifest(
      { files: { "a.md": "same", "b.md": "new" }, changelog: [{ version: 3 }, { version: 2 }] },
      { "a.md": "same", "b.md": "old" },
      2,
    ),
    { behind: true, changedFiles: ["b.md"], newChangelog: [{ version: 3 }] },
  );
  assert.equal(
    updater.inferFolderMode({ manifestMode: null, oldPromptExists: true, existingSprintFolderExists: false }),
    "existing-project",
  );
  assert.deepEqual(
    updater.planHeal({ mode: "existing-project", canonicalPromptExists: false, oldPromptExists: true, statusExists: true }),
    { copyPrompt: true, seedStatus: false },
  );

  execFileSync(node, ["scripts/validate-biochemistry-recommendations.ts"], {
    cwd: root,
    stdio: "pipe",
  });

  const sources = [packTool, updaterPath].map((path) => readFileSync(path, "utf8"));
  const suppressions = sources.flatMap((source) =>
    source.match(/eslint-disable-next-line @typescript-eslint\/no-require-imports --[^\r\n]+/g) ?? [],
  );
  assert.equal(suppressions.length, 5);
  assert.equal(sources.some((source) => /eslint-disable(?!-next-line)/.test(source)), false);
  assert.equal(sources.join("\n").match(/\brequire\("(?:fs|path|crypto)"\)/g)?.length, 5);

  console.log("Sprint 023H repository lint baseline behavior proof passed.");
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

function pack(target, body) {
  return `${delimiter}\nFILE: ${target}\n${delimiter}\n\n${body}`;
}

function runPack(args) {
  return spawnSync(node, [packTool, ...args], { cwd: root, encoding: "utf8" });
}

function assertSafeFailure(path, message) {
  const result = runPack([path, "--check"]);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, message);
}
