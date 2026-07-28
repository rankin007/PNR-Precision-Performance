# Project State

## Current Status

Sprint `023C-privacy-storage-and-lifecycle-decision-approval` is closed `decision-contract-approved-clean` in isolated worktree `C:\tmp\pnr-023c-privacy-storage-lifecycle` on branch `codex/023C-privacy-storage-and-lifecycle-decision-approval`, based on clean product baseline `a7759f691f0e01482f3a396acd14b2a23dbca5ec`. Phillip Norman Rankin, Director of Aprec8 Pty Ltd and authorised to approve privacy and data-handling decisions, approved the consolidated twenty-answer contract effective 28 July 2026. The monitored incident address and full supersession of earlier standalone `Accept` annotations are recorded. Markdown and Word records agree and pass structural checks; LibreOffice was absent, so PNG visual QA and rendered page count are not claimed. No product, schema, Storage, provider, remote, deployment, commit, or source-worktree mutation occurred.

Sprint `023B-source-reconciliation-and-clean-product-baseline` is closed `clean-product-baseline-established` in isolated worktree `C:\tmp\pnr-023b-source-reconciliation` on branch `codex/023B-source-reconciliation-and-clean-product-baseline`, based on accepted Sprint 029M tip `ad9d419bc40f0be2e13aa297535d3d8e5e151625`. The user approved the validated local reconciliation commit on 2026-07-28. Accepted Sprint 021AH migrations/auth application source and Sprint 022/022B workflow source, tests, documents, and evidence are reconciled locally. Focused tests, JSON, domain, roles, Supabase self-tests, TypeScript, lint, production build, and diff checks pass. Static/CI/local suites stop only at the inherited migration 0009 Windows byte-hash mismatch; migration 0009 was not edited. No dependency, upload/Storage behaviour, public route, deployment, remote mutation, or original `develop` worktree mutation occurred. Builder reports the resulting local clean baseline SHA at handoff because a commit cannot contain its own final SHA.

Sprint `029M-public-website-content-enquiry-and-pricing-follow-up` is closed `public-website-follow-up-partial-safe`. Final visual/content sign-off passed; scoped commit `387707afa58d1d77cfb6cea97e4caacf9141203b` was pushed only to the 029M branch and deployed through intended Vercel project `pnr-precision-performance` as `dpl_6F1TMjNRECmTCyMbyWXA6ohG8Q2R`. Apex, `www`, and `pnr-precision-performance.vercel.app` map to the deployment and passed content, asset, Pricing, visibly non-submitting enquiry, redirect, checkout-unavailable, protected-route, robots, and rendered mobile/desktop smoke. Enquiry transmission/storage/email, Information/Electrolytes publication, the undefined twelve-month term, and testimonial/video publication remain deferred. Sprint 023 and the original dirty `develop` worktree were not touched.

Sprint `029L-scoped-release-branch-and-remote-backup` is closed as `scoped-release-branch-backed-up`. The Sprint 029 root marketing-preview page is live at `https://precisionperformance.com.au`, and the release lineage through Sprint 029K is backed up on remote branch `codex/029-marketing-preview-release` at SHA `7e21c9767f3d53e0f2b8ddf126e22b7352c6def4`.

Sprint 029F deployed the browser-proof marketing-preview release. Sprint 029G reconciled the production alias after a reported discrepancy. Sprint 029H added stronger external-public verification. Sprint 029I reconciled source, clean-worktree build, Vercel alias/deployment, DNS/header, and live public content evidence. Sprint 029J then reproduced a rendered visual mismatch: the live page had the Sprint 029 text but the hero image asset returned 404/invalid optimized image, making the public page render as a pale broken-image layout. Sprint 029J redeployed the intended `pnr-precision-performance` Vercel project to deployment `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`; apex, `www`, and the Vercel app alias map to that deployment; hero image endpoints return 200; Edge DevTools screenshots prove local/apex/`www` rendered parity at desktop/tablet/mobile widths; and public route-safety smoke passes. Sprint 029K removed the accidental temporary Vercel project `pnr-029j-release-worktree-20260724210200` after confirming it was separate from the intended project and had no production custom-domain aliases, then reverified production alias mapping, public markers, hero asset, and route safety. Sprint 029L pushed the scoped release branch `codex/029-marketing-preview-release` to remote SHA `7e21c9767f3d53e0f2b8ddf126e22b7352c6def4` and confirmed light production verification still passes. No DNS change, intended Vercel setting/environment mutation, Supabase mutation, Stripe mutation, auth/RLS mutation, production data mutation, deployment, or runtime source change occurred in 029L. Unresolved active Sprint 021AA dirty-tree state remains outside the 029L scope.

