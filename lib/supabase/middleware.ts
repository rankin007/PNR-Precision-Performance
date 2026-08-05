import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { hasSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";

export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const applyPrivateCacheBoundary = () => {
    if (
      request.nextUrl.pathname.startsWith("/portal") ||
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/data-entry")
    ) {
      response.headers.set("Cache-Control", "private, no-store");
    }
  };

  applyPrivateCacheBoundary();

  if (!hasSupabaseEnv()) {
    return { response, session: null, user: null, envReady: false };
  }

  const supabase = createServerClient(supabaseEnv.url!, supabaseEnv.anonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        applyPrivateCacheBoundary();
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return {
      response,
      session: user ? { user } : null,
      user: user ?? null,
      envReady: true,
    };
  } catch {
    // Authentication transport failure must not expose provider detail or turn
    // public navigation into a middleware 500. Server route guards still make
    // the final authorization decision.
    return { response, session: null, user: null, envReady: true };
  }
}
