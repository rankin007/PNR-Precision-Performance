-- Candidate only: Sprint 023E does not apply this migration.
-- Inventory gate MUST precede all mutation/backfill/constraint replacement.
do $$
declare discrepancies bigint;
begin
  select count(*) into discrepancies
  from public.biochemistry_test_uploads u
  left join public.biochemistry_tests t on t.id = u.test_id
  left join public.horses h on h.id = u.horse_id
  where t.id is null or h.id is null or t.horse_id <> u.horse_id or t.stable_id is null
     or u.size_bytes < 1 or u.size_bytes > 5242880
     or (u.deleted_at is null) <> (u.deleted_by_user_id is null)
     or u.file_category not in ('pdf','csv','png','jpg','jpeg','photo')
     or (u.file_category = 'photo' and not (
       (lower(u.file_name) ~ '\.(jpe?g)$' and lower(u.content_type) = 'image/jpeg') or
       (lower(u.file_name) ~ '\.png$' and lower(u.content_type) = 'image/png')));
  if discrepancies <> 0 then
    raise exception 'test evidence legacy inventory requires governed remediation';
  end if;
  if exists (select 1 from public.biochemistry_test_uploads group by storage_path having count(*) > 1) then
    raise exception 'test evidence legacy storage path collision';
  end if;
end $$;

alter table public.biochemistry_tests
  add constraint biochemistry_tests_id_horse_stable_uq unique (id, horse_id, stable_id);

alter table public.biochemistry_test_uploads
  add column stable_id uuid,
  add column object_id uuid default gen_random_uuid(),
  add column bucket_id text,
  add column object_key text,
  add column display_name text,
  add column extension text,
  add column declared_mime text,
  add column detected_mime text,
  add column sha256_hex text,
  add column state text,
  add column prior_state text,
  add column reason_code text,
  add column version_group_id uuid,
  add column version_no integer,
  add column replaces_id uuid references public.biochemistry_test_uploads(id) on delete restrict,
  add column replaced_by_id uuid references public.biochemistry_test_uploads(id) on delete restrict,
  add column acknowledgement_at timestamptz,
  add column available_at timestamptz,
  add column restore_until timestamptz,
  add column purge_eligible_at timestamptz,
  add column reconciliation_attempts smallint not null default 0,
  add column reconciled_at timestamptz,
  add column scanner_name text,
  add column scanner_version text,
  add column scan_outcome text,
  add column sanitiser_name text,
  add column sanitiser_version text,
  add column sanitisation_outcome text;

update public.biochemistry_test_uploads u set
  stable_id = t.stable_id,
  object_id = coalesce(u.object_id, gen_random_uuid()),
  display_name = u.file_name,
  extension = lower(substring(u.file_name from '\.([A-Za-z0-9]+)$')),
  declared_mime = lower(u.content_type),
  file_category = case
    when lower(u.file_name) ~ '\.(jpe?g)$' and lower(u.content_type)='image/jpeg' then 'jpeg'
    when lower(u.file_name) ~ '\.png$' and lower(u.content_type)='image/png' then 'png'
    when lower(u.file_name) ~ '\.pdf$' and lower(u.content_type)='application/pdf' then 'pdf'
    when lower(u.file_name) ~ '\.csv$' and lower(u.content_type) in ('text/csv','application/csv') then 'csv'
  end,
  state = case when u.deleted_at is null then 'legacy_unverified' else 'soft_deleted' end,
  prior_state = case when u.deleted_at is not null then 'legacy_unverified' end,
  reason_code = 'legacy_backfill_unverified',
  version_group_id = u.id,
  version_no = 1,
  restore_until = case when u.deleted_at is not null then u.deleted_at + interval '30 days' end,
  purge_eligible_at = case when u.deleted_at is not null then u.deleted_at + interval '30 days' end
from public.biochemistry_tests t where t.id = u.test_id;

alter table public.biochemistry_test_uploads
  drop constraint biochemistry_test_uploads_file_category_check,
  drop constraint biochemistry_test_uploads_size_bytes_check,
  alter column stable_id set not null,
  alter column object_id set not null,
  alter column display_name set not null,
  alter column extension set not null,
  alter column declared_mime set not null,
  alter column state set default 'initiated', alter column state set not null,
  alter column version_group_id set not null,
  alter column version_no set default 1, alter column version_no set not null,
  add constraint uploads_object_id_uq unique (object_id),
  add constraint uploads_test_horse_stable_fk foreign key (test_id,horse_id,stable_id)
    references public.biochemistry_tests(id,horse_id,stable_id) on delete cascade,
  add constraint uploads_category_check check (file_category in ('jpeg','png','pdf','csv')),
  add constraint uploads_size_check check (size_bytes between 1 and 5242880),
  add constraint uploads_state_check check (state in ('initiated','upload_pending','uploaded_unverified','legacy_unverified','validation_failed','scan_pending','sanitisation_pending','available','blocked','failed','soft_deleted','restore_pending','purge_pending','purged','object_missing')),
  add constraint uploads_object_pair_check check ((bucket_id is null) = (object_key is null)),
  add constraint uploads_hash_check check (sha256_hex is null or sha256_hex ~ '^[0-9a-f]{64}$'),
  add constraint uploads_available_check check (state <> 'available' or (bucket_id is not null and object_key is not null and detected_mime is not null and sha256_hex is not null and available_at is not null and scan_outcome='clean' and sanitisation_outcome='passed')),
  add constraint uploads_deleted_state_check check (state not in ('soft_deleted','restore_pending','purge_pending','purged') or deleted_at is not null),
  add constraint uploads_version_positive_check check (version_no > 0),
  add constraint uploads_not_self_replace_check check (replaces_id is null or replaces_id <> id),
  add constraint uploads_not_self_replaced_by_check check (replaced_by_id is null or replaced_by_id <> id);

