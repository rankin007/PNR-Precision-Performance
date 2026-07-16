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

Sprint 007 is approved as a production launch readiness sprint. The goal is to prove the MVP is live, tested, documented, and handoff-ready through deployment/environment verification, health/setup checks, smoke tests across public/auth/portal/ops/admin/checkout, Stripe test/live-ready verification, rollback notes, and final client acceptance.

Live Supabase test-user, direct remote RLS verification, assigned-horse fixture verification, authenticated phone/desktop workflow smoke, admin/commerce smoke, Stripe test checkout, Stripe webhook replay, duplicate webhook delivery verification, production domain confirmation, and remote environment completeness remain blocked unless the user provides non-secret setup/access before or during Sprint 007.

The approved path to Done now runs through Sprint 007 in `planning/SPRINT_SCHEDULE.md`.

---

## Workflow Profile

Selected profile: `standard`

Reason: this is an existing web application with Supabase, Stripe, auth, data-entry, admin, commerce, and deployment surfaces. Sprint 007 touches deployment verification, production/staging environment readiness, smoke testing, Stripe test/live-ready proof, rollback notes, and client acceptance. Builder must stay inside approved sprint scope, avoid credential exposure, avoid destructive database/data changes, and stop before production deployment, production project-setting changes, DNS changes, or live financial operations unless explicitly authorized.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 007 approved scope without another approval.

Sprint 007 explicitly authorizes narrow launch-readiness work for:

- non-secret deployment target, project, domain, and environment readiness verification
- Vercel deployment configuration inspection and documentation
- health/setup endpoint checks and non-secret readiness reporting
- smoke tests across public, auth, portal, data-entry, admin, shop, checkout, and webhook surfaces
- Supabase auth/RLS/assigned-horse/admin/member test verification when safe non-secret access is available
- Stripe test-mode checkout and webhook replay verification when safe test access is available
- additive launch-readiness documentation, rollback notes, runbook, smoke scripts/checklists, and client acceptance checklist
- the smallest source fixes needed to make launch-readiness checks truthful, non-sensitive, and usable

Builder must stop and ask before:

- touching or printing secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing production Vercel/Supabase/Stripe project settings
- changing DNS/domain settings
- starting or promoting a production deployment
- changing authentication, authorization, RLS, billing, payment, database schema, or migrations outside the narrow Sprint 007 acceptance path
- modifying files outside the approved file set
- installing packages from the network
- changing launch infrastructure, Node runtime compatibility, broad cleanup, `.release-main/`, or generated artifacts outside this sprint

Manual intervention rule: whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly and record exact instructions for the user/manual operator. The record must include what is blocked, evidence checked, the exact action needed, step-by-step instructions, and what Builder will verify after the action is complete.

---

## Active Sprint

`planning/sprints/007-production-launch-readiness/`

Sprint 007 - Production Launch Readiness

---

## Approved Sprint Schedule

- Sprint 007 - Production Launch Readiness

Definition of Done: the MVP is live, tested, documented, and handoff-ready, with public site, auth, permission-safe portal, data-entry workflows, admin, Stripe, production deployment, smoke tests, rollback notes, and client acceptance verified.

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads the Sprint 007 four-file sprint set under `planning/sprints/007-production-launch-readiness/`.
3. Builder maps current deployment, environment, setup/health, public, auth, portal, data-entry, admin, commerce, checkout, webhook, and documentation surfaces before editing.
4. Builder confirms non-secret launch blockers and requests only the smallest safe user/manual actions needed for production/staging verification.
5. Builder runs local validation and available smoke checks, then clearly separates verified evidence from blocked live cases.
6. Builder documents launch runbook, rollback notes, smoke results, manual-intervention instructions, and client acceptance checklist.
7. Builder closes the sprint only when Done is evidenced or when any remaining launch blocker is explicitly documented and cannot be resolved without user/manual action.

---

## Blockers

