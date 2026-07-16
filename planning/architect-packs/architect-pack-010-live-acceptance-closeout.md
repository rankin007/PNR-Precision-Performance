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

Sprint 006 is complete as an admin and commerce hardening sprint. Admin user status and membership assignment flows now validate inputs and report clearer non-sensitive failures; `/admin/commerce` provides read-only product/order/payment visibility; `/shop` uses database-backed active products when configured and checkout-disabled fallback products otherwise; checkout validates product, price, currency, Supabase admin persistence, and Stripe readiness; webhook verification is mandatory and reconciliation is more idempotent for orders, payments, and order items. Evidence and manual-intervention instructions are documented in `docs/ADMIN_COMMERCE_HARDENING.md`.

Sprint 007 is complete as a production launch readiness verification and handoff sprint. Local/source-backed readiness is green, but production launch remained no-go until user/operator confirmation and live access were provided.

Sprint 008 is complete as a launch Supabase memberships and env readiness sprint. The user confirmed Vercel project `pnr-precision-performance`, confirmed all three launch domains are valid, and asked Builder to shape the Supabase membership/permission levels and repair Stripe env example guidance. Builder added an additive launch membership/permission seed migration, regenerated Supabase bootstrap SQL, created the launch membership matrix doc, recreated `.env.example` with placeholder-only Stripe/Supabase/Vercel guidance, and validated lint, TypeScript, and the known-good unsandboxed build path.

