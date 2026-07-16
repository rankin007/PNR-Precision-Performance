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
