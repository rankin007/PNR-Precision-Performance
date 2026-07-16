============================================================
FILE: planning/sprints/015-scoring-and-recommendation-engine/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/015-scoring-and-recommendation-engine/blueprint.md
============================================================

# Sprint 015 - Scoring And Recommendation Engine Blueprint

## Execution Shape

Sprint 015 is a local domain/scaffold sprint. It should not build UI and should not touch production systems.

Run the work in this order:

1. Confirm current branch, commit, and dirty status.
2. Read Sprint 015 requirements, acceptance, handoff, current state, Architect briefing, Definition of Done, Sprint 013/014 closeout docs, scoring fixtures, and domain code.
3. Verify Sprint 014 produced enough scoring result shape for zone/recommendation work.
4. Inspect whether approved zone thresholds or Table of Knowledge content exist in source-controlled material.
5. If approved content/thresholds are missing, implement scaffold/blocker behavior rather than inventing values.
6. Design a narrow TypeScript domain API for zone classification and recommendation snapshots.
7. Add local migration only if needed for source-controlled snapshot/table scaffolding.
8. Add fixture-backed examples or local assertions.
9. Create `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`.
10. Run local validation.
11. Update planning/status/briefing and stop before UI, remote migration, deployment, push, PR, public relaunch, Stripe, or recommendation-content invention.

## Recommended Domain API Shape

Follow existing Sprint 014 patterns in `lib/domain/biochemistry.ts`. If the file is becoming too large, use a sibling module under `lib/domain/**`.

Recommended types:

- `BiochemistryScoreZone = "green" | "amber" | "red"`
- `BiochemistryZoneStatus = "classified" | "blocked" | "unclassified"`
- `BiochemistryZoneThresholdSet`
- `BiochemistryZoneSnapshot`
- `BiochemistryRecommendationCategory`
- `BiochemistryRecommendationRuleStatus = "draft" | "active" | "inactive"`
- `BiochemistryRecommendationSnapshot`
- `BiochemistryRecommendationResultStatus = "generated" | "blocked" | "unavailable"`

Recommended behavior:

- Classify Hydration Score and Health Score only when explicit threshold sets are supplied.
- Return blocked/unclassified state when thresholds are missing or incomplete.
- Generate recommendation snapshots only from active supplied rules.
- Return blocked/unavailable state when no approved active rule exists for the relevant score/zone/category.
- Preserve source/version information for thresholds and recommendation rules.

## Zone Threshold Rules

Do not invent numeric Green/Amber/Red boundaries.

Allowed behavior:

- represent threshold sets and validate their completeness
- classify score values when a complete threshold set is supplied by fixture/config/database rows
- block classification when thresholds are missing
- document that threshold values require domain approval before production use

Forbidden behavior:

- hard-code assumed Green/Amber/Red thresholds
- infer thresholds from example score values
- make clinical or operational claims from score ranges without approved content

## Recommendation Rule Rules

Do not invent Table of Knowledge advice.

Allowed behavior:

- create types/tables/fixtures for categories, levels, zones, statuses, and rule metadata
- support draft/inactive placeholders with empty or clearly non-production content
- generate recommendations only from active supplied rules
- block recommendation generation when active approved rules are absent
- document exact manual steps for product/domain owner content supply

Forbidden behavior:

- write feed, hydration, supplement, workload, water, veterinary, or risk guidance from assumptions
- show placeholder text as trainer-facing advice
- create live recommendation content in production

## Optional Local Migration Shape

If Builder decides a schema scaffold is needed, prefer additive local migration only. Suggested concepts:

- recommendation rule set/version metadata
- recommendation rules with category, score kind, zone, level, status, content, source/version, and audit fields
- optional score/recommendation snapshot fields on `biochemistry_tests` only if needed for compatibility

The migration must be source-controlled only. It must not be applied remotely during Sprint 015.

## Fixture Strategy

At minimum, fixtures or assertions should cover:

- classified result when explicit threshold config is supplied
- blocked zone result when thresholds are missing
- blocked recommendation result when scoring is blocked
- generated recommendation result from active supplied fixture rule content
- unavailable/blocked recommendation result when no active approved rule exists
- draft placeholder rule is not treated as trainer-facing advice

If actual domain rule text is missing, use fixture text that is clearly marked as `fixture only` and not production content, or use empty/draft rules to prove blocking behavior.

## Documentation

Create `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md` with:

- source inputs used
- relationship to Sprint 014 scoring result
- zone threshold representation
- missing-threshold behavior
- recommendation category scaffold
- rule status behavior
- blocked/no-content behavior
- snapshot contract
- fixture summary
- validation results
- manual-intervention instructions for threshold/content/remote-migration blockers

## Validation

Required checks:

- `git status --short`
- recommendation/zone fixture/script check if one is added
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox build fails for known process-spawn or Next startup reasons, request outside-sandbox bounded validation and record both outcomes.

## Stop Conditions

Stop and ask before:

- starting if Sprint 014 scoring prerequisites are incomplete
- inventing zone thresholds
- inventing recommendation content
- applying remote Supabase migrations
- changing production data
- deploying
- pushing or creating a PR
- reopening public shop/website
- adding UI
- adding uploads/storage behavior
- adding OCR, voice-to-text, trend charts, or mobile capture
- changing Stripe, DNS, Vercel, Supabase settings, or customer data
- exposing secret values or fragments

