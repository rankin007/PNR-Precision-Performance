# Sprint 015 - Builder Start Instructions

You are Builder for Sprint 015 - Scoring And Recommendation Engine.

Start from the approved sprint files, not from chat memory:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/015-scoring-and-recommendation-engine/requirements.md`
5. `planning/sprints/015-scoring-and-recommendation-engine/blueprint.md`
6. `planning/sprints/015-scoring-and-recommendation-engine/acceptance.md`
7. `planning/sprints/015-scoring-and-recommendation-engine/handoff-prompt.md`
8. `planning/ARCHITECT_BRIEFING.md`
9. `planning/DEFINITION_OF_DONE.md`
10. Sprint 013/014 closeout docs and scoring evidence

## First Action

Confirm the current branch, commit, and dirty status. Do not revert unrelated changes.

Then verify Sprint 014 prerequisites:

- exact scoring service exists
- scored/blocked result shape exists
- blocked exact lookup behavior exists
- score snapshot fields are documented
- Sprint 013 schema/source evidence exists

If these are missing, stop and document the blocker. Do not guess thresholds or recommendation content.

## Build Scope

Create the local foundation for:

- Hydration Score and Health Score zone representation
- supplied-threshold classification
- missing-threshold blocked/unclassified states
- Table of Knowledge category/rule scaffold
- active/draft/inactive recommendation rule handling
- recommendation snapshot contract
- missing-content blocked/unavailable states
- fixture-backed examples or validation

## Non-Negotiables

- Do not invent Green/Amber/Red thresholds.
- Do not invent recommendation advice.
- Do not change Sprint 014 formulas or lookup behavior.
- Do not build UI.
- Do not apply remote Supabase migrations.
- Do not deploy.
- Do not push or create a PR.
- Do not reopen the public shop or website.
- Do not copy the old website wholesale.
- Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

## Required Docs

Create:

- `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`

Document:

- source evidence
- relationship to Sprint 014 scoring
- threshold representation
- missing-threshold behavior
- recommendation scaffold
- active/draft/inactive rule behavior
- no-content blocked state
- snapshot contract
- fixture summary
- validation results
- manual-intervention instructions for missing thresholds/content/remote migration

## Validation

Run and record:

- recommendation/zone fixture/script check if one is added
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
