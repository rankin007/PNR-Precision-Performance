# Sprint 030B Requirements

## Outcome

Replace Sprint 030's authority-pending record with the owner-approved consultation-led schedule `030B-consultation-led-v1`, align every local public/operator commerce representation to it, and preserve `commerce-disabled-safe` without any online order, payment or subscription activation.

Successful local outcome: `commercial-schedule-approved-commerce-disabled-safe-clean`.

This sprint follows, and does not reopen, closed core Sprint 030. Sprint 030 already proved disabled-safe checkout/webhook behavior. Sprint 030B supplies the previously missing business authority and reconciles Product copy/contracts without enabling commerce.

## Named authority

- Business decision owner: Phillip Rankin.
- Role: Director of Aprec8 Pty Ltd.
- Decision and effective date: 2026-08-12.
- Version: `030B-consultation-led-v1`.
- Supersession: only a later versioned, expressly owner-approved schedule may replace it.
- Launch posture: `commerce-disabled-safe`.

## Approved consultation-led schedule

| Dimension | Approved answer |
| --- | --- |
| Public offer | `Precision Performance BE Kit and Onboarding Package` |
| Identifier | `PP-BE-KIT-ONBOARDING-AU` |
| Price | `AUD $5,500 including GST` |
| Sales model | Consultation and accepted written quote only; no online checkout, automatic order, subscription activation or website payment. |
| Freight | Additional, destination-based, and stated with the complete total in the written quote before acceptance. |
| Kit contents | Aprec8 selects equipment/consumables for the customer; every supplied item and quantity must be itemised in the accepted quote. Images, seeds and historical catalogues create no inclusion. |
| Training | One initial onboarding/equipment-use session, maximum two hours, remote or on site as agreed. Travel and additional training require a separate quote. |
| Software/portal | No subscription, unlimited testing, horse/stable/user entitlement or continuing portal access is included unless expressly itemised in the quote. |
| Support | Initial setup questions for 30 calendar days after onboarding through an approved Aprec8 contact channel. Ongoing operational or veterinary support requires a separate agreement. |
| Term | One-off package; no automatic renewal or twelve-month commitment. Quote expires after 30 days unless the quote states otherwise. |
| Payment | Method, timing and any deposit are stated in the accepted quote. The website collects no payment. |
| Cancellation | No obligation before quote acceptance. After acceptance the quote governs, subject always to non-excludable Australian Consumer Law rights. |
| Refunds/returns | Australian Consumer Law remedies apply. No extra change-of-mind return promise; any discretionary return is agreed in writing. |
| Warranty/replacement | Australian Consumer Law guarantees and any itemised manufacturer warranty apply. No extended warranty is promised; Aprec8 remains the customer contact for supplied-goods issues. |
| Ownership | Transfers after cleared payment and delivery unless the quote expressly identifies loaned equipment. |
| Buyback | No guaranteed buyback. Historical `$500` wording is superseded; any future buyback is a separate written offer. |
| Stable trial | Enquiry means consultation only and creates no order, subscription, onboarding, equipment entitlement or automatic conversion. Any equipment loan/structured trial requires a separate signed trial schedule. |
| Eligibility | Australian customers accepted by Aprec8 following consultation and availability review; no automatic eligibility. |
| Fulfilment | Subject to stock and destination. The accepted quote states dispatch/installation/training timing, responsible contact, freight and complete total. No general delivery-time promise. |
| Claims | Supports professional measurement/review; no diagnosis, treatment, performance guarantee, veterinary replacement or race-readiness promise. |
| Historical records | Existing orders retain original terms. Legacy prices/test rows are not reinterpreted or mutated. |

The schedule is commercial/Product authority, not legal advice. Public and quote wording must not exclude or misstate Australian Consumer Law rights. Relevant current primary references are the ACCC consumer-guarantee, price-display and warranty guidance. No warranty-against-defects document or extra legal promise may be invented in this sprint.

## Required Product behavior

