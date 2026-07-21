============================================================
FILE: planning/sprints/021-definitive-role-matrix-and-authenticated-rls-proof/requirements.md
============================================================

# Sprint 021 - Definitive Role Matrix And Authenticated RLS Proof Requirements

## Objective

Implement the definitive Precision Performance role hierarchy, horse/stable access boundaries, and biochemistry-entry comment workflow, then prove the resulting application and database behavior with controlled authenticated testing against candidate Supabase project `uvskssaecdhxcgytkasc`.

Sprint 020G is closed `candidate-ready`. Sprint 021 must not reopen it, claim production cutover, mutate old project `tagnbgkroihagjmvehlx`, or treat prior local/mock harness results as authenticated proof.

## Workflow Profile

`strict`

This sprint changes authentication, authorization, RLS, role and assignment behavior, health-related comments, remote candidate structure, temporary Auth identities, and hosted callback configuration.

## Authoritative Role Hierarchy

The hierarchy is a hard business rule:

1. Administrator
2. Trainer
3. Stable Manager
4. Veterinarian / Consultant
5. Stable Hand
6. Owner, as a separate read-only relationship role

Each account has exactly one primary operational role. Horse ownership is a separate relationship and may coexist with any primary role. Effective access combines the primary role with active status, stable scope, explicit horse assignment, and ownership without merging roles.

## Definitive Permission Matrix

### Administrator

- Global access to all horses, stables, users, assignments, records, biochemistry entries, and comments.
- May create, edit, soft-delete, and restore any horse or biochemistry record.
- May create, rename, deactivate, restore, or delete a stable subject to dependency safety.
- May create, activate, suspend, or change any account or role.
- May assign or revoke any horse, stable, Trainer, Stable Manager, professional, staff, or Owner relationship.
- May soft-delete any comment.

### Trainer

- Most senior operational role below Administrator; this seniority must be encoded consistently in permissions, server actions, UI affordances, and tests.
- May be explicitly assigned to multiple stables.
- May access and edit only horses explicitly assigned to that Trainer.
- May create horses only within an assigned stable.
- May edit core horse profiles and create, edit, soft-delete, and restore horse and biochemistry records within assigned-horse scope.
- May add comments to accessible biochemistry entries.
- May assign or revoke Stable Hands, Veterinarians, and Consultants only for horses already assigned to that Trainer.
- May manage lower-level users only within the Trainer's assigned stable and horse scope, including Stable Managers and assigned Stable Hands, Veterinarians, and Consultants.
- May activate, suspend, and change lower-level non-Owner operational roles within that scope.
- Cannot assign themselves to more horses; cannot create, activate, suspend, or change Administrators or peer Trainers; cannot grant Administrator or Trainer status.
- May assign, change, invite, activate, or suspend an Owner only for horses within the Trainer's scope.

### Stable Manager

- Belongs to exactly one stable.
- Has Trainer-level horse and record access across every horse in that stable.
- May create and edit core horse profiles within that stable.
- May create, edit, soft-delete, and restore horse and biochemistry records within that stable.
- May add comments to biochemistry entries within that stable.
- Cannot create or alter stable security boundaries.
- Does not gain person-to-horse assignment or user-role management authority merely by managing the stable.
- Has no cross-stable access.

### Veterinarian

- May be explicitly assigned to horses across multiple stables.
- May read the assigned horse's profile, records, biochemistry entries, and comments.
- May add comments to assigned-horse biochemistry entries.
- Cannot create, edit, soft-delete, or restore the underlying horse or biochemistry record.
- Assignment to one horse grants no access to another horse in the same stable.

### Consultant

- Has the same access boundary as Veterinarian: explicit assigned-horse read and comment access only.
- May work across multiple stables only through explicit horse assignments.
- Cannot modify the underlying horse or biochemistry record.

### Stable Hand

- Belongs to exactly one stable and must also be explicitly assigned to a horse.
- May read assigned-horse profiles, records, biochemistry entries, and comments.
- May add comments to assigned-horse biochemistry entries.
- Cannot edit any horse record or biochemistry entry.
- Same-stable membership alone does not grant access to an unassigned horse.

### Owner

- Ownership is a relationship, not an additional operational role.
- May read only owned horses and their associated records and comments, including horses across multiple stables.
- Cannot edit horse profiles or biochemistry entries and cannot add, edit, or delete comments.
- Cannot self-assign, transfer ownership, or access another Owner's horse.

