# Public Front Page Marketing Preview 029

## Status

Sprint 029 has been applied and the root public page has been replaced locally with a marketing-preview front page.

Deployment status: blocked before deployment.

Sprint 029B update: the known width/layout source concern was corrected locally.

Sprint 029C update: JSON/static/typecheck validation now passes through corrected project-local Node script resolution. Deployment remains blocked because ESLint 9 requires flat-config alignment, generated `.next` output inside OneDrive still carries reparse metadata that Next can trip over, and Vercel target metadata content still cannot be safely confirmed from this shell.

Sprint 029D update: ESLint 9/Next linting now passes through a flat-config bridge, production build passes in a non-OneDrive temp workspace with locked dependencies installed there, safe local HTTP route smoke passes, and Vercel metadata has the expected non-secret target shape. Deployment remains blocked because browser/viewport smoke could not be completed in this environment and sprint-only staging/commit/push/deployment has not occurred.

Sprint 029E update: validation, reparse-safe production build, and safe HTTP route smoke were reconfirmed. Deployment remained blocked because installed Edge did not produce screenshot or DOM evidence in headless mode, the connected Node REPL browser route failed to start, and sprint-only staging/commit/push/deployment did not occur.

Sprint 029F update: validation, reparse-safe production build, HTTP route smoke, operator-assisted visual smoke, Vercel deployment, and deployed smoke passed. The marketing-preview front page is live at `https://precisionperformance.com.au`.

Sprint 029G update: production alias reconciliation passed after a reported discrepancy. `https://precisionperformance.com.au/` returned the Sprint 029 page markers, old-page markers were absent, Vercel inspect mapped the alias to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`, and public route-safety smoke passed. No alias correction, DNS change, Vercel setting/environment mutation, Supabase mutation, Stripe mutation, or production data mutation was performed.

Sprint 029H update: stronger external-public verification passed. Cache-busted live requests to `https://precisionperformance.com.au/`, `https://www.precisionperformance.com.au/`, and `https://pnr-precision-performance.vercel.app/` returned the Sprint 029 marketing-preview markers and no old-page markers. DNS resolved apex and `www` to Vercel records, Vercel inspect still mapped the production alias to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`, and final public route smoke passed. No alias correction, redeploy, DNS change, Vercel setting/environment mutation, Supabase mutation, Stripe mutation, or production data mutation was performed.

## Implemented Page

Route: `/`

The page presents:

- Precision Performance as the short public name.
- Equine Biochemistry and Recovery Intelligence as the descriptor.
- A first viewport using the existing safe local thoroughbred asset, `public/under-construction-thoroughbred.jpg`.
- Sections for the method, trainer value, portal/data concept, testing kit and services, recreated evidence preview, and early stable trial conversation.
- Safe calls to action only: in-page review anchors and `/sign-in` for existing trainer/operator login.

No stored lead capture, mailing-list provider, CRM integration, email API, checkout opening, Supabase mutation, Stripe change, upload, voice provider, CMS, or new backend behavior was added.

## Claims Boundary

The copy uses qualified language: supports more informed decisions, helps identify changes over time, trend-based visibility, individual baseline, trainer judgement, and veterinary review where needed.

The page deliberately avoids diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.

All evidence visuals are recreated/anonymised presentation examples. No raw horse records, private stable data, confidential worksheets, proprietary formulas, secret material, or identifiable unapproved assets are used.

## Route Visibility

Current source route behavior:

| Route | Treatment |
|---|---|
| `/` | Marketing-preview front page. |
| `/home` | Redirects to `/`. |
| `/contact` | Redirects to `/`. |
| `/shop` | Redirects to `/`. |
| `/shop/[slug]` | Redirects to `/`. |
| `/sign-in` | Existing sign-in route unchanged. |
| Portal/admin/ops/auth/API routes | Not edited by Sprint 029. |

Checkout remains unavailable through the public shop routes because the public shop and product routes still redirect to `/`.

## Validation Evidence

