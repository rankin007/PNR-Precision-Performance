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
