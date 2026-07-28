Architect Pack 023G - Clean-Rebuild Ledger 0018 Validator Alignment

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff to align the maintained clean-rebuild validator with the approved contiguous local migration chain through candidate `0018`, prove adversarial ledger handling, and rerun/reconcile the combined Sprint 023E/023F validation without modifying migrations or implying remote application.

============================================================
FILE: planning/sprints/023G-clean-rebuild-ledger-0018-validator-alignment/requirements.md
============================================================

# Sprint 023G - Clean-Rebuild Ledger 0018 Validator Alignment Requirements

## Role And Purpose

Builder executes this corrective follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023G files, and executes from those sprint files.

Sprint 023G corrects a stale terminal-ledger assertion in `scripts/validate-supabase-clean-rebuild-020G.ps1`. That maintained validator currently requires exactly migrations `0001`–`0017`, while approved Sprint 023E adds the unapplied local candidate:

`supabase/migrations/0018_test_evidence_upload_and_storage.sql`

A migration file’s presence in the repository means it belongs to the candidate clean-rebuild chain. It does not prove that the migration has been applied to any local, linked, hosted or production database. The validator must enforce that distinction explicitly.

## Controlled Existing-Worktree Gate

Execute Sprint 023G inside the existing intentionally uncommitted worktree:

- worktree: `C:\tmp\pnr-023e-local-upload-storage`;
- branch: `codex/023E-local-upload-and-storage-implementation-and-proof`;
- committed baseline: `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`;
- Sprint 023E outcome: `local-implementation-validation-blocked-clean`;
- Sprint 023F outcome: `validator-corrected-downstream-validation-blocked-clean`; and
- Git index: clean.

Do not create another branch or worktree. Before editing, Builder must:

1. capture the complete porcelain inventory and map every change to approved Sprint 023E, 023F, or applied 023G planning files;
2. verify no diff exists for migrations `0001`–`0017`;
3. verify there is exactly one untracked candidate `0018_test_evidence_upload_and_storage.sql` and it matches the 023E implementation manifest/focused structural test;
4. verify the corrected migration-0009 canonical validator and Sprint 023F portability test pass;
5. reproduce the sole downstream failure at the exact `0001`–`0017` assertion in `validate-supabase-clean-rebuild-020G.ps1`;
6. verify dependencies, protected configuration and external state remain unchanged; and
7. verify original `develop`, 023B, 023C and 023D worktrees remain untouched.

Deliver `planning/reviews/023G-controlled-baseline-and-ledger-root-cause.md`.

If attribution is incomplete, an earlier migration differs, more than one `0018` exists, `0018` does not match its approved structural authority, or another upstream validator fails, stop `ledger-validator-baseline-blocked-clean` before editing.

## Required Validator Alignment

Edit `scripts/validate-supabase-clean-rebuild-020G.ps1` narrowly so it:

- requires exactly one migration for every numeric version `0001` through `0018`;
- rejects missing versions, duplicates, non-four-digit prefixes, renamed/unexpected `0018`, and any `0019` or later migration;
- requires exact candidate filename `0018_test_evidence_upload_and_storage.sql`;
- reads `0018` as strict UTF-8 and performs narrow structural identity checks sufficient to reject an arbitrary placeholder file;
- requires core markers for mandatory legacy inventory before backfill/old-constraint replacement, `legacy_unverified`, exact old category/size constraint names, composite test/horse/stable authority, `version_group_id`, lineage protection, approved related tables, advisory locking, RLS enablement and revoked unsafe direct writes;
- preserves all existing `0001`–`0017`, retired-surface, project-coupling, prohibited-SQL, helper, verification and harness safety assertions;
- reports that the **candidate repository migration chain** is aligned through `0018`, without claiming applied/remote status; and
- remains network-free, credential-free, deterministic and usable from a source archive without Git metadata.

The existing focused Sprint 023E migration test remains the detailed `0018` architecture check. The maintained clean-rebuild validator needs enough independent identity/integrity markers to prevent a random or empty `0018` from satisfying the ledger, but must not duplicate the entire 023E test unnecessarily.

Do not solve the blocker by:

- deleting, renaming or modifying migration `0018`;
- changing any migration `0001`–`0017`;
- ignoring files after `0017` or accepting an open-ended terminal version;
- merely changing `1..17` to `1..18` without exact filename/identity checks;
- treating local presence as remote application;
- querying a database, migration history table, Supabase CLI/project or protected configuration;
- removing the clean-rebuild validator from static/local/CI suites; or
- adding a dependency.

## Focused Ledger Self-Test

Create `scripts/test-supabase-clean-rebuild-ledger-023G.ps1`. Prefer extracting a narrow reusable helper to `scripts/lib/migration-ledger-validation.ps1` only if needed to test the same production logic without copying the whole repository.

