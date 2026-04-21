drop policy if exists "Allow service role full access to client_applications"
  on public.client_applications;

create policy "Allow service role full access to client_applications"
  on public.client_applications
  for all
  to service_role
  using (true)
  with check (true);
