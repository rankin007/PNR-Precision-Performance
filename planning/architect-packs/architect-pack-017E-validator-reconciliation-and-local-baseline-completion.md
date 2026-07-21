============================================================
FILE: planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/requirements.md
============================================================

# Sprint 017E — Validator Reconciliation And Local Baseline Completion Requirements

## Role And Profile

Builder executes this follow-up sprint under the `strict` workflow profile.

## Context

Sprint 017D closed `baseline-blocked-clean`. Builder proved that 263 exact candidate paths could be staged without protected/local material and passed Pack, JSON, secret, binary, mode, and diff safety checks plus credential-free validation through Sprint 020F. The required Sprint 020G validator then stopped because `scripts/validate-supabase-clean-rebuild-020G.ps1` still requires migration versions exactly `0001` through `0010`, while accepted immutable repository and candidate history now extends through `0012`.

Sprint 017D created no commit, restored the empty index by unstaging only exact manifest paths, and preserved branch `develop`, HEAD `171d3aa4186e04c656a50d91b52b1f086f95f89a`, all working files, and all protected/local exclusions.

## Goal

Reconcile the stale local clean-rebuild validator with the accepted `0001`–`0012` migration ledger, independently prove the correction, then repeat the complete intentional-staging and credential-free validation process and create the two local baseline commits only if every gate passes.

