# Sprint 023D - Upload And Storage Architecture Design Requirements

## Role And Method

Builder executes this follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023D files, and executes from those sprint files.

Sprint 023D is design-only. It converts the approved Sprint 023C governing contract into exact schema, private Storage, authorisation, lifecycle, failure-recovery, sanitisation, scanning, audit, retention, deletion, and operational designs for later Sprint 023E implementation.

Builder must not edit production source, create a migration, create or configure a bucket, add a dependency, select or contact a provider without authority, mutate an environment, run remote Supabase operations, deploy, or begin implementation.

## Hard Clean-Baseline Gate

Before Pack application or design work, Builder must establish one clean isolated commit containing:

1. the committed Sprint 023B product baseline;
2. the applied Sprint 023 and Sprint 023C sprint artifacts and evidence;
3. the final canonical Markdown contract with SHA-256 `71AABA13153606AA98F511FCE0D5182DDDA48F5A33F338978FC7954C96E4EE39` and size 17,164 bytes;
4. the final stakeholder Word record with SHA-256 `3E603BDD08A857370C8C079960987B32A5C91F59CED78F8A750B0EA05E064F60` and size 46,115 bytes;
5. Sprint 023C closeout `decision-contract-approved-clean`; and
6. no unrelated or uncommitted work.

The user had not yet authorised or supplied a Sprint 023C clean commit when this Pack was created. Builder must not use the uncommitted Sprint 023C worktree as the 023D implementation/design baseline, commit it inside Sprint 023D, or infer a SHA. If no clean Sprint 023C decision-contract commit exists, stop `architecture-baseline-blocked-clean` and request the separate Sprint 023C commit instruction.

After the commit exists, create a new isolated `codex/023D-upload-and-storage-architecture-design` branch/worktree from that exact SHA. Record ancestry, required paths, contract hashes, status, and source-worktree non-mutation proof in `planning/reviews/023D-baseline-and-contract-verification.md`.

## Governing Contract

The authority is `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISIONS.md`, approved by Phillip Norman Rankin, Director of Aprec8 Pty Ltd, effective 28 July 2026. The Word record is the stakeholder-readable equivalent. If they disagree, stop; do not choose one silently.

Design must preserve all twenty decisions, including:

- JPEG, PNG, PDF, and controlled approved-source CSV only;
- 5 MiB per file, 10 files per test, and 30 MiB aggregate per test;
- private test/horse/stable evidence only;
- server-authoritative user, role, test, horse, stable, object path, ownership, and uploader identity;
- accepted role-operation matrix and fresh access checks;
- operational retention with periodic review, immediate soft deletion, 30-day restoration, governed purge, and holds;
- complete safe audit without contents, secrets, signed URLs, or raw paths;
- Australian primary storage and explicit future international review;
- private download through 60-second signed URLs after fresh authorisation;
- unavailable-until-safe scanning, sanitisation, blocking/quarantine, and 24-hour rejected-temporary cleanup;
- EXIF/non-essential metadata stripping without changing visible pixels;
- 24-hour idempotency key, content hash, duplicate warning, versioned replacement, and no object overwrite;
- pending states, bounded compensation, daily orphan reconciliation, 24-hour temporary-orphan purge, and alerting;
- encrypted recovery backups with no silent reactivation;
- required uploader acknowledgement; and
- incident response through `equineprecisionperformance@hotmail.com`.

## Required Design Outputs

Builder must produce one coherent architecture in `docs/TEST_EVIDENCE_UPLOAD_ARCHITECTURE_023D.md` and supporting evidence that resolves the following.

### 1. Existing-State Gap Analysis

Compare the accepted contract with the committed source, including:

