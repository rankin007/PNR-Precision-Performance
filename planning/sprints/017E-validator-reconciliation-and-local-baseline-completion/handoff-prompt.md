# Sprint 017E — Builder Handoff Prompt

You are Builder for Sprint `017E-validator-reconciliation-and-local-baseline-completion` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, and execute only from those applied files.

## Mission

Correct the stale Sprint 020G validator from exact ledger `0001`–`0010` to accepted exact ledger `0001`–`0012`, prove that narrow correction independently, then repeat the full exact-staging and credential-free validation process and create two local commits only if every gate passes:

1. `chore: establish post-sprint-021 repository baseline`
2. `docs: close sprint 017E repository baseline`

## Non-Negotiable Boundaries

- Change only the validator’s expected range and matching failure message.
- Do not edit, rename, reorder, replay, repair, or apply migrations.
- Never use broad or directory staging.
- Never stage protected/local-only content, even temporarily.
- Do not inspect protected contents.
- Do not edit other files to make validation pass.
- Do not run remote/protected execution harnesses.
- Do not amend, reset, rebase, squash, switch branches, push, fetch, pull, create a PR, deploy, or contact external systems.

## Required Sequence

1. Capture and verify opening state and exclusions.
2. Make and independently validate the exact two-line semantic validator correction.
3. Build a fresh current-state manifest and pre-commit review.
4. Stage exact literal manifest paths only.
5. Prove staged equality, exclusions, secret/binary/mode safety, Pack/JSON checks, and named representative group reviews.
6. Run the full credential-free suite from the beginning.
7. Create Commit 1 only after every gate passes.
8. Produce the closeout review and approved planning updates.
9. Stage and validate only exact closeout files.
10. Create Commit 2 and prove a clean non-ignored working tree and empty index.

## Required Outputs

- `planning/reviews/017E-staging-manifest.json`
- `planning/reviews/017E-precommit-review.md`
- `planning/reviews/017E-local-baseline-completion-review.md`
- updated approved closeout planning files and annotated acceptance

## Failure Handling

Before staging, preserve the empty index. After staging but before Commit 1, unstage only exact manifest paths and preserve all working files. After Commit 1, preserve it without amend/reset/revert if closeout cannot finish.

Record full manual-intervention instructions for every blocker.

## Closeout

Report both commit hashes only if both commits succeed. State explicitly that no push, PR, remote backup, hosted change, provider resolution, authenticated proof, deployment, or production-readiness result occurred.
