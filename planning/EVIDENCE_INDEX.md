# Evidence Index

This file navigates evidence; it does not replace the linked records.

## Current Authority

- Current operational truth: `planning/STATE.md`
- Architect handoff: `planning/ARCHITECT_BRIEFING.md`
- Roadmap and sequence: `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, `planning/SPRINT_SCHEDULE.md`
- Active decisions/questions/risks: `planning/DECISIONS.md`, `planning/QUESTIONS.md`, `planning/RISKS.md`
- Workflow rules: `AGENTS.md`, `docs/WORKFLOW_PROFILE.md`
- Design and messaging authority: `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- Validation interface: `docs/VALIDATION.md`, `scripts/README.md`

## Delivery And Product Evidence

| Area | Canonical evidence | Evidence class |
|---|---|---|
| Clean repository baseline | `planning/reviews/017F-local-baseline-completion-review.md`; commits `9d7478657d1220777758e40e8611456dbce46ce1`, `1d507193a048b0d5dbb3b90e4dcec3247b71679d` | Local Git/static |
| Validation/CI consolidation | `planning/reviews/002B-delivery-system-and-project-state-consolidation.md` | Local/CI-equivalent |
| Design and messaging | `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, `docs/DESIGN_SYSTEM_BASELINE_019.md` | Local authority/static |
| Public front page marketing preview | `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`, `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`, `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`, `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`, `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md`, `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md`, `planning/sprints/029F-browser-proof-release-and-live-deployment/SPRINT.md`, `planning/sprints/029G-production-alias-reconciliation-and-public-smoke/SPRINT.md`, `planning/reviews/029B-deployment-completion-evidence.md`, `planning/reviews/029C-validation-build-and-deployment-unblock-evidence.md`, `planning/reviews/029D-lint-build-workspace-and-deployment-proof-evidence.md`, `planning/reviews/029E-visual-smoke-stage-push-and-vercel-deploy-evidence.md`, `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`, `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md` | Local implementation plus 029B layout correction, 029C validation diagnosis, 029D lint/build proof, 029E validation/build/HTTP smoke reconfirmation, 029F operator-assisted visual proof and Vercel deployment, and 029G production-alias marker reconciliation/public smoke; unrelated 021AA dirty state excluded |
| Biochemistry model/readiness | `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `supabase/verification/020-biochemistry-readiness.sql` | Local/static; hosted application separately evidenced |
| Scoring/recommendations | `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`, scoring/recommendation fixture validators | Local fixtures; production thresholds/content not approved |
| Mobile capture/results | `planning/sprints/018-mobile-biochemistry-capture-results/`, `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md` | Local application/build |
| Supabase structural readiness | `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`, `docs/SPRINT_021_PROGRESS.md` | Hosted structural plus local static; not authenticated readiness |
| Supabase Auth/JWT blocker | `planning/reviews/021L-supabase-support-bundle.md`, `planning/reviews/021M-timed-jwt-reproduction-results.md` | Provider-pending, sanitized |
| Provider-response reconciliation | `planning/reviews/021N-provider-response-reconciliation.md` | Local planning/evidence reconciliation; response still pending |
| Six-key compatibility and minimal Auth gate | `planning/reviews/021O-six-key-compatibility-results.md`, `planning/reviews/021O-minimal-auth-reproof-results.md` | Hosted authenticated minimal proof; not role/RLS or production readiness |
| Runtime configuration and direct authenticated RLS | `planning/reviews/021P-runtime-configuration-results.md`, `planning/reviews/021P-direct-authenticated-rls-manifest.md`, `planning/reviews/021P-direct-authenticated-rls-results.md` | Hosted authenticated RLS proof; application-route/cutover still separate |
| Application route/comment/revocation proof | `planning/reviews/021Q-application-proof-manifest.md`, `planning/reviews/021Q-comment-authorization-results.md`, `planning/reviews/021Q-application-route-agreement-results.md`, `planning/reviews/021Q-revocation-and-cleanup-results.md` | Local deterministic first-failure evidence; no 021Q hosted work ran |
| Comment result correction/application reproof | `planning/reviews/021R-comment-result-correction.md`, `planning/reviews/021R-application-proof-manifest.md`, `planning/reviews/021R-application-route-agreement-results.md`, `planning/reviews/021R-comment-authorization-results.md`, `planning/reviews/021R-revocation-and-cleanup-results.md` | Local correction passed; hosted proof failed clean at suspended route; final zero restored |
| Initial-admin eligibility correction | `planning/reviews/021S-process-and-source-reconciliation.md`, `planning/reviews/021S-initial-admin-eligibility-correction.md` | Blocked before implementation/hosted work by approved-file caller conflict |
| Shared initial-admin enforcement/concurrency | `planning/reviews/021T-shared-initial-admin-correction.md`, `planning/reviews/021T-initial-admin-concurrency-results.md`, `planning/reviews/021T-revocation-and-cleanup-results.md` | Local correction passed; action transport/concurrency unproven; control cleanup restored zero |
| Supported bootstrap transport | `planning/reviews/021U-source-and-transport-reconciliation.md`, `planning/reviews/021U-supported-bootstrap-transport-results.md`, `planning/reviews/021U-initial-admin-concurrency-results.md`, `planning/reviews/021U-revocation-and-cleanup-results.md` | Transport unsupported within approved protected-session boundary; no hosted request or fixture |
| Atomic initial-Administrator claim | `planning/reviews/021V-atomic-claim-design-review.md`, `planning/reviews/021V-candidate-migration-application.md`, `planning/reviews/021V-atomic-claim-runtime-results.md`, `planning/reviews/021V-cleanup-and-closeout.md` | Migration 0013 applied once; sequential/concurrent genuine-actor RPC proof passed; zero restored |
| Protected browser bridge | `planning/reviews/021W-source-and-browser-bridge-reconciliation.md`, `planning/reviews/021W-protected-browser-bridge-results.md`, `planning/reviews/021W-revocation-and-cleanup-results.md` | Local Chrome/CDP isolation passed; loopback callback unavailable under production-only Auth allowlist; no hosted work |
| Protected SSR cookie bridge | `planning/reviews/021X-source-and-session-bridge-reconciliation.md`, `planning/reviews/021X-protected-session-cookie-bridge-results.md`, `planning/reviews/021X-revocation-and-cleanup-results.md` | SSR adapter available; production server-secret loading prohibited by current bridge contract; no protected/hosted work |
| Production runtime secret gate | `planning/reviews/021Y-source-runtime-and-cache-reconciliation.md`, `planning/reviews/021Y-production-runtime-secret-results.md` | Runtime file ignored/untracked but failed ordinary-file gate as OneDrive reparse point; no protected/build/browser/hosted work |
| OneDrive runtime and rendered bootstrap | `planning/reviews/021Z-source-and-onedrive-runtime-reconciliation.md`, `planning/reviews/021Z-production-runtime-secret-results.md`, `planning/reviews/021Z-protected-session-cookie-bridge-results.md`, `planning/reviews/021Z-browser-bootstrap-results.md`, `planning/reviews/021Z-revocation-and-cleanup-results.md` | Cloud Files/runtime/build passed; bootstrap timed out after one actor; exact Auth-last cleanup restored zero |
| Restricted provider correlations | `planning/reviews/021M-supabase-support-escalation.md` | Protected local-only; never reproduce or commit |
| Public gate/deployment | Sprint 012F/production-readiness records under `planning/sprints/` and `docs/` | Local plus historical production evidence; reopening unauthorized |
| Commerce | `docs/ADMIN_COMMERCE_HARDENING.md`, Sprint 006/010 records | Local/historical production smoke; commercial truth pending |
| Roadmap/Done | `planning/DEFINITION_OF_DONE.md`, `planning/PROJECT_SPRINT_LIST_2026-07-21.md` | Product/planning authority |

## Historical Evidence

Pre-consolidation state, briefing, questions, and risks through Sprint 017F are preserved in `planning/history/`. Sprint-specific source artifacts and reviews remain under `planning/sprints/`, `planning/architect-packs/`, and `planning/reviews/`.

Archived statements are not current authority unless a current file explicitly carries them forward.

## Readiness Labels

- **Local/static:** source, fixtures, syntax, build, and deterministic validators.
- **Hosted structural:** remote schema/configuration evidence without authenticated application proof.
- **Authenticated/runtime:** genuine-session minimal Auth proof passed in 021O; role/RLS and application-route runtime proof remain incomplete.
- **Production:** deployed/current behavior and approved business/domain content; must be evidenced separately.
