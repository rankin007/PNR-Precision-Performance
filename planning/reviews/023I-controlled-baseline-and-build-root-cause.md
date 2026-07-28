# Sprint 023I — Controlled Baseline And Build Root Cause

The controlled worktree remained `C:\tmp\pnr-023e-local-upload-storage`, branch `codex/023E-local-upload-and-storage-implementation-and-proof`, baseline `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`, with an empty index and the complete approved 023E–023I porcelain inventory.

All pre-copy gates passed: focused 023H behavior, cache-independent full ESLint, TypeScript, full static, focused 023E, 023F portability and 023G ledger tests. Migrations 0001–0017 and lockfiles were unchanged; candidate 0018 remained the sole migration diff. No validation-owned build process remained.

`node_modules` was confirmed as a junction to `C:\Users\rrank\OneDrive\PNR Precision Performance\node_modules`. The controlled and dependency-source root lockfiles have different byte hashes, so agreement was verified semantically and offline: `npm ls --depth=0 --offline` exited zero; all 446 controlled lock package entries had zero version mismatches; 60 absent entries were all optional non-Windows packages; no non-optional controlled package was missing. No installation, update or network access occurred.

The two prior 023H builds emitted no source/compiler error. Sprint 023I confirmed their dependency/build path was not physically reparse-isolated, establishing the junction as the environment distinction tested by this sprint.
