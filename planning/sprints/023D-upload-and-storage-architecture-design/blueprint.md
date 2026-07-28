# Sprint 023D - Upload And Storage Architecture Design Blueprint

## Phase 1 - Baseline And Contract Gate

1. Verify a clean Sprint 023C commit exists and contains the exact governed contract/document hashes and closeout.
2. Verify ancestry from `a7759f691f0e01482f3a396acd14b2a23dbca5ec` and preservation of 029M lineage.
3. Create an isolated Sprint 023D branch/worktree from that commit.
4. Apply and verify the four Sprint 023D files.
5. Record required paths, hashes, branch/worktree isolation, status, and source-worktree non-mutation.
6. Stop `architecture-baseline-blocked-clean` if the clean Sprint 023C commit does not exist.

Deliver `planning/reviews/023D-baseline-and-contract-verification.md`.

## Phase 2 - Existing-State And Platform Analysis

1. Inventory committed upload metadata schema, helpers, policies, domain constants, actions, clients, hosting configuration, audit patterns, migration ledger, and validation conventions.
2. Map every Sprint 023C decision to current support, additive gap, conflict, or external decision.
3. Verify current provider/platform limits using official primary documentation.
4. Compare server-mediated and signed-direct upload protocols against 5 MiB, progress, cancellation, timeouts, trust, and failure recovery.
5. Record immutable migration constraints and the proposed next-ledger boundary without creating it.

Deliver `planning/reviews/023D-existing-schema-and-runtime-gap-analysis.md`.

## Phase 3 - Complete Architecture

Create `docs/TEST_EVIDENCE_UPLOAD_ARCHITECTURE_023D.md` with:

1. architecture context and trust boundaries;
2. exact logical data model and documented pseudo-DDL;
3. private bucket and opaque object-key design;
4. selected upload/finalisation/download protocol;
5. lifecycle state machine and transition table;
6. application/database/Storage permission agreement;
7. file validation, controlled CSV, EXIF/PDF sanitisation, and malware scanning boundary;
8. idempotency, content hash, duplicate, replacement, compensation, and concurrency design;
9. daily reconciliation and temporary cleanup design;
10. retention review, soft delete, restoration, holds, purge, backup, export, and correction design;
11. audit, logging, metrics, privacy, and incident boundaries;
12. UI/accessibility state contract;
13. implementation sequence and rollback/compensation plan;
14. local proof matrix and synthetic fixture plan;
15. future remote apply/proof plan clearly deferred to 023F; and
16. decisions, alternatives rejected, risks, assumptions, and manual interventions.

Deliver the permission and provider/operations reviews required by the Pack.

## Phase 4 - Resolve Design-Critical Choices

1. Present recommendation and trade-offs for every mandatory pre-implementation decision.
2. Separate choices that can remain an interface boundary from choices required before 023E source implementation.
3. Obtain explicit authority for any provider, processor, dependency, paid service, secret/configuration, scheduled runtime, or business cadence.
4. Update the architecture only with supplied decisions.
5. Stop `architecture-decisions-blocked-clean` if any design-critical choice remains unresolved.

## Phase 5 - Design Validation And Handoff

Validate:

- all twenty Sprint 023C decisions trace to architecture sections and acceptance checks;
- every state and transition has authority, visibility, object/metadata expectation, audit, timeout, and recovery;
- application/database/Storage policies agree for every operation and role;
- wrong-horse/cross-stable/revoked/deleted/stale/forged cases are denied;
- no public bucket/list path or client-held elevated credential exists;
- object/metadata partial failures have deterministic compensation;
- size/count/aggregate and idempotency concurrency races are addressed;
- no score/reading/recommendation behaviour changes;
- proposed implementation file set is narrow and complete;
- no production or remote file changed;
- JSON validation and `git diff --check` pass; and
- official-source citations and access dates support platform claims.

Deliver `planning/reviews/023D-design-validation.md` and `planning/reviews/023D-closeout.md`.

Do not begin Sprint 023E and do not commit unless separately asked.
