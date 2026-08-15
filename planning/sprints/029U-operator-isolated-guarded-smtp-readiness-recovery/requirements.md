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
