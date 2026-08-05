import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const authority = read("lib/commerce/commercial-authority.ts");
const checkout = read("app/api/checkout/route.ts");
const webhook = read("app/api/stripe/webhook/route.ts");
const pricing = read("app/pricing/page.tsx");
const shop = read("app/shop/page.tsx");
const detail = read("app/shop/[slug]/page.tsx");
const admin = read("app/(admin)/admin/commerce/page.tsx");

assert.match(authority, /posture: "commerce-disabled-safe"/);
assert.match(authority, /checkoutEnabled: false/);
assert.match(checkout, /commercialAuthority\.reasonCode/);
assert.doesNotMatch(checkout, /getStripeServerClient|createPendingOrderForCheckout/);
assert.match(webhook, /if \(!commercialAuthority\.checkoutEnabled\)/);
assert.ok(webhook.indexOf("if (!commercialAuthority.checkoutEnabled)") < webhook.indexOf("request.text()"));
assert.doesNotMatch(pricing, /\$5,500|Including GST|Postage additional/);
assert.match(pricing, /does not create an order, account or subscription/);
assert.match(shop, /Historical or seeded|historical catalogue/i);
assert.match(detail, /not an active online offer/i);
assert.match(admin, /historical reconciliation data only/i);

console.log("Sprint 030 disabled-commerce contract passed: 12 assertions.");
