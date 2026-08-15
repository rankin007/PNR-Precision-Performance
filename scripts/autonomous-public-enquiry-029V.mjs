#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import {
  CONTROL_PROJECTION_FIELD_COUNT,
  CONTROL_PROJECTION_KEYS,
  CONTROL_PROJECTION_NAME,
} from "./provider-browser-projection-029V.mjs";

export const PROJECT_ID = "prj_6To7czLpCEGL6fInkQwE4egePPpq";
export const BRANCH = "codex/029V-vercel-agent-envelope-and-alias-isolation-recovery";
export const START_SHA = "d822c027c58ad88ec7472e35986e7a33d6a3d6c9";
export const ACCEPTED_DEPLOYMENT = "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf";
export const INERT_029N_DEPLOYMENT = "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB";
export const INERT_029O_DEPLOYMENT = "dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq";
export const INERT_029S_PREVIEW = "dpl_7MTexxU6RecGHZvCE9BukUwZU6Hx";

export const ALIASES = Object.freeze([
  "precisionperformance.com.au",
  "www.precisionperformance.com.au",
  "pnr-precision-performance.vercel.app",
  "pnr-precision-performance-rankin007s-projects.vercel.app",
  "pnr-precision-performance-rankin007-rankin007s-projects.vercel.app",
]);

export const IMPLEMENTATION_FILES = Object.freeze([
  "scripts/PreflightAuth029V.ps1",
  "scripts/autonomous-public-enquiry-029V.mjs",
  "scripts/test-autonomous-public-enquiry-029V.mjs",
  "scripts/provider-browser-projection-029V.mjs",
  "scripts/test-provider-browser-projection-029V.mjs",
  "scripts/vercel-alias-isolation-projection-029V.mjs",
  "scripts/test-vercel-alias-isolation-projection-029V.mjs",
  "docs/PUBLIC_ENQUIRY_VERCEL_AGENT_ENVELOPE_AND_ALIAS_ISOLATION_029V.md",
  "package.json",
]);

export const INHERITED_DEPLOYMENT_FILES = Object.freeze([
  ".env.example",
  "app/api/enquiries/route.ts",
  "app/api/internal/enquiries/route.ts",
  "lib/enquiries/env.ts",
  "lib/enquiries/provider.ts",
  "lib/enquiries/preflight-auth.ts",
  "scripts/test-public-enquiry-029U.mjs",
  "scripts/PreflightAuth029U.ps1",
  "scripts/autonomous-public-enquiry-029U.mjs",
  "scripts/provider-browser-projection-029U.mjs",
]);

export const SCANNABLE_FILES = Object.freeze([...IMPLEMENTATION_FILES, ...INHERITED_DEPLOYMENT_FILES]);

const CANDIDATE_HOST = /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/;
const DEPLOYMENT_ID = /^dpl_[A-Za-z0-9]+$/;
const FAILURE_CODES = new Set([
  "MODE_REFUSED", "ORIGIN_REFUSED", "RESPONSE_REFUSED", "HTTP_REFUSED", "PRIVACY_REFUSED",
  "SCAN_REFUSED", "MANIFEST_REFUSED", "PROJECTION_REFUSED", "DEPLOYMENT_REFUSED",
  "CLI_VERSION_REFUSED", "SNAPSHOT_REFUSED", "RECONCILIATION_REFUSED", "SETTING_REFUSED",
]);

function fail(code) { throw Object.assign(new Error(code), { code }); }
function exactKeys(value, keys) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

export function sanitizeFailure(error) {
  return FAILURE_CODES.has(error?.code || error?.message) ? (error.code || error.message) : "UNEXPECTED";
}

