# Sprint 023I - Reparse-Safe Production Build Proof And Combined Closeout Requirements

## Role And Purpose

Builder executes this validation-only corrective follow-up under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023I files, and executes from those sprint files.

Sprint 023I addresses one remaining independent local-proof blocker: two bounded Next.js production builds reached compilation without a source error but did not complete. The source worktree is under `C:\tmp`, but its `node_modules` is a junction resolving into the OneDrive repository. The prior attempts therefore did not establish a fully physical reparse-isolated dependency/build path.

This sprint diagnoses and proves the build environment. It does not authorize source fixes, package installation, dependency changes, configuration changes, migration application, provider contact or remote operations.

## Controlled Existing-Worktree Gate

Execute planning/evidence updates in the existing intentionally uncommitted worktree:

- worktree: `C:\tmp\pnr-023e-local-upload-storage`;
- branch: `codex/023E-local-upload-and-storage-implementation-and-proof`;
- committed baseline: `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`;
- Git index: clean;
- Sprint 023E outcome: `local-implementation-validation-blocked-clean`;
- Sprint 023F outcome: `validator-corrected-downstream-validation-blocked-clean`;
- Sprint 023G outcome: `ledger-validator-corrected-downstream-validation-blocked-clean`; and
- Sprint 023H outcome: `lint-corrected-downstream-validation-blocked-clean`.

Before creating a validation copy, Builder must:

1. record the complete porcelain inventory and map every change to approved Sprint 023E–023H or applied 023I planning files;
2. verify the index is empty and no migration `0001`–`0017`, lockfile or dependency declaration differs outside approved prior work;
3. rerun/confirm focused 023H behavior proof, full cache-independent ESLint, TypeScript, static and focused earlier validation remain passing;
4. verify both prior builds stopped without a source/compiler error and validation-owned processes were terminated;
5. resolve and record `node_modules` as a junction and its exact target without exposing protected values;
6. verify the resolved dependency target exists, corresponds to the same `package-lock.json`, and no install/update is needed;
7. verify no `.env*`, `.vercel`, credentials, tokens, uploaded evidence, private data or protected runtime files are required for `next build`; and
8. verify original `develop`, 023B, 023C and 023D worktrees remain untouched.

Deliver `planning/reviews/023I-controlled-baseline-and-build-root-cause.md`.

If source gates no longer pass, dependency-lock agreement cannot be established, a protected configuration file is required, validation-owned processes remain ambiguous, or the build would require installation/network access, stop `reparse-safe-build-baseline-blocked-clean` before creating the copy.

## Disposable Validation Copy

Create one new empty GUID-named directory directly beneath `C:\tmp`, using prefix `pnr-023i-build-proof-`. Resolve and record its absolute path before copying.

### Source copy

Copy the exact controlled working-tree content needed for build and validation, including uncommitted approved Sprint 023E–023I source/planning state where required for build provenance. Exclude:

- `.git/**`;
- `.next/**` and other generated build/cache output;
- `node_modules/**` during the source-copy phase;
- every `.env*` file;
- `.vercel/**`;
- `.120x/backups/**` or other backups;
- logs, screenshots, uploads, evidence payloads and unrelated temporary artifacts; and
- any reparse-point target not explicitly classified.

Do not use a destructive mirror into an existing directory. The target must be newly created and empty. Do not copy files from any unrelated dirty worktree.

Create a source manifest for build-relevant files using relative path, byte size and SHA-256. Compare source and copy; required source files must match exactly. Evidence may include paths, sizes and hashes but not private contents.

### Physical dependency copy

Resolve the existing `node_modules` junction target first. Copy its contents into a physical `node_modules` directory inside the disposable target using local filesystem operations only. Do not preserve the root junction and do not create a new link back to OneDrive.

Use copy options that exclude/reject junction traversal outside the resolved dependency source and do not follow unexpected nested junctions blindly. After copy:

- target `node_modules` itself must not be a reparse point;
- no link/reparse target used by the build may resolve into OneDrive, the original repository, another worktree or an unclassified location;
- required project-local Node/Next/TypeScript/ESLint executables and package metadata must exist;
- `package.json` and `package-lock.json` must match the controlled source;
- `npm ls --depth=0 --offline` or an equivalent non-network integrity check must not change files and must be recorded accurately; and
- no `npm install`, `npm ci`, package download, repair, update, audit-fix or lockfile rewrite may occur.

If a required package cannot be copied physically and resolved safely without installation, stop and use the Manual Intervention Rule.

### Secret and boundary verification

Before build, scan the disposable copy to prove:

- no `.env*`, `.vercel`, `.git`, credential, private key, token file, uploaded evidence or production data was copied;
- no source/configuration path resolves into OneDrive or the governed worktrees;
- build output will be written only under the disposable target;
- telemetry is disabled with `NEXT_TELEMETRY_DISABLED=1` for the validation process; and
- no network-dependent prebuild/postbuild script is invoked.

Do not print environment values. Check names/presence and filesystem boundaries only.

## Bounded Build Diagnosis And Proof

From the disposable target, using the physically copied dependency tree:

1. record Node/npm/Next versions from local files/executables without network access;
2. run `next build` through the repository’s existing production-build script with telemetry disabled;
3. use a bounded maximum of 15 minutes for the primary build;
4. capture start/end/duration, exit code, bounded stdout/stderr and major phases without secret/environment dumps;
5. monitor only validation-owned process IDs, CPU progress and descendant processes;
6. never terminate unrelated processes;
7. if the first attempt fails with a clear source/compiler error, do not edit source—record it and stop the build retry path;
8. if the first attempt times out while making continued CPU progress and emits no source error, stop only owned descendants, verify they exited, remove only generated `.next` within the disposable target after resolving the path, and permit one final bounded 15-minute retry;
9. if the failure is a deterministic generated-cache/filesystem error, record it and permit one fresh-output retry only; and
10. do not run more than two production-build attempts.

