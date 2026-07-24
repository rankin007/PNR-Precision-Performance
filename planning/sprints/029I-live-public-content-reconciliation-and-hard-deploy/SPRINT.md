# Sprint 029I - Live Public Content Reconciliation And Hard Deploy

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, Vercel deployment/alias/promotion, Git source provenance, cache/DNS diagnosis, secrets, auth/RLS, schema, Supabase, Stripe, billing, production data, destructive actions, and unrelated dirty-worktree isolation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029I is the decisive deployment-completion follow-up to Sprint 029 through Sprint 029H. It keeps the same core sprint number and uses suffix `I` under the project numbering rule. It must not consume Sprint 030, reopen Sprint 022, or expand into full public website/product/commerce/authenticated/SEO launch work.

## Starting Point

- Sprint 029H records `marketing-preview-deployed`.
- Sprint 029H evidence says cache-busted live HTTP checks for apex, `www`, and the Vercel app alias returned Sprint 029 markers and no old-page markers.
- A later independent review path still observed old public content at `https://precisionperformance.com.au/` and `https://precisionperformance.com.au/?review029h=1`.
- Observed old markers included:
  - `Precision Performance - Equine Biochemistry Analysis`
  - `Biochemistry Analysis for Elite Equine`
  - `Apply Now`
  - `Shop`
  - `$500 per test`
  - testimonial/contact-form content from the prior public page
- Therefore the durable closeout record and independent public observation still conflict.
- Local `develop` remains ahead of `origin/develop` by older unrelated commits.
- Unrelated active Sprint 021AA/auth/Supabase dirty state remains outside Sprint 029 scope.

Builder must treat this as an unresolved live-public deployment blocker. This sprint is not another passive recheck. It must drive to one of two hard outcomes:

- the public production website is corrected and externally proves Sprint 029 marketing-preview content; or
- the sprint closes with exact evidence naming what outside the approved boundary prevents correction.

## Goal

Complete Sprint 029's marketing-preview deployment by making the public internet, Vercel alias state, source provenance, and project records agree.

The desired outcome is `marketing-preview-live-reconciled`: the apex, `www`, and Vercel app alias all serve Sprint 029 marketing-preview content from multiple cache-busted public perspectives, old-page markers are absent, production route-safety smoke passes, and documentation/status records reflect that result.

If correction cannot be completed inside the approved boundary, close as `blocked-live-public-reconciliation` with the exact failed layer identified. Do not close as deployed while any credible live public fetch still returns old-page content.

## Required Reading

Builder must read before checks, Vercel commands, Git staging, deployment, or documentation edits:

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
18. `planning/sprints/029E-visual-smoke-stage-push-and-vercel-deploy/SPRINT.md`
19. `planning/sprints/029F-browser-proof-release-and-live-deployment/SPRINT.md`
20. `planning/sprints/029G-production-alias-reconciliation-and-public-smoke/SPRINT.md`
21. `planning/sprints/029H-external-public-alias-correction-and-final-smoke/SPRINT.md`
22. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
23. `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
24. `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`
25. `planning/reviews/029H-external-public-alias-correction-and-final-smoke-evidence.md`
26. current `app/page.tsx`
27. `package.json`
28. `eslint.config.mjs`

## Product And Messaging Boundary

Sprint 029I may only ship or correct the already approved Sprint 029 marketing-preview front page and its route-safety behavior.

Preserve Sprint 029 messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- The primary action remains `Request a Stable Trial`.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow`.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.

This sprint does not authorize full public relaunch, SEO/indexing launch, ecommerce reopening, product Done, authenticated readiness, production readiness, or broader marketing-site completion.

## Hard Reconciliation Requirements

Builder must reconcile four layers, in this order:

1. **Source layer:** identify the exact local source commit/files intended for Sprint 029 marketing-preview deployment, including `app/page.tsx`, `package.json`, `eslint.config.mjs`, and any route redirect behavior.
2. **Build layer:** prove a production build from that exact source in a reparse-safe workspace.
3. **Vercel layer:** prove which deployment and aliases Vercel currently serves for apex, `www`, and the Vercel app alias.
4. **Public internet layer:** prove what unauthenticated public requests receive from multiple external/cache-busted perspectives.

Builder must not treat any single layer as conclusive by itself. In particular:

- Vercel inspect alone is not enough.
- local shell `curl` alone is not enough.
- browser/operator view alone is not enough.
- project documentation state alone is not enough.

The sprint completes only when these layers agree, or when disagreement is traced to a named layer that cannot be corrected inside scope.

## Required Public Content Markers

For every public `/` content check, record timestamp/timezone, exact URL, final URL, status, title, selected headers, Sprint 029 markers, old-page markers, and a short body excerpt or hash that proves the result without copying excessive content.

Sprint 029 markers:

- `Equine Biochemistry and Recovery Intelligence`
- `See what observation alone cannot show.`
- `Request a Stable Trial`
- `Recreated sample, not live horse data`

Old-page markers:

- `Precision Performance - Equine Biochemistry Analysis`
- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- `Shop`
- `$500 per test`
- `Professional Kit`
- `Monthly Service`
- testimonial/contact-form content from the old page

If any credible live public check sees old markers, Builder must keep the sprint open for diagnosis/correction or close blocked. Do not relabel old-marker evidence as stale unless a live cache-busted check from the same or stronger perspective disproves it and the difference is explained.

## Required Verification Perspectives

Builder must attempt all available safe perspectives and record success/failure:

1. local project shell public requests using cache-busting query strings and no secret headers.
2. `curl.exe` or equivalent with `Cache-Control: no-cache` and `Pragma: no-cache`.
3. apex `https://precisionperformance.com.au/`.
4. `www` alias `https://www.precisionperformance.com.au/`.
5. Vercel app alias `https://pnr-precision-performance.vercel.app/`.
6. raw deployment URL if it is anonymously reachable; if SSO-blocked, record that specifically.
7. browser/operator-visible public check in a private/incognito window or hard-refresh path where available.
8. one independent external fetch/browser path if available in the runtime.

For disagreement, also record:

- DNS answers for apex and `www`.
- response headers including `Age`, `Cache-Control`, `Server`, `X-Vercel-Cache`, `X-Matched-Path`, and any Vercel deployment/request identifiers available without secrets.
- whether query-string cache busting changes the result.
- whether apex and `www` disagree.
- whether the Vercel app alias and custom domains disagree.

## Approved Correction Actions

Builder is expected to correct the deployment if the correct target is unambiguous.

Builder may:

- create or use an isolated release worktree/workspace containing only Sprint 029 source and planning closeout files.
- run validation and production build in a reparse-safe workspace.
- deploy the correct Sprint 029 marketing-preview release to Vercel production.
- promote or alias the correct Sprint 029 deployment to:
  - `precisionperformance.com.au`
  - `www.precisionperformance.com.au`
  - `pnr-precision-performance.vercel.app`
- repeat deployment if the first deployment maps to old source or unreachable content.
- use safe Vercel cache/alias invalidation when available as a deployment/alias operation.
- create a sprint-only local commit for 029I source/planning/evidence changes.
- push a sprint-only branch or release branch needed for deployment provenance, while preserving unrelated dirty work.
- update planning and evidence files to truthfully correct prior 029F/029G/029H claims if needed.

Builder must stop before:

- DNS provider record changes.
- Vercel project setting changes.
- Vercel environment-variable changes.
- Supabase, Stripe, auth/RLS, production database, or production data mutation.
- secret inspection or secret output.
- destructive git commands.
- broad pushing of unrelated local `develop` history.
- staging/committing unrelated Sprint 021AA/auth/Supabase dirty files.

If a stop boundary blocks completion, Builder must record exact manual instructions for the operator.

## Git And Source Provenance Requirements

Builder must make the deployed source traceable without dragging unrelated 021AA work into the release.

Minimum requirements:

1. Record `git status --short --branch` before staging.
2. Identify all files required for the Sprint 029I deploy/evidence unit.
3. Use explicit path staging only.
4. Do not use `git add .`.
5. Inspect `git diff --cached --name-status` before commit.
6. Confirm no unrelated 021AA/auth/Supabase files are staged.
7. If pushing, push a sprint-only branch or proven safe release branch rather than blindly pushing local `develop`.
8. Record the commit SHA and branch used for deployment provenance.

Local `develop` being ahead of `origin/develop` by older unrelated commits must not be solved inside this sprint.

## Required Validation

Before any production deploy or alias correction from new source, Builder must run:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- production build in a non-OneDrive or otherwise reparse-safe workspace
- `git diff --check` for Sprint 029I touched files

If validation/build is already proven on the exact commit being promoted, Builder may cite that evidence and rerun only the checks needed to prove no drift. If any source file changed after prior proof, rerun the full required validation.

## Final Public Smoke

After deploy/alias correction or after proving no correction was needed, Builder must run final public route smoke against `https://precisionperformance.com.au`.

Minimum checks:

- `/` returns 200 and contains all Sprint 029 markers.
- `/` contains none of the old-page markers.
- `/home` redirects to `/`.
- `/contact` redirects to `/`.
- `/shop` redirects to `/`.
- `/shop/example` is redirected, blocked, hidden, or clearly unavailable.
- `/sign-in` remains available.
- anonymous `/admin` redirects to sign-in.
- anonymous `/portal` redirects to sign-in.
- anonymous `/data-entry` redirects to sign-in.
- safe GET `/api/checkout` remains unavailable and does not create a public purchase path.

