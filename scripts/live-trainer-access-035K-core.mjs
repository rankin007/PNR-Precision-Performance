#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import { existsSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const PROJECT_REF = "uvskssaecdhxcgytkasc";
const PROHIBITED_REF = "tagnbgkroihagjmvehlx";
const LEDGER_PATH = join(tmpdir(), "pnr-035k-live-trainer-access-owned.json");
const RETAIN_CONFIRMATION = "Retain the Sprint 035K pilot trainer account and synthetic fixture.";
const FIXTURE = Object.freeze({
  stableName: "Sprint 035K Synthetic Pilot Stable",
  stableCode: "PP035K-PILOT",
  horseName: "Sprint 035K Synthetic Pilot Horse",
  horseSlug: "sprint-035k-synthetic-pilot-horse",
  profileName: "Sprint 035K Pilot Trainer",
  trainerName: "Sprint 035K Pilot Trainer",
});
const TABLE_ORDER = [
  "biochemistry_horse_access_assignments",
  "horse_assignments",
  "horses",
  "trainers",
  "stables",
  "user_membership_levels",
  "member_profiles",
  "users",
];
const ID_KEYS = ["access", "appUser", "assignment", "auth", "horse", "membership", "profile", "stable", "trainer"];

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

export function normalizeProtectedEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function exactProtectedEmailMatch(stored, entered) {
  return normalizeProtectedEmail(stored) === normalizeProtectedEmail(entered);
}

export function emailDigest(value) {
  return createHash("sha256").update(normalizeProtectedEmail(value), "utf8").digest("hex");
}

export function validateTargetUrl(value) {
  let parsed;
  try { parsed = new URL(value); } catch { fail("TARGET_REFUSED"); }
  if (parsed.hostname.includes(PROHIBITED_REF)) fail("PROHIBITED_TARGET_REFUSED");
  if (parsed.protocol !== "https:" || parsed.hostname !== `${PROJECT_REF}.supabase.co` || parsed.pathname !== "/") fail("TARGET_REFUSED");
  return parsed.origin;
}

export function cleanupOrder(authOwnership = "created") {
  return [...TABLE_ORDER, ...(authOwnership === "created" ? ["auth-last-if-created"] : ["adopted-auth-preserved"])];
}

export function sanitizeFailure(error) {
  const candidate = error?.code || error?.message;
  return /^[A-Z0-9_]+$/.test(candidate || "") ? candidate : "UNEXPECTED";
}

