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
