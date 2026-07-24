# Sprint 029J - Rendered Live Visual Reconciliation And Deploy Correction

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, browser/rendered evidence, Vercel deployment/alias/promotion, Git source provenance, asset provenance, cache/DNS diagnosis, secrets, auth/RLS, schema, Supabase, Stripe, billing, production data, destructive actions, and unrelated dirty-worktree isolation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

Sprint 029J is the rendered visual reconciliation and deployment-correction follow-up to Sprint 029 through Sprint 029I. It keeps the same core sprint number and uses suffix `J` under the project numbering rule. It must not consume Sprint 030, reopen Sprint 022, or expand into full public website/product/commerce/authenticated/SEO launch work.

## Starting Point

- Sprint 029I closed as `marketing-preview-live-reconciled`.
- Sprint 029I evidence proved source/build/Vercel/DNS/HTTP marker checks from Builder's available shell perspectives.
- Sprint 029I evidence also states that browser/visual and independent live fetch paths did not produce usable evidence.
- A later Architect/reviewer external check still saw the older public-style online page at `https://precisionperformance.com.au/`, including:
  - `Biochemistry Analysis for Elite Equine`
  - `Apply Now`
  - `Shop`
  - testimonials
  - phone app preview
  - member experience
  - shop/contact sections
  - old commercial-style wording
- The user reports that the visual online presentation is nothing like the local presentation.
- Therefore the remaining blocker is not solved by text-marker smoke alone. The sprint must prove rendered visual agreement or correct the public deployment path.
- Local `develop` remains ahead of `origin/develop` by older unrelated commits.
- Unrelated active Sprint 021AA/auth/Supabase dirty state remains outside Sprint 029 scope.

Builder must treat this as an unresolved rendered-live deployment blocker. A passing HTML marker check is not enough for closeout.

## Goal

Make the live public rendered website match the approved local Sprint 029 marketing-preview presentation, or identify the exact layer that prevents correction inside scope.

The desired outcome is `rendered-live-marketing-preview-corrected`: the public root page at apex and `www` visibly renders the same Sprint 029 marketing-preview presentation as the local approved build across desktop/tablet/mobile, with old-page content and old layout absent.

If correction cannot be completed inside the approved boundary, close as `blocked-rendered-live-reconciliation` with exact evidence and operator instructions. Do not close as complete while the online visual presentation still differs materially from the approved local presentation.

## Required Reading

