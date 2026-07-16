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
