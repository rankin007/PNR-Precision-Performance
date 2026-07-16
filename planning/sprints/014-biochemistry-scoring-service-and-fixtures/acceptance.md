# Sprint 014 - Biochemistry Scoring Service And Fixtures Acceptance

## Required Acceptance Criteria

- Architect Pack 014 is saved and applied before Builder implementation begins.
- `planning/STATE.md` says implementation is authorized for Sprint 014 before Builder edits source files.
- Builder confirms Sprint 013 is complete or explicitly complete enough for scoring work.
- Builder reads the Sprint 014 four-file sprint set before implementation.
- Builder reads Sprint 013 closeout evidence and the preserved Reading Tables source.
- Scoring implementation uses exact lookup only.
- No rounded, interpolated, nearest, next-lower, or default lookup behavior is introduced.
- pH uses `pH Average = (pH Saliva + pH Urine) / 2`.
- No `calibrated` pH wording or concept is introduced.
- Conductivity stores/uses raw meter input and converted C value using multiplier `1.43`.
- Salts lookup uses converted C value.
- Hydration Score Energy Loss uses `(Carbs Loss + Salts Loss) / 2`.
- Hydration Score uses `1 - Hydration Score Energy Loss`.
- Health Score Energy Loss uses `(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`.
- Health Score uses `1 - Health Score Energy Loss`.
- Scoring output includes or documents a formula version.
- Scoring output includes or documents score snapshot fields compatible with Sprint 013 schema.
- Missing exact lookup values return blocked/unscored state rather than guessed scores.
- Fixture-backed examples or validation evidence cover scored and missing-lookup cases.
- `docs/BIOCHEMISTRY_SCORING_014.md` is created.
- Public under-construction gate remains active.
- Old website is not copied wholesale.
- No UI, mobile capture, uploads, storage policy, trend chart, OCR, voice-to-text, recommendation content, Stripe, remote Supabase, production data, deployment, push, or PR work is performed.
- Validation is run and recorded, or blocked with exact evidence and manual-intervention steps.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Formula Acceptance Matrix

| Item | Accepted rule |
|---|---|
| pH Average | `(pH Saliva + pH Urine) / 2` |
| Conductivity C | `raw meter reading * 1.43` |
| Lookup | exact reading to adjacent loss value |
| Salts | lookup uses converted C value |
| Hydration Score Energy Loss | `(Carbs Loss + Salts Loss) / 2` |
| Hydration Score | `1 - Hydration Score Energy Loss` |
| Health Score Energy Loss | `(Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4` |
| Health Score | `1 - Health Score Energy Loss` |

## Fixture Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Fully matched readings | Returns scored result with losses and both scores. |
| Missing Carbs exact lookup | Returns blocked/unscored with Carbs reason. |
| Missing pH Average exact lookup | Returns blocked/unscored with pH Average reason. |
| Missing Salts exact lookup | Returns blocked/unscored with Salts reason after C conversion. |
| Missing Urea exact lookup | Returns blocked/unscored with Urea reason. |
| Conductivity conversion | Raw meter value produces converted C value using `1.43`. |
| pH Average | Saliva and Urine values produce correct average. |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
