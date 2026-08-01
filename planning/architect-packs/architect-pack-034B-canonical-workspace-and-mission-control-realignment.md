============================================================
FILE: planning/sprints/034B-canonical-workspace-and-mission-control-realignment/requirements.md
============================================================

# Sprint 034B - Canonical Workspace And Mission Control Realignment

## Goal

Make the permanent OneDrive canonical clone the single active Precision Performance workspace, adopt the exact official 120x method v8 update already written by Mission Control, make Mission Control show truthful current/roadmap/validation information, and reduce legacy worktree risk without copying uncertain material or changing the product.

Target outcome: canonical-workspace-and-mission-control-realignment-complete-clean.

This is a corrective follow-up to Sprint 034 repository reconciliation. It must remain 034B and must not consume Sprint 036 or reopen Sprint 035K.

## Workflow profile

Standard, with strict controls at filesystem deletion, Git history, repository identity, and legacy-data boundaries. Use the four-file sprint set because the outcome spans method tooling, planning authority, Mission Control interpretation, and bounded legacy-worktree disposition.

## Starting authority

Work only in the standalone canonical clone:

C:\Users\rrank\OneDrive\PNR Precision Performance Canonical

Starting product and closeout authority:

- branch: codex/035K-live-trainer-access-and-human-acceptance;
- exact HEAD: 47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b;
- local and remote branch equality was verified at that SHA;
- origin: https://github.com/rankin007/PNR-Precision-Performance.git;
- Sprint 035K is closed preview-trainer-access-proven-production-not-promoted-clean;
- accepted application candidate remains 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810;
- the governed adopted trainer identity and eight synthetic application records remain retained;
- production was not promoted.

The starting worktree is intentionally not clean because Mission Control installed exactly one official method v8 update after the 035K closeout. Before applying the Pack, verify that the complete pre-Pack working-tree difference is exactly these eight paths and no others:

1. .120x/method-manifest.json
2. scripts/apply-architect-pack.js
3. scripts/update-method.js
4. templates/architect-pack-template.md
5. templates/method/120x-agent-identity.md
6. templates/method/120x-architect-builder-method-starter.md
7. templates/prompts/chatgpt-project-custom-instructions.md
8. templates/method/ROADMAP.template.md

The manifest must report version 8, release 2026-07-25, existing-project mode, and https://launcher.120x.ai as source. Each of the seven payload paths declared by the manifest must match its declared SHA-256. The new ROADMAP template is one of those seven payloads. If another pre-Pack path is changed, a declared payload hash does not match, or the canonical repository identity is different, stop without deleting, copying, staging, committing, pushing, or applying product changes.

Create only branch codex/034B-canonical-workspace-and-mission-control-realignment from this exact canonical state. Do not use the old OneDrive root, C:\tmp, a linked worktree, develop, a deployment folder, or another clone as the implementation workspace.

## Accepted decisions

- The canonical clone is the only active Architect, Builder, Mission Control, commit, and push workspace.
- The old folder C:\Users\rrank\OneDrive\PNR Precision Performance is a preserved legacy repository and must not receive new project work.
- Mission Control remains connected to the entire canonical folder, not planning alone.
- The exact official v8 method update is adopted after hash, syntax, and dry-run validation; it is not reverted or copied into the legacy root.
- planning/ROADMAP.md is adopted mid-flight. Historical sprints are recorded once as completed before the roadmap existed and are not expanded into artificial done rows.
- The currently named road is about three sprints: 034B realignment, 036 production-promotion decision/live trainer acceptance, and 029N public enquiry privacy/submission completion. The roadmap does not authorize either future sprint.
- The legacy root and every ambiguous or uniquely valuable worktree remain preserved. Cleanup is limited to exact proven-safe stale registration metadata and the exact clean duplicate 035K temporary worktree.
- Product source, retained pilot data, Preview/production deployments, callbacks, Supabase, Resend, DNS, commerce, public enquiry behavior, and Git shared branches remain unchanged.

## Task contract

**objective:** Establish one durable canonical workspace and a truthful v8 Mission Control control plane without changing product behavior or losing uncertain repository history.

