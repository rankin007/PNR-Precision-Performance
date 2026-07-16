# Sprint 012B Production Source Provenance Update

Sprint 012B status: complete as investigation; no deployment performed.

Builder confirmed production deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` remains the live Ready deployment for `https://precisionperformance.com.au` and aliases. Vercel JSON output includes `admin/commerce`, confirming current production behavior includes `/admin/commerce`.

Source provenance finding:

- Vercel JSON metadata did not expose a Git source/commit/ref field.
- Clean `8bf310a` and the temporary `C:\tmp\pp-012a-clean-20260714-165007` tree are not production-equivalent because they lack `/admin/commerce`.
- `.release-main` is not production-equivalent because it has `/admin/commerce` but also extra routes absent from live production.
- The current dirty workspace is the closest local route-shape match, so production was most likely deployed from a dirty local filesystem state during Sprint 009.

Launch readiness impact:

- Do not deploy `HEAD + checkout fix`; it can remove production behavior.
- Do not deploy the full dirty workspace unless explicitly approved as the intended source state.
- Safest next path is to reconstruct a production-equivalent baseline candidate, verify route/source parity, add the checkout fix only, then request explicit deployment approval.

---
# Sprint 012 Live Acceptance Closeout And Safety Hardening Update

Sprint 012 status: partial with documented blockers.

Builder applied Architect Pack 012, made a narrow local checkout safety fix in `app/api/checkout/route.ts`, validated the fix locally, and re-ran production public/safety smoke on 2026-07-14. No deployment, rollback, DNS change, project-setting change, schema/RLS/auth change, production data mutation, or live Stripe financial action was performed.

Verified in Sprint 012:

- Branch/revision remained `develop` / `8bf310a`.
- Vercel production inspect reported deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` as `Ready` with launch aliases attached.
- Name-only `.env*` inspection found expected app variable names; no values or fragments were printed.
- Checkout malformed-body handling is hardened locally: unreadable form parsing now redirects to `/shop?checkout=missing-product` before product, Supabase, or Stripe work.
- Local smoke showed malformed checkout POST and missing-slug checkout POST return `307`; unsigned webhook returned `400`; health/setup returned `200`.
- `npm run lint` and TypeScript passed through the bounded wrapper.
- Restricted build was blocked by `spawn EPERM`; approved outside-sandbox bounded build exited `0` and generated 23 routes.
- Production smoke returned `200` for `/`, `/shop`, `/sign-in`, `/api/health`, and `/api/setup/status`; `307` for callback fallback, checkout missing slug, checkout malformed body, and anonymous protected routes; and `400` for unsigned webhook.

Still blocked after Sprint 012:

- Remote Supabase migration application/checks remain blocked because no local `supabase` CLI, `psql`, dashboard-safe path, or other approved remote SQL execution path was available.
- Authenticated member/RLS/horse/data-entry/admin smoke remains blocked because no safe launch test sessions, users, or assigned/unassigned horse fixtures were available to Builder.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification remain blocked. Stripe CLI `1.40.3` is installed, but no safe test-mode checkout/replay target, endpoint setup, fixtures, or credentials were available without exposing secrets.

Manual intervention remains required for Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay before deployed-MVP live acceptance can be called complete.

---
# Sprint 011 Done Realignment Note

Sprint 011 did not change production deployment, code, schema, auth, Stripe, RLS, or live data. It clarified that the production app can remain live while still not meeting the expanded trainer-ready Definition of Done in `planning/DEFINITION_OF_DONE.md`.

The Sprint 010 live acceptance blockers remain separate from the larger Done target:

- Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay are still live acceptance gates for the deployed MVP shell.
- Mobile biochemistry test capture, voice notes, uploads, scoring, recommendations, Table of Knowledge content, trends, and saved chart behavior are forward roadmap work for Sprints 013-016 after Sprint 012 closes safety/live acceptance.
# Production Launch Readiness

# Sprint 010 Live Acceptance Closeout Update

Sprint 010 status: partial with documented blockers.

Builder applied Architect Pack 010 and re-ran safe live acceptance checks on 2026-07-12. Production remains live on Vercel deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` at `https://precisionperformance.com.au`.

