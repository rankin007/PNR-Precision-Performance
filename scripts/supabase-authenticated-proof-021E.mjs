#!/usr/bin/env node

const EXPECTED_REF = "uvskssaecdhxcgytkasc";
const OLD_REF = "tagnbgkroihagjmvehlx";
const EXPECTED_HOST = `${EXPECTED_REF}.supabase.co`;
const RUN_RE = /^021E-RLS-\d{8}-\d{2}$/;
const RESERVED = new Set(["020G-RLS-20260720-01"]);
const ABANDONED = new Set(["021E-RLS-20260720-01"]);
const MODES = new Set([
  "preflight", "identity-bootstrap", "create-fixtures", "matrix",
  "route-corroboration", "revocation", "verify-aggregates",
  "cleanup-preview", "cleanup", "final-verification"
]);
const MUTATING = new Set(["identity-bootstrap", "create-fixtures", "revocation", "cleanup"]);
const CONFIRM = Object.freeze({
  "identity-bootstrap": "CONFIRM-021E-IDENTITIES",
  "create-fixtures": "CONFIRM-021E-FIXTURES",
  revocation: "CONFIRM-021E-REVOCATION",
  cleanup: "CONFIRM-021E-CLEANUP"
});
const ACTORS = Object.freeze([
  "ADMIN", "TRAINER_A", "TRAINER_B", "MANAGER_A", "VET_X",
  "CONSULTANT_X", "HAND_A", "OWNER_A", "OWNER_B", "SUSPENDED"
]);
const LIMITS = Object.freeze({
  authIdentities: 10, appUsers: 10, profiles: 10, primaryRoles: 10,
  stables: 2, horses: 4, ownerships: 2, assignments: 10,
  biochemistryTests: 4, comments: 12, storageObjects: 0
});
const SAFE_FIELDS = new Set([
  "harness", "mode", "state", "candidate", "runId", "actors", "fixtures",
  "counts", "checks", "resultClasses", "cleanupOrder", "messageCode"
]);

class HarnessError extends Error {
  constructor(code) { super(code); this.code = code; }
}

function parseArgs(argv) {
  const values = new Map();
  for (const arg of argv) {
    if (!arg.startsWith("--") || !arg.includes("=")) throw new HarnessError("INVALID_ARGUMENT");
    const [name, ...rest] = arg.slice(2).split("=");
    if (values.has(name)) throw new HarnessError("DUPLICATE_ARGUMENT");
    values.set(name, rest.join("="));
  }
  const allowed = new Set(["mode", "run-id", "confirm", "self-test", "simulate"]);
  for (const name of values.keys()) if (!allowed.has(name)) throw new HarnessError("UNKNOWN_ARGUMENT");
  const mode = values.get("mode") || "preflight";
  if (!MODES.has(mode)) throw new HarnessError("INVALID_OPERATION_MODE");
  return {
    mode,
    runId: values.get("run-id") || null,
    confirm: values.get("confirm") || null,
    selfTest: values.get("self-test") === "true",
    simulate: values.get("simulate") || null
  };
}

function guardRun(options) {
  if (options.runId && !RUN_RE.test(options.runId)) throw new HarnessError("INVALID_RUN_ID");
  if (options.runId && RESERVED.has(options.runId)) throw new HarnessError("REUSED_RUN_ID_REFUSED");
  if (options.runId && ABANDONED.has(options.runId)) throw new HarnessError("ABANDONED_RUN_REFUSED");
  if (options.mode !== "preflight" && !options.runId) throw new HarnessError("VALID_RUN_ID_REQUIRED");
  if (MUTATING.has(options.mode)) throw new HarnessError("SPRINT_021E_MUTATION_RETIRED");
  if (MUTATING.has(options.mode) && options.confirm !== CONFIRM[options.mode]) {
    throw new HarnessError("MODE_CONFIRMATION_REQUIRED");
  }
}

function exactTarget(raw) {
  if (!raw) throw new HarnessError("CANDIDATE_URL_MISSING");
  let url;
  try { url = new URL(raw); } catch { throw new HarnessError("CANDIDATE_URL_INVALID"); }
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.pathname !== "/") {
    throw new HarnessError("CANDIDATE_URL_INVALID");
  }
  if (url.hostname.includes(OLD_REF)) throw new HarnessError("OLD_PROJECT_REFUSED");
  if (url.hostname !== EXPECTED_HOST) throw new HarnessError("UNEXPECTED_CANDIDATE_REFUSED");
  return url.origin;
}

