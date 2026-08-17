# Current Risks

| Risk | Impact | Control |
| --- | --- | --- |
| The accepted migration ledger has not been executed against a local or remote Postgres instance in 034G. | High | Immutable hashes, lexical SQL, pgTAP assets and policy/function contracts prove repository coherence only. Require separately controlled database application evidence before Production use. |
| The accepted lock graph reports 9 inherited npm audit findings (2 low, 7 high). | High | Investigate reachability and bounded upgrades in a reviewed future slice; do not use an automatic forced upgrade during closeout. |
| Broader current executable suites and operator tooling are not yet reconciled. | High | Sprint 034H must select current proof for the accepted 034G Product surface without importing stale historical harnesses wholesale. |
| Durable Product decisions/evidence still reside partly in the scoped continuity record. | Medium | Sprint 034I reconciles only accepted durable history after implementation/tooling slices are accepted. |
| Local UI proof used a headless-browser substitute and one public icon request returned 404. | Low | Calibrated DOM/metrics, redirects, screenshots and zero runtime/network failures passed; treat the icon as non-material unless current UI acceptance later requires it. |
| Local integration is mistaken for Production readiness or Product Done. | High | Record no provider, remote migration, deploy or publication action; keep Production unaccepted and Product Done false. |