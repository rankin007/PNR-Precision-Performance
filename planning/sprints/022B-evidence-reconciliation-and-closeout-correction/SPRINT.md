# Sprint 022B - Evidence Reconciliation And Closeout Correction

## Role And Method

Builder executes this corrective sprint under the `standard` workflow profile.

Architect created this Pack only. Builder applies it, verifies the generated sprint file, and executes from `planning/sprints/022B-evidence-reconciliation-and-closeout-correction/SPRINT.md`.

Sprint 022 remains closed `mobile-workflow-complete` as a product outcome. Sprint 022B corrects evidence classification and closeout wording only. It must not reopen, redesign, or extend the mobile biochemistry workflow.

## Starting Point

Architect review accepted the Sprint 022 implementation direction and found no obvious blocking product-code defect. The focused `npm.cmd run test:domain` gate passed during review.

Two closeout defects remain:

1. The completion review claims `project-root production builds` passed, while the applied Sprint 022 instruction says the project-root build was blocked by OneDrive `UNKNOWN: unknown error, read` and requires the successful non-OneDrive workspace, command, result, and route-smoke outcome to be recorded. The current review records neither the required qualification nor evidence that a later root build superseded it.
2. The review describes edit retention, pending repeat prevention, complete sanitized error mapping, and unavailable submission as workflow-suite coverage. Current focused evidence includes pure deterministic assertions plus source/static string contracts; it does not establish every one of those behaviors through rendered interaction tests, and only a subset of server-error mappings is directly asserted.

The correction must preserve the distinction between:

- deterministic executable assertions;
- static/source contracts;
- manual source or semantic inspection;
- local rendered or route smoke;
- authenticated hosted or real-device cases not run.

## Goal

Make Sprint 022's durable closeout evidence precise, internally consistent, and reviewable so Sprint 023 can begin from trustworthy state.

The Builder must:

- determine the truthful production-build classification from reproducible evidence;
- record the exact build workspace, command, result, and relevant limitation;
- record the exact route-smoke result as passed, failed, or not completed;
- classify each claimed workflow behavior by its actual proof method;
- correct all current planning summaries that overstate production-build or behavioral-test proof;
- retain Sprint 022's `mobile-workflow-complete` product outcome if the accepted local completion boundary remains satisfied; and
- leave a concise 022B review that explains the reconciliation.

## Required Reading

