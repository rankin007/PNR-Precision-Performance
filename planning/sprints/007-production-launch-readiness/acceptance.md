# Sprint 007 - Production Launch Readiness Acceptance

Sprint 007 is complete when all applicable acceptance criteria are met or explicitly blocked with manual-intervention instructions that identify the exact remaining user/manual action required before launch.

## Deployment And Environment Acceptance

- current deployment configuration and Vercel linkage evidence are inspected and summarized
- production/staging target assumptions are confirmed from local evidence or flagged for user confirmation
- production domain and `NEXT_PUBLIC_SITE_URL` expectation are confirmed or flagged with exact manual-intervention instructions
- required environment variables are checked by name/presence/requiredness only
- no environment values, secret values, credential values, connection strings, tokens, or fragments are printed or documented
- setup/status or equivalent readiness checks report useful non-sensitive state
- deployment/runbook notes identify how to verify, promote, and roll back without guessing
- no production deployment, production setting change, or DNS change occurs unless explicitly authorized and documented

## Public And Auth Smoke Acceptance

- public home/marketing routes load locally or in the verified target environment
- `/sign-in` loads and presents a usable sign-in path
- `/auth/callback` handles missing/invalid callback state safely
- successful sign-in and redirect behavior are verified with a safe test user or blocked with exact manual-intervention instructions
- anonymous, inactive/non-member, active member, record-writer, and admin access outcomes are verified where safe access exists or blocked with exact manual-intervention instructions

## Portal And Data-Entry Smoke Acceptance

- `/portal` access is verified for active members or blocked with exact manual-intervention instructions
- horse list/detail visibility is verified with assigned-horse fixtures or blocked with exact manual-intervention instructions
- reports page access is verified or blocked with exact manual-intervention instructions
- `/data-entry` denies users without operational write permission
- daily record, feeding log, track session, recent submission, and correction flows are verified with safe fixtures or blocked with exact manual-intervention instructions
- phone-width and desktop-width smoke are completed or blocked with exact manual-intervention instructions
- Sprint 004-005 auth/RLS/workflow evidence docs are updated only where Sprint 007 changes evidence or blockers

## Admin And Commerce Smoke Acceptance

- `/admin` remains gated to `platform.admin`
- `/admin/users` status management smoke is verified or blocked with exact manual-intervention instructions
- `/admin/memberships` assignment smoke is verified or blocked with exact manual-intervention instructions
- `/admin/commerce` read-only products/orders/payments visibility is verified or blocked with exact manual-intervention instructions
- `/shop` uses database-backed active products when configured
- fallback products remain checkout-disabled when configuration is absent
- active product detail and inactive/unavailable product behavior are verified or blocked with exact manual-intervention instructions
- checkout missing slug, inactive/unavailable product, missing config, and configured happy path through Stripe test mode are verified or blocked with exact manual-intervention instructions
- webhook missing signature, invalid signature, supported event reconciliation, duplicate delivery, and missing/out-of-order metadata behavior are verified or blocked with exact manual-intervention instructions
- Sprint 006 admin/commerce evidence docs are updated only where Sprint 007 changes evidence or blockers

## Security And Scope Acceptance

- no secret values or secret fragments are printed, logged, committed, or documented
- no live Stripe charge, refund, payout, subscription, tax, or production account change is performed
- no production deployment, production setting change, or DNS change is performed unless explicitly authorized and documented
- no destructive database/data operation is performed
- no broad schema redesign is performed
- files outside the Sprint 007 approved file set are not modified
- Sprint 004 portal/auth/RLS access behavior is not intentionally weakened
- Sprint 005 portal/data-entry workflow behavior is not intentionally weakened
- Sprint 006 admin/commerce/checkout/webhook behavior is not intentionally weakened
- every blocked/manual-input-required case is flagged with instructions under the manual intervention rule

## Documentation Acceptance

- `docs/PRODUCTION_LAUNCH_READINESS.md` records:
  - launch surface map
  - deployment/environment evidence
  - smoke matrix results
  - Supabase/auth/RLS verification results or blockers
  - portal/data-entry verification results or blockers
  - admin/commerce/Stripe verification results or blockers
  - manual-intervention instructions
  - launch runbook
  - rollback notes
  - client acceptance checklist
  - final go/no-go status
- `docs/DEPLOYMENT.md` reflects current non-secret launch and rollback notes
- `docs/ENVIRONMENT.md` reflects any non-secret launch environment contract clarifications
- `docs/READINESS_AUDIT.md` includes a Sprint 007 closeout section
- `docs/VALIDATION.md` reflects current validation results
- `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/PORTAL_DATA_ENTRY_WORKFLOW.md`, and `docs/ADMIN_COMMERCE_HARDENING.md` are updated only where Sprint 007 evidence changes their carried blockers
- `planning/DECISIONS.md`, `planning/DOMAIN.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` are updated only where Sprint 007 changed durable decisions/context/risks/questions
- `planning/ARCHITECT_BRIEFING.md` is refreshed for final handoff
- `planning/STATE.md` and `planning/STATUS.json` are updated at close

## Validation Acceptance

Required commands/checks:

- `git status --short`
- inspect deployment configuration, `.vercel` linkage, `vercel.json`, setup/status route, environment docs, and deployment docs
- inspect public/auth/portal/data-entry/admin/shop/checkout/webhook smoke surfaces
- non-secret environment presence check for Supabase, Stripe, Vercel/site URL, and admin/commerce variables as needed
- secret-fragment scan of changed diagnostics/logging/docs
- public smoke matrix:
  - home/public route load
  - `/shop`
  - `/shop/[slug]` active product or documented blocked fixture
  - unavailable product behavior
- auth/access smoke matrix:
  - anonymous -> `/portal`
  - anonymous -> `/admin`
  - sign-in page load
  - callback missing/invalid state
  - active member -> `/portal`, or blocked live case documented
  - record writer -> `/data-entry`, or blocked live case documented
  - read-only member -> denied from `/data-entry`, or blocked live case documented
  - admin -> `/admin`, or blocked live case documented
- portal/data-entry smoke matrix:
  - horse list/detail with assigned fixture, or blocked live case documented
  - daily record create/edit, or blocked live case documented
  - feeding log create/edit, or blocked live case documented
  - track session create/edit, or blocked live case documented
  - submission review/correction, or blocked live case documented
  - phone-width and desktop-width authenticated smoke, or blocked live case documented
- admin/commerce/Stripe smoke matrix:
  - `/admin/users` valid/invalid status update, or blocked live case documented
  - `/admin/memberships` valid/repeated/invalid assignment, or blocked live case documented
  - `/admin/commerce` products/orders/payments visibility, or blocked live case documented
  - checkout missing config
  - checkout inactive/unavailable product
  - checkout configured Stripe test session, or blocked live case documented
  - webhook missing/invalid signature
  - webhook supported event reconciliation, or blocked live case documented
  - duplicate supported webhook delivery, or blocked live case documented
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`
- post-validation process check for `node/npm`

Searches must not print environment values. If a command would show values from `.env*`, use targeted name-only parsing or inspect manually without copying values into docs.

Do not install packages from the network unless the user approves the required network access.
