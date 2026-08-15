export const SETTING_ROUTE = "https://vercel.com/rankin007s-projects/pnr-precision-performance/settings/environments/production";
export const PROJECT_BREADCRUMB = "pnr-precision-performance";
export const ENVIRONMENT_HEADING = "Production";
export const SECTION_HEADING = "Branch Tracking";
export const TOGGLE_LABEL = "Auto-assign Custom Production Domains";
export const PROJECTION_NAME = "vercel-alias-isolation-029V";

export const SNAPSHOT_KEYS = Object.freeze([
  "schemaVersion",
  "route",
  "projectBreadcrumb",
  "environmentHeading",
  "sectionHeading",
  "toggleLabel",
  "toggleCount",
  "toggleChecked",
  "saveControlCount",
  "saveAccessibleName",
  "saveDisabled",
  "protectedShapeCount",
]);

export const PROJECTION_KEYS = Object.freeze([
  "projection",
  "stateClass",
  "routeClass",
  "projectClass",
  "environmentClass",
  "sectionClass",
  "toggleClass",
  "toggleCount",
  "toggleChecked",
  "saveControlCount",
  "saveClass",
  "protectedShapeCount",
]);

function exactKeys(value, keys) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).length === keys.length
    && keys.every((key) => Object.hasOwn(value, key));
}

function refused() {
  return {
    projection: PROJECTION_NAME,
    stateClass: "refused",
    routeClass: "refused",
    projectClass: "refused",
    environmentClass: "refused",
    sectionClass: "refused",
    toggleClass: "refused",
    toggleCount: 0,
    toggleChecked: null,
    saveControlCount: 0,
    saveClass: "refused",
    protectedShapeCount: 0,
  };
}

export function projectAliasIsolationSnapshot(snapshot) {
  try {
    if (!exactKeys(snapshot, SNAPSHOT_KEYS)
      || snapshot.schemaVersion !== 1
      || snapshot.route !== SETTING_ROUTE
      || snapshot.projectBreadcrumb !== PROJECT_BREADCRUMB
      || snapshot.environmentHeading !== ENVIRONMENT_HEADING
      || snapshot.sectionHeading !== SECTION_HEADING
      || snapshot.toggleLabel !== TOGGLE_LABEL
      || snapshot.toggleCount !== 1
      || typeof snapshot.toggleChecked !== "boolean"
      || ![0, 1].includes(snapshot.saveControlCount)
      || snapshot.protectedShapeCount !== 0) return refused();

    let saveClass;
    if (snapshot.saveControlCount === 0) {
      if (snapshot.saveAccessibleName !== null || snapshot.saveDisabled !== null) return refused();
      saveClass = "autosave";
    } else {
      if (snapshot.saveAccessibleName !== "Save" || typeof snapshot.saveDisabled !== "boolean") return refused();
      saveClass = snapshot.saveDisabled ? "manual-disabled" : "manual-enabled";
    }

    return {
      projection: PROJECTION_NAME,
      stateClass: "accepted",
      routeClass: "exact-production-environment",
      projectClass: "exact-pnr-precision-performance",
      environmentClass: "production",
      sectionClass: "branch-tracking",
      toggleClass: "exact-auto-assign-custom-production-domains",
      toggleCount: 1,
      toggleChecked: snapshot.toggleChecked,
      saveControlCount: snapshot.saveControlCount,
      saveClass,
      protectedShapeCount: 0,
    };
  } catch {
    return refused();
  }
}

export function validateAliasIsolationTransition(value) {
  if (!exactKeys(value, ["before", "afterToggle", "afterReload"])) throw new Error("SETTING_TRANSITION_REFUSED");
  const before = projectAliasIsolationSnapshot(value.before);
  const afterToggle = projectAliasIsolationSnapshot(value.afterToggle);
  const afterReload = projectAliasIsolationSnapshot(value.afterReload);
  if ([before, afterToggle, afterReload].some((item) => item.stateClass !== "accepted")
    || before.toggleChecked !== true
    || afterToggle.toggleChecked !== false
    || afterReload.toggleChecked !== false) throw new Error("SETTING_TRANSITION_REFUSED");

  if (before.saveClass === "autosave"
    && afterToggle.saveClass === "autosave"
    && afterReload.saveClass === "autosave") {
    return {
      stateClass: "accepted",
      settingState: "persisted-false",
      persistenceClass: "reload-persisted-autosave",
      saveClickCount: 0,
      protectedShapeCount: 0,
    };
  }

  if (before.saveClass === "manual-disabled"
    && afterToggle.saveClass === "manual-enabled"
    && afterReload.saveClass === "manual-disabled") {
    return {
      stateClass: "accepted",
      settingState: "persisted-false",
      persistenceClass: "reload-persisted-manual-save",
      saveClickCount: 1,
      protectedShapeCount: 0,
    };
  }

  throw new Error("SETTING_TRANSITION_REFUSED");
}

export function validateTerminalFalse(snapshot) {
  const projection = projectAliasIsolationSnapshot(snapshot);
  if (projection.stateClass !== "accepted" || projection.toggleChecked !== false
    || !["autosave", "manual-disabled"].includes(projection.saveClass)) {
    throw new Error("SETTING_TERMINAL_REFUSED");
  }
  return {
    stateClass: "accepted",
    settingState: "persisted-false",
    persistenceClass: projection.saveClass === "autosave"
      ? "reload-persisted-autosave"
      : "reload-persisted-manual-save",
    protectedShapeCount: 0,
  };
}

export const BROWSER_SETTING_PROJECTOR_SOURCE = "((snapshot) => {"
  + "const SETTING_ROUTE=" + JSON.stringify(SETTING_ROUTE) + ";"
  + "const PROJECT_BREADCRUMB=" + JSON.stringify(PROJECT_BREADCRUMB) + ";"
  + "const ENVIRONMENT_HEADING=" + JSON.stringify(ENVIRONMENT_HEADING) + ";"
  + "const SECTION_HEADING=" + JSON.stringify(SECTION_HEADING) + ";"
  + "const TOGGLE_LABEL=" + JSON.stringify(TOGGLE_LABEL) + ";"
  + "const PROJECTION_NAME=" + JSON.stringify(PROJECTION_NAME) + ";"
  + "const SNAPSHOT_KEYS=" + JSON.stringify(SNAPSHOT_KEYS) + ";"
  + exactKeys.toString()
  + refused.toString()
  + "return (" + projectAliasIsolationSnapshot.toString() + ")(snapshot);"
  + "})";