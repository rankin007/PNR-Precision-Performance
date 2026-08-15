## Sprint 036K credential-class environment boundary

Only these seven non-public classes are eligible: `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ENQUIRY_ABUSE_HMAC_SECRET`, `PUBLIC_ENQUIRY_SMTP_PASS`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and `RAILWAY_API_TOKEN`. The replacement projection must account for Development, Preview and Production bindings plus every still-addressable immutable or old deployment consumer. Public Supabase/Stripe values and Vercel OIDC are excluded.

Environment presence or absence is not a provider revocation oracle. `CRON_SECRET` and `ENQUIRY_ABUSE_HMAC_SECRET` require proof that no old consumer can accept the predecessor. SMTP, Stripe and Railway `revoked-not-required` still require exact provider-native revoke or absence proof plus a fail-closed runtime. Supabase service-role work requires an individually supported create/revoke mechanism and must not change anon/public keys, JWT signing authority, sessions or unrelated project keys.

The phase ledger distinguishes accepted retained bindings and candidates from residue. Before predecessor revocation, compensation restores the complete prior compatible binding/caller projection and removes the replacement. After independent predecessor invalidation, compensation may retain or repair the verified replacement but must never restore the revoked predecessor.

# Environment Contract

Sprint 003 documents environment truth by variable name, category, and requiredness only. Secret values, prefixes, suffixes, token fragments, and connection strings must not be printed or stored in planning docs.

## Evidence Inspected

- `.env.example` variable names only
- `.env.local` variable names only
- `.env.vercel.production` variable names only
- `lib/supabase/env.ts`
- `lib/supabase/admin.ts`
- `lib/stripe/env.ts`
- `lib/stripe/server.ts`
- `lib/runtime/platform-status.ts`
- source references found with name-only search patterns

## Application Variables

| Variable | Category | Requiredness | Used by | Notes |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public app URL | Required for production; optional locally with request-origin fallback in checkout | Auth redirects, checkout redirects, platform status | Should point at canonical deployed site per environment. |
| `NEXT_PUBLIC_APP_ENV` | Public app environment label | Optional/status | Environment files | Present in env examples/files; no direct runtime behavior found in Sprint 003 scan. |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase config | Required for Supabase-backed app behavior | Supabase server/client helpers, setup status | Required together with anon key for portal/admin/data workflows. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase anon key | Required for Supabase-backed app behavior | Supabase server/client helpers, setup status | Public browser-safe Supabase key, but still do not print actual values in docs/logs. |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret Supabase admin key | Required only for admin/bootstrap/server-side privileged flows | Admin client, bootstrap/admin pages, checkout order persistence helpers | Must never be exposed to the browser or logs. Sprint 004 should verify permission boundaries. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public Stripe client key | Required for client-visible Stripe readiness/status | Stripe env/status checks | Public publishable key, but docs should still avoid copying values. |
| `STRIPE_SECRET_KEY` | Secret Stripe server key | Required for checkout/session server behavior | Checkout route, Stripe server client, status checks | Must never be logged. |
| `STRIPE_WEBHOOK_SECRET` | Secret Stripe webhook signing secret | Required for webhook verification | Stripe webhook route, status checks | Must never be logged, including prefixes/fragments. |
| `RAILWAY_API_TOKEN` | Secret Railway token/status marker | Optional; status-only in current code | `getPlatformStatus()` | Presence is reported as configured/missing; no Railway deployment config was found. Confirm whether this remains needed. |
| `VERCEL_ENV` | Vercel runtime environment marker | Optional/platform-provided | `getPlatformStatus()` | Defaults to `local` when absent. |

## Vercel Metadata Variables

`.env.vercel.production` also contains Vercel platform/build metadata variable names such as `VERCEL`, `VERCEL_URL`, `VERCEL_TARGET_ENV`, `VERCEL_GIT_*`, and `VERCEL_OIDC_TOKEN`. These are platform-provided or deployment-context variables. They are not application secrets to copy into documentation, and `VERCEL_OIDC_TOKEN` must be treated as credential material.

## Local Presence Summary

Name-only inspection found the core app variables in `.env.example`, `.env.local`, and `.env.vercel.production`. `.env.vercel.production` also contains Vercel/Turbo/Nx build-context variable names.

This sprint did not validate actual values, test remote Supabase/Stripe connectivity, or verify production project settings.

## Rules For Future Work

