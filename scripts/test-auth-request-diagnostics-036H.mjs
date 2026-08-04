import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  classifyOtpRequestDiagnostic,
  classifyOtpRequestError,
} from "../lib/auth/otp-request.ts";

let assertions = 0;
const check = (value, message) => {
  assertions += 1;
  assert(value, message);
};
const equal = (actual, expected, message) => {
  assertions += 1;
  assert.equal(actual, expected, message);
};

const knownMappings = [
  ["over_email_send_rate_limit", "cooldown"],
  ["over_request_rate_limit", "cooldown"],
  ["email_address_not_authorized", "delivery-policy"],
  ["email_provider_disabled", "provider-configuration"],
  ["otp_disabled", "provider-configuration"],
  ["hook_timeout", "transport-timeout"],
  ["hook_timeout_after_retry", "transport-timeout"],
  ["request_timeout", "transport-timeout"],
  ["unexpected_failure", "provider-unavailable"],
];

for (const [code, diagnostic] of knownMappings) {
  equal(classifyOtpRequestDiagnostic({ code, status: 400 }), diagnostic, code);
}
equal(classifyOtpRequestDiagnostic({ code: "OVER_EMAIL_SEND_RATE_LIMIT", status: 400 }), "cooldown", "code normalization: rate limit");
equal(classifyOtpRequestDiagnostic({ code: "Hook_Timeout", status: 400 }), "transport-timeout", "code normalization: timeout");

equal(classifyOtpRequestDiagnostic({ code: "over_request_rate_limit", status: 503 }), "cooldown", "cooldown code wins");
equal(classifyOtpRequestDiagnostic({ code: "email_address_not_authorized", status: 429 }), "delivery-policy", "delivery code wins");
equal(classifyOtpRequestDiagnostic({ code: "otp_disabled", status: 503 }), "provider-configuration", "configuration code wins");
equal(classifyOtpRequestDiagnostic({ code: "request_timeout", status: 429 }), "transport-timeout", "timeout code wins");
equal(classifyOtpRequestDiagnostic({ code: "unexpected_failure", status: 429 }), "provider-unavailable", "unavailable code wins");

equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 429 }), "cooldown", "429 fallback");
equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 500 }), "provider-unavailable", "500 fallback");
equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 503 }), "provider-unavailable", "503 fallback");

equal(classifyOtpRequestDiagnostic(null), undefined, "no error");
equal(classifyOtpRequestDiagnostic({ code: "user_not_found", status: 404 }), undefined, "missing identity");
equal(classifyOtpRequestDiagnostic({ code: "identity_not_found", status: 404 }), undefined, "missing provider identity");
equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 400 }), undefined, "unknown 400");
equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 401 }), undefined, "unknown 401");
equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 403 }), undefined, "unknown 403");
equal(classifyOtpRequestDiagnostic({ code: "unknown", status: 422 }), undefined, "unknown 422");
equal(classifyOtpRequestDiagnostic({ code: 429, status: 400 }), undefined, "non-string code");
assert.equal(assertions, 27, "taxonomy and precedence assertion target");

for (const [code] of knownMappings) {
  equal(classifyOtpRequestError({ code, status: 400 }), "retry-later", `retained disposition: ${code}`);
}
equal(classifyOtpRequestError(null), "indeterminate", "retained no-error disposition");
equal(classifyOtpRequestError({ code: "user_not_found", status: 404 }), "indeterminate", "retained missing-identity disposition");
equal(classifyOtpRequestError({ code: "unknown", status: 429 }), "retry-later", "retained 429 disposition");
equal(classifyOtpRequestError({ code: "unknown", status: 503 }), "retry-later", "retained 5xx disposition");
assert.equal(assertions, 40, "retained-disposition assertion target");

const actions = readFileSync("app/auth/actions.ts", "utf8");
const requestActionStart = actions.indexOf("export async function requestEmailOtpAction");
const verifyActionStart = actions.indexOf("export async function verifyEmailOtpAction");
const requestAction = actions.slice(requestActionStart, verifyActionStart);
const verifyAction = actions.slice(verifyActionStart);

