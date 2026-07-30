#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const INPUT_KEYS = new Set(["error_code", "event_message", "path", "status_code", "timestamp"]);
const RATE_CODES = new Set(["over_email_send_rate_limit", "over_request_rate_limit"]);
const PROVIDER_CODES = new Set(["email_address_not_authorized", "email_provider_disabled", "unexpected_failure"]);
const PROTECTED_PATTERN = /(?:[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b|\b(?:bearer|token|authorization|cookie|x-forwarded-for)\b)/i;

function fail() { const error = new Error("DIAGNOSTIC_FORMAT_REFUSED"); error.code = "DIAGNOSTIC_FORMAT_REFUSED"; throw error; }
export function sanitizeAuthDiagnostic(input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > 20) fail();
  const dispositions = new Set(); const hours = new Set();
  for (const record of input) {
    if (!record || typeof record !== "object" || Array.isArray(record) || Object.keys(record).some(key => !INPUT_KEYS.has(key))) fail();
    const serialized = JSON.stringify(record); if (PROTECTED_PATTERN.test(serialized)) fail();
    if (record.path !== "/auth/v1/otp" || !Number.isInteger(record.status_code)) fail();
    const date = new Date(record.timestamp); if (!Number.isFinite(date.getTime())) fail();
    hours.add(date.toISOString().slice(0, 13) + ":00Z");
    const code = typeof record.error_code === "string" ? record.error_code : "";
    if (record.status_code === 429 || RATE_CODES.has(code)) dispositions.add("rate-limited");
    else if (record.status_code >= 500 || PROVIDER_CODES.has(code)) dispositions.add("provider-rejected");
    else if (record.status_code >= 200 && record.status_code < 300) dispositions.add("request-accepted");
    else dispositions.add("request-rejected-other");
  }
  return { diagnostic: "035D-auth", state: "sanitized", dispositions: [...dispositions].sort(), coarseHours: [...hours].sort(), records: input.length };
}

function selfTest() {
  const accepted = sanitizeAuthDiagnostic([{ path: "/auth/v1/otp", status_code: 200, timestamp: "2026-07-30T05:22:31Z", error_code: "", event_message: "request completed" }]);
  if (accepted.dispositions[0] !== "request-accepted" || accepted.coarseHours[0] !== "2026-07-30T05:00Z") fail();
  const limited = sanitizeAuthDiagnostic([{ path: "/auth/v1/otp", status_code: 429, timestamp: "2026-07-30T05:59:59Z", error_code: "over_email_send_rate_limit", event_message: "request rejected" }]);
  if (limited.dispositions[0] !== "rate-limited") fail();
  for (const unsafe of [
    [{ path: "/auth/v1/otp", status_code: 200, timestamp: "2026-07-30T05:22:31Z", event_message: ["user", "example.invalid"].join("@") }],
    [{ path: "/auth/v1/otp", status_code: 200, timestamp: "2026-07-30T05:22:31Z", event_message: ["00000000", "0000", "4000", "8000", "000000000000"].join("-") }],
    [{ path: "/auth/v1/otp", status_code: 200, timestamp: "2026-07-30T05:22:31Z", unexpected: "field" }],
    [{ path: "/auth/v1/admin/users/value", status_code: 200, timestamp: "2026-07-30T05:22:31Z" }],
  ]) { let refused = false; try { sanitizeAuthDiagnostic(unsafe); } catch { refused = true; } if (!refused) fail(); }
  process.stdout.write(`${JSON.stringify({ diagnostic: "035D-auth", state: "self-test-pass", checks: ["allowlist-only", "coarse-time", "email-refusal", "identifier-refusal", "token-header-refusal", "unexpected-field-refusal", "arbitrary-path-refusal", "no-raw-output"] })}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv[2] === "--self-test" || !process.argv[2]) selfTest();
    else if (process.argv[2] === "--stdin") process.stdout.write(`${JSON.stringify(sanitizeAuthDiagnostic(JSON.parse(readFileSync(0, "utf8"))))}\n`);
    else fail();
  } catch { process.stdout.write(`${JSON.stringify({ diagnostic: "035D-auth", state: "failed-closed" })}\n`); process.exitCode = 2; }
}
