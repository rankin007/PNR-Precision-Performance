# Architect Pack - Sprint 021AI Managed Role Journeys and Owner Experience Completion

Created: 2026-08-11
Workflow profile: strict
Flight class: critical
Execution boundary: local Product, tests and synthetic evidence only

This Pack creates the strict Builder sprint files. It does not apply itself, edit Product code, change schema/RLS, deploy, create credentials, send email or enquiries, move aliases, stage, commit, push or perform any external action.

============================================================
FILE: planning/sprints/021AI-managed-role-journeys-and-owner-experience-completion/requirements.md
============================================================

# Sprint 021AI Requirements

## Outcome

Complete two current-MVP role journeys from the retained canonical Product without redefining permissions:

1. an Administrator-provisioned, Trainer-managed horse-access journey for already-scoped Veterinarian and Stable Staff profiles; and
2. an Owner read-only journey from assigned horse to latest numeric result context and stored trends, with no horse/test write affordance.

Successful local outcome: `managed-role-journeys-and-owner-experience-local-complete-clean`.

This is not a new role model. It exposes and proves only the accepted role/RLS behavior in migrations 0011/0012 and the accepted 021AH authenticated boundary. No migration, policy, helper, grant, role, membership level or permission change is expected or authorized.

## Controlling role contract

Preserve these exact boundaries:

- Administrator remains the accountable authority for user identity, primary role, membership and the first scoped relationship that makes a lower-role profile visible inside the existing RLS model.
- An active Trainer may manage horse access only for horses the Trainer already manages and only for an already-scoped active profile whose exact primary role is `veterinarian` or `stable_hand`.
- `stable_hand` remains the internal/database code. Trainer-facing copy may say `Stable Staff`; do not rename persisted codes or historical evidence.
- A managed Veterinarian or Stable Staff assignment is horse-specific, time-bounded through the existing assignment lifecycle and uses the existing read access level.
- A managed Veterinarian or Stable Staff member may read the assigned horse and add/manage only their own plain-text comments through the existing comment permission. They cannot create or edit horse records, tests, readings, scores, assignments, owners, stable lifecycle or another person's comment.
- Revocation ends the exact existing horse-access assignment and must remove access immediately under existing RLS. Inactive, suspended, revoked, wrong-horse and cross-stable cases remain denied.
- Owner remains read-only for horse/test data. Personal saved trend-view settings remain configuration-only self-owned writes and are not horse/test write access.
- Trainer management must not enumerate or search the global user population. The journey may show only profiles already visible to the signed-in manager through existing RLS. A new person's first scoped relationship remains an Administrator task.
- Migration 0012's database helper also accepts the existing `consultant` role and does not, by itself, prove that a submitted profile was already visible to the Trainer. Sprint 021AI deliberately offers only Veterinarian and Stable Staff. The server action must reselect the submitted profile from the current signed-in Trainer's scoped snapshot before mutation and reject Consultant, unknown and forged profile IDs generically. Existing RLS remains the final database mutation authority, but it is not a substitute for this narrower Product rule.
- Consultant, Stable Manager and all other role behavior remain unchanged. Consultant is not a new 021AI UI option. Stable Manager is not granted Trainer access-management authority.

If current source or executable proof contradicts this retained contract, stop `managed-role-authority-drift-blocked-clean`; do not invent a correction or widen access.

## Required Product behavior

### Managed access journey

