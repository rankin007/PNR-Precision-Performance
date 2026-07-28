# Test Evidence Upload Architecture — Sprint 023D

Status: approved design; unimplemented
Authority: Sprint 023C governing contract plus Aprec8 decisions supplied 28 July 2026
Scope: architecture and documentation only

## 1. Outcome And Invariants

This design evolves `public.biochemistry_test_uploads` additively in a future migration `0018`; it does not alter migration `0009`. Evidence is private, test/horse/stable scoped, unavailable until verified, scanned and sanitised, and never authoritative for readings or scores. The system accepts JPEG, PNG and PDF. CSV support is designed but disabled until a governed registry entry and fixture exist. Limits are 5 MiB per object, 10 live/non-terminal objects and 30 MiB live/non-terminal bytes per test.

All authority is recalculated server-side from the authenticated user, active account/membership, current role/relationship, test, horse and stable. Client identifiers, MIME, size, object key, role and uploader claims are hints only. Elevated credentials remain server-only and do not replace scoped predicates, state checks or audit.

## 2. Trust Boundaries And Selected Protocol

Actors are the authenticated browser, Next.js server actions/routes, PostgreSQL/RLS, private Supabase Storage, a future scanner/sanitiser adapter, and the daily reconciliation route. The proposed private bucket is `test-evidence`; its creation remains Sprint 023F work.

Fully server-mediated upload is rejected because Vercel Functions impose a 4.5 MB request-body limit, below the approved 5 MiB file maximum. A two-hour signed-upload credential is also rejected as unnecessarily long-lived. Selected flow:

1. `initiateEvidenceUpload` performs fresh authentication and scoped permission checks, validates acknowledgement and declared metadata, locks the test quota row, reserves capacity, creates a 24-hour attempt and an opaque key, and returns only the minimum upload tuple.
2. The authenticated Supabase browser client uploads directly with `upsert: false`. Storage `INSERT` policy requires a live, unexpired, actor-owned intent whose exact bucket/key matches. No client can list, update or delete objects.
3. `finaliseEvidenceUpload` re-authenticates, reads authoritative Storage metadata, detects signature/MIME/size, computes a server-authoritative SHA-256 through trusted processing, checks quota and object/metadata agreement, and advances to safety processing. Any mismatch fails closed.
4. A future approved adapter scans then sanitises. A deterministic fake is allowed only for local Sprint 023E proof. No production-like object becomes `available` until both successful outcomes exist.
5. `requestEvidenceDownload` performs a fresh access check and creates a non-persisted 60-second signed URL. Revocation blocks new URLs; an issued URL may work until expiry.

Browser cancellation aborts the transfer when supported and calls cancellation/compensation best-effort. Lifecycle status is reported truthfully; percentage progress is shown only where byte progress is reliable.

## 3. Logical Model, Legacy Transition And Pseudo-DDL

The future migration evolves `public.biochemistry_test_uploads` and adds narrow intent, CSV, hold and audit tables. All referenced table names and delete actions below match migrations 0001 and 0009. Migration `0018` remains uncreated.

### 3.1 Mandatory legacy inventory gate

Before DDL, run one read-only inventory transaction and retain counts only (never filenames or paths): total/live/deleted rows; each category/content-type/extension combination; rows over 2 MiB and 5 MiB; zero/negative sizes; duplicate `storage_path`; missing referenced test/horse/uploader; upload horse differing from test horse; test with null stable; ambiguous `photo`; CSV rows; and deletion timestamp/actor disagreement. The migration stops unless all referential/scope/deletion discrepancies are zero and every `photo` row maps unambiguously from extension plus content type to JPEG or PNG. Rows over 5 MiB cannot be grandfathered and require a separately approved remediation. Existing CSV is inventoried but remains disabled/unavailable.

Legacy backfill is deterministic: `stable_id = biochemistry_tests.stable_id`; `.jpg`/`.jpeg` plus `image/jpeg` becomes category `jpeg`, `.png` plus `image/png` becomes `png`, `.pdf` plus `application/pdf` becomes `pdf`, and governed CSV stays `csv`. `version_group_id = id`, `version_no = 1`, `display_name = file_name`, declared MIME comes from `content_type`, and extension is normalised from the basename. Legacy bucket/key, detected MIME, hash, acknowledgement, scan and sanitisation facts are not invented. Every non-deleted legacy row becomes `legacy_unverified`; every deleted legacy row becomes `soft_deleted` with `restore_until = deleted_at + interval '30 days'` and a `legacy_unverified` prior-state marker. Both are unavailable. Restoration returns a legacy row to `legacy_unverified`, never directly to `available`.

