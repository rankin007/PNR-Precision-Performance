# Sprint 027B — Completed Product-Lineage Reconciliation Blueprint

## Phase 1 — Freeze and identify sources

1. Read the three source worktrees without mutation.
2. Verify exact path, branch, HEAD, index state, outcome, closeout and changed-path manifest for 025, 026 and 027.
3. Capture status plus path/size/SHA-256 for every changed and untracked source file.
4. Capture status fingerprints for original `develop` and all three sources for final non-mutation comparison.
5. Stop on unexplained source drift, missing files, staged content, conflicts, secrets or generated/dependency artifacts.

## Phase 2 — Create the isolated target

1. Create `codex/027B-completed-product-lineage-reconciliation` from exact commit `6f8543020e126a4620f09be017744dcc75061e6e`.
2. Apply this Pack in that target and verify the four generated files.
3. Record target baseline, ancestry, clean pre-application state and migration/lockfile hashes.
4. Do not link, merge or rebase a source branch.

## Phase 3 — Reproduce non-overlapping accepted work

1. Reproduce each single-owner product, test, fixture, authority and implementation-document path byte-exactly from its source worktree.
2. Record source and target hashes.
3. Preserve each sprint’s Pack, generated sprint files and closeout evidence.
4. Exclude accidental duplicates or stale secondary copies through explicit hash/content comparison.
5. Run focused tests after each product slice is present to localise integration defects.

## Phase 4 — Resolve shared executable files

1. Build `package.json` from baseline plus the exact Sprint 026 and 027 maintained script additions and any Sprint 025 registration if applicable.
2. Keep dependencies unchanged and `package-lock.json` byte-identical.
3. Merge `scripts/run-validation-suite.mjs` so Sprint 025, 026 and 027 maintained tests run exactly once in appropriate local/CI classification.
4. Record every overlapping hunk, selected content and rationale.
5. Run the combined orchestrator and detect omissions/duplicates.

## Phase 5 — Reconcile durable planning state

1. Reconcile decisions, risks, questions and evidence entries chronologically without wholesale overwrite.
2. Write a concise combined state headed by 027B and retain all three accepted outcomes/limitations.
3. Set current `STATUS.json` to 027B reconciliation state using the existing schema.
4. Update schedule and sprint list consistently with the `027B` suffix.
5. Refresh Architect briefing for Sprint 028 readiness.
6. Preserve historical sprint artifacts unchanged.

## Phase 6 — Combined proof

1. Run the focused 025, 026 and 027 suites and their required regressions.
2. Run all canonical validation, lint, typecheck and production build gates.
3. Prove migration `0018`–`0021` and `package-lock.json` byte identity.
4. Run diff, approved-path, conflict, registration, dependency, secret, privacy and artifact scans.
5. Review the complete integrated product behavior against all three acceptance sets.
6. Diagnose once and correct only deterministic integration defects within scope; never weaken a product/security/privacy assertion.

## Phase 7 — Closeout and source preservation

1. Complete all four required 027B evidence records and the lineage document.
2. Record final integrated changed-file hashes and combined outcome.
3. Compare original `develop` and all three source status fingerprints with preflight.
4. Confirm no external, migration, provider, Production or deployment action occurred.
5. Leave the 027B target unstaged and uncommitted unless separately instructed.

Successful outcome: `completed-product-lineage-reconciled-combined-proof-clean`.

No outcome authorises Sprint 028 implementation, Production action or Git publication.
