# Sprint 027C Evidence Ledger

Date: 2026-08-11
Outcome: `voice-fallback-done-closure-complete-clean`

## Canonical and Pack proof

- Working directory and `git rev-parse --show-toplevel` both resolved exactly to `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.
- Branch: `codex/025B-versioned-domain-authority-package`.
- Starting/final HEAD: `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`; no commit was made.
- Baseline staged count: `0`.
- Baseline status set: `288` rows; normalized SHA-256 `659DD6333B9C1E8A9D1DB0D2ED353650F2EBDD3BAE384F47AAEA68C812BA297D`. Pre-existing unrelated work was preserved.
- Architect Pack dry-run and apply both passed. The generated Sprint file is byte-derived from the Pack: `PACK_DERIVATION_MATCH=True`.
- Generated `SPRINT.md` SHA-256: `508B4C97F867B0A8025F3B213AFF4717841DB65B3958C4C004F95B1B6FA47B59`.

## Controlling authority

Fresh inspection retained the 2026-07-29 decisions and `docs/VOICE_ASSISTED_CAPTURE_027.md` without reinterpretation:

- ordinary typed notes are the permanent current-MVP fallback;
- device-keyboard dictation is optional and device-controlled;
- the application does not request microphone permission, handle/store audio or call a transcription provider;
- every non-empty note is editable and requires review before submission;
- editing invalidates review confirmation; empty notes require no confirmation; and
- note text never populates horse, date/time, readings, scores or another structured field.

## Read-only Product/contract manifest

The following SHA-256 values were identical before and after Sprint 027C:

| File | SHA-256 |
|---|---|
| `components/ops/biochemistry-capture-workflow.tsx` | `BA44A4944528E6AC5434D53E13ADF62916B8FDC56D9E400AA36D81DEAEF1B8F4` |
| `components/ops/biochemistry-workflow-state.ts` | `89A40D06BD2A3BEC22B9527FDD79A7B5E4C9E17674422889A7A2DEE6525E45A8` |
| `app/(ops)/data-entry/biochemistry/actions.ts` | `F07C4B59AC22AAF9C039FEB8232BE24BB346BC119C531579AB5AAEDC220F0CD9` |
| `scripts/test-biochemistry-voice-027.mjs` | `068D68C147E11357188BA326A0663396419D8CBD41B6D96CBAD4A2BCADD0865E` |
| `scripts/test-trainer-cockpit-035R.mjs` | `268E0CA9F8518EEA4715E5E639D48B013A8D2825BA0807BB3FAF4BAD04FFA191` |
| `docs/VOICE_ASSISTED_CAPTURE_027.md` | `0CD06B1468EDEE327C00F08A9F186AE7B4F65D4DC2EAA92FA452970E3564FDE0` |
| `package.json` | `F413170A36210B437739AFBBB238060E1A55AD9CD13769D92FF3B321926853E4` |
| `package-lock.json` | `F7760377C159A0A5F4E5F35CDD6008C37326FBDF2672F87B732D61884AC6737A` |

## Executable and validation ledger

| Command/fact | Result |
|---|---|
| `npm run test:voice-027` | PASS: 34 executed assertions (29 call sites plus five loop executions) |
| `npm run test:cockpit-035r` | PASS: 64/64 |
| Counted arithmetic | `34 + 64 = 98` passing, `0` failing |
| `npm run validate:json` | PASS: 8 self-test cases and 7 governed JSON files before closeout; rerun after closeout PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS with zero warnings/errors |
| Optimized build | PASS with pinned repository Node 22.14.0; compiled and generated 28/28 static pages including `/data-entry/biochemistry` |
| Forbidden implementation scan | `0` scoped matches after excluding explanatory copy/history |
| Action-path audio/transcript scan | `0` matches |
| Relevant dependency scan | `0` microphone/audio/transcription provider dependency matches |

The first global-Node build and the first pinned-Node retry encountered the known OneDrive generated `.next` reparse/readlink `EINVAL`. After resolving the exact canonical generated path, only `.next` was removed; the clean pinned Node 22.14.0 rebuild passed. This is a supporting-tool/cache correction, not a Product change.

## Rendered evidence

The packaged browser controls were unavailable because the Windows sandbox ACL helper failed. A local installed Chromium DevTools renderer was used as equivalent evidence against the existing local synthetic harness. The harness action cannot save a record. No real horse, trainer, stable, client or provider data and no audio were used.

- [Mobile capture](visuals/01-mobile-capture-notes-414x896.png): typed notes and accurate optional device-keyboard guidance.
- [Mobile review](visuals/02-mobile-review-unchecked-414x896.png): exact note and initially unchecked confirmation.
- [Blocked review](visuals/03-mobile-review-blocked-414x896.png): visible accessible correction; no submitting state.
- [Desktop capture](visuals/04-desktop-capture-notes-1440x900.png): readable 1440 by 900 layout.
- [Visual manifest](visuals/manifest.json) and [geometry](visuals/geometry.json): exact dimensions, hashes, overflow and control geometry.

Measured facts: mobile `414/414` client/scroll width and desktop `1425/1425`; horizontal overflow false in both. Review button height is `44`, submit button height is `46`, the error role is `alert`, and the network observer recorded zero non-GET/OPTIONS requests.

## Acceptance reconciliation

- P03 remains `deferred-by-approved-scope` for application-controlled voice-to-text. The current-MVP typed fallback and device-keyboard limitation are explicit and evidence-backed.
- O02 is `passed-with-accepted-limitation`: typing is always available, optional device-keyboard text enters the same editable field, and mandatory review is proven. Application audio/transcription and device availability/reliability are not claimed.
- P47 remains `not-proven` for other full-contract gaps. Its voice portion is closed by the accepted fallback rather than left ambiguous.
- Sprint 023Q and private photos/PDFs remain in the MVP 2 list.

## Safety and cleanup

- Product/test/package/schema/configuration changes from Sprint 027C: `0`.
- Test submissions and data mutations: `0`.
- Migrations, deployments, credentials, email, enquiries and alias/domain actions: `0`.
- Stage, commit, push, merge and pull-request actions: `0`.
- Final staged/external/generated-residue counts: `0/0/0`.
- Local ports `3135` and `9227`, browser/harness processes, temporary profiles/helpers, harness residue and generated `.next` were all returned to zero/absent.
