import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseEnquiryPayload } from "../lib/enquiries/contract.ts";
import { classifyProviderError, classifySmtpProvider, deliverNotification, verifySmtpTransport } from "../lib/enquiries/provider.ts";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };
const deepEqual = (actual, expected, message) => { assertions += 1; assert.deepEqual(actual, expected, message); };

const valid = {
  trainerName: "  Synthetic   Trainer  ",
  stableName: " Synthetic Stable ",
  stableAddress: "  1   Example Road  ",
  phone: "+61 (0) 400 000 000",
  email: "Synthetic.Enquiry@Example.Invalid",
  horseVolume: "24",
  referredBy: " Synthetic Referrer ",
  acknowledgement: true,
  website: "",
  requestId: "20000000-0000-4000-8000-000000000001",
};

const parsed = parseEnquiryPayload(valid);
check(parsed.ok, "ordinary spaced enquiry parses");
if (!parsed.ok) throw new Error("valid fixture refused");
equal(parsed.value.trainerName, "Synthetic Trainer", "trainer spaces normalize");
equal(parsed.value.stableName, "Synthetic Stable", "stable spaces normalize");
equal(parsed.value.stableAddress, "1 Example Road", "address spaces normalize");
equal(parsed.value.email, "synthetic.enquiry@example.invalid", "email normalizes");
equal(parsed.value.horseVolume, 24, "string volume normalizes");
equal(parsed.value.referredBy, "Synthetic Referrer", "referrer normalizes");
equal(parsed.value.requestId, valid.requestId, "UUID remains stable");
equal(parsed.value.website, "", "empty honeypot remains empty");
equal(parsed.value.acknowledgement, true, "acknowledgement remains true");

const rawStringFields = [
  "trainerName", "stableName", "stableAddress", "phone", "email", "horseVolume", "referredBy", "website", "requestId",
];
for (const field of rawStringFields) {
  for (const control of ["\n", "\r", "\t"]) {
    const result = parseEnquiryPayload({ ...valid, [field]: `${valid[field]}${control}` });
    check(!result.ok && result.kind === "invalid", `${field} rejects raw ${JSON.stringify(control)}`);
  }
}
check([...Array(32).keys(), 127].every((code) => {
  const result = parseEnquiryPayload({ ...valid, trainerName: `Trainer${String.fromCharCode(code)}Name` });
  return !result.ok && result.kind === "invalid";
}), "all C0 and DEL controls are rejected raw");

const ordinary = parseEnquiryPayload({ ...valid, trainerName: "  Synthetic    Trainer  ", stableAddress: "  10    Safe   Road " });
check(ordinary.ok, "ordinary spaces remain accepted");
if (!ordinary.ok) throw new Error("ordinary-space fixture refused");
equal(ordinary.value.trainerName, "Synthetic Trainer", "ordinary trainer spaces collapse");
equal(ordinary.value.phone, "+61 (0) 400 000 000", "ordinary phone spaces remain valid");

for (const [error, expected, message] of [
  [{ command: "AUTH PLAIN" }, { state: "retryable", errorClass: "authentication" }, "AUTH PLAIN is authentication"],
  [{ code: "EAUTH" }, { state: "retryable", errorClass: "authentication" }, "EAUTH is authentication"],
  [{ responseCode: 535 }, { state: "retryable", errorClass: "authentication" }, "535 is authentication"],
  [{ command: "CONN" }, { state: "retryable", errorClass: "connection" }, "CONN is connection"],
  [{ command: "STARTTLS" }, { state: "retryable", errorClass: "connection" }, "STARTTLS is connection"],
  [{ code: "ESOCKET" }, { state: "retryable", errorClass: "connection" }, "TLS/socket is connection"],
  [{ command: "RCPT TO" }, { state: "retryable", errorClass: "pre_envelope" }, "RCPT is pre-envelope"],
  [{ code: "EENVELOPE" }, { state: "retryable", errorClass: "pre_envelope" }, "EENVELOPE is pre-envelope"],
  [{ command: "DATA" }, { state: "delivery_unknown", errorClass: "ambiguous" }, "DATA is terminal ambiguous"],
  [{ command: "DOT" }, { state: "delivery_unknown", errorClass: "ambiguous" }, "DOT is terminal ambiguous"],
  [{ command: "UNKNOWN" }, { state: "delivery_unknown", errorClass: "unexpected" }, "unknown command is terminal unexpected"],
  [new Error("protected provider detail"), { state: "delivery_unknown", errorClass: "unexpected" }, "message-only error is not inspected"],
  [{ command: "EHLO" }, { state: "retryable", errorClass: "pre_envelope" }, "EHLO is pre-envelope"],
]) deepEqual(classifyProviderError(error), expected, message);