function isUuid(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function validateLedger(value) {
  const keys = ["authOwnership", "contracts", "emailHash", "ids", "project", "run", "state", "wrongHorseId"];
  if (!value || typeof value !== "object" || Object.keys(value).sort().join("|") !== keys.join("|")) fail("OWNERSHIP_LEDGER_INVALID");
  if (value.project !== PROJECT_REF || !/^035K-[A-Z0-9]{12}$/.test(value.run || "")) fail("OWNERSHIP_LEDGER_INVALID");
  if (!["preparing", "prepared", "retained", "recovery"].includes(value.state)) fail("OWNERSHIP_LEDGER_INVALID");
  if (!["created", "adopted"].includes(value.authOwnership)) fail("OWNERSHIP_LEDGER_INVALID");
  if (!/^[a-f0-9]{64}$/.test(value.emailHash || "") || !isUuid(value.wrongHorseId)) fail("OWNERSHIP_LEDGER_INVALID");
  if (!value.ids || Object.keys(value.ids).sort().join("|") !== ID_KEYS.join("|")) fail("OWNERSHIP_LEDGER_INVALID");
  for (const key of ID_KEYS) if (value.ids[key] !== null && !isUuid(value.ids[key])) fail("OWNERSHIP_LEDGER_INVALID");
  if (!value.contracts || Object.keys(value.contracts).sort().join("|") !== "membershipLevelId|permissionId") fail("OWNERSHIP_LEDGER_INVALID");
  for (const id of Object.values(value.contracts)) if (id !== null && !isUuid(id)) fail("OWNERSHIP_LEDGER_INVALID");
  return value;
}

function fileStore() {
  return {
    exists: () => existsSync(LEDGER_PATH),
    read() {
      if (!existsSync(LEDGER_PATH)) fail("OWNERSHIP_LEDGER_MISSING");
      try { return validateLedger(JSON.parse(readFileSync(LEDGER_PATH, "utf8"))); } catch (error) {
        if (error?.code) throw error;
        fail("OWNERSHIP_LEDGER_INVALID");
      }
    },
    write(ledger, exclusive = false) {
      validateLedger(ledger);
      const pending = `${LEDGER_PATH}.${process.pid}.pending`;
      try {
        writeFileSync(pending, `${JSON.stringify(ledger)}\n`, { encoding: "utf8", flag: "wx" });
        if (exclusive && existsSync(LEDGER_PATH)) fail("OPEN_LEDGER_REFUSED");
        renameSync(pending, LEDGER_PATH);
      } catch (error) {
        if (existsSync(pending)) unlinkSync(pending);
        throw error;
      }
    },
    remove() { unlinkSync(LEDGER_PATH); },
  };
}

async function hiddenInput(label) {
  if (!process.stdin.isTTY || !process.stdout.isTTY || typeof process.stdin.setRawMode !== "function") fail("HIDDEN_INPUT_UNAVAILABLE");
  process.stdout.write(`${label}: `);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  let value = "";
  try {
    return await new Promise((resolve, reject) => {
      const onData = (chunk) => {
        for (const character of chunk) {
          if (character === "\u0003") { process.stdin.off("data", onData); reject(Object.assign(new Error("INPUT_CANCELLED"), { code: "INPUT_CANCELLED" })); return; }
          if (character === "\r" || character === "\n") { process.stdin.off("data", onData); process.stdout.write("\n"); resolve(value.trim()); return; }
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

function config() {
  const url = process.env.PP035K_SUPABASE_URL;
  const service = process.env.PP035K_SERVICE_ROLE_KEY;
  const run = process.env.PP035K_RUN;
  if (!url || !service || !run) fail("PROTECTED_CONFIG_MISSING");
  validateTargetUrl(url);
  if (!/^035K-[A-Z0-9]{12}$/.test(run)) fail("RUN_REFUSED");
  return { url, service, run };
}

function expectedRows(ledger, email) {
  const ids = ledger.ids;
  return {
    users: { id: ids.appUser, auth_user_id: ids.auth, email, status: "active", primary_role_code: "trainer" },
    member_profiles: { id: ids.profile, user_id: ids.appUser, display_name: FIXTURE.profileName, is_active: true },
    user_membership_levels: { id: ids.membership, user_id: ids.appUser, membership_level_id: ledger.contracts.membershipLevelId },
    stables: { id: ids.stable, name: FIXTURE.stableName, code: FIXTURE.stableCode, status: "active" },
    trainers: { id: ids.trainer, member_profile_id: ids.profile, display_name: FIXTURE.trainerName, status: "active" },
    horses: { id: ids.horse, stable_id: ids.stable, name: FIXTURE.horseName, slug: FIXTURE.horseSlug, status: "active" },
    horse_assignments: { id: ids.assignment, horse_id: ids.horse, trainer_id: ids.trainer, stable_id: ids.stable, assignment_type: "trainer", access_level: "write", is_primary: true },
    biochemistry_horse_access_assignments: { id: ids.access, horse_id: ids.horse, stable_id: ids.stable, member_profile_id: ids.profile, role_code: "trainer", access_level: "write", nominated_by_user_id: ids.appUser },
  };
}

function idForTable(ledger, table) {
  return {
    biochemistry_horse_access_assignments: ledger.ids.access,
    horse_assignments: ledger.ids.assignment,
    horses: ledger.ids.horse,
    trainers: ledger.ids.trainer,
    stables: ledger.ids.stable,
    user_membership_levels: ledger.ids.membership,
    member_profiles: ledger.ids.profile,
    users: ledger.ids.appUser,
  }[table];
}

function rowAgrees(actual, expected) {
  return Boolean(actual) && Object.entries(expected).every(([key, value]) => actual[key] === value);
}

export async function provisionWithAdapter({ adapter, store, emailInput, existingAuthIdInput, run }) {
  if (store.exists()) fail("OPEN_LEDGER_REFUSED");
  const email = normalizeProtectedEmail(emailInput);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("EMAIL_INVALID");
  const existingAuthId = existingAuthIdInput.trim();
  if (existingAuthId && !isUuid(existingAuthId)) fail("EXACT_AUTH_ID_INVALID");

  if (await adapter.countExactApplicationEmail(email) !== 0) fail("EXISTING_APPLICATION_STATE_REFUSED");
  if (await adapter.countFixtureCollisions(FIXTURE) !== 0) fail("FIXTURE_COLLISION_REFUSED");

  let auth = null;
  let authOwnership = "created";
  if (existingAuthId) {
    auth = await adapter.getAuthById(existingAuthId);
    if (!auth || !exactProtectedEmailMatch(auth.email, email)) fail("EXACT_IDENTITY_MISMATCH");
    authOwnership = "adopted";
  }

  const ledger = {
    project: PROJECT_REF,
    run,
    state: "preparing",
    authOwnership,
    emailHash: emailDigest(email),
    wrongHorseId: randomUUID(),
    contracts: { membershipLevelId: null, permissionId: null },
    ids: { access: randomUUID(), appUser: randomUUID(), assignment: randomUUID(), auth: auth?.id ?? null, horse: randomUUID(), membership: randomUUID(), profile: randomUUID(), stable: randomUUID(), trainer: randomUUID() },
  };
  store.write(ledger, true);

  try {
    if (!auth) {
      try { auth = await adapter.createConfirmedAuth(email); } catch { fail("EXACT_IDENTITY_CONTRACT_REQUIRED"); }
      if (!auth || !isUuid(auth.id) || !exactProtectedEmailMatch(auth.email, email)) fail("AUTH_CREATE_RESULT_REFUSED");
      ledger.ids.auth = auth.id;
      store.write(ledger);
    }

    const contract = await adapter.getTrainerContract();
    if (!contract || !isUuid(contract.membershipLevelId) || !isUuid(contract.permissionId) || contract.permissionLinks !== 1) fail("TRAINER_PERMISSION_CONTRACT_REFUSED");
    ledger.contracts = { membershipLevelId: contract.membershipLevelId, permissionId: contract.permissionId };
    store.write(ledger);

    const rows = expectedRows(ledger, email);
    const creationOrder = ["users", "member_profiles", "user_membership_levels", "stables", "trainers", "horses", "horse_assignments", "biochemistry_horse_access_assignments"];
    for (const table of creationOrder) await adapter.insertOwnedRow(table, rows[table]);
    ledger.state = "prepared";
    store.write(ledger);
    return { state: "prepared", identity: authOwnership, application: 8, auth: 1, storage: 0, workflow: "no-result", nextAction: "capture-biochemistry" };
  } catch (error) {
    ledger.state = "recovery";
    store.write(ledger);
    throw error;
  }
}

export async function verifyWithAdapter({ adapter, store, emailInput }) {
  const ledger = store.read();
  if (!["prepared", "retained"].includes(ledger.state)) fail("OWNERSHIP_LEDGER_INVALID");
  const email = normalizeProtectedEmail(emailInput);
  if (emailDigest(email) !== ledger.emailHash) fail("TESTER_IDENTITY_MISMATCH");
  const rows = expectedRows(ledger, email);
  for (const table of TABLE_ORDER) {
    const actual = await adapter.readRowById(table, idForTable(ledger, table));
    if (!rowAgrees(actual, rows[table])) fail("FIXTURE_AGREEMENT_FAILED");
  }
  if (await adapter.countRowById("horses", ledger.wrongHorseId) !== 0) fail("WRONG_HORSE_CONTRACT_REFUSED");
  const auth = await adapter.getAuthById(ledger.ids.auth);
  if (!auth || emailDigest(auth.email) !== ledger.emailHash) fail("EXACT_IDENTITY_MISMATCH");
  return { state: "verified", application: 8, auth: 1, storage: 0, wrongHorseRows: 0 };
}

export function retainWithConfirmation({ store, confirmation }) {
  const ledger = store.read();
  if (ledger.state !== "prepared") fail("RETENTION_STATE_REFUSED");
  if (confirmation !== RETAIN_CONFIRMATION) fail("RETENTION_CONFIRMATION_REFUSED");
  ledger.state = "retained";
  store.write(ledger);
  return { state: "retained", protectedValues: false };
}

export async function cleanupWithAdapter({ adapter, store, emailInput }) {
  const ledger = store.read();
  if (!["prepared", "retained", "recovery"].includes(ledger.state)) fail("OWNERSHIP_LEDGER_INVALID");
  const email = normalizeProtectedEmail(emailInput);
  if (emailDigest(email) !== ledger.emailHash) fail("TESTER_IDENTITY_MISMATCH");
  const rows = expectedRows(ledger, email);

  try {
    const authBefore = await adapter.getAuthById(ledger.ids.auth);
    if (!authBefore || emailDigest(authBefore.email) !== ledger.emailHash) fail("EXACT_IDENTITY_MISMATCH");

    for (const table of TABLE_ORDER) {
      const id = idForTable(ledger, table);
      const actual = await adapter.readRowById(table, id);
      if (!rowAgrees(actual, rows[table])) fail("OWNED_ROW_MISMATCH_RECOVERY_REQUIRED");
      await adapter.deleteRowById(table, id);
    }

    const absence = {};
    for (const table of TABLE_ORDER) absence[table] = await adapter.countRowById(table, idForTable(ledger, table));
    if (Object.values(absence).some((count) => count !== 0)) fail("PARTIAL_CLEANUP_RECOVERY_REQUIRED");

    if (ledger.authOwnership === "created") {
      const exactAuth = await adapter.getAuthById(ledger.ids.auth);
      if (!exactAuth || emailDigest(exactAuth.email) !== ledger.emailHash) fail("AUTH_OWNERSHIP_MISMATCH_RECOVERY_REQUIRED");
      await adapter.deleteAuthById(ledger.ids.auth);
      if (await adapter.getAuthById(ledger.ids.auth)) fail("AUTH_CLEANUP_RECOVERY_REQUIRED");
    } else {
      const adopted = await adapter.getAuthById(ledger.ids.auth);
      if (!adopted || emailDigest(adopted.email) !== ledger.emailHash) fail("ADOPTED_AUTH_PRESERVATION_FAILED");
    }

    store.remove();
    return { state: "clean", absence, auth: ledger.authOwnership === "created" ? 0 : "adopted-preserved", storage: 0, order: cleanupOrder(ledger.authOwnership) };
  } catch (error) {
    ledger.state = "recovery";
    store.write(ledger);
    throw error;
  }
}

async function supabaseAdapter(protectedConfig) {
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  return {
    async getAuthById(id) {
      const result = await admin.auth.admin.getUserById(id);
      if (result.error) return null;
      return result.data.user ? { id: result.data.user.id, email: result.data.user.email } : null;
    },
    async createConfirmedAuth(email) {
      const result = await admin.auth.admin.createUser({ email, email_confirm: true, app_metadata: { pilot_sprint: "035K" }, user_metadata: { display_name: FIXTURE.profileName } });
      if (result.error || !result.data.user) throw new Error("AUTH_CREATE_FAILED");
      return { id: result.data.user.id, email: result.data.user.email };
    },
    async countExactApplicationEmail(email) {
      const result = await admin.from("users").select("id", { count: "exact", head: true }).eq("email", email);
      if (result.error || typeof result.count !== "number") fail("APPLICATION_PREFLIGHT_FAILED");
      return result.count;
    },
    async countFixtureCollisions(fixture) {
      const stable = await admin.from("stables").select("id", { count: "exact", head: true }).eq("code", fixture.stableCode);
      const horse = await admin.from("horses").select("id", { count: "exact", head: true }).eq("slug", fixture.horseSlug);
      if (stable.error || horse.error || typeof stable.count !== "number" || typeof horse.count !== "number") fail("FIXTURE_PREFLIGHT_FAILED");
      return stable.count + horse.count;
    },
    async getTrainerContract() {
      const level = await admin.from("membership_levels").select("id").eq("code", "trainer").single();
      const permission = await admin.from("permissions").select("id").eq("code", "horse.records.write").single();
      if (level.error || permission.error || !level.data || !permission.data) fail("TRAINER_PERMISSION_CONTRACT_REFUSED");
      const link = await admin.from("membership_level_permissions").select("id", { count: "exact", head: true }).eq("membership_level_id", level.data.id).eq("permission_id", permission.data.id);
      if (link.error || typeof link.count !== "number") fail("TRAINER_PERMISSION_CONTRACT_REFUSED");
      return { membershipLevelId: level.data.id, permissionId: permission.data.id, permissionLinks: link.count };
    },
    async insertOwnedRow(table, row) { const result = await admin.from(table).insert(row); if (result.error) fail("APPLICATION_PROVISION_FAILED"); },
    async readRowById(table, id) { const result = await admin.from(table).select("*").eq("id", id).maybeSingle(); if (result.error) fail("OWNED_ROW_READ_FAILED"); return result.data; },
    async deleteRowById(table, id) { const result = await admin.from(table).delete().eq("id", id); if (result.error) fail("APPLICATION_CLEANUP_FAILED"); },
    async countRowById(table, id) { const result = await admin.from(table).select("id", { count: "exact", head: true }).eq("id", id); if (result.error || typeof result.count !== "number") fail("CLEANUP_VERIFY_FAILED"); return result.count; },
    async deleteAuthById(id) { const result = await admin.auth.admin.deleteUser(id, false); if (result.error) fail("AUTH_LAST_CLEANUP_FAILED"); },
  };
}

async function liveOperation(mode) {
  const protectedConfig = config();
  const store = fileStore();
  try {
    if (mode === "--prepare") {
      const email = await hiddenInput("Protected tester email");
      const existingAuthId = await hiddenInput("Exact existing Auth ID, or leave blank to create");
      return provisionWithAdapter({ adapter: await supabaseAdapter(protectedConfig), store, emailInput: email, existingAuthIdInput: existingAuthId, run: protectedConfig.run });
    }
    if (mode === "--verify") {
      const email = await hiddenInput("Protected tester email");
      return verifyWithAdapter({ adapter: await supabaseAdapter(protectedConfig), store, emailInput: email });
    }
    if (mode === "--cleanup") {
      const email = await hiddenInput("Protected tester email");
      return cleanupWithAdapter({ adapter: await supabaseAdapter(protectedConfig), store, emailInput: email });
    }
    fail("MODE_REFUSED");
  } finally {
    protectedConfig.service = null;
    delete process.env.PP035K_SERVICE_ROLE_KEY;
  }
}

async function retainLive() {
  const confirmation = await hiddenInput("Type the exact retention confirmation");
  return retainWithConfirmation({ store: fileStore(), confirmation });
}

function selfTest() {
  if (validateTargetUrl(`https://${PROJECT_REF}.supabase.co`) !== `https://${PROJECT_REF}.supabase.co`) fail("SELF_TARGET");
  try { validateTargetUrl(`https://${PROHIBITED_REF}.supabase.co`); fail("SELF_PROHIBITED"); } catch (error) { if (error.code !== "PROHIBITED_TARGET_REFUSED") throw error; }
  if (!exactProtectedEmailMatch(" Tester@Example.com ", "tester@example.com")) fail("SELF_MATCH");
  if (sanitizeFailure(new Error("private detail")) !== "UNEXPECTED") fail("SELF_SANITIZER");
  if (cleanupOrder("created").at(-1) !== "auth-last-if-created" || cleanupOrder("adopted").at(-1) !== "adopted-auth-preserved") fail("SELF_CLEANUP_ORDER");
  return { state: "pass", checks: ["approved-target-only", "prohibited-target-refused", "exact-id-no-enumeration", "hidden-inputs", "synthetic-ownership", "sanitized-output", "auth-last-or-adopted-preserved"] };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] || "--self-test";
  Promise.resolve(mode === "--self-test" ? selfTest() : mode === "--retain" ? retainLive() : liveOperation(mode))
    .then((result) => process.stdout.write(`${JSON.stringify(result)}\n`))
    .catch((error) => { process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`); process.exitCode = 2; });
}

export { FIXTURE, LEDGER_PATH, PROJECT_REF, RETAIN_CONFIRMATION };
