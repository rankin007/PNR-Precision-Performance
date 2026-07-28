# Sprint 023D — Application, Database And Storage Permission Agreement

Status: approved design; unimplemented

Every positive requires authenticated active account, active stable membership, current horse relationship/assignment, underlying-test access, matching test/horse/stable, non-revoked state and a fresh server check. Database helpers/RLS repeat the same facts. Storage prefixes confer no authority. Direct client Storage access is limited to exact-intent `INSERT`; all other byte operations are server-mediated.

| Operation | Positive role | Application + DB requirement | Storage/object requirement |
|---|---|---|---|
| Initiate/upload/finalise | Admin, assigned Trainer, assigned Stable Staff | write helper; acknowledgement; live intent; quota; Staff owns pending attempt | exact private key/intent; insert only; no overwrite/list |
| List/view/preview | Admin, assigned Trainer/Staff/Vet/Owner; expressly assigned consultant | read helper; `available`; not deleted | no direct list; server metadata only; preview uses fresh signed delivery |
| Download | same, but consultant additionally expressly authorised to download | fresh read/download check and audit | server signs exact available object for 60 seconds |
| Replace | Admin, Trainer; Staff only own pending upload | write helper; new version; predecessor stays available until success | new key only; never overwrite |
| Soft-delete | Admin, Trainer | delete helper; available; audit | server marks concealed; bytes retained during window |
| Request restore | Trainer | current read scope; within 30 days | no direct byte access |
| Execute restore | authorised Admin | current scope, eligible, no conflict; audit | object exists and safety state remains valid |
| Hold create/release | authorised Admin | explicit hold routine, reason/owner/review | no direct change; purge prohibited |
| Mark/clear quarantine | future specifically authorised Admin workflow only | metadata review cannot execute content; adapter outcome required to clear | never client-readable; no manual unsafe preview |
| Purge | designated active Admin with `evidence.purge` | eligible, 30 days, no hold, reason, audit | server deletes, verifies absence, then minimises metadata |
| View audit | Admin full; Trainer filtered current-horse activity | audit RLS/filter | no object access |

RLS/helper additions must be narrow operation predicates such as `can_initiate_test_evidence`, `can_read_test_evidence`, `can_soft_delete_test_evidence`, `can_restore_test_evidence`, `can_manage_evidence_hold`, and `can_purge_test_evidence`; names remain proposals. Existing broad service-role bypass is never the permission model.

Mandatory denials: anonymous; no membership; inactive/suspended/revoked user or membership; wrong horse; same-stable but unassigned where assignment is required; cross-stable; deleted/inaccessible test; non-available or deleted evidence; insufficient role/access level; forged test/horse/stable/uploader/key/size/MIME/role; expired/mismatched intent; stale or tampered signed URL; Staff replacement after pending ownership ends; Vet/Owner writes; consultant without explicit assignment or download grant; Admin purge without `evidence.purge`; held or premature purge.

Agreement tests must exercise each row through application action, direct database RLS and Storage policy where applicable, proving the same allow/deny result. A disagreement is a release blocker.
