# Sprint 030 — Commercial Schedule And Commerce Decision

## Outcome

Establish one complete, versioned commercial truth for Precision Performance, reconcile every public, catalogue, administrative and checkout representation to it, and finish with one explicit launch posture:

1. `commerce-test-ready` — the approved offer is technically supported and passes governed Stripe test-mode proof, while Production enablement remains separate; or
2. `commerce-disabled-safe` — checkout remains unavailable and every public/operator surface accurately directs prospective customers to consultation or another approved non-transactional path.

The sprint must not leave a hybrid state where pricing appears purchasable while product contents, term, fulfilment, tax, cancellation or support obligations remain undefined.

## Workflow profile

Strict. This sprint controls public pricing, contractual offer representation, orders, payments and optional Stripe test-mode activity. Strict means exact commercial authority, payment/data boundaries, safe target proof and cleanup—not redundant ceremony.

## Baseline and source of truth

Builder must work in the closed Sprint 028 integrated worktree:

`C:\tmp\pnr-027b-completed-product-lineage-reconciliation`

Begin by recording the exact branch, HEAD, Sprint 028 closeout state and complete modified/untracked manifest. Preserve all completed Sprint 025–028 work byte-for-byte except where a shared planning/validation file must be deliberately extended for Sprint 030. Do not assume the dirty worktree may be cleaned, staged, committed or merged.

Read and reconcile:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- `planning/ARCHITECT_BRIEFING.md`
- `docs/WORKFLOW_PROFILE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `docs/PRICING_013.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- Sprint 029M public pricing/content evidence available in maintained planning state
- current `/pricing`, `/shop`, product detail, checkout, webhook and `/admin/commerce` source
- `lib/domain/products.ts` and `lib/stripe/**`
- product/order/payment/subscription schema and migrations, including test product seeds and Stripe persistence
- maintained commerce, public-route, auth/role and static validators
- the client price list and overview documents under `references/client-docs/PNR and RJR EPP Working Information/`

Source documents and existing seed/runtime values are evidence to reconcile, not authority by themselves. In particular, the legacy `$4,500` kit price conflicts with the currently published `AUD $5,500 including GST`; neither may silently govern checkout. Legacy diagnosis, guaranteed outcome, race-result, treatment, unlimited-service, supplement or biological-need language is not approved merely because it appears in a client document.

## Required commercial authority

Create `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md` as the canonical, human-readable decision record. It must identify the business decision owner, role, approval/effective date, source/version and supersession rule.

For every offered product or service, resolve or explicitly mark unavailable:

- exact public name, SKU/identifier and offer type;
- one-off purchase, subscription, service agreement, consultation or mixed model;
- included kit instruments/equipment, consumables and quantities;
- included onboarding and training, delivery method and limits;
- included software/portal access, horse/stable/user limits and support;
- base price, currency, GST inclusion/exclusion and tax treatment;
- postage/freight, destination limits, quote method and who bears the cost;
- term, especially the deferred twelve-month statement, renewal and expiry;
- cancellation, cooling-off/refund/return treatment and failed-payment handling;
- kit ownership, warranty/replacement and any buyback amount/conditions;
- trial/stable-trial eligibility, duration, inclusions, conversion and exit conditions;
- fulfilment owner, timing, inventory/availability and customer contact path;
- whether online checkout is permitted for the offer;
- approved public description, limitations, disclaimer and evidence/claims class;
- effective date, version and treatment of existing/historical orders.

The record must include a conflict matrix covering the reference price list, `docs/PRICING_013.md`, database/test seeds, `/pricing`, `/shop`, product detail, admin commerce and checkout amounts. Each conflict must name the selected result or remain unavailable.

Builder may recommend answers, but must not invent business obligations, prices, GST treatment, legal terms, fulfilment promises, subscription rules, refunds, clinical claims or Stripe behaviour. If the business owner does not provide a complete accepted schedule, Builder must still reconcile safe surfaces and close `commercial-authority-pending-commerce-disabled-safe`.

## Commerce decision rules

### Commerce disabled

This is the mandatory fail-safe when any material commercial dimension is unavailable or the business chooses consultation-led sales.

- Checkout must be non-operational and must not create Stripe sessions, orders or payments.
- Public pages must clearly distinguish confirmed pricing from quote-only or unavailable terms.
- Product cards/details must not imply immediate purchase, subscription activation or included services that are unapproved.
- The primary action must use the approved consultation/enquiry path and accurately reflect its current transmission capability.
- Admin commerce must display the disabled reason and catalogue mismatch state without exposing sensitive data.
- Existing historical records and Stripe identifiers must remain readable only under existing permissions and must not be mutated.

### Commerce test-ready

This posture is available only when the complete schedule is approved and existing architecture can represent it safely without an unapproved schema, permission or fulfilment change.

