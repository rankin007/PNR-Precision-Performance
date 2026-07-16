# Sprint 012D - Baseline Commit And Deployment Approval Acceptance

## Required Acceptance Criteria

- Architect Pack 012D is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012D.
- Builder creates a local branch or worktree for the reviewed baseline.
- Sprint 012C candidate source is imported.
- `.env*`, build artifacts, caches, and temp files are not committed.
- `/admin/commerce` is preserved.
- Checkout malformed POST guard is preserved.
- Known `.release-main` extra routes remain absent.
- Route parity is checked and documented.
- Lint, TypeScript, and build are run and recorded.
- Local smoke is run where feasible and recorded.
- A commit is created if validation passes and stop conditions are clear.
- No deployment is performed.
- No push or PR is performed unless separately authorized.
- No secret values or fragments are printed or stored.
- Docs and planning files are updated.
- `planning/ARCHITECT_BRIEFING.md` is refreshed.
- `planning/STATUS.json` records complete, partial, or blocked status.

## Commit Acceptance Matrix

| Case | Expected result |
|---|---|
| Branch | `codex/012d-production-baseline` or similarly scoped branch exists |
| Candidate source | `C:\tmp\pp-012c-baseline-lean-20260714-173135` recorded |
| Secrets | `.env*` not staged/committed |
| Build artifacts | `.next`, caches, temp files not staged/committed |
| `/admin/commerce` | Present |
| Checkout guard | Present |
| Route parity | Preserved or discrepancy documented before commit |
| Validation | Passed or meaningful blocker recorded |
| Commit | Created only if safe |
| Deploy | Not performed |

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
