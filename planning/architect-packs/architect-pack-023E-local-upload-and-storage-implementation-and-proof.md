Architect Pack 023E - Local Upload And Storage Implementation And Proof

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff to implement and prove the approved Sprint 023D upload/storage architecture locally from clean commit `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`, without applying schema or Storage changes remotely, selecting providers, adding dependencies, deploying, or claiming production readiness.

============================================================
FILE: planning/sprints/023E-local-upload-and-storage-implementation-and-proof/requirements.md
============================================================

# Sprint 023E - Local Upload And Storage Implementation And Proof Requirements

## Role And Method

Builder executes this follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023E files, and builds from those sprint files.

Sprint 023E translates the approved Sprint 023D architecture into narrowly scoped local source, additive migration `0018`, deterministic tests, synthetic fixtures, and evidence. It does not apply the migration, create/configure a remote bucket, contact or select a provider, add a dependency, introduce a secret value, deploy, or prove hosted/production operation.

## Mandatory Clean-Baseline Gate

Before Pack application or implementation, Builder must:

1. resolve full commit `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`;
2. verify it is the clean Sprint 023D commit on lineage preserving Sprint 023C commit `50ee7e133e03b82c5f4f14cc296f6d29cf3f74ca` and the accepted 029M/023B ancestry;
3. verify the committed architecture file is `docs/TEST_EVIDENCE_UPLOAD_ARCHITECTURE_023D.md` with SHA-256 `DDDC835E882626A5D3FEB1726830F30C2115C974EAFE8308C25FF3C4F035B565` and size 30,146 bytes;
4. verify Sprint 023D closeout is `upload-storage-architecture-approved-clean`;
5. verify migrations `0001` through `0017` exist exactly once, no `0018` exists, and bootstrap/ledger validation is ready for the additive next migration;
6. start a new clean isolated branch/worktree named `codex/023E-local-upload-and-storage-implementation-and-proof` from that exact commit; and
7. record branch, worktree, ancestry, paths, hashes, clean status, ledger, and original-worktree non-mutation in `planning/reviews/023E-baseline-and-ledger-verification.md`.

If any check fails, do not reconcile or commit another sprint inside 023E. Stop `local-implementation-baseline-blocked-clean` and use the Manual Intervention Rule.

## Governing Authority

Implementation must agree with, in order:

1. `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISIONS.md` and its stakeholder Word equivalent;
2. `docs/TEST_EVIDENCE_UPLOAD_ARCHITECTURE_023D.md` at the governed hash above;
3. `planning/reviews/023D-application-storage-permission-agreement.md`;
4. `planning/reviews/023D-file-safety-provider-and-operations-decisions.md`; and
5. current authenticated access, assignment, revocation, suspension, soft-delete, and server-client boundaries.

Do not reinterpret the twenty decisions or redesign the architecture. If executable PostgreSQL, TypeScript, Next.js, or Supabase constraints reveal a material contradiction, stop `approved-architecture-conflict-blocked-clean`; document the exact conflict and do not silently invent behaviour.

## Required Local Implementation

### 1. Additive Migration `0018`

Create only `supabase/migrations/0018_test_evidence_upload_and_storage.sql`. Never edit migrations `0001`–`0017`.

The migration must faithfully implement the approved pseudo-DDL and invariants, including:

- a mandatory read-only legacy inventory gate before constraint replacement or backfill;
- deterministic category mapping and fail-closed `legacy_unverified`/deleted legacy treatment without inventing object, hash, signature, acknowledgement, scanner, or sanitiser facts;
- exact replacement of the migration `0009` auto-named category and 2 MiB checks with JPEG/PNG/PDF/controlled-CSV and 1–5,242,880-byte checks;
- stable/test/horse composite authority and exact foreign keys;
- upload attempt, controlled CSV registry, hold, and audit tables/relationships;
- stable `version_group_id`, monotonic version number, bidirectional replacement links, and fork/self-link/cycle/cross-test/cross-lineage protections;
- state, object-pair, availability, lifecycle timestamp, content agreement, deletion, restoration, hold, and purge invariants;
- indexes and uniqueness for idempotency, opaque object identity/key, lineage/version, scope/state, and reconciliation;
- transaction-scoped test locking and quota routines using the exact approved counting states and temporary replacement exception;
- atomic replacement cutover, failed-replacement preservation, and safe restoration denial/retirement rules;
- scoped routines/RLS grants consistent with the 023D permission agreement and current helper semantics; and
- denial of unsafe direct writes and generic/non-enumerating failure behaviour.

