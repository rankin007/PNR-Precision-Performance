# Architect Pack - Sprint 033B Operational Ownership, Incident And Restoration Readiness

Created: 2026-08-12
Workflow profile: strict
Flight class: critical
Execution boundary: local operational authority, runbooks, synthetic non-production rehearsal, tests and evidence only

This Pack creates one strict Builder sprint. It does not apply itself, access or mutate Production, contact a provider, read secrets or protected records, restore a hosted database, change schema/RLS/roles, deploy, stage, commit or push.

============================================================
FILE: planning/sprints/033B-operational-ownership-incident-and-restoration-readiness/requirements.md
============================================================

# Sprint 033B Requirements

## Outcome

Turn the role-only operations handoff into a named, executable local operating contract for support, privacy requests, incident response, access correction, release control and separate database/Storage recovery, without accessing or mutating Production.

Successful local outcome: `operational-owners-and-synthetic-restoration-rehearsal-complete-clean`.

This strengthens O08-O10 and L08-L09 only within a local operational-readiness limitation. It does not prove provider-native backup restoration, Production recovery, legal review, representative customer acceptance, remote migration readiness or Product-wide Done.

## Named authority

Approved by the user on 2026-08-12:

- Phillip Norman Rankin, Director of Aprec8 Pty Ltd, is accountable business, support, privacy and incident owner.
- Randell Rankin is the platform, migration, release and recovery operator.
- Phillip Norman Rankin and Randell Rankin jointly approve rollback and restoration decisions.
- Historical Aprec8 records referring to `Philip Rankin` in this ownership context refer to the same person; new 033B records use `Phillip Norman Rankin` without rewriting historical evidence.
- The monitored privacy/incident address remains `equineprecisionperformance@hotmail.com` under Sprint 023C.

## Recovery objectives and cadence

- Recovery point objective: at most 24 hours of covered operational-record data loss once the relevant capability is live.
- Recovery time objective: restore the covered service within one business day after a recovery decision, subject to provider availability and verified compatibility.
- Rehearse quarterly, before first sensitive-data launch, and after a material schema or Storage recovery change.
- Database logical recovery and Storage-object recovery are separate. Database backup never implies restoration of object bytes.
- Rollback must reconcile application source, five aliases and the compatible three-binding Production projection together; historical alias-only rollback is insufficient.
- Provider-native backup facts, hosted restore access, account recovery/MFA and Production execution remain unproven until separately verified.

## Support, privacy and incident contract

- Support records route, time, browser/device, expected/actual behavior, reproducibility and a redacted artifact without requesting raw protected data.
- Access correction uses existing Admin/RLS contracts only; no manual database bypass, service-role workaround or permission widening.
- Privacy access/correction requests use the monitored address, require identity and authority verification, use a safe request ledger and target completion within 30 calendar days. Refusal or delay requires an owner decision and appropriate written explanation. This is operational guidance, not legal advice.
- Urgent privacy incidents are acknowledged internally within four business hours; containment begins immediately; the privacy-owner assessment begins within 24 hours.
- Incident flow is contain, assess, notify when required, and review. The incident owner decides escalation to management, legal, security, affected people and the OAIC under applicable obligations.
- These are internal objectives, not public service-level guarantees. No new public promise or contact channel is created.

## Synthetic rehearsal boundary

Use obvious synthetic records and objects only. The executable rehearsal must:

1. construct a versioned logical database export with related tables, primary/foreign keys, row counts and migration-head marker;
2. construct separate synthetic Storage objects/metadata with traversal-free relative paths and SHA-256 hashes;
3. package database and Storage inventories separately; authenticated-encrypt each package with AES-256-GCM, one process-only key and a separately generated fresh 12-byte IV; reject an injected IV reuse/collision before encryption or restore; require the database and Storage IVs to be distinct; persist or report neither key nor IV; and zero the owned key buffer in `finally` without claiming that every native/runtime copy is erased;
4. remove the working source, restore to a distinct isolated temporary location, validate counts, relationships, versions, paths and hashes, and prove elapsed time is inside the RTO objective;
5. reject corrupted ciphertext, wrong key/tag, injected IV reuse/collision, missing/extra rows or objects, broken relationships, unexpected migration head, traversal, absolute paths and manifest/payload disagreement;
6. clean source, encrypted, restored and key material on success and controlled failure; and
7. write aggregate/synthetic evidence only, with no real identifiers, credentials, provider values, object paths or payloads.

