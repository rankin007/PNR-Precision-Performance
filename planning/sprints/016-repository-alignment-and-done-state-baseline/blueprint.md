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
