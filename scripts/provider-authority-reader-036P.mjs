import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { buildAcceptedSourceGraph } from "./provider-authority-discovery-036P.mjs";
import { decodeDomainPage, selectExpectedDomain, decodeDomainDetail, decodeKeyPage, buildProviderDnsTuples, reconcilePublicDns, validateResendFrame } from "./provider-authority-resend-domain-036R.mjs";

export const MAX_REQUESTS = 24;
export const MAX_PAGES = 100;
export const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
export const MAX_LINE_BYTES = 64 * 1024;
export const PROVIDERS = Object.freeze(["vercel", "supabase", "resend", "stripe", "railway"]);
export const OUTCOMES = Object.freeze(["protected-provider-authority-readback-complete-clean", "protected-provider-authority-readback-blocked-clean"]);
export const REQUEST_MATRIX = Object.freeze({
  vercel: Object.freeze({
    project: Object.freeze({ method: "GET", path: "/v9/projects/{project}", decrypt: false }),
    deployments: Object.freeze({ method: "GET", path: "/v6/deployments", paginated: true, decrypt: false }),
    environment: Object.freeze({ method: "GET", path: "/v10/projects/{project}/env", paginated: true, decrypt: false }),
    aliases: Object.freeze({ method: "GET", path: "/v4/aliases", paginated: true }),
    crons: Object.freeze({ method: "GET", path: "/v9/projects/{project}", sharedResponse: "project" }),
    integrations: Object.freeze({ method: "GET", path: "/v1/integrations/configurations", paginated: false }),
    webhooks: Object.freeze({ method: "GET", path: "/v1/webhooks", paginated: false }),
  }),
  supabase: Object.freeze({
    project: Object.freeze({ method: "GET", path: "/v1/projects/{ref}" }),
    keys: Object.freeze({ method: "GET", path: "/v1/projects/{ref}/api-keys", reveal: false }),
    functions: Object.freeze({ method: "GET", path: "/v1/projects/{ref}/functions" }),
    catalog: Object.freeze({ method: "POST", path: "/v1/projects/{ref}/database/query/read-only", readOnlySql: true }),
  }),
  resend: Object.freeze({
    identity: Object.freeze({ method: "NATIVE", operation: "whoami-or-signed-in-team" }),
    keys: Object.freeze({ method: "GET", path: "/api-keys", paginated: true }),
    domains: Object.freeze({ method: "GET", path: "/domains", paginated: true }),
    domainDetail: Object.freeze({ method: "GET", path: "/domains/{domain_id}" }),
  }),
  stripe: Object.freeze({
    account: Object.freeze({ method: "GET", path: "/v1/account" }),
    webhooks: Object.freeze({ method: "GET", path: "/v1/webhook_endpoints", paginated: true }),
  }),
  railway: Object.freeze({
    graph: Object.freeze({ method: "POST", url: "https://backboard.railway.com/graphql/v2", fixedQuery: true }),
  }),
});

const AUTHORITY = new WeakMap();
const SESSION = new WeakMap();
const TEST_RESULT_BRAND = new WeakSet();
const LIVE_RESULT_BRAND = new WeakSet();
const ADAPTER_BRAND = new WeakSet();
const REQUIRED_OPERATIONS = Object.freeze({
  vercel: Object.freeze(["project", "deployments", "environment", "aliases", "crons", "integrations", "webhooks"]),
  supabase: Object.freeze(["project", "keys", "functions", "catalog"]),
  resend: Object.freeze(["identity", "keys", "domains"]),
  stripe: Object.freeze(["account", "webhooks"]),
  railway: Object.freeze(["graph"]),
});
const REQUIRED_OPERATIONS_036R = Object.freeze({
  ...REQUIRED_OPERATIONS,
  resend: Object.freeze(["domains", "domainDetail", "keys", "dns"]),
});
const OUTCOMES_036R = Object.freeze(["resend-domain-bound-five-provider-authority-complete-clean", "resend-domain-bound-five-provider-authority-blocked-clean"]);
const CAPABILITY_CLASSES = Object.freeze([
  "SUPABASE_SERVICE_ROLE_KEY", "CRON_SECRET", "ENQUIRY_ABUSE_HMAC_SECRET",
  "PUBLIC_ENQUIRY_SMTP_PASS", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "RAILWAY_API_TOKEN",
]);
const CAPABILITY_FIELDS = Object.freeze([
  "class", "authority", "sourceConsumers", "sourceComplete", "providerConsumers", "paginationComplete",
  "reachability", "replacement", "installTargets", "readback", "predecessorAction", "predecessorOracle",
  "coupling", "manualUiRequired", "laterMutation",
]);
const CLASS_PROVIDER = Object.freeze({
  SUPABASE_SERVICE_ROLE_KEY: "supabase", CRON_SECRET: "vercel", ENQUIRY_ABUSE_HMAC_SECRET: "vercel",
  PUBLIC_ENQUIRY_SMTP_PASS: "resend", STRIPE_SECRET_KEY: "stripe", STRIPE_WEBHOOK_SECRET: "stripe", RAILWAY_API_TOKEN: "railway",
});const BAD_KEY = /(?:secret|password|cookie|authorization|token|raw|value|content|smtp_pass)/i;
const PROTECTED_PATTERN = /(?:sbp_|sb_secret_|re_[A-Za-z0-9]{8,}|sk_(?:live|test)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]{8,}|gh[pousr]_[A-Za-z0-9]{8,}|-----BEGIN [A-Z ]+PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{8,}\.)/;

export class Reader036PError extends Error {
  constructor(code, context) {
    super(code);
    this.code = code;
    if (context) this.context = Object.freeze(context);
  }
}
const fail = (code, context) => { throw new Reader036PError(code, context); };
const object = (value, code) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(code);
  return value;
};
const string = (value, code, maximum = 2048) => {
  if (typeof value !== "string" || value.length === 0 || value.length > maximum) fail(code);
  return value;
};
const exactKeys = (value, allowed, code) => {
  object(value, code);
  const keys = Object.keys(value);
  if (keys.some((key) => !allowed.includes(key))) fail(code);
  return value;
};

export function assertReadOnlyRequest(provider, operation, descriptor) {
  if (!PROVIDERS.includes(provider) || !Object.hasOwn(REQUEST_MATRIX[provider], operation)) fail("REQUEST_NOT_ALLOWLISTED");
  const expected = REQUEST_MATRIX[provider][operation];
  if (descriptor.method !== expected.method) fail("REQUEST_METHOD_REFUSED");
  if (descriptor.decrypt || descriptor.reveal || descriptor.mutation) fail("REQUEST_REVEAL_OR_WRITE_REFUSED");
  if (expected.path && descriptor.path !== expected.path) fail("REQUEST_PATH_REFUSED");
  if (expected.url && descriptor.url !== expected.url) fail("REQUEST_PATH_REFUSED");
  if (provider === "supabase" && operation === "catalog") {
    if (!Array.isArray(descriptor.queries) || descriptor.queries.length === 0) fail("SUPABASE_SQL_REFUSED");
    for (const query of descriptor.queries) {
      if (typeof query !== "string" || !/^\s*select\b/i.test(query) || /;\s*\S/.test(query) || /\b(insert|update|delete|alter|drop|create|grant|revoke|copy|call)\b/i.test(query)) fail("SUPABASE_SQL_REFUSED");
      if (!/\b(?:pg_catalog|information_schema|cron|vault|net|supabase_functions)\./i.test(query)) fail("SUPABASE_SQL_REFUSED");
    }
  }
  return Object.freeze({ provider, operation, method: expected.method });
}

