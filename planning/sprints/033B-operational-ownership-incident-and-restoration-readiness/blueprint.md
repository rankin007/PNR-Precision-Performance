# Sprint 033B Blueprint

## Flight evidence

- Class: `critical`; privacy incidents, access correction, rollback and restoration can expose protected information or corrupt recovery state.
- Invariant: every procedure names an owner, preserves least privilege/privacy-safe evidence, separates database from Storage recovery, fails closed on mismatch and leaves zero rehearsal residue/external effect.
- Trace: approved owner/objective contract -> durable runbook -> pure executable scenario/recovery contract -> encrypted synthetic artifacts -> isolated restore -> integrity/relationship/cleanup verdict -> sanitized evidence/readiness ledgers.
- Negative path: unverified privacy requester, Admin/RLS bypass, P0 copied into chat, alias-only rollback, database-only restore called Storage recovery, corrupted ciphertext, injected database/Storage IV reuse or collision, manifest drift, traversal or residue must fail.
- Ownership fixture: support is Phillip Norman Rankin; platform restore operation is Randell Rankin; rollback/restoration approval requires both. Role-only or single-owner implementations fail.
- Recovery fixture: three related tables and two separate objects restore with exact counts/relationships/hashes under distinct fresh 12-byte database and Storage IVs; forced IV reuse, the same byte total with a changed object, or a broken foreign key fails.
- Migration fixture: exact local chain `0001`-`0025`; stopping at `0023`, duplicate `0024`, or claiming `0024/0025` remote fails. The registered clean-rebuild validator output must also state exact local `0001`-`0025` and remote-uninspected truth.
- Git baseline: HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, branch `codex/025B-versioned-domain-authority-package`, staged `0`, modified tracked `64`, untracked `372` before packing; preserve unrelated work.
- Authority: Sprint 023C supplies Phillip Norman Rankin's privacy/incident authority, address and 4-hour/24-hour targets; Sprint 020G records Randell Rankin and the same Aprec8 owner as joint administration/maintenance/rollback owners; Sprint 036L supplies current five-alias/three-binding compatibility truth.
- Official guidance checked 2026-08-12: OAIC breach response is contain, assess, notify if required, review; APP access/correction guidance uses a reasonable period generally not exceeding 30 days. This sprint is not legal advice.
- Tool fact: Docker CLI exists but no engine responded; standalone `psql`/`pg_dump`/`pg_restore` are absent; remote Supabase is prohibited. Require executable synthetic logical rehearsal and truthful provider-native limitation.
- Uncertainty: private MFA/recovery access, provider-native backups, hosted restore permissions, Production duration, legal/customer acceptance and Production runtime are unverified and cannot be inferred.

## Implementation sequence

1. Dry-run/apply Pack, reread four files, verify canonical/Git baseline.
2. Read operations/access/privacy-region/live-compatibility/migration/acceptance authority.
3. Return exact no-edit critical Builder plan, arithmetic, fixtures, cleanup, closeout and Pack corrections; fresh review before implementation.
4. Write one responsibility/runbook contract for support/access/privacy/incident/severity/escalation/RPO/RTO/cadence/rollback/database/Storage.
5. Reconcile operations/access/deferred records without secrets, provider change or false verification.
6. Implement pure operational and recovery module with injected clock/paths/random material for deterministic tests; generate a fresh 12-byte IV independently for database and Storage, reject an injected collision before encryption/restore, and zero only the owned process-key buffer without claiming total runtime erasure.
7. Prove success plus IV distinctness, forced IV reuse/collision refusal, corruption, wrong-key/tag, missing/extra data, broken relation, version drift, unsafe path and cleanup failures.
8. Reconcile the migration-ledger validator and registered clean-rebuild success output through exact local `0025`, retaining remote-uninspected truth.
9. Record aggregate evidence only: counts, durations, algorithm classes, outcomes and cleanup; no keys/ciphertext/payload/provider/private identifiers.
10. Run focused/retained checks and fresh critical inspection.
11. Close only after PASS. L04 stays deferred; L09 limited; O08/O10/L08 strengthen only to named/local rehearsal. Provider-native/Production restore, 036K, representative acceptance and Done remain open.

## Critical plan review questions

1. Are owner assignments exact without rewriting historical spelling?
2. Can tests/evidence contain any real identifier, secret, provider output, raw path or payload?
3. Are database logical data and Storage objects proved separately with relationships and hashes?
4. Do corruption, incomplete/extra data, wrong version and unsafe paths fail?
5. Is cleanup zero after success and each controlled failure?
6. Are RPO/RTO/cadence internal objectives, not public/provider guarantees?
7. Does rollback require source/alias/binding compatibility?
8. Does migration proof separate local `0024/0025` from remote status?
9. Do private provider access, Production restore, legal/customer acceptance and Done remain open?

## Critical plan finding ledger

| ID | Phase / review | Severity | Signature | Concrete evidence and required correction | Status |
| --- | --- | --- | --- | --- | --- |
| PLAN-001 | Plan / 1 | blocking | AC-31; shared ledger validator -> registered clean-rebuild output; stale local-head diagnostic | The first plan changed the shared ledger authority without owning or asserting the registered consumer's success output. Add its narrow output reconciliation and a registered-output assertion. | resolved in amended Pack before review 2 |
| PLAN-002 | Plan / 1 | blocking | AC-23/AC-25; package encryption -> database/Storage IVs; nonce reuse | The first plan did not require distinct fresh 12-byte AES-GCM IVs or a discriminating forced-reuse failure. Add pre-encryption collision refusal, distinctness/reuse tests and precise owned-key-buffer cleanup language. | resolved in amended Pack before review 2 |

## Acceptable outcomes

- `operational-owners-and-synthetic-restoration-rehearsal-complete-clean`
- `operational-authority-conflict-blocked-clean`
- `synthetic-restoration-integrity-failed-clean`
- `privacy-or-cleanup-boundary-failed-contained`
- `local-validation-failed-clean`
- `critical-inspection-failed-clean`
- `blocked-clean`
