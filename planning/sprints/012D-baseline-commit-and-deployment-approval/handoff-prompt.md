# Sprint 012D - Builder Handoff Prompt

You are Builder for Sprint 012D - Baseline Commit And Deployment Approval in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012D-baseline-commit-and-deployment-approval/requirements.md`
5. `planning/sprints/012D-baseline-commit-and-deployment-approval/blueprint.md`
6. `planning/sprints/012D-baseline-commit-and-deployment-approval/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Convert the validated Sprint 012C candidate into a durable reviewed branch/commit, validate it, and stop for explicit deployment approval.

Do not deploy.

## Guardrails

Do not deploy to Vercel.

Do not push.

Do not create a pull request.

Do not copy or commit `.env*`, secrets, build artifacts, caches, or temp files.

Do not delete or revert unrelated main workspace changes.

Do not mutate production, DNS, Supabase, Stripe, Vercel settings, users, horses, products, orders, payments, subscriptions, or live data.

Do not implement Sprint 013-016 product features.

Stop if route parity is lost, `/admin/commerce` is missing, checkout guard is missing, or validation fails for a meaningful source reason.

## Suggested Execution

1. Read the sprint files and evidence docs.
2. Record current branch/revision and dirty status.
3. Create branch/worktree `codex/012d-production-baseline`.
4. Import source from `C:\tmp\pp-012c-baseline-lean-20260714-173135`.
5. Confirm no `.env*` or artifacts are staged.
6. Verify `/admin/commerce`, checkout guard, and route parity.
7. Run lint, TypeScript, build, and local smoke.
8. Stage reviewed source/docs only.
9. Commit if safe.
10. Update docs and briefing.
11. Stop before deployment and ask for deployment approval.

## Closeout Standard

At close, the next Architect should know:

- branch name
- commit hash, if created
- candidate source path
- validation and smoke status
- whether the baseline is ready for deployment approval
- any blockers
- that no deployment was performed
