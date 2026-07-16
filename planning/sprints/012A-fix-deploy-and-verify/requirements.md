# Sprint 012A - Fix, Deploy, And Verify Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Architect recommendation to deploy and verify the Sprint 012 checkout safety fix, with one explicit change: "change the sprint number to 012A."

The user also said: "Do not assume! any questions, or if you are not clear, ask."

This pack therefore makes the deployment target and stop conditions explicit.

## Goal

Deploy the Sprint 012 malformed checkout POST safety fix to the existing production Vercel project and verify that production behavior and deployment provenance are clear.

Sprint 012A is successful when:

- the local source fix is confirmed
- local validation passes through the known-good path
- the approved source state is deployed to the existing Vercel production project
- production smoke verifies malformed checkout POST no longer returns a raw `500`
- docs clearly state what was deployed, where, and what remains blocked

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Existing Vercel project linkage is `pnr-precision-performance`.
- Current documented production deployment id before Sprint 012A is `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 012 hardened `app/api/checkout/route.ts` locally by guarding `request.formData()`.
- Sprint 012 local validation passed through lint, TypeScript, and outside-sandbox bounded build.
- Sprint 012 local checkout malformed/missing slug smoke returned `307`.
- Sprint 012 production smoke returned safe statuses, but Sprint 012 did not deploy the local checkout source fix.
- Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain blocked by missing safe access/fixtures.

## In Scope

Builder may:

- inspect current git status, branch, revision, and app/source diffs needed to verify the Sprint 012 fix
- inspect Vercel project/deployment metadata
- inspect `.env*` names/presence only; no values or fragments
- run local validation with the bounded wrapper
- run local route smoke for checkout malformed/missing slug behavior where feasible
- deploy the current approved source state to Vercel production only if target and source-state stop conditions are clear
- inspect Vercel production deployment status and aliases after deploy
- run production public/safety smoke after deploy
- check whether Supabase/authenticated/Stripe blockers have become safely verifiable, and verify only where safe access exists
- update planning and evidence docs with deployment, validation, smoke, and blocker status
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close

## Out Of Scope

Builder must not:

- implement any new product behavior beyond deploying the existing Sprint 012 checkout safety fix
- edit checkout logic further unless the existing Sprint 012 fix is missing or a one-line correction is required to make the approved fix compile
- implement Sprint 013-016 biochemistry data model, voice notes, uploads, scoring, recommendations, Table of Knowledge, trends, or saved charts
- print, store, or document secret values or fragments
- delete files, users, data, generated artifacts, or deployment history
- make destructive database changes or rollbacks
- apply remote Supabase migrations unless a safe approved path already exists and exposes no secrets
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions
- change DNS settings or Vercel/Supabase/Stripe project settings beyond the approved Vercel production deployment
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
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`

Builder may inspect and, only if necessary to preserve the already-approved Sprint 012 fix, minimally correct:

- `app/api/checkout/route.ts`

Inspection-only:

- `.env*` names/presence only
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `scripts/run-validation-command.ps1`
- `app/api/health/route.ts`
- `app/api/setup/status/route.ts`
- `app/api/stripe/webhook/route.ts`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- relevant auth, portal, data-entry, admin, Supabase, and Stripe source files needed for smoke/blocker documentation

## Deployment Stop Conditions

Builder must stop and ask before deploying if:

- `.vercel/project.json` does not identify `pnr-precision-performance`
- Vercel production target or production aliases cannot be verified by non-secret metadata
- local source no longer contains the Sprint 012 checkout malformed-body guard
- `git diff` or source inspection shows unexpected app/source changes beyond `app/api/checkout/route.ts` that would be included in deployment
- local lint, TypeScript, or known-good build validation fails for a reason not already documented as restricted-sandbox-only
- deployment command would expose secrets or require printing tokens
- deployment would require DNS/project setting changes

Planning/docs changes may be present and should be documented, but unexpected app/source changes require user confirmation before deploy.

## Manual Intervention Rule

If any required verification cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
