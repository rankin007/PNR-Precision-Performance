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

Sprint 001 is complete as a truth and readiness audit. It confirmed that lint completes cleanly, the app surface is broad but only partially production-verified, and `npm run build` currently times out after the Next.js startup banner when run through the bounded validation wrapper.

Sprint 002 is approved as a narrow build-readiness sprint. The goal is not to add features or redesign the app. The goal is to make `npm run build` finish reliably with an explicit exit code, capture evidence, and leave the project ready for the next product implementation sprint.

---

## Workflow Profile

Selected profile: `standard`

Reason: this is an existing web application with Supabase, Stripe, auth, data-entry, and deployment surfaces. Sprint 002 is narrow, but build behavior can touch shared app, routing, environment, and framework configuration surfaces.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 002 approved scope without another approval.

Builder must stop and ask before:

- changing product behavior beyond the smallest build-readiness fix required by evidence
- touching secrets or credential values
- deleting files or data
- changing authentication, authorization, billing, database schema, RLS, migrations, or payment behavior
- modifying files outside the approved file set
- archiving or removing `.release-main/`, generated artifacts, or OneDrive-blocked cleanup candidates
- starting production deployment work

---

## Active Sprint

`planning/sprints/002-build-readiness/`

Sprint 002 - Build Readiness

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads `planning/sprints/002-build-readiness/SPRINT.md`.
3. Builder records baseline `git status --short`.
4. Builder reproduces the build timeout using `scripts/run-validation-command.ps1`.
5. Builder isolates the cause of the build hang using bounded, evidence-driven checks.
6. Builder makes the smallest approved fix needed for `npm run build` to complete.
7. Builder records lint/build validation results and refreshes `planning/ARCHITECT_BRIEFING.md` at close.

---

## Blockers

No blocker for Sprint 002. Unknowns should be captured in `planning/QUESTIONS.md` rather than expanding scope.

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
| 2026-07-11 | Sprint 002 will focus exclusively on build readiness. | Sprint 001 found that lint passes but `npm run build` times out before meaningful progress output. Feature work should wait until the build has a reliable exit path. | Builder should diagnose and fix the build hang without broad product changes. |
| 2026-07-11 | Sprint 002 remains on the `standard` workflow profile. | The immediate work is narrow, but build fixes may touch shared Next.js, app route, dependency, or environment-loading surfaces. | Builder may work inside the approved file set, but auth, RLS, Stripe, schema, secrets, and deployment remain stop-and-confirm areas. |
| 2026-07-11 | Sprint 002 should use the bounded validation wrapper for build/lint checks. | Prior validation attempts created orphaned `node.exe` processes and blocked progress. | Builder must use the wrapper for potentially hanging validation commands and record exact outcomes. |

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

The current codebase is a partially built Next.js/Supabase/Stripe application with a 120x planning layer added on top.

---

## Feature Or Fix Request

Sprint 002 is a build-readiness fix.

The Builder should make `npm run build` complete reliably with an explicit exit code using the bounded validation wrapper, without changing user-facing product behavior except for the smallest code/config correction required to unblock the build.

---

## Current Behavior

Known from Sprint 001:

- The repository contains a Next.js app with public, portal, admin, data-entry, shop, health, setup, checkout, and webhook surfaces.
- Supabase migrations and Stripe checkout/webhook scaffolding exist.
- `npm run lint` completes with no ESLint warnings or errors.
- `npm run build` times out after 120 seconds at the Next.js startup banner when run through `scripts/run-validation-command.ps1`.
- The validation wrapper cleans up validation-related `node/npm` processes after timeout.
- The build hang appears to occur before meaningful Next.js progress output.
- `.release-main/` remains at the project root because Sprint 001 archive was blocked by file permissions.
- The worktree is dirty with many pre-existing source changes.

---

## Desired Behavior

After Sprint 002:

- `npm run lint` completes with an explicit exit code through the wrapper.
- `npm run build` completes with an explicit exit code through the wrapper.
- No orphan `node/npm` validation processes remain after checks.
- The cause of the build timeout is documented.
- Any code/config changes are narrow, evidence-based, and limited to build readiness.
- `docs/READINESS_AUDIT.md`, `docs/VALIDATION.md`, and `planning/ARCHITECT_BRIEFING.md` reflect the new baseline.

---

## Known Files Or Modules To Inspect

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `app/`
- `components/`
- `lib/`
- `content/`
- `supabase/`
- `scripts/run-validation-command.ps1`
- `docs/READINESS_AUDIT.md`
- `docs/VALIDATION.md`
- environment files, presence/shape only; do not print secret values
- `.release-main/`, inspection only unless separately approved

