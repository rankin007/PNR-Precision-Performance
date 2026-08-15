# Architect Pack — Sprint 035R Trainer Daily Cockpit and Timed Mobile Workflow

Created: 2026-08-11
Workflow profile: strict
Flight class: critical
Primary target: iPhone XS Max portrait, 414 × 896 CSS pixels
Reviewer: user-nominated guided reviewer; not independent trainer field acceptance

This Pack creates the strict Builder sprint files. It does not apply itself, edit Product code, apply a migration, deploy, create credentials, send email/enquiries, or move aliases.

============================================================
FILE: planning/sprints/035R-trainer-daily-cockpit-and-timed-mobile-workflow/requirements.md
============================================================

# Sprint 035R Requirements

## Outcome

Create a clinically neutral, phone-first trainer cockpit and horse-aware biochemistry review path. It must show which accessible horses have a latest record dated today, which are incomplete, what workflow state changed since the prior accessible record, and what useful action comes next. Produce visible and timed evidence at the iPhone XS Max portrait target.

## Authority and limitations

- Primary viewport: iPhone XS Max portrait, 414 × 896 CSS pixels.
- The user-nominated reviewer will perform a guided no-submit phone review when Builder provides a safe local step.
- “Today” is the current Australia/Brisbane calendar date and must be displayed explicitly.
- One guided review is a usability observation, not independent trainer acceptance, Sprint 035S completion, or authority for a public/universal “under 60 seconds” claim.
- Sprint 025C numeric behavior remains unchanged and local-only. Do not apply migration 0024 or deploy.

## Required behavior

1. From accessible records only, show the Brisbane date and counts for: latest record dated today; latest state draft/incomplete or pending review; and no accessible result. Failure shows unavailable with no inferred count/action.
2. Each horse card shows horse/stable, latest workflow/date, one primary action, and “Changed from <prior label>”, “Workflow state unchanged”, or “No earlier workflow record for comparison”.
3. Keep semantics operational only. Do not imply clinical urgency, health priority, treatment or race readiness; no Green/Amber/Red classification, threshold, recommendation or color-only meaning.
4. Use existing permissions:
   - writable + no result: Capture biochemistry with horseId=<accessible id>;
   - writable + incomplete/pending: Review current record;
   - writable + completed: Capture another test with horseId=<accessible id>;
   - read-only: Open horse workspace;
   - failed load: no record action and safe reload guidance.
5. Horse detail uses the same action derivation. Completed must not loop back to the same workspace as its only action.
6. horseId query input is a hint only. Preselect only an exact accessible-horse match; silently ignore missing/malformed/inaccessible values; keep selection editable; server permission/validation stays authoritative.
7. Default new-capture date to Brisbane today and time to AM before 12:00 Brisbane time or PM from 12:00. Use a pure/injected clock, keep defaults editable and never overwrite user edits.
8. Retain four readings, units, inclusive ranges, client/server validation, note review and repeat-tap protection. Review shows exact horse/date/AM-PM/readings/note before submit.
9. Remove stale “Exact lookup only” wording. Replacement must not contradict exact-or-next-lower v2 behavior.
10. Add clear authenticated Portal-to-capture and Operations-to-dashboard links without changing guards/permissions. Keep admin bootstrap behavior intact but visually separate from trainer work.
11. At 414 × 896: no unintended horizontal overflow or clipped core action; core content readable; applicable targets at least 44 × 44 CSS pixels; labels, focus/errors, landmarks and textual status available. At 1440 × 900 and 200% zoom, retain core content/actions.
12. Create synthetic-only screenshots under evidence/professional-engineering/035R-trainer-daily-cockpit-and-timed-mobile-workflow/visuals/:
    - cockpit at 414 × 896;
    - preselected capture/defaults at 414 × 896;
    - populated review at 414 × 896;
    - cockpit at 1440 × 900.
    Link/show them in the Builder report/handoff. No real horse/person, email, credential, token, provider identifier or confidential data.
13. Timed phone task: start before tapping the synthetic horse’s capture action; verify defaults; enter Builder’s four synthetic readings; tap Review test; stop when complete review is visible; do not submit. Record device/orientation/boundaries/fixture/elapsed time/friction/outcome as one observation.
14. If actual phone access would require deployment, public tunnel, credentials, real data or out-of-scope external action, follow the Manual Intervention Rule. Emulation proves layout, not actual-device completion.

## Hard boundaries

Reuse existing auth, RLS, visibility and permissions. No schema, migration, RLS, auth, permission, role, formula, clinical-authority or provider change. No real data, migration 0024 application, deployment, credential action, email, enquiry, alias movement, commit or push.

