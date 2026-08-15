import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ACCEPTED_DEPLOYMENT,
  ALIASES,
  BRANCH,
  IMPLEMENTATION_FILES,
  INERT_029N_DEPLOYMENT,
  INERT_029O_DEPLOYMENT,
  INERT_029S_PREVIEW,
  INHERITED_DEPLOYMENT_FILES,
  PROJECT_ID,
  SCANNABLE_FILES,
  START_SHA,
  countProtectedMatches,
  immutableCandidate,
  parseCli,
  validateAliasInventory,
  validateAllowedInspectId,
  validateBaselineProjection,
  validateCandidateOrigin,
  validateControlProjection,
  validateDeploymentProjection,
  validateHistoricalContainment,
  validateScanPaths,
} from "./autonomous-public-enquiry-029T.mjs";
import { CONTROL_NAMES, projectProviderControlSnapshot } from "./provider-browser-projection-029T.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsCode = (operation, code) => { assertions += 1; assert.throws(operation, (error) => error?.code === code); };
const rejectsCode = async (operation, code) => { assertions += 1; await assert.rejects(operation, (error) => error?.code === code); };

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "exact project");
equal(BRANCH, "codex/029T-readiness-boundary-recovery-after-inert-preview", "exact branch");
equal(START_SHA, "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "exact start");
equal(ACCEPTED_DEPLOYMENT, "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf", "accepted deployment fixed");
equal(INERT_029N_DEPLOYMENT, "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB", "029N fixed");
equal(INERT_029O_DEPLOYMENT, "dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq", "029O fixed");
equal(INERT_029S_PREVIEW, "dpl_7MTexxU6RecGHZvCE9BukUwZU6Hx", "029S Preview fixed");
equal(ALIASES.length, 5, "five aliases");
equal(new Set(ALIASES).size, 5, "aliases unique");
equal(IMPLEMENTATION_FILES.length, 7, "seven implementation files");
equal(INHERITED_DEPLOYMENT_FILES.length, 10, "ten inherited deployment inputs");
equal(SCANNABLE_FILES.length, 17, "combined scan has seventeen files");
equal(new Set(SCANNABLE_FILES).size, 17, "combined scan unique");

const origin = "https://pnr-precision-performance-abc123-rankin007s-projects.vercel.app";
equal(validateCandidateOrigin(origin), origin, "plain candidate accepted");
equal(validateCandidateOrigin(`${origin}/`), origin, "slash normalized");
throwsCode(() => validateCandidateOrigin(`${origin}:443`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}:444`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(["https://user", "@pnr-precision-performance-abc123-rankin007s-projects.vercel.app"].join("")), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}/path`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}?query=1`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(`${origin}#fragment`), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(origin.replace("https:", "http:")), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin("https://precisionperformance.com.au"), "ORIGIN_REFUSED");
throwsCode(() => validateCandidateOrigin(` ${origin}`), "ORIGIN_REFUSED");

const emptyControls = () => Object.fromEntries(CONTROL_NAMES.map((name) => [name, 0]));
const controlSnapshot = (pageClass, controls) => ({
  schemaVersion: 1,
  pageClass,
  exactPage: true,
  fieldCount: 6,
  protected: { identity: "synthetic", address: "fixture@example.invalid", token: "" },
  controls: { ...emptyControls(), ...controls },
});
const resendCreate = projectProviderControlSnapshot(controlSnapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1,
}));
equal(validateControlProjection(resendCreate, "resend-create").pageClass, "resend-create", "create controls ready");
equal(validateControlProjection(resendCreate, "resend-create").rawSecretShapeCount, 0, "create output has no raw secret");
equal(validateControlProjection(projectProviderControlSnapshot(controlSnapshot("resend-delete", {
  deleteMenu: 1, deleteConfirm: 1, deleteCancel: 1,
})), "resend-delete").controlClass, "ready", "delete controls ready");
equal(validateControlProjection(projectProviderControlSnapshot(controlSnapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, sensitive: 1, paste: 1, save: 1, navigate: 1,
})), "vercel-sensitive-form").controlClass, "ready", "Vercel controls ready");
equal(validateControlProjection(projectProviderControlSnapshot(controlSnapshot("clipboard-clear", {
  clearClipboard: 1,
})), "clipboard-clear").controlClass, "ready", "clear control ready");
throwsCode(() => validateControlProjection({ ...resendCreate, controlClass: "not-ready" }, "resend-create"), "PROJECTION_REFUSED");
throwsCode(() => validateControlProjection({ ...resendCreate, extra: true }, "resend-create"), "PROJECTION_REFUSED");

