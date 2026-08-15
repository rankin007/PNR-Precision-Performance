# Sprint 033B implementation evidence

Date: 2026-08-12

## Counted local proof

- Operational ownership, incident, privacy and restoration assertions: `130/130`.
- Local migration-ledger assertions: `42/42`.
- Retained managed-role journeys: `157/157`.
- Retained Owner read-only journey: `36/36`.
- Retained focused role/comment assertions: `27/27`.
- Total counted proof: `130 + 42 + 157 + 36 + 27 = 392/392`.
- The standalone restoration rehearsal passed `17/17`; it is supporting scenario evidence and is not added again to the 392 counted total.

## Restoration boundary

The rehearsal is synthetic, non-production, same-process and logical only. It uses three related synthetic database tables and two separately inventoried synthetic Storage objects. It does not use PostgreSQL restore, a Supabase provider backup, hosted Storage export, a provider account, Production data or Production runtime. Provider-native and Production restoration remain unproven.

Database and Storage packages are separate AES-256-GCM packages. Each receives a fresh, distinct 12-byte IV. Injected IV reuse is rejected before encryption or restore. Package authentication, migration head, counts, relationships, safe paths, byte counts and SHA-256 hashes are checked. The owned process key buffer is unreported, unpersisted and zeroed during cleanup; no claim is made that every native/runtime copy is erased.

The matrix contains one successful restoration and sixteen controlled failures, including corruption of both database and Storage ciphertexts, wrong key, wrong tag, IV reuse, missing/extra rows, broken relationships, wrong migration head, missing/extra/changed objects, missing/changed contentType metadata, traversal, absolute path and manifest disagreement. All 17 cases reported zero owned temporary residue. The sanitized aggregate is in `rehearsal-summary.json`.

## Migration truth

The registered clean-rebuild validator reports the candidate repository chain as locally aligned through `0025`, with `0024` and `0025` local-only and applied/remote status uninspected. Historical unregistered 023G-era fixed-head tests are not cited as current proof.

## Retained and quality gates

The retained evidence-management privacy contract, validation-orchestrator self-test, JSON self-test and maintained JSON files passed. Encoding and all registered local static validators passed. Typecheck, lint and the Next.js production build passed with zero lint warnings or errors.

## In-scope corrections during proof

- The rehearsal CLI initially passed a label to Node's callback-shaped random-byte API; the pure local harness wrapper was corrected to request bytes by length only.
- The migration negative fixture initially changed only the first duplicate marker occurrence; it was corrected to replace all occurrences so the discriminating test reaches the intended marker-integrity boundary.

Neither correction changed Product behavior, schema, migrations, RLS, roles, permissions, dependencies or lockfiles. No provider, remote or Production state was accessed or mutated.

## Final closeout

Final human-authorized read-only inspection/readback passed after INSPECT-006 corrected only the stale no-double-count arithmetic claim. AC-01 through AC-40 pass. Final staged/external/residue counts are `0/0/0`. O08/O10/L08 strengthen locally; L04/L09 and provider-native/Production/private MFA/legal/customer/representative/036K/Product-wide Done limitations remain open.