check(actions.includes("classifyOtpRequestDiagnostic,"), "action imports request classifier");
check(actions.includes("type OtpRequestDiagnostic,"), "action imports allowlisted type");
check(actions.includes('| { ok: false; reason: "retry-later"; requestDiagnostic?: OtpRequestDiagnostic };'), "retry result is separately typed");
check(!actions.includes('reason: "configuration" | "invalid" | "retry-later"'), "other failures cannot carry request diagnostic");
check(requestAction.includes("requestDiagnostic: classifyOtpRequestDiagnostic(error)"), "retry branch derives allowlisted diagnostic");
equal((actions.match(/\brequestDiagnostic\b/g) ?? []).length, 2, "request diagnostic field has only type and return sites");
check(requestAction.indexOf("classifyOtpRequestError(error)") < requestAction.indexOf("classifyOtpRequestDiagnostic(error)"), "public disposition gates diagnostic");
check(requestAction.includes("shouldCreateUser: false"), "existing account-only behavior remains");
equal((requestAction.match(/supabase\.auth\.signInWithOtp/g) ?? []).length, 1, "no additional request call");
check(!actions.includes("error.message"), "raw provider message is not inspected");
check(!actions.includes("console."), "action emits no console diagnostic");
check(!verifyAction.includes("requestDiagnostic"), "verification results carry no request diagnostic");
assert.equal(assertions, 52, "server-action assertion target");

const form = readFileSync("components/auth/sign-in-form.tsx", "utf8");
const requestCodeStart = form.indexOf("function requestCode()");
const verifyCodeStart = form.indexOf("function verifyCode()");
const renderStart = form.indexOf("\n  return (\n", verifyCodeStart);
const requestCode = form.slice(requestCodeStart, verifyCodeStart);
const verifyCode = form.slice(verifyCodeStart, renderStart);
const retryCopy = 'const requestRetryLaterMessage = "Sign-in is temporarily unavailable. Wait before requesting another code.";';
const mayArriveCopy = 'const requestMayArriveMessage = "If this email can sign in, a code may arrive shortly. Wait before requesting another code.";';

check(form.includes(retryCopy), "visible retry-later copy remains exact");
check(form.includes(mayArriveCopy), "visible may-arrive copy remains exact");
check(form.includes("useState<OtpRequestDiagnostic | null>(null)"), "diagnostic is ephemeral component state");
check(requestCode.indexOf("setRequestDiagnostic(null)") < requestCode.indexOf("startTransition"), "new request clears diagnostic first");
check(requestCode.indexOf("setRequestDiagnostic(result.requestDiagnostic ?? null)") < requestCode.indexOf("setMessage(requestRetryLaterMessage)"), "retry result sets allowlisted marker state");
check(verifyCode.indexOf("setRequestDiagnostic(null)") < verifyCode.indexOf("startTransition"), "verification clears request diagnostic first");
check(form.includes("setEmail(event.target.value); setRequestDiagnostic(null);"), "different email clears diagnostic");
check(form.includes('setEntryMode("request"); setCode(""); setMessage(null); setRequestDiagnostic(null);'), "request reset clears diagnostic");
check(form.includes('setEntryMode(enterExistingCodeRecovery().mode); setCode(""); setMessage(null); setRequestDiagnostic(null);'), "existing-code recovery clears diagnostic");
check((form.match(/setRequestDiagnostic\(null\)/g) ?? []).length >= 5, "all flow transitions include clearing paths");
equal((form.match(/data-auth-request-diagnostic/g) ?? []).length, 1, "exactly one diagnostic marker exists");
check(form.includes("message === requestRetryLaterMessage && requestDiagnostic"), "marker exists only for active retry-later notice");
check(form.includes("<span hidden data-auth-request-diagnostic={requestDiagnostic} />"), "marker is non-visible");
check(form.includes("data-auth-request-diagnostic={requestDiagnostic}"), "marker value is the allowlisted state");
check(/<span hidden data-auth-request-diagnostic=\{requestDiagnostic\} \/>/.test(form), "marker renders no category text");
check(!knownMappings.some(([, diagnostic]) => form.includes(`"${diagnostic}"`)), "form contains no visible category literals");
check(!/console\.|analytics|localStorage|sessionStorage|document\.cookie|URLSearchParams|location\.search/.test(form), "diagnostic has no persistence or telemetry path");
check(!/aria-(?:label|describedby)=[^\n]*requestDiagnostic/.test(form), "diagnostic does not alter accessible naming");
assert.equal(assertions, 70, "Sprint 036H exact assertion target");

console.log(`Sprint 036H auth request diagnostic tests passed (${assertions} assertions).`);
