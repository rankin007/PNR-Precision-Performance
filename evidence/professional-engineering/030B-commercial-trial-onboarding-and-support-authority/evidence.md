# Sprint 030B evidence

Date: 2026-08-12
Class: critical
Data class: synthetic only

## Outcome

The exact owner-approved consultation-led commercial schedule is locally authoritative and all scoped public/operator projections agree with it. Commerce remains `commerce-disabled-safe`; historical catalogue/order/payment state is read-only evidence.

## Assertion ledger

| Suite | Result |
| --- | ---: |
| Commercial schedule and privacy | 96/96 |
| Disabled checkout/webhook | 24/24 |
| Corrected retained public website | 11/11 |
| Retained role/comment matrix | 27/27 |
| **Required total** | **158/158** |

Australian-English validation passes across four public surfaces.

## Visual manifest

All images are full-page local Chromium CDP captures from shared Product components and synthetic fixtures. Mobile bitmap height follows complete content.

| File | Named viewport | Effective client | Bitmap | Bytes | SHA-256 |
| --- | --- | ---: | ---: | ---: | --- |
| `01-mobile-pricing-414x896.png` | 414x896 | 399 | 414x4825 | 305,935 | `3A5CB8F79749266A36E81ECB3A9199211BCDFEC48929736FF3961B40D7421BC1` |
| `02-mobile-disclaimer-414x896.png` | 414x896 | 399 | 414x1574 | 71,889 | `761475913AE6B5477F32C12B108727505991749D4FB0D178C429C94B4D02A353` |
| `03-mobile-shop-detail-414x896.png` | 414x896 | 399 | 414x1792 | 86,222 | `93C8877B4E8D55A7C9ADA7B5C9B078E31D791D7E37410D2AC6FFFFCD4098D606` |
| `04-mobile-admin-commerce-414x896.png` | 414x896 | 399 | 414x1713 | 105,717 | `EF9B6C3A05CD718E53826138C1526F387DF43D7C85ED170CE6F7454372E53DB2` |
| `05-desktop-commercial-authority-1440x900.png` | 1440x900 | 1425 | 1440x7185 | 629,165 | `ECA4D32D88B8FD6B999314D0058101D986E8499B61C40D6A6F3CB00711C2E67C` |

Manifest SHA-256: `24B28FC790B8D31B09D305C9EB2EBBDDDDBF2E0A38AB2B16FB2E362A5976BCFA`.
Geometry SHA-256: `8E33E607C79C5432FEF58FEA2CB6751E39274D5242A6CBAE930137DABB60C84D`.

## Geometry and accessibility

- Expected/actual runs: `13/13`; expected/actual captures: `5/5`.
- Five official full-page runs cover Pricing, Disclaimer, Shop/Detail, Admin and combined desktop.
- Four true `resize-text-200-percent` runs record computed root/body/sample ratios exactly `2`.
- Four `reflow-320-css-pixels` runs retain named `window.innerWidth 320`, effective document/body client 305 and scroll 305.
- Every run records named viewport, inner width, document/body client and scroll widths, maximum material right edge and overflow elements.
- All required sections, names, focus treatment, non-colour meaning and applicable 44 x 44 targets pass.
- No document overflow or exempt local scroller exists on the accepted surfaces.

## Authority and refusal proof

- Version/owner/date/supersession and exact offer/price/GST fields are imported from the typed server authority.
- Every schedule clause and all ten legacy conflicts have discriminating assertions.
- Pricing/Disclaimer/Shop/Detail render contract fields and contain no purchase form/button or catalogue lookup.
- Checkout executes the actual route body against valid, malformed, stale and legacy cases with poison commerce dependencies; all calls remain zero.
- Webhook executes its actual first guard with a poison request and proves refusal before any request/provider/reconciliation access.
- Admin authorises before data fetch, projects raw data before content props and renders no form/action/client boundary.

## Privacy proof

- Raw synthetic identifiers cover product, order, payment, customer, checkout, payment intent, provider and error fields.
- The actual projector emits only approved row facts plus deterministic `historical-<type>-<ordinal>` keys/labels.
- JSON/RSC-equivalent props contain no raw sentinel.
- Fresh inspection's actual Admin HTML/RSC render returned HTTP 200, 70,677 bytes, zero raw sentinels and ordinal labels.
- Manifest/geometry/generated evidence scan contains no sentinel or real customer/private/provider value.

## Quality and substitute proof

- TypeScript: pass.
- ESLint: pass with zero warnings/errors.
- JSON: eight self-tests and seven files pass.
- Optimized Node 22 build: pass, 29 routes.
- `git diff --check`: pass.
- `validate:static` passes through 020F, then its historical exact-0001..0023 migration ledger conflicts with pre-existing untracked local 0024/0025. No 030B schema/migration/RLS/role/permission mutation occurred.
- `test:domain` passes through new 030/030B and retained 031 controls, then retained 031B cannot import missing undeclared `playwright-core`. No dependency/lock mutation occurred.
- Exact 158, quality/build, shared-Product rendering, actual HTML/RSC privacy and scope/index provenance are the accepted equivalent proof.
- The local image viewer was ACL-blocked; exact shared DOM, geometry, dimensions, nonblank bytes/hashes and inspector render provide the executable substitute.
- Retained `test-public-relaunch-032.mjs` is a non-blocking stale-copy advisory outside the corrected 029M/158 contract.

## Review and safety

- Plan: `PLAN-001..003` resolved; decision 3/3 PASS.
- Inspection: 1/3 PASS; no blocker.
- Starting baseline: SHA `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, staged/modified/untracked `0/59/279`.
- Approved Product/doc/test mutation paths: exactly 13; unrelated dirty work preserved.
- No remote data/migration, deployment, credential, payment, email, enquiry, alias/domain, stage, commit, push or PR action.
- Final staged/external/residue counts: `0/0/0`.
