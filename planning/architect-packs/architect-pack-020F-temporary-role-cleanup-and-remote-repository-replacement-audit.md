# Architect Pack 020F - Temporary Role Cleanup And Remote-To-Repository Replacement Audit

============================================================
FILE: planning/sprints/020F-temporary-role-cleanup-and-remote-repository-replacement-audit/requirements.md
============================================================

# Sprint 020F - Temporary Role Cleanup And Remote-To-Repository Replacement Audit Requirements

## Role And Profile

Builder executes this follow-up under the `strict` workflow profile and implements only from this applied sprint folder.

## Goal

Safely remove the stranded Sprint 020E temporary audit role, then perform a non-destructive, project-wide comparison of the linked production Supabase project against the current repository as the application/schema source of truth, producing an exact preservation, removal, rebuild, migration-history, and verification plan for a later destructive Sprint 020G.

## Authoritative Direction

The user has established that the current Precision Performance repository is the source of truth. Existing Supabase application structure came from an older redundant project state that has been superseded by the current project.

This direction establishes intended authority but does not by itself prove that every hosted Auth, Storage, managed-schema, secret, project-setting, extension, or data surface is reproducible from the repository. Sprint 020F must identify those gaps before destructive replacement.

## Relationship To Earlier 020 Sprints

- Sprint 020B remains the authority for the verified production biochemistry structure and lookup-count evidence.
- Sprint 020C remains active because its database audit was not completed.
- Sprint 020D is complete and is the authority for operational protected CLI authentication, exact project linking, and database connectivity.
- Sprint 020E remains active and blocked after creating `pp_audit_020e_20260720`; no structural audit or security advisor ran. Sprint 020F owns exact cleanup of that role and supersedes the failed temporary-role audit model.
- Sprint 020F may close 020C and 020E as superseded/cleaned-up only after exact role removal is proven. It must not claim that the replacement itself occurred.
- Sprint 020G is future destructive replacement work and must not be created or executed until 020F produces a complete reviewed map and the user accepts the preservation/removal decisions.

## Sources Of Truth

