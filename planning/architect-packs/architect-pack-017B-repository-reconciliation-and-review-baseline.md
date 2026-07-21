# Architect Pack 017B — Repository Reconciliation And Review Baseline

Created: 2026-07-21
Workflow profile: strict
Architect outcome: Builder handoff for a read-only repository inventory and planning closeout.

============================================================
FILE: planning/sprints/017B-repository-reconciliation-and-review-baseline/requirements.md
============================================================

# Sprint 017B — Repository Reconciliation And Review Baseline Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## Context

Sprint 017 created local baseline commit `171d3aa` (`chore: establish sprint 017 repository baseline`). Since that baseline, Sprints 018 through 021M produced substantial application, database, validation, planning, and provider-diagnostic work.

The 2026-07-21 project review found a broad working tree: tracked modifications, many untracked entries, and local commits ahead of `origin/develop`. Counts captured before this Pack are orientation only; Builder must recapture authoritative opening evidence because applying the Pack itself adds sprint files.

Sprint 021M is closed `provider-escalation-required-clean`. The Supabase escalation has been submitted and no further reproduction should occur before a substantive provider response or remediation.

The accepted project sprint list makes 017B the first immediate-control sprint. Its purpose is classification and reconciliation only. Later Sprint 017C may decide ignore/archive/local-only treatment. Later Sprint 017D may prepare intentional staging and commit work. Sprint 017B must not perform either later sprint.

## Goal

Produce a complete, non-destructive, decision-ready inventory of the repository state after Sprint 017, mapping every tracked modification, deletion, staged entry, and untracked path to its supported origin and recommended treatment without changing Git index state or file contents outside approved planning records.

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
10. `planning/reviews/sprint-016-working-tree-inventory.md`
11. `planning/reviews/sprint-017-baseline-staging-review.md`
12. `docs/REPOSITORY_ALIGNMENT_016.md`
13. `docs/BASELINE_COMMIT_017.md`
14. `planning/sprints/017B-repository-reconciliation-and-review-baseline/requirements.md`
15. `planning/sprints/017B-repository-reconciliation-and-review-baseline/blueprint.md`
16. `planning/sprints/017B-repository-reconciliation-and-review-baseline/acceptance.md`

Builder may read later sprint records, diffs, and source files only as needed to establish file provenance and classification.

## Questions And Answers

Q: Does 017B clean the working tree?
A: No. It inventories and classifies the working tree. Cleanup, archive movement, ignore-rule changes, restoration, staging, and commits are later work.

Q: May Builder stage files to help classify them?
A: No. Git index state is evidence and must remain unchanged throughout 017B.

Q: May Builder inspect local environment-file contents?
A: No. Environment and credential-adjacent files are classified by filename, tracked/ignored state, and safe Git metadata only. Do not print, hash, diff, copy, or otherwise expose their contents.

Q: May Builder classify an entire directory as one row?
A: Only when every descendant has the same supported origin and treatment and the report records the descendant count. Otherwise list or subgroup paths so no entry is hidden by a broad label.

Q: Does historical sprint documentation prove a file belongs to a sprint?
A: It is supporting evidence, not automatic proof. Builder must correlate path, Git state, relevant sprint approved-file set, timestamps or diffs where safe, and current repository purpose.

Q: May Builder contact Supabase or rerun Sprint 021 remote diagnostics?
A: No. 017B is local repository reconciliation only.

## In Scope

Builder may:

- capture branch, HEAD, upstream, ahead/behind summary, staged state, unstaged state, deletions, untracked paths, ignored status for named ambiguous paths, and submodule/nested-repository indicators;
- compare current state with the Sprint 016 inventory and Sprint 017 baseline review;
- use read-only Git commands to establish whether each path is tracked, modified, deleted, untracked, ignored, generated, or nested-repository material;
- inspect safe diffs and file contents when necessary for provenance, excluding environment files, credentials, tokens, private correlation identifiers, and other protected material;
- map each entry to a sprint or category using durable evidence;
- identify files that combine work from multiple sprints or have unresolved ownership;
- identify generated/cached/dependency artifacts without deleting them;
- identify planning duplication, stale records, and encoding issues without correcting them;
- create the canonical Markdown inventory and machine-readable JSON classification;
- update approved planning closeout files with the 017B result.

## Out Of Scope

Builder must not:

- edit application, component, library, configuration, migration, script, test, documentation, or reference content except the approved 017B planning outputs and closeout files;
- stage, unstage, commit, amend, rebase, merge, reset, restore, checkout, switch branches, create branches, push, pull, fetch, or create a PR;
- delete, move, rename, archive, restore, or rewrite repository files;
- change `.gitignore`, `.gitattributes`, line endings, package dependencies, lockfiles, generated bundles, or environment guidance;
- read, print, diff, hash, copy, or expose contents of `.env*`, credential stores, protected support correlations, tokens, keys, passwords, cookies, or sessions;
- contact Supabase, Vercel, Stripe, GitHub, DNS, email, or any other remote service;
- run hosted Auth/JWT reproduction or authenticated role/RLS proof;
- run deployment, migration, production mutation, billing, checkout, or webhook actions;
- redefine product scope or make 017C/017D treatment decisions implicitly.

