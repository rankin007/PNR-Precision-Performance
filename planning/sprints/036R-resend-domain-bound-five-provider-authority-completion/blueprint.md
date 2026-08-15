# Sprint 036R Blueprint - Resend Domain-Bound Five-Provider Authority Completion

## Flight evidence

1. **Class and reason:** critical - masked management credentials, five provider authorities and the later credential/identity/trainer gate create high blast radius despite read-only scope.
2. **Invariant:** only fixed provider reads plus unique verified Resend domain and public DNS equality may mint authority. CLI profiles, token possession, caller labels, fixtures, screenshots, raw values and writes cannot.
3. **Paths:** accepted graph -> seven roots -> five readers; retained expected domain -> domain list -> domain get -> SPF/DKIM/MX comparison -> domain account alias; masked parent -> private child -> in-memory projection -> canonical ledger -> Markdown.
4. **Sources/transforms/sinks:** accepted authority, masked credentials/IDs, fixed responses and DNS answers -> strict decode/paginate/reconcile/taint/project -> three approved evidence artifacts. Raw secrets, DNS values, responses and control files are not sinks.
5. **Discriminators:** reject `whoami` as identity, pending/sending-disabled/duplicate domain, unsupported record purpose/type, out-of-apex name, DNS missing/extra/duplicate/ambiguous tuple, MX-priority mismatch, invented key fields, arbitrary DNS and request 25; behaviorally accept both normalized one-TXT-DKIM and three-CNAME-DKIM official shapes only for one verified sending-enabled exact domain.
6. **Git truth:** start `c90c3201...`, accepted object `bfeb0b23...`, retained 029P/Production apex authority, unchanged Product/migration/lock bytes.
7. **Fallbacks:** missing/insufficient access, wrong authority, domain/DNS mismatch, drift, incomplete pagination, taint, timeout or uncertain cleanup lands named blocked-clean with zero actions/residue and no 036S/readiness claim.

## Phases

0. Canonical and applied-Pack guard. 1. Revalidate official contracts. 2. Red-first pure domain/DNS/transport/evidence proof. 3. Integrate only fixed Resend operation with live provenance separation. 4. Pass `100+1893=1993` and full gates. 5. Zero-read CapabilityGate. 6. At most one protected session. 7. Reconcile five authorities/domain/DNS/seven rows and atomically land evidence. 8. Rerun gates. 9. Fresh critical inspection and post-PASS closeout.

## Landing

Use target wording only when every requirement predicate passes. Otherwise close the exact fallback, retain 036L, keep 036S/trainer closed and Product Done false.
