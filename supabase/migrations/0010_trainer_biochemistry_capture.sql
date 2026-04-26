create table if not exists public.horse_gallery_items (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  image_url text not null,
  caption text,
  taken_at timestamptz,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_horse_gallery_items_horse_id
  on public.horse_gallery_items (horse_id);

create table if not exists public.horse_biochemistry_results (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  daily_record_id uuid references public.daily_records(id) on delete set null,
  sampled_at timestamptz not null default now(),
  sample_type text not null default 'urine_saliva',
  health_score numeric(10,2),
  hydration_litres numeric(10,2),
  hydration_score numeric(10,2),
  electrolyte_score numeric(10,2),
  recovery_score numeric(10,2),
  carbs_percentage numeric(10,2),
  salts_ms numeric(10,2),
  salts_c numeric(10,2) generated always as (
    case
      when salts_ms is null then null
      else round((salts_ms * 1.43)::numeric, 2)
    end
  ) stored,
  urine_ph numeric(10,2),
  saliva_ph numeric(10,2),
  urea_level numeric(10,2),
  blue_square_score numeric(10,2),
  notes text,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_horse_biochemistry_results_horse_id_sampled_at
  on public.horse_biochemistry_results (horse_id, sampled_at desc);

alter table public.horse_gallery_items enable row level security;
alter table public.horse_biochemistry_results enable row level security;

create policy "horses_update_trainers_or_admin"
on public.horses
for update
using (
  public.is_admin()
  or public.can_manage_horse_records(id)
)
with check (
  public.is_admin()
  or public.can_manage_horse_records(id)
);

create policy "horse_gallery_items_select_accessible"
on public.horse_gallery_items
for select
using (public.can_access_horse(horse_id));

create policy "horse_gallery_items_insert_manageable"
on public.horse_gallery_items
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "horse_gallery_items_update_manageable"
on public.horse_gallery_items
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "horse_gallery_items_delete_manageable"
on public.horse_gallery_items
for delete
using (public.can_manage_horse_records(horse_id) or public.is_admin());

create policy "horse_biochemistry_results_select_accessible"
on public.horse_biochemistry_results
for select
using (public.can_access_horse(horse_id));

create policy "horse_biochemistry_results_insert_manageable"
on public.horse_biochemistry_results
for insert
with check (public.can_manage_horse_records(horse_id));

create policy "horse_biochemistry_results_update_manageable"
on public.horse_biochemistry_results
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

create policy "horse_biochemistry_results_delete_manageable"
on public.horse_biochemistry_results
for delete
using (public.can_manage_horse_records(horse_id) or public.is_admin());
