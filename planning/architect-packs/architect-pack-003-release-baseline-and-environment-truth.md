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

Sprint 002 is complete as a build-readiness sprint. `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` now complete through the bounded validation wrapper with explicit `exited 0` statuses. The build is pinned to project-local Node `22.14.0` because global Node `24.14.1` caused Next.js `15.3.8` build startup to hang.

Sprint 003 is approved as a release baseline and environment truth sprint. The goal is to remove ambiguity before product hardening: choose the canonical deployment target, record the dirty worktree baseline, verify the environment variable contract without exposing secret values, remove unsafe diagnostics such as Stripe secret-prefix logging, and confirm local validation remains green.

The approved path to Done remains Sprints 003-007 in `planning/SPRINT_SCHEDULE.md`.

---

## Workflow Profile

Selected profile: `standard`

Reason: this is an existing web application with Supabase, Stripe, auth, data-entry, and deployment surfaces. Sprint 003 is a release-baseline sprint that may inspect sensitive integration configuration, but it must avoid credential exposure and defer auth/RLS/Stripe behavior changes to later approved sprints.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 003 approved scope without another approval.

Builder must stop and ask before:

- touching or printing secret values, tokens, credentials, private keys, or password material
- deleting files or data
- changing authentication, authorization, billing, payment behavior, Stripe checkout/webhook behavior, database schema, RLS, migrations, or production data
- modifying files outside the approved file set
- force-archiving or force-removing `.release-main/`, generated artifacts, OneDrive-blocked cleanup candidates, or dependency folders
- starting a production deployment or changing production project settings
- installing packages from the network

---

## Active Sprint

`planning/sprints/003-release-baseline-and-environment-truth/`

Sprint 003 - Release Baseline And Environment Truth

---

## Approved Sprint Schedule

- Sprint 003 - Release Baseline And Environment Truth
- Sprint 004 - Auth, RLS, And Portal Access
- Sprint 005 - Portal And Data Entry Workflow
- Sprint 006 - Admin And Commerce Hardening
- Sprint 007 - Production Launch Readiness

Definition of Done: the MVP is live, tested, documented, and handoff-ready, with public site, auth, permission-safe portal, data-entry workflows, admin, Stripe, production deployment, smoke tests, and rollback notes verified.

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads `planning/sprints/003-release-baseline-and-environment-truth/SPRINT.md`.
3. Builder records baseline `git status --short` and summarizes intentional/unowned dirty-worktree areas without reverting user work.
4. Builder determines the canonical deployment target from project files and user-confirmed context where available; if the target cannot be proven, record it as an open question.
5. Builder verifies the environment variable contract by name/presence/requiredness only, never by printing values.
6. Builder removes unsafe diagnostics that log secret fragments, including Stripe secret-prefix logging, with narrow source edits only.
7. Builder confirms local validation remains green through the bounded wrapper and refreshes docs/planning at close.

---

## Blockers

No blocker for Sprint 003. Unknowns should be captured in `planning/QUESTIONS.md` rather than expanding into auth, RLS, Stripe, admin, data-entry, or deployment implementation.

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
| 2026-07-11 | Sprint 002 pins build execution to project-local Node `22.14.0`. | Global Node `24.14.1` repeatedly hung Next.js `15.3.8` before meaningful build progress, while Node `22.14.0` completed the build. | `npm run build` uses the local Node shim and future runtime upgrades should be planned/tested deliberately. |
| 2026-07-11 | Sprint 002 removes stale `build/types` from the active TypeScript graph. | Local Next output should not be type-checked as source, and stale generated types contributed to confusing build diagnosis. | `tsconfig.json` includes source plus `.next/types` and excludes `build` and `.release-main`. |
| 2026-07-11 | The approved path to Done is Sprints 003-007. | The app is build-ready but still needs release baseline, auth/RLS proof, real portal/data-entry workflows, admin/commerce hardening, and production launch verification. | Use `planning/SPRINT_SCHEDULE.md` as the durable roadmap. Do not treat the schedule itself as Builder implementation authorization. |
| 2026-07-11 | Sprint 003 will establish release baseline and environment truth before product hardening. | Auth, RLS, portal, admin, Stripe, and production launch work need a trustworthy repo/environment baseline first. | Builder may inspect and document deployment/environment/worktree truth and remove unsafe secret-fragment diagnostics, but must defer product behavior changes to later sprints. |

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

Sprint 003 is a release baseline and environment truth sprint.

The Builder should normalize project knowledge before product hardening by identifying the canonical deployment target, recording the dirty-worktree baseline, verifying the environment variable contract without exposing secret values, removing unsafe diagnostics that log secret fragments, and confirming validation remains green.

---

## Current Behavior

Known after Sprint 002:

