============================================================
FILE: planning/sprints/019-design-system-and-product-language-baseline/requirements.md
============================================================

# Sprint 019 - Design System And Product Language Baseline Requirements

## Role And Workflow

Builder executes this sprint under the `strict` workflow profile.

This Architect Pack was explicitly requested by the user on 2026-07-19. It is not draft or planning-only. Under `AGENTS.md`, the pack must be applied and Sprint 019 implementation authorized before Builder handoff.

## Source Authorities

Builder must treat these as authoritative:

- `AGENTS.md`
- `planning/STATE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `planning/DEFINITION_OF_DONE.md`
- `planning/reviews/PROJECT_REVIEW_AND_FORWARD_ROADMAP_2026-07-19.md`
- this Sprint 019 file set

The accepted design authority controls brand hierarchy, tokens, public-versus-portal priorities, status accessibility, claims, terminology, confidential-data handling, and architecture gates.

## Goal

Create a stable, reusable design-system and product-language baseline for later UI sprints without changing product architecture or behavior.

Sprint 019 should:

- encode the accepted colour roles as shared CSS/Tailwind tokens
- establish the accepted editorial-display and application-sans font roles using local/system-safe fallbacks only
- align root metadata and shared brand configuration with the accepted master/public brand hierarchy
- align the under-construction and sign-in/authenticated-shell presentation without reopening public surfaces
- create or refine reusable card, button, field, label, notice, and status patterns where they reduce duplication
- establish an accessible status pattern that never relies on colour alone
- apply the shared baseline to the authenticated shell and existing biochemistry result/capture surfaces only where narrow and behavior-preserving
- remove encoding artifacts or clearly stale internal product-language fragments encountered inside the approved file set
- document the tokens, component roles, terminology rule, and intentionally deferred public rebuild

## Design Tokens

The implementation must encode these accepted roles:

| Role | Value |
|---|---|
| Racing green | `#12352F` |
| Midnight navy | `#111D2B` |
| Warm bone | `#F4F1E9` |
| White | `#FFFFFF` |
| Data blue | `#278BC2` |
| Heritage gold | `#C3A15B` |
| Slate | `#68747A` |
| Status green | `#36845B` |
| Status amber | `#D39A2E` |
| Status red | `#C8514A` |

Typography roles:

- display/editorial: Newsreader or Source Serif 4 when available, followed by safe serif fallbacks
- application/body: Inter or Manrope when available, followed by safe sans-serif fallbacks

Do not add a network font dependency or build-time remote font fetch. A later asset decision may package font files if required.

## Brand And Language Rules

Use:

- master brand: `Equine Precision Performance`
- short public name: `Precision Performance`
- descriptor: `Equine Biochemistry and Recovery Intelligence`
- software product: `Precision Performance Portal`

`PNR Precision Performance` may remain only where legal/provenance context explicitly requires it. It should not remain the default visible product brand or root metadata after this sprint.

Do not expose dormant marketing copy about generic platform foundations, Railway, agents, orchestration, or internal delivery systems. Sprint 019 must audit those components and record them as gated Sprint 029 replacement work; it should not perform the full public-site rewrite.

## Status And Terminology Rules

- Green/Amber/Red must be paired with text and an icon or other non-colour marker.
- Numerical values and explanatory context must be present when a status represents a score/result.
- Blocked, unavailable, informational, success, warning, and attention states must be distinguishable without colour alone.
- Existing internal/domain `healthScore` and `health` keys must not be renamed.
- Trainer/public-facing UI may not invent a final replacement label for `Health Score` in Sprint 019.
- Where the current UI must display the unresolved score, use a clearly provisional display treatment documented in Sprint 019, while preserving internal compatibility. Preferred default: `Biochemistry Trend Score`, with documentation that business/domain approval remains open.
- No claims of diagnosis, prediction, guarantee, proof, winning outcomes, or validated recommendations may be introduced.

## In Scope

Builder may:

- update shared CSS variables, Tailwind token mappings, font stacks, shadows, focus styles, and background roles
- update root metadata and `lib/site-config.ts` brand configuration
- narrowly align the under-construction page without changing its gate, redirects, robots behavior, or CTA persistence
- update shared layout components and sign-in presentation
- add focused reusable UI primitives under `components/ui/**`
- narrowly adopt those primitives in existing layout/auth/biochemistry surfaces
- correct encoding artifacts within approved files
- create `docs/DESIGN_SYSTEM_BASELINE_019.md`
- add focused static validation for required tokens/brand/status semantics if useful
- update planning closeout files

