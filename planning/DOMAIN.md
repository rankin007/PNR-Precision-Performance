# Domain Context

This file captures the operating context for the current feature/fix sprint inside the existing project.

---

## Current Control-Plane Context - Sprint 036

Sprint 036 is sprint-closed `production-promotion-rolled-back-clean` in the permanent canonical repository at `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Production's five stable aliases independently resolve to compatible Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`. Ready candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` remains unaccepted after deployment-level alias metadata made the no-auto-promotion transition ambiguous.

The retained Sprint 035K adopted trainer identity and bounded eight-record synthetic pilot graph remain governed and unchanged. Live trainer acceptance is incomplete: no Production OTP, sign-in, dashboard, workspace/action, wrong-horse denial, sign-out or repeat sign-in was attempted in Sprint 036.

The next decision is deliberate non-promotion or an Architect-created corrective Sprint 036B Pack that first establishes authoritative per-alias pre/post transition evidence. Sprint 029N remains behind the live trainer-access gate. Planning records do not authorize Sprint 036B implementation or external mutation.

---

## Client

Aprec8 Pty Ltd

---

## Product Context

Precision Performance is a racehorse-focused equine performance platform. The intended product direction includes public website pages, member/owner/trainer portal experiences, data-entry workflows, horse performance records, biochemistry-related source material, membership administration, reporting, and commerce/payment capability.

The current codebase is a partially built Next.js/Supabase/Stripe application with a 120x planning layer added on top.

---

## Feature Or Fix Request

Sprint 005 is a portal and data-entry workflow sprint.

Builder should make the core assigned-horse and operational record workflow usable end-to-end: portal horse list/detail, daily records, feeding logs, track sessions, recent submission review, correction flows, validation states, and phone/desktop smoke evidence.

---

## Current Behavior

Known after Sprint 003:

- The repository contains a Next.js app with public, portal, admin, ops/data-entry, shop, auth, setup, checkout, and webhook surfaces.
- Supabase migrations, auth helpers, admin helpers, portal pages, and Stripe checkout/webhook scaffolding exist.
- Auth, RLS, admin service-role, Stripe checkout, and webhook behavior are scaffolded but not production-verified.
- Vercel is the local evidence-backed deployment target.
- The non-secret environment variable contract is documented in `docs/ENVIRONMENT.md`.
- `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` complete through the bounded validation wrapper when the known-good unsandboxed build path is used.
- `npm run build` is pinned to project-local Node `22.14.0`; global Node `24.14.1` hangs Next.js `15.3.8` startup.
- The worktree is dirty with many pre-existing changes recorded by Sprint 003.
- Production domain and remote Vercel environment completeness remain unverified.

---

## Desired Behavior

After Sprint 005:

- `/sign-in` presents a working sign-in path without exposing secrets or leaking confusing failure states.
- `/auth/callback` safely exchanges the Supabase callback and redirects users according to the intended app flow.
- authenticated users bootstrap into the expected `users` and `member_profiles` records, or failures are handled and documented clearly.
- active members can reach the intended `/portal` surfaces and see only permitted data.
- admin users can reach admin-only surfaces needed for Sprint 004 verification.
- non-members, inactive members, anonymous users, and wrong-role users are denied or redirected predictably.
- RLS policies are verified with real Supabase test users for the Sprint 004 access matrix.
- role and permission acceptance cases are documented for future portal/data-entry and launch work.
- validation remains green and no secret values or fragments are printed or stored.

---

## Known Files Or Modules To Inspect

- `app/sign-in/page.tsx`
- `components/auth/sign-in-form.tsx`
- `app/auth/actions.ts`
- `app/auth/callback/route.ts`
- `app/(portal)/layout.tsx`
- `app/(portal)/portal/page.tsx`
- `app/(portal)/portal/horses/page.tsx`
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `app/(portal)/portal/reports/page.tsx`
- `app/(admin)/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/users/page.tsx`
- `app/(admin)/admin/users/actions.ts`
- `app/(admin)/admin/memberships/page.tsx`
- `app/(admin)/admin/memberships/actions.ts`
- `lib/auth/session.ts`
- `lib/auth/roles.ts`
- `lib/auth/bootstrap.ts`
- `lib/auth/app-context.ts`
- `lib/auth/access.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `lib/supabase/admin.ts`
- `lib/supabase/env.ts`
- `supabase/migrations/0001_initial_schema.sql`
- `supabase/migrations/0002_rls_policies.sql`
- `supabase/migrations/0003_staff_scope_and_permissions.sql`
- `supabase/migrations/0004_staff_rls_extension.sql`
- `supabase/bootstrap/remote-init.sql`
- `docs/ENVIRONMENT.md`
- `docs/READINESS_AUDIT.md`
- `docs/VALIDATION.md`

---

## Constraints / Out Of Scope

- Do not build broad new portal/data-entry workflows.
- Do not redesign pages or components for visual polish.
- Do not deploy to production.
- Do not change production project settings.
- Do not print secret values or secret fragments.
- Do not delete files, generated artifacts, data, profiles, users, policies, or cleanup candidates.
- Do not force-remove or force-archive `.release-main/`.
- Do not change Stripe checkout, Stripe webhook, billing, product catalogue, order, or payment reconciliation behavior.
- Do not implement Sprint 005 horse workflow features except where a minimal existing page guard/query adjustment is required to prove access boundaries.
- Do not implement Sprint 006 admin commerce hardening.
- Do not normalize the entire dirty worktree by reverting or rewriting unrelated user work.
- Do not install packages from the network without approval.
- Do not chase Node 24 compatibility inside this sprint.
- Do not make broad schema changes. Any migration change must be the smallest auth/RLS/profile-bootstrap change needed for Sprint 004 acceptance.
- Automated AI recommendations in MVP 1 are out of scope unless later approved.
- Live laboratory integrations in MVP 1 are out of scope unless later approved.
- E-Trakka API/live integration in MVP 1 is out of scope unless later approved.
- Native in-app voice recording in MVP 1 is out of scope unless later approved.
- Multi-login trainer teams in MVP 1 are out of scope unless later approved.
- Owner, vet, or external stakeholder application logins in MVP 1 are out of scope unless later approved.
- Heavy AWS processing in MVP 1 is out of scope unless later approved.
- Laboratory staff application workflow in MVP 1 is out of scope unless later confirmed.

