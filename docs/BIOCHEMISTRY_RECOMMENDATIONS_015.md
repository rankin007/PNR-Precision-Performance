# Sprint 015 - Biochemistry Recommendations And Zones

## Status

Implemented locally on 2026-07-17. No UI, remote Supabase migration, production data mutation, deployment, push, PR, Stripe change, public shop reopening, production thresholds, or production recommendation advice was created.

## Source Inputs Used

Sprint 015 uses the source-controlled Sprint 013/014 evidence:

- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `docs/BIOCHEMISTRY_SCORING_014.md`
- `lib/domain/biochemistry.ts`
- `references/fixtures/biochemistry-scoring-014.json`
- `planning/DEFINITION_OF_DONE.md`

Sprint 014 scoring remains authoritative for exact lookup, pH Average, conductivity C conversion, Hydration Score, and Health Score.

## Implemented Files

- `lib/domain/biochemistry.ts`: zone threshold types, supplied-threshold classification, recommendation rule types, recommendation snapshots, and blocked/unavailable behavior.
- `references/fixtures/biochemistry-recommendations-015.json`: fixture-only threshold and rule data for local validation.
- `scripts/validate-biochemistry-recommendations.ts`: local assertion script for zone and recommendation scaffold behavior.

## Relationship To Sprint 014 Scoring

Sprint 015 does not change Sprint 014 formulas or exact lookup behavior.

The recommendation scaffold consumes `BiochemistryScoringResult` output. If Sprint 014 returns `scoringStatus: "blocked"`, Sprint 015 zone classification returns blocked zone snapshots and recommendation generation returns blocked output.

## Zone Threshold Representation

Zone labels are represented as:

- `green`
- `amber`
- `red`

Numeric thresholds are not hard-coded. They must be supplied through `BiochemistryZoneThresholdSet` records with:

- score kind: `hydration` or `health`
- source document
- source version
- threshold rows with zone, minimum score, maximum score, and optional label

The fixture threshold values are explicitly fixture-only. They validate behavior but are not approved production Green/Amber/Red boundaries.

## Missing-Threshold Behavior

If no threshold set is supplied, classification returns a blocked zone snapshot with reason `missing_threshold_set`.

If the threshold set is incomplete or mismatched, classification returns a blocked zone snapshot with reason `incomplete_threshold_set`.

If a score is outside supplied thresholds, classification returns a blocked zone snapshot with reason `score_outside_thresholds`.

## Recommendation Scaffold

Recommendation categories are represented as:

- `hydration`
- `feed`
- `supplements`
- `water_timing_volume`
- `other`

Recommendation rule statuses are:

- `draft`
- `active`
- `inactive`

Only active supplied rules can produce recommendation snapshots. Draft and inactive rules are not emitted as trainer-facing advice.

## No-Content / No-Recommendation Behavior

If a zone is blocked, recommendation generation returns `status: "blocked"` with reason `zone_blocked`.

If no active approved rule exists for the requested score kind, zone, and category, recommendation generation returns `status: "unavailable"` or a partial generated result with blockers, depending on whether any valid recommendations were produced.

If an active rule has empty content, recommendation generation records `missing_active_rule_content` and does not emit that rule.

## Snapshot Contract

Zone snapshots include:

- score kind
- score value when available
- zone status
- zone label when classified
- threshold source document/version
- blockers

Recommendation snapshots include:

- rule id
- category
- score kind
- zone
- level
- content
- source document/version

These fields are compatible with the Sprint 013/014 audit direction: formula version and lookup evidence remain in the scoring snapshot, while threshold and recommendation source/version are attached to the downstream zone/recommendation snapshots.

## Fixture Summary

`references/fixtures/biochemistry-recommendations-015.json` contains:

- fixture-only threshold sets for Hydration Score and Health Score
- one active fixture-only hydration rule for validation
- one draft fixture-only feed rule that must not be emitted

Validated cases:

| Case | Result |
|---|---|
| Supplied fixture thresholds | Hydration and Health scores classify as fixture `amber`. |
| Missing threshold set | Classification blocks with `missing_threshold_set`. |
| Blocked Sprint 014 score | Zones block and recommendations block. |
| Active supplied fixture rule | Recommendation snapshot is generated with source/version metadata. |
| Draft-only rule | No trainer-facing advice is emitted; result is unavailable. |

## Validation Results

Focused fixture validation command:

`node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts`

Result: passed with exit code `0`.

TypeScript validation during implementation:

`powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`

Result: passed with bounded wrapper status `exited 0`.

Final Sprint 015 validation:

- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts` passed with exit code `0`.
- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts` passed with exit code `0`.
- `npm run lint` passed with bounded wrapper status `exited 0`.
- `npx tsc --noEmit --incremental false` passed with bounded wrapper status `exited 0`.
- Sandboxed `npm run build` hit the known `spawn EPERM` restriction.
- Outside-sandbox bounded `npm run build` passed with status `exited 0` and generated 23 routes.

## Manual Intervention: Approved Zone Thresholds

Blocked item: production Green/Amber/Red thresholds.

Evidence checked:

- Done definition names Green, Amber, and Red zone concepts.
- Sprint 015 source material does not provide approved numeric boundaries.
- Sprint 015 fixtures use fixture-only values for behavior validation, not production thresholds.

Exact user/domain-owner action needed:

Provide approved numeric thresholds for Hydration Score and Health Score zones.

Step-by-step action instructions:

1. Review the score scale produced by Sprint 014.
2. Define Hydration Score Green, Amber, and Red min/max boundaries.
3. Define Health Score Green, Amber, and Red min/max boundaries.
4. Provide source/version wording for the threshold set.
5. Confirm whether boundaries are inclusive and whether any score outside `0-1` should be rejected or blocked.

Builder will verify after action:

- complete threshold sets classify fixture scores correctly
- missing or incomplete thresholds still block
- threshold source/version appears in zone snapshots

## Manual Intervention: Approved Table Of Knowledge Content

Blocked item: production recommendation content.

Evidence checked:

- Done definition requires recommendations and Table of Knowledge categories.
- No approved category/level comments or trainer-facing advice content is present in source-controlled material.
- Sprint 015 creates rule scaffolding only and does not invent advice.

Exact user/domain-owner action needed:

Provide approved Table of Knowledge rules for each intended score kind, zone, category, and level.

Step-by-step action instructions:

1. Provide category list to ship for launch.
2. Provide active rule content for each category/zone/level combination that should produce trainer-facing guidance.
3. Provide source/version labels and review owner.
4. Confirm disclaimer/review wording if recommendations need guardrails.
5. Mark any placeholder content as draft or inactive until approved.

Builder will verify after action:

- active approved rules generate recommendation snapshots
- draft/inactive rules are not emitted
- missing content returns unavailable/blocked state
- recommendation source/version is preserved

## Manual Intervention: Remote Migration

No Sprint 015 remote migration was applied.

If future schema scaffolding is added or the Sprint 013 migration is ready for production, apply it only through an explicitly authorized Supabase migration path and then run non-destructive post-apply checks.