No blocker for Sprint 007 planning.

Builder may discover that production Vercel target/domain confirmation, remote Vercel environment access, Supabase test users, assigned horse fixtures, role/member fixtures, product/order/payment fixtures, Stripe test credentials, Stripe CLI/webhook replay, remote RLS execution, authenticated browser/device smoke, or production deployment authorization are unavailable. If so, Builder must still inspect and verify local/source-backed paths where evidence allows, then flag the blocked launch acceptance case with exact manual-intervention instructions and the smallest non-secret user action needed to complete it.

============================================================
FILE: planning/sprints/007-production-launch-readiness/requirements.md
============================================================

# Sprint 007 - Production Launch Readiness Requirements

## Goal

Prove the Precision Performance MVP is live-ready and handoff-ready.

The sprint is successful when deployment/environment readiness is verified without exposing secrets, public/auth/portal/ops/admin/commerce/checkout smoke paths are tested or explicitly blocked with manual-intervention instructions, Stripe test/live-ready behavior is proved where safe access exists, and the final launch runbook, rollback notes, readiness audit, and client acceptance checklist are durable in the repo.

## Background

Sprints 003-006 moved the project from build-ready scaffold to release baseline, auth/RLS/portal hardening, data-entry workflow hardening, and admin/commerce hardening.

Existing evidence shows:

- Vercel is the local evidence-backed deployment target from `vercel.json`, `.vercel/project.json`, and stack notes
- production project intent and production domain are not yet confirmed
- the environment contract is documented by variable name/category/requiredness in `docs/ENVIRONMENT.md`
- local validation is green under the bounded wrapper with project-local Node `22.14.0`
- Sprint 004 auth/RLS live verification remains blocked by missing Supabase test-user/RLS access
- Sprint 005 portal/data-entry live smoke remains blocked by missing Supabase test users and assigned-horse fixtures
- Sprint 006 admin/commerce/Stripe live smoke remains blocked by missing Supabase/Stripe test access and fixtures
- no production deployment, production project-setting change, DNS change, destructive data operation, or live Stripe financial operation has been performed

## In Scope

Builder should:

- inspect current deployment configuration, Vercel linkage evidence, environment documentation, setup/status endpoints, middleware, routes, and validation scripts before editing
- verify the canonical deployment target and production/staging project assumptions from local evidence, and request user confirmation where local evidence is insufficient
- verify the non-secret environment contract for local/staging/production by name/presence/requiredness only
- improve setup/health/readiness checks only if needed to make launch status truthful and non-sensitive
- run or document smoke tests for:
  - public home/marketing routes
  - `/sign-in` and `/auth/callback` behavior
  - `/portal`, horse list/detail, and reports
  - `/data-entry`, daily records, feeding logs, track sessions, and correction flows
  - `/admin`, `/admin/users`, `/admin/memberships`, and `/admin/commerce`
  - `/shop`, product detail, checkout creation, and checkout failure states
  - Stripe webhook verification and supported event reconciliation
- verify auth, RLS, role, assigned-horse, and operational write boundaries with real Supabase test users if safe non-secret access is available
- verify Stripe test-mode checkout and webhook replay, including duplicate delivery, if safe test access is available
- document every unavailable live smoke path under the manual intervention rule
- create or update a launch runbook with deployment, verification, rollback, and client handoff steps
- create or update a final client acceptance checklist
- refresh readiness, validation, environment/deployment, and carried Sprint 004-006 evidence docs
- refresh planning state/status and Architect briefing at close
- make the smallest source/documentation fixes needed for launch-readiness checks, smoke scripts, non-sensitive status reporting, or handoff clarity

## Out Of Scope

