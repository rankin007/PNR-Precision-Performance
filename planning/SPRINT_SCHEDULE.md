# Approved Sprint Schedule To Done

> Current detailed sprint and child-sprint hierarchy: `planning/PROJECT_SPRINT_LIST_2026-07-21.md`. It incorporates the accepted 2026-07-21 project review, the Supabase provider wait state after Sprint 021M, and the valid follow-up suffix sequence.

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

Outcome: completed locally. Builder removed `.env.vercel.production` from Git tracking while preserving the local file, verified root `ORCHESTRATOR*` archive evidence before accepting deletions, validated the page/API under-construction gate before accepting deleted `middleware.ts`, excluded `.release-main/`, `.claude/`, and `samples/`, reran full validation, and created the authorized local baseline commit. No push, PR, deployment, remote migration, production mutation, Stripe change, public reopening, or feature work was performed.

### Sprint 018 - Mobile Biochemistry Capture Results

Outcome: completed locally. Builder added authenticated operations routes for mobile biochemistry capture and result review, wired navigation, used Sprint 014 exact-match scoring, persisted scored/blocked snapshots to Sprint 013 schema tables when available, documented missing schema/threshold/recommendation blockers, and validated fixtures, lint, TypeScript, build, and route smoke. No commit, push, PR, deployment, remote migration, production mutation, Stripe change, public reopening, uploads/OCR/voice provider integration, trends, invented thresholds, or invented recommendation content was performed.

### Sprint 019 - Design System And Product Language Baseline

Outcome: completed locally. Builder applied the accepted design tokens, brand language, accessible status treatment, and controlled biochemistry presentation without changing the existing architecture or public gate.

### Sprint 019B - Mobile Heading Correction

Outcome: completed locally. Builder reduced only the holding-page mobile heading from `text-6xl` to `text-5xl`, retained `md:text-8xl`, passed automated validation, and passed rendered mobile, desktop, sign-in, keyboard-focus, overflow, and gate acceptance. No external or production action occurred.

## Active Follow-Up Sprints

Sprint `021G-automated-authenticated-role-rls-and-application-proof` is closed **blocked-clean** after a protected browser preflight output violation. No fresh run or mutation occurred; Auth/Storage remained zero and production-only callback state was preserved. Sprint 021F remains closed **recovery-reconciled — 021E blocked-clean**.

## Latest Completed Sprint

Sprint 021D - Acceptance Audit Trail Closeout. Outcome: acceptance-audit-complete — structurally-ready unchanged. Both 021C and 021D acceptance files have zero unchecked criteria, with every item mapped to named evidence. No technical state changed.

## Follow-Up Sprint Numbering

Hard rule: a follow-up to a closed core sprint keeps the core number and uses suffixes beginning at `B`, then `C`, `D`, and onward. Example: Sprint 019 follow-ups are `019B`, `019C`, and so on. Follow-ups do not reopen the core sprint, consume the next numeric roadmap sprint, or renumber later core sprints. Historical `A` identifiers remain unchanged; no new `A` follow-ups are created.
## Updated Forward Roadmap

The detailed critique, scope, boundaries, and dependencies are in `planning/reviews/PROJECT_REVIEW_AND_FORWARD_ROADMAP_2026-07-19.md`.

| Sprint | Title | Primary outcome | Key gate |
|---|---|---|---|
| 019 | Design System And Product Language Baseline | Accepted brand, tokens, component semantics, and terminology foundation | No public reopening or architecture expansion |
| 020 | Remote Biochemistry Migration And Live Data Readiness | Readiness evidence complete; remote apply/verification remains operator-gated | Supabase operator access and explicit mutation approval |
| 021 | Definitive Role Matrix And Authenticated RLS Proof | Approved roles and proven horse/stable boundaries | Domain decision plus authenticated users |
| 022 | Mobile Biochemistry Capture Completion | Field-usable capture workflow | No invented measurement rules |
| 023 | Test Evidence Uploads And Storage | Private audited evidence workflow | Storage/privacy/RLS approval |
| 024 | Voice Notes And Transcription | Approved voice workflow with typed fallback | Provider/privacy approval |
| 025 | Thresholds, Score Language, And Table Of Knowledge Approval | Versioned production domain authority | Domain-owner content required |
| 026 | Trainer Results, Recommendations, And Historical Snapshots | Safe accessible approved outputs | Sprint 025 inputs |
| 027 | Trends, Filters, And Saved Views | Useful longitudinal review | Live history and approved snapshots |
| 028 | Stable Dashboard And Horse Workspace | Stable/horse attention and action workspace | Explicit non-clinical attention logic |
| 029 | Public Website Rebuild Behind The Gate | Accepted public experience staged privately | Photography, releases, evidence, claims |
| 030 | Commercial Schedule And Commerce Decision | Commerce approved and tested or explicitly disabled | Business truth and Stripe authorization |
| 031 | End-To-End Field Trial And Live Acceptance | Full workflow, RLS, mobile, privacy, and failure proof | Real fixtures and operator access |
| 032 | Public Relaunch And Production Deployment | Approved public surfaces reopened safely | Explicit deploy/reopening authorization |
| 033 | Final Handoff, Monitoring, And Done Acceptance | Canonical Done closeout | Production acceptance evidence |

