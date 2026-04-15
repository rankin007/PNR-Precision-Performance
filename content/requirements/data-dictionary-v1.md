# Data Dictionary V1

This document is the first-pass field and unit reference for the platform. Confirmed business labels should replace any proposed assumptions before production migrations are treated as final.

## Conventions

- timestamps should use `timestamptz`
- dates should use `date`
- identifiers should use `uuid`
- money should use `numeric(12,2)` with explicit currency codes
- free-text notes should use `text`
- status fields should be constrained in later migrations with check constraints or lookup tables

## Confirmed Canonical Measurement Units

- horse body temperature: `C`
- ambient temperature: `C`
- horse weight: `kg`
- water intake: `L`
- track distance: `m`
- duration: `seconds`

These units are confirmed for operational use.

## Identity and Access Fields

### `users`

- `id`: application primary key
- `auth_user_id`: foreign key to Supabase Auth identity
- `email`: primary email used for login and notifications
- `status`: lifecycle state such as active or suspended
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `member_profiles`

- `id`: profile primary key
- `user_id`: linked application user
- `display_name`: preferred member-facing label
- `first_name`: given name
- `last_name`: family name
- `phone`: contact phone
- `organisation_name`: business or syndicate name where relevant
- `avatar_url`: profile image location
- `is_active`: profile availability flag
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `membership_levels`

- `id`: tier primary key
- `code`: stable internal identifier
- `name`: public or admin-facing tier name
- `description`: tier explanation
- `is_paid`: whether the level requires payment
- `is_custom`: whether the level is custom to an organisation or case
- `sort_order`: display and admin ordering
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `permissions`

- `id`: permission primary key
- `code`: machine-readable capability key
- `name`: admin-facing permission name
- `description`: permission summary
- `scope`: area of effect such as horse, stable, shop, or admin
- `created_at`: record creation timestamp

### `stable_staff_assignments`

- `stable_id`: linked stable for scoped access
- `member_profile_id`: linked member profile receiving stable access
- `role_code`: stable-specific role label
- `access_level`: read, write, or manage scope
- `starts_at`: access start timestamp
- `ends_at`: access end timestamp
- `is_primary`: primary stable relationship flag
- `notes`: operational notes about the assignment

## Equine Core Fields

### `horses`

- `id`: horse primary key
- `stable_id`: current stable relationship
- `name`: horse display name
- `slug`: URL-safe identifier
- `sex`: horse sex classification
- `date_of_birth`: birth date
- `colour`: coat colour
- `breed`: breed descriptor
- `microchip_number`: physical identification reference
- `registration_number`: official registration reference
- `status`: active, retired, inactive, or similar lifecycle state
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `stables`

- `id`: stable primary key
- `name`: stable name
- `code`: short internal identifier
- `location`: descriptive location value
- `status`: operational status
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `trainers`

- `id`: trainer primary key
- `member_profile_id`: optional link to member profile when the trainer has platform access
- `display_name`: trainer display label
- `license_number`: registration or licence identifier
- `phone`: contact phone
- `email`: contact email
- `status`: lifecycle state
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `owners`

- `id`: owner primary key
- `member_profile_id`: optional link to member profile when the owner has platform access
- `display_name`: owner display label
- `ownership_type`: individual, company, syndicate, or other type
- `phone`: contact phone
- `email`: contact email
- `status`: lifecycle state
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `horse_assignments`

- `id`: assignment primary key
- `horse_id`: related horse
- `owner_id`: related owner where applicable
- `trainer_id`: related trainer where applicable
- `stable_id`: related stable where applicable
- `assignment_type`: relationship type being represented
- `access_level`: intended visibility or access level
- `starts_at`: relationship start timestamp
- `ends_at`: relationship end timestamp
- `is_primary`: primary relationship flag
- `notes`: operational notes
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

Access interpretation:

- trainer-linked assignments support access to horses under trainer control
- owner-linked assignments support access only to explicitly assigned horses
- owner-linked access is granted by trainer or admin action