If a local PostgreSQL engine is available without download, network, provider access or unsafe host mutation, Builder may add ephemeral engine-backed proof. It is not mandatory. Docker/psql absence never authorises remote access. The required claim is synthetic logical recovery readiness with an explicit provider-native limitation.

## Required reconciliation

- Reconcile `docs/OPERATIONS_HANDOFF.md` with owners, objectives, current Sprint 036L compatibility and limitations.
- Reconcile the non-secret delivery/operator register without authentication material or false MFA/recovery verification.
- Reconcile `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`: named/local rehearsal no longer wholly absent; provider-native/Production restore stays open.
- Reconcile the repository migration ledger through local candidate migrations `0024` and `0025` without claiming remote application.
- Reconcile `scripts/validate-supabase-clean-rebuild-020G.ps1` only where its registered success output must state exact local `0001`-`0025` alignment and that no applied or remote status was inspected.
- Preserve Sprint 023C privacy/lifecycle authority and the Sprint 023K Singapore/international-processing amendment; never restore the superseded Australian-only claim.

## Task contract

### objective

Name accountable operators and prove a privacy-safe synthetic non-production support, incident and separate database/Storage recovery rehearsal with exact limitations.

### owns

Builder may create or edit only:

- `docs/OPERATIONAL_OWNERSHIP_INCIDENT_AND_RESTORATION_033B.md` (new);
- `docs/OPERATIONS_HANDOFF.md`;
- `docs/change password.md` only for non-secret owner/custodian/recovery-role reconciliation;
- `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`;
- `scripts/lib/migration-ledger-validation.ps1` only to recognise the exact local chain through `0025` while distinguishing local from remote;
- `scripts/validate-supabase-clean-rebuild-020G.ps1` only to reconcile its registered success diagnostic with exact local `0001`-`0025` and remote-uninspected truth;
- `scripts/operational-readiness-033B.mjs` (new pure module);
- `scripts/rehearse-operational-restoration-033B.mjs` (new);
- `scripts/test-operational-readiness-033B.mjs` (new);
- `scripts/test-migration-ledger-033B.mjs` (new);
- `scripts/run-validation-suite.mjs` and `package.json` only for focused registration;
- synthetic evidence beneath `evidence/professional-engineering/033B-operational-ownership-incident-and-restoration-readiness/`;
- `planning/reviews/033B-operational-ownership-incident-and-restoration-readiness.md`;
- applied sprint files/acceptance annotations and mandatory closeout entries in `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DEFINITION_OF_DONE.md`, `planning/ROADMAP.md`, `planning/SPRINT_SCHEDULE.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md` and `delivery_road_map.md`.

Builder returns an exact no-edit plan before implementation. Optional owned files may remain untouched when current source already satisfies the contract.

### must_not

Do not use real customer/horse/stable/Auth/payment/enquiry/evidence data; inspect/export secrets/provider values; access or mutate Supabase/Vercel/GitHub/registrar/Stripe/email/provider state; create a remote project; restore Production; change Product/schema/migrations/RLS/roles/permissions/dependencies/lockfile; weaken access; publish an SLA; send email; submit an enquiry; deploy; stage, commit, push, merge or open a PR; delete user or historical recovery material.

### acceptance

AC-01 through AC-40 pass. Wrong ownership, protected-data/secret exposure, remote effect, destructive ambiguity, false provider/Production restoration claim, integrity bypass, permission widening, migration reinterpretation or cleanup failure is a material stop.

### verification

Run exact counted operational/migration assertions, executable synthetic success/failure/cleanup rehearsal, retained role/privacy/migration/static/JSON gates, applicable type/lint/build, fresh critical inspection and final `0/0/0` staged/external/residue proof.

## Evidence-Proportional Execution Standard

Stop only for a material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup risk. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep in-scope harness/validator/reporter/formatting/encoding corrections inside 033B. Do not create a follow-up solely for Docker, PostgreSQL CLI, browser, renderer, clipboard, schema dump or optional CLI unavailability. Manual intervention is last, after safe local alternatives. If genuinely required, record the blocked fact, checked evidence, exact minimal action, steps and follow-up verification. Never request credentials, recovery codes, private records or unrestricted provider output.

============================================================
FILE: planning/sprints/033B-operational-ownership-incident-and-restoration-readiness/blueprint.md
============================================================

