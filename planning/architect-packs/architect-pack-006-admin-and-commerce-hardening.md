============================================================
FILE: planning/STATE.md
============================================================

# Project State

**Project:** Precision Performance
**Client:** Aprec8 Pty Ltd
**Mode:** Existing Project / Feature or Fix

---

## Current Status

The 120x planning layer is installed inside the existing Precision Performance project.

Client/source reference material is centralized under `references/`, including `references/client-docs/PNR and RJR EPP Working Information`.

Sprint 001 is complete as a truth and readiness audit.

Sprint 002 is complete as a build-readiness sprint. `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` complete through the bounded validation wrapper with explicit `exited 0` statuses when the build is run outside the restricted sandbox. The build is pinned to project-local Node `22.14.0` because global Node `24.14.1` caused Next.js `15.3.8` build startup to hang.

Sprint 003 is complete as a release baseline and environment truth sprint. The canonical local deployment target is documented as Vercel from local project evidence; the non-secret environment contract is documented; Stripe webhook secret-prefix diagnostic logging was removed; the dirty worktree baseline is recorded; and validation remains green through the bounded wrapper using the known-good unsandboxed build path.

Sprint 004 is complete as an auth, RLS, and portal access sprint. Auth redirects are constrained to local app paths; callback failure handling is non-sensitive; app auth context now distinguishes signed-in users from active portal members; portal layout uses a portal-specific access guard; RLS role-read policies now allow users to resolve their own active membership/permission context; and the acceptance matrix is documented in `docs/AUTH_RLS_PORTAL_ACCESS.md`.

Sprint 005 is complete as a portal and data-entry workflow sprint. The data-entry shell and actions now require operational write access, daily/feeding/track create actions verify user-scoped horse access before writing, submission correction flows verify the real record horse before updating, submission ID parsing preserves UUIDs, fallback submission IDs are coherent, and user-facing workflow errors are clearer. Evidence and manual-intervention instructions are documented in `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`.

Sprint 006 is approved as an admin and commerce hardening sprint. The goal is to make launch-critical admin membership/user controls and Stripe commerce flows safe enough for launch verification: admin user/member flows, product catalogue readiness, checkout session creation, webhook reconciliation into orders/payments, failure states, duplicate webhook behavior, and audit notes.

Live Supabase test-user, direct remote RLS verification, assigned-horse fixture verification, authenticated phone/desktop workflow smoke, Stripe test checkout, and Stripe webhook replay remain blocked unless the user provides non-secret setup/access before or during Sprint 006.

The approved path to Done remains Sprints 006-007 in `planning/SPRINT_SCHEDULE.md`.

---

## Workflow Profile

Selected profile: `standard`

Reason: this is an existing web application with Supabase, Stripe, auth, data-entry, admin, and deployment surfaces. Sprint 006 touches privileged admin flows and payment/webhook behavior, so Builder must stay inside approved sprint scope, avoid credential exposure, avoid destructive database/data changes, and stop before production deployment, broad schema redesign, production project-setting changes, or live billing changes unless explicitly authorized.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 006 approved scope without another approval.

Sprint 006 explicitly authorizes narrow implementation work for:

- admin user status and membership assignment flows needed for launch operations
- admin commerce visibility needed to inspect products, orders, payments, and checkout/webhook state
- product catalogue readiness for existing public shop and checkout flows
- Stripe checkout session creation hardening for existing one-time product checkout
- Stripe webhook reconciliation into `orders` and `payments`
- duplicate/out-of-order webhook behavior where it can be handled idempotently
- non-sensitive failure states, audit notes, validation notes, and smoke/checklist documentation
- additive or policy-focused database/migration fixes only where directly required by Sprint 006 acceptance

Builder must stop and ask before:

- touching or printing secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing production Vercel/Supabase/Stripe project settings
- changing authentication, authorization, RLS, billing, payment, database schema, or migrations outside the narrow Sprint 006 acceptance path
- modifying files outside the approved file set
- starting a production deployment
- installing packages from the network
- changing launch infrastructure, Node runtime compatibility, broad cleanup, `.release-main/`, or generated artifacts outside this sprint

Manual intervention rule: whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly and record exact instructions for the user/manual operator. The record must include what is blocked, evidence checked, the exact action needed, step-by-step instructions, and what Builder will verify after the action is complete.

---

## Active Sprint

`planning/sprints/006-admin-and-commerce-hardening/`

Sprint 006 - Admin And Commerce Hardening

---

## Approved Sprint Schedule

- Sprint 006 - Admin And Commerce Hardening
- Sprint 007 - Production Launch Readiness

Definition of Done: the MVP is live, tested, documented, and handoff-ready, with public site, auth, permission-safe portal, data-entry workflows, admin, Stripe, production deployment, smoke tests, and rollback notes verified.

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads the Sprint 006 four-file sprint set under `planning/sprints/006-admin-and-commerce-hardening/`.
3. Builder maps the existing admin, product, checkout, Stripe webhook, commerce helper, and persistence migration surfaces before editing.
4. Builder carries forward Sprint 004-005 live Supabase/RLS/workflow blockers and requests only non-secret setup/access if live verification is possible.
5. Builder implements the smallest hardening fixes needed for admin user/membership operations, product readiness, checkout creation, webhook reconciliation, duplicate webhook handling, and failure states.
6. Builder validates with lint, TypeScript, build, secret-fragment scans, and commerce/admin smoke evidence or clearly flagged manual-intervention instructions.
7. Builder refreshes planning/docs at close and hands off to Sprint 007.

