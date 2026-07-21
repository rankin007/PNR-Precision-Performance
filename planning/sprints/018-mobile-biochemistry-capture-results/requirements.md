# Sprint 018 - Mobile Biochemistry Capture Results Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user requested Architect Pack 018 after Sprint 017 created the local repository baseline commit.

The last open roadmap decision was whether Sprint 018 should resume trends/history or shift to mobile capture/results UI. Architect chooses mobile biochemistry capture/results UI first because trends/history need reliable saved test records and result states to stand on.

Per the project hard rule, this Architect Pack is applied and implementation is authorized unless explicitly marked draft/planning-only. This pack is not draft.

## Questions And Answers

Q: What is Sprint 018 building?
A: A mobile-first local biochemistry test capture and result foundation for trainers/staff inside the authenticated operations area.

Q: Why not trends/history first?
A: Trends need captured biochemistry tests and result states. Capture/results is the next load-bearing layer after Sprints 013-015 and the Sprint 017 baseline.

Q: Is Sprint 018 allowed to apply the Sprint 013 Supabase migration remotely?
A: No. Remote Supabase migration remains a separate explicit operator action.

Q: Is Sprint 018 allowed to invent Green/Amber/Red thresholds?
A: No. If production thresholds are unavailable, zone output must show blocked/unavailable states from Sprint 015 behavior.

Q: Is Sprint 018 allowed to invent Table of Knowledge recommendation advice?
A: No. If approved recommendation content is unavailable, recommendation output must show blocked/unavailable states.

Q: Is Sprint 018 allowed to add uploads, OCR, or voice-to-text provider integration?
A: No. It may provide manual notes and UI placeholders/states only where useful, but provider/storage integration requires a later sprint.

Q: Is Sprint 018 allowed to deploy, push, PR, or reopen the public site/shop?
A: No.

## Goal

Create the trainer/staff mobile biochemistry capture and result foundation behind the authenticated operations area.

Sprint 018 should let an authorized operational writer:

- open a mobile-friendly biochemistry capture page
- select an assigned/accessible horse
- enter test date and AM/PM/unspecified time of day
- enter Carbs, pH Saliva, pH Urine, raw conductivity meter value, and Urea readings
- optionally enter manual notes/context
- submit the form through a server action
- score the readings using Sprint 014 exact-match scoring
- persist a biochemistry test locally through the Sprint 013 schema when Supabase and the local/remote schema are available
- display or route to a clear result state after submission
- show blocked/unscored states when exact lookup values are missing
- show zone/recommendation unavailable states when approved thresholds/content are missing
- remain usable as a structural preview when Supabase is not configured or the remote migration is not applied

## Dependency Gate

Sprint 018 may begin only if:

- Sprint 017 baseline commit is complete locally
- `planning/STATE.md` explicitly authorizes Sprint 018 implementation
- Sprint 013 data model docs/migration exist
- Sprint 014 scoring service and fixture validator exist
- Sprint 015 recommendation/zone scaffold and fixture validator exist

Builder must stop and record a blocker if:

- the baseline commit is missing
- biochemistry domain scoring helpers are missing
- exact lookup behavior is changed or unavailable
- the task would require remote migration, deployment, public reopening, push, PR, Stripe changes, secret exposure, or invented domain content

## In Scope

Builder may:

- add a new authenticated operations route such as `/data-entry/biochemistry`
- add a detail/result route if needed, such as `/data-entry/biochemistry/[testId]`
- add server actions for biochemistry submission and result retrieval
- use existing auth/ops guards and assigned-horse access patterns
- query `biochemistry_lookup_values` when Supabase/schema are available
- use `scoreBiochemistryReadings` for scoring
- use Sprint 015 zone/recommendation helpers only with supplied thresholds/rules; otherwise show unavailable/blocked states
- persist into `biochemistry_tests` and `biochemistry_test_notes` when the schema exists and access allows it
- show non-sensitive error states for missing Supabase config, missing migration/table, inaccessible horse, missing fields, invalid numbers, missing lookup rows, and save failures
- add focused UI components under `components/ops/**`
- update navigation so authorized users can reach the biochemistry capture page
- create docs for Sprint 018 behavior and manual intervention items
- add focused validation/smoke scripts if useful
- update planning closeout files

## Out Of Scope

Builder must not:

- apply remote Supabase migrations
- mutate production data
- deploy to Vercel
- push to remote
- create a PR
- reopen public website/shop surfaces
- change Stripe products, pricing, checkout, refunds, subscriptions, tax, or customer data
- invent production Green/Amber/Red thresholds
- invent Table of Knowledge recommendation advice
- add OCR/photo recognition
- add voice-to-text provider integration
- add upload storage buckets or storage policies
- add trend charts/history/favorites
- implement owner/vet result dashboards
- change auth/RLS policies unless a local-only source-controlled correction is strictly required and separately documented
- expose secret values or fragments
- stage `.release-main/`, `.claude/`, `samples/`, or local env files

## Approved File Set

Builder may edit:

- `app/(ops)/data-entry/**`
- `components/ops/**`
- `lib/domain/biochemistry.ts`, only for narrow UI/server-action helper types or validation helpers that preserve existing scoring behavior
- `lib/domain/horses.ts`, only if a narrow existing accessible-horse helper extension is required
- `lib/navigation.ts`
- `docs/**`
- `planning/**`
- `scripts/**`, only for focused Sprint 018 validation/smoke helpers

Builder may inspect but should avoid editing unless clearly required by acceptance:

- `lib/auth/**`
- `lib/supabase/**`
- `supabase/migrations/**`
- `supabase/bootstrap/remote-init.sql`
- package files

Builder must stop before editing:

- real env files or secrets
- production deployment config
- Stripe runtime behavior
- public site/shop reopening logic
- remote Supabase state

## Data And Behavior Rules

Builder must preserve these domain rules:

- pH wording uses pH Saliva, pH Urine, and pH Average only.
- Conductivity raw meter value converts to C with multiplier `1.43`.
- Salts lookup uses converted C value.
- Exact lookup only; no rounding, interpolation, nearest, next-lower, fallback, or defaults.
- Missing lookup rows return blocked/unscored results.
- Hydration Score and Health Score formulas remain Sprint 014 formulas.
- Production zones require supplied thresholds.
- Trainer-facing recommendations require active supplied approved rules.
- No fixture-only threshold or recommendation content may be presented as production truth.

## Required Output

Builder must produce or update:

- mobile biochemistry capture UI
- server action / result flow for local biochemistry submission
- clear blocked/unavailable result states
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`
- planning closeout files: `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if durable decisions/risks/questions change

## Validation

Builder must run:

- biochemistry scoring fixture validator
- biochemistry recommendation fixture validator
- any Sprint 018 focused validation/smoke created
- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm run build` through the known working path
- route smoke for new capture/result routes where feasible
- `git status --short` at close

If remote Supabase schema is unavailable, Builder must document the blocked live-submit path and keep local/source validation green.

## Commit Rule

Do not commit unless separately requested by the user in this sprint. Sprint 018 implementation authorization allows source edits inside the approved scope, not an automatic commit.

## Manual Intervention Rule

Whenever something required for this sprint does not work, is blocked, or needs user/manual input, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete

Expected manual/future items include remote Supabase migration, production thresholds, approved recommendation content, upload storage, and voice-to-text provider selection.
