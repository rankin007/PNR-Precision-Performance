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

Sprint 008 is approved as a launch execution preparation sprint. The user confirmed Vercel project `pnr-precision-performance`, confirmed all three domains are valid launch domains (`https://precisionperformance.com.au`, `https://www.precisionperformance.com.au`, and `https://pnr-precision-performance.vercel.app`), approved Vercel env verification, asked Builder to clean up and rewrite required Supabase levels/memberships, and asked Builder to check current env names and recreate Stripe env example guidance if Stripe cannot be verified cleanly.

Production deployment/promotion is not yet authorized by this Sprint 008 pack. Sprint 008 prepares the database/env readiness shape and documents the remaining deployment authorization step.

---

## Workflow Profile

Selected profile: `strict`

Reason: Sprint 008 touches membership levels, permissions, Supabase launch seed migrations, Stripe environment readiness, and production launch preparation. Builder must keep changes additive and reversible, avoid credential exposure, avoid destructive database/data changes, and stop before production deployment, DNS changes, production project-setting changes, live financial operations, or applying remote database migrations unless explicitly authorized.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: yes

Builder may edit files inside the Sprint 008 approved scope without another approval.

Sprint 008 explicitly authorizes narrow launch preparation work for:

- additive Supabase migration(s) that seed or update launch membership levels and permission mappings
- non-destructive Supabase bootstrap SQL regeneration from migrations
- documentation of the launch membership/permission matrix and smoke fixtures
- `.env.example` cleanup with placeholders only, including Stripe test-mode guidance by variable name only
- name-only inspection of existing `.env*` files for required variable presence, without printing values
- Stripe env readiness checks by configured/missing status only
- local validation, secret-fragment scans, and sprint-close documentation

Builder must stop and ask before:

- printing, storing, or documenting secret values, tokens, credentials, private keys, passwords, full connection strings, raw webhook payloads with sensitive values, or secret fragments
- deleting files or data
- making destructive database changes
- applying migrations to a remote or production Supabase project
- creating, deleting, or modifying real production users, memberships, horses, products, orders, payments, subscriptions, or Stripe objects
- making live charges, refunds, payouts, subscription changes, tax changes, or production Stripe account changes
- changing production Vercel/Supabase/Stripe project settings
- changing DNS/domain settings
- starting or promoting a production deployment
- modifying files outside the approved file set
- installing packages from the network
- changing launch infrastructure, Node runtime compatibility, broad cleanup, `.release-main/`, or generated artifacts outside this sprint

---

## Active Sprint

`planning/sprints/008-launch-supabase-memberships-and-env-readiness/`

Sprint 008 - Launch Supabase Memberships And Env Readiness

---

## Approved Sprint Schedule

Sprint 008 is the current approved launch-preparation sprint after Sprint 007.

---

## Next Actions

1. Builder applies this Architect Pack.
2. Builder reads the Sprint 008 sprint file.
3. Builder inspects current Supabase migrations, membership/permission helpers, env example, and Stripe env helpers.
4. Builder creates additive launch membership/permission seed migration(s) and regenerates `supabase/bootstrap/remote-init.sql`.
5. Builder updates `.env.example` and launch docs with non-secret Stripe/Supabase readiness guidance.
6. Builder validates lint, TypeScript, build, secret-fragment scans, and closes the sprint docs.

---

## Blockers

Production deployment remains blocked until explicitly authorized after Sprint 008 validation.

Remote Supabase migration application remains blocked unless the user explicitly authorizes applying migrations to the target Supabase project and provides a safe execution path that does not expose secrets.

Stripe test checkout/webhook replay remains blocked unless configured test-mode access is available in the local or target environment.

============================================================
FILE: planning/sprints/008-launch-supabase-memberships-and-env-readiness/SPRINT.md
============================================================

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

============================================================
FILE: planning/STATUS.json
============================================================

{
  "schemaVersion": 1,
  "phase": "apply-pack",
  "sprint": "008-launch-supabase-memberships-and-env-readiness",
  "updated": "2026-07-12T09:00:00+10:00"
}
