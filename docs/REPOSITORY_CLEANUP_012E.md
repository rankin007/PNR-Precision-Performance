# Sprint 012E Repository Cleanup

Sprint 012E performed an archive-first cleanup before Sprint 013 data-model work.

## Summary

The active repository root was reduced by moving low-risk, non-runtime clutter into `references/archive/sprint-012e-repository-cleanup/`.

Archived categories:

- superseded root handoff files: `ORCHESTRATOR*`, `architect-chat-starter-prompt.md`, `project-start.md`
- generated/cache output: `tsconfig.tsbuildinfo` archived; `build/` inspected and left ignored after validation showed archived generated TypeScript would affect type checking
- local logs: `.logs/`, `.validation-logs/`
- OS metadata: `desktop.ini`
- empty duplicate root client-docs folder: `PNR and RJR EPP Working Information/`

## Not Changed

No runtime source files were moved or edited. The sprint did not change:

- `app/**`
- `components/**`
- `lib/**`
- `supabase/**`
- `scripts/**`
- `.env*`
- deployment settings or Vercel/Supabase/Stripe production state

## Deferred / Needs User Decision

| Path | Reason |
|---|---|
| `.release-main/` | Contains duplicated runtime source and nested Git metadata. Sprint 012E allowed inspection only unless clearly safe; this remains a user decision. |
| `.claude/` | Tooling folder; non-runtime-looking but not proven stale. |
| `samples/` | Sample material; non-runtime-looking but may be useful for future method work. |
| `.next/` | Generated cache/output. Left ignored because validation can recreate it immediately. |
| `build/` | Generated output. Initial archive move was reversed because stale generated `.ts` files under `references/` affected TypeScript validation; root `build/` remains ignored/excluded. |

## Gitignore Update

Added ignore rules for:

- `.logs/`
- `desktop.ini`

Existing ignore rules already covered `build`, `.next`, `*.tsbuildinfo`, `.validation-logs/`, `.vercel`, and env files.

## Validation Plan

Sprint 012E validation runs after cleanup:

- route/source inventory confirmation
- `npm run lint` through the bounded wrapper
- `npx tsc --noEmit --incremental false` through the bounded wrapper
- `npm run build` through the bounded wrapper

## Outcome

Validation results:

| Check | Result |
|---|---|
| `npm run lint` | `exited 0`; log stamp `20260715-080334-419` |
| `npx tsc --noEmit --incremental false` | `exited 0`; log stamp `20260715-080427-904` |
| `npm run build` in restricted sandbox | Timed out at known Next startup banner; log stamp `20260715-080433-509` |
| `npm run build` outside restricted sandbox | `exited 0`; log stamp `20260715-080747-945`; 25 app routes including `/admin/commerce` |

Sprint 012E status: complete. Sprint 013 may proceed from the cleaned project surface, with deferred cleanup candidates kept visible for user/Architect decision.
