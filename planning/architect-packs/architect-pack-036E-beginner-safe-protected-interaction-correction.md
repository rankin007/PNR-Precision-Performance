============================================================
FILE: planning/sprints/036E-beginner-safe-protected-interaction-correction/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036E-beginner-safe-protected-interaction-correction/blueprint.md
============================================================

# Sprint 036E Blueprint

## Delivery sequence

1. Prove canonical root, one worktree, exact closed 036D SHA and exact two-file Architect handoff diff.
2. Dry-run/apply the Pack and prove exactly four generated 036E files.
3. Create only `codex/036E-beginner-safe-protected-interaction-correction`.
4. Read all generated files and the closed 036D review/implementation before proposing any source edit.
5. At the mandatory code gate, present the exact two-file plan, scope guards, acceptance criteria and test arithmetic; wait for the user's explicit approval of that plan.
6. Hash-bind the closed 036D wrapper/core/test and run the accepted 295-assertion baseline plus wrapper self-test before modification when safely reproducible.
7. Reconcile installed ConsoleHost behavior with current official `Console.ReadKey(Boolean)`, `Console.KeyAvailable` and `Read-Host -AsSecureString` documentation.
8. Modify only the wrapper and deterministic test.
9. Replace ordinary non-secret text input with a non-echoing decision abstraction restricted to protected interactive ConsoleHost use.
10. Add the text-first novice orientation and exact semantic labels.
11. Finish all non-secret decisions before inviting token creation.
12. Remove the plaintext creation confirmation and make creation instruction directly adjacent to the single protected input call.
13. Treat post-instruction protected-input cancellation as possible credential creation requiring the blocked compensation path.
14. Make revocation and retry acknowledgements non-echoing and preserve all inherited security controls.
15. Add at least 50 counted 036E interaction assertions and run the full corrected suite to at least 345 passing assertions.
16. Run wrapper `SelfTest`, inherited 036C proof, executable synthetic subprocess proof, official mechanism/source proof for non-echoing keyboard semantics, static/JSON/whitespace/scope scans and runtime-byte equality.
17. Record exact before/after hashes, assertion arithmetic, zero live/external actions and the remaining blocked live boundary.
18. Refresh only proportional planning/runbook records, set the exact permitted outcome and stop without commit, push, live retry or Sprint 029N work.

## Interaction state machine

The local human-interaction states are monotonic:

`start`

-> `orientation-shown`

-> `preflight-non-secret-complete`

-> `token-class-non-secret-complete`

-> `scope-or-risk-non-secret-complete`

-> `input-method-non-secret-complete`

-> `clipboard-safety-complete` when applicable

-> `creation-ready-non-secret-complete`

-> `creation-instruction-issued`

-> `protected-input-waiting`

-> `protected-value-received` or `possible-created-without-protected-value`

No ordinary text-input state exists. No non-secret input state is allowed between `creation-instruction-issued` and `protected-input-waiting`.

`possible-created-without-protected-value` enters compensation/blocked handling. It never returns a clean lifecycle result.

## Visible interaction model

The wrapper should present three visually separated text regions:

1. `BEGINNER-SAFE PROTECTED FLOW` orientation;
2. `NON-SECRET CONTROL — NEVER TYPE OR PASTE A CREDENTIAL HERE` decisions; and
3. `PROTECTED CREDENTIAL ENTRY — THIS IS THE ONLY CREDENTIAL PROMPT` entry.

The exact wording may be refined for readability, but the semantic labels, ordering and warning must be machine-tested. Color may supplement but never replace text.

Non-secret control choices should be simple single-key actions, for example Enter to confirm and numbered or mnemonic keys for bounded choices. Each key read is intercepted/non-echoing. The wrapper never reports which unexpected key was pressed.

## Non-echoing decision reader

Use one small internal abstraction with separate production and deterministic implementations.

Production behavior:

- private interactive non-transcribed ConsoleHost only;
- no redirected stdin/stdout/stderr;
- `[Console]::ReadKey($true)` or equivalently proven intercepting input;
- exact accepted key set;
- fixed sanitized wrong-key/console-state codes;
- safe queued-input detection and non-echoing drain when supported;
- no key value, count, character or buffer content in output; and
- no protected value materialization.

