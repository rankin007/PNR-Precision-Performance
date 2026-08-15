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