# Sprint 033B Blueprint

## Flight evidence

- Class: `critical`; privacy incidents, access correction, rollback and restoration can expose protected information or corrupt recovery state.
- Invariant: every procedure names an owner, preserves least privilege/privacy-safe evidence, separates database from Storage recovery, fails closed on mismatch and leaves zero rehearsal residue/external effect.
- Trace: approved owner/objective contract -> durable runbook -> pure executable scenario/recovery contract -> encrypted synthetic artifacts -> isolated restore -> integrity/relationship/cleanup verdict -> sanitized evidence/readiness ledgers.
- Negative path: unverified privacy requester, Admin/RLS bypass, P0 copied into chat, alias-only rollback, database-only restore called Storage recovery, corrupted ciphertext, injected database/Storage IV reuse or collision, manifest drift, traversal or residue must fail.
- Ownership fixture: support is Phillip Norman Rankin; platform restore operation is Randell Rankin; rollback/restoration approval requires both. Role-only or single-owner implementations fail.
- Recovery fixture: three related tables and two separate objects restore with exact counts/relationships/hashes under distinct fresh 12-byte database and Storage IVs; forced IV reuse, the same byte total with a changed object, or a broken foreign key fails.
- Migration fixture: exact local chain `0001`-`0025`; stopping at `0023`, duplicate `0024`, or claiming `0024/0025` remote fails. The registered clean-rebuild validator output must also state exact local `0001`-`0025` and remote-uninspected truth.
- Git baseline: HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, branch `codex/025B-versioned-domain-authority-package`, staged `0`, modified tracked `64`, untracked `372` before packing; preserve unrelated work.
- Authority: Sprint 023C supplies Phillip Norman Rankin's privacy/incident authority, address and 4-hour/24-hour targets; Sprint 020G records Randell Rankin and the same Aprec8 owner as joint administration/maintenance/rollback owners; Sprint 036L supplies current five-alias/three-binding compatibility truth.
- Official guidance checked 2026-08-12: OAIC breach response is contain, assess, notify if required, review; APP access/correction guidance uses a reasonable period generally not exceeding 30 days. This sprint is not legal advice.
- Tool fact: Docker CLI exists but no engine responded; standalone `psql`/`pg_dump`/`pg_restore` are absent; remote Supabase is prohibited. Require executable synthetic logical rehearsal and truthful provider-native limitation.
- Uncertainty: private MFA/recovery access, provider-native backups, hosted restore permissions, Production duration, legal/customer acceptance and Production runtime are unverified and cannot be inferred.

## Implementation sequence

1. Dry-run/apply Pack, reread four files, verify canonical/Git baseline.
2. Read operations/access/privacy-region/live-compatibility/migration/acceptance authority.
3. Return exact no-edit critical Builder plan, arithmetic, fixtures, cleanup, closeout and Pack corrections; fresh review before implementation.
4. Write one responsibility/runbook contract for support/access/privacy/incident/severity/escalation/RPO/RTO/cadence/rollback/database/Storage.
5. Reconcile operations/access/deferred records without secrets, provider change or false verification.
6. Implement pure operational and recovery module with injected clock/paths/random material for deterministic tests; generate a fresh 12-byte IV independently for database and Storage, reject an injected collision before encryption/restore, and zero only the owned process-key buffer without claiming total runtime erasure.
7. Prove success plus IV distinctness, forced IV reuse/collision refusal, corruption, wrong-key/tag, missing/extra data, broken relation, version drift, unsafe path and cleanup failures.
8. Reconcile the migration-ledger validator and registered clean-rebuild success output through exact local `0025`, retaining remote-uninspected truth.
9. Record aggregate evidence only: counts, durations, algorithm classes, outcomes and cleanup; no keys/ciphertext/payload/provider/private identifiers.
10. Run focused/retained checks and fresh critical inspection.
11. Close only after PASS. L04 stays deferred; L09 limited; O08/O10/L08 strengthen only to named/local rehearsal. Provider-native/Production restore, 036K, representative acceptance and Done remain open.

## Critical plan review questions

