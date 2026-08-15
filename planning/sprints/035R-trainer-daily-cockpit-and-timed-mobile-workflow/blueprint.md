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
