import { readFileSync } from "node:fs";

const home = readFileSync("app/page.tsx", "utf8");
const pricing = readFileSync("app/pricing/page.tsx", "utf8");
const form = readFileSync("components/forms/trainer-enquiry-form.tsx", "utf8");
const checkout = readFileSync("app/api/checkout/route.ts", "utf8");
const protectedShell = [
  readFileSync("app/(portal)/layout.tsx", "utf8"),
  readFileSync("app/(admin)/layout.tsx", "utf8"),
  readFileSync("app/(ops)/layout.tsx", "utf8"),
].join("\n");

const assertions = [
  [home.includes('href="#enquiry"') && home.includes("Request Trainer Consultation"), "primary CTA targets the on-page enquiry"],
  [home.includes('id="how-it-works"') && home.includes("anonymised-hydration-demonstration.png"), "How It Works destination uses labelled approved demonstration content"],
  [home.includes("The Precision Performance Approach") && !home.includes("Testimonials and Good News Stories") && !home.includes("share.icloud.com"), "temporary approach section does not imply unfinished testimonial content or hotlink expiring media"],
  [pricing.includes("AUD $5,500") && pricing.includes("Including GST") && pricing.includes("Postage additional"), "Pricing contains confirmed commercial terms"],
  [pricing.includes("Additional services and software options are discussed during consultation.") && !pricing.includes("$150") && !pricing.includes("$250"), "visitor-facing consultation wording replaces speculative service and software pricing"],
  [!pricing.includes("checkout") && !pricing.includes("12 months") && !pricing.includes("twelve-month"), "checkout and undefined twelve-month offer are absent"],
  [form.includes("noValidate onSubmit={validate}") && !form.includes("action=") && !form.includes("fetch("), "form validation is client-only with no transmission action"],
  [form.includes("trainerName") && form.includes("stableName") && form.includes("stableAddress") && form.includes("phone") && form.includes("email") && form.includes("horseVolume") && form.includes("referredBy"), "form contains exactly the approved enquiry field concepts"],
  [form.includes("No information has been sent or saved") && form.includes("submission unavailable"), "non-submission state is explicit"],
  [checkout.includes("checkout=under-construction"), "checkout route remains gated"],
  [protectedShell.includes("requirePortalAppContext") && protectedShell.includes("requireAdminAppContext"), "protected application shells remain authentication and role gated"],
];

const failures = assertions.filter(([passed]) => !passed).map(([, label]) => label);
if (failures.length) {
  console.error("Sprint 029M focused validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sprint 029M focused validation passed (${assertions.length}/${assertions.length}).`);
