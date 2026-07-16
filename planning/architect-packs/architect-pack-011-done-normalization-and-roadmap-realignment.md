============================================================
FILE: planning/STATE.md
============================================================

# Project State

**Project:** Precision Performance
**Client:** Aprec8 Pty Ltd
**Mode:** Existing Project / Feature or Fix

---

## Current Status

The 120x planning layer is installed inside the existing Precision Performance project.

Client/source reference material is centralized under `references/`, including `references/client-docs/PNR and RJR EPP Working Information`.

Sprint 001 is complete as a truth and readiness audit.

Sprint 002 is complete as a build-readiness sprint. `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` complete through the bounded validation wrapper with explicit `exited 0` statuses when the build is run outside the restricted sandbox. The build is pinned to project-local Node `22.14.0` because global Node `24.14.1` caused Next.js `15.3.8` build startup to hang.

Sprint 003 is complete as a release baseline and environment truth sprint. The canonical local deployment target is documented as Vercel from local project evidence; the non-secret environment contract is documented; Stripe webhook secret-prefix diagnostic logging was removed; the dirty worktree baseline is recorded; and validation remains green through the bounded wrapper using the known-good unsandboxed build path.

Sprint 004 is complete as an auth, RLS, and portal access sprint. Auth redirects are constrained to local app paths; callback failure handling is non-sensitive; app auth context now distinguishes signed-in users from active portal members; portal layout uses a portal-specific access guard; RLS role-read policies now allow users to resolve their own active membership/permission context; and the acceptance matrix is documented in `docs/AUTH_RLS_PORTAL_ACCESS.md`.

Sprint 005 is complete as a portal and data-entry workflow sprint. The data-entry shell and actions now require operational write access, daily/feeding/track create actions verify user-scoped horse access before writing, submission correction flows verify the real record horse before updating, submission ID parsing preserves UUIDs, fallback submission IDs are coherent, and user-facing workflow errors are clearer. Evidence and manual-intervention instructions are documented in `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`.

Sprint 006 is complete as an admin and commerce hardening sprint. Admin user status and membership assignment flows now validate inputs and report clearer non-sensitive failures; `/admin/commerce` provides read-only product/order/payment visibility; `/shop` uses database-backed active products when configured and checkout-disabled fallback products otherwise; checkout validates product, price, currency, Supabase admin persistence, and Stripe readiness; webhook verification is mandatory and reconciliation is more idempotent for orders, payments, and order items. Evidence and manual-intervention instructions are documented in `docs/ADMIN_COMMERCE_HARDENING.md`.

Sprint 007 is complete as a production launch readiness verification and handoff sprint. Local/source-backed readiness is green, but production launch remained no-go until user/operator confirmation and live access were provided.

Sprint 008 is complete as a launch Supabase memberships and env readiness sprint. The user confirmed Vercel project `pnr-precision-performance`, confirmed all three launch domains are valid, and asked Builder to shape the Supabase membership/permission levels and repair Stripe env example guidance. Builder added an additive launch membership/permission seed migration, regenerated Supabase bootstrap SQL, created the launch membership matrix doc, recreated `.env.example` with placeholder-only Stripe/Supabase/Vercel guidance, and validated lint, TypeScript, and the known-good unsandboxed build path.

