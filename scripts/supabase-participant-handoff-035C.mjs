#!/usr/bin/env node

import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const REF = "uvskssaecdhxcgytkasc";
const ALIASES = ["A", "B", "C"];
const LEDGER = join(tmpdir(), "pnr-035c-participant-ownership.json");
const A_CREATION_AFTER = Date.parse("2026-07-29T23:49:33Z");
const A_CREATION_BEFORE = Date.parse("2026-07-30T01:34:19Z");
const CONTAINMENT_CHECKPOINT = Date.parse("2026-07-30T03:23:31Z");

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

export function classifyContainmentIdentity(records) {
  const exact = records.filter(record => record.exactInbox === true);
  if (exact.length === 0) fail("IDENTITY_MATCH_MISSING");
  if (exact.length > 1) fail("DUPLICATE_IDENTITY_A");
  const candidate = exact[0];
  const createdAt = Date.parse(candidate.createdAt || "");
  if (!Number.isFinite(createdAt) || createdAt <= A_CREATION_AFTER || createdAt >= A_CREATION_BEFORE) fail("OWNERSHIP_TIME_REFUSED");
  if (candidate.participantAlias || candidate.pilotSprint) fail("UNEXPECTED_METADATA_REFUSED");
  const conflict = records.some(record => record.key !== candidate.key && record.participantAlias === "A" && record.pilotSprint === "035C");
  if (conflict) fail("ALIAS_TAG_AMBIGUOUS_A");
  return candidate;
}

export function classifyMatchOwnership({ alias, createdAt, priorLedgerState }) {
  const created = Date.parse(createdAt || "");
  if (alias === "A" && priorLedgerState === "contained-owned-deleted" && Number.isFinite(created) && created > CONTAINMENT_CHECKPOINT) return "sprint-owned";
  return "not-owned";
}

export function priorLedgerStateForApply(ledger, alias) {
  const entry = ledger.participants?.[alias];
  if (!entry) return null;
  if (alias === "A" && entry.state === "contained-owned-deleted") {
    if (entry.ownership !== "sprint-owned" || entry.window !== "recorded-a-creation-window" || !Number.isFinite(CONTAINMENT_CHECKPOINT)) fail("OWNERSHIP_LEDGER_REFUSED");
    return entry.state;
  }
  fail(`ALIAS_ALREADY_PROCESSED_${alias}`);
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
  const pending = `${LEDGER}.${process.pid}.pending`;
  try {
    writeFileSync(pending, `${JSON.stringify(ledger)}\n`, { encoding: "utf8", flag: "wx" });
    renameSync(pending, LEDGER);
  } catch (error) {
    if (existsSync(pending)) unlinkSync(pending);
    throw error;
  }
}

async function applyOne(alias) {
  if (!ALIASES.includes(alias)) fail("ALIAS_REFUSED");
  const protectedConfig = config();
  const ledger = readLedger();
  const priorLedgerState = priorLedgerStateForApply(ledger, alias);
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
  if (user.last_sign_in_at) fail("SESSION_STATE_REFUSED");
  const conflicting = known.filter(item => item.id !== user.id && item.app_metadata?.pilot_sprint === "035C" && item.app_metadata?.participant_alias === alias);
  if (conflicting.length) fail(`ALIAS_TAG_AMBIGUOUS_${alias}`);
  if (user.app_metadata?.participant_alias || user.app_metadata?.pilot_sprint) fail("UNEXPECTED_METADATA_REFUSED");
  const appState = await admin.from("users").select("id", { count: "exact", head: true }).eq("auth_user_id", user.id);
  if (appState.error || appState.count !== 0) fail("APPLICATION_STATE_REFUSED");
  const original = { ...(user.app_metadata || {}) };
  const ownership = classifyMatchOwnership({ alias, createdAt: user.created_at, priorLedgerState });
  if (priorLedgerState === "contained-owned-deleted" && ownership !== "sprint-owned") fail("OWNERSHIP_TIME_REFUSED");
  const updated = await admin.auth.admin.updateUserById(user.id, { app_metadata: mergePilotMetadata(original, alias) });
  if (updated.error) fail(`TAG_FAILED_${alias}`);
  try {
    ledger.participants[alias] = { state: "existing-tagged", ownership };
    writeLedger(ledger);
  } catch {
    const restored = await admin.auth.admin.updateUserById(user.id, { app_metadata: original });
    if (restored.error) fail("COMPENSATION_FAILED");
    fail("LEDGER_WRITE_FAILED");
  }
  process.stdout.write(`${JSON.stringify({ state: "pass", participant: `${alias}-existing-tagged`, ownership, fields: ["participant_alias", "pilot_sprint"], redirect: "exact-approved-preview" })}\n`);
  protectedConfig.service = null;
  delete process.env.PP035C_SERVICE_ROLE_KEY;
}

