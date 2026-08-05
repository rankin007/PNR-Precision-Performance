import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  BINDING_NAMES,
  CANONICAL_ORIGIN,
  FIXTURE,
  PROJECT_ORIGIN,
  PROHIBITED_ORIGIN,
  assertExcludedUnchanged,
  assertNoProtectedChildOutput,
  assertSafeResult,
  buildBindingReplacementPlan,
  classifyAuthPopulation,
  classifyBindingSet,
  createBindingProcessAdapter,
  emailDigest,
  expectedRowsForLedger,
  normalizeEmail,
  parseApprovedApiKeyJson,
  parseCli,
  planOwnedGraphReconcile,
  proveSessionJourney,
  repairProductionBindings,
  reconcileOwnedGraph,
  sanitizeFailure,
  validateConfig,
  validateLedger,
  validateMiddlewareContractSources,
  validateTargetUrl,
  verifyOwnedGraph,
  restoreProductionBindings,
} from "./autonomous-trainer-access-036J.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const throwsCode = async (operation, code) => {
  assertions += 1;
  await assert.rejects(async () => operation(), (error) => error?.code === code);
};

const ids = {
  access: "10000000-0000-4000-8000-000000000001",
  appUser: "10000000-0000-4000-8000-000000000002",
  assignment: "10000000-0000-4000-8000-000000000003",
  auth: "10000000-0000-4000-8000-000000000004",
  horse: "10000000-0000-4000-8000-000000000005",
  membership: "10000000-0000-4000-8000-000000000006",
  profile: "10000000-0000-4000-8000-000000000007",
  stable: "10000000-0000-4000-8000-000000000008",
  trainer: "10000000-0000-4000-8000-000000000009",
};
const email = "retained.trainer@example.test";
const ledger = {
  project: "uvskssaecdhxcgytkasc",
  run: "035K-ABCDEF123456",
  state: "retained",
  authOwnership: "adopted",
  emailHash: emailDigest(email),
  wrongHorseId: "20000000-0000-4000-8000-000000000001",
  contracts: {
    membershipLevelId: "30000000-0000-4000-8000-000000000001",
    permissionId: "30000000-0000-4000-8000-000000000002",
  },
  ids,
};

