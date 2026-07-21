# Sprint 017C Repository Treatment And Boundary Reconciliation

Outcome: `treatment-complete`.

017C resolved only the four accepted 017B treatment paths. It did not stage, commit, clean the broader tree, inspect protected content, contact a remote system, or perform 017D work.

## Opening and closing repository evidence

| Evidence | Opening | Closing |
|---|---:|---:|
| Branch | `develop` | `develop` |
| HEAD | `171d3aa4186e04c656a50d91b52b1f086f95f89a` | same |
| Staged/index entries | 0 | 0 |
| Unstaged tracked modifications | 35 | 35 |
| Tracked deletions | 0 | 0 |
| Untracked entries | 225 | 222 |
| Total status entries | 260 | 257 |

Opening capture occurred after Pack application and therefore includes the new 017C Pack and four applied sprint files. Closing removes four visible untracked entries by ignoring `.release-main/` and three `.claude/commands/` files, preserves the DOCX as one untracked entry at its new location, and adds this approved review as one closing-only entry.

The Git index was empty at opening and closing. No stage/unstage action occurred.

## Treatment 1 — `.release-main/`

- Opening: present at the repository root with its own `.git` directory; classified as a local historical release snapshot.
- Change: added exactly one anchored root rule: `/.release-main/`.
- Closing: directory and nested Git boundary remain present. No descendant was enumerated, hydrated, edited, moved, deleted, staged, or committed.
- Ignore proof: Git attributes the root path to `.gitignore` rule `/.release-main/`.
- Boundary proof: `references/archive/sprint-001-cleanup/.release-main/` is not matched by the new anchored rule. Its check-ignore output retains a pre-existing nested-boundary result with no new root-rule source.
- Disposition: preserved local-only; excluded from 017D staging.

## Treatment 2 — `.claude/`

- Opening: root directory and the three recorded command files were present.
- Change: added exactly one anchored root rule: `/.claude/`.
- Closing: the directory and named command files remain present with the same safe sizes recorded at opening: `architect.md` 1,174 bytes, `build.md` 1,845 bytes, and `update.md` 1,258 bytes.
- Ignore proof: Git attributes named command descendants to `.gitignore` rule `/.claude/`.
- No command file was opened, edited, moved, deleted, staged, or committed.
- Disposition: preserved local-only tool preference; excluded from 017D staging.

## Treatment 3 — `samples/README.md`

- Opening SHA-256: `983FCC21629EDF76A864375A78908D62EC2376E140B37BF6DCC42DFB5110DF0D`.
- Closing SHA-256: identical.
- Path remains `samples/README.md` and Git confirms it is not ignored.
- No sample data, export, fixture, example, credential, or production content was added.
- Disposition: safe project-scaffold candidate for explicit 017D staging review. This does not preapprove future sample descendants.

## Treatment 4 — supplied sprint-list DOCX

| Check | Result |
|---|---|
| Opening source | `Sprint list 190726.docx` present |
| Opening destination | `references/client-docs/Sprint list 190726.docx` absent |
| Pre-move size | 17,164 bytes |
| Pre-move SHA-256 | `C91CAFA385906084BDAF36FC266F7EBF25CDEA1DC96398372F1FC8FD7E83F240` |
| Exact operation | Literal-path move within the workspace |
| Closing source | absent |
| Closing destination | present and not ignored |
| Post-move size | 17,164 bytes |
| Post-move SHA-256 | identical |
| Exact-name copies after move | 1 |

The initial combined move-and-assert command reported a preservation failure because of PowerShell expression evaluation. Treatment stopped immediately. A separate safe metadata check proved the destination size and hash exactly matched the recorded source, with source absent and destination present. The accepted final state was therefore already established and rollback was neither necessary nor permitted. The DOCX was not opened, parsed, converted, re-saved, renamed, duplicated, staged, or committed.

Disposition: planning reference at `references/client-docs/Sprint list 190726.docx`; candidate reference input for explicit 017D review.

## `.gitignore` scope

The only 017C ignore additions are:

```gitignore
/.release-main/
/.claude/
```

Each exact line occurs once. No unanchored `.release-main`, `.claude`, `samples`, `references`, or `*.docx` rule was added. Existing environment, generated-output, dependency, validation-log, and Supabase temporary-path rules were not changed.

## 017D handoff

Candidates:

- `.gitignore` with the two exact anchored additions;
- unchanged `samples/README.md` as the samples-boundary scaffold;
- relocated `references/client-docs/Sprint list 190726.docx` as supplied planning reference;
- this review, the applied 017C files, and approved closeout planning records.

Exclusions:

- all of `.release-main/`;
- all of root `.claude/`;
- ignored environment/generated/dependency state;
- protected 021M support correlation evidence unless a separately safe staging decision explicitly handles it.

No other 017B classification changed. 017D must still define coherent staging groups, validation, exact exclusions, and commit segmentation.

## Manual intervention

None required. The transient assertion stop was resolved with safe metadata evidence and did not require user action, rollback, overwrite, deletion, or protected access.

## Validation and non-mutation statement

- Architect Pack identity passed for all four applied files.
- Exact ignore counts and rule sources passed.
- Root-only ignore boundaries passed; historical nested/reference path was not matched by the new rule.
- Samples and DOCX pre/post SHA-256 checks passed.
- DOCX source/destination uniqueness and exact move passed.
- Branch, HEAD, and empty index are unchanged.
- `planning/STATUS.json` parses and approved text files pass `git diff --check`.
- No application, component, library, package, migration, script, test, unrelated documentation/reference, environment, protected-support, or nested-repository content changed.
- No staging, commit, branch operation, push, pull, fetch, PR, deployment, remote call, hosted diagnostic, migration, production mutation, Stripe, billing, DNS, or public reopening occurred.

017C does not establish a staging plan, commit, remote backup, product readiness, or production readiness.
