import assert from "node:assert/strict";
import fs from "node:fs";
import { commercialAuthority } from "../lib/commerce/commercial-authority.ts";

const read = (path) => fs.readFileSync(path, "utf8");
const checkoutSource = read("app/api/checkout/route.ts");
const webhookSource = read("app/api/stripe/webhook/route.ts");

let assertions = 0;
function check(value, label) {
  assertions += 1;
  assert.ok(value, label);
}

const NextResponse = {
  redirect(url, init) {
    return new Response(null, {
      status: init.status,
      headers: { location: String(url) },
    });
  },
  json(value, init = {}) {
    return new Response(JSON.stringify(value), {
      status: init.status ?? 200,
      headers: { "content-type": "application/json" },
    });
  },
};

function compileCheckoutPost(source) {
  const body = source.match(
    /export async function POST\(request: NextRequest\) \{([\s\S]*?)\n\}/,
  )?.[1];
  assert.ok(body, "checkout POST body is extractable");
  return new Function(
    "NextResponse",
    "commercialAuthority",
    `return async function POST(request) {${body}\n}`,
  )(NextResponse, commercialAuthority);
}

function compileWebhookDisabledBranch(source) {
  const start = source.indexOf("  if (!commercialAuthority.checkoutEnabled)");
  const end = source.indexOf("\n\n  if (!hasStripeServerEnv()", start);
  assert.ok(start >= 0 && end > start, "webhook disabled branch is extractable");
  const branch = source.slice(start, end);
  return new Function(
    "NextResponse",
    "commercialAuthority",
    `return async function POST(request) {\n${branch}\n}`,
  )(NextResponse, commercialAuthority);
}

check(commercialAuthority.posture === "commerce-disabled-safe", "disabled-safe posture");
check(commercialAuthority.checkoutEnabled === false, "checkout remains false");
check(commercialAuthority.reasonCode === "consultation-led-commerce-disabled", "approved disabled reason");
check(commercialAuthority.version === "030B-consultation-led-v1", "approved version");

const checkoutPost = compileCheckoutPost(checkoutSource);
const checkoutCases = [
  ["valid", "product=PP-BE-KIT-ONBOARDING-AU"],
  ["malformed", "%not-form-data"],
  ["stale", "product=legacy-4500"],
  ["legacy", "product=performance-review-pack"],
];
for (const [name, body] of checkoutCases) {
  const request = new Proxy(
    { url: `https://local.invalid/api/checkout?case=${name}`, body },
    {
      get(target, property) {
        if (property === "url") return target.url;
        if (property === "body") return target.body;
        throw new Error(`checkout accessed forbidden request property: ${String(property)}`);
      },
    },
  );
  const response = await checkoutPost(request);
  check(response.status === 303, `${name} checkout returns 303`);
  check(
    response.headers.get("location") ===
      "https://local.invalid/shop?checkout=consultation-led-commerce-disabled",
    `${name} checkout uses approved disabled reason`,
  );
}

check(!/getStripeServerClient/.test(checkoutSource), "checkout imports no Stripe client");
check(!/createPendingOrderForCheckout/.test(checkoutSource), "checkout imports no order creator");
check(!/request\.formData\(/.test(checkoutSource), "checkout reads no submitted form");
check(!/productSlug|product_id|priceAmount/.test(checkoutSource), "checkout selects no product or amount");

const gateIndex = webhookSource.indexOf("if (!commercialAuthority.checkoutEnabled)");
check(gateIndex >= 0, "webhook has disabled gate");
check(gateIndex < webhookSource.indexOf("request.headers"), "webhook gate precedes headers");
check(gateIndex < webhookSource.indexOf("request.text()"), "webhook gate precedes body");
check(gateIndex < webhookSource.indexOf("getStripeServerClient()"), "webhook gate precedes Stripe client");
check(gateIndex < webhookSource.indexOf("syncCheckoutSessionToCommerce("), "webhook gate precedes reconciliation");

const poisonRequest = new Proxy(
  {},
  {
    get(_target, property) {
      throw new Error(`webhook touched request property before refusal: ${String(property)}`);
    },
  },
);
const webhookPost = compileWebhookDisabledBranch(webhookSource);
const webhookResponse = await webhookPost(poisonRequest);
const webhookBody = await webhookResponse.json();
check(webhookResponse.status === 503, "webhook disabled branch returns 503");
check(webhookBody.reason === commercialAuthority.reasonCode, "webhook returns approved reason");
check(webhookBody.message === commercialAuthority.publicMessage, "webhook returns approved message");

assert.equal(assertions, 24, "exact disabled-commerce assertion count");
console.log(`Sprint 030 disabled-commerce contract passed: ${assertions}/24.`);