const baseline = {
  controller: "029T", operation: "baseline", state: "pass", projectClass: "exact",
  dedicatedSmtpRowCount: 0, temporaryAuthRowCount: 0, genericSmtpRowCount: 5,
  credentialState: "absent", sprintDeploymentCount: 0,
  retainedPreviewClass: "ready-preview-inert", retainedPreviewAliasCount: 0,
  priorCandidateCount: 2, priorCandidateAliasCount: 0,
  acceptedDeploymentClass: "ready", acceptedAliasTargetCount: 5,
};
equal(validateBaselineProjection(baseline).targetResourceCount, 0, "target resource zero");
equal(validateBaselineProjection(baseline).acceptedAliasTargetCount, 5, "accepted aliases five");
equal(validateBaselineProjection(baseline).historicalDeploymentCount, 3, "three historical candidates contained");
throwsCode(() => validateBaselineProjection({ ...baseline, dedicatedSmtpRowCount: 1 }), "PROJECTION_REFUSED");
throwsCode(() => validateBaselineProjection({ ...baseline, retainedPreviewClass: "production" }), "PROJECTION_REFUSED");
throwsCode(() => validateBaselineProjection({ ...baseline, extra: true }), "PROJECTION_REFUSED");

const deployment = {
  controller: "029T", operation: "deploy", state: "pass", deploymentId: "dpl_synthetic029T",
  targetClass: "production", readinessClass: "ready", aliasCount: 0,
  metadataClass: "exact-029T", sourceClass: "exact-canonical",
};
equal(validateDeploymentProjection(deployment).deploymentId, "dpl_synthetic029T", "deployment ID accepted");
equal(validateDeploymentProjection(deployment).aliasCount, 0, "deployment unaliased");
equal(validateDeploymentProjection(deployment).targetClass, "production", "deployment Production targeted");
throwsCode(() => validateDeploymentProjection({ ...deployment, aliasCount: 1 }), "DEPLOYMENT_REFUSED");
throwsCode(() => validateDeploymentProjection({ ...deployment, metadataClass: "other" }), "DEPLOYMENT_REFUSED");
throwsCode(() => validateDeploymentProjection({ ...deployment, extra: true }), "DEPLOYMENT_REFUSED");

equal(validateAllowedInspectId(ACCEPTED_DEPLOYMENT), ACCEPTED_DEPLOYMENT, "accepted ID inspectable");
equal(validateAllowedInspectId(INERT_029N_DEPLOYMENT), INERT_029N_DEPLOYMENT, "029N ID inspectable");
equal(validateAllowedInspectId(INERT_029O_DEPLOYMENT), INERT_029O_DEPLOYMENT, "029O ID inspectable");
equal(validateAllowedInspectId(INERT_029S_PREVIEW), INERT_029S_PREVIEW, "029S ID inspectable");
equal(validateAllowedInspectId("dpl_synthetic029T", "dpl_synthetic029T"), "dpl_synthetic029T", "owned ID inspectable");
throwsCode(() => validateAllowedInspectId("dpl_other"), "DEPLOYMENT_REFUSED");
throwsCode(() => validateAllowedInspectId("dpl_other", "wrong"), "DEPLOYMENT_REFUSED");

