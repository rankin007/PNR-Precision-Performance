# Platform Architecture Notes

## Initial Architecture Direction

- Frontend: `Next.js` App Router deployed to Vercel
- Backend platform: Supabase
- Database: Supabase Postgres
- Authentication: Supabase Auth
- Storage: Supabase Storage
- Background jobs and integrations: Railway
- Source control and collaboration: GitHub
- Domain registrar: GoDaddy
- Orchestration layer: Antigravity

## External Account Isolation Requirement

All external services for this platform must use new, dedicated accounts and project spaces.

Applies to:

- GitHub
- Vercel
- Railway
- Supabase
- Stripe

Requirements:

- no reuse of earlier repositories, projects, environments, databases, or billing setups
- no reuse of old API keys, tokens, webhooks, or environment variables
- no linkage to prior workspaces or past project infrastructure

## Core System Concerns

- role-based access control for multiple member types
- secure storage of horse, member, and performance-related data
- scalable schema design for structured equine performance and biochemistry records
- clean separation between public website content and authenticated member areas
- room for e-commerce and future mobile or app-connected experiences

## Early Product Domains

- public marketing website
- authenticated member portal
- horse data records
- performance records
- biochemistry records
- e-commerce
- administrative tools
- reporting and exports
- integrations and worker processes

## Confirmed Entity Groups

### Identity and access

- `users`
- `member_profiles`
- `membership_levels`
- `permissions`

Purpose:

- authentication
- profiles
- access control
- role assignment

### Core equine and relationship model

- `horses`
- `stables`
- `trainers`
- `owners`
- `horse_assignments`

Purpose:

- core business relationships
- ownership mapping
- trainer mapping
- access and visibility mapping

### Daily physiological and operational capture

- `daily_records`
- `temperature_logs`
- `weight_logs`
- `water_intake_logs`

Purpose:

- day-to-day physiological measurements
- operational measurements
- trend tracking
- staff-entered monitoring history

### Nutrition and feeding

- `food_menus`
- `feeding_logs`

Purpose:

- diet structure
- feeding history
- menu consistency and change tracking

### Training and track activity

- `track_sessions`

Purpose:

- track time
- distance
- session date
- training context

### Environmental conditions

- `weather_logs`

Purpose:

- daily conditions
- ambient temperature
- weather notes
- context for training and physiology review

### Commerce

- `products`
- `product_categories`
- `orders`
- `order_items`

Purpose:

- shop operations
- product catalog
- order processing
- sales history

### Recurring billing

- `subscriptions`
- `payments`
- `invoices`

Purpose:

- recurring revenue
- membership billing
- payment tracking
- invoice history

### Audit and accountability

- `audit_logs`

Purpose:

- security tracing
- change history
- operational accountability

## Near-Term Planning Needs

- define the member role matrix
- define core entities and relationships
- define public pages versus authenticated pages
- define first-release priorities
- define data sensitivity and permission boundaries
- define canonical foreign-key relationships across the confirmed entity groups
