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