============================================================
FILE: planning/sprints/015-scoring-and-recommendation-engine/acceptance.md
============================================================

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

============================================================
FILE: planning/sprints/015-scoring-and-recommendation-engine/handoff-prompt.md
============================================================

# Sprint 015 - Builder Handoff Prompt

You are Builder for Sprint 015 - Scoring And Recommendation Engine in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/015-scoring-and-recommendation-engine/requirements.md`
5. `planning/sprints/015-scoring-and-recommendation-engine/blueprint.md`
6. `planning/sprints/015-scoring-and-recommendation-engine/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DEFINITION_OF_DONE.md`
9. Sprint 013/014 closeout docs, scoring fixtures, and domain code

## Mission

Build the local scoring-output and recommendation-engine scaffold using Sprint 014 scoring results.

Do not build UI. Do not deploy. Do not apply remote migrations. Do not invent recommendation content or zone thresholds.

## First Gate

Before implementation, prove Sprint 014 created enough evidence for this work:

- exact-match scoring service exists
- scored and blocked result shapes are available
- score snapshot fields are documented
- blocked/unscored behavior is documented
- Sprint 013 data model evidence exists

If this is not true, stop and record the blocker.

## Guardrails

Do not invent thresholds.

Do not invent Table of Knowledge content.

Do not change Sprint 014 scoring formulas or exact lookup behavior.

Do not apply migrations to remote Supabase.

Do not deploy.

Do not push or create a PR unless separately authorized.

Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

Do not reopen public website/shop surfaces hidden by Sprint 012F.

Do not add mobile capture UI, results UI, upload UI, storage policies, OCR, voice-to-text, trend charts, or public website work.

Do not expose secret values or fragments.

## Suggested Execution

1. Record current branch, commit, and dirty status.
2. Read Sprint 013/014 scoring/data-model evidence.
3. Inspect whether approved zone thresholds or Table of Knowledge content exist.
4. Design a small local domain API for zones and recommendation snapshots.
5. Implement classification only from supplied thresholds; otherwise block/unclassify.
6. Implement recommendation generation only from active supplied rules; otherwise block/unavailable.
7. Add fixture-backed examples or validation.
8. Create `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`.
9. Run validation.
10. Update planning/status/briefing.
11. Stop before UI, remote migration, deployment, push, PR, public relaunch, Stripe, or recommendation-content invention.

## Closeout Standard

At close, the next Architect should know:

- what zone/recommendation modules or migration scaffolds were created
- how thresholds are represented
- how missing thresholds block classification
- how recommendation rules are represented
- how missing approved content blocks recommendation output
- what fixtures were validated
- what remains blocked before trainer-facing result UI

============================================================
FILE: planning/sprints/015-scoring-and-recommendation-engine/BUILDER_START_INSTRUCTIONS.md
============================================================

# Sprint 015 - Builder Start Instructions

You are Builder for Sprint 015 - Scoring And Recommendation Engine.

Start from the approved sprint files, not from chat memory:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/015-scoring-and-recommendation-engine/requirements.md`
5. `planning/sprints/015-scoring-and-recommendation-engine/blueprint.md`
6. `planning/sprints/015-scoring-and-recommendation-engine/acceptance.md`
7. `planning/sprints/015-scoring-and-recommendation-engine/handoff-prompt.md`
8. `planning/ARCHITECT_BRIEFING.md`
9. `planning/DEFINITION_OF_DONE.md`
10. Sprint 013/014 closeout docs and scoring evidence

## First Action

Confirm the current branch, commit, and dirty status. Do not revert unrelated changes.

Then verify Sprint 014 prerequisites:

- exact scoring service exists
- scored/blocked result shape exists
- blocked exact lookup behavior exists
- score snapshot fields are documented
- Sprint 013 schema/source evidence exists

If these are missing, stop and document the blocker. Do not guess thresholds or recommendation content.

## Build Scope

Create the local foundation for:

- Hydration Score and Health Score zone representation
- supplied-threshold classification
- missing-threshold blocked/unclassified states
- Table of Knowledge category/rule scaffold
- active/draft/inactive recommendation rule handling
- recommendation snapshot contract
- missing-content blocked/unavailable states
- fixture-backed examples or validation

## Non-Negotiables

- Do not invent Green/Amber/Red thresholds.
- Do not invent recommendation advice.
- Do not change Sprint 014 formulas or lookup behavior.
- Do not build UI.
- Do not apply remote Supabase migrations.
- Do not deploy.
- Do not push or create a PR.
- Do not reopen the public shop or website.
- Do not copy the old website wholesale.
- Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

## Required Docs

Create:

- `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`

Document:

- source evidence
- relationship to Sprint 014 scoring
- threshold representation
- missing-threshold behavior
- recommendation scaffold
- active/draft/inactive rule behavior
- no-content blocked state
- snapshot contract
- fixture summary
- validation results
- manual-intervention instructions for missing thresholds/content/remote migration

## Validation

Run and record:

- recommendation/zone fixture/script check if one is added
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox build fails for known sandbox reasons, request approved outside-sandbox bounded validation and record both outcomes.

## Closeout

At close, update:

- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- relevant decisions/risks/questions if new evidence appears

Final status must be one of:

- complete
- partial with documented blockers
- blocked with manual intervention instructions
