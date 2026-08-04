import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  AUTH_CONFIG_URL,
  DEFAULT_REQUEST_CEILING,
  INVALIDATION_OUTPUT_KEYS,
  JUSTIFIED_REQUEST_CEILING,
  PROVIDER_PASS_OUTPUT_KEYS,
  advanceLifecycle,
  initialLifecycleState,
  runInvalidationCheck,
  runProviderPass,
  sanitizeFailure,
  validateLifecycleEndpoint,
} from "./protected-management-lifecycle-036D-core.mjs";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };
const throwsCode = (operation, code) => {
  assertions += 1;
  assert.throws(operation, (error) => error?.code === code);
};

const fixedNow = () => new Date("2026-08-04T00:00:00.000Z");
const passPayload = () => ({
  site_url: "https://precisionperformance.com.au",
  uri_allow_list: "https://precisionperformance.com.au/auth/callback",
  smtp_admin_email: "no-reply@precisionperformance.com.au",
  smtp_host: "smtp.resend.com",
  smtp_max_frequency: 60,
  smtp_pass: "synthetic-configured-value",
  smtp_port: "465",
  smtp_user: "resend",
  mailer_templates_magic_link_content: "<p>Your code is {{ .Token }}</p>",
  mailer_otp_exp: 3600,
  mailer_otp_length: 6,
});

function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function bodyGuardedResponse(status, options = {}) {
  let bodyReads = 0;
  const response = {
    status,
    redirected: options.redirected === true,
    get body() {
      bodyReads += 1;
      throw new Error("body-canary-must-never-be-read");
    },
    async text() {
      bodyReads += 1;
      throw new Error("text-canary-must-never-be-read");
    },
    async json() {
      bodyReads += 1;
      throw new Error("json-canary-must-never-be-read");
    },
  };
  return { response, bodyReads: () => bodyReads };
}

const wrapperPath = resolve("scripts/Invoke-ProtectedManagementLifecycle036D.ps1");

function parseKeyValueOutput(output) {
  const values = {};
  for (const line of String(output).split(/\r?\n/)) {
    const separator = line.indexOf("=");
    if (separator > 0) values[line.slice(0, separator)] = line.slice(separator + 1);
  }
  return values;
}

function runWrapperScenario(scenario, operation = "SelfTest") {
  const child = spawnSync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-File", wrapperPath,
    "-Operation", operation,
    "-SelfTestScenario", scenario,
  ], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env },
  });
  const stdout = String(child.stdout || "");
  const stderr = String(child.stderr || "");
  return { status: child.status, stdout, stderr, combined: `${stdout}\n${stderr}`, values: parseKeyValueOutput(stdout) };
}

function psLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function runActiveTranscriptRefusal() {
  const testDirectory = mkdtempSync(join(tmpdir(), "pp036d-active-transcript-"));
  const transcriptPath = join(testDirectory, "manual-transcript.txt");
  const helperMarkerPath = join(testDirectory, "helper-invoked.txt");
  const nodePreloadPath = join(testDirectory, "node-preload.cjs");
  writeFileSync(
    nodePreloadPath,
    `require("node:fs").writeFileSync(${JSON.stringify(helperMarkerPath)}, "helper-invoked"); process.exit(97);\n`,
    "utf8",
  );
  const command = [
    `Start-Transcript -LiteralPath ${psLiteral(transcriptPath)} -NoClobber | Out-Null`,
    `& ${psLiteral(wrapperPath)} -Operation ManagementLifecycle`,
  ].join("\n");
  const encodedCommand = Buffer.from(command, "utf16le").toString("base64");
  const child = spawnSync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-EncodedCommand", encodedCommand,
  ], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env, NODE_OPTIONS: `--require=${nodePreloadPath}` },
  });
  const stdout = String(child.stdout || "");
  const stderr = String(child.stderr || "");
  const transcript = existsSync(transcriptPath) ? readFileSync(transcriptPath, "utf8") : "";
  const helperInvoked = existsSync(helperMarkerPath);
  rmSync(testDirectory, { recursive: true, force: true });
  return {
    status: child.status,
    stdout,
    stderr,
    transcript,
    helperInvoked,
    temporaryFilesRemoved: !existsSync(testDirectory),
  };
}

function restoreEnvironmentValue(name, original) {
  if (original === undefined) delete process.env[name];
  else process.env[name] = original;
}

