import Stripe from "stripe";
import { hasStripeServerEnv, stripeEnv } from "@/lib/stripe/env";

let stripeClient: Stripe | null = null;

export function getStripeServerClient() {
  if (!hasStripeServerEnv()) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(stripeEnv.secretKey!, {
      apiVersion: "2026-03-25.dahlia",
    });
  }

  return stripeClient;
}