1. Are owner assignments exact without rewriting historical spelling?
2. Can tests/evidence contain any real identifier, secret, provider output, raw path or payload?
3. Are database logical data and Storage objects proved separately with relationships and hashes?
4. Do corruption, incomplete/extra data, wrong version and unsafe paths fail?
5. Is cleanup zero after success and each controlled failure?
6. Are RPO/RTO/cadence internal objectives, not public/provider guarantees?
7. Does rollback require source/alias/binding compatibility?
8. Does migration proof separate local `0024/0025` from remote status?
9. Do private provider access, Production restore, legal/customer acceptance and Done remain open?

## Critical plan finding ledger

| ID | Phase / review | Severity | Signature | Concrete evidence and required correction | Status |
| --- | --- | --- | --- | --- | --- |
| PLAN-001 | Plan / 1 | blocking | AC-31; shared ledger validator -> registered clean-rebuild output; stale local-head diagnostic | The first plan changed the shared ledger authority without owning or asserting the registered consumer's success output. Add its narrow output reconciliation and a registered-output assertion. | resolved in amended Pack before review 2 |
| PLAN-002 | Plan / 1 | blocking | AC-23/AC-25; package encryption -> database/Storage IVs; nonce reuse | The first plan did not require distinct fresh 12-byte AES-GCM IVs or a discriminating forced-reuse failure. Add pre-encryption collision refusal, distinctness/reuse tests and precise owned-key-buffer cleanup language. | resolved in amended Pack before review 2 |

## Acceptable outcomes

- `operational-owners-and-synthetic-restoration-rehearsal-complete-clean`
- `operational-authority-conflict-blocked-clean`
- `synthetic-restoration-integrity-failed-clean`
- `privacy-or-cleanup-boundary-failed-contained`
- `local-validation-failed-clean`
- `critical-inspection-failed-clean`
- `blocked-clean`

============================================================
FILE: planning/sprints/033B-operational-ownership-incident-and-restoration-readiness/acceptance.md
============================================================

# Sprint 033B Acceptance

Builder annotates every criterion `pass`, `fail` or `not-run` with evidence.

| ID | Criterion | Required proof |
| --- | --- | --- |
| AC-01 | Canonical/Git baseline and unrelated work recorded/preserved. | Command/status ledger. |
| AC-02 | Pack produces exactly four traversal-free files, reread. | Import/hashes. |
| AC-03 | Fresh exact critical plan review passes before implementation. | Plan ledger. |
| AC-04 | Phillip Norman Rankin named business/support/privacy/incident owner. | Contract assertions. |
| AC-05 | Randell Rankin named platform/migration/release/recovery operator. | Contract assertions. |
| AC-06 | Rollback/restoration approval requires both named people. | Matrix/scenarios. |
| AC-07 | Historical `Philip` evidence unchanged; new records canonical. | Diff/source. |
| AC-08 | Monitored address exact; no new public channel. | Assertions. |
| AC-09 | Support intake uses only approved diagnostic/redacted fields. | Scenarios. |
| AC-10 | Access correction uses Admin/RLS and rejects bypass. | Negative tests. |
| AC-11 | Privacy request requires identity/authority and safe ledger. | Matrix. |
| AC-12 | 30-day target/refusal-delay handling/no legal-advice claim. | Assertions. |
| AC-13 | 4-hour acknowledgement, immediate containment, 24-hour assessment exact. | Timeline tests. |
| AC-14 | Incident order is contain/assess/notify-if-required/review. | Order tests. |
| AC-15 | P0-P3 mapping/ownership complete and non-overlapping. | Table tests. |
| AC-16 | Tickets/chat/evidence prohibit credentials/private data. | Sentinel tests. |
| AC-17 | RPO <=24h and RTO one business day, internal/provider-dependent. | Contract tests. |
| AC-18 | Cadence quarterly/pre-sensitive-launch/post-material-change. | Schedule tests. |
| AC-19 | Database and Storage recovery separate; no implied object recovery. | Discriminating tests. |
| AC-20 | Rollback requires compatible source/five aliases/three bindings. | Scenarios. |
| AC-21 | Logical export has versions/tables/PK/FK/counts/migration head. | Rehearsal. |
| AC-22 | Storage inventory has safe relative paths/metadata/SHA-256. | Rehearsal. |
| AC-23 | AES-256-GCM uses one process-only unreported/unpersisted key, separate fresh distinct 12-byte database/Storage IVs, pre-encryption collision refusal and owned-key-buffer zeroing without a total-runtime-erasure claim. | Runtime/residue and discriminating IV tests. |
| AC-24 | Success deletes source, restores isolated, validates all integrity. | Result. |
| AC-25 | Corruption, wrong key/tag and injected IV reuse/collision fail closed. | Adversarial cases. |
| AC-26 | Missing/extra data, broken relationships, version drift fail. | Adversarial cases. |
| AC-27 | Traversal/absolute paths/manifest disagreement fail pre-restore. | Adversarial cases. |
| AC-28 | Success cleanup has zero owned residue. | Cleanup ledger. |
| AC-29 | Every controlled failure cleanup has zero owned residue. | Failure ledger. |
| AC-30 | Evidence is synthetic/aggregate; no protected/provider/key/payload value. | Scan/inspection. |
| AC-31 | Ledger accepts exactly local 0001-0025, rejects drift, labels 0024/25 local-only, and the registered clean-rebuild success output states exact local 0001-0025 with remote status uninspected. | Executable tests and registered-output assertion. |
| AC-32 | No Product/schema/migration/RLS/role/permission/dependency/lock change. | Diff/hashes. |
| AC-33 | No provider/remote/email/enquiry/deploy/Production/backup/restore action. | External zero. |
| AC-34 | Focused operational/migration/rehearsal assertions pass with exact arithmetic. | Commands. |
| AC-35 | Applicable retained role/privacy/static/JSON gates pass or stronger substitute recorded. | Validation. |
| AC-36 | Applicable typecheck/zero-warning lint/build pass. | Quality ledger. |
| AC-37 | Fresh critical inspection passes authority/privacy/cleanup/falsifiability/scope/claims. | Inspection. |
| AC-38 | O08/O10/L08 only strengthen locally; L04/L09/provider/Production/036K/representative/Done limits remain. | Matrix/roadmap. |
| AC-39 | Closeout files agree; staged/external/residue exactly 0/0/0. | Cross-file safety. |
| AC-40 | Report exact user-action ending. | Report inspection. |