- Database catalogue, public pricing, checkout line items, tax/postage treatment and administrative display must agree exactly.
- Checkout must accept only approved active products and server-authoritative amounts/currency; client-supplied amounts are forbidden.
- The selected purchase model must match existing persistence. A one-off order must not be represented as a subscription, and a subscription must not be simulated as a one-off order.
- Pending order creation, Stripe session creation, success/cancel handling, signed webhook reconciliation and duplicate delivery must be deterministic and idempotent.
- Failed, expired, abandoned, duplicate and out-of-order events must have explicit safe states.
- Test proof must use Stripe test mode, synthetic non-personal customer data and an exact non-production Preview target.
- Test artefacts must be exactly owned, inventoried and cleaned, with final application and Stripe test-state accounting recorded.
- No live-mode key, real card, real customer, Production webhook, Production catalogue mutation or real charge is permitted.

Passing `commerce-test-ready` does not enable Production checkout and does not authorize Production configuration, public commerce activation or deployment.

## Required implementation work

### 1. Reconcile offer and catalogue

- Inventory every active/draft/fallback/seeded product and every price/term shown in source or maintained evidence.
- Map the accepted schedule into one typed, server-authoritative commercial contract where safely representable.
- Align public Pricing, shop/detail, checkout availability and admin commerce to the selected launch posture.
- Preserve Australian English, accessible currency/tax wording and the accepted brand/messaging authority.
- Keep health-adjacent claims out of commercial conversion copy unless separately approved under the claims authority.

### 2. Harden local/test commerce contracts

If `commerce-test-ready` is selected:

- verify exact product/status/amount/currency agreement before creating a checkout session;
- verify authentication/customer-email treatment and privacy minimisation;
- prevent duplicate pending-order ambiguity when session creation fails;
- preserve webhook signature verification and event allowlisting;
- reconcile only the exact supported order/payment record;
- prove duplicate and out-of-order delivery safety;
- keep admin commerce read-only unless a specific existing safe action is already authorised.

If the existing schema cannot represent the approved offer, tax, freight, term, subscription, refund or fulfilment contract without ambiguity, do not improvise. Close `commerce-data-contract-expansion-required-clean` with the exact proposed contract change for later planning.

### 3. Governed test-mode proof

Test-mode external activity may begin only after local contract, security and canonical validation pass and the following are established without emitting secret values:

- exact Vercel Preview deployment and project identity;
- exact Stripe test-mode account/workspace identity and non-live classification;
- configured/missing status for required Preview variables;
- synthetic-only test customer/fixture policy;
- supported Stripe test payment method;
- exact owned run identifier and cleanup/accounting plan;
- rollback/disable path and confirmation that Production aliases/webhooks/configuration are excluded.

Use the safest supported Stripe test tooling available. Never reveal, persist or log keys, webhook secrets, full customer data, full checkout/payment identifiers or raw webhook payloads. Evidence may retain sanitised classifications, short non-secret identifiers only where needed for correlation, and exact counts.

## Approved implementation scope

Builder may change only files directly necessary for:

- the Sprint 030 decision record and conflict matrix;
- typed product/commercial authority and safe launch-posture logic;
- `/pricing`, `/shop`, product detail and their shared presentation components;
- checkout and Stripe webhook code required for the selected safe posture;
- read-only admin commerce status/reconciliation presentation;
- focused synthetic tests, validators and validation registration;
- Sprint 030 evidence and standard planning closeout files.

No migration, schema, RLS, role or permission change is approved. Test-mode Preview/Stripe activity is permitted only within the governed proof boundary above. Any source change beyond the approved files must be necessary to satisfy an existing acceptance boundary and recorded in the final path manifest.

## Explicitly out of scope

- Production or live-mode Stripe activity, real charges, real cards or real customer data.
- Production environment/configuration mutation, Production webhook changes, deployment, alias/domain movement or public checkout activation.
- New subscriptions, invoicing, discount/coupon, inventory, shipping-calculator, tax-service or fulfilment architecture not already safely represented.
- Schema, migration, RPC, RLS, membership, role or permission changes.
- Legal advice or invented consumer-law, GST, refund, warranty or contract terms.
- Enquiry transmission/storage/email; Sprint 029M's visibly non-submitting boundary remains unless separately planned.
- New health, performance, diagnosis, treatment, supplement, race-readiness or guaranteed-outcome claims.
- Clinical-priority authority, scoring thresholds, recommendation content or Sprint 028 dashboard changes.
- Dependency/framework upgrades, remote Supabase mutation, Production data access, staging, commit, push, merge or PR.

## Safety and execution standard

Builder follows the Evidence-Proportional Execution Standard in `AGENTS.md`:

- stop only for material target, authority, security, privacy, payment, migration, destructive, integrity, Production, scope or cleanup risk;
- substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
- keep in-scope tooling, harness, credential, validator, formatting, encoding, reporter and deterministic corrections in Sprint 030;
- do not create a follow-up solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path or redundant verifier is unavailable;
- use manual intervention only after safe in-scope alternatives are exhausted.

When business-owner or operator input is genuinely required, record what is blocked, evidence checked, exact action, step-by-step instructions and what Builder will verify afterward. Do not request secrets, payment data or unrestricted account screenshots.
