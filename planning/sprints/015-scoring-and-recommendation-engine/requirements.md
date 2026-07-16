# Sprint 015 - Scoring And Recommendation Engine Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## Dependency Gate

Sprint 015 must not begin until Sprint 014 - Biochemistry Scoring Service And Fixtures is complete or explicitly closed as complete enough for recommendation/scoring-output work.

Builder must stop and ask before implementation if any of these are true:

- Sprint 014 scoring service is missing or not documented
- Sprint 014 exact lookup scoring behavior is incomplete
- Sprint 014 blocked/unscored behavior is not available
- Sprint 014 did not document score snapshot output
- Sprint 013 biochemistry data model evidence is missing
- the work would require remote Supabase migration, public UI, Stripe, deployment, or production data mutation

## User Authorization Context

The user requested Architect Pack 015 after Sprint 014 closed locally.

Sprint 014 completed the local exact-match scoring foundation. Sprint 015 should build the next local foundation layer: zone classification contracts, recommendation rule scaffolding, recommendation output snapshots, and blocker behavior when approved recommendation content or zone thresholds are missing.

This sprint must not invent domain recommendations. Table of Knowledge content, feed/hydration/supplement advice, disclaimers, clinical language, and zone thresholds must come from approved domain material. If the content is not supplied, Builder must implement/document a blocked or draft scaffold rather than writing advice.

## Goal

Create the local scoring-output and recommendation-engine scaffold needed before trainer-facing result screens are built.

Sprint 015 should implement or document local foundations that can:

- consume Sprint 014 scored or blocked biochemistry results
- represent Hydration Score and Health Score zones without inventing thresholds
- support caller-supplied or database-supplied zone threshold configuration
- return blocked/unclassified state when threshold configuration is missing
- represent Table of Knowledge recommendation categories and rule placeholders
- generate recommendation snapshots only from supplied/approved rule content
- return blocked/no-recommendation state when approved content is missing
- preserve auditability through formula version, lookup source/version, zone rule version, and recommendation rule version fields
- remain compatible with the Sprint 013/014 data model and score snapshot shape

No remote production migration is authorized in Sprint 015.

## Approved Domain Rules

Builder must use these rules exactly:

- Do not invent lookup behavior; exact lookup remains Sprint 014 behavior.
- Do not invent score formulas; Sprint 014 formulas remain authoritative.
- Do not describe pH as adjusted or offset; use pH Saliva, pH Urine, and pH Average only.
- Hydration Score and Health Score values come from Sprint 014 scoring results.
- Missing exact lookups remain blocked/unscored and must not receive guessed zones or recommendations.
- Green/Amber/Red labels may be represented as domain concepts, but numeric thresholds must be supplied/configured rather than invented.
- Recommendation categories may be scaffolded from the Done definition: hydration, feed, supplements, water timing/volume, and other guidance.
- Table of Knowledge rule records may exist as empty/draft/inactive placeholders only unless approved content is available.
- No trainer-facing advice may be generated from placeholder text.
- Any recommendation output must identify source rule/version and whether it is draft, active, blocked, or unavailable.

## Expected Source Inputs

Builder should use these source-controlled inputs:

- `docs/BIOCHEMISTRY_SCORING_014.md`
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `lib/domain/biochemistry.ts`
- `references/fixtures/biochemistry-scoring-014.json`
- `planning/DEFINITION_OF_DONE.md`
- `planning/ARCHITECT_BRIEFING.md`

If these files do not exist or do not contain enough information for safe recommendation scaffolding, Builder must stop and record a manual-intervention blocker rather than guessing.

## In Scope

Builder may:

- inspect Sprint 013/014 docs, fixtures, domain code, and migrations
- extend `lib/domain/**` with zone/recommendation types and local pure helpers
- create local recommendation/zone fixture data under `references/fixtures/**`
- create a local validation script under `scripts/**` if needed
- create `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`
- create a local source-controlled migration under `supabase/migrations/**` only if needed to scaffold recommendation/zone snapshot fields or tables
- regenerate `supabase/bootstrap/remote-init.sql` only if a local migration is added
- update planning/status/briefing files
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
- add results UI
- add upload UI or storage policies
- add OCR/photo extraction
- add voice-to-text provider integration
- add trend charts
- write actual Table of Knowledge recommendation advice unless supplied in approved source material
- create live Stripe products, prices, subscriptions, charges, refunds, payouts, or tax changes
- change DNS, Vercel settings, Supabase settings, Stripe settings, or customer data
- expose secret values or secret fragments

## Approved File Set

Builder may edit:

- `lib/domain/**`, for biochemistry scoring-output, zone, and recommendation scaffold code only
- `types/**`, if present or needed for domain types
- `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`
- `docs/BIOCHEMISTRY_SCORING_014.md`, only for small clarity corrections discovered during Sprint 015
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`, only for small compatibility notes if a local scaffold migration is added
- `references/fixtures/**`, for source-controlled zone/recommendation fixtures
- `scripts/**`, only for narrow local validation scripts if needed
- `supabase/migrations/**`, only for a local source-controlled recommendation/zone scaffold migration if needed
- `supabase/bootstrap/remote-init.sql`, only if a local migration is added and bundled
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
- `.release-main/**`, continuity/reference only, no wholesale copy
- `.env*` names/presence only, no values

## Required Output

Builder must produce:

- local recommendation/zone domain scaffold or a documented blocker if prerequisites are missing
- documented zone threshold behavior, including missing-threshold blocked state
- documented Table of Knowledge scaffold behavior
- documented no-content/no-recommendation blocked state
- snapshot contract compatible with Sprint 013/014 score records
- fixture-backed examples or validation evidence
- validation results
- manual-intervention instructions for missing thresholds, missing content, remote migration, or other blocked items

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
