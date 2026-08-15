import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const repositoryUrl = pathToFileURL(`${process.cwd()}\\`).href;
const serverStubUrl = `data:text/javascript,${encodeURIComponent(
  "export async function submitEnquiry(value, networkIdentifier) { return globalThis.__pp029uSubmit(value, networkIdentifier); }",
)}`;
const aliasLoader = `
export async function resolve(specifier, context, nextResolve) {
  if (specifier === "next/server") return nextResolve("next/server.js", context);
  if (specifier === "@/lib/enquiries/server") return { url: ${JSON.stringify(serverStubUrl)}, shortCircuit: true };
  if (specifier.startsWith("@/")) {
    const target = new URL(specifier.slice(2), ${JSON.stringify(repositoryUrl)});
    if (!/\\.[cm]?[jt]sx?$/.test(target.pathname)) target.pathname += ".ts";
    return { url: target.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}`;
register(`data:text/javascript,${encodeURIComponent(aliasLoader)}`, import.meta.url);

const {
  getPublicEnquiryAvailability,
  publicEnquirySubmissionIsEnabled,
  readEnquiryEnvironment,
} = await import("../lib/enquiries/env.ts");
const { POST } = await import("../app/api/enquiries/route.ts");

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };

const complete = {
  PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "enabled",
  PUBLIC_ENQUIRY_SMTP_HOST: "smtp.resend.com",
  PUBLIC_ENQUIRY_SMTP_PORT: "465",
  PUBLIC_ENQUIRY_SMTP_USER: "resend",
  PUBLIC_ENQUIRY_SMTP_PASS: "synthetic-dedicated-pass",
  SMTP_FROM: "sender@example.invalid",
  CONTACT_ENQUIRY_EMAIL: "recipient@example.invalid",
  ENQUIRY_ABUSE_HMAC_SECRET: "a".repeat(32),
  CRON_SECRET: "c".repeat(32),
  NEXT_PUBLIC_SUPABASE_URL: "https://uvskssaecdhxcgytkasc.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "synthetic-anon",
  SUPABASE_SERVICE_ROLE_KEY: "synthetic-service-role",
};

equal(publicEnquirySubmissionIsEnabled(complete), true, "exact lowercase enabled activates");
equal(publicEnquirySubmissionIsEnabled({}), false, "missing activation disabled");
equal(publicEnquirySubmissionIsEnabled({ PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "" }), false, "blank activation disabled");
equal(publicEnquirySubmissionIsEnabled({ PUBLIC_ENQUIRY_SUBMISSION_ENABLED: " enabled " }), false, "spaced activation disabled");
equal(publicEnquirySubmissionIsEnabled({ PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "Enabled" }), false, "mixed-case activation disabled");
equal(publicEnquirySubmissionIsEnabled({ PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "ENABLED" }), false, "uppercase activation disabled");
equal(publicEnquirySubmissionIsEnabled({ PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "true" }), false, "arbitrary activation disabled");
equal(getPublicEnquiryAvailability(complete).available, true, "complete exact environment available");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SUBMISSION_ENABLED: undefined }).available, false, "availability requires activation");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "" }).available, false, "blank availability disabled");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "Enabled" }).available, false, "case-folded availability disabled");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SMTP_HOST: "" }).available, false, "availability requires dedicated host");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SMTP_PORT: "" }).available, false, "availability requires dedicated port");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SMTP_USER: "" }).available, false, "availability requires dedicated user");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SMTP_PASS: "" }).available, false, "availability requires dedicated pass");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SMTP_HOST: "", SMTP_HOST: "smtp.resend.com" }).available, false, "generic host cannot repair dedicated host");
equal(getPublicEnquiryAvailability({ ...complete, PUBLIC_ENQUIRY_SUBMISSION_ENABLED: undefined }).providerClass, "resend", "disabled disclosure keeps finite provider class");
check(readEnquiryEnvironment({ ...complete, PUBLIC_ENQUIRY_SUBMISSION_ENABLED: undefined }) !== null, "delivery environment remains independent of activation");
check(/^PUBLIC_ENQUIRY_SUBMISSION_ENABLED=$/m.test(readFileSync(".env.example", "utf8")), "template contains blank server-only activation");
check(
  /PUBLIC_ENQUIRY_SUBMISSION_ENABLED === "enabled"/.test(readFileSync("lib/enquiries/env.ts", "utf8")),
  "source uses exact comparison without normalization",
);

