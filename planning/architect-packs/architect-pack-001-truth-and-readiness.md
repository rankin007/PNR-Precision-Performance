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

Client/source reference material is now centralized under `references/`, including `references/client-docs/PNR and RJR EPP Working Information`.

Sprint 001 is approved as a truth and readiness sprint. The goal is not to rebuild the app. The goal is to inspect the current project, confirm what actually works, identify broken or risky areas, clean up stale or misdirecting project artifacts by archiving them, and name the narrow next implementation target.

---

## Workflow Profile

Selected profile: `standard`

Reason: this is an existing web application with Supabase, Stripe, auth, data-entry, and deployment surfaces. The sprint is mostly audit/cleanup, but the project has enough sensitive and production-adjacent areas that it should not use the `fast` profile by default.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 001 approved scope without another approval.

Builder must stop and ask before:

- changing production app behavior beyond audit/readiness fixes explicitly listed in the sprint
- touching secrets or credential values
- deleting files instead of archiving them
- changing authentication, authorization, billing, database schema, RLS, migrations, or payment behavior
- modifying files outside the approved file set
- archiving anything not clearly stale, duplicated, generated, empty, or superseded

---

## Active Sprint

`planning/sprints/001-truth-and-readiness/`

Sprint 001 - Truth And Readiness Audit

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads `planning/sprints/001-truth-and-readiness/SPRINT.md`.
3. Builder inspects the current app, routes, configuration, scripts, and top-level project folders.
4. Builder archives confirmed stale/misdirecting artifacts under `references/archive/sprint-001-cleanup/` with a manifest.
5. Builder records the readiness baseline and recommends the next narrow implementation sprint.
6. Builder refreshes `planning/ARCHITECT_BRIEFING.md` at close.

---

## Blockers

No blocker for Sprint 001. Unknowns should be captured in `planning/QUESTIONS.md` rather than blocking the readiness audit.

============================================================
FILE: planning/DECISIONS.md
============================================================

# Decisions

Record durable decisions future sprints must respect.

---

## Decision Log

| Date | Decision | Reason | Impact |
|---|---|---|---|
| 2026-07-11 | Sprint 001 will be a truth and readiness audit, not a feature build. | The project has meaningful app, backend, auth, Stripe, and planning surfaces, but needs a clean baseline before more features are added. | Builder should inspect, verify, document, and recommend the next narrow target before broad implementation. |
| 2026-07-11 | Sprint 001 includes cleanup by archiving stale or misdirecting files/folders rather than deleting them. | The project contains generated caches, duplicate docs, legacy handoff files, and an empty original source-material folder; cleanup is useful, but deletion is higher risk. | Builder may move approved cleanup candidates into `references/archive/sprint-001-cleanup/` and must write a cleanup manifest. |
| 2026-07-11 | Use the `standard` workflow profile for Sprint 001. | The work is mostly audit/cleanup, but the app includes auth, data, deployment, and payment surfaces. | Builder may work under sprint authorization, but must stop before secrets, auth, billing, schema, RLS, or scope expansion. |
| 2026-07-11 | Small sprint format is preferred for Sprint 001. | A single `SPRINT.md` is clearer than four thin placeholder files for this focused audit. | Builder follows `planning/sprints/001-truth-and-readiness/SPRINT.md` as the source of truth. |

============================================================
FILE: planning/DOMAIN.md
============================================================

# Domain Context

This file captures the operating context for the current feature/fix sprint inside the existing project.

---

## Client

Aprec8 Pty Ltd

---

## Product Context

Precision Performance is a racehorse-focused equine performance platform. The intended product direction includes public website pages, member/owner/trainer portal experiences, data-entry workflows, horse performance records, biochemistry-related source material, membership administration, reporting, and commerce/payment capability.

The current codebase appears to be a partially built Next.js/Supabase/Stripe application with a 120x planning layer added on top.

---

## Feature Or Fix Request

Sprint 001 is a truth and readiness audit.

The Builder should confirm what is complete, incomplete, broken, risky, stale, or misdirecting before the next feature sprint begins.

