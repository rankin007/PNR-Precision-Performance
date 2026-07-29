# Sprint 030 Blueprint

## Phase 1 — Freeze and inventory

1. Record the exact Sprint 028 integrated worktree, branch, HEAD and dirty manifest.
2. Hash or otherwise freeze all pre-existing modified/untracked Sprint 025–028 files so they can be proven preserved.
3. Inventory every commercial source, price, product, term, CTA, checkout state, order/payment state and Stripe environment-name dependency.
4. Produce an approved path manifest before editing.
5. Keep source DOCX files unchanged and classify them as superseded, supporting or unresolved evidence.

## Phase 2 — Build the commercial authority record

1. Create `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md`.
2. Use Question/Answer entries for each required commercial dimension, with recommendation, accepted answer/status, owner, effective date and source.
3. Add an offer table and a conflict matrix spanning documents, seeds, database fields, public pages, admin and checkout.
4. Add a claims screen that excludes unapproved health/performance promises from sales language.
5. Record one selected posture: `commerce-disabled-safe` or `commerce-test-ready`.
6. If authority is incomplete, select disabled-safe and provide exact manual-intervention questions; do not pause safe reconciliation work.

## Phase 3 — Reconcile product surfaces

1. Establish a typed server-authoritative commercial contract or disabled-state contract.
2. Reconcile `/pricing`, `/shop`, product detail, CTA text and checkout availability.
3. Reconcile database/test-seed expectations without mutating a remote catalogue.
4. Reconcile admin commerce to show environment readiness, selected posture and mismatches safely.
5. Ensure currency and GST wording is consistent, accessible and unambiguous.
6. Preserve the 029M enquiry boundary: do not imply its form submits.

## Phase 4 — Prove disabled-safe or test-ready locally

### Disabled-safe proof

- no public route creates checkout/order/payment state;
- direct/malformed/stale checkout requests fail safely;
- no active/fallback product silently bypasses the posture;
- public and admin surfaces explain the state accurately;
- webhook signature and unsupported-event failure behaviour remains safe without remote mutation.

### Test-ready local proof

- exact active product, amount and currency are server authoritative;
- inactive, missing, stale, mismatched and manipulated products fail before Stripe activity;
- order/session failure and retry states are deterministic;
- supported signed event reconciliation is idempotent;
- duplicate, out-of-order, unpaid, expired and unsupported events preserve correct state;
- admin display agrees with persisted order/payment state;
- synthetic fixtures contain no real personal/payment data.

## Phase 5 — Governed Stripe test-mode proof

Run only for `commerce-test-ready` after complete local and canonical gates pass.

1. Prove exact non-production Preview and Stripe test-mode targets by safe non-secret metadata.
2. Record initial exact-owned application fixture and Stripe test-object counts/state.
3. Create one bounded synthetic checkout using a Stripe test payment method.
4. Prove success/cancel handling as applicable and signed webhook reconciliation.
5. Replay the supported event to prove duplicate idempotency; test an approved out-of-order/unpaid case without weakening cleanup.
6. Verify order and payment values agree with the approved schedule.
7. Remove or expire exact-owned application fixtures and Stripe test objects where supported; record any provider-retained immutable test records accurately.
8. Prove final owned-artifact accounting and that Production aliases, configuration, webhooks, catalogue and data were untouched.

If external tooling is unavailable, use equivalent supported API/CLI/dashboard evidence when it preserves the same target, secret, signature, payment and cleanup boundaries. Do not downgrade a payment-security acceptance boundary to source inspection.

## Phase 6 — Validate and close

Run focused Sprint 030 tests plus maintained:

- public Sprint 029M content/pricing and Australian-English checks;
- checkout and webhook tests;
- auth/role/admin-commerce regressions;
- JSON, domain, roles, Supabase self-test and static validation;
- TypeScript and ESLint;
- production build in the root or a recorded reparse-safe equivalent;
- safe HTTP/rendered route smoke for Pricing, shop/detail, checkout unavailable/success/cancel states and admin commerce as applicable;
- `git diff --check`, approved-path, secret/payment/private-data and generated-artifact scans.

Refresh `STATE`, `STATUS`, `DECISIONS`, `RISKS`, `QUESTIONS`, schedule/list, evidence index and Architect briefing. Preserve all pre-existing Sprint 025–028 files and leave work unstaged/uncommitted.

## Preferred implementation shape

- `docs/COMMERCIAL_SCHEDULE_AND_COMMERCE_DECISION_030.md`
- one narrow versioned commercial-offer/launch-posture module
- existing `lib/domain/products.ts` and `lib/stripe/**` extended only where required
- existing public Pricing/shop and read-only admin commerce surfaces
- focused deterministic contract and Stripe-event tests
- `planning/reviews/030-commercial-schedule-and-commerce-decision-evidence.md`

## Stop conditions

Stop external or mutating work when:

- the exact Sprint 028 target or preserved dirty lineage cannot be proven;
- a material commercial term is missing and any purchase path remains enabled;
- the accepted offer requires schema, subscription, tax, freight, fulfilment, permission or legal-contract behaviour outside scope;
- Preview versus Production or Stripe test versus live identity is ambiguous;
- a secret, real payment instrument, real customer or unexpected protected data appears;
- signature, amount, currency, idempotency, order/payment integrity or cleanup fails;
- an external action affects Production or non-owned state;
- cleanup cannot be proven exact and safe.
