# Project State

## Current Status

Sprint `002B-delivery-system-and-project-state-consolidation` is closed **delivery-consolidation-complete**. Sprint 017F established the clean local repository baseline; 002B added canonical local/CI validation and consolidated current planning authority while preserving prior records under `planning/history/`.

Branch: `develop`. Commit 1 is `c961d4be10006d3a95eb90be880be5c0f98caf38`; the closeout commit and clean-state evidence are recorded in `planning/reviews/002B-delivery-system-and-project-state-consolidation.md` and the Builder handoff.

## Delivery And Validation State

- Canonical commands: `npm run validate:json`, `test:domain`, `test:roles`, `test:supabase-self`, `validate:static`, `typecheck`, `validate:ci`, and `validate:local`.
- CI uses Node 22.14.0, npm caching, read-only repository permissions, a bounded timeout, and the remote-safe `validate:ci` entry point.
- Current local evidence covers JSON, domain fixtures, role/comment tests, credential-free Supabase harness self-tests, static validators, lint, TypeScript, and production build.
- Structural Supabase readiness remains distinct from authenticated/runtime/production readiness.
- The public under-construction gate remains in force; no public reopening or deployment occurred in 002B.

## Provider Blocker

Sprint 021M remains `provider-escalation-required-clean`. Candidate-issued JWTs were persistently rejected by Auth identity and Data API verification despite exact-project issuance and advertised signing keys. The submitted Supabase case is pending.

Do not rerun hosted reproduction before a substantive provider response or confirmed remediation. After response, Architect should plan Sprint 021N; two fresh minimal-chain passes precede any full authenticated matrix.

## Product Readiness

The local application builds and its current static/unit validation passes. This does not establish authenticated role/RLS proof, production migration state, approved score thresholds, production recommendation content, final commerce truth, upload/privacy design, voice-provider behavior, deployment readiness, or production readiness.

## Workflow And Boundaries

Profile: `standard` for ordinary repository, UI, documentation, tooling, tests, and product features. Strict controls apply to auth/RLS, secrets/protected evidence, migrations, production data, billing, destructive actions, external publication, and deployment.

No Builder may inspect protected local-only content, contact external systems, mutate remote/production state, deploy, push, or expand product/domain behavior without a sprint that expressly includes that work.

## Immediate Next Work

Next product sprint: **022 — Mobile Biochemistry Workflow Completion**. It may proceed locally within existing schema and typed-note boundaries without waiting for the provider.

Provider-response branch: **021N — Provider Response Reconciliation And Minimal Auth Reproof**, only after substantive Supabase response/remediation.

## Manual Interventions Required

1. Supabase provider response or confirmed remediation before 021N.
2. Domain authority for production thresholds, score terminology, pH/device rules, and Table of Knowledge recommendations before production-facing scoring/advice.
3. Business authority for final catalogue, pricing, GST, kit/support terms, and public reopening.
4. Privacy/provider decisions for uploads, retention, access, voice transcription, and identifiable photography before those capabilities are built or published.
5. Explicit authorization for any remote migration, deployment, push/PR, production mutation, or public reopening.

## Authority

- Navigation: `planning/EVIDENCE_INDEX.md`
- Roadmap: `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- Schedule: `planning/SPRINT_SCHEDULE.md`
- Design/messaging: `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- Historical state through 017F: `planning/history/`