Builder must read before checks, browser attempts, Vercel commands, Git staging, deployment, or documentation edits:

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
15. `planning/sprints/029F-browser-proof-release-and-live-deployment/SPRINT.md`
16. `planning/sprints/029I-live-public-content-reconciliation-and-hard-deploy/SPRINT.md`
17. `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
18. `planning/reviews/029F-browser-proof-release-and-live-deployment-evidence.md`
19. `planning/reviews/029I-live-public-content-reconciliation-and-hard-deploy-evidence.md`
20. current `app/page.tsx`
21. `package.json`
22. `eslint.config.mjs`
23. any image/font/CSS references used by the root page

## Product And Messaging Boundary

Sprint 029J may only ship or correct the already approved Sprint 029 marketing-preview front page and route-safety behavior.

Preserve Sprint 029 messaging:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- The primary action remains `Request a Stable Trial`.
- Use recreated/anonymised presentation examples only.
- Keep `noindex` and `nofollow`.
- Avoid diagnosis, prediction, guarantee, proof claims, veterinary replacement, final score thresholds, Table of Knowledge recommendations, pricing, checkout, or final commercial terms.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, private operational records, secrets, or secret fragments.

This sprint does not authorize full public relaunch, SEO/indexing launch, ecommerce reopening, product Done, authenticated readiness, production readiness, or broader marketing-site completion.

## Rendered Visual Reconciliation Requirements

Builder must reconcile the live rendered page against the approved local rendered page, not only against HTML text markers.

Required comparison layers:

1. **Local approved render:** run the approved Sprint 029 source locally or from the clean production build and capture rendered evidence at desktop, tablet, and mobile widths.
2. **Live public render:** capture the live public root page at the same widths for apex and, if practical, `www`.
3. **DOM and source comparison:** compare visible headings, navigation, CTA text, section structure, image/asset sources, CSS chunks, and body classes between local and live.
4. **Asset/CSS provenance:** verify that live CSS/JS/image assets are from the intended deployment/build and not stale old-page assets.
5. **Vercel/source provenance:** verify alias/deployment/source commit or archive provenance for the live deployment.

The sprint cannot close as corrected unless the rendered live page visually matches the local approved Sprint 029 presentation at minimum:

- hero/first viewport composition
- main headline and descriptor
- primary CTA
- absence of old nav items such as `Shop` and `Apply Now`
- absence of old testimonials/contact/shop/member sections
- visible imagery/assets expected by the Sprint 029 page
- no severe clipping, overlap, missing stylesheet, unstyled render, or horizontal overflow

## Required Browser / Visual Evidence

Builder must obtain rendered visual evidence. Use the strongest available route first:

1. in-app browser or connected browser tooling
2. installed Edge/Chrome with screenshots
3. Playwright or equivalent browser automation from a clean temp workspace
4. operator-assisted screenshots if automation fails

At minimum, capture or record:

- desktop viewport around `1440x1000`
- tablet viewport around `768x1024`
- mobile viewport around `390x844`

For each viewport, record:

- exact URL
- timestamp/timezone
- viewport size
- final URL
- page title
- visible first-viewport text
- whether old-page visible markers are present
- whether Sprint 029 visible markers are present
- screenshot path or operator screenshot reference

If automated screenshots fail, Builder must not silently fall back to marker-only smoke. Builder must request or use operator-assisted screenshot evidence and record the manual intervention details.

## Old Presentation Markers

Any of these appearing visibly online is a failure until explained and corrected:

- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- `Shop`
- `Testimonials`
- `Phone App Preview`
- `Members Experience`
- `Professional Kit`
- `Monthly Service`
- `$500 per test`
- contact form fields on the root page
- old hero copy about advanced urine and saliva analysis to optimize performance and recovery

Sprint 029 visible markers expected online:

- `Equine Biochemistry and Recovery Intelligence`
- `See what observation alone cannot show.`
- `Request a Stable Trial`
- `Recreated sample, not live horse data`

## Approved Correction Actions

Builder is expected to correct the public deployment if the correct target is unambiguous.

Builder may:

- create or use an isolated release worktree/workspace containing only Sprint 029 source and planning closeout files.
- run local production server/render from the clean Sprint 029 source for comparison.
- run validation and production build in a reparse-safe workspace.
- inspect generated `.next` route output, CSS chunks, asset manifests, and public assets.
- deploy the correct Sprint 029 marketing-preview release to Vercel production.
- promote or alias the correct deployment to:
  - `precisionperformance.com.au`
  - `www.precisionperformance.com.au`
  - `pnr-precision-performance.vercel.app`
- repeat deployment if the current live render maps to old source/assets or inconsistent artifacts.
- use safe Vercel cache/alias invalidation when available as a deployment/alias operation.
- create a sprint-only local commit for 029J source/planning/evidence changes.
- push a sprint-only branch or release branch needed for deployment provenance.
- update planning and evidence files to truthfully correct prior 029I claims if rendered evidence contradicts them.

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

Builder must make any deployed source traceable without dragging unrelated 021AA work into the release.

Minimum requirements:

1. Record `git status --short --branch` before staging.
2. Identify all files required for the Sprint 029J deploy/evidence unit.
3. Use explicit path staging only.
4. Do not use `git add .`.
5. Inspect `git diff --cached --name-status` before commit.
6. Confirm no unrelated 021AA/auth/Supabase files are staged.
7. If pushing, push a sprint-only branch or proven safe release branch rather than blindly pushing local `develop`.
8. Record commit SHA, branch, deployment ID, and alias mapping used for deployment provenance.

Local `develop` being ahead of `origin/develop` by older unrelated commits must not be solved inside this sprint.

## Required Validation

Before any production deploy or alias correction from source, Builder must run:

- `npm.cmd run validate:json`
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- production build in a non-OneDrive or otherwise reparse-safe workspace
- `git diff --check` for Sprint 029J touched files

If source changes are unnecessary and the correction is alias/deployment-only, Builder must still prove no relevant source drift and run the validation necessary to support the selected correction path.

## Final Public Smoke

After deploy/alias correction or after proving no correction was needed, Builder must run final public smoke against `https://precisionperformance.com.au`.

Minimum checks:

- rendered desktop/tablet/mobile root screenshots match local approved Sprint 029 presentation.
- `/` returns 200 and contains Sprint 029 markers.
- `/` visibly contains none of the old presentation markers.
- `/home` redirects to `/`.
- `/contact` redirects to `/`.
- `/shop` redirects to `/`.
- `/shop/example` is redirected, blocked, hidden, or clearly unavailable.
- `/sign-in` remains available.
- anonymous `/admin` redirects to sign-in.
- anonymous `/portal` redirects to sign-in.
- anonymous `/data-entry` redirects to sign-in.
- safe GET `/api/checkout` remains unavailable and does not create a public purchase path.

