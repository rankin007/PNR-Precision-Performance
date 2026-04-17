# Fresh Account Launch Sequence

This document defines the exact order for bringing the platform online using brand-new project-specific infrastructure, with Stripe allowed to use the website owner's existing business account when approved for this platform.

## Non-Negotiable Rule

- GitHub, Vercel, Supabase, and Railway must each be created fresh for this project.
- Stripe may use the website owner's existing Stripe account when that account is the intended business owner account for this website.
- Do not reuse prior repositories, tokens, webhooks, databases, or projects from any earlier workspace or unrelated business.

## Local Repository First

1. Keep this workspace as the local source of truth.
2. Use `main` as the protected default branch.
3. Add `develop` as the shared integration branch after the remote repository exists.
4. Use short-lived feature branches from `develop`.

## External Setup Order

1. GitHub
- Create a brand-new repository for this project.
- Add branch protection to `main`.
- Require pull requests for merges to `main`.
- Require the CI workflow to pass before merge.

2. Supabase
- Create a brand-new Supabase project.
- Apply the migrations in `supabase/migrations/` in order.
- Enable email authentication.
- Confirm redirect URLs for local, staging, and production.
- Add storage buckets only after the first file requirements are confirmed.

3. Vercel
- Create a brand-new Vercel account and project.
- Import the new GitHub repository.
- Configure development, preview, and production environment variables.
- Set the production domain only after the first stable deployment is ready.

4. Railway
- Create a brand-new Railway account and project.
- Reserve Railway for workers, integration services, ETL, and background processing.
- Do not duplicate frontend deployment concerns that already belong to Vercel.

5. Stripe
- Use the website owner's approved Stripe account for this business.
- Start in test mode.
- Create products and prices only after the commercial model is finalized in live detail.
- Configure webhook endpoints after Vercel preview or production URLs exist.

6. GoDaddy and Domain
- Keep GoDaddy as registrar.
- Point the domain to Vercel only after production verification is complete.

## Environment Variable Groups

### Local Development

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

### Preview or Staging

- same keys as local, but scoped to preview resources

### Production

- same keys as local, but scoped to production resources
- production secrets must not be reused in local or preview

## Minimum Go-Live Checklist

- repository connected to new GitHub account
- CI running on pull requests
- Supabase project live and migrations applied
- Vercel project live with env vars configured
- sign-in flow verified
- RLS policy behavior verified with owner, trainer, staff, and admin users
- Railway reserved for actual background-service work, not speculative setup
- Stripe test checkout and webhook flow verified before any live payment setup
