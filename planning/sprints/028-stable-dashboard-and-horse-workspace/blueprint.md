# Sprint 028 Blueprint

## Delivery sequence

### Phase 1 — Freeze the trustworthy baseline

1. Locate the Sprint 027B integrated candidate and verify its outcome, ancestry, branch/worktree, manifest and index state.
2. Inventory current portal, horse, result, recommendation, evidence, trend, note and data-entry surfaces.
3. Map existing server-side access checks and queries; do not weaken or reimplement RLS in UI code.
4. Record the stale sprint-number mappings and select this Pack's exact 028 identifier without modifying historical handoffs.
5. Produce an approved-path manifest before product edits.

### Phase 2 — Resolve the operational contract

1. Create `docs/STABLE_DASHBOARD_AND_HORSE_WORKSPACE_028.md`.
2. Record the four user questions, personas within existing roles, information hierarchy and action destinations.
3. Create an authority/derivation matrix for every attention, incomplete, changed and next-action signal.
4. Prefer a small set of explainable operational rules. Mark every unapproved rule unavailable.
5. Define time zones, date boundaries, compatible snapshot versions, tie-breaking, stale-data treatment and query bounds.
6. Define loading, empty, partial, unavailable, denied and error states separately.

### Phase 3 — Build typed data composition

1. Keep data retrieval server-side and scoped by the existing authenticated context.
2. Select only fields required by the overview/workspace; do not fetch protected free text or attachment content for summary derivation.
3. Compose a typed stable-overview model and horse-workspace model from existing authorised sources.
4. Put deterministic derivations in pure functions with explicit clocks/time-zone inputs where time affects results.
5. Preserve source/version identifiers needed to prevent incompatible historical comparison.
6. Add bounded query/page limits and prove that inaccessible records cannot influence counts, ordering or state.

### Phase 4 — Implement the stable dashboard

1. Replace shell/placeholder content only where required by the approved design.
2. Present a stable summary and scan-friendly horse overview using approved signals.
3. Explain why an item appears and make its next action obvious.
4. Provide neutral ordering when attention authority is unavailable.
5. Keep filters minimal and local to the approved outcome; do not recreate Sprint 027 saved-view scope.
6. Preserve useful state across navigation only through existing supported patterns.

### Phase 5 — Implement the horse workspace

1. Establish one canonical page structure: identity/context, latest status, incomplete/next action, results/history/trends, evidence and notes.
2. Reuse completed 025–027 components/contracts and link to existing actions rather than duplicating workflows.
3. Hide or disable actions according to the established action contract, with accurate explanatory text.
4. Use focused summaries and progressive disclosure instead of simultaneous dense charts.
5. Keep historical snapshot wording/version intact.

### Phase 6 — Prove the outcome

Use synthetic, non-identifying fixtures to cover:

- zero, one and many authorised horses;
- mixed complete/incomplete/unavailable records;
- approved attention and neutral-unavailable ordering;
- compatible and incompatible snapshot versions;
- missing, stale, loading, partial and failed sources;
- read-only versus write-capable users under existing permissions;
- cross-stable/wrong-horse exclusion from rows, counts, order and navigation;
- mobile, tablet and desktop presentation;
- keyboard, focus, headings, landmarks and status non-colour cues;
- bounded query behaviour at realistic stable size;
- safe language and no clinical-priority inference.

Run maintained Sprint 021/022/025/026/027 regressions and canonical JSON, domain, role, Supabase-self, static, TypeScript, lint and production-build validation appropriate to the actual integrated baseline. Use rendered interaction proof when safely available; otherwise use an equivalent combination of component/DOM assertions, route execution, responsive source contracts and manual inspection, recording the substitution accurately.

### Phase 7 — Close proportionately

1. Review the complete diff and approved-path manifest.
2. Record query shape/performance, permission boundaries, derivation authority and unavailable rules.
3. Refresh state, status, decisions, risks, questions, sprint schedule/list, evidence index and Architect briefing to agree on 028.
4. Preserve historical packs and sprint artifacts.
5. Leave work unstaged and uncommitted unless separately instructed.

## Preferred implementation shape

- `docs/STABLE_DASHBOARD_AND_HORSE_WORKSPACE_028.md`: product, derivation and query contract.
- One narrow pure module for operational summary derivations.
- One server-side stable-overview composition boundary.
- One server-side horse-workspace composition boundary.
- Reusable presentational components for labelled status, reason and permitted next action.
- Focused deterministic tests plus maintained regression registration.

Exact paths must follow the verified integrated baseline. Builder may adapt filenames without widening the approved surface and must record the final path manifest.

## Architecture decisions

- Existing authentication, RLS, membership and horse-assignment boundaries remain final authority.
- The dashboard is a read composition over existing data, not a new persistence model.
- Attention is explainable operational review, never clinical severity.
- Historical outputs retain their stored/versioned meaning.
- Missing/unavailable data stays visibly unknown.
- UI components consume typed view models; they do not calculate domain results independently.
- Server queries must be permission-aware, field-minimal and bounded.

## Stop conditions

Stop and close cleanly if:

- the trustworthy Sprint 027B integrated baseline cannot be proven;
- a requested rule lacks authority and no safe neutral/unavailable design satisfies the useful outcome;
- correct aggregation requires schema, RPC, RLS or permission changes;
- existing access behaviour leaks inaccessible horse/stable data;
- incompatible source versions cannot be compared safely;
- implementation would require real private data, remote/production mutation or destructive cleanup;
- required cleanup cannot be proven exact and safe.
