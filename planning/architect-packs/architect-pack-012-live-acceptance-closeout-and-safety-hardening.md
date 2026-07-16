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

Sprint 010 is complete as a live acceptance closeout sprint with final status: partial with documented blockers. Builder verified local validation, Vercel production readiness, production public/safety smoke, and anonymous protected-route redirects. Remote Supabase migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain blocked by missing safe operator access, launch fixtures, and test-mode replay path.

Sprint 011 is complete as a Done normalization and roadmap realignment sprint. Builder preserved and distilled the attached `Precision Performance Done.docx`, created `planning/DEFINITION_OF_DONE.md`, realigned `planning/SPRINT_SCHEDULE.md` for Sprints 011-016, updated decisions/domain/risks/questions plus planning-level architecture/API notes, and kept Sprint 010 live acceptance blockers visible as separate from the fuller Done target.

Sprint 012 is approved as a live acceptance closeout and safety hardening sprint. This sprint authorizes Builder to finish or explicitly re-block the remaining live acceptance gates through safe, non-secret, non-destructive checks, and to make the smallest source fix needed to prevent malformed checkout POST requests from returning a production `500`.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 012 touches production-adjacent Supabase migration verification, authenticated RLS/workflow smoke, Stripe test checkout/webhook replay, and checkout request safety. Builder must avoid secret exposure, destructive database/data changes, live financial changes, DNS changes, and unaudited project-setting changes.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 012 approved scope without another approval.

Sprint 012 explicitly authorizes:

- non-secret inspection of deployment, environment-name presence, and configured/missing readiness state
- applying or verifying `supabase/migrations/0008_launch_membership_permission_seeds.sql` only through an existing safe approved path that does not expose secrets
- running non-destructive Supabase membership/permission/RLS checks when a safe path exists
- using existing safe launch test users and fixtures for authenticated portal, data-entry, admin, and denial-path smoke without storing credentials
- running Stripe test-mode checkout and signed webhook replay only if existing safe test-mode access is configured
- replaying a supported Stripe test event twice to verify duplicate delivery behavior, when safe test-mode replay is available
- making a narrow source fix in `app/api/checkout/route.ts` so malformed or non-form POST bodies redirect or fail safely instead of producing a raw `500`
- adding focused tests or smoke notes for the checkout malformed-body case if the existing test framework supports it
- running local validation and production public/safety smoke checks
- updating planning and evidence docs with results, blockers, and final acceptance status
- refreshing `planning/ARCHITECT_BRIEFING.md` at sprint close

Builder must stop and ask before:

- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes or rollbacks
- creating, deleting, or modifying real production users, horses, products, orders, payments, subscriptions, Stripe objects, or production customer data outside explicitly safe test-mode smoke and existing approved fixtures
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing DNS/domain settings
- changing Vercel/Supabase/Stripe project settings beyond configured/missing status checks and the already-created additive Sprint 008 migration
- changing authentication, authorization, RLS, billing, payment, database schema, migrations, product catalogue behavior, launch infrastructure, or Node runtime compatibility beyond the approved checkout malformed-body guard
- modifying files outside the approved file set
- installing packages from the network
- normalizing unrelated dirty worktree changes

---

## Active Sprint

`planning/sprints/012-live-acceptance-closeout-and-safety-hardening/`

Sprint 012 - Live Acceptance Closeout And Safety Hardening

---

## Approved Sprint Schedule

Sprints 001-011 are complete. Sprint 012 is the current approved live acceptance and safety hardening sprint before deeper build work for the expanded trainer-ready Done target.

---

## Next Actions

1. Builder applies Architect Pack 012.
2. Builder reads the Sprint 012 four-file sprint set and uses it as the source of truth.
3. Builder records current branch/revision and dirty worktree status.
4. Builder attempts the remaining Supabase, authenticated workflow, and Stripe test-mode acceptance gates through safe configured paths.
5. Builder hardens malformed checkout POST behavior narrowly.
6. Builder validates the changed behavior and records passed evidence or manual-intervention instructions for any blocked gate.
7. Builder updates sprint-close docs and refreshes `planning/ARCHITECT_BRIEFING.md`.

---

## Blockers

If remote Supabase access, launch test sessions, fixtures, Stripe test-mode access, or signed webhook replay are unavailable, Builder must document the blocker and exact manual intervention required instead of inventing credentials, exposing secrets, or broadening scope.

Forward product-build blockers remain separate from Sprint 012: missing Hydration Score and Health Score formulas, missing Table of Knowledge production content, unresolved voice/OCR/upload scope, and role exception details for vet and stable staff access.