### 3.2 Exact proposed DDL

```sql
-- Replace the two named 0009 constraints after the inventory/backfill proves compatibility.
alter table public.biochemistry_test_uploads
  drop constraint biochemistry_test_uploads_file_category_check,
  drop constraint biochemistry_test_uploads_size_bytes_check;

alter table public.biochemistry_tests
  add constraint biochemistry_tests_id_horse_stable_uq unique (id, horse_id, stable_id);

alter table public.biochemistry_test_uploads
  add column stable_id uuid,
  add column object_id uuid unique default gen_random_uuid(),
  add column bucket_id text,
  add column object_key text,
  add column display_name text,
  add column extension text,
  add column declared_mime text,
  add column detected_mime text,
  add column sha256_hex text,
  add column csv_registry_id uuid,
  add column state text,
  add column prior_state text,
  add column reason_code text,
  add column version_group_id uuid,
  add column version_no integer,
  add column replaces_id uuid references public.biochemistry_test_uploads(id) on delete restrict,
  add column replaced_by_id uuid references public.biochemistry_test_uploads(id) on delete restrict,
  add column acknowledgement_at timestamptz,
  add column available_at timestamptz,
  add column restore_until timestamptz,
  add column purge_eligible_at timestamptz,
  add column reconciliation_attempts smallint not null default 0,
  add column reconciled_at timestamptz,
  add column scanner_name text, add column scanner_version text, add column scan_outcome text,
  add column sanitiser_name text, add column sanitiser_version text,
  add column sanitisation_outcome text;

-- Perform the exact inventory-approved mappings described above, then enforce:
alter table public.biochemistry_test_uploads
  alter column stable_id set not null,
  alter column display_name set not null,
  alter column extension set not null,
  alter column declared_mime set not null,
  alter column state set default 'initiated', alter column state set not null,
  alter column version_group_id set not null,
  alter column version_no set default 1, alter column version_no set not null,
  add constraint uploads_test_horse_stable_fk
    foreign key (test_id, horse_id, stable_id)
    references public.biochemistry_tests(id, horse_id, stable_id) on delete cascade,
  add constraint uploads_category_check check (file_category in ('jpeg','png','pdf','csv')),
  add constraint uploads_size_check check (size_bytes between 1 and 5242880),
  add constraint uploads_version_check check (version_no > 0),
  add constraint uploads_state_check check (state in
    ('initiated','upload_pending','uploaded_unverified','legacy_unverified',
     'validation_failed','scan_pending','sanitisation_pending','available','blocked',
     'failed','soft_deleted','restore_pending','purge_pending','purged','object_missing')),
  add constraint uploads_hash_check check (sha256_hex is null or sha256_hex ~ '^[0-9a-f]{64}$'),
  add constraint uploads_object_pair_check check ((bucket_id is null) = (object_key is null)),
  add constraint uploads_available_check check
    (state <> 'available' or (bucket_id is not null and object_key is not null and
      detected_mime is not null and sha256_hex is not null and available_at is not null and
      scan_outcome = 'clean' and sanitisation_outcome = 'passed')),
  add constraint uploads_deleted_check check
    ((state not in ('soft_deleted','restore_pending','purge_pending','purged')) or deleted_at is not null);

create unique index uploads_object_key_uq on public.biochemistry_test_uploads(bucket_id, object_key)
  where object_key is not null;
create unique index uploads_version_uq on public.biochemistry_test_uploads(version_group_id, version_no);
create index uploads_scope_state_ix on public.biochemistry_test_uploads(stable_id, horse_id, test_id, state);
create index uploads_reconcile_ix on public.biochemistry_test_uploads(state, created_at);

create table public.evidence_upload_attempts (
  id uuid primary key default gen_random_uuid(),
  idempotency_key_hash text not null,
  user_id uuid not null references public.users(id) on delete cascade,
  test_id uuid not null, horse_id uuid not null, stable_id uuid not null,
  upload_id uuid not null references public.biochemistry_test_uploads(id) on delete cascade,
  bucket_id text not null, object_key text not null,
  declared_name text not null, declared_mime text not null,
  declared_bytes integer not null check (declared_bytes between 1 and 5242880),
  reserved_bytes integer not null check (reserved_bytes = declared_bytes),
  state text not null check (state in ('active','completed','cancelled','expired','failed')),
  created_at timestamptz not null default now(), expires_at timestamptz not null,
  unique (user_id, idempotency_key_hash), unique (bucket_id, object_key),
  foreign key (test_id, horse_id, stable_id)
    references public.biochemistry_tests(id, horse_id, stable_id) on delete cascade
);

create table public.evidence_csv_registry (
  id uuid primary key default gen_random_uuid(), source_name text not null,
  template_id text not null, version text not null, ordered_schema jsonb not null,
  formula_policy text not null, enabled boolean not null default false,
  approved_by_user_id uuid references public.users(id) on delete set null,
  approved_at timestamptz, unique(source_name, template_id, version)
);
alter table public.biochemistry_test_uploads add constraint uploads_csv_registry_fk
  foreign key (csv_registry_id) references public.evidence_csv_registry(id) on delete restrict;

create table public.evidence_holds (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.biochemistry_test_uploads(id) on delete cascade,
  reason_code text not null, owner_user_id uuid not null references public.users(id) on delete restrict,
  starts_at timestamptz not null default now(), review_at timestamptz not null,
  released_at timestamptz, released_by_user_id uuid references public.users(id) on delete restrict,
  check ((released_at is null) = (released_by_user_id is null))
);

create table public.evidence_audit_events (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid references public.biochemistry_test_uploads(id) on delete set null,
  stable_id uuid references public.stables(id) on delete set null,
  horse_id uuid references public.horses(id) on delete set null,
  test_id uuid references public.biochemistry_tests(id) on delete set null,
  event_type text not null, actor_user_id uuid references public.users(id) on delete set null,
  role_snapshot text, outcome text not null, reason_code text,
  occurred_at timestamptz not null default now(), correlation_id uuid
);
```