- starting, promoting, or changing a production deployment without explicit user authorization during the sprint
- changing production Vercel/Supabase/Stripe settings without explicit user authorization
- changing DNS or production domains without explicit user authorization
- printing, storing, or documenting secret values, credential values, tokens, passwords, private keys, full connection strings, raw webhook secrets, raw payment method details, or secret fragments
- destructive database changes or destructive production data operations
- deleting users, member profiles, memberships, horses, records, products, orders, payments, files, generated artifacts, or data
- live Stripe charges, refunds, payouts, disputes, tax settings, subscriptions, coupons, promotion codes, invoices, or Connect flows
- broad product redesign, public-site marketing rewrite, or visual polish beyond launch-readiness clarity
- broad schema redesign
- changing auth, RLS, billing, or payment behavior beyond the smallest fix required to make launch-readiness acceptance truthful and safe
- force-removing or force-archiving `.release-main/`
- normalizing or reverting unrelated dirty-worktree changes
- Node 24 compatibility work
- dependency/security remediation from `npm audit`
- installing packages from the network without approval
- AI recommendations, laboratory integrations, E-Trakka integration, native voice recording, multi-login trainer teams, owner/vet/external stakeholder app logins, heavy AWS processing, or laboratory staff workflows

## Non-Functional Requirements

- Keep all diagnostics non-sensitive. Report configured/missing, route status, role labels, fixture labels, safe persisted identifiers, event type, status, and structural error codes only.
- Do not log or document Stripe secret keys, webhook secrets, Supabase service-role keys, tokens, private keys, full connection strings, or fragments.
- Treat launch checks as high-risk: distinguish verified evidence from assumed, blocked, or manually pending cases.
- Preserve the known-good validation path using the bounded wrapper and project-local Node `22.14.0`.
- Do not treat local source inspection as production proof when live access is unavailable.
- Keep source fixes narrow and evidence-driven.

## Required Documentation

Builder must create or update:

- `docs/PRODUCTION_LAUNCH_READINESS.md` with launch evidence, smoke matrix, blockers, manual-intervention instructions, runbook, rollback notes, and client acceptance checklist
- `docs/DEPLOYMENT.md` with production/staging target, domain, deployment, and rollback notes by non-secret evidence only
- `docs/ENVIRONMENT.md` with any non-secret launch environment contract clarifications
- `docs/READINESS_AUDIT.md` with a Sprint 007 closeout section
- `docs/VALIDATION.md` with exact validation command outcomes
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, and `docs/ADMIN_COMMERCE_HARDENING.md` only where Sprint 007 live verification changes carried-forward evidence or blockers
- `planning/ARCHITECT_BRIEFING.md` for final handoff
- planning state/status files at close

============================================================
FILE: planning/sprints/007-production-launch-readiness/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/007-production-launch-readiness/acceptance.md
============================================================

# Sprint 007 - Production Launch Readiness Acceptance

Sprint 007 is complete when all applicable acceptance criteria are met or explicitly blocked with manual-intervention instructions that identify the exact remaining user/manual action required before launch.

## Deployment And Environment Acceptance

- current deployment configuration and Vercel linkage evidence are inspected and summarized
- production/staging target assumptions are confirmed from local evidence or flagged for user confirmation
- production domain and `NEXT_PUBLIC_SITE_URL` expectation are confirmed or flagged with exact manual-intervention instructions
- required environment variables are checked by name/presence/requiredness only
- no environment values, secret values, credential values, connection strings, tokens, or fragments are printed or documented
- setup/status or equivalent readiness checks report useful non-sensitive state
- deployment/runbook notes identify how to verify, promote, and roll back without guessing
- no production deployment, production setting change, or DNS change occurs unless explicitly authorized and documented

## Public And Auth Smoke Acceptance

- public home/marketing routes load locally or in the verified target environment
- `/sign-in` loads and presents a usable sign-in path
- `/auth/callback` handles missing/invalid callback state safely
- successful sign-in and redirect behavior are verified with a safe test user or blocked with exact manual-intervention instructions
- anonymous, inactive/non-member, active member, record-writer, and admin access outcomes are verified where safe access exists or blocked with exact manual-intervention instructions

