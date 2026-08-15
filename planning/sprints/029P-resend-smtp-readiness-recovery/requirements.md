# Sprint 029P - Resend SMTP Readiness Recovery

## Outcome

Establish one dedicated enquiry-only Resend SMTP credential and prove one new, unaliased Production-targeted candidate ready through an authenticated no-send check. Public enquiry remains unavailable and all five public aliases remain on accepted Sprint 036L.

Target outcome: `resend-smtp-readiness-recovered-unaliased-clean`.

Safe fallback: `resend-smtp-readiness-recovery-blocked-clean` after exact compensation of every newly created 029P credential/configuration resource that is safe to remove.

Sprint 029O is closed. This sprint supplies fresh 029P authority only; it does not reopen, retry or continue 029O.

## Workflow profile and flight class

Use `strict`. Flight class is `critical` because the outcome creates a provider credential, transfers a protected value, writes encrypted Production configuration and creates one Production-targeted deployment. A fresh Architect must pass the exact Builder plan before implementation, and a different fresh inspector must judge the implementation and real evidence before closeout.

## Canonical starting authority

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` from exact Git HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`. Before Pack application or any write, resolve the current directory and `git rev-parse --show-toplevel`; both must normalize to that canonical path. Create or switch only to branch `codex/029P-resend-smtp-readiness-recovery` from that exact HEAD.

Preserve and exclude the inherited uncommitted method/template work under `.120x/`, `.agents/`, method templates and method-maintenance scripts. The Architect's 029P roadmap, Pack and STATUS changes are sprint-owned. Do not use a legacy repository, temporary checkout, alternate history or worktree.

The Pack must dry-run to exactly four traversal-free destinations inside `planning/sprints/029P-resend-smtp-readiness-recovery/`, then apply and reread all four files. The applied files become Builder authority.

No commit or push is authorized by this sprint. Git status, exact diff, file hashes, branch identity and deployment/runtime evidence must provide truthful source proof without inventing remote equality.

## Current verified truth

- Sprint 029O is closed `public-enquiry-corrected-inert-rolled-back-clean`; its one candidate and the 029N candidate are Ready but unaliased and must not be invoked for SMTP, submission or promotion.
- Migration 0023 and its database-owned cleanup job remain installed; the last accepted enquiry/bucket aggregate is `0/0`. No schema or data mutation belongs to 029P.
- All five public aliases remain on accepted Ready Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`.
- The account owner confirmed Resend as the SMTP provider and is signed into Resend and Vercel in Chrome.
- Read-only signed-in evidence shows exact Resend domain `precisionperformance.com.au` present and `verified`, two existing masked `sending access` keys, zero visible raw key material and no full-access key label.
- Read-only signed-in Vercel evidence shows exact project `rankin007s-projects/pnr-precision-performance`, the environment settings surface and all five existing generic `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `SMTP_FROM` names, with no raw Resend key visible.
- Vercel name/scope metadata shows the existing SMTP records are old shared Preview/Production configuration. Protected process-only CLI retrieval returned none of their values, so no plan may depend on recovering, copying, comparing or restoring an existing secret.
- Resend's authoritative SMTP shape is host `smtp.resend.com`, recommended implicit-TLS port `465`, username `resend` and an API key as password. `verify()` tests DNS, TCP, TLS and authentication without sending and does not prove sender acceptance.

## Task contract

**objective:** Create one dedicated, least-privilege Resend credential for public-enquiry SMTP and prove one new unaliased candidate returns sanitized `ready` from its authenticated no-send preflight, while leaving public traffic, data, migration 0023, existing provider keys and existing generic SMTP bindings unchanged.

**owns:** Canonical/branch/Pack proof; a narrow dedicated public-enquiry SMTP environment contract; the smallest enquiry environment/harness/test/documentation changes; the exact `.env.example` placeholder-only alignment stated in the approved file set below; one exact Resend `sending access` key restricted to verified `precisionperformance.com.au`; four new Production-only Vercel bindings `PUBLIC_ENQUIRY_SMTP_HOST`, `PUBLIC_ENQUIRY_SMTP_PORT`, `PUBLIC_ENQUIRY_SMTP_USER`, `PUBLIC_ENQUIRY_SMTP_PASS`; prevalidated blind browser-clipboard transfer; one Production-targeted `--skip-domain` candidate; exactly one authenticated candidate no-send preflight; exact compensation of newly created 029P resources on failure; critical reviews; proportional closeout.

**must_not:** Read, display, export, log, persist, commit, place in arguments or manually re-enter any API key, SMTP password, recipient/sender address, existing environment value, token, cookie or protected response; create a full-access Resend key; edit or delete either existing Resend key; edit, replace or delete existing generic SMTP bindings; retry either 029N or 029O candidate; invoke `/api/enquiries`; send email; inspect email logs or a mailbox; create or mutate an enquiry/bucket; edit/apply/revert migration 0023; change Supabase; create more than one deployment; move any alias; touch Auth, trainer fixtures, 036K, DNS, commerce or unrelated Product behavior; commit, push, merge, PR, force-push or rewrite history.

