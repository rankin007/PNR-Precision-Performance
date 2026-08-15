import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ALIASES, BRANCH, CONFIGURATION_NAMES, DEDICATED_SMTP_NAMES, INERT_029N_DEPLOYMENT, INERT_029O_DEPLOYMENT,
  PREFLIGHT_AUTH_NAMES, PROJECT_ID, PROJECT_REF, ROLLBACK_DEPLOYMENT, SCANNABLE_FILES, START_SHA,
  assertSafeOutput, countProtectedMatches, immutableCandidate, parseCli, runtimeConfigurationProjection,
  validateAliasInventory, validateCandidateOrigin, validatePriorCandidatesUnaliased, validateScanPaths,
} from "./autonomous-public-enquiry-029Q.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsCode = (operation, code) => { assertions += 1; assert.throws(operation, (error) => error?.code === code); };
const rejectsCode = async (operation, code) => { assertions += 1; await assert.rejects(operation, (error) => error?.code === code); };

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "exact Vercel project");
equal(PROJECT_REF, "uvskssaecdhxcgytkasc", "exact Supabase project");
equal(BRANCH, "codex/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery", "exact branch");
equal(START_SHA, "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "exact start");
equal(ROLLBACK_DEPLOYMENT, "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf", "accepted live deployment fixed");
equal(INERT_029N_DEPLOYMENT, "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB", "029N candidate fixed");
equal(INERT_029O_DEPLOYMENT, "dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq", "029O candidate fixed");
equal(ALIASES.length, 5, "five aliases");
equal(new Set(ALIASES).size, 5, "aliases unique");
equal(CONFIGURATION_NAMES.length, 14, "fourteen candidate bindings");
equal(DEDICATED_SMTP_NAMES.length, 4, "four dedicated SMTP names");
equal(PREFLIGHT_AUTH_NAMES.length, 3, "three temporary auth names");
equal(SCANNABLE_FILES.length, 9, "nine implementation files");
check(CONFIGURATION_NAMES.includes("PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256"), "preflight verifier included");
check(!CONFIGURATION_NAMES.some((name) => /^SMTP_(?:HOST|PORT|USER|PASS)$/.test(name)), "generic transport excluded");
const controllerSource = readFileSync("scripts/PreflightAuth029Q.ps1", "utf8");
const addRemoteSource = controllerSource.slice(controllerSource.indexOf("function Add-RemoteValue"), controllerSource.indexOf("function Remove-RemoteValue"));
const capturedNativeSource = controllerSource.slice(controllerSource.indexOf("function Invoke-VercelCaptured"), controllerSource.indexOf("function Get-RemotePresence"));
check(addRemoteSource.includes("@('env','add',$Name,'production','--sensitive','--yes')") && !addRemoteSource.includes("--force"), "temporary row creation cannot overwrite a raced remote name");
check(controllerSource.includes("yyyy-MM-ddTHH:mm:ss.fff'Z'") && controllerSource.includes("notBefore=(Format-CanonicalUtc $notBefore)") && controllerSource.includes("expiresAt=(Format-CanonicalUtc $expiresAt)"), "controller generates exact canonical millisecond UTC timestamps");
check(capturedNativeSource.includes("$savedErrorActionPreference = $ErrorActionPreference") && capturedNativeSource.includes("$ErrorActionPreference = 'Continue'") && capturedNativeSource.includes("$global:LASTEXITCODE = $null") && capturedNativeSource.includes("$exitCode = $global:LASTEXITCODE") && !capturedNativeSource.includes("$LASTEXITCODE = $null") && capturedNativeSource.includes("$ErrorActionPreference = $savedErrorActionPreference") && capturedNativeSource.indexOf("throw 'VERCEL_OPERATION_REFUSED'") > capturedNativeSource.indexOf("} finally {"), "native progress stderr uses the actual global exit slot and only exit status governs failure");
check(capturedNativeSource.includes("$inputWasBound = $PSBoundParameters.ContainsKey('InputValue')") && capturedNativeSource.includes("if (-not $inputWasBound)") && !capturedNativeSource.includes("$null -eq $InputValue"), "stdin selection distinguishes an unbound parameter from a bound empty or protected value");

const origin = "https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app";
equal(validateCandidateOrigin(origin), origin, "candidate origin accepted");
throwsCode(() => validateCandidateOrigin("http://pnr-precision-performance-abc123-rankin007s-projects.vercel.app"), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin("https://precisionperformance.com.au"), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}/path`), "ORIGIN_REFUSED");
const aliasRows = ALIASES.map((alias) => ({ alias, deployment: ROLLBACK_DEPLOYMENT }));
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).targetCount, 5, "all aliases target accepted deployment");
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).otherCount, 0, "no other alias target");
throwsCode(() => validateAliasInventory(aliasRows.slice(1), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
throwsCode(() => validateAliasInventory(aliasRows.map((row, index) => index ? row : { ...row, deployment: "dpl_other" }), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
const inert = validatePriorCandidatesUnaliased([{ deployment: INERT_029N_DEPLOYMENT, aliasCount: 0 }, { deployment: INERT_029O_DEPLOYMENT, aliasCount: 0 }]);
equal(inert.candidateCount, 2, "both prior candidates classified");
equal(inert.aliasCount, 0, "both prior candidates unaliased");
throwsCode(() => validatePriorCandidatesUnaliased([{ deployment: INERT_029N_DEPLOYMENT, aliasCount: 1 }, { deployment: INERT_029O_DEPLOYMENT, aliasCount: 0 }]), "RESPONSE_REFUSED");

const readyEnv = Object.fromEntries(CONFIGURATION_NAMES.map((name) => [name, `${name}-synthetic-value`]));
readyEnv.PUBLIC_ENQUIRY_SMTP_HOST = "smtp.resend.com";
readyEnv.PUBLIC_ENQUIRY_SMTP_PORT = "465";
readyEnv.PUBLIC_ENQUIRY_SMTP_USER = "resend";
readyEnv.NEXT_PUBLIC_SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;
readyEnv.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256 = "a".repeat(64);
readyEnv.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE = "2026-08-06T02:00:00.000Z";
readyEnv.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT = "2026-08-06T02:15:00.000Z";
const projection = runtimeConfigurationProjection(readyEnv, new Date("2026-08-06T02:01:00.000Z"));
equal(projection.state, "runtime-ready", "complete candidate runtime ready");
equal(projection.bindingCount, 14, "binding count exact");
equal(projection.providerClass, "resend", "provider classified");
equal(projection.recipientAvailable, true, "recipient availability boolean only");
equal(projection.supabaseTarget, "approved", "Supabase target exact");
equal(projection.preflightAuth, "bounded-active", "preflight window bounded and active");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_SMTP_PASS: "" }, new Date("2026-08-06T02:01:00.000Z")).state, "runtime-unavailable", "missing dedicated SMTP unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256: "" }, new Date("2026-08-06T02:01:00.000Z")).state, "runtime-unavailable", "missing verifier unavailable");
equal(runtimeConfigurationProjection(readyEnv, new Date("2026-08-06T02:15:00.000Z")).state, "runtime-unavailable", "expired window unavailable");
equal(runtimeConfigurationProjection({ ...readyEnv, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT: "2026-08-06T02:15:00.001Z" }, new Date("2026-08-06T02:01:00.000Z")).state, "runtime-unavailable", "overlong window unavailable");
const oldGeneric = { ...readyEnv, SMTP_HOST: "smtp.resend.com", SMTP_PORT: "465", SMTP_USER: "resend", SMTP_PASS: "synthetic-old" };
for (const name of DEDICATED_SMTP_NAMES) delete oldGeneric[name];
equal(runtimeConfigurationProjection(oldGeneric, new Date("2026-08-06T02:01:00.000Z")).state, "runtime-unavailable", "generic transport cannot repair dedicated contract");

equal(assertSafeOutput({ state: "safe", count: 1 }).state, "safe", "finite output accepted");
throwsCode(() => assertSafeOutput({ detail: "private@example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ detail: "smtp.example.invalid" }), "PRIVACY_REFUSED");
throwsCode(() => assertSafeOutput({ state: "unsafe", detail: "synthetic-protected-value" }, ["synthetic-protected-value"]), "PRIVACY_REFUSED");
equal(countProtectedMatches("state=safe count=1"), 0, "safe text scan clean");
equal(countProtectedMatches(`value=${["re", "syntheticprotectedvalue12345"].join("_")}`), 1, "provider-token shape detected");
equal(countProtectedMatches(`value=${["private", "example.com"].join("@")}`), 1, "address shape detected");
equal(countProtectedMatches("value=synthetic@example.invalid"), 0, "explicit invalid fixture allowed");
equal(validateScanPaths([...SCANNABLE_FILES]).length, 9, "exact scan set accepted");
throwsCode(() => validateScanPaths([SCANNABLE_FILES[0], SCANNABLE_FILES[0]]), "SCAN_REFUSED");
throwsCode(() => validateScanPaths(["planning/STATE.md"]), "SCAN_REFUSED");

equal(parseCli(["node", "script", "runtime-status"]).mode, "runtime-status", "runtime CLI exact");
equal(parseCli(["node", "script", "immutable", "--origin", origin]).mode, "immutable", "immutable CLI exact");
equal(parseCli(["node", "script", "scan", "--files", SCANNABLE_FILES[0]]).mode, "scan", "scan CLI exact");
equal(parseCli(["node", "script", "manifest", "--files", SCANNABLE_FILES[0]]).mode, "manifest", "manifest CLI exact");
throwsCode(() => parseCli(["node", "script", "live-candidate", "--origin", origin]), "MODE_REFUSED");

function response(status, body, location = null) {
  return { status, headers: { get: (name) => name.toLowerCase() === "location" ? location : null }, text: async () => body };
}
const calls = [];
const fakeFetch = async (url, options = {}) => {
  const parsed = new URL(url);
  calls.push({ path: parsed.pathname, method: options.method ?? "GET" });
  if (["/portal", "/admin", "/data-entry"].includes(parsed.pathname)) return response(307, "", "/sign-in?next=%2Fportal");
  if (parsed.pathname === "/api/checkout") return response(405, "");
  const markers = { "/": "Request a Stable Trial", "/pricing": "does not create an order", "/privacy": "Public stable-trial enquiries", "/disclaimer": "Information supports professional judgement", "/sign-in": "Sign" };
  return response(200, markers[parsed.pathname] ?? "");
};
const immutable = await immutableCandidate(origin, fakeFetch);
equal(immutable.state, "immutable-passed", "immutable state");
equal(immutable.publicRoutes, 5, "five public routes checked");
equal(immutable.protectedDenied, 3, "three protected routes denied");
check(immutable.apiMethodDenied === 1 && immutable.commerceDisabled, "checkout denied and commerce disabled");
equal(calls.length, 9, "immutable request ceiling exact");
check(!calls.some((call) => call.path === "/api/enquiries"), "immutable checks never call public enquiry route");
await rejectsCode(() => immutableCandidate(origin, async (url, options) => {
  const result = await fakeFetch(url, options);
  return new URL(url).pathname === "/privacy" ? response(200, "wrong marker") : result;
}), "HTTP_REFUSED");

if (assertions !== 64) throw new Error(`Sprint 029Q harness assertion target changed: ${assertions}/64`);
console.log(`Sprint 029Q readiness-only autonomous harness tests passed (${assertions}/${assertions}).`);
