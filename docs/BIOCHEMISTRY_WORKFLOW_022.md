# Sprint 022 - Biochemistry Workflow

## Status

Sprint 022 completes the local typed mobile workflow for `/data-entry/biochemistry`.

No upload, photo, OCR, voice, transcription, schema, migration, auth/RLS, production threshold, recommendation content, deployment, push, PR, billing, public reopening, or remote system change is included.

## Route Map

| Route | Purpose |
|---|---|
| `/data-entry/biochemistry` | Guided capture -> review -> submit workflow for typed readings and optional typed notes. |
| `/data-entry/biochemistry/[testId]` | Saved result review showing raw readings, derived values, scoring or blockers, unavailable zones, unavailable recommendations, and notes/comments. |

Both routes remain under the existing authenticated operations area.

## Fields And State

The capture workflow keeps the current field contract:

- horse
- test date
- time of day: `AM`, `PM`, or `Unspecified`
- Carbs
- pH Saliva
- pH Urine
- raw conductivity meter value
- Urea
- optional typed notes

The client workflow separates:

- capture
- review
- submitting
- unavailable live capture
- correctable validation failure
- correctable sanitized server failure

Validation distinguishes empty required values, invalid numeric syntax, non-finite numeric values, valid zero/decimal values, optional empty notes, and notes over 2,000 characters.

## Validation Boundary

Client validation exists to guide review. The server action remains authoritative.

Server submission still checks required values, finite numeric readings, note length, authenticated operational context, writable horse access, Supabase configuration, schema availability, lookup loading, scoring, save behavior, and note attachment.

Correctable server failures redirect back with a sanitized code. Submitted values are not restored through URL parameters because notes and stable data must not be placed in the query string.

## Review And Submit

Review shows the selected horse, test date, time of day, all five readings, and typed notes or `No notes added`.

Review does not calculate or preview zones or recommendations. It has one edit path and one submit path.

The submit button changes to `Submitting test...`, disables the control, and uses a client-side lock to prevent ordinary rapid repeat activation in the same interaction. Sprint 022 does not add durable server idempotency.

## Result Semantics

The result panel shows:

- entered readings
- pH Average
- converted conductivity C
- Hydration Score when scored
- display-only `Biochemistry Trend Score` for the internal `healthScore`
- exact lookup blockers when unscored
- formula and lookup source/version
- zones unavailable until approved thresholds exist
- recommendations unavailable until active approved rules exist

No fixture-only thresholds or recommendation text are wired into runtime UI.

## Accessibility And Responsive Decisions

The capture workflow uses visible labels, semantic controls, field-level error association, an alert-style error summary, text stage labels, keyboard-focusable controls, text-plus-marker notices, and single-column mobile spacing.

The primary action is placed after content instead of fixed over the viewport, so it does not cover inputs, focus targets, browser chrome, or the on-screen keyboard.

## Local Automated Evidence

`npm run test:domain` now includes `scripts/test-biochemistry-workflow-022.mjs`.

The focused Sprint 022 gate provides executable assertions for:

- initial empty capture state
- missing required fields
- invalid numeric syntax
- non-finite numeric input
- zero and decimal numeric values
- optional empty notes
- notes length limit
- valid capture normalization
- time labels
- two representative sanitized server-error mappings
- scored and blocked result states
- threshold-unavailable and recommendation-unavailable behavior
- source-string assertions for review text, pending text, repeat-prevention source, and absence of fixture-only wording

The remaining server-error mappings, edit retention, unavailable submission, component pending behavior, labels/error associations, keyboard order, status announcements, responsive layout, and 200% zoom are static source contracts or manual source inspection unless the field-trial record explicitly reports a later rendered run. No rendered interaction, authenticated hosted, or real-device result is inferred from the focused gate.

## Remaining Dependencies

Authenticated hosted proof, field acceptance, production thresholds, final score terminology, pH/device rules, Table of Knowledge content, uploads/privacy decisions, voice/transcription decisions, remote backup, deployment, and public reopening remain separate future work.
