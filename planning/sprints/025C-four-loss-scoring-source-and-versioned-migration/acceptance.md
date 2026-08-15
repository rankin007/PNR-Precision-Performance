# Sprint 025C Acceptance — Four-Loss Scoring Source and Versioned Migration

## Canonical and scope integrity

- [x] AC-01 — CWD and Git root equal the canonical workspace; branch, HEAD, staged count and dirty manifest are recorded.
- [x] AC-02 — Every pre-existing change is preserved; only approved files changed for 025C.
- [x] AC-03 — No legacy/C:\tmp implementation workspace, raw-workbook edit/copy into the repository, staging, commit, push, deployment or external mutation occurred.

## Authority and source integrity

- [x] AC-04 — Workbook SHA-256 equals `838D935F20B864A4F5ED5C0CA5D017322A1608D1CA1A68EC9B02F6AFB4BC5F30`.
- [x] AC-05 — The four exact source ranges, counts, bounds, steps and table digests pass.
- [x] AC-06 — The extracted fixture is deterministic, source-attributed and contains exactly 1,816 rows: `151 + 432 + 432 + 801`.
- [x] AC-07 — No Average-pH or Urea v3 lookup rows are created.
- [x] AC-08 — No loss is interpolated, extrapolated, curve-generated or inferred.

## Scoring behavior

- [x] AC-09 — Formula/source versions are `biochemistry-score-v2` and `v3` for new tests.
- [x] AC-10 — Exact readings select their exact rows; in-range non-exact readings select the greatest lower row.
- [x] AC-11 — Conductivity processing order is multiply by `1.43`, round C to two decimals, cap at `80.00`, then exact/next-lower table selection.
- [x] AC-12 — Converted C above 80 is accepted and uses the `80.0` Salts row without a scoring blocker.
- [x] AC-13 — Hydration Score uses only Carbohydrate and Salts losses with equal weights.
- [x] AC-14 — Health Score uses only Carbohydrate, Urine pH, Saliva pH and Salts losses with equal weights.
- [x] AC-15 — The workbook example produces persisted scores `0.919701` and `0.906684`.
- [x] AC-16 — Urea is absent, not zero-filled, and cannot block v2 scoring.
- [x] AC-17 — Average pH is not calculated, looked up, persisted as a required v2 field or displayed.

## Persistence and compatibility

- [x] AC-18 — Migration `0024` is additive and leaves migration `0009` unchanged.
- [x] AC-19 — All v1 lookup rows, Urea data, Average-pH data and score snapshots remain unchanged and readable.
- [x] AC-20 — New separate pH lookup references/loss snapshots and conductivity audit values are persisted with v2.
- [x] AC-21 — Urea remains retained for historical/future use but is optional and hidden for new v2 capture.
- [x] AC-22 — Version-aware constraints accept valid v1 and v2 records and reject internally inconsistent snapshots.
- [x] AC-23 — No historical score is backfilled or recalculated.

## Trainer surface and fail-closed content

- [x] AC-24 — Current trainer capture/review/result UI contains no visible Urea or Average-pH field.
- [x] AC-25 — New submissions require the four accepted measurements and no Urea input.
- [x] AC-26 — Numeric Hydration and Health scores remain available when v2 scoring succeeds.
- [x] AC-27 — Production zones, thresholds, recommendations, today guidance, final terminology, disclaimers and escalation remain unavailable and are not inferred from fixtures.

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

- [x] AC-28 — The 44/44 new focused assertions pass.
- [x] AC-29 — Existing `npm run test:domain` passes, including v1 scoring, recommendation scaffold, workflow and Sprint 025 authority regressions.
- [x] AC-30 — `npm run typecheck` passes.
- [x] AC-31 — `npm run lint` passes with zero warnings.
- [x] AC-32 — `npm run build` passes.
- [x] AC-33 — `npm run validate:json` and `npm run validate:static` pass.
- [x] AC-34 — Migration SQL receives deterministic static/self-test proof; equivalent stronger local proof may substitute for an unavailable database container.
- [x] AC-35 — `git diff --check` passes; changed-file scans find no credential or identifiable horse/person data.
- [x] AC-36 — Staged count, external mutation count and external residue count are all zero.

## Closeout

- [x] AC-37 — `planning/ARCHITECT_BRIEFING.md`, both roadmaps, state, status, schedule, lifecycle ledger, decisions, risks, questions, evidence index and Final Product Acceptance Matrix are reconciled proportionately.
- [x] AC-38 — Runtime acceptance is claimed only from executable local proof; no Production/live claim is made.
- [x] AC-39 — The report states whether any manual or user action remains and ends with `I need nothing from you.` when none remains.

## Closeout evidence — 2026-08-10

Outcome: `four-loss-scoring-source-and-versioned-migration-local-complete-clean`.

- Canonical CWD/Git root passed; branch `codex/025B-versioned-domain-authority-package`; starting/final HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`; staged count `0`.
- Source integrity passed `12/12`; generated fixture/migration contain exactly `1,816` v3 rows (`151 + 432 + 432 + 801`) from the accepted private workbook SHA-256. The workbook remained read-only and outside the repository.
- Focused proof passed `44/44`: scoring `18/18`, migration `8/8`, workflow `6/6`, plus source `12/12`.
- Retained domain suite, typecheck, zero-warning lint, Production build, JSON validation, remaining static validation and `git diff --check` passed. The static wrapper's only stop was its pre-existing migration-ledger helper hardcoded through `0023`; the remaining role validator passed directly and the independent Inspector accepted this equivalent proof under the Evidence-Proportional standard.
- Critical plan review passed after `PLAN-001` through `PLAN-003`; the bounded retained-harness correction and the focused repair plan also passed fresh review.
- Critical inspection passed after resolving `INSPECT-001` through `INSPECT-004`, including exhaustive conductivity agreement, the inclusive `15.0` Carbohydrate maximum, v3 loss attribution, cross-table snapshot validation and PostgreSQL NULL semantics.
- Credential and identifiable-person scans returned `0/0`. External mutation/residue counts are `0/0`; no remote migration, deployment, credential, email, enquiry, alias action, stage, commit or push occurred.
- Runtime acceptance is local executable evidence only. Production thresholds, zones, recommendations, today guidance, final terminology, disclaimers and escalation remain unavailable.
- Manual/user action required for this closed sprint: none.

I need nothing from you.