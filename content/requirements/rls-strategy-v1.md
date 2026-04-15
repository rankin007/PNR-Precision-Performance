# Row-Level Security Strategy V1

This document outlines the practical access-control choices available for Supabase row-level security and recommends a direction for the platform.

## Main RLS Patterns Available

### Option 1 - Direct user ownership

Pattern:

- each protected record stores a direct `user_id`
- policies check `auth.uid()` against that `user_id`

Best for:

- simple apps
- records that belong to one person only

Tradeoffs:

- easy to implement
- weak fit for horses shared across owners, trainers, and staff
- poor fit for historical access changes

### Option 2 - Role-only access

Pattern:

- policies allow access based only on broad roles such as owner, trainer, admin, or staff

Best for:

- simple staff portals
- coarse access zones

Tradeoffs:

- easy to reason about
- too broad for horse-specific privacy
- cannot safely enforce owner access to only selected horses

### Option 3 - Assignment-based access

Pattern:

- policies resolve access through active relationship tables such as `horse_assignments`
- access depends on current role, relationship, and time range

Best for:

- this platform
- horses with multiple related people
- changing ownership and trainer control over time

Tradeoffs:

- strongest domain fit
- more complex SQL policies
- requires disciplined assignment data quality

### Option 4 - Stable-scoped access

Pattern:

- policies allow access to all records within a stable scope

Best for:

- internal staff or stable operators
- workflow areas where access is by stable rather than horse

Tradeoffs:

- useful for staff workflows
- too broad by itself for owners
- should be combined with assignment logic, not used alone

### Option 5 - Permission-overlay model

Pattern:

- use assignments for base visibility
- use membership levels and permissions for feature and action control

Best for:

- this platform
- systems where visibility and capability are different concerns

Tradeoffs:

- most flexible
- requires both relationship logic and permission logic
- best long-term architecture

## Recommended Approach

Use a hybrid of:

- assignment-based access for horse-level visibility
- stable-scoped access for approved staff workflows
- permission overlay for actions and feature gating

This gives the safest and most scalable model.

## Recommended Access Rules by Actor

### Admin

- full access to all platform records
- can assign owners, trainers, and membership levels
- can view audit logs

### Trainer

- can view horses under active trainer control
- can view related daily records, feeding logs, track sessions, and weather context for those horses
- can assign or recommend owner access where allowed by business rules

### Owner

- can view only horses explicitly assigned to them
- can view related records for those assigned horses only
- no implied access to all horses in a stable

### Staff

- may be granted stable-scoped or operational permissions
- should not receive cross-stable or cross-horse access unless explicitly granted

### Public User

- access limited to public website and public products only

## Policy Choices by Data Domain

### `horses`

Available choices:

- admin-only write, assignment-based read
- stable-scoped staff access plus assignment-based member access
- public visibility for selected marketing fields only through views, not base tables

Recommended:

- base table private
- member access through active `horse_assignments`
- staff access through stable scope plus permission checks

### `daily_records`, `temperature_logs`, `weight_logs`, `water_intake_logs`, `feeding_logs`, `track_sessions`

Available choices:

- follow horse access exactly
- add stricter write policies for staff or trainers only
- allow owners read-only access while staff and trainers can create and edit

Recommended:

- read follows horse visibility
- insert and update restricted to trainers, staff, or admins with proper permissions
- owners read-only unless a future workflow requires otherwise

### `weather_logs`

Available choices:

- stable-scoped access
- public weather summaries via derived views only
- admin and staff write control

Recommended:

- stable-scoped read for operational users
- no direct owner-only weather browsing unless linked through horse context

### `orders`, `subscriptions`, `payments`, `invoices`

Available choices:

- user-self access only
- admin finance access
- staff access with finance permission only

Recommended:

- users can access only their own commerce and billing records
- finance and admin access controlled by permissions

### `audit_logs`

Available choices:

- admin-only
- admin plus compliance role

Recommended:

- admin-only by default

## Recommended Implementation Order

1. Create helper functions that resolve current application user, membership levels, and active horse assignments.
2. Apply admin bypass policies first.
3. Apply horse visibility policies using assignment logic.
4. Apply operational write policies for trainers and staff.
5. Apply commerce self-service policies.
6. Apply audit-log restrictions last.

## Current Instantiation Status

Implemented in the repo now:

- helper functions for current user resolution and admin checks
- assignment-based horse access for trainers and owners
- trainer or admin write access for operational horse records
- self-service access for commerce and billing records
- admin-only audit-log access

Still pending by design:

- stable-scoped staff access policies
- finance-specific non-admin billing permissions
- storage bucket policies
- public-safe reporting or marketing views derived from private tables

## Key Schema Support Needed

To implement the recommended model cleanly, the schema should support:

- reliable link from `auth.users` to `users`
- active membership resolution
- active horse assignment resolution with `starts_at` and `ends_at`
- clear assignment types for owner, trainer, and stable relationships
- permission mapping for feature and action control
