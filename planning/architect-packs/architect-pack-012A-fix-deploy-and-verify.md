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

Sprint 012 is complete as a live acceptance closeout and safety hardening sprint with final status: partial with documented blockers. Builder hardened malformed checkout POST parsing locally, validated lint/TypeScript/build, verified production public/safety smoke, and re-blocked Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay with exact manual-intervention instructions.

Sprint 012A is approved as a fix, deploy, and verify sprint. This sprint authorizes Builder to deploy the Sprint 012 malformed checkout POST safety fix to the existing Vercel production project and verify production behavior/provenance, while preserving the remaining Supabase/authenticated/Stripe blockers as explicit manual-intervention items unless safe access exists.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 012A authorizes production deployment verification for a narrowly scoped checkout safety fix and may inspect production deployment status, public/safety routes, Supabase blocker status, and Stripe blocker status. Builder must avoid secret exposure, destructive data changes, live financial changes, DNS changes, and unaudited project-setting changes.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 012A approved scope without another approval.

Sprint 012A explicitly authorizes:

- verifying that the Sprint 012 checkout fix is present in the local source before deployment
- running local validation using the known-good bounded validation path
- deploying the current approved source state to the existing Vercel production project `pnr-precision-performance` for `https://precisionperformance.com.au`
- inspecting the resulting Vercel production deployment status and aliases by non-secret metadata only
- running production public/safety smoke, including malformed checkout POST behavior
- checking whether previously blocked Supabase/authenticated/Stripe verification paths are now available without exposing secrets
- updating deployment, validation, production readiness, admin/commerce, state, status, decisions, risks, questions, and Architect briefing docs

Builder must stop and ask before:

- deploying if the Vercel project is not `pnr-precision-performance`
- deploying if the target would not be production for `https://precisionperformance.com.au`
- deploying if source inspection shows unexpected production app/source changes beyond the Sprint 012 checkout safety fix and already-documented planning/docs updates
- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes or rollbacks
- creating, deleting, or modifying real production users, horses, products, orders, payments, subscriptions, Stripe objects, or production customer data
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing DNS/domain settings
- changing Vercel/Supabase/Stripe project settings beyond deploying the approved source state and reading configured/missing status
- changing authentication, authorization, RLS, billing, payment, database schema, migrations, product catalogue behavior, launch infrastructure, or Node runtime compatibility
- modifying files outside the approved file set
- installing packages from the network
- normalizing unrelated dirty worktree changes

---

## Active Sprint

`planning/sprints/012A-fix-deploy-and-verify/`

Sprint 012A - Fix, Deploy, And Verify

---

## Approved Sprint Schedule

Sprints 001-012 are complete. Sprint 012A is the current approved deployment/provenance sprint for the Sprint 012 checkout safety fix before deciding whether to proceed to Sprint 013.

---

## Next Actions

1. Builder applies Architect Pack 012A.
2. Builder reads the Sprint 012A four-file sprint set and uses it as the source of truth.
3. Builder verifies the checkout fix and current source/deployment target.
4. Builder validates locally.
5. Builder deploys to the existing Vercel production project if all stop conditions are clear.
6. Builder verifies production deployment status, aliases, and public/safety smoke.
7. Builder records remaining blockers and refreshes `planning/ARCHITECT_BRIEFING.md`.

---

## Blockers

If deployment target/source state is unclear, Builder must stop and ask before deploying.

If remote Supabase access, launch test sessions, fixtures, Stripe test-mode access, or signed webhook replay are unavailable, Builder must document the blocker and exact manual intervention required instead of inventing credentials, exposing secrets, or broadening scope.

============================================================
FILE: planning/sprints/012A-fix-deploy-and-verify/requirements.md
============================================================

# Sprint 012A - Fix, Deploy, And Verify Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendation to deploy and verify the Sprint 012 checkout safety fix, with one explicit change: "change the sprint number to 012A."

The user also said: "Do not assume! any questions, or if you are not clear, ask."

This pack therefore makes the deployment target and stop conditions explicit.

## Goal

Deploy the Sprint 012 malformed checkout POST safety fix to the existing production Vercel project and verify that production behavior and deployment provenance are clear.

Sprint 012A is successful when:

