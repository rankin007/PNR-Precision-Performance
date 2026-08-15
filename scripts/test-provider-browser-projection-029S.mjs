import assert from "node:assert/strict";
import vm from "node:vm";
import {
  BROWSER_PROJECTOR_SOURCE,
  PROJECTION_FIELD_COUNT,
  PROJECTION_KEYS,
  PROJECTION_NAME,
  projectProviderSnapshot,
} from "./provider-browser-projection-029S.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };

const protectedA = {
  identity: "Synthetic Account Alpha",
  address: ["alpha", "example.com"].join("@"),
  token: ["re", "syntheticprotectedtokenalpha12345"].join("_"),
};
const protectedB = {
  identity: "Synthetic Account Beta",
  address: ["beta", "example.net"].join("@"),
  token: ["re", "syntheticprotectedtokenbeta67890"].join("_"),
};

function snapshot(pageClass, overrides = {}) {
  return {
    schemaVersion: 1,
    pageClass,
    exactPage: true,
    fieldCount: 11,
    protected: protectedA,
    domains: [],
    keys: [],
    environmentRows: [],
    aliases: [],
    deployments: [],
    controls: { create: 0, copy: 0, paste: 0, save: 0, dismiss: 0, clear: 0 },
    ...overrides,
  };
}

equal(PROJECTION_NAME, "provider-browser-029S", "projection name fixed");
equal(PROJECTION_KEYS.length, PROJECTION_FIELD_COUNT, "field count constant exact");
equal(new Set(PROJECTION_KEYS).size, PROJECTION_FIELD_COUNT, "projection keys unique");
check(BROWSER_PROJECTOR_SOURCE.startsWith("(function projectProviderSnapshot"), "browser source is self-contained function");

const domain = projectProviderSnapshot(snapshot("resend-domain", {
  domains: [{ nameClass: "expected", statusClass: "verified" }],
}));
equal(Object.keys(domain).length, PROJECTION_FIELD_COUNT, "domain output field count exact");
deepEqual(Object.keys(domain), PROJECTION_KEYS, "domain output key order exact");
equal(domain.projection, PROJECTION_NAME, "domain projection name exact");
equal(domain.fieldCount, PROJECTION_FIELD_COUNT, "domain fieldCount exact");
equal(domain.stateClass, "accepted", "domain accepted");
equal(domain.pageClass, "resend-domain", "domain page class exact");
equal(domain.exactPage, true, "domain exact page true");
equal(domain.verifiedDomainCount, 1, "one verified domain");
equal(domain.rawSecretShapeCount, 1, "token-shaped canary reduced to one count");
equal(domain.sendingAccessKeyCount, 0, "domain has zero keys");
equal(domain.genericMetadataClass, "not-applicable", "domain metadata class finite");

const domainChanged = projectProviderSnapshot(snapshot("resend-domain", {
  protected: protectedB,
  domains: [{ nameClass: "expected", statusClass: "verified" }],
}));
deepEqual(domainChanged, domain, "protected canary changes do not change projection");
const serializedDomain = JSON.stringify(domain);
check(!serializedDomain.includes(protectedA.identity), "identity absent");
check(!serializedDomain.includes(protectedA.address), "address absent");
check(!serializedDomain.includes(protectedA.token), "token absent");
check(!serializedDomain.includes(protectedA.token.slice(-8)), "token fragment absent");

const keys = projectProviderSnapshot(snapshot("resend-keys", {
  protected: { identity: protectedA.identity, address: protectedA.address, token: "" },
  keys: [
    { nameClass: "other", accessClass: "sending", domainClass: "expected", secretClass: "masked" },
    { nameClass: "other", accessClass: "sending", domainClass: "expected", secretClass: "masked" },
  ],
}));
equal(keys.stateClass, "accepted", "keys accepted");
equal(keys.sendingAccessKeyCount, 2, "two sending keys");
equal(keys.fullAccessKeyCount, 0, "zero full keys");
equal(keys.targetKeyCount, 0, "zero target key");
equal(keys.rawSecretShapeCount, 0, "masked keys contain no raw secret shape");

const targetKey = projectProviderSnapshot(snapshot("resend-keys", {
  protected: { identity: "", address: "", token: "" },
  keys: [{ nameClass: "target", accessClass: "sending", domainClass: "expected", secretClass: "masked" }],
}));
equal(targetKey.targetKeyCount, 1, "single target key counted");
equal(targetKey.sendingAccessKeyCount, 1, "target sending class counted");

const environment = projectProviderSnapshot(snapshot("vercel-environment", {
  environmentRows: [
    { nameClass: "dedicated-host", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "dedicated-port", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "dedicated-user", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "dedicated-pass", targetClass: "production", branchClass: "blank", sensitive: true },
    { nameClass: "temporary-sha", targetClass: "production", branchClass: "blank", sensitive: true },
    { nameClass: "temporary-not-before", targetClass: "production", branchClass: "blank", sensitive: true },
    { nameClass: "temporary-expires", targetClass: "production", branchClass: "blank", sensitive: true },
    { nameClass: "generic-host", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "generic-port", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "generic-user", targetClass: "production", branchClass: "blank", sensitive: false },
    { nameClass: "generic-pass", targetClass: "production", branchClass: "blank", sensitive: true },
    { nameClass: "generic-from", targetClass: "production", branchClass: "blank", sensitive: false },
  ],
}));
equal(environment.stateClass, "accepted", "environment accepted");
equal(environment.dedicatedSmtpRowCount, 4, "four dedicated rows");
equal(environment.temporaryAuthRowCount, 3, "three temporary rows");
equal(environment.genericSmtpRowCount, 5, "five generic rows");
equal(environment.genericMetadataClass, "exact", "generic metadata exact");
equal(environment.productionOnlyRowCount, 12, "all projected rows Production only");
equal(environment.blankBranchRowCount, 12, "all projected rows blank branch");
equal(environment.sensitiveRowCount, 5, "sensitive rows counted");

