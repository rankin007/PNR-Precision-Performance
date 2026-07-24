# Architect Briefing

## Where Things Stand

Sprint 029J completed rendered-live visual reconciliation after the public page still looked unlike the approved local presentation. The front-page marketing preview is live at `https://precisionperformance.com.au`, and local/apex/`www` Edge DevTools screenshots now show the same Sprint 029 presentation at desktop, tablet, and mobile widths with the hero image visible.

The authenticated/Supabase branch remains at the prior 021Z clean close state. Do not resume or retry 021Z without a new bounded Pack.

## Current Status

Sprint 029J status: `rendered-live-marketing-preview-corrected`.

The known root front-page width/layout source issue was corrected in 029B. Sprint 029C restored JSON/static/typecheck validation through project-local Node script resolution. Sprint 029D aligned ESLint 9/Next linting and proved a successful production build in a non-OneDrive temp workspace. Sprint 029E reconfirmed validation/build/HTTP route smoke. Sprint 029F reconfirmed validation/build/HTTP route smoke, completed operator-assisted visual smoke after automated browser capture remained unavailable, deployed through Vercel, and passed deployed safety smoke. Sprint 029G rechecked the public alias, confirmed it serves Sprint 029 markers, and confirmed Vercel maps the alias to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`. Sprint 029H then confirmed live cache-busted apex, `www`, and Vercel app alias checks serve Sprint 029 markers, DNS resolves apex/`www` to Vercel records, Vercel inspect still maps the alias to `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`, and final route smoke passes. Sprint 029I reconciled a later reported old-content observation by proving source, clean-worktree build, Vercel alias/deployment, DNS/header, and live public checks agree; the exact `https://precisionperformance.com.au/?review029h=1` URL served Sprint markers and no old-page markers. Sprint 029J then found the rendered visual failure: the live hero image asset returned 404/invalid optimized image while local served it correctly, and narrow mobile hero text needed explicit wrapping. Sprint 029J corrected `app/page.tsx`, deployed commit `14bc568` to the intended `pnr-precision-performance` Vercel project as `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`, confirmed the hero image endpoints return 200, and captured local/apex/`www` rendered parity screenshots. Unrelated active 021AA dirty work remained excluded.

## Since Last Sprint