1. Add `/data-entry/access` as a real authenticated management page for Administrator and active Trainer only. Other portal roles receive the existing generic denial/redirect and no role, horse, stable, profile, assignment count or existence detail.
2. Show the access destination in operational navigation only to Administrator and Trainer. Do not present a dead-end management link to Owner, Veterinarian, Stable Staff, Consultant or Stable Manager.
3. Build the page from signed-in, user-scoped Supabase queries and existing RLS. Never use service-role data for the Trainer journey.
4. Present only already-scoped active Veterinarian and Stable Staff profiles, Trainer-managed accessible horses and the active assignments the current manager is allowed to see.
5. Never expose email, Auth ID, application-user ID, stable ID, horse ID, profile ID or assignment ID as visible copy. IDs may exist only as required hidden form values and server-side query keys.
6. Offer only two horse-access role labels: `Veterinarian` and `Stable Staff`. The submitted value must be validated against exact internal codes `veterinarian` and `stable_hand` on both client-visible composition and server action paths.
7. Before offering an assignment, prove the current actor can manage the target horse and that the target profile is already in scope with the exact active role. The existing RLS action remains the final authority.
8. Prevent self-assignment, role mismatch, malformed IDs, inactive/suspended target, inaccessible horse, cross-stable horse, unscoped profile and duplicate/ambiguous assignment from becoming a visible success.
9. Revoke only an exact active assignment visible to the manager. A stale/revoked/inaccessible assignment request fails generically and changes nothing.
10. Visible copy must explain the accountable boundary: Administrator sets up the person and first relationship; Trainer manages horse access for already-scoped people; assigned Veterinarian/Stable Staff can view the horse and manage only their own comments, not horse records.
11. Do not expose the existing user-lifecycle, primary-role change, owner assignment, stable-role assignment, horse delete/restore or stable lifecycle actions on this page.
12. Empty, unavailable and denied states must be distinct, safe and actionable without exposing protected existence or counts.

### Owner read-only result/trend journey

13. Preserve `/portal`, `/portal/horses`, horse detail and `/portal/reports` under the existing portal guard and user-scoped RLS.
14. An Owner can see only assigned horses. A malformed, inaccessible, wrong-horse or cross-stable identifier produces the existing generic unavailable/selection state with no existence clue.
15. Enhance the assigned-horse detail with the latest stored scoring state and, when scored, both stored Hydration Score and Biochemistry Trend Score. Do not recalculate, classify or interpret them.
16. Provide a clear route from assigned horse detail to that exact horse's trends. Preserve exact accessible-horse revalidation on the reports route; a query string is a hint, never authority.
17. Use plain, clinically neutral explanations: Hydration Score is calculated from Carbohydrate and Salts loss values; Biochemistry Trend Score is calculated from Carbohydrate, Urine pH, Saliva pH and Salts loss values. State that numeric results are presented without classifications, recommendations, diagnosis, urgency, treatment or race-readiness meaning.
18. Keep formula/source versions visible. Do not join, interpolate or imply continuity across version boundaries.
19. Owner surfaces must contain no new-test, data-entry, upload, comment-add/edit/delete, assignment, horse mutation or stable-management affordance. `Back to trainer dashboard` copy must become audience-neutral.
20. Saved trend views remain permitted self-owned configuration. Copy must make clear that saving a view changes chart choices only and does not modify a horse, test, reading, score, note or assignment.
21. The same factual score explanation may be shared with authorised Trainer/Veterinarian/Staff viewers. It must not imply clinical meaning or a healthy/normal result.

## Task contract

### objective

Deliver the two local role journeys above from existing accepted RLS, with falsifiable denial proof, privacy-safe visuals, fresh critical review and truthful acceptance reconciliation.

### owns

Builder may create or edit only:

