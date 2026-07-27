#!/usr/bin/env node
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

class Stop extends Error { constructor(code) { super(code); this.code = code; } }
const REF = "uvskssaecdhxcgytkasc";
const OLD = "tagnbgkroihagjmvehlx";
const TABLES = ["users", "member_profiles", "user_membership_levels", "stables", "horses", "owners", "horse_assignments", "stable_role_assignments", "biochemistry_horse_access_assignments", "biochemistry_tests", "biochemistry_test_notes"];

function load(file, names) {
  const out = {};
  for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=([^\r\n]+)$/.exec(raw);
    if (match && names.includes(match[1])) out[match[1]] = match[2];
  }
  if (names.some((name) => !out[name])) throw new Stop("ENV_SCHEMA_REFUSED");
  return out;
}
function target(value) {
  const url = new URL(value);
  if (url.hostname === `${OLD}.supabase.co`) throw new Stop("OLD_PROJECT_REFUSED");
  if (url.protocol !== "https:" || url.hostname !== `${REF}.supabase.co` || url.pathname !== "/" || url.username || url.password || url.port) throw new Stop("TARGET_REFUSED");
  return url.origin;
}
async function zero(service) {
  const auth = await service.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const buckets = await service.storage.listBuckets();
  if (auth.error || buckets.error) throw new Stop("ZERO_QUERY_FAILED");
  let application = 0;
  for (const table of TABLES) {
    const result = await service.from(table).select("*", { count: "exact", head: true });
    if (result.error || typeof result.count !== "number") throw new Stop("ZERO_QUERY_FAILED");
    application += result.count;
  }
  return { auth: auth.data.users.length, application, storage: buckets.data.length };
}
function classify(error, data, mutated, attributed) {
  if (mutated) return data === true && !error && attributed ? "true-and-one-row" : "unsafe-mutation";
  if (!error && data === false) return "false-no-row";
  if (!error) return "unexpected-result-no-row";
  const code = typeof error.code === "string" ? error.code.toUpperCase() : "";
  if (["42601", "42883", "42703", "42P01", "P0001"].includes(code)) return "rpc-syntax-or-resolution-error-no-row";
  if (["42501", "28000", "28P01", "PGRST301", "PGRST302"].includes(code)) return "rpc-authorization-error-no-row";
  return "rpc-other-error-no-row";
}