## File boundary

Product/test files only:

- app/(portal)/portal/page.tsx
- app/(portal)/portal/horses/[horseId]/page.tsx
- app/(ops)/data-entry/biochemistry/page.tsx
- components/ops/biochemistry-capture-workflow.tsx
- components/ops/biochemistry-workflow-state.ts
- components/portal/trainer-cockpit.tsx (new)
- lib/domain/stable-workspace.ts
- lib/domain/horses.ts
- lib/navigation.ts
- scripts/test-trainer-dashboard-035.mjs
- scripts/test-trainer-cockpit-035R.mjs (new)
- scripts/run-validation-suite.mjs
- package.json

Plus Sprint 035R evidence/review/sprint files and required closeout updates to planning/STATE.md, STATUS.json, ROADMAP.md, ARCHITECT_BRIEFING.md, QUESTIONS.md, DECISIONS.md, RISKS.md, FINAL_PRODUCT_ACCEPTANCE_MATRIX.md and delivery_road_map.md. The evidence boundary may contain a separate local Next evidence app generated and controlled by scripts/test-trainer-cockpit-035R.mjs. It must import the same production TrainerCockpit and BiochemistryCaptureWorkflow components, contain synthetic data only, add no Product route or auth bypass, and never be deployed.

## Evidence-Proportional Execution Standard

Stop only for material target, authority, security, privacy, destructive, integrity, production, scope, cleanup or real-device risk. Substitute equivalent or stronger safe proof for unavailable supporting tools. Keep deterministic in-scope harness/validator/format/report corrections in this sprint. Do not create a follow-up only because browser automation, a renderer, Docker, clipboard or optional CLI is unavailable. Never weaken an actual-device claim. Use manual intervention only after safe alternatives are exhausted; record exact steps and follow-up verification.

============================================================
FILE: planning/sprints/035R-trainer-daily-cockpit-and-timed-mobile-workflow/blueprint.md
============================================================

# Sprint 035R Blueprint



## Flight evidence





- Class: critical, because untrusted horse query input crosses access-controlled horse data and the evidence flow may be exposed to a trusted local network.


- Acceptance invariant: counts/actions use only accessible records; horseId never expands access or reveals another horse; permission uncertainty yields no action; Brisbane defaults are deterministic; presentation is clinically neutral; evidence is synthetic only.


- Trace: searchParams horseId -> biochemistry page -> accessible horse query -> exact match -> workflow initial state -> review. RLS-visible rows -> per-horse latest-two retrieval in horses.ts -> stable-workspace counts/comparison/actions -> TrainerCockpit and horse detail.


- Discriminating access example: private%2Fhorse absent from the accessible list produces empty selection and no disclosure.


- Discriminating aggregation example: A has latest scored today/prior blocked, B has draft yesterday, C has no result; counts are today 1, incomplete 1, no-result 1 and A says Changed from Pending review. Two hundred recent A rows must not starve B.


- Discriminating permission example: RPC success false is read-only; RPC error is unavailable with no record action.


- Discriminating time example: 11:59 Brisbane is AM; 12:00 is PM.


- Git/baseline: HEAD d822c027c58ad88ec7472e35986e7a33d6a3d6c9, staged 0; dashboard-035 and workspace-028 pass. Focused target is 33 retained plus 64 new = 97 assertions.


- Evidence mechanism: extract production cockpit presentation to components/portal/trainer-cockpit.tsx. A separate non-deployed local Next evidence app under the evidence folder imports that component and BiochemistryCaptureWorkflow with synthetic fixtures. Production access behavior is separately proven by derivation tests. Emulation proves layout only; AC-18 remains pending unless iPhone safely reaches the local synthetic no-submit flow.


- Known uncertainty: actual phone reachability on trusted LAN without deployment, tunnel, credential, real data or authentication weakening.

## Sequence

