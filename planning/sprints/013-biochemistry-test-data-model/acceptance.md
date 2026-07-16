# Sprint 013 - Biochemistry Test Data Model Acceptance

## Required Acceptance Criteria

- Architect Pack 013 is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 013.
- Builder reads the Sprint 013 four-file sprint set before implementation.
- Supplied reading-table CSV is copied into project references or exact source-access blocker is documented.
- Carbs, pH Average, Salts, and Urea lookup structures are documented.
- pH uses `pH Average = (pH Saliva + pH Urine) / 2`.
- No `calibrated` pH wording or concept is introduced.
- Lookup behavior is exact-match only.
- Formula inputs use adjacent energy-loss lookup values.
- Hydration and Health Score formulas are documented and represented in the data model.
- Conductivity stores raw meter value and converted C value; converted C value uses multiplier `1.43` and is used for Salts lookup.
- Test records are modeled as horse/date records with all readings entered together.
- Upload model supports PDF, CSV, PNG, JPG/JPEG/photo files with 2 MB limit.
- Uploads are scoped to horse/test context.
- Vet/staff/trainer/stable/horse access boundaries are represented or explicitly scaffolded.
- Staff can add tests/notes/uploads but cannot delete.
- Vets are read-only for assigned horses constrained by trainer/stable.
- Delete is admin/trainer only and modeled as soft-delete/audit first.
- Hard delete is not normal workflow.
- Pricing doc records shop-written Professional Kit and Monthly Service pricing and older conflicting evidence.
- Public under-construction gate remains active; public shop is not reopened.
- No remote migration, production data mutation, deployment, push, PR, DNS, Vercel setting, Supabase setting, Stripe product/price, or live financial action is performed.
- Validation is run and recorded, or blocked with exact evidence and manual intervention steps.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Formula Acceptance Matrix

| Item | Accepted rule |
|---|---|
| pH Average | `(pH Saliva + pH Urine) / 2` |
| Hydration Score Energy Loss | `(Carbs Loss + Salts Loss) / 2` |
| Hydration Score | `1 - Hydration Score Energy Loss` |
| Health Score Energy Loss | `(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4` |
| Health Score | `1 - Health Score Energy Loss` |
| Lookup | exact reading to adjacent loss value |
| Salts | lookup uses converted C value |

## Pricing Acceptance Matrix

| Service | Accepted source-of-truth price |
|---|---:|
| Professional Kit | `$4,500 one-off plus Postage` |
| Monthly Service | `$120 per horse or P.O.A`, unlimited testing |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
