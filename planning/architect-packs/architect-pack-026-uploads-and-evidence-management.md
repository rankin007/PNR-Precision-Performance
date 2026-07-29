============================================================
FILE: planning/sprints/026-uploads-and-evidence-management/requirements.md
============================================================

# Sprint 026 — Uploads And Evidence Management Requirements

## Outcome

Complete the authenticated, mobile-first evidence-management experience for biochemistry tests on top of the proven Sprint 023 evidence contract. Authorised users must be able to understand existing evidence, initiate supported uploads, and perform only the lifecycle operations their role and the evidence state permit. Every unsupported, unsafe, or unavailable path must remain fail closed.

Sprint 026 completes product-facing management of the existing JPEG/PNG/PDF evidence lifecycle. It does not make evidence available while approved safety adapters are absent and does not claim Production readiness.

## Workflow profile

Strict. Evidence can contain sensitive horse, stable, trainer, or operational material and crosses authenticated role, private Storage, retention, deletion, audit, and privacy boundaries. Strict means strong boundaries and evidence, not redundant ceremony.

## Baseline and sources of truth

Builder must use a new clean isolated worktree based on exact commit `6f8543020e126a4620f09be017744dcc75061e6e`, or stop if that commit cannot be established as the clean selected baseline. It includes the closed Sprint 023L hosted proof and the Evidence-Proportional Execution Standard. Do not implement in the dirty `develop` worktree or the uncommitted Sprint 025 worktree.

Read and preserve at minimum:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `docs/WORKFLOW_PROFILE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`
- `docs/TEST_EVIDENCE_UPLOAD_IMPLEMENTATION_023E.md`
- `docs/TEST_EVIDENCE_REMOTE_PROOF_023J.md`
- Sprint 023C privacy/lifecycle decisions, Sprint 023D architecture, Sprint 023E implementation artifacts, and Sprint 023L closeout evidence
- migrations `0018` through `0021`
- `lib/evidence/**`
- `app/(ops)/data-entry/biochemistry/evidence-actions.ts`
- `components/ops/test-evidence-upload.tsx`
- `components/ops/test-evidence-state.ts`
- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`
- maintained Sprint 022, 023E, 023J, 023P and 023L tests

The accepted starting facts are:

- the five-measurement/four-lookup biochemistry path and Sprint 025 authority gaps are independent of evidence management;
- the private `test-evidence` contract, migrations `0018` through `0021`, governed direct upload, lifecycle, audit, recovery, purge, reconciliation and role boundaries are already implemented and proven on the approved non-production Preview lineage;
- supported content remains JPEG, PNG and PDF only, at most 5 MiB each, 10 files and 30 MiB per test;
- CSV remains disabled;
- no approved scanner or sanitiser adapter exists, so transferred evidence remains blocked/unavailable and must not expose preview or download access;
- Singapore `ap-southeast-1` is approved and must be described accurately as overseas processing from Australia; and
- Production deployment, production aliases, real data, and public access are not authorised by this sprint.

## Required product work

### 1. Reconcile the existing executable contract

- Verify exact baseline, clean isolation, ledger `0001` through `0021`, and the closed Sprint 023L outcome.
- Map the existing repository/action result shapes, role capabilities, lifecycle states, lineage, holds, restore/purge rules, retry behavior, safe error codes and audit boundaries before changing UI.
- Confirm that the current upload-only panel does not yet expose the full management experience.
- Do not duplicate database policy in client code. UI capability hints must be derived from server-authoritative results and every mutation must recheck authority on the server.

### 2. Evidence list and status model

Provide one coherent evidence manager on the existing authenticated biochemistry result route.

- Load the current test’s visible evidence through the existing server-authoritative list path.
- Present safe display metadata only: approved display name where permitted, content category/type, declared size, lifecycle/status label, created/updated timing where already authorised, version/replacement relationship, and available actions.
- Never expose object keys, bucket internals, signed tokens/URLs, hashes, secret-bearing errors, hidden records, or unauthorised existence.
- Give each lifecycle state accurate non-colour text and context. Distinguish transfer completion from safety approval and availability.
- Represent loading, empty, blocked, pending, retryable failure, deleted/restorable, held, purge-pending, superseded, unavailable and unexpected-error states without implying success.
- Preserve lineage: a failed or unavailable replacement must not visually displace its active predecessor.

### 3. Permission-aware lifecycle controls

Wire the existing server actions into usable, state-aware controls only where the established contract permits:

- upload and safe retry/cancel;
- replacement initiation against the exact predecessor;
- soft deletion;
- restore request and authorised restore execution;
- hold creation/release; and
- governed purge.

Requirements:

- do not show or enable a control merely because the client assumes a role;
- destructive or consequential actions require clear confirmation containing the exact consequence without revealing private identifiers;
- disable duplicate submission while a request is pending;
- refresh/reconcile visible state after successful mutation;
- stale, replayed, cross-test, wrong-role, revoked, inactive, deleted-account, wrong-stable and forged requests fail safely;
- retryable failures remain retryable and never report false success;
- purge remains separately designated and Administrator alone is not sufficient;
- held evidence cannot be purged; and
- unavailable evidence has no preview/download affordance.

If existing actions do not return enough safe, server-authoritative capability information, Builder may narrowly extend existing evidence contracts/repository projections. Do not weaken RLS, grants, lifecycle constraints, audit rules or non-enumerating errors.

### 4. Upload interaction completion

Retain the exact acknowledgement and supported-format limits. Complete the interaction around the established signed, no-overwrite upload flow:

- safe client validation before initiation, with the server remaining authoritative;
- clear selected-file, upload, transfer-complete, blocked, cancel and retry states;
- replacement initiation through the exact replacement action rather than a new parallel flow;
- no display of raw Storage errors;
- keyboard/focus recovery after errors and mutations;
- no claim that blocked evidence is scanned, clean, reviewed, accepted or available; and
- no provider-dependent progress fiction.

Do not add a provider SDK, dependency, scanner, sanitiser, OCR, image/PDF parser, malware sample, CSV path, or unrestricted upload fallback.

### 5. Privacy, wording, responsive and accessibility requirements

- Keep the experience authenticated and separate from public pages.
- Use the portal design direction in `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
- Explain private purpose, supported types/limits, overseas Singapore processing, blocked safety status, and role-controlled retention/removal accurately and concisely.
- Avoid diagnosis, clinical interpretation, guarantees, and claims that technology replaces trainer or veterinary judgement.
- Status meaning must not rely on colour alone.
- Meet keyboard operation, visible focus, error association, live-region announcements, logical focus movement, reduced-motion, 44px touch targets, 200% zoom/reflow, and narrow mobile layout requirements.
- Do not surface real personal or horse information in tests, screenshots, logs, fixtures or closeout evidence.

