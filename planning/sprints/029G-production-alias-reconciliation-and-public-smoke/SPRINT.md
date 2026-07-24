# Sprint 029G - Production Alias Reconciliation And Public Smoke

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, Vercel alias/promotion, DNS/settings boundaries, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, public smoke, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029G is a deployment-correction follow-up to Sprint 029, 029B, 029C, 029D, 029E, and 029F. It keeps the same core sprint number and uses suffix `G` under the project numbering rule. It must not reopen earlier 029 work as a broad feature sprint, consume Sprint 030, or expand into Sprint 022 product work.

## Starting Point

- Sprint 029F evidence records marketing-preview deployed at `https://precisionperformance.com.au`.
- Sprint 029F evidence records Vercel deployment ID `dpl_9gPytpAofTSHcTJJMM1Qw9TxKpAd`.
- Sprint 029F evidence records raw deployment URL `https://pnr-precision-performance-leqvohy7q-rankin007s-projects.vercel.app`.
- Sprint 029F evidence says the raw Vercel deployment URL redirected to Vercel SSO and public smoke used `https://precisionperformance.com.au`.
- Independent review after 029F found a discrepancy: the live public alias appeared to serve older public content rather than the Sprint 029 marketing-preview page.
- Local shell requests during the review also had intermittent inability to connect to the remote server, so public alias evidence must be rechecked carefully.
- Local `develop` has Sprint 029F closeout commits but remains ahead of `origin/develop` by older unrelated commits.
- The remote release branch `codex/029F-browser-proof-release-and-live-deployment` was reportedly created/updated through the GitHub API for runtime-critical route changes.
- Unrelated active Sprint 021AA/auth/Supabase dirty state remains outside Sprint 029 scope.

Builder must not mark Sprint 029 complete until the public production alias demonstrably serves the approved Sprint 029 marketing-preview front page and route-safety smoke passes from the public URL.

## Goal

Reconcile the production alias and complete the Sprint 029 marketing-preview deployment truthfully.

The useful outcome is one of:

- `marketing-preview deployed`: `https://precisionperformance.com.au` serves the Sprint 029 front page and deployed smoke passes.
- `deployment alias corrected`: the correct Vercel deployment is promoted/aliased to `https://precisionperformance.com.au`, then deployed smoke passes.
- `blocked before deployment completion`: the public alias cannot be corrected or verified without operator action.
- `deployment evidence corrected`: prior records are updated to show the deployment did not reach the production alias, with exact next steps.

## Required Reading

Builder must read before alias checks, Vercel commands, or documentation edits:

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
20. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
21. `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
22. current public route files for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, and `/sign-in`

## Product And Messaging Requirements

Sprint 029G does not authorize new public marketing content except tiny corrections required to make the deployed alias match the already approved Sprint 029 front page.

Preserve Sprint 029 messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.
- Keep `noindex` and `nofollow` unless a later source authority explicitly changes SEO/indexing status. Sprint 029G does not authorize indexing launch.

## Public Alias Verification Requirements

Builder must verify `https://precisionperformance.com.au` using evidence that can distinguish the Sprint 029 page from the older public page.

The production alias passes only if `/` contains Sprint 029 markers such as:

- title `Precision Performance`
- descriptor `Equine Biochemistry and Recovery Intelligence`
- headline `See what observation alone cannot show.`
- CTA `Request a Stable Trial`
- evidence wording such as `Recreated sample, not live horse data` or equivalent Sprint 029 copy

The production alias fails if `/` serves older public content such as:

- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- public shop CTA/content
- testimonial/contact-form content not part of the Sprint 029 marketing-preview page

Use one or more safe verification methods:

- `Invoke-WebRequest` with no secret headers.
- Vercel CLI read-only deployment/alias inspection.
- public browser check.
- external public fetch if available.

Record status code, final URL, title, relevant non-sensitive page markers, cache headers if useful, and timestamp.

## Vercel Alias/Promotion Requirements

If the production alias is not serving the correct Sprint 029 deployment, Builder may correct the alias only through the existing confirmed Vercel project path and only if it does not require DNS, settings, environment-variable, Supabase, Stripe, or production-data mutation.

