# Project State

## Current Status

Sprint `029G-production-alias-reconciliation-and-public-smoke` is closed as marketing-preview deployed. The Sprint 029 root marketing-preview page is live at `https://precisionperformance.com.au`, and 029B corrected the suspect front-page width/layout classes in `app/page.tsx`.

Sprint 029F deployed the browser-proof marketing-preview release. Sprint 029G reconciled the production alias after a reported discrepancy: `https://precisionperformance.com.au/` returns Sprint 029 markers, Vercel inspect maps the alias to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`, and public route-safety smoke passes. No alias correction, DNS change, Vercel setting/environment mutation, Supabase mutation, Stripe mutation, or production data mutation occurred in 029G. Unresolved active Sprint 021AA dirty-tree state remains outside the 029G scope.

Prior authenticated branch status remains: Sprint `021Z-onedrive-runtime-file-and-complete-browser-proof` is closed **browser-bootstrap-agreement-failed-clean**. OneDrive-aware runtime validation, protected selected-alias equality, one clean production build, client-secret exclusion, runtime readiness, and local safety gates passed. The bounded rendered bootstrap run timed out after one owned actor; exact Auth-last recovery restored Auth/application/Storage zero. The main browser matrix did not begin.

Branch: `develop`. The existing local repository baseline and Sprint 002B delivery-consolidation evidence remain recorded in `planning/reviews/002B-delivery-system-and-project-state-consolidation.md`.

## Delivery And Validation State

- Canonical commands: `npm run validate:json`, `test:domain`, `test:roles`, `test:supabase-self`, `validate:static`, `typecheck`, `validate:ci`, and `validate:local`.
- CI uses Node 22.14.0, npm caching, read-only repository permissions, a bounded timeout, and the remote-safe `validate:ci` entry point.
- Current local evidence covers JSON, domain fixtures, role/comment tests, credential-free Supabase harness self-tests, static validators, lint, and TypeScript. Latest successful production-build evidence is from 021W; a later 021X closeout build hit the known generated-cache readlink class after its terminal bridge stop.
- Structural Supabase readiness remains distinct from authenticated/runtime/production readiness.
- The public under-construction gate remains in force; no public reopening or deployment occurred in 021N.

## Provider Blocker

Sprint 021M remains prior provider-escalation evidence. The operator-observed re-enablement of legacy JWT API keys was the material change for 021O, but 021O does not establish when they were disabled or that this caused the earlier failures. The candidate minimal Auth gate now has two-pass authenticated evidence for the selected aliases.

The bounded direct RLS matrix passed in 021P, comment result agreement was corrected in 021R, and shared initial-admin eligibility was corrected locally in 021T. Direct authenticated atomic first-claim concurrency passed in 021V. Sprint 021W then stopped cleanly at its protected callback bridge gate without callback mutation. Sprint 021X avoided callback mutation and closed `protected-session-cookie-bridge-unavailable-clean` because the production-built application had no governed server-secret source. Complete browser application-route/comment/revocation agreement remains unproven.

## Product Readiness

Sprint 029/029B/029C/029D/029E/029F/029G provides a marketing-preview front page release path only. It does not establish full public website completion, product Done, commerce readiness, authenticated readiness, final launch readiness, or production readiness.

Sprint 029 local production build passed before 029B. Sprint 029C restored JSON/static/typecheck validation through project-local Node script resolution. Sprint 029D restored lint and proved production build in a reparse-safe temp workspace. Sprint 029E reconfirmed validation/build/HTTP route smoke. Sprint 029F reconfirmed validation/build/HTTP route smoke, completed operator-assisted visual smoke, deployed to Vercel, and passed deployed smoke on `https://precisionperformance.com.au`. Sprint 029G reconfirmed the production alias content markers and route-safety smoke. None of this establishes complete browser application proof, approved score thresholds, production recommendation content, final commerce truth, upload/privacy design, production readiness, or SEO/indexing launch.

## Workflow And Boundaries

Profile: `standard` for ordinary repository, UI, documentation, tooling, tests, and product features. Strict controls apply to auth/RLS, secrets/protected evidence, migrations, production data, billing, destructive actions, external publication, and deployment.

No Builder may inspect protected local-only content, contact external systems, mutate remote/production state, deploy, push, or expand product/domain behavior without a sprint that expressly includes that work.

## Immediate Next Work

Immediate Sprint 029 follow-up: preserve the marketing-preview deployment boundary and plan any broader public website, commerce, authenticated, SEO/indexing, or production-readiness work separately.

Next product sprint: **022 — Mobile Biochemistry Workflow Completion**. It may proceed locally within existing schema and typed-note boundaries without waiting for the provider.

Authenticated-proof branch: a separately planned later Sprint 021 suffix may diagnose the fixed 021Z protected bootstrap timeout. Do not resume or retry 021Z.

## Manual Interventions Required

1. Sprint 029F deployed the marketing-preview front page and passed deployed smoke. Do not generalize this into full public website completion, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.
2. Architect action: plan a bounded fixed-class diagnosis of the 021Z bootstrap timeout while preserving OneDrive-aware runtime acceptance and exact cleanup.
3. Domain authority for production thresholds, score terminology, pH/device rules, and Table of Knowledge recommendations before production-facing scoring/advice.
4. Business authority for final catalogue, pricing, GST, kit/support terms, and public reopening.
5. Privacy/provider decisions for uploads, retention, access, voice transcription, and identifiable photography before those capabilities are built or published.
6. Explicit authorization for any remote migration, deployment, push/PR, production mutation, or public reopening.

## Authority

- Navigation: `planning/EVIDENCE_INDEX.md`
- Roadmap: `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- Schedule: `planning/SPRINT_SCHEDULE.md`
- Design/messaging: `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- Historical state through 017F: `planning/history/`
