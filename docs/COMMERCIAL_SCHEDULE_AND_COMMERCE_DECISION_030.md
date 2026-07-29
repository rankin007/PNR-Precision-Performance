# Commercial Schedule And Commerce Decision — Sprint 030

## Decision control

- Version: `030-authority-pending-v1`
- Status: commercial authority incomplete
- Launch posture: `commerce-disabled-safe`
- Business decision owner: Aprec8 Pty Ltd business owner — named approver not yet recorded
- Approval/effective date: unavailable; no commercial schedule is approved or effective
- Source: Sprint 030 reconciliation of maintained source, client reference material and application surfaces
- Supersession: only a later named business-owner approval that resolves every required dimension may supersede this record

This is a safety decision, not a commercial approval. No value in a reference document, test seed, database row or former public page is an active online offer.

## Offer authority

| Dimension | Current status | Recommendation | Accepted answer / owner / source |
|---|---|---|---|
| Public name, SKU and offer type | Unavailable | Confirm one versioned offer catalogue. | Unavailable; business owner required. |
| Kit instruments, equipment and consumable quantities | Unavailable | Approve an exact inclusion list. | Unavailable; reference documents are evidence only. |
| Onboarding and training | Unavailable | Define delivery method, duration and limits. | Unavailable. |
| Portal access, horse/stable/user limits and support | Unavailable | Define entitlements and support boundaries. | Unavailable. |
| Price, currency, GST and tax treatment | Conflicting | Confirm exact AUD amount and GST treatment. | Unavailable; `$4,500`, `AUD $5,500 including GST` and test seeds conflict. |
| Postage/freight and destination limits | Incomplete | Define quote method, destinations and payer. | Only “postage additional” appeared previously; obligations unavailable. |
| Term, renewal and expiry | Unavailable | Resolve or remove the deferred twelve-month statement. | Removed from active/public offer wording. |
| Cancellation, cooling-off, refund, return and failed payment | Unavailable | Obtain appropriate business/legal approval. | Unavailable; no terms invented. |
| Ownership, warranty, replacement and buyback | Unavailable | Define ownership and after-sale obligations. | Unavailable. |
| Trial eligibility, duration, conversion and exit | Unavailable | Approve a complete stable-trial contract. | Unavailable. |
| Fulfilment owner, timing, inventory and contact path | Incomplete | Nominate owner and service levels. | Consultation is the only safe next step; the enquiry form does not transmit. |
| Online checkout | Resolved safe state | Keep disabled until all dimensions are approved. | Not permitted under `030-authority-pending-v1`. |
| Claims and disclaimer | Restricted | Use only approved capability language. | No diagnosis, treatment, supplement, race-result or guaranteed-performance claim is authorised. |
| Historical orders | Preserve | Keep readable only under existing permissions. | No mutation, migration or reinterpretation authorised. |

## Conflict matrix

| Surface/source | Observed representation | Sprint 030 classification |
|---|---|---|
| Client price-list/reference documents | Legacy `$4,500` and other commercial/claims language | Unresolved evidence; not authority. |
| `docs/PRICING_013.md` | `$4,500` kit; `$120 per horse or P.O.A`; unlimited testing | Superseded as active offer; unresolved evidence only. |
| Migration `0007` / fallback catalogue | `$149`, `$249`, `$89` active test products | Test data only; never an approved offer. No migration changed. |
| Former `/pricing` | `AUD $5,500 including GST`, postage additional | Removed from active public wording because the full schedule is incomplete. |
| `/shop` and product detail | Previously hidden by redirect; underlying loaders could expose active/test rows | Replaced with explicit consultation-led unavailable state. |
| `/api/checkout` | Redirect-only under-construction gate | Authority-gated redirect; creates no session, order or payment. |
| Stripe webhook | Could reconcile signed supported events when configured | Fails closed before payload processing while commerce is disabled. |
| `/admin/commerce` | Read-only database catalogue/order/payment view | Retained read-only with explicit historical/mismatch warning. |

## Safe implementation contract

The typed authority module is `lib/commerce/commercial-authority.ts`. Its `checkoutEnabled` value is `false`. Public product helpers cannot make any product checkout-ready. Direct checkout redirects to the consultation-safe shop state. The webhook returns `503` before reading a payload or invoking reconciliation. Historical data remains untouched and protected by existing permissions.

## Exact business-owner intervention

What remains blocked: approval of a complete commercial schedule and any future decision to support online purchase.

Evidence checked: maintained pricing documentation, Sprint 029M evidence, test seeds, public pricing/shop/detail, checkout, webhook, read-only admin commerce and client reference inventory. These sources conflict or omit material obligations.

Required action:

1. Nominate the business decision owner and role.
2. Answer every unavailable dimension in the offer-authority table, including exact GST, freight, term, refund/return, warranty/buyback, trial and fulfilment obligations.
3. Approve the exact offer names, identifiers, descriptions, prices, effective date and treatment of historical orders.
4. Decide whether sales remain consultation-led or online checkout may be planned.
5. Provide the approval as a versioned business record; do not provide secrets, payment data or customer data.

Builder verification after that action: compare every answer against the table and conflict matrix, confirm no material gap remains, and determine whether the existing data contract can represent the approved offer. A later authorised execution is required before checkout or Production commerce can change.