1. Reconfirm canonical CWD/Git top, HEAD, staged state and pre-existing dirty files. Reread all 035R files, 025C closeout, design authority and focused tests. Run baseline tests.
2. Extend lib/domain/stable-workspace.ts with pure workflow-label, prior-state comparison, Brisbane-today counts and permission-aware action derivation. Missing/failed data must never look complete, unchanged or clinically normal.
3. Change lib/domain/horses.ts to issue a bounded latest-two query for each included accessible horse, ordered by test_date then id, so one horse cannot starve another. Any row-query error makes the overview unavailable. Distinguish permission success false from RPC error; an error yields unavailable with no action. Do not select notes/content.
4. Extract components/portal/trainer-cockpit.tsx and recompose the portal dashboard with compact Today summary, explicit date, scannable cards, change text and one action. Preserve safe empty/failure states and admin bootstrap authority.
5. Resolve horseId on the capture page only against accessible horses. Add pure initial date/AM-PM helpers. Initialise capture once from safe defaults while preserving edits, locks, note confirmation, units/ranges and validation; correct stale copy.
6. Align horse-detail action and make minimal reciprocal navigation changes. Do not change layouts, guards or permissions.
7. Add scripts/test-trainer-cockpit-035R.mjs and focused package/suite registration. Cover Brisbane/noon boundaries, counts, changed/unchanged/no-prior, all permission/failure actions, encoded horseId, accessible preselection and silent unknown rejection, edits retained, Carbohydrate 0.0–15.0 inclusive and current pH/conductivity ranges, stale-copy absence and no clinical wording.
8. Run focused tests, typecheck, lint, build and proportional local validation. Diagnose supporting-tool failure once and use documented equivalent safe proof for the same fact.
9. Have scripts/test-trainer-cockpit-035R.mjs generate and control a separate local evidence Next app under the Sprint evidence folder. It imports the same production TrainerCockpit and BiochemistryCaptureWorkflow components, uses synthetic fixtures, creates no Product route/auth bypass and is never deployed. Render four views and inspect overflow, clipping, actions, labels, focus/errors, targets and 200% zoom.
10. For safe local phone review, tell the user:
    1. Connect iPhone XS Max to the same trusted Wi-Fi as the workstation.
    2. Open Builder’s exact local address in Safari, portrait, normal text size.
    3. Locate the named synthetic horse.
    4. Start timing before tapping Capture biochemistry.
    5. Confirm horse/date/AM-PM; enter only supplied synthetic values and no real note.
    6. Tap Review test; stop timing when all values appear.
    7. Do not tap Submit test.
    8. Report elapsed time and clipping, horizontal scroll, hard-to-tap controls, confusing wording or wrong defaults.
11. Builder verifies no submit/external effect, stops the local server and removes only safely provable owned temporary serving artifacts. Never deploy or create a public tunnel.
12. Close with report, criteria, visuals, observation, limitations, changed files, 0/0/0 counts and mandatory planning updates. Do not claim independent trainer acceptance or public timing.

## Builder task contract

Objective: deliver the clinically neutral daily cockpit and horse-aware mobile review path with visible and timed iPhone XS Max evidence.

Owns: exact file boundary including the new shared TrainerCockpit component, synthetic visual evidence, guided no-submit observation, focused tests and closeout.

Must not: change scoring/schema/auth/RLS contracts, add clinical guidance, use protected data, deploy, apply migration 0024, create credentials, send email/enquiries, move aliases or commit.

Acceptance: every applicable criterion passes with falsifiable evidence; unavailable actual-device work is named, not downgraded.

Verification: executable tests, typecheck/lint/build, proportional suite, screenshots, overflow/accessibility inspection and guided iPhone observation.

============================================================
FILE: planning/sprints/035R-trainer-daily-cockpit-and-timed-mobile-workflow/acceptance.md
============================================================

# Sprint 035R Acceptance

