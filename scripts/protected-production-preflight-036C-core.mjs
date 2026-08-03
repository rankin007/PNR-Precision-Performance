#!/usr/bin/env node

import { pathToFileURL } from "node:url";

export const HARNESS = "protected-production-preflight-036C";
export const VERSION = 1;
export const APPROVED_PROJECT_REF = "uvskssaecdhxcgytkasc";
export const PROHIBITED_PROJECT_REF = "tagnbgkroihagjmvehlx";
export const AUTH_CONFIG_URL = "https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth";
export const MAX_RESPONSE_BYTES = 1024 * 1024;

const EXPECTED = Object.freeze({
  siteUrl: "https://precisionperformance.com.au",
  callback: "https://precisionperformance.com.au/auth/callback",
  smtpHost: "smtp.resend.com",
  sender: "no-reply@precisionperformance.com.au",
  otpLength: 6,
  otpExpirySeconds: 3600,
  minimumIntervalSeconds: 60,
});

export const PROVIDER_OUTPUT_KEYS = Object.freeze([
  "authUsersEnumerated",
  "callbackCount",
  "callbackSetExact",
  "confirmationUrlCount",
  "customSmtpConfigured",
  "harness",
  "minimumIntervalSeconds",
  "mode",
  "otpExpirySeconds",
  "otpLength",
  "protectedValuesEmitted",
  "providerClass",
  "remoteMutation",
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

const SAFE_FAILURE_CODES = new Set([
  "CALLBACK_SET_MISMATCH",
  "CONFIG_SCHEMA_REFUSED",
  "CONFIRMATION_URL_PRESENT",
  "HTTP_REDIRECT_REFUSED",
  "HTTP_STATUS_REFUSED",
  "INVALID_JSON_REFUSED",
  "MANAGEMENT_CREDENTIAL_MISSING",
  "NON_JSON_REFUSED",
  "OTP_EXPIRY_MISMATCH",
  "OTP_LENGTH_MISMATCH",
  "PROHIBITED_TARGET_REFUSED",
  "RESPONSE_BODY_UNAVAILABLE",
  "RESPONSE_TOO_LARGE",
  "SENDER_MISMATCH",
  "SITE_URL_MISMATCH",
  "SMTP_CONFIG_MISSING",
  "SMTP_FREQUENCY_MISMATCH",
  "SMTP_PROVIDER_MISMATCH",
  "TARGET_REFUSED",
  "TEMPLATE_LINK_PRESENT",
  "TEMPLATE_TOKEN_COUNT_MISMATCH",
  "TRANSPORT_FAILED_SANITIZED",
  "UTF8_REFUSED",
  "UNEXPECTED",
]);

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function timestamp(now) {
  const candidate = typeof now === "function" ? now() : now;
  const date = candidate instanceof Date ? candidate : new Date(candidate);
  return Number.isNaN(date.valueOf()) ? "1970-01-01T00:00:00.000Z" : date.toISOString();
}

function baseOutput(now) {
  return {
    harness: HARNESS,
    version: VERSION,
    timestampUtc: timestamp(now),
    mode: "provider-config",
    state: "failed-sanitized",
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
    authUsersEnumerated: false,
    remoteMutation: "none",
    protectedValuesEmitted: false,
  };
}

function assertProviderOutputKeys(output) {
  const actual = Object.keys(output).sort();
  if (actual.join("|") !== PROVIDER_OUTPUT_KEYS.join("|")) fail("UNEXPECTED");
  return output;
}

function countMatches(value, expression) {
  return [...value.matchAll(expression)].length;
}

function parseCallbacks(value) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function validatePayloadSchema(payload) {
  if (!isPlainObject(payload)) fail("CONFIG_SCHEMA_REFUSED");
  const stringFields = [
    "site_url",
    "uri_allow_list",
    "smtp_admin_email",
    "smtp_host",
    "smtp_pass",
    "smtp_port",
    "smtp_user",
    "mailer_templates_magic_link_content",
  ];
  for (const field of stringFields) {
    if (typeof payload[field] !== "string") fail("CONFIG_SCHEMA_REFUSED");
  }
  for (const field of ["mailer_otp_exp", "mailer_otp_length", "smtp_max_frequency"]) {
    if (typeof payload[field] !== "number" || !Number.isFinite(payload[field])) fail("CONFIG_SCHEMA_REFUSED");
  }
}

export function sanitizeFailure(error) {
  const candidate = error?.code || error?.message;
  return SAFE_FAILURE_CODES.has(candidate) ? candidate : "UNEXPECTED";
}

export function validateExactEndpoint(value) {
  if (typeof value === "string" && value.includes(PROHIBITED_PROJECT_REF)) fail("PROHIBITED_TARGET_REFUSED");
  if (value !== AUTH_CONFIG_URL) fail("TARGET_REFUSED");
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

export function evaluateAuthConfig(payload, now = () => new Date()) {
  const output = baseOutput(now);
  try {
    validatePayloadSchema(payload);

    const callbacks = parseCallbacks(payload.uri_allow_list);
    const template = payload.mailer_templates_magic_link_content;
    const smtpConfigured = [payload.smtp_host, payload.smtp_port, payload.smtp_user, payload.smtp_pass].every(isNonEmptyString);
    const providerExact = payload.smtp_host.trim().toLowerCase() === EXPECTED.smtpHost;

    output.siteUrlExact = payload.site_url === EXPECTED.siteUrl;
    output.callbackCount = callbacks.length;
    output.callbackSetExact = callbacks.length === 1 && callbacks[0] === EXPECTED.callback;
    output.wildcardCount = callbacks.filter((entry) => entry.includes("*")).length;
    output.customSmtpConfigured = smtpConfigured;
    output.senderExact = payload.smtp_admin_email === EXPECTED.sender;
    output.templateTokenCount = countMatches(template, /{{-?\s*\.Token\s*-?}}/g);
    output.confirmationUrlCount = countMatches(template, /\.ConfirmationURL\b/g);
    output.templateLinkCount =
      countMatches(template, /\bhttps?:\/\/[^\s"'<>]+/gi) +
      countMatches(template, /<a\b[^>]*\bhref\s*=/gi);
    output.otpLength = payload.mailer_otp_length;
    output.otpExpirySeconds = payload.mailer_otp_exp;
    output.minimumIntervalSeconds = payload.smtp_max_frequency;

    const failureCode =
      (!output.siteUrlExact && "SITE_URL_MISMATCH") ||
      ((!output.callbackSetExact || output.wildcardCount !== 0) && "CALLBACK_SET_MISMATCH") ||
      (!smtpConfigured && "SMTP_CONFIG_MISSING") ||
      (!providerExact && "SMTP_PROVIDER_MISMATCH") ||
      (!output.senderExact && "SENDER_MISMATCH") ||
      (output.templateTokenCount !== 1 && "TEMPLATE_TOKEN_COUNT_MISMATCH") ||
      (output.confirmationUrlCount !== 0 && "CONFIRMATION_URL_PRESENT") ||
      (output.templateLinkCount !== 0 && "TEMPLATE_LINK_PRESENT") ||
      (output.otpLength !== EXPECTED.otpLength && "OTP_LENGTH_MISMATCH") ||
      (output.otpExpirySeconds !== EXPECTED.otpExpirySeconds && "OTP_EXPIRY_MISMATCH") ||
      (output.minimumIntervalSeconds !== EXPECTED.minimumIntervalSeconds && "SMTP_FREQUENCY_MISMATCH") ||
      "NONE";

    output.state = failureCode === "NONE" ? "pass" : "failed-sanitized";
    return { output: assertProviderOutputKeys(output), code: failureCode };
  } catch (error) {
    return { output: assertProviderOutputKeys(output), code: sanitizeFailure(error) };
  }
}

async function readBoundedJson(response) {
  const contentType = response.headers?.get?.("content-type") || "";
  if (!/\bapplication\/(?:[a-z0-9.+-]+\+)?json\b/i.test(contentType)) fail("NON_JSON_REFUSED");

  const declared = response.headers?.get?.("content-length");
  if (declared !== null && declared !== undefined && declared !== "") {
    const size = Number(declared);
    if (!Number.isFinite(size) || size < 0 || size > MAX_RESPONSE_BYTES) fail("RESPONSE_TOO_LARGE");
  }

  if (!response.body || typeof response.body.getReader !== "function") fail("RESPONSE_BODY_UNAVAILABLE");
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES) fail("RESPONSE_TOO_LARGE");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    fail("UTF8_REFUSED");
  }

  try {
    return JSON.parse(text);
  } catch {
    fail("INVALID_JSON_REFUSED");
  }
}

export async function runProviderConfig({ credential, fetchImpl = globalThis.fetch, now = () => new Date() }) {
  let protectedCredential = credential;
  try {
    if (!isNonEmptyString(protectedCredential)) fail("MANAGEMENT_CREDENTIAL_MISSING");
    validateExactEndpoint(AUTH_CONFIG_URL);
    if (typeof fetchImpl !== "function") fail("TRANSPORT_FAILED_SANITIZED");

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
      fail("TRANSPORT_FAILED_SANITIZED");
    }

    if (response.redirected || (response.status >= 300 && response.status < 400)) fail("HTTP_REDIRECT_REFUSED");
    if (response.status !== 200) fail("HTTP_STATUS_REFUSED");
    const payload = await readBoundedJson(response);
    return evaluateAuthConfig(payload, now);
  } catch (error) {
    return { output: assertProviderOutputKeys(baseOutput(now)), code: sanitizeFailure(error) };
  } finally {
    protectedCredential = null;
  }
}

function selfTest() {
  if (validateExactEndpoint(AUTH_CONFIG_URL) !== AUTH_CONFIG_URL) fail("UNEXPECTED");
  try {
    validateExactEndpoint(`https://api.supabase.com/v1/projects/${PROHIBITED_PROJECT_REF}/config/auth`);
    fail("UNEXPECTED");
  } catch (error) {
    if (error.code !== "PROHIBITED_TARGET_REFUSED") throw error;
  }
  if (sanitizeFailure(new Error("private provider detail")) !== "UNEXPECTED") fail("UNEXPECTED");
  assertProviderOutputKeys(baseOutput(() => new Date(0)));
  return {
    harness: HARNESS,
    version: VERSION,
    mode: "self-test",
    state: "pass",
    checks: 4,
    protectedValuesEmitted: false,
    remoteMutation: "none",
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] || "--self-test";
  if (mode === "--self-test") {
    try {
      process.stdout.write(`${JSON.stringify(selfTest())}\n`);
    } catch {
      process.stdout.write(`${JSON.stringify({ harness: HARNESS, version: VERSION, mode: "self-test", state: "failed-sanitized", protectedValuesEmitted: false, remoteMutation: "none" })}\n`);
      process.exitCode = 2;
    }
  } else if (mode === "--provider-config") {
    let credential = process.env.PP036C_MANAGEMENT_API_TOKEN;
    delete process.env.PP036C_MANAGEMENT_API_TOKEN;
    runProviderConfig({ credential })
      .then(({ output }) => {
        process.stdout.write(`${JSON.stringify(output)}\n`);
        if (output.state !== "pass") process.exitCode = 2;
      })
      .catch(() => {
        process.stdout.write(`${JSON.stringify(baseOutput(() => new Date()))}\n`);
        process.exitCode = 2;
      })
      .finally(() => {
        credential = null;
        delete process.env.PP036C_MANAGEMENT_API_TOKEN;
      });
  } else {
    process.stdout.write(`${JSON.stringify({ harness: HARNESS, version: VERSION, mode: "refused", state: "failed-sanitized", protectedValuesEmitted: false, remoteMutation: "none" })}\n`);
    process.exitCode = 2;
  }
}
