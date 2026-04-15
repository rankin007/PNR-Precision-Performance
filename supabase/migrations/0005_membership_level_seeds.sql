-- Seed baseline membership levels and permission mappings.

insert into public.membership_levels (code, name, description, is_paid, is_custom, sort_order)
values
  ('public', 'Public', 'Public-facing access level for non-member experiences.', false, false, 10),
  ('owner', 'Owner', 'Owner access to explicitly assigned horses and related records.', false, false, 20),
  ('trainer', 'Trainer', 'Trainer access to horses under active control and operational records.', false, false, 30),
  ('staff', 'Staff', 'Stable-scoped operational staff access.', false, false, 40),
  ('admin', 'Admin', 'Full administrative access to the platform.', false, false, 50)
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  is_paid = excluded.is_paid,
  is_custom = excluded.is_custom,
  sort_order = excluded.sort_order;

insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from public.membership_levels ml
join public.permissions p on p.code in ('horse.records.write')
where ml.code = 'trainer'
on conflict (membership_level_id, permission_id) do nothing;

insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from public.membership_levels ml
join public.permissions p on p.code in ('stable.staff.read', 'stable.staff.write')
where ml.code = 'staff'
on conflict (membership_level_id, permission_id) do nothing;

insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from public.membership_levels ml
join public.permissions p on p.code in (
  'platform.admin',
  'stable.staff.read',
  'stable.staff.write',
  'horse.records.write',
  'commerce.finance',
  'membership.manage'
)
where ml.code = 'admin'
on conflict (membership_level_id, permission_id) do nothing;

