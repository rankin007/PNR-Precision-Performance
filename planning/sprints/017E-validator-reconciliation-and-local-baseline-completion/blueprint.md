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
