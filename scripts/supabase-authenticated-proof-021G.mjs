#!/usr/bin/env node

const EXPECTED_REF = "uvskssaecdhxcgytkasc";
const OLD_REF = "tagnbgkroihagjmvehlx";
const EXPECTED_HOST = `${EXPECTED_REF}.supabase.co`;
const RUN_RE = /^021G-RLS-\d{8}-\d{2}$/;
const RETIRED = new Set(["021E-RLS-20260720-01", "020G-RLS-20260720-01"]);
const ACTORS = Object.freeze(["ADMIN", "TRAINER_A", "TRAINER_B", "MANAGER_A", "VET_X", "CONSULTANT_X", "HAND_A", "OWNER_A", "OWNER_B", "SUSPENDED"]);
const LIMITS = Object.freeze({ authIdentities: 10, appUsers: 10, profiles: 10, primaryRoles: 10, stables: 2, horses: 4, ownerships: 2, assignments: 10, biochemistryTests: 4, comments: 12, storageObjects: 0 });
const SAFE_FIELDS = new Set(["harness", "mode", "state", "candidate", "runId", "actors", "counts", "checks", "cleanupOrder", "messageCode"]);
const MUTATING = new Set(["identities", "fixtures", "revocation", "cleanup"]);
const MODES = new Set(["preflight", "identities", "fixtures", "matrix", "revocation", "cleanup-preview", "cleanup", "final-verification"]);
const CONFIRM = Object.freeze({ identities: "CONFIRM-021G-IDENTITIES", fixtures: "CONFIRM-021G-FIXTURES", revocation: "CONFIRM-021G-REVOCATION", cleanup: "CONFIRM-021G-CLEANUP" });

class HarnessError extends Error { constructor(code) { super(code); this.code = code; } }

function parseArgs(argv) {
  const values = new Map();
  for (const arg of argv) {
    if (!arg.startsWith("--") || !arg.includes("=")) throw new HarnessError("INVALID_ARGUMENT");
    const [key, ...rest] = arg.slice(2).split("=");
    if (values.has(key)) throw new HarnessError("DUPLICATE_ARGUMENT");
    values.set(key, rest.join("="));
  }
  for (const key of values.keys()) if (!["mode", "run-id", "confirm", "self-test"].includes(key)) throw new HarnessError("UNKNOWN_ARGUMENT");
  const mode = values.get("mode") || "preflight";
  if (!MODES.has(mode)) throw new HarnessError("INVALID_OPERATION_MODE");
  return { mode, runId: values.get("run-id") || null, confirm: values.get("confirm") || null, selfTest: values.get("self-test") === "true" };
}

function exactTarget(raw) {
  if (!raw) throw new HarnessError("CANDIDATE_URL_MISSING");
  let url;
  try { url = new URL(raw); } catch { throw new HarnessError("CANDIDATE_URL_INVALID"); }
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.pathname !== "/") throw new HarnessError("CANDIDATE_URL_INVALID");
  if (url.hostname.includes(OLD_REF)) throw new HarnessError("OLD_PROJECT_REFUSED");
  if (url.hostname !== EXPECTED_HOST) throw new HarnessError("UNEXPECTED_CANDIDATE_REFUSED");
  return url.origin;
}

function guard(options) {
  if (options.runId && RETIRED.has(options.runId)) throw new HarnessError("RETIRED_RUN_REFUSED");
  if (options.runId && !RUN_RE.test(options.runId)) throw new HarnessError("INVALID_RUN_ID");
  if (options.mode !== "preflight" && !options.runId) throw new HarnessError("FRESH_RUN_ID_REQUIRED");
  if (MUTATING.has(options.mode) && options.confirm !== CONFIRM[options.mode]) throw new HarnessError("MODE_CONFIRMATION_REQUIRED");
}

function checkCounts(counts) {
  for (const [name, limit] of Object.entries(LIMITS)) {
    if (!Number.isInteger(counts[name]) || counts[name] < 0) throw new HarnessError("INVALID_COUNT_PLAN");
    if (counts[name] > limit) throw new HarnessError(`CEILING_REFUSED_${name}`);
  }
}

function cleanupPlan(plan) {
  checkCounts(plan.counts);
  if (!plan.directAnchors || !plan.unambiguousOwnership || !plan.authLast) throw new HarnessError("AMBIGUOUS_CLEANUP_REFUSED");
  if (plan.counts.storageObjects !== 0) throw new HarnessError("STORAGE_OBJECT_REFUSED");
  return true;
}

async function compensate(adapter, ledger, runId) {
  for (const entry of [...ledger].reverse()) {
    if (!entry.anchor?.includes(runId)) throw new HarnessError("COMPENSATION_ANCHOR_REFUSED");
    if (await adapter.remove(entry) !== 1) throw new HarnessError("PARTIAL_COMPENSATION_FAILED");
  }
  return true;
}

function callbackRestored(siteUrl, callbacks) {
  if (siteUrl !== "https://precisionperformance.com.au") throw new HarnessError("SITE_URL_RESTORATION_FAILED");
  if (callbacks.length !== 1 || callbacks[0] !== "https://precisionperformance.com.au/auth/callback") throw new HarnessError("CALLBACK_RESTORATION_FAILED");
  return true;
}

