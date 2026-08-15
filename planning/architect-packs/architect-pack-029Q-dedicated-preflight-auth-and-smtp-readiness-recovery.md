============================================================
FILE: planning/sprints/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery/requirements.md
============================================================

# Sprint 029Q - Dedicated Preflight Authentication and SMTP Readiness Recovery

## Outcome

Establish one expiring, SMTP-preflight-only authentication path independent of shared `CRON_SECRET`, then create one least-privilege enquiry-only Resend credential and prove one new unaliased Production-targeted candidate ready through an authenticated no-send check.

Target outcome: `dedicated-preflight-auth-and-smtp-readiness-recovered-unaliased-clean`.

Safe fallback: `dedicated-preflight-auth-and-smtp-readiness-recovery-blocked-clean` after exact compensation of every newly created 029Q credential/configuration resource that is safe to remove.

Public enquiry remains unavailable. All five public aliases remain on accepted Sprint 036L. Sprint 029P stays closed and is not retried.

## Workflow profile and flight class

Use `strict`. Flight class is `critical` because this sprint changes an authentication boundary, creates provider credentials, writes encrypted Production configuration, creates a Production-targeted deployment and performs compensating external deletion. A fresh Architect must pass the exact Builder plan before implementation, and a different fresh inspector must judge the implementation and real evidence before closeout.

## Canonical starting authority

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` from exact Git HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9` on branch `codex/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery`. Before Pack application or any write, resolve the current directory and `git rev-parse --show-toplevel`; both must normalize to the canonical path.

Preserve the inherited uncommitted 029P implementation, tests, planning closeout and method/template work. Classify it explicitly and do not overwrite, revert, stage, commit or publish it. The Architect's 029Q roadmap, Pack and STATUS changes are sprint-owned. Do not use a legacy repository, temporary checkout, alternate history or worktree.

The Pack must dry-run to exactly four traversal-free destinations inside `planning/sprints/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery/`, then apply and reread all four files. The applied files become Builder authority.

No commit or push is in scope. Git status, exact diff, file hashes, branch identity and deployment/runtime evidence must provide truthful source proof without inventing remote equality.

## Current verified truth