`version_group_id` is the stable lineage identity. The first legacy or new version uses its own upload `id`; every replacement copies the predecessor's `version_group_id`, obtains `max(version_no)+1` under the same test advisory lock, and links both directions. The unique index prevents forks at one version number. Triggers/RPCs reject cross-test lineage, self-links, cycles, a predecessor already replaced, mismatched bidirectional links, and changes to lineage/version/object identity after insert. A deferred constraint trigger checks `csv_registry_id is not null` only for CSV and null otherwise, extension/declared/detected MIME agreement, lifecycle timestamp consistency, and hold/purge exclusion. Direct table writes remain denied except through the scoped routines.

### 3.3 Exact quota and replacement accounting

One transaction-scoped advisory lock keyed by `test_id` serializes initiation, finalisation, cancellation, expiry, replacement cutover, restore and purge accounting. Count/bytes include evidence states `upload_pending`, `uploaded_unverified`, `legacy_unverified`, `scan_pending`, `sanitisation_pending`, `available`, `blocked`, `soft_deleted`, `restore_pending`, `purge_pending`, `object_missing`, plus unexpired `active` attempts not already represented by their upload row. The sole exception is a `soft_deleted` predecessor whose `replaced_by_id` points to an `available` successor in the same lineage: its recovery copy is excluded from the active 10-file/30-MiB quota but remains governed by the 30-day restore/purge lifecycle. `initiated` is represented by its active attempt and counted once. `validation_failed`, `failed` and expired/cancelled attempts cease counting only after object absence/compensation is confirmed; until then they count as temporary occupied capacity. `purged` never counts.

Ordinary new upload requires resulting count ≤10 and bytes ≤30 MiB using declared/reserved bytes at initiation and authoritative bytes at finalisation. Replacement is atomic-capacity-neutral for active product quota: under the lock it reserves one temporary replacement slot outside the ordinary 10/30 MiB limit, limited to one active replacement per predecessor/test and still capped at 5 MiB. The predecessor continues to count and remains available. If the successor fails, it is compensated and the predecessor is unchanged. Only when the successor reaches `available` does one transaction set the bidirectional links, mark the predecessor `soft_deleted`, release the temporary slot, exclude that linked predecessor recovery copy, and count the successor as the lineage's active version. A restore request for a replaced predecessor cannot create two active versions: Administrator restoration must first retire the successor in the same atomic transaction or deny the request. Ordinary soft-deleted evidence without a successful replacement link continues counting until `purged`, preventing deletion from being used to evade limits.

## 4. Storage Contract

Bucket: private, public access off, allowed MIME list set to the approved enabled types, file ceiling 5 MiB, no overwrite. Key format: `v1/{random-uuid}/{random-uuid}`. It contains no filename, stable, horse, test, user or email. Database scope is authority; prefixes are not.

