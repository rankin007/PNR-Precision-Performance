#!/usr/bin/env node

import { createHash, randomBytes } from "node:crypto";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const REF = "uvskssaecdhxcgytkasc";
const LEDGER = join(tmpdir(), "pnr-035d-synthetic-otp-owned.json");
const RUN_PATTERN = /^035D-[A-Z0-9-]{8,48}$/;
const SAFE_CODES = new Set([
  "PREPARATION_RESERVATION_FAILED", "AUTH_CREATE_FAILED", "AUTH_CREATE_ROLLED_BACK",
  "OWNERSHIP_VERIFY_ROLLED_BACK", "LEDGER_FINALIZE_ROLLED_BACK",
  "PREPARATION_RECOVERY_REQUIRED", "PREEXISTING_IDENTITY_REFUSED",
  "OPEN_LEDGER_REFUSED", "OWNERSHIP_AMBIGUOUS", "PROTECTED_CONFIG_MISSING",
  "TARGET_REFUSED", "HIDDEN_INPUT_UNAVAILABLE", "INPUT_CANCELLED",
  "AUTH_SEARCH_FAILED", "AUTH_SEARCH_BOUNDED", "AUTH_DELETE_FAILED",
  "AUTH_DELETE_VERIFY_FAILED", "OWNERSHIP_LEDGER_MISSING", "OWNERSHIP_LEDGER_REFUSED",
  "SELF_TEST_FAILED", "UNEXPECTED"
]);

function fail(code) { const error = new Error(code); error.code = code; throw error; }
export function normalizeExactEmail(value) { return typeof value === "string" ? value.trim().toLowerCase() : ""; }
export function exactEmailMatch(left, right) { return normalizeExactEmail(left) === normalizeExactEmail(right); }
export function emailHash(value) { return createHash("sha256").update(normalizeExactEmail(value)).digest("hex"); }
export function preparationMutation(email, run) {
  if (!email.includes("+") || !email.includes("@") || !RUN_PATTERN.test(run)) fail("PREPARATION_INPUT_REFUSED");
  return { email, email_confirm: true, user_metadata: { synthetic_run: run, synthetic_purpose: "035D-email-otp" } };
}
export function sanitizedReport(state, extra = {}) { return { helper: "035D-synthetic-otp", state, ...extra }; }
function safeCode(error) { const code = error?.code || error?.message; return SAFE_CODES.has(code) ? code : "UNEXPECTED"; }

function config() {
  const url = process.env.PP035D_SUPABASE_URL;
  const service = process.env.PP035D_SERVICE_ROLE_KEY;
  const run = process.env.PP035D_RUN;
  if (!url || !service || !RUN_PATTERN.test(run || "")) fail("PROTECTED_CONFIG_MISSING");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== `${REF}.supabase.co` || parsed.pathname !== "/") fail("TARGET_REFUSED");
  return { url, service, run };
}

async function hiddenEmail() {
  if (!process.stdin.isTTY || !process.stdout.isTTY || typeof process.stdin.setRawMode !== "function") fail("HIDDEN_INPUT_UNAVAILABLE");
  process.stdout.write("Protected synthetic plus-address: ");
  process.stdin.setRawMode(true); process.stdin.resume(); process.stdin.setEncoding("utf8");
  let value = "";
  try {
    return await new Promise((resolve, reject) => {
      const onData = chunk => { for (const character of chunk) {
        if (character === "\u0003") { process.stdin.off("data", onData); reject(Object.assign(new Error("INPUT_CANCELLED"), { code: "INPUT_CANCELLED" })); return; }
        if (character === "\r" || character === "\n") { process.stdin.off("data", onData); process.stdout.write("\n"); resolve(value.trim()); return; }
        if (character === "\u007f" || character === "\b") value = value.slice(0, -1); else if (character >= " ") value += character;
      }};
      process.stdin.on("data", onData);
    });
  } finally { value = ""; process.stdin.setRawMode(false); process.stdin.pause(); }
}

async function allUsers(admin) {
  const records = [];
  for (let page = 1; page <= 20; page += 1) {
    const result = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (result.error) fail("AUTH_SEARCH_FAILED");
    records.push(...result.data.users);
    if (result.data.users.length < 1000) return records;
  }
  fail("AUTH_SEARCH_BOUNDED");
}