Sprint 009 is complete as a production launch deployment sprint. Architect Pack 009 was created and applied, Vercel production env names were verified by encrypted/configured status only, local validation passed, and production deployment completed to `https://precisionperformance.com.au` on Vercel deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`. Public/safety smoke passed. On 2026-07-12, the user accepted the remaining live items as known follow-up conditions: remote Supabase migration application, authenticated workflow smoke, and Stripe test checkout/webhook replay.

Sprint 010 is approved as a live acceptance closeout sprint. This sprint authorizes Builder to close the accepted follow-up verification items through safe, non-secret, non-destructive production or test-mode checks where configured access already exists, and to record exact manual-intervention instructions where access is still blocked.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 010 touches production-adjacent Supabase migration application, authenticated user/RLS workflow verification, Stripe test checkout and webhook replay, and final live acceptance evidence. Builder must avoid secret exposure, destructive database/data changes, live financial changes, DNS changes, and unaudited project-setting changes.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 010 approved scope without another approval.

Sprint 010 explicitly authorizes:

- non-secret inspection of configured/missing environment and deployment status
- applying `supabase/migrations/0008_launch_membership_permission_seeds.sql` to the target Supabase project only through an existing safe approved path that does not print, store, or expose secrets
- running non-destructive Supabase membership/permission/RLS existence checks when an existing safe path is available
- using existing launch test users and fixtures for authenticated portal, data-entry, admin, and denial-path smoke without storing credentials
- running Stripe test-mode checkout and signed webhook replay only if existing safe test-mode access is configured
- replaying a supported Stripe test event twice to verify duplicate delivery behavior, when safe test-mode replay is available
- running local validation and production smoke checks for already deployed public/safety routes
- updating planning and evidence docs with results, blockers, and final acceptance status

Builder must stop and ask before:

- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes or rollbacks
- creating, deleting, or modifying real production users, horses, products, orders, payments, subscriptions, Stripe objects, or production customer data outside explicitly safe test-mode smoke and existing approved fixtures
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing DNS/domain settings
- changing Vercel/Supabase/Stripe project settings beyond configured/missing status checks and the already-created additive Sprint 008 migration
- changing authentication, authorization, RLS, billing, payment, database schema, migrations, or product behavior beyond applying the already-created additive Sprint 008 migration
- modifying files outside the approved file set
- installing packages from the network
- changing launch infrastructure, Node runtime compatibility, broad cleanup, `.release-main/`, or generated artifacts outside this sprint

---

## Active Sprint

`planning/sprints/010-live-acceptance-closeout/`

Sprint 010 - Live Acceptance Closeout

---

## Approved Sprint Schedule

Sprints 001-009 are complete through production deployment. Sprint 010 is the current approved follow-up verification sprint for live acceptance closeout.

---

## Next Actions

1. Builder applies Architect Pack 010.
2. Builder reads the Sprint 010 four-file sprint set and uses it as the source of truth.
3. Builder verifies current deployment and local validation status without exposing secrets.
4. Builder attempts the Supabase, authenticated workflow, and Stripe test-mode acceptance gates through safe configured paths.
5. Builder records passed evidence or manual-intervention instructions for any blocked gate.
6. Builder updates sprint-close docs and refreshes `planning/ARCHITECT_BRIEFING.md`.

---

## Blockers

Sprint 010 is authorized for verification closeout, not for risky production mutation. If remote Supabase access, launch test sessions, fixtures, Stripe test-mode access, or signed webhook replay are unavailable, Builder must document the blocker and exact manual intervention required instead of inventing credentials, exposing secrets, or broadening scope.

============================================================
FILE: planning/sprints/010-live-acceptance-closeout/requirements.md
============================================================

# Sprint 010 - Live Acceptance Closeout Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user requested: "Architect Pack 010: Go create the pack."

Sprint 009 production deployment is complete. On 2026-07-12, the user accepted the remaining live items as known follow-up conditions rather than Builder-verified evidence.

## Goal

Close out the accepted live follow-up conditions with safe, non-secret evidence:

- remote Supabase launch membership migration application
- authenticated Supabase/RLS/member/horse workflow smoke
- Stripe test checkout, signed webhook replay, and duplicate delivery verification
- final live acceptance status and manual-intervention records

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Secondary aliases `https://www.precisionperformance.com.au` and `https://pnr-precision-performance.vercel.app` returned `200` in Sprint 009.
- Production deployment id: `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Public/safety smoke passed in Sprint 009.
- Vercel production env names were verified by encrypted/configured status only in Sprint 009.
- Remote Supabase migration application was not completed in Sprint 009.
- Authenticated workflow/RLS smoke was not completed in Sprint 009.
- Stripe test checkout and signed webhook replay were not completed in Sprint 009.

## In Scope

Builder may:

- inspect current deployment, local git status, and non-secret configured/missing readiness state
- inspect `.env*` names and presence only; no values or fragments
- inspect Vercel project/deployment status and non-sensitive logs where available
- apply `supabase/migrations/0008_launch_membership_permission_seeds.sql` remotely only through an existing safe path that does not expose secrets
- run non-destructive membership/permission existence checks after migration application when safe access is available
- use existing safe launch test users/sessions to verify auth, portal, data-entry, admin, and denial-path behavior
- verify assigned-horse and unassigned-horse RLS boundaries with non-destructive reads/writes where safe fixtures exist
- complete Stripe test-mode checkout only with test-mode products, test cards, and existing safe test access
- replay signed Stripe test events to the deployed webhook endpoint and replay one supported event twice
- run local validation with the bounded wrapper and use the known-good unsandboxed build path if the restricted sandbox repeats the known Next startup timeout
- update planning and evidence docs with results, blockers, and final live acceptance status
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close

## Out Of Scope

Builder must not:

- print, store, or document secret values or fragments
- delete files, data, users, horses, products, orders, payments, subscriptions, or generated artifacts
- make destructive database changes or rollbacks
- change DNS settings
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions except for non-destructive use of existing approved test fixtures and test-mode payment flows
- change auth, RLS, billing, payment, schema, product behavior, launch infrastructure, or Node runtime compatibility
- install packages from the network without approval
- normalize unrelated dirty worktree changes
- treat user-accepted follow-up conditions as Builder-verified evidence unless Builder actually verifies them during Sprint 010

## Approved File Set

Builder may edit:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/DEPLOYMENT.md`
- `docs/ENVIRONMENT.md`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`

Inspection-only:

- `.env*` names/presence only
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `app/api/health/route.ts`
- `app/api/setup/status/route.ts`
- `app/api/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/(portal)/portal/page.tsx`
- `app/(portal)/portal/horses/page.tsx`
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `app/(portal)/data-entry/page.tsx`
- `app/(portal)/data-entry/actions.ts`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/commerce/page.tsx`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/supabase/env.ts`
- `lib/stripe/env.ts`

## Manual Intervention Rule

If any required verification cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This applies especially to remote Supabase access, launch test users, assigned-horse fixtures, Stripe test-mode access, signed webhook replay, and any production dashboard action.

============================================================
FILE: planning/sprints/010-live-acceptance-closeout/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/010-live-acceptance-closeout/acceptance.md
============================================================

# Sprint 010 - Live Acceptance Closeout Acceptance

## Required Acceptance Criteria

- Architect Pack 010 is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 010.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- Local validation is attempted and results are recorded.
- Remote Supabase migration application is completed through a safe existing path, or a manual-intervention record explains why it remains blocked.
- Non-destructive Supabase membership/permission checks are completed, or a manual-intervention record explains why they remain blocked.
- Authenticated portal/RLS/data-entry/admin smoke is completed with safe launch users and fixtures, or a manual-intervention record explains why it remains blocked.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification are completed in test mode, or a manual-intervention record explains why they remain blocked.
- Production public/safety smoke is rerun and recorded.
- Final live acceptance status is stated plainly as one of:
  - `complete`
  - `partial with documented blockers`
  - `blocked`
- No secret values or fragments are printed or stored.
- Sprint-close planning docs are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session.

## Supabase Acceptance Matrix

| Case | Expected result |
|---|---|
| `0008_launch_membership_permission_seeds.sql` applied remotely | Completed safely, or blocked with manual-intervention instructions |
| `owner` level | Exists and maps to read-only portal/horse access |
| `trainer` level | Exists and maps to operational write access |
| `stable-staff` level | Exists and maps to operational write access |
| `staff` legacy alias | Still exists and maps to operational write access |
| `commerce-admin` level | Exists and maps to commerce admin visibility |
| `membership-admin` level | Exists and maps to membership admin capability |
| `admin` level | Exists and maps to platform admin capability |
| Existing assignments | Not deleted or downgraded |

## Auth/RLS/Workflow Acceptance Matrix

| Case | Expected result |
|---|---|
| Anonymous user | Denied or redirected from protected portal/admin/data-entry routes |
| Inactive or non-member user | Denied from active member portal surfaces |
| Active read-only member | Can read assigned portal/horse surfaces |
| Active read-only member data-entry | Denied |
| Record writer | Can reach `/data-entry` |
| Record writer assigned horse create | Daily, feeding, and track records succeed |
| Record writer unassigned horse create | Denied |
| Submission correction | Updates only the real record horse |
| Platform/admin user | Can reach admin pages |
| Non-admin user | Denied from admin pages |
| Phone width smoke | Critical portal/data-entry paths render and remain usable |
| Desktop width smoke | Critical portal/data-entry paths render and remain usable |

## Stripe Acceptance Matrix

| Case | Expected result |
|---|---|
| Active DB product checkout | Creates a Stripe test checkout session |
| Fallback product checkout | Remains disabled or redirects safely |
| Completed test checkout | Persists/reconciles order and payment state |
| Signed supported webhook replay | Accepted and reconciled |
| Duplicate supported webhook replay | Idempotent; no duplicate/corrupt records |
| Unsigned webhook request | Rejected safely |
| Live Stripe account mutation | Not performed |

## Production Smoke Matrix

| Case | Expected result |
|---|---|
| `GET /` | `200` |
| `GET /shop` | `200` |
| `GET /sign-in` | `200` |
| `GET /api/health` | `200` with non-sensitive response |
| `GET /api/setup/status` | `200` with configured/missing status only |
| `GET /auth/callback` without callback state | Safe redirect |
| `POST /api/checkout` with missing product/slug | Safe redirect or non-sensitive failure |
| `POST /api/stripe/webhook` unsigned request | Rejected |

## Required Validation

- `git status --short`
- branch and short revision identity
- inspect `.vercel/project.json` and `vercel.json`
- name-only `.env*` presence inspection, no values
- safe tool/path availability check for Supabase and Stripe verification
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- if sandboxed build times out at known Next startup, rerun the bounded build outside the restricted sandbox and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`
- production public/safety smoke checks listed above

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action

