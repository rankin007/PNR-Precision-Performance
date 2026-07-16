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
