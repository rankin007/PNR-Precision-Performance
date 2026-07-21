# Sprint 020F - Builder Handoff Prompt

You are Builder for Sprint 020F under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, all Sprint 020C/020D/020E artifacts, `docs/DATABASE_AUDIT_REVIEW_020C.md`, `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`, `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md`, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, all Supabase migrations/bootstrap/configuration, database/auth/storage/domain docs and consumers, risks, questions, and Architect briefing before acting.

The current repository is the application/schema source of truth. Your task is not to clean out or rebuild Supabase. First remove only the stranded role `pp_audit_020e_20260720` through an exact, validated, automatic-membership-aware cleanup. Then inventory repository truth and remote production metadata, compare them, and produce the preserve/remove/recreate/unknown map required before a later destructive Sprint 020G.

Use the pinned operational CLI through `npx --no-install supabase` and reconfirm exact linked production project `tagnbgkroihagjmvehlx` before every remote phase. Never inspect, copy, print, or persist credentials, connection URLs, user-level CLI state, environment values, or link files wholesale. Keep debug/trace disabled.

For cleanup, accept only the exact documented role attributes, automatic creator membership direction/flags/grantor, zero ownership, zero sessions, and known public schema usage dependency. Revoke only that schema grant and drop only the fixed role. Current PostgreSQL behavior may remove the known membership during `DROP ROLE`; if it does not, stop. Do not use `supabase_admin`, `REASSIGN OWNED`, `DROP OWNED`, wildcards, broad ACL changes, or broad termination without a later instruction.

Do not create another audit role. Run only statically validated, read-only, catalog-allowlisted inventory SQL through the linked CLI. Do not query or retain application, Auth, Storage, Vault, customer, horse, trainer, upload, identity, session, token, or secret row payloads. Fingerprint potentially sensitive expressions. Run the Supabase security advisor separately and do not apply fixes.

Build a repository manifest and remote inventory, then classify every relevant surface as `preserve-managed`, `preserve-data`, `replace-from-repository`, `remove-legacy`, `recreate-manually`, `migration-history-only`, or `unknown-stop`. No object is implicitly disposable. Identify the two ambient privilege sources and the missing `0001`-`0009` remote history without remediation.

Produce the complete 020F audit, object-classification map, preservation-decision register, recovery/rehearsal requirements, and exact 020G entry criteria. Close 020C/020E only after temporary-role cleanup is proven. Do not create 020G, delete/reset/rebuild Supabase, apply/replay/repair migrations, export sensitive rows, change schema/data/auth/storage/settings, commit, push, create a PR, deploy, change Stripe/DNS, or reopen public surfaces.
