-- Sprint 029O: correct public trainer-enquiry abuse-hash retention without changing enquiry retention.

create extension if not exists pg_cron;

-- Refuse to proceed if the deterministic job name is already bound to anything else.
do $$
declare
  v_count integer;
  v_schedule text;
  v_command text;
  v_active boolean;
begin
  select count(*)::integer into v_count
  from cron.job
  where jobname = 'trainer-enquiry-abuse-cleanup-hourly';

  if v_count > 1 then
    raise exception 'trainer enquiry cleanup job conflict';
  elsif v_count = 1 then
    select schedule, command, active
      into v_schedule, v_command, v_active
    from cron.job
    where jobname = 'trainer-enquiry-abuse-cleanup-hourly';

    if v_schedule is distinct from '5 * * * *'
       or v_command is distinct from 'select public.cleanup_trainer_enquiry_abuse_buckets(500);'
       or v_active is distinct from true then
      raise exception 'trainer enquiry cleanup job conflict';
    end if;
  end if;
end
$$;

alter table public.trainer_enquiries
  drop constraint trainer_enquiries_abuse_bucket_hash_fkey;
alter table public.trainer_enquiries
  alter column abuse_bucket_hash drop not null;
alter table public.trainer_enquiries
  add constraint trainer_enquiries_abuse_bucket_hash_fkey
  foreign key (abuse_bucket_hash)
  references public.trainer_enquiry_abuse_buckets(bucket_hash)
  on delete set null;

alter table public.trainer_enquiry_abuse_buckets
  drop constraint trainer_enquiry_bucket_expiry_check;
update public.trainer_enquiry_abuse_buckets
set expires_at = window_started_at + interval '2 hours'
where expires_at is distinct from window_started_at + interval '2 hours';
alter table public.trainer_enquiry_abuse_buckets
  add constraint trainer_enquiry_bucket_expiry_check
  check (expires_at = window_started_at + interval '2 hours');

create or replace function public.cleanup_trainer_enquiry_abuse_buckets(p_limit integer default 500)
returns integer
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare v_deleted integer;
begin
  if p_limit not between 1 and 500 then raise exception 'invalid batch'; end if;
  with targets as (
    select b.bucket_hash
    from public.trainer_enquiry_abuse_buckets b
    where b.expires_at <= pg_catalog.now()
    order by b.expires_at, b.bucket_hash
    for update skip locked
    limit p_limit
  ), removed as (
    delete from public.trainer_enquiry_abuse_buckets b
    using targets t
    where b.bucket_hash = t.bucket_hash
    returning 1
  )
  select count(*)::integer into v_deleted from removed;
  return v_deleted;
end
$$;

create or replace function public.accept_trainer_enquiry(
  p_public_reference text,
  p_idempotency_hash text,
  p_abuse_bucket_hash text,
  p_window_started_at timestamptz,
  p_trainer_name text,
  p_stable_name text,
  p_stable_address text,
  p_phone text,
  p_email text,
  p_horse_volume integer,
  p_referred_by text,
  p_notice_version text,
  p_provider_class text
)
returns table(public_reference text, created_new boolean, notification_status text)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare
  v_now timestamptz := pg_catalog.now();
  v_count integer;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_idempotency_hash, 29022));

  return query
    select e.public_reference, false, e.notification_status
    from public.trainer_enquiries e
    where e.idempotency_hash = p_idempotency_hash;
  if found then return; end if;

  perform public.cleanup_trainer_enquiry_abuse_buckets(25);

  insert into public.trainer_enquiry_abuse_buckets(bucket_hash, window_started_at, accepted_count, expires_at)
  values(p_abuse_bucket_hash, p_window_started_at, 1, p_window_started_at + interval '2 hours')
  on conflict(bucket_hash) do update
    set accepted_count = public.trainer_enquiry_abuse_buckets.accepted_count + 1
    where public.trainer_enquiry_abuse_buckets.accepted_count < 5
      and public.trainer_enquiry_abuse_buckets.expires_at > v_now;
  get diagnostics v_count = row_count;
  if v_count <> 1 then
    raise exception using errcode = 'P0001', message = 'enquiry_limit';
  end if;

  insert into public.trainer_enquiries(
    public_reference, idempotency_hash, abuse_bucket_hash,
    trainer_name, stable_name, stable_address, phone, email, horse_volume, referred_by,
    notice_version, notice_acknowledged_at, provider_class,
    notification_status, created_at, expires_at
  ) values (
    p_public_reference, p_idempotency_hash, p_abuse_bucket_hash,
    p_trainer_name, p_stable_name, nullif(p_stable_address, ''), p_phone, p_email, p_horse_volume, nullif(p_referred_by, ''),
    p_notice_version, v_now, p_provider_class,
    'pending', v_now, v_now + interval '90 days'
  );

  return query select p_public_reference, true, 'pending'::text;
