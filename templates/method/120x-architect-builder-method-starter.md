# 120x Architect / Builder Method Starter

This method has two roles:

- Architect plans the work.
- Builder executes approved sprint scope.

The folder is the durable handoff. Conversation is for thinking; files are for state.

## Canonical Files

- Agent rules: `AGENTS.md`
- Workflow profiles: `docs/WORKFLOW_PROFILE.md`
- Current status: `planning/STATE.md`
- Pack commands: `planning/architect-packs/README.md`
- Sprint files: `planning/sprints/`
- Sprint-close briefing: `planning/ARCHITECT_BRIEFING.md`

## Workflow Profiles

Choose a profile before planning the sprint:

- `fast`: single-agent, low-risk, local/internal utility.
- `standard`: normal Architect/Builder handoff.
- `strict`: regulated, multi-user, sensitive data, auth, payments, or high-blast-radius work.

## Discovery Gate

Architect may generate a pack when these are known:

1. user
2. problem
3. target workflow
4. smallest useful outcome

Secondary unknowns become assumptions or open questions. They do not block the pack by themselves.

## Sprint Shape

For small sprints, use one file:

`planning/sprints/###-name/SPRINT.md`

Sections:

- Goal
- Scope
- Out of Scope
- Files
- Acceptance
- Validation
- Handoff

For larger or strict work, use:

- `requirements.md`
- `blueprint.md`
- `acceptance.md`
- `handoff-prompt.md`

## Builder Authorization

Use the single authorization rule in `AGENTS.md`.

If `planning/STATE.md` says `Implementation authorized: yes`, Builder may edit files inside the approved sprint scope without another approval.

Builder stops only for scope changes, secrets, deletes, auth/data-model/billing changes, or files outside the approved set.

## Architect Pack System

Architect Packs live in `planning/architect-packs/`.

All pack commands and delimiter rules live in `planning/architect-packs/README.md`.

After a pack is applied, Builder implements from `planning/sprints/`, not from the pack file.

## Sprint Close

Builder refreshes `planning/ARCHITECT_BRIEFING.md` using `docs/ARCHITECT_BRIEFING_SPEC.md` and updates `planning/STATUS.json`.
