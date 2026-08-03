# Sprint 036C Blueprint

## Delivery sequence

1. Verify the permanent canonical directory and Git top-level, one registered worktree, exact closed 036B SHA, expected Pack/status handoff diff and direct remote authority.
2. Create only the scoped 036C branch, dry-run/apply the Pack and verify exactly four generated sprint files.
3. Read the generated files as execution authority and record the exact repository file plan, protected-preflight output contract, credential paths, pre-stage gates, five-alias transaction, human journey, rollback and permitted outcomes.
4. Implement the three new operations files only. Keep all existing application/runtime/package/helper files byte-identical.
5. Run deterministic provider-projection and wrapper tests with adversarial protected canaries. Prove exact output keys, sanitized errors, exact target/GET-only behavior, no user endpoint/list/enumeration path, protected environment cleanup and reuse of the unchanged exact-ID 035K verifier.
6. Run wrapper `SelfTest` and maintained focused/canonical validation. Prove no runtime module imports the new operations files and application bytes remain unchanged from accepted authorities.
7. In a non-transcribed private console, run `ProviderConfig` with an existing Management API bearer credential entered through the secure prompt. Retain only the allowlisted pass projection.
8. In a separate protected window, run `RetainedPilotVerify` with the service-role value and tester email entered privately. Retain only the five approved counts/classifications.
9. Reconcile current Vercel CLI/help and official docs, exact project, Ready rollback, project domains, five aliases and unaccepted old candidate. Build the five-row `baseline`; require five/five rollback.
10. Intentionally commit/push the scoped 036C planning/evidence/tooling checkpoint and prove exact local/direct-remote equality.
11. Deploy one fresh Production candidate from that exact SHA using `--prod --skip-domain`. Prove intended project, Production target, source metadata, immutable automatic URL and Ready state.
12. Build `post-stage`; require every alias still resolves independently to rollback.
13. Assign aliases in the fixed generated-first/apex-last order. After each assignment reread all five and require the exact completed-prefix/remaining-suffix state.
14. Build `candidate-live`; require five/five candidate, no third deployment and no unlisted alias movement.
15. Run cache-busted homepage, pricing, disclaimer/asset, disabled enquiry, health, truthful sign-in, anonymous portal/horse denial, unsafe-method and protected/API smoke.
16. Guide the first private Production trainer sign-in and complete the retained dashboard/workspace/action/denial/sign-out journey.
17. After cooldown, use a fresh browser/application session and complete the second fresh code sign-in to the same bounded assignment.
18. Rerun retained-pilot Verify, provider projection when safely available, five-alias `final-accepted` and final route safety.
19. On any material discrepancy, assign all five aliases to rollback in fixed order, rereading all five after every assignment; build `final-rollback` and repeat route safety.
20. Close with one exact permitted outcome and proportional durable records. Do not begin Sprint 029N.

## Protected preflight architecture

`Invoke-ProtectedProductionPreflight036C.ps1` is the only operator entrypoint.

| Operation | Protected input | Child | Remote action | Allowed result |
|---|---|---|---|---|
| `SelfTest` | none | new 036C core plus deterministic test | none | fixed self-test pass |
| `ProviderConfig` | existing Management API bearer credential | new 036C core | exact GET Auth config | allowlisted config booleans/counts |
| `RetainedPilotVerify` | service-role value, then hidden tester email | unchanged 035K core `--verify` | exact-ID/read-by-ID only | verified, 8/1/0/0 |

The wrapper is branch/root bound and protected operations refuse redirection, transcription and a pre-existing protected environment. The Management credential and service role are never active in the same child. The parent removes environment entries and zeroes/disposes protected memory after every child.

The provider core uses a fixed fetch adapter so deterministic tests inject synthetic responses without network access. Live mode accepts no arbitrary URL or method. It parses the complete response in memory and passes only a projection object to the reporter.

## Provider projection truth table

| Fact | Required value |
|---|---|
| Target | exact project `uvskssaecdhxcgytkasc` |
| HTTP | one GET, HTTPS, no redirect |
| Site URL | exact Production site |
| Callback set | exactly one Production callback |
| Wildcards | zero |
| SMTP | configured, Resend-classified |
| Sender | exact approved sender |
| Template token | exactly one `.Token` |
| Confirmation URL | zero |
| Links | zero |
| OTP length | 6 |
| OTP expiry | 3600 seconds |
| Minimum interval | 60 seconds |
| Auth users enumerated | false |
| Remote mutation | none |
| Protected output | none |