## Portal And Data-Entry Smoke Acceptance

- `/portal` access is verified for active members or blocked with exact manual-intervention instructions
- horse list/detail visibility is verified with assigned-horse fixtures or blocked with exact manual-intervention instructions
- reports page access is verified or blocked with exact manual-intervention instructions
- `/data-entry` denies users without operational write permission
- daily record, feeding log, track session, recent submission, and correction flows are verified with safe fixtures or blocked with exact manual-intervention instructions
- phone-width and desktop-width smoke are completed or blocked with exact manual-intervention instructions
- Sprint 004-005 auth/RLS/workflow evidence docs are updated only where Sprint 007 changes evidence or blockers

## Admin And Commerce Smoke Acceptance

- `/admin` remains gated to `platform.admin`
- `/admin/users` status management smoke is verified or blocked with exact manual-intervention instructions
- `/admin/memberships` assignment smoke is verified or blocked with exact manual-intervention instructions
- `/admin/commerce` read-only products/orders/payments visibility is verified or blocked with exact manual-intervention instructions
- `/shop` uses database-backed active products when configured
- fallback products remain checkout-disabled when configuration is absent
- active product detail and inactive/unavailable product behavior are verified or blocked with exact manual-intervention instructions
- checkout missing slug, inactive/unavailable product, missing config, and configured happy path through Stripe test mode are verified or blocked with exact manual-intervention instructions
- webhook missing signature, invalid signature, supported event reconciliation, duplicate delivery, and missing/out-of-order metadata behavior are verified or blocked with exact manual-intervention instructions
- Sprint 006 admin/commerce evidence docs are updated only where Sprint 007 changes evidence or blockers

## Security And Scope Acceptance

- no secret values or secret fragments are printed, logged, committed, or documented
- no live Stripe charge, refund, payout, subscription, tax, or production account change is performed
- no production deployment, production setting change, or DNS change is performed unless explicitly authorized and documented
- no destructive database/data operation is performed
- no broad schema redesign is performed
- files outside the Sprint 007 approved file set are not modified
- Sprint 004 portal/auth/RLS access behavior is not intentionally weakened
- Sprint 005 portal/data-entry workflow behavior is not intentionally weakened
- Sprint 006 admin/commerce/checkout/webhook behavior is not intentionally weakened
- every blocked/manual-input-required case is flagged with instructions under the manual intervention rule

## Documentation Acceptance

- `docs/PRODUCTION_LAUNCH_READINESS.md` records:
  - launch surface map
  - deployment/environment evidence
  - smoke matrix results
  - Supabase/auth/RLS verification results or blockers
  - portal/data-entry verification results or blockers
  - admin/commerce/Stripe verification results or blockers
  - manual-intervention instructions
  - launch runbook
  - rollback notes
  - client acceptance checklist
  - final go/no-go status
- `docs/DEPLOYMENT.md` reflects current non-secret launch and rollback notes
- `docs/ENVIRONMENT.md` reflects any non-secret launch environment contract clarifications
- `docs/READINESS_AUDIT.md` includes a Sprint 007 closeout section
- `docs/VALIDATION.md` reflects current validation results
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, and `docs/ADMIN_COMMERCE_HARDENING.md` are updated only where Sprint 007 evidence changes their carried blockers
- `planning/DECISIONS.md`, `planning/DOMAIN.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` are updated only where Sprint 007 changed durable decisions/context/risks/questions
- `planning/ARCHITECT_BRIEFING.md` is refreshed for final handoff
- `planning/STATE.md` and `planning/STATUS.json` are updated at close

## Validation Acceptance

Required commands/checks:

- `git status --short`
- inspect deployment configuration, `.vercel` linkage, `vercel.json`, setup/status route, environment docs, and deployment docs
- inspect public/auth/portal/data-entry/admin/shop/checkout/webhook smoke surfaces
- non-secret environment presence check for Supabase, Stripe, Vercel/site URL, and admin/commerce variables as needed
- secret-fragment scan of changed diagnostics/logging/docs
- public smoke matrix:
  - home/public route load
  - `/shop`
  - `/shop/[slug]` active product or documented blocked fixture
  - unavailable product behavior
