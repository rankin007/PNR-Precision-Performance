import assert from "node:assert/strict";
import {
  ALIASES, BRANCH, CONFIGURATION_NAMES, INERT_029N_DEPLOYMENT, INERT_029O_DEPLOYMENT, PROJECT_ID, PROJECT_REF,
  ROLLBACK_DEPLOYMENT, START_SHA, assertSafeOutput, immutableCandidate, parseCli, runtimeConfigurationProjection,
  smtpPreflight, validateAliasInventory, validateCandidateOrigin, validatePriorCandidatesUnaliased,
} from "./autonomous-public-enquiry-029P.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };
const throwsCode = (operation, code) => { assertions += 1; assert.throws(operation, (error) => error?.code === code); };
const rejectsCode = async (operation, code) => { assertions += 1; await assert.rejects(operation, (error) => error?.code === code); };

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "exact Vercel project");
equal(PROJECT_REF, "uvskssaecdhxcgytkasc", "exact Supabase project");
equal(BRANCH, "codex/029P-resend-smtp-readiness-recovery", "exact branch");
equal(START_SHA, "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "exact start");
equal(ROLLBACK_DEPLOYMENT, "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf", "exact accepted live deployment");
equal(INERT_029N_DEPLOYMENT, "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB", "029N candidate fixed");
equal(INERT_029O_DEPLOYMENT, "dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq", "029O candidate fixed");
equal(ALIASES.length, 5, "five aliases");
equal(new Set(ALIASES).size, 5, "aliases are unique");
equal(CONFIGURATION_NAMES.length, 11, "configuration set exact");
check(["HOST", "PORT", "USER", "PASS"].every((suffix) => CONFIGURATION_NAMES.includes(`PUBLIC_ENQUIRY_SMTP_${suffix}`)) && !CONFIGURATION_NAMES.some((name) => /^SMTP_(?:HOST|PORT|USER|PASS)$/.test(name)), "dedicated transport replaces generic transport names");

const origin = "https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app";
equal(validateCandidateOrigin(origin), origin, "candidate origin accepted");
check(["http://pnr-precision-performance-abc123-rankin007s-projects.vercel.app", "https://precisionperformance.com.au", "https://evil.example", `${origin}/path`].every((value) => {
  try { validateCandidateOrigin(value); return false; } catch (error) { return error?.code === "ORIGIN_REFUSED"; }
}), "invalid origins refused");
const aliasRows = ALIASES.map((alias) => ({ alias, deployment: ROLLBACK_DEPLOYMENT }));
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).targetCount, 5, "five aliases target accepted deployment");
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).otherCount, 0, "no alias targets another deployment");
throwsCode(() => validateAliasInventory(aliasRows.slice(1), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
throwsCode(() => validateAliasInventory(aliasRows.map((row, index) => index ? row : { ...row, deployment: "dpl_other" }), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
const inert = validatePriorCandidatesUnaliased([{ deployment: INERT_029N_DEPLOYMENT, aliasCount: 0 }, { deployment: INERT_029O_DEPLOYMENT, aliasCount: 0 }]);
equal(inert.candidateCount, 2, "both prior candidates classified");
equal(inert.aliasCount, 0, "both prior candidates remain unaliased");
throwsCode(() => validatePriorCandidatesUnaliased([{ deployment: INERT_029N_DEPLOYMENT, aliasCount: 1 }, { deployment: INERT_029O_DEPLOYMENT, aliasCount: 0 }]), "RESPONSE_REFUSED");

const readyEnv = Object.fromEntries(CONFIGURATION_NAMES.map((name) => [name, `${name}-opaque-value-abcdefghijklmnopqrstuvwxyz`]));
readyEnv.PUBLIC_ENQUIRY_SMTP_HOST = "smtp.resend.com";
readyEnv.PUBLIC_ENQUIRY_SMTP_PORT = "465";
readyEnv.PUBLIC_ENQUIRY_SMTP_USER = "resend";
readyEnv.NEXT_PUBLIC_SUPABASE_URL = "https://uvskssaecdhxcgytkasc.supabase.co";
const projection = runtimeConfigurationProjection(readyEnv);
equal(projection.state, "runtime-ready", "dedicated Resend runtime ready");
equal(projection.bindingCount, 11, "binding count exact");
equal(projection.providerClass, "resend", "provider classified");
equal(projection.recipientAvailable, true, "recipient available boolean");
equal(projection.supabaseTarget, "approved", "Supabase target exact");
const oldOnly = { ...readyEnv, SMTP_HOST: "smtp.resend.com", SMTP_PORT: "465", SMTP_USER: "resend", SMTP_PASS: "opaque-old-pass" };
for (const name of ["PUBLIC_ENQUIRY_SMTP_HOST", "PUBLIC_ENQUIRY_SMTP_PORT", "PUBLIC_ENQUIRY_SMTP_USER", "PUBLIC_ENQUIRY_SMTP_PASS"]) delete oldOnly[name];
equal(runtimeConfigurationProjection(oldOnly).state, "runtime-unavailable", "old generic-only runtime unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_HOST: "" }).state, "runtime-unavailable", "missing dedicated host unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_PORT: "" }).state, "runtime-unavailable", "missing dedicated port unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_USER: "" }).state, "runtime-unavailable", "missing dedicated user unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_PASS: "" }).state, "runtime-unavailable", "missing dedicated pass unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_HOST: "smtp.gmail.com" }).state, "runtime-unavailable", "wrong provider unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_PORT: "587" }).state, "runtime-unavailable", "wrong Resend port unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_USER: "other" }).state, "runtime-unavailable", "wrong Resend user unavailable");