Verified in Sprint 010:

- Local validation: lint exited `0`, TypeScript exited `0`, restricted build repeated the known timeout, and the approved unsandboxed bounded build exited `0` with 23 routes.
- Vercel production inspect: deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` is `Ready`, target `production`, with launch aliases attached.
- Production public/safety smoke by status code: `/`, `/shop`, `/sign-in`, `/api/health`, and `/api/setup/status` returned `200`; `/auth/callback` returned `307`; unsigned `/api/stripe/webhook` returned `400`; `/api/checkout` with empty slug form returned `307`.
- Anonymous protected-route smoke: `/portal`, `/data-entry`, `/admin`, and `/admin/commerce` returned `307`, confirming protected content was not exposed to anonymous requests.
- Name-only env inspection found expected app variable names in `.env.example`, `.env.local`, and `.env.vercel.production`; no values were printed.

Still blocked after Sprint 010:

- Remote Supabase migration application and membership/permission existence checks remain blocked because no `supabase` CLI, `psql`, or other safe remote SQL execution path was available locally.
- Authenticated member/RLS/horse/data-entry/admin smoke remains blocked because no safe launch test sessions, users, or assigned/unassigned horse fixtures were available to Builder.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification remain blocked. Stripe CLI is installed, but checkout/replay needs safe test-mode account access, endpoint/replay setup, and fixtures; Builder did not run any live payment mutation.
- Vercel filtered error-log scan could not be completed because the installed CLI rejected `--since`/`--level` filters in non-follow mode; Builder did not start an open-ended log follow.

Manual intervention remains required for the three live acceptance gates below: apply the Supabase launch migration, provide launch test users/fixtures for authenticated smoke, and run Stripe test checkout plus signed webhook replay in test mode.

Sprint 007 verified the local/source-backed launch state for Precision Performance and separated proven readiness from launch blockers that still require user or operator action. No production deployment, DNS change, production project-setting change, destructive data operation, or live Stripe financial operation was performed.

## Final Go / No-Go Status

Status: No-go for production launch until the manual intervention items below are completed.

Local code readiness is green: public/setup/shop/auth fallback routes smoke locally, lint passes, TypeScript passes, and the known-good unsandboxed bounded build passes. Live launch readiness is not fully proven because production domain, remote Vercel environment completeness, Supabase test users/fixtures/RLS checks, authenticated device smoke, Stripe test checkout, and webhook replay are still unavailable in this Builder run.

## Launch Surface Map

| Surface | Current evidence | Sprint 007 result |
|---|---|---|
| Deployment target | `vercel.json` declares Next.js; `.vercel/project.json` links project `pnr-precision-performance`. | Local evidence confirms Vercel as canonical target; production intent/domain still needs user confirmation. |
| Health/readiness | `/api/health` and `/api/setup/status` report environment labels and configured/missing checkpoints only. | Local smoke returned `200`; output is non-sensitive by source inspection. |
| Public site | `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`. | Local smoke for `/`, `/shop`, and fallback product detail returned `200`; unavailable product returned `404`. |
| Auth | `/sign-in`, `/auth/callback`, OTP action, portal/admin/data-entry guards. | `/sign-in` returned `200`; `/auth/callback` missing state redirected safely. Successful sign-in remains blocked by missing test user/session access. |
| Portal | `/portal`, `/portal/horses`, `/portal/horses/[horseId]`, `/portal/reports`. | Code-backed guards remain in place; live member/RLS smoke remains blocked. |
| Data entry | `/data-entry`, `/data-entry/feeding`, `/data-entry/track`, `/data-entry/submissions`, correction detail. | Code-backed operational write guard remains in place; live assigned-horse workflow/device smoke remains blocked. |
| Admin | `/admin`, `/admin/users`, `/admin/memberships`, `/admin/commerce`. | Code-backed admin guard remains in place; live admin/non-admin smoke remains blocked. |
| Checkout | `/api/checkout`, product pages, order persistence helpers. | Missing slug local smoke redirected safely; configured Stripe test checkout remains blocked. |
| Webhook | `/api/stripe/webhook`, commerce reconciliation helpers. | Missing-signature/config local smoke returned a safe error; signed Stripe replay and duplicate delivery remain blocked. |

## Deployment And Environment Evidence

| Check | Result | Evidence |
|---|---|---|
| Vercel config | Passed local inspection | `vercel.json` uses `framework: nextjs`; GitHub integration enabled. |
| Vercel project link | Passed local inspection with confirmation needed | `.vercel/project.json` names `pnr-precision-performance`; user still needs to confirm it is the intended production project. |
| Production domain | Blocked | No local evidence confirms the production domain or final `NEXT_PUBLIC_SITE_URL`. |
| Environment variable contract | Passed name-only file inspection | `.env.example`, `.env.local`, and `.env.vercel.production` contain the expected app variable names; no values were printed. |
| Current shell process env | Missing | Required Supabase, Stripe, site URL, and Vercel marker names were missing from the current Builder process environment. |
| Remote Vercel env completeness | Blocked | No remote Vercel access or production-setting authorization was used. |

## Local Smoke Matrix

Temporary dev server smoke ran unsandboxed on `127.0.0.1:3109` after sandboxed startup failed with `spawn EPERM`. The server was stopped after the checks.

| Case | Result | Notes |
|---|---|---|
| `GET /` | Passed, `200` | Public home route loads. |
| `GET /shop` | Passed, `200` | Shop route loads. |
| `GET /shop/performance-review-pack` | Passed, `200` | Fallback product detail route loads. |
| `GET /shop/not-a-real-product` | Passed, `404` | Unavailable product is not shown. |
| `GET /sign-in` | Passed, `200` | Sign-in page loads. |
| `GET /api/health` | Passed, `200` | Non-sensitive health response. |
| `GET /api/setup/status` | Passed, `200` | Non-sensitive readiness checkpoints. |
| `GET /auth/callback` without callback state | Passed, `307` | Redirects safely. |
| `POST /api/checkout` without slug | Passed, `307` | Redirects to missing-product state. |
| `POST /api/stripe/webhook` without signed event | Passed, `400` | Rejects unsafe/unsigned webhook request. |

## Supabase / Auth / RLS Results

| Case | Result | Notes |
|---|---|---|
| Anonymous portal/admin/data-entry boundaries | Code-backed; live partial | Guards route through signed-in/admin/operational write context. Full browser verification needs configured test sessions. |
| Active member portal access | Blocked live | Requires Supabase test user, active app/member profile, membership assignment, and session. |
| Assigned horse visibility | Blocked live | Requires assigned and unassigned horse fixtures plus non-destructive RLS verification. |
| Record writer data-entry access | Blocked live | Requires `horse.records.write` role fixture and authenticated smoke. |
| Read-only member data-entry denial | Blocked live | Requires read-only member fixture and authenticated smoke. |
| Remote RLS select/write-boundary checks | Blocked live | Requires permission to execute non-destructive checks against target Supabase project. |

## Admin / Commerce / Stripe Results

| Case | Result | Notes |
|---|---|---|
| Admin gate and admin pages | Code-backed; live blocked | `platform.admin` guard remains in source. Live admin/non-admin users unavailable. |
| User status update | Code-backed; live blocked | Action is limited to `active`/`inactive`; live fixture unavailable. |
| Membership assignment | Code-backed; live blocked | Validates email, configured level, existing user, and idempotent assignment; live fixture unavailable. |
| Admin commerce read-only visibility | Code-backed; live blocked | Page builds and remains admin-gated; live order/payment data unavailable. |
| Database-backed active products | Code-backed; live blocked | Source queries active products; production catalogue/pricing still needs confirmation. |
| Stripe checkout happy path | Blocked live | Requires Supabase product/order fixtures and Stripe test-mode env/access. |
| Stripe webhook replay | Blocked live | Requires Stripe CLI/dashboard replay to the target endpoint. |
| Duplicate delivery verification | Blocked live | Requires replaying a supported event twice against test data. |

## Source Fix Made

`app/shop/[slug]/page.tsx` now shows a generic catalogue-load failure message instead of rendering a raw product-load error string to visitors. This keeps launch failure states non-sensitive while preserving checkout pause behavior.

## Manual Intervention Required

### 1. Confirm Production Target And Domain

What is blocked: final production target/domain and `NEXT_PUBLIC_SITE_URL` expectation.

Evidence already checked: local Vercel config and project link point to `pnr-precision-performance`; no DNS/domain evidence was available.

Exact action needed:
1. Confirm whether Vercel project `pnr-precision-performance` is the production project.
2. Confirm the canonical production domain.
3. Set `NEXT_PUBLIC_SITE_URL` in the relevant Vercel environment to that domain.
4. Do not paste environment values into chat.

Builder will verify after action: deployment docs and setup/status evidence can be updated with confirmed target/domain and non-secret configured/missing status.

Sprint 007 can close as a no-go launch-readiness report, but production launch cannot proceed until this is confirmed.

### 2. Verify Remote Vercel Environment Completeness

What is blocked: production/staging environment completeness.

Evidence already checked: env files contain required variable names; current Builder process env was missing required Supabase/Stripe/site URL names; remote Vercel settings were not accessed.

Exact action needed:
1. In Vercel, open the target project environment variable settings.
2. Confirm production and preview/staging values exist for required app variables listed in `docs/ENVIRONMENT.md`.
3. Confirm secret variables are scoped server-side where applicable.
4. Do not expose values or screenshots containing values.

Builder will verify after action: non-secret configured/missing status through `/api/setup/status` and route smoke in the target deployment.

### 3. Run Supabase Auth, RLS, And Fixture Smoke

What is blocked: live auth/RLS/member/admin/horse workflow proof.

Evidence already checked: source guards and RLS-backed flow maps are documented in Sprint 004-005 evidence docs; local authenticated test sessions were unavailable.

Exact action needed:
1. Configure a safe local, preview, or staging environment with the project Supabase variables.
2. Apply current migrations to the target database.
3. Create or identify users for admin, active record writer, active read-only member, inactive/non-member, and anonymous cases.
4. Seed one assigned horse for the writer and one unassigned horse for denial checks.
5. Verify `/portal`, horse list/detail, `/data-entry`, daily record, feeding log, track session, submissions review, and correction flows on phone and desktop widths.
6. Run non-destructive RLS checks for expected select/write boundaries.

Builder will verify after action: route outcomes, RLS boundaries, and workflow results can be recorded without storing credentials.

### 4. Run Stripe Test Checkout And Webhook Replay

What is blocked: Stripe test/live-ready checkout and webhook reconciliation proof.

Evidence already checked: checkout and webhook source paths validate configuration, active products, pricing, currency, pending order persistence, signature verification, supported event handling, and duplicate-friendly reconciliation.

Exact action needed:
1. Configure Stripe test-mode variables and webhook secret in a safe local/preview environment.
2. Ensure Supabase product/order/payment fixtures are available.
3. Complete checkout for an active product using a Stripe test card only.
4. Replay supported checkout-session events to `/api/stripe/webhook`.
5. Replay the same supported event twice.
6. Record order/payment outcomes without exposing secrets or raw payment details.

Builder will verify after action: pending order, checkout session, payment intent, order status, payment status, and duplicate delivery behavior.

### 5. Authorize Production Deployment Separately

What is blocked: production deployment or promotion.

Evidence already checked: no production deployment was started during Sprint 007.

Exact action needed:
1. Provide explicit production deployment/promotion authorization.
2. Confirm the target project, branch/version, domain, and rollback target.
3. Confirm Supabase and Stripe test checks have passed first.

Builder will verify after action: production health/setup endpoints, public/auth/admin/shop smoke, and rollback readiness.

## Launch Runbook

1. Confirm production Vercel project and domain.
2. Confirm production and preview/staging environment variables by name/presence only.
3. Run the known-good validation sequence locally: lint, TypeScript, build outside restricted sandbox if needed.
4. Run preview deployment smoke before production promotion.
5. Verify `/api/health` and `/api/setup/status` in the target environment.
6. Verify public pages and shop fallback/active product behavior.
7. Verify sign-in with the launch test users.
8. Verify portal, assigned horse visibility, reports, data-entry create/correction flows, and denial paths.
9. Verify admin pages/actions and read-only commerce visibility.
10. Verify Stripe test checkout and signed webhook replay, including duplicate delivery.
11. Record client acceptance against the checklist below.
12. Promote/deploy production only after explicit authorization.

## Rollback Notes

- Vercel rollback: use the previous known-good deployment in the Vercel project and promote it back to production.
- Environment rollback: restore the previous Vercel environment variable set by name; never export or paste values into docs/chat.
- Database rollback: do not run destructive rollback SQL without a dedicated approved sprint and backup confirmation.
- Stripe rollback: disable or rotate only test/live configuration through Stripe dashboard with explicit authorization; do not change live payment behavior casually.
- App rollback trigger: failed health/setup checks, failed auth/RLS boundary checks, checkout/webhook reconciliation failures, or client no-go on acceptance.

## Client Acceptance Checklist

| Item | Status |
|---|---|
| Production project confirmed | Pending user/operator action |
| Production domain confirmed | Pending user/operator action |
| Environment readiness confirmed in target deployment | Pending user/operator action |
| Public site smoke passed in target deployment | Pending target deployment |
| Auth sign-in passed with real user | Pending Supabase test user |
| Portal permission boundaries passed | Pending Supabase/RLS smoke |
| Data-entry workflows passed on phone and desktop | Pending Supabase fixtures and device smoke |
| Admin workflows passed | Pending admin test user/fixtures |
| Active product catalogue confirmed | Pending business/product confirmation |
| Stripe test checkout passed | Pending Stripe test access |
| Webhook replay and duplicate delivery passed | Pending Stripe replay access |
| Rollback path confirmed | Pending production target confirmation |
| Client accepts MVP as live-ready | Pending all above |

## Validation Summary

| Check | Result |
|---|---|
| `git status --short` | Completed; dirty worktree remains. |
| Deployment/config/source inspection | Completed. |
| Name-only environment process check | Completed; required names missing from Builder process. |
| Env file name-only inspection | Completed; expected variable names present in env files. |
| Local dev route smoke | Passed unsandboxed on port 3109; sandboxed dev startup failed with `spawn EPERM`. |
| Secret-fragment scan | Completed; matches were historical docs/planning literal pattern references only, not secret values. |
| `npm run lint` via wrapper | `exited 0`; log stamp `20260711-175550-421`. |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0`; log stamp `20260711-175557-729`. |
| `npm run build` via wrapper in restricted sandbox | Timed out at Next startup banner; log stamp `20260711-175604-444`. |
| `npm run build` via wrapper outside restricted sandbox | `exited 0`; log stamp `20260711-175914-324`; generated 23 routes. |
| Post-validation process check | Completed; no `node`, `npm`, or `npx` processes remained. |
---

