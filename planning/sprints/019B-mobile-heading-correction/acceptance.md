# Sprint 019B - Mobile Heading Correction Acceptance

## Required Acceptance

- Sprint 019B is authorized before the source edit.
- Only approved files are modified.
- The heading remains exactly `Under Construction`.
- At `390 × 844`, the heading is fully visible with no clipped or truncated letters.
- At `390 × 844`, document horizontal overflow is absent.
- At `390 × 844`, heading, paragraph, and CTAs do not overlap.
- At `1440 × 900`, desktop hierarchy and horse-image composition remain intact.
- Operator sign-in retains a visible keyboard focus outline.
- Mobile `/sign-in` remains usable without horizontal overflow.
- `noindex/nofollow`, the supplied image, operator sign-in, and non-persistent interest treatment remain unchanged.
- `/home`, `/contact`, and `/shop` remain gated.
- No public reopening, content rewrite, architecture change, schema/auth/RLS/provider/Stripe/deployment work, dependency addition, commit, push, PR, or production mutation occurs.
- Visual evidence and exact viewport results are recorded.
- Required automated validation passes.
- State/status/briefing close Sprint 019B and reset authorization to `no`.

## Validation Matrix

| Check | Expected result |
|---|---|
| Mobile `/` at `390 × 844` | Complete heading; no overflow, clipping, overlap, or truncation |
| Desktop `/` at `1440 × 900` | Existing accepted composition preserved |
| Keyboard Tab on `/` | Visible data-blue focus outline on Operator sign-in |
| Mobile `/sign-in` | No horizontal overflow or clipped controls |
| `/home`, `/contact`, `/shop` | Existing redirects/gates preserved |
| Holding metadata/source | `noindex` and `nofollow` preserved |
| Sprint 019 validator | Pass |
| ESLint | Pass |
| TypeScript | Pass |
| Production build | Pass |
| `git diff --check` | Pass |

## Manual Intervention

If browser rendering is unavailable, record the exact blocker and do not close visual acceptance as passed. Provide the user with the required viewport and keyboard steps, then verify evidence after completion.
