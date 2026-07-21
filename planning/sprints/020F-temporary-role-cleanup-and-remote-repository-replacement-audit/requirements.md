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
