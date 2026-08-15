# Sprint 025C Requirements — Four-Loss Scoring Source and Versioned Migration

## Outcome

Implement the accepted versioned scoring contract for new biochemistry tests: separate Carbohydrate, Salts, Urine pH and Saliva pH loss lookups; Hydration Score from Carbohydrate and Salts; Health Score from all four losses; next-lower lookup behavior; converted-C rounding and an 80 cap; and hidden-but-retained Urea data. Preserve every historical `biochemistry-score-v1` record and keep unapproved zones, recommendations, today guidance, disclaimers and escalation unavailable.

## Workflow profile and flight class

Strict and `critical`. This sprint changes a health-adjacent formula, lookup source, persisted snapshot shape and database contract. Builder must obtain fresh review of the exact code plan before any source, test, fixture or migration edit. Local implementation and proof are in scope; remote migration, deployment and production data mutation are not.

## Canonical boundary

Work only in:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before changing anything, record the resolved current directory, Git root, branch, HEAD, staged count and complete pre-existing dirty-path manifest. Both resolved paths must equal the canonical path. Preserve every pre-existing change. Do not use or copy from a legacy repository or `C:\tmp`. Do not stage, commit, push, deploy, send email/enquiries, create credentials or move aliases.

## Accepted authority

### Named decisions

- Product/domain owner: Phillip Rankin, Director, Aprec8, decision date 2026-08-07. Guided review accepts the four-loss formulas, separate pH treatment, table-only loss values, exact-when-present/next-lower lookup behavior, two-decimal converted-C rounding before lookup, an effective C cap of 80 without blocking accepted raw conductivity inputs, and Urea retained but hidden for future use.
- Current accepted product decision, recorded 2026-08-10: Carbohydrate trainer input range is inclusive `0.0` through `15.0`. This supersedes the earlier `13.0` operational maximum.
- Veterinary reviewer: Randell Rankin, Professional Veterinarian, decision date 2026-08-07. Exact accepted statement: `Randell Rankin, Professional Veterinarian, decision date 7 August 2026, accepts the four-loss Health Score formula, the Hydration Score formula, the separate Carbohydrate, Salts, Urine pH and Saliva pH lookup tables, the next-lower lookup behaviour, and the conductivity cap of 80.`

### Source identity

- Source document: `HORSE Energy Loss Version 3 no urea or age.xlsx`.
- Supplied private path for read-only extraction: `C:\Users\rrank\OneDrive\3.0_Personal\People\Phillip Rankin\HORSE Energy Loss Version 3 no urea or age.xlsx`.
- Source version: `v3`.
- Effective decision date: `2026-08-07`.
- File SHA-256: `838D935F20B864A4F5ED5C0CA5D017322A1608D1CA1A68EC9B02F6AFB4BC5F30`.
- Worksheet/range: `Loss Data!A1:O814`.
- Carbohydrate table: `B14:C164`, 151 rows, readings `0.0` through `15.0` in `0.1` steps, table-value SHA-256 `2dd0e1da2ad8950090b0401189cdfa9553a756b2116755d6a9037711f6ce5c16`.
- Urine pH table: `F14:G445`, 432 rows, readings `4.80` through `9.11` in `0.01` steps, table-value SHA-256 `be8fc0483d0f2f2239782398a0ec207f5e121289d692567d66221e87c95c85a6`.
- Saliva pH table: `J14:K445`, 432 rows, readings `4.80` through `9.11` in `0.01` steps, table-value SHA-256 `ad62ed9e8bfe35fe72fa11a4c60aa49bc71e6ba1a64d4c3489846f671d3b5888`.
- Salts C table: `N14:O814`, 801 rows, readings `0.0` through `80.0` in `0.1` steps, table-value SHA-256 `92352813a40cb5be1a22c5aeb56a5484e0b3703fafed256527a4ac10dbab2f5a`.

The workbook is a private extraction source, not a repository implementation workspace. Do not edit it. Do not commit or expose the raw workbook. Extract only the four numeric reading/loss tables and source metadata needed for the versioned Product fixture and migration.

## Formula and transformation contract

Use formula version `biochemistry-score-v2` and lookup source version `v3` for new scored tests.

### Lookup behavior

For each accepted lookup input:

1. Validate the raw trainer input against the already accepted measurement precision, step and operational range.
2. If the normalized lookup input exactly equals a table reading, use that row.
3. Otherwise select the greatest table reading less than the lookup input.
4. Never select the next higher row, interpolate between rows, extrapolate, fit a curve or derive loss values from a formula.
5. Inputs below a table minimum or invalid/non-finite inputs remain invalid. The special conductivity upper-cap rule below prevents above-maximum C lookup failure.

### Conductivity

1. Preserve the accepted raw trainer measurement in `mS/cm`, inclusive `0` through `99`, with two-decimal input/display precision.
2. Calculate `raw C = raw mS/cm × 1.43`.
3. Round raw C to two decimal places using one deterministic decimal rule for non-negative values.
4. Set `effective C = min(rounded C, 80.00)`.
5. Persist/use no v2 effective C value above `80.00`.
6. Select the exact or next-lower Salts row from the `0.1` table using effective C.
7. A raw conductivity value is not blocked merely because conversion exceeds 80; every converted value above 80 selects the `80.0` Salts row.
8. Preserve the raw meter input for audit. Persist the effective capped C and the selected Salts table reading distinctly if needed to make the transformation auditable.

