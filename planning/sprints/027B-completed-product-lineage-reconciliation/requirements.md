# Sprint 027B — Completed Product-Lineage Reconciliation Requirements

## Outcome

Reconcile the three completed, validated and uncommitted Sprint 025, 026 and 027 worktrees into one clean integrated candidate lineage without redefining their accepted product behavior. The reconciled candidate must preserve all three closeout outcomes, run their combined maintained proof, and provide one trustworthy baseline for Sprint 028.

This is a corrective follow-up to the latest completed core product sequence, so it uses identifier `027B` under the project suffix rule. It does not consume Sprint 028.

## Workflow profile

Strict. The reconciliation combines health-adjacent domain validation, authenticated private-evidence management, voice/privacy behavior, shared validation orchestration and durable project state. Strict requires exact source identity, conflict accounting, security/privacy preservation and combined proof.

## Exact source worktrees

All three accepted candidates are based on exact commit `6f8543020e126a4620f09be017744dcc75061e6e` and remain unstaged/uncommitted:

| Sprint | Required worktree | Required branch | Required outcome |
|---|---|---|---|
| 025 | `C:\tmp\pnr-025-four-reading-biochemistry-authority` | `codex/025-four-reading-biochemistry-authority` | `four-reading-structured-operation-proven-authority-partial-clean` |
| 026 | `C:\tmp\pnr-026-uploads-and-evidence-management` | `codex/026-uploads-and-evidence-management` | `uploads-and-evidence-management-complete-fail-closed-clean` |
| 027 | `C:\tmp\pnr-027-voice-assisted-capture` | `codex/027-voice-assisted-capture` | `voice-assisted-typed-device-fallback-complete-provider-deferred-clean` |

Builder must treat these worktrees as immutable source candidates. Read them but do not edit, stage, commit, clean, stash, reset, merge, rebase or run formatting/build commands that write into them.

Before copying anything, verify for each source:

- exact HEAD `6f8543020e126a4620f09be017744dcc75061e6e`;
- expected branch and worktree path;
- clean index with only unstaged/untracked sprint changes;
- required closeout, sprint files and outcome;
- no conflict markers, staged files, unexpected generated artifacts, dependency directories or secret indicators;
- changed-path set agrees with its closeout manifest; and
- every changed/untracked file receives a path, byte-size and SHA-256 entry in a read-only source snapshot manifest.

If a source differs materially from its accepted closeout or contains unexplained edits, stop `completed-lineage-source-drift-blocked-clean`. Do not guess which version is authoritative.

## Reconciliation target

Create a new isolated branch/worktree `codex/027B-completed-product-lineage-reconciliation` from exact commit `6f8543020e126a4620f09be017744dcc75061e6e`. Apply this Pack only there and verify all four generated Sprint 027B files before reconciliation.

The dirty original `develop` worktree and all three source worktrees must remain unchanged. Do not reconcile directly in any source worktree.

## Required reading

Read and preserve:

- `AGENTS.md`
- `templates/method/120x-agent-identity.md`
- `docs/WORKFLOW_PROFILE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- the Sprint 025, 026 and 027 Architect Packs, generated sprint files, closeouts and implementation/authority documents;
- each source worktree’s current `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/EVIDENCE_INDEX.md`, `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, `planning/SPRINT_SCHEDULE.md` where present, and `planning/ARCHITECT_BRIEFING.md`;
- all changed source, tests and fixtures in the three manifests;
- current `package.json`, `package-lock.json`, `scripts/run-validation-suite.mjs` and canonical validation conventions; and
- `docs/ARCHITECT_BRIEFING_SPEC.md` for final combined closeout.

## Accepted behavior to preserve

### Sprint 025

- five raw measurements map to four exact lookup inputs;
- existing formulas, normalization, lookup/source snapshots and `healthScore` internal compatibility remain unchanged;
- structural threshold validation rejects gaps, overlaps, duplicate/missing zones, invalid bounds and incomplete normalized-domain coverage;
- fixture thresholds and recommendations remain non-production;
- production classifications, final result language, device limits and Table of Knowledge content remain unavailable.

