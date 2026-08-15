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
