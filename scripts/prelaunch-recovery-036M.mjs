import { CREDENTIAL_CLASSES } from "./prelaunch-readiness-036K.mjs";

export const KEY_PROVENANCE = Object.freeze(["created-this-sprint", "pre-existing-selected"]);
export const RECOVERY_OUTCOMES = Object.freeze([
  "prelaunch-credentials-identities-and-real-trainer-delivery-complete-clean",
  "real-trainer-delivery-complete-credential-recovery-partial-clean",
  "prelaunch-recovery-blocked-clean",
  "prelaunch-recovery-compensated-clean",
  "prelaunch-recovery-blocked-material",
]);
export const PHASES = Object.freeze([
  "baseline",
  "pair-prepare",
  "bindings-candidate-probes",
  "legacy-deactivate-readback",
  "credential-dispositions",
  "identity-dispositions",
  "trainer-prepare-deliver",
  "trainer-observe-cleanup",
  "final-readback",
]);
export const GRAPH_BUCKETS = Object.freeze([
  "replacementGraphCreates", "replacementGraphCleanupDeletes", "priorGraphRetirementDeletes",
]);

const PRIVATE_STATE = new WeakMap();
const KEY_STATE = new WeakMap();
const GRAPH_STATE = new WeakMap();
const WINDOW_STATE = new WeakMap();
const RESPONSE_FIELDS = new Set(["id", "code", "state", "counts", "ordinal", "time", "externalMutations", "residue", "legacyAttempted", "nextPhase", "pending"]);
const RESPONSE_CODES = new Set(PHASES.map((phase) => `${phase.toUpperCase().replaceAll("-", "_")}_ACCEPTED`));
const RESPONSE_STATES = new Set(["not-started", "accepted-retained", "compensated", "removed", "revoked-and-invalid", "unchanged-blocking", "residue", "blocked-retained"]);
const ENV_EXAMPLE_BLOB = "d790ad8998a4919d8ae5f308904047512b156f69";
const PRIVATE_PATTERN = /@|\b\d{6}\b|eyJ[A-Za-z0-9_-]{10,}\.|sb_(?:secret|publishable)_[A-Za-z0-9_-]+|sk_(?:live|test)_[A-Za-z0-9_-]+|whsec_[A-Za-z0-9_-]+|rk_live_[A-Za-z0-9_-]+|ghp_[A-Za-z0-9_-]+|github_pat_[A-Za-z0-9_-]+|AKIA[A-Z0-9]+|-----BEGIN .*PRIVATE KEY/i;

function fail(code) {
  const error = new Error(code);
  error.code = code;
  throw error;
}

function cloneFreeze(value) {
  const copy = structuredClone(value);
  const freeze = (entry) => {
    if (entry && typeof entry === "object" && !Object.isFrozen(entry)) {
      Object.values(entry).forEach(freeze);
      Object.freeze(entry);
    }
    return entry;
  };
  return freeze(copy);
}

export function assertSafeProjection(value) {
  const text = JSON.stringify(value);
  if (PRIVATE_PATTERN.test(text)) fail("PROTECTED_OUTPUT_REFUSED");
  return value;
}


export function createOpaqueStore() {
  const values = new WeakMap();
  const handles = new Set();
  const api = {
    put(value) {
      if (typeof value !== "string" && !Buffer.isBuffer(value) && !(value instanceof Uint8Array)) fail("OPAQUE_VALUE_REFUSED");
      const handle = Object.freeze(Object.create(null));
      values.set(handle, value);
      handles.add(handle);
      return handle;
    },
    has(handle) { return handles.has(handle) && values.has(handle); },
    peek(handle) {
      if (!handles.has(handle) || !values.has(handle)) fail("OPAQUE_HANDLE_REFUSED");
      return values.get(handle);
    },
    take(handle) {
      if (!handles.has(handle) || !values.has(handle)) fail("OPAQUE_HANDLE_REFUSED");
      const value = values.get(handle);
      values.delete(handle);
      handles.delete(handle);
      return value;
    },
    dispose(handle) {
      if (handles.has(handle)) {
        const value = values.get(handle);
        if (Buffer.isBuffer(value) || value instanceof Uint8Array) value.fill(0);
        values.delete(handle);
        handles.delete(handle);
      }
    },
    disposeAll() { for (const handle of [...handles]) api.dispose(handle); },
  };
  return Object.freeze(api);
}