### Sprint 026

- authenticated evidence list uses redacted server-derived projections;
- lifecycle/lineage states, retry/cancel, exact-predecessor replacement, delete, restore, hold/release and governed purge remain permission-aware;
- every mutation rechecks server authority;
- unknown/blocked evidence fails closed and exposes no preview/download path;
- purge remains separately designated and held evidence cannot be purged;
- migrations `0018` through `0021` and `package-lock.json` remain unchanged.

### Sprint 027

- typed notes remain permanently available;
- device-keyboard dictation is described accurately as device-controlled;
- the application records no audio and adds no microphone/transcription integration;
- non-empty notes require explicit review confirmation;
- editing invalidates prior confirmation;
- note text remains plain text and cannot change structured readings or results.

## Reconciliation rules

### Non-overlapping product paths

For paths changed by exactly one accepted source sprint, reproduce the accepted source bytes exactly in the target before any required integration-only correction. Record source path, source sprint, source hash, target pre-correction hash and final hash.

Product paths currently expected to be non-overlapping include:

- Sprint 025 biochemistry domain authority and threshold validator changes;
- Sprint 026 evidence repository/contracts/actions/components/result-route integration; and
- Sprint 027 biochemistry capture/workflow-state voice-fallback changes.

If product-path overlap is discovered beyond the recorded manifests, stop and classify it before choosing content.

### Shared executable files

`package.json` and `scripts/run-validation-suite.mjs` must be merged deliberately:

- preserve existing baseline scripts and dependencies;
- include all maintained Sprint 025, 026 and 027 test registrations exactly once;
- preserve ordering/style conventions where behavior is unchanged;
- introduce no dependency or lockfile change;
- ensure no test is silently replaced, skipped or renamed merely to make the combined suite pass; and
- record a three-source reconciliation table for every overlapping hunk.

`package-lock.json` must remain byte-identical to baseline. Any required dependency or lockfile mutation is a material scope stop.

### Shared planning files

Do not copy one sprint’s final planning file wholesale over another. Reconcile chronologically and semantically:

- preserve the durable completed outcomes and still-active limitations of Sprints 025, 026 and 027;
- retain earlier history without duplicating whole historical narratives;
- make `planning/STATE.md` lead with combined 027B status and identify the three source worktrees/outcomes;
- make `planning/STATUS.json` valid and represent only the current 027B reconciliation state while retaining required schema fields;
- append or merge distinct decisions without deleting another sprint’s decisions;
- retain unresolved domain, safety-provider and transcription-provider questions;
- retain the risks of unapproved biological authority, unavailable evidence safety services and misrepresented dictation boundaries;
- index all three closeouts, maintained tests, authority/implementation documents and the 027B reconciliation evidence;
- update schedule/sprint list consistently under identifier `027B`; and
- refresh `planning/ARCHITECT_BRIEFING.md` as the concise handoff for Sprint 028.

### Architect Pack and sprint artifacts

Preserve the canonical Sprint 025, 026 and 027 Pack and generated sprint artifacts in the integrated candidate. Exclude accidental duplicate or stale copies when hashes/content disagree; record which main-project/source copy was selected and why. The applied Sprint 027B artifacts must also remain present.

Do not alter historical sprint artifacts merely to make their past baseline language describe the new integrated future state.

## Permitted integration-only corrections

Builder may make the smallest deterministic correction required to integrate already-approved behavior, limited to:

- resolving shared-script registration/order conflicts;
- adapting an import/export or type composition that fails only because the accepted changes now coexist;
- correcting validation expectations so all three accepted maintained suites run together without weakening assertions;
- resolving formatting, encoding or line-ending defects; and
- making combined planning state internally consistent.

