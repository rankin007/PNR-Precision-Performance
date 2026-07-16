# Sprint 007 - Production Launch Readiness Blueprint

## Workflow Profile

Profile: `standard`

Reason: the sprint verifies deployment, environment readiness, auth/RLS, portal/data-entry, admin, commerce, Stripe checkout/webhook, rollback, and client handoff. It is a launch-readiness sprint, but Builder must stop before production deployment, DNS changes, production settings, live financial operations, destructive data changes, secrets, or scope expansion unless explicitly authorized.

## Approved File Set

Builder may edit these files during Sprint 007:

- `planning/STATE.md`
- `planning/DECISIONS.md`, only to add Sprint 007 decisions or manual-intervention decisions
- `planning/DOMAIN.md`, only to update Sprint 007 context at close
- `planning/RISKS.md`, only to update Sprint 007 risks at close
- `planning/QUESTIONS.md`, only to update Sprint 007 questions/blockers at close
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/ENVIRONMENT.md`
- `docs/DEPLOYMENT.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, only for Sprint 007 live verification evidence or carried-blocker updates
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, only for Sprint 007 live verification evidence or carried-blocker updates
- `docs/ADMIN_COMMERCE_HARDENING.md`, only for Sprint 007 live verification evidence or carried-blocker updates
- `docs/PRODUCTION_LAUNCH_READINESS.md`, if created or updated for Sprint 007 evidence
- `README.md`, only for launch/handoff instructions directly required by Sprint 007
- `app/api/setup/status/route.ts`
- `app/api/checkout/route.ts`, only for launch-readiness failure-state or non-sensitive status fixes directly required by Sprint 007 acceptance
- `app/api/stripe/webhook/route.ts`, only for launch-readiness failure-state or non-sensitive status fixes directly required by Sprint 007 acceptance
- `app/(admin)/admin/commerce/page.tsx`, only for launch-readiness visibility fixes directly required by Sprint 007 acceptance
- `app/(admin)/admin/users/page.tsx`, only for launch-readiness visibility/error-state fixes directly required by Sprint 007 acceptance
- `app/(admin)/admin/memberships/page.tsx`, only for launch-readiness visibility/error-state fixes directly required by Sprint 007 acceptance
- `app/shop/page.tsx`, only for launch-readiness checkout/readiness clarity directly required by Sprint 007 acceptance
- `app/shop/[slug]/page.tsx`, only for launch-readiness checkout/readiness clarity directly required by Sprint 007 acceptance
- `app/sign-in/page.tsx`, only for launch-readiness smoke or non-sensitive error-state fixes directly required by Sprint 007 acceptance
- `components/auth/sign-in-form.tsx`, only for launch-readiness smoke or non-sensitive error-state fixes directly required by Sprint 007 acceptance
- `app/auth/callback/route.ts`, only for launch-readiness smoke or non-sensitive error-state fixes directly required by Sprint 007 acceptance
- `app/(portal)/layout.tsx`, only for launch-readiness smoke or non-sensitive access-state fixes directly required by Sprint 007 acceptance
- `app/(portal)/portal/page.tsx`, only for launch-readiness smoke/readiness fixes directly required by Sprint 007 acceptance
- `app/(portal)/portal/horses/page.tsx`, only for launch-readiness smoke/readiness fixes directly required by Sprint 007 acceptance
- `app/(portal)/portal/horses/[horseId]/page.tsx`, only for launch-readiness smoke/readiness fixes directly required by Sprint 007 acceptance
- `app/(portal)/portal/reports/page.tsx`, only for launch-readiness smoke/readiness fixes directly required by Sprint 007 acceptance
- `app/(portal)/data-entry/page.tsx`, only for launch-readiness smoke/readiness fixes directly required by Sprint 007 acceptance
- `app/(portal)/data-entry/actions.ts`, only for launch-readiness smoke/readiness fixes directly required by Sprint 007 acceptance
- `lib/auth/session.ts`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/auth/roles.ts`, only for launch-readiness permission-code alignment directly required by Sprint 007 acceptance
- `lib/auth/bootstrap.ts`
- `lib/supabase/env.ts`
- `lib/supabase/server.ts`
- `lib/supabase/admin.ts`
- `lib/stripe/env.ts`
- `lib/stripe/server.ts`
- `lib/stripe/commerce.ts`, only for launch-readiness reconciliation/readiness fixes directly required by Sprint 007 acceptance
- `lib/domain/products.ts`, only for launch-readiness product/readiness fixes directly required by Sprint 007 acceptance
- `lib/navigation.ts`, only for launch-readiness navigation clarity directly required by Sprint 007 acceptance
- `middleware.ts`, only for launch-readiness route/access fixes directly required by Sprint 007 acceptance
- `vercel.json`, only for non-secret launch-readiness configuration fixes directly required by Sprint 007 acceptance
- `scripts/`, only for non-secret validation, smoke, environment name-presence, or launch checklist helpers if needed

Inspection-only areas:

- `.vercel/`
- `.env*` files, names/presence/shape only; do not print values
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- Supabase migrations and bootstrap SQL, unless a minimal additive/policy-focused Sprint 007 fix is explicitly necessary and approved by scope
- all public, portal, admin, shop, checkout, webhook, auth, and setup routes for smoke mapping
- generated artifacts and `.release-main/`, inspection only

## Implementation Approach

1. Map current launch surfaces.
   - Read deployment docs/config, `.vercel` linkage, `vercel.json`, setup/status route, environment docs, validation docs, and readiness audit.
   - Read carried Sprint 004-006 docs and blockers.
   - Read public/auth/portal/data-entry/admin/shop/checkout/webhook surfaces needed for smoke checks.
   - Record the launch map in `docs/PRODUCTION_LAUNCH_READINESS.md`.

2. Verify non-secret environment and deployment readiness.
   - Confirm Vercel is still the evidence-backed target.
   - Confirm or flag the production project and production domain.
   - Check required environment variable names/presence/requiredness only.
   - Do not print values or fragments.
   - If remote environment access is unavailable, document exact manual steps for the user/operator.

3. Verify health/setup and local readiness.
   - Run the setup/status endpoint locally if feasible.
   - Ensure readiness output is non-sensitive and useful.
   - Make narrow fixes if the readiness signal is wrong, misleading, or leaks detail.

4. Run smoke checks.
   - Prefer automated or repeatable local smoke checks where possible.
   - For authenticated or remote-only flows, use provided safe test accounts/sessions if available.
   - Cover public, auth, portal, data-entry, admin, commerce, shop, checkout, and webhook cases.
   - Separate evidence into `passed`, `failed`, `blocked`, and `manual required`.

5. Verify Supabase and permissions if access is available.
   - Use role labels, fixture labels, and route outcomes rather than secrets.
   - Confirm admin, active record writer, read-only member, inactive/non-member, and anonymous cases where possible.
   - Confirm assigned-horse data boundaries and operational write boundaries where possible.
   - If unavailable, carry forward exact manual-intervention steps.

6. Verify Stripe test/live-ready behavior if access is available.
   - Use test mode only unless the user explicitly authorizes another safe path.
   - Verify checkout happy path, failed/missing config states, webhook signature failure, supported event reconciliation, duplicate delivery, and missing/out-of-order metadata behavior.
   - Do not perform live charges or production Stripe account changes.

7. Prepare launch handoff.
   - Write deployment/runbook steps, rollback notes, smoke matrix, client acceptance checklist, known blockers, and manual-intervention instructions.
   - Update readiness/validation/environment/deployment docs and carried evidence docs.
   - Refresh `planning/ARCHITECT_BRIEFING.md`, `planning/STATE.md`, and `planning/STATUS.json` at close.

## Deployment And Production Rules

- Do not start, promote, or change a production deployment without explicit user authorization during this sprint.
- Do not change production project settings, DNS, Supabase settings, Stripe settings, or live data without explicit user authorization.
- If the user authorizes deployment or production setting work during the sprint, record the exact authorization, action, evidence, and rollback step in `docs/PRODUCTION_LAUNCH_READINESS.md`.
- Prefer staging/preview/test-mode verification before production.
- Keep rollback instructions concrete and reversible.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly.

For each manual intervention, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
- whether Sprint 007 can close or must remain blocked until the action is completed

Examples that must be flagged this way include missing production domain confirmation, missing Vercel environment access, missing Supabase test users, unavailable assigned-horse fixtures, unavailable remote RLS execution, missing Stripe test access, blocked Stripe CLI/webhook replay, unavailable authenticated phone/desktop smoke, production deployment authorization needs, validation timeouts, and approval needs for network installs or out-of-scope files.
