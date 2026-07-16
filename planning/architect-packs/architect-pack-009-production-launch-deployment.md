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

Sprint 009 is approved as a production launch deployment sprint. The user explicitly requested Architect Pack 009, asked to include authorization for deployment, and asked Builder to deploy. This sprint authorizes production launch execution against Vercel project `pnr-precision-performance` after required non-secret checks and safe live-test gates are attempted or documented.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 009 authorizes production deployment and may require remote Supabase migration application, production Vercel environment verification, Stripe test checkout/webhook replay, production smoke checks, and rollback readiness. Builder must avoid secret exposure, destructive database/data changes, live financial changes, DNS changes, and unaudited project-setting changes.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 009 approved scope without another approval.

Sprint 009 explicitly authorizes:

- non-secret inspection of Vercel project linkage and configured/missing environment status
- selecting `https://precisionperformance.com.au` as the canonical production `NEXT_PUBLIC_SITE_URL` unless existing Vercel configuration proves a different canonical value is already configured
- applying the additive/idempotent Sprint 008 Supabase launch membership migration to the target Supabase project only through an existing safe project path that does not expose secrets
- running local validation and smoke checks
- running Stripe test-mode checkout and signed webhook replay if test-mode access is already configured and no secret values need to be printed or stored
- creating a Vercel preview deployment if useful for smoke
- deploying or promoting the current validated app to production on Vercel project `pnr-precision-performance`
- production post-deploy smoke checks for public, health/setup, auth fallback, shop, checkout failure-safe, and webhook unsigned rejection paths
- sprint-close documentation, status updates, and manual-intervention records

Builder must stop and ask before:

- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes
- creating, deleting, or modifying real production users, horses, products, orders, payments, subscriptions, Stripe objects, or production customer data outside explicitly safe test-mode smoke
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing DNS/domain settings
- changing Vercel/Supabase/Stripe project settings beyond the already-authorized production deployment path and configured/missing env verification
- changing authentication, authorization, RLS, billing, payment, database schema, migrations, or production data outside applying the already-created additive Sprint 008 migration
- modifying files outside the approved file set
- installing packages from the network
- changing launch infrastructure, Node runtime compatibility, broad cleanup, `.release-main/`, or generated artifacts outside this sprint

---

## Active Sprint

`planning/sprints/009-production-launch-deployment/`

Sprint 009 - Production Launch Deployment

---

## Approved Sprint Schedule

Sprint 009 is the current approved production launch deployment sprint after Sprint 008.

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads the Sprint 009 sprint file and uses it as the source of truth.
3. Builder verifies local source readiness and non-secret deployment target status.
4. Builder attempts the authorized remote readiness gates using configured safe access.
5. Builder deploys or promotes to production when the gated checks are green or clearly documented as blocked with user-authorized deployment still proceeding.
6. Builder runs post-deploy smoke checks and records deployment URL/status.
7. Builder closes sprint docs and refreshes `planning/ARCHITECT_BRIEFING.md`.

---

## Blockers

Deployment is authorized by the user request for Sprint 009. If any required remote access is unavailable, Builder must document the blocker and exact manual intervention required instead of inventing credentials or exposing secrets.

============================================================
FILE: planning/sprints/009-production-launch-deployment/SPRINT.md
============================================================

# Sprint 009 - Production Launch Deployment

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user requested: "Architect Pack 009 go create the pack. Include authorization for deployment. And then deploy."

This is explicit authorization to create and apply Sprint 009, then run the deployment workflow for Vercel project `pnr-precision-performance`.

## Goal

Launch the current validated Precision Performance app to production on Vercel, with non-secret readiness verification, rollback notes, and post-deploy smoke evidence.

## Canonical Launch Target

- Vercel project: `pnr-precision-performance`
- Canonical production URL assumption: `https://precisionperformance.com.au`
- Also-valid launch URLs to smoke when available:
  - `https://www.precisionperformance.com.au`
  - `https://pnr-precision-performance.vercel.app`

