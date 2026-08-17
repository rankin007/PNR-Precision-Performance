-- Sprint 029N: private, service-role-only public trainer enquiries.

create table public.trainer_enquiry_abuse_buckets (
  bucket_hash text primary key,
  window_started_at timestamptz not null,
  accepted_count smallint not null default 0,
  expires_at timestamptz not null,
  constraint trainer_enquiry_bucket_hash_check check (bucket_hash ~ '^[0-9a-f]{64}$'),
  constraint trainer_enquiry_bucket_count_check check (accepted_count between 0 and 5),
  constraint trainer_enquiry_bucket_expiry_check check (expires_at = window_started_at + interval '24 hours')
);

create table public.trainer_enquiries (
  id uuid primary key default gen_random_uuid(),
  public_reference text not null unique,
  idempotency_hash text not null unique,
  abuse_bucket_hash text not null references public.trainer_enquiry_abuse_buckets(bucket_hash) on delete restrict,
  trainer_name text not null,
  stable_name text not null,
  stable_address text,
  phone text not null,
  email text not null,
  horse_volume integer not null,
  referred_by text,
  notice_version text not null,
  notice_acknowledged_at timestamptz not null,
  provider_class text not null,
  notification_status text not null default 'pending',
  notification_attempts smallint not null default 0,
  notification_claim_token uuid,
  notification_claim_expires_at timestamptz,
  notification_next_attempt_at timestamptz,
  notification_last_attempt_at timestamptz,
  notification_error_class text,
  created_at timestamptz not null,
  expires_at timestamptz not null,
  constraint trainer_enquiry_reference_check check (public_reference ~ '^PP-[A-F0-9]{16}$'),
  constraint trainer_enquiry_idempotency_hash_check check (idempotency_hash ~ '^[0-9a-f]{64}$'),
  constraint trainer_enquiry_trainer_name_check check (char_length(trainer_name) between 2 and 120 and trainer_name !~ '[[:cntrl:]]'),
  constraint trainer_enquiry_stable_name_check check (char_length(stable_name) between 2 and 160 and stable_name !~ '[[:cntrl:]]'),
  constraint trainer_enquiry_stable_address_check check (stable_address is null or (char_length(stable_address) between 1 and 500 and stable_address !~ '[[:cntrl:]]')),
  constraint trainer_enquiry_phone_check check (char_length(phone) between 6 and 40 and phone !~ '[[:cntrl:]]'),
  constraint trainer_enquiry_email_check check (char_length(email) between 3 and 254 and email !~ '[[:cntrl:]]' and position('@' in email) > 1),
  constraint trainer_enquiry_horse_volume_check check (horse_volume between 1 and 9999),
  constraint trainer_enquiry_referred_by_check check (referred_by is null or (char_length(referred_by) between 1 and 160 and referred_by !~ '[[:cntrl:]]')),
  constraint trainer_enquiry_notice_version_check check (char_length(notice_version) between 1 and 40 and notice_version !~ '[[:cntrl:]]'),
  constraint trainer_enquiry_provider_class_check check (provider_class in ('google_workspace','microsoft_365','amazon_ses','resend','postmark','mailgun','sendgrid')),
  constraint trainer_enquiry_notification_status_check check (notification_status in ('pending','attempting','retryable','sent','delivery_unknown')),
  constraint trainer_enquiry_notification_attempts_check check (notification_attempts between 0 and 3),
  constraint trainer_enquiry_claim_pair_check check ((notification_claim_token is null) = (notification_claim_expires_at is null)),
  constraint trainer_enquiry_error_class_check check (notification_error_class is null or notification_error_class in ('connection','authentication','pre_envelope','ambiguous','unexpected')),
  constraint trainer_enquiry_expiry_check check (expires_at = created_at + interval '90 days')
);

create index trainer_enquiries_expiry_ix on public.trainer_enquiries(expires_at);
create index trainer_enquiries_notification_ix on public.trainer_enquiries(notification_status, notification_next_attempt_at, created_at);
create index trainer_enquiry_abuse_expiry_ix on public.trainer_enquiry_abuse_buckets(expires_at);

alter table public.trainer_enquiries enable row level security;
alter table public.trainer_enquiry_abuse_buckets enable row level security;