Any other state is `failed-sanitized`; no partial provider result passes.

## Pre-stage state machine

| State | Required evidence | Allowed next action |
|---|---|---|
| `tooling-proven` | deterministic tests, wrapper self-test, safety scans | protected provider readback |
| `provider-proven` | exact allowlisted config pass | retained-pilot Verify |
| `pilot-proven` | exact 8/1/0/0 pass | Vercel baseline |
| `release-baseline` | five/five Ready rollback and exact affected set | checkpoint commit/push |
| `remote-backed` | local/direct-remote equality | fresh candidate staging |
| any protected output/mismatch | sanitized stop | close without deployment |

Do not reorder these states or use historical provider/pilot evidence in place of fresh pre-stage proof.

## Routing ledger state machine

| Checkpoint | Candidate count | Rollback count | Allowed next action |
|---|---:|---:|---|
| `baseline` | 0 | 5 | Stage candidate |
| `post-stage` | 0 | 5 | Begin promotion |
| `promotion-step-1` | 1 | 4 | Alias 2 |
| `promotion-step-2` | 2 | 3 | Alias 3 |
| `promotion-step-3` | 3 | 2 | Alias 4 |
| `promotion-step-4` | 4 | 1 | Apex |
| `promotion-step-5` / `candidate-live` | 5 | 0 | Route smoke/human acceptance |
| `final-accepted` | 5 | 0 | Close accepted |
| any discrepancy | any other | any other | all-five rollback |
| `final-rollback` | 0 | 5 | Close truthful incomplete outcome |

No third deployment is permitted. A discrepancy exits promotion and enters all-five rollback; do not repair only one row and continue.

## Exact command shapes

Pack:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036C-protected-production-preflight-and-live-trainer-acceptance.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036C-protected-production-preflight-and-live-trainer-acceptance.md`

Deterministic proof:

`node scripts/test-protected-production-preflight-036C.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedProductionPreflight036C.ps1 -Operation SelfTest`

Protected private-console entry:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedProductionPreflight036C.ps1 -Operation ProviderConfig`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedProductionPreflight036C.ps1 -Operation RetainedPilotVerify`

Candidate staging:

`vercel.cmd deploy --prod --skip-domain --yes`

Promotion:

`vercel.cmd alias set <fresh-candidate-automatic-url> <exact-alias>`

Rollback:

`vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app <exact-alias>`

Add only current installed-help-required exact scope flags. Never place a provider credential or protected value in a command argument.

## Promotion and rollback order

Promotion:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

Rollback:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

## Failure and recovery

- Wrong canonical/remote baseline or unexpected handoff diff: no branch/external action until reconciled.
- Protected runner emits protected content: finalize it, do not repeat, close `production-protected-preflight-output-blocked-clean`.
- No existing protected Management credential path: close `production-protected-preflight-access-unavailable-clean`.
- Provider/pilot mismatch: no candidate; close `production-protected-preflight-mismatch-clean`.
- Fresh candidate not exact/Ready: no alias movement; close `production-candidate-staging-blocked-clean`.
- `post-stage` not five/five rollback: assign all five to rollback; close `production-candidate-staging-alias-drift-rollback-clean`.
- Promotion snapshot mismatch: all-five rollback; close `production-promotion-rolled-back-clean`.
- Route/human failure with no material change: one sanitized diagnosis and one non-blind cooldown-safe retry; otherwise all-five rollback.
- Source/provider/schema/permission/identity/fixture/data change required: all-five rollback; close `production-access-source-or-contract-change-required-rollback-clean`.
- Final rollback cannot be proven: stop `production-promotion-partial-mutation-blocked` with exact manual intervention.

## Closeout minimum

Record starting/final SHA and branch; exact three-file tooling diff; deterministic test count; protected wrapper results; provider projection; pilot Verify; Vercel CLI/project/rollback/fresh candidate; every five-row snapshot; route smoke; human journey booleans; final provider/pilot evidence; exact mutation list; rollback disposition; full validation; protected-output boundary; worktree and direct-remote equality. Retain no protected value or raw provider payload.
