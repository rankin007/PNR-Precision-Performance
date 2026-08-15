import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const repositoryUrl = pathToFileURL(`${process.cwd()}\\`).href;
const aliasLoader = `
export async function resolve(specifier, context, nextResolve) {
  if (specifier === "next/server") return nextResolve("next/server.js", context);
  if (specifier.startsWith("@/")) {
    const target = new URL(specifier.slice(2), ${JSON.stringify(repositoryUrl)});
    if (!/\\.[cm]?[jt]sx?$/.test(target.pathname)) target.pathname += ".ts";
    return { url: target.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}`;
register(`data:text/javascript,${encodeURIComponent(aliasLoader)}`, import.meta.url);

const {
  PREFLIGHT_AUTH_ENVIRONMENT_NAMES,
  authorizeInternalEnquiryPost,
  decideDedicatedSmtpPreflight,
  runDedicatedSmtpPreflight,
} = await import("../lib/enquiries/preflight-auth.ts");

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };

const bearer = Buffer.alloc(32, 7).toString("base64url");
const verifier = createHash("sha256").update(bearer, "utf8").digest("hex");
const notBefore = "2026-08-06T02:00:00.000Z";
const expiresAt = "2026-08-06T02:15:00.000Z";
const now = new Date("2026-08-06T02:01:00.000Z");
const authSource = {
  PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256: verifier,
  PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE: notBefore,
  PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT: expiresAt,
};
const authorization = `Bearer ${bearer}`;
const decide = (...values) => {
  const action = values.length > 0 ? values[0] : "smtp-preflight";
  const source = values.length > 1 ? values[1] : authSource;
  const at = values.length > 2 ? values[2] : now;
  const header = values.length > 3 ? values[3] : authorization;
  return decideDedicatedSmtpPreflight(header, action, source, at);
};

equal(PREFLIGHT_AUTH_ENVIRONMENT_NAMES.length, 3, "three temporary auth names");
check(PREFLIGHT_AUTH_ENVIRONMENT_NAMES.includes("PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256"), "hash name exact");
check(PREFLIGHT_AUTH_ENVIRONMENT_NAMES.includes("PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE"), "not-before name exact");
check(PREFLIGHT_AUTH_ENVIRONMENT_NAMES.includes("PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT"), "expiry name exact");
equal(decide(), "authorized", "valid in-window bearer authorized");
equal(decide("smtp-preflight", authSource, new Date(notBefore)), "authorized", "not-before boundary authorized");
equal(decide("smtp-preflight", authSource, new Date(Date.parse(notBefore) - 1)), "dedicated-denied", "before window denied");
equal(decide("smtp-preflight", authSource, new Date(expiresAt)), "dedicated-denied", "expiry boundary denied");
equal(decide("smtp-preflight", authSource, new Date(Date.parse(expiresAt) + 1)), "dedicated-denied", "after expiry denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT: "2026-08-06T02:15:00.000Z" }), "authorized", "exact fifteen-minute window authorized");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT: "2026-08-06T02:15:00.001Z" }), "dedicated-denied", "overlong window denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT: notBefore }), "dedicated-denied", "equal window denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE: expiresAt }), "dedicated-denied", "reversed window denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE: "not-a-time" }), "dedicated-denied", "malformed not-before denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT: "not-a-time" }), "dedicated-denied", "malformed expiry denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE: "2026-08-06T02:00:00Z" }), "dedicated-denied", "non-canonical timestamp denied");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256: verifier.toUpperCase() }), "not-dedicated", "uppercase verifier refused");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256: verifier.slice(2) }), "not-dedicated", "short verifier refused");
equal(decide("smtp-preflight", { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256: `${verifier.slice(0, 63)}z` }), "not-dedicated", "non-hex verifier refused");
equal(decide("smtp-preflight", authSource, now, null), "not-dedicated", "absent authorization is not dedicated");
equal(decide("smtp-preflight", authSource, now, `Basic ${bearer}`), "not-dedicated", "wrong scheme is not dedicated");
equal(decide("smtp-preflight", authSource, now, `Bearer ${"x".repeat(43)}`), "not-dedicated", "wrong bearer is not dedicated");
const shortBearer = "short";
const shortSource = { ...authSource, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256: createHash("sha256").update(shortBearer).digest("hex") };
equal(decide("smtp-preflight", shortSource, now, `Bearer ${shortBearer}`), "dedicated-denied", "matching short bearer denied");
equal(decide("smtp_preflight"), "dedicated-denied", "near-match action denied");
equal(decide(undefined), "dedicated-denied", "missing action denied");
equal(decide(7), "dedicated-denied", "non-string action denied");
equal(decide("maintain"), "dedicated-denied", "maintain denied");
equal(decide("schema-status"), "dedicated-denied", "schema-status denied");
equal(decide("status"), "dedicated-denied", "status denied");
equal(decide("purge-fixture"), "dedicated-denied", "purge denied");
equal(decide("rate-limit-proof"), "dedicated-denied", "rate proof denied");
equal(decide("retention-proof"), "dedicated-denied", "retention proof denied");
equal(decide("unknown"), "dedicated-denied", "unknown action denied");
const authReads = new Set();
const guardedAuthSource = new Proxy(authSource, { get(target, property) { if (property === "CRON_SECRET") throw new Error("shared access"); authReads.add(property); return target[property]; } });
equal(decide("smtp-preflight", guardedAuthSource), "authorized", "dedicated auth succeeds with guarded shared secret");
check(!authReads.has("CRON_SECRET"), "dedicated verifier never reads shared secret");