---

## Blockers

No blocker for Sprint 006 planning.

Builder may discover that real Supabase test users, Stripe test credentials, Stripe CLI/webhook replay, product/order fixtures, remote RLS execution, or browser checkout access are unavailable. If so, Builder must still inspect and harden local code paths where evidence allows, then flag the blocked acceptance case with exact manual-intervention instructions and the smallest non-secret user action needed to complete it.

============================================================
FILE: planning/sprints/006-admin-and-commerce-hardening/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/006-admin-and-commerce-hardening/blueprint.md
============================================================

# Sprint 006 - Admin And Commerce Hardening Blueprint

## Workflow Profile

Profile: `standard`

Reason: the sprint touches privileged admin and Stripe commerce paths. It is not a production deployment sprint, but it has auth, service-role, payment, persistence, and webhook risk. Builder may implement inside the approved file set, but must stop before secrets, destructive data changes, production settings, live financial operations, broad schema redesign, or scope expansion.

## Approved File Set

Builder may edit these files during Sprint 006:

- `planning/STATE.md`
- `planning/DECISIONS.md`, only to add Sprint 006 decisions or manual-intervention decisions
- `planning/DOMAIN.md`, only to update Sprint 006 context at close
- `planning/RISKS.md`, only to update Sprint 006 risks at close
- `planning/QUESTIONS.md`, only to update Sprint 006 questions/blockers at close
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, only if Sprint 006 access evidence updates the carried-forward matrix
- `docs/ENVIRONMENT.md`, only for non-secret Supabase/Stripe/admin/commerce contract clarifications
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, only if Sprint 006 verification changes carried Sprint 005 blockers
- `docs/ADMIN_COMMERCE_HARDENING.md`, if created or updated for Sprint 006 evidence
- `app/(admin)/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/users/page.tsx`
- `app/(admin)/admin/users/actions.ts`
- `app/(admin)/admin/memberships/page.tsx`
- `app/(admin)/admin/memberships/actions.ts`
- `app/(admin)/admin/commerce/page.tsx`, if created for admin commerce visibility
- `app/(admin)/admin/commerce/actions.ts`, if created for narrow non-destructive admin commerce actions
- `app/shop/page.tsx`
- `app/shop/[slug]/page.tsx`
- `app/api/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/api/setup/status/route.ts`, only for non-secret commerce readiness status alignment
- `components/layout/app-shell.tsx`
- `components/layout/section-card.tsx`
- `components/layout/status-grid.tsx`
- `lib/auth/session.ts`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/auth/roles.ts`, only for existing admin/commerce permission-code alignment
- `lib/auth/bootstrap.ts`
- `lib/domain/products.ts`
- `lib/stripe/commerce.ts`
- `lib/stripe/env.ts`
- `lib/stripe/server.ts`
- `lib/supabase/admin.ts`
- `lib/supabase/server.ts`
- `lib/supabase/env.ts`
- `lib/navigation.ts`
- `supabase/migrations/0001_initial_schema.sql`, inspection-first and edit only if the minimal Sprint 006 fix truly belongs there
- `supabase/migrations/0002_rls_policies.sql`
- `supabase/migrations/0003_staff_scope_and_permissions.sql`
- `supabase/migrations/0004_staff_rls_extension.sql`
- `supabase/migrations/0005_membership_level_seeds.sql`, only for non-secret admin/commerce permission seed alignment directly required by Sprint 006
- `supabase/migrations/0006_stripe_checkout_persistence.sql`
- `supabase/migrations/0007_test_product_seeds.sql`
- `supabase/bootstrap/remote-init.sql`, only for non-secret bootstrap/RLS/commerce setup corrections directly required by Sprint 006
- `scripts/`, only for non-secret validation helpers, webhook payload fixtures, or smoke-check scripts if needed

Inspection-only areas:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `middleware.ts`, if present
- `.vercel/`
- `docs/DEPLOYMENT.md`
- public/marketing routes outside shop/admin, only for navigation context
- portal and ops/data-entry routes, only to ensure Sprint 004-005 behavior is not regressed
- environment files, names/presence/shape only; do not print secret values

## Implementation Approach

1. Map the current implementation.
   - Read the admin user/membership pages and actions.
   - Read product catalogue helpers and shop pages.
   - Read checkout route, webhook route, Stripe env/server helpers, and commerce persistence helper.
   - Read relevant migrations for products, orders, payments, permissions, and RLS.
   - Record the behavior map in `docs/ADMIN_COMMERCE_HARDENING.md`.

2. Harden admin flows.
   - Keep `requireAdminAppContext` as the gate for admin pages/actions.
   - Validate allowed user statuses rather than accepting arbitrary submitted status strings.
   - Validate membership level codes against database-backed available levels before assignment.
   - Keep assignment idempotent.
   - Add clear non-sensitive errors for missing service role, missing fields, invalid status, invalid level, missing user, and failed update/assignment.
   - Do not add destructive user or membership removal unless explicitly approved.

3. Harden commerce visibility.
   - Prefer a read-only admin commerce page if launch operators need visibility into products, orders, payments, and checkout status.
   - Use service-role reads only after admin gate.
   - Avoid raw customer/payment details; show only safe operational fields such as product name, order status, payment status, currency, amount, provider identifiers already stored for reconciliation, timestamps, and counts.
   - If schema does not support a desired view, document the gap rather than redesigning broadly.

4. Harden product catalogue and checkout creation.
   - Ensure inactive/unavailable products cannot be purchased.
   - Validate price amount and currency before creating Stripe sessions.
   - Ensure checkout persists a pending order before redirect when configured.
   - Ensure missing configuration and failed persistence produce non-sensitive user-facing redirects or responses.
   - Avoid logging raw Stripe errors if they may contain sensitive request context; prefer sanitized code/type/message where safe.

5. Harden webhook reconciliation.
   - Keep webhook signature verification mandatory.
   - Reconcile only supported checkout session events.
   - Use order ID metadata when present and fallback to checkout session ID when needed.
   - Make repeated delivery safe using existing unique constraints/upserts.
   - Avoid duplicating order items when duplicate events arrive.
   - Handle missing product/payment intent metadata gracefully.
   - Record a non-sensitive audit trail in documentation; add database audit fields only if already supported or narrowly additive.

6. Validate and close.
   - Run source inspection, smoke/checklist verification, lint, TypeScript, build, and secret-fragment scans.
   - If live Stripe/Supabase checks are unavailable, document exact manual-intervention steps.
   - Refresh state, risks, questions, validation docs, readiness docs, and architect briefing for Sprint 007.

## Migration And Data Rules

- Database edits must be additive or policy-focused unless explicitly approved by the user.
- Do not delete or mutate production data.
- Do not run destructive SQL.
- Do not create broad new commerce schema if the existing `products`, `orders`, `order_items`, and `payments` tables can support Sprint 006 acceptance.
- If webhook idempotency requires a missing unique constraint, prefer an additive `if not exists` style migration.
- If admin visibility requires a missing index, prefer an additive index.
- If launch product seeds need correction, keep seeds non-secret and deterministic.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly.

For each manual intervention, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
- whether Sprint 006 can still close with local/code-backed evidence or must carry the case forward

Examples that must be flagged this way include missing Supabase environment variables, missing Stripe environment variables, unavailable test users, unavailable product/order/payment fixtures, blocked Stripe test checkout, blocked Stripe CLI/webhook replay, unavailable remote RLS execution, browser checkout smoke blockers, validation timeouts, and approval needs for network installs or out-of-scope files.

============================================================
FILE: planning/sprints/006-admin-and-commerce-hardening/acceptance.md
============================================================

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

============================================================
FILE: planning/sprints/006-admin-and-commerce-hardening/handoff-prompt.md
============================================================

# Sprint 006 - Admin And Commerce Hardening Handoff

Builder, you are executing Sprint 006 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/006-admin-and-commerce-hardening/requirements.md`
6. `planning/sprints/006-admin-and-commerce-hardening/blueprint.md`
7. `planning/sprints/006-admin-and-commerce-hardening/acceptance.md`
8. `planning/SPRINT_SCHEDULE.md`
9. `docs/AUTH_RLS_PORTAL_ACCESS.md`
10. `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
11. `docs/ENVIRONMENT.md`
12. `docs/VALIDATION.md`
13. `docs/READINESS_AUDIT.md`
14. relevant admin, product, checkout, webhook, commerce helper, Stripe, Supabase, and migration files identified by the sprint

Implementation is authorized for this sprint only within the approved file set and only for launch-critical admin user/membership hardening, admin commerce visibility, product catalogue readiness, existing one-time Stripe checkout session creation, webhook reconciliation into orders/payments, duplicate webhook behavior, related additive/policy-focused migrations, and related documentation/validation.

Start by mapping the current admin and commerce surfaces before editing. Then make the smallest fixes required to make user/member operations, product readiness, checkout creation, webhook reconciliation, duplicate delivery handling, and failure states safe enough for launch verification.

Carry Sprint 004-005 live Supabase/RLS/workflow blockers forward unless access exists. Carry Stripe test checkout and webhook replay blockers forward unless safe test-mode access exists. Every time something does not work or needs user/manual input, flag it with exact instructions under the manual intervention rule.

Do not print secrets. Do not perform live financial operations. Do not deploy. Do not change production project settings. Do not delete data. Do not broaden scope.

Validate lint, TypeScript, build, secret-fragment scans, admin smoke, commerce smoke, and post-validation process state. Close with refreshed documentation and a clean handoff to Sprint 007 - Production Launch Readiness.

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "006-admin-and-commerce-hardening",
  "updated": "2026-07-11T18:45:00+10:00"
}
