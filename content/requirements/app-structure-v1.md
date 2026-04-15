# App Structure V1

This document captures the initial route and product-area structure for the application.

## Current Route Areas

### Public website

- `/`

Purpose:

- brand site
- platform overview
- public marketing and commerce entry points

### Member portal

- `/portal`

Purpose:

- authenticated owner and trainer experiences
- dashboards
- horse and reporting views
- account tools

### Administration

- `/admin`

Purpose:

- membership management
- permissions and assignments
- commerce operations
- platform administration

### Operational data entry

- `/data-entry`

Purpose:

- phone-first logging workflows
- daily horse records
- fast operational capture

## App Router Structure

- `app/page.tsx`
- `app/(marketing)/home/page.tsx`
- `app/(portal)/portal/page.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(ops)/data-entry/page.tsx`

## Next Expansion Areas

- shared authenticated layout shells
- route protection middleware
- portal subroutes for horses, stables, reports, and account settings
- admin subroutes for memberships, users, permissions, and commerce
- operational forms for daily records, feeding, and track sessions
