# Architect Pack — Sprint 029V Vercel Agent Envelope and Alias-Isolation Recovery

Created: 2026-08-07
Workflow profile: strict
Flight: critical
Starting SHA: d822c027c58ad88ec7472e35986e7a33d6a3d6c9
Target branch: codex/029V-vercel-agent-envelope-and-alias-isolation-recovery

This is the complete four-file Architect handoff. It corrects the exact Vercel CLI 50.42.0 agent-mode success envelope and places the single readiness attempt behind a value-free, project-wide alias-assignment freeze. It does not authorize public activation, email delivery, enquiry submission or storage, alias commands, Production promotion, credential disclosure, commit, push, or a second attempt.

============================================================
FILE: planning/sprints/029V-vercel-agent-envelope-and-alias-isolation-recovery/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/029V-vercel-agent-envelope-and-alias-isolation-recovery/blueprint.md
============================================================

# Sprint 029V Blueprint — Vercel Agent Envelope and Alias-Isolation Recovery

## Execution sequence

1. Re-prove the canonical workspace, fixed HEAD, current branch, staged count, and complete tracked/untracked SHA manifests.
2. Create/switch to the exact 029V branch without changing user work; reconcile manifests allowing only enumerated 029V planning artifacts.
3. Reread all four generated files and Sprint 029U closeout. Write the exact no-edit critical Builder plan.
4. The prior review rounds produced material findings and exhausted the ordinary plan-review budget. After the user's named approval to retain assignment false, amend/reapply/reread and obtain one fresh-context focused critical decision on the complete rescope. PASS proceeds; any finding returns to Architect scope and stops for fresh user authority instead of starting another committee loop.
5. Build the new 029V controller and projections from closed 029U sources. Do not edit product routes or closed sprint files.
6. Add exact raw/agent-envelope success fixtures, every negative envelope variant, version refusal, known-no-creation versus ambiguous-creation reconciliation, cleanup adoption, all-attempting cleanup, exact autosave/manual-save state machines, stable paged-walk and active-queue refusal, alias checkpoints, persistent-false closeout, and protected-output refusal.
7. Run all new tests, retained 1004/1004, lint, typecheck, build, protected scan, and manifest proof. Resolve only in-scope deterministic defects.
8. Obtain fresh-context critical code-inspection decisions sequentially on the exact delta, stopping on PASS and never exceeding three decisions. Resolve in-scope findings before the next fresh decision.
9. Re-prove identity-blind provider/Vercel baseline, exact dashboard setting projection true, five/five accepted routing, zero 029V deployment, zero owned rows/credential, retained candidates inert, and a bounded full deployment snapshot with zero active rows.
10. On the exact Production Branch Tracking page, change only the scoped automatic custom-domain toggle true to false through exactly the approved autosave or manual-save branch, hard-reload, and re-project persisted false. Take the immediate stable full deployment snapshot; require no new/active ID and re-prove five/five routing.
11. Prepare the empty Sensitive Production-only password surface; pause all observation; perform the single operator-private 029V key transfer; resume only after the operator's fixed status phrase.
12. On transfer-complete, prove key and password-row metadata only; add three structural and three temporary Sensitive Production-only rows; re-prove exact counts/types/targets, setting false, queue empty, and five/five routing.
13. Take the immediate pre-deploy full inventory, then deploy once with `--prod --skip-domain --meta pp_sprint=029V`. Parse only an exact approved success shape. On every response/exit outcome, run bounded reconciliation; require the post inventory delta to contain exactly the one independently verified 029V candidate and no active/competing deployment. Inspect exact source/metadata/Ready/Production/zero-alias and re-prove five/five routing.
14. Only on full candidate acceptance, run one disabled public gate probe, one authenticated no-send readiness request, and one post-expiry denial, with alias/setting checkpoints before every request.
15. Remove temporary rows. On success retain the exact key, four dedicated rows, and candidate. On fallback remove every safely compensable 029V-owned resource without blind retry.
16. After freeze, leave assignment persistently false for every terminal outcome. At closeout require a stable full inventory, empty active queue for a clean outcome, five/five routing, candidate containment as applicable, and a false reload projection. A future re-enable requires a separately approved promotion.
17. Run final proof and reconcile all closeout files without staging or committing.

