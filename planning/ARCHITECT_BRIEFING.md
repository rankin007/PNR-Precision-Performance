# Architect Briefing

## Where Things Stand

Sprint 017 is complete locally as a baseline commit approval sprint. The public site remains hidden behind the Sprint 012F under-construction gate, and public shop/checkout surfaces remain blocked.

Sprint 017 resolved the Sprint 016 baseline review items without exposing secrets: `.env.vercel.production` was removed from Git tracking while preserved locally, deleted root `ORCHESTRATOR*` files were accepted against archive evidence, and deleted `middleware.ts` was accepted after route-safety validation.

## Current Status

Latest completed sprint: Sprint 017 - Baseline Commit Approval.

Workflow profile: `strict`.

Implementation authorization: no. New cleanup, commit, feature, deployment, migration, production, push, PR, Stripe, public reopening, or remote work requires an approved next sprint/state update.

## Since Last Sprint

Builder created `docs/BASELINE_COMMIT_017.md` and `planning/reviews/sprint-017-baseline-staging-review.md`.

Builder validated and staged the accepted baseline set for a local commit only. `.release-main/`, `.claude/`, `samples/`, generated output, dependency folders, and local env values remain excluded.

## Architecture / File Map

- `docs/BASELINE_COMMIT_017.md`: baseline gate evidence, validation summary, exclusions, and future manual items.
- `planning/reviews/sprint-017-baseline-staging-review.md`: staging review and accepted/excluded baseline scope.
- `planning/reviews/sprint-016-working-tree-inventory.md`: source-backed dirty-tree classification that Sprint 017 resolved.
- `docs/REPOSITORY_ALIGNMENT_016.md`: repository alignment context that led to Sprint 017.
- `planning/STATE.md`: records Sprint 017 complete and implementation authorization off.

## Decisions

- `.env.vercel.production` should remain local/ignored and untracked; do not recommit production env values.
- Root `ORCHESTRATOR*` files are no longer the root source of truth because archived copies exist and the 120x planning layer is canonical.
- The under-construction route gate remains page/API based rather than root middleware based.
- The Sprint 017 baseline is local only; no push, PR, deployment, remote migration, production mutation, Stripe change, or public reopening was performed.

## Risks / Watch-Items

- `.release-main/` remains a large runtime-reference snapshot and should not be archived/deleted without explicit user decision.
- `.claude/` and `samples/` remain user/tool-preference items outside the baseline.
- Production thresholds and Table of Knowledge content remain unsupplied.
- Remote Supabase migration and live Supabase/RLS/Stripe smoke remain unresolved.

## Open Questions For The Architect

- Should Sprint 018 resume trends/history or shift to mobile capture/results UI?
- Who will provide production Green/Amber/Red thresholds?
- Who will provide approved Table of Knowledge recommendation content?
- When should the Sprint 013 Supabase migration be applied remotely through an explicitly authorized safe path?

## Validation / Test Status

Validation performed:

- `.env.vercel.production` local existence and ignore status check
- root `ORCHESTRATOR*` archive evidence check
- route-safety smoke on a built local production server
- biochemistry scoring fixture validator
- biochemistry recommendation fixture validator
- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm run build` outside the restricted sandbox after removing ignored stale `.next` output
- final Git whitespace/staging checks before commit

The dev-server smoke path hit a generated-output/sandbox issue, so Builder used the production build/start smoke path after successful build.

## Recommended Next Architect Action

Plan Sprint 018 from the now-baselined local repository. Recommended feature choices are trends/history or mobile capture/results UI, but production thresholds and Table of Knowledge content remain required before trainer-facing production scoring/recommendations.