Storage policies allow authenticated `INSERT` only for the exact live intent, actor and key. Ordinary clients receive no bucket `SELECT`, list, update or delete policy. Server-only finalisation, signing, compensation and reconciliation use narrow application routines; use of the elevated credential must still check operation scope, expected state and audit. Object existence is never returned to an unauthorised actor. Errors use uniform not-found/denied wording.

Primary metadata and object storage must be verified as Supabase Sydney `ap-southeast-2` before any Australian-storage claim. `ap-southeast-1` is Singapore and fails the gate. Repository/config inference is insufficient: an authorised operator must inspect the actual project region and retain sanitised evidence. Provider contract, subprocessors, overseas personnel access and notices must also be reviewed. Supabase database backups exclude Storage bytes; separate encrypted Storage-object backup, recovery, expiry and restoration-agreement evidence is mandatory before production.

## 5. Lifecycle State Machine

| State | Object / metadata | Visible | Entry and next step | Timeout/recovery |
|---|---|---:|---|---|
| `initiated` | absent / attempt+reservation | no | server initiation → `upload_pending` | expires at 24h; release reservation |
| `upload_pending` | absent or arriving / reserved | no | browser upload → finalise | cancel/expiry; reconcile |
| `uploaded_unverified` | expected / reserved | no | server verifies agreement | retry 3 times; mismatch → `validation_failed` |
| `legacy_unverified` | legacy object not yet authoritatively mapped / backfilled scope | no | controlled legacy verification only | never auto-available; reconcile or governed remediation |
| `validation_failed` | temporary / reason | no | invalid type/size/content | compensate; purge by 24h |
| `scan_pending` | expected / verified | no | approved adapter scan | bounded retry; timeout → `blocked` |
| `sanitisation_pending` | expected / scan clean | no | approved adapter sanitise/verify | bounded retry; failure → `blocked` |
| `available` | required / complete | yes to authorised roles | view/download/replace/delete | missing object → `object_missing` |
| `blocked` | quarantined/private / safe reason | no | admin metadata review only | purge temporary by 24h unless hold/incident need documented |
| `failed` | absent preferred / reason | no | terminal processing failure | safe user retry creates new attempt |
| `soft_deleted` | retained / concealed | no ordinary access | restore request or purge | restore for 30 days; hold suspends purge |
| `restore_pending` | retained / request | no | Admin rechecks and restores | approve → prior safe state; deny audited |
| `purge_pending` | expected / tombstone pending | no | designated purge operator | object delete then metadata minimisation; retry/reconcile |
| `purged` | absent / minimal audit only | no | terminal | backup must never reactivate |
| `object_missing` | absent / unavailable | no | reconciliation/restore investigation | bounded retry, then Admin alert |

Only server routines transition state. Each transition records event, actor/role (or `system`), outcome, safe reason and correlation ID. Retries use a proposed maximum of three attempts with bounded exponential backoff and jitter within function duration; a later invocation resumes by durable state. `legacy_unverified` may enter safety processing only after exact object mapping, authoritative metadata/signature/hash validation and acknowledgement disposition are recorded; it cannot transition directly to `available`. There is no unsafe-content preview.

## 6. Validation And Safety

Normalise display filenames to a short printable basename, remove path/control characters, and never use it as a key. Require extension/declared MIME/detected signature agreement. Authoritative streamed length must be 1–5,242,880 bytes. Reject polyglots where reliably detectable, malformed structures, archives, executable/script/Office/audio/video/SVG/unknown content, encrypted/password PDFs, PDF JavaScript, launch actions, embedded files and unsupported active content. Messages disclose the failed rule, not scanner internals.

CSV remains disabled. The registry requires an approved source, template ID, version, exact ordered columns, types/formats, encoding/delimiter/header rules, row/field limits and a formula-like-value rule/fixture. Unknown schemas fail. CSV never changes readings/scores automatically.

Image sanitisation remains a fail-closed adapter: remove GPS, device IDs, author/edit history and hidden thumbnails while preserving orientation and visible pixels; accept only a byte-preserving metadata operation or separately proven approved transform. PDF handling validates/rejects unsafe features; it does not promise generic rewriting. Scanner and sanitiser provider/library selection is deferred. No production-like availability is possible until both approved adapters succeed.

## 7. Idempotency, Duplicates, Compensation And Reconciliation

Store only an HMAC/hash of the user-provided idempotency key. Uniqueness is actor+key for 24 hours; replay returns the same safe status/result. SHA-256 is computed in trusted processing. Same hash in authorised test scope prompts an intentional-duplicate confirmation; confirmation creates a new immutable object/version. Hash is not exposed or logged.

