-- Read-only Sprint 021 structural verification. Returns counts and booleans only.
select jsonb_build_object(
  'migration_0011', exists(select 1 from supabase_migrations.schema_migrations where version = '0011'),
  'stable_role_table', to_regclass('public.stable_role_assignments') is not null,
  'primary_role_column', exists(select 1 from information_schema.columns where table_schema='public' and table_name='users' and column_name='primary_role_code'),
  'comment_audit_columns', (select count(*) from information_schema.columns where table_schema='public' and table_name='biochemistry_test_notes' and column_name in ('updated_at','updated_by_user_id')),
  'rls_enabled', coalesce((select relrowsecurity from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='stable_role_assignments'),false),
  'new_helpers', (select count(*) from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('is_active_app_user','current_primary_role','has_active_stable_role','has_explicit_horse_role','can_comment_biochemistry_horse','can_manage_biochemistry_comment')),
  'anon_new_helper_exec', (select count(*) from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('is_active_app_user','current_primary_role','has_active_stable_role','has_explicit_horse_role','can_comment_biochemistry_horse','can_manage_biochemistry_comment') and has_function_privilege('anon',p.oid,'EXECUTE')),
  'public_new_helper_exec', (select count(*) from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('is_active_app_user','current_primary_role','has_active_stable_role','has_explicit_horse_role','can_comment_biochemistry_horse','can_manage_biochemistry_comment') and has_function_privilege('public',p.oid,'EXECUTE'))
);
