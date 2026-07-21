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
