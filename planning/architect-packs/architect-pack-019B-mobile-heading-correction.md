============================================================
FILE: planning/sprints/019B-mobile-heading-correction/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/019B-mobile-heading-correction/blueprint.md
============================================================

# Sprint 019B - Mobile Heading Correction Blueprint

## Intent

Close the single rendered visual defect found after Sprint 019 without reopening the core sprint or broadening design scope.

## Execution Plan

1. Read Sprint 019B authorities and confirm authorization.
2. Capture the current heading measurements and screenshot at `390 × 844`.
3. Inspect only the holding-page heading classes.
4. Choose the smallest responsive correction, preferring fluid or smaller mobile type over forced word-breaking that harms readability.
5. Do not change text, metadata, imagery, CTAs, routes, or behavior.
6. Render at `390 × 844` and verify the word fits inside its container.
7. Render at `1440 × 900` and verify the desktop composition is preserved.
8. Verify keyboard focus, mobile sign-in usability, gate redirects, and robots metadata.
9. Run static/build validation.
10. Update the visual-QA record and close Sprint 019B.

## Preferred Fix Shape

A narrow responsive typography adjustment on the existing `h1` is preferred. The implementation may use a smaller mobile size or fluid `clamp()` value while retaining the established desktop size at the `md` breakpoint.

Do not insert manual line-break markup unless responsive typography cannot satisfy acceptance cleanly. Do not use arbitrary horizontal clipping or hidden overflow to mask failure.

## Closeout

On successful acceptance:

- record Sprint 019B complete locally
- reset implementation authorization to `no`
- keep Sprint 020 as the next core sprint
- preserve the public under-construction gate

============================================================
FILE: planning/sprints/019B-mobile-heading-correction/acceptance.md
============================================================

# Sprint 019B - Mobile Heading Correction Acceptance

## Required Acceptance

- Sprint 019B is authorized before the source edit.
- Only approved files are modified.
- The heading remains exactly `Under Construction`.
- At `390 × 844`, the heading is fully visible with no clipped or truncated letters.
- At `390 × 844`, document horizontal overflow is absent.
- At `390 × 844`, heading, paragraph, and CTAs do not overlap.
- At `1440 × 900`, desktop hierarchy and horse-image composition remain intact.
- Operator sign-in retains a visible keyboard focus outline.
- Mobile `/sign-in` remains usable without horizontal overflow.
- `noindex/nofollow`, the supplied image, operator sign-in, and non-persistent interest treatment remain unchanged.
- `/home`, `/contact`, and `/shop` remain gated.
- No public reopening, content rewrite, architecture change, schema/auth/RLS/provider/Stripe/deployment work, dependency addition, commit, push, PR, or production mutation occurs.
- Visual evidence and exact viewport results are recorded.
- Required automated validation passes.
- State/status/briefing close Sprint 019B and reset authorization to `no`.

## Validation Matrix

| Check | Expected result |
|---|---|
| Mobile `/` at `390 × 844` | Complete heading; no overflow, clipping, overlap, or truncation |
| Desktop `/` at `1440 × 900` | Existing accepted composition preserved |
| Keyboard Tab on `/` | Visible data-blue focus outline on Operator sign-in |
| Mobile `/sign-in` | No horizontal overflow or clipped controls |
| `/home`, `/contact`, `/shop` | Existing redirects/gates preserved |
| Holding metadata/source | `noindex` and `nofollow` preserved |
| Sprint 019 validator | Pass |
| ESLint | Pass |
| TypeScript | Pass |
| Production build | Pass |
| `git diff --check` | Pass |

## Manual Intervention

If browser rendering is unavailable, record the exact blocker and do not close visual acceptance as passed. Provide the user with the required viewport and keyboard steps, then verify evidence after completion.

============================================================
FILE: planning/sprints/019B-mobile-heading-correction/handoff-prompt.md
============================================================

# Sprint 019B - Builder Handoff Prompt

You are Builder for Sprint 019B - Mobile Heading Correction.

Read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `docs/DESIGN_SYSTEM_BASELINE_019.md`
6. all Sprint 019B files
7. `app/page.tsx`

## Mission

Fix only the mobile clipping of `Under Construction`, prove it at `390 × 844`, preserve desktop at `1440 × 900`, verify focus/sign-in/gates/robots, document evidence, and close Sprint 019B.

## Guardrails

- Edit the holding-page heading classes only.
- Keep the text, image, descriptor, paragraph, CTAs, metadata, and routes unchanged.
- Prefer responsive type sizing over forced word-breaking.
- Stay inside the approved file set.
- Do not touch architecture, domain, auth, schema, providers, Stripe, deployment, or production.
- Do not commit, push, PR, or deploy.
- Reset authorization to `no` at close.

============================================================
FILE: planning/sprints/019B-mobile-heading-correction/BUILDER_START_INSTRUCTIONS.md
============================================================

# Sprint 019B Builder Start Instructions

Sprint 019B is applied and implementation is authorized in `planning/STATE.md`.

Implement only the mobile holding-page heading correction defined by the Sprint 019B files. Verify `390 × 844` and `1440 × 900`, keyboard focus, mobile sign-in, gates, and robots metadata. Document rendered evidence and close the sprint with authorization reset to `no`.

Stop before any file or behavior outside the approved scope.