# Sprint 017C — Repository Treatment And Boundary Reconciliation Acceptance

## Required Acceptance Criteria

- [x] **pass** — Builder read all required authority, 017B evidence, and applied 017C files.
- [x] **pass** — The review records opening branch, full HEAD, empty index, status counts, and safe target metadata.
- [x] **pass** — Cached diff remained empty throughout 017C.
- [x] **pass** — All five path/existence preconditions passed before mutation.
- [x] **pass** — `.gitignore` contains exactly one `/.release-main/` line added by 017C.
- [x] **pass** — `.gitignore` contains exactly one `/.claude/` line added by 017C.
- [x] **pass** — No unanchored or broad equivalent rule was added.
- [x] **pass** — Root `.release-main/` and its nested boundary remain present and are ignored by the exact anchored rule.
- [x] **pass** — Root `.claude/` and all three recorded command files remain present with unchanged safe metadata and exact anchored ignore source.
- [x] **pass** — The historical archived `.release-main` boundary is not matched by the new root rule.
- [x] **pass** — `samples/README.md` remains present, not ignored, with identical pre/post SHA-256.
- [x] **pass** — No sample descendant or production/protected content was added.
- [x] **pass** — The root DOCX moved only to the exact client-docs destination.
- [x] **pass** — Destination absence was proved before moving; nothing was overwritten.
- [x] **pass** — DOCX filename, 17,164-byte size, and SHA-256 are identical after the move.
- [x] **pass** — Root source is absent and exact destination is present.
- [x] **pass** — DOCX was not opened, parsed, converted, re-saved, duplicated, staged, or committed.
- [x] **pass** — The 017C review records all four dispositions and named evidence.
- [x] **pass** — The review records exact 017D candidates/exclusions without staging.
- [x] **pass** — No unresolved blocker or manual dependency remains; the transient assertion stop is fully evidenced.
- [x] **pass** — Only the approved file set changed beyond Pack application.
- [x] **pass** — No implementation, unrelated reference/documentation, environment, protected-support, or nested-repository content changed.
- [x] **pass** — No prohibited Git, remote, deployment, hosted, production, commerce, billing, DNS, or reopening action occurred.
- [x] **pass** — Closing branch/HEAD match opening and index remains empty.
- [x] **pass** — `planning/STATUS.json` parses successfully.
- [x] **pass** — Approved text files pass `git diff --check`.
- [x] **pass** — Final outcome is `treatment-complete`, without staging, commit, backup, or readiness implications.

## Exact Ignore Acceptance

| Check | Required result |
|---|---|
| Count of exact `/.release-main/` lines | 1 |
| Count of exact `/.claude/` lines | 1 |
| Root `.release-main/` ignore source | `/.release-main/` |
| Root `.claude/commands/*` ignore source | `/.claude/` |
| `samples/README.md` | Not ignored |
| `references/client-docs/Sprint list 190726.docx` | Not ignored |
| Archived nested `.release-main` path | Not newly affected by root rule |

## DOCX Acceptance Matrix

| Case | Required response |
|---|---|
| Source exists and destination absent | Record source metadata/hash, perform exact move, verify destination metadata/hash. |
| Source missing | Stop; record manual intervention; do not invent or restore a document. |
| Destination exists | Stop; compare filename metadata only initially and request direction; do not overwrite. |
| Move blocked by OneDrive/filesystem | Record evidence and exact manual steps; leave or restore one verified source copy. |
| Hash/size differs after move | Stop; retain evidence, perform bounded rollback only if safe, and close blocked-clean. |
| Both source and destination exist unexpectedly | Do not delete either; record manual intervention. |

## Validation

Builder must perform:

1. Architect Pack identity check against the applied four sprint files.
2. Opening/closing branch, HEAD, and index comparison.
3. Approved-file diff review.
4. Exact ignore-line count and anchored-source verification.
5. Target presence/absence and non-broad ignore checks.
6. `samples/README.md` pre/post SHA-256 comparison.
7. DOCX pre/post size and SHA-256 comparison without opening/parsing content.
8. Safe scan of approved text outputs for prohibited secret-like material.
9. `planning/STATUS.json` parse.
10. `git diff --check` for approved text files.

Application build, lint, TypeScript, fixtures, remote checks, and authenticated harnesses are not required because 017C does not edit implementation. Existing unrelated failures must not be fixed in this sprint.

## Outcome Rules

### `treatment-complete`

Use only when all four exact dispositions and every validation requirement pass.

### `treatment-blocked-clean`

Use when a safe precondition, move, ignore boundary, or verification cannot be completed and unchanged or rolled-back state is proven with manual-intervention instructions.
