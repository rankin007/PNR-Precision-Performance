#!/usr/bin/env node

import { pathToFileURL } from "node:url";
import {
  AUTH_CONFIG_URL as INHERITED_AUTH_CONFIG_URL,
  runProviderConfig,
} from "./protected-production-preflight-036C-core.mjs";

export const HARNESS = "protected-management-lifecycle-036D";
export const VERSION = 1;
export const APPROVED_PROJECT_REF = "uvskssaecdhxcgytkasc";
export const PROHIBITED_PROJECT_REF = "tagnbgkroihagjmvehlx";
export const AUTH_CONFIG_URL = "https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth";
export const DEFAULT_REQUEST_CEILING = 2;
export const JUSTIFIED_REQUEST_CEILING = 3;

export const PROVIDER_PASS_OUTPUT_KEYS = Object.freeze([
  "authUsersEnumerated",
  "callbackCount",
  "callbackSetExact",
  "code",
  "confirmationUrlCount",
  "customSmtpConfigured",
  "harness",
  "lifecycleState",
  "minimumIntervalSeconds",
  "mode",
  "otpExpirySeconds",
  "otpLength",
  "protectedValuesEmitted",
  "providerClass",
  "remoteMutation",
  "requestCount",
  "senderExact",
  "siteUrlExact",
  "state",
  "target",
  "templateLinkCount",
  "templateTokenCount",
  "timestampUtc",
  "version",
  "wildcardCount",
].sort());

export const INVALIDATION_OUTPUT_KEYS = Object.freeze([
  "authUsersEnumerated",
  "code",
  "harness",
  "lifecycleState",
  "mode",
  "protectedValuesEmitted",
  "remoteMutation",
  "requestCount",
  "responseBodyRead",
  "responseClass",
  "revocationVerified",
  "state",
  "target",
  "timestampUtc",
  "version",
].sort());

const SAFE_FAILURE_CODES = new Set([
  "CALLBACK_SET_MISMATCH",
  "CONFIG_SCHEMA_REFUSED",
  "CONFIRMATION_URL_PRESENT",
  "CREDENTIAL_MISSING",
  "HTTP_REDIRECT_REFUSED",
  "HTTP_STATUS_REFUSED",
  "INVALIDATION_ORDER_REFUSED",
  "INVALIDATION_STATUS_REFUSED",
  "INVALID_JSON_REFUSED",
  "LIFECYCLE_ORDER_REFUSED",
  "NON_JSON_REFUSED",
  "ONE_TOKEN_CEILING_REFUSED",
  "OTP_EXPIRY_MISMATCH",
  "OTP_LENGTH_MISMATCH",
  "PROHIBITED_TARGET_REFUSED",
  "REQUEST_COUNT_REFUSED",
  "RESPONSE_BODY_UNAVAILABLE",
  "RESPONSE_TOO_LARGE",
  "RETRY_NOT_JUSTIFIED",
  "SENDER_MISMATCH",
  "SITE_URL_MISMATCH",
  "SMTP_CONFIG_MISSING",
  "SMTP_FREQUENCY_MISMATCH",
  "SMTP_PROVIDER_MISMATCH",
  "TARGET_REFUSED",
  "TEMPLATE_LINK_PRESENT",
  "TEMPLATE_TOKEN_COUNT_MISMATCH",
  "TOKEN_STILL_ACTIVE_REFUSED",
  "TRANSPORT_AMBIGUOUS_SANITIZED",
  "TRANSPORT_FAILED_SANITIZED",
  "UTF8_REFUSED",
  "UNEXPECTED",
]);

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function timestamp(now) {
  const candidate = typeof now === "function" ? now() : now;
  const date = candidate instanceof Date ? candidate : new Date(candidate);
  return Number.isNaN(date.valueOf()) ? "1970-01-01T00:00:00.000Z" : date.toISOString();
}

function assertExactKeys(output, expected) {
  const actual = Object.keys(output).sort();
  if (actual.join("|") !== expected.join("|")) fail("UNEXPECTED");
  return output;
}

export function sanitizeFailure(error) {
  const candidate = error?.code || error?.message;
  return SAFE_FAILURE_CODES.has(candidate) ? candidate : "UNEXPECTED";
}

