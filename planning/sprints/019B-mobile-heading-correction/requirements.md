# Sprint 019B - Mobile Heading Correction Requirements

## Role And Authorization

Builder executes this follow-up under the `strict` workflow profile.

The user explicitly accepted and approved Architect Pack 019B on 2026-07-19. This pack is not draft or planning-only. It must be applied and implementation authorized under `AGENTS.md` before handoff.

Sprint identifier `019B` follows the hard project rule for the first follow-up to core Sprint 019. It does not reopen Sprint 019 or consume Sprint 020.

## Source Authorities

- `AGENTS.md`
- `planning/STATE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `docs/DESIGN_SYSTEM_BASELINE_019.md`
- Sprint 019 acceptance criteria
- this Sprint 019B file set

## Evidence And Problem

Rendered QA at `390 × 844` found that the holding-page `Under Construction` heading container was approximately 343 px wide while the unbroken word `Construction` required approximately 405 px. The page uses `overflow-hidden`, so the word was clipped on the right.

Desktop QA at `1440 × 900`, mobile sign-in rendering, and public holding-page keyboard focus passed. Sprint 019 automated validation also passed.

## Goal

Correct the holding-page heading so it renders completely at the required mobile viewport while preserving the accepted Sprint 019 design and every existing route, gate, robots, auth, content, and production behavior.

## In Scope

Builder may:

- change responsive heading typography or safe wrapping classes on the holding-page heading
- use the smallest behavior-preserving class-level adjustment necessary
- update Sprint 019 design-baseline documentation with the completed visual-QA outcome
- update planning closeout files
- run focused local rendering and route/source verification

## Out Of Scope

Builder must not:

- rewrite holding-page copy or change its information hierarchy
- replace or reposition the supplied image beyond what is strictly required by the heading fix
- alter the accepted palette, font roles, brand hierarchy, metadata, CTA wording, or interest treatment
- change `noindex/nofollow`
- reopen `/home`, `/contact`, `/shop`, product routes, or checkout
- modify auth, redirects, server actions, scoring, persistence, schema, migrations, RLS, roles, storage, uploads, voice, providers, Stripe, deployment, or production state
- add dependencies or network fonts
- edit dormant marketing components
- commit, push, PR, or deploy unless separately requested
- edit files outside the approved file set

## Approved File Set

Builder may edit only:

- `app/page.tsx`, heading classes only
- `docs/DESIGN_SYSTEM_BASELINE_019.md`, visual-QA follow-up record only
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`, only if needed to record 019B completion without renumbering core sprints
- `planning/DECISIONS.md`, `planning/RISKS.md`, or `planning/QUESTIONS.md` only if the correction creates a durable change
- `planning/sprints/019B-mobile-heading-correction/**`

If another file is required, Builder must stop and request scope approval.

## Behavior Preservation

The fix must preserve:

- the exact heading text `Under Construction`
- supplied image and full-screen holding treatment
- accepted brand and descriptor
- operator sign-in link
- non-persistent interest text
- `noindex/nofollow`
- `/home`, `/contact`, and `/shop` gate behavior
- checkout blocking
- all protected route/auth behavior

## Required Validation

Builder must:

- build or start the validated local application
- render `/` at `390 × 844`
- confirm the heading has no clipping, horizontal overflow, overlap, or truncated letters
- render `/` at `1440 × 900`
- confirm the desktop composition remains intact
- confirm the Operator sign-in focus outline remains visible by keyboard
- confirm `/sign-in` remains visually usable at mobile width
- confirm `/home`, `/contact`, and `/shop` remain redirected/gated
- confirm `noindex/nofollow` remains in source/rendered metadata
- run the Sprint 019 focused validator
- run lint, TypeScript, and production build
- run `git diff --check` and record `git status --short`

## Required Outputs

- corrected mobile holding-page heading
- rendered mobile and desktop QA evidence recorded in `docs/DESIGN_SYSTEM_BASELINE_019.md`
- Sprint 019B closeout in state/status/briefing
- implementation authorization reset to `no` after acceptance passes
- Sprint 020 remains the next core sprint

## Manual Intervention Rule

If browser rendering or keyboard QA cannot run, Builder must not silently claim visual acceptance. Record the blocked item, evidence checked, exact user action, step-by-step instructions, and the verification that remains.

## Commit Rule

Do not commit, push, PR, deploy, or mutate remote/production state unless separately requested.