# Sprint 008 Launch Supabase And Stripe Env Update

Sprint 008 prepared the launch database/env shape after the user confirmed Vercel project `pnr-precision-performance` and confirmed these valid launch domains:

- `https://precisionperformance.com.au`
- `https://www.precisionperformance.com.au`
- `https://pnr-precision-performance.vercel.app`

## Supabase Membership Shape

Added `supabase/migrations/0008_launch_membership_permission_seeds.sql` and regenerated `supabase/bootstrap/remote-init.sql`.

The launch membership shape is documented in `docs/SUPABASE_LAUNCH_MEMBERSHIPS.md` and includes:

- `owner`
- `trainer`
- `stable-staff`
- `staff` legacy alias
- `commerce-admin`
- `membership-admin`
- `admin`

The migration is additive and idempotent. It updates launch labels and inserts missing permission mappings without deleting existing assignments, users, horses, products, orders, payments, or custom mappings.

## Stripe Env Status

Name/shape-only checks found:

- `.env.local`: Stripe publishable, secret, and webhook values are present with expected test/webhook shapes.
- `.env.vercel.production`: Stripe publishable, secret, and webhook names are nonblank but not recognizable as direct Stripe key shapes from local file inspection. This may be expected if values are platform-managed or transformed, but production Vercel settings still need operator verification before launch.
- `.env.example`: recreated with placeholder-only Stripe test-mode guidance.

