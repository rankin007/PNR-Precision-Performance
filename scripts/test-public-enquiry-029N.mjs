import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ENQUIRY_BODY_LIMIT_BYTES, ENQUIRY_NOTICE_VERSION, enquiryKeys, parseEnquiryPayload, requestOriginIsSameHost } from "../lib/enquiries/contract.ts";
import { buildNotificationMessage, classifySmtpProvider, deliverNotification } from "../lib/enquiries/provider.ts";

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };

const valid = {
  trainerName: "  Synthetic Trainer  ", stableName: " Synthetic Stable ", stableAddress: "  1 Example Road  ",
  phone: "+61 (0) 400 000 000", email: "Synthetic.Enquiry@Example.Invalid", horseVolume: "24",
  referredBy: " Synthetic Referrer ", acknowledgement: true, website: "", requestId: "10000000-0000-4000-8000-000000000001",
};
const parsed = parseEnquiryPayload(valid);
check(parsed.ok, "valid enquiry parses");
if (!parsed.ok) throw new Error("fixture refused");
equal(parsed.value.trainerName, "Synthetic Trainer", "trainer normalized");
equal(parsed.value.stableName, "Synthetic Stable", "stable normalized");
equal(parsed.value.stableAddress, "1 Example Road", "address normalized");
equal(parsed.value.phone, "+61 (0) 400 000 000", "phone retained");
equal(parsed.value.email, "synthetic.enquiry@example.invalid", "email normalized");
equal(parsed.value.horseVolume, 24, "volume normalized");
equal(parsed.value.referredBy, "Synthetic Referrer", "referrer normalized");
equal(parsed.value.acknowledgement, true, "acknowledgement retained");
equal(parsed.value.website, "", "honeypot empty");
equal(parsed.value.requestId, valid.requestId, "request id retained");
equal(enquiryKeys.length, 10, "strict key count");
equal(ENQUIRY_NOTICE_VERSION, "2026-08-05", "notice version fixed");
equal(ENQUIRY_BODY_LIMIT_BYTES, 16384, "body limit bounded");

for (const [field, value] of [["trainerName", "x"], ["stableName", "x"], ["phone", "123"], ["email", "invalid"], ["horseVolume", 0], ["horseVolume", 10000], ["acknowledgement", false]]) {
  const result = parseEnquiryPayload({ ...valid, [field]: value });
  check(!result.ok, `${field} invalid boundary refused`);
}
check(!parseEnquiryPayload({ ...valid, stableAddress: "x".repeat(501) }).ok, "address maximum");
check(!parseEnquiryPayload({ ...valid, referredBy: "x".repeat(161) }).ok, "referrer maximum");
check(!parseEnquiryPayload({ ...valid, trainerName: "A\u0001B" }).ok, "control character refused");
check(!parseEnquiryPayload({ ...valid, requestId: "not-a-uuid" }).ok, "invalid UUID refused");
equal(parseEnquiryPayload({ ...valid, unexpected: true }).ok, false, "unknown key refused");
equal(parseEnquiryPayload({ ...valid, website: "filled" }).ok, false, "honeypot refused");
equal(parseEnquiryPayload(null).ok, false, "null refused");
equal(parseEnquiryPayload([]).ok, false, "array refused");
equal(parseEnquiryPayload("payload").ok, false, "string refused");
check(parseEnquiryPayload({ ...valid, stableAddress: "", referredBy: "" }).ok, "optional fields may be empty");
check(parseEnquiryPayload({ ...valid, trainerName: "A".repeat(120), stableName: "S".repeat(160), horseVolume: 9999 }).ok, "upper boundaries accepted");
check(requestOriginIsSameHost("https://example.test/api/enquiries", "https://example.test", "example.test"), "same origin accepted");
check(!requestOriginIsSameHost("https://example.test/api/enquiries", "https://evil.test", "example.test"), "foreign origin refused");
check(!requestOriginIsSameHost("https://example.test/api/enquiries", null, "example.test"), "missing origin refused");
check(!requestOriginIsSameHost("https://example.test/api/enquiries", "http://example.test", "example.test"), "insecure origin refused");

for (const [host, expected] of [
  ["smtp.gmail.com", "google_workspace"], ["smtp-relay.gmail.com", "google_workspace"], ["smtp.office365.com", "microsoft_365"],
  ["smtp.resend.com", "resend"], ["smtp.postmarkapp.com", "postmark"], ["smtp.mailgun.org", "mailgun"],
  ["smtp.eu.mailgun.org", "mailgun"], ["smtp.sendgrid.net", "sendgrid"], ["email-smtp.ap-southeast-2.amazonaws.com", "amazon_ses"],
]) equal(classifySmtpProvider(host)?.providerClass, expected, `${expected} classified`);
for (const host of ["", "unknown.example", "https://smtp.gmail.com", "smtp.gmail.com:465", "user@smtp.gmail.com"]) {
  equal(classifySmtpProvider(host), null, "unapproved host refused");
}

