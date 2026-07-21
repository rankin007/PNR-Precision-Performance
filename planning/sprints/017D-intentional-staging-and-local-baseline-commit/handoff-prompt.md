# Sprint 017D — Builder Handoff Prompt

You are Builder for Sprint `017D-intentional-staging-and-local-baseline-commit` in the Precision Performance project.

Apply this Pack, verify the generated four-file sprint set, then work only from those applied sprint files.

## Mission

Create a clean, validated local repository baseline using an exact staging manifest and two local commits:

1. `chore: establish post-sprint-021 repository baseline`
2. `docs: close sprint 017D repository baseline`

## Non-Negotiable Boundaries

- Never use `git add .`, `git add -A`, or broad directory staging.
- Never stage protected/local-only content, even temporarily.
- Preserve `.release-main/`, `.claude/`, local environment files, and the restricted 021M escalation record.
- Do not open or scan protected files.
- Do not edit implementation or historical evidence to make validation pass.
- Do not amend, reset, rebase, squash, switch branches, push, pull, fetch, create a PR, deploy, migrate, or contact external services.
- Do not run remote/protected execution harnesses.
- Leave remote handoff to Sprint 017E.

## Required Sequence

1. Verify 017B/017C state and add the exact protected-record ignore rule.
2. Build and validate the exact JSON staging manifest and Markdown pre-commit review.
3. Stage only literal manifest paths.
4. Prove staged set equality, exclusions, binary/mode safety, and secret safety.
5. Run the full credential-free validation suite.
6. Create Commit 1 only after every gate passes.
7. Record Commit 1 evidence in the closeout review and planning files.
8. Stage only closeout files, validate them, and create Commit 2.
9. Prove the final index and non-ignored working tree are clean.

## Required Outputs

- `planning/reviews/017D-staging-manifest.json`
- `planning/reviews/017D-precommit-review.md`
- `planning/reviews/017D-local-baseline-commit-review.md`
- updated approved closeout planning files and annotated acceptance

## Failure Handling

Before Commit 1, unstage only exact manifest paths and close `baseline-blocked-clean` if any gate cannot pass.

After Commit 1, preserve it and close `baseline-committed-closeout-blocked` if the closeout commit cannot safely finish. Never amend, reset, or delete successful work.

For every manual intervention, record what failed, evidence checked, exact action, numbered steps, and what Builder will verify afterward.

## Closeout

Report both commit hashes when complete. State explicitly that no push, PR, remote backup, hosted change, provider resolution, authenticated proof, deployment, or production-readiness result occurred.
