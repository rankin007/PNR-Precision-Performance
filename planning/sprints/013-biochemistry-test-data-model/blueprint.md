# Sprint 013 - Biochemistry Test Data Model Blueprint

## Execution Shape

Sprint 013 is the data foundation sprint for the full biochemistry workflow. It should produce source-controlled local schema/design evidence only. It must not mutate production Supabase or reopen public shop/website surfaces.

Run the work in this order:

1. Establish current branch, commit, and dirty status.
2. Read Sprint 013 requirements, current state, briefing, definition of Done, domain/risk/question files, and relevant Supabase/auth patterns.
3. Copy or reference the supplied `Reading Tables v1.csv` source.
4. Parse and document Carbs, pH Average, Salts, and Urea exact lookup structure.
5. Design local schema for tests, readings, lookup losses, score snapshots, uploads, notes, soft-delete/audit fields, and access boundaries.
6. Design/update local migration(s) and RLS/policy scaffolds, preserving existing behavior.
7. Document formulas, pricing, access, upload limits, and deferred items.
8. Validate locally.
9. Update planning docs and stop before remote migration/deployment.

## Data Model Guidance

Recommended entities or equivalent local pattern:

- `biochemistry_tests`
  - horse id
  - trainer/stable context where needed for RLS
  - test date
  - optional time of day / AM-PM marker if already supported by existing patterns, otherwise defer with documented field choice
  - raw/client-entered readings
  - converted conductivity C value
  - pH average value
  - lookup loss snapshots
  - hydration score energy loss
  - hydration score
  - health score energy loss
  - health score
  - created by
  - created/updated timestamps
  - soft-delete fields such as deleted_at/deleted_by/delete_reason

- `biochemistry_lookup_values` or equivalent
  - lookup type: carbs, ph_average, salts, urea
  - exact reading value
  - loss value
  - increment/source columns if needed for auditability
  - source document/version

- `biochemistry_test_uploads` or equivalent
  - test id
  - horse id if useful for policy checks
  - file name
  - content type
  - size bytes
  - storage path or future storage key
  - uploaded by
  - created_at
  - soft-delete/audit fields

- `biochemistry_test_notes` or equivalent
  - test id
  - note text
  - note type/source if useful
  - created by
  - created_at
  - soft-delete/audit fields

If the existing schema has better names/patterns, follow them, but keep the domain behavior above intact.

## Formula Model

Store enough snapshots so later scoring remains auditable:

- raw/client-entered reading values
- exact lookup loss values used at the time of scoring
- formula version/source
- computed score values

Use numeric percentages consistently. If lookup table stores `96.00%`, Builder must choose and document whether source-controlled schema stores it as `0.96` or `96.00`, then formulas must be consistent.

Do not invent rounding, nearest-match, interpolation, or fallback behavior. If exact lookup is missing, data model should support a blocked/unscored status rather than guessed score.

## Conductivity / Salts Model

Model both:

- raw meter reading in ms / microsiemens as entered by client
- converted C value = raw meter reading * `1.43`

The converted value is displayed with `C` suffix and is used for Salts lookup.

## Upload Model

Allowed file categories:

- PDF
- CSV
- PNG
- JPEG/JPG
- photographs represented by image content types

Limit:

- 2 MB per file

Scope:

- horse/test context
- not loose note-scoped storage in Sprint 013

## Access Model

Use existing assignment concepts where possible.

- Trainer: full access to assigned horses/stables, including creating tests, notes, and uploads.
- Vet: read-only for assigned horses, constrained by trainer and stable.
- Staff: trainer-nominated for horse and stable; can add tests, notes, and uploads.
- Staff cannot delete.
- Owner: read-only if existing owner role applies.
- Admin: full access.
- Delete: admin/trainer only, soft-delete/audit preferred.
- Hard delete: not normal workflow; future approved admin maintenance only.

## Pricing Documentation

Create `docs/PRICING_013.md` with the shop-written pricing truth:

| Service | Price | Notes |
|---|---:|---|
| Professional Kit | `$4,500` | one-off plus Postage |
| Monthly Service | `$120 per horse or P.O.A` | Unlimited testing |

Also document conflicting older source evidence and mark it not authoritative unless the user corrects it.

Do not reopen public shop routes. Do not create live Stripe products/prices.

## Validation

Required checks:

- `git status --short`
- CSV/source inspection summary
- migration syntax/source inspection
- `npm run db:bundle` if migration files changed and the script remains the project pattern
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox build fails for known process-spawn or Next startup reasons, request outside-sandbox bounded validation and record both outcomes.

## Stop Conditions

Stop and ask before:

- applying remote Supabase migrations
- changing production data
- deploying
- reopening public shop/website
- adding Stripe live/test products or prices
- adding visitor sign-up storage
- changing auth/RLS beyond local source-controlled policy/migration work in this sprint
- inventing lookup or formula behavior not supplied by the user
- hard-deleting records or designing normal hard-delete workflow