- Sprint 029P closed `resend-smtp-readiness-recovery-blocked-clean` after 72/72 new plus 416/416 retained assertions, for 488/488 passing, with zero external mutation.
- `lib/enquiries/env.ts` now reads only `PUBLIC_ENQUIRY_SMTP_HOST`, `PUBLIC_ENQUIRY_SMTP_PORT`, `PUBLIC_ENQUIRY_SMTP_USER` and `PUBLIC_ENQUIRY_SMTP_PASS`; old generic-only transport is refused.
- The exact Vercel project has zero dedicated SMTP bindings and zero preflight-auth bindings. Its shared `CRON_SECRET` is Sensitive/non-readable and must not be recovered, rotated, copied, compared or replaced by inference.
- The exact Production project retains the required sender, recipient, abuse, shared internal-auth and Supabase bindings. Adding the four dedicated SMTP bindings completes the existing eleven-name runtime contract without exposing any retained value.
- Resend is the selected provider. Same-day signed-in evidence records verified domain `precisionperformance.com.au`, exactly two masked pre-existing sending-access keys and no raw key material.
- All five aliases remain on accepted Ready Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`; 029N and 029O candidates remain unaliased and must not be invoked.
- Windows Credential Manager has an existing project-proven encrypted round-trip helper pattern. Sprint 029Q must use a new fixed target and never reuse a 035I target.
- Provider owner scope permits the exact least-privilege Resend/Vercel actions in this sprint through signed-in/provider access. No password, token or secret value may be requested through chat.

## Task contract

**objective:** Replace the non-readable shared-auth dependency with one bounded SMTP-preflight-only credential and use it to prove one new unaliased Resend-ready candidate, while leaving public traffic, shared authentication, data, migration 0023, existing provider keys and existing generic SMTP bindings unchanged.

**owns:** The narrow internal enquiry authentication decision; a server-only expiring verifier; one fixed-target Windows Credential Manager/process-only controller; the minimum deterministic tests, readiness harness, package registrations and operations document; one exact Resend `sending access` key restricted to verified `precisionperformance.com.au`; four Production-only dedicated SMTP bindings; three temporary Production-only verifier-window bindings; one Production-targeted `--skip-domain` candidate; exactly one successful authenticated no-send preflight; one post-expiry rejection proof; exact cleanup/compensation; critical reviews; proportional closeout.

**must_not:** Read, display, export, log, persist in plaintext, commit, place in arguments, clipboard-inspect or manually re-enter any API key, SMTP password, temporary bearer, sender/recipient address, existing environment value, token, cookie or protected response; change or use shared `CRON_SECRET`; let the temporary bearer authorize any action other than `smtp-preflight`; create a full-access/all-domain Resend key; edit or delete either existing Resend key; edit, replace or delete existing generic SMTP bindings; retry 029N/029O; invoke `/api/enquiries`; send email; inspect email logs or a mailbox; create/mutate enquiry or bucket data; edit/apply/revert migration 0023; change Supabase; create more than one deployment; move an alias; touch Auth, trainer fixtures, 036K, DNS, commerce or unrelated Product behaviour; commit, push, merge, PR, force-push or rewrite history.

**acceptance:** A random bearer of at least 256 bits is generated without human input, held only in Windows Credential Manager and process memory, represented in the candidate only by a SHA-256 verifier plus a maximum fifteen-minute not-before/expiry window, and accepted only for exact `smtp-preflight`. Wrong, malformed, long-window, out-of-window and other-action cases fail closed with sanitized denial; ordinary internal actions retain unchanged shared-secret behaviour. One new domain-restricted Resend sending key transfers directly into a Sensitive Production-only Vercel binding without entering agent-visible output, shell arguments, files or manual input. Four dedicated SMTP bindings and three temporary verifier-window bindings feed one exact Ready zero-alias candidate. One authenticated no-send preflight returns finite Resend `ready`; after expiry the same bearer is denied before handler execution; all three temporary provider bindings and the local credential are then removed. No public request, email, data, migration or alias effect occurs.

**verification:** A001-A030; canonical/Pack/branch/diff gates; exact no-edit Builder plan; fresh critical plan review; observed 488/488 baseline; focused discriminating auth/controller/environment/harness tests and retained 029O/029P suites; TypeScript, zero-warning lint, Production build and privacy/secret/static/scope scans; Windows Credential Manager self-test with fixed sanitized output; Resend domain/key metadata counts without values; Vercel exact project/name/type/target metadata without values; one exact candidate/zero-alias proof; one finite no-send result; one expired denial; zero public-enquiry requests; temporary-resource cleanup; independent five-alias readback; distinct fresh inspection; final disk/Git/provider/Vercel/live-routing readback.

## Dedicated temporary preflight authentication

Add exactly three server-only configuration names:

- `PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256`
- `PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE`
- `PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT`

The raw bearer is generated from at least 32 cryptographically random bytes. It is stored at one fixed new Windows Credential Manager target and exposed only transiently inside the controller process. No raw bearer enters a file, command argument, transcript, chat, environment dump, browser, clipboard or durable evidence.

The candidate receives only the lowercase 64-hex SHA-256 verifier and the two UTC timestamps. The server must require a structurally valid verifier, a valid not-before/expiry ordering, a total window no greater than fifteen minutes, current time inside that window, a bearer of at least 32 characters, constant-time hash equality and exact `smtp-preflight` action. The controller must bind creation to one run, refuse an existing target or pre-existing remote name, and emit only finite state/count/time-class metadata.

The dedicated bearer does not replace `CRON_SECRET`. Existing internal actions and existing shared-secret behaviour stay unchanged. A dedicated bearer used with `maintain`, `schema-status`, `status`, `purge-fixture`, `rate-limit-proof`, `retention-proof` or any unknown action must receive the same sanitized denial as an absent/wrong credential and must not invoke a handler. Malformed or unauthorized requests must not gain more diagnostic detail through the new path.

After the one successful preflight, retain the bearer only until the configured expiry. Prove a same-bearer request after expiry is denied before `runSmtpPreflight`, then delete all three exact project verifier-window bindings and the fixed local credential. The deployed candidate may retain only the expired verifier snapshot; final proof must establish that its configured window is past and unusable.

## Protected Resend-to-Vercel workflow

Freshly reread signed-in Resend domain and key metadata without exposing account identity, addresses, names, tokens or fragments. Require exact verified-domain presence, exactly two pre-existing masked sending-access keys before creation and no raw key visible.

Create exactly one key named `Precision Performance public enquiry 029Q`, permission `sending access`, restricted to `precisionperformance.com.au`. Do not create a full-access or all-domain key. Record only a safe opaque provider ID if the provider exposes one without token material.

Before creation, prevalidate exact Resend create/Copy/dismiss controls and the prepared exact-project Vercel Sensitive Production-only blank-branch pass field/save/navigation controls. While the one-time token is displayed, no DOM/accessibility/screenshot/console/page-state/clipboard/tool-output observation may occur. Blind Copy, direct paste, save/accept, dismissal/navigation and clipboard clearing complete before metadata-only inspection resumes. A protected equivalent process-only path is acceptable only if it supplies equal or stronger non-output, non-file, non-argument and cleanup guarantees.

Create exactly four Production-only blank-branch bindings: `PUBLIC_ENQUIRY_SMTP_HOST`, `PUBLIC_ENQUIRY_SMTP_PORT`, `PUBLIC_ENQUIRY_SMTP_USER`, `PUBLIC_ENQUIRY_SMTP_PASS`. Pass must be Sensitive. Public structural values are Resend authority: `smtp.resend.com`, `465`, `resend`. Existing generic SMTP rows and their target sets remain unchanged.

If no safe token-transfer mechanism is available, stop before key creation under the five-part manual-intervention record. Never ask the user to send or type a secret through chat.

## Candidate and no-send proof

Pass focused/retained local gates and the metadata-only protected-content wrapper before external mutation. Only scanner-clean files may have content-emitting diffs inspected or enter the candidate manifest.

Provision the three temporary verifier-window bindings through stdin/process APIs, never value arguments. Create exactly one new Production-targeted Vercel deployment with automatic domain assignment disabled. It must be exact project, exact 029Q branch/workspace source, Ready and zero aliases. No second deployment is in scope.

Run immutable public/privacy/protected/API/disabled-commerce checks that store no data. Invoke exactly one successfully authenticated internal `smtp-preflight` against the new candidate. Require `result=smtp-preflight`, `status=ready`, `providerClass=resend`, `errorClass=null`, with no protected detail. After expiry, perform exactly one denial proof using the same bearer; require sanitized HTTP 404 and proof that `runSmtpPreflight` was not invoked.

Do not call `/api/enquiries`, run a delivery harness, create a fixture or send email. Candidate/provider evidence must show zero public-enquiry requests and zero delivery activity. Independently prove all five aliases remain on accepted 036L and both prior candidates remain unaliased.

## Compensation and ceilings

If local/code/privacy gates fail, create no provider key, Vercel binding or deployment.

If configuration fails before deployment, remove only exact newly created 029Q resources after ownership proof. Existing resources remain untouched.

If the one candidate or one successful preflight is non-target, do not retry. Keep every alias on 036L. Remove the exact new four SMTP bindings, three verifier-window bindings, fixed local credential and exact new Resend key if each cleanup can be proven safe and complete. An unaliased candidate may remain inert evidence. If cleanup cannot be proven, stop at the material cleanup boundary and do not claim a clean fallback.

On target success, retain the exact new Resend key, four SMTP bindings and unaliased candidate for later 029R planning. Remove the three verifier-window project bindings and local credential after expiry denial. Existing keys/generic bindings remain untouched. Public enquiry remains unavailable.

## Approved implementation and closeout files

The Builder plan must reduce this candidate set to the exact files needed:

- `lib/enquiries/preflight-auth.ts` as the preferred isolated server-only verifier; a smaller exact alternative may be proposed in the plan
- `app/api/internal/enquiries/route.ts`
- `scripts/PreflightAuth029Q.ps1`
- `scripts/autonomous-public-enquiry-029Q.mjs`
- the narrowest new 029Q deterministic controller/auth/harness tests under `scripts/`
- `package.json` only for exact script registration; no dependency change
- `docs/PUBLIC_ENQUIRY_PREFLIGHT_AUTH_AND_SMTP_READINESS_029Q.md`
- the four applied 029Q sprint files for accepted within-intent Pack corrections and closeout
- standard directly affected closeout records: `planning/STATUS.json`, `planning/STATE.md`, `planning/ROADMAP.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

