============================================================
FILE: planning/sprints/021I-credential-boundary-corrected-authenticated-proof/requirements.md
============================================================

# Sprint 021I - Credential Boundary And Build Preflight Requirements

## Objective

Establish whether the project is ready for a later authenticated role/RLS/application proof by resolving two preflight uncertainties left by Sprint 021H:

1. obtain a successful, repeatable production build or a useful sanitized diagnosis of the page-data worker failure; and
2. prove or disprove a supported mechanism that can transfer the exact candidate secret directly into protected process memory without returning, retaining, or reproducing protected material in tool output or durable artifacts.

Sprint 021I is enabling and nonmutating. It does not perform authenticated proof, select a proof run, create identities or sessions, create fixtures, change callbacks, or mutate either Supabase project. Full authenticated proof requires a later Sprint 021J Architect Pack if 021I closes ready.

## Workflow Profile

`strict`

## Authoritative Sources

- `AGENTS.md`
- `planning/STATE.md`, `planning/STATUS.json`, and `planning/ARCHITECT_BRIEFING.md`
- Sprint 021 and 021B-021H applied artifacts and reviews
- `planning/reviews/021H-authenticated-proof-results.md`
- `docs/SPRINT_021_PROGRESS.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- current package scripts, build configuration, and application source as read-only diagnostic inputs
- `scripts/supabase-authenticated-proof-021H.mjs` and its focused self-test as read-only safety references

Sprint 021H remains closed `blocked-clean`. A transiently visible Supabase publishable key is client-public configuration, not a secret/service-role credential. Its appearance violated the 021H evidence allowlist but does not by itself establish secret compromise.

## Required Outcome Classes

Close with exactly one:

- **preflight-ready-clean**: the production build passes on the required confirmation run, and an exact-candidate protected acquisition mechanism passes all non-disclosure, lifecycle, target, and clearing checks without remote mutation;
- **build-blocked-clean**: the build failure is reproducible or cannot be cleared without an application/configuration/dependency change outside 021I, with no protected access or remote mutation;
- **credential-boundary-blocked-clean**: the build passes, but no supported exact-candidate acquisition mechanism can satisfy the protected-output boundary, with no secret access retained and no remote mutation; or
- **blocked-clean**: an earlier environmental/tooling condition prevents a conclusive preflight while zero remote mutation and cleared protected state are proved.

No outcome from 021I means authenticated role/RLS/application proof passed. Incomplete protected-state clearing is an active incident, not a closeout outcome.

## Credential Classification And Evidence Boundary

### Publishable configuration

- Treat a Supabase publishable key as client-public configuration.
- Its incidental visibility alone does not trigger secret containment or rotation.
- Do not deliberately print, quote, copy, persist, screenshot, or reproduce its value in conversation, logs, reports, tests, or retained artifacts.
- Durable evidence may record only `publishable_configuration_present=yes|no` and exact candidate-host equality.

### Protected material

The secret/service-role key, access and refresh tokens, cookies, generated Auth artifacts, Auth UUIDs, private identifiers, and any credential-store payload are protected.

- Never return protected material through browser snapshots, DOM inspection output, shell output, command arguments, logs, screenshots, clipboard instructions, conversation, or files.
- Never write protected material to `.env`, `.env.local`, repository files, temporary files, documents, or shell history.
- A permitted mechanism must acquire from the exact candidate directly into a single protected process and expose only sanitized booleans/status classes.
- Do not reveal a secret in a surface that must subsequently be snapshotted or inspected to retrieve it.
- Clear protected variables, handles, reveal state, sessions, and process memory immediately after the bounded verification or any stop.
- Any protected output triggers immediate stop, containment, protected-state clearing, and evidence-safe incident recording.

## Production Build Gate

Builder must diagnose before protected credential work.

1. Record Node/package-manager versions, build command, relevant configured/missing environment-variable names, available memory/disk status, and worktree identity without values or secret fragments.
2. Run the repository production build once with the existing source, dependencies, and configuration.
3. If it fails without a useful diagnostic, rerun once using supported verbose/debug diagnostics and an otherwise unchanged worktree.
4. If the failure appears transient and the diagnostic run succeeds, run one unchanged confirmation build. `preflight-ready-clean` requires that confirmation build to pass.
5. Do not delete caches broadly, install/update packages, edit application/configuration/dependencies, or suppress/skip build stages.
6. If a reproducible correction is required, record the smallest evidence-backed corrective scope and close `build-blocked-clean`. A separate follow-up Pack must authorize any source/configuration/dependency fix.

Do not access or reveal protected credentials unless the build gate passes.

## Protected Acquisition Feasibility Gate

After the build gate passes, inventory supported acquisition routes in this order:

1. an already configured process or system credential store that can inject the exact candidate secret without returning its value;
2. a signed-in exact-candidate provider/dashboard mechanism that can transfer directly into protected process memory without snapshot, DOM-output, clipboard, command-line, or file exposure; and
3. another supported local protected-input mechanism already available in the environment that meets every boundary above.

For a candidate mechanism:

- verify the target project is exactly `uvskssaecdhxcgytkasc` before any protected read;
- refuse protected old project `tagnbgkroihagjmvehlx` and every unexpected project;
- verify only presence, candidate-host equality, and a non-reversible length/category status inside the protected process;
- perform no Admin API, Auth, database, Storage, callback, provider-setting, or other remote request with the secret;
- return only sanitized pass/fail status and clearing confirmation;
- immediately clear all protected state and close any reveal surface;
- do not select or reserve a run ID.

If no mechanism satisfies these requirements, do not ask the operator to paste, dictate, upload, or run a command containing a credential. Close `credential-boundary-blocked-clean` with the exact capability gap.

## Immutable Remote Boundary

- Candidate reference: `uvskssaecdhxcgytkasc`; metadata-only target confirmation is allowed.
- Absolute refusal target: old project `tagnbgkroihagjmvehlx` and every unexpected project.
- No remote data/configuration mutation is permitted.
- No Auth identities, sessions, generated links, OTPs, application fixtures, Storage artifacts, run anchors, or test run IDs may be created.
- No callback, Site URL, provider, hosted Auth, exposed-schema, plan, billing, or credential changes may occur.
- Do not query protected old-project application data or acquire its credentials.
- Production cutover, deployment, DNS, and public reopening remain unauthorized.

## Required Durable Evidence

Create a concise results record containing:

- sanitized build commands, exit classes, and useful diagnostic summary;
- whether the failure reproduced and whether the confirmation build passed;
- acquisition mechanisms assessed and their supported/unsupported status without protected values;
- exact-candidate/refusal checks;
- protected-output and clearing results;
- explicit zero remote mutation and zero created-state statement;
- one exact outcome class;
- the smallest next scope: 021J authenticated proof if ready, a build-correction Pack if build-blocked, or a credential-boundary capability decision if acquisition-blocked.

## Approved File Set

Builder may create/update only:

- new `scripts/test-protected-acquisition-021I.mjs` if a local non-secret/refusal/clearing self-test is needed;
- new `planning/reviews/021I-build-and-credential-boundary-preflight-results.md`;
- the applied 021I acceptance annotations;
- `docs/SPRINT_021_PROGRESS.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`;
- directly relevant 021I entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

No application, library, component, migration, bootstrap, verification SQL, configuration, dependency, infrastructure, environment, prior harness, prior test, or prior sprint evidence file may be edited.

## Validation

- Architect Pack identity and approved-file diff checks pass.
- Production build follows the bounded diagnostic sequence.
- Any new self-test passes target refusal, protected-output refusal, sanitized-status allowlist, no-file/no-command-argument handling, and clearing behavior.
- JSON records parse where applicable.
- Redacted scans find no credential, token, cookie, private identifier, value fragment, routable address, or plaintext credential artifact introduced by 021I.
- `git diff --check` passes for approved 021I changes.
- Every acceptance item is annotated exactly once as `pass`, `fail`, or `not-run`; failed and not-run items remain unchecked.

## Prohibitions

- authenticated role/RLS/application assertions or any claim that they passed;
- test run selection/reservation, synthetic identity/session/fixture creation, email, mailbox, message, OTP, generated-link, or passwordless callback work;
- remote mutation or secret-backed remote requests;
- secret/token/cookie/private-identifier output or persistence;
- application/configuration/dependency edits, cache deletion, package installation, migration 0013, schema/RLS/policy/helper/grant changes;
- deployment, cutover, DNS, production mutation, old-project mutation, stage, commit, push, or PR.

## Manual Intervention Rule

No manual intervention is expected. If tooling cannot provide a protected acquisition mechanism, Builder must record:

- what capability is unavailable;
- the evidence and safe alternatives already checked;
- why operator credential entry, copying, commands, or disclosure would violate the boundary;
- the exact non-secret product/tooling capability or Architect decision needed next; and
- what a later Builder would verify after that capability exists.

Builder must not request credentials, addresses, tokens, links, private identifiers, or commands containing them.

============================================================
FILE: planning/sprints/021I-credential-boundary-corrected-authenticated-proof/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/021I-credential-boundary-corrected-authenticated-proof/acceptance.md
============================================================

# Sprint 021I - Credential Boundary And Build Preflight Acceptance

- [ ] Applied four-file sprint matches this Pack.
- [ ] Existing dirty-worktree changes are inventoried and unrelated changes remain untouched.
- [ ] Runtime/tool versions, build command, environment-name status, and resource status are recorded without values or secret fragments.
- [ ] Initial production build is run with unchanged source, configuration, and dependencies.
- [ ] An undiagnosed initial failure receives at most one supported verbose/debug rerun.
- [ ] A transiently successful diagnostic rerun is followed by one unchanged successful confirmation build.
- [ ] No cache deletion, package installation/update, source/configuration/dependency change, or build-stage suppression occurs.
- [ ] Build result is conclusive and any required correction is reduced to the smallest evidence-backed future scope.
- [ ] Publishable-key visibility is correctly classified as client-public configuration and its value is not deliberately retained or reproduced.
- [ ] Supported protected-acquisition routes are assessed in the required order without reading or returning credential values during inventory.
- [ ] Exact candidate is confirmed and old/unexpected projects are refused before any protected read.
- [ ] Any protected verification exposes only presence, candidate-host equality, non-reversible category status, and clearing confirmation.
- [ ] No secret/service key, token, cookie, generated artifact, Auth UUID, private identifier, credential value, or value fragment is emitted or retained.
- [ ] Protected variables, handles, reveal state, sessions, and process memory are cleared after the bounded check or any stop.
- [ ] No secret-backed remote request or remote mutation occurs.
- [ ] No run ID, identity, session, fixture, callback change, Storage object, deployment, cutover, or old-project access/mutation occurs.
- [ ] Authenticated role/RLS/application proof is explicitly recorded as not performed and not implied.
- [ ] Outcome is exactly `preflight-ready-clean`, `build-blocked-clean`, `credential-boundary-blocked-clean`, or `blocked-clean` and matches evidence.
- [ ] Required manual-intervention information is recorded if a capability gap remains, without requesting credential handling.
- [ ] Results, acceptance, state, status, progress, schedule, decisions/risks/questions, and Architect briefing agree.
- [ ] Closing Pack identity, tests as applicable, JSON, redacted scans, approved diff, and `git diff --check` pass.

Builder must annotate every item exactly once as `pass`, `fail`, or `not-run` with named evidence or reason. Failed and not-run items remain unchecked.

============================================================
FILE: planning/sprints/021I-credential-boundary-corrected-authenticated-proof/handoff-prompt.md
============================================================

# Sprint 021I - Builder Handoff Prompt

You are Builder for Sprint `021I-credential-boundary-corrected-authenticated-proof` under the strict profile.

Apply this Pack, verify the four generated sprint files, and execute only from those sprint files.

This is a nonmutating enabling preflight. Diagnose the production-build result first using the bounded initial, diagnostic, and confirmation sequence. Do not edit source, configuration, dependencies, or caches to make the build pass. Stop `build-blocked-clean` with the smallest evidence-backed corrective scope if a change is required.

Only after the build gate passes, assess whether an existing supported mechanism can transfer the exact candidate secret directly into protected process memory without snapshot, DOM-output, clipboard, command-line, file, log, tool-output, or conversation exposure. Treat publishable configuration as client-public but do not deliberately retain or reproduce its value. Protected material must never be emitted or persisted.

Target metadata only for candidate `uvskssaecdhxcgytkasc`; refuse old project `tagnbgkroihagjmvehlx` and all unexpected targets. If a compliant acquisition mechanism exists, perform only the bounded in-process presence/candidate/category verification, return sanitized statuses, make no secret-backed remote request, and clear all protected state immediately. If none exists, close `credential-boundary-blocked-clean` and record the capability gap without asking the operator to handle credentials or credential-bearing commands.

Do not select a run ID or create Auth identities, sessions, fixtures, links, OTPs, callbacks, Storage objects, or any remote state. Do not run authenticated role/RLS/application assertions. Do not deploy, cut over, mutate production, access old-project application data, install packages, stage, commit, push, or create a PR.

Close with exactly `preflight-ready-clean`, `build-blocked-clean`, `credential-boundary-blocked-clean`, or `blocked-clean`. Annotate every acceptance item and leave a clear recommendation: a separate 021J authenticated-proof Pack only if preflight is ready, otherwise the smallest corrective or capability-decision scope.
