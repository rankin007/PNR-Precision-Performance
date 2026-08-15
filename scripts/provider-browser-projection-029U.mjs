export const CONTROL_PROJECTION_NAME = "provider-control-029U";
export const TARGET_KEY_NAME = "Precision Performance public enquiry 029U";
export const EXPECTED_DOMAIN = "precisionperformance.com.au";
export const REQUIRED_ACCESS_CLASS = "sending";

export const CONTROL_NAMES = Object.freeze([
  "keyName",
  "sendingAccess",
  "expectedDomain",
  "create",
  "copy",
  "dismiss",
  "deleteMenu",
  "deleteConfirm",
  "deleteCancel",
  "exactProject",
  "productionTarget",
  "blankBranch",
  "sensitive",
  "paste",
  "save",
  "navigate",
  "clearClipboard",
]);

export const CONTROL_PROJECTION_KEYS = Object.freeze([
  "projection",
  "fieldCount",
  "stateClass",
  "pageClass",
  "exactPage",
  "keyNameControlCount",
  "sendingAccessControlCount",
  "expectedDomainControlCount",
  "createControlCount",
  "copyControlCount",
  "dismissControlCount",
  "deleteMenuControlCount",
  "deleteConfirmControlCount",
  "deleteCancelControlCount",
  "exactProjectControlCount",
  "productionTargetControlCount",
  "blankBranchControlCount",
  "sensitiveControlCount",
  "pasteControlCount",
  "saveControlCount",
  "navigationControlCount",
  "clearClipboardControlCount",
  "rawSecretShapeCount",
  "controlClass",
]);

export const CONTROL_PROJECTION_FIELD_COUNT = CONTROL_PROJECTION_KEYS.length;

const PAGE_CLASSES = new Set([
  "resend-create",
  "resend-delete",
  "vercel-sensitive-form",
  "clipboard-clear",
]);

function exactKeys(value, keys) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).length === keys.length
    && keys.every((key) => Object.hasOwn(value, key));
}

function safeCount(value) {
  return Number.isInteger(value) && value >= 0 && value <= 1;
}

function safeAggregate(value, maximum) {
  return Number.isInteger(value) && value >= 0 && value <= maximum;
}

export function projectProviderInventory(snapshot) {
  const refused = { projection: "provider-inventory-029U", stateClass: "refused" };
  try {
    if (!exactKeys(snapshot, [
      "schemaVersion", "fieldCount", "domainClass", "sendingAccessKeyCount",
      "fullAccessKeyCount", "targetKeyCount", "protected",
    ]) || snapshot.schemaVersion !== 1 || snapshot.fieldCount !== 5
      || snapshot.domainClass !== "exact-verified"
      || !safeAggregate(snapshot.sendingAccessKeyCount, 3)
      || snapshot.fullAccessKeyCount !== 0 || !safeCount(snapshot.targetKeyCount)
      || snapshot.sendingAccessKeyCount !== 2 + snapshot.targetKeyCount
      || !exactKeys(snapshot.protected, ["identity", "address"])
      || Object.values(snapshot.protected).some((value) => typeof value !== "string")) return refused;
    return {
      projection: "provider-inventory-029U",
      stateClass: "accepted",
      domainClass: "exact-verified",
      sendingAccessKeyCount: snapshot.sendingAccessKeyCount,
      fullAccessKeyCount: 0,
      targetKeyCount: snapshot.targetKeyCount,
      targetState: snapshot.targetKeyCount === 0 ? "absent" : "present",
    };
  } catch {
    return refused;
  }
}

const ENVIRONMENT_STAGES = Object.freeze({
  baseline: { dedicated: 0, temporary: 0, passwordSensitive: 0, structuralSensitive: 0, temporarySensitive: 0 },
  private: { dedicated: 1, temporary: 0, passwordSensitive: 1, structuralSensitive: 0, temporarySensitive: 0 },
  structural: { dedicated: 4, temporary: 0, passwordSensitive: 1, structuralSensitive: 3, temporarySensitive: 0 },
  provision: { dedicated: 4, temporary: 3, passwordSensitive: 1, structuralSensitive: 3, temporarySensitive: 3 },
  final: { dedicated: 4, temporary: 0, passwordSensitive: 1, structuralSensitive: 3, temporarySensitive: 0 },
});

export function projectVercelEnvironmentMetadata(snapshot) {
  const refused = { projection: "vercel-environment-029U", stateClass: "refused" };
  try {
    if (!exactKeys(snapshot, [
      "schemaVersion", "stage", "dedicated", "temporary", "activation", "generic",
      "passwordSensitive", "structuralSensitive", "temporarySensitive", "wrongType", "wrongTarget",
    ]) || snapshot.schemaVersion !== 1 || !Object.hasOwn(ENVIRONMENT_STAGES, snapshot.stage)
      || snapshot.activation !== 0 || snapshot.generic !== 5
      || snapshot.wrongType !== 0 || snapshot.wrongTarget !== 0) return refused;
    const expected = ENVIRONMENT_STAGES[snapshot.stage];
    if (Object.entries(expected).some(([name, value]) => snapshot[name] !== value)) return refused;
    return {
      projection: "vercel-environment-029U",
      stateClass: "accepted",
      stage: snapshot.stage,
      dedicatedSmtpRowCount: snapshot.dedicated,
      temporaryAuthRowCount: snapshot.temporary,
      activationRowCount: 0,
      genericSmtpRowCount: 5,
      sensitivityClass: "exact",
    };
  } catch {
    return refused;
  }
}

