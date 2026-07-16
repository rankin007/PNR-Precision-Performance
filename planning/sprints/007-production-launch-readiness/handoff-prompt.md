# Sprint 007 - Production Launch Readiness Handoff

Builder, you are executing Sprint 007 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/007-production-launch-readiness/requirements.md`
6. `planning/sprints/007-production-launch-readiness/blueprint.md`
7. `planning/sprints/007-production-launch-readiness/acceptance.md`
8. `planning/SPRINT_SCHEDULE.md`
9. `docs/DEPLOYMENT.md`
10. `docs/ENVIRONMENT.md`
11. `docs/AUTH_RLS_PORTAL_ACCESS.md`
12. `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
13. `docs/ADMIN_COMMERCE_HARDENING.md`
14. `docs/VALIDATION.md`
15. `docs/READINESS_AUDIT.md`
16. relevant deployment, setup/status, public, auth, portal, data-entry, admin, shop, checkout, webhook, Supabase, Stripe, and validation files identified by the sprint

Implementation is authorized for this sprint only within the approved file set and only for production launch readiness: deployment/environment verification, non-sensitive health/setup checks, public/auth/portal/data-entry/admin/shop/checkout/webhook smoke, Supabase/RLS/role/fixture verification where safe access exists, Stripe test-mode checkout and webhook replay where safe access exists, launch runbook, rollback notes, client acceptance checklist, and the smallest source/documentation fixes needed to make those checks truthful and handoff-ready.

Start by mapping current deployment, environment, setup/status, public, auth, portal, data-entry, admin, commerce, checkout, webhook, and validation surfaces before editing. Separate local/source-backed evidence from live verified evidence and blocked cases.

Carry Sprint 004-006 live Supabase/RLS/workflow/admin/commerce/Stripe blockers forward unless safe non-secret access exists. Every time something does not work or needs user/manual input, flag it with exact instructions under the manual intervention rule.

Do not print secrets. Do not perform live financial operations. Do not deploy, promote, change DNS, or change production project settings without explicit user authorization. Do not delete data. Do not broaden scope.

Validate lint, TypeScript, build, secret-fragment scans, launch smoke checks, and post-validation process state. Close with launch readiness documentation, rollback notes, client acceptance checklist, refreshed planning docs, and an honest go/no-go status.