const environment = {
  smtpHost: "smtp.resend.com",
  smtpPort: 465,
  smtpUser: "opaque-user",
  smtpPass: "opaque-pass",
  smtpFrom: "sender@example.invalid",
  recipient: "recipient@example.invalid",
  abuseSecret: "a".repeat(32),
  cronSecret: "c".repeat(32),
  provider: classifySmtpProvider("smtp.resend.com"),
};
let verifyCalls = 0;
let sendMailAccesses = 0;
const verifyOnly = {
  verify: async () => { verifyCalls += 1; return true; },
  get sendMail() { sendMailAccesses += 1; throw new Error("sendMail must not be read by preflight"); },
};
deepEqual(await verifySmtpTransport(environment, verifyOnly), { status: "ready", errorClass: null }, "verify success is ready");
equal(verifyCalls, 1, "preflight calls verify exactly once");
deepEqual(await verifySmtpTransport(environment, { verify: async () => { throw { command: "AUTH PLAIN" }; } }), { status: "unavailable", errorClass: "authentication" }, "verify auth failure is sanitized");
deepEqual(await verifySmtpTransport(environment, { verify: async () => { throw { responseCode: 535 }; } }), { status: "unavailable", errorClass: "authentication" }, "verify 535 failure is sanitized");
deepEqual(await verifySmtpTransport(environment, { verify: async () => false }), { status: "unavailable", errorClass: "unexpected" }, "false verify result fails closed");
equal(sendMailAccesses, 0, "preflight never reads sendMail");

deepEqual(
  await deliverNotification(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z", { sendMail: async () => ({ accepted: [environment.recipient], rejected: [] }) }),
  { state: "sent", errorClass: null },
  "one accepted recipient is sent",
);
deepEqual(
  await deliverNotification(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z", { sendMail: async () => { throw { command: "AUTH PLAIN" }; } }),
  { state: "retryable", errorClass: "authentication" },
  "delivery uses prospective auth classification",
);
deepEqual(
  await deliverNotification(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z", { sendMail: async () => { throw { command: "DATA" }; } }),
  { state: "delivery_unknown", errorClass: "ambiguous" },
  "delivery keeps DATA terminal ambiguous",
);

const contractSource = readFileSync("lib/enquiries/contract.ts", "utf8");
const providerSource = readFileSync("lib/enquiries/provider.ts", "utf8");
const serverSource = readFileSync("lib/enquiries/server.ts", "utf8");
const internalRouteSource = readFileSync("app/api/internal/enquiries/route.ts", "utf8");
const parseSource = contractSource.slice(contractSource.indexOf("export function parseEnquiryPayload"));
check(parseSource.indexOf("enquiryKeys.some") < parseSource.indexOf("const website = normalizedText"), "raw control gate precedes every normalization");
check(!providerSource.includes("console.") && !providerSource.includes("error.message") && !/properties\.response(?!Code)/.test(providerSource), "provider exposes no raw provider detail or logging");
check(providerSource.includes("connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS") && providerSource.includes("greetingTimeout: SMTP_GREETING_TIMEOUT_MS") && providerSource.includes("socketTimeout: SMTP_SOCKET_TIMEOUT_MS"), "SMTP transport has bounded timeouts");
check(serverSource.includes('const RETIRED_ENQUIRY_REFERENCE = "PP-3B4BDEE2D55CB313"') && serverSource.indexOf("if (publicReference === RETIRED_ENQUIRY_REFERENCE)") < serverSource.indexOf('rpc<AcceptedRow[]>("accept_trainer_enquiry"'), "historical reference cannot be recreated");
check(serverSource.indexOf("row.public_reference === RETIRED_ENQUIRY_REFERENCE") < serverSource.indexOf("dependencies.deliver("), "historical reference cannot be delivered or retried");
check(serverSource.includes('rpc<Array<{') && serverSource.includes('>>("prove_trainer_enquiry_retention")') && serverSource.includes("enquiryRetained: 1 as const") && serverSource.includes("fixtureResidue: 0 as const") && serverSource.includes('rpc<EnquirySchemaStatusRow[]>("trainer_enquiry_schema_status")') && serverSource.includes('rpc<EnquiryRetentionStatusRow[]>("trainer_enquiry_retention_status")') && serverSource.includes("bucket_row_count: retention.bucket_row_count") && serverSource.includes("cleanup_job_active_count: retention.cleanup_job_active_count") && serverSource.includes("].every(isSafeCount)") && !serverSource.includes("...schema") && !serverSource.includes("...retention"), "retention proof and schema status map only exact finite sanitized counts");
check(serverSource.includes("dependencies.verify(dependencies.environment)") && serverSource.includes('result: "smtp-preflight" as const') && serverSource.includes("providerClass: dependencies.environment.provider.providerClass"), "server preflight is finite and sanitized");
check(internalRouteSource.includes('body.action === "smtp-preflight"') && internalRouteSource.includes('body.action === "retention-proof"') && internalRouteSource.includes("if (!authorized(request))"), "new internal actions retain authentication boundary");
check(serverSource.includes("timingSafeEqual") && serverSource.includes('authorization?.startsWith("Bearer ")') && serverSource.includes("suppliedBytes.length === expectedBytes.length"), "constant-time bearer boundary remains intact");

if (assertions !== 72) throw new Error(`Sprint 029O core assertion target changed: ${assertions}/72`);
console.log(`Sprint 029O public enquiry corrective tests passed (${assertions}/${assertions}).`);
