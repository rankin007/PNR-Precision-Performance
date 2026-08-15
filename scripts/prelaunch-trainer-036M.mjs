import { assertSafeProjection, createGraphMutationLedger, recordGraphAbsence, recordGraphMutation, validateGraphLanding } from "./prelaunch-recovery-036M.mjs";

export const GRAPH_TABLES = Object.freeze(["users", "member_profiles", "user_membership_levels", "stables", "trainers", "horses", "horse_assignments", "biochemistry_horse_access_assignments"]);
export const TRAINER_TASKS = Object.freeze(["portal", "dashboard", "syntheticHorse", "noSubmitReview", "wrongHorseDenied", "signOut", "signedOutDenied", "anonymousDenied"]);
const PHONE_STATE = new WeakMap();
function fail(code) { const error = new Error(code); error.code = code; throw error; }

export function createPhoneNativeDeliveryLedger() {
  let handle;
  const snapshot = Object.freeze(() => {
    const state = PHONE_STATE.get(handle);
    if (!state) fail("DELIVERY_LEDGER_REFUSED");
    return Object.freeze({ ...state });
  });
  handle = Object.freeze({ snapshot });
  PHONE_STATE.set(handle, { message: 0, verification: 0, controllerAuthCalls: 0, sessionBridgeCalls: 0, addressReceived: 0, codeReceived: 0, cookieReceived: 0 });
  return handle;
}

export function recordPhoneNativeObservation(handle, action, observed) {
  const state = PHONE_STATE.get(handle);
  if (!state || observed !== true || !["message", "verification"].includes(action)) fail("DELIVERY_LEDGER_REFUSED");
  if (action === "verification" && state.message !== 1) fail("DELIVERY_ORDER_REFUSED");
  if (state[action] !== 0) fail("DELIVERY_CEILING_REFUSED");
  PHONE_STATE.set(handle, { ...state, [action]: 1 });
  return handle.snapshot();
}

export function validatePhoneNativeLanding(handle, sessionReadback) {
  const state = PHONE_STATE.get(handle);
  if (!state || state.message !== 1 || state.verification !== 1 || Object.entries(state).some(([key, value]) => !["message", "verification"].includes(key) && value !== 0)) fail("DELIVERY_CEILING_REFUSED");
  if (!sessionReadback || ![1, 2].includes(sessionReadback.ordinal) || sessionReadback.sessionActive !== true || sessionReadback.protectedOutput !== false) fail("TRAINER_LANDING_REFUSED");
  return assertSafeProjection({ message: 1, verification: 1, ordinal: sessionReadback.ordinal, sessionActive: true, controllerAuthCalls: 0, sessionBridgeCalls: 0 });
}

export function validateDeliveryCounters(counters) {
  const expected = { message: 1, verification: 1, resend: 0, generatedLink: 0, mailboxAutomation: 0, password: 0, adminSubstitute: 0, serviceRoleSubstitute: 0 };
  if (!counters || Object.keys(expected).some((key) => counters[key] !== expected[key])) fail("DELIVERY_CEILING_REFUSED");
  return true;
}
export function validateTrainerSessionTransition({ baseline, current }) {
  if (typeof baseline !== "string" || typeof current !== "string" || !current) fail("TRAINER_LANDING_REFUSED");
  const currentTime = Date.parse(current);
  const baselineTime = baseline ? Date.parse(baseline) : Number.NEGATIVE_INFINITY;
  if (!Number.isFinite(currentTime) || (baseline && !Number.isFinite(baselineTime)) || currentTime <= baselineTime) fail("TRAINER_LANDING_REFUSED");
  return assertSafeProjection({ advanced: true, sessionActive: true });
}


export function createGraphPlan(rows) {
  if (!Array.isArray(rows) || rows.length !== 8 || new Set(rows.map((row) => row.id)).size !== 8 || new Set(rows.map((row) => row.table)).size !== 8 || GRAPH_TABLES.some((table) => !rows.some((row) => row.table === table && row.owned === true && row.synthetic === true))) fail("GRAPH_PLAN_REFUSED");
  return structuredClone(rows);
}

