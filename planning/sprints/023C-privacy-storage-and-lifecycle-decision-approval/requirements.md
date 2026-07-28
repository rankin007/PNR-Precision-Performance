# Sprint 023C - Privacy, Storage And Lifecycle Decision Approval Requirements

## Role And Method

Builder executes this corrective follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023C files, and executes from those sprint files.

Sprint 023C belongs to core Sprint 023. It resolves and records business/privacy authority only. It does not design or implement uploads, schema, Storage, RLS, sanitisation, malware scanning, scheduled jobs, signed downloads, UI, remote operations, or deployment.

## Starting Point

- Clean product baseline: `a7759f691f0e01482f3a396acd14b2a23dbca5ec` on `codex/023B-source-reconciliation-and-clean-product-baseline`.
- Sprint 023 was applied in isolated worktree `C:\tmp\pnr-023-test-evidence-uploads` and stopped correctly as `evidence-upload-decisions-blocked-clean`.
- Sprint 023's uncommitted evidence includes baseline reconciliation, the original twenty-decision matrix, decision-gate closeout, generated Sprint 023 files, and conflict-safe planning updates.
- The consolidated Word record currently exists as `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISION_RECORD.docx` in the dirty original `develop` worktree and is not part of the clean 023B lineage.
- The Word record structurally passed accessibility and heading checks. PNG render QA was not available because LibreOffice was absent from the document runtime; that limitation is part of the source record, not proof of visual quality.
- The user subsequently approved or amended the substantive recommendations, including controlled CSV evidence, identifiable-content safeguards, collection purpose, ownership wording, open-ended operational retention with periodic review, deletion, audit, Australian storage, signed URLs, unsafe-content policy, metadata stripping, duplicates, orphan handling, backup/access requests, uploader acknowledgement, and incident-response process.
- Formal decision-owner identity, role/authority, final effective sign-off, and monitored incident email remain absent from the current Word record.

All paths, hashes, statuses, and conversation-derived summaries must be independently reconciled against durable files before being treated as final authority.

## Goal

Create one internally consistent, source-backed decision contract that:

1. records all twenty questions in Question and Answer format;
2. distinguishes the user's approved answer from explanatory rationale and implementation guidance;
3. records each answer as `accepted`, `rejected`, or `superseded` with source and effective date;
4. resolves the earlier ambiguous standalone `Accept` annotations without guessing;
5. records the named decision owner and their business/privacy authority;
6. records the monitored incident-reporting email address required by Question 20;
7. preserves the Word document as the signed/readable stakeholder record and a Markdown file as the diffable canonical repository contract;
8. reconciles Sprint 023's stopped evidence into the isolated 023C lineage;
9. identifies decisions that constrain Sprint 023D design without prematurely selecting architecture or providers; and
10. leaves the original dirty `develop` worktree, Sprint 023 worktree, committed 023B worktree, production source, schema, provider state, and remote systems unchanged.

## Required Authority Gate

Before closing `decision-contract-approved-clean`, Builder must obtain and record:

1. decision owner's full name;
2. decision owner's role and authority to approve privacy/data handling for Aprec8;
3. explicit confirmation that the consolidated twenty answers are approved as the governing Sprint 023 contract;
4. effective date;
5. monitored incident-reporting email address for Question 20; and
6. mapping or supersession of the earlier standalone `Accept` annotations.

Builder must not infer a person's identity, authority, email address, signature, legal review, or approval date. If any required item remains missing, Builder may complete source reconciliation and prepare the final candidate contract, then must stop `decision-authority-details-blocked-clean` with the five-part Manual Intervention Rule.

The incident email may be recorded as a pre-production intervention only in a draft candidate. It cannot satisfy Question 20 or unlock Sprint 023D while it remains `to be advised`, because Sprint 023 requires all twenty decisions to have explicit source-backed answers before detailed design.

## Candidate Twenty-Decision Contract

Builder must reconcile, not silently rewrite, the following candidate answers:

