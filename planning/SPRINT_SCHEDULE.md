# Approved Sprint Schedule To Done

Approved on: 2026-07-11

Realigned on: 2026-07-14 by Sprint 011.

## Definition Of Done

The earlier schedule defined Done as a live, tested, documented, handoff-ready MVP. Sprints 003-010 moved the project to a deployed MVP shell with partial live acceptance.

Sprint 011 realigns Done to the attached `Precision Performance Done.docx` and the distilled canonical version in `planning/DEFINITION_OF_DONE.md`.

Precision Performance is Done when the trainer-facing biochemistry portal is production-ready: trainers can submit horse tests from mobile in under 60 seconds, attach voice notes and uploads, receive Hydration Score and Health Score outputs, see Green/Amber/Red zone status, receive approved Table of Knowledge recommendations, review trends and saved charts, and operate inside secure role-based access across trainer, owner, vet, stable staff, and admin roles.

The live production app remains valuable, but production live does not equal full Done until the trainer-ready portal criteria and the remaining live acceptance gates are satisfied.

## Completed Sprints

### Sprint 001 - Truth And Readiness

Outcome: completed as a truth and readiness audit.

### Sprint 002 - Build Readiness

Outcome: completed with validation pinned to project-local Node `22.14.0` for the known-good build path.

### Sprint 003 - Release Baseline And Environment Truth

Outcome: completed. Vercel established as the local evidence-backed deployment target, environment contract documented, unsafe Stripe secret-prefix diagnostics removed, and validation remained green through the bounded wrapper.

### Sprint 004 - Auth, RLS, And Portal Access

Outcome: completed. Auth redirects, callback handling, portal access guard, member context, and RLS role-read policies were hardened and documented.

### Sprint 005 - Portal And Data Entry Workflow

Outcome: completed. Core portal and operational record workflows were hardened with assigned-horse and operational write checks, plus documented live smoke blockers.

### Sprint 006 - Admin And Commerce Hardening

Outcome: completed. Admin membership/user hardening, read-only commerce visibility, active product checkout readiness, and webhook reconciliation hardening were documented.

### Sprint 007 - Production Launch Readiness

Outcome: completed as a launch-readiness no-go report until manual/user actions were completed.

### Sprint 008 - Launch Supabase Memberships And Env Readiness

Outcome: completed. Additive launch membership/permission seed migration, launch membership matrix, regenerated bootstrap SQL, and placeholder-only env guidance were created.

### Sprint 009 - Production Launch Deployment

Outcome: completed. Production deployment went live at `https://precisionperformance.com.au` on Vercel deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`; remaining live items were accepted as follow-up conditions.

### Sprint 010 - Live Acceptance Closeout

Outcome: completed as partial with documented blockers. Public/safety production smoke and anonymous protected-route redirects passed; Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remained blocked.

## Completed Follow-Up Sprints

### Sprint 011 - Done Normalization And Roadmap Realignment

Outcome: completed. The attached Done document was distilled into durable planning truth and the roadmap was realigned.

### Sprint 012 - Live Acceptance Closeout And Safety Hardening

Outcome: completed as partial with documented blockers. Malformed checkout POST parsing was hardened locally; Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain blocked.

### Sprint 012A - Fix Deploy And Verify

Outcome: blocked before deployment because a clean `HEAD + checkout fix` deployment would omit current production behavior such as `/admin/commerce`.

### Sprint 012B - Production Source Provenance

Outcome: completed. Current production source provenance could not be recovered as a clean committed snapshot; the current dirty workspace was the closest local route-shape match.

### Sprint 012C - Production Baseline Reconstruction

Outcome: completed. A no-deploy production-equivalent candidate was created at `C:\tmp\pp-012c-baseline-lean-20260714-173135`, with route parity, `/admin/commerce`, and checkout malformed POST handling preserved.

### Sprint 012D - Baseline Commit And Deployment Approval

Outcome: completed. The Sprint 012C candidate was converted into branch `codex/012d-production-baseline` at commit `358e1fc`, validation passed, and deployment approval notes were prepared. No deployment, push, or PR was performed.

## Recently Completed Sprints

### Sprint 012E - Repository Cleanup And Archive Baseline

Outcome: completed. Low-risk non-runtime clutter was archived with a manifest; ambiguous/runtime-adjacent candidates were deferred; lint, TypeScript, and the known-good outside-sandbox build path passed.

### Sprint 012F - Public Under Construction Gate

Outcome: completed and production-deployed. The public home page now renders the supplied Thoroughbred image under-construction holding page with `noindex/nofollow`; `/home`, `/contact`, `/shop`, and `/shop/[slug]` redirect to `/`; public checkout initiation redirects to the holding page before Supabase or Stripe work; production smoke passed.

### Sprint 013 - Biochemistry Test Data Model

Outcome: completed locally. Builder preserved the supplied Reading Tables CSV, created local migration `0009_biochemistry_test_data_model.sql`, added biochemistry domain types/helpers, regenerated Supabase bootstrap SQL, documented exact lookup/formula/access/upload behavior, documented service pricing evidence, and validated lint, TypeScript, build, and db bundle. Remote Supabase migration, production mutation, deployment, push, PR, Stripe changes, and public shop reopening were not performed.

### Sprint 014 - Biochemistry Scoring Service And Fixtures

Outcome: completed locally. Builder implemented exact lookup scoring, pH Average, raw conductivity-to-C conversion, Hydration Score, Health Score, blocked/unscored state handling, source-backed scoring fixtures, local fixture validation, and scoring documentation. No UI, remote Supabase migration, production mutation, deployment, push, PR, Stripe changes, recommendation content, or public shop reopening was performed.

### Sprint 015 - Scoring And Recommendation Engine

Outcome: completed locally. Builder implemented supplied-threshold zone classification contracts, recommendation rule/snapshot structures, blocked/unavailable behavior for missing thresholds/content, fixture-backed validation, and recommendation documentation. No UI, remote Supabase migration, production mutation, deployment, push, PR, Stripe changes, production thresholds, production recommendation content, or public shop reopening was performed.

### Sprint 016 - Repository Alignment And Done-State Baseline

Outcome: completed locally. Builder created a working-tree inventory, repository alignment documentation, and planning closeout; classified dirty-tree items; identified manual-review items; and recommended a separate baseline commit approval step. No delete, revert, archive move, commit, push, PR, deploy, remote migration, production mutation, or feature work was performed.

### Sprint 017 - Baseline Commit Approval

Outcome: completed locally. Builder removed .env.vercel.production from Git tracking while preserving the local file, verified root ORCHESTRATOR* archive evidence before accepting deletions, validated the page/API under-construction gate before accepting deleted middleware.ts, excluded .release-main/, .claude/, and samples/, reran full validation, and created the authorized local baseline commit. No push, PR, deployment, remote migration, production mutation, Stripe change, public reopening, or feature work was performed.

## Current Sprint

None.

The next sprint should be selected from the product roadmap after the local baseline.

## Recommended Forward Roadmap

### Sprint 018 - Next Feature Sprint`r`n`r`nRecommended options: resume trends/history or shift to mobile capture/results UI, depending on user priority.

## Authorization Note

This schedule approves the sequence and release target. It does not authorize implementation by itself. Each sprint still needs an approved Architect Pack or sprint file, and `planning/STATE.md` must say `Implementation authorized: yes` before Builder edits production source files.
