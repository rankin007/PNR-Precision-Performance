# Admin And Commerce Hardening Evidence

Sprint 006 hardened the launch-critical admin and commerce surfaces from local source evidence. Secret values, tokens, passwords, private keys, connection strings, raw Stripe payloads, and credential fragments were not printed or stored.

## Implementation Summary

- Applied the Sprint 006 Architect Pack and created the four-file sprint set under `planning/sprints/006-admin-and-commerce-hardening/`.
- Admin user status updates now accept only `active` or `inactive`, verify the target row exists, and update `updated_at`.
- Admin membership assignment now requires service-role readiness, validates email shape, validates the submitted level against database-backed membership levels, preserves idempotent upsert assignment, and reports non-sensitive error states.
- Added read-only `/admin/commerce` visibility for products, orders, payments, checkout-session IDs, payment-intent IDs, statuses, amounts, and timestamps after the admin gate.
- Added `/admin/commerce` to admin navigation.
- `/shop` now renders active database-backed products through `getPublicProductSummaries()` when Supabase is configured; fallback products remain checkout-disabled when configuration is absent.
- Checkout creation now validates a safe product slug, active product lookup, positive price, three-letter currency code, Supabase public/admin readiness, Stripe server readiness, pending-order persistence, and safe failure redirects.
- Checkout diagnostics log only product slug, order ID when available, and a structural reason code.
- Stripe webhook handling now separates signature verification from commerce reconciliation, keeps signature verification mandatory, handles only supported checkout-session events, and logs only event type, checkout session ID, and structural reason codes.
- Webhook reconciliation now uses an upsert fallback for missing order metadata and checks for an existing order item before inserting, so replayed sessions do not duplicate order items where existing schema permits prevention.

## Behavior Map

| Area | Current behavior |
|---|---|
| `/admin` | Gated by `requireAdminAppContext`, which requires signed-in app context plus `platform.admin`. |
| `/admin/users` | Service-role-backed snapshot after admin layout gate. Status action requires admin gate, service-role env, user ID, and status in `active`/`inactive`. |
| `/admin/memberships` | Service-role-backed snapshot after admin layout gate. Assignment action requires admin gate, valid email, valid configured membership level, existing app user, and idempotent membership-level upsert. |
| `/admin/commerce` | Read-only admin-gated view of products, recent orders, and recent payments. It exposes reconciliation identifiers already stored in the database, shortened for display. |
| `/shop` | Uses active DB products when Supabase is configured. Shows preview fallback products with disabled checkout when Supabase is absent. |
| `/shop/[slug]` | Loads active DB product detail or fallback preview detail. Reports non-sensitive checkout states such as missing Supabase, missing Stripe, invalid product pricing, unavailable product, pending-order persistence failure, cancelled, and success. |
| `/api/checkout` | Creates a pending order and order item before Stripe redirect when Supabase admin and Stripe server env are configured. Marks pending order failed where possible on Stripe-session failure. |
| `/api/stripe/webhook` | Requires Stripe server and webhook env, requires `stripe-signature`, verifies the signature before reconciliation, handles supported checkout-session events, and returns non-sensitive status JSON. |
| `lib/stripe/commerce.ts` | Persists pending checkout orders, attaches Stripe session/payment IDs, reconciles supported checkout sessions into orders/payments, upserts payments by provider/payment ID, and prevents duplicate order items for a repeated order/product pair. |

## Smoke Matrix

