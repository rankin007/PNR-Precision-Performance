-- Sprint 021V - transactionally serialized initial-Administrator claim.

create or replace function public.claim_initial_administrator()
returns text
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  actor_auth_id uuid := auth.uid();
  actor_user_id uuid;
  canonical_level_id uuid;
  actor_count integer;
  profile_count integer;
  history_count integer;
  canonical_level_count integer;
  legacy_level_count integer;
  recognized_assignment_count integer;
  intended_assignment_count integer;
  intended_role_count integer;
  affected_count integer;
begin
  -- Stable project-specific transaction lock; every eligibility read and write follows it.
  perform pg_catalog.pg_advisory_xact_lock(581732104913021);

  if actor_auth_id is null then
    return 'denied';
  end if;

  select count(*), (array_agg(u.id))[1]
    into actor_count, actor_user_id
  from public.users u
  where u.auth_user_id = actor_auth_id
    and u.status = 'active';
  if actor_count <> 1 or actor_user_id is null then
    return 'denied';
  end if;

  select count(*) into profile_count
  from public.member_profiles mp
  where mp.user_id = actor_user_id
    and mp.is_active is true;
  if profile_count <> 1 then
    return 'denied';
  end if;

  select count(*) into history_count
  from public.user_membership_levels uml
  where uml.user_id = actor_user_id;
  if history_count <> 0 then
    return 'denied';
  end if;

  select count(*), (array_agg(ml.id))[1]
    into canonical_level_count, canonical_level_id
  from public.membership_levels ml
  where ml.code = 'administrator';
  select count(*) into legacy_level_count
  from public.membership_levels ml
  where ml.code = 'admin';
  if canonical_level_count <> 1 or canonical_level_id is null or legacy_level_count > 1 then
    return 'denied';
  end if;

  select count(*) into recognized_assignment_count
  from public.user_membership_levels uml
  join public.membership_levels ml on ml.id = uml.membership_level_id
  where ml.code in ('administrator', 'admin');
  if recognized_assignment_count <> 0 then
    return 'denied';
  end if;

  insert into public.user_membership_levels (user_id, membership_level_id)
  values (actor_user_id, canonical_level_id);
  get diagnostics affected_count = row_count;
  if affected_count <> 1 then
    raise exception using errcode = 'P0001', message = 'claim_denied';
  end if;

  update public.users
  set primary_role_code = 'administrator', updated_at = now()
  where id = actor_user_id and status = 'active';
  get diagnostics affected_count = row_count;
  if affected_count <> 1 then
    raise exception using errcode = 'P0001', message = 'claim_denied';
  end if;

  select count(*) into intended_assignment_count
  from public.user_membership_levels uml
  where uml.user_id = actor_user_id
    and uml.membership_level_id = canonical_level_id;
  select count(*) into recognized_assignment_count
  from public.user_membership_levels uml
  join public.membership_levels ml on ml.id = uml.membership_level_id
  where ml.code in ('administrator', 'admin');
  select count(*) into intended_role_count
  from public.users u
  where u.id = actor_user_id
    and u.primary_role_code = 'administrator';

  if intended_assignment_count <> 1
    or recognized_assignment_count <> 1
    or intended_role_count <> 1 then
    raise exception using errcode = 'P0001', message = 'claim_denied';
  end if;

  return 'claimed';
end
$$;

revoke execute on function public.claim_initial_administrator() from public, anon;
grant execute on function public.claim_initial_administrator() to authenticated;
