import assert from "node:assert/strict";
import {
  GOVERNING_PREVIEW_CALLBACK,
  PRODUCTION_CALLBACK,
  PRODUCTION_SITE_URL,
  assertBeforePlusOne,
  assertExactRestoration,
  cleanupOrder,
  planAddition,
  planRestoration,
  providerSnapshot,
  sanitizedSnapshot,
  snapshotFingerprint,
  validateExactPreviewCallback,
} from "./protected-preview-035N.mjs";

const counts = { callback: 0, privacy: 0, cleanup: 0 };
function check(category, condition, message) {
  assert.ok(condition, message);
  counts[category] += 1;
}
function rejects(fn, pattern) {
  try { fn(); } catch (error) { return pattern.test(error.message); }
  return false;
}

const before = providerSnapshot({
  site_url: PRODUCTION_SITE_URL,
  uri_allow_list: `${PRODUCTION_CALLBACK},https://example.invalid/existing`,
});
const added = planAddition(before);

check("callback", validateExactPreviewCallback(GOVERNING_PREVIEW_CALLBACK) === GOVERNING_PREVIEW_CALLBACK, "exact governing Preview callback is accepted");
check("callback", rejects(() => validateExactPreviewCallback("https://*.vercel.app/auth/callback"), /exact governing/), "wildcard callback is rejected");
check("callback", rejects(() => validateExactPreviewCallback("http://localhost:3000/auth/callback"), /exact governing/), "localhost callback is rejected");
check("callback", rejects(() => validateExactPreviewCallback(`${GOVERNING_PREVIEW_CALLBACK}?next=/portal`), /exact governing/), "query-bearing callback is rejected");
check("callback", added.siteUrl === PRODUCTION_SITE_URL, "addition preserves production Site URL");
check("callback", added.redirectUrls.includes(PRODUCTION_CALLBACK), "addition preserves production callback");
check("callback", added.redirectUrls.includes(GOVERNING_PREVIEW_CALLBACK), "addition contains exact Preview callback");
check("callback", added.redirectUrls.length === before.redirectUrls.length + 1, "addition changes allowlist cardinality by exactly one");
check("callback", assertBeforePlusOne(before, added), "post-write state proves exact before plus one");
check("callback", rejects(() => planAddition(added), /already exist/), "duplicate or adopted callback is rejected");

const sanitized = sanitizedSnapshot(before);
check("privacy", Object.keys(sanitized).every((key) => !/token|secret|credential|cookie|session/i.test(key)), "sanitized report exposes no protected-value field");
check("privacy", !JSON.stringify(sanitized).includes("example.invalid"), "sanitized report suppresses redirect URL values");
check("privacy", sanitized.redirectCount === 2 && sanitized.productionCallbackPresent, "sanitized report retains only required aggregate facts");
check("privacy", /^[a-f0-9]{64}$/.test(snapshotFingerprint(before)), "before-state is represented by a non-reversible SHA-256 fingerprint");

const restored = planRestoration(added);
check("cleanup", cleanupOrder().join(">") === "sessions>application-dependencies>auth-identity-last>preview-callback>provider-reread", "dependency-safe cleanup order is fixed");
check("cleanup", !restored.redirectUrls.includes(GOVERNING_PREVIEW_CALLBACK), "cleanup removes only the exact temporary callback");
check("cleanup", restored.redirectUrls.includes(PRODUCTION_CALLBACK) && restored.siteUrl === PRODUCTION_SITE_URL, "cleanup preserves production callback and Site URL");
check("cleanup", assertExactRestoration(before, restored), "cleanup proves exact provider restoration");

assert.deepEqual(counts, { callback: 10, privacy: 4, cleanup: 4 });
assert.equal(Object.values(counts).reduce((sum, value) => sum + value, 0), 18);
console.log("Sprint 035N focused lifecycle checks passed: 10 callback + 4 privacy + 4 cleanup = 18.");
