# Design System Baseline 019

## Status

Sprint 019 establishes the shared visual and product-language baseline for later UI work. It aligns approved holding, sign-in, authenticated-shell, and biochemistry presentation surfaces while preserving product behavior and the public gate.

## Tokens And Typography

The canonical variables live in `app/globals.css` and semantic Tailwind aliases live in `tailwind.config.ts`.

| Role | Value | Alias |
|---|---:|---|
| Racing green | `#12352F` | `brand` |
| Midnight navy | `#111D2B` | `technical` |
| Warm bone | `#F4F1E9` | `canvas` |
| White | `#FFFFFF` | `surface` |
| Data blue | `#278BC2` | `data` |
| Heritage gold | `#C3A15B` | `accent` |
| Slate | `#68747A` | `muted` |
| Status green | `#36845B` | `success` |
| Status amber | `#D39A2E` | `warning` |
| Status red | `#C8514A` | `danger` |

Display text uses Newsreader or Source Serif 4 when locally available, then safe serif fallbacks. Application text uses Inter or Manrope when locally available, then safe sans-serif fallbacks. No font package or network/build-time fetch was added. Packaged font selection remains optional future work.

Legacy `ink`, `sand`, `steel`, `ember`, and `mist` aliases remain for untouched surfaces and narrow compatibility. New work should use semantic roles.

## Shared Patterns

- `components/ui/notice.tsx` provides informational, success, warning, and attention notices with a visible text heading and non-colour marker.
- `components/ui/status-indicator.tsx` provides success, warning, danger, and unavailable states with a label and non-colour marker.
- Shared focus-visible styling uses a three-pixel data-blue outline with offset.
- Existing section cards, fields, buttons, holding, sign-in, shell, and biochemistry surfaces now use the semantic baseline where touched.

Status colour is supplementary. Status must always include text and a marker; score/result presentation must also show the numerical value and explanatory context where available. Blocked and unavailable states remain explicit.

## Brand And Terminology

- Master brand: **Equine Precision Performance**
- Short public name: **Precision Performance**
- Descriptor: **Equine Biochemistry and Recovery Intelligence**
- Software product: **Precision Performance Portal**

The trainer-facing display label **Biochemistry Trend Score** is provisional and display-only. Final business/domain approval remains open. Internal `healthScore` and `health` keys, persistence, fixtures, and scoring contracts are unchanged.

## Preserved Behaviour

The under-construction page, supplied image, `noindex/nofollow`, operator sign-in link, and non-persistent interest treatment remain. `/home` and gated public route behavior are unchanged. Authentication actions, callbacks, permissions, form actions, exact-match scoring, blocked/unavailable results, persistence, Supabase, Stripe, and checkout behavior were not changed.

No schema, migration, role/RLS, upload, voice, provider, CMS, pricing, deployment, production, dependency, or network-font change was made.

## Dormant Marketing Audit

The following inspected files remain gated for Sprint 029 and were not edited:

- `components/sections/hero.tsx`: generic platform-foundation copy, Railway reference, orchestration/agent delivery language.
- `components/sections/foundation-checklist.tsx`: repository scaffold and agent-registry language.
- `components/sections/workflow-strip.tsx`: orchestrator, agent, architecture-delivery language.
- `components/sections/platform-pillars.tsx`: generic database/membership/commerce-growth positioning requiring approved public copy.
- `components/sections/public-cta-strip.tsx`: dormant shop/contact reopening language and calls to action.

These components must not be publicly reopened as-is. Sprint 029 should replace them with the accepted public experience, safe claims, approved evidence, and Request a Stable Trial acquisition direction.

## Deferred Decisions And Manual Intervention

- Final public score label requires business/domain approval. After approval, a future UI sprint should update display copy only unless an explicit migration authorizes internal key changes.
- Packaged font files are not required for this baseline. If exact fonts are required later, the user must select and license local font assets; Builder should then verify loading, fallback, performance, and rendering.
- Production thresholds, Table of Knowledge content, photography/releases, pricing, provider choices, remote migration, and live operator access remain separate gated work.

## Validation

Completed on 2026-07-19:

- focused Sprint 019 validator: passed
- `npm run lint`: passed with no warnings or errors
- `npx tsc --noEmit --incremental false`: passed
- `npm run build`: passed; an intermittent Windows/OneDrive worker exit passed on a clean retry
- route smoke: `/` and `/sign-in` returned `200`; anonymous `/portal` and `/data-entry/biochemistry` redirected to sign-in; `/home`, `/contact`, and `/shop` redirected to `/`
- holding source: `noindex`, `nofollow`, supplied image, `/sign-in`, and non-persistent interest text confirmed
- `git diff --check`: passed (line-ending conversion warnings only)

### Rendered visual QA follow-up

Sprint 019 originally closed with rendered viewport QA pending. Sprint 019B completed that verification and corrected the mobile holding-page heading.

Verified with the in-app browser on 2026-07-19:

- `/` at `390 × 844`: no document overflow, heading clipping, truncation, or overlap
- `/` at `1440 × 900`: desktop hierarchy and horse-image composition preserved
- `/sign-in` at mobile width: controls remained within the viewport with no horizontal overflow
- keyboard focus: Operator sign-in showed the data-blue focus outline
- `/home`, `/contact`, and `/shop`: continued to resolve to `/`
- rendered robots metadata: `noindex, nofollow`
## Sprint 019B Mobile Heading Follow-Up

Implemented on 2026-07-19: the holding-page heading mobile class changed from `text-6xl` to `text-5xl`; `md:text-8xl` remains unchanged. The heading text, image, descriptor, paragraph, CTAs, metadata, robots rules, and route behavior were not changed.

Automated verification passed: Sprint 019 validator, ESLint, TypeScript, production build, source checks, and route smoke. `/` and `/sign-in` returned `200`; `/home`, `/contact`, and `/shop` remained redirected to `/`; `noindex`, `nofollow`, the exact heading, sign-in path, and non-persistent interest text remained present.

Rendered acceptance passed. Full measurements and route evidence are recorded in `planning/sprints/019B-mobile-heading-correction/VERIFICATION.md`.
