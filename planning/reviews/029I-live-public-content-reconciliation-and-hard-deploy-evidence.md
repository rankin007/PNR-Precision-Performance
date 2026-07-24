# Sprint 029I Live Public Content Reconciliation And Hard Deploy Evidence

## Final Status

`marketing-preview-live-reconciled`

Sprint 029I reconciled the source, build, Vercel alias/deployment, DNS/header, and public internet layers. No old public page content was reproduced from live cache-busted public checks. No redeploy, alias correction, DNS change, Vercel settings/environment mutation, Supabase mutation, Stripe mutation, or production data mutation was performed.

This evidence does not establish full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

## Pack Application

- Architect Pack: `planning/architect-packs/architect-pack-029I-live-public-content-reconciliation-and-hard-deploy.md`
- Applied sprint: `planning/sprints/029I-live-public-content-reconciliation-and-hard-deploy/SPRINT.md`
- Pack validation: passed.
- Dry run: created only the Sprint 029I sprint file.
- Applied run: created only the Sprint 029I sprint file.

## Source Layer

- Branch before closeout: `develop...origin/develop [ahead 11]`
- Local HEAD before closeout checks: `3c828eeb24bb1ef8176a6ce905fbe75cc13b2566`
- Relevant source files inspected: `app/page.tsx`, `package.json`, `eslint.config.mjs`
- Relevant source drift: `git diff --name-status -- app/page.tsx package.json eslint.config.mjs` returned no changes.
- Source file hashes:
  - `app/page.tsx`: `846a3c04bdfd737f2675af9e8ba9e21e421d2819`
  - `package.json`: `38612e9c37b8401a7a03fdfa3674a5735f91ac5c`
  - `eslint.config.mjs`: `d27cf8636174914b5e69b43235194121bf9b9b34`
- Relevant source provenance includes Sprint 029F implementation commit `ce88697 Deploy Sprint 029F front page marketing preview`.

Unrelated active 021AA/auth/Supabase dirty-tree files remained present and were excluded from Sprint 029I source provenance, validation, staging, and commit scope.

## Validation And Build Layer

Required validation passed from the working project:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`

Production build was proved from an isolated clean Git worktree:

- Worktree: `C:\Users\rrank\AppData\Local\Temp\pnr-029i-worktree-20260724182400`
- Worktree command: `git worktree add --detach ... HEAD`
- Worktree HEAD: `3c828eeb24bb1ef8176a6ce905fbe75cc13b2566`
- `npm.cmd ci --prefer-offline --no-audit`: passed.
- `npm.cmd run build`: passed with Next 15.3.8, successful compile, and 24/24 static pages generated.

Built root artifact:

- Artifact: `.next/server/app/index.html`
- SHA256: `6D70A671C0BD989B3F27DC0917AED2DDE7031C7E86152EA4271526FB9BD0B36F`
- Excerpt: `Equine biochemistry and recovery intelligence supporting more informed trainer decisions."/><meta name="robots" content="noindex, nofollow"`
- Sprint markers present:
  - `Equine Biochemistry and Recovery Intelligence`
  - `See what observation alone cannot show.`
  - `Request a Stable Trial`
  - `Recreated sample, not live horse data`
- Old markers absent:
  - `Precision Performance - Equine Biochemistry Analysis`
  - `Biochemistry Analysis for Elite Equine`
  - `Apply Now`
  - `Shop`
  - `$500 per test`
  - `Professional Kit`
  - `Monthly Service`

## Vercel And DNS Layer

Read-only Vercel inspect of `https://precisionperformance.com.au`:

- Deployment URL: `https://pnr-precision-performance-leqvohy7q-rankin007s-projects.vercel.app`
- Deployment id: `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`
- Project name: `pnr-precision-performance`
- Target: production
- Status: Ready
- Created: Friday 2026-07-24 16:59:01 +10:00
- Aliases:
  - `https://precisionperformance.com.au`
  - `https://www.precisionperformance.com.au`
  - `https://pnr-precision-performance.vercel.app`
  - `https://pnr-precision-performance-rankin007s-projects.vercel.app`
  - `https://pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

DNS answers:

- `precisionperformance.com.au` A records: `216.198.79.65`, `64.29.17.65`
- `www.precisionperformance.com.au` A records: `216.198.79.65`, `216.198.79.1`

No Vercel correction action was needed because public live checks already served the Sprint 029 marketing-preview content. No DNS provider changes were performed.

## Public Internet Layer

All public root checks used unauthenticated requests with `Cache-Control: no-cache`, `Pragma: no-cache`, a Sprint 029I user agent, and cache-busting where applicable.

### Apex Root

- Timestamp: `2026-07-24 18:01:33 +10:00`
- URL: `https://precisionperformance.com.au/`
- Final URL: `https://precisionperformance.com.au/`
- Status: `200`
- Title: `Precision Performance`
- SHA256: `4691EEB315532EE4D38F3D377F5B580169EA4FF6CE4DBDB2CCBE7C9D924F3508`
- Selected headers: `Age: 3685`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`; `X-Vercel-Id: sin1::wczs9-1784880092296-cfb20f7dd231`
- Excerpt: `Equine biochemistry and recovery intelligence supporting more informed trainer decisions."/><meta name="robots" content="noindex, nofollow"`
- Sprint markers: all present.
- Old markers: all absent.

### Apex Reported Old URL

- Timestamp: `2026-07-24 18:01:34 +10:00`
- URL: `https://precisionperformance.com.au/?review029h=1`
- Final URL: `https://precisionperformance.com.au/?review029h=1`
- Status: `200`
- Title: `Precision Performance`
- SHA256: `4691EEB315532EE4D38F3D377F5B580169EA4FF6CE4DBDB2CCBE7C9D924F3508`
- Selected headers: `Age: 3687`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`; `X-Vercel-Id: sin1::tb76w-1784880094590-9ad12e8bfb3e`
- Sprint markers: all present.
- Old markers including `Apply Now`, `Shop`, `$500 per test`, testimonial, and contact-form wording: absent.

This directly disproves the reported old-content URL from a live cache-busted public request.

### Apex Cache-Busted

- Timestamp: `2026-07-24 18:01:36 +10:00`
- URL: `https://precisionperformance.com.au/?029i=20260724180131-apex`
- Final URL: same.
- Status: `200`
- Title: `Precision Performance`
- SHA256: `4691EEB315532EE4D38F3D377F5B580169EA4FF6CE4DBDB2CCBE7C9D924F3508`
- Selected headers: `Age: 3689`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`; `X-Vercel-Id: sin1::znwlc-1784880095954-2c26ebf22b5b`
- Sprint markers: all present.
- Old markers: all absent.

### WWW Cache-Busted

- Timestamp: `2026-07-24 18:01:37 +10:00`
- URL: `https://www.precisionperformance.com.au/?029i=20260724180131-www`
- Final URL: same.
- Status: `200`
- Title: `Precision Performance`
- SHA256: `4691EEB315532EE4D38F3D377F5B580169EA4FF6CE4DBDB2CCBE7C9D924F3508`
- Selected headers: `Age: 3381`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`; `X-Vercel-Id: sin1::hj82f-1784880097184-655241298406`
- Sprint markers: all present.
- Old markers: all absent.

### Vercel App Alias Cache-Busted

- Timestamp: `2026-07-24 18:01:38 +10:00`
- URL: `https://pnr-precision-performance.vercel.app/?029i=20260724180131-vercel`
- Final URL: same.
- Status: `200`
- Title: `Precision Performance`
- SHA256: `4691EEB315532EE4D38F3D377F5B580169EA4FF6CE4DBDB2CCBE7C9D924F3508`
- Selected headers: `Age: 1722`; `Cache-Control: public, max-age=0, must-revalidate`; `Server: Vercel`; `X-Vercel-Cache: HIT`; `X-Matched-Path: /`; `X-Vercel-Id: sin1::79bmf-1784880098684-1d268853b888`
- Sprint markers: all present.
- Old markers: all absent.

### Raw Deployment URL

