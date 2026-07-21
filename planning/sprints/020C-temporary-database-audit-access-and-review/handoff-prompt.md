# Sprint 020C - Builder Handoff Prompt

You are Builder for Sprint 020C under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, `planning/sprints/020B-remote-biochemistry-verification/VERIFICATION.md`, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, migration 0009, relevant Supabase access patterns, risks, questions, and the Architect briefing before acting.

Use the accepted temporary least-privilege database audit login. The operator must create and transmit its password only through an approved out-of-band secret channel. Never ask for or accept the password in this conversation, and never print, persist, screenshot, stage, or commit it or any connection string/token fragment.

Work metadata-first. Do not broaden access merely to make a check convenient. The only production changes in scope are creating the exact audit login, granting its narrowly reviewed access, revoking those grants, terminating only that login's sessions if needed, and removing that exact login after the review is delivered. Do not alter schema, rows, policies, functions, ownership, application roles, Supabase settings, auth users, storage, or customer data.

Produce and deliver `docs/DATABASE_AUDIT_REVIEW_020C.md` before revocation. Rank findings, sanitize evidence, and state limitations honestly. This audit does not replace Sprint 021 authenticated application/JWT and cross-role RLS proof.

After delivery, revoke access and remove the audit login. Prove exact-target cleanup and absence without using broad `REASSIGN OWNED`, `DROP OWNED`, wildcards, or destructive database cleanup. If the account owns objects, has unexpected privileges, exposes row data, cannot be removed safely, or any secret is exposed, stop and follow the manual-intervention rule.

Preserve unrelated dirty-worktree changes. Do not commit, push, create a PR, deploy, reopen public surfaces, apply migrations, remediate findings, or perform any production mutation outside the exact temporary-account lifecycle defined here. Close with sanitized audit evidence, revocation proof, and accurate durable planning records.