end
$$;

create or replace function public.maintain_trainer_enquiries(p_limit integer default 100)
returns table(stale_unknown integer, enquiries_deleted integer, buckets_deleted integer)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare v_stale integer; v_enquiries integer; v_buckets integer;
begin
  if p_limit not between 1 and 500 then raise exception 'invalid batch'; end if;
  with changed as (
    update public.trainer_enquiries e set
      notification_status = 'delivery_unknown',
      notification_claim_token = null,
      notification_claim_expires_at = null,
      notification_next_attempt_at = null,
      notification_error_class = 'ambiguous'
    where e.id in (
      select id from public.trainer_enquiries
      where notification_status = 'attempting' and notification_claim_expires_at <= pg_catalog.now()
      order by notification_claim_expires_at for update skip locked limit p_limit
    ) returning 1
  ) select count(*)::integer into v_stale from changed;
  with removed as (
    delete from public.trainer_enquiries e where e.id in (
      select id from public.trainer_enquiries where expires_at <= pg_catalog.now()
      order by expires_at for update skip locked limit p_limit
    ) returning 1
  ) select count(*)::integer into v_enquiries from removed;
  select public.cleanup_trainer_enquiry_abuse_buckets(p_limit) into v_buckets;
  return query select v_stale, v_enquiries, v_buckets;
end
$$;

create or replace function public.trainer_enquiry_fixture_status(p_public_reference text)
returns table(row_count integer, bucket_count integer, notification_status text, notification_attempts smallint)
language sql stable security definer
set search_path = pg_catalog, public
as $$
  select
    count(e.id)::integer,
    count(b.bucket_hash)::integer,
    max(e.notification_status),
    coalesce(max(e.notification_attempts), 0)::smallint
  from public.trainer_enquiries e
  left join public.trainer_enquiry_abuse_buckets b on b.bucket_hash = e.abuse_bucket_hash
  where e.public_reference = p_public_reference;
$$;

create or replace function public.delete_trainer_enquiry_fixture(p_public_reference text)
returns table(rows_deleted integer, buckets_deleted integer)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare v_bucket text; v_rows integer; v_buckets integer;
begin
  select e.abuse_bucket_hash into v_bucket
  from public.trainer_enquiries e
  where e.public_reference = p_public_reference
  for update;
  delete from public.trainer_enquiries where public_reference = p_public_reference;
  get diagnostics v_rows = row_count;
  if v_bucket is not null then
    delete from public.trainer_enquiry_abuse_buckets b
    where b.bucket_hash = v_bucket
      and not exists(select 1 from public.trainer_enquiries e where e.abuse_bucket_hash = b.bucket_hash);
    get diagnostics v_buckets = row_count;
  else
    v_buckets := 0;
  end if;
  return query select v_rows, v_buckets;
end
$$;

create or replace function public.prove_trainer_enquiry_rate_limit(
  p_bucket_hash text,
  p_idempotency_hash text,
  p_public_reference text,
  p_window_started_at timestamptz,
  p_provider_class text
)
returns boolean
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare v_limited boolean := false;
begin
  insert into public.trainer_enquiry_abuse_buckets(bucket_hash, window_started_at, accepted_count, expires_at)
  values(p_bucket_hash, p_window_started_at, 5, p_window_started_at + interval '2 hours');
  begin
    perform * from public.accept_trainer_enquiry(
      p_public_reference, p_idempotency_hash, p_bucket_hash, p_window_started_at,
      'Sprint 029O Synthetic Trainer', 'Sprint 029O Synthetic Stable', null,
      '+61 400 000 000', 'sprint-029o-rate@example.invalid', 1, null,
      '2026-08-05', p_provider_class
    );
  exception when sqlstate 'P0001' then
    v_limited := true;
  end;
  delete from public.trainer_enquiries where public_reference = p_public_reference;
  delete from public.trainer_enquiry_abuse_buckets where bucket_hash = p_bucket_hash;
  return v_limited
    and not exists(select 1 from public.trainer_enquiries where public_reference = p_public_reference)
    and not exists(select 1 from public.trainer_enquiry_abuse_buckets where bucket_hash = p_bucket_hash);
end
$$;

create or replace function public.prove_trainer_enquiry_retention()
returns table(enquiry_retained integer, bucket_deleted integer, link_nulled integer, fixture_residue integer)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare
  v_reference text := 'PP-' || pg_catalog.upper(pg_catalog.substring(pg_catalog.replace(gen_random_uuid()::text, '-', ''), 1, 16));
  v_bucket_hash text := pg_catalog.replace(gen_random_uuid()::text, '-', '') || pg_catalog.replace(gen_random_uuid()::text, '-', '');
  v_idempotency_hash text := pg_catalog.replace(gen_random_uuid()::text, '-', '') || pg_catalog.replace(gen_random_uuid()::text, '-', '');
  v_enquiry_retained integer;
  v_bucket_deleted integer;
  v_link_nulled integer;
  v_fixture_residue integer;