### 6. Deterministic proof and closeout

Use synthetic fixtures only. Prove:

- list projection and redaction for every relevant lifecycle state;
- positive and negative role/action matrices;
- stale/cross-test/forged/revoked/duplicate/concurrent request denial;
- upload acknowledgement, size/type/CSV limits, retry, cancel and no-overwrite behavior;
- replacement predecessor preservation;
- delete/restore/hold/purge state and capability rules;
- fail-closed blocked evidence with no preview/download path;
- accurate non-colour labels and privacy wording;
- keyboard, focus, live-region, touch and responsive contracts;
- Sprint 022 workflow and maintained 023 evidence regressions; and
- canonical JSON, domain, roles, Supabase self-test, static, TypeScript, ESLint, production-build and `git diff --check` gates.

If a browser or renderer is unavailable, use equivalent or stronger executable/component/markup evidence for the same acceptance boundary and record the substitution. Do not claim visual/runtime proof that was not performed.

Refresh required planning state and create a concise Sprint 026 closeout and changed-file manifest. Keep evidence free of secrets, signed URLs, object keys, private filenames, real payloads and personal information.

## Approved file set

Builder may edit or create only:

- `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`, for evidence-manager integration only;
- `app/(ops)/data-entry/biochemistry/evidence-actions.ts`;
- `components/ops/test-evidence-upload.tsx`;
- `components/ops/test-evidence-state.ts`;
- `components/ops/test-evidence-manager.tsx`;
- `lib/evidence/**`, only for safe projection/capability contracts strictly necessary for this UI;
- `app/globals.css`, only for narrowly necessary evidence accessibility/responsive styles;
- `scripts/test-test-evidence-026.mjs`;
- `scripts/fixtures/026-test-evidence/**`;
- `scripts/run-validation-suite.mjs` and `package.json`, only to register the maintained Sprint 026 test using existing dependencies;
- `docs/TEST_EVIDENCE_MANAGEMENT_026.md`;
- `planning/sprints/026-uploads-and-evidence-management/**`;
- `planning/reviews/026-uploads-and-evidence-management-closeout.md`;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/DECISIONS.md`, only for durable Sprint 026 implementation decisions;
- `planning/RISKS.md` and `planning/QUESTIONS.md`, only for materially changed items;
- `planning/EVIDENCE_INDEX.md`;
- `planning/SPRINT_SCHEDULE.md` and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`; and
- `planning/ARCHITECT_BRIEFING.md`.

