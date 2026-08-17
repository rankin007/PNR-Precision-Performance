# Sprint 034E Blueprint

## Flight declaration

- Workflow: 120x Fly
- Profile: strict
- Flight class: critical
- One Pack, one sprint, one outcome
- Critical causes: public-repository publication, secret-safety boundary, Git history integrity and remote equality

## Invariant

Only an exact scanner-clean accepted lineage may be published. The new remote branch must always equal the verified local SHA. `main`, pull request 3, Product, Production, providers, and `delivery_road_map.docx` remain unchanged.

## Layer map

Git objects/index/worktree → bounded secret scanner → scoped local branch → scoped remote ref → GitHub readback → durable planning truth.

## Task contract

- Target outcome: `repository-continuity-remotely-backed-convergence-strategy-complete-clean`.
- Canonical workspace: exact permanent repository only.
- Opening lineage: `c90c3201380d7f61e03647ca6e46b03dc4c27985..c1eb5e796188e5088c732968539a95bcdf455b0e`.
- Publication target: `codex/034E-repository-convergence-and-publication` only.
- Owned implementation files: the four generated sprint files, two scanner scripts, convergence document, review, and proportional current planning/closeout records.
- External mutations: two non-force pushes to the one fresh branch; no other external write.
- Required proof: scanner tests and scans, integrity/static checks, exact SHA equality, unchanged protected refs/surfaces, fresh inspection, clean closeout.
- Stop conditions: every material boundary listed in requirements.

## Execution plan

1. Reprove canonical path, opening branch/SHA, status, four-commit range, DOCX exclusion, remote configuration, pull-request/main baselines, and target-ref absence.
2. Run `git fsck --no-dangling` and `git diff --check` on the opening range.
3. Implement the dependency-free bounded scanner and its synthetic non-secret tests.
4. Run scanner tests, scan the exact opening range, and run proportionate repository validation.
5. Create/switch the target local branch at the exact opening HEAD, recheck remote absence, push with upstream and no force, and prove four-way SHA equality.
6. Write the sanitized convergence document and implementation review without changing integration state.
7. Run all acceptance checks and present the exact implementation to a fresh Inspector.
8. Only after inspection passes, reconcile closeout records, stage exact owned paths, run staged scanner/validation, commit intentionally, push fast-forward, and prove final equality and clean tracked state.

## Discriminating examples

- `.env.example` containing clear placeholders passes; the same path containing a synthetic token fails.
- A synthetic PAT, private-key block or credential-bearing database URL fails while output omits its value.
- An absent target remote ref permits the scoped push; any existing ref is a collision and stops publication.
- Expected evidence PNG/JPEG blobs with matching signatures are classifiable; unknown or executable binary additions fail closed.
- Local/upstream/API equality passes; any SHA disagreement stops closeout.

## Rollback and recovery

Before the first push, recovery is local and no remote state exists. After the first push, preserve the continuity branch; do not delete or force-update it. If later work fails, leave the verified opening SHA remotely backed, record the partial state, and stop. A closeout push may only be a fast-forward. Never reset or rewrite to manufacture agreement.

## Known uncertainty

The active authenticated GitHub CLI identity may differ from the repository owner while still holding repository scope. The first ordinary non-force push is the bounded authorization proof. Do not switch accounts or broaden credentials unless separately required and authorized.
