# Live Auth Alignment V1

This document records the remaining auth-alignment steps between Vercel and Supabase for the live site.

## Current State

- local auth flow works against Supabase
- Vercel production deployment is live
- production alias is currently `https://pnr-precision-performance.vercel.app`
- production env includes Supabase public and service-role keys

## Required Production Alignment

### Vercel

- `NEXT_PUBLIC_SITE_URL` must match the real public production hostname

### Supabase Auth

Set `Authentication` -> `URL Configuration` to:

- `Site URL`
- the same real public production hostname

Add redirect URLs for:

- `https://pnr-precision-performance.vercel.app/auth/callback`
- the final custom-domain callback URL once chosen

## After Domain Cutover

When the custom domain is live:

1. update `NEXT_PUBLIC_SITE_URL` in Vercel production
2. update Supabase `Site URL`
3. add the custom-domain callback URL
4. redeploy production
5. retest sign-in and portal access on the final domain

## Security Follow-Up

- rotate `SUPABASE_SERVICE_ROLE_KEY`
- update the rotated key in local development
- update the rotated key in Vercel
