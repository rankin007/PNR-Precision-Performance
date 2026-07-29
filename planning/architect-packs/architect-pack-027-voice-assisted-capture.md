============================================================
FILE: planning/sprints/027-voice-assisted-capture/requirements.md
============================================================

# Sprint 027 — Voice-Assisted Capture Requirements

## Outcome

Complete the safe launch fallback for voice-assisted notes in the authenticated mobile biochemistry workflow. Trainers must always be able to enter, edit, review and confirm typed note text. Device keyboard dictation may assist that same text field without the application recording, storing or transmitting audio. No note may be saved until the user reviews it as ordinary editable text and submits the existing biochemistry workflow.

The successful bounded outcome is a reliable typed/device-dictation fallback, not provider-backed transcription. App-controlled microphone capture, raw-audio retention and external transcription remain unavailable until separately approved.

## Workflow profile

Strict. Voice and transcript handling can expose sensitive horse, stable, trainer and operational information; transcription errors can also corrupt names, quantities or measurement-like text. Strict requires explicit privacy, authority, review and fail-closed boundaries without unnecessary ceremony.

## Accepted Architect decision

The user accepted and approved these rules:

- typed notes are the permanent fallback;
- browser/device dictation is permitted only when it does not add an unapproved provider or retention pathway;
- review and editing are mandatory before save;
- dictated text must never populate or modify numeric biochemistry readings automatically;
- microphone permission, denial, unsupported-device, offline, interruption and transcription-error states must be handled safely when an application-controlled capability is ever approved;
- synthetic tests must cover horse names, quantities, measurement-like speech, cancellation and review-before-save; and
- raw audio is not retained unless separately approved.

For Sprint 027, device operating-system or keyboard dictation into the existing text area is the only voice-assistance route that may be described as available. The application must not call `getUserMedia`, `MediaRecorder`, browser `SpeechRecognition`/`webkitSpeechRecognition`, an external API, SDK, model or provider because their processing, retention and subprocessor behavior has not been approved. Do not imply that device dictation is local-only; describe it as controlled by the user’s device and keyboard settings.

## Baseline and branch relationship

Builder must start from a new clean isolated worktree based exactly on commit `6f8543020e126a4620f09be017744dcc75061e6e`. Record the exact commit, ancestry and clean status before editing.

Sprint 027 is intentionally non-dependent on the uncommitted Sprint 025 and Sprint 026 worktrees. Do not modify, copy from, merge, stage or commit either worktree. The Sprint 027 approved file set does not overlap Sprint 026 evidence-management source files. Preserve the original dirty `develop` worktree unchanged.

If the exact baseline or isolation cannot be established, stop `voice-capture-baseline-blocked-clean` before implementation.

## Sources of truth