const aliases = projectProviderSnapshot(snapshot("vercel-aliases", {
  aliases: Array.from({ length: 5 }, () => ({ aliasClass: "expected", targetClass: "accepted" })),
}));
equal(aliases.aliasCount, 5, "five aliases counted");
equal(aliases.acceptedAliasTargetCount, 5, "five accepted targets counted");

const deployment = projectProviderSnapshot(snapshot("vercel-deployment", {
  deployments: [{ targetClass: "production", readinessClass: "ready", aliasCount: 0 }],
}));
equal(deployment.readyDeploymentCount, 1, "one Ready deployment");
equal(deployment.zeroAliasDeploymentCount, 1, "one zero-alias deployment");

const resendControls = projectProviderSnapshot(snapshot("resend-create", {
  controls: { create: 1, copy: 1, paste: 0, save: 0, dismiss: 1, clear: 1 },
}));
equal(resendControls.controlClass, "ready", "Resend controls ready");
equal(resendControls.createControlCount, 1, "create control exact");
equal(resendControls.copyControlCount, 1, "copy control exact");
equal(resendControls.dismissControlCount, 1, "dismiss control exact");
equal(resendControls.clearControlCount, 1, "clear control exact");

const vercelControls = projectProviderSnapshot(snapshot("vercel-sensitive-form", {
  controls: { create: 0, copy: 0, paste: 1, save: 1, dismiss: 0, clear: 1 },
}));
equal(vercelControls.controlClass, "ready", "Vercel controls ready");
equal(vercelControls.pasteControlCount, 1, "paste control exact");
equal(vercelControls.saveControlCount, 1, "save control exact");

const browserProjector = vm.runInNewContext(BROWSER_PROJECTOR_SOURCE);
equal(JSON.stringify(browserProjector(snapshot("resend-domain", { domains: [{ nameClass: "expected", statusClass: "verified" }] }))), JSON.stringify(domain), "tested browser source matches module function");

const refusedUnknownPage = projectProviderSnapshot(snapshot("unknown-page"));
equal(refusedUnknownPage.stateClass, "refused", "unknown page refused");
equal(refusedUnknownPage.pageClass, "refused", "unknown page detail not returned");
equal(Object.keys(refusedUnknownPage).length, PROJECTION_FIELD_COUNT, "refused schema fixed");
equal(projectProviderSnapshot({ ...snapshot("resend-domain"), unexpected: true }).stateClass, "refused", "unknown root field refused");
equal(projectProviderSnapshot({ ...snapshot("resend-domain"), fieldCount: 12 }).stateClass, "refused", "unexpected field count refused");
equal(projectProviderSnapshot({ ...snapshot("resend-domain"), exactPage: false }).stateClass, "refused", "wrong page refused");
equal(projectProviderSnapshot({ ...snapshot("resend-domain"), protected: { ...protectedA, extra: "x" } }).stateClass, "refused", "unknown protected field refused");
equal(projectProviderSnapshot(snapshot("resend-keys", { keys: [{ nameClass: "other", accessClass: "owner", domainClass: "expected", secretClass: "masked" }] })).stateClass, "refused", "unknown access class refused");
equal(projectProviderSnapshot(snapshot("resend-keys", { keys: [
  { nameClass: "target", accessClass: "sending", domainClass: "expected", secretClass: "masked" },
  { nameClass: "target", accessClass: "sending", domainClass: "expected", secretClass: "masked" },
] })).stateClass, "refused", "duplicate target refused");
equal(projectProviderSnapshot(snapshot("vercel-environment", { environmentRows: [{ nameClass: "unknown", targetClass: "production", branchClass: "blank", sensitive: false }] })).stateClass, "refused", "unknown environment class refused");
equal(projectProviderSnapshot(snapshot("vercel-environment", { environmentRows: [{ nameClass: "generic-host", targetClass: "preview", branchClass: "blank", sensitive: false }] })).stateClass, "refused", "unexpected target class refused");
equal(projectProviderSnapshot(snapshot("vercel-aliases", { aliases: [{ aliasClass: "unexpected", targetClass: "accepted" }] })).stateClass, "refused", "unexpected alias class refused");
equal(projectProviderSnapshot(snapshot("vercel-deployment", { deployments: [{ targetClass: "production", readinessClass: "unknown", aliasCount: 0 }] })).stateClass, "refused", "unknown readiness refused");
equal(projectProviderSnapshot(snapshot("resend-create", { controls: { create: 2, copy: 1, paste: 0, save: 0, dismiss: 1, clear: 1 } })).controlClass, "not-ready", "duplicate control not ready");
equal(projectProviderSnapshot(null).stateClass, "refused", "null refused");
equal(projectProviderSnapshot([]).stateClass, "refused", "array refused");

if (assertions !== 64) throw new Error(`Sprint 029S provider projection assertion target changed: ${assertions}/64`);
console.log(`Sprint 029S identity-blind provider projection tests passed (${assertions}/${assertions}).`);
