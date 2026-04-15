"use client";

import { createBrowserClient } from "@supabase/ssr";
import { assertSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";

export function createSupabaseBrowserClient() {
  assertSupabaseEnv();

  return createBrowserClient(supabaseEnv.url!, supabaseEnv.anonKey!);
}