The migration may define local database/storage-policy SQL required for structural proof, but must not execute against any local, linked, hosted, or production Supabase project during this sprint. It must not create a remote bucket or claim that a policy has been applied.

If existing committed SQL names/types make an exact additive implementation impossible, stop rather than weakening a constraint or modifying history.

### 2. Domain, Validation And Lifecycle Modules

Implement typed evidence contracts under `lib/evidence/`:

- categories, limits, state and safe reason constants;
- exhaustive transition rules and visibility/quota helpers;
- display-filename normalization separated from opaque object identity;
- extension/declared MIME/detected-signature/size validation for JPEG, PNG, and PDF;
- explicit controlled-CSV disabled handling unless an approved registry entry is supplied (none is supplied in this sprint);
- acknowledgement, idempotency, duplicate-confirmation and replacement input contracts;
- safe result/error types that do not expose object keys, hashes, scanner internals, secrets, or existence; and
- scanner and image/PDF sanitiser adapter interfaces.

No new package may be added. Production/default scanner and sanitiser adapters must fail closed and cannot transition evidence to `available`. Deterministic fakes may be used only by local tests through explicit dependency injection. They must not be selected by ordinary application/runtime environment inference.

Do not implement OCR, readings extraction, scoring, recommendations, automatic CSV ingestion, generic CSV parsing, or visible-pixel transformation.

### 3. Server Repository And Actions

Implement server-only repository/orchestration modules under `lib/evidence/server/` and narrowly scoped server actions in `app/(ops)/data-entry/biochemistry/evidence-actions.ts` for the approved contracts:

- initiate, finalise and cancel upload;
- list safe evidence metadata for one authorised test;
- request a fresh 60-second signed download;
- duplicate confirmation and replacement initiation;
- soft delete and restoration request;
- Administrator restoration execution;
- hold create/release and governed purge interfaces; and
- reconciliation item processing.

Every operation must re-establish authenticated application context and test/horse/stable authority server-side. Never trust client user, role, stable, horse, test ownership, object path, lifecycle state, quota, or uploader fields. Preserve current active/inactive/suspended/revoked/assignment semantics. Use generic denial/not-found results and safe audit payloads.

The client may receive only a narrowly scoped upload intent/tuple and safe status. Elevated Supabase credentials remain server-only. No signed URL, secret, raw object key, hash, private filename, or payload may be logged or placed in repository evidence.

Because no scanner/sanitiser is approved, ordinary local implementation must remain fail closed before availability. The application must not pretend that a successful byte transfer is an available upload.

### 4. Internal Reconciliation Route

Implement `app/api/internal/evidence/reconcile/route.ts` to the approved contract:

- production schedule compatibility with `Authorization: Bearer <CRON_SECRET>`;
- constant-time comparison without logging the header or secret;
- fail closed when the secret is absent or mismatched;
- database-backed advisory/lease lock, bounded batch/time budget, durable cursor/state, idempotent item processing, and safe opaque summary;
- no user bucket-wide listing and no object/path disclosure; and
- no automatic provider contact or hosted invocation in this sprint.

The environment variable name may be referenced, but no value, `.env*` file, Vercel configuration, or remote secret may be created or changed. Do not change `vercel.json` unless a local structural test proves an already-approved schedule declaration is indispensable; if so, stop for scope review rather than editing it.

### 5. Local UI Integration

Add a focused evidence component under `components/ops/` and integrate it only into `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`.

Implement the 023D UI/accessibility contract for guidance, the exact unchecked acknowledgement, permitted types/limits, file selection, cancel, reliable progress only, pending safety checks, safe success/failure/retry, duplicate confirmation, CSV disabled, count/aggregate/type/size errors, replacement, soft deletion, restoration request, empty state, slow/offline behaviour, and permission denial.

The exact acknowledgement is: “I confirm that I am authorised to upload this evidence and that it is relevant to this test.”

Use keyboard-operable controls, programmatic labels, associated errors, focus movement to an error summary, appropriate live regions, non-colour meaning, reduced-motion support, reflow at 200%, and existing design authority/components. Do not redesign the surrounding workflow, global design system, roles, navigation, scoring, or recommendations.

UI copy must distinguish transfer completion from safety approval. With fail-closed default adapters, it must show unavailable/pending/blocked truthfully and never claim production readiness.

