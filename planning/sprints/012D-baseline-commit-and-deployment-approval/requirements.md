# Sprint 012D - Baseline Commit And Deployment Approval Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendation to create Architect Pack 012D.

Sprint 012C produced a validated no-deploy candidate at:

`C:\tmp\pp-012c-baseline-lean-20260714-173135`

The Architect recommendation is to convert that candidate into a durable reviewed branch/commit before deployment, rather than deploying directly from a temporary folder.

## Goal

Create a traceable production-equivalent baseline branch/commit from the Sprint 012C candidate, re-verify it, and prepare a clear deployment approval package for the user.

No production deployment is authorized in Sprint 012D.

## Current Evidence Baseline

- Current production deployment remains `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 012C candidate path is `C:\tmp\pp-012c-baseline-lean-20260714-173135`.
- Sprint 012C candidate achieved exact normalized route parity with production: `25` production routes and `25` candidate routes, with no missing or extra routes.
- `/admin/commerce` is preserved in the candidate.
- Known `.release-main` extra routes are absent.
- Checkout malformed POST guard is present.
- Candidate lint, TypeScript, and build passed.
- Candidate local smoke passed for public/setup routes, anonymous `/admin/commerce`, checkout empty/malformed POST redirects.
- Unsigned webhook smoke returned `503` only because `.env*` files were intentionally excluded from the candidate.

## In Scope

Builder may:

- create a local branch using the `codex/` prefix
- create a clean local worktree or use a controlled branch workflow to import the Sprint 012C candidate
- copy source files from `C:\tmp\pp-012c-baseline-lean-20260714-173135`
- keep secrets excluded; do not copy `.env*`
- verify route parity and source shape
- run lint, TypeScript, build, and local smoke
- stage and commit the reviewed baseline plus checkout fix
- update deployment/readiness/validation docs with candidate-to-commit provenance
- update planning state/status/briefing
- prepare but not execute a future deployment approval recommendation

## Out Of Scope

Builder must not:

- deploy to Vercel
- push to remote
- create a pull request
- mutate production, DNS, Supabase, Stripe, or Vercel project settings
- copy `.env*` or secret-bearing files into the committed baseline
- delete or revert unrelated main workspace files
- implement Sprint 013-016 product features
- apply Supabase migrations remotely
- run Stripe live or test checkout against production unless a later sprint explicitly authorizes it
- install packages from the network without approval

## Approved File Set

Builder may edit:

- source files copied from `C:\tmp\pp-012c-baseline-lean-20260714-173135` into the Sprint 012D branch/worktree
- `.gitignore` only if needed to ensure secrets/build artifacts remain excluded
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`

Inspection-only:

- main dirty workspace for comparison
- `C:\tmp\pp-012c-baseline-lean-20260714-173135`
- `.vercel/project.json`
- `vercel.json`
- `.env*` names/presence only, no values

## Required Output

Builder must produce:

- branch name
- commit hash if committed
- exact source used
- confirmation `.env*` files were not committed
- route parity summary
- checkout guard confirmation
- validation results
- local smoke results
- deployment recommendation and stop point

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
