# Sprint 012D - Baseline Commit And Deployment Approval Blueprint

## Execution Shape

Sprint 012D turns the Sprint 012C candidate from a temporary folder into a traceable source baseline. It must stop before deployment.

Run the work in this order:

1. Establish current repo/candidate baseline.
2. Create a branch/worktree for the reviewed baseline.
3. Import the Sprint 012C candidate.
4. Confirm secrets/build artifacts are excluded.
5. Verify route parity and checkout fix.
6. Validate and smoke locally.
7. Stage and commit if validation passes.
8. Update docs and stop for deployment approval.

## Branch And Worktree

Recommended branch:

`codex/012d-production-baseline`

Builder may use either:

- a clean git worktree, or
- a careful branch workflow in the main repository

If the main workspace dirty state makes branch operations unsafe, prefer a separate worktree. Do not revert unrelated main workspace changes.

## Candidate Import

Candidate source:

`C:\tmp\pp-012c-baseline-lean-20260714-173135`

Import rules:

- copy app/source/config files from the candidate into the reviewed branch/worktree
- do not copy `.env*`
- do not copy `.next`, build output, caches, validation logs, OneDrive artifacts, or temp files
- preserve `app/api/checkout/route.ts` malformed POST guard
- preserve `/admin/commerce`
- preserve route parity with production evidence

## Verification

Confirm:

- branch name
- diff summary
- no `.env*` staged
- no build artifacts staged
- `/admin/commerce` exists
- checkout guard exists
- known `.release-main` extra routes remain absent
- normalized route parity remains consistent with Sprint 012C evidence

## Validation

Run:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox fails for known sandbox reasons, request approval for outside-sandbox bounded build and record both outcomes.

Local smoke where feasible:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `POST /api/checkout` empty/missing slug
- `POST /api/checkout` malformed/no-content-type body
- anonymous `GET /admin/commerce`
- unsigned webhook if safe config exists; otherwise document limitation if env is intentionally absent

## Commit

If validation passes and no stop condition triggers:

- stage only reviewed baseline files and approved docs
- commit with a clear message, recommended:
  - `chore: establish production baseline with checkout safety fix`

Do not push.

Do not create a PR.

## Documentation

Update:

- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`

Record:

- branch
- commit
- candidate source
- validation
- smoke
- whether ready for deployment approval

## Stop Conditions

Stop before commit if:

- `.env*` or secrets would be staged
- route parity is lost
- `/admin/commerce` is missing
- checkout guard is missing
- validation fails for a meaningful source reason
- import requires deleting unrelated main workspace changes

Always stop before deployment.
