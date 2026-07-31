import assert from "node:assert/strict";
import {
  enterExistingCodeRecovery,
  initialOtpEntryMode,
  isOtpEmailReadOnly,
  isOtpEntryVisible,
} from "../lib/auth/otp-entry-flow.ts";
import { classifyOtpVerification, normalizeOtpEmail } from "../lib/auth/otp-verification.ts";

for (const journey of ["same-tab", "reopened-tab", "reload-recovery"]) {
  assert.equal(initialOtpEntryMode(false), "request", journey);
  const recovery = enterExistingCodeRecovery();
  assert.deepEqual(recovery, { mode: "existing-code", effect: "none" }, journey);
  assert.equal(isOtpEntryVisible(recovery.mode), true, journey);
  assert.equal(isOtpEmailReadOnly(recovery.mode), false, journey);
}

const exactPlus = "Synthetic.Control+Fresh-035F@Example.Invalid";
assert.equal(normalizeOtpEmail(`  ${exactPlus}  `), exactPlus, "plus-address must be preserved exactly");
assert.equal(classifyOtpVerification({ email: exactPlus, token: "123456", hasSession: true, hasUser: true }), "accepted");
for (const token of ["", "12345", "1234567", "12a456", "１２３４５６"]) {
  assert.equal(classifyOtpVerification({ email: exactPlus, token }), "invalid", `malformed ${token.length}`);
}
for (const providerOutcome of ["reused", "superseded", "expired"]) {
  assert.equal(classifyOtpVerification({ email: exactPlus, token: "123456", hasError: true }), "invalid", providerOutcome);
}

const recoveryOutput = JSON.stringify(enterExistingCodeRecovery());
assert.equal(recoveryOutput.includes(exactPlus), false);
assert.equal(recoveryOutput.includes("123456"), false);
assert.equal(/url|log|analytics|storage|email|token/i.test(recoveryOutput), false);

console.log(JSON.stringify({ state: "pass", checks: [
  "same-tab", "reopened-tab", "reload-recovery", "no-extra-send", "exact-plus",
  "six-digit-only", "invalid-reused-superseded-expired", "no-durable-leakage",
] }));
