# Sprint 029V Requirements — Vercel Agent Envelope and Alias-Isolation Recovery

## Outcome

Reach exactly one terminal record:

- `agent-envelope-alias-isolation-readiness-recovered-clean`: one exact-source Ready Production-targeted 029V candidate passes the retained disabled-public-gate and dedicated SMTP no-send readiness sequence, remains zero-alias, accepted Sprint 036L remains five-alias live, and automatic custom-domain assignment remains persistently false pending a separately approved promotion; or
- `agent-envelope-alias-isolation-blocked-clean`: the first material gate fails, every safely compensable 029V-owned resource is removed, accepted Sprint 036L remains five-alias live, and no email, enquiry row, activation, data, migration, generic-SMTP, or alias-command effect occurs. The setting remains original true only when the sprint stops before the freeze; once frozen it remains persistently false pending a separately approved promotion; or
- `agent-envelope-alias-isolation-blocked-material`: routing, the project setting, a competing deployment, or any 029V-owned provider key, environment row, credential, candidate, deployment, or cleanup state cannot be proved safe and terminal. Keep automatic assignment false when it was already frozen, perform only independently safe non-routing compensation, record exact sanitized state and residue, and stop for fresh human authority. Never select a clean outcome while any such condition is unresolved.

Sprint 029R remains conditional. Sprint 029V never activates public enquiry delivery.

## Canonical and dirty-work boundary

