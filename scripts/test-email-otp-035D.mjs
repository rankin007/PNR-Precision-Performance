import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { classifyOtpRequestError } from "../lib/auth/otp-request.ts";

const actions = readFileSync("app/auth/actions.ts", "utf8");
const form = readFileSync("components/auth/sign-in-form.tsx", "utf8");
const callback = readFileSync("app/auth/callback/route.ts", "utf8");
const preparation = readFileSync("scripts/protected-synthetic-otp-035D.mjs", "utf8");
const diagnostic = readFileSync("scripts/sanitize-auth-diagnostic-035D.mjs", "utf8");

assert(actions.includes("shouldCreateUser: false"));
assert(actions.includes('verifyOtp({ email, token, type: "email" })'));
assert(actions.includes("const email = emailInput.trim()"));
assert(!actions.includes("split(\"+\")"));
assert(!actions.includes("emailInput.toLowerCase().replace"));
assert.equal(classifyOtpRequestError(null), "indeterminate");
assert.equal(classifyOtpRequestError({ code: "user_not_found", status: 404 }), "indeterminate");
assert.equal(classifyOtpRequestError({ code: "over_email_send_rate_limit", status: 429 }), "retry-later");
assert.equal(classifyOtpRequestError({ code: "over_request_rate_limit", status: 429 }), "retry-later");
assert.equal(classifyOtpRequestError({ code: "unexpected_failure", status: 500 }), "retry-later");
assert.equal(classifyOtpRequestError({ code: "opaque_provider_detail", status: 503 }), "retry-later");
assert.equal(classifyOtpRequestError({ code: "otp_disabled", status: 403 }), "retry-later");
assert(actions.includes('reason: "retry-later"'));
assert(!actions.includes("error.message"));
assert(!actions.includes("console."));
assert(actions.includes("if (!data.session || !data.user)") || actions.includes("error || !data.session || !data.user"));

assert(form.includes('autoComplete="one-time-code"'));
assert(form.includes('inputMode="numeric"'));
assert(form.includes('pattern="[0-9]{6}"'));
assert(form.includes("requestEmailOtpAction(email, nextPath)"));
assert(form.includes("verifyEmailOtpAction(email, code)"));
assert(form.includes("router.replace(nextPath)"));
assert(form.includes("a code may arrive shortly"));
assert(form.includes("Sign-in is temporarily unavailable"));
assert(!form.includes("has been sent"));
assert(!form.includes("localStorage"));
assert(!form.includes("sessionStorage"));
assert(!form.includes("URLSearchParams"));

assert(callback.includes("exchangeCodeForSession(code)"));
assert(callback.includes("if (authError)"));
assert(preparation.includes("admin.auth.admin.createUser(mutation)"));
assert(preparation.includes("email_confirm: true"));
assert(!preparation.includes("inviteUserByEmail"));
assert(!preparation.includes("generateLink"));
assert(preparation.includes("PREEXISTING_IDENTITY_REFUSED"));
assert(preparation.includes("OWNERSHIP_AMBIGUOUS"));
assert(diagnostic.includes("PROTECTED_PATTERN"));
assert(diagnostic.includes("DIAGNOSTIC_FORMAT_REFUSED"));

console.log("Sprint 035D email OTP source-contract tests passed.");