export function assertBoundedResponse(raw) {
  const text = typeof raw === "string" ? raw : JSON.stringify(raw);
  if (typeof text !== "string" || Buffer.byteLength(text) > MAX_RESPONSE_BYTES) fail("RESPONSE_BOUNDS_REFUSED");
  if (PROTECTED_PATTERN.test(text)) fail("PROTECTED_RESPONSE_REFUSED");
  let parsed;
  try { parsed = typeof raw === "string" ? JSON.parse(raw) : raw; } catch { fail("RESPONSE_JSON_REFUSED"); }
  const walk = (value, depth = 0) => {
    if (depth > 16) fail("RESPONSE_DEPTH_REFUSED");
    if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        if (BAD_KEY.test(key) && child !== null && child !== false && child !== 0 && child !== "") fail("PROTECTED_FIELD_REFUSED");
        walk(child, depth + 1);
      }
    }
  };
  walk(parsed);
  return parsed;
}

export function createAuthorityHandle(expected) {
  exactKeys(expected, ["vercelTeamId", "vercelProjectId", "supabaseProjectRef", "resendTeamId", "stripeAccountId", "stripeLiveMode", "railwayTokenType", "railwayAccountId", "railwayWorkspaceId", "railwayProjectId", "railwayEnvironmentId"], "AUTHORITY_SHAPE_REFUSED");
  const required = ["vercelTeamId", "vercelProjectId", "supabaseProjectRef", "resendTeamId", "stripeAccountId", "railwayTokenType", "railwayProjectId"];
  required.forEach((key) => string(expected[key], "AUTHORITY_SHAPE_REFUSED"));
  if (typeof expected.stripeLiveMode !== "boolean") fail("AUTHORITY_SHAPE_REFUSED");
  if (!["account", "workspace", "project"].includes(expected.railwayTokenType)) fail("RAILWAY_TOKEN_TYPE_REFUSED");
  const handle = Object.freeze({ snapshot: Object.freeze(() => Object.freeze({ providers: 5, exact: true })) });
  AUTHORITY.set(handle, Object.freeze({ ...expected }));
  return handle;
}

export function createReadSession(authorityHandle, capturedValues = []) {
  if (!AUTHORITY.has(authorityHandle)) fail("AUTHORITY_HANDLE_REFUSED");
  if (!Array.isArray(capturedValues) || capturedValues.some((value) => typeof value !== "string" || value.length < 8)) fail("CAPTURED_VALUE_REFUSED");
  const handle = Object.freeze({ snapshot: Object.freeze(() => {
    const state = SESSION.get(handle);
    return Object.freeze({ requests: state.requests, closed: state.closed, providerReads: state.requests, writes: 0, mutations: 0, residue: 0 });
  }) });
  SESSION.set(handle, { authority: authorityHandle, captured: Object.freeze([...capturedValues]), requests: 0, closed: false, operations: new Map(), bindings: new Set(), rows: null });
  return handle;
}

export function beforeRequest(sessionHandle) {
  const state = SESSION.get(sessionHandle);
  if (!state || state.closed) fail("SESSION_REFUSED");
  if (state.requests >= MAX_REQUESTS) fail("REQUEST_CEILING_REFUSED");
  state.requests += 1;
  return state.requests;
}

export function sanitizeProjection(sessionHandle, projection) {
  const state = SESSION.get(sessionHandle);
  if (!state) fail("SESSION_REFUSED");
  const text = JSON.stringify(projection);
  if (Buffer.byteLength(text) > MAX_LINE_BYTES || PROTECTED_PATTERN.test(text)) fail("PROJECTION_REFUSED");
  for (const captured of state.captured) if (text.includes(captured)) fail("TAINT_REFUSED");
  const walk = (value) => {
    if (value && typeof value === "object") for (const [key, child] of Object.entries(value)) {
      if (BAD_KEY.test(key)) fail("PROJECTION_FIELD_REFUSED");
      walk(child);
    }
  };
  walk(projection);
  return projection;
}

export function closeReadSession(sessionHandle) {
  const state = SESSION.get(sessionHandle);
  if (!state) fail("SESSION_REFUSED");
  state.closed = true;
  state.captured = Object.freeze([]);
  return sessionHandle.snapshot();
}

export async function paginateReadOnly(sessionHandle, fetchPage, decode, { cursor = null, maximumPages = MAX_PAGES } = {}) {
  if (typeof fetchPage !== "function" || typeof decode !== "function" || maximumPages < 1 || maximumPages > MAX_PAGES) fail("PAGINATION_REFUSED");
  const ids = new Set();
  const cursors = new Set();
  const rows = [];
  let current = cursor;
  for (let page = 0; page < maximumPages; page += 1) {
    beforeRequest(sessionHandle);
    const decoded = decode(assertBoundedResponse(await fetchPage(current)));
    if (!decoded || !Array.isArray(decoded.rows) || !(decoded.next === null || typeof decoded.next === "string")) fail("PAGINATION_REFUSED");
    for (const row of decoded.rows) {
      const id = string(row.id, "PAGINATION_REFUSED");
      if (ids.has(id)) fail("PAGINATION_DUPLICATE_REFUSED");
      ids.add(id);
      rows.push(Object.freeze(row));
    }
    if (decoded.next === null) return Object.freeze({ rows: Object.freeze(rows), pages: page + 1, complete: true });
    if (!decoded.next || cursors.has(decoded.next)) fail("PAGINATION_CURSOR_REFUSED");
    cursors.add(decoded.next);
    current = decoded.next;
  }
  fail("PAGINATION_INCOMPLETE_FALLBACK");
}

