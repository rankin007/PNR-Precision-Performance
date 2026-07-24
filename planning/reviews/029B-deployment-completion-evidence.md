# Sprint 029B Deployment Completion Evidence

## Status

Sprint 029B was applied and the root front-page width correction was implemented locally.

Final status for this run: blocked before deployment.

## Pack Application

- Pack: `planning/architect-packs/architect-pack-029B-public-front-page-deployment-completion.md`
- Generated sprint file: `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`
- Pack check: passed.
- Pack dry-run: created only the Sprint 029B sprint file.
- Pack apply: created only the Sprint 029B sprint file.

## Source Correction

Corrected `app/page.tsx` by replacing suspect Tailwind arbitrary width classes:

- removed `w-[min(100%-2rem,1180px)]`
- replaced front-page containers with `w-full max-w-[1180px]` plus responsive horizontal padding where needed
- replaced remaining `w-[min(100%,1180px)]` front-page containers with `w-full max-w-[1180px]`

This preserves the Sprint 029 copy, route behavior, public CTAs, metadata noindex/nofollow, and safety boundaries.

## Route Source State

Source inspection confirmed:

- `/home` redirects to `/`
- `/contact` redirects to `/`
- `/shop` redirects to `/`
- `/shop/[slug]` redirects to `/`
- `/sign-in` remains the existing sign-in route

No route, auth, checkout, Stripe, Supabase, schema, CMS, upload, voice, or provider behavior was changed.

## Worktree Isolation

The full worktree still contains extensive unrelated Sprint 021AA-era modified and untracked files.

Sprint 029/029B candidate files visible in `git status --short -- <paths>`:

- `app/page.tsx`
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`
- `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

No files were staged, committed, pushed, or deployed.

## Validation

Passed:

- `npm.cmd run validate:static`
- Source check found no remaining `w-[min` or `100%-2rem` classes in `app/page.tsx`.

Blocked or incomplete:

- `npm.cmd run typecheck` timed out after 240 seconds before diagnostic output.
- Direct `node node_modules/typescript/bin/tsc --noEmit --incremental false --pretty false --listFiles false` timed out after 60 seconds before diagnostic output.
- `npm.cmd run build` timed out after 240 seconds before Next.js progress output.
- `npm.cmd run lint` timed out after 180 seconds when run in parallel with TypeScript.
- Local rendered smoke was not rerun after the build/typecheck blocker because deployment is not permitted while validation/build are blocked.
- Deployed smoke did not run because no deployment occurred.

## Vercel Metadata

Inspection showed:

- `.vercel/project.json` exists and is a 130-byte OneDrive-linked file.
- `.vercel/README.txt` says `project.json` contains project and org IDs and should not be committed.

Content of `.vercel/project.json` was not read because prior attempts hung and Sprint 029B forbids exposing secrets or forcing unsafe metadata handling. The Vercel deployment target remains unconfirmed from local metadata.

## Manual Intervention Required

What is blocked:

Commit, push, Vercel deployment, rendered smoke, deployed smoke, and Sprint 029B deployment completion.

Evidence checked:

- Pack application was clean.
- The width/layout source defect was corrected.
- Static validation passed.
- TypeScript/build commands hang before diagnostics.
- The worktree still contains extensive unrelated 021AA dirty state.
- Vercel target content could not be safely confirmed from `.vercel/project.json`.

Exact user/manual action needed:

1. Decide whether to isolate Sprint 029/029B in a clean branch/worktree or first resolve the active 021AA dirty state.
2. Resolve or authorize investigation of the local TypeScript/build hang, including whether generated cache cleanup is allowed.
3. Confirm the Vercel project target through an operator-safe method that does not expose secrets or mutate settings.
4. After validation is green, authorize or run explicit path staging for only Sprint 029/029B files.
5. Permit the existing Vercel deploy path if the confirmed target is correct.

Builder will verify afterward:

1. `npm.cmd run validate:json`
2. `npm.cmd run validate:static`
3. `npm.cmd run typecheck`
4. `npm.cmd run lint`
5. `npm.cmd run build`
6. Rendered route smoke for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, `/sign-in`, and anonymous protected routes.
7. Explicit staged diff containing only Sprint 029/029B approved files.
8. Commit hash, push result, Vercel deployment URL, and deployed safety smoke if deployment proceeds.