export function createProtectedWindowState() {
  let handle;
  const snapshot = Object.freeze(() => {
    const state = WINDOW_STATE.get(handle) ?? fail("WINDOW_STATE_REFUSED");
    return cloneFreeze({ ...state, nextPhase: PHASES[state.next] ?? null });
  });
  const advance = Object.freeze((phase, projection) => {
    const state = WINDOW_STATE.get(handle);
    if (!state || state.closed || PHASES[state.next] !== phase) fail("PHASE_ORDER_REFUSED");
    assertSafeProjection(projection);
    const legacyAttempted = state.legacyAttempted || phase === "legacy-deactivate-readback";
    if (state.legacyAttempted && projection?.compensating === true) fail("LEGACY_ATTEMPT_IRREVERSIBLE");
    const rows = [...state.rows, cloneFreeze({ phase, legacyAttempted, projection })];
    WINDOW_STATE.set(handle, { next: state.next + 1, legacyAttempted, closed: state.next + 1 === PHASES.length, rows });
    return snapshot();
  });
  const latchLegacyAttempt = Object.freeze(() => {
    const state = WINDOW_STATE.get(handle);
    if (!state || state.closed || PHASES[state.next] !== "legacy-deactivate-readback" || state.legacyAttempted) fail("PHASE_ORDER_REFUSED");
    WINDOW_STATE.set(handle, { ...state, legacyAttempted: true });
    return snapshot();
  });
  handle = Object.freeze({ snapshot, advance, latchLegacyAttempt });
  WINDOW_STATE.set(handle, { next: 0, legacyAttempted: false, closed: false, rows: [] });
  return handle;
}

export function parseProtectedRequest(line) {
  if (typeof line !== "string" || !line.length || line.length > 65536 || /[\r\n]/.test(line)) fail("REQUEST_REFUSED");
  let request;
  try { request = JSON.parse(line); } catch { fail("REQUEST_REFUSED"); }
  if (!request || typeof request !== "object" || Array.isArray(request)) fail("REQUEST_REFUSED");
  if (Object.keys(request).some((key) => !["id", "operation", "phase", "payload"].includes(key))) fail("REQUEST_REFUSED");
  if (!Number.isSafeInteger(request.id) || request.id < 1 || request.operation !== "phase" || !PHASES.includes(request.phase)) fail("REQUEST_REFUSED");
  if (!request.payload || typeof request.payload !== "object" || Array.isArray(request.payload)) fail("REQUEST_REFUSED");
  return request;
}

export function projectProtectedResponse(response) {
  if (!response || typeof response !== "object" || Array.isArray(response) || Object.keys(response).some((key) => !RESPONSE_FIELDS.has(key))) fail("RESPONSE_REFUSED");
  if (!Number.isSafeInteger(response.id) || response.id < 1 || !RESPONSE_CODES.has(response.code) || !RESPONSE_STATES.has(response.state)) fail("RESPONSE_REFUSED");
  if (response.counts !== undefined && (!response.counts || typeof response.counts !== "object" || Array.isArray(response.counts) || Object.values(response.counts).some((value) => !Number.isSafeInteger(value) || value < 0))) fail("RESPONSE_REFUSED");
  if (response.ordinal !== undefined && ![1, 2].includes(response.ordinal)) fail("RESPONSE_REFUSED");
  if (response.time !== undefined && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?\+10:00$/.test(response.time)) fail("RESPONSE_REFUSED");
  if (response.pending !== undefined && typeof response.pending !== "boolean") fail("RESPONSE_REFUSED");
  return cloneFreeze(assertSafeProjection(response));
}