export const decoders = Object.freeze({
  vercelProject(raw, expected) {
    exactKeys(raw, ["id", "name", "accountId", "crons", "createdAt"], "VERCEL_PROJECT_REFUSED");
    if (raw.id !== expected.vercelProjectId || raw.accountId !== expected.vercelTeamId) fail("VERCEL_AUTHORITY_REFUSED");
    return Object.freeze({ projectId: raw.id, teamId: raw.accountId, name: string(raw.name, "VERCEL_PROJECT_REFUSED") });
  },
  vercelEnv(raw, expected) {
    exactKeys(raw, ["envs", "pagination", "createdAt"], "VERCEL_ENV_REFUSED");
    const rows = raw.envs.map((row) => {
      exactKeys(row, ["id", "key", "type", "target", "gitBranch", "createdAt"], "VERCEL_ENV_REFUSED");
      if (!Array.isArray(row.target) || row.target.some((target) => !["production", "preview", "development"].includes(target))) fail("VERCEL_ENV_REFUSED");
      return Object.freeze({ id: string(row.id, "VERCEL_ENV_REFUSED"), name: string(row.key, "VERCEL_ENV_REFUSED"), type: string(row.type, "VERCEL_ENV_REFUSED"), targets: Object.freeze([...row.target]), projectId: expected.vercelProjectId });
    });
    return Object.freeze({ rows: Object.freeze(rows), next: raw.pagination?.next ?? null });
  },
  supabaseKeys(raw, expected) {
    if (!Array.isArray(raw)) fail("SUPABASE_KEYS_REFUSED");
    return Object.freeze(raw.map((row) => {
      exactKeys(row, ["id", "type", "prefix", "name", "description"], "SUPABASE_KEYS_REFUSED");
      return Object.freeze({ id: string(row.id, "SUPABASE_KEYS_REFUSED"), type: string(row.type, "SUPABASE_KEYS_REFUSED"), name: string(row.name, "SUPABASE_KEYS_REFUSED"), projectRef: expected.supabaseProjectRef });
    }));
  },
  supabaseCatalog(raw, expected) {
    exactKeys(raw, ["rows"], "SUPABASE_CATALOG_REFUSED");
    return Object.freeze(raw.rows.map((row) => {
      exactKeys(row, ["kind", "schema", "name", "target_class"], "SUPABASE_CATALOG_REFUSED");
      if (!["database-webhook", "pg-net", "pg-cron", "vault-reference"].includes(row.kind)) fail("SUPABASE_CATALOG_REFUSED");
      return Object.freeze({ id: `${expected.supabaseProjectRef}:${row.schema}:${row.name}`, kind: row.kind, targetClass: row.target_class ?? null });
    }));
  },
  resendIdentity(raw, expected) {
    exactKeys(raw, ["teamId", "source", "profile"], "RESEND_IDENTITY_REFUSED");
    if (raw.teamId !== expected.resendTeamId || !["whoami", "signed-in-native"].includes(raw.source)) fail("RESEND_AUTHORITY_REFUSED");
    return Object.freeze({ teamId: raw.teamId, source: raw.source, profile: string(raw.profile, "RESEND_IDENTITY_REFUSED") });
  },
  resendKeys(raw, expected) {
    exactKeys(raw, ["object", "has_more", "data"], "RESEND_KEYS_REFUSED");
    if (raw.object !== "list" || typeof raw.has_more !== "boolean") fail("RESEND_KEYS_REFUSED");
    const rows = raw.data.map((row) => {
      exactKeys(row, ["id", "name", "created_at", "last_used_at"], "RESEND_KEYS_REFUSED");
      return Object.freeze({ id: string(row.id, "RESEND_KEYS_REFUSED"), name: string(row.name, "RESEND_KEYS_REFUSED"), teamId: expected.resendTeamId, createdAt: row.created_at ?? null, lastUsedAt: row.last_used_at ?? null });
    });
    return Object.freeze({ rows: Object.freeze(rows), next: raw.has_more ? rows.at(-1)?.id ?? "" : null });
  },
  resendDomains(raw, expected) {
    exactKeys(raw, ["object", "has_more", "data"], "RESEND_DOMAINS_REFUSED");
    if (raw.object !== "list" || typeof raw.has_more !== "boolean") fail("RESEND_DOMAINS_REFUSED");
    const rows = raw.data.map((row) => {
      exactKeys(row, ["id", "name", "status", "region", "created_at"], "RESEND_DOMAINS_REFUSED");
      return Object.freeze({ id: string(row.id, "RESEND_DOMAINS_REFUSED"), name: string(row.name, "RESEND_DOMAINS_REFUSED"), status: row.status ?? null, teamId: expected.resendTeamId });
    });
    return Object.freeze({ rows: Object.freeze(rows), next: raw.has_more ? rows.at(-1)?.id ?? "" : null });
  },
  stripeAccount(raw, expected) {
    exactKeys(raw, ["id", "object", "livemode", "business_profile", "business_type", "capabilities", "charges_enabled", "controller", "country", "created", "default_currency", "details_submitted", "email", "external_accounts", "future_requirements", "individual", "metadata", "payouts_enabled", "requirements", "settings", "tos_acceptance", "type"], "STRIPE_ACCOUNT_REFUSED");
    if (raw.object !== "account" || raw.id !== expected.stripeAccountId || raw.livemode !== expected.stripeLiveMode) fail("STRIPE_AUTHORITY_REFUSED");
    return Object.freeze({ accountId: raw.id, liveMode: raw.livemode, country: raw.country ?? null });
  },
  stripeWebhooks(raw, expected) {
    exactKeys(raw, ["object", "data", "has_more", "url"], "STRIPE_WEBHOOK_REFUSED");
    if (raw.object !== "list" || typeof raw.has_more !== "boolean") fail("STRIPE_WEBHOOK_REFUSED");
    const rows = raw.data.map((row) => {
      exactKeys(row, ["id", "object", "api_version", "application", "created", "description", "enabled_events", "livemode", "metadata", "status", "url"], "STRIPE_WEBHOOK_REFUSED");
      if (row.object !== "webhook_endpoint" || row.livemode !== expected.stripeLiveMode) fail("STRIPE_AUTHORITY_REFUSED");
      return Object.freeze({ id: string(row.id, "STRIPE_WEBHOOK_REFUSED"), status: row.status ?? null, host: new URL(string(row.url, "STRIPE_WEBHOOK_REFUSED")).host, liveMode: row.livemode });
    });
    return Object.freeze({ rows: Object.freeze(rows), next: raw.has_more ? rows.at(-1)?.id ?? "" : null });
  },
  railway(raw, expected) {
    exactKeys(raw, ["data"], "RAILWAY_RESPONSE_REFUSED");
    const data = object(raw.data, "RAILWAY_RESPONSE_REFUSED");
    if (expected.railwayTokenType === "project") {
      if (data.projectToken?.projectId !== expected.railwayProjectId || data.projectToken?.environmentId !== expected.railwayEnvironmentId) fail("RAILWAY_AUTHORITY_REFUSED");
      return Object.freeze({ tokenType: "project", projectId: data.projectToken.projectId, environmentId: data.projectToken.environmentId });
    }
    if (data.workspace?.id !== expected.railwayWorkspaceId) fail("RAILWAY_AUTHORITY_REFUSED");
    const projects = data.workspace.projects?.edges?.map((edge) => edge.node) ?? [];
    const project = projects.find((row) => row.id === expected.railwayProjectId);
    if (!project) fail("RAILWAY_AUTHORITY_REFUSED");
    if (expected.railwayTokenType === "account" && data.me?.id !== expected.railwayAccountId) fail("RAILWAY_AUTHORITY_REFUSED");
    return Object.freeze({ tokenType: expected.railwayTokenType, workspaceId: data.workspace.id, projectId: project.id });
  },
});

export function railwayHeaders(tokenType, token) {
  if (typeof token !== "string" || token.length < 8) fail("RAILWAY_TOKEN_REFUSED");
  if (tokenType === "project") return Object.freeze({ "Project-Access-Token": token, "Content-Type": "application/json" });
  if (tokenType === "account" || tokenType === "workspace") return Object.freeze({ Authorization: `Bearer ${token}`, "Content-Type": "application/json" });
  fail("RAILWAY_TOKEN_TYPE_REFUSED");
}

function validateCapabilityRows(rows) {
  if (!Array.isArray(rows) || rows.length !== CAPABILITY_CLASSES.length) fail("CAPABILITY_ROWS_REFUSED");
  return Object.freeze(rows.map((row, index) => {
    exactKeys(row, CAPABILITY_FIELDS, "CAPABILITY_ROWS_REFUSED");
    if (row.class !== CAPABILITY_CLASSES[index] || row.authority !== CLASS_PROVIDER[row.class]) fail("CAPABILITY_ROWS_REFUSED");
    if (!Array.isArray(row.sourceConsumers) || row.sourceConsumers.some((value) => typeof value !== "string") || typeof row.sourceComplete !== "boolean") fail("CAPABILITY_ROWS_REFUSED");
    if (!Number.isInteger(row.providerConsumers) || row.providerConsumers < 0 || typeof row.paginationComplete !== "boolean") fail("CAPABILITY_ROWS_REFUSED");
    if (!["required", "not-reachable-proven", "unknown-blocking"].includes(row.reachability)) fail("CAPABILITY_ROWS_REFUSED");
    for (const key of ["replacement", "readback", "predecessorAction", "predecessorOracle", "coupling"]) string(row[key], "CAPABILITY_ROWS_REFUSED", 256);
    if (!Array.isArray(row.installTargets) || row.installTargets.some((value) => typeof value !== "string" || value.length === 0) || typeof row.manualUiRequired !== "boolean") fail("CAPABILITY_ROWS_REFUSED");
    if (!["executable", "blocked", "owner-action-required"].includes(row.laterMutation)) fail("CAPABILITY_ROWS_REFUSED");
    return Object.freeze({ ...row, sourceConsumers: Object.freeze([...row.sourceConsumers]), installTargets: Object.freeze([...row.installTargets]) });
  }));
}
function recordOperation(sessionHandle, provider, operation, projection) {
  const state = SESSION.get(sessionHandle);
  if (!state || state.closed || !REQUIRED_OPERATIONS[provider]?.includes(operation)) fail("OPERATION_REFUSED");
  const key = `${provider}:${operation}`;
  if (state.operations.has(key)) fail("OPERATION_DUPLICATE_REFUSED");
  sanitizeProjection(sessionHandle, projection);
  state.operations.set(key, Object.freeze({ provider, operation, complete: projection.complete !== false }));
  if (projection.authorityBound) state.bindings.add(provider);
  if (Array.isArray(projection.rows)) state.rows = Object.freeze(projection.rows.map((row) => Object.freeze({ ...row })));
}

