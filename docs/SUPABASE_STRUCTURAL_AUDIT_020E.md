# Supabase Structural Audit - Sprint 020E

## Outcome

Status: **superseded by Sprint 020F; exact cleanup complete**.

Target: production project tagnbgkroihagjmvehlx (PNR Precision Performance, ap-southeast-1).

The 020E audit stopped before execution. Sprint 020F subsequently used PostgreSQL's exact DROP ROLE behavior after matching all known conditions. The public USAGE grant and only pp_audit_020e_20260720 were removed; the automatic membership was removed with the role. Post-checks proved zero remaining role, membership and session references with unrelated structure unchanged. The replacement-focused audit and advisor results are in docs/SUPABASE_REMOTE_REPLACEMENT_AUDIT_020F.md.

## Safe Evidence

- CLI version: 2.109.1, project-local and lockfile-backed.
- Exact target and linked status reconfirmed.
- Preflight role count: zero before creation.
- Preflight biochemistry policy count: 13.
- Created role flags: NOLOGIN, NOSUPERUSER, NOINHERIT, NOCREATEDB, NOCREATEROLE, NOREPLICATION, NOBYPASSRLS.
- Owned objects: zero.
- Direct sessions: zero.
- Schema privilege: USAGE on public; no CREATE.
- Unexpected creator membership: role granted to postgres by supabase_admin, ADMIN OPTION true, INHERIT false, SET false.
- Effective non-system row-privilege relation count: two, inherited from existing ambient grants rather than an explicit 020E table grant.
- Exact ACL dependency: one pg_namespace automatic dependency for the explicit public schema USAGE.
- Linked postgres can set pg_database_owner but cannot set supabase_admin.

No application, auth, storage, Vault, customer, horse, trainer, token, session, or secret row was queried or retained.

## Findings

### 020E-F001 - Accepted zero-membership model is incompatible with hosted PostgreSQL role creation

- Severity: high workflow/security-boundary finding.
- Boundary: temporary audit-role creation and privilege downshift.
- Evidence: PostgreSQL automatically granted the new role to creator member postgres; grantor is supabase_admin, admin option is true, inherit and set options are false.
- Impact: setup cannot prove zero memberships, and the linked session cannot SET LOCAL ROLE to the audit role because SET is false. The mandated downshift audit is therefore invalid.
- Recommendation: revise the access design in a new Architect Pack using a hosted-Supabase-supported role lifecycle that can both downshift and remove grantor-owned membership without broadening database privileges.
- Dependency: Supabase/PostgreSQL role-administration decision.
- Confidence: high; verified directly from pg_auth_members metadata.

### 020E-F002 - Ambient grants give the temporary role effective row privileges on two relations

- Severity: medium.
- Boundary: zero-row-privilege assertion.
- Evidence: metadata-only has_table_privilege evaluation returned two non-system relations with effective row privileges. No explicit table grant was made to the temporary role.
- Impact: the role fails the pack's zero-row-privilege condition even though it cannot log in and cannot currently be selected by the linked session.
- Recommendation: identify the ambient PUBLIC/default privilege sources in a separately approved read-only audit design before creating another role. Do not remediate grants in this sprint.
- Dependency: revised metadata audit scope.
- Confidence: high for the count; object identities were not investigated after the stop condition.

### 020E-F003 - Exact cleanup completed by Sprint 020F

- Severity: resolved operational finding.
- Boundary: temporary-role cleanup.
- Evidence: exact schema-grant removal succeeds in rollback simulation only after switching to pg_database_owner. Exact creator membership remains because its grantor is supabase_admin, and postgres cannot set that role. Two validated cleanup executions stopped before DROP ROLE.
- Impact: none remains from the temporary role.
- Resolution: 020F matched role flags, membership direction/options/grantor, ownership, sessions, ACL and dependency; revoked only public USAGE and dropped only the role. PostgreSQL removed the automatic membership.
- Confidence: high; absence and unchanged structural baselines were verified remotely.

### 020E-F004 - Local migration history remains absent remotely

- Severity: informational.
- Boundary: migration provenance.
- Evidence: Sprint 020D found local versions 0001-0009 without corresponding remote history while Sprint 020B proved production objects exist.
- Impact: schema presence cannot be used to infer migration application history.
- Recommendation: plan history reconciliation separately; do not repair, replay, push, reset, or infer applied versions.
- Dependency: future migration-governance sprint.
- Confidence: high, inherited from completed 020D/020B evidence.

## Audit Coverage And Limitations

Prepared artifacts cover schemas/extensions, relations, columns/default fingerprints, constraints, indexes, routines, triggers, policies, ACLs/default ACLs, effective privileges, role metadata, publications, migration history, and the Sprint 020B biochemistry structure.

Remote execution stopped before SET LOCAL ROLE; therefore no project-wide catalog result set or security-advisor result is claimed. Sprint 020B remains the authority for the five biochemistry RLS tables, three helpers, seven explicit indexes, thirteen policies, 1,774 lookup rows, and zero duplicate keys.

## Manual Intervention Resolution

The previously requested intervention is no longer required.

Evidence checked: role attributes, memberships and grantor, ownership, direct sessions, explicit schema ACL/grantor, effective row-privilege count, dependency catalog/type, and SET ROLE capability.

Sprint 020F supplied and executed the revised exact cleanup and proved complete absence. The unexecuted 020E audit remains historical; it was not resumed.

## Production Changes

Across 020E/020F, the temporary role and its exact public schema USAGE grant were created and then fully removed. No schema, table row, policy, function, trigger, extension, owner, default privilege, migration history, auth user, storage record, secret, project setting, deployment, or billing state was changed.
