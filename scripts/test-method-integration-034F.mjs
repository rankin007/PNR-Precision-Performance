import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const base = "5a70b6a9876e699eac2ab44f472c361e37bc2595";
const manifest = JSON.parse(readFileSync(join(root, ".120x", "method-manifest.json"), "utf8"));
const continuityManifest = JSON.parse(execFileSync("git", ["show", "3dce7add2909fe4f6c0fbf6244c49611e3f6347b:.120x/method-manifest.json"], { cwd: root, encoding: "utf8" }));
let assertions = 0;
const check = (condition, message) => { assertions += 1; assert.ok(condition, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };

equal(manifest.version, 18, "method version");
equal(manifest.mode, "new-project", "direct-root delivery-layout mode");
equal(Object.keys(manifest.files).length, 29, "manifest entry count");
equal(Object.keys(manifest.localCorrections || {}).length, 8, "local correction count");
const currentPaths = Object.keys(manifest.files).sort();
const continuityPaths = Object.keys(continuityManifest.files).sort();
equal(continuityPaths.length, 29, "continuity manifest entry count");
equal(JSON.stringify(currentPaths), JSON.stringify(continuityPaths), "continuity/current manifest path-set drift");
const manifestDelta = currentPaths.filter((path) => manifest.files[path] !== continuityManifest.files[path]).sort();
const correctionPaths = Object.keys(manifest.localCorrections || {}).sort();
equal(manifestDelta.length, 8, "continuity/current manifest delta count");
equal(JSON.stringify(manifestDelta), JSON.stringify(correctionPaths), "localCorrections do not equal exact continuity/current hash delta");
equal(manifestDelta.filter((path) => path.startsWith(".claude/commands/")).length, 2, "transformed source-absent Claude launcher count");
equal(manifestDelta.filter((path) => !path.startsWith(".claude/commands/")).length, 6, "Git-derived local transformation count");
for (const [relativePath, expectedHash] of Object.entries(manifest.files)) {
  const absolutePath = join(root, relativePath);
  check(existsSync(absolutePath), `manifest file missing: ${relativePath}`);
  equal(sha256(readFileSync(absolutePath)), expectedHash, `manifest hash mismatch: ${relativePath}`);
}
for (const [relativePath, expectedHash] of Object.entries(manifest.localCorrections || {})) {
  equal(manifest.files[relativePath], expectedHash, `local correction not stamped in manifest: ${relativePath}`);
  equal(sha256(readFileSync(join(root, relativePath))), expectedHash, `local correction hash mismatch: ${relativePath}`);
}

const agents = readFileSync(join(root, "AGENTS.md"), "utf8");
check(agents.includes("PNR Precision Performance Canonical"), "canonical guard path missing");
check(agents.includes("Evidence-Proportional Execution Standard"), "execution standard missing");
check(agents.includes("Inside an active 120x Fly"), "AGENTS Fly authority clarification missing");
const architectStarter = readFileSync(join(root, "architect-chat-starter-prompt.md"), "utf8");
check(architectStarter.includes("034F"), "current Architect starter lacks 034F context");
check(architectStarter.includes("034G"), "current Architect starter lacks next-slice context");
const identity = readFileSync(join(root, "templates", "method", "120x-agent-identity.md"), "utf8");
const methodStarter = readFileSync(join(root, "templates", "method", "120x-architect-builder-method-starter.md"), "utf8");
const flyDoctrine = readFileSync(join(root, "templates", "method", "120x-fly.md"), "utf8");
const builderSkill = readFileSync(join(root, ".agents", "skills", "120x-builder", "SKILL.md"), "utf8");
const flySkill = readFileSync(join(root, ".agents", "skills", "120x-fly", "SKILL.md"), "utf8");
const claudeBuild = readFileSync(join(root, ".claude", "commands", "build.md"), "utf8");
const claudeFly = readFileSync(join(root, ".claude", "commands", "fly.md"), "utf8");
check(identity.includes("The class-scaled Fly exception"), "identity class-scaled authority missing");
check(!identity.includes("genuinely fresh Architect's `pass` on the exact Builder plan is the approval"), "stale identity Fly authorization remained");
check(methodStarter.includes("detailed Fly\ndoctrine controls the class-scaled authority transition"), "method starter class-scaled authority missing");
check(flyDoctrine.includes("Build under class-scaled authority"), "class-scaled build authority missing");
check(flyDoctrine.includes("the human's `go` plus the\napplied sprint authority permits implementation"), "local/cross-layer authority missing");
check(builderSkill.includes("Active Fly exception"), "Builder skill Fly exception missing");
check(flySkill.includes("class-scaled, independently reviewed"), "Fly skill description remained stale");
check(claudeBuild.includes("## Active Fly exception"), "Claude Builder Fly exception missing");
check(claudeFly.includes("class-scaled authority transition"), "Claude Fly authority remained stale");
for (const path of [
  ".agents/skills/120x-architect/SKILL.md",
  ".agents/skills/120x-builder/SKILL.md",
  ".agents/skills/120x-fly/SKILL.md",
  ".agents/skills/120x-fly-lean/SKILL.md",
  ".agents/skills/120x-onboard/SKILL.md",
]) check(readFileSync(join(root, path), "utf8").startsWith("---"), `invalid skill frontmatter: ${path}`);

let importFetches = 0;
const originalFetch = globalThis.fetch;
globalThis.fetch = () => { importFetches += 1; throw new Error("module import must not fetch"); };
const require = createRequire(import.meta.url);
const updater = require(join(root, "scripts", "update-method.js"));
globalThis.fetch = originalFetch;
equal(importFetches, 0, "updater import network calls");
check(updater.isSafeWorkspaceBasename("precision-performance"), "safe workspace rejected");
check(!updater.isSafeWorkspaceBasename("../escape"), "unsafe workspace accepted");
check(updater.isSafeRootFlyLauncherPath(".agents/skills/120x-fly/SKILL.md"), "safe root launcher rejected");
check(!updater.isSafeRootFlyLauncherPath("../120x-fly/SKILL.md"), "traversal launcher accepted");

const tempRoot = mkdtempSync(join(tmpdir(), "pnr-034f-method-"));
try {
  mkdirSync(join(tempRoot, ".120x"), { recursive: true });
  writeFileSync(join(tempRoot, ".120x", "method-manifest.json"), `${JSON.stringify({ version: 18, mode: "new-project", source: "https://method.invalid", files: {} }, null, 2)}\n`);
  let fetchCalls = 0;
  const runResult = await updater.run({
    cwd: tempRoot,
    fetchImpl: async (url) => {
      fetchCalls += 1;
      check(String(url).includes("mode=new-project"), "updater mode query missing");
      return { ok: true, json: async () => ({ contract: "placement-v1", version: 18, released: "2026-08-09", files: {}, contents: {}, changelog: [] }) };
    },
    log: () => {},
  });
  equal(fetchCalls, 1, "updater fetch count");
  check(runResult.upToDate, "empty current method should be up to date");

  const correctedPath = "templates/method/local-correction.md";
  const correctedContent = "corrected local doctrine\n";
  const staleContent = "stale upstream doctrine\n";
  const correctedHash = sha256(correctedContent);
  mkdirSync(join(tempRoot, "templates", "method"), { recursive: true });
  writeFileSync(join(tempRoot, correctedPath), correctedContent);
  writeFileSync(join(tempRoot, ".120x", "method-manifest.json"), JSON.stringify({ version: 18, mode: "new-project", source: "https://method.invalid", files: { [correctedPath]: correctedHash }, localCorrections: { [correctedPath]: correctedHash } }, null, 2) + "\n");
  const guardedResult = await updater.run({
    cwd: tempRoot,
    fetchImpl: async () => ({ ok: true, json: async () => ({ contract: "placement-v1", version: 18, released: "2026-08-09", files: { [correctedPath]: sha256(staleContent) }, contents: { [correctedPath]: staleContent }, changelog: [] }) }),
    log: () => {},
  });
  check(guardedResult.upToDate, "same-version upstream should retain a declared local correction");
  equal(readFileSync(join(tempRoot, correctedPath), "utf8"), correctedContent, "same-version upstream reverted local correction");

  const futureContent = "future upstream doctrine\n";
  const futureResult = await updater.run({
    cwd: tempRoot,
    fetchImpl: async () => ({ ok: true, json: async () => ({ contract: "placement-v1", version: 19, released: "2026-08-18", files: { [correctedPath]: sha256(futureContent) }, contents: { [correctedPath]: futureContent }, changelog: [] }) }),
    log: () => {},
  });
  check(!futureResult.upToDate, "future method version was incorrectly blocked by local correction");
  equal(futureResult.refreshed, 1, "future method version refresh count");
  equal(readFileSync(join(tempRoot, correctedPath), "utf8"), futureContent, "future method version did not supersede local correction");
  const futureManifest = JSON.parse(readFileSync(join(tempRoot, ".120x", "method-manifest.json"), "utf8"));
  equal(futureManifest.version, 19, "future method version was not stamped");
  check(!Object.prototype.hasOwnProperty.call(futureManifest, "localCorrections"), "future method version retained obsolete localCorrections");

  const importer = join(tempRoot, "scripts", "apply-architect-pack.js");
  mkdirSync(dirname(importer), { recursive: true });
  copyFileSync(join(root, "scripts", "apply-architect-pack.js"), importer);
  const safePack = join(tempRoot, "safe-pack.md");
  writeFileSync(safePack, pack("planning/sprints/test/safe.md", "safe\n"));
  const dryRun = run(importer, [safePack, "--dry-run"], tempRoot);
  equal(dryRun.status, 0, "safe Pack dry-run status");
  check(dryRun.stdout.includes("would be created: planning/sprints/test/safe.md"), "safe Pack dry-run target");
  check(!existsSync(join(tempRoot, "planning", "sprints", "test", "safe.md")), "dry-run wrote a file");
  const apply = run(importer, [safePack], tempRoot);
  equal(apply.status, 0, "safe Pack apply status");
  equal(readFileSync(join(tempRoot, "planning", "sprints", "test", "safe.md"), "utf8"), "safe\n", "safe Pack content");
  for (const [name, target, message] of [
    ["traversal", "../outside.md", "outside the project root"],
    ["absolute", "C:/outside.md", "Absolute paths are not allowed"],
    ["protected", ".gitignore", "Protected file cannot be overwritten"],
  ]) {
    const invalidPack = join(tempRoot, `${name}.md`);
    writeFileSync(invalidPack, pack(target, "blocked\n"));
    const invalid = run(importer, [invalidPack, "--dry-run"], tempRoot);
    check(invalid.status !== 0, `${name} Pack unexpectedly passed`);
    check(invalid.stderr.includes(message), `${name} Pack failure mismatch`);
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

for (const path of [".claude/local-setting.json", ".codex_work/placeholder", "supabase/.temp/placeholder", "supabase/.branches/placeholder"]) {
  equal(runGit(["check-ignore", "-q", "--", path]).status, 0, `expected ignored path: ${path}`);
}
for (const path of ["architect.md", "build.md", "update.md", "onboard.md", "fly.md", "fly-lean.md"]) {
  check(runGit(["check-ignore", "-q", "--", `.claude/commands/${path}`]).status !== 0, `method command remained ignored: ${path}`);
}

const excludedDiff = execFileSync("git", ["diff", "--name-only", base, "--", "app", "components", "content", "lib", "public", "supabase", "package.json", "package-lock.json", "next.config.ts", "vercel.json"], { cwd: root, encoding: "utf8" }).trim();
equal(excludedDiff, "", "Product/database/dependency/configuration drift");
equal(execFileSync("git", ["ls-files", "--", "delivery_road_map.docx"], { cwd: root, encoding: "utf8" }).trim(), "", "excluded DOCX entered index");
equal(execFileSync("git", ["diff", "--name-only", "--", "delivery_road_map.docx"], { cwd: root, encoding: "utf8" }).trim(), "", "excluded DOCX entered diff");

console.log(`METHOD_INTEGRATION_034F assertions=${assertions} failures=0 manifest_entries=${Object.keys(manifest.files).length} product_drift=0 docx_index=0`);

function sha256(content) { return createHash("sha256").update(content).digest("hex"); }
function pack(target, body) { return `============================================================\nFILE: ${target}\n============================================================\n\n${body}`; }
function run(importer, args, cwd) { return spawnSync(node, [importer, ...args], { cwd, encoding: "utf8" }); }
function runGit(args) { return spawnSync("git", args, { cwd: root, encoding: "utf8" }); }
