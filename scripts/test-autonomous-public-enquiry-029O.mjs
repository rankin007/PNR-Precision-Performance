import assert from "node:assert/strict";
import {
  ALIASES, BRANCH, CANDIDATE_ORDER, CLEANUP_JOB, CONFIGURATION_NAMES, HISTORICAL_REFERENCE, INERT_DEPLOYMENT,
  PROJECT_ID, PROJECT_REF, ROLLBACK_DEPLOYMENT, ROLLBACK_ORDER, START_SHA, aggregateStatus, assertSafeOutput,
  expectedAliasTransition, fixturePurge, immutableCandidate, liveCandidate, parseCli, retentionProof,
  runtimeConfigurationProjection, sanitizeFailure, smtpPreflight, validateAliasInventory, validateCandidateOrigin,
} from "./autonomous-public-enquiry-029O.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsCode = (operation, code) => { assertions += 1; assert.throws(operation, (error) => error?.code === code); };

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "exact Vercel project");
equal(PROJECT_REF, "uvskssaecdhxcgytkasc", "exact Supabase project");
equal(BRANCH, "codex/029O-public-enquiry-corrective-completion", "exact branch");
equal(START_SHA, "8968415a89dc187e3994cd9bcb8bcecd793a0854", "exact start");
equal(ROLLBACK_DEPLOYMENT, "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf", "exact rollback");
equal(INERT_DEPLOYMENT, "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB", "inert candidate fixed");
check(/^PP-[A-F0-9]{16}$/.test(HISTORICAL_REFERENCE), "historical reference is an exact refused reference");
check(CLEANUP_JOB.name === "trainer-enquiry-abuse-cleanup-hourly" && CLEANUP_JOB.schedule === "5 * * * *", "cleanup identity exact");
equal(ALIASES.length, 5, "five aliases");
check(new Set(ALIASES).size === 5 && CANDIDATE_ORDER[0] === ALIASES[4] && CANDIDATE_ORDER[4] === ALIASES[0] && ROLLBACK_ORDER[0] === ALIASES[0], "orders fixed and distinct");
equal(CONFIGURATION_NAMES.length, 11, "configuration set exact");
check(["CONTACT_ENQUIRY_EMAIL", "ENQUIRY_ABUSE_HMAC_SECRET", "CRON_SECRET"].every((name) => CONFIGURATION_NAMES.includes(name)), "private binding names included");

const origin = "https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app";
equal(validateCandidateOrigin(origin), origin, "candidate origin accepted");
check(["http://pnr-precision-performance-abc123-rankin007s-projects.vercel.app", "https://precisionperformance.com.au", "https://evil.example", `${origin}/path`].every((value) => {
  try { validateCandidateOrigin(value); return false; } catch (error) { return error?.code === "ORIGIN_REFUSED"; }
}), "invalid origins refused");

