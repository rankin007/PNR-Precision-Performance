import assert from "node:assert/strict";
import {
  ENVIRONMENT_HEADING,
  PROJECT_BREADCRUMB,
  PROJECTION_KEYS,
  SECTION_HEADING,
  SETTING_ROUTE,
  TOGGLE_LABEL,
  projectAliasIsolationSnapshot,
  validateAliasIsolationTransition,
  validateTerminalFalse,
} from "./vercel-alias-isolation-projection-029V.mjs";

let assertions = 0;
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const check = (value, message) => { assertions += 1; assert(value, message); };
const refusesTransition = (value, message) => {
  assertions += 1;
  assert.throws(() => validateAliasIsolationTransition(value), /SETTING_TRANSITION_REFUSED/, message);
};

const snapshot = (overrides = {}) => ({
  schemaVersion: 1,
  route: SETTING_ROUTE,
  projectBreadcrumb: PROJECT_BREADCRUMB,
  environmentHeading: ENVIRONMENT_HEADING,
  sectionHeading: SECTION_HEADING,
  toggleLabel: TOGGLE_LABEL,
  toggleCount: 1,
  toggleChecked: true,
  saveControlCount: 0,
  saveAccessibleName: null,
  saveDisabled: null,
  protectedShapeCount: 0,
  ...overrides,
});

const baseline = projectAliasIsolationSnapshot(snapshot());
equal(baseline.stateClass, "accepted", "exact baseline accepted");
equal(baseline.toggleChecked, true, "baseline toggle true");
equal(baseline.saveClass, "autosave", "zero Save controls selects autosave");
check(Object.keys(baseline).length === PROJECTION_KEYS.length, "fixed projection field count");

for (const [name, value] of [
  ["route", SETTING_ROUTE + "/drift"],
  ["projectBreadcrumb", "wrong-project"],
  ["environmentHeading", "Preview"],
  ["sectionHeading", "Domains"],
  ["toggleLabel", "Auto assign domains"],
  ["toggleCount", 2],
  ["protectedShapeCount", 1],
]) {
  equal(projectAliasIsolationSnapshot(snapshot({ [name]: value })).stateClass, "refused", name + " drift refused");
}

equal(projectAliasIsolationSnapshot(snapshot({
  saveControlCount: 1,
  saveAccessibleName: "Save",
  saveDisabled: true,
})).saveClass, "manual-disabled", "exact disabled manual Save accepted");
equal(projectAliasIsolationSnapshot(snapshot({
  saveControlCount: 1,
  saveAccessibleName: "Apply",
  saveDisabled: true,
})).stateClass, "refused", "wrong save name refused");
equal(projectAliasIsolationSnapshot(snapshot({
  saveControlCount: 0,
  saveAccessibleName: "Save",
  saveDisabled: null,
})).stateClass, "refused", "autosave with named control refused");

const autosaveTransition = {
  before: snapshot(),
  afterToggle: snapshot({ toggleChecked: false }),
  afterReload: snapshot({ toggleChecked: false }),
};
const autosave = validateAliasIsolationTransition(autosaveTransition);
equal(autosave.persistenceClass, "reload-persisted-autosave", "autosave persistence exact");
equal(autosave.saveClickCount, 0, "autosave never clicks Save");
equal(validateTerminalFalse(autosaveTransition.afterReload).settingState, "persisted-false", "autosave terminal false accepted");

const manual = (toggleChecked, saveDisabled) => snapshot({
  toggleChecked,
  saveControlCount: 1,
  saveAccessibleName: "Save",
  saveDisabled,
});
const manualTransition = {
  before: manual(true, true),
  afterToggle: manual(false, false),
  afterReload: manual(false, true),
};
const manualResult = validateAliasIsolationTransition(manualTransition);
equal(manualResult.persistenceClass, "reload-persisted-manual-save", "manual persistence exact");
equal(manualResult.saveClickCount, 1, "manual branch clicks Save exactly once");
equal(validateTerminalFalse(manualTransition.afterReload).persistenceClass, "reload-persisted-manual-save", "manual terminal false accepted");

refusesTransition({ ...autosaveTransition, afterReload: snapshot({ toggleChecked: true }) }, "reload reversal refused");
refusesTransition({ ...manualTransition, before: manual(true, false) }, "manual Save enabled before toggle refused");
refusesTransition({ ...manualTransition, afterToggle: manual(false, true) }, "manual Save not enabled after toggle refused");
refusesTransition({ ...manualTransition, afterReload: manual(false, false) }, "manual Save not disabled after reload refused");
refusesTransition({
  ...manualTransition,
  afterReload: snapshot({ toggleChecked: false }),
}, "persistence branch switching refused");
assertions += 1;
assert.throws(() => validateTerminalFalse(snapshot()), /SETTING_TERMINAL_REFUSED/, "terminal true refused");

if (assertions !== 26) throw new Error("Sprint 029V alias-isolation assertion target changed: " + assertions + "/26");
console.log("Sprint 029V value-free alias-isolation projection tests passed (" + assertions + "/" + assertions + ").");