- `app/(ops)/layout.tsx`;
- `app/(ops)/data-entry/access/page.tsx` (new);
- `app/(ops)/data-entry/access/actions.ts`;
- `app/(portal)/portal/horses/[horseId]/page.tsx`;
- `app/(portal)/portal/reports/page.tsx` only if audience-neutral composition requires it;
- `components/ops/managed-access-workspace.tsx` (new);
- `components/portal/biochemistry-trends.tsx`;
- `lib/auth/session.ts`;
- `lib/auth/managed-access-contract.ts` (new, pure and path-alias-free);
- `lib/auth/managed-access-server.ts` (new, server-only);
- `lib/domain/horses.ts`;
- `lib/domain/stable-workspace.ts` only for the latest stored Hydration Score projection;
- `lib/navigation.ts`;
- `scripts/test-managed-role-journeys-021AI.mjs` (new);
- `scripts/test-owner-read-only-journey-021AI.mjs` (new);
- minimum synthetic shared-component evidence harness files beneath `evidence/professional-engineering/021AI-managed-role-journeys-and-owner-experience-completion/`;
- `scripts/run-validation-suite.mjs` and `package.json` only to register the focused tests/evidence command;
- `docs/AUTH_RLS_PORTAL_ACCESS.md`;
- `planning/reviews/021AI-managed-role-journeys-and-owner-experience-completion.md`;
- generated/applied 021AI sprint files and acceptance annotations;
- `evidence/professional-engineering/021AI-managed-role-journeys-and-owner-experience-completion/**`, synthetic and non-private only;
- required closeout entries in `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DEFINITION_OF_DONE.md`, `planning/ROADMAP.md`, `planning/SPRINT_SCHEDULE.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md` and `delivery_road_map.md`.

The current canonical source wins over historical line numbers and hashes. Builder must narrow the actual changed file set after the no-edit plan review; optional files above may remain untouched.

### must_not

Builder must not:

- edit a migration, bootstrap SQL, RLS policy, database helper, grant, schema, membership seed or permission mapping;
- add a new role, rename a persisted role, expose Consultant as a new option or give Stable Manager access-management authority;
- enumerate global users or reveal emails, IDs, protected counts or cross-scope existence;
- use service role for the Trainer management journey or trust a client role/actor/horse/profile assertion;
- let Veterinarian, Stable Staff or Owner write horse records/tests/readings/scores/assignments or another user's comments;
- show classifications, zones, thresholds, recommendations, today guidance, diagnosis, urgency, treatment, dosage, causal interpretation or race-readiness claims;
- add photos, PDFs, upload UI or private evidence; those remain MVP 2 Sprint 023Q;
- add application voice/audio/transcription or alter the accepted typed-note boundary;
- use real horse, owner, trainer, staff, veterinarian, stable, email, note or confidential data;
- apply migrations, write remote/Production data, deploy, create credentials, send email, submit enquiries, move aliases/domains or contact external systems;
- stage, commit, push, merge or open a pull request; or
- change public enquiry, commerce, Production release or deferred clinical scope.

### acceptance

Every applicable criterion in `acceptance.md` must pass. A security, privacy, scope, identity, RLS, mutation or cleanup failure is a material stop.

### verification

Use focused executable behavior, retained 021/021AH and 028B proof, TypeScript/lint/build/JSON gates, shared-component rendered evidence, fresh critical inspection and final staged/external/residue proof. Equivalent safe evidence may replace only a supporting tool, never the access or privacy fact.

## Evidence-Proportional Execution Standard

Stop only for a material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup risk. Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope harness, validator, reporter, formatting, encoding and deterministic evidence corrections inside 021AI. Do not create a follow-up sprint solely because Docker, browser automation, a renderer, schema dump, clipboard control or another supporting tool is unavailable. Use manual intervention only after safe in-scope alternatives are exhausted.

If manual intervention is genuinely required, record what is blocked, evidence already checked, the exact minimal user action, step-by-step instructions and what Builder will verify afterward. Never ask the user for credentials, real identities, private records or a real data mutation.

============================================================
FILE: planning/sprints/021AI-managed-role-journeys-and-owner-experience-completion/blueprint.md
============================================================

# Sprint 021AI Blueprint

## Flight evidence