## Architecture trace

Vercel value-free Production setting
  -> exact linked project
  -> autoAssignCustomDomains true -> false
  -> empty active deployment queue
  -> five stable aliases remain accepted 036L
  -> false for complete mutation/request/cleanup window
  -> terminal false retained pending separately approved promotion
  -> five/five routing re-proved

one deploy response
  -> exact legacy raw object OR exact CLI 50.42.0 agent envelope
  -> nested exact deployment object
  -> independent pp_sprint=029V list reconciliation
  -> exact inspect source/metadata/Production/Ready/zero-alias
  -> no guidance command execution

public POST remains disabled
  -> one sanitized 503 gate probe
  -> zero body/Product/persistence/network/send work

dedicated internal preflight
  -> bounded bearer and exact dedicated SMTP rows
  -> transporter verify only
  -> never sendMail

## Critical Flight evidence

1. Scope: exact three terminal records, approved files/resources, one-attempt ceilings, and explicit exclusions.
2. Acceptance: A001-A040 with executable or equal/stronger substitute proof.
3. Architecture: exact agent envelope, independent candidate reconciliation, project-wide alias freeze, retained disabled public route, and dedicated no-send path.
4. Data/security: no raw project API body, environment values, provider secret, or bearer in agent-visible/durable channels; exact sensitive rows and bounded auth.
5. Operations: dirty-work preservation, one deploy, value-free persistent setting freeze, five/five routing checkpoints, zero alias commands, exact compensation.
6. Verification: retained 1004 plus new suites, negative/fallback paths, the human-authorized focused plan decision, up to three sequential code-inspection decisions, scans, manifests, and aggregate effects.
7. Failure handling: first material gate stops, no blind retry, independent cleanup adoption, all-attempting cleanup, fresh authority for any alias action, manual intervention only for the unavoidable secret transfer.

## Failure and compensation matrix

| Failure | Immediate action | Compensation | Close |
| --- | --- | --- | --- |
| Workspace/HEAD/manifest mismatch | Stop | None | blocked-clean |
| Local proof or required review fails | Stop before external mutation | None | blocked-clean |
| Setting cannot be proved value-free or cannot become false | Stop before credentials | Leave true if freeze never occurred; otherwise keep proven false | blocked-clean or blocked-material |
| Active queue cannot be proved empty before freeze | Stop before credentials | Leave original true; no setting change | blocked-clean |
| Active/ambiguous deployment or second snapshot-head drift after freeze | Stop requests | Keep false; compensate only independently safe owned non-routing resources | blocked-material |
| Provider baseline/transfer fails | No retry | Remove exact partial key/row when independently safe; keep false after freeze | blocked-clean or blocked-material |
| Row type/target/count mismatch | Stop | Remove all exact owned rows/key when independently safe; keep false | blocked-clean or blocked-material |
| Deploy response unknown/error | No retry or success adoption | Reconcile exact one independently owned ID; blocked-clean only after safe deletion/final zero, otherwise keep false | blocked-clean or blocked-material |
| Candidate not exact-source Ready Production zero-alias | Stop before HTTP | Remove exact candidate/rows/key when safe; keep false | blocked-clean or blocked-material |
| Alias routing changes | Stop immediately | Keep setting false; compensate non-routing resources only; do not run alias commands; request fresh authority | blocked-material |
| Gate/readiness/expiry proof fails | Stop | Remove exact owned resources when independently safe; keep false | blocked-clean or blocked-material |
| New/active competing deployment appears after freeze | Stop requests and close material | Keep setting false; compensate only independently owned non-routing resources | blocked-material |
| Any post-freeze setting ambiguity or routing change | Stop | Keep setting false when provable; do not guess or broaden; preserve evidence | blocked-material |
| CLI invocation started and reconciliation yields zero/multiple/unowned match, or any owned-resource cleanup residue remains | No retry | Delete nothing without exact ownership; keep false and preserve state | blocked-material |
| Supporting tool fails with equal/stronger safe proof available | Diagnose once | Use and record substitute proof | Continue |

