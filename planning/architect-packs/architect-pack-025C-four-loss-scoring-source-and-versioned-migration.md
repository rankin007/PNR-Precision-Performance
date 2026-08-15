============================================================
FILE: planning/sprints/025C-four-loss-scoring-source-and-versioned-migration/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/025C-four-loss-scoring-source-and-versioned-migration/blueprint.md
============================================================

# Sprint 025C Blueprint — Four-Loss Scoring Source and Versioned Migration

## Architecture

`private accepted workbook v3` → `deterministic numeric extraction` → `canonical v3 fixture + additive migration seeds` → `versioned v2 domain scorer` → `new-write server action` → `version-aware result reconstruction` → `trainer result without Average pH/Urea`.

Historical path remains:
## Flight evidence

1. **Class and reason:** `critical`, because this sprint changes a health-adjacent numeric formula, persisted score snapshots and database constraints; a plausible wrong result could remain silent.
2. **Acceptance invariant at risk:** v2 must use exactly four independently selected workbook losses, apply conductivity multiply, two-decimal round, cap, then floor lookup in that order, and must never reinterpret or rewrite v1.
3. **Affected layers and verified paths:** workbook `Loss Data!B14:C164,F14:G445,J14:K445,N14:O814`; deterministic extractor and v3 fixture; migration `0024` lookup seeds/constraints; `lib/domain/biochemistry.ts` v2 scorer; `app/(ops)/data-entry/biochemistry/actions.ts` v2 write plus formula-version read dispatch; workflow state/capture/result components; focused tests and retained v1 gates.
4. **Source, transformations and sink:** the accepted private workbook and its recorded SHA/table digests are the only v3 loss authority. Numeric rows are extracted without inference, normalized to six decimals, seeded under source `v3`, selected exact-or-greatest-lower, combined by the accepted formulas, stored as a versioned immutable snapshot, and rendered as numeric Hydration/Health scores while unapproved guidance remains unavailable.
5. **Discriminating examples:** (a) Carbohydrate `4.55` must select `4.5`, not next-higher `4.6` or interpolation; (b) raw conductivity `18.17` gives `25.98` after two-decimal rounding and therefore selects Salts `25.9`, not `26.0`; raw `26.50` must round half-up to `37.90`, matching PostgreSQL numeric rounding, not binary-float `37.89`; (c) raw conductivity `99.00` is accepted, preserves raw `99.00`, caps effective C at `80.00` and selects `80.0`; (d) the workbook example must persist Hydration `0.919701` and Health `0.906684`; (e) a stored v1 row with Average pH/Urea must reconstruct as v1, while a v2 row with separate urine/saliva losses and null Average pH/Urea must reconstruct as v2.
6. **Durable verification source:** canonical Git root `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`, branch `codex/025B-versioned-domain-authority-package`, baseline HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, recorded pre-existing dirty manifest, applied sprint files and accepted workbook SHA-256 `838D935F20B864A4F5ED5C0CA5D017322A1608D1CA1A68EC9B02F6AFB4BC5F30`.
7. **Known uncertainty:** a disposable local PostgreSQL/Supabase container may be unavailable. If so, the migration receives deterministic structural/self-test proof that falsifies constraint, seed-count, version-coexistence and prohibited-backfill failures; no remote database may be used as a substitute.

`Reading Tables v1.csv` → `v1 lookup rows` → `biochemistry-score-v1 snapshots` → `unchanged historical read compatibility`.

## Phase 1 — Code-gate reconciliation

1. Verify canonical path/Git truth and preserve the dirty worktree.
2. Reread all four generated sprint files, the 025B authority package/closeout, current scorer, migration `0009`, capture action/components, v1 fixtures and retained tests.
3. Present the exact file-by-file Builder plan, scope guards, acceptance mapping and test-count arithmetic before source/test/schema edits.
4. Stop for fresh human approval unless an active Fly exception validly covers this exact Pack and plan.

## Phase 2 — Deterministic source extraction

1. Build one local extraction tool using the required spreadsheet library.
2. Refuse any workbook whose SHA-256, worksheet, ranges, row counts, bounds, steps or table digests differ from requirements.
3. Read cached numeric cell values, normalize loss fractions to six decimals and produce deterministic JSON ordered by lookup type then reading.
4. Include source document, version, effective date, source range and row number for each row.
5. Emit no Average-pH or Urea v3 lookup table.
6. Rerunning extraction must reproduce byte-identical canonical fixture output.

