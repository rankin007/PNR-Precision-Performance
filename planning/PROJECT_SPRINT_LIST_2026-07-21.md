# Precision Performance Sprint List

## Current checkpoint — Sprint 034D Stage 1

Sprint 034D Stage 1 completed sanitized read-only reconciliation without retiring any legacy object. The permanent canonical clone has one registration; separate legacy Git metadata owns 28 registrations, and 17 additional legacy directories are unregistered. Sprint 035Q is classified as safe, remote-backed, non-authoritative alternate history. Stage 2 remains unapproved while protected-material containment and approved preservation of 64 unique safe files are unresolved.

## Sprint 030 — Commercial Schedule And Commerce Decision

Outcome: `commercial-authority-pending-commerce-disabled-safe`. Safe reconciliation complete; online purchasing remains disabled pending a complete named-owner schedule.

**Accepted direction:** 2026-07-21
**Current position:** Sprint 027B reconciles completed Sprints 025, 026 and 027 into one combined candidate for future Sprint 028 planning. It adds no Sprint 028 behaviour and authorises no Production action.

## Sprint 027B status — 2026-07-29

Sprint 025 structured domain authority, Sprint 026 fail-closed evidence management and Sprint 027 typed/device-keyboard note fallback coexist in the isolated 027B lineage. Production thresholds/knowledge, evidence safety providers and application-controlled transcription remain unavailable.
**Workflow profile:** standard by default for ordinary repository, UI, documentation, local tooling, tests, and product features. Strict controls remain mandatory for auth/RLS, secrets or protected evidence, remote migrations, production data, billing/Stripe, destructive operations, external publication, and production deployment.
**Current position:** Sprint 002B consolidates local/CI validation and current planning authority after the clean 017F baseline. Sprint 022 is the next product sprint. Sprint 021N remains waiting on substantive Supabase response/remediation.

## How To Use This List

- A numbered sprint is the main product sprint already established by the approved forward roadmap.
- A child, corrective, completion, or verification sprint keeps the main sprint number and uses suffixes beginning at `B`, then `C`, `D`, and onward.
- Historical sprint identifiers remain unchanged. No new `A` follow-up is created.
- This list records sequence and scope only. Each sprint still requires its own Architect Pack and Builder handoff before work begins.
- Provider-dependent work must not be represented as complete from structural or local evidence alone.
- Normal sprints target a useful product or delivery outcome and use one `SPRINT.md`; four-file Packs are reserved for genuinely strict/high-risk work.
- Mechanical issues remain in the active sprint when correction is non-behavioural and does not cross a strict boundary. Child sprints are for material scope expansion, true external blockers, or substantially different product outcomes.
- Closeout stays concise and points to canonical evidence rather than repeating full project history.

## Workstream 0 — Immediate Project Control

These follow-ups can begin while Supabase investigates the Auth/JWT inconsistency.

### Sprint 017B — Repository Reconciliation And Review Baseline

**Main outcome:** convert the accumulated modified and untracked work into a classified, reviewable repository state without losing user work or exposing protected configuration.

**Child stages:**

- **017B:** inventory all tracked modifications and untracked files; map each item to its originating sprint, generated output, local-only material, or unresolved ownership.
- **017C:** reconcile ignore rules, local environment-file treatment, generated artifacts, archives, and ambiguous directories such as `.release-main/`, `.claude/`, and `samples/`.
- **017D:** prepare an intentional staging and commit plan with validation evidence and exact exclusions.
- **017E:** optional remote review handoff covering push/PR only if separately requested after the local baseline is accepted.

**Key boundaries:** no broad cleanup, deletion, reset, commit, push, PR, deployment, or remote mutation unless specifically included in the applicable child sprint.

### Sprint 002B — Validation Reproducibility And CI Baseline

**Main outcome:** make the existing local validation repeatable from declared project commands and remove reliance on undeclared `npx` downloads.

**Child stages:**

- **002B:** add canonical project-local commands for TypeScript, lint, production build, scoring fixtures, recommendation fixtures, role checks, and safe harness self-tests.
- **002C:** characterize the intermittent Next.js page-generation worker exit and establish bounded retry/diagnostic evidence without hiding persistent failures.
- **002D:** add CI for credential-free validation, secret-pattern checks, JSON checks, and approved static safety checks.

**Key boundaries:** no dependency upgrade, framework migration, hosted secret use, or remote test execution unless separately scoped.

### Sprint 011B — Planning State Reconciliation

