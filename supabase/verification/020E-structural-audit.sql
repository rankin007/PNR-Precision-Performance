-- Sprint 020E project-wide structural metadata audit.
-- Catalog metadata only: no application, auth, storage, Vault, or customer rows.

begin transaction read only;
set local role pp_audit_020e_20260720;

do $assert$
declare
  role_record pg_catalog.pg_roles%rowtype;
  elevated_count bigint;
  membership_count bigint;
  owned_count bigint;
  row_privilege_count bigint;
begin
  if current_user <> 'pp_audit_020e_20260720' then
    raise exception '020E current_user assertion failed';
  end if;
  if current_setting('transaction_read_only') <> 'on' then
    raise exception '020E transaction is not read only';
  end if;

  select * into role_record from pg_catalog.pg_roles
  where rolname = 'pp_audit_020e_20260720';

  select count(*) into elevated_count from pg_catalog.pg_roles
  where rolname = 'pp_audit_020e_20260720'
    and (rolcanlogin or rolsuper or rolinherit or rolcreaterole or
         rolcreatedb or rolreplication or rolbypassrls);

  select count(*) into membership_count
  from pg_catalog.pg_auth_members membership
  join pg_catalog.pg_roles member_role on member_role.oid = membership.member
  where member_role.rolname = 'pp_audit_020e_20260720';

  select count(*) into owned_count
  from pg_catalog.pg_class object_record
  join pg_catalog.pg_roles owner_role on owner_role.oid = object_record.relowner
  where owner_role.rolname = 'pp_audit_020e_20260720';

  select count(*) into row_privilege_count
  from pg_catalog.pg_class relation
  join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
  where namespace.nspname not in ('pg_catalog', 'information_schema')
    and namespace.nspname not like 'pg_toast%'
    and relation.relkind in ('r', 'p', 'v', 'm', 'f')
    and has_table_privilege(
      'pp_audit_020e_20260720', relation.oid,
      'select,insert,update,delete,truncate,references,trigger'
    );

  if role_record.rolname is null or elevated_count <> 0 or
     membership_count <> 0 or owned_count <> 0 or row_privilege_count <> 0 then
    raise exception '020E least-privilege assertion failed';
  end if;
end
$assert$;

select current_database() as database_name, session_user as session_role,
  current_user as executing_role,
  current_setting('transaction_read_only') as transaction_read_only,
  pg_catalog.current_setting('server_version_num') as server_version_num;

select rolname, rolcanlogin, rolsuper, rolinherit, rolcreaterole, rolcreatedb,
  rolreplication, rolbypassrls
from pg_catalog.pg_roles
where rolname in ('anon', 'authenticated', 'service_role', 'pp_audit_020e_20260720')
order by rolname;

select namespace.nspname as schema_name, owner_role.rolname as owner,
  has_schema_privilege('PUBLIC', namespace.oid, 'usage') as public_usage,
  has_schema_privilege('PUBLIC', namespace.oid, 'create') as public_create,
  has_schema_privilege('anon', namespace.oid, 'usage') as anon_usage,
  has_schema_privilege('authenticated', namespace.oid, 'usage') as authenticated_usage,
  has_schema_privilege('pp_audit_020e_20260720', namespace.oid, 'usage') as audit_usage
from pg_catalog.pg_namespace namespace
join pg_catalog.pg_roles owner_role on owner_role.oid = namespace.nspowner
where namespace.nspname not like 'pg_toast%'
  and namespace.nspname not like 'pg_temp_%'
order by namespace.nspname;

select extension.extname as extension_name, extension.extversion as extension_version,
  namespace.nspname as schema_name
from pg_catalog.pg_extension extension
join pg_catalog.pg_namespace namespace on namespace.oid = extension.extnamespace
order by extension.extname;

select namespace.nspname as schema_name, relation.relname as relation_name,
  relation.relkind, owner_role.rolname as owner,
  relation.relrowsecurity as rls_enabled, relation.relforcerowsecurity as rls_forced,
  md5(coalesce(relation.relacl::text, '')) as acl_fingerprint
from pg_catalog.pg_class relation
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
join pg_catalog.pg_roles owner_role on owner_role.oid = relation.relowner
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
  and relation.relkind in ('r', 'p', 'v', 'm', 'S', 'f')
order by namespace.nspname, relation.relname;

