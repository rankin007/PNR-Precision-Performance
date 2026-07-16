# Scripts

Utility scripts for the Architect / Builder workflow live here. Start with `apply-architect-pack.js` when importing Architect Packs from `planning/architect-packs/`.

`run-validation-command.ps1` runs potentially hanging validation commands with a timeout and writes stdout/stderr to `.validation-logs/` by default. Use `-LogDir <path>` to choose a different relative or absolute log directory. If the requested directory cannot be created, the wrapper falls back to the user temp directory and prints `LOG_DIR_FALLBACK`.
