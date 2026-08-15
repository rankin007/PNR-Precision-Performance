#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";
import { lstatSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, relative, resolve, sep } from "node:path";
import { createInterface } from "node:readline";
import { ACCEPTED_ALIASES, ACCEPTED_SOURCE, CREDENTIAL_CLASSES } from "./prelaunch-readiness-036K.mjs";
import { PHASES, assertSafeProjection, createKeyProvenanceLedger, createOpaqueStore, createProtectedWindowState, keyCompensationPlan, parseProtectedRequest, projectProtectedResponse, recordKeyProvenance, sanitizeFailure } from "./prelaunch-recovery-036M.mjs";

export const CONSUMER_CLASSES = Object.freeze(["repository", "current-deployment", "old-deployments", "jobs", "webhooks", "integrations", "edge-functions", "database-webhooks", "pg-net"]);
export const BINDING_NAMES = Object.freeze(["NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]);
export const LEGACY_TYPES = Object.freeze(["anon", "service_role"]);
export const PROVIDER_ADAPTERS = Object.freeze(["supabaseManagement", "supabaseAuth", "vercel", "runtime"]);
export const CLASS_DISPOSITIONS = Object.freeze(["rotated-and-verified", "revoked-not-required", "confirmed-inactive-or-absent", "blocked-retained"]);

function fail(code) { const error = new Error(code); error.code = code; throw error; }

export function createProtectedProviderAdapters(adapters) {
  if (!adapters || typeof adapters !== "object" || Array.isArray(adapters) || Object.keys(adapters).length !== PROVIDER_ADAPTERS.length || PROVIDER_ADAPTERS.some((name) => !adapters[name] || typeof adapters[name] !== "object")) fail("ADAPTER_REGISTRY_REFUSED");
  if (Object.keys(adapters).some((name) => !PROVIDER_ADAPTERS.includes(name))) fail("ADAPTER_REGISTRY_REFUSED");
  if (adapters.supabaseManagement.projectExact !== true || adapters.supabaseAuth.projectExact !== true || adapters.vercel.projectExact !== true || adapters.runtime.zeroBusinessEffects !== true) fail("ADAPTER_REGISTRY_REFUSED");
  return Object.freeze(Object.fromEntries(PROVIDER_ADAPTERS.map((name) => [name, Object.freeze(adapters[name])])));
}

export function createCredentialClassRegistry(rows) {
  if (!rows || typeof rows !== "object" || Array.isArray(rows) || Object.keys(rows).length !== CREDENTIAL_CLASSES.length || CREDENTIAL_CLASSES.some((name) => !rows[name] || typeof rows[name] !== "object") || Object.keys(rows).some((name) => !CREDENTIAL_CLASSES.includes(name))) fail("CLASS_ROWS_REFUSED");
  return Object.freeze(Object.fromEntries(CREDENTIAL_CLASSES.map((name) => [name, Object.freeze(rows[name])])));
}

export function projectCredentialClassLanding(name, result) {
  if (!CREDENTIAL_CLASSES.includes(name) || !result || !CLASS_DISPOSITIONS.includes(result.disposition) || typeof result.trainerPath !== "boolean" || !Number.isSafeInteger(result.mutations) || result.mutations < 0 || !Number.isSafeInteger(result.businessEffects) || result.businessEffects !== 0) fail("CLASS_ROWS_REFUSED");
  if (result.disposition !== "blocked-retained" && result.nativeReadback !== true) fail("CLASS_ROWS_REFUSED");
  return assertSafeProjection({ class: name, disposition: result.disposition, trainerPath: result.trainerPath, mutations: result.mutations, businessEffects: 0 });
}

export function validateOldDeploymentDiscriminators(projection) {
  if (!projection || !Number.isSafeInteger(projection.addressable) || projection.addressable < 0 || projection.rejected !== projection.addressable || projection.genericPages !== 0) fail("OLD_DEPLOYMENT_PROBE_REFUSED");
  return assertSafeProjection({ addressable: projection.addressable, predecessorRejected: projection.rejected, genericPages: 0 });
}

export function validateExactExportLanding(projection) {
  if (!projection || projection.source !== ACCEPTED_SOURCE || projection.pathExact !== true || projection.blobsExact !== true || projection.envExampleExact !== true || projection.projectLinkExact !== true || projection.cleaned !== true || projection.residue !== 0) fail("SOURCE_BUNDLE_REFUSED");
  return assertSafeProjection({ sourceExact: true, pathExact: true, blobsExact: true, envExampleExact: true, projectLinkExact: true, cleaned: true, residue: 0 });
}

export function createProtectedWindowHandlers(adapters) {
  createProtectedProviderAdapters(adapters);
  const requireApproval = (payload, key) => {
    if (payload?.[key] !== true) fail("OPERATOR_APPROVAL_REFUSED");
  };
  return Object.freeze({
    async baseline(payload, context) {
      if (typeof payload.projectRef !== "string" || !payload.projectRef || typeof payload.managementToken !== "string" || !payload.managementToken) fail("BASELINE_REFUSED");
      context.handles.project = context.opaque.put(payload.projectRef);
      context.handles.management = context.opaque.put(payload.managementToken);
      for (const name of ["originalPublicBinding", "originalServiceBinding", "operatorUserJwt", "originalAliasDeployment"]) {
        if (typeof payload[name] !== "string" || !payload[name]) fail("BASELINE_REFUSED");
        context.handles[name] = context.opaque.put(payload[name]);
        payload[name] = null;
      }
      payload.projectRef = null;
      payload.managementToken = null;
      context.preLegacy = true;
      const result = await adapters.supabaseManagement.readBaseline({ project: context.handles.project, token: context.handles.management, opaque: context.opaque });
      if (!result || result.projectExact !== true || result.protectedOutput !== false) fail("BASELINE_REFUSED");
      return { state: result.inventoryReady === true ? "accepted-retained" : "unchanged-blocking", counts: { consumers: result.consumerClasses, keyRows: result.keyRows, blocked: result.inventoryReady === true ? 0 : 1 }, externalMutations: 0, residue: 0 };
    },
    async "pair-prepare"(payload, context) {
      requireApproval(payload, "approvePair");
      context.pairAttempted = true;
      const result = await adapters.supabaseManagement.preparePair({ handles: context.handles, opaque: context.opaque });
      if (!result || result.pairReady !== true || result.provenanceRows !== 2) fail("KEY_SELECTION_REFUSED");
      return { state: "accepted-retained", counts: { pair: 2, provenance: 2 }, externalMutations: result.externalMutations, residue: 0 };
    },
    async "bindings-candidate-probes"(payload, context) {
      requireApproval(payload, "approveProduction");
      context.bindingsAttempted = true;
      const result = await adapters.vercel.installDeployProbeAlias({ handles: context.handles, opaque: context.opaque, runtime: adapters.runtime });
      if (!result || result.bindings !== 3 || result.candidates !== 1 || result.aliases !== 5 || result.probes !== 3 || result.exportAbsent !== true) fail("SOURCE_BUNDLE_REFUSED");
      return { state: "accepted-retained", counts: { bindings: 3, candidates: 1, aliases: 5, probes: 3 }, externalMutations: result.externalMutations, residue: 0 };
    },
    async "legacy-deactivate-readback"(payload, context) {
      if (payload?.step === "preflight") {
        const result = await adapters.runtime.preflightOldDeployments({ handles: context.handles, opaque: context.opaque });
        if (!result || result.ready !== true || !Number.isSafeInteger(result.addressable) || result.addressable < 0) return { state: "unchanged-blocking", counts: { oldDeployments: result?.addressable ?? 0, blocked: 1 }, externalMutations: 0, residue: 0, pending: true };
        context.oldDeploymentClosure = result;
        return { state: "accepted-retained", counts: { oldDeployments: result.addressable, blocked: 0 }, externalMutations: 0, residue: 0, pending: true };
      }

      if (payload?.step === "attempt") {
        requireApproval(payload, "approveLegacyDeactivation");
        if (context.legacyResult || !context.oldDeploymentClosure?.ready) fail("POST_DEACTIVATION_UNKNOWN");
        const result = await adapters.supabaseManagement.deactivateAndReadback({ handles: context.handles, opaque: context.opaque, runtime: adapters.runtime });
        if (!result || result.legacyDisabled !== 2 || result.predecessorRejected !== 2 || result.authCompatible !== true) fail("POST_DEACTIVATION_UNKNOWN");
        context.legacyResult = result;
        return { state: "accepted-retained", counts: { legacyDisabled: 2, predecessorRejected: 2 }, externalMutations: result.externalMutations, residue: 0, legacyAttempted: true, pending: true };
      }
      if (payload?.step !== "old-deployment-readback" || !context.legacyResult) fail("POST_DEACTIVATION_UNKNOWN");
      const projection = validateOldDeploymentDiscriminators(await adapters.runtime.readOldDeploymentInvalidation({ handles: context.handles, opaque: context.opaque, closure: context.oldDeploymentClosure }));
      if (projection.addressable !== context.oldDeploymentClosure.addressable) fail("OLD_DEPLOYMENT_PROBE_REFUSED");
      const result = context.legacyResult;
      context.legacyResult = null;
      return { state: "revoked-and-invalid", counts: { legacyDisabled: 2, predecessorRejected: 2, oldDeployments: projection.addressable }, externalMutations: result.externalMutations, residue: 0, legacyAttempted: true };
    },
    async "credential-dispositions"(payload, context) {
      const result = await adapters.runtime.dispositionSevenClasses({ handles: context.handles, opaque: context.opaque });
      validateSevenClassRows(result.rows);
      return { state: result.trainerPathClear ? "accepted-retained" : "unchanged-blocking", counts: { classes: 7, blocked: result.rows.filter((row) => row.disposition === "blocked-retained").length }, externalMutations: result.externalMutations, residue: result.residue };
    },
    async "identity-dispositions"(payload, context) {
      for (const ordinal of [1, 2]) {
        const authId = payload[`identity${ordinal}AuthId`];
        const session = payload[`identity${ordinal}Session`];
        if (typeof authId !== "string" || !authId || typeof session !== "string" || !session) fail("IDENTITY_AUTHORITY_REFUSED");
        context.handles[`identity${ordinal}Session`] = context.opaque.put(session);
      }
      for (let index = 1; index <= 8; index += 1) {
        const id = payload[`trainerGraph${index}`];
        if (typeof id !== "string" || !id) fail("IDENTITY_AUTHORITY_REFUSED");
        context.handles[`trainerGraph${index}`] = context.opaque.put(id);
      }
      if (typeof payload.trainerAuthId !== "string" || !payload.trainerAuthId || payload.trainerOwnerApproved !== true) fail("TRAINER_IDENTITY_REFUSED");
      context.handles.trainerAuthId = context.opaque.put(payload.trainerAuthId);
      payload.trainerAuthId = null;
      const result = await adapters.supabaseAuth.dispositionTwoIdentities({ payload, handles: context.handles, opaque: context.opaque });
      if (!result || result.identities !== 2 || result.trainerPreflight !== true) fail("IDENTITY_LANDING_REFUSED");
      return { state: result.ready ? "accepted-retained" : "unchanged-blocking", counts: { identities: 2, unresolved: result.unresolved }, externalMutations: result.externalMutations, residue: result.residue };
    },
    async "trainer-prepare-deliver"(payload, context) {
      if (payload?.step === "prepare") {
        if (context.trainerGraphPrepared) fail("TRAINER_LANDING_REFUSED");
        const result = await adapters.supabaseAuth.prepareTrainerGraph({ payload, handles: context.handles, opaque: context.opaque });
        if (!result || result.graphCreates !== 8 || result.controllerAuthCalls !== 0 || result.sessionBridgeCalls !== 0) fail("TRAINER_LANDING_REFUSED");
        context.trainerGraphPrepared = true;
        return { state: "accepted-retained", counts: { graphCreates: 8, message: 0, verification: 0 }, ordinal: result.ordinal, externalMutations: result.externalMutations, residue: 0, pending: true };
      }
      if (payload?.step !== "deliver" || context.trainerGraphPrepared !== true) fail("TRAINER_LANDING_REFUSED");
      const result = await adapters.supabaseAuth.readTrainerDelivery({ payload, handles: context.handles, opaque: context.opaque });
      if (!result || result.graphCreates !== 8 || result.message !== 1 || result.verification !== 1 || result.controllerAuthCalls !== 0 || result.sessionBridgeCalls !== 0) fail("TRAINER_LANDING_REFUSED");
      return { state: "accepted-retained", counts: { graphCreates: 8, message: 1, verification: 1 }, ordinal: result.ordinal, externalMutations: result.externalMutations, residue: 0 };
    },
    async "trainer-observe-cleanup"(payload, context) {
      const result = await adapters.supabaseAuth.observeAndCleanupTrainer({ payload, handles: context.handles, opaque: context.opaque });
      if (!result || result.tasks !== 8 || result.sessionResidue !== 0 || result.storageResidue !== 0) fail("TRAINER_LANDING_REFUSED");
      context.trainerGraphPrepared = false;
      return { state: "removed", counts: { tasks: 8, cleanupDeletes: result.cleanupDeletes }, externalMutations: result.externalMutations, residue: 0, time: result.time };
    },
    async "final-readback"(payload, context) {
      requireApproval(payload, "approveFinalReadback");
      const result = await adapters.runtime.finalReadback({ handles: context.handles, opaque: context.opaque });
      if (!result || result.aliases !== 5 || result.bindings !== 3 || result.candidates !== 1 || result.residue !== 0 || result.exportAbsent !== true) fail("FINAL_READBACK_REFUSED");
      return { state: "accepted-retained", counts: { aliases: 5, bindings: 3, candidates: 1 }, externalMutations: 0, residue: 0 };
    },
    async compensate(context) {
      if (context.pairAttempted !== true) return { compensated: true, residue: 0 };
      const result = await adapters.vercel.compensateBeforeLegacy({ handles: context.handles, opaque: context.opaque, management: adapters.supabaseManagement, bindingsAttempted: context.bindingsAttempted === true });
      if (!result || result.bindingsRestored !== 2 || result.targetsReadback < 1 || result.aliasesRestored !== 5 || result.candidateAbsent !== true || result.createdKeysAbsent !== result.createdDeletes || result.pairTypesAccounted !== 2 || result.selectedDeletes !== 0 || result.residue !== 0) fail("PAIR_COMPENSATION_REFUSED");
      return { compensated: true, residue: 0 };
    },
    async cleanupTrainerFixture(context) {
      const result = await adapters.supabaseAuth.cleanupPreparedTrainer({ handles: context.handles, opaque: context.opaque });
      if (!result || result.cleanupDeletes !== 8 || result.residue !== 0) fail("TRAINER_LANDING_REFUSED");
      return { cleaned: true, residue: 0 };
    },
  });
}

export async function runProtectedWindowChild({ input = process.stdin, output = process.stdout, handlers, context = null } = {}) {
  if (!handlers || PHASES.some((phase) => typeof handlers[phase] !== "function")) fail("ADAPTER_REGISTRY_REFUSED");
  const active = context ?? { opaque: createOpaqueStore(), handles: Object.create(null), window: createProtectedWindowState() };
  const lines = createInterface({ input, crlfDelay: Infinity, terminal: false });
  let completed = false;
  try {
    for await (const line of lines) {
      const request = parseProtectedRequest(line);
      if (request.phase === "legacy-deactivate-readback" && request.payload?.step === "attempt" && active.window.snapshot().legacyAttempted !== true) active.window.latchLegacyAttempt();
      const projection = await handlers[request.phase](request.payload, active);
      if (projection.pending !== true) active.window.advance(request.phase, projection);
      const response = projectProtectedResponse({ id: request.id, code: `${request.phase.toUpperCase().replaceAll("-", "_")}_ACCEPTED`, ...projection, nextPhase: active.window.snapshot().nextPhase });
      output.write(`${JSON.stringify(response)}\n`);
      for (const key of Object.keys(request.payload)) request.payload[key] = null;
    }
    completed = active.window.snapshot().closed === true;
  } finally {
    if (!completed && active.trainerGraphPrepared === true && typeof handlers.cleanupTrainerFixture === "function") {
      const cleanup = await handlers.cleanupTrainerFixture(active);
      if (!cleanup || cleanup.cleaned !== true || cleanup.residue !== 0) fail("TRAINER_LANDING_REFUSED");
    }

    if (!completed && active.window.snapshot().legacyAttempted !== true && typeof handlers.compensate === "function") {
      const compensation = await handlers.compensate(active);
      if (!compensation || compensation.compensated !== true || compensation.residue !== 0) fail("PAIR_COMPENSATION_REFUSED");
    }
    active.opaque.disposeAll();
    lines.close();
  }
  return active.window.snapshot();
}
export function validateConsumerInventory(rows) {
  if (!Array.isArray(rows) || rows.length !== CONSUMER_CLASSES.length) fail("CONSUMER_INVENTORY_REFUSED");
  const seen = new Set();
  for (const row of rows) {
    if (!row || Object.keys(row).some((key) => !["class", "count", "complete", "sanitized", "entries"].includes(key)) || !CONSUMER_CLASSES.includes(row.class) || seen.has(row.class) || !Number.isInteger(row.count) || row.count < 0 || row.count > 100 || row.complete !== true || row.sanitized !== true || !Array.isArray(row.entries) || row.entries.length !== row.count) fail("CONSUMER_INVENTORY_REFUSED");
    for (const entry of row.entries) {
      if (!entry || Object.keys(entry).length !== 2 || typeof entry.name !== "string" || !entry.name || typeof entry.target !== "string" || !entry.target) fail("CONSUMER_INVENTORY_REFUSED");
    }
    seen.add(row.class);
  }
  return assertSafeProjection({ complete: true, classes: rows.length, addressable: rows.reduce((sum, row) => sum + row.count, 0) });
}
export function validateExportEnvironmentPath(value) {
  if (typeof value !== "string" || !value || value.includes("\u0000")) fail("SOURCE_BUNDLE_REFUSED");
  const envNamed = basename(value).toLowerCase().startsWith(".env");
  if (envNamed && value !== ".env.example") fail("SOURCE_BUNDLE_REFUSED");
  return true;
}


export function classifyOpaqueCompatibilityProbe(probe) {
  const keys = ["directPublishable", "installedPublic", "installedAuthenticated", "directSecret", "installedAdmin", "middleware", "pkceCallback", "userJwtPreserved", "protectedOutput"];
  if (!probe || keys.some((key) => typeof probe[key] !== "boolean") || probe.protectedOutput) fail("COMPATIBILITY_PROBE_REFUSED");
  const direct = probe.directPublishable && probe.directSecret;
  const installed = probe.installedPublic && probe.installedAuthenticated && probe.installedAdmin && probe.middleware && probe.pkceCallback && probe.userJwtPreserved;
  return assertSafeProjection({ direct, installed, correctionRequired: direct && !installed, ready: direct && installed });
}

export function buildKeyPairSelection({ baseline, selected }) {
  if (!Array.isArray(baseline) || !Array.isArray(selected) || selected.length !== 2) fail("KEY_SELECTION_REFUSED");
  const ledger = createKeyProvenanceLedger();
  for (const type of ["publishable", "secret"]) {
    const matches = selected.filter((key) => key?.type === type);
    if (matches.length !== 1) fail("KEY_SELECTION_REFUSED");
    const key = matches[0];
    const baselinePresent = baseline.some((entry) => entry?.id === key.id && entry?.type === type && entry?.name === key.name);
    recordKeyProvenance(ledger, { id: key.id, name: key.name, type, provenance: baselinePresent ? "pre-existing-selected" : "created-this-sprint", baselinePresent });
  }
  return { ledger, compensation: keyCompensationPlan(ledger) };
}

export function validateExactSourceBundle(bundle) {
  if (!bundle || bundle.source !== ACCEPTED_SOURCE || bundle.dirtyFiles !== 0 || bundle.traversal !== 0 || bundle.projectExact !== true || bundle.aliasFree !== true || bundle.ready !== true) fail("SOURCE_BUNDLE_REFUSED");
  return assertSafeProjection({ sourceExact: true, projectExact: true, aliasFree: true, ready: true });
}

export function validateProbeSet(probes) {
  if (!probes || probes.public !== true || probes.authenticatedUser !== true || probes.serverAdmin !== true || probes.businessEffects !== 0 || probes.protectedOutput !== false) fail("RUNTIME_PROBE_REFUSED");
  return assertSafeProjection({ public: true, authenticatedUser: true, serverAdmin: true, businessEffects: 0 });
}

export function validateAliasReadback(rows, deployment) {
  if (!Array.isArray(rows) || rows.length !== 5 || new Set(rows.map((row) => row.alias)).size !== 5 || ACCEPTED_ALIASES.some((alias) => !rows.some((row) => row.alias === alias && row.deployment === deployment))) fail("ALIAS_READBACK_REFUSED");
  return assertSafeProjection({ aliases: 5, deploymentExact: true });
}

export function validateLegacyInvalidation(readback) {
  if (!readback || readback.attemptLatched !== true || readback.jwtSigningChanged !== false || readback.sessionsRotated !== false || !Array.isArray(readback.legacy) || readback.legacy.length !== 2) fail("LEGACY_INVALIDATION_REFUSED");
  for (const type of LEGACY_TYPES) if (!readback.legacy.some((row) => row.type === type && row.disabled === true && row.predecessorRejected === true)) fail("LEGACY_INVALIDATION_REFUSED");
  if (readback.replacementPublishable !== true || readback.replacementSecret !== true || readback.currentAuthCompatible !== true) fail("LEGACY_INVALIDATION_REFUSED");
  return assertSafeProjection({ legacyDisabled: 2, predecessorRejected: 2, replacementAccepted: 2, jwtSigningChanged: false, sessionsRotated: false });
}

export async function compensatePreparedPair({ adapter, bindingsAttempted, candidateAttempted, keyLedger }) {
  const plan = keyCompensationPlan(keyLedger);
  let calls = 0;
  if (candidateAttempted) { await adapter.removeOwnedCandidate(); calls += 1; }
  if (bindingsAttempted) { await adapter.restoreTwoBindings(); calls += 1; }
  for (const id of plan.deleteIds) { await adapter.deleteCreatedKey(id); calls += 1; }
  const readback = await adapter.readCompensatedState();
  if (!readback || readback.bindingsRestored !== true || readback.candidateAbsent !== true || readback.createdKeysAbsent !== plan.deleteCeiling || readback.selectedKeysDeleted !== 0) fail("PAIR_COMPENSATION_REFUSED");
  return assertSafeProjection({ calls, createdKeyDeletes: plan.deleteCeiling, selectedKeyDeletes: 0, compensated: true });
}

export async function executePairedMigration({ baselineKeys, selectedKeys, consumerRows, compatibility, adapter }) {
  validateConsumerInventory(consumerRows);
  if (!classifyOpaqueCompatibilityProbe(compatibility).ready) fail("COMPATIBILITY_PROBE_REFUSED");
  const selection = buildKeyPairSelection({ baseline: baselineKeys, selected: selectedKeys });
  let bindingsAttempted = false;
  let candidateAttempted = false;
  let deactivationAttempted = false;
  try {
    bindingsAttempted = true;
    await adapter.installTwoBindings(selectedKeys);
    candidateAttempted = true;
    const candidate = await adapter.createExactSourceCandidate();
    validateExactSourceBundle(candidate);
    validateProbeSet(await adapter.runProbeSet());
    validateAliasReadback(await adapter.assignAndReadFiveAliases(), candidate.deployment);
    deactivationAttempted = true;
    try { await adapter.deactivateLegacyPair(); } catch { /* independent readback is authoritative */ }
    const invalidation = validateLegacyInvalidation(await adapter.readLegacyAndReplacementState());
    return assertSafeProjection({ state: "paired-migration-accepted", bindings: 2, candidate: 1, aliases: 5, ...invalidation, keyProvenance: selection.ledger.snapshot().keys.map((key) => ({ type: key.type, provenance: key.provenance })) });
  } catch (error) {
    if (deactivationAttempted) fail("POST_DEACTIVATION_UNKNOWN");
    await compensatePreparedPair({ adapter, bindingsAttempted, candidateAttempted, keyLedger: selection.ledger });
    throw error;
  }
}

export function validateSevenClassRows(rows) {
  if (!Array.isArray(rows) || rows.length !== 7 || CREDENTIAL_CLASSES.some((name) => !rows.some((row) => row?.class === name)) || new Set(rows.map((row) => row.class)).size !== 7) fail("CLASS_ROWS_REFUSED");
  return true;
}

function runPrivateProcess(command, args, { input = null, cwd = process.cwd(), protectedValues = [] } = {}) {
  const result = spawnSync(command, args, { cwd, input, encoding: "utf8", windowsHide: true, maxBuffer: 4 * 1024 * 1024, env: process.env });
  const combined = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (protectedValues.some((value) => typeof value === "string" && value && combined.includes(value))) fail("PROTECTED_OUTPUT_REFUSED");
  if (result.error || result.status !== 0) fail("NATIVE_MECHANISM_BLOCKED");
  return result.stdout ?? "";
}

function safeJson(text, code = "NATIVE_MECHANISM_BLOCKED") {
  try { return JSON.parse(text); } catch { fail(code); }
}

async function managementRequest({ projectRef, token, path = "", method = "GET", body = null }) {
  let response;
  try {
    response = await fetch(`https://api.supabase.com/v1/projects/${encodeURIComponent(projectRef)}/api-keys${path}`, {
      method,
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: body === null ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
  } catch { fail("SUPABASE_MANAGEMENT_BLOCKED"); }
  let text = "";
  try { text = await response.text(); } catch { fail("SUPABASE_MANAGEMENT_BLOCKED"); }
  if (!response.ok) fail("SUPABASE_MANAGEMENT_BLOCKED");
  return safeJson(text, "SUPABASE_MANAGEMENT_BLOCKED");
}

function normalizeKeyRows(value) {
  const rows = Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : [];
  return rows.map((row) => ({
    id: String(row.id ?? ""),
    type: String(row.type ?? row.api_key_type ?? ""),
    name: String(row.name ?? ""),
    value: typeof row.api_key === "string" ? row.api_key : typeof row.key === "string" ? row.key : "",
    disabled: row.enabled === false || row.disabled === true,
  }));
}

function getOpaque(handles, opaque, name) {
  const handle = handles[name];
  if (!handle || !opaque.has(handle)) fail("OPAQUE_HANDLE_REFUSED");
  return opaque.peek(handle);
}

function setOpaque(handles, opaque, name, value) {
  if (handles[name]) opaque.dispose(handles[name]);
  handles[name] = opaque.put(value);
}

function listExportEntries(root) {
  const rows = [];
  const visit = (directory) => {
    for (const name of readdirSync(directory)) {
      const absolute = join(directory, name);
      const stat = lstatSync(absolute);
      const path = relative(root, absolute).split(sep).join("/");
      if (stat.isSymbolicLink() || stat.isFIFO() || stat.isSocket() || stat.isCharacterDevice() || stat.isBlockDevice()) fail("SOURCE_BUNDLE_REFUSED");
      if (stat.isDirectory()) visit(absolute);
      else if (stat.isFile()) rows.push({ path, absolute });
      else fail("SOURCE_BUNDLE_REFUSED");
    }
  };
  visit(root);
  return rows.sort((a, b) => a.path.localeCompare(b.path));
}

function lstatSafe(path) {
  try { lstatSync(path); return true; } catch { return false; }
}

function normalizeDeploymentRef(value) {
  return String(value ?? "").trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function readFiveAliasTargets({ vercelCommand, root, deployment, protectedValues = [] }) {
  const expected = normalizeDeploymentRef(deployment);
  if (!expected) fail("ALIAS_READBACK_REFUSED");
  const rows = ACCEPTED_ALIASES.map((alias) => {
    const parsed = safeJson(runPrivateProcess(vercelCommand, ["inspect", `https://${alias}`, "--json"], { cwd: root, protectedValues }), "ALIAS_READBACK_REFUSED");
    const candidates = [parsed?.id, parsed?.url, parsed?.name, parsed?.deploymentId, parsed?.deployment?.id, parsed?.deployment?.url]
      .map(normalizeDeploymentRef).filter(Boolean);
    if (!candidates.includes(expected)) fail("ALIAS_READBACK_REFUSED");
    return { alias, deployment };
  });
  return validateAliasReadback(rows, deployment);
}

export function createNativeProtectedAdapters({ root = process.cwd(), vercelCommand = "vercel" } = {}) {
  const supabaseManagement = {
    projectExact: true,
    async readBaseline({ project, token, opaque }) {
      const rows = normalizeKeyRows(await managementRequest({ projectRef: opaque.peek(project), token: opaque.peek(token) }));
      if (rows.length < 2 || rows.some((row) => !row.id || !row.type)) fail("BASELINE_REFUSED");
      this.baselineRows = rows;
      return { projectExact: true, protectedOutput: false, consumerClasses: CONSUMER_CLASSES.length, keyRows: rows.length, inventoryReady: false };
    },
    async preparePair({ handles, opaque }) {
      const projectRef = getOpaque(handles, opaque, "project");
      const token = getOpaque(handles, opaque, "management");
      const baseline = this.baselineRows ?? [];
      let mutations = 0;
      const selected = [];
      this.selected = [];
      for (const type of ["publishable", "secret"]) {
        let row = baseline.find((entry) => entry.type === type && entry.value);
        let provenance = "pre-existing-selected";
        if (!row) {
          const created = await managementRequest({ projectRef, token, method: "POST", body: { type, name: type === "secret" ? "precision-performance-036m-server" : "precision-performance-036m-browser" } });
          row = normalizeKeyRows([created])[0];
          provenance = "created-this-sprint";
          mutations += 1;
        }
        if (!row?.id || !row.value) fail("KEY_SELECTION_REFUSED");
        selected.push({ id: row.id, type, name: row.name || type, provenance, baselinePresent: provenance === "pre-existing-selected" });
        this.selected = [...selected];
        setOpaque(handles, opaque, type === "publishable" ? "publishableKey" : "secretKey", row.value);
      }
      const legacyAnon = baseline.find((row) => row.type === "anon" && row.value);
      const legacyService = baseline.find((row) => row.type === "service_role" && row.value);
      if (!legacyAnon || !legacyService) fail("BASELINE_REFUSED");
      setOpaque(handles, opaque, "legacyAnon", legacyAnon.value);
      setOpaque(handles, opaque, "legacyService", legacyService.value);
      handles.keySelection = buildKeyPairSelection({ baseline, selected }).ledger;
      this.selected = selected;
      return { pairReady: true, provenanceRows: 2, externalMutations: mutations };
    },
    async deactivateAndReadback({ handles, opaque, runtime }) {
      const projectRef = getOpaque(handles, opaque, "project");
      const token = getOpaque(handles, opaque, "management");
      await managementRequest({ projectRef, token, path: "/legacy", method: "PUT", body: { enabled: false } });
      const legacy = await managementRequest({ projectRef, token, path: "/legacy" });
      if (!(legacy?.enabled === false || legacy?.data?.enabled === false)) fail("POST_DEACTIVATION_UNKNOWN");
      const probes = await runtime.readLegacyInvalidation({ handles, opaque });
      return { legacyDisabled: 2, predecessorRejected: probes.predecessorRejected, authCompatible: probes.authCompatible, externalMutations: 1 };
    },
    readCurrentTargets() {
      const parsed = safeJson(runPrivateProcess(vercelCommand, ["env", "ls", "--json"], { cwd: root }), "VERCEL_ENV_REFUSED");
      const rows = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.envs) ? parsed.envs : [];
      const selected = rows.filter((row) => ["NEXT_PUBLIC_SUPABASE_URL", ...BINDING_NAMES].includes(row.key));
      if (selected.length !== 3) fail("VERCEL_ENV_REFUSED");
      const targets = [...new Set(selected.flatMap((row) => Array.isArray(row.target) ? row.target : []))].sort();
      if (!targets.length || selected.some((row) => JSON.stringify([...row.target].sort()) !== JSON.stringify(targets))) fail("VERCEL_ENV_REFUSED");
      if (targets.some((target) => !["production", "preview", "development"].includes(target))) fail("VERCEL_ENV_REFUSED");
      this.targets = targets;
      return targets;
    },
  };

  const vercel = {
    projectExact: true,
    async installDeployProbeAlias({ handles, opaque, runtime }) {
      const publishable = getOpaque(handles, opaque, "publishableKey");
      const secret = getOpaque(handles, opaque, "secretKey");
      const protectedValues = [publishable, secret];
      const targets = this.readCurrentTargets();
      for (const target of targets) for (const [name, value] of [[BINDING_NAMES[0], publishable], [BINDING_NAMES[1], secret]]) {
        runPrivateProcess(vercelCommand, ["env", "update", name, target, "--sensitive", "--yes"], { input: `${value}\n`, cwd: root, protectedValues });
      }
      const tempRoot = resolve(tmpdir());
      const exportRoot = resolve(join(tempRoot, `036M-exact-source-${randomBytes(16).toString("hex")}`));
      if (!exportRoot.startsWith(`${tempRoot}${sep}`) || !basename(exportRoot).startsWith("036M-exact-source-")) fail("SOURCE_BUNDLE_REFUSED");
      const archive = `${exportRoot}.tar`;
      setOpaque(handles, opaque, "exportRoot", exportRoot);
      let candidate = "";
      try {
        runPrivateProcess("git", ["archive", "--format=tar", `--output=${archive}`, ACCEPTED_SOURCE], { cwd: root });
        runPrivateProcess("powershell", ["-NoProfile", "-Command", `New-Item -ItemType Directory -LiteralPath '${exportRoot.replaceAll("'", "''")}' | Out-Null; tar -xf '${archive.replaceAll("'", "''")}' -C '${exportRoot.replaceAll("'", "''")}'`], { cwd: root });
        unlinkSync(archive);
        const treeRows = runPrivateProcess("git", ["ls-tree", "-r", "--full-tree", ACCEPTED_SOURCE], { cwd: root }).trim().split(/\r?\n/).filter(Boolean).map((line) => {
          const match = /^(\d+) blob ([0-9a-f]{40})\t(.+)$/.exec(line);
          if (!match) fail("SOURCE_BUNDLE_REFUSED");
          return { mode: match[1], blob: match[2], path: match[3] };
        });
        const exported = listExportEntries(exportRoot);
        if (exported.length !== treeRows.length) fail("SOURCE_BUNDLE_REFUSED");
        for (const expected of treeRows) {
          const actual = exported.find((row) => row.path === expected.path);
          if (!actual || !["100644", "100755"].includes(expected.mode)) fail("SOURCE_BUNDLE_REFUSED");
          const blob = runPrivateProcess("git", ["hash-object", actual.absolute], { cwd: root }).trim();
          if (blob !== expected.blob) fail("SOURCE_BUNDLE_REFUSED");
          validateExportEnvironmentPath(expected.path);
          if (expected.path === ".env.example") {
            const committedBytes = Buffer.from(runPrivateProcess("git", ["cat-file", "blob", expected.blob], { cwd: root }), "utf8");
            validateExactEnvExample(readFileSync(actual.absolute), { expectedBytes: committedBytes, expectedBlob: expected.blob, actualBlob: blob });
          }
        }
        if (!treeRows.some((row) => row.path === ".env.example" && row.mode === "100644" && row.blob === "d790ad8998a4919d8ae5f308904047512b156f69")) fail("SOURCE_BUNDLE_REFUSED");
        const linkage = safeJson(readFileSync(join(root, ".vercel", "project.json"), "utf8"), "VERCEL_PROJECT_REFUSED");
        if (typeof linkage.projectId !== "string" || typeof linkage.orgId !== "string") fail("VERCEL_PROJECT_REFUSED");
        const vercelDir = join(exportRoot, ".vercel");
        runPrivateProcess("powershell", ["-NoProfile", "-Command", `New-Item -ItemType Directory -LiteralPath '${vercelDir.replaceAll("'", "''")}' | Out-Null`], { cwd: root });
        writeFileSync(join(vercelDir, "project.json"), JSON.stringify({ projectId: linkage.projectId, orgId: linkage.orgId }), { encoding: "utf8", flag: "wx" });
        const deployOutput = runPrivateProcess(vercelCommand, ["deploy", exportRoot, "--prod", "--skip-domain", "--yes"], { cwd: root, protectedValues });
        candidate = [...deployOutput.matchAll(/https:\/\/[A-Za-z0-9.-]+\.vercel\.app/g)].map((match) => match[0]).at(-1) ?? "";
        if (!candidate) fail("SOURCE_BUNDLE_REFUSED");
        setOpaque(handles, opaque, "candidate", candidate);
      } finally {
        if (archive.startsWith(`${tempRoot}${sep}`)) rmSync(archive, { force: true });
        if (exportRoot.startsWith(`${tempRoot}${sep}`)) rmSync(exportRoot, { recursive: true, force: true });
      }
      const probes = await runtime.runReplacementProbes({ handles, opaque });
      if (probes.passed !== 3) fail("RUNTIME_PROBE_REFUSED");
      for (const alias of ACCEPTED_ALIASES) runPrivateProcess(vercelCommand, ["alias", "set", candidate, alias], { cwd: root, protectedValues });
      const aliasReadback = readFiveAliasTargets({ vercelCommand, root, deployment: candidate, protectedValues });
      return { bindings: 3, candidates: 1, aliases: aliasReadback.aliases, probes: 3, exportAbsent: !lstatSafe(exportRoot), externalMutations: (targets.length * 2) + 6 };
    },
    async compensateBeforeLegacy({ handles, opaque, management, bindingsAttempted }) {
      const originalPublic = getOpaque(handles, opaque, "originalPublicBinding");
      const originalService = getOpaque(handles, opaque, "originalServiceBinding");
      const protectedValues = [originalPublic, originalService];
      const targets = this.targets ?? this.readCurrentTargets();
      if (bindingsAttempted) for (const target of targets) for (const [name, value] of [[BINDING_NAMES[0], originalPublic], [BINDING_NAMES[1], originalService]]) {
        runPrivateProcess(vercelCommand, ["env", "update", name, target, "--sensitive", "--yes"], { input: `${value}\n`, cwd: root, protectedValues });
      }
      const candidate = handles.candidate && opaque.has(handles.candidate) ? opaque.peek(handles.candidate) : null;
      if (candidate) runPrivateProcess(vercelCommand, ["remove", candidate, "--yes"], { cwd: root, protectedValues });
      const candidateReadback = candidate ? spawnSync(vercelCommand, ["inspect", candidate, "--json"], { cwd: root, encoding: "utf8", windowsHide: true, maxBuffer: 1024 * 1024 }) : null;
      const candidateText = `${candidateReadback?.stdout ?? ""}\n${candidateReadback?.stderr ?? ""}`;
      if (protectedValues.some((value) => value && candidateText.includes(value))) fail("PROTECTED_OUTPUT_REFUSED");
      const projectRef = getOpaque(handles, opaque, "project");
      const token = getOpaque(handles, opaque, "management");
      const beforeDelete = normalizeKeyRows(await managementRequest({ projectRef, token }));
      const baselineIds = new Set((management.baselineRows ?? []).map((row) => row.id));
      const ownedNames = new Set(["precision-performance-036m-browser", "precision-performance-036m-server"]);
      const discovered = beforeDelete.filter((row) => !baselineIds.has(row.id) && ownedNames.has(row.name)).map((row) => ({ ...row, provenance: "created-this-sprint" }));
      const selected = [...(management.selected ?? []), ...discovered.filter((row) => !(management.selected ?? []).some((known) => known.id === row.id))];
      const created = selected.filter((row) => row.provenance === "created-this-sprint");
      const originalAlias = getOpaque(handles, opaque, "originalAliasDeployment");
      if (bindingsAttempted) for (const alias of ACCEPTED_ALIASES) runPrivateProcess(vercelCommand, ["alias", "set", originalAlias, alias], { cwd: root, protectedValues });
      const aliasReadback = readFiveAliasTargets({ vercelCommand, root, deployment: originalAlias, protectedValues });
      for (const row of created) await managementRequest({ projectRef, token, path: `/${encodeURIComponent(row.id)}`, method: "DELETE" });
      const keyReadback = normalizeKeyRows(await managementRequest({ projectRef, token }));
      const createdKeysAbsent = created.filter((row) => !keyReadback.some((actual) => actual.id === row.id)).length;
      const selectedRows = selected.filter((row) => row.provenance === "pre-existing-selected");
      const selectedKeysPresent = selectedRows.filter((row) => keyReadback.some((actual) => actual.id === row.id)).length;
      const pairTypesAccounted = ["publishable", "secret"].filter((type) =>
        keyReadback.some((row) => row.type === type && baselineIds.has(row.id)) || !keyReadback.some((row) => row.type === type && ownedNames.has(row.name) && !baselineIds.has(row.id))
      ).length;
      return {
        bindingsRestored: 2,
        aliasesRestored: aliasReadback.aliases,
        targetsReadback: this.readCurrentTargets().length,
        candidateAbsent: !candidate || candidateReadback?.status !== 0,
        createdDeletes: created.length,
        selectedDeletes: 0,
        createdKeysAbsent,
        selectedKeysPresent,
        pairTypesAccounted,
        residue: 0,
      };
    },
    async finalReadback({ handles, opaque }) {
      const candidate = getOpaque(handles, opaque, "candidate");
      const exportRoot = getOpaque(handles, opaque, "exportRoot");
      const protectedValues = [getOpaque(handles, opaque, "publishableKey"), getOpaque(handles, opaque, "secretKey")];
      const aliasReadback = readFiveAliasTargets({ vercelCommand, root, deployment: candidate, protectedValues });
      const inspected = safeJson(runPrivateProcess(vercelCommand, ["inspect", candidate, "--json"], { cwd: root, protectedValues }), "FINAL_READBACK_REFUSED");
      const expected = normalizeDeploymentRef(candidate);
      const candidates = [inspected?.id, inspected?.url, inspected?.name, inspected?.deploymentId, inspected?.deployment?.id, inspected?.deployment?.url].map(normalizeDeploymentRef).filter(Boolean);
      if (!candidates.includes(expected)) fail("FINAL_READBACK_REFUSED");
      const targets = supabaseManagement.readCurrentTargets();
      return { aliases: aliasReadback.aliases, bindings: 3, candidates: 1, residue: 0, exportAbsent: !lstatSafe(exportRoot), targets: targets.length };
    },
  };

  const supabaseAuth = {
    projectExact: true,
    async dispositionTwoIdentities(args) { return (await import("./prelaunch-identity-036M.mjs")).executeLiveIdentityDispositions(args); },
    async prepareTrainerGraph(args) { return (await import("./prelaunch-trainer-036M.mjs")).executeLiveTrainerGraphPrepare(args); },
    async readTrainerDelivery(args) { return (await import("./prelaunch-trainer-036M.mjs")).executeLiveTrainerDelivery(args); },
    async observeAndCleanupTrainer(args) { return (await import("./prelaunch-trainer-036M.mjs")).executeLiveTrainerCleanup(args); },
    async cleanupPreparedTrainer(args) { return (await import("./prelaunch-trainer-036M.mjs")).executeLiveTrainerFixtureCleanup(args); },
  };

  const runtime = {
    zeroBusinessEffects: true,
    async runReplacementProbes({ handles, opaque }) {
      const url = `https://${getOpaque(handles, opaque, "project")}.supabase.co`;
      const publishable = getOpaque(handles, opaque, "publishableKey");
      const secret = getOpaque(handles, opaque, "secretKey");
      const userJwt = getOpaque(handles, opaque, "operatorUserJwt");
      const [publicResponse, userResponse, adminResponse] = await Promise.all([
        fetch(`${url}/rest/v1/`, { headers: { apikey: publishable } }),
        fetch(`${url}/auth/v1/user`, { headers: { apikey: publishable, authorization: `Bearer ${userJwt}` } }),
        fetch(`${url}/auth/v1/admin/users?page=1&per_page=1`, { headers: { apikey: secret } }),
      ]);
      if (!publicResponse.ok || !userResponse.ok || !adminResponse.ok) fail("RUNTIME_PROBE_REFUSED");
      return { passed: 3 };
    },
    async readLegacyInvalidation({ handles, opaque }) {
      const url = `https://${getOpaque(handles, opaque, "project")}.supabase.co/rest/v1/`;
      const [anon, service] = await Promise.all([
        fetch(url, { headers: { apikey: getOpaque(handles, opaque, "legacyAnon") } }),
        fetch(url, { headers: { apikey: getOpaque(handles, opaque, "legacyService") } }),
      ]);
      const current = await this.runReplacementProbes({ handles, opaque });
      return { predecessorRejected: Number(!anon.ok) + Number(!service.ok), authCompatible: current.passed === 3 };
    },
    async preflightOldDeployments() {
      return { ready: false, addressable: 0 };
    },
    async readOldDeploymentInvalidation() {
      fail("OLD_DEPLOYMENT_PROBE_REFUSED");
    },
    async dispositionSevenClasses() {
      const rows = CREDENTIAL_CLASSES.map((name) => projectCredentialClassLanding(name, name === "SUPABASE_SERVICE_ROLE_KEY" ? {
        disposition: "rotated-and-verified",
        trainerPath: true,
        mutations: 0,
        businessEffects: 0,
        nativeReadback: true,
      } : {
        disposition: "blocked-retained",
        trainerPath: true,
        mutations: 0,
        businessEffects: 0,
        nativeReadback: false,
      }));
      const service = rows.find((row) => row.class === "SUPABASE_SERVICE_ROLE_KEY");
      if (service?.disposition !== "rotated-and-verified" || service.trainerPath !== true) fail("CLASS_ROWS_REFUSED");
      return {
        rows,
        trainerPathClear: false,
        externalMutations: rows.reduce((sum, row) => sum + row.mutations, 0),
        residue: 0,
      };
    },
    async finalReadback(args) { return vercel.finalReadback(args); },
  };
  return createProtectedProviderAdapters({ supabaseManagement, supabaseAuth, vercel, runtime });
}
export async function runMode(mode) {
  if (mode === "self-test") return { state: "pass", externalMutations: 0, protectedOutput: false };
  if (mode === "stderr-canary-test") {
    process.stderr.write("transport-private-canary\n");
    return { state: "pass", externalMutations: 0, protectedOutput: false };
  }
  if (mode === "capability-gate") return { state: "private-window-required", externalMutations: 0, protectedOutput: false, required: ["supabase-scoped-key-authority", "vercel-exact-project-session", "private-identity-authority", "one-real-trainer"] };
  if (mode === "protected-window-child") {
    const adapters = createNativeProtectedAdapters();
    return runProtectedWindowChild({ handlers: createProtectedWindowHandlers(adapters) });
  }
  fail("MODE_REFUSED");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runMode(process.argv[2] || "self-test").then((value) => process.stdout.write(`${JSON.stringify(assertSafeProjection(value))}\n`)).catch((error) => { process.stdout.write(`${JSON.stringify({ state: "failed-sanitized", code: sanitizeFailure(error) })}\n`); process.exitCode = 2; });
}
