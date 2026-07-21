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
