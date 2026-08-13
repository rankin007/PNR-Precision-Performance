import { strict as assert } from "node:assert";
import {
  MAX_REQUESTS, MAX_PAGES, MAX_RESPONSE_BYTES, MAX_LINE_BYTES, PROVIDERS, OUTCOMES, REQUEST_MATRIX,
  Reader036PError, assertReadOnlyRequest, assertBoundedResponse, createAuthorityHandle, createReadSession,
  beforeRequest, sanitizeProjection, closeReadSession, paginateReadOnly, decoders, railwayHeaders,
  createTestAdapterSet, executeReadPlan, assertTestReadResult, exerciseComposedProviderForTest,
} from "./provider-authority-reader-036P.mjs";

let count = 0;
const equal = (actual, expected) => { assert.deepEqual(actual, expected); count += 1; };
const ok = (value) => { assert.ok(value); count += 1; };
const refuses = (operation, code) => { assert.throws(operation, (error) => error instanceof Reader036PError && error.code === code); count += 1; };
const refusesAsync = async (operation, code) => { await assert.rejects(operation, (error) => error instanceof Reader036PError && error.code === code); count += 1; };

const expected = Object.freeze({
  vercelTeamId: "team_exact",
  vercelProjectId: "project_exact",
  supabaseProjectRef: "projectrefexact",
  resendTeamId: "team_resend_exact",
  stripeAccountId: "acct_exact",
  stripeLiveMode: true,
  railwayTokenType: "workspace",
  railwayAccountId: "rail_account",
  railwayWorkspaceId: "rail_workspace",
  railwayProjectId: "rail_project",
  railwayEnvironmentId: "rail_environment",
});

ok(MAX_REQUESTS === 24 && MAX_PAGES === 100 && MAX_RESPONSE_BYTES === 2 * 1024 * 1024 && MAX_LINE_BYTES === 64 * 1024 && PROVIDERS.join(",") === "vercel,supabase,resend,stripe,railway" && OUTCOMES.length === 2 && Object.isFrozen(REQUEST_MATRIX) && Object.values(REQUEST_MATRIX).every(Object.isFrozen));


for (const [provider, operation, descriptor] of [
  ["vercel", "project", { method: "GET", path: "/v9/projects/{project}" }],
  ["vercel", "environment", { method: "GET", path: "/v10/projects/{project}/env" }],
  ["supabase", "keys", { method: "GET", path: "/v1/projects/{ref}/api-keys" }],
  ["resend", "keys", { method: "GET", path: "/api-keys" }],
  ["stripe", "webhooks", { method: "GET", path: "/v1/webhook_endpoints" }],
  ["railway", "graph", { method: "POST", url: "https://backboard.railway.com/graphql/v2" }],
]) ok(assertReadOnlyRequest(provider, operation, descriptor));
ok(assertReadOnlyRequest("supabase", "catalog", { method: "POST", path: "/v1/projects/{ref}/database/query/read-only", queries: ["select jobid from cron.job", "select proname from pg_catalog.pg_proc"] }));
refuses(() => assertReadOnlyRequest("supabase", "catalog", { method: "POST", path: "/v1/projects/{ref}/database/query", queries: ["select jobid from cron.job"] }), "REQUEST_PATH_REFUSED");
refuses(() => assertReadOnlyRequest("supabase", "catalog", { method: "POST", path: "/v1/projects/{ref}/database/query/read-only", queries: ["delete from cron.job"] }), "SUPABASE_SQL_REFUSED");
refuses(() => assertReadOnlyRequest("supabase", "catalog", { method: "POST", path: "/v1/projects/{ref}/database/query/read-only", queries: ["select * from users"] }), "SUPABASE_SQL_REFUSED");
refuses(() => assertReadOnlyRequest("vercel", "environment", { method: "GET", path: "/v10/projects/{project}/env", decrypt: true }), "REQUEST_REVEAL_OR_WRITE_REFUSED");
refuses(() => assertReadOnlyRequest("stripe", "account", { method: "POST", path: "/v1/account" }), "REQUEST_METHOD_REFUSED");
refuses(() => assertReadOnlyRequest("unknown", "project", { method: "GET" }), "REQUEST_NOT_ALLOWLISTED");
refuses(() => assertReadOnlyRequest("vercel", "environment", { method: "GET", path: "/v10/projects/{project}/env/value" }), "REQUEST_PATH_REFUSED");
refuses(() => assertReadOnlyRequest("railway", "graph", { method: "POST", url: "https://backboard.railway.com/graphql/v2", mutation: true }), "REQUEST_REVEAL_OR_WRITE_REFUSED");
equal(REQUEST_MATRIX.vercel.environment.decrypt, false);
equal(REQUEST_MATRIX.supabase.catalog.path, "/v1/projects/{ref}/database/query/read-only");
equal(REQUEST_MATRIX.resend.identity.operation, "whoami-or-signed-in-team");

