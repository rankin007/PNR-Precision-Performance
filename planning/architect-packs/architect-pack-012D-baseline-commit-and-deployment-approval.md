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

Sprint 012D is approved as a baseline commit and deployment approval sprint. Builder may convert the Sprint 012C candidate into a durable reviewed branch/commit, re-verify it, and prepare an explicit deployment approval package. Sprint 012D does not authorize production deployment.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 012D creates a durable production-equivalent baseline for an auth, RLS, production, data, and payment-capable app. It may stage and commit source code, but it must not deploy, expose secrets, mutate production data, run live financial actions, change DNS, or change production project settings.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 012D approved scope without another approval.

Sprint 012D explicitly authorizes:

- creating a new local branch using the `codex/` prefix
- creating a clean reviewed worktree or workspace from the Sprint 012C candidate
- copying the validated Sprint 012C candidate source into that branch/worktree
- preserving the Sprint 012 checkout malformed POST guard
- staging and committing the reviewed production-equivalent baseline plus checkout fix
- running local validation and route/smoke verification
- preparing deployment approval notes for a future sprint or explicit user instruction
- updating planning and evidence docs

Builder must stop and ask before:

- deploying anything to Vercel
- pushing to remote
- creating a pull request
- modifying production data, DNS, Supabase, Stripe, or Vercel project settings
- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting main workspace files or data
- making destructive database changes or rollbacks
- creating, deleting, or modifying real production users, horses, products, orders, payments, subscriptions, Stripe objects, or production customer data
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- implementing Sprint 013-016 product features
- installing packages from the network

---

## Active Sprint

`planning/sprints/012D-baseline-commit-and-deployment-approval/`

Sprint 012D - Baseline Commit And Deployment Approval

---

## Approved Sprint Schedule

Sprints 001-012C are complete. Sprint 012D is the current approved no-deploy sprint to make the validated Sprint 012C candidate durable and reviewable before any production deployment decision.

---

## Next Actions

1. Builder applies Architect Pack 012D.
2. Builder reads the Sprint 012D four-file sprint set and uses it as the source of truth.
3. Builder creates a branch/worktree for the reviewed baseline.
4. Builder imports the Sprint 012C candidate as the source baseline.
5. Builder validates route parity, checkout guard, lint, TypeScript, build, and local smoke.
6. Builder stages and commits the reviewed baseline if validation passes and stop conditions are clear.
7. Builder updates docs and briefing with commit hash, validation, and deployment approval recommendation.
8. Builder stops without deploying.

---

## Blockers

Sprint 012D is blocked if the Sprint 012C candidate cannot be converted into a clean branch/commit without losing route parity, introducing unexpected source changes, or requiring destructive operations. If blocked, Builder must document evidence and ask for a user decision.

============================================================
FILE: planning/sprints/012D-baseline-commit-and-deployment-approval/requirements.md
============================================================

# Sprint 012D - Baseline Commit And Deployment Approval Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendation to create Architect Pack 012D.

Sprint 012C produced a validated no-deploy candidate at:

`C:\tmp\pp-012c-baseline-lean-20260714-173135`

The Architect recommendation is to convert that candidate into a durable reviewed branch/commit before deployment, rather than deploying directly from a temporary folder.

## Goal

Create a traceable production-equivalent baseline branch/commit from the Sprint 012C candidate, re-verify it, and prepare a clear deployment approval package for the user.

No production deployment is authorized in Sprint 012D.

## Current Evidence Baseline

