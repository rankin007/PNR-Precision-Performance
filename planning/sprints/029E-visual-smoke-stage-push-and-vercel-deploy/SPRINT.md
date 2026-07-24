# Sprint 029E - Visual Smoke Stage Push And Vercel Deploy

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, browser/viewport proof, worktree isolation, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029E is a deployment-execution follow-up to Sprint 029, 029B, 029C, and 029D. It keeps the same core sprint number and uses suffix `E` under the project numbering rule. It must not reopen earlier 029 work as a broad feature sprint, consume Sprint 030, or expand into Sprint 022 product work.

## Starting Point

- Branch recorded in current state: `develop`.
- Sprint `029-public-front-page-marketing-preview-and-vercel-deployment` created the local marketing-preview front page at `/`.
- Sprint 029B corrected suspect root page width/layout classes in `app/page.tsx`.
- Sprint 029C corrected `package.json` scripts so validation/build commands resolve project-local Node 22.14.0 through `npm exec -- node ...`.
- Sprint 029D aligned ESLint 9/Next linting through `eslint.config.mjs`.
- Sprint 029D updated internal route navigation in `app/page.tsx` to use `next/link`.
- Sprint 029D confirmed these pass in the project workspace:
  - `npm.cmd run validate:json`
  - `npm.cmd run validate:static`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
- Sprint 029D confirmed `npm.cmd run build` passes in a non-OneDrive temp workspace with locked dependencies installed there.
- Sprint 029D confirmed safe local HTTP route smoke for `/`, stale public redirects, sign-in, protected anonymous redirects, and safe checkout GET.
- Sprint 029D confirmed `.vercel/project.json` has the expected non-secret `projectId` and `orgId` shape without reproducing values.
- No commit, push, or deployment has occurred.
- Browser/viewport smoke is still missing.
- Deployed smoke is still missing.
- The worktree still contains extensive unrelated active Sprint 021AA dirty state outside Sprint 029/029B/029C/029D/029E scope.

Builder must not deploy until browser/viewport smoke, sprint-only staged diff, and final pre-deploy checks pass.

## Goal

Complete the final deployment execution for the Sprint 029 marketing-preview front page.

The useful outcome is:

1. Browser/viewport smoke proves the front page renders correctly at mobile, tablet, and desktop widths.
2. Sprint 029/029B/029C/029D/029E files are explicitly staged without unrelated 021AA work.
3. The sprint result is committed and pushed.
4. The confirmed Vercel project is deployed.
5. Deployed smoke verifies the front page, route redirects, checkout unavailable behavior, and anonymous protected-route safety.

If any required gate remains blocked, Builder must stop and close 029E with exact manual-intervention evidence.

## Required Reading

Builder must read before smoke testing, staging, push, or deployment:

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
16. `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`
17. `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md`
18. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
19. `planning/reviews/029B-deployment-completion-evidence.md`
20. `planning/reviews/029C-validation-build-and-deployment-unblock-evidence.md`
21. `planning/reviews/029D-lint-build-workspace-and-deployment-proof-evidence.md`
22. current public route files for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, and `/sign-in`
23. route/auth layout files needed only to verify anonymous protected-route safety

## Product And Messaging Requirements

Sprint 029E does not authorize new public marketing content except tiny corrections required by browser smoke, and only inside the approved file set.