- The repository contains a Next.js app with public, portal, admin, ops/data-entry, shop, auth, setup, checkout, and webhook surfaces.
- Supabase migrations and Stripe checkout/webhook scaffolding exist, but auth/RLS/admin service-role/Stripe behavior is not production-verified.
- `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` complete through the bounded validation wrapper with explicit `exited 0` statuses.
- `npm run build` is pinned to project-local Node `22.14.0`; global Node `24.14.1` hangs Next.js `15.3.8` startup.
- `.release-main/` remains at the project root because Sprint 001 archive was blocked by file permissions.
- The worktree is dirty with many pre-existing source changes.
- Deployment target truth and production environment configuration remain unverified.
- Unsafe diagnostic logging may exist around Stripe secret-prefix checks and must be removed if present.

---

## Desired Behavior

After Sprint 003:

- The canonical deployment target is documented, or the inability to prove it is recorded as a named open question.
- The dirty worktree is summarized clearly enough that future Builder work can distinguish Sprint 003 changes from pre-existing or user-owned work.
- Required environment variable names and categories are documented without secret values, secret fragments, or credential exposure.
- Unsafe diagnostics that print secret fragments, including Stripe secret-prefix logging, are removed or replaced with non-sensitive status logging.
- Local validation remains green through the bounded wrapper.
- `docs/READINESS_AUDIT.md`, `docs/VALIDATION.md`, and `planning/ARCHITECT_BRIEFING.md` reflect the new release baseline.

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
- `.github/`
- `.vercel/`
- deployment config files such as `vercel.json`, `railway.json`, `netlify.toml`, Docker files, or equivalent if present
- scripts under `scripts/`
- `docs/READINESS_AUDIT.md`
- `docs/VALIDATION.md`
- environment files, names/presence/shape only; do not print secret values
- `.release-main/`, inspection only unless separately approved

---

## Constraints / Out Of Scope

- Do not add new product features.
- Do not redesign pages or components for visual polish.
- Do not deploy to production.
- Do not change auth, authorization, billing, Stripe checkout/webhook behavior, database schema, RLS, migrations, or secrets without stopping for approval.
- Do not print secret values or secret fragments.
- Do not delete files, generated artifacts, data, or cleanup candidates.
- Do not force-remove or force-archive `.release-main/` during this sprint.
- Do not normalize the entire dirty worktree by reverting or rewriting unrelated user work.
- Do not install packages from the network without approval.
- Do not chase Node 24 compatibility inside this sprint.
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
| Future global Node upgrades reintroduce the Next.js build hang. | Medium | Medium | Keep `npm run build` pinned to project-local Node `22.14.0`; test runtime upgrades in a dedicated maintenance sprint. | Active |
| Codex restricted sandbox hangs while normal unsandboxed local build succeeds. | Medium | Low | Use the bounded wrapper and, when needed, run final Next build validation outside the restricted sandbox; record this distinction in validation docs. | Active |
| OneDrive offline placeholders return under `node_modules` or generated output. | Medium | Medium | Rebuild dependencies with `npm ci` if direct reads or Next build stall on placeholder files; avoid relying on dehydrated dependency trees. | Active |
| Dirty worktree makes it unclear which changes belong to future product work. | High | Medium | Sprint 003 must record baseline `git status`, summarize existing changes, and avoid reverting unrelated user work. | Active |
| Auth, RLS, admin service-role, Stripe, or webhook flows are scaffolded but not production-verified. | Medium | High | Plan focused integration hardening sprints; do not modify these surfaces casually inside unrelated feature work. | Active |
| `.release-main/` and duplicated/generated artifacts continue to confuse inspection. | Medium | Medium | Inspect only when relevant; defer removal/archival to an approved cleanup sprint with OneDrive-aware permissions. | Active |
| npm audit reports dependency vulnerabilities. | Medium | Medium | Review audit output in a dependency/security maintenance sprint; do not run `npm audit fix --force` during feature work. | Active |
| Secret values or fragments leak into logs during environment verification. | Medium | High | Verify variable names, presence, and requiredness only; remove diagnostics that log prefixes or fragments; do not print environment values. | Active |
| Deployment target assumptions send later work toward the wrong platform. | Medium | High | Sprint 003 must document the canonical deployment target from local evidence or leave a clear open question requiring user confirmation. | Active |

============================================================
FILE: planning/QUESTIONS.md
============================================================

# Open Questions

