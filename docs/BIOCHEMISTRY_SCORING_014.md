# Sprint 014 - Biochemistry Scoring Service

## Status

Implemented locally on 2026-07-16. No UI, remote Supabase migration, production data mutation, deployment, push, PR, Stripe change, or public shop reopening was performed.

## Source Inputs Used

Sprint 014 uses the Sprint 013 source-controlled evidence:

- `references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv`
- `supabase/migrations/0009_biochemistry_test_data_model.sql`
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `lib/domain/biochemistry.ts`

The preserved CSV provides exact reading-to-loss tables for Carbs, pH Average, Salts, and Urea. Sprint 013 stores source loss percentages as decimal fractions, for example `77.67%` becomes `0.7767`.

## Implemented Files

- `lib/domain/biochemistry.ts`: scoring constants, types, exact lookup indexing, pH Average, conductivity conversion, Hydration Score, Health Score, and blocked/unscored result handling.
- `references/fixtures/biochemistry-scoring-014.json`: source-backed fixture subset.
- `scripts/validate-biochemistry-scoring.ts`: local fixture assertion script.

## Formula Version

`biochemistry-score-v1`

The scoring snapshot returns this formula version plus lookup source document/version so database snapshots remain compatible with the Sprint 013 model.

## Exact Lookup Behavior

Lookup is exact by `lookupType` plus normalized numeric reading. The service does not perform nearest-match, next-lower, next-higher, interpolation, fallback, or default-loss behavior.

Numeric representation is normalized to the Sprint 013 database scale of six decimal places. This is representation normalization for equivalent numeric values such as `14.30` and `14.3`; it is not domain rounding or fuzzy lookup.

If any exact lookup is missing, the result is `scoringStatus: "blocked"` and includes a non-sensitive blocker with:

- lookup type
- exact reading attempted
- reason `missing_exact_lookup`

Blocked results do not return guessed Hydration Score or Health Score values.

## Derived Readings

pH Average:

`(pH Saliva + pH Urine) / 2`

Conductivity converted C value:

`raw meter reading * 1.43`

Salts lookup uses the converted C value. Display should append the `C` suffix in UI later; Sprint 014 does not build UI.

## Score Formulas

Hydration Score Energy Loss:

`(Carbs Loss + Salts Loss) / 2`

Hydration Score:

`1 - Hydration Score Energy Loss`

Health Score Energy Loss:

`(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`

Health Score:

`1 - Health Score Energy Loss`

## Fixture Summary

The scored fixture uses:

| Input | Value | Notes |
|---|---:|---|
| Carbs | 2.5 | Carbs loss `77.67%` / `0.7767`. |
| pH Saliva | 6.4 | Produces pH Average with pH Urine. |
| pH Urine | 6.6 | Produces pH Average `6.5`. |
| Conductivity raw meter reading | 10 | Converts to `14.3C`; Salts loss `10.89%` / `0.1089`. |
| Urea | 2.5 | Urea loss `56.00%` / `0.56`. |

Expected scored output:

| Output | Value |
|---|---:|
| pH Average | 6.5 |
| Conductivity converted C | 14.3 |
| Hydration Score Energy Loss | 0.4428 |
| Hydration Score | 0.5572 |
| Health Score Energy Loss | 0.440575 |
| Health Score | 0.559425 |

Blocked fixtures cover missing exact lookup cases for:

- Carbs
- pH Average
- Salts after C conversion
- Urea

## Validation Results

Focused fixture validation command:

`node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts`

Result: passed with exit code `0`.

TypeScript validation:

`powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`

Latest result during implementation: exited `0` with no stdout/stderr tail.

Final Sprint 014 validation:

- Fixture script passed with exit code `0` using project-local Node at `node_modules/node/bin/node.exe`.
- `npm run lint` passed with bounded wrapper status `exited 0`.
- `npx tsc --noEmit --incremental false` passed after the successful build regenerated `.next/types`; bounded wrapper status `exited 0`.
- Sandboxed `npm run build` hit the known `spawn EPERM` restriction.
- Outside-sandbox bounded `npm run build` passed with status `exited 0` and generated 23 routes.

## Manual Intervention

No scoring implementation blocker remains locally.

Manual/future action: remote Supabase migration application remains outside Sprint 014.

Evidence checked:

- Sprint 013 migration and data model exist locally.
- Sprint 014 scoring uses local source-controlled lookup fixtures and domain code only.
- No remote Supabase command was run.

Exact user/operator action needed:

When production biochemistry storage is approved, apply the Sprint 013 migration through the approved Supabase path and run post-apply checks.

Step-by-step action instructions:

1. Review `supabase/migrations/0009_biochemistry_test_data_model.sql`.
2. Confirm exact lookup counts and fixture expectations with the product/domain owner.
3. Back up or snapshot the target Supabase environment.
4. Apply the migration through the approved Supabase migration path.
5. Run non-destructive checks for new tables, lookup counts, RLS, and helper functions.
6. Run scoring service checks against production-like fixture rows before enabling capture UI.

Builder will verify after action:

- lookup counts match Sprint 013 evidence
- score snapshots can be produced from exact lookup rows
- missing lookup rows remain blocked/unscored
- no public shop/website reopening occurred