Repeat the root marker checks for apex, `www`, and Vercel app alias after any correction.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029I file.
- inspect source, build output, Vercel aliases/deployments, DNS, cache headers, and public content.
- correct Vercel production deployment/alias state for the approved Sprint 029 marketing-preview page.
- create a reparse-safe release workspace.
- create sprint-only evidence/planning/source commits if needed.
- push a sprint-only branch or release branch needed to make deployment provenance clear.
- update documentation/status/evidence to reflect the actual result.
- correct prior 029 completion claims if they remain contradicted by live public evidence.

## Out Of Scope

Builder must not:

- redesign or materially rewrite the front page.
- add new public routes, CMS, blog/Insights publishing, data model, backend architecture, or marketing automation.
- add or change Supabase schema, migrations, RLS, roles, permissions, Storage, uploads, OCR, voice, providers, auth callbacks, protected routes, Stripe checkout, billing, webhooks, catalogue, pricing, or production data.
- invent production scoring thresholds, pH rules, Table of Knowledge recommendations, veterinary advice, or final score terminology.
- mutate DNS records, Vercel project settings, Vercel environment variables, Supabase, Stripe, production databases, or secrets.
- inspect, print, store, or commit secrets or secret fragments.
- stage, commit, push, deploy, revert, delete, or rewrite unrelated active Sprint 021AA work.
- install, remove, upgrade, or downgrade packages without separate approval.
- begin Sprint 022 product implementation.

## Approved File Set

Builder may edit:

- `app/page.tsx`, only if source inspection proves the deployed source is not the approved Sprint 029 page or a tiny page-source correction is required to restore the approved Sprint 029 marketing-preview page.
- `package.json`, only if command/script drift blocks required validation for this sprint.
- `eslint.config.mjs`, only if lint/build drift blocks required validation for this sprint.
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`, only if a durable decision changed.
- `planning/RISKS.md`, only if active risk changed.
- `planning/QUESTIONS.md`, only if open questions changed.
- `planning/SPRINT_SCHEDULE.md`, only if schedule/current-status references changed.
- `planning/EVIDENCE_INDEX.md`

Builder may create:

- `planning/sprints/029I-live-public-content-reconciliation-and-hard-deploy/SPRINT.md` through Pack application only.
- `planning/reviews/029I-live-public-content-reconciliation-and-hard-deploy-evidence.md`

Builder may inspect:

- Sprint 029 through 029H sprint/evidence files.
- `.vercel/**` names/config shape only, never secrets.
- build artifacts and deployment output needed to identify served source/content.

Any file outside this set requires a stop unless it is a generated temporary build artifact that is created and cleaned inside a disposable workspace.

## Acceptance Criteria

1. Sprint 029I is applied as `planning/sprints/029I-live-public-content-reconciliation-and-hard-deploy/SPRINT.md`.
2. Source, build, Vercel alias/deployment, and public internet layers are reconciled with evidence.
3. Any old-content observation is reproduced, disproved from the same or stronger perspective, or traced to a named layer.
4. If Vercel deployment/alias correction is needed and safe, it is performed.
5. If redeploy is needed and safe, the approved Sprint 029 marketing-preview page is deployed from traceable source.
6. Apex, `www`, and Vercel app alias serve Sprint 029 markers from cache-busted public checks before closing as live reconciled.
7. Old-page markers are absent from all credible live public perspectives before closing as live reconciled.
8. Final public route smoke passes.
9. Evidence records deployment ID, alias mapping, commit/branch provenance, URLs checked, headers, markers, and final status without secrets.
10. Planning/status/briefing/docs are corrected to match the actual result.
11. Closeout does not claim full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- Vercel authentication is unavailable.
- the correct deployment target cannot be identified unambiguously.
- correction requires DNS/settings/environment changes.
- external public checks remain inconsistent after safe Vercel deploy/alias correction.
- pushing/deployment provenance requires resolving unrelated local `develop` history.
- any command would expose secrets or secret fragments.

## Closeout

At sprint close, Builder must create:

- `planning/reviews/029I-live-public-content-reconciliation-and-hard-deploy-evidence.md`

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

Closeout must state exactly one final status:

- `marketing-preview-live-reconciled`
- `deployment-corrected-and-live`
- `deployment-evidence-corrected`
- `blocked-live-public-reconciliation`

Closeout must include:

- source/commit/branch provenance
- validation/build evidence
- Vercel deployment and alias evidence without secrets
- DNS/cache/header evidence
- multi-perspective public marker evidence for apex, `www`, and Vercel app alias
- any correction/deploy/alias command and result
- final public route smoke evidence
- remaining blocker/manual intervention, if any

Do not close as `marketing-preview-live-reconciled` or `deployment-corrected-and-live` unless live public evidence is clean: Sprint 029 markers present, old-page markers absent, and route-safety smoke passing.
