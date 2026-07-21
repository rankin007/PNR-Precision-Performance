# Architect Pack 017C — Repository Treatment And Boundary Reconciliation

Created: 2026-07-21
Workflow profile: strict
Architect outcome: Builder handoff for exact local-only, ignore, reference, and staging-candidate treatment decisions.

============================================================
FILE: planning/sprints/017C-repository-treatment-and-boundary-reconciliation/requirements.md
============================================================

# Sprint 017C — Repository Treatment And Boundary Reconciliation Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## Context

Sprint 017B closed `inventory-complete` with branch `develop`, HEAD `171d3aa`, an empty Git index, 35 unstaged tracked modifications, no tracked deletions, and 220 untracked closing entries. All 255 status entries were classified.

017B left four exact treatment decisions for 017C:

1. `.release-main/`
2. `.claude/commands/*`
3. `samples/README.md`
4. `Sprint list 190726.docx`

017C resolves only those boundaries and records the resulting repository state. Intentional staging, commit segmentation, commits, and remote review remain Sprint 017D/017E work.

## Goal

Safely reconcile the four deferred repository paths by preserving local/nested material, adding narrow anchored ignore rules, retaining the project-safe samples scaffold, and relocating the supplied sprint-list source document into the established client-document reference area without losing or altering its content.

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
12. `planning/sprints/017C-repository-treatment-and-boundary-reconciliation/requirements.md`
13. `planning/sprints/017C-repository-treatment-and-boundary-reconciliation/blueprint.md`
14. `planning/sprints/017C-repository-treatment-and-boundary-reconciliation/acceptance.md`

## Accepted Treatment Decisions

### `.release-main/`

- Preserve the directory and its nested Git boundary exactly where they are.
- Treat it as a local-only historical release snapshot, not current project source.
- Add the anchored root ignore rule `/.release-main/`.
- Do not enumerate, hydrate, edit, move, delete, stage, or commit descendants.

### `.claude/`

- Preserve the directory and command files locally.
- Treat the entire root `.claude/` directory as user/tool-preference configuration, not project authority.
- Add the anchored root ignore rule `/.claude/`.
- Do not edit, move, delete, stage, or commit command files.

### `samples/README.md`

- Retain the file at its current path.
- Classify it as a safe project scaffold because it states the intended samples boundary and prohibits credentials/production secrets.
- Do not ignore it and do not edit it in 017C.
- Mark it as a candidate for the later 017D staging review.
- This decision does not approve future sample data, exports, fixtures, or examples automatically.

### `Sprint list 190726.docx`

- Treat the DOCX as a supplied planning source/reference document.
- Relocate it from the repository root to `references/client-docs/Sprint list 190726.docx`.
- Preserve the exact filename and file bytes.
- Do not edit, convert, re-save, parse, stage, or commit the DOCX in 017C.
- Record it as a candidate reference input for 017D, which will decide whether it belongs in a commit.

## Questions And Answers

Q: May Builder delete `.release-main/` because it is now ignored?
A: No. Ignore status changes Git visibility only. The directory must remain on disk unchanged.

Q: May Builder add only `.claude/commands/` to the ignore file?
A: Use the exact anchored rule `/.claude/` because the whole root directory is user/tool-preference state and no current descendant is project authority.

Q: Should `samples/README.md` be moved into references?
A: No. It is a concise repository scaffold for the `samples/` location and remains at `samples/README.md` for later staging review.

Q: May Builder move the DOCX if the destination already exists?
A: No. Stop and reconcile safely. Do not overwrite either file.

Q: Does 017C stage or commit the changed `.gitignore`, DOCX relocation, or planning records?
A: No. Sprint 017D handles staging and commit preparation separately.

## In Scope

Builder may:

- capture opening branch, HEAD, Git index, and status evidence;
- inspect safe filename, path, size, timestamp, attributes, tracked/ignored state, and nested-boundary metadata for the four named targets;
- compute a SHA-256 hash of the non-secret DOCX immediately before and after relocation to prove byte preservation;
- add exactly `/.release-main/` and `/.claude/` to `.gitignore` once each;
- move the exact root DOCX to the exact `references/client-docs/` destination when the destination is absent;
- leave `samples/README.md` unchanged and record it as a future staging candidate;
- verify root-only ignore behavior does not unintentionally ignore historical nested paths below `references/archive/`;
- create the 017C treatment record and update approved planning closeout files.

## Out Of Scope

Builder must not:

- delete, edit, enumerate broadly, hydrate, archive, copy, or relocate `.release-main/`;
- edit, delete, move, stage, or commit `.claude/` descendants;
- edit or ignore `samples/README.md`;
- add sample data, exports, fixtures, or examples;
- parse, convert, re-save, rename, duplicate, stage, or commit the DOCX;
- overwrite an existing DOCX destination;
- add broad ignore rules such as `.release-main`, `.claude`, `references/`, `samples/`, `*.docx`, or equivalent unanchored patterns;
- change ignore treatment for environment files, generated output, dependencies, validation logs, Supabase temporary data, or unrelated paths;
- stage, unstage, commit, amend, reset, restore, switch/create branches, push, pull, fetch, or create a PR;
- edit application, component, library, package, migration, script, test, general documentation, or reference content outside the exact DOCX relocation;
- inspect environment-file contents, protected support correlations, credentials, tokens, cookies, sessions, keys, or passwords;
- contact Supabase, Vercel, Stripe, GitHub, DNS, email, or another remote service;
- deploy, migrate, mutate production, run hosted diagnostics, reopen public surfaces, or perform billing/commerce actions;
- prepare or execute the 017D staging plan.

## Approved File Set

Builder may create or edit only:

- `.gitignore`
- `Sprint list 190726.docx`, only as the source of the exact move
- `references/client-docs/Sprint list 190726.docx`, only as the destination of the exact move
- `planning/reviews/017C-repository-treatment-and-boundary-reconciliation.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, for the four durable treatment decisions
- `planning/RISKS.md`, only for new or materially changed treatment risks
- `planning/QUESTIONS.md`, only to close or replace the four 017B treatment questions

The applied four sprint files are Pack-generated inputs and must remain unchanged except for Builder completion annotations in `acceptance.md` where the established method requires them.

All other paths are read-only.

## Required Output

`planning/reviews/017C-repository-treatment-and-boundary-reconciliation.md` must record:

- opening and closing branch, HEAD, index, and status counts;
- exact `.gitignore` rules added and proof they occur once;
- proof that `.release-main/` and `.claude/` remain present and are ignored only by the intended anchored rules;
- proof that equivalent nested historical paths remain unaffected;
- proof that `samples/README.md` remains byte-for-byte unchanged, using a safe SHA-256 comparison;
- DOCX source/destination preflight, pre-move hash, post-move hash, size comparison, source absence, and destination presence;
- the final disposition of all four paths;
- the resulting delta for 017D;
- manual-intervention records where required;
- explicit confirmation that no staging, commit, protected-content inspection, remote action, or production action occurred.

## Manual Intervention Rule

Whenever something required does not work, is blocked, or needs user/manual input, Builder must record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- step-by-step instructions for completing that action;
- what Builder will verify after the action is complete.

Specific stop cases include:

- the DOCX source is missing;
- the DOCX destination already exists;
- OneDrive or filesystem behavior prevents a verified exact move;
- pre/post DOCX hashes or sizes differ;
- `.release-main/` or `.claude/` would need traversal, deletion, or modification;
- the new anchored rules unexpectedly ignore paths outside the root targets;
- the Git index or HEAD changes unexpectedly.

## Rollback

Before any mutation, record the opening `.gitignore` diff and DOCX source metadata/hash.

If validation fails:

1. Do not use destructive Git commands.
2. Remove only the two exact newly added ignore lines if they were added by this sprint and safe patch reversal is possible.
3. If the DOCX moved successfully and its destination hash matches the recorded source hash, move it back to the original root path only when the original path is absent.
4. Revalidate source/destination uniqueness and hash.
5. Record the rollback and close `treatment-blocked-clean` if the intended final state cannot be proven.

Never overwrite either DOCX path during rollback.

## Completion Outcomes

- `treatment-complete`: all four dispositions are established and validated.
- `treatment-blocked-clean`: safe treatment cannot finish and rollback or unchanged-state evidence is complete.

Neither outcome implies staging, commit, push, remote backup, product readiness, or production readiness.

============================================================
FILE: planning/sprints/017C-repository-treatment-and-boundary-reconciliation/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/017C-repository-treatment-and-boundary-reconciliation/acceptance.md
============================================================

# Sprint 017C — Repository Treatment And Boundary Reconciliation Acceptance

## Required Acceptance Criteria

- [ ] Builder read all required authority, 017B evidence, and applied 017C files.
- [ ] Opening branch, full HEAD, index, status counts, and safe target metadata are recorded.
- [ ] Opening Git index is empty or otherwise recorded exactly and remains unchanged throughout 017C.
- [ ] `.release-main/`, `.claude/`, `samples/README.md`, root DOCX, and absent destination preconditions are verified before mutation.
- [ ] `.gitignore` contains exactly one `/.release-main/` rule added by 017C.
- [ ] `.gitignore` contains exactly one `/.claude/` rule added by 017C.
- [ ] No unanchored or broad equivalent ignore pattern was added.
- [ ] Root `.release-main/` remains present, unchanged by 017C, and is ignored by the exact anchored rule.
- [ ] Root `.claude/` and its recorded command files remain present, unchanged by 017C, and are ignored by the exact anchored rule.
- [ ] Historical nested/reference `.release-main` paths are not newly ignored by the anchored root rule.
- [ ] `samples/README.md` remains at its original path, is not ignored, and has matching pre/post SHA-256.
- [ ] No sample data, export, fixture, example, credential, or production content was added.
- [ ] Root `Sprint list 190726.docx` was moved only to `references/client-docs/Sprint list 190726.docx`.
- [ ] DOCX destination was absent before the move and was not overwritten.
- [ ] DOCX filename, byte size, and SHA-256 are identical before and after the move.
- [ ] DOCX root source is absent and exact client-docs destination is present after the move.
- [ ] DOCX was not parsed, converted, re-saved, duplicated, staged, or committed.
- [ ] The 017C review records the final disposition and verification evidence for all four targets.
- [ ] The 017C review records clear 017D candidates and exclusions without staging them.
- [ ] Every blocker/manual dependency includes what failed, evidence checked, exact action, step-by-step instructions, and later verification.
- [ ] Only the approved file set changed beyond Pack application.
- [ ] No application, component, library, package, migration, script, test, unrelated documentation/reference, environment, protected-support, or nested-repository content changed.
- [ ] No staging, unstaging, commit, branch change, push, pull, fetch, PR, deployment, remote call, hosted diagnostic, migration, production mutation, Stripe, billing, DNS, or public reopening occurred.
- [ ] Closing branch and HEAD match opening values and Git index state is unchanged.
- [ ] `planning/STATUS.json` parses successfully.
- [ ] `git diff --check` passes for approved text files.
- [ ] Final outcome is exactly `treatment-complete` or `treatment-blocked-clean`, with limitations stated accurately.

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

============================================================
FILE: planning/sprints/017C-repository-treatment-and-boundary-reconciliation/handoff-prompt.md
============================================================

# Sprint 017C — Builder Handoff Prompt

You are Builder for Sprint `017C-repository-treatment-and-boundary-reconciliation` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, then execute only from those applied sprint files.

## Mission

Resolve the four exact 017B repository-treatment decisions:

1. Preserve `.release-main/` locally and ignore it with `/.release-main/`.
2. Preserve `.claude/` locally and ignore it with `/.claude/`.
3. Retain unchanged `samples/README.md` as a project-scaffold candidate for 017D.
4. Move the unchanged Sprint-list DOCX into `references/client-docs/` with matching size and SHA-256.

## Hard Boundaries

- Preserve branch, HEAD, and Git index state.
- Do not stage, unstage, commit, delete, overwrite, reset, restore, branch, push, pull, fetch, or create a PR.
- Do not traverse or modify `.release-main/` or `.claude/` contents.
- Do not edit or ignore `samples/README.md`.
- Do not open, parse, convert, re-save, duplicate, stage, or commit the DOCX.
- Do not add broad/unanchored ignore rules.
- Do not edit implementation or unrelated files.
- Do not inspect protected content or contact external systems.
- Do not perform 017D staging work.

## Required Deliverable

Create `planning/reviews/017C-repository-treatment-and-boundary-reconciliation.md` and update only the approved planning closeout files.

The review must include exact ignore evidence, pre/post hashes, DOCX relocation proof, final dispositions, 017D candidates/exclusions, and the non-mutation statement.

## Manual Intervention

At any failed precondition or validation, stop and record:

1. what is blocked;
2. evidence already checked;
3. exact user/manual action needed;
4. step-by-step instructions;
5. what Builder will verify afterward.

Use the bounded rollback only when 017C already changed state and exact safe reversal is possible. Never overwrite or delete either DOCX path.

## Closeout

Close as `treatment-complete` or `treatment-blocked-clean`. State explicitly that 017C does not establish staging, a commit, remote backup, product readiness, or production readiness.
