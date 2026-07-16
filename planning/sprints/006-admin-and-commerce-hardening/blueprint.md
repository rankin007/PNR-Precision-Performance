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
