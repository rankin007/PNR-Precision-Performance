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
