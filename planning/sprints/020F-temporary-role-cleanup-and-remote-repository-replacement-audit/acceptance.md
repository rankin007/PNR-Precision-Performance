# Sprint 020F - Temporary Role Cleanup And Remote-To-Repository Replacement Audit Acceptance

## Exact Temporary-Role Cleanup

- [x] Exact linked production target and CLI version are reconfirmed without secrets.
- [x] Current PostgreSQL automatic membership-removal behavior is verified from official documentation and encoded narrowly.
- [x] Preflight matches every documented attribute, membership direction/flag/grantor, ownership, session, ACL, and dependency condition for `pp_audit_020e_20260720`.
- [x] Only the exact Sprint 020E `public` schema usage grant is revoked.
- [x] No `REASSIGN OWNED`, `DROP OWNED`, wildcard cleanup, standalone `supabase_admin` revoke, broad ACL change, or broad session termination occurs.
- [x] Only `pp_audit_020e_20260720` is dropped.
- [x] PostgreSQL removes the known creator membership as part of exact role removal, or Builder stops without broader action if it does not.
- [x] Post-cleanup evidence proves zero role/membership/session/ownership/ACL/dependency references and unchanged unrelated structure.
- [x] Sprint 020B biochemistry structural baseline remains unchanged.

## Repository Source-Of-Truth Manifest

- [x] Every migration, bootstrap/configuration artifact, seed/reference source, database/domain contract, Auth/Storage assumption, and runtime consumer is inventoried.
- [x] Each intended object/configuration has a stable key, source authority, dependency/order, fingerprint/count where relevant, reproducibility status, expected security posture, and consumer mapping.
- [x] Bootstrap/migration conflicts, stale definitions, duplicates, assumptions, and missing recreation sources are reported without correction.
- [x] Repository-defined truth is distinguished from hosted configuration that requires manual recreation or preservation.

## Remote Non-Destructive Inventory

- [x] Custom inventory runs only through validated catalog allowlists inside an explicit read-only transaction.
- [x] No application/Auth/Storage/Vault/customer/horse/trainer/upload/session/token/identity/secret row payload is read or retained.
- [x] Remote schemas/extensions/relations/columns/constraints/indexes/routines/triggers/RLS/policies/owners/ACLs/default ACLs/roles/publications/migration history are inventoried with sanitized metadata/fingerprints.
- [x] Safe Auth/Storage/project configuration coverage is documented, and inaccessible/value-sensitive surfaces are classified without guessing.
- [x] Supabase security advisor runs separately and no suggested fix is applied.
- [x] The two ambient-privilege relations and exact privilege sources are identified without remediation.
- [x] Missing remote migration records for local `0001`-`0009` remain a documented provenance issue only.

## Replacement Classification

- [x] Every relevant remote surface receives exactly one approved classification: `preserve-managed`, `preserve-data`, `replace-from-repository`, `remove-legacy`, `recreate-manually`, `migration-history-only`, or `unknown-stop`.
- [x] No object/data/configuration is implicitly classified as disposable.
- [x] Legacy-removal candidates have evidence that no current repository/runtime consumer requires them.
- [x] Preserve-data items identify owner, sensitivity, export/import approach, validation, and recovery requirement.
- [x] Manually recreated items identify owner, source, protected handling, and verification.
- [x] Every unknown has an explicit stop gate and decision owner.

## Deliverables And 020G Readiness

- [x] `docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md` contains sanitized findings, comparison, limitations, replacement plan, rehearsal, recovery, and 020G entry criteria.
- [x] `planning/reviews/020F-supabase-object-classification.md` contains the object-by-object map.
- [x] `planning/reviews/020F-supabase-preservation-decisions.md` contains exact unresolved user/operator/business decisions.
- [x] Updated 020C/020E reports and acceptance accurately record cleanup and supersession.
- [x] 020C/020E close only after exact temporary access cleanup; 020F does not claim the remote project was replaced.
- [x] A disposable-environment rebuild, backup/recovery proof, migration-history strategy, downtime plan, and explicit preserve/remove acceptance remain required before 020G.

## Safety And Closeout

- [x] No remote deletion, reset, replacement, rebuild, migration, history repair, seed, schema/data/auth/storage/configuration change occurs beyond exact temporary-role cleanup.
- [x] No backup payload, customer/application/Auth/Storage row content, credential, secret, connection URI, CLI state, environment value, or link file is exposed or retained.
- [x] All cleanup, inventory, manifest, classification, secret, prohibited-command, JSON/status, staged-file, Git-ignore, and `git diff --check` validations pass.
- [x] State/status/schedule/briefing/decisions/risks/questions accurately classify 020F as ready-for-020G-planning, decisions-required, or blocked.
- [x] No application change, deployment, commit, push, PR, Stripe action, DNS change, or public reopening occurs.
- [x] Every manual intervention includes blocker, evidence, exact numbered action/decision, and follow-up verification.