- Class: critical because the sprint exposes existing access-assignment mutations and renders authenticated horse results across multiple roles.
- Primary managed-access invariant: only an active Administrator or assigned Trainer can reach the management journey; every Trainer assignment/revocation is for an already-scoped exact-role profile and a horse that Trainer already manages; existing RLS is always the final authority.
- Primary Owner invariant: an Owner can render stored result/trend data for exactly an assigned horse and receives no horse/test/comment/access write affordance.
- Managed-access source-to-sink trace: signed-in app context -> Administrator/Trainer route guard -> existing-RLS scoped profiles/horses/assignments -> pure option validation limited to `veterinarian`/`stable_hand` -> hidden exact IDs -> server reselect from the actor's scoped snapshot -> signed-in Supabase mutation -> existing 0012 policy/helper -> generic outcome -> refreshed scoped snapshot. Migration 0012 remains the database sink but is intentionally broader because it also accepts `consultant`; Product-layer scoped revalidation is therefore part of the acceptance invariant.
- Owner source-to-sink trace: signed-in portal context -> RLS-scoped horses -> exact accessible horse selection -> stored latest snapshot/trend query -> strict projection -> neutral score/version copy -> read-only render.
- Discriminating management fixture: Trainer A can assign already-scoped Vet A to managed Horse A2 and revoke that exact assignment; the same request for Consultant A, Vet B/global unknown, a forged-but-well-formed profile UUID, Horse B1, self, role mismatch, malformed ID, suspended target or already-revoked row returns generic denial and changes zero rows. This separates the intended Product rule from the plausible wrong implementation that trusts migration 0012 alone.
- Discriminating role fixture: assigned Vet/Stable Staff can read Horse A and add/manage only their own comment; cannot create/update a test or another comment. Owner can read only Owner Horse A and cannot comment or enter data.
- Discriminating navigation fixture: Administrator/Trainer sees `Access`; Stable Manager, Veterinarian, Stable Staff, Consultant and Owner do not, and direct access is generically denied.
- Discriminating Owner fixture: Owner A sees assigned Horse A latest scores and exact-horse trends; wrong Horse B ID yields generic unavailable/selection with no query-derived protected count and no write action.
- Architecture gate: crossed. This sprint introduces a visible role-management surface, but not a new authorization model. Server context and database RLS remain authoritative; pure UI composition cannot grant access.
- Durable verification source: canonical Git `HEAD d822c027c58ad88ec7472e35986e7a33d6a3d6c9`; discovery baseline `0` staged, `45` modified tracked and `248` untracked paths. The working tree contains accepted prior sprint work and method updates; preserve it and trust the current Git diff over prose. Rerecord counts immediately before Builder work because this Pack/status/application will change planning-only paths.
- Known uncertainty: no new remote actor/RLS execution is authorized. Prefer isolated local authenticated actor/policy execution if safely available; otherwise reuse still-matching 021AH direct/rendered authorization evidence and add a fresh executable server-action model that distinguishes scoped Vet/Stable Staff success from Consultant, forged-ID and cross-scope refusal. Do not invent live or Production proof.

## Implementation sequence