- Before every mutation phase, both the current directory and `git rev-parse --show-toplevel` must equal `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- HEAD starts and remains `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`; this sprint does not commit.
- Create/switch to `codex/029V-vercel-agent-envelope-and-alias-isolation-recovery` while carrying the complete user-owned dirty workspace unchanged.
- Record and reconcile branch, HEAD, staged count, tracked-modified name/SHA-256 manifest, and untracked name/SHA-256 manifest before and after switching. Only enumerated 029V Pack/generated files may differ.
- Do not stash, reset, clean, copy from a legacy clone, use `C:\tmp`, create a worktree, normalize unrelated files, or stage anything.

## Verified starting truth

- Sprint 029U closed `operator-isolated-readiness-blocked-clean` with 1004/1004 local proof and two critical reviews passing.
- Its one deploy created `dpl_DDvEvguz8Ur5yJgnbWG9XdwAssdK`, but the exact controller refused Vercel CLI's changed agent-mode JSON before adoption. No retry or HTTP proof sequence occurred.
- Three stable aliases then targeted an unrelated Production deployment despite the candidate command carrying `--skip-domain`. The user separately authorized only the exact three-alias rollback. Final 029U Baseline passed.
- Current read-only Baseline again passes: zero dedicated SMTP rows, zero temporary auth rows, zero activation rows, five generic rows, no fixed credential, zero 029U deployment, accepted Sprint 036L Ready with all five stable aliases, and retained 029N/O/S candidates inert and unaliased.
- Installed Vercel CLI is 50.42.0. Its source sends `autoAssignCustomDomains: false` for `--skip-domain`, but agent-mode success output is an exact top-level envelope containing `status`, `deployment`, `message`, and `next`; `status` is `ok` and the nested deployment contains the prior deployment object.
- The linked Vercel project currently has project-wide `autoAssignCustomDomains=true`. Its project GET response includes environment value fields, so Sprint 029V must not use or persist that raw response as a setting-verification mechanism.
- Official Vercel guidance says staged Production builds require automatic custom-domain assignment to be disabled. The observed 029U routing effect is stronger project-specific evidence than the CLI promise alone.

## Five-field task contract

1. Objective: repair the exact Vercel agent success envelope, freeze project-wide automatic alias assignment before secrets or deployment, and perform one retained guarded no-send readiness attempt without moving public routing.
2. Inputs: this Pack; its four generated sprint files; Sprint 029U closeout; installed CLI 50.42.0 source contract; current sanitized provider/Vercel/alias baselines; current dirty-work manifest.
3. Outputs: narrow 029V controller/projection/test/doc changes, exact critical reviews, proportional evidence, one terminal outcome, and fully reconciled closeout.
4. Permitted mutations: approved local files; one exact value-free Vercel project-setting change from true to persistently false, with no in-sprint restoration to true; one restricted 029V Resend sending key; four dedicated Sensitive Production-only SMTP rows; three temporary Sensitive Production-only preflight rows; one Production-targeted `--skip-domain` candidate with `pp_sprint=029V`; exact owned-resource cleanup.
5. Stop conditions: wrong workspace/HEAD/manifest; protected output or secret exposure; unsafe setting read/write; inability to prove the project setting false and routing five/five before credentials; active/ambiguous deployment queue; more than one transfer/deploy/gate/readiness/expiry attempt; alias mutation; email/enquiry/data/migration/generic-SMTP/activation effect; failed compensation; scope expansion.

## Exact agent-envelope correction

- Start a new `PreflightAuth029V.ps1` from 029U; do not rewrite closed 029U evidence or loosen its parser in place.
- The deploy projector may accept only two success forms: the already-approved exact raw deployment object, or the CLI 50.42.0 exact agent envelope.
- The agent envelope must have exactly `status`, `deployment`, `message`, and `next`; `status` must be exact lowercase `ok`; and `deployment` must satisfy the unchanged exact deployment-object contract.
- The nested `deployment.url` must be the exact HTTPS origin `https://<host>` for the independently reconciled candidate: scheme exactly `https`, no credentials, port, path other than `/`, query, or fragment, and `<host>` must equal the candidate hostname. Derive the bare `<host>` only from that validated origin.
- `message` must equal the case-sensitive literal `Deployment <host> ready.` using that derived bare host.
- `next` must be an ordered two-element array. Each element contains exactly `command` and `when`. Element 1 must equal `{ command: "vercel inspect <host> --no-color", when: "Inspect deployment" }`. Element 2 must equal `{ command: "vercel deploy --prod --no-color", when: "Promote to production" }`. The second is generic inert CLI guidance and does not identify or promote the candidate. The controller never executes either record.
- Reordered guidance, missing/extra nested fields, changed casing/punctuation/flags, URL mismatch, a different command/`when`, or extra propagated global flags fail closed. The exact deploy vector forbids any global flag other than pinned `--no-color`.
- Any error envelope, missing/extra field, wrong status, mismatched URL/ID, unexpected guidance command, wrong target, non-Ready state, malformed JSON, multi-object output, or unknown CLI version fails closed.
- Pin and prove Vercel CLI 50.42.0 before accepting the envelope. Version drift stops before external mutation.
- Independently list `pp_sprint=029V` after the one deploy. Baseline is zero. Set `deployInvocationStarted=true` immediately before starting the CLI process. A validation failure or process-start failure while that flag is false is known no-creation and may close blocked-clean after a final zero-residue proof. Once the flag is true, creation is ambiguous unless exactly one owned candidate is reconciled; on every direct-response parse or exit failure, reconciliation still runs without retry through three bounded metadata-list observations over at most 45 seconds.
- Exactly one new matching ID may be adopted for inspection and cleanup only after exact `pp_sprint=029V` metadata, canonical source SHA, Production target, Ready state, and zero-alias ownership are independently proved. An unknown response can never enter the success path. After safe deletion, final matching count must be zero.
- Zero matches after an ambiguous nominal creation, multiple matches, ownership mismatch, unsafe deletion, or nonzero final residue produces `agent-envelope-alias-isolation-blocked-material`; do not guess, delete, or claim blocked-clean.
- Candidate success still requires independent exact inspection: exact canonical source SHA, exact `pp_sprint=029V` metadata, Production target, Ready state, zero aliases, and the project alias inventory unchanged.

## Project-wide alias isolation

