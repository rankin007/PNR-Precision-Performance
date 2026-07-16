# Project Deep Dive Review - 2026-07-16

## Role And Review Basis

Role: Architect.

This review responds to the request to critique the current Precision Performance project, identify what is still missing, and recommend a larger sprint sequence to finish the product as quickly, effectively, and efficiently as possible.

Sources inspected:

- current planning state, definition of Done, sprint schedule, risks, questions, and Architect briefing
- active Sprint 013 sprint files
- active app route/source inventory
- active Supabase migrations and auth/RLS patterns
- current under-construction gate documentation
- `.release-main/` legacy website/app source, including previous public pages, shop content, trainer horse workspace, biochemistry capture, gallery storage, E-Trakka parser/import work, and legacy migrations

No production code was changed by this review.

## Executive Assessment

Precision Performance has a real foundation, but it is not yet a finished product.

The project currently has:

- a deployed Vercel production app at `https://precisionperformance.com.au`
- a reversible public under-construction gate hiding unfinished public/shop routes
- Next.js app foundations for public, portal, operations, admin, checkout, auth, and Stripe webhook surfaces
- Supabase schema/RLS foundations for users, memberships, horses, assignments, operational logs, commerce, and launch memberships
- hardened auth, role, and portal guards compared with the original project state
- an approved Sprint 013 data-model sprint for the biochemistry product core
- a strong planning layer and Definition of Done

The core gap is that the visible product is still mostly a hardened shell and infrastructure foundation. The actual trainer-ready value proposition is still ahead: biochemistry test capture, exact lookup/scoring, uploads, notes, recommendations, trends, access-tested live workflows, and the public website/shop relaunch.

The best path is not to restart and not to reuse the old website wholesale. The best path is to keep the hardened current architecture, selectively harvest previous-site wording, color scheme, graphics, and applicable images for continuity, and rebuild the missing product modules in the new structure.

## Current Project Status

### Completed Or Strong Foundations

- Planning and delivery process are now stable under the 120x Architect/Builder method.
- Build validation has a known-good local Node path with Node `22.14.0`.
- Vercel is the local evidence-backed deployment target and production has been deployed.
- Public routes are hidden while the product is incomplete.
- Auth redirects, callback safety, portal access guards, and membership context are improved.
- Admin membership/user workflows exist.
- Read-only admin commerce visibility exists.
- Stripe checkout and webhook scaffolding exist and have been hardened, but not fully live-accepted.
- Portal and operational data-entry pages exist for horses, daily records, feeding, track sessions, submissions, and corrections.
- Launch membership levels and permissions are seeded locally.
- Sprint 013 is scoped to create the durable biochemistry data foundation using exact lookup/scoring rules.

### Not Yet Complete

- Remote Supabase migrations/checks remain blocked.
- Authenticated role/RLS smoke with real launch users and horse fixtures remains blocked.
- Stripe test checkout, signed webhook replay, and duplicate replay verification remain blocked.
- The biochemistry schema is not yet implemented in the active app.
- The mobile trainer capture workflow is not yet implemented in the active app.
- Test uploads and Supabase Storage policy are not yet implemented in the active app.
- Voice-to-text is not selected or implemented.
- Table of Knowledge recommendation content is not supplied or implemented.
- Trend charts, saved chart preferences, AM/PM filters, and zone history are not implemented in the active app.
- Public website/shop relaunch is intentionally blocked by the under-construction gate.
- Pricing, catalogue, onboarding, support, and legal/disclaimer presentation need final product treatment before public launch.

## Critical Missing Work

### 1. Biochemistry Product Core

Sprint 013 is the correct next product sprint. The active app needs a source-controlled schema for:

- horse/date test records
- exact reading-to-loss lookup tables for Carbs, pH Average, Salts, and Urea
- raw conductivity and converted `C` value using `raw * 1.43`
- score snapshots
- upload metadata
- notes
- audit and soft delete
- trainer/stable/horse-scoped access

Important critique: the legacy `.release-main` biochemistry model is helpful but too loose. It stores broad fields like `health_score`, `hydration_score`, `salts_ms`, `salts_c`, `urine_ph`, `saliva_ph`, and `urea_level`, but it does not preserve exact lookup loss snapshots, formula versions, blocked/unscored states, or the stricter soft-delete/audit model now required.

### 2. Data Capture UX

The current active operations routes are functional scaffolding, not the final under-60-second trainer workflow. The legacy `.release-main` `NewTestModal` is valuable as UX reference because it already contains:

- mobile modal shape
- live local datetime default
- horse reference metrics
- numeric reading fields
- trainer notes
- quick submit behavior

But it should be refactored against the Sprint 013 model. It currently accepts older fields and lacks exact lookup/scoring state, upload handling, confirmation rules, zone display, and strict access/error states.

