#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import { classifySmtpProvider } from "../lib/enquiries/provider.ts";

export const PROJECT_ID = "prj_6To7czLpCEGL6fInkQwE4egePPpq";
export const PROJECT_REF = "uvskssaecdhxcgytkasc";
export const BRANCH = "codex/029O-public-enquiry-corrective-completion";
export const START_SHA = "8968415a89dc187e3994cd9bcb8bcecd793a0854";
export const ROLLBACK_DEPLOYMENT = "dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf";
export const INERT_DEPLOYMENT = "dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB";
export const HISTORICAL_REFERENCE = "PP-3B4BDEE2D55CB313";
export const CLEANUP_JOB = Object.freeze({ name: "trainer-enquiry-abuse-cleanup-hourly", schedule: "5 * * * *" });
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
const PROVIDER_CLASSES = new Set(["google_workspace", "microsoft_365", "amazon_ses", "resend", "postmark", "mailgun", "sendgrid"]);
const FAILURE_CODES = new Set([
  "MODE_REFUSED", "ORIGIN_REFUSED", "CONFIGURATION_REFUSED", "HTTP_REFUSED", "RESPONSE_REFUSED",
  "FIXTURE_REFUSED", "PREFLIGHT_REFUSED", "RETENTION_REFUSED", "PRIVACY_REFUSED", "CLEANUP_REFUSED",
]);

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
  const supabaseTarget = env.NEXT_PUBLIC_SUPABASE_URL === `https://${PROJECT_REF}.supabase.co` ? "approved" : "refused";
  return {
    state: presentCount === CONFIGURATION_NAMES.length && provider && supabaseTarget === "approved" ? "runtime-ready" : "runtime-unavailable",
    bindingCount: presentCount,
    requiredCount: CONFIGURATION_NAMES.length,
    providerClass: provider?.providerClass ?? "unclassified",
    recipientAvailable: Boolean(env.CONTACT_ENQUIRY_EMAIL),
    contactProduction: Boolean(env.CONTACT_ENQUIRY_EMAIL),
    supabaseTarget,
  };
}

export function assertSafeOutput(value, protectedValues = []) {
  const output = JSON.stringify(value);
  if (/@[A-Za-z0-9.-]+|(?:smtp|email-smtp)\.[A-Za-z0-9.-]+|eyJ[A-Za-z0-9_-]{12,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]{8,}/i.test(output)) fail("PRIVACY_REFUSED");
  if (protectedValues.some((item) => typeof item === "string" && item.length >= 8 && output.includes(item))) fail("PRIVACY_REFUSED");
  return value;
}

async function readJson(response) {
  try { return await response.json(); } catch { fail("RESPONSE_REFUSED"); }
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
  for (const path of ["/api/checkout", "/api/enquiries"]) {
    const response = await fetcher(`${origin}${path}`, { method: "GET", redirect: "manual" });
    if (response.status !== 405) fail("HTTP_REFUSED");
  }
  return { state: "immutable-passed", publicRoutes: 5, protectedDenied: 3, apiMethodDenied: 2, commerceDisabled: true };
}

export async function smtpPreflight(originValue, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (runtimeConfigurationProjection(env).state !== "runtime-ready") fail("CONFIGURATION_REFUSED");
  const value = await internal(origin, "smtp-preflight", "", env, fetcher);
  if (value.result !== "smtp-preflight" || value.status !== "ready" || !PROVIDER_CLASSES.has(value.providerClass) || value.errorClass !== null) fail("PREFLIGHT_REFUSED");
  return assertSafeOutput({ state: "smtp-preflight-ready", providerClass: value.providerClass }, Object.values(env));
}

export async function retentionProof(originValue, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  const value = await internal(origin, "retention-proof", "", env, fetcher);
  if (value.result !== "retention-proven" || value.enquiryRetained !== 1 || value.bucketDeleted !== 1 || value.linkNulled !== 1 || value.fixtureResidue !== 0) fail("RETENTION_REFUSED");
  return assertSafeOutput({ state: "retention-proven", enquiryRetained: 1, bucketDeleted: 1, linkNulled: 1, fixtureResidue: 0 }, Object.values(env));
}

export async function aggregateStatus(originValue, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  const value = await internal(origin, "schema-status", "", env, fetcher);
  if (value.result !== "schema-status" || value.enquiry_row_count !== 0 || value.bucket_row_count !== 0) fail("FIXTURE_REFUSED");
  return assertSafeOutput({ state: "aggregate-zero", enquiryRows: 0, bucketRows: 0 }, Object.values(env));
}