export function validateLifecycleEndpoint(value) {
  if (typeof value === "string" && value.includes(PROHIBITED_PROJECT_REF)) fail("PROHIBITED_TARGET_REFUSED");
  if (value !== AUTH_CONFIG_URL || INHERITED_AUTH_CONFIG_URL !== AUTH_CONFIG_URL) fail("TARGET_REFUSED");
  const parsed = new URL(value);
  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== "api.supabase.com" ||
    parsed.pathname !== `/v1/projects/${APPROVED_PROJECT_REF}/config/auth` ||
    parsed.search ||
    parsed.hash
  ) fail("TARGET_REFUSED");
  return value;
}

function providerPassBase(now) {
  return {
    harness: HARNESS,
    version: VERSION,
    timestampUtc: timestamp(now),
    mode: "provider-pass",
    state: "failed-sanitized",
    code: "UNEXPECTED",
    lifecycleState: "failed-sanitized",
    target: "exact-approved",
    siteUrlExact: false,
    callbackCount: 0,
    callbackSetExact: false,
    wildcardCount: 0,
    customSmtpConfigured: false,
    providerClass: "resend",
    senderExact: false,
    templateTokenCount: 0,
    confirmationUrlCount: 0,
    templateLinkCount: 0,
    otpLength: 0,
    otpExpirySeconds: 0,
    minimumIntervalSeconds: 0,
    requestCount: 1,
    authUsersEnumerated: false,
    remoteMutation: "none",
    protectedValuesEmitted: false,
  };
}

function invalidationBase(now, requestCount) {
  return {
    harness: HARNESS,
    version: VERSION,
    timestampUtc: timestamp(now),
    mode: "invalidation-check",
    state: "failed-sanitized",
    code: "UNEXPECTED",
    lifecycleState: "failed-sanitized",
    target: "exact-approved",
    revocationVerified: false,
    responseClass: "not-proven",
    responseBodyRead: false,
    requestCount,
    authUsersEnumerated: false,
    remoteMutation: "none",
    protectedValuesEmitted: false,
  };
}

export function initialLifecycleState() {
  return Object.freeze({ state: "not-created", tokenCount: 0, requestCount: 0 });
}

export function advanceLifecycle(current, event) {
  if (!current || typeof current !== "object" || typeof event !== "object") fail("LIFECYCLE_ORDER_REFUSED");
  const next = { state: current.state, tokenCount: current.tokenCount, requestCount: current.requestCount };
  switch (event.type) {
    case "create":
      if (next.tokenCount !== 0) fail("ONE_TOKEN_CEILING_REFUSED");
      if (next.state !== "not-created") fail("LIFECYCLE_ORDER_REFUSED");
      next.state = "created-private";
      next.tokenCount = 1;
      break;
    case "provider-pass":
      if (next.state !== "created-private" || next.requestCount !== 0) fail("LIFECYCLE_ORDER_REFUSED");
      next.state = "provider-pass";
      next.requestCount = 1;
      break;
    case "revoke":
      if (!["created-private", "provider-pass"].includes(next.state)) fail("LIFECYCLE_ORDER_REFUSED");
      next.state = "revoked-private";
      break;
    case "invalidation-proven": {
      const count = Number(event.requestCount);
      if (next.state !== "revoked-private" || next.requestCount > 1) fail("LIFECYCLE_ORDER_REFUSED");
      if (![2, 3].includes(count)) fail("REQUEST_COUNT_REFUSED");
      if (count === 3 && event.retryJustified !== true) fail("RETRY_NOT_JUSTIFIED");
      next.state = "invalidation-proven";
      next.requestCount = count;
      break;
    }
    case "clear":
      if (next.state !== "invalidation-proven") fail("LIFECYCLE_ORDER_REFUSED");
      next.state = "cleared";
      break;
    default:
      fail("LIFECYCLE_ORDER_REFUSED");
  }
  return Object.freeze(next);
}

