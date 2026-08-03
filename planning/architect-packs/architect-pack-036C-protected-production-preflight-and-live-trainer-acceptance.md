============================================================
FILE: planning/sprints/036C-protected-production-preflight-and-live-trainer-acceptance/requirements.md
============================================================

# Sprint 036C — Protected Production Preflight And Live Trainer Acceptance

## Outcome

Complete the unfinished Sprint 036 live trainer-access outcome without repeating Sprint 036B's protected-output failure. Build and prove one narrow identity-blind operations preflight, use it to establish current Supabase Auth configuration and retained Sprint 035K pilot invariants without opening or enumerating an Authentication user surface, then—only after every pre-stage gate passes—stage one fresh zero-product-change Production candidate, transition exactly five stable aliases through the already-proven per-alias transaction, and complete two private human Production trainer sign-ins.

Target outcome: `production-trainer-access-stable-live-accepted-clean`.

Sprint 036C is the corrective continuation of Sprint 036B under the project suffix rule. Sprint 036B safely closed `production-alias-transition-preflight-blocked-clean` before candidate staging because a signed-in Authentication dashboard surface rendered protected identity fields. Sprint 029N remains behind this gate.

## Workflow profile

Use `strict`. This sprint touches a protected Supabase Management API credential, a service-role credential used by the existing retained-pilot verifier, Vercel Production deployment and aliases, a retained human trainer identity, private mailbox participation, live sessions and rollback.

Strict controls attach to the protected preflight, exact targets, output allowlists, Production alias mutation, human authentication, integrity and recovery. They do not authorize product behavior, provider configuration, schema, identity, fixture or data changes.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that exact path. Expected closed Sprint 036B authority is SHA `c7d2a298218d6dc36871732054886145c449f7db` on `codex/036B-authoritative-production-alias-transition-and-live-trainer-acceptance`, with exactly one canonical worktree registration. Prove current status and direct remote authority using connected GitHub evidence when a local credential path or remote-tracking ref is unavailable.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any additional uncommitted path, changed starting SHA, unresolved remote divergence or extra worktree is a material baseline mismatch until reconciled.

Create only `codex/036C-protected-production-preflight-and-live-trainer-acceptance` in the permanent canonical repository. Do not recreate, inspect through or use retired legacy roots, `C:\tmp` worktrees, deployment directories or Sprint 035Q.

## Task contract

**objective:** Establish stable, repeatable live Production trainer access after proving provider and retained-pilot readiness through an identity-blind protected preflight.

**owns:** Exact canonical and direct-remote reconciliation; three narrow protected-preflight operations files and their deterministic tests; read-only Supabase Management API Auth-config projection; exact-ID retained-pilot verification through the existing 035K core; unchanged application validation; read-only Vercel project/deployment/domain/alias evidence; a timestamped five-alias routing ledger; one fresh `--prod --skip-domain` candidate; exactly five intentional candidate alias assignments; cache-busted public/protected smoke; two private human Production sign-ins; exact all-five rollback; and proportional planning, operations and closeout records.

**must_not:** Open, navigate through, scrape or automate an Authentication users surface; call a user-list endpoint; enumerate Auth users; emit raw Management API/provider responses; create, rotate, print, persist or commit a Management API token or service-role value; reuse/promote the Sprint 036 candidate; trust deployment-level alias inventory over per-alias routing; move an unlisted alias; change application, component, library, package, runtime configuration, migration, schema, RLS, role, permission, provider/Auth configuration, callback, SMTP, template, identity, fixture, application data, Storage, DNS or Vercel settings; inspect or automate a mailbox; use real data; activate Participants A/B/C; implement Sprint 029N; merge, open a PR, push `develop`, force-push, rewrite history or claim broad rollout/product-wide Done.

**acceptance:** A tested protected preflight emits only allowlisted booleans, counts and fixed classifications; exact current Auth configuration and the retained pilot pass without identity enumeration or protected output; one fresh exact remote-backed candidate is Ready while all five aliases remain on rollback after staging; the fixed stepwise transaction ends five/five on candidate; public/protected safety passes; the retained trainer completes two fresh private Production code sign-ins plus the governed dashboard/workspace/action/denial/sign-out journey; final provider/pilot and alias invariants pass; and exact rollback remains Ready.

