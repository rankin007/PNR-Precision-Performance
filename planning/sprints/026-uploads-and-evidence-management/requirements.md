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
