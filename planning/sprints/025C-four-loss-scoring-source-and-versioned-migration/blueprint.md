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