**verification:** Run Pack dry-run/four-target proof; canonical path/worktree/status/lineage/direct-remote checks; deterministic protected-preflight tests including adversarial secret/private-data canaries; protected wrapper self-test; provider-config and retained-pilot readback in a non-transcribed private console; exact application-byte comparison; retained focused auth/OTP/redirect/bootstrap/session/dashboard/permission suites; canonical validation, TypeScript, zero-warning lint and Production build; current installed Vercel CLI/help and official mechanism reconciliation; project/domain/alias inventory; five independent alias inspections at every transition checkpoint; rollback/candidate Ready/source proof; cache-busted public/protected/API/unsafe-method smoke; two fresh private human Production sign-ins; final protected preflight; diff/secret/private-data/generated-artifact scans; final worktree/direct-remote proof; and one exact permitted outcome.

## Governing release and pilot state

Fresh execution-time readback governs, with these recorded baselines to reconcile:

- exact Vercel project `rankin007s-projects/pnr-precision-performance`, project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`;
- known-safe Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, immutable URL `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`, recorded source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`;
- unaccepted Sprint 036 candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`, which must not be reused or promoted;
- accepted Sprint 035K correction `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810` remains in ancestry and current application/source bytes have zero unexplained difference from accepted 035K and validated 036/036B behavior;
- approved Supabase project `uvskssaecdhxcgytkasc`; prohibited old project `tagnbgkroihagjmvehlx` must not be contacted;
- Production Site URL `https://precisionperformance.com.au`;
- redirect allowlist exactly `https://precisionperformance.com.au/auth/callback`, with no wildcard;
- Resend custom SMTP classification and approved sender `no-reply@precisionperformance.com.au`;
- active magic-link/email-OTP template with exactly one `.Token`, zero `ConfirmationURL` and zero links;
- email OTP length `6`, expiry `3600` seconds and minimum per-user send interval `60` seconds; and
- the retained adopted Sprint 035K trainer identity and exact bounded eight-record synthetic graph remain governed, with no real horse, stable, clinical, customer or Storage data.

The five and only accepted stable aliases are:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Every recorded baseline must be freshly reread. Historical evidence is context, not execution-time proof.

## Protected preflight operations design

Add only:

- `scripts/protected-production-preflight-036C-core.mjs`
- `scripts/Invoke-ProtectedProductionPreflight036C.ps1`
- `scripts/test-protected-production-preflight-036C.mjs`

Do not modify `scripts/live-trainer-access-035K-core.mjs`; reuse its exact-ID, no-enumeration `--verify` operation through the new branch-scoped wrapper. Pin or independently verify the existing core's approved target, prohibited target, hidden-input, `getUserById`, no-`listUsers`, sanitized-error and eight-record verification contracts before live use.

The new core has one live remote operation: HTTPS `GET https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`. Reconcile the current official Supabase Management API/OpenAPI contract at execution time. The live path must hard-code the exact project and GET method, reject redirects, require a successful JSON response within a bounded size, keep the bearer credential and complete response in child-process memory only, project the result before output, clear references/environment values, and emit sanitized fixed codes on every failure.

No PATCH, POST, PUT or DELETE Management API method is permitted. No Auth Admin user endpoint, Dashboard Authentication page, browser navigation, user table, `listUsers`, pagination or general-purpose arbitrary URL is permitted.

The PowerShell wrapper must:

- bind to the exact canonical root and 036C branch;
- allow automated `SelfTest`, but require a private interactive `ConsoleHost` with input/output not redirected and PowerShell transcription disabled for protected operations;
- acquire an existing Management API bearer credential or service-role value only through `Read-Host -AsSecureString`;
- never place protected inputs in arguments, parent environment, files, clipboard, command history, transcript or retained output;
- inject each protected value only into the relevant child process;
- remove child/parent environment entries, release/zero BSTR memory and dispose process objects in `finally`;
- refuse a pre-existing protected process environment; and
- allow only `ProviderConfig`, `RetainedPilotVerify` and `SelfTest`.

This sprint does not authorize creating or rotating a Supabase token. Use already-authorized access. If no existing credential can be supplied through the protected wrapper, close `production-protected-preflight-access-unavailable-clean` without deployment or alias mutation and record the complete manual-intervention boundary.

## Provider configuration output contract

The core may inspect the complete Auth-config response in protected process memory but retained output is limited to:

- harness/version and UTC timestamp;
- mode `provider-config`;
- state `pass` or `failed-sanitized`;
- target `exact-approved`;
- `siteUrlExact`;
- `callbackCount`, `callbackSetExact` and `wildcardCount`;
- `customSmtpConfigured`, `providerClass` fixed to `resend`, `senderExact`;
- `templateTokenCount`, `confirmationUrlCount`, `templateLinkCount`;
- `otpLength`, `otpExpirySeconds`, `minimumIntervalSeconds`;
- `authUsersEnumerated` fixed to `false`;
- `remoteMutation` fixed to `none`; and
- `protectedValuesEmitted` fixed to `false`.

Do not output Site URL, callback, sender, SMTP host/user/pass, template body/subject, bearer credential, raw JSON, arbitrary provider error text, response headers, account/organization metadata or any value not listed above. The fixed non-sensitive target facts may remain in source; raw provider values may not.

Pass requires exact Site URL; exactly one exact Production callback and no wildcard; Resend SMTP configuration with the exact approved sender; one token, zero confirmation URL and zero links; OTP length 6, expiry 3600 and minimum interval 60; zero Auth-user enumeration; and zero remote mutation. Missing/renamed fields fail sanitized until the current official contract is reconciled. A deterministic field-name or projection correction remains in scope when it does not weaken the output contract or change remote state.

Deterministic tests must cover: exact pass; wrong target/old project; wrong Site URL; missing/extra/wildcard callback; SMTP/provider/sender mismatch; missing SMTP configuration; zero/multiple template tokens; ConfirmationURL/link presence; OTP length/expiry/frequency drift; non-200, redirect, oversized, non-JSON and missing-field responses; output-key exactness; and adversarial raw payload/error canaries containing emails, UUIDs, JWT-like strings, passwords, bearer values, SMTP values and identity-like fields. No canary may appear in output or thrown error text.

## Retained-pilot readback contract

Run the existing `scripts/live-trainer-access-035K-core.mjs --verify` only through the new protected wrapper. It must use:

- exact approved Supabase URL and prohibited-old-project refusal;
- child-only service-role credential;
- the retained ownership ledger;
- private hidden tester email input;
- ledger-bound Auth ID through `getUserById`, never user enumeration;
- exact read-by-ID comparison for all eight synthetic application rows;
- exact adopted Auth identity agreement;
- zero wrong-horse rows; and
- no mutation.

The only accepted sanitized result is `state=verified`, `application=8`, `auth=1`, `storage=0`, `wrongHorseRows=0`. No email, Auth ID, row ID, ledger content, provider response or unrelated count may be retained. A missing/invalid ledger, exact-identity mismatch, row mismatch or unexpected data is a material preflight stop; do not repair, recreate or clean the retained pilot in Sprint 036C.

## Pre-stage gate

Before any candidate deployment or alias mutation:

1. protected-preflight deterministic tests and wrapper self-test pass;
2. fresh provider-config projection passes;
3. fresh retained-pilot Verify passes;
4. application/source bytes and all maintained validation pass;
5. current Vercel mechanism, exact project, domain/alias inventory and Ready rollback pass; and
6. the `baseline` ledger proves all five aliases independently resolve to the Ready rollback.

If the protected runner itself emits a protected value, terminate/finalize that surface, do not repeat it, and close `production-protected-preflight-output-blocked-clean`. If preflight reports a provider or pilot mismatch, close `production-protected-preflight-mismatch-clean`. Neither outcome permits a candidate deployment or alias mutation.

## Zero-product-change candidate boundary

The application behavior is already accepted. The three new files are non-runtime operations tooling only. No application, component, library, test outside the new harness test, package, lockfile, Next/Vercel runtime configuration, migration or provider configuration may change.

Prove current application/source bytes have no unexplained difference from accepted Sprint 035K and no difference from validated Sprint 036B across approved runtime paths. Prove no runtime module imports the new operations helper/wrapper/test. Run maintained validation on the unchanged application tree.

Intentionally commit and push only the scoped 036C planning/evidence/tooling checkpoint. Prove exact local/direct-remote equality, then deploy one fresh Production-target candidate with `--prod --skip-domain` from that exact SHA. Do not reuse either earlier Sprint 036 candidate.

