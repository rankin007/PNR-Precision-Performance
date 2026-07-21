-- Sprint 020C metadata-only database audit.
-- Intended project ref: tagnbgkroihagjmvehlx
-- Expected temporary NOLOGIN role: pp_audit_020e_20260720
--
-- This file reads PostgreSQL catalogs only. It does not read application rows
-- and contains no create, alter, grant, revoke, insert, update, delete, or drop.

begin transaction read only;
set local role pp_audit_020e_20260720;

select
  current_database() as database_name,
  current_user as executing_role,
  session_user as session_role,
  current_setting('transaction_read_only') as transaction_read_only;

select
  rolname,
  rolsuper,
  rolinherit,
  rolcreaterole,
  rolcreatedb,
  rolcanlogin,
  rolreplication,
  rolbypassrls,
  rolconnlimit,
  rolvaliduntil
from pg_roles
where rolname = current_user;

select granted.rolname as granted_role
from pg_auth_members membership
join pg_roles member on member.oid = membership.member
join pg_roles granted on granted.oid = membership.roleid
where member.rolname = current_user
order by granted.rolname;

select
  count(*) as owned_object_count
from pg_class object
join pg_roles owner on owner.oid = object.relowner
where owner.rolname = current_user;

with expected(table_name) as (
  values
    ('biochemistry_lookup_values'),
    ('biochemistry_horse_access_assignments'),
    ('biochemistry_tests'),
    ('biochemistry_test_uploads'),
    ('biochemistry_test_notes')
)
select
  expected.table_name,
  object.relkind,
  owner.rolname as owner,
  object.relrowsecurity as rls_enabled,
  object.relforcerowsecurity as rls_forced
from expected
left join pg_namespace namespace on namespace.nspname = 'public'
left join pg_class object
  on object.relnamespace = namespace.oid
 and object.relname = expected.table_name
 and object.relkind in ('r', 'p')
left join pg_roles owner on owner.oid = object.relowner
order by expected.table_name;

select
  relation.relname as table_name,
  attribute.attnum as ordinal_position,
  attribute.attname as column_name,
  pg_catalog.format_type(attribute.atttypid, attribute.atttypmod) as data_type,
  not attribute.attnotnull as is_nullable,
  pg_get_expr(attribute_default.adbin, attribute_default.adrelid) as column_default
from pg_attribute attribute
join pg_class relation on relation.oid = attribute.attrelid
join pg_namespace namespace on namespace.oid = relation.relnamespace
left join pg_attrdef attribute_default
  on attribute_default.adrelid = attribute.attrelid
 and attribute_default.adnum = attribute.attnum
where namespace.nspname = 'public'
  and relation.relname in (
    'biochemistry_lookup_values',
    'biochemistry_horse_access_assignments',
    'biochemistry_tests',
    'biochemistry_test_uploads',
    'biochemistry_test_notes'
  )
  and attribute.attnum > 0
  and not attribute.attisdropped
order by relation.relname, attribute.attnum;

select
  relation.relname as table_name,
  constraint_record.conname as constraint_name,
  constraint_record.contype as constraint_type,
  pg_get_constraintdef(constraint_record.oid, true) as definition
from pg_constraint constraint_record
join pg_class relation on relation.oid = constraint_record.conrelid
join pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname = 'public'
  and relation.relname like 'biochemistry_%'
order by relation.relname, constraint_record.conname;

select
  relation.relname as table_name,
  index_relation.relname as index_name,
  index_record.indisunique as is_unique,
  index_record.indisvalid as is_valid,
  pg_get_indexdef(index_record.indexrelid) as definition
from pg_index index_record
join pg_class relation on relation.oid = index_record.indrelid
join pg_class index_relation on index_relation.oid = index_record.indexrelid
join pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname = 'public'
  and relation.relname like 'biochemistry_%'
order by relation.relname, index_relation.relname;

select
  policy.polname as policy_name,
  relation.relname as table_name,
  policy.polpermissive as permissive,
  policy.polroles::regrole[] as roles,
  policy.polcmd as command,
  pg_get_expr(policy.polqual, policy.polrelid) as using_expression,
  pg_get_expr(policy.polwithcheck, policy.polrelid) as check_expression
from pg_policy policy
join pg_class relation on relation.oid = policy.polrelid
join pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname = 'public'
  and relation.relname like 'biochemistry_%'
order by relation.relname, policy.polname;

select
  procedure.proname as function_name,
  pg_get_function_identity_arguments(procedure.oid) as arguments,
  owner.rolname as owner,
  procedure.prosecdef as security_definer,
  procedure.proconfig as configuration,
  md5(pg_get_functiondef(procedure.oid)) as definition_fingerprint
from pg_proc procedure
join pg_namespace namespace on namespace.oid = procedure.pronamespace
join pg_roles owner on owner.oid = procedure.proowner
where namespace.nspname = 'public'
  and procedure.proname in (
    'can_read_biochemistry_horse',
    'can_write_biochemistry_horse',
    'can_soft_delete_biochemistry_horse'
  )
order by procedure.proname;

with roles(role_name) as (
  values ('anon'), ('authenticated'), ('pp_audit_020e_20260720')
), tables(table_name) as (
  values
    ('biochemistry_lookup_values'),
    ('biochemistry_horse_access_assignments'),
    ('biochemistry_tests'),
    ('biochemistry_test_uploads'),
    ('biochemistry_test_notes')
)
select
  roles.role_name,
  tables.table_name,
  has_table_privilege(roles.role_name, format('public.%I', tables.table_name), 'select') as can_select,
  has_table_privilege(roles.role_name, format('public.%I', tables.table_name), 'insert') as can_insert,
  has_table_privilege(roles.role_name, format('public.%I', tables.table_name), 'update') as can_update,
  has_table_privilege(roles.role_name, format('public.%I', tables.table_name), 'delete') as can_delete
from roles
cross join tables
order by roles.role_name, tables.table_name;

select
  procedure.proname as function_name,
  coalesce(grantee.rolname, 'PUBLIC') as grantee,
  acl.privilege_type,
  acl.is_grantable
from pg_proc procedure
join pg_namespace namespace on namespace.oid = procedure.pronamespace
cross join lateral aclexplode(
  coalesce(procedure.proacl, acldefault('f', procedure.proowner))
) acl
left join pg_roles grantee on grantee.oid = acl.grantee
where namespace.nspname = 'public'
  and procedure.proname in (
    'can_read_biochemistry_horse',
    'can_write_biochemistry_horse',
    'can_soft_delete_biochemistry_horse'
  )
order by procedure.proname, grantee, acl.privilege_type;

with roles(role_name) as (
  values ('anon'), ('authenticated'), ('pp_audit_020e_20260720')
), functions(function_name) as (
  values
    ('can_read_biochemistry_horse'),
    ('can_write_biochemistry_horse'),
    ('can_soft_delete_biochemistry_horse')
)
select
  roles.role_name,
  functions.function_name,
  has_function_privilege(
    roles.role_name,
    format('public.%I(uuid)', functions.function_name),
    'execute'
  ) as can_execute
from roles
cross join functions
order by roles.role_name, functions.function_name;

select
  defaclrole::regrole::text as owner,
  coalesce(namespace.nspname, '<all schemas>') as schema_name,
  defaclobjtype as object_type,
  defaclacl::text as default_acl
from pg_default_acl default_acl
left join pg_namespace namespace on namespace.oid = default_acl.defaclnamespace
where namespace.nspname = 'public' or namespace.oid is null
order by owner, schema_name, object_type;

rollback;
