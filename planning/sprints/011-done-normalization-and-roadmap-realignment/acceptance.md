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
