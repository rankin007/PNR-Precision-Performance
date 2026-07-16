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

Sprint 012C is approved as a production baseline reconstruction sprint. Builder may create and edit temporary candidate trees under `C:\tmp` to reconstruct a production-equivalent source candidate, verify route/source parity against current production, apply only the Sprint 012 checkout safety fix on top, and then stop for explicit deployment approval. Sprint 012C does not authorize deployment.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 012C reconstructs a production-equivalent baseline for an auth, RLS, production, data, and payment-capable app. It must avoid deployment, secret exposure, destructive data changes, live financial changes, DNS changes, and production project-setting changes.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 012C approved scope without another approval.

Sprint 012C explicitly authorizes:

- creating temporary production-baseline candidate trees under `C:\tmp`
- copying project files into those temporary trees
- modifying temporary candidate files to isolate a production-equivalent source shape
- applying the Sprint 012 checkout malformed POST guard to the temporary candidate
- running local validation/builds against temporary candidates
- comparing candidate route/source output against current Vercel production route evidence
- updating planning and evidence docs with findings and a recommended deployment candidate

Builder must stop and ask before:

- deploying anything to Vercel
- modifying production app source files in the main workspace as part of reconstruction
- deleting files or data from the main workspace
- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- making destructive database changes or rollbacks
- creating, deleting, or modifying real production users, horses, products, orders, payments, subscriptions, Stripe objects, or production customer data
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing DNS/domain settings
- changing Vercel/Supabase/Stripe project settings
- changing authentication, authorization, RLS, billing, payment, database schema, migrations, product catalogue behavior, launch infrastructure, or Node runtime compatibility in the main workspace
- installing packages from the network
- normalizing unrelated dirty worktree changes

---

## Active Sprint

`planning/sprints/012C-production-baseline-reconstruction/`

Sprint 012C - Production Baseline Reconstruction

---

## Approved Sprint Schedule

Sprints 001-012B are complete. Sprint 012C is the current approved no-deploy reconstruction sprint to produce a production-equivalent candidate before any future deployment decision.

---

## Next Actions

1. Builder applies Architect Pack 012C.
2. Builder reads the Sprint 012C four-file sprint set and uses it as the source of truth.
3. Builder creates a temporary production-baseline candidate from the current dirty workspace.
4. Builder isolates known post-production local-only differences and verifies route/source parity.
5. Builder applies only the checkout safety fix to the candidate if not already present.
6. Builder validates the candidate.
7. Builder records the candidate path, diff, route parity evidence, validation evidence, and explicit deployment recommendation.
8. Builder stops without deployment and refreshes `planning/ARCHITECT_BRIEFING.md`.

---

## Blockers

Sprint 012C is blocked if a production-equivalent candidate cannot be reconstructed without guessing or if validation cannot distinguish production-equivalent behavior from unrelated dirty workspace changes. In that case, Builder must document the evidence and ask for a user decision.

============================================================
FILE: planning/sprints/012C-production-baseline-reconstruction/requirements.md
============================================================

# Sprint 012C - Production Baseline Reconstruction Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendation: "Create Architect pack 012C."

Sprint 012B found that no clean committed production baseline is recoverable from available non-secret metadata. The current dirty workspace is the closest local route-shape match, but it is not safe to deploy wholesale. Sprint 012C exists to deliberately reconstruct a production-equivalent candidate before any future deployment approval.

## Goal

Create a temporary production-equivalent baseline candidate that preserves current live route/source behavior, applies only the Sprint 012 checkout malformed POST safety fix on top, validates locally, and stops for explicit deployment approval.

No deployment is authorized in Sprint 012C.

## Current Evidence Baseline

