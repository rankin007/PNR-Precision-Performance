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