- `public.biochemistry_test_uploads` from immutable migration `0009`;
- categories and 2 MiB limit in migration `0009` and `lib/domain/biochemistry.ts`;
- current `can_read_biochemistry_horse`, `can_write_biochemistry_horse`, and `can_soft_delete_biochemistry_horse` helpers;
- current membership, assignment, suspension, revocation, and initial-administrator contracts;
- migration ledger through `0017` and bootstrap alignment;
- current Next.js action/server/client boundaries;
- current Supabase client/server conventions;
- current audit/event conventions; and
- existing hosting/runtime/request-size limits relevant to a 5 MiB file.

Do not modify immutable migration `0009`. Any future schema correction must be additive and use the exact next validated ledger number.

Deliver `planning/reviews/023D-existing-schema-and-runtime-gap-analysis.md`.

### 2. Logical Data Model

Design the additive metadata model, including exact proposed columns, types, nullability, defaults, checks, uniqueness, foreign keys, indexes, timestamps, actor references, and state invariants for:

- test/horse/stable authority;
- opaque object identity and non-public bucket reference;
- original safe display filename separated from object path;
- category, detected MIME, declared MIME, extension, bytes, and content hash;
- approved CSV source/template/version where applicable;
- upload-attempt/idempotency identity and expiry;
- lifecycle/status and safe reason codes;
- scanner/sanitiser version and outcome without private payloads;
- uploader and replacement/version lineage;
- soft deletion, restoration window, purge eligibility, hold state, and hold audit;
- object/metadata reconciliation state and attempt accounting; and
- immutable/minimal audit event relationship.

Design must state whether existing `biochemistry_test_uploads` is evolved additively or supplemented by narrowly related tables. No destructive rename/drop or applied-migration edit is allowed.

Provide pseudo-DDL in documentation only. Do not create a migration file.

### 3. Storage Model

Design:

- one private bucket or justified alternative;
- bucket configuration constraints;
- server-generated opaque object keys;
- path format that avoids client filenames and unnecessary horse/stable identifiers;
- pending/quarantine/available/deleted/purge handling without public prefixes becoming authority;
- collision prevention and no-overwrite behaviour;
- object/metadata agreement rules;
- signed-download issuance and 60-second expiry;
- revocation boundary for already issued URLs;
- list prevention and existence-oracle resistance; and
- Australian-region/provider assumptions and verification steps.

Bucket names and object paths are design proposals until Sprint 023E/023F authority. Never expose a service-role key to client code.

### 4. Upload And Processing Protocol

Compare at least:

- fully server-mediated upload;
- narrowly signed direct upload followed by server finalisation; and
- any existing-project pattern proven relevant.

The selected protocol must account for 5 MiB files, current hosting/request limits, progress/cancellation needs, authentication freshness, client tampering, idempotency, object/metadata compensation, scanning/sanitisation, and retry behaviour.

Document an exact state machine from request through terminal state. At minimum consider:

- `initiated`;
- `upload_pending`;
- `uploaded_unverified`;
- `validation_failed`;
- `scan_pending`;
- `sanitisation_pending`;
- `available`;
- `blocked` or `quarantined`;
- `failed`;
- `soft_deleted`;
- `restore_pending` if needed;
- `purge_pending`;
- `purged`; and
- `object_missing` or reconciliation-required state.

Use only the smallest necessary state set; every state must define permitted transitions, actor, retry, visibility, audit event, object expectation, metadata expectation, timeout, and recovery.

### 5. Application And Storage Permission Agreement

Produce an operation-by-role matrix for:

- initiate upload;
- upload/finalise;
- list metadata;
- view/preview;
- download;
- replace;
- soft-delete;
- request restoration;
- execute restoration;
- create/release hold;
- mark/clear quarantine where authorised;
- purge; and
- view audit.

For every operation, specify application check, database RLS/helper, Storage RLS/policy, object condition, positive roles, and negative cases. Explicitly include anonymous, wrong-horse, cross-stable, inactive, suspended, revoked, deleted-test, deleted-evidence, no membership, insufficient access level, stale signed URL, and client-forged authority cases.

Do not broaden current roles or redesign auth. If the accepted role matrix cannot be represented with current role/access facts, stop and identify the exact narrow helper/schema need.