============================================================
FILE: planning/sprints/012-live-acceptance-closeout-and-safety-hardening/requirements.md
============================================================

# Sprint 012 - Live Acceptance Closeout And Safety Hardening Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Sprint 011 Builder report and requested: "Architect Pack 012. Go create the pack."

Sprint 011 clarified that full project Done is the trainer-ready biochemistry portal described in `planning/DEFINITION_OF_DONE.md`. Before deeper product build continues, Sprint 012 should close or explicitly re-block the current live acceptance gates and harden the known malformed checkout POST behavior.

## Goal

Close the remaining deployed-MVP live acceptance gaps where safe access exists, document exact manual interventions where it does not, and make the smallest checkout safety fix needed to avoid raw `500` responses for malformed checkout POST bodies.

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Production deployment id remains documented as `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 010 public/safety smoke passed for `/`, `/shop`, `/sign-in`, `/api/health`, `/api/setup/status`, `/auth/callback`, missing-slug checkout, unsigned webhook, and anonymous protected-route redirects.
- Sprint 010 remained partial because Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay were blocked.
- Sprint 010 found malformed `POST /api/checkout` without form content type returned `500`; intended missing-slug form submission redirected safely.
- `app/api/checkout/route.ts` currently calls `request.formData()` before slug validation, so malformed or non-form POST bodies can fail before safe redirect handling.

## In Scope

Builder may:

- inspect current deployment, local git status, and non-secret configured/missing readiness state
- inspect `.env*` names and presence only; no values or fragments
- inspect Vercel project/deployment status and non-sensitive logs where available
- apply or verify `supabase/migrations/0008_launch_membership_permission_seeds.sql` remotely only through an existing safe path that does not expose secrets
- run non-destructive membership/permission existence checks after migration application when safe access is available
- use existing safe launch test users/sessions to verify auth, portal, data-entry, admin, and denial-path behavior
- verify assigned-horse and unassigned-horse RLS boundaries with non-destructive reads/writes where safe fixtures exist
- complete Stripe test-mode checkout only with test-mode products, test cards, and existing safe test access
- replay signed Stripe test events to the deployed webhook endpoint and replay one supported event twice
- make a narrow malformed-body guard in `app/api/checkout/route.ts`
- add or update focused tests only if a local test pattern already exists and can be done without broad setup
- run local validation with the bounded wrapper and use the known-good unsandboxed build path if the restricted sandbox repeats the known Next startup timeout
- run production public/safety smoke checks
- update planning and evidence docs with results, blockers, and final Sprint 012 status
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close

## Out Of Scope

Builder must not:

- print, store, or document secret values or fragments
- delete files, data, users, horses, products, orders, payments, subscriptions, or generated artifacts
- make destructive database changes or rollbacks
- change DNS settings
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions except for non-destructive use of existing approved test fixtures and Stripe test-mode payment flows
- change auth, RLS, billing, payment, schema, product catalogue behavior, launch infrastructure, or Node runtime compatibility
- implement any Sprint 013-016 product-build work, including biochemistry test model, voice notes, uploads, scoring, recommendations, or charts
- install packages from the network without approval
- normalize unrelated dirty worktree changes
- treat user-accepted follow-up conditions as Builder-verified evidence unless Builder actually verifies them during Sprint 012

## Approved File Set

Builder may edit:

- `app/api/checkout/route.ts`
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

Builder may add or update focused checkout tests only if the existing project already has a nearby test pattern and the file is directly tied to `app/api/checkout/route.ts`.

Inspection-only:

- `.env*` names/presence only
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `scripts/run-validation-command.ps1`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `app/api/health/route.ts`
- `app/api/setup/status/route.ts`
- `app/api/stripe/webhook/route.ts`
- portal, data-entry, admin, auth, Supabase, and Stripe source files needed to verify current live acceptance behavior

## Manual Intervention Rule

If any required verification cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This applies especially to remote Supabase access, launch test users, assigned/unassigned horse fixtures, Stripe test-mode access, signed webhook replay, production dashboard access, and any required operator action.

============================================================
FILE: planning/sprints/012-live-acceptance-closeout-and-safety-hardening/blueprint.md
============================================================

# Sprint 012 - Live Acceptance Closeout And Safety Hardening Blueprint

## Execution Shape

Sprint 012 is a verification plus narrow safety-fix sprint. It should not start the expanded biochemistry product build.

Run the work in this order:

1. Establish current baseline.
2. Harden malformed checkout POST behavior narrowly.
3. Validate local code and checkout safety behavior.
4. Attempt Supabase migration/check closeout.
5. Attempt authenticated workflow/RLS smoke.
6. Attempt Stripe test checkout and webhook replay.
7. Run production public/safety smoke.
8. Record final status, blockers, and handoff.

## Baseline Discovery

Builder should inspect and record:

- `git status --short`
- active branch and short revision
- `.vercel/project.json` project identity
- current production URL/deployment status if Vercel CLI access exists
- name-only `.env*` variable presence; no values
- whether `supabase` CLI, `psql`, dashboard-safe path, or another approved path exists
- whether Stripe CLI or safe replay path exists
- whether safe launch test users/sessions and assigned/unassigned horse fixtures exist

Do not print secrets. If a command would expose values, do not run it.

## Checkout Safety Fix

Target file:

- `app/api/checkout/route.ts`

Problem:

- `request.formData()` can throw before slug validation when the POST body is malformed or not a form body.
- Sprint 010 observed a malformed no-content-type checkout POST returning `500`.

Desired behavior:

- intended missing-slug form requests still redirect safely to `/shop?checkout=missing-product`
- malformed, unreadable, or non-form checkout POST bodies do not produce a raw production `500`
- response should be a safe redirect to `/shop?checkout=missing-product` or another non-sensitive checkout failure state
- no secret values or raw request bodies should be logged

Preferred implementation shape:

- wrap form parsing in a small helper or `try/catch`
- return safe redirect before product/Supabase/Stripe work when parsing fails
- keep the existing safe slug validation and downstream checkout behavior intact
- avoid broad route rewrites

## Local Validation

Use the bounded validation wrapper:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If the restricted sandbox build repeats the known Next startup timeout, rerun the bounded build outside the restricted sandbox only with approval/escalation and record both outcomes.

Run a post-validation process check for `node`, `npm`, and `npx`.

Where feasible, locally smoke:

- checkout missing slug form request
- checkout malformed or no-content-type POST request
- unsigned webhook rejection
- public health/setup routes

## Supabase Migration And RLS Verification

Target migration:

- `supabase/migrations/0008_launch_membership_permission_seeds.sql`

Allowed path:

- apply or verify only through an existing safe Supabase CLI, dashboard, or project-approved execution path
- do not expose connection strings, service-role keys, SQL editor screenshots with values, or secrets
- do not run destructive SQL
- do not modify schema beyond the already-created additive/idempotent Sprint 008 migration

After application or confirmation, verify by non-destructive checks where safe access exists:

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

Smoke phone and desktop widths for critical portal/data-entry paths when a browser path is available.

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

Re-smoke the deployed app after local validation and any production deployment/promotion step explicitly authorized elsewhere.

If this sprint does not deploy new code, production smoke still verifies current live public/safety behavior:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `GET /auth/callback` without callback state
- `POST /api/checkout` with missing product/slug
- `POST /api/checkout` malformed/no-content-type body where safe to run
- `POST /api/stripe/webhook` unsigned request
- anonymous `GET /portal`
- anonymous `GET /data-entry`
- anonymous `GET /admin`
- anonymous `GET /admin/commerce`

Record status codes and non-sensitive outcomes only.

## Documentation Updates

At close, Builder should update:

- `docs/PRODUCTION_LAUNCH_READINESS.md` with Sprint 012 results
- `docs/DEPLOYMENT.md` if deployment/status/rollback evidence changed
- `docs/VALIDATION.md` with validation evidence
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md` if migration/check status changed
- `docs/AUTH_RLS_PORTAL_ACCESS.md` if authenticated/RLS evidence changed
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` if workflow smoke evidence changed
- `docs/ADMIN_COMMERCE_HARDENING.md` for checkout/webhook/admin commerce evidence and malformed checkout hardening
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` for durable changes
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md` at sprint close

============================================================
FILE: planning/sprints/012-live-acceptance-closeout-and-safety-hardening/acceptance.md
============================================================

# Sprint 012 - Live Acceptance Closeout And Safety Hardening Acceptance

## Required Acceptance Criteria

- Architect Pack 012 is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- Malformed checkout POST behavior is hardened narrowly in `app/api/checkout/route.ts`.
- Intended missing-slug checkout form behavior remains safe.
- Local validation is attempted and results are recorded.
- Remote Supabase migration application or verification is completed through a safe existing path, or a manual-intervention record explains why it remains blocked.
- Non-destructive Supabase membership/permission checks are completed, or a manual-intervention record explains why they remain blocked.
- Authenticated portal/RLS/data-entry/admin smoke is completed with safe launch users and fixtures, or a manual-intervention record explains why it remains blocked.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification are completed in test mode, or a manual-intervention record explains why they remain blocked.
- Production public/safety smoke is rerun and recorded.
- Final Sprint 012 live acceptance status is stated plainly as one of:
  - `complete`
  - `partial with documented blockers`
  - `blocked`
- No secret values or fragments are printed or stored.
- No destructive production mutation or live financial action is performed.
- Sprint-close planning docs are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session.

## Checkout Safety Acceptance Matrix

| Case | Expected result |
|---|---|
| `POST /api/checkout` with empty/missing slug form | Safe redirect to missing-product or equivalent non-sensitive state |
| `POST /api/checkout` with malformed or no-content-type body | Safe redirect or non-sensitive failure, not raw `500` |
| `POST /api/checkout` with invalid slug | Safe redirect to missing-product or equivalent non-sensitive state |
| Checkout active product path | Existing behavior preserved where configured dependencies exist |
| Checkout diagnostics | No request body, secret value, secret fragment, or raw credential material logged |

## Supabase Acceptance Matrix

| Case | Expected result |
|---|---|
| `0008_launch_membership_permission_seeds.sql` applied or verified remotely | Completed safely, or blocked with manual-intervention instructions |
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
| `POST /api/checkout` malformed/no-content-type body | Safe redirect or non-sensitive failure, not raw `500` if deployed code includes the fix |
| `POST /api/stripe/webhook` unsigned request | Rejected |
| Anonymous protected routes | Redirected; protected content not exposed |

## Required Validation

- `git status --short`
- branch and short revision identity
- inspect `.vercel/project.json` and `vercel.json`
- name-only `.env*` presence inspection, no values
- safe tool/path availability check for Supabase and Stripe verification
- checkout malformed-body local smoke or focused test
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
FILE: planning/sprints/012-live-acceptance-closeout-and-safety-hardening/handoff-prompt.md
============================================================

# Sprint 012 - Builder Handoff Prompt

You are Builder for Sprint 012 - Live Acceptance Closeout And Safety Hardening in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/requirements.md`
5. `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/blueprint.md`
6. `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Close or explicitly re-block the remaining deployed-MVP live acceptance gates, and harden malformed checkout POST behavior.

This sprint is not the start of the expanded biochemistry product build. It prepares the project to move safely into Sprint 013 by dealing with current live acceptance and a known checkout safety issue.

## Guardrails

Do not print, store, or document secrets or secret fragments.

Do not delete files or data.

Do not make destructive database changes.

Do not create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes.

Do not change DNS, production project settings, auth, RLS, billing, payment, schema, product catalogue behavior, launch infrastructure, Node runtime compatibility, or broad cleanup.

Do not implement biochemistry test model, voice notes, uploads, scoring, recommendations, Table of Knowledge, trends, saved charts, or other Sprint 013-016 work.

Do not modify files outside the approved Sprint 012 file set.

If safe remote access, test users, fixtures, Stripe test-mode checkout, or webhook replay are unavailable, document the manual intervention instead of inventing credentials or broadening scope.

## Suggested Execution

1. Read the sprint files and relevant docs.
2. Record current branch/revision and dirty worktree status.
3. Inspect current checkout route behavior.
4. Add the smallest safe form-parse guard in `app/api/checkout/route.ts`.
5. Verify missing-slug and malformed checkout POST behavior locally where feasible.
6. Run local validation with the bounded wrapper.
7. Check safe availability of Supabase and Stripe verification paths.
8. Apply or verify the Sprint 008 Supabase migration remotely only if a safe existing path exists.
9. Run non-destructive membership/permission/RLS checks if safe access exists.
10. Run authenticated portal/data-entry/admin smoke if launch test sessions and fixtures exist.
11. Run Stripe test checkout and signed webhook replay only in test mode if safe access exists.
12. Re-run production public/safety smoke.
13. Update evidence docs, planning state, and `planning/ARCHITECT_BRIEFING.md`.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- whether malformed checkout POSTs are hardened
- what Sprint 012 verified
- what remains unverified
- whether live acceptance is complete, partial, or blocked
- what manual action is still needed, if any
- what validation was run
- whether the project is ready for Sprint 013 data-model planning/build

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "012-live-acceptance-closeout-and-safety-hardening",
  "updated": "2026-07-14T00:00:00+10:00"
}