## Source Of Truth

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/DECISIONS.md`
5. `planning/RISKS.md`
6. `planning/QUESTIONS.md`
7. `docs/WORKFLOW_PROFILE.md`
8. `planning/ARCHITECT_BRIEFING.md`
9. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
10. `planning/reviews/017B-repository-reconciliation-inventory.md`
11. `planning/reviews/017B-file-classification.json`
12. `planning/reviews/017C-repository-treatment-and-boundary-reconciliation.md`
13. `planning/reviews/017D-staging-manifest.json`
14. `planning/reviews/017D-precommit-review.md`
15. `planning/reviews/017D-local-baseline-commit-review.md`
16. `planning/sprints/017D-intentional-staging-and-local-baseline-commit/requirements.md`
17. `scripts/validate-supabase-clean-rebuild-020G.ps1`
18. `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`
19. `docs/SPRINT_021_PROGRESS.md`
20. `docs/VALIDATION.md`
21. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
22. the applied 017E four-file sprint set

## Accepted Ledger Authority

The accepted migration ledger is exactly one ordered SQL file for every version `0001` through `0012`, with no duplicate version and no migration after `0012`.

- Sprint 020G originally established candidate ledger `0001`–`0010`.
- Sprints 021 and 021B added and verified immutable migrations `0011` and `0012`.
- 017E must not edit, rename, reorder, regenerate, or reapply any migration.
- 017E must not contact a database or remote service to prove this correction.

## Phase 1 — Narrow Validator Reconciliation

Builder may change `scripts/validate-supabase-clean-rebuild-020G.ps1` only as follows:

1. Change the expected migration version range from `1..10` to `1..12`.
2. Change the corresponding failure message from `0001 through 0010` to `0001 through 0012`.
3. Preserve every other safety assertion, project reference, retired-surface check, prohibited-SQL check, helper-security check, verification-SQL check, documentation identity check, and harness safety check byte-for-byte except for unavoidable line-ending preservation.

No generic “latest migration” logic, directory-count-only assertion, weakened comparison, optional suffix, wildcard ledger, or future-version acceptance is allowed. The validator must continue to fail closed if a version is missing, duplicated, reordered by naming, or added after `0012`.

After the edit and before any staging:

1. inspect the exact validator diff;
2. prove only the two intended semantic changes occurred;
3. run `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-clean-rebuild-020G.ps1`;
4. record the command, exit status, and safe output in the pre-commit review.

If this gate fails, stop without staging or committing and close `validator-reconciliation-blocked-clean`.

## Phase 2 — Fresh Intentional Staging

Do not reuse the 017D candidate list blindly. Create `planning/reviews/017E-staging-manifest.json` from current non-ignored Git state after Pack application and the validator correction.

The manifest must contain:

- schema version and capture timestamp;
- opening branch, full HEAD, local-ref ahead/behind relation, and empty-index evidence;
- exact literal candidate path list;
- one group per path: `application-design`, `auth-role`, `database-migrations-verification`, `validation-scripts-tests`, `planning-evidence`, `reference-scaffold`, or `repository-method-config`;
- originating sprint(s), opening Git state, and risk level;
- named mandatory exclusions;
- candidate, exclusion, and per-group totals.

Every visible non-ignored status entry after creation of the manifest and pre-commit review must be a candidate. Include the 017E Pack, applied sprint files, manifest, pre-commit review, validator correction, all preserved 017D closeout artifacts, and all previously accepted candidate files.

Every candidate must be an exact existing file path. No wildcard, directory path, implicit recursion, ignored path, protected path, duplicate, missing path, or unsupported deletion is allowed.

Stage candidates one exact literal path at a time. Never use `git add .`, `git add -A`, a directory path, wildcard, or stage-then-unstage exclusion strategy.

## Mandatory Exclusions

The following must not be opened, printed, hashed, copied, staged, committed, or scanned except for filename/existence/ignore-state checks expressly allowed here:

- `.env`
- `.env.local`
- `.env.*.local`
- `.env.vercel.production`
- `.release-main/**`
- `.claude/**`
- `planning/reviews/021M-supabase-support-escalation.md`
- `.next/**`
- `build/**`
- `node_modules/**`
- `.validation-logs/**`
- `.logs/**`
- `supabase/.temp/**`
- `supabase/.temp-old-link/**`
- `desktop.ini`
- dependency caches, generated logs, local IDE state, credentials, tokens, cookies, sessions, and protected browser/process material

The exact anchored ignore rules for root `.release-main/`, root `.claude/`, and the restricted 021M support record must remain present once each. Do not force-add ignored content.

## Staged Safety Gates

Before Commit 1:

1. Prove staged paths equal manifest candidate paths exactly.
2. Prove no visible non-ignored candidate remains unstaged or untracked.
3. Prove exclusions are absent from the index.
4. Parse every staged JSON file.
5. Validate every staged Architect Pack.
6. Run a high-confidence staged filename/blob secret scan without emitting matched values; findings report path and category only and block the commit.
7. Confirm expected file modes and no accidental executable changes.
8. Confirm the supplied Sprint-list DOCX is the only staged binary unless a separately classified binary has named 017B evidence.
9. Run `git diff --cached --check`.
10. Record staged statistics.
11. Review and name at least one representative safe text diff from every non-empty manifest group; record the path and review result without reproducing protected or secret-bearing content.

## Required Credential-Free Validation

Run from the project root using declared local dependencies:

1. Validate the current 017E Pack.
2. Validate every staged Architect Pack.
3. Parse every staged JSON file.
4. `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts`
5. `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts`
6. `powershell -ExecutionPolicy Bypass -File scripts/validate-design-system-019.ps1`
7. `powershell -ExecutionPolicy Bypass -File scripts/validate-biochemistry-remote-readiness.ps1`
8. `powershell -ExecutionPolicy Bypass -File scripts/validate-database-audit-020C.ps1`
9. `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-structural-audit-020E.ps1`
10. `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-replacement-audit-020F.ps1`
11. `powershell -ExecutionPolicy Bypass -File scripts/validate-supabase-clean-rebuild-020G.ps1`
12. `powershell -ExecutionPolicy Bypass -File scripts/validate-role-matrix-021.ps1`
13. `node scripts/test-role-matrix-021.mjs`
14. Run every credential-free `scripts/test-supabase-*.mjs` self-test that neither contacts a remote service nor requires protected input. Do not run `scripts/supabase-*.mjs` execution harnesses.
15. `npm run lint`
16. `node_modules/node/bin/node.exe node_modules/typescript/bin/tsc --noEmit --incremental false`
17. `npm run build`
18. Repeat staged-set equality, exclusions, secret/binary/mode review, JSON checks, and `git diff --cached --check` after validation.

### Build Reliability Rule

If the first build exits during page generation without a source, type, or lint error:

1. record complete non-secret failure phase and exit evidence;
2. prove no source or staged content changed;
3. run one unchanged diagnostic/retry build;
4. accept only if the retry passes and existing evidence supports the known intermittent worker-exit class;
5. otherwise block the commit.

Do not loop retries.

Any missing, unsafe, unexpectedly remote, or failed validation stops the sprint before Commit 1. Do not fix another file outside the approved edit set.

## Commit Structure

### Commit 1 — Content Baseline

Subject:

`chore: establish post-sprint-021 repository baseline`

Commit 1 contains exactly the validated 017E manifest candidate set, including the validator correction and initial 017E planning/evidence. It must not contain outcome claims that depend on Commit 1 succeeding.

Create Commit 1 only if branch and opening HEAD remain unchanged and every Phase 1, manifest, staging, safety, and credential-free validation gate passes.

### Commit 2 — Sprint Closeout

Subject:

`docs: close sprint 017E repository baseline`

After Commit 1, edit and stage only the approved closeout files. Record Commit 1’s exact hash, parent, subject, file count, statistics, validation, exclusions, and residual ignored/local state. Validate the closeout-only staged set, then create Commit 2. Do not amend Commit 1.

## Approved Edit Set

Builder may create or edit only:

- `scripts/validate-supabase-clean-rebuild-020G.ps1`, only for the two Phase 1 semantic changes
- `planning/reviews/017E-staging-manifest.json`
- `planning/reviews/017E-precommit-review.md`
- `planning/reviews/017E-local-baseline-completion-review.md`
- `planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/acceptance.md`, completion annotations only
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, only for a genuinely new durable decision
- `planning/RISKS.md`, only for new or materially changed risk
- `planning/QUESTIONS.md`, only to close/update the 017D validator question and baseline status

All other candidate files may be staged and committed exactly as found after validation but must not be edited in 017E.

## Out Of Scope

Builder must not:

- edit migrations, Supabase verification SQL, proof harnesses, application code, auth/role code, tests, package files, general documentation, or historical evidence to make validation pass;
- weaken or generalize the validator beyond exact `0001`–`0012` reconciliation;
- apply, repair, replay, rename, squash, or mutate migration history;
- inspect protected file contents;
- delete, clean, reset, restore working content, move, or archive files;
- amend, rebase, squash, cherry-pick, tag, switch branches, or rewrite existing commits;
- push, fetch, pull, create a PR, merge, deploy, release, or contact a remote service;
- contact Supabase, Vercel, Stripe, GitHub, DNS, email, or production systems;
- run hosted Auth/JWT/RLS reproduction or any protected-input execution harness;
- change product behavior, design, permissions, thresholds, recommendations, hosted configuration, billing, or production state.

## Closeout Review

`planning/reviews/017E-local-baseline-completion-review.md` must include:

- opening and final branch, full HEAD, local-ref ahead/behind, index, and visible-status evidence;
- exact validator pre/post semantic change and independent pass;
- manifest and group totals;
- exact/named exclusions and ignore-state evidence;
- representative reviewed path and result for every non-empty group;
- staged Pack, JSON, secret, binary, mode, and diff evidence;
- complete validation command/result table;
- Commit 1 hash, parent, subject, file count, and statistics;
- Commit 2 subject and exact closeout-only path list;
- final Commit 2 hash in the Builder report;
- residual ignored/local-only paths by name only;
- manual interventions, if any;
- explicit confirmation that no remote, hosted, production, provider, deployment, or product-behavior action occurred.

## Failure And Manual Intervention

If Phase 1 fails before staging, preserve the empty index and close `validator-reconciliation-blocked-clean`.

If any gate fails after staging but before Commit 1, unstage only exact manifest paths using literal pathspecs, preserve all working files, prove the index is empty, and close `baseline-blocked-clean`.

If Commit 1 succeeds but Commit 2 cannot safely complete, preserve Commit 1, do not amend/reset/revert it, leave exact closeout changes recorded, and close `baseline-committed-closeout-blocked`.

For every manual intervention, record:

- what is blocked;
- evidence already checked;
- exact user/manual action required;
- numbered completion steps;
- what Builder will verify afterward.

## Completion Outcomes

- `local-baseline-complete`: validator reconciliation passes, both commits succeed in order, final index is empty, and no non-ignored status entries remain.
- `validator-reconciliation-blocked-clean`: Phase 1 cannot pass; no staging or commit occurred and the index remains empty.
- `baseline-blocked-clean`: no commit exists; exact manifest paths were unstaged and working files preserved.
- `baseline-committed-closeout-blocked`: Commit 1 exists and is preserved, but Commit 2 did not complete safely.

No outcome implies push, PR, remote backup, deployment, provider resolution, authenticated readiness, or production readiness.

============================================================
FILE: planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/blueprint.md
============================================================

# Sprint 017E — Validator Reconciliation And Local Baseline Completion Blueprint

## Intent

Correct one stale local validation assumption, prove that correction without remote access, and then repeat the entire repository-baseline gate from current state. The validator correction is necessary but never sufficient for a commit.

## Execution Sequence

1. Read all required authority, 017B–017D evidence, accepted ledger evidence, and applied 017E files.
2. Capture branch, full HEAD, local upstream relation, empty index, and exact visible status.
3. Verify local-only boundaries and the restricted support-record ignore rule by path/existence/ignore state only.
4. Verify the local migration filenames are exactly `0001` through `0012` without reading protected material or contacting a remote.
5. Patch only the expected range and matching failure message in the Sprint 020G validator.
6. Review the exact validator diff and prove no other semantic line changed.
7. Run the corrected validator independently before staging.
8. If Phase 1 passes, construct a fresh exact 017E staging manifest and pre-commit review from current non-ignored status.
9. Validate completeness, exact paths, groups, provenance, risk, totals, existence, duplicates, ignore state, and exclusions.
10. Stage each manifest path separately with literal pathspec handling.
11. Prove index/manifest equality and zero remaining non-ignored candidate paths.
12. Run staged Pack/JSON/secret/binary/mode/diff safety gates.
13. Review and record at least one named representative safe diff per non-empty group.
14. Run the full credential-free validation suite from the beginning.
15. Repeat staged-set and safety gates after validation.
16. Reconfirm branch and pre-commit HEAD.
17. Create Commit 1 with the exact required subject.
18. Record Commit 1 hash and prove its parent is the opening HEAD.
19. Create the final 017E review and update only approved closeout planning files.
20. Annotate acceptance with evidence.
21. Stage only the exact closeout files; parse JSON, scan safely, inspect the staged diff, and run `git diff --cached --check`.
22. Create Commit 2 with the exact required subject.
23. Prove final branch, Commit 2 parentage, empty index, zero non-ignored status entries, and preserved ignored/local-only paths.

## Validator-Diff Proof

The pre-commit review must show, without reproducing unrelated file content:

- old expected range: `1..10`;
- new expected range: `1..12`;
- old failure ledger: `0001 through 0010`;
- new failure ledger: `0001 through 0012`;
- changed semantic lines: exactly two;
- every other validator line: unchanged by a normalized line comparison;
- corrected validator exit: pass.

Line-ending-only noise must not be accepted as evidence of a broad rewrite. Preserve the existing file style where practical.

## Manifest Reconciliation

Compare the fresh 017E manifest with 017D at a summary level:

- explain additions from the 017D closeout, 017E Pack/applied files, fresh manifest/reviews, and validator correction;
- explain any removal;
- do not copy the 017D path list without current status reconciliation;
- include all current visible non-ignored files exactly once;
- keep protected/local paths excluded before staging.

## Representative Review Matrix

For every non-empty group, record:

| Group | Required evidence |
|---|---|
| `application-design` | named safe application/UI path and diff result |
| `auth-role` | named auth/role path and diff result without credential content |
| `database-migrations-verification` | named migration/verification path and immutable-history/safety result |
| `validation-scripts-tests` | validator correction plus one named safe test/script result |
| `planning-evidence` | named Pack/sprint/review path and consistency result |
| `reference-scaffold` | samples path and DOCX binary/hash/path result |
| `repository-method-config` | named method/config path and diff result |

Do not paste large diffs into the durable review.

## Failure Handling

Before staging: stop with the empty index preserved.

After staging but before Commit 1: unstage only literal manifest paths, prove empty index, preserve all working files, and record the blocker.

After Commit 1: never amend, reset, remove, or rewrite it. Record exact closeout recovery if Commit 2 cannot finish.

## Remote Boundary

017E ends with local commits only. Remote review and handoff require a later Sprint 017 follow-up Pack.

============================================================
FILE: planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/acceptance.md
============================================================

# Sprint 017E — Validator Reconciliation And Local Baseline Completion Acceptance

## Opening State

- [ ] Builder read all required authority, 017B–017D evidence, accepted ledger evidence, and applied 017E files.
- [ ] Opening branch is `develop`; full HEAD and local-ref ahead/behind are recorded.
- [ ] Opening index is empty.
- [ ] Opening visible status is captured exactly.
- [ ] Root `.release-main/`, root `.claude/`, and the restricted 021M support record remain ignored by their exact anchored rules.
- [ ] Protected/local contents were not opened, printed, hashed, copied, staged, or scanned.

## Validator Reconciliation

- [ ] Local migration filenames are exactly one each for `0001` through `0012`, with no later version.
- [ ] Validator expected range changes only from `1..10` to `1..12`.
- [ ] Validator failure message changes only from `0001 through 0010` to `0001 through 0012`.
- [ ] Normalized diff proves no other validator semantic line changed.
- [ ] All existing safety assertions remain intact.
- [ ] Corrected Sprint 020G validator passes independently before staging.
- [ ] No migration, verification SQL, harness, remote state, or historical evidence was changed.

## Manifest And Staging

- [ ] Fresh 017E manifest parses and contains every required field.
- [ ] Every current visible non-ignored path is represented exactly once.
- [ ] Every candidate is an exact existing file path with approved group, provenance, opening state, and risk.
- [ ] No candidate contains a wildcard, directory recursion, ignored/protected path, duplicate, missing file, or unsupported deletion.
- [ ] JSON and Markdown totals agree.
- [ ] Differences from the 017D manifest are explained.
- [ ] No broad staging command was used.
- [ ] Every staged path came from the exact manifest using literal pathspec handling.
- [ ] Staged paths equal manifest paths exactly.
- [ ] No non-ignored candidate remains unstaged or untracked.
- [ ] Mandatory exclusions never entered the index.

## Staged Safety

- [ ] Every staged Architect Pack passes format validation.
- [ ] Every staged JSON file parses.
- [ ] High-confidence staged secret scan passes without emitting values.
- [ ] Binary and mode review passes; the supplied DOCX is the only expected binary unless separately evidenced.
- [ ] `git diff --cached --check` passes.
- [ ] Staged statistics are recorded.
- [ ] At least one named representative safe diff from every non-empty manifest group is reviewed and recorded.

## Credential-Free Validation

- [ ] Current 017E Pack passes.
- [ ] Biochemistry scoring fixtures pass.
- [ ] Biochemistry recommendation fixtures pass.
- [ ] Sprint 019 design-system validation passes.
- [ ] Sprint 020 remote-readiness static validation passes.
- [ ] Sprint 020C database-audit static validation passes.
- [ ] Sprint 020E structural-audit static validation passes.
- [ ] Sprint 020F replacement-audit static validation passes.
- [ ] Corrected Sprint 020G clean-rebuild validation passes.
- [ ] Sprint 021 role-matrix static validation passes.
- [ ] Sprint 021 focused role/comment tests pass.
- [ ] Every applicable credential-free `test-supabase-*.mjs` self-test passes without remote/protected input.
- [ ] ESLint passes.
- [ ] TypeScript passes with project-local dependencies.
- [ ] Production build passes under the bounded unchanged-retry rule.
- [ ] No remote/protected execution harness was run.
- [ ] All staged equality and safety gates pass again after validation.

## Commit 1

- [ ] Branch and pre-commit HEAD still match opening evidence.
- [ ] Commit 1 subject is exactly `chore: establish post-sprint-021 repository baseline`.
- [ ] Commit 1 parent is the opening HEAD.
- [ ] Commit 1 contains exactly the validated manifest set.
- [ ] Commit 1 hash, parent, file count, statistics, validation, and exclusions are recorded.
- [ ] No amend, reset, rebase, squash, cherry-pick, tag, branch switch, or remote operation occurred.

## Commit 2 And Closeout

- [ ] Only approved closeout files changed after Commit 1.
- [ ] Commit 2 staged paths equal the exact recorded closeout list.
- [ ] Closeout JSON, safety scan, staged diff, and `git diff --cached --check` pass.
- [ ] Commit 2 subject is exactly `docs: close sprint 017E repository baseline`.
- [ ] Commit 2 parent is Commit 1.
- [ ] Final branch remains `develop`.
- [ ] Final HEAD is Commit 2 and its hash is reported.
- [ ] Final index is empty.
- [ ] Final `git status --short` contains no non-ignored entries.
- [ ] Local-only/protected paths remain present and ignored as applicable.
- [ ] Closeout contains no remote, provider-resolution, authenticated-readiness, deployment, or production-readiness claim.
- [ ] Final outcome uses exactly one permitted outcome.

## Manual Intervention

For every blocker:

- [ ] blocked condition is stated;
- [ ] checked evidence is stated;
- [ ] exact user/manual action is stated;
- [ ] numbered instructions are stated;
- [ ] Builder’s later verification is stated.

If no intervention is required, annotate this section not applicable with evidence.

## Outcomes

- `local-baseline-complete`
- `validator-reconciliation-blocked-clean`
- `baseline-blocked-clean`
- `baseline-committed-closeout-blocked`

============================================================
FILE: planning/sprints/017E-validator-reconciliation-and-local-baseline-completion/handoff-prompt.md
============================================================

# Sprint 017E — Builder Handoff Prompt

You are Builder for Sprint `017E-validator-reconciliation-and-local-baseline-completion` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, and execute only from those applied files.

## Mission

Correct the stale Sprint 020G validator from exact ledger `0001`–`0010` to accepted exact ledger `0001`–`0012`, prove that narrow correction independently, then repeat the full exact-staging and credential-free validation process and create two local commits only if every gate passes:

1. `chore: establish post-sprint-021 repository baseline`
2. `docs: close sprint 017E repository baseline`

## Non-Negotiable Boundaries

- Change only the validator’s expected range and matching failure message.
- Do not edit, rename, reorder, replay, repair, or apply migrations.
- Never use broad or directory staging.
- Never stage protected/local-only content, even temporarily.
- Do not inspect protected contents.
- Do not edit other files to make validation pass.
- Do not run remote/protected execution harnesses.
- Do not amend, reset, rebase, squash, switch branches, push, fetch, pull, create a PR, deploy, or contact external systems.

## Required Sequence

1. Capture and verify opening state and exclusions.
2. Make and independently validate the exact two-line semantic validator correction.
3. Build a fresh current-state manifest and pre-commit review.
4. Stage exact literal manifest paths only.
5. Prove staged equality, exclusions, secret/binary/mode safety, Pack/JSON checks, and named representative group reviews.
6. Run the full credential-free suite from the beginning.
7. Create Commit 1 only after every gate passes.
8. Produce the closeout review and approved planning updates.
9. Stage and validate only exact closeout files.
10. Create Commit 2 and prove a clean non-ignored working tree and empty index.

## Required Outputs

- `planning/reviews/017E-staging-manifest.json`
- `planning/reviews/017E-precommit-review.md`
- `planning/reviews/017E-local-baseline-completion-review.md`
- updated approved closeout planning files and annotated acceptance

## Failure Handling

Before staging, preserve the empty index. After staging but before Commit 1, unstage only exact manifest paths and preserve all working files. After Commit 1, preserve it without amend/reset/revert if closeout cannot finish.

Record full manual-intervention instructions for every blocker.

## Closeout

Report both commit hashes only if both commits succeed. State explicitly that no push, PR, remote backup, hosted change, provider resolution, authenticated proof, deployment, or production-readiness result occurred.