## Approved File Set

Builder may create or edit only:

- `planning/reviews/017B-repository-reconciliation-inventory.md`
- `planning/reviews/017B-file-classification.json`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, only if a genuinely new durable decision is made within scope
- `planning/RISKS.md`, only for new or materially changed risks
- `planning/QUESTIONS.md`, only for unresolved decisions that 017C or the user must answer

The applied four sprint files are Pack-generated inputs and must remain unchanged except for Builder completion annotations in `acceptance.md` where the established method requires them.

All other paths are read-only.

## Required Classification Schema

Every staged, unstaged, deleted, or untracked entry must resolve to one of these primary classes:

1. `accepted-sprint-work`
2. `planning-or-evidence`
3. `generated-or-cache`
4. `dependency-or-tool-output`
5. `local-environment-or-protected`
6. `reference-or-archive`
7. `tool-preference-or-agent-config`
8. `duplicate-or-superseded-candidate`
9. `nested-repository-or-release-snapshot`
10. `unresolved-ownership`

Each record must contain:

- path or safe path group;
- Git state;
- primary class;
- originating sprint(s) or `unknown`;
- evidence references;
- recommended next treatment: `preserve`, `review-in-017C`, `candidate-for-generated-exclusion`, `candidate-for-archive`, `candidate-for-future-staging`, `local-only`, or `unresolved`;
- risk level: `low`, `medium`, `high`, or `protected-review-required`;
- concise rationale;
- whether user/manual input is required.

Recommended treatment is advisory evidence for later sprints and must not be executed in 017B.

## Required Outputs

### Markdown inventory

`planning/reviews/017B-repository-reconciliation-inventory.md` must include:

- opening and closing branch/HEAD/index summaries;
- exact safe counts by Git state;
- comparison to Sprint 017 baseline and the pre-Pack project review;
- classification totals;
- sprint provenance summary from 018 through 021M;
- individually named high-risk, protected-review, mixed-origin, and unresolved entries;
- ambiguous-directory analysis for `.release-main/`, `.claude/`, `samples/`, generated output, and any newly discovered equivalent;
- environment/secret safety statement based on filename/state inspection only;
- proposed boundaries for 017C and 017D;
- manual-intervention records where required;
- validation results and explicit confirmation that no index, source, remote, or production state changed.

### JSON classification

`planning/reviews/017B-file-classification.json` must:

- be valid UTF-8 JSON;
- include schema version, captured timestamp, branch, HEAD, upstream summary, opening/closing state counts, classification totals, records, unresolved items, and manual interventions;
- contain no secret values, hashes of secret values, tokens, correlation identifiers, or unrestricted support data;
- agree exactly with the Markdown report totals.

## Manual Intervention Rule

Whenever classification is blocked or user/manual input is needed, Builder must record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- step-by-step instructions for completing that action;
- what Builder will verify after the action is complete.

If protected content would need to be opened to classify a file, classify it as `local-environment-or-protected`, record `protected-review-required`, and defer content review. Do not open it.

## Completion Outcome

017B may close as:

- `inventory-complete` when every entry is classified or explicitly recorded as unresolved with a next decision owner; or
- `inventory-blocked-clean` when safe classification cannot continue without protected access, destructive action, or user input.

Neither outcome implies a clean working tree, a staged baseline, a commit, remote backup, or product readiness.

============================================================
FILE: planning/sprints/017B-repository-reconciliation-and-review-baseline/blueprint.md
============================================================

# Sprint 017B — Repository Reconciliation And Review Baseline Blueprint

## Intent

Create a trustworthy map of the repository before any cleanup or staging decisions. Preserve all user work and preserve the opening Git index as evidence.

## Execution Plan

1. Read every required source-of-truth file in the requirements.
2. Capture opening evidence with read-only commands:
   - current branch and HEAD;
   - upstream tracking and ahead/behind state without network access;
   - porcelain status including staged, unstaged, deleted, renamed, and untracked entries;
   - tracked-file list, untracked-file list, ignored status for ambiguous named paths, and nested `.git` indicators;
   - safe diff name/status and diff statistics without environment-file content.
3. Confirm the Git index is not empty or modified by 017B assumptions; record its actual opening state and preserve it exactly.
4. Establish the comparison baseline:
   - Sprint 016 working-tree inventory;
   - Sprint 017 staging review and baseline commit;
   - files created or changed by Sprints 018–021M according to applied sprint records and reviews;
   - the accepted 2026-07-21 project sprint list.
