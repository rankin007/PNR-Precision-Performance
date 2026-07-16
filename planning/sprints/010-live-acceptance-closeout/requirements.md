# Sprint 010 - Live Acceptance Closeout Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user requested: "Architect Pack 010: Go create the pack."

Sprint 009 production deployment is complete. On 2026-07-12, the user accepted the remaining live items as known follow-up conditions rather than Builder-verified evidence.

## Goal

Close out the accepted live follow-up conditions with safe, non-secret evidence:

- remote Supabase launch membership migration application
- authenticated Supabase/RLS/member/horse workflow smoke
- Stripe test checkout, signed webhook replay, and duplicate delivery verification
- final live acceptance status and manual-intervention records

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Secondary aliases `https://www.precisionperformance.com.au` and `https://pnr-precision-performance.vercel.app` returned `200` in Sprint 009.
- Production deployment id: `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Public/safety smoke passed in Sprint 009.
- Vercel production env names were verified by encrypted/configured status only in Sprint 009.
- Remote Supabase migration application was not completed in Sprint 009.
- Authenticated workflow/RLS smoke was not completed in Sprint 009.
- Stripe test checkout and signed webhook replay were not completed in Sprint 009.

## In Scope

Builder may:

- inspect current deployment, local git status, and non-secret configured/missing readiness state
- inspect `.env*` names and presence only; no values or fragments
- inspect Vercel project/deployment status and non-sensitive logs where available
- apply `supabase/migrations/0008_launch_membership_permission_seeds.sql` remotely only through an existing safe path that does not expose secrets
- run non-destructive membership/permission existence checks after migration application when safe access is available
- use existing safe launch test users/sessions to verify auth, portal, data-entry, admin, and denial-path behavior
- verify assigned-horse and unassigned-horse RLS boundaries with non-destructive reads/writes where safe fixtures exist
- complete Stripe test-mode checkout only with test-mode products, test cards, and existing safe test access
- replay signed Stripe test events to the deployed webhook endpoint and replay one supported event twice
- run local validation with the bounded wrapper and use the known-good unsandboxed build path if the restricted sandbox repeats the known Next startup timeout
- update planning and evidence docs with results, blockers, and final live acceptance status
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close

## Out Of Scope

Builder must not:

- print, store, or document secret values or fragments
- delete files, data, users, horses, products, orders, payments, subscriptions, or generated artifacts
- make destructive database changes or rollbacks
- change DNS settings
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions except for non-destructive use of existing approved test fixtures and test-mode payment flows
- change auth, RLS, billing, payment, schema, product behavior, launch infrastructure, or Node runtime compatibility
- install packages from the network without approval
- normalize unrelated dirty worktree changes
- treat user-accepted follow-up conditions as Builder-verified evidence unless Builder actually verifies them during Sprint 010

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
- `app/(portal)/portal/page.tsx`
- `app/(portal)/portal/horses/page.tsx`
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `app/(portal)/data-entry/page.tsx`
- `app/(portal)/data-entry/actions.ts`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/commerce/page.tsx`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/supabase/env.ts`
- `lib/stripe/env.ts`

## Manual Intervention Rule

If any required verification cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This applies especially to remote Supabase access, launch test users, assigned-horse fixtures, Stripe test-mode access, signed webhook replay, and any production dashboard action.