- the local source fix is confirmed
- local validation passes through the known-good path
- the approved source state is deployed to the existing Vercel production project
- production smoke verifies malformed checkout POST no longer returns a raw `500`
- docs clearly state what was deployed, where, and what remains blocked

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Existing Vercel project linkage is `pnr-precision-performance`.
- Current documented production deployment id before Sprint 012A is `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 012 hardened `app/api/checkout/route.ts` locally by guarding `request.formData()`.
- Sprint 012 local validation passed through lint, TypeScript, and outside-sandbox bounded build.
- Sprint 012 local checkout malformed/missing slug smoke returned `307`.
- Sprint 012 production smoke returned safe statuses, but Sprint 012 did not deploy the local checkout source fix.
- Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain blocked by missing safe access/fixtures.

## In Scope

Builder may:

- inspect current git status, branch, revision, and app/source diffs needed to verify the Sprint 012 fix
- inspect Vercel project/deployment metadata
- inspect `.env*` names/presence only; no values or fragments
- run local validation with the bounded wrapper
- run local route smoke for checkout malformed/missing slug behavior where feasible
- deploy the current approved source state to Vercel production only if target and source-state stop conditions are clear
- inspect Vercel production deployment status and aliases after deploy
- run production public/safety smoke after deploy
- check whether Supabase/authenticated/Stripe blockers have become safely verifiable, and verify only where safe access exists
- update planning and evidence docs with deployment, validation, smoke, and blocker status
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close

## Out Of Scope

Builder must not:

- implement any new product behavior beyond deploying the existing Sprint 012 checkout safety fix
- edit checkout logic further unless the existing Sprint 012 fix is missing or a one-line correction is required to make the approved fix compile
- implement Sprint 013-016 biochemistry data model, voice notes, uploads, scoring, recommendations, Table of Knowledge, trends, or saved charts
- print, store, or document secret values or fragments
- delete files, users, data, generated artifacts, or deployment history
- make destructive database changes or rollbacks
- apply remote Supabase migrations unless a safe approved path already exists and exposes no secrets
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions
- change DNS settings or Vercel/Supabase/Stripe project settings beyond the approved Vercel production deployment
- install packages from the network without approval
- normalize unrelated dirty worktree changes

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
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`

Builder may inspect and, only if necessary to preserve the already-approved Sprint 012 fix, minimally correct:

- `app/api/checkout/route.ts`

Inspection-only:

- `.env*` names/presence only
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `scripts/run-validation-command.ps1`
- `app/api/health/route.ts`
- `app/api/setup/status/route.ts`
- `app/api/stripe/webhook/route.ts`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- relevant auth, portal, data-entry, admin, Supabase, and Stripe source files needed for smoke/blocker documentation

## Deployment Stop Conditions

Builder must stop and ask before deploying if:

- `.vercel/project.json` does not identify `pnr-precision-performance`
- Vercel production target or production aliases cannot be verified by non-secret metadata
- local source no longer contains the Sprint 012 checkout malformed-body guard
- `git diff` or source inspection shows unexpected app/source changes beyond `app/api/checkout/route.ts` that would be included in deployment
- local lint, TypeScript, or known-good build validation fails for a reason not already documented as restricted-sandbox-only
- deployment command would expose secrets or require printing tokens
- deployment would require DNS/project setting changes

Planning/docs changes may be present and should be documented, but unexpected app/source changes require user confirmation before deploy.

## Manual Intervention Rule

If any required verification cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

============================================================
FILE: planning/sprints/012A-fix-deploy-and-verify/blueprint.md
============================================================

# Sprint 012A - Fix, Deploy, And Verify Blueprint

## Execution Shape

Sprint 012A is a deploy/provenance sprint. Keep it boring on purpose: confirm the fix, deploy it, verify it, and record what remains blocked.

Run the work in this order:

1. Establish current repo and deployment baseline.
2. Confirm the Sprint 012 checkout fix is present and source state is deployable.
3. Run local validation.
4. Deploy to the existing Vercel production project if stop conditions are clear.
5. Verify deployment status, aliases, and source provenance.
6. Run production public/safety smoke.
7. Re-check whether live acceptance blockers are still blocked.
8. Update evidence docs and close out.

## Baseline Discovery

Builder should inspect and record:

- `git status --short`
- active branch and short revision
- source diff summary for app/source files, especially `app/api/checkout/route.ts`
- `.vercel/project.json` project identity
- `vercel.json`
- current production deployment id/status if Vercel CLI access exists
- name-only `.env*` variable presence; no values
- availability of `supabase`, `psql`, Stripe CLI, Vercel CLI, and `curl.exe`

Do not print secrets. If a command would expose values, do not run it.

## Source-State Verification

Before deployment, Builder must confirm:

- `app/api/checkout/route.ts` guards `request.formData()` parse failures
- malformed/unreadable checkout POST bodies redirect safely before product, Supabase, or Stripe work
- missing slug and invalid slug behavior remains safe
- no unrelated app/source files would be deployed unexpectedly

If unrelated app/source files are dirty or source state is unclear, stop and ask.

## Local Validation

Use the bounded validation wrapper:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If the restricted sandbox build repeats a sandbox-only failure, rerun the bounded build outside the restricted sandbox only with approval/escalation and record both outcomes.

Run local route smoke where feasible:

- checkout missing slug form request
- checkout malformed or no-content-type POST request
- unsigned webhook rejection
- public health/setup routes

## Deployment

Deploy only to:

- Vercel project: `pnr-precision-performance`
- Production domain: `https://precisionperformance.com.au`

Use the repo's established Vercel deployment path. Do not change DNS, project settings, env values, build settings, or domains.

After deployment, record:

- deployment command used without secrets
- deployment URL
- deployment id if available
- target/environment
- aliases
- inspected status
- branch/revision/source state used

If the deployment command requires approval/escalation, request it with a narrow justification.

## Production Verification

Run production public/safety smoke after deployment:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `GET /auth/callback` without callback state
- `POST /api/checkout` with missing product/slug
- `POST /api/checkout` malformed/no-content-type body
- `POST /api/stripe/webhook` unsigned request
- anonymous `GET /portal`
- anonymous `GET /data-entry`
- anonymous `GET /admin`
- anonymous `GET /admin/commerce`

Expected result:

- public/setup routes return safe `200` where expected
- callback and protected routes redirect safely
- checkout malformed and missing-slug POSTs do not return raw `500`
- unsigned webhook remains rejected
- protected content is not exposed to anonymous users

Record status codes and non-sensitive outcomes only.

## Remaining Live Acceptance Gates

Re-check availability only. Do not invent access.

Supabase:

- If safe remote SQL/check path exists, verify `0008_launch_membership_permission_seeds.sql` application and membership/permission levels.
- If not, update manual-intervention instructions.

Authenticated workflow/RLS:

- If safe sessions and assigned/unassigned horse fixtures exist, run the matrix from Sprint 012.
- If not, update manual-intervention instructions.

Stripe:

- If safe test-mode checkout/replay path exists, run checkout, signed replay, and duplicate replay.
- If not, update manual-intervention instructions.

## Documentation Updates

At close, Builder should update:

- `docs/DEPLOYMENT.md` with deployment result and provenance
- `docs/PRODUCTION_LAUNCH_READINESS.md` with Sprint 012A smoke and live acceptance status
- `docs/VALIDATION.md` with validation evidence
- `docs/ADMIN_COMMERCE_HARDENING.md` with checkout safety deployment verification
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, and `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` if blocker status changed
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if durable status changed
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md` at sprint close

============================================================
FILE: planning/sprints/012A-fix-deploy-and-verify/acceptance.md
============================================================

# Sprint 012A - Fix, Deploy, And Verify Acceptance

## Required Acceptance Criteria

- Architect Pack 012A is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012A.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- Builder verifies that the Sprint 012 checkout malformed-body guard is present locally.
- Builder verifies there are no unexpected app/source changes included in deployment, or stops for user confirmation.
- Local validation is attempted and results are recorded.
- Existing Vercel project is confirmed as `pnr-precision-performance`.
- Production deployment is completed only if stop conditions are clear.
- Deployment id/URL/status/aliases/source state are recorded.
- Production malformed checkout POST smoke returns safe redirect or non-sensitive failure, not raw `500`.
- Production missing-slug checkout smoke remains safe.
- Production unsigned webhook remains rejected.
- Anonymous protected routes do not expose protected content.
- Supabase/authenticated/Stripe gates are verified if safe access exists, or re-blocked with manual-intervention instructions.
- No secret values or fragments are printed or stored.
- No destructive production mutation or live financial action is performed.
- Sprint-close planning docs are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session.

## Deployment Acceptance Matrix

| Case | Expected result |
|---|---|
| Vercel project | `pnr-precision-performance` confirmed before deploy |
| Production domain | `https://precisionperformance.com.au` remains launch domain |
| Source state | Sprint 012 checkout fix present; no unexpected app/source changes |
| Validation | Lint, TypeScript, and known-good build pass or only restricted-sandbox failure is documented |
| Deployment | Production deployment succeeds and is inspected as Ready |
| Aliases | Launch aliases remain attached |
| Rollback notes | Existing rollback path remains documented |

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
| `POST /api/checkout` malformed/no-content-type body | Safe redirect or non-sensitive failure, not raw `500` |
| `POST /api/stripe/webhook` unsigned request | Rejected |
| Anonymous protected routes | Redirected; protected content not exposed |

