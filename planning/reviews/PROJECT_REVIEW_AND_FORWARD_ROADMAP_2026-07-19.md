# Project Review And Forward Roadmap

**Date:** 2026-07-19
**Role:** Architect
**Workflow:** strict
**Implementation authorization:** no

## Review Basis

This review compares the active project against:

- `planning/DEFINITION_OF_DONE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- completed Sprints 001-018
- the active Next.js, Supabase, Stripe, portal, operations, and public-route implementation
- outstanding live-acceptance, domain-content, privacy, commerce, and deployment gates

This review changes planning truth only. It does not authorize or implement application, schema, auth/RLS, provider, Stripe, migration, deployment, public reopening, push, or PR work.

## Executive Critique

Precision Performance should continue from the current architecture, not restart. The project has credible foundations: protected route groups, permission-aware access helpers, operational workflows, a source-controlled biochemistry schema, exact scoring, blocked states, recommendation contracts, and a reversible public gate.

The project is nevertheless not yet trainer-ready or brand-ready. Its implementation is split across three maturity levels:

1. **Strong local foundations:** schema, scoring, server-side guards, operational record flows, and safe blocked states.
2. **Early product UI:** mobile biochemistry capture and result review exist, but remain a functional first pass rather than the accepted field workflow.
3. **Unproven live product:** the remote biochemistry schema, real role/RLS matrix, authenticated fixtures, production thresholds, approved recommendation content, uploads, voice, trends, and public relaunch remain incomplete or unverified.

The accepted design profile adds useful discipline rather than requiring a new architecture. Its biggest consequence is sequencing: establish the shared design/terminology system before building more UI, prove live data and access boundaries before richer outputs, and keep public relaunch last.

## What Should Be Preserved

- Next.js App Router route groups for public, portal, operations, and admin surfaces.
- Supabase as the data/auth/RLS/storage platform unless a provider-specific sprint proves otherwise.
- Server-side permission checks plus database RLS as layered access control.
- Exact biochemistry lookup behavior and explicit blocked/unscored states.
- Versioned score, threshold, and recommendation snapshots.
- The page/API under-construction gate until a dedicated relaunch sprint.
- Stripe isolation and disabled public checkout until commercial truth and live replay are approved.
- The strict Architect/Builder authorization model.

## Current Strengths

### Architecture and safety

- Public, portal, operations, admin, checkout, auth callback, health, setup, and webhook surfaces are separated cleanly.
- `requirePortalAppContext`, `requireOperationalWriteAppContext`, and `requireAdminAppContext` provide clear application-level gates.
- Biochemistry calculations live in a domain service instead of UI code.
- Missing exact lookups, thresholds, and recommendation content produce blocked or unavailable states instead of guesses.
- The public site and checkout are reversibly hidden without exposing protected routes.

### Product foundations

- Assigned-horse and operational record workflows already exist.
- Mobile biochemistry entry and result routes now connect the data model to UI.
- The data model preserves raw, derived, scored, blocked, upload, note, audit, and soft-delete concepts.
- The recommendation engine can consume supplied thresholds and active rules without inventing content.

### Delivery discipline

- The repository has a validated local baseline commit.
- Risk, decision, question, state, briefing, and sprint artifacts are maintained.
- Secrets, production mutation, remote migration, deployment, billing, and public reopening remain explicit gates.

## Current Weaknesses And Misalignment

### 1. Visual system predates the accepted profile

The active tokens use dark ink, sand, steel, and ember with Segoe UI/Georgia. The accepted direction uses racing green, midnight navy, warm bone, data blue, heritage gold, slate, and functional status colours with an editorial serif and application sans.

This is not an architecture problem, but continuing feature UI before establishing the token/component baseline would create avoidable rework.

### 2. Brand and public language are inconsistent

The holding page and site configuration still use **PNR Precision Performance**. Dormant marketing components describe a generic platform foundation, mention Railway, and contain internal delivery language such as orchestrated agents. That content is unsuitable for public relaunch and conflicts with the accepted brand hierarchy and decision-support positioning.

The gate currently protects visitors from this stale content, so there is no need for an emergency public rewrite.

### 3. Portal remains a shell

The portal home literally presents itself as a shell, reports are a placeholder, and horse detail provides only basic identity, recent metrics, and timeline blocks. It does not yet answer the accepted dashboard questions: which horses need attention, what changed, what is incomplete, and what action comes next.

### 4. Mobile capture is functional but incomplete

The current form captures horse, date, time, Carbs, pH saliva, pH urine, conductivity, Urea, and typed notes. It does not yet include the approved evidence/voice flow, an optimized step sequence, field-trial timing proof, or a persistently accessible primary action. Additional Done inputs must be reconciled against the exact Sprint 013 model before they are added.

### 5. Result presentation is pre-design-profile

Results still expose `Health Score`, use the old component palette, and do not yet provide approved status icons, complete numerical/context treatment, or production zones. The safe unavailable states are correct and should remain.

A display-only terminology decision should precede any internal field rename.

### 6. Live data truth is behind local code

Migration `0009_biochemistry_test_data_model.sql` exists locally, but the remote Supabase biochemistry schema and lookup data are not applied or verified. Until that is closed, the primary product workflow remains a structural/local capability rather than a proven live workflow.

### 7. Role truth is incomplete

The app has permission codes and launch membership levels, but the expanded Trainer, Stable Manager, Stable Staff, Owner, Veterinarian, Consultant, and Administrator matrix is not definitive. Real authenticated role/RLS fixtures and wrong-horse/cross-stable tests remain outstanding.

### 8. Recommendations cannot safely launch

The engine scaffold is technically ready to consume approved inputs. Production thresholds, intended public score terminology, Table of Knowledge content, evidence classification, and disclaimer/review policy are not approved. UI must not make the empty scaffold look authoritative.

### 9. Upload and voice architecture remains intentionally unresolved

Photo/PDF evidence and voice transcription require privacy, provider, retention, permissions, error, deletion, audit, and storage-RLS decisions. These belong in dedicated sprints, not inside a general UX pass.

### 10. Commerce and public relaunch are still later-stage work

Pricing evidence conflicts, Kit Buyback remains unresolved, Stripe live acceptance is incomplete, and the accepted public messaging requires a substantial content rebuild. Public reopening before product and claims acceptance would recreate the risk the holding gate was designed to prevent.

## Sequencing Principles

1. Establish shared design tokens, terminology rules, and component semantics before adding substantial UI.
2. Apply and verify the remote biochemistry foundation before relying on live capture/history.
3. Prove role/RLS boundaries before uploads, recommendations, and broader stakeholder access.
4. Complete capture and evidence workflows before trends and stable-level dashboards.
5. Approve thresholds and Table of Knowledge content before trainer-facing classified outputs.
6. Build public marketing behind the existing gate and reopen only after end-to-end acceptance.
7. Keep commerce optional until the business confirms a single commercial schedule.

## Updated Sprint List

### Sprint 019 - Design System And Product Language Baseline

**Goal:** align shared UI foundations with the accepted design authority before more interface expansion.

**Scope:** brand hierarchy, metadata naming, colour/type tokens, public-versus-portal component roles, accessible status pattern, display-only score terminology decision point, shared form/card/button states, and removal of stale internal-platform language from reusable components where safe.

**Boundary:** no public reopening, CMS, domain rename, new feature behavior, schema, auth/RLS, provider, or deployment.

**Exit:** future UI can use one documented, tested design system without duplicating style decisions.

### Sprint 020 - Remote Biochemistry Migration And Live Data Readiness

**Goal:** apply the approved biochemistry schema/lookup foundation through a safe operator path and prove non-destructive live readiness.

**Scope:** migration plan, backup/rollback notes, apply migration `0009`, verify table/function/policy presence, verify lookup counts/source metadata, and smoke scored/blocked persistence with safe fixtures.

**Manual intervention:** required for safe Supabase operator access and test fixtures.

**Boundary:** no production recommendation content, public reopening, Stripe, or unrelated schema changes.

### Sprint 021 - Definitive Role Matrix And Authenticated RLS Proof

**Goal:** resolve and prove the access model before sensitive evidence and stakeholder workflows expand.

**Scope:** definitive Trainer/Stable Manager/Stable Staff/Owner/Veterinarian/Consultant/Administrator matrix; membership/permission mapping; assigned/wrong-horse and cross-stable cases; read/write/note/upload/delete expectations; inactive/non-member/anonymous cases; authenticated RLS smoke.

**Boundary:** only approved role/RLS changes; no broad portal redesign or public work.

### Sprint 022 - Mobile Biochemistry Capture Completion

**Goal:** turn the current capture foundation into the approved fast, field-usable workflow.

**Scope:** reconcile final input set with domain authority, optimize horse/date/measurements/context/review/submit sequence, preserve exact scoring, surface converted/derived values appropriately, improve validation and retry states, keep primary action accessible, and add phone-width interaction tests.

**Boundary:** typed notes only unless upload/voice sprints are separately complete; no invented measurement rules.

### Sprint 023 - Test Evidence Uploads And Storage

**Goal:** add private, audited test evidence without weakening horse/stable boundaries.

**Scope:** approved file types and limits, private bucket/path design, signed/server upload flow, attachment metadata, retention/deletion rules, storage RLS, staff/trainer/admin actions, previews/downloads, error/retry, and audit/soft-delete behavior.

**Manual intervention:** storage/privacy decisions and remote policy application may be required.

### Sprint 024 - Voice Notes And Transcription

**Goal:** implement the approved voice strategy with a safe typed fallback.

**Scope:** provider/browser strategy, microphone permission UX, transcript review/edit, failure/confidence handling, privacy/retention, audit, typed fallback, and mobile smoke.

**Boundary:** no provider selection or external data transfer without explicit approved scope.

### Sprint 025 - Thresholds, Score Language, And Table Of Knowledge Approval

**Goal:** convert unresolved domain content into versioned production authority.

**Scope:** approve Green/Amber/Red thresholds, public display labels, evidence classification, recommendation categories/levels/content, disclaimer/review rules, source/version metadata, and publish/activate controls.

**Manual intervention:** domain owner content is mandatory. If absent, the sprint closes as blocked planning/content work rather than inventing advice.

### Sprint 026 - Trainer Results, Recommendations, And Historical Snapshots

**Goal:** present approved results and recommendations clearly and safely.

**Scope:** accepted display terminology, accessible status pattern with label/icon/value/context, approved recommendation snapshots, source/version traceability, unavailable/blocked behavior, explanatory copy, and history stability.

**Boundary:** no diagnosis, guarantees, unapproved causal claims, or silent retroactive recommendation changes.

### Sprint 027 - Trends, Filters, And Saved Views

**Goal:** make longitudinal biochemistry information useful without dashboard overload.

**Scope:** focused metric and score trends, individual/combined modes, AM/PM/both filters, date range, saved/default chart preferences, accessible chart alternatives, empty/blocked states, and performance-safe queries.

**Boundary:** no new scoring or attention logic beyond approved snapshot data.

### Sprint 028 - Stable Dashboard And Horse Workspace

**Goal:** answer the accepted operational questions at stable and horse level.

**Scope:** attention overview, today/incomplete/change summaries, latest test/status, horse workspace navigation, relevant operational context, evidence preview, trends entry points, and permission-aware actions.

**Boundary:** attention ranking/status derivation must be explicitly defined; no invented clinical priority.

### Sprint 029 - Public Website Rebuild Behind The Gate

**Goal:** build the accepted public experience without exposing it prematurely.

**Scope:** brand hierarchy, authentic imagery placeholders/assets, hero and CTA structure, How It Works, For Trainers, Platform, Evidence, Kit and Services, About, Insights entry treatment, claims classification, legal/disclaimer links, portal utility CTA, responsive/accessibility/SEO review.

**Boundary:** section-led existing architecture by default; no CMS unless separately approved; remain hidden behind the gate.

**Manual intervention:** approved photography, releases, founder copy, evidence, and claims review are required.

### Sprint 030 - Commercial Schedule And Commerce Decision

**Goal:** either make commerce launch-ready or explicitly keep it disabled.

**Scope:** confirm GST, kit contents, training, software, support, horse limits, subscription, cancellation, postage, buyback, trial terms, catalogue truth, and whether public checkout is in launch scope.

**If checkout is approved:** align Stripe test products/prices, checkout, signed webhook replay, duplicate replay, order persistence, and admin visibility through a separately authorized safe path.

### Sprint 031 - End-To-End Field Trial And Live Acceptance

**Goal:** prove the complete trainer workflow and access boundaries with real fixtures.

**Scope:** mobile timing, capture, evidence, voice/fallback, scoring, results, recommendations, trends, dashboard, role/RLS denial cases, slow/error paths, accessibility, privacy, and operator/manual-intervention evidence.

**Exit:** under-60-second claim may be considered only if consistently demonstrated.

### Sprint 032 - Public Relaunch And Production Deployment

**Goal:** reopen only the approved public surfaces after product and claims acceptance.

**Scope:** final content/assets, noindex removal, gate removal, approved route restoration, production deployment, public/protected/API smoke, optional checkout smoke, rollback plan, and monitoring.

**Boundary:** shop reopening occurs only if Sprint 030 explicitly approves it.

### Sprint 033 - Final Handoff, Monitoring, And Done Acceptance

**Goal:** close the project against the canonical Definition of Done.

**Scope:** final acceptance matrix, operator guide, onboarding/support notes, production evidence, known limitations, monitoring ownership, legacy/reference disposition, and refreshed Architect briefing/state.

## Dependency Summary

- Sprint 019 precedes all substantial new UI.
- Sprint 020 precedes live capture/history acceptance.
- Sprint 021 precedes sensitive uploads and expanded stakeholder access.
- Sprint 022 precedes field-trial timing.
- Sprint 023 precedes evidence-enabled workflow acceptance.
- Sprint 024 may be deferred only if an explicitly accepted typed/browser-dictation fallback satisfies launch scope.
- Sprint 025 precedes classified trainer-facing results and recommendations.
- Sprints 026-028 precede final field trial.
- Sprint 029 remains behind the gate until Sprint 032.
- Sprint 030 controls whether commerce participates in Sprints 031-032.

## Immediate Recommendation

Create and execute Sprint 019 next. It is the smallest low-risk step that prevents design rework across every later UI sprint while the operator prepares safe Supabase access for Sprint 020.

Do not create or authorize the Sprint 019 Architect Pack merely from this roadmap. The next Architect action is to scope the strict sprint, define its approved file set and acceptance criteria, apply the pack, and set implementation authorization according to `AGENTS.md` when the user requests implementation.
