# Sprint 023H - Repository Lint Baseline Correction And Combined Closeout Requirements

## Role And Purpose

Builder executes this corrective follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023H files, and executes from those sprint files.

Sprint 023H addresses exactly six pre-existing full-repository ESLint errors:

- two `@typescript-eslint/no-require-imports` errors in `scripts/apply-architect-pack.js`;
- three `@typescript-eslint/no-require-imports` errors in `scripts/update-method.js`; and
- one `@typescript-eslint/no-unused-vars` error for `BiochemistryRecommendationCategory` in `scripts/validate-biochemistry-recommendations.ts`.

The two JavaScript tools intentionally use CommonJS. `apply-architect-pack.js` is a directly executed repository CLI. `update-method.js` is a shipped dependency-free CommonJS tool that exports pure helpers and conditionally executes only under `require.main === module`; its live `run()` can fetch and write method files. Converting either tool to ESM, renaming files, changing package module type or broadening ESLint configuration is unnecessary and carries behavior risk.

## Controlled Existing-Worktree Gate

Execute Sprint 023H inside the existing intentionally uncommitted worktree:

- worktree: `C:\tmp\pnr-023e-local-upload-storage`;
- branch: `codex/023E-local-upload-and-storage-implementation-and-proof`;
- committed baseline: `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`;
- Git index: clean;
- Sprint 023E outcome: `local-implementation-validation-blocked-clean`;
- Sprint 023F outcome: `validator-corrected-downstream-validation-blocked-clean`; and
- Sprint 023G outcome: `ledger-validator-corrected-downstream-validation-blocked-clean`.

Do not create another branch/worktree. Before editing, Builder must:

1. record the complete porcelain inventory and map every change to approved Sprint 023E, 023F, 023G or applied 023H planning files;
2. verify the three lint-target files have no 023E–023G diff from baseline;
3. reproduce exactly the six named ESLint errors with cache disabled and no additional repository-source errors;
4. verify 023F portability, 023G ledger, full static, focused 023E, Sprint 022 regression, TypeScript and production build evidence remains present/passing;
5. verify migrations `0001`–`0017` remain unchanged and candidate `0018` remains the sole approved candidate migration;
6. verify dependencies and protected configuration remain unchanged; and
7. verify original `develop`, 023B, 023C and 023D worktrees remain untouched.

Deliver `planning/reviews/023H-controlled-baseline-and-lint-root-cause.md`.

If additional ESLint source errors exist, any target file already differs unexpectedly, earlier corrective tests no longer pass, or attribution is incomplete, stop `lint-baseline-correction-blocked-clean` before editing.

## Exact Correction

### Intentional CommonJS imports

In `scripts/apply-architect-pack.js` and `scripts/update-method.js`, add a narrow `eslint-disable-next-line @typescript-eslint/no-require-imports` comment immediately before each of the five existing built-in-module `require()` declarations.

Each suppression must include a concise justification that the script intentionally preserves its CommonJS CLI/shipped-tool contract. Do not use a file-wide disable, project-wide rule override, glob override, warning downgrade or generic `eslint-disable` without the exact rule.

Do not:

- change `require()` to `import`;
- rename either file to `.cjs`/`.mjs`;
- add `"type": "module"` or change package module semantics;
- alter exports, `require.main`, fetch, filesystem, path validation, backup, parsing, writing, error or exit behavior;
- change protected-file/path safety in the pack tool;
- execute the live update-method network/write path; or
- add a dependency.

### Unused type import

Remove only `BiochemistryRecommendationCategory` from the type import list in `scripts/validate-biochemistry-recommendations.ts`. Do not change recommendation fixtures, thresholds, scoring, rules, assertions, imports used elsewhere or runtime behavior.

## Focused Behavior-Preservation Proof

Create `scripts/test-repository-lint-baseline-023H.mjs`. It must be network-free and use only existing Node capabilities.

Prove at minimum:

1. `node --check` passes for both CommonJS tools;
2. `apply-architect-pack.js --check` passes against the applied 023H Pack and reports exactly four valid sections;
3. `apply-architect-pack.js --dry-run` against a synthetic valid one-file Pack reports dry-run/no-write behavior and does not create or modify its target;
4. malformed delimiter/target traversal/absolute target checks still fail safely using synthetic temporary Packs without writing outside an isolated approved temporary target;
5. requiring `update-method.js` does not call global `fetch`, write repository files or execute `run()`;
6. the expected CommonJS exports remain available (`run`, `diffManifest`, `inferFolderMode`, `planHeal`, `findProjectRoot` and constants);
7. representative pure `diffManifest`, `inferFolderMode` and `planHeal` cases remain deterministic;
8. the recommendation validator still executes and passes its maintained fixtures;
9. only the five exact line-local rule suppressions exist in the two tools, with no broad disable; and
10. temporary files/directories are removed in `finally`.

The test must not invoke the live `update-method.js` CLI path, make a network request, replace method files, seed status, or mutate real planning/source files. If safely proving an apply-Pack failure would call `process.exit` in-process, use a bounded child process against temporary Pack input.

