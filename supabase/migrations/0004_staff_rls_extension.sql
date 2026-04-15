-- Extends baseline RLS to support stable-scoped staff access.

create or replace function public.has_stable_scope(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or exists (
      select 1
      from public.stable_staff_assignments ssa
      where ssa.stable_id = target_stable_id
        and ssa.member_profile_id = public.current_member_profile_id()
        and (ssa.starts_at is null or ssa.starts_at <= now())
        and (ssa.ends_at is null or ssa.ends_at >= now())
    )
$$;

create or replace function public.can_write_stable_scope(target_stable_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or exists (
      select 1
      from public.stable_staff_assignments ssa
      where ssa.stable_id = target_stable_id
        and ssa.member_profile_id = public.current_member_profile_id()
        and ssa.access_level in ('write', 'manage')
        and (ssa.starts_at is null or ssa.starts_at <= now())
        and (ssa.ends_at is null or ssa.ends_at >= now())
    )
$$;

alter table public.stable_staff_assignments enable row level security;

create policy "stable_staff_assignments_select_self_or_admin"
on public.stable_staff_assignments
for select
using (
  member_profile_id = public.current_member_profile_id()
  or public.is_admin()
);

create policy "stable_staff_assignments_admin_manage"
on public.stable_staff_assignments
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "stables_visible_through_horse_access_or_admin" on public.stables;
create policy "stables_visible_through_horse_or_staff_scope_or_admin"
on public.stables
for select
using (
  public.is_admin()
  or public.has_stable_scope(id)
  or exists (
    select 1
    from public.horses h
    where h.stable_id = stables.id
      and public.can_access_horse(h.id)
  )
);

drop policy if exists "weather_logs_select_via_accessible_horse_or_admin" on public.weather_logs;
create policy "weather_logs_select_via_horse_or_staff_scope_or_admin"
on public.weather_logs
for select
using (
  public.is_admin()
  or public.has_stable_scope(stable_id)
  or exists (
    select 1
    from public.daily_records dr
    where dr.weather_log_id = weather_logs.id
      and public.can_access_horse(dr.horse_id)
  )
  or exists (
    select 1
    from public.track_sessions ts
    join public.horses h on h.id = ts.horse_id
    where ts.weather_log_id = weather_logs.id
      and public.can_access_horse(h.id)
  )
);

drop policy if exists "weather_logs_manage_trainers_or_admin" on public.weather_logs;
create policy "weather_logs_manage_trainers_staff_or_admin"
on public.weather_logs
for all
using (
  public.is_admin()
  or public.can_write_stable_scope(stable_id)
  or exists (
    select 1
    from public.horses h
    where h.stable_id = weather_logs.stable_id
      and public.can_manage_horse_records(h.id)
  )
)
with check (
  public.is_admin()
  or public.can_write_stable_scope(stable_id)
  or exists (
    select 1
    from public.horses h
    where h.stable_id = weather_logs.stable_id
      and public.can_manage_horse_records(h.id)
  )
);
