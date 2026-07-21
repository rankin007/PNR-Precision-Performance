# Sprint 021I - Credential Boundary And Build Preflight Blueprint

## Phase 1: Source Lock

1. Read all authority and verify the applied four-file sprint matches this Pack.
2. Inventory the dirty worktree and protect unrelated changes.
3. Record sanitized runtime/tool versions, build command, configured/missing environment-variable names, and resource status.
4. Confirm the approved file set and zero-mutation boundary.

## Phase 2: Production Build Diagnosis

1. Run the existing production build once.
2. If it fails without useful diagnostics, rerun once using supported verbose/debug diagnostics with unchanged source/configuration/dependencies.
3. If the diagnostic run succeeds after an initial failure, run one unchanged confirmation build.
4. Record sanitized evidence and stop `build-blocked-clean` if a code/configuration/dependency correction is required.
5. Do not proceed to protected acquisition unless the build gate passes.

## Phase 3: Acquisition-Mechanism Inventory

1. Check safe existing process/credential-store injection capabilities without reading values.
2. Check whether the signed-in exact-candidate provider surface supports direct transfer to protected process memory without snapshot, DOM-output, clipboard, command-line, or file exposure.
3. Check any other already available protected-input mechanism against the same boundary.
4. Record supported/unsupported status only.

## Phase 4: Bounded Protected Verification

1. Confirm exact candidate and refuse old/unexpected targets.
2. If and only if a compliant mechanism exists, acquire the candidate secret into one protected process.
3. Verify only presence, candidate-host equality, and non-reversible category status.
4. Make no secret-backed remote request and create no remote state.
5. Return sanitized status only, clear all protected state immediately, and verify clearing.
6. If no compliant mechanism exists, close `credential-boundary-blocked-clean` without requesting operator credential handling.

## Phase 5: Closeout

1. Prove zero run ID, identities, sessions, fixtures, callbacks, Storage objects, and remote mutations.
2. Record the exact outcome and smallest next scope.
3. Annotate every acceptance criterion.
4. Run redacted scans, approved-diff review, JSON checks, and `git diff --check`.
5. Refresh state, status, schedule, progress, risks/questions/decisions as directly relevant, and the Architect briefing.
