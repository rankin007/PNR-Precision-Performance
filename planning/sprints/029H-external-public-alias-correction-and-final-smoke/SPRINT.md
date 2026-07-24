# Sprint 029H - External Public Alias Correction And Final Smoke

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, Vercel alias/promotion, cache/DNS diagnosis, DNS/settings boundaries, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, public smoke, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029H is a deployment-correction and final public-verification follow-up to Sprint 029 through Sprint 029G. It keeps the same core sprint number and uses suffix `H` under the project numbering rule. It must not reopen earlier 029 work as a broad feature sprint, consume Sprint 030, or expand into Sprint 022 product work.

## Starting Point

- Sprint 029G evidence records `https://precisionperformance.com.au/` as serving Sprint 029 markers.
- Sprint 029G evidence records Vercel alias inspection mapping `precisionperformance.com.au` to deployment `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`.
- External reviewer observation after 029G still saw older public content, including `Biochemistry Analysis for Elite Equine`, `Apply Now`, `Shop`, and testimonial/contact-form content.
- Therefore, durable project records and at least one external/public observation disagree.
- The sprint must not close as complete until the disagreement is resolved with stronger evidence.
- Local `develop` remains ahead of `origin/develop` by older unrelated commits.
- Unrelated active Sprint 021AA/auth/Supabase dirty state remains outside Sprint 029 scope.

Builder must treat this as a real deployment-completion blocker until multiple independent public checks show the Sprint 029 page, or until the records are corrected to show the production alias is not actually serving the Sprint 029 page for all public users.

## Goal

Complete Sprint 029 by proving, correcting, or truthfully downgrading the public deployment state.

The useful outcome must be one of:

- `marketing-preview deployed`: multiple public checks confirm `https://precisionperformance.com.au` serves the Sprint 029 marketing-preview page and route-safety smoke passes.
- `deployment alias corrected`: a Vercel alias/promotion/cache correction was required and completed, then multiple public checks pass.
- `blocked before deployment completion`: correction requires operator action, DNS/settings mutation, unavailable credentials, or a non-approved production change.
- `deployment evidence corrected`: the prior 029F/029G deployment-complete claim is corrected because public evidence still shows old content or inconsistent routing.

## Required Reading

Builder must read before checks, Vercel commands, or documentation edits:

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
21. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
22. `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
23. `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`
24. current `app/page.tsx` for Sprint 029 marker source

## Product And Messaging Requirements

Sprint 029H does not authorize new public marketing content except tiny corrections required to make the deployed alias match the already approved Sprint 029 front page.

Preserve Sprint 029 messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow` unless a later source authority explicitly changes SEO/indexing status. Sprint 029H does not authorize indexing launch.

## External Public Verification Requirements

Builder must use stronger-than-029G public verification.

Required perspectives:

1. Project shell public request with cache-busting query and no secret headers.
2. At least one browser or operator-visible public request, preferably private/incognito or hard refresh.
3. One Vercel read-only alias/deployment inspection.
4. If available, one independent external fetch path, such as a public web fetch/tool or another network context.

For each public `/` check, record:

- timestamp and timezone.
- exact URL.
- final URL after redirects.
- status code.
- title.
- cache headers: `Age`, `Cache-Control`, `Server`, `X-Vercel-Cache`, and any useful Vercel request/deployment headers.
- Sprint 029 markers present/absent.
- old-page markers present/absent.

Sprint 029 markers:

- `Equine Biochemistry and Recovery Intelligence`
- `See what observation alone cannot show.`
- `Request a Stable Trial`
- `Recreated sample, not live horse data`

Old-page markers:

- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- public shop CTA/content from the old page
- testimonial/contact-form content not part of Sprint 029

If any perspective still sees old-page markers, Builder must not close as complete until the cause is found or the state is marked blocked/corrected.

## Cache/DNS/Alias Diagnosis Requirements

If observations disagree, Builder must diagnose likely causes without making broad production changes.

Allowed checks:

- `https://precisionperformance.com.au/`
- `https://www.precisionperformance.com.au/`
- `https://pnr-precision-performance.vercel.app/`
- the specific Vercel deployment URL if not blocked by SSO.
- Vercel inspect/read-only alias commands.
- DNS lookup for `precisionperformance.com.au` and `www.precisionperformance.com.au`.
- response headers that identify cache, deployment, host, or Vercel routing.
- query-string cache-busting checks such as `?029h=<timestamp>`.

Allowed corrections only when target is unambiguous:

- Vercel alias/promotion of the known Sprint 029 deployment.
- Vercel redeploy from the isolated Sprint 029 release worktree if the current alias points to old source and redeploy is safer than alias correction.
- Vercel cache/invalidation action only if it is available as a safe deployment/alias operation and does not change project settings or environment variables.

Stop before:

- DNS changes.
- Vercel project settings changes.
- Vercel environment-variable changes.
- Supabase, Stripe, auth/RLS, production database, or production data mutation.
- exposing secrets or secret fragments.
- promoting an ambiguous deployment.
- broad staging/pushing unrelated dirty work.

## Public Smoke Requirements

After all public `/` marker perspectives agree, Builder must run final public route smoke on `https://precisionperformance.com.au`.

Minimum checks:

