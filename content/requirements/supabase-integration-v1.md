# Supabase Integration V1

This document records the initial application wiring for the new Supabase account.

## Implemented Scaffolding

- browser client helper in `lib/supabase/client.ts`
- server client helper in `lib/supabase/server.ts`
- middleware session updater in `lib/supabase/middleware.ts`
- auth role helper in `lib/auth/roles.ts`
- protected route middleware in `middleware.ts`
- sign-in entry page at `/sign-in`
- environment contract in `.env.example`

## Required Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Expected Account Rule

These values must come only from the new project-specific Supabase account for this workspace.

## Next Integration Steps

- create the new Supabase project
- apply migrations in order
- configure Supabase Auth providers and email templates
- connect the real sign-in flow to `supabase.auth`
- replace placeholder admin role evaluation with database-backed permission checks where needed
