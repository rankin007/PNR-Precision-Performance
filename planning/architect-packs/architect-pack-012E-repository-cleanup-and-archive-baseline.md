============================================================
FILE: planning/sprints/012E-repository-cleanup-and-archive-baseline/requirements.md
============================================================

# Sprint 012E - Repository Cleanup And Archive Baseline Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user asked Architect to review the Builder report, confirm whether anything else was needed, and create Sprint 012E in accordance with the Architect recommendation that cleanup should occur after the Sprint 012D baseline decision and before Sprint 013 product/data-model work.

Sprint 012D is complete. It produced branch `codex/012d-production-baseline` at commit `358e1fc`, with no deployment, push, or PR performed.

## Goal

Create a clean, documented, archive-first project surface before Sprint 013 begins, without changing production behavior.

The sprint should reduce confusion from stale, duplicate, generated, temporary, or misleading files and folders, especially items that could misdirect Sprint 013 schema/storage/RLS planning.

## Current Evidence Baseline

- Production remains live at `https://precisionperformance.com.au` from deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 012D baseline branch is `codex/012d-production-baseline` at commit `358e1fc`.
- Sprint 012D did not deploy, push, PR, mutate production, Supabase, Stripe, DNS, or Vercel settings.
- The main workspace remains broad and dirty from prior sprint reconstruction/history.
- `.release-main/` and generated/duplicated artifacts have been repeatedly identified as inspection hazards.
- Sprint 001 previously chose archive-first cleanup rather than deletion; that principle remains active.
- Validation wrapper logs now default to `.validation-logs/`, support `-LogDir`, and fall back safely with `LOG_DIR_FALLBACK`.

## In Scope

Builder may:

- inspect the repository and planning layer for stale, duplicate, generated, temporary, or misleading files and folders
- classify cleanup candidates as archive, keep, ignore, or needs-user-decision
- move approved cleanup candidates into `references/archive/sprint-012e-repository-cleanup/`
- create or update `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`
- create a short cleanup evidence document under `docs/`
- update `.gitignore` only for generated/log/cache files that should stay out of source control
- update planning state/status/briefing/decisions/risks/questions to reflect cleanup outcome
- run route listing, lint, TypeScript, build, and lightweight smoke checks where feasible
- document any candidates that are too risky or ambiguous to archive

## Out Of Scope

Builder must not:

- delete files or folders
- deploy to Vercel
- push to remote
- create a pull request
- mutate production data, DNS, Supabase, Stripe, Vercel project settings, users, horses, products, orders, payments, subscriptions, or customer data
- change authentication, authorization, RLS, schema, migrations, billing, checkout, webhook, or role behavior
- implement Sprint 013-016 product features
- remove or rewrite source files that affect app routes or runtime behavior unless Architect/user separately authorizes that exact action
- archive `.env*` or secret-bearing files into `references/`
- print, copy, summarize, or store secret values or secret fragments
- install packages from the network without approval
- clean outside the repository or approved writable roots

## Approved File Set

Builder may edit:

- `references/archive/sprint-012e-repository-cleanup/**`
- `docs/REPOSITORY_CLEANUP_012E.md`
- `.gitignore`, only for generated/log/cache ignore rules
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Builder may move/archive only files or folders that are clearly non-runtime or explicitly approved by this sprint after inspection, such as:

- stale generated output
- validation logs
- temporary reconstruction notes
- duplicated legacy handoff files
- obsolete release snapshots that are not the active source of truth
- cache/build artifacts accidentally present in the workspace

Inspection-only unless separately approved:

- production source under `app/`, `components/`, `lib/`, `supabase/`, `scripts/`, and root config files
- `.env*` names/presence only, no values
- `.release-main/`
- `.vercel/project.json`
- Sprint 012C/012D temporary worktrees under `C:\tmp`

## Required Output

Builder must produce:

- cleanup candidate inventory
- keep/archive/defer decision list
- archive manifest with original paths and reasons
- confirmation no deletion was performed
- confirmation no secrets were archived
- confirmation no production behavior files were modified except approved planning/docs/ignore changes
- validation results
- list of unresolved cleanup candidates needing user decision
- updated Architect briefing for the next sprint

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

