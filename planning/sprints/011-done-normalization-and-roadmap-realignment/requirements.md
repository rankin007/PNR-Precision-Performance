# Sprint 011 - Done Normalization And Roadmap Realignment Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user requested: "Architect Pack 011 go create the pack."

The user attached `Precision Performance Done.docx` and stated that it sets out what Done is for the project. Architect review found that this document expands the finish line beyond the current MVP launch definition in `planning/SPRINT_SCHEDULE.md`.

## Goal

Convert the attached Done document from raw source material into durable 120x project truth.

Sprint 011 is successful when the project has:

- a canonical `planning/DEFINITION_OF_DONE.md`
- updated sprint schedule and roadmap language for Sprints 011-016
- updated decisions, domain, risks, and questions reflecting the trainer-ready biochemistry portal target
- clear distinction between the already-deployed MVP shell, remaining live acceptance blockers, and the fuller Done target
- a Builder handoff for the next sprint that does not require guessing from the DOCX

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Sprint 010 final status is `partial with documented blockers`.
- Remaining live acceptance blockers are remote Supabase migration/checks, authenticated Supabase/RLS/member/horse workflow smoke, and Stripe test checkout/signed webhook replay/duplicate delivery verification.
- Current `planning/SPRINT_SCHEDULE.md` defines Done as a live, tested, documented, handoff-ready MVP.
- Attached `Precision Performance Done.docx` defines Done as a fully operational trainer-facing biochemistry portal with voice-to-text, photo uploads, hydration score, health score, recommendations, trends, secure role access, and launch readiness.
- Current app/source evidence includes portal, data-entry, admin, shop, checkout, webhook, horses, daily records, feeding logs, track sessions, products, orders, payments, roles, and RLS foundations.
- Current app/source evidence does not yet show first-class implementation of the Done document's complete test capture, scoring, Table of Knowledge recommendation, photo/OCR, voice-to-text, or trend-chart behavior.

## In Scope

Builder may:

- read and extract `C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Precision Performance Done.docx`
- copy that source document into `references/client-docs/PNR and RJR EPP Working Information/` if accessible without exposing secrets and without deleting or overwriting unrelated files
- create `planning/DEFINITION_OF_DONE.md`
- update `planning/SPRINT_SCHEDULE.md` with the revised Done target and recommended Sprint 011-016 sequence
- update `planning/DECISIONS.md` with the decision that the attached Done document is now the product Done authority after distillation
- update `planning/DOMAIN.md` with the trainer-ready biochemistry portal target and any changed MVP/MVP2 boundary language
- update `planning/RISKS.md` with risks introduced by scoring, recommendations, medical/operational interpretation, uploads, OCR/photo recognition, voice-to-text, mobile performance, and role access
- update `planning/QUESTIONS.md` with missing formula, calibration, Table of Knowledge, role, acceptance, and launch-readiness questions
- update `docs/ARCHITECTURE.md` and `docs/API.md` with planning-level placeholders and required future contracts where helpful
- update `docs/PRODUCTION_LAUNCH_READINESS.md` only to clarify how existing live acceptance blockers relate to the fuller Done target
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close
- update `planning/STATE.md` and `planning/STATUS.json` at sprint close

## Out Of Scope

Builder must not:

- edit production app source files
- implement test capture, scoring, recommendations, uploads, charts, voice-to-text, or OCR/photo recognition
- change database schema, migrations, RLS policies, auth, billing, checkout, Stripe, products, or deployment behavior
- apply remote Supabase migrations or run Stripe checkout/webhook replay
- mutate production data, users, horses, products, orders, payments, subscriptions, or fixtures
- delete source documents or planning history
- install packages from the network
- treat unresolved formulas or domain comments as invented implementation truth

## Approved File Set

Builder may edit:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DEFINITION_OF_DONE.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/API.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`

Builder may add or update only this reference source file if the attached DOCX is accessible:

- `references/client-docs/PNR and RJR EPP Working Information/Precision Performance Done.docx`

Inspection-only:

- `AGENTS.md`
- `templates/method/120x-agent-identity.md`
- `docs/WORKFLOW_PROFILE.md`
- `planning/architect-packs/README.md`
- existing sprint files under `planning/sprints/`
- relevant evidence docs under `docs/`
- `supabase/migrations/0001_initial_schema.sql`
- `supabase/bootstrap/remote-init.sql`
- existing app route/source files needed only to state current coverage truth

## Required Done Distillation

Builder must distill the Done document into these durable categories:

- final product outcome
- trainer workflow acceptance
- scoring and recommendation acceptance
- input and upload acceptance
- role and security acceptance
- trend/reporting acceptance
- website/portal integration acceptance
- data model requirements
- formula/domain-rule requirements
- operational launch-readiness requirements
- explicit MVP1/MVP2 boundary questions

Builder must preserve these important details from the Done document:

- trainer can submit a test in under 60 seconds
- voice-to-text notes attach to the test record
- photos/PDFs/uploads attach to the test record
- carbohydrate input range is `0-15%`
- conductivity input range is `0-70C`
- pink Horiba conductivity meter input is multiplied by `1.43`
- pH urine and saliva calibration is `.1`
- turbidity scale has levels `1-5`
- water intake is recorded in litres in `.5` litre increments
- temperature ideal line is `37.5`
- Hydration Score uses carbohydrate and conductivity
- Health Score uses carbohydrate, conductivity, pH urine, pH saliva, and turbidity
- Green/Amber/Red zone language must be captured
- Table of Knowledge scaffold must exist with recommendation categories and level 1-5 comments
- trainer can save favorite/default chart configurations
- charts support AM, PM, and both AM/PM views
- history panel highlights horses by zone and can filter attention states
- roles include trainer, owner, vet, stable staff, and admin
- owner is read-only
- vet is read-only unless trainer changes access
- stable staff has limited write
- admin has full access and control
- launch readiness includes production Supabase, validated RLS, proven auth boundaries, tested Stripe, stable portal workflows, optimized mobile UX, no preview mode, no placeholder data, monitoring, and rollback

## Manual Intervention Rule

If anything required for this planning sprint cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This applies especially if the attached DOCX cannot be copied into references or if critical formula/domain-rule source material is unavailable.
