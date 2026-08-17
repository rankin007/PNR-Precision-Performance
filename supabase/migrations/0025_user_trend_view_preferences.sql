-- Sprint 028B - self-only saved longitudinal trend view preferences.

create table if not exists public.user_trend_view_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  label text not null,
  score_view text not null default 'both' check (score_view in ('none', 'hydration', 'biochemistry', 'both')),
  ph_view text not null default 'both' check (ph_view in ('none', 'urine', 'saliva', 'both')),
  show_carbohydrate boolean not null default false,
  show_conductivity boolean not null default false,
  time_filter text not null default 'both' check (time_filter in ('am', 'pm', 'both', 'all')),
  range_days integer not null default 90 check (range_days in (30, 90, 365)),
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_trend_view_preferences_label_check check (
    label = btrim(label) and char_length(label) between 1 and 40
  ),
  constraint user_trend_view_preferences_group_count_check check (
    (
      case when score_view <> 'none' then 1 else 0 end
      + case when ph_view <> 'none' then 1 else 0 end
      + case when show_carbohydrate then 1 else 0 end
      + case when show_conductivity then 1 else 0 end
    ) between 1 and 2
  )
);

create unique index if not exists idx_user_trend_view_preferences_owner_label
  on public.user_trend_view_preferences (user_id, lower(label));
create unique index if not exists idx_user_trend_view_preferences_one_default
  on public.user_trend_view_preferences (user_id) where is_default;
create index if not exists idx_user_trend_view_preferences_owner_updated
  on public.user_trend_view_preferences (user_id, updated_at desc, id);

create or replace function public.touch_user_trend_view_preference_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end
$$;

drop trigger if exists user_trend_view_preferences_touch_updated_at on public.user_trend_view_preferences;
create trigger user_trend_view_preferences_touch_updated_at
before update on public.user_trend_view_preferences
for each row execute function public.touch_user_trend_view_preference_updated_at();

alter table public.user_trend_view_preferences enable row level security;

create policy "user_trend_view_preferences_select_self_active"
on public.user_trend_view_preferences for select
using (
  user_id = public.current_app_user_id()
  and public.is_active_app_user()
);

create policy "user_trend_view_preferences_insert_self_active"
on public.user_trend_view_preferences for insert
with check (
  user_id = public.current_app_user_id()
  and public.is_active_app_user()
);

create policy "user_trend_view_preferences_update_self_active"
on public.user_trend_view_preferences for update
using (
  user_id = public.current_app_user_id()
  and public.is_active_app_user()
)
with check (
  user_id = public.current_app_user_id()
  and public.is_active_app_user()
);

create policy "user_trend_view_preferences_delete_self_active"
on public.user_trend_view_preferences for delete
using (
  user_id = public.current_app_user_id()
  and public.is_active_app_user()
);

create or replace function public.set_default_biochemistry_trend_preference(target_preference_id uuid)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  actor_user_id uuid;
begin
  select u.id
    into actor_user_id
  from public.users u
  where u.id = public.current_app_user_id()
    and u.status = 'active'
  for update;

  if actor_user_id is null then
    return false;
  end if;

  perform 1
  from public.user_trend_view_preferences p
  where p.id = target_preference_id
    and p.user_id = actor_user_id
  for update;

  if not found then
    return false;
  end if;

  update public.user_trend_view_preferences
    set is_default = false
  where user_id = actor_user_id
    and is_default;

  update public.user_trend_view_preferences
    set is_default = true
  where id = target_preference_id
    and user_id = actor_user_id;

  return found;
end
$$;

revoke all on table public.user_trend_view_preferences from public, anon;
grant select, insert, update, delete on table public.user_trend_view_preferences to authenticated;

revoke execute on function public.touch_user_trend_view_preference_updated_at() from public, anon, authenticated;
revoke execute on function public.set_default_biochemistry_trend_preference(uuid) from public, anon;
grant execute on function public.set_default_biochemistry_trend_preference(uuid) to authenticated;