---

## Constraints / Out Of Scope

- Do not add new product features.
- Do not redesign pages or components for visual polish.
- Do not deploy to production.
- Do not change auth, authorization, Stripe, database schema, RLS, migrations, or secrets without stopping for approval.
- Do not print secret values.
- Do not delete files, generated artifacts, data, or cleanup candidates.
- Do not force-remove or force-archive `.release-main/` during this sprint.
- Do not normalize the entire dirty worktree.
- Do not chase broad type/lint cleanup unless directly required for build completion.
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
| Build diagnosis expands into broad feature or architecture work. | Medium | High | Keep Sprint 002 limited to reproducing, isolating, fixing, and documenting build readiness. | Active |
| Validation hangs again and leaves orphaned `node/npm` processes. | Medium | Medium | Use `scripts/run-validation-command.ps1` for build/lint checks; record timeout output and process cleanup results. | Active |
| Build hang is caused by OneDrive filesystem behavior, generated `build/` output, or stale caches rather than app code. | Medium | Medium | Test bounded hypotheses one at a time and document evidence before editing app source. | Active |
| Build fix accidentally changes auth, RLS, Stripe, schema, webhook, or payment behavior. | Low | High | Treat those areas as stop-and-confirm unless the build error directly identifies a small compile-time fix. | Active |
| Environment secrets are exposed during diagnosis. | Medium | High | Inspect only variable names and presence/absence; never print values. | Active |
| Dirty worktree makes it unclear which changes belong to Sprint 002. | High | Medium | Record baseline `git status --short`; list Sprint 002 changes separately at close; do not revert unrelated changes. | Active |
| `.release-main/` or duplicated artifacts confuse module resolution or validation. | Medium | Medium | Inspect as a possible cause, but do not delete or force-archive during Sprint 002 without approval. | Active |
| Dependency or lockfile changes are needed to make the build complete. | Medium | Medium | Allow narrow `package.json`/`package-lock.json` edits only when supported by build evidence; record exact reason. | Active |

============================================================
FILE: planning/QUESTIONS.md
============================================================

# Open Questions

| Question | Owner | Needed By | Status | Answer / Notes |
|---|---|---|---|---|
| What is the single next implementation target after build readiness is restored? | Architect / User | Sprint 002 close | Open | Sprint 001 recommended build readiness first. Sprint 002 should recommend the next product sprint after the build exits reliably. |
| Which deployment target is canonical for the next verification pass: Vercel, Railway, or local-only? | User / Architect | After Sprint 002 | Open | Sprint 002 should remain local/build-readiness focused unless deployment target is explicitly confirmed. |
| Should `.release-main/` and generated artifacts be removed with an elevated/OneDrive-aware cleanup pass later? | User / Architect | Later cleanup sprint | Open | Sprint 001 archive was blocked by Windows/OneDrive permissions. Sprint 002 may inspect but should not force-remove. |
| Should the dirty worktree be normalized before the first product implementation sprint? | Architect / User | Sprint 002 close | Open | Builder should report whether build-readiness changes make the baseline clear enough for the next sprint. |
| Are auth/RLS/Stripe/admin service-role flows intended to be production-verified before member-facing work? | Architect / User | Later hardening sprint | Open | Sprint 001 found these surfaces scaffolded but not production-verified. Sprint 002 does not verify them unless build errors require inspection. |

============================================================
FILE: docs/VALIDATION.md
============================================================

# Validation

## Anti-Hang / Loop Stopper

Validation commands that may hang must run through a bounded wrapper:

`powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`

The wrapper records stdout/stderr logs under `references/archive/sprint-001-cleanup/validation-logs/`, waits only for the configured timeout, and stops validation-related `node`/`npm` processes that appeared during that run. If the timeout fires, Builder records the visible output and continues diagnosis instead of retrying indefinitely.

Use the same wrapper for lint/build if a plain command hangs once. Do not run the same hanging command repeatedly in the same sprint without changing the command, timeout, or hypothesis being tested.

## Sprint 002 Validation Plan

Builder should record the exact result of each check, including command, status, timeout, exit code when available, log path when generated, and short interpretation.

Required checks:

