# Sprint 020 - Remote Biochemistry Migration And Live Data Readiness Acceptance

## Readiness Acceptance

- [x] Intended Supabase project is identified using safe, non-secret evidence.
- [x] Local migration 0009 hash and expected effects are recorded.
- [x] Remote state is classified as unapplied, fully applied, partially applied, divergent, or inaccessible.
- [x] Dependencies, idempotency/upserts, RLS, grants, lookup uniqueness/counts, and failure behavior are reviewed.
- [x] Exact apply, read-only verification, and non-destructive recovery procedures are documented.
- [x] Synthetic fixture requirements are documented; no real client data is used.
- [x] Every access/approval/manual blocker contains evidence, exact steps, and follow-up verification.
- [x] No secret or secret fragment appears in output, docs, logs retained in the repo, staging, or commits.

## Remote Mutation Acceptance

These criteria are retained for a later sprint expressly scoped to remote execution:

Not applicable to this readiness-only close. Remote mutation was not authorized or performed.

- [ ] Only the reviewed migration hash is applied to the verified project.
- [ ] Post-apply object, RLS, policy, grant, lookup-count, and uniqueness checks pass.
- [ ] No partial or divergent state remains.
- [ ] No unrelated schema, data, settings, billing, deployment, or public-surface change occurs.

If remote mutation remains unauthorized or access is unavailable, Builder may close Sprint 020 as readiness-only, not as remotely migrated. The unresolved action must remain explicit.

## Local Validation

- [x] Existing biochemistry scoring and recommendation fixture validators pass.
- [x] ESLint passes.
- [x] TypeScript passes without emit/incremental state.
- [x] Production build passes.
- [x] Any new readiness validator passes.
- [x] `git diff --check` passes, allowing only line-ending warnings.

## Closeout

- [x] `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md` contains sanitized evidence and outcome.
- [x] State, status, risks, questions, decisions where needed, schedule, and Architect briefing are current.
- [x] No commit, push, PR, deployment, Stripe action, public reopening, or unauthorized remote mutation occurred.
