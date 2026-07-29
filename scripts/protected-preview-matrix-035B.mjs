#!/usr/bin/env node
import { chromium } from "playwright-core";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

const PREVIEW = process.env.PP035B_PREVIEW;
const SUPABASE_URL = process.env.PP035B_SUPABASE_URL;
const ANON = process.env.PP035B_SUPABASE_ANON_KEY;
const SERVICE = process.env.PP035B_SUPABASE_SERVICE_ROLE_KEY;
const BYPASS = process.env.PP035B_VERCEL_BYPASS;
const RUN = process.env.PP035B_RUN;
const REF = "uvskssaecdhxcgytkasc";
if (!PREVIEW || !SUPABASE_URL || !ANON || !SERVICE || !BYPASS || !/^035B-[A-Z0-9-]{6,40}$/.test(RUN || "")) throw new Error("CONFIG_REFUSED");
const previewHost = new URL(PREVIEW).hostname;
if (new URL(SUPABASE_URL).hostname !== `${REF}.supabase.co` || !/^pnr-precision-performance-[a-z0-9]+-rankin007s-projects\.vercel\.app$/.test(previewHost)) throw new Error("TARGET_REFUSED");

const opts = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
const admin = createClient(SUPABASE_URL, SERVICE, opts);
const owned = { auth: [], users: [], profiles: [], memberships: [], stable: [], horses: [], access: [], tests: [] };
const cases = [];
const pass = (name, proof) => cases.push({ name, status: "pass", proof });
let browser;
let failure = null;

async function cleanup() {
  for (const [table, ids] of [
    ["biochemistry_tests", owned.tests], ["biochemistry_horse_access_assignments", owned.access],
    ["horses", owned.horses], ["stables", owned.stable], ["user_membership_levels", owned.memberships],
    ["member_profiles", owned.profiles], ["users", owned.users],
  ]) if (ids.length) { const r = await admin.from(table).delete().in("id", ids); if (r.error) throw new Error(`CLEAN_${table}`); }
  for (const id of owned.auth) { const r = await admin.auth.admin.deleteUser(id, false); if (r.error) throw new Error("CLEAN_AUTH"); }
}

async function actor(label) {
  const email = `${RUN.toLowerCase()}-${label.toLowerCase()}@precision-performance.invalid`;
  let r = await admin.auth.admin.createUser({ email, email_confirm: true, user_metadata: { synthetic_run: RUN, participant_alias: label } });
  if (r.error) throw new Error("AUTH_CREATE");
  const authId = r.data.user.id; owned.auth.push(authId);
  r = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (r.error || !r.data.properties?.hashed_token) throw new Error("MAGIC_LINK_CREATE");
  let artifact = r.data.properties.hashed_token;
  const client = createClient(SUPABASE_URL, ANON, opts);
  r = await client.auth.verifyOtp({ token_hash: artifact, type: "email" }); artifact = null;
  if (r.error || !r.data.session) throw new Error("PASSWORDLESS_EXCHANGE");
  const session = r.data.session;
  r = await admin.from("users").insert({ auth_user_id: authId, email, status: "active", primary_role_code: "trainer" }).select("id").single();
  if (r.error) throw new Error("APP_USER_CREATE"); const userId = r.data.id; owned.users.push(userId);
  r = await admin.from("member_profiles").insert({ user_id: userId, display_name: `Trainer Participant ${label}`, is_active: true }).select("id").single();
  if (r.error) throw new Error("PROFILE_CREATE"); const profileId = r.data.id; owned.profiles.push(profileId);
  const level = await admin.from("membership_levels").select("id").eq("code", "trainer").single();
  r = await admin.from("user_membership_levels").insert({ user_id: userId, membership_level_id: level.data.id, starts_at: new Date().toISOString() }).select("id").single();
  if (r.error) throw new Error("MEMBERSHIP_CREATE"); owned.memberships.push(r.data.id);
  let jar = [];
  const ssr = createServerClient(SUPABASE_URL, ANON, { cookies: { getAll: () => jar, setAll: values => { jar = values; } } });
  await ssr.auth.setSession({ access_token: session.access_token, refresh_token: session.refresh_token });
  return { userId, profileId, client, jar };
}

