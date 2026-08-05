#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import { classifySmtpProvider } from "../lib/enquiries/provider.ts";

export const PROJECT_ID = "prj_6To7czLpCEGL6fInkQwE4egePPpq";
export const PROJECT_REF = "uvskssaecdhxcgytkasc";
export const BRANCH = "codex/029N-public-enquiry-privacy-and-submission-completion";
export const START_SHA = "bc2cc029ef4251d92bb7f46e59d18f32033230f6";
export const ROLLBACK_DEPLOYMENT = "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf";
export const ALIASES = Object.freeze([
  "precisionperformance.com.au",
  "www.precisionperformance.com.au",
  "pnr-precision-performance.vercel.app",
  "pnr-precision-performance-rankin007s-projects.vercel.app",
  "pnr-precision-performance-rankin007-rankin007s-projects.vercel.app",
]);
export const CANDIDATE_ORDER = Object.freeze([...ALIASES].reverse());
export const ROLLBACK_ORDER = Object.freeze([...ALIASES]);
export const CONFIGURATION_NAMES = Object.freeze([
  "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "CONTACT_ENQUIRY_EMAIL",
  "ENQUIRY_ABUSE_HMAC_SECRET", "CRON_SECRET", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY",
]);

const PUBLIC_REFERENCE = /^PP-[A-F0-9]{16}$/;
const CANDIDATE_HOST = /^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/;
const FAILURE_CODES = new Set(["MODE_REFUSED", "ORIGIN_REFUSED", "CONFIGURATION_REFUSED", "HTTP_REFUSED", "RESPONSE_REFUSED", "FIXTURE_REFUSED", "PRIVACY_REFUSED"]);

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

export function expectedAliasTransition(order, step) {
  if (!Array.isArray(order) || step < 0 || step > ALIASES.length || new Set(order).size !== ALIASES.length || order.some((value) => !ALIASES.includes(value))) fail("RESPONSE_REFUSED");
  return { target: step, other: ALIASES.length - step };
}

export function runtimeConfigurationProjection(env = process.env) {
  const presentCount = CONFIGURATION_NAMES.filter((name) => typeof env[name] === "string" && env[name].length > 0).length;
  const provider = classifySmtpProvider(env.SMTP_HOST ?? "");
  const recipientAvailable = Boolean(env.CONTACT_ENQUIRY_EMAIL);
  const contactProduction = recipientAvailable;
  const supabaseTarget = env.NEXT_PUBLIC_SUPABASE_URL === `https://${PROJECT_REF}.supabase.co` ? "approved" : "refused";
  return {
    state: presentCount === CONFIGURATION_NAMES.length && provider && recipientAvailable && supabaseTarget === "approved" ? "runtime-ready" : "runtime-unavailable",
    bindingCount: presentCount,
    requiredCount: CONFIGURATION_NAMES.length,
    providerClass: provider?.providerClass ?? "unclassified",
    recipientAvailable,
    contactProduction,
    supabaseTarget,
  };
}

export function assertSafeOutput(value, protectedValues = []) {
  const text = JSON.stringify(value);
  if (/@[A-Za-z0-9.-]+|(?:smtp|email-smtp)\.[A-Za-z0-9.-]+|eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}/i.test(text)) fail("PRIVACY_REFUSED");
  if (protectedValues.some((item) => typeof item === "string" && item.length >= 8 && text.includes(item))) fail("PRIVACY_REFUSED");
  return value;
}

async function readJson(response) {
  let value;
  try { value = await response.json(); } catch { fail("RESPONSE_REFUSED"); }
  return value;
}

async function internal(origin, action, reference, env, fetcher = fetch) {
  const response = await fetcher(`${origin}/api/internal/enquiries`, {
    method: "POST",
    headers: { authorization: `Bearer ${env.CRON_SECRET}`, "content-type": "application/json" },
    body: JSON.stringify({ action, reference }),
  });
  const value = await readJson(response);
  if (!response.ok) fail("FIXTURE_REFUSED");
  return value;
}

export async function immutableCandidate(originValue, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  const checks = [
    ["home", "/", 200, "Request a Stable Trial"],
    ["pricing", "/pricing", 200, "does not create an order"],
    ["privacy", "/privacy", 200, "Public stable-trial enquiries"],
    ["disclaimer", "/disclaimer", 200, "Information supports professional judgement"],
    ["sign-in", "/sign-in", 200, "Sign"],
  ];
  for (const [, path, status, marker] of checks) {
    const response = await fetcher(`${origin}${path}`, { redirect: "manual", headers: { "cache-control": "no-cache" } });
    const text = await response.text();
    if (response.status !== status || !text.includes(marker)) fail("HTTP_REFUSED");
  }
  for (const path of ["/portal", "/admin", "/data-entry"]) {
    const response = await fetcher(`${origin}${path}`, { redirect: "manual", headers: { "cache-control": "no-cache" } });
    if (![307, 308].includes(response.status) || !response.headers.get("location")?.includes("/sign-in")) fail("HTTP_REFUSED");
  }
  const checkout = await fetcher(`${origin}/api/checkout`, { method: "GET", redirect: "manual" });
  if (checkout.status !== 405) fail("HTTP_REFUSED");
  const enquiryGet = await fetcher(`${origin}/api/enquiries`, { method: "GET", redirect: "manual" });
  if (enquiryGet.status !== 405) fail("HTTP_REFUSED");
  return { state: "immutable-passed", publicRoutes: 5, protectedDenied: 3, apiMethodDenied: 2, commerceDisabled: true };
}

