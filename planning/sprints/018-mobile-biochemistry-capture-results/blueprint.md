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
