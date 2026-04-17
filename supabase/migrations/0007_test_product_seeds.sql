insert into public.product_categories (name, slug, description, is_active)
values
  (
    'Performance Services',
    'performance-services',
    'Structured performance review and reporting products for racehorse operations.',
    true
  ),
  (
    'Operations Resources',
    'operations-resources',
    'Operational support resources for stables, staff, and reporting workflows.',
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  is_active = excluded.is_active,
  updated_at = now();

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
    'Performance Review Pack',
    'performance-review-pack',
    'Structured review pack for owners and trainers with racehorse performance context and reporting support.',
    'PNR-PRP-001',
    149.00,
    'AUD',
    'active'
  ),
  (
    (select id from category_map where slug = 'performance-services'),
    'Biochemistry Reporting Bundle',
    'biochemistry-reporting-bundle',
    'Biochemistry interpretation and reporting support for owners, trainers, and advisory workflows.',
    'PNR-BRB-001',
    249.00,
    'AUD',
    'active'
  ),
  (
    (select id from category_map where slug = 'operations-resources'),
    'Stable Operations Toolkit',
    'stable-operations-toolkit',
    'Operational templates and structured reporting support for stable workflows and administration.',
    'PNR-SOT-001',
    89.00,
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