- Timestamp: `2026-07-24 18:04:30 +10:00`
- URL: `https://pnr-precision-performance-leqvohy7q-rankin007s-projects.vercel.app/?029i=raw-deployment-202607241804`
- Final URL: `https://vercel.com/login?next=...`
- Status chain: `302` to Vercel SSO, `307` to login, final `200`
- Title: `Login - Vercel`
- SHA256: `79C3AC89CEB89976F969413826462272DFAA619D775601CC8935119395741058`
- Selected headers included `Server: Vercel`, `X-Matched-Path: /api/sso` then `/login`, `X-Vercel-Cache: MISS` then `HIT`.
- Sprint markers: absent because the raw deployment URL is SSO-gated.
- Old markers: absent.

The raw deployment URL is not anonymously reachable; public content verification used apex, `www`, and the Vercel app alias.

## Independent / Browser Perspectives

- In-app browser setup was attempted for Sprint 029I after reading the browser skill. It failed with `failed to start Node runtime: The system cannot find the path specified. (os error 3)`.
- A web/open path was attempted against a cache-busted public URL, but it did not return usable live HTTP evidence in this environment.
- Web search for Sprint/old markers did not provide relevant current live-page evidence.

Because the browser and independent fetch paths did not produce usable evidence, the reconciliation relies on the successful public unauthenticated HTTP perspectives above plus Vercel inspect, DNS, source, and build evidence.

## Final Public Route Smoke

Timestamp batch: `2026-07-24 18:04:29 +10:00`

| Route | Result |
|---|---|
| `/` | `200`, final `https://precisionperformance.com.au/?029i-route=20260724180429`, title `Precision Performance`, Sprint root markers present, old root markers absent, SHA256 `4691EEB315532EE4D38F3D377F5B580169EA4FF6CE4DBDB2CCBE7C9D924F3508` |
| `/home` | `200`, final `https://precisionperformance.com.au/`, title `Precision Performance` |
| `/contact` | `200`, final `https://precisionperformance.com.au/`, title `Precision Performance` |
| `/shop` | `200`, final `https://precisionperformance.com.au/`, title `Precision Performance` |
| `/shop/example` | `404`, final `https://precisionperformance.com.au/shop/example?029i-route=20260724180429`, title `404: This page could not be found.` |
| `/sign-in` | `200`, final `/sign-in?...`, title `PNR Precision Performance` |
| `/admin` | `200`, final `https://precisionperformance.com.au/sign-in?login=required&next=%2Fadmin`, title `PNR Precision Performance` |
| `/portal` | `200`, final `https://precisionperformance.com.au/sign-in?login=required&next=%2Fportal`, title `PNR Precision Performance` |
| `/data-entry` | `200`, final `https://precisionperformance.com.au/sign-in?login=required&next=%2Fdata-entry`, title `PNR Precision Performance` |
| `/api/checkout` | `404`, final `https://precisionperformance.com.au/api/checkout?029i-route=20260724180429`, title `404: This page could not be found.` |

Route smoke passed the Sprint 029I boundary: public root content is the marketing preview, stale public routes resolve to the preview where configured, protected anonymous routes require sign-in, product slug/checkout GET remain unavailable, and no public purchase path was opened.

## Correction Actions

No correction action was performed. The four reconciliation layers agreed that public apex, `www`, and Vercel app alias serve Sprint 029 marketing-preview content and not the old page.

## Manual Intervention

No Sprint 029I correction is currently blocked.

Operator guidance if old content is observed again:

1. Recheck the exact URL in a private window or with hard refresh.
2. Compare against a cache-busted URL such as `https://precisionperformance.com.au/?029i-recheck=<timestamp>`.
3. Capture timestamp, final URL, page title, visible old marker, and whether the same marker appears in page source.
4. Builder should then re-run the public marker/header checks and compare Vercel request identifiers and cache headers.

## Closeout Notes

- Final status: `marketing-preview-live-reconciled`
- Public deployment remains preview-only and `noindex`/`nofollow`.
- Existing active Sprint 021AA dirty-tree state remains outside Sprint 029I scope.
