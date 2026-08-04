# Sprint 036H Blueprint

## Delivery sequence

1. Verify canonical path, exact closed 036G SHA, single worktree and expected two-file Architect handoff.
2. Dry-run and apply the Pack; prove exactly four generated 036H files; create the exact 036H branch from the exact starting SHA.
3. Read all four generated files and the named 036G/authentication authorities.
4. Reconcile the four starting hashes and current behavior without editing source.
5. Stop at the Builder code gate with the exact four source/test paths, intended per-file changes, scope guards and acceptance checks.
6. After the code gate is satisfied, implement the smallest code-first diagnostic classifier, safe server-action propagation, ephemeral non-visible marker and deterministic test.
7. Run focused tests and full proportional validation without any network, hosted Auth, browser, mailbox, credential or provider action.
8. Inspect the exact diff and forbidden-output scans; update only proportional docs/planning records; close with one permitted outcome and stop.

No step sends an OTP, uses a provider credential, opens a mailbox, queries a provider, deploys, changes an alias or commits/pushes Git state.

## Gate A - canonical and baseline

Require:

- current directory and Git top-level equal the permanent canonical path;
- `HEAD` equals `831d0465b4e71562d3c062bf3f55d6f0080e3173` before branch creation;
- starting branch is closed 036G;
- exactly one worktree is registered;
- only this Pack and `planning/STATUS.json` are changed before application;
- Pack dry-run reports exactly the four expected new targets;
- Pack application creates exactly those four files; and
- the four starting hashes in requirements match.

The absent local remote-tracking ref for 036G is recorded starting context, not permission to fetch, push or replace the local closed authority. Any different SHA, unexplained file or extra worktree is reconciled before source work.

## Code gate content

Before changing any source or test file, Builder reports this exact intended set:

| File | Intended change |
|---|---|
| `lib/auth/otp-request.ts` | Add the five-value request-diagnostic type and code-first allowlisted classifier without changing the existing public disposition contract. |
| `app/auth/actions.ts` | Return only the allowlisted request diagnostic on the existing retry-later branch; return no raw provider detail. |
| `components/auth/sign-in-form.tsx` | Preserve visible copy; keep the category ephemerally and expose exactly one non-visible marker only while retry-later is active. |
| `scripts/test-auth-request-diagnostics-036H.mjs` | Add deterministic no-network taxonomy, precedence, propagation, marker, clearing, privacy and regression assertions. |

Builder also states that `components/ui/notice.tsx`, existing historical tests, packages, lockfiles, configuration, migrations and every external system remain unchanged.

## Gate B - diagnostic classifier

In `lib/auth/otp-request.ts`:

1. Preserve `OtpRequestDisposition` and `classifyOtpRequestError` behavior.
2. Add an exported exact union for the five diagnostic strings.
3. Add an exported classifier returning that union or no diagnostic.
4. Normalize only a string `error.code`; do not read a message or body.
5. Apply the exact code mapping from requirements in table order.
6. Use status fallback only when no known code matched: `429` to `cooldown`, `>=500` to `provider-unavailable`, otherwise no diagnostic.
7. Prove code precedence with conflicting synthetic statuses.

Do not broaden the existing retry-later error set. If an official code not named by this Pack appears relevant, record it for Architect review rather than inventing a sixth value or silently changing behavior.

## Gate C - safe propagation and ephemeral marker

In `app/auth/actions.ts`:

- type retry-later results so they carry exactly `requestDiagnostic` from the new classifier;
- call the classifier only on the existing operational rejection path;
- retain `reason: "retry-later"` and all successful/indeterminate semantics;
- never return the raw error, code, status, message, email, redirect target or identifier; and
- do not add logging, analytics, headers, cookies or URL state.

In `components/auth/sign-in-form.tsx`:

- keep the exact current visible retry-later and request-may-arrive messages;
- do not display category text or a reference code;
- retain the category only in component state while the retry-later notice is active;
- expose exactly one `data-auth-request-diagnostic` attribute associated with that notice;
- clear diagnostic state before a request and on every flow transition or non-retry-later result; and
- add no storage, query-string, cookie, telemetry or console path.

The DOM marker is allowed because its values are closed, operational, non-personal and non-secret. It must never contain a provider code/status/message or identity-dependent fact.

## Gate D - deterministic verification

The new test must use synthetic objects and source-contract checks only. It must not import a Supabase client, read environment values or make a network request.

At minimum prove:

- all nine exact known codes map to the five approved values;
- string codes normalize safely;
- known code wins over conflicting synthetic status;
- unknown code with `429` maps to `cooldown`;
- unknown code with `500` and `503` maps to `provider-unavailable`;
- no error and unknown non-429/non-5xx inputs return no diagnostic;
- the existing `classifyOtpRequestError` results remain unchanged for its retained cases;
- action source adds only allowlisted `requestDiagnostic` to retry-later;
- form source preserves exact generic copy and one non-visible marker;
- diagnostic state has explicit clearing paths;
- no raw error/message/status/email/OTP/token/session/request identifier is propagated or persisted; and
- no console, analytics, local/session storage, cookie or URL/search-parameter diagnostic path exists.

Run from the repository root:

`node --experimental-strip-types scripts/test-auth-request-diagnostics-036H.mjs`

`node --experimental-strip-types scripts/test-email-otp-035D.mjs`

`node --experimental-strip-types scripts/test-passwordless-redirect-035C.mjs`

`node --experimental-strip-types scripts/test-otp-recovery-path-035F.mjs`

`node --experimental-strip-types scripts/test-live-trainer-access-035K.mjs`

`npm run typecheck`

`npm run lint -- --max-warnings=0`

`npm run build`

If a supporting aggregate command is unavailable, use the exact focused commands above plus an equivalent-or-stronger local proof. Do not substitute a live request or external system for a local validation limitation.

## Gate E - safety and closeout

Before closeout:

1. require `git diff --check` to pass;
2. require the changed-file set to stay within the approved list;
3. parse `planning/STATUS.json` and any changed JSON;
4. scan the diff for secrets, personal data, provider payloads, raw diagnostic fields, generated artifacts and encoding damage;
5. prove no package, lockfile, configuration, migration, schema, RLS, provider or deployment file changed;
6. record that no network/Auth/mailbox/credential/browser/provider/deployment/alias/data action occurred;
7. document that 036G's historical cause remains unknown and Production remains five/five rollback;
8. keep Sprint 029N gated; and
9. refresh the v8 Architect briefing and proportional lifecycle/roadmap records.

Do not commit or push. Leave the completed local sprint for a later explicit Git instruction.

## Permitted outcomes

- `privacy-safe-authentication-diagnostic-ready-local-clean` - target; the local five-category contract and all validation pass with zero external activity.
- `diagnostic-privacy-contract-blocked-clean` - no implementation can meet the non-enumeration/output/persistence boundary inside the approved files; no external activity occurred.
- `canonical-or-source-baseline-mismatch-blocked-clean` - starting authority or file ownership could not be reconciled safely.
- `diagnostic-scope-or-integrity-failure-blocked-clean` - a material unauthorized dependency/configuration/scope expansion or failed integrity boundary remains after focused correction attempts.

No permitted outcome claims the 036G root cause, live authentication, message delivery, candidate acceptance, Production promotion or Sprint 029N readiness.