Preserve Sprint 029/029B/029C/029D messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Use qualified language such as supports more informed decisions, helps identify changes over time, trend-based visibility, individual baseline, trainer judgement, and professional veterinary review where needed.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow` unless a later source authority explicitly changes SEO/indexing status. Sprint 029E does not authorize indexing launch.

## Browser And Visual Smoke Requirements

Builder must complete browser/viewport smoke before staging, push, or deployment.

Acceptable browser smoke surfaces:

- installed Chrome, Edge, Chromium, or Playwright if available.
- in-app browser tooling if available.
- a Vercel preview URL only if created through a safe preview path and deployed smoke still repeats after final deployment.
- operator-provided screenshots or live confirmation only if no automation surface exists; Builder must record the exact manual evidence and limitations.

Minimum viewport checks:

- mobile phone width.
- tablet width.
- desktop width.
- keyboard traversal of visible CTAs/navigation.
- hero image visible and not broken.
- no text overlap, clipping, awkward overflow, or unreadable CTA state.
- status/preview indicators remain colour plus readable text labels.

Minimum route checks:

- `/`
- `/home`
- `/contact`
- `/shop`
- `/shop/[slug]`, using a harmless placeholder slug
- `/sign-in`
- anonymous `/admin`
- anonymous `/portal`
- anonymous `/data-entry`
- safe checkout unavailable check, using only safe non-mutating method where possible

If browser/viewport smoke cannot be completed, Builder must stop before staging and deployment.

## Public Visibility Policy

Sprint 029E may deploy the front-page marketing preview only after required validation/build, browser/viewport smoke, target confirmation, worktree isolation, and staged diff checks pass.

The sprint must still preserve safety:

- Public shop checkout must remain disabled, redirected, or clearly unavailable.
- `/home`, `/contact`, `/shop`, and `/shop/[slug]` must not expose stale or conflicting unfinished public content by accident.
- Existing authenticated, portal, admin, ops, Supabase, Stripe, webhook, and checkout protections must not be weakened.
- No new stored lead capture, mailing-list provider, CRM integration, email API, webhook, CMS, upload, voice, Supabase, Stripe, commerce, schema, or auth behavior may be added.
- Vercel project settings, DNS, environment variables, Supabase, Stripe, production databases, and production data must not be mutated.

If deployment would expose more than the Sprint 029/029B/029C/029D/029E front-page marketing preview or reopen unfinished shop/contact/checkout/auth/admin/portal/ops behavior, Builder must stop and record manual intervention.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029E file.
- inspect current worktree status and identify sprint-related versus unrelated dirty files.
- rerun required validation and reparse-safe build proof from Sprint 029D.
- run browser/viewport smoke using an available browser-capable surface.
- make only tiny browser-smoke corrections in approved public files if needed.
- preserve existing route redirects/unavailable behavior for `/home`, `/contact`, `/shop`, and `/shop/[slug]`.
- inspect protected route behavior only enough to verify anonymous route safety.
- confirm Vercel target through safe read-only methods.
- stage only Sprint 029/029B/029C/029D/029E files using explicit paths.
- inspect staged diff before commit.
- create an intentional Sprint 029E commit.
- push the sprint branch or agreed branch to the configured remote.
- deploy through the confirmed existing Vercel project workflow.
- run post-deployment smoke checks for deployed front page rendering, route redirects, checkout unavailable behavior, and anonymous protected-route safety.
- update Sprint 029/029B/029C/029D/029E closeout documentation and current planning/status files with evidence-backed results.

## Out Of Scope

Builder must not:

- implement new public sections or a redesign beyond tiny browser-smoke corrections.
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
- install, remove, upgrade, or downgrade packages without separate approval.
- resume, retry, modify, or close any Sprint 021AA/021Z authenticated proof work.
- begin Sprint 022 product implementation.

## Approved File Set

Builder may edit only if needed for final browser-smoke/deployment evidence:

- `app/page.tsx`, only for tiny browser-smoke corrections.
- `app/(marketing)/home/page.tsx`, only to preserve redirect/alignment with `/`.
- `app/contact/page.tsx`, only to preserve safe redirect/unavailable behavior.
- `app/shop/page.tsx`, only to preserve safe redirect/unavailable behavior.
- `app/shop/[slug]/page.tsx`, only to preserve safe redirect/unavailable behavior.
- `app/layout.tsx`, only for safe public metadata/noindex handling and no secret/config changes.
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`.
- `planning/STATE.md`.
- `planning/STATUS.json`.
- `planning/ARCHITECT_BRIEFING.md`.
- `planning/DECISIONS.md`, only if a durable decision changed.
- `planning/RISKS.md`, only if active risk changed.
- `planning/QUESTIONS.md`, only if open questions changed.
- `planning/SPRINT_SCHEDULE.md`, only if schedule/current-status references changed.
- `planning/EVIDENCE_INDEX.md`.

Builder may create:

- `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md` through Pack application only.
- focused evidence/review files under `planning/reviews/` to record browser/viewport smoke, worktree isolation, staged diff, commit, push, deployment, deployed smoke, or manual intervention.

Builder may stage, if present and in-scope from earlier Sprint 029 follow-ups:

- `app/page.tsx`
- `eslint.config.mjs`
- `package.json`
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/sprints/029-public-front-page-marketing-preview-and-vercel-deployment/SPRINT.md`
- `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`
- `planning/sprints/029C-validation-build-and-deployment-unblock/SPRINT.md`
- `planning/sprints/029D-lint-build-workspace-and-deployment-proof/SPRINT.md`
- `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md`
- `planning/reviews/029B-deployment-completion-evidence.md`
- `planning/reviews/029C-validation-build-and-deployment-unblock-evidence.md`
- `planning/reviews/029D-lint-build-workspace-and-deployment-proof-evidence.md`
- the 029E focused evidence file
- current planning/status files listed above when changed by this deployment evidence

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
2. Identify the exact files intended for Sprint 029E staging.
3. Use explicit path staging only.
4. Do not use broad `git add .`.
5. Inspect `git diff --cached --name-status` before commit.
6. Inspect staged diff enough to confirm no unrelated 021AA files are included.
7. If a clean branch/worktree is needed, create or use it without deleting or reverting unrelated work.

If Sprint 029/029B/029C/029D/029E files cannot be isolated without risking unrelated work, Builder must stop and record manual intervention.

## Acceptance Criteria

1. Sprint 029E is applied as `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md`.
2. `npm.cmd run validate:json` passes.
3. `npm.cmd run validate:static` passes.
4. `npm.cmd run typecheck` passes.
5. `npm.cmd run lint` passes.
6. `npm.cmd run build` passes in the documented reparse-safe path.
7. Browser/viewport smoke passes for mobile, tablet, and desktop widths.
8. Browser smoke shows `/` renders the marketing-preview front page with no broken hero image, overlap, clipping, awkward overflow, or inaccessible CTA state.
9. `/home`, `/contact`, `/shop`, and `/shop/[slug]` remain redirected, blocked, hidden, or clearly unavailable as recorded.
10. Checkout remains unavailable and no public purchase path is opened.
11. Anonymous protected-route checks show portal/admin/ops boundaries are not weakened.
12. Vercel target is confirmed through a safe method without changing settings or exposing secrets.
13. Staged files are limited to Sprint 029/029B/029C/029D/029E approved scope.
14. Commit is created intentionally after staged diff inspection.
15. Push succeeds to the configured remote/branch.
16. Vercel deployment succeeds through the confirmed project path.
17. Deployed smoke confirms front page rendering, route redirect/unavailable behavior, checkout unavailable behavior, and anonymous protected-route safety.
18. Documentation records validation, browser smoke, staged files, commit hash, push result, deployment URL, deployed smoke, and any remaining manual intervention.
19. Closeout does not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.

## Validation Plan

Run or confirm current evidence for:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build` in the documented reparse-safe path

Run browser/viewport smoke before commit/push/deploy.

Rendered browser smoke must cover:

- `/`
- `/home`
- `/contact`
- `/shop`
- `/shop/[slug]`
- `/sign-in`
- anonymous protected routes sufficient to confirm no portal/admin/ops weakening
- direct checkout unavailable/redirect behavior if safely testable

Viewport checks must cover:

- mobile phone width
- tablet width
- desktop width
- keyboard traversal
- contrast/readability of CTA and status/preview elements
- no obvious text overlap, clipping, or awkward overflow

Deployment smoke must repeat the public and safety checks against the deployed URL.

## Git, Push, And Vercel Deployment

Builder may create or use a branch named:

`codex/029E-visual-smoke-stage-push-and-vercel-deploy`

If another branch is safer due to current worktree state, Builder must record the reason and preserve unrelated work.

Commit message should clearly identify Sprint 029E, for example:

`Deploy Sprint 029E front page marketing preview`

Builder must stop before:

- broad staging or committing unrelated files.
- pushing unrelated or unresolved active Sprint 021AA changes.
- force-pushing or rewriting shared history.
- changing DNS.
- changing Vercel project settings or environment variables.
- deploying if target metadata cannot be confirmed safely.
- deploying a build that exposes unfinished shop/checkout/auth/admin/portal/ops behavior publicly.
- deploying if local validation or browser smoke indicates a material safety, rendering, or build failure.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- no browser/viewport smoke surface is available.
- the active 021AA dirty state cannot be safely isolated.
- `.vercel/project.json` or equivalent Vercel target metadata cannot be read safely.
- Vercel authentication is unavailable.
- deployment target selection is unclear.
- local or deployed browser smoke cannot be completed.
- deployment exposes a broader public surface than Sprint 029E permits.
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

Builder must also create or update a focused 029E evidence file under `planning/reviews/`.

Closeout must state one final status:

- marketing-preview deployed
- deployed but gated/preview-only
- blocked before deployment
- deployed but requiring follow-up corrections

Closeout must include:

- validation/build command results
- browser/viewport smoke evidence
- exact files staged and committed, if commit occurs
- branch name, commit hash, and push result, if push occurs
- Vercel project/target confirmation method without secrets
- deployment URL, if deployment occurs
- deployed smoke evidence
- remaining manual intervention, if any

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness from this sprint.
