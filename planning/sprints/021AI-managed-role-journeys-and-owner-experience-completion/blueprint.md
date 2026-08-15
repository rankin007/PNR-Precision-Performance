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