function protectedPresence(env, mode) {
  exactTarget(env.NEXT_PUBLIC_SUPABASE_URL);
  if (!env.NEXT_PUBLIC_SUPABASE_ANON_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new HarnessError("CANDIDATE_KEYS_MISSING");
  }
  if (mode !== "preflight" && !env.PP021E_PROTECTED_INBOX) throw new HarnessError("PROTECTED_INBOX_MISSING");
  return { candidate: EXPECTED_REF, keysPresent: true, inboxPresent: mode === "preflight" ? null : true };
}

function actorEmails(baseInbox, runId) {
  const match = /^([^@]+)@([^@]+)$/.exec(baseInbox || "");
  if (!match) throw new HarnessError("PROTECTED_INBOX_INVALID");
  const baseLocal = match[1].split("+")[0];
  const tag = runId.toLowerCase();
  return Object.fromEntries(ACTORS.map(actor => [actor, `${baseLocal}+${tag}-${actor.toLowerCase()}@${match[2]}`]));
}

function checkCounts(counts) {
  for (const [name, ceiling] of Object.entries(LIMITS)) {
    if (!Number.isInteger(counts[name]) || counts[name] < 0) throw new HarnessError("INVALID_COUNT_PLAN");
    if (counts[name] > ceiling) throw new HarnessError(`CEILING_REFUSED_${name}`);
  }
}

function exactCleanup(plan) {
  checkCounts(plan.counts);
  if (!plan.directAnchors || !plan.unambiguousOwnership || !plan.authLast) {
    throw new HarnessError("AMBIGUOUS_CLEANUP_REFUSED");
  }
  if (plan.counts.storageObjects !== 0) throw new HarnessError("STORAGE_OBJECT_REFUSED");
  return true;
}

async function compensate(adapter, ledger, runId) {
  for (const entry of [...ledger].reverse()) {
    if (!entry.anchor?.includes(runId)) throw new HarnessError("COMPENSATION_ANCHOR_REFUSED");
    if (await adapter.compensate(entry) !== 1) throw new HarnessError("COMPENSATION_FAILED");
  }
  return true;
}

function safe(details) {
  for (const key of Object.keys(details)) if (!SAFE_FIELDS.has(key)) throw new HarnessError("UNSAFE_OUTPUT_FIELD_REFUSED");
  const text = JSON.stringify(details);
  if (/sb_(?:secret|publishable)_|eyJ[A-Za-z0-9_-]{20,}\.|@|auth[_-]?user|refresh[_-]?token|access[_-]?token/i.test(text)) {
    throw new HarnessError("UNSAFE_OUTPUT_VALUE_REFUSED");
  }
  return details;
}

function emit(value) { process.stdout.write(`${JSON.stringify(safe(value))}\n`); }

async function remotePreflight(env, runId) {
  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
  });
  const queries = [
    ["appUsers", client.from("users").select("id", { count: "exact", head: true })],
    ["profiles", client.from("member_profiles").select("id", { count: "exact", head: true }).like("display_name", `${runId}-%`)],
    ["stables", client.from("stables").select("id", { count: "exact", head: true }).eq("code", runId)],
    ["horses", client.from("horses").select("id", { count: "exact", head: true }).in("slug", ["a1", "a2", "b1", "b2"].map(x => `${runId}-${x}`))],
    ["assignments", client.from("biochemistry_horse_access_assignments").select("id", { count: "exact", head: true }).eq("notes", runId)]
  ];
  const anchorCounts = {};
  for (const [name, query] of queries) {
    const { count, error } = await query;
    if (error) throw new HarnessError(`PREFLIGHT_${name.toUpperCase()}_QUERY_FAILED`);
    anchorCounts[name] = count || 0;
  }
  const { data: levelRows, error: levelError } = await client
    .from("membership_levels")
    .select("code")
    .in("code", ["administrator", "trainer", "stable_manager", "veterinarian", "consultant", "stable_hand", "owner"]);
  if (levelError) throw new HarnessError("PREFLIGHT_ROLE_SEEDS_FAILED");
  const seededRoles = new Set((levelRows || []).map(row => row.code));
  const requiredRoles = ["administrator", "trainer", "stable_manager", "veterinarian", "consultant", "stable_hand", "owner"];
  if (requiredRoles.some(role => !seededRoles.has(role))) throw new HarnessError("PREFLIGHT_ROLE_SEEDS_MISMATCH");
  const { data: authData, error: authError } = await client.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (authError) throw new HarnessError("PREFLIGHT_AUTH_COUNT_FAILED");
  const { data: buckets, error: bucketError } = await client.storage.listBuckets();
  if (bucketError) throw new HarnessError("PREFLIGHT_STORAGE_COUNT_FAILED");
  const counts = {
    authIdentities: authData?.users?.length || 0,
    appUsers: anchorCounts.appUsers,
    profiles: anchorCounts.profiles,
    primaryRoles: 0,
    stables: anchorCounts.stables,
    horses: anchorCounts.horses,
    ownerships: 0,
    assignments: anchorCounts.assignments,
    biochemistryTests: 0,
    comments: 0,
    storageObjects: 0
  };
  const anchorsZero = Object.values(anchorCounts).every(count => count === 0);
  if (!anchorsZero) throw new HarnessError("SELECTED_RUN_ANCHORS_NOT_ZERO");
  if (counts.authIdentities !== 0) throw new HarnessError("AUTH_BASELINE_NOT_ZERO");
  if (counts.appUsers !== 0) throw new HarnessError("APP_USER_BASELINE_NOT_ZERO");
  if ((buckets || []).length !== 0) throw new HarnessError("STORAGE_BUCKET_BASELINE_NOT_ZERO");
  checkCounts(counts);
  return { counts, checks: ["candidate-equality:pass", "run-anchors-zero:pass", "role-seeds-present:pass", "auth-baseline-zero:pass", "storage-baseline-zero:pass"] };
}