Before editing, Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/STATE.md`
5. `planning/STATUS.json`
6. `planning/ARCHITECT_BRIEFING.md`
7. `planning/SPRINT_SCHEDULE.md`
8. `planning/EVIDENCE_INDEX.md`
9. `planning/sprints/022-mobile-biochemistry-workflow-completion/SPRINT.md`
10. `planning/reviews/022-mobile-biochemistry-workflow-completion.md`
11. `docs/BIOCHEMISTRY_WORKFLOW_022.md`
12. `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`
13. `scripts/test-biochemistry-workflow-022.mjs`
14. `components/ops/biochemistry-workflow-state.ts`
15. `components/ops/biochemistry-capture-workflow.tsx`
16. this applied Sprint 022B file.

## Evidence Reconciliation Method

### 1. Preserve Opening State

Record branch, `HEAD`, index state, and relevant modified/untracked paths without inspecting protected or ignored content. Preserve all pre-existing Sprint 021, Sprint 022, Sprint 029, `.codex-temp`, environment, and unrelated work.

Do not reset, revert, delete, stage, commit, or absorb unrelated changes.

### 2. Reconcile Production-Build Truth

First inspect existing non-sensitive Sprint 022 review text, applied instructions, command output already preserved in maintained evidence, and safe build artifacts by name/status only. Do not infer a pass from a summary sentence.

Use this decision rule:

- If durable evidence proves a later project-root `npm.cmd run build` completed successfully after the recorded OneDrive failure, record the exact command, date/order, result, and why it supersedes the earlier blocker.
- If no such durable evidence exists, do not claim a project-root pass. Record the OneDrive-root failure exactly as the applied Sprint 022 instruction requires.
- Record the successful non-OneDrive production build only when its exact workspace class/path, command, exit result, and available output evidence can be stated without exposing protected content.

Builder may run at most one fresh bounded credential-free project-root `npm.cmd run build` if existing evidence cannot resolve the classification. If it passes, record that new evidence. If it fails, hangs, or repeats the OneDrive error, stop the attempt, preserve the exact failure class, and use the already accepted non-OneDrive proof boundary.

Builder may create one disposable non-OneDrive validation copy under `C:\tmp` only if the prior successful non-OneDrive build cannot be evidenced accurately and a fresh proof is necessary. Copy only maintained project inputs, exclude `.git`, environments, protected/ignored content, `.next`, `node_modules`, caches, and unrelated evidence, use the existing lockfile without dependency changes, and remove only the exact owned disposable directory after recording non-sensitive results. If safe dependency availability would require network access, stop and use the five-part manual intervention record; do not contact the network.

Do not describe a reparse-safe or non-OneDrive build as a project-root build.

### 3. Reconcile Route Smoke

Determine whether the bounded credential-free route smoke required by Sprint 022 actually completed.

Record for each attempted route:

- execution environment;
- whether the local server started;
- observed status/redirect class;
- pass, fail, or `NOT COMPLETED - interrupted or unavailable local smoke server startup`.

Do not infer rendered, authenticated, or result-route acceptance from build output or route inventory. Do not start a server unless a safe existing local build is available. Use a hard timeout and clean up only Builder-owned processes.

### 4. Reclassify Workflow Coverage

Create a compact evidence matrix for at least:

- empty required fields;
- invalid and non-finite numeric input;
- zero and decimal retention;
- optional and over-limit notes;
- normalization and review values;
- edit retention;
- submitting label and ordinary repeat-activation guard;
- every supported sanitized server-error code and unknown fallback;
- unavailable-environment submission state;
- scored, exact-lookup-blocked, threshold-unavailable, and recommendation-unavailable results;
- labels, field/error associations, error-summary behavior, keyboard order, status announcements, mobile layout, and 200% zoom.

For every row, classify evidence only as one or more of:

- `EXECUTABLE ASSERTION`;
- `STATIC SOURCE CONTRACT`;
- `MANUAL SOURCE INSPECTION`;
- `LOCAL RENDERED/ROUTE PROOF`;
- `AUTHENTICATED HOSTED/REAL-DEVICE NOT RUN`.

Do not call source-string presence a behavioral test. Do not call a mapping complete unless each supported code and the unknown fallback are directly asserted or the claim is explicitly classified as static/source inspection.

Builder may add missing deterministic assertions to `scripts/test-biochemistry-workflow-022.mjs` only when they exercise existing pure functions without changing runtime behavior. Do not add a browser framework, component harness, dependency, production code, or new product behavior.

## Approved File Scope

Builder may create or edit only:

- `planning/sprints/022B-evidence-reconciliation-and-closeout-correction/SPRINT.md`
- `planning/reviews/022B-evidence-reconciliation-and-closeout-correction.md`
- `planning/reviews/022-mobile-biochemistry-workflow-completion.md`
- `planning/sprints/022-mobile-biochemistry-workflow-completion/SPRINT.md`, closeout wording only
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/EVIDENCE_INDEX.md`
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`, evidence wording only if needed
- `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`, evidence-status wording only if needed
- `scripts/test-biochemistry-workflow-022.mjs`, deterministic assertion additions only

Builder may not edit application source, components, domain/runtime logic, package files, validation orchestration, dependencies, configuration, migrations, auth/RLS, schema, environment files, deployment files, public routes, commerce, or unrelated planning history.

If reconciliation discovers an actual runtime defect, stop and report it for a later `022C` Pack. Do not repair it in Sprint 022B.

## Strict Boundaries

Do not:

- inspect, print, hash, copy, scan, or expose protected/local-only content;
- contact Supabase, Vercel, Stripe, GitHub, email, DNS, package registries, or other remote systems;
- create authenticated users, sessions, records, fixtures, callbacks, or storage objects;
- change production code, schema, migrations, RLS, auth, roles, domain formulas, thresholds, recommendations, or public behavior;
- add dependencies;
- deploy, publish, push, fetch, pull, open a PR, merge, tag, or release;
- stage or commit;
- claim authenticated hosted, rendered interaction, real-device, field, clinical, deployment, or production readiness from local/static evidence.

## Validation

Run the minimum credential-free checks needed to prove the corrected record:

1. Sprint 022B Pack format check.
2. Post-apply dry-run confirming the generated Sprint 022B file matches the Pack.
3. `npm.cmd run test:domain`.
4. `npm.cmd run validate:json` after planning JSON changes.
5. `npm.cmd run typecheck` only if the focused test file changes.
6. The bounded build/route proof permitted above only when required to resolve evidence truth.
7. `git diff --check` on the approved Sprint 022B file set.
8. Final `git status --short --branch`, confirming the index is empty and unrelated work remains preserved.

Do not rerun broad remote, authenticated, deployment, or provider-dependent suites. Existing canonical validation results may be retained only with their exact original scope and qualification.

## Required Review

Create `planning/reviews/022B-evidence-reconciliation-and-closeout-correction.md` containing:

- opening repository and index boundary;
- the two Architect review findings;
- evidence inspected without protected content;
- final project-root build classification;
- exact non-OneDrive build evidence or the reason it cannot be restated;
- route-smoke classification by route;
- workflow evidence matrix by proof method;
- every wording correction and file changed;
- focused validation results;
- confirmation that runtime/product behavior was not changed;
- preserved Sprint 022 outcome and remaining limitations;
- final index/worktree boundary; and
- next recommendation.

## Acceptance

Sprint 022B is complete when:

- no maintained file ambiguously claims that project-root builds passed unless exact superseding evidence is recorded;
- the OneDrive-root failure and accepted non-OneDrive proof are stated accurately when they remain the governing evidence;
- build workspace, command, result, and route-smoke outcome are recorded precisely;
- behavioral coverage claims distinguish executable assertions, static contracts, manual inspection, local rendered proof, and not-run hosted/real-device cases;
- sanitized error mapping is called complete only if every supported code and unknown fallback is directly asserted, otherwise its actual proof scope is stated;
- `STATE.md`, `STATUS.json`, briefing, schedule, Sprint 022 review, applied Sprint 022 closeout, and evidence index agree;
- Sprint 022 remains `mobile-workflow-complete` only within its qualified local typed-workflow boundary;
- Sprint 023 remains the next product candidate under its own Architect Pack;
- no runtime/product file, dependency, schema, auth/RLS, remote system, deployment, or unrelated work changed;
- required focused validation passes or an exact blocker is documented; and
- the Git index is empty.

## Manual Intervention And Failure Handling

For every true blocker, Builder must record:

1. what is blocked or not working;
2. evidence already checked;
3. exact user/manual action needed;
4. numbered steps for that action; and
5. what Builder will verify afterward.

Expected not-run items are authenticated hosted workflow proof, real-device field acceptance, production thresholds/recommendations, remote backup, deployment, and public reopening. They are not Sprint 022B blockers and must not be presented as passed.

## Outcomes

- `evidence-reconciled-clean`: all Sprint 022 closeout claims match durable evidence; product outcome remains qualified `mobile-workflow-complete`; index empty.
- `evidence-reconciliation-blocked-clean`: no approved correction is staged or committed; exact missing evidence or unsafe proof requirement is documented; index empty.

Neither outcome implies new workflow implementation, authenticated hosted proof, real-device acceptance, durable idempotency, production scoring/advice, deployment, public reopening, or production readiness.

## Completion Status — 2026-07-27

Outcome: `evidence-reconciled-clean`.

Sprint 022 remains qualified `mobile-workflow-complete`. One exact later project-root build passed in 14.6 seconds, superseding the earlier root failure for current classification; the earlier non-OneDrive proof lacks an exact maintained record and is not reconstructed. Required route smoke was not completed. Durable records now distinguish executable assertions, static/source contracts, manual inspection, and authenticated hosted/real-device work not run. No runtime/product behavior changed, and the index is empty.
