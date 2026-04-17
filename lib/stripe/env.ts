export const stripeEnv = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

export function hasStripeServerEnv() {
  return Boolean(stripeEnv.secretKey);
}

export function hasStripeClientEnv() {
  return Boolean(stripeEnv.publishableKey);
}

export function hasStripeWebhookEnv() {
  return Boolean(stripeEnv.webhookSecret);
}