- Current live production deployment is `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Production output includes `/admin/commerce`.
- Vercel metadata does not expose exact Git/source provenance.
- Clean `8bf310a` is not production-equivalent because it lacks `/admin/commerce`.
- `C:\tmp\pp-012a-clean-20260714-165007` is not production-equivalent because it lacks `/admin/commerce`.
- `.release-main` is not production-equivalent because it has extra routes not present in live production.
- Current dirty workspace is closest by route shape but includes broad app/source changes and later local edits.
- Sprint 012 checkout safety fix is present in the main workspace `app/api/checkout/route.ts`.

## In Scope

Builder may:

- inspect git status, branch, revision, and source diffs
- inspect Vercel route/deployment metadata already available through non-secret commands
- create temporary candidate directories under `C:\tmp`
- copy current workspace content into a temporary candidate
- remove or isolate known post-production-only files from the temporary candidate
- compare route shape against current production evidence
- apply or preserve only the Sprint 012 checkout malformed POST guard on top of the candidate
- validate the candidate with lint, TypeScript, and build using the known-good bounded path
- run local route smoke against the candidate where feasible
- produce a candidate manifest and diff summary
- update planning and evidence docs with the candidate path, parity result, validation result, and next recommended action

## Out Of Scope

Builder must not:

- deploy to Vercel
- mutate production, DNS, Supabase, Stripe, or Vercel project settings
- modify production data, users, horses, products, orders, payments, subscriptions, or Stripe objects
- delete or revert files from the main workspace
- normalize the main dirty worktree
- edit main workspace app/source files, except planning/docs approved below
- implement Sprint 013-016 product features
- print or store secrets
- inspect build logs or dashboards if they may expose secrets
- install packages from the network without approval

## Approved File Set

Builder may edit:

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

Builder may create and edit temporary candidate trees under:

- `C:\tmp\pp-012c-*`

Inspection-only in the main workspace:

- app/source files needed to compare route/source shape
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `.env*` names/presence only; no values
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `scripts/run-validation-command.ps1`

## Required Candidate Output

Builder must produce a candidate report in docs/planning that states:

- candidate path
- starting source used
- files removed or isolated from candidate and why
- app/source diff summary versus current dirty workspace
- app/source diff summary versus clean `8bf310a` where useful
- route parity comparison against Vercel production evidence
- whether `/admin/commerce` is preserved
- whether extra `.release-main` routes are absent
- whether the checkout malformed POST guard is present
- validation results
- local smoke results where feasible
- whether Builder recommends this candidate for a later deploy sprint

## Manual Intervention Rule

If any required reconstruction or validation cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

============================================================
FILE: planning/sprints/012C-production-baseline-reconstruction/blueprint.md
============================================================

# Sprint 012C - Production Baseline Reconstruction Blueprint

## Execution Shape

Sprint 012C is a no-deploy reconstruction sprint.

Run the work in this order:

1. Establish baseline evidence.
2. Create a temporary candidate from the current dirty workspace.
3. Identify and isolate known non-production candidate differences.
4. Verify candidate route/source parity.
5. Ensure the checkout safety fix is present.
6. Validate and smoke the candidate locally.
7. Document candidate provenance and deployment recommendation.
8. Close without deploying.

## Baseline Evidence

Builder should record:

- main workspace `git status --short`
- active branch and short revision
- current production deployment id/status/aliases from already-safe Vercel inspect paths
- route evidence for live production, especially `/admin/commerce`
- route differences found in `.release-main`
- known limitations of clean `8bf310a` and `C:\tmp\pp-012a-clean-20260714-165007`

Do not inspect secret-bearing logs or environment values.

## Candidate Creation

Create a temporary candidate directory under `C:\tmp`, for example:

- `C:\tmp\pp-012c-baseline-YYYYMMDD-HHMMSS`

Preferred starting point:

- current dirty workspace, because Sprint 012B found it closest by route shape

Builder must not delete files from the main workspace. Any removal/isolation happens only inside the temporary candidate.

## Candidate Reduction

Inside the temporary candidate, isolate obvious non-production-only content.

Examples may include:

- planning-only changes not needed for app deployment
- temporary Architect Pack files
- local-only validation artifacts
- source files known to exist only after Sprint 012 and unrelated to production parity

Do not guess away app behavior. If uncertain whether a source file is production behavior, keep it and document the uncertainty.

## Route Parity Comparison

Compare candidate generated routes to current Vercel production output as closely as possible without secret-bearing logs.

Required checks:

- `/admin/commerce` is present
- public routes used in production smoke are present
- portal, data-entry, admin, shop, checkout, webhook, health, and setup routes are present
- `.release-main` extra routes identified by Sprint 012B are absent unless evidence shows they are live
- generated route count and notable route list are recorded

Route parity does not have to be byte-for-byte proof. It must be strong enough to decide whether the candidate is a safer deploy base than clean `8bf310a` or the full dirty workspace.

## Checkout Fix

Ensure `app/api/checkout/route.ts` in the candidate contains the Sprint 012 malformed-body guard:

- parsing `request.formData()` is guarded
- malformed or unreadable form bodies redirect safely to `/shop?checkout=missing-product`
- slug validation remains unchanged
- no secrets or raw request bodies are logged

## Validation

Run validation from the temporary candidate, not by modifying the main workspace:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If the wrapper assumes repo-root-relative paths from the candidate, use the candidate copy of the script. If restricted sandbox build fails for known sandbox reasons, request approval for the known-good outside-sandbox bounded build path and record both outcomes.

Run local smoke where feasible:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `POST /api/checkout` missing slug
- `POST /api/checkout` malformed/no-content-type body
- `POST /api/stripe/webhook` unsigned request
- anonymous protected-route redirects, especially `/admin/commerce`

## Documentation Updates

At close, Builder should update:

- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md` if checkout evidence changes
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if durable status changes
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`

## Closeout

Final status options:

- `complete candidate ready for approval`
- `partial with documented blockers`
- `blocked`

Do not deploy in Sprint 012C even if the candidate is good. The next deployment requires explicit user approval in a separate instruction or pack.

============================================================
FILE: planning/sprints/012C-production-baseline-reconstruction/acceptance.md
============================================================

# Sprint 012C - Production Baseline Reconstruction Acceptance

## Required Acceptance Criteria

- Architect Pack 012C is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012C.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- A temporary candidate tree is created under `C:\tmp`.
- Main workspace app/source files are not modified for reconstruction.
- Candidate starts from the closest known production-like source, expected to be current dirty workspace unless evidence says otherwise.
- Candidate preserves `/admin/commerce`.
- Candidate excludes known `.release-main` extra routes absent from current production unless evidence shows they are live.
- Candidate contains the Sprint 012 checkout malformed POST guard.
- Candidate route/source parity is compared against current production evidence.
- Candidate validation is attempted and recorded.
- Local smoke is run where feasible and recorded.
- No deployment is performed.
- No secret values or fragments are printed or stored.
- No destructive production mutation or live financial action is performed.
- Docs and planning files are updated with candidate path, findings, blockers, and recommendation.
- `planning/ARCHITECT_BRIEFING.md` is refreshed.
- `planning/STATUS.json` is set to the correct closeout status.

## Candidate Acceptance Matrix

| Case | Expected result |
|---|---|
| Candidate path | Created under `C:\tmp\pp-012c-*` |
| Main workspace | Not cleaned, reverted, or source-mutated |
| `/admin/commerce` | Present in candidate |
| Public/shop/sign-in routes | Present in candidate |
| Portal/data-entry/admin routes | Present in candidate at production-like route shape |
| Checkout route | Contains malformed POST guard |
| `.release-main` extra routes | Absent unless live evidence says otherwise |
| Validation | Lint, TypeScript, and known-good build pass, or failures are documented precisely |
| Smoke | Missing slug/malformed checkout and anonymous `/admin/commerce` behavior verified where feasible |
| Deploy | Not performed |

## Required Validation

- `git status --short` in main workspace
- branch and short revision identity
- candidate diff/manifest
- candidate route list or route-count evidence
- checkout malformed-body local smoke or direct route test where feasible
- lint through bounded wrapper from candidate
- TypeScript through bounded wrapper from candidate
- build through bounded wrapper from candidate
- if sandboxed build fails for known sandbox reasons, rerun the bounded build outside restricted sandbox with approval and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action

============================================================
FILE: planning/sprints/012C-production-baseline-reconstruction/handoff-prompt.md
============================================================

# Sprint 012C - Builder Handoff Prompt

You are Builder for Sprint 012C - Production Baseline Reconstruction in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012C-production-baseline-reconstruction/requirements.md`
5. `planning/sprints/012C-production-baseline-reconstruction/blueprint.md`
6. `planning/sprints/012C-production-baseline-reconstruction/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Create a temporary production-equivalent baseline candidate, apply/preserve only the Sprint 012 checkout malformed POST safety fix on top, validate it, and stop for explicit deployment approval.

Do not deploy.

## Guardrails

Do not modify main workspace app/source files for reconstruction.

Do not delete or revert main workspace files.

Do not deploy to Vercel.

Do not print, store, or document secrets or secret fragments.

Do not mutate production, DNS, Supabase, Stripe, Vercel settings, users, horses, products, orders, payments, subscriptions, or live data.

Do not implement Sprint 013-016 product features.

Only create and edit temporary candidate trees under `C:\tmp\pp-012c-*` plus approved planning/docs updates.

If you cannot distinguish production-equivalent behavior from unrelated dirty workspace changes, stop and document the blocker.

## Suggested Execution

1. Read the sprint files and evidence docs.
2. Record main workspace branch/revision and dirty status.
3. Create a temporary candidate under `C:\tmp`.
4. Copy the current dirty workspace into the candidate.
5. Remove/isolate only known non-production local-only files in the candidate.
6. Preserve uncertain app behavior rather than guessing it away.
7. Ensure `/admin/commerce` exists and `.release-main` extra routes are absent.
8. Ensure the checkout malformed POST guard exists.
9. Validate candidate lint, TypeScript, and build.
10. Run local smoke where feasible.
11. Produce candidate manifest/diff/parity documentation.
12. Update docs and planning.
13. Stop without deployment and recommend whether the candidate is ready for a future deploy approval.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- candidate path
- what source it was based on
- what was removed or isolated
- whether it preserves current production route shape
- whether it includes the checkout fix
- validation/smoke results
- remaining blockers or uncertainties
- whether to ask the user for deployment approval next

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "012C-production-baseline-reconstruction",
  "updated": "2026-07-14T00:00:00+10:00"
}
