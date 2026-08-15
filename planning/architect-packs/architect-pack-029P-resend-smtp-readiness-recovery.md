# Architect Pack - Sprint 029P Resend SMTP Readiness Recovery

============================================================
FILE: planning/sprints/029P-resend-smtp-readiness-recovery/requirements.md
============================================================

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

**owns:** Canonical/branch/Pack proof; a narrow dedicated public-enquiry SMTP environment contract; the smallest enquiry environment/harness/test/documentation changes; one exact Resend `sending access` key restricted to verified `precisionperformance.com.au`; four new Production-only Vercel bindings `PUBLIC_ENQUIRY_SMTP_HOST`, `PUBLIC_ENQUIRY_SMTP_PORT`, `PUBLIC_ENQUIRY_SMTP_USER`, `PUBLIC_ENQUIRY_SMTP_PASS`; protected browser clipboard transfer; one Production-targeted `--skip-domain` candidate; exactly one authenticated candidate no-send preflight; exact compensation of newly created 029P resources on failure; critical reviews; proportional closeout.

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

Use the Resend Copy control and paste directly into the new Vercel `PUBLIC_ENQUIRY_SMTP_PASS` value field in the exact project. The secret must remain browser-clipboard-only: do not read the clipboard, place the value in code/tool arguments, use chat, print it, save it, inspect it, or manually type it. Clear the clipboard immediately after the Vercel value is accepted.

Create the four new bindings for Production only. `PUBLIC_ENQUIRY_SMTP_PASS` must be Sensitive/secret-class. The three public structural values are exact Resend authority and may be metadata-verified without revealing any protected value. Freshly prove the four new names, exact Production target, blank Git-branch scope and required protection/type. Existing generic SMTP rows and their target sets must remain unchanged.

A safe equivalent protected process-only transfer is acceptable if browser clipboard is unavailable and it provides equal or stronger non-output, non-file, non-argument and cleanup guarantees. Manual secret entry is not the default. If neither protected mechanism is available, stop before key creation or Vercel mutation and record the manual-intervention contract from `AGENTS.md`.

## Candidate and no-send proof

Before deployment, pass focused and retained local gates and capture the exact sprint-owned Git diff plus SHA-256 manifest of every implementation/test/documentation file included in the candidate. Inherited method/template dirt must remain excluded.

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
- the narrowest new 029P deterministic/autonomous test and protected-proof scripts under `scripts/`
- `package.json` only if exact script registration is required; no dependency change is expected
- `docs/PUBLIC_ENQUIRY_SMTP_READINESS_029P.md`
- the four applied 029P sprint files for accepted within-intent Pack corrections and closeout
- standard directly affected closeout records: `planning/STATUS.json`, `planning/STATE.md`, `planning/ROADMAP.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No migration, provider adapter, public route/form, database, Auth, trainer-access, alias-controller, generic environment, commerce or 036K file may change unless a fresh plan review proves the change is strictly necessary within the written readiness-only outcome. A material scope change returns `ask`.

## Evidence-proportional execution and manual intervention

Stop only for a material wrong target, authority gap, protected-data/secret exposure, destructive uncertainty, unauthorized scope expansion, provider/configuration partial state, failed integrity/privacy/security behaviour, Production impact or cleanup that cannot be proven safe. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable. Keep deterministic test, browser bridge, credential transport, validator, reporter, formatting and encoding corrections inside 029P when product scope is unchanged. Do not create another sprint solely because browser automation, clipboard control, a renderer, optional CLI path or redundant proof is unavailable.

Manual intervention is the last safe option. If it becomes necessary, record what is blocked, evidence checked, the exact user action, step-by-step instructions and what Builder will verify afterward. Never ask the user to send a secret through chat or place it in a command argument.

============================================================
FILE: planning/sprints/029P-resend-smtp-readiness-recovery/blueprint.md
============================================================

# Sprint 029P Blueprint

## Execution sequence

1. Prove canonical CWD/Git top-level, exact start HEAD, inherited dirty exclusions and exact new 029P branch. Dry-run, apply and reread exactly four Pack destinations.
2. Builder reads the applied sprint, 029O closeout, enquiry environment/provider/server/internal route, current tests/harness, Resend/Vercel discovery evidence and current live-routing truth. Return one exact no-edit critical plan with task contract, file list, guards, A001-A026, commands, baseline/target arithmetic, closeout, `Pack corrections` and blockers.
3. A genuinely fresh Architect reviews the exact plan under the three-decision critical budget. Implementation starts only after `pass`.
4. Add discriminating failing tests for dedicated-transport presence, old-generic-only refusal, missing-field refusal, Resend structural projection and privacy-safe proof output.
5. Implement the dedicated four-name enquiry transport boundary without generic transport fallback. Add the minimum 029P harness/proof and operations document.
6. Run focused and retained enquiry suites, observed arithmetic, TypeScript, zero-warning lint, Production build, static/privacy/secret/encoding/scope scans and exact changed-file manifest.
7. Perform fresh read-only preflight: exact Resend signed-in account, verified expected domain, two masked pre-existing sending-access keys/no raw key; exact Vercel project, old generic names unchanged, new names absent; all five aliases on accepted 036L; both prior enquiry candidates unaliased.
8. Create exactly one domain-restricted sending-access key with the exact 029P name. Transfer by Copy and direct Vercel paste without reading the clipboard or revealing the token. Clear clipboard. Create the four Production-only bindings and metadata-verify them.
9. Create exactly one Production-targeted `--skip-domain` candidate from the exact canonical 029P workspace. Require Ready and zero aliases.
10. Run non-storing immutable checks, then exactly one authenticated `smtp-preflight`. Require sanitized Resend `ready`.
11. Prove zero `/api/enquiries` candidate requests, zero email/submission/data activity, all five aliases still on 036L and prior candidates still unaliased.
12. On non-target, execute exact compensation with no retry. On target, retain only the new readiness resources and keep the candidate unaliased.
13. A fresh inspector distinct from Builder and plan reviewer judges every criterion, implementation diff, real local/provider/Vercel/deployment evidence and complete closeout plan under the three-decision budget.
14. After inspection `pass`, update proportional durable truth, mark 029P ready or truthful compensated fallback, leave 029Q conditional, set STATUS `sprint-closed`, then reread disk, Git diff, provider/Vercel metadata, candidate, logs and all five live aliases. Do not commit or push.

## Architecture trace

```text
Resend signed-in account (authoritative)
  -> verified precisionperformance.com.au domain
  -> one new sending-access, domain-restricted key
  -> Copy control / protected clipboard only
  -> exact Vercel project
  -> PUBLIC_ENQUIRY_SMTP_HOST / PORT / USER / PASS (Production only)
  -> one new Production-targeted, zero-alias candidate
  -> authenticated internal smtp-preflight
  -> Nodemailer verify(): DNS + TCP + TLS + authentication, no email
  -> sanitized ready | compensated blocked fallback