- Current production deployment remains `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 012C candidate path is `C:\tmp\pp-012c-baseline-lean-20260714-173135`.
- Sprint 012C candidate achieved exact normalized route parity with production: `25` production routes and `25` candidate routes, with no missing or extra routes.
- `/admin/commerce` is preserved in the candidate.
- Known `.release-main` extra routes are absent.
- Checkout malformed POST guard is present.
- Candidate lint, TypeScript, and build passed.
- Candidate local smoke passed for public/setup routes, anonymous `/admin/commerce`, checkout empty/malformed POST redirects.
- Unsigned webhook smoke returned `503` only because `.env*` files were intentionally excluded from the candidate.

## In Scope

Builder may:

- create a local branch using the `codex/` prefix
- create a clean local worktree or use a controlled branch workflow to import the Sprint 012C candidate
- copy source files from `C:\tmp\pp-012c-baseline-lean-20260714-173135`
- keep secrets excluded; do not copy `.env*`
- verify route parity and source shape
- run lint, TypeScript, build, and local smoke
- stage and commit the reviewed baseline plus checkout fix
- update deployment/readiness/validation docs with candidate-to-commit provenance
- update planning state/status/briefing
- prepare but not execute a future deployment approval recommendation

## Out Of Scope

Builder must not:

- deploy to Vercel
- push to remote
- create a pull request
- mutate production, DNS, Supabase, Stripe, or Vercel project settings
- copy `.env*` or secret-bearing files into the committed baseline
- delete or revert unrelated main workspace files
- implement Sprint 013-016 product features
- apply Supabase migrations remotely
- run Stripe live or test checkout against production unless a later sprint explicitly authorizes it
- install packages from the network without approval

## Approved File Set

Builder may edit:

- source files copied from `C:\tmp\pp-012c-baseline-lean-20260714-173135` into the Sprint 012D branch/worktree
- `.gitignore` only if needed to ensure secrets/build artifacts remain excluded
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`

Inspection-only:

- main dirty workspace for comparison
- `C:\tmp\pp-012c-baseline-lean-20260714-173135`
- `.vercel/project.json`
- `vercel.json`
- `.env*` names/presence only, no values

## Required Output

Builder must produce:

- branch name
- commit hash if committed
- exact source used
- confirmation `.env*` files were not committed
- route parity summary
- checkout guard confirmation
- validation results
- local smoke results
- deployment recommendation and stop point

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

============================================================
FILE: planning/sprints/012D-baseline-commit-and-deployment-approval/blueprint.md
============================================================

# Sprint 012D - Baseline Commit And Deployment Approval Blueprint

## Execution Shape

Sprint 012D turns the Sprint 012C candidate from a temporary folder into a traceable source baseline. It must stop before deployment.

Run the work in this order:

1. Establish current repo/candidate baseline.
2. Create a branch/worktree for the reviewed baseline.
3. Import the Sprint 012C candidate.
4. Confirm secrets/build artifacts are excluded.
5. Verify route parity and checkout fix.
6. Validate and smoke locally.
7. Stage and commit if validation passes.
8. Update docs and stop for deployment approval.

## Branch And Worktree

Recommended branch:

`codex/012d-production-baseline`

Builder may use either:

- a clean git worktree, or
- a careful branch workflow in the main repository

If the main workspace dirty state makes branch operations unsafe, prefer a separate worktree. Do not revert unrelated main workspace changes.

## Candidate Import

Candidate source:

`C:\tmp\pp-012c-baseline-lean-20260714-173135`

Import rules:

- copy app/source/config files from the candidate into the reviewed branch/worktree
- do not copy `.env*`
- do not copy `.next`, build output, caches, validation logs, OneDrive artifacts, or temp files
- preserve `app/api/checkout/route.ts` malformed POST guard
- preserve `/admin/commerce`
- preserve route parity with production evidence

## Verification

Confirm:

- branch name
- diff summary
- no `.env*` staged
- no build artifacts staged
- `/admin/commerce` exists
- checkout guard exists
- known `.release-main` extra routes remain absent
- normalized route parity remains consistent with Sprint 012C evidence

## Validation

Run:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox fails for known sandbox reasons, request approval for outside-sandbox bounded build and record both outcomes.

Local smoke where feasible:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `POST /api/checkout` empty/missing slug
- `POST /api/checkout` malformed/no-content-type body
- anonymous `GET /admin/commerce`
- unsigned webhook if safe config exists; otherwise document limitation if env is intentionally absent

## Commit

If validation passes and no stop condition triggers:

- stage only reviewed baseline files and approved docs
- commit with a clear message, recommended:
  - `chore: establish production baseline with checkout safety fix`

