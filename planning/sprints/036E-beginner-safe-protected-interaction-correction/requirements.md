# Sprint 036E — Beginner-Safe Protected Interaction Correction

## Outcome

Correct the human-factors defect that closed Sprint 036D blocked: a first-time operator could mistake an ordinary, echoing acknowledgement prompt for the later protected credential-entry prompt.

Sprint 036E changes only the existing protected Management lifecycle wrapper and its deterministic test. It must make every non-secret decision unmistakable and non-echoing, defer credential creation until the wrapper is visibly waiting at the single protected-input moment, and prove the complete novice flow executably without using any real credential, provider request or external system.

Target outcome: `beginner-safe-protected-interaction-corrected-clean`.

This is the corrective continuation of Sprint 036D under the project suffix rule. It does not retry the Management lifecycle, prove same-token invalidation, run retained-pilot verification, stage or deploy a candidate, move an alias, authenticate to Production, complete live trainer acceptance or begin Sprint 029N. A later live retry requires separate Architect scope after 036E closes and is reviewed.

## Workflow profile

Use `strict` because the corrected code governs entry of a high-privilege provider credential and compensation after possible creation. Strict controls attach to prompt ordering, non-echoing input, buffered-input refusal, protected-memory handling, compensation, transcript detection, child-environment isolation, fixed targets, sanitization and evidence.

All Sprint 036E execution is local and offline. No protected value or provider mutation is needed to prove this correction.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that exact path after normalizing Windows separators. Expected closed Sprint 036D authority is SHA `2b8bf17f180af85fef71748b367eb6215622ca9c` on `codex/036D-single-use-management-access-and-live-trainer-acceptance`, with exactly one canonical worktree registration.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any additional uncommitted path, changed starting SHA, unresolved target ambiguity or extra worktree is a material baseline mismatch until reconciled.

Create only `codex/036E-beginner-safe-protected-interaction-correction` in the permanent canonical repository. Do not enter, recreate, copy from or use a retired legacy root, `C:\tmp` worktree, deployment directory or alternate history.

## Source authority

Use, in descending order:

1. `AGENTS.md`, including the Evidence-Proportional Execution Standard, Manual Intervention Rule and canonical-workspace guard.
2. This Sprint 036E Pack after Builder applies it and verifies exactly four generated files.
3. Closed Sprint 036D review, acceptance, briefing and exact implementation at SHA `2b8bf17f180af85fef71748b367eb6215622ca9c`.
4. `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
5. Current official Microsoft documentation for `Console.ReadKey(Boolean)`, `Console.KeyAvailable` and `Read-Host -AsSecureString`, reconciled to the installed Windows PowerShell/.NET runtime before implementation.

Official mechanism documentation informs the implementation but does not broaden scope. The governing behavior is executable proof in the exact supported ConsoleHost environment.

## Task contract

**objective:** Make the existing protected Management lifecycle beginner-safe by ensuring non-secret controls cannot echo a credential and by placing credential creation immediately before one unmistakable protected-input prompt, with executable novice-flow proof.

**owns:** Exact canonical baseline reconciliation; changes only to the existing 036D PowerShell wrapper and its deterministic test; a text-first novice orientation; non-echoing non-secret controls; exact prompt/state ordering; buffered or unexpected input refusal; preservation of transcript, protected-memory, compensation, request-ceiling, sanitization and child-environment controls; offline executable proof; proportional review and planning closeout.

**must_not:** Create, request, receive, paste, type, store or simulate a real credential; open or automate a Supabase account/token page; call Supabase or any other provider; run `ManagementLifecycle` or `RetainedPilotVerify` with live values; change the 036D core, 036C tooling, 035K tooling, application, component, library, package, lockfile, runtime configuration, migration, schema, RLS, role, permission, callback, SMTP, template, identity, fixture, data, Storage, DNS, Vercel setting or deployment; stage a candidate; move an alias; inspect a mailbox; request an OTP; authenticate to Production; implement Sprint 029N; commit, push, merge, open a PR, push `develop`, force-push or claim live trainer access/product-wide Done.

**acceptance:** Every non-secret protected-flow control is visibly labelled and non-echoing; no ordinary plaintext `Read-Host` remains in the Management lifecycle; all orientation and decisions finish before token creation is invited; the creation instruction transitions directly to the single `Read-Host -AsSecureString` credential prompt with no intervening acknowledgement; unexpected or buffered input fails sanitized without disclosing key content; compensation treats any post-creation-instruction ambiguity as potentially active; all inherited security controls remain executable; the final deterministic suite reports at least 345 assertions, including at least 50 new 036E interaction assertions; wrapper self-test passes; no live or external action occurs; and current records truthfully preserve the blocked live outcome.

**verification:** Run Pack dry-run/four-target proof; canonical path/worktree/status/SHA checks; exact starting hashes; static prompt/input inventory; official mechanism reconciliation; deterministic 036D/036E suite with exact assertion arithmetic; wrapper `SelfTest`; inherited 036C deterministic proof; executable local PowerShell subprocess proof with synthetic canaries only plus official mechanism/source proof for keyboard semantics that cannot be safely driven noninteractively; exact runtime-byte non-difference; no-runtime-import proof; whitespace/encoding/JSON and high-confidence secret/private-data scans; final approved-file diff; final clean protected-process/environment/temp-artifact proof; and one exact permitted outcome.

## Closed Sprint 036D truth to preserve

- Sprint 036D closed `production-management-access-revocation-blocked`, not clean.
- The operator created exactly one named credential, entered it at an ordinary acknowledgement prompt and caused it to become visible before the protected prompt.
- The private console was terminated, the diagnostic image was deleted, and the exact credential was manually revoked and confirmed absent.
- Same-token `401`/`403` invalidation was not and cannot now be proven because the wrapper never received or retained the credential.
- No provider API request, retained-pilot verification, Vercel action, candidate, alias mutation, Production authentication or downstream release action began.
- Production remains on the historically proven Ready rollback according to the last authoritative five-alias evidence.
- The current 036D implementation hashes are wrapper `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`, core `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1` and test `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`.

Sprint 036E may change the wrapper and test hashes only. The core hash must remain exact. No wording may imply that local correction retroactively cleans 036D or supplies the missing invalidation evidence.

## Beginner-safe interaction contract

The protected Management flow must use a single coherent interaction language that a first-time operator can follow without prior knowledge.

### Text-first orientation

Before any decision input, print a short numbered orientation that states, in plain language:

1. do not create a credential yet;
2. non-secret checkpoints never accept a credential and do not echo keys;
3. the wrapper will explicitly announce the only protected credential prompt;
4. token creation occurs only after every non-secret checkpoint has finished;
5. after the provider check, the exact named credential must be revoked and proven invalid; and
6. any ambiguity stops the lifecycle and may require private revocation.

The orientation and every prompt must use text labels, not color alone. Required semantic labels are `NON-SECRET CONTROL`, `PROTECTED CREDENTIAL ENTRY`, `DO NOT CREATE A CREDENTIAL YET`, and `CREATE THE CREDENTIAL NOW`. Exact punctuation may be adjusted for readability, but tests must prove the meaning and order.

### Non-secret controls

The live Management lifecycle must not use ordinary plaintext `Read-Host` for preflight, token-class selection, scope/risk acknowledgement, input-method selection, clipboard acknowledgement, revocation acknowledgement or retry choice.

Use `[Console]::ReadKey($true)` or an execution-time equivalent that is proven not to display the pressed key. The control must:

- display its non-secret purpose and the accepted key choices before reading;
- never print the actual key, character or buffered content;
- accept only the exact expected key or choice;
- reject a wrong key with a fixed sanitized code;
- detect unexpected queued/buffered input where the runtime supports a safe proof;
- drain rejected buffered input through an intercepting/non-echoing path before exit;
- fail closed when console-input state cannot be proven; and
- remain limited to a private, interactive, non-transcribed ConsoleHost with non-redirected streams.

The implementation may use a small internal decision-reader abstraction so deterministic tests can inject decisions without a live keyboard. Deterministic injection remains exclusive to `SelfTest`; protected operations must refuse it.

### Creation-to-protected-input adjacency

All account-access, token-class, scope/risk, input-method and clipboard-safety decisions must complete before credential creation is invited.

The final pre-creation control must state that the next visible prompt is the only place a credential may be entered. After it passes, the wrapper must:

1. emit the exact non-secret token-name stem and `CREATE THE CREDENTIAL NOW` instruction;
2. immediately enter the one `Read-Host -AsSecureString` Management credential prompt labelled `PROTECTED CREDENTIAL ENTRY`; and
3. perform no ordinary acknowledgement, creation confirmation, text input or unrelated action between the creation instruction and protected input.

Remove the old plaintext creation confirmation. Receiving a non-empty protected value is the positive creation/use signal. Issuing the creation instruction without receiving a protected value means a credential may exist and must enter the compensation/blocked path; it must never be classified as a clean no-creation exit by assumption.

### Post-input controls and compensation

After protected entry, private exact-token revocation/list-absence acknowledgement and any justified invalidation-retry choice must also use non-echoing controls. Their visible text must say they are non-secret and must never receive a credential.

Preserve the existing rule that every path after possible credential creation reaches compensation before protected-memory disposal. If creation instructions were issued but the protected value is missing, the wrapper cannot prove same-token invalidation; it must emit fixed secret-free manual intervention, identify that a credential may remain active, forbid downstream continuation and never claim clean lifecycle completion.

Preserve exact same-token reuse, body-blind invalidation, request ceilings, clipboard clearing without inspection, process-environment clearing, absolute Node/SystemRoot validation, BSTR zeroing, `SecureString` disposal and Management/service-role separation. Sprint 036E must not weaken any accepted control to simplify the interface.

## Executable novice-flow proof

Extend `scripts/test-protected-management-lifecycle-036D.mjs` rather than creating another test surface. The final suite must report at least 345 counted assertions: the accepted 295-assertion baseline plus at least 50 new 036E interaction assertions. If an obsolete assertion is replaced, report retained, replaced and new counts explicitly; the final total and arithmetic must remain auditable.

The new proof must cover at least:

- required orientation labels and numbered ordering;
- no ordinary plaintext `Read-Host` in the Management lifecycle;
- non-secret controls use intercepting/non-echoing input in the protected implementation;
- wrong keys fail with fixed codes and the key is absent from all output;
- credential-shaped, JWT-shaped, password-shaped, email-shaped and UUID-shaped buffered canaries never appear in stdout, stderr, exceptions, files or Git;
- extra buffered input is detected/drained or the environment fails closed before any creation instruction;
- all preflight/type/scope/input/clipboard controls occur before `CREATE THE CREDENTIAL NOW`;
- creation instruction is immediately followed by the protected `Read-Host -AsSecureString` call;
- the former plaintext creation confirmation is absent;
- no non-secret control occurs between creation instruction and protected entry;
- protected-input cancellation after creation instruction enters compensation/blocked state;
- revocation and retry acknowledgements are non-echoing;
- transcript, redirection and host-state refusal occurs before any creation instruction;
- deterministic injection is refused by protected operations;
- Management and service-role child environments remain exact, separate and cleared;
- provider/invalidation request ceilings and body-blind invalidation remain unchanged;
- all cleanup/finally paths dispose protected state;
- `SelfTest` uses synthetic values only and performs zero network/provider/external mutation; and
- output keys and failure codes remain allowlisted and sanitized.

Use executable local Windows PowerShell subprocess proof wherever it materially proves the behavior. Static source assertions alone are insufficient: combine executable deterministic flow/output proof with current official non-echoing console semantics and exact source invariants. Drive a real interactive ConsoleHost only when that can be done safely without protected input or manual intervention. No test may require a real token, account page, service-role value, mailbox, network request or external provider.

## Exact implementation boundary

Builder may modify only:

- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1`
- `scripts/test-protected-management-lifecycle-036D.mjs`