Sprint 009 is complete as a production launch deployment sprint. Architect Pack 009 was created and applied, Vercel production env names were verified by encrypted/configured status only, local validation passed, and production deployment completed to `https://precisionperformance.com.au` on Vercel deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`. Public/safety smoke passed. On 2026-07-12, the user accepted the remaining live items as known follow-up conditions: remote Supabase migration application, authenticated workflow smoke, and Stripe test checkout/webhook replay.

Sprint 010 is complete as a live acceptance closeout sprint with final status: partial with documented blockers. Builder verified local validation, Vercel production readiness, production public/safety smoke, and anonymous protected-route redirects. Remote Supabase migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain blocked by missing safe operator access, launch fixtures, and test-mode replay path.

Sprint 011 is approved as a Done normalization and roadmap realignment sprint. This sprint authorizes Builder to distill the attached `Precision Performance Done.docx` into canonical planning truth, align the project definition of Done and Sprint 011-016 roadmap, and document the new decisions, risks, open questions, and acceptance gates before further product build.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 011 changes the canonical product definition of Done and future build roadmap for an auth, RLS, production, data, payment, and recommendation-bearing application. It must not alter production code, schema, auth, billing, live data, or deployment state.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 011 approved scope without another approval.

Sprint 011 explicitly authorizes:

- reading and extracting the attached `Precision Performance Done.docx`
- copying or recording the Done source document into project references if filesystem access permits
- creating `planning/DEFINITION_OF_DONE.md`
- updating planning and documentation files listed in the approved file set
- creating the Sprint 011 closeout evidence and refreshed Architect briefing
- running formatting/validation checks that do not require network access or expose secrets

Builder must stop and ask before:

- editing production app source files
- changing database schema, migrations, RLS policies, auth, billing, Stripe, checkout, product behavior, or deployment settings
- applying remote migrations or mutating production data
- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- installing packages from the network
- modifying files outside the approved file set

---

## Active Sprint

`planning/sprints/011-done-normalization-and-roadmap-realignment/`

Sprint 011 - Done Normalization And Roadmap Realignment

---

## Approved Sprint Schedule

Sprints 001-010 are complete through live acceptance closeout, with Sprint 010 closed as partial with documented blockers. Sprint 011 is the current approved planning sprint to realign the canonical Definition of Done and recommended Sprint 011-016 sequence against the attached Done document.

---

## Next Actions

1. Builder applies Architect Pack 011.
2. Builder reads the Sprint 011 four-file sprint set and uses it as the source of truth.
3. Builder extracts and preserves the Done document content without treating raw prose as direct implementation instructions.
4. Builder creates the canonical project Definition of Done and updates the roadmap, decisions, domain context, risks, and questions.
5. Builder records what information is still required before build sprints 012-016.
6. Builder refreshes `planning/ARCHITECT_BRIEFING.md` at sprint close.

---

## Blockers

Sprint 011 should not be blocked by missing product formulas or Table of Knowledge content. Those unknowns must be recorded as explicit open questions and future-sprint inputs.

If the attached DOCX cannot be copied into `references/` because it is outside the writable workspace or otherwise inaccessible, Builder must document the source path, evidence checked, and exact manual action needed.

============================================================
FILE: planning/sprints/011-done-normalization-and-roadmap-realignment/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/011-done-normalization-and-roadmap-realignment/blueprint.md
============================================================

# Sprint 011 - Done Normalization And Roadmap Realignment Blueprint

## Execution Shape

Sprint 011 is a planning and documentation sprint. It prepares the project for the next build sequence by making the Done target explicit and durable.

Run the work in this order:

1. Establish the current planning baseline.
2. Extract and preserve the attached Done source.
3. Create the canonical Definition of Done.
4. Realign the sprint schedule and Sprint 012-016 recommendation.
5. Update decisions, domain, risks, and questions.
6. Add architecture/API planning placeholders where needed.
7. Close with status and Architect briefing updates.

## Baseline Discovery

Builder should inspect:

- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/ARCHITECTURE.md`
- `docs/API.md`
- existing sprint directories through Sprint 010

Builder should record the current branch/revision and dirty worktree status without reverting unrelated work.

## Done Source Handling

Source attachment:

`C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Precision Performance Done.docx`

Builder should:

1. Confirm the source path is accessible.
2. Extract the document text for review.
3. Copy the DOCX into `references/client-docs/PNR and RJR EPP Working Information/Precision Performance Done.docx` if it is not already present and if filesystem permissions allow.
4. If copying is blocked, document the manual intervention and continue using the extracted content for planning.

Do not rewrite the source DOCX.

## Canonical Definition Of Done

Create `planning/DEFINITION_OF_DONE.md`.

It should include:

- source authority and date reviewed
- current status: production app live, but not Done against the attached full target
- concise Done statement
- Done criteria grouped by product area
- acceptance checklist
- known gaps against current project
- required unresolved inputs
- relationship to Sprints 012-016

Recommended sections:

- `# Precision Performance Definition Of Done`
- `## Source Authority`
- `## Current Status`
- `## Done Statement`
- `## Product Done Criteria`
- `## Operational Acceptance Criteria`
- `## Launch Readiness Criteria`
- `## Not Yet Done`
- `## Required Decisions And Inputs`
- `## Roadmap Link`

## Sprint Schedule Realignment

Update `planning/SPRINT_SCHEDULE.md` so it no longer implies Sprints 003-007 alone are the full path to the newly defined Done target.

Recommended sequence:

- Sprint 011 - Done Normalization And Roadmap Realignment
- Sprint 012 - Live Acceptance Closeout And Safety Hardening
- Sprint 013 - Biochemistry Test Data Model
- Sprint 014 - Trainer Mobile Test Capture Workflow
- Sprint 015 - Scoring And Recommendation Engine
- Sprint 016 - Trends, History Panel, And Saved Charts

The schedule must preserve the fact that Sprints 001-010 already happened. It should explain that Sprints 003-010 produced a deployed MVP shell and partial live acceptance, while Sprints 011-016 move the project toward the attached trainer-ready Done target.

## Decision Updates

Update `planning/DECISIONS.md` with durable decisions such as:

- the attached `Precision Performance Done.docx` is source authority for the expanded Done target after distillation
- Sprint 011 is planning-only and must not implement product behavior
- Done now means the trainer-ready biochemistry portal, not merely a deployed MVP shell
- unresolved formulas and Table of Knowledge content must be captured as inputs, not invented
- photo/OCR and voice-to-text behavior should be scoped deliberately before implementation

## Domain Updates

Update `planning/DOMAIN.md` to describe the trainer-ready biochemistry portal:

- mobile trainer test capture
- voice notes
- uploads/photos/PDFs
- carbohydrate, conductivity, pH urine, pH saliva, turbidity, temperature, water intake, workload context
- hydration and health scoring
- recommendation output through Table of Knowledge
- secure trainer/owner/vet/stable-staff/admin roles
- trend charts, history panel, and saved chart views

Also reconcile the old out-of-scope language. Do not simply delete history; clarify that earlier MVP1 scope excluded some features, while the attached Done target now requires planning them into the forward roadmap.

## Risk Updates

Add risks for:

- scoring formulas not yet locked
- recommendation content could be clinically or operationally misleading if domain rules are vague
- Table of Knowledge content is not yet provided beyond scaffold requirements
- OCR/photo recognition reliability could create wrong readings
- voice-to-text could mishear horse names, notes, or numbers
- uploads require storage, privacy, retention, and access controls
- mobile under-60-second workflow may fail without performance budget and UX constraints
- role exceptions for vet/stable staff/trainer-managed access could broaden data visibility
- MVP/MVP2 boundary ambiguity could cause Builder to overbuild or underbuild

## Question Updates

Add or update questions for:

- exact Hydration Score formula
- exact Health Score formula and weights
- pH ideal range and calibration final decision
- conductivity input source and `1.43` multiplier rules
- Table of Knowledge initial comments by category and level
- recommendation disclaimer/review requirements
- whether OCR/photo recognition is MVP1, MVP2, or manual-confirmation only
- voice-to-text provider and fallback behavior
- upload retention, allowed file types, and storage buckets
- trainer-managed vet/stable staff access rules
- pricing/catalogue confirmation
- which Sprint 012 live acceptance tasks remain before product build continues

## Architecture And API Notes

Update `docs/ARCHITECTURE.md` and `docs/API.md` only at the planning level. Do not invent full contracts.

Architecture should identify future modules:

- test capture
- uploads/storage
- scoring
- recommendation/Table of Knowledge
- trend/reporting
- role/access/audit

API should identify required future endpoints or server actions at a high level:

- create test
- upload test media
- calculate/recalculate scores
- fetch horse trends
- manage Table of Knowledge entries
- manage chart favorites

## Validation

No app build is required unless Builder changes files that affect build behavior, which Sprint 011 should not do.

Builder should run:

- `git status --short`
- pack/sprint file presence checks
- markdown/content review by reading changed planning files
- optional `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-011-done-normalization-and-roadmap-realignment.md --check` before applying if this pack is being validated from source

Do not run network installs.

## Closeout

