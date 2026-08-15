import { createClient } from "@supabase/supabase-js";
import { createSupabaseApiKeyFetch } from "@/lib/supabase/api-key-fetch";
import { supabaseEnv } from "@/lib/supabase/env";

export function hasSupabaseAdminEnv() {
  return Boolean(
    supabaseEnv.url && supabaseEnv.anonKey && supabaseEnv.serviceRoleKey,
  );
}

export function createSupabaseAdminClient() {
  if (!hasSupabaseAdminEnv()) {
    throw new Error(
      "Missing Supabase admin environment variables. Set SUPABASE_SERVICE_ROLE_KEY for bootstrap flows.",
    );
  }

  return createClient(supabaseEnv.url!, supabaseEnv.serviceRoleKey!, {
    global: { fetch: createSupabaseApiKeyFetch(supabaseEnv.serviceRoleKey!) },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