| Question | Owner | Needed By | Status | Answer / Notes |
|---|---|---|---|---|
| What is the next narrow product-readiness sprint after build readiness? | Architect / User | Next planning session | Answered | Approved next sprint is Sprint 003 - Release Baseline And Environment Truth. Full path to Done is locked in at `planning/SPRINT_SCHEDULE.md`. |
| Which deployment target is canonical for the next verification pass: Vercel, Railway, or local-only? | User / Architect | Sprint 003 | Open | Sprint 003 should inspect local project evidence and record the answer if proven; otherwise leave this as a user-confirmation item. |
| Should `.release-main/` and generated artifacts be removed with an elevated/OneDrive-aware cleanup pass later? | User / Architect | Later cleanup sprint | Open | Sprint 001 archive was blocked by Windows/OneDrive permissions. Sprint 003 may inspect only and must not force-remove. |
| Should the dirty worktree be normalized before the first product implementation sprint? | Architect / User | Sprint 003 close | Open | Sprint 003 should record the dirty baseline and recommend whether a separate normalization sprint is needed before Sprint 004. |
| Are auth/RLS/Stripe/admin service-role flows intended to be production-verified before member-facing work? | Architect / User | Product-readiness planning | Answered | Yes, but sequenced: release baseline first in Sprint 003, auth/RLS/portal in Sprint 004, portal/data-entry in Sprint 005, admin/commerce in Sprint 006, launch verification in Sprint 007. |
| Should global Node 24 support be pursued later? | Architect / Builder | Maintenance planning | Open | Current build is pinned to project-local Node `22.14.0`; global Node `24.14.1` repeatedly hung Next.js `15.3.8`. |
| What is the exact non-secret environment variable contract for local, staging, and production? | Builder / Architect | Sprint 003 close | Open | Sprint 003 should document required names and categories without values or fragments. |

============================================================
FILE: docs/VALIDATION.md
============================================================

# Validation

## Anti-Hang / Loop Stopper

Validation commands that may hang must run through a bounded wrapper:

`powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 120`

The wrapper records stdout/stderr logs under `references/archive/sprint-001-cleanup/validation-logs/`, waits only for the configured timeout, and stops validation-related `node`/`npm` processes that appeared during that run. If the timeout fires, Builder records the visible output and continues diagnosis instead of retrying indefinitely.

Use the same wrapper for lint/build if a plain command hangs once. Do not run the same hanging command repeatedly in the same sprint without changing the command, timeout, or hypothesis being tested.

## Current Build Baseline

Sprint 002 restored the local build baseline:

- `npm run lint` through the wrapper: exited `0`
- `npx tsc --noEmit --incremental false` through the wrapper: exited `0`
- `npm run build` through the wrapper: exited `0`

Build execution is pinned to project-local Node `22.14.0`. Do not treat global Node `24.14.1` as the project build runtime until a future maintenance sprint proves compatibility.

## Sprint 003 Validation Plan

Builder should record the exact result of each check, including command, status, timeout, exit code when available, log path when generated, and short interpretation.

Required checks:

- `git status --short`
- deployment-target/config inspection
- environment contract inspection by variable name and requiredness only
- secret-log scan for unsafe diagnostics, including Stripe secret-prefix logging
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for validation-related `node/npm` processes

If validation fails, Builder should record:

- command
- timeout duration, if any
- visible stdout/stderr summary
- log paths
- likely cause
- whether the failure is inside Sprint 003 scope
- recommended next action

## Environment Verification

Environment verification must not print secret values, credential values, tokens, passwords, private keys, or secret fragments.

Allowed:

- variable names
- required vs optional status
- local/staging/production category
- present/missing status
- short non-sensitive descriptions

Not allowed:

- actual values
- prefixes or suffixes of secret values
- token fragments
- decoded credential contents
- full connection strings
- screenshots or logs that expose values

## Cleanup Validation

Sprint 003 is not a cleanup or deletion sprint.

Builder may inspect `.release-main/`, generated artifacts, or caches as possible release-baseline risks, but must not delete, force-move, or archive them without approval.

Historical Sprint 001 cleanup evidence remains in:

`references/archive/sprint-001-cleanup/MANIFEST.md`

============================================================
FILE: planning/sprints/003-release-baseline-and-environment-truth/SPRINT.md
============================================================

# Sprint 003 - Release Baseline And Environment Truth

## Goal

Normalize the Precision Performance project into a trustworthy release baseline.

The sprint is successful when the deployment target, dirty-worktree baseline, non-secret environment contract, unsafe diagnostic logging status, and current validation baseline are documented clearly enough for Sprint 004 to start without guessing.

## Scope

Builder should:

- record baseline `git status --short`
- summarize the dirty worktree into intentional/current-work/unowned-or-unclear buckets where evidence allows
- inspect local deployment evidence and document the canonical deployment target, or record the target as an open question if it cannot be proven
- inspect environment files, config, scripts, docs, and source references to document required environment variable names and categories without printing values
- scan for unsafe diagnostics that log secret fragments, including Stripe secret-prefix logging
- remove or replace unsafe diagnostic logging with non-sensitive status logging
- confirm local validation remains green through the bounded wrapper
- update validation/readiness documentation
- refresh `planning/ARCHITECT_BRIEFING.md` at close with the Sprint 004 handoff

