create table if not exists public.etrakka_import_batches (
  id uuid primary key default gen_random_uuid(),
  horse_id uuid not null references public.horses(id) on delete cascade,
  source_file_name text,
  source_file_format text,
  source_url text,
  header_labels jsonb not null default '[]'::jsonb,
  total_rows integer not null default 0,
  imported_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.etrakka_import_rows (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.etrakka_import_batches(id) on delete cascade,
  horse_id uuid not null references public.horses(id) on delete cascade,
  session_id uuid references public.etrakka_sessions(id) on delete set null,
  row_index integer not null,
  source_session_key text,
  session_date timestamptz,
  row_values jsonb not null default '[]'::jsonb,
  raw_payload jsonb not null default '{}'::jsonb,
  import_status text not null default 'pending',
  import_error text,
  created_at timestamptz not null default now(),
  unique (batch_id, row_index)
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'etrakka_import_rows_status_check'
  ) then
    alter table public.etrakka_import_rows
      add constraint etrakka_import_rows_status_check
      check (import_status in ('pending', 'imported', 'duplicate', 'failed'));
  end if;
end
$$;

create index if not exists idx_etrakka_import_batches_horse_id_created_at
  on public.etrakka_import_batches (horse_id, created_at desc);

create index if not exists idx_etrakka_import_rows_batch_id
  on public.etrakka_import_rows (batch_id);

create index if not exists idx_etrakka_import_rows_horse_id_session_date
  on public.etrakka_import_rows (horse_id, session_date desc);

create index if not exists idx_etrakka_import_rows_source_session_key
  on public.etrakka_import_rows (source_session_key);

alter table public.etrakka_import_batches enable row level security;
alter table public.etrakka_import_rows enable row level security;

drop policy if exists "etrakka_import_batches_select_accessible" on public.etrakka_import_batches;
create policy "etrakka_import_batches_select_accessible"
on public.etrakka_import_batches
for select
using (public.can_access_horse(horse_id));

drop policy if exists "etrakka_import_batches_insert_manageable" on public.etrakka_import_batches;
create policy "etrakka_import_batches_insert_manageable"
on public.etrakka_import_batches
for insert
with check (public.can_manage_horse_records(horse_id));

drop policy if exists "etrakka_import_batches_update_manageable" on public.etrakka_import_batches;
create policy "etrakka_import_batches_update_manageable"
on public.etrakka_import_batches
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

drop policy if exists "etrakka_import_batches_delete_manageable" on public.etrakka_import_batches;
create policy "etrakka_import_batches_delete_manageable"
on public.etrakka_import_batches
for delete
using (public.can_manage_horse_records(horse_id) or public.is_admin());

drop policy if exists "etrakka_import_rows_select_accessible" on public.etrakka_import_rows;
create policy "etrakka_import_rows_select_accessible"
on public.etrakka_import_rows
for select
using (public.can_access_horse(horse_id));

drop policy if exists "etrakka_import_rows_insert_manageable" on public.etrakka_import_rows;
create policy "etrakka_import_rows_insert_manageable"
on public.etrakka_import_rows
for insert
with check (public.can_manage_horse_records(horse_id));

drop policy if exists "etrakka_import_rows_update_manageable" on public.etrakka_import_rows;
create policy "etrakka_import_rows_update_manageable"
on public.etrakka_import_rows
for update
using (public.can_manage_horse_records(horse_id))
with check (public.can_manage_horse_records(horse_id));

drop policy if exists "etrakka_import_rows_delete_manageable" on public.etrakka_import_rows;
create policy "etrakka_import_rows_delete_manageable"
on public.etrakka_import_rows
for delete
using (public.can_manage_horse_records(horse_id) or public.is_admin());
