# Sprint 013 - Biochemistry Test Data Model Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user authorized creation of Architect Pack 013 and supplied the domain inputs required before the Biochemistry Test Data Model sprint.

Sprint 012F is complete, production-deployed, and production-smoked. The public website/shop remain hidden behind the under-construction gate until the user explicitly approves reopening public website/shop surfaces.

## Goal

Create the durable data foundation for the trainer-facing biochemistry test workflow without inventing domain behavior.

Sprint 013 should design and implement local/source-controlled schema and documentation for horse-based test records, lookup tables, score snapshots, uploads, access boundaries, soft-delete/audit behavior, and the current service pricing truth needed for later launch readiness.

No remote production migration is authorized in Sprint 013.

## Source Inputs

Domain table source provided by user:

`C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Reading Tables v1.csv`

Pricing source requested by user:

`.release-main/app/shop/page.tsx`, specifically the shop-written pricing panel.

Current public shop is intentionally hidden by Sprint 012F. Sprint 013 must not reopen public shop pages.

## Approved Domain Rules

Builder must use these rules exactly:

- Do not use the concept or wording of `calibrated` for pH.
- A test belongs to a horse and date; all readings go in together to form one test.
- Client-entered readings include Carbs, pH Saliva, pH Urine, Salts/conductivity, and Urea.
- `pH Average = (pH Saliva + pH Urine) / 2`.
- Lookup values are exact. The exact reading maps to the adjacent energy-loss value in the lookup table.
- The energy-loss value, not the raw reading, is applied inside formulas.
- `Hydration Score Energy Loss = (Carbs Loss + Salts Loss) / 2`.
- `Hydration Score = 1 - Hydration Score Energy Loss`.
- `Health Score Energy Loss = (Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`.
- `Health Score = 1 - Health Score Energy Loss`.
- Horiba is a meter. All conductivity meters read in microsiemens / ms and must be converted to a C reading by multiplying the meter result by `1.43`.
- Conductivity/salts display must show the converted C value with a `C` suffix, for example `10ms` becomes `14.3C`.
- The salts lookup table uses the final C value.
- Upload file types: PDF, CSV, PNG, photographs, JPEG/JPG.
- Upload size limit: 2 MB per file.
- Uploads attach to the horse/test context. They are not loose standalone note attachments for Sprint 013.
- Vets are read-only for assigned horses, constrained by trainer and stable.
- Staff can have full access when nominated by trainer for a horse and stable, including adding tests, notes, and uploads.
- Delete access needs another/higher level.
- Delete permission is admin/trainer only.
- Preferred delete behavior is soft delete with audit trail, not hard delete.
- Regular staff cannot delete.
- Vets remain read-only.
- Hard delete should be avoided unless a future approved admin maintenance process explicitly requires it.

## Pricing Rules To Carry Forward

Per the user request, include service pricing from the shop in Sprint 013 evidence/business readiness docs.

Treat `.release-main/app/shop/page.tsx` as the source authority for the currently written shop pricing:

| Service | Price | Notes |
|---|---:|---|
| Professional Kit | `$4,500` | one-off plus Postage |
| Monthly Service | `$120 per horse or P.O.A` | Unlimited testing |

Conflicting older seed/source values exist and must not be silently treated as authoritative:

- current active `supabase/migrations/0007_test_product_seeds.sql` contains older fallback products unrelated to the new shop-written services
- `.release-main/supabase/migrations/0008_professional_equipment_products.sql` seeded Professional Kit at `$2,500 AUD` and Monthly Service at `$600 AUD`
- `.release-main/supabase/migrations/0014_update_professional_kit_price.sql` updated Professional Kit to `$3,500 AUD`
- `.release-main/lib/domain/products.ts` fallback lists Professional Kit `$3,500 AUD`, Monthly Service `$120 AUD`, and Kit Buyback `$500 AUD`

Sprint 013 should document this conflict and use the shop-written values above as the latest business-pricing truth unless the user corrects it.

## In Scope

Builder may:

- copy the supplied reading-table CSV into project references if not already present, preserving the source path in documentation
- inspect and parse the CSV to understand table columns and exact lookup values
- create local Supabase migration(s) for biochemistry test data model tables
- add lookup/source tables or seed structures for Carbs, pH Average, Salts, and Urea exact reading-to-loss mappings
- model raw readings, converted conductivity C value, lookup losses, score snapshots, uploads, notes, creator, timestamps, soft-delete fields, and audit fields
- model horse/date/test grouping so all readings submitted together form one test record
- model attachment metadata for test-scoped files with allowed types and 2 MB limit
- model assignment/access boundaries for trainer, vet, stable staff, owner, and admin around trainer/stable/horse relationships
- add local RLS policies or policy scaffolds for the new tables, if consistent with existing auth patterns
- update generated Supabase bootstrap SQL if local migration scripts require it
- update TypeScript/domain types if needed to keep local validation green
- document the formulas, lookup rules, pricing truth, access boundaries, and open questions
- update planning state/status/briefing/decisions/risks/questions/schedule
- run lint, TypeScript, build, and migration/bundle validation locally

## Out Of Scope

Builder must not:

- apply migrations to remote Supabase
- mutate production data
- deploy to Vercel
- reopen the public website/shop hidden by Sprint 012F
- create live Stripe products, prices, subscriptions, charges, refunds, payouts, or tax changes
- change DNS, Vercel settings, Supabase project settings, or Stripe account settings
- add OCR/photo extraction, voice-to-text provider integration, scoring UI, trend charts, or mobile test capture UI
- invent missing Table of Knowledge recommendation content
- invent non-exact lookup behavior such as rounding, nearest match, interpolation, or next-lower matching
- store visitor/public interest sign-up data
- hard-delete test records/files as normal workflow
- expose secret values or secret fragments

## Approved File Set

Builder may edit:

- `supabase/migrations/**`
- `supabase/bootstrap/remote-init.sql`, if regenerated by the existing db bundle workflow
- `lib/domain/**`, only for local biochemistry/pricing/domain types needed by the data model
- `types/**`, if present or needed for local domain types
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `docs/PRICING_013.md`
- `references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv`, if copying the user-supplied source into project references
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
- `.env*` names/presence only, no values
- `.release-main/**`, for pricing/source comparison only
- `C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Reading Tables v1.csv`, read/copy only

## Required Output

Builder must produce:

- local migration file(s) or a documented blocker if schema cannot be safely produced
- copied/reference CSV or exact source path evidence
- lookup-table design for exact reading-to-loss mappings
- formulas documented with no `calibrated` wording
- conductivity raw-to-C conversion model
- upload metadata/storage policy design with 2 MB/type limits
- trainer/stable/horse assignment access model for vets and staff
- soft-delete/audit model
- pricing doc carrying the shop-written services/prices and conflicting older evidence
- validation results
- manual-intervention instructions for any remote migration, production data, or pricing correction still needed

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
