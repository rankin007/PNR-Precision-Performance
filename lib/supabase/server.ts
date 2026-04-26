import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isAdminBypassActive } from "@/lib/auth/bypass";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";
import { assertSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";

export async function createSupabaseServerClient() {
  assertSupabaseEnv();

  if ((await isAdminBypassActive()) && hasSupabaseAdminEnv()) {
    return createSupabaseAdminClient();
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseEnv.url!, supabaseEnv.anonKey!, {
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