1. Apply the Pack only after dry-run. Reread all four generated files, `AGENTS.md`, accepted 0011/0012 role policies, 021AH closeout, 028B trends closeout, 025D numeric boundary, design/messaging authority and Final Product Acceptance Matrix.
2. Produce the exact no-edit critical Builder plan before Product edits. It must list exact files, route guards, scoped queries, form fields, source-to-sink invariants, positive/negative fixtures, rendered views, cleanup and expected acceptance changes. Obtain fresh Architect review and resolve every plan finding.
3. Add a pure path-alias-free managed-access contract for exact role codes, labels, candidate/assignment validation and safe status composition. It must never decide database authority.
4. Add a server-only scoped snapshot that uses the signed-in Supabase client. Fail the entire management snapshot unavailable if a required profiles/horses/assignments/permission query fails or returns malformed/cross-scope data. Never return partial management state as complete.
5. Add an Administrator/Trainer-specific route guard using current server app context. Use it in the page and assignment/revocation actions. Do not infer authority from membership copy or a client form field.
6. Build the shared managed-access workspace and `/data-entry/access` page. Show already-scoped Veterinarian/Stable Staff candidates, manageable horses and active exact assignments only. Keep hidden IDs non-visible and all success/error copy generic. Prove that a well-formed Consultant or forged profile ID cannot bypass the scoped snapshot merely because migration 0012's helper is broader.
7. Restrict the visible journey to assign/revoke horse access. Do not render lifecycle, primary-role, stable-role, owner, horse-delete/restore or stable-lifecycle controls.
8. Add role-aware operational navigation so only Administrator/Trainer sees the Access destination.
9. Extend the latest horse snapshot only as needed to show stored Hydration and Biochemistry Trend Scores on accessible horse detail. Never recalculate. Render blocked/unscored as `Not scored`, not zero or normal.
10. Make horse-detail language audience-neutral and add the exact neutral formula/output explanation. Preserve the exact-horse trends link and existing RLS selection behavior.
11. Align trend copy so personal saved views are explicitly configuration-only and no clinical meaning is implied. Do not change trend data, formulas, charts, preferences schema or historical values.
12. Add focused executable tests covering guard/navigation/option composition, fail-closed snapshot behavior, exact form validation, generic outcomes, no global enumeration, no service-role path, Owner read-only composition, latest-score states and neutral claims.
13. Prove access semantics with the strongest safe in-scope method. Preferred: isolated local authenticated actor/policy execution using synthetic fixtures and exact cleanup. If local database execution is unavailable, use retained 021AH direct/rendered policy proof plus a fresh executable action/route contract model that evaluates every 021AI positive and denial case. A substring-only policy check is insufficient.
14. Run retained `test:roles`, 021 role/security validators, 028B trends proof, relevant 025D/035R regressions, TypeScript, zero-warning lint, JSON, optimized build, diff/scope/privacy/claims scans.
15. Render from the shared Product components with synthetic data only:
    - Trainer managed-access mobile view at `414 x 896`;
    - managed Veterinarian/Stable Staff permissions mobile view at `414 x 896`;
    - Owner assigned-horse latest result mobile view at `414 x 896`;
    - Owner exact-horse trends mobile view at `414 x 896`; and
    - Trainer management plus Owner result/trend desktop overview at `1440 x 900` (two pages/captures are allowed if one composite would not be truthful).
16. Inspect full-page/viewport dimensions, overflow, clipping, focus/labels/status announcements, non-colour meaning, 44px-class targets, 200% equivalent geometry, privacy and claims. State `rendered at a 414 x 896 viewport` when full-page PNG height differs.
17. Obtain fresh critical implementation inspection. Resolve every stable in-scope finding and rerun affected evidence before closeout.
18. Reconcile acceptance truthfully:
    - P29 remains passed; Owner read-only journey gains fresh Product/render evidence.
    - P30 remains `passed-with-accepted-limitation`, but the prior open managed-exception authority is replaced by the exact existing-rule/local-journey limitation; Production and representative-participant acceptance remain open.
    - P31 remains `passed-with-accepted-limitation` unless the complete Stable Staff journey and retained hosted policy evidence justify `passed`; do not overclaim beyond exact comment-only limited write.
    - P33/P34/P50 remain passed and gain regression evidence only.
    - O06 remains `passed-with-accepted-limitation` and gains the complete local horse-to-result-to-trend journey; independent Owner/Production acceptance remains open.
    - O07 remains `authority-required` unless a representative Owner actually demonstrates comprehension under a separately valid acceptance method. Clear neutral copy alone is Product evidence, not human comprehension proof.
    - O08/O10 may gain local journey evidence but retain their named-operator/rehearsal limitations.
    - P48, Product-wide Done, remote activation and Production acceptance remain open.