---

# Sprint 006 Domain Update

Sprint 006 is complete as an admin and commerce hardening sprint.

The current business-operations layer now includes validated admin user status updates, validated idempotent membership assignment, read-only admin commerce visibility, database-backed public product listing when Supabase is configured, checkout-disabled fallback products when configuration is absent, hardened one-time Stripe checkout creation, mandatory webhook signature verification, and safer order/payment reconciliation for duplicate supported events.

Live Supabase admin/commerce smoke, Stripe test checkout, Stripe webhook replay, duplicate webhook delivery verification, carried Sprint 004 RLS smoke, and carried Sprint 005 workflow/device smoke remain blocked until configured non-secret test access and fixtures are available.

Sprint 007 should treat production launch readiness as the next product context: deployment/environment confirmation, health/setup checks, public/auth/portal/ops/admin/checkout smoke, Stripe test/live-ready proof, rollback notes, and client acceptance.
---

# Sprint 007 Domain Update

Sprint 007 is complete as a production launch readiness verification and handoff sprint, but the final launch status is no-go until manual/user actions are completed.

Local/source-backed readiness is strong: Vercel remains the local evidence-backed deployment target, health/setup routes are non-sensitive, public/shop/sign-in fallback smoke passed, checkout/webhook failure states behaved safely, lint and TypeScript passed, and the known-good unsandboxed bounded build generated 23 routes.

Live launch proof remains blocked by missing production domain confirmation, remote Vercel environment verification, Supabase test users and fixtures, remote RLS checks, authenticated phone/desktop workflow smoke, Stripe test-mode checkout, Stripe webhook replay, duplicate delivery verification, and explicit production deployment authorization.

---

# Sprint 008 Domain Update

Sprint 008 prepared the launch data-access shape. The product now has explicit launch membership levels for owner/read-only, trainer/record-writer, stable staff, commerce admin, membership admin, and platform admin roles. The existing `staff` code remains supported as a legacy alias.

The user confirmed Vercel project `pnr-precision-performance` and confirmed `https://precisionperformance.com.au`, `https://www.precisionperformance.com.au`, and `https://pnr-precision-performance.vercel.app` are all valid domains. A single canonical `NEXT_PUBLIC_SITE_URL` still needs to be selected for production env configuration.
---

# Sprint 010 Domain Update

Sprint 010 completed a live acceptance closeout pass as a verification/evidence sprint. Production remains deployed on Vercel at `https://precisionperformance.com.au` with deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` still Ready.

Builder verified local validation, production public/safety smoke, and anonymous protected-route redirects. Remote Supabase migration application, authenticated Supabase/RLS/member/horse workflow smoke, and Stripe test checkout/webhook replay remain blocked by missing safe operator access, launch fixtures, and test-mode replay path.

Final Sprint 010 live acceptance status: partial with documented blockers.

---

# Sprint 011 Domain Update

Sprint 011 realigns the product target from a deployed MVP shell to the full trainer-ready biochemistry portal described in `Precision Performance Done.docx` and distilled in `planning/DEFINITION_OF_DONE.md`.

The current production app remains live at `https://precisionperformance.com.au`, but full project Done now requires a secure mobile-first portal where trainers can submit per-horse biochemistry tests in under 60 seconds, attach voice notes and photos/PDFs, confirm instrument readings, receive Hydration Score and Health Score results, get Table of Knowledge recommendations, and review trends over time.

The trainer-ready target includes these product capabilities:

- mobile test capture for assigned horses
- voice-to-text notes attached to test records
- upload support for photos, PDFs, pH readings, refractometer readings, conductivity meter readings, and related evidence
- carbohydrate, conductivity, pH urine, pH saliva, turbidity, temperature, water intake, and workload/context inputs
- pink Horiba conductivity multiplier of `1.43`
- pH urine and saliva `.1` calibration
- turbidity levels `1-5`
- ideal temperature chart line at `37.5`
- water intake in `.5` litre increments
- Hydration Score using carbohydrate and conductivity
- Health Score using carbohydrate, conductivity, pH urine, pH saliva, and turbidity
- Green/Amber/Red zones for both scores
- Table of Knowledge recommendations for hydration, feed, supplements, water timing/volume, and other guidance
- trainer, owner, vet, stable staff, and admin roles
- owner read-only access, vet read-only access unless trainer changes access, stable-staff limited write, admin full access/control
- assigned-horse-only visibility and no cross-stable access
- trend charts with individual and combined views, AM only, PM only, and both AM/PM filters
- saved favorite/default chart configurations
- history panel highlighting horses by zone and attention filters

Earlier MVP1 out-of-scope language remains historical context for Sprints 003-010. It should not be used to exclude the Done document capabilities from the forward roadmap. Instead, unresolved MVP1/MVP2 boundaries should be decided explicitly in Sprints 012-016, especially for OCR/photo recognition, voice-to-text provider behavior, Table of Knowledge content maturity, and trainer-managed vet/stable-staff access exceptions.

The next recommended sprint is Sprint 012 - Live Acceptance Closeout And Safety Hardening, because production live acceptance blockers from Sprint 010 should be closed before deeper scoring, uploads, and recommendation work begins.
