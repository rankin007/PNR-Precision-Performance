# Sprint 012C - Production Baseline Reconstruction Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendation: "Create Architect pack 012C."

Sprint 012B found that no clean committed production baseline is recoverable from available non-secret metadata. The current dirty workspace is the closest local route-shape match, but it is not safe to deploy wholesale. Sprint 012C exists to deliberately reconstruct a production-equivalent candidate before any future deployment approval.

## Goal

Create a temporary production-equivalent baseline candidate that preserves current live route/source behavior, applies only the Sprint 012 checkout malformed POST safety fix on top, validates locally, and stops for explicit deployment approval.

No deployment is authorized in Sprint 012C.

## Current Evidence Baseline

- Current live production deployment is `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Production output includes `/admin/commerce`.
- Vercel metadata does not expose exact Git/source provenance.
- Clean `8bf310a` is not production-equivalent because it lacks `/admin/commerce`.
- `C:\tmp\pp-012a-clean-20260714-165007` is not production-equivalent because it lacks `/admin/commerce`.
- `.release-main` is not production-equivalent because it has extra routes not present in live production.
- Current dirty workspace is closest by route shape but includes broad app/source changes and later local edits.
- Sprint 012 checkout safety fix is present in the main workspace `app/api/checkout/route.ts`.

## In Scope

Builder may:

- inspect git status, branch, revision, and source diffs
- inspect Vercel route/deployment metadata already available through non-secret commands
- create temporary candidate directories under `C:\tmp`
- copy current workspace content into a temporary candidate
- remove or isolate known post-production-only files from the temporary candidate
- compare route shape against current production evidence
- apply or preserve only the Sprint 012 checkout malformed POST guard on top of the candidate
- validate the candidate with lint, TypeScript, and build using the known-good bounded path
- run local route smoke against the candidate where feasible
- produce a candidate manifest and diff summary
- update planning and evidence docs with the candidate path, parity result, validation result, and next recommended action

## Out Of Scope

Builder must not:

- deploy to Vercel
- mutate production, DNS, Supabase, Stripe, or Vercel project settings
- modify production data, users, horses, products, orders, payments, subscriptions, or Stripe objects
- delete or revert files from the main workspace
- normalize the main dirty worktree
- edit main workspace app/source files, except planning/docs approved below
- implement Sprint 013-016 product features
- print or store secrets
- inspect build logs or dashboards if they may expose secrets
- install packages from the network without approval

## Approved File Set

Builder may edit:

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

Builder may create and edit temporary candidate trees under:

- `C:\tmp\pp-012c-*`

Inspection-only in the main workspace:

- app/source files needed to compare route/source shape
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `.env*` names/presence only; no values
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `scripts/run-validation-command.ps1`

## Required Candidate Output

Builder must produce a candidate report in docs/planning that states:

- candidate path
- starting source used
- files removed or isolated from candidate and why
- app/source diff summary versus current dirty workspace
- app/source diff summary versus clean `8bf310a` where useful
- route parity comparison against Vercel production evidence
- whether `/admin/commerce` is preserved
- whether extra `.release-main` routes are absent
- whether the checkout malformed POST guard is present
- validation results
- local smoke results where feasible
- whether Builder recommends this candidate for a later deploy sprint

## Manual Intervention Rule

If any required reconstruction or validation cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