Deterministic behavior:

- injectable decisions and synthetic canaries;
- available only under `SelfTest`;
- refused under `ManagementLifecycle` and `RetainedPilotVerify`; and
- capable of proving ordering, wrong-key, buffered-input, cancellation and compensation without a network or real credential.

## Creation/protected-entry sequence

The exact protected transition is:

1. final non-secret readiness control passes;
2. wrapper prints the exact token-name stem and `CREATE THE CREDENTIAL NOW` instruction;
3. wrapper prints `PROTECTED CREDENTIAL ENTRY` guidance;
4. wrapper immediately calls `Read-Host -AsSecureString`;
5. no plaintext input, acknowledgement or creation confirmation occurs in between.

If protected input is empty/cancelled after step 2, record `credentialMayExist=true`, clear all possible protected state, emit fixed manual intervention and forbid downstream continuation. Do not claim `credentialCreated=false` as a clean fact once creation was invited.

## Preserved lifecycle architecture

Do not modify `scripts/protected-management-lifecycle-036D-core.mjs`.

Preserve in the wrapper:

- exact root/branch/runtime checks adjusted only for the 036E branch where necessary;
- real ConsoleHost transcription-state inspection;
- noninteractive and redirected-stream refusal;
- absolute trusted Node and SystemRoot validation;
- Management/service-role protected-environment separation;
- environment clear-and-exact-key validation before protected-value conversion;
- shortest-lived BSTR/plaintext materialization in child-only environment;
- provider pass then private revocation/list absence then same-token invalidation ordering;
- invalidation body non-read and 401/403-only acceptance;
- two-request default ceiling and one justified bounded retry;
- clipboard clear without read when paste is selected;
- finally-path environment clearing, BSTR zeroing and `SecureString`/process disposal;
- fixed sanitized output and failure codes; and
- no token-page automation, account API, Auth users surface or identity enumeration.

No live operation runs during Sprint 036E.

## Test matrix

The corrected suite must include these groups with exact counted arithmetic:

1. inherited core/hash/request contract;
2. orientation text and semantic labels;
3. non-echoing decision mechanism;
4. accepted-key and wrong-key behavior;
5. buffered-input detection/drain/fail-closed behavior;
6. pre-creation ordering;
7. creation-to-protected-input adjacency;
8. removal of plaintext creation confirmation;
9. protected-input cancellation and possible-credential compensation;
10. non-echoing revocation and retry controls;
11. transcript/redirection/host-state refusal before creation instruction;
12. deterministic-injection isolation;
13. child-environment equality and cross-credential exclusion;
14. cleanup/finally paths;
15. output-key/failure-code allowlists;
16. adversarial credential/JWT/password/email/UUID/SMTP/account/identity canaries;
17. no network/provider/external mutation under `SelfTest`; and
18. exact two-file implementation scope and zero runtime import/diff.

At least 50 assertions are new for 036E and the final total is at least 345. Report retained, replaced, new and final counts; zero failures are required.

## Command shapes

Run from the canonical root.

