-- Generated file: supabase/bootstrap/remote-init.sql
-- Source migrations are concatenated in lexical order from supabase/migrations.
-- Regenerate with: npm run db:bundle

-- >>> BEGIN 0001_initial_schema.sql
-- Initial schema outline for the equine platform.
-- This migration establishes the first-pass table structure only.
-- Row-level security policies, triggers, indexes, and helper functions
-- should be added in later migrations after business rules are finalized.

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.member_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  display_name text,
  first_name text,
  last_name text,
  phone text,
  organisation_name text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.membership_levels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  is_paid boolean not null default false,
  is_custom boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  scope text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_membership_levels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  membership_level_id uuid not null references public.membership_levels(id) on delete cascade,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, membership_level_id)
);

create table if not exists public.membership_level_permissions (
  id uuid primary key default gen_random_uuid(),
  membership_level_id uuid not null references public.membership_levels(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (membership_level_id, permission_id)
);

create table if not exists public.stables (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  location text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.horses (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid references public.stables(id) on delete set null,
  name text not null,
  slug text unique,
  sex text,
  date_of_birth date,
  colour text,
  breed text,
  microchip_number text,
  registration_number text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  member_profile_id uuid unique references public.member_profiles(id) on delete set null,
  display_name text not null,
  license_number text,
  phone text,
  email text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.owners (
  id uuid primary key default gen_random_uuid(),
  member_profile_id uuid unique references public.member_profiles(id) on delete set null,
  display_name text not null,
  ownership_type text,
  phone text,
  email text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.horse_assignments (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  owner_id uuid references public.owners(id) on delete set null,
  trainer_id uuid references public.trainers(id) on delete set null,
  stable_id uuid references public.stables(id) on delete set null,
  assignment_type text not null,
  access_level text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_primary boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.weather_logs (
  id uuid primary key default gen_random_uuid(),
  stable_id uuid not null references public.stables(id) on delete cascade,
  weather_date date not null,
  ambient_temperature_value numeric(10,2),
  ambient_temperature_unit text,
  conditions text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (stable_id, weather_date)
);

create table if not exists public.daily_records (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  record_date date not null,
  recorded_by_user_id uuid references public.users(id) on delete set null,
  stable_id uuid references public.stables(id) on delete set null,
  weather_log_id uuid references public.weather_logs(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (horse_id, record_date)
);

create table if not exists public.temperature_logs (
  id uuid primary key default gen_random_uuid(),
  daily_record_id uuid not null references public.daily_records(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  temperature_value numeric(10,2) not null,
  temperature_unit text not null,
  notes text,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.weight_logs (
  id uuid primary key default gen_random_uuid(),
  daily_record_id uuid not null references public.daily_records(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  weight_value numeric(10,2) not null,
  weight_unit text not null,
  notes text,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.water_intake_logs (
  id uuid primary key default gen_random_uuid(),
  daily_record_id uuid not null references public.daily_records(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  recorded_at timestamptz not null default now(),
  volume_value numeric(10,2) not null,
  volume_unit text not null,
  notes text,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.food_menus (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid references public.horses(id) on delete cascade,
  name text not null,
  description text,
  is_active boolean not null default true,
  effective_from date,
  effective_to date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.feeding_logs (
  id uuid primary key default gen_random_uuid(),
  daily_record_id uuid references public.daily_records(id) on delete set null,
  horse_id uuid not null references public.horses(id) on delete cascade,
  food_menu_id uuid references public.food_menus(id) on delete set null,
  fed_at timestamptz not null default now(),
  notes text,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.track_sessions (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  session_date date not null,
  session_time timestamptz,
  distance_value numeric(10,2),
  distance_unit text,
  duration_seconds integer,
  session_type text,
  surface text,
  notes text,
  weather_log_id uuid references public.weather_logs(id) on delete set null,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_category_id uuid references public.product_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  sku text unique,
  price_amount numeric(12,2) not null default 0,
  currency_code text not null default 'AUD',
  status text not null default 'draft',
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  status text not null default 'pending',
  subtotal_amount numeric(12,2) not null default 0,
  tax_amount numeric(12,2) not null default 0,
  total_amount numeric(12,2) not null default 0,
  currency_code text not null default 'AUD',
  ordered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null default 1,
  unit_price_amount numeric(12,2) not null default 0,
  line_total_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  membership_level_id uuid references public.membership_levels(id) on delete set null,
  status text not null default 'inactive',
  billing_provider text,
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  invoice_number text unique,
  status text not null default 'draft',
  issue_date date,
  due_date date,
  total_amount numeric(12,2) not null default 0,
  currency_code text not null default 'AUD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  provider text,
  provider_payment_id text,
  amount numeric(12,2) not null default 0,
  currency_code text not null default 'AUD',
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before_state jsonb,
  after_state jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_horse_assignments_horse_id on public.horse_assignments (horse_id);
create index if not exists idx_daily_records_horse_id on public.daily_records (horse_id);
create index if not exists idx_temperature_logs_daily_record_id on public.temperature_logs (daily_record_id);
create index if not exists idx_weight_logs_daily_record_id on public.weight_logs (daily_record_id);
create index if not exists idx_water_intake_logs_daily_record_id on public.water_intake_logs (daily_record_id);
create index if not exists idx_track_sessions_horse_id on public.track_sessions (horse_id);
create index if not exists idx_orders_user_id on public.orders (user_id);
create index if not exists idx_payments_user_id on public.payments (user_id);
create index if not exists idx_audit_logs_actor_user_id on public.audit_logs (actor_user_id);

-- <<< END 0001_initial_schema.sql

-- >>> BEGIN 0002_rls_policies.sql
-- Row-level security helper functions and baseline policies.
-- This migration instantiates the confirmed admin, trainer, and owner model.
-- Stable-scoped staff access can be layered in a later migration once a
-- dedicated staff-to-stable mapping table is introduced.

create or replace function public.current_app_user_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select u.id
  from public.users u
  where u.auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.has_permission(permission_code text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users u
    join public.user_membership_levels uml on uml.user_id = u.id
    join public.membership_level_permissions mlp on mlp.membership_level_id = uml.membership_level_id
    join public.permissions p on p.id = mlp.permission_id
    where u.auth_user_id = auth.uid()
      and p.code = permission_code
      and (uml.starts_at is null or uml.starts_at <= now())
      and (uml.ends_at is null or uml.ends_at >= now())
  )
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_permission('platform.admin')
$$;

create or replace function public.current_member_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select mp.id
  from public.member_profiles mp
  join public.users u on u.id = mp.user_id
  where u.auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.can_access_horse(target_horse_id uuid)
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
      from public.horse_assignments ha
      join public.trainers t on t.id = ha.trainer_id
      where ha.horse_id = target_horse_id
        and t.member_profile_id = public.current_member_profile_id()
        and (ha.starts_at is null or ha.starts_at <= now())
        and (ha.ends_at is null or ha.ends_at >= now())
    )
    or exists (
      select 1
      from public.horse_assignments ha
      join public.owners o on o.id = ha.owner_id
      where ha.horse_id = target_horse_id
        and o.member_profile_id = public.current_member_profile_id()
        and (ha.starts_at is null or ha.starts_at <= now())
        and (ha.ends_at is null or ha.ends_at >= now())
    )
$$;

create or replace function public.can_manage_horse_records(target_horse_id uuid)
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
      from public.horse_assignments ha
      join public.trainers t on t.id = ha.trainer_id
      where ha.horse_id = target_horse_id
        and t.member_profile_id = public.current_member_profile_id()
        and (ha.starts_at is null or ha.starts_at <= now())
        and (ha.ends_at is null or ha.ends_at >= now())
    )
$$;

alter table public.users enable row level security;
alter table public.member_profiles enable row level security;
alter table public.membership_levels enable row level security;
alter table public.permissions enable row level security;
alter table public.user_membership_levels enable row level security;
alter table public.membership_level_permissions enable row level security;
alter table public.stables enable row level security;
alter table public.horses enable row level security;
alter table public.trainers enable row level security;
alter table public.owners enable row level security;
alter table public.horse_assignments enable row level security;
alter table public.weather_logs enable row level security;
alter table public.daily_records enable row level security;
alter table public.temperature_logs enable row level security;
alter table public.weight_logs enable row level security;
alter table public.water_intake_logs enable row level security;
alter table public.food_menus enable row level security;
alter table public.feeding_logs enable row level security;
alter table public.track_sessions enable row level security;
alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.subscriptions enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.audit_logs enable row level security;

create policy "users_select_self_or_admin"
on public.users
for select
using (id = public.current_app_user_id() or public.is_admin());

create policy "users_update_self_or_admin"
on public.users
for update
using (id = public.current_app_user_id() or public.is_admin())
with check (id = public.current_app_user_id() or public.is_admin());

create policy "member_profiles_select_self_or_admin"
on public.member_profiles
for select
using (user_id = public.current_app_user_id() or public.is_admin());

create policy "member_profiles_update_self_or_admin"
on public.member_profiles
for update
using (user_id = public.current_app_user_id() or public.is_admin())
with check (user_id = public.current_app_user_id() or public.is_admin());

create policy "membership_levels_self_or_admin_select"
on public.membership_levels
for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.user_membership_levels uml
    where uml.membership_level_id = membership_levels.id
      and uml.user_id = public.current_app_user_id()
      and (uml.starts_at is null or uml.starts_at <= now())
      and (uml.ends_at is null or uml.ends_at >= now())
  )
);

create policy "membership_levels_admin_manage"
on public.membership_levels
for all
using (public.is_admin())
with check (public.is_admin());

create policy "permissions_self_or_admin_select"
on public.permissions
for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.user_membership_levels uml
    join public.membership_level_permissions mlp on mlp.membership_level_id = uml.membership_level_id
    where mlp.permission_id = permissions.id
      and uml.user_id = public.current_app_user_id()
      and (uml.starts_at is null or uml.starts_at <= now())
      and (uml.ends_at is null or uml.ends_at >= now())
  )
);

create policy "permissions_admin_manage"
on public.permissions
for all
using (public.is_admin())
with check (public.is_admin());

create policy "user_membership_levels_self_or_admin_select"
on public.user_membership_levels
for select
using (
  user_id = public.current_app_user_id()
  or public.is_admin()
);

create policy "user_membership_levels_admin_manage"
on public.user_membership_levels
for all
using (public.is_admin())
with check (public.is_admin());

create policy "membership_level_permissions_self_or_admin_select"
on public.membership_level_permissions
for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.user_membership_levels uml
    where uml.membership_level_id = membership_level_permissions.membership_level_id
      and uml.user_id = public.current_app_user_id()
      and (uml.starts_at is null or uml.starts_at <= now())
      and (uml.ends_at is null or uml.ends_at >= now())
  )
);

create policy "membership_level_permissions_admin_manage"
on public.membership_level_permissions
for all
using (public.is_admin())
with check (public.is_admin());

create policy "stables_visible_through_horse_access_or_admin"
on public.stables
for select
using (
  public.is_admin()
  or exists (
    select 1
    from public.horses h
    where h.stable_id = stables.id
      and public.can_access_horse(h.id)
  )
);

create policy "stables_admin_manage"
on public.stables
for all
using (public.is_admin())
with check (public.is_admin());

create policy "horses_select_accessible"
on public.horses
for select
using (public.can_access_horse(id));

create policy "horses_manage_admin_only"
on public.horses
for all
using (public.is_admin())
with check (public.is_admin());

create policy "trainers_select_self_or_admin"
on public.trainers
for select
using (
  member_profile_id = public.current_member_profile_id()
  or public.is_admin()
);

create policy "trainers_manage_admin_only"
on public.trainers
for all
using (public.is_admin())
with check (public.is_admin());

create policy "owners_select_self_or_admin"
on public.owners
for select
using (
  member_profile_id = public.current_member_profile_id()
  or public.is_admin()
);

create policy "owners_manage_admin_only"
on public.owners
for all
using (public.is_admin())
with check (public.is_admin());

create policy "horse_assignments_select_related_or_admin"
on public.horse_assignments
for select
using (
  public.can_access_horse(horse_id)
  or public.is_admin()
);

create policy "horse_assignments_insert_trainer_or_admin"
on public.horse_assignments
for insert
with check (
  public.is_admin()
  or (
    public.can_manage_horse_records(horse_id)
    and (
      trainer_id is not null
      or owner_id is not null
    )
  )
);

create policy "horse_assignments_update_trainer_or_admin"
on public.horse_assignments
for update
using (
  public.is_admin()
  or public.can_manage_horse_records(horse_id)
)
with check (
  public.is_admin()
  or public.can_manage_horse_records(horse_id)
);

create policy "horse_assignments_delete_admin_only"
on public.horse_assignments
for delete
using (public.is_admin());

create policy "weather_logs_select_via_accessible_horse_or_admin"
on public.weather_logs
for select
using (
  public.is_admin()
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

create policy "weather_logs_manage_trainers_or_admin"
on public.weather_logs
for all
using (
  public.is_admin()
  or exists (
    select 1
    from public.horses h
    where h.stable_id = weather_logs.stable_id
      and public.can_manage_horse_records(h.id)
  )
)
with check (
  public.is_admin()
  or exists (
    select 1
    from public.horses h
    where h.stable_id = weather_logs.stable_id
      and public.can_manage_horse_records(h.id)
  )
);

create policy "daily_records_select_accessible"
on public.daily_records
for select
using (public.can_access_horse(horse_id));

create policy "daily_records_insert_manageable"
on public.daily_records
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "daily_records_update_manageable"
on public.daily_records
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "temperature_logs_select_accessible"
on public.temperature_logs
for select
using (public.can_access_horse(horse_id));

create policy "temperature_logs_insert_manageable"
on public.temperature_logs
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "temperature_logs_update_manageable"
on public.temperature_logs
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "weight_logs_select_accessible"
on public.weight_logs
for select
using (public.can_access_horse(horse_id));

create policy "weight_logs_insert_manageable"
on public.weight_logs
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "weight_logs_update_manageable"
on public.weight_logs
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "water_intake_logs_select_accessible"
on public.water_intake_logs
for select
using (public.can_access_horse(horse_id));

create policy "water_intake_logs_insert_manageable"
on public.water_intake_logs
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "water_intake_logs_update_manageable"
on public.water_intake_logs
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "food_menus_select_accessible"
on public.food_menus
for select
using (
  horse_id is null
  or public.can_access_horse(horse_id)
);

create policy "food_menus_manage_trainers_or_admin"
on public.food_menus
for all
using (
  (horse_id is null and public.is_admin())
  or (horse_id is not null and public.can_manage_horse_records(horse_id))
)
with check (
  (horse_id is null and public.is_admin())
  or (horse_id is not null and public.can_manage_horse_records(horse_id))
);

create policy "feeding_logs_select_accessible"
on public.feeding_logs
for select
using (public.can_access_horse(horse_id));

create policy "feeding_logs_insert_manageable"
on public.feeding_logs
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "feeding_logs_update_manageable"
on public.feeding_logs
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "track_sessions_select_accessible"
on public.track_sessions
for select
using (public.can_access_horse(horse_id));

create policy "track_sessions_insert_manageable"
on public.track_sessions
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "track_sessions_update_manageable"
on public.track_sessions
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "product_categories_public_read"
on public.product_categories
for select
using (is_active or public.is_admin());

create policy "product_categories_admin_manage"
on public.product_categories
for all
using (public.is_admin())
with check (public.is_admin());

create policy "products_public_read_active"
on public.products
for select
using (status = 'active' or public.is_admin());

create policy "products_admin_manage"
on public.products
for all
using (public.is_admin())
with check (public.is_admin());

create policy "orders_select_self_or_admin"
on public.orders
for select
using (user_id = public.current_app_user_id() or public.is_admin());

create policy "orders_insert_self_or_admin"
on public.orders
for insert
with check (user_id = public.current_app_user_id() or public.is_admin());

create policy "orders_update_self_or_admin"
on public.orders
for update
using (user_id = public.current_app_user_id() or public.is_admin())
with check (user_id = public.current_app_user_id() or public.is_admin());

create policy "order_items_select_via_order_access"
on public.order_items
for select
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and (o.user_id = public.current_app_user_id() or public.is_admin())
  )
);

create policy "order_items_insert_via_order_access"
on public.order_items
for insert
with check (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and (o.user_id = public.current_app_user_id() or public.is_admin())
  )
);

create policy "order_items_update_via_order_access"
on public.order_items
for update
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and (o.user_id = public.current_app_user_id() or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and (o.user_id = public.current_app_user_id() or public.is_admin())
  )
);

create policy "subscriptions_select_self_or_admin"
on public.subscriptions
for select
using (user_id = public.current_app_user_id() or public.is_admin());

create policy "subscriptions_manage_self_or_admin"
on public.subscriptions
for all
using (user_id = public.current_app_user_id() or public.is_admin())
with check (user_id = public.current_app_user_id() or public.is_admin());

create policy "invoices_select_self_or_admin"
on public.invoices
for select
using (user_id = public.current_app_user_id() or public.is_admin());

create policy "invoices_manage_admin_only"
on public.invoices
for all
using (public.is_admin())
with check (public.is_admin());

create policy "payments_select_self_or_admin"
on public.payments
for select
using (user_id = public.current_app_user_id() or public.is_admin());

create policy "payments_manage_admin_only"
on public.payments
for all
using (public.is_admin())
with check (public.is_admin());

create policy "audit_logs_admin_only"
on public.audit_logs
for all
using (public.is_admin())
with check (public.is_admin());

-- <<< END 0002_rls_policies.sql

-- >>> BEGIN 0003_staff_scope_and_permissions.sql
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

-- <<< END 0003_staff_scope_and_permissions.sql

-- >>> BEGIN 0004_staff_rls_extension.sql
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

-- <<< END 0004_staff_rls_extension.sql

-- >>> BEGIN 0005_membership_level_seeds.sql
-- Seed baseline membership levels and permission mappings.

insert into public.membership_levels (code, name, description, is_paid, is_custom, sort_order)
values
  ('public', 'Public', 'Public-facing access level for non-member experiences.', false, false, 10),
  ('owner', 'Owner', 'Owner access to explicitly assigned horses and related records.', false, false, 20),
  ('trainer', 'Trainer', 'Trainer access to horses under active control and operational records.', false, false, 30),
  ('staff', 'Staff', 'Stable-scoped operational staff access.', false, false, 40),
  ('admin', 'Admin', 'Full administrative access to the platform.', false, false, 50)
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  is_paid = excluded.is_paid,
  is_custom = excluded.is_custom,
  sort_order = excluded.sort_order;

insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from public.membership_levels ml
join public.permissions p on p.code in ('horse.records.write')
where ml.code = 'trainer'
on conflict (membership_level_id, permission_id) do nothing;

insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from public.membership_levels ml
join public.permissions p on p.code in ('stable.staff.read', 'stable.staff.write')
where ml.code = 'staff'
on conflict (membership_level_id, permission_id) do nothing;

insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from public.membership_levels ml
join public.permissions p on p.code in (
  'platform.admin',
  'stable.staff.read',
  'stable.staff.write',
  'horse.records.write',
  'commerce.finance',
  'membership.manage'
)
where ml.code = 'admin'
on conflict (membership_level_id, permission_id) do nothing;


-- <<< END 0005_membership_level_seeds.sql

-- >>> BEGIN 0006_stripe_checkout_persistence.sql
alter table public.orders
  add column if not exists provider text,
  add column if not exists provider_checkout_session_id text,
  add column if not exists provider_payment_intent_id text;

alter table public.payments
  add column if not exists provider_checkout_session_id text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_provider_checkout_session_unique'
  ) then
    alter table public.orders
      add constraint orders_provider_checkout_session_unique
      unique (provider, provider_checkout_session_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'payments_provider_payment_unique'
  ) then
    alter table public.payments
      add constraint payments_provider_payment_unique
      unique (provider, provider_payment_id);
  end if;
end
$$;

create index if not exists idx_orders_provider_payment_intent_id
  on public.orders (provider_payment_intent_id);

create index if not exists idx_payments_provider_checkout_session_id
  on public.payments (provider_checkout_session_id);

-- <<< END 0006_stripe_checkout_persistence.sql

-- >>> BEGIN 0007_test_product_seeds.sql
insert into public.product_categories (name, slug, description, is_active)
values
  (
    'Performance Services',
    'performance-services',
    'Structured performance review and reporting products for racehorse operations.',
    true
  ),
  (
    'Operations Resources',
    'operations-resources',
    'Operational support resources for stables, staff, and reporting workflows.',
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  is_active = excluded.is_active,
  updated_at = now();

with category_map as (
  select id, slug
  from public.product_categories
  where slug in ('performance-services', 'operations-resources')
)
insert into public.products (
  product_category_id,
  name,
  slug,
  description,
  sku,
  price_amount,
  currency_code,
  status
)
values
  (
    (select id from category_map where slug = 'performance-services'),
    'Performance Review Pack',
    'performance-review-pack',
    'Structured review pack for owners and trainers with racehorse performance context and reporting support.',
    'PNR-PRP-001',
    149.00,
    'AUD',
    'active'
  ),
  (
    (select id from category_map where slug = 'performance-services'),
    'Biochemistry Reporting Bundle',
    'biochemistry-reporting-bundle',
    'Biochemistry interpretation and reporting support for owners, trainers, and advisory workflows.',
    'PNR-BRB-001',
    249.00,
    'AUD',
    'active'
  ),
  (
    (select id from category_map where slug = 'operations-resources'),
    'Stable Operations Toolkit',
    'stable-operations-toolkit',
    'Operational templates and structured reporting support for stable workflows and administration.',
    'PNR-SOT-001',
    89.00,
    'AUD',
    'active'
  )
on conflict (slug) do update
set
  product_category_id = excluded.product_category_id,
  name = excluded.name,
  description = excluded.description,
  sku = excluded.sku,
  price_amount = excluded.price_amount,
  currency_code = excluded.currency_code,
  status = excluded.status,
  updated_at = now();

-- <<< END 0007_test_product_seeds.sql

-- >>> BEGIN 0008_launch_membership_permission_seeds.sql
-- Launch membership and permission seed shape.
-- This migration is additive and idempotent. It updates launch labels and
-- ensures the required membership/permission mappings exist without deleting
-- existing production assignments or custom permission mappings.

insert into public.permissions (code, name, description, scope)
values
  ('platform.admin', 'Platform Admin', 'Full administrative access to the platform.', 'admin'),
  ('stable.staff.read', 'Stable Staff Read', 'Read access to stable-scoped operational data.', 'stable'),
  ('stable.staff.write', 'Stable Staff Write', 'Write access to stable-scoped operational data.', 'stable'),
  ('horse.records.write', 'Horse Records Write', 'Create and update horse operational records.', 'horse'),
  ('commerce.finance', 'Commerce Finance', 'Access finance, orders, products, payments, and checkout reconciliation visibility.', 'commerce'),
  ('membership.manage', 'Membership Manage', 'Manage membership levels, assignments, and permissions.', 'membership')
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  scope = excluded.scope;

insert into public.membership_levels (code, name, description, is_paid, is_custom, sort_order)
values
  (
    'public',
    'Public',
    'Public-facing baseline for unauthenticated and non-member experiences. This level should not be assigned for portal access.',
    false,
    false,
    10
  ),
  (
    'owner',
    'Owner / Read-Only Member',
    'Active owner or read-only member access. Portal access is limited by assigned-horse RLS and does not include operational write permission.',
    false,
    false,
    20
  ),
  (
    'trainer',
    'Trainer / Record Writer',
    'Active trainer access with assigned-horse portal access and horse operational record write permission.',
    false,
    false,
    30
  ),
  (
    'stable-staff',
    'Stable Staff',
    'Operational staff access scoped through stable staff assignments, with stable read/write and horse record write permissions.',
    false,
    false,
    40
  ),
  (
    'staff',
    'Staff (Legacy Alias)',
    'Backward-compatible staff level retained for existing assignments; use stable-staff for new launch assignments.',
    false,
    false,
    45
  ),
  (
    'commerce-admin',
    'Commerce Admin',
    'Commerce operator access for products, orders, payments, and checkout reconciliation visibility without full platform administration.',
    false,
    false,
    50
  ),
  (
    'membership-admin',
    'Membership Admin',
    'Membership operator access for assigning and managing member levels without full platform administration.',
    false,
    false,
    60
  ),
  (
    'admin',
    'Platform Admin',
    'Full platform administration for launch operations, membership management, stable operations, and commerce visibility.',
    false,
    false,
    70
  )
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  is_paid = excluded.is_paid,
  is_custom = excluded.is_custom,
  sort_order = excluded.sort_order,
  updated_at = now();

with mapping(level_code, permission_code) as (
  values
    ('trainer', 'horse.records.write'),
    ('stable-staff', 'stable.staff.read'),
    ('stable-staff', 'stable.staff.write'),
    ('stable-staff', 'horse.records.write'),
    ('staff', 'stable.staff.read'),
    ('staff', 'stable.staff.write'),
    ('staff', 'horse.records.write'),
    ('commerce-admin', 'commerce.finance'),
    ('membership-admin', 'membership.manage'),
    ('admin', 'platform.admin'),
    ('admin', 'stable.staff.read'),
    ('admin', 'stable.staff.write'),
    ('admin', 'horse.records.write'),
    ('admin', 'commerce.finance'),
    ('admin', 'membership.manage')
)
insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from mapping m
join public.membership_levels ml on ml.code = m.level_code
join public.permissions p on p.code = m.permission_code
on conflict (membership_level_id, permission_id) do nothing;

-- <<< END 0008_launch_membership_permission_seeds.sql

-- >>> BEGIN 0009_biochemistry_test_data_model.sql
-- Sprint 013 - Biochemistry test data model and exact lookup seeds.
-- Source CSV: references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv
-- Lookup counts: carbs=151, ph_average=521, salts=801, urea=301

create table if not exists public.biochemistry_lookup_values (
  id uuid primary key default gen_random_uuid(),
  lookup_type text not null check (lookup_type in ('carbs', 'ph_average', 'salts', 'urea')),
  exact_reading numeric(12,4) not null,
  exact_reading_text text not null,
  loss_fraction numeric(10,6) not null check (loss_fraction >= 0 and loss_fraction <= 1),
  loss_percent_text text not null,
  increment_fraction numeric(10,6),
  increment_percent_text text,
  source_document text not null,
  source_version text not null default 'v1',
  source_row_number integer,
  created_at timestamptz not null default now(),
  unique (lookup_type, exact_reading, source_version)
);

create table if not exists public.biochemistry_horse_access_assignments (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  stable_id uuid references public.stables(id) on delete set null,
  member_profile_id uuid not null references public.member_profiles(id) on delete cascade,
  role_code text not null check (role_code in ('trainer', 'staff', 'vet', 'owner')),
  access_level text not null check (access_level in ('read', 'write', 'manage')),
  nominated_by_user_id uuid references public.users(id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (horse_id, member_profile_id, role_code)
);

create table if not exists public.biochemistry_tests (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  stable_id uuid references public.stables(id) on delete set null,
  test_date date not null,
  time_of_day text not null default 'unspecified' check (time_of_day in ('am', 'pm', 'unspecified')),
  carbs_reading numeric(12,4) not null,
  ph_saliva numeric(12,4) not null,
  ph_urine numeric(12,4) not null,
  ph_average numeric(12,4) not null,
  conductivity_raw_meter_value numeric(12,4) not null,
  conductivity_converted_c_value numeric(12,4) not null,
  urea_reading numeric(12,4) not null,
  carbs_lookup_value_id uuid references public.biochemistry_lookup_values(id) on delete restrict,
  ph_average_lookup_value_id uuid references public.biochemistry_lookup_values(id) on delete restrict,
  salts_lookup_value_id uuid references public.biochemistry_lookup_values(id) on delete restrict,
  urea_lookup_value_id uuid references public.biochemistry_lookup_values(id) on delete restrict,
  carbs_loss_fraction numeric(10,6),
  ph_average_loss_fraction numeric(10,6),
  salts_loss_fraction numeric(10,6),
  urea_loss_fraction numeric(10,6),
  hydration_score_energy_loss numeric(10,6),
  hydration_score numeric(10,6),
  health_score_energy_loss numeric(10,6),
  health_score numeric(10,6),
  scoring_status text not null default 'unscored' check (scoring_status in ('scored', 'blocked', 'unscored')),
  scoring_blockers jsonb not null default '[]'::jsonb,
  formula_version text not null default 'biochemistry-score-v1',
  lookup_source_document text not null default 'Reading Tables v1.csv',
  lookup_source_version text not null default 'v1',
  created_by_user_id uuid references public.users(id) on delete set null,
  updated_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by_user_id uuid references public.users(id) on delete set null,
  delete_reason text,
  check (ph_average = ((ph_saliva + ph_urine) / 2)),
  check (conductivity_converted_c_value = (conductivity_raw_meter_value * 1.43)),
  check (deleted_at is null or deleted_by_user_id is not null)
);

create table if not exists public.biochemistry_test_uploads (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.biochemistry_tests(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  file_name text not null,
  file_category text not null check (file_category in ('pdf', 'csv', 'png', 'jpg', 'jpeg', 'photo')),
  content_type text not null,
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 2097152),
  storage_path text not null,
  uploaded_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by_user_id uuid references public.users(id) on delete set null,
  delete_reason text,
  check (deleted_at is null or deleted_by_user_id is not null)
);

create table if not exists public.biochemistry_test_notes (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.biochemistry_tests(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  note_text text not null,
  note_source text not null default 'manual' check (note_source in ('manual', 'imported')),
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by_user_id uuid references public.users(id) on delete set null,
  delete_reason text,
  check (deleted_at is null or deleted_by_user_id is not null)
);

create index if not exists idx_biochemistry_lookup_values_type_reading
  on public.biochemistry_lookup_values (lookup_type, exact_reading, source_version);
create index if not exists idx_biochemistry_horse_access_horse_id
  on public.biochemistry_horse_access_assignments (horse_id);
create index if not exists idx_biochemistry_horse_access_member_profile_id
  on public.biochemistry_horse_access_assignments (member_profile_id);
create index if not exists idx_biochemistry_tests_horse_date
  on public.biochemistry_tests (horse_id, test_date desc);
create unique index if not exists idx_biochemistry_tests_unique_active_horse_date_time
  on public.biochemistry_tests (horse_id, test_date, time_of_day)
  where deleted_at is null;
create index if not exists idx_biochemistry_test_uploads_test_id
  on public.biochemistry_test_uploads (test_id);
create index if not exists idx_biochemistry_test_notes_test_id
  on public.biochemistry_test_notes (test_id);

create or replace function public.can_read_biochemistry_horse(target_horse_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.can_access_horse(target_horse_id)
    or exists (
      select 1
      from public.biochemistry_horse_access_assignments bha
      where bha.horse_id = target_horse_id
        and bha.member_profile_id = public.current_member_profile_id()
        and bha.access_level in ('read', 'write', 'manage')
        and (bha.starts_at is null or bha.starts_at <= now())
        and (bha.ends_at is null or bha.ends_at >= now())
    )
$$;

create or replace function public.can_write_biochemistry_horse(target_horse_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.can_manage_horse_records(target_horse_id)
    or exists (
      select 1
      from public.biochemistry_horse_access_assignments bha
      where bha.horse_id = target_horse_id
        and bha.member_profile_id = public.current_member_profile_id()
        and bha.role_code in ('trainer', 'staff')
        and bha.access_level in ('write', 'manage')
        and (bha.starts_at is null or bha.starts_at <= now())
        and (bha.ends_at is null or bha.ends_at >= now())
    )
    or exists (
      select 1
      from public.horses h
      where h.id = target_horse_id
        and h.stable_id is not null
        and public.can_write_stable_scope(h.stable_id)
    )
$$;

create or replace function public.can_soft_delete_biochemistry_horse(target_horse_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_admin() or public.can_manage_horse_records(target_horse_id)
$$;

alter table public.biochemistry_lookup_values enable row level security;
alter table public.biochemistry_horse_access_assignments enable row level security;
alter table public.biochemistry_tests enable row level security;
alter table public.biochemistry_test_uploads enable row level security;
alter table public.biochemistry_test_notes enable row level security;

create policy "biochemistry_lookup_values_read_authenticated"
on public.biochemistry_lookup_values
for select
using (auth.uid() is not null);

create policy "biochemistry_lookup_values_admin_manage"
on public.biochemistry_lookup_values
for all
using (public.is_admin())
with check (public.is_admin());

create policy "biochemistry_horse_access_select_related_or_admin"
on public.biochemistry_horse_access_assignments
for select
using (
  public.is_admin()
  or member_profile_id = public.current_member_profile_id()
  or public.can_manage_horse_records(horse_id)
);

create policy "biochemistry_horse_access_manage_trainer_or_admin"
on public.biochemistry_horse_access_assignments
for all
using (public.is_admin() or public.can_manage_horse_records(horse_id))
with check (public.is_admin() or public.can_manage_horse_records(horse_id));

create policy "biochemistry_tests_select_accessible"
on public.biochemistry_tests
for select
using (deleted_at is null and public.can_read_biochemistry_horse(horse_id));

create policy "biochemistry_tests_insert_writable"
on public.biochemistry_tests
for insert
with check (public.can_write_biochemistry_horse(horse_id));

create policy "biochemistry_tests_update_writable_or_delete_allowed"
on public.biochemistry_tests
for update
using (
  public.can_write_biochemistry_horse(horse_id)
  or public.can_soft_delete_biochemistry_horse(horse_id)
)
with check (
  public.can_write_biochemistry_horse(horse_id)
  or public.can_soft_delete_biochemistry_horse(horse_id)
);

create policy "biochemistry_uploads_select_accessible"
on public.biochemistry_test_uploads
for select
using (deleted_at is null and public.can_read_biochemistry_horse(horse_id));

create policy "biochemistry_uploads_insert_writable"
on public.biochemistry_test_uploads
for insert
with check (public.can_write_biochemistry_horse(horse_id));

create policy "biochemistry_uploads_update_writable_or_delete_allowed"
on public.biochemistry_test_uploads
for update
using (
  public.can_write_biochemistry_horse(horse_id)
  or public.can_soft_delete_biochemistry_horse(horse_id)
)
with check (
  public.can_write_biochemistry_horse(horse_id)
  or public.can_soft_delete_biochemistry_horse(horse_id)
);

create policy "biochemistry_notes_select_accessible"
on public.biochemistry_test_notes
for select
using (deleted_at is null and public.can_read_biochemistry_horse(horse_id));

create policy "biochemistry_notes_insert_writable"
on public.biochemistry_test_notes
for insert
with check (public.can_write_biochemistry_horse(horse_id));

create policy "biochemistry_notes_update_writable_or_delete_allowed"
on public.biochemistry_test_notes
for update
using (
  public.can_write_biochemistry_horse(horse_id)
  or public.can_soft_delete_biochemistry_horse(horse_id)
)
with check (
  public.can_write_biochemistry_horse(horse_id)
  or public.can_soft_delete_biochemistry_horse(horse_id)
);

insert into public.biochemistry_lookup_values (
  lookup_type,
  exact_reading,
  exact_reading_text,
  loss_fraction,
  loss_percent_text,
  increment_fraction,
  increment_percent_text,
  source_document,
  source_version,
  source_row_number
)
values
  ('carbs', 0.0000, '0', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 11),
  ('ph_average', 4.8000, '4.8', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 11),
  ('salts', 0.0000, '0', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 11),
  ('urea', 0.0000, '0', 0.960000, '96%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 11),
  ('carbs', 0.1000, '0.1', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 12),
  ('ph_average', 4.8100, '4.81', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 12),
  ('salts', 0.1000, '0.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 12),
  ('urea', 0.1000, '0.1', 0.944000, '94.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 12),
  ('carbs', 0.2000, '0.2', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 13),
  ('ph_average', 4.8200, '4.82', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 13),
  ('salts', 0.2000, '0.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 13),
  ('urea', 0.2000, '0.2', 0.928000, '92.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 13),
  ('carbs', 0.3000, '0.3', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 14),
  ('ph_average', 4.8300, '4.83', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 14),
  ('salts', 0.3000, '0.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 14),
  ('urea', 0.3000, '0.3', 0.912000, '91.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 14),
  ('carbs', 0.4000, '0.4', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 15),
  ('ph_average', 4.8400, '4.84', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 15),
  ('salts', 0.4000, '0.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 15),
  ('urea', 0.4000, '0.4', 0.896000, '89.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 15),
  ('carbs', 0.5000, '0.5', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 16),
  ('ph_average', 4.8500, '4.85', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 16),
  ('salts', 0.5000, '0.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 16),
  ('urea', 0.5000, '0.5', 0.880000, '88.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 16),
  ('carbs', 0.6000, '0.6', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 17),
  ('ph_average', 4.8600, '4.86', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 17),
  ('salts', 0.6000, '0.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 17),
  ('urea', 0.6000, '0.6', 0.864000, '86.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 17),
  ('carbs', 0.7000, '0.7', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 18),
  ('ph_average', 4.8700, '4.87', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 18),
  ('salts', 0.7000, '0.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 18),
  ('urea', 0.7000, '0.7', 0.848000, '84.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 18),
  ('carbs', 0.8000, '0.8', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 19),
  ('ph_average', 4.8800, '4.88', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 19),
  ('salts', 0.8000, '0.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 19),
  ('urea', 0.8000, '0.8', 0.832000, '83.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 19),
  ('carbs', 0.9000, '0.9', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 20),
  ('ph_average', 4.8900, '4.89', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 20),
  ('salts', 0.9000, '0.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 20),
  ('urea', 0.9000, '0.9', 0.816000, '81.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 20),
  ('carbs', 1.0000, '1', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 21),
  ('ph_average', 4.9000, '4.9', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 21),
  ('salts', 1.0000, '1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 21),
  ('urea', 1.0000, '1', 0.800000, '80.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 21),
  ('carbs', 1.1000, '1.1', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 22),
  ('ph_average', 4.9100, '4.91', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 22),
  ('salts', 1.1000, '1.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 22),
  ('urea', 1.1000, '1.1', 0.784000, '78.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 22),
  ('carbs', 1.2000, '1.2', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 23),
  ('ph_average', 4.9200, '4.92', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 23),
  ('salts', 1.2000, '1.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 23),
  ('urea', 1.2000, '1.2', 0.768000, '76.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 23),
  ('carbs', 1.3000, '1.3', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 24),
  ('ph_average', 4.9300, '4.93', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 24),
  ('salts', 1.3000, '1.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 24),
  ('urea', 1.3000, '1.3', 0.752000, '75.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 24),
  ('carbs', 1.4000, '1.4', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 25),
  ('ph_average', 4.9400, '4.94', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 25),
  ('salts', 1.4000, '1.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 25),
  ('urea', 1.4000, '1.4', 0.736000, '73.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 25),
  ('carbs', 1.5000, '1.5', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 26),
  ('ph_average', 4.9500, '4.95', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 26),
  ('salts', 1.5000, '1.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 26),
  ('urea', 1.5000, '1.5', 0.720000, '72.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 26),
  ('carbs', 1.6000, '1.6', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 27),
  ('ph_average', 4.9600, '4.96', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 27),
  ('salts', 1.6000, '1.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 27),
  ('urea', 1.6000, '1.6', 0.704000, '70.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 27),
  ('carbs', 1.7000, '1.7', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 28),
  ('ph_average', 4.9700, '4.97', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 28),
  ('salts', 1.7000, '1.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 28),
  ('urea', 1.7000, '1.7', 0.688000, '68.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 28),
  ('carbs', 1.8000, '1.8', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 29),
  ('ph_average', 4.9800, '4.98', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 29),
  ('salts', 1.8000, '1.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 29),
  ('urea', 1.8000, '1.8', 0.672000, '67.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 29),
  ('carbs', 1.9000, '1.9', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 30),
  ('ph_average', 4.9900, '4.99', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 30),
  ('salts', 1.9000, '1.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 30),
  ('urea', 1.9000, '1.9', 0.656000, '65.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 30),
  ('carbs', 2.0000, '2', 0.960000, '96.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 31),
  ('ph_average', 5.0000, '5', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 31),
  ('salts', 2.0000, '2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 31),
  ('urea', 2.0000, '2', 0.640000, '64.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 31),
  ('carbs', 2.1000, '2.1', 0.923300, '92.33%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 32),
  ('ph_average', 5.0100, '5.01', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 32),
  ('salts', 2.1000, '2.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 32),
  ('urea', 2.1000, '2.1', 0.624000, '62.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 32),
  ('carbs', 2.2000, '2.2', 0.886700, '88.67%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 33),
  ('ph_average', 5.0200, '5.02', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 33),
  ('salts', 2.2000, '2.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 33),
  ('urea', 2.2000, '2.2', 0.608000, '60.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 33),
  ('carbs', 2.3000, '2.3', 0.850000, '85.00%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 34),
  ('ph_average', 5.0300, '5.03', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 34),
  ('salts', 2.3000, '2.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 34),
  ('urea', 2.3000, '2.3', 0.592000, '59.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 34),
  ('carbs', 2.4000, '2.4', 0.813300, '81.33%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 35),
  ('ph_average', 5.0400, '5.04', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 35),
  ('salts', 2.4000, '2.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 35),
  ('urea', 2.4000, '2.4', 0.576000, '57.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 35),
  ('carbs', 2.5000, '2.5', 0.776700, '77.67%', 0.036700, '3.67%', 'Reading Tables v1.csv', 'v1', 36),
  ('ph_average', 5.0500, '5.05', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 36),
  ('salts', 2.5000, '2.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 36),
  ('urea', 2.5000, '2.5', 0.560000, '56.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 36),
  ('carbs', 2.6000, '2.6', 0.740000, '74.00%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 37),
  ('ph_average', 5.0600, '5.06', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 37),
  ('salts', 2.6000, '2.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 37),
  ('urea', 2.6000, '2.6', 0.544000, '54.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 37),
  ('carbs', 2.7000, '2.7', 0.657800, '65.78%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 38),
  ('ph_average', 5.0700, '5.07', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 38),
  ('salts', 2.7000, '2.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 38),
  ('urea', 2.7000, '2.7', 0.528000, '52.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 38),
  ('carbs', 2.8000, '2.8', 0.575600, '57.56%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 39),
  ('ph_average', 5.0800, '5.08', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 39),
  ('salts', 2.8000, '2.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 39),
  ('urea', 2.8000, '2.8', 0.512000, '51.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 39),
  ('carbs', 2.9000, '2.9', 0.493300, '49.33%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 40),
  ('ph_average', 5.0900, '5.09', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 40),
  ('salts', 2.9000, '2.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 40),
  ('urea', 2.9000, '2.9', 0.496000, '49.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 40),
  ('carbs', 3.0000, '3', 0.411100, '41.11%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 41),
  ('ph_average', 5.1000, '5.1', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 41),
  ('salts', 3.0000, '3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 41),
  ('urea', 3.0000, '3', 0.480000, '48.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 41),
  ('carbs', 3.1000, '3.1', 0.328900, '32.89%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 42),
  ('ph_average', 5.1100, '5.11', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 42),
  ('salts', 3.1000, '3.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 42),
  ('urea', 3.1000, '3.1', 0.464000, '46.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 42),
  ('carbs', 3.2000, '3.2', 0.246700, '24.67%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 43),
  ('ph_average', 5.1200, '5.12', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 43),
  ('salts', 3.2000, '3.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 43),
  ('urea', 3.2000, '3.2', 0.448000, '44.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 43),
  ('carbs', 3.3000, '3.3', 0.164400, '16.44%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 44),
  ('ph_average', 5.1300, '5.13', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 44),
  ('salts', 3.3000, '3.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 44),
  ('urea', 3.3000, '3.3', 0.432000, '43.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 44),
  ('carbs', 3.4000, '3.4', 0.082200, '8.22%', 0.082200, '8.22%', 'Reading Tables v1.csv', 'v1', 45),
  ('ph_average', 5.1400, '5.14', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 45),
  ('salts', 3.4000, '3.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 45),
  ('urea', 3.4000, '3.4', 0.416000, '41.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 45),
  ('carbs', 3.5000, '3.5', 0.000000, '0.00%', -0.008000, '-0.80%', 'Reading Tables v1.csv', 'v1', 46),
  ('ph_average', 5.1500, '5.15', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 46),
  ('salts', 3.5000, '3.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 46),
  ('urea', 3.5000, '3.5', 0.400000, '40.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 46),
  ('carbs', 3.6000, '3.6', 0.008000, '0.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 47),
  ('ph_average', 5.1600, '5.16', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 47),
  ('salts', 3.6000, '3.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 47),
  ('urea', 3.6000, '3.6', 0.384000, '38.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 47),
  ('carbs', 3.7000, '3.7', 0.016000, '1.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 48),
  ('ph_average', 5.1700, '5.17', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 48),
  ('salts', 3.7000, '3.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 48),
  ('urea', 3.7000, '3.7', 0.368000, '36.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 48),
  ('carbs', 3.8000, '3.8', 0.024000, '2.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 49),
  ('ph_average', 5.1800, '5.18', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 49),
  ('salts', 3.8000, '3.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 49),
  ('urea', 3.8000, '3.8', 0.352000, '35.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 49),
  ('carbs', 3.9000, '3.9', 0.032000, '3.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 50),
  ('ph_average', 5.1900, '5.19', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 50),
  ('salts', 3.9000, '3.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 50),
  ('urea', 3.9000, '3.9', 0.336000, '33.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 50),
  ('carbs', 4.0000, '4', 0.040000, '4.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 51),
  ('ph_average', 5.2000, '5.2', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 51),
  ('salts', 4.0000, '4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 51),
  ('urea', 4.0000, '4', 0.320000, '32.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 51),
  ('carbs', 4.1000, '4.1', 0.048000, '4.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 52),
  ('ph_average', 5.2100, '5.21', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 52),
  ('salts', 4.1000, '4.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 52),
  ('urea', 4.1000, '4.1', 0.304000, '30.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 52),
  ('carbs', 4.2000, '4.2', 0.056000, '5.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 53),
  ('ph_average', 5.2200, '5.22', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 53),
  ('salts', 4.2000, '4.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 53),
  ('urea', 4.2000, '4.2', 0.288000, '28.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 53),
  ('carbs', 4.3000, '4.3', 0.064000, '6.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 54),
  ('ph_average', 5.2300, '5.23', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 54),
  ('salts', 4.3000, '4.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 54),
  ('urea', 4.3000, '4.3', 0.272000, '27.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 54),
  ('carbs', 4.4000, '4.4', 0.072000, '7.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 55),
  ('ph_average', 5.2400, '5.24', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 55),
  ('salts', 4.4000, '4.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 55),
  ('urea', 4.4000, '4.4', 0.256000, '25.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 55),
  ('carbs', 4.5000, '4.5', 0.080000, '8.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 56),
  ('ph_average', 5.2500, '5.25', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 56),
  ('salts', 4.5000, '4.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 56),
  ('urea', 4.5000, '4.5', 0.240000, '24.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 56),
  ('carbs', 4.6000, '4.6', 0.088000, '8.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 57),
  ('ph_average', 5.2600, '5.26', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 57),
  ('salts', 4.6000, '4.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 57),
  ('urea', 4.6000, '4.6', 0.224000, '22.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 57),
  ('carbs', 4.7000, '4.7', 0.096000, '9.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 58),
  ('ph_average', 5.2700, '5.27', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 58),
  ('salts', 4.7000, '4.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 58),
  ('urea', 4.7000, '4.7', 0.208000, '20.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 58),
  ('carbs', 4.8000, '4.8', 0.104000, '10.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 59),
  ('ph_average', 5.2800, '5.28', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 59),
  ('salts', 4.8000, '4.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 59),
  ('urea', 4.8000, '4.8', 0.192000, '19.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 59),
  ('carbs', 4.9000, '4.9', 0.112000, '11.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 60),
  ('ph_average', 5.2900, '5.29', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 60),
  ('salts', 4.9000, '4.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 60),
  ('urea', 4.9000, '4.9', 0.176000, '17.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 60),
  ('carbs', 5.0000, '5', 0.120000, '12.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 61),
  ('ph_average', 5.3000, '5.3', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 61),
  ('salts', 5.0000, '5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 61),
  ('urea', 5.0000, '5', 0.160000, '16.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 61),
  ('carbs', 5.1000, '5.1', 0.128000, '12.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 62),
  ('ph_average', 5.3100, '5.31', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 62),
  ('salts', 5.1000, '5.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 62),
  ('urea', 5.1000, '5.1', 0.144000, '14.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 62),
  ('carbs', 5.2000, '5.2', 0.136000, '13.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 63),
  ('ph_average', 5.3200, '5.32', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 63),
  ('salts', 5.2000, '5.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 63),
  ('urea', 5.2000, '5.2', 0.128000, '12.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 63),
  ('carbs', 5.3000, '5.3', 0.144000, '14.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 64),
  ('ph_average', 5.3300, '5.33', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 64),
  ('salts', 5.3000, '5.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 64),
  ('urea', 5.3000, '5.3', 0.112000, '11.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 64),
  ('carbs', 5.4000, '5.4', 0.152000, '15.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 65),
  ('ph_average', 5.3400, '5.34', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 65),
  ('salts', 5.4000, '5.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 65),
  ('urea', 5.4000, '5.4', 0.096000, '9.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 65),
  ('carbs', 5.5000, '5.5', 0.160000, '16.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 66),
  ('ph_average', 5.3500, '5.35', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 66),
  ('salts', 5.5000, '5.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 66),
  ('urea', 5.5000, '5.5', 0.080000, '8.00%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 66),
  ('carbs', 5.6000, '5.6', 0.168000, '16.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 67),
  ('ph_average', 5.3600, '5.36', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 67),
  ('salts', 5.6000, '5.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 67),
  ('urea', 5.6000, '5.6', 0.064000, '6.40%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 67),
  ('carbs', 5.7000, '5.7', 0.176000, '17.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 68),
  ('ph_average', 5.3700, '5.37', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 68),
  ('salts', 5.7000, '5.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 68),
  ('urea', 5.7000, '5.7', 0.048000, '4.80%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 68),
  ('carbs', 5.8000, '5.8', 0.184000, '18.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 69),
  ('ph_average', 5.3800, '5.38', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 69),
  ('salts', 5.8000, '5.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 69),
  ('urea', 5.8000, '5.8', 0.032000, '3.20%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 69),
  ('carbs', 5.9000, '5.9', 0.192000, '19.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 70),
  ('ph_average', 5.3900, '5.39', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 70),
  ('salts', 5.9000, '5.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 70),
  ('urea', 5.9000, '5.9', 0.016000, '1.60%', 0.016000, '1.60%', 'Reading Tables v1.csv', 'v1', 70),
  ('carbs', 6.0000, '6', 0.200000, '20.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 71),
  ('ph_average', 5.4000, '5.4', 0.960000, '96%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 71),
  ('salts', 6.0000, '6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 71),
  ('urea', 6.0000, '6', 0.000000, '0%', -0.016000, '-1.60%', 'Reading Tables v1.csv', 'v1', 71),
  ('carbs', 6.1000, '6.1', 0.208000, '20.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 72),
  ('ph_average', 5.4100, '5.41', 0.955000, '95.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 72),
  ('salts', 6.1000, '6.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 72),
  ('urea', 6.1000, '6.1', 0.003100, '0.31%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 72),
  ('carbs', 6.2000, '6.2', 0.216000, '21.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 73),
  ('ph_average', 5.4200, '5.42', 0.950000, '95.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 73),
  ('salts', 6.2000, '6.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 73),
  ('urea', 6.2000, '6.2', 0.006100, '0.61%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 73),
  ('carbs', 6.3000, '6.3', 0.224000, '22.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 74),
  ('ph_average', 5.4300, '5.43', 0.945000, '94.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 74),
  ('salts', 6.3000, '6.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 74),
  ('urea', 6.3000, '6.3', 0.009200, '0.92%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 74),
  ('carbs', 6.4000, '6.4', 0.232000, '23.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 75),
  ('ph_average', 5.4400, '5.44', 0.940000, '94.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 75),
  ('salts', 6.4000, '6.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 75),
  ('urea', 6.4000, '6.4', 0.012200, '1.22%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 75),
  ('carbs', 6.5000, '6.5', 0.240000, '24.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 76),
  ('ph_average', 5.4500, '5.45', 0.935000, '93.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 76),
  ('salts', 6.5000, '6.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 76),
  ('urea', 6.5000, '6.5', 0.015300, '1.53%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 76),
  ('carbs', 6.6000, '6.6', 0.248000, '24.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 77),
  ('ph_average', 5.4600, '5.46', 0.930000, '93.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 77),
  ('salts', 6.6000, '6.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 77),
  ('urea', 6.6000, '6.6', 0.018300, '1.83%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 77),
  ('carbs', 6.7000, '6.7', 0.256000, '25.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 78),
  ('ph_average', 5.4700, '5.47', 0.925000, '92.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 78),
  ('salts', 6.7000, '6.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 78),
  ('urea', 6.7000, '6.7', 0.021400, '2.14%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 78),
  ('carbs', 6.8000, '6.8', 0.264000, '26.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 79),
  ('ph_average', 5.4800, '5.48', 0.920000, '92.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 79),
  ('salts', 6.8000, '6.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 79),
  ('urea', 6.8000, '6.8', 0.024400, '2.44%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 79),
  ('carbs', 6.9000, '6.9', 0.272000, '27.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 80),
  ('ph_average', 5.4900, '5.49', 0.915000, '91.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 80),
  ('salts', 6.9000, '6.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 80),
  ('urea', 6.9000, '6.9', 0.027500, '2.75%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 80),
  ('carbs', 7.0000, '7', 0.280000, '28.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 81),
  ('ph_average', 5.5000, '5.5', 0.910000, '91.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 81),
  ('salts', 7.0000, '7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 81),
  ('urea', 7.0000, '7', 0.030500, '3.05%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 81),
  ('carbs', 7.1000, '7.1', 0.288000, '28.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 82),
  ('ph_average', 5.5100, '5.51', 0.905000, '90.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 82),
  ('salts', 7.1000, '7.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 82),
  ('urea', 7.1000, '7.1', 0.033600, '3.36%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 82),
  ('carbs', 7.2000, '7.2', 0.296000, '29.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 83),
  ('ph_average', 5.5200, '5.52', 0.900000, '90.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 83),
  ('salts', 7.2000, '7.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 83),
  ('urea', 7.2000, '7.2', 0.036600, '3.66%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 83),
  ('carbs', 7.3000, '7.3', 0.304000, '30.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 84),
  ('ph_average', 5.5300, '5.53', 0.895000, '89.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 84),
  ('salts', 7.3000, '7.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 84),
  ('urea', 7.3000, '7.3', 0.039700, '3.97%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 84),
  ('carbs', 7.4000, '7.4', 0.312000, '31.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 85),
  ('ph_average', 5.5400, '5.54', 0.890000, '89.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 85),
  ('salts', 7.4000, '7.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 85),
  ('urea', 7.4000, '7.4', 0.042700, '4.27%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 85),
  ('carbs', 7.5000, '7.5', 0.320000, '32.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 86),
  ('ph_average', 5.5500, '5.55', 0.885000, '88.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 86),
  ('salts', 7.5000, '7.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 86),
  ('urea', 7.5000, '7.5', 0.045800, '4.58%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 86),
  ('carbs', 7.6000, '7.6', 0.328000, '32.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 87),
  ('ph_average', 5.5600, '5.56', 0.880000, '88.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 87),
  ('salts', 7.6000, '7.6', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 87),
  ('urea', 7.6000, '7.6', 0.048800, '4.88%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 87),
  ('carbs', 7.7000, '7.7', 0.336000, '33.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 88),
  ('ph_average', 5.5700, '5.57', 0.875000, '87.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 88),
  ('salts', 7.7000, '7.7', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 88),
  ('urea', 7.7000, '7.7', 0.051900, '5.19%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 88),
  ('carbs', 7.8000, '7.8', 0.344000, '34.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 89),
  ('ph_average', 5.5800, '5.58', 0.870000, '87.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 89),
  ('salts', 7.8000, '7.8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 89),
  ('urea', 7.8000, '7.8', 0.054900, '5.49%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 89),
  ('carbs', 7.9000, '7.9', 0.352000, '35.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 90),
  ('ph_average', 5.5900, '5.59', 0.865000, '86.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 90),
  ('salts', 7.9000, '7.9', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 90),
  ('urea', 7.9000, '7.9', 0.058000, '5.80%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 90),
  ('carbs', 8.0000, '8', 0.360000, '36.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 91),
  ('ph_average', 5.6000, '5.6', 0.860000, '86.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 91),
  ('salts', 8.0000, '8', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 91),
  ('urea', 8.0000, '8', 0.061000, '6.10%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 91),
  ('carbs', 8.1000, '8.1', 0.368000, '36.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 92),
  ('ph_average', 5.6100, '5.61', 0.855000, '85.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 92),
  ('salts', 8.1000, '8.1', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 92),
  ('urea', 8.1000, '8.1', 0.064100, '6.41%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 92),
  ('carbs', 8.2000, '8.2', 0.376000, '37.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 93),
  ('ph_average', 5.6200, '5.62', 0.850000, '85.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 93),
  ('salts', 8.2000, '8.2', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 93),
  ('urea', 8.2000, '8.2', 0.067100, '6.71%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 93),
  ('carbs', 8.3000, '8.3', 0.384000, '38.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 94),
  ('ph_average', 5.6300, '5.63', 0.845000, '84.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 94),
  ('salts', 8.3000, '8.3', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 94),
  ('urea', 8.3000, '8.3', 0.070200, '7.02%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 94),
  ('carbs', 8.4000, '8.4', 0.392000, '39.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 95),
  ('ph_average', 5.6400, '5.64', 0.840000, '84.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 95),
  ('salts', 8.4000, '8.4', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 95),
  ('urea', 8.4000, '8.4', 0.073200, '7.32%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 95),
  ('carbs', 8.5000, '8.5', 0.400000, '40.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 96),
  ('ph_average', 5.6500, '5.65', 0.835000, '83.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 96),
  ('salts', 8.5000, '8.5', 0.960000, '96%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 96),
  ('urea', 8.5000, '8.5', 0.076300, '7.63%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 96),
  ('carbs', 8.6000, '8.6', 0.408000, '40.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 97),
  ('ph_average', 5.6600, '5.66', 0.830000, '83.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 97),
  ('salts', 8.6000, '8.6', 0.946200, '94.62%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 97),
  ('urea', 8.6000, '8.6', 0.079300, '7.93%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 97),
  ('carbs', 8.7000, '8.7', 0.416000, '41.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 98),
  ('ph_average', 5.6700, '5.67', 0.825000, '82.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 98),
  ('salts', 8.7000, '8.7', 0.932400, '93.24%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 98),
  ('urea', 8.7000, '8.7', 0.082400, '8.24%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 98),
  ('carbs', 8.8000, '8.8', 0.424000, '42.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 99),
  ('ph_average', 5.6800, '5.68', 0.820000, '82.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 99),
  ('salts', 8.8000, '8.8', 0.918600, '91.86%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 99),
  ('urea', 8.8000, '8.8', 0.085400, '8.54%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 99),
  ('carbs', 8.9000, '8.9', 0.432000, '43.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 100),
  ('ph_average', 5.6900, '5.69', 0.815000, '81.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 100),
  ('salts', 8.9000, '8.9', 0.904800, '90.48%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 100),
  ('urea', 8.9000, '8.9', 0.088500, '8.85%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 100),
  ('carbs', 9.0000, '9', 0.440000, '44.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 101),
  ('ph_average', 5.7000, '5.7', 0.810000, '81.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 101),
  ('salts', 9.0000, '9', 0.891000, '89.10%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 101),
  ('urea', 9.0000, '9', 0.091500, '9.15%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 101),
  ('carbs', 9.1000, '9.1', 0.448000, '44.80%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 102),
  ('ph_average', 5.7100, '5.71', 0.805000, '80.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 102),
  ('salts', 9.1000, '9.1', 0.877200, '87.72%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 102),
  ('urea', 9.1000, '9.1', 0.094600, '9.46%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 102),
  ('carbs', 9.2000, '9.2', 0.456000, '45.60%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 103),
  ('ph_average', 5.7200, '5.72', 0.800000, '80.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 103),
  ('salts', 9.2000, '9.2', 0.863400, '86.34%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 103),
  ('urea', 9.2000, '9.2', 0.097600, '9.76%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 103),
  ('carbs', 9.3000, '9.3', 0.464000, '46.40%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 104),
  ('ph_average', 5.7300, '5.73', 0.795000, '79.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 104),
  ('salts', 9.3000, '9.3', 0.849700, '84.97%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 104),
  ('urea', 9.3000, '9.3', 0.100700, '10.07%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 104),
  ('carbs', 9.4000, '9.4', 0.472000, '47.20%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 105),
  ('ph_average', 5.7400, '5.74', 0.790000, '79.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 105),
  ('salts', 9.4000, '9.4', 0.835900, '83.59%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 105),
  ('urea', 9.4000, '9.4', 0.103700, '10.37%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 105),
  ('carbs', 9.5000, '9.5', 0.480000, '48.00%', 0.008000, '0.80%', 'Reading Tables v1.csv', 'v1', 106),
  ('ph_average', 5.7500, '5.75', 0.785000, '78.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 106),
  ('salts', 9.5000, '9.5', 0.822100, '82.21%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 106),
  ('urea', 9.5000, '9.5', 0.106800, '10.68%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 106),
  ('carbs', 9.6000, '9.6', 0.488700, '48.87%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 107),
  ('ph_average', 5.7600, '5.76', 0.780000, '78.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 107),
  ('salts', 9.6000, '9.6', 0.808300, '80.83%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 107),
  ('urea', 9.6000, '9.6', 0.109800, '10.98%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 107),
  ('carbs', 9.7000, '9.7', 0.497300, '49.73%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 108),
  ('ph_average', 5.7700, '5.77', 0.775000, '77.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 108),
  ('salts', 9.7000, '9.7', 0.794500, '79.45%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 108),
  ('urea', 9.7000, '9.7', 0.112900, '11.29%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 108),
  ('carbs', 9.8000, '9.8', 0.506000, '50.60%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 109),
  ('ph_average', 5.7800, '5.78', 0.770000, '77.00%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 109),
  ('salts', 9.8000, '9.8', 0.780700, '78.07%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 109),
  ('urea', 9.8000, '9.8', 0.115900, '11.59%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 109),
  ('carbs', 9.9000, '9.9', 0.514700, '51.47%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 110),
  ('ph_average', 5.7900, '5.79', 0.765000, '76.50%', 0.005000, '0.50%', 'Reading Tables v1.csv', 'v1', 110),
  ('salts', 9.9000, '9.9', 0.766900, '76.69%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 110),
  ('urea', 9.9000, '9.9', 0.119000, '11.90%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 110),
  ('carbs', 10.0000, '10', 0.523300, '52.33%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 111),
  ('ph_average', 5.8000, '5.8', 0.760000, '76%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 111),
  ('salts', 10.0000, '10', 0.753100, '75.31%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 111),
  ('urea', 10.0000, '10', 0.122000, '12.20%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 111),
  ('carbs', 10.1000, '10.1', 0.532000, '53.20%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 112),
  ('ph_average', 5.8100, '5.81', 0.753700, '75.37%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 112),
  ('salts', 10.1000, '10.1', 0.739300, '73.93%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 112),
  ('urea', 10.1000, '10.1', 0.125100, '12.51%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 112),
  ('carbs', 10.2000, '10.2', 0.540700, '54.07%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 113),
  ('ph_average', 5.8200, '5.82', 0.747300, '74.73%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 113),
  ('salts', 10.2000, '10.2', 0.725500, '72.55%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 113),
  ('urea', 10.2000, '10.2', 0.128100, '12.81%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 113),
  ('carbs', 10.3000, '10.3', 0.549300, '54.93%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 114),
  ('ph_average', 5.8300, '5.83', 0.741000, '74.10%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 114),
  ('salts', 10.3000, '10.3', 0.711700, '71.17%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 114),
  ('urea', 10.3000, '10.3', 0.131200, '13.12%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 114),
  ('carbs', 10.4000, '10.4', 0.558000, '55.80%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 115),
  ('ph_average', 5.8400, '5.84', 0.734700, '73.47%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 115),
  ('salts', 10.4000, '10.4', 0.697900, '69.79%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 115),
  ('urea', 10.4000, '10.4', 0.134200, '13.42%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 115),
  ('carbs', 10.5000, '10.5', 0.566700, '56.67%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 116),
  ('ph_average', 5.8500, '5.85', 0.728300, '72.83%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 116),
  ('salts', 10.5000, '10.5', 0.684100, '68.41%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 116),
  ('urea', 10.5000, '10.5', 0.137300, '13.73%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 116),
  ('carbs', 10.6000, '10.6', 0.575300, '57.53%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 117),
  ('ph_average', 5.8600, '5.86', 0.722000, '72.20%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 117),
  ('salts', 10.6000, '10.6', 0.670300, '67.03%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 117),
  ('urea', 10.6000, '10.6', 0.140300, '14.03%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 117),
  ('carbs', 10.7000, '10.7', 0.584000, '58.40%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 118),
  ('ph_average', 5.8700, '5.87', 0.715700, '71.57%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 118),
  ('salts', 10.7000, '10.7', 0.656600, '65.66%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 118),
  ('urea', 10.7000, '10.7', 0.143400, '14.34%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 118),
  ('carbs', 10.8000, '10.8', 0.592700, '59.27%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 119),
  ('ph_average', 5.8800, '5.88', 0.709300, '70.93%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 119),
  ('salts', 10.8000, '10.8', 0.642800, '64.28%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 119),
  ('urea', 10.8000, '10.8', 0.146400, '14.64%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 119),
  ('carbs', 10.9000, '10.9', 0.601300, '60.13%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 120),
  ('ph_average', 5.8900, '5.89', 0.703000, '70.30%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 120),
  ('salts', 10.9000, '10.9', 0.629000, '62.90%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 120),
  ('urea', 10.9000, '10.9', 0.149500, '14.95%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 120),
  ('carbs', 11.0000, '11', 0.610000, '61.00%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 121),
  ('ph_average', 5.9000, '5.9', 0.696700, '69.67%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 121),
  ('salts', 11.0000, '11', 0.615200, '61.52%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 121),
  ('urea', 11.0000, '11', 0.152500, '15.25%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 121),
  ('carbs', 11.1000, '11.1', 0.618700, '61.87%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 122),
  ('ph_average', 5.9100, '5.91', 0.690300, '69.03%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 122),
  ('salts', 11.1000, '11.1', 0.601400, '60.14%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 122),
  ('urea', 11.1000, '11.1', 0.155600, '15.56%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 122),
  ('carbs', 11.2000, '11.2', 0.627300, '62.73%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 123),
  ('ph_average', 5.9200, '5.92', 0.684000, '68.40%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 123),
  ('salts', 11.2000, '11.2', 0.587600, '58.76%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 123),
  ('urea', 11.2000, '11.2', 0.158600, '15.86%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 123),
  ('carbs', 11.3000, '11.3', 0.636000, '63.60%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 124),
  ('ph_average', 5.9300, '5.93', 0.677700, '67.77%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 124),
  ('salts', 11.3000, '11.3', 0.573800, '57.38%', 0.013800, '1.38%', 'Reading Tables v1.csv', 'v1', 124),
  ('urea', 11.3000, '11.3', 0.161700, '16.17%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 124),
  ('carbs', 11.4000, '11.4', 0.644700, '64.47%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 125),
  ('ph_average', 5.9400, '5.94', 0.671300, '67.13%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 125),
  ('salts', 11.4000, '11.4', 0.560000, '56%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 125),
  ('urea', 11.4000, '11.4', 0.164700, '16.47%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 125),
  ('carbs', 11.5000, '11.5', 0.653300, '65.33%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 126),
  ('ph_average', 5.9500, '5.95', 0.665000, '66.50%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 126),
  ('salts', 11.5000, '11.5', 0.544400, '54.44%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 126),
  ('urea', 11.5000, '11.5', 0.167800, '16.78%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 126),
  ('carbs', 11.6000, '11.6', 0.662000, '66.20%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 127),
  ('ph_average', 5.9600, '5.96', 0.658700, '65.87%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 127),
  ('salts', 11.6000, '11.6', 0.528900, '52.89%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 127),
  ('urea', 11.6000, '11.6', 0.170800, '17.08%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 127),
  ('carbs', 11.7000, '11.7', 0.670700, '67.07%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 128),
  ('ph_average', 5.9700, '5.97', 0.652300, '65.23%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 128),
  ('salts', 11.7000, '11.7', 0.513300, '51.33%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 128),
  ('urea', 11.7000, '11.7', 0.173900, '17.39%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 128),
  ('carbs', 11.8000, '11.8', 0.679300, '67.93%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 129),
  ('ph_average', 5.9800, '5.98', 0.646000, '64.60%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 129),
  ('salts', 11.8000, '11.8', 0.497800, '49.78%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 129),
  ('urea', 11.8000, '11.8', 0.176900, '17.69%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 129),
  ('carbs', 11.9000, '11.9', 0.688000, '68.80%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 130),
  ('ph_average', 5.9900, '5.99', 0.639700, '63.97%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 130),
  ('salts', 11.9000, '11.9', 0.482200, '48.22%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 130),
  ('urea', 11.9000, '11.9', 0.180000, '18%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 130),
  ('carbs', 12.0000, '12', 0.696700, '69.67%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 131),
  ('ph_average', 6.0000, '6', 0.633300, '63.33%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 131),
  ('salts', 12.0000, '12', 0.466700, '46.67%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 131),
  ('urea', 12.0000, '12', 0.183100, '18.31%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 131),
  ('carbs', 12.1000, '12.1', 0.705300, '70.53%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 132),
  ('ph_average', 6.0100, '6.01', 0.627000, '62.70%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 132),
  ('salts', 12.1000, '12.1', 0.451100, '45.11%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 132),
  ('urea', 12.1000, '12.1', 0.186200, '18.62%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 132),
  ('carbs', 12.2000, '12.2', 0.714000, '71.40%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 133),
  ('ph_average', 6.0200, '6.02', 0.620700, '62.07%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 133),
  ('salts', 12.2000, '12.2', 0.435600, '43.56%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 133),
  ('urea', 12.2000, '12.2', 0.189300, '18.93%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 133),
  ('carbs', 12.3000, '12.3', 0.722700, '72.27%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 134),
  ('ph_average', 6.0300, '6.03', 0.614300, '61.43%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 134),
  ('salts', 12.3000, '12.3', 0.420000, '42.00%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 134),
  ('urea', 12.3000, '12.3', 0.192400, '19.24%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 134),
  ('carbs', 12.4000, '12.4', 0.731300, '73.13%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 135),
  ('ph_average', 6.0400, '6.04', 0.608000, '60.80%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 135),
  ('salts', 12.4000, '12.4', 0.404400, '40.44%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 135),
  ('urea', 12.4000, '12.4', 0.195600, '19.56%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 135),
  ('carbs', 12.5000, '12.5', 0.740000, '74.00%', 0.008700, '0.87%', 'Reading Tables v1.csv', 'v1', 136),
  ('ph_average', 6.0500, '6.05', 0.601700, '60.17%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 136),
  ('salts', 12.5000, '12.5', 0.388900, '38.89%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 136),
  ('urea', 12.5000, '12.5', 0.198700, '19.87%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 136),
  ('carbs', 12.6000, '12.6', 0.748800, '74.88%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 137),
  ('ph_average', 6.0600, '6.06', 0.595300, '59.53%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 137),
  ('salts', 12.6000, '12.6', 0.373300, '37.33%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 137),
  ('urea', 12.6000, '12.6', 0.201800, '20.18%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 137),
  ('carbs', 12.7000, '12.7', 0.757600, '75.76%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 138),
  ('ph_average', 6.0700, '6.07', 0.589000, '58.90%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 138),
  ('salts', 12.7000, '12.7', 0.357800, '35.78%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 138),
  ('urea', 12.7000, '12.7', 0.204900, '20.49%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 138),
  ('carbs', 12.8000, '12.8', 0.766400, '76.64%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 139),
  ('ph_average', 6.0800, '6.08', 0.582700, '58.27%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 139),
  ('salts', 12.8000, '12.8', 0.342200, '34.22%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 139),
  ('urea', 12.8000, '12.8', 0.208000, '20.80%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 139),
  ('carbs', 12.9000, '12.9', 0.775200, '77.52%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 140),
  ('ph_average', 6.0900, '6.09', 0.576300, '57.63%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 140),
  ('salts', 12.9000, '12.9', 0.326700, '32.67%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 140),
  ('urea', 12.9000, '12.9', 0.211100, '21.11%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 140),
  ('carbs', 13.0000, '13', 0.784000, '78.40%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 141),
  ('ph_average', 6.1000, '6.1', 0.570000, '57.00%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 141),
  ('salts', 13.0000, '13', 0.311100, '31.11%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 141),
  ('urea', 13.0000, '13', 0.214200, '21.42%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 141),
  ('carbs', 14.0000, '14', 0.792800, '79.28%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 142),
  ('ph_average', 6.1100, '6.11', 0.563700, '56.37%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 142),
  ('salts', 13.1000, '13.1', 0.295600, '29.56%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 142),
  ('urea', 13.1000, '13.1', 0.217300, '21.73%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 142),
  ('carbs', 15.0000, '15', 0.801600, '80.16%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 143),
  ('ph_average', 6.1200, '6.12', 0.557300, '55.73%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 143),
  ('salts', 13.2000, '13.2', 0.280000, '28.00%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 143),
  ('urea', 13.2000, '13.2', 0.220400, '22.04%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 143),
  ('carbs', 16.0000, '16', 0.810400, '81.04%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 144),
  ('ph_average', 6.1300, '6.13', 0.551000, '55.10%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 144),
  ('salts', 13.3000, '13.3', 0.264400, '26.44%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 144),
  ('urea', 13.3000, '13.3', 0.223600, '22.36%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 144),
  ('carbs', 17.0000, '17', 0.819200, '81.92%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 145),
  ('ph_average', 6.1400, '6.14', 0.544700, '54.47%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 145),
  ('salts', 13.4000, '13.4', 0.248900, '24.89%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 145),
  ('urea', 13.4000, '13.4', 0.226700, '22.67%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 145),
  ('carbs', 18.0000, '18', 0.828000, '82.80%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 146),
  ('ph_average', 6.1500, '6.15', 0.538300, '53.83%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 146),
  ('salts', 13.5000, '13.5', 0.233300, '23.33%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 146),
  ('urea', 13.5000, '13.5', 0.229800, '22.98%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 146),
  ('carbs', 19.0000, '19', 0.836800, '83.68%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 147),
  ('ph_average', 6.1600, '6.16', 0.532000, '53.20%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 147),
  ('salts', 13.6000, '13.6', 0.217800, '21.78%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 147),
  ('urea', 13.6000, '13.6', 0.232900, '23.29%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 147),
  ('carbs', 20.0000, '20', 0.845600, '84.56%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 148),
  ('ph_average', 6.1700, '6.17', 0.525700, '52.57%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 148),
  ('salts', 13.7000, '13.7', 0.202200, '20.22%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 148),
  ('urea', 13.7000, '13.7', 0.236000, '23.60%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 148),
  ('carbs', 21.0000, '21', 0.854400, '85.44%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 149),
  ('ph_average', 6.1800, '6.18', 0.519300, '51.93%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 149),
  ('salts', 13.8000, '13.8', 0.186700, '18.67%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 149),
  ('urea', 13.8000, '13.8', 0.239100, '23.91%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 149),
  ('carbs', 22.0000, '22', 0.863200, '86.32%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 150),
  ('ph_average', 6.1900, '6.19', 0.513000, '51.30%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 150),
  ('salts', 13.9000, '13.9', 0.171100, '17.11%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 150),
  ('urea', 13.9000, '13.9', 0.242200, '24.22%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 150),
  ('carbs', 23.0000, '23', 0.872000, '87.20%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 151),
  ('ph_average', 6.2000, '6.2', 0.506700, '50.67%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 151),
  ('salts', 14.0000, '14', 0.155600, '15.56%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 151),
  ('urea', 14.0000, '14', 0.245300, '24.53%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 151),
  ('carbs', 24.0000, '24', 0.880800, '88.08%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 152),
  ('ph_average', 6.2100, '6.21', 0.500300, '50.03%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 152),
  ('salts', 14.1000, '14.1', 0.140000, '14.00%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 152),
  ('urea', 14.1000, '14.1', 0.248400, '24.84%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 152),
  ('carbs', 25.0000, '25', 0.889600, '88.96%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 153),
  ('ph_average', 6.2200, '6.22', 0.494000, '49.40%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 153),
  ('salts', 14.2000, '14.2', 0.124400, '12.44%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 153),
  ('urea', 14.2000, '14.2', 0.251600, '25.16%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 153),
  ('carbs', 26.0000, '26', 0.898400, '89.84%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 154),
  ('ph_average', 6.2300, '6.23', 0.487700, '48.77%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 154),
  ('salts', 14.3000, '14.3', 0.108900, '10.89%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 154),
  ('urea', 14.3000, '14.3', 0.254700, '25.47%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 154),
  ('carbs', 27.0000, '27', 0.907200, '90.72%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 155),
  ('ph_average', 6.2400, '6.24', 0.481300, '48.13%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 155),
  ('salts', 14.4000, '14.4', 0.093300, '9.33%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 155),
  ('urea', 14.4000, '14.4', 0.257800, '25.78%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 155),
  ('carbs', 28.0000, '28', 0.916000, '91.60%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 156),
  ('ph_average', 6.2500, '6.25', 0.475000, '47.50%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 156),
  ('salts', 14.5000, '14.5', 0.077800, '7.78%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 156),
  ('urea', 14.5000, '14.5', 0.260900, '26.09%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 156),
  ('carbs', 29.0000, '29', 0.924800, '92.48%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 157),
  ('ph_average', 6.2600, '6.26', 0.468700, '46.87%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 157),
  ('salts', 14.6000, '14.6', 0.062200, '6.22%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 157),
  ('urea', 14.6000, '14.6', 0.264000, '26.40%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 157),
  ('carbs', 30.0000, '30', 0.933600, '93.36%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 158),
  ('ph_average', 6.2700, '6.27', 0.462300, '46.23%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 158),
  ('salts', 14.7000, '14.7', 0.046700, '4.67%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 158),
  ('urea', 14.7000, '14.7', 0.267100, '26.71%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 158),
  ('carbs', 31.0000, '31', 0.942400, '94.24%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 159),
  ('ph_average', 6.2800, '6.28', 0.456000, '45.60%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 159),
  ('salts', 14.8000, '14.8', 0.031100, '3.11%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 159),
  ('urea', 14.8000, '14.8', 0.270200, '27.02%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 159),
  ('carbs', 32.0000, '32', 0.951200, '95.12%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 160),
  ('ph_average', 6.2900, '6.29', 0.449700, '44.97%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 160),
  ('salts', 14.9000, '14.9', 0.015600, '1.56%', 0.015600, '1.56%', 'Reading Tables v1.csv', 'v1', 160),
  ('urea', 14.9000, '14.9', 0.273300, '27.33%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 160),
  ('carbs', 33.0000, '33', 0.960000, '96.00%', 0.008800, '0.88%', 'Reading Tables v1.csv', 'v1', 161),
  ('ph_average', 6.3000, '6.3', 0.443300, '44.33%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 161),
  ('salts', 15.0000, '15', 0.000000, '0%', -0.001300, '-0.13%', 'Reading Tables v1.csv', 'v1', 161),
  ('urea', 15.0000, '15', 0.276400, '27.64%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 161),
  ('ph_average', 6.3100, '6.31', 0.437000, '43.70%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 162),
  ('salts', 15.1000, '15.1', 0.001300, '0.13%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 162),
  ('urea', 15.1000, '15.1', 0.279600, '27.96%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 162),
  ('ph_average', 6.3200, '6.32', 0.430700, '43.07%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 163),
  ('salts', 15.2000, '15.2', 0.002700, '0.27%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 163),
  ('urea', 15.2000, '15.2', 0.282700, '28.27%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 163),
  ('ph_average', 6.3300, '6.33', 0.424300, '42.43%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 164),
  ('salts', 15.3000, '15.3', 0.004000, '0.40%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 164),
  ('urea', 15.3000, '15.3', 0.285800, '28.58%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 164),
  ('ph_average', 6.3400, '6.34', 0.418000, '41.80%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 165),
  ('salts', 15.4000, '15.4', 0.005400, '0.54%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 165),
  ('urea', 15.4000, '15.4', 0.288900, '28.89%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 165),
  ('ph_average', 6.3500, '6.35', 0.411700, '41.17%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 166),
  ('salts', 15.5000, '15.5', 0.006700, '0.67%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 166),
  ('urea', 15.5000, '15.5', 0.292000, '29.20%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 166),
  ('ph_average', 6.3600, '6.36', 0.405300, '40.53%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 167),
  ('salts', 15.6000, '15.6', 0.008100, '0.81%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 167),
  ('urea', 15.6000, '15.6', 0.295100, '29.51%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 167),
  ('ph_average', 6.3700, '6.37', 0.399000, '39.90%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 168),
  ('salts', 15.7000, '15.7', 0.009400, '0.94%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 168),
  ('urea', 15.7000, '15.7', 0.298200, '29.82%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 168),
  ('ph_average', 6.3800, '6.38', 0.392700, '39.27%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 169),
  ('salts', 15.8000, '15.8', 0.010700, '1.07%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 169),
  ('urea', 15.8000, '15.8', 0.301300, '30.13%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 169),
  ('ph_average', 6.3900, '6.39', 0.386300, '38.63%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 170),
  ('salts', 15.9000, '15.9', 0.012100, '1.21%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 170),
  ('urea', 15.9000, '15.9', 0.304400, '30.44%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 170),
  ('ph_average', 6.4000, '6.4', 0.380000, '38.00%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 171),
  ('salts', 16.0000, '16', 0.013400, '1.34%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 171),
  ('urea', 16.0000, '16', 0.307600, '30.76%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 171),
  ('ph_average', 6.4100, '6.41', 0.373700, '37.37%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 172),
  ('salts', 16.1000, '16.1', 0.014800, '1.48%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 172),
  ('urea', 16.1000, '16.1', 0.310700, '31.07%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 172),
  ('ph_average', 6.4200, '6.42', 0.367300, '36.73%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 173),
  ('salts', 16.2000, '16.2', 0.016100, '1.61%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 173),
  ('urea', 16.2000, '16.2', 0.313800, '31.38%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 173),
  ('ph_average', 6.4300, '6.43', 0.361000, '36.10%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 174),
  ('salts', 16.3000, '16.3', 0.017500, '1.75%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 174),
  ('urea', 16.3000, '16.3', 0.316900, '31.69%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 174),
  ('ph_average', 6.4400, '6.44', 0.354700, '35.47%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 175),
  ('salts', 16.4000, '16.4', 0.018800, '1.88%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 175),
  ('urea', 16.4000, '16.4', 0.320000, '32.00%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 175),
  ('ph_average', 6.4500, '6.45', 0.348300, '34.83%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 176),
  ('salts', 16.5000, '16.5', 0.020100, '2.01%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 176),
  ('urea', 16.5000, '16.5', 0.323100, '32.31%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 176),
  ('ph_average', 6.4600, '6.46', 0.342000, '34.20%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 177),
  ('salts', 16.6000, '16.6', 0.021500, '2.15%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 177),
  ('urea', 16.6000, '16.6', 0.326200, '32.62%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 177),
  ('ph_average', 6.4700, '6.47', 0.335700, '33.57%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 178),
  ('salts', 16.7000, '16.7', 0.022800, '2.28%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 178),
  ('urea', 16.7000, '16.7', 0.329300, '32.93%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 178),
  ('ph_average', 6.4800, '6.48', 0.329300, '32.93%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 179),
  ('salts', 16.8000, '16.8', 0.024200, '2.42%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 179),
  ('urea', 16.8000, '16.8', 0.332400, '33.24%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 179),
  ('ph_average', 6.4900, '6.49', 0.323000, '32.30%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 180),
  ('salts', 16.9000, '16.9', 0.025500, '2.55%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 180),
  ('urea', 16.9000, '16.9', 0.335600, '33.56%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 180),
  ('ph_average', 6.5000, '6.5', 0.316700, '31.67%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 181),
  ('salts', 17.0000, '17', 0.026900, '2.69%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 181),
  ('urea', 17.0000, '17', 0.338700, '33.87%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 181),
  ('ph_average', 6.5100, '6.51', 0.310300, '31.03%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 182),
  ('salts', 17.1000, '17.1', 0.028200, '2.82%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 182),
  ('urea', 17.1000, '17.1', 0.341800, '34.18%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 182),
  ('ph_average', 6.5200, '6.52', 0.304000, '30.40%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 183),
  ('salts', 17.2000, '17.2', 0.029600, '2.96%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 183),
  ('urea', 17.2000, '17.2', 0.344900, '34.49%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 183),
  ('ph_average', 6.5300, '6.53', 0.297700, '29.77%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 184),
  ('salts', 17.3000, '17.3', 0.030900, '3.09%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 184),
  ('urea', 17.3000, '17.3', 0.348000, '34.80%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 184),
  ('ph_average', 6.5400, '6.54', 0.291300, '29.13%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 185),
  ('salts', 17.4000, '17.4', 0.032200, '3.22%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 185),
  ('urea', 17.4000, '17.4', 0.351100, '35.11%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 185),
  ('ph_average', 6.5500, '6.55', 0.285000, '28.50%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 186),
  ('salts', 17.5000, '17.5', 0.033600, '3.36%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 186),
  ('urea', 17.5000, '17.5', 0.354200, '35.42%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 186),
  ('ph_average', 6.5600, '6.56', 0.278700, '27.87%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 187),
  ('salts', 17.6000, '17.6', 0.034900, '3.49%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 187),
  ('urea', 17.6000, '17.6', 0.357300, '35.73%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 187),
  ('ph_average', 6.5700, '6.57', 0.272300, '27.23%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 188),
  ('salts', 17.7000, '17.7', 0.036300, '3.63%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 188),
  ('urea', 17.7000, '17.7', 0.360400, '36.04%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 188),
  ('ph_average', 6.5800, '6.58', 0.266000, '26.60%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 189),
  ('salts', 17.8000, '17.8', 0.037600, '3.76%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 189),
  ('urea', 17.8000, '17.8', 0.363600, '36.36%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 189),
  ('ph_average', 6.5900, '6.59', 0.259700, '25.97%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 190),
  ('salts', 17.9000, '17.9', 0.039000, '3.90%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 190),
  ('urea', 17.9000, '17.9', 0.366700, '36.67%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 190),
  ('ph_average', 6.6000, '6.6', 0.253300, '25.33%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 191),
  ('salts', 18.0000, '18', 0.040300, '4.03%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 191),
  ('urea', 18.0000, '18', 0.369800, '36.98%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 191),
  ('ph_average', 6.6100, '6.61', 0.247000, '24.70%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 192),
  ('salts', 18.1000, '18.1', 0.041600, '4.16%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 192),
  ('urea', 18.1000, '18.1', 0.372900, '37.29%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 192),
  ('ph_average', 6.6200, '6.62', 0.240700, '24.07%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 193),
  ('salts', 18.2000, '18.2', 0.043000, '4.30%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 193),
  ('urea', 18.2000, '18.2', 0.376000, '37.60%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 193),
  ('ph_average', 6.6300, '6.63', 0.234300, '23.43%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 194),
  ('salts', 18.3000, '18.3', 0.044300, '4.43%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 194),
  ('urea', 18.3000, '18.3', 0.379100, '37.91%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 194),
  ('ph_average', 6.6400, '6.64', 0.228000, '22.80%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 195),
  ('salts', 18.4000, '18.4', 0.045700, '4.57%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 195),
  ('urea', 18.4000, '18.4', 0.382200, '38.22%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 195),
  ('ph_average', 6.6500, '6.65', 0.221700, '22.17%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 196),
  ('salts', 18.5000, '18.5', 0.047000, '4.70%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 196),
  ('urea', 18.5000, '18.5', 0.385300, '38.53%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 196),
  ('ph_average', 6.6600, '6.66', 0.215300, '21.53%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 197),
  ('salts', 18.6000, '18.6', 0.048400, '4.84%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 197),
  ('urea', 18.6000, '18.6', 0.388400, '38.84%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 197),
  ('ph_average', 6.6700, '6.67', 0.209000, '20.90%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 198),
  ('salts', 18.7000, '18.7', 0.049700, '4.97%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 198),
  ('urea', 18.7000, '18.7', 0.391600, '39.16%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 198),
  ('ph_average', 6.6800, '6.68', 0.202700, '20.27%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 199),
  ('salts', 18.8000, '18.8', 0.051000, '5.10%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 199),
  ('urea', 18.8000, '18.8', 0.394700, '39.47%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 199),
  ('ph_average', 6.6900, '6.69', 0.196300, '19.63%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 200),
  ('salts', 18.9000, '18.9', 0.052400, '5.24%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 200),
  ('urea', 18.9000, '18.9', 0.397800, '39.78%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 200),
  ('ph_average', 6.7000, '6.7', 0.190000, '19.00%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 201),
  ('salts', 19.0000, '19', 0.053700, '5.37%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 201),
  ('urea', 19.0000, '19', 0.400900, '40.09%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 201),
  ('ph_average', 6.7100, '6.71', 0.183700, '18.37%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 202),
  ('salts', 19.1000, '19.1', 0.055100, '5.51%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 202),
  ('urea', 19.1000, '19.1', 0.404000, '40.40%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 202),
  ('ph_average', 6.7200, '6.72', 0.177300, '17.73%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 203),
  ('salts', 19.2000, '19.2', 0.056400, '5.64%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 203),
  ('urea', 19.2000, '19.2', 0.407100, '40.71%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 203),
  ('ph_average', 6.7300, '6.73', 0.171000, '17.10%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 204),
  ('salts', 19.3000, '19.3', 0.057800, '5.78%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 204),
  ('urea', 19.3000, '19.3', 0.410200, '41.02%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 204),
  ('ph_average', 6.7400, '6.74', 0.164700, '16.47%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 205),
  ('salts', 19.4000, '19.4', 0.059100, '5.91%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 205),
  ('urea', 19.4000, '19.4', 0.413300, '41.33%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 205),
  ('ph_average', 6.7500, '6.75', 0.158300, '15.83%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 206),
  ('salts', 19.5000, '19.5', 0.060400, '6.04%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 206),
  ('urea', 19.5000, '19.5', 0.416400, '41.64%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 206),
  ('ph_average', 6.7600, '6.76', 0.152000, '15.20%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 207),
  ('salts', 19.6000, '19.6', 0.061800, '6.18%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 207),
  ('urea', 19.6000, '19.6', 0.419600, '41.96%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 207),
  ('ph_average', 6.7700, '6.77', 0.145700, '14.57%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 208),
  ('salts', 19.7000, '19.7', 0.063100, '6.31%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 208),
  ('urea', 19.7000, '19.7', 0.422700, '42.27%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 208),
  ('ph_average', 6.7800, '6.78', 0.139300, '13.93%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 209),
  ('salts', 19.8000, '19.8', 0.064500, '6.45%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 209),
  ('urea', 19.8000, '19.8', 0.425800, '42.58%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 209),
  ('ph_average', 6.7900, '6.79', 0.133000, '13.30%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 210),
  ('salts', 19.9000, '19.9', 0.065800, '6.58%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 210),
  ('urea', 19.9000, '19.9', 0.428900, '42.89%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 210),
  ('ph_average', 6.8000, '6.8', 0.126700, '12.67%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 211),
  ('salts', 20.0000, '20', 0.067200, '6.72%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 211),
  ('urea', 20.0000, '20', 0.432000, '43.20%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 211),
  ('ph_average', 6.8100, '6.81', 0.120300, '12.03%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 212),
  ('salts', 20.1000, '20.1', 0.068500, '6.85%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 212),
  ('urea', 20.1000, '20.1', 0.435100, '43.51%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 212),
  ('ph_average', 6.8200, '6.82', 0.114000, '11.40%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 213),
  ('salts', 20.2000, '20.2', 0.069900, '6.99%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 213),
  ('urea', 20.2000, '20.2', 0.438200, '43.82%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 213),
  ('ph_average', 6.8300, '6.83', 0.107700, '10.77%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 214),
  ('salts', 20.3000, '20.3', 0.071200, '7.12%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 214),
  ('urea', 20.3000, '20.3', 0.441300, '44.13%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 214),
  ('ph_average', 6.8400, '6.84', 0.101300, '10.13%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 215),
  ('salts', 20.4000, '20.4', 0.072500, '7.25%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 215),
  ('urea', 20.4000, '20.4', 0.444400, '44.44%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 215),
  ('ph_average', 6.8500, '6.85', 0.095000, '9.50%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 216),
  ('salts', 20.5000, '20.5', 0.073900, '7.39%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 216),
  ('urea', 20.5000, '20.5', 0.447600, '44.76%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 216),
  ('ph_average', 6.8600, '6.86', 0.088700, '8.87%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 217),
  ('salts', 20.6000, '20.6', 0.075200, '7.52%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 217),
  ('urea', 20.6000, '20.6', 0.450700, '45.07%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 217),
  ('ph_average', 6.8700, '6.87', 0.082300, '8.23%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 218),
  ('salts', 20.7000, '20.7', 0.076600, '7.66%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 218),
  ('urea', 20.7000, '20.7', 0.453800, '45.38%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 218),
  ('ph_average', 6.8800, '6.88', 0.076000, '7.60%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 219),
  ('salts', 20.8000, '20.8', 0.077900, '7.79%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 219),
  ('urea', 20.8000, '20.8', 0.456900, '45.69%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 219),
  ('ph_average', 6.8900, '6.89', 0.069700, '6.97%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 220),
  ('salts', 20.9000, '20.9', 0.079300, '7.93%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 220),
  ('urea', 20.9000, '20.9', 0.460000, '46%', 0.003100, '0.31%', 'Reading Tables v1.csv', 'v1', 220),
  ('ph_average', 6.9000, '6.9', 0.063300, '6.33%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 221),
  ('salts', 21.0000, '21', 0.080600, '8.06%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 221),
  ('urea', 21.0000, '21', 0.464200, '46.42%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 221),
  ('ph_average', 6.9100, '6.91', 0.057000, '5.70%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 222),
  ('salts', 21.1000, '21.1', 0.081900, '8.19%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 222),
  ('urea', 21.1000, '21.1', 0.468500, '46.85%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 222),
  ('ph_average', 6.9200, '6.92', 0.050700, '5.07%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 223),
  ('salts', 21.2000, '21.2', 0.083300, '8.33%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 223),
  ('urea', 21.2000, '21.2', 0.472700, '47.27%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 223),
  ('ph_average', 6.9300, '6.93', 0.044300, '4.43%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 224),
  ('salts', 21.3000, '21.3', 0.084600, '8.46%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 224),
  ('urea', 21.3000, '21.3', 0.476900, '47.69%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 224),
  ('ph_average', 6.9400, '6.94', 0.038000, '3.80%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 225),
  ('salts', 21.4000, '21.4', 0.086000, '8.60%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 225),
  ('urea', 21.4000, '21.4', 0.481100, '48.11%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 225),
  ('ph_average', 6.9500, '6.95', 0.031700, '3.17%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 226),
  ('salts', 21.5000, '21.5', 0.087300, '8.73%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 226),
  ('urea', 21.5000, '21.5', 0.485400, '48.54%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 226),
  ('ph_average', 6.9600, '6.96', 0.025300, '2.53%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 227),
  ('salts', 21.6000, '21.6', 0.088700, '8.87%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 227),
  ('urea', 21.6000, '21.6', 0.489600, '48.96%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 227),
  ('ph_average', 6.9700, '6.97', 0.019000, '1.90%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 228),
  ('salts', 21.7000, '21.7', 0.090000, '9.00%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 228),
  ('urea', 21.7000, '21.7', 0.493800, '49.38%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 228),
  ('ph_average', 6.9800, '6.98', 0.012700, '1.27%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 229),
  ('salts', 21.8000, '21.8', 0.091300, '9.13%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 229),
  ('urea', 21.8000, '21.8', 0.498000, '49.80%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 229),
  ('ph_average', 6.9900, '6.99', 0.006300, '0.63%', 0.006300, '0.63%', 'Reading Tables v1.csv', 'v1', 230),
  ('salts', 21.9000, '21.9', 0.092700, '9.27%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 230),
  ('urea', 21.9000, '21.9', 0.502300, '50.23%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 230),
  ('ph_average', 7.0000, '7', 0.000000, '0.00%', -0.006300, '-0.63%', 'Reading Tables v1.csv', 'v1', 231),
  ('salts', 22.0000, '22', 0.094000, '9.40%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 231),
  ('urea', 22.0000, '22', 0.506500, '50.65%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 231),
  ('ph_average', 7.0100, '7.01', 0.002800, '0.28%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 232),
  ('salts', 22.1000, '22.1', 0.095400, '9.54%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 232),
  ('urea', 22.1000, '22.1', 0.510700, '51.07%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 232),
  ('ph_average', 7.0200, '7.02', 0.005600, '0.56%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 233),
  ('salts', 22.2000, '22.2', 0.096700, '9.67%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 233),
  ('urea', 22.2000, '22.2', 0.514900, '51.49%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 233),
  ('ph_average', 7.0300, '7.03', 0.008400, '0.84%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 234),
  ('salts', 22.3000, '22.3', 0.098100, '9.81%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 234),
  ('urea', 22.3000, '22.3', 0.519200, '51.92%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 234),
  ('ph_average', 7.0400, '7.04', 0.011100, '1.11%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 235),
  ('salts', 22.4000, '22.4', 0.099400, '9.94%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 235),
  ('urea', 22.4000, '22.4', 0.523400, '52.34%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 235),
  ('ph_average', 7.0500, '7.05', 0.013900, '1.39%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 236),
  ('salts', 22.5000, '22.5', 0.100700, '10.07%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 236),
  ('urea', 22.5000, '22.5', 0.527600, '52.76%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 236),
  ('ph_average', 7.0600, '7.06', 0.016700, '1.67%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 237),
  ('salts', 22.6000, '22.6', 0.102100, '10.21%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 237),
  ('urea', 22.6000, '22.6', 0.531800, '53.18%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 237),
  ('ph_average', 7.0700, '7.07', 0.019500, '1.95%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 238),
  ('salts', 22.7000, '22.7', 0.103400, '10.34%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 238),
  ('urea', 22.7000, '22.7', 0.536100, '53.61%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 238),
  ('ph_average', 7.0800, '7.08', 0.022300, '2.23%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 239),
  ('salts', 22.8000, '22.8', 0.104800, '10.48%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 239),
  ('urea', 22.8000, '22.8', 0.540300, '54.03%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 239),
  ('ph_average', 7.0900, '7.09', 0.025100, '2.51%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 240),
  ('salts', 22.9000, '22.9', 0.106100, '10.61%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 240),
  ('urea', 22.9000, '22.9', 0.544500, '54.45%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 240),
  ('ph_average', 7.1000, '7.1', 0.027800, '2.78%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 241),
  ('salts', 23.0000, '23', 0.107500, '10.75%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 241),
  ('urea', 23.0000, '23', 0.548700, '54.87%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 241),
  ('ph_average', 7.1100, '7.11', 0.030600, '3.06%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 242),
  ('salts', 23.1000, '23.1', 0.108800, '10.88%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 242),
  ('urea', 23.1000, '23.1', 0.553000, '55.30%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 242),
  ('ph_average', 7.1200, '7.12', 0.033400, '3.34%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 243),
  ('salts', 23.2000, '23.2', 0.110100, '11.01%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 243),
  ('urea', 23.2000, '23.2', 0.557200, '55.72%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 243),
  ('ph_average', 7.1300, '7.13', 0.036200, '3.62%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 244),
  ('salts', 23.3000, '23.3', 0.111500, '11.15%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 244),
  ('urea', 23.3000, '23.3', 0.561400, '56.14%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 244),
  ('ph_average', 7.1400, '7.14', 0.039000, '3.90%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 245),
  ('salts', 23.4000, '23.4', 0.112800, '11.28%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 245),
  ('urea', 23.4000, '23.4', 0.565600, '56.56%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 245),
  ('ph_average', 7.1500, '7.15', 0.041800, '4.18%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 246),
  ('salts', 23.5000, '23.5', 0.114200, '11.42%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 246),
  ('urea', 23.5000, '23.5', 0.569900, '56.99%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 246),
  ('ph_average', 7.1600, '7.16', 0.044600, '4.46%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 247),
  ('salts', 23.6000, '23.6', 0.115500, '11.55%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 247),
  ('urea', 23.6000, '23.6', 0.574100, '57.41%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 247),
  ('ph_average', 7.1700, '7.17', 0.047300, '4.73%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 248),
  ('salts', 23.7000, '23.7', 0.116900, '11.69%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 248),
  ('urea', 23.7000, '23.7', 0.578300, '57.83%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 248),
  ('ph_average', 7.1800, '7.18', 0.050100, '5.01%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 249),
  ('salts', 23.8000, '23.8', 0.118200, '11.82%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 249),
  ('urea', 23.8000, '23.8', 0.582500, '58.25%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 249),
  ('ph_average', 7.1900, '7.19', 0.052900, '5.29%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 250),
  ('salts', 23.9000, '23.9', 0.119600, '11.96%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 250),
  ('urea', 23.9000, '23.9', 0.586800, '58.68%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 250),
  ('ph_average', 7.2000, '7.2', 0.055700, '5.57%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 251),
  ('salts', 24.0000, '24', 0.120900, '12.09%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 251),
  ('urea', 24.0000, '24', 0.591000, '59.10%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 251),
  ('ph_average', 7.2100, '7.21', 0.058500, '5.85%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 252),
  ('salts', 24.1000, '24.1', 0.122200, '12.22%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 252),
  ('urea', 24.1000, '24.1', 0.595200, '59.52%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 252),
  ('ph_average', 7.2200, '7.22', 0.061300, '6.13%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 253),
  ('salts', 24.2000, '24.2', 0.123600, '12.36%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 253),
  ('urea', 24.2000, '24.2', 0.599400, '59.94%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 253),
  ('ph_average', 7.2300, '7.23', 0.064100, '6.41%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 254),
  ('salts', 24.3000, '24.3', 0.124900, '12.49%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 254),
  ('urea', 24.3000, '24.3', 0.603700, '60.37%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 254),
  ('ph_average', 7.2400, '7.24', 0.066800, '6.68%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 255),
  ('salts', 24.4000, '24.4', 0.126300, '12.63%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 255),
  ('urea', 24.4000, '24.4', 0.607900, '60.79%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 255),
  ('ph_average', 7.2500, '7.25', 0.069600, '6.96%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 256),
  ('salts', 24.5000, '24.5', 0.127600, '12.76%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 256),
  ('urea', 24.5000, '24.5', 0.612100, '61.21%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 256),
  ('ph_average', 7.2600, '7.26', 0.072400, '7.24%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 257),
  ('salts', 24.6000, '24.6', 0.129000, '12.90%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 257),
  ('urea', 24.6000, '24.6', 0.616300, '61.63%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 257),
  ('ph_average', 7.2700, '7.27', 0.075200, '7.52%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 258),
  ('salts', 24.7000, '24.7', 0.130300, '13.03%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 258),
  ('urea', 24.7000, '24.7', 0.620600, '62.06%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 258),
  ('ph_average', 7.2800, '7.28', 0.078000, '7.80%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 259),
  ('salts', 24.8000, '24.8', 0.131600, '13.16%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 259),
  ('urea', 24.8000, '24.8', 0.624800, '62.48%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 259),
  ('ph_average', 7.2900, '7.29', 0.080800, '8.08%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 260),
  ('salts', 24.9000, '24.9', 0.133000, '13.30%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 260),
  ('urea', 24.9000, '24.9', 0.629000, '62.90%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 260),
  ('ph_average', 7.3000, '7.3', 0.083500, '8.35%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 261),
  ('salts', 25.0000, '25', 0.134300, '13.43%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 261),
  ('urea', 25.0000, '25', 0.633200, '63.32%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 261),
  ('ph_average', 7.3100, '7.31', 0.086300, '8.63%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 262),
  ('salts', 25.1000, '25.1', 0.135700, '13.57%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 262),
  ('urea', 25.1000, '25.1', 0.637500, '63.75%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 262),
  ('ph_average', 7.3200, '7.32', 0.089100, '8.91%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 263),
  ('salts', 25.2000, '25.2', 0.137000, '13.70%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 263),
  ('urea', 25.2000, '25.2', 0.641700, '64.17%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 263),
  ('ph_average', 7.3300, '7.33', 0.091900, '9.19%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 264),
  ('salts', 25.3000, '25.3', 0.138400, '13.84%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 264),
  ('urea', 25.3000, '25.3', 0.645900, '64.59%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 264),
  ('ph_average', 7.3400, '7.34', 0.094700, '9.47%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 265),
  ('salts', 25.4000, '25.4', 0.139700, '13.97%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 265),
  ('urea', 25.4000, '25.4', 0.650100, '65.01%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 265),
  ('ph_average', 7.3500, '7.35', 0.097500, '9.75%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 266),
  ('salts', 25.5000, '25.5', 0.141000, '14.10%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 266),
  ('urea', 25.5000, '25.5', 0.654400, '65.44%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 266),
  ('ph_average', 7.3600, '7.36', 0.100300, '10.03%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 267),
  ('salts', 25.6000, '25.6', 0.142400, '14.24%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 267),
  ('urea', 25.6000, '25.6', 0.658600, '65.86%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 267),
  ('ph_average', 7.3700, '7.37', 0.103000, '10.30%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 268),
  ('salts', 25.7000, '25.7', 0.143700, '14.37%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 268),
  ('urea', 25.7000, '25.7', 0.662800, '66.28%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 268),
  ('ph_average', 7.3800, '7.38', 0.105800, '10.58%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 269),
  ('salts', 25.8000, '25.8', 0.145100, '14.51%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 269),
  ('urea', 25.8000, '25.8', 0.667000, '66.70%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 269),
  ('ph_average', 7.3900, '7.39', 0.108600, '10.86%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 270),
  ('salts', 25.9000, '25.9', 0.146400, '14.64%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 270),
  ('urea', 25.9000, '25.9', 0.671300, '67.13%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 270),
  ('ph_average', 7.4000, '7.4', 0.111400, '11.14%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 271),
  ('salts', 26.0000, '26', 0.147800, '14.78%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 271),
  ('urea', 26.0000, '26', 0.675500, '67.55%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 271),
  ('ph_average', 7.4100, '7.41', 0.114200, '11.42%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 272),
  ('salts', 26.1000, '26.1', 0.149100, '14.91%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 272),
  ('urea', 26.1000, '26.1', 0.679700, '67.97%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 272),
  ('ph_average', 7.4200, '7.42', 0.117000, '11.70%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 273),
  ('salts', 26.2000, '26.2', 0.150400, '15.04%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 273),
  ('urea', 26.2000, '26.2', 0.683900, '68.39%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 273),
  ('ph_average', 7.4300, '7.43', 0.119700, '11.97%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 274),
  ('salts', 26.3000, '26.3', 0.151800, '15.18%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 274),
  ('urea', 26.3000, '26.3', 0.688200, '68.82%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 274),
  ('ph_average', 7.4400, '7.44', 0.122500, '12.25%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 275),
  ('salts', 26.4000, '26.4', 0.153100, '15.31%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 275),
  ('urea', 26.4000, '26.4', 0.692400, '69.24%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 275),
  ('ph_average', 7.4500, '7.45', 0.125300, '12.53%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 276),
  ('salts', 26.5000, '26.5', 0.154500, '15.45%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 276),
  ('urea', 26.5000, '26.5', 0.696600, '69.66%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 276),
  ('ph_average', 7.4600, '7.46', 0.128100, '12.81%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 277),
  ('salts', 26.6000, '26.6', 0.155800, '15.58%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 277),
  ('urea', 26.6000, '26.6', 0.700800, '70.08%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 277),
  ('ph_average', 7.4700, '7.47', 0.130900, '13.09%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 278),
  ('salts', 26.7000, '26.7', 0.157200, '15.72%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 278),
  ('urea', 26.7000, '26.7', 0.705100, '70.51%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 278),
  ('ph_average', 7.4800, '7.48', 0.133700, '13.37%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 279),
  ('salts', 26.8000, '26.8', 0.158500, '15.85%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 279),
  ('urea', 26.8000, '26.8', 0.709300, '70.93%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 279),
  ('ph_average', 7.4900, '7.49', 0.136500, '13.65%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 280),
  ('salts', 26.9000, '26.9', 0.159900, '15.99%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 280),
  ('urea', 26.9000, '26.9', 0.713500, '71.35%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 280),
  ('ph_average', 7.5000, '7.5', 0.139200, '13.92%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 281),
  ('salts', 27.0000, '27', 0.161200, '16.12%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 281),
  ('urea', 27.0000, '27', 0.717700, '71.77%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 281),
  ('ph_average', 7.5100, '7.51', 0.142000, '14.20%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 282),
  ('salts', 27.1000, '27.1', 0.162500, '16.25%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 282),
  ('urea', 27.1000, '27.1', 0.722000, '72.20%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 282),
  ('ph_average', 7.5200, '7.52', 0.144800, '14.48%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 283),
  ('salts', 27.2000, '27.2', 0.163900, '16.39%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 283),
  ('urea', 27.2000, '27.2', 0.726200, '72.62%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 283),
  ('ph_average', 7.5300, '7.53', 0.147600, '14.76%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 284),
  ('salts', 27.3000, '27.3', 0.165200, '16.52%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 284),
  ('urea', 27.3000, '27.3', 0.730400, '73.04%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 284),
  ('ph_average', 7.5400, '7.54', 0.150400, '15.04%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 285),
  ('salts', 27.4000, '27.4', 0.166600, '16.66%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 285),
  ('urea', 27.4000, '27.4', 0.734600, '73.46%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 285),
  ('ph_average', 7.5500, '7.55', 0.153200, '15.32%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 286),
  ('salts', 27.5000, '27.5', 0.167900, '16.79%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 286),
  ('urea', 27.5000, '27.5', 0.738900, '73.89%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 286),
  ('ph_average', 7.5600, '7.56', 0.155900, '15.59%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 287),
  ('salts', 27.6000, '27.6', 0.169300, '16.93%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 287),
  ('urea', 27.6000, '27.6', 0.743100, '74.31%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 287),
  ('ph_average', 7.5700, '7.57', 0.158700, '15.87%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 288),
  ('salts', 27.7000, '27.7', 0.170600, '17.06%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 288),
  ('urea', 27.7000, '27.7', 0.747300, '74.73%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 288),
  ('ph_average', 7.5800, '7.58', 0.161500, '16.15%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 289),
  ('salts', 27.8000, '27.8', 0.171900, '17.19%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 289),
  ('urea', 27.8000, '27.8', 0.751500, '75.15%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 289),
  ('ph_average', 7.5900, '7.59', 0.164300, '16.43%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 290),
  ('salts', 27.9000, '27.9', 0.173300, '17.33%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 290),
  ('urea', 27.9000, '27.9', 0.755800, '75.58%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 290),
  ('ph_average', 7.6000, '7.6', 0.167100, '16.71%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 291),
  ('salts', 28.0000, '28', 0.174600, '17.46%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 291),
  ('urea', 28.0000, '28', 0.760000, '76%', 0.004200, '0.42%', 'Reading Tables v1.csv', 'v1', 291),
  ('ph_average', 7.6100, '7.61', 0.169900, '16.99%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 292),
  ('salts', 28.1000, '28.1', 0.176000, '17.60%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 292),
  ('urea', 28.1000, '28.1', 0.770000, '77.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 292),
  ('ph_average', 7.6200, '7.62', 0.172700, '17.27%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 293),
  ('salts', 28.2000, '28.2', 0.177300, '17.73%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 293),
  ('urea', 28.2000, '28.2', 0.780000, '78.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 293),
  ('ph_average', 7.6300, '7.63', 0.175400, '17.54%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 294),
  ('salts', 28.3000, '28.3', 0.178700, '17.87%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 294),
  ('urea', 28.3000, '28.3', 0.790000, '79.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 294),
  ('ph_average', 7.6400, '7.64', 0.178200, '17.82%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 295),
  ('salts', 28.4000, '28.4', 0.180000, '18%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 295),
  ('urea', 28.4000, '28.4', 0.800000, '80.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 295),
  ('ph_average', 7.6500, '7.65', 0.181000, '18.10%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 296),
  ('salts', 28.5000, '28.5', 0.181900, '18.19%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 296),
  ('urea', 28.5000, '28.5', 0.810000, '81.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 296),
  ('ph_average', 7.6600, '7.66', 0.183800, '18.38%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 297),
  ('salts', 28.6000, '28.6', 0.183700, '18.37%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 297),
  ('urea', 28.6000, '28.6', 0.820000, '82.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 297),
  ('ph_average', 7.6700, '7.67', 0.186600, '18.66%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 298),
  ('salts', 28.7000, '28.7', 0.185600, '18.56%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 298),
  ('urea', 28.7000, '28.7', 0.830000, '83.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 298),
  ('ph_average', 7.6800, '7.68', 0.189400, '18.94%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 299),
  ('salts', 28.8000, '28.8', 0.187500, '18.75%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 299),
  ('urea', 28.8000, '28.8', 0.840000, '84.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 299),
  ('ph_average', 7.6900, '7.69', 0.192200, '19.22%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 300),
  ('salts', 28.9000, '28.9', 0.189300, '18.93%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 300),
  ('urea', 28.9000, '28.9', 0.850000, '85.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 300),
  ('ph_average', 7.7000, '7.7', 0.194900, '19.49%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 301),
  ('salts', 29.0000, '29', 0.191200, '19.12%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 301),
  ('urea', 29.0000, '29', 0.860000, '86.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 301),
  ('ph_average', 7.7100, '7.71', 0.197700, '19.77%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 302),
  ('salts', 29.1000, '29.1', 0.193100, '19.31%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 302),
  ('urea', 29.1000, '29.1', 0.870000, '87.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 302),
  ('ph_average', 7.7200, '7.72', 0.200500, '20.05%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 303),
  ('salts', 29.2000, '29.2', 0.194900, '19.49%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 303),
  ('urea', 29.2000, '29.2', 0.880000, '88.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 303),
  ('ph_average', 7.7300, '7.73', 0.203300, '20.33%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 304),
  ('salts', 29.3000, '29.3', 0.196800, '19.68%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 304),
  ('urea', 29.3000, '29.3', 0.890000, '89.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 304),
  ('ph_average', 7.7400, '7.74', 0.206100, '20.61%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 305),
  ('salts', 29.4000, '29.4', 0.198700, '19.87%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 305),
  ('urea', 29.4000, '29.4', 0.900000, '90.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 305),
  ('ph_average', 7.7500, '7.75', 0.208900, '20.89%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 306),
  ('salts', 29.5000, '29.5', 0.200500, '20.05%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 306),
  ('urea', 29.5000, '29.5', 0.910000, '91.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 306),
  ('ph_average', 7.7600, '7.76', 0.211600, '21.16%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 307),
  ('salts', 29.6000, '29.6', 0.202400, '20.24%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 307),
  ('urea', 29.6000, '29.6', 0.920000, '92.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 307),
  ('ph_average', 7.7700, '7.77', 0.214400, '21.44%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 308),
  ('salts', 29.7000, '29.7', 0.204300, '20.43%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 308),
  ('urea', 29.7000, '29.7', 0.930000, '93.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 308),
  ('ph_average', 7.7800, '7.78', 0.217200, '21.72%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 309),
  ('salts', 29.8000, '29.8', 0.206100, '20.61%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 309),
  ('urea', 29.8000, '29.8', 0.940000, '94.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 309),
  ('ph_average', 7.7900, '7.79', 0.220000, '22%', 0.002800, '0.28%', 'Reading Tables v1.csv', 'v1', 310),
  ('salts', 29.9000, '29.9', 0.208000, '20.80%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 310),
  ('urea', 29.9000, '29.9', 0.950000, '95.00%', 0.010000, '1.00%', 'Reading Tables v1.csv', 'v1', 310),
  ('ph_average', 7.8000, '7.8', 0.223200, '22.32%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 311),
  ('salts', 30.0000, '30', 0.209900, '20.99%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 311),
  ('urea', 30.0000, '30', 0.960000, '96%', null, '', 'Reading Tables v1.csv', 'v1', 311),
  ('ph_average', 7.8100, '7.81', 0.226400, '22.64%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 312),
  ('salts', 30.1000, '30.1', 0.211700, '21.17%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 312),
  ('ph_average', 7.8200, '7.82', 0.229600, '22.96%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 313),
  ('salts', 30.2000, '30.2', 0.213600, '21.36%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 313),
  ('ph_average', 7.8300, '7.83', 0.232800, '23.28%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 314),
  ('salts', 30.3000, '30.3', 0.215500, '21.55%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 314),
  ('ph_average', 7.8400, '7.84', 0.236000, '23.60%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 315),
  ('salts', 30.4000, '30.4', 0.217300, '21.73%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 315),
  ('ph_average', 7.8500, '7.85', 0.239300, '23.93%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 316),
  ('salts', 30.5000, '30.5', 0.219200, '21.92%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 316),
  ('ph_average', 7.8600, '7.86', 0.242500, '24.25%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 317),
  ('salts', 30.6000, '30.6', 0.221100, '22.11%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 317),
  ('ph_average', 7.8700, '7.87', 0.245700, '24.57%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 318),
  ('salts', 30.7000, '30.7', 0.222900, '22.29%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 318),
  ('ph_average', 7.8800, '7.88', 0.248900, '24.89%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 319),
  ('salts', 30.8000, '30.8', 0.224800, '22.48%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 319),
  ('ph_average', 7.8900, '7.89', 0.252100, '25.21%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 320),
  ('salts', 30.9000, '30.9', 0.226700, '22.67%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 320),
  ('ph_average', 7.9000, '7.9', 0.255300, '25.53%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 321),
  ('salts', 31.0000, '31', 0.228500, '22.85%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 321),
  ('ph_average', 7.9100, '7.91', 0.258500, '25.85%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 322),
  ('salts', 31.1000, '31.1', 0.230400, '23.04%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 322),
  ('ph_average', 7.9200, '7.92', 0.261700, '26.17%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 323),
  ('salts', 31.2000, '31.2', 0.232300, '23.23%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 323),
  ('ph_average', 7.9300, '7.93', 0.264900, '26.49%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 324),
  ('salts', 31.3000, '31.3', 0.234100, '23.41%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 324),
  ('ph_average', 7.9400, '7.94', 0.268100, '26.81%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 325),
  ('salts', 31.4000, '31.4', 0.236000, '23.60%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 325),
  ('ph_average', 7.9500, '7.95', 0.271400, '27.14%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 326),
  ('salts', 31.5000, '31.5', 0.237900, '23.79%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 326),
  ('ph_average', 7.9600, '7.96', 0.274600, '27.46%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 327),
  ('salts', 31.6000, '31.6', 0.239700, '23.97%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 327),
  ('ph_average', 7.9700, '7.97', 0.277800, '27.78%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 328),
  ('salts', 31.7000, '31.7', 0.241600, '24.16%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 328),
  ('ph_average', 7.9800, '7.98', 0.281000, '28.10%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 329),
  ('salts', 31.8000, '31.8', 0.243500, '24.35%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 329),
  ('ph_average', 7.9900, '7.99', 0.284200, '28.42%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 330),
  ('salts', 31.9000, '31.9', 0.245300, '24.53%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 330),
  ('ph_average', 8.0000, '8', 0.287400, '28.74%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 331),
  ('salts', 32.0000, '32', 0.247200, '24.72%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 331),
  ('ph_average', 8.0100, '8.01', 0.290600, '29.06%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 332),
  ('salts', 32.1000, '32.1', 0.249100, '24.91%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 332),
  ('ph_average', 8.0200, '8.02', 0.293800, '29.38%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 333),
  ('salts', 32.2000, '32.2', 0.250900, '25.09%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 333),
  ('ph_average', 8.0300, '8.03', 0.297000, '29.70%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 334),
  ('salts', 32.3000, '32.3', 0.252800, '25.28%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 334),
  ('ph_average', 8.0400, '8.04', 0.300200, '30.02%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 335),
  ('salts', 32.4000, '32.4', 0.254700, '25.47%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 335),
  ('ph_average', 8.0500, '8.05', 0.303500, '30.35%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 336),
  ('salts', 32.5000, '32.5', 0.256500, '25.65%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 336),
  ('ph_average', 8.0600, '8.06', 0.306700, '30.67%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 337),
  ('salts', 32.6000, '32.6', 0.258400, '25.84%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 337),
  ('ph_average', 8.0700, '8.07', 0.309900, '30.99%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 338),
  ('salts', 32.7000, '32.7', 0.260300, '26.03%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 338),
  ('ph_average', 8.0800, '8.08', 0.313100, '31.31%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 339),
  ('salts', 32.8000, '32.8', 0.262100, '26.21%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 339),
  ('ph_average', 8.0900, '8.09', 0.316300, '31.63%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 340),
  ('salts', 32.9000, '32.9', 0.264000, '26.40%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 340),
  ('ph_average', 8.1000, '8.1', 0.319500, '31.95%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 341),
  ('salts', 33.0000, '33', 0.265900, '26.59%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 341),
  ('ph_average', 8.1100, '8.11', 0.322700, '32.27%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 342),
  ('salts', 33.1000, '33.1', 0.267700, '26.77%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 342),
  ('ph_average', 8.1200, '8.12', 0.325900, '32.59%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 343),
  ('salts', 33.2000, '33.2', 0.269600, '26.96%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 343),
  ('ph_average', 8.1300, '8.13', 0.329100, '32.91%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 344),
  ('salts', 33.3000, '33.3', 0.271500, '27.15%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 344),
  ('ph_average', 8.1400, '8.14', 0.332300, '33.23%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 345),
  ('salts', 33.4000, '33.4', 0.273300, '27.33%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 345),
  ('ph_average', 8.1500, '8.15', 0.335600, '33.56%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 346),
  ('salts', 33.5000, '33.5', 0.275200, '27.52%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 346),
  ('ph_average', 8.1600, '8.16', 0.338800, '33.88%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 347),
  ('salts', 33.6000, '33.6', 0.277100, '27.71%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 347),
  ('ph_average', 8.1700, '8.17', 0.342000, '34.20%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 348),
  ('salts', 33.7000, '33.7', 0.278900, '27.89%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 348),
  ('ph_average', 8.1800, '8.18', 0.345200, '34.52%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 349),
  ('salts', 33.8000, '33.8', 0.280800, '28.08%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 349),
  ('ph_average', 8.1900, '8.19', 0.348400, '34.84%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 350),
  ('salts', 33.9000, '33.9', 0.282700, '28.27%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 350),
  ('ph_average', 8.2000, '8.2', 0.351600, '35.16%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 351),
  ('salts', 34.0000, '34', 0.284500, '28.45%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 351),
  ('ph_average', 8.2100, '8.21', 0.354800, '35.48%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 352),
  ('salts', 34.1000, '34.1', 0.286400, '28.64%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 352),
  ('ph_average', 8.2200, '8.22', 0.358000, '35.80%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 353),
  ('salts', 34.2000, '34.2', 0.288300, '28.83%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 353),
  ('ph_average', 8.2300, '8.23', 0.361200, '36.12%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 354),
  ('salts', 34.3000, '34.3', 0.290100, '29.01%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 354),
  ('ph_average', 8.2400, '8.24', 0.364400, '36.44%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 355),
  ('salts', 34.4000, '34.4', 0.292000, '29.20%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 355),
  ('ph_average', 8.2500, '8.25', 0.367700, '36.77%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 356),
  ('salts', 34.5000, '34.5', 0.293900, '29.39%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 356),
  ('ph_average', 8.2600, '8.26', 0.370900, '37.09%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 357),
  ('salts', 34.6000, '34.6', 0.295700, '29.57%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 357),
  ('ph_average', 8.2700, '8.27', 0.374100, '37.41%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 358),
  ('salts', 34.7000, '34.7', 0.297600, '29.76%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 358),
  ('ph_average', 8.2800, '8.28', 0.377300, '37.73%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 359),
  ('salts', 34.8000, '34.8', 0.299500, '29.95%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 359),
  ('ph_average', 8.2900, '8.29', 0.380500, '38.05%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 360),
  ('salts', 34.9000, '34.9', 0.301300, '30.13%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 360),
  ('ph_average', 8.3000, '8.3', 0.383700, '38.37%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 361),
  ('salts', 35.0000, '35', 0.303200, '30.32%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 361),
  ('ph_average', 8.3100, '8.31', 0.386900, '38.69%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 362),
  ('salts', 35.1000, '35.1', 0.305100, '30.51%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 362),
  ('ph_average', 8.3200, '8.32', 0.390100, '39.01%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 363),
  ('salts', 35.2000, '35.2', 0.306900, '30.69%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 363),
  ('ph_average', 8.3300, '8.33', 0.393300, '39.33%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 364),
  ('salts', 35.3000, '35.3', 0.308800, '30.88%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 364),
  ('ph_average', 8.3400, '8.34', 0.396500, '39.65%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 365),
  ('salts', 35.4000, '35.4', 0.310700, '31.07%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 365),
  ('ph_average', 8.3500, '8.35', 0.399800, '39.98%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 366),
  ('salts', 35.5000, '35.5', 0.312500, '31.25%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 366),
  ('ph_average', 8.3600, '8.36', 0.403000, '40.30%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 367),
  ('salts', 35.6000, '35.6', 0.314400, '31.44%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 367),
  ('ph_average', 8.3700, '8.37', 0.406200, '40.62%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 368),
  ('salts', 35.7000, '35.7', 0.316300, '31.63%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 368),
  ('ph_average', 8.3800, '8.38', 0.409400, '40.94%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 369),
  ('salts', 35.8000, '35.8', 0.318100, '31.81%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 369),
  ('ph_average', 8.3900, '8.39', 0.412600, '41.26%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 370),
  ('salts', 35.9000, '35.9', 0.320000, '32.00%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 370),
  ('ph_average', 8.4000, '8.4', 0.415800, '41.58%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 371),
  ('salts', 36.0000, '36', 0.321900, '32.19%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 371),
  ('ph_average', 8.4100, '8.41', 0.419000, '41.90%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 372),
  ('salts', 36.1000, '36.1', 0.323700, '32.37%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 372),
  ('ph_average', 8.4200, '8.42', 0.422200, '42.22%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 373),
  ('salts', 36.2000, '36.2', 0.325600, '32.56%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 373),
  ('ph_average', 8.4300, '8.43', 0.425400, '42.54%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 374),
  ('salts', 36.3000, '36.3', 0.327500, '32.75%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 374),
  ('ph_average', 8.4400, '8.44', 0.428600, '42.86%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 375),
  ('salts', 36.4000, '36.4', 0.329300, '32.93%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 375),
  ('ph_average', 8.4500, '8.45', 0.431900, '43.19%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 376),
  ('salts', 36.5000, '36.5', 0.331200, '33.12%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 376),
  ('ph_average', 8.4600, '8.46', 0.435100, '43.51%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 377),
  ('salts', 36.6000, '36.6', 0.333100, '33.31%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 377),
  ('ph_average', 8.4700, '8.47', 0.438300, '43.83%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 378),
  ('salts', 36.7000, '36.7', 0.334900, '33.49%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 378),
  ('ph_average', 8.4800, '8.48', 0.441500, '44.15%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 379),
  ('salts', 36.8000, '36.8', 0.336800, '33.68%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 379),
  ('ph_average', 8.4900, '8.49', 0.444700, '44.47%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 380),
  ('salts', 36.9000, '36.9', 0.338700, '33.87%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 380),
  ('ph_average', 8.5000, '8.5', 0.447900, '44.79%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 381),
  ('salts', 37.0000, '37', 0.340500, '34.05%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 381),
  ('ph_average', 8.5100, '8.51', 0.451100, '45.11%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 382),
  ('salts', 37.1000, '37.1', 0.342400, '34.24%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 382),
  ('ph_average', 8.5200, '8.52', 0.454300, '45.43%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 383),
  ('salts', 37.2000, '37.2', 0.344300, '34.43%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 383),
  ('ph_average', 8.5300, '8.53', 0.457500, '45.75%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 384),
  ('salts', 37.3000, '37.3', 0.346100, '34.61%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 384),
  ('ph_average', 8.5400, '8.54', 0.460700, '46.07%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 385),
  ('salts', 37.4000, '37.4', 0.348000, '34.80%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 385),
  ('ph_average', 8.5500, '8.55', 0.464000, '46.40%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 386),
  ('salts', 37.5000, '37.5', 0.349900, '34.99%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 386),
  ('ph_average', 8.5600, '8.56', 0.467200, '46.72%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 387),
  ('salts', 37.6000, '37.6', 0.351700, '35.17%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 387),
  ('ph_average', 8.5700, '8.57', 0.470400, '47.04%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 388),
  ('salts', 37.7000, '37.7', 0.353600, '35.36%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 388),
  ('ph_average', 8.5800, '8.58', 0.473600, '47.36%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 389),
  ('salts', 37.8000, '37.8', 0.355500, '35.55%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 389),
  ('ph_average', 8.5900, '8.59', 0.476800, '47.68%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 390),
  ('salts', 37.9000, '37.9', 0.357300, '35.73%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 390),
  ('ph_average', 8.6000, '8.6', 0.480000, '48.00%', 0.003200, '0.32%', 'Reading Tables v1.csv', 'v1', 391),
  ('salts', 38.0000, '38', 0.359200, '35.92%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 391),
  ('ph_average', 8.6100, '8.61', 0.477800, '47.78%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 392),
  ('salts', 38.1000, '38.1', 0.361100, '36.11%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 392),
  ('ph_average', 8.6200, '8.62', 0.475600, '47.56%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 393),
  ('salts', 38.2000, '38.2', 0.362900, '36.29%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 393),
  ('ph_average', 8.6300, '8.63', 0.473400, '47.34%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 394),
  ('salts', 38.3000, '38.3', 0.364800, '36.48%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 394),
  ('ph_average', 8.6400, '8.64', 0.471200, '47.12%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 395),
  ('salts', 38.4000, '38.4', 0.366700, '36.67%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 395),
  ('ph_average', 8.6500, '8.65', 0.469000, '46.90%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 396),
  ('salts', 38.5000, '38.5', 0.368500, '36.85%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 396),
  ('ph_average', 8.6600, '8.66', 0.466800, '46.68%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 397),
  ('salts', 38.6000, '38.6', 0.370400, '37.04%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 397),
  ('ph_average', 8.6700, '8.67', 0.464600, '46.46%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 398),
  ('salts', 38.7000, '38.7', 0.372300, '37.23%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 398),
  ('ph_average', 8.6800, '8.68', 0.462400, '46.24%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 399),
  ('salts', 38.8000, '38.8', 0.374100, '37.41%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 399),
  ('ph_average', 8.6900, '8.69', 0.460200, '46.02%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 400),
  ('salts', 38.9000, '38.9', 0.376000, '37.60%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 400),
  ('ph_average', 8.7000, '8.7', 0.458000, '45.80%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 401),
  ('salts', 39.0000, '39', 0.377900, '37.79%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 401),
  ('ph_average', 8.7100, '8.71', 0.455800, '45.58%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 402),
  ('salts', 39.1000, '39.1', 0.379700, '37.97%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 402),
  ('ph_average', 8.7200, '8.72', 0.453600, '45.36%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 403),
  ('salts', 39.2000, '39.2', 0.381600, '38.16%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 403),
  ('ph_average', 8.7300, '8.73', 0.451400, '45.14%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 404),
  ('salts', 39.3000, '39.3', 0.383500, '38.35%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 404),
  ('ph_average', 8.7400, '8.74', 0.449200, '44.92%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 405),
  ('salts', 39.4000, '39.4', 0.385300, '38.53%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 405),
  ('ph_average', 8.7500, '8.75', 0.447000, '44.70%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 406),
  ('salts', 39.5000, '39.5', 0.387200, '38.72%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 406),
  ('ph_average', 8.7600, '8.76', 0.444800, '44.48%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 407),
  ('salts', 39.6000, '39.6', 0.389100, '38.91%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 407),
  ('ph_average', 8.7700, '8.77', 0.442600, '44.26%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 408),
  ('salts', 39.7000, '39.7', 0.390900, '39.09%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 408),
  ('ph_average', 8.7800, '8.78', 0.440400, '44.04%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 409),
  ('salts', 39.8000, '39.8', 0.392800, '39.28%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 409),
  ('ph_average', 8.7900, '8.79', 0.438200, '43.82%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 410),
  ('salts', 39.9000, '39.9', 0.394700, '39.47%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 410),
  ('ph_average', 8.8000, '8.8', 0.436000, '43.60%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 411),
  ('salts', 40.0000, '40', 0.396500, '39.65%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 411),
  ('ph_average', 8.8100, '8.81', 0.433800, '43.38%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 412),
  ('salts', 40.1000, '40.1', 0.398400, '39.84%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 412),
  ('ph_average', 8.8200, '8.82', 0.431600, '43.16%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 413),
  ('salts', 40.2000, '40.2', 0.400300, '40.03%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 413),
  ('ph_average', 8.8300, '8.83', 0.429400, '42.94%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 414),
  ('salts', 40.3000, '40.3', 0.402100, '40.21%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 414),
  ('ph_average', 8.8400, '8.84', 0.427200, '42.72%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 415),
  ('salts', 40.4000, '40.4', 0.404000, '40.40%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 415),
  ('ph_average', 8.8500, '8.85', 0.425000, '42.50%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 416),
  ('salts', 40.5000, '40.5', 0.405900, '40.59%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 416),
  ('ph_average', 8.8600, '8.86', 0.422800, '42.28%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 417),
  ('salts', 40.6000, '40.6', 0.407700, '40.77%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 417),
  ('ph_average', 8.8700, '8.87', 0.420600, '42.06%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 418),
  ('salts', 40.7000, '40.7', 0.409600, '40.96%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 418),
  ('ph_average', 8.8800, '8.88', 0.418400, '41.84%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 419),
  ('salts', 40.8000, '40.8', 0.411500, '41.15%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 419),
  ('ph_average', 8.8900, '8.89', 0.416200, '41.62%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 420),
  ('salts', 40.9000, '40.9', 0.413300, '41.33%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 420),
  ('ph_average', 8.9000, '8.9', 0.414000, '41.40%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 421),
  ('salts', 41.0000, '41', 0.415200, '41.52%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 421),
  ('ph_average', 8.9100, '8.91', 0.411800, '41.18%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 422),
  ('salts', 41.1000, '41.1', 0.417100, '41.71%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 422),
  ('ph_average', 8.9200, '8.92', 0.409600, '40.96%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 423),
  ('salts', 41.2000, '41.2', 0.418900, '41.89%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 423),
  ('ph_average', 8.9300, '8.93', 0.407400, '40.74%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 424),
  ('salts', 41.3000, '41.3', 0.420800, '42.08%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 424),
  ('ph_average', 8.9400, '8.94', 0.405200, '40.52%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 425),
  ('salts', 41.4000, '41.4', 0.422700, '42.27%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 425),
  ('ph_average', 8.9500, '8.95', 0.403000, '40.30%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 426),
  ('salts', 41.5000, '41.5', 0.424500, '42.45%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 426),
  ('ph_average', 8.9600, '8.96', 0.400800, '40.08%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 427),
  ('salts', 41.6000, '41.6', 0.426400, '42.64%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 427),
  ('ph_average', 8.9700, '8.97', 0.398600, '39.86%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 428),
  ('salts', 41.7000, '41.7', 0.428300, '42.83%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 428),
  ('ph_average', 8.9800, '8.98', 0.396400, '39.64%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 429),
  ('salts', 41.8000, '41.8', 0.430100, '43.01%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 429),
  ('ph_average', 8.9900, '8.99', 0.394200, '39.42%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 430),
  ('salts', 41.9000, '41.9', 0.432000, '43.20%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 430),
  ('ph_average', 9.0000, '9', 0.392000, '39.20%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 431),
  ('salts', 42.0000, '42', 0.433900, '43.39%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 431),
  ('ph_average', 9.0100, '9.01', 0.389800, '38.98%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 432),
  ('salts', 42.1000, '42.1', 0.435700, '43.57%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 432),
  ('ph_average', 9.0200, '9.02', 0.387600, '38.76%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 433),
  ('salts', 42.2000, '42.2', 0.437600, '43.76%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 433),
  ('ph_average', 9.0300, '9.03', 0.385400, '38.54%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 434),
  ('salts', 42.3000, '42.3', 0.439500, '43.95%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 434),
  ('ph_average', 9.0400, '9.04', 0.383200, '38.32%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 435),
  ('salts', 42.4000, '42.4', 0.441300, '44.13%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 435),
  ('ph_average', 9.0500, '9.05', 0.381000, '38.10%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 436),
  ('salts', 42.5000, '42.5', 0.443200, '44.32%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 436),
  ('ph_average', 9.0600, '9.06', 0.378800, '37.88%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 437),
  ('salts', 42.6000, '42.6', 0.445100, '44.51%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 437),
  ('ph_average', 9.0700, '9.07', 0.376600, '37.66%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 438),
  ('salts', 42.7000, '42.7', 0.446900, '44.69%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 438),
  ('ph_average', 9.0800, '9.08', 0.374400, '37.44%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 439),
  ('salts', 42.8000, '42.8', 0.448800, '44.88%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 439),
  ('ph_average', 9.0900, '9.09', 0.372200, '37.22%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 440),
  ('salts', 42.9000, '42.9', 0.450700, '45.07%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 440),
  ('ph_average', 9.1000, '9.1', 0.370000, '37.00%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 441),
  ('salts', 43.0000, '43', 0.452500, '45.25%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 441),
  ('ph_average', 9.1100, '9.11', 0.367800, '36.78%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 442),
  ('salts', 43.1000, '43.1', 0.454400, '45.44%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 442),
  ('ph_average', 9.1200, '9.12', 0.365600, '36.56%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 443),
  ('salts', 43.2000, '43.2', 0.456300, '45.63%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 443),
  ('ph_average', 9.1300, '9.13', 0.363400, '36.34%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 444),
  ('salts', 43.3000, '43.3', 0.458100, '45.81%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 444),
  ('ph_average', 9.1400, '9.14', 0.361200, '36.12%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 445),
  ('salts', 43.4000, '43.4', 0.460000, '46%', 0.001900, '0.19%', 'Reading Tables v1.csv', 'v1', 445),
  ('ph_average', 9.1500, '9.15', 0.359000, '35.90%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 446),
  ('salts', 43.5000, '43.5', 0.460800, '46.08%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 446),
  ('ph_average', 9.1600, '9.16', 0.356800, '35.68%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 447),
  ('salts', 43.6000, '43.6', 0.461500, '46.15%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 447),
  ('ph_average', 9.1700, '9.17', 0.354600, '35.46%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 448),
  ('salts', 43.7000, '43.7', 0.462300, '46.23%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 448),
  ('ph_average', 9.1800, '9.18', 0.352400, '35.24%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 449),
  ('salts', 43.8000, '43.8', 0.463100, '46.31%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 449),
  ('ph_average', 9.1900, '9.19', 0.350200, '35.02%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 450),
  ('salts', 43.9000, '43.9', 0.463800, '46.38%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 450),
  ('ph_average', 9.2000, '9.2', 0.348000, '34.80%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 451),
  ('salts', 44.0000, '44', 0.464600, '46.46%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 451),
  ('ph_average', 9.2100, '9.21', 0.345800, '34.58%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 452),
  ('salts', 44.1000, '44.1', 0.465300, '46.53%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 452),
  ('ph_average', 9.2200, '9.22', 0.343600, '34.36%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 453),
  ('salts', 44.2000, '44.2', 0.466100, '46.61%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 453),
  ('ph_average', 9.2300, '9.23', 0.341400, '34.14%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 454),
  ('salts', 44.3000, '44.3', 0.466900, '46.69%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 454),
  ('ph_average', 9.2400, '9.24', 0.339200, '33.92%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 455),
  ('salts', 44.4000, '44.4', 0.467600, '46.76%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 455),
  ('ph_average', 9.2500, '9.25', 0.337000, '33.70%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 456),
  ('salts', 44.5000, '44.5', 0.468400, '46.84%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 456),
  ('ph_average', 9.2600, '9.26', 0.334800, '33.48%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 457),
  ('salts', 44.6000, '44.6', 0.469200, '46.92%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 457),
  ('ph_average', 9.2700, '9.27', 0.332600, '33.26%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 458),
  ('salts', 44.7000, '44.7', 0.469900, '46.99%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 458),
  ('ph_average', 9.2800, '9.28', 0.330400, '33.04%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 459),
  ('salts', 44.8000, '44.8', 0.470700, '47.07%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 459),
  ('ph_average', 9.2900, '9.29', 0.328200, '32.82%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 460),
  ('salts', 44.9000, '44.9', 0.471500, '47.15%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 460),
  ('ph_average', 9.3000, '9.3', 0.326000, '32.60%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 461),
  ('salts', 45.0000, '45', 0.472200, '47.22%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 461),
  ('ph_average', 9.3100, '9.31', 0.323800, '32.38%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 462),
  ('salts', 45.1000, '45.1', 0.473000, '47.30%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 462),
  ('ph_average', 9.3200, '9.32', 0.321600, '32.16%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 463),
  ('salts', 45.2000, '45.2', 0.473700, '47.37%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 463),
  ('ph_average', 9.3300, '9.33', 0.319400, '31.94%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 464),
  ('salts', 45.3000, '45.3', 0.474500, '47.45%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 464),
  ('ph_average', 9.3400, '9.34', 0.317200, '31.72%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 465),
  ('salts', 45.4000, '45.4', 0.475300, '47.53%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 465),
  ('ph_average', 9.3500, '9.35', 0.315000, '31.50%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 466),
  ('salts', 45.5000, '45.5', 0.476000, '47.60%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 466),
  ('ph_average', 9.3600, '9.36', 0.312800, '31.28%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 467),
  ('salts', 45.6000, '45.6', 0.476800, '47.68%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 467),
  ('ph_average', 9.3700, '9.37', 0.310600, '31.06%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 468),
  ('salts', 45.7000, '45.7', 0.477600, '47.76%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 468),
  ('ph_average', 9.3800, '9.38', 0.308400, '30.84%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 469),
  ('salts', 45.8000, '45.8', 0.478300, '47.83%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 469),
  ('ph_average', 9.3900, '9.39', 0.306200, '30.62%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 470),
  ('salts', 45.9000, '45.9', 0.479100, '47.91%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 470),
  ('ph_average', 9.4000, '9.4', 0.304000, '30.40%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 471),
  ('salts', 46.0000, '46', 0.479800, '47.98%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 471),
  ('ph_average', 9.4100, '9.41', 0.301800, '30.18%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 472),
  ('salts', 46.1000, '46.1', 0.480600, '48.06%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 472),
  ('ph_average', 9.4200, '9.42', 0.299600, '29.96%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 473),
  ('salts', 46.2000, '46.2', 0.481400, '48.14%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 473),
  ('ph_average', 9.4300, '9.43', 0.297400, '29.74%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 474),
  ('salts', 46.3000, '46.3', 0.482100, '48.21%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 474),
  ('ph_average', 9.4400, '9.44', 0.295200, '29.52%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 475),
  ('salts', 46.4000, '46.4', 0.482900, '48.29%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 475),
  ('ph_average', 9.4500, '9.45', 0.293000, '29.30%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 476),
  ('salts', 46.5000, '46.5', 0.483700, '48.37%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 476),
  ('ph_average', 9.4600, '9.46', 0.290800, '29.08%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 477),
  ('salts', 46.6000, '46.6', 0.484400, '48.44%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 477),
  ('ph_average', 9.4700, '9.47', 0.288600, '28.86%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 478),
  ('salts', 46.7000, '46.7', 0.485200, '48.52%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 478),
  ('ph_average', 9.4800, '9.48', 0.286400, '28.64%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 479),
  ('salts', 46.8000, '46.8', 0.486000, '48.60%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 479),
  ('ph_average', 9.4900, '9.49', 0.284200, '28.42%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 480),
  ('salts', 46.9000, '46.9', 0.486700, '48.67%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 480),
  ('ph_average', 9.5000, '9.5', 0.282000, '28.20%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 481),
  ('salts', 47.0000, '47', 0.487500, '48.75%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 481),
  ('ph_average', 9.5100, '9.51', 0.279800, '27.98%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 482),
  ('salts', 47.1000, '47.1', 0.488200, '48.82%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 482),
  ('ph_average', 9.5200, '9.52', 0.277600, '27.76%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 483),
  ('salts', 47.2000, '47.2', 0.489000, '48.90%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 483),
  ('ph_average', 9.5300, '9.53', 0.275400, '27.54%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 484),
  ('salts', 47.3000, '47.3', 0.489800, '48.98%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 484),
  ('ph_average', 9.5400, '9.54', 0.273200, '27.32%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 485),
  ('salts', 47.4000, '47.4', 0.490500, '49.05%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 485),
  ('ph_average', 9.5500, '9.55', 0.271000, '27.10%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 486),
  ('salts', 47.5000, '47.5', 0.491300, '49.13%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 486),
  ('ph_average', 9.5600, '9.56', 0.268800, '26.88%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 487),
  ('salts', 47.6000, '47.6', 0.492100, '49.21%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 487),
  ('ph_average', 9.5700, '9.57', 0.266600, '26.66%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 488),
  ('salts', 47.7000, '47.7', 0.492800, '49.28%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 488),
  ('ph_average', 9.5800, '9.58', 0.264400, '26.44%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 489),
  ('salts', 47.8000, '47.8', 0.493600, '49.36%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 489),
  ('ph_average', 9.5900, '9.59', 0.262200, '26.22%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 490),
  ('salts', 47.9000, '47.9', 0.494400, '49.44%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 490),
  ('ph_average', 9.6000, '9.6', 0.260000, '26.00%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 491),
  ('salts', 48.0000, '48', 0.495100, '49.51%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 491),
  ('ph_average', 9.6100, '9.61', 0.257800, '25.78%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 492),
  ('salts', 48.1000, '48.1', 0.495900, '49.59%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 492),
  ('ph_average', 9.6200, '9.62', 0.255600, '25.56%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 493),
  ('salts', 48.2000, '48.2', 0.496600, '49.66%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 493),
  ('ph_average', 9.6300, '9.63', 0.253400, '25.34%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 494),
  ('salts', 48.3000, '48.3', 0.497400, '49.74%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 494),
  ('ph_average', 9.6400, '9.64', 0.251200, '25.12%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 495),
  ('salts', 48.4000, '48.4', 0.498200, '49.82%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 495),
  ('ph_average', 9.6500, '9.65', 0.249000, '24.90%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 496),
  ('salts', 48.5000, '48.5', 0.498900, '49.89%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 496),
  ('ph_average', 9.6600, '9.66', 0.246800, '24.68%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 497),
  ('salts', 48.6000, '48.6', 0.499700, '49.97%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 497),
  ('ph_average', 9.6700, '9.67', 0.244600, '24.46%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 498),
  ('salts', 48.7000, '48.7', 0.500500, '50.05%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 498),
  ('ph_average', 9.6800, '9.68', 0.242400, '24.24%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 499),
  ('salts', 48.8000, '48.8', 0.501200, '50.12%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 499),
  ('ph_average', 9.6900, '9.69', 0.240200, '24.02%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 500),
  ('salts', 48.9000, '48.9', 0.502000, '50.20%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 500),
  ('ph_average', 9.7000, '9.7', 0.238000, '23.80%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 501),
  ('salts', 49.0000, '49', 0.502700, '50.27%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 501),
  ('ph_average', 9.7100, '9.71', 0.235800, '23.58%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 502),
  ('salts', 49.1000, '49.1', 0.503500, '50.35%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 502),
  ('ph_average', 9.7200, '9.72', 0.233600, '23.36%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 503),
  ('salts', 49.2000, '49.2', 0.504300, '50.43%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 503),
  ('ph_average', 9.7300, '9.73', 0.231400, '23.14%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 504),
  ('salts', 49.3000, '49.3', 0.505000, '50.50%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 504),
  ('ph_average', 9.7400, '9.74', 0.229200, '22.92%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 505),
  ('salts', 49.4000, '49.4', 0.505800, '50.58%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 505),
  ('ph_average', 9.7500, '9.75', 0.227000, '22.70%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 506),
  ('salts', 49.5000, '49.5', 0.506600, '50.66%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 506),
  ('ph_average', 9.7600, '9.76', 0.224800, '22.48%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 507),
  ('salts', 49.6000, '49.6', 0.507300, '50.73%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 507),
  ('ph_average', 9.7700, '9.77', 0.222600, '22.26%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 508),
  ('salts', 49.7000, '49.7', 0.508100, '50.81%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 508),
  ('ph_average', 9.7800, '9.78', 0.220400, '22.04%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 509),
  ('salts', 49.8000, '49.8', 0.508900, '50.89%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 509),
  ('ph_average', 9.7900, '9.79', 0.218200, '21.82%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 510),
  ('salts', 49.9000, '49.9', 0.509600, '50.96%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 510),
  ('ph_average', 9.8000, '9.8', 0.216000, '21.60%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 511),
  ('salts', 50.0000, '50', 0.510400, '51.04%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 511),
  ('ph_average', 9.8100, '9.81', 0.213800, '21.38%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 512),
  ('salts', 50.1000, '50.1', 0.511100, '51.11%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 512),
  ('ph_average', 9.8200, '9.82', 0.211600, '21.16%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 513),
  ('salts', 50.2000, '50.2', 0.511900, '51.19%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 513),
  ('ph_average', 9.8300, '9.83', 0.209400, '20.94%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 514),
  ('salts', 50.3000, '50.3', 0.512700, '51.27%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 514),
  ('ph_average', 9.8400, '9.84', 0.207200, '20.72%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 515),
  ('salts', 50.4000, '50.4', 0.513400, '51.34%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 515),
  ('ph_average', 9.8500, '9.85', 0.205000, '20.50%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 516),
  ('salts', 50.5000, '50.5', 0.514200, '51.42%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 516),
  ('ph_average', 9.8600, '9.86', 0.202800, '20.28%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 517),
  ('salts', 50.6000, '50.6', 0.515000, '51.50%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 517),
  ('ph_average', 9.8700, '9.87', 0.200600, '20.06%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 518),
  ('salts', 50.7000, '50.7', 0.515700, '51.57%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 518),
  ('ph_average', 9.8800, '9.88', 0.198400, '19.84%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 519),
  ('salts', 50.8000, '50.8', 0.516500, '51.65%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 519),
  ('ph_average', 9.8900, '9.89', 0.196200, '19.62%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 520),
  ('salts', 50.9000, '50.9', 0.517300, '51.73%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 520),
  ('ph_average', 9.9000, '9.9', 0.194000, '19.40%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 521),
  ('salts', 51.0000, '51', 0.518000, '51.80%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 521),
  ('ph_average', 9.9100, '9.91', 0.191800, '19.18%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 522),
  ('salts', 51.1000, '51.1', 0.518800, '51.88%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 522),
  ('ph_average', 9.9200, '9.92', 0.189600, '18.96%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 523),
  ('salts', 51.2000, '51.2', 0.519500, '51.95%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 523),
  ('ph_average', 9.9300, '9.93', 0.187400, '18.74%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 524),
  ('salts', 51.3000, '51.3', 0.520300, '52.03%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 524),
  ('ph_average', 9.9400, '9.94', 0.185200, '18.52%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 525),
  ('salts', 51.4000, '51.4', 0.521100, '52.11%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 525),
  ('ph_average', 9.9500, '9.95', 0.183000, '18.30%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 526),
  ('salts', 51.5000, '51.5', 0.521800, '52.18%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 526),
  ('ph_average', 9.9600, '9.96', 0.180800, '18.08%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 527),
  ('salts', 51.6000, '51.6', 0.522600, '52.26%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 527),
  ('ph_average', 9.9700, '9.97', 0.178600, '17.86%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 528),
  ('salts', 51.7000, '51.7', 0.523400, '52.34%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 528),
  ('ph_average', 9.9800, '9.98', 0.176400, '17.64%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 529),
  ('salts', 51.8000, '51.8', 0.524100, '52.41%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 529),
  ('ph_average', 9.9900, '9.99', 0.174200, '17.42%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 530),
  ('salts', 51.9000, '51.9', 0.524900, '52.49%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 530),
  ('ph_average', 10.0000, '10', 0.172000, '17.20%', 0.002200, '0.22%', 'Reading Tables v1.csv', 'v1', 531),
  ('salts', 52.0000, '52', 0.525600, '52.56%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 531),
  ('salts', 52.1000, '52.1', 0.526400, '52.64%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 532),
  ('salts', 52.2000, '52.2', 0.527200, '52.72%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 533),
  ('salts', 52.3000, '52.3', 0.527900, '52.79%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 534),
  ('salts', 52.4000, '52.4', 0.528700, '52.87%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 535),
  ('salts', 52.5000, '52.5', 0.529500, '52.95%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 536),
  ('salts', 52.6000, '52.6', 0.530200, '53.02%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 537),
  ('salts', 52.7000, '52.7', 0.531000, '53.10%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 538),
  ('salts', 52.8000, '52.8', 0.531800, '53.18%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 539),
  ('salts', 52.9000, '52.9', 0.532500, '53.25%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 540),
  ('salts', 53.0000, '53', 0.533300, '53.33%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 541),
  ('salts', 53.1000, '53.1', 0.534000, '53.40%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 542),
  ('salts', 53.2000, '53.2', 0.534800, '53.48%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 543),
  ('salts', 53.3000, '53.3', 0.535600, '53.56%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 544),
  ('salts', 53.4000, '53.4', 0.536300, '53.63%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 545),
  ('salts', 53.5000, '53.5', 0.537100, '53.71%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 546),
  ('salts', 53.6000, '53.6', 0.537900, '53.79%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 547),
  ('salts', 53.7000, '53.7', 0.538600, '53.86%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 548),
  ('salts', 53.8000, '53.8', 0.539400, '53.94%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 549),
  ('salts', 53.9000, '53.9', 0.540200, '54.02%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 550),
  ('salts', 54.0000, '54', 0.540900, '54.09%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 551),
  ('salts', 54.1000, '54.1', 0.541700, '54.17%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 552),
  ('salts', 54.2000, '54.2', 0.542400, '54.24%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 553),
  ('salts', 54.3000, '54.3', 0.543200, '54.32%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 554),
  ('salts', 54.4000, '54.4', 0.544000, '54.40%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 555),
  ('salts', 54.5000, '54.5', 0.544700, '54.47%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 556),
  ('salts', 54.6000, '54.6', 0.545500, '54.55%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 557),
  ('salts', 54.7000, '54.7', 0.546300, '54.63%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 558),
  ('salts', 54.8000, '54.8', 0.547000, '54.70%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 559),
  ('salts', 54.9000, '54.9', 0.547800, '54.78%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 560),
  ('salts', 55.0000, '55', 0.548500, '54.85%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 561),
  ('salts', 55.1000, '55.1', 0.549300, '54.93%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 562),
  ('salts', 55.2000, '55.2', 0.550100, '55.01%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 563),
  ('salts', 55.3000, '55.3', 0.550800, '55.08%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 564),
  ('salts', 55.4000, '55.4', 0.551600, '55.16%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 565),
  ('salts', 55.5000, '55.5', 0.552400, '55.24%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 566),
  ('salts', 55.6000, '55.6', 0.553100, '55.31%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 567),
  ('salts', 55.7000, '55.7', 0.553900, '55.39%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 568),
  ('salts', 55.8000, '55.8', 0.554700, '55.47%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 569),
  ('salts', 55.9000, '55.9', 0.555400, '55.54%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 570),
  ('salts', 56.0000, '56', 0.556200, '55.62%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 571),
  ('salts', 56.1000, '56.1', 0.556900, '55.69%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 572),
  ('salts', 56.2000, '56.2', 0.557700, '55.77%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 573),
  ('salts', 56.3000, '56.3', 0.558500, '55.85%', 0.000800, '0.08%', 'Reading Tables v1.csv', 'v1', 574),
  ('salts', 56.4000, '56.4', 0.560000, '56%', 0.001500, '0.15%', 'Reading Tables v1.csv', 'v1', 575),
  ('salts', 56.5000, '56.5', 0.561200, '56.12%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 576),
  ('salts', 56.6000, '56.6', 0.562500, '56.25%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 577),
  ('salts', 56.7000, '56.7', 0.563700, '56.37%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 578),
  ('salts', 56.8000, '56.8', 0.565000, '56.50%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 579),
  ('salts', 56.9000, '56.9', 0.566200, '56.62%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 580),
  ('salts', 57.0000, '57', 0.567500, '56.75%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 581),
  ('salts', 57.1000, '57.1', 0.568700, '56.87%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 582),
  ('salts', 57.2000, '57.2', 0.570000, '57.00%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 583),
  ('salts', 57.3000, '57.3', 0.571200, '57.12%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 584),
  ('salts', 57.4000, '57.4', 0.572500, '57.25%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 585),
  ('salts', 57.5000, '57.5', 0.573700, '57.37%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 586),
  ('salts', 57.6000, '57.6', 0.575000, '57.50%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 587),
  ('salts', 57.7000, '57.7', 0.576200, '57.62%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 588),
  ('salts', 57.8000, '57.8', 0.577400, '57.74%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 589),
  ('salts', 57.9000, '57.9', 0.578700, '57.87%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 590),
  ('salts', 58.0000, '58', 0.579900, '57.99%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 591),
  ('salts', 58.1000, '58.1', 0.581200, '58.12%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 592),
  ('salts', 58.2000, '58.2', 0.582400, '58.24%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 593),
  ('salts', 58.3000, '58.3', 0.583700, '58.37%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 594),
  ('salts', 58.4000, '58.4', 0.584900, '58.49%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 595),
  ('salts', 58.5000, '58.5', 0.586200, '58.62%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 596),
  ('salts', 58.6000, '58.6', 0.587400, '58.74%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 597),
  ('salts', 58.7000, '58.7', 0.588700, '58.87%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 598),
  ('salts', 58.8000, '58.8', 0.589900, '58.99%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 599),
  ('salts', 58.9000, '58.9', 0.591200, '59.12%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 600),
  ('salts', 59.0000, '59', 0.592400, '59.24%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 601),
  ('salts', 59.1000, '59.1', 0.593600, '59.36%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 602),
  ('salts', 59.2000, '59.2', 0.594900, '59.49%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 603),
  ('salts', 59.3000, '59.3', 0.596100, '59.61%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 604),
  ('salts', 59.4000, '59.4', 0.597400, '59.74%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 605),
  ('salts', 59.5000, '59.5', 0.598600, '59.86%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 606),
  ('salts', 59.6000, '59.6', 0.599900, '59.99%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 607),
  ('salts', 59.7000, '59.7', 0.601100, '60.11%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 608),
  ('salts', 59.8000, '59.8', 0.602400, '60.24%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 609),
  ('salts', 59.9000, '59.9', 0.603600, '60.36%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 610),
  ('salts', 60.0000, '60', 0.604900, '60.49%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 611),
  ('salts', 60.1000, '60.1', 0.606100, '60.61%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 612),
  ('salts', 60.2000, '60.2', 0.607400, '60.74%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 613),
  ('salts', 60.3000, '60.3', 0.608600, '60.86%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 614),
  ('salts', 60.4000, '60.4', 0.609800, '60.98%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 615),
  ('salts', 60.5000, '60.5', 0.611100, '61.11%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 616),
  ('salts', 60.6000, '60.6', 0.612300, '61.23%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 617),
  ('salts', 60.7000, '60.7', 0.613600, '61.36%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 618),
  ('salts', 60.8000, '60.8', 0.614800, '61.48%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 619),
  ('salts', 60.9000, '60.9', 0.616100, '61.61%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 620),
  ('salts', 61.0000, '61', 0.617300, '61.73%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 621),
  ('salts', 61.1000, '61.1', 0.618600, '61.86%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 622),
  ('salts', 61.2000, '61.2', 0.619800, '61.98%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 623),
  ('salts', 61.3000, '61.3', 0.621100, '62.11%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 624),
  ('salts', 61.4000, '61.4', 0.622300, '62.23%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 625),
  ('salts', 61.5000, '61.5', 0.623600, '62.36%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 626),
  ('salts', 61.6000, '61.6', 0.624800, '62.48%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 627),
  ('salts', 61.7000, '61.7', 0.626000, '62.60%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 628),
  ('salts', 61.8000, '61.8', 0.627300, '62.73%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 629),
  ('salts', 61.9000, '61.9', 0.628500, '62.85%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 630),
  ('salts', 62.0000, '62', 0.629800, '62.98%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 631),
  ('salts', 62.1000, '62.1', 0.631000, '63.10%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 632),
  ('salts', 62.2000, '62.2', 0.632300, '63.23%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 633),
  ('salts', 62.3000, '62.3', 0.633500, '63.35%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 634),
  ('salts', 62.4000, '62.4', 0.634800, '63.48%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 635),
  ('salts', 62.5000, '62.5', 0.636000, '63.60%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 636),
  ('salts', 62.6000, '62.6', 0.637300, '63.73%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 637),
  ('salts', 62.7000, '62.7', 0.638500, '63.85%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 638),
  ('salts', 62.8000, '62.8', 0.639800, '63.98%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 639),
  ('salts', 62.9000, '62.9', 0.641000, '64.10%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 640),
  ('salts', 63.0000, '63', 0.642200, '64.22%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 641),
  ('salts', 63.1000, '63.1', 0.643500, '64.35%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 642),
  ('salts', 63.2000, '63.2', 0.644700, '64.47%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 643),
  ('salts', 63.3000, '63.3', 0.646000, '64.60%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 644),
  ('salts', 63.4000, '63.4', 0.647200, '64.72%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 645),
  ('salts', 63.5000, '63.5', 0.648500, '64.85%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 646),
  ('salts', 63.6000, '63.6', 0.649700, '64.97%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 647),
  ('salts', 63.7000, '63.7', 0.651000, '65.10%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 648),
  ('salts', 63.8000, '63.8', 0.652200, '65.22%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 649),
  ('salts', 63.9000, '63.9', 0.653500, '65.35%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 650),
  ('salts', 64.0000, '64', 0.654700, '65.47%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 651),
  ('salts', 64.1000, '64.1', 0.656000, '65.60%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 652),
  ('salts', 64.2000, '64.2', 0.657200, '65.72%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 653),
  ('salts', 64.3000, '64.3', 0.658400, '65.84%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 654),
  ('salts', 64.4000, '64.4', 0.659700, '65.97%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 655),
  ('salts', 64.5000, '64.5', 0.660900, '66.09%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 656),
  ('salts', 64.6000, '64.6', 0.662200, '66.22%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 657),
  ('salts', 64.7000, '64.7', 0.663400, '66.34%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 658),
  ('salts', 64.8000, '64.8', 0.664700, '66.47%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 659),
  ('salts', 64.9000, '64.9', 0.665900, '66.59%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 660),
  ('salts', 65.0000, '65', 0.667200, '66.72%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 661),
  ('salts', 65.1000, '65.1', 0.668400, '66.84%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 662),
  ('salts', 65.2000, '65.2', 0.669700, '66.97%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 663),
  ('salts', 65.3000, '65.3', 0.670900, '67.09%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 664),
  ('salts', 65.4000, '65.4', 0.672100, '67.21%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 665),
  ('salts', 65.5000, '65.5', 0.673400, '67.34%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 666),
  ('salts', 65.6000, '65.6', 0.674600, '67.46%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 667),
  ('salts', 65.7000, '65.7', 0.675900, '67.59%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 668),
  ('salts', 65.8000, '65.8', 0.677100, '67.71%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 669),
  ('salts', 65.9000, '65.9', 0.678400, '67.84%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 670),
  ('salts', 66.0000, '66', 0.679600, '67.96%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 671),
  ('salts', 66.1000, '66.1', 0.680900, '68.09%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 672),
  ('salts', 66.2000, '66.2', 0.682100, '68.21%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 673),
  ('salts', 66.3000, '66.3', 0.683400, '68.34%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 674),
  ('salts', 66.4000, '66.4', 0.684600, '68.46%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 675),
  ('salts', 66.5000, '66.5', 0.685900, '68.59%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 676),
  ('salts', 66.6000, '66.6', 0.687100, '68.71%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 677),
  ('salts', 66.7000, '66.7', 0.688300, '68.83%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 678),
  ('salts', 66.8000, '66.8', 0.689600, '68.96%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 679),
  ('salts', 66.9000, '66.9', 0.690800, '69.08%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 680),
  ('salts', 67.0000, '67', 0.692100, '69.21%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 681),
  ('salts', 67.1000, '67.1', 0.693300, '69.33%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 682),
  ('salts', 67.2000, '67.2', 0.694600, '69.46%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 683),
  ('salts', 67.3000, '67.3', 0.695800, '69.58%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 684),
  ('salts', 67.4000, '67.4', 0.697100, '69.71%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 685),
  ('salts', 67.5000, '67.5', 0.698300, '69.83%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 686),
  ('salts', 67.6000, '67.6', 0.699600, '69.96%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 687),
  ('salts', 67.7000, '67.7', 0.700800, '70.08%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 688),
  ('salts', 67.8000, '67.8', 0.702100, '70.21%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 689),
  ('salts', 67.9000, '67.9', 0.703300, '70.33%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 690),
  ('salts', 68.0000, '68', 0.704500, '70.45%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 691),
  ('salts', 68.1000, '68.1', 0.705800, '70.58%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 692),
  ('salts', 68.2000, '68.2', 0.707000, '70.70%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 693),
  ('salts', 68.3000, '68.3', 0.708300, '70.83%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 694),
  ('salts', 68.4000, '68.4', 0.709500, '70.95%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 695),
  ('salts', 68.5000, '68.5', 0.710800, '71.08%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 696),
  ('salts', 68.6000, '68.6', 0.712000, '71.20%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 697),
  ('salts', 68.7000, '68.7', 0.713300, '71.33%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 698),
  ('salts', 68.8000, '68.8', 0.714500, '71.45%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 699),
  ('salts', 68.9000, '68.9', 0.715800, '71.58%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 700),
  ('salts', 69.0000, '69', 0.717000, '71.70%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 701),
  ('salts', 69.1000, '69.1', 0.718300, '71.83%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 702),
  ('salts', 69.2000, '69.2', 0.719500, '71.95%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 703),
  ('salts', 69.3000, '69.3', 0.720700, '72.07%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 704),
  ('salts', 69.4000, '69.4', 0.722000, '72.20%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 705),
  ('salts', 69.5000, '69.5', 0.723200, '72.32%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 706),
  ('salts', 69.6000, '69.6', 0.724500, '72.45%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 707),
  ('salts', 69.7000, '69.7', 0.725700, '72.57%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 708),
  ('salts', 69.8000, '69.8', 0.727000, '72.70%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 709),
  ('salts', 69.9000, '69.9', 0.728200, '72.82%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 710),
  ('salts', 70.0000, '70', 0.729500, '72.95%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 711),
  ('salts', 70.1000, '70.1', 0.730700, '73.07%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 712),
  ('salts', 70.2000, '70.2', 0.732000, '73.20%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 713),
  ('salts', 70.3000, '70.3', 0.733200, '73.32%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 714),
  ('salts', 70.4000, '70.4', 0.734500, '73.45%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 715),
  ('salts', 70.5000, '70.5', 0.735700, '73.57%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 716),
  ('salts', 70.6000, '70.6', 0.736900, '73.69%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 717),
  ('salts', 70.7000, '70.7', 0.738200, '73.82%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 718),
  ('salts', 70.8000, '70.8', 0.739400, '73.94%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 719),
  ('salts', 70.9000, '70.9', 0.740700, '74.07%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 720),
  ('salts', 71.0000, '71', 0.741900, '74.19%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 721),
  ('salts', 71.1000, '71.1', 0.743200, '74.32%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 722),
  ('salts', 71.2000, '71.2', 0.744400, '74.44%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 723),
  ('salts', 71.3000, '71.3', 0.745700, '74.57%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 724),
  ('salts', 71.4000, '71.4', 0.746900, '74.69%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 725),
  ('salts', 71.5000, '71.5', 0.748200, '74.82%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 726),
  ('salts', 71.6000, '71.6', 0.749400, '74.94%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 727),
  ('salts', 71.7000, '71.7', 0.750700, '75.07%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 728),
  ('salts', 71.8000, '71.8', 0.751900, '75.19%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 729),
  ('salts', 71.9000, '71.9', 0.753100, '75.31%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 730),
  ('salts', 72.0000, '72', 0.754400, '75.44%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 731),
  ('salts', 72.1000, '72.1', 0.755600, '75.56%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 732),
  ('salts', 72.2000, '72.2', 0.756900, '75.69%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 733),
  ('salts', 72.3000, '72.3', 0.758100, '75.81%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 734),
  ('salts', 72.4000, '72.4', 0.759400, '75.94%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 735),
  ('salts', 72.5000, '72.5', 0.760600, '76.06%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 736),
  ('salts', 72.6000, '72.6', 0.761900, '76.19%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 737),
  ('salts', 72.7000, '72.7', 0.763100, '76.31%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 738),
  ('salts', 72.8000, '72.8', 0.764400, '76.44%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 739),
  ('salts', 72.9000, '72.9', 0.765600, '76.56%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 740),
  ('salts', 73.0000, '73', 0.766900, '76.69%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 741),
  ('salts', 73.1000, '73.1', 0.768100, '76.81%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 742),
  ('salts', 73.2000, '73.2', 0.769300, '76.93%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 743),
  ('salts', 73.3000, '73.3', 0.770600, '77.06%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 744),
  ('salts', 73.4000, '73.4', 0.771800, '77.18%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 745),
  ('salts', 73.5000, '73.5', 0.773100, '77.31%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 746),
  ('salts', 73.6000, '73.6', 0.774300, '77.43%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 747),
  ('salts', 73.7000, '73.7', 0.775600, '77.56%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 748),
  ('salts', 73.8000, '73.8', 0.776800, '77.68%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 749),
  ('salts', 73.9000, '73.9', 0.778100, '77.81%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 750),
  ('salts', 74.0000, '74', 0.779300, '77.93%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 751),
  ('salts', 74.1000, '74.1', 0.780600, '78.06%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 752),
  ('salts', 74.2000, '74.2', 0.781800, '78.18%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 753),
  ('salts', 74.3000, '74.3', 0.783100, '78.31%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 754),
  ('salts', 74.4000, '74.4', 0.784300, '78.43%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 755),
  ('salts', 74.5000, '74.5', 0.785500, '78.55%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 756),
  ('salts', 74.6000, '74.6', 0.786800, '78.68%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 757),
  ('salts', 74.7000, '74.7', 0.788000, '78.80%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 758),
  ('salts', 74.8000, '74.8', 0.789300, '78.93%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 759),
  ('salts', 74.9000, '74.9', 0.790500, '79.05%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 760),
  ('salts', 75.0000, '75', 0.791800, '79.18%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 761),
  ('salts', 75.1000, '75.1', 0.793000, '79.30%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 762),
  ('salts', 75.2000, '75.2', 0.794300, '79.43%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 763),
  ('salts', 75.3000, '75.3', 0.795500, '79.55%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 764),
  ('salts', 75.4000, '75.4', 0.796800, '79.68%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 765),
  ('salts', 75.5000, '75.5', 0.798000, '79.80%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 766),
  ('salts', 75.6000, '75.6', 0.799300, '79.93%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 767),
  ('salts', 75.7000, '75.7', 0.800500, '80.05%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 768),
  ('salts', 75.8000, '75.8', 0.801700, '80.17%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 769),
  ('salts', 75.9000, '75.9', 0.803000, '80.30%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 770),
  ('salts', 76.0000, '76', 0.804200, '80.42%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 771),
  ('salts', 76.1000, '76.1', 0.805500, '80.55%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 772),
  ('salts', 76.2000, '76.2', 0.806700, '80.67%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 773),
  ('salts', 76.3000, '76.3', 0.808000, '80.80%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 774),
  ('salts', 76.4000, '76.4', 0.809200, '80.92%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 775),
  ('salts', 76.5000, '76.5', 0.810500, '81.05%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 776),
  ('salts', 76.6000, '76.6', 0.811700, '81.17%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 777),
  ('salts', 76.7000, '76.7', 0.813000, '81.30%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 778),
  ('salts', 76.8000, '76.8', 0.814200, '81.42%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 779),
  ('salts', 76.9000, '76.9', 0.815500, '81.55%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 780),
  ('salts', 77.0000, '77', 0.816700, '81.67%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 781),
  ('salts', 77.1000, '77.1', 0.817900, '81.79%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 782),
  ('salts', 77.2000, '77.2', 0.819200, '81.92%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 783),
  ('salts', 77.3000, '77.3', 0.820400, '82.04%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 784),
  ('salts', 77.4000, '77.4', 0.821700, '82.17%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 785),
  ('salts', 77.5000, '77.5', 0.822900, '82.29%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 786),
  ('salts', 77.6000, '77.6', 0.824200, '82.42%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 787),
  ('salts', 77.7000, '77.7', 0.825400, '82.54%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 788),
  ('salts', 77.8000, '77.8', 0.826700, '82.67%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 789),
  ('salts', 77.9000, '77.9', 0.827900, '82.79%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 790),
  ('salts', 78.0000, '78', 0.829200, '82.92%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 791),
  ('salts', 78.1000, '78.1', 0.830400, '83.04%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 792),
  ('salts', 78.2000, '78.2', 0.831700, '83.17%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 793),
  ('salts', 78.3000, '78.3', 0.832900, '83.29%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 794),
  ('salts', 78.4000, '78.4', 0.834100, '83.41%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 795),
  ('salts', 78.5000, '78.5', 0.835400, '83.54%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 796),
  ('salts', 78.6000, '78.6', 0.836600, '83.66%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 797),
  ('salts', 78.7000, '78.7', 0.837900, '83.79%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 798),
  ('salts', 78.8000, '78.8', 0.839100, '83.91%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 799),
  ('salts', 78.9000, '78.9', 0.840400, '84.04%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 800),
  ('salts', 79.0000, '79', 0.841600, '84.16%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 801),
  ('salts', 79.1000, '79.1', 0.842900, '84.29%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 802),
  ('salts', 79.2000, '79.2', 0.844100, '84.41%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 803),
  ('salts', 79.3000, '79.3', 0.845400, '84.54%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 804),
  ('salts', 79.4000, '79.4', 0.846600, '84.66%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 805),
  ('salts', 79.5000, '79.5', 0.847900, '84.79%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 806),
  ('salts', 79.6000, '79.6', 0.849100, '84.91%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 807),
  ('salts', 79.7000, '79.7', 0.850300, '85.03%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 808),
  ('salts', 79.8000, '79.8', 0.851600, '85.16%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 809),
  ('salts', 79.9000, '79.9', 0.852800, '85.28%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 810),
  ('salts', 80.0000, '80', 0.854100, '85.41%', 0.001300, '0.13%', 'Reading Tables v1.csv', 'v1', 811)
on conflict (lookup_type, exact_reading, source_version) do update
set
  exact_reading_text = excluded.exact_reading_text,
  loss_fraction = excluded.loss_fraction,
  loss_percent_text = excluded.loss_percent_text,
  increment_fraction = excluded.increment_fraction,
  increment_percent_text = excluded.increment_percent_text,
  source_document = excluded.source_document,
  source_row_number = excluded.source_row_number;

-- <<< END 0009_biochemistry_test_data_model.sql

-- >>> BEGIN 0010_secure_helper_execution.sql
-- Restrict application-owned SECURITY DEFINER helpers to authenticated callers.
alter function public.current_app_user_id() set search_path = pg_catalog, public;
alter function public.has_permission(text) set search_path = pg_catalog, public;
alter function public.is_admin() set search_path = pg_catalog, public;
alter function public.current_member_profile_id() set search_path = pg_catalog, public;
alter function public.can_access_horse(uuid) set search_path = pg_catalog, public;
alter function public.can_manage_horse_records(uuid) set search_path = pg_catalog, public;
alter function public.has_stable_scope(uuid) set search_path = pg_catalog, public;
alter function public.can_write_stable_scope(uuid) set search_path = pg_catalog, public;
alter function public.can_read_biochemistry_horse(uuid) set search_path = pg_catalog, public;
alter function public.can_write_biochemistry_horse(uuid) set search_path = pg_catalog, public;
alter function public.can_soft_delete_biochemistry_horse(uuid) set search_path = pg_catalog, public;
revoke execute on function public.current_app_user_id() from public, anon;
revoke execute on function public.has_permission(text) from public, anon;
revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.current_member_profile_id() from public, anon;
revoke execute on function public.can_access_horse(uuid) from public, anon;
revoke execute on function public.can_manage_horse_records(uuid) from public, anon;
revoke execute on function public.has_stable_scope(uuid) from public, anon;
revoke execute on function public.can_write_stable_scope(uuid) from public, anon;
revoke execute on function public.can_read_biochemistry_horse(uuid) from public, anon;
revoke execute on function public.can_write_biochemistry_horse(uuid) from public, anon;
revoke execute on function public.can_soft_delete_biochemistry_horse(uuid) from public, anon;
grant execute on function public.current_app_user_id() to authenticated;
grant execute on function public.has_permission(text) to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.current_member_profile_id() to authenticated;
grant execute on function public.can_access_horse(uuid) to authenticated;
grant execute on function public.can_manage_horse_records(uuid) to authenticated;
grant execute on function public.has_stable_scope(uuid) to authenticated;
grant execute on function public.can_write_stable_scope(uuid) to authenticated;
grant execute on function public.can_read_biochemistry_horse(uuid) to authenticated;
grant execute on function public.can_write_biochemistry_horse(uuid) to authenticated;
grant execute on function public.can_soft_delete_biochemistry_horse(uuid) to authenticated;

-- <<< END 0010_secure_helper_execution.sql

-- >>> BEGIN 0011_definitive_role_matrix_and_comments.sql
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

-- <<< END 0011_definitive_role_matrix_and_comments.sql

-- >>> BEGIN 0012_role_lifecycle_policy_hardening.sql
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

-- <<< END 0012_role_lifecycle_policy_hardening.sql
