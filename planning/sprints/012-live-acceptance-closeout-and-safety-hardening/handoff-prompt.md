# Sprint 012 - Builder Handoff Prompt

You are Builder for Sprint 012 - Live Acceptance Closeout And Safety Hardening in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/requirements.md`
5. `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/blueprint.md`
6. `planning/sprints/012-live-acceptance-closeout-and-safety-hardening/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Close or explicitly re-block the remaining deployed-MVP live acceptance gates, and harden malformed checkout POST behavior.

This sprint is not the start of the expanded biochemistry product build. It prepares the project to move safely into Sprint 013 by dealing with current live acceptance and a known checkout safety issue.

## Guardrails

Do not print, store, or document secrets or secret fragments.

Do not delete files or data.

Do not make destructive database changes.

Do not create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes.

Do not change DNS, production project settings, auth, RLS, billing, payment, schema, product catalogue behavior, launch infrastructure, Node runtime compatibility, or broad cleanup.

Do not implement biochemistry test model, voice notes, uploads, scoring, recommendations, Table of Knowledge, trends, saved charts, or other Sprint 013-016 work.

Do not modify files outside the approved Sprint 012 file set.

If safe remote access, test users, fixtures, Stripe test-mode checkout, or webhook replay are unavailable, document the manual intervention instead of inventing credentials or broadening scope.

## Suggested Execution

1. Read the sprint files and relevant docs.
2. Record current branch/revision and dirty worktree status.
3. Inspect current checkout route behavior.
4. Add the smallest safe form-parse guard in `app/api/checkout/route.ts`.
5. Verify missing-slug and malformed checkout POST behavior locally where feasible.
6. Run local validation with the bounded wrapper.
7. Check safe availability of Supabase and Stripe verification paths.
8. Apply or verify the Sprint 008 Supabase migration remotely only if a safe existing path exists.
9. Run non-destructive membership/permission/RLS checks if safe access exists.
10. Run authenticated portal/data-entry/admin smoke if launch test sessions and fixtures exist.
11. Run Stripe test checkout and signed webhook replay only in test mode if safe access exists.
12. Re-run production public/safety smoke.
13. Update evidence docs, planning state, and `planning/ARCHITECT_BRIEFING.md`.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- whether malformed checkout POSTs are hardened
- what Sprint 012 verified
- what remains unverified
- whether live acceptance is complete, partial, or blocked
- what manual action is still needed, if any
- what validation was run
- whether the project is ready for Sprint 013 data-model planning/build
