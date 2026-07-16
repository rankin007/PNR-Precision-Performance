# Sprint 003 - Release Baseline And Environment Truth

## Goal

Normalize the Precision Performance project into a trustworthy release baseline.

The sprint is successful when the deployment target, dirty-worktree baseline, non-secret environment contract, unsafe diagnostic logging status, and current validation baseline are documented clearly enough for Sprint 004 to start without guessing.

## Scope

Builder should:

- record baseline `git status --short`
- summarize the dirty worktree into intentional/current-work/unowned-or-unclear buckets where evidence allows
- inspect local deployment evidence and document the canonical deployment target, or record the target as an open question if it cannot be proven
- inspect environment files, config, scripts, docs, and source references to document required environment variable names and categories without printing values
- scan for unsafe diagnostics that log secret fragments, including Stripe secret-prefix logging
- remove or replace unsafe diagnostic logging with non-sensitive status logging
- confirm local validation remains green through the bounded wrapper
- update validation/readiness documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the Sprint 004 handoff

## Out of Scope

- new product features
- visual redesigns
- production deployment
- production project-setting changes
- broad refactors
- normalizing the entire dirty worktree by reverting or rewriting unrelated work
- deleting files, generated artifacts, stale folders, or data
- force-archiving `.release-main/`
- changing authentication, authorization, billing, Stripe checkout/webhook behavior, database schema, RLS, migrations, or secrets
- printing secret values or secret fragments
- production verification of Supabase, Stripe, admin service-role, webhook, or RLS behavior
- Node 24 compatibility work
- dependency/security remediation from `npm audit`

## Files

Approved file set for edits during Sprint 003:

- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/ENVIRONMENT.md`, if created or updated for non-secret environment contract documentation
- `docs/DEPLOYMENT.md`, if created or updated for deployment-target documentation
- `README.md`, only for a narrow non-secret release-baseline pointer if needed
- `scripts/`, only for validation or non-secret environment-contract helpers if needed
- app/source files directly containing unsafe diagnostic logging that prints secret values or fragments
- config files directly related to deployment or environment contract documentation, if the edit is non-secret and does not change production behavior

Inspection-only areas:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `app/`
- `components/`
- `lib/`
- `content/`
- `supabase/`
- `.github/`
- `.vercel/`
- deployment config files such as `vercel.json`, `railway.json`, `netlify.toml`, Docker files, or equivalent if present
- `.release-main/`
- `build/`
- `.next/`
- environment files, names/presence/shape only; do not print secret values

Rules for source edits:

- If a file logs a secret value or secret fragment, Builder may make a narrow edit to remove that exposure.
- Replacement logging may state only non-sensitive facts such as configured/missing, mode name, or provider label.
- If the suspected fix touches auth behavior, authorization, Stripe checkout/webhook behavior, payment behavior, database schema, RLS, migrations, secrets, or production deployment, Builder must stop and ask before editing.
- If more than a few source files appear necessary, Builder should stop and report the evidence instead of broadening scope.

Do not edit or archive outside the approved file set without stopping for approval.

## Acceptance

Sprint 003 is complete when:

- baseline `git status --short` is recorded
- dirty-worktree summary is documented in `docs/READINESS_AUDIT.md` or another approved doc
- canonical deployment target is documented, or `planning/QUESTIONS.md` clearly records why it remains unconfirmed
- non-secret environment variable contract is documented by name/category/requiredness only
- unsafe secret-fragment diagnostics are removed or documented as not found
- no secret values or secret fragments are printed or stored
- `npm run lint` completes through the wrapper with explicit status
- `npx tsc --noEmit --incremental false` completes through the wrapper with explicit status
- `npm run build` completes through the wrapper with explicit status
- no validation-related orphan `node/npm` processes remain after checks
- `docs/READINESS_AUDIT.md` reflects Sprint 003 results
- `docs/VALIDATION.md` reflects the current validation command baseline
- `planning/ARCHITECT_BRIEFING.md` is refreshed for Sprint 004
- `planning/STATE.md` and `planning/STATUS.json` are updated at close
- no auth/RLS/Stripe/schema/payment/deployment behavior is changed without explicit approval

If the deployment target or environment contract cannot be fully proven locally, the sprint may still close if Builder records:

- evidence inspected
- the remaining unknown
- who must answer it
- the smallest next action needed before Sprint 004 or launch work

## Validation

Required commands/checks:

- `git status --short`
- deployment target evidence inspection
- non-secret environment variable reference scan
- secret-log scan for unsafe diagnostics
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Suggested safe search patterns:

- environment names: `NEXT_PUBLIC_`, `SUPABASE`, `STRIPE`, `DATABASE`, `SERVICE_ROLE`, `WEBHOOK`, `VERCEL`, `RAILWAY`
- unsafe logging: `console.log`, `console.warn`, `console.error`, `slice(`, `substring(`, `startsWith(`, `sk_`, `pk_`, `whsec_`
- deployment evidence: `.vercel`, `vercel`, `railway`, `netlify`, `docker`, `.github/workflows`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.

## Handoff

Builder, you are executing Sprint 003 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/003-release-baseline-and-environment-truth/SPRINT.md`
6. `planning/SPRINT_SCHEDULE.md`
7. `docs/VALIDATION.md`
8. `docs/READINESS_AUDIT.md`
9. relevant deployment/environment/source files identified by the evidence

Implementation is authorized for this sprint only within the approved file set.

Start by recording git status, then establish what the project itself proves about deployment and environment configuration. Keep the work factual and non-secret. Remove unsafe diagnostic logging if found, validate the app, and close with a clean handoff to Sprint 004 - Auth, RLS, And Portal Access.
