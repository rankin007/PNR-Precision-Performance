# Sprint 018 - Biochemistry Capture Results

## Status

Sprint 018 implemented a local authenticated mobile biochemistry capture/results foundation under the operations area.

No remote Supabase migration, production data mutation, deployment, push, PR, Stripe change, public reopening, uploads, OCR, voice-to-text provider integration, trend chart, production threshold, or Table of Knowledge recommendation content was added.

## Implemented Routes

| Route | Purpose |
|---|---|
| `/data-entry/biochemistry` | Mobile-first manual biochemistry test capture form for operational writers. |
| `/data-entry/biochemistry/[testId]` | Saved result review route for scoring snapshots and blocked/unavailable states. |

Both routes live behind the existing operations layout and `requireOperationalWriteAppContext` guard.

## Capture Fields

The capture form includes:

- horse
- test date
- time of day: `AM`, `PM`, or `Unspecified`
- Carbs
- pH Saliva
- pH Urine
- raw conductivity meter value
- Urea
- optional manual notes

Required fields are checked before scoring or persistence. Invalid numeric readings return a non-sensitive form error.

## Scoring Behavior

Sprint 018 uses `scoreBiochemistryReadings` from `lib/domain/biochemistry.ts`.

Preserved rules:

- exact lookup only
- no rounding, interpolation, nearest, next-lower, fallback, or default lookup behavior
- pH Average is `(pH Saliva + pH Urine) / 2`
- conductivity converted C is `raw meter value * 1.43`
- Salts lookup uses converted C
- Hydration Score and Health Score use the Sprint 014 formulas

If a required exact lookup row is missing, the test is stored as blocked/unscored and no guessed score is returned.

## Persistence Behavior

When Supabase is configured and the Sprint 013 biochemistry schema exists, the server action:

1. verifies the submitted horse is accessible through the existing operations pattern
2. loads `biochemistry_lookup_values`
3. scores the readings using Sprint 014 logic
4. inserts into `biochemistry_tests`
5. inserts a `biochemistry_test_notes` row when notes are supplied
6. redirects to `/data-entry/biochemistry/[testId]`

If Supabase is not configured or the remote schema is missing, the UI returns a clear blocked state instead of crashing or exposing raw database details.

## Zones And Recommendations

Sprint 018 does not invent production Green/Amber/Red thresholds and does not invent Table of Knowledge advice.

The result page calls the Sprint 015 zone/recommendation helpers with no production thresholds or rules, so output remains unavailable/blocked until approved inputs are supplied.

## Files Added Or Updated

- `app/(ops)/data-entry/biochemistry/actions.ts`
- `app/(ops)/data-entry/biochemistry/page.tsx`
- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`
- `components/ops/biochemistry-result-panel.tsx`
- `lib/navigation.ts`

## Manual Intervention: Remote Supabase Migration

Blocked item: live biochemistry persistence depends on the Sprint 013 migration existing in the target Supabase environment.

Evidence checked:

- Sprint 013 migration exists locally at `supabase/migrations/0009_biochemistry_test_data_model.sql`.
- Sprint 018 did not apply remote migrations.
- The server action handles missing schema as `biochemistry-schema-unavailable`.

Exact user/operator action needed:

Apply the Sprint 013 migration through an explicitly authorized Supabase migration path.

Step-by-step instructions:

1. Review `supabase/migrations/0009_biochemistry_test_data_model.sql`.
2. Confirm the target Supabase environment.
3. Back up or snapshot the target environment.
4. Apply the migration through the approved Supabase dashboard/CLI path.
5. Run non-destructive checks for table existence, lookup counts, RLS, and helper functions.

Builder will verify after action:

- lookup counts match Carbs `151`, pH Average `521`, Salts `801`, Urea `301`
- `/data-entry/biochemistry` can submit a test with configured credentials and fixtures
- missing exact lookups still block scoring
- no public site/shop reopening occurred

## Manual Intervention: Production Thresholds

Blocked item: production Green/Amber/Red thresholds are not supplied.

Action needed: provide approved Hydration Score and Health Score threshold sets with source/version metadata.

Builder will verify: supplied thresholds classify scores and missing/incomplete thresholds still block.

## Manual Intervention: Recommendation Content

Blocked item: approved Table of Knowledge recommendation rules are not supplied.

Action needed: provide active approved rule content by score kind, zone, category, and level with source/version metadata.

Builder will verify: active rules generate snapshots, draft/inactive rules do not emit, and missing rules remain unavailable.

## Validation

Final validation passed on 2026-07-17:

- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts` - passed.
- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts` - passed.
- `npm run lint` - passed.
- `npx tsc --noEmit --incremental false` - passed.
- `npm run build` - passed through the known outside-sandbox path after the sandboxed build hit `spawn EPERM`.
- Built-server route smoke - passed.

Route smoke results:

| Route | Result |
|---|---|
| `/api/health` | `200` |
| `/data-entry/biochemistry` | `307` to `/sign-in?next=%2Fdata-entry` for anonymous access |
| `/data-entry/biochemistry/sample-result` | `307` to `/sign-in?next=%2Fdata-entry` for anonymous access |

The route smoke confirms the operations auth guard redirects anonymous access rather than exposing the workflow publicly.