select namespace.nspname as schema_name, relation.relname as relation_name,
  attribute.attnum as ordinal_position, attribute.attname as column_name,
  pg_catalog.format_type(attribute.atttypid, attribute.atttypmod) as data_type,
  attribute.attnotnull as not_null, attribute.attidentity as identity_kind,
  attribute.attgenerated as generated_kind,
  case when attribute_default.oid is null then null
       else md5(pg_catalog.pg_get_expr(attribute_default.adbin, attribute_default.adrelid))
  end as default_fingerprint
from pg_catalog.pg_attribute attribute
join pg_catalog.pg_class relation on relation.oid = attribute.attrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
left join pg_catalog.pg_attrdef attribute_default
  on attribute_default.adrelid = attribute.attrelid
 and attribute_default.adnum = attribute.attnum
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
  and relation.relkind in ('r', 'p', 'v', 'm', 'f')
  and attribute.attnum > 0 and not attribute.attisdropped
order by namespace.nspname, relation.relname, attribute.attnum;

select namespace.nspname as schema_name, relation.relname as relation_name,
  constraint_record.conname as constraint_name,
  constraint_record.contype as constraint_type,
  md5(pg_catalog.pg_get_constraintdef(constraint_record.oid, true)) as definition_fingerprint
from pg_catalog.pg_constraint constraint_record
join pg_catalog.pg_class relation on relation.oid = constraint_record.conrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
order by namespace.nspname, relation.relname, constraint_record.conname;

select namespace.nspname as schema_name, relation.relname as relation_name,
  index_relation.relname as index_name, index_record.indisunique as is_unique,
  index_record.indisvalid as is_valid, index_record.indisready as is_ready,
  md5(pg_catalog.pg_get_indexdef(index_record.indexrelid)) as definition_fingerprint,
  case when index_record.indpred is null then null
       else md5(pg_catalog.pg_get_expr(index_record.indpred, index_record.indrelid))
  end as predicate_fingerprint
from pg_catalog.pg_index index_record
join pg_catalog.pg_class relation on relation.oid = index_record.indrelid
join pg_catalog.pg_class index_relation on index_relation.oid = index_record.indexrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
order by namespace.nspname, relation.relname, index_relation.relname;

select namespace.nspname as schema_name, procedure.proname as routine_name,
  pg_catalog.pg_get_function_identity_arguments(procedure.oid) as identity_arguments,
  language.lanname as language, owner_role.rolname as owner,
  procedure.provolatile as volatility, procedure.prosecdef as security_definer,
  md5(coalesce(procedure.proconfig::text, '')) as configuration_fingerprint,
  md5(pg_catalog.pg_get_functiondef(procedure.oid)) as definition_fingerprint
from pg_catalog.pg_proc procedure
join pg_catalog.pg_namespace namespace on namespace.oid = procedure.pronamespace
join pg_catalog.pg_roles owner_role on owner_role.oid = procedure.proowner
join pg_catalog.pg_language language on language.oid = procedure.prolang
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
order by namespace.nspname, procedure.proname, identity_arguments;

select namespace.nspname as schema_name, relation.relname as relation_name,
  trigger_record.tgname as trigger_name, trigger_record.tgenabled as enabled_state,
  md5(pg_catalog.pg_get_triggerdef(trigger_record.oid, true)) as definition_fingerprint
from pg_catalog.pg_trigger trigger_record
join pg_catalog.pg_class relation on relation.oid = trigger_record.tgrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where not trigger_record.tgisinternal
  and namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
order by namespace.nspname, relation.relname, trigger_record.tgname;

select namespace.nspname as schema_name, relation.relname as relation_name,
  policy.polname as policy_name, policy.polpermissive as permissive,
  policy.polroles::regrole[]::text as roles, policy.polcmd as command,
  md5(coalesce(pg_catalog.pg_get_expr(policy.polqual, policy.polrelid), '')) as using_fingerprint,
  md5(coalesce(pg_catalog.pg_get_expr(policy.polwithcheck, policy.polrelid), '')) as check_fingerprint
from pg_catalog.pg_policy policy
join pg_catalog.pg_class relation on relation.oid = policy.polrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
order by namespace.nspname, relation.relname, policy.polname;

select namespace.nspname as schema_name, relation.relname as relation_name,
  coalesce(grantee_role.rolname, 'PUBLIC') as grantee,
  acl.privilege_type, acl.is_grantable
