# Sprint 029E Visual Smoke Stage Push And Vercel Deploy Evidence

Date: 2026-07-24

## Scope

Sprint 029E applied `planning/architect-packs/architect-pack-029E-visual-smoke-stage-push-and-vercel-deploy.md` and created `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md`.

Final status: blocked before deployment.

No source changes were made for 029E. No files were staged, committed, pushed, or deployed. No Vercel setting, DNS, environment variable, Supabase, Stripe, auth/RLS, commerce, or production data mutation occurred.

## Validation

Passed in the project workspace:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`

Reparse-safe build workspace:

- Source path: `C:\Users\rrank\OneDrive\PNR Precision Performance`
- Build workspace: `C:\Users\rrank\AppData\Local\Temp\pnr-029e-build-workspace-20260724143732`
- Excluded from the copied workspace: `.git/**`, `.vercel/**`, `.env*`, `node_modules/**`, and generated project output.
- Locked dependencies were installed into the disposable temp workspace with `npm.cmd ci --prefer-offline --no-audit`.
- `npm.cmd run build` passed in the temp workspace, generating 24 app routes. `/` built as static content at about 5.49 kB and first-load JS about 110 kB.
- The disposable temp workspace and generated project-root `.next` output were removed after proof was recorded.

## Local HTTP Smoke

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

## Browser / Viewport Smoke Attempt

Browser-capable surfaces checked:

- Microsoft Edge executable was found at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- Chrome was not found on PATH or in common Program Files locations.
- The connected Node REPL/browser route failed to start with `The system cannot find the path specified.`

Headless Edge attempts:

- `--headless=new --screenshot` failed before producing a screenshot with GPU-process errors.
- Retried with a dedicated user profile and conservative GPU flags; Edge returned without creating a screenshot.
- `--dump-dom` returned no DOM output.

Because no browser/viewport smoke surface produced visual evidence, Sprint 029E stopped before staging, commit, push, or deployment as required by the sprint.

## Vercel Target

Sprint 029D already confirmed `.vercel/project.json` has the expected non-secret `projectId` and `orgId` shape. No identifiers are reproduced here, and `.vercel/**` was not copied to the temp build workspace.

## Worktree Isolation

No staging occurred because browser/viewport smoke did not pass.

The intended Sprint 029/029B/029C/029D/029E stage set remains limited to approved files only, and unrelated active 021AA dirty work must not be staged.

## Manual Intervention Required

What is blocked or not working:

- Browser/viewport smoke for mobile, tablet, desktop, keyboard, hero image, overlap, clipping, overflow, and CTA readability could not be completed.
- Commit, push, Vercel deployment, and deployed smoke remain blocked.

Evidence already checked:

- JSON/static/typecheck/lint pass in the project workspace.
- Production build passes in a non-OneDrive temp workspace.
- Safe HTTP route smoke passes.
- Edge exists locally but did not produce screenshot or DOM output in headless mode.
- The connected Node REPL browser path is unavailable.

Exact user/manual action needed:

1. Provide a working browser/viewport smoke surface, such as an interactive Edge/Chrome session, Playwright-enabled environment, or operator screenshots/live confirmation for mobile, tablet, and desktop.
2. Confirm the explicit Sprint 029/029B/029C/029D/029E file stage list after browser smoke passes.
3. Authorize commit, push, and Vercel deployment only after browser smoke and staged-diff inspection pass.

Step-by-step instructions:

1. Open the locally built preview or a safe preview URL at mobile, tablet, and desktop widths.
2. Confirm the hero image renders and is not broken.
3. Confirm there is no text overlap, clipping, awkward overflow, unreadable CTA state, or broken navigation.
4. Confirm keyboard traversal reaches visible navigation and CTA controls.
5. Confirm `/home`, `/contact`, `/shop`, and `/shop/[slug]` redirect to `/`.
6. Confirm anonymous `/admin`, `/portal`, and `/data-entry` redirect to sign-in.
7. Confirm checkout remains unavailable and no public purchase path is opened.
8. Confirm explicit path staging before any `git add`.

Builder will verify afterward:

1. Rerun `npm.cmd run validate:json`, `npm.cmd run validate:static`, `npm.cmd run typecheck`, `npm.cmd run lint`, and the temp-workspace production build.
2. Record browser/viewport evidence.
3. Inspect staged diff for only Sprint 029/029B/029C/029D/029E files.
4. Record commit hash, push result, Vercel deployment URL, and deployed smoke if deployment proceeds.