`lib/enquiries/env.ts`, provider delivery code and existing 029P tests/harness should remain unchanged unless the exact Builder plan demonstrates a required within-intent correction. No migration, public route/form, database, Auth, trainer-access, alias-controller, generic environment, commerce or 036K file may change. A material scope change returns `ask`.

## Metadata-only protected-content scanning

All credential/token/address/protected-response scans emit only a fixed scan name, exit status, aggregate count and file names when containment requires them. Never emit matching lines, context, substrings, captures, fragments or diff hunks. Synthetic `.invalid`, public structural constants and deterministic opaque fixtures use a separate explicit allowlist.

Run the scanner before every content-emitting diff or file-content inspection of sprint-owned/candidate files. Only scanner-clean files proceed. After any local mutation following provider/Vercel/deployment action, rescan before later content inspection. An unexpected positive enters no-output containment immediately: identify only the affected filename, perform no ordinary diff/content command for it, and choose an exact safe rebuild or material protected-data stop.

## Evidence-proportional execution and manual intervention

Stop only for a material wrong target, authority gap, secret/privacy exposure, destructive uncertainty, unauthorized scope expansion, provider/configuration partial state, failed integrity/security behaviour, Production impact or cleanup that cannot be proven safe. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep deterministic test, browser bridge, credential controller, validator, reporter, formatting and encoding corrections inside 029Q when product scope is unchanged. Do not create another sprint solely because browser automation, clipboard control, a renderer, optional CLI path or redundant proof is unavailable.

