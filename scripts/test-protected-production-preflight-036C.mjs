import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  AUTH_CONFIG_URL,
  MAX_RESPONSE_BYTES,
  PROHIBITED_PROJECT_REF,
  PROVIDER_OUTPUT_KEYS,
  evaluateAuthConfig,
  runProviderConfig,
  sanitizeFailure,
  validateExactEndpoint,
} from "./protected-production-preflight-036C-core.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };
const throwsCode = (operation, code) => {
  assertions += 1;
  assert.throws(operation, (error) => error?.code === code);
};

const fixedNow = () => new Date("2026-08-04T00:00:00.000Z");
const passPayload = () => ({
  site_url: "https://precisionperformance.com.au",
  uri_allow_list: "https://precisionperformance.com.au/auth/callback",
  smtp_admin_email: "no-reply@precisionperformance.com.au",
  smtp_host: "smtp.resend.com",
  smtp_max_frequency: 60,
  smtp_pass: "synthetic-configured-value",
  smtp_port: "465",
  smtp_user: "resend",
  mailer_templates_magic_link_content: "<p>Your code is {{ .Token }}</p>",
  mailer_otp_exp: 3600,
  mailer_otp_length: 6,
});

function jsonResponse(payload, init = {}) {
  return new Response(JSON.stringify(payload), {
    status: init.status ?? 200,
    statusText: init.statusText,
    headers: { "content-type": "application/json", ...(init.headers || {}) },
  });
}

function expectEvaluation(mutate, code) {
  const payload = passPayload();
  mutate(payload);
  const result = evaluateAuthConfig(payload, fixedNow);
  equal(result.output.state, "failed-sanitized", `${code} must fail sanitized`);
  equal(result.code, code, `${code} must retain only its fixed internal classification`);
  deepEqual(Object.keys(result.output).sort(), PROVIDER_OUTPUT_KEYS, `${code} output keys must remain exact`);
  return result;
}

const exact = evaluateAuthConfig(passPayload(), fixedNow);
equal(exact.code, "NONE");
equal(exact.output.state, "pass");
equal(exact.output.target, "exact-approved");
equal(exact.output.timestampUtc, "2026-08-04T00:00:00.000Z");
equal(exact.output.callbackCount, 1);
equal(exact.output.wildcardCount, 0);
equal(exact.output.templateTokenCount, 1);
equal(exact.output.confirmationUrlCount, 0);
equal(exact.output.templateLinkCount, 0);
equal(exact.output.authUsersEnumerated, false);
equal(exact.output.remoteMutation, "none");
equal(exact.output.protectedValuesEmitted, false);
deepEqual(Object.keys(exact.output).sort(), PROVIDER_OUTPUT_KEYS);

equal(validateExactEndpoint(AUTH_CONFIG_URL), AUTH_CONFIG_URL);
throwsCode(
  () => validateExactEndpoint(`https://api.supabase.com/v1/projects/${PROHIBITED_PROJECT_REF}/config/auth`),
  "PROHIBITED_TARGET_REFUSED",
);
throwsCode(() => validateExactEndpoint("https://api.supabase.com/v1/projects/another/config/auth"), "TARGET_REFUSED");
throwsCode(() => validateExactEndpoint(`${AUTH_CONFIG_URL}?unsafe=true`), "TARGET_REFUSED");