begin
  perform pg_catalog.pg_advisory_xact_lock(29023029);

  insert into public.trainer_enquiry_abuse_buckets(bucket_hash, window_started_at, accepted_count, expires_at)
  values(v_bucket_hash, '2000-01-01 00:00:00+00'::timestamptz, 1, '2000-01-01 02:00:00+00'::timestamptz);
  insert into public.trainer_enquiries(
    public_reference, idempotency_hash, abuse_bucket_hash,
    trainer_name, stable_name, stable_address, phone, email, horse_volume, referred_by,
    notice_version, notice_acknowledged_at, provider_class,
    notification_status, created_at, expires_at
  ) values (
    v_reference, v_idempotency_hash, v_bucket_hash,
    'Sprint 029O Retention Proof', 'Sprint 029O Synthetic Stable', null,
    '+61 400 000 000', 'sprint-029o-retention@example.invalid', 1, null,
    '2026-08-05', pg_catalog.now(), 'google_workspace',
    'pending', pg_catalog.now(), pg_catalog.now() + interval '90 days'
  );

  perform public.cleanup_trainer_enquiry_abuse_buckets(500);

  select count(*)::integer into v_enquiry_retained
  from public.trainer_enquiries where public_reference = v_reference and expires_at > pg_catalog.now();
  select (1 - count(*))::integer into v_bucket_deleted
  from public.trainer_enquiry_abuse_buckets where bucket_hash = v_bucket_hash;
  select count(*)::integer into v_link_nulled
  from public.trainer_enquiries where public_reference = v_reference and abuse_bucket_hash is null;

  delete from public.trainer_enquiries where public_reference = v_reference;
  delete from public.trainer_enquiry_abuse_buckets where bucket_hash = v_bucket_hash;
  select (
    (select count(*) from public.trainer_enquiries where public_reference = v_reference) +
    (select count(*) from public.trainer_enquiry_abuse_buckets where bucket_hash = v_bucket_hash)
  )::integer into v_fixture_residue;

  return query select v_enquiry_retained, v_bucket_deleted, v_link_nulled, v_fixture_residue;
end
$$;

create or replace function public.trainer_enquiry_retention_status()
returns table(
  nullable_link_count integer,
  set_null_fk_count integer,
  two_hour_expiry_count integer,
  bucket_row_count integer,
  linked_enquiry_count integer,
  unlinked_enquiry_count integer,
  cleanup_job_count integer,
  cleanup_job_active_count integer
)
language sql stable security definer
set search_path = pg_catalog, public
as $$
  select
    (select count(*)::integer
      from pg_catalog.pg_attribute a
      join pg_catalog.pg_class c on c.oid = a.attrelid
      join pg_catalog.pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = 'trainer_enquiries'
        and a.attname = 'abuse_bucket_hash' and not a.attnotnull and not a.attisdropped),
    (select count(*)::integer
      from pg_catalog.pg_constraint c
      join pg_catalog.pg_class t on t.oid = c.conrelid
      join pg_catalog.pg_namespace n on n.oid = t.relnamespace
      where n.nspname = 'public' and t.relname = 'trainer_enquiries'
        and c.conname = 'trainer_enquiries_abuse_bucket_hash_fkey'
        and c.contype = 'f'
        and pg_catalog.pg_get_constraintdef(c.oid) like '%ON DELETE SET NULL%'),
    (select count(*)::integer
      from pg_catalog.pg_constraint c
      join pg_catalog.pg_class t on t.oid = c.conrelid
      join pg_catalog.pg_namespace n on n.oid = t.relnamespace
      where n.nspname = 'public' and t.relname = 'trainer_enquiry_abuse_buckets'
        and c.conname = 'trainer_enquiry_bucket_expiry_check'
        and (pg_catalog.pg_get_constraintdef(c.oid) like '%2 hours%'
          or pg_catalog.pg_get_constraintdef(c.oid) like '%02:00:00%')),
    (select count(*)::integer from public.trainer_enquiry_abuse_buckets),
    (select count(*)::integer from public.trainer_enquiries where abuse_bucket_hash is not null),
    (select count(*)::integer from public.trainer_enquiries where abuse_bucket_hash is null),
    (select count(*)::integer from cron.job
      where jobname = 'trainer-enquiry-abuse-cleanup-hourly'
        and schedule = '5 * * * *'
        and command = 'select public.cleanup_trainer_enquiry_abuse_buckets(500);'),
    (select count(*)::integer from cron.job
      where jobname = 'trainer-enquiry-abuse-cleanup-hourly'
        and schedule = '5 * * * *'
        and command = 'select public.cleanup_trainer_enquiry_abuse_buckets(500);'
        and active)
