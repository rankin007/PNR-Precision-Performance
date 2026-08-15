# Architect Pack — Sprint 029U Operator-Isolated Guarded SMTP Readiness Recovery

Created: 2026-08-07
Workflow profile: strict
Flight: critical
Starting SHA: d822c027c58ad88ec7472e35986e7a33d6a3d6c9
Target branch: codex/029U-operator-isolated-guarded-smtp-readiness-recovery

This Pack is the complete four-file handoff. It preserves the current user-owned dirty canonical workspace, corrects the unsafe readiness boundary found during fresh review, and does not permit public activation, email delivery, enquiry storage, alias movement, credential disclosure, commit, push, or Production promotion.

============================================================
FILE: planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/requirements.md
============================================================

# Sprint 029U Requirements — Operator-Isolated Guarded SMTP Readiness Recovery

## Outcome

Reach one of two exact outcomes:

- guarded-smtp-readiness-recovered-unaliased-clean: one exact-source Ready Production-targeted candidate has dedicated SMTP readiness proved, remains zero-alias, and its public enquiry route is disabled by a server-side fail-closed gate; or
- operator-isolated-readiness-blocked-clean: the first material gate fails, all safely compensable Sprint-owned external resources are removed, accepted Sprint 036L remains five-alias live, and no email, enquiry row, public activation, or alias mutation occurs.

Sprint 029R remains conditional. Sprint 029U never activates public enquiry delivery.

## Canonical baseline and dirty-work preservation

- Both the current directory and git rev-parse --show-toplevel must equal C:\Users\rrank\OneDrive\PNR Precision Performance Canonical before every mutation phase.
- HEAD must remain d822c027c58ad88ec7472e35986e7a33d6a3d6c9 until a later explicit commit request; this sprint does not commit.
- Create and switch to codex/029U-operator-isolated-guarded-smtp-readiness-recovery from the current HEAD while carrying all existing tracked and untracked user work unchanged.
- Before switching, record branch, HEAD, staged count, tracked-modified names and SHA-256 values, and untracked names and SHA-256 values. After switching, prove the same staged count and identical name/SHA manifests except for Architect/Pack-generated 029U planning files.
- If branch creation or switching stages, drops, rewrites, conflicts with, or relocates any existing work, stop without retry. Do not use a temporary worktree, copy content from legacy clones, stash, reset, clean, checkout files, or normalize unrelated files.

## Verified starting truth

- Current closed outcome is Sprint 029T provider-copy-prevalidation-blocked-clean.
- Local retained proof is 932/932: 108 controller/readiness assertions, 80 provider-control assertions, and 744 retained assertions.
- Protected scan is 0/17 and manifest proof is 17/17.
- Accepted Sprint 036L is Ready and owns all five Production aliases.
- Retained Sprint 029S Preview is Ready, Preview-only, zero-alias, and inert. Sprint 029N and 029O candidates are also unaliased.
- Provider identity-blind projection showed the verified precisionperformance.com.au domain, two sending-access keys, zero target key, and zero full-access key, but no agent-copyable secret.
- Vercel has zero dedicated enquiry SMTP rows, zero temporary preflight-auth rows, five generic SMTP rows that must remain untouched, and no public-submission activation row.
- Existing dedicated preflight-auth and no-send readiness code is retained and is the baseline to reuse, not redesign.

## Five-field task contract

1. Objective: add a fail-closed server-side public submission gate, then prove one unaliased candidate can pass dedicated SMTP no-send readiness using one operator-isolated credential transfer.
2. Inputs: this Pack; its four generated sprint files; committed Sprint 029O closeout; closed Sprint 029P/Q/S/T evidence; current dirty-work manifest; current provider/Vercel/alias baselines.
3. Outputs: narrow source/controller/test changes, proportional evidence, a reconciled closeout, and exactly one of the two outcomes above.
4. Permitted mutations: only approved local files; one new sending-access provider key restricted to precisionperformance.com.au; four dedicated Sensitive Production-only SMTP rows; three temporary Sensitive Production-only preflight-auth rows; one Production-targeted skip-domain candidate; cleanup of exact Sprint-owned resources on the fallback path.
5. Stop conditions: wrong workspace/HEAD or dirty-work drift; protected output or secret exposure; inability to establish the kill switch before SMTP configuration; provider/domain/access mismatch; more than one token transfer, deployment, preflight, expiry probe, or public-gate probe; any email/data/alias effect; failed or ambiguous compensation; security/integrity failure; scope expansion.

