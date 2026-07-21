# Supabase Remote-To-Repository Replacement Audit - Sprint 020F

## Outcome

Status: **decisions-required; not ready for destructive replacement**.

The exact Sprint 020E role was removed and the linked production project was inspected through a validated read-only catalog query. No application/Auth/Storage/Vault row payload was read or retained. No advisor fix or repository replacement was applied.

## Cleanup Proof

Target project tagnbgkroihagjmvehlx and pinned CLI 2.109.1 were reconfirmed. Preflight matched the exact NOLOGIN/non-elevated role, its single automatic membership, one public-schema ACL dependency, zero owned objects and zero sessions. Only the public USAGE grant was revoked and only pp_audit_020e_20260720 was dropped. PostgreSQL removed its automatic membership. Post-checks proved role, membership and session counts zero. Unrelated role count changed 32 to 31 only; 80 non-system relations, 13 biochemistry policies, five RLS biochemistry tables and three biochemistry helpers were unchanged.

## Repository Manifest

The authoritative chain is migrations 0001-0009, followed by generated bootstrap supabase/bootstrap/remote-init.sql (SHA-256 5FC736736F71F35BA81CA85BDC0DAF57EF3F3E851072BD5FC1783B3B354CD07F). Migration hashes were recorded during execution. Migrations define 33 public tables, 11 public helpers, RLS/policies, indexes and seed/reference data. Runtime consumers in app/ and lib/ use Supabase Auth and the core membership, horse, operations, commerce and biochemistry tables.

The bootstrap is a generated deployment convenience, not a separate authority. Hosted Auth, Storage, project settings and secrets are not reproducible from migrations. No correction was made to bootstrap/migration drift.

## Sanitized Remote Findings

- Managed schemas: auth, storage, realtime, vault, extensions, graphql, graphql_public and pgbouncer.
- Extensions: pg_stat_statements, pgcrypto, plpgsql, supabase_vault and uuid-ossp.
- Public catalog: 40 relations, 11 functions, 90 policies and zero non-internal triggers.
- Sprint 020B baseline remains: five biochemistry tables and 13 policies.
- Remote-only public surfaces: "Test User", "Test User_id_seq", client_applications, etrakka_biochem_comparison, etrakka_sessions, horse_biochemistry_results and horse_gallery_items.
- The two ambient-privilege relations are extensions.pg_stat_statements and extensions.pg_stat_statements_info. Each has PUBLIC SELECT granted by postgres and is classified preserve-managed.
- The supabase_migrations.schema_migrations relation is absent. Local 0001-0009 provenance therefore remains migration-history-only.

## Security Advisor

The separate advisor ran without applying fixes. It reported:

- ERROR: public.etrakka_biochem_comparison is a SECURITY DEFINER view.
- WARN: two always-true write-policy findings on public.client_applications.
- WARN: anon and authenticated can execute the 11 public SECURITY DEFINER helpers.
- WARN: Auth leaked-password protection is disabled.

These are security-owner decisions and potential future remediation scope, not implicit 020F changes.

## Limitations

Catalog metadata cannot establish whether remote-only tables contain required records, whether Auth users/identities can be migrated losslessly, which Storage objects/config exist, or the protected values of hosted configuration and secrets. Those surfaces are preserve-data, recreate-manually, or unknown-stop. No row counts were queried because even aggregate production data inspection was outside the accepted payload boundary.

## 020G Entry Criteria

Before any replacement sprint:

1. Resolve every decision in planning/reviews/020F-supabase-preservation-decisions.md.
2. Produce protected Auth, Storage, configuration and secret-recreation runbooks.
3. Approve encrypted backups, recovery objectives, downtime and rollback ownership.
4. Rebuild from repository sources in a disposable project and verify schema, RLS, policies, advisor status and runtime contracts.
5. Restore representative protected data in rehearsal and validate counts, keys, relationships and application smoke tests.
6. Select an explicit migration-history strategy.
7. Obtain a separate Architect Pack that names exact destructive targets and commands.

Until then, the linked project must not be reset, deleted, replaced, repaired, replayed or migrated.
