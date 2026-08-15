# Architect Pack - Sprint 030B Commercial, Trial, Onboarding and Support Authority

Created: 2026-08-12
Workflow profile: strict
Flight class: critical
Execution boundary: local commercial authority, Product presentation, tests and synthetic evidence only

This Pack creates one strict Builder sprint. It does not apply itself, enable checkout, contact Stripe, accept payment, submit an enquiry, deploy, change Production, alter schema/RLS, stage, commit or push.

============================================================
FILE: planning/sprints/030B-commercial-trial-onboarding-and-support-authority/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/030B-commercial-trial-onboarding-and-support-authority/blueprint.md
============================================================

# Sprint 030B Blueprint

## Flight evidence

- Class: `critical` because incorrect pricing, GST, customer terms or accidental checkout/webhook activation can create financial, legal, privacy and irreversible external consequences.
- Acceptance invariant: every Product representation must derive from `030B-consultation-led-v1`, show exactly `AUD $5,500 including GST`, preserve quote-specific freight/contents/terms, and remain non-transactional.
- Authority source: Phillip Rankin, Director of Aprec8 Pty Ltd, expressly approved the recommended consultation-led schedule and price on 2026-08-12. ACCC primary guidance is a compliance reference only; this sprint provides no legal advice.
- Origin-to-sink trace: owner-approved decision record -> typed `commercialAuthority` -> Pricing/disclaimer/shop/detail copy -> direct checkout refusal -> webhook pre-body refusal -> protected read-only Admin Commerce explanation through identifier-free deterministic ordinal projection.
- Transformation: exact numeric `5500` + `AUD` + GST-inclusive classification becomes human display `AUD $5,500 including GST`; variable freight remains quote-only and never becomes a hidden/preselected checkout fee.
- Sink invariant: no route creates a Stripe session, order, payment, subscription, fulfilment promise or trial entitlement; historical catalogue values remain non-authoritative read-only evidence.
- Discriminating price fixture: approved `5500` renders; plausible wrong implementations selecting `$4,500`, `$3,500`, `$249` or a database active row fail. `5500` with checkout enabled also fails.
- Discriminating terms fixture: schedule explicitly excludes `$120 per horse`, unlimited testing and guaranteed `$500` buyback. A wrong implementation importing any legacy promise fails.
- Discriminating trial fixture: a stable-trial enquiry can request discussion but cannot create an order/account/subscription/onboarding or equipment entitlement.
- Discriminating payment fixture: POST checkout and a signed/unsigned webhook request both produce zero session/order/payment/reconciliation calls while disabled; webhook body is not read.
- Architecture gate: crossed narrowly because public pricing publication is being authorised. Payment architecture, schema, provider configuration and Production remain unchanged and disabled.
- Durable Git baseline: canonical HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, branch `codex/025B-versioned-domain-authority-package`, discovery baseline `0` staged, `59` modified tracked and `118` untracked paths. Preserve unrelated accepted work and rerecord immediately before Builder planning.
- Known uncertainty: no legal/accounting review or Production/customer acceptance is proven. Public enquiry availability can vary by protected configuration and must not be overstated. No exact fixed kit inventory exists outside the accepted quote-itemisation rule. These limitations do not authorise invention.

## Implementation sequence

