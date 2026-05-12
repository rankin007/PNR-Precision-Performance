alter table public.etrakka_sessions
  add column if not exists session_day_label text,
  add column if not exists session_start_time_text text,
  add column if not exists trainer_name text,
  add column if not exists source_view_html text,
  add column if not exists source_session_key text;

create index if not exists idx_etrakka_sessions_trainer_name
  on public.etrakka_sessions (trainer_name);

create index if not exists idx_etrakka_sessions_source_session_key
  on public.etrakka_sessions (source_session_key);
