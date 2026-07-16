# Sprint 015 - Builder Handoff Prompt

You are Builder for Sprint 015 - Scoring And Recommendation Engine in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/015-scoring-and-recommendation-engine/requirements.md`
5. `planning/sprints/015-scoring-and-recommendation-engine/blueprint.md`
6. `planning/sprints/015-scoring-and-recommendation-engine/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DEFINITION_OF_DONE.md`
9. Sprint 013/014 closeout docs, scoring fixtures, and domain code

## Mission

Build the local scoring-output and recommendation-engine scaffold using Sprint 014 scoring results.

Do not build UI. Do not deploy. Do not apply remote migrations. Do not invent recommendation content or zone thresholds.

## First Gate

Before implementation, prove Sprint 014 created enough evidence for this work:

- exact-match scoring service exists
- scored and blocked result shapes are available
- score snapshot fields are documented
- blocked/unscored behavior is documented
- Sprint 013 data model evidence exists

If this is not true, stop and record the blocker.

## Guardrails

Do not invent thresholds.

Do not invent Table of Knowledge content.

Do not change Sprint 014 scoring formulas or exact lookup behavior.

Do not apply migrations to remote Supabase.

Do not deploy.

Do not push or create a PR unless separately authorized.

Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

Do not reopen public website/shop surfaces hidden by Sprint 012F.

Do not add mobile capture UI, results UI, upload UI, storage policies, OCR, voice-to-text, trend charts, or public website work.

Do not expose secret values or fragments.

## Suggested Execution

1. Record current branch, commit, and dirty status.
2. Read Sprint 013/014 scoring/data-model evidence.
3. Inspect whether approved zone thresholds or Table of Knowledge content exist.
4. Design a small local domain API for zones and recommendation snapshots.
5. Implement classification only from supplied thresholds; otherwise block/unclassify.
6. Implement recommendation generation only from active supplied rules; otherwise block/unavailable.
7. Add fixture-backed examples or validation.
8. Create `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`.
9. Run validation.
10. Update planning/status/briefing.
11. Stop before UI, remote migration, deployment, push, PR, public relaunch, Stripe, or recommendation-content invention.

## Closeout Standard

At close, the next Architect should know:

- what zone/recommendation modules or migration scaffolds were created
- how thresholds are represented
- how missing thresholds block classification
- how recommendation rules are represented
- how missing approved content blocks recommendation output
- what fixtures were validated
- what remains blocked before trainer-facing result UI
