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
| Biochemistry model/readiness | `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `supabase/verification/020-biochemistry-readiness.sql` | Local/static; hosted application separately evidenced |
| Scoring/recommendations | `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`, scoring/recommendation fixture validators | Local fixtures; production thresholds/content not approved |
| Mobile capture/results | `planning/sprints/018-mobile-biochemistry-capture-results/`, `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md` | Local application/build |
| Supabase structural readiness | `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`, `docs/SPRINT_021_PROGRESS.md` | Hosted structural plus local static; not authenticated readiness |
| Supabase Auth/JWT blocker | `planning/reviews/021L-supabase-support-bundle.md`, `planning/reviews/021M-timed-jwt-reproduction-results.md` | Provider-pending, sanitized |
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
- **Authenticated/runtime:** genuine sessions and positive/denial application/RLS proof; currently incomplete due provider blocker.
- **Production:** deployed/current behavior and approved business/domain content; must be evidenced separately.
