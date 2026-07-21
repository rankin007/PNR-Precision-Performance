# Sprint 020E - CLI-Mediated Supabase Structural Audit Execution Blueprint

## Execution Order

1. Reconfirm strict scope, dirty-worktree boundaries, completed 020D evidence, paused 020C state, exact linked project reference `tagnbgkroihagjmvehlx`, production classification, and fixed role name `pp_audit_020e_20260720`.
2. Read installed CLI `db query` and `db advisors` help plus current official documentation. Classify every intended command before execution.
3. Update stale 020C procedure/review language: remove the password-bearing `LOGIN`, `createuser`, credential-delivery, fixed-expiry, missing-client, and CLI-unavailable path. Preserve its valid least-privilege, review-before-cleanup, and exact-target safeguards.
4. Build separate setup, read-only audit, and cleanup SQL files. Never combine setup/cleanup DDL with the audit query file.
5. Build/extend static validation to enforce exact role name, fixed role attributes, forbidden grants/commands, `BEGIN ... READ ONLY`, early `SET LOCAL ROLE`, immediate identity assertion, catalog-only structural reads, prohibited row-bearing relations, no secret patterns, exact cleanup, and no broad destructive statements.
6. Inventory expected structures from local migrations/docs and define comparison counts/fingerprints without remote row access.
7. Run local static validators and `git diff --check`. Do not connect remotely until they pass.
8. Run a read-only linked preflight that returns only current database/session identity, exact target evidence available through the approved path, existing-role count for the fixed audit role, and safe baseline counts. Stop if the role already exists; do not reuse, alter, or drop an unexplained role.
9. Execute only the validated setup file through `npx --no-install supabase db query --linked --file ...`. Confirm the role's attributes, zero memberships, zero ownership, minimal explicit grants, and ability to downshift. Stop and clean up if any check differs.
10. Execute the validated structural audit file. It must begin a read-only transaction, set the exact local role before structural queries, assert identity/transaction state, query catalogs only, and roll back.
11. Run `npx --no-install supabase db advisors --linked --type security` using default non-debug output. Retain only sanitized advisor identifiers, severity, object, and summary. Do not run any suggested fix.
12. Compare output against local migrations, Sprint 020B evidence, expected Supabase structures, and accepted security boundaries. Investigate inconsistencies with additional locally reviewed catalog-only queries only; amend/validate the audit file before running new queries.
13. Write `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md` and finalize `docs/DATABASE_AUDIT_REVIEW_020C.md` with scope, sanitized evidence, findings, limitations, migration-history mismatch, and bounded recommendations.
14. Deliver the completed audit review to the user before cleanup. Record delivery time and the exact pending cleanup role.
15. After delivery, execute only the validated cleanup file. Revoke exact grants, verify zero ownership/membership/dependencies, terminate only demonstrably exact audit-role sessions if required, and drop only `pp_audit_020e_20260720`.
16. Run post-cleanup verification: zero role references/sessions/grants/ownership, unchanged unrelated role/object counts, unchanged Sprint 020B baseline, ignored link state, and no secret/staged output.
17. Run final validators and update state/status/schedule/briefing/decisions/risks/questions. Close 020C and 020E accurately only when review delivery and cleanup both pass.

## Setup Artifact Requirements

`020E-audit-role-setup.sql` must:

- fail safely if the exact role already exists
- create only `pp_audit_020e_20260720`
- specify every negative role attribute explicitly
- create it as `NOLOGIN`
- grant only reviewed schema usage required for metadata resolution
- contain no password/verifier, membership grant, table/sequence/function privilege, ownership, default privilege, application schema mutation, or unrelated statement
- return sanitized verification of attributes, memberships, owned-object count, and explicit grants

Do not make setup broadly idempotent by adopting an existing role. Existing-role discovery is a stop condition.

## Audit Artifact Requirements

`020E-structural-audit.sql` must:

1. begin a transaction explicitly marked read-only
2. set the exact local role before structural inspection
3. assert the current role, session role context, and read-only transaction state
4. assert the role has no elevated attributes, memberships, ownership, row privileges, or unexpected schema access
5. query only approved catalogs and metadata functions
6. avoid application relations, auth/storage rows, Vault/secrets, user/session/token data, and row-bearing aggregates
7. fingerprint rather than retain sensitive function definitions where appropriate
8. roll back explicitly

Where a catalog expression may reveal confidential literals, return a fingerprint and safe classification rather than the raw expression. Names required to identify structural findings may be retained unless they contain a suspected secret.

## Minimum Structural Result Set

- safe server/database version and identity context
- schemas/extensions inventory
- relation inventory by kind/schema/owner/RLS state
- column/type/default metadata
- constraint and foreign-key inventory
- index inventory and validity
- function/procedure security inventory and fingerprints
- trigger inventory
- policy inventory
- explicit and default ACL inventory plus PUBLIC/anon/authenticated effective privileges
- role-attribute/membership summary relevant to exposed access boundaries
- publication/replication structural summary
- Supabase security-advisor results
- local-versus-remote migration-history mismatch statement
- Sprint 020B biochemistry structure comparison

## Privilege Downshift Proof

The audit is invalid unless retained sanitized evidence proves:

- `session_user` is the linked CLI database session identity
- `current_user` becomes exactly `pp_audit_020e_20260720` before inspection
- transaction state is read-only
- the audit role has no elevated attributes, memberships, owned objects, or application-row privileges

If the linked session cannot `SET LOCAL ROLE`, do not grant membership or change the role. Roll back, remove the temporary role if safely possible, and record manual intervention for a revised access design.

## Advisor Boundary

The security advisor may run through the linked CLI connection because it is a Supabase-provided read-only diagnostic rather than the custom audit transaction. Treat its output as a separate privileged diagnostic source. Do not claim it ran under the temporary role, and do not execute suggested remediation.

## Review Delivery Gate

Before cleanup, Builder must provide the completed sanitized review in conversation and durable files. The review must explicitly state that temporary role cleanup is pending. Delivery is not permission to remediate findings.

## Cleanup Artifact Requirements

`020E-audit-role-cleanup.sql` must:

- resolve the exact literal role only
- revoke only audit-specific grants
- verify zero owned objects, memberships, unexpected grants, and dependencies before drop
- stop instead of using `REASSIGN OWNED` or `DROP OWNED`
- terminate no session unless it is demonstrably attributable to the exact role; because the role is `NOLOGIN` and used through `SET LOCAL ROLE`, expect no direct login session
- drop only `pp_audit_020e_20260720`
- verify zero remaining role, membership, ownership, grant, and direct-session references

If cleanup cannot complete safely, Sprint 020E remains active with a critical manual intervention; do not mark either 020C or 020E complete.

## Migration-History Finding

Record as a separate finding that local versions `0001`-`0009` have no matching remote CLI migration-history records while production objects exist. Do not infer an apply sequence, insert history records, mark migrations applied, replay SQL, repair, push, reset, or reconcile under this sprint.

## Validation

At minimum run:

- Architect Pack check for applied pack provenance
- 020C metadata-audit validator after its updates
- new 020E setup/audit/cleanup static validator
- JSON parse and expected status assertions
- secret-pattern scan over sprint/report/verification artifacts
- forbidden-command/mutation scan
- Git ignore and staged-file checks for `supabase/.temp/**` and temporary output
- `git diff --check`, allowing only existing line-ending warnings
