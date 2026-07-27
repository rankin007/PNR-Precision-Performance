Architect Pack 023 - Test Evidence Uploads And Storage

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff for a privacy- and access-controlled test-evidence upload foundation, with hard stops for unreconciled product lineage, unapproved data-handling decisions, secrets, remote mutation, and cross-stable exposure.

============================================================
FILE: planning/sprints/023-test-evidence-uploads-and-storage/requirements.md
============================================================

# Sprint 023 - Test Evidence Uploads And Storage Requirements

## Role And Method

Builder executes this sprint under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023 files, and executes from those sprint files.

Sprint 023 implements the accepted forward-roadmap outcome `Test Evidence Uploads And Storage`. The newer schedule entry that labels Sprint 023 as `Stable/Horse Operational Dashboard` conflicts with the accepted roadmap and must not govern implementation. Stable/Horse Operational Dashboard remains Sprint 028. Builder may correct that planning inconsistency during closeout but must not redefine either product outcome.

## Starting Point

- Sprint 029M is closed `public-website-follow-up-partial-safe` on scoped branch commit `ad9d419bc40f0be2e13aa297535d3d8e5e151625`.
- Sprint 029M is a public-release lineage and did not include or reconcile Sprint 021/022 product source.
- The original `develop` worktree remains materially dirty with accepted but unreconciled Sprint 021AH and Sprint 022 work plus other files.
- Sprint 021AH records authenticated application proof complete, but its product/migration lineage must be proven in the selected Sprint 023 baseline rather than inferred from planning prose.
- Sprint 022/022B records the typed mobile workflow complete locally, but the selected Sprint 023 baseline must contain its exact accepted source and tests.
- Sprint 013 created source-controlled `biochemistry_test_uploads` metadata scaffolding, file-category constants, a 2 MB constraint, soft-delete fields, and access helpers. Those values are existing evidence, not automatic approval for Sprint 023 production behaviour.
- No Supabase Storage bucket, Storage RLS, signed/server upload flow, upload UI, retention process, malware/abuse position, or remote Storage proof has been approved or implemented.
- Current planning questions still require the privacy owner to decide upload types, limits, retention, access policy, deletion, ownership, and audit treatment.

## Goal

Create a private, test-scoped evidence workflow that can attach approved photos or documents to an existing biochemistry test without weakening horse, stable, role, audit, or deletion boundaries.

The intended complete capability is:

- an authorised trainer, permitted stable staff member, or administrator can attach approved evidence to a biochemistry test they may write;
- an authorised reader can list and securely view/download evidence only for a horse/test they may read;
- unauthorised, anonymous, wrong-horse, cross-stable, inactive, suspended, deleted, or insufficient-role access is denied at application and storage layers;
- metadata and object lifecycle remain consistent across success, retry, failure, soft deletion, and cleanup;
- privacy, retention, ownership, consent, audit, and deletion behaviour is explicit and testable; and
- no OCR, automatic reading extraction, voice processing, public sharing, or clinical interpretation is added.

## Hard Baseline Gate

Before Pack application or production-source editing, Builder must establish an isolated, clean worktree from a verified commit that contains all accepted product source required by Sprint 023, including:

1. migrations through the accepted Sprint 021AH ledger state;
2. the accepted Sprint 022 mobile biochemistry workflow and focused tests;
3. the current authenticated application/access helpers required by that workflow;
4. no uncommitted or unrelated dirty-worktree material; and
5. no loss of the deployed 029M public release or its rollback provenance.

Builder must record candidate commits, ancestry, file presence, relevant hashes, and a source comparison. Builder must not merge, cherry-pick, rebase, reset, stash, clean, or commit the original dirty `develop` worktree within Sprint 023.

If no clean commit satisfies this gate, stop as `evidence-upload-baseline-blocked-clean`. Exact source reconciliation requires separate Architect scope and must not be hidden inside Sprint 023.

## Required Privacy And Data Decisions

Before schema, Storage, server upload, or remote work, the user/privacy owner must provide and Builder must record:

1. permitted file categories and MIME types;
2. maximum file size and maximum files per test;
3. whether CSV remains permitted;
4. whether images may contain identifiable horses, people, locations, documents, labels, or stable details;
5. business purpose and lawful/authorised collection basis;
6. who owns uploaded evidence and what licence/permission the service receives;
7. who may upload, read, download, replace, and delete by role/access level;
8. whether stable staff may upload and whether veterinarians/owners may only read;
9. retention duration and retention start event;
10. deletion model, recovery window, object purge timing, and legal/operational hold behaviour;
11. audit fields/events and who may review them;
12. storage region/data-location requirements;
13. download method and signed-URL lifetime;
14. malware, unsafe-content, password-protected-file, and abuse handling;
15. EXIF/metadata stripping or preservation rules;
16. duplicate file and retry/idempotency behaviour;
17. orphan metadata/object reconciliation behaviour;
18. backup/export/data-access and correction request treatment;
19. privacy notice and user-facing consent/acknowledgement wording; and
20. incident/reporting contact and operator response process.

