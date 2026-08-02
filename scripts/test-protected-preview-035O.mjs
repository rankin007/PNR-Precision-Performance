import assert from "node:assert/strict";
import {
  PRODUCTION_CALLBACK,
  PRODUCTION_SITE_URL,
  GOVERNING_PREVIEW_CALLBACK,
  providerSnapshot,
} from "./protected-preview-035N.mjs";
import {
  REMOVED_AS_OBSOLETE,
  RETAINED_WITH_OWNER,
  assertProductionConfigurationPreserved,
  planAlternateCallbackDisposition,
  proveTemporaryCallbackLifecycle,
  sanitizedDispositionEvidence,
  validateDisposition,
} from "./protected-preview-035O.mjs";

let passed = 0;
function check(condition, message) {
  assert.ok(condition, message);
  passed += 1;
}
function rejects(fn, pattern) {
  try { fn(); } catch (error) { return pattern.test(error.message); }
  return false;
}

const alternate = "https://example.invalid/auth/callback";
const before = providerSnapshot({
  site_url: PRODUCTION_SITE_URL,
  uri_allow_list: `${PRODUCTION_CALLBACK},${alternate}`,
});

check(validateDisposition(RETAINED_WITH_OWNER) === RETAINED_WITH_OWNER, "retained disposition is accepted");
check(validateDisposition(REMOVED_AS_OBSOLETE) === REMOVED_AS_OBSOLETE, "obsolete disposition is accepted");
check(rejects(() => validateDisposition("unresolved"), /exactly retained/), "unresolved or invented disposition is rejected");

const retained = planAlternateCallbackDisposition(before, { disposition: RETAINED_WITH_OWNER, alternateCallback: alternate });
check(JSON.stringify(retained) === JSON.stringify(before), "retained alternate callback remains unchanged");

const removed = planAlternateCallbackDisposition(before, {
  disposition: REMOVED_AS_OBSOLETE,
  alternateCallback: alternate,
  exactEntryRemovalAuthorized: true,
});
check(!removed.redirectUrls.includes(alternate) && removed.redirectUrls.length === before.redirectUrls.length - 1, "obsolete handling removes exactly the authorised alternate callback");
check(removed.siteUrl === PRODUCTION_SITE_URL, "obsolete handling preserves the production Site URL");
check(removed.redirectUrls.includes(PRODUCTION_CALLBACK) && assertProductionConfigurationPreserved(removed), "obsolete handling preserves the production callback");

const evidence = sanitizedDispositionEvidence({
  ownerRole: "platform owner",
  purposeCategory: "preview lifecycle",
  disposition: RETAINED_WITH_OWNER,
  date: "2026-08-02",
  authorityResult: "authorised retention",
});
check(Object.keys(evidence).join(",") === "ownerRole,purposeCategory,disposition,date,authorityResult", "repository evidence is restricted to five permitted sanitized fields");
check(!/https?:|example\.invalid|@|token|secret|credential|cookie|session/i.test(JSON.stringify(evidence)), "sanitized evidence suppresses URLs and protected values");

const lifecycle = proveTemporaryCallbackLifecycle(removed);
check(lifecycle.beforeFingerprint === lifecycle.restoredFingerprint && !removed.redirectUrls.includes(GOVERNING_PREVIEW_CALLBACK), "temporary callback addition and restoration remain compatible with the post-disposition rollback authority");

assert.equal(passed, 10);
console.log("Sprint 035O focused checks passed: 10 disposition and lifecycle assertions.");
