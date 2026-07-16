============================================================
FILE: planning/sprints/014-biochemistry-scoring-service-and-fixtures/requirements.md
============================================================

# Sprint 014 - Biochemistry Scoring Service And Fixtures Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## Dependency Gate

Sprint 014 must not begin until Sprint 013 - Biochemistry Test Data Model is complete or explicitly closed as complete enough for scoring work.

Builder must stop and ask before implementation if any of these are true:

- Sprint 013 did not preserve/read the supplied Reading Tables CSV
- Sprint 013 did not create or document the biochemistry test/lookup data model
- Sprint 013 did not document where exact lookup values live
- Sprint 013 did not document score snapshot fields or formula version expectations
- Sprint 013 closed with blockers that directly affect exact lookup or scoring behavior

## User Authorization Context

The user locked the expanded Sprint 014-030 roadmap on 2026-07-16 and clarified the legacy website continuity rule:

Do not reuse the old website wholesale. Future public/product UI must stay on the new architecture, structure, access model, and design system. Builders may selectively harvest previous-site wording, color scheme, graphics, and images where continuity is useful and the material remains accurate.

This sprint is not a public website sprint and must not change public pages, colors, images, or shop behavior.

## Goal

Create the server-side scoring and exact lookup foundation for biochemistry tests before the mobile capture UI is built.

Sprint 014 should implement or document a local scoring service that can:

- accept a complete set of readings for one horse/test
- convert raw conductivity meter values to `C`
- calculate pH Average
- resolve exact reading-to-loss values for Carbs, pH Average, Salts, and Urea
- calculate Hydration Score and Health Score from approved formulas
- return a blocked/unscored state when exact lookup values are missing
- produce auditable score snapshot output compatible with the Sprint 013 data model
- provide fixture-backed validation using the preserved Reading Tables source

No remote production migration is authorized in Sprint 014.

## Approved Domain Rules

Builder must use these rules exactly:

- Do not use the concept or wording of `calibrated` for pH.
- A test belongs to a horse and date; all readings go together to form one test.
- Client-entered readings include Carbs, pH Saliva, pH Urine, Salts/conductivity, and Urea.
- `pH Average = (pH Saliva + pH Urine) / 2`.
- Conductivity/salts raw meter value converts to C using `converted C = raw meter value * 1.43`.
- Conductivity/salts display uses the converted C value with a `C` suffix.
- Salts lookup uses the converted C value.
- Lookup values are exact. The exact reading maps to the adjacent energy-loss value in the lookup table.
- The energy-loss value, not the raw reading, is used in formulas.
- `Hydration Score Energy Loss = (Carbs Loss + Salts Loss) / 2`.
- `Hydration Score = 1 - Hydration Score Energy Loss`.
- `Health Score Energy Loss = (Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`.
- `Health Score = 1 - Health Score Energy Loss`.
- Do not invent rounding, interpolation, nearest-match, next-lower, or fallback lookup behavior.
- If any exact lookup is missing, the scoring result must be blocked/unscored with a clear non-sensitive reason.

## Expected Source Inputs

Builder should use the Sprint 013-preserved source table and documentation.

Expected references after Sprint 013:

- `references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv`, or documented equivalent source path
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- Sprint 013 migration(s) under `supabase/migrations/**`
- any Sprint 013 domain/types files created under `lib/domain/**` or `types/**`

If these files do not exist or do not contain enough information for exact scoring, Builder must stop and record a manual-intervention blocker rather than guessing.

## In Scope

Builder may:

- inspect Sprint 013 migrations/docs/types and the preserved Reading Tables CSV
- create a local TypeScript scoring module under `lib/domain/**`
- create local domain types under `lib/domain/**` or `types/**`
- create fixture data under `references/fixtures/**`, `docs/**`, or another source-controlled non-runtime location if consistent with the project
- add a small local validation script under `scripts/**` only if needed and if it does not require network access or secrets
- add source-controlled scoring examples or fixture assertions
- document exact lookup behavior, conversion behavior, formula versioning, blocked/unscored states, and snapshot output
- update planning docs and Architect briefing
- run local validation