PASS requires AC-01 through AC-40. Wrong ownership, protected exposure, remote effect, destructive ambiguity, false restore claim, integrity bypass, permission widening or cleanup failure is a material stop.

End the report exactly with either `I need nothing from you.` or `I need the following from you:` followed by numbered steps and follow-up verification.

============================================================
FILE: planning/sprints/033B-operational-ownership-incident-and-restoration-readiness/handoff-prompt.md
============================================================

# Sprint 033B Builder Handoff

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

## Builder task contract

Objective: name approved operators and prove a privacy-safe synthetic non-production support, incident and separate database/Storage restoration rehearsal.

Owns: only the operational docs, non-secret register/deferred record, migration-ledger validator, the narrow registered clean-rebuild success diagnostic, new 033B pure scripts/tests, synthetic evidence and mandatory closeout named in requirements.

Must not: use real/private/provider data; read/store secrets; contact/mutate providers or Production; restore hosted systems; change Product/schema/migrations/RLS/roles/dependencies; publish guarantees; deploy, stage, commit or push.

Acceptance: AC-01 through AC-40 pass. Result is local operating/synthetic logical recovery readiness only; provider-native/Production recovery, legal/customer acceptance, 036K and Done remain open.

Verification: exact counted owner/scenario/migration/recovery tests, distinct fresh 12-byte database/Storage IV and forced-reuse proof, encrypted synthetic success/adversarial cleanup rehearsal, registered clean-rebuild output proof, retained role/privacy/static/JSON and applicable quality gates, fresh critical inspection and final `0/0/0`.

1. Verify canonical/Git baseline and preserve unrelated work.
2. Apply/reread Pack and authority.
3. Return exact no-edit critical plan/arithmetic/Pack corrections for fresh review.
4. Encode responsibility/operating flows without secrets/public promises.
5. Implement pure deterministic recovery with explicit provider/Production limitations.
6. Prove separation, distinct fresh 12-byte package IVs, pre-encryption reuse/collision refusal, encryption, integrity, relationship/path/version rejection and zero cleanup on success/failure.
7. Reconcile exact local migration ledger and registered clean-rebuild output through 0025 without remote implication.
8. Run checks and fresh inspection.
9. Close only after PASS with limitations intact.
10. End report with exact user-action statement.

Follow Evidence-Proportional Execution. Stop for material target, authority, privacy, destructive, migration, integrity, Production, scope or cleanup risk; substitute equivalent safe proof for supporting tools. Never request credentials or private/provider output.
