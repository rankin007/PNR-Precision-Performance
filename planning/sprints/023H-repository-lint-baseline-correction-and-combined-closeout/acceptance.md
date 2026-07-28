# Sprint 023H - Repository Lint Baseline Correction And Combined Closeout Acceptance

## Baseline And Scope

- [ ] Existing worktree/branch/baseline, clean index and complete 023E–023G manifest are recorded.
- [ ] Three lint targets had no earlier sprint diff.
- [ ] Exactly six baseline errors reproduce: five `no-require-imports`, one unused type.
- [ ] Earlier 023F/023G corrections and required 023E gates remain valid before editing.
- [ ] Migrations, dependencies, protected configuration and original worktrees remain unchanged.

## Minimal Correction

- [ ] Exactly five line-local `no-require-imports` suppressions with CommonJS justification are added.
- [ ] No file-wide/global/configuration lint suppression or warning downgrade is introduced.
- [ ] CommonJS imports, exports, `require.main`, file names and package module semantics are unchanged.
- [ ] Only unused `BiochemistryRecommendationCategory` is removed from the type import.
- [ ] No recommendation, scoring, fixture, runtime, Pack safety or updater behavior changes.

## Behavior Proof

- [ ] Both CommonJS tools pass `node --check`.
- [ ] Applied 023H Pack reports exactly four valid sections under `--check`.
- [ ] Synthetic valid Pack dry-run proves no target write.
- [ ] Malformed delimiter, traversal and absolute-target cases remain safely rejected.
- [ ] Requiring update-method causes no fetch, write or `run()` execution.
- [ ] Expected CommonJS exports and representative pure helper cases pass.
- [ ] Recommendation validator passes maintained fixtures.
- [ ] Suppression count/scope and temporary cleanup tests pass.

## Combined Revalidation

- [ ] Full repository ESLint passes without stale-cache ambiguity.
- [ ] Focused 023E–023H tests and Sprint 022 regression pass.
- [ ] Full maintained static suite passes.
- [ ] JSON, domain, role, Supabase self-tests, encoding and design-system checks pass.
- [ ] TypeScript and production build pass.
- [ ] Approved-path, dependency, privacy/secret, migration immutability, original-worktree and `git diff --check` checks pass.
- [ ] 023E/023F/023G evidence and outcomes are reconciled only when supported.
- [ ] Executable database, remote/provider, hosted and production proof remains explicitly deferred.

## Scope And Closeout

- [ ] Only approved 023H paths were modified by 023H.
- [ ] Four required reviews and planning reconciliation are complete.
- [ ] No staging, commit, new branch/worktree, migration application, networked updater, remote/provider operation, dependency installation, deployment, push, merge or Sprint 023I work occurs.
- [ ] Planned remote/provider work is identified as Sprint 023I.
- [ ] `git diff --check` passes.

## Closeout Outcomes

Close with exactly one:

- `repository-lint-corrected-combined-local-proof-clean`: six errors are narrowly corrected, behavior/full lint/all combined gates pass, earlier outcomes are reconciled accurately, and no external or commit action occurs.
- `lint-baseline-correction-blocked-clean`: controlled attribution, exact error reproduction, earlier corrections or target immutability cannot be established; targets remain unchanged.
- `lint-correction-validation-blocked-clean`: candidate lint correction exists but behavior, lint, scope, integrity or regression checks fail.
- `lint-corrected-downstream-validation-blocked-clean`: lint correction and focused behavior proof pass, but another independent required combined gate fails and is precisely recorded.

No outcome implies migrations were applied, Storage/providers configured, hosted roles passed, real safety adapters operate, production is ready, combined work is committed, or Sprint 023I has begun.