### 3. Uploads And Storage

The Done target requires photos/PDFs/CSV attached to test records. Legacy `.release-main` has horse gallery storage work, but it was image-gallery oriented:

- bucket: `horse-gallery`
- public bucket setting
- 8 MB limit
- image-only allowed MIME types
- delete policies using manage-record access

This should not be reused as-is. The new product needs a private or tightly signed test-evidence bucket with:

- 2 MB per file
- PDF, CSV, PNG, JPG/JPEG/photo support
- object paths scoped by horse/test
- RLS/storage policy matching horse/test access
- soft-delete metadata and audit
- no normal staff delete path

### 4. Recommendation And Scoring Product Logic

The formulas are now supplied for Sprint 013, but production recommendations are still missing. The project still needs:

- zone thresholds for Green/Amber/Red if not derivable from approved score ranges
- Table of Knowledge categories and Level 1-5 content
- disclaimer/review requirements
- snapshot behavior so historical recommendations do not silently change
- admin editing workflow for future content updates

No Builder should invent recommendation content.

### 5. Trends And History

Legacy `.release-main` contains a simple chart component and horse workspace trend panels. These are good reference material. They are not sufficient for Done because the target requires:

- individual and combined metric charts
- Hydration Score and Health Score trends
- Carbs, Salts/Conductivity, pH Urine, pH Saliva, Urea, and possibly Turbidity where finalized
- AM only, PM only, and both filters
- saved favorite/default chart configurations
- zone-highlighted history panel
- Red-only and Amber+Red attention filters

### 6. Live Acceptance

The project cannot be considered finished until the recurring live blockers are closed:

- remote Supabase migration/check path
- real role fixtures and authenticated smoke
- RLS verification for trainer, owner, vet, staff, admin, inactive/non-member, and anonymous users
- Stripe test checkout and webhook replay if shop/commerce remains in launch scope

This is not just ceremony. These are the checks that prove no cross-stable visibility, no broken checkout, and no false confidence in production.

## Legacy Website / `.release-main` Continuity Review

### Harvest For Continuity

Use old website/app material only as continuity reference for wording, colors, graphics, and applicable images. Do not transplant the old site wholesale. Useful continuity sources include:

- public homepage wording and section intent from `.release-main/app/page.tsx`
- color and composition cues from `Hero`, `PublicCtaStrip`, `WorkflowStrip`, and `ShowcaseStrip`
- shop-written pricing and service copy from `.release-main/app/shop/page.tsx`
- public assets such as `phone-app.jpg`, `member-experience.png`, `price list for web.jpg`, videos, disclaimer/NDA PDFs, and Thoroughbred imagery
- public requirements notes under `.release-main/content/requirements/`
- trainer horse workspace wording and workflow cues
- `NewTestModal` wording, field-order clues, and mobile capture intent
- simple chart display wording and visual cues
- E-Trakka parser/import ideas if E-Trakka remains in scope

### Inspect Carefully Before Rebuilding

These old pieces may contain useful language, colors, graphics, or workflow clues, but should not be copied straight in:

- `.release-main/app/(ops)/data-entry/horses/**`
- `.release-main/lib/domain/trainer-horses.ts`
- `.release-main/components/ops/**`
- `.release-main/lib/etrakka/parser.ts`
- `.release-main/lib/actions/etrakka.ts`
- `.release-main/supabase/migrations/0010_*` through `0016_*`

Reasons:

- they predate the final exact lookup/scoring model
- some delete/storage behavior conflicts with the new soft-delete/audit preference
- storage was gallery-first, not test-evidence-first
- old biochemistry fields do not preserve score/lookup auditability
- some old route work may bypass newer auth/RLS hardening unless adapted

### Do Not Use As Authority

Do not treat these as final authority:

- old product seed pricing
- old Professional Kit price values
- Kit Buyback unless the business explicitly confirms it remains in the catalogue
- old loose `horse_biochemistry_results` score fields as the final model
- public bucket behavior for sensitive test uploads
- old public/shop pages until Sprint 012F gate reopening is explicitly approved

## Architecture Critique

### What Is Good

- The app is already on a practical stack: Next.js, Supabase, Stripe, Vercel.
- The planning discipline is now strong enough to prevent accidental product drift.
- RLS helper functions such as `can_access_horse` and `can_manage_horse_records` give the new biochemistry module a good starting point.
- The under-construction gate was the right move; it protects the brand while product work continues.
- Stripe and commerce are isolated enough to keep public checkout blocked while portal work continues.

### What Needs Tightening

