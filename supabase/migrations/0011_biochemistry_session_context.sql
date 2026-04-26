alter table public.horse_biochemistry_results
  add column if not exists weight_kg numeric(10,2),
  add column if not exists training_session text,
  add column if not exists horse_attitude text,
  add column if not exists jockey_comments text;