- `git status --short`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`
- package script/config inspection
- Next config inspection
- route/module isolation only as needed to identify the build hang
- post-validation process check for validation-related `node/npm` processes

If build still times out, Builder should record:

- command
- timeout duration
- visible stdout/stderr summary
- log paths
- hypotheses tested
- remaining likely cause
- recommended next action

## Cleanup Validation

Sprint 002 is not a cleanup sprint.

Builder may inspect `.release-main/`, generated artifacts, or caches as possible build-readiness causes, but must not delete, force-move, or archive them without approval.

Historical Sprint 001 cleanup evidence remains in:

`references/archive/sprint-001-cleanup/MANIFEST.md`

============================================================
FILE: planning/sprints/002-build-readiness/SPRINT.md
============================================================

# Sprint 002 - Build Readiness

## Goal

Make the Precision Performance app build complete reliably.

The sprint is successful when `npm run build` finishes with an explicit exit code through the bounded validation wrapper, no validation-related orphan `node/npm` processes remain, and the cause/fix is documented clearly enough for the next Builder or Architect to trust the baseline.

## Scope

Builder should:

- record baseline `git status --short`
- reproduce the current `npm run build` timeout with the wrapper
- inspect package scripts, Next config, TypeScript config, generated output settings, and relevant route/module surfaces
- test focused hypotheses for the hang using bounded commands
- make the smallest code/config/dependency fix required for build completion
- avoid user-facing behavior changes unless they are directly required by a compile/build failure
- run lint and build through the wrapper after the fix
- verify no validation-related orphan `node/npm` processes remain
- update validation/readiness documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the new baseline and next recommended sprint

## Out of Scope

- new product features
- visual redesigns
- production deployment
- broad refactors
- normalizing the entire dirty worktree
- deleting files, generated artifacts, stale folders, or data
- force-archiving `.release-main/`
- changing authentication, authorization, billing, Stripe behavior, database schema, RLS, migrations, or secrets
- printing secret values
- production verification of Supabase, Stripe, admin service-role, webhook, or RLS behavior

## Files

Approved file set for edits during Sprint 002:

- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `scripts/run-validation-command.ps1`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- app/source files directly identified by build evidence as the cause of the hang or build failure

Inspection-only areas:

- `README.md`
- `app/`
- `components/`
- `lib/`
- `content/`
- `supabase/`
- `.github/`
- `.vercel/`
- `.release-main/`
- `build/`
- `.next/`
- environment files, presence/shape only; do not print secret values

Rules for source edits:

- If a build error identifies a specific file, Builder may make a narrow fix in that file.
- If the suspected fix touches auth, authorization, Stripe, payment, webhook behavior, database schema, RLS, migrations, secrets, or production deployment, Builder must stop and ask before editing.
- If more than a few source files appear necessary, Builder should stop and report the evidence instead of broadening scope.

Do not edit or archive outside the approved file set without stopping for approval.

## Acceptance

Sprint 002 is complete when:

- baseline `git status --short` is recorded
- build timeout is reproduced or explained with evidence
- root cause or most likely cause is documented
- the smallest required fix is made inside the approved scope
- `npm run lint` completes through the wrapper with explicit status
- `npm run build` completes through the wrapper with explicit status
- no validation-related orphan `node/npm` processes remain after checks
- `docs/READINESS_AUDIT.md` is updated with Sprint 002 results
- `docs/VALIDATION.md` reflects the current validation command baseline
- `planning/ARCHITECT_BRIEFING.md` is refreshed for the next Architect session
- no secrets are printed or stored
- no auth/RLS/Stripe/schema/payment behavior is changed without explicit approval

If `npm run build` still cannot be made to complete inside the sprint, the sprint may close only if the Builder has:

- tested and documented at least three focused hypotheses
- preserved the anti-hang behavior
- recorded all visible output/log paths
- identified the next smallest escalation path
- refreshed `planning/ARCHITECT_BRIEFING.md` with the blocker

## Validation

Required commands/checks:

- `git status --short`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`
- post-validation process check for `node/npm`

Optional bounded checks, if needed:

- `npm run build` with a longer wrapper timeout, only after a new hypothesis or evidence justifies it
- package/Next/TypeScript diagnostic commands that do not require network access
- route/module isolation by temporarily narrowing build inputs only if changes are reverted or formalized as an approved fix before close

Do not install packages from the network unless the build evidence proves a dependency issue and the user approves the required network access.

## Handoff

Builder, you are executing Sprint 002 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/002-build-readiness/SPRINT.md`
6. `docs/VALIDATION.md`
7. `docs/READINESS_AUDIT.md`
8. relevant source/config files identified by the build evidence

Implementation is authorized for this sprint only within the approved file set.

Start by recording git status, then reproduce the build timeout with the wrapper. Move in small steps: observe, form one hypothesis, test it with a bounded command, then make the narrowest fix supported by the evidence. Do not turn this into a feature sprint.

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "002-build-readiness",
  "updated": "2026-07-11T12:35:02+10:00"
}