function atomicWrite(path, value) {
  const pending = `${path}.${process.pid}.${randomBytes(4).toString("hex")}.pending`;
  try { writeFileSync(pending, `${JSON.stringify(value)}\n`, { encoding: "utf8", flag: "wx", mode: 0o600 }); renameSync(pending, path); }
  catch (error) { if (existsSync(pending)) unlinkSync(pending); throw error; }
}

const realLedger = {
  exists: () => existsSync(LEDGER),
  read: () => JSON.parse(readFileSync(LEDGER, "utf8")),
  write: value => atomicWrite(LEDGER, value),
  remove: () => { if (existsSync(LEDGER)) unlinkSync(LEDGER); }
};

function ownedMatches(users, email, run) {
  return users.filter(user => exactEmailMatch(user.email, email) && user.user_metadata?.synthetic_run === run);
}

async function preserveRecovery({ ledger, project, run, hash, identity }) {
  try {
    ledger.write({ project, run, authId: identity.id, emailHash: hash, createdWithoutEmail: true, state: "recovery" });
  } catch {}
  return sanitizedReport("failed-sanitized", { code: "PREPARATION_RECOVERY_REQUIRED", auth: 1, preparationEmailSent: false, confirmed: true, ownership: "ambiguous" });
}

async function rollbackCreated({ admin, ledger, identity, email, run, hash, successCode }) {
  try {
    const removed = await admin.auth.admin.deleteUser(identity.id, false);
    if (removed.error) throw Object.assign(new Error("AUTH_DELETE_FAILED"), { code: "AUTH_DELETE_FAILED" });
    const remaining = ownedMatches(await allUsers(admin), email, run).filter(user => user.id === identity.id);
    if (remaining.length !== 0) throw Object.assign(new Error("AUTH_DELETE_VERIFY_FAILED"), { code: "AUTH_DELETE_VERIFY_FAILED" });
    ledger.remove();
    return sanitizedReport("failed-sanitized", { code: successCode, auth: 0, preparationEmailSent: false, confirmed: false, ownership: "none" });
  } catch {
    return preserveRecovery({ ledger, project: REF, run, hash, identity });
  }
}

export async function prepareWithAdapters({ email, run, admin, ledger }) {
  if (ledger.exists()) return sanitizedReport("blocked", { code: "OPEN_LEDGER_REFUSED", auth: 0, preparationEmailSent: false, confirmed: false, ownership: "ambiguous" });
  const mutation = preparationMutation(email, run);
  const hash = emailHash(email);
  const before = await allUsers(admin);
  if (before.some(user => exactEmailMatch(user.email, email))) return sanitizedReport("failed-sanitized", { code: "PREEXISTING_IDENTITY_REFUSED", auth: 0, preparationEmailSent: false, confirmed: false, ownership: "none" });
  try { ledger.write({ project: REF, run, emailHash: hash, state: "preparing" }); }
  catch { return sanitizedReport("failed-sanitized", { code: "PREPARATION_RESERVATION_FAILED", auth: 0, preparationEmailSent: false, confirmed: false, ownership: "none" }); }

  let identity = null;
  const created = await admin.auth.admin.createUser(mutation);
  if (!created.error && created.data.user?.email_confirmed_at) identity = created.data.user;
  if (!identity) {
    const possible = ownedMatches(await allUsers(admin), email, run);
    if (possible.length === 0) {
      ledger.remove();
      return sanitizedReport("failed-sanitized", { code: "AUTH_CREATE_FAILED", auth: 0, preparationEmailSent: false, confirmed: false, ownership: "none" });
    }
    if (possible.length === 1) return rollbackCreated({ admin, ledger, identity: possible[0], email, run, hash, successCode: "AUTH_CREATE_ROLLED_BACK" });
    return sanitizedReport("failed-sanitized", { code: "PREPARATION_RECOVERY_REQUIRED", auth: 1, preparationEmailSent: false, confirmed: false, ownership: "ambiguous" });
  }

  const exact = ownedMatches(await allUsers(admin), email, run);
  if (exact.length !== 1 || exact[0].id !== identity.id || emailHash(exact[0].email) !== hash) {
    return rollbackCreated({ admin, ledger, identity, email, run, hash, successCode: "OWNERSHIP_VERIFY_ROLLED_BACK" });
  }
  try {
    ledger.write({ project: REF, run, authId: identity.id, emailHash: hash, createdWithoutEmail: true, state: "prepared" });
  } catch {
    return rollbackCreated({ admin, ledger, identity, email, run, hash, successCode: "LEDGER_FINALIZE_ROLLED_BACK" });
  }
  return sanitizedReport("prepared", { auth: 1, preparationEmailSent: false, confirmed: true, ownership: "exact-owned" });
}

