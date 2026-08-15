import assert from "node:assert/strict";
import fs from "node:fs";
import { commercialAuthority } from "../lib/commerce/commercial-authority.ts";

const read = (path) => fs.readFileSync(path, "utf8");
const authoritySource = read("lib/commerce/commercial-authority.ts");
const pricing = read("app/pricing/page.tsx");
const disclaimer = read("app/disclaimer/page.tsx");
const shop = read("app/shop/page.tsx");
const detail = read("app/shop/[slug]/page.tsx");
const admin = read("app/(admin)/admin/commerce/page.tsx");

let assertions = 0;
function check(value, label) {
  assertions += 1;
  assert.ok(value, label);
}

check(commercialAuthority.version === "030B-consultation-led-v1", "version");
check(commercialAuthority.posture === "commerce-disabled-safe", "posture");
check(commercialAuthority.checkoutEnabled === false, "checkout false");
check(commercialAuthority.decision.owner === "Phillip Rankin", "owner");
check(commercialAuthority.decision.role === "Director of Aprec8 Pty Ltd", "owner role");
check(commercialAuthority.decision.effectiveDate === "2026-08-12", "effective date");
check(commercialAuthority.decision.supersession.includes("later versioned"), "supersession");
check(commercialAuthority.offer.name === "Precision Performance BE Kit and Onboarding Package", "offer name");
check(commercialAuthority.offer.identifier === "PP-BE-KIT-ONBOARDING-AU", "offer identifier");
check(commercialAuthority.offer.price.amount === 5500, "numeric price");
check(commercialAuthority.offer.price.currency === "AUD", "currency");
check(commercialAuthority.offer.price.gstInclusive === true, "GST inclusive");
check(commercialAuthority.offer.price.display === "AUD $5,500 including GST", "price display");
check(commercialAuthority.reasonCode === "consultation-led-commerce-disabled", "reason code");
check(commercialAuthority.legacyConflicts.length === 10, "legacy conflict count");
check(authoritySource.startsWith('import "server-only";'), "server-authoritative module");

const scheduleCases = [
  ["salesModel", /accepted written quote/i],
  ["freight", /complete total before acceptance/i],
  ["kitContents", /itemised in the accepted quote/i],
  ["training", /no more than two hours/i],
  ["softwareAndPortal", /No subscription, unlimited testing/i],
  ["support", /30 calendar days after onboarding/i],
  ["term", /no automatic renewal or twelve-month commitment/i],
  ["payment", /website collects no payment/i],
  ["cancellation", /non-excludable Australian Consumer Law rights/i],
  ["refundsAndReturns", /No additional change-of-mind return promise/i],
  ["warrantyAndReplacement", /No extended warranty is promised/i],
  ["ownership", /cleared payment and delivery/i],
  ["buyback", /No buyback is guaranteed/i],
  ["stableTrial", /creates no order, payment, subscription/i],
  ["eligibility", /eligibility is not automatic/i],
  ["fulfilment", /no general delivery-time promise/i],
  ["claims", /does not diagnose, prescribe treatment/i],
  ["historicalRecords", /not reinterpreted or mutated/i],
];
for (const [key, pattern] of scheduleCases) {
  const value = commercialAuthority.schedule[key];
  check(typeof value === "string" && value.length > 30, `${key} is substantive`);
  check(pattern.test(value), `${key} matches approved schedule`);
}

check(pricing.includes('commercialAuthority.offer.name'), "Pricing imports offer name");
check(pricing.includes('commercialAuthority.offer.price.display'), "Pricing imports price display");
check(pricing.includes('commercialAuthority.schedule.freight'), "Pricing imports freight");
check(pricing.includes('commercialAuthority.schedule.salesModel'), "Pricing imports sales model");
check(pricing.includes('commercialAuthority.schedule.term'), "Pricing imports term");
check(pricing.includes('commercialAuthority.schedule.stableTrial'), "Pricing imports stable trial");
check(pricing.includes('commercialAuthority.schedule.historicalRecords'), "Pricing imports historical treatment");
check(pricing.includes('href="/#enquiry"'), "Pricing uses conditional enquiry destination");
check(pricing.includes("does not create an order, payment, account"), "Pricing denies commerce state");
check(!/<form|<button/i.test(pricing), "Pricing has no purchase form or button");
check(disclaimer.includes('commercialAuthority.publicMessage'), "Disclaimer imports disabled message");
check(disclaimer.includes('href="/pricing"'), "Disclaimer routes to Pricing");
check(disclaimer.includes("does not create an order"), "Disclaimer denies order creation");
check(disclaimer.includes("payment, account, subscription or other commerce state"), "Disclaimer denies commerce state");
check(shop.includes('commercialAuthority.offer.name'), "Shop imports approved offer");
check(shop.includes('commercialAuthority.offer.price.display'), "Shop imports approved price");
check(shop.includes('commercialAuthority.schedule.freight'), "Shop imports freight");
check(shop.includes('href="/pricing"'), "Shop routes to Pricing");
check(!/getPublicProduct|lib\/domain\/products/.test(shop), "Shop has no product loader");
check(!/<form|<button/i.test(shop), "Shop has no purchase form or button");
check(detail.includes('commercialAuthority.offer.name'), "Detail imports approved offer");
check(detail.includes('commercialAuthority.offer.price.display'), "Detail imports approved price");
check(detail.includes('commercialAuthority.schedule.freight'), "Detail imports freight");
check(!/getPublicProduct|lib\/domain\/products|searchParams|params\.slug/.test(detail), "Detail has no catalogue lookup");

