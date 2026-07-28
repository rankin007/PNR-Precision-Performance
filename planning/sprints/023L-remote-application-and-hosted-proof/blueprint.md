# Sprint 023L - Remote Application And Hosted Proof Blueprint

## Phase 1 - Isolate And Reconcile

1. Verify exact baseline commit, ancestry, clean state, migration hashes and required 023J/023K records.
2. Create the isolated 023L branch/worktree and apply the four-file Pack.
3. Record the operator, rollback owner and protected execution mechanism without secret values.
4. Run all pack-format, JSON and diff checks before external access.

## Phase 2 - Immediate Read-Only Preflight

Immediately before mutation, prove:

- exact Supabase organisation/project/name/region/health and exact Vercel team/project/Preview mapping;
- no production alias/custom domain is attached to the intended Preview deployment path;
- remote migration history is exactly `0001` through `0017`, once each, with local `0018` and `0019` pending;
- exact count-only legacy inventory, collision inventory and Auth/application/Storage zero state still agree with the accepted 023J preflight;
- no existing `test-evidence` bucket, policy, object or partial evidence schema exists;
- supported migration tooling is linked to the exact target; and
- the approved Storage-object recovery method is available and its retention/expiry boundary remains recorded.

Use `BEGIN TRANSACTION READ ONLY ... ROLLBACK` for protected SQL preflight where applicable. If any result differs, stop `remote-immediate-preflight-blocked-clean`; do not repair or clean the target.

## Phase 3 - Apply Migrations Once

1. Capture sanitised pre-apply counts and timestamp.
2. Apply only pending migrations `0018` and `0019` using the supported Supabase migration mechanism.
3. Stop immediately on any migration error. Do not continue manually, repair history or rerun blindly.
4. Verify the remote ledger is exactly `0001` through `0019`, once each.
5. Verify remote migration contents correspond to the committed candidate and record safe hashes where supported.
6. Prove tables, columns, constraints, foreign keys, lineage protections, indexes, triggers, RPCs, grants, RLS and audit contracts.
7. Prove the `test-evidence` bucket is private, capped at 5 MiB and allows JPEG/PNG/PDF only; CSV is excluded.
8. Prove ordinary anonymous/authenticated users cannot list, read, update or delete objects and INSERT is limited to an exact live intent.
9. Prove completion RPC execution is revoked from `public`, `anon` and `authenticated` and granted only to `service_role`.

If the supported migration transaction fails atomically, record the unchanged state. If a partial or unsafe state exists, disable further hosted work, preserve evidence and stop `remote-migration-partial-state-blocked-clean`. Rollback is forward-only and requires a later additive corrective sprint.

## Phase 4 - Storage Recovery Proof Before Deployment

Using one bounded synthetic unavailable object only:

1. establish its integrity hash without recording its opaque key or contents;
2. exercise the approved Storage-object recovery/export method;
3. verify recovered bytes match the original integrity hash;
4. verify retention and expiry behavior is recorded; and
5. remove proof copies without bucket-wide operations.

The object must never become application-available. Database backup evidence alone does not satisfy this phase. If recovery cannot be proven, stop `storage-recovery-proof-blocked-clean` before Preview deployment.

## Phase 5 - Protected Preview Configuration

1. Reconfirm Preview maps only to `uvskssaecdhxcgytkasc`.
2. Configure the matching public Supabase URL/anon key and server-only service-role key only in Vercel Preview protected settings.
3. Generate/configure `CRON_SECRET` only for Preview through a protected mechanism.
4. Verify no evidence secret is client-visible, printed or written to files.
5. Do not add scanner/sanitiser secrets or enable CSV.
6. Do not activate scheduled Cron through a Production deployment. The reconciliation handler is proved by bounded manual Preview invocation only.

Stop `preview-configuration-blocked-clean` on missing, ambiguous, production-scoped or exposed configuration.

## Phase 6 - Deploy Exact Candidate To Preview

1. Build and validate exact commit `a15d89b...` from the isolated clean worktree.
2. Deploy that exact commit to the named Vercel project as Preview.
3. Record deployment ID and generated Preview hostname without query tokens or secret-bearing URLs.
4. Verify no production alias/custom domain moved and no Production deployment was created.
5. Verify the hosted application identifies the expected Supabase project through safe host/reference comparison without exposing keys.

Stop on commit drift, environment mismatch, production classification or unexpected alias behavior.

## Phase 7 - Hosted Synthetic Proof

Use exact owned synthetic fixture IDs and Auth-last cleanup. Prove at minimum:

- anonymous, inactive, suspended, revoked, no-membership, wrong-horse, cross-stable and insufficient-role denial;
- accepted-role initiation under the approved permission agreement;
- server-derived actor, stable, horse, test and object authority;
- unchecked acknowledgement denial;
- accepted JPEG/PNG/PDF at or below 5 MiB and denial of zero-byte, oversize, unknown type and CSV;
- count and 30-MiB quota enforcement;
- exact-key, no-overwrite direct upload with no list/read/update/delete authority;
- finalisation remains `blocked`/unavailable while safety adapters are absent;
- no preview, download or signed-read URL for unavailable evidence;
- idempotent initiation/finalisation and safe concurrent replay;
- replacement failure preserves the predecessor and unavailable successor cannot cut over;
- purge follows `purge_pending`, Storage deletion, atomic absence guard and audited tombstone;
- expired reconciliation claims bounded work, deletes through Storage API, verifies through the completion guard and finalises idempotently;
- deletion/completion failures remain retryable and never return false success;
- missing/wrong reconciliation secret returns opaque `401`, correct Preview secret invokes one bounded batch and overlap does not double-process;
- audit/error output contains no secrets, filenames, keys, URLs or existence oracle; and
- all evidence remains unavailable because scanner/sanitiser services are not approved.

Do not use unrestricted writes to manufacture application success. Never upload live malware or arbitrary internet downloads.

## Phase 8 - Cleanup And Closeout

1. Delete only exact owned synthetic Storage objects through governed operations.
2. Remove exact owned synthetic application fixtures, then Auth users last.
3. Verify final synthetic Auth/application/Storage counts return to `0/0/0` and no orphan attempts, pending purges or reconciliation leases remain.
4. Keep migrations `0018` and `0019`, governed schema/bucket/policies and Preview configuration in place unless the approved recovery/rollback record explicitly requires otherwise; do not improvise destructive teardown.
5. Verify production aliases/domains, production deployment state and unrelated Supabase projects were untouched.
6. Rerun local validation and `git diff --check`.
7. Refresh state, status, evidence index and Architect briefing.

Successful outcome: `remote-application-and-preview-proof-complete-clean`.

Qualified outcomes must name the exact boundary, for example `remote-migrations-applied-preview-proof-blocked-clean` or `hosted-proof-passed-cleanup-blocked`. Never report production readiness, public availability or live safety-provider readiness.

Do not stage or commit the 023L evidence changes unless separately instructed.
