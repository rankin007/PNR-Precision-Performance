# Sprint 027B Overlap And Reconciliation Matrix

## Product paths

No accepted product path overlapped across source sprints. Sprint 025 exclusively owns `lib/domain/biochemistry.ts`; Sprint 026 exclusively owns evidence routes/actions/components/contracts/repository; Sprint 027 exclusively owns biochemistry capture workflow/state. Each was reproduced byte-for-byte before validation.

## Shared executable paths

| Path/hunk | 025 source | 026 source | 027 source | Integrated result |
|---|---|---|---|---|
| `package.json` scripts | Baseline unchanged | Adds `test:evidence-026` | Adds `test:voice-027` | Both independent scripts added exactly once; baseline scripts/dependencies preserved. |
| `scripts/run-validation-suite.mjs` domain group | Adds `biochemistry-authority-025` | Adds `test-evidence-026` | Adds `biochemistry-voice-027` | Three adjacent registrations added exactly once after Sprint 022; no test renamed, replaced, skipped or weakened. |

`package-lock.json` is not changed. No import/type integration correction was required: all focused 025/026/027 tests passed immediately after the additive merge.

## Shared planning paths

| Path | Reconciliation |
|---|---|
| `planning/STATE.md` | Baseline history retained; new leading 027B section records all source outcomes and limitations. |
| `planning/STATUS.json` | Current-only 027B status uses the existing schema; source statuses remain in their closeouts. |
| `planning/DECISIONS.md` | Distinct 025 domain decisions, 026 server-authority decision, 027 voice decisions and one integration decision retained. |
| `planning/RISKS.md`, `planning/QUESTIONS.md` | Sprint 025 source retained, then explicit domain, safety-provider and transcription-provider items added. |
| `planning/EVIDENCE_INDEX.md` | All source authorities/closeouts/tests plus four 027B evidence records indexed. |
| schedule/list/briefing | Current position set to 027B; all three limitations retained; Sprint 028 remains unstarted. |

No source planning file was copied wholesale as the integrated winner.

## Architect Pack selection

- Sprint 025 source Pack hash: `B7999097D740E70406608258A28EAF6DA5BE9964E87DB32C1F478A9E84572D32`; selected canonical Pack from the main project after content comparison.
- The Sprint 025 worktree also contained an unmanifested older Sprint 026 Pack hash `5E57BA86CF93A9346816A11B3F1E5C759F4C03384AEB9DEDFFE00988DF8D8731`.
- Current canonical main-project Sprint 026 Pack hash `CE6FC18C262E3DFB01F5E082EA1736D6049F585DC33EC97D011E2C257408395B` was selected because it is the delivered current Architect handoff; the stale 025-worktree duplicate was excluded.
- Current canonical Sprint 027 Pack and all accepted generated Sprint 025–027 artifacts were preserved. Historical generated artifacts were not rewritten to describe 027B.

## Integration-only corrections

Only additive shared test registration and semantic planning reconciliation were required. Neither changes formulas/threshold semantics, evidence permissions/lifecycle, voice/privacy behaviour, schema/migrations, persistence or user-visible product scope.
