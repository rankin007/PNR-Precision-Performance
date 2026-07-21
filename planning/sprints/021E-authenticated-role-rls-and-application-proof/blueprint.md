# Sprint 021E - Authenticated Role, RLS, And Application Proof Blueprint

## Phase 1: Immutable Source And Safety Inventory

1. Read all required authority and applied Sprint 021/021B-021D artifacts.
2. Inventory the dirty worktree and hash the exact source, migrations, authorization modules, routes/actions, structural verification, and harness inputs under test.
3. Confirm no implementation change is allowed and establish the three permitted outcome classes.
4. Create the 021E manifest with exact actor aliases, topology, row-by-table ceilings, run-ID format, assertion list, cleanup graph, sanitized evidence schema, and stop conditions.
5. Select one new run ID only after proving zero matching anchors and record it without protected identity data.

## Phase 2: Build And Validate Proof Harness Locally

1. Create a new 021E harness; do not silently repurpose the limited two-actor 020G harness.
2. Separate modes for safe preflight, identity/bootstrap verification, fixture creation, authenticated matrix, route corroboration, revocation, aggregate verification, cleanup-plan preview, cleanup, and final verification.
3. Default mode is non-mutating preflight. Every mutating mode requires exact run ID, exact candidate equality, explicit mode-specific confirmation, and in-memory ownership ledger.
4. Implement allowlisted sanitized output only.
5. Implement hard ceilings, old/unexpected target refusal, partial-creation compensation, first-assertion stop, dependency-safe cleanup, Auth-last deletion, and final zero checks.
6. Self-test every refusal and recovery branch before protected values or remote calls.

## Phase 3: Credential-Free And Candidate Preflight

1. Run existing repository validation and record exact hashes/status.
2. Confirm candidate and protected old project identity/health through sanitized metadata; never select old project for data access or mutation.
3. Confirm candidate ledger exactly 0001-0012, structural/advisor baseline, production-only callback, Auth/Storage baselines, and zero selected-run anchors.
4. Confirm exact ten-actor manifest and row ceilings.
5. Stop clean if any identity, ledger, callback, baseline, health, structure, advisor, anchor, or source-hash precondition is wrong.

## Phase 4: Temporary Callback And Protected Runtime

1. Issue separate operator instructions to add only the localhost callback to the candidate.
2. Verify sanitized callback list has exactly production plus localhost and Site URL is unchanged.
3. Issue separate protected-process instructions for hidden candidate values and non-personal inbox handling.
4. Start local runtime against exact candidate with debug/body/network logging disabled.
5. Prove candidate hostname and required-value presence without outputting values.
6. Prove one real passwordless callback and isolate all actor sessions.

## Phase 5: Identity And Fixture Setup

1. Create or bootstrap exactly ten run-owned synthetic identities using protected aliases.
2. Verify exact Auth-to-application mapping in memory without retaining identifiers.
3. Preview the exact row-by-table creation plan and refuse any ceiling or ownership mismatch.
4. Create fixtures in dependency order while appending each mutation to the in-memory ledger.
5. On partial failure, compensate in reverse order, restore callbacks/credentials, record blocked-clean only if zero owned state remains, and stop.
6. Verify aggregate fixture counts and topology before assertions.

## Phase 6: Authenticated RLS And Application Matrix

1. Execute anonymous and each actor's direct RLS cases with actor sessions.
2. Exercise representative local application routes/actions for every role class.
3. Record only actor alias, fixture alias, operation class, expected result, RLS result, application result, and pass/fail.
4. Complete role-management, cross-user, wrong-horse, same-stable-unassigned, cross-stable, suspended, Owner-read-only, comment, and input-boundary denials.
5. Execute permitted comment author operations and Administrator removal.
6. Execute one bounded assignment revocation and prove immediate denial on a fresh request while authorship remains.
7. Stop on first assertion failure and proceed directly to cleanup/restoration.

## Phase 7: Mandatory Cleanup And Restoration

1. Produce an exact bounded cleanup preview from run anchors and in-memory ledger.
2. Refuse ambiguous, broad, missing-anchor, unexpected, or over-ceiling cleanup.
3. Delete run-owned application fixtures in dependency-safe reverse order.
4. Restore any prior bootstrap-created values.
5. Delete exactly the ten run-owned Auth identities last.
6. Clear isolated sessions and protected process values; stop runtime and close protected terminal.
7. Issue separate operator instructions to remove only localhost callback.
8. Verify production-only callback, initial Auth/Storage baselines, zero run anchors, unchanged ledger/structure/advisors, both-project health, and old-project integrity.
9. Treat any residual owned state or callback mismatch as an active cleanup incident, not a completed sprint.

## Phase 8: Classify Outcome And Close

1. Classify exactly one permitted outcome based on assertion completeness and cleanup proof.
2. Write sanitized manifest/results records with no protected values or raw payloads.
3. Reconcile status, state, schedule, progress, briefing, decisions, risks, and questions.
4. Recheck source hashes and approved-file diff; no implementation drift is allowed.
5. Complete and evidence-map every 021E acceptance item. Require zero unchecked items for passed-clean. For failed-clean or blocked-clean, preserve failed/not-run checkboxes as unchecked but annotate every one with its result, evidence/reason, and cleanup disposition.
6. Do not stage, commit, deploy, cut over, or begin a fix.