Partial failure rules: metadata without object releases reservation and becomes failed/missing; object without valid metadata is quarantined and deleted by 24 hours; finalisation failure never exposes; audit failure rolls back the transition; replacement failure leaves predecessor unchanged; purge object-delete failure leaves `purge_pending`; purge metadata completion occurs only after absence is verified.

Daily reconciliation uses a production-only Vercel Cron UTC schedule. The route accepts only `Authorization: Bearer <CRON_SECRET>` using constant-time comparison and a server-only secret. It takes a database-backed advisory/lease lock with owner token and expiry; a concurrent invocation exits safely. Work is bounded by row count and time budget, ordered by durable cursor, idempotent per state/action and commits progress per item. Duplicate/overlapping invocations are harmless. Because Vercel Cron has no automatic retry guarantee, unfinished/error work remains durably eligible for the next run and repeated failures alert an Administrator. The route stops before function-duration margin. It never lists bucket-wide on a user's behalf and never returns object detail. `SUPABASE_SERVICE_ROLE_KEY` may be used only server-side; every item still requires reconciliation scope, expected-state, age/hold and audit checks.

## 8. Retention, Restore, Holds, Purge And Requests

Aprec8's Privacy Officer or delegated authorised Administrator performs a quarterly retention review and records reviewer, start/end, scope, counts, exceptions and next date. Soft deletion is immediate concealment. Trainer may request restoration; only an authorised Administrator executes it within 30 days. Holds may be created/released only by an authorised Administrator and require safe reason, owner, start and review date. Active holds override purge.

Purge requires separately assigned `evidence.purge`; Administrator role alone is insufficient. The server routine verifies active designation, eligibility, age, no hold, reason and audit, deletes bytes, verifies absence, then reduces metadata to a non-content audit tombstone. Backups expire under their agreement and cannot silently reactivate deleted/purged evidence. Verified access/correction/export requests go through the nominated privacy process; only an authorised Administrator exports, with safe request/decision/export audit.

## 9. Audit, Logs, Incident And Privacy

Events: upload requested/succeeded/failed/blocked, validation, scan, sanitisation, view, download, replacement, soft-delete, restore requested/executed/denied, purge, hold create/release, authorisation denial, duplicate confirmation, orphan detect/cleanup, reconciliation and export/correction. Safe fields are opaque record IDs, scoped entity IDs, actor ID and role snapshot, timestamp, outcome, reason and correlation ID. Full history is Administrator-only; Trainers see a filtered activity summary for currently authorised horses; others have no raw audit access.

Never store contents, signed URLs, secrets, credentials, raw object keys, unnecessary filenames/personal data, hash values, stripped metadata or private payloads in audit, logs, metrics, errors, screenshots or repository files. Metrics are counts, durations and reason classes. Incident detection routes operationally to `equineprecisionperformance@hotmail.com`: urgent internal acknowledgement within four business hours, immediate containment, initial privacy-owner assessment within 24 hours, and management/legal/security escalation where information may be affected. Notification implementation is out of scope.

## 10. UI And Accessibility Contract

Show permitted types/limits/purpose/privacy guidance and the exact unchecked acknowledgement: “I confirm that I am authorised to upload this evidence and that it is relevant to this test.” Disable initiation until checked. Provide keyboard-operable selection/cancel/retry/duplicate-confirm/delete/restore actions; programmatic labels and error association; focus to the error summary; `aria-live` polite status and assertive actionable errors; non-colour icons/text; 200% zoom/reflow; reduced motion; mobile touch targets; and no time-only instruction.

Copy distinguishes selecting, uploading, checking safety, available, blocked, failed, missing, deleted and restore-requested. Slow/offline flow preserves safe retry identity, never claims success early, and explains pending checks. Quarantine copy never reveals scanner detail or offers preview. Empty, count/aggregate/type/size/CSV-disabled, permission-denied and expired-download states have explicit text.

## 11. Proposed Future Action Contracts (Unimplemented)

