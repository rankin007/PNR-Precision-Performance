-- Staff scope support and initial permission seeds.
-- This migration introduces stable-scoped staff assignments and baseline
-- permission codes used by the application and RLS layer.

create table if not exists public.stable_staff_assignments (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  member_profile_id uuid not null references public.member_profiles(id) on delete cascade,
  role_code text not null,
  access_level text not null default 'read',
  starts_at timestamptz,
  ends_at timestamptz,
  is_primary boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (stable_id, member_profile_id, role_code)
);

create index if not exists idx_stable_staff_assignments_stable_id
  on public.stable_staff_assignments (stable_id);

create index if not exists idx_stable_staff_assignments_member_profile_id
  on public.stable_staff_assignments (member_profile_id);

insert into public.permissions (code, name, description, scope)
values
  ('platform.admin', 'Platform Admin', 'Full administrative access to the platform.', 'admin'),
  ('stable.staff.read', 'Stable Staff Read', 'Read access to stable-scoped operational data.', 'stable'),
  ('stable.staff.write', 'Stable Staff Write', 'Write access to stable-scoped operational data.', 'stable'),
  ('horse.records.write', 'Horse Records Write', 'Create and update horse operational records.', 'horse'),
  ('commerce.finance', 'Commerce Finance', 'Access finance and billing administration features.', 'commerce'),
  ('membership.manage', 'Membership Manage', 'Manage membership levels, assignments, and permissions.', 'membership')
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  scope = excluded.scope;