function deriveResult(sessionHandle, fallbackReason = null) {
  const state = SESSION.get(sessionHandle);
  if (!state) fail("SESSION_REFUSED");
  const allOperations = Object.entries(REQUIRED_OPERATIONS).every(([provider, operations]) => operations.every((operation) => state.operations.get(`${provider}:${operation}`)?.complete));
  const authorities = state.bindings.size;
  let capabilityRows = Object.freeze([]);
  try { capabilityRows = validateCapabilityRows(state.rows); } catch {}
  const rowsResolved = capabilityRows.length === 7 && capabilityRows.every((row) => row.reachability !== "unknown-blocking");
  const complete = allOperations && authorities === 5 && rowsResolved && state.requests <= MAX_REQUESTS && !fallbackReason;
  state.closed = true;
  state.captured = Object.freeze([]);
  const result = Object.freeze({ outcome: complete ? OUTCOMES[0] : OUTCOMES[1], complete, reason: complete ? null : fallbackReason ?? (capabilityRows.length === 7 ? "UNRESOLVED_CAPABILITY_ROW" : "INCOMPLETE_AUTHORITY_TRACE"), authorities, rows: capabilityRows.length, capabilityRows, providerReads: state.requests, writes: 0, mutations: 0, residue: 0 });
  TEST_RESULT_BRAND.add(result);
  return result;
}

export function createTestAdapterSet(projections = {}) {
  const adapters = Object.freeze({ async run(provider, operation) { return Object.freeze(projections[`${provider}:${operation}`] ?? { authorityBound: operation === REQUIRED_OPERATIONS[provider][0], complete: true }); } });
  ADAPTER_BRAND.add(adapters);
  return adapters;
}

export async function executeReadPlan(authorityHandle, adapters, { capturedValues = [], fallbackReason = null } = {}) {
  if (!AUTHORITY.has(authorityHandle) || !ADAPTER_BRAND.has(adapters)) fail("ADAPTER_AUTHORITY_REFUSED");
  const session = createReadSession(authorityHandle, capturedValues);
  try {
    for (const provider of PROVIDERS) for (const operation of REQUIRED_OPERATIONS[provider]) {
      beforeRequest(session);
      recordOperation(session, provider, operation, await adapters.run(provider, operation));
    }
    return deriveResult(session, fallbackReason);
  } catch (error) {
    return deriveResult(session, error instanceof Reader036PError ? error.code : "PROVIDER_READ_FAILED");
  }
}

export function assertTestReadResult(result) {
  if (!TEST_RESULT_BRAND.has(result) || result.writes !== 0 || result.mutations !== 0 || result.residue !== 0 || result.providerReads > MAX_REQUESTS) fail("RESULT_REFUSED");
  return result;
}

async function* readLines() {
  let buffer = "";
  for await (const chunk of process.stdin.setEncoding("utf8")) {
    buffer += chunk;
    while (buffer.includes("\n")) {
      const at = buffer.indexOf("\n"), line = buffer.slice(0, at); buffer = buffer.slice(at + 1);
      if (Buffer.byteLength(line) > MAX_LINE_BYTES) fail("CHILD_LINE_REFUSED");
      yield JSON.parse(line);
    }
  }
  if (buffer.trim()) yield JSON.parse(buffer);
}

const SUPABASE_CATALOG_QUERIES = Object.freeze([
  Object.freeze({ kind: "database-webhook", query: "select n.nspname as schema_name, c.relname as relation_name, t.tgname as object_name from pg_catalog.pg_trigger as t join pg_catalog.pg_class as c on c.oid=t.tgrelid join pg_catalog.pg_namespace as n on n.oid=c.relnamespace join pg_catalog.pg_proc as p on p.oid=t.tgfoid join pg_catalog.pg_namespace as pn on pn.oid=p.pronamespace where not t.tgisinternal and pn.nspname='supabase_functions' and p.proname='http_request' order by 1,2,3" }),
  Object.freeze({ kind: "pg-net", query: "select cn.nspname as schema_name, caller.proname as object_name, callee.proname as target_name from pg_catalog.pg_depend as d join pg_catalog.pg_proc as caller on caller.oid=d.objid join pg_catalog.pg_namespace as cn on cn.oid=caller.pronamespace join pg_catalog.pg_proc as callee on callee.oid=d.refobjid join pg_catalog.pg_namespace as tn on tn.oid=callee.pronamespace where d.classid='pg_catalog.pg_proc'::pg_catalog.regclass and d.refclassid='pg_catalog.pg_proc'::pg_catalog.regclass and tn.nspname='net' and callee.proname like 'http_%' order by 1,2,3" }),
  Object.freeze({ kind: "pg-cron", query: "select jobid::text as id, jobname, schedule, database, active from cron.job order by jobid" }),
  Object.freeze({ kind: "vault-reference", query: "select id::text as id, name from vault.secrets where name = any(array['SUPABASE_SERVICE_ROLE_KEY','CRON_SECRET','ENQUIRY_ABUSE_HMAC_SECRET','PUBLIC_ENQUIRY_SMTP_PASS','STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET','RAILWAY_API_TOKEN']::text[]) order by name,id" }),
]);

const realTransport = Object.freeze({
  async http(url, options) {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(15000), redirect: "error" });
    return Object.freeze({ ok: response.ok, status: response.status, text: await response.text() });
  },
  cli() { return spawnSync("resend", ["whoami", "--json"], { encoding: "utf8", windowsHide: true, timeout: 15000, env: {} }); },
});

async function readHttp(provider, operation, descriptor, url, options, trace, transport) {
  assertReadOnlyRequest(provider, operation, descriptor);
  if (trace.requests >= MAX_REQUESTS) fail("REQUEST_CEILING_REFUSED");
  trace.requests += 1;
  const response = await transport.http(url, options);
  const bytes = Buffer.byteLength(response.text ?? "");
  const used = (trace.bytes.get(provider) ?? 0) + bytes;
  trace.bytes.set(provider, used);
  if (used > MAX_RESPONSE_BYTES) fail("PROVIDER_RESPONSE_BOUNDS_REFUSED");
  if (!response.ok) fail(`HTTP_${response.status}_FALLBACK`);
  return assertBoundedResponse(response.text);
}

async function readResendDomainDetail036R(url, options, trace, transport) {
  assertReadOnlyRequest("resend", "domainDetail", { method: "GET", path: "/domains/{domain_id}" });
  if (trace.requests >= MAX_REQUESTS) fail("REQUEST_CEILING_REFUSED");
  trace.requests += 1;
  const response = await transport.http(url, options);
  const text = response.text ?? "";
  const bytes = Buffer.byteLength(text);
  const used = (trace.bytes.get("resend") ?? 0) + bytes;
  trace.bytes.set("resend", used);
  if (used > MAX_RESPONSE_BYTES) fail("PROVIDER_RESPONSE_BOUNDS_REFUSED");
  if (!response.ok) fail(`HTTP_${response.status}_FALLBACK`);
  if (PROTECTED_PATTERN.test(text)) fail("PROTECTED_RESPONSE_REFUSED");
  try { return JSON.parse(text); } catch { fail("PROVIDER_RESPONSE_JSON_REFUSED"); }
}


