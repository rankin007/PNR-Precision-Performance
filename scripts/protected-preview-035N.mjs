import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

export const PRODUCTION_SITE_URL = "https://precisionperformance.com.au";
export const PRODUCTION_CALLBACK = `${PRODUCTION_SITE_URL}/auth/callback`;
export const GOVERNING_PREVIEW_ORIGIN = "https://pnr-precision-performance-e7691a6bn-rankin007s-projects.vercel.app";
export const GOVERNING_PREVIEW_CALLBACK = `${GOVERNING_PREVIEW_ORIGIN}/auth/callback`;

const MANAGEMENT_ORIGIN = "https://api.supabase.com";

export function normalizeAllowlist(value) {
  const entries = Array.isArray(value) ? value : String(value ?? "").split(",");
  return [...new Set(entries.map((entry) => entry.trim()).filter(Boolean))].sort();
}

export function validateExactPreviewCallback(callback) {
  const url = new URL(callback);
  assert.equal(callback, GOVERNING_PREVIEW_CALLBACK, "callback must be the exact governing 035M Preview callback");
  assert.equal(url.protocol, "https:", "callback must use HTTPS");
  assert.equal(url.pathname, "/auth/callback", "callback path must be exact");
  assert.equal(url.search, "", "callback must not contain query parameters");
  assert.ok(!callback.includes("*"), "wildcard callbacks are prohibited");
  assert.ok(!/localhost|127\.0\.0\.1/i.test(url.hostname), "local callbacks are prohibited");
  assert.ok(!/precisionperformance\.com\.au$/i.test(url.hostname), "production aliases are not the Preview target");
  return callback;
}

export function providerSnapshot(config) {
  const siteUrl = String(config?.site_url ?? "").trim();
  const redirectUrls = normalizeAllowlist(config?.uri_allow_list ?? config?.additional_redirect_urls);
  return { siteUrl, redirectUrls };
}

export function snapshotFingerprint(snapshot) {
  return createHash("sha256").update(JSON.stringify({
    siteUrl: snapshot.siteUrl,
    redirectUrls: [...snapshot.redirectUrls].sort(),
  })).digest("hex");
}

export function sanitizedSnapshot(snapshot) {
  return {
    fingerprint: snapshotFingerprint(snapshot),
    siteUrlClass: snapshot.siteUrl === PRODUCTION_SITE_URL ? "production-site-url" : "unexpected-site-url",
    redirectCount: snapshot.redirectUrls.length,
    productionCallbackPresent: snapshot.redirectUrls.includes(PRODUCTION_CALLBACK),
    previewCallbackPresent: snapshot.redirectUrls.includes(GOVERNING_PREVIEW_CALLBACK),
  };
}

export function planAddition(before, callback = GOVERNING_PREVIEW_CALLBACK) {
  validateExactPreviewCallback(callback);
  assert.equal(before.siteUrl, PRODUCTION_SITE_URL, "production Site URL must remain governing");
  assert.ok(before.redirectUrls.includes(PRODUCTION_CALLBACK), "production callback must be preserved");
  assert.ok(!before.redirectUrls.includes(callback), "temporary callback must not already exist");
  return { siteUrl: before.siteUrl, redirectUrls: normalizeAllowlist([...before.redirectUrls, callback]) };
}

export function assertBeforePlusOne(before, after, callback = GOVERNING_PREVIEW_CALLBACK) {
  assert.equal(after.siteUrl, before.siteUrl, "Site URL changed unexpectedly");
  assert.deepEqual(after.redirectUrls, planAddition(before, callback).redirectUrls, "allowlist is not exactly before plus one");
  return true;
}

export function planRestoration(current, callback = GOVERNING_PREVIEW_CALLBACK) {
  validateExactPreviewCallback(callback);
  assert.equal(current.redirectUrls.filter((entry) => entry === callback).length, 1, "temporary callback ownership is ambiguous");
  return { siteUrl: current.siteUrl, redirectUrls: current.redirectUrls.filter((entry) => entry !== callback) };
}

export function assertExactRestoration(before, after) {
  assert.equal(snapshotFingerprint(after), snapshotFingerprint(before), "provider configuration was not exactly restored");
  return true;
}

export function cleanupOrder() {
  return ["sessions", "application-dependencies", "auth-identity-last", "preview-callback", "provider-reread"];
}

function managementHeaders() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) throw new Error("SUPABASE_ACCESS_TOKEN is required through the private environment; never print it.");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

function projectRef() {
  const value = process.env.SUPABASE_PROJECT_REF?.trim();
  if (!value || !/^[a-z]{20}$/.test(value)) throw new Error("SUPABASE_PROJECT_REF must be the privately configured 20-letter project reference.");
  return value;
}

async function readProviderConfig() {
  const response = await fetch(`${MANAGEMENT_ORIGIN}/v1/projects/${projectRef()}/config/auth`, { headers: managementHeaders() });
  if (!response.ok) throw new Error(`Supabase Auth configuration read failed with HTTP ${response.status}.`);
  return providerSnapshot(await response.json());
}

async function writeAllowlist(snapshot) {
  const response = await fetch(`${MANAGEMENT_ORIGIN}/v1/projects/${projectRef()}/config/auth`, {
    method: "PATCH",
    headers: managementHeaders(),
    body: JSON.stringify({ site_url: snapshot.siteUrl, uri_allow_list: snapshot.redirectUrls.join(",") }),
  });
  if (!response.ok) throw new Error(`Supabase Auth configuration write failed with HTTP ${response.status}.`);
}

function report(label, snapshot) {
  console.log(JSON.stringify({ event: label, ...sanitizedSnapshot(snapshot) }));
}

async function run() {
  const action = process.argv[2];
  assert.ok(["read", "apply", "restore"].includes(action), "action must be read, apply, or restore");
  validateExactPreviewCallback(process.env.PREVIEW_CALLBACK_URL ?? GOVERNING_PREVIEW_CALLBACK);
  const before = await readProviderConfig();
  report("provider-read", before);

  if (action === "read") return;
  if (action === "apply") {
    const intended = planAddition(before);
    await writeAllowlist(intended);
    const after = await readProviderConfig();
    assertBeforePlusOne(before, after);
    report("provider-before-plus-one-proven", after);
    return;
  }

  const expectedBeforeFingerprint = process.env.EXPECTED_BEFORE_FINGERPRINT?.trim();
  if (!/^[a-f0-9]{64}$/.test(expectedBeforeFingerprint ?? "")) throw new Error("EXPECTED_BEFORE_FINGERPRINT from the sanitized read is required for restoration.");
  const intended = planRestoration(before);
  await writeAllowlist(intended);
  const after = await readProviderConfig();
  assert.equal(snapshotFingerprint(after), expectedBeforeFingerprint, "restored configuration does not match the sanitized before-state fingerprint");
  report("provider-exact-restoration-proven", after);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run().catch((error) => {
    console.error(`Sprint 035N provider lifecycle stopped safely: ${error.message}`);
    process.exitCode = 1;
  });
}