### Inactive, Suspended, And Anonymous

- Inactive or suspended users have no application-data access even if authentication technically succeeds.
- Anonymous and unauthenticated visitors have no access to horse, stable, ownership, membership, assignment, biochemistry, or comment data.
- Existing rows and comments remain attributed to inactive, suspended, or formerly assigned users.

## Assignment And Revocation Rules

- Administrators may create or revoke any assignment.
- Trainers may assign or revoke Stable Hands, Veterinarians, and Consultants only on horses already assigned to the Trainer.
- Trainers cannot manage other Trainers or expand their own horse/stable scope.
- Only Administrators control Trainer accounts and Trainer/Stable Manager assignment authority outside the narrow lower-level management rules above.
- When a horse assignment is revoked, access ends immediately.
- Existing comments remain with original authorship, but the former assignee loses access to the horse and comments.
- Administrators and assigned Trainers may assign or change horse ownership; Stable Managers may view but not change ownership.
- Ownership changes retain audit history.

## Horse And Stable Lifecycle

- Administrators may create horses globally.
- Trainers may create horses only within assigned stables.
- Stable Managers may create horses only within their stable.
- Administrators, assigned Trainers, and the horse's Stable Manager may edit core profile information.
- Only Administrators may create, rename, deactivate, restore, or delete a stable.
- Stable deletion must be soft/recoverable or blocked while dependencies exist.
- Horse and biochemistry record deletion is soft-delete only through normal application workflows.
- Administrators may restore any record; Trainers and Stable Managers may restore within their editing scope.
- Authorship and audit metadata survive deletion and restoration.

## Biochemistry Comment Workflow

Extend the existing `biochemistry_test_notes` capability; do not create a parallel generic comment system unless source review proves the existing table cannot safely support the accepted behavior.

- Comments appear as a distinct notes/comments section after a biochemistry entry.
- Administrator, authorised Trainer, Stable Manager, assigned Veterinarian, assigned Consultant, and assigned Stable Hand may add comments within their established scope.
- Owners are read-only and cannot comment.
- Plain text only, maximum 2,000 characters.
- No rich text, clickable-link feature, images, files, attachments, or notifications.
- Each active comment exposes safe author identity plus created and updated timestamps.
- Authors may edit or delete their own comments while they retain access.
- Administrators may remove any comment.
- No non-Administrator may edit or delete another author's comment.
- Deletion is soft-delete and retains author, deletion time, and deleting user.
- Full comment revision history is not required.
- Deleted comments are not displayed as active content to ordinary users.
- Comments survive assignment revocation, while the revoked user loses all access.

## Database And Migration Requirements

- Add the next immutable migration after `0010`; do not rewrite migrations `0001`-`0010`.
- Reconcile current seeded membership levels, permission mappings, role codes, assignment tables, helper functions, and RLS with the definitive matrix.
- Prefer explicit relationship tables and reusable secured helper functions over duplicated policy logic.
- Preserve fixed safe `SECURITY DEFINER` search paths and minimum justified execution grants.
- Revoke unintended `PUBLIC` and `anon` execution.
- Avoid relying on client-side role checks for security.
- Enforce inactive/suspended denial inside database authorization paths.
- Add constraints and indexes required for one primary operational role, explicit stable/horse scope, comment length, ownership/assignment integrity, and soft-delete queries.
- Regenerate `supabase/bootstrap/remote-init.sql` through the existing generator after the migration is complete.
- Update generated database types/contracts if the repository provides a supported generation path.

## Application Requirements

- Reconcile server actions, loaders, protected routes, navigation, and UI affordances with database policy; the UI must not offer operations RLS will reject.
- Add the comment list/composer and own-comment edit/delete controls to the existing biochemistry entry result/detail workflow.
- Preserve current scoring snapshots, lookup behavior, blocked states, public under-construction gate, and canonical messaging/design authority.
- Show clear access-denied/not-found behavior without disclosing whether an inaccessible cross-user or cross-stable record exists.
- No notification feature is added.

## Candidate-Only Authenticated Proof

Use candidate `uvskssaecdhxcgytkasc` only. Old project `tagnbgkroihagjmvehlx` is an absolute refusal target.

The test model must include:

- two run-tagged synthetic stables
- Administrator
- two Trainers sufficient for assigned, wrong-horse, peer, and cross-stable cases
- Stable Manager per required scope
- Owners sufficient for own-horse and other-owner denial
- Veterinarians and Consultants with assigned and unassigned cases, including permitted cross-stable explicit assignment
- Stable Hands with assigned, same-stable-unassigned, and cross-stable cases
- an inactive or suspended authenticated user
- unauthenticated requests
- bounded horses, biochemistry entries, and comments with unique run anchors

Every identity is non-personal. Use one operator-controlled non-personal inbox with distinct plus-address aliases. Do not record the base address or aliases in the Pack, repository, logs, retained output, or conversation.

## Protected Credential Handling

- Replacement publishable and secret keys exist; legacy `anon` and `service_role` keys are disabled.
- Do not open or inspect API-key values through browser automation or retained browser inspection.
- After local harness/code validation, the operator manually enters required candidate values through hidden prompts into one protected process-scoped PowerShell session.
- No key may appear in a command argument, command history, tracked or untracked environment file, screenshot, log, test artifact, retained output, or conversation.
- Builder may retain only presence booleans and exact candidate hostname/reference equality.
- Clear the process variables, stop the runtime, and close the terminal after testing.
- Any credential exposure stops work immediately for incident containment.

## Temporary Callback Manual Process

The real local passwordless callback test requires a temporary callback. Builder must keep the operator action separate from Builder actions and follow the Manual Intervention Rule.

- Candidate-only callback to add temporarily: `http://localhost:3000/auth/callback`.
- Site URL must remain `https://precisionperformance.com.au`.
- Production callback must remain `https://precisionperformance.com.au/auth/callback`.
- Before testing, operator reports only the sanitized two-URL list.
- After testing or any stop, operator removes only localhost and reports the restored production-only list.
- Builder verifies the sanitized state before proceeding/closing.
- No callback mutation on the old project is permitted.

## Cleanup And Failure Contract

- Use one unique Sprint 021 run ID with an exact validated format and attach it to every fixture.
- Declare maximum counts before remote creation.
- Maintain an in-memory creation ledger and perform reverse-order compensating cleanup after partial creation.
- Delete application fixtures in dependency-safe order before deleting Auth identities.
- Refuse broad, ambiguous, or over-limit cleanup.
- Do not accept any RLS result after incomplete creation, failed compensation, or ambiguous fixture ownership.
- On any failed assertion, stop testing, clean exact run-tagged state, restore the callback, clear credentials/runtime, and report the sanitized failure.
- Successful close requires zero run anchors, zero synthetic Auth identities, restored managed-data baselines, and the production-only callback.

## Completion Standard

Sprint 021 passes only when:

- every authorised database and application-route case succeeds
- every prohibited cross-role, cross-horse, cross-user, cross-stable, inactive, and anonymous case is denied
- the real local passwordless callback succeeds
- comment author/Administrator edit-delete rules pass
- all fixtures and Auth identities are removed
- callback restoration is proved
- Auth, Storage, and run-anchor counts return to the recorded baseline
- database structure, RLS, grants, advisors, lint, TypeScript, build, fixtures, secret scans, and diff checks pass

No security failure or incomplete cleanup may be waived.

## Scope Boundaries

In scope:

- role/permission/assignment schema and RLS changes required by the definitive matrix
- existing biochemistry notes extension into the accepted secured comment workflow
- affected application routes/actions/components/domain contracts
- candidate-only migration, authenticated testing, temporary callbacks, controlled identities/fixtures, and cleanup
- validators, verification SQL, harness replacement/extension, documentation, and planning closeout

Out of scope:

- production cutover or Vercel/environment changes
- any mutation of old project `tagnbgkroihagjmvehlx`
- public reopening
- password authentication
- notifications, rich text, links, uploads, images, or attachments for comments
- commerce, Stripe, DNS, scoring rules, recommendation content, OCR, or voice work
- real customer, horse, clinical, or personal data
- commit, push, or pull request unless separately requested

## Approved File Set

Builder may change only files required within these areas after exact source review:

- `supabase/migrations/` for the next migration only
- `supabase/bootstrap/remote-init.sql` through the existing generator
- `supabase/verification/`
- `scripts/` for narrow Sprint 021 validation and synthetic test tooling
- generated Supabase/database types if present and regenerated through the supported path
- affected `app/`, `components/`, and `lib/` files for role enforcement and biochemistry comments
- focused tests/fixtures
- `docs/` for Sprint 021 evidence and relevant Auth/RLS/biochemistry documentation
- Sprint 021 files and canonical planning closeout files

