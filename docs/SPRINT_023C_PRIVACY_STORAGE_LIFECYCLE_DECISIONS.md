# Sprint 023C - Privacy, Storage And Lifecycle Decisions

Status: **Approved governing contract**  
Organisation: Aprec8 Pty Ltd  
Project: Precision Performance  
Prepared: 28 July 2026  
Decision owner: **Phillip Norman Rankin**  
Role and authority: **Director, Aprec8 Pty Ltd, authorised to approve privacy and data-handling decisions**  
Effective date: **28 July 2026**  
Authority source: consolidated Word decision record and Phillip Norman Rankin's explicit approval supplied on 28 July 2026, including his Aprec8 authority, effective date, monitored incident email, and supersession of all earlier standalone `Accept` annotations  
Incident email: **equineprecisionperformance@hotmail.com**

## Contract Status And Interpretation

This is the canonical, diffable governing contract for Sprint 023. Phillip Norman Rankin, Director of Aprec8 Pty Ltd and authorised to approve privacy and data-handling decisions, approved all twenty answers as the governing privacy, storage and lifecycle decision contract for Sprint 023, effective 28 July 2026. The approval states that this consolidated contract supersedes every earlier standalone `Accept` annotation and is the authoritative record.

For every question below, `accepted` means approved under the contract-wide authority statement above. `Supersedes` identifies earlier proposals replaced by this contract. Explanatory rationale is not a new business decision. Binding constraints govern Sprint 023D design but do not select architecture, schema, providers, processors, dependencies, services, or secrets.

## 1. Permitted File Types

**Question:** Which file categories, MIME types and extensions are permitted?

**Answer:** Permit JPEG (`.jpg`, `.jpeg`; `image/jpeg`), PNG (`.png`; `image/png`), PDF (`.pdf`; `application/pdf`), and controlled CSV meeting Question 3. Extension, declared MIME type, and detected signature must agree. Reject executables, scripts, archives, Office files, video, audio, SVG, and unknown types.

**Status:** `accepted`.  
**Supersedes:** Sprint 013's category list. The generic `photo` category is replaced by JPEG/PNG technical types.  
**Binding constraints:** PDF and CSV remain subject to Questions 3, 14, and 15.

## 2. File Size And Count Limits

**Question:** What is the maximum size per file and maximum number of files per test?

**Answer:** Maximum 5 MiB per file, 10 files per test, and 30 MiB aggregate evidence per test.

**Status:** `accepted`.  
**Supersedes:** Sprint 013's 2 MiB per-file proposal.  
**Binding constraints:** Enforce per-file, count, and aggregate limits server-side; browser-reported size is not authoritative.

## 3. Controlled CSV Evidence

**Question:** Should CSV files be permitted?

**Answer:** Permit CSV only when produced by an Aprec8-approved source using an approved, version-controlled format. Reject random, general-purpose, structurally unrecognised, or unexpected CSV. Supporting evidence must not automatically alter readings or scores.

**Status:** `accepted`.  
**Binding constraints:** Sprint 023D must define an approved source/template register and structural validation without inventing a format in 023C. Formula-like spreadsheet values must be neutralised or rejected.

## 4. Identifiable And Confidential Content

**Question:** May evidence contain identifiable horses, people, locations, documents, labels or stable details?

**Answer:** Permit relevant horses, tests, equipment, labels, stable environments, and operational documents. Discourage or prohibit unnecessary identifiable people, personal contact details, identity or financial information, and unrelated confidential information. Where a person is identifiable, the uploader must have authority to provide the material.

**Status:** `accepted`.  
**Binding constraints:** Evidence remains private. No public or marketing reuse occurs without separate written authority. Apply Question 15 metadata controls.

## 5. Collection Purpose And Uploader Authority

**Question:** Why is evidence collected, and what authority must the uploader have?

**Answer:** Collect evidence to evaluate, record, review, and monitor the horse's state of being, training condition, and associated biochemistry-test context, and to support authorised comparison, consultation, and service quality. The uploader must confirm authority to provide the evidence and its relevance to the horse and test.

**Status:** `accepted`.  
**Binding constraints:** No unrelated marketing, facial recognition, automated diagnosis, public publication, or external AI training without separate authority.

## 6. Ownership, Service Rights And Confidentiality

**Question:** Who owns uploaded evidence, and what rights does Aprec8 receive?

**Answer:** Aprec8 owns the application records, structured metadata, database entries, and stored service copy created through the application. The uploader warrants that they own the uploaded material or have sufficient authority to provide it. Aprec8 may store, process, display, secure, back up, retain, and delete evidence to provide and protect the service. Copyright or other underlying rights may remain with a veterinarian, laboratory, photographer, or uploader.

**Status:** `accepted`.  
**Binding constraints:** Treat evidence as confidential and private. No sale, public disclosure, unrelated marketing, or external AI training occurs without separate authority. This wording does not claim rights the uploader cannot grant.

## 7. Role Permissions

