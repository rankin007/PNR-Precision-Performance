# Sprint 012E - Builder Handoff Prompt

You are Builder for Sprint 012E - Repository Cleanup And Archive Baseline in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012E-repository-cleanup-and-archive-baseline/requirements.md`
5. `planning/sprints/012E-repository-cleanup-and-archive-baseline/blueprint.md`
6. `planning/sprints/012E-repository-cleanup-and-archive-baseline/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Clean the project surface before Sprint 013 by archiving clearly stale, redundant, generated, temporary, or misleading files.

Do not change production behavior.

## Guardrails

Do not delete anything.

Do not deploy.

Do not push.

Do not create a pull request.

Do not move or archive `.env*` or secret-bearing files.

Do not print, store, summarize, or copy secret values or fragments.

Do not modify schema, migrations, auth, authorization, RLS, Stripe, checkout, webhook, billing, production data, DNS, Vercel settings, users, horses, products, orders, payments, or subscriptions.

Do not implement Sprint 013-016 product features.

Do not move runtime source files unless separately approved.

If a file is ambiguous, leave it in place and list it as `needs-user-decision`.

## Suggested Execution

1. Read sprint files and current planning state.
2. Record current branch, commit, and `git status --short`.
3. Inventory cleanup candidates.
4. Classify candidates as keep, archive, ignore, or needs-user-decision.
5. Archive low-risk approved candidates to `references/archive/sprint-012e-repository-cleanup/`.
6. Write `MANIFEST.md` with original path, archived path, classification, reason, tracked status if known, and validation note.
7. Write `docs/REPOSITORY_CLEANUP_012E.md`.
8. Confirm no secrets or runtime behavior files were archived.
9. Run lint, TypeScript, build, and route/source checks.
10. Update planning state/status/briefing/risks/questions/schedule.
11. Stop before any deployment, push, PR, deletion, or product feature work.

## Closeout Standard

At close, the next Architect should know:

- what was archived
- what was intentionally kept
- what remains ambiguous
- whether validation passed
- whether any cleanup needs user decision
- whether Sprint 013 can safely begin from the cleaned project surface
