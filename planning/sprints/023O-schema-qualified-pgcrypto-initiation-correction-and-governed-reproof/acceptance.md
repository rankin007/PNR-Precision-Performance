# Sprint 023O - Schema-Qualified Pgcrypto Initiation Correction And Governed Reproof Acceptance

## Local Candidate

- [x] Existing 023L/023N evidence is preserved and index begins clean.
- [x] Migration `0020` is the only new migration; `0001` through `0019` remain byte-identical.
- [x] `0020` replaces only `public.initiate_test_evidence_upload` and preserves exact signature/return/security/search-path behavior.
- [x] Only the diagnosed call changes to `extensions.digest(...)`; no unqualified digest remains in the corrected body.
- [x] Search path remains exactly `pg_catalog, public`; extension presence/signature fails closed.
- [x] Exact authenticated grant and public/anon revocation remain.
- [x] Candidate ledger is exactly `0001` through `0020` with adversarial refusal tests.
- [x] Complete local validation, build, approved-path, secret/privacy and diff checks pass.
- [x] Candidate stops uncommitted for separate review/commit instruction.

## Committed And Remote

- [ ] One clean approved candidate commit exists and its SHA is recorded before remote access.
- [ ] Immediate target/ledger/zero-state preflight passes; supported dry run selects only `0020`.
- [ ] Only `0020` is applied once; no reset, repair, retry, seed or other migration action occurs.
- [ ] Remote/local ledger becomes exactly `0001` through `0020`.
- [ ] Read-only metadata proves schema-qualified digest resolution, restricted search path and expected grants.

## Governed Proof And Cleanup

- [ ] One valid governed initiation returns an exact intent without secret/key exposure.
- [ ] One synthetic JPEG transfers through exact intent with overwrite disabled.
- [ ] Finalisation remains unavailable/fail-closed.
- [ ] TLS export, SHA-256, DPAPI encryption/decryption and restored-byte match pass.
- [ ] Governed object removal and recovery/restored-copy deletion pass with verified absence.
- [ ] Final Auth/application/Storage/recovery state is `0/0/0/0` and all orphan counts are zero.
- [ ] No CSV, safety fake, availability, Vercel configuration/deployment, Production action, push or merge occurs.
- [ ] 023O evidence and durable state agree; JSON and `git diff --check` pass.
- [ ] Sprint 023L is classified ready to resume at Preview configuration only.

Any target mismatch, unexpected remote state, migration failure, initiation failure, object/recovery mismatch, secret exposure or uncertain cleanup requires immediate stop and the five-part Manual Intervention Rule.
