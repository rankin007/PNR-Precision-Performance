# Sprint 036F Blueprint

## Delivery sequence

1. Prove canonical root, one worktree, exact closed 036E SHA, clean two-file Architect handoff and direct remote authority.
2. Dry-run/apply the Pack and prove exactly four generated 036F files.
3. Create only `codex/036F-corrected-wrapper-live-lifecycle-retry`.
4. Read all generated files and complete closed 036D/036E evidence before changing the wrapper or test.
5. Hash-bind the corrected wrapper/core/test and inherited 036C/035K files.
6. Reconcile current official Supabase endpoint/fine-grained permission and Vercel staged-deploy/alias semantics.
7. Change only the wrapper/test branch binding, 036F token stem, fine-grained-live restriction and required deterministic expectations.
8. Run exactly 360 corrected plus 135 inherited assertions, wrapper self-test, protected-interaction invariants, static/JSON/scope/hash/runtime checks and zero-external-action proof.
9. Confirm one of the two recorded joint administrators, exact-project access, MFA/recovery readiness, fine-grained `auth_config_read` availability and no exact same-name 036F token.
10. Start one private non-transcribed ConsoleHost and run `ManagementLifecycle` exactly once.
11. Complete the six-step orientation and every non-secret control before creating anything.
12. Privately create and enter exactly one fine-grained 036F token at the one protected prompt.
13. Require the exact fixed Auth-config projection pass.
14. Immediately revoke the exact token, confirm its named row absent and require same-token `401`/`403` invalidation; clear protected state.
15. Only after invalidation, run retained-pilot exact-ID Verify and require `8/1/0/0`.
16. Prove Product bytes unchanged, run maintained validation, reconcile the exact Vercel project/rollback/five aliases and capture `baseline` five/five rollback.
17. Commit/push only scoped 036F planning/evidence/tooling and prove local/direct-remote equality.
18. Stage one fresh exact-source `--prod --skip-domain` candidate; require exact/Ready and `post-stage` five/five rollback.
19. Assign the five aliases one at a time in fixed order, rereading all five after each, and require `candidate-live` five/five candidate.
20. Pass cache-busted public/protected/API safety.
21. Complete the first private Production sign-in, governed journey, denial and sign-out.
22. After cooldown, complete a second fresh-session/fresh-code Production sign-in.
23. Rerun retained-pilot Verify, route safety and `final-accepted`; reconcile zero unauthorized mutation.
24. Refresh proportional records, commit/push scoped closeout and stop without beginning Sprint 029N.

## One-attempt credential state machine

The credential lifecycle is monotonic:

`not-created`

-> `orientation-and-non-secret-controls-complete`

-> `creation-instruction-issued`

-> `protected-value-received` or `possible-created-without-protected-value`

-> `provider-pass`

-> `exact-revocation-confirmed`

-> `same-token-invalid` (`401` or `403`)

-> `protected-state-cleared`

Only `protected-state-cleared` after `same-token-invalid` permits retained-pilot or release work.

`possible-created-without-protected-value`, protected output, provider mismatch, wrong token class, revocation ambiguity or invalidation ambiguity enters compensation/stop. No path creates a replacement token or starts a second live wrapper invocation.

One same-token invalidation retry is allowed only after a diagnosed provider propagation or rate-limit classification. It does not create a new lifecycle and the total Management request count remains at most three.

## Corrected wrapper activation

The wrapper remains `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` for operational continuity. Before live use:

- bind it exactly to the 036F branch;
- generate `precision-performance-036F-single-use-<UTC>`;
- permit only `fine-grained-auth-config-read` in the 036F live path;
- preserve the complete 036E interaction contract; and
- update only deterministic expectations in the existing test.

The core remains byte-identical. Protected operations must still refuse deterministic injection. SelfTest remains synthetic/offline and must prove zero remote mutation.

The corrected interaction order is:

1. six numbered orientation lines;
2. all non-secret intercepted single-key controls;
3. final readiness;
4. exact token name and `CREATE THE CREDENTIAL NOW`;
5. `PROTECTED CREDENTIAL ENTRY - THIS IS THE ONLY CREDENTIAL PROMPT`;
6. immediate `Read-Host -AsSecureString`;
7. provider pass;
8. non-secret revocation/list-absence control; and
9. body-blind same-token invalidation.

No ordinary prompt or echoing input may appear. Buffered input stops before creation. Cancellation after creation instruction is possible-credential compensation, never a clean exit.

## Pre-stage gates

### Gate A - local and protected lifecycle

- canonical/direct-remote/handoff proof;
- exact wrapper/core/test hashes before change;
- exact two-file implementation scope;
- 360 corrected plus 135 inherited assertions, zero failures;
- wrapper self-test and interaction/source invariants;
- current official Supabase mechanism/permission proof;
- exactly one fine-grained token lifecycle;
- exact provider projection;
- exact-token revocation/list absence;
- same-token `401`/`403` invalidation; and
- protected state/residue zero.

### Gate B - retained pilot and Product integrity

- retained-pilot Verify `8/1/0/0`;
- accepted 035K ancestry and unchanged Product/runtime/package bytes;
- no runtime import of protected tooling;
- retained focused/canonical/TypeScript/lint/build proof; and
- scoped branch commit/push with direct-remote equality.