Prior authenticated branch status remains: Sprint `021Z-onedrive-runtime-file-and-complete-browser-proof` is closed **browser-bootstrap-agreement-failed-clean**. OneDrive-aware runtime validation, protected selected-alias equality, one clean production build, client-secret exclusion, runtime readiness, and local safety gates passed. The bounded rendered bootstrap run timed out after one owned actor; exact Auth-last recovery restored Auth/application/Storage zero. The main browser matrix did not begin.

Active reconciliation branch: `codex/023B-source-reconciliation-and-clean-product-baseline`; original dirty `develop` remains at `b8961b9647507af87e6887cf78c1d6e262f944b6` and unchanged. The existing local repository baseline and Sprint 002B delivery-consolidation evidence remain recorded in `planning/reviews/002B-delivery-system-and-project-state-consolidation.md`.

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

Sprint 029/029B/029C/029D/029E/029F/029G/029H/029I/029J/029K/029L provides a marketing-preview front page release path, release-state cleanup, and scoped remote backup only. It does not establish full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, production readiness, or `develop` reconciliation.

Sprint 029 local production build passed before 029B. Sprint 029C restored JSON/static/typecheck validation through project-local Node script resolution. Sprint 029D restored lint and proved production build in a reparse-safe temp workspace. Sprint 029E reconfirmed validation/build/HTTP route smoke. Sprint 029F reconfirmed validation/build/HTTP route smoke, completed operator-assisted visual smoke, deployed to Vercel, and passed deployed smoke on `https://precisionperformance.com.au`. Sprint 029G reconfirmed the production alias content markers and route-safety smoke. Sprint 029H completed stronger external-public alias verification, DNS/header inspection, Vercel inspect, and final route smoke. Sprint 029I completed hard live-content reconciliation across source, build, Vercel, DNS/header, apex, `www`, Vercel app alias, and the exact reported old-content URL. Sprint 029J corrected rendered-live hero asset delivery and mobile wrapping, redeployed the intended production project, and proved rendered local/live parity with Edge DevTools screenshots. Sprint 029K cleaned the accidental temporary Vercel project and documented repository release-state boundaries. Sprint 029L backed up the 029 release lineage to a scoped remote branch without moving `develop`. None of this establishes complete browser application proof, approved score thresholds, production recommendation content, final commerce truth, upload/privacy design, production readiness, or SEO/indexing launch.

## Workflow And Boundaries

Profile: `standard` for ordinary repository, UI, documentation, tooling, tests, and product features. Strict controls apply to auth/RLS, secrets/protected evidence, migrations, production data, billing, destructive actions, external publication, and deployment.

No Builder may inspect protected local-only content, contact external systems, mutate remote/production state, deploy, push, or expand product/domain behavior without a sprint that expressly includes that work.

## Immediate Next Work

Immediate Sprint 029 follow-up: preserve the marketing-preview deployment boundary and use `codex/029-marketing-preview-release` as the scoped release backup/review branch. Reconcile local `develop`, remote `develop`, and active 021-series dirty work separately before any broad merge or `develop` push. If an operator or reviewer still sees old public content or a broken visual, first hard-refresh/private-window test the exact live URL and compare against the Sprint 029J Edge DevTools screenshot evidence and Sprint 029K/029L public smoke.

Next product work: **023D - Test Evidence Uploads And Storage Architecture/Design**, subject to its own Architect Pack. It must design from the approved 023C contract without silently selecting a controlled-CSV format, scanner/provider, processor, paid service, dependency, secret, retention-review cadence, or provider contractual conclusion.

Authenticated-proof branch: a separately planned later Sprint 021 suffix may diagnose the fixed 021Z protected bootstrap timeout. Do not resume or retry 021Z.

## Manual Interventions Required

1. Sprint 029F deployed the marketing-preview front page and passed deployed smoke. Do not generalize this into full public website completion, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.
2. Architect action: plan a bounded fixed-class diagnosis of the 021Z bootstrap timeout while preserving OneDrive-aware runtime acceptance and exact cleanup.
3. Domain authority for production thresholds, score terminology, pH/device rules, and Table of Knowledge recommendations before production-facing scoring/advice.
4. Business authority for final catalogue, pricing, GST, kit/support terms, and public reopening.
5. Sprint 023C resolves the upload privacy/storage/lifecycle business contract. Legal/privacy review, controlled-CSV registration, scanner/provider selection, provider contractual suitability, and operational retention-review cadence remain pre-production inputs; voice transcription and identifiable public photography remain separately unresolved.
6. Explicit authorization for any remote migration, deployment, push/PR, production mutation, or public reopening.

## Authority

- Navigation: `planning/EVIDENCE_INDEX.md`
- Roadmap: `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- Schedule: `planning/SPRINT_SCHEDULE.md`
- Design/messaging: `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- Historical state through 017F: `planning/history/`
