import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import {
  BRANCH,
  IMPLEMENTATION_FILES,
  PROJECT_ID,
  SCANNABLE_FILES,
  START_SHA,
  classifyDeploymentReconciliation,
  countProtectedMatches,
  validateBaselineProjection,
  validateControllerSelfTest,
  validateDeploySuccess,
  validateDeploymentInventory,
  validateDeploymentProjection,
  validateInventoryProjection,
  validatePrivatePasswordProjection,
  validateProvisionProjection,
  validatePublicGateProjection,
  validateStableDeploymentWalk,
  validateStructuralProjection,
  validateVercelCliVersion,
} from "./autonomous-public-enquiry-029V.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsProjection = (operation, message) => {
  assertions += 1;
  assert.throws(operation, (error) => error?.code === "PROJECTION_REFUSED", message);
};
const rejectsCode = (operation, code, message) => {
  assertions += 1;
  assert.throws(operation, (error) => error?.code === code || error?.message === code, message);
};

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "project exact");
equal(BRANCH, "codex/029V-vercel-agent-envelope-and-alias-isolation-recovery", "branch exact");
equal(START_SHA, "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "start SHA exact");
check(
  [
    "scripts/PreflightAuth029V.ps1",
    "scripts/autonomous-public-enquiry-029V.mjs",
    "scripts/provider-browser-projection-029V.mjs",
    "scripts/vercel-alias-isolation-projection-029V.mjs",
    "scripts/test-vercel-alias-isolation-projection-029V.mjs",
  ].every((file) => IMPLEMENTATION_FILES.includes(file) && existsSync(file)),
  "approved implementation surfaces exact and present",
);
check(new Set(SCANNABLE_FILES).size === SCANNABLE_FILES.length && SCANNABLE_FILES.every(existsSync), "scanner manifest paths unique and present");

const selfTestRaw = execFileSync("powershell.exe", [
  "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "scripts/PreflightAuth029V.ps1", "-Operation", "SelfTest",
], { encoding: "utf8", windowsHide: true }).trim();
const selfTest = JSON.parse(selfTestRaw);
equal(validateControllerSelfTest(selfTest).sensitivityRefusalCount, 4, "controller SelfTest proves wrong and missing sensitivity refusals");
throwsProjection(() => validateControllerSelfTest({ ...selfTest, extra: 0 }), "controller unknown output field refused");
throwsProjection(() => validateControllerSelfTest({ ...selfTest, cliVersionFixturePassCount: 0 }), "controller missing pinned CLI proof refused");
throwsProjection(() => validateControllerSelfTest({ ...selfTest, protectedInventoryRefusalCount: 1 }), "controller missing real protected-inventory refusal proof refused");
throwsProjection(() => validateControllerSelfTest({ ...selfTest, phaseFixturePassCount: 0 }), "controller missing durable phase proof refused");
throwsProjection(() => validateControllerSelfTest({ ...selfTest, originMismatchRequestCount: 1 }), "controller origin mismatch request leakage refused");

const baseline = {
  controller: "029V", operation: "baseline", state: "pass", projectClass: "exact",
  dedicatedSmtpRowCount: 0, temporaryAuthRowCount: 0, activationRowCount: 0, genericSmtpRowCount: 5,
  credentialState: "absent", sprintDeploymentCount: 0, retainedPreviewClass: "ready-preview-inert",
  retainedPreviewAliasCount: 0, priorCandidateCount: 2, priorCandidateAliasCount: 0,
  acceptedDeploymentClass: "ready", acceptedAliasTargetCount: 5,
};
equal(validateBaselineProjection(baseline).targetResourceCount, 0, "baseline exact and activation absent");
throwsProjection(() => validateBaselineProjection({ ...baseline, activationRowCount: 1 }), "baseline activation row refused");

const privatePassword = {
  controller: "029V", operation: "accept-private-password-baseline", state: "pass",
  dedicatedSmtpRowCount: 1, temporaryAuthRowCount: 0, activationRowCount: 0, genericSmtpRowCount: 5,
  passwordSensitivityClass: "exact-sensitive-production", sprintDeploymentCount: 0, acceptedAliasTargetCount: 5,
};
equal(validatePrivatePasswordProjection(privatePassword).sensitivityClass, "exact-sensitive-production", "private password exact-sensitive Production");
throwsProjection(() => validatePrivatePasswordProjection({ ...privatePassword, passwordSensitivityClass: "encrypted" }), "private password wrong type refused");

const structural = {
  controller: "029V", operation: "add-structural-smtp", state: "pass",
  dedicatedSmtpRowCount: 4, temporaryAuthRowCount: 0, activationRowCount: 0,
  sensitivityClass: "all-exact-sensitive-production",
};
equal(validateStructuralProjection(structural).dedicatedSmtpRowCount, 4, "structural rows all exact-sensitive Production");
throwsProjection(() => validateStructuralProjection({ ...structural, activationRowCount: 1 }), "structural phase activation refused");

const provision = {
  controller: "029V", operation: "provision", state: "pass", bindingCount: 3,
  windowClass: "bounded", credentialState: "present", activationRowCount: 0,
  sensitivityClass: "all-seven-exact-sensitive-production",
};
equal(validateProvisionProjection(provision).bindingCount, 3, "temporary rows all exact-sensitive Production");
throwsProjection(() => validateProvisionProjection({ ...provision, sensitivityClass: "partial" }), "temporary sensitivity mismatch refused");

const publicGate = {
  controller: "029V", operation: "verify-public-gate", state: "pass", requestCount: 1,
  httpClass: "service-unavailable", responseClass: "sanitized", productActionCount: 0,
};
equal(validatePublicGateProjection(publicGate).requestCount, 1, "one sanitized public gate probe");
throwsProjection(() => validatePublicGateProjection({ ...publicGate, productActionCount: 1 }), "public Product action refused");

const controllerSource = readFileSync("scripts/PreflightAuth029V.ps1", "utf8");
check(
  controllerSource.includes("@('env','add',$Name,'production','--sensitive','--yes','--no-color')")
    && !controllerSource.includes("@('env','add',$Name,'production','--yes','--no-color')"),
  "all programmatic owned-value writes use exact --sensitive Production stdin vector",
);
const deploymentProjection = {
  controller: "029V", operation: "deploy", state: "pass", deploymentId: "dpl_Synthetic029V",
  candidateOrigin: "https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app",
  responseForm: "agent", targetClass: "production", readinessClass: "ready", aliasCount: 0,
  metadataClass: "exact-029V", sourceClass: "exact-canonical",
  reconciliationObservationCount: 3, fullDeploymentDeltaCount: 1,
};
equal(validateDeploymentProjection(deploymentProjection).aliasCount, 0, "deployment projection remains exact-source Ready zero-alias");
rejectsCode(() => validateDeploymentProjection({ ...deploymentProjection, candidateOrigin: deploymentProjection.candidateOrigin + "/path" }), "DEPLOYMENT_REFUSED", "deployment projection non-root candidate origin refused");
rejectsCode(() => validateDeploymentProjection({ ...deploymentProjection, reconciliationObservationCount: 2 }), "DEPLOYMENT_REFUSED", "deployment projection requires all three observations");
equal(countProtectedMatches("state=safe count=1 smtp.resend.com synthetic@example.invalid"), 0, "safe scanner text remains clean");

equal(validateVercelCliVersion("50.42.0"), "50.42.0", "pinned CLI version accepted");
rejectsCode(() => validateVercelCliVersion("50.43.0"), "CLI_VERSION_REFUSED", "CLI version drift refused");

const rawDeployment = {
  id: "dpl_Synthetic029V",
  url: "https://pnr-precision-performance-synthetic-rankin007s-projects.vercel.app",
  inspectorUrl: null,
  readyState: "READY",
  target: "production",
  deploymentApiUrl: "https://api.vercel.com/v13/deployments/dpl_Synthetic029V",
};
const raw = validateDeploySuccess(rawDeployment);
equal(raw.form, "raw", "exact legacy raw success accepted");
equal(raw.host, "pnr-precision-performance-synthetic-rankin007s-projects.vercel.app", "strict HTTPS origin derives bare host");
const agentDeployment = {
  status: "ok",
  deployment: rawDeployment,
  message: "Deployment pnr-precision-performance-synthetic-rankin007s-projects.vercel.app ready.",
  next: [
    { command: "vercel inspect pnr-precision-performance-synthetic-rankin007s-projects.vercel.app --no-color", when: "Inspect deployment" },
    { command: "vercel deploy --prod --no-color", when: "Promote to production" },
  ],
};
equal(validateDeploySuccess(agentDeployment).form, "agent", "exact agent envelope accepted");
equal(validateDeploySuccess(agentDeployment).deploymentId, rawDeployment.id, "agent envelope retains nested deployment ID");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, message: "Deployment " + rawDeployment.url + " ready." }), "DEPLOYMENT_REFUSED", "message using HTTPS origin refused");
rejectsCode(() => validateDeploySuccess({
  ...agentDeployment,
  next: [{ ...agentDeployment.next[0], command: "vercel inspect " + rawDeployment.url + " --no-color" }, agentDeployment.next[1]],
}), "DEPLOYMENT_REFUSED", "inspect guidance using HTTPS origin refused");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, next: [...agentDeployment.next].reverse() }), "DEPLOYMENT_REFUSED", "reordered guidance refused");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, deployment: { ...rawDeployment, extra: 0 } }), "DEPLOYMENT_REFUSED", "extra nested deployment field refused");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, extra: 0 }), "DEPLOYMENT_REFUSED", "extra top-level agent field refused");
rejectsCode(() => validateDeploySuccess({
  ...agentDeployment,
  deployment: { ...rawDeployment, url: rawDeployment.url + "/path" },
}), "DEPLOYMENT_REFUSED", "non-root nested deployment URL refused");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, status: "OK" }), "DEPLOYMENT_REFUSED", "wrong status casing refused");
rejectsCode(() => validateDeploySuccess({ status: "ok", deployment: rawDeployment, message: agentDeployment.message }), "DEPLOYMENT_REFUSED", "missing agent field refused");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, message: agentDeployment.message.slice(0, -1) + "!" }), "DEPLOYMENT_REFUSED", "message punctuation drift refused");
rejectsCode(() => validateDeploySuccess({
  ...agentDeployment,
  next: [{ ...agentDeployment.next[0], command: agentDeployment.next[0].command + " --yes" }, agentDeployment.next[1]],
}), "DEPLOYMENT_REFUSED", "extra guidance flag refused");
rejectsCode(() => validateDeploySuccess({
  ...agentDeployment,
  next: [{ ...agentDeployment.next[0], when: "Inspect the deployment" }, agentDeployment.next[1]],
}), "DEPLOYMENT_REFUSED", "wrong guidance when text refused");
rejectsCode(() => validateDeploySuccess({ ...agentDeployment, deployment: { ...rawDeployment, readyState: "ERROR" } }), "DEPLOYMENT_REFUSED", "error deployment state refused");
rejectsCode(() => validateDeploySuccess({ unknown: true }), "DEPLOYMENT_REFUSED", "unknown deploy object refused");
rejectsCode(() => validateDeploySuccess([agentDeployment, agentDeployment]), "DEPLOYMENT_REFUSED", "multiple deploy objects refused");
rejectsCode(() => validateDeploySuccess({
  ...agentDeployment,
  deployment: { ...rawDeployment, url: rawDeployment.url + "?query=1" },
}), "DEPLOYMENT_REFUSED", "query-bearing nested deployment URL refused");
const inventoryRows = [
  { deploymentId: "dpl_Ready029V", stateClass: "READY", targetClass: "production", createdAt: 100 },
  { deploymentId: "dpl_Queued029V", stateClass: "QUEUED", targetClass: "preview", createdAt: 90 },
];
equal(validateDeploymentInventory(inventoryRows).activeCount, 1, "active deployment state counted");
rejectsCode(() => validateDeploymentInventory([...inventoryRows, inventoryRows[0]]), "SNAPSHOT_REFUSED", "duplicate deployment ID refused");
rejectsCode(() => validateDeploymentInventory([{ ...inventoryRows[0], creator: "protected" }]), "SNAPSHOT_REFUSED", "protected extra deployment field refused");
const inventoryProjection = {
  controller: "029V", operation: "inventory", state: "pass", deploymentCount: 2,
  activeDeploymentCount: 1, pageCount: 2, restartCount: 1, headStable: true, rows: inventoryRows,
};
equal(validateInventoryProjection(inventoryProjection).rowCount, 2, "sanitized controller inventory accepted");
rejectsCode(() => validateInventoryProjection({ ...inventoryProjection, deploymentCount: 1 }), "SNAPSHOT_REFUSED", "inventory count mismatch refused");
rejectsCode(() => validateInventoryProjection({ ...inventoryProjection, activeDeploymentCount: 0 }), "SNAPSHOT_REFUSED", "inventory active count mismatch refused");
rejectsCode(() => validateInventoryProjection({ ...inventoryProjection, protected: "value" }), "SNAPSHOT_REFUSED", "inventory protected extra output refused");

