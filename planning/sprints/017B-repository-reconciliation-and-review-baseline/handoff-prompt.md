# Sprint 017B — Builder Handoff Prompt

You are Builder for Sprint `017B-repository-reconciliation-and-review-baseline` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, then work only from those applied sprint files.

## Mission

Create a complete, non-destructive inventory of the repository state after Sprint 017. Map every current staged, unstaged, deleted, and untracked entry to supported provenance, class, risk, and advisory next treatment so later 017C and 017D work can proceed without guessing.

## Read First

Read the full source-of-truth list in `requirements.md`, especially:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- Sprint 016 working-tree inventory
- Sprint 017 staging review and baseline documentation
- all four applied Sprint 017B files

## Hard Boundaries

- Preserve the Git index exactly.
- Do not stage, unstage, commit, delete, move, archive, restore, reset, switch branches, push, pull, fetch, or create a PR.
- Do not edit source, config, migrations, scripts, tests, packages, general docs, references, ignore rules, or environment guidance.
- Do not read or expose environment-file contents, secrets, credentials, tokens, sessions, cookies, private correlations, or unrestricted support data.
- Do not contact Supabase or any other external system.
- Do not rerun hosted Auth/JWT diagnostics.
- Do not implement 017C or 017D decisions.

## Required Deliverables

Create:

- `planning/reviews/017B-repository-reconciliation-inventory.md`
- `planning/reviews/017B-file-classification.json`

Update only the approved planning closeout files when necessary.

The Markdown and JSON must agree exactly and must distinguish established sprint provenance from inference and unresolved ownership.

## Manual Intervention

If classification needs protected content, destructive action, index mutation, network access, or user judgment, stop that classification path and record:

1. what is blocked;
2. evidence already checked;
3. exact user/manual action needed;
4. step-by-step instructions;
5. what Builder will verify afterward.

## Closeout

Close as `inventory-complete` or `inventory-blocked-clean`. State clearly that 017B does not create a clean tree, staging plan, commit, remote backup, or product-readiness result.
