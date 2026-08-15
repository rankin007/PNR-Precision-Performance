# Operational Ownership, Incident And Restoration Readiness — Sprint 033B

Status: approved local operating contract and synthetic rehearsal boundary
Decision date: 2026-08-12
Organisation: Aprec8 Pty Ltd
Version: `033B-operational-ownership-v1`

This document names the accountable people and records the local procedures proved by Sprint 033B. It is internal operational guidance, not legal advice, a public service-level agreement, provider-native backup proof or authority to access or change Production.

## Named responsibility

| Responsibility | Accountable owner / operator | Decision boundary |
| --- | --- | --- |
| Business, customer support, privacy requests and incidents | Phillip Norman Rankin, Director of Aprec8 Pty Ltd | Accountable business and privacy decision owner |
| Platform operations, migrations, releases and recovery execution | Randell Rankin | Executes only an approved, target-verified procedure |
| Rollback and restoration approval | Phillip Norman Rankin and Randell Rankin jointly | Both approvals are required before a live rollback or restoration decision |

Historical Aprec8 evidence using `Philip Rankin` in this ownership context refers to the same person. Historical evidence remains unchanged; new Sprint 033B records use `Phillip Norman Rankin`.

The monitored privacy and incident address remains `equineprecisionperformance@hotmail.com`. Sprint 033B creates no new public contact channel.

## Support intake and access correction

Support records only the affected route, time, browser/device class, expected behaviour, actual behaviour, reproducibility and a redacted artifact reference. Credentials, tokens, cookies, private contact details, clinical records, raw customer/horse/stable data, signed URLs, raw object paths and provider output must not enter tickets, chat or ordinary evidence.

Approved field names are not sufficient by themselves: standalone Australian `+61` mobile forms, labelled plausible phone numbers, PEM private-key markers, AWS `AKIA` access-key shapes, Stripe `sk_live_`/`rk_live_`, GitHub `ghp_`/`github_pat_`, other approved credential/token/signed-query shapes, private contact data and explicitly unredacted records are refused without mutation, logging, writing or echoing. The rules deliberately do not reject arbitrary-number prose, near-miss digit forms, test/non-live prefixes or public-certificate markers. The artifact field accepts only a sanitized `redacted:` reference.

Access correction uses the existing authenticated Admin and RLS contracts. The requester’s authority is verified, least privilege is preserved, the change is safely recorded and revoked access is checked. Manual database bypass, service-role workaround, permission widening and unverified identity changes are prohibited.

## Privacy access and correction requests

1. Receive the request through the monitored address.
2. Verify the requester’s identity and authority before exporting, correcting or disclosing anything.
3. Record only safe request metadata: request class, received time, verification result, owner, status, target date and decision outcome.
4. Target completion within 30 calendar days.
5. A refusal or delay requires Phillip Norman Rankin’s decision and an appropriate written explanation.
6. Keep request evidence free of private content, credentials, provider values and unrestricted exports.

The 30-day period is an internal operating target informed by the approved privacy contract and OAIC guidance. It is not a new public guarantee.

## Incident response

The required sequence is:

1. contain;
2. assess;
3. notify when required; and
4. review.

Containment begins immediately. Urgent internal reports are acknowledged within four business hours and the privacy-owner assessment begins within 24 hours. Phillip Norman Rankin decides escalation to management, legal, security, affected people and the OAIC under applicable obligations. Randell Rankin performs approved technical containment, release, rollback or recovery work.

For this internal target only, business time is Monday-Friday 09:00-17:00 Australia/Brisbane (UTC+10, no daylight saving); weekends are excluded and public holidays are not modelled. Immediate containment means containment starts at the detection instant. These executable semantics do not create an external or public SLA.