## Daily Measurement Fields

### `daily_records`

- `id`: daily record primary key
- `horse_id`: related horse
- `record_date`: operational day for the record
- `recorded_by_user_id`: user who created or owns the daily record
- `stable_id`: stable context for the day
- `weather_log_id`: linked weather context
- `notes`: general daily notes
- `created_at`: record creation timestamp
- `updated_at`: record update timestamp

### `temperature_logs`

- `temperature_value`: measured horse body temperature
- `temperature_unit`: proposed canonical unit `C`
- `recorded_at`: exact measurement timestamp

### `weight_logs`

- `weight_value`: measured horse weight
- `weight_unit`: proposed canonical unit `kg`
- `recorded_at`: exact measurement timestamp

### `water_intake_logs`

- `volume_value`: measured water intake
- `volume_unit`: proposed canonical unit `L`
- `recorded_at`: exact measurement timestamp

## Feeding Fields

### `food_menus`

- `name`: menu name
- `description`: menu description
- `is_active`: whether the menu is current
- `effective_from`: menu start date
- `effective_to`: menu end date

### `feeding_logs`

- `fed_at`: timestamp feed was delivered or recorded
- `notes`: feeding notes, deviations, or comments

## Training and Weather Fields

### `track_sessions`

- `session_date`: calendar date of the session
- `session_time`: timestamp or scheduled session time
- `distance_value`: measured session distance
- `distance_unit`: proposed canonical unit `m`
- `duration_seconds`: session duration in seconds
- `session_type`: gallop, trot, recovery, or similar label
- `surface`: track or surface description
- `notes`: training notes

### `weather_logs`

- `weather_date`: calendar date of weather conditions
- `ambient_temperature_value`: measured ambient temperature
- `ambient_temperature_unit`: proposed canonical unit `C`
- `conditions`: textual weather condition summary
- `notes`: additional weather context

## Commerce and Billing Fields

### `products`

- `sku`: stock-keeping identifier
- `price_amount`: product price amount
- `currency_code`: proposed default `AUD`
- `status`: draft, active, archived, or similar lifecycle state

### `orders`

- `subtotal_amount`: pre-tax total
- `tax_amount`: tax total
- `total_amount`: final order total
- `currency_code`: transaction currency
- `ordered_at`: order placement timestamp

### `subscriptions`

- `billing_provider`: payment platform identifier
- `provider_subscription_id`: external provider reference
- `current_period_start`: current billing period start
- `current_period_end`: current billing period end
- `cancel_at_period_end`: cancellation scheduling flag

### `payments`

- `provider`: payment provider identifier
- `provider_payment_id`: external payment reference
- `amount`: paid amount
- `currency_code`: payment currency
- `status`: payment lifecycle state
- `paid_at`: payment confirmation timestamp

### `invoices`

- `invoice_number`: invoice reference number
- `issue_date`: invoice issue date
- `due_date`: invoice due date
- `total_amount`: invoice amount total
- `currency_code`: invoice currency

## Governance Fields

### `audit_logs`

- `actor_user_id`: user responsible for the action
- `entity_type`: affected table or domain entity label
- `entity_id`: affected record identifier
- `action`: action label such as insert, update, delete, or login
- `before_state`: JSON snapshot before the action
- `after_state`: JSON snapshot after the action
- `ip_address`: request IP address where available
- `user_agent`: request client identifier where available
- `created_at`: audit event timestamp

## Confirmed Access and Commercial Rules

- memberships are multi-level and assigned by administrators
- payment support must allow products, subscriptions, and hybrid billing models
- trainers may have broad access to horses under active control
- owners may access only explicitly assigned horses
- stable staff access should be scoped through dedicated stable assignment records

## Next Refinements

- confirm whether all measurements must store both raw input and normalized canonical values
- define field nullability at the business-rule level
- define enum sets for status, assignment type, access level, and ownership type
- confirm whether reporting views should also support converted display units without changing stored canonical units
