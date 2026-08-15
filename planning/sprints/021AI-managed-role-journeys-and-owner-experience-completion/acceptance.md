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

## Builder closeout annotations - 2026-08-12

| ID | Result | Durable evidence |
| --- | --- | --- |
| AC-01 | pass | Canonical guard, Git/dirty baseline and staged zero recorded; unrelated work preserved. |
| AC-02 | pass | Applied Pack/sprint hashes and reread ledger. |
| AC-03 | pass | `PLAN-001/002` resolved; fresh critical plan PASS. |
| AC-04 | pass | Scope/diff proves zero migration/RLS/schema/role/permission changes. |
| AC-05 | pass | Administrator/Trainer guard/action matrix. |
| AC-06 | pass | Exact role-aware Access navigation matrix. |
| AC-07 | pass | User-scoped Supabase/RLS trace; no service-role/global path. |
| AC-08 | pass | Scoped-candidate fixtures and privacy DOM/source scan. |
| AC-09 | pass | Exact Veterinarian/Stable Staff contract and persisted codes. |
| AC-10 | pass | Manageable-horse/cross-stable fixtures. |
| AC-11 | pass | Server-side current-snapshot revalidation matrix. |
| AC-12 | pass | Exact assignment/reactivation/nominator adapter proof. |
| AC-13 | pass | Duplicate/ambiguity zero-authority fixture. |
| AC-14 | pass | Exact revoke/stale/foreign/already-revoked matrix. |
| AC-15 | pass | Complete generic denial/zero-mutation matrix. |
| AC-16 | pass | Accurate Administrator/Trainer responsibility copy. |
| AC-17 | pass | Retained/fresh assigned-horse/own-comment role proof. |
| AC-18 | pass | Unchanged unrelated roles and absent lifecycle controls. |
| AC-19 | pass | Fail-closed state matrix and rendered evidence. |
| AC-20 | pass | Portal guard and user-scoped Owner trace. |
| AC-21 | pass | Exact-horse generic denial fixtures. |
| AC-22 | pass | Stored-score/scored/blocked/unscored projection proof. |
| AC-23 | pass | Bound link and reports exact-horse revalidation. |
| AC-24 | pass | Accepted formula authority and neutral claims scan. |
| AC-25 | pass | Version/gap render and no-recalculation proof. |
| AC-26 | pass | Owner DOM/source no-write scan. |
| AC-27 | pass | Configuration-only copy plus retained self-owned preference proof. |
| AC-28 | pass | Automated/manual neutral-claims review. |
| AC-29 | pass | Required Product `376/376`; voice `34/34` supplemental only. |
| AC-30 | pass | Retained accepted 021AH policy evidence plus fresh executable route/action model. |
| AC-31 | pass | Typecheck/lint/JSON/build29/diff/scope/privacy pass. |
| AC-32 | pass | Four mobile plus one combined desktop shared-component synthetic captures. |
| AC-33 | pass | Geometry13/captures5/shell8/sign-in6/card12/public320. |
| AC-34 | pass | Synthetic-only privacy scan and visual inspection. |
| AC-35 | pass | `INSPECT-001..004` resolved; final inspection 3/3 PASS. |
| AC-36 | pass | Matrix reconciled; O07/P48/Production/Product-wide Done remain open. |
| AC-37 | pass | Closeout planning/evidence cross-file validation. |
| AC-38 | pass | External-effects ledger zero. |
| AC-39 | pass | Final staged/external/residue `0/0/0`; listener/profile/cache cleanup. |
| AC-40 | pass | Final Builder report contains the exact no-action statement. |