Manual intervention is last. If it becomes necessary, record what is blocked, evidence checked, the exact user action, step-by-step instructions and what Builder will verify afterward. Never request a secret through chat or arguments.

============================================================
FILE: planning/sprints/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery/blueprint.md
============================================================

# Sprint 029Q Blueprint

## Execution sequence

1. Prove canonical CWD/Git top-level, exact start HEAD, exact 029Q branch and inherited 029P/method dirt. Dry-run, apply and reread exactly four Pack destinations.
2. Builder reads the applied sprint, 029P closeout, internal enquiry route, server/environment/provider paths, 029P tests/harness, Credential Manager precedent, current Vercel metadata and accepted routing truth. Return one exact no-edit critical plan with task contract, files, guards, A001-A030, commands, baseline/target arithmetic, closeout, `Pack corrections` and blockers.
3. A genuinely fresh Architect reviews that exact plan under the three-decision critical budget. Implementation starts only after `pass`.
4. Observe the 488/488 029P/retained baseline. Add red-first discriminating tests for in-window success, wrong bearer, malformed verifier/window, window longer than fifteen minutes, before-not-before, after-expiry, exact-action restriction, existing shared-auth preservation and sanitized denial.
5. Implement the narrow server-only verifier and route decision. Keep all non-`smtp-preflight` actions on the unchanged shared path. Add the fixed-target Credential Manager/process controller, sanitized readiness harness, tests, package registrations and operations document.
6. Run focused and retained suites, exact arithmetic, PowerShell parser/self-test, TypeScript, zero-warning lint, Production build and mapped static/privacy/encoding/scope gates. Run metadata-only protected-content scanning before content diffs; inspect only scanner-clean files and capture an exact candidate manifest.
7. Perform fresh read-only provider preflight: exact Resend verified domain and two masked baseline keys; exact Vercel project with zero dedicated SMTP and zero preflight-auth names; unchanged generic rows; five aliases on 036L; prior candidates unaliased.
8. Prevalidate the no-token Resend-to-Vercel blind transfer. Create exactly one domain-restricted sending key, complete the non-observation Copy/paste/save/dismiss/clear sequence, then create/read back the four exact SMTP binding names/types/targets without values.
9. Run the Credential Manager controller: prove target absence, generate at least 256 random bits, store the raw bearer under the exact 029Q target, derive its SHA-256 verifier in process, and add the exact hash/not-before/expiry rows through stdin with a total window at most fifteen minutes. Emit no bearer or fragment.
10. Create exactly one Production-targeted `--skip-domain` candidate from the canonical 029Q workspace. Require exact project/source, Ready and zero aliases.
11. Run immutable non-storing checks, then exactly one successful authenticated `smtp-preflight`. Require finite Resend `ready`.
12. Keep the raw bearer only in Credential Manager until expiry. After expiry, issue one same-bearer request and require sanitized 404 before handler invocation. Delete the three exact project verifier-window rows and fixed local credential, then prove both absences.
13. Prove zero `/api/enquiries`, zero email/submission/data activity, four retained dedicated SMTP rows, unchanged two pre-existing Resend keys plus the one exact new key, all five aliases on 036L and prior candidates unaliased.
14. On non-target, execute exact compensation with no retry. On target, retain only the new SMTP readiness resources and unaliased candidate; public enquiry stays unavailable.
15. A fresh inspector distinct from Builder and plan reviewer judges every criterion, implementation diff, real local/provider/Vercel/deployment evidence and complete closeout plan under the three-decision budget.
16. After inspection `pass`, update proportional durable truth, mark 029Q ready or truthful fallback, leave 029R conditional and set STATUS `sprint-closed`. Rescan before final disk/Git content reread, then reread provider/Vercel/candidate/log/live-routing truth. Do not commit or push.

