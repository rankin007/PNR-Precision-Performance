# Public Enquiry Readiness Boundary Recovery - Sprint 029T

## Purpose and limit

Sprint 029T places every Vercel CLI read and write behind one exact tested argument boundary and permits one new authenticated SMTP no-send readiness attempt. It does not submit a public enquiry, send email, prove sender acceptance or delivery, inspect a mailbox or provider delivery log, change Supabase or migration 0023, move an alias, activate public enquiry, or touch the retained Sprint 029S Preview.

All five public aliases remain on accepted Sprint 036L. The retained 029N and 029O candidates and the retained 029S Preview remain inert and unaliased. Sprint 029R remains conditional.

## Exact command boundary

`scripts/PreflightAuth029T.ps1` is the only permitted path for Vercel CLI calls after implementation. Its command-vector formal parameter is `CommandArgs`. Null, empty, missing, reordered, duplicated, extra, wrong-target, force, bare/default and unrelated vectors fail before a process starts.

The exact read and deployment vectors are:

- `env ls production --format json --no-color`
- `alias ls --format json --limit 100 --no-color`
- `inspect <allowlisted-deployment-id> --format json --no-color`
- `list --meta pp_sprint=029T --format json --no-color`
- `deploy --prod --skip-domain --yes --format json --no-color --meta pp_sprint=029T`

The exact environment-write vectors allow only the three public structural names or three temporary Sensitive names under Production. Values enter only through stdin. Removal allows only the seven exact Sprint 029T-owned dedicated or temporary names. The pass row is created through the protected Vercel Sensitive form and has no CLI add vector. `--force`, `--token`, `--value`, arbitrary metadata, branch scope and caller-supplied extras are prohibited.

The real runner starts one captured child with `NO_UPDATE_NOTIFIER` set through that child's `cmd` prefix only. It does not mutate the parent environment or index the nullable `ProcessStartInfo` environment adapters. It captures stdout and stderr separately. JSON commands parse only stdout; environment mutations discard raw output and return a fixed result. Environment, alias, deployment-list, inspect and deploy output each use an exact top-level and row/object field allowlist. Inspect admits only exact `production` or `preview`; list/deploy admit only their known Production/Preview representations, and custom targets such as `staging` fail closed. Nonzero or missing exit status, missing output, malformed JSON, unknown shape, unexpected target and unexpected resource state fail with a fixed sanitized code.

`SelfTest` is local and non-mutating. It uses a synthetic runner to prove every allowed vector is unchanged and every refused vector makes zero runner calls. It also reproduces the `$Args` collision as zero elements beside the same exact four elements through `CommandArgs`. `CredentialSelfTest` is separate and must not run until the later credential gate is explicitly reached.

## Identity-blind control projection

`scripts/provider-browser-projection-029T.mjs` adds only the missing fixed control proof. It accepts four exact page classes: Resend key creation, Resend key deletion confirmation/cancellation, Vercel Sensitive form preparation, and clipboard clearing. Its fixed output contains only state/page classes, booleans represented as zero-or-one counts, a raw-secret-shape count and a finite control class.

The raw signed-in snapshot remains inside browser runtime. The exact tested browser projector runs there, the raw value is discarded, and only the fixed projection may reach agent evidence. Synthetic identity, address and token canaries produce identical safe output when changed. Unknown fields, missing controls, duplicate controls, wrong pages or cross-page control spillover fail closed.

Before key creation the projections must prove:

- exact restricted-key name, sending access, expected domain, create, Copy and dismiss controls;
- an existing-row delete menu, confirmation and cancellation path, with cancellation performed and no deletion;
- exact Vercel project, Production target, blank branch, Sensitive field, paste, save and navigation controls; and
- one no-read clipboard-clear action.

## Fresh baseline and ceilings

Before mutation, `Baseline` must prove the exact canonical workspace, branch, HEAD and linked Vercel project; zero Sprint 029T deployment; zero dedicated and temporary rows; no fixed local live credential; five unchanged generic SMTP metadata rows whose target sets include Production; all five aliases on accepted Sprint 036L; 029N and 029O unaliased; and the retained 029S Preview Ready, non-Production and unaliased. Generic inherited rows may be multi-target. Every Sprint 029T-owned dedicated or temporary row must instead be Production-only and branch-unscoped; multi-target or scoped owned rows fail closed.

