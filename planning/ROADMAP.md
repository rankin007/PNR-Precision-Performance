# Roadmap - Precision Performance

> A living estimate, not a contract. Sprints may be added, split, reordered, or dropped as evidence changes. Roadmap rows do not authorize implementation, external mutation, deployment, staging, commit, or push.

**About:** About 9 named sprints on the current road
**Last estimated:** 2026-08-04
**Delivered since this roadmap was adopted:** 7 sprints - 034B, 034C, 034D, safely rolled-back 036, preflight-blocked-clean 036B, access-unavailable-clean 036C and revocation-blocked 036D
**Next destination:** Architect consideration of a narrow 036E human-factors correction; deliberate non-promotion remains in force

**Completed before this roadmap existed:** sprints 001-035K, including follow-ups (the record lives in planning/sprints/, planning/STATE.md, and planning/SPRINT_LIFECYCLE_LEDGER.md)

| # | Sprint | Phase | Status | Why it matters |
| --- | --- | --- | --- | --- |
| 034B | Canonical workspace and Mission Control realignment | Foundation | done | Established one permanent source of truth, adopted method v8 safely, and stopped tools reading or writing the wrong project folder. |
| 034C | Delivery access and credential cleanup | Foundation | done | Established a non-secret delivery/operator access register, retained ambiguous access safely, and proved no external operational mutation was justified. |
| 034D | Legacy worktree retirement and canonical authority finalisation | Foundation | done | Completed the approved 49-row retirement manifest, leaving zero legacy targets/registrations/stale metadata, one canonical registration and exact retained recovery proof. |
| 036 | Production promotion decision and live trainer acceptance | Release | done - rolled back | Exact candidate deployed Ready, but alias-control post-state was ambiguous; all five aliases were restored to the Ready rollback before human Production acceptance. |
| 036B | Authoritative Production alias transition and live trainer acceptance | Release | done - preflight blocked clean | Unchanged-source validation and the exact five-alias rollback baseline passed; protected identity fields appeared during provider readback, so execution stopped before staging, alias mutation or human acceptance. |
| 036C | Protected Production preflight and live trainer acceptance | Release | done - access unavailable clean | Identity-blind tooling and unchanged-application validation passed; no existing Management API credential was available, so execution stopped before provider request, Vercel baseline, staging or Production action. |
| 036D | Single-use Management access and live trainer acceptance | Release | done - revocation blocked | Deterministic lifecycle proof passed, but the only credential was entered at a plain acknowledgement prompt; it was manually revoked and confirmed absent, same-token invalidation was unprovable, and no downstream work began. |
| 036E | Beginner-safe protected interaction correction | Release | planned | Define a narrow human-factors contract so non-secret acknowledgements cannot be mistaken for credential entry while retaining all protected-operation controls; no implementation or live retry is authorized by this roadmap row. |
| 029N | Public enquiry privacy and submission completion | Conversion | planned | Resolve the accepted privacy/data boundary and turn the visibly unavailable stable-trial form into a governed submission workflow. |

## Notes

- Table order is the current proposed sequence even where a follow-up keeps an earlier core sprint number.
- Sprints 034B, 034C, 034D, 036, 036B, 036C and 036D are closed. Sprint 036D is blocked, not clean, and did not establish live trainer access. Sprint 036E is a planning recommendation only. Sprint 029N remains gated.
- Historical sprints are not duplicated as done rows. The mid-flight statement and lifecycle ledger preserve that history.
- Sprint 036C made no deployment or alias mutation. Production remains on the compatible Sprint 035D rollback according to the last authoritative five-alias proof; Preview acceptance remains distinct from Production acceptance.
- Sprint 036D made no provider API, retained-pilot, Vercel, deployment, alias or Production attempt after the blocked credential lifecycle. Manual exact-token revocation and list absence do not replace same-token invalidation proof.
- The retained Sprint 035K trainer identity and eight-record synthetic fixture remain governed until a later exact disposition changes them.
