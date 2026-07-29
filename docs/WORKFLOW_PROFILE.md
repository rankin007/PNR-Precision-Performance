# Workflow Profile

The 120x method uses a workflow profile so the process matches the risk of the work. `standard` is the default for ordinary repository, UI, documentation, local tooling, test, and product-feature work.

All profiles follow the hard Evidence-Proportional Execution Standard in `AGENTS.md`. Workflow rigor changes the strength of safety boundaries and evidence required; it does not require redundant gates or stopping merely because a preferred supporting tool is unavailable.

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
- Substitute equivalent or stronger safe proof when a supporting tool is unavailable, and keep the substitution inside the current sprint when scope and risk boundaries are unchanged.
- Do not open a follow-up sprint for a tooling limitation, credential refresh, deterministic harness correction, or redundant verification step.

## strict

Use for regulated, multi-user, sensitive, payment, auth, production data, or high-blast-radius work.

Default behavior:
- Use the full four-file sprint set: `requirements.md`, `blueprint.md`, `acceptance.md`, and `handoff-prompt.md`.
- Require explicit approval before implementation unless the sprint authorizes a narrower exception.
- Treat auth, permissions, migrations, data deletion, secrets, billing, and production deployment as stop-and-confirm work.
- Apply strict controls to protected evidence, remote migrations, production data, destructive operations, external publication, and production deployment.
- Include stronger validation, rollback notes, and permission-boundary checks.
- Stop for material security, privacy, target, migration, destructive, production, integrity, or cleanup risk—not for ceremony or an unavailable optional tool.
- Use equivalent or stronger evidence when it preserves the same strict boundary. A successful governed runtime result may supersede a redundant metadata check when it proves the same contract end to end.
- Keep diagnosis, in-scope correction, revalidation, and proof in the current sprint unless the correction materially changes approved source/schema behavior or requires new external authority.
- Manual intervention is required only after safe in-scope alternatives and substitute evidence are exhausted.