1. Builder dry-runs/applies this Pack, rereads all four files, verifies canonical CWD/Git top and records current dirty baseline.
2. Read Sprint 030 closeout, current commercial contract/surfaces, design/messaging authority, approved 030B schedule, ACCC references and acceptance matrix.
3. Produce an exact no-edit critical Builder plan with file list, typed contract shape, copy projections, discriminating tests, visuals, closeout and arithmetic. Fresh Architect review must pass before Product edits.
4. Amend the Sprint 030 decision record as a versioned 030B approval: named owner, date, supersession rule, complete schedule, conflict resolution and disabled-safe posture.
5. Extend the typed authority with exact structured fields. Avoid duplicated magic price/term strings across routes; derive safe display from the accepted contract where practical.
6. Reconcile Pricing to the approved offer and update Disclaimer to route readers to that authority while stating online purchasing remains unavailable and enquiries create no commerce state. Explain written-quote contents, freight/total, training/support limits, one-off/no-renewal posture, no included subscription/unlimited testing and no guaranteed trial/buyback.
7. Keep shop/detail non-transactional and isolated from fallback/database catalogue values. Do not imply an enquiry currently transmits; describe the safe next step conditionally and accurately.
8. Preserve direct checkout and webhook fail-closed behavior. Prefer no edit when current source already proves the invariant.
9. Update protected Admin Commerce so the approved schedule and historical reconciliation rows cannot be confused. Preserve auth-before-data and read-only behavior; remove order/payment/customer/checkout/provider identifiers from visible text, DOM properties, React keys and all client-serializable props, using deterministic non-sensitive ordinal keys and labels.
10. Add counted focused tests that import/evaluate the typed contract where feasible, render/project approved fields, reject each legacy value, prove checkout creates zero commerce calls, prove webhook refuses before body read and scan for prohibited claims. Correct every obsolete Pricing assertion in the retained 029M public test while preserving exact `11/11` and all non-Pricing cases; positively cover approved price, quote-specific freight/complete total, one-off/no-renewal/no-twelve-month commitment, disabled purchasing and conditional enquiry. Add a sentinel RSC-equivalent serialization assertion for Admin keys/props plus auth-before-data and read-only checks.
11. Run retained Sprint 030 disabled-commerce, 029M public/Australian-English, commerce, role/admin, claims, JSON/domain/static, typecheck, zero-warning lint and optimized build gates proportionally.
12. Render synthetic shared-Product evidence: Pricing mobile `414x896`, shop/detail disabled mobile `414x896`, protected Admin Commerce explanation mobile `414x896`, and public/admin desktop coverage `1440x900`. Inspect full-page dimensions, 320 reflow, true 200% text, 44px targets, focus/labels/status/non-colour meaning, privacy and claims.
13. Obtain fresh critical inspection. Resolve stable findings through reviewed correction plans and rerun affected proof.
14. Reconcile L04 as still `deferred-by-approved-scope` because commerce remains intentionally disabled. L09 may advance only to the exact locally approved schedule boundary; named operational ownership/rehearsal remains for 033B. Do not claim Production/customer/legal review or Product-wide Done.
15. Close with AC annotations, exact assertion arithmetic, visual manifest, changed-path/legacy-conflict/external-effect ledgers and final `0/0/0`.
16. End the Builder report exactly with `I need nothing from you.` when no action is required, otherwise the required numbered intervention steps.

## Critical plan review questions

1. Is `5500` the sole active schedule price and clearly GST-inclusive?
2. Can any legacy/seed/database value become public authority or checkout-ready?
3. Does quote-specific freight/content avoid a misleading incomplete total or fixed inclusion claim?
4. Do training, support, term, cancellation, ACL, warranty, ownership, buyback and trial projections match the approved schedule without invention?
5. Can any route create a session/order/payment or read/reconcile a webhook while disabled?
6. Does any CTA overstate enquiry transmission, eligibility, availability or fulfilment?
7. Are historical admin rows read-only and clearly distinct from the approved schedule?
8. Are public claims neutral and private/customer/payment data absent?
9. Are scope, evidence classification, closeout and cleanup exact?

## Acceptable outcomes

- `commercial-schedule-approved-commerce-disabled-safe-clean`
- `commercial-authority-drift-blocked-clean`
- `commercial-presentation-conflict-blocked-clean`
- `disabled-commerce-integrity-failed-clean`
- `local-validation-failed-clean`
- `critical-inspection-failed-clean`
- `cleanup-failed-contained`
- `blocked-clean`

============================================================
FILE: planning/sprints/030B-commercial-trial-onboarding-and-support-authority/acceptance.md
============================================================

# Sprint 030B Acceptance

Builder annotates every criterion `pass`, `fail` or `not-run` with evidence.