Deliver `planning/reviews/023D-application-storage-permission-agreement.md`.

### 6. File Validation, Controlled CSV, Sanitisation And Scanning

Design layered validation for filename/display name, extension, declared MIME, detected signature/content, byte limits, count/aggregate limits, malformed content, active content, encrypted/password-protected files, and safe failure messages.

For controlled CSV, design the register structure and versioning mechanism but do not invent source names, templates, columns, or values. Record those as required Aprec8 inputs before CSV implementation.

For images, design EXIF/non-essential metadata removal while preserving visible pixels and correct orientation. For PDF, define safe validation and active/embedded-content handling without promising unsupported sanitisation.

For malware scanning, compare feasible patterns for the actual deployment architecture. Do not select an external processor, paid service, dependency, secret, or new hosting component without explicit authority. The design must keep evidence unavailable until a successful scan and describe safe timeout/failure/quarantine behaviour.

Deliver `planning/reviews/023D-file-safety-provider-and-operations-decisions.md`.

### 7. Idempotency, Compensation And Reconciliation

Design:

- 24-hour idempotency-key uniqueness and replay response;
- content-hash duplicate detection and intentional-duplicate confirmation;
- replacement/version lineage;
- metadata-first versus object-first failure modes;
- deterministic compensation after each partial failure;
- bounded retry counts/backoff as a design proposal;
- daily reconciliation trigger/interface;
- object-only and metadata-only handling;
- 24-hour temporary cleanup;
- alert threshold and recipient role;
- concurrency and count/aggregate race protection; and
- safe operator recovery without direct bucket-wide user listing.

### 8. Retention, Deletion, Restore, Holds And Backup

Design immediate soft-delete concealment, 30-day restoration eligibility, purge eligibility, hold precedence, minimal post-purge audit, backup expiry/non-reactivation, periodic retention review interface, export/access/correction workflow boundaries, and safe operational reporting.

The approved contract does not set a periodic review cadence. Builder must recommend options and request Aprec8 selection if cadence affects schema, scheduled operations, evidence, or acceptance. Do not invent a binding cadence.

### 9. Audit, Privacy, Logging And Incident Boundaries

Define the exact audit taxonomy, safe fields, actor/role snapshot, reason codes, retention relationship, visibility, and prohibited data. Define safe application logs and metrics that exclude contents, filenames where unnecessary, raw paths, hashes where identifying, signed URLs, secrets, and private payloads.

Map incident detection/escalation to the approved monitored email without implementing notification or exposing it unnecessarily in client bundles.

### 10. UI And Accessibility Contract

Design UI states and copy requirements for file guidance, acknowledgement, selection, progress, cancel, pending safety checks, success, retry, duplicate warning/confirmation, wrong type/size/count, scan/sanitisation failure, quarantine-safe wording, unavailable/missing object, soft delete, restoration request, empty list, slow/offline behaviour, and permission denial.

Include mobile, desktop, keyboard, focus, screen-reader status, error association, reduced-motion, zoom/reflow, and non-colour meaning requirements. Do not create UI source or mockups unless separately scoped.

### 11. Implementation And Proof Handoff

Produce an exact proposed Sprint 023E file set, additive migration scope, local test matrix, synthetic fixture plan, canonical validation commands, route-safety checks, secret/privacy scans, build proof, and stop points.

Separate local implementation/proof from later Sprint 023F remote apply and hosted role/storage proof. Remote bucket creation, migration, policies, provider configuration, fixtures, and secrets require later exact authority.

## Mandatory Pre-Implementation Decisions

Sprint 023D must not claim implementation-ready architecture while any design-critical item remains unresolved. At minimum classify:

1. exact approved CSV source/template registry inputs;
2. selected malware-scanning pattern/provider or an expressly accepted implementation deferral that still preserves unavailable-until-safe behaviour;
3. image/PDF sanitisation libraries or service boundary where implementation requires a dependency/provider;
4. retention-review cadence and operator;
5. governed purge-operator designation mechanism;
6. daily reconciliation scheduler/runtime;
7. provider backup and Australian-region contractual suitability; and
8. any required secret/configuration names, recording presence requirements only, never values.

