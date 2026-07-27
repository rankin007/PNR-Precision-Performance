# Sprint 022 - Mobile Biochemistry Workflow Completion

## Role And Method

Builder executes this sprint under the `standard` workflow profile.

Strict controls still apply to auth/RLS, schema and migrations, secrets and protected evidence, production data, billing, destructive actions, remote systems, external publication, deployment, and public reopening.

Architect created the Pack only. Builder applies the Pack, verifies this generated sprint file, and works from the applied `planning/sprints/022-mobile-biochemistry-workflow-completion/SPRINT.md`.

## Current Starting Point

Current durable state says Sprint 029L is closed as `scoped-release-branch-backed-up`, the Sprint 029 marketing-preview front page is live and backed up on branch `codex/029-marketing-preview-release`, and unresolved active 021-series dirty work remains outside this sprint.

The next product sprint is Sprint 022 - Mobile Biochemistry Workflow Completion. It may proceed locally within existing schema and typed-note boundaries without waiting for Supabase/provider resolution.

Builder must verify the actual opening repository state before applying or editing:

- branch and upstream relation;
- current `HEAD`;
- staged, modified, and untracked files;
- whether unrelated 021-series/auth/Supabase dirty work is present;
- whether `planning/architect-packs/architect-pack-022-mobile-biochemistry-workflow-completion.md` was already untracked before application.

Do not reset, revert, delete, absorb, stage, or commit unrelated work. If unrelated existing changes affect an approved file, work with them carefully and record the boundary in the review.

## Goal

Complete the existing local mobile biochemistry workflow so an authorized operational user can:

- select horse and test context;
- enter the currently approved typed readings and optional typed notes;
- understand required, optional, invalid, blocked, and unavailable states;
- review all entered values before submission;
- return to edit without losing values;
- submit once with clear pending feedback and client-side repeat-activation prevention;
- reach a result surface that clearly distinguishes scored, blocked/unscored, threshold-unavailable, recommendation-unavailable, and failure states;
- recover safely from correctable failures; and
- use a documented field-trial script later when authenticated hosted proof is available.

This sprint completes the typed workflow only. It does not add uploads, photos, OCR, voice, transcription, new measurements, schema changes, production thresholds, recommendations, deployment, push, PR, or public reopening.

## Required Reading