Reading other files is permitted. Any required edit outside this set is a material scope stop.

## Explicitly out of scope

- any migration creation, change, application, repair, reset, squash or remote ledger mutation;
- Supabase bucket/policy/configuration changes or any remote data mutation;
- Vercel configuration, deployment, alias/domain movement or Cron changes;
- Production, real customer/staff/horse data, public evidence, or public-site integration;
- scanner/sanitiser/provider selection, procurement, credentials, SDKs or activation;
- making blocked/unavailable evidence previewable or downloadable;
- CSV, OCR, reading extraction, automated classification, scoring/recommendation changes, voice, notifications or email;
- role/RLS expansion, retention-policy changes, hard-delete redesign or audit weakening;
- dependency installation/update;
- internal `healthScore` rename or Sprint 025 authority completion;
- commit, staging, push, PR, merge or deployment unless separately requested after closeout.

## Safety and execution standard

Builder follows the Evidence-Proportional Execution Standard in `AGENTS.md`:

- stop only for material target, authority, security, privacy, migration, destructive, integrity, production, scope or cleanup risk;
- substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
- keep in-scope tooling, harness, credential, validator, formatting, encoding, reporter and deterministic corrections in Sprint 026;
- do not create a follow-up sprint solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path or redundant verifier is unavailable; and
- use manual intervention only after safe in-scope alternatives are exhausted.

When manual intervention is genuinely required, record what is blocked, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Never request a secret value in conversation.

============================================================
FILE: planning/sprints/026-uploads-and-evidence-management/blueprint.md
============================================================

# Sprint 026 — Uploads And Evidence Management Blueprint

## Phase 1 — Isolate and reconcile

1. Verify exact clean baseline `6f8543020e126a4620f09be017744dcc75061e6e`, expected ancestry, ledger `0001`–`0021`, closed 023L outcome and original-worktree non-mutation.
2. Create isolated branch/worktree `codex/026-uploads-and-evidence-management`.
3. Apply this Pack there, verify the four generated files, and execute the complete sprint from them.
4. Map current evidence states, actions, server projections, capabilities and role boundaries.
5. Record the approved-path manifest before source edits.

Stop `evidence-management-baseline-blocked-clean` if the exact baseline, isolation, ledger, source contracts or closed 023L state cannot be established safely.

## Phase 2 — Define the presentation contract

1. Define an exhaustive safe evidence item view model derived on the server.
2. Include only authorised display metadata, lifecycle label/context, lineage status and server-authoritative capability flags.
3. Ensure unknown states fail closed and expose no action.
4. Map safe operation results to non-enumerating user messages.
5. Keep object keys, signed values, hashes, internal errors and hidden-record existence outside client props and logs.

Prefer existing domain contracts. Extend them only where the management UI cannot be safe or exhaustive without a narrow projection change.

## Phase 3 — Build the evidence manager

1. Load evidence through the existing authenticated server path on the biochemistry result route.
2. Add one cohesive manager containing the supported upload flow and visible evidence list.
3. Present empty, pending, blocked, deleted/restorable, held, purge-pending, superseded, retryable-error and unexpected-error states accurately.
4. Render only server-permitted controls.
5. Implement confirmation, pending locks, safe result messaging, focus recovery and refreshed state after mutation.
6. Preserve the active predecessor unless replacement cutover is authoritative.
7. Keep blocked/unavailable evidence without preview/download UI.

## Phase 4 — Complete upload and lifecycle interactions

1. Preserve exact unchecked acknowledgement, JPEG/PNG/PDF allowlist, 5 MiB item limit, 10-file and 30-MiB test limits, and CSV denial.
2. Keep initiation, direct signed no-overwrite transfer, cancellation and finalisation sequencing intact.
3. Add retry without replay ambiguity and replacement through the exact predecessor contract.
4. Wire soft delete, restore request/execution, hold/release and governed purge only where server capabilities allow.
5. Treat stale or denied responses as fail-closed state changes; never optimistically grant authority.
6. Do not add download handling while runtime evidence remains blocked.

## Phase 5 — Accessibility, privacy and responsive review

