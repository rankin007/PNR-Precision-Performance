# Sprint 036B Blueprint

## Delivery sequence

1. Verify the permanent canonical directory and Git top-level, one registered worktree, exact closed Sprint 036 SHA, expected Architect handoff diff and direct remote authority.
2. Create the scoped 036B branch in canonical, dry-run and apply the Pack, and verify exactly four generated files under the 036B sprint folder.
3. Read the generated sprint files as execution authority. Present the exact file plan, five-alias mutation plan, fresh candidate, rollback target, provider/pilot boundary, public/human acceptance and recovery transaction before external mutation.
4. Reconcile current application bytes with accepted Sprint 035K and validated Sprint 036 behavior. Prove zero unexplained product difference and keep the repository write set planning/operations-only.
5. Run focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests, canonical validation, TypeScript, zero-warning lint, Production build and exact safety scans on the unchanged application tree.
6. Reconcile installed Vercel CLI version/help with current official deploy/alias/promote/rollback documentation. Treat CLI cache/update-check failure as a supporting limitation when local version/help and the authenticated mechanism remain usable.
7. Read the exact Vercel project, project domains/aliases, Production status, rollback and unaccepted 036 candidate. Prove the planned mutation set contains exactly the five accepted aliases and no other Production alias.
8. Build the `baseline` ledger snapshot by independently inspecting all five aliases. All must resolve to Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`.
9. Reconcile approved Supabase project, Production Site URL/callback, no wildcard, SMTP/template/OTP compatibility and retained Sprint 035K pilot ownership using sanitized read-only evidence.
10. Intentionally commit/push only the scoped planning/evidence candidate and prove exact local/direct-remote/live equality.
11. Deploy one fresh candidate from that exact SHA using `--prod --skip-domain`. Prove exact project, Production target, source metadata, immutable automatic URL and Ready state. Do not reuse the Sprint 036 candidate.
12. Immediately build the `post-stage` five-row snapshot. Every alias must still resolve to rollback. A deployment-level alias list may be recorded as contradictory/stale corroboration but cannot fail this gate when all per-alias routing is exact.
13. Assign the five aliases to the fresh candidate in the fixed promotion order. After every assignment, reread all five and prove the completed prefix is on candidate and remaining suffix is on rollback.
14. Build the `candidate-live` snapshot. Require five/five aliases on the Ready candidate, unchanged DNS and no unlisted alias movement.
15. Run cache-busted canonical homepage, pricing, disclaimer/asset, visibly disabled enquiry, health, truthful sign-in, anonymous portal/horse denial, unsafe-method and protected/API safety smoke before human authentication.
16. Guide the first private Production trainer sign-in and full retained synthetic dashboard/workspace/action/denial/sign-out journey.
17. After cooldown, use a fresh browser/application session and complete a second fresh code-based sign-in to `/portal`, confirming the same bounded assignment.
18. Build `final-accepted`, repeat route safety, provider/pilot readback and exact five-alias reconciliation. Retain the candidate only when every acceptance boundary passes.
19. On any material discrepancy or failed acceptance, perform the all-five rollback in fixed order, rereading all aliases after every assignment. Build `final-rollback`, repeat public/protected safety and reconcile provider/pilot state.
20. Close with one exact permitted outcome and refresh proportional current authority. Do not proceed to Sprint 029N unless stable Production access passed or the owner later makes a separate explicit roadmap decision.

## Routing ledger state machine

| Checkpoint | Expected candidate count | Expected rollback count | Allowed next action |
|---|---:|---:|---|
| `baseline` | 0 | 5 | Stage fresh candidate |
| `post-stage` | 0 | 5 | Begin intentional promotion |
| `promotion-step-1` | 1 | 4 | Promote alias 2 |
| `promotion-step-2` | 2 | 3 | Promote alias 3 |
| `promotion-step-3` | 3 | 2 | Promote alias 4 |
| `promotion-step-4` | 4 | 1 | Promote canonical apex |
| `promotion-step-5` / `candidate-live` | 5 | 0 | Route smoke, then human acceptance |
| `final-accepted` | 5 | 0 | Close accepted |
| Any discrepancy | Any other state | Any other state | All-five rollback |
| `final-rollback` | 0 | 5 | Close truthful non-complete outcome |

No third deployment is permitted in any snapshot. Do not repair only the mismatched row and continue promotion. A discrepancy exits the promotion state machine and enters all-five rollback.

## Exact promotion and rollback commands

Use the fresh candidate's immutable automatic URL, never a stable alias, as the deployment argument. The established command shape is:

```powershell
vercel.cmd alias set <fresh-candidate-automatic-url> <exact-alias>
```

Promotion aliases, in order:

```text
pnr-precision-performance-rankin007-rankin007s-projects.vercel.app
pnr-precision-performance-rankin007s-projects.vercel.app
pnr-precision-performance.vercel.app
www.precisionperformance.com.au
precisionperformance.com.au
```

Rollback target and aliases, in order:

```powershell
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app precisionperformance.com.au
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app www.precisionperformance.com.au
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app pnr-precision-performance.vercel.app
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app pnr-precision-performance-rankin007s-projects.vercel.app
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app pnr-precision-performance-rankin007-rankin007s-projects.vercel.app
```

If execution-time CLI help requires an exact authenticated scope flag, add only the freshly verified intended scope and record the resulting command shape before the first mutation. Do not place tokens or protected values in command arguments.

## Per-alias inspection protocol

For each snapshot, inspect all five alias hostnames independently through the authenticated Vercel CLI or the official alias/deployment REST read path. The output retained in evidence is allowlisted to:

- UTC timestamp;
- checkpoint;
- alias hostname;
- deployment ID;
- exact intended project ID/classification;
- Production target;
- Ready state; and
- result `candidate`, `rollback` or `unexpected`.

Do not retain raw API/CLI JSON when it contains unrelated account, author, user, token or protected metadata. A deterministic PowerShell projection may parse raw stdout in process and print only the allowlisted fields. If a preferred JSON field changes, diagnose once and correct the projection without modifying repository files.

## Failure and recovery decision tree

- Baseline is not five/five rollback, affected alias set is not exactly five, or project/source is ambiguous: no deployment; close `production-alias-transition-preflight-blocked-clean`.
- Fresh candidate is not exact-source and Ready: no alias mutation; close `production-candidate-staging-blocked-clean`.
- `post-stage` is not five/five rollback: immediately assign all five to rollback and close `production-candidate-staging-alias-drift-rollback-clean` after proof.
- Any promotion snapshot differs from the required prefix/suffix state: assign all five to rollback and close `production-promotion-rolled-back-clean` after proof.
- Route smoke or human acceptance fails without source/configuration change: one sanitized diagnosis and one non-blind cooldown-safe retry may occur; otherwise rollback all five.
- A source, provider configuration, schema, permission, identity, fixture or data change is required: rollback all five and close `production-access-source-or-contract-change-required-rollback-clean`.
- Final rollback is not five/five Ready rollback: stop `production-promotion-partial-mutation-blocked` with the complete intervention record.

## Closeout minimum

Record the exact starting and final SHA/branch, Vercel CLI version, project, rollback, fresh candidate, candidate automatic URL, all ledger snapshots, public/protected smoke, human acceptance booleans, provider/pilot invariants, exact mutation list, rollback result, tests, repository diff and direct remote equality. Retain no protected value or raw provider payload.