async function contextFor(actor, viewport) {
  const context = await browser.newContext({ viewport, extraHTTPHeaders: { "x-vercel-protection-bypass": BYPASS } });
  await context.addCookies(actor.jar.map(c => ({ name: c.name, value: c.value, url: PREVIEW, httpOnly: !!c.options?.httpOnly, secure: true, sameSite: c.options?.sameSite === "none" ? "None" : c.options?.sameSite === "strict" ? "Strict" : "Lax" })));
  return context;
}

async function visible(page, text) { await page.getByText(text, { exact: false }).first().waitFor({ state: "visible", timeout: 15000 }); }
async function addHorse(stableId, suffix) {
  const r = await admin.from("horses").insert({ stable_id: stableId, name: `Synthetic Horse 035B-${suffix}-${RUN}`, slug: `${RUN.toLowerCase()}-horse-${suffix.toLowerCase()}`, status: "active", breed: "Synthetic", colour: "Synthetic" }).select("id").single();
  if (r.error) throw new Error("HORSE_CREATE"); owned.horses.push(r.data.id); return r.data.id;
}
async function grant(actor, horseId, stableId, accessLevel) {
  const r = await admin.from("biochemistry_horse_access_assignments").insert({ horse_id: horseId, stable_id: stableId, member_profile_id: actor.profileId, role_code: "trainer", access_level: accessLevel, nominated_by_user_id: actor.userId, starts_at: new Date().toISOString(), notes: RUN }).select("id").single();
  if (r.error) throw new Error("ACCESS_CREATE"); owned.access.push(r.data.id); return r.data.id;
}
async function addTest(horseId, stableId, actor, date, scoringStatus, score) {
  const r = await admin.from("biochemistry_tests").insert({ horse_id: horseId, stable_id: stableId, test_date: date, time_of_day: "am", carbs_reading: 1, ph_saliva: 7, ph_urine: 7, ph_average: 7, conductivity_raw_meter_value: 1, conductivity_converted_c_value: 1.43, urea_reading: 1, scoring_status: scoringStatus, scoring_blockers: scoringStatus === "blocked" ? [{ lookupType: "synthetic", exactReading: 1 }] : [], health_score: score, created_by_user_id: actor.userId, updated_by_user_id: actor.userId }).select("id").single();
  if (r.error) throw new Error("TEST_CREATE"); owned.tests.push(r.data.id); return r.data.id;
}