- `initiateEvidenceUpload(input)` → attempt ID, opaque upload tuple, expiry; fresh auth, acknowledgement and quota lock.
- `finaliseEvidenceUpload(attemptId)` → safe lifecycle status; fresh auth and authoritative object checks.
- `cancelEvidenceUpload(attemptId)` → best-effort compensation.
- `listTestEvidence(testId)` → authorised, non-deleted safe metadata only.
- `requestEvidenceDownload(uploadId)` → ephemeral 60-second URL after fresh auth.
- `replaceEvidence(uploadId, input)` → new attempt/version; predecessor unchanged until success.
- `softDeleteEvidence(uploadId)`, `requestEvidenceRestore(uploadId)`, `executeEvidenceRestore(uploadId)`.
- `createEvidenceHold`, `releaseEvidenceHold`, `purgeEvidence` with explicit permissions.
- `GET /api/internal/evidence/reconcile` → Cron-authenticated, locked, bounded, opaque summary only.

All use generic denials and rate limits. None exists in Sprint 023D.

## 12. Sprint 023E Local Implementation/Proof Handoff

Proposed narrow set: future migration `0018`; evidence domain/state/validation modules; server-only repository and safety adapter interfaces; upload/finalise/list/download/lifecycle actions; Cron route; evidence UI component/styles; Storage policy documentation/local fixtures; focused unit/integration/accessibility tests; required planning updates. Exact repository paths must be confirmed before the 023E pack; no file is authorised by this section.

Synthetic fixtures contain generated non-personal JPEG/PNG/PDF, malformed/encrypted/active PDFs, misleading extensions/MIMEs, limit edges, disabled/unknown CSV, duplicates, all roles/scopes, revocation, deletion/hold/purge, object-only/metadata-only, race and Cron overlap cases. Local proof covers transition completeness, quota concurrency, idempotent replay, no overwrite, permission agreement, 60-second signing, safety fail-closed, compensation, logging redaction, accessibility, typecheck/lint/build and secret scan. Production/provider proof, bucket/migration/policy application, actual region, backups, scanner and secrets remain Sprint 023F or later.

Stop 023E if a provider/dependency is needed, actual schema names invalidate the narrow model, migration ledger is not exactly ready for `0018`, a remote action is required, or a privacy/role decision would expand.

## 13. Decision Traceability

| 023C decision | Design sections |
|---|---|
| 1–3 types, limits, CSV | 1, 3, 6 |
| 4–6 privacy, purpose, rights | 1, 9, 10 |
| 7–8 roles and assignment | 1, 11; permission agreement review |
| 9–10 retention/lifecycle | 5, 8 |
| 11 audit | 5, 9 |
| 12 region | 4 |
| 13 private delivery | 2, 4, 11 |
| 14–15 safety/metadata | 5–6 |
| 16 duplicates/replacement | 3, 7 |
| 17 reconciliation | 5, 7 |
| 18 backups/requests | 4, 8 |
| 19 acknowledgement | 2, 10 |
| 20 incidents | 9 |

## 14. Remaining Manual Interventions

### Actual region/provider/backup proof

- **Blocked:** Australian-storage and recovery-readiness claims.
- **Evidence checked:** Sydney is `ap-southeast-2`; `ap-southeast-1` is Singapore; database backups exclude Storage object bytes. No remote inspection was authorised.
- **Required action:** before production, an authorised operator verifies the actual project is `ap-southeast-2`, reviews provider/subprocessor/overseas-access terms, and supplies Storage-object backup/recovery/restoration-agreement evidence. If it is `ap-southeast-1`, stop for a region/provider decision.
- **Steps:** inspect the project region without exposing credentials; retain a sanitised screenshot/export; obtain and approve contract and object-recovery evidence; record owner/date/result.
- **Builder verification:** match region evidence to the intended project, confirm Australia, confirm object bytes and restore/expiry behaviour are covered, and retain a redacted proof record.

### CSV and safety implementations

- **Blocked:** CSV enablement and production-like scan/sanitisation availability.
- **Evidence checked:** no governed CSV template and no approved scanner/sanitiser dependency/provider currently exist; Aprec8 approved fail-closed deferral.
- **Required action:** supply approved CSV registry inputs and separately approve any scanner/sanitiser library, service, processor, hosting component and secret.
- **Steps:** provide source/template/version/schema/formula fixtures; evaluate dependency/provider security, privacy, licence, region and cost; approve the boundary; provide protected configuration outside Git.
- **Builder verification:** validate fixtures and registry versioning, prove unsafe/unavailable states, verify no unapproved transfer/secret, and run adapter contract tests before availability.

## 15. Official Platform Sources

Accessed 28 July 2026: Supabase official Storage standard uploads, resumable uploads, access control/RLS, private buckets, signed upload URLs, regions and backups documentation; Vercel official Functions limits and Cron documentation; OAIC official data-breach response guidance. Platform claims must be rechecked at implementation time because limits and service behaviour may change.