## Out Of Scope

Builder must not:

- reopen `/home`, `/contact`, `/shop`, `/shop/[slug]`, or checkout
- remove `noindex/nofollow` from the holding page
- build the Sprint 029 public marketing experience
- add a CMS, Insights publishing system, new public routes, or new navigation architecture
- change product workflows, scoring formulas, lookup behavior, result persistence, or server actions
- rename database fields, TypeScript domain keys, snapshots, or migration columns
- add or change schema, Supabase migrations, RLS, roles, permissions, storage, uploads, OCR, voice, providers, Stripe, or production configuration
- introduce production thresholds or Table of Knowledge content
- publish pricing
- add new npm packages or network-hosted/build-time fonts
- mutate production, deploy, push, create a PR, or commit unless separately requested
- expose confidential records, formulas, raw client data, secrets, or secret fragments
- edit `.release-main/`, `.claude/`, `samples/`, or real env files

## Approved File Set

Builder may edit only:

- `app/globals.css`
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/page.tsx`, only for accepted brand/design alignment while preserving the holding gate, robots behavior, operator sign-in, and non-persistent interest treatment
- `app/sign-in/page.tsx`, presentation/copy only
- `lib/site-config.ts`
- `components/layout/**`
- `components/auth/sign-in-form.tsx`, presentation/copy only
- `components/ops/biochemistry-result-panel.tsx`, presentation/terminology only
- `app/(ops)/data-entry/biochemistry/page.tsx`, presentation/class names and non-domain copy only
- `components/ui/**`
- `docs/DESIGN_SYSTEM_BASELINE_019.md`
- `scripts/validate-design-system-019.*`, if a focused validator is useful
- `planning/**`, for Sprint 019 execution and closeout only

Builder may inspect but must not edit in this sprint:

- `components/sections/**` dormant marketing components
- `app/(marketing)/**`, `app/contact/**`, `app/shop/**`, and checkout routes
- `lib/domain/**`
- `lib/auth/**`
- `lib/supabase/**`
- `lib/stripe/**`
- `supabase/**`
- package/dependency files
- deployment configuration

If acceptance requires a file outside the approved set, Builder must stop and request scope approval.

## Behavior Preservation

Builder must preserve:

- the public under-construction gate and redirect behavior
- `noindex/nofollow`
- non-persistent public interest treatment
- operator sign-in path
- existing auth and permission gates
- existing form actions and server behavior
- exact-match biochemistry scoring and blocked/unavailable states
- current responsive route behavior
- existing Stripe and Supabase behavior

## Required Outputs

- encoded accepted design tokens
- aligned brand/root metadata
- reusable documented status/notice semantics
- aligned shared authenticated shell, sign-in, holding, and narrow biochemistry presentation
- dormant public component audit recorded for Sprint 029
- `docs/DESIGN_SYSTEM_BASELINE_019.md`
- planning closeout updates

## Validation

Builder must run:

- focused token/brand/status validator if created
- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm run build` through the known working path
- route smoke for `/`, `/sign-in`, anonymous `/portal`, anonymous `/data-entry/biochemistry`, and `/home` redirect behavior
- viewport review at representative mobile and desktop widths where feasible
- source check confirming no gate/robots/checkout/auth behavior changed
- `git diff --check`
- `git status --short`

## Manual Intervention Rule

If a required item is blocked, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions
- what Builder will verify afterward

Potential manual items include packaged font-file selection, final public score label approval, and visual browser QA when the local browser/runtime cannot render the app.

## Commit Rule

Do not commit, push, PR, deploy, or reopen public surfaces unless separately requested and explicitly authorized.

============================================================
FILE: planning/sprints/019-design-system-and-product-language-baseline/blueprint.md
============================================================

# Sprint 019 - Design System And Product Language Baseline Blueprint

## Intent

Establish one design and product-language foundation now so Sprints 022-029 do not repeatedly invent or migrate colours, typography, controls, status semantics, and brand terminology.

## Execution Plan

1. Read all Sprint 019 source authorities and confirm authorization.
2. Capture the pre-change behavior of `/`, `/sign-in`, `/home`, `/portal`, and `/data-entry/biochemistry`.
3. Audit the approved files for existing tokens, duplicated class patterns, brand strings, encoding artifacts, status treatments, and focus states.
4. Audit dormant `components/sections/**` without editing them; record stale public language for Sprint 029.
5. Define the exact CSS variable map and Tailwind aliases from the accepted palette.
6. Define system-safe editorial and application font stacks without network dependencies.
7. Establish restrained shared surface, border, shadow, focus, button, input, label, notice, and status conventions.
8. Add the smallest useful UI primitives under `components/ui/**`; avoid a speculative component library.
9. Align root metadata, shared site config, holding page, sign-in, authenticated shell, and narrow biochemistry presentation.
10. Preserve all route, auth, form, scoring, persistence, robots, checkout, and gate behavior.
11. Document the baseline and deferred items.
12. Run validation and close the sprint.

## Token Strategy

Use semantic names, not presentation-specific names, so later components can distinguish brand, technical, data, and status roles. Preserve compatibility aliases only where necessary to keep the approved file set narrow; document any deprecated alias.

Expected semantic roles include:

- brand-primary / racing green
- technical / midnight navy
- canvas / warm bone
- surface / white
- data / data blue
- accent / heritage gold
- muted / slate
- status-success, status-warning, status-danger
- text-primary, text-muted, border-subtle, focus-ring

## Component Strategy

Prefer a small set of primitives:

- button/link variants
- form field shell or shared class conventions
- notice/callout
- status badge/indicator with text plus icon/non-colour marker
- surface/card roles

Do not introduce abstraction where a CSS token or existing component is enough.

## Surface Application

### Holding page

Align visible brand and palette while preserving the same image, gate message, operator sign-in, non-persistent interest treatment, and robots state.

### Sign-in

Align presentation and safe decision-support brand language. Preserve all auth actions, callback behavior, query-state behavior, and setup/error messaging.

### Authenticated shell

Use midnight navy/brand surfaces, warm bone canvas, consistent hierarchy, accessible focus, and corrected encoding. Preserve navigation and permission behavior.

### Biochemistry capture/results

Apply shared form/status/card patterns without changing fields, validation, calculations, persistence, thresholds, or recommendation behavior. Keep unresolved domain outputs clearly unavailable or provisional.

## Dormant Public Audit

Inspect `components/sections/**` for:

- generic platform-foundation copy
- Railway references
- agent/orchestration/internal-delivery language
- outdated brand names
- claims incompatible with the accepted authority

Record findings in `docs/DESIGN_SYSTEM_BASELINE_019.md`. Do not rebuild these components in Sprint 019.

## Documentation

`docs/DESIGN_SYSTEM_BASELINE_019.md` must record:

- token table and implementation locations
- typography stacks and font-file deferral
- shared component roles
- status accessibility rules
- brand hierarchy
- public display terminology handling versus internal keys
- surfaces aligned in Sprint 019
- behavior explicitly preserved
- dormant marketing audit
- deferred architecture/content work
- validation results and manual intervention

## Closeout

At completion:

- return `planning/STATE.md` to `Implementation authorized: no`
- mark Sprint 019 complete only if acceptance and validation are satisfied
- refresh `planning/STATUS.json` and `planning/ARCHITECT_BRIEFING.md`
- recommend Sprint 020 remote biochemistry migration/live readiness

============================================================
FILE: planning/sprints/019-design-system-and-product-language-baseline/acceptance.md
============================================================

# Sprint 019 - Design System And Product Language Baseline Acceptance

## Authorization And Scope

- Sprint 019 implementation is authorized before Builder source edits.
- Builder reads the accepted design authority, roadmap review, and Sprint 019 files.
- Only the approved file set is modified.
- No architecture gate is crossed.

## Design-System Acceptance

- All ten accepted palette roles are encoded exactly.
- Tailwind/shared styles expose semantic roles suitable for public, portal, data, accent, and status use.
- Editorial-display and application-sans stacks follow the accepted direction without a network dependency.
- Focus-visible treatment is clear and keyboard-usable.
- Buttons, fields, cards/surfaces, notices, and status treatments are visually consistent on touched surfaces.
- No unnecessary broad component framework is introduced.

## Brand And Language Acceptance

- Root metadata and shared site configuration use the accepted brand hierarchy.
- Visible default product brand no longer uses `PNR Precision Performance` unless legal/provenance context requires it.
- The holding page remains an under-construction experience and is not expanded into the public marketing site.
- Touched copy avoids generic platform-foundation, Railway, agent, orchestration, diagnosis, guarantee, prediction, proof, winning, and unvalidated recommendation language.
- Dormant marketing components are audited and documented but not rebuilt.

## Status And Terminology Acceptance

- Status colour is never the sole indicator in touched components.
- Status components include text and a non-colour marker; score/result states include numerical/context treatment where applicable.
- Blocked and unavailable states remain explicit.
- Internal `healthScore`/`health` keys and persisted contracts are unchanged.
- Any `Biochemistry Trend Score` display is documented as a provisional display-only label pending final business/domain approval.
- No production thresholds or recommendation content are invented.

## Behavior Preservation Matrix

| Surface | Required preserved behavior |
|---|---|
| `/` | Holding page, supplied image, `noindex/nofollow`, operator sign-in, non-persistent interest treatment |
| `/home` | Redirects to `/` |
| `/contact` | Remains gated according to current behavior |
| `/shop` and product routes | Remain gated |
| checkout | Remains blocked before Supabase/Stripe work |
| `/sign-in` | Existing authentication actions and query states |
| `/portal` | Existing auth/membership guard |
| `/data-entry/biochemistry` | Existing operational-write guard, fields, action, validation, and scoring behavior |
| biochemistry result | Existing raw/derived/scored/blocked/unavailable behavior |

## Prohibited Outcomes

- No public reopening or robots change.
- No marketing-site rebuild.
- No schema, migration, auth, RLS, role, storage, upload, OCR, voice, provider, Stripe, or deployment change.
- No domain formula/key/persistence rename.
- No new dependency or network font.
- No pricing publication.
- No secret exposure.
- No commit, push, PR, or deployment unless separately requested.

## Validation Acceptance

- focused validator passes if created
- lint passes
- TypeScript passes
- production build passes
- route smoke confirms the preservation matrix where feasible
- mobile and desktop review finds no clipping, overlap, unreadable contrast, or inaccessible focus on touched surfaces
- `git diff --check` passes
- closeout records `git status --short`

If visual/browser QA is unavailable, the Builder must record the exact limitation, manual steps, and follow-up verification under the Manual Intervention Rule.

============================================================
FILE: planning/sprints/019-design-system-and-product-language-baseline/handoff-prompt.md
============================================================

# Sprint 019 - Builder Handoff Prompt

You are Builder for Sprint 019 - Design System And Product Language Baseline.

Read first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `planning/DEFINITION_OF_DONE.md`
6. `planning/reviews/PROJECT_REVIEW_AND_FORWARD_ROADMAP_2026-07-19.md`
7. all files under `planning/sprints/019-design-system-and-product-language-baseline/`
8. `planning/ARCHITECT_BRIEFING.md`

## Mission

Encode the accepted brand/design/product-language foundation and apply it narrowly to shared, holding, sign-in, authenticated-shell, and biochemistry presentation surfaces without changing application behavior or crossing an architecture gate.

## Non-Negotiables

- Preserve the public under-construction gate and `noindex/nofollow`.
- Preserve auth, permissions, form actions, scoring, persistence, redirects, checkout blocking, and all domain behavior.
- Use the exact accepted palette.
- Use local/system-safe font stacks only.
- Never use status colour alone.
- Do not rename internal `healthScore` or `health` contracts.
- Do not invent thresholds, recommendations, claims, pricing, or product behavior.
- Do not rebuild dormant marketing components; audit and defer them to Sprint 029.
- Stop before any file outside the approved set.
- Do not commit, push, PR, deploy, or mutate remote/production state.

## Working Method

1. Verify authorization and capture pre-change route behavior.
2. Audit before editing.
3. Implement tokens before component adoption.
4. Keep primitives small and semantic.
5. Apply changes incrementally and preserve behavior.
6. Run static, build, route, responsive, accessibility, and diff validation.
7. Document exact outcomes and manual intervention.
8. Close Sprint 019 and recommend Sprint 020.

============================================================
FILE: planning/sprints/019-design-system-and-product-language-baseline/BUILDER_START_INSTRUCTIONS.md
============================================================

# Sprint 019 Builder Start Instructions

Sprint 019 is applied and implementation is authorized in `planning/STATE.md`.

Start by reading the Sprint 019 requirements, blueprint, acceptance, and handoff prompt. Confirm the approved file set before any source edit.

Implement the design-system and product-language baseline only. Preserve all route, auth, form, scoring, persistence, robots, checkout, gate, and production behavior.

Stop and flag manual intervention if visual/browser QA cannot be completed, if final font assets are required, if a final public score label is needed, or if any requested change falls outside the approved file set.
