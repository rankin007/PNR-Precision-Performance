# Sprint 029 - Public Front Page Marketing Preview And Vercel Deployment

## Role And Method

Builder executes this sprint under the `standard` workflow profile, with strict controls for public visibility, secrets, production deployment, auth/RLS, schema, Supabase, Stripe, billing, remote data, destructive actions, and external service mutation.

Architect created this Pack only. Builder applies it, verifies this `SPRINT.md`, and builds from the applied sprint file.

This sprint deliberately pulls forward the public website workstream because the user accepted the recommendation to build a 75%-90% complete marketing front page now while the rest of the product architecture continues behind it. The user also requested that the result be pushed and deployed through Vercel.

## Starting Point

- Branch recorded in current state: `develop`.
- Current active planning status shows Sprint `021AA-supabase-application-proof-closeout` in implementation diagnostics.
- Sprint `022-mobile-biochemistry-workflow-completion` has an Architect Pack but is not applied in the current workspace snapshot.
- The public site is currently governed by the under-construction/public-gate decisions from Sprint 012F.
- Sprint 019 established the accepted design and messaging baseline.
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` is the controlling authority for public brand, claims, photography, section tone, privacy, and architecture boundaries.
- Product/auth work remains incomplete; authenticated browser proof, final thresholds, production recommendation content, uploads, voice, final commerce truth, and full product Done are not established.

Builder must first reconcile active sprint/worktree state and avoid overwriting unrelated or in-progress work.

## Goal

Build and deploy a polished public front page for marketing review and early business presentation without jeopardizing project architecture.

The target is a visually credible, responsive, front-page experience that feels approximately 75%-90% complete for marketing purposes while leaving deeper product workflows, backend systems, scoring authority, uploads, commerce, and full launch architecture gated.

The page should present:

- `Precision Performance` as the short public name.
- `Equine Biochemistry and Recovery Intelligence` as the descriptor.
- professional horsemanship supported by measurable biochemistry trends.
- a clear first viewport with horse/trainer or credible stable-context visual treatment.
- section-led public content for how the method works, who it helps, the portal/data concept, the testing kit/services, evidence-style examples, and the business/about story.
- qualified calls to action that do not imply live checkout, final onboarding, or stored lead capture unless already safely supported.

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
14. Sprint 012F public under-construction gate artifacts
15. Sprint 019 design-system and product-language artifacts
16. existing public route files and layout components touched by this sprint

## Product And Messaging Requirements

Use the accepted public direction:

- Technology supports trainer judgment; it does not replace trainers, veterinarians, or qualified professionals.
- Prefer measured, careful language: supports more informed decisions, helps identify changes over time, provides trend-based visibility, establishes an individual baseline, complements trainer observation and professional veterinary care.
- Do not use claims of diagnosis, prediction, guarantee, proof, always race-ready, winning formula, or veterinary replacement.
- Do not present correlation as causation.
- Do not expose raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, identifiable stable data, real client data, or private operational records.
- Use recreated, anonymised, or decorative evidence examples only.
- If no approved authentic photography is available in the repository, use an architecture-safe local asset already approved for public use, a restrained generated/static visual treatment, or a clearly non-confidential placeholder that can be replaced later.

## Visual Requirements

Follow `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`:

- Racing green `#12352F`
- Midnight navy `#111D2B`
- Warm bone `#F4F1E9`
- White `#FFFFFF`
- Data blue `#278BC2`
- Heritage gold `#C3A15B`
- Slate `#68747A`
- Status green `#36845B`
- Status amber `#D39A2E`
- Status red `#C8514A`

Use established local font stacks and design-system tokens from Sprint 019. Do not add remote font dependencies.

The front page should feel credible, practical, and premium, not clinical fantasy, generic SaaS, or overdecorated technology marketing. Avoid dark cyber-styled horses, glowing anatomical overlays, dense raw dashboards, confidential screenshots, and unsupported medical imagery.

## Public Visibility Policy

This sprint may replace the root public holding experience with the new marketing front page because the user requested a pushed and Vercel-deployed marketing result.

The sprint must still preserve safety:

- Public shop checkout must remain disabled or clearly unavailable unless a separate commerce sprint authorizes it.
- Public contact or enquiry CTA may use safe existing mailto/contact treatment only if it does not store, transmit, or integrate visitor personal data through a new backend/provider.
- Existing authenticated, portal, admin, ops, Supabase, Stripe, webhook, and checkout protections must not be weakened.
- `noindex/nofollow` may remain in place unless Builder records a deliberate SEO/public-indexing decision from current source authority. Search indexing launch is not required.
- Any non-root public pages that are not rebuilt must not expose stale or conflicting public content by accident.

If Vercel production deployment would expose more than the front-page marketing preview or reopen shop/contact/checkout surfaces beyond this sprint, Builder must stop and record the exact manual intervention needed.

## In Scope

Builder may:

- implement a marketing-quality responsive front page at `/`.
- update or create small public/marketing components needed by the front page.
- update safe public metadata for the front-page preview.
- align `/home` with the new front page or redirect it to `/` if that matches existing route patterns.
- keep `/shop`, `/shop/[slug]`, `/contact`, and other unfinished public routes gated, redirected, or safely unavailable unless narrowly updated to avoid stale exposure.
- use existing public assets or add safe non-confidential marketing assets under `public/**`.
- create recreated/anonymised chart or metric illustrations as static UI, with clear non-production wording.
- add or update focused tests/static checks for public copy, route visibility, no secret exposure, and checkout blocking where local patterns exist.
- update documentation with the page sections, claims boundaries, route visibility, and deployment evidence.
- run local validation and production build.
- create an intentional commit for this sprint.
- push the sprint branch or agreed branch to the configured remote.
- deploy the validated result through Vercel.
- run post-deployment smoke checks for the deployed front page, route gate behavior, checkout blocked/unavailable behavior, and protected-route safety.
- update planning closeout files and Architect briefing after completion.