## Phase 3 — Additive persistence contract

1. Create migration `0024`; do not alter closed migrations.
2. Widen lookup-type constraints safely and seed v3 rows without deleting or updating v1 rows.
3. Add the separate pH references/losses and the versioned conductivity audit fields required by the accepted transformation.
4. Make legacy-only Average-pH/Urea fields nullable for v2 while preserving v1 constraints through version-aware checks.
5. Prove a valid v1 row remains valid and unchanged; prove a valid v2 row requires the four accepted loss snapshots and no Urea value.
6. Prove rerun/idempotency and uniqueness by source version.

## Phase 4 — Versioned domain scoring

1. Preserve the current v1 exports and tests.
2. Add a distinct v2 scoring path and discriminated snapshot types rather than silently changing v1 meaning.
3. Implement exact-or-next-lower table selection using numeric ordering and deterministic normalization.
4. Implement raw conductivity conversion, two-decimal rounding, cap at 80 and selected-row audit values in the approved order.
5. Calculate the two accepted formulas and return no Urea or Average-pH dependency/blocker in v2.
6. Keep invalid/below-min/out-of-permitted-range behavior explicit; do not treat the conductivity upper cap as a blocker.

## Phase 5 — Capture, persistence and display

1. Remove Urea and Average pH from the current trainer capture/review/result presentation.
2. Do not send a synthetic Urea default. New v2 persistence records it as absent/nullable.
3. Load the correct lookup source version and call only v2 for new submissions.
4. Persist raw input, effective C, selected lookup readings/losses, scores and exact formula/source versions atomically.
5. Reconstruct v1 and v2 results according to `formula_version`; never reinterpret one as the other.
6. Continue displaying approved numeric scores while zones/recommendations remain explicitly unavailable.

## Phase 6 — Verification and closeout

1. Prove source integrity, workbook example, lookup boundaries, floor behavior, rounding-before-cap, cap behavior and separate pH differences.
2. Prove no Urea blocker/default and no Average-pH calculation in v2.
3. Prove v1 fixtures/recommendation scaffold/authority tests remain clean.
4. Prove migration structure, v1/v2 coexistence and static insert compatibility without remote application.
5. Run typecheck, lint, Production build, domain suite, JSON/static validation and `git diff --check`.
6. Review every changed path, keep the index empty, update all required closeout records and stop without external action.

## Critical invariants

- Loss values come only from the accepted v3 table cells; no interpolation or generated curve.
- `selectedReading <= lookupInput`, except that converted C above 80 is first capped to 80.
- New v2 scores require Carbohydrate, Salts, Urine pH and Saliva pH losses exactly once each.
- Urea and Average pH contribute zero terms because they are absent from the v2 formula, not because a zero loss is inserted.
- Historical v1 rows and outputs are not recalculated.
- Fixture-only thresholds/recommendations never become production authority.

## Failure handling

| Condition | Required treatment |
| --- | --- |
| Workbook/source hash or table digest mismatch | Stop; do not extract or invent values |
| A v3 reading/loss row is missing, duplicated, non-numeric or out of declared order | Stop; record exact sanitized discrepancy |
| Rounding/cap/next-lower behavior cannot reproduce accepted examples | Diagnose and correct within scope; stop after two failed focused repairs |
| Migration would rewrite historical v1 data | Stop and return to Architect |
| Another implementation file is required | Stop for scope expansion |
| Preferred local database tool unavailable | Use equal/stronger deterministic migration parsing or isolated local proof and record the substitution |
| Remote/Production access appears necessary | Stop; it is outside 025C |
============================================================
FILE: planning/sprints/025C-four-loss-scoring-source-and-versioned-migration/acceptance.md
============================================================

# Sprint 025C Acceptance — Four-Loss Scoring Source and Versioned Migration

## Canonical and scope integrity

- [ ] AC-01 — CWD and Git root equal the canonical workspace; branch, HEAD, staged count and dirty manifest are recorded.
- [ ] AC-02 — Every pre-existing change is preserved; only approved files changed for 025C.
- [ ] AC-03 — No legacy/C:\tmp implementation workspace, raw-workbook edit/copy into the repository, staging, commit, push, deployment or external mutation occurred.

## Authority and source integrity

