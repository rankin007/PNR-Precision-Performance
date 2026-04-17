# Stripe Activation V1

This document records the first implemented checkout layer and the remaining activation steps for Stripe.

## Implemented

- Stripe server env helpers in `lib/stripe/env.ts`
- Stripe server client in `lib/stripe/server.ts`
- checkout session route in `/api/checkout`
- webhook verification route in `/api/stripe/webhook`
- pending order creation before checkout redirect
- webhook reconciliation into `orders`, `order_items`, and `payments`
- product detail route in `/shop/[slug]`
- shop flow updated to link into Stripe-ready product pages

## Current Behavior

- if Stripe keys are missing, checkout degrades gracefully and stays unavailable
- if Stripe server keys and Supabase service-role access are present, checkout creates a pending order before redirecting to Stripe
- webhook route verifies Stripe signatures and reconciles qualifying checkout-session events into platform commerce tables

## Required Stripe Setup

1. Use the website owner's approved Stripe account for this project.
2. Add:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`

3. In Stripe, create a webhook endpoint pointing to:
- `https://pnr-precision-performance.vercel.app/api/stripe/webhook`

4. Retest:
- `/shop`
- `/shop/[slug]`
- checkout redirect
- webhook signature verification

## Next Commerce Expansion

- add order confirmation and receipt views
- add subscription checkout flows if paid memberships are activated
- add richer payment failure and refund handling
