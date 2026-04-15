# Vercel Project Setup V1

This document records the intended first connection path for the new Vercel project.

## Local Readiness Added

- `vercel.json` is present for project-level configuration
- CI build workflow exists in `.github/workflows/ci.yml`
- deployment verification endpoints exist at `/api/health` and `/api/setup/status`
- environment contract exists in `.env.example`

## New Project Setup Order

1. Create a brand-new Vercel account or sign in to the new project-specific account.
2. Import the repository from the new GitHub account.
3. Set environment variables separately for development, preview, and production.
4. Confirm the first preview deployment builds successfully.
5. Verify:
- `/api/health`
- `/api/setup/status`
- public homepage load
- `/sign-in`

## Required Initial Environment Variables

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Add Later When Activated

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RAILWAY_API_TOKEN`

## Important Notes

- production should track `main`
- preview deployments may later track pull requests or `develop`
- keep this Vercel project isolated from all previous workspaces and accounts
- current live alias is `https://pnr-precision-performance.vercel.app`
- `precisionperformance.com.au` is already present on the Vercel team and should be assigned deliberately during domain cutover