============================================================
FILE: planning/sprints/012E-repository-cleanup-and-archive-baseline/blueprint.md
============================================================

# Sprint 012E - Repository Cleanup And Archive Baseline Blueprint

## Execution Shape

Sprint 012E is a reversible cleanup sprint. It prepares the project for Sprint 013 without changing application behavior.

Run the work in this order:

1. Establish current branch, commit, and dirty status.
2. Read current planning state, briefing, risks, questions, sprint schedule, and Sprint 012D evidence.
3. Inventory cleanup candidates.
4. Classify each candidate as keep, archive, ignore, or needs-user-decision.
5. Archive only low-risk approved candidates.
6. Write a cleanup manifest and evidence doc.
7. Validate that route/source behavior is unchanged.
8. Update planning docs and stop.

## Candidate Inventory

Use non-destructive inspection first:

- `git status --short`
- `git ls-files`
- `Get-ChildItem -Force`
- `rg --files`
- targeted directory listings for `.release-main/`, generated output, logs, references, docs, and planning

Candidate classes:

| Class | Treatment |
|---|---|
| Active canonical files | Keep |
| Generated/log/cache artifacts | Ignore or archive if already present as meaningful evidence |
| Superseded planning/handoff files | Archive with manifest entry |
| Legacy release snapshots | Defer unless clearly documented as non-runtime |
| Runtime app/source files | Inspect only |
| Secret-bearing files | Do not archive; names/presence only |
| Ambiguous files | Defer and ask/user-decision list |

## Archive Path

Use:

`references/archive/sprint-012e-repository-cleanup/`

Required manifest:

`references/archive/sprint-012e-repository-cleanup/MANIFEST.md`

Manifest entries must include:

- original path
- archived path
- classification
- reason
- whether tracked by git before move, if known
- validation or inspection note

## Cleanup Boundaries

Archive-first means move, do not delete.

If a move might affect runtime behavior, do not move it in this sprint.

Do not move:

- `app/**`
- `components/**`
- `lib/**`
- `supabase/**`
- `scripts/**`
- root config files
- package files
- `.env*`
- `.vercel/**`

Exceptions require explicit user approval before action.

## Recommended High-Value Checks

Builder should specifically inspect and classify:

- `.release-main/`
- old validation log locations
- `.validation-logs/`
- stale archive paths from Sprint 001
- duplicate starter/handoff files at repo root
- generated build output accidentally present in the workspace
- OneDrive metadata such as `desktop.ini`
- temp reconstruction notes or artifacts that do not belong in active source

## Validation

Required:

- `git status --short` before and after cleanup
- source route inventory before and after cleanup, if feasible
- confirm no `.env*` or secret-bearing files were archived
- confirm no production runtime files changed
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox validation fails for known sandbox/log/build reasons, request approval for the bounded outside-sandbox validation path and record both outcomes.

Optional lightweight smoke if a local server is already available or can be started safely:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- anonymous protected-route redirect check

## Documentation

Create:

- `docs/REPOSITORY_CLEANUP_012E.md`
- `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`

Update:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

## Stop Conditions

Stop and ask before:

- deleting anything
- moving runtime source
- moving secrets or `.env*`
- changing schema/auth/RLS/Stripe/checkout/webhook behavior
- changing deployment config in a way that affects production
- resolving ambiguous candidates by assumption
- pushing, PR creation, or deployment

If uncertain, classify the item as `needs-user-decision` and leave it in place.

============================================================
FILE: planning/sprints/012E-repository-cleanup-and-archive-baseline/acceptance.md
============================================================

# Sprint 012E - Repository Cleanup And Archive Baseline Acceptance

## Required Acceptance Criteria

- Architect Pack 012E is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012E.
- Builder reads the Sprint 012E four-file sprint set before cleanup.
- Builder records current branch/commit and dirty status.
- Builder produces a cleanup candidate inventory.
- Builder classifies candidates as keep, archive, ignore, or needs-user-decision.
- Builder archives only low-risk approved candidates under `references/archive/sprint-012e-repository-cleanup/`.
- Builder writes `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`.
- Builder writes `docs/REPOSITORY_CLEANUP_012E.md`.
- No files or folders are deleted.
- No `.env*`, credentials, secrets, tokens, private keys, password files, full connection strings, or secret fragments are archived, printed, or stored.
- No production runtime behavior is changed.
- No schema, migration, auth, authorization, RLS, Stripe, checkout, webhook, billing, or data-model behavior is changed.
- No deployment, push, PR, DNS change, Vercel setting change, Supabase mutation, Stripe action, or production data mutation is performed.
- Route/source behavior is confirmed unchanged or any discrepancy is treated as a blocker.
- Lint, TypeScript, and build are run and recorded, or blocked with exact evidence and manual-intervention steps.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Cleanup Acceptance Matrix

