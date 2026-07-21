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
