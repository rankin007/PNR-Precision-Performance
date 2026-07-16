# Sprint 017 - Baseline Commit Approval

## Status

Sprint 017 resolved the manual-review items from Sprint 016 and prepared a safe local repository baseline.

This sprint did not push, create a PR, deploy, apply remote Supabase migrations, mutate production data, change Stripe, change DNS/Vercel/Supabase settings, reopen public website/shop surfaces, or add product features.

## Branch And Commit

| Item | Value |
|---|---|
| Branch | `develop` |
| Starting HEAD | `8bf310a` |
| Commit subject | `chore: establish sprint 017 repository baseline` |
| Commit hash | See `git rev-parse HEAD` after the local baseline commit; a commit cannot safely contain its own final hash. |

## Env Safety

`.env.vercel.production` was removed from Git tracking with an index-only action and preserved on local disk.

Validation evidence:

- `Test-Path .env.vercel.production` returned `True`.
- `git check-ignore -v .env.vercel.production` showed the `.gitignore` rule protects the file.
- Only the file deletion from Git tracking is staged; values were not printed, copied, or committed.

## Root Handoff Deletion Evidence

The deleted root handoff files were accepted because archived copies exist under `references/archive/sprint-012e-repository-cleanup/root-handoff/`:

- `ORCHESTRATOR-export.docx`
- `ORCHESTRATOR.docx`
- `ORCHESTRATOR.md`

The durable source of truth is now the 120x planning layer under `planning/**`, `docs/**`, `references/**`, and `AGENTS.md`.

## Middleware Route Safety

Deleted root `middleware.ts` was accepted after source inspection, production build, and local production-server smoke.

Route-safety smoke used a built Next production server on localhost and returned:

| Method | Path | Status | Expected behavior |
|---|---:|---:|---|
| GET | `/` | 200 | Under-construction page reachable. |
| GET | `/home` | 307 | Redirects to `/`. |
| GET | `/contact` | 307 | Redirects to `/`. |
| GET | `/shop` | 307 | Redirects to `/`. |
| GET | `/shop/test-product` | 307 | Redirects to `/`. |
| POST | `/api/checkout` | 303 | Redirects to `/?checkout=under-construction` before Supabase or Stripe work. |
| GET | `/auth/callback` | 307 | Route remains reachable and redirects through auth flow. |
| POST | `/api/stripe/webhook` | 400 | Route remains reachable and rejects unsigned request. |
| GET | `/api/health` | 200 | Health route reachable. |
| GET | `/api/setup/status` | 200 | Setup status route reachable. |

## Validation

Commands run:

- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-scoring.ts` - passed.
- `node_modules/node/bin/node.exe --experimental-strip-types scripts/validate-biochemistry-recommendations.ts` - passed.
- `npm run lint` - passed.
- `npx tsc --noEmit --incremental false` - passed.
- `npm run build` - passed outside the restricted sandbox after removing ignored generated `.next` output.
- Local production route-safety smoke - passed.
- `git diff --check` - to be run immediately before commit.
- staged-file review - to be run immediately before commit.

Generated-output note:

- The existing ignored `.next` output contained stale files that failed with Windows `readlink` `EINVAL`.
- Builder removed the ignored generated `.next` folder after verifying the resolved path stayed inside the workspace.
- The production build then regenerated `.next` from source and passed outside the sandbox.

## Deliberately Excluded

The baseline does not stage these user/tool/reference areas:

- `.release-main/**`
- `.claude/**`
- `samples/**`
- `.validation-logs/**`
- `.next/**`
- `node_modules/**`
- local `.env.vercel.production` values

## Remaining Manual / Future Items

- Remote Supabase migrations remain unapplied until separately authorized.
- Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay remain future live acceptance work.
- Production Green/Amber/Red thresholds remain unsupplied.
- Production Table of Knowledge recommendation content remains unsupplied.
- Public website/shop reopening remains blocked until a future approved sprint explicitly authorizes it.
