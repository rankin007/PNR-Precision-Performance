import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import {
  GOVERNING_PREVIEW_CALLBACK,
  PRODUCTION_CALLBACK,
  PRODUCTION_SITE_URL,
  assertBeforePlusOne,
  assertExactRestoration,
  planAddition,
  planRestoration,
  providerSnapshot,
  sanitizedSnapshot,
} from "./protected-preview-035N.mjs";
import {
  REMOVED_AS_OBSOLETE,
  assertProductionConfigurationPreserved,
  planAlternateCallbackDisposition,
  proveTemporaryCallbackLifecycle,
  sanitizedDispositionEvidence,
} from "./protected-preview-035O.mjs";

function normalizedSnapshot(input) {
  if (input && "siteUrl" in input && "redirectUrls" in input) {
    return providerSnapshot({ site_url: input.siteUrl, uri_allow_list: input.redirectUrls });
  }
  return providerSnapshot(input);
}

export function sanitizedAuthorizedRemovalEvidence(input) {
  const evidence = sanitizedDispositionEvidence(input);
  assert.equal(evidence.disposition, REMOVED_AS_OBSOLETE, "035P requires the authorised obsolete-removal disposition");
  return evidence;
}

export function classifyExactTwoEntryState(input) {
  const snapshot = normalizedSnapshot(input);
  assert.equal(snapshot.siteUrl, PRODUCTION_SITE_URL, "exact production Site URL is required");
  assert.equal(snapshot.redirectUrls.length, 2, "read-before-write allowlist must contain exactly two entries");
  assert.equal(snapshot.redirectUrls.filter((entry) => entry === PRODUCTION_CALLBACK).length, 1, "exactly one production callback is required");
  assert.ok(!snapshot.redirectUrls.includes(GOVERNING_PREVIEW_CALLBACK), "governing Preview callback must be absent before disposition");
  const alternateCallbacks = snapshot.redirectUrls.filter((entry) => entry !== PRODUCTION_CALLBACK);
  assert.equal(alternateCallbacks.length, 1, "one exact obsolete non-production callback is required");
  const alternate = new URL(alternateCallbacks[0]);
  assert.equal(alternate.protocol, "https:", "obsolete callback must use HTTPS");
  assert.equal(alternate.pathname, "/auth/callback", "obsolete callback path must be exact");
  assert.equal(alternate.search, "", "obsolete callback must not contain a query");
  assert.notEqual(alternate.origin, new URL(PRODUCTION_SITE_URL).origin, "obsolete callback must be non-production");
  return { snapshot, alternateCallback: alternateCallbacks[0] };
}

export function planAuthorizedObsoleteRemoval(input, exactEntryRemovalAuthorized) {
  const { snapshot, alternateCallback } = classifyExactTwoEntryState(input);
  return planAlternateCallbackDisposition(snapshot, {
    disposition: REMOVED_AS_OBSOLETE,
    alternateCallback,
    exactEntryRemovalAuthorized,
  });
}

export function assertExactObsoleteRemoval(beforeInput, afterInput) {
  const before = classifyExactTwoEntryState(beforeInput).snapshot;
  const after = normalizedSnapshot(afterInput);
  assert.equal(after.siteUrl, before.siteUrl, "production Site URL changed during obsolete removal");
  assert.deepEqual(after.redirectUrls, [PRODUCTION_CALLBACK], "post-disposition allowlist must contain only the production callback");
  assert.equal(after.redirectUrls.length, before.redirectUrls.length - 1, "obsolete removal must change cardinality by exactly one");
  assertProductionConfigurationPreserved(after);
  return true;
}

export function provePostDispositionLifecycle(postDispositionInput) {
  const postDisposition = normalizedSnapshot(postDispositionInput);
  assert.deepEqual(postDisposition.redirectUrls, [PRODUCTION_CALLBACK], "rollback authority must be production-only");
  const lifecycle = proveTemporaryCallbackLifecycle(postDisposition);
  const active = planAddition(postDisposition);
  assertBeforePlusOne(postDisposition, active);
  const restored = planRestoration(active);
  assertExactRestoration(postDisposition, restored);
  return { lifecycle, sanitizedRollbackAuthority: sanitizedSnapshot(postDisposition) };
}

const HOSTED_RUN = "035P-RENDERED-20260802-01";
const PRIVATE_RUNTIME_ROOT = "C:/tmp/pnr-023l-remote-application-and-hosted-proof";

function readPrivateEnvironment(file) {
  return Object.fromEntries(fs.readFileSync(file, "utf8").split(/\r?\n/)
    .map((line) => line.match(/^([A-Z0-9_]+)=(.*)$/)).filter(Boolean)
    .map((match) => [match[1], match[2]]));
}

