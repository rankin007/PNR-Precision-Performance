#!/usr/bin/env node
import assert from "node:assert/strict";

const EXPECTED_HOST = "uvskssaecdhxcgytkasc.supabase.co";
const OLD_HOST = "tagnbgkroihagjmvehlx.supabase.co";
const LIMITS = Object.freeze({ stables: 1, horses: 3, auth: 3, commerce: 0 });
const CLEANUP = Object.freeze(["storage", "evidence", "tests", "assignments", "horses", "stable", "profiles", "users", "auth"]);
const MATRIX = Object.freeze([
  "anonymous-denial", "administrator", "record-writer", "read-only", "cross-stable-denial", "inactive-denial", "revocation",
  "mobile-capture-review", "desktop-capture-review", "persistence", "history", "compatible-change", "incompatible-history",
  "dashboard-complete", "dashboard-incomplete", "dashboard-empty", "evidence-chain", "evidence-denial", "commerce-unavailable",
  "clinical-authority-unavailable", "audio-unavailable", "keyboard-focus", "responsive-reflow", "failure-retry", "cleanup-zero"
]);
function target(raw) {
  const url = new URL(raw);
  if (url.hostname === OLD_HOST) throw new Error("OLD_PROJECT_REFUSED");
  assert.equal(url.protocol, "https:"); assert.equal(url.hostname, EXPECTED_HOST); assert.equal(url.pathname, "/");
}
function ceilings(plan) { for (const [key, max] of Object.entries(LIMITS)) assert(Number.isInteger(plan[key]) && plan[key] >= 0 && plan[key] <= max); }
function safe(value) { const text=JSON.stringify(value); assert(!/@|sb_(?:secret|publishable)_|eyJ[A-Za-z0-9_-]{20,}\.|access[_-]?token|refresh[_-]?token|password|otp|magic.?link/i.test(text)); return value; }
function ownership(items, runId) { assert(items.length > 0); assert(items.every((x) => x.owner === runId && x.synthetic === true)); }

target(`https://${EXPECTED_HOST}`);
assert.throws(() => target(`https://${OLD_HOST}`), /OLD_PROJECT_REFUSED/);
ceilings({ stables: 1, horses: 3, auth: 3, commerce: 0 });
assert.throws(() => ceilings({ stables: 1, horses: 4, auth: 3, commerce: 0 }));
ownership([{ owner: "031-FIELD-01", synthetic: true }], "031-FIELD-01");
assert.equal(CLEANUP.at(-1), "auth");
assert.equal(new Set(MATRIX).size, MATRIX.length);
assert(MATRIX.includes("cross-stable-denial") && MATRIX.includes("cleanup-zero"));
safe({ state: "pass", checks: MATRIX.length, cleanup: "auth-last", final: [0,0,0] });
assert.throws(() => safe({ password: "example" }));
console.log(JSON.stringify({ harness: "031", state: "pass", checks: 10, matrixCases: MATRIX.length, ceilings: LIMITS, cleanup: "auth-last", output: "allowlisted" }));