Builder must stop before editing an unrelated area or introducing a new provider/dependency not required by this Pack.

## Manual Intervention Rule

Whenever a required step is blocked or needs operator input, Builder must state separately:

1. `Manual process — operator`
2. what is blocked and evidence checked
3. exact numbered operator steps
4. sanitized response format with no secret values
5. `Builder process — after operator response`
6. what Builder will verify and do next

Do not combine manual and Builder actions in one instruction sequence. Instructions intended for Builder reports or handoffs must be returned in a single copyable plain-text code block.

============================================================
FILE: planning/sprints/021-definitive-role-matrix-and-authenticated-rls-proof/blueprint.md
============================================================

# Sprint 021 - Definitive Role Matrix And Authenticated RLS Proof Blueprint

## Phase 1: Source And Policy Inventory

1. Reconfirm Sprint 020G candidate-ready closeout, candidate/old references, dirty-worktree boundaries, and production-cutover prohibition.
2. Inventory membership levels, permissions, user/profile state, Trainers, Owners, stables, horses, assignments, biochemistry access, notes, helper functions, policies, server actions, routes, and existing 020G harness behavior.
3. Produce a current-versus-definitive matrix. Identify every schema, policy, grant, helper, route, UI, and test delta without changing files first.
4. Confirm the next migration number after `0010` and ensure historical migrations remain unchanged.

## Phase 2: Definitive Data And Authorization Design

1. Encode one primary operational role plus independent ownership relationships.
2. Encode active/suspended denial, multi-stable Trainer scope, single-stable Manager/Hand scope, and explicit cross-stable professional horse assignments.
3. Implement the hierarchy and management boundaries without permitting self-assignment, peer-Trainer administration, cross-stable escalation, or role promotion to Trainer/Administrator by a Trainer.
4. Reconcile horse creation/profile editing, ownership assignment, assignment/revocation, soft-delete/restore, and stable-lifecycle rules.
5. Extend `biochemistry_test_notes` with author, created/updated/deleted audit data and a 2,000-character plain-text constraint where not already present.
6. Design helper functions with safe fixed search paths and exact execution grants; prefer auditable helpers used consistently across policies.

## Phase 3: Migration And Local Verification

1. Create one new forward-only migration after `0010`.
2. Add/alter the minimum schema, constraints, indexes, seeded role/permission mappings, helpers, grants, and RLS policies required.
3. Do not silently broaden existing operational-table writes beyond the definitive matrix.
4. Regenerate bootstrap using the repository command and prove migration/bootstrap agreement.
5. Add structural, permission-matrix, policy, helper-grant, seed, and regression validators.
6. Validate a clean local migration path where supported before any candidate apply.

## Phase 4: Application Integration

1. Centralize role/scope decisions in shared server-side authorization/domain code rather than scattered string comparisons.
2. Align route loaders/actions with RLS and deny without resource-existence disclosure.
3. Add the biochemistry comments section after the entry/result content.
4. Implement plain-text creation, own-comment edit/delete, and Administrator delete behavior with length validation and safe output rendering.
5. Hide edit/delete controls from roles that cannot use them, while retaining RLS as the enforcement authority.
6. Preserve existing capture, scoring, blocked-state, design, responsive, and accessibility behavior.
7. Add focused unit/integration tests for matrix evaluation, comment validation, action authorization, and denial messaging.

## Phase 5: Candidate Apply Preflight

1. Reconfirm exact candidate `uvskssaecdhxcgytkasc` and refuse old `tagnbgkroihagjmvehlx` plus every unexpected target.
2. Reconfirm both projects healthy through approved read-only metadata without selecting the old project for mutation.
3. Verify candidate ledger is exactly `0001`-`0010`, no synthetic run anchors exist, Auth baseline is zero, Storage baseline is zero/zero, and the callback list is production-only.
4. Record migration dry-run/status and exact expected structural delta.
5. Run local syntax, lint, TypeScript, build, domain fixtures, secret scan, and `git diff --check` before remote migration.
6. Stop on target ambiguity, unexpected data, credential exposure, billing, schema drift, or validation failure.

## Phase 6: Apply And Structural Proof