export async function runProviderPass({ credential, fetchImpl = globalThis.fetch, now = () => new Date() }) {
  let protectedCredential = credential;
  const output = providerPassBase(now);
  try {
    if (!isNonEmptyString(protectedCredential)) fail("CREDENTIAL_MISSING");
    validateLifecycleEndpoint(AUTH_CONFIG_URL);
    const result = await runProviderConfig({ credential: protectedCredential, fetchImpl, now });
    const safeCode = result.code === "NONE" ? "NONE" : sanitizeFailure({ code: result.code });
    const inherited = result.output;
    Object.assign(output, {
      timestampUtc: inherited.timestampUtc,
      state: inherited.state,
      code: safeCode,
      lifecycleState: inherited.state === "pass" ? "provider-pass" : "failed-sanitized",
      siteUrlExact: inherited.siteUrlExact,
      callbackCount: inherited.callbackCount,
      callbackSetExact: inherited.callbackSetExact,
      wildcardCount: inherited.wildcardCount,
      customSmtpConfigured: inherited.customSmtpConfigured,
      providerClass: inherited.providerClass,
      senderExact: inherited.senderExact,
      templateTokenCount: inherited.templateTokenCount,
      confirmationUrlCount: inherited.confirmationUrlCount,
      templateLinkCount: inherited.templateLinkCount,
      otpLength: inherited.otpLength,
      otpExpirySeconds: inherited.otpExpirySeconds,
      minimumIntervalSeconds: inherited.minimumIntervalSeconds,
      authUsersEnumerated: false,
      remoteMutation: "none",
      protectedValuesEmitted: false,
    });
    return { output: assertExactKeys(output, PROVIDER_PASS_OUTPUT_KEYS), code: safeCode };
  } catch (error) {
    const code = sanitizeFailure(error);
    output.code = code;
    return { output: assertExactKeys(output, PROVIDER_PASS_OUTPUT_KEYS), code };
  } finally {
    protectedCredential = null;
  }
}

