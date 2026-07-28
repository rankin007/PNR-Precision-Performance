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