1. Apply the new migration once to the exact candidate using the supported migration path.
2. Do not repair, mark applied, replay bootstrap, or redirect a failed apply.
3. Verify the genuine ledger, all expected objects/policies/grants/helpers/constraints/indexes/seeds, existing lookup totals, retired-surface absence, RLS enablement, and advisor disposition.
4. Confirm old project remains healthy and unchanged using read-only identity/status evidence only.

## Phase 7: Protected Local Runtime Preparation

1. Fully validate non-secret harness/runtime behavior and output sanitization before requesting credentials.
2. Provide separate `Manual process — operator` instructions for temporary localhost callback addition; stop for the sanitized callback list.
3. Provide separate `Manual process — operator` instructions for protected PowerShell hidden entry of candidate URL, publishable key, secret key, and the non-personal inbox; do not request or retain values.
4. From the same protected process, verify only candidate equality and variable presence, then start the candidate-connected localhost runtime.
5. Never use browser inspection on the API-key page and never print process environment.

## Phase 8: Controlled Synthetic Creation

1. Use a new run ID; do not reuse reserved 020G run ID `020G-RLS-20260720-01`.
2. Prove zero run anchors and declared bounded maximums.
3. Create distinct plus-address Auth identities and exact two-stable application fixtures through supported protected paths.
4. Maintain an in-memory ledger and reverse compensate on partial failure.
5. Stop before RLS testing unless identity/application mappings and ownership anchors are exact.

## Phase 9: Authenticated Matrix And Application Proof

Test through distinct real user sessions, not a service key masquerading as a user.

At minimum prove:

- Administrator global permitted operations.
- Trainer assigned-horse/stable operations and denials for unassigned same-stable horse, peer-Trainer administration, self-expansion, and cross-stable access.
- Stable Manager Trainer-level horse/record behavior across own stable and denial across another stable.
- Veterinarian and Consultant assigned-horse read/comment plus unassigned and underlying-record-write denial.
- Stable Hand assigned-horse read/comment plus same-stable-unassigned, record-write, and cross-stable denial.
- Owner own-horse read plus other-owner, comment, and record-write denial.
- inactive/suspended authenticated denial and anonymous denial.
- allowed and prohibited user lifecycle, role-change, assignment, revocation, ownership, horse, and stable lifecycle actions.
- comment create/read, 2,000-character boundary, over-limit rejection, author edit/delete, other-author denial, Administrator deletion, revoked-author access denial, and retained attribution.
- application passwordless callback, protected redirects, accessible routes, inaccessible route behavior, and biochemistry capture/result/comment workflow.
- scoring/lookup snapshot behavior remains unchanged.

Record sanitized case identifiers and result classes only; retain no email address, token, link, credential, user payload, horse payload, or comment text.

## Phase 10: Mandatory Cleanup And Restoration

1. Stop runtime interactions and delete exact run-tagged application fixtures in dependency-safe reverse order.
2. Prove application cleanup zero before deleting Auth identities.
3. Delete every synthetic Auth identity and prove baseline zero.
4. Provide separate manual instructions to remove only the localhost callback; verify the production-only callback list and unchanged Site URL.
5. Clear protected variables, stop localhost runtime, and close the terminal.
6. Verify zero run anchors, Auth baseline, Storage baseline, migration/structure, advisor result, both-project health, and old-project integrity.
7. Incomplete cleanup is a sprint failure and remains an active incident until resolved.

## Phase 11: Closeout

1. Run all repository and Sprint 021 validators, lint, TypeScript, production build, domain fixtures, secret/credential scans, JSON validation, and `git diff --check`.
2. Record exact migration and sanitized permission/test/cleanup evidence.
3. Update planning state, status, schedule, decisions, risks, questions, and Architect briefing.
4. Do not cut over production, change Vercel, reopen public access, commit, push, or create a PR.

============================================================
FILE: planning/sprints/021-definitive-role-matrix-and-authenticated-rls-proof/acceptance.md
============================================================

# Sprint 021 - Definitive Role Matrix And Authenticated RLS Proof Acceptance

## Role And Scope Model

