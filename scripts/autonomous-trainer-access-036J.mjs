#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const PROJECT_REF = "uvskssaecdhxcgytkasc";
export const PROJECT_ORIGIN = `https://${PROJECT_REF}.supabase.co`;
export const PROHIBITED_REF = "tagnbgkroihagjmvehlx";
export const PROHIBITED_ORIGIN = `https://${PROHIBITED_REF}.supabase.co`;
export const CANONICAL_ORIGIN = "https://precisionperformance.com.au";
export const LEDGER_PATH = join(tmpdir(), "pnr-035k-live-trainer-access-owned.json");
export const BINDING_NAMES = Object.freeze([
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
]);
export const FIXTURE = Object.freeze({
  stableName: "Sprint 035K Synthetic Pilot Stable",
  stableCode: "PP035K-PILOT",
  horseName: "Sprint 035K Synthetic Pilot Horse",
  horseSlug: "sprint-035k-synthetic-pilot-horse",
  profileName: "Sprint 035K Pilot Trainer",
  trainerName: "Sprint 035K Pilot Trainer",
});

const ID_KEYS = ["access", "appUser", "assignment", "auth", "horse", "membership", "profile", "stable", "trainer"];
const TABLE_ORDER = [
  "users",
  "member_profiles",
  "user_membership_levels",
  "stables",
  "trainers",
  "horses",
  "horse_assignments",
  "biochemistry_horse_access_assignments",
];
const FAILURE_CODES = new Set([
  "MODE_REFUSED",
  "ORIGIN_REFUSED",
  "BINDING_SOURCE_REFUSED",
  "BINDING_SET_REFUSED",
  "API_KEY_READ_FAILED",
  "API_KEY_JSON_REFUSED",
  "API_KEY_SELECTION_REFUSED",
  "CHILD_OUTPUT_REFUSED",
  "BINDING_WRITE_FAILED",
  "BINDING_STATUS_FAILED",
  "BINDING_REPAIR_FAILED_RESTORED",
  "BINDING_COMPENSATION_FAILED",
  "PROTECTED_CONFIG_MISSING",
  "TARGET_REFUSED",
  "PROHIBITED_TARGET_REFUSED",
  "KEY_PROJECT_REFUSED",
  "KEY_ROLE_REFUSED",
  "OWNERSHIP_LEDGER_MISSING",
  "OWNERSHIP_LEDGER_INVALID",
  "AUTH_POPULATION_READ_FAILED",
  "AUTH_POPULATION_CEILING_REFUSED",
  "AUTHORITATIVE_IDENTITY_MISSING",
  "AUTHORITATIVE_IDENTITY_AMBIGUOUS",
  "AUTHORITATIVE_IDENTITY_MISMATCH",
  "EXCLUDED_IDENTITY_CHANGED",
  "TRAINER_PERMISSION_CONTRACT_REFUSED",
  "OWNED_ROW_READ_FAILED",
  "OWNED_ROW_COLLISION",
  "OWNED_ROW_RELATIONSHIP_CONFLICT",
  "OWNED_ROW_MUTATION_FAILED",
  "OWNED_GRAPH_VERIFY_FAILED",
  "WRONG_HORSE_CONTRACT_REFUSED",
  "STORAGE_CONTRACT_REFUSED",
  "MAGIC_LINK_FAILED",
  "TOKEN_VERIFICATION_FAILED",
  "SESSION_IDENTITY_MISMATCH",
  "SESSION_COOKIE_MISSING",
  "HTTP_JOURNEY_FAILED",
  "PORTAL_PROOF_FAILED",
  "HORSE_WORKSPACE_PROOF_FAILED",
  "WORKFLOW_PERMISSION_PROOF_FAILED",
  "WRONG_HORSE_DENIAL_FAILED",
  "SIGN_OUT_FAILED",
  "ANONYMOUS_DENIAL_FAILED",
  "MIDDLEWARE_CONTRACT_FAILED",
  "UNEXPECTED",
]);

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

export function sanitizeFailure(error) {
  const candidate = error?.code || error?.message;
  return FAILURE_CODES.has(candidate) ? candidate : "UNEXPECTED";
}

