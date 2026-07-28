# Sprint 023J - Provider, Remote Storage, Migration Application And Hosted Proof Requirements

## Role, Profile And Safety Boundary

Builder executes this follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023J files, and executes from those sprint files.

Sprint 023J permits bounded external mutation only in one explicitly identified **non-production** Supabase project and its matching non-production/preview Vercel target after every local, provider, target, backup and commit prerequisite passes. It does not authorize production database migration, production bucket/policy creation, production deployment, production Cron activation, real customer/horse data, public launch or broad infrastructure changes.

The local 023E implementation is intentionally incomplete for hosted use:

- repository code calls `initiate_test_evidence_upload`, `mutate_test_evidence_lifecycle` and `reconcile_test_evidence_batch`, but migration `0018` does not define them;
- migration `0018` does not create the private bucket or executable Storage policies;
- the UI currently prepares a local state only and does not perform the signed/direct transfer protocol; and
- scanner/sanitiser adapters remain deliberately fail closed, while controlled CSV inputs are absent.

Do not apply migration `0018` remotely or deploy the upload UI until those gaps are completed additively, fully validated and committed.

## Mandatory Clean Combined Baseline

Before Pack application, Builder must require one clean local commit containing the reviewed combined Sprint 023E–023I candidate and these reconciled outcomes:

- 023E `local-upload-storage-implementation-proven-clean`;
- 023F `validator-portability-corrected-023E-proven-clean`;
- 023G `clean-rebuild-ledger-aligned-023E-proven-clean`;
- 023H `repository-lint-corrected-combined-local-proof-clean`; and
- 023I `reparse-safe-build-proven-combined-local-proof-clean`.

The commit did not exist when this Pack was created. Builder must not use the uncommitted controlled worktree as a remote-application baseline, commit it implicitly inside 023J, infer a SHA, or apply any remote change. If the user has not separately instructed and received the combined local commit SHA, stop `remote-baseline-commit-blocked-clean` with the Manual Intervention Rule.

After the commit exists:

1. verify exact SHA, ancestry from `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`, clean status and all required paths/outcomes;
2. verify migration ledger is exactly committed `0001`–`0018` and `0018` remains unapplied remotely;
3. create a new isolated branch/worktree `codex/023J-provider-remote-storage-and-hosted-proof` from that exact commit;
4. apply and verify all four Sprint 023J files there; and
5. record hashes, ancestry, clean isolation and source-worktree non-mutation in `planning/reviews/023J-baseline-target-and-authority-gate.md`.

## Named Non-Production Target And Authority Gate

Before accessing or mutating any external service, record without exposing secrets:

1. Aprec8 authority owner name/role/date for this non-production proof;
2. exact Supabase organisation and project reference designated for 023J;
3. explicit classification that it is non-production and contains no customer/production data;
4. exact Vercel team/project and preview/non-production environment mapped to that Supabase project;
5. current Git branch/commit intended for hosted proof;
6. approved operator identity for Supabase migration/Storage and Vercel protected configuration/deployment;
7. confirmation that no production custom domain/alias will be moved;
8. allowed external mutations: candidate migrations `0018–0019`, one private evidence bucket/policies, protected non-production environment variables, one preview/non-production deployment, synthetic fixtures and bounded cleanup;
9. rollback owner and contact path; and
10. incident contact remains `equineprecisionperformance@hotmail.com`.

Do not select a project based only on a local link, cached CLI state, `.vercel` metadata, URL resemblance or remembered name. Cross-check project reference/team/project through two read-only sources where possible. If the target is production, contains real data, is ambiguous, or authority is absent, stop `remote-target-authority-blocked-clean` without mutation.

Never print, store in Git, hash into evidence, screenshot visibly, or quote any secret/token/key. Record presence, scope, last-four only where policy permits, and operator confirmation—not values.

## Provider, Region And Recovery Gate

Before migration or Storage mutation, Builder must recheck current primary official Supabase and Vercel documentation and record access date. At minimum verify:

- Supabase project region is exact approved `ap-southeast-1` Singapore; this is accepted international/overseas processing and must not be described as Australian storage;
- private Storage access is enforced through RLS/policies and bucket configuration;
- database backup coverage is distinct from Storage object-byte recovery;
- current Supabase DPA/subprocessor/overseas-access information has been reviewed by the authorised Aprec8 privacy/data owner;
- Vercel preview/non-production region/data handling and subprocessors are acceptable for this bounded synthetic proof;
- Vercel Cron uses `Authorization: Bearer <CRON_SECRET>`, may overlap/duplicate, and actual scheduled Cron is a production-deployment concern; and
- no Australian-only storage or recovery-readiness claim is made beyond retained evidence.

