# Sprint 006 - Admin And Commerce Hardening Handoff

Builder, you are executing Sprint 006 under the `standard` workflow profile.

Read first:

1. `AGENTS.md`
2. `planning/STATE.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/006-admin-and-commerce-hardening/requirements.md`
6. `planning/sprints/006-admin-and-commerce-hardening/blueprint.md`
7. `planning/sprints/006-admin-and-commerce-hardening/acceptance.md`
8. `planning/SPRINT_SCHEDULE.md`
9. `docs/AUTH_RLS_PORTAL_ACCESS.md`
10. `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`
11. `docs/ENVIRONMENT.md`
12. `docs/VALIDATION.md`
13. `docs/READINESS_AUDIT.md`
14. relevant admin, product, checkout, webhook, commerce helper, Stripe, Supabase, and migration files identified by the sprint

Implementation is authorized for this sprint only within the approved file set and only for launch-critical admin user/membership hardening, admin commerce visibility, product catalogue readiness, existing one-time Stripe checkout session creation, webhook reconciliation into orders/payments, duplicate webhook behavior, related additive/policy-focused migrations, and related documentation/validation.

Start by mapping the current admin and commerce surfaces before editing. Then make the smallest fixes required to make user/member operations, product readiness, checkout creation, webhook reconciliation, duplicate delivery handling, and failure states safe enough for launch verification.

Carry Sprint 004-005 live Supabase/RLS/workflow blockers forward unless access exists. Carry Stripe test checkout and webhook replay blockers forward unless safe test-mode access exists. Every time something does not work or needs user/manual input, flag it with exact instructions under the manual intervention rule.

Do not print secrets. Do not perform live financial operations. Do not deploy. Do not change production project settings. Do not delete data. Do not broaden scope.

Validate lint, TypeScript, build, secret-fragment scans, admin smoke, commerce smoke, and post-validation process state. Close with refreshed documentation and a clean handoff to Sprint 007 - Production Launch Readiness.
