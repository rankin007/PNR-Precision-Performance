# Sprint 036D Blueprint

## Delivery sequence

1. Prove canonical root, one worktree, exact 036C SHA, clean Architect handoff and direct remote authority.
2. Dry-run/apply the Pack and prove exactly four generated 036D files.
3. Create only the scoped 036D branch.
4. Hash-bind inherited 036C/035K tooling and run inherited deterministic proof.
5. Implement the three new non-runtime lifecycle files; run at least 60 new assertions plus wrapper self-test.
6. Reconcile current official Supabase token and Auth-config endpoint semantics without opening an Authentication users surface.
7. Authorized human privately creates exactly one named 036D token and enters it only into the hidden wrapper.
8. Run one exact provider-config GET; require the full 036C allowlisted pass.
9. Human privately revokes the exact token and confirms only that its row is absent.
10. Reuse the same in-memory token for the fixed invalidation GET; require `401` or `403`; clear all protected state.
11. Run retained-pilot exact-ID Verify through a separate service-role child.
12. Prove application/source bytes unchanged and complete maintained validation.
13. Reconcile current Vercel CLI/mechanisms, exact project, rollback, five-alias set and `baseline`.
14. Commit/push scoped 036D planning/tooling/evidence and prove exact direct-remote equality.
15. Stage one fresh `--prod --skip-domain` candidate; require exact/Ready and `post-stage` five/five rollback.
16. Assign the five aliases one at a time in fixed order, rereading all five after each.
17. Require `candidate-live` five/five candidate and pass cache-busted route safety.
18. Complete first private Production sign-in, governed journey, denial and sign-out.
19. After cooldown, complete a second fresh-session/fresh-code Production sign-in.
20. Rerun retained-pilot Verify, prove `final-accepted`, reconcile zero provider/Product mutation, update proportional records, commit/push scoped closeout and stop.

At any release discrepancy, execute the all-five rollback before unrelated diagnosis or human authentication.

## Credential lifecycle state machine

States are exact and monotonic:

`not-created -> created-private -> provider-pass -> revoked-private -> invalidation-proven -> cleared`

Allowed clean exits before creation:

- `management-access-creation-unavailable-clean`
- `management-access-type-refused-clean`

Allowed clean exits after creation require `revoked-private -> invalidation-proven -> cleared` first:

- `management-access-preflight-failed-revoked-clean`
- `protected-preflight-output-blocked-revoked-clean`
- `protected-preflight-mismatch-revoked-clean`

If the token may remain active, the only state is `management-access-revocation-blocked`; nothing downstream may begin.

The first GET may return only the exact 036C provider projection. The invalidation GET may return only `revocationVerified=true`, fixed response class `unauthorized-or-forbidden`, request count and protected/mutation booleans. Never emit a token fragment, token ID, response body or provider error.

## Token type decision

1. Reconcile the current official account-token controls privately.
2. If a fine-grained token can be restricted to `auth_config_read`, use it and refuse all write permissions.
3. If only a classic PAT is supported, the provider operator privately acknowledges full account privilege and the harness/immediate-revocation compensating controls.
4. If neither allowed path can be established without exposing account/token data, create nothing and close cleanly.
5. Never create an OAuth app, CLI profile, service account or database credential.

## Protected lifecycle architecture

`protected-management-lifecycle-036D-core.mjs`:

- imports the exact 036C provider evaluator for first-pass truth;
- hard-codes the exact approved endpoint and GET;
- exposes provider-pass and invalidation-check modes only;
- rejects redirects and arbitrary targets/methods;
- never reads the invalidation response body;
- returns fixed allowlisted JSON and fixed failure codes only; and
- enforces a total request ceiling of two, or three only for one justified invalidation retry.

`Invoke-ProtectedManagementLifecycle036D.ps1`:

- binds exact root and branch;
- verifies inherited hashes/contracts;
- requires private interactive ConsoleHost and refuses transcription/redirection;
- acquires protected values with `Read-Host -AsSecureString`;
- keeps Management and service-role values separate;
- orchestrates provider pass, private revoke pause and invalidation proof;
- clears clipboard without reading it when paste was used;
- removes process environments and zeroes/disposes protected memory in `finally`; and
- emits fixed sanitized states only.

