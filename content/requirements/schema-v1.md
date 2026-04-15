# Schema V1

This document defines the initial relational direction for the platform. It is intentionally implementation-ready enough to guide Supabase migrations while still leaving room for field-level refinement in the data dictionary.

## Design Principles

- use Supabase Auth for authentication identities
- keep operational profile data in application tables rather than in auth metadata
- support role-based access through assignable membership levels and permissions
- preserve historical relationships where horse ownership, training, or stable assignment changes over time
- keep high-frequency measurements append-only where practical
- use row-level security from the beginning for member-scoped and horse-scoped data

## Identity and Access

### `users`

Purpose:

- application mirror of the authenticated user

Recommended relationships:

- one-to-one with `auth.users`
- one-to-one with `member_profiles`
- many-to-many with `membership_levels` through `user_membership_levels`

Recommended core fields:

- `id`
- `auth_user_id`
- `email`
- `status`
- `created_at`
- `updated_at`

### `member_profiles`

Purpose:

- extended person or organisation profile information

Recommended relationships:

- belongs to `users`
- may link to `owners`, `trainers`, or future role-specific records

Recommended core fields:

- `id`
- `user_id`
- `display_name`
- `first_name`
- `last_name`
- `phone`
- `organisation_name`
- `avatar_url`
- `is_active`
- `created_at`
- `updated_at`

### `membership_levels`

Purpose:

- configurable access tiers

Recommended core fields:

- `id`
- `code`
- `name`
- `description`
- `is_paid`
- `is_custom`
- `sort_order`
- `created_at`
- `updated_at`

### `permissions`

Purpose:

- fine-grained platform capabilities

Recommended core fields:

- `id`
- `code`
- `name`
- `description`
- `scope`
- `created_at`

### Additional relationship tables recommended for implementation

These are not part of the user-supplied entity list, but they are strongly recommended to make the model workable:

- `user_membership_levels`
- `membership_level_permissions`
- `stable_staff_assignments`

## Equine and Relationship Core

### `horses`

Recommended core fields:

- `id`
- `stable_id`
- `name`
- `slug`
- `sex`
- `date_of_birth`
- `colour`
- `breed`
- `microchip_number`
- `registration_number`
- `status`
- `created_at`
- `updated_at`

### `stables`

Recommended core fields:

- `id`
- `name`
- `code`
- `location`
- `status`
- `created_at`
- `updated_at`

### `trainers`

Recommended direction:

- treat as domain records that should link to `member_profiles` when the trainer has platform access
- allow a trainer record to exist without login access when the trainer is managed operationally but does not access the platform

Recommended core fields:

- `id`
- `member_profile_id`
- `display_name`
- `license_number`
- `phone`
- `email`
- `status`
- `created_at`
- `updated_at`

### `owners`

Recommended direction:

- treat as domain records that should link to `member_profiles` when the owner has platform access
- allow an owner record to exist without login access when the owner is recorded operationally but does not access the platform

Recommended core fields:

- `id`
- `member_profile_id`
- `display_name`
- `ownership_type`
- `phone`
- `email`
- `status`
- `created_at`
- `updated_at`

### `horse_assignments`

Purpose:

- historical mapping between horses and business relationships

Access direction:

- trainer assignment grants trainer visibility to horses under their control
- owner assignment grants owner visibility only to explicitly assigned horses
- owner assignment authority is controlled by trainers or administrators

Recommended core fields:

- `id`
- `horse_id`
- `owner_id`
- `trainer_id`
- `stable_id`
- `assignment_type`
- `access_level`
- `starts_at`
- `ends_at`
- `is_primary`
- `notes`
- `created_at`
- `updated_at`

## Daily Physiological and Operational Data

### `daily_records`

Recommended direction:

- use as the daily parent record for a horse on a given date

Recommended core fields:

- `id`
- `horse_id`
- `record_date`
- `recorded_by_user_id`
- `stable_id`
- `weather_log_id`
- `notes`
- `created_at`
- `updated_at`

Recommended constraint:

- unique on `horse_id` and `record_date`

### `temperature_logs`

Recommended core fields:

- `id`
- `daily_record_id`
- `horse_id`
- `recorded_at`
- `temperature_value`
- `temperature_unit`
- `notes`
- `created_by_user_id`
- `created_at`

### `weight_logs`

Recommended core fields:

- `id`
- `daily_record_id`
- `horse_id`
- `recorded_at`
- `weight_value`
- `weight_unit`
- `notes`
- `created_by_user_id`
- `created_at`

### `water_intake_logs`

Recommended core fields:

- `id`
- `daily_record_id`
- `horse_id`
- `recorded_at`
- `volume_value`
- `volume_unit`
- `notes`
- `created_by_user_id`
- `created_at`

## Feeding and Nutrition

### `food_menus`

Recommended core fields:

- `id`
- `horse_id`
- `name`
- `description`
- `is_active`
- `effective_from`
- `effective_to`
- `created_at`
- `updated_at`

### `feeding_logs`

Recommended core fields:

- `id`
- `daily_record_id`
- `horse_id`
- `food_menu_id`
- `fed_at`
- `notes`
- `created_by_user_id`
- `created_at`

