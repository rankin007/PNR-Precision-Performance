# Sprint 029B - Public Front Page Deployment Completion

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029B is a corrective/completion sprint for Sprint 029. It keeps the same core sprint number and uses suffix `B` under the project numbering rule. It must not reopen Sprint 029 as a broad feature sprint, consume Sprint 030, or expand into Sprint 022 product work.

## Starting Point

- Branch recorded in current state: `develop`.
- Sprint `029-public-front-page-marketing-preview-and-vercel-deployment` is applied and locally built.
- The root page now contains a marketing-preview front page at `/`.
- Sprint 029 did not commit, push, or deploy.
- Current status is `blocked-before-deployment`.
- Individual local checks passed via `npm.cmd`: `validate:json`, `validate:static`, `typecheck`, `lint`, and `build`.
- `npm.cmd run validate:local` timed out before reporting completion.
- Rendered browser/viewport smoke is incomplete.
- Deployed smoke is incomplete.
- `.vercel/project.json` exists but could not be read reliably in the prior shell, so the deployment target was not safely confirmed from local metadata.
- The worktree contains unresolved active Sprint 021AA dirty state outside Sprint 029/029B scope.
- Review found a likely rendered-layout defect in `app/page.tsx`: two classes use `w-[min(100%-2rem,1180px)]`, which may produce invalid CSS math even though static validation and build pass.

Builder must first reconcile the active worktree boundary and avoid staging, committing, pushing, deploying, reverting, deleting, or overwriting unrelated 021AA work.

## Goal

Complete the Sprint 029 front-page deployment path safely.

The useful outcome is a corrected, rendered-smoked, sprint-only front-page deployment candidate that can be committed, pushed, deployed through Vercel, and post-deployment smoked without exposing unrelated work or claiming broader product readiness.

This sprint should move the public front page from `blocked-before-deployment` to one of these evidence-backed closeout states:

- marketing-preview deployed
- deployed but gated/preview-only
- blocked before deployment with updated manual-intervention evidence
- deployed but requiring follow-up corrections

## Required Reading

Builder must read before source edits:

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
15. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
16. current public route files for `/`, `/home`, `/contact`, `/shop`, `/shop/[slug]`, and `/sign-in`
17. route/auth layout files needed only to verify anonymous protected-route safety

## Product And Messaging Requirements

Sprint 029B does not change the product narrative approved in Sprint 029. It preserves the accepted public direction:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Use qualified language such as supports more informed decisions, helps identify changes over time, trend-based visibility, individual baseline, trainer judgement, and professional veterinary review where needed.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow` unless a later source authority explicitly changes SEO/indexing status. This sprint does not authorize indexing launch.

## Visual And Render Requirements

Builder must correct the known page-width concern before deployment:

- Replace or otherwise fix invalid/suspect width classes such as `w-[min(100%-2rem,1180px)]`.
- Prefer established container patterns already used in the project, or valid Tailwind arbitrary values using safe CSS syntax.
- Verify the first viewport and key sections render at mobile, tablet, and desktop widths.
- Verify text does not overlap, clip, or overflow awkwardly at common widths.
- Verify CTAs remain visible and usable by keyboard.
- Verify status/preview indicators use colour plus readable text labels.

The page should remain credible, practical, and premium, aligned to `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.

## Public Visibility Policy

Sprint 029B may complete the front-page marketing preview deployment because Sprint 029 already scoped the user-requested push and Vercel deployment.

The sprint must still preserve safety:

- Public shop checkout must remain disabled, redirected, or clearly unavailable.
- `/home`, `/contact`, `/shop`, and `/shop/[slug]` must not expose stale or conflicting unfinished public content by accident.
- Existing authenticated, portal, admin, ops, Supabase, Stripe, webhook, and checkout protections must not be weakened.
- No new stored lead capture, mailing-list provider, CRM integration, email API, webhook, CMS, upload, voice, Supabase, Stripe, commerce, schema, or auth behavior may be added.
- Vercel project settings, DNS, environment variables, Supabase, Stripe, production databases, and production data must not be mutated except for the narrow deployment action already scoped for the existing Vercel project workflow.

If deployment would expose more than the Sprint 029/029B front-page marketing preview or reopen unfinished shop/contact/checkout/auth/admin/portal/ops behavior, Builder must stop and record manual intervention.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029B file.
- inspect current worktree status and identify sprint-related versus unrelated dirty files.
- fix the `app/page.tsx` rendered-layout issue discovered after Sprint 029.
- make narrowly necessary front-page responsive/layout corrections in approved public styling files.
- preserve existing route redirects/unavailable behavior for `/home`, `/contact`, `/shop`, and `/shop/[slug]`.
- inspect protected route behavior only enough to verify anonymous route safety.
- read `.vercel/project.json` names/config shape only if it can be done without exposing secrets or fragments.
- use a safe Vercel CLI/project workflow only if the target can be confirmed without changing settings or exposing secrets.
- run local validation and production build.
- run rendered local or preview browser smoke for `/` and route safety.
- stage only Sprint 029/029B files.
- create an intentional Sprint 029B commit.
- push the sprint branch or agreed branch to the configured remote.
- deploy through the existing Vercel project workflow.
- run post-deployment smoke checks for deployed front page rendering, route redirects, checkout unavailable behavior, and anonymous protected-route safety.
- update Sprint 029 closeout documentation and current planning/status files with evidence-backed results.