If application bytes differ unexpectedly, validation exposes a product defect, live acceptance exposes a source/configuration defect, or any package/runtime/provider change is required, restore all five aliases when needed and close `production-access-source-or-contract-change-required-rollback-clean`.

## Authoritative alias evidence and transition

Current routing authority is the independently resolved deployment identity for each named alias. Record only UTC timestamp, checkpoint, alias, resolved deployment ID, intended project ID/classification, Production target, Ready state and `candidate`/`rollback`/`unexpected`.

Required full five-row snapshots are:

1. `baseline` — all five on rollback before staging;
2. `post-stage` — all five still on rollback after the fresh candidate is Ready;
3. `promotion-step-1` through `promotion-step-5` — reread all five after every assignment;
4. `candidate-live` — all five on candidate before human authentication;
5. `final-accepted` — all five on candidate after both human sign-ins; or
6. `rollback-step-1` through `rollback-step-5` and `final-rollback`.

Deployment-level alias inventory, alias-list output, project status, audit log and public HTTP are corroborating only and never override contradictory per-alias resolution. Audit logs are optional.

Promotion order is fixed:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

Use explicit `vercel alias set <fresh-candidate-automatic-url> <exact-alias>`. Do not use `vercel promote` or `vercel rollback` unless read-only pre-confirmation proves their complete affected set equals exactly the five aliases.

After each assignment, reread all five. Any command error, unexpected alias, third deployment, non-Ready state, automatic movement or irreconcilable response triggers immediate all-five rollback before unrelated action or human authentication.

Rollback order is:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Assign every alias to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` even when an earlier read appears safe, and reread all five after every step. If final five/five Ready rollback cannot be proven, stop `production-promotion-partial-mutation-blocked` with complete manual-intervention instructions.

## Human Production acceptance

Only after `candidate-live`, provider/pilot preflight and cache-busted public/protected smoke pass:

1. tester privately opens canonical Production sign-in;
2. privately requests, receives and enters one current six-digit code;
3. reaches `/portal` without loop or bootstrap collision;
4. sees only the retained synthetic stable/horse and accurate workflow state/action;
5. opens the synthetic horse workspace and reaches or completes the existing permitted action;
6. proves inaccessible-horse denial without identity, existence, state or count leakage;
7. signs out and proves protected access is gone; and
8. after cooldown, uses a fresh browser/application session and fresh current code to reach `/portal` again with the same bounded assignment.

The tester controls the mailbox and enters email/codes privately. Builder must not inspect, automate or scrape the mailbox; receive protected values; or retain email, OTP, message, session or private identifiers in chat, commands, URLs, logs, screenshots, Git or evidence.

One sanitized diagnosis is permitted for human-input, expiry, cooldown or transient failure. Retry only when non-blind and no source/provider/configuration change is required. A material authentication, session, permission, privacy or integrity failure triggers all-five rollback.

After both sign-ins, rerun retained-pilot Verify and, when safely available, provider-config projection. A successful live journey plus exact pre-stage provider proof and a zero-provider-mutation ledger may substitute for a final provider API rerun that is unavailable for a supporting reason; record why the substitute is equally strong. It cannot substitute for a reported mismatch, privacy failure or missing pre-stage provider proof.

## Applicable authority and gates

Read and preserve:

- `AGENTS.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`;
- Sprint 036B requirements, acceptance and review, especially the protected-output stop;
- Sprint 036 requirements, acceptance and review, especially per-alias routing authority and rollback;
- Sprint 035K requirements, acceptance, review and exact-ID retained-pilot core;
- `planning/reviews/035F-resend-hosted-integration-preflight.md`;
- `docs/AUTH_RLS_PORTAL_ACCESS.md`;
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`;
- `docs/OPERATIONS_HANDOFF.md`;
- current state/status/roadmap/lifecycle/schedule/evidence/briefing; and
- fresh official Supabase Management API/OpenAPI and Vercel CLI documentation plus installed CLI help at execution time.

This sprint crosses protected operations-tooling, read-only provider configuration, Production deployment, five-alias routing and human Production authentication gates. It does not cross provider mutation, product/runtime, callback/template/SMTP mutation, DNS, schema, RLS, role, permission, identity, fixture, data, public enquiry, commerce or broad rollout gates.

## Approved files and external actions

Approved repository writes are limited to:

- the four generated Sprint 036C files;
- `scripts/protected-production-preflight-036C-core.mjs`;
- `scripts/Invoke-ProtectedProductionPreflight036C.ps1`;
- `scripts/test-protected-production-preflight-036C.mjs`;
- `planning/reviews/036C-protected-production-preflight-and-live-trainer-acceptance.md`;
- proportional current updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where final authority changes; and
- `docs/OPERATIONS_HANDOFF.md` only for the proven protected readback and release/rollback procedure.

No application, component, library, package, lockfile, Next/Vercel runtime configuration, migration or existing test/helper file may change.

Approved external actions are limited to sanitized read-only Git/GitHub, Vercel and Supabase checks; two protected Management API GET/readback windows; retained-pilot exact-ID Verify; one fresh exact-source staged Production deployment using `--skip-domain`; exactly five candidate alias assignments; cache-busted public/protected smoke; bounded private human OTP requests/verifications; exact all-five rollback; and intentional commit/push of only the scoped 036C branch.

## Evidence-proportional execution and manual intervention

Stop only for a material canonical/remote mismatch, wrong/unbounded target, protected-output failure, provider/pilot mismatch, alias-routing contradiction, secret exposure, authentication/privacy/integrity failure, unauthorized source/provider/schema/contract expansion, partial Production mutation, failed rollback, unexpected real data, destructive uncertainty or cleanup that cannot be proven safe.

Use equivalent or stronger safe proof when an optional supporting tool is unavailable. Keep in-scope harness, credential-injection, projection, field-name, timestamping, JSON parsing, reporting, formatting, encoding and deterministic validation corrections inside 036C when they preserve the contract. Do not create another sprint solely because a browser driver, audit log, renderer, clipboard path, optional CLI command or redundant verifier is unavailable.

Human private-console credential entry and trainer mailbox/sign-in participation are required protected evidence, not fallback intervention. Builder owns commands and verification; the human enters protected values only. If the agent cannot safely open or continue the protected console, record:

- what is blocked;
- evidence already checked;
- the exact secret-free user action;
- step-by-step instructions using only the fixed wrapper command;
- the exact sanitized output the user may report; and
- what Builder will verify afterward.

Never ask the user to paste a credential, email, OTP, raw response, screenshot or protected value into conversation.

============================================================
FILE: planning/sprints/036C-protected-production-preflight-and-live-trainer-acceptance/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/036C-protected-production-preflight-and-live-trainer-acceptance/acceptance.md
============================================================

# Sprint 036C Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level exactly equal the permanent canonical repository.
- [ ] Exactly one canonical worktree registration exists and no retired/temporary/alternate workspace is used.
- [ ] Exact closed 036B SHA `c7d2a298218d6dc36871732054886145c449f7db` and direct remote authority are proven or later accepted authority is explicitly reconciled.
- [ ] Pre-branch state contains only this Pack and `planning/STATUS.json`.
- [ ] Pack dry-run/apply/post-dry-run reports exactly the four 036C sprint files.
- [ ] Only `codex/036C-protected-production-preflight-and-live-trainer-acceptance` is used.

## Protected preflight implementation

- [ ] Repository code scope is exactly the three new 036C operations files; existing 035K helper remains byte-identical.
- [ ] Provider live path is hard-bound to exact approved project, HTTPS GET and the Auth-config endpoint.
- [ ] No arbitrary URL/method, Dashboard browser path, Auth Admin user endpoint, `listUsers`, pagination or user enumeration path exists.
- [ ] Protected operations require private non-transcribed interactive ConsoleHost input and refuse redirection/pre-existing protected environment.
- [ ] Management credential and service role enter only their respective child process and are cleared/zeroed/disposed afterward.
- [ ] Reporter output keys equal the approved allowlist and all failures use fixed sanitized codes.
- [ ] Deterministic tests cover exact pass, every config drift class, transport/schema failure and adversarial protected canaries.
- [ ] No secret/private canary or raw response/error value appears in stdout, stderr, thrown text, files or Git.
- [ ] Wrapper self-test passes.
- [ ] No package/lockfile or existing helper/test change occurs.

## Fresh identity-blind preflight