Aprec8 must supply/approve a non-production Storage-object recovery method and retention/expiry behavior before any evidence object is uploaded, even synthetic. The proof may use an approved export/copy mechanism, but must not add a provider/dependency or copy data overseas without express authority.

Retain sanitised provider/region/recovery evidence in `planning/reviews/023J-provider-region-and-recovery-decision.md` or use the Manual Intervention Rule. If exact `ap-southeast-1` Singapore region, provider suitability or Storage-object recovery is not approved/provable, stop `provider-region-recovery-blocked-clean` before remote mutation.

Real malware scanner and sanitiser selection remains unresolved. This sprint must preserve fail-closed unavailable behavior and cannot claim production-like availability. Controlled CSV remains disabled.

## Read-Only Remote Preflight

Using only the named non-production target, perform read-only checks before local completion or remote apply:

- project identity/region and expected API host;
- migration history exactly `0001`–`0017`, with no `0018+`, failed/repair entry or unknown migration;
- no existing `test-evidence` bucket, conflicting evidence policy/table/function or partial 023E object;
- database contains no real/customer/production data;
- legacy `biochemistry_test_uploads` inventory counts only: total/live/deleted, categories/content types/extensions, size bands, invalid sizes, duplicates, missing references, cross-scope rows, deletion disagreement, ambiguous photo and CSV;
- migration `0018` inventory gate would pass with zero governed discrepancies;
- current roles/helpers/RLS/grants agree with the committed baseline;
- Auth/application/Storage synthetic-fixture counts are zero before proof, or exact authorised pre-existing synthetic objects are classified; and
- rollback/recovery prerequisites are present.

Do not retrieve filenames, object paths, contents, emails, horse/client names or row payloads for the inventory. Use counts and safe identifiers only. Do not run repair/reset/push or mutation during preflight.

If ledger, schema, legacy inventory, collision, data classification or zero-state checks fail, stop `remote-preflight-conflict-blocked-clean`. Do not remediate or delete remotely within this sprint without a new Architect decision.

## Local Hosted-Contract Completion

After baseline/provider/target/preflight gates pass, complete the hosted contract locally and additively.

### Migration `0019`

Create only `supabase/migrations/0019_test_evidence_remote_contract_completion.sql`. Do not edit migrations `0001`–`0018`.

Migration `0019` must implement and test:

- `initiate_test_evidence_upload` with server-derived `auth.uid()`/app-user/role/test/horse/stable authority, acknowledgement, exact category/MIME/size/count/30-MiB quota, idempotency, opaque key agreement, advisory lock and safe return;
- finalisation/cancellation and `mutate_test_evidence_lifecycle` with exact operation allowlist, current authority, expected states, object/metadata checks, fail-closed safety, replacement/restore/hold/purge permissions and audit;
- `reconcile_test_evidence_batch` with bounded rows, database lock/lease, durable state, idempotent compensation and opaque result;
- helpers/RLS/grants required by the 023D permission agreement without broadening existing roles;
- exact `evidence.purge` separately designated permission behavior;
- private bucket creation/configuration for `test-evidence`, 5-MiB maximum and enabled MIME types JPEG/PNG/PDF only; CSV remains disabled;
- authenticated Storage `INSERT` policy only for the exact live actor-owned unexpired attempt/key, no overwrite, expected bucket and permitted content contract;
- no ordinary authenticated Storage list/select/update/delete policy; server-only signing/compensation remains scoped in application code;
- policy/function names unique and idempotent enough to detect partial apply rather than silently replace unknown objects;
- audit events and non-enumerating errors; and
- comments distinguishing candidate repository chain from remote applied status.

Do not add a public bucket, public read, prefix-based authority, client service-role access, permissive `true` policy, CSV bucket MIME, availability bypass, real safety fake or destructive historical migration edit.

### Application completion

Modify only the approved evidence source necessary to implement the selected signed-direct protocol:

- server initiation returns a narrowly scoped upload intent generated by the trusted server/database;
- browser uploads the selected bytes directly to the exact private intent/key with no overwrite;
- finalisation rechecks authoritative object metadata and moves only to an unavailable safety-pending/blocked state because real adapters are absent;
- cancel/retry/slow/offline behavior uses the 24-hour idempotency contract;
- list/download/delete/restore/hold/purge controls remain role/state truthful;
- UI never claims availability and provides no preview/download for unavailable evidence;
- Cron route retains constant-time secret comparison, locking/idempotency and opaque output; and
- no raw key, signed URL, secret, hash, filename or payload enters logs/evidence.

