# Sprint 023I — Reparse-Safe Copy And Dependency Manifest

Disposable target: `C:\tmp\pnr-023i-build-proof-4bc681f42ef24d49a17dc873c8c865b3`.

The target was created new and empty as a direct `C:\tmp` child. Source was copied without `.next`, `node_modules`, `.vercel`, backup, log or environment-value material. The worktree `.git` pointer file was detected by the protected-path scan and removed before build. Final protected-path matches: zero.

The source manifest covered 750 files using relative path, byte size and SHA-256. Source/copy mismatches: zero. Dependencies were physically copied from the resolved local junction target with nested junction traversal excluded. Target `node_modules` and its descendants had zero reparse points. Required Node, Next, TypeScript, ESLint and package metadata existed. Offline top-level dependency integrity exited zero and did not change the controlled lockfile.

No `.env*`, `.git`, `.vercel`, credential/private-key/token file, uploaded evidence payload or production data was used. Build output was confined to the disposable target and telemetry was disabled for the build process.
