import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import {
  BRANCH,
  IMPLEMENTATION_FILES,
  PROJECT_ID,
  SCANNABLE_FILES,
  START_SHA,
  countProtectedMatches,
  validateBaselineProjection,
  validateControllerSelfTest,
  validateDeploymentProjection,
  validatePrivatePasswordProjection,
  validateProvisionProjection,
  validatePublicGateProjection,
  validateStructuralProjection,
} from "./autonomous-public-enquiry-029U.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsProjection = (operation, message) => {
  assertions += 1;
  assert.throws(operation, (error) => error?.code === "PROJECTION_REFUSED", message);
};

equal(PROJECT_ID, "prj_6To7czLpCEGL6fInkQwE4egePPpq", "project exact");
equal(BRANCH, "codex/029U-operator-isolated-guarded-smtp-readiness-recovery", "branch exact");
equal(START_SHA, "d822c027c58ad88ec7472e35986e7a33d6a3d6c9", "start SHA exact");
check(
  [".env.example", "app/api/enquiries/route.ts", "lib/enquiries/env.ts", "scripts/PreflightAuth029U.ps1",
    "scripts/test-public-enquiry-029U.mjs", "scripts/provider-browser-projection-029U.mjs",
    "scripts/test-provider-browser-projection-029U.mjs"].every((file) => IMPLEMENTATION_FILES.includes(file) && existsSync(file)),
  "approved implementation surfaces exact and present",
);
check(new Set(SCANNABLE_FILES).size === SCANNABLE_FILES.length && SCANNABLE_FILES.every(existsSync), "scanner manifest paths unique and present");

const selfTestRaw = execFileSync("powershell.exe", [
  "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "scripts/PreflightAuth029U.ps1", "-Operation", "SelfTest",
], { encoding: "utf8", windowsHide: true }).trim();
const selfTest = JSON.parse(selfTestRaw);
equal(validateControllerSelfTest(selfTest).sensitivityRefusalCount, 4, "controller SelfTest proves wrong and missing sensitivity refusals");
throwsProjection(() => validateControllerSelfTest({ ...selfTest, extra: 0 }), "controller unknown output field refused");

const baseline = {
  controller: "029U", operation: "baseline", state: "pass", projectClass: "exact",
  dedicatedSmtpRowCount: 0, temporaryAuthRowCount: 0, activationRowCount: 0, genericSmtpRowCount: 5,
  credentialState: "absent", sprintDeploymentCount: 0, retainedPreviewClass: "ready-preview-inert",
  retainedPreviewAliasCount: 0, priorCandidateCount: 2, priorCandidateAliasCount: 0,
  acceptedDeploymentClass: "ready", acceptedAliasTargetCount: 5,
};
equal(validateBaselineProjection(baseline).targetResourceCount, 0, "baseline exact and activation absent");
throwsProjection(() => validateBaselineProjection({ ...baseline, activationRowCount: 1 }), "baseline activation row refused");

const privatePassword = {
  controller: "029U", operation: "accept-private-password-baseline", state: "pass",
  dedicatedSmtpRowCount: 1, temporaryAuthRowCount: 0, activationRowCount: 0, genericSmtpRowCount: 5,
  passwordSensitivityClass: "exact-sensitive-production", sprintDeploymentCount: 0, acceptedAliasTargetCount: 5,
};
equal(validatePrivatePasswordProjection(privatePassword).sensitivityClass, "exact-sensitive-production", "private password exact-sensitive Production");
throwsProjection(() => validatePrivatePasswordProjection({ ...privatePassword, passwordSensitivityClass: "encrypted" }), "private password wrong type refused");

const structural = {
  controller: "029U", operation: "add-structural-smtp", state: "pass",
  dedicatedSmtpRowCount: 4, temporaryAuthRowCount: 0, activationRowCount: 0,
  sensitivityClass: "all-exact-sensitive-production",
};
equal(validateStructuralProjection(structural).dedicatedSmtpRowCount, 4, "structural rows all exact-sensitive Production");
throwsProjection(() => validateStructuralProjection({ ...structural, activationRowCount: 1 }), "structural phase activation refused");

const provision = {
  controller: "029U", operation: "provision", state: "pass", bindingCount: 3,
  windowClass: "bounded", credentialState: "present", activationRowCount: 0,
  sensitivityClass: "all-seven-exact-sensitive-production",
};
equal(validateProvisionProjection(provision).bindingCount, 3, "temporary rows all exact-sensitive Production");
throwsProjection(() => validateProvisionProjection({ ...provision, sensitivityClass: "partial" }), "temporary sensitivity mismatch refused");

const publicGate = {
  controller: "029U", operation: "verify-public-gate", state: "pass", requestCount: 1,
  httpClass: "service-unavailable", responseClass: "sanitized", productActionCount: 0,
};
equal(validatePublicGateProjection(publicGate).requestCount, 1, "one sanitized public gate probe");
throwsProjection(() => validatePublicGateProjection({ ...publicGate, productActionCount: 1 }), "public Product action refused");

const controllerSource = readFileSync("scripts/PreflightAuth029U.ps1", "utf8");
check(
  controllerSource.includes("@('env','add',$Name,'production','--sensitive','--yes','--no-color')")
    && !controllerSource.includes("@('env','add',$Name,'production','--yes','--no-color')"),
  "all programmatic owned-value writes use exact --sensitive Production stdin vector",
);
equal(validateDeploymentProjection({
  controller: "029U", operation: "deploy", state: "pass", deploymentId: "dpl_Synthetic029U",
  targetClass: "production", readinessClass: "ready", aliasCount: 0,
  metadataClass: "exact-029U", sourceClass: "exact-canonical",
}).aliasCount, 0, "deployment projection remains exact-source Ready zero-alias");
equal(countProtectedMatches("state=safe count=1 smtp.resend.com synthetic@example.invalid"), 0, "safe scanner text remains clean");

if (assertions !== 20) throw new Error(`Sprint 029U autonomous assertion target changed: ${assertions}/20`);
console.log(`Sprint 029U guarded controller and readiness tests passed (${assertions}/${assertions}).`);