1. Verify logical headings, field labels, error associations, live-region messages and focus destinations.
2. Verify all controls by keyboard and that consequential confirmation is understandable.
3. Verify non-colour status meaning, visible focus, reduced motion, touch targets and 200% reflow.
4. Verify narrow mobile layouts do not hide status, consequence or controls.
5. Verify wording accurately communicates private purpose, Singapore processing, retention/removal authority and unavailable safety status without unsupported claims.

## Phase 6 — Deterministic validation

1. Add synthetic Sprint 026 fixtures and a maintained executable test.
2. Prove exhaustive state/view-model mapping, redaction, capability gating and safe messages.
3. Prove upload, retry/cancel, replacement, delete/restore/hold/purge, replay/concurrency and denial contracts.
4. Prove unavailable evidence cannot produce preview/download UI or calls.
5. Run maintained Sprint 022 and 023 evidence suites.
6. Run JSON, domain, role, Supabase self-test, static, TypeScript, ESLint, production build and `git diff --check`.
7. Scan the diff and generated evidence for secrets, keys, signed URLs, hashes, private filenames, personal information, unsupported claims, dependencies and out-of-scope paths.

## Phase 7 — Closeout

1. Complete the implementation document, closeout, acceptance traceability and changed-file manifest.
2. Refresh state, status, decisions, risks/questions where material, evidence index, schedule, sprint list and Architect briefing.
3. Confirm migrations `0018`–`0021` are unchanged and no external or production mutation occurred.
4. Confirm the original and Sprint 025 worktrees were not modified.
5. Leave all work unstaged and uncommitted unless separately instructed.

Successful outcome: `uploads-and-evidence-management-complete-fail-closed-clean`.

A qualified blocked outcome must identify the exact material boundary without overstating product or Production readiness.

============================================================
FILE: planning/sprints/026-uploads-and-evidence-management/acceptance.md
============================================================

# Sprint 026 — Uploads And Evidence Management Acceptance

## Baseline and scope

- [x] Exact clean baseline `6f8543020e126a4620f09be017744dcc75061e6e`, expected ancestry and isolated branch/worktree are proven.
- [x] Migration ledger is exactly `0001`–`0021`; migrations and remote state are unchanged.
- [x] Sprint 023L closed hosted proof and current fail-closed safety/provider boundary are reconciled.
- [x] Every changed file is in the approved set and mapped in the closeout manifest.
- [x] Dirty `develop` and uncommitted Sprint 025 worktrees are not modified.

## Safe list and status presentation

- [x] Visible evidence is loaded through fresh server-authoritative test/horse/stable/user scope.
- [x] Client-facing items exclude object keys, signed tokens/URLs, hashes, protected errors and unauthorised existence.
- [x] Every relevant lifecycle state has an accurate non-colour label and explanatory context.
- [x] Loading, empty, pending, blocked, retryable failure, deleted/restorable, held, purge-pending, superseded and unexpected-error states are represented safely.
- [x] Replacement lineage preserves the active predecessor until authoritative cutover.
- [x] Unknown or malformed states fail closed with no consequential action.

## Upload and lifecycle management

- [x] Exact acknowledgement starts unchecked and is required before initiation.
- [x] JPEG/PNG/PDF, 5 MiB item, 10-file and 30-MiB test limits are accurate; CSV remains disabled.
- [x] Upload uses the established signed no-overwrite path and distinguishes transfer from safety approval.
- [x] Cancel, safe retry and exact-predecessor replacement behavior are complete.
- [x] Soft delete, restore request/execution, hold/release and governed purge controls appear only when server-authoritative capabilities allow.
- [x] Consequential actions require clear confirmation and cannot double-submit.
- [x] Successful mutations refresh authoritative state; denied/stale/error results never report false success.
- [x] Held evidence cannot be purged and Administrator alone does not gain purge authority.
- [x] Blocked/unavailable evidence exposes no preview, download, signed-read request or availability claim.

## Permission and failure proof

- [x] Positive role/action cases agree with the established application/database/Storage permission contract.
- [x] Anonymous, inactive, suspended, revoked, deleted, unassigned, wrong-horse, wrong-stable, cross-test, insufficient-role, stale and forged cases fail safely.
- [x] Replay, duplicate submission, concurrent mutation and retryable failure behavior is deterministic and idempotent where required.
- [x] Safe errors do not enumerate hidden evidence or reveal internal/provider details.
- [x] No client state or forged capability flag can bypass a fresh server check.

## Privacy, content and accessibility

