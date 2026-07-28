# Architect Briefing

## Where things stand

Sprint 023D is locally complete `upload-storage-architecture-approved-clean` from clean Sprint 023C commit `50ee7e133e03b82c5f4f14cc296f6d29cf3f74ca`. The twenty-decision privacy/storage contract and Aprec8's eight design decisions are translated into a fail-closed implementation architecture. No implementation or remote action occurred.

## Current status

- Branch: `codex/023D-upload-and-storage-architecture-design`.
- Worktree: `C:\tmp\pnr-023d-upload-storage-design`.
- Base: `50ee7e133e03b82c5f4f14cc296f6d29cf3f74ca`.
- Outcome: `upload-storage-architecture-approved-clean`.
- Commit/push: not performed.

## Architecture result

- Authenticated direct standard upload to a future private bucket under exact server-created intent; server finalisation and 60-second signed download.
- Additive future metadata/intent/CSV/hold/audit design with blocking legacy inventory, unavailable backfill, named category/size constraint replacement, exact foreign keys/composite scope invariant and stable version lineage; migration `0009` immutable and no `0018` created.
- Exact role/assignment/RLS/Storage agreement, unavailable-until-safe state machine, quota concurrency, idempotency, replacement, compensation and audit.
- Exact quota-counting states and a bounded, atomic, capacity-neutral replacement cutover that never displaces the predecessor on failure.
- Quarterly retention review; 30-day Administrator restoration; explicit `evidence.purge`; holds override purge.
- Daily production-only UTC Vercel Cron with bearer `CRON_SECRET`, DB-backed lock, bounded idempotent work and durable next-run recovery.

## Mandatory later gates

- CSV is disabled until Aprec8 supplies a governed source/template/version/schema/formula fixture.
- Scanner and sanitiser remain fail-closed adapters; any dependency/provider/service/secret requires separate approval.
- Verify the intended live project is Sydney `ap-southeast-2`; `ap-southeast-1` is Singapore and blocks compliance.
- Approve provider/subprocessor/overseas-access suitability and separate Storage-object backup, recovery, expiry and restoration agreement before production.

## Validation

Passed: pack/baseline/hash verification, twenty-decision trace, schema/state/permission/compensation structure, official primary-source support, JSON parse, approved-path and no-`0018` checks, secret/privacy scan, `git diff --check`, and source-worktree/non-remote boundaries.

## Recommended next Architect action

Only after a separate instruction, create a narrow Sprint 023E local implementation/proof pack from this architecture. Keep provider/dependency approval and all Sprint 023F remote bucket/migration/policy/hosted proof separate.
