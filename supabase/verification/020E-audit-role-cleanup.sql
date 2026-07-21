-- Sprint 020E exact temporary audit-role cleanup.
-- Authorized production mutation: revoke the exact setup grant and drop only
-- pp_audit_020e_20260720 after dependency checks.

set role pg_database_owner;
revoke usage on schema public from pp_audit_020e_20260720;
reset role;
revoke pp_audit_020e_20260720 from postgres;

do $cleanup$
declare
  audit_role_oid oid;
  owned_count bigint;
  membership_count bigint;
  dependency_count bigint;
  direct_session_count bigint;
begin
  select oid into audit_role_oid from pg_catalog.pg_roles
  where rolname = 'pp_audit_020e_20260720';
  if audit_role_oid is null then
    raise exception '020E audit role is absent before cleanup; stop';
  end if;
  select count(*) into owned_count from pg_catalog.pg_class
  where relowner = audit_role_oid;
  select count(*) into membership_count from pg_catalog.pg_auth_members
  where member = audit_role_oid or roleid = audit_role_oid;
  select count(*) into dependency_count from pg_catalog.pg_shdepend
  where refclassid = 'pg_authid'::regclass and refobjid = audit_role_oid
    and deptype in ('o', 'a');
  select count(*) into direct_session_count from pg_catalog.pg_stat_activity
  where usename = 'pp_audit_020e_20260720';
  if owned_count <> 0 or membership_count <> 0 or
     dependency_count <> 0 or direct_session_count <> 0 then
    raise exception '020E cleanup dependency assertion failed';
  end if;
  drop role pp_audit_020e_20260720;
end
$cleanup$;

select count(*) as remaining_role_count from pg_catalog.pg_roles
where rolname = 'pp_audit_020e_20260720';
select count(*) as remaining_direct_session_count from pg_catalog.pg_stat_activity
where usename = 'pp_audit_020e_20260720';