revoke all on table public.trainer_enquiries from public, anon, authenticated;
revoke all on table public.trainer_enquiry_abuse_buckets from public, anon, authenticated;
grant select, insert, update, delete on table public.trainer_enquiries to service_role;
grant select, insert, update, delete on table public.trainer_enquiry_abuse_buckets to service_role;

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

  insert into public.trainer_enquiry_abuse_buckets(bucket_hash, window_started_at, accepted_count, expires_at)
  values(p_abuse_bucket_hash, p_window_started_at, 1, p_window_started_at + interval '24 hours')
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

create or replace function public.claim_trainer_enquiry_notification(p_public_reference text)
returns table(
  public_reference text, claim_token uuid, trainer_name text, stable_name text,
  stable_address text, phone text, email text, horse_volume integer, referred_by text,
  created_at timestamptz, provider_class text, notification_attempts smallint
)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare
  v_now timestamptz := pg_catalog.now();
  v_token uuid := gen_random_uuid();
begin
  update public.trainer_enquiries e set
    notification_status = 'attempting',
    notification_attempts = e.notification_attempts + 1,
    notification_claim_token = v_token,
    notification_claim_expires_at = v_now + interval '10 minutes',
    notification_last_attempt_at = v_now,
    notification_error_class = null
  where e.public_reference = p_public_reference
    and e.notification_attempts < 3
    and (
      e.notification_status = 'pending'
      or (e.notification_status = 'retryable' and coalesce(e.notification_next_attempt_at, v_now) <= v_now)
    )
  returning e.public_reference, v_token, e.trainer_name, e.stable_name,
    e.stable_address, e.phone, e.email, e.horse_volume, e.referred_by,
    e.created_at, e.provider_class, e.notification_attempts
  into public_reference, claim_token, trainer_name, stable_name,
    stable_address, phone, email, horse_volume, referred_by,
    created_at, provider_class, notification_attempts;
  if found then return next; end if;
end
$$;

create or replace function public.claim_trainer_enquiry_retry_batch(p_limit integer default 10)
returns table(
  public_reference text, claim_token uuid, trainer_name text, stable_name text,
  stable_address text, phone text, email text, horse_volume integer, referred_by text,
  created_at timestamptz, provider_class text, notification_attempts smallint
)
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare
  v_row record;
begin
  if p_limit not between 1 and 25 then raise exception 'invalid batch'; end if;
  for v_row in
    select e.public_reference
    from public.trainer_enquiries e
    where e.notification_status = 'retryable'
      and e.notification_attempts < 3
      and coalesce(e.notification_next_attempt_at, pg_catalog.now()) <= pg_catalog.now()
    order by e.notification_next_attempt_at nulls first, e.created_at
    for update skip locked limit p_limit
  loop
    return query select * from public.claim_trainer_enquiry_notification(v_row.public_reference);
  end loop;
end
$$;

create or replace function public.complete_trainer_enquiry_notification(
  p_public_reference text,
  p_claim_token uuid,
  p_outcome text,
  p_error_class text default null
)
returns boolean
language plpgsql volatile security definer
set search_path = pg_catalog, public
as $$
declare
  v_count integer;
  v_delay interval;
