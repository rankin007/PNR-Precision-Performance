# Sprint 026 — Uploads And Evidence Management Blueprint

## Phase 1 — Isolate and reconcile

1. Verify exact clean baseline `6f8543020e126a4620f09be017744dcc75061e6e`, expected ancestry, ledger `0001`–`0021`, closed 023L outcome and original-worktree non-mutation.
2. Create isolated branch/worktree `codex/026-uploads-and-evidence-management`.
3. Apply this Pack there, verify the four generated files, and execute the complete sprint from them.
4. Map current evidence states, actions, server projections, capabilities and role boundaries.
5. Record the approved-path manifest before source edits.

Stop `evidence-management-baseline-blocked-clean` if the exact baseline, isolation, ledger, source contracts or closed 023L state cannot be established safely.

## Phase 2 — Define the presentation contract

1. Define an exhaustive safe evidence item view model derived on the server.
2. Include only authorised display metadata, lifecycle label/context, lineage status and server-authoritative capability flags.
3. Ensure unknown states fail closed and expose no action.
4. Map safe operation results to non-enumerating user messages.
5. Keep object keys, signed values, hashes, internal errors and hidden-record existence outside client props and logs.

Prefer existing domain contracts. Extend them only where the management UI cannot be safe or exhaustive without a narrow projection change.

## Phase 3 — Build the evidence manager

1. Load evidence through the existing authenticated server path on the biochemistry result route.
2. Add one cohesive manager containing the supported upload flow and visible evidence list.
3. Present empty, pending, blocked, deleted/restorable, held, purge-pending, superseded, retryable-error and unexpected-error states accurately.
4. Render only server-permitted controls.
5. Implement confirmation, pending locks, safe result messaging, focus recovery and refreshed state after mutation.
6. Preserve the active predecessor unless replacement cutover is authoritative.
7. Keep blocked/unavailable evidence without preview/download UI.

## Phase 4 — Complete upload and lifecycle interactions

1. Preserve exact unchecked acknowledgement, JPEG/PNG/PDF allowlist, 5 MiB item limit, 10-file and 30-MiB test limits, and CSV denial.
2. Keep initiation, direct signed no-overwrite transfer, cancellation and finalisation sequencing intact.
3. Add retry without replay ambiguity and replacement through the exact predecessor contract.
4. Wire soft delete, restore request/execution, hold/release and governed purge only where server capabilities allow.
5. Treat stale or denied responses as fail-closed state changes; never optimistically grant authority.
6. Do not add download handling while runtime evidence remains blocked.

## Phase 5 — Accessibility, privacy and responsive review

1. Verify logical headings, field labels, error associations, live-region messages and focus destinations.
2. Verify all controls by keyboard and that consequential confirmation is understandable.
3. Verify non-colour status meaning, visible focus, reduced motion, touch targets and 200% reflow.
4. Verify narrow mobile layouts do not hide status, consequence or controls.
5. Verify wording accurately communicates private purpose, Singapore processing, retention/removal authority and unavailable safety status without unsupported claims.

## Phase 6 — Deterministic validation

1. Add synthetic Sprint 026 fixtures and a maintained executable test.
2. Prove exhaustive state/view-model mapping, redaction, capability gating and safe messages.
3. Prove upload, retry/cancel, replacement, delete/restore/hold/purge, replay/concurrency and denial contracts.
4. Prove unavailable evidence cannot produce preview/download UI or calls.
5. Run maintained Sprint 022 and 023 evidence suites.
6. Run JSON, domain, role, Supabase self-test, static, TypeScript, ESLint, production build and `git diff --check`.
7. Scan the diff and generated evidence for secrets, keys, signed URLs, hashes, private filenames, personal information, unsupported claims, dependencies and out-of-scope paths.

## Phase 7 — Closeout

1. Complete the implementation document, closeout, acceptance traceability and changed-file manifest.
2. Refresh state, status, decisions, risks/questions where material, evidence index, schedule, sprint list and Architect briefing.
3. Confirm migrations `0018`–`0021` are unchanged and no external or production mutation occurred.
4. Confirm the original and Sprint 025 worktrees were not modified.
5. Leave all work unstaged and uncommitted unless separately instructed.

Successful outcome: `uploads-and-evidence-management-complete-fail-closed-clean`.

A qualified blocked outcome must identify the exact material boundary without overstating product or Production readiness.