**acceptance:** Exact source/tests use only the dedicated four-name transport contract and make old-generic-only configuration unavailable. One new domain-restricted Resend sending key moves by copy/paste directly into a Sensitive Production-only Vercel binding without entering agent-visible output, shell arguments, files or manual input; public host/port/user bindings match Resend authority. One new exact-project Production-targeted candidate is Ready, zero aliases and returns only finite authenticated no-send `ready` evidence. No public request, email, enquiry/notification/bucket write or alias write occurs. Existing keys/bindings remain unchanged. On any non-ready or incomplete proof, the exact new key/bindings are removed where cleanup can be proven safe, and no second candidate or preflight is attempted.

**verification:** A001-A026; canonical/Pack/branch/diff gates; exact no-edit Builder plan; fresh critical plan review; focused discriminating environment and harness tests; retained 029O enquiry/migration/autonomous tests; TypeScript, zero-warning lint, Production build and privacy/secret/static/scope scans; Resend domain/key metadata counts without names or values; Vercel exact project/name/type/target metadata without values; one exact candidate/zero-alias proof; one authenticated no-send result; deployment logs proving zero `/api/enquiries`; independent five-alias readback on accepted 036L; exact resource compensation on failure; distinct fresh inspection; final disk/Git/provider/Vercel/live-routing readback.

## Dedicated environment contract

Change only the public-enquiry transport input boundary so it reads these four new names:

- `PUBLIC_ENQUIRY_SMTP_HOST`
- `PUBLIC_ENQUIRY_SMTP_PORT`
- `PUBLIC_ENQUIRY_SMTP_USER`
- `PUBLIC_ENQUIRY_SMTP_PASS`

The enquiry path must not fall back to generic `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` or `SMTP_PASS`. Keep the existing protected `SMTP_FROM` and `CONTACT_ENQUIRY_EMAIL` contracts unchanged; 029P does not send and does not claim sender acceptance. Existing Supabase, HMAC and internal-auth bindings remain unchanged.

Add discriminating tests: a complete dedicated Resend transport plus retained required bindings is structurally available; an otherwise complete old-generic-only transport is unavailable; a missing dedicated field is unavailable; prohibited public/browser exposure remains impossible. The plausible wrong fallback implementation must go red.

## Protected Resend-to-Vercel workflow

Freshly reread the signed-in Resend domain and key metadata without exposing account identity, addresses, names, tokens or key fragments. Require exact verified-domain presence, exactly the observed two pre-existing sending-access keys before creation and no raw key visible.

Create exactly one key named `Precision Performance public enquiry 029P`, permission `sending access`, restricted to `precisionperformance.com.au`. Do not create a full-access or all-domain key. Record only the new key's opaque provider ID if available through a safe metadata projection; never record its token or fragment.

Before key creation, establish and record an exact blind-transfer protocol while no token exists. Prevalidate the exact Resend key-creation controls and the post-create Copy/dismiss path, and prevalidate the exact Vercel project, prepared `PUBLIC_ENQUIRY_SMTP_PASS` Sensitive/Production-only/blank-branch form, value field, save/accept control and post-save navigation path. The mechanism must be able to execute the post-create sequence without any DOM/accessibility read, screenshot, console inspection, page-state capture, clipboard read, or tool response that could contain the one-time token. If that cannot be proven before creation, stop before key creation under the five-part manual-intervention contract.

After creation, enter a no-observation interval: do not inspect or capture the Resend page or any browser/computer state while the one-time token is displayed. Invoke Copy blindly, transfer directly into the already-prevalidated Vercel value field, save/accept the binding, dismiss or navigate away from every token-bearing surface, and clear the clipboard. Only after those steps complete may metadata-only inspection resume. The secret must remain browser-clipboard-only: do not read the clipboard, place the value in code/tool arguments, use chat, print it, save it, inspect it, or manually type it. A blind action may return only a fixed sanitized completion/failure class and must never return screen, DOM, accessibility, console, clipboard or field content.

Create the four new bindings for Production only. `PUBLIC_ENQUIRY_SMTP_PASS` must be Sensitive/secret-class. The three public structural values are exact Resend authority and may be metadata-verified without revealing any protected value. Freshly prove the four new names, exact Production target, blank Git-branch scope and required protection/type. Existing generic SMTP rows and their target sets must remain unchanged.

A safe equivalent protected process-only transfer is acceptable if browser clipboard is unavailable and it provides equal or stronger non-output, non-file, non-argument and cleanup guarantees. Manual secret entry is not the default. If neither protected mechanism is available, stop before key creation or Vercel mutation and record the manual-intervention contract from `AGENTS.md`.

## Candidate and no-send proof

Before deployment, pass focused and retained local gates, then run the metadata-only protected-content wrapper over every file eligible for content inspection. Only after that wrapper returns clean may Builder emit or inspect the exact sprint-owned Git diff and capture the SHA-256 manifest of every implementation/test/documentation file included in the candidate. Inherited method/template dirt must remain excluded.