| Case | Expected result |
|---|---|
| Archive root | `references/archive/sprint-012e-repository-cleanup/` exists if anything is archived |
| Manifest | Every archived item has original path, archived path, reason, and validation note |
| Deletion | None performed |
| Secrets | None archived or exposed |
| Runtime source | Not moved or changed |
| `.release-main/` | Classified clearly; archived only if proven safe and approved by sprint criteria |
| Ambiguous files | Deferred, not moved |
| Validation | Passed or meaningful blocker recorded |
| Production actions | Not performed |

## Manual Intervention Record

For each blocked or deferred item, Builder must include:

- blocked/deferred item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action

============================================================
FILE: planning/sprints/012E-repository-cleanup-and-archive-baseline/handoff-prompt.md
============================================================

# Sprint 012E - Builder Handoff Prompt

You are Builder for Sprint 012E - Repository Cleanup And Archive Baseline in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012E-repository-cleanup-and-archive-baseline/requirements.md`
5. `planning/sprints/012E-repository-cleanup-and-archive-baseline/blueprint.md`
6. `planning/sprints/012E-repository-cleanup-and-archive-baseline/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Clean the project surface before Sprint 013 by archiving clearly stale, redundant, generated, temporary, or misleading files.

Do not change production behavior.

## Guardrails

Do not delete anything.

Do not deploy.

Do not push.

Do not create a pull request.

Do not move or archive `.env*` or secret-bearing files.

Do not print, store, summarize, or copy secret values or fragments.

Do not modify schema, migrations, auth, authorization, RLS, Stripe, checkout, webhook, billing, production data, DNS, Vercel settings, users, horses, products, orders, payments, or subscriptions.

Do not implement Sprint 013-016 product features.

Do not move runtime source files unless separately approved.

If a file is ambiguous, leave it in place and list it as `needs-user-decision`.

## Suggested Execution

1. Read sprint files and current planning state.
2. Record current branch, commit, and `git status --short`.
3. Inventory cleanup candidates.
4. Classify candidates as keep, archive, ignore, or needs-user-decision.
5. Archive low-risk approved candidates to `references/archive/sprint-012e-repository-cleanup/`.
6. Write `MANIFEST.md` with original path, archived path, classification, reason, tracked status if known, and validation note.
7. Write `docs/REPOSITORY_CLEANUP_012E.md`.
8. Confirm no secrets or runtime behavior files were archived.
9. Run lint, TypeScript, build, and route/source checks.
10. Update planning state/status/briefing/risks/questions/schedule.
11. Stop before any deployment, push, PR, deletion, or product feature work.

## Closeout Standard

At close, the next Architect should know:

- what was archived
- what was intentionally kept
- what remains ambiguous
- whether validation passed
- whether any cleanup needs user decision
- whether Sprint 013 can safely begin from the cleaned project surface

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

Sprint 011 is complete as a Done normalization and roadmap realignment sprint. Builder preserved and distilled the attached `Precision Performance Done.docx`, created `planning/DEFINITION_OF_DONE.md`, realigned `planning/SPRINT_SCHEDULE.md` for Sprints 011-016, updated decisions/domain/risks/questions plus planning-level architecture/API notes, and kept Sprint 010 live acceptance blockers visible as separate from the fuller Done target.

Sprint 012 is complete as a live acceptance closeout and safety hardening sprint with final status: partial with documented blockers. Builder hardened malformed checkout POST parsing locally, validated lint/TypeScript/build, verified production public/safety smoke, and re-blocked Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay with exact manual-intervention instructions.

