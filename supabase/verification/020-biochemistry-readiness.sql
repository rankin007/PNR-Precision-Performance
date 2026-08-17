-- Sprint 020 read-only remote inventory and post-apply verification.
-- Intended project ref: tagnbgkroihagjmvehlx
-- Reviewed migration SHA-256:
-- 6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9
--
-- This script reads PostgreSQL catalogs and lookup counts only. It does not
-- create, alter, insert, update, delete, grant, or change remote settings.

select
  current_database() as database_name,
  current_user as executing_role,
  version() as postgres_version;

with expected(object_name) as (
  values
    ('biochemistry_lookup_values'),
    ('biochemistry_horse_access_assignments'),
    ('biochemistry_tests'),
    ('biochemistry_test_uploads'),
    ('biochemistry_test_notes')
)
select
  e.object_name,
  c.oid is not null as exists,
  coalesce(c.relrowsecurity, false) as rls_enabled
from expected e
left join pg_namespace n on n.nspname = 'public'
left join pg_class c on c.relnamespace = n.oid
  and c.relname = e.object_name
  and c.relkind in ('r', 'p')
order by e.object_name;

with expected(function_name) as (
  values
    ('can_read_biochemistry_horse'),
    ('can_write_biochemistry_horse'),
    ('can_soft_delete_biochemistry_horse')
)
select
  e.function_name,
  count(p.oid) = 1 as exists_once,
  bool_and(p.prosecdef) as security_definer
from expected e
left join pg_namespace n on n.nspname = 'public'
left join pg_proc p on p.pronamespace = n.oid and p.proname = e.function_name
group by e.function_name
order by e.function_name;

with expected(policy_name) as (
  values
    ('biochemistry_lookup_values_read_authenticated'),
    ('biochemistry_lookup_values_admin_manage'),
    ('biochemistry_horse_access_select_related_or_admin'),
    ('biochemistry_horse_access_manage_trainer_or_admin'),
    ('biochemistry_tests_select_accessible'),
    ('biochemistry_tests_insert_writable'),
    ('biochemistry_tests_update_writable_or_delete_allowed'),
    ('biochemistry_uploads_select_accessible'),
    ('biochemistry_uploads_insert_writable'),
    ('biochemistry_uploads_update_writable_or_delete_allowed'),
    ('biochemistry_notes_select_accessible'),
    ('biochemistry_notes_insert_writable'),
    ('biochemistry_notes_update_writable_or_delete_allowed')
)
select
  e.policy_name,
  p.policyname is not null as exists,
  p.tablename,
  p.cmd,
  p.roles
from expected e
left join pg_policies p on p.schemaname = 'public' and p.policyname = e.policy_name
order by e.policy_name;

select
  i.tablename,
  i.indexname,
  i.indexdef
from pg_indexes i
where i.schemaname = 'public'
  and i.indexname in (
    'idx_biochemistry_lookup_values_type_reading',
    'idx_biochemistry_horse_access_horse_id',
    'idx_biochemistry_horse_access_member_profile_id',
    'idx_biochemistry_tests_horse_date',
    'idx_biochemistry_tests_unique_active_horse_date_time',
    'idx_biochemistry_test_uploads_test_id',
    'idx_biochemistry_test_notes_test_id'
  )
order by i.indexname;

-- POST-APPLY ONLY: uncomment this block after the catalog inventory confirms
-- public.biochemistry_lookup_values exists. Keeping it commented makes the
-- preflight safe when migration 0009 is completely unapplied.
-- select
--   lookup_type,
--   count(*) as actual_count,
--   count(distinct (exact_reading, source_version)) as unique_reading_version_count,
--   case lookup_type
--     when 'carbs' then 151
--     when 'ph_average' then 521
--     when 'salts' then 801
--     when 'urea' then 301
--   end as expected_count
-- from public.biochemistry_lookup_values
-- group by lookup_type
-- order by lookup_type;