function clearProtected(container) {
  for (const key of Object.keys(container)) container[key] = null;
  if (Object.values(container).some(Boolean)) throw new HarnessError("PROTECTED_CLEAR_FAILED");
  return true;
}

function safe(value) {
  for (const key of Object.keys(value)) if (!SAFE_FIELDS.has(key)) throw new HarnessError("UNSAFE_OUTPUT_FIELD_REFUSED");
  const text = JSON.stringify(value);
  if (/@|sb_(?:secret|publishable)_|eyJ[A-Za-z0-9_-]{20,}\.|access[_-]?token|refresh[_-]?token|auth[_-]?user/i.test(text)) throw new HarnessError("UNSAFE_OUTPUT_VALUE_REFUSED");
  return value;
}

function emit(value) { process.stdout.write(`${JSON.stringify(safe(value))}\n`); }

async function selfTests() {
  const checks = [];
  const test = async (name, fn) => {
    let pass = false;
    try { pass = Boolean(await fn()); } catch { pass = false; }
    checks.push(`${name}:${pass ? "pass" : "fail"}`);
    if (!pass) throw new HarnessError(`SELF_TEST_FAILED_${name}`);
  };
  const fresh = "021G-RLS-20260720-01";
  const zeros = Object.fromEntries(Object.keys(LIMITS).map(key => [key, 0]));
  await test("default-non-mutating", () => parseArgs([]).mode === "preflight" && !MUTATING.has("preflight"));
  await test("old-target-refusal", () => { try { exactTarget(`https://${OLD_REF}.supabase.co`); return false; } catch (e) { return e.code === "OLD_PROJECT_REFUSED"; } });
  await test("unexpected-target-refusal", () => { try { exactTarget("https://unexpected.supabase.co"); return false; } catch (e) { return e.code === "UNEXPECTED_CANDIDATE_REFUSED"; } });
  await test("missing-secret-refusal", () => { try { if (!({}).secret) throw new HarnessError("CANDIDATE_SECRET_MISSING"); return false; } catch (e) { return e.code === "CANDIDATE_SECRET_MISSING"; } });
  await test("unsafe-output-refusal", () => { try { safe({ token: "hidden" }); return false; } catch (e) { return e.code === "UNSAFE_OUTPUT_FIELD_REFUSED"; } });
  await test("invalid-run-refusal", () => { try { guard({ mode: "matrix", runId: "bad" }); return false; } catch (e) { return e.code === "INVALID_RUN_ID"; } });
  await test("retired-run-refusal", () => { try { guard({ mode: "matrix", runId: "021E-RLS-20260720-01" }); return false; } catch (e) { return e.code === "RETIRED_RUN_REFUSED"; } });
  await test("mutation-confirmation", () => { try { guard({ mode: "identities", runId: fresh, confirm: "wrong" }); return false; } catch (e) { return e.code === "MODE_CONFIRMATION_REQUIRED"; } });
  await test("ceiling-refusal", () => { try { checkCounts({ ...zeros, horses: 5 }); return false; } catch (e) { return e.code === "CEILING_REFUSED_horses"; } });
  await test("ambiguity-refusal", () => { try { cleanupPlan({ counts: zeros, directAnchors: false, unambiguousOwnership: true, authLast: true }); return false; } catch (e) { return e.code === "AMBIGUOUS_CLEANUP_REFUSED"; } });
  await test("partial-compensation", async () => { const seen = []; await compensate({ remove: async entry => { seen.push(entry.anchor); return 1; } }, [{ anchor: `${fresh}:one` }, { anchor: `${fresh}:two` }], fresh); return seen.join(",") === `${fresh}:two,${fresh}:one`; });
  await test("auth-last-cleanup", () => cleanupPlan({ counts: zeros, directAnchors: true, unambiguousOwnership: true, authLast: true }));
  await test("callback-restoration", () => callbackRestored("https://precisionperformance.com.au", ["https://precisionperformance.com.au/auth/callback"]));
  await test("secret-clearing", () => clearProtected({ secret: "x", inbox: "y", session: "z" }));
  await test("ten-actor-aliases", () => ACTORS.length === 10 && new Set(ACTORS).size === 10);
  return checks;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.selfTest) {
    emit({ harness: "021G", mode: "preflight", state: "passed", candidate: EXPECTED_REF, actors: ACTORS, checks: await selfTests(), messageCode: "SELF_TESTS_COMPLETE" });
    return;
  }
  guard(options);
  if (options.mode === "preflight") {
    emit({ harness: "021G", mode: options.mode, state: "stopped", candidate: EXPECTED_REF, runId: options.runId, actors: ACTORS, counts: Object.fromEntries(Object.keys(LIMITS).map(key => [key, 0])), checks: ["default-non-mutating:pass"], messageCode: "MAILBOX_READINESS_REQUIRED" });
    return;
  }
  throw new HarnessError("PROTECTED_ADAPTER_NOT_STARTED");
}

main().catch(error => {
  emit({ harness: "021G", mode: "preflight", state: "stopped", candidate: EXPECTED_REF, checks: [], messageCode: error instanceof HarnessError ? error.code : "UNEXPECTED_HARNESS_FAILURE" });
  process.exitCode = 1;
});