No secret values or fragments were printed or stored.

## Remaining Blockers

- Remote Supabase migration application is not performed in this sprint.
- Production Vercel env values still need operator verification in the Vercel dashboard by configured/missing status only.
- Stripe test checkout and signed webhook replay still need to run against a configured local/preview target.
- Production deployment/promotion remains blocked until explicitly authorized after verification.

---

# Sprint 009 Production Launch Update

Sprint 009 received explicit user authorization for production deployment, created and applied Architect Pack 009, and deployed the current app to Vercel production.

## Current Go / No-Go Status

Status: production deployment complete; live customer workflow acceptance remains partial.

The production app is live at `https://precisionperformance.com.au`, with `https://www.precisionperformance.com.au` and `https://pnr-precision-performance.vercel.app` also returning `200`.

Production public/safety smoke passed. Full live acceptance still needs remote Supabase migration application, authenticated RLS/member/horse workflow smoke, and Stripe test checkout/webhook replay.

## Sprint 009 Deployment Result

| Item | Result |
|---|---|
| Vercel project | `pnr-precision-performance` |
| Production URL | `https://precisionperformance.com.au` |
| Deployment URL | `https://pnr-precision-performance-7j3jqvvw7-rankin007s-projects.vercel.app` |
| Deployment id | `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` |
| Vercel status | Ready |
| Local branch/revision | `develop` / `8bf310a` |
| Error log scan | No logs found for branch `develop` in the last hour |