- [ ] Existing authorized Management API access is supplied privately without creating/rotating/storing a token.
- [ ] Provider projection proves exact target, Site URL, one callback/no wildcard, Resend SMTP, exact sender, one token/no links, 6/3600/60 and zero mutation/enumeration/output.
- [ ] Retained-pilot Verify proves exact `verified`, application `8`, Auth `1`, Storage `0`, wrong-horse rows `0`.
- [ ] No Authentication users page or user-list endpoint is opened/called.
- [ ] No email, Auth ID, row ID, token, credential, template body, SMTP value or raw provider payload is retained.
- [ ] Any output/mismatch/access failure stops before candidate staging with the exact permitted clean outcome.

## Unchanged application and validation

- [ ] Accepted 035K correction remains in ancestry and approved runtime paths have zero unexplained difference from accepted 035K and validated 036B.
- [ ] No runtime module imports the 036C operations files.
- [ ] Focused 035K, dashboard, OTP, redirect, bootstrap, recovery, session and permission tests pass.
- [ ] Sprint 032 public controls, JSON, domain, roles, Supabase-self and static validation pass.
- [ ] TypeScript, zero-warning lint and Production build pass with equivalent or stronger safe evidence where needed.
- [ ] Diff, staged, secret, protected-data, unsafe-path, generated-artifact and encoding scans pass.
- [ ] Scoped 036C checkpoint is committed/pushed and exact local/direct-remote equality is proven before deployment.

## Vercel and authoritative baseline

- [ ] Current Vercel CLI/help and official mechanism semantics are recorded.
- [ ] Exact project ID, Production environment, rollback and unaccepted 036 candidate are freshly reconciled.
- [ ] Planned affected set is exactly the five accepted aliases and no other Production alias.
- [ ] Deployment alias inventory is corroborating only.
- [ ] `baseline` has five independent timestamped rows, all Ready rollback.

## Candidate staging and transition

- [ ] Fresh candidate—not the Sprint 036 candidate—deploys from exact remote-backed 036C SHA with `--prod --skip-domain`.
- [ ] Candidate is exact-project, Production-targeted, exact-source, immutable and Ready.
- [ ] `post-stage` proves five/five aliases remain on rollback.
- [ ] Fixed promotion order is used with one exact alias assignment per step.
- [ ] Promotion steps prove candidate/rollback counts 1/4, 2/3, 3/2, 4/1 and 5/0.
- [ ] Every snapshot contains five rows and no third deployment, non-Ready state or unlisted movement.
- [ ] `candidate-live` proves five/five Ready candidate before human authentication.

## Public and protected safety

- [ ] Cache-busted homepage, pricing, disclaimer/asset, disabled enquiry, health and truthful sign-in pass.
- [ ] Anonymous portal and horse routes return safely to sign-in without loop or identity leakage.
- [ ] Unsafe methods and protected/API boundaries retain expected denial.
- [ ] DNS/public-authenticated separation remains unchanged.
- [ ] Compatible rollback remains Ready.

## First private Production journey

- [ ] Tester privately requests/receives/enters one current six-digit code on canonical Production.
- [ ] Session reaches `/portal` without loop/bootstrap collision.
- [ ] Only retained synthetic stable/horse and accurate workflow/action appear.
- [ ] Synthetic horse workspace/action succeeds.
- [ ] Inaccessible horse is denied without identity/existence/state/count leakage.
- [ ] Sign-out removes protected access.

## Second fresh Production sign-in

- [ ] Fresh browser/application session has no first-session auth state.
- [ ] New current code—not an old/reused code—establishes a second Production session.
- [ ] `/portal` shows the same bounded assignment and no broader visibility.
- [ ] Tester confirms usability without sharing protected details.
- [ ] No protected value enters conversation, commands, URLs, logs, screenshots, Git or durable evidence.

## Final invariants and closeout

- [ ] Final retained-pilot Verify passes; final provider projection passes or an equally strong documented substitute meets the defined boundary.
- [ ] `final-accepted` proves five/five Ready candidate after both sign-ins.
- [ ] No provider/Auth config, callback, SMTP, template, schema, RLS, role, permission, identity, fixture, data, Storage, DNS or unrelated product mutation occurs.
- [ ] Participants A/B/C, unrelated identities and real data remain untouched.
- [ ] Review and current state/status/roadmap/lifecycle/schedule/evidence/operations/briefing agree.
- [ ] Canonical worktree is clean and exact closeout commit equals scoped direct remote branch.
- [ ] Sprint 029N remains unstarted unless this sprint passes the live trainer-access gate or a later separate owner decision changes the road.
- [ ] No merge, PR, `develop` push, force-push, broad rollout or product-wide Done declaration occurs.

