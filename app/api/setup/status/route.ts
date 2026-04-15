import { NextResponse } from "next/server";
import { getPlatformStatus } from "@/lib/runtime/platform-status";

export async function GET() {
  const status = getPlatformStatus();

  const checkpoints = [
    {
      key: "site_url",
      label: "Public site URL",
      ready: status.siteUrlConfigured,
      detail: "Used for auth callbacks, metadata, and deployment verification.",
    },
    {
      key: "supabase_public",
      label: "Supabase public client",
      ready: status.supabaseConfigured,
      detail: "Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    },
    {
      key: "supabase_admin",
      label: "Supabase admin client",
      ready: status.supabaseAdminConfigured,
      detail: "Required for user bootstrap and admin-side assignment flows.",
    },
    {
      key: "stripe",
      label: "Stripe core keys",
      ready: status.stripeConfigured,
      detail: "Required for checkout, billing, and product-linked payment flows.",
    },
    {
      key: "stripe_webhooks",
      label: "Stripe webhook secret",
      ready: status.stripeWebhookConfigured,
      detail: "Required for reliable payment event handling in Vercel.",
    },
    {
      key: "railway",
      label: "Railway token",
      ready: status.railwayConfigured,
      detail: "Used only when background services and integrations are activated.",
    },
  ];

  return NextResponse.json({
    ok: true,
    environment: {
      node: status.nodeEnvironment,
      vercel: status.vercelEnvironment,
    },
    checkpoints,
  });
}
