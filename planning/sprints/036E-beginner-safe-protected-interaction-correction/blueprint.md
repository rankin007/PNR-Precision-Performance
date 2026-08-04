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
