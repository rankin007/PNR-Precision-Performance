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

Sprint 004 is approved as an auth, RLS, and portal access sprint. The goal is to prove real Supabase users can sign in, bootstrap into the expected application profile records, reach only the portal/admin surfaces they are allowed to reach, and receive clear denial or redirect behavior when they are not permitted.

The approved path to Done remains Sprints 004-007 in `planning/SPRINT_SCHEDULE.md`.

---

## Workflow Profile

Selected profile: `standard`

Reason: this is an existing web application with Supabase, Stripe, auth, data-entry, and deployment surfaces. Sprint 004 intentionally touches auth, authorization, RLS, and portal access, so Builder must stay inside the approved sprint scope, avoid credential exposure, avoid production-impacting changes, and stop before broad schema, commerce, deployment, or data-entry changes.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 004 approved scope without another approval.

Sprint 004 explicitly authorizes narrow implementation work for:

- Supabase sign-in and callback flow defects
- application user/member bootstrap defects
- portal/admin access gating defects
- RLS policy defects directly required to prove admin/member/non-member access cases
- permission documentation and smoke-test evidence

Builder must stop and ask before:

- touching or printing secret values, tokens, credentials, private keys, or password material
- deleting files or data
- making destructive database changes
- changing billing, payment behavior, Stripe checkout/webhook behavior, product catalogue behavior, or order/payment reconciliation
- changing database schema beyond the smallest auth/RLS/profile-bootstrap adjustment needed for Sprint 004 acceptance
- modifying files outside the approved file set
- starting a production deployment or changing production project settings
- installing packages from the network
- changing broad portal data-entry workflows, admin commerce management, or launch infrastructure

---

## Active Sprint

`planning/sprints/004-auth-rls-and-portal-access/`

Sprint 004 - Auth, RLS, And Portal Access

---

## Approved Sprint Schedule

- Sprint 004 - Auth, RLS, And Portal Access
- Sprint 005 - Portal And Data Entry Workflow
- Sprint 006 - Admin And Commerce Hardening
- Sprint 007 - Production Launch Readiness

Definition of Done: the MVP is live, tested, documented, and handoff-ready, with public site, auth, permission-safe portal, data-entry workflows, admin, Stripe, production deployment, smoke tests, and rollback notes verified.

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads `planning/sprints/004-auth-rls-and-portal-access/SPRINT.md`.
3. Builder inspects the existing auth, Supabase, RLS, portal, and admin access surfaces before editing.
4. Builder prepares real Supabase test-user acceptance cases without exposing credentials or secret values.
5. Builder fixes only the defects required to prove sign-in, callback, bootstrap, portal access, admin access, non-member denial, and RLS boundaries.
6. Builder validates with lint, TypeScript, build, and documented manual smoke evidence.
7. Builder refreshes planning/docs at close and hands off to Sprint 005.

---

## Blockers

No blocker for Sprint 004 planning.

Builder may discover that real Supabase test users or remote environment access are not available. If so, Builder should still inspect and harden local code paths where evidence allows, then record the exact blocked acceptance cases and the smallest user-provided access needed to complete them.

============================================================
FILE: planning/DECISIONS.md
============================================================

# Decisions

Record durable decisions future sprints must respect.

---

## Decision Log

