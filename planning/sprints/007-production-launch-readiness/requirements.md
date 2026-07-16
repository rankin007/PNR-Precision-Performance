# Sprint 007 - Production Launch Readiness Requirements

## Goal

Prove the Precision Performance MVP is live-ready and handoff-ready.

The sprint is successful when deployment/environment readiness is verified without exposing secrets, public/auth/portal/ops/admin/commerce/checkout smoke paths are tested or explicitly blocked with manual-intervention instructions, Stripe test/live-ready behavior is proved where safe access exists, and the final launch runbook, rollback notes, readiness audit, and client acceptance checklist are durable in the repo.

## Background

Sprints 003-006 moved the project from build-ready scaffold to release baseline, auth/RLS/portal hardening, data-entry workflow hardening, and admin/commerce hardening.

Existing evidence shows:

- Vercel is the local evidence-backed deployment target from `vercel.json`, `.vercel/project.json`, and stack notes
- production project intent and production domain are not yet confirmed
- the environment contract is documented by variable name/category/requiredness in `docs/ENVIRONMENT.md`
- local validation is green under the bounded wrapper with project-local Node `22.14.0`
- Sprint 004 auth/RLS live verification remains blocked by missing Supabase test-user/RLS access
- Sprint 005 portal/data-entry live smoke remains blocked by missing Supabase test users and assigned-horse fixtures
- Sprint 006 admin/commerce/Stripe live smoke remains blocked by missing Supabase/Stripe test access and fixtures
- no production deployment, production project-setting change, DNS change, destructive data operation, or live Stripe financial operation has been performed

## In Scope

Builder should:

- inspect current deployment configuration, Vercel linkage evidence, environment documentation, setup/status endpoints, middleware, routes, and validation scripts before editing
- verify the canonical deployment target and production/staging project assumptions from local evidence, and request user confirmation where local evidence is insufficient
- verify the non-secret environment contract for local/staging/production by name/presence/requiredness only
- improve setup/health/readiness checks only if needed to make launch status truthful and non-sensitive
- run or document smoke tests for:
  - public home/marketing routes
  - `/sign-in` and `/auth/callback` behavior
  - `/portal`, horse list/detail, and reports
  - `/data-entry`, daily records, feeding logs, track sessions, and correction flows
  - `/admin`, `/admin/users`, `/admin/memberships`, and `/admin/commerce`
  - `/shop`, product detail, checkout creation, and checkout failure states
  - Stripe webhook verification and supported event reconciliation
- verify auth, RLS, role, assigned-horse, and operational write boundaries with real Supabase test users if safe non-secret access is available
- verify Stripe test-mode checkout and webhook replay, including duplicate delivery, if safe test access is available
- document every unavailable live smoke path under the manual intervention rule
- create or update a launch runbook with deployment, verification, rollback, and client handoff steps
- create or update a final client acceptance checklist
- refresh readiness, validation, environment/deployment, and carried Sprint 004-006 evidence docs
- refresh planning state/status and Architect briefing at close
- make the smallest source/documentation fixes needed for launch-readiness checks, smoke scripts, non-sensitive status reporting, or handoff clarity

## Out Of Scope

- starting, promoting, or changing a production deployment without explicit user authorization during the sprint
- changing production Vercel/Supabase/Stripe settings without explicit user authorization
- changing DNS or production domains without explicit user authorization
- printing, storing, or documenting secret values, credential values, tokens, passwords, private keys, full connection strings, raw webhook secrets, raw payment method details, or secret fragments
- destructive database changes or destructive production data operations
- deleting users, member profiles, memberships, horses, records, products, orders, payments, files, generated artifacts, or data
- live Stripe charges, refunds, payouts, disputes, tax settings, subscriptions, coupons, promotion codes, invoices, or Connect flows
- broad product redesign, public-site marketing rewrite, or visual polish beyond launch-readiness clarity
- broad schema redesign
- changing auth, RLS, billing, or payment behavior beyond the smallest fix required to make launch-readiness acceptance truthful and safe
- force-removing or force-archiving `.release-main/`
- normalizing or reverting unrelated dirty-worktree changes
- Node 24 compatibility work
- dependency/security remediation from `npm audit`
- installing packages from the network without approval
- AI recommendations, laboratory integrations, E-Trakka integration, native voice recording, multi-login trainer teams, owner/vet/external stakeholder app logins, heavy AWS processing, or laboratory staff workflows

## Non-Functional Requirements

- Keep all diagnostics non-sensitive. Report configured/missing, route status, role labels, fixture labels, safe persisted identifiers, event type, status, and structural error codes only.
- Do not log or document Stripe secret keys, webhook secrets, Supabase service-role keys, tokens, private keys, full connection strings, or fragments.
- Treat launch checks as high-risk: distinguish verified evidence from assumed, blocked, or manually pending cases.
- Preserve the known-good validation path using the bounded wrapper and project-local Node `22.14.0`.
- Do not treat local source inspection as production proof when live access is unavailable.
- Keep source fixes narrow and evidence-driven.

## Required Documentation

Builder must create or update:

- `docs/PRODUCTION_LAUNCH_READINESS.md` with launch evidence, smoke matrix, blockers, manual-intervention instructions, runbook, rollback notes, and client acceptance checklist
- `docs/DEPLOYMENT.md` with production/staging target, domain, deployment, and rollback notes by non-secret evidence only
- `docs/ENVIRONMENT.md` with any non-secret launch environment contract clarifications
- `docs/READINESS_AUDIT.md` with a Sprint 007 closeout section
- `docs/VALIDATION.md` with exact validation command outcomes
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, and `docs/ADMIN_COMMERCE_HARDENING.md` only where Sprint 007 live verification changes carried-forward evidence or blockers
- `planning/ARCHITECT_BRIEFING.md` for final handoff
- planning state/status files at close