## Out of Scope

- new product features
- visual redesigns
- production deployment
- production project-setting changes
- broad refactors
- normalizing the entire dirty worktree by reverting or rewriting unrelated work
- deleting files, generated artifacts, stale folders, or data
- force-archiving `.release-main/`
- changing authentication, authorization, billing, Stripe checkout/webhook behavior, database schema, RLS, migrations, or secrets
- printing secret values or secret fragments
- production verification of Supabase, Stripe, admin service-role, webhook, or RLS behavior
- Node 24 compatibility work
- dependency/security remediation from `npm audit`

## Files

Approved file set for edits during Sprint 003:

- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/STATUS.json`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/ENVIRONMENT.md`, if created or updated for non-secret environment contract documentation
- `docs/DEPLOYMENT.md`, if created or updated for deployment-target documentation
- `README.md`, only for a narrow non-secret release-baseline pointer if needed
- `scripts/`, only for validation or non-secret environment-contract helpers if needed
- app/source files directly containing unsafe diagnostic logging that prints secret values or fragments
- config files directly related to deployment or environment contract documentation, if the edit is non-secret and does not change production behavior

Inspection-only areas:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `app/`
- `components/`
- `lib/`
- `content/`
- `supabase/`
- `.github/`
- `.vercel/`
- deployment config files such as `vercel.json`, `railway.json`, `netlify.toml`, Docker files, or equivalent if present
- `.release-main/`
- `build/`
- `.next/`
- environment files, names/presence/shape only; do not print secret values

Rules for source edits:

- If a file logs a secret value or secret fragment, Builder may make a narrow edit to remove that exposure.
- Replacement logging may state only non-sensitive facts such as configured/missing, mode name, or provider label.
- If the suspected fix touches auth behavior, authorization, Stripe checkout/webhook behavior, payment behavior, database schema, RLS, migrations, secrets, or production deployment, Builder must stop and ask before editing.
- If more than a few source files appear necessary, Builder should stop and report the evidence instead of broadening scope.

Do not edit or archive outside the approved file set without stopping for approval.

## Acceptance

Sprint 003 is complete when:

- baseline `git status --short` is recorded
- dirty-worktree summary is documented in `docs/READINESS_AUDIT.md` or another approved doc
- canonical deployment target is documented, or `planning/QUESTIONS.md` clearly records why it remains unconfirmed
- non-secret environment variable contract is documented by name/category/requiredness only
- unsafe secret-fragment diagnostics are removed or documented as not found
- no secret values or secret fragments are printed or stored
- `npm run lint` completes through the wrapper with explicit status
- `npx tsc --noEmit --incremental false` completes through the wrapper with explicit status
- `npm run build` completes through the wrapper with explicit status
- no validation-related orphan `node/npm` processes remain after checks
- `docs/READINESS_AUDIT.md` reflects Sprint 003 results
- `docs/VALIDATION.md` reflects the current validation command baseline
- `planning/ARCHITECT_BRIEFING.md` is refreshed for Sprint 004
- `planning/STATE.md` and `planning/STATUS.json` are updated at close
- no auth/RLS/Stripe/schema/payment/deployment behavior is changed without explicit approval

If the deployment target or environment contract cannot be fully proven locally, the sprint may still close if Builder records:

- evidence inspected
- the remaining unknown
- who must answer it
- the smallest next action needed before Sprint 004 or launch work

## Validation

Required commands/checks:

- `git status --short`
- deployment target evidence inspection
- non-secret environment variable reference scan
- secret-log scan for unsafe diagnostics
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Suggested safe search patterns:

- environment names: `NEXT_PUBLIC_`, `SUPABASE`, `STRIPE`, `DATABASE`, `SERVICE_ROLE`, `WEBHOOK`, `VERCEL`, `RAILWAY`
- unsafe logging: `console.log`, `console.warn`, `console.error`, `slice(`, `substring(`, `startsWith(`, `sk_`, `pk_`, `whsec_`
- deployment evidence: `.vercel`, `vercel`, `railway`, `netlify`, `docker`, `.github/workflows`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.

## Handoff

Builder, you are executing Sprint 003 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/003-release-baseline-and-environment-truth/SPRINT.md`
6. `planning/SPRINT_SCHEDULE.md`
7. `docs/VALIDATION.md`
8. `docs/READINESS_AUDIT.md`
9. relevant deployment/environment/source files identified by the evidence

Implementation is authorized for this sprint only within the approved file set.

Start by recording git status, then establish what the project itself proves about deployment and environment configuration. Keep the work factual and non-secret. Remove unsafe diagnostic logging if found, validate the app, and close with a clean handoff to Sprint 004 - Auth, RLS, And Portal Access.

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "003-release-baseline-and-environment-truth",
  "updated": "2026-07-11T16:20:54+10:00"
}
