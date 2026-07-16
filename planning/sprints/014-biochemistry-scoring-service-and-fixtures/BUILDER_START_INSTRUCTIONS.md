# Sprint 014 - Builder Start Instructions

You are Builder for Sprint 014 - Biochemistry Scoring Service And Fixtures.

Start from the approved sprint files, not from chat memory:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/requirements.md`
5. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/blueprint.md`
6. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/acceptance.md`
7. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/handoff-prompt.md`
8. `planning/ARCHITECT_BRIEFING.md`
9. `planning/DEFINITION_OF_DONE.md`
10. Sprint 013 closeout docs and lookup evidence

## First Action

Confirm the current branch, commit, and dirty status. Do not revert unrelated changes.

Then verify Sprint 013 prerequisites:

- preserved Reading Tables source exists
- exact lookup values for Carbs, pH Average, Salts, and Urea are available
- formulas are documented
- score snapshot fields are documented

If these are missing, stop and document the blocker. Do not guess lookup values or formulas.

## Build Scope

Create the local scoring foundation for:

- exact reading-to-loss lookups
- pH Average
- raw conductivity to converted C using multiplier `1.43`
- Hydration Score Energy Loss
- Hydration Score
- Health Score Energy Loss
- Health Score
- blocked/unscored states for missing exact lookups
- formula version and score snapshot contract
- fixture-backed scoring examples or validation

## Non-Negotiables

- Do not use `calibrated` wording for pH.
- Do not invent lookup fallback behavior. Exact match only.
- Do not invent formulas.
- Do not build UI.
- Do not apply remote Supabase migrations.
- Do not deploy.
- Do not push or create a PR.
- Do not reopen the public shop or website.
- Do not copy the old website wholesale.
- Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

## Required Docs

Create:

- `docs/BIOCHEMISTRY_SCORING_014.md`

Document:

- source lookup evidence
- formula version
- exact lookup policy
- numeric representation
- pH Average
- conductivity conversion
- score formulas
- blocked/unscored states
- fixture summary
- validation results
- manual-intervention instructions for blockers

## Validation

Run and record:

- scoring fixture/script check if one is added
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox build fails for known sandbox reasons, request approved outside-sandbox bounded validation and record both outcomes.

## Closeout

At close, update:

- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- relevant decisions/risks/questions if new evidence appears

Final status must be one of:

- complete
- partial with documented blockers
- blocked with manual intervention instructions
