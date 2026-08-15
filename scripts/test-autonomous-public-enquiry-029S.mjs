import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ALIASES,
  BRANCH,
  INERT_029N_DEPLOYMENT,
  INERT_029O_DEPLOYMENT,
  PROJECT_ID,
  ROLLBACK_DEPLOYMENT,
  SCANNABLE_FILES,
  START_SHA,
  countProtectedMatches,
  immutableCandidate,
  parseCli,
  validateAliasInventory,
  validateCandidateOrigin,
  validateControlProjection,
  validatePriorCandidatesUnaliased,
  validateProviderBaselineProjection,
  validateScanPaths,
  validateVercelBaselineProjection,
} from "./autonomous-public-enquiry-029S.mjs";
import { projectProviderSnapshot } from "./provider-browser-projection-029S.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsCode = (operation, code) => { assertions += 1; assert.throws(operation, (error) => error?.code === code); };
const rejectsCode = async (operation, code) => { assertions += 1; await assert.rejects(operation, (error) => error?.code === code); };

const rawSnapshot = (pageClass, overrides = {}) => ({
  schemaVersion: 1,
  pageClass,
  exactPage: true,
  fieldCount: 11,
  protected: { identity: "", address: "", token: "" },
  domains: [],
  keys: [],
  environmentRows: [],
  aliases: [],
  deployments: [],
  controls: { create: 0, copy: 0, paste: 0, save: 0, dismiss: 0, clear: 0 },
  ...overrides,
});

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "exact Vercel project");
equal(BRANCH, "codex/029S-preflight-origin-hardening-bounded-provider-projection-and-readiness-recovery", "exact branch");
equal(START_SHA, "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "exact start SHA");
equal(ROLLBACK_DEPLOYMENT, "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf", "accepted deployment fixed");
equal(INERT_029N_DEPLOYMENT, "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB", "029N candidate fixed");
equal(INERT_029O_DEPLOYMENT, "dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq", "029O candidate fixed");
equal(ALIASES.length, 5, "five aliases fixed");
equal(new Set(ALIASES).size, 5, "aliases unique");
equal(SCANNABLE_FILES.length, 7, "seven implementation files");
equal(new Set(SCANNABLE_FILES).size, 7, "implementation scan files unique");

const origin = "https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app";
equal(validateCandidateOrigin(origin), origin, "plain candidate accepted");
equal(validateCandidateOrigin(`${origin}/`), origin, "slash-only candidate normalized");
throwsCode(() => validateCandidateOrigin("https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app:443"), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin("https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app:444"), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(["https://user", "@pnr-precision-performance-abc123-rankin007s-projects.vercel.app"].join("")), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}/path`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}?query=1`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}#fragment`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(origin.replace("https:", "http:")), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin("https://precisionperformance.com.au"), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(` ${origin}`), "ORIGIN_REFUSED");

const providerDomain = projectProviderSnapshot(rawSnapshot("resend-domain", {
  domains: [{ nameClass: "expected", statusClass: "verified" }],
}));
const providerKeys = projectProviderSnapshot(rawSnapshot("resend-keys", {
  keys: [
    { nameClass: "other", accessClass: "sending", domainClass: "expected", secretClass: "masked" },
    { nameClass: "other", accessClass: "sending", domainClass: "expected", secretClass: "masked" },
  ],
}));
equal(validateProviderBaselineProjection(providerDomain, providerKeys).verifiedDomainCount, 1, "one verified domain");
equal(validateProviderBaselineProjection(providerDomain, providerKeys).sendingAccessKeyCount, 2, "two sending keys");
equal(validateProviderBaselineProjection(providerDomain, providerKeys).fullAccessKeyCount, 0, "zero full keys");
equal(validateProviderBaselineProjection(providerDomain, providerKeys).targetKeyCount, 0, "zero target key");
equal(validateProviderBaselineProjection(providerDomain, providerKeys).rawSecretShapeCount, 0, "zero raw secret shape");
throwsCode(() => validateProviderBaselineProjection({ ...providerDomain, verifiedDomainCount: 2 }, providerKeys), "PROJECTION_REFUSED");
throwsCode(() => validateProviderBaselineProjection(providerDomain, { ...providerKeys, targetKeyCount: 1 }), "PROJECTION_REFUSED");

const environmentProjection = projectProviderSnapshot(rawSnapshot("vercel-environment", {
  environmentRows: [
    { nameClass: "generic-host", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "generic-port", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "generic-user", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "generic-pass", targetClass: "production", branchClass: "blank", sensitive: true },
    { nameClass: "generic-from", targetClass: "production", branchClass: "blank", sensitive: false },
  ],
}));
const aliasProjection = projectProviderSnapshot(rawSnapshot("vercel-aliases", {
  aliases: Array.from({ length: 5 }, () => ({ aliasClass: "expected", targetClass: "accepted" })),
}));
equal(validateVercelBaselineProjection(environmentProjection, aliasProjection).genericSmtpRowCount, 5, "five generic rows");
equal(validateVercelBaselineProjection(environmentProjection, aliasProjection).dedicatedSmtpRowCount, 0, "zero dedicated rows");
equal(validateVercelBaselineProjection(environmentProjection, aliasProjection).temporaryAuthRowCount, 0, "zero temporary rows");
equal(validateVercelBaselineProjection(environmentProjection, aliasProjection).acceptedAliasTargetCount, 5, "five accepted aliases");
throwsCode(() => validateVercelBaselineProjection({ ...environmentProjection, genericMetadataClass: "mismatch" }, aliasProjection), "PROJECTION_REFUSED");

