# Sprint 036E Beginner-Safe Protected Interaction Correction Review

Date: 2026-08-04

Checkpoint: `beginner-safe-protected-interaction-corrected-clean`

## Executive result

Sprint 036E corrected the local human-factors defect that closed Sprint 036D blocked. The Management lifecycle now presents a six-step beginner orientation, labels every ordinary decision as a `NON-SECRET CONTROL`, accepts decisions only through intercepted single-key input, refuses and non-echoingly drains unexpected buffered input, and finishes all decisions before inviting credential creation.

The exact token-name stem and `CREATE THE CREDENTIAL NOW` instruction now transition directly through the single `PROTECTED CREDENTIAL ENTRY` label to `Read-Host -AsSecureString`. The former plaintext creation confirmation is absent. Cancellation after the instruction records possible-credential risk and reaches the existing compensation/blocked path.

This is local/offline correction proof only. No credential, provider page, API request, retained-pilot operation, Vercel command, deployment, alias, OTP, mailbox, session or Production action occurred. Sprint 036D remains historically `production-management-access-revocation-blocked`; 036E does not supply the missing same-token invalidation evidence or authorize a live retry.

## Canonical and Pack authority

- Current directory and Git top-level resolve exactly to `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- Exactly one canonical worktree is registered.
- Starting authority is exact closed Sprint 036D SHA `2b8bf17f180af85fef71748b367eb6215622ca9c`.
- The Pack dry-run created no files and named exactly four targets; application created exactly `requirements.md`, `blueprint.md`, `acceptance.md` and `handoff-prompt.md`; post-application dry-run named exactly the same four update targets.
- Only `codex/036E-beginner-safe-protected-interaction-correction` was used.
- No stage, commit, push, merge, pull request, `develop` push or force-push occurred.

## Exact implementation

- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1`
  - branch-bound to Sprint 036E;
  - adds the numbered beginner orientation and mandatory semantic labels;
  - replaces plaintext Management decisions with one `Console.ReadKey(true)` reader;
  - checks `Console.KeyAvailable` before and after the accepted key, drains through the same intercepting reader and fails fixed/sanitized on buffer or console-state ambiguity;
  - keeps deterministic input exclusive to `SelfTest`;
  - moves the token-name/create instruction to the final pre-creation boundary;
  - makes revocation and justified-retry controls non-echoing; and
  - preserves transcript, redirection, trusted executable/SystemRoot, child-environment, clipboard, compensation, request-ceiling, BSTR, `SecureString` and process cleanup controls.
- `scripts/test-protected-management-lifecycle-036D.mjs`
  - replaces three obsolete 036D interaction expectations;
  - adds 65 counted 036E interaction assertions;
  - executably covers accepted, wrong, pre-buffered and post-read-buffered decisions, orientation-before-input, creation/protected-entry adjacency and cancellation compensation; and
  - retains inherited request, sanitization, transcript, environment-isolation, canary and cleanup proof.

No other implementation file changed. The 036D core, every inherited 036C/035K file, Product/runtime/package/configuration/migration path and runtime import graph remain unchanged.

## Mechanism reconciliation

Installed execution authority is Windows PowerShell `5.1.26100.8972`, Desktop edition, CLR `4.0.30319.42000`. Runtime reflection proves `Console.ReadKey(Boolean)`, `Console.KeyAvailable` and `Read-Host -AsSecureString` are available.

Current official Microsoft documentation states that `Console.ReadKey(true)` intercepts the pressed key so it is not displayed, `Console.KeyAvailable` reports whether a key press is queued and fails when console input state is unsuitable, and `Read-Host -AsSecureString` returns a `SecureString` while masking typed characters:

- https://learn.microsoft.com/en-us/dotnet/api/system.console.readkey?view=netframework-4.8.1
- https://learn.microsoft.com/en-us/dotnet/api/system.console.keyavailable?view=netframework-4.8.1
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/read-host?view=powershell-7.5

Executable local scenarios and exact source invariants supplement those official semantics without driving a real keyboard or requiring manual intervention.

## Assertion arithmetic and focused proof

- Accepted Sprint 036D baseline: 295 assertions at the exact starting wrapper/core/test hashes and closed Sprint 036D evidence.
- Baseline-equivalent final group: 292 retained assertions plus three one-for-one replacements.
- Sprint 036E additive interaction proof: 65 new assertions.
- Final corrected suite: `292 + 3 + 65 = 360` passing, zero failing.
- Inherited Sprint 036C provider suite: 135 passing, zero failing.
- Counted Sprint 036E total: `360 + 135 = 495` passing, zero failing.
- Uncounted self-tests: unchanged core five checks and wrapper two checks passed with `protectedValuesEmitted=false` and `remoteMutation=none`.

The pre-edit 295 suite was not rerun after branch creation because the accepted wrapper was intentionally hard-bound to the closed 036D branch. Exact starting hashes, the committed 036D closeout evidence and the unchanged core self-test supplied the approved safe baseline substitute; the final branch-bound corrected suite then passed all 360 assertions.

## Repository and integrity proof

- `npm run validate:static` passed, including encoding validation across 1,017 maintained text files and all maintained static validators.
- `npm run validate:json` passed eight validator self-test cases and all seven maintained JSON files.
- PowerShell parser proof passed.
- `git diff --check` passed.
- Runtime-byte comparison from starting SHA across `app`, `components`, `lib`, `public`, package/lockfile, Next/TypeScript/Vercel configuration and `supabase` is empty.
- No runtime module imports 036C/036D operations tooling.
- The Management lifecycle contains exactly two `Read-Host` occurrences and both use `-AsSecureString`; plaintext count is zero.
- High-confidence secret and private-email scans of the implementation diff returned zero matches.
- Protected process-environment residue and `pp036d-*` temporary-directory residue are zero.
- Accepted Sprint 036D Product-build evidence remains applicable because Product/runtime/package bytes are exact; no broad Product build was rerun for ceremony and no new Product readiness claim is made.

## Hash authority

- Starting wrapper: `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`.
- Final wrapper: `5DF552844AF0AAEDF9FFFDDBD0E63EE539238CA5D65BE4486CBB21F12042BB4D`.
- Unchanged core: `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`.
- Starting test: `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`.
- Final test: `04D78E23AB3DFC897C8084CD3CE25228AB4A9E400618AF1EEF07B8187006C27F`.

## External-action ledger

- Real credentials requested/received/used: `0`.
- Provider pages opened or automated: `0`.
- Provider/API/network requests: `0`.
- Retained-pilot/live Management operations: `0`.
- Vercel/deployment/alias/rollback actions: `0`.
- Mailbox/OTP/session/Production actions: `0`.
- Schema/Auth/configuration/identity/fixture/data/Storage/DNS mutations: `0`.
- Commits/pushes/merges/PRs: `0`.

## Final disposition

Sprint 036E closes `beginner-safe-protected-interaction-corrected-clean`. The local protected interaction is ready for Architect review. Deliberate non-promotion remains in force, Sprint 029N remains gated, and any real Management lifecycle retry requires a separately scoped future Architect Pack and explicit authority.