### 6. Deterministic Local Proof

Add focused scripts/tests and generated synthetic fixtures that contain no personal, horse, client, credential, production, or downloaded material. Cover at minimum:

- migration structure, exact ledger, named old-constraint replacement, inventory-before-backfill order, legacy fail-closed treatment, FKs/checks/indexes/RLS/grants;
- all states and permitted/forbidden transitions;
- exact quota-counting states and boundary cases for 5 MiB, 10 files, 30 MiB;
- concurrent initiation/finalisation/replacement/restoration/purge accounting;
- stable lineage, fork/cycle/cross-test/self-link rejection and immutable identity;
- replacement success, failed replacement, restoration conflict, and predecessor preservation;
- extension/MIME/signature agreement for minimal generated JPEG/PNG/PDF inputs;
- malformed, polyglot where deterministically detectable, encrypted/active/embedded PDF indicators, misleading extension/MIME, zero/oversize, unknown and disabled CSV;
- fail-closed production/default safety adapters and explicit test-only deterministic fakes;
- idempotent replay, duplicate confirmation, opaque no-overwrite keying, compensation, object-only/metadata-only, expiry and Cron overlap;
- all accepted positive roles and anonymous, wrong-horse, cross-stable, inactive, suspended, revoked, deleted, unassigned, insufficient-role, forged-authority and stale-link denials;
- 60-second download signing request boundary and fresh access recheck;
- audit/log/error redaction and non-enumerating responses;
- UI state/reducer contracts, exact acknowledgement, keyboard/focus/live-region semantics and responsive class/markup contracts; and
- no regression to the Sprint 022 workflow and authenticated access helpers.

Tests must not require network, protected environment files, real credentials, an installed Supabase service, browser login, provider SDK, malware samples, or remote state. If executable local PostgreSQL proof is unavailable, distinguish SQL structural/self-test evidence from executed database semantics and flag the remaining proof for 023F; do not mislabel text inspection as runtime proof.

## Required Evidence

Builder must create:

- `planning/reviews/023E-baseline-and-ledger-verification.md`;
- `planning/reviews/023E-implementation-manifest.md` mapping every changed file to architecture/acceptance authority;
- `planning/reviews/023E-migration-and-permission-proof.md`;
- `planning/reviews/023E-local-test-and-accessibility-proof.md`;
- `planning/reviews/023E-privacy-secret-and-non-mutation-proof.md`; and
- `planning/reviews/023E-closeout.md`.

Evidence must state exactly what was executed, structurally inspected, simulated, or not run. Never include secrets, raw object keys, signed URLs, private filenames, upload contents, real personal/horse data, or protected environment values.

## Required Reading

Builder must read the project method/rules and, at minimum:

1. committed Sprint 023C contract and Sprint 023D architecture/reviews;
2. migrations `0009`–`0017` and `supabase/bootstrap/remote-init.sql`;
3. `docs/BIOCHEMISTRY_DATA_MODEL_013.md`, `docs/BIOCHEMISTRY_WORKFLOW_022.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/API.md`, and `docs/ARCHITECTURE.md`;
4. current biochemistry page/actions/components/domain modules;
5. current auth context, access/role helpers, Supabase server/client/admin conventions, and audit/error patterns;
6. package scripts, validators, TypeScript/ESLint/build configuration, and existing deterministic script-test conventions; and
7. current official platform documentation only if a platform capability is revalidated. Record access date and use primary sources.

## Approved File Set

Builder may edit/create only these paths in the isolated 023E worktree:

