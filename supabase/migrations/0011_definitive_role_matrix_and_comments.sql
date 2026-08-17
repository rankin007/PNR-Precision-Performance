-- Sprint 021 - definitive operational roles, scoped horse access, and comments.

alter table public.users
  add column if not exists primary_role_code text;

alter table public.users drop constraint if exists users_primary_role_code_check;
alter table public.users add constraint users_primary_role_code_check
  check (primary_role_code is null or primary_role_code in
    ('administrator','trainer','stable_manager','veterinarian','consultant','stable_hand'));

create table if not exists public.stable_role_assignments (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete restrict,
  member_profile_id uuid not null references public.member_profiles(id) on delete cascade,
  role_code text not null check (role_code in ('trainer','stable_manager','stable_hand')),
  assigned_by_user_id uuid references public.users(id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (stable_id, member_profile_id, role_code)
);

create unique index if not exists idx_stable_role_one_manager_stable
  on public.stable_role_assignments (member_profile_id)
  where role_code in ('stable_manager','stable_hand') and ends_at is null;
create index if not exists idx_stable_role_active_scope
  on public.stable_role_assignments (stable_id, member_profile_id, role_code, ends_at);

alter table public.biochemistry_horse_access_assignments drop constraint if exists biochemistry_horse_access_assignments_role_code_check;
alter table public.biochemistry_horse_access_assignments add constraint biochemistry_horse_access_assignments_role_code_check
  check (role_code in ('trainer','stable_hand','veterinarian','consultant','owner'));

alter table public.biochemistry_test_notes
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists updated_by_user_id uuid references public.users(id) on delete set null;
alter table public.biochemistry_test_notes drop constraint if exists biochemistry_test_notes_length_check;
alter table public.biochemistry_test_notes add constraint biochemistry_test_notes_length_check
  check (char_length(note_text) between 1 and 2000);
create index if not exists idx_biochemistry_test_notes_active_test
  on public.biochemistry_test_notes (test_id, created_at) where deleted_at is null;

create or replace function public.is_active_app_user()
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select exists (
    select 1 from public.users u
    join public.member_profiles mp on mp.user_id = u.id
    where u.auth_user_id = auth.uid() and u.status = 'active' and mp.is_active
  )
$$;

create or replace function public.current_primary_role()
returns text language sql stable security definer
set search_path = pg_catalog, public as $$
  select u.primary_role_code from public.users u
  join public.member_profiles mp on mp.user_id = u.id
  where u.auth_user_id = auth.uid() and u.status = 'active' and mp.is_active
  limit 1
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and public.current_primary_role() = 'administrator'
$$;

create or replace function public.has_permission(permission_code text)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and exists (
    select 1 from public.users u
    join public.user_membership_levels uml on uml.user_id = u.id
    join public.membership_level_permissions mlp on mlp.membership_level_id = uml.membership_level_id
    join public.permissions p on p.id = mlp.permission_id
    where u.auth_user_id = auth.uid() and p.code = permission_code
      and (uml.starts_at is null or uml.starts_at <= now())
      and (uml.ends_at is null or uml.ends_at >= now())
  )
$$;

create or replace function public.has_active_stable_role(target_stable_id uuid, required_role text)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and public.current_primary_role() = required_role and exists (
    select 1 from public.stable_role_assignments sra
    where sra.stable_id = target_stable_id
      and sra.member_profile_id = public.current_member_profile_id()
      and sra.role_code = required_role
      and (sra.starts_at is null or sra.starts_at <= now())
      and (sra.ends_at is null or sra.ends_at >= now())
  )
$$;

create or replace function public.has_explicit_horse_role(target_horse_id uuid, required_roles text[])
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and exists (
    select 1 from public.biochemistry_horse_access_assignments bha
    where bha.horse_id = target_horse_id
      and bha.member_profile_id = public.current_member_profile_id()
      and bha.role_code = any(required_roles)
      and (bha.starts_at is null or bha.starts_at <= now())
      and (bha.ends_at is null or bha.ends_at >= now())
  )
$$;

create or replace function public.can_access_horse(target_horse_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and (
    public.is_admin()
    or public.has_explicit_horse_role(target_horse_id, array['trainer','stable_hand','veterinarian','consultant','owner'])
    or exists (
      select 1 from public.horses h where h.id = target_horse_id
        and public.has_active_stable_role(h.stable_id, 'stable_manager')
    )
    or exists (
      select 1 from public.horse_assignments ha
      join public.owners o on o.id = ha.owner_id
      where ha.horse_id = target_horse_id
        and o.member_profile_id = public.current_member_profile_id()
        and (ha.starts_at is null or ha.starts_at <= now())
        and (ha.ends_at is null or ha.ends_at >= now())
    )
  )
$$;

create or replace function public.can_manage_horse_records(target_horse_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and (
    public.is_admin()
    or (public.current_primary_role() = 'trainer' and public.has_explicit_horse_role(target_horse_id, array['trainer']))
    or exists (select 1 from public.horses h where h.id = target_horse_id
      and public.has_active_stable_role(h.stable_id, 'stable_manager'))
  )
$$;

create or replace function public.can_read_biochemistry_horse(target_horse_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$ select public.can_access_horse(target_horse_id) $$;

create or replace function public.can_write_biochemistry_horse(target_horse_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$ select public.can_manage_horse_records(target_horse_id) $$;

create or replace function public.can_comment_biochemistry_horse(target_horse_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and public.current_primary_role() <> 'owner' and (
    public.can_manage_horse_records(target_horse_id)
    or public.has_explicit_horse_role(target_horse_id, array['stable_hand','veterinarian','consultant'])
  )
$$;

create or replace function public.can_manage_biochemistry_comment(target_note_id uuid)
returns boolean language sql stable security definer
set search_path = pg_catalog, public as $$
  select public.is_active_app_user() and exists (
    select 1 from public.biochemistry_test_notes n
    where n.id = target_note_id and n.deleted_at is null
      and (public.is_admin() or (n.created_by_user_id = public.current_app_user_id()
        and public.can_comment_biochemistry_horse(n.horse_id)))
  )
$$;

alter table public.stable_role_assignments enable row level security;
drop policy if exists "stable_role_assignments_scoped_select" on public.stable_role_assignments;
create policy "stable_role_assignments_scoped_select" on public.stable_role_assignments for select
  using (public.is_admin() or member_profile_id = public.current_member_profile_id());
drop policy if exists "stable_role_assignments_admin_manage" on public.stable_role_assignments;
create policy "stable_role_assignments_admin_manage" on public.stable_role_assignments for all
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "horses_manage_admin_only" on public.horses;
create policy "horses_manage_authorised_scope" on public.horses for all
  using (public.can_manage_horse_records(id))
  with check (public.is_admin() or public.has_active_stable_role(stable_id, 'trainer') or public.has_active_stable_role(stable_id, 'stable_manager'));

drop policy if exists "biochemistry_notes_insert_writable" on public.biochemistry_test_notes;
create policy "biochemistry_notes_insert_commenter" on public.biochemistry_test_notes for insert
  with check (created_by_user_id = public.current_app_user_id()
    and public.can_comment_biochemistry_horse(horse_id));
drop policy if exists "biochemistry_notes_update_writable_or_delete_allowed" on public.biochemistry_test_notes;
create policy "biochemistry_notes_update_author_or_admin" on public.biochemistry_test_notes for update
  using (public.can_manage_biochemistry_comment(id))
  with check ((created_by_user_id = public.current_app_user_id() or public.is_admin())
    and char_length(note_text) between 1 and 2000);

insert into public.membership_levels (code,name,description,is_paid,is_custom,sort_order) values
 ('administrator','Administrator','Global operational administrator.',false,false,100),
 ('stable-manager','Stable Manager','Single-stable operational manager.',false,false,80),
 ('veterinarian','Veterinarian','Explicit assigned-horse professional.',false,false,60),
 ('consultant','Consultant','Explicit assigned-horse professional.',false,false,50),
 ('stable-hand','Stable Hand','Single-stable explicitly assigned horse support.',false,false,40)
on conflict (code) do update set name=excluded.name,description=excluded.description,sort_order=excluded.sort_order;

revoke execute on function public.is_active_app_user() from public, anon;
revoke execute on function public.current_primary_role() from public, anon;
revoke execute on function public.has_active_stable_role(uuid,text) from public, anon;
revoke execute on function public.has_explicit_horse_role(uuid,text[]) from public, anon;
revoke execute on function public.can_comment_biochemistry_horse(uuid) from public, anon;
revoke execute on function public.can_manage_biochemistry_comment(uuid) from public, anon;
grant execute on function public.is_active_app_user() to authenticated;
grant execute on function public.current_primary_role() to authenticated;
grant execute on function public.has_active_stable_role(uuid,text) to authenticated;
grant execute on function public.has_explicit_horse_role(uuid,text[]) to authenticated;
grant execute on function public.can_comment_biochemistry_horse(uuid) to authenticated;
grant execute on function public.can_manage_biochemistry_comment(uuid) to authenticated;