| Date | Decision | Reason | Impact |
|---|---|---|---|
| 2026-07-11 | Sprint 001 will be a truth and readiness audit, not a feature build. | The project has meaningful app, backend, auth, Stripe, and planning surfaces, but needs a clean baseline before more features are added. | Builder should inspect, verify, document, and recommend the next narrow target before broad implementation. |
| 2026-07-11 | Sprint 001 includes cleanup by archiving stale or misdirecting files/folders rather than deleting them. | The project contains generated caches, duplicate docs, legacy handoff files, and an empty original source-material folder; cleanup is useful, but deletion is higher risk. | Builder may move approved cleanup candidates into `references/archive/sprint-001-cleanup/` and must write a cleanup manifest. |
| 2026-07-11 | Use the `standard` workflow profile for Sprint 001. | The work is mostly audit/cleanup, but the app includes auth, data, deployment, and payment surfaces. | Builder may work under sprint authorization, but must stop before secrets, auth, billing, schema, RLS, or scope expansion. |
| 2026-07-11 | Small sprint format is preferred for Sprint 001. | A single `SPRINT.md` is clearer than four thin placeholder files for this focused audit. | Builder follows `planning/sprints/001-truth-and-readiness/SPRINT.md` as the source of truth. |
| 2026-07-11 | Sprint 002 will focus exclusively on build readiness. | Sprint 001 found that lint passes but `npm run build` times out before meaningful progress output. Feature work should wait until the build has a reliable exit path. | Builder should diagnose and fix the build hang without broad product changes. |
| 2026-07-11 | Sprint 002 remains on the `standard` workflow profile. | The immediate work is narrow, but build fixes may touch shared Next.js, app route, dependency, or environment-loading surfaces. | Builder may work inside the approved file set, but auth, RLS, Stripe, schema, secrets, and deployment remain stop-and-confirm areas. |
| 2026-07-11 | Sprint 002 should use the bounded validation wrapper for build/lint checks. | Prior validation attempts created orphaned `node.exe` processes and blocked progress. | Builder must use the wrapper for potentially hanging validation commands and record exact outcomes. |
| 2026-07-11 | Sprint 002 pins build execution to project-local Node `22.14.0`. | Global Node `24.14.1` repeatedly hung Next.js `15.3.8` before meaningful build progress, while Node `22.14.0` completed the build. | `npm run build` uses the local Node shim and future runtime upgrades should be planned/tested deliberately. |
| 2026-07-11 | Sprint 002 removes stale `build/types` from the active TypeScript graph. | Local Next output should not be type-checked as source, and stale generated types contributed to confusing build diagnosis. | `tsconfig.json` includes source plus `.next/types` and excludes `build` and `.release-main`. |
| 2026-07-11 | The approved path to Done is Sprints 003-007. | The app is build-ready but still needs release baseline, auth/RLS proof, real portal/data-entry workflows, admin/commerce hardening, and production launch verification. | Use `planning/SPRINT_SCHEDULE.md` as the durable roadmap. Do not treat the schedule itself as Builder implementation authorization. |
| 2026-07-11 | Sprint 003 will establish release baseline and environment truth before product hardening. | Auth, RLS, portal, admin, Stripe, and production launch work need a trustworthy repo/environment baseline first. | Builder may inspect and document deployment/environment/worktree truth and remove unsafe secret-fragment diagnostics, but must defer product behavior changes to later sprints. |
| 2026-07-11 | Sprint 003 treats Vercel as the local evidence-backed deployment target. | `vercel.json`, `.vercel/project.json`, and README stack notes all point to Vercel, while no Railway/Netlify/Docker deployment config was found. | Future deployment planning should start from Vercel, but production project/domain confirmation is still required before launch. |
| 2026-07-11 | Do not log secret values or secret fragments; use configured/missing status instead. | Sprint 003 found Stripe webhook logging that exposed a webhook secret prefix. | Future diagnostics may report non-sensitive status only; no prefixes, suffixes, token fragments, or decoded credential material. |
| 2026-07-11 | Sprint 004 will prove auth, RLS, and portal access before broader portal/data-entry work. | Member-facing workflows are unsafe to expand until real users, profile bootstrap, role gates, and RLS boundaries are trustworthy. | Builder may make narrow auth/RLS/portal access fixes, but data-entry workflows, admin commerce, Stripe, deployment, and broad schema work remain out of scope. |

============================================================
FILE: planning/DOMAIN.md
============================================================

# Domain Context

This file captures the operating context for the current feature/fix sprint inside the existing project.

---

## Client

Aprec8 Pty Ltd

---

## Product Context

Precision Performance is a racehorse-focused equine performance platform. The intended product direction includes public website pages, member/owner/trainer portal experiences, data-entry workflows, horse performance records, biochemistry-related source material, membership administration, reporting, and commerce/payment capability.

The current codebase is a partially built Next.js/Supabase/Stripe application with a 120x planning layer added on top.

---

## Feature Or Fix Request

Sprint 004 is an auth, RLS, and portal access sprint.

Builder should prove that real Supabase users can sign in, return through `/auth/callback`, bootstrap into the expected application records, and access only the portal/admin/member data allowed by their role and membership state.

---