**Main outcome:** restore one concise, current project truth after Sprints 021E–021M.

**Child stages:**

- **011B:** update schedule, state, status, briefing, questions, risks, and roadmap references to agree on 021M and the provider wait state.
- **011C:** archive or mark superseded historical blockers, remove duplicated current-state prose, and repair text-encoding corruption.
- **011D:** add a compact evidence index separating current authority, historical reviews, support records, and superseded material.

**Key boundaries:** documentation and planning only; no change to technical, hosted, or production state.

## Workstream 1 — Supabase Critical Path

This workstream waits for a substantive Supabase response or remediation.

### Sprint 021N — Provider Response Reconciliation And Minimal Auth Reproof

**Main outcome:** assess the provider response from zero state and prove whether the candidate Auth chain is stable before any full role matrix resumes.

**Child stages:**

- **021N:** record and classify the provider response, confirmed remediation, or requested diagnostic step; reject speculative mutation outside the provider-supported path.
- **021O:** run two fresh minimal Auth-chain passes from zero state, proving exchange, SDK identity verification, direct Auth-user verification, and authenticated Data API access.
- **021P:** complete the direct authenticated RLS role matrix only after 021O passes.
- **021Q:** complete application-route/RLS agreement, comment authorization, denial, revocation, cleanup, and restoration proof.
- **021R:** reconcile final authenticated evidence and decide candidate readiness without performing production cutover.

**Stop condition:** if minimal Auth verification still fails, stop before fixtures/full matrix, clean owned state to zero, and return to provider escalation.

## Workstream 2 — Trainer Product Completion

### Sprint 022 — Mobile Biochemistry Capture Completion

**Main outcome:** make the existing capture workflow fast, clear, field-usable, and testable while retaining typed notes as the safe baseline.

**Child stages:**

- **022B:** reconcile the final permitted input set, measurement rules, sequence, validation, and retry behavior with domain authority.
- **022C:** implement the horse/date/measurements/context/review/submit mobile flow and persistent primary action.
- **022D:** add phone-width interaction, keyboard, accessibility, error, slow-path, and local-fixture tests.
- **022E:** perform field timing and usability verification when authenticated test access is stable.

**Dependency:** 022B–022D may proceed locally; authenticated persistence and field acceptance wait for Sprint 021.

### Sprint 023 — Test Evidence Uploads And Storage

**Main outcome:** add private, audited photo/PDF evidence without weakening horse or stable boundaries.

**Child stages:**

- **023B:** reconcile accepted Sprint 021AH and 022/022B source onto the verified 029M lineage and establish a clean product baseline.
- **023C:** closed `decision-contract-approved-clean`; approved file types, limits, retention, deletion, privacy, ownership, role, audit, region, delivery, safety, lifecycle, acknowledgement, and incident-response rules are canonical in the Markdown and Word contract.
- **023D:** complete locally `upload-storage-architecture-approved-clean`; approved design covers additive metadata, private Storage, authenticated direct upload/finalisation, permissions, lifecycle/safety, retention and daily locked/idempotent reconciliation.
- **023E:** implement upload, preview/download, retry, soft-delete, and audit behavior.
- **023F:** prove role boundaries, wrong-horse/cross-stable denial, cleanup, and restoration remotely.

**Dependencies:** Sprint 021 authenticated proof and approved privacy/storage decisions.

### Sprint 024 — Voice Notes And Transcription

**Main outcome:** provide an approved voice workflow with transcript review and a reliable typed fallback.

**Child stages:**

- **024B:** select the browser/provider strategy and approve privacy, retention, permissions, and external data-transfer rules.
- **024C:** implement recording/dictation, transcript review/edit, failure/confidence handling, and typed fallback.
- **024D:** verify mobile permissions, interruption, denial, accessibility, retention, and audit behavior.

**Dependency:** explicit provider/privacy decision; may be deferred if the accepted launch scope retains typed notes.

## Workstream 3 — Domain Authority And Trainer Intelligence

### Sprint 025 — Thresholds, Score Language, And Table Of Knowledge Approval

**Main outcome:** turn unresolved domain content into versioned production authority without inventing clinical meaning.

**Child stages:**

- **025B:** approve measurement rules, conductivity applicability, pH ranges, score terminology, and status thresholds.
- **025C:** approve recommendation categories, levels, Table of Knowledge content, evidence classification, and source/version metadata.
- **025D:** approve disclaimer, trainer-review, veterinary-review, activation, supersession, and change-control rules.
- **025E:** encode and validate approved content while preserving unavailable states for incomplete authority.

