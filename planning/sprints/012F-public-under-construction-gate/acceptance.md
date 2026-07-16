# Sprint 012F - Public Under Construction Gate Acceptance

## Required Acceptance Criteria

- Architect Pack 012F is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012F.
- Builder reads the Sprint 012F four-file sprint set before implementation.
- Public home page shows only the supplied Thoroughbred image as the cover page, with `Under Construction` written prominently across the page.
- Public marketing/shop/contact/product pages no longer reveal the current website content.
- Public checkout initiation is blocked or hidden safely.
- Existing protected admin/portal/data-entry routes do not become public.
- Required auth callback, health, setup-status, and webhook safety behavior is not broken.
- Public holding surface uses `noindex, nofollow` or equivalent metadata/header behavior.\n- The supplied image `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` is copied into the active app public assets and the deployed page references the copied public asset, not `.release-main/`.
- No new persistent visitor sign-up storage is added without explicit approval.
- No new email provider, CRM, mailing-list provider, webhook, or third-party data transmission is added without explicit approval.
- No `.env*` values, secrets, tokens, private keys, passwords, connection strings, or secret fragments are printed or stored.
- No schema, RLS, auth, billing, Stripe reconciliation, production data, DNS, or Vercel project settings are changed.
- No current website source files are deleted.
- Lint, TypeScript, and build are run and recorded, or blocked with exact evidence and manual-intervention steps.
- Local public-route smoke confirms the website is hidden.
- Production deployment is not performed unless explicitly authorized.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Public Route Acceptance Matrix

| Route | Accepted result |
|---|---|
| `/` | Thoroughbred image cover page only, with `Under Construction` written across it |
| `/home` | Redirect/rewrite/holding page; no old website content |
| `/contact` | Redirect/rewrite/holding page or safe interest-only page |
| `/shop` | Redirect/rewrite/holding page; no products or checkout CTA |
| `/shop/[slug]` | Redirect/rewrite/holding page; no product details |
| `/api/checkout` | Checkout blocked safely while under construction |
| `/sign-in` | Documented and safe; available only if needed for operator/admin access |
| `/auth/callback` | Not broken if sign-in remains available |
| `/api/health` | Non-sensitive response remains acceptable |
| `/api/setup/status` | Non-sensitive response remains acceptable if kept public |
| `/api/stripe/webhook` | Not broken by public gate |
| `/admin/*`, `/portal/*`, `/data-entry/*` | Not public |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