Do not implement a fake hosted scanner/sanitiser or enable CSV. Positive `available`/download proof is deferred until approved real safety adapters exist.

### Local tests and validation

Add focused `0019`, RLS/policy/RPC/action/upload UI and hosted-harness self-tests using synthetic data. Prove positive initiation/transfer-to-unavailable flows and all negative roles/scopes/states; concurrency, idempotency, quota, replacement failure, reconciliation overlap, secret denial and no-overwrite.

Run all 023E–023I focused tests, full maintained validation, TypeScript, full ESLint and reparse-safe production build. Update validators/ledger only as required for exact contiguous candidate `0001–0019`, with adversarial missing/duplicate/`0020+` tests and no remote-applied claim.

## Separate Commit Before Remote Mutation

After local completion passes, Builder must stop `remote-candidate-ready-for-commit` and request a separate local commit instruction. Do not stage/commit without that instruction and do not apply anything remotely from an uncommitted candidate.

After the user instructs the commit, Builder must stage only approved 023J local files, review the manifest/diff, rerun staged integrity checks, commit locally, report the SHA and verify a clean worktree. Only that exact clean SHA may proceed to remote application.

Any later source correction requires a new commit and invalidates prior remote-apply authority until revalidated.

## Remote Application Sequence

Using the named non-production target and exact clean 023J commit:

1. rerun identity, region, ledger, legacy inventory, conflict and zero-state preflight immediately before mutation;
2. capture sanitised pre-apply schema/policy/bucket/function/grant counts and recovery reference;
3. apply only pending migrations `0018` and `0019` through the supported Supabase migration mechanism—never reset, repair, force, squash or edit history;
4. stop immediately on any failure; do not manually continue partial DDL or mark history applied;
5. verify migration history exactly `0001–0019` once each and exact hashes/files from the clean commit;
6. verify tables/columns/constraints/FKs/indexes/triggers/functions/RLS/grants and private bucket/policies structurally;
7. verify legacy rows, if any, are fail-closed `legacy_unverified`/deleted and unavailable;
8. verify anonymous and ordinary authenticated direct list/read/update/delete are denied;
9. verify no public URL/list/existence oracle exists; and
10. record exact mutation timestamp/operator/target/result without secrets.

Rollback is forward-only unless the supported migration transaction failed atomically. Do not drop new objects or rewrite migration history. If applied schema is unsafe, disable hosted feature access/deployment, preserve evidence and stop for an additive corrective sprint.

## Protected Non-Production Configuration And Hosted Deployment

Only after database/Storage proof passes:

- configure the named non-production Vercel target with the matching Supabase public URL/anon key and server-only service-role key using protected settings;
- create a new strong `CRON_SECRET` through an approved password/secret manager and configure it only in the non-production hosted environment;
- never echo, download into the repository, screenshot or log values;
- add a daily UTC Cron declaration only if the target/deployment mode supports it without affecting production; otherwise prove the route manually and defer actual schedule activation;
- deploy only the exact clean 023J commit to the named preview/non-production target;
- verify no production alias/custom domain moves and no production deployment is created; and
- retain sanitised presence/scope/deployment identity evidence.

Because Vercel Cron executes against production deployments, this sprint must not activate a schedule by promoting to production. Manual authenticated route invocation against the named preview may prove the handler; actual scheduled production Cron is deferred.

## Hosted Synthetic Proof Matrix

Use generated non-personal synthetic accounts/stables/horses/tests/files only. No live malware, real horse/customer data or arbitrary downloaded files.

At minimum prove:

- anonymous, inactive, suspended, revoked, no-membership, wrong-horse, cross-stable and insufficient-role denials;
- accepted role initiation according to the permission agreement;
- forged user/role/test/horse/stable/key/size/MIME/category fields are ignored or denied;
- exact unchecked acknowledgement blocks initiation;
- JPEG/PNG/PDF <=5 MiB intent and upload; CSV/unknown/zero/oversize/count/aggregate limits denied;
- direct upload is limited to exact intent/key, cannot overwrite and cannot list/read/update/delete;
- finalisation remains unavailable/fail-closed without approved scanner/sanitiser;
- no preview/download/signed URL is issued for unavailable evidence;
- idempotent replay and duplicate warning behavior;
- replacement failure preserves predecessor; deletion/restoration/hold/purge authority negatives;
- Cron route missing/wrong secret returns opaque 401, correct secret invokes one bounded idempotent reconciliation batch, and overlapping calls do not double-process;
- audit/log/error redaction and no existence oracle;
- 24-hour orphan/temporary-state classification without waiting 24 hours by using controlled synthetic timestamps only where the routine permits;
- Storage-object recovery proof for one synthetic unavailable object, including integrity hash, without making it available; and
- final synthetic Auth/application/Storage cleanup to `0/0/0`, unless retained recovery evidence requires an explicitly approved encrypted non-live artifact.