const priorActivation = process.env.PUBLIC_ENQUIRY_SUBMISSION_ENABLED;
let submitCalls = 0;
globalThis.__pp029uSubmit = async () => {
  submitCalls += 1;
  return { result: "unavailable" };
};

try {
  delete process.env.PUBLIC_ENQUIRY_SUBMISSION_ENABLED;
  const disabledResponse = await POST(null);
  equal(disabledResponse.status, 503, "disabled null request returns 503");
  const disabledBody = await disabledResponse.json();
  equal(disabledBody.result, "unavailable", "disabled result sanitized");
  equal(disabledBody.message, "Online enquiries are temporarily unavailable. Please try again later.", "disabled message exact");
  equal(submitCalls, 0, "disabled null request performs no Product call");

  let poisonReads = 0;
  const poisonRequest = new Proxy({}, { get() { poisonReads += 1; throw new Error("request accessed"); } });
  equal((await POST(poisonRequest)).status, 503, "disabled poison request returns before request access");
  equal(poisonReads, 0, "disabled gate reads no request property");

  process.env.PUBLIC_ENQUIRY_SUBMISSION_ENABLED = "enabled";
  equal((await POST(new Request("https://candidate.example.invalid/api/enquiries", { method: "POST" }))).status, 415, "enabled path retains content-type refusal");
  equal((await POST(new Request("https://candidate.example.invalid/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://other.example.invalid", host: "candidate.example.invalid" },
    body: "{}",
  }))).status, 403, "enabled path retains origin refusal");
  equal((await POST(new Request("https://candidate.example.invalid/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://candidate.example.invalid", host: "candidate.example.invalid", "content-length": "999999" },
    body: "{}",
  }))).status, 413, "enabled path retains declared-length refusal");
  equal((await POST(new Request("https://candidate.example.invalid/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://candidate.example.invalid", host: "candidate.example.invalid" },
    body: "{",
  }))).status, 400, "enabled path retains malformed-JSON refusal");

  const valid = {
    trainerName: "Synthetic Trainer",
    stableName: "Synthetic Stable",
    stableAddress: "1 Example Road",
    phone: "+61 (0) 400 000 000",
    email: "synthetic.enquiry@example.invalid",
    horseVolume: "24",
    referredBy: "Synthetic Referrer",
    acknowledgement: true,
    website: "",
    requestId: "20000000-0000-4000-8000-000000000029",
  };
  const invalidResponse = await POST(new Request("https://candidate.example.invalid/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://candidate.example.invalid", host: "candidate.example.invalid" },
    body: JSON.stringify({ ...valid, trainerName: "x" }),
  }));
  equal(invalidResponse.status, 400, "enabled path retains field validation");
  check(Object.keys((await invalidResponse.json()).fields).length > 0, "enabled invalid response retains field errors");

  const unavailableResponse = await POST(new Request("https://candidate.example.invalid/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://candidate.example.invalid", host: "candidate.example.invalid" },
    body: JSON.stringify(valid),
  }));
  equal(unavailableResponse.status, 503, "enabled path retains unavailable result");
  equal(submitCalls, 1, "enabled valid request calls Product exactly once");

  globalThis.__pp029uSubmit = async () => ({ result: "received", reference: "PP-SYNTHETIC029U" });
  const receivedResponse = await POST(new Request("https://candidate.example.invalid/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://candidate.example.invalid", host: "candidate.example.invalid" },
    body: JSON.stringify({ ...valid, requestId: "20000000-0000-4000-8000-000000000030" }),
  }));
  equal(receivedResponse.status, 200, "enabled path retains received status");
  equal((await receivedResponse.json()).reference, "PP-SYNTHETIC029U", "enabled path retains received reference");
} finally {
  if (priorActivation === undefined) delete process.env.PUBLIC_ENQUIRY_SUBMISSION_ENABLED;
  else process.env.PUBLIC_ENQUIRY_SUBMISSION_ENABLED = priorActivation;
  delete globalThis.__pp029uSubmit;
}

if (assertions !== 36) throw new Error(`Sprint 029U public-gate assertion target changed: ${assertions}/36`);
console.log(`Sprint 029U public submission gate tests passed (${assertions}/${assertions}).`);
