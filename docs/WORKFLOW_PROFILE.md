# Workflow Profile

The 120x method uses a workflow profile so the process matches the risk of the work.

## fast

Use for single-agent, low-risk, local or internal utilities.

Default behavior:
- One small sprint file is enough: `planning/sprints/###-name/SPRINT.md`.
- Architect may generate a pack when the user, problem, target workflow, and smallest useful outcome are known.
- Secondary unknowns become labeled assumptions or open questions.
- Builder may edit files inside the approved sprint scope when `planning/STATE.md` says `Implementation authorized: yes`.
- Builder stops only for scope changes, secrets, deletes, auth/data-model changes, or files outside the approved set.

## standard

Use for normal Architect/Builder handoff work.

Default behavior:
- Use one sprint file for small work and four sprint files for larger work.
- Keep written scope, acceptance criteria, validation, and handoff durable in the folder.
- Builder follows the approved sprint and asks before expanding scope.

## strict

Use for regulated, multi-user, sensitive, payment, auth, production data, or high-blast-radius work.

Default behavior:
- Use the full four-file sprint set: `requirements.md`, `blueprint.md`, `acceptance.md`, and `handoff-prompt.md`.
- Require explicit approval before implementation unless the sprint authorizes a narrower exception.
- Treat auth, permissions, migrations, data deletion, secrets, billing, and production deployment as stop-and-confirm work.
- Include stronger validation, rollback notes, and permission-boundary checks.
