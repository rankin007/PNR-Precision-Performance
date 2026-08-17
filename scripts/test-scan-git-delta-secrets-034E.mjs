#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scanner = resolve(dirname(fileURLToPath(import.meta.url)), "scan-git-delta-secrets-034E.mjs");
let passed = 0;
let failed = 0;

function expect(condition, category) {
  if (!condition) throw new Error(category);
}

function command(commandName, args, cwd) {
  const result = spawnSync(commandName, args, {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error || result.status !== 0) throw new Error("fixture-command-failed");
  return result.stdout.trim();
}

function createRepository() {
  const root = mkdtempSync(join(tmpdir(), "pp-034e-scanner-"));
  command("git", ["init", "--quiet"], root);
  command("git", ["config", "user.email", "scanner-test@example.invalid"], root);
  command("git", ["config", "user.name", "Scanner Test"], root);
  writeFileSync(join(root, "baseline.txt"), "baseline\n", "utf8");
  command("git", ["add", "--", "baseline.txt"], root);
  command("git", ["commit", "--quiet", "-m", "baseline"], root);
  return { root, base: command("git", ["rev-parse", "HEAD"], root) };
}

function withRepository(callback) {
  const fixture = createRepository();
  try {
    callback(fixture);
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
}

function writeFixture(root, path, content, encoding = undefined) {
  const target = join(root, ...path.split("/"));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, encoding);
}

function commitAll(root, message = "fixture") {
  command("git", ["add", "--all"], root);
  command("git", ["commit", "--quiet", "-m", message], root);
  return command("git", ["rev-parse", "HEAD"], root);
}

function runScanner(root, args) {
  const result = spawnSync(process.execPath, [scanner, ...args], {
    cwd: root,
    encoding: "utf8",
    windowsHide: true,
  });
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    combined: `${result.stdout ?? ""}${result.stderr ?? ""}`,
  };
}

function test(name, callback) {
  const id = passed + failed + 1;
  try {
    callback();
    passed += 1;
    console.log(`TEST_PASS ${id} ${name}`);
  } catch (error) {
    failed += 1;
    const category = error instanceof Error ? error.message.replace(/[^A-Za-z0-9_-]/g, "-") : "unknown";
    console.error(`TEST_FAIL ${id} ${name} category=${category}`);
  }
}

function syntheticPat() {
  return ["gh", "p_", "A".repeat(32)].join("");
}

function syntheticPrivateKey() {
  return ["-----BEGIN ", "PRIVATE KEY-----\n", "Q".repeat(64), "\n-----END ", "PRIVATE KEY-----\n"].join("");
}

function syntheticDatabaseUrl() {
  return ["postgres", "ql://", "fixture-user", ":", "fixture-password", "@", "example.invalid", "/fixture"].join("");
}

function extendedTokenFixtures() {
  return [
    ["github-fine-grained", "github-fine-grained-token", ["github", "_pat_", "B".repeat(40)].join("")],
    ["supabase-modern", "supabase-secret", ["sb", "_secret_", "C".repeat(32)].join("")],
    ["supabase-legacy", "supabase-secret", ["sb", "p_", "D".repeat(32)].join("")],
    ["resend", "resend-token", ["r", "e_", "E".repeat(32)].join("")],
    ["stripe-webhook", "stripe-webhook-secret", ["wh", "sec_", "F".repeat(32)].join("")],
    ["stripe-restricted", "stripe-restricted-secret", ["rk", "_live_", "G".repeat(32)].join("")],
    ["service-jwt", "service-jwt", ["eyJ", "H".repeat(18), ".", "I".repeat(24), ".", "J".repeat(32)].join("")],
  ];
}


test("invalid-invocation-fails-closed", () => {
  const result = runScanner(process.cwd(), []);
  expect(result.status !== 0 && result.stderr.includes("category=invalid-invocation"), "invalid-invocation-not-refused");
});

