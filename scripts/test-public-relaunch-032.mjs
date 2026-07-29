import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const pricing = read("app/pricing/page.tsx");
const form = read("components/forms/trainer-enquiry-form.tsx");
const robots = read("app/robots.ts");
const sitemap = read("app/sitemap.ts");
const disclaimer = read("app/disclaimer/page.tsx");

const checks = [
  ["canonical metadata base", layout.includes('new URL("https://precisionperformance.com.au")')],
  ["public indexing enabled", layout.includes("index: true") && layout.includes("follow: true")],
  ["preview page override removed", !home.includes("index: false") && !home.includes("follow: false")],
  ["primary acquisition wording", home.includes("Request a Stable Trial") && pricing.includes("Request a Stable Trial")],
  ["commerce remains qualified", home.includes("commerce and onboarding remain unavailable") && pricing.includes("not confirmed for online purchase")],
  ["form remains non-transmitting", form.includes("does not transmit, store, email or log information")],
  ["public disclaimer linked", home.includes('href="/disclaimer"')],
  ["non-medical disclaimer", disclaimer.includes("does not replace trainer observation, veterinary assessment")],
  ["robots protects private routes", ["/admin/", "/api/", "/auth/", "/data-entry/", "/portal/", "/sign-in"].every((route) => robots.includes(`"${route}"`))],
  ["robots exposes sitemap", robots.includes("https://precisionperformance.com.au/sitemap.xml")],
  ["sitemap lists only public routes", sitemap.includes("/pricing") && sitemap.includes("/disclaimer") && !sitemap.includes("/portal")],
  ["no stale preview marker", !home.includes("noindex") && !form.includes("Local preview")],
];

for (const [name, passed] of checks) {
  assert.equal(passed, true, `Sprint 032 check failed: ${name}`);
}

console.log(`Sprint 032 public relaunch controls passed (${checks.length}/${checks.length}).`);
