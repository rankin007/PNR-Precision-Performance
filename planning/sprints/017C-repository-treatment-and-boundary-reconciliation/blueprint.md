# Sprint 017C — Repository Treatment And Boundary Reconciliation Blueprint

## Intent

Resolve only the four exact 017B treatment decisions while preserving all user work, nested boundaries, protected material, Git index state, and the separation between treatment work and later staging.

## Execution Plan

1. Read every required source-of-truth and applied sprint file.
2. Capture opening evidence:
   - branch and full HEAD;
   - cached/index name-status;
   - porcelain status and counts;
   - `.gitignore` current contents and duplicate-rule checks;
   - safe metadata for the four targets.
3. Verify preconditions:
   - `.release-main/` exists at the repository root;
   - `.release-main/.git` is a nested boundary, using metadata only;
   - `.claude/` and its three recorded command files exist;
   - `samples/README.md` exists;
   - root `Sprint list 190726.docx` exists;
   - destination `references/client-docs/Sprint list 190726.docx` does not exist;
   - Git index is unchanged from opening.
4. Record a safe SHA-256 hash for `samples/README.md` and the root DOCX. The DOCX is supplied non-secret planning input; do not open or parse it.
5. Edit `.gitignore` using a narrow patch:
   - add `/.release-main/` once;
   - add `/.claude/` once;
   - do not reorder or normalize unrelated rules unless strictly required to prevent duplicate exact lines.
6. Validate ignore boundaries:
   - root `.release-main/` is ignored by `/.release-main/`;
   - root `.claude/` and command descendants are ignored by `/.claude/`;
   - `samples/README.md` is not ignored;
   - root DOCX is not ignored before relocation;
   - `references/client-docs/` is not ignored;
   - historical `references/archive/sprint-001-cleanup/.release-main/` treatment is not changed by the anchored root rule.
7. Move the exact DOCX with a literal-path filesystem operation from repository root to `references/client-docs/`.
8. Verify:
   - destination exists;
   - source is absent;
   - destination size equals source size;
   - destination SHA-256 equals the recorded source SHA-256;
   - no second file with the exact name was created elsewhere by the operation.
9. Re-hash `samples/README.md` and confirm it is unchanged.
10. Confirm `.release-main/` and `.claude/` remain present and were not altered by treatment work, using safe directory metadata and named-file checks only.
11. Create the 017C review and update approved closeout planning files.
12. Validate approved-file scope, exact ignore rules, route anchoring, hashes, index preservation, JSON planning parse, and `git diff --check` for text files.
13. Capture closing branch, HEAD, index, and status evidence.

## Safe Command Shape

- Use PowerShell `Test-Path`, `Get-Item`, `Get-FileHash`, `Move-Item -LiteralPath`, and `git check-ignore -v --no-index` with exact paths.
- Resolve and verify both DOCX paths remain inside the workspace before moving.
- Use one shell end-to-end for the move.
- Do not construct move targets from untrusted output or broad globs.
- Do not use recursive move/delete commands.
- Use `apply_patch` for `.gitignore` and planning text edits.

## Verification Matrix

| Target | Opening state | Intended closing state | Verification |
|---|---|---|---|
| `.release-main/` | Untracked root nested snapshot | Present, unchanged, root-ignored, local-only | Exact anchored ignore source plus safe boundary metadata |
| `.claude/` | Untracked root tool config | Present, unchanged, root-ignored, local-only | Exact anchored ignore source plus named-file metadata |
| `samples/README.md` | Untracked safe scaffold | Present, unchanged, not ignored, 017D candidate | Pre/post SHA-256 and ignore check |
| Root DOCX | Untracked reference input | Absent after exact move | Literal-path absence check |
| Client-docs DOCX | Absent | Present, same name/size/hash | Literal-path, size, and SHA-256 checks |

## 017D Handoff

The 017C closeout must state:

- `.release-main/` and `.claude/` are excluded local-only boundaries;
- `samples/README.md` is a project-scaffold staging candidate;
- the relocated DOCX is a reference staging candidate requiring explicit 017D review;
- `.gitignore` changes are a staging candidate;
- no other inventory classification changes were made;
- 017D must still define coherent staging groups, validation, exclusions, and commit segmentation.

## Failure Handling

At the first failed precondition or verification:

- stop further treatment work;
- preserve exact evidence without protected content;
- use only the bounded rollback in requirements when a mutation already occurred;
- do not improvise another destination, ignore pattern, archive path, copy, or deletion;
- close `treatment-blocked-clean` with the required manual intervention if the accepted final state cannot be proven.