19. Close with exact tests/assertion arithmetic, changed files, visual manifest, role matrix, limitations, acceptance deltas and final `0/0/0` staged/external/residue counts.
20. End the Builder report exactly with `I need nothing from you.` when no action is required, or `I need the following from you:` followed by numbered plain-English steps and follow-up verification.

## Critical plan review questions

Fresh Architect review must answer PASS or FIX for each:

1. Does the plan use only existing 0011/0012 authority and avoid a schema/RLS/role expansion?
2. Can any non-Administrator/Trainer reach or infer the management snapshot?
3. Can Trainer enumerate a global person or select a profile not already visible under existing RLS?
4. Is horse/profile/role authority revalidated server-side with signed-in RLS as final authority?
5. Do Vet/Stable Staff remain read plus own-comment only, and Owner remain horse/test read-only?
6. Are wrong-horse, cross-stable, revoked, inactive, suspended, anonymous and non-member cases falsifiable?
7. Does the Owner journey present stored values and versions without inventing clinical meaning?
8. Are visuals built from shared Product components and synthetic data only?
9. Are file scope, cleanup and no-external boundaries exact?

## Acceptable outcomes

- `managed-role-journeys-and-owner-experience-local-complete-clean`
- `managed-role-authority-drift-blocked-clean`
- `managed-role-access-proof-failed-clean`
- `owner-read-only-journey-proof-failed-clean`
- `local-validation-failed-clean`
- `critical-inspection-failed-clean`
- `cleanup-failed-contained`
- `blocked-clean`

============================================================
FILE: planning/sprints/021AI-managed-role-journeys-and-owner-experience-completion/acceptance.md
============================================================

# Sprint 021AI Acceptance

Builder annotates every criterion `pass`, `fail` or `not-run` with evidence.