function jwt(payload) {
  const head = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${head}.${body}.signature`;
}

function validEnv(overrides = {}) {
  return {
    NEXT_PUBLIC_SUPABASE_URL: PROJECT_ORIGIN,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "opaque-anon-key",
    SUPABASE_SERVICE_ROLE_KEY: "opaque-service-key",
    ...overrides,
  };
}

function approvedBindings() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: PROJECT_ORIGIN,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt({ ref: ledger.project, role: "anon" }),
    SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: ledger.project, role: "service_role" }),
  };
}

function prohibitedBindings() {
  return {
    NEXT_PUBLIC_SUPABASE_URL: `${PROHIBITED_ORIGIN}/`,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt({ ref: "tagnbgkroihagjmvehlx", role: "anon" }),
    SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: "tagnbgkroihagjmvehlx", role: "service_role" }),
  };
}

function createBindingProcessRunner({ keyJson, initialProduction }) {
  const injectedProduction = structuredClone(initialProduction);
  const calls = [];
  return {
    calls,
    injectedProduction,
    async runChild({ args, input = null, protectedValues = [] }) {
      if (args.includes("api-keys")) {
        calls.push({ operation: "api-keys" });
        return { code: 0, stdout: keyJson, stderr: "" };
      }
      const envIndex = args.indexOf("env");
      const operation = envIndex >= 0 ? args[envIndex + 1] : null;
      if (operation === "add") {
        const name = args[envIndex + 2];
        const environment = args[envIndex + 3];
        const sensitive = args.includes("--sensitive");
        const viaStdin = typeof input === "string" && input.length > 0;
        const argumentsContainValue = protectedValues.some((value) => args.includes(value));
        calls.push({ operation, name, environment, sensitive, viaStdin, argumentsContainValue, force: args.includes("--force"), yes: args.includes("--yes") });
        if (!BINDING_NAMES.includes(name) || environment !== "production" || !viaStdin) return { code: 1, stdout: "", stderr: "" };
        if (!sensitive) injectedProduction[name] = input;
        return { code: 0, stdout: "", stderr: "" };
      }
      if (operation === "run") {
        calls.push({ operation, environment: args[envIndex + 3], bindingStatus: args.at(-1) === "binding-status" });
        const projection = classifyBindingSet(injectedProduction);
        return { code: 0, stdout: `${JSON.stringify({ state: "binding-status", mode: "binding-status", ...projection })}\n`, stderr: "" };
      }
      return { code: 1, stdout: "", stderr: "" };
    },
  };
}

class FakeBindingAdapter {
  constructor({ failWriteCalls = [], statusClasses = [] } = {}) {
    this.current = structuredClone(prohibitedBindings());
    this.approved = structuredClone(approvedBindings());
    this.failWriteCalls = new Set(failWriteCalls);
    this.statusClasses = [...statusClasses];
    this.writeCalls = [];
    this.apiReads = 0;
  }
  async readApprovedKeys() { this.apiReads += 1; return structuredClone(this.approved); }
  async writeProductionBinding(name, value) {
    const call = this.writeCalls.length + 1;
    this.writeCalls.push({ name, value, viaStdin: true, argumentsContainValue: false });
    if (this.failWriteCalls.has(call)) throw Object.assign(new Error("BINDING_WRITE_FAILED"), { code: "BINDING_WRITE_FAILED" });
    this.current[name] = value;
    return { ok: true };
  }
  async readProductionStatus() {
    return { bindingClass: this.statusClasses.length ? this.statusClasses.shift() : classifyBindingSet(this.current).bindingClass };
  }
}

class FakeAdapter {
  constructor({ rows = expectedRowsForLedger(ledger, email), authUsers = null, permissionLinks = 1 } = {}) {
    this.rows = new Map();
    for (const [table, row] of Object.entries(rows)) this.table(table).set(row.id, structuredClone(row));
    this.authUsers = structuredClone(authUsers ?? [
      { id: "40000000-0000-4000-8000-000000000001", email: "excluded.one@example.test", role: "authenticated", updated_at: "2026-01-01" },
      { id: ids.auth, email, role: "authenticated", updated_at: "2026-01-01" },
      { id: "40000000-0000-4000-8000-000000000002", email: "excluded.two@example.test", role: "authenticated", updated_at: "2026-01-01" },
    ]);
    this.permissionLinks = permissionLinks;
    this.storageCalls = 0;
    this.inserted = [];
    this.updated = [];
  }
  table(name) {
    if (!this.rows.has(name)) this.rows.set(name, new Map());
    return this.rows.get(name);
  }
  async listAuthUsers() { return structuredClone(this.authUsers); }
  async getAuthById(id) { return structuredClone(this.authUsers.find((user) => user.id === id) ?? null); }
  async getTrainerContract() {
    return { membershipLevelId: ledger.contracts.membershipLevelId, permissionId: ledger.contracts.permissionId, permissionLinks: this.permissionLinks };
  }
  async readRowById(table, id) { return structuredClone(this.table(table).get(id) ?? null); }
  async findRows(table, fields) {
    return [...this.table(table).values()].filter((row) => Object.entries(fields).every(([key, value]) => row[key] === value)).map((row) => ({ id: row.id }));
  }
  async insertOwnedRow(table, values) { this.inserted.push(table); this.table(table).set(values.id, structuredClone(values)); }
  async updateOwnedRow(table, id, values) { this.updated.push(table); this.table(table).set(id, structuredClone(values)); }
  async countRowById(table, id) { return this.table(table).has(id) ? 1 : 0; }
}

function makeSessionAdapter({ identity = true, cookie = true, cleared = true, retainedCookie = false } = {}) {
  return {
    async establish() {
      return { userIdMatches: identity, cookieHeader: cookie ? "sb-session=private-cookie" : "", cookieCount: cookie ? 1 : 0 };
    },
    async signOut() { return { cleared, cookieHeader: retainedCookie || !cleared ? "sb-session=private-cookie" : "" }; },
    clear() {},
  };
}

function makeHttpAdapter({
  portal = true,
  horse = true,
  workflow = true,
  wrongGranted = false,
  wrongRequestIdInTransport = false,
  wrongHorseNameLeak = false,
  wrongStableNameLeak = false,
  wrongStatusLeak = false,
  wrongCountLeak = false,
  wrongRecordLeak = false,
  signedOutDenied = true,
  freshAnonymousDenied = true,
} = {}) {
  let anonymousPortalRequests = 0;
  return {
    async get(url, cookieHeader) {
      const parsed = new URL(url);
      if (!cookieHeader && parsed.pathname === "/portal") {
        anonymousPortalRequests += 1;
        const denied = anonymousPortalRequests === 1 ? signedOutDenied : freshAnonymousDenied;
        return denied
          ? { status: 307, location: "/sign-in?next=%2Fportal", body: "" }
          : { status: 200, location: null, body: "Trainer dashboard" };
      }
      if (parsed.pathname === "/portal") {
        return { status: 200, location: null, body: portal ? `Trainer dashboard ${FIXTURE.stableName} ${FIXTURE.horseName}` : "Member Portal" };
      }
      if (parsed.pathname === `/portal/horses/${ids.horse}`) {
        return { status: 200, location: null, body: horse ? `Horse Detail ${FIXTURE.horseName}` : "Horse not available" };
      }
      if (parsed.pathname === "/data-entry") {
        return { status: 200, location: null, body: workflow ? "Daily record submission" : "Access denied" };
      }
      if (parsed.pathname.startsWith("/portal/horses/")) {
        const requestedId = parsed.pathname.slice("/portal/horses/".length);
        if (requestedId !== ledger.wrongHorseId) throw new Error("unproven wrong-horse test id");
        if (wrongGranted) return { status: 200, location: null, body: "Horse Detail Unauthorized horse workspace" };
        const transportState = wrongRequestIdInTransport ? ` <script data-route-state="${requestedId}"></script>` : "";
        const horseNameState = wrongHorseNameLeak ? ` ${FIXTURE.horseName}` : "";
        const stableNameState = wrongStableNameLeak ? ` ${FIXTURE.stableName}` : "";
        const statusState = wrongStatusLeak ? " Status: active" : "";
        const countState = wrongCountLeak ? " Count: 1" : "";
        const recordState = wrongRecordLeak ? " Latest result: protected" : "";
        return { status: 200, location: null, body: `Horse not available${transportState}${horseNameState}${stableNameState}${statusState}${countState}${recordState}` };
      }
      throw new Error("unexpected test route");
    },
  };
}

// Configuration, target and retained-ledger contract: 14 assertions.
equal(validateTargetUrl(PROJECT_ORIGIN), PROJECT_ORIGIN);
await throwsCode(() => validateTargetUrl("https://tagnbgkroihagjmvehlx.supabase.co"), "PROHIBITED_TARGET_REFUSED");
await throwsCode(() => validateTargetUrl("http://uvskssaecdhxcgytkasc.supabase.co"), "TARGET_REFUSED");
await throwsCode(() => validateTargetUrl(`${PROJECT_ORIGIN}/?leak=1`), "TARGET_REFUSED");
equal(validateConfig(validEnv()).url, PROJECT_ORIGIN);
await throwsCode(() => validateConfig(validEnv({ NEXT_PUBLIC_SUPABASE_URL: "" })), "PROTECTED_CONFIG_MISSING");
await throwsCode(() => validateConfig(validEnv({ NEXT_PUBLIC_SUPABASE_ANON_KEY: "" })), "PROTECTED_CONFIG_MISSING");
await throwsCode(() => validateConfig(validEnv({ SUPABASE_SERVICE_ROLE_KEY: "" })), "PROTECTED_CONFIG_MISSING");
await throwsCode(() => validateConfig(validEnv({ SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: "wrongproject", role: "service_role" }) })), "KEY_PROJECT_REFUSED");
await throwsCode(() => validateConfig(validEnv({ SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: ledger.project, role: "anon" }) })), "KEY_ROLE_REFUSED");
equal(validateConfig(validEnv({ NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt({ ref: ledger.project, role: "anon" }), SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: ledger.project, role: "service_role" }) })).url, PROJECT_ORIGIN);
equal(validateLedger(ledger).state, "retained");
await throwsCode(() => validateLedger({ ...ledger, authOwnership: "created" }), "OWNERSHIP_LEDGER_INVALID");
await throwsCode(() => validateLedger({ ...ledger, contracts: { ...ledger.contracts, permissionId: "bad" } }), "OWNERSHIP_LEDGER_INVALID");

// Exact identity selection and excluded preservation: 12 assertions.
equal(normalizeEmail(" Retained.Trainer@Example.Test "), email);
equal(emailDigest(" Retained.Trainer@Example.Test "), ledger.emailHash);
const population = new FakeAdapter().authUsers;
const classified = classifyAuthPopulation(population, ledger);
equal(classified.identityCount, 3);
equal(classified.authoritativeCount, 1);
equal(classified.excludedCount, 2);
equal(classified.authoritative.id, ids.auth);
equal(classifyAuthPopulation([...population].reverse(), ledger).authoritative.id, ids.auth);
await throwsCode(() => classifyAuthPopulation(population.filter((user) => user.id !== ids.auth), ledger), "AUTHORITATIVE_IDENTITY_MISSING");
await throwsCode(() => classifyAuthPopulation(population.map((user) => user.id === ids.auth ? { ...user, email: "wrong@example.test" } : user), ledger), "AUTHORITATIVE_IDENTITY_MISMATCH");
await throwsCode(() => classifyAuthPopulation([...population, { id: "40000000-0000-4000-8000-000000000003", email }], ledger), "AUTHORITATIVE_IDENTITY_AMBIGUOUS");
check(assertExcludedUnchanged(classified.excludedFingerprints, classifyAuthPopulation(structuredClone(population), ledger).excludedFingerprints));
await throwsCode(() => {
  const changed = structuredClone(population);
  changed[0].updated_at = "2026-02-02";
  return assertExcludedUnchanged(classified.excludedFingerprints, classifyAuthPopulation(changed, ledger).excludedFingerprints);
}, "EXCLUDED_IDENTITY_CHANGED");

// Exact-owned graph, repair boundaries and red controls: 20 assertions.
const exactAdapter = new FakeAdapter();
const exactPlan = await planOwnedGraphReconcile(exactAdapter, ledger, email);
equal(exactPlan.length, 8);
equal(exactPlan.filter((action) => action.type === "unchanged").length, 8);
const exactGraph = await verifyOwnedGraph(exactAdapter, ledger, email);
equal(exactGraph.application, 8);
equal(exactGraph.auth, 1);
equal(exactGraph.storage, 0);
equal(exactGraph.wrongHorse, 0);
check(exactGraph.activeUser && exactGraph.activeProfile && exactGraph.activeTrainerMembership);
check(exactGraph.horseRecordsWrite);
const missingAdapter = new FakeAdapter();
missingAdapter.table("member_profiles").delete(ids.profile);
equal((await planOwnedGraphReconcile(missingAdapter, ledger, email)).filter((action) => action.type === "insert").length, 1);
equal((await reconcileOwnedGraph(missingAdapter, ledger, email)).inserted, 1);
check(missingAdapter.table("member_profiles").has(ids.profile));
const driftAdapter = new FakeAdapter();
driftAdapter.table("users").get(ids.appUser).status = "inactive";
equal((await planOwnedGraphReconcile(driftAdapter, ledger, email)).filter((action) => action.type === "update").length, 1);
equal((await reconcileOwnedGraph(driftAdapter, ledger, email)).updated, 1);
equal(driftAdapter.table("users").get(ids.appUser).status, "active");
const relationshipAdapter = new FakeAdapter();
relationshipAdapter.table("users").get(ids.appUser).auth_user_id = "50000000-0000-4000-8000-000000000001";
await throwsCode(() => planOwnedGraphReconcile(relationshipAdapter, ledger, email), "OWNED_ROW_RELATIONSHIP_CONFLICT");
const collisionAdapter = new FakeAdapter();
collisionAdapter.table("users").set("50000000-0000-4000-8000-000000000002", { ...collisionAdapter.table("users").get(ids.appUser), id: "50000000-0000-4000-8000-000000000002" });
await throwsCode(() => planOwnedGraphReconcile(collisionAdapter, ledger, email), "OWNED_ROW_COLLISION");
const inactiveAdapter = new FakeAdapter();
inactiveAdapter.table("user_membership_levels").get(ids.membership).ends_at = "2020-01-01T00:00:00Z";
equal((await planOwnedGraphReconcile(inactiveAdapter, ledger, email)).filter((action) => action.type === "update").length, 1);
equal((await reconcileOwnedGraph(inactiveAdapter, ledger, email)).activeTrainerMembership, true);
const wrongHorseAdapter = new FakeAdapter();
wrongHorseAdapter.table("horses").set(ledger.wrongHorseId, { id: ledger.wrongHorseId });
await throwsCode(() => verifyOwnedGraph(wrongHorseAdapter, ledger, email), "WRONG_HORSE_CONTRACT_REFUSED");
await throwsCode(() => verifyOwnedGraph(new FakeAdapter({ permissionLinks: 0 }), ledger, email), "TRAINER_PERMISSION_CONTRACT_REFUSED");

// Session, rendered routes and negative paths: 20 assertions.
const journey = await proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter(), ledger, email, origin: CANONICAL_ORIGIN });
check(journey.session);
check(journey.cookiesInMemory);
check(journey.portal);
check(journey.horseWorkspace);
check(journey.workflowPermission);
check(journey.wrongHorseDenied);
check(journey.signOut);
check(journey.anonymousDenied);
check(!JSON.stringify(journey).includes(email));
check(!JSON.stringify(journey).includes("private-cookie"));
const transportEchoJourney = await proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongRequestIdInTransport: true }), ledger, email, origin: CANONICAL_ORIGIN });
check(transportEchoJourney.wrongHorseDenied);
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter({ identity: false }), httpAdapter: makeHttpAdapter(), ledger, email, origin: CANONICAL_ORIGIN }), "SESSION_IDENTITY_MISMATCH");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter({ cookie: false }), httpAdapter: makeHttpAdapter(), ledger, email, origin: CANONICAL_ORIGIN }), "SESSION_COOKIE_MISSING");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ portal: false }), ledger, email, origin: CANONICAL_ORIGIN }), "PORTAL_PROOF_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ horse: false }), ledger, email, origin: CANONICAL_ORIGIN }), "HORSE_WORKSPACE_PROOF_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ workflow: false }), ledger, email, origin: CANONICAL_ORIGIN }), "WORKFLOW_PERMISSION_PROOF_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongGranted: true }), ledger, email, origin: CANONICAL_ORIGIN }), "WRONG_HORSE_DENIAL_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongHorseNameLeak: true }), ledger, email, origin: CANONICAL_ORIGIN }), "WRONG_HORSE_DENIAL_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongStableNameLeak: true }), ledger, email, origin: CANONICAL_ORIGIN }), "WRONG_HORSE_DENIAL_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongStatusLeak: true }), ledger, email, origin: CANONICAL_ORIGIN }), "WRONG_HORSE_DENIAL_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongCountLeak: true }), ledger, email, origin: CANONICAL_ORIGIN }), "WRONG_HORSE_DENIAL_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ wrongRecordLeak: true }), ledger, email, origin: CANONICAL_ORIGIN }), "WRONG_HORSE_DENIAL_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter({ retainedCookie: true }), httpAdapter: makeHttpAdapter(), ledger, email, origin: CANONICAL_ORIGIN }), "SIGN_OUT_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ signedOutDenied: false }), ledger, email, origin: CANONICAL_ORIGIN }), "SIGN_OUT_FAILED");
await throwsCode(() => proveSessionJourney({ sessionAdapter: makeSessionAdapter(), httpAdapter: makeHttpAdapter({ freshAnonymousDenied: false }), ledger, email, origin: CANONICAL_ORIGIN }), "ANONYMOUS_DENIAL_FAILED");

// Middleware, noninteractive operation and disclosure controls: 16 assertions.
const harnessSource = readFileSync("scripts/autonomous-trainer-access-036J.mjs", "utf8");
const rootMiddlewareSource = readFileSync("middleware.ts", "utf8");
const helperMiddlewareSource = readFileSync("lib/supabase/middleware.ts", "utf8");
equal(sanitizeFailure(Object.assign(new Error("ignored"), { code: "MODE_REFUSED" })), "MODE_REFUSED");
equal(sanitizeFailure(new Error("private provider response")), "UNEXPECTED");
check(validateMiddlewareContractSources(rootMiddlewareSource, helperMiddlewareSource));
await throwsCode(() => validateMiddlewareContractSources(rootMiddlewareSource.replace("await updateSupabaseSession(request)", "await missing(request)"), helperMiddlewareSource), "MIDDLEWARE_CONTRACT_FAILED");
await throwsCode(() => validateMiddlewareContractSources(rootMiddlewareSource.replace("_next/static", "static"), helperMiddlewareSource), "MIDDLEWARE_CONTRACT_FAILED");
await throwsCode(() => validateMiddlewareContractSources(rootMiddlewareSource, helperMiddlewareSource.replace("request.cookies.set", "request.cookies.missing")), "MIDDLEWARE_CONTRACT_FAILED");
await throwsCode(() => validateMiddlewareContractSources(rootMiddlewareSource, helperMiddlewareSource.replace("response.cookies.set", "response.cookies.missing")), "MIDDLEWARE_CONTRACT_FAILED");
await throwsCode(() => validateMiddlewareContractSources(rootMiddlewareSource, helperMiddlewareSource.replace("private, no-store", "public")), "MIDDLEWARE_CONTRACT_FAILED");
await throwsCode(() => validateMiddlewareContractSources(rootMiddlewareSource, helperMiddlewareSource.replace("catch", "handled")), "MIDDLEWARE_CONTRACT_FAILED");
await throwsCode(() => validateMiddlewareContractSources(`${rootMiddlewareSource}\nrequirePortalAppContext()`, helperMiddlewareSource), "MIDDLEWARE_CONTRACT_FAILED");
check(!harnessSource.includes("console.log"));
check(!harnessSource.includes("console.error"));
check(!harnessSource.includes("Read-Host"));
check(!harnessSource.includes("PP035K_SERVICE_ROLE_KEY"));
check(harnessSource.includes("admin.auth.admin.generateLink"));
check(harnessSource.includes("supabase.auth.verifyOtp"));

// Three-binding classification: 12 added assertions.
const approvedSet = approvedBindings();
const prohibitedSet = prohibitedBindings();
equal(classifyBindingSet(approvedSet).bindingClass, "approved");
equal(classifyBindingSet(prohibitedSet).bindingClass, "prohibited");
equal(classifyBindingSet({ ...prohibitedSet, NEXT_PUBLIC_SUPABASE_URL: "" }).bindingClass, "incomplete");
equal(classifyBindingSet({ ...prohibitedSet, NEXT_PUBLIC_SUPABASE_ANON_KEY: "" }).bindingClass, "incomplete");
equal(classifyBindingSet({ ...prohibitedSet, SUPABASE_SERVICE_ROLE_KEY: "" }).bindingClass, "incomplete");
equal(classifyBindingSet({ ...prohibitedSet, NEXT_PUBLIC_SUPABASE_URL: PROJECT_ORIGIN }).bindingClass, "refused");
check([
  "http://uvskssaecdhxcgytkasc.supabase.co/",
  `${PROJECT_ORIGIN}/not-root`,
  `${PROJECT_ORIGIN}/?query=1`,
  `${PROJECT_ORIGIN}/#fragment`,
  "https://example.invalid/",
  "not-a-url",
].every((value) => classifyBindingSet({ ...approvedSet, NEXT_PUBLIC_SUPABASE_URL: value }).bindingClass === "refused"));
equal(classifyBindingSet({ ...approvedSet, NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt({ ref: ledger.project, role: "service_role" }) }).bindingClass, "refused");
equal(classifyBindingSet({ ...approvedSet, SUPABASE_SERVICE_ROLE_KEY: jwt({ ref: ledger.project, role: "anon" }) }).bindingClass, "refused");
equal(classifyBindingSet(prohibitedSet).bindingCount, 3);
check(classifyBindingSet(prohibitedSet).rolesValid);
equal(assertSafeResult(classifyBindingSet(prohibitedSet)).bindingClass, "prohibited");

