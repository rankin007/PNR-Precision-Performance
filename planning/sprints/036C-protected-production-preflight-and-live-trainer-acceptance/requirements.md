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