function isUuid(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function emailDigest(value) {
  return createHash("sha256").update(normalizeEmail(value), "utf8").digest("hex");
}

function stableDigest(value) {
  return createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex");
}

function decodeJwtPayload(value) {
  if (typeof value !== "string" || value.split(".").length !== 3) return null;
  try {
    return JSON.parse(Buffer.from(value.split(".")[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function validateKeyProjection(value, expectedRole) {
  const payload = decodeJwtPayload(value);
  if (!payload) return;
  if (payload.ref !== PROJECT_REF) fail("KEY_PROJECT_REFUSED");
  if (payload.role !== expectedRole) fail("KEY_ROLE_REFUSED");
}

export function validateTargetUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail("TARGET_REFUSED");
  }
  if (parsed.hostname.includes(PROHIBITED_REF)) fail("PROHIBITED_TARGET_REFUSED");
  if (parsed.protocol !== "https:" || parsed.hostname !== `${PROJECT_REF}.supabase.co` || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    fail("TARGET_REFUSED");
  }
  return parsed.origin;
}

export function validateConfig(env = process.env) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceRoleKey) fail("PROTECTED_CONFIG_MISSING");
  const origin = validateTargetUrl(url);
  validateKeyProjection(anonKey, "anon");
  validateKeyProjection(serviceRoleKey, "service_role");
  return { url: origin, anonKey, serviceRoleKey };
}

function bindingValues(source) {
  return Object.fromEntries(BINDING_NAMES.map((name) => [name, typeof source?.[name] === "string" ? source[name] : ""]));
}

function keyProjection(value, expectedRole) {
  const payload = decodeJwtPayload(value);
  const project = payload?.ref === PROJECT_REF
    ? "approved"
    : payload?.ref === PROHIBITED_REF
      ? "prohibited"
      : payload?.ref
        ? "other"
        : "unresolved";
  return { project, roleValid: payload?.role === expectedRole };
}

function bindingUrlClass(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return "other";
  }
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.search || parsed.hash || parsed.username || parsed.password) return "other";
  if (parsed.origin === PROJECT_ORIGIN) return "approved";
  if (parsed.origin === PROHIBITED_ORIGIN) return "prohibited";
  return "other";
}

export function classifyBindingSet(source) {
  const values = bindingValues(source);
  const bindingCount = BINDING_NAMES.filter((name) => Boolean(values[name])).length;
  if (bindingCount !== BINDING_NAMES.length) {
    return {
      bindingClass: "incomplete",
      bindingCount,
      urlClass: values.NEXT_PUBLIC_SUPABASE_URL ? "other" : "missing",
      anonClass: values.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "unresolved" : "missing",
      serviceClass: values.SUPABASE_SERVICE_ROLE_KEY ? "unresolved" : "missing",
      rolesValid: false,
    };
  }

  const urlClass = bindingUrlClass(values.NEXT_PUBLIC_SUPABASE_URL);
  const anon = keyProjection(values.NEXT_PUBLIC_SUPABASE_ANON_KEY, "anon");
  const service = keyProjection(values.SUPABASE_SERVICE_ROLE_KEY, "service_role");
  const rolesValid = anon.roleValid && service.roleValid;
  const bindingClass = rolesValid && urlClass === "approved" && anon.project === "approved" && service.project === "approved"
    ? "approved"
    : rolesValid && urlClass === "prohibited" && anon.project === "prohibited" && service.project === "prohibited"
      ? "prohibited"
      : "refused";
  return {
    bindingClass,
    bindingCount,
    urlClass,
    anonClass: anon.project,
    serviceClass: service.project,
    rolesValid,
  };
}

export function assertSafeResult(value) {
  const text = JSON.stringify(value);
  if (
    /@[A-Za-z0-9.-]+|eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}/i.test(text) ||
    text.includes(PROJECT_ORIGIN) ||
    text.includes(PROHIBITED_ORIGIN)
  ) {
    fail("CHILD_OUTPUT_REFUSED");
  }
  return value;
}

export function parseApprovedApiKeyJson(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    fail("API_KEY_JSON_REFUSED");
  }
  if (!Array.isArray(parsed)) fail("API_KEY_JSON_REFUSED");
  const anon = parsed.filter((entry) => entry?.name === "anon");
  const service = parsed.filter((entry) => entry?.name === "service_role");
  if (anon.length !== 1 || service.length !== 1) fail("API_KEY_SELECTION_REFUSED");
  if (typeof anon[0].api_key !== "string" || !anon[0].api_key || typeof service[0].api_key !== "string" || !service[0].api_key) {
    fail("API_KEY_SELECTION_REFUSED");
  }
  const selected = {
    NEXT_PUBLIC_SUPABASE_URL: PROJECT_ORIGIN,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anon[0].api_key,
    SUPABASE_SERVICE_ROLE_KEY: service[0].api_key,
  };
  if (classifyBindingSet(selected).bindingClass !== "approved") fail("API_KEY_SELECTION_REFUSED");
  return selected;
}

export function buildBindingReplacementPlan(values) {
  if (!["approved", "prohibited"].includes(classifyBindingSet(values).bindingClass)) fail("BINDING_SET_REFUSED");
  return BINDING_NAMES.map((name) => ({ name, value: values[name] }));
}

function childEnvironment() {
  const env = { ...process.env };
  for (const name of BINDING_NAMES) delete env[name];
  return env;
}

function outputContainsProtectedValue(text, protectedValues = []) {
  if (protectedValues.some((value) => typeof value === "string" && value && text.includes(value))) return true;
  return /eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}/i.test(text);
}

export function assertNoProtectedChildOutput(text, protectedValues = []) {
  if (outputContainsProtectedValue(text, protectedValues)) fail("CHILD_OUTPUT_REFUSED");
  return true;
}

