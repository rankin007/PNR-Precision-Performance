# Sprint 023L - Remote Application And Hosted Proof Acceptance

Sprint 023L is accepted only when every applicable item below is evidenced.

## Baseline And Target

- [ ] Exact baseline is `a15d89b2f95382d77a3f3ed450e1f4f16f254b51`, parent `fcf818fe3a8001b12941adc9dd121c6dbe8c002f`, with clean isolation.
- [ ] Sprint 023M durable reconciliation records agree that Sprint 023J is `remote-candidate-committed-clean`.
- [ ] Migration `0019` hash is exactly `67C0877038738EC5D3C4965DE10F3048D37D4E920407C4E675CB948C3450B80A`; `0018` is unchanged.
- [ ] Supabase target is exactly organisation `hohxquwkfehiuyrysufu`, project `uvskssaecdhxcgytkasc`, Singapore `ap-southeast-1`, healthy.
- [ ] Vercel target is exactly `rankin007's projects / pnr-precision-performance / Preview`, generated hostname, no custom domain.
- [ ] Preview maps only to the approved Supabase project.
- [ ] Synthetic-only/non-production classification, operator, rollback and incident paths are recorded.

## Immediate Preflight And Recovery

- [ ] Remote ledger is exactly `0001` through `0017` immediately before application.
- [ ] Legacy, collision and Auth/application/Storage zero-state counts pass without payload exposure.
- [ ] No pre-existing `test-evidence` bucket/object/policy or partial schema exists.
- [ ] Approved Storage-object recovery proves byte integrity and retention/expiry behavior before deployment.

## Remote Application

- [ ] Only migrations `0018` and `0019` are applied through the supported mechanism.
- [ ] Remote ledger becomes exactly `0001` through `0019`, once each.
- [ ] Schema, invariants, lineage, quotas, lifecycle, audit, RLS, RPC grants and policies match the committed design.
- [ ] Bucket is private, 5 MiB, JPEG/PNG/PDF only; CSV remains disabled.
- [ ] Ordinary clients have no list/read/update/delete access and no public existence oracle.
- [ ] Completion RPCs are service-role-only and enforce atomic Storage absence.

## Preview Configuration And Deployment

- [ ] Required values exist only in protected Preview scope and no value appears in evidence or Git.
- [ ] No scanner/sanitiser secret is added and fail-closed behavior remains active.
- [ ] Exact commit is deployed once to a generated Vercel Preview URL.
- [ ] No Production deployment, alias movement, custom-domain change or scheduled Production Cron occurs.

## Hosted Proof

- [ ] Required positive and negative role/scope matrix passes with synthetic data.
- [ ] Acknowledgement, type, size, count, aggregate quota and CSV denial pass.
- [ ] Exact-intent no-overwrite upload and unavailable finalisation pass.
- [ ] Replacement preserves predecessor until a safe successor could cut over; this sprint produces no available successor.
- [ ] Purge and expired compensation prove Storage deletion followed by atomic absence-guarded completion.
- [ ] Delete/completion failures are retryable; replay and overlap are idempotent.
- [ ] Reconciliation Preview route proves missing/wrong secret denial and correct-secret bounded execution without activating Production Cron.
- [ ] No preview/download/signed-read path exists for unavailable files.
- [ ] Logs and evidence contain no secrets, object keys, filenames, signed URLs or personal payloads.

## Cleanup And Non-Mutation

- [ ] Exact synthetic fixtures are removed with Auth last and final counts are `0/0/0`.
- [ ] No unknown rows/objects are deleted and no bucket-wide destructive operation occurs.
- [ ] Production aliases/domains/deployments and unrelated Supabase projects are unchanged.
- [ ] No source, migration, dependency, package, lockfile or provider declaration is changed.
- [ ] Required six evidence files, state/status/index and briefing updates are complete.
- [ ] JSON/static/local checks and `git diff --check` pass.
- [ ] Final claim is limited to non-production remote application and Preview proof.
- [ ] Evidence changes remain uncommitted unless a later separate commit instruction is received.

Any failed mandatory item triggers a bounded outcome and the five-part Manual Intervention Rule. Never continue after target mismatch, real-data discovery, migration drift, partial unsafe application, secret exposure, recovery failure, production impact or cleanup uncertainty.