Baseline failures expose only one of eight fixed codes: `BASELINE_ENVIRONMENT_REFUSED`, `BASELINE_CREDENTIAL_REFUSED`, `BASELINE_029T_DEPLOYMENT_REFUSED`, `BASELINE_EXPECTED_ALIAS_INVENTORY_REFUSED`, `BASELINE_ACCEPTED_DEPLOYMENT_REFUSED`, `BASELINE_029N_ALIAS_REFUSED`, `BASELINE_029O_ALIAS_REFUSED`, or `BASELINE_RETAINED_PREVIEW_REFUSED`. No code includes a value, alias, environment row, provider response or raw command text.

The bounded project alias list is the routing authority. It must return fewer than the requested 100 rows, contain each of the five expected aliases exactly once, route exactly five total aliases to the accepted deployment, and route zero aliases to 029N, 029O or the retained Preview. A 100-row response refuses as potentially truncated. Deployment inspection remains the independent authority for the accepted deployment's Production/Ready state and the retained Preview's non-Production/Ready state. Historical N/O inspect alias arrays are not used as redundant routing evidence.

The accepted identity-blind Sprint 029S provider projection separately proves one expected verified domain, two existing sending-access keys, zero full-access keys, zero target keys and zero raw-secret shape.

The complete external ceiling is one domain-restricted sending key, four dedicated Production blank-branch SMTP rows, three temporary Sensitive verifier rows, one fixed Credential Manager record, one Production-targeted deployment with `pp_sprint=029T` and automatic domains disabled, one authenticated no-send request and one same-bearer post-expiry denial. There is no retry and no second deployment.

## Protected transfer and readiness sequence

After every local gate and control projection passes, create at most one restricted key. While its one-time value is visible, perform only the prevalidated Copy, direct paste into the prepared Sensitive pass field, save, dismiss or navigate away, and clear-clipboard steps. Do not take a screenshot or snapshot, inspect DOM or console content, inspect a field, read the clipboard or return any token-bearing state. Metadata inspection resumes only after the token surface is gone and the clipboard is cleared.

Require one target key and the pass row, then use `AddStructuralSmtp` to add the three approved public structural rows through stdin. `Provision` generates 32 random bytes without human input, stores the raw bearer only in the fixed Windows credential and process memory, and adds only the verifier and canonical window through stdin. The ordered window is no longer than fifteen minutes.

`Deploy` first requires four dedicated and three temporary rows and zero Sprint 029T deployments. It invokes the one exact deployment vector, admits only the returned opaque deployment ID, inspects only that ID and requires exact source, Production target, Ready state, exact metadata and zero aliases.

Run the nine immutable non-storing checks, then `VerifyReady` exactly once. Success is only `result=smtp-preflight`, `status=ready`, `providerClass=resend`, and `errorClass=null`. After expiry, `VerifyExpiredAndCleanup` uses the same bearer once, requires sanitized HTTP 404 before handler execution, removes the three temporary rows and local credential, and proves their absence.

## Compensation and stop conditions

No local, privacy, baseline or control pass means no external mutation. Any protected output, unexpected process start, wrong target, partial provider state, integrity failure, Production impact or uncertain cleanup stops immediately.

On a non-target result, do not retry. After exact ownership proof, `Compensate` removes only the newly created four dedicated rows, three temporary rows and local credential. The exact new restricted key is deleted only through the prevalidated provider control and exact ownership proof. A new zero-alias Sprint 029T candidate may remain inert. The retained 029S Preview and all existing keys, bindings, deployments and aliases remain untouched.

Clean fallback requires complete new-resource cleanup, five-alias safety, unchanged historical containment and fixed sanitized evidence. Manual intervention is last and must record the blocked fact, evidence checked, exact user action, numbered steps and the follow-up verification. A secret must never be requested through chat or command arguments.

## Safe evidence

Safe evidence may contain fixed classes, counts, approved configuration names, safe opaque deployment identifiers, hashes, Ready/alias totals and request totals. It must not contain an environment value, bearer, credential, address, account identity, provider response, raw CLI text, raw DOM, clipboard content or matching protected scanner text.

The combined protected scan covers the seven Sprint 029T implementation files and ten inherited runtime/auth/controller/projector files entering the deployment source or safety boundary. Only a zero-count scan may produce the exact SHA-256 manifest or permit a content diff.