const aliasRows = ALIASES.map((alias) => ({ alias, deployment: ACCEPTED_DEPLOYMENT }));
equal(validateAliasInventory(aliasRows).aliasCount, 5, "five aliases exact");
equal(validateAliasInventory(aliasRows).targetCount, 5, "five accepted targets");
equal(validateAliasInventory(aliasRows).otherCount, 0, "zero other targets");
throwsCode(() => validateAliasInventory(aliasRows.slice(1)), "RESPONSE_REFUSED");
throwsCode(() => validateAliasInventory(aliasRows.map((row, index) => index ? row : { ...row, deployment: "dpl_other" })), "RESPONSE_REFUSED");
const historical = [
  { deploymentId: INERT_029N_DEPLOYMENT, stateClass: "ready-production-inert", aliasCount: 0 },
  { deploymentId: INERT_029O_DEPLOYMENT, stateClass: "ready-production-inert", aliasCount: 0 },
  { deploymentId: INERT_029S_PREVIEW, stateClass: "ready-preview-inert", aliasCount: 0 },
];
equal(validateHistoricalContainment(historical).deploymentCount, 3, "three historical deployments");
equal(validateHistoricalContainment(historical).aliasCount, 0, "historical aliases zero");
equal(validateHistoricalContainment(historical).previewCount, 1, "one retained Preview");
throwsCode(() => validateHistoricalContainment(historical.map((row, index) => index ? row : { ...row, aliasCount: 1 })), "RESPONSE_REFUSED");
throwsCode(() => validateHistoricalContainment(historical.map((row, index) => index ? row : { ...row, stateClass: "ready-preview-inert" })), "RESPONSE_REFUSED");
throwsCode(() => validateHistoricalContainment([historical[0], historical[0], historical[2]]), "RESPONSE_REFUSED");

equal(countProtectedMatches("state=safe count=1"), 0, "safe scanner text clean");
equal(countProtectedMatches(`value=${["re", "syntheticprotectedvalue12345"].join("_")}`), 1, "provider token shape found");
equal(countProtectedMatches(`value=${["private", "example.com"].join("@")} `), 1, "address shape found");
equal(countProtectedMatches("value=fixture@example.invalid"), 0, "invalid fixture allowed");
equal(validateScanPaths([...SCANNABLE_FILES]).length, 17, "combined scan accepted");
throwsCode(() => validateScanPaths([SCANNABLE_FILES[0], SCANNABLE_FILES[0]]), "SCAN_REFUSED");
throwsCode(() => validateScanPaths(["planning/STATE.md"]), "SCAN_REFUSED");

equal(parseCli(["node", "script", "scan", "--files", SCANNABLE_FILES[0]]).mode, "scan", "scan CLI exact");
equal(parseCli(["node", "script", "manifest", "--files", SCANNABLE_FILES[0]]).mode, "manifest", "manifest CLI exact");
equal(parseCli(["node", "script", "immutable", "--origin", origin]).mode, "immutable", "immutable CLI exact");
throwsCode(() => parseCli(["node", "script", "deploy"]), "MODE_REFUSED");
throwsCode(() => parseCli(["node", "script", "scan", "--files"]), "MODE_REFUSED");

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
check(!calls.some((call) => call.path === "/api/enquiries"), "public enquiry never called");
await rejectsCode(() => immutableCandidate(origin, async (url, options) => {
  const result = await fakeFetch(url, options);
  return new URL(url).pathname === "/privacy" ? response(200, "wrong marker") : result;
}), "HTTP_REFUSED");
await rejectsCode(() => immutableCandidate(origin, async (url, options) => {
  const result = await fakeFetch(url, options);
  return new URL(url).pathname === "/api/checkout" ? response(200, "") : result;
}), "HTTP_REFUSED");

