# Sprint 036E Acceptance

Closeout: `beginner-safe-protected-interaction-corrected-clean` on 2026-08-04. Every criterion below passed with local/offline evidence; no live or external action occurred.

## Canonical and handoff baseline

- [x] Current directory and Git top-level equal the permanent canonical repository after Windows separator normalization.
- [x] Exactly one canonical worktree registration exists; no retired, temporary or alternate workspace is used.
- [x] Starting authority is exact closed 036D SHA `2b8bf17f180af85fef71748b367eb6215622ca9c`.
- [x] Pre-branch changes are exactly this Architect Pack and `planning/STATUS.json`.
- [x] Pack dry-run/apply/post-dry-run reports exactly four Sprint 036E files.
- [x] Only `codex/036E-beginner-safe-protected-interaction-correction` is used.

## Starting implementation authority

- [x] Starting wrapper SHA-256 is `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`.
- [x] Starting core SHA-256 is `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`.
- [x] Starting test SHA-256 is `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`.
- [x] The accepted 295-assertion 036D suite and wrapper self-test baseline are reproduced or an equally strong safe baseline explanation is recorded before edits.
- [x] Closed 036D live truth remains explicitly blocked and is not rewritten as clean.

## Exact scope

- [x] Implementation changes are exactly `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` and `scripts/test-protected-management-lifecycle-036D.mjs`.
- [x] `scripts/protected-management-lifecycle-036D-core.mjs` remains byte-identical at the approved hash.
- [x] Existing 036C and 035K tooling remains unchanged.
- [x] Application, component, library, public, package, lockfile, Next/Vercel runtime, migration and provider configuration paths have zero difference from the starting SHA.
- [x] No runtime module imports 036C/036D operations tooling.
- [x] No new dependency, executable, browser driver, service, provider adapter or credential store is added.

## Beginner orientation

- [x] A plain-language numbered orientation appears before any decision input.
- [x] It says `DO NOT CREATE A CREDENTIAL YET` before all pre-creation decisions.
- [x] It explains that non-secret controls never accept a credential and do not echo keys.
- [x] It identifies one and only one future `PROTECTED CREDENTIAL ENTRY` prompt.
- [x] It explains create/use/revoke/invalidate ordering and the fail-closed consequence of ambiguity.
- [x] Every safety distinction is expressed in text and does not depend on color.

## Non-secret controls

- [x] The Management lifecycle contains no ordinary plaintext `Read-Host` input.
- [x] Every non-secret decision uses `[Console]::ReadKey($true)` or an execution-time equivalent proven not to display the pressed key.
- [x] Every control is visibly labelled `NON-SECRET CONTROL` and says never to type or paste a credential there.
- [x] Accepted keys are bounded and displayed before input.
- [x] Wrong keys return only fixed sanitized codes and never print the key/character.
- [x] Unexpected queued/buffered input is detected and drained without echo or the environment fails closed before creation is invited.
- [x] Console-input proof failure stops before any creation instruction.
- [x] Non-secret deterministic injection remains exclusive to `SelfTest` and is refused under protected operations.

## Creation-to-protected-entry ordering

- [x] Account preflight, token class, scope/risk, input method, clipboard safety and final readiness all complete before creation is invited.
- [x] Final pre-creation text says the next prompt is the only credential-entry location.
- [x] The wrapper emits the exact non-secret token-name stem and `CREATE THE CREDENTIAL NOW` only after all non-secret controls pass.
- [x] The creation instruction is immediately followed by one `Read-Host -AsSecureString` prompt labelled `PROTECTED CREDENTIAL ENTRY`.
- [x] The old plaintext creation confirmation is absent.
- [x] No ordinary acknowledgement, input or unrelated action exists between creation instruction and protected entry.
- [x] A non-empty protected value is required before normal provider-pass flow could continue in a later sprint.
- [x] Cancellation/empty input after creation instruction sets possible-credential risk and enters compensation/blocked handling.

## Post-input safety and inherited controls

