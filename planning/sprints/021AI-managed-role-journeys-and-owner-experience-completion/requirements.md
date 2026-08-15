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
