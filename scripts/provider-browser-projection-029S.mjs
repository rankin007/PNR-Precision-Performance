export const PROJECTION_NAME = "provider-browser-029S";

export const PROJECTION_KEYS = Object.freeze([
  "projection",
  "fieldCount",
  "stateClass",
  "pageClass",
  "exactPage",
  "verifiedDomainCount",
  "sendingAccessKeyCount",
  "fullAccessKeyCount",
  "targetKeyCount",
  "rawSecretShapeCount",
  "dedicatedSmtpRowCount",
  "temporaryAuthRowCount",
  "genericSmtpRowCount",
  "genericMetadataClass",
  "productionOnlyRowCount",
  "blankBranchRowCount",
  "sensitiveRowCount",
  "aliasCount",
  "acceptedAliasTargetCount",
  "readyDeploymentCount",
  "zeroAliasDeploymentCount",
  "createControlCount",
  "copyControlCount",
  "pasteControlCount",
  "saveControlCount",
  "dismissControlCount",
  "clearControlCount",
  "controlClass",
]);

export const PROJECTION_FIELD_COUNT = PROJECTION_KEYS.length;

export function projectProviderSnapshot(snapshot) {
  const projectionName = "provider-browser-029S";
  const outputFieldCount = 28;
  const pageClasses = new Set([
    "resend-domain",
    "resend-keys",
    "resend-create",
    "vercel-environment",
    "vercel-sensitive-form",
    "vercel-deployment",
    "vercel-aliases",
  ]);
  const rootKeys = [
    "schemaVersion", "pageClass", "exactPage", "fieldCount", "protected", "domains", "keys",
    "environmentRows", "aliases", "deployments", "controls",
  ];
  const dedicatedClasses = new Set(["dedicated-host", "dedicated-port", "dedicated-user", "dedicated-pass"]);
  const temporaryClasses = new Set(["temporary-sha", "temporary-not-before", "temporary-expires"]);
  const genericClasses = new Set(["generic-host", "generic-port", "generic-user", "generic-pass", "generic-from"]);

  const exactKeys = (value, keys) => Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
  const integer = (value) => Number.isInteger(value) && value >= 0;
  const base = (stateClass = "refused", pageClass = "refused", exactPage = false) => ({
    projection: projectionName,
    fieldCount: outputFieldCount,
    stateClass,
    pageClass,
    exactPage,
    verifiedDomainCount: 0,
    sendingAccessKeyCount: 0,
    fullAccessKeyCount: 0,
    targetKeyCount: 0,
    rawSecretShapeCount: 0,
    dedicatedSmtpRowCount: 0,
    temporaryAuthRowCount: 0,
    genericSmtpRowCount: 0,
    genericMetadataClass: stateClass === "refused" ? "refused" : "not-applicable",
    productionOnlyRowCount: 0,
    blankBranchRowCount: 0,
    sensitiveRowCount: 0,
    aliasCount: 0,
    acceptedAliasTargetCount: 0,
    readyDeploymentCount: 0,
    zeroAliasDeploymentCount: 0,
    createControlCount: 0,
    copyControlCount: 0,
    pasteControlCount: 0,
    saveControlCount: 0,
    dismissControlCount: 0,
    clearControlCount: 0,
    controlClass: stateClass === "refused" ? "refused" : "not-applicable",
  });
  const refused = () => base();

  try {
    if (!exactKeys(snapshot, rootKeys) || snapshot.schemaVersion !== 1 || snapshot.fieldCount !== rootKeys.length
      || snapshot.exactPage !== true || !pageClasses.has(snapshot.pageClass)) return refused();
    if (!exactKeys(snapshot.protected, ["identity", "address", "token"])
      || Object.values(snapshot.protected).some((value) => typeof value !== "string")) return refused();
    if (![snapshot.domains, snapshot.keys, snapshot.environmentRows, snapshot.aliases, snapshot.deployments].every(Array.isArray)) return refused();
    if (!exactKeys(snapshot.controls, ["create", "copy", "paste", "save", "dismiss", "clear"])
      || Object.values(snapshot.controls).some((value) => !integer(value))) return refused();

    const output = base("accepted", snapshot.pageClass, true);
    output.rawSecretShapeCount = /^re_[A-Za-z0-9_-]{16,}$/.test(snapshot.protected.token) ? 1 : 0;

    for (const row of snapshot.domains) {
      if (!exactKeys(row, ["nameClass", "statusClass"])
        || !["expected", "other"].includes(row.nameClass)
        || !["verified", "pending"].includes(row.statusClass)) return refused();
      if (row.nameClass === "expected" && row.statusClass === "verified") output.verifiedDomainCount += 1;
    }
    if (output.verifiedDomainCount > 1) return refused();

    for (const row of snapshot.keys) {
      if (!exactKeys(row, ["nameClass", "accessClass", "domainClass", "secretClass"])
        || !["target", "other"].includes(row.nameClass)
        || !["sending", "full"].includes(row.accessClass)
        || !["expected", "other"].includes(row.domainClass)
        || !["masked", "absent", "raw"].includes(row.secretClass)) return refused();
      if (row.accessClass === "sending") output.sendingAccessKeyCount += 1;
      if (row.accessClass === "full") output.fullAccessKeyCount += 1;
      if (row.nameClass === "target") output.targetKeyCount += 1;
      if (row.secretClass === "raw") output.rawSecretShapeCount += 1;
    }
    if (output.targetKeyCount > 1) return refused();

    const environmentClassCounts = new Map();
    for (const row of snapshot.environmentRows) {
      if (!exactKeys(row, ["nameClass", "targetClass", "branchClass", "sensitive"])
        || ![...dedicatedClasses, ...temporaryClasses, ...genericClasses, "other"].includes(row.nameClass)
        || !["production", "other"].includes(row.targetClass)
        || !["blank", "scoped"].includes(row.branchClass)
        || typeof row.sensitive !== "boolean") return refused();
      environmentClassCounts.set(row.nameClass, (environmentClassCounts.get(row.nameClass) ?? 0) + 1);
      if (dedicatedClasses.has(row.nameClass)) output.dedicatedSmtpRowCount += 1;
      if (temporaryClasses.has(row.nameClass)) output.temporaryAuthRowCount += 1;
      if (genericClasses.has(row.nameClass)) output.genericSmtpRowCount += 1;
      if (row.targetClass === "production") output.productionOnlyRowCount += 1;
      if (row.branchClass === "blank") output.blankBranchRowCount += 1;
      if (row.sensitive) output.sensitiveRowCount += 1;
    }
    if ([...dedicatedClasses, ...temporaryClasses, ...genericClasses].some((name) => (environmentClassCounts.get(name) ?? 0) > 1)) return refused();
    if (![0, 4].includes(output.dedicatedSmtpRowCount) || ![0, 3].includes(output.temporaryAuthRowCount)
      || ![0, 5].includes(output.genericSmtpRowCount)) return refused();
    if (snapshot.pageClass === "vercel-environment") {
      output.genericMetadataClass = output.genericSmtpRowCount === 5 ? "exact" : "mismatch";
    }

    for (const row of snapshot.aliases) {
      if (!exactKeys(row, ["aliasClass", "targetClass"])
        || !["expected", "other"].includes(row.aliasClass)
        || !["accepted", "other"].includes(row.targetClass)) return refused();
      output.aliasCount += 1;
      if (row.aliasClass === "expected" && row.targetClass === "accepted") output.acceptedAliasTargetCount += 1;
    }

    for (const row of snapshot.deployments) {
      if (!exactKeys(row, ["targetClass", "readinessClass", "aliasCount"])
        || !["production", "other"].includes(row.targetClass)
        || !["ready", "other"].includes(row.readinessClass)
        || !integer(row.aliasCount)) return refused();
      if (row.targetClass === "production" && row.readinessClass === "ready") output.readyDeploymentCount += 1;
      if (row.targetClass === "production" && row.readinessClass === "ready" && row.aliasCount === 0) output.zeroAliasDeploymentCount += 1;
    }

    output.createControlCount = snapshot.controls.create;
    output.copyControlCount = snapshot.controls.copy;
    output.pasteControlCount = snapshot.controls.paste;
    output.saveControlCount = snapshot.controls.save;
    output.dismissControlCount = snapshot.controls.dismiss;
    output.clearControlCount = snapshot.controls.clear;
    if (snapshot.pageClass === "resend-create") {
      output.controlClass = snapshot.controls.create === 1 && snapshot.controls.copy === 1
        && snapshot.controls.paste === 0 && snapshot.controls.save === 0
        && snapshot.controls.dismiss === 1 && snapshot.controls.clear === 1 ? "ready" : "not-ready";
    } else if (snapshot.pageClass === "vercel-sensitive-form") {
      output.controlClass = snapshot.controls.create === 0 && snapshot.controls.copy === 0
        && snapshot.controls.paste === 1 && snapshot.controls.save === 1
        && snapshot.controls.dismiss === 0 && snapshot.controls.clear === 1 ? "ready" : "not-ready";
    }
    return output;
  } catch {
    return refused();
  }
}

export const BROWSER_PROJECTOR_SOURCE = `(${projectProviderSnapshot.toString()})`;