expectEvaluation((payload) => { payload.site_url = "https://wrong.example.test"; }, "SITE_URL_MISMATCH");
expectEvaluation((payload) => { payload.uri_allow_list = ""; }, "CALLBACK_SET_MISMATCH");
expectEvaluation((payload) => { payload.uri_allow_list += ",https://extra.example.test/auth/callback"; }, "CALLBACK_SET_MISMATCH");
expectEvaluation((payload) => { payload.uri_allow_list = "https://*.example.test/auth/callback"; }, "CALLBACK_SET_MISMATCH");
expectEvaluation((payload) => { payload.smtp_pass = ""; }, "SMTP_CONFIG_MISSING");
expectEvaluation((payload) => { payload.smtp_host = "smtp.other.example.test"; }, "SMTP_PROVIDER_MISMATCH");
expectEvaluation((payload) => { payload.smtp_admin_email = "wrong@example.test"; }, "SENDER_MISMATCH");
expectEvaluation((payload) => { payload.mailer_templates_magic_link_content = "No token"; }, "TEMPLATE_TOKEN_COUNT_MISMATCH");
expectEvaluation((payload) => { payload.mailer_templates_magic_link_content = "{{ .Token }} {{.Token}}"; }, "TEMPLATE_TOKEN_COUNT_MISMATCH");
expectEvaluation((payload) => { payload.mailer_templates_magic_link_content = "{{ .Token }} {{ .ConfirmationURL }}"; }, "CONFIRMATION_URL_PRESENT");
expectEvaluation((payload) => { payload.mailer_templates_magic_link_content = "{{ .Token }} <a href=\"/unsafe\">open</a>"; }, "TEMPLATE_LINK_PRESENT");
expectEvaluation((payload) => { payload.mailer_otp_length = 8; }, "OTP_LENGTH_MISMATCH");
expectEvaluation((payload) => { payload.mailer_otp_exp = 1800; }, "OTP_EXPIRY_MISMATCH");
expectEvaluation((payload) => { payload.smtp_max_frequency = 30; }, "SMTP_FREQUENCY_MISMATCH");
expectEvaluation((payload) => { delete payload.site_url; }, "CONFIG_SCHEMA_REFUSED");
expectEvaluation((payload) => { payload.mailer_otp_exp = "3600"; }, "CONFIG_SCHEMA_REFUSED");

let requestUrl = null;
let requestOptions = null;
const transportPass = await runProviderConfig({
  credential: "synthetic-management-canary",
  now: fixedNow,
  fetchImpl: async (url, options) => {
    requestUrl = url;
    requestOptions = options;
    return jsonResponse(passPayload());
  },
});
equal(transportPass.output.state, "pass");
equal(requestUrl, AUTH_CONFIG_URL);
equal(requestOptions.method, "GET");
equal(requestOptions.redirect, "manual");
equal(requestOptions.headers.accept, "application/json");
equal(requestOptions.headers.authorization, "Bearer synthetic-management-canary");

const non200 = await runProviderConfig({ credential: "synthetic", now: fixedNow, fetchImpl: async () => jsonResponse({}, { status: 401 }) });
equal(non200.code, "HTTP_STATUS_REFUSED");
equal(non200.output.state, "failed-sanitized");
const redirect = await runProviderConfig({ credential: "synthetic", now: fixedNow, fetchImpl: async () => new Response(null, { status: 302, headers: { location: "https://unsafe.example.test" } }) });
equal(redirect.code, "HTTP_REDIRECT_REFUSED");
const oversized = await runProviderConfig({
  credential: "synthetic",
  now: fixedNow,
  fetchImpl: async () => new Response("{}", { status: 200, headers: { "content-type": "application/json", "content-length": String(MAX_RESPONSE_BYTES + 1) } }),
});
equal(oversized.code, "RESPONSE_TOO_LARGE");
const nonJson = await runProviderConfig({ credential: "synthetic", now: fixedNow, fetchImpl: async () => new Response("not-json", { status: 200, headers: { "content-type": "text/plain" } }) });
equal(nonJson.code, "NON_JSON_REFUSED");
const invalidJson = await runProviderConfig({ credential: "synthetic", now: fixedNow, fetchImpl: async () => new Response("{", { status: 200, headers: { "content-type": "application/json" } }) });
equal(invalidJson.code, "INVALID_JSON_REFUSED");
const noBody = await runProviderConfig({ credential: "synthetic", now: fixedNow, fetchImpl: async () => new Response(null, { status: 200, headers: { "content-type": "application/json" } }) });
equal(noBody.code, "RESPONSE_BODY_UNAVAILABLE");
const missingCredential = await runProviderConfig({ credential: "", now: fixedNow, fetchImpl: async () => jsonResponse(passPayload()) });
equal(missingCredential.code, "MANAGEMENT_CREDENTIAL_MISSING");

