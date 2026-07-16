# Sprint 014 - Biochemistry Scoring Service And Fixtures Blueprint

## Execution Shape

Sprint 014 is a scoring foundation sprint. It should not build UI and should not touch production systems.

Run the work in this order:

1. Confirm current branch, commit, and dirty status.
2. Read Sprint 014 requirements, acceptance, handoff, current state, Architect briefing, Definition of Done, Sprint 013 closeout docs, and Sprint 013 migration/types/docs.
3. Verify Sprint 013 produced enough source-controlled evidence for exact lookup and score snapshots.
4. Inspect the preserved Reading Tables CSV and the Sprint 013 lookup representation.
5. Design a narrow TypeScript scoring API.
6. Implement scoring helpers and result types if prerequisites are available.
7. Add fixture-backed examples or local assertions.
8. Document scoring behavior and blocked/unscored states.
9. Run local validation.
10. Update planning/status/briefing and stop before UI, remote migration, deployment, push, PR, or public relaunch work.

## Recommended Scoring API Shape

Follow existing project patterns if Sprint 013 created a different local convention. If no convention exists, use a small domain module such as:

- `lib/domain/biochemistry.ts`
- or `lib/domain/biochemistry/scoring.ts`

Recommended input shape:

- `carbsReading`
- `phSaliva`
- `phUrine`
- `conductivityRawMeterReading`
- `ureaReading`
- optional metadata such as lookup source/version or formula version

Recommended derived values:

- `phAverage`
- `conductivityC`
- `carbsLoss`
- `phAverageLoss`
- `saltsLoss`
- `ureaLoss`
- `hydrationScoreEnergyLoss`
- `hydrationScore`
- `healthScoreEnergyLoss`
- `healthScore`

Recommended result state:

- `status: "scored"` when every exact lookup exists
- `status: "blocked"` or equivalent when one or more exact lookup values are missing
- non-sensitive blocked reasons listing the missing lookup type and reading value

## Exact Lookup Rules

Do not use fuzzy matching.

Accepted lookup behavior:

- exact lookup type plus exact normalized reading value resolves to one loss value
- exact source value should be preserved or represented consistently with Sprint 013 storage
- if lookup values are percentages, document whether the system stores `0.96` or `96.00` and keep formulas consistent

Forbidden lookup behavior:

- nearest match
- next lower
- next higher
- interpolation
- rounding as a substitute for exact lookup
- default loss values

If numeric representation requires normalization, document it clearly. For example, if CSV values are `14.30` and computed conductivity is `14.3`, the code may normalize equivalent decimal formatting only if that is documented as representation normalization, not domain rounding.

## Formula Versioning

Define a formula version string or constant, for example `biochemistry-score-v1`.

The score output should include enough data for a database snapshot:

- formula version
- lookup source/version if available
- raw readings
- derived readings
- lookup losses
- computed scores
- status and blocked reasons if unscored

## Fixture Strategy

Use fixtures to prove the formulas behave as expected.

At minimum, fixtures should cover:

- a fully scored test where all exact lookups exist
- a missing Carbs lookup
- a missing pH Average lookup
- a missing Salts lookup after C conversion
- a missing Urea lookup
- conductivity conversion from raw meter reading to converted C value
- pH Average calculation

If actual fixture values cannot be selected because Sprint 013 did not preserve table data or because the CSV structure is ambiguous, stop and document the blocker.

## Documentation

Create `docs/BIOCHEMISTRY_SCORING_014.md` with:

- source inputs used
- formula version
- exact lookup behavior
- numeric representation rules
- conductivity conversion
- pH Average calculation
- score formulas
- blocked/unscored states
- fixture summary
- validation results
- manual-intervention instructions for remaining blocked items

## Validation

Required checks:

- `git status --short`
- scoring fixture/script check if one is added
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox build fails for known process-spawn or Next startup reasons, request outside-sandbox bounded validation and record both outcomes.

## Stop Conditions

Stop and ask before:

- starting if Sprint 013 scoring prerequisites are incomplete
- changing schema/migrations beyond documentation of a blocker
- applying remote Supabase migrations
- changing production data
- deploying
- pushing or creating a PR
- reopening public shop/website
- adding UI
- adding uploads/storage behavior
- adding recommendations/Table of Knowledge content
- changing Stripe, DNS, Vercel, Supabase, or customer data
- inventing lookup or formula behavior not supplied by the user