### Gate C - release baseline

- current installed Vercel CLI/help and official mechanism reconciliation;
- exact project ID and Production classification;
- exact five-alias affected set and no unlisted Production alias;
- Ready rollback exact identity/source;
- unaccepted Sprint 036 candidate excluded; and
- `baseline` five independent rows, five/five rollback.

No later gate begins from an incomplete earlier gate.

## Routing ledger

Each row records only UTC timestamp, checkpoint, exact alias, resolved deployment ID, intended project/classification, Production target, Ready state and `candidate`/`rollback`/`unexpected`.

Required full five-row snapshots:

1. `baseline` - five/five rollback before staging;
2. `post-stage` - five/five rollback after fresh candidate Ready;
3. `promotion-step-1` through `promotion-step-5` - all five reread after every assignment;
4. `candidate-live` - five/five candidate before authentication;
5. `final-accepted` - five/five candidate after both sign-ins; or
6. `rollback-step-1` through `rollback-step-5` and `final-rollback`.

Per-alias resolution is authoritative. Deployment-level alias inventory is corroborating only.

## Command shapes

Run from the canonical root.

Pack and repository:

`git worktree list --porcelain`

`git status --short --branch`

`git rev-parse HEAD`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036F-corrected-wrapper-live-lifecycle-retry.md`

Focused protected proof:

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

Single live lifecycle, once only:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation ManagementLifecycle`

Retained pilot, only after invalidation and again after both sign-ins:

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation RetainedPilotVerify`

Product integrity and maintained validation:

`git diff --name-status 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

`git diff --name-status 6c632262438d84ef64931a1c360cc453621762ec HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json supabase`

`npm run test:live-trainer-035k`

`npm run test:dashboard-035`

`node --experimental-strip-types scripts/test-email-otp-035D.mjs`

`node --experimental-strip-types scripts/test-passwordless-redirect-035C.mjs`

`node --experimental-strip-types scripts/test-bootstrap-concurrency-035F.mjs`

`node --experimental-strip-types scripts/test-otp-recovery-path-035F.mjs`

`node --experimental-strip-types scripts/test-protected-synthetic-otp-recovery-035F.mjs`

`npm run test:public-relaunch-032`

`npm run validate:json`

`npm run test:domain`

`npm run test:roles`

`npm run test:supabase-self`

`npm run validate:static`

`npm run typecheck`

`npm run lint -- --max-warnings=0`

`npm run build`

Release mechanism and final repository checks:

`vercel.cmd --version`

`vercel.cmd deploy --help`

`vercel.cmd alias --help`

`vercel.cmd inspect --help`

`git diff --check`

`git status --short`

Equivalent or stronger safe commands may prove the same fact when current tool syntax changes. Do not weaken exact-target, independent per-alias, protected-output or cleanup boundaries.

## Promotion and rollback

Promotion uses five explicit `alias set` calls in legacy-team, team-project, project, `www`, apex order. Every step rereads all five and must produce candidate/rollback counts `1/4`, `2/3`, `3/2`, `4/1`, `5/0`.

Rollback uses five explicit assignments to the immutable rollback URL in apex, `www`, project, team-project, legacy-team order. Assign all five even if some appear safe. Every step rereads all five; final recovery is five/five Ready rollback plus route safety.

## Failure and recovery

- Wrong canonical/remote baseline or unexpected handoff diff: stop before branch/external action.
- Fine-grained `auth_config_read` token unavailable or ambiguous before creation: create nothing; close type-refused clean.
- Creation instruction issued but protected value absent: private exact-name revocation/list-absence intervention; no second lifecycle; stop blocked unless same-token invalidation remains possible in the original process.
- Provider projection fails after token receipt: revoke exact token, prove invalid, clear state; close before pilot/Vercel.
- Protected output occurs: terminate/finalize the surface, privately revoke exact token, prove invalid when the original process safely retains it, clear state; do not repeat the surface.
- Revocation or same-token invalidation unproven: stop blocked; no pilot/Vercel/release action.
- Retained-pilot mismatch: no repair; close before Vercel.
- Fresh candidate not exact/Ready: no alias movement; close staging blocked clean.
- `post-stage` not five/five rollback: assign all five to rollback; close staging-drift rollback clean.
- Promotion snapshot mismatch: immediate all-five rollback.
- Route/human transient failure: one sanitized diagnosis and one cooldown-safe non-blind retry only; otherwise all-five rollback.
- Source/provider/schema/permission/identity/fixture/data change required: all-five rollback when needed; close source-or-contract-change-required.
- Final rollback or credential cleanup cannot be proven: stop blocked with exact manual intervention.

## Closeout minimum

Record canonical/remote authority, exact two-file diff, before/after hashes, unchanged core/inherited hashes, current official mechanism references, assertion arithmetic, one-attempt credential timeline, sanitized provider projection, exact revocation/list-absence/same-token invalidation result, protected residue, retained-pilot checks, Product validation, candidate identity, every five-row routing snapshot, both private human journeys, route safety, final external-mutation ledger, final outcome, rollback readiness and scoped branch equality.

Only `production-trainer-access-stable-live-accepted-clean` completes the live trainer-access gate. Stop without beginning Sprint 029N.
