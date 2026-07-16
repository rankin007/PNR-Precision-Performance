# Sprint 006 - Admin And Commerce Hardening Requirements

## Goal

Make the Precision Performance business operations layer safe enough for launch verification.

The sprint is successful when launch administrators can manage user/member access needed for the MVP, public product catalogue and checkout behavior are coherent, Stripe checkout and webhook reconciliation update commerce records predictably, duplicate webhook events are safe, and all remaining live verification blockers are documented with exact manual-intervention instructions.

## Background

Sprints 004 and 005 hardened auth, portal access, assigned-horse visibility, and operational data-entry writes. The remaining launch-critical surface before production readiness is the admin and commerce layer.

Existing local evidence shows:

- admin routes exist under `app/(admin)/admin`
- admin user and membership actions use Supabase service-role operations after admin gates
- public shop routes exist under `app/shop`
- checkout is created by `app/api/checkout/route.ts`
- Stripe webhooks are handled by `app/api/stripe/webhook/route.ts`
- commerce persistence helpers exist in `lib/stripe/commerce.ts`
- product reads exist in `lib/domain/products.ts`
- migrations `0006_stripe_checkout_persistence.sql` and `0007_test_product_seeds.sql` exist
- remote Supabase and Stripe test/live behavior remains unverified

## In Scope

Builder should:

- inspect current admin user, membership, product, checkout, webhook, commerce helper, migration, and shop behavior before editing
- preserve Sprint 004 auth/admin gates unless Sprint 006 acceptance requires a narrow compatible fix
- preserve Sprint 005 portal/data-entry permission boundaries
- harden admin user status changes with safe input validation and clear user-facing errors
- harden admin membership assignment with safe input validation, allowed-level checks, idempotent assignment behavior, and clear user-facing errors
- add or improve admin visibility for launch-relevant product/order/payment state where the existing schema supports it
- verify the public product catalogue uses database-backed active products when Supabase is configured and non-checkout fallback products only when configuration is absent
- harden checkout session creation for active products, valid pricing, configured Supabase admin persistence, configured Stripe server keys, and safe redirect behavior
- ensure checkout creates or updates commerce persistence without leaking secrets or raw sensitive details
- harden webhook reconciliation for `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, and `checkout.session.expired`
- make duplicate webhook delivery idempotent for orders/payments where existing schema permits it
- handle missing metadata, missing order IDs, missing product IDs, unavailable orders, failed Stripe calls, and missing environment configuration with non-sensitive statuses
- make the smallest source, RLS, or additive migration fixes needed for Sprint 006 acceptance
- document admin and commerce behavior, smoke results, blocked live cases, and launch handoff notes
- update readiness and validation documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the Sprint 007 handoff

## Out Of Scope

- production deployment
- production project-setting changes
- production domain changes
- live Stripe charges, refunds, payouts, disputes, tax settings, subscriptions, coupons, promotion codes, invoices, or Connect flows
- broad billing/subscription system design
- production Stripe account configuration changes
- destructive database changes
- deleting users, member profiles, memberships, products, orders, payments, files, generated artifacts, or data
- printing secret values, credential values, tokens, passwords, private keys, full connection strings, raw webhook secrets, raw payment method details, or secret fragments
- exposing service-role or Stripe secret capabilities to client components
- normalizing or reverting unrelated dirty-worktree changes
- force-removing or force-archiving `.release-main/`
- Node 24 compatibility work
- dependency/security remediation from `npm audit`
- installing packages from the network without approval
- production launch checks reserved for Sprint 007
- broad visual redesign, marketing copy rewrite, or public site polish beyond commerce/admin clarity needed for this sprint
- AI recommendations, laboratory integrations, E-Trakka integration, native voice recording, multi-login trainer teams, owner/vet/external stakeholder app logins, heavy AWS processing, or laboratory staff workflows

## Non-Functional Requirements

- Keep all diagnostics non-sensitive. Report configured/missing, identifiers already safe to store, event type, status, and structural error codes only.
- Do not log or document Stripe secret keys, webhook secrets, Supabase service-role keys, tokens, private keys, or fragments.
- Treat payment and admin paths as high-risk: prefer explicit error states and stop before ambiguity.
- Keep schema changes additive or policy-focused unless the user explicitly approves otherwise.
- Preserve the known-good validation path using the bounded wrapper and project-local Node `22.14.0`.
- Carry live verification blockers forward rather than silently treating code inspection as production proof.

## Required Documentation

Builder must create or update:

- `docs/ADMIN_COMMERCE_HARDENING.md` with the Sprint 006 behavior map, evidence, smoke matrix, blockers, manual-intervention instructions, and launch notes
- `docs/READINESS_AUDIT.md` with a concise Sprint 006 closeout section
- `docs/VALIDATION.md` with exact validation command outcomes
- `planning/ARCHITECT_BRIEFING.md` for Sprint 007 handoff
- planning state/status files at close