**owns:** Exact adoption/validation of the eight pre-existing v8 method-update paths; canonical-path rules; roadmap/status/briefing/spec/template alignment; concise current planning authority; a sanitized legacy-worktree disposition ledger; removal of only exact proven-safe stale registrations and the exact duplicate clean 035K temporary worktree; focused method/planning validation; and 034B closeout records.

**must_not:** Change app, components, lib, Supabase, migrations, package dependencies, product tests, authentication behavior, retained pilot records, provider configuration, deployments, aliases, callbacks, DNS, public enquiry transmission, commerce, production, develop, unrelated branches, uncertain files, environment files, secrets, or any legacy worktree not expressly proven safe below.

**acceptance:** All new work occurs in the standalone canonical clone; the official v8 payload is exact and valid; the roadmap and v8 briefing contract are complete; Mission Control no longer reports Sprint 035 as Building or a zero forward plan; the legacy root is visibly non-canonical and preserved; only allowed safe cleanup occurs; the product diff is zero; and the branch closes with one consistent planning truth.

**verification:** Prove canonical path/common-dir/origin/branch/SHA, exact pre-Pack and final manifests, v8 payload hashes, Node syntax, Pack dry-run behavior, JSON and UTF-8 validity, roadmap/status/briefing structure, 89 deterministic 035K tests with zero failures, canonical project validation, no product/provider/deployment diff, legacy cleanup ownership, Mission Control rendered interpretation, scoped diff checks plus the exact official-payload hash substitution, secret/private-data scan, and final Git reconciliation. Equivalent or stronger safe evidence may replace a supporting tool but not repository identity, hash integrity, destructive ownership, zero product change, or Mission Control truth.

## Required outcome

### 1. Canonical workspace rule

Update AGENTS.md so the canonical repository path is explicit and every Architect/Builder session must fail closed unless both the resolved working directory and git top level equal the canonical path. Identify the old OneDrive root and all C:\tmp worktrees as legacy/read-only unless a later exact cleanup instruction names them.

Do not add a broad automatic deletion script, background mover, synchronization task, junction, symlink, copy job, or environment-variable redirect. The rule is a simple startup identity check plus documented stop condition.

### 2. Adopt method v8 exactly

Preserve the eight Mission-Control-written method paths and validate them against .120x/method-manifest.json. Do not hand-edit a manifest-governed payload merely to match old project wording. If a project-specific correction is needed, make it in project-owned AGENTS, docs, planning files, or non-manifest templates rather than corrupting the official payload.

Reconcile planning/architect-packs/README.md to the actual v8 apply script interface. Remove commands that the current script does not support. Document only behavior proved by node scripts/apply-architect-pack.js and retain exact four-file Pack delimiters.

The official manifest-governed templates/prompts/chatgpt-project-custom-instructions.md contains two Markdown hard-line breaks at its mode list. A full git diff --check therefore reports those two trailing-space lines while the payload still matches the official manifest hash. Do not change that payload or its manifest entry. Use a scoped diff check excluding only that exact file, pair it with the exact manifest-hash proof, and record this evidence substitution.

### 3. Make the roadmap and status truthful

Preserve the Architect-created planning/ROADMAP.md as the mid-flight roadmap. Keep its three agreed rows, phases, order, and no-authorization note. During 034B it shows 034B planned; at close mark only 034B done. Do not mark historical work as roadmap done rows or silently choose a post-036 product direction.

Use STATUS schemaVersion 1. During execution the sprint is 034B with the appropriate v8 phase. At close use sprint-closed and a truthful 034B outcome. Preserve 035K acceptance facts in STATE/briefing/evidence rather than misusing STATUS as a history log.

### 4. Complete the v8 briefing contract

Update docs/ARCHITECT_BRIEFING_SPEC.md and templates/method/ARCHITECT_BRIEFING.template.md to require:

- Executive summary with Business outcome, Current focus, What is proven, and What is not live;
- Readiness signals with two to four passed/attention rows;
- Where things stand and the existing bounded current-state sections;
- Evidence with commands/facts and results;
- Plan corrections, or an explicit statement that the plan held;
- Validation / test status beginning with Tests: N passing, N failing;
- Recommended next Architect action with Do, Owner, and Decision.

