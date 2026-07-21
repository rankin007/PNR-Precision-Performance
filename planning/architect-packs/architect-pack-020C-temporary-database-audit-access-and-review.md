# Architect Pack 020C - Temporary Database Audit Access And Review

============================================================
FILE: planning/sprints/020C-temporary-database-audit-access-and-review/requirements.md
============================================================

# Sprint 020C - Temporary Database Audit Access And Review Requirements

## Role And Profile

Builder executes this follow-up under the `strict` workflow profile and implements only from this applied sprint folder.

## Goal

Use a temporary, uniquely named, least-privilege database audit login to complete a sanitized production database security and configuration review, deliver the review, and then revoke and remove that access without exposing credentials or changing application behavior.

## Sources Of Truth

- `AGENTS.md`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/sprints/020B-remote-biochemistry-verification/VERIFICATION.md`
- `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `supabase/migrations/0009_biochemistry_test_data_model.sql`
- existing Supabase migrations, policies, helper functions, and verification SQL

## Firm Decision

The accepted access method is a temporary least-privilege database audit user. Its password, connection string, tokens, and secret fragments must never appear in this conversation, shell output retained in the repository, screenshots, sprint files, review evidence, logs, staging, or commits. Credential creation and delivery occur only through an approved out-of-band secret channel controlled by the operator.

## In Scope

- define a unique temporary login name that is unmistakably audit-only and time-bounded
- prepare exact operator instructions or narrowly scoped SQL for creating that login
- grant only the minimum connection, schema-usage, catalog/metadata visibility, and specifically justified object-read privileges needed for the review
- connect with the temporary login through an approved secret-aware method without printing the password or full connection string
- inspect database identity, schema objects, columns, constraints, indexes, functions, owners, effective grants, RLS enablement, policies, and the previously verified biochemistry lookup counts/uniqueness
- identify privilege, ownership, policy, helper-function, search-path, or configuration risks supported by sanitized evidence
- produce a concise severity-ranked audit review with evidence, impact, and bounded recommendations
- deliver the completed review before revocation
- revoke connection/object privileges, terminate only sessions belonging to the exact temporary login if necessary, remove the login, and verify it no longer exists or connects
- update durable planning closeout records

## Least-Privilege Boundary

- Default to metadata/catalog inspection and aggregate verification only.
- Do not grant superuser, service-role, database-owner, schema-owner, role-management, bypass-RLS, replication, create-database, create-role, create-schema, write, execute-on-unrelated-functions, or broad `pg_read_all_data` access.
- Do not grant access to `auth`, `storage`, Vault/secrets, billing, customer payloads, uploaded objects, or unrestricted application rows.
- Any direct `SELECT` grant must name the exact object and columns or be demonstrably required for a pre-approved aggregate check. Prefer operator-executed sanitized aggregate results where a grant would expose row content.
- The audit login must not own objects and must not receive membership in application, authenticator, service, administrative, or owner roles.
- This database audit login does not emulate an authenticated application JWT. Definitive end-user, cross-role, wrong-horse, or cross-stable RLS proof remains Sprint 021 scope.

## Authorized Production Changes

Only these production mutations are in scope:

1. create the exact temporary audit login
2. grant the reviewed least-privilege access required by this sprint
3. revoke those grants after review delivery
4. terminate sessions belonging only to that exact login when required for removal
5. drop/remove that exact temporary login after confirming it owns no objects

No schema, table, row, policy, function, ownership, application-role, Supabase setting, migration, auth user, storage, or customer-data change is included.

## Out Of Scope

- migration replay or schema repair
- production row creation, update, or deletion
- synthetic authenticated fixtures or application workflow smoke
- role-matrix design or RLS-policy expansion
- password generation inside repository tooling or transmission in this conversation
- application code, UI, deployment, DNS, Stripe, public reopening, push, PR, or commit
- destructive cleanup beyond the exact temporary login and its exact sessions/grants

## Approved File Set

Builder may edit:

- `planning/sprints/020C-temporary-database-audit-access-and-review/**`
- `docs/DATABASE_AUDIT_REVIEW_020C.md`
- `supabase/verification/020C-database-audit.sql`, if a read-only audit artifact is useful
- `scripts/validate-database-audit-020C.*`, if a local non-secret validator is useful
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Inspection only:

- existing migrations, verification SQL, database/auth documentation, and application access code
- safe environment names and project reference; never print environment values
- remote database metadata exposed to the temporary login

## Design, Privacy, And Claims Carry-Forward

