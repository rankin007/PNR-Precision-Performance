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