create unique index uploads_object_key_uq on public.biochemistry_test_uploads(bucket_id,object_key) where object_key is not null;
create unique index uploads_version_uq on public.biochemistry_test_uploads(version_group_id,version_no);
create index uploads_scope_state_ix on public.biochemistry_test_uploads(stable_id,horse_id,test_id,state);
create index uploads_reconcile_ix on public.biochemistry_test_uploads(state,created_at);

create table public.evidence_csv_registry (
  id uuid primary key default gen_random_uuid(), source_name text not null,
  template_id text not null, version text not null, ordered_schema jsonb not null,
  formula_policy text not null, enabled boolean not null default false,
  approved_by_user_id uuid references public.users(id) on delete set null,
  approved_at timestamptz, unique(source_name,template_id,version)
);
alter table public.biochemistry_test_uploads add column csv_registry_id uuid references public.evidence_csv_registry(id) on delete restrict;

create table public.evidence_upload_attempts (
  id uuid primary key default gen_random_uuid(), idempotency_key_hash text not null,
  user_id uuid not null references public.users(id) on delete cascade,
  test_id uuid not null, horse_id uuid not null, stable_id uuid not null,
  upload_id uuid not null references public.biochemistry_test_uploads(id) on delete cascade,
  bucket_id text not null, object_key text not null, declared_name text not null,
  declared_mime text not null, declared_bytes integer not null check (declared_bytes between 1 and 5242880),
  reserved_bytes integer not null check (reserved_bytes=declared_bytes),
  state text not null check (state in ('active','completed','cancelled','expired','failed')),
  created_at timestamptz not null default now(), expires_at timestamptz not null,
  unique(user_id,idempotency_key_hash), unique(bucket_id,object_key),
  foreign key(test_id,horse_id,stable_id) references public.biochemistry_tests(id,horse_id,stable_id) on delete cascade
);

create table public.evidence_holds (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.biochemistry_test_uploads(id) on delete cascade,
  reason_code text not null, owner_user_id uuid not null references public.users(id) on delete restrict,
  starts_at timestamptz not null default now(), review_at timestamptz not null,
  released_at timestamptz, released_by_user_id uuid references public.users(id) on delete restrict,
  check ((released_at is null) = (released_by_user_id is null))
);

create table public.evidence_audit_events (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid references public.biochemistry_test_uploads(id) on delete set null,
  stable_id uuid references public.stables(id) on delete set null,
  horse_id uuid references public.horses(id) on delete set null,
  test_id uuid references public.biochemistry_tests(id) on delete set null,
  event_type text not null, actor_user_id uuid references public.users(id) on delete set null,
  role_snapshot text, outcome text not null, reason_code text,
  occurred_at timestamptz not null default now(), correlation_id uuid
);

create or replace function public.validate_evidence_lineage() returns trigger language plpgsql security invoker as $$
declare predecessor public.biochemistry_test_uploads;
begin
  if tg_op='UPDATE' and (new.object_id<>old.object_id or new.version_group_id<>old.version_group_id or new.version_no<>old.version_no or new.test_id<>old.test_id) then
    raise exception 'immutable evidence identity';
  end if;
  if new.replaces_id is not null then
    select * into predecessor from public.biochemistry_test_uploads where id=new.replaces_id;
    if predecessor.id is null or predecessor.test_id<>new.test_id or predecessor.version_group_id<>new.version_group_id or predecessor.version_no>=new.version_no or predecessor.replaced_by_id is not null then
      raise exception 'invalid evidence lineage';
    end if;
    if exists (with recursive chain as (select id,replaces_id from public.biochemistry_test_uploads where id=new.replaces_id union all select u.id,u.replaces_id from public.biochemistry_test_uploads u join chain c on u.id=c.replaces_id) select 1 from chain where id=new.id) then
      raise exception 'cyclic evidence lineage';
    end if;
  end if;
  return new;
end $$;
create trigger evidence_lineage_guard before insert or update on public.biochemistry_test_uploads for each row execute function public.validate_evidence_lineage();

create or replace function public.lock_evidence_test(p_test_id uuid) returns void language sql security invoker as $$ select pg_advisory_xact_lock(hashtextextended(p_test_id::text, 23)); $$;

alter table public.evidence_upload_attempts enable row level security;
alter table public.evidence_csv_registry enable row level security;
alter table public.evidence_holds enable row level security;
alter table public.evidence_audit_events enable row level security;
revoke all on public.evidence_upload_attempts, public.evidence_csv_registry, public.evidence_holds, public.evidence_audit_events from anon, authenticated;
revoke insert, update, delete on public.biochemistry_test_uploads from anon, authenticated;
grant select on public.biochemistry_test_uploads to authenticated;

-- Storage policies are intentionally candidate SQL only; bucket creation/application is Sprint 023F.
-- An authenticated INSERT policy must join storage.objects.name to one live actor-owned evidence_upload_attempt.