async function main() {
  const pub = load(".env.local", ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]);
  const sec = load(".env.production.local", ["SUPABASE_SERVICE_ROLE_KEY"]);
  const url = target(pub.NEXT_PUBLIC_SUPABASE_URL);
  const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
  const service = createClient(url, sec.SUPABASE_SERVICE_ROLE_KEY, options);
  const opening = await zero(service);
  if (Object.values(opening).some(Boolean)) throw new Stop("OPENING_ZERO_REFUSED");
  const ids = { auth: null, user: null, profile: null, membership: null, stable: null, horse: null, stableRole: null, access: null, test: null, note: null };
  let actor = null, session = null, resultClass = "unexpected-result-no-row", failure = null;
  const run = `021AHD-${Date.now().toString(36).toUpperCase()}`;
  const remove = async (table, id) => { if (!id) return; const result = await service.from(table).delete().eq("id", id); if (result.error) throw new Stop(`CLEANUP_${table.toUpperCase()}`); };
  try {
    const email = `${run.toLowerCase()}-author@precision-performance.invalid`;
    const created = await service.auth.admin.createUser({ email, email_confirm: true, user_metadata: { proof_alias: "AUTHOR" } });
    if (created.error || !created.data.user) throw new Stop("AUTH_CREATE_FAILED"); ids.auth = created.data.user.id;
    const link = await service.auth.admin.generateLink({ type: "magiclink", email });
    if (link.error || !link.data.properties?.hashed_token) throw new Stop("SESSION_LINK_FAILED");
    actor = createClient(url, pub.NEXT_PUBLIC_SUPABASE_ANON_KEY, options);
    const exchange = await actor.auth.verifyOtp({ token_hash: link.data.properties.hashed_token, type: "email" });
    if (exchange.error || !exchange.data.session) throw new Stop("SESSION_CREATE_FAILED"); session = exchange.data.session;
    const user = await service.from("users").insert({ auth_user_id: ids.auth, email, status: "active", primary_role_code: "trainer" }).select("id").single();
    if (user.error || !user.data?.id) throw new Stop("USER_CREATE_FAILED"); ids.user = user.data.id;
    const profile = await service.from("member_profiles").insert({ user_id: ids.user, display_name: `${run}-AUTHOR`, is_active: true }).select("id").single();
    if (profile.error || !profile.data?.id) throw new Stop("PROFILE_CREATE_FAILED"); ids.profile = profile.data.id;
    const level = await service.from("membership_levels").select("id").eq("code", "trainer").single();
    if (level.error || !level.data?.id) throw new Stop("LEVEL_LOOKUP_FAILED");
    const membership = await service.from("user_membership_levels").insert({ user_id: ids.user, membership_level_id: level.data.id, starts_at: new Date().toISOString() }).select("id").single();
    if (membership.error || !membership.data?.id) throw new Stop("MEMBERSHIP_CREATE_FAILED"); ids.membership = membership.data.id;
    const stable = await service.from("stables").insert({ name: `${run}-STABLE`, code: `${run}-S` }).select("id").single();
    if (stable.error || !stable.data?.id) throw new Stop("STABLE_CREATE_FAILED"); ids.stable = stable.data.id;
    const horse = await service.from("horses").insert({ stable_id: ids.stable, name: `${run}-HORSE`, slug: `${run.toLowerCase()}-horse` }).select("id").single();
    if (horse.error || !horse.data?.id) throw new Stop("HORSE_CREATE_FAILED"); ids.horse = horse.data.id;
    const stableRole = await service.from("stable_role_assignments").insert({ stable_id: ids.stable, member_profile_id: ids.profile, role_code: "trainer", assigned_by_user_id: ids.user, starts_at: new Date().toISOString() }).select("id").single();
    if (stableRole.error || !stableRole.data?.id) throw new Stop("STABLE_ROLE_CREATE_FAILED"); ids.stableRole = stableRole.data.id;
    const access = await service.from("biochemistry_horse_access_assignments").insert({ horse_id: ids.horse, stable_id: ids.stable, member_profile_id: ids.profile, role_code: "trainer", access_level: "manage", nominated_by_user_id: ids.user, starts_at: new Date().toISOString(), notes: run }).select("id").single();
    if (access.error || !access.data?.id) throw new Stop("ACCESS_CREATE_FAILED"); ids.access = access.data.id;
    const test = await service.from("biochemistry_tests").insert({ horse_id: ids.horse, stable_id: ids.stable, test_date: "2026-07-27", time_of_day: "am", carbs_reading: 0, ph_saliva: 4.8, ph_urine: 4.8, ph_average: 4.8, conductivity_raw_meter_value: 0, conductivity_converted_c_value: 0, urea_reading: 0, created_by_user_id: ids.user }).select("id").single();
    if (test.error || !test.data?.id) throw new Stop("TEST_CREATE_FAILED"); ids.test = test.data.id;
    const note = await service.from("biochemistry_test_notes").insert({ test_id: ids.test, horse_id: ids.horse, note_text: run, note_source: "manual", created_by_user_id: ids.user, updated_by_user_id: ids.user }).select("id").single();
    if (note.error || !note.data?.id) throw new Stop("NOTE_CREATE_FAILED"); ids.note = note.data.id;
    const rpc = await actor.rpc("soft_delete_biochemistry_comment", { target_note_id: ids.note, target_test_id: ids.test });
    const state = await service.from("biochemistry_test_notes").select("deleted_at,deleted_by_user_id,updated_by_user_id,created_by_user_id").eq("id", ids.note).single();
    if (state.error) throw new Stop("AUTHORITATIVE_STATE_FAILED");
    const mutated = Boolean(state.data.deleted_at);
    const attributed = mutated && state.data.created_by_user_id === ids.user && state.data.deleted_by_user_id === ids.user && state.data.updated_by_user_id === ids.user;
    resultClass = classify(rpc.error, rpc.data, mutated, attributed);
  } catch (error) { failure = error instanceof Stop ? error.code : "UNEXPECTED_DIAGNOSTIC_FAILURE"; }
  finally {
    try {
      await remove("biochemistry_test_notes", ids.note); await remove("biochemistry_tests", ids.test); await remove("biochemistry_horse_access_assignments", ids.access); await remove("stable_role_assignments", ids.stableRole);
      if (ids.horse) await service.from("horse_ownership_history").delete().eq("horse_id", ids.horse);
      await remove("horses", ids.horse); await remove("stables", ids.stable); await remove("user_membership_levels", ids.membership); await remove("member_profiles", ids.profile); await remove("users", ids.user);
      if (ids.auth) { const removed = await service.auth.admin.deleteUser(ids.auth, false); if (removed.error) throw new Stop("CLEANUP_AUTH"); }
    } catch (error) { failure ||= error instanceof Stop ? error.code : "CLEANUP_UNEXPECTED"; }
    if (actor) await actor.auth.signOut({ scope: "local" }); if (session) { session.access_token = null; session.refresh_token = null; }
  }
  const closing = await zero(service); const clean = Object.values(closing).every((value) => value === 0);
  process.stdout.write(`${JSON.stringify({ harness: "021AH", stage: "direct-author-diagnostic", outcome: !failure && clean && resultClass !== "unsafe-mutation" ? "pass" : "fail", failure, resultClass, opening, closing, cleanup: clean ? "auth-last-clean" : "failed", fixture: { actors: ids.auth ? 1 : 0, notes: ids.note ? 1 : 0, storage: 0 }, deployedSource: "schema-qualified-coalesce-present", oldProject: "not-contacted", output: "fixed-classes-counts-only" })}\n`);
  if (failure || !clean || resultClass === "unsafe-mutation") process.exitCode = 1;
}
main().catch((error) => { process.stdout.write(`${JSON.stringify({ harness: "021AH", stage: "direct-author-diagnostic", outcome: "stopped", messageCode: error.code || "UNEXPECTED" })}\n`); process.exitCode = 1; });