Existing Sprint 013 categories and the 2 MB limit are proposals to reconcile, not defaults to assume.

If any decision that changes schema, access, object lifecycle, or privacy meaning remains unanswered, Builder may complete read-only discovery and decision documentation only, then stop as `evidence-upload-decisions-blocked-clean` before implementation.

## Required Reading

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `planning/STATE.md`
6. `planning/STATUS.json`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DECISIONS.md`
9. `planning/DOMAIN.md`
10. `planning/RISKS.md`
11. `planning/QUESTIONS.md`
12. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
13. `planning/SPRINT_SCHEDULE.md`
14. `planning/reviews/PROJECT_REVIEW_AND_FORWARD_ROADMAP_2026-07-19.md`
15. `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
16. `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`
17. `docs/BIOCHEMISTRY_WORKFLOW_022.md`
18. `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`
19. `docs/AUTH_RLS_PORTAL_ACCESS.md`
20. `docs/ARCHITECTURE.md`
21. `docs/API.md`
22. relevant 021AH direct/rendered proof and cleanup evidence
23. migration ledger and current `biochemistry_test_uploads` schema/policies/helpers
24. current capture, result, horse, test, route, action, auth-context, and Supabase client/server source selected by the baseline gate

## Functional Requirements

Subject to completed decisions and the approved blueprint:

- Uploads attach to an existing active `biochemistry_tests` row and cannot exist as loose public files.
- The server resolves the acting user and test/horse access; client-supplied horse, stable, user, role, path, owner, or bucket authority is never trusted.
- Object paths are opaque, collision-resistant, non-public, and derived server-side from authoritative identifiers.
- File extension, declared MIME, detected/validated content type, byte size, and category must agree under the approved policy.
- Metadata is created only with an auditable relationship to the stored object; partial failures have deterministic cleanup/recovery.
- Upload status distinguishes pending, available, failed, quarantined/blocked if approved, soft-deleted, and purge-pending states without falsely showing success.
- Listing and preview/download exclude deleted or unavailable evidence by default.
- Signed URLs are short-lived and generated only after a fresh authorised read check.
- Delete is soft-delete/audit first unless the approved decisions require a different governed lifecycle; object purge follows the approved delay and operator path.
- Retry does not silently create duplicate metadata or orphan objects.
- The UI provides progress, size/type guidance, cancellation where feasible, safe errors, retry, empty states, and accessible keyboard/mobile behaviour.
- Images and PDFs receive accessible filenames/labels; the UI does not expose raw storage paths or internal identifiers.
- Evidence does not affect readings, scores, thresholds, recommendations, or clinical meaning automatically.

## Security And Access Requirements

- Storage bucket must be private.
- Application checks and Storage RLS must agree.
- Anonymous/public read, list, insert, update, and delete are denied.
- Wrong-horse and cross-stable cases are explicitly denied.
- Read-only roles cannot upload, replace, or delete.
- Suspended, inactive, revoked, or no-longer-assigned actors lose access according to current authoritative role/session behaviour.
- Object ownership/path claims cannot bypass test-level RLS.
- Signed URL issuance cannot be used as an oracle for object existence.
- No service-role or server secret enters client bundles, logs, evidence, tests, screenshots, or repository files.
- No bucket-wide listing is exposed to application users.
- Rate, file-count, and concurrency safeguards follow approved decisions.

## Privacy And Content Boundaries

- Treat all evidence as private operational data, potentially identifiable and sensitive.
- Do not publish evidence on the marketing site.
- Do not upload real user/client files during local tests.
- Remote tests require controlled synthetic fixtures and exact cleanup.
- Do not add OCR, EXIF-derived readings, automated classification, image recognition, transcription, public share links, email attachments, or third-party processing.
- Do not infer veterinary consent, client consent, ownership, retention, or jurisdiction.

## External And Remote Boundaries

This Pack does not by itself permit remote bucket creation, remote policy application, remote migration, production data access, deployment, push, PR, environment mutation, or secret creation.

After local implementation and validation, Builder must stop and record a five-part manual intervention for any required remote/provider operation. A later user instruction may permit the exact bounded operation, but Builder must not generalise that instruction to production deployment or unrelated remote state.

## Approved File Set

After the baseline and decision gates pass, Builder may edit or create only relevant paths within:

- `app/(ops)/data-entry/biochemistry/**`
- `app/(ops)/data-entry/submissions/**`, only for test-evidence review links or panels
- `app/(portal)/portal/horses/**`, only for authorised test-evidence viewing
- `components/ops/**`, only evidence-upload/list/preview UI integrated with biochemistry workflow
- `components/portal/**`, only authorised evidence viewing
- `components/forms/**`, only biochemistry evidence controls
- `lib/auth/**`, only if an existing helper must be reused or narrowly corrected for the accepted upload permission contract
- `lib/domain/biochemistry.ts`
- `lib/supabase/**`, only server-side storage/action helpers required by the accepted design
- `supabase/migrations/**`, only one additive next-ledger migration after exact ledger validation
- `supabase/bootstrap/remote-init.sql`, only deterministic alignment with that additive migration
- `scripts/**`, only focused Sprint 023 validators/tests/harnesses
- `docs/TEST_EVIDENCE_UPLOADS_023.md`
- `docs/API.md`
- `docs/ARCHITECTURE.md`
- focused fixture/test files under existing conventions
- `package.json` and `package-lock.json`, only to register dependency-free scripts; no dependency additions without a stop
- `planning/reviews/023-*.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/SPRINT_SCHEDULE.md`, only to correct the 023/028 label conflict and current status
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, only for accurate 023 closeout status
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only where evidence changes them

Any file outside this set requires a stop. Existing 021/022 dirty-worktree reconciliation, public 029M source, commerce, scoring, recommendation, voice, and dashboard work remain outside scope.

## Explicitly Out Of Scope

- Sprint 028 dashboard/horse-workspace implementation
- OCR, photo recognition, automated extraction, or automatic reading changes
- voice recording or transcription
- public evidence, testimonials, marketing assets, or enquiry-form storage
- new scoring, thresholds, recommendations, trends, saved views, or clinical priority
- public reopening, SEO change, deployment, commerce, Stripe, checkout, billing, or catalogue changes
- broad auth/role redesign
- hard deletion without an approved lifecycle
- repository reconciliation of dirty Sprint 021/022 source
- commit, push, PR, merge, rebase, reset, stash, clean, or destructive filesystem operations

## Manual Intervention Rule

For every blocker or required user/operator action, Builder must record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- numbered steps for the action; and
- what Builder will verify afterward.

Known interventions include clean product-baseline reconciliation, the twenty privacy/data decisions, remote Storage/migration operations, controlled authenticated fixtures, provider access, and any secret/environment setup.

============================================================
FILE: planning/sprints/023-test-evidence-uploads-and-storage/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/023-test-evidence-uploads-and-storage/acceptance.md
============================================================

# Sprint 023 - Test Evidence Uploads And Storage Acceptance

## Baseline And Decision Acceptance

- [ ] A clean isolated baseline contains accepted 021AH and 022/022B product source without modifying the original dirty worktree.
- [ ] Candidate baseline ancestry, required files, migrations, tests, and relevant hashes are recorded.
- [ ] The 023/028 schedule conflict is recorded and Sprint 023 follows the accepted uploads/storage roadmap.
- [ ] All twenty privacy/storage/lifecycle decisions have explicit source-backed answers.
- [ ] Existing Sprint 013 categories and 2 MB limit are either expressly accepted or replaced; they are not assumed.
- [ ] The final upload/storage design is documented before implementation.

## Schema And Storage Acceptance

- [ ] Upload metadata remains test-scoped and horse/stable access is authoritative.
- [ ] Any schema change is additive, next-ledger, immutable after application, and bootstrap-aligned.
- [ ] Bucket configuration is private and contains no public read/list path.
- [ ] Object paths are opaque, collision-resistant, server-authoritative, and do not reveal client filenames or private identifiers unnecessarily.
- [ ] File type, MIME, content validation, size, count, and category follow approved decisions.
- [ ] Metadata/object success, failure, retry, duplicate, and orphan states are deterministic.
- [ ] Signed downloads are short-lived and require a fresh authorised read check.
- [ ] Retention, soft deletion, optional restoration, purge timing, hold behaviour, and audit follow approved decisions.

## Permission Acceptance

- [ ] Anonymous access is denied for every Storage and application operation.
- [ ] Correct authorised trainer/staff/admin positive cases pass according to the accepted matrix.
- [ ] Vet/owner/read-only behaviour matches explicit decisions.
- [ ] Wrong-horse, cross-stable, inactive, suspended, revoked, deleted-test, no-membership, and insufficient-level cases are denied.
- [ ] Client-supplied role, horse, stable, uploader, owner, bucket, and path claims cannot elevate access.
- [ ] Application actions and Storage RLS agree for read, upload, list, download, replace if approved, soft-delete, restore if approved, and purge/operator behaviour.
- [ ] Revocation prevents new signed URL issuance and later access according to the approved URL lifetime.

## Product And Accessibility Acceptance

