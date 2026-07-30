import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const actions = readFileSync("app/auth/actions.ts", "utf8");
const form = readFileSync("components/auth/sign-in-form.tsx", "utf8");
const callback = readFileSync("app/auth/callback/route.ts", "utf8");

assert(actions.includes("shouldCreateUser: false"));
assert(actions.includes('verifyOtp({ email, token, type: "email" })'));
assert(actions.includes("const email = emailInput.trim()"));
assert(!actions.includes("split(\"+\")"));
assert(!actions.includes("emailInput.toLowerCase().replace"));
assert(actions.includes("if (error) return { ok: true }"));
assert(actions.includes("if (!data.session || !data.user)") || actions.includes("error || !data.session || !data.user"));

assert(form.includes('autoComplete="one-time-code"'));
assert(form.includes('inputMode="numeric"'));
assert(form.includes('pattern="[0-9]{6}"'));
assert(form.includes("requestEmailOtpAction(email, nextPath)"));
assert(form.includes("verifyEmailOtpAction(email, code)"));
assert(form.includes("router.replace(nextPath)"));
assert(!form.includes("localStorage"));
assert(!form.includes("sessionStorage"));
assert(!form.includes("URLSearchParams"));

assert(callback.includes("exchangeCodeForSession(code)"));
assert(callback.includes("if (authError)"));

console.log("Sprint 035D email OTP source-contract tests passed.");