## Architecture trace

```text
Temporary preflight authentication
  -> cryptographic random bearer generated without human input
  -> fixed Sprint 029Q Windows Credential Manager target (raw bearer)
  -> transient process memory
  -> SHA-256 only
  -> exact Vercel project verifier + not-before + expiry bindings
  -> one Production-targeted zero-alias candidate snapshot
  -> POST /api/internal/enquiries action=smtp-preflight only
  -> bounded-window constant-time verification
  -> existing runSmtpPreflight -> Nodemailer verify(), no email
  -> expiry denial before handler
  -> remove three project bindings and local credential

SMTP readiness
  -> verified Resend domain
  -> one new domain-restricted sending key
  -> blind direct transfer to Sensitive PUBLIC_ENQUIRY_SMTP_PASS
  -> four dedicated Production SMTP bindings
  -> candidate verify() ready

Accepted live path remains separate
  -> five aliases -> accepted Sprint 036L
  -> no enquiry route, message, database write or alias transition
```

`CRON_SECRET` remains the source for ordinary internal maintenance authentication and is neither read nor changed. Windows Credential Manager is the encrypted raw-bearer store. Vercel holds only the hash and bounded timestamps for the temporary path. Resend and four retained Vercel SMTP rows are the readiness source; candidate no-send proof is the sink.

## Flight evidence

