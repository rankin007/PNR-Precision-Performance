# Sprint 014 - Biochemistry Scoring Service And Fixtures Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## Dependency Gate

Sprint 014 must not begin until Sprint 013 - Biochemistry Test Data Model is complete or explicitly closed as complete enough for scoring work.

Builder must stop and ask before implementation if any of these are true:

- Sprint 013 did not preserve/read the supplied Reading Tables CSV
- Sprint 013 did not create or document the biochemistry test/lookup data model
- Sprint 013 did not document where exact lookup values live
- Sprint 013 did not document score snapshot fields or formula version expectations
- Sprint 013 closed with blockers that directly affect exact lookup or scoring behavior

## User Authorization Context

The user locked the expanded Sprint 014-030 roadmap on 2026-07-16 and clarified the legacy website continuity rule:

Do not reuse the old website wholesale. Future public/product UI must stay on the new architecture, structure, access model, and design system. Builders may selectively harvest previous-site wording, color scheme, graphics, and images where continuity is useful and the material remains accurate.

This sprint is not a public website sprint and must not change public pages, colors, images, or shop behavior.

## Goal

Create the server-side scoring and exact lookup foundation for biochemistry tests before the mobile capture UI is built.

Sprint 014 should implement or document a local scoring service that can:

- accept a complete set of readings for one horse/test
- convert raw conductivity meter values to `C`
- calculate pH Average
- resolve exact reading-to-loss values for Carbs, pH Average, Salts, and Urea
- calculate Hydration Score and Health Score from approved formulas
- return a blocked/unscored state when exact lookup values are missing
- produce auditable score snapshot output compatible with the Sprint 013 data model
- provide fixture-backed validation using the preserved Reading Tables source

No remote production migration is authorized in Sprint 014.

## Approved Domain Rules

Builder must use these rules exactly:

- Do not use the concept or wording of `calibrated` for pH.
- A test belongs to a horse and date; all readings go together to form one test.
- Client-entered readings include Carbs, pH Saliva, pH Urine, Salts/conductivity, and Urea.
- `pH Average = (pH Saliva + pH Urine) / 2`.
- Conductivity/salts raw meter value converts to C using `converted C = raw meter value * 1.43`.
- Conductivity/salts display uses the converted C value with a `C` suffix.
- Salts lookup uses the converted C value.
- Lookup values are exact. The exact reading maps to the adjacent energy-loss value in the lookup table.
- The energy-loss value, not the raw reading, is used in formulas.
- `Hydration Score Energy Loss = (Carbs Loss + Salts Loss) / 2`.
- `Hydration Score = 1 - Hydration Score Energy Loss`.
- `Health Score Energy Loss = (Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`.
- `Health Score = 1 - Health Score Energy Loss`.
- Do not invent rounding, interpolation, nearest-match, next-lower, or fallback lookup behavior.
- If any exact lookup is missing, the scoring result must be blocked/unscored with a clear non-sensitive reason.

## Expected Source Inputs

Builder should use the Sprint 013-preserved source table and documentation.

Expected references after Sprint 013:

- `references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv`, or documented equivalent source path
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- Sprint 013 migration(s) under `supabase/migrations/**`
- any Sprint 013 domain/types files created under `lib/domain/**` or `types/**`

If these files do not exist or do not contain enough information for exact scoring, Builder must stop and record a manual-intervention blocker rather than guessing.

## In Scope

Builder may:

- inspect Sprint 013 migrations/docs/types and the preserved Reading Tables CSV
- create a local TypeScript scoring module under `lib/domain/**`
- create local domain types under `lib/domain/**` or `types/**`
- create fixture data under `references/fixtures/**`, `docs/**`, or another source-controlled non-runtime location if consistent with the project
- add a small local validation script under `scripts/**` only if needed and if it does not require network access or secrets
- add source-controlled scoring examples or fixture assertions
- document exact lookup behavior, conversion behavior, formula versioning, blocked/unscored states, and snapshot output
- update planning docs and Architect briefing
- run local validation

## Out Of Scope

Builder must not:

- apply migrations to remote Supabase
- mutate production data
- deploy to Vercel
- push to remote
- create a pull request
- reopen the public website/shop hidden by Sprint 012F
- change public page coloring, images, copy, or layout
- copy the old website wholesale
- add mobile capture UI
- add upload UI or storage policies beyond reading Sprint 013 docs if already present
- add OCR/photo extraction
- add voice-to-text provider integration
- add trend charts
- add Table of Knowledge recommendation content
- create live Stripe products, prices, subscriptions, charges, refunds, payouts, or tax changes
- change DNS, Vercel settings, Supabase settings, Stripe settings, or customer data
- expose secret values or secret fragments

## Approved File Set

Builder may edit:

- `lib/domain/**`, for biochemistry scoring/types only
- `types/**`, if present or needed for scoring/domain types
- `docs/BIOCHEMISTRY_SCORING_014.md`
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`, only if Sprint 014 discovers a small documentation correction needed for scoring clarity
- `references/fixtures/**`, if creating source-controlled scoring fixtures
- `scripts/**`, only for a narrow local scoring fixture validation script if needed
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
- `supabase/migrations/**`, except reading Sprint 013 schema evidence
- `.release-main/**`, continuity/reference only, no wholesale copy
- `.env*` names/presence only, no values

## Required Output

Builder must produce:

- scoring service/module or a documented blocker if prerequisites are missing
- exact lookup behavior documentation
- conductivity raw-to-C conversion behavior
- pH Average behavior
- Hydration Score and Health Score calculations
- blocked/unscored result behavior for missing exact lookup values
- score snapshot contract compatible with Sprint 013 data model
- fixture-backed examples or validation evidence
- validation results
- manual-intervention instructions for any blocked scoring, lookup, fixture, or domain input issue

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
