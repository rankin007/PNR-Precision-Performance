import assert from "node:assert/strict";
import {
  GOVERNING_PREVIEW_CALLBACK,
  PRODUCTION_CALLBACK,
  PRODUCTION_SITE_URL,
  planAddition,
  providerSnapshot,
} from "./protected-preview-035N.mjs";
import {
  assertExactObsoleteRemoval,
  classifyExactTwoEntryState,
  planAuthorizedObsoleteRemoval,
  provePostDispositionLifecycle,
  sanitizedAuthorizedRemovalEvidence,
} from "./protected-preview-035P.mjs";

const counts = { disposition: 0, identity: 0, preservation: 0, lifecycle: 0 };
function check(category, condition, message) {
  assert.ok(condition, message);
  counts[category] += 1;
}
function rejects(fn, pattern) {
  try { fn(); } catch (error) { return pattern.test(error.message); }
  return false;
}

const alternate = "https://obsolete-preview.example.invalid/auth/callback";
const before = providerSnapshot({
  site_url: PRODUCTION_SITE_URL,
  uri_allow_list: `${PRODUCTION_CALLBACK},${alternate}`,
});
const disposition = sanitizedAuthorizedRemovalEvidence({
  ownerRole: "supabase project owner",
  purposeCategory: "preview lifecycle",
  disposition: "removed as obsolete",
  date: "2026-08-02",
  authorityResult: "exact entry removal authorised",
});

check("disposition", disposition.disposition === "removed as obsolete", "authorised obsolete disposition is accepted");
check("disposition", Object.keys(disposition).join(",") === "ownerRole,purposeCategory,disposition,date,authorityResult", "only five sanitized disposition fields are retained");
check("disposition", rejects(() => sanitizedAuthorizedRemovalEvidence({ ...disposition, ownerRole: "owner@example.invalid" }), /short sanitized category|protected or identifying/), "identifying or protected disposition evidence is rejected");

const classified = classifyExactTwoEntryState(before);
check("identity", classified.snapshot.redirectUrls.length === 2 && classified.alternateCallback === alternate, "exact two-entry state is classified deterministically");
check("identity", rejects(() => classifyExactTwoEntryState({ siteUrl: PRODUCTION_SITE_URL, redirectUrls: [PRODUCTION_CALLBACK] }), /exactly two/), "non-two-entry state is rejected");
check("identity", rejects(() => classifyExactTwoEntryState({ siteUrl: PRODUCTION_SITE_URL, redirectUrls: [PRODUCTION_CALLBACK, GOVERNING_PREVIEW_CALLBACK] }), /must be absent/), "pre-existing governing callback is rejected");
check("identity", rejects(() => planAuthorizedObsoleteRemoval(before, false), /explicit exact-entry authority/), "removal without exact-entry authority is rejected");

const removed = planAuthorizedObsoleteRemoval(before, true);
check("preservation", removed.siteUrl === PRODUCTION_SITE_URL && removed.redirectUrls.length === 1, "authorised plan removes exactly one entry and preserves Site URL");
check("preservation", assertExactObsoleteRemoval(before, removed), "post-disposition state proves the exact obsolete delta");
check("preservation", rejects(() => assertExactObsoleteRemoval(before, { ...removed, siteUrl: "https://unexpected.example.invalid" }), /Site URL changed/), "production Site URL mutation is rejected");

const proof = provePostDispositionLifecycle(removed);
check("lifecycle", proof.lifecycle.beforeFingerprint === proof.lifecycle.restoredFingerprint, "temporary callback lifecycle restores the post-disposition fingerprint");
check("lifecycle", planAddition(removed).redirectUrls.length === removed.redirectUrls.length + 1 && proof.sanitizedRollbackAuthority.redirectCount === 1, "before-plus-one and production-only rollback authority agree");

assert.deepEqual(counts, { disposition: 3, identity: 4, preservation: 3, lifecycle: 2 });
console.log("Sprint 035P focused checks passed: 3 disposition + 4 identity + 3 preservation + 2 lifecycle = 12.");