Accepted live path remains separate
  -> five aliases -> accepted Sprint 036L
  -> no enquiry route, message, database write or alias transition
```

Resend is credential/configuration source of truth. Vercel is the encrypted runtime target. Candidate no-send proof is the readiness sink. It does not prove sender acceptance or delivery; those remain conditional 029Q work.

## Flight evidence

1. **Class and reason:** `critical`; the sprint crosses provider credential creation, protected clipboard transport, encrypted Production configuration and an external Production-targeted deployment.
2. **Acceptance invariant at risk:** no protected value becomes agent-visible or durable outside Resend/Vercel; existing keys and generic bindings remain unchanged; exactly one unaliased candidate authenticates to Resend without sending; no public/data/alias effect occurs.
3. **Affected layers and verified paths/symbols:** Resend Domains and API Keys control planes; exact Vercel project environment settings; `lib/enquiries/env.ts::readEnquiryEnvironment/getPublicEnquiryAvailability`; new 029P tests/proof; existing `lib/enquiries/provider.ts::verifySmtpTransport`; `lib/enquiries/server.ts::runSmtpPreflight`; authenticated internal enquiry route; one new candidate; five independent public aliases.
4. **Source, transformations and sink:** Resend creates one domain-restricted sending token; browser Copy/Paste transfers it without model access into a dedicated Sensitive Vercel binding; public Resend host/port/user values and existing sender/recipient/support bindings form server-only configuration; the candidate authenticates and returns only a finite ready class; public routing stays on 036L.
5. **Discriminating examples:** complete dedicated `PUBLIC_ENQUIRY_SMTP_*` transport is available while the same environment containing only old generic `SMTP_*` transport is unavailable; missing dedicated pass is unavailable; one synthetic wrong pass makes candidate preflight non-ready without any send; a plausible fallback-to-old implementation fails the dedicated refusal test.
6. **Durable verification source:** canonical HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`; applied four-file 029P sprint; exact Git diff and SHA-256 changed-file manifest; counted tests/build/scans; sanitized Resend domain/key counts; Vercel name/type/target metadata; one deployment ID/origin/zero-alias projection; one finite preflight result; candidate request counts; five-alias reread.
7. **Known uncertainty:** the existing generic SMTP values are intentionally unavailable and are not repair authority; the old 029O preflight class is not inferred; `verify()` cannot prove sender acceptance; the two existing Resend keys cannot be deleted by inference; no Git publication is authorized.