- [ ] AC-04 — Workbook SHA-256 equals `838D935F20B864A4F5ED5C0CA5D017322A1608D1CA1A68EC9B02F6AFB4BC5F30`.
- [ ] AC-05 — The four exact source ranges, counts, bounds, steps and table digests pass.
- [ ] AC-06 — The extracted fixture is deterministic, source-attributed and contains exactly 1,816 rows: `151 + 432 + 432 + 801`.
- [ ] AC-07 — No Average-pH or Urea v3 lookup rows are created.
- [ ] AC-08 — No loss is interpolated, extrapolated, curve-generated or inferred.

## Scoring behavior

- [ ] AC-09 — Formula/source versions are `biochemistry-score-v2` and `v3` for new tests.
- [ ] AC-10 — Exact readings select their exact rows; in-range non-exact readings select the greatest lower row.
- [ ] AC-11 — Conductivity processing order is multiply by `1.43`, round C to two decimals, cap at `80.00`, then exact/next-lower table selection.
- [ ] AC-12 — Converted C above 80 is accepted and uses the `80.0` Salts row without a scoring blocker.
- [ ] AC-13 — Hydration Score uses only Carbohydrate and Salts losses with equal weights.
- [ ] AC-14 — Health Score uses only Carbohydrate, Urine pH, Saliva pH and Salts losses with equal weights.
- [ ] AC-15 — The workbook example produces persisted scores `0.919701` and `0.906684`.
- [ ] AC-16 — Urea is absent, not zero-filled, and cannot block v2 scoring.
- [ ] AC-17 — Average pH is not calculated, looked up, persisted as a required v2 field or displayed.

## Persistence and compatibility

- [ ] AC-18 — Migration `0024` is additive and leaves migration `0009` unchanged.
- [ ] AC-19 — All v1 lookup rows, Urea data, Average-pH data and score snapshots remain unchanged and readable.
- [ ] AC-20 — New separate pH lookup references/loss snapshots and conductivity audit values are persisted with v2.
- [ ] AC-21 — Urea remains retained for historical/future use but is optional and hidden for new v2 capture.
- [ ] AC-22 — Version-aware constraints accept valid v1 and v2 records and reject internally inconsistent snapshots.
- [ ] AC-23 — No historical score is backfilled or recalculated.

## Trainer surface and fail-closed content

- [ ] AC-24 — Current trainer capture/review/result UI contains no visible Urea or Average-pH field.
- [ ] AC-25 — New submissions require the four accepted measurements and no Urea input.
- [ ] AC-26 — Numeric Hydration and Health scores remain available when v2 scoring succeeds.
- [ ] AC-27 — Production zones, thresholds, recommendations, today guidance, final terminology, disclaimers and escalation remain unavailable and are not inferred from fixtures.

## Focused proof target

Builder must define and report exactly 44 new counted assertions before code:

- 12 source/table integrity assertions;
- 18 scoring/transformation assertions;
- 8 migration/version-compatibility assertions; and
- 6 capture/result/fail-closed UI assertions.

If discovery changes this arithmetic, stop at the code gate and obtain approval for the corrected exact count; do not silently lower coverage.

### Exact 44-assertion ledger

Each item is one counted executable assertion. The input is deliberately chosen so a plausible wrong implementation produces a different result.

#### Source/table integrity — 12

| ID | Target and discriminating input | Expected result |
| --- | --- | --- |
| SRC-01 | Hash the supplied workbook bytes | Exact accepted workbook SHA-256 |
| SRC-02 | Open workbook and request `Loss Data!A1:O814` | Sheet/range exists and is readable |
| SRC-03 | Extract `B14:C164` | Carbohydrate count `151`, bounds `0.0..15.0`, step `0.1` |
| SRC-04 | Extract `F14:G445` | Urine pH count `432`, bounds `4.80..9.11`, step `0.01` |
| SRC-05 | Extract `J14:K445` | Saliva pH count `432`, bounds `4.80..9.11`, step `0.01` |
| SRC-06 | Extract `N14:O814` | Salts count `801`, bounds `0.0..80.0`, step `0.1` |
| SRC-07 | Digest normalized Carbohydrate pairs | SHA-256 `2dd0e1da2ad8950090b0401189cdfa9553a756b2116755d6a9037711f6ce5c16` |
| SRC-08 | Digest normalized Urine-pH pairs | SHA-256 `be8fc0483d0f2f2239782398a0ec207f5e121289d692567d66221e87c95c85a6` |
| SRC-09 | Digest normalized Saliva-pH pairs | SHA-256 `ad62ed9e8bfe35fe72fa11a4c60aa49bc71e6ba1a64d4c3489846f671d3b5888` |
| SRC-10 | Digest normalized Salts pairs | SHA-256 `92352813a40cb5be1a22c5aeb56a5484e0b3703fafed256527a4ac10dbab2f5a` |
| SRC-11 | Count/type-check emitted rows | Exactly `1,816`; only `carbs`, `ph_urine`, `ph_saliva`, `salts` |
| SRC-12 | Run extraction twice against unchanged source | Fixture bytes are identical and every row is finite/source-attributed |