export function validateExactEnvExample(bytes, { expectedBytes, expectedBlob, actualBlob }) {
  if (!Buffer.isBuffer(bytes) || !Buffer.isBuffer(expectedBytes) || expectedBlob !== ENV_EXAMPLE_BLOB || actualBlob !== expectedBlob || !bytes.equals(expectedBytes)) fail("SOURCE_ENV_REFUSED");
  const text = bytes.toString("utf8");
  if (text.includes("\u0000") || PRIVATE_PATTERN.test(text.replaceAll("pk_test_ / sk_test_ / whsec_", ""))) fail("SOURCE_ENV_REFUSED");
  const allowedPublic = new Map([["NEXT_PUBLIC_APP_ENV", "development"], ["NEXT_PUBLIC_SITE_URL", "http://localhost:3000"], ["VERCEL_ENV", "development"]]);
  const sensitive = new Set(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "RAILWAY_API_TOKEN"]);
  for (const raw of text.split(/\r?\n/)) {
    if (!raw || raw.startsWith("#")) continue;
    const match = /^([A-Z][A-Z0-9_]*)=(.*)$/.exec(raw);
    if (!match) fail("SOURCE_ENV_REFUSED");
    if (allowedPublic.has(match[1])) {
      if (match[2] !== allowedPublic.get(match[1])) fail("SOURCE_ENV_REFUSED");
    } else if (!sensitive.has(match[1]) || match[2] !== "") fail("SOURCE_ENV_REFUSED");
  }
  return Object.freeze({ placeholderOnly: true, blobExact: true, protectedPatterns: 0 });
}
export function createRecoveryLedger() {
  let handle;
  const snapshot = Object.freeze(() => {
    const state = PRIVATE_STATE.get(handle);
    if (!state) fail("LEDGER_REFUSED");
    return cloneFreeze(state);
  });
  handle = Object.freeze({ snapshot });
  PRIVATE_STATE.set(handle, { nextPhase: 0, legacyAttempted: false, rows: [] });
  return handle;
}

export function appendRecoveryPhase(handle, phase, row) {
  const state = PRIVATE_STATE.get(handle);
  if (!state || phase !== state.nextPhase || PHASES[phase] === undefined || !row || typeof row !== "object") fail("LEDGER_REFUSED");
  const allowed = new Set(["state", "externalMutations", "residue", "legacyAttempted"]);
  if (Object.keys(row).some((key) => !allowed.has(key))) fail("LEDGER_REFUSED");
  if (!["not-started", "accepted-retained", "compensated", "removed", "revoked-and-invalid", "unchanged-blocking", "residue"].includes(row.state)) fail("LEDGER_REFUSED");
  if (!Number.isInteger(row.externalMutations) || row.externalMutations < 0 || !Number.isInteger(row.residue) || row.residue < 0) fail("LEDGER_REFUSED");
  const attempted = state.legacyAttempted || row.legacyAttempted === true;
  if (state.legacyAttempted && row.legacyAttempted !== true) fail("LEGACY_ATTEMPT_IRREVERSIBLE");
  if (phase < 3 && attempted) fail("LEDGER_REFUSED");
  if (phase >= 3 && !attempted) fail("LEDGER_REFUSED");
  const next = { nextPhase: phase + 1, legacyAttempted: attempted, rows: [...state.rows, cloneFreeze({ phase, name: PHASES[phase], ...row, legacyAttempted: attempted })] };
  PRIVATE_STATE.set(handle, next);
  return handle.snapshot();
}

