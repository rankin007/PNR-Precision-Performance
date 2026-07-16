# Sprint 005 - Portal And Data Entry Workflow

## Goal

Make the core Precision Performance operational workflow usable end-to-end.

The sprint is successful when assigned horses can be browsed safely, daily records/feeding logs/track sessions can be created for accessible horses, recent submissions can be reviewed and corrected, validation errors are clear, and phone/desktop smoke evidence is documented or flagged with exact manual-intervention instructions.

## Scope

Builder should:

- inspect the current portal horse, ops/data-entry, domain, auth guard, and RLS implementation before editing
- preserve the Sprint 004 portal/auth/RLS access baseline unless the Sprint 005 workflow requires a narrow compatible fix
- make `/portal/horses` show real assigned horses through permission-safe queries
- make `/portal/horses/[horseId]` show permission-safe horse identity, recent metrics, and recent history for accessible horses only
- harden `/data-entry` daily record creation for accessible horses
- harden `/data-entry/feeding` feeding log creation for accessible horses
- harden `/data-entry/track` track session creation for accessible horses
- harden `/data-entry/submissions` recent submission review for the approved operational record types
- harden `/data-entry/submissions/[submissionId]` correction flows for daily, feeding, and track records
- add or adjust validation rules and user-facing errors for missing required fields, inaccessible horses, failed writes, and missing Supabase configuration
- ensure unauthorized users cannot create or correct operational records outside their role/horse permissions
- make the smallest source, RLS, or additive migration fixes needed for Sprint 005 acceptance
- document phone and desktop smoke results
- update readiness and validation documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the Sprint 006 handoff

## Out Of Scope

- production deployment
- production project-setting changes
- production domain changes
- Stripe checkout, Stripe webhook, billing, product catalogue, order, or payment reconciliation changes
- Sprint 006 admin commerce hardening
- broad admin membership/user-management changes unrelated to Sprint 005 smoke setup
- broad database redesign
- destructive database changes
- deleting users, member profiles, memberships, horses, operational records, files, generated artifacts, or data
- printing secret values, credential values, tokens, passwords, private keys, full connection strings, or secret fragments
- normalizing or reverting unrelated dirty-worktree changes
- force-removing or force-archiving `.release-main/`
- Node 24 compatibility work
- dependency/security remediation from `npm audit`
- installing packages from the network without approval
- full approval/audit-history subsystem unless already present and usable with a narrow integration
- AI recommendations, laboratory integrations, E-Trakka integration, native voice recording, multi-login trainer teams, owner/vet/external stakeholder app logins, heavy AWS processing, or laboratory staff workflows

## Files

Approved file set for edits during Sprint 005:

