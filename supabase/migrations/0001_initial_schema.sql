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