Allowed actions:

- inspect Vercel deployments and aliases.
- confirm which deployment currently owns `precisionperformance.com.au`.
- promote or alias the already-built Sprint 029 deployment to `precisionperformance.com.au` if the target deployment and project are unambiguous.
- redeploy from the isolated Sprint 029 release worktree if promotion/alias correction is not possible and the deployment path is otherwise safe.

Stop before:

- changing DNS.
- changing Vercel project settings.
- changing Vercel environment variables.
- mutating Supabase, Stripe, production data, or auth/RLS.
- exposing secrets or secret fragments.
- promoting an ambiguous deployment.
- broad staging or pushing unrelated dirty work.

## Public Smoke Requirements

After the production alias is confirmed or corrected, Builder must run deployed smoke on `https://precisionperformance.com.au`.

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

If browser visual smoke is available, repeat a quick desktop visual check on the public alias. If browser visual smoke remains unavailable, the operator-assisted 029F visual smoke may remain accepted only if the public alias content markers prove the same Sprint 029 page is live.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029G file.
- inspect public production alias content.
- inspect Vercel deployment and alias state through safe read-only methods.
- promote or alias the correct Sprint 029 deployment to `https://precisionperformance.com.au` if target and project are unambiguous.
- redeploy the isolated Sprint 029 release worktree if needed and safe.
- update evidence and planning files to reflect actual alias status.
- correct prior 029F closeout claims if public alias smoke was inaccurate.
- create an intentional Sprint 029G evidence/alias-correction commit if files are changed.
- push only Sprint 029G evidence/planning changes through a safe branch/path if required.

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

- `planning/sprints/029G-production-alias-reconciliation-and-public-smoke/SPRINT.md` through Pack application only.
- `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`

Builder may inspect only:

- `app/page.tsx`
- `eslint.config.mjs`
- `package.json`
- `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
- `.vercel/**` names/config shape only, never secrets

Any runtime route source edits require a stop unless the alias cannot be corrected because the deployed source is proven wrong and the needed edit is already within Sprint 029 public-page scope.

## Worktree And Git Requirements

Builder must protect unrelated dirty state.

Minimum checks before any commit/push:

1. Record `git status --short`.
2. Identify exact Sprint 029G files to stage.
3. Use explicit path staging only.
4. Do not use `git add .`.
5. Inspect `git diff --cached --name-status`.
6. Confirm no unrelated 021AA files are staged.

Local `develop` being ahead of `origin/develop` by older unrelated commits must not be solved inside 029G unless the user explicitly authorizes that separate repository reconciliation.

## Acceptance Criteria

1. Sprint 029G is applied as `planning/sprints/029G-production-alias-reconciliation-and-public-smoke/SPRINT.md`.
2. Public alias content is checked for Sprint 029-specific markers.
3. If alias serves old content, Vercel deployment/alias state is inspected and the exact mismatch is documented.
4. If safe and unambiguous, the correct Sprint 029 deployment is promoted/aliased to `https://precisionperformance.com.au`.
5. If correction is blocked, the exact operator/manual action is documented.
6. `https://precisionperformance.com.au/` returns 200 and contains Sprint 029 markers before the sprint can close as marketing-preview deployed.
7. Public route smoke passes for stale public redirects, sign-in, anonymous protected redirects, and checkout unavailable behavior.
8. Documentation and status accurately reflect whether the marketing preview is truly live on the production alias.
9. Closeout does not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.

## Validation Plan

Run public alias smoke from the project shell or another safe public check:

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

For `/`, record title and Sprint 029 content markers.

If Vercel alias correction is performed, repeat the full public smoke after correction.

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
- public alias checks are blocked by network/DNS/cache issues and cannot be independently verified.
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

Builder must also create `planning/reviews/029G-production-alias-reconciliation-and-public-smoke-evidence.md`.

Closeout must state one final status:

- marketing-preview deployed
- deployment alias corrected
- blocked before deployment completion
- deployment evidence corrected

Closeout must include:

- public alias content-marker evidence
- Vercel deployment/alias evidence without secrets
- any alias correction command/result
- public deployed smoke evidence
- remaining manual intervention, if any

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness from this sprint.
