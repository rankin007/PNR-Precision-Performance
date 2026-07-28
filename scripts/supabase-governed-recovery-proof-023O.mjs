import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const projectRef = "uvskssaecdhxcgytkasc";
const recoveryDir = "C:\\tmp\\aprec8-023l-recovery";
const readBindings = (file) => Object.fromEntries(fs.readFileSync(file, "utf8").split(/\r?\n/)
  .map((line) => line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)).filter(Boolean)
  .map((match) => [match[1], match[2].replace(/^(['"])(.*)\1$/, "$2")]));
const publicBindings = readBindings(".env.local");
const protectedBindings = readBindings(".env.test.local");
const url = publicBindings.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = publicBindings.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = protectedBindings.SUPABASE_SERVICE_ROLE_KEY;
assert.equal(new URL(url).hostname, `${projectRef}.supabase.co`);
assert(anonKey && serviceKey);

const options = { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } };
const admin = createClient(url, serviceKey, options);
const userClient = createClient(url, anonKey, options);
const ids = Object.fromEntries(["appUser", "profile", "stable", "horse", "test"].map((name) => [name, crypto.randomUUID()]));
const nonce = crypto.randomUUID();
const email = `synthetic-023o-${nonce}@example.com`;
const password = `S023O!${crypto.randomBytes(24).toString("base64url")}`;
const jpeg = Buffer.from("/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9oADAMBAAIAAwAAABAf/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPxB//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPxB//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxB//9k=", "base64");
const digest = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex").toUpperCase();
const result = { targetExact: true, initiationSucceeded: false, intentValid: false, transferSucceeded: false,
  failClosed: false, recoveryRoundTrip: false, objectAbsent: false, cleanupComplete: false };
let authUserId = null;
let uploadId = null;
let objectKey = null;
let stage = "initialise";
let failure = null;

const requireNoError = (response, label) => {
  if (response.error) throw new Error(label);
  return response.data;
};
const removeExact = async (table, column, value) => {
  if (!value) return;
  const response = await admin.from(table).delete().eq(column, value);
  if (response.error) throw new Error(`cleanup:${table}`);
};

try {
  fs.mkdirSync(recoveryDir, { recursive: true });
  assert.equal(fs.readdirSync(recoveryDir).length, 0);
  stage = "authority";
  const created = requireNoError(await admin.auth.admin.createUser({ email, password, email_confirm: true }), "auth-create");
  authUserId = created.user?.id;
  assert(authUserId);
  requireNoError(await admin.from("users").insert({ id: ids.appUser, auth_user_id: authUserId, email, status: "active", primary_role_code: "administrator" }), "app-user");
  requireNoError(await admin.from("member_profiles").insert({ id: ids.profile, user_id: ids.appUser, display_name: "Synthetic 023O", is_active: true }), "profile");
  requireNoError(await admin.from("stables").insert({ id: ids.stable, name: "Synthetic 023O Stable", code: `S23O-${nonce}`, status: "active" }), "stable");
  requireNoError(await admin.from("horses").insert({ id: ids.horse, stable_id: ids.stable, name: "Synthetic 023O Horse", slug: `synthetic-023o-${nonce}`, status: "active" }), "horse");
  requireNoError(await admin.from("biochemistry_tests").insert({ id: ids.test, horse_id: ids.horse, stable_id: ids.stable,
    test_date: new Date().toISOString().slice(0, 10), time_of_day: "unspecified", carbs_reading: 1,
    ph_saliva: 7, ph_urine: 7, ph_average: 7, conductivity_raw_meter_value: 1,
    conductivity_converted_c_value: 1.43, urea_reading: 1, created_by_user_id: ids.appUser,
    updated_by_user_id: ids.appUser }), "test");
  requireNoError(await userClient.auth.signInWithPassword({ email, password }), "sign-in");

  stage = "initiation";
  const initiated = requireNoError(await userClient.rpc("initiate_test_evidence_upload", {
    p_test_id: ids.test, p_declared_name: "synthetic-proof.jpg", p_declared_mime: "image/jpeg",
    p_declared_bytes: jpeg.length, p_idempotency_key: `023O-${crypto.randomUUID()}-${crypto.randomUUID()}`,
    p_acknowledgement: true, p_replaces_id: null,
  }), "initiation");
  result.initiationSucceeded = true;
  assert(Array.isArray(initiated) && initiated.length === 1);
  const intent = initiated[0];
  uploadId = intent.upload_id;
  objectKey = intent.object_key;
  assert(intent.attempt_id && uploadId && intent.bucket_id === "test-evidence" && objectKey?.startsWith("v1/") && Date.parse(intent.expires_at) > Date.now());
  result.intentValid = true;

  stage = "signed-transfer";
  const signed = requireNoError(await admin.storage.from("test-evidence").createSignedUploadUrl(objectKey, { upsert: false }), "sign-upload");
  assert(signed?.token);
  requireNoError(await userClient.storage.from("test-evidence").uploadToSignedUrl(objectKey, signed.token, jpeg,
    { contentType: "image/jpeg", upsert: false }), "upload");
  result.transferSucceeded = true;

  stage = "fail-closed-finalise";
  requireNoError(await userClient.rpc("mutate_test_evidence_lifecycle", { p_operation: "finalise", p_upload_id: uploadId, p_test_id: ids.test }), "finalise");
  const state = requireNoError(await admin.from("biochemistry_test_uploads").select("state,reason_code").eq("id", uploadId).single(), "state");
  assert.equal(state.state, "blocked");
  assert.equal(state.reason_code, "safety_services_unavailable");
  result.failClosed = true;

  stage = "recovery";
  const downloaded = requireNoError(await admin.storage.from("test-evidence").download(objectKey), "download");
  const exported = Buffer.from(await downloaded.arrayBuffer());
  assert.equal(digest(exported), digest(jpeg));
  const exportPath = path.join(recoveryDir, "023o-export.bin");
  const encryptedPath = path.join(recoveryDir, "023o-export.dpapi");
  const restoredPath = path.join(recoveryDir, "023o-restored.bin");
  fs.writeFileSync(exportPath, exported);
  const dpapi = spawnSync("powershell.exe", ["-NoProfile", "-Command",
    "$ErrorActionPreference='Stop'; Add-Type -AssemblyName System.Security; " +
    "$plain=[IO.File]::ReadAllBytes($env:PP023P_DPAPI_SOURCE); $cipher=[Security.Cryptography.ProtectedData]::Protect($plain,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); " +
    "[IO.File]::WriteAllBytes($env:PP023P_DPAPI_ENCRYPTED,$cipher); $round=[Security.Cryptography.ProtectedData]::Unprotect([IO.File]::ReadAllBytes($env:PP023P_DPAPI_ENCRYPTED),$null,[Security.Cryptography.DataProtectionScope]::CurrentUser); [IO.File]::WriteAllBytes($env:PP023P_DPAPI_RESTORED,$round)"],
  { stdio: "pipe", env: { ...process.env, PP023P_DPAPI_SOURCE: exportPath, PP023P_DPAPI_ENCRYPTED: encryptedPath, PP023P_DPAPI_RESTORED: restoredPath } });
  assert.equal(dpapi.status, 0);
  assert.equal(digest(fs.readFileSync(restoredPath)), digest(exported));
  result.recoveryRoundTrip = true;

  stage = "governed-removal";
  requireNoError(await admin.storage.from("test-evidence").remove([objectKey]), "object-remove");
  const absent = await admin.storage.from("test-evidence").download(objectKey);
  assert(absent.error && !absent.data);
  result.objectAbsent = true;
  for (const file of [exportPath, encryptedPath, restoredPath]) fs.rmSync(file, { force: true });
} catch (error) {
  failure = error instanceof Error ? error.message : "unknown";
} finally {
  stage = failure ? `cleanup-after-${stage}` : "cleanup";
  const cleanupErrors = [];
  const safely = async (work) => { try { await work(); } catch { cleanupErrors.push(true); } };
  if (objectKey) await safely(async () => { await admin.storage.from("test-evidence").remove([objectKey]); });
  await safely(() => removeExact("evidence_audit_events", "test_id", ids.test));
  await safely(() => removeExact("evidence_holds", "upload_id", uploadId));
  await safely(() => removeExact("evidence_upload_attempts", "test_id", ids.test));
  await safely(() => removeExact("biochemistry_test_uploads", "test_id", ids.test));
  await safely(() => removeExact("biochemistry_tests", "id", ids.test));
  await safely(() => removeExact("biochemistry_horse_access_assignments", "horse_id", ids.horse));
  await safely(() => removeExact("stable_role_assignments", "stable_id", ids.stable));
  await safely(() => removeExact("horses", "id", ids.horse));
  await safely(() => removeExact("stables", "id", ids.stable));
  await safely(() => removeExact("member_profiles", "id", ids.profile));
  await safely(() => removeExact("users", "id", ids.appUser));
  if (authUserId) await safely(async () => { const deleted = await admin.auth.admin.deleteUser(authUserId); if (deleted.error) throw new Error("auth-delete"); });
  for (const file of ["023o-export.bin", "023o-export.dpapi", "023o-restored.bin"]) fs.rmSync(path.join(recoveryDir, file), { force: true });
  result.cleanupComplete = cleanupErrors.length === 0;
}

const count = async (table) => {
  const response = await admin.from(table).select("*", { head: true, count: "exact" });
  if (response.error) throw new Error(`count:${table}`);
  return response.count ?? -1;
};
const authCount = (await admin.auth.admin.listUsers({ page: 1, perPage: 1 })).data?.total ?? -1;
const applicationTables = ["users", "member_profiles", "stables", "horses", "stable_role_assignments", "biochemistry_horse_access_assignments",
  "biochemistry_tests", "biochemistry_test_uploads", "evidence_upload_attempts", "evidence_holds", "evidence_audit_events"];
let applicationCount = 0;
for (const table of applicationTables) applicationCount += await count(table);
const storageList = requireNoError(await admin.storage.from("test-evidence").list("", { limit: 1, offset: 0 }), "storage-count");
const storageCount = storageList?.length ?? 0;
const recoveryCount = fs.existsSync(recoveryDir) ? fs.readdirSync(recoveryDir).length : 0;
const zeroState = [authCount, applicationCount, storageCount, recoveryCount];
console.log(JSON.stringify({ stage, ...result, payloadSha256: digest(jpeg), finalState: zeroState, failure: failure ? "classified-runtime-failure" : null }));
if (failure || !Object.values(result).every(Boolean) || zeroState.some((value) => value !== 0)) process.exit(2);