## Out Of Scope

Builder must not:

- apply migrations to remote Supabase
- mutate production data
- deploy to Vercel
- push to remote
- create a pull request
- reopen the public website/shop hidden by Sprint 012F
- change public page coloring, images, copy, or layout
- copy the old website wholesale
- add mobile capture UI
- add upload UI or storage policies beyond reading Sprint 013 docs if already present
- add OCR/photo extraction
- add voice-to-text provider integration
- add trend charts
- add Table of Knowledge recommendation content
- create live Stripe products, prices, subscriptions, charges, refunds, payouts, or tax changes
- change DNS, Vercel settings, Supabase settings, Stripe settings, or customer data
- expose secret values or secret fragments

## Approved File Set

Builder may edit:

- `lib/domain/**`, for biochemistry scoring/types only
- `types/**`, if present or needed for scoring/domain types
- `docs/BIOCHEMISTRY_SCORING_014.md`
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`, only if Sprint 014 discovers a small documentation correction needed for scoring clarity
- `references/fixtures/**`, if creating source-controlled scoring fixtures
- `scripts/**`, only for a narrow local scoring fixture validation script if needed
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Inspection-only unless separately approved:

- `app/**`
- `components/**`
- `lib/auth/**`
- `lib/supabase/**`
- `lib/stripe/**`
- `supabase/migrations/**`, except reading Sprint 013 schema evidence
- `.release-main/**`, continuity/reference only, no wholesale copy
- `.env*` names/presence only, no values

## Required Output

Builder must produce:

- scoring service/module or a documented blocker if prerequisites are missing
- exact lookup behavior documentation
- conductivity raw-to-C conversion behavior
- pH Average behavior
- Hydration Score and Health Score calculations
- blocked/unscored result behavior for missing exact lookup values
- score snapshot contract compatible with Sprint 013 data model
- fixture-backed examples or validation evidence
- validation results
- manual-intervention instructions for any blocked scoring, lookup, fixture, or domain input issue

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

============================================================
FILE: planning/sprints/014-biochemistry-scoring-service-and-fixtures/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/014-biochemistry-scoring-service-and-fixtures/acceptance.md
============================================================

# Sprint 014 - Biochemistry Scoring Service And Fixtures Acceptance

## Required Acceptance Criteria

- Architect Pack 014 is saved and applied before Builder implementation begins.
- `planning/STATE.md` says implementation is authorized for Sprint 014 before Builder edits source files.
- Builder confirms Sprint 013 is complete or explicitly complete enough for scoring work.
- Builder reads the Sprint 014 four-file sprint set before implementation.
- Builder reads Sprint 013 closeout evidence and the preserved Reading Tables source.
- Scoring implementation uses exact lookup only.
- No rounded, interpolated, nearest, next-lower, or default lookup behavior is introduced.
- pH uses `pH Average = (pH Saliva + pH Urine) / 2`.
- No `calibrated` pH wording or concept is introduced.
- Conductivity stores/uses raw meter input and converted C value using multiplier `1.43`.
- Salts lookup uses converted C value.
- Hydration Score Energy Loss uses `(Carbs Loss + Salts Loss) / 2`.
- Hydration Score uses `1 - Hydration Score Energy Loss`.
- Health Score Energy Loss uses `(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`.
- Health Score uses `1 - Health Score Energy Loss`.
- Scoring output includes or documents a formula version.
- Scoring output includes or documents score snapshot fields compatible with Sprint 013 schema.
- Missing exact lookup values return blocked/unscored state rather than guessed scores.
- Fixture-backed examples or validation evidence cover scored and missing-lookup cases.
- `docs/BIOCHEMISTRY_SCORING_014.md` is created.
- Public under-construction gate remains active.
- Old website is not copied wholesale.
- No UI, mobile capture, uploads, storage policy, trend chart, OCR, voice-to-text, recommendation content, Stripe, remote Supabase, production data, deployment, push, or PR work is performed.
- Validation is run and recorded, or blocked with exact evidence and manual-intervention steps.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Formula Acceptance Matrix

| Item | Accepted rule |
|---|---|
| pH Average | `(pH Saliva + pH Urine) / 2` |
| Conductivity C | `raw meter reading * 1.43` |
| Lookup | exact reading to adjacent loss value |
| Salts | lookup uses converted C value |
| Hydration Score Energy Loss | `(Carbs Loss + Salts Loss) / 2` |
| Hydration Score | `1 - Hydration Score Energy Loss` |
| Health Score Energy Loss | `(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4` |
| Health Score | `1 - Health Score Energy Loss` |

## Fixture Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Fully matched readings | Returns scored result with losses and both scores. |
| Missing Carbs exact lookup | Returns blocked/unscored with Carbs reason. |
| Missing pH Average exact lookup | Returns blocked/unscored with pH Average reason. |
| Missing Salts exact lookup | Returns blocked/unscored with Salts reason after C conversion. |
| Missing Urea exact lookup | Returns blocked/unscored with Urea reason. |
| Conductivity conversion | Raw meter value produces converted C value using `1.43`. |
| pH Average | Saliva and Urine values produce correct average. |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action

============================================================
FILE: planning/sprints/014-biochemistry-scoring-service-and-fixtures/handoff-prompt.md
============================================================

# Sprint 014 - Builder Handoff Prompt

You are Builder for Sprint 014 - Biochemistry Scoring Service And Fixtures in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/requirements.md`
5. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/blueprint.md`
6. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DEFINITION_OF_DONE.md`
9. Sprint 013 closeout docs, migrations, lookup evidence, and preserved Reading Tables source

## Mission

Build the local scoring foundation for biochemistry tests using exact lookup values and approved formulas.

Do not build UI. Do not deploy. Do not apply remote migrations. Do not copy the old website wholesale.

## First Gate

Before implementation, prove Sprint 013 created enough evidence for scoring:

- preserved Reading Tables source exists or exact source-access blocker is documented
- lookup structures for Carbs, pH Average, Salts, and Urea are available
- score snapshot shape is documented
- formula and conductivity rules are documented

If this is not true, stop and record the blocker.

## Guardrails

Do not use `calibrated` wording for pH.

Do not invent lookup behavior. Exact-match lookup only.

Do not invent formulas. Use only:

- `pH Average = (pH Saliva + pH Urine) / 2`
- `Conductivity C = raw meter reading * 1.43`
- `Hydration Score Energy Loss = (Carbs Loss + Salts Loss) / 2`
- `Hydration Score = 1 - Hydration Score Energy Loss`
- `Health Score Energy Loss = (Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`
- `Health Score = 1 - Health Score Energy Loss`

Do not apply migrations to remote Supabase.

Do not deploy.

Do not push or create a PR unless separately authorized.

Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

Do not reopen public website/shop surfaces hidden by Sprint 012F.

Do not add mobile capture UI, uploads UI, storage policies, OCR, voice-to-text, trend charts, or recommendation content.

Do not expose secret values or fragments.

## Suggested Execution

1. Record current branch, commit, and dirty status.
2. Read Sprint 013 scoring/data-model evidence.
3. Inspect the preserved Reading Tables source and lookup representation.
4. Design a small scoring module and result type.
5. Implement exact lookup, pH Average, conductivity conversion, score formulas, and blocked/unscored result handling.
6. Add fixture-backed examples or validation.
7. Create `docs/BIOCHEMISTRY_SCORING_014.md`.
8. Run validation.
9. Update planning/status/briefing.
10. Stop before UI, remote migration, deployment, push, PR, public relaunch, or recommendation content work.

## Closeout Standard

At close, the next Architect should know:

- what scoring module/files were created
- which lookup source/version was used
- how exact lookup is performed
- how missing lookup values block scoring
- how conductivity conversion is represented
- how formula version and score snapshots are represented
- what fixtures were validated
- what remains blocked before Sprint 015 mobile capture

============================================================
FILE: planning/sprints/014-biochemistry-scoring-service-and-fixtures/BUILDER_START_INSTRUCTIONS.md
============================================================

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