| ID | Criterion | Required proof |
| --- | --- | --- |
| AC-01 | CWD and Git top exactly equal the canonical workspace; HEAD, staged/dirty baseline and unrelated work are recorded/preserved. | Command ledger and scoped status. |
| AC-02 | Applied sprint files are byte-derived from this Pack and reread before execution. | Dry-run/apply output and hashes. |
| AC-03 | A fresh no-edit critical Builder plan passes Architect review before any Product edit. | Plan review ledger with all findings resolved. |
| AC-04 | No migration, RLS policy/helper/grant, schema, role, membership seed or permission mapping changes. | Approved-scope diff and hashes. |
| AC-05 | `/data-entry/access` requires signed-in active Administrator or Trainer; all other roles/anonymous/non-member are generically denied. | Guard/action matrix. |
| AC-06 | Operational navigation shows Access only to Administrator/Trainer and creates no dead-end link for other roles. | Role render/source assertions. |
| AC-07 | Trainer snapshot uses only signed-in user-scoped Supabase/RLS; no service-role/global directory path exists. | Source-to-sink trace and refusal scan. |
| AC-08 | Only profiles already visible under existing RLS can appear; email/Auth/app-user IDs and global enumeration are absent. | Scoped fixture and DOM/privacy scan. |
| AC-09 | Visible candidate roles are exactly Veterinarian and Stable Staff mapped to `veterinarian`/`stable_hand`; persisted codes remain unchanged. | Pure contract and render assertions. |
| AC-10 | Offered horses are exact currently manageable horses; inaccessible/wrong-stable horses are absent. | Positive/cross-stable fixtures. |
| AC-11 | Assignment revalidates actor, horse, profile membership in the actor's current scoped snapshot, exact Product role (`veterinarian`/`stable_hand` only), self-refusal and active state server-side before signed-in RLS mutation. | Action contract and executable cases. |
| AC-12 | Successful assignment creates/reactivates only the exact intended horse/profile/role read assignment with correct nominator attribution. | Executed mutation model/local actor proof. |
| AC-13 | Duplicate/ambiguous assignment cannot produce duplicate active authority or a false success. | Discriminating fixture. |
| AC-14 | Revocation ends only one exact active visible assignment; stale, foreign or already-revoked IDs change zero rows and fail generically. | Executed revoke matrix. |
| AC-15 | Wrong horse, cross-stable, Consultant, unscoped/unknown/forged profile, role mismatch, malformed ID, inactive, suspended and self cases reveal no protected detail and mutate zero rows. | Denial matrix. |
| AC-16 | Administrator provisioning/first-relationship and Trainer already-scoped management responsibilities are stated accurately. | Render/copy inspection. |
| AC-17 | Managed Veterinarian/Stable Staff can read only assigned horses and manage only their own comments; they cannot write tests/records/assignments or another comment. | Retained plus fresh role assertions. |
| AC-18 | Consultant/Stable Manager/Owner permissions are not expanded; unrelated lifecycle/owner/stable/delete controls are absent from the page. | DOM/source and role matrix. |
| AC-19 | Management empty, unavailable, denied, success and failure states are distinct, generic and accessible; partial query results never render as complete. | State matrix and rendered evidence. |
| AC-20 | Owner horse list/detail/trends remain under portal guard and existing user-scoped RLS. | Route/source trace. |
| AC-21 | Owner sees only assigned horses; malformed/inaccessible/wrong-horse/cross-stable hints disclose no existence or count. | Exact-horse denial fixtures. |
| AC-22 | Assigned-horse detail shows latest stored scoring state and both stored scores when scored; blocked/unscored is not zero/normal. | Projection tests and render. |
| AC-23 | Horse-to-trends navigation binds the exact accessible horse and reports revalidates it as a hint, not authority. | Route/query tests. |
| AC-24 | Hydration and Biochemistry Trend Score explanations reproduce only the accepted four-loss formulas and clearly state absent clinical interpretation. | Authority trace and claims scan. |
| AC-25 | Formula/source versions remain visible and no cross-version continuity/recalculation/backfill is introduced. | Mixed-version assertions/render. |
| AC-26 | Owner surfaces expose no new-test, data-entry, upload, comment mutation, assignment, horse or stable mutation affordance. | Owner DOM/source scan. |
| AC-27 | Saved-view copy says configuration-only; preference actions remain self-owned and cannot change horse/test data. | Render plus retained 028B RLS proof. |
| AC-28 | Copy is audience-neutral and contains no diagnosis, normal/healthy, urgency, treatment, dose, causal, recommendation or race-readiness claim. | Claims scan/manual inspection. |
| AC-29 | Focused management and Owner tests pass with counted assertions; retained role/021 and 028B/025D/035R regressions pass proportionally. | Command/arithmetic ledger. |
| AC-30 | Access proof uses actual isolated actor/RLS execution or the accepted 021AH policy proof plus a fresh executable action/route model; substring-only checks are insufficient. | Evidence classification and results. |
| AC-31 | TypeScript, zero-warning lint, JSON, optimized build, diff/scope/privacy checks pass, or an allowed stronger supporting-tool substitute proves the same fact. | Validation ledger. |
| AC-32 | Four mobile journey views and truthful desktop coverage are rendered from shared Product components with synthetic data only. | Visual manifest and component trace. |
| AC-33 | Named viewports, full-page dimensions, overflow, 200% equivalent geometry, 44px-class targets, labels/focus/status and non-colour meaning pass. | Geometry/accessibility ledger. |
| AC-34 | Evidence contains no real identity, horse, stable, email, note, credential, token, provider identifier or confidential record. | Privacy scan and visual inspection. |
| AC-35 | Fresh critical implementation inspection passes after all stable in-scope findings are corrected and affected proof reruns. | Critical review record. |
| AC-36 | P29-P31, P33/P34/P50 and O06-O10 are reconciled exactly; O07/human comprehension, P48, Production and Product-wide Done are not overclaimed. | Acceptance-matrix diff. |
| AC-37 | State, Status, Roadmaps, schedule, lifecycle ledger, evidence index, Done and briefing agree on exact outcome/limitations/next sprint. | Cross-file consistency scan. |
| AC-38 | No private photos/PDFs, application voice, clinical guidance, remote migration/data, deployment, credential, email, enquiry, alias/domain or Git-publication action occurs. | External-effects ledger `0`. |
| AC-39 | Final staged/external/generated-residue counts are exactly `0/0/0`; any temporary server/process/port/harness residue is removed safely. | Final safety checks. |
| AC-40 | Builder report ends with the exact explicit user-action statement. | Report inspection. |