function runProtectedChildEnvironmentIsolation() {
  const testDirectory = mkdtempSync(join(tmpdir(), "pp036d-protected-child-environment-"));
  const preloadPath = join(testDirectory, "node-options-preload.cjs");
  const helperPath = join(testDirectory, "protected-child-environment-helper.mjs");
  const managementObservationPath = join(testDirectory, "management-observation.json");
  const serviceRoleObservationPath = join(testDirectory, "service-role-observation.json");
  const managementPreloadMarkerPath = join(testDirectory, "preload-management.json");
  const serviceRolePreloadMarkerPath = join(testDirectory, "preload-service-role.json");
  const genericPreloadMarkerPath = join(testDirectory, "preload-generic.json");
  const managementCredential = "synthetic-036d-management-environment-value";
  const serviceRoleCredential = "synthetic-035k-service-role-environment-value";
  const managementHash = createHash("sha256").update(managementCredential).digest("hex");
  const serviceRoleHash = createHash("sha256").update(serviceRoleCredential).digest("hex");

  writeFileSync(preloadPath, [
    'const { writeFileSync } = require("node:fs");',
    'const { join } = require("node:path");',
    "const management = process.env.PP036D_MANAGEMENT_API_TOKEN || null;",
    "const serviceRole = process.env.PP035K_SERVICE_ROLE_KEY || null;",
    "const marker = management ? 'preload-management.json' : serviceRole ? 'preload-service-role.json' : 'preload-generic.json';",
    "writeFileSync(join(__dirname, marker), JSON.stringify({ management, serviceRole, keys: Object.keys(process.env).sort() }));",
    "",
  ].join("\n"), "utf8");

  writeFileSync(helperPath, `
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const mode = process.argv[2];
const management = process.env.PP036D_MANAGEMENT_API_TOKEN || "";
const serviceRole = process.env.PP035K_SERVICE_ROLE_KEY || "";
const poisonNames = [
  "NODE_OPTIONS", "NODE_PATH", "NODE_EXTRA_CA_CERTS", "NODE_TLS_REJECT_UNAUTHORIZED",
  "HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "NO_PROXY", "NODE_DEBUG", "NODE_DEBUG_NATIVE",
  "NODE_LOADER", "NODE_V8_COVERAGE", "PP036D_UNAPPROVED_PARENT_CANARY",
];
const observation = {
  mode,
  keys: Object.keys(process.env).sort(),
  systemRootPresent: typeof process.env.SystemRoot === "string" && process.env.SystemRoot.length > 0,
  managementCredentialPresent: management.length > 0,
  serviceRoleCredentialPresent: serviceRole.length > 0,
  managementCredentialMatches: createHash("sha256").update(management).digest("hex") === ${JSON.stringify(managementHash)},
  serviceRoleCredentialMatches: createHash("sha256").update(serviceRole).digest("hex") === ${JSON.stringify(serviceRoleHash)},
  managementSafeValuesMatch:
    process.env.PP036D_PRIOR_PROVIDER_PASS === "true"
    && process.env.PP036D_CLEANUP_AFTER_FAILED_PROVIDER === "false"
    && process.env.PP036D_REVOCATION_CONFIRMED === "true"
    && process.env.PP036D_REQUEST_COUNT === "2"
    && process.env.PP036D_RETRY_JUSTIFIED === "false",
  serviceRoleSafeValuesMatch:
    process.env.PP035K_SUPABASE_URL === "https://uvskssaecdhxcgytkasc.supabase.co/"
    && process.env.PP035K_RUN === "035K-SYNTHETIC-ENVIRONMENT-TEST",
  poisonNamesPresent: poisonNames.filter((name) => Object.hasOwn(process.env, name)),
};
delete process.env.PP036D_MANAGEMENT_API_TOKEN;
delete process.env.PP035K_SERVICE_ROLE_KEY;
const outputName = mode === "--management-environment-test"
  ? "management-observation.json"
  : "service-role-observation.json";
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), outputName), JSON.stringify(observation));
`, "utf8");

  const poisonedEnvironment = {
    NODE_OPTIONS: `--require=${preloadPath}`,
    NODE_PATH: join(testDirectory, "unapproved-node-path"),
    NODE_EXTRA_CA_CERTS: join(testDirectory, "unapproved-ca.pem"),
    NODE_TLS_REJECT_UNAUTHORIZED: "0",
    HTTP_PROXY: "http://unapproved-http-proxy.invalid",
    HTTPS_PROXY: "http://unapproved-https-proxy.invalid",
    ALL_PROXY: "http://unapproved-all-proxy.invalid",
    NO_PROXY: "unapproved-no-proxy.invalid",
    NODE_DEBUG: "fs",
    NODE_DEBUG_NATIVE: "HTTP",
    NODE_LOADER: "unapproved-loader-canary",
    NODE_V8_COVERAGE: join(testDirectory, "unapproved-coverage"),
    PP036D_UNAPPROVED_PARENT_CANARY: "unapproved-parent-canary",
  };
  const originalEnvironment = new Map(
    Object.keys(poisonedEnvironment).map((name) => [name, process.env[name]]),
  );

  let child;
  let managementObservation;
  let serviceRoleObservation;
  let persistedText = "";
  let managementPreloadExecuted = false;
  let serviceRolePreloadExecuted = false;
  let genericPreloadExecuted = false;
  let parentEnvironmentRestored = false;
  try {
    for (const [name, value] of Object.entries(poisonedEnvironment)) process.env[name] = value;
    child = spawnSync("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy", "Bypass",
      "-File", wrapperPath,
      "-Operation", "SelfTest",
      "-SelfTestScenario", "ProtectedChildEnvironmentIsolation",
      "-SelfTestFixtureDirectory", testDirectory,
    ], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: { ...process.env },
    });
    managementPreloadExecuted = existsSync(managementPreloadMarkerPath);
    serviceRolePreloadExecuted = existsSync(serviceRolePreloadMarkerPath);
    genericPreloadExecuted = existsSync(genericPreloadMarkerPath);
    if (!existsSync(managementObservationPath) || !existsSync(serviceRoleObservationPath)) {
      throw new Error(`protected-child isolation fixture failed: status=${child.status}; stdout=${String(child.stdout || "").trim()}; stderr=${String(child.stderr || "").trim()}`);
    }
    managementObservation = JSON.parse(readFileSync(managementObservationPath, "utf8"));
    serviceRoleObservation = JSON.parse(readFileSync(serviceRoleObservationPath, "utf8"));
    persistedText = [
      preloadPath,
      helperPath,
      managementObservationPath,
      serviceRoleObservationPath,
      managementPreloadMarkerPath,
      serviceRolePreloadMarkerPath,
      genericPreloadMarkerPath,
    ].filter(existsSync).map((path) => readFileSync(path, "utf8")).join("\n");
  } finally {
    for (const [name, original] of originalEnvironment) restoreEnvironmentValue(name, original);
    parentEnvironmentRestored = [...originalEnvironment].every(([name, original]) => process.env[name] === original);
    rmSync(testDirectory, { recursive: true, force: true });
  }

  const stdout = String(child?.stdout || "");
  const stderr = String(child?.stderr || "");
  return {
    status: child?.status,
    stdout,
    stderr,
    combined: `${stdout}\n${stderr}`,
    values: parseKeyValueOutput(stdout),
    managementObservation,
    serviceRoleObservation,
    managementPreloadExecuted,
    serviceRolePreloadExecuted,
    genericPreloadExecuted,
    persistedText,
    parentEnvironmentRestored,
    environmentChangeCount: originalEnvironment.size,
    temporaryDirectoryRemoved: !existsSync(testDirectory),
    preloadRemoved: !existsSync(preloadPath),
    helperRemoved: !existsSync(helperPath),
    managementObservationRemoved: !existsSync(managementObservationPath),
    serviceRoleObservationRemoved: !existsSync(serviceRoleObservationPath),
  };
}

