-- Launch membership and permission seed shape.
-- This migration is additive and idempotent. It updates launch labels and
-- ensures the required membership/permission mappings exist without deleting
-- existing production assignments or custom permission mappings.

insert into public.permissions (code, name, description, scope)
values
  ('platform.admin', 'Platform Admin', 'Full administrative access to the platform.', 'admin'),
  ('stable.staff.read', 'Stable Staff Read', 'Read access to stable-scoped operational data.', 'stable'),
  ('stable.staff.write', 'Stable Staff Write', 'Write access to stable-scoped operational data.', 'stable'),
  ('horse.records.write', 'Horse Records Write', 'Create and update horse operational records.', 'horse'),
  ('commerce.finance', 'Commerce Finance', 'Access finance, orders, products, payments, and checkout reconciliation visibility.', 'commerce'),
  ('membership.manage', 'Membership Manage', 'Manage membership levels, assignments, and permissions.', 'membership')
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  scope = excluded.scope;

insert into public.membership_levels (code, name, description, is_paid, is_custom, sort_order)
values
  (
    'public',
    'Public',
    'Public-facing baseline for unauthenticated and non-member experiences. This level should not be assigned for portal access.',
    false,
    false,
    10
  ),
  (
    'owner',
    'Owner / Read-Only Member',
    'Active owner or read-only member access. Portal access is limited by assigned-horse RLS and does not include operational write permission.',
    false,
    false,
    20
  ),
  (
    'trainer',
    'Trainer / Record Writer',
    'Active trainer access with assigned-horse portal access and horse operational record write permission.',
    false,
    false,
    30
  ),
  (
    'stable-staff',
    'Stable Staff',
    'Operational staff access scoped through stable staff assignments, with stable read/write and horse record write permissions.',
    false,
    false,
    40
  ),
  (
    'staff',
    'Staff (Legacy Alias)',
    'Backward-compatible staff level retained for existing assignments; use stable-staff for new launch assignments.',
    false,
    false,
    45
  ),
  (
    'commerce-admin',
    'Commerce Admin',
    'Commerce operator access for products, orders, payments, and checkout reconciliation visibility without full platform administration.',
    false,
    false,
    50
  ),
  (
    'membership-admin',
    'Membership Admin',
    'Membership operator access for assigning and managing member levels without full platform administration.',
    false,
    false,
    60
  ),
  (
    'admin',
    'Platform Admin',
    'Full platform administration for launch operations, membership management, stable operations, and commerce visibility.',
    false,
    false,
    70
  )
on conflict (code) do update
set
  name = excluded.name,
  description = excluded.description,
  is_paid = excluded.is_paid,
  is_custom = excluded.is_custom,
  sort_order = excluded.sort_order,
  updated_at = now();

with mapping(level_code, permission_code) as (
  values
    ('trainer', 'horse.records.write'),
    ('stable-staff', 'stable.staff.read'),
    ('stable-staff', 'stable.staff.write'),
    ('stable-staff', 'horse.records.write'),
    ('staff', 'stable.staff.read'),
    ('staff', 'stable.staff.write'),
    ('staff', 'horse.records.write'),
    ('commerce-admin', 'commerce.finance'),
    ('membership-admin', 'membership.manage'),
    ('admin', 'platform.admin'),
    ('admin', 'stable.staff.read'),
    ('admin', 'stable.staff.write'),
    ('admin', 'horse.records.write'),
    ('admin', 'commerce.finance'),
    ('admin', 'membership.manage')
)
insert into public.membership_level_permissions (membership_level_id, permission_id)
select ml.id, p.id
from mapping m
join public.membership_levels ml on ml.code = m.level_code
join public.permissions p on p.code = m.permission_code
on conflict (membership_level_id, permission_id) do nothing;
