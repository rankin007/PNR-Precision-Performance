-- Sprint 020G clean-candidate verification. Metadata and deterministic seed counts only.
begin transaction read only;
do $verify$
declare
  legacy_count bigint; helper_count bigint; safe_helper_count bigint;
  public_execute_count bigint; anon_execute_count bigint; authenticated_execute_count bigint;
begin
  if current_setting('transaction_read_only') <> 'on' then raise exception '020G requires read only'; end if;
  select count(*) into legacy_count from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
  where n.nspname='public' and c.relname in ('Test User','Test User_id_seq','client_applications','etrakka_sessions',
    'etrakka_biochem_comparison','horse_biochemistry_results','horse_gallery_items');
  select count(*),count(*) filter(where p.prosecdef and p.proconfig @> array['search_path=pg_catalog, public'])
  into helper_count,safe_helper_count from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.proname in ('current_app_user_id','has_permission','is_admin','current_member_profile_id',
    'can_access_horse','can_manage_horse_records','has_stable_scope','can_write_stable_scope',
    'can_read_biochemistry_horse','can_write_biochemistry_horse','can_soft_delete_biochemistry_horse');
  select count(*) into public_execute_count from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.proname in ('current_app_user_id','has_permission','is_admin','current_member_profile_id',
    'can_access_horse','can_manage_horse_records','has_stable_scope','can_write_stable_scope',
    'can_read_biochemistry_horse','can_write_biochemistry_horse','can_soft_delete_biochemistry_horse')
    and exists (select 1 from pg_catalog.aclexplode(coalesce(p.proacl,pg_catalog.acldefault('f'::"char",p.proowner))) a
      where a.grantee=0 and a.privilege_type='EXECUTE');
  select count(*) into anon_execute_count from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.proname in ('current_app_user_id','has_permission','is_admin','current_member_profile_id',
    'can_access_horse','can_manage_horse_records','has_stable_scope','can_write_stable_scope',
    'can_read_biochemistry_horse','can_write_biochemistry_horse','can_soft_delete_biochemistry_horse')
    and has_function_privilege('anon',p.oid,'EXECUTE');
  select count(*) into authenticated_execute_count from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace
  where n.nspname='public' and p.proname in ('current_app_user_id','has_permission','is_admin','current_member_profile_id',
    'can_access_horse','can_manage_horse_records','has_stable_scope','can_write_stable_scope',
    'can_read_biochemistry_horse','can_write_biochemistry_horse','can_soft_delete_biochemistry_horse')
    and has_function_privilege('authenticated',p.oid,'EXECUTE');  if legacy_count<>0 or helper_count<>11 or safe_helper_count<>11 or public_execute_count<>0 or anon_execute_count<>0 or authenticated_execute_count<>11
    then raise exception '020G clean-candidate security assertion failed'; end if;
end $verify$;
select count(*) public_table_count,count(*) filter(where c.relrowsecurity) rls_table_count
from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace
where n.nspname='public' and c.relkind in ('r','p');
select count(*) policy_count from pg_catalog.pg_policy p join pg_catalog.pg_class c on c.oid=p.polrelid
join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public';
select lookup_type,count(*) row_count from public.biochemistry_lookup_values group by lookup_type order by lookup_type;
select count(*) total_lookup_count,count(*)-count(distinct (lookup_type,exact_reading,source_version)) duplicate_key_count
from public.biochemistry_lookup_values;
select count(*) migration_version_count from supabase_migrations.schema_migrations
where version in ('0001','0002','0003','0004','0005','0006','0007','0008','0009','0010');
rollback;