| ID | Criterion | Required proof |
| --- | --- | --- |
| AC-01 | Canonical CWD/Git top, HEAD, branch, staged/dirty baseline and unrelated work are recorded/preserved. | Command/status ledger. |
| AC-02 | Pack dry-run/apply produces exactly four traversal-free 030B sprint files and they are reread. | Import output and hashes. |
| AC-03 | Fresh no-edit critical Builder plan passes Architect review before Product edits. | Plan decision ledger. |
| AC-04 | Decision record names Phillip Rankin, Director of Aprec8 Pty Ltd, date 2026-08-12, version and supersession rule. | Record inspection. |
| AC-05 | Offer name and identifier are exact. | Contract/doc/render assertions. |
| AC-06 | Sole approved price is numeric 5500 AUD and displays `AUD $5,500 including GST`. | Typed/imported assertions and render. |
| AC-07 | Freight is additional, destination-based and included in the complete written-quote total before acceptance. | Schedule/copy assertions. |
| AC-08 | Quote itemisation governs exact kit contents/quantities; images, seeds and historical catalogues create none. | Contract/conflict assertions. |
| AC-09 | Training is one initial maximum-two-hour session; travel/additional training is separately quoted. | Schedule/render. |
| AC-10 | No subscription, unlimited testing or portal/horse/stable/user entitlement is implied unless itemised. | Claims/legacy scan. |
| AC-11 | Setup support is limited to 30 days; ongoing operational/veterinary support requires separate agreement. | Schedule/render. |
| AC-12 | Package is one-off, no automatic renewal/twelve-month commitment; quote expiry is 30 days unless overridden in quote, and corrected retained Pricing coverage positively asserts this boundary. | Contract/render and retained `11/11`. |
| AC-13 | Website payment is absent; quote governs payment timing/deposit. | DOM/source/refusal tests. |
| AC-14 | Cancellation/refund/return wording preserves non-excludable ACL rights and invents no extra legal remedy. | Copy/source inspection. |
| AC-15 | Warranty wording preserves ACL/manufacturer rights, promises no extended warranty and keeps Aprec8 as contact. | Copy/source inspection. |
| AC-16 | Ownership transfer/loan exception matches schedule; historical buyback is not guaranteed. | Contract/render/legacy scan. |
| AC-17 | Stable trial is consultation only; separate signed terms are required for loan/structured trial. | Copy and negative assertions. |
| AC-18 | Eligibility/fulfilment/availability/timing are quote-led and no general delivery promise appears. | Claims/render scan. |
| AC-19 | Capability wording contains no diagnosis, treatment, guarantee, veterinary replacement or race-readiness claim. | Claims scan. |
| AC-20 | Historical orders retain original terms and no row is mutated/reinterpreted. | Source/diff/external ledger. |
| AC-21 | Typed authority is the single Product schedule projection and remains `commerce-disabled-safe`. | Import/source trace. |
| AC-22 | `checkoutEnabled` is false and approval cannot implicitly flip it. | Executable contract case. |
| AC-23 | Pricing and Disclaimer present or route to the approved schedule accurately, accessibly and in Australian English; corrected retained 029M coverage positively proves approved price, quote-specific freight/complete total, one-off/no-renewal/no-twelve-month commitment, disabled purchasing and conditional enquiry behavior while preserving all non-Pricing cases. | Shared render/content checks and retained `11/11`. |
| AC-24 | Shop/detail remain non-transactional and never render seeded/database products as active offers. | Route/source fixtures. |
| AC-25 | CTA/next-step copy does not overstate enquiry transmission, order/account/subscription creation or eligibility. | Render/source assertions. |
| AC-26 | Direct checkout creates zero Stripe session/order/payment state for valid, malformed, stale and legacy inputs. | Executable refusal matrix. |
| AC-27 | Webhook refuses before request-body read, signature parsing or reconciliation while disabled. | Executable spy/order assertion. |
| AC-28 | Admin Commerce distinguishes approved schedule from protected historical reconciliation data and exposes no order/payment/customer/checkout/provider identifier in visible text, DOM properties, React keys or client-serializable props; deterministic non-sensitive ordinal keys are used. | Protected synthetic render/source and sentinel RSC-equivalent serialization assertion. |
| AC-29 | Admin auth executes before data access, historical data remains read-only and no sensitive identifier crosses the visible or client-serializable projection. | Retained role/admin/privacy checks plus ordered auth/data and read-only assertions. |
| AC-30 | Legacy prices/terms `$2,500/$3,500/$4,500/$120/P.O.A/unlimited/$500/$149/$249/$89` cannot become authority. | Discriminating legacy matrix. |
| AC-31 | No schema, migration, RLS, role, permission, dependency or remote data change occurs. | Scope/hashes. |
| AC-32 | No Stripe/test/live/payment/provider/enquiry/deployment/Production action occurs. | External ledger zero. |
| AC-33 | Focused schedule/disabled-commerce tests and proportional retained commerce/public/role/claims gates pass exactly `96 + 24 + 11 + 27 = 158/158`; the `11` is the fully corrected retained 029M suite. | Command ledger. |
| AC-34 | TypeScript, zero-warning lint, JSON and optimized build pass or allowed stronger support substitute proves the same fact. | Validation ledger. |
| AC-35 | Shared-Product synthetic mobile/desktop evidence proves content, 320 reflow, true 200% text, 44px targets, focus/status/non-colour meaning, privacy and claims. | Visual/geometry ledgers. |
| AC-36 | Evidence and its visible/DOM/RSC-equivalent serialized props and keys contain no real customer, order, payment, checkout, identity, credential, provider identifier or private record. | Privacy scan, sentinel serialization assertion and inspection. |
| AC-37 | Fresh critical inspection passes after every stable finding is corrected and affected checks rerun. | Review ledger. |
| AC-38 | L04 stays disabled-scope; L09 advances only within local schedule authority; 033B ownership, Production, legal/customer acceptance and Product-wide Done stay open. | Matrix/roadmap diff. |
| AC-39 | State/status/roadmaps/schedule/lifecycle/evidence/briefing agree; final staged/external/residue are exactly `0/0/0`. | Cross-file/safety checks. |
| AC-40 | Builder report ends with the exact explicit user-action statement. | Report inspection. |