function runProtectedFixtureArgumentRefusal(operation) {
  const child = spawnSync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-File", wrapperPath,
    "-Operation", operation,
    "-SelfTestScenario", "ProtectedChildEnvironmentIsolation",
    "-SelfTestFixtureDirectory", "C:\\pp036d-fixture-must-not-be-resolved",
  ], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env },
  });
  const stdout = String(child.stdout || "");
  return { status: child.status, values: parseKeyValueOutput(stdout) };
}

const inheritedHashes = new Map([
  ["scripts/protected-production-preflight-036C-core.mjs", "0860B6490D477578ADD79514148C0CC899A13C56F496D17A7516FD7F06518B42"],
  ["scripts/test-protected-production-preflight-036C.mjs", "CD7B39BCC3AD5907DE526D15C348AA8222FC7B9D084D13A928BDAAFDD18826E0"],
  ["scripts/Invoke-ProtectedProductionPreflight036C.ps1", "95CCE22AACBCFEAC8E231CB9358997A28141E94C59DED1326683BC9EA89278DC"],
  ["scripts/live-trainer-access-035K-core.mjs", "603FF16B9F6EB30D2B5E26A39218E8307731D66008D4D384FB9696095CD3AB5A"],
]);
for (const [path, expected] of inheritedHashes) {
  equal(createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase(), expected, `${path} hash drifted`);
}

equal(AUTH_CONFIG_URL, "https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth");
equal(DEFAULT_REQUEST_CEILING, 2);
equal(JUSTIFIED_REQUEST_CEILING, 3);
equal(validateLifecycleEndpoint(AUTH_CONFIG_URL), AUTH_CONFIG_URL);
throwsCode(() => validateLifecycleEndpoint("https://api.supabase.com/v1/projects/tagnbgkroihagjmvehlx/config/auth"), "PROHIBITED_TARGET_REFUSED");
throwsCode(() => validateLifecycleEndpoint("https://api.supabase.com/v1/projects/another/config/auth"), "TARGET_REFUSED");
throwsCode(() => validateLifecycleEndpoint(`${AUTH_CONFIG_URL}?unsafe=true`), "TARGET_REFUSED");
throwsCode(() => validateLifecycleEndpoint(AUTH_CONFIG_URL.replace("https:", "http:")), "TARGET_REFUSED");

let lifecycle = initialLifecycleState();
deepEqual(lifecycle, { state: "not-created", tokenCount: 0, requestCount: 0 });
lifecycle = advanceLifecycle(lifecycle, { type: "create" });
deepEqual(lifecycle, { state: "created-private", tokenCount: 1, requestCount: 0 });
throwsCode(() => advanceLifecycle(lifecycle, { type: "create" }), "ONE_TOKEN_CEILING_REFUSED");
throwsCode(() => advanceLifecycle(initialLifecycleState(), { type: "provider-pass" }), "LIFECYCLE_ORDER_REFUSED");
lifecycle = advanceLifecycle(lifecycle, { type: "provider-pass" });
deepEqual(lifecycle, { state: "provider-pass", tokenCount: 1, requestCount: 1 });
throwsCode(() => advanceLifecycle(lifecycle, { type: "clear" }), "LIFECYCLE_ORDER_REFUSED");
lifecycle = advanceLifecycle(lifecycle, { type: "revoke" });
deepEqual(lifecycle, { state: "revoked-private", tokenCount: 1, requestCount: 1 });
throwsCode(() => advanceLifecycle(lifecycle, { type: "invalidation-proven", requestCount: 1 }), "REQUEST_COUNT_REFUSED");
throwsCode(() => advanceLifecycle(lifecycle, { type: "invalidation-proven", requestCount: 3 }), "RETRY_NOT_JUSTIFIED");
lifecycle = advanceLifecycle(lifecycle, { type: "invalidation-proven", requestCount: 2 });
deepEqual(lifecycle, { state: "invalidation-proven", tokenCount: 1, requestCount: 2 });
lifecycle = advanceLifecycle(lifecycle, { type: "clear" });
deepEqual(lifecycle, { state: "cleared", tokenCount: 1, requestCount: 2 });
throwsCode(() => advanceLifecycle(lifecycle, { type: "revoke" }), "LIFECYCLE_ORDER_REFUSED");

