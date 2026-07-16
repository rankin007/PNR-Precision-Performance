# Sprint 010 - Live Acceptance Closeout Blueprint

## Execution Shape

Sprint 010 is a verification and evidence sprint. Builder should preserve existing product behavior and avoid source changes unless a planning/evidence document needs updating.

Run the work in this order:

1. Establish the current baseline.
2. Verify local validation still passes.
3. Attempt remote Supabase migration application and non-destructive checks.
4. Attempt authenticated workflow/RLS smoke.
5. Attempt Stripe test checkout and webhook replay.
6. Run production public/safety smoke.
7. Record final acceptance status, blockers, and handoff.

## Baseline Discovery

Builder should inspect and record:

- `git status --short`
- active branch and short revision
- `.vercel/project.json` project identity
- current production URL/deployment status if Vercel CLI access exists
- name-only `.env*` variable presence; no values
- whether `supabase` CLI exists
- whether Stripe CLI or safe replay path exists

Do not print secrets. If a command would expose values, do not run it.

## Local Validation

Use the bounded validation wrapper:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If the restricted sandbox build repeats the known Next startup timeout, rerun the bounded build outside the restricted sandbox only with approval/escalation and record both outcomes.

Run a post-validation process check for `node`, `npm`, and `npx`.

## Supabase Migration And RLS Verification

Target migration:

- `supabase/migrations/0008_launch_membership_permission_seeds.sql`

Allowed path:

- apply only through an existing safe Supabase CLI, dashboard, or project-approved execution path
- do not expose connection strings, service-role keys, SQL editor screenshots with values, or secrets
- do not run destructive SQL
- do not modify schema beyond the already-created additive/idempotent Sprint 008 migration

After application, verify by non-destructive checks where safe access exists:

- launch membership levels exist: `owner`, `trainer`, `stable-staff`, `staff`, `commerce-admin`, `membership-admin`, `admin`
- expected permission mappings exist for portal read, operational write, commerce admin, membership admin, and platform admin roles
- existing assignments are not deleted or downgraded

If remote execution is unavailable, document the exact manual intervention with step-by-step instructions.

## Authenticated Workflow Smoke

Use only safe launch test users or operator-provided sessions. Do not ask the user to paste passwords, tokens, magic links, session cookies, or screenshots containing secrets.

Verify the matrix when fixtures exist:

- anonymous user cannot access portal/admin/data-entry protected surfaces
- inactive or non-member user is denied from portal member surfaces
- active read-only member can access portal and assigned horse read surfaces
- active read-only member is denied from `/data-entry`
- record writer can access `/data-entry`
- record writer can create daily, feeding, and track records for an assigned horse
- record writer cannot write records for an unassigned horse
- submissions review and correction flow work for the real record horse
- platform/admin user can access admin pages
- non-admin user cannot access admin pages

Smoke phone and desktop widths for the critical portal/data-entry paths when a browser path is available.

If fixtures or sessions are unavailable, document the smallest non-secret user/operator action needed.

## Stripe Test Checkout And Webhook Replay

Use test mode only.

Builder may proceed only when safe test-mode access exists without exposing secrets.

Verify:

- active database-backed product checkout can create a Stripe test checkout session
- fallback products remain checkout-disabled when database products are unavailable
- completed test checkout reconciles order/payment state as expected
- signed supported event replay to `/api/stripe/webhook` succeeds
- replaying the same supported event twice does not duplicate or corrupt order/payment records
- unsigned webhook request remains rejected

Do not create live charges, refunds, payouts, subscriptions, tax changes, or live account changes.

If Stripe CLI/dashboard replay access is unavailable, document the manual intervention.

## Production Public/Safety Smoke

Re-smoke the deployed app:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `GET /auth/callback` without callback state
- `POST /api/checkout` with missing product/slug
- `POST /api/stripe/webhook` unsigned request

Record status codes and non-sensitive outcomes only.

## Documentation Updates

At close, Builder should update:

- `docs/PRODUCTION_LAUNCH_READINESS.md` with Sprint 010 results
- `docs/DEPLOYMENT.md` if deployment/status/rollback evidence changed
- `docs/VALIDATION.md` with validation evidence
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md` if migration/check status changed
- `docs/AUTH_RLS_PORTAL_ACCESS.md` if authenticated/RLS evidence changed
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` if workflow smoke evidence changed
- `docs/ADMIN_COMMERCE_HARDENING.md` if admin/commerce/Stripe evidence changed
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` for durable changes
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md` at sprint close
