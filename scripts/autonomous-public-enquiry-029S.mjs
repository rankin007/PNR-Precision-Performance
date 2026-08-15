#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { PROJECTION_FIELD_COUNT, PROJECTION_KEYS, PROJECTION_NAME } from "./provider-browser-projection-029S.mjs";

export const PROJECT_ID = "prj_6To7czLpCEGL6fInkQwE4egePPpq";
export const BRANCH = "codex/029S-preflight-origin-hardening-bounded-provider-projection-and-readiness-recovery";
export const START_SHA = "d822c027c58ad88ec7472e35986e7a33d6a3d6c9";
export const ROLLBACK_DEPLOYMENT = "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf";
export const INERT_029N_DEPLOYMENT = "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB";
export const INERT_029O_DEPLOYMENT = "dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq";
export const ALIASES = Object.freeze([
  "precisionperformance.com.au",
  "www.precisionperformance.com.au",
  "pnr-precision-performance.vercel.app",
  "pnr-precision-performance-rankin007s-projects.vercel.app",
  "pnr-precision-performance-rankin007-rankin007s-projects.vercel.app",
]);
export const SCANNABLE_FILES = Object.freeze([
  "scripts/PreflightAuth029S.ps1",
  "scripts/autonomous-public-enquiry-029S.mjs",
  "scripts/provider-browser-projection-029S.mjs",
  "scripts/test-autonomous-public-enquiry-029S.mjs",
  "scripts/test-provider-browser-projection-029S.mjs",
  "package.json",
  "docs/PUBLIC_ENQUIRY_PREFLIGHT_PRIVACY_AND_SMTP_READINESS_029S.md",
]);

const CANDIDATE_HOST = /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/;
const FAILURE_CODES = new Set([
  "MODE_REFUSED", "ORIGIN_REFUSED", "RESPONSE_REFUSED", "HTTP_REFUSED", "PRIVACY_REFUSED",
  "SCAN_REFUSED", "MANIFEST_REFUSED", "PROJECTION_REFUSED",
]);

function fail(code) { throw Object.assign(new Error(code), { code }); }
export function sanitizeFailure(error) { return FAILURE_CODES.has(error?.code || error?.message) ? (error.code || error.message) : "UNEXPECTED"; }

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

function assertProjection(value, pageClass) {
  if (!value || typeof value !== "object" || Array.isArray(value)
    || Object.keys(value).length !== PROJECTION_FIELD_COUNT
    || !PROJECTION_KEYS.every((key) => Object.hasOwn(value, key))
    || value.projection !== PROJECTION_NAME || value.fieldCount !== PROJECTION_FIELD_COUNT
    || value.stateClass !== "accepted" || value.pageClass !== pageClass || value.exactPage !== true) fail("PROJECTION_REFUSED");
  return value;
}

export function validateProviderBaselineProjection(domainValue, keyValue) {
  const domain = assertProjection(domainValue, "resend-domain");
  const keys = assertProjection(keyValue, "resend-keys");
  if (domain.verifiedDomainCount !== 1 || keys.sendingAccessKeyCount !== 2
    || keys.fullAccessKeyCount !== 0 || keys.targetKeyCount !== 0
    || domain.rawSecretShapeCount !== 0 || keys.rawSecretShapeCount !== 0) fail("PROJECTION_REFUSED");
  return {
    verifiedDomainCount: 1,
    sendingAccessKeyCount: 2,
    fullAccessKeyCount: 0,
    targetKeyCount: 0,
    rawSecretShapeCount: 0,
  };
}

export function validateVercelBaselineProjection(environmentValue, aliasValue) {
  const environment = assertProjection(environmentValue, "vercel-environment");
  const aliases = assertProjection(aliasValue, "vercel-aliases");
  if (environment.dedicatedSmtpRowCount !== 0 || environment.temporaryAuthRowCount !== 0
    || environment.genericSmtpRowCount !== 5 || environment.genericMetadataClass !== "exact"
    || aliases.aliasCount !== 5 || aliases.acceptedAliasTargetCount !== 5) fail("PROJECTION_REFUSED");
  return {
    dedicatedSmtpRowCount: 0,
    temporaryAuthRowCount: 0,
    genericSmtpRowCount: 5,
    acceptedAliasTargetCount: 5,
  };
}

export function validateControlProjection(value, providerClass) {
  const pageClass = providerClass === "resend" ? "resend-create" : providerClass === "vercel" ? "vercel-sensitive-form" : null;
  if (!pageClass) fail("PROJECTION_REFUSED");
  const projection = assertProjection(value, pageClass);
  if (projection.controlClass !== "ready") fail("PROJECTION_REFUSED");
  return { providerClass, controlClass: "ready" };
}

export function validateAliasInventory(rows, expectedDeployment) {
  if (!Array.isArray(rows) || !/^dpl_[A-Za-z0-9]+$/.test(expectedDeployment)
    || rows.length !== ALIASES.length || new Set(rows.map((row) => row.alias)).size !== ALIASES.length) fail("RESPONSE_REFUSED");
  const projection = Object.fromEntries(rows.map((row) => [row.alias, row.deployment]));
  if (ALIASES.some((alias) => projection[alias] !== expectedDeployment)) fail("RESPONSE_REFUSED");
  return { aliasCount: ALIASES.length, targetCount: ALIASES.length, otherCount: 0 };
}

export function validatePriorCandidatesUnaliased(rows) {
  if (!Array.isArray(rows) || rows.length !== 2) fail("RESPONSE_REFUSED");
  const expected = new Set([INERT_029N_DEPLOYMENT, INERT_029O_DEPLOYMENT]);
  if (rows.some((row) => !expected.delete(row.deployment) || row.aliasCount !== 0) || expected.size !== 0) fail("RESPONSE_REFUSED");
  return { candidateCount: 2, aliasCount: 0 };
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
    scan: "029S",
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
    manifest: "029S",
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
  if (["scan", "manifest"].includes(mode) && argv.length > 4 && argv[3] === "--files") return { mode, files: validateScanPaths(argv.slice(4)) };
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