`test-protected-management-lifecycle-036D.mjs`:

- injects fake transports and lifecycle events;
- proves ordering, request ceiling, exact statuses and body non-read;
- statically proves branch/root, hidden-input, cleanup and no-enumeration contracts; and
- fails on any protected canary escape.

## Pre-stage state machine

`token-not-created`

-> `provider-config-pass`

-> `token-revoked-and-invalid`

-> `retained-pilot-pass`

-> `unchanged-application-validation-pass`

-> `vercel-baseline-five-rollback`

-> `release-eligible`

Any missing predecessor means `not-release-eligible`. No historical evidence may skip a state.

## Routing ledger state machine

`baseline`: rollback `5`, candidate `0`

`post-stage`: rollback `5`, candidate `0`

`promotion-step-1`: rollback `4`, candidate `1`

`promotion-step-2`: rollback `3`, candidate `2`

`promotion-step-3`: rollback `2`, candidate `3`

`promotion-step-4`: rollback `1`, candidate `4`

`promotion-step-5` / `candidate-live`: rollback `0`, candidate `5`

Any third deployment, unexpected alias, non-Ready target, absent row or count mismatch enters rollback.

Rollback snapshots move candidate `4 -> 3 -> 2 -> 1 -> 0`; `final-rollback` is rollback `5`, candidate `0`, unexpected `0`.

## Command shapes

Run from the canonical root. Reconcile current help before external mutation.

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036D-single-use-management-access-and-live-trainer-acceptance.md`

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

Protected private ConsoleHost only:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation ManagementLifecycle`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation RetainedPilotVerify`

Candidate staging shape after every pre-stage gate:

`vercel.cmd deploy --prod --skip-domain --yes`

Use current help-required scope/source metadata. Do not place protected values in commands.

Promotion shape:

`vercel.cmd alias set <fresh-candidate-automatic-url> <exact-alias>`

Rollback shape:

`vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app <exact-alias>`

## Promotion and rollback order

Promotion:

1. legacy team-qualified alias
2. team project alias
3. project alias
4. `www`
5. apex

Rollback:

1. apex
2. `www`
3. project alias
4. team project alias
5. legacy team-qualified alias

After every command, reread all five aliases independently. Deployment-level alias inventory is never sole routing authority.

## Failure and recovery

- Wrong canonical/remote baseline or unexpected handoff diff: no branch/external action until reconciled.
- Token type/account access unavailable before creation: create nothing; close the exact clean outcome.
- Token created but provider projection fails: revoke exact token, prove invalid, clear state; close cleanly before pilot/Vercel.
- Protected output occurs: finalize surface, revoke exact token privately, prove invalid, clear state; no repeat of the unsafe surface.
- Token revocation/invalidation unproven: stop blocked; no pilot/Vercel/release action.
- Retained-pilot mismatch: no repair; close cleanly before Vercel.
- Fresh candidate not exact/Ready: no alias movement; close staging blocked clean.
- `post-stage` not five/five rollback: assign all five to rollback; close staging-drift rollback clean.
- Promotion snapshot mismatch: immediate all-five rollback.
- Route/human failure with no material change: one sanitized diagnosis and one non-blind cooldown-safe retry; otherwise all-five rollback.
- Source/provider/schema/permission/identity/fixture/data change required: all-five rollback; close source-or-contract-change-required.
- Final rollback cannot be proven: stop blocked with exact manual intervention.

## Closeout minimum

Record starting/final SHA and branch; exact three-file diff; inherited/new test arithmetic; wrapper self-test; sanitized token class/create/pass/revoke/absence/invalidation/request-count record; provider projection; pilot Verify; Vercel CLI/project/rollback/fresh candidate; every five-row snapshot; route smoke; human-journey booleans; final pilot evidence; exact mutation list; rollback disposition; full validation; protected-output boundary; worktree/direct-remote equality. Retain no credential, token fragment, raw response, account data or protected value.
