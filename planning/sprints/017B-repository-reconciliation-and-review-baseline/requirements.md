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