- Before any provider key, credential, environment row, or deployment mutation, prove current five/five accepted routing and zero Sprint 029V deployment.
- The only permitted setting surface is the Vercel dashboard route `https://vercel.com/rankin007s-projects/pnr-precision-performance/settings/environments/production`, exact project breadcrumb `pnr-precision-performance`, Production environment, Branch Tracking section, and single `Auto-assign Custom Production Domains` toggle.
- Use the tested `vercel-alias-isolation-projection-029V` against only the route, breadcrumb, Production/Branch Tracking headings, exact toggle label/count/boolean checked state, exact scoped save-control count/state, persistence class, and protected-shape count. Its fixed output is metadata only. Do not take a screenshot, whole-page DOM/accessibility/text dump, network/devtools capture, raw API response, or inspect/navigate to Environment Variables. Refuse any route, project, section, toggle-count, state, protected-shape, or persistence mismatch.
- Starting projection must prove exact route/project and boolean true, then admit exactly one of two persistence branches. Autosave: scoped exact-`Save` control count is zero; change the one toggle to false, hard-reload the exact route, re-project false, and emit `persistenceClass="reload-persisted-autosave"`. Manual save: exactly one Branch Tracking-scoped button has accessible name `Save`; it is disabled before the toggle, enabled after the one false transition, is clicked exactly once, and is disabled after a hard reload that re-projects false; emit `persistenceClass="reload-persisted-manual-save"`. Any other save name/count/state transition, confirmation branch, or surface behavior stops before credentials.
- Raw project GET or PATCH bodies are forbidden because they include environment values. No CLI/API mutation substitutes for the exact value-free dashboard control.
- After persisted false, prove all five aliases still target accepted Sprint 036L.
- Build bounded full project deployment projections by paging the CLI list to completion, emitting only deployment ID, state, target, and created timestamp, and refusing duplicate IDs, protected fields, pagination loops, more than 10 pages, or more than 200 rows. Each snapshot attempt fingerprints its first page, completes the walk, then immediately re-reads the first page and requires the same ordered ID/state/target/created prefix. On first head drift discard the attempt and restart the full walk exactly once; second drift fails closed.
- Require full deployment-ID/state snapshots immediately before and after the false transition and immediately before and after candidate deploy/reconciliation. The pre-freeze snapshot must contain no `BUILDING`, `INITIALIZING`, or `QUEUED` deployment.
- No new deployment may appear across the setting transition. Across the candidate window, the only new ID may be the one independently owned 029V candidate. Before freeze, inability to prove a stable empty active queue closes blocked-clean without changing the setting. After freeze, any new competing ID, active/ambiguous deployment, second head drift, or pagination refusal stops HTTP requests, keeps the setting false, and produces the material outcome.
- Keep project-wide assignment false through provider work, row creation, candidate creation, all HTTP proofs, and owned-resource cleanup. Also retain `--skip-domain` on the one deploy as defense in depth.
- Re-prove setting false and five/five routing immediately before deploy, immediately after deployment reconciliation, before every HTTP request, after every cleanup phase, and at terminal closeout.
- Do not restore automatic custom-domain assignment to true in Sprint 029V. At every clean terminal state reached after freeze, prove persisted false, a stable empty active queue, five/five accepted routing, and candidate zero-alias state as applicable. Re-enabling assignment belongs only to a separately approved promotion.
- If routing changed, any competing/active deployment appeared after freeze, setting state is ambiguous, or any owned provider key, environment row, credential, candidate, deployment, or cleanup state is unresolved, do not repair routing or broaden cleanup. Keep assignment false after freeze, perform only independently safe non-routing compensation, and close `agent-envelope-alias-isolation-blocked-material` pending fresh authority. Non-routing residue never justifies turning assignment true.
- No `alias set`, `alias rm`, `promote`, `rollback`, domain edit, or Production promotion command is permitted. Any routing change is a material incident: stop, compensate non-routing resources when safe, preserve exact sanitized evidence, and seek fresh human authority before any alias action.

## Retained secret and readiness boundary