The following must remain byte-identical:

- `scripts/protected-management-lifecycle-036D-core.mjs`
- every 036C and 035K implementation file;
- all application, component, library, public, package, lockfile, Next/Vercel runtime and migration paths.

Do not rename the existing wrapper or its operations. Preserve `SelfTest`, `ManagementLifecycle` and `RetainedPilotVerify`; Sprint 036E executes `SelfTest` only.

The existing wrapper/test names retain operational continuity. Sprint 036D historical evidence remains in its closed review and commit; current file contents may carry the 036E correction with new hashes recorded at closeout.

## Validation boundary

Required focused validation:

- exact starting hashes for wrapper/core/test;
- `node scripts/test-protected-production-preflight-036C.mjs` with 135 passing assertions;
- corrected `node scripts/test-protected-management-lifecycle-036D.mjs` with at least 345 passing assertions and exact arithmetic;
- `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`;
- executable synthetic subprocess proof for protected adjacency, transcript refusal, environment isolation and cleanup, plus official mechanism/source proof for non-echoing and buffered keyboard semantics that cannot be safely driven noninteractively;
- `npm run validate:static`, `npm run validate:json`, `git diff --check` and exact approved-file scope; and
- direct runtime-byte comparison against starting SHA `2b8bf17f180af85fef71748b367eb6215622ca9c`.