async function prepare() {
  const protectedConfig = config(); let email = await hiddenEmail();
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  try { process.stdout.write(`${JSON.stringify(await prepareWithAdapters({ email, run: protectedConfig.run, admin, ledger: realLedger }))}\n`); }
  finally { email = ""; protectedConfig.service = null; delete process.env.PP035D_SERVICE_ROLE_KEY; }
}

export async function cleanupWithAdapters({ admin, ledger, run }) {
  if (!ledger.exists()) return sanitizedReport("failed-sanitized", { code: "OWNERSHIP_LEDGER_MISSING", application: 0, auth: 0, storage: 0, ownership: "none" });
  const owned = ledger.read();
  if (owned.project !== REF || owned.run !== run || !["prepared", "recovery"].includes(owned.state) || !owned.authId || !owned.emailHash) {
    return sanitizedReport("failed-sanitized", { code: "OWNERSHIP_LEDGER_REFUSED", application: 0, auth: 1, storage: 0, ownership: "ambiguous" });
  }
  const known = await allUsers(admin);
  const matches = known.filter(user => user.id === owned.authId && user.user_metadata?.synthetic_run === run && emailHash(user.email) === owned.emailHash);
  if (matches.length !== 1) return sanitizedReport("failed-sanitized", { code: "OWNERSHIP_AMBIGUOUS", application: 0, auth: 1, storage: 0, ownership: "ambiguous" });
  const removed = await admin.auth.admin.deleteUser(owned.authId, false);
  if (removed.error) return sanitizedReport("failed-sanitized", { code: "AUTH_DELETE_FAILED", application: 0, auth: 1, storage: 0, ownership: "ambiguous" });
  const remaining = (await allUsers(admin)).filter(user => user.id === owned.authId);
  if (remaining.length !== 0) return sanitizedReport("failed-sanitized", { code: "AUTH_DELETE_VERIFY_FAILED", application: 0, auth: 1, storage: 0, ownership: "ambiguous" });
  ledger.remove();
  return sanitizedReport("clean", { application: 0, auth: 0, storage: 0, authLast: true, ownership: "none" });
}

async function cleanup() {
  const protectedConfig = config();
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  try { process.stdout.write(`${JSON.stringify(await cleanupWithAdapters({ admin, ledger: realLedger, run: protectedConfig.run }))}\n`); }
  finally { protectedConfig.service = null; delete process.env.PP035D_SERVICE_ROLE_KEY; }
}

function selfTest() {
  const run = `035D-SELF-${randomBytes(4).toString("hex").toUpperCase()}`;
  const plus = ["synthetic+owned", "example.invalid"].join("@");
  const mutation = preparationMutation(plus, run);
  if (!mutation.email_confirm || "password" in mutation || "redirectTo" in mutation) fail("SELF_TEST_FAILED");
  if (!exactEmailMatch(` ${["Synthetic+Owned", "Example.Invalid"].join("@")} `, plus)) fail("SELF_TEST_FAILED");
  if (exactEmailMatch(["synthetic", "example.invalid"].join("@"), plus) || exactEmailMatch(["synthetic+other", "example.invalid"].join("@"), plus)) fail("SELF_TEST_FAILED");
  process.stdout.write(`${JSON.stringify(sanitizedReport("self-test-pass", { checks: ["reservation-before-create", "atomic-finalize", "compensating-delete", "recovery-ledger", "no-email", "exact-plus", "auth-last"] }))}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] || "--self-test";
  Promise.resolve(mode === "--self-test" ? selfTest() : mode === "--prepare" ? prepare() : mode === "--cleanup" ? cleanup() : fail("MODE_REFUSED"))
    .catch(error => { process.stdout.write(`${JSON.stringify(sanitizedReport("failed-sanitized", { code: safeCode(error), auth: 0, preparationEmailSent: false, confirmed: false, ownership: "none" }))}\n`); process.exitCode = 2; });
}
