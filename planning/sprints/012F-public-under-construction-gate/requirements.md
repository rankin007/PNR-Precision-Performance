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
