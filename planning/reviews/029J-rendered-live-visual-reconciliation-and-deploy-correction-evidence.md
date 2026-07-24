# Sprint 029J Rendered Live Visual Reconciliation And Deploy Correction Evidence

## Final Status

`rendered-live-marketing-preview-corrected`

Sprint 029J reproduced the live rendered mismatch, corrected the approved Sprint 029 marketing-preview page, redeployed the intended Vercel production project, and proved local/apex/`www` rendered parity at desktop, tablet, and mobile viewport sizes.

This evidence does not establish full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

## Pack Application

- Architect Pack: `planning/architect-packs/architect-pack-029J-rendered-live-visual-reconciliation-and-deploy-correction.md`
- Applied sprint: `planning/sprints/029J-rendered-live-visual-reconciliation-and-deploy-correction/SPRINT.md`
- Pack validation: passed.
- Dry run: created only the Sprint 029J sprint file.
- Applied run: created only the Sprint 029J sprint file.

## Initial Render Finding

Sprint 029J confirmed that marker-only smoke had missed a rendered failure:

- Live apex screenshot before correction rendered the Sprint 029 text over a pale blank hero area.
- `https://precisionperformance.com.au/under-construction-thoroughbred.jpg` returned `404`.
- `https://precisionperformance.com.au/_next/image?url=%2Funder-construction-thoroughbred.jpg&w=3840&q=75` returned `400 INVALID_IMAGE_OPTIMIZE_REQUEST`.
- CDP mobile evidence showed the live hero image element was complete but had `naturalWidth: 0`, proving the rendered image was broken.

Local render also exposed a narrow mobile hero text/CTA clipping risk. Sprint 029J corrected the root page only, inside the approved file set.

## Source Correction

Changed file:

- `app/page.tsx`

Correction:

- added root `overflow-x-hidden`;
- constrained the hero text column with `min-w-0` and `max-w-full`;
- added mobile-safe line breaks for the long eyebrow and headline;
- constrained hero CTA buttons to `w-full max-w-full` on small screens while preserving `sm:w-auto` desktop/tablet behavior.

Deployable source commit:

- `14bc568 Fix Sprint 029J rendered marketing preview`

Relevant source hashes after correction:

- `app/page.tsx`: `a91cd400683234a52983d87f22487e3b20826890`
- `package.json`: `38612e9c37b8401a7a03fdfa3674a5735f91ac5c`
- `eslint.config.mjs`: `d27cf8636174914b5e69b43235194121bf9b9b34`
- `public/under-construction-thoroughbred.jpg`: `f2848a62e67e1a73517a76a812ee6d5a1fb233a9`

Unrelated active 021AA/auth/Supabase dirty-tree files remained outside Sprint 029J staging, deployment, and commit scope.

## Validation And Build

Root workspace validation passed after the page correction:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`

Clean release worktree:

- Path: `C:\Users\rrank\AppData\Local\Temp\pnr-029j-release-worktree-20260724210200`
- Git state: detached HEAD at `14bc568`
- `npm.cmd ci --prefer-offline --no-audit`: passed.
- `npm.cmd run build`: passed with Next 15.3.8 and 24/24 static pages generated.

Earlier corrected-source build proof also passed in `C:\Users\rrank\AppData\Local\Temp\pnr-029i-worktree-20260724182400` after overlaying the corrected `app/page.tsx`.

## Local Render Evidence

Final rendered screenshots were captured through Edge DevTools Protocol with real viewport metrics:

| Perspective | Viewport | Screenshot | DOM evidence |
|---|---:|---|---|
| local approved build | `1440x1000` | `planning/reviews/029J-visual-artifacts/local-desktop-cdp.png` | `innerWidth=1440`, `scrollWidth=1440`, hero image `naturalWidth=1440`, old markers absent |
| local approved build | `768x1024` | `planning/reviews/029J-visual-artifacts/local-tablet-cdp.png` | `innerWidth=768`, `scrollWidth=768`, hero image `naturalWidth=768`, old markers absent |
| local approved build | `390x844` | `planning/reviews/029J-visual-artifacts/local-mobile-cdp.png` | `innerWidth=390`, `scrollWidth=390`, hero image `naturalWidth=390`, old markers absent |

The mobile visible text is intentionally line-broken:

- `Equine Biochemistry and`
- `Recovery Intelligence`
- `See what`
- `observation`
- `alone cannot`
- `show.`

This preserves the approved wording while removing narrow-viewport clipping.

## Vercel Deployment Evidence

Deployable source:

- Branch/worktree source: detached release worktree at commit `14bc568`
- Intended project: `pnr-precision-performance`

Correct deployment:

- Command: `npm.cmd exec -- vercel deploy --prod --yes --archive=tgz`
- Deployment id: `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`
- Deployment URL: `https://pnr-precision-performance-av609g9kw-rankin007s-projects.vercel.app`
- Target: production
- Vercel build: passed remotely with Next 15.3.8.
- Aliased by Vercel:
  - `https://precisionperformance.com.au`
  - `https://www.precisionperformance.com.au`
  - `https://pnr-precision-performance.vercel.app`
  - `https://pnr-precision-performance-rankin007s-projects.vercel.app`
  - `https://pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Deployment path note:

- One first deploy command was run before the clean worktree had the intended root `.vercel` link metadata. Vercel created a separate temporary project named for the release worktree and deployed `dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT` there.
- That temporary deployment did not alias `precisionperformance.com.au` and was not used as production evidence.
- Builder did not delete or mutate the temporary Vercel project after discovery because deletion/project cleanup was outside the sprint boundary.
- Builder then copied the intended root Vercel link metadata into the release worktree without printing identifiers and redeployed to the intended `pnr-precision-performance` project.

## Live Asset And Header Evidence

After the intended deployment:

- `https://precisionperformance.com.au/under-construction-thoroughbred.jpg`: `200`, `Content-Type: image/jpeg`, `Content-Length: 394632`, `X-Matched-Path: /under-construction-thoroughbred.jpg`, `X-Vercel-Cache: MISS`.
- `https://precisionperformance.com.au/_next/image?url=%2Funder-construction-thoroughbred.jpg&w=640&q=75`: `200`, `Content-Type: image/jpeg`, `Content-Length: 25835`.
- `https://www.precisionperformance.com.au/under-construction-thoroughbred.jpg`: `200`, `Content-Type: image/jpeg`, `Content-Length: 394632`, `X-Vercel-Cache: HIT`.

