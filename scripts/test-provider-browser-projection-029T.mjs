import assert from "node:assert/strict";
import vm from "node:vm";
import {
  BROWSER_CONTROL_PROJECTOR_SOURCE,
  CONTROL_NAMES,
  CONTROL_PROJECTION_FIELD_COUNT,
  CONTROL_PROJECTION_KEYS,
  CONTROL_PROJECTION_NAME,
  projectProviderControlSnapshot,
} from "./provider-browser-projection-029T.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };

const protectedA = {
  identity: "Synthetic Account Alpha",
  address: "alpha@example.invalid",
  token: ["re", "syntheticprotectedtokenalpha12345"].join("_"),
};
const protectedB = {
  identity: "Synthetic Account Beta",
  address: "beta@example.invalid",
  token: ["re", "syntheticprotectedtokenbeta67890"].join("_"),
};
const emptyControls = () => Object.fromEntries(CONTROL_NAMES.map((name) => [name, 0]));
function snapshot(pageClass, controls = {}, overrides = {}) {
  return {
    schemaVersion: 1,
    pageClass,
    exactPage: true,
    fieldCount: 6,
    protected: protectedA,
    controls: { ...emptyControls(), ...controls },
    ...overrides,
  };
}

equal(CONTROL_PROJECTION_NAME, "provider-control-029T", "projection name fixed");
equal(CONTROL_PROJECTION_KEYS.length, CONTROL_PROJECTION_FIELD_COUNT, "projection field count exact");
equal(new Set(CONTROL_PROJECTION_KEYS).size, CONTROL_PROJECTION_FIELD_COUNT, "projection keys unique");
equal(CONTROL_NAMES.length, 17, "seventeen exact control inputs");
equal(new Set(CONTROL_NAMES).size, 17, "control names unique");
check(BROWSER_CONTROL_PROJECTOR_SOURCE.startsWith("((snapshot) =>"), "browser source is isolated function");

const create = projectProviderControlSnapshot(snapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1,
}));
equal(Object.keys(create).length, CONTROL_PROJECTION_FIELD_COUNT, "create output field count exact");
deepEqual(Object.keys(create), CONTROL_PROJECTION_KEYS, "create output key order exact");
equal(create.projection, CONTROL_PROJECTION_NAME, "create projection name exact");
equal(create.fieldCount, CONTROL_PROJECTION_FIELD_COUNT, "create fieldCount exact");
equal(create.stateClass, "accepted", "create accepted");
equal(create.pageClass, "resend-create", "create page exact");
equal(create.exactPage, true, "create exact page true");
equal(create.keyNameControlCount, 1, "key name exact");
equal(create.sendingAccessControlCount, 1, "sending access exact");
equal(create.expectedDomainControlCount, 1, "domain exact");
equal(create.createControlCount, 1, "create exact");
equal(create.copyControlCount, 1, "copy exact");
equal(create.dismissControlCount, 1, "dismiss exact");
equal(create.rawSecretShapeCount, 1, "raw shape reduced to count");
equal(create.controlClass, "ready", "create controls ready");
const createChanged = projectProviderControlSnapshot(snapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1,
}, { protected: protectedB }));
deepEqual(createChanged, create, "protected canary changes do not change projection");
const serialized = JSON.stringify(create);
check(!serialized.includes(protectedA.identity), "identity absent");
check(!serialized.includes(protectedA.address), "address absent");
check(!serialized.includes(protectedA.token), "token absent");
check(!serialized.includes(protectedA.token.slice(-8)), "token fragment absent");

const deletion = projectProviderControlSnapshot(snapshot("resend-delete", {
  deleteMenu: 1, deleteConfirm: 1, deleteCancel: 1,
}));
equal(deletion.controlClass, "ready", "delete controls ready");
equal(deletion.deleteMenuControlCount, 1, "delete menu exact");
equal(deletion.deleteConfirmControlCount, 1, "delete confirm exact");
equal(deletion.deleteCancelControlCount, 1, "delete cancel exact");
check(deletion.createControlCount === 0 && deletion.copyControlCount === 0 && deletion.saveControlCount === 0, "delete projection has no mutation spillover");

const vercel = projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, sensitive: 1, paste: 1, save: 1, navigate: 1,
}));
equal(vercel.controlClass, "ready", "Vercel controls ready");
equal(vercel.exactProjectControlCount, 1, "exact project control");
equal(vercel.productionTargetControlCount, 1, "Production control");
equal(vercel.blankBranchControlCount, 1, "blank branch control");
equal(vercel.sensitiveControlCount, 1, "Sensitive control");
equal(vercel.pasteControlCount, 1, "paste control");
equal(vercel.saveControlCount, 1, "save control");
equal(vercel.navigationControlCount, 1, "navigation control");
equal(vercel.clearClipboardControlCount, 0, "clipboard clear separate");

const clipboard = projectProviderControlSnapshot(snapshot("clipboard-clear", { clearClipboard: 1 }));
equal(clipboard.controlClass, "ready", "clipboard clear ready");
equal(clipboard.clearClipboardControlCount, 1, "clear control exact");
check(clipboard.saveControlCount === 0 && clipboard.copyControlCount === 0 && clipboard.pasteControlCount === 0, "clear projection has no provider controls");

