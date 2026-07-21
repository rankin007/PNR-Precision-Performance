============================================================
FILE: planning/sprints/018-mobile-biochemistry-capture-results/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/018-mobile-biochemistry-capture-results/blueprint.md
============================================================

# Sprint 018 - Mobile Biochemistry Capture Results Blueprint

## Intent

Sprint 018 creates the first trainer-facing biochemistry capture/results surface behind the authenticated operations area. It should connect the local foundations from Sprints 013-015 to a real mobile-first workflow without crossing into remote production changes or invented domain content.

## Execution Plan

1. Read required files:
   - `templates/method/120x-agent-identity.md`
   - `AGENTS.md`
   - `planning/STATE.md`
   - `planning/ARCHITECT_BRIEFING.md`
   - Sprint 018 requirements, blueprint, acceptance, and handoff
   - `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
   - `docs/BIOCHEMISTRY_SCORING_014.md`
   - `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`
   - `lib/domain/biochemistry.ts`
   - `supabase/migrations/0009_biochemistry_test_data_model.sql`
2. Confirm Sprint 018 implementation authorization.
3. Inspect existing operations/data-entry patterns and navigation.
4. Design the smallest mobile-first capture route and result flow.
5. Implement form validation for required fields and numeric readings.
6. Fetch exact lookup rows from Supabase when available; otherwise keep a structural preview/error state.
7. Use Sprint 014 scoring service exactly.
8. Persist scored or blocked results to `biochemistry_tests` when schema is available.
9. Persist manual notes to `biochemistry_test_notes` when provided and schema is available.
10. Show result state with raw/derived readings, score or blocked status, and unavailable zones/recommendations when thresholds/content are absent.
11. Update docs and planning.
12. Run validation and route smoke.

## UX Shape

The capture UI should be compact and mobile-first:

- horse selector near the top
- date and time of day controls
- numeric inputs grouped as test readings
- raw conductivity input with clear converted C preview or post-submit display
- optional manual notes/context area
- submit button visible without excessive scrolling
- clear success/error/blocker panels
- no marketing copy or public landing page behavior

Use existing design patterns where possible. Do not redesign the app shell.

## Server Action Shape

A reasonable server action can:

- require operational write context
- reject missing/invalid required fields
- verify horse accessibility through existing patterns
- fetch lookup rows from `biochemistry_lookup_values`
- call `scoreBiochemistryReadings`
- insert into `biochemistry_tests` with scored or blocked snapshot fields
- insert note row only after a test row exists
- redirect to a result page or back to the capture page with a status query

If the remote schema is not applied, catch table/schema errors and return a non-sensitive `biochemistry-schema-unavailable` state.

## Result State Shape

The result should show:

- horse/date/time
- pH Average
- converted conductivity C value
- Hydration Score and Health Score when scored
- missing lookup blockers when blocked
- zone unavailable/blocked state when production thresholds are missing
- recommendation unavailable/blocked state when active approved rules are missing
- source/formula version where useful

Do not show fixture-only threshold values or fixture recommendation text as production output.

## Navigation

Add a clear operations navigation item for biochemistry capture if the existing navigation supports it. Keep labels concise, for example `Biochemistry`.

## Documentation

`docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md` should include:

- implemented routes
- field list and validation rules
- scoring relationship to Sprint 014
- storage relationship to Sprint 013 migration
- blocked/unavailable result behavior
- remote migration blocker instructions
- threshold/content blocker instructions
- validation results

## Closeout Planning

At close, `planning/STATE.md` should return to `Implementation authorized: no`.

The next recommended sprint should be either:

- Sprint 019 - Remote Supabase Biochemistry Migration And Live Smoke, if the user/operator is ready for remote schema work; or
- Sprint 019 - Trends History And Saved Chart Foundation, if local-only feature work should continue.

============================================================
FILE: planning/sprints/018-mobile-biochemistry-capture-results/acceptance.md
============================================================

# Sprint 018 - Mobile Biochemistry Capture Results Acceptance

## Required Acceptance Criteria

- `planning/STATE.md` authorizes Sprint 018 before Builder edits source files.
- Builder reads Sprint 018 sprint files and Sprint 013-015 biochemistry docs/code.
- A mobile-friendly authenticated operations route exists for biochemistry capture.
- Authorized operational writers can access the route through existing operations auth guards.
- The form includes horse, test date, time of day, Carbs, pH Saliva, pH Urine, raw conductivity meter value, Urea, and optional notes/context.
- Required fields are validated before scoring/persistence.
- Invalid numeric values produce non-sensitive user-facing error states.
- Scoring uses `scoreBiochemistryReadings` and does not duplicate or alter formulas.
- Exact lookup remains exact only.
- Missing exact lookup rows produce blocked/unscored result states.
- Conductivity conversion uses the Sprint 014 `1.43` multiplier.
- pH Average is shown or persisted as `(pH Saliva + pH Urine) / 2`.
- Persisted test fields match the Sprint 013 schema when Supabase/schema are available.
- If Supabase is not configured or the biochemistry schema is unavailable, the UI shows a clear blocked/preview state rather than crashing.
- Zones remain unavailable/blocked unless supplied production thresholds exist.
- Recommendations remain unavailable/blocked unless active approved rules exist.
- No fixture-only thresholds or recommendation text are surfaced as production content.
- No uploads, OCR, voice-to-text provider integration, trends, deployment, push, PR, remote migration, Stripe change, production mutation, or public reopening occurs.
- Sprint 018 documentation and planning closeout are updated.
- Required validation passes or blockers are documented with manual-intervention steps.

## Route Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Anonymous user | Existing ops auth guard redirects/denies according to current auth behavior. |
| Authorized trainer/staff/admin writer | Can open capture route. |
| Supabase not configured | Structural preview or clear blocked state; no crash. |
| Supabase configured but migration missing | Clear schema unavailable state; no raw database error exposure. |
| Horse inaccessible | Submission is rejected with non-sensitive error. |
| Exact lookup missing | Result is blocked/unscored with missing lookup details. |
| Thresholds missing | Zone is unavailable/blocked, not guessed. |
| Recommendation content missing | Recommendation is unavailable/blocked, not invented. |

## Validation Acceptance

Required validation:

- scoring fixture validator passes
- recommendation fixture validator passes
- lint passes
- TypeScript passes
- build passes
- route smoke covers the new route where feasible
- `git status --short` is recorded at close

If build or smoke needs the known outside-sandbox path, document both the sandbox limitation and successful fallback.

## Manual Intervention Record

Manual intervention entries must include:

- blocked item
- evidence checked
- exact user/operator action needed
- step-by-step action instructions
- Builder verification after completion

Expected manual/future items:

- apply Sprint 013 remote Supabase migration
- provide production Green/Amber/Red thresholds
- provide approved Table of Knowledge rules
- approve upload storage/provider work
- approve voice-to-text provider/fallback behavior

============================================================
FILE: planning/sprints/018-mobile-biochemistry-capture-results/handoff-prompt.md
============================================================

# Sprint 018 - Builder Handoff Prompt

You are Builder for Sprint 018 - Mobile Biochemistry Capture Results in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/018-mobile-biochemistry-capture-results/requirements.md`
6. `planning/sprints/018-mobile-biochemistry-capture-results/blueprint.md`
7. `planning/sprints/018-mobile-biochemistry-capture-results/acceptance.md`
8. `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
9. `docs/BIOCHEMISTRY_SCORING_014.md`
10. `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`
11. `lib/domain/biochemistry.ts`
12. existing `/data-entry` pages/actions/navigation

## Mission

Build the first mobile-first authenticated biochemistry capture/results workflow using the local Sprint 013-015 foundations.

## Guardrails

Do not apply remote Supabase migrations.

Do not deploy.

Do not push or create a PR.

Do not commit unless separately asked.

Do not mutate production data.

Do not reopen public website/shop surfaces.

Do not invent production thresholds.

Do not invent recommendation advice.

Do not add uploads, OCR, voice-to-text provider integration, trends, or public website work.

Do not expose secret values or fragments.

## Required Work

1. Confirm Sprint 018 authorization.
2. Inspect existing operations/data-entry patterns.
3. Add mobile biochemistry capture route and navigation.
4. Add server action/result flow using Sprint 014 scoring.
5. Persist to Sprint 013 local schema when available; block gracefully when unavailable.
6. Show blocked/unavailable states for missing exact lookups, thresholds, or recommendation content.
7. Document behavior in `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`.
8. Run validation.
9. Close planning with authorization off.

## Closeout Standard

At close, the next Architect should know:

- routes and files added
- how scoring and blocked results work
- whether persistence works locally/source-wise
- what remains blocked by remote migration
- what remains blocked by thresholds/content
- validation results
- recommended next sprint

============================================================
FILE: planning/sprints/018-mobile-biochemistry-capture-results/BUILDER_START_INSTRUCTIONS.md
============================================================

# Sprint 018 - Builder Start Instructions

You are Builder for Sprint 018 - Mobile Biochemistry Capture Results.

Start from the applied sprint files, not chat memory.

Read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/ARCHITECT_BRIEFING.md`
5. `planning/sprints/018-mobile-biochemistry-capture-results/requirements.md`
6. `planning/sprints/018-mobile-biochemistry-capture-results/blueprint.md`
7. `planning/sprints/018-mobile-biochemistry-capture-results/acceptance.md`
8. `planning/sprints/018-mobile-biochemistry-capture-results/handoff-prompt.md`

## Start Gate

`planning/STATE.md` must say `Implementation authorized: yes` for Sprint 018.

## Build Scope

Build authenticated mobile biochemistry capture/results foundation only.

## Stop Conditions

Stop before remote migration, deployment, push, PR, production mutation, public reopening, secret exposure, uploads/OCR/voice provider integration, trends, invented thresholds, or invented recommendation content.

## Closeout

Close with docs, validation, planning updates, and `Implementation authorized: no`.
