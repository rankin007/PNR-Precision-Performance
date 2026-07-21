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