5. Build a path-level working table using the required classification schema.
6. For each tracked change:
   - identify the safe diff name/status;
   - correlate the path with sprint approved-file sets and closeout evidence;
   - inspect content only when safe and necessary;
   - flag mixed-origin or unexplained changes.
7. For each untracked entry:
   - determine whether it is a file, directory grouping, generated output, planning evidence, source work, reference material, tool configuration, or nested repository;
   - expand groups where treatments differ;
   - never traverse protected credential stores or print protected content.
8. Reconcile ambiguous paths including `.release-main/`, `.claude/`, `samples/`, `.next/`, `build/`, validation logs, local environment files, and any newly found equivalent.
9. Draft the Markdown inventory and JSON classification from the same totals.
10. Validate completeness, JSON agreement, secret safety, and unchanged index/source state.
11. Update planning closeout files only after the inventory is internally consistent.
12. Capture closing branch, HEAD, status, and index evidence; explain only the expected 017B planning-output delta.

## Evidence Rules

- Prefer `git status --porcelain=v1`, `git diff --name-status`, `git diff --cached --name-status`, `git ls-files`, `git check-ignore`, `git log`, `rg --files`, and safe filesystem metadata.
- Use `-LiteralPath` for paths containing brackets or other special characters.
- Do not run commands that normalize line endings or cause broad file hydration/writes.
- Do not use `git add`, including intent-to-add.
- Do not use network-backed Git commands.
- Do not use environment-file content, secret values, or protected support correlations as evidence.
- Do not infer that an untracked file is disposable merely because it is generated-looking.
- Do not infer that a planning file is current merely because it is recent.

## Classification Order

For each entry, decide in this order:

1. Is it environment/credential/protected material?
2. Is it a nested repository or release snapshot?
3. Is it generated, cached, dependency, or tool output?
4. Is it supported by a named completed sprint or current planning activity?
5. Is it reference/archive/tool-preference material?
6. Does it duplicate or conflict with a current authority?
7. If none apply confidently, classify as unresolved ownership.

## 017C Handoff Shape

The inventory should allow Architect to scope 017C around:

- ignore-rule and generated-output treatment;
- environment/local-only boundaries;
- archive/reference decisions;
- `.release-main/`, `.claude/`, and `samples/` disposition;
- nested-repository handling;
- unresolved ownership requiring user choice.

017B must not make these filesystem changes.

## 017D Handoff Shape

The inventory should allow Architect to scope 017D around:

- exact candidate staging groups;
- exclusions and protected-review gates;
- validation required for each implementation group;
- commit segmentation by coherent sprint provenance;
- whether remote review should remain deferred to 017E.

017B must not stage or commit.

## Failure And Stop Rules

Stop and record manual intervention if:

- safe read-only commands cannot distinguish index state from working-tree state;
- a required classification would expose protected content;
- a path appears to contain a nested repository whose ownership cannot be established safely;
- the working tree changes unexpectedly during inventory beyond Pack application and approved 017B output edits;
- a command would require deletion, restoration, staging, network access, or external mutation;
- totals cannot be reconciled between Git evidence, Markdown, and JSON.

## Closeout

Close with one exact outcome, `inventory-complete` or `inventory-blocked-clean`, and identify the next recommended Architect action. Do not mark 017C or 017D active.

============================================================
FILE: planning/sprints/017B-repository-reconciliation-and-review-baseline/acceptance.md
============================================================

# Sprint 017B — Repository Reconciliation And Review Baseline Acceptance

## Required Acceptance Criteria

- [ ] Builder read the required project, historical baseline, accepted sprint-list, and applied 017B files.
- [ ] Opening branch, HEAD, upstream, ahead/behind, staged, unstaged, deleted, and untracked evidence is recorded safely.
- [ ] Git index state was preserved exactly throughout the sprint.
- [ ] Current state is compared with Sprint 016 inventory and Sprint 017 baseline evidence.
- [ ] Every tracked modification, deletion, staged entry, and untracked entry is classified or explicitly unresolved.
- [ ] Grouped directory records contain only descendants with the same supported class/treatment and record descendant counts.
- [ ] Every classification includes path/group, Git state, class, originating sprint or unknown, evidence, recommended next treatment, risk, rationale, and manual-input flag.
- [ ] Classification uses only the ten approved primary classes.
- [ ] Recommended treatments use only the approved advisory treatment values.
- [ ] Mixed-origin, high-risk, protected-review, nested-repository, duplicate/superseded, and unresolved entries are individually visible.
- [ ] `.release-main/`, `.claude/`, `samples/`, generated output, local environment files, and newly discovered equivalents are explicitly addressed.
- [ ] No environment file, credential, token, password, key, cookie, session, private correlation identifier, or protected support value was printed, diffed, hashed, copied, or retained.
- [ ] Markdown and JSON opening/closing counts and classification totals agree exactly.
- [ ] JSON parses successfully and contains the required schema fields.
- [ ] The inventory proposes clear 017C and 017D boundaries without executing them.
- [ ] Every blocker or user/manual dependency includes the required five-part manual-intervention record.
- [ ] Only the approved planning output/closeout files changed beyond Pack application.
- [ ] No application, config, migration, script, test, package, documentation, reference, environment, or Git index content was changed.
- [ ] No delete, move, archive, restore, stage, unstage, commit, branch, push, pull, fetch, PR, deployment, remote migration, hosted diagnostic, production mutation, Stripe, billing, DNS, or public reopening action occurred.
- [ ] Closing branch and HEAD match opening values; closing status changes are limited to Pack-generated sprint files and approved 017B outputs/closeout files.
- [ ] `git diff --check` passes for the approved 017B text files.
- [ ] Final status is exactly `inventory-complete` or `inventory-blocked-clean`, with limitations stated accurately.