**Dependency:** domain owner input is mandatory.

### Sprint 026 — Trainer Results, Recommendations, And Historical Snapshots

**Main outcome:** present approved results and recommendations clearly, accessibly, and without silent historical reinterpretation.

**Child stages:**

- **026B:** finalize accessible result/status presentation with label, marker, value, context, and safe claims.
- **026C:** implement approved recommendation snapshots with source/version traceability and blocked/unavailable behavior.
- **026D:** implement stable historical snapshot review and verify that later rule changes do not silently rewrite history.
- **026E:** complete authenticated role, accessibility, mobile, and failure-path acceptance.

**Dependencies:** Sprints 021 and 025.

### Sprint 027 — Trends, Filters, And Saved Views

**Main outcome:** make longitudinal biochemistry information useful without overwhelming trainers.

**Child stages:**

- **027B:** define focused metrics, combined/individual modes, AM/PM behavior, date ranges, and accessible alternatives.
- **027C:** implement history queries, charts/tables, empty/blocked states, and performance safeguards.
- **027D:** implement saved/default view preferences within existing permission boundaries.
- **027E:** verify realistic history volume, accessibility, mobile behavior, and authenticated isolation.

**Dependencies:** live history plus approved snapshot behavior from Sprint 026.

### Sprint 028 — Stable Dashboard And Horse Workspace

**Main outcome:** answer which horses need attention, what changed, what is incomplete, and what action comes next.

**Child stages:**

- **028B:** approve non-clinical attention, incomplete-record, change-summary, and next-action rules.
- **028C:** implement the stable-level overview and permission-aware action model.
- **028D:** implement the horse workspace with results, evidence, trends, operational context, and action entry points.
- **028E:** verify role visibility, query performance, mobile use, empty states, and no invented clinical priority.

**Dependencies:** Sprints 021 and 026–027; attention logic requires explicit approval.

## Workstream 4 — Public, Commercial, And Launch

### Sprint 029 — Public Website Rebuild Behind The Gate

**Main outcome:** build the accepted public experience without exposing it before final acceptance.

**Child stages:**

- **029B:** approve information architecture, claims map, page/section copy, CTAs, legal/disclaimer links, and evidence classification.
- **029C:** approve or prepare authentic imagery, releases, anonymised charts, founder/company material, and accessibility/SEO requirements.
- **029D:** implement responsive public sections behind the existing gate using the accepted design system.
- **029E:** complete content, claims, privacy, accessibility, responsive, and route-gate review.
- **029M:** deployed the signed-off public content, approved local assets, bounded Pricing, and visibly non-submitting enquiry presentation as `public-website-follow-up-partial-safe` before Sprint 023 work; Information/Electrolytes, testimonial/video publication, the undefined twelve-month term, and enquiry transmission/storage/email remain deferred.

**Dependency:** approved content, photography, releases, and claims review. Public reopening remains Sprint 032 work.

### Sprint 030 — Commercial Schedule And Commerce Decision

**Main outcome:** make commerce launch-ready or explicitly keep it disabled.

**Child stages:**

- **030B:** approve GST, kit contents, training, software, support, horse limits, subscription duration, cancellation, postage, buyback, and trial terms.
- **030C:** reconcile catalogue, pricing, active status, public copy, admin visibility, and persistence contracts.
- **030D:** if commerce is retained, prove Stripe test checkout, signed webhook processing, duplicate replay, order persistence, and failure handling.
- **030E:** record the final launch decision: enabled with evidence or disabled with safe visitor/operator treatment.

**Dependency:** business-owner commercial truth and safe Stripe test access.

### Sprint 031 — End-To-End Field Trial And Live Acceptance

**Main outcome:** prove the complete trainer workflow, access boundaries, usability, privacy, and failure handling with controlled real fixtures.

**Child stages:**

- **031B:** prepare field-trial participants, devices, roles, fixtures, privacy controls, timing method, and rollback/cleanup plan.
- **031C:** execute mobile capture, evidence, voice/fallback, results, recommendations, trends, and dashboard happy paths.
- **031D:** execute denial, revocation, slow/error, accessibility, privacy, cleanup, and restoration cases.
- **031E:** reconcile defects and repeat only affected acceptance slices.
- **031F:** issue the final live-acceptance recommendation, including whether an under-60-second claim is supported.

