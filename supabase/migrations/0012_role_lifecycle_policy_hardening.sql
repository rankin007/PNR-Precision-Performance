-- Sprint 021 - forward-only lifecycle and assignment hardening after 0011.

alter table public.users drop constraint if exists users_status_check;
alter table public.users add constraint users_status_check
  check (status in ('active','inactive','suspended'));

alter table public.horses
  add column if not exists deleted_at timestamptz,
  add column if not exists deleted_by_user_id uuid references public.users(id) on delete set null,
  add column if not exists delete_reason text;
alter table public.horses drop constraint if exists horses_soft_delete_attribution_check;
alter table public.horses add constraint horses_soft_delete_attribution_check
  check (deleted_at is null or deleted_by_user_id is not null);

create table if not exists public.horse_ownership_history (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete restrict,
  owner_id uuid references public.owners(id) on delete set null,
  assignment_id uuid,
  action text not null check (action in ('assigned','changed','revoked')),
  changed_by_user_id uuid references public.users(id) on delete set null,
  changed_at timestamptz not null default now()
);
create index if not exists idx_horse_ownership_history_horse_changed
  on public.horse_ownership_history (horse_id, changed_at desc);

create or replace function public.record_horse_ownership_history()
returns trigger language plpgsql security definer
set search_path = pg_catalog, public as $$
begin
  if tg_op = 'INSERT' and new.owner_id is not null then
    insert into public.horse_ownership_history(horse_id,owner_id,assignment_id,action,changed_by_user_id)
    values(new.horse_id,new.owner_id,new.id,'assigned',public.current_app_user_id());
  elsif tg_op = 'UPDATE' and old.owner_id is distinct from new.owner_id then
    insert into public.horse_ownership_history(horse_id,owner_id,assignment_id,action,changed_by_user_id)
    values(new.horse_id,new.owner_id,new.id,case when new.owner_id is null then 'revoked' else 'changed' end,public.current_app_user_id());
  elsif tg_op = 'DELETE' and old.owner_id is not null then
    insert into public.horse_ownership_history(horse_id,owner_id,assignment_id,action,changed_by_user_id)
    values(old.horse_id,old.owner_id,old.id,'revoked',public.current_app_user_id());
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
drop trigger if exists horse_assignments_ownership_history on public.horse_assignments;
create trigger horse_assignments_ownership_history
after insert or update or delete on public.horse_assignments
for each row execute function public.record_horse_ownership_history();

