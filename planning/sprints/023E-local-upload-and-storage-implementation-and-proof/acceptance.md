# Sprint 023E - Local Upload And Storage Implementation And Proof Acceptance

## Baseline And Scope

- [ ] Exact baseline is `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`, with required ancestry and clean 023D closeout.
- [ ] Architecture hash is `DDDC835E882626A5D3FEB1726830F30C2115C974EAFE8308C25FF3C4F035B565` and size is 30,146 bytes.
- [ ] Ledger is exactly `0001`–`0017` before work and only candidate `0018` is added.
- [ ] Isolated branch/worktree and original-worktree non-mutation are proven.
- [ ] Every changed file is in the approved set and mapped to 023C/023D authority.

## Migration `0018`

- [ ] Applied migrations `0001`–`0017` are unchanged.
- [ ] Legacy inventory precedes backfill/constraint replacement and fails closed on governed discrepancies.
- [ ] Legacy rows become unavailable `legacy_unverified` or governed deleted state without invented safety/object facts.
- [ ] Migration `0009` category/2 MiB constraints are replaced exactly and the 5 MiB contract is enforced.
- [ ] Exact test/horse/stable composite FK and referenced uniqueness are present.
- [ ] Upload attempt, CSV registry, hold and audit relationships match architecture.
- [ ] States, object pair, safety availability, timestamps, deletion/restore/hold/purge and content agreement are constrained.
- [ ] Stable lineage prevents fork, self-link, cycle, cross-test/cross-lineage and identity mutation.
- [ ] Exact quota states, temporary replacement exception and locking prevent races/evasion.
- [ ] Replacement cutover is atomic; failed replacement preserves predecessor; restoration cannot create two active versions.
- [ ] Scoped routines/RLS/grants agree with existing helpers and the permission agreement.
- [ ] SQL is structurally/self-test validated but not applied to any database.

## Domain, Safety And Server Boundaries

- [ ] Typed lifecycle transitions are exhaustive and forbidden transitions fail closed.
- [ ] JPEG/PNG/PDF extension, MIME, signature and size agreement is deterministic.
- [ ] CSV remains disabled without an approved registry entry/schema.
- [ ] Default scanner/sanitiser boundaries fail closed and cannot produce availability.
- [ ] Test-only fakes require explicit injection and cannot be selected by runtime configuration.
- [ ] No new dependency, provider, processor, secret value or hosting component is introduced.
- [ ] Server actions freshly verify user/role/test/horse/stable scope and ignore forged client authority.
- [ ] Safe results/errors/audit/logging exclude secrets, object keys, signed URLs, hashes, private payloads and unnecessary filenames.
- [ ] Download signing is requested only after fresh access and is limited to 60 seconds.
- [ ] Reconciliation route rejects absent/mismatched secret, uses locking/bounds/idempotency and returns only an opaque summary.

## Permission And Failure Proof

- [ ] Accepted positive role operations agree across application, database and Storage layers.
- [ ] Anonymous, wrong-horse, cross-stable, inactive, suspended, revoked, deleted, unassigned, insufficient-role, forged and stale cases are denied.
- [ ] Idempotent replay, duplicate confirmation, opaque no-overwrite identity and compensation are proven.
- [ ] Object-only, metadata-only, expired attempt, missing object and overlapping reconciliation paths remain unavailable and recover safely.
- [ ] Soft deletion conceals immediately; restoration, holds and purge require exact authority.
- [ ] `evidence.purge` remains separately designated; Administrator role alone is insufficient.

## UI And Accessibility

- [ ] Evidence UI is integrated only into the existing test route without regressing Sprint 022.
- [ ] Exact acknowledgement starts unchecked and initiation remains disabled until checked.
- [ ] Types, limits, purpose/privacy, CSV disabled and safe lifecycle guidance are accurate.
- [ ] Transfer completion is never represented as safety approval or availability.
- [ ] Selection, progress/cancel, pending, retry, duplicate/replacement, delete/restore, empty/error/offline and permission states are represented.
- [ ] Keyboard, focus, error association, live regions, non-colour meaning, reduced motion, touch targets and 200% reflow contracts pass deterministic checks/manual inspection evidence.
- [ ] Blocked/unavailable evidence has no preview/download affordance.

## Validation And Evidence

- [ ] Synthetic fixtures contain no real or downloaded data and no live malware.
- [ ] Evidence distinguishes executable, simulated, structural, manual and deferred validation.
- [ ] Focused 023E migration/domain/server/UI tests pass.
- [ ] Existing Sprint 022 workflow and role/access regression tests pass.
- [ ] JSON validation and maintained domain/roles/Supabase/static gates pass.
- [ ] TypeScript, ESLint, production build and `git diff --check` pass, or an unchanged environmental blocker is precisely evidenced without overstating completion.
- [ ] Privacy/secret scan, dependency diff, approved-path check and original-worktree non-mutation pass.
- [ ] No local/remote migration application, bucket/policy creation, provider contact, upload, deployment, push, PR or merge occurs.
- [ ] Required implementation documentation, six reviews and planning closeout are complete.
- [ ] No commit occurs unless separately requested.

## Closeout Outcomes

Close with exactly one:

- `local-upload-storage-implementation-proven-clean`: approved local source and candidate migration are complete; all required local executable/structural proof passes; external/provider/remote proof remains explicitly deferred; no external mutation or commit occurs.
- `local-implementation-baseline-blocked-clean`: exact clean 023D baseline, architecture hash, ancestry, ledger or isolation cannot be established; no implementation begins.
- `approved-architecture-conflict-blocked-clean`: executable constraints reveal a material conflict with approved 023D architecture that cannot be resolved within scope; no weakened substitute is implemented.
- `local-implementation-dependency-blocked-clean`: completion requires an unapproved provider, dependency, processor, secret, hosting component or governed CSV input; the default remains fail closed.
- `local-implementation-validation-blocked-clean`: candidate local implementation exists but required security, lifecycle, permission, accessibility, regression, build or scope validation does not pass.

No outcome implies that migration `0018` or Storage policies were applied, a bucket exists, scanning/sanitisation is operational, CSV is enabled, Australian region/recovery is proven, hosted roles passed, production is ready, Sprint 023 is complete, or Sprint 023F/024 has begun.
