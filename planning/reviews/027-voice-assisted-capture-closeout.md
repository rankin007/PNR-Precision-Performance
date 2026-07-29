# Sprint 027 Voice-Assisted Capture Closeout

## Outcome

Sprint 027 is complete as `voice-assisted-typed-device-fallback-complete-provider-deferred-clean` from exact baseline `6f8543020e126a4620f09be017744dcc75061e6e` on isolated branch/worktree `codex/027-voice-assisted-capture` / `C:\tmp\pnr-027-voice-assisted-capture`.

Typed notes remain permanently available in one ordinary textarea. Users may use their device keyboard's own dictation when provided, but the application requests no microphone permission, handles no audio, and uses no transcription provider. Every substantive non-empty note requires an initially unchecked review/correction confirmation; editing invalidates confirmation; empty notes remain unaffected. Note text remains plain text and is never transferred to structured readings or result fields.

## Contract reconciliation

- The server still controls authenticated operational access, writable-horse lookup, finite numeric validation, the 2,000-character note cap, and `biochemistry_test_notes` persistence.
- The persistence model, `note_source: "manual"`, role/RLS boundary, scoring, classifications, and recommendations are unchanged.
- Pre-submit note review is client integrity guidance; saved-comment editing remains a separate post-save workflow.
- The canonical Q&A decision and future fail-closed boundary is `docs/VOICE_ASSISTED_CAPTURE_027.md`.

## Acceptance traceability

- Baseline/scope: exact baseline, ancestry, isolated worktree, and clean starting state were established before pack application. Original `develop`, Sprint 025, and Sprint 026 worktrees were not edited by Sprint 027.
- Privacy/authority: source and dependency scans show no application-controlled microphone/recognition API, audio path, provider integration, endpoint, SDK, model, account, or secret.
- Capture/review: deterministic tests cover typed fallback, empty/non-empty notes, initially unconfirmed blocking, confirmed submission eligibility, confirmation invalidation through note updates/edit, exact 2,000/2,001 boundaries, exact review text, pending lock, and `No notes added`.
- Non-extraction: synthetic horse-name-like, quantity, unit, punctuation, and measurement-like text remains unchanged in `notes`; structured identifiers/readings remain unchanged.
- Failure/accessibility: device-controlled fallback wording covers unavailable settings, offline behaviour, interruption, inaccuracy, typing, and review. Programmatic descriptions, invalid state, alert announcement, logical focus, visible focus styles, 44px-class touch sizing, wrapping, and reflow-friendly source contracts pass static review, lint, typecheck, and build.
- Evidence qualification: no optional rendered browser/device session was run. Accessibility, narrow-layout, reduced-motion inheritance, touch, and 200% reflow conclusions are source/static/build evidence only; no rendered or real-device behaviour is claimed.

## Validation

`npm.cmd run validate:local` passed on 2026-07-29 after a temporary dependency junction allowed the isolated worktree to reuse the existing dependency installation without dependency mutation. It passed JSON validation, scoring/recommendation/domain tests, Sprint 022 regression, Sprint 027 tests, role tests, all maintained Supabase self-tests, encoding/static validators, ESLint, TypeScript, and the Next.js production build. The build compiled and generated 25/25 static pages.

The first identical run passed every component/static gate and stopped only because the Windows sandbox denied Next's `.next/cache/eslint` directory creation. The rerun outside that filesystem restriction passed; this is equivalent direct executable proof, not a product exception. Focused Sprint 027 and Sprint 022 runs also passed. `git diff --check` passed.

## Changed-file manifest

- `components/ops/biochemistry-capture-workflow.tsx` — device-boundary guidance, review confirmation, blocking/focus/error behaviour, exact note review.
- `components/ops/biochemistry-workflow-state.ts` — deterministic substantive-note review/submission helpers.
- `scripts/test-biochemistry-voice-027.mjs` — maintained synthetic Sprint 027 proof.
- `scripts/run-validation-suite.mjs`, `package.json` — maintained test registration only; no dependency change.
- `docs/VOICE_ASSISTED_CAPTURE_027.md` — canonical Q&A decision record.
- `planning/sprints/027-voice-assisted-capture/*` — applied four-file sprint handoff.
- `planning/reviews/027-voice-assisted-capture-closeout.md` — this closeout.
- `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, `planning/ARCHITECT_BRIEFING.md` — durable closeout alignment.

No action/server, page, CSS, schema, migration, RLS, provider, configuration, remote, production, deployment, alias/domain, real-data, dependency, staging, commit, push, PR, or merge change occurred.

## Final boundary

Provider-backed transcription and application-controlled microphone capability remain unavailable. A future approved sprint must resolve provider, processing region, subprocessors, consent, retention/deletion, security, accuracy/correction, incident, schema, and operational decisions before expanding this boundary.