- Applied `planning/architect-packs/architect-pack-029F-browser-proof-release-and-live-deployment.md`.
- Created `planning/sprints/029F-browser-proof-release-and-live-deployment/SPRINT.md`.
- Reconfirmed `npm.cmd run validate:json`, `npm.cmd run validate:static`, `npm.cmd run typecheck`, and `npm.cmd run lint` pass.
- Reproved `npm.cmd run build` in a disposable non-OneDrive temp workspace with locked dependencies installed there.
- Reconfirmed safe local HTTP route smoke for `/`, stale public redirects, sign-in, protected anonymous redirects, and checkout GET unavailable behavior.
- Attempted automated browser/viewport smoke with installed Edge and the connected Node REPL route; neither produced usable screenshot evidence.
- Completed operator-assisted visual smoke after the user confirmed the mobile/tablet/desktop visual smoke passes.
- Deployed with Vercel CLI archive mode after ordinary upload attempts failed with `fetch failed`.
- Verified `https://precisionperformance.com.au` returns the 029F front page, redirects stale public routes, keeps protected routes behind sign-in redirects, and leaves checkout/product slug unavailable.
- Captured 029F evidence in `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`.
- Applied `planning/architect-packs/architect-pack-029G-production-alias-reconciliation-and-public-smoke.md`.
- Created `planning/sprints/029G-production-alias-reconciliation-and-public-smoke/SPRINT.md`.
- Reconfirmed `https://precisionperformance.com.au/` contains Sprint 029 markers: descriptor, headline, CTA, and recreated-sample wording.
- Confirmed old-page markers `Biochemistry Analysis for Elite Equine` and `Apply Now` are absent.
- Confirmed Vercel alias inspection points `precisionperformance.com.au` at the Sprint 029F deployment ID.
- Captured 029G evidence in `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`.
- Applied `planning/architect-packs/architect-pack-029H-external-public-alias-correction-and-final-smoke.md`.
- Created `planning/sprints/029H-external-public-alias-correction-and-final-smoke/SPRINT.md`.
- Confirmed cache-busted live public checks for apex, `www`, and the Vercel app alias return Sprint 029 markers and no old-page markers.
- Confirmed DNS resolves apex and `www` to Vercel A records.
- Reconfirmed Vercel inspect maps `precisionperformance.com.au` to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`.
- Confirmed final public route smoke passes for root, stale redirects, sign-in, protected anonymous redirects, and checkout unavailable behavior.
- Captured 029H evidence in `planning/reviews/029H-external-public-alias-correction-and-final-smoke-evidence.md`.
- Applied `planning/architect-packs/architect-pack-029I-live-public-content-reconciliation-and-hard-deploy.md`.
- Created `planning/sprints/029I-live-public-content-reconciliation-and-hard-deploy/SPRINT.md`.
- Reconfirmed source layer provenance for `app/page.tsx`, `package.json`, and `eslint.config.mjs` with no local source drift.
- Reconfirmed `npm.cmd run validate:json`, `npm.cmd run validate:static`, `npm.cmd run typecheck`, and `npm.cmd run lint` pass.
- Proved `npm.cmd run build` from clean detached worktree `C:\Users\rrank\AppData\Local\Temp\pnr-029i-worktree-20260724182400`.
- Reconfirmed Vercel inspect maps the production aliases to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`.
- Confirmed DNS resolves apex and `www` to Vercel A records.
- Confirmed apex, `www`, and Vercel app alias cache-busted checks return Sprint 029 markers and no old-page markers.
- Confirmed the exact reported old-content URL `https://precisionperformance.com.au/?review029h=1` returns Sprint 029 markers and no old-page markers.
- Confirmed the raw deployment URL redirects to Vercel SSO/login rather than anonymously serving public content.
- Confirmed final public route smoke passes for root, stale redirects, sign-in, protected anonymous redirects, and checkout unavailable behavior.
- Captured 029I evidence in `planning/reviews/029I-live-public-content-reconciliation-and-hard-deploy-evidence.md`.
- Applied `planning/architect-packs/architect-pack-029J-rendered-live-visual-reconciliation-and-deploy-correction.md`.
- Created `planning/sprints/029J-rendered-live-visual-reconciliation-and-deploy-correction/SPRINT.md`.
- Reproduced the rendered-live mismatch: live text markers were present, but the hero image asset returned 404 and the optimized image request failed.
- Corrected the root-page mobile hero wrapping and width containment in `app/page.tsx`.
- Reconfirmed `npm.cmd run validate:json`, `npm.cmd run validate:static`, `npm.cmd run typecheck`, and `npm.cmd run lint` pass.
- Proved `npm.cmd run build` in clean release worktree `C:\Users\rrank\AppData\Local\Temp\pnr-029j-release-worktree-20260724210200`.
- Deployed commit `14bc568` to the intended Vercel project as deployment `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`.
- Confirmed Vercel inspect maps production aliases to `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy`.
- Confirmed apex and `www` hero image endpoints return 200.
- Captured Edge DevTools rendered screenshots for local, apex, and `www` at desktop, tablet, and mobile sizes; all have matching viewport scroll widths and non-zero hero image dimensions.
- Confirmed final public route smoke passes.
- Captured 029J evidence in `planning/reviews/029J-rendered-live-visual-reconciliation-and-deploy-correction-evidence.md`.

## Architecture / File Map