async function exhaustPages({ provider, operation, descriptor, firstUrl, nextUrl, decode, options, trace, transport }) {
  const ids = new Set(), cursors = new Set(), rows = [];
  let cursor = null, page = 0;
  do {
    const raw = await readHttp(provider, operation, descriptor, page === 0 ? firstUrl : nextUrl(cursor), options, trace, transport);
    const decoded = decode(raw);
    for (const row of decoded.rows) {
      if (ids.has(row.id)) fail("PAGINATION_DUPLICATE_REFUSED");
      ids.add(row.id); rows.push(row);
    }
    cursor = decoded.next; page += 1;
    if (cursor !== null) {
      if (typeof cursor !== "string" || !cursor || cursors.has(cursor)) fail("PAGINATION_CURSOR_REFUSED");
      cursors.add(cursor);
    }
  } while (cursor !== null);
  return Object.freeze({ rows: Object.freeze(rows), pages: page });
}

function selectVercelProject(raw, projectId, teamId) {
  object(raw, "VERCEL_PROJECT_REFUSED");
  if (raw.id !== projectId || raw.accountId !== teamId || typeof raw.name !== "string") fail("VERCEL_AUTHORITY_REFUSED");
  const crons = object(raw.crons, "VERCEL_CRON_REFUSED");
  if (!Array.isArray(crons.definitions)) fail("VERCEL_CRON_REFUSED");
  const definitions = crons.definitions.map((row) => {
    object(row, "VERCEL_CRON_REFUSED"); string(row.host, "VERCEL_CRON_REFUSED"); string(row.path, "VERCEL_CRON_REFUSED"); string(row.schedule, "VERCEL_CRON_REFUSED");
    return Object.freeze({ host: row.host, path: row.path, schedule: row.schedule });
  });
  return Object.freeze({ project: Object.freeze({ id: raw.id, teamId: raw.accountId, name: raw.name }), crons: Object.freeze(definitions) });
}

function deploymentPage(raw, projectId, teamId) {
  object(raw, "VERCEL_DEPLOYMENT_REFUSED"); if (!Array.isArray(raw.deployments)) fail("VERCEL_DEPLOYMENT_REFUSED");
  const rows = raw.deployments.map((row) => { object(row, "VERCEL_DEPLOYMENT_REFUSED"); if (row.projectId && row.projectId !== projectId) fail("VERCEL_AUTHORITY_REFUSED"); if (row.teamId && row.teamId !== teamId) fail("VERCEL_AUTHORITY_REFUSED"); return Object.freeze({ id: string(row.uid ?? row.id, "VERCEL_DEPLOYMENT_REFUSED") }); });
  return Object.freeze({ rows, next: raw.pagination?.next ?? null });
}
function aliasPage(raw, projectId) {
  object(raw, "VERCEL_ALIAS_REFUSED"); if (!Array.isArray(raw.aliases)) fail("VERCEL_ALIAS_REFUSED");
  return Object.freeze({ rows: raw.aliases.map((row) => { object(row, "VERCEL_ALIAS_REFUSED"); if (row.projectId && row.projectId !== projectId) fail("VERCEL_AUTHORITY_REFUSED"); return Object.freeze({ id: string(row.uid ?? row.id, "VERCEL_ALIAS_REFUSED") }); }), next: raw.pagination?.next ?? null });
}
function arrayRows(raw, code, projectId, teamId) {
  if (!Array.isArray(raw)) fail(code);
  return Object.freeze(raw.map((row) => {
    object(row, code);
    const owner = row.ownerId ?? row.teamId;
    const rawProjects = row.projectIds ?? row.projects;
    if (owner !== teamId || !Array.isArray(rawProjects) || rawProjects.length === 0) fail("VERCEL_AUTHORITY_REFUSED");
    const projects = rawProjects.map((value) => typeof value === "string" ? value : value?.id ?? value?.projectId);
    if (projects.some((value) => typeof value !== "string") || !projects.includes(projectId)) fail("VERCEL_AUTHORITY_REFUSED");
    return Object.freeze({ id: string(row.id, code) });
  }));
}
function catalogRows(kind, raw) {
  if (!Array.isArray(raw)) fail("SUPABASE_CATALOG_REFUSED");
  return Object.freeze(raw.map((row) => {
    object(row, "SUPABASE_CATALOG_REFUSED");
    if (kind === "database-webhook" && [row.schema_name,row.relation_name,row.object_name].every((v) => typeof v === "string")) return Object.freeze({ kind, id: `${row.schema_name}:${row.relation_name}:${row.object_name}` });
    if (kind === "pg-net" && [row.schema_name,row.object_name,row.target_name].every((v) => typeof v === "string")) return Object.freeze({ kind, id: `${row.schema_name}:${row.object_name}:${row.target_name}` });
    if (kind === "pg-cron" && typeof row.id === "string" && typeof row.schedule === "string" && typeof row.database === "string" && typeof row.active === "boolean") return Object.freeze({ kind, id: row.id });
    if (kind === "vault-reference" && typeof row.id === "string" && CAPABILITY_CLASSES.includes(row.name)) return Object.freeze({ kind, id: row.id, className: row.name });
    fail("SUPABASE_CATALOG_REFUSED");
  }));
}