## Required public-submission kill switch

- Add server-only PUBLIC_ENQUIRY_SUBMISSION_ENABLED.
- It is enabled only when the exact value is lowercase enabled. Missing, blank, mixed-case, whitespace-modified, or any other value is disabled.
- getPublicEnquiryAvailability must report available only when all four dedicated SMTP fields are valid and the exact activation value is enabled.
- app/api/enquiries/route.ts POST must evaluate this gate before content-type, origin, content-length, body read, JSON parse, payload validation, persistence, network access, or submitEnquiry.
- Disabled requests return a sanitized 503 response with no configuration detail.
- Sprint 029U must never create PUBLIC_ENQUIRY_SUBMISSION_ENABLED in Vercel. Therefore the candidate remains disabled even with complete SMTP configuration.
- The gate must not weaken the existing behavior when exact activation is later supplied by a separately scoped sprint.

## Dedicated temporary preflight authentication

- Reuse PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256, PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE, and PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT.
- The raw 256-bit bearer exists only in process memory and the fixed Windows Credential Manager target used by the controller. It must never appear in chat, source, files, shell history, command arguments, logs, screenshots, DOM/accessibility output, clipboard inspection, or durable evidence.
- The verifier is lowercase SHA-256; the window uses canonical UTC and is no longer than 15 minutes; comparison is constant-time; the credential is action-restricted to the dedicated no-send SMTP preflight.
- Add the three rows through stdin as Sensitive Production-only values. Make one authenticated preflight request, then prove the same bearer returns sanitized 404 after expiry. Remove all three temporary rows before close.
- Shared internal authentication and generic SMTP bindings remain untouched.

## Operator-isolated provider-to-Vercel transfer

Programmatic Copy was exhausted by Sprint 029T. One manual intervention is permitted as the last safe mechanism:

1. Builder prepares and proves an identity-blind provider/Vercel baseline plus an empty Vercel Sensitive Production-only value-entry surface for PUBLIC_ENQUIRY_SMTP_PASS.
2. Builder pauses all screenshot, DOM, accessibility, console, page-text, clipboard, OCR, and browser-observation tools.
3. The operator privately creates exactly one Resend key named Precision Performance public enquiry 029U with sending access restricted to precisionperformance.com.au, clicks Copy, pastes directly into the prepared password field, saves, dismisses every token surface, clears the clipboard, and reports only transfer-complete or transfer-failed.
4. During step 3 the agent must not observe, transcribe, request, receive, infer, hash, or handle the raw secret.
5. After transfer-complete, Builder resumes only identity-blind controls and proves the target key metadata and password-row metadata without revealing values.
6. On transfer-failed, do not retry. Remove the exact new key if safely identifiable, remove any exact partial Sprint-owned row, prove residue, and close on the fallback.

## Candidate and proof ceilings

- Add PUBLIC_ENQUIRY_SMTP_HOST=smtp.resend.com, PUBLIC_ENQUIRY_SMTP_PORT=465, and PUBLIC_ENQUIRY_SMTP_USER=resend as Sensitive Production-only rows; password is the privately transferred fourth row. Every structural and temporary value write must use the exact Vercel vector env add NAME production --sensitive --yes --no-color with the value supplied only through stdin.
- The environment projector must require exact Production target and exact sensitive type for the password row, all three structural rows, and all three temporary rows. Missing, unknown, plaintext, encrypted-but-not-sensitive, wrong-target, duplicate, or extra metadata fails closed before deployment or request.
- Do not add SMTP_FROM, SMTP_TO, generic SMTP values, or the activation variable.
- Deploy exactly once using Production target plus --skip-domain and pp_sprint=029U. The candidate must become Ready and remain zero-alias.
- Make exactly one empty-body same-origin POST to /api/enquiries. It must return sanitized 503 before Product processing. This is a non-storing kill-switch probe, not an enquiry submission.
- Prove logs contain exactly one gate probe and zero submitEnquiry, persistence, notification, transport-send, or email activity.
- Make exactly one authenticated internal no-send readiness request; it must be ready and must not call sendMail.
- Make exactly one same-bearer post-expiry request; it must return sanitized 404.
- Do not send email, submit a real or synthetic enquiry, read a mailbox, mutate migration 0023, purge Product data, move aliases, or activate the public route.

