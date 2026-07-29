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

## Architect / Builder Handoff

Architect creates the pack only and then stops. Builder applies the pack, verifies the generated sprint files, and executes within sprint scope. Builder stops for scope expansion, secrets, destructive actions, and external or production actions not expressly included.

Builder follows the hard Evidence-Proportional Execution Standard in `AGENTS.md`:

- stop only for a material target, authority, security, privacy, migration, destructive, integrity, production, or cleanup risk;
- use equivalent or stronger safe proof when a preferred supporting tool is unavailable;
- prefer governed end-to-end runtime evidence over redundant metadata checks covering the same contract;
- keep tooling, harness, credential, validator, formatting, encoding, reporter, and deterministic local corrections in the current sprint when product/security scope is unchanged;
- do not create a follow-up sprint solely for Docker, browser, renderer, clipboard, optional CLI, schema-dump, or other supporting-tool limitations; and
- use manual intervention only after safe alternatives are exhausted.

A new sprint is required only for a material source/schema/contract change outside approved scope, a genuinely different outcome, or an external action lacking authority.

## Architect Pack System

Architect Packs live in `planning/architect-packs/`.

All pack commands and delimiter rules live in `planning/architect-packs/README.md`.

After a pack is applied, Builder implements from `planning/sprints/`, not from the pack file.

## Sprint Close

Builder refreshes `planning/ARCHITECT_BRIEFING.md` using `docs/ARCHITECT_BRIEFING_SPEC.md` and updates `planning/STATUS.json`.