- `AGENTS.md`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- all applied Sprint 020C, 020D, and 020E artifacts
- `docs/DATABASE_AUDIT_REVIEW_020C.md`
- `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`
- `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md`
- `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `supabase/config.toml`
- `supabase/migrations/**`
- `supabase/bootstrap/remote-init.sql`
- repository database/auth/storage/domain documentation and application consumers
- `package.json`, `package-lock.json`, and installed Supabase CLI `2.109.1` help
- linked project reference metadata by exact safe equality only
- current official Supabase/PostgreSQL documentation for managed schemas, migrations, Auth, Storage, CLI database queries, backups, and security advisors

## Confirmed Target And Tooling

- Linked production project reference: `tagnbgkroihagjmvehlx`
- Project name: `PNR Precision Performance`
- Region: `ap-southeast-1`
- CLI: pinned project-local `2.109.1` invoked as `npx --no-install supabase`
- Stranded role to remove: `pp_audit_020e_20260720`
- Local migrations: `0001`-`0009`
- Remote CLI migration history: no corresponding `0001`-`0009` records

Builder must reconfirm the exact linked target and production classification before cleanup and before each remote read. Never install, upgrade, or substitute the CLI.

## In Scope

### Phase 1: Exact Temporary-Role Cleanup

- verify the stranded role is exactly the known Sprint 020E role with the documented `NOLOGIN`, non-elevated, zero-owner, zero-direct-session state
- verify the only membership involving it is the known automatic creator membership: granted role `pp_audit_020e_20260720`, member `postgres`, grantor `supabase_admin`, `ADMIN true`, `INHERIT false`, `SET false`
- verify its only audit-created object privilege/dependency is the explicit `USAGE` grant on schema `public`
- revoke only the exact audit-created schema usage through the already proven authorized role context
- rely on PostgreSQL `DROP ROLE` membership cleanup only after locally reviewing current official behavior and proving no ownership or unexpected dependencies
- drop only `pp_audit_020e_20260720`
- prove zero remaining role, membership, session, ownership, ACL, and dependency references
- prove unrelated role/object counts and the Sprint 020B baseline remain unchanged

### Phase 2: Repository Source-Of-Truth Inventory

- inventory every repository artifact that defines or depends on Supabase structure
- map migrations, bootstrap SQL, tables, columns, constraints, indexes, functions, triggers, RLS, policies, grants, extensions, seed/reference data, Auth assumptions, Storage assumptions, application role assumptions, and environment/configuration contracts
- identify what the repository can recreate deterministically and what it only assumes exists
- calculate hashes/counts for source-of-truth migrations, bootstrap output, and supplied seed/reference data
- identify duplicate, stale, generated, or conflicting local database definitions without rewriting them

### Phase 3: Remote Metadata And Configuration Inventory

- use the operational linked CLI and statically validated read-only catalog SQL to inventory remote structural metadata without creating another audit role
- run catalog queries only inside an explicit read-only transaction
- run the Supabase security advisor as a separate read-only privileged diagnostic
- inventory schemas, extensions, relations, columns, defaults, constraints, indexes, routines, triggers, RLS, policies, owners, ACLs/default ACLs, relevant roles/memberships, publications, and migration history
- inventory Auth/Storage/project configuration only through safe metadata or Management API summaries that contain no user, session, token, object, secret, or row payload
- identify the two relations on which a newly created role receives effective privileges through ambient grants and identify the exact privilege source without remediating it
- retain only sanitized metadata, counts, hashes/fingerprints, safe names, status values, and findings

### Phase 4: Replacement Classification And Plan

- compare repository truth with remote state object by object
- classify every relevant remote surface as `preserve-managed`, `preserve-data`, `replace-from-repository`, `remove-legacy`, `recreate-manually`, `migration-history-only`, or `unknown-stop`
- identify exact dependencies and ordering for a future cleanup/rebuild
- identify Auth users/identities, Storage buckets/objects, secrets, redirects, email/provider settings, extensions, database roles, service integrations, and production records that the repository does not recreate
- define backup/export, recovery, disposable-environment rehearsal, destructive execution, verification, application reconnection, and rollback/forward-fix requirements for Sprint 020G
- produce an explicit list of user/business decisions required before 020G

## Non-Destructive Audit Model

Do not create another temporary audit role. Execute only statically validated catalog/metadata queries through the operational linked CLI connection.

Every custom remote audit SQL file must:

- begin `TRANSACTION READ ONLY`
- use an explicit allowlist of PostgreSQL catalog relations and safe metadata functions
- contain no dynamic SQL
- contain no `COPY`
- contain no application, Auth, Storage, Vault, customer, horse, trainer, upload, session, token, identity, or secret row read
- fingerprint potentially sensitive defaults, policies, triggers, indexes, constraints, and routine definitions instead of retaining raw expressions where appropriate
- roll back explicitly

The linked connection is privileged. Safety comes from a reviewed query allowlist, transaction mode, local static validation, sanitized output, and a strict no-remediation boundary—not from claiming least-privilege session identity.

## Required Classification Model

Every relevant object/configuration surface must receive exactly one classification:

- **preserve-managed**: Supabase-managed structure required for platform operation; do not drop or replace through application migrations
- **preserve-data**: current hosted records must survive replacement, with owner, export/import method, validation, and privacy handling defined
- **replace-from-repository**: repository deterministically recreates the intended object/configuration
- **remove-legacy**: obsolete application-owned structure with evidence that no current source/runtime consumer requires it
- **recreate-manually**: required hosted configuration not fully represented in repository artifacts
- **migration-history-only**: provenance/history alignment issue with no immediate structural change
- **unknown-stop**: insufficient evidence; destructive replacement must stop until decided

No object may be implicitly treated as disposable.

## Out Of Scope

- deleting, truncating, resetting, dropping, replacing, or rebuilding the Supabase project beyond the exact stranded-role cleanup
- applying/replaying migrations or bootstrap SQL remotely
- migration repair, history insertion, marking versions applied, push, pull, reset, diff-generated mutation, seed, or reconciliation
- modifying schemas, tables, columns, constraints, indexes, functions, triggers, RLS, policies, grants, owners, extensions, roles other than the exact cleanup role, publications, Auth, Storage, Vault, secrets, project settings, billing, or data
- exporting or retaining customer/application/Auth/Storage row payloads in repository evidence
- creating replacement backups, projects, branches, or disposable remote environments
- application/UI change, deployment, commit, push, PR, Stripe action, DNS change, or public reopening
- creating Architect Pack 020G

## Authorized Production Mutation

The only production mutation is exact cleanup of `pp_audit_020e_20260720`:

1. revoke the exact Sprint 020E `public` schema `USAGE` grant
2. drop only `pp_audit_020e_20260720` after exact-state and dependency assertions

PostgreSQL may automatically remove the known creator membership as part of dropping that exact role. No standalone `supabase_admin` intervention is required unless current official behavior, preflight evidence, or the drop attempt disproves this safe path.

Do not use `REASSIGN OWNED`, `DROP OWNED`, wildcard cleanup, broad ACL changes, broad session termination, or deletion of any other role/object.

## Credential And Evidence Safety

- Reuse protected CLI authentication without reading or copying credential state.
- Never ask for or accept tokens, passwords, connection URIs, verifiers, secrets, or customer data in conversation.
- Keep CLI debug/trace disabled.
- Do not print environment values, credential-store contents, connection endpoints containing secrets, or `supabase/.temp` files wholesale.
- Do not retain raw Auth users, identities, sessions, refresh tokens, Storage object paths, Vault data, application rows, or private configuration values.
- Sanitize errors and outputs before durable storage. If a secret or private row appears, stop, do not repeat it, and record rotation/remediation intervention.

## Required Deliverables

- updated `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md` recording verified cleanup
- updated `docs/DATABASE_AUDIT_REVIEW_020C.md` recording supersession/closure status
- `docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md`
- `planning/reviews/020F-supabase-object-classification.md`
- `planning/reviews/020F-supabase-preservation-decisions.md`
- validated cleanup and read-only inventory SQL/scripts
- refreshed planning state/status/briefing/decisions/risks/questions/schedule

## Approved File Set

Builder may edit:

- `planning/sprints/020F-temporary-role-cleanup-and-remote-repository-replacement-audit/**`
- `planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/acceptance.md`
- `planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/OPERATIONS.md`, if present
- `planning/sprints/020C-temporary-database-audit-access-and-review/acceptance.md`
- `planning/sprints/020C-temporary-database-audit-access-and-review/OPERATIONS.md`
- `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md`
- `docs/DATABASE_AUDIT_REVIEW_020C.md`
- `docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md`
- `planning/reviews/020F-supabase-object-classification.md`
- `planning/reviews/020F-supabase-preservation-decisions.md`
- `supabase/verification/020F-temporary-role-cleanup.sql`
- `supabase/verification/020F-remote-structure-inventory.sql`
- `scripts/validate-supabase-replacement-audit-020F.*`
- existing 020C/020E validators only where compatibility updates are required
- `.gitignore` only for a narrow missing generated/temp-output exclusion
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Generated but never staged or committed:

- `supabase/.temp/**`
- user-level Supabase CLI authentication/credential state
- unsanitized remote outputs, backup payloads, or temporary audit capture

Inspection only:

- all repository source, migrations, bootstrap/configuration, docs, references, application consumers, package metadata, and safe link metadata not otherwise approved above
- remote catalogs, security-advisor output, and safe Management API configuration summaries within this pack's boundaries

## Design And Architecture Carry-Forward

No UI or public messaging is planned. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` remains binding. This sprint crosses the exact temporary-role cleanup and production metadata-audit gates only. It does not cross destructive replacement, migration, schema/auth/RLS redesign, data/provider/CMS/aggregation/terminology/commerce, deployment, or public-reopening gates.

## Manual Intervention Rule

For cleanup mismatch/failure, unexpected ownership/dependency, target ambiguity, CLI/network/TLS failure, query safety uncertainty, row/secret exposure, inaccessible configuration, backup/recovery uncertainty, unknown object ownership, Auth/Storage preservation, or any `unknown-stop` classification, Builder must record:

- what is blocked or not working
- evidence already checked
- the exact user/operator action or decision needed
- numbered completion steps
- what Builder will verify afterward

Stop before any destructive action, migration-history mutation, remote apply, data export containing payloads, or assumption that an unclassified object is disposable.

============================================================
FILE: planning/sprints/020F-temporary-role-cleanup-and-remote-repository-replacement-audit/blueprint.md
============================================================

# Sprint 020F - Temporary Role Cleanup And Remote-To-Repository Replacement Audit Blueprint

## Execution Order

1. Reconfirm strict scope, dirty-worktree boundaries, linked production project `tagnbgkroihagjmvehlx`, CLI `2.109.1`, completed 020D evidence, and blocked 020C/020E state.
2. Review current official PostgreSQL `CREATE ROLE`, membership, `DROP ROLE`, dependency, and ACL behavior. Verify that dropping an exact role automatically removes memberships involving it while owned objects/dependent privileges remain stop conditions.
3. Create `020F-temporary-role-cleanup.sql` and a validator. The cleanup must encode the exact known membership direction/flags/grantor, revoke only public schema usage, check ownership/sessions/unexpected dependencies, drop only the fixed role, and prove absence.
4. Run local cleanup validation, secret/mutation scans, target equality, and read-only preflight. Stop if any role attribute, membership, owner, session, ACL, or dependency differs from the documented 020E state.
5. Execute the exact cleanup through `npx --no-install supabase db query --linked --file ...`. If PostgreSQL refuses the drop because membership was not automatically removable or another dependency exists, stop without broader action and record exact manual intervention.
6. Verify zero remaining role/membership/session/ownership/ACL/dependency references, unchanged unrelated role/object counts, unchanged thirteen-policy and Sprint 020B biochemistry structural baseline, and no secret/staged output.
7. Update 020C/020E reports and acceptance to record cleanup. Close them as superseded/cleaned-up only if their remaining requirements are accurately transferred to 020F and no temporary access remains.
8. Inventory repository source-of-truth definitions: migrations, bootstrap, config, seeds/reference data, domain contracts, application consumers, Auth assumptions, Storage assumptions, environment contracts, and documentation.
9. Build an expected repository object manifest with stable object keys, source file/line, creation order, dependencies, hash/fingerprint, seed counts, and reproducibility status.
10. Create `020F-remote-structure-inventory.sql` using only approved catalogs/safe metadata functions inside a read-only transaction. Build a static validator that rejects row relations, dynamic SQL, `COPY`, mutation statements, debug/secret patterns, and unapproved functions.
11. Execute the validated inventory through the linked CLI. Retain only sanitized metadata/fingerprints/counts. Run the Supabase security advisor separately and do not execute fixes.
12. Obtain safe Management API/configuration summaries for Auth, Storage, extensions, redirects/providers, and project settings only where supported without secret or row payload exposure. Mark inaccessible or value-sensitive surfaces `unknown-stop` or `recreate-manually`.
13. Identify and document the two ambient-privilege relations, grantee/source ACL/default ACL, privileges, owner, schema, and current repository dependency. Do not revoke or change anything.
14. Compare remote inventory against repository manifest. Create `planning/reviews/020F-supabase-object-classification.md` with one classification for every relevant surface.
15. Create `planning/reviews/020F-supabase-preservation-decisions.md` listing every unresolved business/operator decision, especially Auth users, application data, Storage, secrets, providers, redirects, integrations, and project settings.
16. Write `docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md` with findings, source-of-truth coverage, legacy/removal candidates, managed/preserved surfaces, gaps, migration-history divergence, recovery requirements, rehearsal plan, and exact 020G entry criteria.
17. Run all validators, JSON/status assertions, secret/staged-file scans, Git-ignore verification, and `git diff --check`. Update durable planning records and close accurately as ready-for-020G-planning, decisions-required, or blocked.

## Exact Cleanup Preconditions

Before drop, all must match:

- role name exactly `pp_audit_020e_20260720`
- `NOLOGIN`, `NOSUPERUSER`, `NOINHERIT`, `NOCREATEDB`, `NOCREATEROLE`, `NOREPLICATION`, `NOBYPASSRLS`
- zero owned objects across relevant ownership catalogs
- zero direct sessions
- exactly one known membership involving the role: role granted to member `postgres`, grantor `supabase_admin`, `ADMIN true`, `INHERIT false`, `SET false`
- exactly the known audit-created `public` schema usage dependency and no other direct grant/dependency introduced by 020E

A mismatch is a stop condition. Do not normalize an unexpected role into the expected shape.

## Cleanup Procedure Requirements

The cleanup SQL must:

- use the exact literal role name only
- run assertions before mutation
- revoke only the exact `USAGE ON SCHEMA public` grant through the proven permissible role context
- reset any temporary role context before drop
- recheck zero ownership, zero sessions, and no unexpected dependencies
- allow the known creator membership to remain immediately before `DROP ROLE`, because current PostgreSQL behavior removes memberships involving the dropped role
- drop only `pp_audit_020e_20260720`
- verify zero remaining role, membership, direct-session, ownership, ACL, and dependency references

Do not execute a standalone `supabase_admin` membership revoke unless this exact path fails and a later instruction explicitly authorizes it.

## Repository Manifest Requirements

For each expected current-project object/configuration, record:

- stable key: environment/schema/kind/name/signature
- source artifact and authoritative lines/section
- dependencies and creation order
- whether bootstrap and incremental migrations agree
- deterministic recreation status
- expected owner/RLS/policy/grant posture where defined
- expected seed/reference counts and source hash where relevant
- runtime consumer(s)
- preservation or replacement implication

Do not repair inconsistencies during this audit. Record them as findings or `unknown-stop` decisions.

## Remote Inventory Requirements

At minimum cover:

- safe project/database/version context
- schemas and extensions
- relations by kind, owner, RLS/forced-RLS, persistence, and ACL fingerprint
- columns/types/nullability/identity/generated/default fingerprints
- constraints and dependency fingerprints
- indexes and validity/readiness/predicate fingerprints
- functions/procedures by signature, language, owner, volatility, security-definer, configuration and definition fingerprint
- triggers and enabled state/fingerprint
- policies, roles, commands and expression fingerprints
- explicit/default ACLs and PUBLIC/anon/authenticated effective privileges
- relevant role attributes/memberships without password/verifier data
- publication/replication structure without change payloads
- migration-history versions/status
- safe Auth/Storage managed-schema object inventory without row content
- Supabase security-advisor identifiers/severity/object/summary
- ambient privilege source for the two previously counted relations

## Comparison Rules

- Match by stable schema/kind/name/signature, not display order.
- Distinguish Supabase-managed objects from application-owned objects before classifying differences.
- Do not call an object legacy merely because it is absent from a single migration; inspect bootstrap, source consumers, docs, and managed-platform ownership.
- Do not call an object current merely because it exists remotely; require repository authority or explicit preserve/recreate decision.
- Treat migration history separately from structural equality.
- Treat data preservation separately from schema replacement.
- Treat Auth/Storage/project configuration separately from `public` schema migrations.

## 020G Entry Criteria

Recommend 020G planning only when:

- the temporary role is fully removed
- repository manifest and remote inventory are complete enough for destructive planning
- every relevant surface has one classification
- every `unknown-stop` is resolved or explicitly retained as a stop gate
- preservation decisions identify owners and approved export/import methods
- a recoverable backup/PITR/export posture is verified
- the repository rebuild succeeds in a disposable environment with expected objects/counts/RLS/grants
- migration-history alignment strategy is reviewed
- exact destructive target, sequence, blast radius, downtime, application reconnection, verification, and recovery are documented
- user explicitly accepts the preserve/remove/rebuild map

Sprint 020F must not perform these 020G actions.

## Findings Model

Each finding must include identifier, severity, object/boundary, repository evidence, remote sanitized evidence, impact, classification, recommendation, dependency/decision owner, and confidence/limitation.

## Validation

At minimum run:

- Architect Pack format/provenance check
- exact-cleanup static validator
- read-only inventory static validator
- repository manifest completeness/duplicate-key check
- classification vocabulary and one-classification-per-object validation
- secret/row-payload/prohibited-command scans
- CLI target/link equality and pinned-version checks
- ignored/untracked `supabase/.temp/**` and staged-file checks
- JSON parsing and expected status assertions
- `git diff --check`, allowing only existing line-ending warnings

============================================================
FILE: planning/sprints/020F-temporary-role-cleanup-and-remote-repository-replacement-audit/acceptance.md
============================================================

# Sprint 020F - Temporary Role Cleanup And Remote-To-Repository Replacement Audit Acceptance

## Exact Temporary-Role Cleanup

- [ ] Exact linked production target and CLI version are reconfirmed without secrets.
- [ ] Current PostgreSQL automatic membership-removal behavior is verified from official documentation and encoded narrowly.
- [ ] Preflight matches every documented attribute, membership direction/flag/grantor, ownership, session, ACL, and dependency condition for `pp_audit_020e_20260720`.
- [ ] Only the exact Sprint 020E `public` schema usage grant is revoked.
- [ ] No `REASSIGN OWNED`, `DROP OWNED`, wildcard cleanup, standalone `supabase_admin` revoke, broad ACL change, or broad session termination occurs.
- [ ] Only `pp_audit_020e_20260720` is dropped.
- [ ] PostgreSQL removes the known creator membership as part of exact role removal, or Builder stops without broader action if it does not.
- [ ] Post-cleanup evidence proves zero role/membership/session/ownership/ACL/dependency references and unchanged unrelated structure.
- [ ] Sprint 020B biochemistry structural baseline remains unchanged.

## Repository Source-Of-Truth Manifest

- [ ] Every migration, bootstrap/configuration artifact, seed/reference source, database/domain contract, Auth/Storage assumption, and runtime consumer is inventoried.
- [ ] Each intended object/configuration has a stable key, source authority, dependency/order, fingerprint/count where relevant, reproducibility status, expected security posture, and consumer mapping.
- [ ] Bootstrap/migration conflicts, stale definitions, duplicates, assumptions, and missing recreation sources are reported without correction.
- [ ] Repository-defined truth is distinguished from hosted configuration that requires manual recreation or preservation.

## Remote Non-Destructive Inventory

- [ ] Custom inventory runs only through validated catalog allowlists inside an explicit read-only transaction.
- [ ] No application/Auth/Storage/Vault/customer/horse/trainer/upload/session/token/identity/secret row payload is read or retained.
- [ ] Remote schemas/extensions/relations/columns/constraints/indexes/routines/triggers/RLS/policies/owners/ACLs/default ACLs/roles/publications/migration history are inventoried with sanitized metadata/fingerprints.
- [ ] Safe Auth/Storage/project configuration coverage is documented, and inaccessible/value-sensitive surfaces are classified without guessing.
- [ ] Supabase security advisor runs separately and no suggested fix is applied.
- [ ] The two ambient-privilege relations and exact privilege sources are identified without remediation.
- [ ] Missing remote migration records for local `0001`-`0009` remain a documented provenance issue only.

## Replacement Classification

- [ ] Every relevant remote surface receives exactly one approved classification: `preserve-managed`, `preserve-data`, `replace-from-repository`, `remove-legacy`, `recreate-manually`, `migration-history-only`, or `unknown-stop`.
- [ ] No object/data/configuration is implicitly classified as disposable.
- [ ] Legacy-removal candidates have evidence that no current repository/runtime consumer requires them.
- [ ] Preserve-data items identify owner, sensitivity, export/import approach, validation, and recovery requirement.
- [ ] Manually recreated items identify owner, source, protected handling, and verification.
- [ ] Every unknown has an explicit stop gate and decision owner.

## Deliverables And 020G Readiness

- [ ] `docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md` contains sanitized findings, comparison, limitations, replacement plan, rehearsal, recovery, and 020G entry criteria.
- [ ] `planning/reviews/020F-supabase-object-classification.md` contains the object-by-object map.
- [ ] `planning/reviews/020F-supabase-preservation-decisions.md` contains exact unresolved user/operator/business decisions.
- [ ] Updated 020C/020E reports and acceptance accurately record cleanup and supersession.
- [ ] 020C/020E close only after exact temporary access cleanup; 020F does not claim the remote project was replaced.
- [ ] A disposable-environment rebuild, backup/recovery proof, migration-history strategy, downtime plan, and explicit preserve/remove acceptance remain required before 020G.

## Safety And Closeout

- [ ] No remote deletion, reset, replacement, rebuild, migration, history repair, seed, schema/data/auth/storage/configuration change occurs beyond exact temporary-role cleanup.
- [ ] No backup payload, customer/application/Auth/Storage row content, credential, secret, connection URI, CLI state, environment value, or link file is exposed or retained.
- [ ] All cleanup, inventory, manifest, classification, secret, prohibited-command, JSON/status, staged-file, Git-ignore, and `git diff --check` validations pass.
- [ ] State/status/schedule/briefing/decisions/risks/questions accurately classify 020F as ready-for-020G-planning, decisions-required, or blocked.
- [ ] No application change, deployment, commit, push, PR, Stripe action, DNS change, or public reopening occurs.
- [ ] Every manual intervention includes blocker, evidence, exact numbered action/decision, and follow-up verification.

============================================================
FILE: planning/sprints/020F-temporary-role-cleanup-and-remote-repository-replacement-audit/handoff-prompt.md
============================================================

# Sprint 020F - Builder Handoff Prompt

You are Builder for Sprint 020F under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, all Sprint 020C/020D/020E artifacts, `docs/DATABASE_AUDIT_REVIEW_020C.md`, `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`, `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md`, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, all Supabase migrations/bootstrap/configuration, database/auth/storage/domain docs and consumers, risks, questions, and Architect briefing before acting.

The current repository is the application/schema source of truth. Your task is not to clean out or rebuild Supabase. First remove only the stranded role `pp_audit_020e_20260720` through an exact, validated, automatic-membership-aware cleanup. Then inventory repository truth and remote production metadata, compare them, and produce the preserve/remove/recreate/unknown map required before a later destructive Sprint 020G.

Use the pinned operational CLI through `npx --no-install supabase` and reconfirm exact linked production project `tagnbgkroihagjmvehlx` before every remote phase. Never inspect, copy, print, or persist credentials, connection URLs, user-level CLI state, environment values, or link files wholesale. Keep debug/trace disabled.

For cleanup, accept only the exact documented role attributes, automatic creator membership direction/flags/grantor, zero ownership, zero sessions, and known public schema usage dependency. Revoke only that schema grant and drop only the fixed role. Current PostgreSQL behavior may remove the known membership during `DROP ROLE`; if it does not, stop. Do not use `supabase_admin`, `REASSIGN OWNED`, `DROP OWNED`, wildcards, broad ACL changes, or broad termination without a later instruction.

Do not create another audit role. Run only statically validated, read-only, catalog-allowlisted inventory SQL through the linked CLI. Do not query or retain application, Auth, Storage, Vault, customer, horse, trainer, upload, identity, session, token, or secret row payloads. Fingerprint potentially sensitive expressions. Run the Supabase security advisor separately and do not apply fixes.

Build a repository manifest and remote inventory, then classify every relevant surface as `preserve-managed`, `preserve-data`, `replace-from-repository`, `remove-legacy`, `recreate-manually`, `migration-history-only`, or `unknown-stop`. No object is implicitly disposable. Identify the two ambient privilege sources and the missing `0001`-`0009` remote history without remediation.

Produce the complete 020F audit, object-classification map, preservation-decision register, recovery/rehearsal requirements, and exact 020G entry criteria. Close 020C/020E only after temporary-role cleanup is proven. Do not create 020G, delete/reset/rebuild Supabase, apply/replay/repair migrations, export sensitive rows, change schema/data/auth/storage/settings, commit, push, create a PR, deploy, change Stripe/DNS, or reopen public surfaces.