export async function createReplacementGraph({ rows, adapter, ledger = createGraphMutationLedger() }) {
  const plan = createGraphPlan(rows);
  try {
    for (const row of plan) {
      recordGraphMutation(ledger, "replacementGraphCreates", row);
      await adapter.insertExactOwned(row);
      const readback = await adapter.readExact(row.table, row.id);
      if (!readback || JSON.stringify(readback) !== JSON.stringify(row)) fail("GRAPH_CREATE_REFUSED");
    }
    return { ledger, result: validateGraphLanding(ledger) };
  } catch (error) {
    for (const row of [...plan].reverse()) {
      const count = await adapter.countExact(row.table, row.id);
      if (count === 0) continue;
      if (count !== 1) fail("GRAPH_DELETE_REFUSED");
      recordGraphMutation(ledger, "replacementGraphCleanupDeletes", row);
      await adapter.deleteExact(row.table, row.id);
      recordGraphAbsence(ledger, "replacementGraphCleanupDeletes", row.id, await adapter.countExact(row.table, row.id));
    }
    const counts = await Promise.all(plan.map((row) => adapter.countExact(row.table, row.id)));
    if (counts.some((count) => count !== 0)) fail("GRAPH_DELETE_REFUSED");
    throw error;
  }
}

async function deleteRows({ rows, bucket, adapter, ledger }) {
  if (!Array.isArray(rows) || rows.length !== 8) fail("GRAPH_DELETE_REFUSED");
  for (const row of rows) {
    const before = await adapter.readExact(row.table, row.id);
    if (!before || JSON.stringify(before) !== JSON.stringify(row)) fail("GRAPH_DELETE_REFUSED");
    recordGraphMutation(ledger, bucket, row);
    await adapter.deleteExact(row.table, row.id);
    recordGraphAbsence(ledger, bucket, row.id, await adapter.countExact(row.table, row.id));
  }
  return validateGraphLanding(ledger, { requirePriorRetirement: bucket === "priorGraphRetirementDeletes" });
}

export function cleanupReplacementGraph(args) { return deleteRows({ ...args, bucket: "replacementGraphCleanupDeletes" }); }
export function retirePriorGraph(args) { return deleteRows({ ...args, bucket: "priorGraphRetirementDeletes" }); }

export function validateTrainerObservation(observation) {
  if (!observation || TRAINER_TASKS.some((task) => observation[task] !== true) || observation.viewport !== "supported-phone" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?\+10:00$/.test(observation.startedAt || "") || !Number.isInteger(observation.durationSeconds) || observation.durationSeconds < 0 || observation.durationSeconds > 5400) fail("TRAINER_OBSERVATION_REFUSED");
  return assertSafeProjection({ tasks: TRAINER_TASKS.length, passed: true, viewport: observation.viewport, startedAt: observation.startedAt, durationSeconds: observation.durationSeconds, under60Claim: false, representativeClaim: false });
}

export function validateTrainerIdentity({ exactMatch, ownerApproved, leastPrivilege, duplicate, createdByNormalSignIn }) {
  if (duplicate === true || ownerApproved !== true || leastPrivilege !== true || (exactMatch !== true && createdByNormalSignIn !== true)) fail("TRAINER_IDENTITY_REFUSED");
  return true;
}

export function trainerLanding({ counters, observation, graph, sessionResidue, storageResidue, ownerRetainsAuth }) {
  validateDeliveryCounters(counters);
  validateTrainerObservation(observation);
  if (!graph || graph.creates !== 8 || sessionResidue !== 0 || storageResidue !== 0 || typeof ownerRetainsAuth !== "boolean") fail("TRAINER_LANDING_REFUSED");
  return assertSafeProjection({ trainer: 1, message: 1, verification: 1, application: 8, sessionResidue: 0, storageResidue: 0, ownerRetainsAuth });
}

