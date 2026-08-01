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
