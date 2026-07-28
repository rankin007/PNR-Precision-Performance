# Sprint 023D - Builder Handoff Prompt

You are Builder for Sprint 023D - Upload And Storage Architecture Design.

Apply and verify all four Sprint 023D files, then execute strictly from them.

First prove a clean committed Sprint 023C baseline containing the exact governed contract hashes and `decision-contract-approved-clean` closeout. The uncommitted Sprint 023C worktree is not a valid 023D baseline. Do not commit it inside 023D. If the commit does not exist, stop `architecture-baseline-blocked-clean` with the five-part Manual Intervention Rule.

After the baseline passes, work only in a new isolated `codex/023D-upload-and-storage-architecture-design` branch/worktree. Produce documentation and planning evidence only. Read production/schema/configuration source for evidence but do not edit it.

Translate all twenty approved decisions into one implementation-ready architecture: additive logical schema, private bucket/object model, selected upload/download protocol, complete lifecycle state machine, application/database/Storage permission agreement, file validation, controlled CSV registry boundary, sanitisation/scanning boundary, idempotency/duplicates/replacement, compensation/reconciliation, retention/deletion/holds/backups, audit/logging, UI/accessibility contract, and exact 023E implementation/proof handoff.

Verify current platform limits using official primary documentation. Do not rely on remembered request-size, signed-URL, RLS, region, background-job, or provider behaviour.

Recommend options and trade-offs, but do not silently choose any provider, processor, paid service, dependency, secret, scheduler/runtime, controlled CSV format, retention cadence, purge-operator mechanism, or contractual conclusion. Obtain explicit authority where the choice is design-critical. If unresolved, stop `architecture-decisions-blocked-clean` and do not begin implementation.

Do not create migration `0018`, edit production source, add packages, create buckets/policies, contact providers, mutate remote state, deploy, push, merge, or begin Sprint 023E/023F/024.

Do not commit unless separately asked after presenting the complete validated design.
