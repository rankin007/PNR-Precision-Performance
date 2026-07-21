# Architect Pack 017D — Intentional Staging And Local Baseline Commit

Created: 2026-07-22
Workflow profile: strict
Architect outcome: Builder handoff for validated intentional staging and two local baseline commits.

============================================================
FILE: planning/sprints/017D-intentional-staging-and-local-baseline-commit/requirements.md
============================================================

# Sprint 017D — Intentional Staging And Local Baseline Commit Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## Context

Sprint 017B closed `inventory-complete` after classifying every repository status entry. Sprint 017C closed `treatment-complete` after:

- preserving `.release-main/` behind the exact root ignore rule `/.release-main/`;
- preserving `.claude/` behind the exact root ignore rule `/.claude/`;
- retaining `samples/README.md` unchanged as a project-scaffold staging candidate; and
- moving the supplied sprint-list DOCX byte-identically to `references/client-docs/Sprint list 190726.docx`.

The working tree contains accepted work and durable evidence from Sprints 018 through 021M plus the 017B–017D repository-control series. The Git index is empty. Branch `develop` remains at baseline HEAD `171d3aa` and is three commits ahead of the locally recorded `origin/develop` reference.

Sprint 021M remains `provider-escalation-required-clean`. The restricted provider-escalation record contains protected correlations and must remain local, ignored, and unstaged.

## Goal

Turn the classified and reconciled post-Sprint-021 working tree into a validated, reviewable local Git baseline using intentional allowlisted staging, exact exclusions, one content-baseline commit, and one planning-closeout commit, without contacting a remote or changing product/hosted behavior.

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
13. `docs/VALIDATION.md`
14. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
15. `docs/SPRINT_021_PROGRESS.md`
16. `planning/sprints/017D-intentional-staging-and-local-baseline-commit/requirements.md`
17. `planning/sprints/017D-intentional-staging-and-local-baseline-commit/blueprint.md`
18. `planning/sprints/017D-intentional-staging-and-local-baseline-commit/acceptance.md`

Builder must also inspect the approved-file sets and closeout evidence for Sprints 018 through 021M as needed to confirm the staging manifest.

## Questions And Answers

Q: Why use two commits instead of one?
A: The first commit captures the fully validated post-021 project baseline. The second captures the 017D closeout files after they can truthfully record the first commit hash and final evidence. This avoids leaving required closeout records dirty.

Q: Should the accumulated work be split into one commit per historical sprint?
A: No. The work now has cumulative cross-sprint planning, bootstrap, role, and validation dependencies. Reconstructing historical commits would increase risk and create intermediate states that were not independently validated. Use one coherent content baseline plus one closeout commit.

Q: May Builder use `git add .`, `git add -A`, or another broad staging command?
A: No. Builder must construct and review an exact path manifest, exclude protected/local-only paths before staging, and stage only manifest entries.

Q: Should the protected 021M escalation record be committed?
A: No. Add the exact anchored ignore rule `/planning/reviews/021M-supabase-support-escalation.md`, preserve the local file unchanged, and never stage it even transiently.

Q: Should the Sprint-list DOCX and `samples/README.md` be included?
A: Yes. Include the unchanged samples-boundary scaffold and relocated supplied planning-source DOCX in the first commit after validating their recorded hashes and paths.

Q: May Builder push or create a PR after the commits?
A: No. Remote handoff remains Sprint 017E and requires its own Pack.

## Commit Structure

### Commit 1 — Content baseline

Subject:

`chore: establish post-sprint-021 repository baseline`

This commit contains:

- all tracked modifications classified by 017B as accepted sprint work or planning/evidence;
- all untracked accepted application, component, library, documentation, migration, verification, test, script, Pack, applied-sprint, and review files from Sprints 018 through 021M;
- all 017B and 017C Pack/applied/review records;
- this 017D Architect Pack and applied four-file sprint set;
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `samples/README.md`;
- `references/client-docs/Sprint list 190726.docx`;
- `.gitignore`, including the 017C root rules and the exact protected 021M record rule;
- the initial 017D staging manifest and pre-commit review.

Commit 1 must not contain final 017D outcome claims that depend on the commit succeeding.

### Commit 2 — Planning closeout

Subject:

`docs: close sprint 017D repository baseline`

This commit contains only:

- `planning/reviews/017D-local-baseline-commit-review.md`
- completion annotations in `planning/sprints/017D-intentional-staging-and-local-baseline-commit/acceptance.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, if needed
- `planning/RISKS.md`, if needed
- `planning/QUESTIONS.md`, if needed

Commit 2 records Commit 1’s exact hash, subject, validation, exclusions, and resulting status. The final Builder report records Commit 2’s hash after it succeeds; Commit 2 does not need to contain its own hash.

## Mandatory Exclusions

The following must not be staged, committed, printed, hashed, copied, or exposed except for safe filename/ignore-state checks explicitly allowed below:

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

Builder may confirm only that protected/local paths exist or are ignored. Do not inspect their contents.

## In Scope

Builder may:

- capture branch, HEAD, upstream relation from local refs, index, and working-tree status;
- add the exact anchored protected-review ignore rule to `.gitignore`;
- create `planning/reviews/017D-staging-manifest.json` containing exact candidate paths and group metadata but no protected paths or secret values;
- create `planning/reviews/017D-precommit-review.md` with group totals, provenance, exclusions, and validation plan;
- stage only exact reviewed manifest paths;
- inspect staged names, statuses, statistics, modes, and safe text diffs;
- run staged-content safety scans without printing matched secret values;
- run the required credential-free validation suite;
- unstage all Sprint 017D-staged files with `git restore --staged -- <exact paths>` if a gate fails, leaving working files intact;
- create Commit 1 only after all gates pass;
- update and stage only the exact closeout files for Commit 2;
- validate the closeout-only staged set and create Commit 2;
- verify final repository status contains no non-ignored tracked or untracked entries.

## Out Of Scope

Builder must not:

- use broad staging commands;
- stage protected/local-only material even temporarily;
- edit product code, migrations, scripts, tests, packages, general documentation, or historical evidence merely to make validation pass;
- rewrite, squash, amend, rebase, reorder, cherry-pick, or otherwise alter existing commits;
- push, fetch, pull, create a PR, merge, tag, release, or change branches;
- delete, move, archive, restore, or reset working files;
- parse, convert, or re-save the supplied DOCX;
- traverse or mutate `.release-main/` or `.claude/`;
- open protected environment files or the restricted 021M escalation record;
- contact Supabase, Vercel, Stripe, GitHub, DNS, email, or another remote service;
- run hosted Auth/JWT reproduction, remote RLS tests, migrations, deployment, production mutation, billing, checkout, webhook, or public-reopening actions;
- change product behavior, design, domain rules, thresholds, recommendations, permissions, or provider configuration.

## Approved File Set

Builder may create or edit:

- `.gitignore`, only for the exact protected-review rule if absent
- `planning/reviews/017D-staging-manifest.json`
- `planning/reviews/017D-precommit-review.md`
- `planning/reviews/017D-local-baseline-commit-review.md`
- `planning/sprints/017D-intentional-staging-and-local-baseline-commit/acceptance.md`, completion annotations only
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, only for genuinely new durable decisions
- `planning/RISKS.md`, only for new or materially changed risks
- `planning/QUESTIONS.md`, only to close or update repository-baseline questions

All other candidate files may be staged and committed exactly as found after classification and validation, but must not be edited in 017D.

## Staging Manifest Requirements

`planning/reviews/017D-staging-manifest.json` must include:

- schema version;
- capture timestamp;
- opening branch and HEAD;
- exact candidate path list;
- group for every path: `application-design`, `auth-role`, `database-migrations-verification`, `validation-scripts-tests`, `planning-evidence`, `reference-scaffold`, or `repository-method-config`;
- originating sprint(s);
- tracked/untracked state at opening;
- risk level;
- exact exclusion list;
- candidate and exclusion totals.

Requirements:

- each candidate path is exact; no globs, directory wildcards, or implicit recursion markers;
- every visible Git status entry after Pack application is either a candidate or a named mandatory exclusion;
- no candidate is ignored;
- no candidate is a protected/local-only path;
- no duplicate candidate exists;
- every candidate exists in the working tree or is a supported tracked deletion; 017D currently expects zero tracked deletions;
- the JSON and pre-commit Markdown totals agree.

## Staged Safety Gates

Before Commit 1:

1. Compare staged paths exactly with the manifest candidate list.
2. Confirm there are zero unstaged/untracked non-ignored candidate paths.
3. Confirm mandatory exclusions are absent from the index.
4. Confirm staged files contain no environment files, private keys, credential stores, protected support record, dependency output, caches, or nested repository metadata.
5. Run a high-confidence secret scan over staged filenames and staged blobs without echoing matched values. Potential findings must report path and rule category only, then block the commit pending safe review.
6. Confirm file modes are expected and no accidental executable/binary mode changes occurred.
7. Confirm the DOCX is the only intentionally staged binary unless another classified binary is explicitly supported by 017B.
8. Run `git diff --cached --check`.
9. Review staged statistics and representative safe diffs for every group.

Do not use a broad stage-then-unstage exclusion strategy. Exclusions must never enter the index.

## Required Validation Before Commit 1

Run from the project root using declared/local dependencies:

1. `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-017D-intentional-staging-and-local-baseline-commit.md --check`
2. Check every staged Architect Pack with `node scripts/apply-architect-pack.js <pack> --check`.
3. Parse every staged `.json` file.
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
14. Run every credential-free `scripts/test-supabase-*.mjs` self-test that does not contact a remote service or require protected input. Do not run `scripts/supabase-*.mjs` execution harnesses.
15. `npm run lint`
16. `node_modules/node/bin/node.exe node_modules/typescript/bin/tsc --noEmit --incremental false`
17. `npm run build`
18. Staged safety gates and `git diff --cached --check`.

### Build reliability rule

If the first build exits during page generation without a source/type/lint error:

1. record complete non-secret failure phase and exit evidence;
2. confirm no source or staged content changed;
3. run one unchanged diagnostic/retry build;
4. accept only if the retry passes and the known intermittent worker-exit classification is supported;
5. otherwise block the commit.

Do not loop retries or hide a persistent failure.

If a validation command is missing, unsafe, unexpectedly remote, or fails, stop before committing. Record exact evidence and manual intervention; do not fix it outside this sprint’s approved file set.

## Commit Rules

### Commit 1 gate

Create Commit 1 only when:

- manifest completeness and exclusions pass;
- full credential-free validation passes;
- staged secret/safety review passes;
- staged paths equal the exact candidate manifest;
- branch and pre-commit HEAD remain unchanged;
- no remote action occurred.

Record Commit 1’s full hash immediately after creation.

### Commit 2 gate

After Commit 1:

1. create/update only the approved closeout files;
2. record Commit 1 hash, subject, parent, validation, staged groups, exclusions, and residual ignored/local state;
3. stage only the exact Commit 2 file set;
4. parse JSON, run safe secret scan, inspect staged diff, and run `git diff --cached --check`;
5. create Commit 2;
6. verify final index is empty and no non-ignored status entries remain.

Do not amend Commit 1 to add closeout evidence.

## Required Closeout Output

`planning/reviews/017D-local-baseline-commit-review.md` must include:

- opening branch, HEAD, upstream relation from local refs, and status counts;
- manifest group counts and exact exclusions;
- Commit 1 hash, subject, parent, file count, and diff statistics;
- validation command/result table;
- staged secret-safety and binary/mode review;
- Commit 2 subject and intended closeout-only file list;
- final branch, HEAD, ahead/behind from local refs, index state, and status state;
- residual ignored/local-only paths by name only;
- manual interventions, if any;
- explicit confirmation of no remote, hosted, production, or product-behavior action;
- recommendation for optional Sprint 017E.

## Manual Intervention Rule

Whenever something required fails or needs user/manual input, record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- step-by-step instructions;
- what Builder will verify afterward.

If Commit 1 has not been created, unstage only the exact manifest paths and close `baseline-blocked-clean`.

If Commit 1 succeeds but Commit 2 is blocked, do not amend, reset, or remove Commit 1. Preserve closeout changes unstaged, record exact recovery instructions, and close `baseline-committed-closeout-blocked`.

## Completion Outcomes

- `local-baseline-complete`: both commits succeed, the index is empty, and no non-ignored status entries remain.
- `baseline-blocked-clean`: no commit was created; index is restored to its opening empty state and working files are preserved.
- `baseline-committed-closeout-blocked`: Commit 1 exists but Commit 2 could not safely complete; exact closeout recovery is recorded.

No outcome implies push, PR, remote backup, deployment, production readiness, or resolution of the Supabase provider issue.

============================================================
FILE: planning/sprints/017D-intentional-staging-and-local-baseline-commit/blueprint.md
============================================================

# Sprint 017D — Intentional Staging And Local Baseline Commit Blueprint

## Intent

Convert the verified 017B/017C repository state into a clean local baseline without reconstructing historical commits, staging protected material, or expanding into remote handoff.

## Execution Plan

1. Read all required authority, inventory, treatment, validation, and applied 017D files.
2. Capture opening branch, full HEAD, local-ref upstream relation, empty index evidence, and porcelain status.
3. Verify 017C dispositions still hold:
   - `.release-main/` and `.claude/` exist and are root-ignored;
   - `samples/README.md` remains at the recorded hash and is unignored;
   - relocated DOCX remains at the recorded size/hash and is unignored;
   - restricted 021M support record exists locally and is untracked before the new exact ignore rule.
4. Add exactly `/planning/reviews/021M-supabase-support-escalation.md` to `.gitignore` using a narrow patch. Do not open the protected record.
5. Create the exact JSON staging manifest from current status plus the 017B classification:
   - include the 017D Pack and applied sprint files;
   - include the manifest and pre-commit review themselves;
   - exclude every mandatory exclusion before staging;
   - expand all candidate directories to exact file paths.
6. Validate manifest completeness, enum/group integrity, duplicates, path existence, ignore state, exclusions, and totals.
7. Create the pre-commit review with group counts, risk summary, exact exclusions, and validation plan.
8. Stage candidates only:
   - iterate exact manifest paths;
   - use literal pathspec handling;
   - stop on the first failure;
   - never stage a directory, wildcard, root dot, or exclusion.
9. Compare index paths byte-for-byte with the manifest candidate list.
10. Perform staged safety gates, staged statistics, modes/binaries, safe representative diffs, JSON parse, Pack checks, and secret-pattern checks.
11. Run the full credential-free validation suite.
12. Reconfirm staged paths and working-tree completeness after validation. Generated ignored files do not affect the gate.
13. Create Commit 1 with the exact subject.
14. Record Commit 1 hash and verify its parent is the opening HEAD.
15. Produce final 017D review and update only approved closeout planning files.
16. Annotate acceptance criteria with evidence.
17. Stage only the exact closeout set and validate it.
18. Create Commit 2 with the exact subject.
19. Verify:
   - branch remains `develop`;
   - final HEAD is Commit 2;
   - Commit 2 parent is Commit 1;
   - index is empty;
   - `git status --short` has no non-ignored entries;
   - local-only and protected paths remain present/ignored;
   - no remote operation occurred.

## Manifest Construction Safety

- Use current porcelain status and `git ls-files --others --exclude-standard` as the visible-state source.
- Parse status without losing spaces, brackets, parentheses, or Unicode characters.
- Treat the relocated DOCX as one exact literal path.
- Do not use console-rendered status text as a shell command.
- Do not infer exclusions from file extensions alone.
- Compare the final candidate set against the 017B JSON records and explain any count change caused by 017C, Pack application, or new 017D outputs.
- Store paths only; do not store file contents, hashes of protected files, or secret scan matches.

## Commit 1 Review Groups

### `application-design`

App routes, UI components, domain presentation, design tokens, Tailwind, public gate presentation, and biochemistry capture/results surfaces.

### `auth-role`

Auth context/bootstrap, navigation/access changes, definitive role matrix, and supported application permission code.

### `database-migrations-verification`

Supabase bootstrap/config, migrations 0010–0012, structural tests, and verification SQL.

### `validation-scripts-tests`

Credential-free validators, proof harnesses, and harness self-tests. Execution harnesses may be committed as completed-sprint evidence/code but must not be run when they require protected input or remote access.

### `planning-evidence`

Architect Packs, applied sprint files, reviews, state/status/schedule/briefing, decisions/risks/questions, and supporting project documentation, excluding the protected 021M escalation record.

### `reference-scaffold`

`samples/README.md` and the relocated supplied Sprint-list DOCX.

### `repository-method-config`

Agent/method/templates, `.gitignore`, package metadata, and repository workflow configuration.

## Failure Handling Before Commit 1

On any failure:

1. stop;
2. record safe evidence;
3. unstage only exact manifest candidates with `git restore --staged -- <exact paths>`;
4. prove the index is empty;
5. preserve all working files;
6. record manual intervention;
7. close `baseline-blocked-clean`.

Do not reset, restore working-tree content, delete, or rewrite files.

## Failure Handling After Commit 1

If closeout cannot finish:

- preserve Commit 1;
- do not amend, reset, revert, or delete it;
- leave closeout files unstaged unless exact safe unstaging is required;
- record Commit 1 hash and exact remaining steps;
- close `baseline-committed-closeout-blocked`.

## 017E Handoff

If 017D closes `local-baseline-complete`, optional 017E may:

- verify remote destination and branch strategy;
- inspect commits for remote-review suitability;
- push the current branch;
- create a draft PR or equivalent review handoff;
- record remote checks and links.

017D must not perform any of those actions.

============================================================
FILE: planning/sprints/017D-intentional-staging-and-local-baseline-commit/acceptance.md
============================================================

# Sprint 017D — Intentional Staging And Local Baseline Commit Acceptance

## Repository And Manifest

- [ ] Builder read all required authority, 017B/017C evidence, validation guidance, and applied 017D files.
- [ ] Opening branch, full HEAD, local-ref upstream relation, index, and status counts are recorded.
- [ ] Opening Git index is empty.
- [ ] 017C local-only, samples, and DOCX dispositions still pass before staging.
- [ ] `.gitignore` contains exactly one anchored `/planning/reviews/021M-supabase-support-escalation.md` rule.
- [ ] The restricted 021M escalation record remains local, unchanged, ignored by the exact rule, and never enters the index.
- [ ] The JSON manifest parses and contains all required schema fields.
- [ ] Every candidate is an exact file path with one approved group, provenance, opening state, and risk.
- [ ] Candidate paths contain no glob, implicit recursion, duplicate, ignored path, protected path, or missing file.
- [ ] Every visible status entry is either a manifest candidate or a named mandatory exclusion.
- [ ] JSON and Markdown candidate/group/exclusion totals agree.

## Intentional Staging

- [ ] No broad staging command was used.
- [ ] Every staged path came from the exact reviewed manifest.
- [ ] Index paths equal the manifest candidate paths exactly before Commit 1.
- [ ] No non-ignored candidate remains unstaged or untracked before Commit 1.
- [ ] `.release-main/`, `.claude/`, environment files, protected support record, caches, dependencies, logs, temporary data, and nested Git metadata are absent from the index.
- [ ] Staged binary/mode review passes; the supplied DOCX is the only expected new binary unless another classified binary is explicitly evidenced.
- [ ] Staged high-confidence secret scan passes without emitting secret values.
- [ ] Staged representative safe-diff review covers every manifest group.
- [ ] `git diff --cached --check` passes before Commit 1.

## Credential-Free Validation

- [ ] Current 017D Pack check passes.
- [ ] Every staged Architect Pack check passes.
- [ ] Every staged JSON file parses.
- [ ] Biochemistry scoring fixtures pass.
- [ ] Biochemistry recommendation fixtures pass.
- [ ] Sprint 019 design-system validation passes.
- [ ] Sprint 020 remote-readiness static validation passes without remote access.
- [ ] Sprint 020C database-audit validation passes without remote access.
- [ ] Sprint 020E structural-audit validation passes without remote access.
- [ ] Sprint 020F replacement-audit validation passes without remote access.
- [ ] Sprint 020G clean-rebuild validation passes without remote access.
- [ ] Sprint 021 role-matrix static validation passes.
- [ ] Sprint 021 focused role/comment tests pass.
- [ ] Every applicable credential-free `test-supabase-*.mjs` self-test passes without contacting a remote service.
- [ ] ESLint passes.
- [ ] TypeScript passes using project-local dependencies.
- [ ] Production build passes, subject to the single unchanged retry rule for the known worker-exit class.
- [ ] No execution harness requiring protected input or remote access was run.

## Commit 1

- [ ] Branch and HEAD still match opening evidence immediately before Commit 1.
- [ ] Commit 1 is created with subject `chore: establish post-sprint-021 repository baseline`.
- [ ] Commit 1 parent is the opening HEAD.
- [ ] Commit 1 contains exactly the validated manifest candidate set.
- [ ] Commit 1 hash, file count, statistics, validation, and exclusions are recorded in the closeout review.
- [ ] No amend, reset, rebase, squash, cherry-pick, tag, push, fetch, pull, PR, or branch operation occurred.

## Commit 2 And Closeout

- [ ] Only approved closeout files changed after Commit 1.
- [ ] Commit 2 staged paths equal the exact recorded closeout list.
- [ ] Commit 2 JSON parse, safety scan, staged diff review, and `git diff --cached --check` pass.
- [ ] Commit 2 is created with subject `docs: close sprint 017D repository baseline`.
- [ ] Commit 2 parent is Commit 1.
- [ ] Final branch remains `develop`.
- [ ] Final HEAD is Commit 2 and its hash is reported to the user.
- [ ] Final Git index is empty.
- [ ] Final `git status --short` contains no non-ignored entries.
- [ ] `.release-main/`, `.claude/`, protected 021M escalation record, and local environment files remain present/ignored as applicable and were not inspected.
- [ ] Final review and planning records do not claim push, PR, remote backup, provider resolution, authenticated proof, deployment, or production readiness.
- [ ] Final outcome is exactly `local-baseline-complete`, `baseline-blocked-clean`, or `baseline-committed-closeout-blocked`.

## Manual Intervention Acceptance

For every blocker requiring user/manual input:

- [ ] what is blocked is stated;
- [ ] evidence already checked is stated;
- [ ] exact user/manual action is stated;
- [ ] step-by-step instructions are stated;
- [ ] Builder’s later verification is stated.

If no intervention is required, annotate this section as not applicable with evidence.

## Outcome Rules

### `local-baseline-complete`

Both local commits exist in the required parent/child order, final index is empty, no non-ignored status entries remain, exclusions are preserved, and all required validation passes.

### `baseline-blocked-clean`

No 017D commit exists; the index is empty, working files are preserved, and exact blocker/manual-intervention evidence is recorded.

### `baseline-committed-closeout-blocked`

Commit 1 exists and is preserved, but Commit 2 could not safely complete. Exact recovery steps and remaining unstaged/closeout state are recorded.

============================================================
FILE: planning/sprints/017D-intentional-staging-and-local-baseline-commit/handoff-prompt.md
============================================================

# Sprint 017D — Builder Handoff Prompt

You are Builder for Sprint `017D-intentional-staging-and-local-baseline-commit` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, then work only from those applied sprint files.

## Mission

Create a clean, validated local repository baseline using an exact staging manifest and two local commits:

1. `chore: establish post-sprint-021 repository baseline`
2. `docs: close sprint 017D repository baseline`

## Non-Negotiable Boundaries

- Never use `git add .`, `git add -A`, or broad directory staging.
- Never stage protected/local-only content, even temporarily.
- Preserve `.release-main/`, `.claude/`, local environment files, and the restricted 021M escalation record.
- Do not open or scan protected files.
- Do not edit implementation or historical evidence to make validation pass.
- Do not amend, reset, rebase, squash, switch branches, push, pull, fetch, create a PR, deploy, migrate, or contact external services.
- Do not run remote/protected execution harnesses.
- Leave remote handoff to Sprint 017E.

## Required Sequence

1. Verify 017B/017C state and add the exact protected-record ignore rule.
2. Build and validate the exact JSON staging manifest and Markdown pre-commit review.
3. Stage only literal manifest paths.
4. Prove staged set equality, exclusions, binary/mode safety, and secret safety.
5. Run the full credential-free validation suite.
6. Create Commit 1 only after every gate passes.
7. Record Commit 1 evidence in the closeout review and planning files.
8. Stage only closeout files, validate them, and create Commit 2.
9. Prove the final index and non-ignored working tree are clean.

## Required Outputs

- `planning/reviews/017D-staging-manifest.json`
- `planning/reviews/017D-precommit-review.md`
- `planning/reviews/017D-local-baseline-commit-review.md`
- updated approved closeout planning files and annotated acceptance

## Failure Handling

Before Commit 1, unstage only exact manifest paths and close `baseline-blocked-clean` if any gate cannot pass.

After Commit 1, preserve it and close `baseline-committed-closeout-blocked` if the closeout commit cannot safely finish. Never amend, reset, or delete successful work.

For every manual intervention, record what failed, evidence checked, exact action, numbered steps, and what Builder will verify afterward.

## Closeout

Report both commit hashes when complete. State explicitly that no push, PR, remote backup, hosted change, provider resolution, authenticated proof, deployment, or production-readiness result occurred.
