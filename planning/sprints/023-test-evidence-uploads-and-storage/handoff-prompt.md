# Sprint 023 - Builder Handoff Prompt

You are Builder for Sprint 023 - Test Evidence Uploads And Storage.

Apply and verify all four Sprint 023 files, then execute strictly from them.

Start with the hard baseline gate. Do not edit production source until one clean isolated commit is proven to contain the accepted Sprint 021AH and Sprint 022/022B product source. Do not use the 029M marketing-release branch as a product baseline merely because it is the latest deployed branch. Do not alter the original dirty `develop` worktree. If the baseline cannot be proven, stop `evidence-upload-baseline-blocked-clean` with the required five-part intervention.

Next reconcile all twenty privacy/storage/lifecycle decisions. Existing Sprint 013 file categories and the 2 MB limit are evidence, not authority. Do not invent missing decisions. If a decision affecting schema, access, privacy, retention, deletion, ownership, audit, or object lifecycle remains unanswered, stop `evidence-upload-decisions-blocked-clean` before schema, Storage, server upload, or remote work.

After both gates pass, document the full design before coding. Implement only the smallest private, test-scoped, audited evidence workflow in the approved file set. Preserve application/RLS agreement, wrong-horse and cross-stable denial, safe retry/cleanup, accessible mobile behaviour, and unchanged readings/scoring.

Use synthetic files only. Never expose secrets, signed URL values, storage paths, private payloads, or real client evidence in logs or records.

Remote bucket creation, policy application, migration, hosted fixtures, deployment, push, PR, and environment/secret mutation are not included without a later exact user instruction. Stop and record manual intervention rather than improvising an external action.

Correct the planning schedule's 023/028 label conflict only as part of evidence-backed closeout. Do not implement the Sprint 028 dashboard.

Do not commit unless separately asked. Do not begin Sprint 024 or any later sprint.
