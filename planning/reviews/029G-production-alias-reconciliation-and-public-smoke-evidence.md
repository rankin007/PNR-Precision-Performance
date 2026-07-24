# Sprint 029G Evidence - Production Alias Reconciliation And Public Smoke

## Status

Marketing-preview deployed.

## Timestamp

- 2026-07-24 17:16:08 +10:00

## Pack Application

- Applied `planning/architect-packs/architect-pack-029G-production-alias-reconciliation-and-public-smoke.md`.
- Created `planning/sprints/029G-production-alias-reconciliation-and-public-smoke/SPRINT.md`.

## Public Alias Marker Check

Checked `https://precisionperformance.com.au/` with cache-busting query/header controls.

- Status: `HTTP/1.1 200 OK`
- Title: `Precision Performance`
- Cache evidence: `Age: 870`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`

Sprint 029 markers:

- `Equine Biochemistry and Recovery Intelligence` present.
- `See what observation alone cannot show.` present.
- `Request a Stable Trial` present.
- `Recreated sample, not live horse data` present.

Old-page markers:

- `Biochemistry Analysis for Elite Equine` absent.
- `Apply Now` absent.

## Public Route Smoke

Production alias `https://precisionperformance.com.au` returned:

- `/` -> 200, title `Precision Performance`
- `/home` -> 307, `Location: /`
- `/contact` -> 307, `Location: /`
- `/shop` -> 307, `Location: /`
- `/shop/example` -> 404 unavailable
- `/sign-in` -> 200, title `PNR Precision Performance`
- `/admin` -> 307, `Location: /sign-in?login=required&next=%2Fadmin`
- `/portal` -> 307, `Location: /sign-in?login=required&next=%2Fportal`
- `/data-entry` -> 307, `Location: /sign-in?login=required&next=%2Fdata-entry`
- `/api/checkout` -> 404 unavailable

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

No Vercel alias correction, promotion, DNS change, environment-variable change, Supabase mutation, Stripe mutation, or production data mutation was performed in Sprint 029G.

## Outcome

Sprint 029G reconciled the reported discrepancy: the production alias currently serves the Sprint 029 marketing-preview front page and public route-safety smoke passes.

This remains a marketing-preview deployment only. It does not establish full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.
