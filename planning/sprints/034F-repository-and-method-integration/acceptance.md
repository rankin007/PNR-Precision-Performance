# Sprint 034F Acceptance - Repository and Method Integration

| ID | Acceptance criterion | Required evidence |
| --- | --- | --- |
| AC-01 | Cwd and Git root equal the permanent canonical path; branch and base equal the approved 034F values. | Exact command output. |
| AC-02 | Pack dry-run reports exactly four traversal-free destinations under one 034F sprint folder; application creates exactly those files. | Importer output and reread. |
| AC-03 | The 29-path direct-root allowlist starts from the accepted continuity manifest; the final manifest records exactly eight bounded current-v18 local transformations, and its `localCorrections` set equals the exact upstream-to-current hash delta. | Machine-readable source-classification and hash-delta test. |
| AC-04 | Manifest entries resolve to present files and every SHA-256 matches. | Focused test, zero mismatches. |
| AC-05 | Architect, Builder, Fly, Fly Lean and Onboard launchers plus `AGENTS.md` form a coherent direct-root operating path. | Static assertions and targeted reread. |
| AC-06 | Pack importer permits safe in-root sprint targets and refuses traversal, absolute and protected targets without outside writes. | Red/green behavioral assertions. |
| AC-07 | Updater imports without network, validates allowlists/placement, and refuses unsafe workspace/path cases. | Red/green behavioral assertions. |
| AC-08 | `.gitignore` preserves current-main rules, adds approved hygiene and exposes only the exact tracked `.claude` method commands. | Exact diff and `git check-ignore` assertions. |
| AC-09 | Product/runtime, database, package/lock and deployment configuration surfaces are byte-identical to the opening base. | Pre/post tree/hash comparison. |
| AC-10 | No provider, credential, data, trainer, Production, deployment, alias or remote write occurs. | Action ledger and Git/external invariance. |
| AC-11 | Historical planning/evidence is not imported; current planning contains only the integration road and 034F current-flight records. | Path allowlist inspection. |
| AC-12 | The excluded DOCX remains untouched, untracked and absent from index/diff without content access. | Metadata-free Git path checks only. |
| AC-13 | Syntax, focused behavior, JSON, manifest, whitespace and scope checks pass with exact counts/results. | Actual command/exit-code ledger. |
| AC-14 | A context that did not write the code independently inspects the full diff/evidence and passes every criterion or returns bounded fixes. | Independent review decision. |
| AC-15 | Closeout marks only 034F done, leaves 034G-I planned, records Product Done false/no Product change, sets STATUS `sprint-closed`, and final reread proves consistency. | Roadmap, briefing, state, review, status and final diff reread. |

## Verification commands

Builder must run the exact applicable equivalents of:

```powershell
$pwd.Path
git rev-parse --show-toplevel
git branch --show-current
git rev-parse HEAD
node --check scripts/apply-architect-pack.js
node --check scripts/update-method.js
node --check scripts/test-method-integration-034F.mjs
node scripts/test-method-integration-034F.mjs
npm run validate:json
git diff --check
git status --short --branch --untracked-files=all
```

The focused test must additionally perform exact manifest-hash, ignore-boundary, scope-invariance and unsafe-path assertions. A Product build is intentionally not required because the approved file set cannot affect Product/runtime/package content.
