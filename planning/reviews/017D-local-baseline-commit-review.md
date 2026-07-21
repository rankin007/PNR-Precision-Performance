# Sprint 017D — Local Baseline Commit Review

## Outcome

`baseline-blocked-clean`

No commit was created. The exact manifest paths were restored from the index after a mandatory validation gate failed. Branch `develop`, HEAD `171d3aa4186e04c656a50d91b52b1f086f95f89a`, all working files, and the empty index are preserved.

## Opening Repository Evidence

- Branch: `develop`
- HEAD: `171d3aa4186e04c656a50d91b52b1f086f95f89a`
- Local-ref upstream relation: 3 ahead / 0 behind `origin/develop`
- Opening index: empty
- Status after Pack application: 35 tracked modifications, 227 untracked files, zero tracked deletions
- 017C boundaries: `.release-main/` and `.claude/` present and root-ignored
- Samples SHA-256: `983FCC21629EDF76A864375A78908D62EC2376E140B37BF6DCC42DFB5110DF0D`, matching 017C
- Relocated DOCX SHA-256: `C91CAFA385906084BDAF36FC266F7EBF25CDEA1DC96398372F1FC8FD7E83F240`, matching 017C
- The restricted 021M support record was checked by filename/existence/ignore state only; its content was not opened, printed, hashed, copied, staged, or scanned.

## Manifest And Intentional Staging

The exact manifest contained 263 candidate paths and 20 named exclusions.

| Group | Paths |
|---|---:|
| `application-design` | 18 |
| `auth-role` | 5 |
| `database-migrations-verification` | 15 |
| `planning-evidence` | 187 |
| `reference-scaffold` | 2 |
| `repository-method-config` | 8 |
| `validation-scripts-tests` | 28 |

Each candidate was staged individually with literal pathspec handling. No broad staging command was used. The index matched all 263 manifest paths exactly; zero candidates remained unstaged or untracked, and the protected record never entered the index.

Mandatory exclusions included local environment files, `.release-main/**`, `.claude/**`, the restricted 021M support record, generated build/dependency/cache/log/temp paths, local IDE state, credentials, tokens, cookies, sessions, and protected browser/process material.

## Staged Safety Review

- All 25 staged Architect Packs passed format validation.
- All five staged JSON files parsed successfully.
- Staged high-confidence secret scan passed across 263 paths without emitting values.
- The relocated DOCX was the only staged binary.
- New file modes were normal `100644`; no accidental executable mode was found.
- Representative group statistics were reviewed; the staged aggregate was 263 files, 29,445 insertions, and 163 deletions.
- `git diff --cached --check` passed.

## Validation Results

| Validation | Result |
|---|---|
| Sprint 017D Pack check | Pass |
| Every staged Architect Pack check | Pass — 25 packs |
| Every staged JSON parse | Pass — 5 files |
| Biochemistry scoring fixtures | Pass |
| Biochemistry recommendation fixtures | Pass |
| Sprint 019 design-system validation | Pass |
| Sprint 020 remote-readiness static validation | Pass |
| Sprint 020C database-audit static validation | Pass |
| Sprint 020E structural-audit static validation | Pass |
| Sprint 020F replacement-audit static validation | Pass |
| Sprint 020G clean-rebuild validation | **Fail** — validator requires migration versions exactly `0001`–`0010`, while accepted repository history includes `0011` and `0012` |
| Remaining role/self-test/lint/TypeScript/build gates | Not run; mandatory stop applied at first failed gate |

No protected-input or remote execution harness was run.

## Commit Evidence

- Intended Commit 1 subject: `chore: establish post-sprint-021 repository baseline`
- Commit 1: not created
- Commit 2: not applicable because Commit 1 did not pass its gate
- Existing HEAD remained unchanged

## Manual Intervention

**Blocked:** the mandatory Sprint 020G validator rejects the accepted `0011` and `0012` migration files because it still asserts an exact `0001`–`0010` ledger.

**Evidence checked:** validators through Sprint 020F passed; `scripts/validate-supabase-clean-rebuild-020G.ps1` stopped with `Migration versions must be exactly 0001 through 0010.` The repository’s accepted candidate ledger is `0001`–`0012`. Sprint 017D does not permit editing validators or historical evidence merely to make validation pass.

**Exact user/manual action needed:** request a follow-up Architect Pack that authorizes reconciling the local clean-rebuild validator with the accepted immutable `0001`–`0012` migration ledger, then retry the local-baseline sprint under the next valid Sprint 017 suffix.

Steps:

1. Ask Architect to scope a Sprint `017E` validation-reconciliation Pack (or revise roadmap sequencing if 017E is reserved for remote handoff).
2. Authorize only the narrow validator/test/documentation files needed to make the expected ledger consistent with accepted migrations `0011` and `0012`.
3. Have Builder apply that Pack and prove the corrected static validator passes without remote access.
4. Create a later Sprint 017 follow-up Pack to repeat exact manifest staging, the complete validation suite, and the two local commits.

**Builder verification afterward:** confirm the reconciled validator explicitly supports `0001`–`0012`, rerun every 017D credential-free gate from the beginning, prove staged-set equality and exclusions again, and create no commit until every gate passes.

## Closing Repository Evidence

- Branch: `develop`
- HEAD: `171d3aa4186e04c656a50d91b52b1f086f95f89a`
- Git index: empty
- Non-ignored working files: preserved; 263 visible paths including 017D artifacts and closeout records before final planning updates
- Residual ignored/local-only paths: `.release-main/`, `.claude/`, local environment paths as applicable, generated/dependency/cache/log/temp paths, and `planning/reviews/021M-supabase-support-escalation.md`

No push, fetch, pull, PR, remote backup, hosted change, provider action, authenticated proof, migration execution, deployment, production mutation, or product-behavior change occurred.
