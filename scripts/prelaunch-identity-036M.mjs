import { assertSafeProjection } from "./prelaunch-recovery-036M.mjs";
import { deleteIdentityAuthLast, exactIdentityMatch, validateDependencyManifest, validateMigrationAuthorityFixture } from "./prelaunch-readiness-036K.mjs";

import { EXPECTED_DEPENDENCIES } from "./prelaunch-readiness-036K.mjs";
export const PRIVATE_IDENTITY_DECISIONS = Object.freeze(["retain-real", "delete-obsolete", "unresolved"]);
export const SESSION_STATES = Object.freeze(["active", "revoked-and-invalid", "absent", "unknown"]);
function fail(code) { const error = new Error(code); error.code = code; throw error; }

export function createIdentityLiveAdapter(capabilities) {
  const required = ["exactAuthLookup", "dependencyKeys", "globalSignOut", "reuseProbe", "authLastDelete"];
  if (!capabilities || typeof capabilities !== "object" || Array.isArray(capabilities) || Object.keys(capabilities).some((key) => !required.includes(key)) || capabilities.exactAuthLookup !== true || !Array.isArray(capabilities.dependencyKeys) || capabilities.dependencyKeys.length !== 50 || new Set(capabilities.dependencyKeys).size !== 50 || capabilities.globalSignOut !== true || capabilities.reuseProbe !== true || capabilities.authLastDelete !== true) fail("IDENTITY_ADAPTER_REFUSED");
  return Object.freeze({
    exactAuthLookup: true,
    dependencyKeys: Object.freeze([...capabilities.dependencyKeys]),
    globalSignOut: true,
    reuseProbe: true,
    authLastDelete: true,
  });
}

export function projectExactIdentityReadback(readback) {
  if (!readback || ![1, 2].includes(readback.ordinal) || typeof readback.exactMatch !== "boolean" || !Number.isSafeInteger(readback.duplicates) || readback.duplicates !== 0 || !SESSION_STATES.includes(readback.sessionState)) fail("IDENTITY_AUTHORITY_REFUSED");
  return assertSafeProjection({ ordinal: readback.ordinal, exactMatch: readback.exactMatch, duplicates: 0, sessionState: readback.sessionState });
}

export function validateIdentityAuthorityInput({ ordinal, expectedAuthId, expectedEmailHash, candidates, ownerDecision }) {
  if (![1, 2].includes(ordinal) || !PRIVATE_IDENTITY_DECISIONS.includes(ownerDecision) || typeof expectedAuthId !== "string" || !/^[a-f0-9]{64}$/.test(expectedEmailHash || "")) fail("IDENTITY_AUTHORITY_REFUSED");
  const match = exactIdentityMatch({ expectedAuthId, expectedEmailHash, candidates });
  return { ordinal, match, ownerDecision };
}

export function decidePrivateIdentity({ authority, dependencyRows, exactRoleProjection, sessionAvailable, migrationRoot }) {
  validateMigrationAuthorityFixture(migrationRoot);
  const manifest = validateDependencyManifest({ rows: dependencyRows, migrationRoot });
  if (authority.ownerDecision === "retain-real" && manifest.complete && !manifest.blocking && exactRoleProjection?.leastPrivilege === true && exactRoleProjection?.unintendedAccess === false) return assertSafeProjection({ ordinal: authority.ordinal, disposition: "retained-real-authorized", leastPrivilege: true });
  if (authority.ownerDecision === "delete-obsolete" && manifest.complete && !manifest.blocking && sessionAvailable === true) return assertSafeProjection({ ordinal: authority.ordinal, disposition: "delete-obsolete-ready", dependencies: 0, sessionRequired: true });
  return assertSafeProjection({ ordinal: authority.ordinal, disposition: "unresolved-retained-blocking", changed: false });
}

export async function executeIdentityDeletion({ authority, dependencyRows, exactSession, adapter, migrationRoot }) {
  if (authority.ownerDecision !== "delete-obsolete") fail("IDENTITY_DELETE_REFUSED");
  const manifest = validateDependencyManifest({ rows: dependencyRows, migrationRoot });
  if (manifest.blocking) fail("IDENTITY_DELETE_REFUSED");
  const result = await deleteIdentityAuthLast({ exactAuthId: authority.match.authId, exactSession, manifest, adapter });
  return assertSafeProjection({ ordinal: authority.ordinal, disposition: "deleted-obsolete-clean", session: result.session, auth: result.auth, authTerminalMutations: result.terminalAuthMutations });
}