const browserProjector = vm.runInNewContext(BROWSER_CONTROL_PROJECTOR_SOURCE);
equal(typeof browserProjector, "function", "browser projector evaluates to function");
equal(JSON.stringify(browserProjector(snapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1,
}))), JSON.stringify(create), "browser source matches module function");
equal(JSON.stringify(browserProjector(snapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1,
}, { protected: protectedB }))), JSON.stringify(create), "browser source is canary invariant");

equal(projectProviderControlSnapshot(snapshot("unknown-page")).stateClass, "refused", "unknown page refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), extra: true }).stateClass, "refused", "extra root field refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), fieldCount: 7 }).stateClass, "refused", "wrong field count refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), exactPage: false }).stateClass, "refused", "wrong page refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), protected: { ...protectedA, extra: "x" } }).stateClass, "refused", "extra protected field refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), controls: { ...emptyControls(), extra: 0 } }).stateClass, "refused", "extra control refused");
const missingControl = emptyControls(); delete missingControl.copy;
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), controls: missingControl }).stateClass, "refused", "missing control refused");
equal(projectProviderControlSnapshot(snapshot("resend-create", { create: -1 })).stateClass, "refused", "negative control refused");
equal(projectProviderControlSnapshot(snapshot("resend-create", { create: 2 })).stateClass, "refused", "duplicate control refused");
equal(projectProviderControlSnapshot(snapshot("resend-create", { create: 0.5 })).stateClass, "refused", "fractional control refused");
equal(projectProviderControlSnapshot(snapshot("resend-create", { create: "1" })).stateClass, "refused", "string control refused");
equal(projectProviderControlSnapshot(null).stateClass, "refused", "null refused");
equal(projectProviderControlSnapshot([]).stateClass, "refused", "array refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), controls: null }).stateClass, "refused", "null controls refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), protected: null }).stateClass, "refused", "null protected refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), schemaVersion: 2 }).stateClass, "refused", "wrong schema refused");
const pageMissing = snapshot("resend-create"); delete pageMissing.pageClass;
equal(projectProviderControlSnapshot(pageMissing).stateClass, "refused", "missing page refused");
equal(projectProviderControlSnapshot({ ...snapshot("resend-create"), protected: { ...protectedA, identity: 1 } }).stateClass, "refused", "non-string identity refused");
equal(projectProviderControlSnapshot(snapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1,
})).controlClass, "not-ready", "create without dismiss not ready");
equal(projectProviderControlSnapshot(snapshot("resend-create", {
  keyName: 1, sendingAccess: 1, expectedDomain: 1, create: 1, copy: 1, dismiss: 1, deleteMenu: 1,
})).controlClass, "not-ready", "create with delete spillover not ready");
equal(projectProviderControlSnapshot(snapshot("resend-delete", {
  deleteMenu: 1, deleteConfirm: 1,
})).controlClass, "not-ready", "delete without cancel not ready");
equal(projectProviderControlSnapshot(snapshot("resend-delete", {
  deleteMenu: 1, deleteConfirm: 1, deleteCancel: 1, create: 1,
})).controlClass, "not-ready", "delete with create spillover not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  productionTarget: 1, blankBranch: 1, sensitive: 1, paste: 1, save: 1, navigate: 1,
})).controlClass, "not-ready", "Vercel without project not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, blankBranch: 1, sensitive: 1, paste: 1, save: 1, navigate: 1,
})).controlClass, "not-ready", "Vercel without Production not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, sensitive: 1, paste: 1, save: 1, navigate: 1,
})).controlClass, "not-ready", "Vercel without blank branch not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, paste: 1, save: 1, navigate: 1,
})).controlClass, "not-ready", "Vercel without Sensitive not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, sensitive: 1, save: 1, navigate: 1,
})).controlClass, "not-ready", "Vercel without paste not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, sensitive: 1, paste: 1, navigate: 1,
})).controlClass, "not-ready", "Vercel without save not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, sensitive: 1, paste: 1, save: 1,
})).controlClass, "not-ready", "Vercel without navigation not ready");
equal(projectProviderControlSnapshot(snapshot("vercel-sensitive-form", {
  exactProject: 1, productionTarget: 1, blankBranch: 1, sensitive: 1, paste: 1, save: 1, navigate: 1, clearClipboard: 1,
})).controlClass, "not-ready", "Vercel with clear spillover not ready");
equal(projectProviderControlSnapshot(snapshot("clipboard-clear")).controlClass, "not-ready", "clipboard without clear not ready");
equal(projectProviderControlSnapshot(snapshot("clipboard-clear", { clearClipboard: 1, save: 1 })).controlClass, "not-ready", "clipboard with save spillover not ready");
equal(projectProviderControlSnapshot(snapshot("unknown-controls", { create: 1 })).controlClass, "refused", "unknown control page fixed refusal");
equal(Object.keys(projectProviderControlSnapshot(null)).length, CONTROL_PROJECTION_FIELD_COUNT, "refused schema field count fixed");

if (assertions !== 80) throw new Error(`Sprint 029T provider-control assertion target changed: ${assertions}/80`);
console.log(`Sprint 029T identity-blind provider-control tests passed (${assertions}/${assertions}).`);