const smtpSource = {
  PUBLIC_ENQUIRY_SMTP_HOST: " smtp.resend.com ",
  PUBLIC_ENQUIRY_SMTP_PORT: "465",
  PUBLIC_ENQUIRY_SMTP_USER: " resend ",
  PUBLIC_ENQUIRY_SMTP_PASS: "synthetic-pass-value",
};
let verifiedConfiguration = null;
let verifyCalls = 0;
const preflight = await runDedicatedSmtpPreflight(smtpSource, async (configuration) => {
  verifyCalls += 1;
  verifiedConfiguration = configuration;
  return { status: "ready", errorClass: null };
});
equal(preflight.result, "smtp-preflight", "dedicated preflight result exact");
equal(preflight.status, "ready", "dedicated preflight ready");
equal(preflight.providerClass, "resend", "dedicated provider finite");
equal(preflight.errorClass, null, "ready error null");
equal(verifyCalls, 1, "transport verified exactly once");
equal(verifiedConfiguration.smtpHost, "smtp.resend.com", "host normalized");
equal(verifiedConfiguration.smtpPort, 465, "port numeric");
equal(verifiedConfiguration.smtpUser, "resend", "user normalized");
equal(verifiedConfiguration.smtpPass, "synthetic-pass-value", "pass remains process-only input");
equal((await runDedicatedSmtpPreflight({ ...smtpSource, PUBLIC_ENQUIRY_SMTP_HOST: "" }, async () => { throw new Error("must not run"); })).status, "unavailable", "missing host unavailable");
equal((await runDedicatedSmtpPreflight({ ...smtpSource, PUBLIC_ENQUIRY_SMTP_PASS: "" }, async () => { throw new Error("must not run"); })).status, "unavailable", "missing pass unavailable");
deepEqual(await runDedicatedSmtpPreflight({ ...smtpSource, PUBLIC_ENQUIRY_SMTP_HOST: "smtp.example.invalid" }, async () => { throw new Error("must not run"); }), { result: "smtp-preflight", status: "unavailable", providerClass: null, errorClass: "unexpected" }, "unknown provider unavailable without verification");

function request(body, contentType = "application/json", header = authorization) {
  return new Request("https://candidate.example.invalid/api/internal/enquiries", {
    method: "POST",
    headers: { ...(contentType ? { "content-type": contentType } : {}), ...(header ? { authorization: header } : {}) },
    body,
  });
}

function admissionDependencies({ shared = false, dedicatedSource = guardedAuthSource } = {}) {
  const counters = { sharedReads: 0, handlers: 0 };
  const sharedSecret = "s".repeat(32);
  const admit = (candidateRequest) => authorizeInternalEnquiryPost(
    candidateRequest,
    () => { counters.sharedReads += 1; return shared && candidateRequest.headers.get("authorization") === `Bearer ${sharedSecret}`; },
    (header, action) => decideDedicatedSmtpPreflight(header, action, dedicatedSource, now),
  );
  return { admit, counters, sharedSecret };
}

