# Sprint 016 - Repository Alignment And Done-State Baseline Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user approved the Architect recommendation on 2026-07-17 to pause new feature work and create Architect Pack 016 for repository alignment and done-state cleanup.

The reason is that Sprint 015 closed a natural local foundation boundary: Sprints 013-015 created the biochemistry data model, scoring service, and recommendation scaffold locally, while the working tree remains very dirty with many modified, deleted, and untracked files. Further feature work would make it harder to tell what is intentional sprint output, stale drift, generated output, abandoned work, or unsafe-to-deploy change.

This sprint exists to bring the repository, planning state, and "done" evidence into a clearer baseline before Sprint 017+ feature work.

## Goal

Create a trustworthy source-controlled baseline for the current project before building trends/history, mobile capture UI, production recommendations, or remote migration work.

Sprint 016 should:

- inventory all modified, deleted, and untracked files
- classify each file/change into a clear disposition
- reconcile planning truth with actual project state after Sprints 001-015
- identify what belongs to completed sprint work and what still needs manual/user decision
- update ignore rules or planning/docs where needed to reduce future confusion
- preserve under-construction/public-safety state
- preserve Sprint 013-015 local biochemistry work
- avoid destructive cleanup unless explicitly allowed by this sprint
- prepare the project for a later clean baseline commit if the user separately authorizes commit work

## Dependency Gate

Sprint 016 may begin only after Sprint 015 is complete locally.

Builder must stop and ask before implementation if any of these are true:

- `planning/STATE.md` does not explicitly authorize Sprint 016 implementation
- Sprint 015 closeout files are missing or contradictory
- the task would require deleting files instead of archiving or documenting them
- the task would require reverting user changes
- the task would require changing auth, permissions, RLS, Stripe, Supabase production, Vercel production, DNS, secrets, or production data
- the task would require pushing, creating a PR, or committing without separate explicit authorization

## Required Starting Evidence

Builder must capture and document:

- current branch
- current commit
- full `git status --short`
- whether files are modified, deleted, untracked, or ignored
- whether any tracked env/config files appear modified
- whether any likely secrets or secret fragments are present in tracked or to-be-tracked text files
- current `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md`
- current `planning/SPRINT_SCHEDULE.md`
- current `.gitignore`

Do not print secret values or fragments. Report only filenames and safe structural status such as `possible secret-like value present in tracked env file`.

## In Scope

Builder may:

- inspect all files in the working tree
- run git inventory commands such as `git status`, `git diff --name-status`, `git ls-files`, and `git check-ignore`
- create repository alignment documentation under `docs/**`
- create inventory or manifest files under `planning/reviews/**` or `references/archive/**`
- update `.gitignore` for generated or local-only artifacts if evidence supports it
- update planning files to reflect Sprint 016 work and the adjusted roadmap
- archive clearly obsolete non-runtime files into a documented archive folder
- keep source code changes only when they are already completed sprint work or are required to preserve current validated behavior
- run local validation after any ignore/planning/archive changes
- identify candidate baseline commit contents for a later user-approved commit

## Out Of Scope

Builder must not:

- build new product features
- implement trends/history charts
- implement mobile capture UI or result UI
- add OCR, voice-to-text, upload storage policies, or recommendation content
- invent production Green/Amber/Red thresholds
- invent Table of Knowledge recommendation advice
- apply remote Supabase migrations
- mutate production data
- deploy to Vercel
- push to remote
- create a pull request
- commit unless separately authorized by the user
- delete files permanently
- run `git reset --hard`, `git checkout --`, or other destructive reversion commands
- revert user changes unless explicitly requested
- expose secret values or fragments
- change Stripe products, prices, checkout, refunds, subscriptions, tax, or customer data
- reopen public website/shop surfaces hidden by Sprint 012F
- normalize code style broadly outside inventory/cleanup needs
- upgrade dependencies or run network installs without approval

## Classification Model

Builder must classify changed/untracked/deleted files into these groups:

- `keep-sprint-work`: intentional work from completed or active sprints that should remain
- `keep-user-work`: user-created or user-modified work outside sprint scope that should be preserved
- `archive-candidate`: stale, duplicate, or obsolete non-runtime material that can be moved to an archive only if low risk
- `ignore-candidate`: generated, cache, local-only, or tool output that should not be tracked
- `manual-review`: ambiguous, runtime-adjacent, secret-adjacent, or high-risk material that needs user/Architect decision
- `blocked`: cannot be safely classified or handled without manual input

Every modified, deleted, and untracked file from `git status --short` must appear in the inventory, either directly or through a clearly named grouped rule with examples.

## Approved File Set

Builder may edit:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/reviews/**`
- `docs/**`
- `.gitignore`
- `references/archive/sprint-016-repository-alignment/**`
- `README.md`, only for narrow repository-state or workflow notes if needed

Builder may inspect but must not edit unless explicitly justified in the inventory and required for repository alignment:

- application source under `app/**`, `components/**`, `lib/**`
- Supabase migrations/bootstrap under `supabase/**`
- scripts under `scripts/**`
- package files
- env example files
- public assets

Builder must stop before editing:

- real secrets or local-only env values
- `.env.vercel.production` or any file containing production environment values, except to document safe structural status without secret values
- deployment configuration that would change production behavior
- auth/RLS/Stripe behavior files
- generated dependency folders or package manager caches

## Required Output

Builder must produce:

- `docs/REPOSITORY_ALIGNMENT_016.md`
- `planning/reviews/sprint-016-working-tree-inventory.md`
- updated `planning/ARCHITECT_BRIEFING.md`
- updated `planning/STATE.md`
- updated `planning/STATUS.json`
- updated `planning/SPRINT_SCHEDULE.md` showing this cleanup sprint completed or active, with trends/history deferred to the next feature sprint
- updates to `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if the inventory discovers durable decisions, active risks, or open questions
- `.gitignore` changes only if evidence supports them
- archive manifest if any files are archived

## Validation

Builder should run validation appropriate to the final touched files:

- always run git inventory commands again at close
- if only planning/docs/gitignore/archive files changed, run lightweight validation and record why full app validation was not required
- if package, source, script, migration, or config files are edited, run the existing validation set used by Sprint 015 where feasible:
  - `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts`
  - `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts`
  - `npm run lint`
  - `npx tsc --noEmit --incremental false`
  - `npm run build` through the known bounded/outside-sandbox path if needed

If validation is blocked, Builder must record exact evidence and manual-intervention steps.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual review is expected for ambiguous runtime-adjacent files, possible secrets, deleted files, and any file whose ownership cannot be safely inferred.