## Live Acceptance Gate Matrix

| Gate | Expected result |
|---|---|
| Supabase remote migration/checks | Completed safely, or blocked with manual-intervention instructions |
| Authenticated workflow/RLS smoke | Completed with safe sessions/fixtures, or blocked with manual-intervention instructions |
| Stripe test checkout/webhook replay | Completed in test mode, or blocked with manual-intervention instructions |

## Required Validation

- `git status --short`
- branch and short revision identity
- app/source diff summary
- inspect `.vercel/project.json` and `vercel.json`
- name-only `.env*` presence inspection, no values
- safe tool/path availability check for Supabase, Stripe, Vercel, and curl
- checkout malformed-body local smoke or direct route test where feasible
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- if sandboxed build fails for known sandbox reasons, rerun the bounded build outside the restricted sandbox and record both outcomes
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
FILE: planning/sprints/012A-fix-deploy-and-verify/handoff-prompt.md
============================================================

# Sprint 012A - Builder Handoff Prompt

You are Builder for Sprint 012A - Fix, Deploy, And Verify in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012A-fix-deploy-and-verify/requirements.md`
5. `planning/sprints/012A-fix-deploy-and-verify/blueprint.md`
6. `planning/sprints/012A-fix-deploy-and-verify/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Deploy the Sprint 012 checkout safety fix and verify production behavior/provenance.

This sprint is not Sprint 013. Do not start biochemistry data model, voice, upload, scoring, recommendation, Table of Knowledge, chart, or history-panel work.

## Guardrails

Do not assume deployment target. Confirm Vercel project `pnr-precision-performance` and production domain `https://precisionperformance.com.au` before deploy.

Do not deploy if unexpected app/source changes would be included. Stop and ask.

Do not print, store, or document secrets or secret fragments.

Do not delete files or data.

Do not make destructive database changes.

Do not create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes.

Do not change DNS, project settings, auth, RLS, billing, payment, schema, product catalogue behavior, launch infrastructure, Node runtime compatibility, or broad cleanup.

Do not modify files outside the approved Sprint 012A file set.

If safe remote Supabase access, test users, fixtures, Stripe test-mode checkout, or webhook replay are unavailable, document manual intervention instead of inventing credentials or broadening scope.

## Suggested Execution

1. Read the sprint files and relevant docs.
2. Record current branch/revision and dirty worktree status.
3. Confirm the checkout fix is present in `app/api/checkout/route.ts`.
4. Confirm Vercel project and production target.
5. Check source-state stop conditions.
6. Run local validation with the bounded wrapper.
7. Run local checkout malformed/missing slug smoke where feasible.
8. Deploy to Vercel production only if stop conditions are clear.
9. Inspect the new deployment status, aliases, and source provenance.
10. Run production public/safety smoke.
11. Re-check whether Supabase/authenticated/Stripe gates are safely verifiable; otherwise re-block with exact manual steps.
12. Update evidence docs, planning state, and `planning/ARCHITECT_BRIEFING.md`.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- whether the Sprint 012 checkout safety fix is deployed
- what deployment id/URL/source state was verified
- what production smoke passed
- what remains unverified
- what manual action is still needed, if any
- what validation was run
- whether the project is ready to move to Sprint 013 or still needs operator-assisted live acceptance

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "012A-fix-deploy-and-verify",
  "updated": "2026-07-14T00:00:00+10:00"
}