begin
  if p_outcome not in ('sent','retryable','delivery_unknown') then raise exception 'invalid outcome'; end if;
  if p_error_class is not null and p_error_class not in ('connection','authentication','pre_envelope','ambiguous','unexpected') then raise exception 'invalid error class'; end if;
  v_delay := case
    when p_outcome = 'retryable' then interval '5 minutes' * power(2, greatest(0, (
      select e.notification_attempts - 1 from public.trainer_enquiries e where e.public_reference = p_public_reference
    )))
    else null
  end;
  update public.trainer_enquiries e set
    notification_status = case when p_outcome = 'retryable' and e.notification_attempts >= 3 then 'delivery_unknown' else p_outcome end,
    notification_next_attempt_at = case when p_outcome = 'retryable' and e.notification_attempts < 3 then pg_catalog.now() + v_delay else null end,
    notification_claim_token = null,
    notification_claim_expires_at = null,
    notification_error_class = p_error_class
  where e.public_reference = p_public_reference
    and e.notification_status = 'attempting'
    and e.notification_claim_token = p_claim_token;
  get diagnostics v_count = row_count;
  return v_count = 1;
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
  ) select count(*) into v_stale from changed;
  with removed as (
    delete from public.trainer_enquiries e where e.id in (
      select id from public.trainer_enquiries where expires_at <= pg_catalog.now()
      order by expires_at for update skip locked limit p_limit
    ) returning 1
  ) select count(*) into v_enquiries from removed;
  with removed as (
    delete from public.trainer_enquiry_abuse_buckets b where b.bucket_hash in (
      select bucket_hash from public.trainer_enquiry_abuse_buckets
      where expires_at <= pg_catalog.now()
        and not exists(select 1 from public.trainer_enquiries e where e.abuse_bucket_hash = b.bucket_hash)
      order by expires_at for update skip locked limit p_limit
    ) returning 1
  ) select count(*) into v_buckets from removed;
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
  select e.abuse_bucket_hash into v_bucket from public.trainer_enquiries e where e.public_reference = p_public_reference for update;
  delete from public.trainer_enquiries where public_reference = p_public_reference;
  get diagnostics v_rows = row_count;
  if v_bucket is not null then
    delete from public.trainer_enquiry_abuse_buckets b
    where b.bucket_hash = v_bucket and not exists(select 1 from public.trainer_enquiries e where e.abuse_bucket_hash = b.bucket_hash);
    get diagnostics v_buckets = row_count;
  else v_buckets := 0;
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
  values(p_bucket_hash, p_window_started_at, 5, p_window_started_at + interval '24 hours');
  begin
    perform * from public.accept_trainer_enquiry(
      p_public_reference, p_idempotency_hash, p_bucket_hash, p_window_started_at,
      'Sprint 029N Synthetic Trainer', 'Sprint 029N Synthetic Stable', null,
      '+61 400 000 000', 'sprint-029n-rate@example.invalid', 1, null,
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
    (select count(*)::integer from pg_catalog.pg_proc p join pg_catalog.pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname in ('accept_trainer_enquiry','claim_trainer_enquiry_notification','claim_trainer_enquiry_retry_batch','complete_trainer_enquiry_notification','maintain_trainer_enquiries','trainer_enquiry_fixture_status','delete_trainer_enquiry_fixture','prove_trainer_enquiry_rate_limit','trainer_enquiry_schema_status')),
    (select count(*)::integer from public.trainer_enquiries);
$$;

revoke all on function public.accept_trainer_enquiry(text,text,text,timestamptz,text,text,text,text,text,integer,text,text,text) from public, anon, authenticated;
revoke all on function public.claim_trainer_enquiry_notification(text) from public, anon, authenticated;
revoke all on function public.claim_trainer_enquiry_retry_batch(integer) from public, anon, authenticated;
revoke all on function public.complete_trainer_enquiry_notification(text,uuid,text,text) from public, anon, authenticated;
revoke all on function public.maintain_trainer_enquiries(integer) from public, anon, authenticated;
revoke all on function public.trainer_enquiry_fixture_status(text) from public, anon, authenticated;
revoke all on function public.delete_trainer_enquiry_fixture(text) from public, anon, authenticated;
revoke all on function public.prove_trainer_enquiry_rate_limit(text,text,text,timestamptz,text) from public, anon, authenticated;
revoke all on function public.trainer_enquiry_schema_status() from public, anon, authenticated;

grant execute on function public.accept_trainer_enquiry(text,text,text,timestamptz,text,text,text,text,text,integer,text,text,text) to service_role;
grant execute on function public.claim_trainer_enquiry_notification(text) to service_role;
grant execute on function public.claim_trainer_enquiry_retry_batch(integer) to service_role;
grant execute on function public.complete_trainer_enquiry_notification(text,uuid,text,text) to service_role;
grant execute on function public.maintain_trainer_enquiries(integer) to service_role;
grant execute on function public.trainer_enquiry_fixture_status(text) to service_role;
grant execute on function public.delete_trainer_enquiry_fixture(text) to service_role;
grant execute on function public.prove_trainer_enquiry_rate_limit(text,text,text,timestamptz,text) to service_role;
grant execute on function public.trainer_enquiry_schema_status() to service_role;

comment on table public.trainer_enquiries is 'Sprint 029N private public-enquiry store; service role only; expires after 90 days.';
comment on table public.trainer_enquiry_abuse_buckets is 'Sprint 029N HMAC-only abuse buckets; expires within 24 hours.';
