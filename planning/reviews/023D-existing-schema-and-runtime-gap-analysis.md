# Sprint 023D - Existing Schema And Runtime Gap Analysis

Date: 2026-07-28
Official documentation accessed: 2026-07-28

## Existing Repository State

Migration `0009_biochemistry_test_data_model.sql` is immutable applied history. It creates `public.biochemistry_test_uploads` with:

- `id`, `test_id`, and independently supplied `horse_id`;
- raw `file_name`, category, content type, integer byte count, and `storage_path`;
- uploader, creation, soft-delete actor/time/reason;
- categories `pdf`, `csv`, `png`, `jpg`, `jpeg`, and `photo`;
- a 2 MiB check; and
- one test-ID index.

Its RLS permits reads through `can_read_biochemistry_horse`, inserts through `can_write_biochemistry_horse`, and updates through write-or-soft-delete helpers. It does not prove that `test_id` and `horse_id` agree, model stable authority, distinguish operation-specific update rights, represent object identity safely, or enforce the Sprint 023C role-operation matrix.

`lib/domain/biochemistry.ts` repeats the 2 MiB limit and legacy category union. The current application has no evidence upload/list/download/replace/delete/restore/purge actions or UI. Supabase clients use the anonymous key with the authenticated session on browser/server surfaces; an existing server-only service-role client is reserved for privileged bootstrap flows. No Storage bucket/policies, lifecycle state machine, controlled-CSV register, safety scanner/sanitiser, idempotency ledger, hold record, immutable evidence audit, reconciliation job, retention review, or evidence incident notification exists.

The migration ledger is exactly `0001` through `0017`. Any future correction is additive documentation for proposed migration `0018`; Sprint 023D does not create it.

## Contract-To-Source Gaps

| Contract area | Current support | Required additive design |
|---|---|---|
| Types and limits | Legacy categories and 2 MiB | New checks for JPEG/PNG/PDF/controlled CSV, 5 MiB, 10/test, 30 MiB/test; legacy rows remain readable |
| Test/horse/stable authority | Separate test/horse fields | Server-derived authority plus database agreement invariant and stable snapshot/reference |
| Role operations | Broad read/write/delete helpers | Narrow operation helpers for read, upload, replace-own-pending, trainer delete/request-restore, admin restore/hold/quarantine, governed purge, and audit visibility |
| Storage | Path text only | One private bucket proposal, opaque keys, Storage RLS, no listing, no overwrite, object/metadata agreement |
| Lifecycle | Soft-delete fields only | Initiation, unverified/safety-pending, available, blocked/failed, soft-deleted, purge, and reconciliation states |
| Safety | None | Layered byte/content validation, metadata stripping, PDF active-content rejection, scanning interface, unavailable-until-safe rule |
| Reliability | None | 24-hour idempotency, content hash, duplicate confirmation, version lineage, race-safe quotas, compensation and daily reconciliation |
| Retention/holds/backups | None | 30-day restore/purge eligibility, holds, review record, minimal post-purge audit, no silent backup reactivation |
| Audit/privacy | Basic actor fields | Append-only safe event taxonomy and role snapshots excluding content, signed URLs, secrets, raw paths, and unnecessary personal data |
| UI/accessibility | None | Complete state/copy/focus/progress/error/keyboard/mobile/reflow contract |

## Legacy Transition Correction

The design now requires a pre-migration inventory of legacy scope, category/MIME/extension, size, path uniqueness, deletion consistency and referential agreement. It replaces the exact 0009 constraints `biochemistry_test_uploads_file_category_check` and `biochemistry_test_uploads_size_bytes_check`, maps only unambiguous legacy categories, and backfills all legacy evidence unavailable as `legacy_unverified` or `soft_deleted`. Exact composite `(test_id, horse_id, stable_id)` foreign-key agreement, a stable `version_group_id`, and explicit quota-counting/replacement rules remove the earlier implementation-time ambiguity.

## Current Platform Facts

