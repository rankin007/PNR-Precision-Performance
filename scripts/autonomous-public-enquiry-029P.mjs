#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import { classifySmtpProvider } from "../lib/enquiries/provider.ts";

export const PROJECT_ID = "prj_6To7czLpCEGL6fInkQwE4egePPpq";
export const PROJECT_REF = "uvskssaecdhxcgytkasc";
export const BRANCH = "codex/029P-resend-smtp-readiness-recovery";
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
export const CONFIGURATION_NAMES = Object.freeze([
  "PUBLIC_ENQUIRY_SMTP_HOST", "PUBLIC_ENQUIRY_SMTP_PORT", "PUBLIC_ENQUIRY_SMTP_USER", "PUBLIC_ENQUIRY_SMTP_PASS",
  "SMTP_FROM", "CONTACT_ENQUIRY_EMAIL", "ENQUIRY_ABUSE_HMAC_SECRET", "CRON_SECRET",
  "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY",
]);

const CANDIDATE_HOST = /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/;
const FAILURE_CODES = new Set(["MODE_REFUSED", "ORIGIN_REFUSED", "CONFIGURATION_REFUSED", "HTTP_REFUSED", "RESPONSE_REFUSED", "PREFLIGHT_REFUSED", "PRIVACY_REFUSED"]);

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

export function runtimeConfigurationProjection(env = process.env) {
  const presentCount = CONFIGURATION_NAMES.filter((name) => typeof env[name] === "string" && env[name].length > 0).length;
  const provider = classifySmtpProvider(env.PUBLIC_ENQUIRY_SMTP_HOST ?? "");
  const structuralResend = provider?.providerClass === "resend" && env.PUBLIC_ENQUIRY_SMTP_PORT === "465" && env.PUBLIC_ENQUIRY_SMTP_USER === "resend";
  const supabaseTarget = env.NEXT_PUBLIC_SUPABASE_URL === `https://${PROJECT_REF}.supabase.co` ? "approved" : "refused";
  return {
    state: presentCount === CONFIGURATION_NAMES.length && structuralResend && supabaseTarget === "approved" ? "runtime-ready" : "runtime-unavailable",
    bindingCount: presentCount,
    requiredCount: CONFIGURATION_NAMES.length,
    providerClass: provider?.providerClass ?? "unclassified",
    recipientAvailable: Boolean(env.CONTACT_ENQUIRY_EMAIL),
    supabaseTarget,
  };
}

export function assertSafeOutput(value, protectedValues = []) {
  const output = JSON.stringify(value);
  if (/@[A-Za-z0-9.-]+|(?:smtp|email-smtp)\.[A-Za-z0-9.-]+|\bre_[A-Za-z0-9_-]{8,}|eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}/i.test(output)) fail("PRIVACY_REFUSED");
  if (protectedValues.some((item) => typeof item === "string" && item.length >= 8 && output.includes(item))) fail("PRIVACY_REFUSED");
  return value;
}

async function readJson(response) {
  try { return await response.json(); } catch { fail("RESPONSE_REFUSED"); }
}

async function internal(origin, env, fetcher = fetch) {
  const response = await fetcher(`${origin}/api/internal/enquiries`, {
    method: "POST",
    headers: { authorization: `Bearer ${env.CRON_SECRET}`, "content-type": "application/json" },
    body: JSON.stringify({ action: "smtp-preflight", reference: "" }),
  });
  const value = await readJson(response);
  if (!response.ok) fail("PREFLIGHT_REFUSED");
  return value;
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

function clearServerEnvironment(env) {
  for (const key of CONFIGURATION_NAMES.filter((name) => !name.startsWith("NEXT_PUBLIC_"))) delete env[key];
}

export async function smtpPreflight(originValue, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (runtimeConfigurationProjection(env).state !== "runtime-ready") fail("CONFIGURATION_REFUSED");
  try {
    const value = await internal(origin, env, fetcher);
    if (value.result !== "smtp-preflight" || value.status !== "ready" || value.providerClass !== "resend" || value.errorClass !== null) fail("PREFLIGHT_REFUSED");
    return assertSafeOutput({ result: "smtp-preflight", status: "ready", providerClass: "resend", errorClass: null }, Object.values(env));
  } finally {
    clearServerEnvironment(env);
  }
}

export function parseCli(argv) {
  const mode = argv[2];
  if (mode === "runtime-status" && argv.length === 3) return { mode };
  if (["immutable", "smtp-preflight"].includes(mode) && argv.length === 5 && argv[3] === "--origin") return { mode, origin: argv[4] };
  fail("MODE_REFUSED");
}

async function runCli(options) {
  if (options.mode === "runtime-status") return assertSafeOutput(runtimeConfigurationProjection(), Object.values(process.env));
  if (options.mode === "immutable") return immutableCandidate(options.origin);
  if (options.mode === "smtp-preflight") return smtpPreflight(options.origin);
  fail("MODE_REFUSED");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve().then(() => parseCli(process.argv)).then(runCli).then((result) => process.stdout.write(`${JSON.stringify(result)}\n`)).catch((error) => {
    process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`);
    process.exitCode = 2;
  });
}
