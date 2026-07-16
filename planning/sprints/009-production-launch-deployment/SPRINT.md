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