PASS requires AC-01 through AC-40. Any access expansion, cross-scope disclosure, unauthorized mutation, role mismatch, partial state presented as complete, private-data exposure, unsafe cleanup or external action is a material stop.

End the Builder report exactly with either:

- `I need nothing from you.`
- `I need the following from you:` followed by numbered plain-English steps, what each step unblocks and what Builder will verify.

============================================================
FILE: planning/sprints/021AI-managed-role-journeys-and-owner-experience-completion/handoff-prompt.md
============================================================

# Sprint 021AI Builder Handoff

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

## Builder task contract

Objective: complete the local Administrator-provisioned/Trainer-managed Veterinarian and Stable Staff horse-access journey and the Owner assigned-horse result/trend journey without changing the accepted role/RLS model.

Owns: the exact approved Product/test/docs boundary, fail-closed scoped management composition, Owner read-only latest-result/trends presentation, synthetic visuals, fresh critical review and mandatory closeout.

Must not: change schema/RLS/roles/permissions; enumerate global users; use service role for Trainer management; expand Consultant/Stable Manager/Owner authority; invent clinical meaning; use real data; add private evidence or application voice; apply migrations; deploy; create credentials; send email/enquiries; move aliases; stage, commit or push.

Acceptance: AC-01 through AC-40 pass with falsifiable access/privacy evidence. Production, representative human comprehension and Product-wide Done stay open.

Verification: focused executable management/Owner tests, strongest safe RLS/action proof, retained 021/021AH/028B/025D/035R regressions, typecheck/lint/build/JSON, shared-component visuals, fresh critical inspection and final `0/0/0` proof.

1. Verify canonical CWD/Git top, HEAD, staged/dirty state and preserve unrelated work.
2. Reread all applied 021AI files and governing authority.
3. Produce the exact no-edit critical Builder plan for fresh Architect review before Product edits. Include exact files, guards, scoped queries, form validation, source-to-sink invariants, discriminating denial fixtures, visuals and cleanup.
4. After plan PASS, implement the smallest change. The database remains final authority and no role/RLS/schema change is permitted.
5. Keep Administrator responsible for identity/role/membership/first relationship. Trainer sees/manages only already-scoped exact-role people and already-managed horses. Reselect every submitted profile from the actor's current scoped snapshot; migration 0012 alone is intentionally too broad to enforce this Product rule.
6. Show only Veterinarian and Stable Staff (`stable_hand`) options. Preserve Consultant and Stable Manager behavior without adding UI authority, and prove Consultant plus forged-profile submissions fail generically with zero mutation.
7. Prove every positive and denial case. Do not replace access/privacy behavior with substring assertions.
8. Complete the Owner horse-to-latest-result-to-trends route with stored values, versions, neutral formula explanation and no horse/test write affordance.
9. Run all proportional gates and create the named synthetic shared-component views.
10. Obtain fresh critical implementation inspection, resolve all stable findings and rerun affected proof.
11. Reconcile acceptance truthfully. Clear copy is not representative Owner comprehension; local evidence is not Production activation.
12. End the report exactly with `I need nothing from you.` or the required numbered plain-English intervention steps.

Stop for material wrong-target, authority drift, access/privacy, cross-scope disclosure, mutation, scope, external action or unsafe cleanup risk. Continue through supporting-tool failures when equivalent safe evidence exists.
