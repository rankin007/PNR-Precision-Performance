# Sprint 012E - Repository Cleanup And Archive Baseline Requirements

## Role

Builder executes this sprint under the `strict` workflow profile.

## User Authorization Context

The user asked Architect to review the Builder report, confirm whether anything else was needed, and create Sprint 012E in accordance with the Architect recommendation that cleanup should occur after the Sprint 012D baseline decision and before Sprint 013 product/data-model work.

Sprint 012D is complete. It produced branch `codex/012d-production-baseline` at commit `358e1fc`, with no deployment, push, or PR performed.

## Goal

Create a clean, documented, archive-first project surface before Sprint 013 begins, without changing production behavior.

The sprint should reduce confusion from stale, duplicate, generated, temporary, or misleading files and folders, especially items that could misdirect Sprint 013 schema/storage/RLS planning.

## Current Evidence Baseline

- Production remains live at `https://precisionperformance.com.au` from deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`.
- Sprint 012D baseline branch is `codex/012d-production-baseline` at commit `358e1fc`.
- Sprint 012D did not deploy, push, PR, mutate production, Supabase, Stripe, DNS, or Vercel settings.
- The main workspace remains broad and dirty from prior sprint reconstruction/history.
- `.release-main/` and generated/duplicated artifacts have been repeatedly identified as inspection hazards.
- Sprint 001 previously chose archive-first cleanup rather than deletion; that principle remains active.
- Validation wrapper logs now default to `.validation-logs/`, support `-LogDir`, and fall back safely with `LOG_DIR_FALLBACK`.

## In Scope

Builder may:

- inspect the repository and planning layer for stale, duplicate, generated, temporary, or misleading files and folders
- classify cleanup candidates as archive, keep, ignore, or needs-user-decision
- move approved cleanup candidates into `references/archive/sprint-012e-repository-cleanup/`
- create or update `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`
- create a short cleanup evidence document under `docs/`
- update `.gitignore` only for generated/log/cache files that should stay out of source control
- update planning state/status/briefing/decisions/risks/questions to reflect cleanup outcome
- run route listing, lint, TypeScript, build, and lightweight smoke checks where feasible
- document any candidates that are too risky or ambiguous to archive

## Out Of Scope

Builder must not:

- delete files or folders
- deploy to Vercel
- push to remote
- create a pull request
- mutate production data, DNS, Supabase, Stripe, Vercel project settings, users, horses, products, orders, payments, subscriptions, or customer data
- change authentication, authorization, RLS, schema, migrations, billing, checkout, webhook, or role behavior
- implement Sprint 013-016 product features
- remove or rewrite source files that affect app routes or runtime behavior unless Architect/user separately authorizes that exact action
- archive `.env*` or secret-bearing files into `references/`
- print, copy, summarize, or store secret values or secret fragments
- install packages from the network without approval
- clean outside the repository or approved writable roots

## Approved File Set

Builder may edit:

- `references/archive/sprint-012e-repository-cleanup/**`
- `docs/REPOSITORY_CLEANUP_012E.md`
- `.gitignore`, only for generated/log/cache ignore rules
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Builder may move/archive only files or folders that are clearly non-runtime or explicitly approved by this sprint after inspection, such as:

- stale generated output
- validation logs
- temporary reconstruction notes
- duplicated legacy handoff files
- obsolete release snapshots that are not the active source of truth
- cache/build artifacts accidentally present in the workspace

Inspection-only unless separately approved:

- production source under `app/`, `components/`, `lib/`, `supabase/`, `scripts/`, and root config files
- `.env*` names/presence only, no values
- `.release-main/`
- `.vercel/project.json`
- Sprint 012C/012D temporary worktrees under `C:\tmp`

## Required Output

Builder must produce:

- cleanup candidate inventory
- keep/archive/defer decision list
- archive manifest with original paths and reasons
- confirmation no deletion was performed
- confirmation no secrets were archived
- confirmation no production behavior files were modified except approved planning/docs/ignore changes
- validation results
- list of unresolved cleanup candidates needing user decision
- updated Architect briefing for the next sprint

## Manual Intervention Rule

If any required step cannot be completed, Builder must record:

- what is blocked or not working
- evidence already checked
- exact user/manual action needed
- step-by-step instructions for completing that action
- what Builder will verify after the action is complete
