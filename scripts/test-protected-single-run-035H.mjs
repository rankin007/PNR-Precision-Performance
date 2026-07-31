import assert from "node:assert/strict";
import { classifyMailbox, createLedger, normalizeVerification, restartDisposition, sanitizeReport, STATES, transition } from "./protected-single-run-035H-core.mjs";

const base = createLedger({ runId: "035H-TEST-ABC123", project: "approved", preview: "exact", recipientKeyedMaterial: "keyed-fixture" });
let l = transition(base, "prepared", { ownedAuthId: "00000000-0000-4000-8000-000000000035" });
l = transition(l, "send-reserved"); assert.equal(l.requestCount, 1); assert.equal(restartDisposition(l), "cleanup-only");
assert.throws(() => transition(l, "send-reserved"), /TRANSITION/);
l = transition(l, "send-observed"); l = transition(l, "message-acquired"); l = transition(l, "verification-reserved");
assert.equal(l.verificationCount, 1); assert.equal(restartDisposition(l), "cleanup-only"); assert.throws(() => transition(l, "verification-reserved"), /TRANSITION/);
l = transition(l, "verification-observed"); l = transition(l, "cleanup-required"); l = transition(l, "clean", { cleanup: { application: 0, auth: 0, storage: 0, authLast: true } });
assert.equal(restartDisposition(l), "closed"); assert.equal(STATES.length, 10);

const expected = { recipient: "runner+fixture@example.invalid", sender: "expected@example.invalid", since: 100, until: 200 };
const valid = { recipient: expected.recipient, sender: expected.sender, branch: "otp", receivedAt: 150, body: "Code 012345" };
assert.deepEqual(classifyMailbox([valid], expected), { classification: "intended-otp", code: "012345" });
for (const [messages, classification] of [
  [[], "timeout-or-no-match"], [[{ ...valid, receivedAt: 99 }], "timeout-or-no-match"],
  [[{ ...valid, recipient: "runner@example.invalid" }], "timeout-or-no-match"], [[{ ...valid, recipient: "runner+other@example.invalid" }], "timeout-or-no-match"],
  [[{ ...valid, sender: "wrong@example.invalid" }], "timeout-or-no-match"], [[valid, { ...valid }], "ambiguous-message"],
  [[{ ...valid, body: "012345 and 123456" }], "ambiguous-code"], [[{ ...valid, body: "no code" }], "malformed-content"],
  [[{ ...valid, body: "012345 https://example.invalid" }], "linked-content-refused"], [[{ ...valid, body: "Invitation 012345" }], "wrong-branch"],
  [null, "provider-error"],
]) assert.equal(classifyMailbox(messages, expected).classification, classification);

assert.deepEqual(normalizeVerification(" Runner+Fixture@Example.Invalid ", " 012345 "), { email: "runner+fixture@example.invalid", token: "012345", type: "email" });
for (const token of ["12345", "1234567", "12 345", "abcdef"]) assert.throws(() => normalizeVerification(expected.recipient, token), /TOKEN_REFUSED/);
assert.throws(() => normalizeVerification("runner@example.invalid", "012345"), /EMAIL_REFUSED/);
assert.throws(() => sanitizeReport({ outcome: "x", address: expected.recipient }), /REPORT_FIELD_REFUSED/);
assert.throws(() => sanitizeReport({ outcome: "x", mailbox: "012345" }), /PROTECTED_PATTERN/);
console.log(JSON.stringify({ state: "pass", checks: 32, liveActions: 0, protectedFixtures: 0 }));