const dedicatedDeps = admissionDependencies();
const dedicatedAdmission = await dedicatedDeps.admit(request(JSON.stringify({ action: "smtp-preflight" })));
equal(dedicatedAdmission.kind, "dedicated", "dedicated exact request admitted");
deepEqual(dedicatedAdmission, { kind: "dedicated" }, "dedicated admission contains no protected detail");
equal(dedicatedDeps.counters.handlers, 0, "admission performs no handler call");
equal(dedicatedDeps.counters.sharedReads, 0, "dedicated request avoids shared environment");
equal("dedicated" in dedicatedAdmission ? 1 : 0, 0, "admission carries no server dependency");
check(!authReads.has("CRON_SECRET"), "route dedicated path never reads guarded shared secret");
const otherAction = await dedicatedDeps.admit(request(JSON.stringify({ action: "maintain" })));
check(otherAction.kind === "denied" && dedicatedDeps.counters.sharedReads === 0 && dedicatedDeps.counters.handlers === 0, "dedicated other action denied before shared reads and handlers");

const unauthorizedDeps = admissionDependencies({ dedicatedSource: authSource });
equal((await unauthorizedDeps.admit(request("plain", "text/plain", `Bearer ${"w".repeat(43)}`))).kind, "denied", "unauthorized non-json remains denied");
equal((await unauthorizedDeps.admit(request("{", "application/json", `Bearer ${"w".repeat(43)}`))).kind, "denied", "unauthorized malformed JSON remains denied");
equal((await unauthorizedDeps.admit(request(`{"padding":"${"x".repeat(1100)}"}`, "application/json", `Bearer ${"w".repeat(43)}`))).kind, "denied", "unauthorized oversized JSON remains denied");
const sharedDeps = admissionDependencies({ shared: true, dedicatedSource: authSource });
const sharedHeader = `Bearer ${sharedDeps.sharedSecret}`;
equal((await sharedDeps.admit(request("plain", "text/plain", sharedHeader))).status, 415, "shared non-json retains 415");
equal((await sharedDeps.admit(request("{", "application/json", sharedHeader))).status, 400, "shared malformed JSON retains 400");
equal((await sharedDeps.admit(request(`{"padding":"${"x".repeat(1100)}"}`, "application/json", sharedHeader))).status, 400, "shared oversized JSON retains 400");
const dedicatedNonJsonDeps = admissionDependencies();
const dedicatedNonJson = await dedicatedNonJsonDeps.admit(request("plain", "text/plain"));
check(dedicatedNonJson.kind === "denied" && dedicatedNonJsonDeps.counters.sharedReads === 0 && dedicatedNonJsonDeps.counters.handlers === 0, "matching dedicated non-json denied without shared reads or handlers");
const dedicatedMalformedDeps = admissionDependencies();
const dedicatedMalformed = await dedicatedMalformedDeps.admit(request("{", "application/json"));
check(dedicatedMalformed.kind === "denied" && dedicatedMalformedDeps.counters.sharedReads === 0 && dedicatedMalformedDeps.counters.handlers === 0, "matching dedicated malformed JSON denied without shared reads or handlers");
const sharedMaintainDeps = admissionDependencies({ shared: true });
const sharedMaintain = await sharedMaintainDeps.admit(request(JSON.stringify({ action: "maintain", reference: "" }), "application/json", `Bearer ${sharedMaintainDeps.sharedSecret}`));
check(sharedMaintain.kind === "shared" && sharedMaintain.action === "maintain" && sharedMaintainDeps.counters.sharedReads === 1, "shared maintenance admission unchanged");
const sharedSmtpDeps = admissionDependencies({ shared: true });
const sharedSmtp = await sharedSmtpDeps.admit(request(JSON.stringify({ action: "smtp-preflight" }), "application/json", `Bearer ${sharedSmtpDeps.sharedSecret}`));
check(sharedSmtp.kind === "shared" && sharedSmtp.action === "smtp-preflight" && sharedSmtpDeps.counters.sharedReads === 1, "shared SMTP admission remains shared path");

if (assertions !== 64) throw new Error(`Sprint 029Q core assertion target changed: ${assertions}/64`);
console.log(`Sprint 029Q dedicated preflight auth and route tests passed (${assertions}/${assertions}).`);