Using temporary synthetic migration directories/files, prove:

1. exact contiguous `0001`–`0018` with the approved `0018` filename passes ledger classification;
2. missing `0018` fails;
3. a gap before `0018` fails;
4. duplicate version prefixes fail, even with different suffixes;
5. renamed/unexpected `0018` fails;
6. placeholder/empty `0018` fails identity checks;
7. `0019` or any later version fails;
8. malformed/non-four-digit numeric prefixes fail rather than being silently ignored;
9. unrelated non-migration files do not become migrations;
10. ordering is numeric/deterministic, not filesystem-dependent;
11. diagnostics say candidate/repository chain and never claim applied/remote status; and
12. all temporary artifacts are removed in `finally`.

If a helper is created, it must be PowerShell/.NET-only, network/Git/environment-independent, strict about filenames and have no responsibility beyond ledger/identity validation.

## Combined Sprint 023E/023F Revalidation

After focused 023G proof passes, rerun in the controlled worktree:

1. Sprint 023F hash-portability self-test;
2. migration-0009 maintained validator;
3. corrected clean-rebuild validator and focused 023G test;
4. full maintained static suite;
5. Sprint 023E focused migration and evidence tests;
6. Sprint 022 workflow regression;
7. JSON, domain, roles and Supabase self-tests;
8. encoding and design-system checks;
9. TypeScript, full ESLint and production build;
10. approved-path, dependency, privacy/secret and `git diff --check` checks; and
11. original-worktree non-mutation checks.

Update authorised Sprint 023E/023F evidence and closeouts only with exact rerun results:

- if all required gates pass, Sprint 023E becomes `local-upload-storage-implementation-proven-clean`;
- Sprint 023F becomes `validator-portability-corrected-023E-proven-clean` only if its correction remains passing and the downstream blocker is superseded by 023G;
- record that 023F exposed the independent stale-ledger blocker and 023G corrected it; and
- retain all intentional deferrals for executable PostgreSQL, remote migration/Storage, hosted roles, real safety adapters, Cron secret, region and recovery.

If another independent gate fails, keep the applicable earlier sprint blocked and close 023G `ledger-validator-corrected-downstream-validation-blocked-clean` with the exact new blocker.

## Required Evidence

Create:

- `planning/reviews/023G-controlled-baseline-and-ledger-root-cause.md`;
- `planning/reviews/023G-ledger-adversarial-test-results.md`;
- `planning/reviews/023G-combined-revalidation-and-scope-proof.md`; and
- `planning/reviews/023G-closeout.md`.

Evidence must list exact commands/results, identify candidate versus applied status, and distinguish structural, simulated, executable local and deferred proof. Do not include secrets or protected environment values.

## Required Reading

Builder must read:

1. project method, `AGENTS.md`, workflow profile and Manual Intervention Rule;
2. Sprint 023E and 023F Packs, generated sprint files, implementation manifest and all closeouts/proof records;
3. `scripts/validate-supabase-clean-rebuild-020G.ps1` completely;
4. `scripts/validate-biochemistry-remote-readiness.ps1` and the 023F portability helper/test;
5. `scripts/test-test-evidence-migration-023E.mjs`;
6. candidate migration `0018` and migrations `0001`–`0017` read-only;
7. validation orchestrator/package scripts; and
8. current controlled working-tree inventory.

## Approved File Set

Builder may edit/create only:

- `scripts/validate-supabase-clean-rebuild-020G.ps1`;
- `scripts/test-supabase-clean-rebuild-ledger-023G.ps1`;
- `scripts/lib/migration-ledger-validation.ps1`, only if the narrow shared helper is needed;
- `package.json`, only to add a focused 023G test alias, without dependency changes;
- `planning/architect-packs/architect-pack-023G-clean-rebuild-ledger-0018-validator-alignment.md`;
- `planning/sprints/023G-clean-rebuild-ledger-0018-validator-alignment/**`;
- the four required `planning/reviews/023G-*.md` files;
- `planning/reviews/023E-local-test-and-accessibility-proof.md` and `planning/reviews/023E-closeout.md`;
- `planning/reviews/023F-023E-revalidation-and-scope-proof.md` and `planning/reviews/023F-closeout.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for the repository-candidate versus applied-ledger distinction;
- `planning/RISKS.md`, only for changed validator/ledger risk; and
- `planning/QUESTIONS.md`, only for resolved/exact remaining 023G questions.

Existing approved 023E/023F changes remain present and may be read/tested, but 023G must not otherwise modify them. Any required edit outside this set is a scope stop.

## Git, External And Remote Boundaries

Do not stage or commit unless separately asked after review. Do not create another branch/worktree, push, open a PR, merge, rebase, deploy, install/update dependencies, inspect protected configuration, query/contact providers, run Supabase/Vercel remote operations, apply/reset/repair migrations, create/configure buckets/policies/secrets, upload evidence, or mutate external state.

## Manual Intervention Rule

For every blocker record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action required;
- numbered completion steps; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- any migration, schema, SQL product contract, RLS, Storage or application-source change;
- modifying the 023E upload/storage implementation;
- changing migration-0009 canonical hashing or the 023F correction except rerun evidence;
- database/applied-ledger inspection or claims;
- dependencies, providers, secrets, hosted proof or deployment;
- beginning the former provider/remote follow-up, now Sprint 023H;
- committing combined 023E/023F/023G work without separate instruction; and
- production-readiness or complete Sprint 023 claims.

============================================================
FILE: planning/sprints/023G-clean-rebuild-ledger-0018-validator-alignment/blueprint.md
============================================================

# Sprint 023G - Clean-Rebuild Ledger 0018 Validator Alignment Blueprint

## Phase 1 - Controlled Baseline And Reproduction

1. Verify existing worktree, branch, committed baseline, clean index and complete 023E/023F attribution.
2. Verify migrations `0001`–`0017` have no diff and exactly one approved candidate `0018` exists.
3. Rerun 023F portability proof and reproduce only the stale clean-rebuild terminal-ledger failure.
4. Record dependency, secret, external-state and original-worktree non-mutation boundaries.
5. Apply and verify all four Sprint 023G files.

Stop before validator changes if the controlled baseline or isolated root cause fails.

## Phase 2 - Ledger And Identity Alignment

1. Require exactly one contiguous migration version `0001`–`0018`.
2. Require exact candidate filename for `0018`.
3. Add narrow independent `0018` identity/structural markers.
4. Reject gaps, duplicates, malformed prefixes, unexpected rename and future versions.
5. Preserve all existing clean-rebuild security/verification assertions.
6. Change success/error language to candidate repository chain without applied/remote claims.

## Phase 3 - Adversarial Self-Test

1. Test exact valid ledger.
2. Test missing, gap, duplicate, rename, placeholder, future and malformed cases.
3. Test deterministic ordering and ignored unrelated files.
4. Test diagnostics and cleanup.
5. Run the corrected maintained validator against the controlled candidate tree.

## Phase 4 - Combined Revalidation

1. Rerun all 023F and 023E focused gates.
2. Run the entire maintained static/local validation path, full ESLint and build.
3. Run approved-path, dependency, privacy/secret, diff and original-worktree checks.
4. Preserve exact structural/local/deferred proof classifications.
5. Reconcile only authorised 023E/023F evidence and outcomes.

## Phase 5 - Closeout

1. Produce all four 023G reviews.
2. Update planning records and reserve Sprint 023H for remote/provider proof.
3. Finish with exactly one allowed outcome.
4. Leave all combined work unstaged and uncommitted unless separately instructed.
5. Do not begin Sprint 023H.

============================================================
FILE: planning/sprints/023G-clean-rebuild-ledger-0018-validator-alignment/acceptance.md
============================================================

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

============================================================
FILE: planning/sprints/023G-clean-rebuild-ledger-0018-validator-alignment/handoff-prompt.md
============================================================

# Sprint 023G - Builder Handoff Prompt

You are Builder for Sprint 023G - Clean-Rebuild Ledger 0018 Validator Alignment.

Apply and verify all four Sprint 023G files in the existing intentionally uncommitted worktree `C:\tmp\pnr-023e-local-upload-storage` on branch `codex/023E-local-upload-and-storage-implementation-and-proof`. Do not create another branch/worktree.

First prove complete attribution, clean index, unchanged migrations `0001`–`0017`, one approved candidate `0018`, passing Sprint 023F portability correction and the exact stale `0001`–`0017` clean-rebuild assertion as the sole blocker. Stop before editing if any statement is false.

Correct only `validate-supabase-clean-rebuild-020G.ps1` and any approved narrow ledger test/helper. Require exactly one contiguous candidate repository chain `0001`–`0018`, exact `0018_test_evidence_upload_and_storage.sql`, and core independent identity markers. Reject gaps, duplicates, malformed prefixes, rename/placeholder `0018` and `0019+`. Preserve every existing security/verification assertion.

Do not treat local file presence as applied status. Do not query a database/project, alter any migration, weaken/open-end the ledger, add dependencies, change product source, inspect protected configuration or perform remote work.

Run adversarial ledger proof and the complete combined 023E/023F validation set. Reconcile authorised earlier evidence/outcomes only if the rerun supports it, preserving all remote/executable/provider deferrals.

Do not stage, commit, create another branch/worktree, apply migrations, create Storage, contact providers, deploy, push, merge or begin Sprint 023H. Finish with one allowed outcome and leave all combined work uncommitted unless separately instructed.