const canaries = [
  "canary-person@example.test",
  "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  "eyJhbGciOiJIUzI1NiJ9.canary.signature",
  "password=canary-private-value",
  "Bearer canary-bearer-value",
  "smtp-pass-canary-value",
  "identity-name-canary-value",
];
const canaryPayload = passPayload();
canaryPayload.unexpected_identity_rows = canaries;
const projectedCanaries = evaluateAuthConfig(canaryPayload, fixedNow);
const projectedText = JSON.stringify(projectedCanaries.output);
for (const canary of canaries) check(!projectedText.includes(canary), `payload canary escaped: ${canary}`);
const thrownCanaries = await runProviderConfig({
  credential: "synthetic",
  now: fixedNow,
  fetchImpl: async () => { throw new Error(canaries.join("|")); },
});
equal(thrownCanaries.code, "TRANSPORT_FAILED_SANITIZED");
const thrownText = JSON.stringify(thrownCanaries.output);
for (const canary of canaries) check(!thrownText.includes(canary), `error canary escaped: ${canary}`);
equal(sanitizeFailure(new Error(canaries.join("|"))), "UNEXPECTED");

const coreSource = readFileSync("scripts/protected-production-preflight-036C-core.mjs", "utf8");
const wrapperSource = readFileSync("scripts/Invoke-ProtectedProductionPreflight036C.ps1", "utf8");
const pilotSource = readFileSync("scripts/live-trainer-access-035K-core.mjs", "utf8");
equal((coreSource.match(new RegExp(AUTH_CONFIG_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length, 1);
check(coreSource.includes('method: "GET"'));
check(coreSource.includes('redirect: "manual"'));
check(coreSource.includes("MAX_RESPONSE_BYTES"));
for (const forbidden of ['method: "PATCH"', 'method: "POST"', 'method: "PUT"', 'method: "DELETE"', "/auth/v1/admin", "/users", "listUsers", "perPage", "Dashboard"]) {
  check(!coreSource.includes(forbidden), `forbidden live surface present: ${forbidden}`);
}
check(!coreSource.includes("console.log"));

check(wrapperSource.includes("C:\\Users\\rrank\\OneDrive\\PNR Precision Performance Canonical"));
check(wrapperSource.includes("codex/036C-protected-production-preflight-and-live-trainer-acceptance"));
check(wrapperSource.includes("ValidateSet('SelfTest', 'ProviderConfig', 'RetainedPilotVerify')"));
check(wrapperSource.includes("Read-Host 'Protected Supabase Management API bearer credential' -AsSecureString"));
check(wrapperSource.includes("Read-Host 'Protected Supabase service-role value' -AsSecureString"));
check(wrapperSource.includes("[Console]::IsInputRedirected"));
check(wrapperSource.includes("[Console]::IsOutputRedirected"));
check(wrapperSource.includes("[Console]::IsErrorRedirected"));
check(wrapperSource.includes("Test-Transcription036C"));
check(wrapperSource.includes("PP036C_MANAGEMENT_API_TOKEN"));
check(wrapperSource.includes("PP035K_SERVICE_ROLE_KEY"));
check(wrapperSource.includes("ZeroFreeBSTR"));
check(wrapperSource.includes(".Dispose()"));
check(!wrapperSource.includes("TesterEmail"));
check(!wrapperSource.includes("OtpCode"));

equal(createHash("sha256").update(pilotSource).digest("hex").toUpperCase(), "603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A");
check(pilotSource.includes("uvskssaecdhxcgytkasc"));
check(pilotSource.includes("tagnbgkroihagjmvehlx"));
check(pilotSource.includes("hiddenInput"));
check(pilotSource.includes("getUserById"));
check(pilotSource.includes("--verify"));
check(pilotSource.includes("FIXTURE_AGREEMENT_FAILED"));
check(pilotSource.includes("wrongHorseRows"));
check(!pilotSource.includes("listUsers"));
check(!pilotSource.includes("perPage"));

check(assertions >= 48, `expected at least 48 assertions, received ${assertions}`);
console.log(`Sprint 036C protected production preflight deterministic tests passed (${assertions} assertions).`);
