# Stable Dashboard And Horse Workspace 028

Status: implemented with authority-limited operational derivations.

The authenticated dashboard answers which accessible horses need workflow review, what stored result changed, what is incomplete, and the next already-permitted action. It never ranks clinical urgency.

| Signal | Source/query | Permission | Derivation and time basis | Empty/unavailable/error | Destination |
| --- | --- | --- | --- | --- | --- |
| Attention | Latest non-deleted `biochemistry_tests` row returned through existing RLS | Existing horse read access | `review` only when latest `scoring_status` is not `scored`; otherwise clinical priority unavailable | Missing source is unavailable, never normal | Existing review route for writers; horse workspace otherwise |
| Incomplete | Latest test `scoring_status` | Existing horse read access | `blocked` or `unscored` means incomplete as of stored `test_date` | No test is `empty` | Existing capture route only for `horse.records.write`/admin |
| Changed | Two latest tests | Existing horse read access | Literal score/status difference only when formula and lookup-source versions match | Fewer than two or incompatible versions is unavailable | Horse workspace |
| Next action | Existing permissions plus record state | Existing permission codes | Review incomplete, capture absent, otherwise open workspace | No inferred permission | Existing routes only |

Queries are server-side and field-minimal: at most 100 RLS-visible horses and 200 recent non-deleted test projections, with no note or attachment content. Horse detail uses bounded parallel queries and at most two test snapshots. Alphabetical source ordering is preserved; inaccessible rows cannot enter counts, reasons or links because composition begins with the existing RLS-scoped horse query.

Evidence and typed/device-dictation behaviour remain at their existing data-entry routes. The workspace adds no upload, recording, audio, transcription, threshold, recommendation, schema, RPC, RLS or permission behaviour.
