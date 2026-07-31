#!/usr/bin/env node
import { open, readFile, rename, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { createLedger, sanitizeReport } from "./protected-single-run-035H-core.mjs";

const EXPECTED_BRANCH = "codex/035H-protected-single-run-authentication-acceptance-harness";
const EXPECTED_PROJECT = "uvskssaecdhxcgytkasc";
const EXPECTED_PREVIEW = "https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app";
const mode = process.argv[2];
if (!["--readiness", "--live", "--recover"].includes(mode)) throw new Error("MODE_REFUSED");

async function git(...args) {
  const { execFile } = await import("node:child_process");
  return new Promise((ok, fail) => execFile("git", args, { encoding: "utf8" }, (e, out) => e ? fail(new Error("SOURCE_REFUSED")) : ok(out.trim())));
}

async function atomicWrite(path, value) {
  const tmp = `${path}.new`;
  const handle = await open(tmp, "wx", 0o600);
  try { await handle.writeFile(JSON.stringify(value)); await handle.sync(); } finally { await handle.close(); }
  await rename(tmp, path);
  const parent = await open(dirname(path), "r");
  try { await parent.sync(); } finally { await parent.close(); }
}

async function preflight() {
  if (await git("branch", "--show-current") !== EXPECTED_BRANCH) throw new Error("SOURCE_REFUSED");
  const conflicts = await git("diff", "--name-only", "--diff-filter=U");
  if (conflicts) throw new Error("SOURCE_REFUSED");
  return true;
}

await preflight();
const ledgerPath = resolve(".codex-temp", "035H-single-run-ledger.json");
if (mode === "--readiness") {
  const mailboxAuthority = process.env.PP035H_SECURE_MAILBOX_ADAPTER === "windows-credential-manager-readonly-v1";
  process.stdout.write(sanitizeReport({ outcome: mailboxAuthority ? "protected-single-run-readiness-blocked-clean" : "protected-mailbox-automation-authority-pending-clean", mode: "no-send", ready: false, requestCount: 0, verificationCount: 0, mailbox: mailboxAuthority ? "adapter-not-implemented" : "authority-pending", authentication: "not-attempted", session: "not-established", permission: "not-tested", cleanup: { application: 0, auth: 0, storage: 0, authLast: true, ledgerAbsent: true }, invariants: { noPreparation: true, noSend: true, noVerification: true } }) + "\n");
  process.exit(3);
}
if (mode === "--live") throw new Error("LIVE_GATE_REFUSED");
try { await readFile(ledgerPath, "utf8"); throw new Error("RECOVERY_ADAPTER_REQUIRED"); } catch (error) { if (error.code !== "ENOENT") throw error; }
await rm(`${ledgerPath}.new`, { force: true });
void atomicWrite; void createLedger; void EXPECTED_PROJECT; void EXPECTED_PREVIEW;
process.stdout.write(sanitizeReport({ outcome: "protected-single-run-readiness-blocked-clean", mode: "recovery", ready: false, requestCount: 0, verificationCount: 0, mailbox: "not-accessed", authentication: "not-attempted", session: "not-established", permission: "not-tested", cleanup: { application: 0, auth: 0, storage: 0, authLast: true, ledgerAbsent: true }, invariants: { noPreparation: true, noSend: true, noVerification: true } }) + "\n");
