# Voice-Assisted Capture 027

This Q&A is the canonical Sprint 027 contract for voice-assisted notes in authenticated mobile biochemistry capture. It governs the bounded typed/device-keyboard fallback and must be superseded explicitly before the application controls a microphone or sends audio or text to a transcription service.

## What input is always available?

Ordinary typed notes are the permanent fallback. The existing optional textarea is the single authoritative draft for typed, pasted, or device-dictated text and retains the 2,000-character limit.

## What voice assistance is available?

A user may choose their device keyboard's microphone when their device provides one. The keyboard enters text into the same ordinary editable textarea. Availability and behaviour are controlled by the user's device, keyboard, and settings, not by this application.

This does not establish that keyboard dictation is on-device, private, offline, secure, accurate, or retained nowhere. Those properties depend on the device and keyboard chosen by the user.

## What does the application do with audio?

Nothing. Sprint 027 requests no application microphone permission and introduces no application audio capture, recording, upload, transmission, storage, playback, or deletion flow. It persists no raw audio, filename, blob, duration, confidence score, interim transcript, provider identifier, or voice biometric.

## Is an external transcription service involved?

No. The application introduces no transcription request, provider account, model, API, SDK, endpoint, secret, or dependency. Device-keyboard behaviour remains outside the application boundary and is governed by the user's device and keyboard settings.

## What must the user review?

Every non-empty note must remain editable and be reviewed as ordinary text. On the review step, the user must confirm that the exact note text was checked and any dictation errors corrected before submission. Editing the note invalidates that confirmation. An empty note needs no note confirmation.

The server remains authoritative for authenticated horse access, the 2,000-character limit, and persistence through `biochemistry_test_notes`. Editing a saved comment is a separate post-save workflow from this pre-submit review.

## Can note text change structured test data?

No. Note text is never parsed or transferred into horse identity, date, time, numeric readings, scores, classifications, statuses, or recommendations. Typed, pasted, and device-dictated text are equivalent after review, so no transcript or audio-origin metadata is persisted.

## What should users do when dictation is unavailable or unreliable?

Continue typing in the same field. If device permission or keyboard settings prevent dictation, adjust them only through the device's own controls if desired. If offline behaviour, interruption, or an error produces missing or inaccurate text, edit the text, review it, and retry only through those device controls. The application does not show recording, waveform, confidence, transcription-progress, or provider states.

Users should not dictate unnecessary personal, confidential, veterinary, customer, stable, or operational information. The application makes no transcription-accuracy, clinical-correctness, or confidentiality claim beyond its own no-audio boundary. Technology supports rather than replaces trainer or veterinary judgement.

## What remains unresolved for a future application-controlled capability?

Any expansion fails closed until a later approved decision resolves, documents, and tests:

- the provider, model, subprocessors, processing regions, and cross-border transfers;
- lawful basis, user notice, consent, microphone-permission handling, and withdrawal;
- raw-audio and transcript collection, purpose, minimisation, retention, deletion, recovery, and audit rules;
- encryption, access control, incident response, provider training/use restrictions, and contractual terms;
- accuracy expectations, correction workflows, names/quantities/measurement risks, confidence handling, and clinical-safety claims;
- unsupported devices, offline operation, interruptions, cancellation, retries, and fail-closed behaviour; and
- schema, role/RLS, evidence, monitoring, support, and production-readiness consequences.

## How can this contract change?

A later approved sprint must name this document, record the superseding decision and authority, update privacy and security risks, and prove the expanded behaviour before any microphone API, audio pathway, or external transcription integration becomes available. Silence, a provider default, or a technical experiment does not supersede this contract.
