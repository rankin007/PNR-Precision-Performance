# Test Evidence Remote Contract — Sprint 023J

Current hosted boundary: Sprint 023L completed non-production remote application through migration `0021` and protected Vercel Preview deployment of exact commit `379573e4d70a3266f2a8849468b4420e9ddce9c3`. Evidence-proportional governed upload/recovery, authority, reconciliation and cleanup proof passed with final Auth/application/Storage/recovery `0/0/0/0`. This is not Production deployment, public launch, CSV enablement or live scanner/sanitiser readiness.

Historical Sprint 023J candidate status, now superseded: local candidate only; unstaged, uncommitted and unapplied

Migration `0019` completes the missing RPC, private Storage-policy and signed-direct upload contracts on top of immutable candidate migration `0018`. The database derives actor, active-account, test, horse and stable scope; locks quota by test; enforces exact acknowledgement, JPEG/PNG/PDF agreement, 5-MiB object and 10-file/30-MiB test ceilings; issues opaque keys; and keeps 24-hour idempotent attempts.

The private bucket permits no public access and no ordinary authenticated list/read/update/delete. Its sole authenticated INSERT policy requires the exact live, unexpired actor-owned intent and key. The application uses a narrowly scoped signed upload token with overwrite disabled, then finalises against authoritative Storage metadata. Because real approved safety adapters remain absent, finalisation produces unavailable `blocked` state only. CSV is disabled and no availability/download proof is claimed.

Approved boundaries: Phillip N Rankin is operator; Randell J Rankin is rollback owner; exact Supabase candidate is `uvskssaecdhxcgytkasc` in approved Singapore `ap-southeast-1`; Vercel target is Preview on a generated `*.rankin007s-projects.vercel.app` URL with no custom domain; production aliases/environment remain untouched. Approved synthetic-object recovery is encrypted Aprec8-controlled copy, SHA-256 restore verification, 30-day retention and secure deletion unless incident/governance hold applies.

No migration, Storage resource, secret, deployment or remote mutation is performed by this local completion.

Review correction: replacement is a new scoped upload carrying `replacesId`; unavailable successors cannot cut over the predecessor. Purge first authorizes `purge_pending`, then the server-only client deletes Storage bytes and verifies absence before a service-role tombstone. Expired reconciliation returns bounded claimed work to the server, which performs the same delete/verify/finalize sequence. Delete, verification or completion failures remain retryable and cannot be reported as successful; no routine deletes only a `storage.objects` database row.

Data API correction: application code does not query or expose the `storage` schema. After Storage API deletion it invokes service-role-only PostgreSQL completion RPCs. Those RPCs atomically query `storage.objects`, reject completion while the exact object exists, and idempotently accept only the already completed final state. Thus database-side completion is the absence-verification boundary without adding `storage` to exposed schemas.