## Sequencing Rules

- Sprint 019 precedes substantial new UI so later work does not repeat design decisions.
- Sprint 020 precedes live capture/history acceptance.
- Sprint 021 precedes sensitive uploads and expanded stakeholder access.
- Sprint 025 precedes classified trainer-facing results and recommendations.
- Sprints 026-028 precede final field trial.
- Sprint 029 remains behind the under-construction gate until Sprint 032.
- Sprint 030 determines whether commerce participates in field trial and relaunch.
- Every relevant sprint must reference `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` and identify architecture gates explicitly.

## Recommended Next Sprint

Any replacement authenticated proof requires a separate Sprint 021G-or-later Architect Pack, a fresh run ID, and the durable protected mailbox/process runbook. No replacement run is active.
## Authorization Note

This schedule records sequence and planning direction. Architect creates each pack only; Builder applies it and builds from the generated sprint files.
# Sprint 021H — closed 2026-07-21

Outcome: `blocked-clean`. Implementation stopped during protected acquisition preflight before secret access or remote mutation.
# Sprint 021I — closed 2026-07-21

Outcome: `credential-boundary-blocked-clean`. Build gate passed; exact-candidate protected acquisition capability remains unavailable.
# Sprint 021J — closed 2026-07-21

Outcome: `authenticated-role-rls-proof-failed-clean`. Next eligible follow-up is a narrow Sprint 021K diagnosis; production cutover remains unauthorized.
# Sprint 021K — closed 2026-07-21

Outcome: `diagnosis-complete-blocked-clean`. Next work requires a separately scoped hosted Auth/JWT investigation; production cutover remains unauthorized.

# Sprint 021L — closed 2026-07-21

Outcome: `provider-escalation-required-clean`. Sanitized evidence supports a provider-internal Auth/JWT inconsistency; no hosted correction or full authenticated matrix was safe. Resume only after Supabase resolution, beginning with fresh minimal Auth-chain proof from zero state. Production cutover remains unauthorized.

# Sprint 021M — closed 2026-07-21

Outcome: `provider-escalation-required-clean`. Provider-directed T0/T+20 evidence proves persistent Auth/Data API JWT rejection; the submit-ready escalation contains both windows and restricted correlations. Resume only after Supabase resolution and two fresh minimal-chain passes. Production cutover remains unauthorized.

# Sprint 017B — closed 2026-07-21

Outcome: `inventory-complete`. All 255 closing Git status entries are classified without changing the empty index, source, protected content, or remote state. Next immediate-control work is 017C treatment decisions; 017D staging/commit preparation remains separate and unauthorized.

# Sprint 017C — closed 2026-07-21

Outcome: `treatment-complete`. `.release-main/` and `.claude/` are preserved local-only with exact anchored ignore rules, `samples/README.md` is unchanged, and the supplied DOCX is byte-identical under client-doc references. 017D staging/commit preparation remains separate and unauthorized.

# Sprint 017D — closed 2026-07-22

Outcome: `baseline-blocked-clean`. Exact staging and safety checks passed, but the mandatory Sprint 020G validator still expects migration ledger `0001`–`0010` and rejects accepted migrations `0011`–`0012`. No commit was created; the index is empty and all working files are preserved. Reconcile the validator in a separate follow-up Pack before retrying baseline commits.

# Sprint 017E — closed 2026-07-22

Outcome: `baseline-blocked-clean`. The validator reconciliation passed and 271-path literal staging reached safety review, but the mandatory staged diff check found pre-existing whitespace errors outside the approved edit set. No commit was created; the index is empty and all working files are preserved. Sprint 017F must reconcile whitespace and deterministic JSON parsing before retrying.

# Sprint 017F — closed 2026-07-22

Outcome: `local-baseline-complete`. All recorded mechanical blockers were resolved in-sprint, the fresh 278-path baseline passed complete credential-free validation, and the two required local commits completed the repository baseline. Next work should consolidate validation/CI and planning as a useful outcome rather than extend the Sprint 017 child chain.