Read and preserve at minimum:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/ARCHITECT_BRIEFING.md`
- `docs/WORKFLOW_PROFILE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `planning/DEFINITION_OF_DONE.md`
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`
- `components/ops/biochemistry-capture-workflow.tsx`
- `components/ops/biochemistry-workflow-state.ts`
- `app/(ops)/data-entry/biochemistry/actions.ts`
- `app/(ops)/data-entry/biochemistry/page.tsx`
- `scripts/test-biochemistry-workflow-022.mjs`
- current authenticated access, comment/note validation, audit/error and validation conventions

`docs/DESIGN_AND_MESSAGING_AUTHORITY.md` remains controlling for authenticated mobile layout, privacy, claims and the rule that technology supports rather than replaces trainer or veterinary judgement.

## Required work

### 1. Reconcile the existing note contract

- Confirm typed notes are optional, capped at 2,000 characters, reviewed before submit and saved through the established `biochemistry_test_notes` path.
- Confirm the server remains authoritative for note length, authenticated horse access and persistence.
- Confirm notes cannot modify readings, scoring, classifications or recommendations.
- Record that existing comment editing after save is separate from pre-submit capture review.
- Identify and preserve all Sprint 022 validation, retry, privacy and safe-error behavior.

### 2. Create the voice/privacy decision record

Create `docs/VOICE_ASSISTED_CAPTURE_027.md` as the canonical Q&A contract. It must record:

- typed notes as the permanent fallback;
- device keyboard dictation as device-controlled input into the same ordinary text field;
- no application microphone permission or audio capture in this bounded outcome;
- no raw audio, audio filename, blob, duration, confidence score, interim transcript, provider identifier or voice biometric persistence;
- no external transcription request, provider SDK, secret, endpoint or account;
- mandatory user review/edit before the existing review and submit steps;
- no automatic transfer from notes into horse identity, date, time, numeric reading, score or recommendation fields;
- safe wording for unsupported dictation, device permission/settings, offline behavior, interruptions and errors;
- privacy guidance not to dictate unnecessary personal or confidential information;
- exact unresolved provider/privacy decisions for any future application-controlled microphone/transcription capability; and
- supersession/change-control requirements.

Do not represent device keyboard dictation as guaranteed, application-managed, on-device, private, offline or retained nowhere. Those facts depend on the user’s device, keyboard and settings.

### 3. Complete the mobile note experience

Improve the existing optional notes section without changing its persistence model:

- keep one ordinary editable textarea as the authoritative draft;
- label typed entry as always available;
- add concise device-dictation guidance that refers users to their keyboard microphone when their device provides one;
- make clear that the application does not record or store audio;
- make clear that device dictation behavior is controlled by device/keyboard settings;
- preserve live character count and 2,000-character enforcement;
- keep dictated/pasted/typed text fully editable;
- add a deliberate confirmation at review that the note text has been checked before submission when non-empty;
- prevent submit until that confirmation is checked for a non-empty note;
- reset the confirmation when note text changes after review;
- retain Edit as the route back to correct text;
- never parse note text into any structured field; and
- use safe, concise messages when dictation is unavailable or unreliable: continue typing, review the text, and retry only through the device’s own controls.

Do not add an in-app microphone button that requests permission or begins capture. Do not add fake recording, waveform, confidence, transcription-progress or provider status UI.

### 4. Review-before-save integrity

- The review screen must show the exact note draft or `No notes added`.
- A non-empty note requires an unchecked confirmation such as “I reviewed this note and corrected any dictation errors.”
- The confirmation is client guidance; the final submitted text must still pass current server validation.
- Changing the note invalidates prior confirmation.
- Rapid repeat submission remains locked by the existing workflow.
- Empty notes do not require a voice/transcript confirmation.
- No transcript source or audio-origin claim is persisted because typed, pasted and device-dictated text are intentionally equivalent after review.

### 5. Accessibility, privacy and failure handling

- Keep the workflow authenticated and absent from public pages.
- Ensure labels, descriptions, errors and confirmation are associated programmatically.
- Announce review-blocked and correction-required states through the existing accessible status/error pattern.
- Preserve keyboard order, visible focus, logical error focus, reduced motion, 44px touch targets, narrow mobile layout and 200% zoom/reflow.
- Do not rely on colour for status.
- Never log or place note content in URLs, analytics, test output or closeout evidence.
- Use synthetic note examples only; no real horse, stable, trainer, veterinary or customer data.
- Do not claim transcription accuracy, clinical correctness, confidentiality beyond the application boundary, or under-60-second completion.

### 6. Deterministic proof and closeout

Add a maintained Sprint 027 synthetic test suite covering:

- typed notes always available;
- device-dictation guidance and accurate privacy wording;
- no app microphone, media recorder, SpeechRecognition, provider, endpoint, SDK or audio storage path;
- empty and non-empty note review;
- unchecked confirmation blocks non-empty-note submission;
- confirmation permits submission only after review;
- editing invalidates confirmation;
- 2,000-character boundary and over-limit behavior;
- horse-name-like text, quantities, units and measurement-like speech remain plain note text and never populate structured readings;
- pasted/dictated-looking punctuation and correction behavior;
- cancellation/edit/back transitions preserve or reset state correctly;
- safe unsupported, offline, interruption and error guidance without fake capability;
- keyboard, focus, error association, live-region, touch and responsive source contracts; and
- regression to the complete maintained Sprint 022 workflow.

Run canonical JSON, domain, roles, Supabase self-test, static, TypeScript, ESLint, production-build and `git diff --check` gates. Use equivalent or stronger safe proof when an optional browser/renderer is unavailable and record the substitution without claiming rendered behavior.

Refresh durable planning state and create a concise closeout with a changed-file manifest. Keep all evidence free of note contents, personal information, secrets and protected values.

## Approved file set

Builder may edit or create only:

- `components/ops/biochemistry-capture-workflow.tsx`;
- `components/ops/biochemistry-workflow-state.ts`;
- `app/(ops)/data-entry/biochemistry/actions.ts`, only if existing server validation must be preserved or narrowly aligned with the review contract;
- `app/(ops)/data-entry/biochemistry/page.tsx`, only for required voice-fallback messaging integration;
- `app/globals.css`, only for narrowly necessary accessibility/responsive styling;
- `scripts/test-biochemistry-voice-027.mjs`;
- `scripts/fixtures/027-voice-capture/**`;
- `scripts/run-validation-suite.mjs` and `package.json`, only to register the maintained Sprint 027 test using existing dependencies;
- `docs/VOICE_ASSISTED_CAPTURE_027.md`;
- `planning/sprints/027-voice-assisted-capture/**`;
- `planning/reviews/027-voice-assisted-capture-closeout.md`;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/DECISIONS.md`, only for durable Sprint 027 decisions;
- `planning/RISKS.md` and `planning/QUESTIONS.md`, only for materially changed items;
- `planning/EVIDENCE_INDEX.md`;
- `planning/SPRINT_SCHEDULE.md` and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`; and
- `planning/ARCHITECT_BRIEFING.md`.

Reading other files is permitted. Any necessary edit outside this set is a material scope stop.

## Explicitly out of scope

- `getUserMedia`, `MediaRecorder`, `SpeechRecognition`, `webkitSpeechRecognition` or another application-controlled microphone/recognition API;
- external transcription, provider/model selection, provider account, SDK, endpoint, secret, purchase or data transfer;
- raw audio recording, upload, storage, retention, playback, download, deletion, recovery or audit schema;
- claims that dictation is on-device, private, offline, secure, accurate or application-controlled;
- automatic extraction into horse, date/time, numeric reading, score, status, recommendation or other structured fields;
- schema or migration changes;
- role/RLS changes;
- evidence uploads, safety-provider activation, CSV, OCR or image/PDF parsing;
- production thresholds, Table of Knowledge content, trends, dashboard, public site, commerce or notifications;
- real data, remote mutation, provider/configuration action, deployment, alias/domain movement;
- dependency installation/update; and
- staging, commit, push, PR or merge unless separately requested after closeout.

## Evidence-Proportional Execution Standard

Builder must:

- stop only for material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup risk;
- substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
- keep in-scope tooling, harness, credential, validator, formatting, encoding, reporter and deterministic corrections in Sprint 027;
- not create a follow-up solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path or redundant verifier is unavailable; and
- use manual intervention only after safe in-scope alternatives are exhausted.

When manual intervention is genuinely required, record what is blocked, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Never request secrets or real dictated content in conversation.

============================================================
FILE: planning/sprints/027-voice-assisted-capture/blueprint.md
============================================================

# Sprint 027 — Voice-Assisted Capture Blueprint

## Phase 1 — Isolate and reconcile

1. Verify exact clean baseline `6f8543020e126a4620f09be017744dcc75061e6e`, expected ancestry and clean isolated worktree.
2. Create branch/worktree `codex/027-voice-assisted-capture`.
3. Apply this Pack there, verify all four generated files and execute the complete sprint from them.
4. Confirm the original `develop`, Sprint 025 and Sprint 026 worktrees remain untouched.
5. Reconcile typed-note capture, client/server validation, review, submission, persistence and post-save comment behavior.

## Phase 2 — Establish the decision contract

1. Create `docs/VOICE_ASSISTED_CAPTURE_027.md` in Q&A form.
2. Record typed notes as permanent fallback and device keyboard dictation as user/device-controlled input into the same textarea.
3. Record the absence of app microphone access, audio handling and external transcription.
4. Record mandatory review/edit before save and prohibition on numeric-field extraction.
5. Record unresolved provider, processing-region, consent, retention, deletion, subprocessor, accuracy and incident decisions for any future expansion.

## Phase 3 — Implement the safe fallback

1. Preserve one authoritative editable note string and the 2,000-character limit.
2. Add accurate device-keyboard dictation guidance without an in-app microphone control.
3. Add a review-confirmation state for non-empty notes.
4. Block non-empty-note submission until confirmation is checked.
5. Reset confirmation whenever the note changes or review is invalidated.
6. Keep empty-note submission unchanged.
7. Preserve existing Edit, pending lock, safe server errors and redirect behavior.
8. Ensure note text is never parsed into structured fields.

## Phase 4 — Accessibility and privacy review

1. Associate guidance, count, errors and confirmation with the note control/review region.
2. Announce blocked review and correction states accessibly and move focus logically.
3. Verify keyboard order, visible focus, reduced motion, touch targets, mobile wrapping and 200% reflow.
4. Verify no note content reaches URLs, logs, analytics, fixtures or evidence.
5. Verify wording makes the device boundary and application non-recording behavior accurate without overclaiming privacy.

## Phase 5 — Deterministic validation

1. Add synthetic Sprint 027 note cases, including horse-name-like text, quantities, units and measurement-like phrases.
2. Prove review confirmation, invalidation, character boundaries, edit/cancel/back transitions and plain-text non-extraction.
3. Prove the source contains no microphone, recorder, SpeechRecognition, provider, endpoint, SDK or audio persistence path.
4. Run the full maintained Sprint 022 workflow suite.
5. Run JSON, domain, roles, Supabase self-test, static, TypeScript, ESLint, production build and `git diff --check`.
6. Scan for secrets, personal information, note contents in evidence, new dependencies, generated artifacts and out-of-scope paths.

## Phase 6 — Closeout

1. Complete the decision record, closeout, changed-file manifest and acceptance traceability.
2. Refresh state, status, decisions, risks/questions where material, evidence index, schedule, sprint list and Architect briefing.
3. Confirm no schema, migration, provider, remote, Production, deployment or Git publication action occurred.
4. Confirm the other worktrees were not modified.
5. Leave work unstaged and uncommitted unless separately instructed.

Successful outcome: `voice-assisted-typed-device-fallback-complete-provider-deferred-clean`.

Do not describe this outcome as provider-backed transcription, app recording, verified on-device recognition, transcription accuracy proof or full voice production readiness.

============================================================
FILE: planning/sprints/027-voice-assisted-capture/acceptance.md
============================================================

# Sprint 027 — Voice-Assisted Capture Acceptance

## Baseline and scope

- [ ] Exact clean baseline `6f8543020e126a4620f09be017744dcc75061e6e`, ancestry and isolated worktree are proven.
- [ ] Dirty `develop` and isolated Sprint 025/026 worktrees remain unchanged.
- [ ] Every changed file is in the approved set and recorded in the closeout manifest.
- [ ] The established typed-note persistence and authenticated horse-access boundary remain intact.

## Decision and privacy contract

- [ ] `docs/VOICE_ASSISTED_CAPTURE_027.md` records typed notes as the permanent fallback.
- [ ] Device keyboard dictation is accurately described as user/device-controlled text entry, not an application recording service.
- [ ] The application requests no microphone permission and records, uploads, stores or transmits no audio.
- [ ] No external transcription provider, API, SDK, endpoint, account, secret or model is introduced.
- [ ] No claim says dictation is local-only, offline, private, accurate, secure or retained nowhere.
- [ ] Future provider/privacy/consent/retention/deletion decisions remain explicitly unresolved and fail closed.

## Capture and review behavior

- [ ] Ordinary typed entry remains available on every supported path.
- [ ] The same editable textarea accepts typed, pasted or device-dictated text.
- [ ] Existing 2,000-character validation and live count remain accurate.
- [ ] Review shows the exact note draft or `No notes added`.
- [ ] A non-empty note requires an initially unchecked review/correction confirmation before submit.
- [ ] Editing the note invalidates prior confirmation.
- [ ] Empty notes do not require voice/transcript confirmation.
- [ ] Existing pending lock and Edit path remain correct.
- [ ] Notes never populate or change horse, date/time, readings, scores, statuses or recommendations.
- [ ] No transcript/audio origin metadata is persisted.

## Failure, accessibility and content safety

- [ ] Unsupported dictation, device permission/settings, offline, interruption and error guidance always returns the user to typed entry and review.
- [ ] No fake recording, waveform, confidence, transcription-progress or provider state appears.
- [ ] Labels, descriptions, errors, character count and confirmation are programmatically associated.
- [ ] Review-blocked/correction-required messages are announced and focused logically.
- [ ] Keyboard operation, visible focus, reduced motion, 44px touch targets, narrow layout and 200% zoom/reflow pass.
- [ ] Status meaning does not depend on colour.
- [ ] No note content enters URLs, logs, analytics, test output or closeout evidence.
- [ ] Wording contains no diagnosis, correctness guarantee, transcription-accuracy claim or replacement-of-professional-judgement claim.

## Deterministic proof

- [ ] Sprint 027 synthetic tests cover typed fallback, device guidance, review confirmation and invalidation.
- [ ] Exact 2,000-character and over-limit cases pass.
- [ ] Horse-name-like text, quantities, units and measurement-like phrases remain plain note text and do not change structured values.
- [ ] Edit, cancel/back and submission-lock transitions pass.
- [ ] Static proof finds no `getUserMedia`, `MediaRecorder`, `SpeechRecognition`, provider, endpoint, SDK, audio blob/storage or transcript extraction path.
- [ ] Maintained Sprint 022 workflow tests pass.
- [ ] JSON, domain, roles, Supabase self-test, static, TypeScript and ESLint checks pass.
- [ ] Production build passes, or equivalent/stronger safe proof is documented under the Evidence-Proportional Execution Standard.
- [ ] `git diff --check`, approved-path, dependency, secret, personal-information and generated-artifact scans pass.

## Closeout

- [ ] Decision record, closeout, manifest, planning state and Architect briefing agree.
- [ ] No schema, migration, provider/configuration, remote, Production, deployment, alias/domain, real-data, staging, commit, push, PR or merge action occurred.
- [ ] Work remains unstaged and uncommitted unless separately instructed.

## Acceptable outcomes

`voice-assisted-typed-device-fallback-complete-provider-deferred-clean` when typed/device-controlled note entry, mandatory review and all required proof are complete while provider-backed voice remains unavailable.

`voice-capture-baseline-blocked-clean` when exact baseline, ancestry or isolation cannot be established and implementation does not begin.

`voice-capture-authority-conflict-blocked-clean` when completion would require an unapproved microphone API, provider, external transfer, audio retention, schema change or other privacy/authority expansion.

`voice-capture-validation-blocked-clean` when scoped implementation exists but required privacy, non-extraction, accessibility, regression, build or scope validation does not pass.

============================================================
FILE: planning/sprints/027-voice-assisted-capture/handoff-prompt.md
============================================================

# Builder Handoff — Sprint 027

You are Builder for Sprint 027 — Voice-Assisted Capture.

Apply this Pack in a new isolated worktree based exactly on clean commit `6f8543020e126a4620f09be017744dcc75061e6e`. Verify all four generated Sprint 027 files, then implement the sprint completely from them. Do not modify the dirty `develop` worktree or the isolated uncommitted Sprint 025 and Sprint 026 worktrees.

Deliver the approved safe launch fallback: ordinary typed notes always work; users may use their device keyboard’s own dictation into the same textarea; every non-empty note remains editable and requires explicit review/correction confirmation before submission. Editing invalidates confirmation. Notes remain plain text and must never populate numeric readings, horse identity, dates, scores, statuses or recommendations.

Do not add an in-app microphone button or call `getUserMedia`, `MediaRecorder`, `SpeechRecognition` or `webkitSpeechRecognition`. Do not add a transcription provider, API, model, SDK, endpoint, secret, dependency or raw-audio path. Do not claim device dictation is local-only, offline, private, accurate or retained nowhere. The application records and stores no audio in this sprint.

Create the canonical Q&A decision record, improve the mobile note and review experience, preserve existing server authority and 2,000-character validation, and add deterministic synthetic proof. Cover horse-name-like text, quantities, units, measurement-like phrases, cancellation, editing, confirmation invalidation, submission locking, privacy wording and accessibility/responsive contracts. Run the full maintained Sprint 022 regression and canonical validation/build gates.

Follow the Evidence-Proportional Execution Standard. Stop only for a material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup boundary. Substitute equivalent or stronger safe proof when optional tooling is unavailable. Keep in-scope harness, validator, formatting, encoding, reporter and deterministic corrections in Sprint 027. Do not create a follow-up solely for unavailable optional tooling. Use manual intervention only after safe alternatives are exhausted and record the five required parts without requesting secrets or real dictated content.

Do not change schema/migrations, roles/RLS, providers, remote configuration, Production, deployments, aliases/domains, dependencies or unrelated product surfaces. Do not stage, commit, push, merge or open a PR. Complete the sprint, refresh durable planning state, produce the closeout evidence and leave work unstaged and uncommitted unless separately instructed.