## Manual intervention record

The only anticipated manual action is the secret transfer. Record: programmatic Copy remains unavailable without agent exposure; Sprint 029T/029U evidence already checked; the exact private create/copy/paste/save/dismiss/clear steps; operator reports only `transfer-complete` or `transfer-failed`; Builder then verifies metadata/counts/targets only. No observation tool may run during the secret interval.

============================================================
FILE: planning/sprints/029V-vercel-agent-envelope-and-alias-isolation-recovery/acceptance.md
============================================================

# Sprint 029V Acceptance — Vercel Agent Envelope and Alias-Isolation Recovery

Status at generation: pending Builder execution.

- [ ] A001 Both workspace paths equal the permanent canonical repository before every mutation phase.
- [ ] A002 HEAD remains the fixed starting SHA and the exact 029V branch is used without stash, reset, clean, legacy copy, or temporary worktree.
- [ ] A003 Pre/post branch-switch staged count and complete tracked/untracked name/SHA manifests reconcile except for enumerated 029V planning files.
- [ ] A004 Builder rereads all four generated files and Sprint 029U closeout before writing the no-edit plan.
- [ ] A005 After the prior review rounds exhausted the ordinary plan-review budget and the user approved the named persistent-false rescope, one fresh-context focused critical plan decision passes on the fully reapplied Pack; any finding stops for fresh user authority.
- [ ] A006 Product routes, runtime, schema, migrations, generic SMTP, activation, and closed sprint evidence remain unchanged.
- [ ] A007 Installed Vercel CLI is exactly 50.42.0 before external mutation; drift fails closed.
- [ ] A008 Deploy parsing retains the exact raw success object and adds only the exact `status/deployment/message/next` agent success envelope.
- [ ] A009 Nested `deployment.url` is exact `https://<host>` with no credentials, port, query, fragment, or non-root path; the bare host is derived from it; agent status is exact `ok`; `message` is exact `Deployment <host> ready.`; ordered guidance is exactly `vercel inspect <host> --no-color` / `Inspect deployment`, then generic `vercel deploy --prod --no-color` / `Promote to production`; each nested record has only `command` and `when`; no guidance executes.
- [ ] A010 Reordered guidance, missing/extra fields, changed casing/punctuation/flags, URL mismatch, different command/`when`, error/unknown/multi-object envelope, extra global flags, and wrong CLI version are refused.
- [ ] A011 Independent `pp_sprint=029V` reconciliation starts at zero, admits exactly one new deployment ID, and never treats an unknown direct response as success.
- [ ] A012 The independently inspected candidate must be exact-source, exact-metadata, Production, Ready, and zero-alias.
- [ ] A013 Validation/process-start failure before `deployInvocationStarted` is known no-creation and may close blocked-clean only after final zero proof. Once invocation starts, every response/exit failure triggers three bounded metadata observations over at most 45 seconds; cleanup adopts only exactly one independently verified 029V candidate and deletes only from exact ownership. Zero/multiple/unowned/remaining results are blocked-material.
- [ ] A014 Setting proof/mutation uses only the exact Production Branch Tracking route, breadcrumb, headings, single toggle, exact autosave or manual-save state machine, hard reload, persistence class, and fixed metadata projector; it never captures a whole page, raw API body, network/devtools output, environment-values surface, protected value, screenshot, or full DOM/accessibility/text.
- [ ] A015 Value-free baseline proves exact dashboard route/project, `autoAssignCustomDomains=true`, five/five accepted routing, zero active deployment, and zero 029V deployment/resources.
- [ ] A016 Exactly one scoped dashboard toggle transition changes true to persisted false before credentials through either `reload-persisted-autosave` or `reload-persisted-manual-save`; stable full inventories across the transition are identical and routing remains five/five.
- [ ] A017 No credential work begins until setting false, active queue empty, and five/five routing are jointly proved.
- [ ] A018 Setting false and five/five routing are re-proved at every specified checkpoint through deployment, HTTP proof, and cleanup.
- [ ] A019 The deploy retains `--prod --skip-domain --meta pp_sprint=029V` as defense in depth and occurs at most once.
- [ ] A020 No alias/domain/promote/rollback command or Production promotion is executed.
- [ ] A021 Retained 1004/1004 plus every enumerated new 029V assertion passes with exact suite arithmetic; lint, typecheck, build, protected scan, and manifest proof pass.
- [ ] A022 Fresh-context critical code inspection passes with no unresolved finding before external mutation, using sequential decisions and no more than three total.
- [ ] A023 Provider preflight proves verified domain/access, exact target-key absence, and value-free metadata only.
- [ ] A024 Exactly one restricted sending key named `Precision Performance public enquiry 029V` is created if the private transfer gate is reached.
- [ ] A025 The one secret transfer uses only the operator-private no-observation path; operator reports only the fixed status phrase.
- [ ] A026 Raw provider key and bearer appear in no agent-visible or durable channel.
- [ ] A027 Four dedicated and three temporary rows are exact Sensitive Production-only values written through stdin; generic SMTP remains five and activation remains zero.
- [ ] A028 Exactly one accepted candidate becomes exact-source Ready Production zero-alias while all five stable aliases remain accepted 036L.
- [ ] A029 Exactly one empty-body public gate probe returns sanitized 503 before Product processing and produces zero Product/data/network/send effect.
- [ ] A030 Exactly one authenticated dedicated SMTP readiness request returns Ready through verify-only with zero `sendMail`.
- [ ] A031 Exactly one same-bearer post-expiry request returns sanitized 404.
- [ ] A032 All three temporary rows are removed before terminal closeout.
- [ ] A033 Success retains only the exact restricted key, four dedicated rows, and unaliased 029V candidate; public submission remains disabled.
- [ ] A034 Fallback removes every safely compensable 029V-owned key/row/credential/candidate without retry.
- [ ] A035 Sprint 029V never turns assignment back on. After freeze, terminal proof shows persisted false through hard reload and records that only a separately approved promotion may re-enable it.
- [ ] A036 A clean final state stopped pre-freeze with original true or closed post-freeze with persistent false, zero active queue, accepted Sprint 036L five/five, and retained candidates zero-alias. A material state keeps false when already frozen and records actual routing, deployments, all owned-resource residue, and required user action.
- [ ] A037 Final aggregate proof records exact setting transitions and zero emails, stored enquiries, migration/data changes, generic SMTP changes, activation rows, temporary auth residue, or alias commands.
- [ ] A038 Any observed alias change stops before further routing action, keeps assignment false when already frozen, and obtains fresh human authority; it is never mislabeled zero mutation or a clean outcome.
- [ ] A039 Closeout archives before trimming and reconciles every required planning/roadmap/evidence/matrix file.
- [ ] A040 No staging, commit, push, pull request, public activation, enquiry submission, mailbox access, or email delivery occurs.

