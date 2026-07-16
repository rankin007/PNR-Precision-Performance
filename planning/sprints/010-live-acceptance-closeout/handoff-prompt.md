# Sprint 010 - Builder Handoff Prompt

You are Builder for Sprint 010 - Live Acceptance Closeout in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/010-live-acceptance-closeout/requirements.md`
5. `planning/sprints/010-live-acceptance-closeout/blueprint.md`
6. `planning/sprints/010-live-acceptance-closeout/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Close out the live follow-up verification items accepted after Sprint 009:

- remote Supabase migration application
- authenticated Supabase/RLS/member/horse workflow smoke
- Stripe test checkout, signed webhook replay, and duplicate delivery verification

Preserve product behavior. This is a verification/evidence sprint, not a feature sprint.

## Guardrails

Do not print, store, or document secrets or secret fragments.

Do not delete files or data.

Do not make destructive database changes.

Do not create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes.

Do not change DNS, production project settings, auth, RLS, billing, payment, schema, product behavior, launch infrastructure, Node runtime compatibility, or broad cleanup.

Do not modify files outside the approved Sprint 010 file set.

If safe remote access, test users, fixtures, Stripe test-mode checkout, or webhook replay are unavailable, document the manual intervention instead of inventing credentials or broadening scope.

## Suggested Execution

1. Read the sprint files and relevant docs.
2. Record current branch/revision and dirty worktree status.
3. Verify local validation with the bounded wrapper.
4. Check safe availability of Supabase and Stripe verification paths.
5. Apply the Sprint 008 Supabase migration remotely only if a safe existing path exists.
6. Run non-destructive membership/permission/RLS checks if safe access exists.
7. Run authenticated portal/data-entry/admin smoke if launch test sessions and fixtures exist.
8. Run Stripe test checkout and signed webhook replay only in test mode if safe access exists.
9. Re-run production public/safety smoke.
10. Update evidence docs, planning state, and `planning/ARCHITECT_BRIEFING.md`.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- what Sprint 010 verified
- what remains unverified
- whether final live acceptance is complete, partial, or blocked
- what manual action is still needed, if any
- what validation was run