- `supabase/migrations/0018_test_evidence_upload_and_storage.sql`;
- `lib/evidence/**`;
- `app/(ops)/data-entry/biochemistry/evidence-actions.ts`;
- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`, only for evidence integration;
- `app/api/internal/evidence/reconcile/route.ts`;
- `components/ops/test-evidence-upload.tsx`;
- `components/ops/test-evidence-state.ts`;
- `app/globals.css`, only for narrowly scoped evidence UI/accessibility styles if existing utilities are insufficient;
- `scripts/test-test-evidence-023E.mjs`;
- `scripts/test-test-evidence-migration-023E.mjs`;
- `scripts/fixtures/023E-test-evidence/**`;
- `package.json`, only to add local validation script aliases using existing dependencies;
- `docs/API.md` and `docs/ARCHITECTURE.md`, only to change 023D proposed contracts into accurate local-implementation status;
- `docs/TEST_EVIDENCE_UPLOAD_IMPLEMENTATION_023E.md`;
- `planning/architect-packs/architect-pack-023E-local-upload-and-storage-implementation-and-proof.md`;
- `planning/sprints/023E-local-upload-and-storage-implementation-and-proof/**`;
- the six required `planning/reviews/023E-*.md` files;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for implementation facts without changing approved product decisions;
- `planning/RISKS.md`, only for changed implementation risks; and
- `planning/QUESTIONS.md`, only for exact 023E resolutions/blockers.

Reading other repository files is permitted. Any necessary edit outside this set is a scope stop. Do not broaden the approved file set informally.

## Git, External And Remote Boundaries

Local source changes and local commands are permitted. A commit is not permitted unless separately requested after closeout review.

Do not push, create a PR, merge, rebase another line, deploy, contact a provider, install/add/update a dependency, expose a protected environment, run remote Supabase/Vercel operations, link a project, apply/reset/repair migrations, create/configure a bucket, apply Storage policies, create secrets, upload evidence, use real data, or mutate any external state.

## Manual Intervention Rule

For every blocker or manual requirement record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- numbered steps for that action; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- remote/local Supabase migration application or bucket/policy creation;
- production/hosted role, Storage, scanner, sanitiser, Cron, backup or region proof;
- selecting/adding a scanner, sanitiser, PDF/image library, queue, processor, paid service, or provider;
- enabling CSV without governed source/template/schema inputs;
- creating secret values or configuration in Vercel/Supabase;
- notification/email implementation;
- OCR, reading extraction, score/recommendation changes, voice, commerce, public evidence, deployment, Sprint 023F/024;
- legal certification or claims of Australian storage, recovery readiness, production readiness, or complete Sprint 023 delivery.

============================================================
FILE: planning/sprints/023E-local-upload-and-storage-implementation-and-proof/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/023E-local-upload-and-storage-implementation-and-proof/acceptance.md
============================================================

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

============================================================
FILE: planning/sprints/023E-local-upload-and-storage-implementation-and-proof/handoff-prompt.md
============================================================

# Sprint 023E - Builder Handoff Prompt

You are Builder for Sprint 023E - Local Upload And Storage Implementation And Proof.

Apply and verify all four Sprint 023E files, then execute strictly from them.

Begin only from clean commit `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`. Verify its ancestry, Sprint 023D closeout and architecture SHA-256 `DDDC835E882626A5D3FEB1726830F30C2115C974EAFE8308C25FF3C4F035B565` at 30,146 bytes. Verify the migration ledger is exactly `0001`–`0017` and no `0018` exists. Create a new isolated `codex/023E-local-upload-and-storage-implementation-and-proof` branch/worktree. If the gate fails, stop cleanly; do not reconcile or commit another sprint inside 023E.

Translate the approved 023D design faithfully into one additive candidate migration `0018`, typed domain/lifecycle/validation modules, fail-closed safety adapters, server-only repository/actions, the bounded authenticated reconciliation route, focused evidence UI integration, deterministic tests, synthetic fixtures and exact evidence.

Preserve the mandatory legacy inventory and fail-closed `legacy_unverified` transition, exact replacement of migration `0009` category/2 MiB checks, composite test/horse/stable authority, stable lineage protections, exact quota states, and atomic replacement/restoration behaviour. Never weaken an invariant to make validation pass.

No scanner, sanitiser, controlled CSV format or provider has been approved for implementation. Add no dependency. Default runtime adapters must fail closed and must not make evidence available. Deterministic fakes are test-only through explicit injection. CSV stays disabled. Do not implement OCR, reading extraction, scoring or recommendations.

Every action must freshly verify server-authoritative identity, role, assignment, test, horse and stable scope. Keep elevated credentials server-only. Use non-enumerating errors and safe audit/log fields. Do not expose or record secrets, raw object keys, signed URLs, content hashes, private payloads or real filenames unnecessarily.

Run all required focused and regression validation. Clearly distinguish structural SQL proof from executed database proof; do not apply migration `0018` to any database. Do not create/configure a bucket or policy remotely, inspect protected environment values, create secrets, contact providers, deploy, push, merge, or begin Sprint 023F.

If a required edit falls outside the approved file set, a dependency/provider/secret is required, or executable implementation conflicts materially with the approved design, stop and use the five-part Manual Intervention Rule.

Finish with one allowed outcome and leave the branch uncommitted unless the user separately instructs a local commit.