Builder may recommend options with trade-offs. The user/business owner must choose when the decision would add a provider, processor, paid service, dependency, secret, hosting component, scheduled runtime, or binding business cadence.

## Required Reading

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. committed Sprint 023B, 023, and 023C artifacts/evidence
5. `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISIONS.md`
6. `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISION_RECORD.docx`
7. `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
8. `docs/BIOCHEMISTRY_WORKFLOW_022.md`
9. `docs/AUTH_RLS_PORTAL_ACCESS.md`
10. `docs/ARCHITECTURE.md` and `docs/API.md`
11. migrations `0009` through `0017` and `supabase/bootstrap/remote-init.sql`
12. current biochemistry domain, actions, workflow, auth context, Supabase client/server, audit, and validation source
13. current hosting/runtime configuration relevant to request size, timeouts, background work, and deployment
14. current official Supabase Storage, RLS, signed URL, upload-limit, and region documentation
15. current official hosting documentation for request/body/time/background limits
16. current OAIC guidance relied upon by the approved contract

Technical claims about current provider/platform capabilities must be supported by primary official documentation and access date. Do not use marketing summaries or stale remembered limits.

## Approved File Set

Builder may edit or create only in the isolated Sprint 023D worktree:

- `docs/TEST_EVIDENCE_UPLOAD_ARCHITECTURE_023D.md`;
- `docs/ARCHITECTURE.md`, only to link/summarise the approved 023D design;
- `docs/API.md`, only to document proposed future action contracts clearly marked unimplemented;
- `planning/architect-packs/architect-pack-023D-upload-and-storage-architecture-design.md`;
- `planning/sprints/023D-upload-and-storage-architecture-design/**`;
- `planning/reviews/023D-baseline-and-contract-verification.md`;
- `planning/reviews/023D-existing-schema-and-runtime-gap-analysis.md`;
- `planning/reviews/023D-application-storage-permission-agreement.md`;
- `planning/reviews/023D-file-safety-provider-and-operations-decisions.md`;
- `planning/reviews/023D-design-validation.md`;
- `planning/reviews/023D-closeout.md`;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/ARCHITECT_BRIEFING.md`;
- `planning/EVIDENCE_INDEX.md`;
- `planning/SPRINT_SCHEDULE.md`;
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for design decisions actually approved;
- `planning/RISKS.md`, only for changed design/implementation risks; and
- `planning/QUESTIONS.md`, only for resolved or exact outstanding 023D decisions.

Reading production and configuration source is allowed for design evidence. Editing any application, component, library, script, package, migration, bootstrap, Supabase, public, environment, test, fixture, or configuration file is prohibited.

## Git, External And Remote Boundaries

This Pack permits only local isolated worktree/branch creation and documentation/planning changes. It does not permit a commit unless separately asked after validation. It does not permit push, PR, merge, rebase, deployment, provider contact, dependency installation, environment mutation, bucket creation, migration, policy application, secret creation, production access, or remote proof.

## Manual Intervention Rule

For every blocker or required choice, record:

- what is blocked or unresolved;
- evidence and options checked;
- exact user/manual decision or action required;
- numbered steps; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- production source or schema changes;
- creating migration `0018` or any migration file;
- bucket creation/configuration or Storage policies;
- implementing upload/list/download/replace/delete/restore/purge actions;
- adding sanitisation/scanning libraries or services;
- implementing schedulers, webhooks, jobs, queues, UI, tests, or fixtures;
- remote Supabase/provider operations, deployment, push, PR, or merge;
- OCR, automated reading extraction, scoring, recommendations, voice, public evidence, commerce, or Sprint 024; and
- claiming legal compliance certification, production readiness, or implementation completion.
