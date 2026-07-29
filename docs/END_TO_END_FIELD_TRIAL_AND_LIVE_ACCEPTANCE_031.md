# Sprint 031 End-to-End Field Trial Matrix

## Governance

Run ID: `031-FIELD-20260729-01`. Fixtures are visibly synthetic. Ceilings are one stable, three horses, three Auth identities and zero commerce fixtures. Ownership is held only in protected process memory. Cleanup order is Storage/evidence, tests, assignments, horses/stable, profiles/users, then Auth identities. Any target, ledger, RLS, privacy, integrity or cleanup mismatch stops the run.

The only permitted remote target is a generated non-Production Vercel Preview bound to the approved Singapore Supabase project at ledger `0001`–`0021`. Production aliases, Stripe, real data, schema/RLS/role/permission changes and unavailable clinical/audio/commerce activation are refused.

## Matrix

| Slice | Actor / viewport | Action and expected UI/state | Denial/failure expectation | Evidence | Cleanup owner | Result |
|---|---|---|---|---|---|---|
| Access lifecycle | anonymous, admin, writer, read-only / desktop | Redirect, bootstrap and permission-correct surfaces | inactive, revoked and cross-stable access denied | rendered/runtime | run ledger | pending |
| Capture | writer / 390px and 1440px | Select horse/date/time; enter five readings; review/correct/submit; persist exact horse/user | validation, retry and duplicate submit remain safe | rendered/runtime | run ledger | pending |
| Notes | writer / phone | Typed note requires confirmation; edit invalidates confirmation | no application audio/transcription claim | rendered/runtime | run ledger | pending |
| Results/history | writer/read-only / desktop | Safe unavailable result, stored version context, stable snapshots, compatible literal change | missing/incompatible history explicit; no fixture recommendations | rendered/runtime | run ledger | pending |
| Dashboard/workspace | all roles / phone/tablet/desktop | Complete, incomplete and empty horses; neutral order; permission-aware next action | inaccessible records do not influence bounded aggregation | rendered/runtime | run ledger | pending |
| Evidence | writer/read-only / desktop | Declaration, acknowledgement, governed upload/finalise/access/removal | fail closed; cross-stable denied; no public URL or CSV | rendered plus equivalent 023L runtime | run ledger | pending |
| Unavailable boundaries | all / desktop | Clinical thresholds/priority, audio and commerce clearly unavailable | checkout no mutation; webhook `503` | rendered/runtime | none | pending |
| Accessibility/failure | keyboard / 390px, 768px, 1440px, 200% | Focus, labels, landmarks, status cues, reflow, loading/empty/error distinctions | interrupted, expired and retried actions fail safely | rendered inspection | none | pending |
| Recovery | service cleanup | Exact-owned state removed dependency-safely | final Auth/application/Storage must be `0/0/0` | aggregate runtime | run ledger | pending |

No under-60-second claim will be made. Any timing is observational and records viewport, network class and sample size.
