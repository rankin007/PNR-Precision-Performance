# Sprint 020 - Builder Handoff Prompt

You are Builder for Sprint 020 under the strict workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, all files in this sprint folder, the Sprint 013/014/018 biochemistry docs, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, migration 0009, relevant Supabase patterns, risks, questions, and the Architect briefing before acting.

Work in two gates:

1. Complete local and read-only remote readiness evidence.
2. Stop before any remote mutation because remote execution is outside this readiness sprint.

Do not print or persist secrets. Do not guess the Supabase project, bypass unavailable access, use real customer data as fixtures, broaden RLS roles, redesign schema, or change application behavior. If migration 0009 appears defective or the remote state is partial/divergent, stop and propose a bounded recovery or correction; do not edit the reviewed migration silently.

If manual intervention is required, record the blocker, evidence checked, exact numbered user/operator steps, and what you will verify afterward. Keep the public gate intact and preserve unrelated dirty-worktree changes.

At close, report whether the outcome is readiness-only or remotely migrated and verified. Refresh all durable planning records and record the sprint outcome accurately. Do not commit, push, create a PR, deploy, or perform production mutations because remote mutation is outside this readiness sprint.
