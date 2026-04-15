import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { getPlatformStatus } from "@/lib/runtime/platform-status";

export async function GET() {
  const status = getPlatformStatus();

  return NextResponse.json({
    ok: true,
    service: siteConfig.name,
    timestamp: new Date().toISOString(),
    environment: {
      node: status.nodeEnvironment,
      vercel: status.vercelEnvironment,
    },
    integrations: {
      siteUrlConfigured: status.siteUrlConfigured,
      supabaseConfigured: status.supabaseConfigured,
      supabaseAdminConfigured: status.supabaseAdminConfigured,
      stripeConfigured: status.stripeConfigured,
      stripeWebhookConfigured: status.stripeWebhookConfigured,
      railwayConfigured: status.railwayConfigured,
    },
  });
}
