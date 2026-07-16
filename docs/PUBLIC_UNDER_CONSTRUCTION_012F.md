# Sprint 012F - Public Under Construction Gate

## Status

Completed locally and deployed to production on 2026-07-16.

Sprint 012F hides the public website behind a reversible under-construction holding page and blocks public checkout initiation while preserving auth, protected-route, health, setup-status, and webhook safety behavior.

## Implemented Holding Page

`/` now renders a full-viewport holding page with:

- brand text: `PNR Precision Performance`
- prominent heading: `Under Construction`
- supplied Thoroughbred cover image
- non-persistent interest CTA text: `Register your interest: opening soon`
- operator sign-in link to `/sign-in`
- `noindex, nofollow` metadata on the public holding page

The supplied source image was copied from:

`C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg`

into the active deployable public asset:

`public/under-construction-thoroughbred.jpg`

The app references the copied public asset only. It does not serve the deployed page from `.release-main/`.

## Route Matrix

| Route | Local result while gate is active | Notes |
|---|---|---|
| `/` | `200` holding page | Contains `Under Construction`, copied Thoroughbred image, and `noindex/nofollow`. |
| `/home` | `307` redirect to `/` | Old marketing home is not exposed. |
| `/contact` | `307` redirect to `/` | Old contact/enquiry content is not exposed. |
| `/shop` | `307` redirect to `/` | Product listing and checkout CTAs are not exposed. |
| `/shop/example-product` | `307` redirect to `/` | Product detail content is not exposed. |
| `POST /api/checkout` | `303` redirect to `/?checkout=under-construction` | Checkout is blocked before Supabase, order persistence, or Stripe session creation. |
| `/sign-in` | `200` sign-in page | Kept available for approved operators/admins. |
| `/auth/callback` | Not changed | No middleware or callback changes were made. |
| `/admin` | `307` redirect to `/sign-in?next=%2Fadmin` for anonymous user | Protected route did not become public. |
| `/portal` | `307` redirect to `/sign-in?next=%2Fportal` for anonymous user | Protected route did not become public. |
| `/data-entry` | `307` redirect to `/sign-in?next=%2Fdata-entry` for anonymous user | Protected route did not become public. |
| `/api/health` | `200` non-sensitive response | Kept available for deployment checks. |
| `/api/setup/status` | `200` non-sensitive response | Kept available for setup checks. |
| `POST /api/stripe/webhook` unsigned body | `400` with `Missing Stripe signature.` | Webhook safety behavior remains intact. |

## Validation Evidence

Commands run from the project root:

| Check | Result |
|---|---|
| `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-012F-public-under-construction-gate.md --check` | `Check passed: 11 FILE section(s) valid.` |
| `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-012F-public-under-construction-gate.md` | Applied 11 planning/sprint files. |
| `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60` | `STATUS: exited 0`, no ESLint warnings or errors. |
| `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120` | `STATUS: exited 0`. |
| sandboxed `npm run build` wrapper | Wrapper exited, but Next build failed with `spawn EPERM`; treated as sandbox process-spawn restriction. |
| approved outside-sandbox bounded `npm run build` wrapper | `STATUS: exited 0`; build compiled successfully and generated 23 routes. |
| local route smoke on `http://127.0.0.1:3012` | Passed matrix above. |

## Personal Data / Provider Boundary

No persistent visitor sign-up storage was added.

No database table, email provider, CRM, mailing-list integration, webhook, third-party data transmission, schema change, auth/RLS change, Stripe reconciliation change, Supabase mutation, Vercel setting change, DNS change, production data mutation, push, PR, or deployment was performed.

The interest CTA is non-submitting text only. The only active public action on the holding page is the existing operator sign-in link.

## Reopening Notes

To reopen the public website in a future approved sprint:

1. Restore the previous public content in `app/page.tsx`.
2. Restore `/home`, `/contact`, `/shop`, and `/shop/[slug]` page rendering.
3. Restore the original checkout handler behavior in `app/api/checkout/route.ts` after Stripe/Supabase readiness is confirmed.
4. Remove or revise the holding-page `noindex/nofollow` metadata.
5. Re-run lint, TypeScript, build, and public checkout/webhook smoke before deployment.

## Superseded Manual Intervention: Production Deployment

Status: superseded. Production deployment was later authorized and completed; see `Production Deployment And Smoke` below.

Evidence checked:

- Sprint 012F local implementation and route smoke passed.
- Production deployment was explicitly out of scope unless the user authorizes it.
- No Vercel deployment command was run.

Exact user/operator action needed:

Authorize production deployment of the current Sprint 012F workspace state to the existing Vercel production project when ready.

Step-by-step deployment instructions after authorization:

1. Confirm the current working tree contains only intended Sprint 012F changes plus pre-existing baseline changes.
2. Run lint, TypeScript, and bounded build again.
3. Deploy to Vercel production from the approved local project state.
4. Smoke `https://precisionperformance.com.au/`, `/home`, `/contact`, `/shop`, `/shop/example-product`, `/api/health`, `/api/setup/status`, anonymous `/admin`, anonymous `/portal`, anonymous `/data-entry`, `POST /api/checkout`, and unsigned `POST /api/stripe/webhook`.
5. Record the Vercel deployment ID and production smoke results in planning docs.

Builder will verify after action:

- production `/` shows only the Thoroughbred under-construction page
- production public marketing/shop/contact/product routes do not expose old website content
- production checkout is blocked before Supabase or Stripe work
- protected routes remain non-public
- health/setup-status and unsigned webhook safety behavior remain acceptable
## Production Deployment And Smoke

Production deployment was authorized and completed on 2026-07-16.

Deploy package source:

`C:\tmp\pp-012f-prod-source-20260716-1328`

The deploy package was created from the Sprint 012D production baseline and overlaid only the Sprint 012F public-gate files plus `public/under-construction-thoroughbred.jpg`. The temp deploy package excluded `.git`, `node_modules`, `.next`, and `.env.vercel.production`; only `.env.example` remained.

Deploy result:

| Field | Value |
|---|---|
| Deployment ID | `dpl_C1sf84a38gg7r7ureEufTdhiwPtX` |
| Production URL | `https://pnr-precision-performance-j728am0y9-rankin007s-projects.vercel.app` |
| Canonical alias | `https://precisionperformance.com.au` |
| Target | production |
| Ready state | `READY` |
| Build | Vercel build passed; 23 routes generated |

Production smoke against `https://precisionperformance.com.au`:

| Route | Result |
|---|---|
| `GET /` | `200`; contains `Under Construction`, copied Thoroughbred image reference, `noindex`, `nofollow`, and no old shop text |
| `GET /home` | `307` to `/`; no old website content |
| `GET /contact` | `307` to `/`; no old website content |
| `GET /shop` | `307` to `/`; no product listing or checkout CTA |
| `GET /shop/example-product` | `307` to `/`; no product detail content |
| `POST /api/checkout` | `303` to `https://precisionperformance.com.au/?checkout=under-construction` |
| `GET /sign-in` | `200`; operator sign-in remains available |
| `GET /admin` anonymous | `307` to `/sign-in?next=%2Fadmin` |
| `GET /portal` anonymous | `307` to `/sign-in?next=%2Fportal` |
| `GET /data-entry` anonymous | `307` to `/sign-in?next=%2Fdata-entry` |
| `GET /api/health` | `200`; non-sensitive health response |
| `GET /api/setup/status` | `200`; non-sensitive setup response |
| unsigned `POST /api/stripe/webhook` | `400`; `Missing Stripe signature.` |

Sprint 012F is now production-deployed and production-smoked. Remaining live acceptance blockers from earlier sprints are unchanged: Supabase remote migration/checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay.
