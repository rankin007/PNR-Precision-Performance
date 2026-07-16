# Sprint 013 - Builder Handoff Prompt

You are Builder for Sprint 013 - Biochemistry Test Data Model in the Precision Performance project.

Read these first:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `planning/STATE.md`
4. `planning/sprints/013-biochemistry-test-data-model/requirements.md`
5. `planning/sprints/013-biochemistry-test-data-model/blueprint.md`
6. `planning/sprints/013-biochemistry-test-data-model/acceptance.md`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DEFINITION_OF_DONE.md`
9. relevant Supabase/auth/domain docs and migrations

## Mission

Build the source-controlled local data foundation for biochemistry tests, exact lookup losses, score snapshots, uploads, notes, access boundaries, soft-delete/audit, and pricing evidence.

Do not apply remote migrations or reopen the public shop.

## Guardrails

Do not use `calibrated` wording for pH.

Do not invent lookup behavior. Exact-match lookup only.

Do not invent formulas. Use only the formulas in the sprint requirements.

Do not apply migrations to remote Supabase.

Do not deploy.

Do not push or create a PR unless separately authorized.

Do not mutate production data, DNS, Vercel settings, Supabase settings, Stripe products/prices, charges, refunds, subscriptions, tax, or customer data.

Do not reopen public website/shop surfaces hidden by Sprint 012F.

Do not add OCR, voice-to-text provider integration, mobile capture UI, trend charts, or recommendation content.

Do not expose secret values or fragments.

## Suggested Execution

1. Record current branch, commit, and dirty status.
2. Read current schema/migration/auth/RLS patterns.
3. Copy/read the supplied `Reading Tables v1.csv` source and document table structure.
4. Design local schema/migration(s) for test records, readings, exact lookup losses, score snapshots, uploads, notes, assignments/access, and soft-delete/audit.
5. Document formulas, exact lookup policy, conductivity raw-to-C conversion, upload limits, and access rules.
6. Document shop-written pricing in `docs/PRICING_013.md` and mark older conflicting seed values as stale/conflicting evidence.
7. Regenerate Supabase bootstrap SQL if project workflow requires it.
8. Run validation.
9. Update planning/status/briefing.
10. Stop before remote migration, deployment, push, PR, or public shop reopening.

## Closeout Standard

At close, the next Architect should know:

- what schema/migration files were created
- where the reading table source is preserved
- how exact lookup losses are represented
- how scores are snapshotted
- how uploads are scoped and limited
- how vet/staff/trainer/admin access is modeled
- how soft delete/audit is modeled
- what pricing was recorded
- what remains blocked or deferred before Sprint 014/015
