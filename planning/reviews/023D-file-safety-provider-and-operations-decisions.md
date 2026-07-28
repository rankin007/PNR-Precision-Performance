# Sprint 023D - File Safety, Provider And Operations Decisions

Date: 2026-07-28
Status: Aprec8 decisions supplied 28 July 2026; implementation dependencies remain deferred

## Recommendations And Trade-offs

### 1. Controlled CSV Registry

**Recommendation:** build the registry/data contract now but keep CSV disabled until Aprec8 supplies at least one approved source name, template identifier, version, required ordered columns, types/formats, and formula-like-value policy test fixture.

- Enabling CSV without inputs contradicts the governing contract.
- Deferral preserves JPEG/PNG/PDF design work and does not invent business data.
- Aprec8 may instead remove CSV from the first implementation, while keeping the schema/register extensible.

### 2. Malware Scanning

**Recommendation:** approve an implementation deferral with a strict scan-adapter interface and fail-closed `safety_pending` state. No file may become `available` in a production-like environment until a scanner/provider is separately approved and returns a successful result. Local Sprint 023E tests use a deterministic fake adapter only.

Alternatives needing separate authority are an external scanning API (new processor, secret, transfer, cost and contract) or a managed/self-hosted ClamAV-style worker (new runtime, operations and update responsibility). No provider is silently selected.

### 3. Image And PDF Sanitisation

**Recommendation:** approve an implementation deferral with fail-closed adapters. Do not claim that generic image re-encoding preserves evidentiary pixels. The future image boundary must remove EXIF/GPS/device data losslessly or prove an approved transformation; PDF handling should reject encrypted/password-protected, malformed, JavaScript-bearing, embedded-file, launch-action, and unsupported active-content documents rather than promise safe rewriting.

Any binary/library/service choice requires later dependency/security/licence/provider review. Until approved, applicable files remain unavailable.

### 4. Retention Review Cadence And Operator

**Recommendation:** quarterly operational review by the Aprec8 Privacy Officer or delegated authorised Administrator, with each run recording reviewer, started/completed timestamps, scope, outcome counts, exceptions and next review date. Annual is lower effort but leaves obsolete identifiable material longer; monthly is stronger but likely disproportionate before volume is known.

### 5. Governed Purge Operator

**Recommendation:** an explicit `evidence.purge` permission assigned only to a designated active Administrator. Administrator role alone is insufficient. Purge uses a server-only action, requires current permission, eligible lifecycle/age, no hold, safe reason, and append-only audit. Two-person approval is an available stronger alternative but adds workflow/schema complexity not required by Sprint 023C.

### 6. Daily Reconciliation Runtime

**Approved amendment:** a production-only Vercel Cron-triggered server route once daily on a UTC schedule, authenticated with Vercel's standard `CRON_SECRET` through exact `Authorization: Bearer` verification. It uses bounded batches, durable cursor/state, idempotent item processing and a database-backed concurrency lock. It must tolerate duplicate and overlapping invocations, absent automatic retries and function-duration limits. It may use the existing server-only elevated Supabase credential, but explicit scope, expected-state, hold/age and audit checks remain mandatory.

This is a design recommendation only. Creating the cron, route or secret is prohibited in Sprint 023D.

### 7. Australian Region And Backup Suitability

**Recommendation:** treat `ap-southeast-2` and evidence-object recovery coverage as hard deployment preconditions, not assumptions. Aprec8/operator must confirm the intended project is actually in Sydney, review provider/subprocessor and overseas-access terms, and obtain evidence-object backup/expiry facts. Supabase's documented database backups exclude Storage objects.

### 8. Configuration Names

**Approved amendment:** reuse `SUPABASE_SERVICE_ROLE_KEY` only in server-only reconciliation code and add only Vercel's `CRON_SECRET`. Do not create `EVIDENCE_RECONCILIATION_SECRET`. Reserve no scanner/sanitiser secret. No evidence-related secret may use `NEXT_PUBLIC_` or enter client bundles, logs, screenshots or repository files.

## Decision Record

Aprec8 accepted recommendations 1–5, accepted 7 with mandatory verification, and amended 6 and 8 as recorded above on 28 July 2026. No provider, dependency, service, secret value or remote action was approved.

## Five-Part Manual Intervention

### What is blocked or unresolved

CSV enablement, production-like scanning/sanitisation, and Australian-storage/recovery claims remain blocked until their approved future evidence is supplied. They do not block closing this fail-closed architecture design.

### Evidence and options checked

- The complete Sprint 023C governing contract and current migration/application conventions.
- Supabase standard/resumable/signed upload, private bucket, RLS, download, region and backup documentation accessed 28 July 2026.
- Vercel Function body limits accessed 28 July 2026.
- Current dependencies contain no scanner, sanitiser, upload-progress or scheduler package.
- No current bucket, policies, jobs, evidence provider, object backup, or controlled-CSV registry exists.

### Exact Aprec8 decision required

Before production: supply the CSV registry, approve scanner/sanitiser boundaries, verify the actual Supabase project is Sydney `ap-southeast-2` (not Singapore `ap-southeast-1`), approve provider/subprocessor suitability, and supply separate Storage-object backup/recovery/restoration-agreement evidence.

### Steps

1. Supply the governed CSV source/template/version/schema/formula fixtures when CSV is to be enabled.
2. Separately approve scanner/sanitiser dependencies or providers after security, privacy, licence, region and cost review.
3. Inspect the intended Supabase project region and retain sanitised proof; stop for a region/provider decision if it is `ap-southeast-1`.
4. Approve provider/subprocessor/overseas-access terms and separate Storage-object backup, recovery, expiry and restoration behaviour.
5. Configure protected values only in the authorised environment; never place values in Git or evidence.

### Builder verification afterward

Builder will update the architecture and permission/lifecycle designs with only the supplied choices; trace all twenty decisions; verify every state/transition and failure recovery; rerun official-source, JSON, diff, scope and non-mutation checks; and close either approved-clean or with the exact remaining blocker. No implementation or remote action will begin.