let providerRequests = 0;
let providerUrl = null;
let providerOptions = null;
const providerPass = await runProviderPass({
  credential: "synthetic-management-canary",
  now: fixedNow,
  fetchImpl: async (url, options) => {
    providerRequests += 1;
    providerUrl = url;
    providerOptions = options;
    return jsonResponse(passPayload());
  },
});
equal(providerRequests, 1);
equal(providerUrl, AUTH_CONFIG_URL);
equal(providerOptions.method, "GET");
equal(providerOptions.redirect, "manual");
equal(providerOptions.headers.accept, "application/json");
equal(providerOptions.headers.authorization, "Bearer synthetic-management-canary");
equal(providerPass.code, "NONE");
equal(providerPass.output.state, "pass");
equal(providerPass.output.code, "NONE");
equal(providerPass.output.lifecycleState, "provider-pass");
equal(providerPass.output.target, "exact-approved");
equal(providerPass.output.timestampUtc, "2026-08-04T00:00:00.000Z");
equal(providerPass.output.requestCount, 1);
equal(providerPass.output.siteUrlExact, true);
equal(providerPass.output.callbackCount, 1);
equal(providerPass.output.callbackSetExact, true);
equal(providerPass.output.wildcardCount, 0);
equal(providerPass.output.customSmtpConfigured, true);
equal(providerPass.output.providerClass, "resend");
equal(providerPass.output.senderExact, true);
equal(providerPass.output.templateTokenCount, 1);
equal(providerPass.output.confirmationUrlCount, 0);
equal(providerPass.output.templateLinkCount, 0);
equal(providerPass.output.otpLength, 6);
equal(providerPass.output.otpExpirySeconds, 3600);
equal(providerPass.output.minimumIntervalSeconds, 60);
equal(providerPass.output.authUsersEnumerated, false);
equal(providerPass.output.remoteMutation, "none");
equal(providerPass.output.protectedValuesEmitted, false);
deepEqual(Object.keys(providerPass.output).sort(), PROVIDER_PASS_OUTPUT_KEYS);

const missingCredential = await runProviderPass({ credential: "", now: fixedNow, fetchImpl: async () => jsonResponse(passPayload()) });
equal(missingCredential.code, "CREDENTIAL_MISSING");
equal(missingCredential.output.state, "failed-sanitized");
const providerUnauthorized = await runProviderPass({ credential: "synthetic", now: fixedNow, fetchImpl: async () => jsonResponse({}, 401) });
equal(providerUnauthorized.code, "HTTP_STATUS_REFUSED");
equal(providerUnauthorized.output.code, "HTTP_STATUS_REFUSED");
const providerDriftPayload = passPayload();
providerDriftPayload.site_url = "https://wrong.example.test";
const providerDrift = await runProviderPass({ credential: "synthetic", now: fixedNow, fetchImpl: async () => jsonResponse(providerDriftPayload) });
equal(providerDrift.code, "SITE_URL_MISMATCH");
equal(providerDrift.output.lifecycleState, "failed-sanitized");

let invalidationUrl = null;
let invalidationOptions = null;
const unauthorizedGuard = bodyGuardedResponse(401);
const invalidation401 = await runInvalidationCheck({
  credential: "synthetic-revoked-canary",
  priorProviderPass: true,
  revocationConfirmed: true,
  requestCount: 2,
  now: fixedNow,
  fetchImpl: async (url, options) => {
    invalidationUrl = url;
    invalidationOptions = options;
    return unauthorizedGuard.response;
  },
});
equal(invalidationUrl, AUTH_CONFIG_URL);
equal(invalidationOptions.method, "GET");
equal(invalidationOptions.redirect, "manual");
equal(invalidationOptions.headers.accept, "application/json");
equal(invalidationOptions.headers.authorization, "Bearer synthetic-revoked-canary");
equal(invalidation401.code, "NONE");
equal(invalidation401.output.state, "pass");
equal(invalidation401.output.lifecycleState, "invalidation-proven");
equal(invalidation401.output.revocationVerified, true);
equal(invalidation401.output.responseClass, "unauthorized-or-forbidden");
equal(invalidation401.output.responseBodyRead, false);
equal(invalidation401.output.requestCount, 2);
equal(invalidation401.output.authUsersEnumerated, false);
equal(invalidation401.output.remoteMutation, "none");
equal(invalidation401.output.protectedValuesEmitted, false);
equal(unauthorizedGuard.bodyReads(), 0);
deepEqual(Object.keys(invalidation401.output).sort(), INVALIDATION_OUTPUT_KEYS);

const forbiddenGuard = bodyGuardedResponse(403);
const invalidation403 = await runInvalidationCheck({
  credential: "synthetic-revoked-canary",
  priorProviderPass: true,
  revocationConfirmed: true,
  requestCount: 2,
  fetchImpl: async () => forbiddenGuard.response,
});
equal(invalidation403.output.state, "pass");
equal(invalidation403.output.revocationVerified, true);
equal(forbiddenGuard.bodyReads(), 0);