const controls = projectProviderSnapshot(rawSnapshot("vercel-sensitive-form", {
  controls: { create: 0, copy: 0, paste: 1, save: 1, dismiss: 0, clear: 1 },
}));
equal(validateControlProjection(controls, "vercel").controlClass, "ready", "Vercel controls ready");
const resendControls = projectProviderSnapshot(rawSnapshot("resend-create", {
  controls: { create: 1, copy: 1, paste: 0, save: 0, dismiss: 1, clear: 1 },
}));
equal(validateControlProjection(resendControls, "resend").controlClass, "ready", "Resend controls ready");
throwsCode(() => validateControlProjection({ ...resendControls, controlClass: "not-ready" }, "resend"), "PROJECTION_REFUSED");

const aliasRows = ALIASES.map((alias) => ({ alias, deployment: ROLLBACK_DEPLOYMENT }));
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).aliasCount, 5, "alias inventory exact");
equal(validateAliasInventory(aliasRows, ROLLBACK_DEPLOYMENT).otherCount, 0, "no other alias target");
throwsCode(() => validateAliasInventory(aliasRows.slice(1), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
throwsCode(() => validateAliasInventory(aliasRows.map((row, index) => index ? row : { ...row, deployment: "dpl_other" }), ROLLBACK_DEPLOYMENT), "RESPONSE_REFUSED");
const inert = validatePriorCandidatesUnaliased([
  { deployment: INERT_029N_DEPLOYMENT, aliasCount: 0 },
  { deployment: INERT_029O_DEPLOYMENT, aliasCount: 0 },
]);
equal(inert.candidateCount, 2, "two inert candidates");
equal(inert.aliasCount, 0, "prior aliases zero");
throwsCode(() => validatePriorCandidatesUnaliased([{ deployment: INERT_029N_DEPLOYMENT, aliasCount: 1 }, { deployment: INERT_029O_DEPLOYMENT, aliasCount: 0 }]), "RESPONSE_REFUSED");

equal(countProtectedMatches("state=safe count=1"), 0, "safe scanner text clean");
equal(countProtectedMatches(`value=${["re", "syntheticprotectedvalue12345"].join("_")}`), 1, "provider token shape found");
equal(countProtectedMatches(`value=${["private", "example.com"].join("@")}`), 1, "address shape found");
equal(countProtectedMatches("value=fixture@example.invalid"), 0, "invalid fixture allowed");
equal(validateScanPaths([...SCANNABLE_FILES]).length, 7, "exact scan paths accepted");
throwsCode(() => validateScanPaths([SCANNABLE_FILES[0], SCANNABLE_FILES[0]]), "SCAN_REFUSED");
throwsCode(() => validateScanPaths(["planning/STATE.md"]), "SCAN_REFUSED");

equal(parseCli(["node", "script", "scan", "--files", SCANNABLE_FILES[0]]).mode, "scan", "scan CLI exact");
equal(parseCli(["node", "script", "manifest", "--files", SCANNABLE_FILES[0]]).mode, "manifest", "manifest CLI exact");
equal(parseCli(["node", "script", "immutable", "--origin", origin]).mode, "immutable", "immutable CLI exact");
throwsCode(() => parseCli(["node", "script", "deploy"]), "MODE_REFUSED");

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
equal(immutable.state, "immutable-passed", "immutable state exact");
equal(immutable.publicRoutes, 5, "five public routes");
equal(immutable.protectedDenied, 3, "three protected denials");
check(immutable.apiMethodDenied === 1 && immutable.commerceDisabled, "commerce remains disabled");
equal(calls.length, 9, "nine immutable calls");
check(!calls.some((call) => call.path === "/api/enquiries"), "public enquiry route never called");
await rejectsCode(() => immutableCandidate(origin, async (url, options) => {
  const result = await fakeFetch(url, options);
  return new URL(url).pathname === "/privacy" ? response(200, "wrong marker") : result;
}), "HTTP_REFUSED");

const controllerSource = readFileSync("scripts/PreflightAuth029S.ps1", "utf8");
check(controllerSource.includes("$uri.UserInfo") && controllerSource.includes("$uri.Port -ne 443"), "PowerShell rejects user information and non-443 ports");
check(controllerSource.includes("PrecisionPerformance/029S/PreflightBearer"), "new fixed live credential target");
check(controllerSource.includes("PrecisionPerformance/029S/SyntheticTest"), "new fixed synthetic target");

if (assertions !== 64) throw new Error(`Sprint 029S autonomous assertion target changed: ${assertions}/64`);
console.log(`Sprint 029S origin and readiness harness tests passed (${assertions}/${assertions}).`);
