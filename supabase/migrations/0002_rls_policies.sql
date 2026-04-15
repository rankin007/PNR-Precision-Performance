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