**Question:** Who may upload, view, download, replace, soft-delete, restore and purge evidence?

**Answer:** Every permission remains subject to current access to the relevant stable, horse, and test.

| Role | Upload | View | Download | Replace | Soft-delete | Restore | Purge |
|---|---|---|---|---|---|---|---|
| Authorised Administrator | Yes | Yes | Yes | Yes | Yes | Yes | Only when separately designated as the governed purge operator |
| Assigned Trainer | Yes | Yes | Yes | Yes | Yes | May request restoration; an authorised Administrator performs it | No |
| Assigned Stable Staff | Yes | Yes | Yes | Own pending upload only | No | No | No |
| Assigned Veterinarian | No | Yes | Yes | No | No | No | No |
| Assigned Owner | No | Yes | Yes | No | No | No | No |
| Expressly assigned read-only consultant | No | Yes | Only when expressly authorised | No | No | No | No |
| Anonymous, inactive, suspended, revoked, or unauthorised actor | No | No | No | No | No | No | No |

**Status:** `accepted`.  
**Clarification:** `Request/Admin` in the Word record is read as Trainer request plus Administrator execution; `Operator only` is read as a separately governed administrator/operator permission rather than purge authority for every Administrator.  
**Binding constraints:** Sprint 023D must preserve this matrix without broad role redesign.

## 8. Assignment And Access Conditions

**Question:** Under what conditions may Stable Staff, Veterinarians, Owners and consultants access evidence?

**Answer:** Require active authentication, active stable membership, a current authorised relationship to the horse, permission to access the underlying test, and a fresh server-side authorisation check. Stable Staff may upload but not delete. Veterinarians and Owners are read-only. Consultant access must be expressly assigned.

**Status:** `accepted`.  
**Binding constraints:** Access ends on account, membership, relationship, or assignment revocation. Deny anonymous, inactive, suspended, wrong-horse, and cross-stable access.

## 9. Retention

**Question:** How long should evidence be retained, and when should it be reviewed?

**Answer:** Retain evidence for as long as Aprec8 considers operationally necessary for horse evaluation and monitoring and the associated service. Review retained evidence periodically and allow deletion when obsolete, no longer operationally useful, or disconnected from an active service relationship.

**Status:** `accepted`.  
**Binding constraints:** A dispute, investigation, legal obligation, or documented operational hold may suspend ordinary deletion. Review the retention position where files contain information about identifiable people. The review cadence is not set by this decision and remains a pre-production operational input.

## 10. Deletion, Recovery, Purge And Holds

**Question:** What deletion lifecycle applies?

**Answer:** Soft-delete immediately and conceal deleted evidence from ordinary users. Permit Administrator restoration for 30 days. After 30 days, permanently purge object bytes and metadata, retaining only a minimal non-content audit record. A documented legal or operational hold suspends purge.

**Status:** `accepted`.  
**Binding constraints:** Only an authorised Administrator may create or release a hold. Record hold reason, owner, start date, and review date. Backup expiry under Question 18 must not silently restore purged evidence into active use.

## 11. Audit Requirements

**Question:** Which events and fields must be audited, and who may review the audit?

**Answer:** Audit upload request, success, failure, and block; view; download; replacement; soft deletion; restoration; purge; hold creation and release; authorisation denial; and orphan detection and cleanup. Record safe identifiers, actor and authorised role, timestamp, outcome, and reason code. Administrators may review full audit history; authorised Trainers may see only an appropriate activity history for authorised horses; other roles receive no raw audit access.

**Status:** `accepted`.  
**Binding constraints:** Never audit file contents, signed URLs, secrets, raw object paths, or unnecessary personal data.

## 12. Storage Region And International Operation

**Question:** Where must evidence be stored?

**Answer:** Keep primary evidence and metadata in Australia, using the existing Australian Supabase region if it is contractually suitable. Review destination, provider and subprocessors, backups, overseas personnel access, customer obligations, and notices before international operation or storage. Do not silently migrate existing evidence.

**Status:** `accepted`.  
**Binding constraints:** This decision does not certify the current provider contract or approve a provider change.

## 13. Private Downloads And Signed URLs

**Question:** How should authorised users receive files?

**Answer:** Use a private bucket and a server-generated signed URL valid for 60 seconds, issued only after a fresh server-side access check for the stable, horse, and test.

**Status:** `accepted`.  
**Binding constraints:** Never persist, log, email, pre-generate, or expose signed URLs or raw object paths. Revocation prevents new URLs; an already issued URL may remain usable until its 60-second expiry.

## 14. Malware And Unsafe Content

**Question:** How should unsafe, malformed, password-protected or abusive uploads be handled?

**Answer:** Validate size, extension, MIME type, and signature; reject executable, malformed, and password-protected material; keep evidence unavailable until malware scanning succeeds; quarantine or block failures; purge rejected temporary objects within 24 hours; rate-limit uploads; and escalate repeated abuse.