export function runCapturedChild({ command, args, input = null, shell = false, protectedValues = [], maxOutputBytes = 1024 * 1024 }) {
  if (!command || !Array.isArray(args) || args.some((arg) => protectedValues.includes(arg))) fail("CHILD_OUTPUT_REFUSED");
  return new Promise((resolvePromise, rejectPromise) => {
    let settled = false;
    let stdout = "";
    let stderr = "";
    let child;
    const rejectOnce = (code) => {
      if (settled) return;
      settled = true;
      if (child && !child.killed) child.kill();
      try { fail(code); } catch (error) { rejectPromise(error); }
    };
    try {
      child = spawn(command, args, { env: childEnvironment(), shell, stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
    } catch {
      rejectOnce("CHILD_OUTPUT_REFUSED");
      return;
    }
    child.on("error", () => rejectOnce("CHILD_OUTPUT_REFUSED"));
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      if (Buffer.byteLength(stdout, "utf8") + Buffer.byteLength(stderr, "utf8") > maxOutputBytes) rejectOnce("CHILD_OUTPUT_REFUSED");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      if (Buffer.byteLength(stdout, "utf8") + Buffer.byteLength(stderr, "utf8") > maxOutputBytes) rejectOnce("CHILD_OUTPUT_REFUSED");
    });
    child.on("close", (code) => {
      if (settled) return;
      if (outputContainsProtectedValue(stderr, protectedValues)) {
        rejectOnce("CHILD_OUTPUT_REFUSED");
        return;
      }
      settled = true;
      resolvePromise({ code, stdout, stderr });
    });
    if (input === null) child.stdin.end();
    else child.stdin.end(`${input}\n`, "utf8");
  });
}

function parseCapturedBindingStatus(stdout) {
  const candidates = stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)]; } catch { return []; }
  }).filter((value) => value?.state === "binding-status" && value?.mode === "binding-status");
  if (candidates.length !== 1) fail("BINDING_STATUS_FAILED");
  const result = assertSafeResult(candidates[0]);
  if (!["approved", "prohibited", "incomplete", "refused"].includes(result.bindingClass)) fail("BINDING_STATUS_FAILED");
  return result;
}

export function createBindingProcessAdapter({ runChild = runCapturedChild } = {}) {
  const require = createRequire(import.meta.url);
  const supabasePackage = require.resolve("supabase/package.json");
  const supabaseCli = resolve(dirname(supabasePackage), "dist", "supabase.js");
  const currentScript = fileURLToPath(import.meta.url);
  const vercelCli = process.platform === "win32"
    ? join(process.env.APPDATA || "", "npm", "node_modules", "vercel", "dist", "vc.js")
    : null;
  const vercelCommand = process.platform === "win32" ? process.execPath : "vercel";
  const vercelPrefix = vercelCli ? [vercelCli] : [];
  return {
    async readApprovedKeys() {
      const result = await runChild({
        command: process.execPath,
        args: [supabaseCli, "projects", "api-keys", "--project-ref", PROJECT_REF, "--reveal", "--output", "json"],
      });
      try {
        if (result.code !== 0) fail("API_KEY_READ_FAILED");
        const selected = parseApprovedApiKeyJson(result.stdout);
        assertNoProtectedChildOutput(result.stderr, Object.values(selected));
        return selected;
      } finally {
        result.stdout = "";
        result.stderr = "";
      }
    },
    async writeProductionBinding(name, value) {
      if (!BINDING_NAMES.includes(name) || typeof value !== "string" || !value) fail("BINDING_WRITE_FAILED");
      const result = await runChild({
        command: vercelCommand,
        args: [...vercelPrefix, "env", "add", name, "production", "--force", "--yes"],
        input: value,
        protectedValues: [value],
      });
      try {
        if (result.code !== 0) fail("BINDING_WRITE_FAILED");
        assertNoProtectedChildOutput(`${result.stdout}\n${result.stderr}`, [value]);
        return { ok: true };
      } finally {
        result.stdout = "";
        result.stderr = "";
      }
    },
    async readProductionStatus() {
      const result = await runChild({
        command: vercelCommand,
        args: [...vercelPrefix, "env", "run", "-e", "production", "--", process.execPath, currentScript, "binding-status"],
      });
      try {
        if (result.code !== 0) fail("BINDING_STATUS_FAILED");
        return parseCapturedBindingStatus(result.stdout);
      } finally {
        result.stdout = "";
        result.stderr = "";
      }
    },
  };
}

export async function restoreBindingSet(adapter, values) {
  if (classifyBindingSet(values).bindingClass !== "prohibited") fail("BINDING_SOURCE_REFUSED");
  const plan = buildBindingReplacementPlan(values);
  let failures = 0;
  for (const binding of plan) {
    try { await adapter.writeProductionBinding(binding.name, binding.value); } catch { failures += 1; }
  }
  let status = null;
  try { status = await adapter.readProductionStatus(); } catch { failures += 1; }
  if (failures !== 0 || status?.bindingClass !== "prohibited") fail("BINDING_COMPENSATION_FAILED");
  return { writes: 3, bindingClass: "prohibited" };
}

