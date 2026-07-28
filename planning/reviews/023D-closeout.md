# Sprint 023D — Closeout

Date: 2026-07-28
Status: `upload-storage-architecture-approved-clean`

Sprint 023D translated the approved Sprint 023C contract and Aprec8's eight architecture decisions into one implementation-ready, fail-closed local design. Its corrected model specifies a blocking legacy inventory and unavailable-state backfill, exact replacement of the 0009 category/2 MiB checks, committed-table foreign keys and composite test/horse/stable invariant, stable version lineage, exact quota states and atomic replacement behavior. It also specifies private opaque-key Storage, authenticated direct upload with server finalisation, exact application/database/Storage permissions, lifecycle/safety, audit/privacy, retention/restore/hold/purge, accessible UI states, and daily locked/idempotent Cron reconciliation.

The design does not claim that CSV, scanning, sanitisation, Australian storage or object recovery are operational. CSV and production-like availability remain disabled until governed inputs and separately approved safety boundaries exist. Production remains blocked until the actual project is proven Sydney `ap-southeast-2`, provider terms are approved, and separate Storage-object backup/recovery/restoration evidence exists.

Validation passed for contract traceability, state/permission agreement, official-source support, JSON, structure, approved paths, prohibited migration/source/config changes, secret safety, diff cleanliness and source-worktree non-mutation. No production source, migration `0018`, dependency, bucket, policy, provider contact, remote mutation, deployment, push, merge, Sprint 023E work or commit occurred.

The branch is ready for a separate local commit instruction. Sprint 023E must be separately planned/applied and Sprint 023F retains remote creation/application/proof.