Refresh planning/ARCHITECT_BRIEFING.md at close using that contract. The current product truth remains: 035K Preview trainer acceptance passed, production promotion did not occur, the retained synthetic pilot remains governed, and the next product decision is 036.

### 5. Reconcile current planning authority

Correct current-path and stale-current-state statements only where necessary in AGENTS.md, STATE.md, DECISIONS.md, DOMAIN.md, RISKS.md, QUESTIONS.md, SPRINT_SCHEDULE.md, SPRINT_LIFECYCLE_LEDGER.md, EVIDENCE_INDEX.md, FILE_INVENTORY.md, and the 034B reviews.

Do not rewrite historical evidence, renumber past sprints, duplicate the full project history, or turn old blocked findings into current failures. Keep current files concise and point to existing history/reviews for detail.

### 6. Bound legacy cleanup

Create planning/reviews/034B-legacy-worktree-disposition.md using sanitized path, branch, HEAD, cleanliness, registration state, remote/reachability classification, and disposition only. Do not read, reproduce, or copy environment values, credentials, mailbox material, real records, generated caches, or uncertain file contents.

Allowed cleanup after exact read-only proof:

- prune only legacy Git worktree registrations whose gitdir target is already absent and which git itself reports prunable;
- remove only C:\tmp\pnr-035k-live-trainer-access through the legacy repository's git worktree mechanism after proving it is clean, at exact HEAD 47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b, contains no unique untracked file, the canonical clone is standalone, and the remote 035K branch remains exact.

Do not remove the legacy OneDrive root. Do not delete branches. Do not remove any other C:\tmp directory or registered worktree. Do not use recursive filesystem deletion as a substitute for git worktree removal. If the exact duplicate cannot be proven safe or is locked, retain it and close with cleanup deferred rather than forcing removal.

### 7. Mission Control acceptance

After local closeout files are written, provide the owner one manual step: in the already signed-in Launcher session, click Re-detect once for the canonical folder and return a cropped screenshot or sanitized observations. Do not request account credentials.

Acceptance requires Mission Control to show the canonical folder, 034B/036 state consistent with the closeout, 89 passing and 0 failing, populated executive fields, at least one named forward destination, and no false Sprint 035 Building classification. Delivered counts may begin with the roadmap-adoption era; historical completion remains represented by the roadmap's mid-flight statement rather than fabricated rows.

### 8. Closeout and Git boundary

Create planning/reviews/034B-canonical-workspace-and-mission-control-realignment.md. Record exact v8 adoption, canonical guard, roadmap/briefing truth, Mission Control outcome, legacy disposition, safe cleanup actually performed, retained locations, validation, and zero product/external mutation.

Do not stage, commit, push, merge, open a PR, delete a branch, or rewrite history without the separate Git instruction required by AGENTS.md. When that instruction is supplied, stage only the exact reviewed 034B manifest, commit intentionally on the 034B branch, push only that branch, and prove local/remote equality.

## Approved file set

Already modified official v8 paths:

- .120x/method-manifest.json
- scripts/apply-architect-pack.js
- scripts/update-method.js
- templates/architect-pack-template.md
- templates/method/120x-agent-identity.md
- templates/method/120x-architect-builder-method-starter.md
- templates/prompts/chatgpt-project-custom-instructions.md
- templates/method/ROADMAP.template.md

Canonical/method authority:

- AGENTS.md
- planning/architect-packs/README.md
- planning/ROADMAP.md
- planning/STATUS.json
- docs/ARCHITECT_BRIEFING_SPEC.md
- templates/method/ARCHITECT_BRIEFING.template.md

Current planning and closeout:

- planning/STATE.md
- planning/DECISIONS.md
- planning/DOMAIN.md
- planning/RISKS.md
- planning/QUESTIONS.md
- planning/SPRINT_SCHEDULE.md
- planning/SPRINT_LIFECYCLE_LEDGER.md
- planning/EVIDENCE_INDEX.md
- planning/FILE_INVENTORY.md
- planning/ARCHITECT_BRIEFING.md
- planning/reviews/034B-legacy-worktree-disposition.md
- planning/reviews/034B-canonical-workspace-and-mission-control-realignment.md
- the four generated planning/sprints/034B-canonical-workspace-and-mission-control-realignment files

No additional file is approved by implication. If another file is genuinely required for the same outcome, record the exact addition and reason before editing; stop for any product, provider, deployment, schema, secret, destructive, or materially broader addition.

## Evidence-Proportional Execution and manual intervention

Stop only for material repository/target ambiguity, unexpected pre-existing change, method hash mismatch, secret/private-data exposure, destructive uncertainty, unauthorized file/scope expansion, product/external mutation, Git history mismatch, or cleanup that cannot be proven safe.

Use equivalent or stronger proof for unavailable supporting tools. Keep deterministic Pack/parser, JSON, UTF-8, formatting, hash, validator, reporter, and documentation corrections inside 034B. Do not create another sprint solely because a browser driver, clipboard, optional CLI path, renderer, or redundant checker is unavailable.

Manual intervention is limited to the owner's already signed-in Mission Control re-detect and visual confirmation. Record what was blocked, evidence checked, exact user steps, and what was verified afterward. Never request credentials or protected values.

## Permitted outcomes

- canonical-workspace-and-mission-control-realignment-complete-clean
- canonical-realignment-complete-legacy-cleanup-deferred-clean
- canonical-v8-method-update-mismatch-clean
- canonical-workspace-authority-ambiguous-clean

No outcome changes product behavior, promotes production, deletes ambiguous history, or declares product-wide Done.

============================================================
FILE: planning/sprints/034B-canonical-workspace-and-mission-control-realignment/blueprint.md
============================================================

# Sprint 034B Blueprint

## 1. Establish exact authority

1. Work from the canonical OneDrive clone only.
2. Verify git top level, common directory, origin, current branch, exact HEAD 47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b, and prior remote equality.
3. Verify the pre-Pack change list is exactly the eight method-v8 paths in requirements.
4. Parse the manifest and hash every declared changed payload.
5. Create branch codex/034B-canonical-workspace-and-mission-control-realignment without moving or copying the working tree.
6. Dry-run and apply the Pack from that branch, then verify exactly four generated sprint files.

## 2. Adopt v8 without blending project history

1. Treat the eight method paths as one official update unit.
2. Run Node syntax checks for the two scripts.
3. Prove the apply script accepts this Pack in dry-run mode and emits only the four expected target paths.
4. Reconcile the Architect Pack README to the actual supported v8 CLI rather than old command examples.
5. Keep project-specific path and workflow rules outside manifest-governed payloads.

## 3. Establish the canonical control plane

1. Add the exact canonical-root rule and legacy-root stop condition to AGENTS.md.
2. Preserve the Architect-created mid-flight ROADMAP.
3. Use schemaVersion 1 in STATUS and maintain the active phase truthfully.
4. Update the briefing spec/template to the complete v8 contract.
5. Refresh current planning files concisely, without rewriting historical evidence.

## 4. Record and bound legacy disposition

1. Inventory the legacy root and registered worktrees by path, branch, HEAD, status, registration, and remote/reachability classification.
2. Do not open or copy protected/untracked content; counts and Git metadata are sufficient.
3. Run worktree prune in dry-run/verbose mode and record only registrations Git proves prunable.
4. Prune only those already-absent registrations.
5. Prove the exact 035K temporary worktree is clean, exact, duplicate, and non-unique.
6. Remove only that exact worktree through git worktree remove when every guard passes.
7. Preserve the legacy root and all other worktrees/directories.

## 5. Validate project invariants

