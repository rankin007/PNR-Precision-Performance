# Sprint 020G - Builder Handoff Prompt

You are Builder for Sprint 020G under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, all completed Sprint 020D/020F artifacts, the 020F audit/classification/decision files, all migrations/bootstrap/configuration, Auth/RLS/Storage/deployment docs, application Supabase consumers, risks, questions, and Architect briefing before acting.

The user accepted a clean replacement: create a separate new Supabase project from the repository source of truth; migrate no old public rows, Auth users/identities/sessions/MFA, Storage buckets/objects, or seven legacy surfaces; recreate only current required hosted configuration/secrets; establish genuine migration history; validate; cut over with rollback; retain the old project unchanged.

Before project creation, stop for operator confirmation of organization, project name, region, plan/cost, administrator, and rollback owner. Do not guess billing or expose credentials. Create exactly one candidate project. Protect old project `tagnbgkroihagjmvehlx` from every mutation.

Review migrations on an empty-project basis. Add only the smallest post-0009 corrective migration required for secure clean reproducibility, including minimum justified helper execution grants and safe security-definer configuration. Do not recreate legacy surfaces, import old data, invent the Sprint 021 role matrix, or add product scope.

Apply migrations once through the supported workflow so the new remote ledger truthfully records them. Never repair, mark applied, double-apply bootstrap, or redirect a failed command to the old project. Stop on migration failure.

Recreate current hosted configuration and secrets only through protected operator paths. Keep leaked-password protection disabled under the jointly owned Free-plan/passwordless exception; do not upgrade or incur a charge. The exception applies only while the application remains passwordless, and any future password-authentication feature must reopen and resolve the control before implementation. Run structural verification and security advisors; no unresolved advisor error may reach cutover. Use synthetic-only Auth/application fixtures, verify current permitted/denied RLS behavior and biochemistry workflows, then clean fixtures.

Cut over only after the candidate, maintenance window, environment scopes, deployment/restart path, smoke checklist, rollback triggers, and rollback owner are proven. Change only approved Supabase environment targets/secrets, keep the public under-construction gate active, and retain the old project unchanged after acceptance. Roll back by restoring old environment references—not by mutating databases.

Never expose secrets, row payloads, credential state, or link files. Preserve unrelated dirty-worktree changes. Do not delete/pause/reset/repair the old project, import legacy data, reopen public surfaces, change Stripe/DNS/product features, commit, push, or create a PR. Close with one exact evidence-backed outcome: cutover-complete, candidate-ready, rolled-back, or blocked.
