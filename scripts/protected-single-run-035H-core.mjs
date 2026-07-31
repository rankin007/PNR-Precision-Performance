import { createHash } from "node:crypto";

export const STATES = Object.freeze([
  "preflight", "prepared", "send-reserved", "send-observed", "message-acquired",
  "verification-reserved", "verification-observed", "cleanup-required", "clean", "recovery",
]);

const NEXT = Object.freeze({
  preflight: ["prepared", "cleanup-required", "clean"],
  prepared: ["send-reserved", "cleanup-required"],
  "send-reserved": ["send-observed", "cleanup-required", "recovery"],
  "send-observed": ["message-acquired", "cleanup-required", "recovery"],
  "message-acquired": ["verification-reserved", "cleanup-required", "recovery"],
  "verification-reserved": ["verification-observed", "cleanup-required", "recovery"],
  "verification-observed": ["cleanup-required"],
  "cleanup-required": ["clean", "recovery"],
  recovery: ["cleanup-required", "clean"],
  clean: [],
});

export function assertLedger(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("LEDGER_FORMAT_REFUSED");
  const allowed = new Set(["version", "runId", "projectDigest", "previewDigest", "recipientDigest", "ownedAuthId", "state", "requestCount", "verificationCount", "cleanup"]);
  for (const key of Object.keys(value)) if (!allowed.has(key)) throw new Error("LEDGER_FIELD_REFUSED");
  if (value.version !== 1 || !STATES.includes(value.state)) throw new Error("LEDGER_STATE_REFUSED");
  if (!/^035H-[A-Z0-9-]{6,40}$/.test(value.runId || "")) throw new Error("LEDGER_RUN_REFUSED");
  for (const key of ["projectDigest", "previewDigest", "recipientDigest"]) if (!/^[a-f0-9]{64}$/.test(value[key] || "")) throw new Error("LEDGER_DIGEST_REFUSED");
  if (!Number.isInteger(value.requestCount) || !Number.isInteger(value.verificationCount) || value.requestCount < 0 || value.requestCount > 1 || value.verificationCount < 0 || value.verificationCount > 1) throw new Error("LEDGER_COUNT_REFUSED");
  if (["send-reserved", "send-observed", "message-acquired", "verification-reserved", "verification-observed"].includes(value.state) && value.requestCount !== 1) throw new Error("LEDGER_SEND_INVARIANT_REFUSED");
  if (["verification-reserved", "verification-observed"].includes(value.state) && value.verificationCount !== 1) throw new Error("LEDGER_VERIFICATION_INVARIANT_REFUSED");
  return Object.freeze(structuredClone(value));
}

export function transition(ledger, state, patch = {}) {
  const current = assertLedger(ledger);
  if (!NEXT[current.state].includes(state)) throw new Error("LEDGER_TRANSITION_REFUSED");
  const next = { ...current, ...patch, state };
  if (state === "send-reserved") next.requestCount = 1;
  if (state === "verification-reserved") next.verificationCount = 1;
  return assertLedger(next);
}

export const digest = (value) => createHash("sha256").update(String(value), "utf8").digest("hex");

export function createLedger({ runId, project, preview, recipientKeyedMaterial }) {
  return assertLedger({ version: 1, runId, projectDigest: digest(project), previewDigest: digest(preview), recipientDigest: digest(recipientKeyedMaterial), ownedAuthId: null, state: "preflight", requestCount: 0, verificationCount: 0, cleanup: { application: null, auth: null, storage: null, authLast: false } });
}

export function restartDisposition(ledger) {
  const state = assertLedger(ledger).state;
  return ["send-reserved", "send-observed", "message-acquired", "verification-reserved", "verification-observed", "cleanup-required", "recovery"].includes(state) ? "cleanup-only" : state === "clean" ? "closed" : "pre-send";
}

export function classifyMailbox(messages, expected) {
  if (!Array.isArray(messages)) return { classification: "provider-error" };
  const candidates = messages.filter((m) => Number.isFinite(m.receivedAt) && m.receivedAt >= expected.since && m.receivedAt <= expected.until && m.recipient === expected.recipient && m.sender === expected.sender && m.branch === "otp");
  if (candidates.length === 0) return { classification: "timeout-or-no-match" };
  if (candidates.length !== 1) return { classification: "ambiguous-message" };
  const body = String(candidates[0].body || "");
  if (/https?:\/\//i.test(body) || candidates[0].links?.length) return { classification: "linked-content-refused" };
  if (/invitation|confirm(?:ation)?\s+link/i.test(body)) return { classification: "wrong-branch" };
  const codes = body.match(/(?<!\d)\d{6}(?!\d)/g) || [];
  if (codes.length !== 1) return { classification: codes.length ? "ambiguous-code" : "malformed-content" };
  return { classification: "intended-otp", code: codes[0] };
}

export function normalizeVerification(email, token) {
  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedToken = String(token).trim();
  if (!/^[^\s@+]+\+[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) throw new Error("EMAIL_REFUSED");
  if (!/^\d{6}$/.test(normalizedToken)) throw new Error("TOKEN_REFUSED");
  return { email: normalizedEmail, token: normalizedToken, type: "email" };
}

const REPORT_KEYS = new Set(["outcome", "mode", "ready", "requestCount", "verificationCount", "mailbox", "authentication", "session", "permission", "cleanup", "invariants"]);
export function sanitizeReport(report) {
  for (const key of Object.keys(report)) if (!REPORT_KEYS.has(key)) throw new Error("REPORT_FIELD_REFUSED");
  const encoded = JSON.stringify(report);
  if (/@|(?:eyJ)[A-Za-z0-9_-]{12}|\b\d{6}\b|access_token|refresh_token|cookie|messageId/i.test(encoded)) throw new Error("REPORT_PROTECTED_PATTERN_REFUSED");
  return encoded;
}
