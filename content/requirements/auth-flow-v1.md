# Auth Flow V1

This document captures the first instantiated authentication flow in the application layer.

## Implemented

- `/sign-in` route for authentication entry
- `/auth/callback` route for Supabase email-link return
- passwordless email sign-in server action
- sign-out server action
- Supabase-aware middleware for protected routes
- session-aware portal, admin, and operations layouts
- database-backed application auth context and admin permission enforcement
- authenticated user bootstrap into `users` and `member_profiles`

## Current Flow

1. A user requests a protected route.
2. Middleware checks for Supabase environment readiness.
3. If Supabase is not configured, the user is redirected to `/sign-in?setup=supabase`.
4. If Supabase is configured but there is no session, the user is redirected to `/sign-in`.
5. On callback and app-context load, authenticated users are mirrored into `users` and `member_profiles` when missing.
6. The protected layout loads the application auth context from platform tables.
7. Admin routes require the `platform.admin` permission through membership and permission tables.

## Current Sign-In Method

- passwordless email OTP using Supabase Auth

## Planned Next Layer

- add member-aware profile loading after sign-in
- add branded auth messaging and email template configuration in the new Supabase account
- add an administrator onboarding step to assign first live membership levels after account creation