## Sprint 009 Smoke Matrix

| Case | Result |
|---|---|
| `GET /` | Passed, `200` |
| `GET /shop` | Passed, `200` |
| `GET /sign-in` | Passed, `200` |
| `GET /api/health` | Passed, `200` |
| `GET /api/setup/status` | Passed, `200` |
| `GET /auth/callback` without callback state | Passed, `307` to `/portal` |
| `POST /api/checkout` with empty form body | Passed, `307` to `/shop?checkout=missing-product` |
| `POST /api/stripe/webhook` unsigned request | Passed, `400` |
| Secondary aliases | Passed, both returned `200` |

## Manual Intervention Still Required

### 1. Apply Supabase Launch Migration Remotely

What is blocked: remote application of `supabase/migrations/0008_launch_membership_permission_seeds.sql`.

Evidence already checked: the migration is additive/idempotent locally and included in `supabase/bootstrap/remote-init.sql`; no `supabase` CLI was available in this Builder run.

Exact action needed:
1. Use the Supabase dashboard SQL editor or an approved Supabase CLI environment for the production project.
2. Apply `supabase/migrations/0008_launch_membership_permission_seeds.sql`.
3. Do not paste connection strings, service role keys, or SQL editor screenshots containing secrets into chat.

Builder will verify after action: configured/missing status plus non-destructive membership/permission existence checks.

