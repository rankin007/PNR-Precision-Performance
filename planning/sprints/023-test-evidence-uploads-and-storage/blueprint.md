# Sprint 023 - Test Evidence Uploads And Storage Blueprint

## Execution Sequence

### Phase 1 - Baseline And Authority Reconciliation

1. Inspect original worktree status without changing it.
2. Inventory local and remote branches/commits relevant to 021AH, 022/022B, and 029M.
3. Select a candidate clean product baseline.
4. Prove required migration ledger, workflow files, tests, auth helpers, and planning provenance.
5. Create an isolated Sprint 023 worktree/branch from that commit.
6. Stop cleanly if accepted product source cannot be represented by one clean commit without repository reconciliation.

Deliver `planning/reviews/023-baseline-and-scope-reconciliation.md`.

### Phase 2 - Decision Reconciliation

1. Map all twenty required privacy/data decisions.
2. Compare them with Sprint 013 metadata scaffolding and current role/access contracts.
3. Record each item as accepted, rejected, superseded, or unanswered with source authority.
4. Do not treat existing constants or schema as business approval.
5. Stop before implementation if any schema/access/lifecycle decision remains unanswered.

Deliver `planning/reviews/023-privacy-storage-and-lifecycle-decisions.md`.

### Phase 3 - Detailed Design

After decisions pass, document before coding:

- bucket name and private configuration;
- authoritative object-path format;
- approved types/MIME/extensions and limits;
- metadata schema changes and status lifecycle;
- application permission matrix;
- Storage RLS operations for each role/case;
- upload protocol: signed upload or server-mediated flow;
- metadata/object transaction and compensation model;
- signed-download protocol and lifetime;
- soft-delete, restore if approved, purge, retention, and orphan cleanup;
- audit events and safe evidence fields;
- UI states and accessibility behaviour;
- local synthetic fixture plan; and
- remote synthetic fixture/cleanup plan for later bounded execution.

Deliver `planning/reviews/023-upload-storage-design.md`. Stop if the design requires an unapproved provider, dependency, background service, antivirus service, public bucket, or broad role redesign.

### Phase 4 - Local Implementation

Implement the smallest design satisfying the approved contract:

1. additive schema/metadata changes only if required;
2. deterministic bootstrap alignment;
3. private Storage policy source/configuration artifacts where repository conventions support them;
4. server-side upload, list, download-link, and soft-delete actions;
5. capture/review evidence UI;
6. authorised portal/ops evidence presentation;
7. retry/duplicate/orphan-safe behaviour;
8. focused unit/contract/static tests; and
9. safe logs/errors without identifiers, paths, signed URLs, secrets, or private payloads.

Do not change readings or score behaviour.

### Phase 5 - Local Proof

Prove with synthetic files only:

- permitted and rejected categories;
- boundary sizes and zero/oversized files;
- filename/path sanitisation;
- wrong test/horse/stable and insufficient-role denial contracts;
- no client authority over storage path or uploader identity;
- duplicate/retry behaviour;
- metadata/object compensation;
- list/view/download/delete state transitions;
- deleted/unavailable filtering;
- signed-URL issuance checks without exposing URL values;
- accessible mobile/desktop UI, keyboard, progress, errors, retry, empty states; and
- unchanged capture/scoring behaviour.

Run canonical validation and production build. The inherited migration 0009 Windows byte-hash mismatch must be classified honestly; do not modify immutable history merely to silence it.

### Phase 6 - Remote Stop Or Later Bounded Proof

Without a later exact user instruction, stop after local proof and record:

- proposed migration/bucket/policies;
- exact remote commands/actions required;
- backup/rollback and cleanup;
- controlled fixture identities/files;
- secret names/presence requirements without values; and
- five-part manual intervention.

If a later exact instruction permits remote execution, perform target/link/health/zero-state gates before mutation, apply only the accepted additive change, run the role/storage matrix with synthetic fixtures, clean owned objects/metadata/users in the governed order, and prove final state. Do not deploy the application or publish evidence.

## Architecture Rules

- Prefer server-mediated or narrowly signed uploads according to the accepted design; never expose elevated credentials.
- Storage object path and metadata row must be joined by authoritative test ID and opaque object key.
- Preserve immutable migration history; use the next additive ledger version only after exact validation.
- Avoid database/object pseudo-transactions that can leave silent orphans; define compensation and reconciliation.
- Keep object bytes out of database tables and logs.
- Keep signed URLs out of persistent metadata and evidence reports.
- Treat browser file metadata as untrusted.
- Use Australian English in user-facing copy.

## Evidence Files

Builder must maintain:

- `planning/reviews/023-baseline-and-scope-reconciliation.md`
- `planning/reviews/023-privacy-storage-and-lifecycle-decisions.md`
- `planning/reviews/023-upload-storage-design.md`
- `planning/reviews/023-local-validation-and-ui-evidence.md`
- `planning/reviews/023-remote-storage-proof.md`, only if later bounded remote execution occurs
- `planning/reviews/023-closeout.md`