1. **Class and reason:** `critical`; authentication, provider credential creation, protected token transport, encrypted Production configuration, external deployment and compensating deletion are in scope.
2. **Acceptance invariant at risk:** no raw secret becomes agent-visible or durable outside provider/OS secure stores; the temporary bearer authorizes only one action and becomes unusable after at most fifteen minutes; ordinary shared authentication remains unchanged; one unaliased candidate authenticates to Resend without sending; no public/data/alias effect occurs.
3. **Affected layers and verified paths/symbols:** Windows Credential Manager; new fixed controller; Vercel environment control plane; new `lib/enquiries/preflight-auth.ts`; `app/api/internal/enquiries/route.ts`; existing `internalRequestIsAuthorized`, `runSmtpPreflight`, `verifySmtpTransport`; Resend Domains/API Keys; 029Q harness/tests; one candidate; five public aliases.
4. **Source, transformations and sink:** random bytes become a local bearer; only its SHA-256 verifier and bounded window reach the candidate; exact action/body and constant-time checks gate `runSmtpPreflight`; the raw bearer is used once successfully and once after expiry for rejection, then destroyed. Separately, a domain-restricted Resend key transfers directly to the Sensitive SMTP pass binding and drives `verify()` without send.
5. **Discriminating examples:** the same bearer/hash succeeds at `notBefore + 1 minute` and fails at `expiresAt + 1 second`; a seventeen-minute configured window fails even while current time lies inside it; a valid dedicated bearer with `maintain` fails while the unchanged correct shared bearer retains its existing result; a wrong hash fails; old-generic-only SMTP remains unavailable while complete dedicated SMTP is available.
6. **Durable verification source:** canonical HEAD/branch and dirty classification; applied four-file 029Q sprint; exact scanner-clean diff and SHA-256 manifest; counted tests/build; fixed sanitized controller results; Resend domain/key counts; Vercel name/type/target metadata; one deployment ID/origin/zero-alias projection; one finite ready result; one expired 404; temporary-resource absence; request counts; five-alias reread.
7. **Known uncertainty:** browser UI may be the only Resend key-creation surface; protected transfer must be prevalidated before creation. `verify()` cannot prove sender acceptance or delivery. Existing keys and generic bindings cannot be changed by inference. No Git publication is in scope. Later delivery/activation remains 029R.

## Failure and compensation matrix

| Boundary | Required result | Non-target handling |
| --- | --- | --- |
| Canonical/Pack | Exact workspace/start/branch/four destinations | Stop before implementation |
| Plan review | Fresh `pass` within three decisions | Correct within Pack intent or ask |
| Local authentication | All discriminating cases, shared-path preservation and fixed sanitized output pass | Correct in 029Q; no external action |
| Provider preflight | Verified domain, exact masked baseline, exact project and absent new names | Stop before creation |
| Resend key/SMTP transfer | One restricted key and four exact rows, no token observation | Remove exact new resources if safe; stop |
| Temporary auth provisioning | One absent fixed target, random bearer, hash-only candidate config, <=15-minute window | Remove exact new rows/credential; stop |
| Candidate | One exact Ready zero-alias deployment | No second deployment; compensate new resources |
| SMTP verify | One finite Resend `ready` | No retry; compensate; aliases remain 036L |
| Expiry/cleanup | Same bearer denied after expiry; three remote rows and local target absent | Stop at cleanup boundary; do not claim clean |
| Side effects | Zero send/submission/data/alias activity | Stop and contain unexpected effect |
| Inspection | Distinct fresh `pass` | Replan under critical limits |
| Closeout | Scanner-clean disk/Git plus provider/Vercel/candidate/log/live truth aligned | Do not claim landing if inconsistent |

## Evidence arithmetic

The Builder must observe the exact 488/488 retained baseline before edits, then publish target arithmetic from all new 029Q assertions. New auth/controller/expiry cases add to rather than replace retained coverage. Report focused, retained and full Product gates separately; never hide a failed group inside an aggregate.

============================================================
FILE: planning/sprints/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery/acceptance.md
============================================================

# Sprint 029Q Acceptance

