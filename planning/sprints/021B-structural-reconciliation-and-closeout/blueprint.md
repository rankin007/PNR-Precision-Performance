# Sprint 021B - Structural Reconciliation And Closeout Blueprint

## Phase 1: Establish Immutable Baseline

1. Read all required project authority, the applied Sprint 021 files, `planning/STATUS.json`, and `docs/SPRINT_021_PROGRESS.md` before changing durable records.
2. Inventory the dirty worktree and preserve unrelated changes.
3. Record hashes for migrations `0011` and `0012` at the start of the sprint and confirm those hashes remain unchanged at closeout.
4. Confirm this is follow-up Sprint `021B`, not reopened Sprint 021 or a new numeric sprint.
5. Confirm no prohibited action is needed. Stop if structural reconciliation would require implementation or remote mutation.

## Phase 2: Audit Completed Structural Work

1. Trace the accepted Sprint 021 structural contract through migrations 0011/0012, bootstrap markers, verification SQL, structural tests, static validator, role helpers, and comment authorization code.
2. Rerun applicable credential-free local validation without editing implementation files.
3. Confirm source/bootstrap order and candidate ledger `0001`-`0012`, with 0011 and 0012 each present once and no 0013.
4. Confirm the full structural baseline and zero Auth/Storage counts using sanitized evidence.
5. Confirm candidate health and old-project health without querying old-project application data or mutating either project.
6. Write the evidence, limitations, and any mismatch to the 021B reconciliation review. A mismatch blocks closeout and is not repaired here.

## Phase 3: Reconcile All Advisor Warnings

1. Obtain the current sanitized zero-error / 22-warning / zero-suggestion result without credentials or mutation.
2. Create an independently countable disposition table covering exactly 22 warnings.
3. For every helper advisory, record the affected helper, safe search path, execution grants, authenticated RLS dependency, owner, accepted rationale, and reopen condition.
4. For leaked-password protection, verify and record the existing passwordless Free-plan exception, joint owners, and mandatory reopen condition.
5. Sum the table to 22 and cross-check it against the advisor totals. Record zero anonymous helper execution separately.
6. Block closeout for any missing, duplicated, unexplained, newly erroneous, or unsafe finding. Apply no fix.

## Phase 4: Reconcile Durable Sprint Identity

1. Update current-state references from active/incomplete Sprint 021 to closed Sprint `021B-structural-reconciliation-and-closeout` where supported by the audit.
2. Preserve historical statements about what Sprint 021 actually did.
3. Update status, state, schedule, progress, briefing, and directly relevant decision/risk/question entries consistently.
4. Remove stale next-action wording that calls for 021B implementation or treats authenticated proof as required for 021B closure.
5. State that authenticated proof remains unperformed and requires a separately planned later 021 follow-up if pursued.

## Phase 5: Validate And Close

1. Run the pack/sprint checks, local structural checks, TypeScript, lint, production build, relevant focused tests, JSON parse, secret scan, and `git diff --check` as applicable and credential-free.
2. Recheck migration hashes and verify no implementation, migration, bootstrap, test, script, config, callback, Auth, fixture, deployment, or old-project mutation occurred.
3. Verify every current sprint identifier uses `021B-structural-reconciliation-and-closeout` and historical identifiers remain accurate.
4. Verify the advisor table totals exactly 22 and the closeout records zero errors / 22 dispositioned warnings / zero suggestions.
5. Close 021B as **structurally-ready** only if every acceptance item passes. Otherwise record the precise blocker and stop.