| Case | Result | Evidence |
|---|---|---|
| Anonymous -> `/admin` | Code-backed pass; live blocked | Admin layout requires `requireAdminAppContext`, which redirects through signed-in/admin checks. Live session unavailable. |
| Signed-in non-admin -> `/admin` | Code-backed pass; live blocked | Admin guard requires `platform.admin`. Live non-admin test user unavailable. |
| Admin -> `/admin` | Code-backed pass; live blocked | Admin layout and pages remain behind `requireAdminAppContext`. Live admin test user unavailable. |
| Admin -> `/admin/users` | Code-backed pass; live blocked | Existing page remains under admin layout; snapshot uses service-role only server-side. Live admin test user unavailable. |
| Admin valid user status update | Code-backed pass; live blocked | Action validates service role, fields, allowed status, target row, and updates `users.status`. Live fixture unavailable. |
| Admin invalid/missing user status update | Code-backed pass | Action redirects with `missing-fields` or `invalid-status` before update. |
| Admin -> `/admin/memberships` | Code-backed pass; live blocked | Existing page remains under admin layout; snapshot uses service-role only server-side. Live admin test user unavailable. |
| Admin valid membership assignment | Code-backed pass; live blocked | Action validates email, configured level, existing user, then uses existing idempotent upsert helper. Live fixture unavailable. |
| Admin repeated same membership assignment | Code-backed pass; live blocked | `assignMembershipLevelToUser` uses `upsert` on `user_id,membership_level_id`. Live fixture unavailable. |
| Admin invalid/missing membership assignment | Code-backed pass | Action redirects for missing fields, invalid email, invalid level, missing user, or assignment failure. |
| `/shop` with missing Supabase configuration | Code-backed pass | Name-only env check showed Supabase variables missing; page renders checkout-disabled fallback products. |
| `/shop` with configured Supabase active products | Blocked live | Source queries active DB products; configured Supabase environment was unavailable. |
| `/shop/[slug]` active product detail | Code-backed pass; live blocked | Detail helper queries active product by slug; live product fixture unavailable. |
| `/shop/[slug]` unavailable/inactive product detail | Code-backed pass; live blocked | Detail helper filters to `status = active`; inactive DB fixture unavailable. |
| Checkout missing slug | Code-backed pass | Route redirects to `/shop?checkout=missing-product`. |
| Checkout inactive/unavailable product | Code-backed pass; live blocked | Route queries `status = active`; live inactive fixture unavailable. |
| Checkout missing Supabase/admin/Stripe configuration | Code-backed pass | Process env presence check showed required names missing; route returns non-sensitive checkout redirects. |
| Checkout configured happy path through Stripe test session | Blocked live | Stripe and Supabase test configuration were unavailable. |
| Webhook missing signature | Code-backed pass | Route returns `400` before reading reconciliation logic. |
| Webhook invalid signature | Code-backed pass; live replay blocked | Signature construction is mandatory and returns `400` on failure; Stripe CLI/replay unavailable. |
| Webhook supported event reconciliation | Code-backed pass; live replay blocked | Reconciliation code updates orders/payments and uses existing unique constraints/upserts. Stripe CLI/replay unavailable. |
| Duplicate supported webhook delivery | Code-backed pass; live replay blocked | Orders upsert by provider/session fallback, payments upsert by provider/payment ID, and order items are checked before insert. Stripe CLI/replay unavailable. |
| Out-of-order/missing metadata event | Code-backed pass with caveat | Missing order metadata falls back to checkout session ID; missing product ID skips item creation. Live replay unavailable. |
| Admin commerce visibility | Code-backed pass; live blocked | `/admin/commerce` builds and is admin gated; live admin data unavailable. |

## Manual Intervention Required

### Live Supabase Admin And Commerce Smoke

What is blocked:
Live verification of admin access, user status updates, membership assignment, product catalogue reads, admin commerce records, and database-backed checkout persistence.

Evidence already checked:
Source inspection confirms admin gates, service-role-only server actions, product queries, checkout persistence, and admin commerce visibility. Name-only process env inspection reported `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL` as missing. TypeScript, lint, and the known-good unsandboxed build path pass.

Exact user/manual action needed:
Provide a configured local or test Supabase environment and non-secret test fixtures. Do not paste secret values into chat.

Steps:
1. Configure the local/test app environment with the required Supabase variables.
2. Apply the current migrations, including commerce persistence and product seed migrations, to the target test database.
3. Create or identify an admin test user with `platform.admin` and a non-admin test user without that permission.
4. Seed at least one active product with positive price and valid currency, and one inactive/unavailable product for denial checks.
5. Sign in as admin and verify `/admin`, `/admin/users`, `/admin/memberships`, and `/admin/commerce`.
6. Run a valid user status update, an invalid status submission, a valid membership assignment, a repeated same assignment, and invalid assignment submissions.
7. Verify non-admin and anonymous users cannot access admin pages/actions.

