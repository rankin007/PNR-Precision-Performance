import assert from "node:assert/strict";
import {
  ALIASES, BRANCH, CANDIDATE_ORDER, CONFIGURATION_NAMES, PROJECT_ID, PROJECT_REF, ROLLBACK_DEPLOYMENT, ROLLBACK_ORDER, START_SHA,
  assertSafeOutput, expectedAliasTransition, immutableCandidate, parseCli, runtimeConfigurationProjection, sanitizeFailure, validateAliasInventory, validateCandidateOrigin,
} from "./autonomous-public-enquiry-029N.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsCode = (operation, code) => { assertions += 1; assert.throws(operation, (error) => error?.code === code); };

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "exact Vercel project");
equal(PROJECT_REF, "uvskssaecdhxcgytkasc", "exact Supabase project");
equal(BRANCH, "codex/029N-public-enquiry-privacy-and-submission-completion", "exact branch");
equal(START_SHA, "bc2cc029ef4251d92bb7f46e59d18f32033230f6", "exact start");
equal(ROLLBACK_DEPLOYMENT, "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf", "exact rollback");
equal(ALIASES.length, 5, "five aliases");
equal(new Set(ALIASES).size, 5, "aliases distinct");
equal(CANDIDATE_ORDER[0], ALIASES[4], "candidate begins legacy-team");
equal(CANDIDATE_ORDER[4], ALIASES[0], "candidate ends apex");
equal(ROLLBACK_ORDER[0], ALIASES[0], "rollback begins apex");
equal(ROLLBACK_ORDER[4], ALIASES[4], "rollback ends legacy-team");
equal(CONFIGURATION_NAMES.length, 11, "configuration set exact");
check(CONFIGURATION_NAMES.includes("CONTACT_ENQUIRY_EMAIL"), "recipient binding named");
check(CONFIGURATION_NAMES.includes("ENQUIRY_ABUSE_HMAC_SECRET"), "abuse secret named");
check(CONFIGURATION_NAMES.includes("CRON_SECRET"), "cron secret named");

const origin = "https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app";
equal(validateCandidateOrigin(origin), origin, "candidate origin accepted");
check(["http://pnr-precision-performance-abc123-rankin007s-projects.vercel.app", "https://precisionperformance.com.au", "https://evil.example", `${origin}/path`, `${origin}?x=1`].every((invalid) => {
  try { validateCandidateOrigin(invalid); return false; } catch (error) { return error?.code === "ORIGIN_REFUSED"; }
}), "invalid candidate origins refused");

const rows = ALIASES.map((alias) => ({ alias, deployment: ROLLBACK_DEPLOYMENT }));
equal(validateAliasInventory(rows, ROLLBACK_DEPLOYMENT).targetCount, 5, "five/five target");
throwsCode(() => validateAliasInventory(rows.slice(1), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
throwsCode(() => validateAliasInventory(rows.map((row, index) => index === 0 ? { ...row, deployment: "dpl_other" } : row), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
for (let step = 0; step <= 5; step += 1) {
  const transition = expectedAliasTransition(CANDIDATE_ORDER, step);
  check(transition.target === step && transition.other === 5 - step, `candidate transition ${step}/${5 - step}`);
}
throwsCode(() => expectedAliasTransition([ALIASES[0], ALIASES[0]], 1), "RESPONSE_REFUSED");
throwsCode(() => expectedAliasTransition(CANDIDATE_ORDER, 6), "RESPONSE_REFUSED");

const readyEnv = Object.fromEntries(CONFIGURATION_NAMES.map((name) => [name, `${name}-opaque-value-abcdefghijklmnopqrstuvwxyz`]));
readyEnv.SMTP_HOST = "smtp.resend.com";
readyEnv.SMTP_PORT = "465";
readyEnv.NEXT_PUBLIC_SUPABASE_URL = "https://uvskssaecdhxcgytkasc.supabase.co";
const projection = runtimeConfigurationProjection(readyEnv);
equal(projection.state, "runtime-ready", "complete runtime ready");
equal(projection.bindingCount, 11, "complete binding count");
equal(projection.requiredCount, 11, "required binding count");
equal(projection.providerClass, "resend", "provider class safe");
equal(projection.recipientAvailable, true, "recipient available boolean");
equal(projection.contactProduction, true, "Production contact boolean");
equal(runtimeConfigurationProjection({ ...readyEnv, CONTACT_ENQUIRY_EMAIL: "" }).state, "runtime-unavailable", "missing recipient fails closed");
equal(runtimeConfigurationProjection({ ...readyEnv, SMTP_HOST: "unapproved.example" }).providerClass, "unclassified", "unknown provider hidden");

equal(assertSafeOutput({ state: "safe", count: 1 }).state, "safe", "finite output accepted");
throwsCode(() => assertSafeOutput({ state: "unsafe", detail: "private@example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ state: "unsafe", detail: "smtp.example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ state: "unsafe", detail: "opaque-secret-value" }, ["opaque-secret-value"]), "PRIVACY_REFUSED");
equal(sanitizeFailure({ code: "ORIGIN_REFUSED" }), "ORIGIN_REFUSED", "allowlisted failure retained");
equal(sanitizeFailure(new Error("private provider message")), "UNEXPECTED", "unknown failure sanitized");

equal(parseCli(["node", "script", "runtime-status"]).mode, "runtime-status", "runtime CLI parsed");
equal(parseCli(["node", "script", "immutable", "--origin", origin]).origin, origin, "immutable CLI parsed");
equal(parseCli(["node", "script", "live-candidate", "--origin", origin]).mode, "live-candidate", "live CLI parsed");
equal(parseCli(["node", "script", "fixture-status", "--origin", origin, "--reference", "PP-ABCDEF0123456789"]).reference, "PP-ABCDEF0123456789", "status CLI parsed");
equal(parseCli(["node", "script", "fixture-purge", "--origin", origin, "--reference", "PP-ABCDEF0123456789"]).mode, "fixture-purge", "purge CLI parsed");
throwsCode(() => parseCli(["node", "script", "unknown"]), "MODE_REFUSED");

function response(status, body, location = null) {
  return { status, headers: { get: (name) => name.toLowerCase() === "location" ? location : null }, text: async () => body };
}
const fetchCalls = [];
const fakeFetch = async (url, options = {}) => {
  fetchCalls.push({ url, method: options.method ?? "GET" });
  const path = new URL(url).pathname;
  if (["/portal", "/admin", "/data-entry"].includes(path)) return response(307, "", "/sign-in?next=%2Fportal");
  if (path === "/api/checkout" || path === "/api/enquiries") return response(405, "");
  const markers = { "/": "Request a Stable Trial", "/pricing": "does not create an order", "/privacy": "Public stable-trial enquiries", "/disclaimer": "Information supports professional judgement", "/sign-in": "Sign" };
  return response(200, markers[path] ?? "");
};
const immutable = await immutableCandidate(origin, fakeFetch);
equal(immutable.state, "immutable-passed", "immutable state");
equal(immutable.publicRoutes, 5, "five public routes");
equal(immutable.protectedDenied, 3, "three protected denials");
equal(immutable.apiMethodDenied, 2, "two method denials");
equal(immutable.commerceDisabled, true, "commerce disabled");
equal(fetchCalls.length, 10, "bounded immutable requests");
check(fetchCalls.every((call) => call.url.startsWith(origin)), "immutable requests remain candidate-bound");

if (assertions !== 55) throw new Error(`Sprint 029N harness assertion target changed: ${assertions}/55`);
console.log(`Sprint 029N autonomous harness tests passed (${assertions}/${assertions}).`);
