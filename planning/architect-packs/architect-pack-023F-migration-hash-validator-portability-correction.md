Architect Pack 023F - Migration Hash Validator Portability Correction

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff to correct the maintained migration `0009` validator so canonical content integrity is enforced identically for LF and Windows CRLF checkouts, then rerun and accurately reconcile the blocked Sprint 023E local validation closeout without changing any migration or product behaviour.

============================================================
FILE: planning/sprints/023F-migration-hash-validator-portability-correction/requirements.md
============================================================

# Sprint 023F - Migration Hash Validator Portability Correction Requirements

## Role And Purpose

Builder executes this corrective follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023F files, and executes from those sprint files.

Sprint 023F corrects one cross-platform validation defect discovered during Sprint 023E closeout. The governed canonical LF content of `supabase/migrations/0009_biochemistry_test_data_model.sql` hashes to:

`6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`

The unchanged Windows worktree uses CRLF bytes and hashes raw to:

`B5DE360D33C69F21C8967793AFD66CA670A1FA32672AD60E7A47BD72F56982E3`

Git reports migration `0009` unchanged. The defect is that `scripts/validate-biochemistry-remote-readiness.ps1` hashes platform-transformed worktree bytes rather than canonicalized text bytes. The expected governed hash is correct and must not be replaced with the Windows-only raw hash.

## Controlled Existing-Worktree Gate

Sprint 023E is intentionally implemented but uncommitted in:

- branch `codex/023E-local-upload-and-storage-implementation-and-proof`;
- worktree `C:\tmp\pnr-023e-local-upload-storage`;
- baseline `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`; and
- closeout `local-implementation-validation-blocked-clean`.

Sprint 023F is a completion correction for that exact uncommitted candidate. Builder must apply this Pack in the existing isolated 023E worktree rather than create a misleading clean branch that lacks the candidate being revalidated.

Before Pack application, Builder must record:

1. exact branch/worktree/baseline and clean index;
2. complete `git status --porcelain=v1 --untracked-files=all` inventory of the controlled 023E changes;
3. no diff for migration `0009`;
4. canonical LF hash `6DD2238D…`, Windows CRLF raw hash `B5DE360D…`, and proof that line-ending conversion alone explains the difference;
5. Sprint 023E Pack, four sprint files, implementation manifest, focused validation results and blocked closeout are present;
6. no dependency diff other than the already approved 023E package script alias change;
7. no remote, migration-application, bucket/policy, provider, deployment, push or merge action occurred; and
8. original `develop`, 023B, 023C and 023D worktrees remain untouched.

Deliver `planning/reviews/023F-controlled-baseline-and-root-cause.md`. If the working changes cannot be attributed exactly to approved 023E plus applied 023F planning files, migration `0009` has a Git diff, or the mismatch is not solely LF/CRLF, stop `validator-correction-baseline-blocked-clean` without editing the validator.

## Required Correction

Edit only the hash-comparison implementation in `scripts/validate-biochemistry-remote-readiness.ps1` so that it:

- reads migration `0009` explicitly as strict UTF-8 without silently accepting invalid encoding;
- rejects or preserves a BOM as a substantive difference rather than hiding it;
- normalizes only CRLF line endings to LF before SHA-256 comparison;
- does not normalize arbitrary whitespace, indentation, casing, lone carriage returns, trailing spaces, final-newline presence or SQL content;
- continues to compare against canonical governed hash `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`;
- retains all existing lookup-count and structural checks unchanged; and
- produces an accurate failure message distinguishing canonicalized content hash from raw worktree hash without exposing sensitive data.

Use PowerShell/.NET capabilities already available. Do not add a dependency, invoke the network, rely on Git being available inside the validator, or make validation depend on the current commit/branch. The maintained validator must remain usable against a source archive as well as a Git checkout.

Do not solve the issue by:

- changing the expected hash to `B5DE360D…`;
- modifying migration `0009` bytes/content or any migration;
- editing `.gitattributes`, global/local Git configuration or checkout line endings;
- weakening/removing/bypassing the immutable-migration check;
- special-casing an operating system;
- accepting both hard-coded hashes without canonicalization; or
- skipping the validator from static/local/CI suites.

## Focused Portability Self-Test

Create `scripts/test-biochemistry-remote-readiness-hash-portability-023F.ps1`. It must use temporary synthetic copies and invoke the same canonical hash helper/path used by the maintained validator, or a safely dot-sourced testable helper if extraction is necessary.

