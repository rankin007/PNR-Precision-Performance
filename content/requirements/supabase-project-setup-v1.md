# Supabase Project Setup V1

This document records the intended first connection path for the new Supabase project.

## Local Readiness Added

- local Supabase config scaffold exists at `supabase/config.toml`
- migrations are ready in `supabase/migrations/`
- auth callback route exists at `/auth/callback`
- setup verification endpoint exists at `/api/setup/status`
- health endpoint exists at `/api/health`

## New Project Setup Order

1. Create a brand-new Supabase project for this platform only.
2. Copy the project URL and anon key into local development env values.
3. Add the service role key only to secure local and deployment environments.
4. Apply migrations in numeric order from `supabase/migrations/`.
5. Configure auth redirect URLs for:
- `http://localhost:3000/auth/callback`
- Vercel preview callback URL
- production callback URL

## First Verification Checks

- `/api/health` returns `ok: true`
- `/api/setup/status` shows Supabase checkpoints as ready
- `/sign-in` sends a magic link successfully
- first authenticated user bootstraps into `users` and `member_profiles`
- first-admin claim flow works when no admin assignment exists

## Important Notes

- replace placeholder redirect URLs in `supabase/config.toml` once staging and production domains are known
- keep this project isolated from all previous Supabase workspaces and credentials