1. **File types:** JPEG, PNG, PDF, and controlled CSV only; extension, MIME, and detected signature must agree; executable, scriptable, archive, Office, video, audio, SVG, and unknown files are rejected.
2. **Limits:** 5 MiB per file, 10 files per test, and 30 MiB aggregate per test.
3. **CSV:** permitted only from an Aprec8-approved source using an approved, version-controlled format; random, general-purpose, or structurally unrecognised CSV is prohibited; supporting evidence does not automatically alter readings or scores.
4. **Content:** relevant horse, test, equipment, label, stable, and operational-document content is permitted; unnecessary identifiable people, personal contact details, identity/financial information, and unrelated confidential information are discouraged or prohibited; uploader authority is required; no public/marketing reuse without separate written authority.
5. **Purpose:** evaluate, record, review, and monitor the horse's state of being, training condition, and biochemistry-test context; support authorised comparison, consultation, and service quality; uploader confirms authority and relevance; no unrelated marketing, facial recognition, automated diagnosis, or external AI training without separate authority.
6. **Ownership and service rights:** Aprec8 owns application records, structured metadata, database entries, and the stored service copy; the uploader warrants ownership or sufficient authority; Aprec8 may store, process, display, secure, back up, retain, and delete evidence to provide/protect the service; evidence remains confidential and private; no sale, public disclosure, unrelated marketing, or external AI training without separate authority.
7. **Role operations:** Administrator may upload/view/download/replace/soft-delete/restore and perform governed operator purge; assigned Trainer may upload/view/download/replace/soft-delete and request/administer restoration according to the final contract; assigned Stable Staff may upload/view/download and replace only their own pending upload but not delete/restore/purge; assigned Veterinarian and Owner are read-only; expressly assigned consultant is read-only; anonymous, inactive, suspended, revoked, and unauthorised actors have no access.
8. **Assignment conditions:** active authentication, active membership, current authorised horse relationship, underlying test access, and fresh server-side authorisation are required; access ends on revocation; wrong-horse and cross-stable access is denied.
9. **Retention:** Aprec8 retains evidence for as long as operationally necessary for horse evaluation/monitoring and the service; retained evidence is reviewed periodically and may be deleted when obsolete, no longer useful, or disconnected from an active relationship, subject to disputes, investigations, legal obligations, and documented holds.
10. **Deletion:** immediate soft delete; ordinary-user concealment; 30-day administrator restoration window; permanent object and metadata purge after 30 days; minimal non-content audit retained; documented legal/operational hold suspends purge; authorised administrator controls holds with reason, owner, start date, and review date.
11. **Audit:** upload request/success/failure/block, view, download, replacement, deletion, restoration, purge, hold, denial, and orphan reconciliation are audited using safe identifiers, actor/role, timestamp, outcome, and reason code; never file contents, signed URLs, secrets, raw paths, or unnecessary personal data; administrators review full audit; authorised Trainers receive appropriate activity history only.
12. **Region:** primary evidence and metadata remain in Australia using the existing Australian Supabase region if contractually suitable; international operation or storage triggers a prior review of destination, provider/subprocessors, backups, overseas access, customer obligations, and notices; no silent migration.
13. **Delivery:** private bucket; server-generated signed URL valid for 60 seconds only after fresh access check; never persist, log, email, pre-generate, or expose raw object paths; revocation prevents new URLs but already issued URLs may remain valid until expiry.
14. **Unsafe content:** validate size, extension, MIME, and signature; reject executable/malformed/password-protected material; evidence unavailable until scanning succeeds; block/quarantine failure; purge rejected temporary objects within 24 hours; rate limit and escalate abuse; scanner/provider remains a Sprint 023D design choice requiring approval if it adds a processor, dependency, service, or secret.
15. **Metadata:** strip non-essential image metadata including GPS, device identifiers, hidden thumbnails, author fields, and editing history; preserve only display-required orientation; reject encrypted/password-protected PDFs and validate active/embedded content; do not alter visible pixels; record sanitisation without retaining stripped metadata.
16. **Duplicates/retries:** 24-hour upload-attempt idempotency key, server-side content hash, replay returns existing outcome, separate same-content upload requires warning/confirmation, no object-path overwrite, replacement creates a new version and soft-deletes the previous only after success.
17. **Orphans:** pending until object/metadata relationship verifies; bounded compensation retries; daily reconciliation; quarantine object-only records; mark missing-object metadata unavailable; purge unresolved temporary orphans after 24 hours; never expose orphans; alert repeated failure.
18. **Backup/export/access/correction:** encrypted provider backups only for recovery with provider expiration; no silent restoration of deleted/expired evidence; verified-authority administrator export; requests route through nominated privacy contact; identity/authority verification and safe audit required.
19. **Acknowledgement:** `I confirm that I am authorised to upload this evidence and that it is relevant to this test.` Concise privacy guidance appears immediately above an unchecked required acknowledgement.
20. **Incident response:** Aprec8 Privacy Officer or nominated incident owner; dedicated monitored email address; urgent internal acknowledgement within four business hours; immediate containment; initial privacy-owner assessment within 24 hours; management/legal/security escalation where information may be affected; applicable Australian breach assessment/notification; complete safe incident record. Exact email remains to be supplied.

Builder must identify contradictions, undefined terms, and architecture-dependent wording. Builder may clarify language without changing business meaning. Any material policy change requires explicit user/business-owner confirmation.

