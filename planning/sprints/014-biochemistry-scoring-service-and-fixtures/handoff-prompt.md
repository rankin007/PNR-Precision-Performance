# Sprint 014 - Builder Handoff Prompt

You are Builder for Sprint 014 - Biochemistry Scoring Service And Fixtures in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/requirements.md`
5. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/blueprint.md`
6. `planning/sprints/014-biochemistry-scoring-service-and-fixtures/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DEFINITION_OF_DONE.md`
9. Sprint 013 closeout docs, migrations, lookup evidence, and preserved Reading Tables source

## Mission

Build the local scoring foundation for biochemistry tests using exact lookup values and approved formulas.

Do not build UI. Do not deploy. Do not apply remote migrations. Do not copy the old website wholesale.

## First Gate

Before implementation, prove Sprint 013 created enough evidence for scoring:

- preserved Reading Tables source exists or exact source-access blocker is documented
- lookup structures for Carbs, pH Average, Salts, and Urea are available
- score snapshot shape is documented
- formula and conductivity rules are documented

If this is not true, stop and record the blocker.

## Guardrails

Do not use `calibrated` wording for pH.

Do not invent lookup behavior. Exact-match lookup only.

Do not invent formulas. Use only:

- `pH Average = (pH Saliva + pH Urine) / 2`
- `Conductivity C = raw meter reading * 1.43`
- `Hydration Score Energy Loss = (Carbs Loss + Salts Loss) / 2`
- `Hydration Score = 1 - Hydration Score Energy Loss`
- `Health Score Energy Loss = (Carbs Loss + pH Average Loss + Salts Loss + Urea Loss) / 4`
- `Health Score = 1 - Health Score Energy Loss`

Do not apply migrations to remote Supabase.

Do not deploy.

Do not push or create a PR unless separately authorized.

Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

Do not reopen public website/shop surfaces hidden by Sprint 012F.

Do not add mobile capture UI, uploads UI, storage policies, OCR, voice-to-text, trend charts, or recommendation content.

Do not expose secret values or fragments.

## Suggested Execution

1. Record current branch, commit, and dirty status.
2. Read Sprint 013 scoring/data-model evidence.
3. Inspect the preserved Reading Tables source and lookup representation.
4. Design a small scoring module and result type.
5. Implement exact lookup, pH Average, conductivity conversion, score formulas, and blocked/unscored result handling.
6. Add fixture-backed examples or validation.
7. Create `docs/BIOCHEMISTRY_SCORING_014.md`.
8. Run validation.
9. Update planning/status/briefing.
10. Stop before UI, remote migration, deployment, push, PR, public relaunch, or recommendation content work.

## Closeout Standard

At close, the next Architect should know:

- what scoring module/files were created
- which lookup source/version was used
- how exact lookup is performed
- how missing lookup values block scoring
- how conductivity conversion is represented
- how formula version and score snapshots are represented
- what fixtures were validated
- what remains blocked before Sprint 015 mobile capture
