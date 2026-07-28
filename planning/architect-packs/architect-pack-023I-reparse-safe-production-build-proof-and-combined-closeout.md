Architect Pack 023I - Reparse-Safe Production Build Proof And Combined Closeout

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff to prove the combined Sprint 023E–023H candidate in a disposable, physically reparse-isolated production-build copy outside OneDrive, then reconcile local closeouts only if the build and final integrity gates pass, without changing source, dependencies or external state.

============================================================
FILE: planning/sprints/023I-reparse-safe-production-build-proof-and-combined-closeout/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/023I-reparse-safe-production-build-proof-and-combined-closeout/blueprint.md
============================================================

# Sprint 023I - Reparse-Safe Production Build Proof And Combined Closeout Blueprint

## Phase 1 - Controlled Baseline And Environment Diagnosis

1. Verify worktree, branch, baseline, clean index and complete 023E–023H attribution.
2. Reconfirm all non-build gates and exact prior build behavior.
3. Resolve the OneDrive dependency junction and verify dependency-lock agreement.
4. Prove build does not require protected configuration or network access.
5. Apply and verify all four Sprint 023I files.

Stop before copy creation if provenance, dependencies, process ownership or secret boundaries fail.

## Phase 2 - Reparse-Safe Disposable Copy

1. Create a new GUID-prefixed direct child of `C:\tmp`.
2. Copy controlled build source with exact exclusions and create a hash/size manifest.
3. Physically copy resolved dependencies without install or root junction preservation.
4. Verify required local executables/package metadata and offline dependency integrity.
5. Scan for secrets/protected files and any build-used path resolving into OneDrive/unclassified targets.
6. Set telemetry disabled for build processes only.

## Phase 3 - Bounded Production Build

1. Record local tool versions and start state.
2. Run one bounded 15-minute production build.
3. Capture safe timing/phases/process evidence.
4. On source error, stop without source editing.
5. On timeout/cache failure, stop only owned processes, safely clear only disposable `.next`, and run at most one final bounded retry.
6. Require zero exit and complete route summary for success.

## Phase 4 - Combined Revalidation And Reconciliation

1. Return to the controlled worktree after a passing reparse-safe build.
2. Rerun all non-build combined gates and integrity checks.
3. Preserve local/structural/deferred proof distinctions.
4. Reconcile authorised 023E–023H outcomes only when fully supported.
5. Produce all five 023I reviews and planning updates.

## Phase 5 - Cleanup And Closeout

1. Stop/verify validation-owned processes.
2. Revalidate the exact disposable deletion target.
3. Remove only the disposable directory and verify absence.
4. Recheck controlled/original worktrees and external non-mutation.
5. Finish with exactly one allowed outcome.
6. Leave combined work unstaged/uncommitted and do not begin Sprint 023J.

============================================================
FILE: planning/sprints/023I-reparse-safe-production-build-proof-and-combined-closeout/acceptance.md
============================================================

# Sprint 023I - Reparse-Safe Production Build Proof And Combined Closeout Acceptance

## Baseline And Diagnosis

- [ ] Existing worktree/branch/baseline, clean index and complete 023E–023H manifest are recorded.
- [ ] All required non-build gates pass before copy creation.
- [ ] Prior attempts emitted no source/compiler error and owned processes were stopped.
- [ ] Existing `node_modules` junction and OneDrive target are resolved/documented safely.
- [ ] Dependency-lock agreement is established without install/update.
- [ ] No protected configuration, secrets or network access are required.
- [ ] Migrations, dependencies, lockfile and original worktrees remain unchanged.

## Disposable Copy Integrity

- [ ] Target is a new empty GUID-prefixed direct child of `C:\tmp`.
- [ ] Source copy excludes `.git`, `.next`, `node_modules`, `.env*`, `.vercel`, backups and private/generated artifacts.
- [ ] Build-relevant source path/size/hash manifest agrees exactly.
- [ ] Dependency tree is physically copied from the resolved local source with no install/update.
- [ ] Target `node_modules` is not a junction and no build-used link resolves into OneDrive/unclassified locations.
- [ ] Local Node/Next/package metadata and offline top-level dependency integrity are proven.
- [ ] Secret/protected-file scan passes and build output is contained in the disposable target.
- [ ] Telemetry is disabled without recording environment values.

## Build Proof

- [ ] No more than two builds run, each bounded to 15 minutes.
- [ ] Only validation-owned processes are monitored/stopped.
- [ ] Any retry follows verified owned-process exit and safe disposable `.next` cleanup.
- [ ] Build exits zero and emits complete Next.js route-generation summary.
- [ ] Safe evidence records versions, timing, phases, result and expected routes.
- [ ] No server, browser, network, remote or deployment action occurs.

