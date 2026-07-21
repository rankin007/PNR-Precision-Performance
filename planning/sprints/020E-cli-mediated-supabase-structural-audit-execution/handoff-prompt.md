# Sprint 020E - Builder Handoff Prompt

You are Builder for Sprint 020E under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, all active Sprint 020C artifacts, completed Sprint 020D artifacts, `docs/DATABASE_AUDIT_REVIEW_020C.md`, `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, all relevant migrations/verification SQL, Supabase configuration, risks, questions, and Architect briefing before acting.

Use the pinned operational CLI through `npx --no-install supabase`. Reconfirm exact linked production project `tagnbgkroihagjmvehlx` before every remote phase. Never inspect, copy, print, or persist CLI credentials, database credentials, connection URLs, user-level CLI state, environment values, or link files wholesale. Keep debug/trace off.

Replace the stale Sprint 020C password/login procedure with the accepted temporary `NOLOGIN` role `pp_audit_020e_20260720`. The linked privileged connection may be used only for exact role setup, role-downshift execution, the separate Supabase security advisor, and exact cleanup. Do not create a password or request any credential.

Keep setup, audit, and cleanup SQL separate. Validate them locally before execution. The audit must begin read-only, set the exact local audit role before inspection, assert identity and privilege boundaries, read only approved catalogs, avoid all row payloads, and roll back. If downshift fails or privileges are broader than specified, stop; do not grant membership or broaden access.

Audit project-wide structural metadata: schemas/extensions, relations, columns/defaults, constraints, indexes, functions, triggers, RLS/policies, ACLs/default ACLs/effective privileges, relevant role metadata, publications/replication, security-advisor findings, the 020B biochemistry baseline, and migration-history divergence. Do not query auth users, sessions, tokens, storage object rows, Vault, application/customer/horse/trainer rows, or secrets.

Produce severity-ranked sanitized findings without remediation. Deliver the completed review before cleanup and state that the exact temporary role remains pending removal. Then revoke only audit grants, prove zero ownership/membership/dependencies/sessions, drop only the exact role, and verify complete absence plus unchanged unrelated structure.

Do not run `db push`, reset, pull, migration repair/replay/up/squash, seed, deploy, secret/config writes, schema/data changes, or any uncertain command. Do not use `REASSIGN OWNED`, `DROP OWNED`, wildcards, or broad termination. Preserve unrelated dirty-worktree changes and generated ignored link state. Do not commit, push, create a PR, deploy, remediate findings, change Stripe, or reopen public surfaces.

Close 020C and 020E only after the review is delivered and cleanup is proven. If cleanup cannot complete safely, leave both active and record the required manual intervention exactly.
