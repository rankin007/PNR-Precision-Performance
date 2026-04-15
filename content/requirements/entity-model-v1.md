# Entity Model V1

This document captures the first confirmed entity groups for the platform. It is intended as a schema-planning reference before database migrations are written.

## Identity and Access

### `users`

Purpose:

- authentication identity
- login lifecycle
- connection to member-facing access

### `member_profiles`

Purpose:

- extended user profile data
- member metadata
- relationship to display and operational profile details

### `membership_levels`

Purpose:

- subscription or tier definition
- access grouping
- member segmentation

### `permissions`

Purpose:

- role and capability assignment
- access control rules
- feature visibility

## Equine and Relationship Core

### `horses`

Purpose:

- master horse record
- core horse identity and profile data

### `stables`

Purpose:

- stable entities
- operational grouping for horses and staff context

### `trainers`

Purpose:

- trainer entities
- horse management relationships

### `owners`

Purpose:

- ownership entities
- horse ownership relationships

### `horse_assignments`

Purpose:

- map horses to owners, trainers, stables, and access contexts
- support change history in operational relationships

## Daily Physiological and Operational Data

### `daily_records`

Purpose:

- daily high-level record per horse and date
- anchor entity for daily observation sets

### `temperature_logs`

Purpose:

- horse temperature history
- health and condition tracking

### `weight_logs`

Purpose:

- horse weight history
- trend monitoring

### `water_intake_logs`

Purpose:

- water intake tracking
- hydration-related observation history

## Feeding and Nutrition

### `food_menus`

Purpose:

- reusable diet structures
- feed composition definitions

### `feeding_logs`

Purpose:

- execution history of feeding plans
- daily feed tracking

## Training

### `track_sessions`

Purpose:

- session date
- time
- distance
- training context

## Environment

### `weather_logs`

Purpose:

- daily weather context
- ambient temperature records
- notes related to environmental conditions

## Commerce

### `products`

Purpose:

- sellable catalog items
- shop inventory-facing entities

### `product_categories`

Purpose:

- product organization
- storefront navigation structure

### `orders`

Purpose:

- customer order records
- purchase lifecycle tracking

### `order_items`

Purpose:

- line-item details for each order
- quantity and product history

## Billing

### `subscriptions`

Purpose:

- recurring plan enrollment
- membership billing relationships

### `payments`

Purpose:

- recorded payment events
- transaction history

### `invoices`

Purpose:

- billing documents
- invoice history and reconciliation support

## Audit

### `audit_logs`

Purpose:

- security logging
- change tracing
- accountability and incident review

## Planning Notes

The next schema pass should define:

- primary keys and foreign keys
- which entities are tenant-scoped or role-scoped
- whether `owners` and `trainers` are standalone entities or role-specific extensions of `member_profiles`
- whether daily measurement tables attach directly to `horses` or to `daily_records`
- which commerce entities are available to all users versus members only
- which entities require row-level security policies from day one