ok(assertBoundedResponse({ rows: [] }));
refuses(() => assertBoundedResponse("{"), "RESPONSE_JSON_REFUSED");
refuses(() => assertBoundedResponse({ token: "protected" }), "PROTECTED_FIELD_REFUSED");
refuses(() => assertBoundedResponse({ note: "sb_secret_123456789" }), "PROTECTED_RESPONSE_REFUSED");
refuses(() => assertBoundedResponse({ data: "x".repeat(MAX_RESPONSE_BYTES + 1) }), "RESPONSE_BOUNDS_REFUSED");

const authority = createAuthorityHandle(expected);
equal(authority.snapshot(), { providers: 5, exact: true });
ok(Object.isFrozen(authority));
refuses(() => createAuthorityHandle({ ...expected, stripeLiveMode: "yes" }), "AUTHORITY_SHAPE_REFUSED");
refuses(() => createAuthorityHandle({ ...expected, extra: "no" }), "AUTHORITY_SHAPE_REFUSED");
refuses(() => createAuthorityHandle({ ...expected, railwayTokenType: "unknown" }), "RAILWAY_TOKEN_TYPE_REFUSED");

const session = createReadSession(authority, ["captured-canary-value"]);
equal(session.snapshot().requests, 0);
equal(beforeRequest(session), 1);
equal(beforeRequest(session), 2);
equal(session.snapshot().providerReads, 2);
ok(sanitizeProjection(session, { provider: "vercel", rows: 0 }));
refuses(() => sanitizeProjection(session, { note: "captured-canary-value" }), "TAINT_REFUSED");
refuses(() => sanitizeProjection(session, { tokenCount: 1 }), "PROJECTION_FIELD_REFUSED");

const vp = decoders.vercelProject({ id: "project_exact", name: "Precision", accountId: "team_exact" }, expected);
equal(vp.projectId, "project_exact");
refuses(() => decoders.vercelProject({ id: "other", name: "Precision", accountId: "team_exact" }, expected), "VERCEL_AUTHORITY_REFUSED");
const ve = decoders.vercelEnv({ envs: [{ id: "env1", key: "CRON_SECRET", type: "encrypted", target: ["production"], gitBranch: null }], pagination: { next: null } }, expected);
equal(ve.rows[0].name, "CRON_SECRET");
equal(ve.next, null);
refuses(() => decoders.vercelEnv({ envs: [{ id: "env1", key: "X", type: "encrypted", target: ["bad"], gitBranch: null }], pagination: { next: null } }, expected), "VERCEL_ENV_REFUSED");

const keys = decoders.supabaseKeys([{ id: "key1", type: "secret", prefix: "sb_secret", name: "server", description: null }], expected);
equal(keys[0].projectRef, "projectrefexact");
const catalog = decoders.supabaseCatalog({ rows: [{ kind: "pg-cron", schema: "cron", name: "job", target_class: "CRON_SECRET" }] }, expected);
equal(catalog[0].kind, "pg-cron");
refuses(() => decoders.supabaseCatalog({ rows: [{ kind: "table", schema: "public", name: "users", target_class: null }] }, expected), "SUPABASE_CATALOG_REFUSED");

