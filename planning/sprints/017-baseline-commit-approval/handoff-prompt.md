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
