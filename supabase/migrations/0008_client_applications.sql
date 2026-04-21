-- Migration to add client onboarding tracking

create table if not exists public.client_applications (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  business_name text,
  stable_address text not null,
  direct_email text not null,
  admin_email text,
  mobile_number text not null,
  status text not null default 'pending_email_verification',
  confirmation_token uuid default gen_random_uuid(),
  email_verified_at timestamptz,
  disclaimer_agreed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS and add basic policies
alter table public.client_applications enable row level security;

-- Allow anonymous submissions (public endpoint)
create policy "Allow anonymous inserts to client_applications"
  on public.client_applications
  for insert
  to public
  with check (true);

-- Allow server action / service role to read/update
create policy "Allow service role full access to client_applications"
  on public.client_applications
  for all
  using (true)
  with check (true);