## Failure and compensation matrix

| Boundary | Required result | Non-target handling |
| --- | --- | --- |
| Canonical/Pack | Exact workspace/start/branch/four destinations | Stop before implementation |
| Plan review | Fresh `pass` within three decisions | Correct within Pack intent or ask |
| Local contract | Dedicated-only transport and all retained gates pass | Correct in 029P; no external action |
| Provider preflight | Verified domain, exact masked baseline, signed-in authority | Stop before creation |
| Key creation | One exact sending/domain-restricted key, no token output | Delete exact new key if safe; stop |
| Clipboard/config | Token direct to Sensitive Production binding; four exact names; old rows unchanged | Remove exact new resources if safe; stop |
| Candidate | One exact project Ready deployment, zero aliases | No second deployment; compensate new resources |
| SMTP verify | One finite Resend `ready` | No retry; compensate new resources; aliases remain 036L |
| Side effects | Zero send/submission/data/alias activity | Stop; contain and report any unexpected effect |
| Inspection | Distinct fresh `pass` | Replan under critical limits |
| Closeout | Disk/Git/provider/Vercel/candidate/log/live truth aligned | Do not claim landing |

## Evidence arithmetic

Builder must run and record the current 029O focused/retained baseline before edits, then publish target arithmetic from the exact new 029P assertions. New dedicated/refusal/privacy cases add to rather than replace retained coverage. Report focused, retained and full Product gates separately; never hide a failed group inside an aggregate.

============================================================
FILE: planning/sprints/029P-resend-smtp-readiness-recovery/acceptance.md
============================================================

# Sprint 029P Acceptance

