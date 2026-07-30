#!/usr/bin/env node

import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REF = "uvskssaecdhxcgytkasc";
const ALIASES = ["A", "B", "C"];
const LEDGER = join(tmpdir(), "pnr-035c-participant-ownership.json");

function fail(code) { const error = new Error(code); error.code = code; throw error; }

export function mergePilotMetadata(existing, alias) {
  if (!ALIASES.includes(alias)) fail("ALIAS_REFUSED");
  return { ...(existing && typeof existing === "object" ? existing : {}), participant_alias: alias, pilot_sprint: "035C" };
}

export function removePilotMetadata(existing) {
  const next = { ...(existing && typeof existing === "object" ? existing : {}) };
  delete next.participant_alias;
  delete next.pilot_sprint;
  return next;
}

function config() {
  const url = process.env.PP035C_SUPABASE_URL;
  const service = process.env.PP035C_SERVICE_ROLE_KEY;
  if (!url || !service) fail("PROTECTED_CONFIG_MISSING");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== `${REF}.supabase.co` || parsed.pathname !== "/") fail("TARGET_REFUSED");
  return { url, service };
}

async function hiddenInbox(alias) {
  if (!process.stdin.isTTY || !process.stdout.isTTY || typeof process.stdin.setRawMode !== "function") fail("HIDDEN_INPUT_UNAVAILABLE");
  process.stdout.write(`Protected inbox for Trainer Participant ${alias}: `);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  let value = "";
  try {
    return await new Promise((resolve, reject) => {
      const onData = chunk => {
        for (const character of chunk) {
          if (character === "\u0003") { process.stdin.off("data", onData); reject(Object.assign(new Error("INPUT_CANCELLED"), { code: "INPUT_CANCELLED" })); return; }
          if (character === "\r" || character === "\n") { process.stdin.off("data", onData); process.stdout.write("\n"); resolve(value.trim().toLowerCase()); return; }
          if (character === "\u007f" || character === "\b") value = value.slice(0, -1);
          else if (character >= " ") value += character;
        }
      };
      process.stdin.on("data", onData);
    });
  } finally {
    value = "";
    process.stdin.setRawMode(false);
    process.stdin.pause();
  }
}

async function users(admin) {
  const all = [];
  for (let page = 1; page <= 20; page += 1) {
    const result = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (result.error) fail("AUTH_SEARCH_FAILED");
    all.push(...result.data.users);
    if (result.data.users.length < 1000) return all;
  }
  fail("AUTH_SEARCH_BOUNDED");
}

function readLedger() {
  if (!existsSync(LEDGER)) return { sprint: "035C", participants: {} };
  try {
    const ledger = JSON.parse(readFileSync(LEDGER, "utf8"));
    if (ledger.sprint !== "035C" || !ledger.participants || typeof ledger.participants !== "object") fail("LEDGER_INVALID");
    return ledger;
  } catch { fail("LEDGER_INVALID"); }
}

function writeLedger(ledger) {
  writeFileSync(LEDGER, `${JSON.stringify(ledger)}\n`, { encoding: "utf8", flag: "w" });
}

async function applyOne(alias) {
  if (!ALIASES.includes(alias)) fail("ALIAS_REFUSED");
  const protectedConfig = config();
  const ledger = readLedger();
  if (ledger.participants[alias]) fail(`ALIAS_ALREADY_PROCESSED_${alias}`);
  let inbox = await hiddenInbox(alias);
  if (!inbox.includes("@")) fail("INBOX_INVALID");
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const known = await users(admin);
  const matches = known.filter(user => user.email?.trim().toLowerCase() === inbox);
  inbox = "";
  if (matches.length > 1) fail(`DUPLICATE_IDENTITY_${alias}`);
  if (matches.length === 0) fail(`IDENTITY_MISSING_USE_PREVIEW_SIGNIN_${alias}`);
  const user = matches[0];
  const conflicting = known.filter(item => item.id !== user.id && item.app_metadata?.pilot_sprint === "035C" && item.app_metadata?.participant_alias === alias);
  if (conflicting.length) fail(`ALIAS_TAG_AMBIGUOUS_${alias}`);
  const original = { ...(user.app_metadata || {}) };
  const updated = await admin.auth.admin.updateUserById(user.id, { app_metadata: mergePilotMetadata(original, alias) });
  if (updated.error) fail(`TAG_FAILED_${alias}`);
  try {
    ledger.participants[alias] = { state: "existing-tagged", ownership: "sprint-owned" };
    writeLedger(ledger);
  } catch {
    const restored = await admin.auth.admin.updateUserById(user.id, { app_metadata: original });
    if (restored.error) fail("COMPENSATION_FAILED");
    fail("LEDGER_WRITE_FAILED");
  }
  process.stdout.write(`${JSON.stringify({ state: "pass", participant: `${alias}-existing-tagged`, ownership: "sprint-owned", fields: ["participant_alias", "pilot_sprint"], redirect: "exact-approved-preview" })}\n`);
  protectedConfig.service = null;
  delete process.env.PP035C_SERVICE_ROLE_KEY;
}

async function cleanup() {
  const protectedConfig = config();
  const ledger = readLedger();
  const aliases = Object.keys(ledger.participants).sort();
  if (!aliases.length || aliases.some(alias => !ALIASES.includes(alias))) fail("OWNERSHIP_INVALID");
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const known = await users(admin);
  const report = {};
  for (const alias of aliases) {
    const matches = known.filter(user => user.app_metadata?.participant_alias === alias && user.app_metadata?.pilot_sprint === "035C");
    if (matches.length !== 1) fail(`TAG_MATCH_AMBIGUOUS_${alias}`);
    const removed = await admin.auth.admin.deleteUser(matches[0].id, false);
    if (removed.error) fail(`AUTH_DELETE_FAILED_${alias}`);
    report[alias] = "owned-deleted";
  }
  unlinkSync(LEDGER);
  process.stdout.write(`${JSON.stringify({ state: "pass", participants: report })}\n`);
  protectedConfig.service = null;
  delete process.env.PP035C_SERVICE_ROLE_KEY;
}

function selfTest() {
  const merged = mergePilotMetadata({ provider: "email", unrelated: "preserved" }, "A");
  if (merged.provider !== "email" || merged.unrelated !== "preserved" || merged.participant_alias !== "A" || merged.pilot_sprint !== "035C") fail("SELF_MERGE");
  const removed = removePilotMetadata(merged);
  if (removed.provider !== "email" || removed.unrelated !== "preserved" || "participant_alias" in removed || "pilot_sprint" in removed) fail("SELF_REMOVE");
  process.stdout.write(`${JSON.stringify({ state: "pass", checks: ["hidden-input-required", "search-before-mutation", "existing-only", "merge-preserves", "owned-ledger", "sanitized-output"], redirect: "exact-approved-preview" })}\n`);
}

const mode = process.argv[2] || "--self-test";
const alias = process.argv[3];
Promise.resolve(mode === "--self-test" ? selfTest() : mode === "--apply-one" ? applyOne(alias) : mode === "--cleanup" ? cleanup() : fail("MODE_REFUSED"))
  .catch(error => { process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: /^[A-Z0-9_]+$/.test(error.code || error.message) ? (error.code || error.message) : "UNEXPECTED" })}\n`); process.exitCode = 2; });