Create exactly one new Production-targeted Vercel deployment with domain auto-assignment disabled. It must be exact project, exact 029P branch/workspace source, Ready and zero aliases. No second deployment is authorized.

Run immutable public/privacy/protected/API/disabled-commerce checks that do not store data. Then invoke only the authenticated internal `smtp-preflight` action exactly once against the new candidate. Require the finite response `result=smtp-preflight`, `status=ready`, `providerClass=resend`, `errorClass=null`. Output may contain only finite class/status fields; it must never contain a host, address, credential, command, response, exception or token.

Do not call `/api/enquiries`, do not run the live-candidate harness, do not create a fixture and do not send an email. Candidate logs must show zero `/api/enquiries` requests. Independently prove all five aliases remain on accepted 036L and both prior enquiry candidates remain unaliased.

## Compensation and ceilings

If local/code/privacy gates fail, create no provider key, Vercel binding or deployment.

If provider/Vercel configuration fails before deployment, remove only the exact newly created 029P resources after proving ownership. Existing resources remain untouched.

If the one candidate or one preflight is non-target, do not retry. Keep every alias on 036L. Remove the exact new Vercel bindings and revoke only the exact new 029P Resend key if both actions can be proven safe and complete. If cleanup cannot be proven, stop as a material cleanup boundary and do not claim clean fallback. The unaliased candidate may remain as inert evidence.

On success, retain the exact new key and four bindings for later 029Q planning, keep the candidate unaliased and keep public enquiry unavailable. Do not delete either pre-existing Resend key; their disposition requires separate authority.

## Approved implementation and closeout files

The Builder plan must reduce this candidate set to the exact files needed:

- `lib/enquiries/env.ts`
- `.env.example`, solely to replace the four obsolete `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` placeholders with `PUBLIC_ENQUIRY_SMTP_HOST`, `PUBLIC_ENQUIRY_SMTP_PORT`, `PUBLIC_ENQUIRY_SMTP_USER` and `PUBLIC_ENQUIRY_SMTP_PASS`; preserve `SMTP_FROM` and every unrelated byte/placeholder
- the narrowest new 029P deterministic/autonomous test and protected-proof scripts under `scripts/`
- `package.json` only if exact script registration is required; no dependency change is expected
- `docs/PUBLIC_ENQUIRY_SMTP_READINESS_029P.md`
- the four applied 029P sprint files for accepted within-intent Pack corrections and closeout
- standard directly affected closeout records: `planning/STATUS.json`, `planning/STATE.md`, `planning/ROADMAP.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No migration, provider adapter, public route/form, database, Auth, trainer-access, alias-controller, generic environment, commerce or 036K file may change. The sole generic-environment-file exception is the exact four-placeholder `.env.example` replacement above; no value, comment, sender, recipient, HMAC, internal-auth, Supabase, Stripe or unrelated placeholder may change. A material scope change returns `ask`.

## Metadata-only protected-content scanning

Every secret, credential, token, address and protected-response scan must emit only a fixed scan name, exit status, aggregate count and, where required for containment, file names. Never emit matching lines, context, matched substrings, captures, fragments or diff hunks. Synthetic `.invalid`, opaque placeholder and deterministic token fixtures must be checked in a separate allowlisted test that also returns counts/status only.

Run scanners through a wrapper or command shape that captures matcher output internally and projects metadata only. The wrapper is a hard prerequisite before every content-emitting diff or file-content inspection, including the initial A014 implementation review and the final A025 disk/Git reread. Only files in a scanner-clean set may proceed to content output or inspection. After any local file mutation following provider, Vercel, deployment or other external action, rerun the wrapper over the affected and candidate file sets before any subsequent content diff or inspection.

An unexpected positive enters no-output containment immediately: identify only the affected file name, do not run or continue any ordinary diff/content command for that file, do not print or inspect the match through agent-visible tools, and select a safe exact-file correction or material protected-data stop. A later clean scan cannot undo an earlier disclosure, so no content-emitting command may precede this gate. Final A009/A014/A025 evidence records only scan classes, counts, scanner-clean file-set identity, affected file names if nonzero, and residue status.

## Evidence-proportional execution and manual intervention

Stop only for a material wrong target, authority gap, protected-data/secret exposure, destructive uncertainty, unauthorized scope expansion, provider/configuration partial state, failed integrity/privacy/security behaviour, Production impact or cleanup that cannot be proven safe. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep deterministic test, browser bridge, credential transport, validator, reporter, formatting and encoding corrections inside 029P when product scope is unchanged. Do not create another sprint solely because browser automation, clipboard control, a renderer, optional CLI path or redundant proof is unavailable.

Manual intervention is the last safe option. If it becomes necessary, record what is blocked, evidence checked, the exact user action, step-by-step instructions and what Builder will verify afterward. Never ask the user to send a secret through chat or place it in a command argument.