- [ ] The implemented hierarchy is Administrator, Trainer, Stable Manager, Veterinarian/Consultant, Stable Hand, with Owner as a separate read-only relationship.
- [ ] Each account has one primary operational role; ownership may coexist without merging roles.
- [ ] Trainer is the most senior role below Administrator, but cannot manage Administrators or peer Trainers, grant Trainer/Administrator, or expand their own scope.
- [ ] Administrator, Trainer, Stable Manager, Veterinarian, Consultant, Stable Hand, Owner, inactive/suspended, and anonymous behavior exactly matches requirements.
- [ ] Multi-stable Trainer/professional/Owner relationships and single-stable Manager/Hand boundaries are enforced.

## Horse, Stable, User, And Assignment Lifecycle

- [ ] Horse create/profile-edit permissions match the accepted role and scope rules.
- [ ] Only Administrators control stable lifecycle and dependency safety prevents unsafe deletion.
- [ ] Assignment, revocation, ownership, user activation/suspension, and role-change permissions prevent self-assignment, peer escalation, and cross-stable mutation.
- [ ] Revocation immediately removes access without deleting historical attributed comments.
- [ ] Record deletion/restoration is soft, scoped, attributed, and recoverable.

## Biochemistry Comments

- [ ] Existing biochemistry notes are extended rather than duplicated without evidence.
- [ ] Comments appear after a biochemistry entry and are plain text with a 2,000-character maximum.
- [ ] Allowed roles can comment only within their horse/stable scope; Owners cannot comment.
- [ ] Authors may edit/delete their own active comments; Administrators may remove any comment; all other cross-author mutations are denied.
- [ ] Soft-deletion retains author, deletion time, and deleting user; ordinary users do not see deleted comments as active content.
- [ ] No notifications, rich text, link feature, files, images, or attachments are added.

## Schema And RLS

- [ ] One forward-only migration after `0010` implements the reviewed delta; historical migrations remain unchanged.
- [ ] Role seeds, permissions, relationships, constraints, indexes, helpers, grants, and RLS agree with the definitive matrix.
- [ ] Every application table remains RLS-enabled and security enforcement does not depend on the client UI.
- [ ] Security-definer helpers have fixed safe search paths and minimum exact execute grants; unintended `PUBLIC`/`anon` execution is absent.
- [ ] Inactive/suspended and anonymous access is denied at database boundaries.
- [ ] Bootstrap is regenerated through the supported command and matches the migration chain.

## Application

- [ ] Server actions/loaders and UI affordances agree with database authorization.
- [ ] Inaccessible resources do not disclose cross-user/cross-stable existence.
- [ ] Biochemistry capture, result display, scoring, lookups, blocked states, responsive behavior, accessibility, design authority, and public gate remain valid.
- [ ] Focused automated tests cover authorization decisions and comment behavior.

## Candidate Safety

- [ ] Every mutating remote action has an exact equality guard for `uvskssaecdhxcgytkasc` and refuses `tagnbgkroihagjmvehlx` plus unexpected targets.
- [ ] Both projects are healthy before/after; the old project is never selected for mutation.
- [ ] Candidate starts with ledger `0001`-`0010`, baseline-zero Auth/Storage/run anchors, and production-only callback.
- [ ] The new migration applies once without repair, fabricated history, or bootstrap replay.
- [ ] Structural and advisor evidence passes after apply.

## Protected Credentials And Callback

- [ ] Keys are supplied only by manual hidden entry into a process-scoped protected PowerShell session after non-secret validation.
- [ ] No key, token, link, inbox, Auth payload, environment value, or credential fragment appears in files, commands, history, logs, screenshots, browser inspection, retained output, or conversation.
- [ ] Browser automation does not inspect API-key values.
- [ ] Localhost callback is added manually only for the test window; Site URL and production callback remain unchanged.
- [ ] Localhost callback is removed after testing or any stop, and production-only restoration is proved.
- [ ] Protected variables are cleared, runtime stopped, and terminal closed.

## Authenticated Proof

- [ ] Full two-stable synthetic identity/fixture matrix is created with one unique new run ID and declared safety maximums.
- [ ] Distinct actual authenticated user sessions prove every required positive case.
- [ ] Wrong-horse, same-stable-unassigned, cross-user, cross-stable, forbidden role-management, inactive/suspended, and anonymous cases are denied.
- [ ] Passwordless callback and affected application routes pass against the candidate.
- [ ] Comment permission, authorship, edit/delete, length, revocation, and soft-delete cases pass.
- [ ] Service/secret credentials are used only for bounded administration and never substituted for end-user authorization proof.

## Cleanup

