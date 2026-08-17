# Workflow Profile

The 120x method matches process to risk. `standard` is the default for ordinary repository, UI, documentation, local tooling, test and product-feature work. All profiles follow the Evidence-Proportional Execution Standard in `AGENTS.md`.

## Delivery controls

- One sprint delivers one user-visible or operationally necessary outcome.
- Do not create a new Architect Pack while the current sprint remains open.
- Ordinary product work uses one `SPRINT.md`; reserve four-file Packs for genuinely strict or high-risk boundaries.
- Keep deterministic tooling, validator, formatting, encoding and evidence corrections inside the active sprint when product scope is unchanged.
- Use a follow-up suffix only for a material out-of-scope source, schema or contract change, a genuinely different outcome, or an external action without authority.
- Closeout links to durable evidence instead of repeating the full project history.
- Every second product sprint includes trainer-visible testing. Measure progress through accepted user journeys, not pack or document count.
- Attach strict controls to the risky boundary, not automatically to the whole feature.
- Voice, OCR, transactional commerce, sophisticated saved views and broad public enhancements remain deferred until explicitly promoted.

## fast

Use for single-agent, low-risk local or internal utilities.

- One small `planning/sprints/###-name/SPRINT.md` is enough.
- Builder stops for scope expansion, secrets, destructive uncertainty, auth/data-model changes or files outside the approved set.

## standard

Use for normal Architect/Builder handoff work.

- Use one `SPRINT.md` with durable scope, acceptance, validation and handoff.
- Target a useful product or delivery outcome, not one diagnostic step.
- Substitute equivalent or stronger safe proof when a supporting tool is unavailable.
- Keep closeout concise and refer to canonical evidence.

## strict

Use for regulated, multi-user, sensitive, payment, auth, migration, production-data or high-blast-radius boundaries.

- Use `requirements.md`, `blueprint.md`, `acceptance.md` and `handoff-prompt.md` when the whole sprint genuinely needs strict treatment.
- Apply stronger permission, rollback and integrity checks to protected evidence, remote migrations, production data, destructive operations, external publication and deployment.
- Stop for material security, privacy, target, migration, destructive, production, integrity or cleanup risk—not ceremony or an unavailable optional tool.
- Keep diagnosis, in-scope correction, revalidation and proof in the current sprint unless the correction materially changes approved behavior or needs new external authority.
- Use manual intervention only after safe in-scope alternatives and substitute evidence are exhausted.