### 2. Run Authenticated Supabase/RLS Workflow Smoke

What is blocked: live member/admin/assigned-horse acceptance.

Evidence already checked: public production smoke passed; source guards and local validation are green.

Exact action needed:
1. Create or confirm safe launch test users for admin, record writer, read-only member, inactive/non-member, and anonymous cases.
2. Seed assigned and unassigned horse fixtures.
3. Verify `/portal`, horse list/detail, `/data-entry`, daily/feeding/track flows, submissions review, corrections, admin pages, and denial paths on phone and desktop widths.

Builder will verify after action: route outcomes, RLS boundaries, and workflow results without storing credentials.

### 3. Run Stripe Test Checkout And Webhook Replay

What is blocked: live checkout/webhook reconciliation proof.

Evidence already checked: production env names exist as encrypted Vercel values; unsigned webhook rejects safely; missing checkout slug redirects safely.

Exact action needed:
1. Use Stripe test mode only.
2. Complete checkout for an active product with a Stripe test card.
3. Replay supported checkout-session events to `/api/stripe/webhook`.
4. Replay the same supported event twice to verify duplicate delivery behavior.
5. Record order/payment outcomes without exposing raw payment details or secrets.

Builder will verify after action: order/payment status and duplicate delivery behavior.

---

# Live Item Acceptance

