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
    'Professional Kit',
    'professional-kit',
    'Professional Urine and Saliva Analysis BE Kit with certified instruments, onboarding, protocols, and in-house setup support.',
    'PNR-PK-001',
    2500.00,
    'AUD',
    'active'
  ),
  (
    (select id from category_map where slug = 'performance-services'),
    'Monthly Service',
    'monthly-performance-service',
    'Monthly elite equine performance monitoring service with unlimited testing, weekly reporting, and supplement guidance per horse.',
    'PNR-MS-001',
    600.00,
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