async function runComposedProvider(provider, frame, trace, transport = realTransport) {
  const credential = string(frame.credential, "CHILD_AUTHORITY_REFUSED", MAX_LINE_BYTES), expected = object(frame.expected, "CHILD_AUTHORITY_REFUSED");
  if (provider === "vercel") {
    const teamId = string(expected.teamId, "VERCEL_AUTHORITY_REFUSED"), projectId = string(expected.projectId, "VERCEL_AUTHORITY_REFUSED"), scope = `teamId=${encodeURIComponent(teamId)}`, headers = { Authorization: `Bearer ${credential}` };
    const projectRaw = await readHttp("vercel", "project", { method:"GET", path:"/v9/projects/{project}" }, `https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}?${scope}`, { method:"GET", headers }, trace, transport);
    assertReadOnlyRequest("vercel", "crons", { method:"GET", path:"/v9/projects/{project}" }); const project = selectVercelProject(projectRaw, projectId, teamId);
    const deployments = await exhaustPages({ provider:"vercel", operation:"deployments", descriptor:{method:"GET",path:"/v6/deployments"}, firstUrl:`https://api.vercel.com/v6/deployments?${scope}&projectId=${encodeURIComponent(projectId)}&limit=100`, nextUrl:(c)=>`https://api.vercel.com/v6/deployments?${scope}&projectId=${encodeURIComponent(projectId)}&limit=100&until=${encodeURIComponent(c)}`, decode:(raw)=>deploymentPage(raw,projectId,teamId), options:{method:"GET",headers}, trace, transport });
    const env = await exhaustPages({ provider:"vercel", operation:"environment", descriptor:{method:"GET",path:"/v10/projects/{project}/env"}, firstUrl:`https://api.vercel.com/v10/projects/${encodeURIComponent(projectId)}/env?${scope}&decrypt=false`, nextUrl:(c)=>`https://api.vercel.com/v10/projects/${encodeURIComponent(projectId)}/env?${scope}&decrypt=false&next=${encodeURIComponent(c)}`, decode:(raw)=>decoders.vercelEnv(raw,{vercelProjectId:projectId}), options:{method:"GET",headers}, trace, transport });
    const aliases = await exhaustPages({ provider:"vercel", operation:"aliases", descriptor:{method:"GET",path:"/v4/aliases"}, firstUrl:`https://api.vercel.com/v4/aliases?${scope}&projectId=${encodeURIComponent(projectId)}&limit=100`, nextUrl:(c)=>`https://api.vercel.com/v4/aliases?${scope}&projectId=${encodeURIComponent(projectId)}&limit=100&until=${encodeURIComponent(c)}`, decode:(raw)=>aliasPage(raw,projectId), options:{method:"GET",headers}, trace, transport });
    const integrations = arrayRows(await readHttp("vercel","integrations",{method:"GET",path:"/v1/integrations/configurations"},`https://api.vercel.com/v1/integrations/configurations?${scope}`,{method:"GET",headers},trace,transport),"VERCEL_INTEGRATION_REFUSED",projectId,teamId);
    const webhooks = arrayRows(await readHttp("vercel","webhooks",{method:"GET",path:"/v1/webhooks"},`https://api.vercel.com/v1/webhooks?${scope}&projectId=${encodeURIComponent(projectId)}`,{method:"GET",headers},trace,transport),"VERCEL_WEBHOOK_REFUSED",projectId,teamId);
    return Object.freeze({ operations:REQUIRED_OPERATIONS.vercel, authorityBound:true, facts:Object.freeze({ classNames:Object.freeze(env.rows.map((row)=>row.name).filter((name)=>CAPABILITY_CLASSES.includes(name))), counts:Object.freeze({deployments:deployments.rows.length,aliases:aliases.rows.length,crons:project.crons.length,integrations:integrations.length,webhooks:webhooks.length}) }) });
  }
  if (provider === "supabase") {
    const ref=string(expected.projectRef,"SUPABASE_AUTHORITY_REFUSED"), headers={Authorization:`Bearer ${credential}`,"Content-Type":"application/json"};
    const project=await readHttp("supabase","project",{method:"GET",path:"/v1/projects/{ref}"},`https://api.supabase.com/v1/projects/${encodeURIComponent(ref)}`,{method:"GET",headers},trace,transport); if((project.id??project.ref)!==ref) fail("SUPABASE_AUTHORITY_REFUSED");
    const keys=decoders.supabaseKeys(await readHttp("supabase","keys",{method:"GET",path:"/v1/projects/{ref}/api-keys"},`https://api.supabase.com/v1/projects/${encodeURIComponent(ref)}/api-keys?reveal=false`,{method:"GET",headers},trace,transport),{supabaseProjectRef:ref});
    await readHttp("supabase","functions",{method:"GET",path:"/v1/projects/{ref}/functions"},`https://api.supabase.com/v1/projects/${encodeURIComponent(ref)}/functions`,{method:"GET",headers},trace,transport);
    const catalogs=[]; for(const item of SUPABASE_CATALOG_QUERIES){ const descriptor={method:"POST",path:"/v1/projects/{ref}/database/query/read-only",queries:[item.query]}; catalogs.push(...catalogRows(item.kind,await readHttp("supabase","catalog",descriptor,`https://api.supabase.com/v1/projects/${encodeURIComponent(ref)}/database/query/read-only`,{method:"POST",headers,body:JSON.stringify({query:item.query,parameters:[]})},trace,transport))); }
    return Object.freeze({ operations:REQUIRED_OPERATIONS.supabase,authorityBound:true,facts:Object.freeze({classNames:Object.freeze([...(keys.some((row)=>["secret","service_role"].includes(row.type))?["SUPABASE_SERVICE_ROLE_KEY"]:[]),...catalogs.map((row)=>row.className).filter(Boolean)])})});
  }
  if (provider === "resend") {
    assertReadOnlyRequest("resend", "identity", { method: "NATIVE" }); if(trace.requests>=MAX_REQUESTS) fail("REQUEST_CEILING_REFUSED"); trace.requests+=1; const who=transport.cli(); if(who.status!==0) fail("RESEND_TEAM_BINDING_UNAVAILABLE"); const whoBytes=Buffer.byteLength(typeof who.stdout === "string" ? who.stdout : JSON.stringify(who.stdout)); const resendBytes=(trace.bytes.get("resend")??0)+whoBytes; if(resendBytes>MAX_RESPONSE_BYTES) fail("RESPONSE_SIZE_REFUSED"); trace.bytes.set("resend",resendBytes); decoders.resendIdentity(assertBoundedResponse(who.stdout),{resendTeamId:expected.teamId});
    const headers={Authorization:`Bearer ${credential}`,"User-Agent":"precision-performance-036p/1.0"};
    const keys=await exhaustPages({provider:"resend",operation:"keys",descriptor:{method:"GET",path:"/api-keys"},firstUrl:"https://api.resend.com/api-keys?limit=100",nextUrl:(cursor)=>`https://api.resend.com/api-keys?limit=100&after=${encodeURIComponent(cursor)}`,decode:(raw)=>decoders.resendKeys(raw,{resendTeamId:expected.teamId}),options:{method:"GET",headers},trace,transport});
    const domains=await exhaustPages({provider:"resend",operation:"domains",descriptor:{method:"GET",path:"/domains"},firstUrl:"https://api.resend.com/domains?limit=100",nextUrl:(cursor)=>`https://api.resend.com/domains?limit=100&after=${encodeURIComponent(cursor)}`,decode:(raw)=>decoders.resendDomains(raw,{resendTeamId:expected.teamId}),options:{method:"GET",headers},trace,transport});
    return Object.freeze({operations:REQUIRED_OPERATIONS.resend,authorityBound:true,facts:Object.freeze({classNames:Object.freeze(keys.rows.length&&domains.rows.length?["PUBLIC_ENQUIRY_SMTP_PASS"]:[])})});
  }
  if(provider==="stripe") { const headers={Authorization:`Bearer ${credential}`}, exp={stripeAccountId:string(expected.accountId,"STRIPE_AUTHORITY_REFUSED"),stripeLiveMode:expected.liveMode===true}; decoders.stripeAccount(await readHttp("stripe","account",{method:"GET",path:"/v1/account"},"https://api.stripe.com/v1/account",{method:"GET",headers},trace,transport),exp); const hooks=await exhaustPages({provider:"stripe",operation:"webhooks",descriptor:{method:"GET",path:"/v1/webhook_endpoints"},firstUrl:"https://api.stripe.com/v1/webhook_endpoints?limit=100",nextUrl:(c)=>`https://api.stripe.com/v1/webhook_endpoints?limit=100&starting_after=${encodeURIComponent(c)}`,decode:(raw)=>decoders.stripeWebhooks(raw,exp),options:{method:"GET",headers},trace,transport}); return Object.freeze({operations:REQUIRED_OPERATIONS.stripe,authorityBound:true,facts:Object.freeze({classNames:Object.freeze(["STRIPE_SECRET_KEY",...(hooks.rows.length?["STRIPE_WEBHOOK_SECRET"]:[])])})}); }
  if(provider==="railway") { const tokenType=string(expected.tokenType,"RAILWAY_TOKEN_TYPE_REFUSED"),headers=railwayHeaders(tokenType,credential),query=tokenType==="project"?"query ProviderAuthority036P { projectToken { projectId environmentId } }":"query ProviderAuthority036P($workspaceId: String!) { me { id } workspace(workspaceId: $workspaceId) { id projects { edges { node { id } } } } }"; const raw=await readHttp("railway","graph",{method:"POST",url:"https://backboard.railway.com/graphql/v2"},"https://backboard.railway.com/graphql/v2",{method:"POST",headers,body:JSON.stringify({query,variables:tokenType==="project"?{}:{workspaceId:expected.workspaceId}})},trace,transport); decoders.railway(raw,{railwayTokenType:tokenType,railwayAccountId:expected.accountId,railwayWorkspaceId:expected.workspaceId,railwayProjectId:expected.projectId,railwayEnvironmentId:expected.environmentId}); return Object.freeze({operations:REQUIRED_OPERATIONS.railway,authorityBound:true,facts:Object.freeze({classNames:Object.freeze(["RAILWAY_API_TOKEN"])})}); }
  fail("PROVIDER_REFUSED");
}

