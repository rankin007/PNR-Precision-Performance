#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { classifySmtpProvider } from "../lib/enquiries/provider.ts";

export const PROJECT_ID = "prj_6To7czLpCEGL6fInkQwE4egePPpq";
export const PROJECT_REF = "uvskssaecdhxcgytkasc";
export const BRANCH = "codex/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery";
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
export const DEDICATED_SMTP_NAMES = Object.freeze([
  "PUBLIC_ENQUIRY_SMTP_HOST", "PUBLIC_ENQUIRY_SMTP_PORT", "PUBLIC_ENQUIRY_SMTP_USER", "PUBLIC_ENQUIRY_SMTP_PASS",
]);
export const PREFLIGHT_AUTH_NAMES = Object.freeze([
  "PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256", "PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE", "PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT",
]);
export const CONFIGURATION_NAMES = Object.freeze([
  ...DEDICATED_SMTP_NAMES,
  "SMTP_FROM", "CONTACT_ENQUIRY_EMAIL", "ENQUIRY_ABUSE_HMAC_SECRET", "CRON_SECRET",
  "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY",
  ...PREFLIGHT_AUTH_NAMES,
]);
export const SCANNABLE_FILES = Object.freeze([
  "lib/enquiries/preflight-auth.ts",
  "lib/enquiries/provider.ts",
  "app/api/internal/enquiries/route.ts",
  "scripts/PreflightAuth029Q.ps1",
  "scripts/autonomous-public-enquiry-029Q.mjs",
  "scripts/test-public-enquiry-029Q.mjs",
  "scripts/test-autonomous-public-enquiry-029Q.mjs",
  "package.json",
  "docs/PUBLIC_ENQUIRY_PREFLIGHT_AUTH_AND_SMTP_READINESS_029Q.md",
]);

const CANDIDATE_HOST = /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/;
const FAILURE_CODES = new Set(["MODE_REFUSED", "ORIGIN_REFUSED", "RESPONSE_REFUSED", "HTTP_REFUSED", "PRIVACY_REFUSED", "SCAN_REFUSED", "MANIFEST_REFUSED"]);
const verifierPattern = /^[0-9a-f]{64}$/;

function fail(code) { throw Object.assign(new Error(code), { code }); }
export function sanitizeFailure(error) { return FAILURE_CODES.has(error?.code || error?.message) ? (error.code || error.message) : "UNEXPECTED"; }

export function validateCandidateOrigin(value) {
  let parsed;
  try { parsed = new URL(value); } catch { fail("ORIGIN_REFUSED"); }
  if (parsed.protocol !== "https:" || !CANDIDATE_HOST.test(parsed.hostname) || parsed.pathname !== "/" || parsed.search || parsed.hash || parsed.username || parsed.password) fail("ORIGIN_REFUSED");
  return parsed.origin;
}

export function validateAliasInventory(rows, expectedDeployment) {
  if (!Array.isArray(rows) || !/^dpl_[A-Za-z0-9]+$/.test(expectedDeployment)) fail("RESPONSE_REFUSED");
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

function canonicalTime(value) {
  const milliseconds = Date.parse(value ?? "");
  return Number.isFinite(milliseconds) && new Date(milliseconds).toISOString() === value ? milliseconds : null;
}

export function runtimeConfigurationProjection(env = process.env, now = new Date()) {
  const presentCount = CONFIGURATION_NAMES.filter((name) => typeof env[name] === "string" && env[name].length > 0).length;
  const provider = classifySmtpProvider(env.PUBLIC_ENQUIRY_SMTP_HOST ?? "");
  const structuralResend = provider?.providerClass === "resend" && env.PUBLIC_ENQUIRY_SMTP_PORT === "465" && env.PUBLIC_ENQUIRY_SMTP_USER === "resend";
  const notBefore = canonicalTime(env.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE);
  const expiresAt = canonicalTime(env.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT);
  const current = now.getTime();
  const boundedAuth = verifierPattern.test(env.PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256 ?? "") && notBefore !== null && expiresAt !== null &&
    expiresAt > notBefore && expiresAt - notBefore <= 15 * 60 * 1000 && current >= notBefore && current < expiresAt;
  const supabaseTarget = env.NEXT_PUBLIC_SUPABASE_URL === `https://${PROJECT_REF}.supabase.co` ? "approved" : "refused";
  return {
    state: presentCount === CONFIGURATION_NAMES.length && structuralResend && boundedAuth && supabaseTarget === "approved" ? "runtime-ready" : "runtime-unavailable",
    bindingCount: presentCount,
    requiredCount: CONFIGURATION_NAMES.length,
    providerClass: provider?.providerClass ?? "unclassified",
    recipientAvailable: Boolean(env.CONTACT_ENQUIRY_EMAIL),
    supabaseTarget,
    preflightAuth: boundedAuth ? "bounded-active" : "unavailable",
  };
}

export function assertSafeOutput(value, protectedValues = []) {
  const output = JSON.stringify(value);
  if (/@[A-Za-z0-9.-]+|(?:smtp|email-smtp)\.[A-Za-z0-9.-]+|\bre_[A-Za-z0-9_-]{8,}|eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}/i.test(output)) fail("PRIVACY_REFUSED");
  if (protectedValues.some((item) => typeof item === "string" && item.length >= 8 && output.includes(item))) fail("PRIVACY_REFUSED");
  return value;
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
  if (!Array.isArray(paths) || paths.length === 0 || new Set(paths).size !== paths.length || paths.some((path) => !SCANNABLE_FILES.includes(path))) fail("SCAN_REFUSED");
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
  return { scan: "029Q", status: aggregateCount === 0 ? "clean" : "contained", aggregateCount, fileCount: approved.length, ...(flaggedFiles.length ? { flaggedFiles } : {}) };
}

export function manifestFiles(paths) {
  const approved = validateScanPaths(paths);
  const scan = scanFiles(approved);
  if (scan.aggregateCount !== 0) fail("MANIFEST_REFUSED");
  return {
    manifest: "029Q",
    fileCount: approved.length,
    files: approved.map((path) => ({ path, sha256: createHash("sha256").update(readFileSync(path)).digest("hex") })),
  };
}

export async function immutableCandidate(originValue, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  const checks = [
    ["/", 200, "Request a Stable Trial"], ["/pricing", 200, "does not create an order"],
    ["/privacy", 200, "Public stable-trial enquiries"], ["/disclaimer", 200, "Information supports professional judgement"],
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
  if (mode === "runtime-status" && argv.length === 3) return { mode };
  if (mode === "immutable" && argv.length === 5 && argv[3] === "--origin") return { mode, origin: argv[4] };
  if (["scan", "manifest"].includes(mode) && argv.length > 4 && argv[3] === "--files") return { mode, files: validateScanPaths(argv.slice(4)) };
  fail("MODE_REFUSED");
}

async function runCli(options) {
  if (options.mode === "runtime-status") return assertSafeOutput(runtimeConfigurationProjection(), Object.values(process.env));
  if (options.mode === "immutable") return immutableCandidate(options.origin);
  if (options.mode === "scan") return scanFiles(options.files);
  if (options.mode === "manifest") return manifestFiles(options.files);
  fail("MODE_REFUSED");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve().then(() => parseCli(process.argv)).then(runCli).then((result) => process.stdout.write(`${JSON.stringify(result)}\n`)).catch((error) => {
    process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`);
    process.exitCode = 2;
  });
}