1. Confirm no app, components, lib, Supabase, migration, package, environment, product-test, provider, deployment, callback, DNS, retained-pilot, or production path changed.
2. Run the deterministic Sprint 035K suite and retain 89 passing, 0 failing.
3. Run the applicable canonical project validation that does not mutate external state.
4. Validate JSON, UTF-8/encoding, Markdown structure, Pack dry-run, Node syntax, scoped diff whitespace, exact official-prompt hash, secret/private-data patterns, and exact changed manifest. Record the two expected hard-break warnings from the official prompt as the documented hash-backed substitution; do not normalize them.
5. Use direct structural assertions for ROADMAP, STATUS, briefing, Evidence, Plan corrections, Do/Owner/Decision, and readiness status vocabulary.

## 6. Close and render Mission Control truth

1. Mark only 034B done in ROADMAP; keep 036 and 029N planned.
2. Write sprint-closed STATUS with one permitted outcome.
3. Refresh the 034B reviews, STATE, schedule, lifecycle, evidence, inventory, and v8 briefing.
4. Ask the owner to click Re-detect once in the signed-in Mission Control session.
5. Verify the canonical folder, non-035 current position, 89/0 validation, executive fields, and named forward plan.
6. If the browser cannot be inspected directly, accept a cropped screenshot or sanitized user observation as the required manual evidence.

## 7. Git closeout boundary

1. Inspect the final changed-file manifest and ensure every path is approved.
2. Keep the worktree unstaged until the separate Git instruction is received.
3. When instructed, stage only the reviewed manifest, commit once intentionally on the 034B branch, push only that branch, and verify remote equality.
4. Do not merge, open a PR, push develop, rewrite history, or delete branches.

## Rollback

Before commit, the v8 update and 034B files remain visible local changes and can be reviewed without touching product history. Do not restore the legacy root or copy files between roots as rollback. If v8 integrity fails, preserve evidence and stop at canonical-v8-method-update-mismatch-clean. If the exact temp worktree removal cannot be proven safe, retain it and close cleanup-deferred. No product/provider rollback is needed because those surfaces are immutable in this sprint.

============================================================
FILE: planning/sprints/034B-canonical-workspace-and-mission-control-realignment/acceptance.md
============================================================

# Sprint 034B Acceptance

## Baseline and isolation

- [ ] Git top level and common directory prove the standalone canonical clone.
- [ ] Origin, branch and exact starting HEAD 47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b match the recorded authority.
- [ ] Pre-Pack changes are exactly seven tracked v8 modifications plus the new ROADMAP template, with no ninth path.
- [ ] Manifest version/mode/source and all seven declared payload hashes match.
- [ ] Only codex/034B-canonical-workspace-and-mission-control-realignment is used for implementation.
- [ ] The legacy root, develop and all temporary worktrees are excluded as workspaces.

## Pack and method v8

- [ ] Pack dry-run succeeds and identifies exactly four 034B sprint files.
- [ ] Applied output matches those four Pack sections exactly.
- [ ] Both updated Node scripts pass syntax checks.
- [ ] The Architect Pack README documents only CLI behavior the v8 script actually supports.
- [ ] No manifest-governed payload is hand-edited away from its declared hash.

## Canonical authority and roadmap

- [ ] AGENTS.md names the exact canonical root and fails closed for the legacy root or C:\tmp.
- [ ] planning/ROADMAP.md uses the v8 template shape and mid-flight history statement.
- [ ] ROADMAP contains 034B, 036 and 029N in the agreed order with truthful phases and no future authorization.
- [ ] Only 034B changes from planned to done at close.
- [ ] STATUS uses schemaVersion 1, exact 034B identity, and truthful building/closed phases.
- [ ] STATE, schedule, lifecycle, evidence, inventory and current authority agree without duplicating history.

## Briefing and Mission Control

- [ ] Briefing spec and template contain every v8 executive, readiness, Evidence, Plan corrections, validation and Do/Owner/Decision field.
- [ ] Closeout briefing contains 89 passing, 0 failing and accurately distinguishes Preview proof from production.
- [ ] Mission Control remains connected to the canonical folder.
- [ ] After one Re-detect, Mission Control does not show Sprint 035 as Building.
- [ ] Mission Control shows a named current/next sprint and at least one named forward destination.
- [ ] Business outcome, current focus, proven/not-live, readiness, validation and recommended action are populated truthfully.
- [ ] Historical sprints are represented by the mid-flight statement rather than fabricated done rows.