## Required Reading

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md` from the selected clean base
5. `planning/DECISIONS.md`, `planning/DOMAIN.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`
6. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
7. Sprint 023 and 023B Architect Packs and generated sprint files
8. all `planning/reviews/023-*.md` and `planning/reviews/023B-*.md` evidence
9. `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISION_RECORD.docx`
10. `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
11. `docs/AUTH_RLS_PORTAL_ACCESS.md`
12. `docs/ARCHITECTURE.md` and `docs/API.md`
13. relevant OAIC and official Supabase references already cited in the Word record, verifying current wording when relied upon

## Source Intake And Isolation

Builder must create `codex/023C-privacy-storage-and-lifecycle-decision-approval` in a new isolated worktree from exact commit `a7759f691f0e01482f3a396acd14b2a23dbca5ec`.

Builder may read, but must not mutate:

- `C:\tmp\pnr-023-test-evidence-uploads` as the source of stopped Sprint 023 artifacts;
- the original dirty `develop` worktree as the source of the Word decision record and this Architect Pack; and
- `C:\tmp\pnr-023b-source-reconciliation` as the committed baseline proof.

Before copying, Builder must record source path, size, SHA-256 or Git blob identity where applicable, and source-worktree status. Copy only the approved evidence/artifacts into the isolated 023C worktree. Prove all source worktrees remain unchanged afterward.

## Approved File Set

Builder may create or edit only in the isolated Sprint 023C worktree:

- `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISION_RECORD.docx`;
- `docs/SPRINT_023C_PRIVACY_STORAGE_LIFECYCLE_DECISIONS.md`;
- `planning/architect-packs/architect-pack-023C-privacy-storage-and-lifecycle-decision-approval.md`;
- `planning/sprints/023-test-evidence-uploads-and-storage/**`, copied exactly from verified stopped Sprint 023 evidence;
- `planning/sprints/023C-privacy-storage-and-lifecycle-decision-approval/**`;
- `planning/reviews/023-baseline-and-scope-reconciliation.md`;
- `planning/reviews/023-privacy-storage-and-lifecycle-decisions.md`;
- `planning/reviews/023-closeout.md`;
- `planning/reviews/023C-decision-source-reconciliation.md`;
- `planning/reviews/023C-final-decision-contract.md`;
- `planning/reviews/023C-document-validation.md`;
- `planning/reviews/023C-closeout.md`;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/ARCHITECT_BRIEFING.md`;
- `planning/EVIDENCE_INDEX.md`;
- `planning/SPRINT_SCHEDULE.md`;
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for the final accepted twenty-decision contract;
- `planning/RISKS.md`, only where the approved decisions change risks; and
- `planning/QUESTIONS.md`, only to resolve the twenty questions or preserve exact remaining interventions.

Any production source, migration, test, package, configuration, environment, provider, schema, Storage, UI, or other file is outside scope.

## Document Requirements

The Markdown contract is the canonical diffable repository source. The Word document is the stakeholder-readable approval record. Their twenty questions, answers, statuses, authority metadata, dates, caveats, and outstanding interventions must agree exactly.

If the Word document is changed, Builder must use the available document skill and:

- preserve its formal decision-record layout;
- run structural and accessibility audits;
- render to PNG and visually inspect every page when LibreOffice is available;
- if LibreOffice remains unavailable, record that exact limitation without claiming visual QA;
- ensure no comments, tracked changes, hidden private metadata, or internal tool citation tokens remain; and
- record final SHA-256 and page count when renderable.

Do not treat a signature field, typed name, or effective date as approved unless supplied by the authorised user/business owner.

## External And Git Boundaries

This Pack permits local isolated worktree and branch creation only. It does not permit commit, push, PR, merge, rebase, remote mutation, provider access, deployment, environment change, or production operation.

Do not commit unless separately asked after the final contract and validation evidence are presented. Do not modify or stage the original `develop` worktree or the stopped Sprint 023 worktree.

## Explicitly Out Of Scope

- Sprint 023D architecture or detailed design;
- schema, migrations, bucket/path design, RLS, upload protocol, signed-URL implementation, sanitiser/scanner/provider selection, scheduled reconciliation, UI, and tests;
- any production, remote Supabase, deployment, public-site, commerce, scoring, OCR, voice, or AI feature;
- legal advice or invented legal conclusions;
- selecting a person, email address, provider, or contractual obligation without authority; and
- beginning Sprint 024 or any later core sprint.

## Manual Intervention Rule

For every blocker or required user/operator action, Builder must record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- numbered steps; and
- what Builder will verify afterward.

Known likely interventions are named decision owner, authority, approval/effective date, exact incident email, ambiguous historical annotation mapping, legal/privacy review, and unavailable LibreOffice render QA.
