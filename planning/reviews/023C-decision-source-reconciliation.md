# Sprint 023C - Decision Source Reconciliation

Date: 2026-07-28  
Status: source reconciliation complete; authority gate complete

## Isolated Lineage

- Branch: `codex/023C-privacy-storage-and-lifecycle-decision-approval`.
- Worktree: `C:\tmp\pnr-023c-privacy-storage-lifecycle`.
- Exact base: `a7759f691f0e01482f3a396acd14b2a23dbca5ec`.
- Parent: accepted Sprint 029M tip `ad9d419bc40f0be2e13aa297535d3d8e5e151625`.
- The worktree was clean before source intake.
- Architect Pack SHA-256: `A125E99E2CD5D957D1E88819DBD54B7139EE633FB84DA1A703002F3A04353151` (28,422 bytes).
- Pack validation passed with four FILE sections. Check, diff preview, dry-run, apply, and post-apply dry-run all passed; the post-apply dry-run reported all four generated files unchanged.

## Read-Only Sources

| Source | Opening HEAD | Opening status | Use |
|---|---|---:|---|
| Original `develop` worktree | `b8961b9647507af87e6887cf78c1d6e262f944b6` | 255 porcelain lines; dirty, index not changed | Architect Pack and Word decision record only |
| Stopped Sprint 023 worktree | `a7759f691f0e01482f3a396acd14b2a23dbca5ec` | 10 porcelain lines | Four generated Sprint 023 files and three approved 023 reviews |
| Committed Sprint 023B worktree | `a7759f691f0e01482f3a396acd14b2a23dbca5ec` | clean | Clean-baseline and ancestry proof |

No source worktree was switched, staged, stashed, reset, cleaned, committed, or edited by Sprint 023C.

## Copied Artifact Integrity

The four stopped Sprint 023 generated files were copied exactly. Source and destination SHA-256 values agree:

| File | SHA-256 |
|---|---|
| `requirements.md` | `34EC125BC36497F92C0E5E1EE678E19C882C243468231B11FC63F5CF2EAEEBEC` |
| `blueprint.md` | `3DD120B38F4C1F460ACE20EC24AD39499A13FC28664BBCF1D558961013975C37` |
| `acceptance.md` | `F5140D46AA562B0B7E4F523AA9BA353C23C730E03531D6A0750B0234F3843593` |
| `handoff-prompt.md` | `996FCD23F022959B73C7E7AB2E65A4AD1AEE162884B8CC5E93F577AF9CE887EE` |

The three stopped Sprint 023 review files were also copied exactly:

| File | SHA-256 |
|---|---|
| `023-baseline-and-scope-reconciliation.md` | `147B73612EEA24ADD6A5C01C5B295D6782074521463A50DF34DA5D4C8D11DBAC` |
| `023-privacy-storage-and-lifecycle-decisions.md` | `48D6EC63E137D20848B0FA8FCEA54D3A74D6D6FF9556A3819A22583CFABDE5F5` |
| `023-closeout.md` | `DBDEAA8456BB35B2F0A196B988774FB5E20DB2BCA329F7B7A4CE245F474D6487` |

The source Word record was 46,151 bytes with SHA-256 `FD680426598F04235A8F3A3894220B4FE4124D4B8AE944ABB9C2825ED5E0E1D2`. The copied file matched exactly before any controlled revision. OOXML inspection found zero tracked insertions, zero tracked deletions, and zero comment references.

## Authority Reconciliation

The stopped Sprint 023 matrix correctly classified all twenty items as incomplete at that time. The later Word record supplies substantive candidate answers for all twenty and records them as approved recommendations, but its approval section still says:

- decision owner: `To be completed`;
- role/authority: `To be completed`;
- effective date: `28 July 2026, subject to formal sign-off`;
- incident email: `To be advised`; and
- substantive outcome: formal approver details remain outstanding.

The Word record does not identify the earlier standalone `Accept` annotations or map them question-by-question. They cannot be interpreted as final authority without a supplied mapping or an express statement that the consolidated contract supersedes them.

## Existing Contract Reconciliation

- Sprint 013 file categories (`PDF`, `CSV`, `PNG`, `JPG/JPEG`, and `photo`) are proposals. The candidate contract replaces them with JPEG, PNG, PDF, and controlled CSV only. `photo` is represented by JPEG/PNG rather than retained as a separate technical type.
- Sprint 013's 2 MiB per-file proposal is superseded by 5 MiB per file, 10 files per test, and 30 MiB aggregate per test.
- Existing test/horse/stable access remains the underlying gate. The candidate role matrix further constrains evidence operations and does not itself approve RLS or implementation architecture.
- Existing soft-delete scaffolding is retained in principle but expanded by the candidate 30-day administrator restoration window, governed purge, minimal non-content audit, and documented holds.
- Controlled CSV source/template registration and malware-scanner/provider selection remain Sprint 023D design inputs. No format, processor, dependency, service, or secret is selected here.

## Current Gate

The contract is internally consistent without schema or provider design. Phillip Norman Rankin supplied his role as Director, Aprec8 Pty Ltd, authorised to approve privacy and data-handling decisions; approved all twenty consolidated answers as the governing Sprint 023 contract; set the effective date to 28 July 2026; supplied `equineprecisionperformance@hotmail.com` as the monitored incident email; and stated that the contract supersedes every earlier standalone `Accept` annotation. The authority gate is complete. No product, schema, Storage, provider, remote, or deployment work has begun.