function baseProjection(stateClass = "refused", pageClass = "refused", exactPage = false) {
  return {
    projection: CONTROL_PROJECTION_NAME,
    fieldCount: CONTROL_PROJECTION_FIELD_COUNT,
    stateClass,
    pageClass,
    exactPage,
    keyNameControlCount: 0,
    sendingAccessControlCount: 0,
    expectedDomainControlCount: 0,
    createControlCount: 0,
    copyControlCount: 0,
    dismissControlCount: 0,
    deleteMenuControlCount: 0,
    deleteConfirmControlCount: 0,
    deleteCancelControlCount: 0,
    exactProjectControlCount: 0,
    productionTargetControlCount: 0,
    blankBranchControlCount: 0,
    sensitiveControlCount: 0,
    pasteControlCount: 0,
    saveControlCount: 0,
    navigationControlCount: 0,
    clearClipboardControlCount: 0,
    rawSecretShapeCount: 0,
    controlClass: stateClass === "refused" ? "refused" : "not-ready",
  };
}

export function projectProviderControlSnapshot(snapshot) {
  const refused = () => baseProjection();
  try {
    if (!exactKeys(snapshot, ["schemaVersion", "pageClass", "exactPage", "fieldCount", "protected", "controls"])
      || snapshot.schemaVersion !== 1 || snapshot.fieldCount !== 6 || snapshot.exactPage !== true
      || !PAGE_CLASSES.has(snapshot.pageClass)
      || !exactKeys(snapshot.protected, ["identity", "address", "token"])
      || Object.values(snapshot.protected).some((value) => typeof value !== "string")
      || !exactKeys(snapshot.controls, CONTROL_NAMES)
      || Object.values(snapshot.controls).some((value) => !safeCount(value))) return refused();

    const output = baseProjection("accepted", snapshot.pageClass, true);
    output.keyNameControlCount = snapshot.controls.keyName;
    output.sendingAccessControlCount = snapshot.controls.sendingAccess;
    output.expectedDomainControlCount = snapshot.controls.expectedDomain;
    output.createControlCount = snapshot.controls.create;
    output.copyControlCount = snapshot.controls.copy;
    output.dismissControlCount = snapshot.controls.dismiss;
    output.deleteMenuControlCount = snapshot.controls.deleteMenu;
    output.deleteConfirmControlCount = snapshot.controls.deleteConfirm;
    output.deleteCancelControlCount = snapshot.controls.deleteCancel;
    output.exactProjectControlCount = snapshot.controls.exactProject;
    output.productionTargetControlCount = snapshot.controls.productionTarget;
    output.blankBranchControlCount = snapshot.controls.blankBranch;
    output.sensitiveControlCount = snapshot.controls.sensitive;
    output.pasteControlCount = snapshot.controls.paste;
    output.saveControlCount = snapshot.controls.save;
    output.navigationControlCount = snapshot.controls.navigate;
    output.clearClipboardControlCount = snapshot.controls.clearClipboard;
    output.rawSecretShapeCount = /^re_[A-Za-z0-9_-]{16,}$/.test(snapshot.protected.token) ? 1 : 0;

    const controls = snapshot.controls;
    const ready = snapshot.pageClass === "resend-create"
      ? controls.keyName === 1 && controls.sendingAccess === 1 && controls.expectedDomain === 1
        && controls.create === 1 && controls.copy === 1 && controls.dismiss === 1
        && CONTROL_NAMES.filter((name) => !["keyName", "sendingAccess", "expectedDomain", "create", "copy", "dismiss"].includes(name))
          .every((name) => controls[name] === 0)
      : snapshot.pageClass === "resend-delete"
        ? controls.deleteMenu === 1 && controls.deleteConfirm === 1 && controls.deleteCancel === 1
          && CONTROL_NAMES.filter((name) => !["deleteMenu", "deleteConfirm", "deleteCancel"].includes(name))
            .every((name) => controls[name] === 0)
        : snapshot.pageClass === "vercel-sensitive-form"
          ? controls.exactProject === 1 && controls.productionTarget === 1 && controls.blankBranch === 1
            && controls.sensitive === 1 && controls.paste === 1 && controls.save === 1 && controls.navigate === 1
            && CONTROL_NAMES.filter((name) => !["exactProject", "productionTarget", "blankBranch", "sensitive", "paste", "save", "navigate"].includes(name))
              .every((name) => controls[name] === 0)
          : controls.clearClipboard === 1
            && CONTROL_NAMES.filter((name) => name !== "clearClipboard").every((name) => controls[name] === 0);
    output.controlClass = ready ? "ready" : "not-ready";
    return output;
  } catch {
    return refused();
  }
}

export const BROWSER_CONTROL_PROJECTOR_SOURCE = `((snapshot) => {
  const CONTROL_PROJECTION_NAME = ${JSON.stringify(CONTROL_PROJECTION_NAME)};
  const CONTROL_NAMES = ${JSON.stringify(CONTROL_NAMES)};
  const CONTROL_PROJECTION_FIELD_COUNT = ${CONTROL_PROJECTION_FIELD_COUNT};
  const PAGE_CLASSES = new Set(${JSON.stringify([...PAGE_CLASSES])});
  ${exactKeys.toString()}
  ${safeCount.toString()}
  ${baseProjection.toString()}
  return (${projectProviderControlSnapshot.toString()})(snapshot);
})`;
