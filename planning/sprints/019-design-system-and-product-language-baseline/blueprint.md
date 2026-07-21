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
