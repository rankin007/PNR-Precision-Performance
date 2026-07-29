# Sprint 028 Acceptance

## Baseline and authority

- [ ] Exact Sprint 027B integrated candidate, ancestry, manifest and clean/dirty state are recorded.
- [ ] Prerequisite outcome is `completed-product-lineage-reconciled-combined-proof-clean`, or Sprint 028 stops cleanly without reconstruction by guesswork.
- [ ] Stale 023/028 roadmap mappings are reconciled prospectively to `028 — Stable Dashboard And Horse Workspace`; historical artifacts are unchanged.
- [ ] `docs/STABLE_DASHBOARD_AND_HORSE_WORKSPACE_028.md` maps every displayed derivation to source, permission, time basis, explanation, action and unavailable/error treatment.
- [ ] Every attention, incomplete, changed and next-action rule is explicitly approved or visibly unavailable.

## Stable dashboard

- [ ] An authorised user can identify which accessible horses have an approved operational attention signal and why.
- [ ] An authorised user can see what changed, what is incomplete and what permitted action comes next.
- [ ] Neutral overview remains useful when attention authority or source data is unavailable.
- [ ] Counts, rows, ordering, reasons and links exclude inaccessible horses/stables.
- [ ] Every indicator states or makes discoverable its basis and relevant time window.
- [ ] Status is never communicated by colour alone.
- [ ] No attention signal implies clinical severity, diagnosis, treatment, performance prediction or race readiness.

## Horse workspace

- [ ] Each accessible horse has one coherent workspace with identity/context and focused operational summary.
- [ ] Latest result presentation preserves approved label, value, explanation and authority/version context.
- [ ] Historical result/trend access preserves snapshot meaning and rejects or explains incompatible comparison.
- [ ] Evidence and note areas reflect completed lineage, including blocked/unavailable states, without adding new upload or voice behaviour.
- [ ] Capture, review, correction and evidence action entry points appear only when permitted and route to existing supported workflows.
- [ ] Missing, stale, partial, denied and failed data cannot appear Green, normal or complete by default.

## Derivation and data correctness

- [ ] Derivations are typed, deterministic and independently tested outside UI components.
- [ ] Time-dependent rules use an explicit clock/time-zone contract and deterministic boundary tests.
- [ ] No current rule silently reinterprets a historical snapshot.
- [ ] No free-text note or attachment content is used to infer attention.
- [ ] Query composition is server-side, field-minimal, permission-aware and bounded.
- [ ] Realistic-volume proof demonstrates no unbounded history load or per-horse N+1 growth on the primary overview path.
- [ ] Zero/one/many, incomplete, unavailable, stale, failed and incompatible-version cases pass with synthetic data.

## Permissions and privacy

- [ ] Existing role, membership, assignment, permission and RLS contracts are unchanged.
- [ ] Read-only and write-capable users see the correct existing actions.
- [ ] Wrong-horse and cross-stable denial covers rendered data, counts, URLs/actions and derivation influence.
- [ ] Fixtures, logs, screenshots and evidence contain no real identifiable horse/stable data or secrets.
- [ ] No schema, migration, RPC, database view/function, RLS or permission change occurred.

## Design and accessibility

- [ ] Portal surfaces follow `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` and remain distinct from the public marketing experience.
- [ ] Mobile, tablet and desktop layouts are usable without horizontal page overflow.
- [ ] Keyboard navigation, visible focus, heading hierarchy, landmarks and accessible action names pass.
- [ ] Loading, empty, unavailable, stale, denied and error states are distinct and understandable.
- [ ] The workspace uses progressive disclosure and does not overload users with simultaneous charts.
- [ ] Language is informational, non-diagnostic and supports rather than replaces trainer/veterinary judgement.

## Validation and closeout

- [ ] Focused Sprint 028 derivation, query, component/route and responsive/accessibility proof passes.
- [ ] Maintained Sprint 021/022/025/026/027 regressions relevant to the integrated baseline pass.
- [ ] Canonical JSON, domain, roles, Supabase self-test, static, TypeScript and lint checks pass.
- [ ] Production build passes in the project root or an equivalent reparse-safe workspace with the substitution recorded.
- [ ] `git diff --check`, approved-path, secret/private-data and artifact scans pass.
- [ ] Any unavailable preferred tool is replaced by equivalent or stronger safe evidence and documented accurately.
- [ ] Durable planning files agree on the exact Sprint 028 outcome and limitations.
- [ ] No remote/production/provider mutation, deployment, domain/alias change, staging, commit, push, merge or PR occurred.

## Acceptable outcomes

`stable-dashboard-and-horse-workspace-complete-clean` when the authorised operational overview and coherent horse workspace pass all applicable acceptance criteria with only approved derivations.

`stable-dashboard-and-horse-workspace-authority-limited-clean` when the useful neutral dashboard/workspace is complete but one or more attention/change/next-action rules remain explicitly unavailable because authority is incomplete.

`integrated-baseline-unavailable-clean` when the exact completed 027B candidate cannot be established without guessing or absorbing unrelated work.

`data-contract-expansion-required-clean` when correct bounded composition requires a schema, RPC, RLS, permission or other contract change outside this Pack.

`stable-dashboard-and-horse-workspace-validation-blocked-clean` when in-scope implementation exists but a material security, privacy, integrity, permission, performance, build or cleanup acceptance boundary fails.