Builder must read before source edits:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
5. `planning/STATE.md`
6. `planning/STATUS.json`
7. `planning/ARCHITECT_BRIEFING.md`
8. `planning/DECISIONS.md`
9. `planning/RISKS.md`
10. `planning/QUESTIONS.md`
11. `planning/SPRINT_SCHEDULE.md`
12. `planning/EVIDENCE_INDEX.md`
13. Sprint 018 files under `planning/sprints/018-mobile-biochemistry-capture-results/`
14. Sprint 019 and 019B files relevant to portal UI and mobile constraints
15. `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`
16. `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
17. `docs/BIOCHEMISTRY_SCORING_014.md`
18. `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`
19. `app/(ops)/data-entry/biochemistry/page.tsx`
20. `app/(ops)/data-entry/biochemistry/actions.ts`
21. `app/(ops)/data-entry/biochemistry/[testId]/page.tsx`
22. `components/ops/biochemistry-result-panel.tsx`
23. `lib/domain/biochemistry.ts`
24. the applied Sprint 022 `SPRINT.md`

## Product And Domain Boundaries

Preserve current data and scoring contracts:

- fields remain horse, test date, `AM` / `PM` / `Unspecified`, Carbs, pH Saliva, pH Urine, raw conductivity meter value, Urea, and optional typed notes;
- pH Average remains `(pH Saliva + pH Urine) / 2`;
- raw conductivity converts to C by multiplying by `1.43`;
- Salts lookup continues to use converted C;
- lookup behavior remains exact only, with no rounding, interpolation, nearest, next-lower, fallback, or invented default;
- missing lookup values remain blocked/unscored;
- persisted/internal `healthScore` and related contracts are not renamed;
- display text may use `Biochemistry Trend Score` only as a display-only label with clear pending production interpretation;
- production status thresholds remain unavailable unless separately approved;
- recommendations remain unavailable unless active approved rules are supplied;
- fixture-only thresholds and recommendation text must never appear as live or production advice.

Do not add min/max measurement ranges, ideal pH statements, device calibration rules, clinical interpretations, urgency rankings, dosage, treatment, feed advice, or other domain meaning that is not already authoritative.

## Experience Requirements

### Guided Mobile Capture

Replace the long undifferentiated capture experience with a coherent mobile-first workflow that also remains efficient on tablet and desktop.

The workflow must visibly group:

- horse and test context;
- measurements;
- optional typed notes;
- review and submission.

Requirements:

- use a single-column mobile layout with stable spacing and touch targets suitable for field use;
- retain a compact responsive layout on larger screens without changing the app shell;
- show progress or current-stage context with text, not colour alone;
- keep the main next action easy to reach without covering inputs, errors, focus targets, browser chrome, or the on-screen keyboard;
- use semantic form controls, visible labels, useful existing units/context, and field-level error association;
- retain entered values when moving between capture and review and when returning to correct client-detectable errors;
- never auto-submit on a stage transition;
- do not make unavailable photo or voice features look actionable.

### Validation And State Model

Create or refine a small typed, deterministic workflow-state and validation layer that can be exercised without Supabase.

It must distinguish:

- empty required value;
- syntactically invalid numeric value;
- non-finite numeric value;
- valid numeric value, including zero and decimal values where the current contract accepts them;
- optional empty notes;
- notes over the existing 2,000-character limit;
- capture stage;
- review stage;
- submitting state;
- correctable server-returned failure;
- unavailable live-capture state.

Client validation improves guidance but does not replace server validation. The server action remains authoritative and must validate normalized form input safely.

Do not infer domain-valid measurement ranges. A finite number is syntactically acceptable unless an existing authoritative rule says otherwise.

### Review And Correction

Before submission, present a review surface containing:

- selected horse name;
- date and time-of-day label;
- all five entered measurements with unambiguous labels;
- typed notes or `No notes added`;
- an Edit action that returns to correction without clearing values;
- one explicit Submit action.

Review content must be readable without relying on layout, colour, or icons. It must not calculate or preview production zones or recommendations.

### Submission Lifecycle

Submission must:

- show a clear pending label such as `Submitting test...`;
- disable or otherwise guard the submit control while the current request is pending;
- prevent ordinary rapid repeat activation from issuing duplicate submissions in the same client interaction;
- retain existing server-side auth/access and persistence checks;
- redirect successful saves to the saved result route;
- expose only sanitized user-facing failures;
- provide a clear path back to correction or retry where retry is safe.

Do not claim durable idempotency unless it is actually implemented and proven. Do not add an idempotency column, database constraint, schema change, or migration in this sprint. Document client-side repeat prevention as a residual limitation.

### Failure And Recovery

Unify user-facing failure presentation for at least:

- missing fields;
- invalid number;
- notes length;
- inaccessible horse;
- Supabase not configured;
- biochemistry schema unavailable;
- lookup rows unavailable;
- save failure;
- unknown safe fallback.

Correctable failures should preserve or reconstruct non-sensitive submitted values where feasible without putting typed notes or sensitive stable data in URL query parameters. If the current server-action flow prevents safe automatic restoration after redirect, document the limitation and provide a clear correction path.

Unavailable live capture must be visibly distinct from user validation error and must not present an enabled submit action that can only fail.

### Result And Next Action

Refine the saved-result experience so a user can understand:

- which horse/test is shown;
- whether scoring succeeded or is blocked;
- raw and derived values already supported by the stored snapshot;
- display-only `Biochemistry Trend Score` terminology while retaining internal compatibility;
- missing exact-lookup blockers when unscored;
- why zones are unavailable without approved thresholds;
- why recommendations are unavailable without approved content;
- formula/source version where currently available;
- safe next actions, such as returning to capture another test or reviewing permitted notes.

Any red, amber, or green presentation must include a text label and enough context. Since production thresholds are absent, do not introduce status colours that imply an invented classification.

### Accessibility And Responsive Behavior

Verify across capture, review, pending, failure, and result states:

- logical heading hierarchy;
- visible labels for controls and displayed measurements;
- error summary or equivalent focusable notification plus field-level association where relevant;
- programmatic required/invalid state;
- predictable keyboard order and visible focus;
- no keyboard trap;
- status/pending messages exposed to assistive technology without disruptive repeated announcements;
- phone width and 200% zoom without horizontal page scrolling;
- primary action does not cover content or focus targets;
- colour is never the only carrier of meaning;
- reduced-motion preference is respected if new motion is introduced;
- marketing claims, veterinary implications, and confidential records remain excluded.

## Testing And Local Proof

Add focused deterministic tests or validation scripts for the workflow. Use the existing dependency set; do not add a browser or test framework dependency solely for this sprint.

Automated local proof must cover, as far as feasible with existing tools:

- initial capture state;
- empty required fields block review;
- invalid and non-finite numeric input is rejected;
- zero and valid decimals are retained correctly;
- optional notes may be empty;
- over-limit notes are rejected;
- valid capture reaches review;
- review exposes normalized values;
- Edit returns without data loss;
- pending state prevents repeat activation;
- sanitized error mapping covers every supported server error code and unknown fallback;
- unavailable environment disables live submission;
- result view preserves scored, blocked, zone-unavailable, and recommendation-unavailable distinctions;
- no fixture-only domain content is wired into runtime UI.

Prefer testing extracted pure state/validation/presentation helpers plus focused static UI contracts. If component rendering cannot be tested with installed tools, combine pure tests, static checks, build proof, and the manual local route matrix.

If the Sprint 022 test command is deterministic and credential-free, add it to the maintained validation interface and include it in `validate:ci` and `validate:local`.

## Field-Trial Package

Create `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md` or equivalent concise checklist for later authenticated execution.

It must define:

- supported phone viewport(s), desktop viewport, keyboard-only pass, and screen-reader-oriented semantic inspection;
- start/end timing points for capture completion, without claiming an under-60-second result;
- capture, review, edit, submit, pending, success, blocked lookup, unavailable environment, and safe retry cases;
- what evidence may be recorded without exposing horse/stable/private data;
- expected outcome per case;
- defect/observation fields;
- explicit distinction between locally verified behavior and authenticated hosted behavior not yet proven.

Run every credential-free local case feasible with the available environment. Authenticated hosted cases remain deferred and must be marked `NOT RUN - provider/auth dependency`, not passed by inference.

Do not use real identifiable horse, trainer, stable, mailbox, credential, or production data for local fixtures or screenshots.

## Documentation

Create or update concise documentation covering:

- completed workflow and route map;
- field/state definitions;
- client versus server validation;
- review/edit/submit lifecycle;
- duplicate-click prevention and absence of durable idempotency;
- failure/retry behavior;
- scored, blocked, and unavailable result semantics;
- accessibility and responsive decisions;
- local automated evidence;
- field-trial procedure and remaining authenticated dependency;
- unchanged domain, schema, auth, privacy, remote, and production boundaries.

Update planning files at close without copying long historical narratives into them.

## Approved File Scope

Builder may create or edit:

- `app/(ops)/data-entry/biochemistry/**`
- `components/ops/biochemistry-*.tsx`
- focused new biochemistry workflow components/helpers under `components/ops/**`
- `lib/domain/biochemistry.ts`, only for narrow types/pure helpers that preserve scoring behavior
- `lib/domain/horses.ts`, only if required to expose already-authorized accessible-horse display data
- `lib/navigation.ts`, only if workflow navigation requires correction
- focused Sprint 022 tests/validators under `scripts/**`
- `scripts/run-validation-suite.mjs`
- `scripts/test-run-validation-suite.mjs`
- `scripts/README.md`
- `package.json`
- `package-lock.json` only if npm changes script metadata without dependency/version changes
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`, only to mark it as the earlier foundation and link current authority
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`
- `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`
- `docs/VALIDATION.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only if durable content changes
- `planning/EVIDENCE_INDEX.md`
- `planning/reviews/022-mobile-biochemistry-workflow-completion.md`
- this applied `SPRINT.md`
- up to 30 additional maintained text files for bounded in-sprint remediation.

Builder may inspect but must not edit without stopping and reporting scope expansion:

- `lib/auth/**`
- `lib/supabase/**`
- `middleware.ts`
- `supabase/**`
- public/shop/commerce routes
- deployment configuration
- real environment files
- protected/local-only evidence

## Bounded In-Sprint Remediation

Builder may repair problems discovered during implementation or validation when the repair:

- is reproducible and directly affects the Sprint 022 workflow or its verification;
- remains within approved file scope;
- preserves existing schema, auth/RLS, domain formulas, roles, public behavior, and remote boundaries;
- is a UI state, accessibility, responsive, type, import, lint, formatting, deterministic-test, documentation, or non-sensitive error-handling correction;
- adds no dependency;
- affects no more than 30 additional maintained text files beyond expected files; and
- is recorded in the completion review.

Stop for material product expansion, schema/migration changes, auth/RLS or role changes, new domain meaning, secrets/protected content, a new dependency, destructive work, remote/production action, or work beyond this remediation allowance.

## Strict Boundaries

Do not:

- inspect, print, hash, copy, scan, stage, or commit protected/local-only contents;
- contact Supabase, Vercel, Stripe, GitHub APIs, email, DNS, or other remote systems;
- rerun Sprint 021 hosted Auth/JWT or browser proof work;
- create users, sessions, fixtures, callbacks, storage objects, or remote records;
- change schema, migrations, RLS, policies, roles, permissions, auth behavior, or Supabase configuration;
- add uploads, Storage, photos, OCR, voice recording, transcription, browser permissions, or provider integration;
- invent or activate score thresholds, zones, recommendations, clinical advice, calibration rules, or measurement ranges;
- rename internal/persisted `healthScore` contracts;
- change public claims, commerce, pricing, billing, Stripe, the under-construction gate, or public reopening;
- add dependencies or perform major upgrades;
- deploy, publish, push, fetch, pull, create a PR, merge, tag, or release;
- use identifiable or confidential stable data in fixtures, screenshots, logs, URLs, or reports;
- claim authenticated, hosted-runtime, cutover, production, clinical, or field acceptance from local/static evidence.

Ignored/local-only exclusions remain:

- `.env*` except tracked placeholder-only `.env.example`;
- `.release-main/**`;
- `.claude/**`;
- `planning/reviews/021M-supabase-support-escalation.md`;
- `.next/**`, `build/**`, `node_modules/**`;
- credentials, tokens, cookies, sessions, protected browser/process material, logs, caches, and temporary Supabase link state.

## Validation

## Accepted Closeout Instruction - Non-OneDrive Build Proof

The user accepted the Architect recommendation to use the proven non-OneDrive validation workspace as the official Sprint 022 build-proof path for final validation and closeout.

Builder should proceed as follows:

1. Make one short bounded retry of credential-free route smoke from the non-OneDrive temp build workspace where the production build already passed. Run `next start` with separate stdout/stderr logs, a hard timeout, and owned-process cleanup. Attempt to verify:
   - `/data-entry/biochemistry`
   - `/data-entry/biochemistry/sample-result`
   - `/sign-in`
2. If the bounded route-smoke retry succeeds, record the route evidence normally. If it hangs, times out, or is interrupted again, stop cleanly, kill only the owned server process(es), and record route smoke as `NOT COMPLETED - interrupted or unavailable local smoke server startup`, not as passed.
3. Record the project-root build blocker in `planning/reviews/022-mobile-biochemistry-workflow-completion.md`: root `npm.cmd run build` is blocked by OneDrive `UNKNOWN: unknown error, read` during page-data collection.
4. Record the non-OneDrive temp workspace production build as the valid Sprint 022 build proof, including the workspace path, command, result, and available evidence. The accepted build proof, lint, typecheck, domain tests, and deterministic Sprint 022 tests are sufficient to proceed with closeout if the bounded route smoke is accurately recorded as not completed.
5. Complete closeout updates to:
   - `planning/reviews/022-mobile-biochemistry-workflow-completion.md`
   - `planning/STATE.md`
   - `planning/STATUS.json`
   - `planning/ARCHITECT_BRIEFING.md`
   - `planning/EVIDENCE_INDEX.md`
   - this applied Sprint 022 `SPRINT.md`
6. Run final lightweight checks at minimum:
   - `npm.cmd run lint`
   - `npm.cmd run typecheck`
   - `npm.cmd run test:domain`
   - `git diff --check`
   - `git status --short --branch`

No user action is required for Sprint 022 closeout unless the user later requires production builds to pass directly inside the OneDrive project root. If that policy changes, the durable fix is to move or clone the repository to a non-OneDrive directory, or keep a clean non-OneDrive validation workspace as the standing official build-proof path.

This instruction does not authorize remote access, deployment, push, PR, production mutation, schema/auth/RLS changes, or inspection of protected material.

Before closeout, Builder must pass or record exact blockers for:

1. Sprint 022 Pack format check.
2. Focused workflow state/validation tests.
3. Focused error-map and result-state tests/static contracts.
4. Validation-orchestrator self-tests if orchestration changes.
5. `npm run validate:json`.
6. `npm run test:domain`.
7. `npm run test:roles`.
8. `npm run test:supabase-self`.
9. `npm run validate:static`.
10. `npm run lint`.
11. `npm run typecheck`.
12. `npm run build` under the existing bounded local retry / reparse-safe workspace rule.
13. `npm run validate:local`.
14. CI-equivalent `npm run validate:ci`.
15. Credential-free local route checks feasible without authenticated Supabase.
16. Manual source/semantic accessibility inspection against the Sprint 022 checklist.
17. Phone-width, desktop-width, keyboard, 200% zoom, slow/pending, error, review/edit, and result-state checks where the local environment permits them.
18. Route inventory comparison against the current baseline; explain every route change.
19. All maintained Architect Pack format checks.
20. All maintained JSON parsing.
21. High-confidence secret scan over intended sprint paths without outputting values.
22. Confidential-fixture and URL-query review.
23. Binary/mode review.
24. `git diff --check`.

Automated checks must be deterministic and credential-free. A missing authenticated session or unavailable local runtime fixture does not authorize remote access.

## Required Review

Create `planning/reviews/022-mobile-biochemistry-workflow-completion.md` containing:

- outcome and concise delivered workflow;
- opening and closing repository state, including unrelated dirty work boundaries;
- files changed and why;
- capture/review/edit/submit/result flow evidence;
- validation and normalization behavior;
- submission pending/repeat-prevention behavior and durable-idempotency limitation;
- failure/recovery mapping;
- scored, blocked, and unavailable result treatment;
- accessibility and responsive evidence;
- focused automated case results;
- local route/field-trial cases run, not run, and why;
- complete validation results and durations;
- route inventory comparison;
- bounded remediation used, if any;
- residual domain, authenticated, field, provider, and remote-backup limitations;
- confirmation of no protected inspection, remote access, migration, auth/RLS, schema, upload, voice, billing, deployment, public reopening, or invented domain behavior;
- next recommendation based on actual completion evidence.

## Commit And Closeout

Do not commit unless the user separately asks for a commit.

At close, Builder should:

- update the applied Sprint 022 file with concise completion status;
- update current planning files listed in approved scope;
- leave the branch on `develop` unless the user separately asks for branch work;
- leave the index empty;
- preserve unrelated dirty work;
- record whether non-ignored working tree changes are Sprint 022, pre-existing unrelated work, or both;
- run `git status --short --branch` and include the result class in the review.

No remote backup, push, PR, deployment, production mutation, public reopening, or `develop` reconciliation is included in this sprint.

## Acceptance

Sprint 022 is complete when:

- the existing capture foundation is a coherent mobile-first capture -> review -> edit/submit -> result/recovery workflow;
- every current field is clearly labelled and no new domain field or rule is invented;
- typed notes remain optional and enforce the existing 2,000-character limit;
- valid entered values survive capture/review correction transitions;
- validation distinguishes required, numeric, notes-length, environment, server, and unknown safe states;
- review exposes every submission value and permits correction before submission;
- pending feedback and client-side repeat prevention work without claiming durable idempotency;
- unavailable live capture cannot be submitted as though available;
- successful, blocked/unscored, threshold-unavailable, recommendation-unavailable, and failure states remain distinct;
- display-only score terminology does not rename internal contracts or imply approved production interpretation;
- result and status meaning never relies on colour alone;
- phone, desktop, keyboard, zoom, focus, label, error, and assistive-status requirements are verified as far as credential-free local execution permits;
- focused deterministic tests cover the required interaction/state matrix;
- canonical local and CI-equivalent validation pass or exact blockers are documented;
- the field-trial package is ready for later authenticated execution and makes no speed claim;
- closeout review and planning files are updated;
- no strict boundary is crossed.

## Manual Intervention And Failure Handling

For every true blocker or unavailable manual case, Builder must record:

1. what is blocked or not working;
2. evidence already checked;
3. exact user/manual action needed;
4. numbered steps for that action; and
5. what Builder will verify afterward.

Expected external/manual items that remain outside Sprint 022:

- Supabase provider remediation and later authenticated proof;
- approved production thresholds, score terminology, pH/device rules, and recommendation content;
- authenticated field-trial users/fixtures after auth proof is restored;
- upload/storage/privacy decisions;
- voice/transcription/provider decisions;
- push/PR or other remote backup;
- deployment and public reopening.

If a strict boundary blocks completion, preserve in-scope files, unstage exact sprint paths if anything was staged, prove the index is empty, and close with a five-part intervention record.

## Outcomes

- `mobile-workflow-complete`: local typed workflow, focused tests, field-trial package, validation, review, and planning closeout are complete.
- `mobile-workflow-blocked-clean`: no sprint source change is staged or committed; a true strict-boundary blocker is documented and the index is empty.
- `mobile-workflow-closeout-blocked`: implementation work exists, but bounded documentation or validation closeout could not safely finish; exact recovery steps are documented.

No outcome implies authenticated hosted proof, durable server idempotency, approved production scoring/advice, field acceptance, remote backup, deployment, public reopening, or production readiness.

## Completion Status — 2026-07-27

Outcome: `mobile-workflow-complete`.

The local typed capture, review/edit, guarded submit, sanitized recovery, and result workflow is complete within a qualified local/static boundary. `test:domain` provides deterministic pure assertions plus source-string contracts; it is not a rendered component test. JSON, roles, Supabase self-tests, static validation, lint, typecheck, `validate:local`, and `validate:ci` passed. The original project-root build failed with OneDrive `UNKNOWN: unknown error, read`; Sprint 022B later ran one exact project-root `npm.cmd run build` successfully in 14.6 seconds, which supersedes that earlier failure for current build classification. The exact earlier non-OneDrive workspace/result was not preserved in maintained evidence and is not restated.

The bounded local route smoke was `NOT COMPLETED - interrupted or unavailable local smoke server startup`; no rendered acceptance is inferred. Authenticated hosted and real-device cases remain `NOT RUN - provider/auth dependency`. Client repeat prevention is not durable idempotency. No strict boundary was crossed, no route was added, the index is empty, and unrelated dirty work remains preserved.
