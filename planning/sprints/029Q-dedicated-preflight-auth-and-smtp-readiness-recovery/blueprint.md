# Sprint 029Q Blueprint

## Execution sequence

1. Prove canonical CWD/Git top-level, exact start HEAD, exact 029Q branch and inherited 029P/method dirt. Dry-run, apply and reread exactly four Pack destinations.
2. Builder reads the applied sprint, 029P closeout, internal enquiry route, server/environment/provider paths, 029P tests/harness, Credential Manager precedent, current Vercel metadata and accepted routing truth. Return one exact no-edit critical plan with task contract, files, guards, A001-A030, commands, baseline/target arithmetic, closeout, `Pack corrections` and blockers.
3. A genuinely fresh Architect reviews that exact plan under the three-decision critical budget. Implementation starts only after `pass`.
4. Observe the 488/488 029P/retained baseline. Add red-first discriminating tests for in-window success, wrong bearer, malformed verifier/window, window longer than fifteen minutes, before-not-before, after-expiry, exact-action restriction, existing shared-auth preservation and sanitized denial.
5. Implement the narrow server-only verifier and route decision. Keep all non-`smtp-preflight` actions on the unchanged shared path. Add the fixed-target Credential Manager/process controller, sanitized readiness harness, tests, package registrations and operations document.
6. Run focused and retained suites, exact arithmetic, PowerShell parser/self-test, TypeScript, zero-warning lint, Production build and mapped static/privacy/encoding/scope gates. Run metadata-only protected-content scanning before content diffs; inspect only scanner-clean files and capture an exact candidate manifest.
7. Perform fresh read-only provider preflight: exact Resend verified domain and two masked baseline keys; exact Vercel project with zero dedicated SMTP and zero preflight-auth names; unchanged generic rows; five aliases on 036L; prior candidates unaliased.
8. Prevalidate the no-token Resend-to-Vercel blind transfer. Create exactly one domain-restricted sending key, complete the non-observation Copy/paste/save/dismiss/clear sequence, then create/read back the four exact SMTP binding names/types/targets without values.
9. Run the Credential Manager controller: prove target absence, generate at least 256 random bits, store the raw bearer under the exact 029Q target, derive its SHA-256 verifier in process, and add the exact hash/not-before/expiry rows through stdin with a total window at most fifteen minutes. Emit no bearer or fragment.
10. Create exactly one Production-targeted `--skip-domain` candidate from the canonical 029Q workspace. Require exact project/source, Ready and zero aliases.
11. Run immutable non-storing checks, then exactly one successful authenticated `smtp-preflight`. Require finite Resend `ready`.
12. Keep the raw bearer only in Credential Manager until expiry. After expiry, issue one same-bearer request and require sanitized 404 before handler invocation. Delete the three exact project verifier-window rows and fixed local credential, then prove both absences.
13. Prove zero `/api/enquiries`, zero email/submission/data activity, four retained dedicated SMTP rows, unchanged two pre-existing Resend keys plus the one exact new key, all five aliases on 036L and prior candidates unaliased.
14. On non-target, execute exact compensation with no retry. On target, retain only the new SMTP readiness resources and unaliased candidate; public enquiry stays unavailable.
15. A fresh inspector distinct from Builder and plan reviewer judges every criterion, implementation diff, real local/provider/Vercel/deployment evidence and complete closeout plan under the three-decision budget.
16. After inspection `pass`, update proportional durable truth, mark 029Q ready or truthful fallback, leave 029R conditional and set STATUS `sprint-closed`. Rescan before final disk/Git content reread, then reread provider/Vercel/candidate/log/live-routing truth. Do not commit or push.

## Architecture trace

```text
Temporary preflight authentication
  -> cryptographic random bearer generated without human input
  -> fixed Sprint 029Q Windows Credential Manager target (raw bearer)
  -> transient process memory
  -> SHA-256 only
  -> exact Vercel project verifier + not-before + expiry bindings
  -> one Production-targeted zero-alias candidate snapshot
  -> POST /api/internal/enquiries action=smtp-preflight only
  -> bounded-window constant-time verification
  -> existing runSmtpPreflight -> Nodemailer verify(), no email
  -> expiry denial before handler
  -> remove three project bindings and local credential

SMTP readiness
  -> verified Resend domain
  -> one new domain-restricted sending key
  -> blind direct transfer to Sensitive PUBLIC_ENQUIRY_SMTP_PASS
  -> four dedicated Production SMTP bindings
  -> candidate verify() ready

Accepted live path remains separate
  -> five aliases -> accepted Sprint 036L
  -> no enquiry route, message, database write or alias transition
```