On 2026-07-12, the user accepted the remaining live items as known follow-up conditions after production deployment.

Accepted follow-up items:

- Remote application of `supabase/migrations/0008_launch_membership_permission_seeds.sql`.
- Authenticated Supabase/RLS/member/horse workflow smoke with launch users and fixtures.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification.

This acceptance does not change the evidence status: those checks were not independently completed by Builder in Sprint 009. It records that production may remain live with these items acknowledged for follow-up verification.





---

# Sprint 012C Baseline Candidate Readiness

Sprint 012C reconstructed a no-deploy candidate at `C:\tmp\pp-012c-baseline-lean-20260714-173135`.

Status: candidate ready for explicit deployment approval, with one local smoke limitation caused by intentionally excluded `.env*` files.

Key findings:

- Current production remains `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` on `https://precisionperformance.com.au`.
- Candidate route parity against normalized production output is exact: 25 production routes and 25 candidate routes, with no missing or extra routes.
- `/admin/commerce` is preserved.
- Known `.release-main` extra routes are absent.
- Checkout malformed-body guard is present and locally smoked.
- No deployment was performed.

Safest next action: request explicit approval to deploy this candidate, or keep deployment paused if the team wants a committed Git baseline first.
---

# Sprint 012D Deployment Approval Package

Status: ready for explicit deployment approval, not deployed.

- Branch: `codex/012d-production-baseline`
- Original app baseline commit: `8a0d22b`
- Current branch head: `358e1fc`
- Candidate source: `C:\tmp\pp-012c-baseline-lean-20260714-173135`
- Route parity: preserved from Sprint 012C evidence, 25 normalized production routes and 25 baseline build routes, no missing or extra routes.
- `/admin/commerce`: present and protected; anonymous local smoke returned `307` to sign-in.
- Checkout guard: `readCheckoutFormData()` catches malformed/unreadable form data and redirects to `/shop?checkout=missing-product`.
- Known `.release-main` extras remain absent: `/admin/setup`, `/onboarding`, `/member-experience`, `/platform-stack`, `/preview-access`.
- Secret handling: `.env*` files were not staged in the Sprint 012D app-baseline commit; no secret values or fragments were printed or stored.
- Build artifacts/caches/temp files: `.next`, `node_modules`, validation logs, dev-server logs, and `.vercel` were not staged.
- Wrapper hardening: current branch head `358e1fc` adds `.validation-logs/`, `-LogDir`, and user-temp fallback behavior for temporary worktrees.

Validation:

| Check | Result |
|---|---|
| `npm run lint` via wrapper outside restricted sandbox | `exited 0`; log stamp `20260715-061311-983` |
| `npx tsc --noEmit --incremental false` via wrapper outside restricted sandbox | `exited 0`; log stamp `20260715-061351-005` |
| `npm run build` via wrapper outside restricted sandbox | `exited 0`; log stamp `20260715-061405-697`; build output included 25 app routes including `/admin/commerce` |
| Local smoke on port `3126` | `/`, `/shop`, `/sign-in`, `/api/health`, `/api/setup/status` returned `200`; anonymous `/admin/commerce` returned `307`; malformed checkout POST returned `307`; unsigned webhook returned `503` because `.env*` files were intentionally absent |
| Local checkout empty POST on port `3127` | Returned `307` to `/shop?checkout=missing-product` |
| Wrapper hardening proof | Main workspace `npm run lint` exited `0`; Sprint 012D temp worktree `node -v` and `npm run lint` exited `0` with `LOG_DIR_FALLBACK` |

Manual/live acceptance blockers unchanged: remote Supabase migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay still require safe operator access, launch test users, fixtures, and test-mode replay path.