const cleanupGuard = bodyGuardedResponse(401);
const cleanupInvalidation = await runInvalidationCheck({
  credential: "synthetic-revoked-canary",
  priorProviderPass: false,
  cleanupAfterFailedProviderAttempt: true,
  revocationConfirmed: true,
  requestCount: 2,
  fetchImpl: async () => cleanupGuard.response,
});
equal(cleanupInvalidation.output.state, "pass");
equal(cleanupInvalidation.output.lifecycleState, "cleanup-invalidation-proven");
equal(cleanupGuard.bodyReads(), 0);

const missingPriorPass = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: false, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => bodyGuardedResponse(401).response });
equal(missingPriorPass.code, "INVALIDATION_ORDER_REFUSED");
const missingRevocation = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: false, requestCount: 2, fetchImpl: async () => bodyGuardedResponse(401).response });
equal(missingRevocation.code, "INVALIDATION_ORDER_REFUSED");
const invalidRequestOne = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 1, fetchImpl: async () => bodyGuardedResponse(401).response });
equal(invalidRequestOne.code, "REQUEST_COUNT_REFUSED");
const invalidRequestFour = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 4, fetchImpl: async () => bodyGuardedResponse(401).response });
equal(invalidRequestFour.code, "REQUEST_COUNT_REFUSED");
const unjustifiedRetry = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 3, retryJustified: false, fetchImpl: async () => bodyGuardedResponse(401).response });
equal(unjustifiedRetry.code, "RETRY_NOT_JUSTIFIED");
const justifiedRetryGuard = bodyGuardedResponse(401);
const justifiedRetry = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 3, retryJustified: true, fetchImpl: async () => justifiedRetryGuard.response });
equal(justifiedRetry.output.state, "pass");
equal(justifiedRetry.output.requestCount, 3);
equal(justifiedRetryGuard.bodyReads(), 0);

for (const status of [400, 404, 429, 500]) {
  const guarded = bodyGuardedResponse(status);
  const result = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => guarded.response });
  equal(result.code, "INVALIDATION_STATUS_REFUSED", `status ${status} must fail sanitized`);
  equal(guarded.bodyReads(), 0, `status ${status} body must not be read`);
}
const activeGuard = bodyGuardedResponse(200);
const stillActive = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => activeGuard.response });
equal(stillActive.code, "TOKEN_STILL_ACTIVE_REFUSED");
equal(stillActive.output.revocationVerified, false);
equal(activeGuard.bodyReads(), 0);
const redirectGuard = bodyGuardedResponse(302);
const redirected = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => redirectGuard.response });
equal(redirected.code, "HTTP_REDIRECT_REFUSED");
equal(redirectGuard.bodyReads(), 0);
const redirectedFlagGuard = bodyGuardedResponse(401, { redirected: true });
const redirectedFlag = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => redirectedFlagGuard.response });
equal(redirectedFlag.code, "HTTP_REDIRECT_REFUSED");
equal(redirectedFlagGuard.bodyReads(), 0);
const transportFailure = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => { throw new Error("private-transport-canary"); } });
equal(transportFailure.code, "TRANSPORT_AMBIGUOUS_SANITIZED");
equal(transportFailure.output.state, "failed-sanitized");

const canaries = [
  "canary-person@example.test",
  "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
  "eyJhbGciOiJIUzI1NiJ9.canary.signature",
  "password=canary-private-value",
  "Bearer canary-bearer-value",
  "smtp-pass-canary-value",
  "account-owner-canary-value",
  "identity-row-canary-value",
];
const canaryPayload = passPayload();
canaryPayload.unexpected_identity_rows = canaries;
const providerCanaries = await runProviderPass({ credential: "synthetic", now: fixedNow, fetchImpl: async () => jsonResponse(canaryPayload) });
const providerCanaryText = JSON.stringify(providerCanaries.output);
for (const [index, canary] of canaries.entries()) check(!providerCanaryText.includes(canary), `provider canary ${index} escaped`);
const invalidationCanaries = await runInvalidationCheck({ credential: "synthetic", priorProviderPass: true, revocationConfirmed: true, requestCount: 2, fetchImpl: async () => { throw new Error(canaries.join("|")); } });
const invalidationCanaryText = JSON.stringify(invalidationCanaries.output);
for (const [index, canary] of canaries.entries()) check(!invalidationCanaryText.includes(canary), `invalidation canary ${index} escaped`);
equal(sanitizeFailure(new Error(canaries.join("|"))), "UNEXPECTED");

const coreSource = readFileSync("scripts/protected-management-lifecycle-036D-core.mjs", "utf8");
const wrapperSource = readFileSync("scripts/Invoke-ProtectedManagementLifecycle036D.ps1", "utf8");
const pilotSource = readFileSync("scripts/live-trainer-access-035K-core.mjs", "utf8");

