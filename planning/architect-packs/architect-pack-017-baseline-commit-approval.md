============================================================
FILE: planning/sprints/017-baseline-commit-approval/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/017-baseline-commit-approval/blueprint.md
============================================================

# Sprint 017 - Baseline Commit Approval Blueprint

## Intent

Sprint 017 turns the Sprint 016 inventory into a safe local repository baseline. The sprint should resolve only the accepted baseline questions and then commit the accepted local state if validation passes.

This is not feature work. It is the bridge between a broad dirty working tree and future product sprints.

## Execution Plan

1. Read required source-of-truth files:
   - `templates/method/120x-agent-identity.md`
   - `AGENTS.md`
   - `planning/STATE.md`
   - `planning/ARCHITECT_BRIEFING.md`
   - `docs/REPOSITORY_ALIGNMENT_016.md`
   - `planning/reviews/sprint-016-working-tree-inventory.md`
   - Sprint 017 requirements, blueprint, acceptance, and handoff
2. Confirm Sprint 017 implementation authorization.
3. Capture branch, HEAD, staged status, unstaged status, and untracked status.
4. Compare current status to Sprint 016 inventory. If material unexpected changes exist, document them and stop unless they are clearly Sprint 017 planning files.
5. Resolve `.env.vercel.production` safely:
   - do not print values
   - preserve the local file on disk
   - remove from Git tracking with a non-destructive index-only action where possible
   - verify it is ignored afterward
6. Validate root `ORCHESTRATOR*` deletion:
   - verify archived/evidence copies or replacement planning source of truth exist
   - document the exact evidence
   - accept deletion only if evidence is sufficient
7. Validate `middleware.ts` deletion:
   - verify current app uses page/API gate behavior from Sprint 012F
   - run local route-safety checks for public gate, checkout block, auth callback, webhook route availability, and health/setup route availability where feasible
   - accept deletion only if the matrix passes
8. Exclude `.release-main/`, `.claude/`, and `samples/` from staging unless a file-specific justification is recorded.
9. Stage the accepted baseline intentionally.
10. Run full validation.
11. Review staged files before commit.
12. Create local baseline commit if all gates pass.
13. Update closeout docs and planning files.

## Safe Env Handling

Preferred approach:

- use Git index-only untracking for `.env.vercel.production`
- leave the local file in the working tree
- keep `.gitignore` protecting it from re-add
- document that production env values were not inspected or committed

If index-only untracking is blocked, Builder must stop and record manual intervention. Do not replace real env values by guessing placeholders unless the file content is already known to be placeholder-only without exposing values.

## Route-Safety Validation Shape

Builder should validate, at minimum:

- `/` renders or redirects to the under-construction gate as intended
- `/home`, `/contact`, `/shop`, and `/shop/[slug]` remain blocked/redirected according to Sprint 012F
- checkout initiation is blocked before Supabase or Stripe work
- `/auth/callback` remains reachable and is not swallowed by a global public gate
- Stripe webhook route remains reachable as a route path and is not blocked by missing root middleware
- health/setup-status route remains reachable if it exists

Use local static/source inspection plus local build/runtime smoke where feasible. Do not deploy.

## Staging Guidance

The baseline should include:

- accepted Sprints 001-016 project files
- planning and docs source of truth
- accepted app/source changes from prior sprints
- accepted migrations and scripts from prior sprints
- deletion of obsolete root `ORCHESTRATOR*` files if archive evidence exists
- deletion of `middleware.ts` only if route-safety validation passes

The baseline should exclude:

- `.env.vercel.production` values
- `.release-main/**`
- `.claude/**`
- `samples/**` unless individually justified
- generated output and dependency folders
- unreviewed local caches/tool files

## Commit Message

Use a plain local baseline commit subject such as:

`chore: establish sprint 017 repository baseline`

Do not push.

## Closeout Planning

At close, update `planning/STATE.md` so implementation authorization returns to `no`.

If a commit is created, the next Architect should know the commit hash and whether the repo is clean apart from intentionally ignored/local files.

If a commit is not created, the next Architect should know exactly which gate blocked it.

============================================================
FILE: planning/sprints/017-baseline-commit-approval/acceptance.md
============================================================

# Sprint 017 - Baseline Commit Approval Acceptance

## Required Acceptance Criteria

- `planning/STATE.md` authorizes Sprint 017 before Builder edits files or stages changes.
- Builder reads Sprint 016 inventory and Sprint 017 sprint files.
- Builder captures current branch and HEAD.
- Current working-tree status is compared to Sprint 016 inventory.
- `.env.vercel.production` values are not printed, copied, staged, or committed.
- `.env.vercel.production` remains available locally if it existed locally before the sprint.
- `.env.vercel.production` is ignored after being removed from Git tracking, or the sprint blocks with manual-intervention instructions.
- Deleted root `ORCHESTRATOR*` files are accepted only after archive/evidence verification.
- Deleted `middleware.ts` is accepted only after route-safety validation passes.
- `.release-main/` is not staged wholesale.
- `.claude/` is not staged wholesale.
- `samples/` is not staged wholesale.
- Accepted baseline files are staged intentionally and reviewed before commit.
- Full validation passes before local commit.
- Local baseline commit is created only if all gates pass.
- No push, PR, deploy, remote migration, production mutation, Stripe change, or public reopening occurs.
- Closeout docs record commit hash or blocker evidence.
- `planning/STATE.md` returns to `Implementation authorized: no` at close.

