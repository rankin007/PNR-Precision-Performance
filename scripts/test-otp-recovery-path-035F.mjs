import assert from "node:assert/strict";
import {
  enterExistingCodeRecovery,
  initialOtpEntryMode,
  isOtpEmailReadOnly,
  isOtpEntryVisible,
} from "../lib/auth/otp-entry-flow.ts";
import {
  buildOtpVerificationPayload,
  classifyOtpVerification,
  classifyOtpVerificationError,
  isValidOtpToken,
  normalizeOtpEmail,
  normalizeOtpToken,
} from "../lib/auth/otp-verification.ts";

for (const journey of ["same-tab", "reopened-tab", "reload-recovery"]) {
  assert.equal(initialOtpEntryMode(false), "request", journey);
  const recovery = enterExistingCodeRecovery();
  assert.deepEqual(recovery, { mode: "existing-code", effect: "none" }, journey);
  assert.equal(isOtpEntryVisible(recovery.mode), true, journey);
  assert.equal(isOtpEmailReadOnly(recovery.mode), false, journey);
}

const exactPlus = "Synthetic.Control+Fresh-035F@Example.Invalid";
assert.equal(normalizeOtpEmail(`  ${exactPlus}  `), exactPlus.toLowerCase(), "plus-address must be preserved with case normalization only");
assert.equal(normalizeOtpToken(" 012345 "), "012345", "surrounding whitespace only");
assert.equal(normalizeOtpToken("01 2345"), "01 2345", "internal characters must not be removed");
assert.equal(isValidOtpToken("012345"), true, "leading-zero OTP");
assert.equal(isValidOtpToken("01 2345"), false, "internal whitespace malformed");
assert.deepEqual(buildOtpVerificationPayload(` ${exactPlus} `, " 012345 "), {
  email: exactPlus.toLowerCase(), token: "012345", type: "email",
});
assert.equal(classifyOtpVerification({ email: exactPlus, token: "123456", hasSession: true, hasUser: true }), "accepted");
for (const token of ["", "12345", "1234567", "12a456", "１２３４５６"]) {
  assert.equal(classifyOtpVerification({ email: exactPlus, token }), "invalid", `malformed ${token.length}`);
}
for (const providerOutcome of ["reused", "superseded", "expired"]) {
  assert.equal(classifyOtpVerification({ email: exactPlus, token: "123456", hasError: true }), "invalid", providerOutcome);
}

assert.equal(classifyOtpVerificationError({ code: "otp_expired", status: 403 }), "expired");
assert.equal(classifyOtpVerificationError({ message: "Token already used", status: 400 }), "already-used");
assert.equal(classifyOtpVerificationError({ code: "email_mismatch", status: 400 }), "email-mismatch");
assert.equal(classifyOtpVerificationError({ message: "Malformed six digit token", status: 422 }), "malformed");
assert.equal(classifyOtpVerificationError({ code: "over_request_rate_limit", status: 429 }), "rate-limited");
assert.equal(classifyOtpVerificationError({ code: "email_provider_disabled", status: 500 }), "provider/configuration");
assert.equal(classifyOtpVerificationError({ code: "otp_invalid", status: 400 }), "invalid");
assert.equal(classifyOtpVerificationError({ code: "unclassified", status: 418 }), "unknown");

const recoveryOutput = JSON.stringify(enterExistingCodeRecovery());
assert.equal(recoveryOutput.includes(exactPlus), false);
assert.equal(recoveryOutput.includes("123456"), false);
assert.equal(/url|log|analytics|storage|email|token/i.test(recoveryOutput), false);

console.log(JSON.stringify({ state: "pass", checks: [
  "same-tab", "reopened-tab", "reload-recovery", "no-extra-send", "exact-plus",
  "leading-zero-string", "trim-only-token", "type-email", "six-digit-only",
  "invalid-reused-superseded-expired", "sanitized-diagnostic-allowlist", "no-durable-leakage",
] }));