equal((coreSource.match(new RegExp(AUTH_CONFIG_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length, 1);
check(coreSource.includes('method: "GET"'));
check(coreSource.includes('redirect: "manual"'));
check(coreSource.includes('responseBodyRead: false'));
check(!coreSource.includes("response.body"));
check(!coreSource.includes("response.text("));
check(!coreSource.includes("response.json("));
for (const forbidden of ['method: "PATCH"', 'method: "POST"', 'method: "PUT"', 'method: "DELETE"', "/auth/v1/admin", "/users", "listUsers", "perPage", "Dashboard"]) {
  check(!coreSource.includes(forbidden), `forbidden core surface present: ${forbidden}`);
}

check(wrapperSource.includes("C:\\Users\\rrank\\OneDrive\\PNR Precision Performance Canonical"));
check(wrapperSource.includes("codex/036D-single-use-management-access-and-live-trainer-acceptance"));
check(wrapperSource.includes("ValidateSet('SelfTest', 'ManagementLifecycle', 'RetainedPilotVerify')"));
check(wrapperSource.includes("ReadSecure 'Protected Supabase Management API bearer credential'") && wrapperSource.includes("return Read-Host $Prompt -AsSecureString"));
check(wrapperSource.includes("Read-Host 'Protected Supabase service-role value' -AsSecureString"));
check(
  wrapperSource.includes("$hostUiType.GetProperty('IsTranscribing', $bindingFlags)")
  && wrapperSource.includes("System.Management.Automation.Internal.Host.InternalHostUserInterface")
  && !wrapperSource.includes("Microsoft.PowerShell.ConsoleHost.IsTranscribing"),
);
check(wrapperSource.includes("[Console]::IsInputRedirected"));
check(wrapperSource.includes("[Console]::IsOutputRedirected"));
check(wrapperSource.includes("[Console]::IsErrorRedirected"));
check(wrapperSource.includes("PP036D_MANAGEMENT_API_TOKEN"));
check(wrapperSource.includes("PP035K_SERVICE_ROLE_KEY"));
check(wrapperSource.includes("PP036D_CLEANUP_AFTER_FAILED_PROVIDER"));
check(wrapperSource.includes("ZeroFreeBSTR"));
check(wrapperSource.includes(".Dispose()"));
check(wrapperSource.includes("[System.Windows.Forms.Clipboard]::Clear()"));
check(!wrapperSource.includes("Get-Clipboard"));
check(!wrapperSource.includes("Start-Process"));
check(!wrapperSource.includes("Invoke-WebRequest"));
check(!wrapperSource.includes("Invoke-RestMethod"));
check(!wrapperSource.includes("/account/tokens"));
check(wrapperSource.includes("automationOfTokenCreation=false"));
check(wrapperSource.includes("automationOfTokenRevocation=false"));
check(wrapperSource.includes("instruction=privately-create-exactly-one-named-token-now"));
check(wrapperSource.includes("REVOKED-AND-ABSENT"));
check(wrapperSource.includes("credentialMayStillBeActive=true"));
check(wrapperSource.includes("vercelProductionContinuation=false"));
check(wrapperSource.includes("one-management-credential-created-and-revoked"));
check((wrapperSource.match(/& \$InvokeChild \$managementSecure/g) || []).length >= 2);
check(!wrapperSource.includes("TesterEmail"));
check(!wrapperSource.includes("OtpCode"));
equal((wrapperSource.match(/listUsers/g) || []).length, 2);
equal((wrapperSource.match(/perPage/g) || []).length, 2);
check(wrapperSource.includes("$pilotSource.Contains('listUsers') -or $pilotSource.Contains('perPage')"));

check(pilotSource.includes("uvskssaecdhxcgytkasc"));
check(pilotSource.includes("tagnbgkroihagjmvehlx"));
check(pilotSource.includes("hiddenInput"));
check(pilotSource.includes("getUserById"));
check(pilotSource.includes("--verify"));
check(pilotSource.includes("wrongHorseRows"));
check(!pilotSource.includes("listUsers"));
check(!pilotSource.includes("perPage"));

const activeTranscript = runActiveTranscriptRefusal();
const activeTranscriptText = `${activeTranscript.stdout}\n${activeTranscript.stderr}\n${activeTranscript.transcript}`;
check(activeTranscript.status !== 0, "active transcript must fail before protected work");
check(activeTranscript.stdout.includes("state=failed-sanitized"), "active transcript must emit sanitized state");
check(activeTranscript.stdout.includes("code=TRANSCRIPTION_REFUSED"), "active transcript must emit exact refusal code");
check(activeTranscript.stdout.includes("protectedValuesEmitted=false"), "active transcript refusal must preserve protected-output boundary");
check(!activeTranscriptText.includes("instruction=privately-create-exactly-one-named-token-now"), "active transcript must precede token creation instruction");
check(!activeTranscriptText.includes("Protected Supabase Management API bearer credential"), "active transcript must precede protected prompt");
check(!activeTranscriptText.includes("privately-revoke-exact-token"), "active transcript must precede compensation and downstream work");
equal(activeTranscript.helperInvoked, false, "active transcript must prevent helper execution");
check(!activeTranscript.stdout.includes("requestCount="), "active transcript must prevent request execution");
equal(activeTranscript.temporaryFilesRemoved, true, "temporary transcript evidence must be removed");

const clipboardFailure = runWrapperScenario("ClipboardClearFailureAfterCreation");
equal(clipboardFailure.status, 0, "clipboard failure scenario process must complete deterministically");
equal(clipboardFailure.values.state, "deterministic-self-test-scenario");
equal(clipboardFailure.values.credentialCreated, "true");
equal(clipboardFailure.values.primaryCode, "CLIPBOARD_CLEAR_FAILED");
equal(clipboardFailure.values.providerChildCallCount, "0");
equal(clipboardFailure.values.revocationPromptAttempted, "true");
equal(clipboardFailure.values.credentialRevoked, "true");
equal(clipboardFailure.values.invalidationChildCallCount, "1");
equal(clipboardFailure.values.cleanResultEligible, "true");
equal(clipboardFailure.values.managementEnvironmentCleared, "true");

const helperStartFailure = runWrapperScenario("HelperStartFailure");
equal(helperStartFailure.status, 0, "helper-start failure scenario process must complete deterministically");
equal(helperStartFailure.values.primaryCode, "HELPER_FAILED_SANITIZED");
equal(helperStartFailure.values.credentialCreated, "true");
equal(helperStartFailure.values.providerChildCallCount, "1");
equal(helperStartFailure.values.providerPass, "false");
equal(helperStartFailure.values.revocationPromptAttempted, "true");
equal(helperStartFailure.values.postRevokeListAbsent, "true");
equal(helperStartFailure.values.invalidationChildCallCount, "1");
equal(helperStartFailure.values.revocationVerified, "true");
equal(helperStartFailure.values.cleanResultEligible, "true");

const missingCredentialScenario = runWrapperScenario("MissingCredentialAfterCreation");
equal(missingCredentialScenario.status, 0, "missing-credential scenario process must complete deterministically");
equal(missingCredentialScenario.values.credentialCreated, "true");
equal(missingCredentialScenario.values.credentialAvailable, "false");
equal(missingCredentialScenario.values.revocationPromptAttempted, "true");
equal(missingCredentialScenario.values.invalidationChildCallCount, "0");
equal(missingCredentialScenario.values.cleanResultEligible, "false");
equal(missingCredentialScenario.values.manualInterventionRequired, "true");
equal(missingCredentialScenario.values.cleanupCode, "SECRET_INPUT_CANCELLED");

const revocationFailure = runWrapperScenario("RevocationConfirmationFailure");
equal(revocationFailure.status, 0, "revocation-confirmation scenario process must complete deterministically");
equal(revocationFailure.values.credentialCreated, "true");
equal(revocationFailure.values.credentialAvailable, "true");
equal(revocationFailure.values.revocationPromptAttempted, "true");
equal(revocationFailure.values.credentialRevoked, "false");
equal(revocationFailure.values.invalidationChildCallCount, "0");
equal(revocationFailure.values.cleanResultEligible, "false");
equal(revocationFailure.values.cleanupCode, "REVOCATION_CONFIRMATION_REQUIRED");

const invalidationNoRetry = runWrapperScenario("InvalidationFailureNoRetry");
equal(invalidationNoRetry.status, 0, "no-retry invalidation scenario must complete deterministically");
equal(invalidationNoRetry.values.invalidationChildCallCount, "1");
equal(invalidationNoRetry.values.retryAttempted, "false");
equal(invalidationNoRetry.values.requestCount, "2");
equal(invalidationNoRetry.values.cleanResultEligible, "false");
equal(invalidationNoRetry.values.manualInterventionRequired, "true");

const invalidationRetrySuccess = runWrapperScenario("InvalidationFailureRetrySuccess");
equal(invalidationRetrySuccess.status, 0, "justified retry success scenario must complete deterministically");
equal(invalidationRetrySuccess.values.invalidationChildCallCount, "2");
equal(invalidationRetrySuccess.values.retryAttempted, "true");
equal(invalidationRetrySuccess.values.requestCount, "3");
equal(invalidationRetrySuccess.values.cleanResultEligible, "true");

const invalidationRetryFailure = runWrapperScenario("InvalidationFailureRetryFailure");
equal(invalidationRetryFailure.status, 0, "justified retry failure scenario must complete deterministically");
equal(invalidationRetryFailure.values.invalidationChildCallCount, "2");
equal(invalidationRetryFailure.values.retryAttempted, "true");
equal(invalidationRetryFailure.values.requestCount, "3");
equal(invalidationRetryFailure.values.manualInterventionRequired, "true");

const cleanupEnvironment = runWrapperScenario("CleanupEnvironmentProof");
equal(cleanupEnvironment.status, 0, "cleanup environment scenario must complete deterministically");
equal(cleanupEnvironment.values.managementEnvironmentCleared, "true");
equal(cleanupEnvironment.values.serviceRoleEnvironmentCleared, "true");
equal(cleanupEnvironment.values.secureValueDisposed, "true");
check(
  ![
    clipboardFailure, helperStartFailure, missingCredentialScenario, revocationFailure,
    invalidationNoRetry, invalidationRetrySuccess, invalidationRetryFailure, cleanupEnvironment,
  ].map((result) => result.combined).join("\n").includes("synthetic-management-self-test-value"),
  "synthetic protected value must not escape scenario processes",
);
deepEqual({
  blocked: missingCredentialScenario.values.blocked,
  evidenceChecked: missingCredentialScenario.values.evidenceChecked,
  manualStep1: missingCredentialScenario.values.manualStep1,
  manualStep2: missingCredentialScenario.values.manualStep2,
  manualStep3: missingCredentialScenario.values.manualStep3,
  manualStep4: missingCredentialScenario.values.manualStep4,
  manualStep5: missingCredentialScenario.values.manualStep5,
  builderNextVerification: missingCredentialScenario.values.builderNextVerification,
}, {
  blocked: "exact-token-revocation-or-invalidation-unproven",
  evidenceChecked: "post-creation-compensation-ran-with-incomplete-cleanup-proof",
  manualStep1: "privately-open-the-official-supabase-account-token-page",
  manualStep2: "locate-only-the-exact-token-name-stem-shown-above",
  manualStep3: "revoke-only-that-exact-token-if-it-is-still-listed",
  manualStep4: "confirm-that-exact-token-row-is-absent-without-sharing-token-list-content",
  manualStep5: "do-not-create-a-replacement-or-run-any-downstream-operation",
  builderNextVerification: "fixed-same-token-invalidation-proof-only",
});
const managementScenarioRefusal = runWrapperScenario("CleanupEnvironmentProof", "ManagementLifecycle");
equal(managementScenarioRefusal.status, 2, "ManagementLifecycle must reject SelfTest scenario injection");
equal(managementScenarioRefusal.values.code, "SELF_TEST_SCENARIO_REFUSED");
const retainedScenarioRefusal = runWrapperScenario("CleanupEnvironmentProof", "RetainedPilotVerify");
equal(retainedScenarioRefusal.status, 2, "RetainedPilotVerify must reject SelfTest scenario injection");
equal(retainedScenarioRefusal.values.code, "SELF_TEST_SCENARIO_REFUSED");

const protectedChildIsolation = runProtectedChildEnvironmentIsolation();
equal(protectedChildIsolation.status, 0, "protected-child isolation scenario must pass");
equal(protectedChildIsolation.values.state, "protected-child-environment-self-test");
equal(protectedChildIsolation.values.managementChildExitCode, "0");
equal(protectedChildIsolation.values.serviceRoleChildExitCode, "0");
equal(protectedChildIsolation.managementPreloadExecuted, false, "management preload must not execute");
equal(protectedChildIsolation.serviceRolePreloadExecuted, false, "service-role preload must not execute");
equal(protectedChildIsolation.genericPreloadExecuted, false, "generic preload must not execute");
deepEqual(protectedChildIsolation.managementObservation.keys, [
  "PP036D_CLEANUP_AFTER_FAILED_PROVIDER",
  "PP036D_MANAGEMENT_API_TOKEN",
  "PP036D_PRIOR_PROVIDER_PASS",
  "PP036D_REQUEST_COUNT",
  "PP036D_RETRY_JUSTIFIED",
  "PP036D_REVOCATION_CONFIRMED",
  "SystemRoot",
]);
deepEqual(protectedChildIsolation.serviceRoleObservation.keys, [
  "PP035K_RUN",
  "PP035K_SERVICE_ROLE_KEY",
  "PP035K_SUPABASE_URL",
  "SystemRoot",
]);
equal(protectedChildIsolation.managementObservation.systemRootPresent, true);
equal(protectedChildIsolation.serviceRoleObservation.systemRootPresent, true);
equal(protectedChildIsolation.managementObservation.managementCredentialPresent, true);
equal(protectedChildIsolation.managementObservation.managementCredentialMatches, true);
equal(protectedChildIsolation.managementObservation.serviceRoleCredentialPresent, false);
equal(protectedChildIsolation.managementObservation.managementSafeValuesMatch, true);
equal(protectedChildIsolation.managementObservation.serviceRoleSafeValuesMatch, false);
equal(protectedChildIsolation.serviceRoleObservation.serviceRoleCredentialPresent, true);
equal(protectedChildIsolation.serviceRoleObservation.serviceRoleCredentialMatches, true);
equal(protectedChildIsolation.serviceRoleObservation.managementCredentialPresent, false);
equal(protectedChildIsolation.serviceRoleObservation.serviceRoleSafeValuesMatch, true);
equal(protectedChildIsolation.serviceRoleObservation.managementSafeValuesMatch, false);
deepEqual(protectedChildIsolation.managementObservation.poisonNamesPresent, []);
deepEqual(protectedChildIsolation.serviceRoleObservation.poisonNamesPresent, []);
check(!protectedChildIsolation.combined.includes("synthetic-036d-management-environment-value"));
check(!protectedChildIsolation.combined.includes("synthetic-035k-service-role-environment-value"));
equal(protectedChildIsolation.values.protectedValuesEmitted, "false");
equal(protectedChildIsolation.values.remoteMutation, "none");
check(!protectedChildIsolation.persistedText.includes("synthetic-036d-management-environment-value"));
check(!protectedChildIsolation.persistedText.includes("synthetic-035k-service-role-environment-value"));
equal(protectedChildIsolation.parentEnvironmentRestored, true);
equal(protectedChildIsolation.environmentChangeCount, 13);
equal(protectedChildIsolation.temporaryDirectoryRemoved, true);
equal(protectedChildIsolation.preloadRemoved, true);
equal(protectedChildIsolation.helperRemoved, true);
equal(protectedChildIsolation.managementObservationRemoved, true);
equal(protectedChildIsolation.serviceRoleObservationRemoved, true);
equal(protectedChildIsolation.stderr, "");
check(!protectedChildIsolation.stdout.includes("preload-management"));
const managementFixtureRefusal = runProtectedFixtureArgumentRefusal("ManagementLifecycle");
deepEqual({ status: managementFixtureRefusal.status, code: managementFixtureRefusal.values.code }, { status: 2, code: "SELF_TEST_SCENARIO_REFUSED" });
const retainedFixtureRefusal = runProtectedFixtureArgumentRefusal("RetainedPilotVerify");
deepEqual({ status: retainedFixtureRefusal.status, code: retainedFixtureRefusal.values.code }, { status: 2, code: "SELF_TEST_SCENARIO_REFUSED" });

check(assertions + 1 === 295, `expected exactly 295 assertions, received ${assertions + 1}`);
console.log(`Sprint 036D protected management lifecycle deterministic tests passed (${assertions} assertions).`);