Pack handling:

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036E-beginner-safe-protected-interaction-correction.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036E-beginner-safe-protected-interaction-correction.md`

Focused proof:

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

Repository proof:

`git diff --name-status 2b8bf17f180af85fef71748b367eb6215622ca9c -- scripts/Invoke-ProtectedManagementLifecycle036D.ps1 scripts/test-protected-management-lifecycle-036D.mjs`

`git diff --name-status 2b8bf17f180af85fef71748b367eb6215622ca9c -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json supabase`

`npm run validate:static`

`npm run validate:json`

`git diff --check`

`git status --short`

Do not invoke `-Operation ManagementLifecycle` or `-Operation RetainedPilotVerify` during Sprint 036E. Do not run any Vercel or Supabase command that accesses an external target.

## Failure handling

- Wrong canonical root, SHA, worktree or unexpected handoff diff: stop before branch/application.
- Core hash mismatch: stop; the two-file correction does not own the core.
- Non-echoing behavior cannot be proven: keep the live boundary blocked and close proof-blocked cleanly with no external action.
- Unexpected key or buffered input appears in output: treat as a security failure; diagnose once, correct within the two files and rerun the full focused proof.
- Creation instruction is not directly adjacent to protected input: fail acceptance.
- Protected-input cancellation can bypass compensation: fail acceptance.
- Transcript, environment, request-ceiling, sanitization or cleanup controls regress: fail acceptance.
- A Product/runtime/provider change appears necessary: stop for scope expansion; do not broaden 036E.
- A real credential or protected value appears unexpectedly: terminate the surface, clear safe local artifacts without reproducing the value, record the material incident boundary and stop.

## Closeout minimum

Record canonical root, starting/final branch and SHA state, exact two-file implementation diff, before/after hashes, core unchanged hash, official mechanism references, final assertion arithmetic, wrapper self-test, actual subprocess cases, output/scope/secret/private-data scans, runtime-byte equality, zero network/provider/external actions, exact final outcome and the continuing prohibition on a live retry.

Do not amend 036D history. Record 036E as the correction while preserving `production-management-access-revocation-blocked` as the last live lifecycle truth.

============================================================
FILE: planning/sprints/036E-beginner-safe-protected-interaction-correction/acceptance.md
============================================================

# Sprint 036E Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level equal the permanent canonical repository after Windows separator normalization.
- [ ] Exactly one canonical worktree registration exists; no retired, temporary or alternate workspace is used.
- [ ] Starting authority is exact closed 036D SHA `2b8bf17f180af85fef71748b367eb6215622ca9c`.
- [ ] Pre-branch changes are exactly this Architect Pack and `planning/STATUS.json`.
- [ ] Pack dry-run/apply/post-dry-run reports exactly four Sprint 036E files.
- [ ] Only `codex/036E-beginner-safe-protected-interaction-correction` is used.

## Starting implementation authority

- [ ] Starting wrapper SHA-256 is `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`.
- [ ] Starting core SHA-256 is `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`.
- [ ] Starting test SHA-256 is `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`.
- [ ] The accepted 295-assertion 036D suite and wrapper self-test baseline are reproduced or an equally strong safe baseline explanation is recorded before edits.
- [ ] Closed 036D live truth remains explicitly blocked and is not rewritten as clean.

## Exact scope

- [ ] Implementation changes are exactly `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` and `scripts/test-protected-management-lifecycle-036D.mjs`.
- [ ] `scripts/protected-management-lifecycle-036D-core.mjs` remains byte-identical at the approved hash.
- [ ] Existing 036C and 035K tooling remains unchanged.
- [ ] Application, component, library, public, package, lockfile, Next/Vercel runtime, migration and provider configuration paths have zero difference from the starting SHA.
- [ ] No runtime module imports 036C/036D operations tooling.
- [ ] No new dependency, executable, browser driver, service, provider adapter or credential store is added.

## Beginner orientation

- [ ] A plain-language numbered orientation appears before any decision input.
- [ ] It says `DO NOT CREATE A CREDENTIAL YET` before all pre-creation decisions.
- [ ] It explains that non-secret controls never accept a credential and do not echo keys.
- [ ] It identifies one and only one future `PROTECTED CREDENTIAL ENTRY` prompt.
- [ ] It explains create/use/revoke/invalidate ordering and the fail-closed consequence of ambiguity.
- [ ] Every safety distinction is expressed in text and does not depend on color.

## Non-secret controls

- [ ] The Management lifecycle contains no ordinary plaintext `Read-Host` input.
- [ ] Every non-secret decision uses `[Console]::ReadKey($true)` or an execution-time equivalent proven not to display the pressed key.
- [ ] Every control is visibly labelled `NON-SECRET CONTROL` and says never to type or paste a credential there.
- [ ] Accepted keys are bounded and displayed before input.
- [ ] Wrong keys return only fixed sanitized codes and never print the key/character.
- [ ] Unexpected queued/buffered input is detected and drained without echo or the environment fails closed before creation is invited.
- [ ] Console-input proof failure stops before any creation instruction.
- [ ] Non-secret deterministic injection remains exclusive to `SelfTest` and is refused under protected operations.

## Creation-to-protected-entry ordering

- [ ] Account preflight, token class, scope/risk, input method, clipboard safety and final readiness all complete before creation is invited.
- [ ] Final pre-creation text says the next prompt is the only credential-entry location.
- [ ] The wrapper emits the exact non-secret token-name stem and `CREATE THE CREDENTIAL NOW` only after all non-secret controls pass.
- [ ] The creation instruction is immediately followed by one `Read-Host -AsSecureString` prompt labelled `PROTECTED CREDENTIAL ENTRY`.
- [ ] The old plaintext creation confirmation is absent.
- [ ] No ordinary acknowledgement, input or unrelated action exists between creation instruction and protected entry.
- [ ] A non-empty protected value is required before normal provider-pass flow could continue in a later sprint.
- [ ] Cancellation/empty input after creation instruction sets possible-credential risk and enters compensation/blocked handling.

## Post-input safety and inherited controls

- [ ] Revocation/list-absence acknowledgement is non-echoing and unmistakably non-secret.
- [ ] Justified invalidation-retry choice is non-echoing and unmistakably non-secret.
- [ ] Every post-creation or possible-creation failure reaches compensation before protected-state disposal.
- [ ] Missing protected value after creation instruction cannot produce a clean no-creation result.
- [ ] Transcript, noninteractive and redirected-stream refusal remains before creation instruction.
- [ ] Absolute Node and SystemRoot validation remains exact.
- [ ] Management and service-role child environments remain separate, exact and cleared.
- [ ] BSTR zeroing, `SecureString` disposal, process disposal and finally-path cleanup remain executable.
- [ ] Clipboard paste safety and clearing without inspection remain enforced.
- [ ] Provider/invalidation endpoint, request ceiling, 401/403-only invalidation and response-body non-read remain unchanged.
- [ ] Output keys and failure codes remain allowlisted and sanitized.
- [ ] No token-page automation, account API, Auth user surface, user list or identity enumeration exists.

## Executable novice-flow proof

- [ ] Final deterministic suite passes at least 345 counted assertions with zero failures.
- [ ] At least 50 assertions are new 036E interaction proof.
- [ ] Retained, replaced, new and final assertion counts are reported with exact arithmetic.
- [ ] Executable local subprocess proof plus official mechanism/source invariants cover non-echoing accepted/wrong keys; no real keyboard-driving requirement is imposed when it would need protected input or manual intervention.
- [ ] Executable local subprocess proof covers buffered-input refusal/drain or an exact documented official-semantics/source/deterministic substitute.
- [ ] Executable local subprocess proof covers creation/protected-input adjacency and cancellation compensation.
- [ ] Executable local subprocess proof covers transcript/redirection refusal before creation instruction.
- [ ] Executable local subprocess proof covers protected-child environment equality and cleanup.
- [ ] Credential, JWT, password, email, UUID, SMTP, account and identity canaries never appear in stdout, stderr, exceptions, files or Git.
- [ ] `SelfTest` performs zero network, provider, browser, credential, mailbox, OTP, deployment or alias action.
- [ ] Wrapper `SelfTest` passes with fixed sanitized output.
- [ ] Inherited 036C suite passes all 135 assertions.

## Repository and proportional validation

- [ ] `npm run validate:static` passes.
- [ ] `npm run validate:json` passes and `planning/STATUS.json` remains valid JSON.
- [ ] `git diff --check` passes.
- [ ] Exact approved-file diff, UTF-8/no-BOM/final-line and generated-artifact checks pass.
- [ ] High-confidence secret and protected-data scans pass without emitting candidate values.
- [ ] Runtime-byte comparison against the starting SHA is empty.
- [ ] Accepted Sprint 036D Product build evidence is used only because runtime/package bytes are exact; no new Product readiness claim is made.
- [ ] Final protected process/environment/temp-artifact residue is zero.

## External and live boundary

- [ ] No real credential, service-role value, email, OTP, session or private identifier is requested or used.
- [ ] No Supabase/provider page is opened or automated.
- [ ] No provider/API request occurs.
- [ ] `ManagementLifecycle` and `RetainedPilotVerify` are not invoked with live values.
- [ ] No Vercel command, candidate staging, deployment, alias mutation, rollback or Production authentication occurs.
- [ ] No commit, push, merge, PR, `develop` push or force-push occurs unless separately requested by the user outside this Pack.
- [ ] Sprint 029N remains unstarted.

## Records and closeout

- [ ] Review records exact before/after wrapper/test hashes and unchanged core hash.
- [ ] Review records assertion arithmetic, executable cases and exact zero-external-action ledger.
- [ ] Current state/status/roadmap/lifecycle/schedule/evidence/briefing agree proportionally.
- [ ] Protected-process runbook is updated only with behavior proven by executable evidence.
- [ ] Operations handoff does not claim a live credential lifecycle or release result.
- [ ] Sprint 036D remains `production-management-access-revocation-blocked` as historical live truth.
- [ ] Sprint 036E closes only at one permitted outcome and grants no live retry authority.
- [ ] Product-wide Done and stable live trainer access remain unclaimed.

## Permitted outcomes

- `beginner-safe-protected-interaction-corrected-clean`
- `beginner-safe-protected-interaction-proof-blocked-clean`
- `beginner-safe-protected-interaction-scope-change-required`

Only `beginner-safe-protected-interaction-corrected-clean` establishes that the local human-factors correction is ready for later Architect review. It does not complete the Management credential lifecycle or live trainer-access gate.

============================================================
FILE: planning/sprints/036E-beginner-safe-protected-interaction-correction/handoff-prompt.md
============================================================

You are Builder for Sprint 036E — Beginner-Safe Protected Interaction Correction.

Your one objective is to make the existing protected Management lifecycle beginner-safe. Every non-secret decision must be visibly labelled and non-echoing, all non-secret decisions must finish before credential creation is invited, and the creation instruction must lead directly to the single protected `Read-Host -AsSecureString` prompt. Prove the novice flow locally with synthetic canaries only.

This sprint is correction and proof only. Do not create or request a real credential, call Supabase, run a retained-pilot operation, access Vercel, deploy, move aliases, authenticate to Production, commit, push or begin Sprint 029N. A later live retry requires separate Architect scope after 036E closes cleanly and is reviewed.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and Git top-level; both must equal it after normalizing Windows separators. Verify exactly one canonical worktree. Expected starting authority is closed 036D SHA `2b8bf17f180af85fef71748b367eb6215622ca9c`. The only expected Architect handoff changes are this Pack and `planning/STATUS.json`.

Dry-run/apply `planning/architect-packs/architect-pack-036E-beginner-safe-protected-interaction-correction.md`, verify exactly four generated files, then create only `codex/036E-beginner-safe-protected-interaction-correction` and execute from the generated files. Never use a retired legacy root, `C:\tmp`, deployment directory or alternate history.

Read the agent identity, `AGENTS.md`, all four generated 036E files, current state/status/roadmap/briefing, the complete closed 036D sprint and review, the exact wrapper/core/test, the protected-process runbook, workflow profile, design/messaging authority and current official Microsoft console-input documentation.

Before editing either script file, obey the mandatory code gate: post the exact file-by-file change plan, scope guards, acceptance criteria and assertion arithmetic, write `planning/STATUS.json` with phase `awaiting-approval`, and wait for the user's explicit approval of that exact plan.

The task contract is:

**objective:** Make the existing protected Management lifecycle beginner-safe with non-echoing non-secret controls and one unmistakable protected credential-entry moment.

**owns:** `scripts/Invoke-ProtectedManagementLifecycle036D.ps1`; `scripts/test-protected-management-lifecycle-036D.mjs`; orientation and semantic labels; non-echoing decision input; buffered-input refusal; creation/protected-input adjacency; possible-credential compensation; preservation of all inherited security controls; offline executable proof; proportional records.

**must_not:** Use a real credential or protected value; open/automate a provider page; call any external provider; run live Management/pilot operations; modify the 036D core, inherited tooling or any Product/runtime/package/schema/provider file; deploy or move aliases; inspect mailbox/OTP/session data; implement 029N; commit/push/merge/PR/force-push; claim live acceptance or Done.

**acceptance:** No plaintext `Read-Host` remains in the Management lifecycle; every non-secret control is text-labelled and non-echoing; every pre-creation decision finishes before creation is invited; creation instruction is immediately followed by the one protected `Read-Host -AsSecureString`; cancellation after creation instruction enters compensation/blocked state; inherited security controls remain executable; final suite passes at least 345 assertions with at least 50 new 036E interaction assertions; wrapper self-test and inherited 036C proof pass; zero external action occurs.

**verification:** Run these exact or execution-time equivalent commands and retain sanitized results:

`git worktree list --porcelain`

`git status --short --branch`

`git rev-parse HEAD`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036E-beginner-safe-protected-interaction-correction.md --dry-run`