============================================================
FILE: planning/sprints/010-live-acceptance-closeout/handoff-prompt.md
============================================================

# Sprint 010 - Builder Handoff Prompt

You are Builder for Sprint 010 - Live Acceptance Closeout in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/010-live-acceptance-closeout/requirements.md`
5. `planning/sprints/010-live-acceptance-closeout/blueprint.md`
6. `planning/sprints/010-live-acceptance-closeout/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Close out the live follow-up verification items accepted after Sprint 009:

- remote Supabase migration application
- authenticated Supabase/RLS/member/horse workflow smoke
- Stripe test checkout, signed webhook replay, and duplicate delivery verification

Preserve product behavior. This is a verification/evidence sprint, not a feature sprint.

## Guardrails

Do not print, store, or document secrets or secret fragments.

Do not delete files or data.

Do not make destructive database changes.

Do not create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes.

Do not change DNS, production project settings, auth, RLS, billing, payment, schema, product behavior, launch infrastructure, Node runtime compatibility, or broad cleanup.

Do not modify files outside the approved Sprint 010 file set.

If safe remote access, test users, fixtures, Stripe test-mode checkout, or webhook replay are unavailable, document the manual intervention instead of inventing credentials or broadening scope.

## Suggested Execution

1. Read the sprint files and relevant docs.
2. Record current branch/revision and dirty worktree status.
3. Verify local validation with the bounded wrapper.
4. Check safe availability of Supabase and Stripe verification paths.
5. Apply the Sprint 008 Supabase migration remotely only if a safe existing path exists.
6. Run non-destructive membership/permission/RLS checks if safe access exists.
7. Run authenticated portal/data-entry/admin smoke if launch test sessions and fixtures exist.
8. Run Stripe test checkout and signed webhook replay only in test mode if safe access exists.
9. Re-run production public/safety smoke.
10. Update evidence docs, planning state, and `planning/ARCHITECT_BRIEFING.md`.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- what Sprint 010 verified
- what remains unverified
- whether final live acceptance is complete, partial, or blocked
- what manual action is still needed, if any
- what validation was run

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "010-live-acceptance-closeout",
  "updated": "2026-07-12T13:00:00+10:00"
}