A passing build must exit zero and provide the normal Next.js completion/route-generation summary. Record routes safely, including the internal reconciliation route, without starting a server or contacting external services.

A timeout is not a pass. Compilation start or completion alone is not a pass. Do not claim reparse safety unless all build-used paths were proven outside OneDrive/unclassified reparse targets.

## Final Combined Revalidation

If a disposable production build passes, return to the controlled worktree and run/confirm:

1. focused Sprint 023E–023I tests;
2. full maintained static suite;
3. cache-independent full repository ESLint;
4. JSON, domain, roles and Supabase self-tests;
5. TypeScript;
6. approved-path, dependency/lockfile, privacy/secret and migration immutability checks;
7. `git diff --check`;
8. clean index and complete controlled manifest; and
9. original-worktree non-mutation.

Do not require another build through the original OneDrive-junction dependency path after the reparse-safe build passes. The reparse-safe copy is the governed production-build proof for this candidate.

Reconcile authorised earlier closeouts only if all gates pass:

- Sprint 023E → `local-upload-storage-implementation-proven-clean`;
- Sprint 023F → `validator-portability-corrected-023E-proven-clean`;
- Sprint 023G → `clean-rebuild-ledger-aligned-023E-proven-clean`;
- Sprint 023H → `repository-lint-corrected-combined-local-proof-clean`;
- each record must preserve the chronology and identify the later sprint that superseded its blocker; and
- all executable database, remote migration/Storage, hosted roles, real safety adapters, CSV, Cron secret, region, backup/recovery and provider proof remains deferred.

If the reparse-safe build or a later independent gate fails, retain accurate earlier blocked outcomes and close 023I with the applicable blocked result.

## Safe Cleanup

After evidence is captured:

1. confirm no validation-owned process is running from the disposable target;
2. resolve the disposable target again;
3. verify it is a direct child of `C:\tmp`, its name begins `pnr-023i-build-proof-`, and it is neither a repository/worktree nor any source/dependency target;
4. list the exact target in evidence;
5. remove only that disposable directory recursively;
6. verify it is absent; and
7. recheck controlled/original worktrees.

If any path check fails, do not delete; stop for manual intervention. The copied directory contains no source of truth and is recoverable only by recreating it.

## Required Evidence

Create:

- `planning/reviews/023I-controlled-baseline-and-build-root-cause.md`;
- `planning/reviews/023I-reparse-safe-copy-and-dependency-manifest.md`;
- `planning/reviews/023I-production-build-and-route-proof.md`;
- `planning/reviews/023I-combined-revalidation-and-cleanup-proof.md`; and
- `planning/reviews/023I-closeout.md`.

Evidence must list exact commands/results and distinguish source failure, timeout, cache/filesystem failure, environment boundary and successful build. Do not include secrets, environment values, private data or excessive compiler output.

## Required Reading

Builder must read:

1. project method, `AGENTS.md`, strict workflow and Manual Intervention Rule;
2. Sprint 023E–023H Packs, generated sprint files, manifests and closeouts;
3. Sprint 029D reparse-safe build requirements/evidence as historical technique only;
4. package/build scripts, lockfile and Next configuration;
5. relevant secret/configuration boundaries and `.gitignore`; and
6. current controlled worktree, process and reparse-point evidence.

## Approved File Set

Builder may edit/create only:

- `planning/architect-packs/architect-pack-023I-reparse-safe-production-build-proof-and-combined-closeout.md`;
- `planning/sprints/023I-reparse-safe-production-build-proof-and-combined-closeout/**`;
- the five required `planning/reviews/023I-*.md` files;
- `planning/reviews/023E-local-test-and-accessibility-proof.md` and `planning/reviews/023E-closeout.md`;
- `planning/reviews/023F-023E-revalidation-and-scope-proof.md` and `planning/reviews/023F-closeout.md`;
- `planning/reviews/023G-combined-revalidation-and-scope-proof.md` and `planning/reviews/023G-closeout.md`;
- `planning/reviews/023H-combined-revalidation-and-scope-proof.md` and `planning/reviews/023H-closeout.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, only for the governed reparse-safe build-proof boundary;
- `planning/RISKS.md`, only for changed build/reparse risk; and
- `planning/QUESTIONS.md`, only for resolved/exact remaining 023I questions.

The disposable validation directory under `C:\tmp` may be created, populated with copies, used for validation and safely removed as specified. It is not a repository artifact and must never be staged or committed.

Existing approved 023E–023H changes remain present and may be read/tested, but 023I must not otherwise modify production, scripts, migrations, package files or dependencies. Any source correction is a scope stop.

## Git, External And Remote Boundaries

Do not stage or commit unless separately asked after review. Do not create another Git branch/worktree, push, open a PR, merge, rebase, deploy, install/update dependencies, inspect/copy protected values, invoke networked scripts, query/contact providers, run Supabase/Vercel remote operations, apply/reset/repair migrations, create/configure buckets/policies/secrets, upload evidence, or mutate external state.

## Manual Intervention Rule

For every blocker record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action required;
- numbered completion steps; and
- what Builder will verify afterward.

## Explicitly Out Of Scope

- source, migration, package, lockfile, dependency or configuration correction;
- dependency installation/update or a junction back to OneDrive;
- browser/server/hosted route testing;
- database, Storage, provider, Cron, secret, region, recovery or deployment work;
- beginning the former provider/remote follow-up, now Sprint 023J;
- committing combined 023E–023I work without separate instruction; and
- production-readiness or complete Sprint 023 claims.