- `app/page.tsx`: Sprint 029 marketing-preview front page; 029B layout correction only.
- `eslint.config.mjs`: Sprint 029D ESLint 9 flat-config bridge for existing Next/TypeScript lint coverage.
- `package.json`: Sprint 029C script correction for project-local Node command resolution.
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`: current public page, claims, validation, and deployment-blocker record.
- `planning/reviews/029B-deployment-completion-evidence.md`: 029B pack, correction, worktree isolation, validation, Vercel metadata, and manual intervention evidence.
- `planning/reviews/029C-validation-build-and-deployment-unblock-evidence.md`: 029C validation/build diagnosis and manual intervention evidence.
- `planning/reviews/029D-lint-build-workspace-and-deployment-proof-evidence.md`: 029D lint/build workspace, route smoke, Vercel metadata, and manual intervention evidence.
- `planning/reviews/029E-visual-smoke-stage-push-and-vercel-deploy-evidence.md`: 029E validation/build/HTTP smoke and browser-smoke blocker evidence.
- `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`: 029F validation/build/HTTP smoke, automated-browser failure, operator-assisted visual proof, staging/deployment evidence.
- `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`: 029G production-alias marker proof, Vercel inspect result, and public route smoke.
- `planning/reviews/029H-external-public-alias-correction-and-final-smoke-evidence.md`: 029H stronger external-public live checks, DNS/header evidence, Vercel inspect result, and final route smoke.
- `planning/reviews/029I-live-public-content-reconciliation-and-hard-deploy-evidence.md`: 029I source/build/Vercel/DNS/public-content reconciliation of the reported old-content URL, raw deployment SSO finding, and final route smoke.
- `planning/reviews/029J-rendered-live-visual-reconciliation-and-deploy-correction-evidence.md`: 029J rendered-live mismatch reproduction, hero asset/mobile correction, intended Vercel deployment, visual screenshot parity, and route smoke.
- `planning/reviews/029J-visual-artifacts/`: final local/apex/`www` Edge DevTools screenshots.
- `planning/sprints/029J-rendered-live-visual-reconciliation-and-deploy-correction/SPRINT.md`: latest 029J sprint source.

## Decisions

- Keep `noindex`/`nofollow` and preview-only classification.
- Do not deploy until browser/viewport smoke and sprint-only staging pass. Operator-assisted visual smoke passed in 029F.
- Do not stage or commit unrelated active 021AA work.
- `.vercel/project.json` may be read only for non-secret target shape; do not commit or reproduce its identifiers unnecessarily.

## Risks / Watch Items

- Automated browser/viewport screenshot capture remains unavailable in the current environment: installed Edge did not emit screenshot evidence, and the connected Node REPL browser path failed to start.
- Production build depends on a non-OneDrive workspace or equivalent reparse-safe output/dependency path.
- The worktree still contains unresolved active Sprint 021AA changes outside 029B scope.
- Deployed rendered smoke passed on the production alias after 029J. If a reviewer still sees old content or a broken visual, first test the exact URL in a private-window or hard-refresh live request and compare against the 029J screenshot evidence before treating search/browser cache as current production evidence.
- A temporary non-target Vercel project/deployment was created by an initial unlinked release-worktree deploy attempt. It is not aliased to production and may be removed manually by an operator after confirming it is not `pnr-precision-performance`.
- Do not claim public relaunch, SEO launch, full public website completion, product Done, commerce readiness, authenticated readiness, deployment readiness, or production readiness.

## Open Questions For The Architect

- No new Architect question for 029F before staging; Builder is proceeding through explicit sprint-only staging while preserving unrelated 021AA dirty state.

## Validation / Test Status

Passed:

- `npm.cmd run validate:static`
- `npm.cmd run validate:json`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build` in `C:\Users\rrank\AppData\Local\Temp\pnr-029f-build-workspace-20260724151849` after locked dependency install.
- Safe local HTTP route smoke for `/`, `/home`, `/contact`, `/shop`, `/shop/example`, `/sign-in`, `/admin`, `/portal`, `/data-entry`, and `/api/checkout`.
- Operator-assisted visual smoke for mobile, tablet, desktop, keyboard traversal, hero image visibility, overflow/readability, and status indicators.
- Public alias marker smoke for Sprint 029 content.
- Public route-safety smoke on `https://precisionperformance.com.au`.
- Read-only Vercel inspect of the production alias.
- Sprint 029H live cache-busted checks for apex, `www`, and Vercel app alias.
- Sprint 029H DNS checks for apex and `www`.
- Sprint 029I source/build/Vercel/DNS/public-content reconciliation.
- Sprint 029I live cache-busted checks for apex, `www`, Vercel app alias, and the exact reported `?review029h=1` URL.
- Sprint 029I final public route smoke.
- Sprint 029J root-page source correction, clean-worktree build, intended Vercel deployment, live hero image 200 checks, Edge DevTools local/apex/`www` screenshot parity, and final route smoke.

Blocked/limited:

- The raw Vercel deployment URL redirects to Vercel SSO; public smoke used the production alias `https://precisionperformance.com.au`.
- Local SSH push was unavailable in 029F (`Permission denied (publickey)`), so the remote release branch was created/updated through the GitHub API connector.

## Recommended Next Architect Action

Plan any broader public website, commerce, authenticated, SEO/indexing, final launch, or production-readiness work separately. Preserve the Sprint 029J marketing-preview boundary.