export async function repairProductionBindings({ source, adapter }) {
  const originals = bindingValues(source);
  if (classifyBindingSet(originals).bindingClass !== "prohibited") fail("BINDING_SOURCE_REFUSED");
  let approved = null;
  let writeStarted = false;
  try {
    approved = await adapter.readApprovedKeys();
    if (classifyBindingSet(approved).bindingClass !== "approved") fail("API_KEY_SELECTION_REFUSED");
    const plan = buildBindingReplacementPlan(approved);
    for (const binding of plan) {
      writeStarted = true;
      await adapter.writeProductionBinding(binding.name, binding.value);
    }
    const status = await adapter.readProductionStatus();
    if (status?.bindingClass !== "approved") fail("BINDING_STATUS_FAILED");
    return assertSafeResult({ state: "bindings-repaired", mode: "repair-production-bindings", bindingClass: "approved", apiKeyReads: 1, writes: 3, compensation: "not-required" });
  } catch (error) {
    if (!writeStarted) throw error;
    try { await restoreBindingSet(adapter, originals); } catch { fail("BINDING_COMPENSATION_FAILED"); }
    fail("BINDING_REPAIR_FAILED_RESTORED");
  } finally {
    for (const name of BINDING_NAMES) {
      originals[name] = null;
      if (approved) approved[name] = null;
    }
  }
}

export async function restoreProductionBindings({ source, adapter }) {
  const originals = bindingValues(source);
  try {
    const restored = await restoreBindingSet(adapter, originals);
    return assertSafeResult({ state: "bindings-restored", mode: "restore-production-bindings", bindingClass: restored.bindingClass, writes: restored.writes, restored: true });
  } finally {
    for (const name of BINDING_NAMES) originals[name] = null;
  }
}

export function validateLedger(value) {
  const keys = ["authOwnership", "contracts", "emailHash", "ids", "project", "run", "state", "wrongHorseId"];
  if (!value || typeof value !== "object" || Object.keys(value).sort().join("|") !== keys.join("|")) fail("OWNERSHIP_LEDGER_INVALID");
  if (value.project !== PROJECT_REF || value.state !== "retained" || value.authOwnership !== "adopted") fail("OWNERSHIP_LEDGER_INVALID");
  if (!/^035K-[A-Z0-9]{12}$/.test(value.run || "") || !/^[a-f0-9]{64}$/.test(value.emailHash || "") || !isUuid(value.wrongHorseId)) {
    fail("OWNERSHIP_LEDGER_INVALID");
  }
  if (!value.ids || Object.keys(value.ids).sort().join("|") !== ID_KEYS.join("|")) fail("OWNERSHIP_LEDGER_INVALID");
  for (const key of ID_KEYS) if (!isUuid(value.ids[key])) fail("OWNERSHIP_LEDGER_INVALID");
  if (!value.contracts || Object.keys(value.contracts).sort().join("|") !== "membershipLevelId|permissionId") fail("OWNERSHIP_LEDGER_INVALID");
  if (!isUuid(value.contracts.membershipLevelId) || !isUuid(value.contracts.permissionId)) fail("OWNERSHIP_LEDGER_INVALID");
  return structuredClone(value);
}

export function readLedger(path = LEDGER_PATH) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") fail("OWNERSHIP_LEDGER_MISSING");
    fail("OWNERSHIP_LEDGER_INVALID");
  }
  return validateLedger(parsed);
}

function identityFingerprint(user) {
  return stableDigest({
    id: user.id,
    emailHash: emailDigest(user.email),
    role: user.role ?? null,
    confirmedAt: user.email_confirmed_at ?? user.confirmed_at ?? null,
    updatedAt: user.updated_at ?? null,
  });
}

export function classifyAuthPopulation(users, ledger) {
  if (!Array.isArray(users) || users.length === 0 || users.length > 100000) fail("AUTH_POPULATION_CEILING_REFUSED");
  const authoritative = users.filter((user) => user?.id === ledger.ids.auth && emailDigest(user?.email) === ledger.emailHash);
  const idMatches = users.filter((user) => user?.id === ledger.ids.auth);
  const emailMatches = users.filter((user) => emailDigest(user?.email) === ledger.emailHash);
  if (authoritative.length === 0) fail(idMatches.length || emailMatches.length ? "AUTHORITATIVE_IDENTITY_MISMATCH" : "AUTHORITATIVE_IDENTITY_MISSING");
  if (authoritative.length !== 1 || idMatches.length !== 1 || emailMatches.length !== 1) fail("AUTHORITATIVE_IDENTITY_AMBIGUOUS");
  const excluded = users.filter((user) => user !== authoritative[0]);
  const excludedFingerprints = new Map(excluded.map((user) => [user.id, identityFingerprint(user)]));
  return {
    authoritative: authoritative[0],
    identityCount: users.length,
    authoritativeCount: 1,
    excludedCount: excluded.length,
    excludedFingerprints,
  };
}

export function assertExcludedUnchanged(before, after) {
  if (before.size !== after.size) fail("EXCLUDED_IDENTITY_CHANGED");
  for (const [id, digest] of before) if (after.get(id) !== digest) fail("EXCLUDED_IDENTITY_CHANGED");
  return true;
}

