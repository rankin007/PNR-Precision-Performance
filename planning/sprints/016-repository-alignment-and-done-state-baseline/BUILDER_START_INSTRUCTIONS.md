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
