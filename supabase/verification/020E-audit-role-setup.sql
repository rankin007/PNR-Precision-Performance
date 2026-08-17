-- Sprint 020E exact temporary NOLOGIN audit-role setup.
-- Authorized production mutation: create only pp_audit_020e_20260720.

do $setup$
begin
  if exists (
    select 1 from pg_catalog.pg_roles
    where rolname = 'pp_audit_020e_20260720'
  ) then
    raise exception '020E audit role already exists; stop without adopting it';
  end if;

  create role pp_audit_020e_20260720
    nologin
    nosuperuser
    nocreatedb
    nocreaterole
    noinherit
    noreplication
    nobypassrls;
end
$setup$;

grant usage on schema public to pp_audit_020e_20260720;

select
  rolname,
  rolcanlogin,
  rolsuper,
  rolinherit,
  rolcreaterole,
  rolcreatedb,
  rolreplication,
  rolbypassrls
from pg_catalog.pg_roles
where rolname = 'pp_audit_020e_20260720';

select count(*) as membership_count
from pg_catalog.pg_auth_members membership
join pg_catalog.pg_roles member_role on member_role.oid = membership.member
where member_role.rolname = 'pp_audit_020e_20260720';

select count(*) as owned_object_count
from pg_catalog.pg_class object_record
join pg_catalog.pg_roles owner_role on owner_role.oid = object_record.relowner
where owner_role.rolname = 'pp_audit_020e_20260720';

select
  has_schema_privilege('pp_audit_020e_20260720', 'public', 'usage') as public_usage,
  has_schema_privilege('pp_audit_020e_20260720', 'public', 'create') as public_create;