export function expectedRowsForLedger(ledger, email) {
  const ids = ledger.ids;
  return {
    users: { id: ids.appUser, auth_user_id: ids.auth, email, status: "active", primary_role_code: "trainer" },
    member_profiles: { id: ids.profile, user_id: ids.appUser, display_name: FIXTURE.profileName, is_active: true },
    user_membership_levels: { id: ids.membership, user_id: ids.appUser, membership_level_id: ledger.contracts.membershipLevelId, starts_at: null, ends_at: null },
    stables: { id: ids.stable, name: FIXTURE.stableName, code: FIXTURE.stableCode, status: "active" },
    trainers: { id: ids.trainer, member_profile_id: ids.profile, display_name: FIXTURE.trainerName, status: "active" },
    horses: { id: ids.horse, stable_id: ids.stable, name: FIXTURE.horseName, slug: FIXTURE.horseSlug, status: "active" },
    horse_assignments: { id: ids.assignment, horse_id: ids.horse, trainer_id: ids.trainer, stable_id: ids.stable, assignment_type: "trainer", access_level: "write", is_primary: true },
    biochemistry_horse_access_assignments: { id: ids.access, horse_id: ids.horse, stable_id: ids.stable, member_profile_id: ids.profile, role_code: "trainer", access_level: "write", nominated_by_user_id: ids.appUser },
  };
}

const GRAPH_SPECS = Object.freeze({
  users: { idKey: "appUser", immutable: ["id", "auth_user_id", "email"], anchors: [["auth_user_id"], ["email"]] },
  member_profiles: { idKey: "profile", immutable: ["id", "user_id"], anchors: [["user_id"]] },
  user_membership_levels: { idKey: "membership", immutable: ["id", "user_id", "membership_level_id"], anchors: [["user_id", "membership_level_id"]] },
  stables: { idKey: "stable", immutable: ["id", "code"], anchors: [["code"]] },
  trainers: { idKey: "trainer", immutable: ["id", "member_profile_id"], anchors: [["member_profile_id"]] },
  horses: { idKey: "horse", immutable: ["id", "stable_id", "slug"], anchors: [["slug"]] },
  horse_assignments: { idKey: "assignment", immutable: ["id", "horse_id", "trainer_id", "stable_id"], anchors: [["horse_id", "trainer_id", "stable_id", "assignment_type"]] },
  biochemistry_horse_access_assignments: { idKey: "access", immutable: ["id", "horse_id", "stable_id", "member_profile_id", "nominated_by_user_id"], anchors: [["horse_id", "member_profile_id", "role_code"]] },
});

function rowAgrees(row, expected) {
  return Boolean(row) && Object.entries(expected).every(([key, value]) => row[key] === value);
}

function pickFields(value, keys) {
  return Object.fromEntries(keys.map((key) => [key, value[key]]));
}

async function validateContract(adapter, ledger) {
  const contract = await adapter.getTrainerContract(ledger.contracts);
  if (!contract || contract.membershipLevelId !== ledger.contracts.membershipLevelId || contract.permissionId !== ledger.contracts.permissionId || contract.permissionLinks !== 1) {
    fail("TRAINER_PERMISSION_CONTRACT_REFUSED");
  }
}

export async function planOwnedGraphReconcile(adapter, ledger, email) {
  await validateContract(adapter, ledger);
  const expectedRows = expectedRowsForLedger(ledger, email);
  const actions = [];
  for (const table of TABLE_ORDER) {
    const spec = GRAPH_SPECS[table];
    const id = ledger.ids[spec.idKey];
    const expected = expectedRows[table];
    const actual = await adapter.readRowById(table, id);
    for (const anchorKeys of spec.anchors) {
      const matches = await adapter.findRows(table, pickFields(expected, anchorKeys));
      if (matches.some((row) => row.id !== id) || matches.filter((row) => row.id === id).length > 1) fail("OWNED_ROW_COLLISION");
    }
    if (!actual) {
      actions.push({ type: "insert", table, id, values: expected });
      continue;
    }
    if (!spec.immutable.every((key) => actual[key] === expected[key])) fail("OWNED_ROW_RELATIONSHIP_CONFLICT");
    if (rowAgrees(actual, expected)) actions.push({ type: "unchanged", table, id, values: expected });
    else actions.push({ type: "update", table, id, values: expected });
  }
  return actions;
}

export async function verifyOwnedGraph(adapter, ledger, email) {
  await validateContract(adapter, ledger);
  const expectedRows = expectedRowsForLedger(ledger, email);
  let application = 0;
  for (const table of TABLE_ORDER) {
    const spec = GRAPH_SPECS[table];
    const row = await adapter.readRowById(table, ledger.ids[spec.idKey]);
    if (!rowAgrees(row, expectedRows[table])) fail("OWNED_GRAPH_VERIFY_FAILED");
    application += 1;
  }
  if ((await adapter.countRowById("horses", ledger.wrongHorseId)) !== 0) fail("WRONG_HORSE_CONTRACT_REFUSED");
  const auth = await adapter.getAuthById(ledger.ids.auth);
  if (!auth || auth.id !== ledger.ids.auth || emailDigest(auth.email) !== ledger.emailHash) fail("AUTHORITATIVE_IDENTITY_MISMATCH");
  if (adapter.storageCalls !== 0) fail("STORAGE_CONTRACT_REFUSED");
  return {
    application,
    auth: 1,
    storage: 0,
    wrongHorse: 0,
    activeUser: true,
    activeProfile: true,
    activeTrainerMembership: true,
    horseRecordsWrite: true,
  };
}