async function runComposedProvider036R(provider, frame, trace, transport = realTransport) {
  if (provider !== "resend") return runComposedProvider(provider, frame, trace, transport);
  const credential = string(frame.credential, "CHILD_AUTHORITY_REFUSED", MAX_LINE_BYTES);
  validateResendFrame(object(frame.expected, "CHILD_AUTHORITY_REFUSED"));
  const headers = { Authorization: `Bearer ${credential}`, "User-Agent": "precision-performance-036r/1.0" };
  const domains = await exhaustPages({
    provider: "resend", operation: "domains", descriptor: { method: "GET", path: "/domains" },
    firstUrl: "https://api.resend.com/domains?limit=100",
    nextUrl: (cursor) => `https://api.resend.com/domains?limit=100&after=${encodeURIComponent(cursor)}`,
    decode: decodeDomainPage, options: { method: "GET", headers }, trace, transport,
  });
  const selected = selectExpectedDomain(domains.rows);
  const detailRaw = await readResendDomainDetail036R(`https://api.resend.com/domains/${encodeURIComponent(selected.id)}`, { method: "GET", headers }, trace, transport);
  const detail = decodeDomainDetail(detailRaw, selected);
  const tuples = buildProviderDnsTuples(detail.records);
  const dnsResult = await reconcilePublicDns(tuples, transport.dns, () => {
    trace.dnsReads += 1;
    if (trace.dnsReads > 5) fail("RESEND_DNS_CEILING_REFUSED");
  });
  const keys = await exhaustPages({
    provider: "resend", operation: "keys", descriptor: { method: "GET", path: "/api-keys" },
    firstUrl: "https://api.resend.com/api-keys?limit=100",
    nextUrl: (cursor) => `https://api.resend.com/api-keys?limit=100&after=${encodeURIComponent(cursor)}`,
    decode: decodeKeyPage, options: { method: "GET", headers }, trace, transport,
  });
  return Object.freeze({
    operations: REQUIRED_OPERATIONS_036R.resend,
    authorityBound: true,
    facts: Object.freeze({
      classNames: Object.freeze(["PUBLIC_ENQUIRY_SMTP_PASS"]),
      domainAlias: "resend-domain:precisionperformance.com.au",
      domains: domains.rows.length,
      keys: keys.rows.length,
      dnsMatched: dnsResult.matched,
      dnsTuples: dnsResult.tuples,
    }),
  });
}

export async function exerciseComposedProvider036RForTest(provider, frame, transport, seed = {}) {
  const trace = { requests: seed.requests ?? 0, dnsReads: seed.dnsReads ?? 0, operations: new Set(), bindings: new Set(), facts: new Map(), bytes: new Map() };
  try {
    const projection = await runComposedProvider036R(provider, frame, trace, transport);
    return Object.freeze({ projection, requests: trace.requests, dnsReads: trace.dnsReads, bytes: trace.bytes.get(provider) ?? 0 });
  } catch (error) {
    error.context = Object.freeze({ requests: trace.requests, dnsReads: trace.dnsReads });
    throw error;
  }
}

export async function exerciseComposedProviderForTest(provider, frame, transport, seed = {}) {
  const trace={requests:seed.requests??0,operations:new Set(),bindings:new Set(),facts:new Map(),bytes:new Map()};
  const projection=await runComposedProvider(provider,frame,trace,transport);
  return Object.freeze({projection,requests:trace.requests,bytes:trace.bytes.get(provider)??0});
}
function deriveLiveResult(trace, fallbackReason = null) {
  const graph = buildAcceptedSourceGraph();
  const providerClasses = new Map();
  for (const provider of PROVIDERS) providerClasses.set(provider, new Set(trace.facts.get(provider)?.classNames ?? []));
  const mechanisms = {
    SUPABASE_SERVICE_ROLE_KEY: ["modern-secret-key", ["vercel-environments"], "read-only-admin", "individual-disable", "old-key-auth-rejection", "legacy-coupling-refused"],
    CRON_SECRET: ["generated-secret", ["vercel-environments", "cron-routes"], "no-business-status", "deployment-retirement", "old-route-auth-rejection", "reconcile-route-blocks-without-oracle"],
    ENQUIRY_ABUSE_HMAC_SECRET: ["generated-secret", ["vercel-environments", "enquiry-consumers"], "deterministic-signature", "deployment-retirement", "old-deployment-incapability", "unknown-caller-blocks"],
    PUBLIC_ENQUIRY_SMTP_PASS: ["resend-sending-key", ["vercel-environments"], "smtp-verify-no-send", "delete-exact-key", "old-key-auth-rejection", "exact-team-required"],
    STRIPE_SECRET_KEY: ["stripe-restricted-key", ["vercel-environments"], "account-metadata", "expire-exact-key", "old-key-auth-rejection", "mode-bound"],
    STRIPE_WEBHOOK_SECRET: ["stripe-endpoint-roll", ["vercel-environments"], "endpoint-metadata", "roll-exact-endpoint", "non-business-oracle-required", "delivery-forbidden"],
    RAILWAY_API_TOKEN: ["railway-token", ["vercel-environments"], "project-metadata", "revoke-exact-token", "old-token-auth-rejection", "token-type-bound"],
  };
  const capabilityRows = validateCapabilityRows(graph.classes.map((row) => {
    const authority = CLASS_PROVIDER[row.class], names = providerClasses.get(authority) ?? new Set();
    const providerConsumers = names.has(row.class) ? 1 : 0;
    const reachability = !graph.complete ? "unknown-blocking" : (row.consumers.length > 0 || providerConsumers > 0) ? "required" : "not-reachable-proven";
    const [replacement, installTargets, readback, predecessorAction, predecessorOracle, coupling] = mechanisms[row.class];
    return { class: row.class, authority, sourceConsumers: row.consumers, sourceComplete: graph.complete, providerConsumers, paginationComplete: trace.bindings.has(authority), reachability, replacement, installTargets, readback, predecessorAction, predecessorOracle, coupling, manualUiRequired: ["resend", "stripe", "railway"].includes(authority), laterMutation: reachability === "unknown-blocking" ? "blocked" : "executable" };
  }));
  const authorityRows = Object.freeze(PROVIDERS.map((provider) => {
    const completed = REQUIRED_OPERATIONS[provider].filter((operation) => trace.operations.has(`${provider}:${operation}`));
    const exactBinding = trace.bindings.has(provider);
    return Object.freeze({ provider, status: exactBinding ? "complete-read" : completed.length ? "blocked-incomplete" : "not-read", exactBinding, paginationComplete: exactBinding && completed.length === REQUIRED_OPERATIONS[provider].length, evidence: `${completed.length}/${REQUIRED_OPERATIONS[provider].length}-operations` });
  }));
  const operationsComplete = Object.entries(REQUIRED_OPERATIONS).every(([provider, operations]) => operations.every((operation) => trace.operations.has(`${provider}:${operation}`)));
  const rowsResolved = capabilityRows.every((row) => row.reachability !== "unknown-blocking");
  const complete = operationsComplete && trace.bindings.size === PROVIDERS.length && graph.complete && rowsResolved && !fallbackReason;
  const result = Object.freeze({
    outcome: complete ? OUTCOMES[0] : OUTCOMES[1], complete,
    reason: complete ? null : fallbackReason ?? "INCOMPLETE_AUTHORITY_TRACE",
    authorities: trace.bindings.size, authorityRows, rows: capabilityRows.length, capabilityRows, providerReads: trace.requests,
    writes: 0, mutations: 0, residue: 0,
  });
  LIVE_RESULT_BRAND.add(result);
  return result;
}