Builder will verify after action:
- admin-only pages/actions are allowed only for `platform.admin`
- status changes are limited to `active`/`inactive`
- membership assignment only accepts configured levels and is idempotent
- `/admin/commerce` shows product/order/payment records without exposing secrets or raw payment method data
- active products appear in `/shop` and inactive products cannot be purchased

Sprint 006 can close with local/code-backed evidence, but live Supabase admin/commerce smoke must carry forward to Sprint 007 until environment and test fixtures are available.

### Stripe Test Checkout And Webhook Replay

What is blocked:
Live/test verification of Stripe checkout-session creation, redirect to Stripe, supported webhook replay, duplicate webhook delivery, and out-of-order/missing metadata replay.

Evidence already checked:
Source inspection confirms checkout validates configuration, active product, price, currency, pending order persistence, safe redirect behavior, and sanitized diagnostics. Webhook verification remains mandatory; supported events reconcile into orders/payments with upserts and duplicate item checks. Name-only process env inspection reported `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` as missing.

Exact user/manual action needed:
Provide safe test-mode Stripe configuration locally or in a test deployment. Do not paste secret values into chat and do not use live payment methods.

Steps:
1. Configure Stripe test-mode server and webhook variables in the local/test environment.
2. Ensure Supabase test configuration and active product fixtures are also available.
3. Start the app and initiate checkout for an active product from `/shop` or `/shop/[slug]`.
4. Complete checkout with a Stripe test card only.
5. Use Stripe CLI or dashboard test events to replay `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, and `checkout.session.expired` against `/api/stripe/webhook`.
6. Replay the same supported event twice to verify no duplicate payment or duplicate order item is created.
7. Send missing-metadata or out-of-order test cases where practical and record the observed order/payment state.

Builder will verify after action:
- pending order and order item exist before Stripe redirect
- checkout session and payment intent IDs attach to the order
- supported webhook events update order/payment statuses predictably
- duplicate delivery is idempotent
- missing/out-of-order metadata is handled safely or logged as a narrow launch blocker
- diagnostics remain non-sensitive

Sprint 006 can close with local/code-backed evidence, but Stripe test checkout and webhook replay must carry forward to Sprint 007 until test-mode access is available.

## Validation Results

| Check | Result | Notes |
|---|---|---|
| `git status --short` | Completed | Dirty worktree remains; unrelated/user-owned changes were not reverted. |
| Admin and commerce source inspection | Completed | Behavior map recorded in this document. |
| Name-only Supabase/Stripe env presence check | Completed | Required process env variables were missing; no values were printed. |
| Secret-fragment scan of Sprint 006 changed diagnostics | Completed | No secret values or fragments found. Matches were sanitized `console.error` calls, boolean webhook-secret configured status, required internal webhook-secret verification use, and display-only ID shortening. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0` | Log stamp `20260711-173521-320`. |
| `npm run lint` via wrapper | `exited 0` | Log stamp `20260711-173528-253`. |
| `npm run build` via wrapper in restricted sandbox | Timed out | Log stamp `20260711-173105-680`; output stopped at the known Next.js startup banner. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0` | Log stamp `20260711-173541-626`; strict build completed and generated 23 routes including `/admin/commerce`. |
| Post-validation process check | Completed | No `node`, `npm`, or `npx` processes remained. |

## Launch Notes

- Keep `/admin/commerce` read-only unless a later sprint explicitly approves commerce mutations.
- Verify product catalogue, checkout, and webhook behavior with Stripe test-mode configuration before production launch.
- Confirm production domain and `NEXT_PUBLIC_SITE_URL` before launch verification.
- Carry Sprint 004 and Sprint 005 live Supabase/RLS/workflow smoke blockers forward alongside Sprint 006 commerce blockers.

---

# Sprint 007 Carry-Forward Note

Sprint 007 did not receive live Supabase admin/commerce fixtures or Stripe test-mode checkout/webhook replay access. The Sprint 006 live admin, commerce, checkout, webhook, and duplicate-delivery cases remain blocked and are carried into the production launch no-go list in `docs/PRODUCTION_LAUNCH_READINESS.md`.

Local smoke verified `/shop`, fallback product detail, checkout missing-slug redirect, and unsigned webhook rejection behavior. Configured active-product checkout, Stripe test session completion, signed supported-event replay, duplicate delivery, and live admin commerce visibility still require the manual setup described in this document and the Sprint 007 launch-readiness report.

---

# Sprint 008 Stripe Env Carry-Forward

Sprint 008 verified `.env.local` has Stripe values with expected test/webhook shapes by category-only inspection and recreated `.env.example` with placeholder-only Stripe setup guidance.

Production Stripe env entries in `.env.vercel.production` are nonblank but not recognizable as direct Stripe key shapes from local file inspection, so production Vercel settings still require operator verification before launch. Stripe test checkout and webhook replay remain required before production deployment.
---

# Sprint 010 Admin/Commerce/Stripe Update

Sprint 010 confirmed anonymous production access to `/admin` and `/admin/commerce` redirects with status `307`, so admin content is not exposed to anonymous users.

Checkout and webhook safety smoke results:

| Case | Result |
|---|---|
| `POST /api/checkout` with empty slug form | `307` |
| `POST /api/stripe/webhook` unsigned | `400` |
| Malformed `POST /api/checkout` with no form content type | `500` |

The malformed checkout request is outside the intended missing-slug form acceptance case and should be considered a future hardening candidate.

Stripe test checkout, signed webhook replay, and duplicate delivery verification remain blocked. Stripe CLI is installed, but Builder did not have a safe test-mode checkout/replay path, endpoint replay setup, or fixtures that could be used without exposing credentials or mutating live payment state.

---

# Sprint 012 Admin/Commerce/Checkout Update

Sprint 012 made a narrow local checkout safety fix and re-ran public/safety smoke.

Verified:

- `app/api/checkout/route.ts` now catches failed `request.formData()` parsing and redirects to `/shop?checkout=missing-product` before product, Supabase, or Stripe work.
- Local malformed checkout POST smoke returned `307`.
- Local missing-slug checkout form smoke returned `307`.
- Production missing-slug checkout form smoke returned `307`.
- Production malformed checkout POST smoke returned `307`.
- Production unsigned webhook smoke returned `400`.

Still blocked:

- Active database-backed Stripe test checkout was not run.
- Signed supported webhook replay was not run.
- Duplicate supported webhook replay was not run.

Evidence checked:

- Stripe CLI `1.40.3` is installed.
- No safe Stripe test-mode checkout/replay target, webhook endpoint setup, Supabase product/order/payment fixtures, or credentials were available without exposing secrets.

Manual action needed:

1. Use Stripe test mode only.
2. Configure a safe local/preview/staging target with test-mode Stripe and Supabase fixtures.
3. Complete checkout for an active database-backed product using a Stripe test card.
4. Replay a supported signed checkout-session event to `/api/stripe/webhook`.
5. Replay the same supported event twice to prove idempotency.
6. Record only non-sensitive order/payment outcomes.

Builder will verify after action:

- checkout session creation
- order/payment reconciliation
- signed webhook acceptance
- duplicate delivery idempotency
- fallback products remain checkout-disabled or safely redirected

---

# Sprint 012C Commerce Route Preservation

Sprint 012C reconstructed a no-deploy baseline candidate at `C:\tmp\pp-012c-baseline-lean-20260714-173135` and verified that `/admin/commerce` remains present in source, build output, and normalized route parity against current production.

Anonymous local smoke against the candidate returned `307` for `/admin/commerce`, preserving the protected admin-commerce boundary. The sprint did not add mutating commerce actions and did not deploy.
---

# Sprint 012D Commerce Route And Checkout Preservation

Sprint 012D committed the reviewed production-equivalent baseline on branch codex/012d-production-baseline at commit $commit.

Commerce and checkout evidence:

- /admin/commerce remains present in source and build output.
- Anonymous local smoke returned 307 for /admin/commerce, preserving the protected admin-commerce boundary.
- Checkout malformed POST smoke returned 307 to /shop?checkout=missing-product.
- Checkout empty/missing slug form smoke returned 307 to /shop?checkout=missing-product.
- No mutating admin-commerce actions were added.
- Active database-backed Stripe test checkout, signed webhook replay, and duplicate delivery verification remain blocked pending safe test-mode access and fixtures.