## Out Of Scope

Builder must not:

- add a CMS, blog/Insights publishing system, database content model, or new backend architecture.
- add Supabase schema, migrations, RLS, roles, permissions, Storage, uploads, OCR, voice, providers, or remote data mutation.
- change auth, portal, admin, ops, callback, webhook, or protected route behavior except to confirm it remains protected.
- add Stripe checkout behavior, public purchasing, billing, catalogue mutation, price changes, webhook changes, or commerce enablement.
- create stored lead capture, mailing-list integration, CRM integration, email API, webhook, or third-party marketing automation.
- invent production scoring thresholds, pH rules, Table of Knowledge recommendations, veterinary advice, or final score terminology.
- publish confidential formulas, raw pathology, raw worksheets, private horse/stable data, or identifiable people/horses without approved releases.
- delete historical pages or source files merely because they are not part of the new front page.
- mutate DNS, Supabase, Stripe, production databases, Vercel project settings, or environment variables unless a narrow required deployment action is already configured and safe.
- inspect or expose secret values or secret fragments.
- overwrite unrelated active Sprint 021AA work.

## Approved File Set

Builder may edit:

- `app/page.tsx`
- `app/(marketing)/home/page.tsx`
- `app/layout.tsx`, only for safe public metadata and no secret/config changes
- `components/**`, only for shared or public marketing components needed by the front page
- `public/**`, only for safe non-confidential public assets
- `styles/**` or global CSS files, only for front-page/design-system-aligned presentation
- Tailwind/design token files, only for narrow reuse of already accepted design roles
- route files for `/shop`, `/shop/[slug]`, `/contact`, and existing marketing pages, only to preserve safe gating/redirect/unavailable behavior
- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- focused tests or validators under existing local test/script conventions
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/EVIDENCE_INDEX.md`

Inspection-only unless needed for protected-route smoke verification:

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

## Acceptance Criteria

1. `/` renders a polished, responsive public front page aligned to the accepted Precision Performance design and messaging authority.
2. The first viewport immediately communicates brand, equine performance context, and the core value proposition.
3. The page includes coherent sections for method, trainer value, portal/data concept, kit/services overview, evidence-style preview, and about/company trust.
4. All claims are qualified and avoid diagnosis, guarantee, veterinary replacement, or unsupported clinical assertions.
5. No confidential data, real private records, secret material, raw formulas, or identifiable unapproved assets are exposed.
6. Public CTA behavior is safe: no new stored lead capture, no mailing-list/provider integration, and no implied live checkout unless separately authorized.
7. Shop/checkout remains blocked, hidden, redirected, or clearly unavailable.
8. Protected portal/admin/ops/auth boundaries are not weakened.
9. Mobile, tablet, desktop, keyboard, and basic accessibility checks pass for the front page.
10. Text does not overlap or overflow awkwardly at common viewport widths.
11. Local validation and production build pass, or any failure is recorded with exact evidence and manual intervention instructions.
12. The sprint result is committed intentionally, pushed to the configured remote, and deployed through Vercel.
13. Deployed smoke evidence confirms the front page renders and safety gates remain intact.
14. Documentation records page sections, claims boundaries, route visibility, validation, deployment target, smoke results, and any remaining marketing/content gaps.

## Validation Plan

Builder should run the canonical validation appropriate to the changed surface, including at minimum:

- `npm run validate:json`
- `npm run validate:static`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

If the project-standard aggregate command is stable in the current workspace, run:

- `npm run validate:local`

Also perform manual or automated viewport checks for:

- mobile phone width
- tablet width
- desktop width
- keyboard traversal
- contrast/readability of status or CTA elements
- no obvious text overlap
- deployed `/`
- deployed protected route behavior
- deployed checkout unavailable/blocked behavior

## Git, Push, And Vercel Deployment

The user requested push and Vercel deployment for this sprint.

Builder may:

1. create or use an appropriately named branch, preferring the project convention `codex/029-public-front-page-marketing-preview-and-vercel-deployment` if a new branch is needed.
2. stage only sprint-related files.
3. commit with a clear Sprint 029 message.
4. push the branch to the configured remote.
5. deploy through the existing Vercel project workflow.
6. record the deployment URL and post-deployment smoke evidence.

Builder must stop before:

- pushing unrelated or unresolved active Sprint 021AA changes.
- force-pushing or rewriting shared history.
- changing DNS.
- changing Vercel project settings or environment variables outside an already configured safe deploy path.
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

Manual intervention is likely required if Vercel authentication is unavailable, the configured remote is ambiguous, deployment target selection is unclear, the branch contains unrelated active 021AA work, or production smoke shows more public exposure than this sprint permits.

## Closeout

At sprint close, Builder must update:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- schedule/risk/question/decision files only where changed by evidence

Closeout must state whether the deployed result is:

- marketing-preview deployed
- deployed but gated/preview-only
- blocked before deployment
- deployed but requiring follow-up corrections

Do not claim full public website completion, product Done, production readiness, commerce readiness, authenticated readiness, or final launch readiness from this sprint.