| Severity | Non-overlapping scope | Accountable response |
| --- | --- | --- |
| P0 | Suspected disclosure, cross-stable access, credential exposure or destructive integrity loss | Phillip accountable; Randell contains technically; preserve minimal redacted evidence; joint approval before rollback/restoration |
| P1 | Public outage, protected-route failure, materially incorrect public claim or release-wide regression | Phillip accountable; Randell verifies source/routing/bindings and prepares the compatible rollback decision |
| P2 | Degraded route/asset or bounded workflow failure with a safe fallback | Phillip owns support outcome; Randell reproduces and schedules the bounded platform correction |
| P3 | Cosmetic or documentation defect | Phillip owns support triage; Randell schedules release handling where needed |

## Recovery objectives and cadence

- Recovery point objective: at most 24 hours of covered operational-record data loss once the relevant capability is live.
- Recovery time objective: restore the covered service within one business day after a recovery decision, subject to provider availability and verified compatibility.
- Rehearse quarterly, before first sensitive-data launch, and after a material schema or Storage recovery change.

These are internal objectives. They do not establish provider capability, a public SLA or actual Production duration.

## Separate database and Storage recovery

Database logical recovery and Storage-object recovery are separate workstreams. A database export or provider database backup never proves that object bytes, object metadata, object paths or object lifecycle state can be restored.

The local Sprint 033B rehearsal uses three related synthetic logical tables and two separately inventoried synthetic objects. It validates table versions, primary/foreign-key relationships, row counts, migration head, safe relative object paths, metadata, byte counts and SHA-256. Database and Storage packages are separately encrypted with AES-256-GCM using one unreported, unpersisted process-only key and separate fresh, distinct 12-byte IVs. Injected IV reuse is refused before encryption or restore. The owned key buffer is zeroed during cleanup; this makes no claim that every native/runtime copy is erased.

Each Storage object requires exact `contentType` metadata in both manifest and payload inventory. Restoration writes and separately rereads a sanitized path/contentType ledger and refuses missing or changed metadata. Key generation owns the key Buffer immediately and zeros it on any pre-return IV validation/collision failure; this remains only an owned-buffer claim, not total native/runtime erasure.

The rehearsal removes its working source before restoring to a distinct isolated temporary location. It refuses ciphertext corruption, wrong key/tag, IV reuse, missing/extra rows or objects, broken relationships, migration drift, changed equal-length bytes, traversal, absolute paths and manifest/payload disagreement. Success and every controlled failure finish with zero temporary rehearsal residue.

This is a synthetic, same-process logical rehearsal only. It does not use a PostgreSQL restore engine, Supabase backup, hosted Storage export, provider account, Production data or Production runtime. Provider-native backup availability, hosted restore permissions, private account recovery/MFA and real Production recovery remain unproven.

## Release rollback compatibility

A release rollback is acceptable only when all of the following are reconciled as one decision:

- the exact compatible application source;
- all five stable aliases; and
- the complete compatible three-binding Production projection.

Alias-only rollback is insufficient. Phillip Norman Rankin and Randell Rankin must jointly approve the decision. The existing Sprint 036L source/routing/binding state remains current recorded truth; this document grants no deployment, alias, binding or provider mutation authority.

Compatibility means exact unique set equality, not counts: the five aliases are `https://precisionperformance.com.au`, `https://www.precisionperformance.com.au`, `https://pnr-precision-performance.vercel.app`, `https://pnr-precision-performance-rankin007s-projects.vercel.app`, and `https://pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`; the three binding classes are `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. Missing, extra, duplicate or wrong identities fail closed; protected binding values are never part of local evidence.

## Local evidence and remaining limits

Sprint 033B proves named ownership, deterministic operating scenarios, an exact local migration chain through `0025`, and the synthetic same-process logical restoration boundary. Aggregate evidence contains counts, algorithm class, duration, outcomes and cleanup only.

It does not prove provider-native or Production restoration, remote application of migrations `0024` or `0025`, legal/customer acceptance, private MFA/recovery access, public operational promises, Sprint 036K readiness or Product-wide Done.
