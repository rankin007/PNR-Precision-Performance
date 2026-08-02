import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import {
  PRODUCTION_CALLBACK,
  PRODUCTION_SITE_URL,
  assertBeforePlusOne,
  assertExactRestoration,
  planAddition,
  planRestoration,
  providerSnapshot,
  snapshotFingerprint,
} from "./protected-preview-035N.mjs";

export const RETAINED_WITH_OWNER = "retained with owner";
export const REMOVED_AS_OBSOLETE = "removed as obsolete";
export const ALLOWED_DISPOSITIONS = Object.freeze([
  RETAINED_WITH_OWNER,
  REMOVED_AS_OBSOLETE,
]);

function normalizedSnapshot(input) {
  if (input && "siteUrl" in input && "redirectUrls" in input) {
    return providerSnapshot({ site_url: input.siteUrl, uri_allow_list: input.redirectUrls });
  }
  return providerSnapshot(input);
}

const SAFE_TEXT = /^[a-z0-9][a-z0-9 /&()._-]{0,79}$/i;
const SAFE_DATE = /^\d{4}-\d{2}-\d{2}$/;

function safeText(value, label) {
  const normalized = String(value ?? "").trim();
  assert.match(normalized, SAFE_TEXT, `${label} must be a short sanitized category`);
  assert.ok(!/https?:|@|token|secret|credential|cookie|session/i.test(normalized), `${label} contains a protected or identifying value`);
  return normalized;
}

export function validateDisposition(disposition) {
  assert.ok(ALLOWED_DISPOSITIONS.includes(disposition), "disposition must be exactly retained with owner or removed as obsolete");
  return disposition;
}

export function sanitizedDispositionEvidence(input) {
  const disposition = validateDisposition(input?.disposition);
  const evidence = {
    ownerRole: safeText(input?.ownerRole, "owner role"),
    purposeCategory: safeText(input?.purposeCategory, "purpose category"),
    disposition,
    date: String(input?.date ?? "").trim(),
    authorityResult: safeText(input?.authorityResult, "authority result"),
  };
  assert.match(evidence.date, SAFE_DATE, "date must use YYYY-MM-DD");
  return evidence;
}

export function planAlternateCallbackDisposition(beforeInput, options) {
  const before = normalizedSnapshot(beforeInput);
  const disposition = validateDisposition(options?.disposition);
  const alternateCallback = String(options?.alternateCallback ?? "").trim();

  assert.equal(before.siteUrl, PRODUCTION_SITE_URL, "production Site URL must remain governing");
  assert.ok(before.redirectUrls.includes(PRODUCTION_CALLBACK), "production callback must remain present");
  assert.ok(alternateCallback && alternateCallback !== PRODUCTION_CALLBACK, "one exact non-production alternate callback is required");
  assert.ok(before.redirectUrls.includes(alternateCallback), "the exact alternate callback must exist in the read-before-write snapshot");

  if (disposition === RETAINED_WITH_OWNER) {
    return { siteUrl: before.siteUrl, redirectUrls: [...before.redirectUrls] };
  }

  assert.equal(options?.exactEntryRemovalAuthorized, true, "obsolete removal requires explicit exact-entry authority");
  return {
    siteUrl: before.siteUrl,
    redirectUrls: before.redirectUrls.filter((entry) => entry !== alternateCallback),
  };
}

export function assertProductionConfigurationPreserved(snapshotInput) {
  const snapshot = normalizedSnapshot(snapshotInput);
  assert.equal(snapshot.siteUrl, PRODUCTION_SITE_URL, "production Site URL changed unexpectedly");
  assert.ok(snapshot.redirectUrls.includes(PRODUCTION_CALLBACK), "production callback changed unexpectedly");
  return true;
}

export function proveTemporaryCallbackLifecycle(postDispositionInput) {
  const postDisposition = normalizedSnapshot(postDispositionInput);
  const active = planAddition(postDisposition);
  assertBeforePlusOne(postDisposition, active);
  const restored = planRestoration(active);
  assertExactRestoration(postDisposition, restored);
  return {
    beforeFingerprint: snapshotFingerprint(postDisposition),
    restoredFingerprint: snapshotFingerprint(restored),
  };
}

function run() {
  const evidence = sanitizedDispositionEvidence({
    ownerRole: process.env.CALLBACK_OWNER_ROLE,
    purposeCategory: process.env.CALLBACK_PURPOSE_CATEGORY,
    disposition: process.env.CALLBACK_DISPOSITION,
    date: process.env.CALLBACK_DISPOSITION_DATE,
    authorityResult: process.env.CALLBACK_AUTHORITY_RESULT,
  });
  console.log(JSON.stringify({ event: "sanitized-callback-disposition-validated", ...evidence }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    run();
  } catch (error) {
    console.error(`Sprint 035O disposition validation stopped safely: ${error.message}`);
    process.exitCode = 1;
  }
}