PASS requires AC-01 through AC-40. A wrong commercial term, historical-value activation, payment/reconciliation path, misleading CTA, ACL-rights misstatement, protected-data exposure, external action or unsafe cleanup is a material stop.

End the report exactly with either `I need nothing from you.` or `I need the following from you:` followed by numbered plain-English steps and follow-up verification.

============================================================
FILE: planning/sprints/030B-commercial-trial-onboarding-and-support-authority/handoff-prompt.md
============================================================

# Sprint 030B Builder Handoff

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

## Builder task contract

Objective: encode and present `030B-consultation-led-v1` with exact AUD $5,500 GST-inclusive authority while preserving disabled checkout/webhook behavior.

Owns: the exact approved commercial authority/doc/public/admin/test/evidence boundary and mandatory closeout named in requirements.

Must not: enable or contact commerce/payment/provider systems; create orders/payments/subscriptions; invent terms/items/claims/contact channels; change schema/RLS/roles/dependencies; mutate historical/remote/Production data; submit enquiries; deploy; stage, commit or push.

Acceptance: AC-01 through AC-40 pass. L04 stays deferred by disabled scope; legal/customer/Production/Product-wide acceptance remains open.

Verification: counted imported schedule and legacy-conflict assertions, checkout/webhook zero-call proof, corrected retained public and role/claims gates totaling exactly `96 + 24 + 11 + 27 = 158/158`, Admin RSC-equivalent serialization privacy plus auth-before-data/read-only proof, type/lint/JSON/build, synthetic responsive evidence, fresh critical inspection and final `0/0/0`.

1. Verify canonical/Git baseline and preserve unrelated work.
2. Apply/reread this sprint and all named authority.
3. Return the exact no-edit critical Builder plan for fresh Architect review before Product edits.
4. Encode the owner/date/version/schedule exactly once and derive Product copy safely.
5. Publish the approved consultation-led information through Pricing, reconcile Disclaimer to it, and keep every public surface without a buy control or misleading next step.
6. Preserve checkout/webhook refusal and prove zero session/order/payment/body-read/reconciliation behavior.
7. Keep historical catalogue/admin data read-only and visibly non-authoritative; use only deterministic non-sensitive ordinal Admin keys/labels and prove no protected identifier enters DOM or client-serializable props.
8. Falsify the plausible wrong implementations: legacy price selection, checkout implied by approval, hidden freight, included subscription/unlimited testing/buyback, or automatic trial entitlement.
9. Run proportional quality, rendered and privacy evidence; obtain fresh critical inspection.
10. Reconcile acceptance/roadmaps without claiming legal review, Production activation, customer acceptance or Product-wide Done.
11. End the report exactly with the required user-action statement.

Follow the Evidence-Proportional Execution Standard. Stop for material wrong-target, authority, pricing/GST, payment, legal/compliance, privacy, scope, external-action or cleanup risk; continue through supporting-tool failures only with equivalent or stronger safe proof.
