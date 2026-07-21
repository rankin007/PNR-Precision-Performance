# Sprint 020 - Remote Biochemistry Migration And Live Data Readiness Requirements

## Role And Profile

Builder executes this sprint under the strict workflow profile. Builder implements only from this applied sprint folder.

## Goal

Establish an evidence-backed, reversible path for applying the existing Sprint 013 biochemistry schema and lookup data to the intended Supabase project, then verify live readiness without inventing domain behavior or changing the application architecture.

## Sources Of Truth

- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `docs/BIOCHEMISTRY_SCORING_014.md`
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`
- `supabase/migrations/0009_biochemistry_test_data_model.sql`
- `supabase/bootstrap/remote-init.sql`
- existing Supabase migrations, configuration, and safe environment-name evidence

## Execution Boundary

Builder scope covers local inspection, non-mutating remote discovery, migration preflight, validation tooling/docs, fixture planning, and planning closeout inside the approved file set.

Remote migration, remote row mutation, Supabase setting changes, secret exposure, deployment, commit, push, PR creation, and public reopening are outside this sprint. Builder stops if execution would cross those boundaries.

A later expressly scoped pack or user instruction may direct the reviewed remote migration against the verified intended project, followed by its verification and recovery path.

## In Scope

- identify the intended Supabase project using non-secret identifiers and compare it with safe local configuration
- inventory applied remote migrations and relevant schema objects using read-only access where available
- prove whether migration 0009 is unapplied, fully applied, partially applied, or divergent
- inspect migration 0009 for idempotency, dependencies, RLS, grants, lookup counts, and compatibility with the remote baseline
- calculate and record migration-file hashes and expected object/lookup counts
- prepare exact apply, verification, and rollback/forward-fix procedures without secret values
- create a read-only preflight/verification SQL artifact if required
- define minimal synthetic fixtures for later authenticated application smoke; do not use real horse, trainer, stable, or client data
- prepare the reviewed migration and read-only post-apply verification for a later expressly scoped remote execution
- document evidence, blockers, manual actions, and outcome
- update planning state/status/briefing/decisions/risks/questions/schedule

## Out Of Scope

- schema redesign or new domain behavior
- role-definition or RLS-boundary expansion (Sprint 021)
- production thresholds or recommendation content
- uploads/storage, OCR, voice, trends, dashboards, commerce, Stripe, deployment, DNS, public reopening, CMS, or marketing work
- internal rename of `healthScore` or persisted compatibility contracts
- real customer/stable/horse data as fixtures
- destructive rollback, hard delete, database reset, or broad migration replay
- secret output, storage, copying, staging, or committing

## Approved File Set

Builder may edit:

- `planning/sprints/020-remote-biochemistry-migration-live-readiness/**`
- `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`
- `scripts/validate-biochemistry-remote-readiness.*`, if a local/read-only validator is needed
- `supabase/verification/020-biochemistry-readiness.sql`, if needed
- `supabase/migrations/0009_biochemistry_test_data_model.sql` only if preflight finds a correctness defect, and only after stopping for scope confirmation because the reviewed migration hash would change
- `supabase/bootstrap/remote-init.sql` only if an approved migration correction requires regeneration
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Inspection only:

- `.env*` names and presence; never print values
- `supabase/config.toml`
- existing `supabase/migrations/**` other than the conditional 0009 rule above
- application/auth/domain source needed to understand consumers
- Supabase remote metadata/schema through read-only commands

## Design And Messaging Carry-Forward

No public or authenticated UI is planned. The accepted design authority remains binding. This sprint crosses the remote-migration architecture gate only if separately approved; it does not cross auth/RLS expansion, provider, CMS, aggregation, terminology, public-reopening, or deployment gates. Confidential data must not appear in evidence.

## Manual Intervention Rule

For every unavailable credential, CLI/session, project selection, backup confirmation, remote-mutation approval, fixture requirement, or failed verification, record:

- what is blocked
- evidence checked
- exact user/operator action needed
- numbered completion steps
- what Builder will verify afterward

Do not mark the sprint complete while a required remote-readiness result is implicit. A readiness-only close is permitted if remote mutation remains unauthorized, but it must be labelled accurately and authorization reset to no.
