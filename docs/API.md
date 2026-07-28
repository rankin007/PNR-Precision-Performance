# API

API details should be documented when a sprint touches behavior. Sprint 011 does not implement or change API behavior; it records planning-level contracts needed for the expanded Done target.

## Existing API / Server Surfaces

Current project evidence includes health/setup routes, checkout, Stripe webhook, auth callback/actions, portal/data-entry/admin server actions, and Supabase-backed domain helpers. Sprint 011 does not modify those surfaces.

## Future Contracts To Design

| Contract area | Likely surface | Required before implementation |
|---|---|---|
| Create test | Server action or route for assigned-horse test creation. | Final test fields, validation ranges, auth/RLS boundaries, audit needs. |
| Upload test media | Server action or signed-upload flow for photos/PDFs. | Storage bucket, file types, size limits, retention, access checks, malware/abuse stance. |
| Voice note capture | Server action or provider callback depending on provider. | Provider selection, transcript confidence, edit/confirm flow, fallback behavior. |
| Calculate/recalculate scores | Server-only scoring module called from create/update flows. | Approved Hydration Score and Health Score formulas, zone thresholds, snapshot strategy. |
| Generate recommendations | Server-only Table of Knowledge lookup/generation. | Approved categories, Level 1-5 comments, disclaimer/review rules, snapshot strategy. |
| Fetch horse trends | Read endpoint/action for chart data. | Time range, AM/PM filters, combined metric rules, role boundaries. |
| Manage Table of Knowledge | Admin-only CRUD surface. | Content ownership, audit trail, preview/publish behavior. |
| Manage chart favorites | Trainer-scoped preference actions. | Default/favorite semantics, assigned-horse scope, per-user persistence. |

## Contract Rules

- No endpoint should expose secret values, raw private keys, webhook secrets, or connection strings.
- Test, upload, score, recommendation, and chart reads must enforce assigned-horse and role boundaries.
- Recalculation behavior must be explicit; historical recommendations should not silently change unless the product decides that is acceptable.
- Any OCR/photo-derived or voice-derived numeric value must be confirmable before persistence as an authoritative reading.

## Sprint 023E Evidence Contracts — Local Candidate

Local server-action boundaries now exist for initiation, finalisation, cancellation, list, 60-second download signing, replacement, soft deletion, restoration request/execution, holds and governed purge, plus `GET /api/internal/evidence/reconcile`. They remain unavailable until candidate migration/Storage is separately applied and approved safety adapters exist.

The Cron route must verify `Authorization: Bearer <CRON_SECRET>`, use bounded idempotent batches and a database-backed concurrency lock, preserve durable retry eligibility, and stop within the function-duration margin. `SUPABASE_SERVICE_ROLE_KEY` stays server-only and never substitutes for record scope, expected-state, hold/age or audit checks. These contracts are documentation only; no endpoint or secret is created by Sprint 023D.