export function createKeyProvenanceLedger() {
  let handle;
  const snapshot = Object.freeze(() => cloneFreeze(KEY_STATE.get(handle) ?? fail("KEY_LEDGER_REFUSED")));
  handle = Object.freeze({ snapshot });
  KEY_STATE.set(handle, { sealed: false, keys: [] });
  return handle;
}

export function recordKeyProvenance(handle, record) {
  const state = KEY_STATE.get(handle);
  if (!state || state.sealed || !record || !["publishable", "secret"].includes(record.type) || !KEY_PROVENANCE.includes(record.provenance)) fail("KEY_PROVENANCE_REFUSED");
  if (typeof record.id !== "string" || !record.id || typeof record.name !== "string" || !record.name || typeof record.baselinePresent !== "boolean") fail("KEY_PROVENANCE_REFUSED");
  if (state.keys.some((key) => key.type === record.type || key.id === record.id)) fail("KEY_PROVENANCE_REFUSED");
  if (record.provenance === "created-this-sprint" && record.baselinePresent) fail("KEY_PROVENANCE_REFUSED");
  if (record.provenance === "pre-existing-selected" && !record.baselinePresent) fail("KEY_PROVENANCE_REFUSED");
  KEY_STATE.set(handle, { sealed: state.keys.length === 1, keys: [...state.keys, cloneFreeze(record)] });
  return handle.snapshot();
}

export function keyCompensationPlan(handle) {
  const state = KEY_STATE.get(handle);
  if (!state || !state.sealed || state.keys.length !== 2) fail("KEY_LEDGER_REFUSED");
  const created = state.keys.filter((key) => key.provenance === "created-this-sprint");
  return cloneFreeze({ deleteIds: created.map((key) => key.id), deleteCeiling: created.length, selectedDeletes: 0 });
}

export function createGraphMutationLedger() {
  let handle;
  const snapshot = Object.freeze(() => cloneFreeze(GRAPH_STATE.get(handle) ?? fail("GRAPH_LEDGER_REFUSED")));
  handle = Object.freeze({ snapshot });
  GRAPH_STATE.set(handle, { replacementComplete: false, buckets: Object.fromEntries(GRAPH_BUCKETS.map((key) => [key, []])), absences: [] });
  return handle;
}

export function recordGraphMutation(handle, bucket, row) {
  const state = GRAPH_STATE.get(handle);
  if (!state || !GRAPH_BUCKETS.includes(bucket) || !row || typeof row.id !== "string" || !row.id || typeof row.table !== "string" || !row.table) fail("GRAPH_LEDGER_REFUSED");
  if (state.buckets[bucket].length >= 8 || state.buckets[bucket].some((entry) => entry.id === row.id)) fail("GRAPH_CEILING_REFUSED");
  if (bucket === "replacementGraphCleanupDeletes" && !state.buckets.replacementGraphCreates.some((entry) => entry.id === row.id && entry.table === row.table && JSON.stringify(entry) === JSON.stringify(row))) fail("GRAPH_LEDGER_REFUSED");
  if (bucket === "priorGraphRetirementDeletes" && state.buckets.replacementGraphCreates.some((entry) => entry.id === row.id)) fail("GRAPH_LEDGER_REFUSED");
  if (bucket === "priorGraphRetirementDeletes" && !state.replacementComplete) fail("PRIOR_RETIREMENT_REFUSED");
  const next = structuredClone(state);
  next.buckets[bucket].push(cloneFreeze(row));
  if (bucket === "replacementGraphCreates" && next.buckets[bucket].length === 8) next.replacementComplete = true;
  if (Object.values(next.buckets).reduce((sum, rows) => sum + rows.length, 0) > 24) fail("GRAPH_CEILING_REFUSED");
  GRAPH_STATE.set(handle, next);
  return handle.snapshot();
}