## Legacy disposition

- [ ] A sanitized ledger records each legacy registered worktree's path, branch, HEAD, cleanliness, registration and disposition without protected content.
- [ ] Only registrations whose targets are absent and Git reports prunable are pruned.
- [ ] C:\tmp\pnr-035k-live-trainer-access is removed only after every exact clean/duplicate/remote/canonical guard passes.
- [ ] Failure or lock on that exact removal results in retained cleanup-deferred, not force deletion.
- [ ] The legacy OneDrive root, all branches and every other temporary/worktree directory remain untouched.
- [ ] No recursive filesystem deletion, broad glob, branch deletion, reset, checkout restore, or manual copy is used.

## Product and external invariants

- [ ] No app, components, lib, Supabase, migration, package, environment, product test, authentication or public-enquiry behavior changes.
- [ ] Retained adopted Auth identity and eight synthetic records remain unchanged.
- [ ] Preview, production, rollback, callbacks, aliases, DNS, Resend and provider state remain unchanged.
- [ ] No secret, credential, private email/code, session material, environment value or real record enters output or repository evidence.
- [ ] Sprint 035K deterministic suite remains 89 passing, 0 failing.
- [ ] Canonical validation, JSON, UTF-8, Pack dry-run, Node syntax, scoped diff and secret/private-data checks pass; the excluded official prompt matches its manifest hash and its two hard-break warnings are documented.

## Closeout

- [ ] The 034B closeout review and legacy disposition ledger identify exactly what changed, removed, retained and remained unverified.
- [ ] One permitted outcome is written consistently to STATE, STATUS, schedule, roadmap, lifecycle, evidence and briefing.
- [ ] The exact final changed-file manifest contains only approved paths.
- [ ] No staging, commit or push occurs without the separate Git instruction required by AGENTS.md.
- [ ] When instructed, only the 034B branch is committed/pushed and local/remote equality is proved.
- [ ] Sprint 036 and 029N remain plans only; production promotion, enquiry submission and product-wide Done are not claimed.

## Stop conditions

Stop for wrong canonical root, unexpected pre-Pack path, v8 hash mismatch, Git identity/ancestry mismatch, secret/private-data exposure, unsafe cleanup ownership, unexpected product/external diff, unsupported Pack mutation, branch/history risk, or any need to delete/copy uncertain content. Do not stop solely for an optional supporting-tool failure when equivalent or stronger safe evidence proves the same boundary.

## Permitted outcomes

- canonical-workspace-and-mission-control-realignment-complete-clean
- canonical-realignment-complete-legacy-cleanup-deferred-clean
- canonical-v8-method-update-mismatch-clean
- canonical-workspace-authority-ambiguous-clean

============================================================
FILE: planning/sprints/034B-canonical-workspace-and-mission-control-realignment/handoff-prompt.md
============================================================

You are Builder for Sprint 034B - Canonical Workspace And Mission Control Realignment.

Task contract:

objective: Establish the permanent canonical OneDrive clone and truthful v8 Mission Control control plane without changing product behavior or losing uncertain repository history.

owns: Exact adoption and validation of the eight official v8 method-update paths already present; canonical-path rules; roadmap/status/briefing/spec/template alignment; concise current planning authority; sanitized legacy-worktree disposition; exact proven-safe stale-registration and duplicate-035K-worktree cleanup; validation and 034B closeout.

must_not: Change product source, schema, migrations, dependencies, authentication, public enquiry behavior, retained pilot data, providers, deployments, callbacks, aliases, DNS, production, develop, unrelated branches, environment/protected content, the legacy root, or any worktree not explicitly allowed by the sprint.

acceptance: All work occurs in the standalone canonical clone; v8 payloads are exact; ROADMAP/STATUS/briefing and Mission Control are truthful; Sprint 035 is not falsely Building; the forward plan is named; only exact safe cleanup occurs; the product/external diff is zero; and one consistent 034B outcome closes.

