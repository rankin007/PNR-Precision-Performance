# Sprint 023G - Clean-Rebuild Ledger 0018 Validator Alignment Acceptance

## Baseline And Root Cause

- [ ] Existing 023E worktree/branch/baseline, clean index and complete controlled manifest are recorded.
- [ ] Migrations `0001`–`0017` have no diff.
- [ ] Exactly one candidate `0018_test_evidence_upload_and_storage.sql` matches approved 023E authority.
- [ ] Sprint 023F hash portability and migration-0009 validator pass unchanged.
- [ ] The only reproduced downstream blocker is the stale clean-rebuild `0001`–`0017` assertion.
- [ ] No dependency, protected configuration, external state or original worktree changed.

## Validator Alignment

- [ ] Exactly one contiguous version chain `0001`–`0018` is required.
- [ ] Missing, gap, duplicate, malformed prefix and `0019+` cases are rejected.
- [ ] Exact `0018_test_evidence_upload_and_storage.sql` filename is required.
- [ ] Empty/arbitrary candidate `0018` fails independent identity/structural checks.
- [ ] Core legacy gate, old-constraint replacement, fail-closed state, composite authority, lineage, related tables, locking, RLS and revocation markers are checked.
- [ ] All prior clean-rebuild assertions remain active.
- [ ] Output describes a candidate repository chain and never claims migration application.
- [ ] Validator remains deterministic, network/Git/credential/dependency independent.

## Adversarial Proof

- [ ] Exact valid synthetic `0001`–`0018` case passes.
- [ ] Missing `0018` and a pre-0018 gap fail.
- [ ] Duplicate version prefixes fail.
- [ ] Renamed/unexpected and placeholder `0018` fail.
- [ ] `0019` or later fails.
- [ ] Malformed/non-four-digit numeric prefixes fail.
- [ ] Unrelated files are ignored safely.
- [ ] Numeric ordering is deterministic.
- [ ] Diagnostics preserve candidate/applied distinction.
- [ ] Temporary files are always cleaned.
- [ ] Corrected maintained clean-rebuild validator passes the controlled repository.

## Combined Revalidation

- [ ] Full maintained static suite passes beyond both corrected validator gates.
- [ ] Focused 023E/023F/023G tests and Sprint 022 regression pass.
- [ ] JSON, domain, role, Supabase self-tests, encoding and design-system checks pass.
- [ ] TypeScript, full ESLint and production build pass.
- [ ] Approved-path, dependency, privacy/secret, original-worktree and `git diff --check` checks pass.
- [ ] Sprint 023E and 023F evidence/outcomes are reconciled accurately if every gate passes.
- [ ] Deferred executable/remote/provider proof remains explicit and is not upgraded.

## Scope And Closeout

- [ ] Only approved 023G paths were modified by 023G.
- [ ] Four required reviews and planning reconciliation are complete.
- [ ] No staging, commit, new branch/worktree, migration application, remote/provider operation, dependency installation, deployment, push, merge or Sprint 023H work occurs.
- [ ] Planned remote/provider work is identified as Sprint 023H.
- [ ] `git diff --check` passes.

## Closeout Outcomes

Close with exactly one:

- `clean-rebuild-ledger-aligned-023E-proven-clean`: candidate-ledger and adversarial proof pass, full maintained validation passes, Sprint 023E/023F are accurately reconciled, and no external or commit action occurs.
- `ledger-validator-baseline-blocked-clean`: controlled worktree attribution, migration immutability, approved candidate identity or isolated root cause cannot be established; validator remains unchanged.
- `ledger-validator-correction-validation-blocked-clean`: candidate alignment exists but adversarial, scope, integrity or maintained-validator checks fail.
- `ledger-validator-corrected-downstream-validation-blocked-clean`: validator alignment passes, but another independent required Sprint 023E/023F gate fails and is precisely recorded.

No outcome implies candidate `0018` was applied, a remote ledger was inspected, Storage/provider configuration exists, hosted roles passed, safety adapters are operational, production is ready, combined work is committed, or Sprint 023H has begun.
