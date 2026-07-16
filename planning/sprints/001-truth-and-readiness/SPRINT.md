# Sprint 001 - Truth And Readiness Audit

## Goal

Create a clean, evidence-based baseline for Precision Performance before the next build sprint.

This sprint confirms what works, what is incomplete, what is risky, what environment/service setup is missing, what stale files are confusing the project, and what the next narrow implementation target should be.

## Scope

Builder should:

- inspect the current app structure and route surfaces
- run or attempt lint/build validation
- map completed, incomplete, broken, and missing areas
- inspect Supabase, Stripe, auth, environment, and deployment readiness without exposing secrets
- inspect top-level cleanup candidates
- archive confirmed stale, generated, duplicate, empty, or superseded artifacts under `references/archive/sprint-001-cleanup/`
- write a cleanup manifest
- update readiness documentation
- recommend the next single implementation sprint
- refresh `planning/ARCHITECT_BRIEFING.md` at close

## Out of Scope

- broad rebuilds
- new product features
- visual redesigns
- production deployment
- auth, RLS, schema, migration, Stripe, billing, or secret changes
- deleting files instead of archiving them
- archiving current source code, migrations, package files, current planning files, or client reference material

## Files

Approved file set for edits during Sprint 001:

- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/FILE_INVENTORY.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `references/archive/sprint-001-cleanup/**`

Approved cleanup/archive source candidates, after inspection:

- `.logs/`
- `.release-main/`
- `build/`
- `desktop.ini`
- `tsconfig.tsbuildinfo`
- `ORCHESTRATOR.docx`
- `ORCHESTRATOR-export.docx`
- empty top-level `PNR and RJR EPP Working Information/`, if confirmed empty and safe to handle

Inspection-only areas:

- `README.md`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `app/`
- `components/`
- `lib/`
- `content/`
- `supabase/`
- `scripts/`
- `.github/`
- `.vercel/`
- environment files, presence/shape only; do not print secret values

Do not edit or archive outside the approved file set without stopping for approval.

## Acceptance

Sprint 001 is complete when:

- current git status is recorded
- lint result is recorded
- build result is recorded
- route/readiness map is documented in `docs/READINESS_AUDIT.md`
- completed, incomplete, missing, and risky areas are clearly listed
- environment/service readiness is summarized without exposing secrets
- cleanup candidates are either archived with reasons or explicitly left in place with reasons
- `references/archive/sprint-001-cleanup/MANIFEST.md` exists if any archive action occurs
- no source code behavior is changed unless separately approved
- next recommended sprint is narrow and evidence-based
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session

## Validation

Required commands/checks:

- `git status --short`
- `npm run lint`
- `npm run build`
- route tree inspection
- Supabase migration inspection
- environment contract inspection using variable names/presence only
- cleanup manifest review

If lint/build hangs or times out, record the timeout and visible output instead of retrying endlessly.

## Handoff

Builder, you are executing Sprint 001 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/sprints/001-truth-and-readiness/SPRINT.md`
5. `docs/VALIDATION.md`
6. relevant source/reference files

Implementation is authorized for this sprint only within the approved file set.

Start by recording git status and inspecting the project. Do not fix discovered app bugs during this sprint unless the fix is documentation-only or explicitly approved. Your job is to produce the truth, clean up safe stale artifacts by archiving, and recommend the next precise sprint.