## Current Behavior

Known after Sprint 003:

- The repository contains a Next.js app with public, portal, admin, ops/data-entry, shop, auth, setup, checkout, and webhook surfaces.
- Supabase migrations, auth helpers, admin helpers, portal pages, and Stripe checkout/webhook scaffolding exist.
- Auth, RLS, admin service-role, Stripe checkout, and webhook behavior are scaffolded but not production-verified.
- Vercel is the local evidence-backed deployment target.
- The non-secret environment variable contract is documented in `docs/ENVIRONMENT.md`.
- `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` complete through the bounded validation wrapper when the known-good unsandboxed build path is used.
- `npm run build` is pinned to project-local Node `22.14.0`; global Node `24.14.1` hangs Next.js `15.3.8` startup.
- The worktree is dirty with many pre-existing changes recorded by Sprint 003.
- Production domain and remote Vercel environment completeness remain unverified.

---

## Desired Behavior

After Sprint 004:

- `/sign-in` presents a working sign-in path without exposing secrets or leaking confusing failure states.
- `/auth/callback` safely exchanges the Supabase callback and redirects users according to the intended app flow.
- authenticated users bootstrap into the expected `users` and `member_profiles` records, or failures are handled and documented clearly.
- active members can reach the intended `/portal` surfaces and see only permitted data.
- admin users can reach admin-only surfaces needed for Sprint 004 verification.
- non-members, inactive members, anonymous users, and wrong-role users are denied or redirected predictably.
- RLS policies are verified with real Supabase test users for the Sprint 004 access matrix.
- role and permission acceptance cases are documented for future portal/data-entry and launch work.
- validation remains green and no secret values or fragments are printed or stored.

---

## Known Files Or Modules To Inspect

- `app/sign-in/page.tsx`
- `components/auth/sign-in-form.tsx`
- `app/auth/actions.ts`
- `app/auth/callback/route.ts`
- `app/(portal)/layout.tsx`
- `app/(portal)/portal/page.tsx`
- `app/(portal)/portal/horses/page.tsx`
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `app/(portal)/portal/reports/page.tsx`
- `app/(admin)/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/users/page.tsx`
- `app/(admin)/admin/users/actions.ts`
- `app/(admin)/admin/memberships/page.tsx`
- `app/(admin)/admin/memberships/actions.ts`
- `lib/auth/session.ts`
- `lib/auth/roles.ts`
- `lib/auth/bootstrap.ts`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `lib/supabase/admin.ts`
- `lib/supabase/env.ts`
- `supabase/migrations/0001_initial_schema.sql`
- `supabase/migrations/0002_rls_policies.sql`
- `supabase/migrations/0003_staff_scope_and_permissions.sql`
- `supabase/migrations/0004_staff_rls_extension.sql`
- `supabase/bootstrap/remote-init.sql`
- `docs/ENVIRONMENT.md`
- `docs/READINESS_AUDIT.md`
- `docs/VALIDATION.md`

---

## Constraints / Out Of Scope

- Do not build broad new portal/data-entry workflows.
- Do not redesign pages or components for visual polish.
- Do not deploy to production.
- Do not change production project settings.
- Do not print secret values or secret fragments.
- Do not delete files, generated artifacts, data, profiles, users, policies, or cleanup candidates.
- Do not force-remove or force-archive `.release-main/`.
- Do not change Stripe checkout, Stripe webhook, billing, product catalogue, order, or payment reconciliation behavior.
- Do not implement Sprint 005 horse workflow features except where a minimal existing page guard/query adjustment is required to prove access boundaries.
- Do not implement Sprint 006 admin commerce hardening.
- Do not normalize the entire dirty worktree by reverting or rewriting unrelated user work.
- Do not install packages from the network without approval.
- Do not chase Node 24 compatibility inside this sprint.
- Do not make broad schema changes. Any migration change must be the smallest auth/RLS/profile-bootstrap change needed for Sprint 004 acceptance.
- Automated AI recommendations in MVP 1 are out of scope unless later approved.
- Live laboratory integrations in MVP 1 are out of scope unless later approved.
- E-Trakka API/live integration in MVP 1 is out of scope unless later approved.
- Native in-app voice recording in MVP 1 is out of scope unless later approved.
- Multi-login trainer teams in MVP 1 are out of scope unless later approved.
- Owner, vet, or external stakeholder application logins in MVP 1 are out of scope unless later approved.
- Heavy AWS processing in MVP 1 is out of scope unless later approved.
- Laboratory staff application workflow in MVP 1 is out of scope unless later confirmed.

