# Architect Briefing

## Where Things Stand

Sprint 002B is complete locally. The repository has a clean post-017F baseline, one canonical credential-free validation system for developers and CI, concise current planning records, preserved history, and a navigational evidence index.

Supabase authenticated proof remains provider-blocked after Sprint 021M. Local/static and structural evidence must not be described as authenticated, hosted-runtime, cutover, or production readiness.

## What 002B Delivered

- Eight stable package commands for JSON, domain, roles, Supabase self-tests, static validators, TypeScript, CI, and local validation.
- A dependency-free, allowlisted Node orchestrator with cross-platform PowerShell choice, fail-fast reporting, remote-harness exclusion, and bounded local build retry.
- CI pinned to Node 22.14.0 with read-only contents permission, timeout, npm cache, and `npm run validate:ci`.
- Concise state, briefing, questions, risks, and schedule; exact pre-consolidation records archived under `planning/history/`.
- `planning/EVIDENCE_INDEX.md` connecting current authority to canonical local, hosted, provider-pending, and historical evidence.

## Architecture / File Map

- `scripts/run-validation-suite.mjs`: allowlisted validation plans and execution.
- `scripts/test-run-validation-suite.mjs`: orchestration safety and retry tests.
- `scripts/validate-json-files.mjs`: deterministic JSON parsing.
- `package.json`: canonical developer/CI interface.
- `.github/workflows/ci.yml`: credential-free CI entry point.
- `docs/VALIDATION.md`: operator/developer command guide.
- `planning/STATE.md`: present operational truth.
- `planning/EVIDENCE_INDEX.md`: evidence navigation.
- `planning/history/`: superseded records through Sprint 017F.

## Validated Capabilities

Local checks cover JSON, biochemistry scoring/recommendation fixtures, focused role/comment logic, credential-free Supabase harness safety, static Sprint 019–021 contracts, lint, TypeScript, and production build. The under-construction public gate and current application routes remain unchanged.

## Blockers And Risks

- Blocking authenticated proof: pending Supabase response/remediation.
- Product inputs still required: thresholds, terminology, device/pH rules, recommendation content, commerce terms.
- Architecture decisions still required before uploads/privacy/storage and voice transcription.
- Remote backup/push has not occurred; local commits are not off-device recovery.

## Next Architect Action

Prepare Sprint 022 as one useful local product outcome: complete and test the mobile biochemistry workflow without crossing upload, voice-provider, schema, auth/RLS, remote, or production boundaries unless separately justified.

If Supabase responds first, prepare Sprint 021N to classify the response and run only the provider-supported minimal Auth-chain reproof from zero state. Do not resume the full role matrix until two minimal passes succeed.
