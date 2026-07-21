# Sprint 018 - Mobile Biochemistry Capture Results Acceptance

## Required Acceptance Criteria

- `planning/STATE.md` authorizes Sprint 018 before Builder edits source files.
- Builder reads Sprint 018 sprint files and Sprint 013-015 biochemistry docs/code.
- A mobile-friendly authenticated operations route exists for biochemistry capture.
- Authorized operational writers can access the route through existing operations auth guards.
- The form includes horse, test date, time of day, Carbs, pH Saliva, pH Urine, raw conductivity meter value, Urea, and optional notes/context.
- Required fields are validated before scoring/persistence.
- Invalid numeric values produce non-sensitive user-facing error states.
- Scoring uses `scoreBiochemistryReadings` and does not duplicate or alter formulas.
- Exact lookup remains exact only.
- Missing exact lookup rows produce blocked/unscored result states.
- Conductivity conversion uses the Sprint 014 `1.43` multiplier.
- pH Average is shown or persisted as `(pH Saliva + pH Urine) / 2`.
- Persisted test fields match the Sprint 013 schema when Supabase/schema are available.
- If Supabase is not configured or the biochemistry schema is unavailable, the UI shows a clear blocked/preview state rather than crashing.
- Zones remain unavailable/blocked unless supplied production thresholds exist.
- Recommendations remain unavailable/blocked unless active approved rules exist.
- No fixture-only thresholds or recommendation text are surfaced as production content.
- No uploads, OCR, voice-to-text provider integration, trends, deployment, push, PR, remote migration, Stripe change, production mutation, or public reopening occurs.
- Sprint 018 documentation and planning closeout are updated.
- Required validation passes or blockers are documented with manual-intervention steps.

## Route Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Anonymous user | Existing ops auth guard redirects/denies according to current auth behavior. |
| Authorized trainer/staff/admin writer | Can open capture route. |
| Supabase not configured | Structural preview or clear blocked state; no crash. |
| Supabase configured but migration missing | Clear schema unavailable state; no raw database error exposure. |
| Horse inaccessible | Submission is rejected with non-sensitive error. |
| Exact lookup missing | Result is blocked/unscored with missing lookup details. |
| Thresholds missing | Zone is unavailable/blocked, not guessed. |
| Recommendation content missing | Recommendation is unavailable/blocked, not invented. |

## Validation Acceptance

Required validation:

- scoring fixture validator passes
- recommendation fixture validator passes
- lint passes
- TypeScript passes
- build passes
- route smoke covers the new route where feasible
- `git status --short` is recorded at close

If build or smoke needs the known outside-sandbox path, document both the sandbox limitation and successful fallback.

## Manual Intervention Record

Manual intervention entries must include:

- blocked item
- evidence checked
- exact user/operator action needed
- step-by-step action instructions
- Builder verification after completion

Expected manual/future items:

- apply Sprint 013 remote Supabase migration
- provide production Green/Amber/Red thresholds
- provide approved Table of Knowledge rules
- approve upload storage/provider work
- approve voice-to-text provider/fallback behavior
