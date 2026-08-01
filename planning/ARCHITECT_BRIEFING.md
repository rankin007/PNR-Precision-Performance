# Architect Briefing - Sprint 034B Closeout

## Executive summary

**Business outcome:** Precision Performance now has one permanent canonical OneDrive clone and a locally validated method-v8 control plane without changing the product or losing uncertain repository history.

**Current focus:** Decide whether to plan Sprint 036 production promotion and live trainer acceptance while preserving the retained governed pilot and current production boundary.

**What is proven:** The canonical Git identity, exact seven v8 payload hashes, four-file Pack output, roadmap/status/briefing structures, 89 deterministic Sprint 035K assertions, canonical quality gates and bounded legacy disposition are proven locally.

**What is not live:** The 034B branch is uncommitted/unpushed, production was not promoted, production human acceptance has not run, and Sprint 036 and 029N remain unresolved plans only.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Canonical repository authority | passed | Exact canonical root/top-level/common-dir, standalone `.git`, branch and starting SHA were verified. |
| Official method v8 adoption | passed | Manifest v8 metadata and all seven declared payload hashes match; Pack dry-run/application and both syntax checks pass. |
| Product regression safety | passed | Sprint 035K remains 89/0; typecheck, zero-warning lint, production build, JSON, encoding and static gates pass with zero product diff. |
| Mission Control rendered closeout | passed | Owner Re-detect confirmed the canonical folder, Sprint 034B closed, 89 tests all passing and all four executive fields populated. |

## Where things stand

The repository and planning control plane are realigned around the permanent canonical clone. The official v8 method update is exact, current planning names Sprint 036 as the explicit next destination, and the dirty legacy root plus ambiguous worktrees remain preserved. The exact duplicate 035K temporary directory was removed through Git; two locked stale metadata directories remain safely deferred. Owner-operated Mission Control acceptance passed.

## Current status

Sprint 034B is closed `canonical-realignment-complete-legacy-cleanup-deferred-clean`. HEAD remains the uncommitted starting SHA `47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b`; no staging, commit or push has occurred.

## Since last sprint

Sprint 035K remains closed with private human Preview trainer acceptance passed, the governed adopted pilot and eight synthetic records retained, and production unpromoted. Sprint 034B established the canonical workspace guard, adopted exact method v8, introduced the mid-flight roadmap, completed the v8 briefing contract, reconciled current planning authority, and bounded legacy disposition.

## Architecture / file map

- `AGENTS.md` - canonical-root startup guard and legacy-workspace stop rule.
- `.120x/method-manifest.json` and seven declared payloads - exact official v8 authority.
- `planning/ROADMAP.md` and `planning/STATUS.json` - Mission Control current and forward-state inputs.
- `docs/ARCHITECT_BRIEFING_SPEC.md` and `templates/method/ARCHITECT_BRIEFING.template.md` - complete v8 briefing contract.
- `planning/reviews/034B-legacy-worktree-disposition.md` - sanitized legacy metadata and cleanup result.
- `planning/reviews/034B-canonical-workspace-and-mission-control-realignment.md` - implementation and validation evidence.

## Decisions

The canonical OneDrive clone is the sole active Precision Performance workspace. The legacy root and uncertain worktrees remain preserved. Sprint 036 is the next product decision, followed by planned 029N; neither is authorized by the roadmap. Preview acceptance remains distinct from production acceptance.

## Risks / watch-items

Two already-absent legacy metadata directories remain Git-prunable but locked; do not delete them manually. The dirty legacy root and ambiguous worktrees must not be reconciled or copied without a later exact plan. Do not treat Mission Control metadata as proof of production promotion. Mission Control's Delivered and Forward Plan cards do not currently reflect the valid roadmap row count/names; treat those cards as a hosted rendering limitation and use the roadmap plus named executive fields as authority.

## Open questions for the Architect

Should Sprint 036 promote the exact Preview-accepted candidate and repeat human trainer acceptance on production, or deliberately defer production? Sprint 029N remains the named subsequent public-enquiry decision.

## Evidence

- `git rev-parse --show-toplevel` and `--git-common-dir` - exact standalone canonical clone.
- SHA-256 manifest verification - seven of seven payloads exact.
- Pack dry-run/application - exactly four generated 034B files.
- Connected GitHub comparison - remote 035K branch identical to `47d1df447e819b8ec31aaa085a0ff6aeff6e7e8b`, ahead 0, behind 0.
- Git metadata inventory and non-force worktree removal - exact 035K duplicate directory removed; other history preserved.
- `node --experimental-strip-types scripts/test-live-trainer-access-035K.mjs` - 89 assertions passed.
- JSON/static/role/Supabase-self/031C, typecheck, lint and build - passed.
- Owner-operated Mission Control Re-detect - canonical folder up to date; Sprint 034B closed; 89 tests all passing; executive fields populated.
- Roadmap/template diagnosis - v8 structure valid; 034B is the sole `done` row; 036 and 029N are `planned`; Delivered `0 sprints` and Forward Plan `1 sprint - Through Release` are hosted card-rendering limitations.

## Plan corrections

The literal pre-Pack status contained the eight official v8 paths plus the Architect Pack, STATUS and ROADMAP; the owner explicitly accepted those three control-plane artifacts. Direct `git ls-remote` was blocked by the local TLS credential boundary, so the connected GitHub comparison supplied exact identical/ahead-0/behind-0 proof. The full CI runner stopped at an unlisted `playwright-core` dependency; preceding components passed and subsequent maintained groups plus quality gates were run directly. Git removed the exact 035K directory but two stale metadata directories remained locked, selecting the cleanup-deferred outcome. Final Re-detect proved Mission Control read the latest local state, but its Delivered and Forward Plan cards did not interpret the valid roadmap rows literally; this supporting hosted rendering limitation does not justify distorting source truth or creating another sprint.

## Validation / test status

**Tests:** 89 passing, 0 failing.

Both updated Node scripts pass syntax checks. Pack output, 7/7 payload hashes, JSON, 967 maintained text files, seven static validator groups, maintained deterministic groups after the optional transport dependency, TypeScript, zero-warning lint and the 29-page production build pass. No product or external state changed.

## Recommended next Architect action

**Do:** Decide whether to prepare Sprint 036 production-promotion and live-trainer-acceptance discovery.

**Owner:** Product owner and Architect

**Decision:** Promote the exact Preview-accepted trainer candidate to production for bounded live acceptance, or deliberately defer production while preserving the governed retained pilot.

Do not start Sprint 036 or 029N from roadmap presence alone.