equal(assertSafeOutput({ state: "safe", count: 1 }).state, "safe", "finite output accepted");
throwsCode(() => assertSafeOutput({ detail: "private@example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ detail: "smtp.example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ state: "unsafe", detail: "opaque-protected-value" }, ["opaque-protected-value"]), "PRIVACY_REFUSED");
equal(parseCli(["node", "script", "runtime-status"]).mode, "runtime-status", "runtime CLI");
equal(parseCli(["node", "script", "immutable", "--origin", origin]).mode, "immutable", "immutable CLI");
equal(parseCli(["node", "script", "smtp-preflight", "--origin", origin]).mode, "smtp-preflight", "preflight CLI");
throwsCode(() => parseCli(["node", "script", "live-candidate", "--origin", origin]), "MODE_REFUSED");

function response(status, body, location = null) {
  return { status, ok: status >= 200 && status < 300, headers: { get: (name) => name.toLowerCase() === "location" ? location : null }, text: async () => typeof body === "string" ? body : JSON.stringify(body), json: async () => body };
}
const calls = [];
const fakeFetch = async (url, options = {}) => {
  const parsed = new URL(url); const method = options.method ?? "GET";
  calls.push({ path: parsed.pathname, method });
  if (parsed.pathname === "/api/internal/enquiries") return response(200, { result: "smtp-preflight", status: "ready", providerClass: "resend", errorClass: null });
  if (["/portal", "/admin", "/data-entry"].includes(parsed.pathname)) return response(307, "", "/sign-in?next=%2Fportal");
  if (parsed.pathname === "/api/checkout") return response(405, "");
  const markers = { "/": "Request a Stable Trial", "/pricing": "does not create an order", "/privacy": "Public stable-trial enquiries", "/disclaimer": "Information supports professional judgement", "/sign-in": "Sign" };
  return response(200, markers[parsed.pathname] ?? "");
};
const immutable = await immutableCandidate(origin, fakeFetch);
equal(immutable.state, "immutable-passed", "immutable state");
equal(immutable.publicRoutes, 5, "five public routes");
equal(immutable.protectedDenied, 3, "protected routes denied");
check(immutable.apiMethodDenied === 1 && immutable.commerceDisabled, "checkout denied and commerce disabled");
equal(calls.length, 9, "immutable request ceiling exact");
check(!calls.some((call) => call.path === "/api/enquiries"), "immutable proof never requests public enquiry route");
calls.length = 0;
deepEqual(await smtpPreflight(origin, { ...readyEnv }, fakeFetch), { result: "smtp-preflight", status: "ready", providerClass: "resend", errorClass: null }, "preflight output exact and finite");
check(calls.length === 1 && calls[0].path === "/api/internal/enquiries" && calls[0].method === "POST", "preflight makes one authenticated internal request only");
await rejectsCode(() => smtpPreflight(origin, { ...readyEnv }, async () => response(200, { result: "smtp-preflight", status: "ready", providerClass: "google_workspace", errorClass: null })), "PREFLIGHT_REFUSED");

if (assertions !== 50) throw new Error(`Sprint 029P autonomous assertion target changed: ${assertions}/50`);
console.log(`Sprint 029P readiness-only harness tests passed (${assertions}/${assertions}).`);
