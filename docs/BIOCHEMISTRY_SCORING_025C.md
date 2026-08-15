# Biochemistry Scoring 025C

## Delivered contract

New biochemistry tests use formula version `biochemistry-score-v2` and lookup source version `v3`. The accepted workbook is read only during deterministic extraction and is not stored in this repository.

The four independent loss lookups are:

- Carbohydrate, accepted from `0.0%` through `15.0%` inclusive in `0.1%` increments;
- Urine pH;
- Saliva pH; and
- Salts, selected from converted conductivity C.

Exact readings select the exact table row. Otherwise the scorer selects the greatest table reading below the accepted lookup input. It does not interpolate, extrapolate or derive table losses.

## Conductivity

The raw trainer value remains in mS/cm. v2 multiplies it by `1.43`, rounds half-up to two decimals in the same way as PostgreSQL numeric arithmetic (`26.50` becomes `37.90`), caps the effective C value at `80.00`, then selects the exact or greatest-lower Salts row. The raw measurement, effective C and selected Salts reading remain distinct audit values. Raw measurements through `99.00` are accepted even when their conversion is capped.

## Scores

`Hydration Score = 1 - ((Carbohydrate Loss + Salts Loss) / 2)`

`Health Score = 1 - ((Carbohydrate Loss + Urine pH Loss + Saliva pH Loss + Salts Loss) / 4)`

The accepted workbook example persists Hydration `0.919701` and Health `0.906684`.

Average pH and Urea do not contribute to v2. Urea fields, lookup rows and historical values remain retained for v1 compatibility and possible future separately approved use; new v2 submissions do not display, require or synthesize Urea.

## Persistence and compatibility

Migration `0024_versioned_four_loss_biochemistry_scoring.sql` is additive. It widens lookup types, adds separate pH and conductivity audit snapshots, makes legacy-only inputs nullable for v2, applies version-aware consistency checks and seeds exactly 1,816 v3 rows. It does not backfill or recalculate historical tests.

Stored results are reconstructed by `formula_version`. Historical `biochemistry-score-v1` records keep their original Average-pH/Urea formula and source identity; new records use the separate four-loss v2 shape.

## Fail-closed boundary

This sprint supplies numeric scoring only. It does not activate production zones, thresholds, recommendations, today guidance, terminology, diagnosis, prognosis, treatment, dose, disclaimer or escalation content. Those surfaces remain unavailable without separately approved authority.

## Verification

The focused proof contains exactly 44 assertions: 12 source/table integrity, 18 scoring/transformation, 8 migration/version compatibility and 6 capture/result/fail-closed UI assertions. The retained v1/domain suite, TypeScript, lint, Production build, JSON/static validation and migration self-test are the required local gates. No remote migration or Production action is part of Sprint 025C.