async function protectedChild() {
  const iterator = readLines();
  const first = await iterator.next();
  if (first.done) fail("CHILD_EOF_REFUSED");
  if (first.value?.mode === "capability") {
    process.stdout.write(JSON.stringify({ state: OUTCOMES[1], complete: false, reason: "PROTECTED_AUTHORITY_REQUIRED", providerReads: 0, writes: 0, mutations: 0, residue: 0 }) + "\n"); return;
  }
  if (first.value?.mode !== "protected-read" || first.value.id !== 1) fail("CHILD_MODE_REFUSED");
  const trace = { requests: 0, operations: new Set(), bindings: new Set(), facts: new Map(), bytes: new Map() };
  for (let index = 0; index < PROVIDERS.length; index += 1) {
    const provider = PROVIDERS[index];
    process.stdout.write(JSON.stringify({ id: index + 1, state: "need-authority", provider }) + "\n");
    const next = await iterator.next(), frame = next.value;
    if (next.done || frame?.id !== index + 1 || frame?.provider !== provider || frame?.type !== "authority") fail("CHILD_PROTOCOL_REFUSED");
    try {
      const projection = await runComposedProvider(provider, frame, trace);
      projection.operations.forEach((operation) => trace.operations.add(`${provider}:${operation}`));
      if (projection.authorityBound) trace.bindings.add(provider);
      trace.facts.set(provider, projection.facts ?? {});
      process.stdout.write(JSON.stringify({ id: index + 1, state: "provider-complete", provider, requests: trace.requests, operations: projection.operations.length }) + "\n");
    } catch (error) {
      const reason = error instanceof Reader036PError ? error.code : "PROVIDER_READ_FAILED";
      process.stdout.write(JSON.stringify({ id: 6, state: "final", ...deriveLiveResult(trace, reason) }) + "\n"); return;
    } finally {
      frame.credential = null; frame.expected = null;
    }
  }
  process.stdout.write(JSON.stringify({ id: 6, state: "final", ...deriveLiveResult(trace) }) + "\n");
}
function deriveLiveResult036R(trace, fallbackReason = null) {
  const graph = buildAcceptedSourceGraph();
  const providerClasses = new Map(PROVIDERS.map((provider) => [provider, new Set(trace.facts.get(provider)?.classNames ?? [])]));
  const mechanisms = {
    SUPABASE_SERVICE_ROLE_KEY: ["modern-secret-key", ["vercel-environments"], "read-only-admin", "individual-disable", "old-key-auth-rejection", "legacy-coupling-refused"],
    CRON_SECRET: ["generated-secret", ["vercel-environments", "cron-routes"], "no-business-status", "deployment-retirement", "old-route-auth-rejection", "reconcile-route-blocks-without-oracle"],
    ENQUIRY_ABUSE_HMAC_SECRET: ["generated-secret", ["vercel-environments", "enquiry-consumers"], "deterministic-signature", "deployment-retirement", "old-deployment-incapability", "unknown-caller-blocks"],
    PUBLIC_ENQUIRY_SMTP_PASS: ["resend-sending-key", ["vercel-environments"], "smtp-verify-no-send", "delete-exact-key", "old-key-auth-rejection", "domain-bound-authority-required"],
    STRIPE_SECRET_KEY: ["stripe-restricted-key", ["vercel-environments"], "account-metadata", "expire-exact-key", "old-key-auth-rejection", "mode-bound"],
    STRIPE_WEBHOOK_SECRET: ["stripe-endpoint-roll", ["vercel-environments"], "endpoint-metadata", "roll-exact-endpoint", "non-business-oracle-required", "delivery-forbidden"],
    RAILWAY_API_TOKEN: ["railway-token", ["vercel-environments"], "project-metadata", "revoke-exact-token", "old-token-auth-rejection", "token-type-bound"],
  };
  const capabilityRows = validateCapabilityRows(graph.classes.map((row) => {
    const authority = CLASS_PROVIDER[row.class], names = providerClasses.get(authority) ?? new Set();
    const providerConsumers = names.has(row.class) ? 1 : 0;
    const reachability = !graph.complete ? "unknown-blocking" : (row.consumers.length > 0 || providerConsumers > 0) ? "required" : "not-reachable-proven";
    const [replacement, installTargets, readback, predecessorAction, predecessorOracle, coupling] = mechanisms[row.class];
    return { class: row.class, authority, sourceConsumers: row.consumers, sourceComplete: graph.complete, providerConsumers, paginationComplete: trace.bindings.has(authority), reachability, replacement, installTargets, readback, predecessorAction, predecessorOracle, coupling, manualUiRequired: ["resend", "stripe", "railway"].includes(authority), laterMutation: reachability === "unknown-blocking" ? "blocked" : "executable" };
  }));
  const authorityRows = Object.freeze(PROVIDERS.map((provider) => {
    const required = REQUIRED_OPERATIONS_036R[provider], completed = required.filter((operation) => trace.operations.has(`${provider}:${operation}`));
    const exactBinding = trace.bindings.has(provider);
    const extra = provider === "resend" && exactBinding ? ";domain-bound-dns-exact" : "";
    return Object.freeze({ provider, status: exactBinding ? "complete-read" : completed.length ? "blocked-incomplete" : "not-read", exactBinding, paginationComplete: exactBinding && completed.length === required.length, evidence: `${completed.length}/${required.length}-operations${extra}` });
  }));
  const operationsComplete = Object.entries(REQUIRED_OPERATIONS_036R).every(([provider, operations]) => operations.every((operation) => trace.operations.has(`${provider}:${operation}`)));
  const rowsResolved = capabilityRows.every((row) => row.reachability !== "unknown-blocking");
  const complete = operationsComplete && trace.bindings.size === PROVIDERS.length && graph.complete && rowsResolved && trace.requests >= 19 && trace.requests <= 24 && trace.dnsReads >= 1 && trace.dnsReads <= 5 && !fallbackReason;
  const result = Object.freeze({
    outcome: complete ? OUTCOMES_036R[0] : OUTCOMES_036R[1], complete,
    reason: complete ? null : fallbackReason ?? "INCOMPLETE_AUTHORITY_TRACE",
    authorities: trace.bindings.size, authorityRows, rows: capabilityRows.length, capabilityRows,
    providerReads: trace.requests, dnsReads: trace.dnsReads, writes: 0, mutations: 0, businessEffects: 0, residue: 0,
  });
  LIVE_RESULT_BRAND.add(result);
  return result;
}

async function protectedChild036R() {
  const iterator = readLines();
  const first = await iterator.next();
  if (first.done || first.value?.mode !== "protected-read" || first.value.id !== 1) fail("CHILD_MODE_REFUSED");
  const trace = { requests: 0, dnsReads: 0, operations: new Set(), bindings: new Set(), facts: new Map(), bytes: new Map() };
  for (let index = 0; index < PROVIDERS.length; index += 1) {
    const provider = PROVIDERS[index];
    process.stdout.write(JSON.stringify({ id: index + 1, state: "need-authority", provider }) + "\n");
    const next = await iterator.next(), frame = next.value;
    if (next.done || frame?.id !== index + 1 || frame?.provider !== provider || frame?.type !== "authority") fail("CHILD_PROTOCOL_REFUSED");
    try {
      const projection = await runComposedProvider036R(provider, frame, trace);
      projection.operations.forEach((operation) => trace.operations.add(`${provider}:${operation}`));
      if (projection.authorityBound) trace.bindings.add(provider);
      trace.facts.set(provider, projection.facts ?? {});
      process.stdout.write(JSON.stringify({ id: index + 1, state: "provider-complete", provider, requests: trace.requests, dnsReads: trace.dnsReads, operations: projection.operations.length }) + "\n");
    } catch (error) {
      const reason = error instanceof Reader036PError || error?.name === "Domain036RError" ? error.code : "PROVIDER_READ_FAILED";
      process.stdout.write(JSON.stringify({ id: 6, state: "final", ...deriveLiveResult036R(trace, reason) }) + "\n"); return;
    } finally {
      frame.credential = null; frame.expected = null;
    }
  }
  process.stdout.write(JSON.stringify({ id: 6, state: "final", ...deriveLiveResult036R(trace) }) + "\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2] === "--protected-child-036r") {
  protectedChild036R().catch(() => { process.stderr.write("SANITIZED_CHILD_FAILURE\n"); process.exitCode = 1; });
} else if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href && process.argv[2] === "--protected-child") {
  protectedChild().catch(() => { process.stderr.write("SANITIZED_CHILD_FAILURE\n"); process.exitCode = 1; });
}
