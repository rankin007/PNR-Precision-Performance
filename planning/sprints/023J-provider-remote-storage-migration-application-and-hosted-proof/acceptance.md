# Sprint 023J - Provider, Remote Storage, Migration Application And Hosted Proof Acceptance

## Clean Baseline

- [x] Separate clean combined 023E–023I commit exists and exact SHA is recorded.
- [x] Required ancestry, reconciled outcomes, committed ledger `0001–0018` and clean status pass.
- [x] Isolated 023J branch/worktree starts from that exact commit.
- [x] Original and earlier sprint worktrees remain unchanged.

## Authority, Provider And Preflight

- [x] Exact non-production Supabase/Vercel target/operator/mutation allowlist is recorded.
- [x] Target is demonstrably non-production, synthetic-only and not connected to production aliases/data.
- [x] Supabase is verified exact approved `ap-southeast-1` Singapore through sanitised direct evidence, with no Australian-only storage claim.
- [x] Aprec8 approves current provider/DPA/subprocessor/overseas-access boundary for this proof.
- [x] Storage-object backup/recovery method and retention/expiry are approved and testable.
- [x] Current official primary sources and access dates support platform assumptions.
- [x] Remote ledger is exactly `0001–0017`; no partial/conflicting 023E objects exist.
- [x] Count-only legacy inventory passes migration `0018` gates without exposing payloads.
- [x] No real/customer/production data is present and initial synthetic counts are governed.

## Local Completion And Commit

- [x] Migration `0019` additively defines exact RPCs, RLS/grants, bucket configuration and Storage policies.
- [x] Migrations `0001–0018` remain unchanged.
- [x] Signed-direct upload/finalisation is implemented with server authority and no overwrite.
- [x] Default hosted safety remains fail closed; CSV remains disabled.
- [x] Focused RPC/RLS/Storage/action/UI/Cron tests and full local matrix pass.
- [x] Candidate ledger validates exactly `0001–0019` and rejects gaps/duplicates/`0020+`.
- [x] TypeScript, full ESLint, static/local gates and reparse-safe build pass.
- [ ] A separate user-instructed local commit contains only approved 023J files and worktree is clean.
- [ ] Exact commit SHA is used for every remote/deployment action.

## Remote Migration And Storage

- [ ] Immediate pre-apply identity/region/ledger/inventory/recovery checks pass.
- [ ] Only committed `0018` and `0019` are applied through supported tooling.
- [ ] No reset, repair, force, history edit or manual partial continuation occurs.
- [ ] Remote ledger becomes exactly `0001–0019` once each.
- [ ] Schema, constraints, lineage, quota, RPCs, RLS, grants and audit agree with approved contract.
- [ ] `test-evidence` bucket is private, 5 MiB, JPEG/PNG/PDF only and CSV disabled.
- [ ] Authenticated upload policy requires exact live owned intent/key and no overwrite.
- [ ] Anonymous/ordinary list/read/update/delete and public access are denied.
- [ ] Legacy evidence remains unavailable/fail closed.

## Hosted Preview Proof

- [ ] Protected values are configured only for the named non-production environment and never exposed.
- [ ] Exact clean commit deploys only to the named preview/non-production target.
- [ ] No production deployment, alias/custom-domain move or Cron activation occurs.
- [ ] Positive permitted initiation/transfer reaches only unavailable safety state.
- [ ] All anonymous/wrong-scope/inactive/revoked/forged/limit/CSV/direct-access negatives pass.
- [ ] No unavailable evidence preview/download/signed URL exists.
- [ ] Idempotency, duplicate/replacement failure, lifecycle permissions and audit redaction pass.
- [ ] Cron route wrong/missing secret denies; correct secret performs bounded idempotent reconciliation.
- [ ] Approved synthetic Storage-object recovery proof passes without making evidence available.
- [ ] Exact synthetic cleanup completes Auth-last with final Auth/application/Storage `0/0/0`.

## Scope And Evidence

- [x] Eight required reviews distinguish local, committed, remotely applied, hosted and deferred proof.
- [x] No real data, live malware, provider secret, raw object key, signed URL or payload enters evidence/logs.
- [x] Production Supabase/Vercel/DNS/domain/alias/environment/data remains unchanged.
- [x] No dependency/provider addition, CSV enablement, real safety adapter, public launch or unrelated change occurs.
- [ ] `git diff --check`, clean worktree and source/remote commit agreement pass.
- [ ] No push/PR/merge/promotion occurs unless separately instructed.

## Closeout Outcomes

Close with exactly one:

- `nonproduction-evidence-platform-hosted-proof-complete-clean`: clean candidate committed, migrations/storage applied only to named non-production target, hosted synthetic fail-closed matrix/recovery/cleanup pass, and production remains untouched.
- `remote-baseline-commit-blocked-clean`: no valid clean combined 023E–023I commit exists; no 023J branch or external action begins.
- `remote-target-authority-blocked-clean`: exact non-production target/operator/mutation authority is absent or ambiguous; no external mutation occurs.
- `provider-region-recovery-blocked-clean`: exact `ap-southeast-1` Singapore region, provider suitability or Storage-object recovery is not approved/proven; no external mutation occurs.
- `remote-preflight-conflict-blocked-clean`: ledger, schema, legacy inventory, data classification, collision or zero-state preflight conflicts; no mutation occurs.
- `remote-candidate-ready-for-commit`: local `0019`/application completion passes but separate clean commit instruction is required; no remote mutation occurs.
- `remote-application-failed-contained`: supported apply fails or remote verification disagrees; no manual repair/production action occurs and feature deployment remains disabled.
- `hosted-proof-failed-contained`: remote schema/storage apply passes but configuration/deployment/matrix/recovery/cleanup fails; impact is contained to named non-production target and manual intervention is recorded.

No outcome implies production readiness, production application/deployment, operational scanning/sanitisation, CSV enablement, public launch, legal certification, push/merge or project Done.