export function validateTwoIdentityLanding(rows) {
  if (!Array.isArray(rows) || rows.length !== 2 || rows[0]?.ordinal === rows[1]?.ordinal || !rows.some((row) => row.ordinal === 1) || !rows.some((row) => row.ordinal === 2)) fail("IDENTITY_LANDING_REFUSED");
  const allowed = new Set(["retained-real-authorized", "deleted-obsolete-clean", "unresolved-retained-blocking"]);
  if (rows.some((row) => !allowed.has(row.disposition))) fail("IDENTITY_LANDING_REFUSED");
  return assertSafeProjection({ identities: 2, targetReady: rows.every((row) => row.disposition !== "unresolved-retained-blocking"), unresolved: rows.filter((row) => row.disposition === "unresolved-retained-blocking").length });
}

export function sanitizeIdentityFailure(error) {
  return ["IDENTITY_AUTHORITY_REFUSED", "IDENTITY_DELETE_REFUSED", "IDENTITY_LANDING_REFUSED"].includes(error?.code) ? error.code : "UNEXPECTED";
}
export async function executeLiveIdentityDispositions({ payload, handles, opaque }) {
  const fixture = validateMigrationAuthorityFixture();
  if (fixture.names.length !== 25 || fixture.dependencies.length !== 50) fail("IDENTITY_ADAPTER_REFUSED");
  const projectRef = opaque.peek(handles.project);
  const serviceKey = opaque.peek(handles.secretKey);
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(`https://${projectRef}.supabase.co`, serviceKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const rows = [];
  let externalMutations = 0;
  for (const ordinal of [1, 2]) {
    const authId = String(payload[`identity${ordinal}AuthId`] ?? "");
    const address = String(payload[`identity${ordinal}Address`] ?? "").trim().toLowerCase();
    const decision = String(payload[`identity${ordinal}Decision`] ?? "");
    if (!/^[0-9a-f-]{36}$/i.test(authId) || !address || !PRIVATE_IDENTITY_DECISIONS.includes(decision)) fail("IDENTITY_AUTHORITY_REFUSED");
    const result = await admin.auth.admin.getUserById(authId);
    const user = result.data?.user;
    const exact = !result.error && user?.id === authId && String(user.email ?? "").trim().toLowerCase() === address;
    if (!exact) {
      rows.push({ ordinal, disposition: "unresolved-retained-blocking" });
      continue;
    }
    if (decision === "retain-real") {
      const role = await admin.from("users").select("id,primary_role_code,status").eq("auth_user_id", authId).maybeSingle();
      const membership = role.data?.id ? await admin.from("user_membership_levels").select("id,membership_levels!inner(code)").eq("user_id", role.data.id).eq("membership_levels.code", "trainer") : { data: [], error: true };
      const leastPrivilege = !role.error && role.data?.primary_role_code === "trainer" && role.data?.status === "active" && !membership.error && Array.isArray(membership.data) && membership.data.length === 1;
      rows.push({ ordinal, disposition: leastPrivilege ? "retained-real-authorized" : "unresolved-retained-blocking" });
      continue;
    }
    rows.push({ ordinal, disposition: "unresolved-retained-blocking" });
  }
  const landing = validateTwoIdentityLanding(rows);
  for (const key of Object.keys(payload)) payload[key] = null;
  if (payload.trainerOwnerApproved !== true) fail("TRAINER_IDENTITY_REFUSED");
  const trainerAuthId = opaque.peek(handles.trainerAuthId);
  const trainerAuth = await admin.auth.admin.getUserById(trainerAuthId);
  if (trainerAuth.error || trainerAuth.data?.user?.id !== trainerAuthId) fail("IDENTITY_AUTHORITY_REFUSED");
  const appRows = await admin.from("users").select("id", { count: "exact", head: true }).eq("auth_user_id", trainerAuthId);
  if (appRows.error || appRows.count !== 0) fail("TRAINER_IDENTITY_REFUSED");
  const baselineSignIn = String(trainerAuth.data?.user?.last_sign_in_at ?? "");
  handles.trainerSessionBaseline = opaque.put(baselineSignIn);
  return { identities: 2, ready: landing.targetReady, unresolved: landing.unresolved, externalMutations, residue: 0 };
}

async function digestAddress(value) {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(value, "utf8").digest("hex");
}
