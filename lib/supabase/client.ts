"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createSupabaseApiKeyFetch } from "@/lib/supabase/api-key-fetch";
import { assertSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";

export function createSupabaseBrowserClient() {
  assertSupabaseEnv();

  return createBrowserClient(supabaseEnv.url!, supabaseEnv.anonKey!, {
    global: { fetch: createSupabaseApiKeyFetch(supabaseEnv.anonKey!) },
  });
}