### Scores

`hydrationScoreEnergyLoss = (carbohydrateLoss + saltsLoss) / 2`

`hydrationScore = 1 - hydrationScoreEnergyLoss`

`healthScoreEnergyLoss = (carbohydrateLoss + urinePhLoss + salivaPhLoss + saltsLoss) / 4`

`healthScore = 1 - healthScoreEnergyLoss`

Normalize persisted loss and score fractions to six decimal places, consistent with the existing snapshot scale. Do not use Average pH or Urea Loss in `biochemistry-score-v2`.

### Required workbook example

The new fixture and executable proof must reproduce, at six-decimal persistence scale:

- Carbohydrate `4.5` → loss `0.080000`.
- Salts C `26.0` → loss `0.080597`.
- Urine pH `7.24` → loss `0.082333`.
- Saliva pH `7.25` → loss `0.130333`.
- Hydration Score Energy Loss `0.080299`; Hydration Score `0.919701`.
- Health Score Energy Loss `0.093316`; Health Score `0.906684`.

The UI may format those scores as whole percentages `92%` and `91%` while snapshots retain six-decimal fractions.

## Version and compatibility requirements

- Preserve `Reading Tables v1.csv`, source version `v1`, `biochemistry-score-v1`, the `ph_average`/`urea` lookup rows and every historical v1 score snapshot unchanged.
- Do not rewrite, backfill, recalculate or relabel historical score values as v2.
- Add separate `ph_urine` and `ph_saliva` lookup types for v3 while retaining all legacy lookup types.
- New tests use v2 only after the local migration contract, lookup seeds, action path and result reconstruction are mutually consistent.
- Historical v1 results remain readable and auditable through a version-discriminated compatibility path.
- Current trainer capture/result surfaces do not display Average pH or Urea.
- Retain Urea schema fields, historical values, lookup data and compatibility code. Make Urea optional for new v2 submissions; do not synthesize zero or another default. It must be possible to restore Urea in a future separately approved version.
- Unapproved Green/Amber/Red thresholds, recommendation fixtures, today guidance, final trainer-facing replacement naming, disclaimers and escalation rules remain unavailable and fail closed.

## Required database migration

Create a new additive migration; never edit migration `0009`.

The migration must:

- support `ph_urine` and `ph_saliva` lookup types without deleting v1 lookup rows;
- insert the four v3 tables with their exact extracted six-decimal values and source identity;
- add separate urine-pH and saliva-pH lookup references and loss snapshots;
- make v2 Urea and Average-pH fields optional while preserving v1 rows;
- record the effective capped C and selected Salts lookup reading without corrupting the historical v1 conversion meaning;
- preserve formula/source version discrimination;
- use version-aware constraints so valid historical v1 and new v2 rows coexist;
- be idempotent where the repository migration standard requires it; and
- contain no remote application command or production mutation.

## Approved implementation files

Builder may create or edit only:

- `lib/domain/biochemistry.ts`;
- `app/(ops)/data-entry/biochemistry/actions.ts`;
- `components/ops/biochemistry-workflow-state.ts`;
- `components/ops/biochemistry-capture-workflow.tsx`;
- `components/ops/biochemistry-result-panel.tsx`;
- `supabase/migrations/0024_versioned_four_loss_biochemistry_scoring.sql`;
- `references/fixtures/biochemistry-loss-tables-v3.json`;
- `references/fixtures/biochemistry-scoring-025C.json`;
- `scripts/extract-biochemistry-loss-tables-025C.mjs`;
- `scripts/test-biochemistry-scoring-025C.mjs`;
- `scripts/test-biochemistry-migration-025C.mjs`;
- `scripts/test-biochemistry-workflow-025C.mjs`;
- `scripts/test-biochemistry-workflow-022.mjs` only to update its retained current-workflow expectation from five required readings to the approved four, without weakening its note-review, submission-lock or other Sprint 022 coverage;
- `scripts/run-validation-suite.mjs` only to add the new retained tests to the domain group;
- `docs/BIOCHEMISTRY_SCORING_025C.md`;
- generated Sprint 025C files and proportionate planning/docs closeout records required by `AGENTS.md`.

If implementation proves another Product/source/test/schema file is materially required, stop for Architect scope expansion. Do not silently edit it.

## Explicitly out of scope

- Production thresholds, zones, recommendation content, Table of Knowledge activation, today guidance, diagnosis, prognosis, treatment, dose or escalation wording.
- Removing Urea storage/history/lookup data or making irreversible future-use decisions.
- Changing historical v1 scores, lookup rows or formula meaning.
- Editing or committing the raw workbook.
- Remote migration, Supabase mutation, deployment, public activation or production data.
- Credentials, secrets, provider configuration, email, enquiries, public-enquiry work or mailbox access.
- Vercel, domain, alias, promote or rollback actions.
- Staging, commit, push, merge or PR unless separately requested after sprint completion.

## Evidence-Proportional Execution Standard

Stop only for a material target, authority, confidentiality, security, privacy, migration, destructive, integrity, production, scope or cleanup risk. Use equivalent or stronger safe proof when a preferred supporting tool is unavailable. Keep deterministic extraction, fixture, validator, migration-harness, formatting, encoding and reporting corrections within 025C. Do not create another follow-up merely because Docker, a browser driver, renderer, schema dump or optional CLI path is unavailable. Manual intervention is last resort after safe local alternatives are exhausted.
