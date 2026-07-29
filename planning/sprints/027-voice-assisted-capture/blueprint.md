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