Record every correction with cause, affected acceptance boundary, why it does not redefine product behavior, and validation. If a correction changes domain formulas/threshold semantics, evidence permissions/lifecycle, voice/privacy behavior, schema/migrations, persistence contracts or user-visible product scope, stop `completed-lineage-product-conflict-blocked-clean`.

## Required evidence

Create:

- `planning/reviews/027B-source-worktree-snapshot-manifest.md`;
- `planning/reviews/027B-overlap-and-reconciliation-matrix.md`;
- `planning/reviews/027B-combined-validation-and-security-proof.md`;
- `planning/reviews/027B-product-lineage-reconciliation-closeout.md`; and
- `docs/COMPLETED_PRODUCT_LINEAGE_027B.md`.

Evidence must identify executed versus structural/substitute proof, contain no secrets or personal information, and avoid real note/evidence contents, object keys, signed URLs or protected environment values.

## Combined validation

At minimum run:

- Sprint 014/015/022/025 domain and workflow proof required by Sprint 025;
- maintained Sprint 022 workflow regression;
- maintained Sprint 023 evidence suites required by Sprint 026;
- Sprint 026 evidence-management suite;
- Sprint 027 voice-fallback suite;
- canonical JSON, domain, roles, Supabase self-test, static and encoding validation;
- TypeScript and ESLint;
- clean production build;
- `git diff --check`;
- migration-ledger and migration-byte integrity, including unchanged `0018`–`0021`;
- baseline-identical `package-lock.json`;
- approved-path, duplicate-test-registration, conflict-marker, dependency, secret, personal-information and generated-artifact scans; and
- proof that original `develop` plus the three source worktrees remain byte/status unchanged from preflight.

Equivalent or stronger safe evidence may replace an unavailable optional tool under the Evidence-Proportional Execution Standard. It may not replace proof of source identity, migration/lockfile immutability, combined compilation/build, permission/privacy behavior or source-worktree non-mutation.

## Approved file set

Builder may create or edit in the isolated 027B target only:

- the union of exact changed/untracked paths recorded in the accepted Sprint 025, 026 and 027 closeout manifests, excluding accidental generated/dependency artifacts;
- `package.json` and `scripts/run-validation-suite.mjs` for deliberate combined registration;
- `docs/COMPLETED_PRODUCT_LINEAGE_027B.md`;
- `planning/sprints/027B-completed-product-lineage-reconciliation/**`;
- the four required `planning/reviews/027B-*.md` files;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/DECISIONS.md`;
- `planning/RISKS.md`;
- `planning/QUESTIONS.md`;
- `planning/EVIDENCE_INDEX.md`;
- `planning/SPRINT_SCHEDULE.md`;
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`; and
- `planning/ARCHITECT_BRIEFING.md`.

Reading the repository and source worktrees is permitted. Any edit outside this set is a scope stop. No source worktree file may be edited.

## Explicitly out of scope

- new Sprint 028 dashboard/horse-workspace behavior;
- new thresholds, biological interpretations, result language or Table of Knowledge content;
- scanner/sanitiser/provider activation, evidence availability, preview/download enablement or CSV;
- application microphone/audio capture, external transcription or provider integration;
- schema/migration changes or application;
- role/RLS, retention, deletion, audit or persistence redesign;
- dependency installation/update or lockfile mutation;
- real data, Supabase/Vercel/provider/configuration mutation, deployment, Production, alias/domain movement;
- modification, cleanup, staging, commit or deletion of the source worktrees;
- staging, commit, push, PR, merge or branch publication unless separately requested after reconciliation closeout.

## Evidence-Proportional Execution Standard

Builder must stop only for a material target, source-identity, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup risk; substitute equivalent or stronger safe evidence when optional tooling is unavailable; keep deterministic integration, harness, validator, formatting, encoding and reporter corrections in 027B; not create another follow-up solely for optional-tool limitations; and use manual intervention only after safe alternatives are exhausted.

When manual intervention is genuinely required, record what is blocked, evidence checked, exact user action, numbered steps and what Builder will verify afterward. Never request secrets or real private data.