const aliasRows = ALIASES.map((alias) => ({ alias, deployment: ROLLBACK_DEPLOYMENT }));
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).targetCount, 5, "five aliases target rollback");
throwsCode(() => validateAliasInventory(aliasRows.slice(1), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
throwsCode(() => validateAliasInventory(aliasRows.map((row, index) => index ? row : { ...row, deployment: "dpl_other" }), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
check([0, 1, 2, 3, 4, 5].every((step) => {
  const value = expectedAliasTransition(CANDIDATE_ORDER, step); return value.target === step && value.other === 5 - step;
}), "all candidate transitions exact");
throwsCode(() => expectedAliasTransition(CANDIDATE_ORDER, 6), "RESPONSE_REFUSED");

const readyEnv = Object.fromEntries(CONFIGURATION_NAMES.map((name) => [name, `${name}-opaque-value-abcdefghijklmnopqrstuvwxyz`]));
readyEnv.SMTP_HOST = "smtp.resend.com";
readyEnv.SMTP_PORT = "465";
readyEnv.NEXT_PUBLIC_SUPABASE_URL = "https://uvskssaecdhxcgytkasc.supabase.co";
const projection = runtimeConfigurationProjection(readyEnv);
equal(projection.state, "runtime-ready", "runtime ready");
equal(projection.bindingCount, 11, "binding count exact");
equal(projection.providerClass, "resend", "provider classified");
equal(projection.recipientAvailable, true, "recipient available boolean");
equal(projection.supabaseTarget, "approved", "Supabase target exact");
equal(runtimeConfigurationProjection({ ...readyEnv, CONTACT_ENQUIRY_EMAIL: "" }).state, "runtime-unavailable", "missing recipient refuses runtime");
equal(runtimeConfigurationProjection({ ...readyEnv, SMTP_HOST: "unapproved.example" }).providerClass, "unclassified", "provider fails closed");

equal(assertSafeOutput({ state: "safe", count: 1 }).state, "safe", "finite output accepted");
throwsCode(() => assertSafeOutput({ detail: "private@example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ detail: "smtp.example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ state: "unsafe", detail: "opaque-secret-value" }, ["opaque-secret-value"]), "PRIVACY_REFUSED");
equal(sanitizeFailure({ code: "PREFLIGHT_REFUSED" }), "PREFLIGHT_REFUSED", "safe failure retained");
equal(sanitizeFailure(new Error("private provider response")), "UNEXPECTED", "unknown failure sanitized");

equal(parseCli(["node", "script", "runtime-status"]).mode, "runtime-status", "runtime CLI");
equal(parseCli(["node", "script", "immutable", "--origin", origin]).mode, "immutable", "immutable CLI");
equal(parseCli(["node", "script", "smtp-preflight", "--origin", origin]).mode, "smtp-preflight", "preflight CLI");
equal(parseCli(["node", "script", "retention-proof", "--origin", origin]).mode, "retention-proof", "retention CLI");
equal(parseCli(["node", "script", "aggregate-status", "--origin", origin]).mode, "aggregate-status", "aggregate CLI");
equal(parseCli(["node", "script", "live-candidate", "--origin", origin]).mode, "live-candidate", "live CLI");
equal(parseCli(["node", "script", "fixture-status", "--origin", origin, "--reference", "PP-ABCDEF0123456789"]).mode, "fixture-status", "status CLI");
equal(parseCli(["node", "script", "fixture-purge", "--origin", origin, "--reference", "PP-ABCDEF0123456789"]).mode, "fixture-purge", "purge CLI");
throwsCode(() => parseCli(["node", "script", "unknown"]), "MODE_REFUSED");

function response(status, body, location = null) {
  return { status, ok: status >= 200 && status < 300, headers: { get: (name) => name.toLowerCase() === "location" ? location : null }, text: async () => typeof body === "string" ? body : JSON.stringify(body), json: async () => body };
}
const calls = [];
let stored = true;
const reference = "PP-ABCDEF0123456789";
const fakeFetch = async (url, options = {}) => {
  const parsed = new URL(url); const method = options.method ?? "GET";
  calls.push({ path: parsed.pathname, method, body: options.body ?? "", origin: options.headers?.origin ?? "" });
  if (parsed.pathname === "/api/internal/enquiries") {
    const action = JSON.parse(options.body).action;
    if (action === "smtp-preflight") return response(200, { result: "smtp-preflight", status: "ready", providerClass: "resend", errorClass: null });
    if (action === "retention-proof") return response(200, { result: "retention-proven", enquiryRetained: 1, bucketDeleted: 1, linkNulled: 1, fixtureResidue: 0 });
    if (action === "rate-limit-proof") return response(200, { result: "rate-limit-proven", limited: true, rowsCreated: 0, notificationsAttempted: 0, fixtureResidue: 0 });
    if (action === "purge-fixture") { stored = false; return response(200, { result: "deleted", rows_deleted: 1, buckets_deleted: 1 }); }
    if (action === "status") return response(200, { result: "status", row_count: stored ? 1 : 0, bucket_count: stored ? 1 : 0, notification_status: stored ? "sent" : null, notification_attempts: stored ? 1 : 0 });
    if (action === "schema-status") return response(200, { result: "schema-status", enquiry_row_count: 0, bucket_row_count: 0 });
  }
  if (parsed.pathname === "/api/enquiries" && method === "POST") {
    const body = JSON.parse(options.body);
    const invalid = options.headers.origin !== origin || body.unexpected || body.website || body.horseVolume === 0 || [body.trainerName, body.stableName, body.phone].some((value) => /[\r\n\t]/.test(value));
    return response(invalid ? 400 : 200, invalid ? { result: "invalid" } : { result: "received", reference });
  }
  if (["/portal", "/admin", "/data-entry"].includes(parsed.pathname)) return response(307, "", "/sign-in?next=%2Fportal");
  if (parsed.pathname === "/api/checkout" || parsed.pathname === "/api/enquiries") return response(405, "");
  const markers = { "/": "Request a Stable Trial", "/pricing": "does not create an order", "/privacy": "Public stable-trial enquiries", "/disclaimer": "Information supports professional judgement", "/sign-in": "Sign" };
  return response(200, markers[parsed.pathname] ?? "");
};

const immutable = await immutableCandidate(origin, fakeFetch);
equal(immutable.state, "immutable-passed", "immutable state");
equal(immutable.publicRoutes, 5, "five public routes");
equal(immutable.protectedDenied, 3, "protected denied");
equal(immutable.apiMethodDenied, 2, "API methods denied");
equal(immutable.commerceDisabled, true, "commerce disabled");
equal(calls.length, 10, "immutable bounded requests");
check(calls.every((call) => !call.path.startsWith("http")), "candidate requests origin bounded");

calls.length = 0;
const preflight = await smtpPreflight(origin, { ...readyEnv }, fakeFetch);
equal(preflight.state, "smtp-preflight-ready", "no-send preflight ready");
check(calls.length === 1 && calls[0].path === "/api/internal/enquiries" && !calls.some((call) => call.path === "/api/enquiries"), "preflight performs no public send");
const retention = await retentionProof(origin, { ...readyEnv }, fakeFetch);
equal(retention.state, "retention-proven", "retention state");
check(retention.enquiryRetained === 1 && retention.bucketDeleted === 1 && retention.linkNulled === 1 && retention.fixtureResidue === 0, "retention tuple exact");
equal((await aggregateStatus(origin, { ...readyEnv }, fakeFetch)).state, "aggregate-zero", "aggregate zero");

calls.length = 0; stored = true;
const live = await liveCandidate(origin, { ...readyEnv }, fakeFetch);
equal(live.state, "live-passed", "live state");
check(live.reference === reference && live.notificationStatus === "sent" && live.notificationAttempts === 1 && live.duplicateSameReference, "one sent attempt and stable replay");
const publicCalls = calls.filter((call) => call.path === "/api/enquiries");
equal(JSON.parse(publicCalls[0].body).requestId, JSON.parse(publicCalls[1].body).requestId, "one request plus exact replay");
equal(publicCalls.length - 2, 7, "seven negative submissions");
check(live.reference !== HISTORICAL_REFERENCE && !calls.some((call) => call.body.includes(HISTORICAL_REFERENCE)), "historical reference never used");
equal((await fixturePurge(origin, reference, { ...readyEnv }, fakeFetch)).state, "fixture-purged", "fixture purged exactly");
equal((await aggregateStatus(origin, { ...readyEnv }, fakeFetch)).state, "aggregate-zero", "final aggregate zero");

if (assertions !== 60) throw new Error(`Sprint 029O autonomous harness assertion target changed: ${assertions}/60`);
console.log(`Sprint 029O autonomous harness tests passed (${assertions}/${assertions}).`);
