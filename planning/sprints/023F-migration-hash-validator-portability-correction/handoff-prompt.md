# Sprint 023F - Builder Handoff Prompt

You are Builder for Sprint 023F - Migration Hash Validator Portability Correction.

Apply and verify all four Sprint 023F files in the existing isolated, intentionally uncommitted Sprint 023E worktree at `C:\tmp\pnr-023e-local-upload-storage`. Do not create another branch/worktree. First record the controlled dirty manifest, clean index, baseline `a7e2ebd63d84353d7a18a0b3d4af7936469913c3`, exact 023E attribution, unchanged migration `0009`, and LF/CRLF root-cause proof. Stop before editing if any statement is false.

Preserve canonical migration `0009` hash `6DD2238DE81A92E63146895B1EB681585E145C4C51727E7B1555D2D854E65CC9`. Correct only the validator’s platform-dependent hashing: strict UTF-8, normalize CRLF to LF only, then hash canonicalized bytes. Do not accept the Windows raw hash, alter a migration, change `.gitattributes`/Git configuration, weaken the check, depend on Git, or add a dependency.

Add focused temporary-file proof for LF/CRLF equivalence and rejection of content, whitespace, newline, BOM, invalid-UTF-8 and lone-CR mutations. Preserve every existing lookup/structural assertion.

Then rerun the full Sprint 023E validation set. If all required gates pass, update the authorised 023E evidence and closeout to `local-upload-storage-implementation-proven-clean`, explicitly recording that Sprint 023F superseded the initial validator blocker. If another independent gate fails, retain an accurate blocked outcome.

Do not modify 023E product/migration implementation, apply migrations, create Storage, inspect protected values, install dependencies, contact providers, perform remote operations, deploy, stage, commit, push, merge, or begin Sprint 023G. Finish with one allowed 023F outcome and leave all work uncommitted unless separately instructed.
