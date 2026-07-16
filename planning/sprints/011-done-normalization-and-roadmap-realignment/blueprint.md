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
