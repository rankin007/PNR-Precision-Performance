# Sprint 012C - Builder Handoff Prompt

You are Builder for Sprint 012C - Production Baseline Reconstruction in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012C-production-baseline-reconstruction/requirements.md`
5. `planning/sprints/012C-production-baseline-reconstruction/blueprint.md`
6. `planning/sprints/012C-production-baseline-reconstruction/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Create a temporary production-equivalent baseline candidate, apply/preserve only the Sprint 012 checkout malformed POST safety fix on top, validate it, and stop for explicit deployment approval.

Do not deploy.

## Guardrails

Do not modify main workspace app/source files for reconstruction.

Do not delete or revert main workspace files.

Do not deploy to Vercel.

Do not print, store, or document secrets or secret fragments.

Do not mutate production, DNS, Supabase, Stripe, Vercel settings, users, horses, products, orders, payments, subscriptions, or live data.

Do not implement Sprint 013-016 product features.

Only create and edit temporary candidate trees under `C:\tmp\pp-012c-*` plus approved planning/docs updates.

If you cannot distinguish production-equivalent behavior from unrelated dirty workspace changes, stop and document the blocker.

## Suggested Execution

1. Read the sprint files and evidence docs.
2. Record main workspace branch/revision and dirty status.
3. Create a temporary candidate under `C:\tmp`.
4. Copy the current dirty workspace into the candidate.
5. Remove/isolate only known non-production local-only files in the candidate.
6. Preserve uncertain app behavior rather than guessing it away.
7. Ensure `/admin/commerce` exists and `.release-main` extra routes are absent.
8. Ensure the checkout malformed POST guard exists.
9. Validate candidate lint, TypeScript, and build.
10. Run local smoke where feasible.
11. Produce candidate manifest/diff/parity documentation.
12. Update docs and planning.
13. Stop without deployment and recommend whether the candidate is ready for a future deploy approval.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- candidate path
- what source it was based on
- what was removed or isolated
- whether it preserves current production route shape
- whether it includes the checkout fix
- validation/smoke results
- remaining blockers or uncertainties
- whether to ask the user for deployment approval next
