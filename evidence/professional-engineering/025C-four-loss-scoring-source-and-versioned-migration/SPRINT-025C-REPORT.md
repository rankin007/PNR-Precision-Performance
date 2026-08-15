# Sprint 025C Builder Report

Date: 2026-08-10
Outcome: `four-loss-scoring-source-and-versioned-migration-local-complete-clean`

## Plain-English result

The new four-reading scoring system is built and fully proven locally. Carbohydrate now accepts `0.0%` through `15.0%`. Hydration uses Carbohydrate and Salts losses. Health uses Carbohydrate, Urine pH, Saliva pH and Salts losses. Conductivity is converted, rounded safely, capped at 80 and matched to the supplied table. Urea remains stored for history/future use but is hidden from the new workflow; Average pH is not used in v2.

The supplied workbook remained private, read-only and outside the repository. Its four tables produced exactly 1,816 source-attributed rows. No formula was invented for those table values.

## Proof completed

- Accepted workbook/table integrity: `12/12`.
- Scoring: `18/18`.
- Migration/version compatibility: `8/8`.
- Capture/result UI: `6/6`.
- Focused total: `44/44`.
- Full domain regression, typecheck, zero-warning lint, Production build, JSON validation and diff integrity: passed.
- Final critical inspection: PASS after `INSPECT-001` through `INSPECT-004` were resolved.
- Credential and identifiable-person scan: `0/0`.

## Safety and compatibility

Historical v1 scores, Average-pH data, Urea data and lookup rows remain unchanged and readable. New v2 writes require the accepted v3 source identity. The migration rejects inconsistent lookup types, source versions, selected-reading order, losses, formula arithmetic and NULL score outputs.

The static validation wrapper still stops at a pre-existing helper that assumes migrations end at 0023. All preceding checks and the remaining validator passed, and the independent Inspector accepted that equivalent evidence. No database container or remote database was used.

## What was not done

Migration `0024` was not applied to Supabase. Nothing was deployed. No credential was created, no email or enquiry was sent, and no alias was moved. Nothing was staged, committed or pushed.

Green/Amber/Red classifications, recommendations, today guidance, final terminology, disclaimers and escalation remain unavailable. Those belong to a future 025D only after exact authority exists.

## What is next

Sprint 035R should show the trainer-visible daily cockpit and timed mobile workflow. A separately authorized migration/release sprint will be needed before v2 is live. Sprint 025D remains later and authority-dependent.

## User action

This closed local sprint has no manual cleanup or decision waiting on you.

I need nothing from you.