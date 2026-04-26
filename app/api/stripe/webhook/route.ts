import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type Stripe from "stripe";
import { syncCheckoutSessionToCommerce, syncStripeSubscriptionToCommerce } from "@/lib/stripe/commerce";
import { stripeEnv, hasStripeServerEnv, hasStripeWebhookEnv } from "@/lib/stripe/env";
import { getStripeServerClient } from "@/lib/stripe/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (typeof error === "string" && error.trim()) {
    return error;
  }

  return "Webhook verification failed.";
}

export async function POST(request: NextRequest) {
  if (!hasStripeServerEnv() || !hasStripeWebhookEnv()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Stripe webhook configuration is missing.",
      },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        ok: false,
        message: "Missing Stripe signature.",
      },
      { status: 400 },
    );
  }

  const payload = await request.text();
  const stripe = getStripeServerClient();

  try {
    const event = stripe.webhooks.constructEvent(
      Buffer.from(payload, "utf8"),
      signature,
      stripeEnv.webhookSecret!,
    );

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired":
        await syncCheckoutSessionToCommerce(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await syncStripeSubscriptionToCommerce(event.data.object as Stripe.Subscription);
        break;
      default:
        break;
    }

    return NextResponse.json({
      ok: true,
      received: event.type,
      message: "Webhook signature verified and commerce records reconciled where applicable.",
    });
  } catch (error) {
    console.error("Stripe webhook verification failed", {
      message: readErrorMessage(error),
      signaturePresent: Boolean(signature),
      payloadLength: payload.length,
      error,
    });

    return NextResponse.json(
      {
        ok: false,
        message: readErrorMessage(error),
      },
      { status: 400 },
    );
  }
}
