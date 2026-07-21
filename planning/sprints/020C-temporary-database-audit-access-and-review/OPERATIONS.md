# Sprint 020C Operator Procedure - Superseded By Sprint 020E

## Current Lifecycle

Sprint 020E replaces the former password-bearing temporary-login procedure with the approved CLI-mediated temporary NOLOGIN role lifecycle.

- Production project: tagnbgkroihagjmvehlx
- Project name: PNR Precision Performance
- Pinned CLI: npx --no-install supabase version 2.109.1
- Exact temporary role: pp_audit_020e_20260720
- Setup: supabase/verification/020E-audit-role-setup.sql
- Audit: supabase/verification/020E-structural-audit.sql
- Cleanup: supabase/verification/020E-audit-role-cleanup.sql
- Static validator: scripts/validate-supabase-structural-audit-020E.ps1

No separate audit credential, connection string, credential delivery, expiry, PostgreSQL client, or direct login is used. Protected CLI authentication and linking remain governed by docs/SUPABASE_CLI_CONNECTIVITY_020D.md.

## Required Sequence

1. Reconfirm the safe linked reference equals tagnbgkroihagjmvehlx and the operator classification is production.
2. Verify the exact role does not already exist. Stop if it exists; do not adopt, alter, or remove an unexplained role.
3. Run both the updated 020C validator and the 020E validator.
4. Execute only the validated setup file through supabase db query --linked --file.
5. Confirm the role is NOLOGIN, non-elevated, has zero memberships/ownership, and only the reviewed public schema USAGE.
6. Execute only the validated audit file. It begins READ ONLY, performs SET LOCAL ROLE, proves the downshift, reads catalogs only, and rolls back.
7. Run the Supabase security advisor separately as a privileged read-only diagnostic.
8. Deliver sanitized findings before cleanup and state that cleanup remains pending.
9. Execute only the validated cleanup file.
10. Prove zero remaining role, direct sessions, memberships, ownership, dependencies, and audit grants.

## Hard Stops

Stop on target mismatch, pre-existing role, failed role downshift, elevated attributes, membership or ownership, application-row privilege, unexpected row payload, suspected secret exposure, critical finding, unreviewed mutation, or cleanup dependency.

Do not broaden grants or role membership to bypass a failure. Do not use REASSIGN OWNED, DROP OWNED, wildcard cleanup, broad session termination, migration reconciliation, schema/data remediation, or suggested advisor fixes.

## Manual Intervention

If a phase cannot proceed:

1. Record what is blocked and the sanitized error class.
2. Record the target, artifact hash, and checks already completed.
3. State the exact operator action required without requesting a secret in conversation.
4. Provide numbered steps restricted to the affected phase.
5. State what Builder will verify after the action.
