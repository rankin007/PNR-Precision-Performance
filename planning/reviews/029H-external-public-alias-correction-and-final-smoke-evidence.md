# Sprint 029H Evidence - External Public Alias Correction And Final Smoke

## Status

Marketing-preview deployed.

## Timestamp

- 2026-07-24 17:36:00 +10:00

## Pack Application

- Applied `planning/architect-packs/architect-pack-029H-external-public-alias-correction-and-final-smoke.md`.
- Created `planning/sprints/029H-external-public-alias-correction-and-final-smoke/SPRINT.md`.
- Dry-run showed one created file and no overwrites.

## Worktree Boundary

- `develop` remained ahead of `origin/develop` by older unrelated commits.
- The workspace still contained unrelated active Sprint 021AA/auth/Supabase dirty and untracked files.
- Sprint 029H work did not edit runtime route source, auth, Supabase, Stripe, DNS, Vercel settings, environment variables, or production data.

## Multi-Perspective Public Alias Checks

### Project Shell Cache-Busted Apex

Read-only command used `curl.exe` with no secret headers:

- URL: `https://precisionperformance.com.au/?029h=20260724173247-shell`
- Timestamp: 2026-07-24 17:32:49 +10:00
- Final URL: `https://precisionperformance.com.au/?029h=20260724173247-shell`
- Status: 200
- Title: `Precision Performance`
- Headers: `Age: 1962`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`

Sprint 029 markers:

- `Equine Biochemistry and Recovery Intelligence` present.
- `See what observation alone cannot show.` present.
- `Request a Stable Trial` present.
- `Recreated sample, not live horse data` present.

Old-page markers:

- `Biochemistry Analysis for Elite Equine` absent.
- `Apply Now` absent.
- `Shop` absent.
- `testimonial` absent.
- `contact form` absent.

### Public `www` Alias

Read-only command used `curl.exe` with no secret headers:

- URL: `https://www.precisionperformance.com.au/?029h=20260724173247-www`
- Timestamp: 2026-07-24 17:32:54 +10:00
- Final URL: `https://www.precisionperformance.com.au/?029h=20260724173247-www`
- Status: 200
- Title: `Precision Performance`
- Headers: `Age: 1657`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`

All Sprint 029 markers were present and all old-page markers listed above were absent.

### Vercel App Alias

Read-only command used `curl.exe` with no secret headers:

- URL: `https://pnr-precision-performance.vercel.app/?029h=20260724173247-vercel`
- Timestamp: 2026-07-24 17:32:56 +10:00
- Final URL: `https://pnr-precision-performance.vercel.app/?029h=20260724173247-vercel`
- Status: 200
- Title: `Precision Performance`
- Headers: `Age: 0`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: PRERENDER`; `X-Matched-Path: /`

All Sprint 029 markers were present and all old-page markers listed above were absent.

### Browser / Operator-Visible Attempt

- The in-app browser connector was attempted for an operator-visible public request.
- It failed before browser selection with `failed to start Node runtime: The system cannot find the path specified. (os error 3)`.
- No browser screenshot or DOM evidence was produced in this session.
- The prior Sprint 029F operator-assisted visual smoke remains the available visual proof, and Sprint 029H confirmed that the live aliases serve the same Sprint 029 page markers.

### Independent External Fetch Path

- The separate web-search/open path did not provide usable live response headers/body evidence for the current alias.
- Any old-content report from a search/index perspective must be treated as stale cache/index evidence unless it is reproduced by a live HTTP fetch.
- Live cache-busted shell checks against apex, `www`, and the Vercel app alias all returned the Sprint 029 page and no old-page markers.

## DNS Evidence

Read-only DNS lookup:

- `precisionperformance.com.au` resolved to Vercel A records `216.198.79.65` and `64.29.17.65`.
- `www.precisionperformance.com.au` resolved to Vercel A records `216.198.79.1` and `216.198.79.65`.

No DNS mutation was performed.

## Vercel Alias Inspection

Read-only command:

- `npm.cmd exec -- vercel inspect https://precisionperformance.com.au`

Result:

- Deployment ID: `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`
- Target: production
- Status: Ready
- Deployment URL: `https://pnr-precision-performance-leqvohy7q-rankin007s-projects.vercel.app`
- Aliases include:
  - `https://precisionperformance.com.au`
  - `https://www.precisionperformance.com.au`
  - `https://pnr-precision-performance.vercel.app`

The raw deployment URL remains Vercel SSO-blocked for anonymous public fetch:

- Final URL: Vercel login flow.
- Status: 200
- Title: `Login - Vercel`
- Sprint 029 markers absent because the request reached the Vercel login page, not the deployment content.

No Vercel alias correction, promotion, redeploy, cache invalidation, DNS change, project setting change, environment-variable change, Supabase mutation, Stripe mutation, or production data mutation was performed.

## Final Public Route Smoke

Production alias `https://precisionperformance.com.au` returned:

- `/` -> 200, title `Precision Performance`, all Sprint 029 markers present.
- `/home` -> 307, `Location: /`.
- `/contact` -> 307, `Location: /`.
- `/shop` -> 307, `Location: /`.
- `/shop/example` -> 404 unavailable.
- `/sign-in` -> 200, title `PNR Precision Performance`.
- `/admin` -> 307, `Location: /sign-in?login=required&next=%2Fadmin`.
- `/portal` -> 307, `Location: /sign-in?login=required&next=%2Fportal`.
- `/data-entry` -> 307, `Location: /sign-in?login=required&next=%2Fdata-entry`.
- `/api/checkout` -> 404 unavailable.

## Outcome

Sprint 029H closes as `marketing-preview deployed`.

The external discrepancy is resolved for live public HTTP checks: current apex, `www`, and Vercel app alias requests serve the Sprint 029 marketing-preview page. The likely remaining source of old-content observations is stale external search/index/browser cache, not the current production alias response.

This remains a marketing-preview deployment only. It does not establish full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.