- Reuse the already-proved server-side public-submission kill switch, dedicated preflight auth, constant-time verifier, canonical UTC window of at most 15 minutes, and no-send SMTP readiness code without product redesign.
- Never create `PUBLIC_ENQUIRY_SUBMISSION_ENABLED` externally.
- Raw provider key and raw preflight bearer must never appear in chat, source, files, shell history, command arguments, logs, screenshots, DOM/accessibility output, clipboard inspection, or evidence.
- Programmatic provider Copy remains exhausted. One operator-private transfer is permitted only after all local proof, fresh critical code review, alias freeze, empty deployment queue, and identity-blind baselines pass.
- The operator privately creates exactly one Resend key named `Precision Performance public enquiry 029V`, with sending access restricted to `precisionperformance.com.au`, copies it, pastes it directly into the prepared Sensitive Production-only `PUBLIC_ENQUIRY_SMTP_PASS` field, saves, dismisses token surfaces, clears the clipboard, and reports only `transfer-complete` or `transfer-failed`.
- Add `PUBLIC_ENQUIRY_SMTP_HOST=smtp.resend.com`, `PUBLIC_ENQUIRY_SMTP_PORT=465`, and `PUBLIC_ENQUIRY_SMTP_USER=resend` as Sensitive Production-only rows by exact stdin vectors. Add the three bounded preflight rows the same way. Do not add generic SMTP, FROM, TO, or activation rows.
- Deploy exactly once with Production target, `--skip-domain`, and `pp_sprint=029V`. There is no retry.
- On an accepted candidate only: make one empty-body same-origin public gate probe requiring sanitized 503 and zero Product work; one authenticated internal no-send readiness request requiring Ready and zero `sendMail`; and one same-bearer post-expiry request requiring sanitized 404.
- Remove all three temporary preflight rows before close. On success retain only the exact restricted key, four dedicated rows, and unaliased candidate. On fallback remove every safely compensable 029V-owned key/row/credential/candidate when independently safe. Never turn automatic assignment back on in this sprint.
- Never send email, submit an enquiry, inspect a mailbox or delivery log, mutate Supabase/Product data/migration 0023, or activate the public route.

## Approved local files

- `scripts/PreflightAuth029U.ps1` read-only source
- `scripts/PreflightAuth029V.ps1`
- `scripts/autonomous-public-enquiry-029U.mjs` read-only source
- `scripts/autonomous-public-enquiry-029V.mjs`
- `scripts/test-autonomous-public-enquiry-029V.mjs`
- `scripts/provider-browser-projection-029U.mjs` read-only source
- `scripts/provider-browser-projection-029V.mjs`
- `scripts/test-provider-browser-projection-029V.mjs`
- `scripts/vercel-alias-isolation-projection-029V.mjs`
- `scripts/test-vercel-alias-isolation-projection-029V.mjs`
- `package.json` only for exact 029V test commands
- `docs/PUBLIC_ENQUIRY_VERCEL_AGENT_ENVELOPE_AND_ALIAS_ISOLATION_029V.md`
- `planning/sprints/029V-vercel-agent-envelope-and-alias-isolation-recovery/**`
- `evidence/professional-engineering/029V-vercel-agent-envelope-and-alias-isolation-recovery/**`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/DECISIONS.md`
- `planning/QUESTIONS.md`
- `planning/RISKS.md`
- `planning/ROADMAP.md`
- `planning/SPRINT_LIFECYCLE_LEDGER.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md` only for justified final-product changes or an explicit no-change reconciliation
- `planning/ARCHITECT_BRIEFING.md`
- `planning/archive/STATE-pre-029V-close.md`
- `planning/archive/ARCHITECT_BRIEFING-pre-029V-close.md`
- `delivery_road_map.md`

Any other source, schema, migration, workflow, configuration, or external resource is out of scope.

## Evidence and closeout

- Preserve metadata-only, sanitized, proportional evidence. Never store environment values, tokens, raw project API bodies, raw provider output, request bodies, addresses, or credentials.
- Prove the exact complete local test arithmetic; retained 1004/1004 must remain green and every new 029V assertion must be listed by suite. Run lint, typecheck, build, protected scan, and exact manifest reconciliation.
- Archive `planning/STATE.md` and `planning/ARCHITECT_BRIEFING.md` to the exact approved paths and prove source/archive SHA-256 equality before trimming.
- Reconcile sprint acceptance, state, status, decisions, questions, risks, roadmap, schedule, lifecycle ledger, evidence index, briefing, `delivery_road_map.md`, and the Final Product Acceptance Matrix. Matrix IDs change only when final product acceptance truly changes.
- Record the exact setting transition or pre-freeze no-change, persistent terminal setting state, deployment/HTTP attempt counts, external mutations, compensation, alias inventories, test arithmetic, evidence path, remaining resources, and whether manual action is still required. State explicitly that any future re-enable requires a separately approved promotion.
- Do not stage, commit, push, open a pull request, or move aliases.
