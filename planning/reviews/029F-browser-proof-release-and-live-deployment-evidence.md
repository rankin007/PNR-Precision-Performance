# Sprint 029F Evidence - Browser Proof Release and Live Deployment

## Status

Marketing-preview deployed.

## Timestamp

- 2026-07-24 15:31:25 +10:00

## Pack Application

- Applied `planning/architect-packs/architect-pack-029F-browser-proof-release-and-live-deployment.md`.
- Created `planning/sprints/029F-browser-proof-release-and-live-deployment/SPRINT.md`.

## Validation Evidence

- Production-like temp workspace created at `C:\Users\rrank\AppData\Local\Temp\pnr-029f-build-workspace-20260724151849`.
- `npm.cmd ci --prefer-offline --no-audit` passed after approved escalation for npm cache/registry access.
- `npm.cmd run build` passed in the temp workspace.
- Build completed with Next.js 15.3.8 and generated the expected app routes.
- Root workspace validation passed after operator visual confirmation:
  - `npm.cmd run validate:json`
  - `npm.cmd run validate:static`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`

## HTTP Route Smoke

Temp production server on `127.0.0.1:3019` returned:

- `/` -> 200, title `Precision Performance`, body length 43286
- `/home` -> 307
- `/contact` -> 307
- `/shop` -> 307
- `/shop/example` -> 307
- `/sign-in` -> 200
- `/admin` -> 307
- `/portal` -> 307
- `/data-entry` -> 307
- `/api/checkout` -> 405 for safe GET

## Browser Automation Attempt

- Edge executable found at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- Headless Edge launched against the temp production server for mobile, tablet, and desktop viewport sizes.
- No screenshot files were produced.
- Edge emitted GPU process failures ending with `GPU process isn't usable. Goodbye.`
- Node REPL browser tooling remained unavailable with `failed to start Node runtime: The system cannot find the path specified. (os error 3)`.

## Operator-Assisted Visual Proof

Why manual proof was required:

- The 029F browser/viewport visual proof gate could not be completed through automated screenshot capture.

Evidence already checked:

- Temp production build passed.
- HTTP route smoke passed.
- Visible local production server is responding at `http://127.0.0.1:3029/`.
- Edge windows were launched for operator-assisted inspection.

Manual action completed:

1. Inspect `http://127.0.0.1:3029/` in the opened Edge windows, or open it manually if needed.
2. Check mobile, tablet, and desktop widths.
3. Confirm the hero image is visible.
4. Confirm no obvious overlap, clipping, horizontal overflow, or unreadable CTA text is present.
5. Confirm status indicators are readable.
6. Confirm keyboard traversal reaches the primary page links and CTAs in a sensible order.

Operator result:

- Operator confirmed: visual smoke passes.
- Builder may continue with the remaining 029F gates before staging, push, and deployment.

## Vercel Target Confirmation

- `.vercel/project.json` exists.
- Safe shape check confirmed `projectId` is present.
- Safe shape check confirmed `orgId` is present.
- Identifier values were not reproduced in evidence.

## Deployment Status

- Local sprint commit: `ce88697` (`Deploy Sprint 029F front page marketing preview`).
- Plain `git push origin develop` was stopped because `develop` was already ahead of `origin/develop` by older unrelated local commits.
- Isolated release branch: `codex/029F-browser-proof-release-and-live-deployment`.
- Isolated release worktree commit: `d79ace2`.
- Local SSH push was unavailable after host-key acceptance because GitHub rejected the available key with `Permission denied (publickey)`.
- GitHub API created the remote release branch and published the runtime-critical 029F route changes there.
- Vercel CLI 56.5.0 deployed from the isolated release worktree using `npm.cmd exec -- vercel deploy --prod --yes --archive=tgz`.
- Deployment ID: `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`.
- Deployment URL: `https://pnr-precision-performance-leqvohy7q-rankin007s-projects.vercel.app`.
- Production alias reported by Vercel and used for public smoke: `https://precisionperformance.com.au`.

## Staging Evidence

Explicit staging was performed for:

- `app/page.tsx`
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `eslint.config.mjs`
- `package.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/reviews/029B-deployment-completion-evidence.md`
- `planning/reviews/029C-validation-build-and-deployment-unblock-evidence.md`
- `planning/reviews/029D-lint-build-workspace-and-deployment-proof-evidence.md`
- `planning/reviews/029E-visual-smoke-stage-push-and-vercel-deploy-evidence.md`
- `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
- `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`
- `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`
- `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`
- `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md`
- `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md`
- `planning/sprints/029F-browser-proof-release-and-live-deployment/SPRINT.md`

Unrelated active Sprint 021AA/auth/Supabase dirty files remained unstaged.

## Deployed Smoke

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

The raw Vercel deployment URL redirected to Vercel SSO and was not used for public smoke evidence.

## Remaining Limitations

- The deployment is a marketing-preview release only.
- Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.
- Local `develop` remains ahead of `origin/develop` by older commits outside this sprint.
- Unrelated Sprint 021AA/auth/Supabase dirty state remains in the main workspace.
