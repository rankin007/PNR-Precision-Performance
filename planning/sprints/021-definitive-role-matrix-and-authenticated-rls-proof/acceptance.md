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