---

## Current Behavior

Known from initial inspection:

- The repository contains a Next.js app with public, portal, admin, data-entry, shop, health, setup, checkout, and webhook surfaces.
- Supabase migrations and Stripe checkout/webhook scaffolding exist.
- The 120x planning layer exists and has recently been simplified.
- Client reference documents have been moved into `references/client-docs/PNR and RJR EPP Working Information`.
- Some top-level generated, duplicate, legacy, or possibly stale artifacts remain.
- A previous lint/build check was interrupted or timed out, so build readiness is not yet confirmed.

---

## Desired Behavior

After Sprint 001, the project should have:

- a clear build/lint/type/status baseline
- a route and feature readiness map
- a known environment and integration checklist
- identified security/data/payment risks
- stale or misdirecting files archived with a manifest
- an explicit recommendation for the next narrow implementation sprint

---

## Known Files Or Modules To Inspect

- `package.json`
- `next.config.ts`
- `app/`
- `components/`
- `lib/`
- `supabase/migrations/`
- `scripts/`
- `docs/`
- `planning/`
- `references/`
- top-level generated/legacy artifacts and folders

---

## Constraints / Out Of Scope

- Do not rebuild broad product surfaces in Sprint 001.
- Do not add new user-facing features in Sprint 001 unless required to make the audit runnable and explicitly documented.
- Do not change auth, authorization, Stripe, database schema, RLS, migrations, or secrets without stopping for approval.
- Do not delete cleanup candidates; archive them.
- Do not archive source code, current planning files, package files, Supabase migrations, app routes, or client reference material.
- Automated AI recommendations in MVP 1 are out of scope unless later approved.
- Live laboratory integrations in MVP 1 are out of scope unless later approved.
- E-Trakka API/live integration in MVP 1 is out of scope unless later approved.
- Native in-app voice recording in MVP 1 is out of scope unless later approved.
- Multi-login trainer teams in MVP 1 are out of scope unless later approved.
- Owner, vet, or external stakeholder application logins in MVP 1 are out of scope unless later approved.
- Heavy AWS processing in MVP 1 is out of scope unless later approved.
- Laboratory staff application workflow in MVP 1 is out of scope unless later confirmed.

============================================================
FILE: planning/RISKS.md
============================================================

# Risks

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---:|---:|---|---|
| Sprint 001 expands into a broad rebuild. | Medium | High | Keep Sprint 001 limited to audit, verification, archive cleanup, documentation, and next-sprint recommendation. | Active |
| Cleanup accidentally removes useful project context. | Medium | High | Archive instead of delete; write a manifest; do not move source code, package files, migrations, current planning files, or reference material. | Active |
| Generated folders or cache artifacts confuse readiness assessment. | Medium | Medium | Identify generated/cached artifacts separately from source files and archive only when safe. | Active |
| Build/lint checks may be slow or hang. | Medium | Medium | Run checks with timeouts, capture the exact command/status, and record blocked checks in validation notes. | Active |
| Environment secrets may be present locally. | Medium | High | Do not print secret values; report only variable names/presence/absence. | Active |
| Auth, RLS, Stripe, or schema issues are discovered. | Medium | High | Document findings and recommend a follow-up sprint; do not change these areas during Sprint 001 without explicit approval. | Active |
| Existing dirty git worktree mixes prior changes with Sprint 001 changes. | High | Medium | Record baseline `git status`; do not revert unrelated changes; list Sprint 001 changes separately. | Active |

============================================================
FILE: planning/QUESTIONS.md
============================================================

# Open Questions

| Question | Owner | Needed By | Status | Answer / Notes |
|---|---|---|---|---|
| What is the single next implementation target after readiness is known? | Architect / User | Sprint 001 close | Open | Builder should recommend one narrow next sprint based on evidence. |
| Which external services are already connected for this project: Supabase, Vercel, Stripe, GitHub, Railway, domain/DNS? | User / Builder | Sprint 001 close | Open | Builder should inspect local config safely and report presence/absence only, not secrets. |
| Should archived legacy documents remain committed in the repo long term or move to external storage later? | User / Architect | Later cleanup sprint | Open | Sprint 001 archives locally for safety; future storage policy can be decided later. |
| Is the top-level empty `PNR and RJR EPP Working Information` folder safe to remove after confirming all 22 files are in `references/client-docs/`? | Builder | Sprint 001 | Open | If empty, Builder may archive/remove the empty folder marker only if Windows permits; do not touch the referenced copy. |

