# Sprint 023J — Local Contract Completion And Validation

Outcome: `remote-candidate-ready-for-commit`.

The approved operator, rollback, production boundary, provider/privacy and Storage-recovery decisions are recorded in the target and provider evidence. Exact target, ledger and aggregate preflight passed before local completion.

Local candidate migration `0019_test_evidence_remote_contract_completion.sql` was created additively; migrations `0001`–`0018` remain unchanged. SHA-256 for the corrected candidate `0019` is `67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A`.

## Review-blocker corrections

Three review blockers were corrected before reissuing the outcome:

1. `replaceEvidence` now initiates a new upload request with `replacesId`; it never calls rejected lifecycle operation `replace`. The migration requires an available same-test unreplaced predecessor, denies invalid or concurrent replacement attempts, and creates only a successor reservation. Fail-closed finalisation blocks the successor and never updates predecessor `replaced_by_id`, so no unavailable-safety cutover occurs.
2. Purge is governed and two phase. Authenticated authorization checks `evidence.purge`, exact `soft_deleted` eligibility/age and no active hold, then transitions idempotently to `purge_pending`. The server-only client deletes through the Storage API, verifies the exact object row is absent, and only then invokes service-role tombstone completion. Delete, verification or completion failure returns `temporary`, leaves retryable state and cannot report success.
3. Expired reconciliation claims bounded scoped work under the advisory overlap lock and a one-minute retry lease. The server-only reconciler deletes through the Storage API, verifies absence and invokes idempotent service-role metadata completion. Attempts remain active and metadata remains pending on delete/verification/completion failure; migration SQL never deletes only `storage.objects` rows.

Focused behavioral proof covers replacement initiation/unavailable safety/predecessor preservation/invalid denial; purge permission, hold, age, pending transition, deletion and verification failures; expired cleanup, retry lease, overlap lock, idempotent completion, delete failure without false success; and audit/redaction/no-oracle output. Filename-only secret-pattern scan returned `0` hits.

## Data API Storage-schema correction

The application-side `.schema("storage")` query was removed after review established that this project exposes only `public` and `graphql_public` through the Data API. No exposed-schema setting was changed. Server orchestration now:

1. marks/claims the exact work in PostgreSQL;
2. deletes the exact opaque key through the Supabase Storage API;
3. calls a service-role-only completion RPC; and
4. relies on that RPC's atomic `storage.objects` absence predicate before completing the audited tombstone or expired-attempt transition.

Both completion RPCs revoke execution from `public`, `anon` and `authenticated`, grant only `service_role`, reject completion while the object row exists, and return true idempotently only for the already completed final state. Storage deletion failure or RPC rejection remains `temporary`; no success is reported. Focused tests prove production evidence code has no `.schema("storage")` access, service-role scope, object-present rejection, delete-before-complete ordering, retryable delete/completion failures, repeated idempotency and correct final `purged`/`failed` transitions.

Migration `0019` did not require a content change for this correction because its atomic absence guards were already present. Recalculated SHA-256 remains `67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A`.

Implemented local contracts:

- server-derived authenticated actor/test/horse/stable authority, exact acknowledgement, type/size/quota, advisory locking, opaque keys and 24-hour idempotency;
- private `test-evidence` bucket candidate configuration, 5 MiB ceiling and JPEG/PNG/PDF-only MIME allowlist;
- exact live actor-owned intent/key Storage INSERT policy with no ordinary list/read/update/delete policy;
- bounded initiation, lifecycle and reconciliation RPCs with narrow grants and audit events;
- separately designated, unassigned `evidence.purge` permission;
- server-generated signed-direct upload token, browser transfer with overwrite disabled, authoritative Storage metadata finalisation and safe cancellation;
- finalisation forced to unavailable `blocked` state with `safety_services_unavailable`; and
- CSV disabled, no fake scanner/sanitiser and no availability/download bypass.

Passed local proof:

- focused 023E domain and migration tests;
- focused 023J signed-direct and additive migration/RPC/Storage tests;
- adversarial candidate-ledger tests for exact `0001`–`0019`, missing, gap, duplicate, renamed, placeholder, malformed and `0020+` refusal;
- `validate:json`, `test:domain`, `test:roles`, `test:supabase-self`, `validate:static`, `validate:ci`, `validate:local`;
- TypeScript and full ESLint with no warnings/errors; and
- successful production builds from the physical `C:\tmp` isolated worktree, including the complete CI/local matrices.

`git diff --check` passes. Work remains unstaged and uncommitted. No remote migration, Storage resource, secret configuration, deployment, push or production action occurred.
