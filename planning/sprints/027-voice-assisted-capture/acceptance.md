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