from pg_catalog.pg_class relation
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
cross join lateral pg_catalog.aclexplode(coalesce(relation.relacl, pg_catalog.acldefault(
  case when relation.relkind = 'S' then 'S'::char else 'r'::char end, relation.relowner
))) acl
left join pg_catalog.pg_roles grantee_role on grantee_role.oid = acl.grantee
where namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
  and coalesce(grantee_role.rolname, 'PUBLIC') in
    ('anon', 'authenticated', 'pp_audit_020e_20260720', 'PUBLIC')
order by namespace.nspname, relation.relname, grantee, acl.privilege_type;

select owner_role.rolname as owner,
  coalesce(namespace.nspname, '<all schemas>') as schema_name,
  default_acl.defaclobjtype as object_type,
  md5(default_acl.defaclacl::text) as acl_fingerprint
from pg_catalog.pg_default_acl default_acl
join pg_catalog.pg_roles owner_role on owner_role.oid = default_acl.defaclrole
left join pg_catalog.pg_namespace namespace on namespace.oid = default_acl.defaclnamespace
order by owner_role.rolname, schema_name, default_acl.defaclobjtype;

select target_role.rolname as role_name,
  count(*) filter (where has_table_privilege(target_role.oid, relation.oid, 'select')) as selectable_relations,
  count(*) filter (where has_table_privilege(target_role.oid, relation.oid, 'insert,update,delete,truncate')) as writable_relations
from pg_catalog.pg_roles target_role
cross join pg_catalog.pg_class relation
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where target_role.rolname in ('anon', 'authenticated', 'pp_audit_020e_20260720')
  and namespace.nspname not in ('pg_catalog', 'information_schema')
  and namespace.nspname not like 'pg_toast%'
  and relation.relkind in ('r', 'p', 'v', 'm', 'f')
group by target_role.rolname order by target_role.rolname;

select publication.pubname as publication_name, publication.puballtables as all_tables,
  publication.pubinsert, publication.pubupdate, publication.pubdelete, publication.pubtruncate
from pg_catalog.pg_publication publication order by publication.pubname;

select publication.pubname as publication_name, namespace.nspname as schema_name,
  relation.relname as relation_name
from pg_catalog.pg_publication_rel publication_relation
join pg_catalog.pg_publication publication on publication.oid = publication_relation.prpubid
join pg_catalog.pg_class relation on relation.oid = publication_relation.prrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
order by publication.pubname, namespace.nspname, relation.relname;

select count(*) filter (where relation.relname in (
    'biochemistry_lookup_values', 'biochemistry_horse_access_assignments',
    'biochemistry_tests', 'biochemistry_test_uploads', 'biochemistry_test_notes'
  ) and relation.relrowsecurity) as biochemistry_rls_table_count,
  count(*) filter (where relation.relname in (
    'biochemistry_lookup_values', 'biochemistry_horse_access_assignments',
    'biochemistry_tests', 'biochemistry_test_uploads', 'biochemistry_test_notes'
  )) as biochemistry_table_count
from pg_catalog.pg_class relation
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname = 'public' and relation.relkind in ('r', 'p');

select count(*) as biochemistry_policy_count
from pg_catalog.pg_policy policy
join pg_catalog.pg_class relation on relation.oid = policy.polrelid
join pg_catalog.pg_namespace namespace on namespace.oid = relation.relnamespace
where namespace.nspname = 'public' and relation.relname like 'biochemistry_%';

select count(*) as biochemistry_helper_count
from pg_catalog.pg_proc procedure
join pg_catalog.pg_namespace namespace on namespace.oid = procedure.pronamespace
where namespace.nspname = 'public' and procedure.proname in (
  'can_read_biochemistry_horse', 'can_write_biochemistry_horse',
  'can_soft_delete_biochemistry_horse'
);

select count(*) as biochemistry_explicit_index_count
from pg_catalog.pg_class index_relation
join pg_catalog.pg_namespace namespace on namespace.oid = index_relation.relnamespace
where namespace.nspname = 'public' and index_relation.relkind = 'i'
  and index_relation.relname in (
    'idx_biochemistry_lookup_values_lookup', 'idx_biochemistry_horse_access_user',
    'idx_biochemistry_tests_horse_tested_at', 'idx_biochemistry_tests_active_horse',
    'idx_biochemistry_test_uploads_test', 'idx_biochemistry_test_notes_test',
    'idx_biochemistry_test_notes_active_test'
  );

select count(*) as remote_migration_history_count
from supabase_migrations.schema_migrations
where version in ('0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009');

rollback;
