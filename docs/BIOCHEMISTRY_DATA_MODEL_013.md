# Sprint 013 - Biochemistry Data Model

## Status

Implemented locally on 2026-07-16. No remote Supabase migration was applied.

This sprint creates the source-controlled data foundation for horse-based biochemistry tests, exact reading-to-loss lookups, score snapshots, upload metadata, notes, access scaffolding, and soft-delete/audit behavior.

## Source Evidence

The supplied reading table was copied into project references:

`references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv`

Original source path:

`C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Reading Tables v1.csv`

The CSV includes formula rows followed by side-by-side lookup tables for Carbs, pH Average, Salts, and Urea. Sprint 013 parsed numeric lookup rows only and ignored repeated label/header rows.

Parsed lookup counts:

| Lookup type | Rows |
|---|---:|
| Carbs | 151 |
| pH Average | 521 |
| Salts | 801 |
| Urea | 301 |

## Local Migration

Created:

`supabase/migrations/0009_biochemistry_test_data_model.sql`

The migration creates:

| Table / function | Purpose |
|---|---|
| `biochemistry_lookup_values` | Exact reading-to-loss source table for Carbs, pH Average, Salts, and Urea. |
| `biochemistry_horse_access_assignments` | Trainer-nominated horse/stable access scaffold for trainer, staff, vet, and owner roles. |
| `biochemistry_tests` | One horse/date test record containing all client-entered readings, derived values, lookup-loss snapshots, scores, status, and audit fields. |
| `biochemistry_test_uploads` | Test-scoped upload metadata with type and size constraints. |
| `biochemistry_test_notes` | Test-scoped notes. |
| `can_read_biochemistry_horse()` | Read helper for assigned/admin/explicit biochemistry access. |
| `can_write_biochemistry_horse()` | Write helper for trainers, nominated staff, writable stable scope, and admins. |
| `can_soft_delete_biochemistry_horse()` | Delete-authority helper limited to admin/trainer-style management access. |

## Lookup Representation

Lookup values are exact-match only.

Each lookup row stores:

- `lookup_type`: `carbs`, `ph_average`, `salts`, or `urea`
- `exact_reading`: numeric representation of the source reading
- `exact_reading_text`: original source reading text
- `loss_fraction`: decimal fraction used by formulas, for example `96.00%` is stored as `0.960000`
- `loss_percent_text`: original source percentage text
- `increment_fraction` and `increment_percent_text` where supplied
- source document/version/row number

Numeric formatting such as `14.30` and `14.3` may be represented by the same numeric value. That is representation normalization only; it is not rounding, nearest-match, interpolation, or next-lower lookup behavior.

If an exact lookup is missing, the data model supports `scoring_status = 'blocked'` or `unscored` with `scoring_blockers` JSON rather than guessed scores.

## Formula Model


Approved formulas represented by the model:

| Item | Rule |
|---|---|
| pH Average | `(pH Saliva + pH Urine) / 2` |
| Hydration Score Energy Loss | `(Carbs Loss + Salts Loss) / 2` |
| Hydration Score | `1 - Hydration Score Energy Loss` |
| Health Score Energy Loss | `(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4` |
| Health Score | `1 - Health Score Energy Loss` |

`biochemistry_tests` stores raw readings, derived readings, lookup value IDs, lookup loss fractions, computed score fields, `formula_version`, lookup source/version, scoring status, and blockers so later UI or reports can show auditable score snapshots.

Current formula version:

`biochemistry-score-v1`

## Conductivity / Salts

The model stores both:

- `conductivity_raw_meter_value`
- `conductivity_converted_c_value`

Conversion rule:

`converted C = raw meter value * 1.43`

The converted C value is the value used for Salts lookup. Display should append `C`, for example `10ms` becomes `14.3C`.

## Test Grouping

A biochemistry test belongs to a horse and date. All client-entered readings are stored together in one `biochemistry_tests` row:

- Carbs
- pH Saliva
- pH Urine
- Salts/conductivity raw meter value
- Urea

The migration includes a soft uniqueness rule for active rows by `horse_id`, `test_date`, and `time_of_day`. `time_of_day` supports `am`, `pm`, and `unspecified` so later workflow can support AM/PM capture without changing the basic horse/date grouping.

## Upload Model

Uploads are scoped to a horse/test context through `biochemistry_test_uploads`.

Allowed file categories:

- PDF
- CSV
- PNG
- JPG/JPEG
- photo

Size limit:

`2 MB` per file, enforced as `size_bytes <= 2097152`.

Sprint 013 stores metadata only. It does not create Supabase Storage buckets, upload UI, OCR, or file-processing behavior.

## Notes Model

`biochemistry_test_notes` stores notes attached to the test/horse context. Notes are not loose standalone upload attachments.

## Access Model

The migration keeps existing assignment concepts and adds biochemistry-specific access scaffolding.

| Role | Intended access |
|---|---|
| Admin | Full access. |
| Trainer | Full access for assigned/manageable horses, including tests, notes, uploads, and soft delete. |
| Staff | Trainer-nominated horse/stable access; can add tests, notes, and uploads when access level is `write` or `manage`. Staff cannot delete through the delete helper unless they separately satisfy trainer/admin management access. |
| Vet | Read-only for assigned horses constrained by trainer/stable through explicit biochemistry access rows. |
| Owner | Read-only where existing owner access applies. |

Normal hard delete is not modeled. Delete behavior is soft-delete/audit first via `deleted_at`, `deleted_by_user_id`, and `delete_reason` fields.

## RLS / Policy Scaffold

The migration enables RLS on all new biochemistry tables.

Read policies use horse access or explicit biochemistry access. Write policies use trainer/admin existing horse management, explicit trainer/staff write access, or writable stable scope. Soft-delete authority is represented separately and intentionally excludes ordinary staff/vet read access.

## TypeScript Domain Contract

Created:

`lib/domain/biochemistry.ts`

This file provides constants and types for formula version, lookup source, upload size, access roles, score snapshot shape, and helper functions for pH Average and conductivity C conversion.

## Manual Intervention: Remote Migration

Blocked item: remote Supabase migration application.

Evidence checked:

- Local source-controlled migration was created.
- Sprint 013 explicitly forbids remote Supabase migration application.
- No remote Supabase command was run.

Exact user/operator action needed:

After review and explicit authorization in a future sprint, apply `supabase/migrations/0009_biochemistry_test_data_model.sql` to the intended Supabase environment.

Step-by-step action instructions:

1. Review the migration and this data-model document.
2. Confirm exact lookup counts and access model with the product owner/domain owner.
3. Back up or snapshot the target Supabase environment.
4. Apply the migration through the approved Supabase migration path.
5. Run non-destructive checks for table creation, lookup row counts, RLS status, and helper functions.

Builder will verify after action:

- new tables exist
- lookup counts match Carbs `151`, pH Average `521`, Salts `801`, Urea `301`
- RLS is enabled on new tables
- helper functions exist
- no public shop/website reopening occurred

## Deferred To Later Sprints

- scoring service and fixtures
- mobile capture UI
- upload UI/storage bucket policies
- OCR/photo extraction
- voice-to-text provider integration
- trend charts
- Table of Knowledge recommendation content
- remote migration application