export async function reconcileOwnedGraph(adapter, ledger, email) {
  const actions = await planOwnedGraphReconcile(adapter, ledger, email);
  for (const action of actions) {
    if (action.type === "insert") await adapter.insertOwnedRow(action.table, action.values);
    if (action.type === "update") await adapter.updateOwnedRow(action.table, action.id, action.values);
  }
  const graph = await verifyOwnedGraph(adapter, ledger, email);
  return {
    ...graph,
    inserted: actions.filter((action) => action.type === "insert").length,
    updated: actions.filter((action) => action.type === "update").length,
    unchanged: actions.filter((action) => action.type === "unchanged").length,
  };
}

export async function createSupabaseAdapter(config) {
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(config.url, config.serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  return {
    storageCalls: 0,
    async listAuthUsers() {
      const users = [];
      for (let page = 1; page <= 100; page += 1) {
        const result = await admin.auth.admin.listUsers({ page, perPage: 1000 });
        if (result.error || !Array.isArray(result.data?.users)) fail("AUTH_POPULATION_READ_FAILED");
        users.push(...result.data.users);
        if (result.data.users.length < 1000) return users;
      }
      fail("AUTH_POPULATION_CEILING_REFUSED");
    },
    async getAuthById(id) {
      const result = await admin.auth.admin.getUserById(id);
      if (result.error || !result.data?.user) return null;
      return result.data.user;
    },
    async getTrainerContract(contracts) {
      const [level, permission, link] = await Promise.all([
        admin.from("membership_levels").select("id,code").eq("id", contracts.membershipLevelId).eq("code", "trainer").maybeSingle(),
        admin.from("permissions").select("id,code").eq("id", contracts.permissionId).eq("code", "horse.records.write").maybeSingle(),
        admin.from("membership_level_permissions").select("id", { count: "exact", head: true }).eq("membership_level_id", contracts.membershipLevelId).eq("permission_id", contracts.permissionId),
      ]);
      if (level.error || permission.error || link.error || !level.data || !permission.data || typeof link.count !== "number") fail("TRAINER_PERMISSION_CONTRACT_REFUSED");
      return { membershipLevelId: level.data.id, permissionId: permission.data.id, permissionLinks: link.count };
    },
    async readRowById(table, id) {
      const result = await admin.from(table).select("*").eq("id", id).maybeSingle();
      if (result.error) fail("OWNED_ROW_READ_FAILED");
      return result.data;
    },
    async findRows(table, fields) {
      const result = await admin.from(table).select("id").match(fields).limit(3);
      if (result.error || !Array.isArray(result.data)) fail("OWNED_ROW_READ_FAILED");
      return result.data;
    },
    async insertOwnedRow(table, values) {
      const result = await admin.from(table).insert(values).select("id").single();
      if (result.error || result.data?.id !== values.id) fail("OWNED_ROW_MUTATION_FAILED");
    },
    async updateOwnedRow(table, id, values) {
      const result = await admin.from(table).update(values).eq("id", id).select("id");
      if (result.error || result.data?.length !== 1 || result.data[0].id !== id) fail("OWNED_ROW_MUTATION_FAILED");
    },
    async countRowById(table, id) {
      const result = await admin.from(table).select("id", { count: "exact", head: true }).eq("id", id);
      if (result.error || typeof result.count !== "number") fail("OWNED_ROW_READ_FAILED");
      return result.count;
    },
    async generateMagicLink(email, redirectTo) {
      const result = await admin.auth.admin.generateLink({ type: "magiclink", email, options: { redirectTo } });
      const tokenHash = result.data?.properties?.hashed_token;
      if (result.error || typeof tokenHash !== "string" || !tokenHash) fail("MAGIC_LINK_FAILED");
      return tokenHash;
    },
  };
}

function validateCanonicalOrigin(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail("ORIGIN_REFUSED");
  }
  if (parsed.origin !== CANONICAL_ORIGIN || parsed.pathname !== "/" || parsed.search || parsed.hash) fail("ORIGIN_REFUSED");
  return parsed.origin;
}

export async function createLiveSessionAdapter(config, adminAdapter) {
  const { createServerClient } = await import("@supabase/ssr");
  const cookies = new Map();
  const supabase = createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return [...cookies.entries()].map(([name, value]) => ({ name, value: value.value }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          if (!value || options?.maxAge === 0) cookies.delete(name);
          else cookies.set(name, { value, options });
        }
      },
    },
  });
  const cookieHeader = () => [...cookies.entries()].map(([name, value]) => `${name}=${value.value}`).join("; ");
  return {
    async establish({ email, expectedAuthId, origin }) {
      let tokenHash = null;
      try {
        tokenHash = await adminAdapter.generateMagicLink(email, `${origin}/auth/callback?next=%2Fportal`);
        const result = await supabase.auth.verifyOtp({ type: "magiclink", token_hash: tokenHash });
        if (result.error || !result.data?.session || !result.data?.user) fail("TOKEN_VERIFICATION_FAILED");
        if (result.data.user.id !== expectedAuthId) fail("SESSION_IDENTITY_MISMATCH");
        const header = cookieHeader();
        if (!header) fail("SESSION_COOKIE_MISSING");
        return { userIdMatches: true, cookieHeader: header, cookieCount: cookies.size };
      } finally {
        tokenHash = null;
      }
    },
    async signOut() {
      const result = await supabase.auth.signOut({ scope: "local" });
      if (result.error) fail("SIGN_OUT_FAILED");
      const cleared = cookies.size === 0;
      cookies.clear();
      return { cleared, cookieHeader: "" };
    },
    clear() {
      cookies.clear();
    },
  };
}

