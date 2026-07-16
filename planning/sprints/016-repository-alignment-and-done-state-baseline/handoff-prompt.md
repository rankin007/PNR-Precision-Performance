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