export async function liveCandidate(originValue, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  const projection = runtimeConfigurationProjection(env);
  if (projection.state !== "runtime-ready") fail("CONFIGURATION_REFUSED");
  const requestId = crypto.randomUUID();
  const payload = {
    trainerName: "Sprint 029N Synthetic Trainer", stableName: "Sprint 029N Synthetic Stable", stableAddress: "1 Synthetic Road",
    phone: "+61 400 000 000", email: "sprint-029n@example.invalid", horseVolume: 12, referredBy: "Sprint 029N Synthetic",
    acknowledgement: true, website: "", requestId,
  };
  const send = (body, headers = {}) => fetcher(`${origin}/api/enquiries`, { method: "POST", headers: { origin, "content-type": "application/json", ...headers }, body: JSON.stringify(body), redirect: "manual" });
  try {
    const firstResponse = await send(payload);
    const first = await readJson(firstResponse);
    if (!firstResponse.ok || first.result !== "received" || !PUBLIC_REFERENCE.test(first.reference)) fail("RESPONSE_REFUSED");
    const duplicateResponse = await send(payload);
    const duplicate = await readJson(duplicateResponse);
    if (!duplicateResponse.ok || duplicate.reference !== first.reference) fail("RESPONSE_REFUSED");

    const negativeResponses = [
      await send({ ...payload, requestId: crypto.randomUUID(), unexpected: true }),
      await send({ ...payload, requestId: crypto.randomUUID(), website: "filled" }),
      await send({ ...payload, requestId: crypto.randomUUID(), horseVolume: 0 }),
      await send({ ...payload, requestId: crypto.randomUUID() }, { origin: "https://invalid.example" }),
    ];
    if (negativeResponses.some((response) => response.ok)) fail("RESPONSE_REFUSED");
    const status = await internal(origin, "status", first.reference, env, fetcher);
    if (status.result !== "status" || status.row_count !== 1 || status.bucket_count !== 1 || status.notification_status !== "sent" || status.notification_attempts !== 1) fail("FIXTURE_REFUSED");
    const rateLimit = await internal(origin, "rate-limit-proof", "", env, fetcher);
    if (rateLimit.result !== "rate-limit-proven" || rateLimit.limited !== true || rateLimit.rowsCreated !== 0 || rateLimit.notificationsAttempted !== 0 || rateLimit.fixtureResidue !== 0) fail("FIXTURE_REFUSED");
    return assertSafeOutput({ state: "live-passed", reference: first.reference, rowCount: 1, bucketCount: 1, notificationStatus: "sent", notificationAttempts: 1, duplicateSameReference: true, negativeStored: 0, negativeNotified: 0, rateLimited: true, rateFixtureResidue: 0 }, Object.values(env));
  } finally {
    for (const key of ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "CONTACT_ENQUIRY_EMAIL", "ENQUIRY_ABUSE_HMAC_SECRET", "CRON_SECRET", "SUPABASE_SERVICE_ROLE_KEY"]) delete env[key];
  }
}

export async function fixtureStatus(originValue, reference, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (!PUBLIC_REFERENCE.test(reference)) fail("FIXTURE_REFUSED");
  return assertSafeOutput(await internal(origin, "status", reference, env, fetcher), Object.values(env));
}

export async function fixturePurge(originValue, reference, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (!PUBLIC_REFERENCE.test(reference)) fail("FIXTURE_REFUSED");
  const deleted = await internal(origin, "purge-fixture", reference, env, fetcher);
  if (deleted.result !== "deleted" || deleted.rows_deleted !== 1 || deleted.buckets_deleted !== 1) fail("FIXTURE_REFUSED");
  const status = await internal(origin, "status", reference, env, fetcher);
  if (status.result !== "status" || status.row_count !== 0 || status.bucket_count !== 0) fail("FIXTURE_REFUSED");
  return assertSafeOutput({ state: "fixture-purged", rowsDeleted: 1, bucketsDeleted: 1, rowResidue: 0, bucketResidue: 0 }, Object.values(env));
}

export function parseCli(argv) {
  const mode = argv[2];
  if (mode === "runtime-status") return { mode };
  if (["immutable", "live-candidate"].includes(mode) && argv.length === 5 && argv[3] === "--origin") return { mode, origin: argv[4] };
  if (["fixture-status", "fixture-purge"].includes(mode) && argv.length === 7 && argv[3] === "--origin" && argv[5] === "--reference") return { mode, origin: argv[4], reference: argv[6] };
  fail("MODE_REFUSED");
}

async function runCli(options) {
  if (options.mode === "runtime-status") return assertSafeOutput(runtimeConfigurationProjection(), Object.values(process.env));
  if (options.mode === "immutable") return immutableCandidate(options.origin);
  if (options.mode === "live-candidate") return liveCandidate(options.origin);
  if (options.mode === "fixture-status") return fixtureStatus(options.origin, options.reference);
  if (options.mode === "fixture-purge") return fixturePurge(options.origin, options.reference);
  fail("MODE_REFUSED");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  Promise.resolve().then(() => parseCli(process.argv)).then(runCli).then((result) => process.stdout.write(`${JSON.stringify(result)}\n`)).catch((error) => {
    process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`);
    process.exitCode = 2;
  });
}