create or replace function public.is_trainer_for_horse(target_horse_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user()
    and public.current_primary_role() = 'trainer'
    and public.has_explicit_horse_role(target_horse_id, array['trainer'])
$$;

create or replace function public.is_trainer_for_stable(target_stable_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user()
    and public.current_primary_role() = 'trainer'
    and public.has_active_stable_role(target_stable_id, 'trainer')
$$;

create or replace function public.can_manage_scoped_user(target_user_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_admin() or (
    public.current_primary_role() = 'trainer'
    and target_user_id <> public.current_app_user_id()
    and exists (
      select 1 from public.users target
      join public.member_profiles target_profile on target_profile.user_id = target.id
      where target.id = target_user_id
        and target.primary_role_code in ('stable_manager','veterinarian','consultant','stable_hand')
        and (
          exists (
            select 1 from public.stable_role_assignments sra
            where sra.member_profile_id = target_profile.id
              and sra.role_code in ('stable_manager','stable_hand')
              and public.is_trainer_for_stable(sra.stable_id)
              and (sra.starts_at is null or sra.starts_at <= now())
              and (sra.ends_at is null or sra.ends_at >= now())
          )
          or exists (
            select 1 from public.biochemistry_horse_access_assignments bha
            where bha.member_profile_id = target_profile.id
              and bha.role_code in ('veterinarian','consultant','stable_hand')
              and public.is_trainer_for_horse(bha.horse_id)
              and (bha.starts_at is null or bha.starts_at <= now())
              and (bha.ends_at is null or bha.ends_at >= now())
          )
        )
    )
  )
$$;

create or replace function public.can_manage_horse_access_assignment(
  target_horse_id uuid,
  target_member_profile_id uuid,
  target_role_code text
)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_admin() or (
    public.is_trainer_for_horse(target_horse_id)
    and target_member_profile_id <> public.current_member_profile_id()
    and target_role_code in ('stable_hand','veterinarian','consultant')
    and exists (
      select 1 from public.users target
      join public.member_profiles mp on mp.user_id = target.id
      where mp.id = target_member_profile_id
        and target.status = 'active' and mp.is_active
        and target.primary_role_code = target_role_code
    )
  )
$$;

create or replace function public.can_manage_stable_role_assignment(
  target_stable_id uuid,
  target_member_profile_id uuid,
  target_role_code text
)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_admin() or (
    public.is_trainer_for_stable(target_stable_id)
    and target_member_profile_id <> public.current_member_profile_id()
    and target_role_code in ('stable_manager','stable_hand')
    and exists (
      select 1 from public.users target
      join public.member_profiles mp on mp.user_id = target.id
      where mp.id = target_member_profile_id
        and target.status = 'active' and mp.is_active
        and target.primary_role_code = target_role_code
    )
  )
$$;

drop policy if exists "users_update_self_or_admin" on public.users;
drop policy if exists "users_update_scoped_manager" on public.users;
create policy "users_update_scoped_manager" on public.users for update
  using (public.is_admin() or public.can_manage_scoped_user(id))
  with check (
    public.is_admin()
    or (public.can_manage_scoped_user(id)
      and primary_role_code in ('stable_manager','veterinarian','consultant','stable_hand'))
  );

drop policy if exists "users_select_self_or_admin" on public.users;
create policy "users_select_scoped" on public.users for select
  using (id = public.current_app_user_id() or public.is_admin() or public.can_manage_scoped_user(id));
drop policy if exists "member_profiles_select_self_or_admin" on public.member_profiles;
create policy "member_profiles_select_scoped" on public.member_profiles for select
  using (user_id = public.current_app_user_id() or public.is_admin() or public.can_manage_scoped_user(user_id));

drop policy if exists "horses_manage_authorised_scope" on public.horses;
drop policy if exists "horses_insert_authorised_scope" on public.horses;
drop policy if exists "horses_update_authorised_scope" on public.horses;
create policy "horses_insert_authorised_scope" on public.horses for insert
  with check (
    public.is_admin()
    or public.is_trainer_for_stable(stable_id)
    or public.has_active_stable_role(stable_id, 'stable_manager')
  );
create policy "horses_update_authorised_scope" on public.horses for update
  using (public.can_manage_horse_records(id))
  with check (public.can_manage_horse_records(id));
-- No DELETE policy: normal horse deletion is recoverable status/soft-delete only.

drop policy if exists "stables_admin_manage" on public.stables;
create policy "stables_admin_insert" on public.stables for insert
  with check (public.is_admin());
create policy "stables_admin_update" on public.stables for update
  using (public.is_admin()) with check (public.is_admin());
-- No DELETE policy: stable retirement is represented by recoverable status changes.

alter table public.horse_ownership_history enable row level security;
create policy "horse_ownership_history_select_accessible" on public.horse_ownership_history for select
  using (public.can_access_horse(horse_id));
-- Trigger-owned audit rows have no direct client mutation policies.

drop policy if exists "stable_role_assignments_admin_manage" on public.stable_role_assignments;
drop policy if exists "stable_role_assignments_scoped_insert" on public.stable_role_assignments;
drop policy if exists "stable_role_assignments_scoped_update" on public.stable_role_assignments;
drop policy if exists "stable_role_assignments_scoped_delete" on public.stable_role_assignments;
create policy "stable_role_assignments_scoped_insert" on public.stable_role_assignments for insert
  with check (public.can_manage_stable_role_assignment(stable_id, member_profile_id, role_code));
create policy "stable_role_assignments_scoped_update" on public.stable_role_assignments for update
  using (public.can_manage_stable_role_assignment(stable_id, member_profile_id, role_code))
  with check (public.can_manage_stable_role_assignment(stable_id, member_profile_id, role_code));
create policy "stable_role_assignments_scoped_delete" on public.stable_role_assignments for delete
  using (public.can_manage_stable_role_assignment(stable_id, member_profile_id, role_code));

drop policy if exists "biochemistry_horse_access_manage_trainer_or_admin" on public.biochemistry_horse_access_assignments;
drop policy if exists "biochemistry_horse_access_scoped_insert" on public.biochemistry_horse_access_assignments;
drop policy if exists "biochemistry_horse_access_scoped_update" on public.biochemistry_horse_access_assignments;
drop policy if exists "biochemistry_horse_access_scoped_delete" on public.biochemistry_horse_access_assignments;
create policy "biochemistry_horse_access_scoped_insert" on public.biochemistry_horse_access_assignments for insert
  with check (public.can_manage_horse_access_assignment(horse_id, member_profile_id, role_code));
create policy "biochemistry_horse_access_scoped_update" on public.biochemistry_horse_access_assignments for update
  using (public.can_manage_horse_access_assignment(horse_id, member_profile_id, role_code))
  with check (public.can_manage_horse_access_assignment(horse_id, member_profile_id, role_code));
create policy "biochemistry_horse_access_scoped_delete" on public.biochemistry_horse_access_assignments for delete
  using (public.can_manage_horse_access_assignment(horse_id, member_profile_id, role_code));

drop policy if exists "horse_assignments_insert_trainer_or_admin" on public.horse_assignments;
drop policy if exists "horse_assignments_update_trainer_or_admin" on public.horse_assignments;
drop policy if exists "horse_assignments_delete_admin_only" on public.horse_assignments;
create policy "horse_assignments_insert_owner_or_admin" on public.horse_assignments for insert
  with check (
    public.is_admin()
    or (public.is_trainer_for_horse(horse_id) and owner_id is not null and trainer_id is null)
  );
create policy "horse_assignments_update_owner_or_admin" on public.horse_assignments for update
  using (public.is_admin() or (public.is_trainer_for_horse(horse_id) and owner_id is not null and trainer_id is null))
  with check (public.is_admin() or (public.is_trainer_for_horse(horse_id) and owner_id is not null and trainer_id is null));
create policy "horse_assignments_delete_owner_or_admin" on public.horse_assignments for delete
  using (public.is_admin() or (public.is_trainer_for_horse(horse_id) and owner_id is not null and trainer_id is null));

insert into public.permissions(code,name,description,scope) values
  ('horse.comments.write','Horse Comments Write','Add and manage own horse-scoped comments.','horse')
on conflict(code) do update set name=excluded.name,description=excluded.description,scope=excluded.scope;

with mapping(level_code,permission_code) as (values
  ('administrator','platform.admin'),
  ('administrator','horse.records.write'),
  ('administrator','horse.comments.write'),
  ('trainer','horse.comments.write'),
  ('stable-manager','horse.records.write'),
  ('stable-manager','horse.comments.write'),
  ('veterinarian','horse.comments.write'),
  ('consultant','horse.comments.write'),
  ('stable-hand','horse.comments.write')
)
insert into public.membership_level_permissions(membership_level_id,permission_id)
select ml.id,p.id from mapping m
join public.membership_levels ml on ml.code=m.level_code
join public.permissions p on p.code=m.permission_code
on conflict(membership_level_id,permission_id) do nothing;

revoke execute on function public.is_trainer_for_horse(uuid) from public, anon;
revoke execute on function public.is_trainer_for_stable(uuid) from public, anon;
revoke execute on function public.can_manage_scoped_user(uuid) from public, anon;
revoke execute on function public.can_manage_horse_access_assignment(uuid,uuid,text) from public, anon;
revoke execute on function public.can_manage_stable_role_assignment(uuid,uuid,text) from public, anon;
revoke execute on function public.record_horse_ownership_history() from public, anon, authenticated;
grant execute on function public.is_trainer_for_horse(uuid) to authenticated;
grant execute on function public.is_trainer_for_stable(uuid) to authenticated;
grant execute on function public.can_manage_scoped_user(uuid) to authenticated;
grant execute on function public.can_manage_horse_access_assignment(uuid,uuid,text) to authenticated;
grant execute on function public.can_manage_stable_role_assignment(uuid,uuid,text) to authenticated;