## Failure and rollback

- [ ] A material failure receives one focused sanitized diagnosis and no blind retry.
- [ ] Staging drift, transition discrepancy, route failure, material auth failure or scope expansion triggers exact all-five rollback.
- [ ] Rollback assigns all five to the immutable rollback URL in fixed order, rereading all five after every assignment.
- [ ] `final-rollback`, when required, proves five/five Ready rollback and final route safety.
- [ ] No known-broken candidate, third deployment or partial mapping remains live.
- [ ] If rollback cannot be proven, exact step-by-step manual intervention is recorded.

## Permitted outcomes

- `production-trainer-access-stable-live-accepted-clean`
- `production-protected-preflight-access-unavailable-clean`
- `production-protected-preflight-output-blocked-clean`
- `production-protected-preflight-mismatch-clean`
- `production-candidate-staging-blocked-clean`
- `production-candidate-staging-alias-drift-rollback-clean`
- `production-promotion-rolled-back-clean`
- `production-trainer-authentication-failed-rollback-clean`
- `production-access-source-or-contract-change-required-rollback-clean`
- `production-promotion-partial-mutation-blocked`

Only `production-trainer-access-stable-live-accepted-clean` completes the live trainer-access gate.

============================================================
FILE: planning/sprints/036C-protected-production-preflight-and-live-trainer-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 036C — Protected Production Preflight And Live Trainer Acceptance.

Your one objective is to establish stable live Production trainer access after proving current provider and retained-pilot readiness through a new identity-blind protected preflight. Do not open or enumerate Authentication users. Completion requires the protected preflight, unchanged application validation, a fresh staged candidate, authoritative five-alias transition, route safety, two fresh private Production code sign-ins, the retained synthetic dashboard/workspace/action journey, safe denial/sign-out, final invariants and exact rollback readiness.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and Git top-level; both must equal it. Verify one canonical worktree. Expected starting authority is closed 036B SHA `c7d2a298218d6dc36871732054886145c449f7db`; prove direct remote authority using connected GitHub evidence when needed. The only expected Architect handoff changes are this Pack and `planning/STATUS.json`.

Create only `codex/036C-protected-production-preflight-and-live-trainer-acceptance`. Dry-run/apply `planning/architect-packs/architect-pack-036C-protected-production-preflight-and-live-trainer-acceptance.md`, verify exactly four generated files, then execute only from them. Never use retired legacy paths, `C:\tmp`, deployment directories or Sprint 035Q.

Read the agent identity, `AGENTS.md`, all four generated 036C files, current state/status/roadmap/briefing, Sprint 036B/036/035K requirements/acceptance/reviews, the 035K core and tests, `planning/reviews/035F-resend-hosted-integration-preflight.md`, Auth/runbook/operations docs, workflow profile and design/messaging authority.

The task contract is:

**objective:** Establish stable, repeatable live Production trainer access after an identity-blind protected preflight.

**owns:** Three new 036C operations files/tests; exact Management API GET projection; exact-ID retained-pilot Verify; unchanged application proof; exact Vercel/five-alias evidence; one fresh staged candidate; five candidate alias assignments; route smoke; two human sign-ins; rollback; proportional closeout; scoped branch commit/push.

**must_not:** Open/navigate/scrape Authentication users; call a user-list endpoint; enumerate identities; emit raw provider output; create/rotate/store credentials; change existing application/runtime/package/helper files or any provider/Auth setting, callback, SMTP/template, schema/RLS/permission, identity/fixture/data/Storage, DNS or Vercel setting; reuse the old candidate; move unlisted aliases; inspect a mailbox; activate A/B/C; implement 029N; merge/PR/push `develop`/force-push; claim broad rollout/Done.

**acceptance:** Protected output is allowlisted and exact provider/pilot facts pass; fresh exact candidate is Ready and post-stage aliases remain five/five rollback; stepwise transition reaches five/five candidate; safety passes; retained trainer completes both fresh sign-ins and the governed journey; final invariants pass; rollback remains exact/Ready.

**verification:** Use these exact or execution-time equivalent commands and retain sanitized results:

`git worktree list --porcelain`

`git status --short --branch`

