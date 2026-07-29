# Sprint 030 Acceptance

## Baseline and preservation

- [ ] Exact Sprint 028 worktree, branch, HEAD, outcome and dirty manifest are recorded.
- [ ] Pre-existing Sprint 025–028 modified/untracked files are frozen and preserved except documented shared-file additions.
- [ ] Source documents remain unchanged and are classified without being treated as automatic authority.
- [ ] Final changed-path manifest contains only approved or justified in-scope files.

## Commercial authority

- [ ] Canonical Sprint 030 decision record identifies owner, role, approval/effective date, version and supersession rule.
- [ ] Every offered product/service resolves contents, onboarding/training, software/support, limits, price, currency, GST, freight, term, renewal, cancellation/refund/return, ownership/warranty/buyback, trial, fulfilment and checkout eligibility—or is explicitly unavailable.
- [ ] The deferred twelve-month term has one accepted meaning or is removed from active/public offer wording.
- [ ] `$4,500`, `AUD $5,500 including GST`, seeds/database values and all public/admin/checkout representations are reconciled in the conflict matrix.
- [ ] No legacy clinical, treatment, supplement, race-result or guaranteed-performance claim enters commercial authority.
- [ ] One launch posture is recorded: `commerce-disabled-safe` or `commerce-test-ready`.

## Public and catalogue agreement

- [ ] Pricing, shop, product detail, CTA, catalogue state and admin commerce agree with the selected posture.
- [ ] Currency, GST, postage and quote-only wording are unambiguous.
- [ ] Confirmed price is distinguished from POA, consultation-only and unavailable terms.
- [ ] The 029M enquiry form is not represented as transmitting unless separately implemented.
- [ ] Public wording follows design/messaging authority, Australian English and accessibility requirements.
- [ ] Health/performance claims remain within approved evidence and disclaimer boundaries.

## Disabled-safe posture

- [ ] Applies when any material authority is incomplete or consultation-led sales is selected.
- [ ] Public/direct checkout cannot create Stripe sessions, orders or payments.
- [ ] Active, seeded, fallback, stale and manipulated product paths cannot bypass the disabled state.
- [ ] Visitors receive an accurate approved next step.
- [ ] Admin commerce shows disabled reason/mismatch state without exposing secrets or sensitive identifiers.
- [ ] Historical commerce records remain unchanged and permission-protected.

## Test-ready posture

- [ ] Applies only with complete accepted commercial authority.
- [ ] Product, amount, currency, tax/freight treatment and offer type are server authoritative and exactly consistent.
- [ ] Existing persistence represents the selected one-off/subscription model without ambiguity.
- [ ] Missing, inactive, stale, mismatched and manipulated checkout requests fail safely before Stripe activity.
- [ ] Pending order/session failure and retry behaviour is deterministic.
- [ ] Webhook signature verification and supported-event allowlisting pass.
- [ ] Paid/unpaid/expired/cancelled, duplicate, out-of-order and unsupported event behaviour is correct and idempotent.
- [ ] Admin commerce agrees with final synthetic order/payment state.

## Governed Stripe test proof

- [ ] Exact non-production Vercel Preview and Stripe test-mode identities are proven without secret values.
- [ ] Synthetic-only customer/fixture policy, run ID, supported test payment method and cleanup plan are recorded.
- [ ] One bounded checkout and signed supported webhook reconciliation pass in test mode.
- [ ] Duplicate delivery passes without duplicate order/payment mutation.
- [ ] Approved failure/out-of-order case passes without corrupting state.
- [ ] Final application and Stripe owned-artifact accounting is exact; provider-retained immutable test records are identified accurately.
- [ ] No live key, real card, real customer/payment data, Production webhook/configuration/catalogue/data or real charge was used.
- [ ] No Production deployment, alias/domain movement or public checkout activation occurred.

## Security, privacy and architecture

- [ ] Secrets, secret fragments, raw webhook payloads and full payment/customer/provider identifiers are absent from logs/evidence.
- [ ] Checkout trusts no client-supplied amount, currency, tax or entitlement.
- [ ] Existing auth, admin, RLS and read-only admin-commerce boundaries are preserved.
- [ ] No schema, migration, RPC, RLS, role, permission or dependency change occurred.
- [ ] No enquiry transmission/storage/email, new subscription/tax/freight service or fulfilment architecture was added.
- [ ] Real customer, order, payment and personal data were not accessed or mutated.

## Validation and closeout

- [ ] Focused commercial contract, checkout, webhook and selected-posture tests pass.
- [ ] Maintained 029M public/pricing, auth/role/admin and canonical JSON/domain/roles/Supabase/static gates pass.
- [ ] TypeScript, ESLint and production build pass.
- [ ] Safe route/rendered smoke covers public Pricing/shop states and protected admin commerce proportionately.
- [ ] `git diff --check`, approved-path and secret/payment/private-data scans pass.
- [ ] Evidence distinguishes local, static, rendered and governed test-mode proof accurately.
- [ ] Durable planning files agree on outcome, posture, authority and remaining limitations.
- [ ] Work remains unstaged and uncommitted; no push, merge or PR occurred.

## Acceptable outcomes

`commercial-schedule-approved-commerce-test-ready-clean` when complete authority is encoded, all local gates pass and governed Stripe test-mode proof passes without Production impact.

`commercial-schedule-approved-commerce-disabled-safe-clean` when a complete schedule selects consultation-led or intentionally disabled commerce and every surface safely reflects it.

`commercial-authority-pending-commerce-disabled-safe` when safe reconciliation is complete but one or more material business terms remain unresolved and checkout is proven unavailable.

`commerce-data-contract-expansion-required-clean` when the accepted offer cannot be represented safely without a new schema, subscription, tax, freight, fulfilment, permission or legal-contract scope.

`commerce-test-proof-blocked-clean` when complete accepted authority and local implementation pass, but a material test-target, payment-security, signature, integrity or cleanup boundary prevents governed external proof.
