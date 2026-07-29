# Architect Packs

Save Architect Pack files in this folder.

Recommended core-sprint file name pattern:

`architect-pack-###-{sprint-name}.md`

Required follow-up pattern:

`architect-pack-###B-{follow-up-name}.md`, then `###C`, `###D`, and so on.

Follow-up sprints keep the core number and start at suffix `B`. Apply the same identifier to the sprint folder and all state/status references. Historical `A` identifiers remain unchanged; do not create new `A` follow-ups.

## Commands

Run commands from the project root.

Validate pack formatting only:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md --check`

Dry-run a pack before applying it:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md --dry-run`

Show changed content during dry-run:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md --dry-run --diff`

Dry-run and apply in one command:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md --dry-run --yes`

Apply and back up overwritten files:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md --backup`

Apply directly:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-###-{sprint-name}.md`

## Pack Format

Use this delimiter format. Separator lines must be exactly 60 equals signs.

```text
============================================================
FILE: planning/sprints/001-example/SPRINT.md
============================================================

[file content]
```

## Rules

- Architect creates the pack only and then stops. Builder applies the pack, verifies the generated sprint files, and executes them. Delivery of the created pack is the role handoff.
- Do not add a separate Builder execution flag, approval field, state toggle, checklist gate, or reset step.

- Do not store secrets, API keys, passwords, tokens, or private credentials in Architect Packs.
- After a pack is applied, Builder implements from generated sprint files under `planning/sprints/`, not from the Architect Pack itself.
- For small sprints, prefer one `SPRINT.md` file.
- For larger or strict work, use `requirements.md`, `blueprint.md`, `acceptance.md`, and `handoff-prompt.md`.
- Every Pack must carry the Evidence-Proportional Execution Standard from `AGENTS.md` into its generated Builder sprint files. At minimum, requirements or handoff must state that Builder:
  - stops only for material target, authority, security, privacy, migration, destructive, integrity, production, scope, or cleanup risk;
  - substitutes equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
  - keeps in-scope tooling, harness, credential, validator, formatting, encoding, reporter, and deterministic corrections in the current sprint;
  - does not create a follow-up sprint solely for Docker, browser automation, renderers, clipboard control, schema dumps, optional CLI paths, or redundant verification; and
  - uses manual intervention only after safe in-scope alternatives are exhausted.
- Pack acceptance criteria must not make one particular tool mandatory when the acceptance fact can be proven safely by an equivalent or stronger method.
- A follow-up sprint is appropriate only for a material source/schema/contract change outside current scope, a genuinely different outcome, or an external action lacking authority.
