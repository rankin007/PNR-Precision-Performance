# Commercial Schedule And Commerce Decision — Sprint 030

## 030B decision control

- Version: `030B-consultation-led-v1`
- Status: owner-approved local commercial/Product authority
- Launch posture: `commerce-disabled-safe`
- Business decision owner: Phillip Rankin
- Role: Director of Aprec8 Pty Ltd
- Approval and effective date: 2026-08-12
- Public offer: `Precision Performance BE Kit and Onboarding Package`
- Identifier: `PP-BE-KIT-ONBOARDING-AU`
- Approved price: `AUD $5,500 including GST`
- Supersession: only a later versioned, expressly owner-approved schedule may replace this record

This approval authorises accurate local Product presentation. It does not enable checkout,
payment, subscription activation, enquiry transmission, deployment, Production publication or
historical-data mutation.

## Retained Sprint 030 decision control (superseded)

- Version: `030-authority-pending-v1`
- Status: commercial authority incomplete
- Launch posture: `commerce-disabled-safe`
- Business decision owner: Aprec8 Pty Ltd business owner — named approver not yet recorded
- Approval/effective date: unavailable; no commercial schedule is approved or effective
- Source: Sprint 030 reconciliation of maintained source, client reference material and application surfaces
- Supersession: only a later named business-owner approval that resolves every required dimension may supersede this record

This is a safety decision, not a commercial approval. No value in a reference document, test seed, database row or former public page is an active online offer.

## Approved consultation-led schedule

| Dimension | Approved answer |
|---|---|
| Sales model | Consultation and accepted written quote only; no online checkout, automatic order, subscription activation or website payment. |
| Freight | Additional and destination-based. The written quote states freight and the complete total before acceptance. |
| Kit contents | Aprec8 selects equipment and consumables for the customer. Every supplied item and quantity is itemised in the accepted quote; images, seeds and historical catalogues create no inclusion. |
| Training | One initial onboarding and equipment-use session of no more than two hours, remote or on site as agreed. Travel and additional training are separately quoted. |
| Software and portal | No subscription, unlimited testing, horse, stable or user entitlement, or continuing portal access is included unless expressly itemised in the quote. |
| Support | Initial setup questions for 30 calendar days after onboarding through an approved Aprec8 contact channel. Ongoing operational or veterinary support requires a separate agreement. |
| Term | One-off package; no automatic renewal or twelve-month commitment. A written quote expires after 30 days unless it states otherwise. |
| Payment | The accepted quote states method, timing and any deposit. The website collects no payment. |
| Cancellation | No obligation before quote acceptance. After acceptance the quote governs, subject to non-excludable Australian Consumer Law rights. |
| Refunds and returns | Australian Consumer Law remedies apply. No extra change-of-mind return promise; any discretionary return is agreed in writing. |
| Warranty and replacement | Australian Consumer Law guarantees and any itemised manufacturer warranty apply. No extended warranty is promised; Aprec8 remains the customer contact for supplied-goods issues. |
| Ownership | Transfers after cleared payment and delivery unless the accepted quote expressly identifies loaned equipment. |
| Buyback | No guaranteed buyback. Historical `$500` wording is superseded; any future buyback is a separate written offer. |
| Stable trial | An enquiry requests consultation only and creates no order, payment, subscription, onboarding, equipment entitlement or automatic conversion. Any equipment loan or structured trial requires a separate signed trial schedule. |
| Eligibility | Australian customers accepted by Aprec8 following consultation and availability review; eligibility is not automatic. |
| Fulfilment | Subject to stock and destination. The accepted quote confirms dispatch, installation and training timing, responsible contact, freight and complete total. No general delivery-time promise. |
| Claims | Supports professional measurement and review; no diagnosis, treatment, performance guarantee, veterinary replacement or race-readiness promise. |
| Historical records | Existing orders retain their original terms. Historical prices, test rows and catalogues are not reinterpreted or mutated. |

This schedule is commercial and Product authority, not legal advice. Public and quote wording
must not exclude or misstate non-excludable Australian Consumer Law rights. It creates no
warranty against defects, extended warranty, change-of-mind promise or additional legal remedy.

## Retained Sprint 030 offer-authority history (superseded)

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

The single typed Product authority is `lib/commerce/commercial-authority.ts`. Its
`checkoutEnabled` value remains `false`. Pricing, Disclaimer, Shop, product detail and
protected Admin Commerce derive approved information from that contract. Shop and detail do
not import or render historical product loaders as active offers. Direct checkout redirects
using the approved disabled reason, and the webhook refuses before reading request data.
Protected Admin Commerce authenticates before its read, then projects raw records into
deterministic non-sensitive ordinal rows; order, payment, customer, checkout and provider
identifiers do not enter visible text, DOM properties, React keys or client-serializable props.

## Retained Sprint 030 business-owner intervention history (satisfied by 030B)

The following section records the former blocker verbatim as historical evidence. It is not the
current authority; Phillip Rankin, Director of Aprec8 Pty Ltd, satisfied it through
`030B-consultation-led-v1` on 2026-08-12.

What remains blocked: approval of a complete commercial schedule and any future decision to support online purchase.

Evidence checked: maintained pricing documentation, Sprint 029M evidence, test seeds, public pricing/shop/detail, checkout, webhook, read-only admin commerce and client reference inventory. These sources conflict or omit material obligations.

Required action:

1. Nominate the business decision owner and role.
2. Answer every unavailable dimension in the offer-authority table, including exact GST, freight, term, refund/return, warranty/buyback, trial and fulfilment obligations.
3. Approve the exact offer names, identifiers, descriptions, prices, effective date and treatment of historical orders.
4. Decide whether sales remain consultation-led or online checkout may be planned.
5. Provide the approval as a versioned business record; do not provide secrets, payment data or customer data.

Builder verification after that action: compare every answer against the table and conflict matrix, confirm no material gap remains, and determine whether the existing data contract can represent the approved offer. A later authorised execution is required before checkout or Production commerce can change.

## Current future authority boundary

Online commerce, Stripe testing, payment collection, subscription architecture, Production
publication, legal review, customer acceptance and named operational ownership remain separate
future decisions. A later schedule alone cannot flip `checkoutEnabled`; activation requires a
separately approved implementation and Production acceptance boundary.