The self-test must prove:

1. canonical LF bytes produce `6DD2238D…`;
2. the exact CRLF equivalent produces the same canonicalized hash;
3. raw LF and raw CRLF hashes differ, proving the test is meaningful;
4. one SQL character/content mutation fails;
5. trailing-space mutation fails;
6. final-newline removal/addition fails relative to canonical content;
7. UTF-8 BOM addition fails;
8. invalid UTF-8 fails;
9. lone carriage-return mutation fails; and
10. temporary files are removed in `finally` without touching repository migrations.

If a helper is extracted, authorize only `scripts/lib/migration-content-hash.ps1`; it must have one narrow responsibility and no environment, Git or network dependency. Prefer keeping the change small.

## Sprint 023E Revalidation And Reconciliation

After the focused self-test passes, Builder must rerun from the existing 023E worktree:

1. the corrected `scripts/validate-biochemistry-remote-readiness.ps1`;
2. the full maintained static suite;
3. Sprint 023E focused migration/evidence tests;
4. Sprint 022 workflow regression;
5. JSON, domain, roles and Supabase self-tests;
6. encoding and design-system checks;
7. TypeScript and ESLint;
8. production build;
9. approved-path, dependency, secret/privacy and `git diff --check` checks; and
10. original-worktree non-mutation checks.

Update `planning/reviews/023E-local-test-and-accessibility-proof.md` and `planning/reviews/023E-closeout.md` only to replace the obsolete hash blocker with exact rerun evidence. If every 023E acceptance gate now passes, change its outcome to `local-upload-storage-implementation-proven-clean`. Do not erase the historical fact that the first closeout was blocked; record that Sprint 023F superseded that blocker.

Executable PostgreSQL, remote Storage/policy, hosted roles, real scanner/sanitiser, Cron secret, region and recovery proof remain deferred. Their intentional deferral does not become local executable proof and must remain stated accurately.

If another independent required 023E gate fails, retain `local-implementation-validation-blocked-clean`, record the exact new blocker, and close 023F `validator-corrected-downstream-validation-blocked-clean`.

## Required Evidence

Create:

- `planning/reviews/023F-controlled-baseline-and-root-cause.md`;
- `planning/reviews/023F-portability-test-results.md`;
- `planning/reviews/023F-023E-revalidation-and-scope-proof.md`; and
- `planning/reviews/023F-closeout.md`.

Evidence must distinguish raw filesystem-byte hashes from canonicalized text-content hashes, quote complete hashes, list exact commands/results, and state what was not run. Do not include secrets or protected environment values.

## Required Reading

Builder must read:

1. project method, `AGENTS.md`, workflow profile and Manual Intervention Rule;
2. Sprint 023E Pack, four generated sprint files and all six 023E reviews;
3. `scripts/validate-biochemistry-remote-readiness.ps1` completely;
4. `scripts/run-validation-suite.mjs`, `scripts/test-run-validation-suite.mjs` and relevant package scripts;
5. migration `0009` as read-only evidence;
6. repository encoding validator and any existing PowerShell test conventions; and
7. current working-tree/status evidence before editing.

## Approved File Set

Builder may edit/create only:

- `scripts/validate-biochemistry-remote-readiness.ps1`;
- `scripts/test-biochemistry-remote-readiness-hash-portability-023F.ps1`;
- `scripts/lib/migration-content-hash.ps1`, only if a shared narrow helper is needed;
- `package.json`, only if adding a focused 023F self-test alias is necessary; do not alter dependencies;
- `planning/architect-packs/architect-pack-023F-migration-hash-validator-portability-correction.md`;
- `planning/sprints/023F-migration-hash-validator-portability-correction/**`;
- the four required `planning/reviews/023F-*.md` files;
- `planning/reviews/023E-local-test-and-accessibility-proof.md`;
- `planning/reviews/023E-closeout.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for the canonical line-ending-independent integrity rule;
- `planning/RISKS.md`, only for changed validator-portability risk; and
- `planning/QUESTIONS.md`, only for resolved/exact remaining 023F questions.

Existing approved 023E changes may remain present and be read/tested, but 023F must not otherwise modify them. Any required edit outside this set is a scope stop.

## Git, External And Remote Boundaries

Do not stage or commit unless separately asked after review. Do not create another branch/worktree, push, open a PR, merge, rebase, deploy, contact a provider, inspect protected values, install/update dependencies, apply/reset/repair migrations, create/configure buckets/policies/secrets, upload evidence, or mutate external state.

## Manual Intervention Rule

For every blocker record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action required;
- numbered completion steps; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- any migration, SQL, schema, RLS, Storage or product-source change;
- `.gitattributes` or Git configuration changes;
- changing/removing the governed migration `0009` hash;
- new dependencies or platform/provider selection;
- executable PostgreSQL, remote/hosted, deployment or production proof;
- beginning the former remote/provider Sprint 023F scope, which is renumbered to Sprint 023G;
- committing the combined 023E/023F candidate without separate instruction; and
- claims of production readiness or complete Sprint 023 delivery.

============================================================
FILE: planning/sprints/023F-migration-hash-validator-portability-correction/blueprint.md
============================================================

# Sprint 023F - Migration Hash Validator Portability Correction Blueprint

## Phase 1 - Controlled Baseline And Root Cause

1. Verify the exact existing 023E worktree, branch, baseline, clean index and controlled dirty manifest.
2. Prove migration `0009` has no Git diff.
3. Compute canonical Git LF, raw Windows CRLF and deterministic LF-to-CRLF hashes.
4. Prove the mismatch is exactly line endings and preserve the governed canonical hash.
5. Verify no unrelated file or external action exists.
6. Apply and verify all four Sprint 023F files in the existing worktree.

Stop before editing if any baseline or root-cause statement is false.

## Phase 2 - Narrow Validator Correction

1. Implement strict UTF-8 reading and CRLF-to-LF-only canonicalization.
2. Hash canonicalized bytes with SHA-256 and compare to `6DD2238D…`.
3. Preserve all other validator expectations and output.
4. Do not use Git/runtime branch state, OS special cases, dual accepted hashes or weakened checks.
5. Inspect the diff to confirm no migration or unrelated validator logic changed.

## Phase 3 - Portability And Mutation Proof

1. Create isolated temporary LF and CRLF synthetic copies.
2. Prove equivalent canonical hash and different raw hashes.
3. Prove content, trailing whitespace, newline, BOM, invalid UTF-8 and lone-CR mutations fail.
4. Prove cleanup in success and failure paths.
5. Run the maintained validator against the unchanged Windows checkout.

## Phase 4 - Full 023E Revalidation

1. Run full static validation past the formerly failing gate.
2. Rerun all focused and maintained 023E gates listed in requirements.
3. Confirm no dependency, secret, approved-path, migration or original-worktree drift.
4. Preserve accurate distinctions between structural/local proof and deferred remote/executable proof.
5. Update only the authorised 023E proof and closeout records.

## Phase 5 - Closeout

1. Produce the four required 023F reviews.
2. Reconcile planning state and next-sprint numbering: remote/provider proof is Sprint 023G.
3. Finish with exactly one allowed outcome.
4. Leave all combined work unstaged and uncommitted unless separately instructed.
5. Do not begin Sprint 023G.

============================================================
FILE: planning/sprints/023F-migration-hash-validator-portability-correction/acceptance.md
============================================================

# Sprint 023F - Migration Hash Validator Portability Correction Acceptance

## Baseline And Root Cause

- [ ] Exact 023E worktree/branch/baseline and controlled dirty manifest are recorded.
- [ ] Index is clean and every existing change maps to approved 023E or applied 023F planning files.
- [ ] Migration `0009` has no Git diff and migrations `0001`–`0018` are otherwise untouched by 023F.
- [ ] Canonical LF hash is exactly `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`.
- [ ] Raw CRLF hash is exactly `B5DE360D33C69F21C8967793AFD66CA670A1FA32672AD60E7A47BD72F56982E3`.
- [ ] Deterministic evidence proves line endings alone caused the mismatch.

## Correction Integrity

- [ ] Maintained validator uses strict UTF-8 and canonicalizes CRLF to LF only.
- [ ] Governed expected hash remains `6DD2238D…`; Windows raw hash is not accepted directly.
- [ ] BOM, invalid UTF-8, arbitrary whitespace, lone CR, content and final-newline changes are not hidden.
- [ ] All prior lookup counts and structural assertions remain unchanged.
- [ ] Validator does not depend on Git, branch/commit, OS special-casing, network or new dependencies.
- [ ] No `.gitattributes`, Git configuration, migration, SQL, product or provider change occurs.

## Focused Proof

- [ ] LF and exact CRLF equivalents yield the same canonicalized hash.
- [ ] Their raw hashes differ.
- [ ] SQL character/content mutation fails.
- [ ] Trailing-space mutation fails.
- [ ] Final-newline mutation fails.
- [ ] UTF-8 BOM addition fails.
- [ ] Invalid UTF-8 fails.
- [ ] Lone carriage-return mutation fails.
- [ ] Temporary artifacts are always cleaned.
- [ ] Corrected maintained validator passes against the unchanged Windows checkout.

## Sprint 023E Revalidation

- [ ] Full static suite passes beyond the former migration-hash gate.
- [ ] Focused 023E migration/evidence tests and Sprint 022 regression pass.
- [ ] JSON, domain, role, Supabase self-tests, encoding and design-system checks pass.
- [ ] TypeScript, ESLint and production build pass.
- [ ] Approved-path, dependency, privacy/secret, original-worktree and `git diff --check` checks pass.
- [ ] 023E evidence records exact rerun commands/results and preserves deferred proof boundaries.
- [ ] If all required gates pass, 023E closes `local-upload-storage-implementation-proven-clean` with Sprint 023F supersession recorded.
- [ ] If another gate fails, 023E remains blocked with the exact independent blocker.

## Scope And Closeout

- [ ] Only approved 023F paths were modified by 023F.
- [ ] Four required reviews and planning reconciliation are complete.
- [ ] No staging, commit, branch/worktree creation, migration application, remote operation, provider contact, dependency installation, deployment, push, merge or Sprint 023G work occurs.
- [ ] Remote/provider follow-up is identified as Sprint 023G.
- [ ] `git diff --check` passes.

## Closeout Outcomes

Close with exactly one:

- `validator-portability-corrected-023E-proven-clean`: canonical integrity remains strict, portability tests pass, the full maintained suite passes, and Sprint 023E is reconciled to its clean local-proof outcome.
- `validator-correction-baseline-blocked-clean`: controlled 023E worktree, unchanged migration, root cause or scope inventory cannot be established; validator remains unchanged.
- `validator-correction-validation-blocked-clean`: candidate correction exists but strict mutation/portability tests, maintained validator, scope or integrity checks fail.
- `validator-corrected-downstream-validation-blocked-clean`: validator and focused portability proof pass, but a separate required Sprint 023E gate still fails and is precisely recorded.

No outcome implies any migration was applied, Storage exists remotely, hosted permissions passed, scanning/sanitisation is operational, CSV is enabled, region/recovery is proven, production is ready, combined work is committed, or Sprint 023G has begun.

============================================================
FILE: planning/sprints/023F-migration-hash-validator-portability-correction/handoff-prompt.md
============================================================

# Sprint 023F - Builder Handoff Prompt

You are Builder for Sprint 023F - Migration Hash Validator Portability Correction.

Apply and verify all four Sprint 023F files in the existing isolated, intentionally uncommitted Sprint 023E worktree at `C:\tmp\pnr-023e-local-upload-storage`. Do not create another branch/worktree. First record the controlled dirty manifest, clean index, baseline `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`, exact 023E attribution, unchanged migration `0009`, and LF/CRLF root-cause proof. Stop before editing if any statement is false.

Preserve canonical migration `0009` hash `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`. Correct only the validator’s platform-dependent hashing: strict UTF-8, normalize CRLF to LF only, then hash canonicalized bytes. Do not accept the Windows raw hash, alter a migration, change `.gitattributes`/Git configuration, weaken the check, depend on Git, or add a dependency.

Add focused temporary-file proof for LF/CRLF equivalence and rejection of content, whitespace, newline, BOM, invalid-UTF-8 and lone-CR mutations. Preserve every existing lookup/structural assertion.

Then rerun the full Sprint 023E validation set. If all required gates pass, update the authorised 023E evidence and closeout to `local-upload-storage-implementation-proven-clean`, explicitly recording that Sprint 023F superseded the initial validator blocker. If another independent gate fails, retain an accurate blocked outcome.

Do not modify 023E product/migration implementation, apply migrations, create Storage, inspect protected values, install dependencies, contact providers, perform remote operations, deploy, stage, commit, push, merge, or begin Sprint 023G. Finish with one allowed 023F outcome and leave all work uncommitted unless separately instructed.
