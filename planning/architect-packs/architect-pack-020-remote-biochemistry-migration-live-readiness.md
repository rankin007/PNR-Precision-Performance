# Architect Pack 020 - Remote Biochemistry Migration And Live Data Readiness

============================================================
FILE: planning/sprints/020-remote-biochemistry-migration-live-readiness/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/020-remote-biochemistry-migration-live-readiness/blueprint.md
============================================================

# Sprint 020 - Remote Biochemistry Migration And Live Data Readiness Blueprint

## Execution Order

1. Reconfirm strict scope, dirty-worktree boundaries, current branch/commit, and authorization.
2. Read the canonical Sprint 013/014/018 data and scoring documentation plus migration 0009.
3. Record SHA-256 for migration 0009 and expected schema objects, constraints, policies, grants, and lookup-row counts.
4. Discover available Supabase tooling/session without printing secrets. Confirm the intended project using safe project identifiers.
5. Run read-only remote inventory. Classify the target as unapplied, fully applied, partially applied, divergent, or inaccessible.
6. Review migration safety against the observed baseline: dependencies, duplicate objects, transactional behavior, RLS/policies, grants, seed upserts, and failure recovery.
7. Produce `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md` with project identity evidence, preflight result, exact apply plan, verification queries, recovery strategy, and intervention instructions.
8. If access or explicit remote-mutation authorization is absent, stop at the documented readiness gate and do not improvise.
9. Do not apply the remote migration in this readiness sprint; hand the reviewed execution and verification procedure forward.
10. Run local validation, update durable planning records, and close accurately. Close the sprint accurately.

## Expected Verification Model

At minimum verify, without exposing row contents:

- expected biochemistry tables exist
- expected columns, types, defaults, constraints, indexes, RLS state, policies, and grants match the reviewed migration
- lookup types are exactly the intended set
- lookup counts and uniqueness match local migration expectations
- no partially created object set remains
- existing unrelated tables and public gate behavior are unchanged
- application build/type/lint and biochemistry fixture validators remain green

## Fixture Strategy

Use documented synthetic identifiers and data only. Fixture creation is not authorized by this pack. Define the minimum stable, horse, membership, and biochemistry record needed for a later authenticated smoke test, including cleanup ownership and non-production preference. Sprint 021 owns definitive cross-role RLS proof.

## Apply Gate

Before any remote mutation Builder must present or record:

- intended project reference and environment classification
- remote inventory classification
- reviewed migration hash
- backup/restore or forward-fix posture
- exact command/SQL to be executed
- expected effects and estimated lookup volume
- post-apply verification plan
- an expressly scoped instruction covering the remote mutation

A mismatch, partial state, unknown project, unavailable recovery posture, unexpected applied migration, or migration defect is a stop condition.

## Recovery Strategy

Prefer safe forward-fix over destructive rollback once production data exists. Do not drop tables, truncate data, reset the database, or delete remote rows under this sprint. If execution fails, stop further writes, preserve sanitized error evidence, inventory the resulting state read-only, and escalate with a reviewed recovery proposal.

============================================================
FILE: planning/sprints/020-remote-biochemistry-migration-live-readiness/acceptance.md
============================================================

# Sprint 020 - Remote Biochemistry Migration And Live Data Readiness Acceptance

## Readiness Acceptance

- [ ] Intended Supabase project is identified using safe, non-secret evidence.
- [ ] Local migration 0009 hash and expected effects are recorded.
- [ ] Remote state is classified as unapplied, fully applied, partially applied, divergent, or inaccessible.
- [ ] Dependencies, idempotency/upserts, RLS, grants, lookup uniqueness/counts, and failure behavior are reviewed.
- [ ] Exact apply, read-only verification, and non-destructive recovery procedures are documented.
- [ ] Synthetic fixture requirements are documented; no real client data is used.
- [ ] Every access/approval/manual blocker contains evidence, exact steps, and follow-up verification.
- [ ] No secret or secret fragment appears in output, docs, logs retained in the repo, staging, or commits.

## Remote Mutation Acceptance

These criteria are retained for a later sprint expressly scoped to remote execution:

- [ ] Only the reviewed migration hash is applied to the verified project.
- [ ] Post-apply object, RLS, policy, grant, lookup-count, and uniqueness checks pass.
- [ ] No partial or divergent state remains.
- [ ] No unrelated schema, data, settings, billing, deployment, or public-surface change occurs.

If remote mutation remains unauthorized or access is unavailable, Builder may close Sprint 020 as readiness-only, not as remotely migrated. The unresolved action must remain explicit.

## Local Validation

- [ ] Existing biochemistry scoring and recommendation fixture validators pass.
- [ ] ESLint passes.
- [ ] TypeScript passes without emit/incremental state.
- [ ] Production build passes.
- [ ] Any new readiness validator passes.
- [ ] `git diff --check` passes, allowing only line-ending warnings.

## Closeout

- [ ] `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md` contains sanitized evidence and outcome.
- [ ] State, status, risks, questions, decisions where needed, schedule, and Architect briefing are current.
- [ ] No commit, push, PR, deployment, Stripe action, public reopening, or unauthorized remote mutation occurred.

============================================================
FILE: planning/sprints/020-remote-biochemistry-migration-live-readiness/handoff-prompt.md
============================================================

# Sprint 020 - Builder Handoff Prompt

You are Builder for Sprint 020 under the strict workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, all files in this sprint folder, the Sprint 013/014/018 biochemistry docs, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, migration 0009, relevant Supabase patterns, risks, questions, and the Architect briefing before acting.

Work in two gates:

1. Complete local and read-only remote readiness evidence.
2. Stop before any remote mutation because remote execution is outside this readiness sprint.

Do not print or persist secrets. Do not guess the Supabase project, bypass unavailable access, use real customer data as fixtures, broaden RLS roles, redesign schema, or change application behavior. If migration 0009 appears defective or the remote state is partial/divergent, stop and propose a bounded recovery or correction; do not edit the reviewed migration silently.

If manual intervention is required, record the blocker, evidence checked, exact numbered user/operator steps, and what you will verify afterward. Keep the public gate intact and preserve unrelated dirty-worktree changes.

At close, report whether the outcome is readiness-only or remotely migrated and verified. Refresh all durable planning records and record the sprint outcome accurately. Do not commit, push, create a PR, deploy, or perform production mutations because remote mutation is outside this readiness sprint.
