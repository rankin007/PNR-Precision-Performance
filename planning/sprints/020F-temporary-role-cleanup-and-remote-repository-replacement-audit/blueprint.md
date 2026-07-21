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
