# Scripts

## Canonical Validation

- `npm run validate:json` — JSON parser self-test plus maintained project JSON.
- `npm run test:domain` — biochemistry scoring and recommendation fixtures.
- `npm run test:roles` — focused role/comment tests with only the known module-type warning suppressed at the command boundary.
- `npm run test:supabase-self` — exact credential-free Supabase harness self-tests; never execution harnesses.
- `npm run validate:static` — cross-platform PowerShell static validators for Sprints 019–021.
- `npm run lint` — ESLint.
- `npm run typecheck` — project TypeScript, no emit or incremental state.
- `npm run validate:ci` — fail-fast credential-free CI suite.
- `npm run validate:local` — the same substantive suite with the bounded one-retry page-generation rule.

`run-validation-suite.mjs` uses explicit command/argument allowlists, chooses Windows PowerShell locally and `pwsh` elsewhere, forwards process output, fails at the first gate, and excludes remote/protected execution harnesses.

## Workflow Utilities

Utility scripts for the Architect / Builder workflow live here. Start with `apply-architect-pack.js` when importing Architect Packs from `planning/architect-packs/`.

`run-validation-command.ps1` runs potentially hanging validation commands with a timeout and writes stdout/stderr to `.validation-logs/` by default. Use `-LogDir <path>` to choose a different relative or absolute log directory. If the requested directory cannot be created, the wrapper falls back to the user temp directory and prints `LOG_DIR_FALLBACK`.
