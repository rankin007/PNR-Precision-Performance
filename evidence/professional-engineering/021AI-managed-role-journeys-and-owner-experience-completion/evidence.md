# Sprint 021AI evidence

Date: 2026-08-12
Class: critical
Data class: synthetic only

## Outcome

Existing role/RLS authority now has complete local Product journeys for Administrator/Trainer-managed Veterinarian and Stable Staff horse access and Owner read-only latest-result/exact-horse trends. The existing database boundary remains final authority; no migration, policy, helper, grant, role or permission mapping changed.

## Product assertion ledger

| Suite | Result |
| --- | ---: |
| Managed role journeys | 157/157 |
| Owner read-only journey | 36/36 |
| Focused role/comment matrix | 27/27 |
| Retained trends | 56/56 |
| Retained numeric presentation | 36/36 |
| Retained cockpit | 64/64 |
| **Required Product total** | **376/376** |

Supplemental retained voice/fallback proof is `34/34` and is not counted in the required Product total.

## Visual manifest

All images are full-page local Chromium CDP captures from shared Product components and synthetic fixtures. Mobile bitmap height follows complete content rather than being misreported as viewport height.

| File | Named viewport | Effective client | Bitmap | Bytes | SHA-256 |
| --- | --- | ---: | ---: | ---: | --- |
| `01-mobile-trainer-managed-access-414x896.png` | 414x896 | 399 | 414x1440 | 77,390 | `800559CF793DB3B098BDF979AB4E3B267BC16297EE6DC014F35BE751A32446AA` |
| `02-mobile-managed-role-permissions-414x896.png` | 414x896 | 399 | 414x1022 | 61,089 | `ECEEAF91B66A698186F1583DE1901D9676EDEECA6681CDCA4F8B0688DD23F50D` |
| `03-mobile-owner-latest-result-414x896.png` | 414x896 | 399 | 414x1097 | 53,587 | `8E3970C74DE4876A63607F270745079DFC676A365B880C502DA88C5E1E622EAA` |
| `04-mobile-owner-exact-horse-trends-414x896.png` | 414x896 | 399 | 414x3124 | 150,658 | `1EC670E72F87D6DE41373DC182C7BBB546B3CBA52CCC35F5A840AE1C13EBEE71` |
| `05-desktop-managed-access-owner-overview-1440x900.png` | 1440x900 | 1425 | 1440x4913 | 343,974 | `94DC7EB369A2AA898B893AEC015907CB205F0E8CFA1A92C5F0744141F84DE372` |

Manifest SHA-256: `712390215AC3EB2A71A9B484A44E422FF5CAFA628952774EE1AE2A3830846722`.
Geometry SHA-256: `4F2926B0FC1FE6B2E6AE869DA327365E5E9D9B2624A99A540B2D4D2C2B5EBB6B`.

## Geometry and accessibility ledger

- `npm run evidence:role-journeys-021ai`: expected/actual runs `13/13`; expected/actual captures `5/5`.
- Five official full-page runs cover Trainer access, managed permissions, Owner latest result, Owner exact-horse trends and combined desktop coverage.
- Four true `resize-text-200-percent` runs have root/body/sample computed before/after ratios exactly `2` without a Product stylesheet or class override.
- Four named `reflow-320-css-pixels` runs retain `window.innerWidth 320`, document/body effective client `305`, and document/body scroll `305`.
- Every run records named viewport, `window.innerWidth`, document/body client width, document/body scroll width, maximum material right edge and overflow elements. Passing uses the smallest relevant non-zero client width.
- All required sections, labels, focus-visible behavior, status/non-colour meaning and applicable `44 x 44` targets pass. Hidden inputs are excluded explicitly.
- Only the trends mode contains intentional local horizontal scrollers; each is labelled, focusable, bounded and recorded without document overflow.
- Exact-source retained checks: AppShell normal/adversarial `8/8`; sign-in states `6/6`; representative shared cards `12/12`; public route at effective 305 pass.

## Authorization and privacy proof

- Active Administrator/Trainer only route/action guards; every other role/anonymous/non-member denial is generic.
- Signed-in user-scoped snapshot only; no service-role/global directory path.
- Exact visible roles `veterinarian` and `stable_hand`; no Consultant option or Stable Manager management authority.
- Current snapshot reselects submitted horse/profile/role/assignment before mutation.
- Denial fixtures include wrong/cross-stable horse, Consultant, forged/unknown/unscoped profile, role mismatch, malformed ID, inactive, suspended, self, duplicate, stale and revoked.
- Managed Vet/Stable Staff read assigned horses and manage only their own comments; test/record/assignment and other-comment writes remain denied.
- Owner exact-horse routes are read-only and expose stored scores/versions with neutral four-loss explanation; blocked/unscored remains `Not scored`.
- Visual/text/source scans contain no real identity, horse, stable, email, note, credential, token, provider identifier or confidential record.

## Review ledger

- Plan: `PLAN-001/002` resolved; fresh plan PASS.
- Inspection: `INSPECT-001..004` resolved; final decision 3/3 PASS with no blocker/advisory.
- Authorized audit corrections: effective-client telemetry; removal of the global body minimum floor; intrinsic sign-in/form/card wrapping; AppShell min-zero/minmax/wrapping/44 px containment; deterministic role reporter.
- No clipping, truncation, font reduction, copy weakening or authority expansion was used.

## Quality and substitute proof

- TypeScript: pass.
- ESLint: pass with zero warnings/errors.
- JSON: pass.
- Optimized Node 22 build: pass, `29/29` routes.
- `git diff --check`: pass (line-ending notices only).
- Normal patch/browser helpers were blocked by the Windows ACL helper. Reviewed no-index Git patches and local Chrome DevTools were the safe equivalent.
- Retained 021AH direct/rendered authorization plus the fresh executable action/route adapter supplied the approved access proof when new remote actor/RLS execution was outside authority. This is behavioral evidence, not substring inspection.
- Generated OneDrive `.next` reparse residue caused one `readlink EINVAL`; the exact verified generated directory was removed and the unchanged build passed.

## Safety and cleanup

No remote data/migration, deployment, credential, email, enquiry, alias/domain, private evidence, application audio, stage, commit, push or PR action occurred. The evidence server, listeners, owned Chrome/browser profiles, harness/root `.next`, temporary screenshots/logs and build residue are absent. Final staged/external/residue counts are `0/0/0`.