============================================================
FILE: planning/RISKS.md
============================================================

# Risks

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---:|---:|---|---|
| Future global Node upgrades reintroduce the Next.js build hang. | Medium | Medium | Keep `npm run build` pinned to project-local Node `22.14.0`; test runtime upgrades in a dedicated maintenance sprint. | Active |
| Codex restricted sandbox hangs while normal unsandboxed local build succeeds. | Medium | Low | Use the bounded wrapper and, when needed, run final Next build validation outside the restricted sandbox; record this distinction in validation docs. | Active |
| OneDrive offline placeholders return under `node_modules` or generated output. | Medium | Medium | Rebuild dependencies with `npm ci` if direct reads or Next build stall on placeholder files; avoid relying on dehydrated dependency trees. | Active |
| Dirty worktree makes it unclear which changes belong to future product work. | High | Medium | Sprint 003 recorded the baseline. Sprint 004 should avoid unrelated reversions and record only its own changed files at close. | Active |
| Auth, RLS, admin service-role, Stripe, or webhook flows are scaffolded but not production-verified. | Medium | High | Sprint 004 verifies auth/RLS/portal access first; Stripe and commerce remain scheduled for Sprint 006. | Active |
| `.release-main/` and duplicated/generated artifacts continue to confuse inspection. | Medium | Medium | Inspect only when relevant; defer removal/archival to an approved cleanup sprint with OneDrive-aware permissions. | Active |
| npm audit reports dependency vulnerabilities. | Medium | Medium | Review audit output in a dependency/security maintenance sprint; do not run `npm audit fix --force` during feature work. | Active |
| Secret values or fragments leak into logs during environment verification. | Medium | High | Verify variable names, presence, and requiredness only; diagnostics may report configured/missing status only. | Active |
| Deployment target assumptions send later work toward the wrong platform. | Low | High | Sprint 003 documented Vercel as the local evidence-backed target; production project/domain confirmation remains a launch question. | Active |
| RLS fixes accidentally broaden member data visibility. | Medium | High | Use a documented admin/member/non-member access matrix and verify with real Supabase test users before closing Sprint 004. | Active |
| Test-user setup requires credentials or remote access the Builder does not have. | Medium | Medium | Do not print or request secret values in chat; record blocked cases and the smallest non-secret setup/access request needed. | Active |
| Auth hardening expands into admin commerce, Stripe, or data-entry workflow work. | Medium | Medium | Keep Sprint 004 limited to sign-in, callback, bootstrap, role gates, RLS, and access documentation. Defer commerce and data-entry to Sprints 005-006. | Active |

============================================================
FILE: planning/QUESTIONS.md
============================================================

# Open Questions