1. Update `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md` into a durable 030B-approved record while retaining the Sprint 030 conflict history.
2. Encode the exact version, owner, offer identifier, `5500` AUD GST-inclusive price, schedule fields and disabled posture in one typed server-authoritative contract.
3. Keep `checkoutEnabled: false`. Approval of price/terms must never imply payment activation.
4. `/pricing` may present the approved price and consultation-led schedule accurately. It must state freight is additionally quoted and the complete total is confirmed before acceptance.
5. `/shop` and product detail must remain non-transactional. They may direct visitors to the approved Pricing information but must not render seeded/database products as active offers or show a purchase control.
6. The consultation/stable-trial next step must not claim the currently parked public enquiry transmitted, created an order, created an account, started onboarding or guaranteed trial eligibility.
7. Direct checkout requests must continue to create no Stripe session, order or payment and return the approved disabled reason.
8. Stripe webhook reconciliation must continue to fail closed before reading the body while commerce is disabled.
9. Read-only Admin Commerce must distinguish the approved consultation-led schedule from historical catalogue/order/payment reconciliation data and expose no order, payment, customer, checkout or provider identifier in visible text, DOM properties, React keys or any client-serializable props. Historical rows must use deterministic non-sensitive ordinal keys and labels.
10. Legacy `$2,500`, `$3,500`, `$4,500`, `$120 per horse`, `P.O.A`, `unlimited testing`, `$500 buyback`, `$149`, `$249`, `$89` and seeded/database values remain conflict evidence only. None may become an active offer or checkout amount.
11. Preserve all existing orders/payments/catalogue rows without mutation or reinterpretation.
12. No Production/public activation, deployment, Stripe test/live activity, remote data, email, enquiry submission or external action is authorised.
13. `/disclaimer` must make the approved schedule available through Pricing, state that online purchasing remains unavailable, and state that enquiries create no order, payment, subscription or other commerce state.

## Task contract

### objective

Encode and present the owner-approved consultation-led commercial schedule while proving that checkout, webhook reconciliation and historical catalogue activation remain disabled-safe.

### owns

Builder may create or edit only:

- `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md`;
- `lib/commerce/commercial-authority.ts`;
- `app/pricing/page.tsx`;
- `app/disclaimer/page.tsx`;
- `app/shop/page.tsx`;
- `app/shop/[slug]/page.tsx`;
- `app/api/checkout/route.ts` only if the exact approved reason/version projection requires it;
- `app/api/stripe/webhook/route.ts` only if the exact approved reason/version projection requires it;
- `app/(admin)/admin/commerce/page.tsx`;
- `lib/domain/products.ts` only if needed to prevent historical/seeded projection under the approved posture;
- `scripts/test-commerce-disabled-030.mjs`;
- `scripts/test-commercial-schedule-030B.mjs` (new);
- `scripts/test-public-website-029M.mjs` only to correct every obsolete Pricing assertion for 030B while preserving exact `11/11` and every non-Pricing case; Pricing coverage must positively assert the approved price, quote-specific freight and complete total, one-off/no-renewal/no-twelve-month commitment, disabled purchasing and conditional enquiry;
- `scripts/run-validation-suite.mjs` and `package.json` only for focused registration;
- synthetic evidence beneath `evidence/professional-engineering/030B-commercial-trial-onboarding-and-support-authority/`;
- `planning/reviews/030B-commercial-trial-onboarding-and-support-authority.md`;
- applied 030B sprint files and acceptance annotations;
- required closeout entries in `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DEFINITION_OF_DONE.md`, `planning/ROADMAP.md`, `planning/SPRINT_SCHEDULE.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md` and `delivery_road_map.md`.

The current canonical source wins over historical hashes/line numbers. The Builder must narrow the actual file set in the no-edit plan; optional files may remain untouched.

### must_not

Builder must not enable checkout/webhook mutation; create Stripe sessions/orders/payments; contact Stripe; use test/live cards; add subscriptions, tax/freight calculators, inventory or fulfilment architecture; change schema/migrations/RLS/roles/permissions/dependencies; mutate historical commerce data; submit enquiries; add a contact channel not already approved; invent kit items, service entitlements, legal terms, warranties or claims; deploy/change Production; use real customer/payment/private data; stage, commit, push, merge or open a PR.

### acceptance

AC-01 through AC-40 must pass. A wrong price/GST/term, misleading CTA, active purchase path, webhook body read, historical-value activation, protected-data exposure, external mutation or cleanup failure is a material stop.

### verification

Run counted focused schedule/disabled-commerce assertions, retained commerce/public/claims/role gates, TypeScript/lint/JSON/build, shared-Product rendered evidence, fresh critical inspection and exact final `0/0/0` staged/external/residue proof.

## Evidence-Proportional Execution Standard

Stop only for a material target, authority, security, privacy, payment, legal/compliance, migration, destructive, integrity, Production, scope or cleanup risk. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep in-scope harness, validator, reporter, formatting, encoding and deterministic evidence corrections inside 030B. Do not create a follow-up solely for Docker, browser automation, renderers, clipboard control, schema dumps, optional CLI paths or redundant verification. Use manual intervention only after safe in-scope alternatives are exhausted.

If manual intervention is genuinely required, record the blocked fact, evidence checked, exact minimal user action, step-by-step instructions and follow-up verification. Never request credentials, payment data, real customer data or unrestricted provider output.
