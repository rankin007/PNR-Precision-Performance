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
