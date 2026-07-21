# Sprint 021 - Definitive Role Matrix And Authenticated RLS Proof Blueprint

## Phase 1: Source And Policy Inventory

1. Reconfirm Sprint 020G candidate-ready closeout, candidate/old references, dirty-worktree boundaries, and production-cutover prohibition.
2. Inventory membership levels, permissions, user/profile state, Trainers, Owners, stables, horses, assignments, biochemistry access, notes, helper functions, policies, server actions, routes, and existing 020G harness behavior.
3. Produce a current-versus-definitive matrix. Identify every schema, policy, grant, helper, route, UI, and test delta without changing files first.
4. Confirm the next migration number after `0010` and ensure historical migrations remain unchanged.

## Phase 2: Definitive Data And Authorization Design

1. Encode one primary operational role plus independent ownership relationships.
2. Encode active/suspended denial, multi-stable Trainer scope, single-stable Manager/Hand scope, and explicit cross-stable professional horse assignments.
3. Implement the hierarchy and management boundaries without permitting self-assignment, peer-Trainer administration, cross-stable escalation, or role promotion to Trainer/Administrator by a Trainer.
4. Reconcile horse creation/profile editing, ownership assignment, assignment/revocation, soft-delete/restore, and stable-lifecycle rules.
5. Extend `biochemistry_test_notes` with author, created/updated/deleted audit data and a 2,000-character plain-text constraint where not already present.
6. Design helper functions with safe fixed search paths and exact execution grants; prefer auditable helpers used consistently across policies.

## Phase 3: Migration And Local Verification

1. Create one new forward-only migration after `0010`.
2. Add/alter the minimum schema, constraints, indexes, seeded role/permission mappings, helpers, grants, and RLS policies required.
3. Do not silently broaden existing operational-table writes beyond the definitive matrix.
4. Regenerate bootstrap using the repository command and prove migration/bootstrap agreement.
5. Add structural, permission-matrix, policy, helper-grant, seed, and regression validators.
6. Validate a clean local migration path where supported before any candidate apply.

## Phase 4: Application Integration

1. Centralize role/scope decisions in shared server-side authorization/domain code rather than scattered string comparisons.
2. Align route loaders/actions with RLS and deny without resource-existence disclosure.
3. Add the biochemistry comments section after the entry/result content.
4. Implement plain-text creation, own-comment edit/delete, and Administrator delete behavior with length validation and safe output rendering.
5. Hide edit/delete controls from roles that cannot use them, while retaining RLS as the enforcement authority.
6. Preserve existing capture, scoring, blocked-state, design, responsive, and accessibility behavior.
7. Add focused unit/integration tests for matrix evaluation, comment validation, action authorization, and denial messaging.

## Phase 5: Candidate Apply Preflight

1. Reconfirm exact candidate `uvskssaecdhxcgytkasc` and refuse old `tagnbgkroihagjmvehlx` plus every unexpected target.
2. Reconfirm both projects healthy through approved read-only metadata without selecting the old project for mutation.
3. Verify candidate ledger is exactly `0001`-`0010`, no synthetic run anchors exist, Auth baseline is zero, Storage baseline is zero/zero, and the callback list is production-only.
4. Record migration dry-run/status and exact expected structural delta.
5. Run local syntax, lint, TypeScript, build, domain fixtures, secret scan, and `git diff --check` before remote migration.
6. Stop on target ambiguity, unexpected data, credential exposure, billing, schema drift, or validation failure.

## Phase 6: Apply And Structural Proof

1. Apply the new migration once to the exact candidate using the supported migration path.
2. Do not repair, mark applied, replay bootstrap, or redirect a failed apply.
3. Verify the genuine ledger, all expected objects/policies/grants/helpers/constraints/indexes/seeds, existing lookup totals, retired-surface absence, RLS enablement, and advisor disposition.
4. Confirm old project remains healthy and unchanged using read-only identity/status evidence only.

## Phase 7: Protected Local Runtime Preparation

1. Fully validate non-secret harness/runtime behavior and output sanitization before requesting credentials.
2. Provide separate `Manual process — operator` instructions for temporary localhost callback addition; stop for the sanitized callback list.
3. Provide separate `Manual process — operator` instructions for protected PowerShell hidden entry of candidate URL, publishable key, secret key, and the non-personal inbox; do not request or retain values.
4. From the same protected process, verify only candidate equality and variable presence, then start the candidate-connected localhost runtime.
5. Never use browser inspection on the API-key page and never print process environment.

## Phase 8: Controlled Synthetic Creation

1. Use a new run ID; do not reuse reserved 020G run ID `020G-RLS-20260720-01`.
2. Prove zero run anchors and declared bounded maximums.
3. Create distinct plus-address Auth identities and exact two-stable application fixtures through supported protected paths.
4. Maintain an in-memory ledger and reverse compensate on partial failure.
5. Stop before RLS testing unless identity/application mappings and ownership anchors are exact.

## Phase 9: Authenticated Matrix And Application Proof

Test through distinct real user sessions, not a service key masquerading as a user.

At minimum prove:

- Administrator global permitted operations.
- Trainer assigned-horse/stable operations and denials for unassigned same-stable horse, peer-Trainer administration, self-expansion, and cross-stable access.
- Stable Manager Trainer-level horse/record behavior across own stable and denial across another stable.
- Veterinarian and Consultant assigned-horse read/comment plus unassigned and underlying-record-write denial.
- Stable Hand assigned-horse read/comment plus same-stable-unassigned, record-write, and cross-stable denial.
- Owner own-horse read plus other-owner, comment, and record-write denial.
- inactive/suspended authenticated denial and anonymous denial.
- allowed and prohibited user lifecycle, role-change, assignment, revocation, ownership, horse, and stable lifecycle actions.
- comment create/read, 2,000-character boundary, over-limit rejection, author edit/delete, other-author denial, Administrator deletion, revoked-author access denial, and retained attribution.
- application passwordless callback, protected redirects, accessible routes, inaccessible route behavior, and biochemistry capture/result/comment workflow.
- scoring/lookup snapshot behavior remains unchanged.

Record sanitized case identifiers and result classes only; retain no email address, token, link, credential, user payload, horse payload, or comment text.

## Phase 10: Mandatory Cleanup And Restoration

1. Stop runtime interactions and delete exact run-tagged application fixtures in dependency-safe reverse order.
2. Prove application cleanup zero before deleting Auth identities.
3. Delete every synthetic Auth identity and prove baseline zero.
4. Provide separate manual instructions to remove only the localhost callback; verify the production-only callback list and unchanged Site URL.
5. Clear protected variables, stop localhost runtime, and close the terminal.
6. Verify zero run anchors, Auth baseline, Storage baseline, migration/structure, advisor result, both-project health, and old-project integrity.
7. Incomplete cleanup is a sprint failure and remains an active incident until resolved.

## Phase 11: Closeout

1. Run all repository and Sprint 021 validators, lint, TypeScript, production build, domain fixtures, secret/credential scans, JSON validation, and `git diff --check`.
2. Record exact migration and sanitized permission/test/cleanup evidence.
3. Update planning state, status, schedule, decisions, risks, questions, and Architect briefing.
4. Do not cut over production, change Vercel, reopen public access, commit, push, or create a PR.
