# Sprint 035R evidence

Date: 2026-08-11
Class: critical
Data class: synthetic only

## Outcome

The shared Product `TrainerCockpit` and `BiochemistryCaptureWorkflow` were rendered in a separate, non-deployed local Next.js evidence app. Production access and derivation rules were verified separately by executable domain tests. No real horse, client, provider or confidential data was used.

## Guided iPhone XS Max observation

- Observer: project user; this was a guided owner observation, not independent trainer acceptance.
- Device: iPhone XS Max, Safari, portrait, trusted local network.
- Fixture: Synthetic Alpha; 11 August 2026; AM; Carbohydrate 4.5; Saliva pH 7.25; Urine pH 7.24; Conductivity 18.18; no note.
- Start: immediately before tapping **Capture another test**.
- Stop: when all context and four readings were visible on **Review test**.
- Elapsed time reported by the user: 6 minutes.
- Clipping or sideways scrolling: no.
- Difficult controls: no.
- Confusing wording: no.
- Incorrect defaults: none observed.
- Submission: the user was instructed not to tap **Submit test** and reported the review result without a submission. The corrected final server log recorded `POST / = 0`.
- Limitation: one guided observation is not an independent acceptance test and does not support a public or universal under-60-second claim.

## Visual manifest

| File | View | SHA-256 |
| --- | --- | --- |
| `01-mobile-dashboard-414x896.png` | 414 x 896 dashboard | `AA8DC6721ED9784B5A07C3F27FB4D4ED7E4705190C6351367EA4BCA1BB0626FD` |
| `02-mobile-capture-defaults-414x896.png` | Full-page capture rendered at a 414 x 896 viewport; bitmap 414 x 2003 | `8BE721B0F9ED6D25619BD58FCA91A109EA805DC57A0610596101065224621EDD` |
| `03-mobile-review-414x896.png` | Full-page capture rendered at a 414 x 896 viewport; bitmap 414 x 1505 | `04757F100FC6E2E5E9E00D519151EFAAB7A49EB3CAD83CF3036D0ED1DD7508CD` |
| `04-desktop-dashboard-1440x900.png` | 1440 x 900 dashboard | `64A1355DF0FDB984A4668646BDFF6B18314F4C2E143C63D8FB5669CF434070B2` |
| `05-desktop-dashboard-200-percent.png` | 1440 x 900 at 200% CSS zoom | `BC58F2C78EE99919B273DD68DC4057EA5A8E25C2C1F8166E5343F643DA4292F0` |

## Browser and accessibility evidence

- Mobile dashboard: viewport/client/scroll width `414/414/414`; three cards, each with exactly one derived action and a 44 px action target.
- Mobile capture: viewport/client/scroll width `414/414/414`; visible links, selects, date, four reading inputs, notes area and Review action were 44 px or taller.
- Mobile review: viewport/client/scroll width `414/414/414`; Back, Edit and Submit controls were 44 px or taller.
- Desktop: viewport/client/scroll width `1440/1440/1440`; three cards, each with exactly one derived action and a 44 px action target.
- 200% zoom: scroll width equalled client width; the same three derived actions remained present and each rendered 88 px high under CSS zoom.
- Axe 4.12.1 WCAG 2 A/AA: dashboard `0 violations, 0 incomplete`; capture `0 violations, 0 incomplete`; populated review `0 violations, 0 incomplete`.
- Presentation proof: the corrected screenshots were generated at the required sizes and the browser DOM/geometry checks found no horizontal overflow or missing action. A second local image-viewer pass was unavailable because the same Windows ACL helper denied reads even from owned inspection copies; the browser-rendered screenshots, exact dimensions, DOM geometry, action text/hrefs and Axe audit provide the safe substitute proof.
- Tool substitution: the in-app browser runtime could not start because the OneDrive ACL helper denied its read setup. The installed local `agent-browser` CLI was used against the same local server for DOM interaction, screenshots, geometry and Axe audits.

## Independent inspection defects corrected

- `INSPECT-001` / AC-02: removed the silent 100-horse cap. The focused executable regression now derives 101 accessible horses, proves horse 101 remains present after sorting, and proves its no-result state changes the cockpit count to 1. The source guard also rejects restoration of `slice(0, 100)`.
- `INSPECT-002` / AC-04: removed the unconditional secondary workspace link. Every actionable card now renders only its derived action; the corrected mobile, desktop and 200% geometry proofs each recorded one action per card, including the read-only **Open horse workspace** case.
- `INSPECT-003` / AC-23: a malformed browser-evaluation command created canonical-root file `({links`. Before deletion it was verified as the exact untracked, untracked-by-index, zero-byte regular file created at `2026-08-11T08:01:30+10:00`; Architect correction review 3 passed its literal nonrecursive cleanup. After exact deletion: path absent, Git status row absent, staged count 0, port 3135 count 0 and owned agent-browser process count 0.
- Repair governance: Builder correction planning was no-edit. Architect correction review 1 returned `FIX` for an incompatible proposed test import; review 2 passed the revised Product correction; review 3 passed the exact residue cleanup. No Product bytes changed for `INSPECT-003`.

## Defect found and corrected during evidence

The first synthetic Review interaction triggered the evidence-only server action despite the button being declared `type="button"`. The evidence action rejected it, so no record was saved. Product code now explicitly calls `event.preventDefault()` before changing to review state. The focused regression checks this guard. The corrected final run reached review, displayed the exact context and four values, and produced zero POST requests.

## Verification ledger

- `npm run test:cockpit-035r`: pass, 64/64.
- `npm run test:dashboard-035`: pass, 33 retained assertions.
- Focused arithmetic: `33 retained + 64 new = 97` assertions.
- `npm run test:workspace-028`: pass.
- `npm run typecheck`: pass.
- `npm run lint`: pass, no warnings or errors.
- `npm run build`: corrected Product pass, 28 static pages generated and dynamic routes built.
- Fresh inspector build retry: stopped on a OneDrive `.next` `readlink EINVAL` supporting-filesystem failure. No Product bytes changed after the recorded corrected build pass; focused tests, typecheck and zero-warning lint still pass, so the prior corrected build is retained as the proportionate Product proof rather than repeating the same failed tool path.
- `npm run validate:json`: pass.
- `npm run test:roles`: pass.
- `node scripts/test-field-trial-controls-031C.mjs`: pass.
- `npm run test:domain`: all entries through 035R and later 030/031 controls passed, then the unrelated retained 031B preview harness stopped because optional `playwright-core` is not installed. The stronger local Product-component browser flow, geometry, Axe audits and zero-POST evidence substitute for the 035R browser boundary. The remaining 031C check was run directly and passed.
- `npm run validate:static`: encoding and five static validators passed, then the known stale 020G validator stopped because it hard-codes migration versions 0001 through 0023 while the repository contains the prior in-scope 0024 candidate. The remaining role validator was run directly and passed.
- Local browser and server: stopped.
- Generated `.next` serving residue, owned temporary inspection copies and exact zero-byte `({links` residue: removed; final staged/external/residue counts `0/0/0`.
