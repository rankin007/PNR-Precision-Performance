#!/usr/bin/env node

const REF = "uvskssaecdhxcgytkasc";
const REDIRECT = "https://pnr-precision-performance-osu11rk3f-rankin007s-projects.vercel.app/auth/callback";
const ALIASES = ["A", "B", "C"];
const allowedStates = new Set(["existing-tagged", "invited-tagged"]);

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

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
  const rawMap = process.env.PP035C_PARTICIPANT_MAP;
  if (!url || !service || !rawMap) fail("PROTECTED_CONFIG_MISSING");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.hostname !== `${REF}.supabase.co` || parsed.pathname !== "/") fail("TARGET_REFUSED");
  let mapping;
  try { mapping = JSON.parse(rawMap); } catch { fail("MAPPING_INVALID"); }
  if (Object.keys(mapping).sort().join(",") !== ALIASES.join(",") || ALIASES.some(alias => typeof mapping[alias] !== "string" || !mapping[alias].includes("@"))) fail("MAPPING_INVALID");
  if (new Set(ALIASES.map(alias => mapping[alias].trim().toLowerCase())).size !== ALIASES.length) fail("DUPLICATE_MAPPING_REFUSED");
  return { url, service, mapping };
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

async function apply() {
  const protectedConfig = config();
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const known = await users(admin);
  const report = {};
  const changed = [];
  try {
    for (const alias of ALIASES) {
      const email = protectedConfig.mapping[alias].trim().toLowerCase();
      const matches = known.filter(user => user.email?.trim().toLowerCase() === email);
      if (matches.length > 1) fail(`DUPLICATE_IDENTITY_${alias}`);
      let user = matches[0];
      let state = "existing-tagged";
      if (!user) {
        const invited = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: REDIRECT });
        if (invited.error || !invited.data.user) fail(`INVITE_FAILED_${alias}`);
        user = invited.data.user;
        state = "invited-tagged";
      }
      changed.push({ id: user.id, state, original: { ...(user.app_metadata || {}) } });
      const updated = await admin.auth.admin.updateUserById(user.id, { app_metadata: mergePilotMetadata(user.app_metadata, alias) });
      if (updated.error) fail(`TAG_FAILED_${alias}`);
      report[alias] = state;
    }
  } catch (error) {
    let compensated = true;
    for (const item of changed.reverse()) {
      const result = item.state === "invited-tagged"
        ? await admin.auth.admin.deleteUser(item.id, false)
        : await admin.auth.admin.updateUserById(item.id, { app_metadata: item.original });
      if (result.error) compensated = false;
    }
    if (!compensated) fail("COMPENSATION_FAILED");
    throw error;
  }
  process.stdout.write(`${JSON.stringify({ state: "pass", redirect: "exact-approved-preview", fields: ["participant_alias", "pilot_sprint"], participants: report })}\n`);
  protectedConfig.mapping = null;
  protectedConfig.service = null;
  delete process.env.PP035C_PARTICIPANT_MAP;
  delete process.env.PP035C_SERVICE_ROLE_KEY;
}

async function cleanup() {
  const protectedConfig = config();
  let ownership;
  try { ownership = JSON.parse(process.env.PP035C_OWNERSHIP || ""); } catch { fail("OWNERSHIP_INVALID"); }
  if (Object.keys(ownership).sort().join(",") !== ALIASES.join(",") || ALIASES.some(alias => !allowedStates.has(ownership[alias]))) fail("OWNERSHIP_INVALID");
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(protectedConfig.url, protectedConfig.service, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const known = await users(admin);
  const report = {};
  for (const alias of ALIASES) {
    const matches = known.filter(user => user.app_metadata?.participant_alias === alias && user.app_metadata?.pilot_sprint === "035C");
    if (matches.length !== 1) fail(`TAG_MATCH_AMBIGUOUS_${alias}`);
    const user = matches[0];
    if (ownership[alias] === "invited-tagged") {
      const removed = await admin.auth.admin.deleteUser(user.id, false);
      if (removed.error) fail(`AUTH_DELETE_FAILED_${alias}`);
      report[alias] = "owned-deleted";
    } else {
      const updated = await admin.auth.admin.updateUserById(user.id, { app_metadata: removePilotMetadata(user.app_metadata) });
      if (updated.error) fail(`TAG_REMOVE_FAILED_${alias}`);
      report[alias] = "not-owned-tags-removed";
    }
  }
  process.stdout.write(`${JSON.stringify({ state: "pass", fieldsRemoved: ["participant_alias", "pilot_sprint"], participants: report })}\n`);
  protectedConfig.mapping = null;
  protectedConfig.service = null;
  delete process.env.PP035C_PARTICIPANT_MAP;
  delete process.env.PP035C_SERVICE_ROLE_KEY;
  delete process.env.PP035C_OWNERSHIP;
}

function selfTest() {
  const merged = mergePilotMetadata({ provider: "email", unrelated: "preserved" }, "A");
  if (merged.provider !== "email" || merged.unrelated !== "preserved" || merged.participant_alias !== "A" || merged.pilot_sprint !== "035C") fail("SELF_MERGE");
  const removed = removePilotMetadata(merged);
  if (removed.provider !== "email" || removed.unrelated !== "preserved" || "participant_alias" in removed || "pilot_sprint" in removed) fail("SELF_REMOVE");
  process.stdout.write(`${JSON.stringify({ state: "pass", checks: ["allowlist", "merge-preserves", "cleanup-preserves", "sanitized-output"], redirect: "exact-approved-preview" })}\n`);
}

const mode = process.argv[2] || "--self-test";
Promise.resolve(mode === "--self-test" ? selfTest() : mode === "--apply" ? apply() : mode === "--cleanup" ? cleanup() : fail("MODE_REFUSED"))
  .catch(error => { process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: /^[A-Z0-9_]+$/.test(error.code || error.message) ? (error.code || error.message) : "UNEXPECTED" })}\n`); process.exitCode = 2; });
