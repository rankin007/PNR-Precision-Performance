# Sprint 012E - Repository Cleanup And Archive Baseline Blueprint

## Execution Shape

Sprint 012E is a reversible cleanup sprint. It prepares the project for Sprint 013 without changing application behavior.

Run the work in this order:

1. Establish current branch, commit, and dirty status.
2. Read current planning state, briefing, risks, questions, sprint schedule, and Sprint 012D evidence.
3. Inventory cleanup candidates.
4. Classify each candidate as keep, archive, ignore, or needs-user-decision.
5. Archive only low-risk approved candidates.
6. Write a cleanup manifest and evidence doc.
7. Validate that route/source behavior is unchanged.
8. Update planning docs and stop.

## Candidate Inventory

Use non-destructive inspection first:

- `git status --short`
- `git ls-files`
- `Get-ChildItem -Force`
- `rg --files`
- targeted directory listings for `.release-main/`, generated output, logs, references, docs, and planning

Candidate classes:

| Class | Treatment |
|---|---|
| Active canonical files | Keep |
| Generated/log/cache artifacts | Ignore or archive if already present as meaningful evidence |
| Superseded planning/handoff files | Archive with manifest entry |
| Legacy release snapshots | Defer unless clearly documented as non-runtime |
| Runtime app/source files | Inspect only |
| Secret-bearing files | Do not archive; names/presence only |
| Ambiguous files | Defer and ask/user-decision list |

## Archive Path

Use:

`references/archive/sprint-012e-repository-cleanup/`

Required manifest:

`references/archive/sprint-012e-repository-cleanup/MANIFEST.md`

Manifest entries must include:

- original path
- archived path
- classification
- reason
- whether tracked by git before move, if known
- validation or inspection note

## Cleanup Boundaries

Archive-first means move, do not delete.

If a move might affect runtime behavior, do not move it in this sprint.

Do not move:

- `app/**`
- `components/**`
- `lib/**`
- `supabase/**`
- `scripts/**`
- root config files
- package files
- `.env*`
- `.vercel/**`

Exceptions require explicit user approval before action.

## Recommended High-Value Checks

Builder should specifically inspect and classify:

- `.release-main/`
- old validation log locations
- `.validation-logs/`
- stale archive paths from Sprint 001
- duplicate starter/handoff files at repo root
- generated build output accidentally present in the workspace
- OneDrive metadata such as `desktop.ini`
- temp reconstruction notes or artifacts that do not belong in active source

## Validation

Required:

- `git status --short` before and after cleanup
- source route inventory before and after cleanup, if feasible
- confirm no `.env*` or secret-bearing files were archived
- confirm no production runtime files changed
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If restricted sandbox validation fails for known sandbox/log/build reasons, request approval for the bounded outside-sandbox validation path and record both outcomes.

Optional lightweight smoke if a local server is already available or can be started safely:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- anonymous protected-route redirect check

## Documentation

Create:

- `docs/REPOSITORY_CLEANUP_012E.md`
- `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`

Update:

- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

## Stop Conditions

Stop and ask before:

- deleting anything
- moving runtime source
- moving secrets or `.env*`
- changing schema/auth/RLS/Stripe/checkout/webhook behavior
- changing deployment config in a way that affects production
- resolving ambiguous candidates by assumption
- pushing, PR creation, or deployment

If uncertain, classify the item as `needs-user-decision` and leave it in place.
