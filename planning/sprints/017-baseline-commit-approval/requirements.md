# Sprint 017 - Baseline Commit Approval Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendations after Sprint 016 and requested Architect Pack 017 to systematically implement them.

Accepted recommendations:

1. Remove `.env.vercel.production` from tracking or replace it with placeholder-only documentation before any commit. Do not commit production env values.
2. Accept deleted `middleware.ts` only after route-safety validation confirms the Sprint 012F page/API gate still protects public routes without breaking auth, webhooks, or health/setup routes.
3. Accept deleted root `ORCHESTRATOR*` files if archived copies/evidence exist and they are no longer the source of truth.
4. Keep `.release-main/` out of the baseline unless explicitly needed as reference, and treat `.claude/` and `samples/` as manual/user-preference items rather than baseline runtime content.

## Questions And Answers

Q: Should Builder commit production env values?
A: No. Builder must not commit `.env.vercel.production` values. Remove the file from Git tracking while preserving the local working file, or replace tracked content with placeholder-only documentation only if removal is not technically possible.

Q: Is the deleted `middleware.ts` automatically accepted?
A: No. Builder may accept it only after route-safety validation confirms the current page/API gate remains safe for public, auth, webhook, and health/setup paths.

Q: Are the deleted root `ORCHESTRATOR*` files accepted?
A: Yes, if Builder verifies archived copies/evidence exist and confirms the current 120x planning layer is now the durable source of truth.

Q: Should `.release-main/`, `.claude/`, and `samples/` be included in the baseline commit?
A: No by default. Keep `.release-main/` out of the baseline unless explicitly needed as a reference. Treat `.claude/` and `samples/` as manual/user-preference items and leave them untracked unless a specific file is proven necessary.

Q: May Builder push, create a PR, deploy, or apply remote migrations?
A: No. Sprint 017 is local baseline only.

## Goal

Resolve the Sprint 016 manual-review items needed for a safe local repository baseline, run full validation, and create a local baseline commit if all acceptance gates pass and `planning/STATE.md` authorizes Sprint 017 implementation.

Sprint 017 should produce a clean, reviewable local commit that captures accepted Sprints 001-016 work without committing production env values, reference snapshots, tool-preference folders, or unresolved manual-review clutter.

## Dependency Gate

Sprint 017 may begin only if:

- Sprint 016 is complete locally
- `planning/STATE.md` explicitly authorizes Sprint 017 implementation
- `planning/reviews/sprint-016-working-tree-inventory.md` exists
- `docs/REPOSITORY_ALIGNMENT_016.md` exists

Builder must stop before implementation if authorization is absent or if the repository state has materially changed in a way that invalidates Sprint 016 inventory.

## In Scope

Builder may:

- inspect working-tree status and compare it to Sprint 016 inventory
- remove `.env.vercel.production` from Git tracking while preserving the local file on disk
- ensure `.env.vercel.production` is ignored after it is untracked
- create or update placeholder-only env documentation if needed
- validate route safety around the Sprint 012F page/API under-construction gate
- accept the deleted `middleware.ts` only if route-safety validation passes
- verify archived/evidence copies for root `ORCHESTRATOR*` files before accepting their deletion
- keep `.release-main/`, `.claude/`, and `samples/` out of the baseline commit unless a specific file is justified in documentation
- stage the accepted baseline file set intentionally
- run full validation before commit
- create a local baseline commit if all gates pass
- update planning closeout files after commit

## Out Of Scope

Builder must not:

- print or commit secret values or fragments
- delete the local `.env.vercel.production` file from disk unless the user separately requests it
- add `.release-main/` wholesale
- add `.claude/` or `samples/` wholesale
- build trends/history, mobile capture UI, results UI, OCR, voice-to-text, uploads, or recommendation content
- invent production thresholds or Table of Knowledge advice
- change auth, RLS, Stripe, Supabase production, Vercel production, DNS, or production data beyond validating current local behavior
- apply remote Supabase migrations
- deploy
- push
- create a PR
- change Stripe products/prices/checkout behavior beyond preserving accepted sprint work
- reopen public website/shop surfaces hidden by Sprint 012F
- run destructive git reset/checkout commands

## Approved File Set

Builder may edit or stage:

- `.gitignore`
- `.env.vercel.production` only through safe Git untracking or placeholder-only replacement if untracking is impossible
- planning files under `planning/**`
- docs under `docs/**`
- accepted sprint work already classified as `keep-sprint-work` in Sprint 016 inventory
- deleted root `ORCHESTRATOR*` entries if archive/evidence verification passes
- deleted `middleware.ts` if route-safety validation passes

Builder may inspect but should not stage by default:

- `.release-main/**`
- `.claude/**`
- `samples/**`

Builder must stop before staging any file that appears to contain real secrets or unresolved production-only configuration.

## Required Output

Builder must produce or update:

- `docs/BASELINE_COMMIT_017.md`
- `planning/reviews/sprint-017-baseline-staging-review.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if new durable decisions, risks, or open questions appear

If a local commit is created, record:

- branch
- commit hash
- commit subject
- exact validation commands/results
- files deliberately excluded from the commit
- remaining manual-review items

## Validation

Before any commit, Builder must run:

- route-safety validation for the Sprint 012F public gate and allowed routes
- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts`
- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts`
- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm run build` through the known bounded/outside-sandbox path if the sandbox build hits the known EPERM limitation
- `git diff --check`
- safe staged-file review before commit

Builder must not commit if validation fails unless the user separately approves a partial/broken baseline, which is not expected in this sprint.

## Commit Rule

A local commit is authorized only if all of these are true:

- `planning/STATE.md` authorizes Sprint 017
- `.env.vercel.production` values are not staged
- route-safety validation passes or the sprint records a blocker and does not commit
- root `ORCHESTRATOR*` deletion is verified against archive/evidence
- `.release-main/`, `.claude/`, and `samples/` are not staged unless individually justified
- full validation passes or known sandbox limitations are separately documented with successful approved fallback validation
- staged files match the baseline intent

No push, PR, deployment, or remote migration is authorized.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