| Question | Owner | Needed By | Status | Answer / Notes |
|---|---|---|---|---|
| What is the next narrow product-readiness sprint after build readiness? | Architect / User | Next planning session | Answered | Approved next sprint was Sprint 003 - Release Baseline And Environment Truth. Full path to Done is locked in at `planning/SPRINT_SCHEDULE.md`. |
| Which deployment target is canonical for the next verification pass: Vercel, Railway, or local-only? | User / Architect | Sprint 003 | Answered with launch caveat | Local project evidence points to Vercel: `vercel.json`, `.vercel/project.json`, and README stack notes. Production intent/domain still need user confirmation before Sprint 007 launch work. |
| Should `.release-main/` and generated artifacts be removed with an elevated/OneDrive-aware cleanup pass later? | User / Architect | Later cleanup sprint | Open | Sprint 001 archive was blocked by Windows/OneDrive permissions. Sprint 003 inspected only and did not force-remove. |
| Should the dirty worktree be normalized before the first product implementation sprint? | Architect / User | Before broad product work | Open | Sprint 003 recorded the dirty baseline and did not revert unrelated work. Sprint 004 may proceed narrowly, but a dedicated normalization step remains recommended before broad feature or launch work if the team wants cleaner ownership boundaries. |
| Are auth/RLS/Stripe/admin service-role flows intended to be production-verified before member-facing work? | Architect / User | Product-readiness planning | Answered | Yes, but sequenced: release baseline first in Sprint 003, auth/RLS/portal in Sprint 004, portal/data-entry in Sprint 005, admin/commerce in Sprint 006, launch verification in Sprint 007. |
| Should global Node 24 support be pursued later? | Architect / Builder | Maintenance planning | Open | Current build is pinned to project-local Node `22.14.0`; global Node `24.14.1` repeatedly hung Next.js `15.3.8`. |
| What is the exact non-secret environment variable contract for local, staging, and production? | Builder / Architect | Sprint 003 close | Answered locally with production caveat | `docs/ENVIRONMENT.md` documents the local/source-derived variable contract by name/category/requiredness only. Actual production values and remote environment completeness were not validated. |
| What production domain should `NEXT_PUBLIC_SITE_URL` use? | User / Architect | Before Sprint 007 launch verification | Open | Sprint 003 confirmed Vercel as the local deployment target, but did not verify DNS/domain intent. |
| What real Supabase test users should represent admin, active member, inactive/non-member, and anonymous Sprint 004 acceptance cases? | User / Builder | Sprint 004 | Open | Builder should avoid printing credentials. If suitable test users already exist locally/remotely, document only their non-secret role labels and acceptance outcomes. |
| Is remote Supabase access available for RLS verification, or should Sprint 004 use local Supabase evidence plus blocked remote cases? | User / Builder | Sprint 004 | Open | Sprint 004 should verify with real Supabase test users where access exists. Missing access should be recorded as a blocker for the affected acceptance case only. |

============================================================
FILE: docs/VALIDATION.md
============================================================

# Validation

## Anti-Hang / Loop Stopper

Validation commands that may hang must run through a bounded wrapper:

`powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`

The wrapper records stdout/stderr logs under `references/archive/sprint-001-cleanup/validation-logs/`, waits only for the configured timeout, and stops validation-related `node`/`npm` processes that appeared during that run. If the timeout fires, Builder records the visible output and continues diagnosis instead of retrying indefinitely.

Use the same wrapper for lint/build if a plain command hangs once. Do not run the same hanging command repeatedly in the same sprint without changing the command, timeout, or hypothesis being tested.

Run wrapper checks sequentially so log names and process cleanup do not collide.

## Current Build Baseline

Sprint 003 preserved the local build baseline:

- `npm run lint` through the wrapper: exited `0`
- `npx tsc --noEmit --incremental false` through the wrapper: exited `0`
- `npm run build` through the wrapper outside the restricted sandbox: exited `0`

Build execution is pinned to project-local Node `22.14.0`. Do not treat global Node `24.14.1` as the project build runtime until a future maintenance sprint proves compatibility.

## Sprint 004 Validation Plan

Builder should record the exact result of each check, including command, status, timeout, exit code when available, log path when generated, and short interpretation.

Required automated checks:

- `git status --short`
- inspect auth, Supabase, portal, admin, and RLS surfaces
- scan changed auth/authorization diagnostics to confirm no secret values or secret fragments are logged
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for validation-related `node/npm` processes

Required manual or integration smoke evidence:

- anonymous visitor is redirected or denied when requesting `/portal`
- valid active member can sign in and reach `/portal`
- valid active member sees only permitted member/horse data under portal routes
- non-member or inactive member is denied or redirected predictably
- admin user can reach admin-only surfaces needed for Sprint 004 verification
- non-admin user cannot reach admin-only surfaces
- Supabase RLS checks confirm admin/member/non-member boundaries for the tables used by the current portal views
- `/auth/callback` handles success and failure paths without leaking sensitive details

If a smoke case cannot be completed because credentials or remote Supabase access are unavailable, Builder should record:

- the exact case
- evidence already inspected
- why the case is blocked
- the smallest non-secret access/setup request needed
- whether code changes were still made and validated locally

## Environment Verification

Environment verification must not print secret values, credential values, tokens, passwords, private keys, or secret fragments.

Allowed:

- variable names
- required vs optional status
- local/staging/production category
- present/missing status
- short non-sensitive descriptions

Not allowed:

- actual values
- prefixes or suffixes of secret values
- token fragments
- decoded credential contents
- full connection strings
- screenshots or logs that expose values

## Cleanup Validation

Sprint 004 is not a cleanup or deletion sprint.

Builder may inspect `.release-main/`, generated artifacts, or caches only if they directly affect validation, but must not delete, force-move, or archive them without approval.

Historical Sprint 001 cleanup evidence remains in:

`references/archive/sprint-001-cleanup/MANIFEST.md`

============================================================
FILE: planning/sprints/004-auth-rls-and-portal-access/SPRINT.md
============================================================

# Sprint 004 - Auth, RLS, And Portal Access

## Goal

Prove that Precision Performance users can sign in and only see what they should.

The sprint is successful when `/sign-in`, `/auth/callback`, `/portal`, admin access gates, app profile bootstrap, and Supabase RLS boundaries are verified with real test-user roles or documented as blocked by missing access with exact next actions.

## Scope

Builder should:

- inspect the current auth, Supabase, portal, admin, and RLS implementation before editing
- verify `/sign-in` and `components/auth/sign-in-form.tsx` are wired to the expected Supabase auth action
- verify `/auth/callback` exchanges the callback safely and redirects users predictably
- verify authenticated users bootstrap into the expected `users` and `member_profiles` records
- verify anonymous, active member, inactive/non-member, non-admin, and admin access paths
- verify current portal pages are protected by role/member checks before querying or rendering protected data
- verify admin-only pages are protected by admin checks before querying or mutating admin data
- verify RLS policies with real Supabase test users for the tables currently used by portal/admin access checks
- make the smallest code or migration fixes needed for Sprint 004 acceptance
- document the role and permission acceptance matrix
- update readiness and validation documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the Sprint 005 handoff

## Out Of Scope

- broad new portal/data-entry workflows
- horse record creation/editing workflows scheduled for Sprint 005
- feeding, daily record, track session, submission review, or correction workflow buildout
- visual redesigns
- production deployment
- production project-setting changes
- production domain changes
- Stripe checkout, Stripe webhook, billing, product catalogue, order, or payment reconciliation changes
- Sprint 006 admin commerce hardening
- broad database redesign
- destructive database changes
- deleting users, member profiles, memberships, horse records, files, generated artifacts, or data
- printing secret values, credential values, tokens, passwords, private keys, or secret fragments
- normalizing or reverting unrelated dirty-worktree changes
- force-removing or force-archiving `.release-main/`
- Node 24 compatibility work
- dependency/security remediation from `npm audit`
- installing packages from the network without approval

## Files

Approved file set for edits during Sprint 004:

- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, if created or updated for Sprint 004 acceptance evidence
- `docs/ENVIRONMENT.md`, only for non-secret auth/Supabase contract clarifications
- `app/sign-in/page.tsx`
- `components/auth/sign-in-form.tsx`
- `app/auth/actions.ts`
- `app/auth/callback/route.ts`
- `app/(portal)/layout.tsx`
- `app/(portal)/portal/page.tsx`
- `app/(portal)/portal/horses/page.tsx`
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `app/(portal)/portal/reports/page.tsx`
- `app/(admin)/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/users/page.tsx`
- `app/(admin)/admin/users/actions.ts`
- `app/(admin)/admin/memberships/page.tsx`
- `app/(admin)/admin/memberships/actions.ts`
- `lib/auth/session.ts`
- `lib/auth/roles.ts`
- `lib/auth/bootstrap.ts`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `lib/supabase/admin.ts`
- `lib/supabase/env.ts`
- `supabase/migrations/0001_initial_schema.sql`, inspection-first and edit only if the minimal Sprint 004 fix truly belongs there
- `supabase/migrations/0002_rls_policies.sql`
- `supabase/migrations/0003_staff_scope_and_permissions.sql`
- `supabase/migrations/0004_staff_rls_extension.sql`
- `supabase/bootstrap/remote-init.sql`, only for non-secret bootstrap/RLS setup corrections directly required by Sprint 004
- `scripts/`, only for non-secret validation helpers or smoke-check scripts if needed

Inspection-only areas:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `middleware.ts`, if present
- `app/`
- `components/`
- `lib/`
- `supabase/`
- `docs/DEPLOYMENT.md`
- `.vercel/`
- environment files, names/presence/shape only; do not print secret values

