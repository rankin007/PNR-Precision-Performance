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