verification: Prove canonical Git identity, exact SHA/diff/hash authority, four-file Pack output, Node syntax, roadmap/status/briefing structures, 89 passing and 0 failing, canonical validation, zero product/external mutation, safe cleanup ownership, Mission Control rendering, secret/private-data safety, exact manifest and final Git reconciliation.

Work only in C:\Users\rrank\OneDrive\PNR Precision Performance Canonical. First verify that git top level is that exact path, .git is local to the clone, origin is https://github.com/rankin007/PNR-Precision-Performance.git, current HEAD is 47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b, and the pre-Pack worktree contains exactly the eight official method-v8 paths listed in requirements. Verify manifest version 8 and all declared payload hashes. Stop on any mismatch.

Create only codex/034B-canonical-workspace-and-mission-control-realignment in this canonical clone, carrying the exact v8 working-tree update without copying or moving files. Run node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-034B-canonical-workspace-and-mission-control-realignment.md --dry-run, apply the Pack, and verify it writes exactly requirements.md, blueprint.md, acceptance.md and handoff-prompt.md under planning/sprints/034B-canonical-workspace-and-mission-control-realignment. Execute only from those generated files.

Before editing any file outside planning/ and docs/, stop at the mandatory code gate and report the exact file-by-file plan, test-count arithmetic, scope guards and acceptance checks. The official v8 paths are already changed; do not rewrite them unless a declared hash fails, in which case stop rather than repair by guesswork.

Adopt the exact v8 method update, reconcile the Pack README to the actual script interface, make AGENTS.md name and guard the canonical root, preserve the Architect-created mid-flight ROADMAP, use STATUS schemaVersion 1, update the project-owned briefing spec/template, and make current planning files concise and consistent. Do not rewrite history or fabricate completed roadmap rows.

Create the sanitized legacy-worktree ledger from Git metadata only. Preserve the dirty legacy OneDrive root and every ambiguous worktree. Prune only registrations whose target is absent and Git reports prunable. Remove only C:\tmp\pnr-035k-live-trainer-access through git worktree remove after proving it is clean, exact at 47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b, has no unique untracked content, the canonical clone is standalone, and the remote branch remains exact. If any guard fails or the path is locked, retain it and use the cleanup-deferred outcome. Never use recursive filesystem deletion, branch deletion, reset, restore, broad globs, or manual copy.

Run the focused method/planning checks, both Node syntax checks, Pack dry-run, JSON/UTF-8/Markdown structure, exact v8 hashes, Sprint 035K deterministic 89-test suite, applicable canonical validation, scoped diff checks, secret/private-data scan and exact manifest proof. The official manifest-governed chatgpt-project-custom-instructions.md contains two Markdown hard-line breaks that make a full git diff --check report two trailing-space lines. Preserve the exact official hash, exclude only that file from the scoped whitespace check, and document the hash-backed substitution. Prove no product, retained-pilot, provider, deployment, callback, alias, DNS, production or public-enquiry state changed.

At close, mark only 034B done in ROADMAP, keep 036 and 029N planned, write sprint-closed STATUS, refresh the two 034B reviews and current state/schedule/lifecycle/evidence/inventory/briefing files, and include complete v8 Evidence and Plan corrections. Ask the owner to click Re-detect once in the already signed-in Mission Control session and return a cropped screenshot or sanitized observations. Verify the canonical folder, no false Sprint 035 Building state, 89/0 validation, populated executive fields and a named forward plan. Never request Launcher credentials.

Use equivalent or stronger safe evidence for unavailable supporting tools and keep deterministic Pack/parser/JSON/encoding/formatting/reporter corrections inside 034B. Stop only for material repository identity, method hash, secret/private-data, destructive ownership, product/external mutation, scope, Git history or cleanup risk.

Do not stage, commit, push, merge, open a PR, delete a branch or rewrite history without the separate Git instruction required by AGENTS.md. When that instruction is received, stage only the exact reviewed 034B manifest, commit intentionally on the 034B branch, push only that branch, and prove exact local/remote equality. Close with exactly one permitted 034B outcome and do not claim Sprint 036, 029N, production promotion or product-wide Done.
