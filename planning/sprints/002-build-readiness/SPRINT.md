# Sprint 002 - Build Readiness

## Goal

Make the Precision Performance app build complete reliably.

The sprint is successful when `npm run build` finishes with an explicit exit code through the bounded validation wrapper, no validation-related orphan `node/npm` processes remain, and the cause/fix is documented clearly enough for the next Builder or Architect to trust the baseline.

## Scope

Builder should:

- record baseline `git status --short`
- reproduce the current `npm run build` timeout with the wrapper
- inspect package scripts, Next config, TypeScript config, generated output settings, and relevant route/module surfaces
- test focused hypotheses for the hang using bounded commands
- make the smallest code/config/dependency fix required for build completion
- avoid user-facing behavior changes unless they are directly required by a compile/build failure
- run lint and build through the wrapper after the fix
- verify no validation-related orphan `node/npm` processes remain
- update validation/readiness documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the new baseline and next recommended sprint

## Out of Scope

- new product features
- visual redesigns
- production deployment
- broad refactors
- normalizing the entire dirty worktree
- deleting files, generated artifacts, stale folders, or data
- force-archiving `.release-main/`
- changing authentication, authorization, billing, Stripe behavior, database schema, RLS, migrations, or secrets
- printing secret values
- production verification of Supabase, Stripe, admin service-role, webhook, or RLS behavior

## Files

Approved file set for edits during Sprint 002:

- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `scripts/run-validation-command.ps1`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- app/source files directly identified by build evidence as the cause of the hang or build failure

Inspection-only areas:

- `README.md`
- `app/`
- `components/`
- `lib/`
- `content/`
- `supabase/`
- `.github/`
- `.vercel/`
- `.release-main/`
- `build/`
- `.next/`
- environment files, presence/shape only; do not print secret values

Rules for source edits:

- If a build error identifies a specific file, Builder may make a narrow fix in that file.
- If the suspected fix touches auth, authorization, Stripe, payment, webhook behavior, database schema, RLS, migrations, secrets, or production deployment, Builder must stop and ask before editing.
- If more than a few source files appear necessary, Builder should stop and report the evidence instead of broadening scope.

Do not edit or archive outside the approved file set without stopping for approval.

## Acceptance

Sprint 002 is complete when:

- baseline `git status --short` is recorded
- build timeout is reproduced or explained with evidence
- root cause or most likely cause is documented
- the smallest required fix is made inside the approved scope
- `npm run lint` completes through the wrapper with explicit status
- `npm run build` completes through the wrapper with explicit status
- no validation-related orphan `node/npm` processes remain after checks
- `docs/READINESS_AUDIT.md` is updated with Sprint 002 results
- `docs/VALIDATION.md` reflects the current validation command baseline
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session
- no secrets are printed or stored
- no auth/RLS/Stripe/schema/payment behavior is changed without explicit approval

If `npm run build` still cannot be made to complete inside the sprint, the sprint may close only if the Builder has:

- tested and documented at least three focused hypotheses
- preserved the anti-hang behavior
- recorded all visible output/log paths
- identified the next smallest escalation path
- refreshed `planning/ARCHITECT_BRIEFING.md` with the blocker

## Validation

Required commands/checks:

- `git status --short`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`
- post-validation process check for `node/npm`

Optional bounded checks, if needed:

- `npm run build` with a longer wrapper timeout, only after a new hypothesis or evidence justifies it
- package/Next/TypeScript diagnostic commands that do not require network access
- route/module isolation by temporarily narrowing build inputs only if changes are reverted or formalized as an approved fix before close

Do not install packages from the network unless the build evidence proves a dependency issue and the user approves the required network access.

## Handoff

Builder, you are executing Sprint 002 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/002-build-readiness/SPRINT.md`
6. `docs/VALIDATION.md`
7. `docs/READINESS_AUDIT.md`
8. relevant source/config files identified by the build evidence

Implementation is authorized for this sprint only within the approved file set.

Start by recording git status, then reproduce the build timeout with the wrapper. Move in small steps: observe, form one hypothesis, test it with a bounded command, then make the narrowest fix supported by the evidence. Do not turn this into a feature sprint.
