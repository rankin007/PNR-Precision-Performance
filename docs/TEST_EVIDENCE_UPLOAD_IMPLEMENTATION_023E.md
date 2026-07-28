# Test Evidence Upload Implementation — Sprint 023E

Status: local candidate implementation; fail closed; uncommitted and unapplied

## Sprint 023J additive completion

Candidate migration `0019_test_evidence_remote_contract_completion.sql` completes the missing local hosted contract additively. It creates private `test-evidence` bucket configuration through migration SQL, enables only JPEG/PNG/PDF at 5 MiB, adds exact actor-owned live-intent Storage INSERT enforcement, implements server-derived initiation/lifecycle/reconciliation RPCs, preserves a separate unassigned `evidence.purge` permission, and grants reconciliation only to `service_role`. CSV remains disabled.

The browser flow receives a narrowly scoped server-generated signed upload token, uploads directly to the exact opaque key with overwrite disabled, and finalises through the authenticated lifecycle RPC. Finalisation verifies authoritative Storage metadata and always ends unavailable as `blocked` with `safety_services_unavailable`; it cannot become `available` while approved scanner/sanitiser adapters are absent. No signed URL, token, raw key, filename or payload is logged.

Both migrations remain local candidate files. Neither migration, bucket, policy, secret nor deployment has been applied or created remotely.

The corrected replacement action initiates a successor upload carrying `replacesId`; it does not use a lifecycle `replace` operation. With safety unavailable, the successor becomes blocked and the predecessor remains unchanged. Governed purge and expired-object compensation are server-only two-phase flows: claim/authorize metadata, delete via Supabase Storage API, verify exact absence, then finalize an audited tombstone or failed-attempt state. Any deletion, verification or completion error remains retryable and produces no success claim.

Sprint 023E implements the approved local boundaries: candidate migration `0018`, typed lifecycle/validation/safety contracts, server-scoped actions/repository, Vercel Cron bearer authentication, and a focused accessible test-evidence panel. The migration was structurally inspected only and was not applied to any database. No bucket or Storage policy exists from this sprint.

JPEG, PNG and PDF signature/MIME/extension/size checks are deterministic. CSV is disabled. Default scanner and sanitiser adapters return unavailable; test fakes require explicit construction. Consequently transferred bytes cannot become available through the default runtime.

The internal route verifies `Authorization: Bearer <CRON_SECRET>` with constant-time comparison and invokes a bounded server-only reconciliation RPC through the existing elevated client. No secret value is created or exposed. Actual database lease/locking, object reconciliation, Storage policies, region, backup, scanner and hosted role behavior remain remote Sprint 023F proof.

The UI starts with an unchecked exact acknowledgement, communicates types/limits/CSV status, associates errors, moves focus to the error alert, uses a polite live region, provides cancellation, and never equates transfer with safety approval. It does not perform an upload until candidate migration/Storage and approved safety services are applied in later authorised work.

Local proof: focused migration and evidence scripts, Sprint 022 regression, JSON/domain/roles/Supabase self-tests, encoding/design-system static checks, TypeScript and production build. The full static suite remains qualified by its pre-existing migration-0009 checkout/hash mismatch.
