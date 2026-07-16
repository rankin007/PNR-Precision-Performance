# Architect Packs

Save Architect Pack files in this folder.

Recommended file name pattern:

`architect-pack-###-{sprint-name}.md`

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

- Do not store secrets, API keys, passwords, tokens, or private credentials in Architect Packs.
- After a pack is applied, Builder implements from generated sprint files under `planning/sprints/`, not from the Architect Pack itself.
- For small sprints, prefer one `SPRINT.md` file.
- For larger or strict work, use `requirements.md`, `blueprint.md`, `acceptance.md`, and `handoff-prompt.md`.