const identity = decoders.resendIdentity({ teamId: "team_resend_exact", source: "whoami", profile: "production" }, expected);
equal(identity.teamId, "team_resend_exact");
refuses(() => decoders.resendIdentity({ teamId: "wrong", source: "whoami", profile: "production" }, expected), "RESEND_AUTHORITY_REFUSED");
refuses(() => decoders.resendIdentity({ teamId: "team_resend_exact", source: "caller-label", profile: "production" }, expected), "RESEND_AUTHORITY_REFUSED");
const resendKeys = decoders.resendKeys({ object: "list", has_more: false, data: [{ id: "rk1", name: "smtp", created_at: "today", last_used_at: null }] }, expected);
equal(resendKeys.rows[0].teamId, "team_resend_exact");
equal(Object.hasOwn(resendKeys.rows[0], "permission"), false);
refuses(() => decoders.resendKeys({ object: "list", has_more: false, data: [{ id: "rk1", name: "smtp", permission: "full", created_at: "today", last_used_at: null }] }, expected), "RESEND_KEYS_REFUSED");
const domains = decoders.resendDomains({ object: "list", has_more: false, data: [{ id: "d1", name: "example.test", status: "verified", region: "us-east-1", created_at: "today" }] }, expected);
equal(domains.rows[0].status, "verified");

const stripe = decoders.stripeAccount({ id: "acct_exact", object: "account", livemode: true, country: "AU", charges_enabled: true, business_profile: { name: "safe-extra" } }, expected);
equal(stripe.liveMode, true);
refuses(() => decoders.stripeAccount({ id: "acct_exact", object: "account", livemode: false, country: "AU" }, expected), "STRIPE_AUTHORITY_REFUSED");
const webhooks = decoders.stripeWebhooks({ object: "list", data: [{ id: "we1", object: "webhook_endpoint", api_version: null, application: null, created: 1, description: "safe-extra", status: "enabled", url: "https://example.test/hook", livemode: true, metadata: {}, enabled_events: ["checkout.session.completed"] }], has_more: false, url: "/v1/webhook_endpoints" }, expected);
equal(webhooks.rows[0].host, "example.test");
refuses(() => decoders.stripeWebhooks({ object: "list", data: [{ id: "we1", object: "webhook_endpoint", status: "enabled", url: "https://example.test/hook", livemode: false, enabled_events: [] }], has_more: false, url: "/v1/webhook_endpoints" }, expected), "STRIPE_AUTHORITY_REFUSED");

const rail = decoders.railway({ data: { me: { id: "rail_account" }, workspace: { id: "rail_workspace", projects: { edges: [{ node: { id: "rail_project" } }] } } } }, expected);
equal(rail.tokenType, "workspace");
refuses(() => decoders.railway({ data: { workspace: { id: "wrong", projects: { edges: [] } } } }, expected), "RAILWAY_AUTHORITY_REFUSED");
equal(Object.keys(railwayHeaders("project", "project-token-value"))[0], "Project-Access-Token");
equal(railwayHeaders("account", "account-token-value").Authorization, "Bearer account-token-value");
refuses(() => railwayHeaders("other", "account-token-value"), "RAILWAY_TOKEN_TYPE_REFUSED");

const pagingAuthority = createAuthorityHandle(expected);
const pagingSession = createReadSession(pagingAuthority);
const pages = new Map([[null, { rows: [{ id: "a" }], next: "next" }], ["next", { rows: [{ id: "b" }], next: null }]]);
const pageResult = await paginateReadOnly(pagingSession, async (cursor) => pages.get(cursor), (raw) => raw);
ok(pageResult.rows.length === 2 && pageResult.pages === 2 && pageResult.complete === true);

equal(pagingSession.snapshot().requests, 2);

const duplicateSession = createReadSession(createAuthorityHandle(expected));
await refusesAsync(() => paginateReadOnly(duplicateSession, async () => ({ rows: [{ id: "a" }, { id: "a" }], next: null }), (raw) => raw), "PAGINATION_DUPLICATE_REFUSED");
const cursorSession = createReadSession(createAuthorityHandle(expected));
await refusesAsync(() => paginateReadOnly(cursorSession, async () => ({ rows: [{ id: crypto.randomUUID() }], next: "same" }), (raw) => raw, { maximumPages: 2 }), "PAGINATION_CURSOR_REFUSED");
const incompleteSession = createReadSession(createAuthorityHandle(expected));
await refusesAsync(() => paginateReadOnly(incompleteSession, async () => ({ rows: [{ id: crypto.randomUUID() }], next: crypto.randomUUID() }), (raw) => raw, { maximumPages: 2 }), "PAGINATION_INCOMPLETE_FALLBACK");

