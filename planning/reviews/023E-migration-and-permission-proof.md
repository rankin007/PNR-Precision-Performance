# Sprint 023E — Migration And Permission Proof

Executed: `node scripts/test-test-evidence-migration-023E.mjs` passed. It proves ledger/name, inventory-before-backfill/order, exact old-check replacement, 5 MiB check, legacy unavailable state, composite FK, related tables, state/safety constraints, lineage guards, advisory locking, RLS and grants by structural assertions.

Not executed: PostgreSQL semantics, migration application, Storage bucket/policy or authenticated hosted roles. Candidate 0018 was never sent to a database. Those remain Sprint 023F proof. Application actions re-establish context and test scope; direct mutations are revoked and intended to route through scoped routines. Governed purge remains fail closed pending explicit database permission implementation/proof.
