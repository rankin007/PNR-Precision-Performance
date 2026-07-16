# Sprint 013 - Pricing Evidence

## Status

Documented on 2026-07-16 for Sprint 013. No Stripe product, price, subscription, tax, charge, refund, payout, public shop, deployment, or production data change was made.

## Current Shop-Written Pricing Truth

Per Sprint 013 instructions, `.release-main/app/shop/page.tsx` is the source authority for currently written shop pricing.

| Service | Price | Notes |
|---|---:|---|
| Professional Kit | `$4,500` | one-off plus Postage |
| Monthly Service | `$120 per horse or P.O.A` | Unlimited testing |

Evidence from `.release-main/app/shop/page.tsx`:

- Professional Kit card displays `$4,500` and `plus Postage`.
- Pricing summary displays `$4,500 one-off plus Postage`.
- Monthly Service card displays `$120 Per Horse or P.O.A`.
- Pricing summary displays `$120 per horse or P.O.A` and `Unlimited testing.`

## Conflicting Older Evidence

The following sources conflict with the current shop-written pricing and should not be treated as authoritative unless the user corrects the pricing decision:

| Source | Conflicting value |
|---|---|
| `supabase/migrations/0007_test_product_seeds.sql` | Older fallback/test products unrelated to the current shop-written services. |
| `.release-main/supabase/migrations/0008_professional_equipment_products.sql` | Professional Kit `$2,500 AUD`; Monthly Service `$600 AUD`. |
| `.release-main/supabase/migrations/0014_update_professional_kit_price.sql` | Professional Kit changed to `$3,500 AUD`. |
| `.release-main/lib/domain/products.ts` | Professional Kit `$3,500 AUD`, Monthly Service `$120 AUD`, Kit Buyback `$500 AUD`. |

## Sprint Boundary

Sprint 013 only records pricing truth for later business readiness and commerce alignment. It does not reopen the hidden public shop and does not create or update Stripe products/prices.

## Manual Intervention: Pricing Confirmation

Blocked item: final commerce pricing synchronization.

Evidence checked:

- Shop-written source says Professional Kit `$4,500` one-off plus Postage.
- Shop-written source says Monthly Service `$120 per horse or P.O.A`, unlimited testing.
- Older seeds and fallback product source conflict.

Exact user/operator action needed:

Before any future commerce/Stripe/shop reopening sprint, confirm whether the shop-written pricing above remains authoritative.

Step-by-step action instructions:

1. Review this document with the business owner.
2. Confirm final Professional Kit price and postage handling.
3. Confirm final Monthly Service price and whether `P.O.A` remains public-facing.
4. Approve a later commerce sprint to align database seeds, fallback products, Stripe products/prices, and public shop copy.

Builder will verify after action:

- source pricing, database seeds, Stripe products/prices, and public shop copy all agree
- public shop remains hidden until explicitly reopened
