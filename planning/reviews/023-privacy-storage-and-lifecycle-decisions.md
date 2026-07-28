# Sprint 023 - Privacy, Storage, And Lifecycle Decisions

Date: 2026-07-28  
Result: `BLOCKED - required authority incomplete`

## Authority Method

Checked `planning/DECISIONS.md`, `planning/QUESTIONS.md`, `planning/RISKS.md`, `planning/DOMAIN.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, `docs/BIOCHEMISTRY_DATA_MODEL_013.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/ARCHITECTURE.md`, `docs/API.md`, migration 0009, and `lib/domain/biochemistry.ts`.

Sprint 013 categories, metadata columns, RLS scaffolding, and the 2 MB constant are classified as implementation proposals/evidence only. They are not treated as privacy-owner approval.

## Twenty-Decision Matrix

| # | Required decision | Existing evidence | Authority result |
|---|---|---|---|
| 1 | Permitted categories and MIME types | Sprint 013 proposes PDF, CSV, PNG/JPG/JPEG/photo but no authoritative MIME/content policy. | `UNANSWERED` |
| 2 | Maximum bytes and files per test | Sprint 013 proposes 2 MiB per file; no approved count limit. | `UNANSWERED` |
| 3 | Whether CSV remains permitted | CSV exists only in Sprint 013 scaffolding. | `UNANSWERED` |
| 4 | Identifiable horses/people/locations/documents/labels/stable details | Public imagery requires releases, but no private operational-evidence rule exists. | `UNANSWERED` |
| 5 | Business purpose and lawful/authorised collection basis | Product intent says test evidence; no approved collection basis is recorded. | `UNANSWERED` |
| 6 | Ownership and service licence/permission | No authority found. | `UNANSWERED` |
| 7 | Upload/read/download/replace/delete permissions by role/access | User-approved decision says Admin/Trainer delete, Staff may add uploads but not delete, Vet read-only. Read/download/replace detail and Owner treatment are incomplete. | `PARTIAL` |
| 8 | Staff upload and Vet/Owner read treatment | Staff upload and Vet read-only are explicitly approved; Owner treatment is only scaffold intent, not explicit approval. | `PARTIAL` |
| 9 | Retention duration and start event | No authority found. | `UNANSWERED` |
| 10 | Deletion, recovery, purge, and holds | Soft-delete/audit first and Admin/Trainer delete are approved; recovery window, purge timing, and hold behaviour are not. | `PARTIAL` |
| 11 | Audit events/fields and reviewers | Existing metadata fields are scaffolding; no complete approved event/reviewer policy exists. | `UNANSWERED` |
| 12 | Storage region/data location | The candidate Supabase project is recorded as `ap-southeast-1`, but no evidence-storage location requirement is approved. | `UNANSWERED` |
| 13 | Download method and signed-URL lifetime | No authority found. | `UNANSWERED` |
| 14 | Malware, unsafe content, password protection, abuse | No authority found. | `UNANSWERED` |
| 15 | EXIF/embedded metadata stripping or preservation | No authority found. | `UNANSWERED` |
| 16 | Duplicate and retry/idempotency behaviour | No authority found. | `UNANSWERED` |
| 17 | Orphan object/metadata reconciliation | No authority found. | `UNANSWERED` |
| 18 | Backup/export/data-access/correction requests | No authority found. | `UNANSWERED` |
| 19 | Privacy notice and consent/acknowledgement wording | No approved wording found. | `UNANSWERED` |
| 20 | Incident/reporting contact and response process | No authority found. | `UNANSWERED` |

No item is fully resolved. Items 7, 8, and 10 preserve their explicit prior decisions but still contain material unanswered components. Schema, access, object lifecycle, and privacy meaning therefore remain unresolved.

## Exact Questions For The Privacy/Business Owner

1. Which file categories and exact MIME types/extensions are permitted?
2. What is the maximum byte size per file and maximum file count per test?
3. Is CSV permitted, and if so for what evidence purpose?
4. May files contain identifiable horses, people, locations, documents, labels, or stable details; what restrictions/releases apply?
5. What is the approved business purpose and lawful/authorised collection basis?
6. Who owns uploaded evidence, and what licence/permission does Aprec8 receive to store, process, display, back up, and delete it?
7. For Administrator, Trainer, Stable Staff, Veterinarian, Owner, and any consultant role, who may upload, list/read, download, replace, soft-delete, restore, and purge?
8. Confirm whether Stable Staff may upload and whether Veterinarians and Owners are read-only; specify any access-level or assignment conditions.
9. How long is evidence retained, and what event starts the retention period?
10. What are the soft-delete, recovery window, object-purge timing, and legal/operational hold rules?
11. Which upload/view/download/replace/delete/restore/purge/failure events and fields must be audited, and who may review the audit?
12. What storage region/data-location requirement applies?
13. Must downloads use short-lived signed URLs or server streaming, and what lifetime is approved?
14. How should malware, unsafe content, password-protected files, and abusive uploads be blocked, quarantined, reviewed, and reported?
15. Must EXIF and other embedded metadata be stripped, preserved, or handled by file type?
16. How should duplicate files and retries be detected; what idempotency key/window and user-visible outcome are required?
17. How and when should orphan metadata/objects be reconciled, retried, quarantined, or purged?
18. What backup/export, data-access request, and correction request treatment applies?
19. Supply the approved privacy notice and consent/acknowledgement wording shown before upload.
20. Who is the incident/reporting contact, through what channel, and what operator response/escalation steps and timeframes apply?

## Decision-Gate Outcome

Outcome is `evidence-upload-decisions-blocked-clean`. No upload design was created because design would encode unanswered policy. No production source, schema, migration, Storage policy, bucket, server action, UI, dependency, remote system, or provider state was changed.

