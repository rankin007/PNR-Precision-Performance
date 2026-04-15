# Supabase Activation V1

This document records the fastest activation path for the new Supabase project from the current repository state.

## Activation Assets

- source migrations live in `supabase/migrations/`
- bundled SQL can be generated with `npm run db:bundle`
- generated output writes to `supabase/bootstrap/remote-init.sql`

## Recommended Activation Path

1. Run `npm run db:bundle`
2. Open the new Supabase project's SQL editor
3. Paste the contents of `supabase/bootstrap/remote-init.sql`
4. Execute the script once
5. Confirm the core tables, policies, and seeded membership levels exist

## What The Bundle Includes

- base relational schema
- RLS helper functions and policies
- stable staff scope support
- seeded permission codes
- seeded membership levels and mappings

## After Execution

- configure auth redirect URLs
- test `/api/setup/status`
- test `/sign-in`
- confirm first-user bootstrap
- confirm first-admin claim flow

## Important Note

The bundled SQL is intended to activate a fresh project. Do not run it repeatedly against a partially modified environment without reviewing existing state first.