#### Scoring/transformation — 18

| ID | Target and discriminating input | Expected result |
| --- | --- | --- |
| SCORE-01 | Score the workbook example | Formula/source `biochemistry-score-v2` / `v3` |
| SCORE-02 | Carbohydrate `4.5` | Exact row `4.5`, loss `0.080000` |
| SCORE-03 | Carbohydrate `4.55` between rows | Select `4.5`, never `4.6`/interpolation |
| SCORE-04 | Carbohydrate below `0.0` | Explicit invalid/below-min blocker, no score |
| SCORE-05 | Urine pH `7.24` | Exact row/loss `7.24` / `0.082333` |
| SCORE-06 | Saliva pH `7.25` | Exact row/loss `7.25` / `0.130333` |
| SCORE-07 | Example urine and saliva readings | Separate loss snapshots remain unequal; no Average-pH lookup |
| SCORE-08 | Effective Salts C `26.0` | Exact row/loss `26.0` / `0.080597` |
| SCORE-09 | Raw conductivity `18.18` and half-step `26.50` | Effective C `26.00` and decimal half-up `37.90`, matching PostgreSQL |
| SCORE-10 | Raw conductivity `18.17` | Effective `25.98`, selected Salts row `25.9`, not `26.0` |
| SCORE-11 | Raw conductivity `56.00` (`80.08` before cap) | Effective C `80.00`, selected row `80.0` |
| SCORE-12 | Raw conductivity `99.00` | Accepted and selected row `80.0` with no upper-cap blocker |
| SCORE-13 | Raw conductivity `99.00` snapshot | Raw audit value remains `99.00`; effective value is `80.00` |
| SCORE-14 | Workbook example losses | Hydration energy loss `0.080299` |
| SCORE-15 | Workbook example losses | Hydration Score `0.919701` |
| SCORE-16 | Workbook example losses | Health energy loss `0.093316` |
| SCORE-17 | Workbook example losses | Health Score `0.906684` |
| SCORE-18 | v2 score without Urea and with divergent pH values | Scored; no Urea/Average-pH loss, key, default or blocker |

#### Migration/version compatibility — 8

| ID | Target and discriminating input | Expected result |
| --- | --- | --- |
| MIG-01 | Compare migration `0009` against pre-sprint Git state | Byte content unchanged |
| MIG-02 | Parse lookup-type constraint after `0024` | Legacy four plus `ph_urine`/`ph_saliva` accepted |
| MIG-03 | Parse v3 inserts | Exactly `151/432/432/801`, total `1,816`, source `v3` |
| MIG-04 | Inspect added snapshot/audit columns | Separate urine/saliva IDs/losses, effective C and selected Salts reading present |
| MIG-05 | Inspect nullability changes | Average-pH/Urea legacy fields nullable for v2; columns retained |
| MIG-06 | Evaluate representative valid historical v1 snapshot | Accepted unchanged with v1 Average-pH/Urea and legacy conversion meaning |
| MIG-07 | Evaluate valid v2 plus wrong lookup type/version, selected-reading order, out-of-range loss/score and arithmetic-mismatch snapshots | Valid four-loss/null-legacy v2 accepted; every malformed identity/order/range/formula case rejected |
| MIG-08 | Re-run seed/DDL structural model and scan mutations | Idempotent; no v1 update/delete, historical backfill or remote command |

#### Capture/result/fail-closed UI — 6

| ID | Target and discriminating input | Expected result |
| --- | --- | --- |
| UI-01 | Inspect numeric field contract | Exactly Carbohydrate, Saliva pH, Urine pH, Conductivity; no Urea |
| UI-02 | Validate a complete four-reading submission with no Urea property | Accepted; no synthetic default generated |
| UI-03 | Validate boundary/precision inputs (`0/15`, `4.80/9.00`, `0/99`) and one out-of-range/step case | Inclusive bounds accepted; invalid range/precision rejected explicitly |
| UI-04 | Inspect capture and review render/source | No visible/hidden Urea input and no Average-pH field/text |
| UI-05 | Reconstruct representative v1 and v2 stored rows by `formula_version` | Correct discriminated snapshot type; neither is reinterpreted as the other |
| UI-06 | Render successful v2 result with no authority fixtures | Numeric scores visible; Urea/Average pH absent; zones/recommendations remain unavailable |