- [ ] A001 Canonical CWD/Git top-level equal the permanent repository, exact starting HEAD is `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, branch is `codex/029P-resend-smtp-readiness-recovery`, and inherited method/template dirt is classified and excluded.
- [ ] A002 The one Pack dry-runs/applies/rereads exactly four traversal-free 029P files; applied files are Builder authority.
- [ ] A003 Builder returns the complete no-edit critical plan with exact files, task contract, guards, A001-A026, commands, observed baseline/target arithmetic, closeout, Pack corrections and blockers.
- [ ] A004 A genuinely fresh Architect returns `pass` on the exact plan within the three-decision budget; stable findings are recorded and resolved before implementation.
- [ ] A005 Migration 0023, migrations 0001-0022, public routes/forms, database, Auth, trainer, commerce, generic SMTP bindings and unrelated Product source remain unchanged.
- [ ] A006 `readEnquiryEnvironment` uses the four dedicated `PUBLIC_ENQUIRY_SMTP_*` transport names and does not fall back to generic host/port/user/pass names.
- [ ] A007 Discriminating tests prove dedicated-complete availability, old-generic-only refusal, every dedicated missing-field refusal and no browser/client exposure; a fallback implementation goes red.
- [ ] A008 Current 029O focused/retained baselines are observed before edits and exact 029P target arithmetic passes without replacing retained coverage.
- [ ] A009 TypeScript, zero-warning lint, Production build and mapped static/privacy/secret/log/encoding/scope checks pass with truthful outcomes.
- [ ] A010 Fresh provider preflight proves the exact Resend account is signed in, `precisionperformance.com.au` is verified, exactly two pre-existing masked sending-access keys are present and no raw key/full-access authority is exposed.
- [ ] A011 Exactly one Resend key named `Precision Performance public enquiry 029P` is created with `sending access` restricted to `precisionperformance.com.au`; both pre-existing keys remain unchanged.
- [ ] A012 The new token moves only through Resend Copy and direct protected paste (or equally strong process-only transport), is never read/output/persisted/placed in arguments/manually entered, and clipboard/process residue is cleared.
- [ ] A013 Exactly four new Production-only, blank-branch Vercel bindings exist in the exact project; pass is Sensitive, public structural values match Resend authority, and existing generic binding names/types/targets remain unchanged.
- [ ] A014 Exact sprint-owned Git diff and a SHA-256 changed-file manifest exclude inherited dirt and identify the source supplied to the candidate without claiming an unmade commit or push.
- [ ] A015 Exactly one new Production-targeted deployment is created with domain auto-assignment disabled; it is exact project/029P source, Ready and zero aliases. No second deployment exists.
- [ ] A016 Immutable candidate public/privacy/protected/API/disabled-commerce checks pass without storing data or calling the public enquiry submission route.
- [ ] A017 Exactly one authenticated candidate `smtp-preflight` returns `result=smtp-preflight`, `status=ready`, `providerClass=resend`, `errorClass=null`, with no protected detail.
- [ ] A018 Candidate logs and provider evidence prove zero `/api/enquiries` requests, zero email, zero notification attempt and zero mailbox/log inspection.
- [ ] A019 No enquiry/bucket/fixture or Supabase mutation occurs; migration 0023 and its accepted empty locked-down state remain unchanged.
- [ ] A020 Independent readback proves all five public aliases remain on accepted 036L and both 029N/029O candidates remain unaliased; no alias command occurs.
- [ ] A021 On a non-target key/config/candidate/preflight result, no retry occurs and only exact newly created 029P resources are compensated; clean fallback is claimed only if cleanup is proven complete.
- [ ] A022 On success, the exact new dedicated readiness resources remain, candidate remains unaliased and public enquiry remains unavailable pending a separate 029Q Architect conversation and `go`.
- [ ] A023 A fresh inspector distinct from Builder and plan reviewer returns `pass` within the three-decision budget after judging every applicable criterion, full diff, real evidence and closeout plan.
- [ ] A024 Durable closeout records the critical Flight evidence, decision counts/findings/substitutions/residuals, truthful target or fallback, refreshed briefing live fields and STATUS `sprint-closed`.
- [ ] A025 Final disk/Git/provider/Vercel/candidate/log/five-alias reread agrees with the accepted outcome; no secret, address, protected provider response or unexpected residue is recorded.
- [ ] A026 No commit, push, merge, PR, force-push or history rewrite occurs.

Full target outcome is `resend-smtp-readiness-recovered-unaliased-clean`. This proves only no-send transport readiness. It does not prove sender acceptance, delivery, inbox receipt, enquiry behavior or public activation.

============================================================
FILE: planning/sprints/029P-resend-smtp-readiness-recovery/handoff-prompt.md
============================================================

# Sprint 029P Builder Handoff

You are Builder for critical Sprint 029P in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

First prove canonical CWD/Git top-level and exact HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, preserve inherited method/template dirt, and create/switch only to `codex/029P-resend-smtp-readiness-recovery`. Dry-run and apply the one 029P Pack, verify exactly four traversal-free destinations, and reread every applied file. They are your authority.

Do not edit implementation yet. Read the 029O closeout, enquiry environment/provider/server/internal route, focused/retained tests, current Resend/Vercel discovery truth and live routing. Return one exact plan containing the task contract, implementation file list, scope guards, A001-A026, verification commands, observed baseline and target arithmetic, standard closeout files/actions, a named `Pack corrections` section (`None` is valid), and any blocking ambiguity. A fresh Architect must pass that exact plan before implementation.

## Task contract

**objective:** Establish one dedicated domain-restricted Resend credential and one new unaliased candidate whose authenticated no-send preflight is ready, with zero public, email, data, migration or alias effect.

**owns:** Dedicated four-name enquiry SMTP contract; narrow tests/proof/docs; one exact Resend sending/domain key; protected direct transfer; four new Production-only Vercel bindings; one `--skip-domain` candidate; one no-send preflight; exact compensation on failure; critical reviews and closeout.

**must_not:** Expose or manually handle secrets/addresses; edit existing keys or generic SMTP bindings; retry 029N/029O; send or submit; mutate Supabase/data/migrations; create a second deployment; move aliases; touch 036K/unrelated Product; commit/push/merge/PR/rewrite history.

**acceptance:** A001-A026 in `acceptance.md`, including dedicated-only configuration, discriminating old-generic refusal, one least-privilege key, protected non-output transfer, four exact new bindings, one exact zero-alias candidate, one sanitized ready result, zero send/data/alias activity and exact compensation on failure.

**verification:** Observed baseline/target arithmetic; TypeScript/lint/build/static/privacy/secret/scope gates; Git diff/manifest; sanitized Resend/Vercel metadata; one candidate/zero aliases; one no-send result; zero submission/provider activity; five aliases on 036L; fresh inspection; durable closeout/final reread.

Apply the Evidence-Proportional Execution Standard. Stop only for a material target, authority, secret/privacy, destructive, provider/configuration partial-state, integrity/security, Production, scope or cleanup risk. Use equivalent or stronger safe proof when a supporting tool is unavailable. Keep deterministic test, browser bridge, credential transport, validator, reporter, formatting and encoding corrections inside 029P when outcome scope is unchanged. Manual secret intervention is last resort and must follow the exact five-part `AGENTS.md` record; never ask for a secret in chat or arguments.