## Approved local files

- .env.example
- lib/enquiries/env.ts
- app/api/enquiries/route.ts
- app/api/internal/enquiries/route.ts only if a narrow retained-boundary correction is required
- lib/enquiries/preflight-auth.ts only if a narrow retained-boundary correction is required
- scripts/PreflightAuth029T.ps1 only as the read-only source for a new 029U controller
- scripts/PreflightAuth029U.ps1
- scripts/test-public-enquiry-029P.mjs only to add the exact activation fixture while retaining its 22/22 target
- scripts/test-public-enquiry-029U.mjs
- scripts/autonomous-public-enquiry-029U.mjs
- scripts/test-autonomous-public-enquiry-029U.mjs
- scripts/provider-browser-projection-029U.mjs
- scripts/test-provider-browser-projection-029U.mjs
- package.json only to add exact 029U test commands if required
- planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/**
- evidence/professional-engineering/029U-operator-isolated-guarded-smtp-readiness-recovery/**
- planning/STATE.md
- planning/STATUS.json
- planning/ROADMAP.md
- planning/ARCHITECT_BRIEFING.md
- planning/archive/STATE-pre-029U-close.md
- planning/archive/ARCHITECT_BRIEFING-pre-029U-close.md
- delivery_road_map.md

Any other source, configuration, workflow, schema, migration, or external resource is out of scope and requires a stop.

## Closeout and evidence rules

- Evidence is metadata-only, sanitized, deterministic, and proportional. Never store raw headers, tokens, provider secrets, Vercel values, email addresses, enquiry bodies, database rows, or protected provider output.
- Run the protected-value scan and exact manifest reconciliation against every changed/evidence file.
- Before trimming planning/STATE.md or planning/ARCHITECT_BRIEFING.md, copy each to its exact approved archive path, prove source/archive SHA-256 equality, then trim. If equality fails, stop.
- Reconcile planning/STATE.md, planning/STATUS.json, planning/ROADMAP.md, planning/ARCHITECT_BRIEFING.md, delivery_road_map.md, the sprint acceptance record, and the Final Product Acceptance Matrix.
- Record exact outcome, close date, evidence link, acceptance changes, current position, remaining estimate, and revision-log entry in delivery_road_map.md.
- No staging, commit, push, pull request, alias movement, or Production promotion.

============================================================
FILE: planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/blueprint.md
============================================================

# Sprint 029U Blueprint — Operator-Isolated Guarded SMTP Readiness Recovery

## Execution sequence

1. Re-prove canonical current directory, Git top-level, HEAD, branch, staged count, and full tracked/untracked name/SHA manifests.
2. Create and switch to the exact 029U branch from the same HEAD. Reconcile the manifests, allowing only the known Architect and generated 029U planning files.
3. Reread all four generated sprint files plus the committed Sprint 029O closeout and the closed 029P/Q/S/T evidence. Generated files are the Builder authority.
4. Write the exact no-edit critical Builder plan, then obtain a fresh-context critical-plan review. Resolve blocker/advisory findings by returning to Architect scope; proceed only on pass.
5. Implement the exact fail-closed PUBLIC_ENQUIRY_SUBMISSION_ENABLED gate first, including .env.example documentation and unit/controller coverage. Do not add any external binding yet.
6. Build scripts/PreflightAuth029U.ps1 from the retained 029T controller; add the exact 029U public-gate test plus autonomous-controller and provider-projection helper/test pairs; make the one deterministic 029P fixture correction needed by the new availability gate. Keep all outputs identity-blind and metadata-only.
7. Run narrow kill-switch tests, the new 029U controller/projection tests, all retained 029T/Q/S/P/O tests, lint, typecheck, build, protected scan, and manifest reconciliation. Resolve only in-scope deterministic defects.
8. Obtain a fresh-context code review for the source/controller delta. Resolve findings in scope and rerun affected proof. Stop on unresolved critical findings.
9. Re-prove provider metadata, Vercel environment-name/target/sensitivity metadata, accepted five-alias 036L state, retained candidate states, zero SMTP/preflight/activation rows, and exact owned-resource ceilings.
10. Prepare the empty Vercel Sensitive Production-only PUBLIC_ENQUIRY_SMTP_PASS entry surface, then perform the one operator-isolated transfer exactly as specified. No agent observation is active during the secret interval.
11. After transfer-complete, identity-blindly prove target key metadata and exact Sensitive Production-only password-row metadata. Add each of the three structural dedicated SMTP rows and three temporary preflight-auth rows with the exact --sensitive Production stdin vector. Prove all seven owned rows have exact sensitive type and Production target, four dedicated rows, three temporary rows, zero activation rows, and unchanged five generic SMTP rows; refuse wrong or missing sensitivity metadata.
12. Deploy exactly one Production-targeted --skip-domain candidate with pp_sprint=029U. Prove exact source, Ready, zero aliases, and absence of accidental alias assignment.
13. Send exactly one empty-body same-origin public gate probe. Require sanitized 503 and prove zero Product processing, persistence, notification, transport, or email effects.
14. Send exactly one authenticated internal no-send readiness request. Require ready with zero sendMail. After the bounded window, send exactly one same-bearer request and require sanitized 404.
15. Remove the three temporary preflight-auth rows. On success retain only the exact new sending key, four dedicated SMTP rows, and unaliased candidate. On any fallback, perform exact safe compensation and prove aggregate zero/zero effects.
16. Run final tests/scans/manifests, close acceptance, archive-before-trim planning boot files, and reconcile all planning/roadmap/briefing/acceptance records without staging or committing.

## Architecture trace

public POST /api/enquiries
  -> first instruction: exact server-side submission-enabled check
  -> disabled: sanitized 503, no request-body or Product processing
  -> enabled in a future separately scoped sprint only
  -> existing content/origin/length/body/payload/submit path

internal POST /api/internal/enquiries
  -> existing shared internal action path remains lazy and unchanged
  -> dedicated bounded preflight bearer authorizes only smtp-readiness
  -> dedicated SMTP transporter verify()
  -> never sendMail

operator-private transfer
  -> provider creates one restricted sending key
  -> OS/browser-private clipboard path
  -> prepared Vercel Sensitive Production-only password field
  -> agent observes metadata only before and after

## Flight evidence

Because this is a critical flight, preserve all seven review inputs:

1. Scope: exact outcome, exclusions, permitted local files, external mutation ceilings, and two close outcomes.
2. Acceptance: A001-A036 with executable or equally strong substitute proof and explicit non-effect requirements.
3. Architecture: kill-switch-first request ordering, dedicated auth isolation, no-send readiness, and no-observation secret transfer.
4. Data and security: no secret in agent-visible channels, no enquiry/email/data effects, exact restricted provider access, Sensitive Production-only rows, bounded authentication, constant-time comparison, and fail-closed activation.
5. Operations: dirty-work preservation, one deployment, zero aliases, accepted 036L continuity, exact compensation, and archive-before-trim closeout.
6. Verification: retained 932 baseline plus new gate/controller/projection assertions, lint, typecheck, build, protected scan, manifest, candidate/log/alias/environment evidence, and final aggregate arithmetic.
7. Failure handling: first material gate stops the sequence; no blind retry; safe exact-resource compensation; manual intervention record; fallback close when equivalent proof cannot establish the boundary.

## Failure and compensation matrix

| Failure | Immediate action | Compensation | Close result |
| --- | --- | --- | --- |
| Workspace, HEAD, branch, or dirty manifest mismatch | Stop | None; preserve all work | blocked-clean |
| Kill-switch implementation or proof fails | Stop before external mutation | None | blocked-clean |
| Protected output/secret becomes agent-visible | Stop and contain | Revoke exact new key and remove partial owned rows if safe; do not reproduce value | blocked-clean, security event recorded |
| Provider metadata/domain/access mismatch | Stop | Remove exact target key if created | blocked-clean |
| Operator reports transfer-failed | No retry | Remove exact key and partial password row if safely identifiable | blocked-clean |
| Vercel row count/target/sensitivity mismatch | Stop | Remove exact Sprint-owned rows and target key | blocked-clean |
| Candidate deployment fails or is not exact-source Ready zero-alias | Stop | Remove exact Sprint-owned rows/key; remove candidate only if deletion is safe and exact | blocked-clean |
| Public gate probe is not sanitized 503 or triggers Product work | Stop; do not run readiness | Remove exact Sprint-owned external resources; retain evidence without protected content | blocked-clean, integrity failure |
| No-send readiness is non-ready or sendMail activity appears | Stop | Remove exact Sprint-owned external resources | blocked-clean |
| Expiry denial or temporary cleanup fails | Stop | Remove exact temp rows; remove retained owned resources if boundary cannot be restored | blocked-clean |
| Alias, email, or enquiry-data effect appears | Stop immediately | Restore only exact changed Sprint-owned state when provably safe; never guess | blocked-clean, material incident |
| Supporting tool fails but equivalent evidence exists | Diagnose once | Use documented equal/stronger proof | Continue |

## Verification arithmetic

- Retained local baseline: 932/932.
- New 029U target is 72/72: 36 public-gate/environment/route assertions, 20 autonomous-controller assertions, and 16 provider-projection assertions. The fixed 16 includes discriminating exact-sensitive password, all-structural, all-temporary, and missing/wrong-type refusal checks; it does not merely count names. Reconcile retained 932 plus new 72 equals 1004/1004 before external mutation.
- The final report must not claim a total without listing every contributing suite and showing exact arithmetic.
- External ceilings on the success path: one new restricted key, four dedicated SMTP rows, three temporary rows later removed, one candidate, one gate probe, one no-send readiness request, one expiry request, zero aliases, zero emails, zero enquiry rows.
- Final temporary residue: zero keys beyond the one retained target key; zero temporary auth rows; zero activation rows; zero new aliases; zero email/data effects.

## Manual intervention record

If the operator-isolated transfer is reached, record:

- blocked action: programmatic secret transfer is unavailable without exposing the provider token to the agent;
- evidence: 029T identity-blind Copy count zero plus current fixed preflight;
- exact action: the six-step private create/copy/paste/save/dismiss/clear sequence in requirements.md;
- user steps: show only the required private provider and Vercel surfaces and accept only transfer-complete or transfer-failed;
- Builder verification: identity-blind target key metadata, Vercel row metadata, scans, no token observation, and post-action resource counts.

No other manual intervention is assumed. Any new manual need must follow the project five-part rule and must not broaden scope.

============================================================
FILE: planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/acceptance.md
============================================================

# Sprint 029U Acceptance — Operator-Isolated Guarded SMTP Readiness Recovery

Status at generation: pending Builder execution.

## Acceptance criteria

- [ ] A001 Both workspace paths equal the permanent canonical repository before each mutation phase.
- [ ] A002 Starting HEAD is d822c027c58ad88ec7472e35986e7a33d6a3d6c9 and the exact target branch is used without stash, reset, clean, legacy copy, or temporary worktree.
- [ ] A003 Pre/post branch-switch staged count and tracked/untracked name/SHA manifests match except for enumerated 029U planning artifacts.
- [ ] A004 All four generated sprint files and committed Sprint 029O closeout are reread before the Builder plan; no Pack text overrides generated files after application.
- [ ] A005 A fresh-context critical-plan review returns pass with no unresolved blocker or advisory before implementation or external mutation.
- [ ] A006 PUBLIC_ENQUIRY_SUBMISSION_ENABLED exists only as a server-side configuration name and enables only on exact lowercase enabled.
- [ ] A007 Missing, blank, whitespace-modified, mixed-case, and arbitrary activation values all fail closed.
- [ ] A008 getPublicEnquiryAvailability is available only when exact activation and all four valid dedicated SMTP fields are present.
- [ ] A009 Public POST evaluates the gate before content type, origin, length, body read, JSON parse, payload validation, persistence, network, or submitEnquiry.
- [ ] A010 Disabled public POST returns sanitized 503 without configuration or protected detail.
- [ ] A011 Existing enabled-path validation and submission behavior remains unchanged in local tests; Sprint 029U never enables that path externally.
- [ ] A012 .env.example documents the exact gate and dedicated SMTP exception without suggesting generic SMTP fallback or exposing a value.
- [ ] A013 Dedicated preflight authentication remains independent of shared internal auth, uses a 256-bit bearer, lowercase SHA-256 verifier, constant-time compare, canonical UTC window no longer than 15 minutes, and action restriction.
- [ ] A014 Raw bearer and provider key appear in none of chat, source, files, evidence, logs, screenshots, DOM/accessibility output, clipboard inspection, or command arguments.
- [ ] A015 The 029U public-gate test, autonomous controller/helper test pair, and provider projection/helper test pair have deterministic behavior, exact --sensitive stdin command, row sensitivity, target, count, wrong-type refusal, fail-closed, and secret-redaction proof.
- [ ] A016 Retained 932/932 tests plus every new 029U assertion pass with exact suite arithmetic; lint, typecheck, build, protected scan, and manifest reconciliation pass.
- [ ] A017 A fresh-context critical code review of the exact local delta returns no unresolved critical finding before provider/Vercel mutation.
- [ ] A018 Fixed identity-blind preflight proves the verified domain, allowed access class, target-key absence, zero dedicated SMTP rows, zero temp rows, zero activation row, unchanged five generic SMTP rows, accepted five-alias 036L state, and retained candidate states.
- [ ] A019 Exactly one target provider key is created with the exact 029U name, sending access, and precisionperformance.com.au restriction.
- [ ] A020 The one provider-to-Vercel secret transfer occurs only through the operator-private no-observation sequence; the operator reports only transfer-complete or transfer-failed.
- [ ] A021 No agent observation tool is active during the raw-token interval and the clipboard/token surfaces are cleared/dismissed before observation resumes.
- [ ] A022 After transfer, identity-blind evidence proves exactly one target-key metadata row and one exact sensitive-type Production-only PUBLIC_ENQUIRY_SMTP_PASS row without values; wrong or missing sensitivity metadata is refused.
- [ ] A023 Exact structural rows are PUBLIC_ENQUIRY_SMTP_HOST=smtp.resend.com, PUBLIC_ENQUIRY_SMTP_PORT=465, and PUBLIC_ENQUIRY_SMTP_USER=resend, each written by the exact --sensitive Production stdin vector and projected as exact sensitive type; the password is the fourth dedicated row.
- [ ] A024 Exactly three temporary auth rows are each written by the exact --sensitive Production stdin vector and projected as exact sensitive type only for the bounded preflight interval; no generic SMTP row changes and no activation row exists.
- [ ] A025 Exactly one Production-targeted --skip-domain deployment with pp_sprint=029U becomes Ready from exact source and remains zero-alias.
- [ ] A026 Exactly one empty-body same-origin public gate probe returns sanitized 503.
- [ ] A027 Gate-probe evidence shows zero body/payload/Product processing, zero submitEnquiry, zero persistence, zero notification, zero transport send, zero email, and zero enquiry data.
- [ ] A028 Exactly one authenticated internal no-send readiness request returns ready and transport verification occurs without sendMail.
- [ ] A029 Exactly one same-bearer post-expiry request returns sanitized 404.
- [ ] A030 All three temporary auth rows are removed and absence is proved before close.
- [ ] A031 All five aliases remain on accepted Sprint 036L; every 029N/O/S/U candidate remains unaliased as applicable.
- [ ] A032 Success retains only the exact target restricted key, four dedicated SMTP rows, and the unaliased 029U candidate; public submission remains disabled.
- [ ] A033 Fallback removes every safely compensable Sprint-owned key/row and records any exact non-removable candidate as unaliased inert; no blind retry occurs.
- [ ] A034 Final aggregate proof is zero alias mutations, zero sent emails, zero stored enquiries, zero migration/data mutation, zero generic SMTP change, zero activation rows, and zero temporary-auth residue.
- [ ] A035 Closeout copies planning/STATE.md and planning/ARCHITECT_BRIEFING.md to their exact approved archive paths, proves SHA-256 equality before trimming, and reconciles state/status/roadmaps/briefing/matrix/evidence.
- [ ] A036 No staging, commit, push, pull request, public activation, alias movement, Production promotion, enquiry submission, mailbox access, or email delivery occurs.

## Outcome record

Builder must select exactly one:

- [ ] guarded-smtp-readiness-recovered-unaliased-clean
- [ ] operator-isolated-readiness-blocked-clean

Record exact failure gate, mutations, compensation, substitute proof, remaining resources, test arithmetic, evidence path, and delivery-roadmap reconciliation. A readiness-success result is not public launch acceptance and does not make Sprint 029R ready without a new Architect Pack.

============================================================
FILE: planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/handoff-prompt.md
============================================================

# Sprint 029U Builder Handoff

You are Builder for a strict critical flight in the permanent canonical repository.

## Task contract

Objective: add the fail-closed server-side public-submission gate first, then recover dedicated SMTP no-send readiness for one unaliased candidate using one operator-private transfer that the agent never observes.

Inputs: the four generated Sprint 029U files; committed Sprint 029O closeout; closed Sprint 029P/Q/S/T evidence; current dirty-work manifest; current provider, Vercel, deployment, and alias baselines.

Outputs: narrow approved-file changes, exact tests and protected evidence, one bounded external sequence, clean compensation when required, and reconciled sprint closeout.

Permitted mutations: only files and exact external resources listed in requirements.md. Keep all five aliases on accepted Sprint 036L. Never add PUBLIC_ENQUIRY_SUBMISSION_ENABLED externally.

Stop conditions: any canonical/HEAD/manifest drift; secret or protected-output exposure; inability to prove kill-switch-first behavior; provider/domain/access mismatch; count/target/sensitivity mismatch; any second transfer/deploy/probe/readiness/expiry attempt; any email, enquiry-data, migration, generic-SMTP, activation, or alias effect; unsafe compensation; out-of-scope change.

## Required order

1. Prove canonical workspace and preserve the complete dirty manifest.
2. Create/switch to the exact 029U branch without changing work.
3. Apply this Pack with the repository Pack tool, reread all four generated files, and reread committed Sprint 029O closeout.
4. Produce an exact no-edit critical Builder plan.
5. Run a genuinely fresh-context critical-plan review. If it says ask, stop Builder work, return to Architect scope, revise Pack/roadmap/status only, reapply, reread, and repeat with a fresh reviewer. Implement only after pass.
6. Implement and fully prove the public-submission kill switch before any external mutation.
7. Add and prove the 029U controller/projection boundary; retain all prior tests.
8. Run a fresh-context critical code review and resolve every in-scope finding before external mutation.
9. Execute fixed identity-blind preflight.
10. Prepare the private transfer surface and pause all observation. Give the operator the exact six-step manual intervention. Resume only after transfer-complete or transfer-failed.
11. If complete, continue with exact rows, one candidate, one 503 gate probe, one no-send readiness, one expiry denial, and temp cleanup. If failed, compensate once and close fallback.
12. Reconcile all proof and closeout files. Do not stage or commit.

## Non-negotiable safety language for the operator pause

Tell the operator:

- what is blocked: the provider secret cannot be transferred programmatically without agent exposure;
- what was checked: Sprint 029T Copy count zero and current identity-blind preflight;
- what to do: privately create the exact restricted key, Copy, paste it only into the prepared Sensitive Production PUBLIC_ENQUIRY_SMTP_PASS field, save, dismiss token surfaces, clear clipboard;
- what to report: only transfer-complete or transfer-failed;
- what Builder will verify afterward: metadata/counts/targets only, never the secret.

While that instruction is active, do not use screenshot, DOM, accessibility, console, browser text, OCR, clipboard, shell, or any other observation that could capture the token.

## Verification summary

Minimum local proof before external mutation:

- retained 932/932;
- new 72/72, exactly 36 public-gate/environment/route plus 20 autonomous-controller plus 16 provider-projection assertions (including exact-sensitive password/structural/temporary and wrong-type refusal), for 1004/1004 total;
- lint, typecheck, and build;
- protected scan zero findings across its complete manifest;
- exact manifest reconciliation;
- fresh critical code-review pass.

Minimum success proof:

- one exact restricted provider key;
- four exact sensitive-type Production-only dedicated SMTP rows, with wrong/missing sensitivity refused;
- zero PUBLIC_ENQUIRY_SUBMISSION_ENABLED row;
- one exact-source Ready zero-alias candidate;
- one sanitized 503 gate probe with zero Product/data/send effects;
- one ready no-send preflight;
- one sanitized 404 expiry denial;
- zero temporary auth rows after cleanup;
- accepted Sprint 036L still five/five;
- zero aliases, emails, stored enquiries, generic SMTP changes, or migration mutations.

Close on the first material failure after safe exact-resource compensation. Supporting-tool failure alone is not a blocker when an equal or stronger safe proof is available and documented.

Do not deploy to aliases, send email, submit an enquiry, create credentials outside the one exact restricted provider key and bounded preflight bearer, expose secrets, access a mailbox, modify Product data, move aliases, stage, commit, push, or open a pull request.
