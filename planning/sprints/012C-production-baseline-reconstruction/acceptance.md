# Sprint 012C - Production Baseline Reconstruction Acceptance

## Required Acceptance Criteria

- Architect Pack 012C is saved and applied.
- `planning/STATE.md` says implementation is authorized for Sprint 012C.
- Builder records current branch/revision and dirty worktree status without reverting unrelated changes.
- A temporary candidate tree is created under `C:\tmp`.
- Main workspace app/source files are not modified for reconstruction.
- Candidate starts from the closest known production-like source, expected to be current dirty workspace unless evidence says otherwise.
- Candidate preserves `/admin/commerce`.
- Candidate excludes known `.release-main` extra routes absent from current production unless evidence shows they are live.
- Candidate contains the Sprint 012 checkout malformed POST guard.
- Candidate route/source parity is compared against current production evidence.
- Candidate validation is attempted and recorded.
- Local smoke is run where feasible and recorded.
- No deployment is performed.
- No secret values or fragments are printed or stored.
- No destructive production mutation or live financial action is performed.
- Docs and planning files are updated with candidate path, findings, blockers, and recommendation.
- `planning/ARCHITECT_BRIEFING.md` is refreshed.
- `planning/STATUS.json` is set to the correct closeout status.

## Candidate Acceptance Matrix

| Case | Expected result |
|---|---|
| Candidate path | Created under `C:\tmp\pp-012c-*` |
| Main workspace | Not cleaned, reverted, or source-mutated |
| `/admin/commerce` | Present in candidate |
| Public/shop/sign-in routes | Present in candidate |
| Portal/data-entry/admin routes | Present in candidate at production-like route shape |
| Checkout route | Contains malformed POST guard |
| `.release-main` extra routes | Absent unless live evidence says otherwise |
| Validation | Lint, TypeScript, and known-good build pass, or failures are documented precisely |
| Smoke | Missing slug/malformed checkout and anonymous `/admin/commerce` behavior verified where feasible |
| Deploy | Not performed |

## Required Validation

- `git status --short` in main workspace
- branch and short revision identity
- candidate diff/manifest
- candidate route list or route-count evidence
- checkout malformed-body local smoke or direct route test where feasible
- lint through bounded wrapper from candidate
- TypeScript through bounded wrapper from candidate
- build through bounded wrapper from candidate
- if sandboxed build fails for known sandbox reasons, rerun the bounded build outside restricted sandbox with approval and record both outcomes
- post-validation process check for `node`, `npm`, and `npx`

## Manual Intervention Record

For each blocked item, Builder must include:

- blocked item
- evidence already checked
- exact user/operator action needed
- step-by-step action instructions
- verification Builder will perform after the action
