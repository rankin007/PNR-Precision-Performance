# Sprint 029C - Validation Build And Deployment Unblock

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, generated-cache cleanup, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029C is a corrective follow-up to Sprint 029 and Sprint 029B. It keeps the same core sprint number and uses suffix `C` under the project numbering rule. It must not reopen Sprint 029/029B as a broad feature sprint, consume Sprint 030, or expand into Sprint 022 product work.

## Starting Point

- Branch recorded in current state: `develop`.
- Sprint `029-public-front-page-marketing-preview-and-vercel-deployment` is applied and locally built.
- Sprint `029B-public-front-page-deployment-completion` is applied and blocked before deployment.
- The root marketing-preview front page remains in place at `/`.
- Sprint 029B corrected the suspect front-page width/layout classes in `app/page.tsx`.
- Sprint 029B did not commit, push, or deploy.
- Sprint 029B static validation passed and source inspection found no remaining `w-[min` or `100%-2rem` classes in `app/page.tsx`.
- Sprint 029B reported TypeScript/build validation hangs before diagnostics:
  - `npm.cmd run typecheck` timed out after 240 seconds.
  - direct `tsc` timed out after 60 seconds.
  - `npm.cmd run build` timed out after 240 seconds.
  - `npm.cmd run lint` timed out after 180 seconds when run in parallel with TypeScript.
- Rendered/browser smoke did not run after the 029B correction.
- Deployed smoke did not run.
- `.vercel/project.json` exists but could not be read reliably from prior shells, so Vercel target content remains unconfirmed.
- The worktree still contains extensive unrelated active Sprint 021AA dirty state outside Sprint 029/029B/029C scope.
- Evidence mismatch to reconcile: the user-facing Builder report claimed `npm.cmd run validate:json` passed for 029B, while `planning/reviews/029B-deployment-completion-evidence.md` listed only `validate:static` and the source check under Passed.

Builder must first reconcile the current evidence and active worktree boundary. No commit, push, or deployment may occur until validation/build, Vercel target confirmation, route smoke, and sprint-only staging are all clean.

## Goal

Unblock the Sprint 029B deployment path by diagnosing and resolving the local TypeScript/build hang, safely confirming the Vercel target, completing rendered smoke, and preparing a sprint-only deployment candidate.

If all required gates pass, Builder may commit, push, deploy through the confirmed Vercel path, and run deployed smoke. If any required gate remains blocked, Builder must close 029C as blocked with precise manual-intervention evidence.

The useful outcome is one of:

- marketing-preview deployed with evidence
- deployed but gated/preview-only with evidence
- blocked before deployment with narrowed root cause and manual steps
- deployed but requiring follow-up corrections

## Required Reading

Builder must read before source edits or cleanup:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `planning/STATE.md`
6. `planning/STATUS.json`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DECISIONS.md`
9. `planning/RISKS.md`
10. `planning/QUESTIONS.md`
11. `planning/SPRINT_SCHEDULE.md`
12. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
13. `planning/EVIDENCE_INDEX.md`
14. `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`
15. `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`
16. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
17. `planning/reviews/029B-deployment-completion-evidence.md`
18. current public route files for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, and `/sign-in`
19. route/auth layout files needed only to verify anonymous protected-route safety

## Product And Messaging Requirements

Sprint 029C does not authorize new public marketing content except narrow correction needed to preserve or verify the existing front page.

Preserve Sprint 029/029B messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Use qualified language such as supports more informed decisions, helps identify changes over time, trend-based visibility, individual baseline, trainer judgement, and professional veterinary review where needed.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow` unless a later source authority explicitly changes SEO/indexing status. Sprint 029C does not authorize indexing launch.

## Investigation Requirements

Builder must investigate the validation/build hang before any deployment.

Minimum diagnostic order:

1. Confirm there are no still-running `node`, `next`, `tsc`, or validation processes owned by this project that could explain the hang.
2. Confirm the local Node/npm entry points being used and whether `npm.cmd` is still the appropriate PowerShell-safe path.
3. Run the smallest useful command first, with bounded timeouts and captured terminal evidence.
4. Avoid running long validation commands in parallel while diagnosing a hang.
5. Prefer commands that produce incremental diagnostics before repeating full `build`.
6. Record whether the hang is reproducible after any allowed cleanup.