- [ ] Evidence can be attached only to an existing authorised active test.
- [ ] Capture/review workflow clearly shows guidance, progress, success, failure, retry, and unavailable states.
- [ ] Evidence list/preview/download/delete controls are permission-aware and do not expose storage paths.
- [ ] Empty, deleted, failed, missing-object, oversized, wrong-type, duplicate, offline/slow, and server-error states are safe and understandable.
- [ ] Mobile, desktop, keyboard, focus, zoom/reflow, screen-reader labels/status, reduced-motion, and non-colour meaning checks pass.
- [ ] Evidence does not automatically change readings, scoring, thresholds, recommendations, or clinical meaning.
- [ ] OCR, voice, public sharing, email attachment, and third-party processing remain absent.

## Validation Acceptance

- [ ] Focused upload/storage contract tests pass.
- [ ] Focused access-denial and role-agreement tests pass locally.
- [ ] JSON validation passes.
- [ ] TypeScript passes.
- [ ] ESLint passes without warnings.
- [ ] Production build passes from the exact isolated source.
- [ ] Static/design/domain validators pass or exact inherited blockers are recorded without weakening them.
- [ ] `git diff --check` passes for touched files.
- [ ] Route inventory shows no unintended public, protected, API, shop, checkout, or marketing changes.
- [ ] No secret, signed URL, private payload, real client file, or credential fragment appears in diffs, logs, evidence, screenshots, or client bundles.

## Remote Acceptance

Remote items are not required for a local-ready closeout unless later explicitly requested.

- [ ] Any remote execution has an exact later user instruction and recorded target/preflight/rollback/cleanup plan.
- [ ] Only the intended bucket/migration/policies are mutated.
- [ ] Controlled synthetic role/storage matrix passes.
- [ ] Owned fixtures and objects are cleaned exactly.
- [ ] Final hosted Auth/application/Storage state is recorded without private payloads.
- [ ] No deployment, public reopening, DNS, Vercel, Stripe, billing, or production-data mutation occurs.

## Closeout Outcomes

Close with exactly one:

- `evidence-uploads-local-ready`: all baseline, decisions, design, implementation, local proof, documentation, and validation acceptance pass; remote apply/proof remains explicitly deferred.
- `evidence-uploads-complete`: local acceptance and a later expressly requested bounded remote apply/proof both pass with exact cleanup and no deployment.
- `evidence-upload-baseline-blocked-clean`: no safe clean product baseline exists; no production source, schema, remote state, or original dirty worktree is changed.
- `evidence-upload-decisions-blocked-clean`: required privacy/storage/lifecycle authority is incomplete; discovery/decision evidence only, with no schema, Storage, server upload, or remote change.
- `evidence-upload-implementation-blocked-clean`: accepted local implementation cannot safely complete within scope; exact blocker and recovery are recorded, no remote mutation occurs.
- `evidence-upload-remote-proof-blocked-clean`: local-ready work passes but a later bounded remote proof stops safely with exact cleanup/restoration evidence.

No outcome implies OCR readiness, voice readiness, scoring/recommendation approval, dashboard completion, public launch, production readiness, commerce readiness, deployment, or project Done.

============================================================
FILE: planning/sprints/023-test-evidence-uploads-and-storage/handoff-prompt.md
============================================================

# Sprint 023 - Builder Handoff Prompt

You are Builder for Sprint 023 - Test Evidence Uploads And Storage.

Apply and verify all four Sprint 023 files, then execute strictly from them.

Start with the hard baseline gate. Do not edit production source until one clean isolated commit is proven to contain the accepted Sprint 021AH and Sprint 022/022B product source. Do not use the 029M marketing-release branch as a product baseline merely because it is the latest deployed branch. Do not alter the original dirty `develop` worktree. If the baseline cannot be proven, stop `evidence-upload-baseline-blocked-clean` with the required five-part intervention.

Next reconcile all twenty privacy/storage/lifecycle decisions. Existing Sprint 013 file categories and the 2 MB limit are evidence, not authority. Do not invent missing decisions. If a decision affecting schema, access, privacy, retention, deletion, ownership, audit, or object lifecycle remains unanswered, stop `evidence-upload-decisions-blocked-clean` before schema, Storage, server upload, or remote work.

After both gates pass, document the full design before coding. Implement only the smallest private, test-scoped, audited evidence workflow in the approved file set. Preserve application/RLS agreement, wrong-horse and cross-stable denial, safe retry/cleanup, accessible mobile behaviour, and unchanged readings/scoring.

Use synthetic files only. Never expose secrets, signed URL values, storage paths, private payloads, or real client evidence in logs or records.

Remote bucket creation, policy application, migration, hosted fixtures, deployment, push, PR, and environment/secret mutation are not included without a later exact user instruction. Stop and record manual intervention rather than improvising an external action.

Correct the planning schedule's 023/028 label conflict only as part of evidence-backed closeout. Do not implement the Sprint 028 dashboard.

Do not commit unless separately asked. Do not begin Sprint 024 or any later sprint.