The previous live 404/400 hero-image failure was corrected.

## Live Render Evidence

Final rendered screenshots were captured through Edge DevTools Protocol with real viewport metrics and cache-busted URLs.

| Perspective | Viewport | Screenshot | DOM evidence |
|---|---:|---|---|
| apex | `1440x1000` | `planning/reviews/029J-visual-artifacts/live-apex-desktop-cdp.png` | `innerWidth=1440`, `scrollWidth=1440`, hero image `naturalWidth=1440`, old markers absent |
| apex | `768x1024` | `planning/reviews/029J-visual-artifacts/live-apex-tablet-cdp.png` | `innerWidth=768`, `scrollWidth=768`, hero image `naturalWidth=768`, old markers absent |
| apex | `390x844` | `planning/reviews/029J-visual-artifacts/live-apex-mobile-cdp.png` | `innerWidth=390`, `scrollWidth=390`, hero image `naturalWidth=390`, old markers absent |
| `www` | `1440x1000` | `planning/reviews/029J-visual-artifacts/live-www-desktop-cdp.png` | `innerWidth=1440`, `scrollWidth=1440`, hero image `naturalWidth=1440`, old markers absent |
| `www` | `768x1024` | `planning/reviews/029J-visual-artifacts/live-www-tablet-cdp.png` | `innerWidth=768`, `scrollWidth=768`, hero image `naturalWidth=768`, old markers absent |
| `www` | `390x844` | `planning/reviews/029J-visual-artifacts/live-www-mobile-cdp.png` | `innerWidth=390`, `scrollWidth=390`, hero image `naturalWidth=390`, old markers absent |

Screenshot file sizes match local/apex/`www` for each viewport class:

- desktop: `1178956` bytes for local/apex/`www`
- tablet: `591498-591499` bytes for local/apex/`www`
- mobile: `304164` bytes for local/apex/`www`

This proves rendered parity for the first viewport composition, visible imagery, headline, descriptor, CTA presentation, and absence of old rendered sections.

## Marker And Route Smoke

Normalized public root text check:

- `Equine Biochemistry and Recovery Intelligence`: present after whitespace normalization.
- `See what observation alone cannot show.`: present after whitespace normalization.
- `Request a Stable Trial`: present.
- `Recreated sample, not live horse data`: present.
- Old markers absent in raw and normalized text:
  - `Biochemistry Analysis for Elite Equine`
  - `Apply Now`
  - `Shop`
  - `Testimonials`
  - `Phone App Preview`
  - `Members Experience`
  - `Professional Kit`
  - `Monthly Service`
  - `$500 per test`

Final route smoke against `https://precisionperformance.com.au`:

| Route | Result |
|---|---|
| `/` | `200`, title `Precision Performance`, normalized Sprint markers present, old markers absent |
| `/home` | `200`, final `https://precisionperformance.com.au/` |
| `/contact` | `200`, final `https://precisionperformance.com.au/` |
| `/shop` | `200`, final `https://precisionperformance.com.au/` |
| `/shop/example` | `200`, final `https://precisionperformance.com.au/` |
| `/sign-in` | `200`, title `Equine Precision Performance` |
| `/admin` | `200`, final `https://precisionperformance.com.au/sign-in?next=%2Fadmin` |
| `/portal` | `200`, final `https://precisionperformance.com.au/sign-in?next=%2Fportal` |
| `/data-entry` | `200`, final `https://precisionperformance.com.au/sign-in?next=%2Fdata-entry` |
| `/api/checkout` | `405`, unavailable for safe GET |

Route smoke passed the Sprint 029J boundary: public root renders the marketing preview, stale public routes resolve to the preview, protected anonymous routes require sign-in, and no public checkout path was opened.

## Manual Intervention

No blocking manual intervention remains for the intended production deployment.

Non-blocking operator cleanup item:

1. Vercel contains a temporary project/deployment created by the first unlinked release-worktree deploy attempt: `dpl_83Yatsa6D3ZmUTA8byspKqnAvPYT`.
2. It was not aliased to the production custom domains and is not used as Sprint 029J production evidence.
3. If the operator wants it removed, do so manually in Vercel after confirming it is the temporary `pnr-029j-release-worktree-20260724210200` project, not `pnr-precision-performance`.
4. Builder should verify afterward that `precisionperformance.com.au`, `www.precisionperformance.com.au`, and `pnr-precision-performance.vercel.app` still inspect to `pnr-precision-performance` deployment `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` or a later intended deployment.

## Closeout Notes

- Final status: `rendered-live-marketing-preview-corrected`
- Production alias now renders the approved Sprint 029 marketing-preview presentation with the hero image visible.
- Public deployment remains preview-only and `noindex`/`nofollow`.
- Existing active Sprint 021AA dirty-tree state remains outside Sprint 029J scope.
