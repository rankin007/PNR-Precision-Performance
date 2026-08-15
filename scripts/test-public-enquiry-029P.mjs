import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const repositoryUrl = pathToFileURL(`${process.cwd()}\\`).href;
const aliasLoader = `
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = new URL(specifier.slice(2), ${JSON.stringify(repositoryUrl)});
    if (!/\\.[cm]?[jt]sx?$/.test(target.pathname)) target.pathname += ".ts";
    return { url: target.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}`;
register(`data:text/javascript,${encodeURIComponent(aliasLoader)}`, import.meta.url);
const { getPublicEnquiryAvailability, readEnquiryEnvironment } = await import("../lib/enquiries/env.ts");

let assertions = 0;
const check = (value, message) => { assertions += 1; assert(value, message); };
const equal = (actual, expected, message) => { assertions += 1; assert.equal(actual, expected, message); };

const retained = {
  SMTP_FROM: "sender@example.invalid",
  CONTACT_ENQUIRY_EMAIL: "recipient@example.invalid",
  ENQUIRY_ABUSE_HMAC_SECRET: "a".repeat(32),
  CRON_SECRET: "c".repeat(32),
  NEXT_PUBLIC_SUPABASE_URL: "https://uvskssaecdhxcgytkasc.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "opaque-anon-value",
  SUPABASE_SERVICE_ROLE_KEY: "opaque-service-value",
};
const dedicated = {
  PUBLIC_ENQUIRY_SUBMISSION_ENABLED: "enabled",
  ...retained,
  PUBLIC_ENQUIRY_SMTP_HOST: " smtp.resend.com ",
  PUBLIC_ENQUIRY_SMTP_PORT: "465",
  PUBLIC_ENQUIRY_SMTP_USER: " resend ",
  PUBLIC_ENQUIRY_SMTP_PASS: "opaque-dedicated-pass",
};
const environment = readEnquiryEnvironment(dedicated);
check(environment !== null, "complete dedicated environment is available");
if (!environment) throw new Error("complete dedicated environment refused");
equal(environment.smtpHost, "smtp.resend.com", "dedicated host is normalized");
equal(environment.smtpPort, 465, "dedicated port is numeric");
equal(environment.smtpUser, "resend", "dedicated user is normalized");
equal(environment.smtpPass, "opaque-dedicated-pass", "dedicated pass is retained in server memory");
equal(environment.provider.providerClass, "resend", "dedicated host classifies as Resend");

const oldGenericOnly = {
  ...retained,
  SMTP_HOST: "smtp.resend.com",
  SMTP_PORT: "465",
  SMTP_USER: "resend",
  SMTP_PASS: "opaque-old-pass",
};
equal(readEnquiryEnvironment(oldGenericOnly), null, "old generic-only transport is unavailable");
equal(getPublicEnquiryAvailability(oldGenericOnly).available, false, "old generic-only public availability is false");

for (const [dedicatedName, genericName] of [
  ["PUBLIC_ENQUIRY_SMTP_HOST", "SMTP_HOST"],
  ["PUBLIC_ENQUIRY_SMTP_PORT", "SMTP_PORT"],
  ["PUBLIC_ENQUIRY_SMTP_USER", "SMTP_USER"],
  ["PUBLIC_ENQUIRY_SMTP_PASS", "SMTP_PASS"],
]) {
  const missing = { ...dedicated, [dedicatedName]: "" };
  equal(readEnquiryEnvironment(missing), null, `${dedicatedName} is required`);
  equal(readEnquiryEnvironment({ ...missing, [genericName]: oldGenericOnly[genericName] }), null, `${genericName} cannot repair ${dedicatedName}`);
}

const availability = getPublicEnquiryAvailability(dedicated);
equal(availability.available, true, "complete dedicated transport is publicly available");
equal(availability.providerClass, "resend", "availability uses the dedicated provider");
equal(availability.providerLabel, "Resend email delivery services", "availability retains the finite Resend label");

const environmentSource = readFileSync("lib/enquiries/env.ts", "utf8");
const templateSource = readFileSync(".env.example", "utf8");
check(environmentSource.startsWith('import "server-only";'), "environment boundary remains server-only");
check(!/source\.SMTP_(?:HOST|PORT|USER|PASS)\b/.test(environmentSource), "environment source has no generic transport fallback");
check(
  ["HOST", "PORT", "USER", "PASS"].every((suffix) => templateSource.includes(`PUBLIC_ENQUIRY_SMTP_${suffix}=`)) &&
    !/^SMTP_(?:HOST|PORT|USER|PASS)=/m.test(templateSource) && /^SMTP_FROM=/m.test(templateSource),
  "environment template exposes only dedicated transport placeholders and retains SMTP_FROM",
);

if (assertions !== 22) throw new Error(`Sprint 029P environment assertion target changed: ${assertions}/22`);
console.log(`Sprint 029P dedicated environment tests passed (${assertions}/${assertions}).`);