export function recordGraphAbsence(handle, bucket, id, count) {
  const state = GRAPH_STATE.get(handle);
  if (!state || !["replacementGraphCleanupDeletes", "priorGraphRetirementDeletes"].includes(bucket) || count !== 0 || !state.buckets[bucket].some((row) => row.id === id) || state.absences.some((row) => row.id === id)) fail("GRAPH_ABSENCE_REFUSED");
  GRAPH_STATE.set(handle, { ...state, absences: [...state.absences, { bucket, id, absent: true }] });
  return handle.snapshot();
}

export function validateGraphLanding(handle, { requirePriorRetirement = false } = {}) {
  const state = GRAPH_STATE.get(handle);
  if (!state) fail("GRAPH_LEDGER_REFUSED");
  for (const bucket of ["replacementGraphCleanupDeletes", "priorGraphRetirementDeletes"]) {
    for (const row of state.buckets[bucket]) if (!state.absences.some((absence) => absence.bucket === bucket && absence.id === row.id)) fail("GRAPH_ABSENCE_REFUSED");
  }
  if (requirePriorRetirement && state.buckets.priorGraphRetirementDeletes.length !== 8) fail("PRIOR_RETIREMENT_REFUSED");
  return cloneFreeze({ creates: state.buckets.replacementGraphCreates.length, cleanupDeletes: state.buckets.replacementGraphCleanupDeletes.length, priorDeletes: state.buckets.priorGraphRetirementDeletes.length, total: Object.values(state.buckets).reduce((sum, rows) => sum + rows.length, 0), priorRetired: state.buckets.priorGraphRetirementDeletes.length === 8 });
}

export function validateCredentialDispositions(rows) {
  if (!Array.isArray(rows) || rows.length !== 7) fail("CREDENTIAL_DISPOSITIONS_REFUSED");
  const names = new Set();
  const allowed = new Set(["rotated-and-verified", "revoked-not-required", "confirmed-inactive-or-absent", "blocked-retained"]);
  for (const row of rows) {
    if (!row || !CREDENTIAL_CLASSES.includes(row.class) || names.has(row.class) || !allowed.has(row.disposition) || typeof row.trainerPath !== "boolean") fail("CREDENTIAL_DISPOSITIONS_REFUSED");
    names.add(row.class);
  }
  return cloneFreeze({ complete: rows.every((row) => row.disposition !== "blocked-retained"), trainerPathClear: rows.filter((row) => row.trainerPath).every((row) => row.disposition !== "blocked-retained"), blocked: rows.filter((row) => row.disposition === "blocked-retained").map((row) => row.class) });
}

export function validateTrainerGate({ local, pairedKeys, production, identities, credentialProjection }) {
  if (local !== true || pairedKeys !== true || production !== true || identities !== true || credentialProjection?.trainerPathClear !== true) fail("TRAINER_GATE_REFUSED");
  return true;
}

export function decideRecoveryOutcome({ pairedKeys, production, identities, trainer, credentialsComplete, clean, material }) {
  if (material) return RECOVERY_OUTCOMES[4];
  if (!clean) return RECOVERY_OUTCOMES[3];
  if (pairedKeys && production && identities && trainer && credentialsComplete) return RECOVERY_OUTCOMES[0];
  if (pairedKeys && production && identities && trainer) return RECOVERY_OUTCOMES[1];
  return RECOVERY_OUTCOMES[2];
}

export function sanitizeFailure(error) {
  const allowed = new Set(["PROTECTED_OUTPUT_REFUSED", "LEDGER_REFUSED", "LEGACY_ATTEMPT_IRREVERSIBLE", "KEY_LEDGER_REFUSED", "KEY_PROVENANCE_REFUSED", "GRAPH_LEDGER_REFUSED", "GRAPH_CEILING_REFUSED", "GRAPH_ABSENCE_REFUSED", "PRIOR_RETIREMENT_REFUSED", "CREDENTIAL_DISPOSITIONS_REFUSED", "TRAINER_GATE_REFUSED"]);
  return allowed.has(error?.code) ? error.code : "UNEXPECTED";
}