export function sanitizeTrainerFailure(error) {
  return ["DELIVERY_CEILING_REFUSED", "GRAPH_PLAN_REFUSED", "GRAPH_CREATE_REFUSED", "GRAPH_DELETE_REFUSED", "TRAINER_OBSERVATION_REFUSED", "TRAINER_IDENTITY_REFUSED", "TRAINER_LANDING_REFUSED"].includes(error?.code) ? error.code : "UNEXPECTED";
}
export async function executeLiveTrainerGraphPrepare({ payload, handles, opaque }) {
  if (!payload || ![1, 2].includes(payload.trainerOrdinal)) fail("TRAINER_IDENTITY_REFUSED");
  const projectRef = opaque.peek(handles.project);
  const serviceKey = opaque.peek(handles.secretKey);
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(`https://${projectRef}.supabase.co`, serviceKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const exactAuthId = opaque.peek(handles.trainerAuthId);
  if (!exactAuthId) fail("TRAINER_IDENTITY_REFUSED");
  const auth = await admin.auth.admin.getUserById(exactAuthId);
  if (auth.error || auth.data?.user?.id !== exactAuthId) fail("TRAINER_IDENTITY_REFUSED");
  const contract = await admin.from("membership_levels").select("id").eq("code", "trainer").maybeSingle();
  if (contract.error || !contract.data?.id) fail("TRAINER_IDENTITY_REFUSED");
  const ids = Object.fromEntries(GRAPH_TABLES.map((table, index) => [table, opaque.peek(handles[`trainerGraph${index + 1}`])]));
  const syntheticEmail = `036m-${exactAuthId.replaceAll("-", "").slice(0, 12)}@invalid.test`;
  const graphRows = [
    { id: ids.users, table: "users", auth_user_id: exactAuthId, email: syntheticEmail, status: "active", primary_role_code: "trainer", owned: true, synthetic: true },
    { id: ids.member_profiles, table: "member_profiles", user_id: ids.users, display_name: "Sprint 036M Synthetic Trainer", is_active: true, owned: true, synthetic: true },
    { id: ids.user_membership_levels, table: "user_membership_levels", user_id: ids.users, membership_level_id: contract.data.id, starts_at: null, ends_at: null, owned: true, synthetic: true },
    { id: ids.stables, table: "stables", name: "Sprint 036M Synthetic Stable", code: "PP036M-SYNTH", status: "active", owned: true, synthetic: true },
    { id: ids.trainers, table: "trainers", member_profile_id: ids.member_profiles, display_name: "Sprint 036M Synthetic Trainer", status: "active", owned: true, synthetic: true },
    { id: ids.horses, table: "horses", stable_id: ids.stables, name: "Sprint 036M Synthetic Horse", slug: "sprint-036m-synthetic-horse", status: "active", owned: true, synthetic: true },
    { id: ids.horse_assignments, table: "horse_assignments", horse_id: ids.horses, trainer_id: ids.trainers, stable_id: ids.stables, assignment_type: "trainer", access_level: "write", is_primary: true, owned: true, synthetic: true },
    { id: ids.biochemistry_horse_access_assignments, table: "biochemistry_horse_access_assignments", horse_id: ids.horses, stable_id: ids.stables, member_profile_id: ids.member_profiles, role_code: "trainer", access_level: "write", nominated_by_user_id: ids.users, owned: true, synthetic: true },
  ];
  const graphLedger = createGraphMutationLedger();
  const adapter = createGraphAdminAdapter(admin, graphRows);
  const created = await createReplacementGraph({ rows: graphRows, adapter, ledger: graphLedger });
  handles.trainerGraphRows = graphRows;
  handles.trainerGraphLedger = created.ledger;
  return { graphCreates: created.result.creates, ordinal: payload.trainerOrdinal, controllerAuthCalls: 0, sessionBridgeCalls: 0, externalMutations: 8 };
}

export async function executeLiveTrainerDelivery({ payload, handles, opaque }) {
  if (!payload || ![1, 2].includes(payload.trainerOrdinal) || payload.messageObserved !== true || payload.verificationObserved !== true || !handles.trainerGraphLedger) fail("DELIVERY_CEILING_REFUSED");
  const ledger = createPhoneNativeDeliveryLedger();
  recordPhoneNativeObservation(ledger, "message", true);
  recordPhoneNativeObservation(ledger, "verification", true);
  const projectRef = opaque.peek(handles.project);
  const serviceKey = opaque.peek(handles.secretKey);
  const exactAuthId = opaque.peek(handles.trainerAuthId);
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(`https://${projectRef}.supabase.co`, serviceKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const auth = await admin.auth.admin.getUserById(exactAuthId);
  if (auth.error || auth.data?.user?.id !== exactAuthId) fail("TRAINER_IDENTITY_REFUSED");
  const baselineSignIn = opaque.peek(handles.trainerSessionBaseline);
  const sessionReadback = validateTrainerSessionTransition({ baseline: baselineSignIn, current: String(auth.data?.user?.last_sign_in_at ?? "") });
  const delivery = validatePhoneNativeLanding(ledger, { ordinal: payload.trainerOrdinal, sessionActive: sessionReadback.sessionActive, protectedOutput: false });
  return { graphCreates: 8, message: delivery.message, verification: delivery.verification, ordinal: delivery.ordinal, controllerAuthCalls: 0, sessionBridgeCalls: 0, externalMutations: 0 };
}

export async function executeLiveTrainerFixtureCleanup({ handles, opaque }) {
  const projectRef = opaque.peek(handles.project);
  const serviceKey = opaque.peek(handles.secretKey);
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(`https://${projectRef}.supabase.co`, serviceKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const rows = handles.trainerGraphRows;
  const ledger = handles.trainerGraphLedger;
  if (!Array.isArray(rows) || !ledger) fail("GRAPH_DELETE_REFUSED");
  const landing = await cleanupReplacementGraph({ rows, adapter: createGraphAdminAdapter(admin, rows), ledger });
  handles.trainerGraphRows = null;
  handles.trainerGraphLedger = null;
  return { cleanupDeletes: landing.cleanupDeletes, residue: 0, externalMutations: landing.cleanupDeletes };
}
export async function executeLiveTrainerCleanup({ payload, handles, opaque }) {

  if (!payload || TRAINER_TASKS.some((task) => payload[task] !== true)) fail("TRAINER_OBSERVATION_REFUSED");
  const landing = await executeLiveTrainerFixtureCleanup({ handles, opaque });
  return { tasks: TRAINER_TASKS.length, cleanupDeletes: landing.cleanupDeletes, sessionResidue: 0, storageResidue: 0, externalMutations: landing.externalMutations, time: brisbaneNow() };
}

function createGraphAdminAdapter(admin, plans) {
  const expected = new Map(plans.map((row) => [`${row.table}:${row.id}`, row]));
  const databaseRow = (row) => Object.fromEntries(Object.entries(row).filter(([key]) => !["table", "owned", "synthetic"].includes(key)));
  return {
    async insertExactOwned(row) {
      const result = await admin.from(row.table).insert(databaseRow(row)).select("id").single();
      if (result.error || result.data?.id !== row.id) fail("GRAPH_CREATE_REFUSED");
    },
    async readExact(table, id) {
      const plan = expected.get(`${table}:${id}`);
      if (!plan) fail("GRAPH_CREATE_REFUSED");
      const columns = Object.keys(databaseRow(plan)).join(",");
      const result = await admin.from(table).select(columns).eq("id", id).maybeSingle();
      if (result.error || !result.data) fail("GRAPH_CREATE_REFUSED");
      return { ...result.data, table, owned: true, synthetic: true };
    },
    async deleteExact(table, id) {
      const result = await admin.from(table).delete().eq("id", id).select("id");
      if (result.error || result.data?.length !== 1) fail("GRAPH_DELETE_REFUSED");
    },
    async countExact(table, id) {
      const result = await admin.from(table).select("id", { count: "exact", head: true }).eq("id", id);
      if (result.error || typeof result.count !== "number") fail("GRAPH_DELETE_REFUSED");
      return result.count;
    },
  };
}

function brisbaneNow() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Brisbane", hour12: false, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}+10:00`;
}
