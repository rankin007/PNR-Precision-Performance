# Sprint 015 - Scoring And Recommendation Engine Acceptance

## Required Acceptance Criteria

- Architect Pack 015 is saved before Builder implementation begins.
- `planning/STATE.md` says implementation is authorized for Sprint 015 before Builder edits source files.
- Builder confirms Sprint 014 is complete or explicitly complete enough for recommendation/scoring-output work.
- Builder reads the Sprint 015 four-file sprint set before implementation.
- Builder reads Sprint 013/014 closeout evidence, scoring docs, fixture data, and domain code.
- Scoring formulas remain unchanged from Sprint 014.
- Exact lookup behavior remains unchanged from Sprint 014.
- Missing exact lookup values remain blocked/unscored and do not receive guessed zones or recommendations.
- No pH adjusted/offset terminology is introduced; use pH Saliva, pH Urine, and pH Average only.
- Zone labels are represented without invented numeric thresholds.
- Classification blocks or returns unclassified state when thresholds are missing.
- Recommendation categories are represented as scaffold only unless approved content is supplied.
- Draft or placeholder rule content is not treated as trainer-facing advice.
- Recommendation generation blocks or returns unavailable state when no active approved rule exists.
- Output includes or documents threshold version/source and recommendation rule version/source.
- Output includes or documents snapshot fields compatible with Sprint 013/014 score records.
- Fixture-backed examples or validation evidence cover classified, missing-threshold, active-rule, missing-rule, and blocked-score cases.
- `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md` is created.
- Public under-construction gate remains active.
- Old website is not copied wholesale.
- No UI, mobile capture, uploads, storage policy, trend chart, OCR, voice-to-text, invented recommendation content, Stripe, remote Supabase, production data, deployment, push, or PR work is performed.
- Validation is run and recorded, or blocked with exact evidence and manual-intervention steps.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Zone Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Complete supplied threshold set | Score can classify into Green, Amber, or Red according to supplied thresholds. |
| Missing threshold set | Result is blocked or unclassified; no invented threshold is used. |
| Blocked Sprint 014 score | No zone is assigned. |
| Threshold source/version | Output records or documents source/version. |

## Recommendation Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Active supplied fixture rule | Recommendation snapshot can be generated with source/version metadata. |
| Missing active approved rule | Recommendation result is blocked or unavailable. |
| Draft placeholder rule | Not emitted as trainer-facing advice. |
| Blocked score | No recommendation is generated. |
| Missing domain content | Manual-intervention instructions are recorded. |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
