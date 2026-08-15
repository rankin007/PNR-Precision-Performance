import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createSupabaseApiKeyFetch } from "@/lib/supabase/api-key-fetch";
import { assertSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";

export async function createSupabaseServerClient() {
  assertSupabaseEnv();

  const cookieStore = await cookies();

  return createServerClient(supabaseEnv.url!, supabaseEnv.anonKey!, {
    global: { fetch: createSupabaseApiKeyFetch(supabaseEnv.anonKey!) },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components can run in read-only cookie contexts.
        }
      },
    },
  });
}