Do not force database states through unrestricted writes to make application tests pass. Harness setup/cleanup must use narrowly audited service operations, exact owned synthetic IDs and Auth-last cleanup. Never truncate or delete unknown rows/bucket-wide objects.

## Evidence And Required Outputs

Create:

- `planning/reviews/023J-baseline-target-and-authority-gate.md`;
- `planning/reviews/023J-provider-region-and-recovery-decision.md`;
- `planning/reviews/023J-read-only-preflight-and-legacy-inventory.md`;
- `planning/reviews/023J-local-contract-completion-and-validation.md`;
- `planning/reviews/023J-remote-migration-storage-and-policy-proof.md`;
- `planning/reviews/023J-hosted-role-lifecycle-and-cron-proof.md`;
- `planning/reviews/023J-cleanup-rollback-and-non-production-boundary.md`; and
- `planning/reviews/023J-closeout.md`.

All evidence must distinguish local candidate, committed candidate, remotely applied non-production state, hosted preview proof and deferred production proof. Redact secrets and private payloads.

## Approved Local File Set

Builder may edit/create only:

- `supabase/migrations/0019_test_evidence_remote_contract_completion.sql`;
- `lib/evidence/**`;
- `app/(ops)/data-entry/biochemistry/evidence-actions.ts`;
- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`, only for evidence integration;
- `app/api/internal/evidence/reconcile/route.ts`;
- `components/ops/test-evidence-upload.tsx` and `components/ops/test-evidence-state.ts`;
- `app/globals.css`, only for scoped evidence states if required;
- `vercel.json`, only for a daily UTC reconciliation declaration that cannot activate production in this sprint;
- focused `scripts/test-test-evidence-*023J*`, `scripts/supabase-test-evidence-*023J*` and synthetic `scripts/fixtures/023J-test-evidence/**`;
- exact maintained migration-ledger/static validators and their tests only where required to recognize candidate `0019` without weakening earlier checks;
- `package.json`, only for test aliases; no dependency changes;
- `docs/TEST_EVIDENCE_UPLOAD_IMPLEMENTATION_023E.md`, `docs/API.md`, `docs/ARCHITECTURE.md`, and `docs/TEST_EVIDENCE_REMOTE_PROOF_023J.md`;
- `planning/architect-packs/architect-pack-023J-provider-remote-storage-migration-application-and-hosted-proof.md`;
- `planning/sprints/023J-provider-remote-storage-migration-application-and-hosted-proof/**`;
- the eight required `planning/reviews/023J-*.md` files;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only for exact approved/provider/remote facts and unresolved blockers.

Any other local edit is a scope stop.

## External Mutation Allowlist

After all prerequisites and the separate clean 023J commit, external mutation is limited to the exact named non-production targets and:

- applying committed migrations `0018` and `0019` once;
- creating/configuring the one private `test-evidence` bucket and committed policies through those migrations;
- adding/updating required protected non-production environment variables without exposing values;
- one preview/non-production deployment of the exact commit;
- exact synthetic fixtures/proof operations; and
- scoped cleanup of synthetic objects/rows/users created by this sprint.

No production project/domain/alias/database/bucket/environment, DNS, Stripe, public reopening, unrelated Supabase/Vercel resource or real record may be mutated.

## Manual Intervention Rule

For every blocker record:

- what is blocked/not working;
- evidence already checked;
- exact user/operator action required;
- numbered steps; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- production migration, bucket, environment, deployment, alias or Cron activation;
- real scanner/sanitiser integration or evidence availability;
- controlled CSV enablement;
- production/customer/horse data and live malware;
- public launch, commerce, scoring/recommendations, OCR or voice;
- destructive reset/repair/history rewrite or manual partial-DDL continuation;
- provider/dependency additions not separately approved;
- push/PR/merge unless separately instructed; and
- claiming legal certification, Australian-only/recovery production readiness or complete Sprint 023 delivery.

## Official Sources To Recheck

Use current primary sources at execution time, including official Supabase Storage access-control/private-bucket, regions, backup/recovery and DPA/subprocessor documentation, and official Vercel Cron/security/configuration documentation. Record direct URLs and access date. Platform behavior may have changed since Pack creation.