Rules for source and migration edits:

- Auth and authorization changes are authorized only where directly needed for Sprint 004 acceptance.
- RLS policy changes are authorized only where directly needed to enforce admin/member/non-member boundaries for current portal/admin surfaces.
- Database changes must be additive or policy-focused unless the user explicitly approves otherwise.
- If a fix requires destructive schema/data changes, broad data model changes, payment changes, production setting changes, or files outside the approved set, stop and ask.
- Do not edit or archive outside the approved file set without stopping for approval.

## Acceptance

Sprint 004 is complete when:

- the current auth/RLS/portal implementation has been inspected and summarized
- `/sign-in` works or has a documented, code-backed fix path if blocked by missing external access
- `/auth/callback` handles successful and failed callbacks safely
- authenticated users bootstrap into the expected app records, or the exact blocker is documented
- anonymous visitors cannot access protected `/portal` content
- active member users can access the intended `/portal` surface
- active member users see only permitted data under current portal routes
- inactive or non-member users are denied or redirected predictably
- admin users can access admin-only surfaces needed for Sprint 004 verification
- non-admin users cannot access admin-only surfaces
- RLS policy checks are verified with real Supabase test users for the current portal/admin data boundary, or blocked cases are documented precisely
- no secret values or secret fragments are printed, logged, committed, or documented
- no Stripe checkout/webhook/billing behavior is changed
- no broad data-entry workflow behavior is implemented
- `docs/AUTH_RLS_PORTAL_ACCESS.md` or `docs/READINESS_AUDIT.md` records the role/permission acceptance matrix and results
- `npm run lint` completes through the wrapper with explicit status
- `npx tsc --noEmit --incremental false` completes through the wrapper with explicit status
- `npm run build` completes through the wrapper with explicit status
- no validation-related orphan `node/npm` processes remain after checks
- `docs/VALIDATION.md` reflects the current validation result
- `planning/ARCHITECT_BRIEFING.md` is refreshed for Sprint 005
- `planning/STATE.md` and `planning/STATUS.json` are updated at close

## Validation

Required commands/checks:

- `git status --short`
- inspect auth, Supabase, portal, admin, and RLS surfaces
- non-secret environment presence check for Supabase/auth variables if needed
- secret-fragment scan of changed diagnostics/logging
- role/permission manual or integration smoke matrix:
  - anonymous -> `/portal`
  - active member -> `/sign-in` -> `/auth/callback` -> `/portal`
  - active member -> current portal data routes
  - inactive or non-member -> `/portal`
  - admin -> admin-only routes
  - non-admin -> admin-only routes
  - direct Supabase/RLS checks for current portal/admin tables
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Suggested safe search patterns:

- auth access: `signIn`, `exchangeCodeForSession`, `getUser`, `redirect`, `require`, `role`, `admin`, `member`
- bootstrap/profile: `users`, `member_profiles`, `membership`, `active`
- RLS/policies: `policy`, `auth.uid`, `is_admin`, `member_profiles`, `horse`, `staff`
- unsafe logging in changed files: `console.log`, `console.warn`, `console.error`, `slice(`, `substring(`, `sk_`, `pk_`, `whsec_`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.

## Handoff

Builder, you are executing Sprint 004 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/004-auth-rls-and-portal-access/SPRINT.md`
6. `planning/SPRINT_SCHEDULE.md`
7. `docs/ENVIRONMENT.md`
8. `docs/VALIDATION.md`
9. `docs/READINESS_AUDIT.md`
10. relevant auth, Supabase, portal, admin, and migration files identified by the sprint

Implementation is authorized for this sprint only within the approved file set and only for auth, RLS, bootstrap, portal/admin access gates, and related documentation/validation.

Start by mapping the current sign-in/callback/bootstrap/access path before editing. Then prove the role matrix with real Supabase test users where access exists. Keep all credential and secret handling non-printing. Make the smallest fixes required to make portal access trustworthy, validate the build, and close with a clean handoff to Sprint 005 - Portal And Data Entry Workflow.

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "004-auth-rls-and-portal-access",
  "updated": "2026-07-11T17:00:00+10:00"
}
