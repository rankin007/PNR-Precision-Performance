# Sprint 012A - Builder Handoff Prompt

You are Builder for Sprint 012A - Fix, Deploy, And Verify in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/012A-fix-deploy-and-verify/requirements.md`
5. `planning/sprints/012A-fix-deploy-and-verify/blueprint.md`
6. `planning/sprints/012A-fix-deploy-and-verify/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. relevant evidence docs under `docs/`

## Mission

Deploy the Sprint 012 checkout safety fix and verify production behavior/provenance.

This sprint is not Sprint 013. Do not start biochemistry data model, voice, upload, scoring, recommendation, Table of Knowledge, chart, or history-panel work.

## Guardrails

Do not assume deployment target. Confirm Vercel project `pnr-precision-performance` and production domain `https://precisionperformance.com.au` before deploy.

Do not deploy if unexpected app/source changes would be included. Stop and ask.

Do not print, store, or document secrets or secret fragments.

Do not delete files or data.

Do not make destructive database changes.

Do not create live Stripe charges, refunds, payouts, subscriptions, tax changes, or live account changes.

Do not change DNS, project settings, auth, RLS, billing, payment, schema, product catalogue behavior, launch infrastructure, Node runtime compatibility, or broad cleanup.

Do not modify files outside the approved Sprint 012A file set.

If safe remote Supabase access, test users, fixtures, Stripe test-mode checkout, or webhook replay are unavailable, document manual intervention instead of inventing credentials or broadening scope.

## Suggested Execution

1. Read the sprint files and relevant docs.
2. Record current branch/revision and dirty worktree status.
3. Confirm the checkout fix is present in `app/api/checkout/route.ts`.
4. Confirm Vercel project and production target.
5. Check source-state stop conditions.
6. Run local validation with the bounded wrapper.
7. Run local checkout malformed/missing slug smoke where feasible.
8. Deploy to Vercel production only if stop conditions are clear.
9. Inspect the new deployment status, aliases, and source provenance.
10. Run production public/safety smoke.
11. Re-check whether Supabase/authenticated/Stripe gates are safely verifiable; otherwise re-block with exact manual steps.
12. Update evidence docs, planning state, and `planning/ARCHITECT_BRIEFING.md`.

## Closeout Standard

At close, the next Architect should be able to read `planning/ARCHITECT_BRIEFING.md` and know:

- whether the Sprint 012 checkout safety fix is deployed
- what deployment id/URL/source state was verified
- what production smoke passed
- what remains unverified
- what manual action is still needed, if any
- what validation was run
- whether the project is ready to move to Sprint 013 or still needs operator-assisted live acceptance