async function readHttp(httpAdapter, url, cookieHeader = "") {
  try {
    return await httpAdapter.get(url, cookieHeader);
  } catch {
    fail("HTTP_JOURNEY_FAILED");
  }
}

function isSignInRedirect(response) {
  return [302, 303, 307, 308].includes(response.status) && typeof response.location === "string" && response.location.includes("/sign-in");
}

const WRONG_HORSE_PROTECTED_MARKERS = Object.freeze([
  FIXTURE.horseName,
  FIXTURE.stableName,
  "Status:",
  "Count:",
  "Breed:",
  "Colour:",
  "Date of birth:",
  "Latest result:",
  "Operational summary",
  "Workflow state",
]);

function assertWrongHorseDenied(response) {
  if (
    response.status !== 200
    || typeof response.body !== "string"
    || !response.body.includes("Horse not available")
    || WRONG_HORSE_PROTECTED_MARKERS.some((marker) => response.body.includes(marker))
  ) {
    fail("WRONG_HORSE_DENIAL_FAILED");
  }
}

export async function proveSessionJourney({ sessionAdapter, httpAdapter, ledger, email, origin }) {
  const session = await sessionAdapter.establish({ email, expectedAuthId: ledger.ids.auth, origin });
  if (!session.userIdMatches) fail("SESSION_IDENTITY_MISMATCH");
  if (!session.cookieHeader || !Number.isInteger(session.cookieCount) || session.cookieCount < 1) fail("SESSION_COOKIE_MISSING");
  let portalBody = "";
  let horseBody = "";
  let workflowBody = "";
  let wrongBody = "";
  try {
    const portal = await readHttp(httpAdapter, `${origin}/portal`, session.cookieHeader);
    portalBody = portal.body;
    if (portal.status !== 200 || !portalBody.includes("Trainer dashboard") || !portalBody.includes(FIXTURE.horseName) || !portalBody.includes(FIXTURE.stableName)) fail("PORTAL_PROOF_FAILED");

    const horse = await readHttp(httpAdapter, `${origin}/portal/horses/${ledger.ids.horse}`, session.cookieHeader);
    horseBody = horse.body;
    if (horse.status !== 200 || !horseBody.includes("Horse Detail") || !horseBody.includes(FIXTURE.horseName) || horseBody.includes("Horse not available")) fail("HORSE_WORKSPACE_PROOF_FAILED");

    const workflow = await readHttp(httpAdapter, `${origin}/data-entry`, session.cookieHeader);
    workflowBody = workflow.body;
    if (workflow.status !== 200 || !workflowBody.includes("Daily record submission")) fail("WORKFLOW_PERMISSION_PROOF_FAILED");

    const wrongHorseId = ledger.wrongHorseId;
    const wrong = await readHttp(httpAdapter, `${origin}/portal/horses/${wrongHorseId}`, session.cookieHeader);
    wrongBody = wrong.body;
    assertWrongHorseDenied(wrong);

    const signedOut = await sessionAdapter.signOut();
    if (!signedOut.cleared || signedOut.cookieHeader) fail("SIGN_OUT_FAILED");
    const deniedAfterSignOut = await readHttp(httpAdapter, `${origin}/portal`, signedOut.cookieHeader);
    if (!isSignInRedirect(deniedAfterSignOut)) fail("SIGN_OUT_FAILED");
    const anonymous = await readHttp(httpAdapter, `${origin}/portal`, "");
    if (!isSignInRedirect(anonymous)) fail("ANONYMOUS_DENIAL_FAILED");

    return {
      session: session.userIdMatches,
      cookiesInMemory: session.cookieCount > 0,
      portal: true,
      horseWorkspace: true,
      workflowPermission: true,
      wrongHorseDenied: true,
      signOut: true,
      anonymousDenied: true,
    };
  } finally {
    portalBody = "";
    horseBody = "";
    workflowBody = "";
    wrongBody = "";
    sessionAdapter.clear();
  }
}

export function createFetchAdapter() {
  return {
    async get(url, cookieHeader = "") {
      const response = await fetch(url, {
        method: "GET",
        redirect: "manual",
        headers: cookieHeader ? { Cookie: cookieHeader, "Cache-Control": "no-cache" } : { "Cache-Control": "no-cache" },
      });
      const body = await response.text();
      return { status: response.status, location: response.headers.get("location"), body };
    },
  };
}

export function validateMiddlewareContractSources(rootSource, helperSource) {
  const requiredRoot = ["updateSupabaseSession", "await updateSupabaseSession(request)", "return response", "_next/static", "_next/image", "robots.txt", "sitemap.xml"];
  const requiredHelper = ["request.cookies.set", "response.cookies.set", "private, no-store", "supabase.auth.getUser()", "catch"];
  if (requiredRoot.some((value) => !rootSource.includes(value)) || requiredHelper.some((value) => !helperSource.includes(value))) fail("MIDDLEWARE_CONTRACT_FAILED");
  if (rootSource.includes("requirePortalAppContext") || rootSource.includes("redirect(")) fail("MIDDLEWARE_CONTRACT_FAILED");
  return true;
}