| ID | Criterion | Proof |
| --- | --- | --- |
| AC-01 | CWD and Git top equal canonical before mutation. | Command output. |
| AC-02 | Brisbane date and truthful accessible counts for today, incomplete/pending and no-result. | Pure assertions/render. |
| AC-03 | Failure shows unavailable with no inferred counts/actions. | Failure assertion. |
| AC-04 | Cards show workflow/date, prior change/unchanged/no-prior and one action. | State matrix/screenshots. |
| AC-05 | No clinical priority, urgency, treatment, race-readiness or color-only meaning. | Claims/visual scan. |
| AC-06 | Writable no-result/completed carries encoded horseId; incomplete/pending opens current record. | URL/action assertions. |
| AC-07 | Read-only opens workspace; failed has no action; detail shares semantics. | Permission assertions. |
| AC-08 | Query preselects only accessible exact match; unknown/inaccessible is silent. | Positive/negative assertions. |
| AC-09 | Brisbane date/AM-PM passes pre-noon/noon, remains editable and preserves edits. | Pure/component assertions. |
| AC-10 | Review shows exact context/four readings; note/repeat-tap safeguards remain. | Regression/screenshot. |
| AC-11 | Ranges retain Carbohydrate 0.0–15.0, both pH 4.80–9.00 and conductivity 0.00–99.00 mS/cm, inclusive. | Boundary assertions/render. |
| AC-12 | “Exact lookup only” absent; copy does not contradict exact-or-next-lower v2. | Text assertion/render. |
| AC-13 | Reciprocal dashboard/capture navigation retains guards. | Assertion/render. |
| AC-14 | Three 414 × 896 views have no overflow/clipped core action. | Measurement/screenshots. |
| AC-15 | 44 × 44 targets, labels, focus/errors, landmarks and text status pass. | DOM/geometry check. |
| AC-16 | 1440 × 900 and 200% zoom retain core content/actions. | Screenshot/inspection. |
| AC-17 | Four privacy-safe visuals exist and are linked in report/handoff. | Manifest/links. |
| AC-18 | Guided iPhone reaches complete review without submit and records timing/fixture/friction. | User observation + no-submit proof. |
| AC-19 | Observation is not independent trainer acceptance or public/universal under-60 claim. | Claims scan. |
| AC-20 | No real data, secrets, provider identifiers or confidential records in evidence. | Evidence scan. |
| AC-21 | No formula, migration, schema, RLS, auth, permission or clinical-authority change. | Diff/regressions. |
| AC-22 | Focused tests, typecheck, lint, build and proportional local suite pass or stronger substitute proof is recorded. | Command ledger. |
| AC-23 | Staged/external mutation/residue counts 0/0/0; no commit/push/deploy/migration/email/enquiry/alias action. | Final state. |
| AC-24 | Required state/status/roadmap/briefing/matrix/report records reconcile exact limitations. | File review. |

PASS requires AC-01 through AC-24. If AC-18 cannot safely complete, report local-workflow-complete-real-device-review-pending and do not call the sprint fully accepted. Privacy, wrong-horse/access, clinical-claim, destructive, migration, Production or unsafe-cleanup uncertainty is a material stop.

End the Builder report exactly with either:

- I need nothing from you.
- I need the following from you: followed by numbered steps, what they unblock and what Builder will verify.

============================================================
FILE: planning/sprints/035R-trainer-daily-cockpit-and-timed-mobile-workflow/handoff-prompt.md
============================================================

# Sprint 035R Builder Handoff

Work only in C:\Users\rrank\OneDrive\PNR Precision Performance Canonical.



## Builder task contract





Objective: deliver the clinically neutral daily cockpit and horse-aware mobile review path with visible and timed iPhone XS Max evidence.





Owns: the exact Product/test file boundary, including components/portal/trainer-cockpit.tsx, plus synthetic local evidence, guided no-submit observation, focused verification and mandatory closeout.





Must not: change scoring, schema, migration, RLS, authentication, permissions, clinical authority or providers; use protected data; deploy or open a public tunnel; apply migration 0024; create credentials; send email/enquiries; move aliases; commit or push.





Acceptance: AC-01 through AC-24 pass with falsifiable evidence. If AC-18 cannot safely complete, report local-workflow-complete-real-device-review-pending and do not claim full acceptance.





Verification: 97 focused assertions (33 retained + 64 new), workspace/domain regressions, typecheck, lint, build, proportional local validation, four shared-component synthetic screenshots, geometry/accessibility/privacy/claims checks, guided no-submit phone observation when safe, and final 0/0/0 proof.

1. Verify CWD/Git top; record HEAD/staged/dirty state; preserve unrelated work.
2. Reread AGENTS.md, all 035R files, 025C acceptance/report, design authority, STATE and briefing.
3. Inspect scoped files, run baselines, then produce the no-edit critical Builder plan for fresh Architect review before Product edits.
4. After review, implement the smallest scoped change. Keep auth/RLS/server validation authoritative, deterministic Brisbane inputs, four-loss behavior, Carbohydrate 15.0, note/repeat-tap safeguards and clinically neutral language.
5. Produce required visuals and guide iPhone no-submit timing only through a safe synthetic local path.
6. Run focused tests, typecheck, lint, build and proportional local validation. Equivalent safe proof may replace a supporting tool; emulation cannot replace actual-device proof.
7. Reconcile every criterion and closeout file. Record visuals, timing, limitations, changed files and 0/0/0 counts.
8. End with I need nothing from you. or exact numbered steps under I need the following from you:.

No schema/migration/RLS/auth/permission change; no migration 0024 application; no deploy/public tunnel/provider/credential/email/enquiry/alias/real-data submission/commit/push; no clinical classification/recommendation/urgency/race-readiness; no protected evidence; no file-scope expansion.

Stop for material wrong-target, protected-data, wrong-horse/access, clinical-claim, destructive, migration, Production, scope or unsafe-cleanup risk. Continue through optional-tool failures when equivalent safe evidence exists.