$$;

create or replace function public.trainer_enquiry_schema_status()
returns table(
  enquiry_table_count integer, bucket_table_count integer, rls_table_count integer,
  browser_policy_count integer, browser_grant_count integer, service_function_count integer,
  enquiry_row_count integer
)
language sql stable security definer
set search_path = pg_catalog, public
as $$
  select
    (select count(*)::integer from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='trainer_enquiries' and c.relkind='r'),
    (select count(*)::integer from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='trainer_enquiry_abuse_buckets' and c.relkind='r'),
    (select count(*)::integer from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in ('trainer_enquiries','trainer_enquiry_abuse_buckets') and c.relrowsecurity),
    (select count(*)::integer from pg_catalog.pg_policies p where p.schemaname='public' and p.tablename in ('trainer_enquiries','trainer_enquiry_abuse_buckets')),
    (select count(*)::integer from information_schema.role_table_grants g where g.table_schema='public' and g.table_name in ('trainer_enquiries','trainer_enquiry_abuse_buckets') and g.grantee in ('anon','authenticated','PUBLIC')),
    (select count(*)::integer from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('accept_trainer_enquiry','claim_trainer_enquiry_notification','claim_trainer_enquiry_retry_batch','complete_trainer_enquiry_notification','maintain_trainer_enquiries','trainer_enquiry_fixture_status','delete_trainer_enquiry_fixture','prove_trainer_enquiry_rate_limit','trainer_enquiry_schema_status','cleanup_trainer_enquiry_abuse_buckets','prove_trainer_enquiry_retention','trainer_enquiry_retention_status')),
    (select count(*)::integer from public.trainer_enquiries);
$$;

revoke all on function public.cleanup_trainer_enquiry_abuse_buckets(integer) from public, anon, authenticated;
revoke all on function public.accept_trainer_enquiry(text,text,text,timestamptz,text,text,text,text,text,integer,text,text,text) from public, anon, authenticated;
revoke all on function public.maintain_trainer_enquiries(integer) from public, anon, authenticated;
revoke all on function public.trainer_enquiry_fixture_status(text) from public, anon, authenticated;
revoke all on function public.delete_trainer_enquiry_fixture(text) from public, anon, authenticated;
revoke all on function public.prove_trainer_enquiry_rate_limit(text,text,text,timestamptz,text) from public, anon, authenticated;
revoke all on function public.prove_trainer_enquiry_retention() from public, anon, authenticated;
revoke all on function public.trainer_enquiry_retention_status() from public, anon, authenticated;
revoke all on function public.trainer_enquiry_schema_status() from public, anon, authenticated;

grant execute on function public.cleanup_trainer_enquiry_abuse_buckets(integer) to service_role;
grant execute on function public.accept_trainer_enquiry(text,text,text,timestamptz,text,text,text,text,text,integer,text,text,text) to service_role;
grant execute on function public.maintain_trainer_enquiries(integer) to service_role;
grant execute on function public.trainer_enquiry_fixture_status(text) to service_role;
grant execute on function public.delete_trainer_enquiry_fixture(text) to service_role;
grant execute on function public.prove_trainer_enquiry_rate_limit(text,text,text,timestamptz,text) to service_role;
grant execute on function public.prove_trainer_enquiry_retention() to service_role;
grant execute on function public.trainer_enquiry_retention_status() to service_role;
grant execute on function public.trainer_enquiry_schema_status() to service_role;

do $$
begin
  if not exists (
    select 1 from cron.job where jobname = 'trainer-enquiry-abuse-cleanup-hourly'
  ) then
    perform cron.schedule(
      'trainer-enquiry-abuse-cleanup-hourly',
      '5 * * * *',
      'select public.cleanup_trainer_enquiry_abuse_buckets(500);'
    );
  end if;
end
$$;

comment on table public.trainer_enquiries is 'Sprint 029O private public-enquiry store; service role only; expires after 90 days; abuse link is nullable.';
comment on table public.trainer_enquiry_abuse_buckets is 'Sprint 029O HMAC-only abuse buckets; expire two hours after the one-hour window begins.';
comment on function public.cleanup_trainer_enquiry_abuse_buckets(integer) is 'Bounded bucket-only privacy cleanup; never claims or sends notifications.';
comment on function public.prove_trainer_enquiry_retention() is 'Sanitized self-cleaning service-only proof of bucket deletion, surviving enquiry and nulled link.';