## Out Of Scope

Builder must not:

- implement new public sections beyond narrow corrections needed for Sprint 029 acceptance.
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
- resume, retry, modify, or close any Sprint 021AA/021Z authenticated proof work.
- begin Sprint 022 product implementation.

## Approved File Set

Builder may edit:

- `app/page.tsx`
- `app/(marketing)/home/page.tsx`, only to preserve redirect/alignment with `/`
- `app/contact/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/shop/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/shop/[slug]/page.tsx`, only to preserve safe redirect/unavailable behavior
- `app/layout.tsx`, only for safe public metadata/noindex handling and no secret/config changes
- `components/**`, only for narrow front-page rendering corrections if existing components are involved
- `styles/**` or global CSS files, only for narrow front-page/design-token presentation corrections
- `tailwind.config.ts`, only if needed to correct an existing token/class issue without changing product behavior
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

- `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md` through Pack application only.
- focused evidence/review files under `planning/reviews/` if needed to record route smoke, deployment smoke, or worktree isolation evidence.

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
2. Identify the exact files intended for Sprint 029B staging.
3. Confirm no unrelated 021AA files are staged.
4. Use explicit path staging, not broad `git add .`.
5. Inspect staged diff before commit.
6. If a clean branch/worktree is needed, create or use it without deleting or reverting unrelated work.

If Sprint 029/029B files cannot be isolated without risking unrelated work, Builder must stop and record manual intervention.

## Acceptance Criteria

1. Sprint 029B is applied as `planning/sprints/029B-public-front-page-deployment-completion/SPRINT.md`.
2. The root front page width/layout defect is corrected in a way that produces valid rendered layout.
3. `/` renders a polished, responsive public front page aligned to the accepted design and messaging authority.
4. The first viewport communicates brand, equine performance context, and the core value proposition.
5. All claims remain qualified and avoid diagnosis, guarantee, veterinary replacement, final thresholds, production advice, or unsupported clinical assertions.
6. No confidential data, real private records, secret material, raw formulas, or identifiable unapproved assets are exposed.
7. Public CTA behavior remains safe: no stored lead capture, no provider integration, no implied live checkout.
8. `/home`, `/contact`, `/shop`, and `/shop/[slug]` remain redirected, blocked, hidden, or clearly unavailable as recorded.
9. Checkout remains unavailable through public routes and direct checkout access does not create a live purchase path.
10. Anonymous protected-route checks show portal/admin/ops boundaries are not weakened.
11. Mobile, tablet, desktop, keyboard, and basic accessibility/render checks pass for the front page, or limitations are recorded with exact evidence.
12. Local validation and production build pass, or failures are recorded with exact evidence and manual intervention instructions.
13. Staged files are limited to Sprint 029/029B approved scope.
14. The sprint result is committed intentionally and pushed to the configured remote only after staging is confirmed.
15. The result is deployed through the confirmed Vercel project path only if target confirmation and safety checks pass.
16. Deployed smoke confirms front page rendering, route redirect/unavailable behavior, checkout unavailable behavior, and anonymous protected-route safety.
17. Documentation records page corrections, claims boundaries, route visibility, validation, deployment target, smoke results, worktree isolation, and any remaining manual intervention.
18. Closeout does not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness.

## Validation Plan

Run the canonical validation appropriate to the changed surface:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`

If the project-standard aggregate command is stable in the current workspace, run:

- `npm.cmd run validate:local`

If `validate:local` times out again, record duration, last visible evidence, and which component checks already passed.

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

`codex/029B-public-front-page-deployment-completion`

If another branch is safer due to current worktree state, Builder must record the reason and preserve unrelated work.

Commit message should clearly identify Sprint 029B, for example:

`Complete Sprint 029B front page deployment path`

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
- `.vercel/project.json` or equivalent Vercel target metadata cannot be read safely.
- Vercel authentication is unavailable.
- deployment target selection is unclear.
- local or preview browser smoke cannot be completed.
- deployment exposes a broader public surface than Sprint 029B permits.
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

Closeout must state one final status:

- marketing-preview deployed
- deployed but gated/preview-only
- blocked before deployment
- deployed but requiring follow-up corrections

Closeout must include:

- exact files staged and committed, if commit occurs
- branch name, commit hash, and push result, if push occurs
- Vercel project/target confirmation method without secrets
- deployment URL, if deployment occurs
- local and deployed smoke evidence
- remaining manual intervention, if any

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, SEO/indexing launch, or final launch readiness from this sprint.