- [ ] A001 Canonical CWD/Git top-level equal the permanent repository, exact starting HEAD is `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, branch is exact 029Q and inherited 029P/method dirt is classified and preserved.
- [ ] A002 The one Pack dry-runs/applies/rereads exactly four traversal-free 029Q files; applied files are Builder authority.
- [ ] A003 Builder returns the complete no-edit critical plan with exact files, task contract, guards, A001-A030, commands, observed baseline/target arithmetic, closeout, Pack corrections and blockers.
- [ ] A004 A genuinely fresh Architect returns `pass` on the exact plan within the three-decision budget; stable findings are recorded and resolved before implementation.
- [ ] A005 Migration 0023, public route/form, database, provider delivery behaviour, generic SMTP bindings, shared `CRON_SECRET`, Auth, trainer, commerce and unrelated Product source remain unchanged.
- [ ] A006 The dedicated verifier accepts only a bearer whose SHA-256 matches the configured lowercase 64-hex verifier while current time is inside a valid ordered window no longer than fifteen minutes.
- [ ] A007 The dedicated bearer authorizes only exact `smtp-preflight`; every other current/unknown action is denied without handler invocation, while existing correct shared-secret behaviour remains unchanged.
- [ ] A008 Absent, wrong, short or malformed bearer; malformed verifier/timestamps; before-window, after-window and overlong-window cases fail closed with sanitized denial and no protected detail.
- [ ] A009 Discriminating tests prove in-window success versus same-bearer post-expiry failure and exact-action restriction; plausible non-expiring, long-lived or general-maintenance implementations go red.
- [ ] A010 The fixed 029Q Windows Credential Manager controller proves target absence, a synthetic encrypted round trip and exact delete without exposing content or reusing a prior sprint target.
- [ ] A011 The live bearer uses at least 256 cryptographic random bits, is generated without human input, exists only in the fixed credential target/process memory, never enters files/env dumps/arguments/chat/clipboard/output and is zeroed or released after each process use.
- [ ] A012 Current 029P/retained baseline is observed at 488/488 before edits; exact new 029Q target arithmetic passes without replacing retained coverage.
- [ ] A013 PowerShell parse/self-test, TypeScript, zero-warning lint, Production build and mapped static/privacy/secret/log/encoding/scope checks pass. Protected scans are metadata-only and precede every content-emitting diff/file inspection.
- [ ] A014 Fresh provider preflight proves exact Resend signed-in context, verified `precisionperformance.com.au`, exactly two pre-existing masked sending-access keys, exact Vercel project, zero dedicated SMTP/preflight-auth rows, unchanged generic rows and no raw value exposure.
- [ ] A015 Exactly one Resend key named `Precision Performance public enquiry 029Q` is created with `sending access` restricted to `precisionperformance.com.au`; both pre-existing keys remain unchanged.
- [ ] A016 Before key creation the blind Copy/paste/save/dismiss/clear path is prevalidated. While the token is displayed no DOM/accessibility/screenshot/console/page-state/clipboard/tool observation occurs; the token transfers directly into the prepared Vercel Sensitive pass field and never enters agent-visible or durable plaintext.
- [ ] A017 Exactly four new Production-only blank-branch dedicated SMTP bindings exist; pass is Sensitive, public structural values match Resend authority and existing generic binding names/types/targets remain unchanged.
- [ ] A018 Exactly three temporary Production-only blank-branch verifier-window bindings are created through stdin/process APIs; candidate configuration contains only the hash and timestamps, never the raw bearer, and the window is at most fifteen minutes.
- [ ] A019 Exactly one new Production-targeted deployment is created with automatic domain assignment disabled; it is exact project/029Q source, Ready and zero aliases. No second deployment exists.
- [ ] A020 Immutable candidate public/privacy/protected/API/disabled-commerce checks pass without storing data or calling the public enquiry submission route.
- [ ] A021 Exactly one successfully authenticated candidate `smtp-preflight` returns `result=smtp-preflight`, `status=ready`, `providerClass=resend`, `errorClass=null`, with no protected detail.
- [ ] A022 After configured expiry, exactly one same-bearer request returns sanitized HTTP 404 before `runSmtpPreflight`; no second no-send verification occurs.
- [ ] A023 After A022, all three temporary project bindings and the fixed local credential are deleted and proven absent; the retained candidate snapshot contains only an expired unusable verifier/window.
- [ ] A024 Candidate/provider evidence proves zero `/api/enquiries`, zero email, zero notification attempt, zero mailbox/log inspection and zero enquiry/bucket/Supabase mutation; migration 0023 remains unchanged.
- [ ] A025 Independent readback proves all five public aliases remain on accepted 036L and both 029N/029O candidates remain unaliased; no alias command occurs.
- [ ] A026 On any non-target key/config/candidate/preflight result, no retry occurs and only exact newly created 029Q resources are compensated; clean fallback is claimed only when cleanup is proven complete.
- [ ] A027 A fresh inspector distinct from Builder and plan reviewer returns `pass` within the three-decision budget after judging every criterion, full diff, real evidence and closeout plan.
- [ ] A028 Durable closeout records critical Flight evidence, decision counts/findings/substitutions/residuals, truthful target/fallback, refreshed briefing live fields, 029R conditional state and STATUS `sprint-closed`.
- [ ] A029 Final ordered metadata-only scan, disk/Git/provider/Vercel/candidate/log/five-alias reread proves no secret/address/protected response or unexpected residue is recorded and the final diff remains in scope.
- [ ] A030 No commit, push, merge, PR, force-push or history rewrite occurs.

The full target proves only dedicated-authenticated no-send transport readiness. It does not prove sender acceptance, delivery, inbox receipt, enquiry behaviour or public activation.

============================================================
FILE: planning/sprints/029Q-dedicated-preflight-auth-and-smtp-readiness-recovery/handoff-prompt.md
============================================================

# Sprint 029Q Builder Handoff

You are Builder for critical Sprint 029Q in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

First prove canonical CWD/Git top-level, exact HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, exact 029Q branch and the inherited 029P/method dirty classification. Dry-run and apply the one 029Q Pack, verify exactly four traversal-free destinations, and reread every applied file. They are your authority.

Do not edit implementation yet. Read the 029P closeout, internal enquiry route, server/environment/provider paths, 029P tests/harness, Credential Manager precedent, exact Vercel metadata and live-routing truth. Return one exact plan containing the task contract, implementation file list, scope guards, A001-A030, verification commands, observed baseline and target arithmetic, standard closeout files/actions, a named `Pack corrections` section (`None` is valid), and any blocking ambiguity. A fresh Architect must pass that exact plan before implementation.

## Task contract

**objective:** Establish one expiring SMTP-preflight-only credential independent of shared `CRON_SECRET`, then use one least-privilege Resend transport to prove one new unaliased no-send-ready candidate with zero public, email, data, migration or alias effect.

**owns:** Narrow dedicated verifier/route decision; fixed-target Windows Credential Manager/process controller; focused tests/harness/docs/package registration; one exact domain-restricted Resend sending key; blind direct secret transfer; four retained dedicated SMTP rows; three temporary verifier-window rows; one `--skip-domain` candidate; one successful no-send preflight; one expired denial; exact cleanup/compensation; critical reviews and closeout.

**must_not:** Expose, print, inspect or manually handle secrets/addresses; change or use shared `CRON_SECRET`; give the dedicated bearer any action beyond `smtp-preflight`; change existing keys or generic SMTP rows; retry prior candidates; send or submit; mutate Supabase/data/migrations; create a second deployment; move aliases; touch 036K/unrelated Product; commit/push/merge/PR/rewrite history.

**acceptance:** A001-A030 in `acceptance.md`, including random encrypted/process-only bearer handling, hash-only <=15-minute candidate configuration, exact-action restriction, shared-path preservation, one restricted key, blind transfer, four dedicated SMTP rows, three temporary auth rows, one Ready zero-alias candidate, one finite ready result, one post-expiry 404 before handler, exact temporary cleanup and zero public/data/alias effect.

**verification:** Observed 488/488 baseline plus exact new arithmetic; PowerShell parse/self-test; focused/retained suites; TypeScript/lint/build/static/encoding; metadata-only scans before content inspection; scanner-clean diff/manifest; sanitized Resend/Vercel metadata; one candidate/zero aliases; one no-send result; expired refusal; three-row/local-credential cleanup; zero submission/provider-delivery activity; five aliases on 036L; fresh inspection; durable closeout/final reread.

Apply the Evidence-Proportional Execution Standard. Stop only for a material target, authority, secret/privacy, destructive, provider/configuration partial-state, integrity/security, Production, scope or cleanup risk. Use equivalent or stronger safe proof when a supporting tool is unavailable. Keep deterministic auth/controller/browser bridge/test/validator/reporter corrections inside 029Q when outcome scope is unchanged. Prevalidate secret transfer before key creation. Run metadata-only scans before content-emitting diffs or file inspection and after post-external local mutation. Manual intervention is last; never ask for a secret in chat or arguments.
