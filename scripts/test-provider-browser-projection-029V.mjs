import assert from "node:assert/strict";
import {
  CONTROL_NAMES,
  EXPECTED_DOMAIN,
  REQUIRED_ACCESS_CLASS,
  TARGET_KEY_NAME,
  projectProviderControlSnapshot,
  projectProviderInventory,
  projectVercelEnvironmentMetadata,
} from "./provider-browser-projection-029V.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };

equal(TARGET_KEY_NAME, "Precision Performance public enquiry 029V", "target key name exact");
equal(EXPECTED_DOMAIN, "precisionperformance.com.au", "verified domain exact");
equal(REQUIRED_ACCESS_CLASS, "sending", "access class exact");

const providerSnapshot = (targetKeyCount, protectedValues = { identity: "Synthetic Alpha", address: "alpha@example.invalid" }) => ({
  schemaVersion: 1,
  fieldCount: 5,
  domainClass: "exact-verified",
  sendingAccessKeyCount: 2 + targetKeyCount,
  fullAccessKeyCount: 0,
  targetKeyCount,
  protected: protectedValues,
});
const absent = projectProviderInventory(providerSnapshot(0));
equal(absent.stateClass, "accepted", "provider baseline accepted");
equal(absent.targetState, "absent", "target absent exact");
const present = projectProviderInventory(providerSnapshot(1));
equal(present.stateClass, "accepted", "provider post-transfer accepted");
equal(present.targetState, "present", "target present exact");
const absentChanged = projectProviderInventory(providerSnapshot(0, { identity: "Synthetic Beta", address: "beta@example.invalid" }));
check(
  JSON.stringify(absentChanged) === JSON.stringify(absent)
    && !JSON.stringify(absent).includes("Synthetic Alpha")
    && !JSON.stringify(absent).includes("alpha@example.invalid"),
  "provider projection is protected-canary invariant and emits no protected value",
);
equal(projectProviderInventory({ ...providerSnapshot(0), targetKeyCount: 2 }).stateClass, "refused", "unknown target count refused");

const emptyControls = () => Object.fromEntries(CONTROL_NAMES.map((name) => [name, 0]));
const controlSnapshot = (pageClass, controls) => ({
  schemaVersion: 1,
  pageClass,
  exactPage: true,
  fieldCount: 6,
  protected: {
    identity: "Synthetic Account",
    address: "synthetic@example.invalid",
    token: ["re", "syntheticprotectedtoken029v12345"].join("_"),
  },
  controls: { ...emptyControls(), ...controls },
});
const create = projectProviderControlSnapshot(controlSnapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1,
}));
equal(create.controlClass, "ready", "exact create/copy/dismiss controls ready");
equal(projectProviderControlSnapshot(controlSnapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, dismiss: 1,
})).controlClass, "not-ready", "missing Copy refuses transfer readiness");
equal(projectProviderControlSnapshot(controlSnapshot("resend-delete", {
  deleteMenu: 1, deleteConfirm: 1, deleteCancel: 1,
})).controlClass, "ready", "exact delete/confirm/cancel controls ready");

const environmentSnapshot = (stage, overrides = {}) => ({
  schemaVersion: 1,
  stage,
  dedicated: stage === "baseline" ? 0 : stage === "private" ? 1 : 4,
  temporary: stage === "provision" ? 3 : 0,
  activation: 0,
  generic: 5,
  passwordSensitive: stage === "baseline" ? 0 : 1,
  structuralSensitive: ["structural", "provision", "final"].includes(stage) ? 3 : 0,
  temporarySensitive: stage === "provision" ? 3 : 0,
  wrongType: 0,
  wrongTarget: 0,
  ...overrides,
});
equal(projectVercelEnvironmentMetadata(environmentSnapshot("private")).stateClass, "accepted", "password is exact-sensitive Production");
equal(projectVercelEnvironmentMetadata(environmentSnapshot("structural")).stateClass, "accepted", "all structural rows exact-sensitive Production");
equal(projectVercelEnvironmentMetadata(environmentSnapshot("provision")).stateClass, "accepted", "all temporary rows exact-sensitive Production");
check(
  projectVercelEnvironmentMetadata(environmentSnapshot("structural", { activation: 1 })).stateClass === "refused"
    && projectVercelEnvironmentMetadata(environmentSnapshot("structural", { structuralSensitive: 2, wrongType: 1 })).stateClass === "refused"
    && projectVercelEnvironmentMetadata({ ...environmentSnapshot("provision"), extra: 0 }).stateClass === "refused",
  "activation, wrong sensitivity, and unknown metadata shape fail closed",
);

if (assertions !== 16) throw new Error(`Sprint 029V provider projection assertion target changed: ${assertions}/16`);
console.log(`Sprint 029V identity-blind provider and sensitivity projection tests passed (${assertions}/${assertions}).`);
