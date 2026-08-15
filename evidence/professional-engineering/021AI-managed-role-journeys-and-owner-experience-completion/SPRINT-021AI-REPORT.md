# Sprint 021AI Builder Report

Date: 2026-08-12
Outcome: `managed-role-journeys-and-owner-experience-local-complete-clean`

## Delivered

- Added an authenticated `/data-entry/access` journey for active Administrators and Trainers using the signed-in, user-scoped Supabase client and existing RLS.
- Limited Trainer choices to already-scoped active Veterinarian and Stable Staff profiles and currently manageable horses; every assignment/revocation is reselected and revalidated server-side.
- Kept Administrator responsibility for identity, primary role, membership and the first scoped relationship. No global user enumeration, service-role path or new permission model was added.
- Preserved managed Veterinarian/Stable Staff access as assigned-horse read plus own-comment management only.
- Completed the Owner assigned-horse detail to latest stored scores and exact-horse trends journey with version visibility, neutral formula explanation and no horse/test write affordance.
- Kept saved views explicitly configuration-only and retained generic wrong-horse/cross-scope denial.
- Corrected narrow-width intrinsic containment and labelled target geometry found by the authorized effective-client-width audit without clipping, truncation or simulated Product zoom.

## Required verification

The exact required Product arithmetic is:

`157 managed + 36 Owner + 27 roles + 56 trends + 36 presentation + 64 cockpit = 376/376`.

- `npm run test:managed-roles-021ai`: `157/157`.
- `npm run test:owner-read-only-021ai`: `36/36`.
- `npm run test:roles`: `27/27` with the corrected counted reporter.
- `npm run test:trends-028b`: `56/56`.
- `npm run test:presentation-025d`: `36/36`.
- `npm run test:cockpit-035r`: `64/64`.
- `npm run test:voice-027`: supplemental `34/34`; intentionally excluded from the Product total.
- Typecheck, zero-warning lint, JSON validation and optimized Product build `29/29` passed.
- Final critical implementation inspection passed decision 3/3 after `INSPECT-001` through `INSPECT-004`, with no blocker or advisory.

## Visual, responsive and accessibility result

- Evidence suite: `13/13` geometry runs and exactly `5/5` full-page PNG captures.
- Official views: four mobile journeys at named `414 x 896` plus one combined desktop view at `1440 x 900`.
- True text resize: four `414 x 896` runs use a deterministic root text basis with computed root/body/sample ratios exactly `2`.
- Reflow: four exact named `320 x 896` runs pass against effective client width `305`; document/body scroll widths and every non-exempt material boundary fit.
- Normal mobile effective client width is `399`; desktop is `1425`.
- Exact-source AppShell `8/8`, sign-in `6/6`, shared-card `12/12`, and public 320 smoke pass. All labelled interactive targets are at least `44 x 44`, focus-visible checks pass, and names/hrefs/action bindings remain unchanged.
- Hidden inputs are explicitly excluded from labelled-target geometry. Only intentional labelled trends scrollers are exempt, and each is locally bounded and recorded.

## Safety and privacy

Evidence uses synthetic local fixtures only. It contains no real identity, horse, stable, email, note, credential, token, provider identifier or confidential record. No migration/RLS/schema/role/permission mapping changed.

No remote migration/data action, deployment, credential, email, enquiry, alias/domain change, private file, application voice/audio action, stage, commit, push or pull request occurred. Final staged/external/residue counts are `0/0/0`; temporary listeners, owned Chrome/profile state, harness/root `.next` and build residue are absent.

## Plan and evidence corrections

- `PLAN-001/002` were resolved before acceptance: exact scoped authority/action fixtures and effective-client-width/200%/320 evidence became explicit.
- The audit led to narrowly authorized Product containment corrections in the global body floor, sign-in fields, shared title and AppShell classes; no content was hidden and no Product class/stylesheet override simulated zoom.
- Evidence-harness corrections were deterministic only: effective-width telemetry, long-heading wrapping and case-normalized required-content comparison.
- The Windows ACL helper blocked the normal patch/browser path. Reviewed no-index `git apply` and local Chrome DevTools provided equivalent safe evidence.
- A verified generated `.next` reparse caused `readlink EINVAL`; only exact generated residue was removed and the clean build then passed.

## Acceptance impact

- P29 remains passed and gains fresh Owner Product/render proof.
- P30 remains `passed-with-accepted-limitation`: the exact existing-rule/local managed exception is implemented; Production and representative acceptance remain open.
- P31 remains `passed-with-accepted-limitation`: assigned-horse read and own-comment limited write are proven locally; Production participant acceptance remains open.
- P33, P34 and P50 remain passed and gain fresh regression evidence.
- O06 remains `passed-with-accepted-limitation` and gains the complete local horse-to-result-to-trend journey.
- O08 and O10 retain their named-operator/rehearsal limitations while gaining local management evidence; O09 remains passed.
- O07 human comprehension, P48, remote activation, Production acceptance and Product-wide Done remain open.

## What's next

Sprint 030B is the next planned current-MVP outcome for one approved commercial, trial, onboarding and support authority schedule. Later work still must establish named operations, credential/real-delivery rehearsal, representative participant acceptance and exact-source Production Done certification.

I need nothing from you.