export async function runInvalidationCheck({
  credential,
  priorProviderPass,
  cleanupAfterFailedProviderAttempt = false,
  revocationConfirmed,
  requestCount = DEFAULT_REQUEST_CEILING,
  retryJustified = false,
  fetchImpl = globalThis.fetch,
  now = () => new Date(),
}) {
  let protectedCredential = credential;
  const parsedRequestCount = Number(requestCount);
  const output = invalidationBase(now, Number.isFinite(parsedRequestCount) ? parsedRequestCount : 0);
  try {
    if (!isNonEmptyString(protectedCredential)) fail("CREDENTIAL_MISSING");
    if (revocationConfirmed !== true) fail("INVALIDATION_ORDER_REFUSED");
    if (priorProviderPass !== true && cleanupAfterFailedProviderAttempt !== true) fail("INVALIDATION_ORDER_REFUSED");
    if (![DEFAULT_REQUEST_CEILING, JUSTIFIED_REQUEST_CEILING].includes(parsedRequestCount)) fail("REQUEST_COUNT_REFUSED");
    if (parsedRequestCount === JUSTIFIED_REQUEST_CEILING && retryJustified !== true) fail("RETRY_NOT_JUSTIFIED");
    validateLifecycleEndpoint(AUTH_CONFIG_URL);
    if (typeof fetchImpl !== "function") fail("TRANSPORT_AMBIGUOUS_SANITIZED");

    let response;
    try {
      response = await fetchImpl(AUTH_CONFIG_URL, {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${protectedCredential}`,
        },
        redirect: "manual",
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      fail("TRANSPORT_AMBIGUOUS_SANITIZED");
    }

    if (!response || typeof response.status !== "number") fail("TRANSPORT_AMBIGUOUS_SANITIZED");
    if (response.redirected === true || (response.status >= 300 && response.status < 400)) fail("HTTP_REDIRECT_REFUSED");
    if (response.status === 200) fail("TOKEN_STILL_ACTIVE_REFUSED");
    if (![401, 403].includes(response.status)) fail("INVALIDATION_STATUS_REFUSED");

    Object.assign(output, {
      state: "pass",
      code: "NONE",
      lifecycleState: priorProviderPass === true ? "invalidation-proven" : "cleanup-invalidation-proven",
      revocationVerified: true,
      responseClass: "unauthorized-or-forbidden",
      responseBodyRead: false,
      authUsersEnumerated: false,
      remoteMutation: "none",
      protectedValuesEmitted: false,
    });
    return { output: assertExactKeys(output, INVALIDATION_OUTPUT_KEYS), code: "NONE" };
  } catch (error) {
    const code = sanitizeFailure(error);
    output.code = code;
    return { output: assertExactKeys(output, INVALIDATION_OUTPUT_KEYS), code };
  } finally {
    protectedCredential = null;
  }
}

function selfTest() {
  if (validateLifecycleEndpoint(AUTH_CONFIG_URL) !== AUTH_CONFIG_URL) fail("UNEXPECTED");
  let lifecycle = initialLifecycleState();
  lifecycle = advanceLifecycle(lifecycle, { type: "create" });
  lifecycle = advanceLifecycle(lifecycle, { type: "provider-pass" });
  lifecycle = advanceLifecycle(lifecycle, { type: "revoke" });
  lifecycle = advanceLifecycle(lifecycle, { type: "invalidation-proven", requestCount: 2 });
  lifecycle = advanceLifecycle(lifecycle, { type: "clear" });
  if (lifecycle.state !== "cleared" || lifecycle.tokenCount !== 1 || lifecycle.requestCount !== 2) fail("UNEXPECTED");
  if (sanitizeFailure(new Error("private provider detail")) !== "UNEXPECTED") fail("UNEXPECTED");
  assertExactKeys(providerPassBase(() => new Date(0)), PROVIDER_PASS_OUTPUT_KEYS);
  assertExactKeys(invalidationBase(() => new Date(0), 2), INVALIDATION_OUTPUT_KEYS);
  return {
    harness: HARNESS,
    version: VERSION,
    mode: "self-test",
    state: "pass",
    checks: 5,
    protectedValuesEmitted: false,
    remoteMutation: "none",
  };
}

function writeJson(value) {
  process.stdout.write(`${JSON.stringify(value)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] || "--self-test";
  if (mode === "--self-test") {
    try {
      writeJson(selfTest());
    } catch {
      writeJson({ harness: HARNESS, version: VERSION, mode: "self-test", state: "failed-sanitized", code: "UNEXPECTED", protectedValuesEmitted: false, remoteMutation: "none" });
      process.exitCode = 2;
    }
  } else if (mode === "--provider-pass") {
    let credential = process.env.PP036D_MANAGEMENT_API_TOKEN;
    delete process.env.PP036D_MANAGEMENT_API_TOKEN;
    runProviderPass({ credential })
      .then(({ output }) => {
        writeJson(output);
        if (output.state !== "pass") process.exitCode = 2;
      })
      .catch(() => {
        writeJson({ ...providerPassBase(() => new Date()), code: "UNEXPECTED" });
        process.exitCode = 2;
      })
      .finally(() => {
        credential = null;
        delete process.env.PP036D_MANAGEMENT_API_TOKEN;
      });
  } else if (mode === "--invalidation-check") {
    let credential = process.env.PP036D_MANAGEMENT_API_TOKEN;
    const priorProviderPass = process.env.PP036D_PRIOR_PROVIDER_PASS === "true";
    const cleanupAfterFailedProviderAttempt = process.env.PP036D_CLEANUP_AFTER_FAILED_PROVIDER === "true";
    const revocationConfirmed = process.env.PP036D_REVOCATION_CONFIRMED === "true";
    const requestCount = Number(process.env.PP036D_REQUEST_COUNT);
    const retryJustified = process.env.PP036D_RETRY_JUSTIFIED === "true";
    for (const name of ["PP036D_MANAGEMENT_API_TOKEN", "PP036D_PRIOR_PROVIDER_PASS", "PP036D_CLEANUP_AFTER_FAILED_PROVIDER", "PP036D_REVOCATION_CONFIRMED", "PP036D_REQUEST_COUNT", "PP036D_RETRY_JUSTIFIED"]) delete process.env[name];
    runInvalidationCheck({ credential, priorProviderPass, cleanupAfterFailedProviderAttempt, revocationConfirmed, requestCount, retryJustified })
      .then(({ output }) => {
        writeJson(output);
        if (output.state !== "pass") process.exitCode = 2;
      })
      .catch(() => {
        writeJson({ ...invalidationBase(() => new Date(), Number.isFinite(requestCount) ? requestCount : 0), code: "UNEXPECTED" });
        process.exitCode = 2;
      })
      .finally(() => {
        credential = null;
        for (const name of ["PP036D_MANAGEMENT_API_TOKEN", "PP036D_PRIOR_PROVIDER_PASS", "PP036D_CLEANUP_AFTER_FAILED_PROVIDER", "PP036D_REVOCATION_CONFIRMED", "PP036D_REQUEST_COUNT", "PP036D_RETRY_JUSTIFIED"]) delete process.env[name];
      });
  } else {
    writeJson({ harness: HARNESS, version: VERSION, mode: "refused", state: "failed-sanitized", code: "UNEXPECTED", protectedValuesEmitted: false, remoteMutation: "none" });
    process.exitCode = 2;
  }
}