async function exactCount(query, code) {
  const result = await query;
  if (result.error || typeof result.count !== "number") fail(code);
  return result.count;
}

async function containOne(alias) {
  if (alias !== "A") fail("CONTAINMENT_ALIAS_REFUSED");
  const protectedConfig = config();
  let inbox = await hiddenInbox(alias);
  if (!inbox.includes("@")) fail("INBOX_INVALID");
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const known = await users(admin);
  const classified = known.map(user => ({
    key: user.id,
    exactInbox: user.email?.trim().toLowerCase() === inbox,
    createdAt: user.created_at,
    participantAlias: user.app_metadata?.participant_alias,
    pilotSprint: user.app_metadata?.pilot_sprint,
  }));
  inbox = "";
  const candidate = classifyContainmentIdentity(classified);
  classified.length = 0;
  const user = known.find(item => item.id === candidate.key);
  if (!user) fail("OWNERSHIP_AMBIGUOUS");
  const unrelatedBefore = known.filter(item => item.id !== user.id).map(item => item.id).sort();

  const ledger = readLedger();
  if (ledger.participants.A && (ledger.participants.A.ownership !== "sprint-owned" || !["containment-qualified", "contained-owned-deleted"].includes(ledger.participants.A.state))) fail("OWNERSHIP_LEDGER_REFUSED");
  ledger.participants.A = { state: "containment-qualified", ownership: "sprint-owned", window: "recorded-a-creation-window" };
  writeLedger(ledger);

  const appUsers = await admin.from("users").select("id").eq("auth_user_id", user.id);
  if (appUsers.error || !Array.isArray(appUsers.data) || appUsers.data.length > 1) fail("APPLICATION_USER_AMBIGUOUS");
  let applicationRecordsRemoved = 0;
  if (appUsers.data.length === 1) {
    const appUserId = appUsers.data[0].id;
    const profiles = await admin.from("member_profiles").select("id").eq("user_id", appUserId);
    if (profiles.error || !Array.isArray(profiles.data) || profiles.data.length > 1) fail("PROFILE_AMBIGUOUS");
    const membershipCount = await exactCount(admin.from("user_membership_levels").select("id", { count: "exact", head: true }).eq("user_id", appUserId), "MEMBERSHIP_COUNT_FAILED");
    let assignmentCount = 0;
    if (profiles.data.length === 1) {
      const profileId = profiles.data[0].id;
      assignmentCount += await exactCount(admin.from("stable_staff_assignments").select("id", { count: "exact", head: true }).eq("member_profile_id", profileId), "STAFF_COUNT_FAILED");
      assignmentCount += await exactCount(admin.from("stable_role_assignments").select("id", { count: "exact", head: true }).eq("member_profile_id", profileId), "ROLE_COUNT_FAILED");
      assignmentCount += await exactCount(admin.from("biochemistry_horse_access_assignments").select("id", { count: "exact", head: true }).eq("member_profile_id", profileId), "ACCESS_COUNT_FAILED");
      assignmentCount += await exactCount(admin.from("trainers").select("id", { count: "exact", head: true }).eq("member_profile_id", profileId), "TRAINER_COUNT_FAILED");
      assignmentCount += await exactCount(admin.from("owners").select("id", { count: "exact", head: true }).eq("member_profile_id", profileId), "OWNER_COUNT_FAILED");
    }
    if (membershipCount !== 0 || assignmentCount !== 0) fail("APPLICATION_ACCESS_REFUSED");
    const removedApp = await admin.from("users").delete().eq("id", appUserId);
    if (removedApp.error) fail("APPLICATION_DELETE_FAILED");
    applicationRecordsRemoved = 1 + profiles.data.length;
  }

  const removedAuth = await admin.auth.admin.deleteUser(user.id, false);
  if (removedAuth.error) fail("AUTH_DELETE_FAILED_A");
  const afterUsers = await users(admin);
  const remainingAuth = afterUsers.filter(item => item.id === user.id).length;
  const unrelatedAfter = afterUsers.map(item => item.id).sort();
  const remainingApp = await exactCount(admin.from("users").select("id", { count: "exact", head: true }).eq("auth_user_id", user.id), "APPLICATION_VERIFY_FAILED");
  if (remainingAuth !== 0 || remainingApp !== 0 || JSON.stringify(unrelatedAfter) !== JSON.stringify(unrelatedBefore)) fail("CONTAINMENT_VERIFY_FAILED");
  ledger.participants.A = { state: "contained-owned-deleted", ownership: "sprint-owned", window: "recorded-a-creation-window" };
  writeLedger(ledger);
  process.stdout.write(`${JSON.stringify({ state: "pass", participant: "A-contained-owned-deleted", codeExchange: user.last_sign_in_at ? "provider-sign-in-indicator-present" : "not-observed", productionCallback: applicationRecordsRemoved ? "application-bootstrap-removed" : "not-processed", activeSession: "revoked-by-owned-identity-deletion", applicationRecordsRemoved, ownedCounts: "0/0/0" })}\n`);
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
    if (ledger.participants[alias].ownership === "sprint-owned") {
      const removed = await admin.auth.admin.deleteUser(matches[0].id, false);
      if (removed.error) fail(`AUTH_DELETE_FAILED_${alias}`);
      report[alias] = "owned-deleted";
    } else if (ledger.participants[alias].ownership === "not-owned") {
      const updated = await admin.auth.admin.updateUserById(matches[0].id, { app_metadata: removePilotMetadata(matches[0].app_metadata) });
      if (updated.error) fail(`TAG_REMOVE_FAILED_${alias}`);
      report[alias] = "not-owned-tags-removed";
    } else fail(`OWNERSHIP_INVALID_${alias}`);
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
  if (A_CREATION_AFTER !== Date.parse("2026-07-29T23:49:33Z") || A_CREATION_BEFORE !== Date.parse("2026-07-30T01:34:19Z")) fail("SELF_TIME_BOUNDARY");
  if (classifyMatchOwnership({ alias: "A", createdAt: "2026-07-30T03:24:00Z", priorLedgerState: "contained-owned-deleted" }) !== "sprint-owned") fail("SELF_NEW_OWNERSHIP");
  if (classifyMatchOwnership({ alias: "A", createdAt: "2026-07-30T03:23:00Z", priorLedgerState: "contained-owned-deleted" }) !== "not-owned") fail("SELF_PREEXISTING_OWNERSHIP");
  process.stdout.write(`${JSON.stringify({ state: "pass", checks: ["hidden-input-required", "search-before-mutation", "existing-only", "merge-preserves", "owned-ledger", "new-owned", "preexisting-not-owned", "contain-a-only", "ownership-time-boundary", "app-access-refusal", "auth-last-delete", "sanitized-output"], redirect: "exact-approved-preview" })}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] || "--self-test";
  const alias = process.argv[3];
  Promise.resolve(mode === "--self-test" ? selfTest() : mode === "--apply-one" ? applyOne(alias) : mode === "--contain-one" ? containOne(alias) : mode === "--cleanup" ? cleanup() : fail("MODE_REFUSED"))
    .catch(error => { process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: /^[A-Z0-9_]+$/.test(error.code || error.message) ? (error.code || error.message) : "UNEXPECTED" })}\n`); process.exitCode = 2; });
}