- [x] Revocation/list-absence acknowledgement is non-echoing and unmistakably non-secret.
- [x] Justified invalidation-retry choice is non-echoing and unmistakably non-secret.
- [x] Every post-creation or possible-creation failure reaches compensation before protected-state disposal.
- [x] Missing protected value after creation instruction cannot produce a clean no-creation result.
- [x] Transcript, noninteractive and redirected-stream refusal remains before creation instruction.
- [x] Absolute Node and SystemRoot validation remains exact.
- [x] Management and service-role child environments remain separate, exact and cleared.
- [x] BSTR zeroing, `SecureString` disposal, process disposal and finally-path cleanup remain executable.
- [x] Clipboard paste safety and clearing without inspection remain enforced.
- [x] Provider/invalidation endpoint, request ceiling, 401/403-only invalidation and response-body non-read remain unchanged.
- [x] Output keys and failure codes remain allowlisted and sanitized.
- [x] No token-page automation, account API, Auth user surface, user list or identity enumeration exists.

## Executable novice-flow proof

- [x] Final deterministic suite passes at least 345 counted assertions with zero failures.
- [x] At least 50 assertions are new 036E interaction proof.
- [x] Retained, replaced, new and final assertion counts are reported with exact arithmetic.
- [x] Executable local subprocess proof plus official mechanism/source invariants cover non-echoing accepted/wrong keys; no real keyboard-driving requirement is imposed when it would need protected input or manual intervention.
- [x] Executable local subprocess proof covers buffered-input refusal/drain or an exact documented official-semantics/source/deterministic substitute.
- [x] Executable local subprocess proof covers creation/protected-input adjacency and cancellation compensation.
- [x] Executable local subprocess proof covers transcript/redirection refusal before creation instruction.
- [x] Executable local subprocess proof covers protected-child environment equality and cleanup.
- [x] Credential, JWT, password, email, UUID, SMTP, account and identity canaries never appear in stdout, stderr, exceptions, files or Git.
- [x] `SelfTest` performs zero network, provider, browser, credential, mailbox, OTP, deployment or alias action.
- [x] Wrapper `SelfTest` passes with fixed sanitized output.
- [x] Inherited 036C suite passes all 135 assertions.

## Repository and proportional validation

- [x] `npm run validate:static` passes.
- [x] `npm run validate:json` passes and `planning/STATUS.json` remains valid JSON.
- [x] `git diff --check` passes.
- [x] Exact approved-file diff, UTF-8/no-BOM/final-line and generated-artifact checks pass.
- [x] High-confidence secret and protected-data scans pass without emitting candidate values.
- [x] Runtime-byte comparison against the starting SHA is empty.
- [x] Accepted Sprint 036D Product build evidence is used only because runtime/package bytes are exact; no new Product readiness claim is made.
- [x] Final protected process/environment/temp-artifact residue is zero.

## External and live boundary

- [x] No real credential, service-role value, email, OTP, session or private identifier is requested or used.
- [x] No Supabase/provider page is opened or automated.
- [x] No provider/API request occurs.
- [x] `ManagementLifecycle` and `RetainedPilotVerify` are not invoked with live values.
- [x] No Vercel command, candidate staging, deployment, alias mutation, rollback or Production authentication occurs.
- [x] No commit, push, merge, PR, `develop` push or force-push occurs unless separately requested by the user outside this Pack.
- [x] Sprint 029N remains unstarted.

## Records and closeout

- [x] Review records exact before/after wrapper/test hashes and unchanged core hash.
- [x] Review records assertion arithmetic, executable cases and exact zero-external-action ledger.
- [x] Current state/status/roadmap/lifecycle/schedule/evidence/briefing agree proportionally.
- [x] Protected-process runbook is updated only with behavior proven by executable evidence.
- [x] Operations handoff does not claim a live credential lifecycle or release result.
- [x] Sprint 036D remains `production-management-access-revocation-blocked` as historical live truth.
- [x] Sprint 036E closes only at one permitted outcome and grants no live retry authority.
- [x] Product-wide Done and stable live trainer access remain unclaimed.

## Permitted outcomes

- `beginner-safe-protected-interaction-corrected-clean`
- `beginner-safe-protected-interaction-proof-blocked-clean`
- `beginner-safe-protected-interaction-scope-change-required`

Only `beginner-safe-protected-interaction-corrected-clean` establishes that the local human-factors correction is ready for later Architect review. It does not complete the Management credential lifecycle or live trainer-access gate.