- `planning/STATE.md`
- `planning/DECISIONS.md`, only to add Sprint 005 decisions or manual-intervention decisions
- `planning/DOMAIN.md`, only to update Sprint 005 context at close
- `planning/RISKS.md`, only to update Sprint 005 risks at close
- `planning/QUESTIONS.md`, only to update Sprint 005 questions/blockers at close
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, only if Sprint 005 access evidence updates the carried-forward matrix
- `docs/ENVIRONMENT.md`, only for non-secret Supabase/auth/data-entry contract clarifications
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, if created or updated for Sprint 005 evidence
- `app/(portal)/layout.tsx`
- `app/(portal)/portal/page.tsx`
- `app/(portal)/portal/horses/page.tsx`
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `app/(portal)/portal/reports/page.tsx`, only if navigation or workflow context needs a narrow update
- `app/(ops)/layout.tsx`
- `app/(ops)/data-entry/page.tsx`
- `app/(ops)/data-entry/feeding/page.tsx`
- `app/(ops)/data-entry/track/page.tsx`
- `app/(ops)/data-entry/submissions/page.tsx`
- `app/(ops)/data-entry/submissions/[submissionId]/page.tsx`
- `app/(ops)/data-entry/actions.ts`
- `components/layout/app-shell.tsx`
- `components/layout/section-card.tsx`
- `components/layout/status-grid.tsx`
- `components/ops/stable-search.tsx`
- `lib/auth/session.ts`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/auth/roles.ts`, only for existing permission-code alignment
- `lib/domain/horses.ts`
- `lib/domain/operations.ts`
- `lib/domain/food-menus.ts`
- `lib/navigation.ts`
- `lib/supabase/server.ts`
- `lib/supabase/env.ts`
- `supabase/migrations/0001_initial_schema.sql`, inspection-first and edit only if the minimal Sprint 005 fix truly belongs there
- `supabase/migrations/0002_rls_policies.sql`
- `supabase/migrations/0003_staff_scope_and_permissions.sql`
- `supabase/migrations/0004_staff_rls_extension.sql`
- `supabase/migrations/0005_membership_level_seeds.sql`, only for non-secret permission seed alignment directly required by Sprint 005
- `supabase/bootstrap/remote-init.sql`, only for non-secret bootstrap/RLS setup corrections directly required by Sprint 005
- `scripts/`, only for non-secret validation helpers or smoke-check scripts if needed

Inspection-only areas:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `middleware.ts`, if present
- `app/(admin)/`, only for understanding user/membership fixture setup and without broad admin changes
- `app/api/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe/`
- `supabase/`
- `docs/DEPLOYMENT.md`
- `.vercel/`
- environment files, names/presence/shape only; do not print secret values

Rules for source and migration edits:

- Portal and ops workflow changes are authorized only where directly needed for Sprint 005 acceptance.
- Auth/access changes are authorized only where needed to enforce portal or data-entry workflow permissions.
- RLS policy changes are authorized only where needed to enforce assigned-horse and horse-record write boundaries for approved Sprint 005 workflows.
- Database changes must be additive or policy-focused unless the user explicitly approves otherwise.
- If a fix requires destructive schema/data changes, broad data model changes, payment changes, production setting changes, or files outside the approved set, stop and ask.
- Do not edit or archive outside the approved file set without stopping for approval.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly.

For each manual intervention, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
- whether Sprint 005 can still close with local/code-backed evidence or must carry the case forward

Examples that must be flagged this way include missing Supabase environment variables, unavailable test users, missing assigned horse fixtures, blocked remote RLS execution, failed browser/device smoke checks, validation timeouts, and approval needs for network installs or out-of-scope files.

## Acceptance

Sprint 005 is complete when:

- the current portal horse and ops/data-entry implementation has been inspected and summarized
- `/portal/horses` lists real assigned horses for an active permitted user, or live verification is flagged with exact manual-intervention instructions
- `/portal/horses/[horseId]` shows safe detail for accessible horses and safe denial/not-available behavior for inaccessible horses
- daily record creation works for an accessible horse with required validation and clear user-facing errors
- feeding log creation works for an accessible horse with required validation and clear user-facing errors
- track session creation works for an accessible horse with required validation and clear user-facing errors
- recent submissions show daily, feeding, and track entries coherently and do not expose unauthorized records
- daily, feeding, and track correction flows update only approved fields and handle missing/inaccessible records safely
- users without required access cannot create or correct records outside their permissions
- missing Supabase configuration produces non-sensitive structural/error states
- no secret values or secret fragments are printed, logged, committed, or documented
- no Stripe checkout/webhook/billing behavior is changed
- no production deployment or production setting change is performed
- no destructive database/data operation is performed
- every blocked/manual-input-required case is flagged with instructions under the manual intervention rule
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` or `docs/READINESS_AUDIT.md` records the Sprint 005 workflow evidence and smoke results
- `npm run lint` completes through the wrapper with explicit status
- `npx tsc --noEmit --incremental false` completes through the wrapper with explicit status
- `npm run build` completes through the wrapper with explicit status
- no validation-related orphan `node/npm` processes remain after checks
- `docs/VALIDATION.md` reflects the current validation result
- `planning/ARCHITECT_BRIEFING.md` is refreshed for Sprint 006
- `planning/STATE.md` and `planning/STATUS.json` are updated at close

## Validation

Required commands/checks:

- `git status --short`
- inspect portal horse, ops/data-entry, domain, auth guard, and RLS surfaces
- non-secret environment presence check for Supabase/auth variables if needed
- secret-fragment scan of changed diagnostics/logging
- workflow smoke matrix:
  - anonymous -> `/portal`
  - anonymous -> `/data-entry`
  - active permitted user -> `/portal/horses`
  - active permitted user -> accessible `/portal/horses/[horseId]`
  - active permitted user -> inaccessible `/portal/horses/[horseId]`
  - permitted record writer -> create daily record
  - permitted record writer -> create feeding log
  - permitted record writer -> create track session
  - missing required fields -> daily, feeding, track, and correction error states
  - permitted record writer -> `/data-entry/submissions`
  - permitted record writer -> correct daily submission
  - permitted record writer -> correct feeding submission
  - permitted record writer -> correct track submission
  - non-record-writer -> denied from create/correct where applicable
  - direct Supabase/RLS checks for assigned-horse and record-write tables where access exists
  - phone-width smoke pass for portal browsing, creation, review, and correction
  - desktop-width smoke pass for portal browsing, creation, review, and correction
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.

## Handoff

Builder, you are executing Sprint 005 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/005-portal-and-data-entry-workflow/SPRINT.md`
6. `planning/SPRINT_SCHEDULE.md`
7. `docs/AUTH_RLS_PORTAL_ACCESS.md`
8. `docs/ENVIRONMENT.md`
9. `docs/VALIDATION.md`
10. `docs/READINESS_AUDIT.md`
11. relevant portal, ops/data-entry, domain, auth guard, and migration files identified by the sprint

Implementation is authorized for this sprint only within the approved file set and only for portal horse browsing, operational record creation, submission review/correction, permission-safe workflow guards, related RLS policy fixes, and related documentation/validation.

Start by mapping the current portal and data-entry workflow before editing. Then make the smallest fixes required to make the workflow usable with real assigned data and permission-safe writes. Carry Sprint 004 live Supabase/RLS blockers forward unless access exists. Every time something does not work or needs user/manual input, flag it with exact instructions under the manual intervention rule. Validate the build, document phone and desktop smoke evidence, and close with a clean handoff to Sprint 006 - Admin And Commerce Hardening.