Passed locally:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`
- `git diff --check -- app/page.tsx planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`

Sprint 029B additional evidence:

- corrected the invalid/suspect `w-[min(...)]` front-page width classes in `app/page.tsx`
- source check confirmed no remaining `w-[min` or `100%-2rem` classes in `app/page.tsx`
- `npm.cmd run validate:static` passed after the 029B correction

Sprint 029C additional evidence:

- `package.json` scripts were corrected to resolve project-local Node 22.14.0 through `npm exec -- node ...`
- `npm.cmd run validate:json` passed after the script correction
- `npm.cmd run validate:static` passed after the script correction
- `npm.cmd run typecheck` passed after the script correction
- generated `.next` and TypeScript incremental cache were cleaned after path verification
- after public asset hydration/pinning and clean generated-cache removal, `npm.cmd run build` compiled successfully once before stalling at the lint/type stage

Sprint 029D additional evidence:

- `eslint.config.mjs` was added with `@eslint/eslintrc` `FlatCompat` for the existing `next/core-web-vitals` and `next/typescript` lint intent
- `app/page.tsx` now uses `next/link` for internal `/` and `/sign-in` navigation flagged by Next lint
- `npm.cmd run validate:json` passed
- `npm.cmd run validate:static` passed
- `npm.cmd run typecheck` passed
- `npm.cmd run lint` passed with no warnings or errors
- `npm.cmd run build` passed in `C:\Users\rrank\AppData\Local\Temp\pnr-029d-build-workspace-20260724135646` after locked dependency install
- safe local HTTP route smoke passed for `/`, `/home`, `/contact`, `/shop`, `/shop/example`, `/sign-in`, `/admin`, `/portal`, `/data-entry`, and `/api/checkout`

Sprint 029E additional evidence:

- `npm.cmd run validate:json` passed
- `npm.cmd run validate:static` passed
- `npm.cmd run typecheck` passed
- `npm.cmd run lint` passed
- `npm.cmd run build` passed in `C:\Users\rrank\AppData\Local\Temp\pnr-029e-build-workspace-20260724143732` after locked dependency install
- safe local HTTP route smoke passed for `/`, `/home`, `/contact`, `/shop`, `/shop/example`, `/sign-in`, `/admin`, `/portal`, `/data-entry`, and `/api/checkout`

Sprint 029F additional evidence:

- `npm.cmd run validate:json` passed
- `npm.cmd run validate:static` passed
- `npm.cmd run typecheck` passed
- `npm.cmd run lint` passed
- `npm.cmd run build` passed in `C:\Users\rrank\AppData\Local\Temp\pnr-029f-build-workspace-20260724151849` after locked dependency install
- safe local HTTP route smoke passed for `/`, `/home`, `/contact`, `/shop`, `/shop/example`, `/sign-in`, `/admin`, `/portal`, `/data-entry`, and `/api/checkout`
- automated browser screenshot capture remained unavailable because Edge headless failed with GPU process errors and Node REPL browser tooling could not start
- operator-assisted visual smoke passed for mobile, tablet, desktop, keyboard traversal, hero image visibility, overflow/clip/readability, and status indicators

Limitations:

- `npm run ...` through PowerShell `npm.ps1` is blocked by local execution policy; the same commands were run through `npm.cmd`.
- `npm.cmd run validate:local` timed out after 180 seconds before reporting completion.
- The in-app browser plugin exposed no browser instances in this session.
- Local `next dev` and `next start` launched through `npm.cmd` exited before binding to port 3000 without an error log. Direct foreground `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3000` stayed alive until the command timeout, but a durable background server could not be established from this shell.
- Microsoft Edge is present, but headless screenshot commands did not emit screenshots or version output in this environment.
- During Sprint 029B, `npm.cmd run typecheck` timed out after 240 seconds, direct `tsc` timed out after 60 seconds, and `npm.cmd run build` timed out after 240 seconds before diagnostics/progress output.
- During Sprint 029C, direct ESLint failed with `ESLint couldn't find an eslint.config.(js|mjs|cjs) file` under ESLint 9.39.4 while the repo still uses `.eslintrc.json`.
- During Sprint 029C, diagnostic `next build --no-lint` failed with `EINVAL: invalid argument, readlink '.next\\package.json'`, indicating OneDrive reparse metadata on generated build output remains a blocker.
- During Sprint 029D, browser/viewport smoke could not be completed because no Chrome, Edge, Chromium, or Playwright automation was available without installing additional tooling.
- During Sprint 029E, Edge was found locally but did not produce screenshot or DOM evidence in headless mode, and the connected Node REPL browser path failed to start.
- During Sprint 029F, Edge headless screenshot capture again produced no screenshot files because of GPU process failures, and Node REPL browser tooling remained unavailable.

Sprint 029F deployed smoke passed on `https://precisionperformance.com.au`. This sprint must not claim full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

Sprint 029G reconfirmed the same production alias as the current public smoke target.

Sprint 029H reconfirmed the same production alias from multiple live public perspectives. Browser automation remained unavailable in this environment, so any remaining old-content observation should be reproduced with a live hard-refresh/private-window HTTP request before treating it as current production behavior.

## Deployment Blocker

Deployment proceeded through explicit Sprint 029/029B/029C/029D/029E/029F file staging and an isolated release worktree/branch. The following remain controlled constraints:

- The worktree contains a large unresolved active Sprint 021AA dirty state.
- Sprint 029 requires staging only sprint-related files and stopping before pushing unrelated or unresolved active 021AA changes.
- `.vercel/project.json` has the expected non-secret `projectId`/`orgId` shape, but the identifiers are not reproduced or committed.
- Sprint 029F validation/build/HTTP route smoke, operator-assisted visual proof, Vercel deployment, and deployed smoke passed.

## Manual Intervention Required

What is blocked:

No blocking Sprint 029F deployment action remains.

Evidence checked:

- Pack application created only `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`.
- Required local source/build checks listed above passed.
- Shop/contact/home source routes redirect to `/`.
- The worktree has many modified/untracked Sprint 021AA-era files outside the Sprint 029 approved implementation scope.
- Local browser/server smoke was attempted as described above; operator-assisted visual smoke passed in Sprint 029F.

Exact user/manual action needed:

1. Preserve the active Sprint 021AA dirty state outside Sprint 029 staging.
2. Treat the deployed page as a marketing preview only.
3. Require a later sprint for full public website, commerce, authenticated, SEO/indexing, or production readiness claims.

Builder will verify afterward:

1. Sprint-related-only git diff and staged file list.
2. Vercel deployment URL and post-deployment smoke for front page rendering, shop/checkout unavailable behavior, and protected-route safety.
3. Completed in Sprint 029F evidence at `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`.

## Remaining Content Gaps

- Authentic photography and releases are still pending.
- Final domain thresholds, pH/device rules, score terminology, and Table of Knowledge content remain pending.
- Final commercial schedule, pricing, GST, kit/support terms, and checkout decision remain pending.
- SEO/indexing launch remains intentionally unclaimed; root metadata still uses `noindex` and `nofollow`.