async function runHostedRenderedChecks() {
  const { chromium } = await import("playwright-core");
  const publicEnvironment = readPrivateEnvironment(`${PRIVATE_RUNTIME_ROOT}/.env.local`);
  const serverEnvironment = readPrivateEnvironment(`${PRIVATE_RUNTIME_ROOT}/.env.test.local`);
  const expectedProjectRef = process.env.SUPABASE_PROJECT_REF ?? "uvskssaecdhxcgytkasc";
  assert.equal(new URL(publicEnvironment.NEXT_PUBLIC_SUPABASE_URL).hostname, `${expectedProjectRef}.supabase.co`, "hosted target project mismatch");

  const clientOptions = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
  const service = createClient(publicEnvironment.NEXT_PUBLIC_SUPABASE_URL, serverEnvironment.SUPABASE_SERVICE_ROLE_KEY, clientOptions);
  const owned = { auth: null, user: null, profile: null, level: null, stableA: null, stableB: null, horseA: null, horseB: null, access: null, tests: [] };
  const cases = Array.from({ length: 14 }, (_, index) => ({ case: index + 1, status: "not-run", proof: "" }));
  const pass = (number, proof) => Object.assign(cases[number - 1], { status: "pass", proof });
  let browser;
  let trainerContext;
  let failure = null;

  const cleanup = async () => {
    if (owned.tests.length) {
      await service.from("biochemistry_test_notes").delete().in("test_id", owned.tests);
      await service.from("biochemistry_tests").delete().in("id", owned.tests);
    }
    if (owned.access) await service.from("biochemistry_horse_access_assignments").delete().eq("id", owned.access);
    if (owned.horseB) await service.from("horses").delete().eq("id", owned.horseB);
    if (owned.horseA) await service.from("horses").delete().eq("id", owned.horseA);
    if (owned.stableB) await service.from("stables").delete().eq("id", owned.stableB);
    if (owned.stableA) await service.from("stables").delete().eq("id", owned.stableA);
    if (owned.level) await service.from("user_membership_levels").delete().eq("id", owned.level);
    if (owned.profile) await service.from("member_profiles").delete().eq("id", owned.profile);
    if (owned.user) await service.from("users").delete().eq("id", owned.user);
    if (owned.auth) await service.auth.admin.deleteUser(owned.auth, false);
  };

  try {
    const existing = await service.auth.admin.listUsers({ page: 1, perPage: 1000 });
    assert.ifError(existing.error);
    assert.ok(!existing.data.users.some((user) => user.email?.includes(HOSTED_RUN.toLowerCase())), "opening Auth zero refused");

    const vercelAuth = JSON.parse(fs.readFileSync("C:/Users/rrank/AppData/Roaming/com.vercel.cli/Data/auth.json", "utf8"));
    const vercelLink = JSON.parse(fs.readFileSync(`${PRIVATE_RUNTIME_ROOT}/.vercel/project.json`, "utf8"));
    const projectResponse = await fetch(`https://api.vercel.com/v9/projects/${vercelLink.projectId}?teamId=${vercelLink.orgId}`, { headers: { authorization: `Bearer ${vercelAuth.token}` } });
    assert.ok(projectResponse.ok, "Vercel project read failed");
    const projectRecord = await projectResponse.json();
    const bypass = Object.keys(projectRecord.protectionBypass ?? {}).find((key) => projectRecord.protectionBypass[key]?.scope === "automation-bypass");
    assert.ok(bypass, "existing automation bypass missing");
    vercelAuth.token = null;

    const email = `${HOSTED_RUN.toLowerCase()}@precision-performance.invalid`;
    const password = `B!${crypto.randomBytes(32).toString("base64url")}`;
    let result = await service.auth.admin.createUser({ email, password, email_confirm: true });
    assert.ifError(result.error); owned.auth = result.data.user.id;
    result = await service.from("users").insert({ auth_user_id: owned.auth, email, status: "active", primary_role_code: "trainer" }).select("id").single();
    assert.ifError(result.error); owned.user = result.data.id;
    result = await service.from("member_profiles").insert({ user_id: owned.user, display_name: `${HOSTED_RUN}-TRAINER`, is_active: true }).select("id").single();
    assert.ifError(result.error); owned.profile = result.data.id;
    const membership = await service.from("membership_levels").select("id").eq("code", "trainer").single();
    assert.ifError(membership.error);
    result = await service.from("user_membership_levels").insert({ user_id: owned.user, membership_level_id: membership.data.id, starts_at: new Date().toISOString() }).select("id").single();
    assert.ifError(result.error); owned.level = result.data.id;
    result = await service.from("stables").insert({ name: `${HOSTED_RUN}-STABLE-A`, code: "S035PA", status: "active" }).select("id").single();
    assert.ifError(result.error); owned.stableA = result.data.id;
    result = await service.from("stables").insert({ name: `${HOSTED_RUN}-STABLE-B`, code: "S035PB", status: "active" }).select("id").single();
    assert.ifError(result.error); owned.stableB = result.data.id;
    result = await service.from("horses").insert({ stable_id: owned.stableA, name: `${HOSTED_RUN}-ASSIGNED`, slug: "035p-assigned", status: "active", breed: "Synthetic thoroughbred", colour: "Synthetic bay", date_of_birth: "2020-01-01" }).select("id").single();
    assert.ifError(result.error); owned.horseA = result.data.id;
    result = await service.from("horses").insert({ stable_id: owned.stableB, name: `${HOSTED_RUN}-DENIED`, slug: "035p-denied", status: "active", breed: "Synthetic thoroughbred", colour: "Synthetic bay", date_of_birth: "2020-01-01" }).select("id").single();
    assert.ifError(result.error); owned.horseB = result.data.id;
    result = await service.from("biochemistry_horse_access_assignments").insert({ horse_id: owned.horseA, stable_id: owned.stableA, member_profile_id: owned.profile, role_code: "trainer", access_level: "manage", nominated_by_user_id: owned.user, starts_at: new Date().toISOString(), notes: HOSTED_RUN }).select("id").single();
    assert.ifError(result.error); owned.access = result.data.id;

    const trainerClient = createClient(publicEnvironment.NEXT_PUBLIC_SUPABASE_URL, publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY, clientOptions);
    result = await trainerClient.auth.signInWithPassword({ email, password });
    assert.ifError(result.error);
    let cookieJar = [];
    const ssr = createServerClient(publicEnvironment.NEXT_PUBLIC_SUPABASE_URL, publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY, { cookies: { getAll: () => cookieJar, setAll: (cookies) => { cookieJar = cookies; } } });
    const sessionSet = await ssr.auth.setSession({ access_token: result.data.session.access_token, refresh_token: result.data.session.refresh_token });
    assert.ifError(sessionSet.error);

    browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
    const anonymous = await browser.newContext({ extraHTTPHeaders: { "x-vercel-protection-bypass": bypass } });
    const anonymousPage = await anonymous.newPage();
    await anonymousPage.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal`, { waitUntil: "load", timeout: 30000 });
    assert.ok(anonymousPage.url().includes("/sign-in"), "anonymous denial failed"); pass(1, "anonymous protected-route denial");
    await anonymous.close();

    trainerContext = await browser.newContext({ viewport: { width: 390, height: 844 }, extraHTTPHeaders: { "x-vercel-protection-bypass": bypass } });
    await trainerContext.addCookies(cookieJar.map((cookie) => ({ name: cookie.name, value: cookie.value, url: GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, ""), httpOnly: Boolean(cookie.options?.httpOnly), secure: true, sameSite: cookie.options?.sameSite === "none" ? "None" : cookie.options?.sameSite === "strict" ? "Strict" : "Lax" })));
    const page = await trainerContext.newPage();
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal`, { waitUntil: "load", timeout: 30000 });
    assert.equal(await page.getByText(`${HOSTED_RUN}-ASSIGNED`, { exact: true }).count(), 1);
    assert.equal(await page.getByText(`${HOSTED_RUN}-DENIED`, { exact: true }).count(), 0); pass(2, "assigned-only dashboard visibility");
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal/horses/${owned.horseB}`, { waitUntil: "load" });
    assert.equal(await page.getByText("Horse not available", { exact: false }).count(), 1); pass(3, "wrong-horse direct-route denial without leakage");
    const deniedWrite = await trainerClient.from("biochemistry_tests").insert({ horse_id: owned.horseB, stable_id: owned.stableB, test_date: "2026-08-02", time_of_day: "am", carbs_reading: 1, ph_saliva: 7, ph_urine: 7, ph_average: 7, conductivity_raw_meter_value: 1, conductivity_converted_c_value: 1.43, urea_reading: 1, created_by_user_id: owned.user });
    assert.ok(deniedWrite.error); pass(4, "authenticated cross-stable write denial");
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal/horses/${owned.horseA}`, { waitUntil: "load" });
    assert.equal(await page.getByText(`${HOSTED_RUN}-ASSIGNED`, { exact: true }).count(), 1); pass(5, "assigned horse workspace opens");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)); pass(6, "supported phone reflow has no horizontal overflow");
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/data-entry/biochemistry`, { waitUntil: "load" });
    await page.getByRole("button", { name: "Review test" }).click();
    assert.equal(await page.locator('[role="alert"]').count(), 1); pass(7, "validation guidance exposes an accessible alert");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "biochemistry-error-summary"); pass(8, "validation failure moves focus to actionable guidance");
    await page.selectOption("#horseId", { label: `${HOSTED_RUN}-ASSIGNED` });
    await page.fill("#testDate", "2026-08-02");
    for (const [id, value] of Object.entries({ carbsReading: 1, phSaliva: 7, phUrine: 7, conductivityRawMeterValue: 1, ureaReading: 1 })) await page.fill(`#${id}`, String(value));
    await page.fill("#notes", `${HOSTED_RUN} synthetic typed note`);
    await page.getByRole("button", { name: "Review test" }).click();
    await page.check("#note-review-confirmation");
    await Promise.all([page.waitForURL(/\/data-entry\/biochemistry\/[0-9a-f-]+/, { timeout: 30000 }), page.getByRole("button", { name: "Submit test" }).click()]);
    owned.tests.push(new URL(page.url()).pathname.split("/").pop()); pass(9, "existing permitted biochemistry action completes");
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal`, { waitUntil: "load" });
    assert.equal(await page.getByText(`${HOSTED_RUN}-ASSIGNED`, { exact: true }).count(), 1); pass(10, "dashboard return preserves assigned context");
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal/horses/${owned.horseA}`, { waitUntil: "load" });
    assert.equal(await page.getByText("Recent History", { exact: false }).count(), 1); pass(11, "horse workspace shows submitted history");
    await page.setViewportSize({ width: 1440, height: 900 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)); pass(12, "larger viewport orientation remains usable");
    await service.from("biochemistry_horse_access_assignments").delete().eq("id", owned.access); owned.access = null;
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal`, { waitUntil: "load" });
    assert.equal(await page.getByText(`${HOSTED_RUN}-ASSIGNED`, { exact: true }).count(), 0); pass(13, "assignment revocation is enforced");
    const signOut = page.getByRole("button", { name: "Sign out" });
    assert.equal(await signOut.count(), 1);
    await signOut.click();
    await page.goto(`${GOVERNING_PREVIEW_CALLBACK.replace(/\/auth\/callback$/, "")}/portal`, { waitUntil: "load" });
    assert.ok(page.url().includes("/sign-in")); pass(14, "sign-out and subsequent protected-route denial agree");
  } catch (error) {
    failure = error.message || "unexpected hosted failure";
  } finally {
    await trainerContext?.close().catch(() => {});
    await browser?.close().catch(() => {});
    await cleanup().catch((error) => { failure = failure ? `${failure}; cleanup:${error.message}` : `cleanup:${error.message}`; });
    publicEnvironment.NEXT_PUBLIC_SUPABASE_URL = null;
    publicEnvironment.NEXT_PUBLIC_SUPABASE_ANON_KEY = null;
    serverEnvironment.SUPABASE_SERVICE_ROLE_KEY = null;
  }

  const remaining = async (table, id) => {
    if (!id) return 0;
    const result = await service.from(table).select("id", { count: "exact", head: true }).eq("id", id);
    if (result.error) return -1000;
    return result.count ?? 0;
  };
  const after = await service.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const authRemaining = after.error ? -1 : after.data.users.filter((user) => user.email?.includes(HOSTED_RUN.toLowerCase())).length;
  const applicationRemaining = (await Promise.all([
    remaining("users", owned.user),
    remaining("member_profiles", owned.profile),
    remaining("user_membership_levels", owned.level),
    remaining("stables", owned.stableA),
    remaining("stables", owned.stableB),
    remaining("horses", owned.horseA),
    remaining("horses", owned.horseB),
    ...owned.tests.map((id) => remaining("biochemistry_tests", id)),
  ])).reduce((sum, count) => sum + count, 0);
  const passed = cases.filter((testCase) => testCase.status === "pass").length;
  console.log(JSON.stringify({ event: "035p-rendered-result", passed, expected: 14, failure: failure ?? "none", cleanup: { authRemaining, applicationRemaining, storageRemaining: 0 } }));
  if (failure || passed !== 14 || authRemaining !== 0 || applicationRemaining !== 0) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2] === "hosted") {
  runHostedRenderedChecks().catch((error) => {
    console.error(`Sprint 035P hosted proof stopped safely: ${error.message}`);
    process.exitCode = 1;
  });
}
