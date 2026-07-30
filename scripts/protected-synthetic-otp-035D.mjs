#!/usr/bin/env node

import { createHash, randomBytes } from "node:crypto";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const REF = "uvskssaecdhxcgytkasc";
const LEDGER = join(tmpdir(), "pnr-035d-synthetic-otp-owned.json");
const RUN_PATTERN = /^035D-[A-Z0-9-]{8,48}$/;

function fail(code) { const error = new Error(code); error.code = code; throw error; }
export function normalizeExactEmail(value) { return typeof value === "string" ? value.trim().toLowerCase() : ""; }
export function exactEmailMatch(left, right) { return normalizeExactEmail(left) === normalizeExactEmail(right); }
export function preparationMutation(email, run) {
  if (!email.includes("+") || !email.includes("@") || !RUN_PATTERN.test(run)) fail("PREPARATION_INPUT_REFUSED");
  return { email, email_confirm: true, user_metadata: { synthetic_run: run, synthetic_purpose: "035D-email-otp" } };
}
export function sanitizedReport(state, extra = {}) { return { helper: "035D-synthetic-otp", state, ...extra }; }

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

function writeLedger(value) {
  const pending = `${LEDGER}.${process.pid}.pending`;
  try { writeFileSync(pending, `${JSON.stringify(value)}\n`, { encoding: "utf8", flag: "wx" }); renameSync(pending, LEDGER); }
  catch (error) { if (existsSync(pending)) unlinkSync(pending); throw error; }
}

async function prepare() {
  if (existsSync(LEDGER)) fail("OPEN_LEDGER_REFUSED");
  const protectedConfig = config(); let email = await hiddenEmail();
  const mutation = preparationMutation(email, protectedConfig.run);
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const before = await allUsers(admin);
  if (before.filter(user => exactEmailMatch(user.email, email)).length !== 0) fail("PREEXISTING_IDENTITY_REFUSED");
  const created = await admin.auth.admin.createUser(mutation);
  if (created.error || !created.data.user?.email_confirmed_at) fail("CONFIRMED_AUTH_CREATE_FAILED");
  const identity = created.data.user;
  const after = await allUsers(admin);
  const exact = after.filter(user => exactEmailMatch(user.email, email) && user.user_metadata?.synthetic_run === protectedConfig.run);
  if (exact.length !== 1 || exact[0].id !== identity.id) { await admin.auth.admin.deleteUser(identity.id, false).catch(() => {}); fail("OWNERSHIP_VERIFY_FAILED"); }
  writeLedger({ project: REF, run: protectedConfig.run, authId: identity.id, emailHash: createHash("sha256").update(normalizeExactEmail(email)).digest("hex"), createdWithoutEmail: true });
  email = ""; protectedConfig.service = null; delete process.env.PP035D_SERVICE_ROLE_KEY;
  process.stdout.write(`${JSON.stringify(sanitizedReport("prepared", { auth: 1, preparationEmailSent: false, confirmed: true }))}\n`);
}

async function cleanup() {
  if (!existsSync(LEDGER)) fail("OWNERSHIP_LEDGER_MISSING");
  const protectedConfig = config(); const ledger = JSON.parse(readFileSync(LEDGER, "utf8"));
  if (ledger.project !== REF || ledger.run !== protectedConfig.run || ledger.createdWithoutEmail !== true) fail("OWNERSHIP_LEDGER_REFUSED");
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const known = await allUsers(admin); const matches = known.filter(user => user.id === ledger.authId && user.user_metadata?.synthetic_run === ledger.run);
  if (matches.length !== 1) fail("OWNERSHIP_AMBIGUOUS");
  const emailHash = createHash("sha256").update(normalizeExactEmail(matches[0].email)).digest("hex");
  if (emailHash !== ledger.emailHash) fail("OWNERSHIP_HASH_REFUSED");
  const removed = await admin.auth.admin.deleteUser(ledger.authId, false); if (removed.error) fail("AUTH_DELETE_FAILED");
  const remaining = (await allUsers(admin)).filter(user => user.id === ledger.authId).length; if (remaining !== 0) fail("AUTH_DELETE_VERIFY_FAILED");
  unlinkSync(LEDGER); protectedConfig.service = null; delete process.env.PP035D_SERVICE_ROLE_KEY;
  process.stdout.write(`${JSON.stringify(sanitizedReport("clean", { application: 0, auth: 0, storage: 0, authLast: true }))}\n`);
}

function selfTest() {
  const run = `035D-SELF-${randomBytes(4).toString("hex").toUpperCase()}`;
  const plus = ["synthetic+owned", "example.invalid"].join("@");
  const mutation = preparationMutation(plus, run);
  if (!mutation.email_confirm || "password" in mutation || "redirectTo" in mutation) fail("SELF_NO_EMAIL_PREPARATION");
  if (!exactEmailMatch(` ${["Synthetic+Owned", "Example.Invalid"].join("@")} `, plus)) fail("SELF_EXACT_CASE_TRIM");
  if (exactEmailMatch(["synthetic", "example.invalid"].join("@"), plus) || exactEmailMatch(["synthetic+other", "example.invalid"].join("@"), plus)) fail("SELF_PLUS_COLLAPSE");
  const report = JSON.stringify(sanitizedReport("self-test-pass", { checks: ["admin-create-confirmed", "no-invite", "no-confirmation-email", "preexisting-refusal", "ambiguous-refusal", "exact-plus-match", "protected-ledger", "auth-last"] }));
  if (report.includes(plus) || /[0-9a-f]{8}-[0-9a-f]{4}-/i.test(report)) fail("SELF_PROTECTED_OUTPUT");
  process.stdout.write(`${report}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] || "--self-test";
  Promise.resolve(mode === "--self-test" ? selfTest() : mode === "--prepare" ? prepare() : mode === "--cleanup" ? cleanup() : fail("MODE_REFUSED"))
    .catch(error => { process.stdout.write(`${JSON.stringify(sanitizedReport("failed-sanitized", { code: /^[A-Z0-9_]+$/.test(error.code || error.message) ? (error.code || error.message) : "UNEXPECTED" }))}\n`); process.exitCode = 2; });
}
