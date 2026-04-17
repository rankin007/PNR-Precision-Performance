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

create policy "membership_levels_admin_manage"
on public.membership_levels
for all
using (public.is_admin())
with check (public.is_admin());

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