## Training and Environment

### `track_sessions`

Recommended core fields:

- `id`
- `horse_id`
- `session_date`
- `session_time`
- `distance_value`
- `distance_unit`
- `duration_seconds`
- `session_type`
- `surface`
- `notes`
- `weather_log_id`
- `created_by_user_id`
- `created_at`
- `updated_at`

### `weather_logs`

Recommended core fields:

- `id`
- `stable_id`
- `weather_date`
- `ambient_temperature_value`
- `ambient_temperature_unit`
- `conditions`
- `notes`
- `created_at`
- `updated_at`

Recommended constraint:

- unique on `stable_id` and `weather_date`

## Commerce and Billing

### `product_categories`

Recommended core fields:

- `id`
- `name`
- `slug`
- `description`
- `is_active`
- `created_at`
- `updated_at`

### `products`

Recommended core fields:

- `id`
- `product_category_id`
- `name`
- `slug`
- `description`
- `sku`
- `price_amount`
- `currency_code`
- `status`
- `image_url`
- `created_at`
- `updated_at`

### `orders`

Recommended core fields:

- `id`
- `user_id`
- `status`
- `subtotal_amount`
- `tax_amount`
- `total_amount`
- `currency_code`
- `ordered_at`
- `created_at`
- `updated_at`

### `order_items`

Recommended core fields:

- `id`
- `order_id`
- `product_id`
- `quantity`
- `unit_price_amount`
- `line_total_amount`
- `created_at`

### `subscriptions`

Recommended core fields:

- `id`
- `user_id`
- `membership_level_id`
- `status`
- `billing_provider`
- `provider_subscription_id`
- `current_period_start`
- `current_period_end`
- `cancel_at_period_end`
- `created_at`
- `updated_at`

### `payments`

Recommended core fields:

- `id`
- `user_id`
- `order_id`
- `subscription_id`
- `invoice_id`
- `provider`
- `provider_payment_id`
- `amount`
- `currency_code`
- `status`
- `paid_at`
- `created_at`

### `invoices`

Recommended core fields:

- `id`
- `user_id`
- `subscription_id`
- `invoice_number`
- `status`
- `issue_date`
- `due_date`
- `total_amount`
- `currency_code`
- `created_at`
- `updated_at`

## Audit and Governance

### `audit_logs`

Recommended core fields:

- `id`
- `actor_user_id`
- `entity_type`
- `entity_id`
- `action`
- `before_state`
- `after_state`
- `ip_address`
- `user_agent`
- `created_at`

## Recommended Relationship Summary

- `users.auth_user_id` references `auth.users.id`
- `member_profiles.user_id` references `users.id`
- `trainers.member_profile_id` references `member_profiles.id`
- `owners.member_profile_id` references `member_profiles.id`
- `horses.stable_id` references `stables.id`
- `horse_assignments.horse_id` references `horses.id`
- `horse_assignments.owner_id` references `owners.id`
- `horse_assignments.trainer_id` references `trainers.id`
- `horse_assignments.stable_id` references `stables.id`
- `daily_records.horse_id` references `horses.id`
- `daily_records.recorded_by_user_id` references `users.id`
- `daily_records.weather_log_id` references `weather_logs.id`
- each measurement log references `daily_records.id`, `horses.id`, and `users.id`
- `feeding_logs.food_menu_id` references `food_menus.id`
- `track_sessions.weather_log_id` references `weather_logs.id`
- `orders.user_id` references `users.id`
- `order_items.order_id` references `orders.id`
- `order_items.product_id` references `products.id`
- `subscriptions.user_id` references `users.id`
- `subscriptions.membership_level_id` references `membership_levels.id`
- `payments` may reference one of `orders`, `subscriptions`, or `invoices`
- `invoices.user_id` references `users.id`
- `audit_logs.actor_user_id` references `users.id`

## Security Direction

- restrict horse and stable operational data with row-level security using active assignment relationships
- restrict commerce admin actions to staff or admin permissions
- restrict member views to data allowed by their assigned horses, stable scope, and permissions
- make audit data admin-only by default
- separate public product visibility from internal operational data completely

## Confirmed Decisions

- `owners` and `trainers` can exist independently as operational entities, but should link to `member_profiles` when platform access is required
- memberships are multi-level and are assigned by administrators
- payment model is supported as products-only, subscriptions-only, or hybrid depending on business configuration
- canonical units are:
  - temperature: `C`
  - weight: `kg`
  - water intake: `L`
  - distance: `m`

## Supporting Access Tables

### `stable_staff_assignments`

Purpose:

- assign staff-like member profiles to one or more stables
- support stable-scoped operational access without granting global visibility
- allow read, write, or manage access by stable over time

Recommended core fields:

- `id`
- `stable_id`
- `member_profile_id`
- `role_code`
- `access_level`
- `starts_at`
- `ends_at`
- `is_primary`
- `notes`
- `created_at`
- `updated_at`

## Next Design Tasks

- define enum sets for access level, assignment type, status, and ownership type
- decide the payment gateway provider
- extend executable row-level security policies for finance-specific non-admin billing roles if needed
- refine field nullability and check constraints in later migrations
