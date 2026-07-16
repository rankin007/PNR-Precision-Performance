============================================================
FILE: planning/sprints/016-repository-alignment-and-done-state-baseline/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/016-repository-alignment-and-done-state-baseline/blueprint.md
============================================================

# Sprint 016 - Repository Alignment And Done-State Baseline Blueprint

## Intent

Sprint 016 is a repository hygiene and planning-truth sprint. It is not a product feature sprint.

The project currently has valuable completed local foundation work, but the working tree is too ambiguous for confident forward development. Builder should create a disciplined inventory, align durable planning files, and make only low-risk cleanup changes.

## Execution Plan

1. Read the required files:
   - `templates/method/120x-agent-identity.md`
   - `AGENTS.md`
   - `planning/STATE.md`
   - `planning/ARCHITECT_BRIEFING.md`
   - `planning/DEFINITION_OF_DONE.md`
   - Sprint 016 requirements, blueprint, acceptance, and handoff
   - Sprint 012E, 012F, 013, 014, and 015 closeout docs
2. Confirm `planning/STATE.md` authorizes Sprint 016 implementation.
3. Capture branch, commit, and complete working-tree status.
4. Build a working-tree inventory grouped by file status and disposition.
5. Review `.gitignore` and ignored/untracked artifacts.
6. Review tracked environment/config files for safe status only; do not expose values.
7. Reconcile sprint schedule and planning truth with the actual state after Sprint 015.
8. Apply low-risk documentation/planning/gitignore/archive changes.
9. Stop and record manual-review items for ambiguous or high-risk files.
10. Run validation appropriate to the files changed.
11. Close with a clear baseline recommendation: what can be committed later, what remains manual-review, and what sprint should follow.

## Inventory Guidance

Use git-native evidence where possible:

- `git status --short`
- `git diff --name-status`
- `git diff --stat`
- `git ls-files --others --exclude-standard`
- `git ls-files --deleted`
- `git check-ignore -v <path>` for suspicious generated/local artifacts

Do not rely on memory or prior chat. The inventory must be source-backed.

## Disposition Guidance

Classify all dirty files using the required model:

- `keep-sprint-work`
- `keep-user-work`
- `archive-candidate`
- `ignore-candidate`
- `manual-review`
- `blocked`

Prefer `manual-review` when a file is runtime-adjacent or its ownership is unclear.

Prefer `ignore-candidate` for generated folders, caches, local exports, logs, and tool output when `.gitignore` can safely prevent recurrence.

Prefer archive over delete for stale handoff/export/source-reference clutter. Do not archive runtime files, code, migrations, active docs, or public assets unless the sprint evidence is overwhelming and the file is clearly non-runtime.

## Safe Cleanup Rules

Builder may make low-risk cleanup changes only after the inventory supports them.

Allowed examples:

- documenting dirty tree classifications
- adding targeted ignore patterns for generated output
- moving obsolete non-runtime duplicate docs into `references/archive/sprint-016-repository-alignment/`
- updating planning status and roadmap order

Not allowed:

- deleting files
- reverting changes
- changing production behavior
- changing app/source behavior merely to reduce git noise
- resolving package-lock drift without a clear sprint-owned reason
- hiding unclear files by adding broad ignore patterns

## Environment And Secret Safety

Environment files are high risk.

Builder must:

- report only safe metadata such as file name, tracked/untracked status, and whether it appears modified
- not print values, prefixes, suffixes, tokens, URLs with credentials, or decoded credential material
- stop before editing real env files or production env snapshots
- recommend manual action if secrets may be tracked

## Done-State Reconciliation

Builder should compare durable planning claims against the repository:

- Sprints 001-015 are listed correctly
- Sprint 012F public gate remains documented as active
- Sprints 013-015 are documented as local-only
- remote Supabase migration remains unapplied
- production thresholds remain unsupplied
- production Table of Knowledge content remains unsupplied
- live Supabase/RLS/Stripe smoke blockers remain tracked
- current next feature sprint is not treated as authorized until a later pack

If any claim cannot be proven locally, mark it as manual-review rather than rewriting history.

## Expected Documentation Shape

`docs/REPOSITORY_ALIGNMENT_016.md` should include:

- status summary
- why the sprint ran now
- branch/commit captured
- inventory summary counts
- disposition table by category
- changes made
- changes deliberately not made
- validation results
- manual intervention items
- recommendation for baseline commit or next sprint

`planning/reviews/sprint-016-working-tree-inventory.md` should include:

- raw git status summary
- file-by-file or grouped inventory
- classification and rationale
- owner/sprint inference where known
- manual-review list
- archive/ignore recommendations

## Closeout Planning

At close, `planning/STATE.md` should say:

- Sprint 016 complete locally if all acceptance criteria pass, or partial/blocked if they do not
- `Implementation authorized: no`
- no further cleanup, feature, deployment, migration, commit, push, or PR work is authorized without a new sprint or explicit user instruction

The schedule should show trends/history deferred after this alignment sprint unless the user reprioritizes mobile capture/results UI.

============================================================
FILE: planning/sprints/016-repository-alignment-and-done-state-baseline/acceptance.md
============================================================

# Sprint 016 - Repository Alignment And Done-State Baseline Acceptance

## Required Acceptance Criteria

- `planning/STATE.md` says Sprint 016 implementation is authorized before Builder edits files.
- Builder reads the Sprint 016 four-file sprint set before implementation.
- Builder captures current branch and commit.
- Builder captures full working-tree status.
- Every modified, deleted, and untracked file from `git status --short` is represented in the inventory directly or through a clear grouped rule.
- Each dirty item receives one of the required classifications:
  - `keep-sprint-work`
  - `keep-user-work`
  - `archive-candidate`
  - `ignore-candidate`
  - `manual-review`
  - `blocked`
- Possible secret/env files are handled without exposing values or fragments.
- No files are deleted.
- No user changes are reverted.
- No production behavior is intentionally changed.
- No auth, RLS, Stripe, deployment, DNS, remote Supabase, or production data changes are made.
- Public under-construction/shop-blocking state remains preserved.
- Sprint 013-015 local biochemistry work remains preserved.
- `.gitignore` is changed only for evidence-backed generated/local-only artifacts.
- Any archived files are non-runtime and have a manifest.
- `docs/REPOSITORY_ALIGNMENT_016.md` is created.
- `planning/reviews/sprint-016-working-tree-inventory.md` is created.
- Planning files are updated to reflect Sprint 016 status and next-step recommendations.
- Validation is run and recorded, or blocked with exact manual-intervention evidence.
- Builder stops before commit, push, PR, deployment, remote migration, or production mutation unless separately authorized.

## Inventory Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Modified tracked source file | Classified with rationale; not reverted unless separately authorized. |
| Deleted tracked file | Classified as manual-review or archive/obsolete candidate; not removed from git history by destructive command. |
| Untracked sprint artifact | Classified as keep-sprint-work if supported by sprint evidence. |
| Generated/cache/local output | Classified as ignore-candidate with targeted ignore recommendation. |
| Runtime-adjacent ambiguous file | Classified as manual-review. |
| Env/config file | Safe metadata only; no value exposure. |
| Possible secret-bearing file | Stop and record manual intervention; do not print or copy secret material. |

## Cleanup Acceptance Matrix

| Action | Expected acceptance |
|---|---|
| Documentation/planning update | Allowed if it improves source-of-truth accuracy. |
| `.gitignore` update | Allowed only for narrow generated/local-only patterns. |
| Archive move | Allowed only for clearly non-runtime files with manifest. |
| Permanent delete | Not allowed. |
| Revert | Not allowed without explicit user request. |
| Feature implementation | Not allowed. |
| Commit/push/PR | Not allowed unless separately authorized. |

## Validation Acceptance

If Builder changes only planning/docs/gitignore/archive files:

- record final `git status --short`
- run any available pack/status formatting checks if applicable
- explain why full app validation was not required

If Builder changes application source, package files, scripts, migrations, or runtime config:

- run focused domain validators when available
- run lint
- run TypeScript
- run build through the known bounded path if source/runtime behavior changed
- document sandbox limitations separately from successful outside-sandbox validation

## Manual Intervention Record

Manual intervention entries must include:

- blocked item
- evidence checked
- exact action needed from user/operator
- step-by-step action instructions
- Builder verification after completion

Expected manual-review topics include:

- production/env files
- ambiguous deleted tracked files
- runtime-adjacent dirty files whose sprint ownership is unclear
- whether and when to make a baseline commit
- whether Sprint 017 should be trends/history or mobile capture/results UI
- whether remote Supabase migration should proceed later

============================================================
FILE: planning/sprints/016-repository-alignment-and-done-state-baseline/handoff-prompt.md
============================================================

# Sprint 016 - Builder Handoff Prompt

You are Builder for Sprint 016 - Repository Alignment And Done-State Baseline in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/DEFINITION_OF_DONE.md`
6. `planning/sprints/016-repository-alignment-and-done-state-baseline/requirements.md`
7. `planning/sprints/016-repository-alignment-and-done-state-baseline/blueprint.md`
8. `planning/sprints/016-repository-alignment-and-done-state-baseline/acceptance.md`
9. Sprint 012E, 012F, 013, 014, and 015 closeout docs

## Mission

Bring the repository, planning state, and done-state evidence into a cleaner baseline before new feature work.

This is an inventory, alignment, documentation, and low-risk cleanup sprint. It is not a trends/history sprint and not a product feature sprint.

## First Gate

Before editing files, confirm `planning/STATE.md` explicitly authorizes Sprint 016 implementation.

If it does not, stop and report that Architect Pack 016 exists but implementation is not authorized.

## Guardrails

Do not delete files.

Do not revert user changes.

Do not build new features.

Do not change auth, RLS, Stripe, Supabase production, Vercel production, DNS, or production data.

Do not deploy.

Do not apply remote migrations.

Do not push, create a PR, or commit unless separately authorized.

Do not expose secret values or fragments.

Do not reopen public website/shop surfaces.

Do not invent production thresholds or Table of Knowledge content.

## Required Work

1. Record current branch, commit, and full dirty status.
2. Inventory all modified, deleted, and untracked files.
3. Classify each item as `keep-sprint-work`, `keep-user-work`, `archive-candidate`, `ignore-candidate`, `manual-review`, or `blocked`.
4. Create `planning/reviews/sprint-016-working-tree-inventory.md`.
5. Create `docs/REPOSITORY_ALIGNMENT_016.md`.
6. Apply only evidence-backed low-risk planning/docs/gitignore/archive changes.
7. Update planning state, status, schedule, and Architect briefing.
8. Run validation appropriate to the files touched.
9. Stop with a clear recommendation for commit/baseline and the next feature sprint.

## Closeout Standard

At close, the next Architect should know:

- exactly what the dirty tree contains
- which changes are intentional sprint work
- which changes are user work to preserve
- which artifacts should be ignored
- which stale non-runtime files were archived, if any
- which items still need manual review
- whether the project is ready for a user-approved baseline commit
- whether Sprint 017 should resume trends/history or shift to mobile capture/results UI

============================================================
FILE: planning/sprints/016-repository-alignment-and-done-state-baseline/BUILDER_START_INSTRUCTIONS.md
============================================================

# Sprint 016 - Builder Start Instructions

You are Builder for Sprint 016 - Repository Alignment And Done-State Baseline.

Start from the approved sprint files, not chat memory:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/DEFINITION_OF_DONE.md`
6. `planning/sprints/016-repository-alignment-and-done-state-baseline/requirements.md`
7. `planning/sprints/016-repository-alignment-and-done-state-baseline/blueprint.md`
8. `planning/sprints/016-repository-alignment-and-done-state-baseline/acceptance.md`
9. `planning/sprints/016-repository-alignment-and-done-state-baseline/handoff-prompt.md`

## Start Gate

Check `planning/STATE.md`.

If it does not say Sprint 016 implementation is authorized, stop.

If authorized, proceed with inventory first. Do not clean first and explain later.

## Build Scope

Create a complete working-tree inventory and align planning/docs around the real repository state. Make only low-risk cleanup changes that preserve user work and sprint work.

## Stop Conditions

Stop before:

- deleting files
- reverting changes
- editing env secret files
- changing production behavior
- changing auth/RLS/Stripe/deployment behavior
- applying remote migrations
- deploying
- committing
- pushing
- creating a PR
- building feature work

## Closeout

Close by updating the planning files and recording validation. Leave `Implementation authorized: no` after the sprint is closed.
