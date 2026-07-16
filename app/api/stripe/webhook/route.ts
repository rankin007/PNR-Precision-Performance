import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type Stripe from "stripe";
import { syncCheckoutSessionToCommerce } from "@/lib/stripe/commerce";
import { stripeEnv, hasStripeServerEnv, hasStripeWebhookEnv } from "@/lib/stripe/env";
import { getStripeServerClient } from "@/lib/stripe/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supportedCheckoutEvents = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
]);

function readSafeErrorCode(error: unknown) {
  if (error && typeof error === "object") {
    const candidate = error as { code?: unknown; type?: unknown; name?: unknown };

    if (typeof candidate.code === "string" && candidate.code.trim()) {
      return candidate.code;
    }

    if (typeof candidate.type === "string" && candidate.type.trim()) {
      return candidate.type;
    }

    if (typeof candidate.name === "string" && candidate.name.trim()) {
      return candidate.name;
    }
  }

  return "unknown";
}

function checkoutSessionId(value: unknown) {
  if (value && typeof value === "object" && "id" in value) {
    const id = (value as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }

  return null;
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
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(payload, "utf8"),
      signature,
      stripeEnv.webhookSecret!,
    );
  } catch (error) {
    console.error("Stripe webhook verification failed", {
      reason: readSafeErrorCode(error),
      signaturePresent: Boolean(signature),
      payloadLength: payload.length,
      webhookSecretConfigured: Boolean(stripeEnv.webhookSecret),
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Webhook verification failed.",
      },
      { status: 400 },
    );
  }

  if (!supportedCheckoutEvents.has(event.type)) {
    return NextResponse.json({
      ok: true,
      received: event.type,
      message: "Webhook signature verified; event type is not handled by commerce reconciliation.",
    });
  }

  try {
    await syncCheckoutSessionToCommerce(event.data.object as Stripe.Checkout.Session);
  } catch (error) {
    console.error("Stripe webhook reconciliation failed", {
      eventType: event.type,
      checkoutSessionId: checkoutSessionId(event.data.object),
      reason: readSafeErrorCode(error),
    });

    return NextResponse.json(
      {
        ok: false,
        received: event.type,
        message: "Webhook verified but commerce reconciliation failed.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    received: event.type,
    message: "Webhook signature verified and commerce records reconciled where applicable.",
  });
}