const stableWalk = {
  pages: 2,
  restartCount: 1,
  firstHead: inventoryRows,
  revalidatedHead: inventoryRows.map((row) => ({ ...row })),
  rows: inventoryRows,
};
equal(validateStableDeploymentWalk(stableWalk).rowCount, 2, "stable paged walk accepted");
equal(validateStableDeploymentWalk(stableWalk).restartCount, 1, "one head-drift restart recorded");
rejectsCode(() => validateStableDeploymentWalk({
  ...stableWalk,
  revalidatedHead: [inventoryRows[0]],
}), "SNAPSHOT_REFUSED", "head drift after completed walk refused");
rejectsCode(() => validateStableDeploymentWalk({ ...stableWalk, pages: 11 }), "SNAPSHOT_REFUSED", "more than ten pages refused");
// reconcile tests
const reconciliationCases = [
  [{ deployInvocationStarted: false, observationCounts: [0], ownedCandidateCount: 0, ownedCandidateExact: false, cleanupAttempted: false, cleanupResidue: 0 }, "blocked-clean", "known no-creation zero residue is clean"],
  [{ deployInvocationStarted: true, observationCounts: [0, 0, 0], ownedCandidateCount: 0, ownedCandidateExact: false, cleanupAttempted: false, cleanupResidue: 0 }, "blocked-material", "started invocation with zero observations is material"],
  [{ deployInvocationStarted: true, observationCounts: [2, 2, 2], ownedCandidateCount: 2, ownedCandidateExact: false, cleanupAttempted: false, cleanupResidue: 0 }, "blocked-material", "multiple candidates are material"],
  [{ deployInvocationStarted: true, observationCounts: [0, 1, 1], ownedCandidateCount: 1, ownedCandidateExact: true, cleanupAttempted: false, cleanupResidue: 0 }, "continue", "one exact owned candidate may continue"],
  [{ deployInvocationStarted: true, observationCounts: [1, 1, 1], ownedCandidateCount: 1, ownedCandidateExact: true, cleanupAttempted: true, cleanupResidue: 0 }, "blocked-clean", "owned candidate cleanup with zero residue is clean"],
  [{ deployInvocationStarted: true, observationCounts: [1, 1, 1], ownedCandidateCount: 1, ownedCandidateExact: true, cleanupAttempted: true, cleanupResidue: 1 }, "blocked-material", "owned candidate cleanup residue is material"],
];
for (const [input, terminalClass, message] of reconciliationCases) equal(classifyDeploymentReconciliation(input).terminalClass, terminalClass, message);
rejectsCode(() => classifyDeploymentReconciliation({ deployInvocationStarted: false, observationCounts: [0, 0, 0], ownedCandidateCount: 0, ownedCandidateExact: false, cleanupAttempted: false, cleanupResidue: 0 }), "RECONCILIATION_REFUSED", "known no-creation cannot claim three ambiguous observations");
rejectsCode(() => classifyDeploymentReconciliation({ deployInvocationStarted: true, observationCounts: [1], ownedCandidateCount: 1, ownedCandidateExact: true, cleanupAttempted: false, cleanupResidue: 0 }), "RECONCILIATION_REFUSED", "started invocation requires three bounded observations");

const dollar = String.fromCharCode(36);
check(controllerSource.includes("DeployInvocationStarted = " + dollar + "true") && controllerSource.includes("ConvertTo-AgentDeployResultProjection") && controllerSource.includes("Get-StableFullDeploymentInventory"), "controller carries invocation, exact agent-envelope, and stable full-inventory gates");
check(controllerSource.includes("Start-LiveAttempt") && controllerSource.includes("Resolve-RecordedCandidateOrigin") && !controllerSource.includes("'creator','meta'"), "controller carries durable phase, exact origin binding, and protected-field refusal gates");
if (assertions !== 68) throw new Error("Sprint 029V autonomous assertion target changed: " + assertions + "/68");
console.log("Sprint 029V guarded controller and envelope tests passed (" + assertions + "/" + assertions + ").");
