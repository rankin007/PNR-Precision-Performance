# Sprint 023D - Upload And Storage Architecture Design Acceptance

## Baseline

- [x] One clean Sprint 023C commit contains the exact approved Markdown and Word hashes and `decision-contract-approved-clean` closeout.
- [x] Sprint 023C commit descends from clean baseline `a7759f6` and preserves 029M ancestry.
- [x] Sprint 023D begins in a clean isolated branch/worktree from that commit.
- [x] Required paths, hashes, ancestry, status, and non-mutation evidence are recorded.

## Contract Traceability

- [x] Every one of the twenty approved decisions maps to exact architecture sections, invariants, and future tests.
- [x] Sprint 013 categories and 2 MiB constraints are superseded through documented additive design, not edits to migration `0009`.
- [x] Role, assignment, retention, deletion, audit, region, delivery, safety, metadata, retry, orphan, backup/request, acknowledgement, and incident decisions are preserved without expansion.
- [x] No architecture choice contradicts the canonical Markdown or Word contract.

## Data And Storage Design

- [x] Existing schema gap analysis is complete.
- [x] Proposed additive schema includes exact columns, constraints, foreign keys, indexes, state invariants, version lineage, deletion/hold fields, reconciliation fields, and safe audit relationship.
- [x] Pseudo-DDL is documentation only; no migration file exists.
- [x] Private bucket configuration and opaque server-authoritative object keys are fully specified.
- [x] Raw client filenames, stable/horse identifiers where avoidable, secrets, and public paths are absent from object authority.
- [x] No-overwrite, collision, listing, existence-oracle, and signed-URL boundaries are explicit.

## Protocol And Lifecycle

- [x] Server-mediated and signed-direct upload options are compared against verified current platform limits.
- [x] One protocol is selected with documented rationale and rejected alternatives.
- [x] State machine covers initiation, upload, validation, scan/sanitisation, availability, failure/block/quarantine, deletion/restoration, purge, and reconciliation.
- [x] Every transition defines actor, permission, visibility, object/metadata expectation, audit, timeout, retry, and recovery.
- [x] Metadata/object partial failures have deterministic compensation.
- [x] Idempotency, duplicate, replacement, count/aggregate concurrency, and no-overwrite behaviour are complete.

## Permission Agreement

- [x] Application, database RLS/helper, and Storage RLS agree for every operation and accepted role.
- [x] Anonymous, wrong-horse, cross-stable, inactive, suspended, revoked, deleted, unassigned, insufficient-role, stale-link, and client-forged cases are denied explicitly.
- [x] Trainer restoration request, Administrator restoration, governed purge operator, Staff pending replacement, and consultant download semantics are exact.
- [x] No elevated secret reaches the client and no bucket-wide user listing exists.

## File Safety And Operations

- [x] Exact layered validation covers extension, MIME, signature, content, size, count, aggregate, malformed, active, encrypted, and password-protected cases.
- [x] Controlled CSV register/version design is complete without invented source formats.
- [x] EXIF/image and PDF handling preserve visible evidence and remove or reject unsafe metadata/content according to contract.
- [x] Evidence remains unavailable until scanning succeeds.
- [x] Scanner/provider, dependency, service, processor, secret, and failure boundaries are explicitly decided or the design stops blocked.
- [x] Daily reconciliation, 24-hour temporary cleanup, alerting, scheduled-runtime, and operator-recovery design are complete.
- [x] Retention review cadence/operator is approved where required for implementation.
- [x] Soft delete, 30-day restore, holds, purge, backups, exports, requests, and no silent reactivation agree.

## UX, Audit And Proof

- [x] Audit taxonomy and safe fields cover every required event without private payloads, raw paths, signed URLs, or secrets.
- [x] UI states, copy, acknowledgement, progress, failure, retry, duplicate, quarantine, deletion, restoration, mobile, keyboard, focus, screen-reader, reduced-motion, and reflow contracts are complete.
- [x] Proposed Sprint 023E file set, additive migration scope, local test matrix, fixtures, validation, build, route-safety, and privacy/secret checks are exact.
- [x] Future Sprint 023F remote actions and proof remain separately gated.

## Scope And Validation

- [x] Only approved documentation/planning paths changed.
- [x] No production source, schema, migration, package, dependency, test, provider, environment, remote state, or deployment changed.
- [x] Official primary documentation supports current platform claims with access dates.
- [x] JSON validation passes.
- [x] `git diff --check` passes.
- [x] No commit occurs unless separately requested.

## Closeout Outcomes

Close with exactly one:

- `upload-storage-architecture-approved-clean`: complete implementation-ready design, all mandatory pre-implementation decisions resolved, all validation passes, and no production/remote change occurs.
- `architecture-baseline-blocked-clean`: no clean committed Sprint 023C decision baseline exists; no design or source change begins.
- `architecture-decisions-blocked-clean`: architecture discovery/options are documented but a provider, processor, dependency, scanner, scheduler, CSV registry, cadence, contractual, or other design-critical decision remains unresolved; no implementation begins.
- `architecture-design-conflict-blocked-clean`: the approved contract cannot be represented safely within current project/auth/provider constraints without scope or product change; no implementation begins.
- `architecture-validation-blocked-clean`: candidate design exists but traceability, permission agreement, lifecycle integrity, evidence, or validation does not pass; no implementation begins.

No outcome implies implementation, remote readiness, production readiness, legal certification, deployment, Sprint 023 completion, Sprint 024 commencement, or project Done.