// Captured API-key JSON and exact named selection: 10 added assertions.
const apiKeyJson = JSON.stringify([
  { name: "anon", api_key: approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  { name: "service_role", api_key: approvedSet.SUPABASE_SERVICE_ROLE_KEY },
  { name: "publishable", api_key: "ignored-public-entry" },
]);
const parsedKeys = parseApprovedApiKeyJson(apiKeyJson);
equal(parsedKeys.NEXT_PUBLIC_SUPABASE_ANON_KEY, approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY);
equal(parsedKeys.SUPABASE_SERVICE_ROLE_KEY, approvedSet.SUPABASE_SERVICE_ROLE_KEY);
equal(parsedKeys.NEXT_PUBLIC_SUPABASE_URL, PROJECT_ORIGIN);
await throwsCode(() => parseApprovedApiKeyJson(JSON.stringify([
  { name: "anon", api_key: approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  { name: "anon", api_key: approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  { name: "service_role", api_key: approvedSet.SUPABASE_SERVICE_ROLE_KEY },
])), "API_KEY_SELECTION_REFUSED");
await throwsCode(() => parseApprovedApiKeyJson(JSON.stringify([{ name: "anon", api_key: approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY }])), "API_KEY_SELECTION_REFUSED");
await throwsCode(() => parseApprovedApiKeyJson(JSON.stringify([
  { name: "anon", api_key: jwt({ ref: ledger.project, role: "service_role" }) },
  { name: "service_role", api_key: approvedSet.SUPABASE_SERVICE_ROLE_KEY },
])), "API_KEY_SELECTION_REFUSED");
await throwsCode(() => parseApprovedApiKeyJson(JSON.stringify([
  { name: "anon", api_key: approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  { name: "service_role", api_key: jwt({ ref: "wrongproject", role: "service_role" }) },
])), "API_KEY_SELECTION_REFUSED");
await throwsCode(() => parseApprovedApiKeyJson("not-json"), "API_KEY_JSON_REFUSED");
await throwsCode(() => parseApprovedApiKeyJson(JSON.stringify({ name: "anon" })), "API_KEY_JSON_REFUSED");
check(!JSON.stringify(classifyBindingSet(parsedKeys)).includes(approvedSet.SUPABASE_SERVICE_ROLE_KEY));

// Real process-adapter ordinary-encrypted injection and fresh readback: 1 added assertion.
const processRunner = createBindingProcessRunner({ keyJson: apiKeyJson, initialProduction: prohibitedSet });
const processRepaired = await repairProductionBindings({
  source: prohibitedSet,
  adapter: createBindingProcessAdapter({ runChild: processRunner.runChild }),
});
const processAddCalls = processRunner.calls.filter((call) => call.operation === "add");
const processRunCalls = processRunner.calls.filter((call) => call.operation === "run");
check(
  processRepaired.state === "bindings-repaired"
    && processRepaired.bindingClass === "approved"
    && processRunner.calls[0]?.operation === "api-keys"
    && processAddCalls.length === 3
    && processAddCalls.map((call) => call.name).join("|") === BINDING_NAMES.join("|")
    && processAddCalls.every((call) => call.environment === "production" && call.viaStdin && !call.argumentsContainValue && call.force && call.yes && !call.sensitive)
    && processRunCalls.length === 1
    && processRunCalls[0].environment === "production"
    && processRunCalls[0].bindingStatus
    && classifyBindingSet(processRunner.injectedProduction).bindingClass === "approved",
  "ordinary encrypted Production bindings must be available to a fresh vercel env run",
);

// Fixed stdin-only transaction and all-three compensation: 18 added assertions.
const replacementPlan = buildBindingReplacementPlan(approvedSet);
equal(replacementPlan.length, 3);
equal(replacementPlan.map((binding) => binding.name).join("|"), BINDING_NAMES.join("|"));
const successBindingAdapter = new FakeBindingAdapter();
const repaired = await repairProductionBindings({ source: prohibitedSet, adapter: successBindingAdapter });
equal(repaired.state, "bindings-repaired");
equal(repaired.bindingClass, "approved");
equal(successBindingAdapter.apiReads, 1);
equal(repaired.writes, 3);
equal(repaired.compensation, "not-required");
equal(successBindingAdapter.writeCalls.length, 3);
equal(successBindingAdapter.writeCalls.map((call) => call.name).join("|"), BINDING_NAMES.join("|"));
check(successBindingAdapter.writeCalls.every((call) => call.viaStdin && !call.argumentsContainValue));
await throwsCode(() => assertNoProtectedChildOutput(`echo:${approvedSet.SUPABASE_SERVICE_ROLE_KEY}`, [approvedSet.SUPABASE_SERVICE_ROLE_KEY]), "CHILD_OUTPUT_REFUSED");
const partialBindingAdapter = new FakeBindingAdapter({ failWriteCalls: [2] });
await throwsCode(() => repairProductionBindings({ source: prohibitedSet, adapter: partialBindingAdapter }), "BINDING_REPAIR_FAILED_RESTORED");
equal(partialBindingAdapter.writeCalls.length, 5);
equal(classifyBindingSet(partialBindingAdapter.current).bindingClass, "prohibited");
equal(partialBindingAdapter.writeCalls.slice(-3).map((call) => call.name).join("|"), BINDING_NAMES.join("|"));
const postReadBindingAdapter = new FakeBindingAdapter({ statusClasses: ["refused"] });
await throwsCode(() => repairProductionBindings({ source: prohibitedSet, adapter: postReadBindingAdapter }), "BINDING_REPAIR_FAILED_RESTORED");
equal(classifyBindingSet(postReadBindingAdapter.current).bindingClass, "prohibited");
await throwsCode(() => repairProductionBindings({ source: prohibitedSet, adapter: new FakeBindingAdapter({ failWriteCalls: [2, 3] }) }), "BINDING_COMPENSATION_FAILED");

// Development-source restoration, CLI and result guards: 8 added assertions.
await throwsCode(() => restoreProductionBindings({ source: approvedSet, adapter: new FakeBindingAdapter() }), "BINDING_SOURCE_REFUSED");
const restorationAdapter = new FakeBindingAdapter();
restorationAdapter.current = structuredClone(approvedSet);
const restored = await restoreProductionBindings({ source: prohibitedSet, adapter: restorationAdapter });
equal(restored.state, "bindings-restored");
equal(restored.writes, 3);
equal(classifyBindingSet(restorationAdapter.current).bindingClass, "prohibited");
equal(parseCli(["node", "script", "repair-production-bindings"]).mode, "repair-production-bindings");
equal(parseCli(["node", "script", "restore-production-bindings"]).mode, "restore-production-bindings");
await throwsCode(() => parseCli(["node", "script", "repair-production-bindings", "--origin", CANONICAL_ORIGIN]), "MODE_REFUSED");
await throwsCode(() => assertSafeResult({ state: "bad", value: approvedSet.NEXT_PUBLIC_SUPABASE_ANON_KEY }), "CHILD_OUTPUT_REFUSED");

assert.equal(assertions, 136, `expected exactly 136 assertions, received ${assertions}`);
console.log(`Sprint 036J autonomous trainer access deterministic tests passed (${assertions} assertions).`);
