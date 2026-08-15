# Public enquiry Vercel agent envelope and alias isolation - Sprint 029V

## Purpose

Sprint 029V is a readiness-only recovery. It corrects the pinned Vercel CLI 50.42.0 agent success envelope and places the single guarded no-send attempt behind project-wide automatic custom-domain assignment being persistently disabled.

It does not activate public enquiries, submit or store an enquiry, send email, move an alias, promote a deployment, change Product data, or change migration 0023.

## Exact CLI contract

The controller accepts only:

- the existing six-field raw success object; or
- an exact top-level status, deployment, message, next envelope.

The nested deployment URL is a strict candidate HTTPS origin. The controller derives its bare hostname and requires:

- Deployment HOST ready.
- vercel inspect HOST --no-color with Inspect deployment
- vercel deploy --prod --no-color with Promote to production

The guidance is validated but never executed. Vercel CLI version drift from 50.42.0, extra fields, reordered guidance, changed text or flags, URL drift, error shapes, malformed JSON, and multi-object output fail closed.

## Alias isolation

The only permitted setting surface is:

https://vercel.com/rankin007s-projects/pnr-precision-performance/settings/environments/production

The value-free projector admits the exact project, Production environment, Branch Tracking section, one Auto-assign Custom Production Domains toggle, zero protected shapes, and exactly one persistence branch:

- autosave: no scoped Save button and false survives a hard reload; or
- manual save: one exact Save button changes disabled to enabled to disabled around one click and a hard reload.

No screenshot, whole-page capture, API project body, network/devtools response, Environment Variables page, or protected value is permitted for this proof.

Once the freeze changes true to false, Sprint 029V leaves it false at every terminal outcome. Re-enabling belongs only to a separately approved promotion.

## Deployment race and ownership controls

Every full or pp_sprint=029V deployment inventory:

- pages to completion;
- emits only deployment ID, state, target, and created timestamp;
- refuses duplicate IDs, protected fields, pagination loops, more than 10 pages, or more than 200 rows;
- re-reads its first page after the walk;
- permits exactly one complete restart after head drift and fails closed on a second drift.

A pre-freeze unstable or active queue stops cleanly before credentials. An active, competing, ambiguous, or unstable queue after freeze is material and keeps assignment false.

The controller distinguishes a failure before the deploy process starts from ambiguous creation after it starts. Once started, three bounded owned-deployment observations run without a retry. Exactly one independently verified pp_sprint=029V, exact-source, Production, Ready, zero-alias candidate may continue. An unknown response may be adopted only for safe cleanup. Zero, multiple, unowned, or uncleared post-start results are material.

Owned deployment deletion uses only the independently verified ID, requires zero aliases, and uses the safe exact removal vector. No alias, domain, promote, or rollback command exists in the controller allowlist.

## Secret and no-send boundary

The raw Resend key and temporary bearer never enter agent-visible or durable channels. The operator-private key transfer occurs only after local proof, inspection, the persistent freeze, stable empty queue, five-of-five accepted routing, and identity-blind baselines pass.

The protected local run record persists an exact monotonic phase plus deploy, public-gate, readiness, and expiry attempt counters. Each counter is marked before its process or request starts, so a new controller process cannot retry, reorder, or repeat an attempt.

Before every HTTP request, the controller independently inspects the recorded owned deployment ID and requires the supplied origin to equal that exact candidate origin. A different valid-looking Vercel host is refused before a request is constructed or the bearer is supplied.

The candidate sequence is limited to:

1. one disabled public-gate probe returning sanitized 503;
2. one authenticated SMTP verify readiness request with zero sendMail; and
3. one same-bearer post-expiry denial.

Temporary rows are removed before close. Success retains only the restricted provider key, four dedicated Sensitive Production rows, and one unaliased candidate. Fallback removes every independently safe 029V-owned resource. Any unresolved owned resource is material.

## Terminal reporting

Closeout records the exact setting transition or pre-freeze no-change, terminal setting state, stable alias inventory, deployment and HTTP counts, resources retained or removed, local proof arithmetic, review decisions, acceptance-matrix reconciliation, and any exact user action still required.

A completed freeze remains off until a separately approved promotion.