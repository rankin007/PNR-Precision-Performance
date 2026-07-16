# Sprint 012F - Public Under Construction Gate Blueprint

## Execution Shape

Sprint 012F is a public-visibility lockdown sprint. It should be narrow, reversible, and easy to remove when the full website is ready.

Run the work in this order:

1. Establish current branch, commit, and dirty status.
2. Inspect current public route surfaces.
3. Choose the smallest safe gate strategy.
4. Implement the holding page and public route hiding.
5. Block public checkout entry.
6. Add noindex metadata for the holding surface.
7. Validate routes, lint, TypeScript, and build.
8. Document route behavior and deployment stop point.
9. Update planning state/status/briefing.

## Recommended Implementation Approach

Prefer a simple, reversible application-level maintenance gate.

Recommended shape:

- `app/page.tsx` becomes the public `Under Construction` cover page.\n- Builder copies `C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg` into the active app `public/` folder, for example `public/under-construction-thoroughbred.jpg`, and references the copied asset from the page.
- public marketing/shop/contact pages redirect to `/` or render the same holding page.
- public checkout initiation is blocked with a safe maintenance response or redirect.
- protected admin/portal/data-entry pages keep existing guards and are not made public.
- `middleware.ts` may be added only if it makes the allow/deny list clearer and does not break auth callback, health checks, or webhook handling.

## Holding Page Cover Asset\n\nUse the supplied image as the visual cover for the holding page:\n\n`C:\Users\rrank\OneDrive\PNR Precision Performance\.release-main\public\Thoroughbred-scaled.jpg`\n\nBuilder should copy this image into the active app `public/` folder and reference the copied asset. Do not serve the deployed page from `.release-main/`.\n\nThe page should be a full-page or first-viewport cover using this image, with `Under Construction` written prominently across the page in readable, high-contrast text. The image should remain recognizable as the primary placeholder.\n\n## Holding Page Content

The page should be professional and plain:

- brand: `PNR Precision Performance`
- heading: `Under Construction`, written across the image/page
- short message that the platform is being prepared and is not yet publicly available
- sign-up/interest CTA
- optional contact email or mailto link if an existing approved contact address is present in source/docs
- no pricing, shop, checkout, portal, admin, or product claims beyond what is already safe in planning docs

If no approved email/list destination exists, Builder should use a non-persistent CTA such as `Register your interest` via `mailto:` or a clearly non-submitting placeholder. Do not invent a storage backend.

## Route Policy

Builder must document final behavior for at least:

| Route | Expected public behavior while under construction |
|---|---|
| `/` | Thoroughbred image cover page with `Under Construction` written across it |
| `/home` | Redirect/rewrite to `/` or holding page |
| `/contact` | Redirect/rewrite to `/` or holding page unless used only as safe interest CTA |
| `/shop` | Redirect/rewrite to `/` or holding page |
| `/shop/[slug]` | Redirect/rewrite to `/` or holding page |
| `/api/checkout` | Public checkout blocked safely |
| `/sign-in` | Keep available only if needed for operator/admin access; otherwise document behavior |
| `/auth/callback` | Must not break auth callback if sign-in remains available |
| `/api/health` | May remain available for non-sensitive health checks |
| `/api/setup/status` | May remain available if non-sensitive |
| `/api/stripe/webhook` | Must not be broken by public-page gating |
| `/admin/*`, `/portal/*`, `/data-entry/*` | Must not become public |

## Validation

Required local checks:

- `git status --short`
- route/source inventory before and after change
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

Required local smoke, where feasible:

- `GET /` shows only the Thoroughbred image cover page with `Under Construction` written across it
- `GET /home` does not show old website
- `GET /shop` does not show shop/product listing
- `GET /shop/{known-or-placeholder-slug}` does not show product detail
- `GET /contact` does not show old public site content unless explicitly retained as safe interest page
- `POST /api/checkout` cannot create public checkout and returns/redirects safely
- `GET /sign-in` behavior documented
- anonymous protected routes remain denied/redirected
- `/api/health` remains non-sensitive
- unsigned webhook behavior remains safe

If restricted sandbox build fails with known Next startup timeout, request approved outside-sandbox bounded validation and record both outcomes.

## Deployment Stop Point

Builder must stop before production deployment unless the user explicitly authorizes deployment.

If deployment is authorized, deploy only after local validation passes, then run production smoke on `https://precisionperformance.com.au` to confirm:

- public home shows only the Thoroughbred image cover page with `Under Construction` written across it
- `/home`, `/shop`, `/shop/*`, and `/contact` do not expose the website
- checkout is blocked
- auth/admin protected surfaces are not public
- health/webhook safety behavior remains acceptable

## Documentation

Create:

- `docs/PUBLIC_UNDER_CONSTRUCTION_012F.md`

Update:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

## Stop Conditions

Stop and ask before:

- adding persistent visitor sign-up storage
- adding a third-party mailing-list/email/CRM service
- changing auth/RLS/schema/Stripe/webhook behavior beyond public checkout blocking
- exposing or copying secrets
- deploying to production
- pushing or creating a PR
- deleting current website source files
- making the gate irreversible or difficult to remove later
