# Domain Cutover V1

This document records the current custom-domain state and the next cutover steps for production.

## Current State

- Vercel production alias is `https://pnr-precision-performance.vercel.app`
- the Vercel team already has `precisionperformance.com.au` attached as a domain
- registrar remains GoDaddy

## Recommended Cutover Order

1. Confirm the intended primary production hostname
- `precisionperformance.com.au`
- or `www.precisionperformance.com.au`

2. In Vercel, assign the chosen hostname to the `pnr-precision-performance` project.

3. In GoDaddy, point the domain DNS to Vercel as required by the Vercel dashboard.

4. Wait for Vercel domain verification to complete.

5. Update production auth settings:
- set `NEXT_PUBLIC_SITE_URL` in Vercel to the final domain
- set Supabase `Site URL` to the final domain
- add the final `/auth/callback` URL in Supabase redirect URLs

6. Redeploy production after the site URL change.

## Verification Checklist

- final domain resolves to the Vercel project
- `/api/health` returns `ok: true`
- `/sign-in` loads on the final domain
- magic-link login lands on the final domain callback successfully
- `/portal` remains accessible after sign-in

## Important Note

Do not leave production auth pinned to the temporary `vercel.app` alias once the custom domain becomes primary.