const controllerSource = readFileSync("scripts/PreflightAuth029T.ps1", "utf8");
check(controllerSource.includes("[string[]]$CommandArgs"), "controller uses non-reserved vector parameter");
check(!controllerSource.includes("Invoke-VercelCaptured([string[]]$Arguments"), "old vector signature absent");
check(controllerSource.includes("@('env','ls','production','--format','json','--no-color')"), "environment vector exact");
check(controllerSource.includes("@('alias','ls','--format','json','--limit','100','--no-color')"), "alias vector exact");
check(controllerSource.includes("@('list','--meta','pp_sprint=029T','--format','json','--no-color')"), "deployment list vector exact");
check(controllerSource.includes("@('deploy','--prod','--skip-domain','--yes','--format','json','--no-color','--meta','pp_sprint=029T')"), "deploy vector exact");
check(controllerSource.includes("@('env','add',$Name,'production','--yes','--no-color')"), "public add vector exact");
check(controllerSource.includes("@('env','add',$Name,'production','--sensitive','--yes','--no-color')"), "sensitive add vector exact");
check(controllerSource.includes("@('env','rm',$Name,'production','--yes','--no-color')"), "remove vector exact");
check(controllerSource.includes("RedirectStandardOutput") && controllerSource.includes("RedirectStandardError"), "stdout and stderr separated");
check(controllerSource.includes("/d /s /c \"set NO_UPDATE_NOTIFIER=1&& call \"\""), "notifier is set only inside the captured child command");
check(!controllerSource.includes("$start.Environment[") && !controllerSource.includes("$start.EnvironmentVariables["), "nullable process environment adapters are absent");
check(controllerSource.includes("processTransferArgCount=4") && controllerSource.includes("processTransferState='pass'"), "real child-process transfer has an exact local regression");
check(controllerSource.includes("$targets -ccontains 'production'") && controllerSource.includes("Generic=$genericProductionNames.Count"), "generic rows count when their target set includes Production");
check(controllerSource.includes("ownedScopeRefusalCount=$ownedScopeRefusalCount") && controllerSource.includes("if (-not $didRefuse)"), "owned multi-target and branch-scoped fixtures fail closed");
check([
  "BASELINE_ENVIRONMENT_REFUSED", "BASELINE_CREDENTIAL_REFUSED", "BASELINE_029T_DEPLOYMENT_REFUSED",
  "BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED", "BASELINE_ACCEPTED_DEPLOYMENT_REFUSED",
  "BASELINE_029N_ALIAS_REFUSED", "BASELINE_029O_ALIAS_REFUSED", "BASELINE_RETAINED_PREVIEW_REFUSED",
].every((code) => controllerSource.includes(`'${code}'`)), "eight fixed baseline codes are allowlisted");
check(controllerSource.includes("function Assert-BaselineProjection") && controllerSource.includes("baselineFailureCodeCount=$baselineFailureFixtureCount"), "all baseline predicates have deterministic refusal fixtures");
check(controllerSource.includes("function ConvertTo-AliasProjection") && controllerSource.includes("if ($Rows.Count -ge 100)") && controllerSource.includes("RetainedPreviewAliasCount=$previewCount"), "bounded alias list is the routing authority");
check(!controllerSource.includes("$oldN = Get-DeploymentProjection") && !controllerSource.includes("$oldO = Get-DeploymentProjection"), "redundant historical inspect alias proof is absent");
check(!controllerSource.includes("2>&1"), "mixed capture absent");
check(controllerSource.includes("Test-LostAutomaticVector") && controllerSource.includes("param([string[]]$Args)"), "lost Args discriminator retained only in self-test");
check(controllerSource.includes("Test-SafeCommandVector") && controllerSource.includes("param([string[]]$CommandArgs)"), "safe CommandArgs discriminator exact");
check(controllerSource.includes("'SelfTest','CredentialSelfTest'"), "command-vector and credential tests separated");
check(controllerSource.includes("function Assert-ExactJsonObject") && controllerSource.includes("AllowedTopLevelFields"), "each JSON command has an exact top-level shape");
check(controllerSource.includes("@('alias','deploymentId','url','createdAt')") && controllerSource.includes("extra='refuse'"), "alias rows refuse unknown fields");
check(controllerSource.includes("function Get-KnownDeploymentTargetClass") && controllerSource.includes("default { throw 'DEPLOYMENT_REFUSED' }"), "deployment targets use a closed value set");
check(controllerSource.includes("jsonShapeRefusalCount=$jsonShapeRefusalCount") && controllerSource.includes("deploymentTargetRefusalCount=$deploymentTargetRefusalCount"), "shape and target refusal fixtures are reported");

if (assertions !== 108) throw new Error(`Sprint 029T autonomous assertion target changed: ${assertions}/108`);
console.log(`Sprint 029T exact-command and readiness harness tests passed (${assertions}/${assertions}).`);