const ceilingSession = createReadSession(createAuthorityHandle(expected));
for (let index = 0; index < MAX_REQUESTS; index += 1) beforeRequest(ceilingSession);
equal(ceilingSession.snapshot().requests, 24);
refuses(() => beforeRequest(ceilingSession), "REQUEST_CEILING_REFUSED");

const closed = closeReadSession(session);
equal(closed.closed, true);
refuses(() => beforeRequest(session), "SESSION_REFUSED");
const rowProviders = {
  SUPABASE_SERVICE_ROLE_KEY: "supabase", CRON_SECRET: "vercel", ENQUIRY_ABUSE_HMAC_SECRET: "vercel",
  PUBLIC_ENQUIRY_SMTP_PASS: "resend", STRIPE_SECRET_KEY: "stripe", STRIPE_WEBHOOK_SECRET: "stripe", RAILWAY_API_TOKEN: "railway",
};
const rows = Object.entries(rowProviders).map(([className, authority]) => ({
  class: className, authority, sourceConsumers: ["server-consumer"], sourceComplete: true,
  providerConsumers: 1, paginationComplete: true, reachability: "required", replacement: "native-replacement",
  installTargets: ["current-consumer"], readback: "harmless-readback", predecessorAction: "native-disable",
  predecessorOracle: "old-auth-rejection", coupling: "independent", manualUiRequired: false, laterMutation: "executable",
}));
const fallbackAdapters = createTestAdapterSet({ "stripe:webhooks": { complete: false }, "railway:graph": { authorityBound: true, complete: true, rows } });
const fallback = await executeReadPlan(createAuthorityHandle(expected), fallbackAdapters);
equal(fallback.outcome, "protected-provider-authority-readback-blocked-clean");
equal(fallback.complete, false);
await refusesAsync(() => executeReadPlan(createAuthorityHandle(expected), { run: async () => ({ complete: true }) }), "ADAPTER_AUTHORITY_REFUSED");
const successAdapters = createTestAdapterSet({ "railway:graph": { authorityBound: true, complete: true, rows } });
const success = await executeReadPlan(createAuthorityHandle(expected), successAdapters);
equal(success.outcome, "protected-provider-authority-readback-complete-clean");
ok(success.providerReads === 17 && success.writes === 0 && success.mutations === 0 && success.residue === 0);
refuses(() => assertTestReadResult({ ...success }), "RESULT_REFUSED");
const liveCalls = [];
const liveResponses = [
  { id:"project_exact", accountId:"team_exact", name:"project", crons:{ definitions:[{host:"app.example",path:"/api/internal/enquiries",schedule:"0 1 * * *",description:"safe-extra"}], deploymentId:"d", disabledAt:null, enabledAt:1, updatedAt:1 }, createdAt:1 },
  { deployments:[{uid:"d1",projectId:"project_exact",teamId:"team_exact",created:1}], pagination:{next:"cursor2"}, createdAt:1 },
  { deployments:[{uid:"d2",projectId:"project_exact",teamId:"team_exact"}], pagination:{next:null} },
  { envs:[{id:"e1",key:"CRON_SECRET",type:"encrypted",target:["production"],gitBranch:null,createdAt:1}], pagination:{next:null}, createdAt:1 },
  { aliases:[], pagination:{next:null} }, [{id:"i1",ownerId:"team_exact",projectIds:["project_exact"]}], [{id:"w1",ownerId:"team_exact",projectIds:["project_exact"]}],
];
const scriptedTransport = { async http(url, options){ liveCalls.push({url,method:options.method}); return {ok:true,status:200,text:JSON.stringify(liveResponses.shift())}; }, cli(){ return {status:0,stdout:"{}"}; } };
const composed = await exerciseComposedProviderForTest("vercel", {credential:"credential-value",expected:{teamId:"team_exact",projectId:"project_exact"}}, scriptedTransport);
const resendCalls = [];
const resendResponses = [
  {object:"list",has_more:true,data:[{id:"rk1",name:"key-1",created_at:"today",last_used_at:null}]},
  {object:"list",has_more:false,data:[{id:"rk2",name:"key-2",created_at:"today",last_used_at:null}]},
  {object:"list",has_more:true,data:[{id:"rd1",name:"one.example",status:"verified",region:"us-east-1",created_at:"today"}]},
  {object:"list",has_more:false,data:[{id:"rd2",name:"two.example",status:"verified",region:"us-east-1",created_at:"today"}]},
];
const resendComposed = await exerciseComposedProviderForTest("resend", {credential:"credential-value",expected:{teamId:"team_resend_exact"}}, {async http(url,options){resendCalls.push({url,method:options.method});return {ok:true,status:200,text:JSON.stringify(resendResponses.shift())};},cli(){return {status:0,stdout:JSON.stringify({teamId:"team_resend_exact",source:"whoami",profile:"production"})};}});
const authorityFailure = async (integration, webhook) => {
  const responses=[
    {id:"project_exact",accountId:"team_exact",name:"project",crons:{definitions:[]}},
    {deployments:[],pagination:{next:null}}, {envs:[],pagination:{next:null}}, {aliases:[],pagination:{next:null}}, integration, webhook,
  ];
  try { await exerciseComposedProviderForTest("vercel",{credential:"credential-value",expected:{teamId:"team_exact",projectId:"project_exact"}},{async http(){return {ok:true,status:200,text:JSON.stringify(responses.shift())};},cli(){return {status:0,stdout:"{}"};}}); return false; }
  catch(error){ return error instanceof Reader036PError && error.code === "VERCEL_AUTHORITY_REFUSED"; }
};
const authorityRefusals = await Promise.all([
  authorityFailure([{id:"i1",projectIds:["project_exact"]}], [{id:"w1",ownerId:"team_exact",projectIds:["project_exact"]}]),
  authorityFailure([{id:"i1",ownerId:"team_exact",projectIds:["project_exact"]}], [{id:"w1",ownerId:"team_exact",projectIds:["wrong"]}]),
]);
ok(composed.projection.operations.length === 7 && composed.requests === 7 && composed.projection.facts.counts.crons === 1 && resendComposed.requests === 5 && resendComposed.projection.operations.length === 3 && assertTestReadResult(success) === success && success.capabilityRows.length === 7);
ok(liveCalls.some((call)=>call.url.includes("/v6/deployments") && call.url.includes("until=cursor2")) && liveCalls.some((call)=>call.url.includes("/v1/integrations/configurations?teamId=")) && liveCalls.some((call)=>call.url.includes("/v1/webhooks?teamId=")) && resendCalls.some((call)=>call.url.includes("/api-keys?limit=100&after=rk1")) && resendCalls.some((call)=>call.url.includes("/domains?limit=100&after=rd1")) && authorityRefusals.every(Boolean));
const ceilingTransport = { async http(){ return {ok:true,status:200,text:JSON.stringify({id:"project_exact",accountId:"team_exact",name:"p",crons:{definitions:[],deploymentId:"d",disabledAt:null,enabledAt:1,updatedAt:1}})}; }, cli(){return {status:0,stdout:"{}"};} };
await refusesAsync(() => exerciseComposedProviderForTest("vercel", {credential:"credential-value",expected:{teamId:"team_exact",projectId:"project_exact"}}, ceilingTransport, {requests:24}), "REQUEST_CEILING_REFUSED");
const hugeTransport = { async http(){ return {ok:true,status:200,text:JSON.stringify({id:"project_exact",accountId:"team_exact",name:"p",crons:{definitions:[],deploymentId:"d",disabledAt:null,enabledAt:1,updatedAt:1},pad:"x".repeat(MAX_RESPONSE_BYTES)})}; }, cli(){return {status:0,stdout:"{}"};} };
await refusesAsync(() => exerciseComposedProviderForTest("vercel", {credential:"credential-value",expected:{teamId:"team_exact",projectId:"project_exact"}}, hugeTransport), "PROVIDER_RESPONSE_BOUNDS_REFUSED");
ok(!liveCalls.some((call)=>call.url.includes("/v7/deployments")) && liveCalls.every((call)=>call.method === "GET"));assert.equal(count, 80);
console.log(`provider-authority-reader-036P ${count}/80 PASS`);
