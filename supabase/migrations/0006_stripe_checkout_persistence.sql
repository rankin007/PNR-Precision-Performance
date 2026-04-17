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