## Outcome record

Builder selects exactly one:

- [ ] `agent-envelope-alias-isolation-readiness-recovered-clean`
- [ ] `agent-envelope-alias-isolation-blocked-clean`
- [ ] `agent-envelope-alias-isolation-blocked-material`

Record the exact first failing gate, direct-response class, independent deployment reconciliation, setting transitions, active-queue and alias checkpoints, mutations, compensation, remaining resources, request totals, test arithmetic, evidence link, acceptance-matrix changes, and any exact action still required from the user.

============================================================
FILE: planning/sprints/029V-vercel-agent-envelope-and-alias-isolation-recovery/handoff-prompt.md
============================================================

# Sprint 029V Builder Handoff

You are Builder for a strict critical flight in the permanent canonical repository.

## Exact task

Repair only Vercel CLI 50.42.0's exact agent success envelope, establish a value-free project-wide alias-assignment freeze, and execute one retained guarded SMTP no-send readiness attempt. Preserve accepted Sprint 036L five/five. Never activate public enquiry, send email, submit/store an enquiry, run an alias/domain/promote/rollback command, expose a credential, touch data/migrations, stage, commit, or push.

## Required order

1. Prove canonical workspace, fixed HEAD, dirty manifest, and exact branch.
2. Apply the Pack, reread the generated files and Sprint 029U closeout, then write the exact no-edit critical Builder plan.
3. After the user-approved persistent-false rescope, obtain the one fresh focused critical plan decision authorized by A005. PASS proceeds; any finding returns to Architect scope and stops for fresh user authority.
4. Implement only approved 029V controller/projection/test/doc files. Preserve product code and closed sprint files. The setting projector is pinned to the exact Vercel Production Branch Tracking route and single toggle; no API body or whole-page capture is permitted.
5. Prove exact legacy/agent success parsing, all negative shapes, independent cleanup adoption, setting/queue/routing state machine, all-attempting cleanup, and retained 1004/1004.
6. Run lint, typecheck, build, protected scan, and manifest proof, then obtain sequential fresh critical code-inspection decisions until PASS, never exceeding three.
7. Re-prove external baseline and a stable full deployment inventory. Freeze only the exact Production Branch Tracking toggle through the approved autosave/manual-save projector branch; hard-reload/verify persistent false; require identical transition inventory, queue empty, and five/five routing before credentials.
8. Prepare the private transfer surface and pause all observation. Give the operator the exact manual steps below. Resume only on the fixed status phrase.
9. On transfer-complete, prove metadata only; add exact rows; deploy once; independently reconcile and inspect; run HTTP proofs only after full acceptance. On any failure, do not retry and compensate exactly.
10. Never restore the project setting in 029V. After freeze, verify persistent false, stable queue state, five/five routing, and candidate containment at closeout. On alias, competing-deployment, setting, ownership, or cleanup ambiguity, keep false, record blocked-material, and stop for fresh authority. Re-enabling requires a separately approved promotion.

