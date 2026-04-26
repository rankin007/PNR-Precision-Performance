import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { bootstrapAuthenticatedUser } from "@/lib/auth/bootstrap";
import { normalizeNextPath } from "@/lib/auth/next-path";
import { hasSupabaseEnv, supabaseEnv } from "@/lib/supabase/env";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = normalizeNextPath(requestUrl.searchParams.get("next"));

  if (!hasSupabaseEnv()) {
    return NextResponse.redirect(
      new URL(`/sign-in?setup=supabase&next=${encodeURIComponent(next)}`, request.url),
    );
  }

  const redirectResponse = NextResponse.redirect(new URL(next, request.url));

  if (code) {
    const supabase = createServerClient(supabaseEnv.url!, supabaseEnv.anonKey!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            redirectResponse.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await bootstrapAuthenticatedUser({
        authUserId: user.id,
        email: user.email ?? null,
        displayName:
          typeof user.user_metadata?.display_name === "string"
            ? user.user_metadata.display_name
            : typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : null,
        firstName:
          typeof user.user_metadata?.first_name === "string"
            ? user.user_metadata.first_name
            : null,
        lastName:
          typeof user.user_metadata?.last_name === "string" ? user.user_metadata.last_name : null,
      });
    }
  }

  return redirectResponse;
}
