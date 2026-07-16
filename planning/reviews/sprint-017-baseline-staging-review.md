# Sprint 017 Baseline Staging Review

Captured: 2026-07-17

## Authorization

`planning/STATE.md` authorized Sprint 017 implementation before Builder changed the Git index, staged files, or prepared closeout docs.

## Starting State

| Item | Value |
|---|---|
| Branch | `develop` |
| Starting HEAD | `8bf310a` |
| Sprint 016 inventory | `planning/reviews/sprint-016-working-tree-inventory.md` |
| Sprint 016 alignment doc | `docs/REPOSITORY_ALIGNMENT_016.md` |

The current working tree matched the Sprint 016 inventory shape: accepted sprint work, tracked production-adjacent env risk, deleted root handoff files, deleted `middleware.ts`, and excluded `.release-main/`, `.claude/`, and `samples/` groups.

## Accepted For Baseline

- Accepted sprint work classified as `keep-sprint-work` by Sprint 016.
- Planning, docs, references, fixtures, scripts, templates, method files, and local migrations from Sprints 001-016.
- `.env.vercel.production` Git tracking removal only; local file preserved and values not exposed.
- Deleted root `ORCHESTRATOR*` files after archive evidence was verified.
- Deleted root `middleware.ts` after source inspection, build, and route-safety smoke passed.

## Excluded From Baseline

- `.release-main/**`
- `.claude/**`
- `samples/**`
- ignored generated output such as `.next/**` and `.validation-logs/**`
- dependency folders
- local `.env.vercel.production` values

## Gate Evidence

### Env Gate

- `.env.vercel.production` exists locally.
- `.env.vercel.production` is ignored by `.gitignore`.
- Git index carries only the tracking deletion, not file values.

### Root Handoff Gate

Archived copies exist in `references/archive/sprint-012e-repository-cleanup/root-handoff/` for:

- `ORCHESTRATOR-export.docx`
- `ORCHESTRATOR.docx`
- `ORCHESTRATOR.md`

### Route-Safety Gate

Built production server smoke passed for:

- public under-construction page
- `/home`, `/contact`, `/shop`, and product redirect behavior
- checkout under-construction redirect
- auth callback reachability
- Stripe webhook route reachability
- health/setup-status route reachability

## Validation Evidence

Passed:

- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts`
- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts`
- `npm run lint`
- `npx tsc --noEmit --incremental false`
- `npm run build` through outside-sandbox fallback after clean generated-output regeneration
- local production route-safety smoke

Pending immediately before commit:

- `git diff --check`
- staged-file review confirming excluded folders and env values are not staged

## Commit Rule

Builder may create one local baseline commit only after final staged-file review and `git diff --check` pass.

No push, PR, deployment, remote migration, production mutation, Stripe change, DNS/Vercel/Supabase setting change, or public reopening is authorized.
