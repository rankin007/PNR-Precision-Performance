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