============================================================
FILE: planning/FILE_INVENTORY.md
============================================================

# File Inventory

This inventory is for Sprint 001 readiness orientation. Builder should update it after inspection.

---

## Core App Areas

- `app/` - Next.js App Router pages, route groups, and API routes.
- `components/` - UI components and section/layout helpers.
- `lib/` - Supabase, Stripe, auth, runtime, navigation, and domain helpers.
- `supabase/` - Supabase config, migrations, bootstrap SQL.
- `content/` - product requirements and source planning documents from the earlier app build.

---

## 120x Planning Layer

- `AGENTS.md` - canonical agent rules.
- `planning/STATE.md` - current status and implementation authorization.
- `planning/DECISIONS.md` - durable decisions.
- `planning/DOMAIN.md` - product and sprint context.
- `planning/RISKS.md` - active risks.
- `planning/QUESTIONS.md` - open questions.
- `planning/sprints/` - active and historical sprint scope.
- `planning/architect-packs/` - pack storage and pack command instructions.
- `docs/WORKFLOW_PROFILE.md` - workflow rigor profiles.
- `docs/ARCHITECT_BRIEFING_SPEC.md` - sprint-close briefing format.

---

## Source Material

- `references/client-docs/PNR and RJR EPP Working Information/` - client/source documents moved into the reference area.

---

## Cleanup Candidates For Sprint 001 Inspection

Builder may inspect and archive confirmed stale/misdirecting candidates into `references/archive/sprint-001-cleanup/`.

Candidate list:

- `.logs/` - likely generated logs.
- `.release-main/` - likely release/export artifact; inspect before moving.
- `build/` - likely generated build artifact; inspect before moving.
- `desktop.ini` - Windows metadata file.
- `tsconfig.tsbuildinfo` - TypeScript incremental build cache.
- `ORCHESTRATOR.docx` - likely duplicate/legacy document now superseded by 120x planning and `ORCHESTRATOR.md`; inspect before moving.
- `ORCHESTRATOR-export.docx` - likely duplicate/export artifact; inspect before moving.
- top-level `PNR and RJR EPP Working Information/` - should be empty after source materials were moved; confirm before handling.

Do not archive without approval in Sprint 001:

- `.git/`
- `.github/`
- `.vercel/`
- `.next/`
- `node_modules/`
- `app/`
- `components/`
- `lib/`
- `supabase/`
- `content/`
- `references/client-docs/`
- `package.json`
- `package-lock.json`
- environment files

============================================================
FILE: docs/VALIDATION.md
============================================================

# Validation

## Sprint 001 Validation Plan

Builder should record the exact result of each check, including command, status, and short interpretation.

Required checks:

- `git status --short`
- `npm run lint`
- `npm run build`
- inspect `package.json` scripts and dependencies
- inspect app route tree under `app/`
- inspect Supabase migrations under `supabase/migrations/`
- inspect Stripe and Supabase environment contracts without printing secret values
- inspect top-level cleanup candidates before archiving

If a command times out, fails, or is blocked, Builder should record:

- command
- timeout or failure
- visible error summary
- likely next action

## Cleanup Validation

If files/folders are archived, Builder must create:

`references/archive/sprint-001-cleanup/MANIFEST.md`

The manifest must list:

- original path
- archived path
- reason for archive
- whether the item looked generated, duplicate, empty, stale, or superseded
- any item intentionally left in place and why

Builder must not delete source material during Sprint 001.

============================================================
FILE: planning/sprints/001-truth-and-readiness/SPRINT.md
============================================================

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

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "001-truth-and-readiness",
  "updated": "2026-07-11T00:00:00+10:00"
}
