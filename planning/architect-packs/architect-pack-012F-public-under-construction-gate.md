============================================================
FILE: planning/sprints/012F-public-under-construction-gate/requirements.md
============================================================

# Sprint 012F - Public Under Construction Gate Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user does not want the public seeing the live website until the product is complete. The user asked Architect to create Builder instructions to put the actual website behind an `Under Construction` public sign-up/interest page and stop the full website from being visible to the public eye.

Sprint 012E is complete. Sprint 013 product/data-model work has not started.

## Goal

Hide the current public website from anonymous visitors and replace it with a simple, professional `Under Construction` holding page with a sign-up/interest call to action.

The real app must not be publicly browsable while this gate is active.

## Current Evidence Baseline

- Production is live at `https://precisionperformance.com.au`.
- Current public routes include `/`, `/home`, `/shop`, `/shop/[slug]`, `/contact`, and `/sign-in`.
- Protected app/admin/portal/data-entry routes already have access guards, but the public marketing/shop pages remain visible.
- No active root `middleware.ts` exists in the current workspace snapshot.
- Sprint 012D branch `codex/012d-production-baseline` at commit `358e1fc` remains the deployment-baseline candidate, but it has not been deployed.
- Sprint 012E cleanup is complete and did not change runtime behavior.

## In Scope

Builder may:

- replace the public home page with an `Under Construction` cover page using the supplied Thoroughbred image asset
- add `noindex, nofollow` metadata for public holding-mode pages
- add a maintenance/public-visibility gate so anonymous visitors cannot browse marketing/shop/contact/product pages
- redirect or rewrite public routes such as `/home`, `/shop`, `/shop/[slug]`, and `/contact` to the holding page
- keep required internal/auth/operator routes available only as needed for authorized users and operational verification
- keep API safety endpoints functioning where needed for health/deployment checks
- disable or block public checkout initiation while the site is under construction
- use `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` as the cover-page image source, copied into the active app public assets so the deployed site does not depend on `.release-main/`\n- write `Under Construction` prominently across the image/page\n- add a non-persistent sign-up/interest CTA such as a mailto/contact link or approved existing contact route if it is not publicly exposing the full site
- add a placeholder sign-up form only if it does not store personal data and clearly avoids implying submission persistence
- document the exact public routes hidden and allowed
- validate locally and prepare production deployment instructions
- update planning/docs/status/briefing

## Out Of Scope

Builder must not:

- add a new database table or data model for sign-ups without explicit approval
- collect, store, email, or transmit visitor personal data through a new workflow without explicit approval
- add a new mailing-list provider, CRM, email API, webhook, or third-party service without explicit approval
- expose secret values or secret fragments
- change authentication, authorization, RLS, schema, Stripe, billing, webhook reconciliation, or production data behavior beyond hiding public checkout access
- delete existing website pages or source files
- implement Sprint 013-016 product features
- push, create a PR, deploy, change DNS, or mutate Vercel project settings unless explicitly authorized by the user for this sprint

## Approved File Set

Builder may edit:

- `app/page.tsx`\n- `public/**`, only for the copied Thoroughbred cover image asset needed by the under-construction page
- `app/layout.tsx`, only for safe metadata/noindex updates if needed
- `app/(marketing)/**`, only to redirect/hide marketing pages
- `app/contact/page.tsx`, only to hide or redirect public contact content
- `app/shop/**`, only to hide public shop/product pages and prevent public checkout entry
- `app/api/checkout/route.ts`, only to safely block checkout initiation while the site is under construction
- `middleware.ts`, if Builder chooses a centralized gate and documents the allowed route list
- small supporting component files under `components/**` if needed for the holding page
- `.env.example`, only to document non-secret maintenance-mode flags if introduced
- `docs/PUBLIC_UNDER_CONSTRUCTION_012F.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Inspection-only unless separately approved:

- `app/(admin)/**`
- `app/(portal)/**`
- `app/(ops)/**`
- `lib/auth/**`
- `lib/supabase/**`
- `supabase/**`
- `.env*` names/presence only, no values
- `.vercel/**`

## Public Visibility Policy

While the gate is active:

- `/` should show only the under-construction cover page using the supplied Thoroughbred image with `Under Construction` written prominently across the page.
- `/home`, `/shop`, `/shop/*`, and `/contact` should not reveal the current website content.
- anonymous visitors should not be able to browse marketing, shop, product, portal, data-entry, or admin content.
- checkout initiation should be unavailable to the public.
- search engines should receive `noindex, nofollow` for the public holding surface.
- operational health routes may remain available if needed for deployment checks and must not expose sensitive data.

## Required Output

Builder must produce:

- description of the implemented Thoroughbred image cover page and where the copied active public asset lives
- route allow/deny matrix
- confirmation current public website content is hidden
- confirmation checkout entry is blocked or hidden
- confirmation no visitor personal data is newly stored/transmitted unless separately approved
- validation results
- production deployment recommendation and stop point
- manual intervention instructions if deployment or production smoke is not authorized

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete


============================================================
FILE: planning/sprints/012F-public-under-construction-gate/blueprint.md
============================================================

# Sprint 012F - Public Under Construction Gate Blueprint

## Execution Shape

Sprint 012F is a public-visibility lockdown sprint. It should be narrow, reversible, and easy to remove when the full website is ready.

Run the work in this order:

1. Establish current branch, commit, and dirty status.
2. Inspect current public route surfaces.
3. Choose the smallest safe gate strategy.
4. Implement the holding page and public route hiding.
5. Block public checkout entry.
6. Add noindex metadata for the holding surface.
7. Validate routes, lint, TypeScript, and build.
8. Document route behavior and deployment stop point.
9. Update planning state/status/briefing.

## Recommended Implementation Approach

Prefer a simple, reversible application-level maintenance gate.

Recommended shape:

- `app/page.tsx` becomes the public `Under Construction` cover page.\n- Builder copies `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` into the active app `public/` folder, for example `public/under-construction-thoroughbred.jpg`, and references the copied asset from the page.
- public marketing/shop/contact pages redirect to `/` or render the same holding page.
- public checkout initiation is blocked with a safe maintenance response or redirect.
- protected admin/portal/data-entry pages keep existing guards and are not made public.
- `middleware.ts` may be added only if it makes the allow/deny list clearer and does not break auth callback, health checks, or webhook handling.

## Holding Page Cover Asset\n\nUse the supplied image as the visual cover for the holding page:\n\n`C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg`\n\nBuilder should copy this image into the active app `public/` folder and reference the copied asset. Do not serve the deployed page from `.release-main/`.\n\nThe page should be a full-page or first-viewport cover using this image, with `Under Construction` written prominently across the page in readable, high-contrast text. The image should remain recognizable as the primary placeholder.\n\n## Holding Page Content

The page should be professional and plain:

- brand: `PNR Precision Performance`
- heading: `Under Construction`, written across the image/page
- short message that the platform is being prepared and is not yet publicly available
- sign-up/interest CTA
- optional contact email or mailto link if an existing approved contact address is present in source/docs
- no pricing, shop, checkout, portal, admin, or product claims beyond what is already safe in planning docs

If no approved email/list destination exists, Builder should use a non-persistent CTA such as `Register your interest` via `mailto:` or a clearly non-submitting placeholder. Do not invent a storage backend.

## Route Policy

Builder must document final behavior for at least:

| Route | Expected public behavior while under construction |
|---|---|
| `/` | Thoroughbred image cover page with `Under Construction` written across it |
| `/home` | Redirect/rewrite to `/` or holding page |
| `/contact` | Redirect/rewrite to `/` or holding page unless used only as safe interest CTA |
| `/shop` | Redirect/rewrite to `/` or holding page |
| `/shop/[slug]` | Redirect/rewrite to `/` or holding page |
| `/api/checkout` | Public checkout blocked safely |
| `/sign-in` | Keep available only if needed for operator/admin access; otherwise document behavior |
| `/auth/callback` | Must not break auth callback if sign-in remains available |
| `/api/health` | May remain available for non-sensitive health checks |
| `/api/setup/status` | May remain available if non-sensitive |
| `/api/stripe/webhook` | Must not be broken by public-page gating |
| `/admin/*`, `/portal/*`, `/data-entry/*` | Must not become public |

## Validation

Required local checks:

- `git status --short`
- route/source inventory before and after change
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

Required local smoke, where feasible:

- `GET /` shows only the Thoroughbred image cover page with `Under Construction` written across it
- `GET /home` does not show old website
- `GET /shop` does not show shop/product listing
- `GET /shop/{known-or-placeholder-slug}` does not show product detail
- `GET /contact` does not show old public site content unless explicitly retained as safe interest page
- `POST /api/checkout` cannot create public checkout and returns/redirects safely
- `GET /sign-in` behavior documented
- anonymous protected routes remain denied/redirected
- `/api/health` remains non-sensitive
- unsigned webhook behavior remains safe

If restricted sandbox build fails with known Next startup timeout, request approved outside-sandbox bounded validation and record both outcomes.

## Deployment Stop Point

Builder must stop before production deployment unless the user explicitly authorizes deployment.

If deployment is authorized, deploy only after local validation passes, then run production smoke on `https://precisionperformance.com.au` to confirm:

- public home shows only the Thoroughbred image cover page with `Under Construction` written across it
- `/home`, `/shop`, `/shop/*`, and `/contact` do not expose the website
- checkout is blocked
- auth/admin protected surfaces are not public
- health/webhook safety behavior remains acceptable

## Documentation

Create:

- `docs/PUBLIC_UNDER_CONSTRUCTION_012F.md`

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

- adding persistent visitor sign-up storage
- adding a third-party mailing-list/email/CRM service
- changing auth/RLS/schema/Stripe/webhook behavior beyond public checkout blocking
- exposing or copying secrets
- deploying to production
- pushing or creating a PR
- deleting current website source files
- making the gate irreversible or difficult to remove later


============================================================
FILE: planning/sprints/012F-public-under-construction-gate/acceptance.md
============================================================

# Sprint 012F - Public Under Construction Gate Acceptance

## Required Acceptance Criteria

- Architect Pack 012F is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012F.
- Builder reads the Sprint 012F four-file sprint set before implementation.
- Public home page shows only the supplied Thoroughbred image as the cover page, with `Under Construction` written prominently across the page.
- Public marketing/shop/contact/product pages no longer reveal the current website content.
- Public checkout initiation is blocked or hidden safely.
- Existing protected admin/portal/data-entry routes do not become public.
- Required auth callback, health, setup-status, and webhook safety behavior is not broken.
- Public holding surface uses `noindex, nofollow` or equivalent metadata/header behavior.\n- The supplied image `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` is copied into the active app public assets and the deployed page references the copied public asset, not `.release-main/`.
- No new persistent visitor sign-up storage is added without explicit approval.
- No new email provider, CRM, mailing-list provider, webhook, or third-party data transmission is added without explicit approval.
- No `.env*` values, secrets, tokens, private keys, passwords, connection strings, or secret fragments are printed or stored.
- No schema, RLS, auth, billing, Stripe reconciliation, production data, DNS, or Vercel project settings are changed.
- No current website source files are deleted.
- Lint, TypeScript, and build are run and recorded, or blocked with exact evidence and manual-intervention steps.
- Local public-route smoke confirms the website is hidden.
- Production deployment is not performed unless explicitly authorized.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Public Route Acceptance Matrix

| Route | Accepted result |
|---|---|
| `/` | Thoroughbred image cover page only, with `Under Construction` written across it |
| `/home` | Redirect/rewrite/holding page; no old website content |
| `/contact` | Redirect/rewrite/holding page or safe interest-only page |
| `/shop` | Redirect/rewrite/holding page; no products or checkout CTA |
| `/shop/[slug]` | Redirect/rewrite/holding page; no product details |
| `/api/checkout` | Checkout blocked safely while under construction |
| `/sign-in` | Documented and safe; available only if needed for operator/admin access |
| `/auth/callback` | Not broken if sign-in remains available |
| `/api/health` | Non-sensitive response remains acceptable |
| `/api/setup/status` | Non-sensitive response remains acceptable if kept public |
| `/api/stripe/webhook` | Not broken by public gate |
| `/admin/*`, `/portal/*`, `/data-entry/*` | Not public |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action


============================================================
FILE: planning/sprints/012F-public-under-construction-gate/handoff-prompt.md
============================================================

# Sprint 012F - Builder Handoff Prompt

You are Builder for Sprint 012F - Public Under Construction Gate in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012F-public-under-construction-gate/requirements.md`
5. `planning/sprints/012F-public-under-construction-gate/blueprint.md`
6. `planning/sprints/012F-public-under-construction-gate/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant docs under `docs/`

## Mission

Hide the current public website from anonymous visitors and show only the supplied Thoroughbred image as the cover page, with `Under Construction` written prominently across the page and a safe sign-up/interest CTA.

The public must not be able to browse the real website until the user later authorizes reopening it.

## Guardrails

Do not delete current website source files.

Do not add persistent sign-up storage, a database table, a CRM, mailing-list integration, email API, or third-party data transmission unless the user explicitly approves it.

Do not expose `.env*` values, secrets, tokens, credentials, private keys, passwords, connection strings, webhook payloads with sensitive values, or secret fragments.

Do not change auth, RLS, schema, Stripe reconciliation, billing, production data, DNS, Vercel settings, Supabase state, or webhook behavior beyond safely blocking public checkout initiation.

Do not deploy, push, or create a PR unless explicitly authorized.

## Suggested Execution

1. Record branch, commit, and dirty status.
2. Inspect public routes and current guards.
3. Copy `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` into the active app `public/` folder.\n4. Implement a reversible holding cover page at `/` using the copied Thoroughbred image with `Under Construction` written across it.
5. Hide or redirect `/home`, `/shop`, `/shop/*`, and `/contact`.
6. Block `/api/checkout` from public checkout creation while under construction.
7. Add noindex/nofollow metadata for the holding surface.
8. Keep protected/admin/operator routes protected.
9. Validate lint, TypeScript, build, image rendering, and local route smoke.
10. Write `docs/PUBLIC_UNDER_CONSTRUCTION_012F.md` with route behavior, cover image asset path, and reopening notes.
11. Update planning/status/briefing.
12. Stop before production deployment unless the user explicitly authorizes deployment.

## Closeout Standard

At close, the next Architect should know:

- whether the public website is hidden locally behind the Thoroughbred under-construction cover
- what routes are allowed and blocked
- whether checkout is blocked
- whether any sign-up storage decision remains open
- validation status
- whether production deployment was performed or still needs explicit user authorization


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

Sprint 012E is complete as a repository cleanup and archive baseline sprint. Builder archived low-risk non-runtime clutter into `references/archive/sprint-012e-repository-cleanup/`, wrote a manifest and cleanup evidence doc, updated ignore rules for generated/log metadata, validated lint/TypeScript/build, and deferred ambiguous or runtime-adjacent candidates for user decision. No deletion, deployment, push, PR, production behavior change, schema/auth/RLS/Stripe change, Supabase mutation, Vercel setting change, DNS change, or production data mutation was performed.

Sprint 012F is approved as a public under-construction gate sprint. Builder may hide public marketing/shop/contact/product surfaces behind the supplied Thoroughbred image cover page with `Under Construction` written across it and a safe sign-up/interest CTA, block public checkout initiation, add noindex behavior, validate locally, and prepare deployment instructions. Sprint 012F does not authorize persistent sign-up storage, new email/CRM provider integration, production deployment, push, PR, DNS change, Vercel setting change, Supabase mutation, Stripe mutation, schema/auth/RLS changes, or production data mutation.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 012F changes public production visibility for an auth, RLS, data, and payment-capable app. The change must hide public website content without breaking protected access, health checks, auth callback safety, webhook safety, or checkout hardening.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 012F approved scope without another approval.

Sprint 012F explicitly authorizes:

- replacing the public home page with the supplied Thoroughbred image under-construction cover page
- hiding or redirecting public marketing/shop/contact/product pages
- blocking public checkout initiation while the site is under construction
- adding noindex/nofollow metadata or equivalent behavior for the holding surface
- keeping required auth/admin/operator/API safety routes available only as documented
- creating `docs/PUBLIC_UNDER_CONSTRUCTION_012F.md`
- updating planning state/status/briefing/decisions/risks/questions/schedule
- running local validation and route smoke

Builder must stop and ask before:

- adding persistent sign-up storage
- adding a new database table, email provider, CRM, mailing-list provider, webhook, or third-party data transmission
- changing authentication, authorization, RLS, schema, migrations, Stripe reconciliation, billing, webhook behavior, production data, DNS, Supabase state, Vercel project settings, or production-service settings
- deploying anything to Vercel
- pushing to remote
- creating a pull request
- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting current website source files
- implementing Sprint 013-016 product features

---

## Active Sprint

`planning/sprints/012F-public-under-construction-gate/`

Sprint 012F - Public Under Construction Gate

---

## Approved Sprint Schedule

Sprints 001-012E are complete. Sprint 012F is the current approved public-visibility sprint. Sprint 013 remains the next product-build sprint after the public gate is implemented and deployed or otherwise explicitly paused.

---

## Next Actions

1. Builder applies Architect Pack 012F if not already applied.
2. Builder reads the Sprint 012F four-file sprint set and uses it as the source of truth.
3. Builder implements the public under-construction holding page and route gate.
4. Builder blocks public checkout initiation while under construction.
5. Builder validates lint, TypeScript, build, and local route smoke.
6. Builder documents the route allow/deny matrix and reopening notes.
7. Builder updates planning docs and briefing.
8. Builder stops before production deployment unless the user explicitly authorizes deployment.

---

## Blockers

Sprint 012F is blocked if the public website cannot be hidden without breaking required protected/auth/API safety behavior, if sign-up storage is required but not approved, or if production deployment is needed but not explicitly authorized.

Remaining live acceptance blockers are unchanged: Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay still require safe operator access and fixtures.


============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "012F-public-under-construction-gate",
  "updated": "2026-07-16T00:00:00+10:00"
}

============================================================
FILE: planning/SPRINT_SCHEDULE.md
============================================================

# Approved Sprint Schedule To Done

Approved on: 2026-07-11

Realigned on: 2026-07-14 by Sprint 011.

## Definition Of Done

The earlier schedule defined Done as a live, tested, documented, handoff-ready MVP. Sprints 003-010 moved the project to a deployed MVP shell with partial live acceptance.

Sprint 011 realigns Done to the attached `Precision Performance Done.docx` and the distilled canonical version in `planning/DEFINITION_OF_DONE.md`.

Precision Performance is Done when the trainer-facing biochemistry portal is production-ready: trainers can submit horse tests from mobile in under 60 seconds, attach voice notes and uploads, receive Hydration Score and Health Score outputs, see Green/Amber/Red zone status, receive approved Table of Knowledge recommendations, review trends and saved charts, and operate inside secure role-based access across trainer, owner, vet, stable staff, and admin roles.

The live production app remains valuable, but production live does not equal full Done until the trainer-ready portal criteria and the remaining live acceptance gates are satisfied.

## Completed Sprints

### Sprint 001 - Truth And Readiness

Outcome: completed as a truth and readiness audit.

### Sprint 002 - Build Readiness

Outcome: completed with validation pinned to project-local Node `22.14.0` for the known-good build path.

### Sprint 003 - Release Baseline And Environment Truth

Outcome: completed. Vercel established as the local evidence-backed deployment target, environment contract documented, unsafe Stripe secret-prefix diagnostics removed, and validation remained green through the bounded wrapper.

### Sprint 004 - Auth, RLS, And Portal Access

Outcome: completed. Auth redirects, callback handling, portal access guard, member context, and RLS role-read policies were hardened and documented.

### Sprint 005 - Portal And Data Entry Workflow

Outcome: completed. Core portal and operational record workflows were hardened with assigned-horse and operational write checks, plus documented live smoke blockers.

### Sprint 006 - Admin And Commerce Hardening

Outcome: completed. Admin membership/user hardening, read-only commerce visibility, active product checkout readiness, and webhook reconciliation hardening were documented.

### Sprint 007 - Production Launch Readiness

Outcome: completed as a launch-readiness no-go report until manual/user actions were completed.

### Sprint 008 - Launch Supabase Memberships And Env Readiness

Outcome: completed. Additive launch membership/permission seed migration, launch membership matrix, regenerated bootstrap SQL, and placeholder-only env guidance were created.

### Sprint 009 - Production Launch Deployment

Outcome: completed. Production deployment went live at `https://precisionperformance.com.au` on Vercel deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`; remaining live items were accepted as follow-up conditions.

### Sprint 010 - Live Acceptance Closeout

Outcome: completed as partial with documented blockers. Public/safety production smoke and anonymous protected-route redirects passed; Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remained blocked.

## Completed Follow-Up Sprints

### Sprint 011 - Done Normalization And Roadmap Realignment

Outcome: completed. The attached Done document was distilled into durable planning truth and the roadmap was realigned.

### Sprint 012 - Live Acceptance Closeout And Safety Hardening

Outcome: completed as partial with documented blockers. Malformed checkout POST parsing was hardened locally; Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain blocked.

### Sprint 012A - Fix Deploy And Verify

Outcome: blocked before deployment because a clean `HEAD + checkout fix` deployment would omit current production behavior such as `/admin/commerce`.

### Sprint 012B - Production Source Provenance

Outcome: completed. Current production source provenance could not be recovered as a clean committed snapshot; the current dirty workspace was the closest local route-shape match.

### Sprint 012C - Production Baseline Reconstruction

Outcome: completed. A no-deploy production-equivalent candidate was created at `C:\tmp\pp-012c-baseline-lean-20260714-173135`, with route parity, `/admin/commerce`, and checkout malformed POST handling preserved.

### Sprint 012D - Baseline Commit And Deployment Approval

Outcome: completed. The Sprint 012C candidate was converted into branch `codex/012d-production-baseline` at commit `358e1fc`, validation passed, and deployment approval notes were prepared. No deployment, push, or PR was performed.

## Recently Completed Sprint

### Sprint 012E - Repository Cleanup And Archive Baseline

Outcome: completed. Low-risk non-runtime clutter was archived with a manifest; ambiguous/runtime-adjacent candidates were deferred; lint, TypeScript, and the known-good outside-sandbox build path passed.

Expected scope:

- inventory cleanup candidates across planning/docs/references/root artifacts
- classify each candidate as keep, archive, ignore, or needs-user-decision
- archive only low-risk non-runtime candidates into `references/archive/sprint-012e-repository-cleanup/`
- write a manifest and cleanup evidence document
- verify no secrets, runtime behavior, schema, auth, RLS, Stripe, checkout, webhook, deployment, push, or PR actions occurred
- validate lint, TypeScript, build, and route/source behavior where feasible

## Current Sprint

### Sprint 012F - Public Under Construction Gate

Goal: hide the current public website from anonymous visitors and show only the supplied Thoroughbred image as a cover page with `Under Construction` written across it and a safe sign-up/interest CTA until the user later authorizes reopening the full site.

Expected scope:

- replace public home with the supplied Thoroughbred image under-construction cover page
- hide or redirect public marketing, shop, product, and contact surfaces
- block public checkout initiation while under construction
- add noindex/nofollow behavior for the holding surface
- preserve protected admin/portal/data-entry access boundaries and required API safety behavior
- validate lint, TypeScript, build, and route smoke locally
- stop before production deployment unless explicitly authorized
## Recommended Forward Roadmap

### Sprint 013 - Biochemistry Test Data Model

Goal: create the data foundation for the full Done target.

Expected scope:

- design tests, media/uploads, score snapshots, recommendation snapshots, chart preferences, and audit records
- map required fields for carbs, conductivity, pH urine, pH saliva, turbidity, temperature, water intake, workload/context, voice notes, and photos/PDFs
- define RLS and assignment boundaries before implementation
- preserve existing launch data and avoid destructive migrations

### Sprint 014 - Trainer Mobile Test Capture Workflow

Goal: build the under-60-second mobile trainer capture workflow.

Expected scope:

- assigned-horse test creation
- numeric entry and confirmation
- voice-note capture or approved fallback
- upload attachment flow
- validation states and mobile UX performance budget
- basic result return shape ready for later scoring/recommendations

### Sprint 015 - Scoring And Recommendation Engine

Goal: implement approved scoring and recommendation behavior.

Expected scope:

- Hydration Score formula from approved inputs
- Health Score formula from approved inputs
- Green/Amber/Red zone classification
- Table of Knowledge scaffold and editable recommendation content
- recommendation output snapshots on test records
- disclaimer/review behavior if required

### Sprint 016 - Trends, History Panel, And Saved Charts

Goal: make test history useful for trainer decision-making.

Expected scope:

- individual and combined line charts
- AM only, PM only, and both AM/PM filters
- saved favorite/default chart configurations
- zone-highlighted history panel
- filters for Red only and Amber plus Red attention states

## Authorization Note

This schedule approves the sequence and release target. It does not authorize implementation by itself. Each sprint still needs an approved Architect Pack or sprint file, and `planning/STATE.md` must say `Implementation authorized: yes` before Builder edits production source files.




============================================================
FILE: planning/ARCHITECT_BRIEFING.md
============================================================

# Architect Briefing

## Sprint 012F Public Visibility Update

The user does not want the public seeing the current website until the product is complete. Sprint 012F is approved to hide the public site behind the supplied Thoroughbred image cover page with `Under Construction` written across it and a safe sign-up/interest CTA.

## Current status

Active sprint: Sprint 012F - Public Under Construction Gate.

Workflow profile: `strict`.

Implementation authorization: yes, but only inside the Sprint 012F approved scope.

## Mission

Builder should hide public marketing/shop/contact/product surfaces from anonymous visitors, copy `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` into the active app public assets, use it as the cover page with `Under Construction` written across it, block public checkout initiation, add noindex/nofollow behavior, and document the route allow/deny matrix.

## Guardrails

Builder must not add persistent sign-up storage, database tables, a mailing-list provider, CRM, email API, third-party data transmission, auth/RLS/schema/Stripe reconciliation changes, production deployment, push, PR, DNS changes, Vercel setting changes, Supabase mutations, or production data mutations unless explicitly authorized.

Builder must not delete the current website source files. The gate should be reversible.

## Validation / test status

Sprint 012F must run lint, TypeScript, build, and local route smoke. Local smoke must confirm `/` shows the Thoroughbred under-construction cover, `/home`, `/shop`, `/shop/*`, and `/contact` do not expose the current website, checkout initiation is blocked, and protected routes remain non-public.

## Remaining live blockers

Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain separate blockers. They are not solved by the under-construction gate.

## Recommended next Architect action

After Builder validates Sprint 012F locally, ask the user whether to authorize production deployment so `https://precisionperformance.com.au` stops showing the public website. Sprint 013 should wait until the public-visibility decision is settled.


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
| 2026-07-11 | Sprint 003 treats Vercel as the local evidence-backed deployment target. | `vercel.json`, `.vercel/project.json`, and README stack notes all point to Vercel, while no Railway/Netlify/Docker deployment config was found. | Future deployment planning should start from Vercel, but production project/domain confirmation is still required before launch. |
| 2026-07-11 | Do not log secret values or secret fragments; use configured/missing status instead. | Sprint 003 found Stripe webhook logging that exposed a webhook secret prefix. | Future diagnostics may report non-sensitive status only; no prefixes, suffixes, token fragments, or decoded credential material. |
| 2026-07-11 | Sprint 004 will prove auth, RLS, and portal access before broader portal/data-entry work. | Member-facing workflows are unsafe to expand until real users, profile bootstrap, role gates, and RLS boundaries are trustworthy. | Builder may make narrow auth/RLS/portal access fixes, but data-entry workflows, admin commerce, Stripe, deployment, and broad schema work remain out of scope. |
| 2026-07-11 | Sprint 005 will require operational write permission before rendering data-entry workflows. | Signed-in portal access alone is not enough to create or correct horse operational records. | `/data-entry` now requires `platform.admin` or `horse.records.write`; RLS remains the final assigned-horse write boundary. |
| 2026-07-11 | Sprint 005 can close with code-backed evidence while live Supabase workflow smoke remains blocked. | The Builder run lacked configured Supabase env, test users, assigned horse fixtures, and remote RLS access. | Live workflow and RLS smoke must carry forward with exact manual-intervention instructions in `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`. |
| 2026-07-11 | Sprint 006 keeps admin commerce visibility read-only. | Launch operators need product/order/payment state, but mutating commerce actions are higher risk and not required for MVP launch verification. | `/admin/commerce` shows safe operational fields only; destructive or mutating commerce admin actions require a later approved sprint. |
| 2026-07-11 | Admin user status updates are limited to `active` and `inactive` for launch. | Existing auth/portal logic depends on `active`; accepting arbitrary status strings could create unclear access states. | Admin status actions reject missing or invalid status values before database updates. |
| 2026-07-11 | Public shop checkout must use active database products when configured; fallback products are preview-only. | Static fallback products should not accidentally create checkout sessions without database and Stripe readiness. | `/shop` renders DB-backed active products when Supabase is configured and disables checkout for fallback products. |
| 2026-07-11 | Sprint 006 can close with local/code-backed evidence while live Supabase and Stripe smoke remains blocked. | This Builder run lacked configured Supabase/Stripe env, test users, fixtures, Stripe checkout, and webhook replay access. | Live admin/commerce/checkout/webhook verification carries forward to Sprint 007 with manual-intervention instructions in `docs/ADMIN_COMMERCE_HARDENING.md`. |
| 2026-07-11 | Sprint 007 closes as a launch-readiness no-go report rather than a production launch. | Local/source-backed readiness is green, but production domain, remote environment, Supabase live smoke, Stripe test checkout, webhook replay, and deployment authorization remain unavailable. | The MVP should not be promoted to production until the manual-intervention checklist in `docs/PRODUCTION_LAUNCH_READINESS.md` is completed. |
| 2026-07-11 | Product detail catalogue-load errors should remain generic for visitors. | Raw load errors can reveal operational or database detail and are not needed for customer-facing checkout states. | `app/shop/[slug]/page.tsx` now pauses checkout with a non-sensitive catalogue message. |
| 2026-07-12 | Sprint 008 makes launch membership/permission seed additive rather than destructive. | Existing assignments or custom mappings may already exist in Supabase; launch preparation should not delete data. | `0008_launch_membership_permission_seeds.sql` upserts levels/permissions and inserts missing mappings only. |
| 2026-07-12 | `staff` remains as a legacy alias while `stable-staff` becomes the preferred launch level. | Existing seed and possible assignments already used `staff`; removing or renaming it would risk access regressions. | New launch assignments should prefer `stable-staff`, but existing `staff` receives the same operational permissions. |
| 2026-07-12 | Production deployment remains separate from Sprint 008. | Sprint 008 prepared Supabase/env readiness but did not apply remote migrations or verify Stripe replay. | A later explicit launch/deploy instruction is still required. |
| 2026-07-12 | Sprint 009 deployed to Vercel production after explicit user authorization. | The user requested Architect Pack 009, deployment authorization, and deployment in the same instruction. | Production is live at `https://precisionperformance.com.au`; remote Supabase migration, authenticated workflow smoke, and Stripe replay remain follow-up acceptance items. |
| 2026-07-12 | User accepted the remaining live items as follow-up conditions. | The user explicitly said to accept the live items after Sprint 009 deployment. | Production remains live; remote Supabase migration, authenticated workflow smoke, and Stripe replay should be treated as accepted follow-up items, not Builder-verified evidence. |
| 2026-07-12 | Sprint 010 closes as partial with documented blockers rather than complete live acceptance. | Builder verified local validation, production deployment readiness, public/safety smoke, and anonymous protected-route redirects, but safe Supabase remote SQL, launch authenticated sessions/fixtures, and Stripe test replay paths were still unavailable. | Production remains live; final live acceptance still requires operator completion of the three documented gates. |


| 2026-07-14 | `Precision Performance Done.docx` is the source authority for the expanded Done target after Sprint 011 distillation. | The user supplied the document as the project Done definition, and it expands the finish line beyond the previously deployed MVP shell. | Future sprint planning should use `planning/DEFINITION_OF_DONE.md` as the canonical working definition and preserve the DOCX as source material. |
| 2026-07-14 | Done now means a trainer-ready biochemistry portal, not merely a deployed MVP shell. | Sprints 003-010 got the app live with partial live acceptance, but the Done document requires mobile test capture, voice notes, uploads, scoring, recommendations, trends, and role-specific access. | Roadmap planning shifts to Sprints 012-016 before claiming full product Done. |
| 2026-07-14 | Sprint 011 is planning/documentation only. | The work changes canonical roadmap truth and should not silently implement app behavior. | Builder must not edit production source, schema, auth, RLS, Stripe, deployment, or live data in Sprint 011. |
| 2026-07-14 | Missing formulas, pH calibration interpretation, and Table of Knowledge content must be captured as inputs, not invented. | Incorrect scoring or recommendation logic could mislead trainers and create operational risk. | Sprint 015 cannot implement final scoring/recommendations until approved formulas and domain content are supplied. |
| 2026-07-14 | OCR/photo recognition and voice-to-text require deliberate MVP/MVP2 scoping before implementation. | The Done document includes automatic extraction as optional/future enhancement language while also requiring daily trainer input support. | Sprint 014 should support reliable capture and confirmation first; automatic extraction should require explicit acceptance rules. |
| 2026-07-14 | Malformed checkout POST parsing failures should use the same safe missing-product redirect path as missing slug submissions. | Sprint 010 observed a raw production `500` risk when `request.formData()` failed before slug validation. | `app/api/checkout/route.ts` now catches unreadable form parsing and redirects before product, Supabase, or Stripe work. |

| 2026-07-14 | Sprint 012C deployment baseline should use the reconstructed production-equivalent candidate, not clean 8bf310a or full dirty workspace by default. | Route parity shows the candidate preserves current production behavior including /admin/commerce while excluding known .release-main extras and local env files. | A future deploy sprint should request explicit approval for C:\tmp\pp-012c-baseline-lean-20260714-173135 or first convert it into a committed baseline. |

| 2026-07-15 | Future deployment approval should use the Sprint 012D committed baseline, not the temporary Sprint 012C folder. | Sprint 012D converted the validated candidate into branch `codex/012d-production-baseline` at commit `358e1fc`, revalidated it, and stopped before deployment. | A future deployment sprint should deploy only after explicit approval from the 012D branch/commit, then run production smoke and rollback checks. |
| 2026-07-15 | Sprint 012E should run before Sprint 013 as an archive-first cleanup sprint. | Sprint 013 begins broad data-model/storage/RLS work, and stale release snapshots, generated artifacts, and duplicate handoff files can misdirect implementation. | Builder may archive clearly non-runtime cleanup candidates with a manifest, but must not delete files or change production behavior. |

| 2026-07-15 | Sprint 012E cleanup archives only low-risk non-runtime clutter and leaves uild/ ignored rather than archived. | Moving generated uild/types under
eferences/ made stale .ts files visible to TypeScript validation, so the move was reversed and documented. | Future cleanup should not move generated TypeScript output under active TypeScript include paths unless the typecheck configuration is explicitly adjusted in an approved sprint. |
| 2026-07-16 | Sprint 012F should hide the public website behind an under-construction holding page before Sprint 013 continues. | The user does not want the public seeing the website until it is complete. | Builder may hide public routes and block public checkout locally, but must stop before production deployment unless explicitly authorized. |
| 2026-07-16 | Public sign-up/interest capture must not persist personal data until a storage or provider path is approved. | Visitor data collection introduces privacy, storage, and third-party integration obligations. | Sprint 012F may use a non-persistent CTA, but database/email/CRM capture requires explicit approval. |
| 2026-07-16 | Sprint 012F under-construction page should use the supplied Thoroughbred image as the cover. | The user explicitly requested `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` as the placeholder cover with `Under Construction` written across it. | Builder should copy the image into active `public/` assets and reference that copy, not serve from `.release-main/`. |

============================================================
FILE: planning/RISKS.md
============================================================

# Risks

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---:|---:|---|---|
| Future global Node upgrades reintroduce the Next.js build hang. | Medium | Medium | Keep `npm run build` pinned to project-local Node `22.14.0`; test runtime upgrades in a dedicated maintenance sprint. | Active |
| Codex restricted sandbox hangs while normal unsandboxed local build succeeds. | Medium | Low | Use the bounded wrapper and, when needed, run final Next build validation outside the restricted sandbox; record this distinction in validation docs. | Active |
| OneDrive offline placeholders return under `node_modules` or generated output. | Medium | Medium | Rebuild dependencies with `npm ci` if direct reads or Next build stall on placeholder files; avoid relying on dehydrated dependency trees. | Active |
| Dirty worktree makes it unclear which changes belong to future product work. | High | Medium | Sprint 003 recorded the baseline. Sprint 004 should avoid unrelated reversions and record only its own changed files at close. | Active |
| Auth, RLS, admin service-role, Stripe, or webhook flows are scaffolded but not production-verified. | Medium | High | Sprint 004 verifies auth/RLS/portal access first; Stripe and commerce remain scheduled for Sprint 006. | Active |
| `.release-main/` and duplicated/generated artifacts continue to confuse inspection. | Medium | Medium | Inspect only when relevant; defer removal/archival to an approved cleanup sprint with OneDrive-aware permissions. | Active |
| npm audit reports dependency vulnerabilities. | Medium | Medium | Review audit output in a dependency/security maintenance sprint; do not run `npm audit fix --force` during feature work. | Active |
| Secret values or fragments leak into logs during environment verification. | Medium | High | Verify variable names, presence, and requiredness only; diagnostics may report configured/missing status only. | Active |
| Deployment target assumptions send later work toward the wrong platform. | Low | High | Sprint 003 documented Vercel as the local evidence-backed target; production project/domain confirmation remains a launch question. | Active |
| RLS fixes accidentally broaden member data visibility. | Medium | High | Use a documented admin/member/non-member access matrix and verify with real Supabase test users before closing Sprint 004. | Active |
| Test-user setup requires credentials or remote access the Builder does not have. | Medium | Medium | Do not print or request secret values in chat; record blocked cases and the smallest non-secret setup/access request needed. | Active |
| Auth hardening expands into admin commerce, Stripe, or data-entry workflow work. | Medium | Medium | Keep Sprint 004 limited to sign-in, callback, bootstrap, role gates, RLS, and access documentation. Defer commerce and data-entry to Sprints 005-006. | Active |
| Data-entry workflows pass code validation but fail with seeded production-like data. | Medium | High | Carry Sprint 005 live smoke blockers forward; verify assigned-horse fixtures, writer/non-writer users, and direct RLS checks before launch. | Active |
| Operational write permission is configured incorrectly for launch users. | Medium | High | Ensure trainer/admin launch users have `horse.records.write`; verify read-only owner/non-member users are denied from `/data-entry`. | Active |
| Stripe checkout/webhook behavior passes code validation but has not been replayed with test-mode Stripe events. | Medium | High | Sprint 007 should run Stripe test checkout and webhook replay, including duplicate delivery, before launch. | Active |
| Admin commerce visibility reveals too much operational payment detail if expanded carelessly. | Low | Medium | Keep `/admin/commerce` read-only and limited to persisted reconciliation fields; require a future approved sprint for commerce mutations. | Active |
| Product catalogue/pricing seeds may not match final launch offer. | Medium | Medium | Confirm final product catalogue, active statuses, pricing, and currency before Sprint 007 launch smoke. | Active |
| Production launch proceeds without live Supabase/RLS/Stripe proof. | Medium | High | Treat Sprint 007 status as no-go until the manual-intervention checklist in `docs/PRODUCTION_LAUNCH_READINESS.md` is complete. | Active |
| Raw operational errors leak to visitors during launch smoke. | Low | Medium | Keep user-facing failure states generic and record detailed diagnostics only as safe structural codes. Sprint 007 hardened product detail catalogue-load messaging. | Active |
| Remote Supabase is not migrated with the Sprint 008 launch membership seed. | Medium | High | Apply `0008_launch_membership_permission_seeds.sql` through an explicitly authorized Supabase migration path before live smoke. | Active |
| Production Stripe env entries are present but not recognizable as direct key shapes from local file inspection. | Medium | High | Verify production Vercel Stripe values in the dashboard and run Stripe test checkout/webhook replay before deployment. | Active |
| Malformed checkout POSTs without a form content type return `500` in production. | Low | Medium | Sprint 010 confirmed the intended missing-slug form case redirects safely; consider a later checkout hardening sprint to catch malformed body parsing errors before `request.formData()`. | Active |
| Vercel CLI filtered log scans are not available with the installed CLI behavior. | Medium | Low | Use dashboard logs or a bounded approved logging path in a later verification pass; do not start unbounded log follows during closeout. | Active |
| Scoring formulas for Hydration Score and Health Score are not yet locked. | High | High | Treat formulas as required product/domain inputs; do not implement scoring from assumptions. | Active |
| Recommendation content could be clinically or operationally misleading if Table of Knowledge rules are vague. | Medium | High | Require approved recommendation categories, level comments, disclaimers, and review workflow before launch use. | Active |
| Table of Knowledge content is only defined as a scaffold, not a complete recommendation library. | High | Medium | Build editable scaffold separately from final content and mark placeholder content as not production-ready. | Active |
| OCR/photo recognition may produce wrong readings from pH strips, refractometers, or meter screens. | Medium | High | Scope automatic extraction deliberately; require trainer confirmation and audit trail before readings affect scores. | Active |
| Voice-to-text could mishear horse names, notes, quantities, or readings. | Medium | Medium | Provide review/edit before save, structured confirmation, and manual fallback. | Active |
| Uploads introduce storage, privacy, retention, and access-control obligations. | Medium | High | Define storage buckets, allowed file types, retention rules, signed access, and RLS/storage policies before implementation. | Active |
| The under-60-second trainer workflow may fail without mobile performance and UX constraints. | Medium | High | Set a mobile performance budget and test capture flow on phone-width devices before acceptance. | Active |
| Vet and stable-staff exceptions could broaden data visibility beyond assigned-horse intent. | Medium | High | Define trainer-managed access rules and verify no cross-stable visibility with RLS tests. | Active |
| MVP/MVP2 boundary ambiguity could cause Builder to overbuild or underbuild. | High | Medium | Record explicit sprint scope and defer uncertain OCR, advanced recommendations, and access exceptions until approved. | Active |
| Trend charts and saved favorites may require additional schema and privacy boundaries. | Medium | Medium | Design chart preferences, snapshots, and access rules in the data-model sprint before UI build. | Active |
| Live acceptance can still remain partial even when public/safety smoke passes. | High | Medium | Keep Supabase, authenticated workflow/RLS, and Stripe replay gates tracked separately from public smoke. | Active |
| Local checkout hardening is not production-effective until deployed, despite local validation. | Medium | Medium | Record deployment status separately and re-smoke after any explicitly authorized production deployment. | Active |
| Reconstructed candidate is not yet a committed Git baseline. | Low | Medium | Sprint 012D converted the candidate into reviewed branch `codex/012d-production-baseline` at commit `358e1fc`; use that branch/commit for any future approval path. | Mitigated |
| Sprint 012D baseline is validated locally but not deployed. | Medium | Medium | Require explicit deployment authorization, deploy from the recorded 012D branch/commit only, and re-run production smoke after deployment. | Active |
| Cleanup accidentally changes runtime behavior before Sprint 013. | Low | High | Sprint 012E archived only low-risk non-runtime files, reversed the `build/` move when validation showed a typecheck side effect, and left ambiguous/runtime-adjacent candidates deferred. | Mitigated |

| Archived generated output under references can affect validation. | Medium | Medium | Keep generated TypeScript/build output in ignored root locations or adjust validation config only in an approved sprint; Sprint 012E documented and reversed the uild/ archive move. | Active |
| Public website remains visible while product is incomplete. | High | High | Sprint 012F hides public marketing/shop/contact/product routes behind a holding page, blocks checkout, and requires production smoke if deployment is authorized. | Active |
| Under-construction gate accidentally breaks auth callback, health checks, or webhook handling. | Medium | High | Sprint 012F requires an explicit route allow/deny matrix and local smoke for auth/API safety routes before deployment. | Active |
| Public sign-up form collects personal data without approved storage/provider rules. | Medium | High | Sprint 012F forbids persistent visitor data collection or third-party transmission without explicit user approval. | Active |

============================================================
FILE: planning/QUESTIONS.md
============================================================

# Open Questions

| Question | Owner | Needed By | Status | Answer / Notes |
|---|---|---|---|---|
| What is the next narrow product-readiness sprint after build readiness? | Architect / User | Next planning session | Answered | Approved next sprint was Sprint 003 - Release Baseline And Environment Truth. Full path to Done is locked in at `planning/SPRINT_SCHEDULE.md`. |
| Which deployment target is canonical for the next verification pass: Vercel, Railway, or local-only? | User / Architect | Sprint 003 | Answered with launch caveat | Local project evidence points to Vercel: `vercel.json`, `.vercel/project.json`, and README stack notes. Production intent/domain still need user confirmation before Sprint 007 launch work. |
| Should `.release-main/` and generated artifacts be removed with an elevated/OneDrive-aware cleanup pass later? | User / Architect | Later cleanup sprint | Open | Sprint 001 archive was blocked by Windows/OneDrive permissions. Sprint 003 inspected only and did not force-remove. |
| Should the dirty worktree be normalized before the first product implementation sprint? | Architect / User | Before broad product work | Open | Sprint 003 recorded the dirty baseline and did not revert unrelated work. Sprint 004 may proceed narrowly, but a dedicated normalization step remains recommended before broad feature or launch work if the team wants cleaner ownership boundaries. |
| Are auth/RLS/Stripe/admin service-role flows intended to be production-verified before member-facing work? | Architect / User | Product-readiness planning | Answered | Yes, but sequenced: release baseline first in Sprint 003, auth/RLS/portal in Sprint 004, portal/data-entry in Sprint 005, admin/commerce in Sprint 006, launch verification in Sprint 007. |
| Should global Node 24 support be pursued later? | Architect / Builder | Maintenance planning | Open | Current build is pinned to project-local Node `22.14.0`; global Node `24.14.1` repeatedly hung Next.js `15.3.8`. |
| What is the exact non-secret environment variable contract for local, staging, and production? | Builder / Architect | Sprint 003 close | Answered locally with production caveat | `docs/ENVIRONMENT.md` documents the local/source-derived variable contract by name/category/requiredness only. Actual production values and remote environment completeness were not validated. |
| What production domain should `NEXT_PUBLIC_SITE_URL` use? | User / Architect | Before Sprint 007 launch verification | Answered | Sprint 009 used `https://precisionperformance.com.au` as the canonical production URL and Vercel aliased the deployment to it. |
| What real Supabase test users should represent admin, active member, inactive/non-member, and anonymous Sprint 004 acceptance cases? | User / Builder | Sprint 004 / launch verification | Blocked | No real Supabase test-user sessions were available in this Builder run. `docs/AUTH_RLS_PORTAL_ACCESS.md` documents the role labels needed without requesting or storing credentials. |
| Is remote Supabase access available for RLS verification, or should Sprint 004 use local Supabase evidence plus blocked remote cases? | User / Builder | Sprint 004 / launch verification | Blocked | Sprint 004 used local source and migration evidence. Remote RLS execution remains blocked until non-destructive Supabase access is provided. |
| What real Supabase workflow fixtures should represent Sprint 005 portal/data-entry acceptance cases? | User / Builder | Sprint 005 / launch verification | Blocked | No configured Supabase test-user sessions, assigned horse fixtures, or remote RLS execution access were available in this Builder run. `docs/PORTAL_DATA_ENTRY_WORKFLOW.md` documents the exact non-secret setup needed. |
| Can authenticated phone-width and desktop-width workflow smoke be completed before launch? | User / Builder | Before Sprint 007 launch verification | Blocked | Sprint 005 automated validation passed, but browser/device smoke for signed-in live workflows remains blocked until Supabase env and test users are available. |
| Can Sprint 007 receive configured Stripe test-mode checkout and webhook replay access? | User / Builder | Sprint 007 | Blocked | Sprint 006 hardened code paths but could not run test checkout or webhook replay because Stripe env/test access was unavailable. |
| What final product catalogue, pricing, and active statuses should launch use? | User / Architect | Sprint 007 | Open | Sprint 006 verified database-backed active products and checkout-disabled fallback behavior, but final business offer/pricing still needs confirmation. |
| Can Sprint 007 receive configured Supabase admin/member/non-member users plus product/order/payment fixtures? | User / Builder | Sprint 007 | Blocked | Sprint 004-006 live smoke remains blocked by missing Supabase env, test users, role/horse/product/order/payment fixtures, and remote RLS access. |
| Is the MVP approved for production launch now? | User / Architect | Before deployment | Answered deployed | Sprint 009 received explicit deployment authorization and deployed to Vercel production. Full live acceptance remains partial until Supabase/RLS workflow smoke and Stripe checkout/webhook replay are completed. |
| Who will complete the remaining live acceptance checklist? | User / Operator / Builder | Before final live acceptance | Open | Sprint 010 verified deployment/public safety checks. Remaining gates are Supabase migration/checks, authenticated launch users/fixtures/RLS smoke, and Stripe test checkout/webhook replay without exposing secrets. |
| Which domain should be canonical for `NEXT_PUBLIC_SITE_URL`? | User / Operator | Before deployment | Answered | Sprint 009 used `https://precisionperformance.com.au` as canonical. |
| When should the Sprint 008 Supabase migration be applied remotely? | User / Operator / Builder | Before final live acceptance | Blocked | Sprint 010 confirmed no local `supabase` CLI, `psql`, or safe remote SQL execution path was available. Operator must apply the migration through Supabase dashboard or approved CLI, then Builder can run non-destructive checks. |

| Is Sprint 010 final live acceptance complete? | Builder / Architect | Sprint 010 close | Answered partial | No. Sprint 010 is partial with documented blockers: Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain unverified by Builder. |

| What exact formula should Hydration Score use for carbohydrate and conductivity? | User / Domain expert / Architect | Before Sprint 015 | Open | The Done document names the inputs and example interpretations but does not provide the final scoring formula. |
| What exact formula and weights should Health Score use for carbohydrate, conductivity, pH urine, pH saliva, and turbidity? | User / Domain expert / Architect | Before Sprint 015 | Open | The Done document identifies inputs and zone examples but says the actual formula is needed. |
| What pH ideal range and `.1` calibration rules are final for urine and saliva? | User / Domain expert / Architect | Before Sprint 013 | Open | The Done document mentions `.1` calibration and pH outside `6.5-7.5` as stress context; final storage/validation rules need confirmation. |
| When exactly should the pink Horiba conductivity `1.43` multiplier apply? | User / Domain expert / Architect | Before Sprint 013 | Open | The Done document says pink Horiba input is multiplied by `1.43`; Builder needs source/type rules so other conductivity readings are not transformed incorrectly. |
| What initial Table of Knowledge comments should ship for each category and Level 1-5 column? | User / Domain expert / Architect | Before Sprint 015 | Open | The Done document defines the scaffold and says comments can be changed/upgraded in MVP2, but initial production-safe content is not supplied. |
| Are recommendation disclaimers, trainer review, or vet review required before recommendations are shown? | User / Domain expert / Architect | Before Sprint 015 | Open | Recommendations may affect feed, hydration, supplements, workload, and health interpretation. |
| Is OCR/photo recognition part of MVP1, MVP2, or manual-confirmation-only launch behavior? | User / Architect | Before Sprint 014 | Open | The Done document describes automatic extraction as optional future enhancement/MVP2 while also describing photo input support. |
| What voice-to-text provider, permission flow, and fallback behavior should be used? | User / Architect / Builder | Before Sprint 014 | Open | The Done target requires voice notes; provider and failure behavior are not defined. |
| What upload file types, size limits, retention period, and Supabase Storage buckets should be used? | User / Architect / Builder | Before Sprint 013 | Open | The Done target requires photos and PDFs; storage/access policy needs explicit design. |
| How should trainer-managed vet access changes work? | User / Architect | Before Sprint 013 | Open | The Done target says vets are read-only unless changed by trainer; exact workflow and audit requirements are undefined. |
| What limited write permissions should stable staff have? | User / Architect | Before Sprint 013 | Open | The Done target says stable staff has limited write, but the permitted record types/actions need definition. |
| What pricing, catalogue, onboarding, and support plan should be treated as launch-ready? | User / Business owner / Architect | Before final Done acceptance | Open | The Done document includes business readiness, while existing product catalogue/pricing confirmation remains open. |
| Which Sprint 012 live acceptance tasks must be completed before product build resumes? | User / Architect / Builder | Sprint 012 planning | Open | Carry-forward candidates are Supabase remote migration/checks, authenticated RLS/workflow smoke, Stripe checkout/replay, and malformed checkout POST hardening. |
| Should Sprint 012 checkout safety fix be deployed before Sprint 013 starts? | User / Architect | Before Sprint 013 | Open | Sprint 012 validated the local source fix and production currently returned `307` for malformed smoke, but no deployment was performed in Sprint 012. |
| Who will provide the safe Supabase remote SQL/check path for final live acceptance? | User / Operator | Before final live acceptance | Blocked | Sprint 012 again found no local `supabase` CLI, `psql`, or safe dashboard/SQL path available to Builder. |
| Who will provide safe Stripe test-mode checkout and replay fixtures? | User / Operator | Before final live acceptance | Blocked | Stripe CLI is installed, but no safe test-mode checkout/replay target, endpoint setup, or fixtures were available. |
| Should the Sprint 012C candidate be deployed as-is in a future sprint or first converted into a committed branch/PR? | User / Architect | Before deployment | Answered | Sprint 012D converted the candidate into reviewed branch `codex/012d-production-baseline` at commit `358e1fc`. Future deployment approval should use the recorded 012D branch/commit, not the temporary 012C folder. |
| Is deployment of the Sprint 012D baseline authorized? | User / Architect | Before deployment | Open | No. Sprint 012D explicitly stopped before deployment, push, or PR. A future instruction must explicitly authorize any Vercel production deployment. |
| Which ambiguous cleanup candidates should be archived versus kept once Sprint 012E inventory is complete? | User / Architect | Sprint 012E close | Answered partial | Sprint 012E archived low-risk non-runtime clutter and deferred `.release-main/`, `.claude/`, `samples/`, `.next/`, and `build/` for user/Architect decision or ignore treatment. |

| Should .release-main/ be archived or removed in a future cleanup sprint? | User / Architect | Future cleanup | Open | Sprint 012E left it in place because it contains runtime source, package files, and nested Git metadata, and the sprint allowed inspection only unless clearly safe. |
| Should Sprint 012F production deployment be authorized after local validation passes? | User / Architect | Sprint 012F close | Open | The sprint can implement and validate locally, but production deployment remains a stop-and-confirm action unless the user explicitly authorizes it. |
| What destination should the public interest/sign-up CTA use? | User / Architect | Sprint 012F implementation | Open | Without an approved storage/provider path, Builder should use a non-persistent CTA such as mailto or a placeholder interest link. |
