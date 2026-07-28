# Sprint 023E - Local Upload And Storage Implementation And Proof Blueprint

## Phase 1 - Baseline, Ledger And Pack Gate

1. Verify exact baseline commit, ancestry, governed architecture hash, 023D closeout, clean status and migration ledger through `0017`.
2. Create the isolated 023E branch/worktree from the exact baseline.
3. Apply the Pack and verify the four generated sprint files byte-for-byte against it.
4. Record original-worktree non-mutation and approved-file manifest.
5. Stop cleanly if baseline, ancestry, hash, ledger or isolation fails.

## Phase 2 - Executable Migration Translation

1. Reconcile the pseudo-DDL with exact committed table/helper/type names.
2. Write one additive `0018` migration with inventory gate before any backfill or constraint replacement.
3. Implement deterministic legacy classification and `legacy_unverified` fail-closed behaviour.
4. Implement exact composite authority, state/content/lifecycle constraints and related tables.
5. Implement lineage and atomic quota/replacement/restoration safeguards.
6. Implement scoped routines, RLS, grants and safe audit relationships without weakening existing access.
7. Validate SQL structure/order, immutable ledger and bootstrap alignment without applying the migration.

If exact executable SQL conflicts materially with approved architecture, stop and report the conflict before source/UI work that depends on it.

## Phase 3 - Domain And Server Implementation

1. Implement exhaustive typed states, transitions, visibility and quota semantics.
2. Implement safe input/result contracts, filename normalization and JPEG/PNG/PDF signature validation.
3. Implement disabled controlled-CSV and fail-closed scanner/sanitiser boundaries.
4. Implement server-only repository/orchestration with fresh access checks and safe audit/error behaviour.
5. Implement scoped server actions for transfer lifecycle, listing/download, replacement, deletion/restoration, holds and purge.
6. Implement the secret-authenticated bounded reconciliation route without changing hosted configuration.
7. Prove default runtime cannot mark evidence available without approved safety adapters.

## Phase 4 - UI Integration

1. Integrate one evidence panel into the existing biochemistry test route.
2. Preserve the surrounding Sprint 022 workflow and current navigation/role behaviour.
3. Implement exact acknowledgement and honest transfer/safety lifecycle language.
4. Implement selection, validation, cancel/retry, duplicate/replacement, delete/restore, empty/error/pending states.
5. Meet keyboard, focus, live-region, error association, non-colour, reduced-motion, touch, zoom and reflow contracts.
6. Ensure unavailable/blocked evidence has no preview/download path.

## Phase 5 - Deterministic Proof

1. Generate only synthetic non-sensitive test bytes/metadata.
2. Run migration structural/self-tests and explicit invariant coverage.
3. Run domain, lifecycle, permission, concurrency, idempotency, compensation, redaction and reconciliation tests.
4. Run UI state/accessibility structural tests and existing Sprint 022 regression tests.
5. Run canonical JSON, domain, roles, Supabase self-tests, static validation, TypeScript, ESLint, production build and `git diff --check` as available.
6. Inspect changed files for secrets, protected values, raw paths/keys, signed URLs, hashes/private data in logs, accidental dependencies and out-of-scope changes.
7. Clearly classify executed, simulated, structural and deferred proof.

## Phase 6 - Closeout

1. Update implementation documentation and required planning state accurately.
2. Produce the six required reviews and complete acceptance traceability.
3. Confirm no migration/bucket/policy was applied, no provider/remote/deployment action occurred and original worktrees remain unchanged.
4. Finish with exactly one allowed closeout outcome.
5. Leave the isolated branch uncommitted unless the user separately requests a local commit.
6. Do not begin Sprint 023F.
