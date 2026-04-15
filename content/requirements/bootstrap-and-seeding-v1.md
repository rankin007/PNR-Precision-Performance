# Bootstrap And Seeding V1

This document records the first instantiated account bootstrap and membership seeding layer.

## Implemented

- authenticated user bootstrap helper in `lib/auth/bootstrap.ts`
- callback-triggered bootstrap after Supabase email-link sign-in
- app-context-triggered bootstrap fallback for signed-in users
- baseline membership level seed migration in `supabase/migrations/0005_membership_level_seeds.sql`
- first-admin bootstrap path from the portal when no admin exists
- membership assignment action and admin membership console
- admin user console with membership visibility and active or inactive status controls

## Bootstrapped Records

When a new authenticated user reaches the platform and the admin service role is configured:

- a `users` row is created if missing
- a `member_profiles` row is created if missing

## Seeded Membership Levels

- `public`
- `owner`
- `trainer`
- `staff`
- `admin`

## Seeded Permission Mapping

- `trainer` receives `horse.records.write`
- `staff` receives stable staff read and write permissions
- `admin` receives the full seeded administrative permission set

## Important Limitation

This does not automatically assign a live membership level to every new user. Initial role assignment remains an administrator decision.

Exception:

- if no admin membership assignment exists yet, the first signed-in user can claim initial admin access through the dedicated onboarding control