Builder may perform bounded generated-cache cleanup only if evidence points to generated Next/TypeScript cache state as a plausible cause.

Allowed generated-cache cleanup:

- `.next/**` under the project root only.
- `tsconfig.tsbuildinfo` or other generated TypeScript incremental cache files only if present under the project root.

Cleanup controls:

- Resolve the absolute path before cleanup.
- Record the exact target path.
- Verify the target is inside `C:\Users\rrank\OneDrive\PNR Precision Performance`.
- Do not delete source files, planning files, public assets, `.env*`, `.vercel/**`, `node_modules/**`, `.git/**`, Supabase migrations, or unrelated Sprint 021AA files.
- If the cleanup command requires approval in the current shell, request it and explain that it is limited to generated project cache.

## Vercel Target Requirements

Builder must confirm the Vercel target before deployment without exposing secrets or mutating settings.

Allowed target confirmation methods:

- read `.vercel/README.txt`.
- inspect `.vercel/project.json` only for non-secret project/org identifier shape or target confirmation; do not commit it and do not print sensitive or private values unnecessarily.
- use Vercel CLI read-only project/status commands if available and authenticated, provided no settings or environment variables are changed.
- ask the operator to confirm the project target manually if local metadata remains unreadable.

Builder must not:

- print secret values or fragments.
- read `.env*` values.
- change Vercel project settings.
- change Vercel environment variables.
- change DNS.
- deploy if the target remains ambiguous.

## Public Visibility Policy

Sprint 029C may complete the front-page marketing preview deployment only after required validation/build, target confirmation, worktree isolation, and route smoke pass.

The sprint must still preserve safety:

- Public shop checkout must remain disabled, redirected, or clearly unavailable.
- `/home`, `/contact`, `/shop`, and `/shop/[slug]` must not expose stale or conflicting unfinished public content by accident.
- Existing authenticated, portal, admin, ops, Supabase, Stripe, webhook, and checkout protections must not be weakened.
- No new stored lead capture, mailing-list provider, CRM integration, email API, webhook, CMS, upload, voice, Supabase, Stripe, commerce, schema, or auth behavior may be added.
- Vercel project settings, DNS, environment variables, Supabase, Stripe, production databases, and production data must not be mutated.

If deployment would expose more than the Sprint 029/029B/029C front-page marketing preview or reopen unfinished shop/contact/checkout/auth/admin/portal/ops behavior, Builder must stop and record manual intervention.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029C file.
- reconcile the 029B `validate:json` evidence mismatch.
- inspect current worktree status and identify sprint-related versus unrelated dirty files.
- investigate the TypeScript/build hang using bounded local commands.
- stop or clean up only clearly owned stale local project validation/server processes when needed to unblock validation.
- remove generated `.next/**` cache under the project root if evidence supports generated cache cleanup and path controls pass.
- remove generated TypeScript incremental cache files under the project root if present and path controls pass.
- make narrow source or config fixes only if diagnostics identify a real Sprint 029/029B-introduced issue within the approved file set.
- preserve existing route redirects/unavailable behavior for `/home`, `/contact`, `/shop`, and `/shop/[slug]`.
- inspect protected route behavior only enough to verify anonymous route safety.
- confirm Vercel target through safe read-only methods.
- run local validation and production build.
- run rendered local or preview browser smoke for `/` and route safety.
- stage only Sprint 029/029B/029C files.
- create an intentional Sprint 029C commit.
- push the sprint branch or agreed branch to the configured remote.
- deploy through the confirmed existing Vercel project workflow.
- run post-deployment smoke checks for deployed front page rendering, route redirects, checkout unavailable behavior, and anonymous protected-route safety.
- update Sprint 029/029B/029C closeout documentation and current planning/status files with evidence-backed results.

## Out Of Scope

Builder must not:

- implement new public sections or a redesign beyond narrow corrections required by diagnostics.
- add CMS, blog/Insights publishing, database content model, or new backend architecture.
- add Supabase schema, migrations, RLS, roles, permissions, Storage, uploads, OCR, voice, providers, or remote data mutation.
- change auth, portal, admin, ops, callback, webhook, or protected route behavior except to confirm it remains protected.
- add Stripe checkout behavior, public purchasing, billing, catalogue mutation, price changes, webhook changes, or commerce enablement.
- create stored lead capture, mailing-list integration, CRM integration, email API, webhook, or third-party marketing automation.
- invent production scoring thresholds, pH rules, Table of Knowledge recommendations, veterinary advice, or final score terminology.
- publish confidential formulas, raw pathology, raw worksheets, private horse/stable data, or identifiable people/horses without approved releases.
- delete historical pages or source files merely because they are not part of the front page.
- mutate DNS, Supabase, Stripe, production databases, Vercel project settings, or environment variables.
- inspect or expose secret values or secret fragments.
- stage, commit, push, deploy, revert, delete, or rewrite unrelated active Sprint 021AA work.
- delete `node_modules/**`, `.git/**`, `.vercel/**`, `.env*`, public assets, planning evidence, source files, Supabase migrations, or unrelated dirty files.
- resume, retry, modify, or close any Sprint 021AA/021Z authenticated proof work.
- begin Sprint 022 product implementation.

## Approved File Set

Builder may edit:

- `app/page.tsx`, only for diagnostics-backed front-page fixes
- `app/(marketing)/home/page.tsx`, only to preserve redirect/alignment with `/`
- `app/contact/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/shop/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/shop/[slug]/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/layout.tsx`, only for safe public metadata/noindex handling and no secret/config changes
- `components/**`, only for narrow front-page rendering corrections if existing components are involved
- `styles/**` or global CSS files, only for narrow front-page/design-token presentation corrections
- `tailwind.config.ts`, only if needed to correct an existing token/class issue without changing product behavior
- `package.json` and lockfile only if diagnostics prove a validation script bug inside the approved local validation path, with no dependency install unless separately approved
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/EVIDENCE_INDEX.md`

Builder may create:

- `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md` through Pack application only.
- focused evidence/review files under `planning/reviews/` to record validation diagnosis, cache cleanup, worktree isolation, route smoke, target confirmation, deployment smoke, or manual intervention.

Generated cleanup may remove:

- `.next/**` under the project root only.
- TypeScript incremental cache files under the project root only.

Inspection-only unless needed for route smoke verification:

- `app/(admin)/**`
- `app/(portal)/**`
- `app/(ops)/**`
- `app/auth/**`
- `app/api/**`
- `lib/auth/**`
- `lib/supabase/**`
- `supabase/**`
- `.env*` names/presence only, never values
- `.vercel/**` names/config shape only, never secrets

Any file outside this set requires a stop with exact scope-expansion rationale.

## Worktree Isolation Requirements

Builder must protect unrelated dirty state before commit, push, or deployment.

Minimum required checks:

1. Record `git status --short` before staging.
2. Identify the exact files intended for Sprint 029C staging.
3. Confirm no unrelated 021AA files are staged.
4. Use explicit path staging, not broad `git add .`.
5. Inspect staged diff before commit.
6. If a clean branch/worktree is needed, create or use it without deleting or reverting unrelated work.

If Sprint 029/029B/029C files cannot be isolated without risking unrelated work, Builder must stop and record manual intervention.

## Acceptance Criteria

1. Sprint 029C is applied as `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`.
2. The 029B `validate:json` evidence mismatch is reconciled in the evidence file or closeout.
3. The TypeScript/build hang is either resolved or narrowed to an evidence-backed blocker with exact manual steps.
4. Any generated-cache cleanup is limited to allowed project-root generated targets and recorded with path evidence.
5. `npm.cmd run validate:json` passes.
6. `npm.cmd run validate:static` passes.
7. `npm.cmd run typecheck` passes.
8. `npm.cmd run lint` passes.
9. `npm.cmd run build` passes.
10. If `npm.cmd run validate:local` is run and times out, component command pass/fail evidence is recorded clearly.
11. `/` renders a polished, responsive public front page aligned to the accepted design and messaging authority.
12. `/home`, `/contact`, `/shop`, and `/shop/[slug]` remain redirected, blocked, hidden, or clearly unavailable as recorded.
13. Checkout remains unavailable through public routes and direct checkout access does not create a live purchase path.
14. Anonymous protected-route checks show portal/admin/ops boundaries are not weakened.
15. Mobile, tablet, desktop, keyboard, and basic accessibility/render checks pass for the front page, or limitations are recorded with exact evidence.
16. Vercel target is confirmed through a safe method without changing settings or exposing secrets.
17. Staged files are limited to Sprint 029/029B/029C approved scope.
18. The sprint result is committed intentionally and pushed to the configured remote only after staging is confirmed.
19. The result is deployed through the confirmed Vercel project path only if all required gates pass.
20. Deployed smoke confirms front page rendering, route redirect/unavailable behavior, checkout unavailable behavior, and anonymous protected-route safety.
21. Documentation records diagnosis, any cleanup, page corrections, claims boundaries, route visibility, validation, deployment target, smoke results, worktree isolation, and any remaining manual intervention.
22. Closeout does not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.

## Validation Plan

Run commands sequentially, not in parallel, while diagnosing:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`

If all component commands pass and the aggregate command is stable enough to be useful, run:

- `npm.cmd run validate:local`

If a command hangs:

- record timeout duration.
- record last visible output.
- check for owned stuck local processes.
- narrow whether the hang appears before or after TypeScript/Next startup.
- do not proceed to deploy until the required gate is green or the sprint is closed blocked.

Rendered local or preview smoke must cover:

- `/`
- `/home`
- `/contact`
- `/shop`
- `/shop/[slug]`
- `/sign-in`
- anonymous protected routes sufficient to confirm no portal/admin/ops weakening
- direct checkout unavailable/redirect behavior if locally testable

Viewport checks must cover:

- mobile phone width
- tablet width
- desktop width
- keyboard traversal
- contrast/readability of CTA and status/preview elements
- no obvious text overlap, clipping, or awkward overflow

Deployment smoke must repeat the public and safety checks against the deployed URL if deployment occurs.

## Git, Push, And Vercel Deployment

Builder may create or use a branch named:

`codex/029C-validation-build-and-deployment-unblock`

If another branch is safer due to current worktree state, Builder must record the reason and preserve unrelated work.

Commit message should clearly identify Sprint 029C, for example:

`Unblock Sprint 029C front page deployment validation`

Builder must stop before:

- broad staging or committing unrelated files.
- pushing unrelated or unresolved active Sprint 021AA changes.
- force-pushing or rewriting shared history.
- changing DNS.
- changing Vercel project settings or environment variables.
- deploying if target metadata cannot be confirmed safely.
- deploying a build that exposes unfinished shop/checkout/auth/admin/portal/ops behavior publicly.
- deploying if local validation indicates a material safety or build failure.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- the active 021AA dirty state cannot be safely isolated.
- TypeScript/build remains hung after bounded diagnosis and allowed generated-cache cleanup.
- generated-cache cleanup requires user approval and approval is not available.
- `.vercel/project.json` or equivalent Vercel target metadata cannot be read safely.
- Vercel authentication is unavailable.
- deployment target selection is unclear.
- local or preview browser smoke cannot be completed.
- deployment exposes a broader public surface than Sprint 029C permits.
- any command would require exposing secrets or secret fragments.

## Closeout

At sprint close, Builder must update:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/DECISIONS.md`, only if a durable decision changed
- `planning/RISKS.md`, only if active risk changed
- `planning/QUESTIONS.md`, only if open questions changed
- `planning/SPRINT_SCHEDULE.md`, only if schedule/current-status references changed

Builder must also create or update a focused 029C evidence file under `planning/reviews/`.

Closeout must state one final status:

- marketing-preview deployed
- deployed but gated/preview-only
- blocked before deployment
- deployed but requiring follow-up corrections

Closeout must include:

- validation/build diagnosis and final command results
- cache/process cleanup performed, if any
- exact files staged and committed, if commit occurs
- branch name, commit hash, and push result, if push occurs
- Vercel project/target confirmation method without secrets
- deployment URL, if deployment occurs
- local and deployed smoke evidence
- remaining manual intervention, if any

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness from this sprint.
