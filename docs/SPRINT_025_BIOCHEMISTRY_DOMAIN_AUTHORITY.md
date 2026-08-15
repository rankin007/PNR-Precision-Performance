# Sprint 025 Biochemistry Domain Authority

Status: accepted structural contract; production threshold and knowledge authority pending
Effective date: 2026-07-29
Decision owner: Aprec8 Pty Ltd product owner (domain values still require a named approving person)
Contract version: `sprint-025-authority-partial-v1`
Formula version: `biochemistry-score-v1`
Lookup source: `Reading Tables v1.csv`, version `v1`

Sprint 025B review package: `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`, package `sprint-025B-authority-v1`, status `owner-input-required`. It builds on but does not supersede this accepted partial structural contract. Sprint 025C remains blocked until a later package version contains complete named, dated product/domain and veterinary decisions.

This record separates established software behavior from health-adjacent decisions that have not been supplied. An unresolved item is unavailable in the product; fixture values are never approval.

## Authority matrix

| Authority slice | Status | Runtime treatment |
| --- | --- | --- |
| Five raw measurements to four exact lookup inputs | Accepted from existing versioned scoring contract | Active |
| Numeric normalization and score formulas | Accepted from `biochemistry-score-v1` | Active |
| Measurement units, device applicability, precision, step and ranges | Unresolved | No new validation or claims activated |
| Green/Amber/Red thresholds and result explanations | Unresolved | Classification unavailable |
| Table of Knowledge recommendations and escalation wording | Unresolved | Recommendations unavailable |
| Upload/provider and voice capabilities | Deferred | No Sprint 025 activation or configuration |

## Q1. What does “four readings” mean?

**Answer — accepted.** It means four scoring lookup inputs: carbohydrate; pH average; salts/conductivity; and urea. The structured form retains five raw measurements because pH average is derived from separate pH saliva and pH urine readings. Conductivity is also converted before its exact lookup.

**Recommendation.** Product language should say “five measurements producing four scoring inputs” whenever ambiguity is possible.

**Rationale/source.** Existing Sprint 013/014/018/022 contracts and `lib/domain/biochemistry.ts`; version `sprint-025-authority-partial-v1`.

## Q2. Which measurement rules are accepted?

**Answer — partially accepted.** Field identity and deterministic derivation are accepted. Biological/device limits are unresolved.

| Raw measurement | Lookup input | Accepted derivation | Unit, display precision, input step and permitted range |
| --- | --- | --- | --- |
| Carbohydrate reading | `carbs` | Direct, normalized to six decimal places for exact lookup | Unresolved |
| pH saliva | contributes to `ph_average` | `(pH saliva + pH urine) / 2`, normalized to six decimal places | Unit is pH by field identity; calibration, display precision, step and range unresolved |
| pH urine | contributes to `ph_average` | `(pH saliva + pH urine) / 2`, normalized to six decimal places | Unit is pH by field identity; calibration, display precision, step and range unresolved |
| Raw conductivity meter value | `salts` | Multiply by `1.43`, then normalize to six decimal places | Device applicability, raw unit, converted-unit wording, display precision, step and range unresolved |
| Urea reading | `urea` | Direct, normalized to six decimal places for exact lookup | Unresolved |

**Recommendation.** A named domain owner should supply the exact device/manual authority before units or ranges are presented as operational guidance. The existing `1.43` multiplier is preserved for compatibility, not newly represented as a biological or device claim.

## Q3. Is lookup exact or interpolated?

**Answer — accepted.** Lookup is exact after six-decimal normalization. Interpolation and nearest-value fallback are not permitted. A missing row blocks both scores.

**Recommendation.** Keep the visible “exact lookup unavailable” result and never guess a score.

**Source/version.** `Reading Tables v1.csv` `v1`; `biochemistry-score-v1`.

## Q4. Which formulas are accepted?

**Answer — accepted for existing structured operation.** Loss values are decimal fractions from exact versioned lookup rows.

| Output | Formula | Stored/display precision |
| --- | --- | --- |
| Hydration Score Energy Loss | `(carbohydrate loss + salts loss) / 2` | Normalized to six decimals |
| Hydration Score | `1 - Hydration Score Energy Loss` | Normalized to six decimals |
| `healthScore` Energy Loss | `(carbohydrate + pH-average + salts + urea losses) / 4` | Normalized to six decimals |
| internal `healthScore` | `1 - healthScore Energy Loss` | Normalized to six decimals |

The persisted/internal `healthScore` name remains unchanged. “Biochemistry Trend Score” is only the existing provisional display label; final trainer-facing naming remains unresolved.

## Q5. Which Green/Amber/Red boundaries and status language are approved?

**Answer — unresolved and unavailable.** No complete, named-owner-approved production set was supplied for either score. The Sprint 015 values are synthetic fixture scaffolding and must not be loaded as runtime authority.

**Recommendation.** Supply one complete versioned set per score with a 0–1 domain, explicit boundary semantics, one interval for each colour, and non-diagnostic label/context text. The validator rejects missing/duplicate zones, non-finite or inverted bounds, outside-domain values, overlaps and representable gaps.

## Q6. Which recommendations are approved?

**Answer — unresolved and unavailable.** No production category, level, trigger, wording, review class, escalation statement, source version or supersession record was supplied. Fixture content is not trainer advice.

**Recommendation.** Each future rule needs a stable ID, score kind, zone, category, level, exact informational wording, source/version/effective date, review class, status and supersession relationship. Treatment instructions, supplement doses, prescribed water volumes, diagnoses and guarantees remain prohibited unless separately governed and approved.

## Q7. What safety language is accepted?

**Answer — accepted as a boundary, not as domain advice.** Results are informational and non-diagnostic. Missing authority remains unavailable. The workflow does not replace trainer or veterinary judgement. Exact veterinary escalation wording and triggers remain unresolved, so no automated escalation claim is activated.

## Q8. What is deferred?

**Answer — accepted.** Sprint 025 does not activate or configure PDF, image, CSV, arbitrary-file, safety-provider, OCR, device, voice or transcription capabilities. CSV remains disabled. Existing evidence code from the selected lineage is not changed by this sprint; without approved safety-provider completion, transferred evidence remains unavailable/fail-closed. Production activation is outside scope. Deferred work may return under Sprint 023R.

## Q9. How are changes controlled?

**Answer — accepted.** Formula, lookup, threshold and recommendation versions remain independently traceable. Saved score, zone and recommendation snapshots retain the exact source/version and wording used at creation. Later rules must use a new version and explicit supersession; they must not reinterpret prior snapshots.

**Unresolved owner detail.** Aprec8 Pty Ltd is the accountable organisation, but the named approving person and role for biological thresholds and Table of Knowledge content must be recorded before activation.
