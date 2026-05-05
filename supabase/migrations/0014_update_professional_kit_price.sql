update public.products
set
  price_amount = 3500.00,
  updated_at = timezone('utc'::text, now())
where slug = 'professional-kit';