`git rev-parse HEAD`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036C-protected-production-preflight-and-live-trainer-acceptance.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036C-protected-production-preflight-and-live-trainer-acceptance.md`

`node scripts/test-protected-production-preflight-036C.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedProductionPreflight036C.ps1 -Operation SelfTest`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedProductionPreflight036C.ps1 -Operation ProviderConfig`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedProductionPreflight036C.ps1 -Operation RetainedPilotVerify`

`git diff --name-status 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

`git diff --name-status c7d2a298218d6dc36871732054886145c449f7db HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json`

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

`vercel.cmd --version`

`vercel.cmd deploy --help`

`vercel.cmd alias --help`

`vercel.cmd inspect --help`

`git diff --check`

`git status --short`

Implement only `scripts/protected-production-preflight-036C-core.mjs`, `scripts/Invoke-ProtectedProductionPreflight036C.ps1` and `scripts/test-protected-production-preflight-036C.mjs`. The core's sole live provider request is GET `https://api.supabase.com/v1/projects/uvskssaecdhxcgytkasc/config/auth`. Reconcile current official OpenAPI first. Keep the complete response and credential in child memory, emit only the exact projection in requirements and fixed sanitized errors, and clear references/environment state. No arbitrary URL/method, raw JSON, response header, user endpoint, user list, Dashboard Auth surface or identity enumeration is allowed.

The wrapper allows `SelfTest`, `ProviderConfig` and `RetainedPilotVerify` only. Protected operations require private interactive ConsoleHost, no redirection/transcription and `Read-Host -AsSecureString`. Use separate child-only environments for an existing Management credential and the service role, then clear/zero/dispose them. Do not create or rotate credentials. Reuse unchanged `live-trainer-access-035K-core.mjs --verify`; prove it remains exact-ID/`getUserById`, no-`listUsers`, hidden-input, eight-row and sanitized-output.

Tests must inject fake provider responses and cover every fact/failure listed in acceptance plus secret/private canaries. The test must fail if any raw/canary value escapes, output keys drift, a non-GET/arbitrary target exists, or user enumeration text/path appears.

Run protected operations only after deterministic tests. The human enters protected values privately; never request them in chat. Accept provider pass only for exact target, Site URL, one exact callback/no wildcard, Resend/exact sender, one token/no ConfirmationURL/link, 6/3600/60, no enumeration/mutation/output. Accept retained-pilot only for verified 8/1/0/0. Any protected output, access absence or mismatch closes cleanly before deployment.

After the protected gate, prove application bytes unchanged, validation green, exact Vercel project/affected set and `baseline` five/five Ready rollback. Commit/push only scoped 036C planning/evidence/tooling and prove exact direct-remote equality.

Deploy one fresh candidate with `vercel.cmd deploy --prod --skip-domain --yes` plus current help-required exact source/branch metadata. Do not reuse `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`. Inspect the immutable candidate; require exact project/Production/source/Ready. Build `post-stage` by independently resolving all five aliases; require five/five rollback.

Promote with explicit `vercel.cmd alias set <fresh-candidate-automatic-url> <alias>` in this order:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

After every assignment reread all five. Deployment-level alias inventory is corroborating only. Any error/unexpected movement/state enters all-five rollback.

When `candidate-live` is five/five candidate, pass cache-busted public/protected/API safety before authentication. The tester privately requests and enters a current six-digit code, reaches `/portal`, completes the retained synthetic dashboard/workspace/action and safe denial, signs out, then after cooldown repeats with a fresh browser/application session and fresh current code. Builder never inspects mailbox or receives protected values.

Rerun retained-pilot Verify, final provider projection when safely available, `final-accepted` and route safety. A documented equivalent final provider proof is allowed only after exact pre-stage proof, successful live sign-ins and zero provider mutation; never substitute for a mismatch/privacy failure.

Rollback assigns all five to `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` in order: apex, `www`, project alias, team project alias, legacy team-qualified alias. Assign every row and reread all five after each. Final recovery requires five/five Ready rollback plus route safety. If it cannot be proven, stop with exact manual intervention.

Close `production-trainer-access-stable-live-accepted-clean` only when both fresh Production sign-ins and all final invariants pass. Reconcile mutations, tests, protected boundary, repository and remote; refresh proportional current records; intentionally commit/push only the 036C branch; stop. Do not begin Sprint 029N.