function compileProjector(source) {
  source = source.replaceAll("\r\n", "\n");
  const start = source.indexOf("function projectAdminCommerceSnapshot");
  const bodyStart = source.indexOf("{", source.indexOf("): AdminCommerceViewModel", start));
  const end = source.indexOf("\n}\n\nfunction AdminCommerceContent", bodyStart);
  assert.ok(start >= 0 && bodyStart > start && end > bodyStart, "projector is extractable");
  const body = source.slice(bodyStart + 1, end);
  return new Function("snapshot", body);
}

const sentinels = {
  product: "product-id-sensitive-030b",
  order: "order-id-sensitive-030b",
  customer: "customer-id-sensitive-030b",
  checkout: "checkout-id-sensitive-030b",
  intent: "intent-id-sensitive-030b",
  payment: "payment-id-sensitive-030b",
  provider: "provider-id-sensitive-030b",
  error: "error-id-sensitive-030b",
};
const rawSnapshot = {
  envReady: true,
  products: [{
    id: sentinels.product,
    name: "Historical example",
    slug: "historical-example",
    status: "inactive",
    priceAmount: 1,
    currencyCode: "AUD",
    updatedAt: "2026-08-12T00:00:00.000Z",
  }],
  orders: [{
    id: sentinels.order,
    userId: sentinels.customer,
    status: "historical",
    totalAmount: 2,
    currencyCode: "AUD",
    provider: sentinels.provider,
    checkoutSessionId: sentinels.checkout,
    paymentIntentId: sentinels.intent,
    orderedAt: null,
    updatedAt: "2026-08-12T00:00:00.000Z",
  }],
  payments: [{
    id: sentinels.payment,
    orderId: sentinels.order,
    status: "historical",
    amount: 3,
    currencyCode: "AUD",
    provider: sentinels.provider,
    providerPaymentId: sentinels.intent,
    checkoutSessionId: sentinels.checkout,
    paidAt: null,
    createdAt: "2026-08-12T00:00:00.000Z",
  }],
  errors: [sentinels.error],
};
const projected = compileProjector(admin)(rawSnapshot);
const serialized = JSON.stringify({ props: { view: projected } });
check(!serialized.includes(sentinels.order), "serialized props omit order identifier");
check(!serialized.includes(sentinels.payment), "serialized props omit payment identifier");
check(!serialized.includes(sentinels.customer), "serialized props omit customer identifier");
check(!serialized.includes(sentinels.checkout), "serialized props omit checkout identifier");
check(!serialized.includes(sentinels.intent), "serialized props omit payment-intent identifier");
check(!serialized.includes(sentinels.provider), "serialized props omit provider identifier");
check(!serialized.includes(sentinels.product), "serialized props omit product identifier");
check(projected.orders[0].key === "historical-order-1", "order key is deterministic ordinal");
check(projected.payments[0].key === "historical-payment-1", "payment key is deterministic ordinal");
check(projected.products[0].key === "historical-product-1", "product key is deterministic ordinal");
check(projected.orders[0].label === "Historical order 1", "visible order label is ordinal");
check(
  [...projected.products, ...projected.orders, ...projected.payments].every((row) =>
    /^historical-(product|order|payment)-\d+$/.test(row.key),
  ),
  "all React keys are non-sensitive ordinals",
);
check(
  admin.indexOf('await requireAdminAppContext("/admin/commerce")') <
    admin.indexOf("await getAdminCommerceSnapshot()"),
  "Admin authenticates before data access",
);
check(!/<form|action=|use client/.test(admin), "Admin remains server read-only");
check(admin.includes("AdminCommerceContent view={projectAdminCommerceSnapshot(snapshot)}"), "raw snapshot is projected before props");
check(!admin.includes("shortId("), "identifier formatter is removed");
check(!serialized.includes(sentinels.error), "serialized props omit raw read error");
check(
  ["$2,500", "$3,500", "$4,500", "$120", "P.O.A", "unlimited testing", "$500", "$149", "$249", "$89"].every(
    (value) => commercialAuthority.legacyConflicts.includes(value),
  ),
  "all legacy conflicts remain explicit evidence",
);
const publicSource = [pricing, disclaimer, shop, detail].join("\n");
check(!/\$2,500|\$3,500|\$4,500|\$149|\$249|\$89|P\.O\.A|unlimited testing/i.test(publicSource), "legacy values are not active public copy");
check(!/guaranteed performance|always race-ready|winning formula/i.test(publicSource), "prohibited promotional claims are absent");

assert.equal(assertions, 96, "exact commercial schedule assertion count");
console.log(`Sprint 030B commercial schedule passed: ${assertions}/96.`);