- Supabase documents standard uploads as ideal for files no larger than 6 MB and recommends TUS resumable uploads above 6 MB or where resumability/progress is required. The approved 5 MiB maximum fits standard upload. [Supabase standard uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads), [resumable uploads](https://supabase.com/docs/guides/storage/uploads/resumable-uploads).
- Supabase standard upload rejects an existing path by default; its documentation recommends a new path instead of overwrite. This supports opaque per-version keys and `upsert: false`. [Supabase standard uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads).
- Vercel Functions limit request and response bodies to 4.5 MB and return `413 FUNCTION_PAYLOAD_TOO_LARGE` above that limit. A fully server-mediated upload cannot carry the approved 5 MiB file plus multipart overhead. [Vercel Function limits](https://vercel.com/docs/functions/limitations).
- Supabase Storage is deny-by-default without object RLS policies. Upload needs `INSERT`; overwrite additionally needs `SELECT` and `UPDATE`. The design avoids overwrite and narrows policy to a server-created upload intent. [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control).
- Private buckets apply RLS to download and can be served by server-created time-limited signed URLs. Signed download URLs remain valid until expiry even after Auth signing-key rotation, so the approved 60-second lifetime and fresh issuance check are material. [Supabase private buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [downloads](https://supabase.com/docs/guides/storage/serving/downloads).
- Supabase signed upload URLs are valid for two hours and can upload without further authentication. That lifetime is unnecessarily broad for this contract; it weakens fresh-revocation behaviour and is not selected. [Supabase `createSignedUploadUrl`](https://supabase.com/docs/reference/javascript/storage-from-createsigneduploadurl).
- Supabase supports exact Sydney region `ap-southeast-2`; contractual suitability and the actual project region still require operator/business verification. [Supabase regions](https://supabase.com/docs/guides/platform/regions).
- Supabase database backups do not include Storage objects; restoring a database backup does not restore deleted Storage objects. The approved evidence-backup requirement therefore cannot be inferred from database backup status. [Supabase database backups](https://supabase.com/docs/guides/platform/backups).
- Vercel Cron invokes a production deployment by HTTP GET, can authenticate with `CRON_SECRET` in the `Authorization` header, may deliver duplicate events, and does not retry failed invocations. The reconciliation design therefore requires exact bearer verification, idempotency, a database lock and durable next-run recovery. [Vercel Cron jobs](https://vercel.com/docs/cron-jobs), [manage Cron jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs).
- OAIC describes the general response sequence as contain, assess, notify where required, and review. Sprint 023C's incident process is compatible but is not a legal-compliance certification. [OAIC data breach response](https://www.oaic.gov.au/privacy/notifiable-data-breaches/preventing-preparing-for-and-responding-to-data-breaches/data-breach-preparation-and-response/part-3-responding-to-data-breaches-four-key-steps).

## Protocol Recommendation

Select a three-step authenticated direct standard-upload protocol, subject to the unresolved safety/operations decisions:

1. a server action performs a fresh application/database authority check, locks quota, creates an opaque upload intent/metadata row, and returns only the bucket ID plus opaque object key;
2. the authenticated browser uploads the bytes directly to the private Supabase bucket with `upsert: false`; Storage RLS permits `INSERT` only where the object key matches the actor's live, unexpired intent; and
3. a server finalisation action rechecks authority, reads authoritative object metadata, validates agreement, and advances the row to safety processing. The object is never visible before scanning/sanitisation succeeds.

This avoids Vercel's 4.5 MB body limit, avoids two-hour signed-upload tokens, uses the existing authenticated Supabase browser model, supports browser cancellation, and does not add a resumable-upload dependency for a 5 MiB maximum. Progress should be exposed only if the selected implementation surface can provide trustworthy byte progress without a new dependency; otherwise use determinate lifecycle status plus cancellable in-flight state rather than invented progress percentages.

## Approved Design Resolution

On 28 July 2026 Aprec8 accepted the controlled-CSV deferral, fail-closed scanner/sanitiser adapters, quarterly retention review, explicit `evidence.purge` designation, and mandatory Australian-region/Storage-backup verification. It amended reconciliation to a daily production-only Vercel Cron UTC route using `CRON_SECRET`, bounded idempotent work and a database-backed concurrency lock, and prohibited `EVIDENCE_RECONCILIATION_SECRET`. Only the existing server-only `SUPABASE_SERVICE_ROLE_KEY` may support reconciliation, without replacing scoped state checks and audit. These decisions resolve the architecture; provider, CSV and actual region/backup evidence remain later implementation/production gates.