export async function liveCandidate(originValue, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (runtimeConfigurationProjection(env).state !== "runtime-ready") fail("CONFIGURATION_REFUSED");
  await smtpPreflight(origin, env, fetcher);
  const payload = {
    trainerName: "Sprint 029O Synthetic Trainer", stableName: "Sprint 029O Synthetic Stable", stableAddress: "1 Synthetic Road",
    phone: "+61 400 000 000", email: "sprint-029o@example.invalid", horseVolume: 12, referredBy: "Sprint 029O Synthetic",
    acknowledgement: true, website: "", requestId: crypto.randomUUID(),
  };
  const send = (body, headers = {}) => fetcher(`${origin}/api/enquiries`, {
    method: "POST", headers: { origin, "content-type": "application/json", ...headers }, body: JSON.stringify(body), redirect: "manual",
  });
  let reference = "";
  let completed = false;
  try {
    const firstResponse = await send(payload);
    const first = await readJson(firstResponse);
    if (!firstResponse.ok || first.result !== "received" || !PUBLIC_REFERENCE.test(first.reference) || first.reference === HISTORICAL_REFERENCE) fail("RESPONSE_REFUSED");
    reference = first.reference;
    const replayResponse = await send(payload);
    const replay = await readJson(replayResponse);
    if (!replayResponse.ok || replay.reference !== reference) fail("RESPONSE_REFUSED");
    const negatives = [
      { ...payload, requestId: crypto.randomUUID(), trainerName: "Synthetic\nTrainer" },
      { ...payload, requestId: crypto.randomUUID(), stableName: "Synthetic\rStable" },
      { ...payload, requestId: crypto.randomUUID(), phone: "+61\t400" },
      { ...payload, requestId: crypto.randomUUID(), unexpected: true },
      { ...payload, requestId: crypto.randomUUID(), website: "filled" },
      { ...payload, requestId: crypto.randomUUID(), horseVolume: 0 },
    ];
    const negativeResponses = await Promise.all(negatives.map((item) => send(item)));
    negativeResponses.push(await send({ ...payload, requestId: crypto.randomUUID() }, { origin: "https://invalid.example" }));
    if (negativeResponses.some((response) => response.ok)) fail("RESPONSE_REFUSED");
    const status = await internal(origin, "status", reference, env, fetcher);
    if (status.result !== "status" || status.row_count !== 1 || status.bucket_count !== 1 || status.notification_status !== "sent" || status.notification_attempts !== 1) fail("FIXTURE_REFUSED");
    const rate = await internal(origin, "rate-limit-proof", "", env, fetcher);
    if (rate.result !== "rate-limit-proven" || rate.limited !== true || rate.rowsCreated !== 0 || rate.notificationsAttempted !== 0 || rate.fixtureResidue !== 0) fail("FIXTURE_REFUSED");
    const retention = await retentionProof(origin, env, fetcher);
    completed = true;
    return assertSafeOutput({
      state: "live-passed", reference, rowCount: 1, bucketCount: 1, notificationStatus: "sent", notificationAttempts: 1,
      duplicateSameReference: true, negativeStored: 0, negativeNotified: 0, rateLimited: true, rateFixtureResidue: 0,
      retentionState: retention.state,
    }, Object.values(env));
  } catch (error) {
    if (reference && !completed) {
      const purged = await internal(origin, "purge-fixture", reference, env, fetcher).catch(() => null);
      if (purged?.result !== "deleted") fail("CLEANUP_REFUSED");
    }
    throw error;
  } finally {
    for (const key of CONFIGURATION_NAMES.filter((name) => !name.startsWith("NEXT_PUBLIC_"))) delete env[key];
  }
}

export async function fixtureStatus(originValue, reference, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (!PUBLIC_REFERENCE.test(reference) || reference === HISTORICAL_REFERENCE) fail("FIXTURE_REFUSED");
  return assertSafeOutput(await internal(origin, "status", reference, env, fetcher), Object.values(env));
}

export async function fixturePurge(originValue, reference, env = process.env, fetcher = fetch) {
  const origin = validateCandidateOrigin(originValue);
  if (!PUBLIC_REFERENCE.test(reference) || reference === HISTORICAL_REFERENCE) fail("FIXTURE_REFUSED");
  const deleted = await internal(origin, "purge-fixture", reference, env, fetcher);
  if (deleted.result !== "deleted" || deleted.rows_deleted !== 1 || deleted.buckets_deleted !== 1) fail("FIXTURE_REFUSED");
  const status = await internal(origin, "status", reference, env, fetcher);
  if (status.result !== "status" || status.row_count !== 0 || status.bucket_count !== 0) fail("FIXTURE_REFUSED");
  return assertSafeOutput({ state: "fixture-purged", rowsDeleted: 1, bucketsDeleted: 1, rowResidue: 0, bucketResidue: 0 }, Object.values(env));
}

export function parseCli(argv) {
  const mode = argv[2];
  if (mode === "runtime-status") return { mode };
  if (["immutable", "smtp-preflight", "retention-proof", "aggregate-status", "live-candidate"].includes(mode) && argv.length === 5 && argv[3] === "--origin") return { mode, origin: argv[4] };
  if (["fixture-status", "fixture-purge"].includes(mode) && argv.length === 7 && argv[3] === "--origin" && argv[5] === "--reference") return { mode, origin: argv[4], reference: argv[6] };
  fail("MODE_REFUSED");
}

async function runCli(options) {
  if (options.mode === "runtime-status") return assertSafeOutput(runtimeConfigurationProjection(), Object.values(process.env));
  if (options.mode === "immutable") return immutableCandidate(options.origin);
  if (options.mode === "smtp-preflight") return smtpPreflight(options.origin);
  if (options.mode === "retention-proof") return retentionProof(options.origin);
  if (options.mode === "aggregate-status") return aggregateStatus(options.origin);
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