- The active repo still has a very dirty worktree and `.release-main` remains a parallel source of truth risk.
- Planning docs contain some stale historical wording in `DOMAIN.md` and `RISKS.md`; the briefing is current, but older sections can confuse future agents.
- Existing portal/data-entry flows are useful but not yet optimized around the biochemistry workflow.
- Live acceptance is still blocked by access/fixture gaps.
- There is no production-safe recommendation content pipeline yet.
- There is no final public relaunch architecture that blends old content, new offer, legal/disclaimer, pricing, and secure portal CTA.

## Recommended Sprint List To Finish

This list expands the existing roadmap. It assumes strict workflow for data, auth, storage, scoring, payments, and production deployment.

### Sprint 013 - Biochemistry Test Data Model

Status: current approved sprint.

Goal: implement local schema, exact lookup tables, score snapshots, uploads metadata, notes, access boundaries, soft-delete/audit, and pricing docs.

Must finish before UI work continues.

### Sprint 014 - Biochemistry Scoring Service And Fixtures

Goal: create server-side scoring and lookup logic against the Sprint 013 schema without building the full UI.

Scope:

- exact lookup function/module
- missing exact-match handling
- formula versioning
- score calculation tests/fixtures
- zone threshold decision capture
- fixture tests using supplied Reading Tables
- no production migration yet unless separately authorized

Why now: this reduces risk before the mobile UI depends on score behavior.

### Sprint 015 - Trainer Mobile Test Capture MVP

Goal: build the under-60-second horse test capture workflow.

Scope:

- assigned horse selector/workspace entry
- mobile-first test form
- Carbs, pH Saliva, pH Urine, raw conductivity, Urea inputs
- converted C display
- pH Average display
- submit/confirm flow
- score result display
- blocked/unscored state for missing lookup
- fast phone-width validation

Reuse: adapt legacy `NewTestModal` layout and horse workspace ideas, but wire to new data model and scoring service.

### Sprint 016 - Test Uploads, Notes, And Evidence Storage

Goal: attach approved evidence files and notes to test records.

Scope:

- Supabase Storage bucket/policies for test evidence
- PDF/CSV/PNG/JPG/JPEG/photo support
- 2 MB limit
- horse/test object path convention
- server action or signed-upload flow
- note creation/edit flow
- soft-delete/audit behavior
- staff add but no staff delete

Reuse: harvest ideas from legacy gallery upload UI, not its public bucket settings.

### Sprint 017 - Role Fixtures And RLS Verification

Goal: prove access boundaries before richer UI and recommendations.

Scope:

- trainer, owner, vet, stable staff, admin, inactive/non-member fixtures
- assigned-horse and wrong-horse cases
- read/write/delete matrix
- direct RLS checks
- authenticated browser smoke
- manual intervention instructions for any remote access gaps

Why now: this is the guardrail sprint. Do not wait until the end.

### Sprint 018 - Table Of Knowledge Content Model And Admin Editor

Goal: create the editable recommendation content foundation.

Scope:

- categories
- Level 1-5 comments
- publish/draft or active/inactive state
- admin-only management
- audit trail
- disclaimer/review flags
- placeholder prevention for production

Requires user/domain content. If content is not ready, build scaffold and keep launch blocked for recommendations.

### Sprint 019 - Recommendation Engine And Result Snapshots

Goal: generate trainer-facing recommendations from approved Table of Knowledge content.

Scope:

- zone/level mapping
- recommendation categories
- snapshot recommendations on test result
- historical stability
- no silent retroactive changes unless explicitly designed
- trainer-facing result page language
- disclaimer display if required

### Sprint 020 - Trends, History, And Saved Chart Defaults

Goal: make biochemistry history useful.

Scope:

- Health Score and Hydration Score trends
- individual metric trends
- combined chart mode
- AM/PM/both filters
- saved favorite/default chart settings
- zone-highlighted history panel
- Red and Amber+Red attention filters

Reuse: adapt legacy `SimpleMetricChart` ideas, but build the full Done target.

### Sprint 021 - Horse Workspace Relaunch

Goal: merge the strongest legacy trainer horse workspace ideas into the hardened current app.

Scope:

- horse profile card
- latest test summary
- latest operational context
- gallery/evidence preview where approved
- links to daily/feeding/track/history/test capture
- mobile-first layout pass
- permission-aware actions

Reuse: `.release-main/app/(ops)/data-entry/horses/[horseId]/page.tsx` as design reference only.

### Sprint 022 - Voice Notes Strategy And Implementation

Goal: satisfy the Done requirement for voice-to-text or an approved launch fallback.

Scope:

- decide provider or browser-native/manual fallback
- permission UX
- transcript review/edit before save
- confidence/error handling
- storage/audit
- fallback typed note path

If provider selection is not ready, ship manual voice-dictation-compatible text notes and document voice-to-text as blocked.

