import { supabaseEnv } from "@/lib/supabase/env";

function hasValue(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export function getPlatformStatus() {
  return {
    siteUrlConfigured: hasValue(process.env.NEXT_PUBLIC_SITE_URL),
    supabaseConfigured: hasValue(supabaseEnv.url) && hasValue(supabaseEnv.anonKey),
    supabaseAdminConfigured: hasValue(supabaseEnv.serviceRoleKey),
    stripeConfigured:
      hasValue(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) &&
      hasValue(process.env.STRIPE_SECRET_KEY),
    stripeWebhookConfigured: hasValue(process.env.STRIPE_WEBHOOK_SECRET),
    railwayConfigured: hasValue(process.env.RAILWAY_API_TOKEN),
    vercelEnvironment: process.env.VERCEL_ENV ?? "local",
    nodeEnvironment: process.env.NODE_ENV ?? "development",
  };
}