## Combined Revalidation

- [ ] Focused 023E–023I tests and Sprint 022 regression pass.
- [ ] Full static suite and cache-independent full repository ESLint pass.
- [ ] JSON, domain, role, Supabase self-tests, encoding and design-system checks pass.
- [ ] TypeScript passes.
- [ ] Approved-path, dependency/lockfile, privacy/secret, migration immutability, original-worktree and `git diff --check` checks pass.
- [ ] Earlier closeouts are reconciled only if the complete matrix passes.
- [ ] Executable database, remote/provider, hosted and production proof remains explicitly deferred.

## Cleanup And Scope

- [ ] All validation-owned processes are stopped.
- [ ] Exact target is revalidated as a GUID-prefixed direct `C:\tmp` child and not a source/worktree.
- [ ] Only the disposable target is removed and absence is verified.
- [ ] Only approved 023I repository paths were modified by 023I.
- [ ] Five required reviews and planning reconciliation are complete.
- [ ] No staging, commit, new Git branch/worktree, source fix, dependency install, migration application, remote/provider action, deployment, push, merge or Sprint 023J work occurs.
- [ ] Planned remote/provider work is identified as Sprint 023J.
- [ ] Controlled index remains clean and combined work remains uncommitted.

## Closeout Outcomes

Close with exactly one:

- `reparse-safe-build-proven-combined-local-proof-clean`: physical-copy integrity, complete production build, all combined gates, reconciliation and safe cleanup pass without source/external/commit action.
- `reparse-safe-build-baseline-blocked-clean`: provenance, dependency-lock, prior-gate, process-ownership, secret or copy-safety boundary cannot be established; no disposable build begins.
- `reparse-safe-build-validation-blocked-clean`: disposable copy is safe but bounded production build does not complete or emits a source/environment failure; no source correction occurs.
- `reparse-safe-build-corrected-downstream-validation-blocked-clean`: production build passes but a separate required final combined gate fails and is precisely recorded.
- `reparse-safe-cleanup-blocked`: validation completed but the exact disposable deletion target cannot be proven safe; it is retained and manual intervention is recorded.

No outcome implies migration `0018` was applied, remote Storage/provider/hosted proof exists, safety adapters operate, CSV is enabled, production is ready, combined work is committed, or Sprint 023J has begun.

============================================================
FILE: planning/sprints/023I-reparse-safe-production-build-proof-and-combined-closeout/handoff-prompt.md
============================================================

# Sprint 023I - Builder Handoff Prompt

You are Builder for Sprint 023I - Reparse-Safe Production Build Proof And Combined Closeout.

Apply and verify all four Sprint 023I files in the existing intentionally uncommitted worktree `C:\tmp\pnr-023e-local-upload-storage` on branch `codex/023E-local-upload-and-storage-implementation-and-proof`. Do not create another Git branch/worktree.

First prove complete attribution, clean index, passing non-build gates, unchanged migrations/dependencies, stopped prior build processes, the current `node_modules` junction target and dependency-lock agreement. Stop before copying if secrets, network installation, ambiguous processes or provenance are involved.

Create one new GUID-prefixed disposable directory directly under `C:\tmp`. Copy exact controlled source with `.git`, `.next`, `node_modules`, `.env*`, `.vercel`, backups and private/generated material excluded. Then physically copy the resolved existing dependency contents into a non-junction target `node_modules`; never install/update packages or link back to OneDrive. Prove source hashes, offline dependency integrity, no protected files and no build-used path resolving into OneDrive/unclassified locations.

Run at most two telemetry-disabled production builds, each bounded to 15 minutes. Monitor/stop only owned processes. Retry only after a timeout/cache failure, verified process exit and safe cleanup of disposable `.next`. Success requires zero exit and the complete route summary; compilation alone is not success. Never edit source in this sprint.

After a pass, rerun all non-build combined gates in the controlled worktree and reconcile authorised 023E–023H outcomes only if fully supported. Preserve all remote/database/provider deferrals.

Finally, revalidate the exact disposable path as a GUID-prefixed direct child of `C:\tmp`, stop owned processes, remove only that copy, verify absence and recheck all worktrees. If deletion safety is uncertain, retain it and report manual intervention.

Do not inspect/copy protected values, install dependencies, modify source/migrations/package files, apply migrations, create Storage, contact providers, perform remote operations, deploy, stage, commit, push, merge or begin Sprint 023J. Finish with one allowed outcome and leave combined work uncommitted unless separately instructed.