Sprint 012A was blocked before deployment because `HEAD + checkout fix` would omit current production behavior such as `/admin/commerce`. Sprint 012B is complete as a production source provenance investigation. Builder confirmed production deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`, found that Vercel metadata does not expose an exact Git source snapshot, compared current dirty workspace, clean `8bf310a`, `C:\tmp\pp-012a-clean-20260714-165007`, and `.release-main`, and concluded the current dirty workspace is the closest local route-shape match while no clean committed production baseline is currently recoverable.

Sprint 012C is complete as a no-deploy production baseline reconstruction sprint. Builder created `C:\tmp\pp-012c-baseline-lean-20260714-173135`, verified exact normalized route parity against current production, preserved `/admin/commerce`, excluded known `.release-main` extra routes and local `.env*` files, validated lint/TypeScript/build, and confirmed checkout malformed POST redirects locally. No deployment was performed.

Sprint 012D is complete as a baseline commit and deployment approval sprint. Builder converted the Sprint 012C candidate into reviewed branch `codex/012d-production-baseline` at commit `358e1fc`, validated lint/TypeScript/build, locally smoked the public/setup/admin-commerce/checkout/webhook safety paths, hardened the validation wrapper log path, and prepared deployment approval notes. No deployment, push, PR, DNS change, Vercel project-setting change, Supabase mutation, Stripe action, or production data mutation was performed.

Sprint 012E is approved as a repository cleanup and archive baseline sprint. Builder may inspect and archive clearly stale, duplicate, generated, temporary, or misleading files into `references/archive/sprint-012e-repository-cleanup/` with a manifest. Sprint 012E does not authorize deletion, production behavior changes, schema/auth/RLS/Stripe changes, deployment, push, or PR work.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 012E touches project structure in a production, auth, RLS, data, and payment-capable app. Cleanup must be reversible, archive-first, and must not change runtime behavior or production state.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 012E approved scope without another approval.

Sprint 012E explicitly authorizes:

- inspecting repository structure and planning/docs/source surfaces
- classifying cleanup candidates as keep, archive, ignore, or needs-user-decision
- moving low-risk non-runtime cleanup candidates into `references/archive/sprint-012e-repository-cleanup/`
- creating `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`
- creating `docs/REPOSITORY_CLEANUP_012E.md`
- updating `.gitignore` only for generated/log/cache ignore rules
- updating planning state/status/briefing/decisions/risks/questions/schedule
- running local validation and route/source checks

Builder must stop and ask before:

- deleting files or folders
- moving or changing runtime source files
- archiving `.env*` or secret-bearing files
- changing authentication, authorization, RLS, schema, migrations, Stripe, checkout, webhook, billing, data model, or production behavior
- deploying anything to Vercel
- pushing to remote
- creating a pull request
- modifying production data, DNS, Supabase, Stripe, or Vercel project settings
- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- installing packages from the network
- implementing Sprint 013-016 product features

---

## Active Sprint

`planning/sprints/012E-repository-cleanup-and-archive-baseline/`

Sprint 012E - Repository Cleanup And Archive Baseline

---

## Approved Sprint Schedule

Sprints 001-012D are complete. Sprint 012E is the current approved cleanup/archive sprint before Sprint 013 data-model work begins.

Sprint 013 remains next product-build sprint after Sprint 012E closes, unless the user first authorizes deployment of the Sprint 012D baseline.

---

## Next Actions

1. Builder applies Architect Pack 012E if not already applied.
2. Builder reads the Sprint 012E four-file sprint set and uses it as the source of truth.
3. Builder inventories cleanup candidates.
4. Builder classifies each candidate as keep, archive, ignore, or needs-user-decision.
5. Builder archives only low-risk approved candidates into `references/archive/sprint-012e-repository-cleanup/`.
6. Builder writes the cleanup manifest and evidence doc.
7. Builder validates no runtime behavior changed.
8. Builder updates planning docs and briefing.
9. Builder stops without deleting, deploying, pushing, creating a PR, or starting Sprint 013 product work.

---

## Blockers

Sprint 012E is blocked if cleanup cannot proceed without deleting files, moving runtime source, exposing secrets, changing production behavior, or resolving ambiguous files by assumption. If blocked, Builder must document evidence and ask for a user decision.

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "012E-repository-cleanup-and-archive-baseline",
  "updated": "2026-07-15T00:00:00+10:00"
}
