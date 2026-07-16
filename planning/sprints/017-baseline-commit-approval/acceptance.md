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