test("protected-filename-detected", () => withRepository(({ root, base }) => {
  writeFixture(root, ".env", "PUBLIC_VALUE=example\n", "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 2 && result.combined.includes("category=protected-env-file"), "protected-filename-not-detected");
}));

test("placeholder-example-inspected-and-accepted", () => withRepository(({ root, base }) => {
  writeFixture(root, ".env.example", "API_TOKEN=YOUR_TOKEN_HERE\nNEXT_PUBLIC_SITE_URL=http://localhost:3000\n", "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 0 && result.stdout.includes("findings=0") && result.stdout.includes("text=1"), "placeholder-example-refused");
}));

test("synthetic-pat-detected", () => withRepository(({ root, base }) => {
  writeFixture(root, "fixture.txt", `${syntheticPat()}\n`, "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 2 && result.combined.includes("category=github-token"), "pat-not-detected");
}));

test("synthetic-pat-not-disclosed-on-stdout-or-stderr", () => withRepository(({ root, base }) => {
  const value = syntheticPat();
  writeFixture(root, "fixture.txt", `${value}\n`, "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(!result.stdout.includes(value) && !result.stderr.includes(value), "pat-disclosed");
}));

test("synthetic-private-key-detected", () => withRepository(({ root, base }) => {
  writeFixture(root, "fixture.txt", syntheticPrivateKey(), "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 2 && result.combined.includes("category=private-key"), "private-key-not-detected");
}));

test("synthetic-private-key-not-disclosed-on-stdout-or-stderr", () => withRepository(({ root, base }) => {
  const value = syntheticPrivateKey();
  writeFixture(root, "fixture.txt", value, "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(!result.stdout.includes(value) && !result.stderr.includes(value), "private-key-disclosed");
}));

test("synthetic-database-url-detected", () => withRepository(({ root, base }) => {
  writeFixture(root, "fixture.txt", `${syntheticDatabaseUrl()}\n`, "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 2 && result.combined.includes("category=database-credential-url"), "database-url-not-detected");
}));

test("synthetic-database-url-not-disclosed-on-stdout-or-stderr", () => withRepository(({ root, base }) => {
  const value = syntheticDatabaseUrl();
  writeFixture(root, "fixture.txt", `${value}\n`, "utf8");
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(!result.stdout.includes(value) && !result.stderr.includes(value), "database-url-disclosed");
}));

for (const [label, category, value] of extendedTokenFixtures()) {
  test(`extended-${label}-detected-without-disclosure`, () => withRepository(({ root, base }) => {
    writeFixture(root, "fixture.txt", `${value}\n`, "utf8");
    const head = commitAll(root);
    const result = runScanner(root, ["--range", base, head]);
    expect(result.status === 2 && result.combined.includes(`category=${category}`), `${label}-not-detected`);
    expect(!result.stdout.includes(value) && !result.stderr.includes(value), `${label}-disclosed`);
  }));
}


test("staged-mode-ignores-untracked-content", () => withRepository(({ root }) => {
  writeFixture(root, "safe-staged.txt", "safe\n", "utf8");
  command("git", ["add", "--", "safe-staged.txt"], root);
  writeFixture(root, "untracked-fixture.txt", `${syntheticPat()}\n`, "utf8");
  const result = runScanner(root, ["--staged"]);
  expect(result.status === 0 && result.stdout.includes("entries=1") && !result.combined.includes("untracked-fixture.txt"), "staged-isolation-failed");
}));

test("staged-mode-detects-selected-credential", () => withRepository(({ root }) => {
  writeFixture(root, "selected-fixture.txt", `${syntheticPat()}\n`, "utf8");
  command("git", ["add", "--", "selected-fixture.txt"], root);
  const result = runScanner(root, ["--staged"]);
  expect(result.status === 2 && result.combined.includes("category=github-token"), "staged-credential-not-detected");
}));

test("expected-evidence-png-and-jpeg-accepted", () => withRepository(({ root, base }) => {
  writeFixture(root, "evidence/fixture/image.png", Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]));
  writeFixture(root, "evidence/fixture/image.jpg", Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]));
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 0 && result.stdout.includes("expected_images=2") && result.stdout.includes("findings=0"), "expected-images-refused");
}));

test("unknown-binary-fails-closed", () => withRepository(({ root, base }) => {
  writeFixture(root, "fixture.bin", Buffer.from([0x00, 0x01, 0x02, 0x03, 0x00]));
  const head = commitAll(root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 2 && result.combined.includes("category=unknown-binary"), "unknown-binary-accepted");
}));

test("executable-binary-fails-closed", () => withRepository(({ root, base }) => {
  writeFixture(root, "fixture.bin", Buffer.from([0x00, 0x01, 0x02, 0x03, 0x00]));
  chmodSync(join(root, "fixture.bin"), 0o755);
  command("git", ["add", "--", "fixture.bin"], root);
  command("git", ["update-index", "--chmod=+x", "--", "fixture.bin"], root);
  command("git", ["commit", "--quiet", "-m", "fixture"], root);
  const head = command("git", ["rev-parse", "HEAD"], root);
  const result = runScanner(root, ["--range", base, head]);
  expect(result.status === 2 && result.combined.includes("category=executable-binary"), "executable-binary-accepted");
}));

console.log(`TEST_SUMMARY passed=${passed} failed=${failed}`);
if (failed > 0 || passed !== 21) process.exitCode = 1;