`node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036E-beginner-safe-protected-interaction-correction.md`

`node scripts/test-protected-production-preflight-036C.mjs`

`node scripts/test-protected-management-lifecycle-036D.mjs`

`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/Invoke-ProtectedManagementLifecycle036D.ps1 -Operation SelfTest`

`git diff --name-status 2b8bf17f180af85fef71748b367eb6215622ca9c -- scripts/Invoke-ProtectedManagementLifecycle036D.ps1 scripts/test-protected-management-lifecycle-036D.mjs`

`git diff --name-status 2b8bf17f180af85fef71748b367eb6215622ca9c -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json supabase`

`npm run validate:static`

`npm run validate:json`

`git diff --check`

`git status --short`

Starting hashes are wrapper `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`, core `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1` and test `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`. The core must remain exact. Record new wrapper/test hashes at closeout.

Use a text-first orientation before any input. It must tell the operator not to create a credential yet, explain that non-secret controls never accept a credential and do not echo keys, identify the one future protected prompt, and explain create/use/revoke/invalidate ordering.

Replace ordinary non-secret text input with `[Console]::ReadKey($true)` or an equivalently proven intercepting ConsoleHost mechanism. Display exact accepted key choices but never echo or report the key pressed. Detect and non-echoingly drain unexpected buffered input where safely supported; otherwise fail closed before creation. Deterministic decision injection is for `SelfTest` only and must be refused by protected operations.