- `/` returns 200 and contains Sprint 029 markers.
- `/home` redirects to `/`.
- `/contact` redirects to `/`.
- `/shop` redirects to `/`.
- `/shop/[slug]` is redirected, blocked, hidden, or clearly unavailable.
- `/sign-in` remains available.
- anonymous `/admin` redirects to sign-in.
- anonymous `/portal` redirects to sign-in.
- anonymous `/data-entry` redirects to sign-in.
- `/api/checkout` remains unavailable for safe GET or otherwise does not create a public purchase path.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029H file.
- inspect public alias content from multiple perspectives.
- inspect Vercel deployment and alias state through safe read-only methods.
- inspect DNS/cache/header state.
- promote or alias the correct Sprint 029 deployment to `https://precisionperformance.com.au` if target and project are unambiguous.
- redeploy the isolated Sprint 029 release worktree if needed and safe.
- update evidence and planning files to reflect actual external-public state.
- correct prior 029F/029G closeout claims if public alias smoke was inaccurate or perspective-dependent.
- create an intentional Sprint 029H evidence/alias-correction commit if files are changed.
- push only Sprint 029H evidence/planning changes through a safe branch/path if required and authorized.

## Out Of Scope

Builder must not:

- add or redesign public content except tiny correction needed to match the approved Sprint 029 page.
- add CMS, blog/Insights publishing, database content model, or new backend architecture.
- add Supabase schema, migrations, RLS, roles, permissions, Storage, uploads, OCR, voice, providers, or remote data mutation.
- change auth, portal, admin, ops, callback, webhook, or protected route behavior except to confirm it remains protected.
- add Stripe checkout behavior, public purchasing, billing, catalogue mutation, price changes, webhook changes, or commerce enablement.
- create stored lead capture, mailing-list integration, CRM integration, email API, webhook, or third-party marketing automation.
- invent production scoring thresholds, pH rules, Table of Knowledge recommendations, veterinary advice, or final score terminology.
- mutate DNS, Supabase, Stripe, production databases, Vercel project settings, or environment variables.
- inspect or expose secret values or secret fragments.
- stage, commit, push, deploy, revert, delete, or rewrite unrelated active Sprint 021AA work.
- install, remove, upgrade, or downgrade packages without separate approval.
- begin Sprint 022 product implementation.

## Approved File Set

Builder may edit:

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

- `planning/sprints/029H-external-public-alias-correction-and-final-smoke/SPRINT.md` through Pack application only.
- `planning/reviews/029H-external-public-alias-correction-and-final-smoke-evidence.md`

Builder may inspect:

- `app/page.tsx`
- `eslint.config.mjs`
- `package.json`
- `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
- `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`
- `.vercel/**` names/config shape only, never secrets

Any runtime route source edits require a stop unless the alias cannot be corrected because deployed source is proven wrong and the needed edit is already within Sprint 029 public-page scope.

## Worktree And Git Requirements

Builder must protect unrelated dirty state.

Minimum checks before any commit/push:

1. Record `git status --short`.
2. Identify exact Sprint 029H files to stage.
3. Use explicit path staging only.
4. Do not use `git add .`.
5. Inspect `git diff --cached --name-status`.
6. Confirm no unrelated 021AA files are staged.

Local `develop` being ahead of `origin/develop` by older unrelated commits must not be solved inside 029H unless the user explicitly authorizes that separate repository reconciliation.

## Acceptance Criteria

1. Sprint 029H is applied as `planning/sprints/029H-external-public-alias-correction-and-final-smoke/SPRINT.md`.
2. Public alias content is checked from multiple perspectives for Sprint 029-specific markers and old-page markers.
3. If any perspective sees old content, the cache/DNS/alias/deployment cause is documented and corrected if safe.
4. If safe correction is impossible, the sprint closes blocked or evidence-corrected, not complete.
5. Vercel inspect maps the production alias to the intended Sprint 029 deployment or documents the mismatch.
6. `https://precisionperformance.com.au/` returns 200 and contains Sprint 029 markers from all available public perspectives before closing as marketing-preview deployed.
7. Old-page markers are absent from all available public perspectives before closing as marketing-preview deployed.
8. Public route smoke passes for stale public redirects, sign-in, anonymous protected redirects, and checkout unavailable behavior.
9. Documentation and status accurately reflect the actual external-public state.
10. Closeout does not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.

## Validation Plan

Run public alias smoke from multiple safe perspectives:

- `/`
- `/home`
- `/contact`
- `/shop`
- `/shop/example`
- `/sign-in`
- `/admin`
- `/portal`
- `/data-entry`
- `/api/checkout`

For `/`, record title, headers, Sprint 029 content markers, and old-page marker absence.

If alias correction or redeploy is performed, repeat the full public smoke after correction.

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
- the correct Sprint 029 deployment cannot be identified unambiguously.
- alias correction requires DNS/settings/environment changes.
- public alias checks remain inconsistent across networks/tools after safe correction.
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

Builder must also create `planning/reviews/029H-external-public-alias-correction-and-final-smoke-evidence.md`.

Closeout must state one final status:

- marketing-preview deployed
- deployment alias corrected
- blocked before deployment completion
- deployment evidence corrected

Closeout must include:

- multi-perspective public alias content-marker evidence
- cache/DNS/header evidence
- Vercel deployment/alias evidence without secrets
- any alias correction/redeploy command and result
- final public deployed smoke evidence
- remaining manual intervention, if any

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness from this sprint.
