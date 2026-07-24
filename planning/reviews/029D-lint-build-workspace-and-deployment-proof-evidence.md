# Sprint 029D Lint Build Workspace And Deployment Proof Evidence

Date: 2026-07-24

## Scope

Sprint 029D applied `planning/architect-packs/architect-pack-029D-lint-build-workspace-and-deployment-proof.md` and created `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md`.

Final status: blocked before deployment.

No commit, push, deployment, remote setting mutation, DNS change, Supabase change, Stripe change, secret inspection, auth/RLS implementation, commerce enablement, or unrelated 021AA staging occurred.

## Changes Made

- Added `eslint.config.mjs` using `@eslint/eslintrc` `FlatCompat` to carry forward the existing `next/core-web-vitals` and `next/typescript` lint intent for ESLint 9.
- Updated `app/page.tsx` to use `next/link` for internal `/` and `/sign-in` navigation flagged by Next lint.
- Preserved existing `.eslintrc.json` for compatibility/history.

## Validation

Passed in the project workspace:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`

Lint result:

- `npm.cmd run lint` passed with no ESLint warnings or errors after the flat-config bridge and internal-link correction.

Reparse-safe build workspace:

- Source path: `C:\Users\rrank\OneDrive\PNR Precision Performance`
- Build workspace: `C:\Users\rrank\AppData\Local\Temp\pnr-029d-build-workspace-20260724135646`
- Excluded from the copied workspace: `.git/**`, `.vercel/**`, `.env*`, and generated project output.
- Initial dependency junction to OneDrive `node_modules` proved insufficient: build compiled and passed lint/type, then failed during page-data collection when workers read dependencies through the OneDrive-backed dependency tree.
- Locked dependencies were installed into the disposable temp workspace with `npm.cmd ci --prefer-offline --no-audit`.
- `npm.cmd run build` then passed in the temp workspace, generating 24 app routes. `/` built as static content at about 5.5 kB and first-load JS about 110 kB.
- The disposable temp workspace was removed after proof was recorded.

## Local Route Smoke

Local server command:

- Temp workspace direct Next start on `127.0.0.1:3000`.

Safe HTTP smoke results:

| Route | Result |
|---|---|
| `/` | `200`, title `Precision Performance` |
| `/home` | `307` to `/` |
| `/contact` | `307` to `/` |
| `/shop` | `307` to `/` |
| `/shop/example` | `307` to `/` |
| `/sign-in` | `200` |
| `/admin` | `307` to `/sign-in?setup=supabase&next=%2Fadmin` |
| `/portal` | `307` to `/sign-in?setup=supabase&next=%2Fportal` |
| `/data-entry` | `307` to `/sign-in?setup=supabase&next=%2Fdata-entry` |
| `/api/checkout` | `405` on safe GET |

Checkout remained unavailable through safe GET route checks. Public stale routes redirected to `/`. Anonymous protected routes redirected to sign-in.

## Vercel Target Check

`.vercel/README.txt` confirmed `.vercel/project.json` stores linked Vercel project and owner identifiers and should not be committed.

`.vercel/project.json` was read only for shape:

- `projectId` present
- `orgId` present
- values were not committed and are not reproduced here

No Vercel settings, environment variables, DNS, or deployment state were changed.

## Blockers

Deployment did not proceed because all required 029D gates did not pass.

Remaining blockers:

1. Browser/viewport smoke could not be completed in this environment. No Chrome, Edge, Chromium, or Playwright browser automation was available without installing new tooling.
2. The worktree still contains extensive unrelated dirty state outside Sprint 029/029B/029C/029D scope, so sprint-only staging/commit/push/deploy remains a high-care step.
3. Deployed smoke did not run because no deployment occurred.

## Manual Intervention Required

What is blocked or not working:

- Sprint 029 marketing-preview deployment remains blocked before commit, push, and Vercel deployment.

Evidence already checked:

- Lint is aligned and passes under ESLint 9.
- JSON/static/typecheck pass in the project workspace.
- Production build passes in a non-OneDrive temp workspace with temp-installed locked dependencies.
- Safe local HTTP route smoke confirms `/`, stale public redirects, sign-in, protected anonymous redirects, and checkout GET unavailable behavior.
- Vercel linked-target metadata has the expected non-secret shape.

Exact user/manual action needed:

1. Provide or authorize a browser-capable smoke surface such as installed Chrome/Edge/Playwright, or provide a Vercel preview URL after an operator-run preview deployment.
2. Confirm the exact Sprint 029/029B/029C/029D files to stage while preserving unrelated active 021AA dirty work.
3. Authorize explicit path staging, commit, push, and Vercel deployment after browser smoke passes.

Step-by-step instructions:

1. Install or expose a browser automation surface, or run the built temp workspace locally and verify `/` at mobile, tablet, and desktop widths.
2. Confirm there is no text overlap, clipping, awkward overflow, inaccessible CTA state, or broken hero image.
3. Confirm `/home`, `/contact`, `/shop`, and `/shop/[slug]` redirect to `/`.
4. Confirm anonymous `/admin`, `/portal`, and `/data-entry` redirect to sign-in.
5. Confirm checkout remains unavailable and no public purchase path is opened.
6. Confirm the explicit stage list before any `git add`.
7. Deploy only through the confirmed Vercel project target.

Builder will verify afterward:

1. Rerun `npm.cmd run validate:json`, `npm.cmd run validate:static`, `npm.cmd run typecheck`, `npm.cmd run lint`, and the temp-workspace `npm.cmd run build`.
2. Record browser viewport evidence.
3. Inspect staged diff for only Sprint 029/029B/029C/029D files.
4. Record commit hash, push result, deployment URL, and deployed smoke if deployment proceeds.