## Operator-private transfer

Tell the operator, in plain English:

1. The provider secret cannot be copied by the agent without exposing it.
2. Local proof, alias freeze, empty deployment queue, and identity-blind baselines have passed.
3. Privately create one Resend key named `Precision Performance public enquiry 029V`, choose sending access restricted to `precisionperformance.com.au`, click Copy, paste only into the prepared Sensitive Production `PUBLIC_ENQUIRY_SMTP_PASS` field, save, dismiss every token surface, and clear the clipboard.
4. Report only `transfer-complete` or `transfer-failed`.
5. Builder will verify only key metadata and Vercel counts/types/targets afterward.

No screenshot, DOM, accessibility, console, browser-text, OCR, clipboard, shell, or other observation tool may run during the token interval.

## Evidence-Proportional Execution Standard

Stop only for a material target, authority, security, privacy, migration, destructive, integrity, production, scope, or cleanup risk. If a supporting tool fails, diagnose once and use an equal or stronger safe proof when available. Keep deterministic controller, harness, validator, formatting, encoding, reporter, credential-transfer, and cleanup corrections inside this sprint. Do not create another follow-up only because a preferred browser/CLI/rendering path is unavailable. Manual intervention is last and is limited here to the unavoidable no-observation secret transfer.

## Final report

State the exact outcome, setting transitions, alias checkpoints, deployment and HTTP counts, resources retained/removed, proof arithmetic, review decisions, acceptance changes, and whether anything remains for the user. End with either the exact action required or the exact sentence `I need nothing from you.`