async function classify(adapter, ledger) {
  const population = await adapter.listAuthUsers();
  return classifyAuthPopulation(population, ledger);
}

export async function runMode({ mode, env = process.env, ledgerPath = LEDGER_PATH, origin = CANONICAL_ORIGIN, adapter: injectedAdapter = null, bindingAdapter: injectedBindingAdapter = null, sessionAdapter: injectedSessionAdapter = null, httpAdapter: injectedHttpAdapter = null }) {
  let config = null;
  let ledger = null;
  let adapter = injectedAdapter;
  let authoritativeEmail = null;
  try {
    if (mode === "binding-status") {
      const projection = classifyBindingSet(env);
      return assertSafeResult({ state: "binding-status", mode, ...projection });
    }
    if (mode === "repair-production-bindings") {
      const bindingAdapter = injectedBindingAdapter ?? createBindingProcessAdapter();
      return await repairProductionBindings({ source: env, adapter: bindingAdapter });
    }
    if (mode === "restore-production-bindings") {
      const bindingAdapter = injectedBindingAdapter ?? createBindingProcessAdapter();
      return await restoreProductionBindings({ source: env, adapter: bindingAdapter });
    }
    config = validateConfig(env);
    ledger = readLedger(ledgerPath);
    adapter ??= await createSupabaseAdapter(config);
    const before = await classify(adapter, ledger);
    authoritativeEmail = normalizeEmail(before.authoritative.email);
    if (emailDigest(authoritativeEmail) !== ledger.emailHash) fail("AUTHORITATIVE_IDENTITY_MISMATCH");

    if (mode === "classify-reconcile") {
      const graph = await reconcileOwnedGraph(adapter, ledger, authoritativeEmail);
      const after = await classify(adapter, ledger);
      assertExcludedUnchanged(before.excludedFingerprints, after.excludedFingerprints);
      return {
        state: "reconciled",
        mode,
        identityCount: before.identityCount,
        authoritativeCount: before.authoritativeCount,
        excludedCount: before.excludedCount,
        excludedUnchanged: true,
        application: graph.application,
        auth: graph.auth,
        storage: graph.storage,
        wrongHorse: graph.wrongHorse,
        activeUser: graph.activeUser,
        activeProfile: graph.activeProfile,
        activeTrainerMembership: graph.activeTrainerMembership,
        horseRecordsWrite: graph.horseRecordsWrite,
        repair: { inserted: graph.inserted, updated: graph.updated, unchanged: graph.unchanged },
      };
    }

    const graph = await verifyOwnedGraph(adapter, ledger, authoritativeEmail);
    if (mode === "verify") {
      const after = await classify(adapter, ledger);
      assertExcludedUnchanged(before.excludedFingerprints, after.excludedFingerprints);
      return {
        state: "verified",
        mode,
        identityCount: before.identityCount,
        authoritativeCount: 1,
        excludedCount: before.excludedCount,
        excludedUnchanged: true,
        ...graph,
      };
    }

    if (mode === "session-proof") {
      const safeOrigin = validateCanonicalOrigin(origin);
      const sessionAdapter = injectedSessionAdapter ?? await createLiveSessionAdapter(config, adapter);
      const httpAdapter = injectedHttpAdapter ?? createFetchAdapter();
      const journey = await proveSessionJourney({ sessionAdapter, httpAdapter, ledger, email: authoritativeEmail, origin: safeOrigin });
      const after = await classify(adapter, ledger);
      assertExcludedUnchanged(before.excludedFingerprints, after.excludedFingerprints);
      return {
        state: "session-proven",
        mode,
        identityCount: before.identityCount,
        authoritativeCount: 1,
        excludedCount: before.excludedCount,
        excludedUnchanged: true,
        ...graph,
        ...journey,
      };
    }
    fail("MODE_REFUSED");
  } finally {
    authoritativeEmail = null;
    if (config) {
      config.anonKey = null;
      config.serviceRoleKey = null;
    }
    delete env.NEXT_PUBLIC_SUPABASE_URL;
    delete env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete env.SUPABASE_SERVICE_ROLE_KEY;
  }
}

export function parseCli(argv) {
  const mode = argv[2];
  if (!["binding-status", "repair-production-bindings", "restore-production-bindings", "classify-reconcile", "session-proof", "verify"].includes(mode)) fail("MODE_REFUSED");
  let origin = CANONICAL_ORIGIN;
  if (argv.length > 3) {
    if (argv.length !== 5 || argv[3] !== "--origin") fail("MODE_REFUSED");
    origin = argv[4];
  }
  if (mode !== "session-proof" && argv.length > 3) fail("MODE_REFUSED");
  return { mode, origin };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve()
    .then(() => parseCli(process.argv))
    .then(({ mode, origin }) => runMode({ mode, origin }))
    .then((result) => process.stdout.write(`${JSON.stringify(assertSafeResult(result))}\n`))
    .catch((error) => {
      process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`);
      process.exitCode = 2;
    });
}
