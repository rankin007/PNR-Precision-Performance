# Sprint 029C Validation Build And Deployment Unblock Evidence

Date: 2026-07-24

## Scope

Sprint 029C applied `planning/architect-packs/architect-pack-029C-validation-build-and-deployment-unblock.md` and created `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`.

The sprint remained bounded to validation/build diagnosis, safe generated-cache cleanup, Vercel target confirmation planning, route/render proof only if gates passed, and sprint-only staging/deployment only if all gates passed.

No commit, push, deployment, remote mutation, secret inspection, auth work, commerce work, Supabase work, or unrelated 021AA staging occurred.

## Changes Made

- Updated `package.json` validation/build scripts to resolve the project-local Node runtime with `npm exec -- node ...`.
- Removed generated `.next` output under the project root after verifying the resolved target stayed inside the workspace.
- Removed generated `tsconfig.tsbuildinfo` during the initial cleanup pass.
- Applied OneDrive local-pin metadata to `public/under-construction-thoroughbred.jpg` and generated `.next` output as a filesystem diagnostic.

## Evidence

Passed after the script correction:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`

Build diagnostics:

- Before cleanup, direct local Node TypeScript completed, but `npm` scripts were resolving the global Node 24 runtime rather than the project-local Node 22.14.0 runtime.
- After script correction and generated-cache cleanup, `npm.cmd run build` reached Next build execution.
- After public asset hydration/pinning and clean `.next` removal, `npm.cmd run build` compiled successfully in approximately 4.3 minutes, then stalled at `Linting and checking validity of types ...`.
- Diagnostic `next build --no-lint` hit `EINVAL: invalid argument, readlink '.next\\package.json'`, showing generated `.next` output inside OneDrive still has reparse metadata that Next can trip over.

Lint diagnostics:

- Direct ESLint invocation failed quickly with `ESLint couldn't find an eslint.config.(js|mjs|cjs) file.`
- Existing lint configuration is `.eslintrc.json` with `next/core-web-vitals` and `next/typescript`.
- Installed ESLint is v9.39.4, which expects flat config by default.
- `next lint` and `next lint --file app/page.tsx --no-cache` timed out before useful diagnostics, but direct ESLint isolated the configuration mismatch.

Filesystem diagnostics:

- `public/under-construction-thoroughbred.jpg` was readable and hashable, but carried OneDrive reparse metadata.
- Rebuilt `.next` entries also carried OneDrive reparse metadata.

## Current Blockers

1. ESLint config migration is required before `npm.cmd run lint` or a full Next production build can pass in the current dependency set.
2. OneDrive reparse metadata on generated `.next` output can still produce Next filesystem errors during build diagnostics.
3. Vercel target confirmation, rendered smoke, deployment, deployed smoke, staging, commit, and push did not run because full local gates did not pass.
4. Unrelated active 021AA dirty-tree state remains outside this sprint and was not staged or modified for deployment.

## Manual Intervention Required

What is blocked or not working:

- Full lint/build/deployment completion for Sprint 029 remains blocked.

Evidence already checked:

- JSON/static/typecheck gates pass through corrected scripts.
- Direct ESLint reports missing flat config under ESLint 9.39.4.
- Next build compiles the app but stalls at the lint/type stage.
- Diagnostic no-lint build reports `.next\\package.json` readlink failure under OneDrive reparse metadata.

Exact user/manual action needed:

1. Authorize a bounded follow-up to migrate lint configuration to ESLint flat config or otherwise align Next linting with the installed dependency set.
2. Provide or authorize a non-OneDrive clean workspace/build path, or authorize a project configuration approach that keeps generated Next build output away from OneDrive Cloud Files reparse behavior.
3. Decide how to isolate the unrelated 021AA dirty work before any sprint-only staging, commit, push, or deployment.
4. Confirm the safe Vercel project/target path without exposing secrets.

Builder verification after action:

1. Rerun `npm.cmd run validate:json`, `npm.cmd run validate:static`, `npm.cmd run typecheck`, `npm.cmd run lint`, and `npm.cmd run build`.
2. Run local rendered route smoke for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, `/login`, `/admin`, `/dashboard`, `/api/stripe/webhook`, and `/auth/callback`.
3. If gates pass and deployment is authorized, stage only Sprint 029/029B/029C approved files, commit, push, deploy, and perform deployed smoke.