## Retained and full gates

- [ ] AC-28 — The 44/44 new focused assertions pass.
- [ ] AC-29 — Existing `npm run test:domain` passes, including v1 scoring, recommendation scaffold, workflow and Sprint 025 authority regressions.
- [ ] AC-30 — `npm run typecheck` passes.
- [ ] AC-31 — `npm run lint` passes with zero warnings.
- [ ] AC-32 — `npm run build` passes.
- [ ] AC-33 — `npm run validate:json` and `npm run validate:static` pass.
- [ ] AC-34 — Migration SQL receives deterministic static/self-test proof; equivalent stronger local proof may substitute for an unavailable database container.
- [ ] AC-35 — `git diff --check` passes; changed-file scans find no credential or identifiable horse/person data.
- [ ] AC-36 — Staged count, external mutation count and external residue count are all zero.

## Closeout

- [ ] AC-37 — `planning/ARCHITECT_BRIEFING.md`, both roadmaps, state, status, schedule, lifecycle ledger, decisions, risks, questions, evidence index and Final Product Acceptance Matrix are reconciled proportionately.
- [ ] AC-38 — Runtime acceptance is claimed only from executable local proof; no Production/live claim is made.
- [ ] AC-39 — The report states whether any manual or user action remains and ends with `I need nothing from you.` when none remains.
============================================================
FILE: planning/sprints/025C-four-loss-scoring-source-and-versioned-migration/handoff-prompt.md
============================================================

# Sprint 025C Builder Handoff — Four-Loss Scoring Source and Versioned Migration

## Task contract

**objective:** Deliver one locally proven, versioned four-loss scoring path for new tests while preserving historical v1 scoring and keeping unapproved clinical content unavailable.

**owns:** The exact approved implementation, fixture, additive migration, focused tests, scoring documentation and required closeout files listed in requirements.

**must_not:** Do not change historical v1 meaning/data; invent loss values, thresholds, recommendations, guidance or clinical language; edit/commit the private workbook; create credentials; access or mutate remote/Production systems; deploy; send email/enquiries; move aliases; stage; commit; push; merge; or open a PR.

**acceptance:** All authority/source, four-loss scoring, next-lower, conductivity rounding/cap, hidden-retained Urea, versioned persistence, v1 compatibility, fail-closed content and 44-assertion requirements in `acceptance.md` pass with zero external effects.

**verification:** Run the focused source/scoring/migration/workflow tests, retained domain suite, typecheck, zero-warning lint, Production build, JSON/static validation, migration static/self-test proof, `git diff --check`, changed-file safety scans and final index/external-effect checks. Equivalent or stronger safe local evidence may substitute for an unavailable supporting tool.

## Required execution order

1. Dry-run this Pack, apply it, and reread all generated files plus the 025B authority/closeout and source contracts.
2. Verify canonical/Git/worktree truth and preserve every pre-existing change.
3. Inspect the exact approved implementation files and present the code-gate plan with file list, scope guards, acceptance mapping and `12 + 18 + 8 + 6 = 44` assertion target.
4. Wait for explicit approval of that exact plan unless a valid active Fly exception covers this Pack.
5. Extract and verify the private workbook numerically without editing, copying into the repository or exposing it.
6. Create the deterministic canonical fixture and additive migration.
7. Implement the separate v2 domain, new-write, persistence and display paths while retaining v1 compatibility.
8. Run focused then retained/full gates; apply at most two focused repairs per failure.
9. Reconcile closeout records, leave the index empty and stop without remote or Production action.

## Manual intervention

Use manual intervention only if the accepted workbook cannot be read safely, its identity/table integrity materially differs, or an authority/migration boundary cannot be resolved through safe local evidence. Record the blocker, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Do not request credentials or confidential worksheet contents in chat.

## Final report

Lead with the delivered behavior. Report the exact changed files, 44-assertion arithmetic/results, retained/full gates, workbook/table integrity, formula/source versions, migration status, historical compatibility, fail-closed content, staged/external/residue counts and any substitute proof. State clearly whether anything is required from the user. If nothing remains, end exactly: `I need nothing from you.`
