# Current Risks

| Risk | Impact | Control |
| --- | --- | --- |
| The continuity branch is replayed wholesale or mistaken for merge-ready Product integration. | High | Use exact allowlisted method files only; no cherry-pick, merge or Product path. |
| A partial method substrate leaves manifest, launchers or importer inconsistent. | High | Verify all 29 manifest files by SHA-256 and run focused fail-closed behavior proof. |
| Ignoring `.claude/` hides the method command files on the new branch. | Medium | Unignore exactly six command files and prove unrelated `.claude` content remains ignored. |
| Historical planning is imported before implementation slices are accepted. | Medium | Keep planning current-only; defer durable history reconciliation to 034I. |
| Repository integration is misreported as Product or Production progress. | High | Record zero Product/provider/Production change and keep Product Done false. |