## Completeness Matrix

| Evidence class | Required treatment |
|---|---|
| Staged entry | Record separately from unstaged state; preserve index exactly. |
| Tracked modification | Classify path-level provenance and treatment. |
| Tracked deletion | Classify deletion provenance without restoring or accepting it implicitly. |
| Untracked file | Classify individually unless a homogeneous safe group is proven. |
| Untracked directory | Record descendant count and split mixed-treatment descendants. |
| Ignored/generated path | Record only where relevant to ambiguous repository state; do not enumerate dependency contents unnecessarily. |
| Environment/protected path | Filename/state metadata only; mark protected-review-required. |
| Nested repository | Record boundary, ownership evidence, and unresolved risks without mutation. |

## Validation

Builder must perform:

1. Architect Pack identity check against the applied four sprint files.
2. Markdown-versus-JSON count reconciliation.
3. JSON parse validation.
4. Primary-class and treatment enum validation.
5. Duplicate/missing path-group detection.
6. Safe filename/content scan of approved 017B outputs for prohibited secret-like material, without scanning or opening protected source files.
7. Approved-file diff review.
8. Opening-versus-closing branch, HEAD, and index comparison.
9. `git diff --check` limited to approved 017B files.

Application build, lint, TypeScript, domain fixtures, remote checks, and authenticated harness execution are not required because 017B may not edit implementation or validation code. If Builder discovers an unrelated existing failure, record it as pre-existing evidence and do not fix it.

## Outcome Rules

### `inventory-complete`

Use only when all entries are classified or explicitly unresolved with evidence, risk, next treatment, and decision owner, and all validation passes.

### `inventory-blocked-clean`

Use when safe classification cannot finish without protected access, destructive/index-changing action, or user input. Record exact manual intervention and confirm no prohibited mutation occurred.

============================================================
FILE: planning/sprints/017B-repository-reconciliation-and-review-baseline/handoff-prompt.md
============================================================

# Sprint 017B — Builder Handoff Prompt

You are Builder for Sprint `017B-repository-reconciliation-and-review-baseline` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, then work only from those applied sprint files.

## Mission

Create a complete, non-destructive inventory of the repository state after Sprint 017. Map every current staged, unstaged, deleted, and untracked entry to supported provenance, class, risk, and advisory next treatment so later 017C and 017D work can proceed without guessing.

## Read First

Read the full source-of-truth list in `requirements.md`, especially:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- Sprint 016 working-tree inventory
- Sprint 017 staging review and baseline documentation
- all four applied Sprint 017B files

## Hard Boundaries

- Preserve the Git index exactly.
- Do not stage, unstage, commit, delete, move, archive, restore, reset, switch branches, push, pull, fetch, or create a PR.
- Do not edit source, config, migrations, scripts, tests, packages, general docs, references, ignore rules, or environment guidance.
- Do not read or expose environment-file contents, secrets, credentials, tokens, sessions, cookies, private correlations, or unrestricted support data.
- Do not contact Supabase or any other external system.
- Do not rerun hosted Auth/JWT diagnostics.
- Do not implement 017C or 017D decisions.

## Required Deliverables

Create:

- `planning/reviews/017B-repository-reconciliation-inventory.md`
- `planning/reviews/017B-file-classification.json`

Update only the approved planning closeout files when necessary.

The Markdown and JSON must agree exactly and must distinguish established sprint provenance from inference and unresolved ownership.

## Manual Intervention

If classification needs protected content, destructive action, index mutation, network access, or user judgment, stop that classification path and record:

1. what is blocked;
2. evidence already checked;
3. exact user/manual action needed;
4. step-by-step instructions;
5. what Builder will verify afterward.

## Closeout

Close as `inventory-complete` or `inventory-blocked-clean`. State clearly that 017B does not create a clean tree, staging plan, commit, remote backup, or product-readiness result.
