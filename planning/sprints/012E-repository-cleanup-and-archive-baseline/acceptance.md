# Sprint 012E - Repository Cleanup And Archive Baseline Acceptance

## Required Acceptance Criteria

- Architect Pack 012E is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012E.
- Builder reads the Sprint 012E four-file sprint set before cleanup.
- Builder records current branch/commit and dirty status.
- Builder produces a cleanup candidate inventory.
- Builder classifies candidates as keep, archive, ignore, or needs-user-decision.
- Builder archives only low-risk approved candidates under `references/archive/sprint-012e-repository-cleanup/`.
- Builder writes `references/archive/sprint-012e-repository-cleanup/MANIFEST.md`.
- Builder writes `docs/REPOSITORY_CLEANUP_012E.md`.
- No files or folders are deleted.
- No `.env*`, credentials, secrets, tokens, private keys, password files, full connection strings, or secret fragments are archived, printed, or stored.
- No production runtime behavior is changed.
- No schema, migration, auth, authorization, RLS, Stripe, checkout, webhook, billing, or data-model behavior is changed.
- No deployment, push, PR, DNS change, Vercel setting change, Supabase mutation, Stripe action, or production data mutation is performed.
- Route/source behavior is confirmed unchanged or any discrepancy is treated as a blocker.
- Lint, TypeScript, and build are run and recorded, or blocked with exact evidence and manual-intervention steps.
- Planning docs and Architect briefing are updated.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Cleanup Acceptance Matrix

| Case | Expected result |
|---|---|
| Archive root | `references/archive/sprint-012e-repository-cleanup/` exists if anything is archived |
| Manifest | Every archived item has original path, archived path, reason, and validation note |
| Deletion | None performed |
| Secrets | None archived or exposed |
| Runtime source | Not moved or changed |
| `.release-main/` | Classified clearly; archived only if proven safe and approved by sprint criteria |
| Ambiguous files | Deferred, not moved |
| Validation | Passed or meaningful blocker recorded |
| Production actions | Not performed |

## Manual Intervention Record

For each blocked or deferred item, Builder must include:

- blocked/deferred item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