Do not rerun the full Product build merely for ceremony when runtime/package bytes are proven identical and the accepted Sprint 036D 29-page Production build remains applicable. If an unexpected runtime difference appears, stop for scope expansion rather than using a broad build to normalize it.

## Design, privacy and claims boundary

This sprint touches a private operations console only. It crosses no Product-design, public-content, clinical-claims, pricing, CMS, upload, voice, schema, permission or deployment gate.

Apply the design/messaging authority proportionally: use plain language, textual status in addition to any color, distinguish protected from non-secret controls, avoid personal or account identifiers, and retain no confidential value in evidence. No real horse, stable, trainer, mailbox, customer or clinical data may be used.

## Files and records

Builder may change only:

- the four generated Sprint 036E files;
- the two implementation files named above;
- `planning/reviews/036E-beginner-safe-protected-interaction-correction.md`;
- proportional updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where final authority changes; and
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` only to record the proven beginner-safe protected interaction contract.

Do not update `docs/OPERATIONS_HANDOFF.md` as if a live lifecycle or release completed. No commit or push is included; Builder follows the repository rule and stops unless the user separately asks for those actions.

## Evidence-proportional execution

Stop only for a material canonical/target mismatch, unexpected protected data, secret exposure, inability to prove non-echoing behavior, unauthorized source/contract expansion, cleanup ambiguity, destructive uncertainty or integrity/security failure.

Use equivalent or stronger safe proof when a preferred supporting tool is unavailable. Keep in-scope test harness, deterministic input adapter, field-name, fixed-code, reporter, formatting, encoding and validator corrections inside Sprint 036E when they preserve the approved outcome.

Do not create another sprint solely because browser automation, a renderer, clipboard tool, schema dump, optional CLI path or redundant verifier is unavailable. This sprint uses no browser or provider. A follow-up is appropriate only if the correction requires a material source/contract change outside the two approved implementation files or a genuinely different live outcome.

## Manual intervention

No human secret entry or external provider action is expected in Sprint 036E. Builder owns local implementation and synthetic proof.

If actual ConsoleHost behavior cannot be proven by the preferred harness, first use an equivalent or stronger local non-secret subprocess proof. Only if the required fact remains materially blocked must Builder record:

- what local behavior is blocked;
- evidence already checked;
- the exact non-secret user action needed;
- step-by-step instructions that use synthetic input only and never request a credential, account page, token, email, OTP or screenshot; and
- what Builder will verify afterward.

Never ask the user to type or paste a real protected value for Sprint 036E.