**Dependencies:** applicable product Sprints 021–030.

### Sprint 032 — Public Relaunch And Production Deployment

**Main outcome:** reopen only approved public surfaces after product, claims, commercial, and field acceptance.

**Child stages:**

- **032B:** final release candidate, content/assets, configuration, noindex/gate-removal, route, monitoring, and rollback review.
- **032C:** production deployment and public/protected/API smoke through the approved operator path.
- **032D:** optional commerce production smoke only if Sprint 030 approved launch commerce.
- **032E:** bounded post-release monitoring, incident response, rollback decision, and acceptance record.

**Dependencies:** Sprint 031 acceptance and explicit production/reopening scope.

### Sprint 033 — Final Handoff, Monitoring, And Done Acceptance

**Main outcome:** close the project against the canonical Definition of Done with durable operational ownership.

**Child stages:**

- **033B:** reconcile the complete acceptance matrix, known limitations, deferred scope, and production evidence.
- **033C:** finalize operator, onboarding, support, monitoring, incident, privacy, and content-maintenance guides.
- **033D:** archive/supersede historical planning records and settle legacy/reference disposition.
- **033E:** refresh final state, status, briefing, handoff, and Done decision.

## Recommended Execution Order

1. Sprint 017B repository reconciliation.
2. Sprint 002B validation and planning-state consolidation.
3. Local Sprint 022 capture work that does not depend on hosted Auth.
4. Domain/commercial preparation for Sprints 025 and 030.
5. Public/content preparation for Sprint 029 behind the gate.
6. Sprint 021N immediately after a substantive Supabase response or remediation.
7. Complete the Sprint 021 authenticated chain before sensitive uploads or broader stakeholder acceptance.
8. Continue Sprints 023–033 according to their dependencies.

## Current Manual Interventions

### Supabase provider response

- **Blocked:** fresh authenticated role/RLS and application proof.
- **Evidence checked:** exact-project JWT issuance, advertised asymmetric JWKS key, immediate Auth and Data API rejection, and two independent timed reproductions.
- **User/operator action:** monitor the submitted Supabase support case and provide the provider response or confirmed remediation without publishing secrets or unrestricted correlation data.
- **Builder verification afterward:** Sprint 021N classifies the response, then 021O runs two minimal fresh Auth-chain passes from zero state before any full matrix.

### Domain authority

- **Partially complete:** Sprint 025 proves the structured five-measurement/four-lookup path, accepted formulas and structural fail-closed validation. Production thresholds, final score terminology, measurement/device limits and Table of Knowledge recommendations remain unavailable.
- **Evidence checked:** `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md` and maintained Sprint 025 proof cover boundaries, invalid-set rejection, snapshots and safe unavailable states without activating fixture values.
- **User/domain-owner action:** approve the measurement, threshold, terminology, evidence, disclaimer, and recommendation content defined by Sprint 025.
- **Builder verification afterward:** a separately scoped authority completion must encode only approved values, validate every boundary and map each output to its accepted source/version without rewriting historical snapshots.

### Commercial authority

- **Blocked:** final commerce and public pricing decision.
- **Evidence checked:** existing written and seeded pricing sources conflict, and Stripe live acceptance is incomplete.
- **User/business-owner action:** approve one commercial schedule covering all Sprint 030 dimensions.
- **Builder verification afterward:** reconcile catalogue/configuration and either prove test-mode commerce or preserve an explicitly disabled launch state.
# Sprint 023H status — 2026-07-28

Repository lint correction and focused behavior proof pass. Combined clean reconciliation remains blocked by a non-completing bounded production build; Sprint 023I has not begun.
# Sprint 023I status — 2026-07-28

Reparse-safe production build and complete combined local proof pass. Candidate migration 0018 remains unapplied and Sprint 023J has not begun.
# Sprint 023J status — 2026-07-28

Baseline and isolated worktree pass. Remote work is blocked clean before external access pending exact authorised Sydney non-production Supabase/Vercel targets, synthetic-only/provider suitability and Storage-object recovery authority.
# Sprint 023K status — 2026-07-28

Singapore `ap-southeast-1` authority is recorded and the Sydney-only 023J stop is superseded. Remaining non-regional 023J gates still apply.
# Current sprint update — 2026-07-29

- `028 — Stable Dashboard And Horse Workspace`: complete `stable-dashboard-and-horse-workspace-authority-limited-clean` on the reconciled 027B lineage.
