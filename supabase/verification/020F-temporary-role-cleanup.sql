-- Sprint 020F exact cleanup of the stranded Sprint 020E role.
-- PostgreSQL DROP ROLE automatically removes memberships involving the target.

do $preflight$
declare
  target_oid oid;
  mismatch_count bigint;
  membership_count bigint;
  owned_count bigint;
  session_count bigint;
  acl_count bigint;
  dependency_count bigint;
begin
  select oid into target_oid from pg_catalog.pg_roles
  where rolname = 'pp_audit_020e_20260720'
    and not rolcanlogin and not rolsuper and not rolinherit
    and not rolcreaterole and not rolcreatedb and not rolreplication
    and not rolbypassrls;
  if target_oid is null then
    raise exception '020F exact role attributes do not match';
  end if;

  select count(*) into membership_count
  from pg_catalog.pg_auth_members membership
  join pg_catalog.pg_roles granted on granted.oid = membership.roleid
  join pg_catalog.pg_roles member_role on member_role.oid = membership.member
  join pg_catalog.pg_roles grantor_role on grantor_role.oid = membership.grantor
  where granted.rolname = 'pp_audit_020e_20260720'
    and member_role.rolname = 'postgres'
    and grantor_role.rolname = 'supabase_admin'
    and membership.admin_option
    and not membership.inherit_option
    and not membership.set_option;
  if membership_count <> 1 or
     (select count(*) from pg_catalog.pg_auth_members
      where roleid = target_oid or member = target_oid) <> 1 then
    raise exception '020F exact membership does not match';
  end if;

  select count(*) into owned_count from pg_catalog.pg_class where relowner = target_oid;
  select count(*) into session_count from pg_catalog.pg_stat_activity
  where usename = 'pp_audit_020e_20260720';
  if owned_count <> 0 or session_count <> 0 then
    raise exception '020F ownership or session precondition failed';
  end if;

  select count(*) into acl_count
  from pg_catalog.pg_namespace namespace
  cross join lateral pg_catalog.aclexplode(namespace.nspacl) acl
  join pg_catalog.pg_roles grantee on grantee.oid = acl.grantee
  join pg_catalog.pg_roles grantor on grantor.oid = acl.grantor
  where namespace.nspname = 'public'
    and grantee.rolname = 'pp_audit_020e_20260720'
    and grantor.rolname = 'pg_database_owner'
    and acl.privilege_type = 'USAGE'
    and not acl.is_grantable;
  if acl_count <> 1 then
    raise exception '020F exact public usage ACL does not match';
  end if;

  select count(*) into dependency_count
  from pg_catalog.pg_shdepend dependency
  where dependency.refclassid = 'pg_authid'::regclass
    and dependency.refobjid = target_oid
    and dependency.classid = 'pg_namespace'::regclass
    and dependency.deptype = 'a';
  if dependency_count <> 1 or
     (select count(*) from pg_catalog.pg_shdepend
      where refclassid = 'pg_authid'::regclass and refobjid = target_oid
        and deptype in ('o', 'a')) <> 1 then
    raise exception '020F exact dependency set does not match';
  end if;
end
$preflight$;

set role pg_database_owner;
revoke usage on schema public from pp_audit_020e_20260720;
reset role;

do $post_revoke$
declare
  target_oid oid;
begin
  select oid into target_oid from pg_catalog.pg_roles
  where rolname = 'pp_audit_020e_20260720';
  if target_oid is null then
    raise exception '020F role disappeared before exact drop';
  end if;
  if exists (select 1 from pg_catalog.pg_class where relowner = target_oid) or
     exists (select 1 from pg_catalog.pg_stat_activity
             where usename = 'pp_audit_020e_20260720') or
     exists (select 1 from pg_catalog.pg_shdepend
             where refclassid = 'pg_authid'::regclass
               and refobjid = target_oid and deptype in ('o', 'a')) then
    raise exception '020F dependency remains after exact ACL revoke';
  end if;
end
$post_revoke$;

drop role pp_audit_020e_20260720;

select
  (select count(*) from pg_catalog.pg_roles
   where rolname = 'pp_audit_020e_20260720') as remaining_role_count,
  (select count(*) from pg_catalog.pg_auth_members membership
   join pg_catalog.pg_roles granted on granted.oid = membership.roleid
   join pg_catalog.pg_roles member_role on member_role.oid = membership.member
   where granted.rolname = 'pp_audit_020e_20260720'
      or member_role.rolname = 'pp_audit_020e_20260720') as remaining_membership_count,
  (select count(*) from pg_catalog.pg_stat_activity
   where usename = 'pp_audit_020e_20260720') as remaining_session_count;