`CRON_SECRET` remains the source for ordinary internal maintenance authentication and is neither read nor changed. Windows Credential Manager is the encrypted raw-bearer store. Vercel holds only the hash and bounded timestamps for the temporary path. Resend and four retained Vercel SMTP rows are the readiness source; candidate no-send proof is the sink.

## Flight evidence

1. **Class and reason:** `critical`; authentication, provider credential creation, protected token transport, encrypted Production configuration, external deployment and compensating deletion are in scope.
2. **Acceptance invariant at risk:** no raw secret becomes agent-visible or durable outside provider/OS secure stores; the temporary bearer authorizes only one action and becomes unusable after at most fifteen minutes; ordinary shared authentication remains unchanged; one unaliased candidate authenticates to Resend without sending; no public/data/alias effect occurs.
3. **Affected layers and verified paths/symbols:** Windows Credential Manager; new fixed controller; Vercel environment control plane; new `lib/enquiries/preflight-auth.ts`; `app/api/internal/enquiries/route.ts`; existing `internalRequestIsAuthorized`, `runSmtpPreflight`, `verifySmtpTransport`; Resend Domains/API Keys; 029Q harness/tests; one candidate; five public aliases.
4. **Source, transformations and sink:** random bytes become a local bearer; only its SHA-256 verifier and bounded window reach the candidate; exact action/body and constant-time checks gate `runSmtpPreflight`; the raw bearer is used once successfully and once after expiry for rejection, then destroyed. Separately, a domain-restricted Resend key transfers directly to the Sensitive SMTP pass binding and drives `verify()` without send.
5. **Discriminating examples:** the same bearer/hash succeeds at `notBefore + 1 minute` and fails at `expiresAt + 1 second`; a seventeen-minute configured window fails even while current time lies inside it; a valid dedicated bearer with `maintain` fails while the unchanged correct shared bearer retains its existing result; a wrong hash fails; old-generic-only SMTP remains unavailable while complete dedicated SMTP is available.
6. **Durable verification source:** canonical HEAD/branch and dirty classification; applied four-file 029Q sprint; exact scanner-clean diff and SHA-256 manifest; counted tests/build; fixed sanitized controller results; Resend domain/key counts; Vercel name/type/target metadata; one deployment ID/origin/zero-alias projection; one finite ready result; one expired 404; temporary-resource absence; request counts; five-alias reread.
7. **Known uncertainty:** browser UI may be the only Resend key-creation surface; protected transfer must be prevalidated before creation. `verify()` cannot prove sender acceptance or delivery. Existing keys and generic bindings cannot be changed by inference. No Git publication is in scope. Later delivery/activation remains 029R.

## Failure and compensation matrix

| Boundary | Required result | Non-target handling |
| --- | --- | --- |
| Canonical/Pack | Exact workspace/start/branch/four destinations | Stop before implementation |
| Plan review | Fresh `pass` within three decisions | Correct within Pack intent or ask |
| Local authentication | All discriminating cases, shared-path preservation and fixed sanitized output pass | Correct in 029Q; no external action |
| Provider preflight | Verified domain, exact masked baseline, exact project and absent new names | Stop before creation |
| Resend key/SMTP transfer | One restricted key and four exact rows, no token observation | Remove exact new resources if safe; stop |
| Temporary auth provisioning | One absent fixed target, random bearer, hash-only candidate config, <=15-minute window | Remove exact new rows/credential; stop |
| Candidate | One exact Ready zero-alias deployment | No second deployment; compensate new resources |
| SMTP verify | One finite Resend `ready` | No retry; compensate; aliases remain 036L |
| Expiry/cleanup | Same bearer denied after expiry; three remote rows and local target absent | Stop at cleanup boundary; do not claim clean |
| Side effects | Zero send/submission/data/alias activity | Stop and contain unexpected effect |
| Inspection | Distinct fresh `pass` | Replan under critical limits |
| Closeout | Scanner-clean disk/Git plus provider/Vercel/candidate/log/live truth aligned | Do not claim landing if inconsistent |

## Evidence arithmetic

The Builder must observe the exact 488/488 retained baseline before edits, then publish target arithmetic from all new 029Q assertions. New auth/controller/expiry cases add to rather than replace retained coverage. Report focused, retained and full Product gates separately; never hide a failed group inside an aggregate.