- auth/access smoke matrix:
  - anonymous -> `/portal`
  - anonymous -> `/admin`
  - sign-in page load
  - callback missing/invalid state
  - active member -> `/portal`, or blocked live case documented
  - record writer -> `/data-entry`, or blocked live case documented
  - read-only member -> denied from `/data-entry`, or blocked live case documented
  - admin -> `/admin`, or blocked live case documented
- portal/data-entry smoke matrix:
  - horse list/detail with assigned fixture, or blocked live case documented
  - daily record create/edit, or blocked live case documented
  - feeding log create/edit, or blocked live case documented
  - track session create/edit, or blocked live case documented
  - submission review/correction, or blocked live case documented
  - phone-width and desktop-width authenticated smoke, or blocked live case documented
- admin/commerce/Stripe smoke matrix:
  - `/admin/users` valid/invalid status update, or blocked live case documented
  - `/admin/memberships` valid/repeated/invalid assignment, or blocked live case documented
  - `/admin/commerce` products/orders/payments visibility, or blocked live case documented
  - checkout missing config
  - checkout inactive/unavailable product
  - checkout configured Stripe test session, or blocked live case documented
  - webhook missing/invalid signature
  - webhook supported event reconciliation, or blocked live case documented
  - duplicate supported webhook delivery, or blocked live case documented
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.

============================================================
FILE: planning/sprints/007-production-launch-readiness/handoff-prompt.md
============================================================

# Sprint 007 - Production Launch Readiness Handoff

Builder, you are executing Sprint 007 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/007-production-launch-readiness/requirements.md`
6. `planning/sprints/007-production-launch-readiness/blueprint.md`
7. `planning/sprints/007-production-launch-readiness/acceptance.md`
8. `planning/SPRINT_SCHEDULE.md`
9. `docs/DEPLOYMENT.md`
10. `docs/ENVIRONMENT.md`
11. `docs/AUTH_RLS_PORTAL_ACCESS.md`
12. `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
13. `docs/ADMIN_COMMERCE_HARDENING.md`
14. `docs/VALIDATION.md`
15. `docs/READINESS_AUDIT.md`
16. relevant deployment, setup/status, public, auth, portal, data-entry, admin, shop, checkout, webhook, Supabase, Stripe, and validation files identified by the sprint

Implementation is authorized for this sprint only within the approved file set and only for production launch readiness: deployment/environment verification, non-sensitive health/setup checks, public/auth/portal/data-entry/admin/shop/checkout/webhook smoke, Supabase/RLS/role/fixture verification where safe access exists, Stripe test-mode checkout and webhook replay where safe access exists, launch runbook, rollback notes, client acceptance checklist, and the smallest source/documentation fixes needed to make those checks truthful and handoff-ready.

Start by mapping current deployment, environment, setup/status, public, auth, portal, data-entry, admin, commerce, checkout, webhook, and validation surfaces before editing. Separate local/source-backed evidence from live verified evidence and blocked cases.

Carry Sprint 004-006 live Supabase/RLS/workflow/admin/commerce/Stripe blockers forward unless safe non-secret access exists. Every time something does not work or needs user/manual input, flag it with exact instructions under the manual intervention rule.

Do not print secrets. Do not perform live financial operations. Do not deploy, promote, change DNS, or change production project settings without explicit user authorization. Do not delete data. Do not broaden scope.

Validate lint, TypeScript, build, secret-fragment scans, launch smoke checks, and post-validation process state. Close with launch readiness documentation, rollback notes, client acceptance checklist, refreshed planning docs, and an honest go/no-go status.

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "007-production-launch-readiness",
  "updated": "2026-07-11T18:55:00+10:00"
}