- Log configured/missing status only.
- Do not log secret values, fragments, prefixes, suffixes, decoded contents, or connection strings.
- Keep `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RAILWAY_API_TOKEN`, and `VERCEL_OIDC_TOKEN` out of client bundles and logs.
- Treat auth/RLS, Stripe behavior, webhook reconciliation, and production deployment verification as later sprint work unless explicitly authorized.

## Sprint 021P Selected Candidate Loading Contract

Sprint 021O selected the administrative aliases `PUBLIC_SPRINT01` and `SERVER_SPRINT01` after independent acceptance checks. Values remain operator-managed and must never appear in documentation, logs, screenshots, shell arguments, or committed files.

- `.env.local`: exact candidate `NEXT_PUBLIC_SUPABASE_URL` plus `PUBLIC_SPRINT01` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`; no server/service-role variable.
- `.env.development.local`: `SERVER_SPRINT01` as the sole Supabase server variable `SUPABASE_SERVICE_ROLE_KEY`; no public Supabase variables.
- `.env.test.local`: the same server alias as `SUPABASE_SERVICE_ROLE_KEY`; no public Supabase variables.
- `.env.021o.local`: ignored diagnostic source only; it is not an application runtime source and remains operator-managed.

Sprint 021P verifies alias equality only in protected memory and reports fixed categories. Public values may feed client configuration; the server value must remain server-only and absent from client/static output.

---

# Sprint 007 Launch Environment Update

Sprint 007 repeated environment verification by name and presence only. No secret values, fragments, connection strings, private keys, tokens, or decoded credential material were printed or stored.

## Name-Only Results

- `.env.example`, `.env.local`, and `.env.vercel.production` contain the expected app variable names.
- The current Builder process environment did not expose the required Supabase, Stripe, site URL, or Vercel marker names.
- Local Next smoke used the app's normal environment loading, but Sprint 007 did not copy or inspect actual values.
- Remote Vercel production/preview environment completeness remains blocked until the user/operator checks project settings or provides safe non-secret configured/missing status.

## Launch Clarification

For production launch, `NEXT_PUBLIC_SITE_URL` must match the confirmed canonical production domain. Supabase and Stripe values must be configured in the target Vercel environment before auth, portal, admin, checkout, or webhook smoke can be considered live-verified.

---

# Sprint 008 Environment Update

Sprint 008 recreated `.env.example` with clearer placeholder-only guidance for App/Vercel, Supabase, and Stripe test-mode setup.

## Name/Presence Findings

- `.env.example` contains all required app variable names with blank placeholders for secrets and public external service values.
- `.env.local` contains nonblank Supabase and Stripe values by name-only inspection.
- `.env.local` Stripe values have expected test/webhook shapes by category-only inspection.
- `.env.vercel.production` contains nonblank Supabase and Stripe names, but Stripe key shapes are not recognizable as direct Stripe test/live key shapes from local file inspection. Verify the production Vercel dashboard values before production launch.

## Launch Domain Guidance

The user confirmed all of these are valid launch domains:

- `https://precisionperformance.com.au`
- `https://www.precisionperformance.com.au`
- `https://pnr-precision-performance.vercel.app`

Choose one canonical production URL for `NEXT_PUBLIC_SITE_URL` in each environment. Use exactly one `https://` URL with no trailing slash.

---

# Sprint 034C Credential Ownership Boundary

Sprint 034C did not open protected environment files, inspect values, compare credential fragments, list private identifiers, or change `.env.example`, `.gitignore`, Vercel environment values or any provider secret.

Environment-backed runtime credentials remain separate from human delivery/operator authentication. Supabase service-role, Stripe secret/webhook, custom SMTP and other application credential classes stay in provider-managed secret storage and are not copied into the non-secret register. Custom SMTP directly supports trainer authentication and is explicitly `trainer/application-auth-out-of-scope` for Sprint 034C.

The optional Railway status-token class remains `ambiguous-retain`: no Railway deployment configuration is documented, and presence, ownership and value were not inspected. Vercel OIDC remains a provider-issued ephemeral deployment credential class; it must not be copied, manually persisted or treated as a human password. See `docs/change password.md` for sanitized ownership, rotation and recovery status.

## Sprint 036M paired Supabase bindings

`NEXT_PUBLIC_SUPABASE_ANON_KEY` may hold a publishable key and `SUPABASE_SERVICE_ROLE_KEY` may hold a secret key without renaming the established bindings. Change both Production bindings together and deploy at most one exact-source alias-free candidate. Opaque keys travel in `apikey`; only an exact duplicated application-key bearer is removed, while a different user-session JWT remains in `Authorization`. Vercel environment changes apply only to a new deployment; fixed aliases move only after public/user/admin probes pass.
