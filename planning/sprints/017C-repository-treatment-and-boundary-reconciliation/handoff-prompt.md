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
