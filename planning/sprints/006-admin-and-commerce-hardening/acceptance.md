# Sprint 006 - Admin And Commerce Hardening Acceptance

Sprint 006 is complete when all applicable acceptance criteria are met or explicitly carried forward with manual-intervention instructions.

## Admin Acceptance

- the current admin user, membership, and permission implementation has been inspected and summarized
- `/admin` remains gated to users with `platform.admin`
- non-admin users are denied from admin pages/actions, or live verification is flagged with exact manual-intervention instructions
- admin user status updates accept only known safe statuses and reject missing/invalid submitted values
- admin membership assignment validates user email, available membership level code, and service-role readiness
- membership assignment is idempotent for repeated same user/level assignment
- admin failures use clear non-sensitive user-facing errors
- no admin action exposes service-role behavior to client components
- no destructive user, membership, or permission deletion is added

## Commerce Acceptance

- the current product, checkout, webhook, commerce helper, and persistence migration implementation has been inspected and summarized
- public product listing and detail pages show database-backed active products when Supabase is configured
- fallback products are clearly non-checkout-ready when Supabase/Stripe/admin configuration is absent
- inactive or unavailable products cannot create checkout sessions
- checkout validates product slug, active status, positive price, currency, Supabase public/admin configuration, and Stripe server configuration before redirecting to Stripe
- checkout creates a pending order and order item before Stripe redirect when configured
- checkout updates the order with Stripe checkout session and payment intent IDs when available
- checkout failure paths mark the pending order failed where possible and return non-sensitive failure states
- supported webhook events reconcile into `orders` and `payments`
- duplicate webhook delivery does not create duplicate payments or duplicate order items
- out-of-order or missing-metadata webhook cases are handled safely or documented as blocked/gapped with exact next steps
- webhook verification remains mandatory before reconciliation
- webhook diagnostics do not print secrets, secret fragments, raw webhook secrets, full tokens, or raw sensitive payment method details
- admin commerce visibility exists or the current visibility gap is documented with a narrow next-step recommendation

## Security And Scope Acceptance

- no secret values or secret fragments are printed, logged, committed, or documented
- no live Stripe charge, refund, payout, subscription, tax, or production account change is performed
- no production deployment or production setting change is performed
- no destructive database/data operation is performed
- no broad schema redesign is performed
- files outside the Sprint 006 approved file set are not modified
- Sprint 004 portal/auth/RLS access behavior is not intentionally weakened
- Sprint 005 portal/data-entry workflow behavior is not intentionally weakened
- every blocked/manual-input-required case is flagged with instructions under the manual intervention rule

## Documentation Acceptance

- `docs/ADMIN_COMMERCE_HARDENING.md` records:
  - admin behavior map
  - product/checkout/webhook behavior map
  - commerce persistence evidence
  - smoke matrix results
  - blocked live verification cases
  - manual-intervention instructions
  - remaining launch-readiness notes
- `docs/READINESS_AUDIT.md` includes a Sprint 006 closeout section
- `docs/VALIDATION.md` reflects current validation results
- `planning/DECISIONS.md`, `planning/DOMAIN.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` are updated only where Sprint 006 changed durable decisions/context/risks/questions
- `planning/ARCHITECT_BRIEFING.md` is refreshed for Sprint 007
- `planning/STATE.md` and `planning/STATUS.json` are updated at close

## Validation Acceptance

Required commands/checks:

- `git status --short`
- inspect admin user/membership flows and admin gates
- inspect product catalogue, checkout, webhook, Stripe env/server helpers, commerce helper, and commerce migrations
- non-secret environment presence check for Supabase/Stripe/admin variables if needed
- secret-fragment scan of changed diagnostics/logging
- admin smoke matrix:
  - anonymous -> `/admin`
  - signed-in non-admin -> `/admin`
  - admin -> `/admin`
  - admin -> `/admin/users`
  - admin valid user status update
  - admin invalid/missing user status update
  - admin -> `/admin/memberships`
  - admin valid membership assignment
  - admin repeated same membership assignment
  - admin invalid/missing membership assignment
- commerce smoke matrix:
  - `/shop` with missing Supabase configuration
  - `/shop` with configured Supabase active products, or blocked live case documented
  - `/shop/[slug]` active product detail
  - `/shop/[slug]` unavailable/inactive product detail
  - checkout missing slug
  - checkout inactive/unavailable product
  - checkout missing Supabase/admin/Stripe configuration
  - checkout configured happy path through Stripe test session, or blocked live case documented
  - webhook missing signature
  - webhook invalid signature
  - webhook supported event reconciliation with test payload, Stripe CLI, or code-backed fixture
  - duplicate supported webhook delivery
  - out-of-order/missing metadata supported webhook delivery
  - admin commerce visibility for products/orders/payments, or documented gap
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.
