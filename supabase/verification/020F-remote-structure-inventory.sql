-- Sprint 020F sanitized metadata-only inventory; no application/Auth/Storage/Vault rows.
begin transaction read only;
do $a$ begin
  if current_setting('transaction_read_only') <> 'on' then raise exception '020F requires read only'; end if;
end $a$;

select n.nspname schema_name,r.rolname owner from pg_catalog.pg_namespace n
join pg_catalog.pg_roles r on r.oid=n.nspowner
where n.nspname not like 'pg_toast%' and n.nspname not like 'pg_temp_%' order by 1;
select e.extname,e.extversion,n.nspname schema_name from pg_catalog.pg_extension e
join pg_catalog.pg_namespace n on n.oid=e.extnamespace order by 1;
select n.nspname schema_name,c.relname relation_name,c.relkind,r.rolname owner,
 c.relrowsecurity rls_enabled,c.relforcerowsecurity rls_forced,md5(coalesce(c.relacl::text,'')) acl_fingerprint
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
join pg_catalog.pg_roles r on r.oid=c.relowner
where n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%'
and c.relkind in ('r','p','v','m','S','f') order by 1,2;
select n.nspname schema_name,c.relname relation_name,count(*) column_count,
 md5(string_agg(a.attnum||':'||a.attname||':'||pg_catalog.format_type(a.atttypid,a.atttypmod)||':'||
 a.attnotnull||':'||coalesce(md5(pg_catalog.pg_get_expr(d.adbin,d.adrelid)),''),'|' order by a.attnum)) column_fingerprint
from pg_catalog.pg_attribute a join pg_catalog.pg_class c on c.oid=a.attrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace left join pg_catalog.pg_attrdef d on d.adrelid=a.attrelid and d.adnum=a.attnum
where n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%'
and c.relkind in ('r','p','v','m','f') and a.attnum>0 and not a.attisdropped group by 1,2 order by 1,2;
select n.nspname schema_name,c.relname relation_name,k.conname constraint_name,k.contype,
 md5(pg_catalog.pg_get_constraintdef(k.oid,true)) definition_fingerprint
from pg_catalog.pg_constraint k join pg_catalog.pg_class c on c.oid=k.conrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%' order by 1,2,3;
select n.nspname schema_name,c.relname relation_name,i.relname index_name,x.indisunique,x.indisvalid,
 md5(pg_catalog.pg_get_indexdef(x.indexrelid)) definition_fingerprint
from pg_catalog.pg_index x join pg_catalog.pg_class c on c.oid=x.indrelid join pg_catalog.pg_class i on i.oid=x.indexrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%' order by 1,2,3;
select n.nspname schema_name,p.proname routine_name,pg_catalog.pg_get_function_identity_arguments(p.oid) identity_arguments,
 l.lanname language,r.rolname owner,p.prosecdef security_definer,md5(coalesce(p.proconfig::text,'')) config_fingerprint,
 md5(pg_catalog.pg_get_functiondef(p.oid)) definition_fingerprint
from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace
join pg_catalog.pg_roles r on r.oid=p.proowner join pg_catalog.pg_language l on l.oid=p.prolang
where n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%' order by 1,2,3;
select n.nspname schema_name,c.relname relation_name,t.tgname trigger_name,t.tgenabled,
 md5(pg_catalog.pg_get_triggerdef(t.oid,true)) definition_fingerprint
from pg_catalog.pg_trigger t join pg_catalog.pg_class c on c.oid=t.tgrelid join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where not t.tgisinternal and n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%' order by 1,2,3;
select n.nspname schema_name,c.relname relation_name,p.polname policy_name,p.polpermissive,p.polroles::regrole[]::text roles,p.polcmd,
 md5(coalesce(pg_catalog.pg_get_expr(p.polqual,p.polrelid),'')) using_fingerprint,
 md5(coalesce(pg_catalog.pg_get_expr(p.polwithcheck,p.polrelid),'')) check_fingerprint
