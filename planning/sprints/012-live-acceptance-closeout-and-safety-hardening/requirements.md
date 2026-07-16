# Sprint 012 - Live Acceptance Closeout And Safety Hardening Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user accepted the Sprint 011 Builder report and requested: "Architect Pack 012. Go create the pack."

Sprint 011 clarified that full project Done is the trainer-ready biochemistry portal described in `planning/DEFINITION_OF_DONE.md`. Before deeper product build continues, Sprint 012 should close or explicitly re-block the current live acceptance gates and harden the known malformed checkout POST behavior.

## Goal

Close the remaining deployed-MVP live acceptance gaps where safe access exists, document exact manual interventions where it does not, and make the smallest checkout safety fix needed to avoid raw `500` responses for malformed checkout POST bodies.

## Current Evidence Baseline

- Production app is live at `https://precisionperformance.com.au`.
- Production deployment id remains documented as `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 010 public/safety smoke passed for `/`, `/shop`, `/sign-in`, `/api/health`, `/api/setup/status`, `/auth/callback`, missing-slug checkout, unsigned webhook, and anonymous protected-route redirects.
- Sprint 010 remained partial because Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay were blocked.
- Sprint 010 found malformed `POST /api/checkout` without form content type returned `500`; intended missing-slug form submission redirected safely.
- `app/api/checkout/route.ts` currently calls `request.formData()` before slug validation, so malformed or non-form POST bodies can fail before safe redirect handling.

## In Scope

Builder may:

- inspect current deployment, local git status, and non-secret configured/missing readiness state
- inspect `.env*` names and presence only; no values or fragments
- inspect Vercel project/deployment status and non-sensitive logs where available
- apply or verify `supabase/migrations/0008_launch_membership_permission_seeds.sql` remotely only through an existing safe path that does not expose secrets
- run non-destructive membership/permission existence checks after migration application when safe access is available
- use existing safe launch test users/sessions to verify auth, portal, data-entry, admin, and denial-path behavior
- verify assigned-horse and unassigned-horse RLS boundaries with non-destructive reads/writes where safe fixtures exist
- complete Stripe test-mode checkout only with test-mode products, test cards, and existing safe test access
- replay signed Stripe test events to the deployed webhook endpoint and replay one supported event twice
- make a narrow malformed-body guard in `app/api/checkout/route.ts`
- add or update focused tests only if a local test pattern already exists and can be done without broad setup
- run local validation with the bounded wrapper and use the known-good unsandboxed build path if the restricted sandbox repeats the known Next startup timeout
- run production public/safety smoke checks
- update planning and evidence docs with results, blockers, and final Sprint 012 status
- refresh `planning/ARCHITECT_BRIEFING.md` at sprint close

## Out Of Scope

Builder must not:

- print, store, or document secret values or fragments
- delete files, data, users, horses, products, orders, payments, subscriptions, or generated artifacts
- make destructive database changes or rollbacks
- change DNS settings
- create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes
- mutate production users, memberships, horses, products, orders, payments, or subscriptions except for non-destructive use of existing approved test fixtures and Stripe test-mode payment flows
- change auth, RLS, billing, payment, schema, product catalogue behavior, launch infrastructure, or Node runtime compatibility
- implement any Sprint 013-016 product-build work, including biochemistry test model, voice notes, uploads, scoring, recommendations, or charts
- install packages from the network without approval
- normalize unrelated dirty worktree changes
- treat user-accepted follow-up conditions as Builder-verified evidence unless Builder actually verifies them during Sprint 012

## Approved File Set

Builder may edit:

- `app/api/checkout/route.ts`
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

Builder may add or update focused checkout tests only if the existing project already has a nearby test pattern and the file is directly tied to `app/api/checkout/route.ts`.

Inspection-only:

- `.env*` names/presence only
- `.vercel/project.json`
- `vercel.json`
- `package.json`
- `scripts/run-validation-command.ps1`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `app/api/health/route.ts`
- `app/api/setup/status/route.ts`
- `app/api/stripe/webhook/route.ts`
- portal, data-entry, admin, auth, Supabase, and Stripe source files needed to verify current live acceptance behavior

## Manual Intervention Rule

If any required verification cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

This applies especially to remote Supabase access, launch test users, assigned/unassigned horse fixtures, Stripe test-mode access, signed webhook replay, production dashboard access, and any required operator action.
