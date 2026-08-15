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

## Builder acceptance result

| ID | Result | Evidence |
| --- | --- | --- |
| AC-01 | pass | Canonical CWD/Git top, HEAD, branch and `0/59/279` baseline recorded; unrelated dirty work preserved. |
| AC-02 | pass | Dry-run/applied four traversal-free files; final Pack/sprint hashes recorded. |
| AC-03 | pass | `PLAN-001..003` resolved; critical plan decision 3/3 passed before Product edits. |
| AC-04 | pass | Typed authority and decision record name Phillip Rankin, role, date, version and supersession. |
| AC-05 | pass | Exact offer name/identifier assertions and renders pass. |
| AC-06 | pass | Numeric `5500`, AUD, GST-inclusive and exact display assertions/render pass. |
| AC-07 | pass | Destination freight and complete accepted-quote total are contract-derived and rendered. |
| AC-08 | pass | Quote itemisation controls contents/quantities; images/seeds/catalogues create none. |
| AC-09 | pass | Initial maximum-two-hour training and separately quoted travel/additional training pass. |
| AC-10 | pass | No subscription, unlimited testing or implicit portal/horse/stable/user entitlement. |
| AC-11 | pass | Thirty-day setup support and separate ongoing agreement are explicit. |
| AC-12 | pass | One-off/no-renewal/no-twelve-month/30-day quote terms and corrected retained `11/11` pass. |
| AC-13 | pass | Website payment absent; quote controls timing/deposit. |
| AC-14 | pass | Cancellation/refund/return wording preserves non-excludable ACL rights. |
| AC-15 | pass | Warranty wording preserves ACL/manufacturer rights and promises no extension. |
| AC-16 | pass | Ownership/loan exception and no-guaranteed-buyback boundary pass. |
| AC-17 | pass | Trial enquiry is consultation only; signed schedule required for equipment loan/structured trial. |
| AC-18 | pass | Eligibility/stock/destination/timing remain conditional and quote-led. |
| AC-19 | pass | Claims scan finds no diagnosis, treatment, guarantee, veterinary replacement or race readiness. |
| AC-20 | pass | Historical rows remain read-only/original-term; no data mutation occurred. |
| AC-21 | pass | One typed server authority drives all Product schedule projections. |
| AC-22 | pass | `checkoutEnabled === false`; approval does not activate commerce. |
| AC-23 | pass | Pricing/Disclaimer/Australian English and fully corrected retained `11/11` pass. |
| AC-24 | pass | Shop/detail have no catalogue lookup, form or button and cannot activate seeded products. |
| AC-25 | pass | CTA/enquiry copy creates no order/payment/account/subscription/onboarding/eligibility claim. |
| AC-26 | pass | Valid/malformed/stale/legacy checkout refusal matrix creates zero commerce calls. |
| AC-27 | pass | Webhook poison-request proof refuses before request/body/signature/reconciliation access. |
| AC-28 | pass | Admin uses identifier-free ordinal projection; visible/DOM/key/serialized sentinel proof passes. |
| AC-29 | pass | Admin auth precedes data; content is server read-only and projected before props. |
| AC-30 | pass | All ten legacy values remain conflict evidence and absent from active public authority. |
| AC-31 | pass | Exact scope ledger proves no schema/migration/RLS/role/permission/dependency/lock change. |
| AC-32 | pass | External action ledger is zero: no provider/enquiry/deployment/Production mutation. |
| AC-33 | pass | Exact `96 + 24 + 11 + 27 = 158/158`. |
| AC-34 | pass | TypeScript, zero-warning lint, JSON and optimized 29-route build pass. |
| AC-35 | pass | Shared Product geometry `13/13` and exact full-page captures `5/5` pass. |
| AC-36 | pass | Synthetic-only evidence, zero generated sentinel residue and actual HTML/RSC sentinel check pass. |
| AC-37 | pass | Fresh critical inspection 1/3 passed with no blocker. |
| AC-38 | pass | L04 stays deferred; L09 is local-only accepted limitation; 033B/legal/customer/Production/Done stay open. |
| AC-39 | pass | All closeout ledgers reconcile; final staged/external/residue `0/0/0`. |
| AC-40 | pass | Final Builder report ends with the exact no-action sentence. |