Do not push.

Do not create a PR.

## Documentation

Update:

- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`

Record:

- branch
- commit
- candidate source
- validation
- smoke
- whether ready for deployment approval

## Stop Conditions

Stop before commit if:

- `.env*` or secrets would be staged
- route parity is lost
- `/admin/commerce` is missing
- checkout guard is missing
- validation fails for a meaningful source reason
- import requires deleting unrelated main workspace changes

Always stop before deployment.

============================================================
FILE: planning/sprints/012D-baseline-commit-and-deployment-approval/acceptance.md
============================================================

# Sprint 012D - Baseline Commit And Deployment Approval Acceptance

## Required Acceptance Criteria

- Architect Pack 012D is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012D.
- Builder creates a local branch or worktree for the reviewed baseline.
- Sprint 012C candidate source is imported.
- `.env*`, build artifacts, caches, and temp files are not committed.
- `/admin/commerce` is preserved.
- Checkout malformed POST guard is preserved.
- Known `.release-main` extra routes remain absent.
- Route parity is checked and documented.
- Lint, TypeScript, and build are run and recorded.
- Local smoke is run where feasible and recorded.
- A commit is created if validation passes and stop conditions are clear.
- No deployment is performed.
- No push or PR is performed unless separately authorized.
- No secret values or fragments are printed or stored.
- Docs and planning files are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Commit Acceptance Matrix

| Case | Expected result |
|---|---|
| Branch | `codex/012d-production-baseline` or similarly scoped branch exists |
| Candidate source | `C:\tmp\pp-012c-baseline-lean-20260714-173135` recorded |
| Secrets | `.env*` not staged/committed |
| Build artifacts | `.next`, caches, temp files not staged/committed |
| `/admin/commerce` | Present |
| Checkout guard | Present |
| Route parity | Preserved or discrepancy documented before commit |
| Validation | Passed or meaningful blocker recorded |
| Commit | Created only if safe |
| Deploy | Not performed |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action

============================================================
FILE: planning/sprints/012D-baseline-commit-and-deployment-approval/handoff-prompt.md
============================================================

# Sprint 012D - Builder Handoff Prompt

You are Builder for Sprint 012D - Baseline Commit And Deployment Approval in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012D-baseline-commit-and-deployment-approval/requirements.md`
5. `planning/sprints/012D-baseline-commit-and-deployment-approval/blueprint.md`
6. `planning/sprints/012D-baseline-commit-and-deployment-approval/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Convert the validated Sprint 012C candidate into a durable reviewed branch/commit, validate it, and stop for explicit deployment approval.

Do not deploy.

## Guardrails

Do not deploy to Vercel.

Do not push.

Do not create a pull request.

Do not copy or commit `.env*`, secrets, build artifacts, caches, or temp files.

Do not delete or revert unrelated main workspace changes.

Do not mutate production, DNS, Supabase, Stripe, Vercel settings, users, horses, products, orders, payments, subscriptions, or live data.

Do not implement Sprint 013-016 product features.

Stop if route parity is lost, `/admin/commerce` is missing, checkout guard is missing, or validation fails for a meaningful source reason.

## Suggested Execution

1. Read the sprint files and evidence docs.
2. Record current branch/revision and dirty status.
3. Create branch/worktree `codex/012d-production-baseline`.
4. Import source from `C:\tmp\pp-012c-baseline-lean-20260714-173135`.
5. Confirm no `.env*` or artifacts are staged.
6. Verify `/admin/commerce`, checkout guard, and route parity.
7. Run lint, TypeScript, build, and local smoke.
8. Stage reviewed source/docs only.
9. Commit if safe.
10. Update docs and briefing.
11. Stop before deployment and ask for deployment approval.

## Closeout Standard

At close, the next Architect should know:

- branch name
- commit hash, if created
- candidate source path
- validation and smoke status
- whether the baseline is ready for deployment approval
- any blockers
- that no deployment was performed

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "012D-baseline-commit-and-deployment-approval",
  "updated": "2026-07-14T00:00:00+10:00"
}
