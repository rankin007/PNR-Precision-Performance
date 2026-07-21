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
