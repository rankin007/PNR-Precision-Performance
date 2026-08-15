# Sprint 025D — Numeric Biochemistry Presentation

## Current Product contract

The saved-result view presents the accepted current readings, derived conductivity values, numeric Hydration Score, numeric Biochemistry Trend Score and the stored formula/lookup-source identity.

The current reading display is:

| Reading | Display |
| --- | --- |
| Carbohydrate | one decimal place, `%` |
| Saliva pH | two decimal places |
| Urine pH | two decimal places |
| Raw Conductivity | two decimal places, `mS/cm` |
| Effective converted C | two decimal places, `C` |
| Selected Salts table reading | two decimal places, `C`, when present |

Scores remain the immutable stored numeric snapshots produced by their recorded formula/source versions. Historical v1 and current v2 records are reconstructed by version and are not recalculated.

## Deferred content

Green/Amber/Red classifications, threshold meanings, recommendations, today guidance, clinical priority, diagnosis, prognosis, treatment, doses, prescribed water volumes, urgency, race readiness, disclaimers and escalation wording are not part of the current result presentation.

The Product does not show empty or “coming soon” classification/recommendation panels. Their absence does not mean the numeric data is incomplete.

## Future extension boundary

`lib/domain/biochemistry.ts` retains the versioned threshold-set, zone-snapshot, recommendation-rule and recommendation-snapshot types and validation functions. Missing threshold sets and missing active rules remain blocked/unavailable. Draft and inactive rules cannot produce trainer-facing advice.

Future content requires a new, explicitly approved source/version and complete named domain/veterinary authority. It must not reinterpret historical scores or promote Sprint 015 fixture content.

## Release boundary

Sprint 025D is local Product presentation only. It applies no migration, performs no deployment and establishes no Production runtime acceptance.
