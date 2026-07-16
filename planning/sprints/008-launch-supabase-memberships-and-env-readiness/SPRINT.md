# Sprint 008 - Launch Supabase Memberships And Env Readiness

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user confirmed:

- Vercel project `pnr-precision-performance` is correct.
- Valid launch domains are:
  - `https://precisionperformance.com.au`
  - `https://www.precisionperformance.com.au`
  - `https://pnr-precision-performance.vercel.app`
- Vercel environment variable verification is OK.
- Builder should clean up and rewrite the required Supabase levels and memberships, shaping Supabase accordingly.
- Stripe has worked cleanly before; Builder should check current `.env` names safely and recreate `.env.example` Stripe guidance if Stripe cannot be verified cleanly.

## Goal

Prepare the app for launch verification by making the Supabase membership/permission seed shape explicit, repeatable, and launch-ready, and by making the non-secret env example clear for Supabase, Vercel, and Stripe test/live readiness.

## In Scope

Builder may:

- inspect current Supabase migrations and bootstrap SQL
- inspect `.env*` files by variable name and presence only; do not print values
- inspect Stripe env helpers and checkout/webhook readiness paths
- add an additive Supabase migration for launch membership levels and permission mappings
- keep existing code behavior compatible with current membership codes where needed
- regenerate `supabase/bootstrap/remote-init.sql` with `npm run db:bundle`
- update `.env.example` with placeholders/comments only, no real values
- update docs with the membership/permission matrix, env readiness, Stripe test-mode checklist, and any remaining manual steps
- update planning state/status/briefing at close

## Out Of Scope

Builder must not:

- print or store secret values or fragments
- apply migrations to a remote/production Supabase project without explicit separate authorization
- create/delete/modify real production users, memberships, horses, products, orders, payments, subscriptions, or Stripe objects
- run live Stripe charges or production Stripe account changes
- start, promote, or change a production deployment
- change DNS or production Vercel/Supabase/Stripe settings
- perform destructive database changes
- broaden the app's auth, payment, or data model beyond additive launch seed/readiness work
- install packages from the network

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
- `docs/ENVIRONMENT.md`
- `docs/DEPLOYMENT.md`
- `docs/VALIDATION.md`
- `docs/READINESS_AUDIT.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
- `docs/ADMIN_COMMERCE_HARDENING.md`
- `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md`
- `.env.example`
- `supabase/migrations/0008_launch_membership_permission_seeds.sql`
- `supabase/bootstrap/remote-init.sql`
- `lib/auth/roles.ts`, only if code constants need launch permission alignment
- `lib/auth/bootstrap.ts`, only if admin membership assignment display/validation needs launch-code compatibility
- `app/(admin)/admin/memberships/page.tsx`, only if launch membership copy needs clarity
- `app/(admin)/admin/memberships/actions.ts`, only if launch membership assignment validation needs clarity
- `scripts/`, only for non-secret env/membership validation helpers if needed

Inspection-only:

- `.env*` values, names/presence only
- `app/api/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe/env.ts`
- `lib/stripe/server.ts`
- `lib/stripe/commerce.ts`
- existing Supabase migrations
- Vercel local metadata

## Launch Membership Shape

Builder should make these launch roles explicit unless existing schema evidence requires a safer synonym:

| Level code | Intended user | Permissions |
|---|---|---|
| `owner` | Active owner/read-only member | Portal access through active membership and assigned horse RLS; no operational write permission. |
| `trainer` | Active trainer/record writer | Portal access plus `horse.records.write`. |
| `stable-staff` | Operational staff scoped to stable assignments | `stable.staff.read`, `stable.staff.write`, and `horse.records.write`. |
| `commerce-admin` | Commerce/operator admin without full platform control | `commerce.finance`. |
| `membership-admin` | Membership operator without full platform control | `membership.manage`. |
| `admin` | Platform administrator | All launch permissions. |

Existing `staff` code should remain supported as an alias/backward-compatible level if already seeded.

## Acceptance Criteria

- Sprint 008 pack is applied and `planning/STATE.md` says implementation is authorized for this sprint before source edits.
- Supabase launch membership/permission seed is additive/idempotent.
- Existing membership codes required by current app/admin flows remain compatible.
- `supabase/bootstrap/remote-init.sql` is regenerated from migrations.
- `.env.example` contains clear placeholder-only Supabase/Vercel/Stripe guidance.
- `.env*` inspection is name-only and does not print values.
- Stripe readiness is documented by required variable names and test-mode steps; no secret values are printed.
- Production deployment remains blocked unless separately authorized.
- Validation results are recorded.

## Required Validation

- `git status --short`
- name-only `.env*` presence inspection
- inspect relevant Supabase migration seed output
- `npm run db:bundle`
- secret-fragment scan of changed files/docs
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- if sandboxed build times out at known Next startup, rerun the bounded build outside the restricted sandbox and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`

## Manual Intervention Rule

If applying migrations to remote Supabase, checking Vercel production env values, running Stripe test checkout, replaying webhooks, or deploying production requires user/operator action, Builder must document:

- what is blocked
- evidence checked
- exact action needed
- step-by-step instructions
- what Builder will verify afterward