Complete account preflight, token-class, scope/risk, input-method, clipboard-safety and final-readiness decisions before creation is invited. Then print the token-name stem and `CREATE THE CREDENTIAL NOW`, immediately print `PROTECTED CREDENTIAL ENTRY`, and call `Read-Host -AsSecureString`. Remove the old plaintext creation confirmation. No ordinary input or acknowledgement may exist between creation instruction and protected entry.

If protected entry is cancelled after creation instruction, treat the credential as possibly created, run compensation/blocked handling and never claim a clean no-creation exit. Make revocation and retry acknowledgements non-echoing as well.

Do not weaken transcript/redirection refusal, trusted executable/SystemRoot checks, separate cleared child environments, same-token lifecycle ordering, request ceilings, body-blind invalidation, clipboard clearing, BSTR zeroing, `SecureString` disposal, compensation, output allowlists or no-automation/no-enumeration controls.

Extend the existing deterministic suite by at least 50 counted 036E interaction assertions and reach at least 345 total passing assertions. Report retained, replaced, new and final counts exactly. Use executable local subprocess proof for adjacency/cancellation, transcript refusal, environment equality and cleanup; combine it with current official semantics and exact source invariants for non-echoing/buffered keyboard behavior when a real interactive console cannot be driven safely. Synthetic canaries only; no network or real credential.

Use exact runtime-byte equality plus accepted Sprint 036D build evidence instead of rerunning a broad Product build when no Product/package byte changed. If any Product/runtime/provider change is required, stop for scope expansion.

Close only `beginner-safe-protected-interaction-corrected-clean` when every local interaction and security boundary passes. Otherwise use the exact proof-blocked or scope-change-required outcome. Refresh proportional records, preserve 036D's blocked live truth and stop. Do not perform a live retry or begin Sprint 029N.