## Env Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| `.env.vercel.production` tracked with real/local values | Remove from Git tracking without deleting local file; do not stage values. |
| `.env.vercel.production` cannot be safely untracked | Stop and record manual intervention; do not commit. |
| `.env.example` contains placeholders only | May be staged as placeholder guidance. |
| Any env file appears to contain real secrets | Do not print values; block commit until user/operator resolves. |

## Middleware Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Route-safety validation passes without root `middleware.ts` | Accept deletion for baseline. |
| Public gate fails | Do not commit; record blocker. |
| Auth callback, webhook, or health/setup route is blocked unexpectedly | Do not commit; record blocker. |
| Validation cannot be run | Do not commit unless user separately authorizes a partial baseline. |

## Root Handoff Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Archived/evidence copies of root `ORCHESTRATOR*` exist and planning layer is source of truth | Accept deletion. |
| Archive/evidence is missing | Do not accept deletion; record manual intervention. |

## Exclusion Acceptance Matrix

| Path | Expected acceptance |
|---|---|
| `.release-main/**` | Exclude from baseline unless individual file is explicitly justified. |
| `.claude/**` | Exclude from baseline unless user explicitly requests tool config baseline. |
| `samples/**` | Exclude from baseline unless user explicitly requests sample docs baseline. |
| Generated output | Exclude. |
| Dependency folders | Exclude. |

## Validation Acceptance

Required validation before commit:

- route-safety matrix recorded
- biochemistry scoring fixture validation passes
- biochemistry recommendation fixture validation passes
- lint passes
- TypeScript passes
- build passes through the known working path
- `git diff --check` passes
- staged-file review confirms no excluded folders or env values are staged

If any command is blocked by known sandbox restrictions, Builder must use the established approved bounded/outside-sandbox validation path or record a blocker.

## Commit Acceptance

If all gates pass, Builder may create one local commit.

The commit must not be pushed.

The closeout must include:

- branch
- commit hash
- commit subject
- validation summary
- excluded files/folders
- remaining risks and next recommended sprint

============================================================
FILE: planning/sprints/017-baseline-commit-approval/handoff-prompt.md
============================================================

# Sprint 017 - Builder Handoff Prompt

You are Builder for Sprint 017 - Baseline Commit Approval in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `docs/REPOSITORY_ALIGNMENT_016.md`
6. `planning/reviews/sprint-016-working-tree-inventory.md`
7. `planning/sprints/017-baseline-commit-approval/requirements.md`
8. `planning/sprints/017-baseline-commit-approval/blueprint.md`
9. `planning/sprints/017-baseline-commit-approval/acceptance.md`

## Mission

Resolve the Sprint 016 baseline review items and create a safe local repository baseline commit if all gates pass.

## User-Accepted Decisions

- Do not commit `.env.vercel.production` values. Remove the file from Git tracking while preserving the local file, or block if that cannot be done safely.
- Accept deleted `middleware.ts` only after route-safety validation passes.
- Accept deleted root `ORCHESTRATOR*` files only if archived/evidence copies exist and the 120x planning layer is the source of truth.
- Keep `.release-main/`, `.claude/`, and `samples/` out of the baseline unless an individual file is explicitly justified.

## Guardrails

Do not print secret values or fragments.

Do not deploy.

Do not push.

Do not create a PR.

Do not apply remote migrations.

Do not mutate production data.

Do not build new features.

Do not reopen public website/shop surfaces.

Do not stage excluded folders wholesale.

Do not commit if validation fails.

## Required Work

1. Confirm Sprint 017 authorization in `planning/STATE.md`.
2. Capture branch, HEAD, and git status.
3. Compare current status to Sprint 016 inventory.
4. Safely untrack `.env.vercel.production` while preserving the local file and ignoring future additions.
5. Verify root `ORCHESTRATOR*` archive/evidence before accepting deletion.
6. Validate route safety before accepting `middleware.ts` deletion.
7. Exclude `.release-main/`, `.claude/`, and `samples/` unless individually justified.
8. Stage the accepted baseline deliberately.
9. Run full validation.
10. Create one local baseline commit only if all gates pass.
11. Update Sprint 017 closeout docs and planning state.

## Closeout Standard

At close, report whether a local baseline commit was created.

If created, include the commit hash and validation summary.

If not created, include the blocker and exact manual intervention needed.

============================================================
FILE: planning/sprints/017-baseline-commit-approval/BUILDER_START_INSTRUCTIONS.md
============================================================

# Sprint 017 - Builder Start Instructions

You are Builder for Sprint 017 - Baseline Commit Approval.

Start from the approved sprint files, not chat memory.

Read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `docs/REPOSITORY_ALIGNMENT_016.md`
6. `planning/reviews/sprint-016-working-tree-inventory.md`
7. `planning/sprints/017-baseline-commit-approval/requirements.md`
8. `planning/sprints/017-baseline-commit-approval/blueprint.md`
9. `planning/sprints/017-baseline-commit-approval/acceptance.md`
10. `planning/sprints/017-baseline-commit-approval/handoff-prompt.md`

## Start Gate

Check `planning/STATE.md`.

If it does not authorize Sprint 017, stop and report that the pack exists but implementation is not authorized.

## Non-Negotiables

- Do not commit `.env.vercel.production` values.
- Do not delete the local env file from disk.
- Do not accept `middleware.ts` deletion without route-safety validation.
- Do not stage `.release-main/`, `.claude/`, or `samples/` wholesale.
- Do not push, PR, deploy, remote migrate, or mutate production.

## Closeout

Leave `Implementation authorized: no` after closure.