No UI or public messaging change is planned. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` remains binding. This sprint crosses only the dedicated temporary database-access gate described above; it does not cross auth/RLS redesign, provider, CMS, aggregation, terminology, public-reopening, pricing, migration, or deployment gates. Evidence must exclude confidential row content and secret material.

## Manual Intervention Rule

For account creation, out-of-band credential delivery, connection failure, insufficient privilege, unexpected data visibility, review delivery, session termination, revocation, or removal, Builder must record:

- what is blocked or not working
- evidence already checked
- the exact user/operator action needed
- numbered steps for that action
- what Builder will verify afterward

Builder must stop immediately if the credential appears in conversation/output, the login has broader privileges than specified, the target identity is uncertain, the account owns objects, or removal would affect any role other than the exact temporary audit login.

============================================================
FILE: planning/sprints/020C-temporary-database-audit-access-and-review/blueprint.md
============================================================

# Sprint 020C - Temporary Database Audit Access And Review Blueprint

## Execution Order

1. Reconfirm strict scope, the production project reference `tagnbgkroihagjmvehlx`, dirty-worktree boundaries, and the exact unique temporary login name.
2. Inspect existing migrations, verification artifacts, and access documentation locally. Define the smallest metadata and aggregate query set needed for the review.
3. Prepare the creation/grant and revoke/remove procedures. Check that the proposed login has no elevated attributes, inherited memberships, ownership, default privileges, or unrelated object access.
4. Ask the operator to create the login and deliver its secret only through an approved out-of-band channel. Do not ask the operator to paste the password or connection string into this conversation.
5. Connect without echoing secrets. Record only safe project/database identity, login name, timestamps, privilege summary, and sanitized query outcomes.
6. Run metadata-first, read-only checks. If a query fails for insufficient privilege, determine whether it is essential. Prefer omission or operator-returned sanitized aggregates over broadening the login.
7. If any production row becomes visible unexpectedly, stop querying that surface, do not retain or reproduce the content, and record the privilege defect without row details.
8. Write `docs/DATABASE_AUDIT_REVIEW_020C.md` with scope, limitations, evidence, findings by severity, and recommendations. Explicitly distinguish structural/security review from application JWT/RLS behavioral proof.
9. Deliver the completed review to the user before access removal.
10. Revoke the exact login's connection and object privileges. Confirm it owns no objects or privileges requiring reassignment. Terminate only its remaining sessions if needed, then drop/remove only that login.
11. Verify the login is absent, cannot reconnect, has no remaining grants/memberships, and no unrelated database object or role changed.
12. Run local validation and update state, status, schedule, risks, questions, decisions where needed, and Architect briefing.

## Minimum Audit Coverage

- target project/database identity and current login identity
- login attributes, memberships, owned objects, explicit grants, default privileges, and ability to connect
- public biochemistry tables, columns, constraints, indexes, owners, RLS flags, and policies
- helper-function definitions, security-definer status, owners, fixed search paths, and execute grants
- effective schema/table/function privileges relevant to anonymous, authenticated, application, and audit roles, using metadata only
- comparison of expected five tables, three helpers, seven indexes, thirteen policies, 1,774 lookup rows, and zero duplicate lookup keys against Sprint 020B evidence
- unexpected public exposure, privilege escalation paths, overly broad grants, owner mismatches, or policy gaps visible through the permitted metadata
- audit limitations caused by least privilege or missing authenticated fixtures

## Credential Handling

- Never place a password directly in a command argument that will be displayed or retained.
- Use the approved client/secret mechanism available to Builder and keep command echo/debug tracing disabled.
- Do not save credentials in `.env*`, scripts, SQL, Markdown, shell history, screenshots, clipboard notes, or workspace files.
- Sanitize errors before retaining them. A sanitized error may name the temporary login and database/project, but not hosts containing embedded credentials, passwords, tokens, or connection strings.
- Clear any ephemeral credential material through the same approved secret mechanism after access removal.

## Review Finding Model

Each finding must include severity (`critical`, `high`, `medium`, `low`, or `informational`), affected object/boundary, sanitized evidence, realistic impact, and a bounded recommendation. Do not change the database to remediate findings in this sprint. Critical or active-exploitation evidence is an immediate stop-and-report condition.

## Revocation And Removal Safety

- Resolve the exact login identifier literally; do not use a wildcard or computed broad role target.
- Revoke connection first and prevent new sessions before terminating existing sessions.
- Confirm the role owns no objects. Do not use broad `REASSIGN OWNED` or `DROP OWNED` against an uncertain target.
- Revoke only grants made for this audit unless evidence proves another grant belongs exclusively to the same temporary login.
- Drop only the exact temporary login.
- After removal, query role catalogs and grants to prove absence and verify unrelated role/object counts and the Sprint 020B structural baseline remain unchanged.

## Stop Conditions

Stop and record manual intervention if:

- project/database identity is not exact
- credentials are exposed or supplied through conversation
- requested inspection needs superuser, owner, bypass-RLS, service-role, broad row-read, or write access
- observed privileges exceed the pack boundary
- an unexpected schema/data mutation occurs
- the temporary login owns an object or is entangled with non-audit grants
- revocation/removal targets cannot be proven exact

============================================================
FILE: planning/sprints/020C-temporary-database-audit-access-and-review/acceptance.md
============================================================

# Sprint 020C - Temporary Database Audit Access And Review Acceptance

## Access Safety

- [ ] Production project/database and exact temporary login identity are recorded without secrets.
- [ ] The login is unique, time-bounded, login-capable only, non-owner, and has no elevated attributes or role memberships.
- [ ] Granted access is limited to reviewed metadata/catalog visibility and specifically justified aggregate/object reads.
- [ ] No password, connection string, token, or secret fragment appears in conversation, retained output, repository files, screenshots, staging, or commits.
- [ ] No unrestricted customer, trainer, stable, horse, pathology, upload, auth, storage, or billing row content is accessed or retained.

## Audit Review

- [ ] The audit covers identity, objects, owners, constraints, indexes, functions, search paths, grants, RLS enablement, policies, and relevant effective privileges.
- [ ] Sprint 020B structural counts and uniqueness are corroborated or any difference is clearly reported.
- [ ] Findings are severity-ranked and include sanitized evidence, impact, recommendation, and limitations.
- [ ] The review does not claim authenticated JWT/cross-role RLS proof without the required fixtures and sessions.
- [ ] `docs/DATABASE_AUDIT_REVIEW_020C.md` is delivered before the temporary login is removed.

## Revocation And Removal

- [ ] New connections are prevented before active audit sessions are terminated.
- [ ] Only sessions for the exact temporary login are terminated.
- [ ] The login owns no objects before removal; no broad reassignment or destructive cleanup is used.
- [ ] Audit-specific grants and memberships are revoked and the exact temporary login is removed.
- [ ] Post-removal checks prove the login cannot reconnect and has no remaining grants, memberships, sessions, or owned objects.
- [ ] Unrelated roles, grants, schema objects, application data, and the Sprint 020B structural baseline remain unchanged.

## Local And Closeout Validation

- [ ] Any new read-only audit SQL/validator passes local static safety checks.
- [ ] `git diff --check` passes, allowing only existing line-ending warnings.
- [ ] Planning state/status/schedule/briefing and relevant decisions/risks/questions reflect the actual outcome.
- [ ] No migration, remediation, application change, deployment, commit, push, PR, Stripe action, public reopening, or unrelated production mutation occurs.
- [ ] Every manual intervention includes the blocker, evidence, exact numbered action, and follow-up verification.

============================================================
FILE: planning/sprints/020C-temporary-database-audit-access-and-review/handoff-prompt.md
============================================================

# Sprint 020C - Builder Handoff Prompt

You are Builder for Sprint 020C under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, `planning/sprints/020B-remote-biochemistry-verification/VERIFICATION.md`, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, migration 0009, relevant Supabase access patterns, risks, questions, and the Architect briefing before acting.

Use the accepted temporary least-privilege database audit login. The operator must create and transmit its password only through an approved out-of-band secret channel. Never ask for or accept the password in this conversation, and never print, persist, screenshot, stage, or commit it or any connection string/token fragment.

Work metadata-first. Do not broaden access merely to make a check convenient. The only production changes in scope are creating the exact audit login, granting its narrowly reviewed access, revoking those grants, terminating only that login's sessions if needed, and removing that exact login after the review is delivered. Do not alter schema, rows, policies, functions, ownership, application roles, Supabase settings, auth users, storage, or customer data.

Produce and deliver `docs/DATABASE_AUDIT_REVIEW_020C.md` before revocation. Rank findings, sanitize evidence, and state limitations honestly. This audit does not replace Sprint 021 authenticated application/JWT and cross-role RLS proof.

After delivery, revoke access and remove the audit login. Prove exact-target cleanup and absence without using broad `REASSIGN OWNED`, `DROP OWNED`, wildcards, or destructive database cleanup. If the account owns objects, has unexpected privileges, exposes row data, cannot be removed safely, or any secret is exposed, stop and follow the manual-intervention rule.

Preserve unrelated dirty-worktree changes. Do not commit, push, create a PR, deploy, reopen public surfaces, apply migrations, remediate findings, or perform any production mutation outside the exact temporary-account lifecycle defined here. Close with sanitized audit evidence, revocation proof, and accurate durable planning records.