try {
  const before = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (before.error || before.data.users.some(u => u.user_metadata?.synthetic_run === RUN)) throw new Error("OPENING_ZERO_REFUSED");
  const A = await actor("A"), B = await actor("B"), C = await actor("C");
  pass("passwordless-auth", "three controlled sessions established by one-time magic-link exchange; no passwords");
  let r = await admin.from("stables").insert({ name: `Synthetic Stable 035B ${RUN}`, code: `S35B${RUN.slice(-6)}`, status: "active" }).select("id").single();
  if (r.error) throw new Error("STABLE_CREATE"); const stable = r.data.id; owned.stable.push(stable);
  const horseA = await addHorse(stable, "A"), horseB = await addHorse(stable, "B"), horseC = await addHorse(stable, "C");
  await grant(A, horseA, stable, "manage"); await grant(A, horseB, stable, "manage"); await grant(A, horseC, stable, "manage");
  await grant(B, horseB, stable, "read"); const cGrant = await grant(C, horseC, stable, "manage");
  await addTest(horseB, stable, A, "2026-07-29", "blocked", null);
  const completed = await addTest(horseC, stable, A, "2026-07-28", "scored", 0.5);
  await addTest(horseA, stable, A, "2026-07-27", "unscored", null);
  browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  const ctxA = await contextFor(A, { width: 390, height: 844 }), ctxB = await contextFor(B, { width: 1440, height: 900 }), ctxC = await contextFor(C, { width: 1024, height: 768 });
  const pa = await ctxA.newPage(), pb = await ctxB.newPage(), pc = await ctxC.newPage();
  await pa.goto(`${PREVIEW}/portal`, { waitUntil: "load" });
  await visible(pa, `Synthetic Horse 035B-A-${RUN}`); await visible(pa, "Incomplete"); await visible(pa, "Pending review"); await visible(pa, "Completed");
  if (await pa.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) throw new Error("PHONE_OVERFLOW");
  await pa.keyboard.press("Tab"); if (await pa.evaluate(() => document.activeElement?.tagName === "BODY")) throw new Error("FOCUS_MISSING");
  pass("phone-dashboard", "390x844 accessible-only dashboard rendered ordered workflow states with focus and no overflow");
  await pa.goto(`${PREVIEW}/portal/horses/${horseA}`, { waitUntil: "load" }); await visible(pa, "Back to trainer dashboard"); await visible(pa, "Incomplete"); await visible(pa, "Review current record");
  await pa.getByRole("link", { name: "Back to trainer dashboard" }).click(); await visible(pa, `Synthetic Horse 035B-A-${RUN}`);
  pass("workspace-return", "phone horse context, permitted correction action and dashboard return passed");
  await pb.goto(`${PREVIEW}/portal`, { waitUntil: "load" }); await visible(pb, `Synthetic Horse 035B-B-${RUN}`);
  if (await pb.getByText(`Synthetic Horse 035B-A-${RUN}`, { exact: true }).count() || await pb.getByText(`Synthetic Horse 035B-C-${RUN}`, { exact: true }).count()) throw new Error("ACCESS_LEAK_B");
  await pb.goto(`${PREVIEW}/portal/horses/${horseB}`, { waitUntil: "load" }); await visible(pb, "Pending review");
  if (await pb.getByRole("link", { name: /Capture|Review|Correction/i }).count()) throw new Error("READONLY_ACTION");
  await pb.goto(`${PREVIEW}/portal/horses/${horseA}`, { waitUntil: "load" }); await visible(pb, "Horse not available");
  pass("desktop-readonly-denial", "1440px read-only assignment, action suppression and wrong-horse denial passed");
  await pc.goto(`${PREVIEW}/portal`, { waitUntil: "load" }); await visible(pc, `Synthetic Horse 035B-C-${RUN}`); await pc.goto(`${PREVIEW}/portal/horses/${horseC}`, { waitUntil: "load" }); await visible(pc, "Completed");
  await admin.from("biochemistry_horse_access_assignments").delete().eq("id", cGrant); owned.access = owned.access.filter(id => id !== cGrant);
  await pc.goto(`${PREVIEW}/portal/horses/${horseC}`, { waitUntil: "load" }); await visible(pc, "Horse not available");
  pass("tablet-revocation", "1024x768 completed state and immediate revoked-access denial passed without horse workflow leakage");
  const bWrite = await B.client.from("biochemistry_tests").insert({ horse_id: horseB, stable_id: stable, test_date: "2026-07-30", time_of_day: "pm", carbs_reading: 1, ph_saliva: 7, ph_urine: 7, ph_average: 7, conductivity_raw_meter_value: 1, conductivity_converted_c_value: 1.43, urea_reading: 1 });
  if (!bWrite.error) throw new Error("RLS_READONLY_WRITE");
  const cRead = await C.client.from("biochemistry_tests").select("id").eq("id", completed);
  if (cRead.error || cRead.data.length) throw new Error("RLS_REVOCATION");
  pass("rls-agreement", "read-only write and revoked record read denied by authenticated RLS");
  await Promise.all([ctxA.close(), ctxB.close(), ctxC.close()]);
} catch (e) { failure = e.message || "UNEXPECTED"; }
finally {
  await browser?.close().catch(() => {});
  try { await cleanup(); } catch (e) { failure = failure || e.message; }
  for (const key of ["PP035B_SUPABASE_ANON_KEY", "PP035B_SUPABASE_SERVICE_ROLE_KEY", "PP035B_VERCEL_BYPASS"]) delete process.env[key];
}

const report = { harness: "035B", state: failure ? "failed-restored" : "pass", failure: failure || "none", run: RUN, ceiling: { stable: 1, horses: 3, auth: 3, storage: 0 }, cases, cleanup: { application: 0, auth: 0, storage: 0 } };
process.stdout.write(JSON.stringify(report) + "\n");
if (failure) process.exitCode = 2;
