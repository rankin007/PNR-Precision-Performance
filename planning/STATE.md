# Project State

**Project:** Precision Performance
**Client:** Aprec8 Pty Ltd
**Mode:** Existing Project / Feature or Fix

---

## Current Status

The 120x planning layer is installed inside the existing Precision Performance project.

Client/source reference material is centralized under `references/`, including `references/client-docs/PNR and RJR EPP Working Information`.

Sprints 001-012F are complete. Sprint 012F is production-deployed and the public website remains behind the under-construction gate at `https://precisionperformance.com.au`; public shop/checkout surfaces remain blocked.

Sprint 013 is complete as a local source-controlled biochemistry data model sprint. Builder preserved the supplied `Reading Tables v1.csv`, created the local Supabase migration for biochemistry tests/lookups/uploads/notes/access scaffolds/soft-delete audit, added the TypeScript domain contract, documented the data model and pricing evidence, regenerated `supabase/bootstrap/remote-init.sql`, and validated locally.

Sprint 014 is complete as a local biochemistry scoring service and fixtures sprint. Builder implemented exact lookup scoring, pH Average, conductivity C conversion, Hydration Score, Health Score, blocked/unscored result behavior, fixture-backed validation, and scoring documentation.

Sprint 015 is complete as a local scoring-output and recommendation-engine scaffold sprint. Builder implemented supplied-threshold zone classification contracts, recommendation rule/snapshot structures, blocked/unavailable behavior for missing thresholds/content, fixture-backed validation, and recommendation documentation.

Sprint 016 is complete as a repository alignment and done-state baseline sprint. Builder inventoried and classified the dirty working tree, created repository alignment documentation, identified manual-review items, and recommended a separate baseline commit approval step before more feature work.

Sprint 017 is complete locally as a baseline commit approval sprint. Builder resolved the accepted Sprint 016 manual-review items, validated the repository baseline, and prepared the authorized local commit. `.env.vercel.production` was removed from Git tracking while preserved locally and ignored; deleted root `ORCHESTRATOR*` files were verified against archived copies; deleted root `middleware.ts` passed route-safety validation.

Sprints 013-017 did not apply remote Supabase migrations, mutate production data, deploy, push, create a PR, change Stripe products/prices, reopen the public shop, add UI, add OCR/voice provider integration, add trend charts, invent production thresholds, or invent production recommendation content.

---

## Workflow Profile

Selected profile: `strict`

Reason: The project remains production-capable and includes auth, RLS, uploads, pricing, Stripe, and deployment surfaces. Sprint 017 created a local baseline only after resolving accepted manual-review items and passing validation. Remote migrations, production data mutation, deployment, UI work, Stripe product/price changes, public shop reopening, push, and PR work remain stop-and-confirm actions.

See `docs/WORKFLOW_PROFILE.md`.

---

## Implementation Authorization

Implementation authorized: no

Sprint 017 is closed. New cleanup, commit, feature, deployment, migration, production, Stripe, public reopening, push, or PR work requires a new approved sprint/state update.

Builder must stop and ask before:

- printing, copying, staging, or committing secret values or fragments
- deleting the local `.env.vercel.production` file from disk
- staging `.release-main/`, `.claude/`, or `samples/` wholesale
- applying remote Supabase migrations
- mutating production data
- deploying to Vercel
- pushing to remote
- creating a pull request
- changing DNS, Vercel settings, Supabase settings, Stripe products/prices, charges, refunds, subscriptions, tax, or customer data
- reopening public website/shop surfaces hidden by Sprint 012F
- adding persistent public interest/sign-up storage
- adding mobile capture UI, results UI, upload UI, storage policies, OCR, voice-to-text provider integration, trend charts, public website work, or Sprint 018+ behavior
- inventing lookup/formula behavior not supplied by the user
- inventing Green/Amber/Red thresholds
- inventing Table of Knowledge recommendation advice

---

## Active Sprint

None.

---

## Approved Sprint Schedule

Sprints 001-017 are complete locally. The public under-construction gate remains active until the user explicitly approves reopening public website/shop surfaces.

---

## Next Actions

1. Architect/User decides whether Sprint 018 should resume trends/history or shift to mobile capture/results UI.
2. Product/domain owner supplies production Green/Amber/Red thresholds before production classification use.
3. Product/domain owner supplies approved Table of Knowledge recommendation content before trainer-facing recommendation output.
4. Operator/User separately decides when to apply the Sprint 013 Supabase migration remotely through an approved, safe path.
5. Keep the public under-construction gate active unless a future approved sprint explicitly reopens public surfaces.

---

## Blockers

Sprint 017 closed without sprint blockers.

Remaining manual/future actions outside Sprint 017:

- Sprint 013 remote Supabase migration has not been applied.
- Biochemistry lookup rows and scoring assumptions should receive domain review before remote production use.
- Production Green/Amber/Red thresholds remain unsupplied.
- Production Table of Knowledge recommendation content remains unsupplied.
- Shop-written pricing is documented, but older seed/product evidence conflicts and should be confirmed before commerce changes.
- Remaining live acceptance blockers are unchanged: Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay still require safe operator access and fixtures.