export function validateCandidateOrigin(value) {
  if (typeof value !== "string" || value !== value.trim()) fail("ORIGIN_REFUSED");
  const raw = /^https:\/\/([^/?#]+)\/?$/.exec(value);
  if (!raw || raw[1].includes("@") || raw[1].includes(":")) fail("ORIGIN_REFUSED");
  let parsed;
  try { parsed = new URL(value); } catch { fail("ORIGIN_REFUSED"); }
  if (parsed.protocol !== "https:" || parsed.port || parsed.username || parsed.password
    || !CANDIDATE_HOST.test(parsed.hostname) || parsed.pathname !== "/" || parsed.search || parsed.hash) fail("ORIGIN_REFUSED");
  return parsed.origin;
}

export function validateVercelCliVersion(value) {
  if (value !== "50.42.0") fail("CLI_VERSION_REFUSED");
  return value;
}

function validateRawDeploymentObject(value) {
  if (!exactKeys(value, ["id", "url", "inspectorUrl", "readyState", "target", "deploymentApiUrl"])
    || typeof value.id !== "string" || !DEPLOYMENT_ID.test(value.id)
    || value.readyState !== "READY" || value.target !== "production"
    || !(value.inspectorUrl === null || (typeof value.inspectorUrl === "string" && value.inspectorUrl.startsWith("https://vercel.com/")))
    || value.deploymentApiUrl !== "https://api.vercel.com/v13/deployments/" + value.id) fail("DEPLOYMENT_REFUSED");
  let origin;
  try { origin = validateCandidateOrigin(value.url); } catch { fail("DEPLOYMENT_REFUSED"); }
  return { deploymentId: value.id, origin, host: new URL(origin).hostname };
}

export function validateDeploySuccess(value) {
  if (exactKeys(value, ["id", "url", "inspectorUrl", "readyState", "target", "deploymentApiUrl"])) {
    const deployment = validateRawDeploymentObject(value);
    return { form: "raw", ...deployment };
  }
  if (!exactKeys(value, ["status", "deployment", "message", "next"])
    || value.status !== "ok" || !Array.isArray(value.next) || value.next.length !== 2) fail("DEPLOYMENT_REFUSED");
  const deployment = validateRawDeploymentObject(value.deployment);
  const expectedNext = [
    { command: "vercel inspect " + deployment.host + " --no-color", when: "Inspect deployment" },
    { command: "vercel deploy --prod --no-color", when: "Promote to production" },
  ];
  if (value.message !== "Deployment " + deployment.host + " ready."
    || !value.next.every((entry, index) => exactKeys(entry, ["command", "when"])
      && entry.command === expectedNext[index].command && entry.when === expectedNext[index].when)) fail("DEPLOYMENT_REFUSED");
  return { form: "agent", ...deployment };
}

const SNAPSHOT_ROW_KEYS = Object.freeze(["deploymentId", "stateClass", "targetClass", "createdAt"]);
const ACTIVE_DEPLOYMENT_STATES = new Set(["BUILDING", "INITIALIZING", "QUEUED"]);
const TERMINAL_DEPLOYMENT_STATES = new Set(["READY", "ERROR", "CANCELED"]);

export function validateDeploymentInventory(rows) {
  if (!Array.isArray(rows) || rows.length > 200) fail("SNAPSHOT_REFUSED");
  const ids = new Set();
  let activeCount = 0;
  for (const row of rows) {
    if (!exactKeys(row, SNAPSHOT_ROW_KEYS)
      || typeof row.deploymentId !== "string" || !DEPLOYMENT_ID.test(row.deploymentId)
      || ![...ACTIVE_DEPLOYMENT_STATES, ...TERMINAL_DEPLOYMENT_STATES].includes(row.stateClass)
      || !["production", "preview"].includes(row.targetClass)
      || !Number.isSafeInteger(row.createdAt) || row.createdAt < 0
      || ids.has(row.deploymentId)) fail("SNAPSHOT_REFUSED");
    ids.add(row.deploymentId);
    if (ACTIVE_DEPLOYMENT_STATES.has(row.stateClass)) activeCount += 1;
  }
  return { rowCount: rows.length, activeCount, ids: [...ids] };
}

export function validateStableDeploymentWalk(value) {
  if (!exactKeys(value, ["pages", "restartCount", "firstHead", "revalidatedHead", "rows"])
    || !Number.isInteger(value.pages) || value.pages < 1 || value.pages > 10
    || ![0, 1].includes(value.restartCount)
    || !Array.isArray(value.firstHead) || value.firstHead.length > 20
    || !Array.isArray(value.revalidatedHead) || value.revalidatedHead.length > 20
    || JSON.stringify(value.firstHead) !== JSON.stringify(value.revalidatedHead)) fail("SNAPSHOT_REFUSED");
  const inventory = validateDeploymentInventory(value.rows);
  return { ...inventory, pages: value.pages, restartCount: value.restartCount, headStable: true };
}

export function classifyDeploymentReconciliation(value) {
  if (!exactKeys(value, [
    "deployInvocationStarted", "observationCounts", "ownedCandidateCount",
    "ownedCandidateExact", "cleanupAttempted", "cleanupResidue",
  ]) || typeof value.deployInvocationStarted !== "boolean"
    || !Array.isArray(value.observationCounts)
    || value.observationCounts.some((count) => !Number.isInteger(count) || count < 0 || count > 2)
    || !Number.isInteger(value.ownedCandidateCount) || value.ownedCandidateCount < 0 || value.ownedCandidateCount > 2
    || typeof value.ownedCandidateExact !== "boolean"
    || typeof value.cleanupAttempted !== "boolean"
    || !Number.isInteger(value.cleanupResidue) || value.cleanupResidue < 0 || value.cleanupResidue > 2) fail("RECONCILIATION_REFUSED");

  if (!value.deployInvocationStarted) {
    if (value.observationCounts.length !== 1 || value.observationCounts[0] !== 0
      || value.ownedCandidateCount !== 0 || value.ownedCandidateExact
      || value.cleanupAttempted || value.cleanupResidue !== 0) fail("RECONCILIATION_REFUSED");
    return { outcomeClass: "known-no-creation-zero-residue", terminalClass: "blocked-clean" };
  }

  if (value.observationCounts.length !== 3) fail("RECONCILIATION_REFUSED");
  if (value.ownedCandidateCount !== 1 || !value.ownedCandidateExact) {
    return { outcomeClass: "ambiguous-creation", terminalClass: "blocked-material" };
  }
  if (!value.cleanupAttempted) {
    return { outcomeClass: "owned-candidate-retained", terminalClass: "continue" };
  }
  return value.cleanupResidue === 0
    ? { outcomeClass: "owned-candidate-removed-zero-residue", terminalClass: "blocked-clean" }
    : { outcomeClass: "owned-candidate-cleanup-residue", terminalClass: "blocked-material" };
}
export function validateControlProjection(value, pageClass) {
  if (!exactKeys(value, CONTROL_PROJECTION_KEYS)
    || value.projection !== CONTROL_PROJECTION_NAME
    || value.fieldCount !== CONTROL_PROJECTION_FIELD_COUNT
    || value.stateClass !== "accepted" || value.pageClass !== pageClass
    || value.exactPage !== true || value.controlClass !== "ready") fail("PROJECTION_REFUSED");
  return { pageClass, controlClass: "ready", rawSecretShapeCount: value.rawSecretShapeCount };
}

const BASELINE_KEYS = Object.freeze([
  "controller", "operation", "state", "projectClass", "dedicatedSmtpRowCount",
  "temporaryAuthRowCount", "activationRowCount", "genericSmtpRowCount", "credentialState", "sprintDeploymentCount",
  "retainedPreviewClass", "retainedPreviewAliasCount", "priorCandidateCount",
  "priorCandidateAliasCount", "acceptedDeploymentClass", "acceptedAliasTargetCount",
]);

export function validateBaselineProjection(value) {
  if (!exactKeys(value, BASELINE_KEYS)
    || value.controller !== "029V" || value.operation !== "baseline" || value.state !== "pass"
    || value.projectClass !== "exact" || value.dedicatedSmtpRowCount !== 0
    || value.temporaryAuthRowCount !== 0 || value.activationRowCount !== 0 || value.genericSmtpRowCount !== 5
    || value.credentialState !== "absent" || value.sprintDeploymentCount !== 0
    || value.retainedPreviewClass !== "ready-preview-inert" || value.retainedPreviewAliasCount !== 0
    || value.priorCandidateCount !== 2 || value.priorCandidateAliasCount !== 0
    || value.acceptedDeploymentClass !== "ready" || value.acceptedAliasTargetCount !== 5) fail("PROJECTION_REFUSED");
  return { targetResourceCount: 0, acceptedAliasTargetCount: 5, historicalDeploymentCount: 3 };
}

const SELF_TEST_KEYS = Object.freeze([
  "controller", "operation", "state", "allowedVectorCount", "refusedVectorCount", "lostArgsCount",
  "safeArgsCount", "processTransferArgCount", "processTransferState", "genericProductionIncludingCount",
  "activationRowCount", "ownedScopeRefusalCount", "ownedSensitivityRefusalCount", "missingTypeRefusalCount",
  "aliasInventoryFixtureCount", "aliasTruncationRefusalCount", "jsonShapeRefusalCount",
  "deploymentTargetRefusalCount", "baselineFixturePassCount", "baselineFailureCodeCount",
  "cliVersionFixturePassCount", "agentEnvelopeFixturePassCount", "agentEnvelopeRefusalCount",
  "paginationFixturePassCount", "paginationRefusalCount", "protectedInventoryRefusalCount",
  "phaseFixturePassCount", "phaseRefusalCount", "originBindingPassCount", "originMismatchRefusalCount",
  "originMismatchRequestCount", "originMismatchBearerExposureCount", "runnerResidue",
]);

export function validateControllerSelfTest(value) {
  if (!exactKeys(value, SELF_TEST_KEYS)
    || value.controller !== "029V" || value.operation !== "self-test" || value.state !== "pass"
    || value.allowedVectorCount !== 25 || value.refusedVectorCount !== 16
    || value.lostArgsCount !== 0 || value.safeArgsCount !== 4
    || value.processTransferArgCount !== 4 || value.processTransferState !== "pass"
    || value.genericProductionIncludingCount !== 5 || value.activationRowCount !== 0
    || value.ownedScopeRefusalCount !== 2 || value.ownedSensitivityRefusalCount !== 3
    || value.missingTypeRefusalCount !== 1 || value.aliasInventoryFixtureCount !== 5
    || value.aliasTruncationRefusalCount !== 1 || value.jsonShapeRefusalCount !== 6
    || value.deploymentTargetRefusalCount !== 3 || value.baselineFixturePassCount !== 1
    || value.baselineFailureCodeCount !== 8 || value.cliVersionFixturePassCount !== 1
    || value.agentEnvelopeFixturePassCount !== 1 || value.agentEnvelopeRefusalCount !== 7
    || value.paginationFixturePassCount !== 1 || value.paginationRefusalCount !== 2
    || value.protectedInventoryRefusalCount !== 2 || value.phaseFixturePassCount !== 1
    || value.phaseRefusalCount !== 4 || value.originBindingPassCount !== 1
    || value.originMismatchRefusalCount !== 1 || value.originMismatchRequestCount !== 0
    || value.originMismatchBearerExposureCount !== 0 || value.runnerResidue !== 0) fail("PROJECTION_REFUSED");
  return { state: "pass", sensitivityRefusalCount: 4, activationRowCount: 0 };
}

const PRIVATE_PASSWORD_KEYS = Object.freeze([
  "controller", "operation", "state", "dedicatedSmtpRowCount", "temporaryAuthRowCount",
  "activationRowCount", "genericSmtpRowCount", "passwordSensitivityClass",
  "sprintDeploymentCount", "acceptedAliasTargetCount",
]);

export function validatePrivatePasswordProjection(value) {
  if (!exactKeys(value, PRIVATE_PASSWORD_KEYS)
    || value.controller !== "029V" || value.operation !== "accept-private-password-baseline" || value.state !== "pass"
    || value.dedicatedSmtpRowCount !== 1 || value.temporaryAuthRowCount !== 0 || value.activationRowCount !== 0
    || value.genericSmtpRowCount !== 5 || value.passwordSensitivityClass !== "exact-sensitive-production"
    || value.sprintDeploymentCount !== 0 || value.acceptedAliasTargetCount !== 5) fail("PROJECTION_REFUSED");
  return { dedicatedSmtpRowCount: 1, sensitivityClass: "exact-sensitive-production" };
}

const STRUCTURAL_KEYS = Object.freeze([
  "controller", "operation", "state", "dedicatedSmtpRowCount", "temporaryAuthRowCount",
  "activationRowCount", "sensitivityClass",
]);

export function validateStructuralProjection(value) {
  if (!exactKeys(value, STRUCTURAL_KEYS)
    || value.controller !== "029V" || value.operation !== "add-structural-smtp" || value.state !== "pass"
    || value.dedicatedSmtpRowCount !== 4 || value.temporaryAuthRowCount !== 0 || value.activationRowCount !== 0
    || value.sensitivityClass !== "all-exact-sensitive-production") fail("PROJECTION_REFUSED");
  return { dedicatedSmtpRowCount: 4, sensitivityClass: value.sensitivityClass };
}

const PROVISION_KEYS = Object.freeze([
  "controller", "operation", "state", "bindingCount", "windowClass", "credentialState",
  "activationRowCount", "sensitivityClass",
]);

export function validateProvisionProjection(value) {
  if (!exactKeys(value, PROVISION_KEYS)
    || value.controller !== "029V" || value.operation !== "provision" || value.state !== "pass"
    || value.bindingCount !== 3 || value.windowClass !== "bounded" || value.credentialState !== "present"
    || value.activationRowCount !== 0 || value.sensitivityClass !== "all-seven-exact-sensitive-production") fail("PROJECTION_REFUSED");
  return { bindingCount: 3, sensitivityClass: value.sensitivityClass };
}

const PUBLIC_GATE_KEYS = Object.freeze([
  "controller", "operation", "state", "requestCount", "httpClass", "responseClass", "productActionCount",
]);

export function validatePublicGateProjection(value) {
  if (!exactKeys(value, PUBLIC_GATE_KEYS)
    || value.controller !== "029V" || value.operation !== "verify-public-gate" || value.state !== "pass"
    || value.requestCount !== 1 || value.httpClass !== "service-unavailable"
    || value.responseClass !== "sanitized" || value.productActionCount !== 0) fail("PROJECTION_REFUSED");
  return { requestCount: 1, productActionCount: 0 };
}

const DEPLOYMENT_KEYS = Object.freeze([
  "controller", "operation", "state", "deploymentId", "targetClass", "readinessClass",
  "aliasCount", "metadataClass", "sourceClass", "candidateOrigin", "responseForm",
  "reconciliationObservationCount", "fullDeploymentDeltaCount",
]);

export function validateDeploymentProjection(value) {
  if (!exactKeys(value, DEPLOYMENT_KEYS)
    || value.controller !== "029V" || value.operation !== "deploy" || value.state !== "pass"
    || !DEPLOYMENT_ID.test(value.deploymentId) || value.targetClass !== "production"
    || value.readinessClass !== "ready" || value.aliasCount !== 0
    || value.metadataClass !== "exact-029V" || value.sourceClass !== "exact-canonical"
    || typeof value.candidateOrigin !== "string" || (() => { try { return validateCandidateOrigin(value.candidateOrigin) !== value.candidateOrigin; } catch { return true; } })()
    || !["raw", "agent"].includes(value.responseForm)
    || value.reconciliationObservationCount !== 3 || value.fullDeploymentDeltaCount !== 1) fail("DEPLOYMENT_REFUSED");
  return { deploymentId: value.deploymentId, aliasCount: 0, targetClass: "production", candidateOrigin: value.candidateOrigin, responseForm: value.responseForm };
}

const INVENTORY_KEYS = Object.freeze([
  "controller", "operation", "state", "deploymentCount", "activeDeploymentCount",
  "pageCount", "restartCount", "headStable", "rows",
]);

export function validateInventoryProjection(value) {
  if (!exactKeys(value, INVENTORY_KEYS)
    || value.controller !== "029V" || value.operation !== "inventory" || value.state !== "pass"
    || !Number.isInteger(value.deploymentCount) || value.deploymentCount < 0 || value.deploymentCount > 200
    || !Number.isInteger(value.activeDeploymentCount) || value.activeDeploymentCount < 0
    || !Number.isInteger(value.pageCount) || value.pageCount < 1 || value.pageCount > 10
    || ![0, 1].includes(value.restartCount) || value.headStable !== true) fail("SNAPSHOT_REFUSED");
  const inventory = validateDeploymentInventory(value.rows);
  if (inventory.rowCount !== value.deploymentCount || inventory.activeCount !== value.activeDeploymentCount) fail("SNAPSHOT_REFUSED");
  return { ...inventory, pageCount: value.pageCount, restartCount: value.restartCount, headStable: true };
}

export function validateAllowedInspectId(value, newDeploymentId = null) {
  const fixed = new Set([ACCEPTED_DEPLOYMENT, INERT_029N_DEPLOYMENT, INERT_029O_DEPLOYMENT, INERT_029S_PREVIEW]);
  if (newDeploymentId !== null) {
    if (!DEPLOYMENT_ID.test(newDeploymentId)) fail("DEPLOYMENT_REFUSED");
    fixed.add(newDeploymentId);
  }
  if (!fixed.has(value)) fail("DEPLOYMENT_REFUSED");
  return value;
}

export function validateAliasInventory(rows) {
  if (!Array.isArray(rows) || rows.length !== ALIASES.length
    || new Set(rows.map((row) => row.alias)).size !== ALIASES.length) fail("RESPONSE_REFUSED");
  const projected = Object.fromEntries(rows.map((row) => [row.alias, row.deployment]));
  if (ALIASES.some((alias) => projected[alias] !== ACCEPTED_DEPLOYMENT)) fail("RESPONSE_REFUSED");
  return { aliasCount: 5, targetCount: 5, otherCount: 0 };
}

export function validateHistoricalContainment(rows) {
  if (!Array.isArray(rows) || rows.length !== 3) fail("RESPONSE_REFUSED");
  const expected = new Map([
    [INERT_029N_DEPLOYMENT, "ready-production-inert"],
    [INERT_029O_DEPLOYMENT, "ready-production-inert"],
    [INERT_029S_PREVIEW, "ready-preview-inert"],
  ]);
  for (const row of rows) {
    if (!exactKeys(row, ["deploymentId", "stateClass", "aliasCount"])
      || expected.get(row.deploymentId) !== row.stateClass || row.aliasCount !== 0) fail("RESPONSE_REFUSED");
    expected.delete(row.deploymentId);
  }
  if (expected.size !== 0) fail("RESPONSE_REFUSED");
  return { deploymentCount: 3, aliasCount: 0, previewCount: 1 };
}

export function countProtectedMatches(source) {
  const allowed = String(source)
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.invalid/gi, "")
    .replace(/smtp\.resend\.com/gi, "");
  const patterns = [
    /\bre_[A-Za-z0-9_-]{16,}\b/gi,
    /\b(?:sk|pk)_(?:live|test)_[A-Za-z0-9_-]{16,}\b/gi,
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    /eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{8,}/g,
  ];
  return patterns.reduce((count, pattern) => count + [...allowed.matchAll(pattern)].length, 0);
}

export function validateScanPaths(paths) {
  if (!Array.isArray(paths) || paths.length === 0 || new Set(paths).size !== paths.length
    || paths.some((path) => !SCANNABLE_FILES.includes(path))) fail("SCAN_REFUSED");
  return [...paths];
}

export function scanFiles(paths) {
  const approved = validateScanPaths(paths);
  const flaggedFiles = [];
  let aggregateCount = 0;
  for (const path of approved) {
    const count = countProtectedMatches(readFileSync(path, "utf8"));
    if (count > 0) flaggedFiles.push(path);
    aggregateCount += count;
  }
  return {
    scan: "029V",
    status: aggregateCount === 0 ? "clean" : "contained",
    aggregateCount,
    fileCount: approved.length,
    ...(flaggedFiles.length ? { flaggedFiles } : {}),
  };
}

export function manifestFiles(paths) {
  const approved = validateScanPaths(paths);
  const scan = scanFiles(approved);
  if (scan.aggregateCount !== 0) fail("MANIFEST_REFUSED");
  return {
    manifest: "029V",
    fileCount: approved.length,
    files: approved.map((path) => ({ path, sha256: createHash("sha256").update(readFileSync(path)).digest("hex") })),
  };
}

export async function immutableCandidate(originValue, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  const checks = [
    ["/", 200, "Request a Stable Trial"],
    ["/pricing", 200, "does not create an order"],
    ["/privacy", 200, "Public stable-trial enquiries"],
    ["/disclaimer", 200, "Information supports professional judgement"],
    ["/sign-in", 200, "Sign"],
  ];
  for (const [path, status, marker] of checks) {
    const response = await fetcher(`${origin}${path}`, { redirect: "manual", headers: { "cache-control": "no-cache" } });
    if (response.status !== status || !(await response.text()).includes(marker)) fail("HTTP_REFUSED");
  }
  for (const path of ["/portal", "/admin", "/data-entry"]) {
    const response = await fetcher(`${origin}${path}`, { redirect: "manual", headers: { "cache-control": "no-cache" } });
    if (![307, 308].includes(response.status) || !response.headers.get("location")?.includes("/sign-in")) fail("HTTP_REFUSED");
  }
  const checkout = await fetcher(`${origin}/api/checkout`, { method: "GET", redirect: "manual" });
  if (checkout.status !== 405) fail("HTTP_REFUSED");
  return { state: "immutable-passed", publicRoutes: 5, protectedDenied: 3, apiMethodDenied: 1, commerceDisabled: true };
}

export function parseCli(argv) {
  const mode = argv[2];
  if (mode === "immutable" && argv.length === 5 && argv[3] === "--origin") return { mode, origin: argv[4] };
  if (["scan", "manifest"].includes(mode) && argv.length > 4 && argv[3] === "--files") {
    return { mode, files: validateScanPaths(argv.slice(4)) };
  }
  fail("MODE_REFUSED");
}

async function runCli(options) {
  if (options.mode === "immutable") return immutableCandidate(options.origin);
  if (options.mode === "scan") return scanFiles(options.files);
  if (options.mode === "manifest") return manifestFiles(options.files);
  fail("MODE_REFUSED");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve().then(() => parseCli(process.argv)).then(runCli).then((result) => {
    process.stdout.write(`${JSON.stringify(result)}\n`);
  }).catch((error) => {
    process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`);
    process.exitCode = 2;
  });
}
