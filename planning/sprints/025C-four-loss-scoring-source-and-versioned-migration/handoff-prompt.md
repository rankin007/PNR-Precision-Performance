# Sprint 025C Builder Handoff — Four-Loss Scoring Source and Versioned Migration

## Task contract

**objective:** Deliver one locally proven, versioned four-loss scoring path for new tests while preserving historical v1 scoring and keeping unapproved clinical content unavailable.

**owns:** The exact approved implementation, fixture, additive migration, focused tests, scoring documentation and required closeout files listed in requirements.

**must_not:** Do not change historical v1 meaning/data; invent loss values, thresholds, recommendations, guidance or clinical language; edit/commit the private workbook; create credentials; access or mutate remote/Production systems; deploy; send email/enquiries; move aliases; stage; commit; push; merge; or open a PR.

**acceptance:** All authority/source, four-loss scoring, next-lower, conductivity rounding/cap, hidden-retained Urea, versioned persistence, v1 compatibility, fail-closed content and 44-assertion requirements in `acceptance.md` pass with zero external effects.

**verification:** Run the focused source/scoring/migration/workflow tests, retained domain suite, typecheck, zero-warning lint, Production build, JSON/static validation, migration static/self-test proof, `git diff --check`, changed-file safety scans and final index/external-effect checks. Equivalent or stronger safe local evidence may substitute for an unavailable supporting tool.

## Required execution order

1. Dry-run this Pack, apply it, and reread all generated files plus the 025B authority/closeout and source contracts.
2. Verify canonical/Git/worktree truth and preserve every pre-existing change.
3. Inspect the exact approved implementation files and present the code-gate plan with file list, scope guards, acceptance mapping and `12 + 18 + 8 + 6 = 44` assertion target.
4. Wait for explicit approval of that exact plan unless a valid active Fly exception covers this Pack.
5. Extract and verify the private workbook numerically without editing, copying into the repository or exposing it.
6. Create the deterministic canonical fixture and additive migration.
7. Implement the separate v2 domain, new-write, persistence and display paths while retaining v1 compatibility.
8. Run focused then retained/full gates; apply at most two focused repairs per failure.
9. Reconcile closeout records, leave the index empty and stop without remote or Production action.

## Manual intervention

Use manual intervention only if the accepted workbook cannot be read safely, its identity/table integrity materially differs, or an authority/migration boundary cannot be resolved through safe local evidence. Record the blocker, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Do not request credentials or confidential worksheet contents in chat.

## Final report

Lead with the delivered behavior. Report the exact changed files, 44-assertion arithmetic/results, retained/full gates, workbook/table integrity, formula/source versions, migration status, historical compatibility, fail-closed content, staged/external/residue counts and any substitute proof. State clearly whether anything is required from the user. If nothing remains, end exactly: `I need nothing from you.`