## Combined Sprint 023E–023G Revalidation

After focused proof passes, Builder must run:

1. focused Sprint 023H behavior test;
2. full repository ESLint with cache disabled or a verified fresh cache location;
3. Sprint 023F hash-portability test and migration-0009 validator;
4. Sprint 023G ledger adversarial test and clean-rebuild validator;
5. full maintained static suite;
6. Sprint 023E focused migration/evidence tests and Sprint 022 regression;
7. JSON, domain, roles and Supabase self-tests;
8. encoding and design-system checks;
9. TypeScript and production build;
10. approved-path, dependency, privacy/secret, migration immutability and `git diff --check` checks; and
11. original-worktree non-mutation checks.

Avoid relying on a locked/stale `.next/cache/eslint` file. If the normal lint wrapper fails only because a generated cache file is locked, rerun with cache disabled or a disposable verified cache location and record both results accurately. Do not delete unrelated caches destructively.

Update the authorised earlier evidence/closeouts only when the full rerun supports it:

- Sprint 023E becomes `local-upload-storage-implementation-proven-clean`;
- Sprint 023F becomes `validator-portability-corrected-023E-proven-clean`;
- Sprint 023G becomes `clean-rebuild-ledger-aligned-023E-proven-clean`;
- each record must preserve the chronology of its original blocker and identify the later sprint that superseded it; and
- executable PostgreSQL, migration/Storage application, hosted role proof, real scanner/sanitiser, CSV enablement, Cron secret, region, recovery and provider proof remain deferred.

If another independent required gate fails, do not force clean outcomes. Close 023H `lint-corrected-downstream-validation-blocked-clean` and record the exact new blocker.

## Required Evidence

Create:

- `planning/reviews/023H-controlled-baseline-and-lint-root-cause.md`;
- `planning/reviews/023H-tool-behavior-and-lint-proof.md`;
- `planning/reviews/023H-combined-revalidation-and-scope-proof.md`; and
- `planning/reviews/023H-closeout.md`.

Evidence must list exact commands/results, distinguish lint source failure from generated-cache/environment failure, and identify executable, structural, simulated and deferred proof. Do not include secrets or protected environment values.

## Required Reading

Builder must read:

1. project method, `AGENTS.md`, workflow profile and Manual Intervention Rule;
2. Sprint 023E–023G Packs, generated sprint files and closeout/proof records;
3. all three target files completely before editing;
4. `planning/architect-packs/README.md` and current pack-tool safety behavior;
5. current validation orchestrator, ESLint configuration and package scripts;
6. existing recommendation fixtures/domain validation conventions; and
7. the complete controlled working-tree inventory.

## Approved File Set

Builder may edit/create only:

- `scripts/apply-architect-pack.js`, only the two line-local justified suppressions;
- `scripts/update-method.js`, only the three line-local justified suppressions;
- `scripts/validate-biochemistry-recommendations.ts`, only removal of the unused type import;
- `scripts/test-repository-lint-baseline-023H.mjs`;
- `package.json`, only to add a focused 023H test alias if necessary, without dependency changes;
- `planning/architect-packs/architect-pack-023H-repository-lint-baseline-correction-and-combined-closeout.md`;
- `planning/sprints/023H-repository-lint-baseline-correction-and-combined-closeout/**`;
- the four required `planning/reviews/023H-*.md` files;
- `planning/reviews/023E-local-test-and-accessibility-proof.md` and `planning/reviews/023E-closeout.md`;
- `planning/reviews/023F-023E-revalidation-and-scope-proof.md` and `planning/reviews/023F-closeout.md`;
- `planning/reviews/023G-combined-revalidation-and-scope-proof.md` and `planning/reviews/023G-closeout.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for intentional CommonJS lint treatment and combined closeout facts;
- `planning/RISKS.md`, only for changed tooling/lint risk; and
- `planning/QUESTIONS.md`, only for resolved/exact remaining 023H questions.

Existing approved 023E–023G changes remain present and may be read/tested, but 023H must not otherwise modify them. Any required edit outside this set is a scope stop.

## Git, External And Remote Boundaries

Do not stage or commit unless separately asked after review. Do not create another branch/worktree, push, open a PR, merge, rebase, deploy, install/update dependencies, invoke the live method updater, inspect protected configuration, query/contact providers, run Supabase/Vercel remote operations, apply/reset/repair migrations, create/configure buckets/policies/secrets, upload evidence, or mutate external state.

## Manual Intervention Rule

For every blocker record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action required;
- numbered completion steps; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- product, migration, SQL, schema, RLS, Storage or upload implementation changes;
- module-system conversion, filenames, package type or broad ESLint configuration changes;
- recommendation/scoring behavior or fixture changes;
- networked method update, provider/remote/hosted/deployment work;
- dependencies, secrets or configuration changes;
- beginning the former provider/remote follow-up, now Sprint 023I;
- committing combined 023E–023H work without separate instruction; and
- production-readiness or complete Sprint 023 claims.