If remote Vercel configuration already has a different canonical `NEXT_PUBLIC_SITE_URL`, Builder may preserve it and document the configured/missing status only.

## In Scope

Builder may:

- inspect deployment, env, Supabase, and Stripe readiness by configured/missing or name-only status only
- verify Vercel project linkage and deployment status
- select or preserve canonical production URL as described above
- apply `supabase/migrations/0008_launch_membership_permission_seeds.sql` remotely only if a safe existing Supabase execution path is available and does not expose secrets
- run local validation and local route smoke
- run Stripe test-mode checkout and signed webhook replay only if existing safe test-mode access is configured
- create a preview deployment if useful for final smoke
- deploy or promote the validated current app to production on Vercel
- inspect production deployment status and logs at a non-sensitive summary level
- smoke production public, health/setup, sign-in fallback, shop, checkout missing-slug, and unsigned webhook safety paths
- update planning and launch docs with deployment result, remaining manual interventions, and rollback notes

## Out Of Scope

Builder must not:

- print or store secret values or fragments
- delete files, database records, users, products, payments, or generated artifacts
- make destructive database changes or rollbacks
- change DNS settings
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions except for non-destructive test-mode workflow evidence when already configured
- change auth, RLS, billing, payment, schema, or product behavior beyond applying the already-created additive Sprint 008 migration
- install packages from the network without approval
- normalize unrelated dirty worktree changes

## Approved File Set

Builder may edit:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/DOMAIN.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/DEPLOYMENT.md`
- `docs/ENVIRONMENT.md`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`

Inspection-only:

- `.env*` names/presence only
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `app/api/health/route.ts`
- `app/api/setup/status/route.ts`
- `app/api/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/supabase/env.ts`
- `lib/stripe/env.ts`

## Deployment Authorization

Production deployment is authorized for this sprint.

Builder may run the Vercel deployment path needed for the linked project, preferring a gated sequence:

1. `vercel pull --yes --environment=production` if Vercel CLI authentication is available and the command can run without printing secret values.
2. `vercel build --prod` when practical, or existing project validation plus Vercel remote build if local production env pull is unavailable.
3. `vercel deploy --prebuilt --prod` when a prebuilt output exists, otherwise `vercel deploy --prod --yes`.
4. `vercel inspect` and non-sensitive post-deploy smoke checks.

If Vercel CLI authentication or network access is unavailable, Builder must request the required approval/tool access or document manual deployment instructions.

## Acceptance Criteria

- Architect Pack 009 is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 009.
- Local validation is attempted and results are recorded.
- Remote Supabase migration application is attempted only through a safe existing path, or a manual-intervention record explains why it is blocked.
- Production Vercel env readiness is checked by configured/missing status only, or a manual-intervention record explains why it is blocked.
- Stripe test checkout/webhook replay is attempted only with existing safe test-mode access, or a manual-intervention record explains why it is blocked.
- Production deployment is attempted through Vercel for project `pnr-precision-performance`.
- Deployment URL/status, commit or local revision identity, and post-deploy smoke results are recorded.
- Rollback path is recorded.
- No secret values or fragments are printed or stored.
- Sprint-close planning docs are updated.

## Required Validation

- `git status --short`
- inspect `.vercel/project.json` and `vercel.json`
- name-only `.env*` presence inspection, no values
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- if sandboxed build times out at known Next startup, rerun the bounded build outside the restricted sandbox and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`
- Vercel deployment command result
- `vercel inspect` or equivalent deployment status check when available
- production smoke for:
  - `/`
  - `/shop`
  - `/sign-in`
  - `/api/health`
  - `/api/setup/status`
  - `/auth/callback` without callback state
  - `/api/checkout` missing slug
  - `/api/stripe/webhook` unsigned request

## Manual Intervention Rule

If applying migrations to remote Supabase, checking Vercel production env values, running Stripe test checkout, replaying webhooks, deploying production, or verifying production smoke requires user/operator action, Builder must document:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions
- what Builder will verify after the action is complete

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "009-production-launch-deployment",
  "updated": "2026-07-12T12:00:00+10:00"
}
