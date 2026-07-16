# Sprint 013 - Builder Start Instructions

You are Builder for Sprint 013 - Biochemistry Test Data Model.

Start from the approved sprint files, not from chat memory:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/013-biochemistry-test-data-model/requirements.md`
5. `planning/sprints/013-biochemistry-test-data-model/blueprint.md`
6. `planning/sprints/013-biochemistry-test-data-model/acceptance.md`
7. `planning/sprints/013-biochemistry-test-data-model/handoff-prompt.md`
8. `planning/ARCHITECT_BRIEFING.md`
9. `planning/DEFINITION_OF_DONE.md`

## First Action

Confirm the current branch, commit, and dirty status. Do not revert unrelated changes.

Then preserve/read the supplied source table:

`C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\PNR and RJR EPP Working Information\Reading Tables v1.csv`

If sandbox access blocks that file, request read-only approval. Do not proceed by guessing the table values.

## Build Scope

Create the local source-controlled data foundation for:

- horse/date biochemistry test records
- exact reading-to-loss lookup tables for Carbs, pH Average, Salts, and Urea
- score snapshots for Hydration Score and Health Score
- raw conductivity and converted `C` value using multiplier `1.43`
- uploads scoped to horse/test context with 2 MB limit
- notes
- vet/staff/trainer/admin access boundaries
- admin/trainer-only soft delete with audit
- pricing documentation from the shop-written values

## Non-Negotiables

- Do not use `calibrated` wording for pH.
- Do not invent lookup fallback behavior. Exact match only.
- Do not invent formulas.
- Do not apply remote Supabase migrations.
- Do not deploy.
- Do not push or create a PR.
- Do not reopen the public shop or website.
- Do not mutate production data, Stripe, Vercel, DNS, or Supabase settings.

## Required Docs

Create or update:

- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `docs/PRICING_013.md`

Pricing to carry forward:

- Professional Kit: `$4,500` one-off plus Postage
- Monthly Service: `$120 per horse or P.O.A`, unlimited testing

Document older conflicting product seed values as stale/conflicting evidence, not authority.

## Validation

Run and record:

- `npm run db:bundle` if migrations change
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox build fails for known sandbox reasons, request approved outside-sandbox bounded validation and record both outcomes.

## Closeout

At close, update:

- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- relevant decisions/risks/questions if new evidence appears

Final status must be one of:

- complete
- partial with documented blockers
- blocked with manual intervention instructions