- [ ] Partial creation uses exact reverse compensation; no testing continues after incomplete compensation.
- [ ] Application fixtures are deleted before Auth identities using exact run anchors and bounded counts.
- [ ] Ambiguous, broad, or over-limit cleanup is refused.
- [ ] Final run anchors and synthetic Auth identities are zero; Storage remains at baseline; callback is restored.
- [ ] Any security assertion or cleanup failure stops successful closeout and is not waived.

## Validation And Closeout

- [ ] Migration/bootstrap/structure/RLS/grant/permission validators pass.
- [ ] Lint, TypeScript, production build, route safety, domain fixtures, and focused Sprint 021 tests pass.
- [ ] Secret/credential scans, status JSON parsing, staged/generated-state checks, and `git diff --check` pass.
- [ ] Durable evidence states exactly what was and was not proven without secrets or payloads.
- [ ] Production cutover, Vercel/environment mutation, old-project mutation, public reopening, notification/upload scope, commit, push, and PR did not occur.
- [ ] Every manual intervention is labelled, separated into operator and Builder processes, numbered, sanitized, and followed by Builder verification.

============================================================
FILE: planning/sprints/021-definitive-role-matrix-and-authenticated-rls-proof/handoff-prompt.md
============================================================

# Sprint 021 - Builder Handoff Prompt

You are Builder for Sprint 021 under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, all Sprint 021 files, Sprint 020G closeout/review evidence, current migrations/bootstrap/verification SQL, membership/assignment/RLS helpers and policies, Supabase consumers, biochemistry capture/results/notes code, design authority, risks, questions, and Architect briefing before editing.

Implement the definitive hierarchy and access matrix exactly as written. Trainer is the most senior operational role below Administrator. Do not invent combined operational roles, broader same-stable visibility, self-assignment, peer-Trainer administration, cross-stable access, or Owner write/comment access.

Extend the existing `biochemistry_test_notes` model into the accepted plain-text comment workflow. Do not create a parallel comment system without documented source evidence. Keep comments limited to 2,000 characters with scoped creation, author-owned edit/delete, Administrator removal, timestamps, and soft-delete audit. Add no notifications, rich text, links, images, files, or attachments.

Create one forward-only migration after `0010`; do not edit historical migrations. Enforce permissions in RLS and secured helpers with fixed search paths and minimum grants. Regenerate bootstrap through the existing generator and align server-side application behavior and UI controls with RLS.

Validate all local/non-secret code and harness behavior before requesting protected values or remote mutation. Candidate `uvskssaecdhxcgytkasc` is the only remote mutation target. Explicitly refuse old project `tagnbgkroihagjmvehlx` and every unexpected reference. Production cutover remains unauthorized.

Use one new run ID, not reserved 020G ID `020G-RLS-20260720-01`. Create the full two-stable, all-role synthetic matrix only after exact guards, baseline, bounds, callback, protected process, and compensation behavior pass. Use real distinct authenticated sessions for RLS proof. A secret/service credential is administrative tooling only and cannot prove user authorization.

All operator actions must be separated and labelled. For every manual intervention, report the blocker/evidence, then `Manual process — operator` with numbered steps and a sanitized response template, followed separately by `Builder process — after operator response`. Never blend operator and Builder actions. Instructions intended for Builder handoff/reporting must be supplied as one copyable plain-text block.

The temporary localhost callback may exist only during testing. The operator supplies candidate values through hidden prompts into a protected process-scoped PowerShell session. Never inspect key values through browser automation; never print environment variables; never put secrets or inboxes in commands, files, screenshots, logs, retained output, artifacts, or conversation. Stop immediately on exposure.

On any failed security assertion or partial creation, stop tests, compensate exact run-tagged fixtures, delete application fixtures before Auth identities, restore the production-only callback, clear credentials/runtime, and report sanitized evidence. Do not accept results after incomplete or ambiguous cleanup.

Preserve unrelated dirty-worktree changes. Do not modify the old project, Vercel, production environment, deployment, DNS, Stripe, public gate, passwordless exception, scoring rules, recommendation content, uploads, or notifications. Do not commit, push, or create a PR unless separately requested.

Close only after every positive and denial case, application callback/route flow, structural/security check, and mandatory cleanup/restoration condition passes. If any required proof or cleanup remains incomplete, report the exact evidence-backed failure rather than claiming Sprint 021 complete.
