# Workflow Profile

The 120x method uses a workflow profile so the process matches the risk of the work. `standard` is the default for ordinary repository, UI, documentation, local tooling, test, and product-feature work.

## fast

Use for single-agent, low-risk, local or internal utilities.

Default behavior:
- One small sprint file is enough: `planning/sprints/###-name/SPRINT.md`.
- Architect may generate a pack when the user, problem, target workflow, and smallest useful outcome are known.
- Secondary unknowns become labeled assumptions or open questions.
- Architect creates the pack only. Builder applies it and executes from the generated sprint files within their defined scope.
- Builder stops only for scope changes, secrets, deletes, auth/data-model changes, or files outside the approved set.

## standard

Use for normal Architect/Builder handoff work.

Default behavior:
- Use one `SPRINT.md` for normal work. Reserve the four-file sprint set for genuinely strict or high-risk work.
- Keep written scope, acceptance criteria, validation, and handoff durable in the folder.
- Builder follows the approved sprint and asks before expanding scope.
- Target a useful product or delivery outcome rather than one diagnostic step.
- Keep mechanical, formatting, encoding, and deterministic local-validation corrections in the current sprint when they do not change product behavior or cross a strict boundary.
- Create a child sprint only for material scope expansion, a true external blocker, or a substantially different product outcome.
- Keep closeout concise and refer to canonical evidence instead of repeating full project history.

## strict

Use for regulated, multi-user, sensitive, payment, auth, production data, or high-blast-radius work.

Default behavior:
- Use the full four-file sprint set: `requirements.md`, `blueprint.md`, `acceptance.md`, and `handoff-prompt.md`.
- Require explicit approval before implementation unless the sprint authorizes a narrower exception.
- Treat auth, permissions, migrations, data deletion, secrets, billing, and production deployment as stop-and-confirm work.
- Apply strict controls to protected evidence, remote migrations, production data, destructive operations, external publication, and production deployment.
- Include stronger validation, rollback notes, and permission-boundary checks.