Repeat rendered root checks for apex and `www` after any correction.

## In Scope

Builder may:

- apply this Pack and verify the generated Sprint 029J file.
- inspect local and live rendered pages.
- capture screenshots or operator-assisted visual evidence.
- inspect source, build output, asset manifests, Vercel aliases/deployments, DNS, cache headers, and public content.
- correct Vercel production deployment/alias state for the approved Sprint 029 marketing-preview page.
- create a reparse-safe release workspace.
- create sprint-only evidence/planning/source commits if needed.
- push a sprint-only branch or release branch needed to make deployment provenance clear.
- update documentation/status/evidence to reflect the actual rendered-live result.
- correct prior 029I completion claims if rendered evidence contradicts them.

## Out Of Scope

Builder must not:

- redesign or materially rewrite the front page beyond tiny corrections needed to restore the approved Sprint 029 presentation.
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

- `app/page.tsx`, only if source inspection proves the deployed/local approved page source needs a tiny correction to restore the approved Sprint 029 marketing-preview presentation.
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

- `planning/sprints/029J-rendered-live-visual-reconciliation-and-deploy-correction/SPRINT.md` through Pack application only.
- `planning/reviews/029J-rendered-live-visual-reconciliation-and-deploy-correction-evidence.md`
- local screenshot artifacts under an appropriate evidence or temporary path if needed, excluding secrets/private data.

Builder may inspect:

- Sprint 029 through 029I sprint/evidence files.
- `.vercel/**` names/config shape only, never secrets.
- build artifacts, asset manifests, and deployment output needed to identify rendered source/content.
- public assets referenced by the root page.

Any file outside this set requires a stop unless it is a generated temporary build/browser artifact that is created and cleaned inside a disposable workspace.

## Acceptance Criteria

1. Sprint 029J is applied as `planning/sprints/029J-rendered-live-visual-reconciliation-and-deploy-correction/SPRINT.md`.
2. Local approved rendered presentation is captured or documented at desktop/tablet/mobile widths.
3. Live public rendered presentation is captured or documented at desktop/tablet/mobile widths.
4. Local and live rendered pages are compared for layout, visible text, nav/CTA, section structure, assets, and old-page markers.
5. Any visual mismatch is reproduced, disproved from the same or stronger perspective, or traced to a named layer.
6. If Vercel deployment/alias/source correction is needed and safe, it is performed.
7. Apex and `www` render the approved Sprint 029 marketing-preview presentation before closing as corrected.
8. Old presentation markers are absent from all credible rendered public perspectives before closing as corrected.
9. Final public route smoke passes.
10. Evidence records screenshot/visual proof, deployment ID, alias mapping, commit/branch provenance, URLs checked, viewport sizes, headers, markers, and final status without secrets.
11. Planning/status/briefing/docs are corrected to match the actual rendered-live result.
12. Closeout does not claim full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, or production readiness.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must flag it clearly instead of leaving it implicit.

For each manual intervention, Builder must record:

- what is blocked or not working
- the evidence already checked
- the exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Manual intervention is required if:

- browser automation cannot capture screenshots.
- Vercel authentication is unavailable.
- the correct deployment target cannot be identified unambiguously.
- correction requires DNS/settings/environment changes.
- external rendered public checks remain inconsistent after safe Vercel deploy/alias correction.
- pushing/deployment provenance requires resolving unrelated local `develop` history.
- any command would expose secrets or secret fragments.

## Closeout

At sprint close, Builder must create:

- `planning/reviews/029J-rendered-live-visual-reconciliation-and-deploy-correction-evidence.md`

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

- `rendered-live-marketing-preview-corrected`
- `rendered-live-marketing-preview-confirmed`
- `deployment-evidence-corrected`
- `blocked-rendered-live-reconciliation`

Closeout must include:

- local rendered evidence
- live rendered evidence
- local-vs-live visual comparison
- asset/CSS provenance evidence
- source/commit/branch provenance
- validation/build evidence
- Vercel deployment and alias evidence without secrets
- DNS/cache/header evidence
- any correction/deploy/alias command and result
- final public route smoke evidence
- remaining blocker/manual intervention, if any

Do not close as `rendered-live-marketing-preview-corrected` or `rendered-live-marketing-preview-confirmed` unless rendered live evidence is clean: approved Sprint 029 presentation visible, old presentation absent, and route-safety smoke passing.