### Sprint 023 - E-Trakka And Operational Data Integration Decision

Goal: decide and, if approved, integrate E-Trakka import/history without distracting from biochemistry MVP.

Scope:

- confirm E-Trakka is MVP or later
- review legacy parser/actions/migrations
- preserve raw import rows if implemented
- validate CSV/HTML/XLS behavior
- connect to horse workspace and trends only after access checks

Reuse: legacy parser/import code has real value, but should be isolated behind tests.

### Sprint 024 - Public Website Rebuild From Legacy Content

Goal: prepare the public site for reopening while blending old website material into the new architecture.

Scope:

- homepage rebuilt from legacy sections and new product truth
- offer explanation
- trainer portal CTA
- service pages or sections
- member experience preview
- proof/overview content from approved docs/assets
- disclaimer/legal links
- no public checkout unless commerce is ready

Reuse strongly: `.release-main` public sections/assets/copy, but remove stale claims and pricing conflicts.

### Sprint 025 - Shop, Pricing, Catalogue, And Stripe Alignment

Goal: make commerce launch-ready or deliberately keep it disabled.

Scope:

- final catalogue decision
- Professional Kit `$4,500` plus Postage
- Monthly Service `$120 per horse or P.O.A`
- Kit Buyback decision
- Stripe product/price mapping
- checkout smoke
- signed webhook replay
- duplicate event replay
- admin commerce visibility check

Requires explicit approval before Stripe product/price changes.

### Sprint 026 - Production Supabase Migration And Data Seeding

Goal: apply approved migrations and launch fixtures safely.

Scope:

- remote migration plan
- backup/rollback notes
- apply Sprint 008 and biochemistry migrations
- seed lookup tables
- seed roles/fixtures
- non-secret verification
- no secrets in logs/docs

This is a high-risk stop-and-confirm sprint.

### Sprint 027 - Full Auth/RLS/Workflow Live Acceptance

Goal: close the long-running live acceptance blockers.

Scope:

- authenticated role matrix smoke
- portal/admin/data-entry/test capture smoke
- wrong-horse and wrong-role denials
- upload access checks
- owner/vet read-only checks
- staff limited write checks
- admin/trainer soft delete checks

### Sprint 028 - Mobile UX, Performance, And Field Trial Hardening

Goal: prove the trainer workflow is fast and usable.

Scope:

- under-60-second capture test
- phone-width interaction QA
- slow network/large upload behavior
- validation copy polish
- error/retry paths
- accessibility basics
- visual polish without broad redesign

### Sprint 029 - Public Relaunch Deployment

Goal: reopen the public website and, if approved, shop.

Scope:

- remove under-construction gate
- restore/rebuild public routes
- SEO metadata
- noindex removal
- production deployment
- public route smoke
- checkout smoke if enabled
- rollback plan

### Sprint 030 - Final Handoff, Monitoring, And Client Acceptance

Goal: close the project against Definition of Done.

Scope:

- final Done checklist
- validation evidence
- production route/API smoke
- live role/RLS evidence
- Stripe evidence if commerce live
- known limitations
- operator guide
- support/onboarding notes
- archived legacy-source decision

## Fastest Efficient Path

The shortest safe path is:

1. Finish Sprint 013.
2. Build scoring fixtures before UI.
3. Build mobile capture.
4. Add uploads/notes.
5. Verify RLS with real fixtures.
6. Add recommendations only after content is supplied.
7. Reuse legacy public/site/workspace pieces in dedicated relaunch sprints.
8. Reopen production only after live acceptance and public route smoke.

Trying to relaunch the old public site or old horse workspace wholesale before the biochemistry model/scoring/RLS are correct will feel faster for a few days and then cost more. Continuity should come from wording, color, graphics, and selected images, while structure and implementation stay new.

## Immediate Next Actions

Recommended immediate next action: complete Sprint 013 as written.

Recommended next Architect action after Sprint 013 closes:

- inspect the new schema and docs
- decide whether Sprint 014 should be scoring service/fixtures or whether data-model corrections are needed first
- convert the sprint list above into the next approved Architect Pack

## Open Decisions Needed From User / Operator

- Confirm zone thresholds or score-to-zone mapping for Green/Amber/Red.
- Provide Table of Knowledge comments by category and level.
- Decide whether voice-to-text must be provider-backed for launch or whether manual/browser dictation fallback is acceptable.
- Confirm whether E-Trakka is MVP launch scope or later.
- Confirm whether Kit Buyback remains part of the catalogue.
- Confirm final public pricing and whether checkout should reopen at public relaunch.
- Provide safe Supabase remote migration/check path.
- Provide real launch test users and horse fixtures.
- Provide Stripe test checkout/webhook replay path if commerce is enabled.