from pg_catalog.pg_policy p join pg_catalog.pg_class c on c.oid=p.polrelid join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%' order by 1,2,3;
select n.nspname schema_name,c.relname relation_name,coalesce(g.rolname,'PUBLIC') grantee,a.privilege_type,a.is_grantable
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
cross join lateral pg_catalog.aclexplode(coalesce(c.relacl,pg_catalog.acldefault(case when c.relkind='S' then 'S'::"char" else 'r'::"char" end,c.relowner))) a
left join pg_catalog.pg_roles g on g.oid=a.grantee where n.nspname not in ('pg_catalog','information_schema')
and n.nspname not like 'pg_toast%' and coalesce(g.rolname,'PUBLIC') in ('PUBLIC','anon','authenticated') order by 1,2,3,4;
select r.rolname owner,coalesce(n.nspname,'<all schemas>') schema_name,d.defaclobjtype,
 md5(d.defaclacl::text) acl_fingerprint from pg_catalog.pg_default_acl d join pg_catalog.pg_roles r on r.oid=d.defaclrole
left join pg_catalog.pg_namespace n on n.oid=d.defaclnamespace order by 1,2,3;
select t.rolname role_name,count(*) filter(where has_table_privilege(t.oid,c.oid,'select')) selectable_relations,
 count(*) filter(where has_table_privilege(t.oid,c.oid,'insert,update,delete,truncate')) writable_relations
from pg_catalog.pg_roles t cross join pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where t.rolname in ('anon','authenticated') and n.nspname not in ('pg_catalog','information_schema')
and n.nspname not like 'pg_toast%' and c.relkind in ('r','p','v','m','f') group by 1 order by 1;
select pubname,puballtables,pubinsert,pubupdate,pubdelete,pubtruncate from pg_catalog.pg_publication order by 1;
select count(*) filter(where c.relname in ('biochemistry_lookup_values','biochemistry_horse_access_assignments','biochemistry_tests','biochemistry_test_uploads','biochemistry_test_notes')) biochemistry_table_count,
count(*) filter(where c.relname in ('biochemistry_lookup_values','biochemistry_horse_access_assignments','biochemistry_tests','biochemistry_test_uploads','biochemistry_test_notes') and c.relrowsecurity) biochemistry_rls_table_count
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind in ('r','p');
select count(*) remote_migration_history_relation_count
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname='supabase_migrations' and c.relname='schema_migrations' and c.relkind in ('r','p');
select jsonb_build_object(
  'schemas',(select jsonb_agg(nspname order by nspname) from pg_catalog.pg_namespace where nspname not like 'pg_toast%' and nspname not like 'pg_temp_%'),
  'extensions',(select jsonb_agg(extname order by extname) from pg_catalog.pg_extension),
  'public_relations',(select jsonb_agg(relname order by relname) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind in ('r','p','v','m','S','f')),
  'public_functions',(select jsonb_agg(p.proname order by p.proname) from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public'),
  'public_policy_count',(select count(*) from pg_catalog.pg_policy p join pg_catalog.pg_class c on c.oid=p.polrelid join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public'),
  'public_trigger_count',(select count(*) from pg_catalog.pg_trigger t join pg_catalog.pg_class c on c.oid=t.tgrelid join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and not t.tgisinternal),
  'ambient_public_relations',(select jsonb_agg(x.relation order by x.relation) from (select distinct n.nspname||'.'||c.relname relation from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace cross join lateral pg_catalog.aclexplode(c.relacl) a where c.relacl is not null and a.grantee=0 and n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%') x),
  'public_acl_sources',(select jsonb_agg(jsonb_build_object('relation',n.nspname||'.'||c.relname,'privilege',a.privilege_type,'grantor',g.rolname) order by n.nspname,c.relname,a.privilege_type) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace cross join lateral pg_catalog.aclexplode(c.relacl) a left join pg_catalog.pg_roles g on g.oid=a.grantor where c.relacl is not null and a.grantee=0 and n.nspname not in ('pg_catalog','information_schema') and n.nspname not like 'pg_toast%'),
  'biochemistry_table_count',(select count(*) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind in ('r','p') and c.relname in ('biochemistry_lookup_values','biochemistry_horse_access_assignments','biochemistry_tests','biochemistry_test_uploads','biochemistry_test_notes')),
  'biochemistry_policy_count',(select count(*) from pg_catalog.pg_policy p join pg_catalog.pg_class c on c.oid=p.polrelid join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'biochemistry_%'),
  'migration_history_relation_count',(select count(*) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='supabase_migrations' and c.relname='schema_migrations' and c.relkind in ('r','p'))
) sanitized_inventory_summary;
rollback;