- [x] The experience remains authenticated and is absent from public pages.
- [x] Purpose, supported limits, Singapore overseas processing, retention/removal authority and unavailable safety status are accurate.
- [x] No diagnosis, guarantee, unsupported safety claim or replacement-of-professional-judgement language appears.
- [x] Status is understandable without colour.
- [x] Keyboard operation, visible focus, error association, live announcements and logical post-action focus pass.
- [x] Reduced motion, 44px touch targets, narrow mobile layout and 200% zoom/reflow pass.
- [x] Tests, fixtures, logs, screenshots and evidence contain no real personal, horse or stable information.

## Validation and closeout

- [x] Maintained Sprint 026 synthetic tests pass.
- [x] Sprint 022 workflow and maintained Sprint 023 evidence regressions pass.
- [x] JSON, domain, roles, Supabase self-test, static, TypeScript and ESLint checks pass.
- [x] Production build passes, or equivalent/stronger safe proof is documented under the Evidence-Proportional Execution Standard.
- [x] `git diff --check`, approved-path, dependency, secret, personal-information and generated-artifact scans pass.
- [x] Documentation, closeout, manifest, planning state and Architect briefing agree.
- [x] No migration, provider/configuration, remote, Production, deployment, alias/domain, staging, commit, push, PR or merge action occurred.

## Acceptable outcomes

`uploads-and-evidence-management-complete-fail-closed-clean` when the full authorised management experience and required proof are complete while unavailable evidence remains safely blocked.

`evidence-management-baseline-blocked-clean` when the exact baseline, ancestry, isolation, ledger or closed Sprint 023L contract cannot be established and no implementation begins.

`evidence-management-contract-conflict-blocked-clean` when implementation requires weakening or materially changing approved lifecycle, role, privacy, retention, deletion, audit, migration or Storage authority.

`evidence-management-validation-blocked-clean` when scoped implementation exists but a required security, permission, privacy, lifecycle, accessibility, regression, build or scope boundary does not pass.

============================================================
FILE: planning/sprints/026-uploads-and-evidence-management/handoff-prompt.md
============================================================

# Builder Handoff — Sprint 026

You are Builder for Sprint 026 — Uploads And Evidence Management.

Apply this Pack in a new isolated worktree based exactly on clean commit `6f8543020e126a4620f09be017744dcc75061e6e`. Verify all four generated sprint files, then implement the sprint completely from them. Do not use or modify the dirty `develop` worktree or the uncommitted Sprint 025 worktree.

Begin by reconciling the closed Sprint 023L evidence contract, ledger `0001` through `0021`, existing safe projections/actions, role capabilities, lifecycle states, lineage, retention, holds, restore/purge and audit boundaries. Build the authenticated mobile-first evidence manager on the existing biochemistry result route. Complete safe listing, exhaustive status presentation, upload retry/cancel, exact-predecessor replacement, permission-aware soft delete, restore, hold/release and governed purge.

Treat every client capability as presentation only. Every operation must freshly recheck authority on the server. Expose no object key, signed token/URL, hash, protected error, hidden existence or unnecessary private metadata. Preserve active predecessors until authoritative replacement cutover. Keep held evidence out of purge. Do not infer purge authority from Administrator status.

No scanner or sanitiser is approved. JPEG, PNG and PDF remain the only supported types; CSV remains disabled. Transferred evidence remains blocked/unavailable and must have no preview, download or signed-read path. Add no provider, SDK, dependency, OCR/parser, malware sample or unrestricted fallback.

Use synthetic data only. Prove role denials, stale/forged/cross-scope requests, replay/concurrency, lineage, all lifecycle controls, fail-closed unavailability, redaction, privacy wording and accessibility/responsive behavior. Run the maintained Sprint 022/023 regression matrix and canonical validation/build gates.

Follow the Evidence-Proportional Execution Standard. Stop only for a material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup boundary. Substitute equivalent or stronger safe proof when a preferred supporting tool is unavailable. Keep in-scope harness, validator, formatting, encoding, reporter and deterministic corrections in Sprint 026. Do not create a follow-up merely for unavailable optional tooling. Use manual intervention only after safe in-scope alternatives are exhausted, and record the required five-part intervention without requesting secrets.

Do not change or apply migrations, mutate Supabase/Vercel, deploy, use real data, change roles/RLS/retention authority, stage, commit, push, merge or open a PR. Finish the complete sprint, produce durable closeout evidence, refresh planning state and leave the work unstaged and uncommitted unless separately instructed.