**Status:** `accepted`.  
**Binding constraints:** Scanner/provider selection belongs to Sprint 023D and requires approval if it adds a processor, dependency, service, or secret. Administrator review must not execute unsafe content.

## 15. EXIF And Embedded Metadata

**Question:** Should hidden image and document metadata be stripped or preserved?

**Answer:** Strip non-essential image metadata including GPS coordinates, device identifiers, hidden thumbnails, author fields, and editing history. Preserve only display-required information such as orientation. Reject encrypted or password-protected PDFs and validate active or embedded content. Do not alter visible evidentiary pixels.

**Status:** `accepted`.  
**Binding constraints:** Record that sanitisation occurred without retaining stripped metadata. Do not treat client-supplied metadata as authoritative evidence.

## 16. Duplicates, Retries And Replacement

**Question:** How should duplicate uploads and retries behave?

**Answer:** Generate a 24-hour upload-attempt idempotency key and calculate a server-side content hash. Replaying the same attempt returns its existing outcome. A separate intentional same-content upload requires warning and confirmation. Never overwrite an existing object path. Replacement creates a new version and soft-deletes the previous version only after the new version succeeds.

**Status:** `accepted`.  
**Binding constraints:** Sprint 023D must define deterministic user-visible retry and replacement states consistent with this policy.

## 17. Orphan Reconciliation

**Question:** How should objects without valid metadata, or metadata without objects, be handled?

**Answer:** Keep uploads pending until the object/metadata relationship verifies. Retry transient compensation failures with bounded attempts. Reconcile daily. Quarantine object-only records, mark missing-object metadata unavailable, purge unresolved temporary orphans after 24 hours, and alert an Administrator after repeated reconciliation failure.

**Status:** `accepted`.  
**Binding constraints:** Never expose orphaned objects. Scheduling and architecture belong to Sprint 023D.

## 18. Backups, Exports And Requests

**Question:** How should backups, exports, data-access requests and correction requests be handled?

**Answer:** Include evidence in encrypted provider backups only where required for service recovery and subject to provider expiration. Authorised Administrators may export evidence and metadata for a verified request. Route access and correction requests through Aprec8's nominated privacy contact after verifying identity and authority.

**Status:** `accepted`.  
**Binding constraints:** Do not silently restore expired or deleted evidence into active use. Safely audit requests, decisions, exports, and corrections without private content in logs. The nominated privacy contact and provider backup facts remain pre-production inputs.

## 19. Uploader Notice And Acknowledgement

**Question:** What must the user confirm before upload?

**Answer:** `I confirm that I am authorised to upload this evidence and that it is relevant to this test.`

**Status:** `accepted`.  
**Binding constraints:** Show concise privacy guidance immediately above an unchecked required acknowledgement. The uploader must actively select it before upload.

## 20. Incident Reporting And Response

**Question:** Who handles incidents, through which channel and within what timeframe?

**Answer:** The Aprec8 Privacy Officer or nominated incident owner handles incidents through the dedicated monitored address `equineprecisionperformance@hotmail.com`. Acknowledge urgent internal reports within four business hours, begin containment immediately, conduct an initial privacy-owner assessment within 24 hours, and escalate to management, legal, and security where information may be affected. Apply relevant Australian breach assessment and notification obligations and keep a complete safe incident record.

**Status:** `accepted`.  
**Binding constraints:** Record detection, containment, affected information or users, actions, decisions, and closure without unnecessary private content. Do not publish placeholder contact wording.

## Cross-Decision Agreement

- Operational retention under Question 9 is not a promise of indefinite storage. Question 10 governs user-initiated deletion, restoration, purge, and holds; Question 18 governs expiring recovery backups and prohibits silent reactivation of deleted or expired evidence.
- Aprec8's service-record ownership under Question 6 does not override third-party rights in source material and does not permit public, marketing, sale, or external-AI use.
- Question 7's role permissions are always narrowed by Question 8's active assignment and fresh authorisation requirements.
- Questions 13 through 17 require private, unavailable-until-safe handling, but do not approve a specific bucket design, upload protocol, scanner, processor, dependency, scheduled-job mechanism, or secret.

## Authority Completion

All authority fields are complete and synchronised with the stakeholder Word record:

1. decision owner: Phillip Norman Rankin;
2. authority: Director, Aprec8 Pty Ltd, authorised to approve privacy and data-handling decisions;
3. consolidated twenty-answer approval: supplied on 28 July 2026;
4. effective date: 28 July 2026;
5. monitored incident email: `equineprecisionperformance@hotmail.com`; and
6. historical annotations: superseded in full by this consolidated contract.

## Pre-Production Interventions After Authority Completion

Authority completion does not itself resolve legal/privacy review, the controlled-CSV source/template register, retention review cadence, nominated privacy-contact operations, provider backup/contract suitability, or malware-scanner/provider selection. Sprint 023D must classify these inputs without silently inventing them, and later production work must complete every applicable intervention.