At close, Builder should update:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`

The final state should say whether Sprint 011 completed the Done normalization and what the next recommended sprint is.

============================================================
FILE: planning/sprints/011-done-normalization-and-roadmap-realignment/acceptance.md
============================================================

# Sprint 011 - Done Normalization And Roadmap Realignment Acceptance

## Required Acceptance Criteria

- Architect Pack 011 is saved and applied.
- `planning/STATE.md` authorizes Sprint 011 and limits Builder to planning/documentation work.
- The attached `Precision Performance Done.docx` is read and distilled.
- The Done source document is copied into project references, or a manual-intervention record explains why it could not be copied.
- `planning/DEFINITION_OF_DONE.md` exists and states the canonical Done target.
- `planning/SPRINT_SCHEDULE.md` is updated to distinguish:
  - completed Sprints 001-010
  - current deployed MVP shell and partial live acceptance
  - expanded trainer-ready Done target
  - recommended Sprints 012-016
- `planning/DECISIONS.md` records the Done authority and roadmap realignment decisions.
- `planning/DOMAIN.md` reflects the trainer-ready biochemistry portal target.
- `planning/RISKS.md` includes new scoring, recommendation, upload, OCR/photo, voice-to-text, mobile performance, role/access, and scope risks.
- `planning/QUESTIONS.md` includes unresolved formula, Table of Knowledge, calibration, role, upload, voice, OCR/photo, pricing, and launch questions.
- `docs/ARCHITECTURE.md` and `docs/API.md` identify future modules/contracts at planning level if updated.
- Existing live acceptance blockers from Sprint 010 remain visible and are not confused with the fuller Done target.
- No production source code, schema, auth, RLS, billing, Stripe, deployment, or data mutation is performed.
- No secrets or secret fragments are printed or stored.
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session.
- `planning/STATUS.json` is set to `complete` at sprint close.

## Definition Of Done Content Checklist

`planning/DEFINITION_OF_DONE.md` must include:

| Area | Required content |
|---|---|
| Source authority | Attached `Precision Performance Done.docx`, reviewed 2026-07-14 |
| Current status | Production live but not Done against full trainer-ready target |
| Trainer workflow | Mobile open, voice notes, uploads/photos/PDFs, numeric confirmation, submit test under 60 seconds |
| Inputs | Carbs, conductivity, pH urine, pH saliva, turbidity, temperature, water intake, workload/context notes |
| Calibration | `.1` pH calibration, `1.43` conductivity multiplier, 37.5 ideal temperature line, water intake `.5L` increments |
| Scores | Hydration Score and Health Score with Green/Amber/Red zones |
| Recommendations | Table of Knowledge scaffold and actionable hydration/feed/supplement/water guidance |
| Roles | Trainer, owner, vet, stable staff, admin with assigned-horse and no cross-stable visibility |
| Trends | Individual and combined line charts, AM/PM/Both filters, saved/favorite chart configurations, zone-highlighted history panel |
| Website integration | Public site CTA to secure mobile-first portal |
| Data model | Tests, horses, protocols/recommendations, users, assigned horses |
| Launch readiness | Production Supabase, RLS, auth, Stripe, stable workflows, mobile UX, no placeholder data, monitoring, rollback |
| Not yet Done | Explicit current gaps against repo/project evidence |
| Required inputs | Missing formulas, Table of Knowledge content, OCR/voice scope, access rules, upload rules |

## Roadmap Acceptance

The revised schedule must include:

| Sprint | Expected purpose |
|---|---|
| 011 | Done normalization and roadmap realignment |
| 012 | Live acceptance closeout and safety hardening |
| 013 | Biochemistry test data model |
| 014 | Trainer mobile test capture workflow |
| 015 | Scoring and recommendation engine |
| 016 | Trends, history panel, and saved charts |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action

## Validation

Required:

- `git status --short`
- changed-file review
- readback of the created/updated planning docs
- no secret scan if any copied/extracted content appears to contain credentials or private values

Optional:

- Architect pack check before application:
  - `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-011-done-normalization-and-roadmap-realignment.md --check`

============================================================
FILE: planning/sprints/011-done-normalization-and-roadmap-realignment/handoff-prompt.md
============================================================

# Sprint 011 - Builder Handoff Prompt

You are Builder for Sprint 011 - Done Normalization And Roadmap Realignment in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/011-done-normalization-and-roadmap-realignment/requirements.md`
5. `planning/sprints/011-done-normalization-and-roadmap-realignment/blueprint.md`
6. `planning/sprints/011-done-normalization-and-roadmap-realignment/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant docs under `docs/`

## Mission

Turn the attached `Precision Performance Done.docx` into durable project truth.

This is not a feature implementation sprint. Your job is to normalize the definition of Done, update the roadmap, and record the missing information required before Sprints 012-016 can build safely.

## Source Document

Use:

`C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Precision Performance Done.docx`

If accessible, copy it into:

`references/client-docs/PNR and RJR EPP Working Information/Precision Performance Done.docx`

Do not edit the source DOCX.

## Guardrails

Do not edit production app source files.

Do not implement test capture, scoring, recommendations, uploads, charts, voice-to-text, or OCR/photo recognition.

Do not change database schema, migrations, RLS, auth, billing, Stripe, checkout, products, deployment, or live data.

Do not print or store secrets.

Do not invent formulas, domain comments, or recommendation logic. Record missing items as questions.

Do not delete files or normalize unrelated dirty worktree changes.

## Suggested Execution

1. Read the sprint files and current planning docs.
2. Record current branch/revision and dirty worktree status.
3. Extract the Done DOCX text.
4. Preserve the DOCX in references if possible.
5. Create `planning/DEFINITION_OF_DONE.md`.
6. Update `planning/SPRINT_SCHEDULE.md` for Sprints 011-016.
7. Update decisions, domain, risks, and questions.
8. Add planning-level architecture/API placeholders if useful.
9. Confirm existing Sprint 010 live blockers remain visible.
10. Refresh `planning/ARCHITECT_BRIEFING.md` and close status.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- what the canonical Done target is
- where it is recorded
- what changed from the older MVP Done
- what is still missing before implementation
- which sprint should come next
- what Builder did and did not change

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "011-done-normalization-and-roadmap-realignment",
  "updated": "2026-07-14T00:00:00+10:00"
}