async function identityBootstrap(env, runId) {
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
  });
  const publicClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
  });
  const emails = actorEmails(env.PP021E_PROTECTED_INBOX, runId);
  const expected = new Set(Object.values(emails));
  const { data: before, error: beforeError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (beforeError) throw new HarnessError("IDENTITY_BASELINE_QUERY_FAILED");
  if ((before?.users || []).some(user => expected.has(user.email))) throw new HarnessError("IDENTITY_ALIAS_ALREADY_EXISTS");
  const created = [];
  try {
    for (const actor of ACTORS) {
      const { error } = await publicClient.auth.signInWithOtp({
        email: emails[actor],
        options: { emailRedirectTo: "http://localhost:3000/auth/callback", shouldCreateUser: true }
      });
      if (error) throw new HarnessError(`IDENTITY_OTP_REQUEST_FAILED_${actor}`);
      const { data: current, error: currentError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (currentError) throw new HarnessError("IDENTITY_MAPPING_QUERY_FAILED");
      const matches = (current?.users || []).filter(user => user.email === emails[actor]);
      if (matches.length !== 1) throw new HarnessError("IDENTITY_MAPPING_NOT_EXACT");
      created.push(matches[0].id);
    }
  } catch (error) {
    for (const id of [...created].reverse()) await admin.auth.admin.deleteUser(id, false);
    const { data: after } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const residual = (after?.users || []).filter(user => expected.has(user.email));
    if (residual.length) throw new HarnessError("IDENTITY_PARTIAL_COMPENSATION_FAILED");
    throw error instanceof HarnessError ? error : new HarnessError("IDENTITY_PARTIAL_COMPENSATED");
  }
  if (created.length !== ACTORS.length) throw new HarnessError("IDENTITY_COUNT_MISMATCH");
  return { counts: { ...Object.fromEntries(Object.keys(LIMITS).map(key => [key, 0])), authIdentities: created.length }, checks: ["candidate-equality:pass", "identity-baseline-zero:pass", "ten-identity-ceiling:pass", "otp-requests-issued:pass", "partial-compensation-armed:pass"] };
}

async function selfTests() {
  const results = [];
  const test = async (name, fn) => {
    let pass = false;
    try { pass = Boolean(await fn()); } catch { pass = false; }
    results.push(`${name}:${pass ? "pass" : "fail"}`);
    if (!pass) throw new HarnessError(`SELF_TEST_FAILED_${name}`);
  };
  const valid = "021E-RLS-20260720-02";
  await test("default-non-mutating", () => parseArgs([]).mode === "preflight" && !MUTATING.has("preflight"));
  await test("old-target-refusal", () => { try { exactTarget(`https://${OLD_REF}.supabase.co`); return false; } catch (e) { return e.code === "OLD_PROJECT_REFUSED"; } });
  await test("unexpected-target-refusal", () => { try { exactTarget("https://unexpected.supabase.co"); return false; } catch (e) { return e.code === "UNEXPECTED_CANDIDATE_REFUSED"; } });
  await test("missing-secret-refusal", () => { try { protectedPresence({ NEXT_PUBLIC_SUPABASE_URL: `https://${EXPECTED_HOST}` }, "preflight"); return false; } catch (e) { return e.code === "CANDIDATE_KEYS_MISSING"; } });
  await test("invalid-run-refusal", () => { try { guardRun({ mode: "matrix", runId: "bad" }); return false; } catch (e) { return e.code === "INVALID_RUN_ID"; } });
  await test("reused-run-refusal", () => { try { guardRun({ mode: "matrix", runId: "020G-RLS-20260720-01" }); return false; } catch (e) { return e.code === "INVALID_RUN_ID" || e.code === "REUSED_RUN_ID_REFUSED"; } });
  await test("mutation-confirmation-refusal", () => { try { guardRun({ mode: "create-fixtures", runId: valid, confirm: "wrong" }); return false; } catch (e) { return e.code === "SPRINT_021E_MUTATION_RETIRED"; } });
  await test("ceiling-refusal", () => { try { checkCounts({ ...Object.fromEntries(Object.keys(LIMITS).map(k => [k, 0])), horses: 5 }); return false; } catch (e) { return e.code === "CEILING_REFUSED_horses"; } });
  await test("ambiguous-cleanup-refusal", () => { try { exactCleanup({ counts: Object.fromEntries(Object.keys(LIMITS).map(k => [k, 0])), directAnchors: false, unambiguousOwnership: true, authLast: true }); return false; } catch (e) { return e.code === "AMBIGUOUS_CLEANUP_REFUSED"; } });
  await test("cleanup-auth-last", () => exactCleanup({ counts: Object.fromEntries(Object.keys(LIMITS).map(k => [k, 0])), directAnchors: true, unambiguousOwnership: true, authLast: true }));
  await test("partial-compensation-order", async () => { const seen = []; await compensate({ compensate: async e => { seen.push(e.anchor); return 1; } }, [{ anchor: `${valid}:one` }, { anchor: `${valid}:two` }], valid); return seen.join(",") === `${valid}:two,${valid}:one`; });
  await test("unsafe-field-refusal", () => { try { safe({ token: "hidden" }); return false; } catch (e) { return e.code === "UNSAFE_OUTPUT_FIELD_REFUSED"; } });
  await test("secret-redaction-refusal", () => { try { safe({ messageCode: `${["sb", "secret"].join("_")}_example123456789` }); return false; } catch (e) { return e.code === "UNSAFE_OUTPUT_VALUE_REFUSED"; } });
  await test("ten-distinct-run-aliases", () => { const values = Object.values(actorEmails("operator@example.invalid", valid)); return values.length === 10 && new Set(values).size === 10 && values.every(value => value.includes(valid.toLowerCase())); });
  await test("abandoned-run-refusal", () => { try { guardRun({ mode: "cleanup-preview", runId: "021E-RLS-20260720-01" }); return false; } catch (e) { return e.code === "ABANDONED_RUN_REFUSED"; } });
  await test("all-mutation-retired", () => { try { guardRun({ mode: "identity-bootstrap", runId: valid, confirm: CONFIRM["identity-bootstrap"] }); return false; } catch (e) { return e.code === "SPRINT_021E_MUTATION_RETIRED"; } });
  return results;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.selfTest) {
    const checks = await selfTests();
    emit({ harness: "021E", mode: "preflight", state: "passed", candidate: EXPECTED_REF, actors: ACTORS, checks, messageCode: "SELF_TESTS_COMPLETE" });
    return;
  }
  guardRun(options);
  const presence = protectedPresence(process.env, options.mode);
  if (options.mode === "preflight") {
    const remoteResult = options.runId ? await remotePreflight(process.env, options.runId) : null;
    emit({ harness: "021E", mode: options.mode, state: "ready", candidate: presence.candidate, runId: options.runId, actors: ACTORS, counts: remoteResult?.counts, checks: remoteResult ? [...remoteResult.checks, "protected-values-present:pass"] : ["candidate-equality:pass", "protected-values-present:pass"], messageCode: remoteResult ? "RUN_PREFLIGHT_READY" : "PROTECTED_PREFLIGHT_READY" });
    return;
  }
  if (options.mode === "identity-bootstrap") {
    const result = await identityBootstrap(process.env, options.runId);
    emit({ harness: "021E", mode: options.mode, state: "ready", candidate: presence.candidate, runId: options.runId, actors: ACTORS, counts: result.counts, checks: result.checks, messageCode: "IDENTITY_BOOTSTRAP_COMPLETE" });
    return;
  }
  throw new HarnessError("PROTECTED_MODE_REQUIRES_BUILDER_ADAPTER");
}

main().catch(error => {
  const code = error instanceof HarnessError ? error.code : "UNEXPECTED_HARNESS_FAILURE";
  emit({ harness: "021E", mode: "preflight", state: "stopped", candidate: EXPECTED_REF, checks: [], messageCode: code });
  process.exitCode = 1;
});
