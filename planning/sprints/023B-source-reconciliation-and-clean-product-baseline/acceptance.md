# Sprint 023B - Source Reconciliation And Clean Product Baseline Acceptance

## Isolation And Provenance

- [ ] The original dirty `develop` branch, HEAD, status, index state, and safe fingerprints are recorded before work.
- [ ] `b8961b9`, `ad9d419`, relevant refs, and their ancestry are independently verified.
- [ ] The selected base is justified by exact committed source and preserves the accepted 029M release lineage.
- [ ] A separate `codex/023B-source-reconciliation-and-clean-product-baseline` branch/worktree begins clean.
- [ ] Every original modified or untracked path is classified under the required classification contract.
- [ ] Every included file or hunk maps to accepted 021AH, 022, 022B, shared-required, or durable provenance evidence.
- [ ] Every excluded or unresolved path has a recorded reason.

## Reconciled Product Baseline

- [ ] Migrations `0001` through `0017` are present in order and immutable historical bytes were not edited.
- [ ] The accepted 021AH authenticated application/access helpers and focused local proof source are present.
- [ ] The accepted Sprint 022 workflow components, state model, route integration, focused test, and documentation are present.
- [ ] Sprint 022B evidence corrections are represented without inventing stronger runtime claims.
- [ ] Shared source was reconciled at hunk level rather than copied indiscriminately.
- [ ] The accepted Sprint 029M public-site source and release/rollback provenance remain intact.
- [ ] No unrelated 021-series experiment, 029 follow-up, temporary, generated, local-only, secret-bearing, or unproven file is included.
- [ ] No upload, Storage, privacy/lifecycle decision, scoring, recommendation, voice, commerce, public release, or deployment behaviour is added.

## Validation

- [ ] Focused included 021AH local tests pass without remote/provider contact.
- [ ] Sprint 022 deterministic workflow tests pass.
- [ ] JSON, domain, role, Supabase self-test, static, TypeScript, and lint gates pass.
- [ ] Production build passes from the exact isolated reconciled source.
- [ ] `validate:ci` and `validate:local` pass when their documented local prerequisites are available, or exact inherited/environment blockers are recorded without weakening gates.
- [ ] Migration ledger and bootstrap alignment checks pass through `0017`.
- [ ] `git diff --check` passes for the reconciliation.
- [ ] No dependency was added.
- [ ] No secret, credential fragment, signed URL, private payload, or real client data appears in the diff or evidence.
- [ ] Route/source inventory proves no unintended public, protected, upload, scoring, recommendation, checkout, or deployment change.
- [ ] Original dirty-worktree non-mutation proof passes at closeout.

## Commit And Handoff

- [ ] Without a separate commit instruction, the isolated reconciliation remains reviewable and uncommitted with an explicit proposed commit message.
- [ ] If separately instructed to commit, only approved paths are staged and the staged diff is inspected before one local commit.
- [ ] If committed, the final isolated worktree is clean and the commit SHA, parent/base, ancestry, required path presence, and relevant hashes are recorded.
- [ ] No push, PR, merge, rebase, deployment, remote mutation, or `develop` mutation occurs.
- [ ] Sprint 023 receives an exact clean-baseline SHA only after a commit exists; a ready-for-commit worktree is not misreported as a clean committed baseline.

## Closeout Outcomes

Close with exactly one:

- `source-reconciled-ready-for-commit`: accepted source is reconciled and validated in the isolated worktree, but no separate user commit instruction has been given.
- `clean-product-baseline-established`: the user separately requested the commit; the validated reconciliation is one clean local commit with recorded SHA and all acceptance gates pass.
- `source-reconciliation-blocked-clean`: provenance, scope, source separation, migration integrity, isolation, or validation prevents safe reconciliation; no original-worktree or remote mutation occurs.

No outcome implies Sprint 023 upload implementation, privacy-decision completion, remote readiness, deployment, public launch, commerce readiness, production readiness, or project Done.