const environment = {
  smtpHost: "smtp.resend.com", smtpPort: 465, smtpUser: "opaque-user", smtpPass: "opaque-pass",
  smtpFrom: "sender@example.invalid", recipient: "recipient@example.invalid", abuseSecret: "a".repeat(32), cronSecret: "c".repeat(32),
  provider: classifySmtpProvider("smtp.resend.com"),
};
const message = buildNotificationMessage(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z");
equal(message.to, environment.recipient, "single recipient");
equal(message.from, environment.smtpFrom, "configured sender");
equal(message.replyTo, parsed.value.email, "safe reply-to");
check(message.subject.includes("PP-ABCDEF0123456789"), "reference subject");
check(message.text.includes("Synthetic Trainer"), "necessary trainer value");
check(message.text.includes("Approximate horse volume: 24"), "necessary volume value");
check(!("html" in message), "no HTML");
check(!("attachments" in message), "no attachments");

const sent = await deliverNotification(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z", { sendMail: async () => ({ accepted: [environment.recipient], rejected: [] }) });
equal(sent.state, "sent", "one acceptance sent");
const ambiguousResolved = await deliverNotification(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z", { sendMail: async () => ({ accepted: [], rejected: [] }) });
equal(ambiguousResolved.state, "delivery_unknown", "resolved ambiguity not retried");
for (const [command, state] of [["CONN", "retryable"], ["AUTH", "retryable"], ["RCPT TO", "retryable"], ["DATA", "delivery_unknown"], ["OTHER", "delivery_unknown"]]) {
  const outcome = await deliverNotification(environment, parsed.value, "PP-ABCDEF0123456789", "2026-08-05T00:00:00.000Z", { sendMail: async () => { throw Object.assign(new Error("protected"), { command }); } });
  equal(outcome.state, state, `${command} classified safely`);
}

const form = readFileSync("components/forms/trainer-enquiry-form.tsx", "utf8");
const privacy = readFileSync("app/privacy/page.tsx", "utf8");
const publicRoute = readFileSync("app/api/enquiries/route.ts", "utf8");
const server = readFileSync("lib/enquiries/server.ts", "utf8");
check(server.includes('rpc<AcceptedRow[]>("accept_trainer_enquiry"'), "server uses atomic persistence RPC");
check(server.includes('hmac(dependencies.environment.abuseSecret, "idempotency"') && server.includes('hmac(dependencies.environment.abuseSecret, "network-hour"'), "server derives both keyed hashes");
check(server.indexOf("accept_trainer_enquiry") < server.indexOf("claim_trainer_enquiry_notification"), "persistence precedes notification claim");
check(server.indexOf("claim_trainer_enquiry_notification") < server.indexOf("notifyClaim(claimed"), "claim precedes network delivery");
check(server.includes("complete_trainer_enquiry_notification") && server.includes("notification_attempts"), "notification completion and attempt status retained");
check(server.includes("timingSafeEqual") && server.includes('startsWith("Bearer ")'), "internal boundary uses constant-time bearer check");
check(server.includes("maintain_trainer_enquiries") && server.includes("claim_trainer_enquiry_retry_batch"), "maintenance is bounded and retry-aware");
check(server.includes("trainer_enquiry_fixture_status") && server.includes("delete_trainer_enquiry_fixture") && server.includes("prove_trainer_enquiry_rate_limit"), "fixture operations are exact RPCs");
check(!server.includes("console.") && !server.includes("SMTP_HOST"), "server emits no payload or binding logs");
check(form.includes("aria-live=\"polite\"") && form.includes("summaryRef.current?.focus"), "accessible progress and focus");
check(form.includes("not marketing consent") && form.includes("Privacy notice"), "collection acknowledgement copy");
check(privacy.includes("Singapore") && privacy.includes("90 days") && privacy.includes("24 hours"), "retention and region notice");
check(privacy.includes("access, correction or deletion") && privacy.includes("do not sell"), "rights and disclosure notice");
check(publicRoute.includes("ENQUIRY_BODY_LIMIT_BYTES") && publicRoute.includes("requestOriginIsSameHost"), "route body and origin guards");
check(!publicRoute.includes("console."), "public route has no payload logging");

if (assertions !== 80) throw new Error(`Sprint 029N core assertion target changed: ${assertions}/80`);
console.log(`Sprint 029N public enquiry core tests passed (${assertions}/${assertions}).`);
